#!/usr/bin/env python3
"""balance.py - check a drink's balance on paper against Dave Arnold's style ranges.

Usage:
  balance.py SPEC.json            human-readable report
  balance.py SPEC.json --json     machine-readable result

SPEC.json:
  {"pairing": "sage-lover", "style": "stirred",          # see data/styles.json: built|stirred|shaken|shaken-spirit|
                                                          #   egg-white|flip|carbonated|highball|collins|fizz|blended|hot|bowl|freeform
   "serves": 1, "melt": null,                             # bowl: fraction of extra water from the ice block (default 0.15)
   "ingredients": [{"key": "scotch_blended", "ml": 60}, {"key": "orange_bitters", "dashes": 2},
                   {"key": "sugar", "g": 127}, {"key": "sugar_cube", "count": 1}],
   "garnish": ["lemon_peel", "sage_leaf"],
   "accepted": {"checks": ["finished sugar"], "by": "Robin 2026-10-06", "why": "a dry Martini: no sugar by design"}}
                                                          # optional: OUT readings Robin accepted by structure

An "accepted" check that reads OUT is reported as BY STRUCTURE (with who accepted it and why) and doesn't fail
the verdict. It's never hidden: the number and range still print. Only Robin accepts (STUDIO-RULES check 2).

Values come from data/ingredients.json (each with its source); ranges and formulas from data/styles.json.
A line marked "stage": "top" (soda, tonic, sparkling wine poured last) is added after the base is diluted.
"freeform" applies no ranges: it reports the numbers and the nearest styles, to be justified in the dossier.
Every one of the Cocktail Codex's six root families has a style (styles.json "_codex_families"); nothing is excluded.
Exit code: 0 all in range or edge (or freeform), 1 something out of range, 2 spec error.
"""
import json, sys
from _common import load_spec, resolve, styles, SpecError


def dilution(style_def, abv):
    d = style_def["dilution"]
    if "fixed" in d:
        return d["fixed"]
    a = abv
    if d["formula"] == "stirred":
        return -1.21 * a * a + 1.246 * a + 0.145
    return -1.567 * a * a + 1.742 * a + 0.203


def verdict(value, band, margin, edge_band=None):
    lo, hi = band
    if lo <= value <= hi:
        return "in range"
    span = max(hi - lo, 1e-9)
    if lo - span * margin <= value <= hi + span * margin:
        return "edge"
    if edge_band and edge_band[0] <= value <= edge_band[1]:
        return "edge"
    return "OUT"


def analyse(spec):
    cfg = styles()
    style = spec.get("style")
    if style not in cfg["styles"]:
        raise SpecError("unknown style %r; use one of %s" % (style, ", ".join(cfg["styles"])))
    sd = cfg["styles"][style]
    lines = resolve(spec)
    liquid = [l for l in lines if l["kind"] != "garnish"]
    top = [l for l in liquid if l["stage"] == "top"]
    if sd.get("staged") or style == "freeform":
        liquid = [l for l in liquid if l["stage"] != "top"]
    else:
        top = []
    vol = sum(l["ml"] for l in liquid)
    if vol <= 0:
        raise SpecError("no liquid ingredients")
    eth = sum(l["ethanol_ml"] for l in liquid)
    sug = sum(l["sugar_g"] for l in liquid)
    acid = sum(l["acid_g"] for l in liquid)
    extra = sd["dilution"].get("extra_ml", 0)
    init_abv = eth / vol
    dil = dilution(sd, eth / (vol + extra)) if "formula" in sd["dilution"] else sd["dilution"]["fixed"]
    melt = spec.get("melt")
    if style == "bowl":
        melt = sd["dilution"]["melt_default"] if melt is None else melt
        dil = melt
    final_vol = vol * (1 + dil)
    base = None
    if top:
        base = {"ml": round(final_vol, 1), "abv": round(eth / final_vol * 100, 1),
                "sugar": round(sug / final_vol * 100, 2), "acid": round(acid / final_vol * 100, 3)}
        final_vol += sum(l["ml"] for l in top)
        eth += sum(l["ethanol_ml"] for l in top)
        sug += sum(l["sugar_g"] for l in top)
        acid += sum(l["acid_g"] for l in top)
    res = {
        "pairing": spec.get("pairing"), "style": style, "style_label": sd["label"], "serves": spec.get("serves", 1),
        "recipe_ml": round(vol, 1), "dilution": round(dil, 3), "final_ml": round(final_vol, 1),
        "initial": {"abv": round(init_abv * 100, 1), "sugar": round(sug / vol * 100, 2), "acid": round(acid / vol * 100, 3)},
        "final": {"abv": round(eth / final_vol * 100, 1), "sugar": round(sug / final_vol * 100, 2), "acid": round(acid / final_vol * 100, 3)},
        "checks": {}, "unsourced": sorted({l["name"] for l in lines if l["unsourced"]}),
        "notes": [sd["note"]] if sd.get("note") else [],
    }
    if base:
        res["base_after_dilution"] = base
        res["topped_ml"] = round(sum(l["ml"] for l in top), 1)
    if sd.get("freeform"):
        fin = res["final"]
        def dist(s):
            f = cfg["styles"][s].get("finished")
            if not f:
                return 1e9
            return sum(abs(fin[m] - (f[m][0] + f[m][1]) / 2) / max(f[m][1] - f[m][0], 0.5) for m in ("abv", "sugar", "acid") if m in f)
        res["nearest_styles"] = sorted((s for s in cfg["styles"] if s != "freeform"), key=dist)[:3]
        res["ok"] = True
        res["freeform"] = True
        return res
    if spec.get("serves", 1) > 1:
        res["per_serving_ml"] = round(final_vol / spec["serves"], 1)
    margin = cfg["edge_margin"]
    for phase in ("initial", "finished"):
        if phase in sd:
            got = res["initial" if phase == "initial" else "final"]
            for m, band in sd[phase].items():
                name = "%s %s" % (phase, m)
                res["checks"][name] = {"value": got[m], "range": band,
                                       "verdict": verdict(got[m], band, margin, sd.get("edge_bands", {}).get(name))}
    if "expected" in sd["dilution"]:
        res["checks"]["dilution"] = {"value": round(dil * 100, 1), "range": [x * 100 for x in sd["dilution"]["expected"]],
                                     "verdict": verdict(dil, sd["dilution"]["expected"], margin)}
    acc = spec.get("accepted") or {}
    for name in acc.get("checks", []):
        if name in res["checks"] and res["checks"][name]["verdict"] == "OUT":
            res["checks"][name]["verdict"] = "accepted"
    if any(c["verdict"] == "accepted" for c in res["checks"].values()):
        res["accepted"] = {"by": acc.get("by", ""), "why": acc.get("why", "")}
    res["ok"] = all(c["verdict"] != "OUT" for c in res["checks"].values())
    return res


