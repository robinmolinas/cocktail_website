"""Reachability, distribution and sensitivity analysis for matching model v1.

  uv run --with scipy --with numpy python -I analyze.py [--phi X] [--samples N]

Writes (next to this file):
  model-v1.scales.json        group spreads the core must ship with the weights
  reachability-v1.md / .json  132-row layered report
  distribution-v1.md / .json  outcome frequencies, ties, sensitivity, group influence
  fixtures-v1.json            one witness answer set per reachable pairing (core test fixtures)

Simulation uses a seeded generator; the model itself has no randomness.
"""

import argparse
import itertools
import json
import os
import sys

import numpy as np
from scipy.optimize import LinearConstraint, Bounds, milp

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import matching as mt  # noqa: E402

HERE = mt.HERE
VETOES = ["egg-white", "dairy", "gluten", "nuts", "spice"]


# ---------------------------------------------------------------- answer models
def sample_uniform(model, rng):
    """U: every option equally likely. 1-3 words per H5 round, H4 10% no choice, H3 uniform."""
    a = {
        "drawnToward": list(rng.choice(model.drawn, rng.integers(1, 4), replace=False)),
        "soughtFor": list(rng.choice(model.sought, rng.integers(1, 4), replace=False)),
        "texture": {},
        "gravity": {k: int(rng.integers(0, 101)) for k in model.grav},
        "flavors": list(rng.choice(model.flavours, rng.integers(0, 4), replace=False)),
    }
    for k in model.tex:
        r = rng.random()
        if r < 0.45:
            a["texture"][k] = "a"
        elif r < 0.9:
            a["texture"][k] = "b"
    return a


def sample_hesitant(model, rng):
    """H: midpoint-heavy sliders (N(50,18)), 1-2 words, 30% of H4 pairs missed, 0-2 flavours."""
    a = sample_uniform(model, rng)
    a["drawnToward"] = a["drawnToward"][: int(rng.integers(1, 3))]
    a["soughtFor"] = a["soughtFor"][: int(rng.integers(1, 3))]
    a["gravity"] = {k: int(np.clip(rng.normal(50, 18), 0, 100)) for k in model.grav}
    a["texture"] = {k: v for k, v in a["texture"].items() if rng.random() > 0.3}
    a["flavors"] = a["flavors"][: int(rng.integers(0, 3))]
    return a


def sample_coherent(model, rng, beta=2.0):
    """C: a latent (primary, secondary) answers in character. Options are drawn with
    probability ~ exp(beta * raw affinity to the latent pair), using the BRANDING-derived
    affinities. This is circular by construction: it measures whether the model can
    recover a persona that answers the way the weights assume, not real behaviour."""
    p, s = rng.choice(len(model.arch), 2, replace=False)
    aff = lambda w: w.get(model.arch[p], 0) + 0.7 * w.get(model.arch[s], 0)

    def pick_words(table, k):
        ids = list(table)
        w = np.exp(beta * np.array([aff(table[i]) for i in ids]))
        return list(rng.choice(ids, k, replace=False, p=w / w.sum()))

    a = {
        "drawnToward": pick_words(model.spec["drawnToward"], int(rng.integers(1, 4))),
        "soughtFor": pick_words(model.spec["soughtFor"], int(rng.integers(1, 4))),
        "texture": {},
        "gravity": {},
        "flavors": list(rng.choice(model.flavours, rng.integers(0, 4), replace=False)),
    }
    for k in model.tex:
        wa, wb = (aff(x) for x in model.spec["texture"][k])
        if rng.random() < 0.1:
            continue
        pa = 1 / (1 + np.exp(-beta * (wa - wb)))
        a["texture"][k] = "a" if rng.random() < pa else "b"
    for k in model.grav:
        wl, wr = (aff(x) for x in model.spec["gravity"][k])
        a["gravity"][k] = int(np.clip(rng.normal(50 + 40 * np.tanh(beta * (wr - wl)), 15), 0, 100))
    return a, mt.pairing_key(model.arch[p], model.arch[s])


# ---------------------------------------------------------------- calibration
def calibrate(model, rng, n=20000):
    """Group spread under U: mean over archetypes of the std of the group's centred score."""
    raws = {g: [] for g in mt.GROUPS}
    for _ in range(n):
        r = model.group_raw(model.features(sample_uniform(model, rng)))
        for g in mt.GROUPS:
            raws[g].append(r[g])
    return {g: float(np.mean(np.std(np.array(raws[g]), axis=0))) for g in mt.GROUPS}


