# Tomás, regular-guy-jester r3 sweep. Runs balance.py (freeform = no water; then +melt water)
# Malört row is at 2.4 g/100 ml (US liqueur legal floor, Hester r3). Higher Malört sugar is modelled by adding the extra as granulated sugar (g).
import json, subprocess, tempfile, os
T = "/Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/balance.py"
def run(mal=60, gf=60, maple=5, malsug=2.4, water=0, style="freeform", vodka=0):
    ing = [{"key": "jeppsons_malort", "ml": mal}, {"key": "grapefruit_juice", "ml": gf},
           {"key": "maple_syrup", "ml": maple}, {"key": "saline_solution", "drops": 5}]
    if vodka: ing.append({"key": "vodka", "ml": vodka})
    if malsug > 2.4: ing.append({"key": "sugar", "g": round(mal * (malsug - 2.4) / 100, 2)})
    if water: ing.append({"key": "water", "ml": water})
    spec = {"pairing": "sweep", "family": "daiquiri", "style": style, "glass": "coupe", "ingredients": ing, "garnish": []}
    f = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False); json.dump(spec, f); f.close()
    out = subprocess.run(["python3", T, f.name], capture_output=True, text=True).stdout
    os.unlink(f.name)
    line = [l for l in out.splitlines() if "finished" in l.lower() or "%" in l][:3]
    print(f"mal{mal} gf{gf} maple{maple} malsug{malsug} water{water} vodka{vodka} {style}:: " + " | ".join(l.strip() for l in line))
print("== frozen-grapefruit (freeform, no water), maple x Malort sugar")
for ms in (2.4, 4, 6):
    for mp in (4, 5, 6, 7.5):
        run(maple=mp, malsug=ms)
print("== stray melt, spec")
for w in (10, 20): run(water=w)
print("== strength sweep of substitute (bäsk 30-40%) approximated by Malört volume")
run(mal=51.4, water=8.6)  # ~30% equivalent ethanol
run(mal=68.6, water=0)  # ~40% besk equivalent ethanol (slightly more volume; sugar of extra Malört overstated)
print("== ordinary ice, shaken (the rejected way)")
run(style="shaken"); run(style="shaken", gf=30, maple=10)
