"""Matching model v1, reference implementation (analysis only).

The production scorer is the TypeScript core (shared/selection, AD-3). This
module mirrors it for reachability and distribution analysis. Both read
the model, shipped scales and validated catalogue from shared/. Analysis
never replaces the scales during report regeneration. Pure functions,
no randomness.

Score, per matching-model.md:
  M[a] = sum_g roleM[g] * G_g(answers)[a] / scale[g]      motive    -> primary
  E[a] = sum_g roleE[g] * G_g(answers)[a] / scale[g]      expression -> secondary
  S(p, s) = M[p] + E[s] + phi * sum_{f in guest flavours} strength(pour(p,s), f)
G_g is the group's centred contribution, so an absent answer is 0 (neutral).
"""

import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(os.path.dirname(HERE))  # Cocktail_Website_Agent
SHARED = os.path.join(APP, "dionysus-experience", "shared")
MODEL_PATH = os.path.join(SHARED, "selection", "model-v1.json")
SCALES_PATH = os.path.join(SHARED, "selection", "model-v1.scales.json")
CATALOGUE_PATH = os.path.join(SHARED, "data", "catalogue.json")

GROUPS = ("drawnToward", "soughtFor", "gravity", "texture")


def load_model(path=MODEL_PATH):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_scales(path=SCALES_PATH):
    with open(path, encoding="utf-8") as f:
        return json.load(f)["scales"]


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
def load_catalogue(model, path=CATALOGUE_PATH):
    """Read the validated shared store; missing ordered pairs stay unauthored."""
    with open(path, encoding="utf-8") as f:
        records = json.load(f)
    cat = {
        pairing_key(p, s): {"key": pairing_key(p, s), "primary": p, "secondary": s, "authored": False}
        for p in model.arch for s in model.arch if p != s
    }
    seen = set()
    for record in records:
        key = record["pairing"]
        if key not in cat or key in seen:
            raise ValueError(f"invalid or duplicate pairing in shared catalogue: {key}")
        seen.add(key)
        cat[key].update(authored=True, status=record["status"], contains=record["contains"], flavour=record["flavour"])
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