# ---------------------------------------------------------------- MILP feasibility
class Feasibility:
    """Exact search over the answer space with scipy.milp.

    Variables: answer features u (layout of mt.Model), guest flavours f[9], tau.
    Discrete answers are integer; gravity leans are continuous in [0,1] with
    left + right <= 1, which is exactly the slider (rounded to integers afterwards
    and re-checked). Maximising tau = min margin over the competitors decides
    whether a pairing can lead: tau <= 0 at optimum is a proof it cannot."""

    def __init__(self, model, cat):
        self.m, self.cat = model, cat
        M, E = model.coefficient_rows()
        self.M, self.E = np.array(M), np.array(E)
        self.keys = sorted(k for k, r in cat.items() if r["authored"])
        self.phi = model.spec["flavourFit"]["phi"]
        self.nf = len(model.flavours)
        self.nu = model.n
        self.N = self.nu + self.nf + 1  # + tau
        integ = np.ones(self.N)
        for j, (g, _, _) in enumerate(model.layout):
            if g == "gravity":
                integ[j] = 0
        integ[-1] = 0
        self.integrality = integ
        lo, hi = np.zeros(self.N), np.ones(self.N)
        lo[-1], hi[-1] = -50, 50
        self.bounds = Bounds(lo, hi)
        base = []
        idx = lambda g: [j for j, (gg, _, _) in enumerate(model.layout) if gg == g]
        for g in ("drawnToward", "soughtFor"):
            row = np.zeros(self.N)
            row[idx(g)] = 1
            base.append((row, 0, 3))
        for g in ("texture", "gravity"):
            cols = idx(g)
            for a, b in zip(cols[::2], cols[1::2]):
                row = np.zeros(self.N)
                row[[a, b]] = 1
                base.append((row, 0, 1))
        row = np.zeros(self.N)
        row[self.nu:self.nu + self.nf] = 1
        base.append((row, 0, 3))
        self.base = base

    def score_row(self, key):
        r = self.cat[key]
        p, s = self.m.ai[r["primary"]], self.m.ai[r["secondary"]]
        row = np.zeros(self.N)
        row[: self.nu] = self.M[p] + self.E[s]
        row[self.nu:self.nu + self.nf] = [self.phi * r["flavour"].get(f, 0) for f in self.m.flavours]
        return row

    def eligible(self, vetoes):
        return [k for k in self.keys if not (set(self.cat[k]["contains"] or []) & set(vetoes))]

    def lead(self, target, vetoes=(), top=1, flavours=True):
        """Max min-margin of `target` over competitors; top>1 lets top-1 others beat it."""
        comp = [k for k in self.eligible(vetoes) if k != target]
        if target not in self.eligible(vetoes):
            return None, None
        t = self.score_row(target)
        rows, lo, hi = [], [], []
        for r, l, h in self.base:
            rows.append(r), lo.append(l), hi.append(h)
        nz = top - 1
        N = self.N + (len(comp) if nz else 0)
        pad = lambda r: np.concatenate([r, np.zeros(N - self.N)]) if N > self.N else r
        rows = [pad(r) for r in rows]
        if not flavours:
            for j in range(self.nu, self.nu + self.nf):
                r = np.zeros(N)
                r[j] = 1
                rows.append(r), lo.append(0), hi.append(0)
        big = 100.0
        for ci, c in enumerate(comp):
            r = pad(t - self.score_row(c))
            r[self.N - 1] = -1  # S_t - S_c - tau >= 0
            if nz:
                r[self.N + ci] = big  # z_c = 1 releases the constraint
            rows.append(r), lo.append(0), hi.append(np.inf)
        if nz:
            r = np.zeros(N)
            r[self.N:] = 1
            rows.append(r), lo.append(0), hi.append(nz)
        c = np.zeros(N)
        c[self.N - 1] = -1
        integ = np.concatenate([self.integrality, np.ones(N - self.N)])
        b_lo = np.concatenate([self.bounds.lb, np.zeros(N - self.N)])
        b_hi = np.concatenate([self.bounds.ub, np.ones(N - self.N)])
        res = milp(c, constraints=LinearConstraint(np.array(rows), lo, hi), integrality=integ,
                   bounds=Bounds(b_lo, b_hi), options={"time_limit": 60})
        if res.x is None:
            return None, None
        return float(-res.fun), res.x[: self.N]

    def to_answers(self, x, vetoes=()):
        a = {"drawnToward": [], "soughtFor": [], "texture": {}, "gravity": {}, "flavors": [], "vetoes": list(vetoes)}
        grav = {}
        for j, (g, key, pole) in enumerate(self.m.layout):
            v = x[j]
            if g in ("drawnToward", "soughtFor") and v > 0.5:
                a[g].append(key)
            elif g == "texture" and v > 0.5:
                a["texture"][key] = pole
            elif g == "gravity":
                grav.setdefault(key, 0.0)
                grav[key] += -v if pole == "left" else v
        a["gravity"] = {k: int(round(50 + 50 * t)) for k, t in grav.items()}
        a["flavors"] = [f for i, f in enumerate(self.m.flavours) if x[self.nu + i] > 0.5]
        return a


