"""Matching model v1, reference implementation (analysis only).

The production scorer is the TypeScript core (shared/selection, AD-3). This
module mirrors it so the reachability and distribution analysis can run
before the core exists. Both read model-v1.json; the core also ships the
group scales computed here (model-v1.scales.json), so the two cannot drift
on constants. Pure functions, no randomness.

Score, per matching-model.md:
  M[a] = sum_g roleM[g] * G_g(answers)[a] / scale[g]      motive    -> primary
  E[a] = sum_g roleE[g] * G_g(answers)[a] / scale[g]      expression -> secondary
  S(p, s) = M[p] + E[s] + phi * sum_{f in guest flavours} strength(pour(p,s), f)
G_g is the group's centred contribution, so an absent answer is 0 (neutral).
"""

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(os.path.dirname(HERE))  # Cocktail_Website_Agent
POURS = os.path.join(APP, "design-artifacts", "pours")
SPECS = os.path.join(POURS, "_studio", "specs")
# The live Pour Studio tooling sits at the workspace root (skills/), not the
# stale copy inside Dionysus/skills (116 vs 345 ingredients on 2026-10-06).
INGREDIENTS = os.path.join(os.path.dirname(os.path.dirname(APP)), "skills", "dps-tools", "data", "ingredients.json")

GROUPS = ("drawnToward", "soughtFor", "gravity", "texture")


def load_model(path=os.path.join(HERE, "model-v1.json")):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def pairing_key(primary, secondary):
    slug = lambda a: a.lower().replace(" ", "-")
    return f"{slug(primary)}-{slug(secondary)}"


class Model:
    """Linear form of the model over a fixed feature layout.

    Feature vector u (all 0/1 except gravity, which is a lean magnitude 0..1):
      drawnToward[9] | soughtFor[9] | texture a/b [9x2] | gravity left/right [5x2]
    """

    def __init__(self, spec, scales=None):
        self.spec = spec
        self.arch = spec["archetypes"]
        self.ai = {a: i for i, a in enumerate(self.arch)}
        self.drawn = list(spec["drawnToward"])
        self.sought = list(spec["soughtFor"])
        self.tex = [k for k in spec["texture"] if not k.startswith("_")]
        self.grav = [k for k in spec["gravity"] if not k.startswith("_")]
        self.flavours = spec["flavours"]
        self.layout = []  # (group, id, pole)
        self.layout += [("drawnToward", w, None) for w in self.drawn]
        self.layout += [("soughtFor", w, None) for w in self.sought]
        for k in self.tex:
            self.layout += [("texture", k, "a"), ("texture", k, "b")]
        for k in self.grav:
            self.layout += [("gravity", k, "left"), ("gravity", k, "right")]
        self.n = len(self.layout)
        self.raw = self._centred_columns()  # group -> list of (col index, 12-vector)
        self.scales = scales  # group -> spread; set by calibrate()

    def _vec(self, weights):
        v = [0.0] * len(self.arch)
        for a, w in weights.items():
            v[self.ai[a]] = w
        return v

    def _centred_columns(self):
        cols = {}
        for j, (g, key, pole) in enumerate(self.layout):
            if g in ("drawnToward", "soughtFor"):
                table = self.spec[g]
                mean = [sum(self._vec(table[w])[i] for w in table) / len(table) for i in range(len(self.arch))]
                v = [x - m for x, m in zip(self._vec(table[key]), mean)]
            else:
                left, right = (self._vec(x) for x in self.spec[g][key])
                if pole in ("a", "left"):
                    v = [(l - r) / 2 for l, r in zip(left, right)]
                else:
                    v = [(r - l) / 2 for l, r in zip(left, right)]
            cols[j] = (g, v)
        return cols

    # -- answers <-> features ------------------------------------------------
    def features(self, ans):
        """ans: dict with drawnToward, soughtFor (lists of ids), texture {key: 'a'|'b'},
        gravity {key: 0..100}. Missing keys are neutral."""
        u = [0.0] * self.n
        for j, (g, key, pole) in enumerate(self.layout):
            if g in ("drawnToward", "soughtFor"):
                u[j] = 1.0 if key in ans.get(g, ()) else 0.0
            elif g == "texture":
                u[j] = 1.0 if ans.get("texture", {}).get(key) == pole else 0.0
            else:
                v = ans.get("gravity", {}).get(key)
                if v is None:
                    continue
                t = (v - 50) / 50
                u[j] = max(0.0, -t) if pole == "left" else max(0.0, t)
        return u

    def group_raw(self, u):
        out = {g: [0.0] * len(self.arch) for g in GROUPS}
        for j, x in enumerate(u):
            if x:
                g, v = self.raw[j]
                acc = out[g]
                for i in range(len(acc)):
                    acc[i] += x * v[i]
        return out

    def coefficient_rows(self):
        """M and E as 12 x n coefficient matrices (lists), scales applied."""
        rM = self.spec["roles"]["motive"]
        rE = self.spec["roles"]["expression"]
        M = [[0.0] * self.n for _ in self.arch]
        E = [[0.0] * self.n for _ in self.arch]
        for j in range(self.n):
            g, v = self.raw[j]
            for i in range(len(self.arch)):
                M[i][j] = rM[g] * v[i] / self.scales[g]
                E[i][j] = rE[g] * v[i] / self.scales[g]
        return M, E

    def scores(self, ans, role_override=None):
        u = self.features(ans)
        raw = self.group_raw(u)
        rM = dict(self.spec["roles"]["motive"])
        rE = dict(self.spec["roles"]["expression"])
        if role_override:
            for g, (m, e) in role_override.items():
                rM[g], rE[g] = m, e
        M = [sum(rM[g] * raw[g][i] / self.scales[g] for g in GROUPS) for i in range(len(self.arch))]
        E = [sum(rE[g] * raw[g][i] / self.scales[g] for g in GROUPS) for i in range(len(self.arch))]
        return M, E, raw