def report(r):
    out = ["%s - %s%s" % (r["pairing"] or "spec", r["style_label"], "  (serves %d)" % r["serves"] if r["serves"] > 1 else ""),
           "recipe %.1f ml -> dilution %.1f%% -> %.1f ml%s" % (r["recipe_ml"], r["dilution"] * 100, r["final_ml"],
            "  (~%.0f ml per serving)" % r["per_serving_ml"] if "per_serving_ml" in r else ""),
           "initial: %.1f%% ABV | %.2f g sugar/100 ml | %.3f%% acid" % (r["initial"]["abv"], r["initial"]["sugar"], r["initial"]["acid"]),
           ("base:    %.1f ml at %.1f%% ABV | %.2f g sugar/100 ml | %.3f%% acid, then %.0f ml topped\n" % (
               r["base_after_dilution"]["ml"], r["base_after_dilution"]["abv"], r["base_after_dilution"]["sugar"],
               r["base_after_dilution"]["acid"], r["topped_ml"]) if "base_after_dilution" in r else "") +
           "final:   %.1f%% ABV | %.2f g sugar/100 ml | %.3f%% acid" % (r["final"]["abv"], r["final"]["sugar"], r["final"]["acid"]), ""]
    for k, c in r["checks"].items():
        mark = {"in range": "ok  ", "edge": "EDGE", "OUT": "OUT ", "accepted": "BY STRUCTURE"}[c["verdict"]]
        out.append("  %s %-16s %7.2f   range %s-%s" % (mark, k, c["value"], c["range"][0], c["range"][1]))
    out.append("")
    if r.get("freeform"):
        out.append("VERDICT: freeform - no ranges applied; nearest styles: %s. Justify the balance in Checks." % ", ".join(r["nearest_styles"]))
    else:
        if r["ok"] and r.get("accepted"):
            out.append("VERDICT: balanced by structure - OUT readings accepted (%s: %s); edges must be justified in the dossier"
                       % (r["accepted"]["by"], r["accepted"]["why"]))
        else:
            out.append("VERDICT: %s" % ("balanced (edges must be justified in the dossier)" if r["ok"] else "OUT OF RANGE - redesign or justify"))
    if r["unsourced"]:
        out.append("unsourced values used: " + ", ".join(r["unsourced"]))
    for n in r["notes"]:
        out.append("note: " + n)
    return "\n".join(out)


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    try:
        r = analyse(load_spec(argv[1]))
    except SpecError as e:
        print("spec error:", e, file=sys.stderr)
        return 2
    print(json.dumps(r, indent=1) if "--json" in argv else report(r))
    return 0 if r["ok"] else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