# ---------------------------------------------------------------- reports
def reachability(model, cat, feas):
    rows = []
    veto_sets = [v for n in range(1, 6) for v in itertools.combinations(VETOES, n)]
    for key in feas.keys:
        r = {"key": key, "status": cat[key]["status"], "contains": cat[key]["contains"]}
        tau, x = feas.lead(key, flavours=False)
        r["persona_margin"] = round(tau, 4)
        tau_f, xf = feas.lead(key)
        r["lead_margin"] = round(tau_f, 4)
        how, witness = None, None
        if tau > 1e-6:
            how, witness = "persona alone", feas.to_answers(x)
        elif tau_f > 1e-6:
            how, witness = "with flavour fit", feas.to_answers(xf)
        else:
            for vs in veto_sets:
                tv, xv = feas.lead(key, vs)
                if tv is not None and tv > 1e-6:
                    how, witness = f"only under vetoes {list(vs)}", feas.to_answers(xv, vs)
                    break
        # verify the witness with the reference selector (integer sliders)
        if witness:
            short, _ = mt.select_shortlist(model, cat, witness)
            if short[0] != key:
                how, witness = f"unverified after rounding ({how})", None
        r["leads_fallback"] = how or "proven unreachable"
        if how and witness:
            r["shortlist"] = "reachable (leads)"
        else:
            t3, x3 = feas.lead(key, top=3)
            if t3 is not None and t3 > 1e-6:
                w3 = feas.to_answers(x3)
                short, _ = mt.select_shortlist(model, cat, w3)
                r["shortlist"] = "reachable (top-3)" if key in short else "unverified"
                witness = witness or (w3 if key in short else None)
            else:
                r["shortlist"] = "proven unreachable without vetoes"
        r["final_choice"] = "selectable (in shortlist), not yet observed" if r["shortlist"].startswith("reachable") else "not selectable"
        r["witness"] = witness
        rows.append(r)
    return rows


def simulate(model, cat, sampler, n, rng, label):
    from collections import Counter

    outcomes, prim, ties, near, margins = Counter(), Counter(), 0, 0, []
    single_change, prim_change, group_flip = 0, 0, {g: 0 for g in mt.GROUPS + ("flavors",)}
    recovered1 = recovered3 = reversed_instead = stays_in_shortlist = 0
    prim_tot, prim_rec = Counter(), Counter()
    for _ in range(n):
        s = sampler(model, rng)
        latent = None
        if isinstance(s, tuple):
            s, latent = s
        short, sc = mt.select_shortlist(model, cat, s)
        top = short[0]
        outcomes[top] += 1
        prim[cat[top]["primary"]] += 1
        ordered = sorted(sc.values(), reverse=True)
        gap = ordered[0] - ordered[1]
        margins.append(gap)
        ties += gap < 1e-9
        near += gap < 0.05
        if latent:
            recovered1 += top == latent
            recovered3 += latent in short
            P, S = cat[latent]["primary"], cat[latent]["secondary"]
            reversed_instead += top == mt.pairing_key(S, P)
            prim_tot[P] += 1
            prim_rec[P] += cat[top]["primary"] == P
        # one changed answer
        s2 = perturb_one(model, s, rng)
        t2 = mt.select_shortlist(model, cat, s2)[0][0]
        single_change += t2 != top
        stays_in_shortlist += t2 in short
        prim_change += cat[t2]["primary"] != cat[top]["primary"]
        # group ablation: does dropping the group change the result?
        for g in group_flip:
            s3 = json.loads(json.dumps(s))
            s3[g] = {} if g in ("texture", "gravity") else []
            group_flip[g] += mt.select_shortlist(model, cat, s3)[0][0] != top
    freq = sorted(outcomes.values(), reverse=True)
    authored = sum(1 for r in cat.values() if r["authored"])
    out = {
        "model": label,
        "samples": n,
        "distinct_outcomes": len(outcomes),
        "never_observed": sorted(k for k, r in cat.items() if r["authored"] and k not in outcomes),
        "top10_share": round(sum(freq[:10]) / n, 3),
        "max_share": round(freq[0] / n, 4),
        "expected_uniform_share": round(1 / authored, 4),
        "primary_shares": {a: round(prim[a] / n, 3) for a in model.arch},
        "exact_tie_rate": round(ties / n, 4),
        "near_tie_rate_lt_0.05": round(near / n, 3),
        "median_top1_margin": round(float(np.median(margins)), 4),
        "p25_top1_margin": round(float(np.percentile(margins, 25)), 4),
        "one_answer_changes_top1": round(single_change / n, 3),
        "one_answer_changes_primary": round(prim_change / n, 3),
        "after_one_change_top1_was_in_old_shortlist": round(stays_in_shortlist / n, 3),
        "dropping_group_changes_top1": {g: round(v / n, 3) for g, v in group_flip.items()},
        "most_common": [(k, round(v / n, 4)) for k, v in outcomes.most_common(8)],
        "least_common_observed": [(k, round(v / n, 5)) for k, v in sorted(outcomes.items(), key=lambda kv: kv[1])[:8]],
    }
    if recovered1 or recovered3:
        out["latent_recovered_top1"] = round(recovered1 / n, 3)
        out["latent_recovered_in_shortlist"] = round(recovered3 / n, 3)
        out["reversed_pair_instead"] = round(reversed_instead / n, 3)
        out["primary_recovery_by_latent_primary"] = {a: round(prim_rec[a] / max(1, prim_tot[a]), 2) for a in model.arch}
    return out