# -- catalogue -----------------------------------------------------------------
AMOUNT_ML = ("ml",)


def _amount_factor(ing):
    ml = ing.get("ml")
    if isinstance(ml, (int, float)):
        return 1.0 if ml >= 20 else 0.6 if ml >= 7.5 else 0.3
    return 0.3  # dashes, drops, pieces, barspoons, leaves


def load_catalogue(model):
    """One record per ordered pairing: key, primary, secondary, status, contains, flavour strengths."""
    with open(os.path.join(HERE, "flavour-rules.json"), encoding="utf-8") as f:
        rules = json.load(f)["rules"]
    with open(INGREDIENTS, encoding="utf-8") as f:
        table = json.load(f)["ingredients"]
    slug = {a.lower().replace(" ", "-"): a for a in model.arch}
    cat = {}
    for p in model.arch:
        for s in model.arch:
            if p == s:
                continue
            key = pairing_key(p, s)
            dossier = os.path.join(POURS, key + ".md")
            spec_path = os.path.join(SPECS, key + ".json")
            rec = {"key": key, "primary": p, "secondary": s, "authored": False}
            if os.path.exists(dossier) and os.path.exists(spec_path):
                with open(dossier, encoding="utf-8") as f:
                    head = f.read(6000)
                m = re.search(r"^status:\s*(\S+)", head, re.M)
                c = re.search(r"\*\*contains:\*\*\s*`?(\[[^\]]*\])", head)
                with open(spec_path, encoding="utf-8") as f:
                    spec = json.load(f)
                strength = {fl: 0.0 for fl in model.flavours}
                sugar_g = vol = 0.0
                for ing in spec["ingredients"]:
                    k = ing["key"]
                    for fl, rs in rules.items():
                        for pattern, base in rs:
                            if re.search(pattern, k):
                                strength[fl] = min(1.0, max(strength[fl], base * _amount_factor(ing)))
                    if isinstance(ing.get("ml"), (int, float)) and ing.get("stage") != "top":
                        vol += ing["ml"]
                        sugar_g += ing["ml"] * (table.get(k, {}).get("sugar") or 0) / 100
                rec.update(
                    authored=True,
                    status=m.group(1) if m else "unknown",
                    contains=json.loads(c.group(1)) if c else None,
                    flavour=strength,
                    sugar_conc=(sugar_g / vol * 100) if vol else 0.0,
                )
            cat[key] = rec
    authored = [r for r in cat.values() if r["authored"]]
    ranked = sorted(r["sugar_conc"] for r in authored)
    if ranked:
        t1, t2 = ranked[len(ranked) // 3], ranked[2 * len(ranked) // 3]
        for r in authored:
            r["flavour"]["sweet"] = 1.0 if r["sugar_conc"] >= t2 else 0.5 if r["sugar_conc"] >= t1 else 0.0
    return cat


# -- selection (mirrors AD-3) --------------------------------------------------
def pair_scores(model, cat, ans):
    M, E, _ = model.scores(ans)
    phi = model.spec["flavourFit"]["phi"]
    flav = ans.get("flavors", ())
    out = {}
    for key, r in cat.items():
        if not r["authored"]:
            continue
        p, s = model.ai[r["primary"]], model.ai[r["secondary"]]
        out[key] = M[p] + E[s] + phi * sum(r["flavour"].get(f, 0.0) for f in flav)
    return out


def select_shortlist(model, cat, ans, n=3):
    vetoes = set(ans.get("vetoes", ()))
    sc = pair_scores(model, cat, ans)
    eligible = [k for k in sc if not (set(cat[k]["contains"] or []) & vetoes)]
    eligible.sort(key=lambda k: (-round(sc[k], 9), k))  # ties: pairingKey ascending
    return eligible[:n], sc


def bartender_pick(shortlist, pick):
    """Bounded final choice: anything outside the shortlist means shortlist[0]."""
    return pick if pick in shortlist else shortlist[0]
