# Tomás's sweep for explorer-hero (round 4). Temporary rows exist only inside this script.
import sys, json
sys.path.insert(0, "/Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts")
import _common, balance
orig = _common.ingredients
base = orig()
def extra():
    d = dict(base)
    for a in range(40, 71):
        d["b%d" % a] = {"name": "bourbon %d" % a, "abv": a, "sugar": 0, "acid": 0, "source": "sweep", "contains": [], "kind": "liquid"}
    for s in (50, 55, 61.5, 70, 75):
        d["car%s" % s] = {"name": "caramel %s" % s, "abv": 0, "sugar": s, "acid": 0, "source": "sweep", "contains": [], "kind": "liquid"}
    return d
balance.resolve.__globals__["ingredients"] = extra
def run(key, bml, water, syr="caramel_syrup", sml=7.5, dashes=2):
    ing = [{"key": key, "ml": bml}, {"key": syr, "ml": sml}, {"key": "angostura", "dashes": dashes}]
    if water: ing.append({"key": "water", "ml": water})
    r = balance.analyse({"pairing": "t", "style": "stirred", "ingredients": ing})
    c = r["checks"]; f = r["final"]
    bad = [k for k, v in c.items() if v["verdict"] != "ok" and v["verdict"] != "in range" and "acid" not in k]
    return "%-17s %4.1f + %4.1f water | %-7s %4.1f ml, %d dashes | fin %4.1f%% / %4.2f g, dil %4.1f%%, %5.1f ml | %s" % (
        key, bml, water, syr, sml, dashes, f["abv"], f["sugar"], r["dilution"] * 100, r["final_ml"],
        ", ".join("%s %s" % (k, c[k]["verdict"]) for k in bad) or "in range (acid aside)")
print("== spec v1, named bottle")
print(run("bourbon_blantons", 60, 0))
print("== label bands: bourbon + water = 60 ml, each band at both ends")
bands = [((40, 48), 60, 0), ((48, 53), 55, 5), ((53, 58), 50, 10), ((58, 63), 45, 15), ((63, 70), 40, 20)]
for (lo, hi), b, w in bands:
    for a in range(lo, hi + 1):
        if a in (lo, hi) or a == (lo + hi) // 2:
            print(run("b%d" % a, b, w))
print("== caramel strength (the home syrup's real sweetness is uncertain), at 46.5% named bottle")
for s in (50, 55, 61.5, 70, 75):
    print(run("bourbon_blantons", 60, 0, "car%s" % s))
print("== syrup volume")
for ml in (5, 10):
    print(run("bourbon_blantons", 60, 0, sml=ml))
print("== bitters 1-3 dashes")
for d in (1, 3):
    print(run("bourbon_blantons", 60, 0, dashes=d))
print("== v1 bands (label 'up to'), each at its lower and upper end")
for a in (47.5, 51.5, 57.0, 63.0, 70.0):
    d = extra(); d["bx%s" % a] = dict(d["b40"], abv=a, name="bourbon %s" % a)
    balance.resolve.__globals__["ingredients"] = lambda d=d: d
for lo, hi, b, w in ((40, 47.5, 60, 0), (47.5, 51.5, 55, 5), (51.5, 57.0, 50, 10), (57.0, 63.0, 45, 15), (63.0, 70.0, 40, 20)):
    for a in (lo, hi):
        d = extra(); d["bx"] = dict(d["b40"], abv=a, name="bourbon %s" % a)
        balance.resolve.__globals__["ingredients"] = lambda d=d: d
        print("%5.1f%% " % a + run("bx", b, w))