def perturb_one(model, s, rng):
    s = json.loads(json.dumps(s))
    g = rng.choice(["drawnToward", "soughtFor", "texture", "gravity"])
    if g in ("drawnToward", "soughtFor"):
        pool = model.drawn if g == "drawnToward" else model.sought
        if s[g]:
            i = int(rng.integers(0, len(s[g])))
            free = [w for w in pool if w not in s[g]]
            s[g][i] = str(rng.choice(free))
    elif g == "texture":
        k = str(rng.choice(model.tex))
        cur = s["texture"].get(k)
        s["texture"][k] = "b" if cur == "a" else "a"
    else:
        k = str(rng.choice(model.grav))
        s["gravity"][k] = int(rng.integers(0, 101))
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--samples", type=int, default=6000)
    ap.add_argument("--phi", type=float, default=None)
    ap.add_argument("--skip-reach", action="store_true")
    args = ap.parse_args()
    spec = mt.load_model()
    if args.phi is not None:
        spec["flavourFit"]["phi"] = args.phi
    model = mt.Model(spec)
    model.scales = calibrate(model, np.random.default_rng(20261006))
    with open(os.path.join(HERE, "model-v1.scales.json"), "w") as f:
        json.dump({"_about": "Group spreads under answer model U (calibrate() in analyze.py, seed 20261006, 20000 samples). The core divides each group's centred score by these.", "scales": model.scales}, f, indent=1)
    cat = mt.load_catalogue(model)
    print("scales", model.scales)

    dist = {}
    for label, sampler in (("U uniform", sample_uniform), ("H hesitant", sample_hesitant), ("C coherent (circular)", sample_coherent)):
        dist[label] = simulate(model, cat, sampler, args.samples, np.random.default_rng(7), label)
        print(json.dumps({k: v for k, v in dist[label].items() if k not in ("never_observed",)}, indent=None)[:1500])
    # flavour weight and veto sensitivity under U
    rng = np.random.default_rng(11)
    samples = [sample_uniform(model, rng) for _ in range(args.samples)]
    base = [mt.select_shortlist(model, cat, s)[0][0] for s in samples]
    phi_sens = {}
    for phi in (0.0, 0.3, 0.6):
        spec2 = json.loads(json.dumps(spec))
        spec2["flavourFit"]["phi"] = phi
        m2 = mt.Model(spec2, model.scales)
        phi_sens[phi] = round(sum(mt.select_shortlist(m2, cat, s)[0][0] != b for s, b in zip(samples, base)) / len(samples), 3)
    veto_sens = {}
    for v in VETOES + ["all"]:
        vs = VETOES if v == "all" else [v]
        veto_sens[v] = round(sum(mt.select_shortlist(model, cat, dict(s, vetoes=vs))[0][0] != b for s, b in zip(samples, base)) / len(samples), 3)
    dist["flavour_weight_change_vs_current"] = phi_sens
    dist["veto_changes_top1"] = veto_sens
    dist["empty_intake"] = mt.select_shortlist(model, cat, {})[0]
    with open(os.path.join(HERE, "distribution-v1.json"), "w") as f:
        json.dump(dist, f, indent=1)
    print("phi", phi_sens, "veto", veto_sens, "empty", dist["empty_intake"])

    if args.skip_reach:
        return
    feas = Feasibility(model, cat)
    rows = reachability(model, cat, feas)
    with open(os.path.join(HERE, "reachability-v1.json"), "w") as f:
        json.dump(rows, f, indent=1)
    with open(os.path.join(HERE, "fixtures-v1.json"), "w") as f:
        json.dump({r["key"]: r["witness"] for r in rows if r["witness"]}, f, indent=1)
    from collections import Counter
    print(Counter(r["leads_fallback"].split(" [")[0] for r in rows))
    print(Counter(r["shortlist"] for r in rows))


if __name__ == "__main__":
    main()
