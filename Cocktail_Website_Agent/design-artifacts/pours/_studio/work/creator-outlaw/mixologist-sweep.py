import sys, json, copy
sys.path.insert(0, "/Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts")
import balance, _common
spec = json.load(open(sys.argv[1]))
orig = balance.resolve
def run(label, over):
    def patched(s):
        lines = orig(s)
        for l in lines:
            if l.get("key") in over:
                a, sg, ac = over[l["key"]]
                ml = l["ml"]; l["ethanol_ml"] = ml*a/100; l["sugar_g"] = ml*sg/100; l["acid_g"] = ml*ac/100
        return lines
    balance.resolve = patched
    r = balance.analyse(spec)
    fin, ini = r["final"], r["initial"]
    ch = r.get("checks") or r.get("results") or []
    print("%-44s init %.1f%%/%.2fg/%.3f  final %.1f%%/%.2fg/%.3f" % (label, ini["abv"], ini["sugar"], ini["acid"], fin["abv"], fin["sugar"], fin["acid"]), [ (c.get("name"), c.get("verdict")) for c in ch if c.get("verdict")!="in range"] if isinstance(ch, list) else "")
run("v1 as specced", {})
run("vodka 37.5%", {"vodka_citrus": (37.5,0,0)})
run("orange liqueur 30% / 30 g", {"triple_sec": (30,30,0)})
run("orange liqueur 40% / 30 g", {"triple_sec": (40,30,0)})
run("cranberry cocktail 10 g", {"cranberry_cocktail": (0,10,0.65)})
run("cranberry cocktail 14 g", {"cranberry_cocktail": (0,14,0.65)})
run("worst sweet: 37.5 vodka, 30%/30g, cran 14", {"vodka_citrus": (37.5,0,0), "triple_sec": (30,30,0), "cranberry_cocktail": (0,14,0.65)})
run("worst tart: 40 vodka, 40/25, cran 10", {"cranberry_cocktail": (0,10,0.65)})
