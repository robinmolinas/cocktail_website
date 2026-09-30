#!/usr/bin/env python3
"""Regression tests for the Dionysus Pour Studio tools. Run: python3 tests/test_tools.py
They pin the approved pours (three on 2026-09-24, the Visionary on 2026-09-25) and every style's sources: if a script change moves these numbers, it's a bug."""
import os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(HERE), "scripts"))
from _common import load_spec, POURS
from balance import analyse
from allergens import derive
import lint_pour, pourfile, persona

FX = os.path.join(HERE, "fixtures")
fails = []


def check(name, cond, detail=""):
    print(("PASS  " if cond else "FAIL  ") + name + ("" if cond else "  -> " + str(detail)))
    if not cond:
        fails.append(name)


def near(a, b, tol):
    return abs(a - b) <= tol


# balance: tonight's numbers
r = analyse(load_spec(os.path.join(FX, "sage-lover.json")))
check("Connoisseur final 22.4% / 3.82 g / 0.142%", near(r["final"]["abv"], 22.4, .15) and near(r["final"]["sugar"], 3.82, .05) and near(r["final"]["acid"], .142, .003), r["final"])
check("Connoisseur is balanced", r["ok"])
r = analyse(load_spec(os.path.join(FX, "sage-lover-v1-too-dry.json")))
check("Connoisseur v1 fails on sugar (1.88 g)", not r["ok"] and near(r["final"]["sugar"], 1.88, .05), r["final"])
r = analyse(load_spec(os.path.join(FX, "magician-outlaw.json")))
check("Trickster ~19.5% / 6.4 g / 0.51%, ABV is an edge", near(r["final"]["abv"], 19.5, .3) and near(r["final"]["sugar"], 6.4, .15)
      and r["checks"]["finished abv"]["verdict"] == "edge" and r["ok"], (r["final"], r["checks"]["finished abv"]))
r = analyse(load_spec(os.path.join(FX, "innocent-regular-guy.json")))
check("True Friend after 15% melt 16.0% / 7.5 g / 0.82%", near(r["final"]["abv"], 16.0, .15) and near(r["final"]["sugar"], 7.5, .1)
      and near(r["final"]["acid"], .82, .01) and r["ok"], r["final"])
r = analyse(load_spec(os.path.join(FX, "creator-hero.json")))
check("Visionary fizz: soda topped after the shake, 8.8% / 6.22 g / 0.56%, in range",
      near(r["final"]["abv"], 8.8, .15) and near(r["final"]["sugar"], 6.22, .1) and r.get("topped_ml") == 60 and r["ok"], r["final"])
r = analyse(load_spec(os.path.join(FX, "codex-hot-toddy.json")))
check("Codex Hot Toddy is in the hot range (~10.6%)", near(r["final"]["abv"], 10.6, .2) and r["ok"], r["final"])
r = analyse(load_spec(os.path.join(FX, "codex-whisky-highball.json")))
check("Codex Whisky Highball 2:5 is ~11.4%, in range", near(r["final"]["abv"], 11.4, .2) and r["ok"], r["final"])
r = analyse(load_spec(os.path.join(FX, "freeform-milk.json")))
check("freeform: no ranges, never fails, names nearest styles", r["ok"] and not r["checks"] and len(r["nearest_styles"]) == 3, r)
import json as _j
fam = _j.load(open(os.path.join(os.path.dirname(HERE), "data", "styles.json")))["_codex_families"]
check("all six Codex root families have a style", all(fam.get(f) for f in ("old-fashioned", "martini", "daiquiri", "sidecar", "highball", "flip")))
# allergens
check("three pours are veto-free", all(derive(load_spec(os.path.join(FX, f + ".json")))[0] == []
                                       for f in ("sage-lover", "magician-outlaw", "innocent-regular-guy")))
check("nutmeg counts as nuts", derive(load_spec(os.path.join(FX, "nutmeg-punch.json")))[0] == ["nuts"])
# persona
check("132 pairings", len(persona.pairings()) == 132)
check("Connoisseur profile has xlsx example", persona.profile("sage-lover")["xlsx"].get("example") == "Sommelier")
# lint: the approved pours have no errors
files = pourfile.all_pours(POURS)
others = [pourfile.parse(f) for f in files]
for k in ("sage-lover", "magician-outlaw", "innocent-regular-guy", "creator-hero"):
    d, E, W = lint_pour.lint(os.path.join(POURS, k + ".md"), others)
    check("lint: %s has no errors" % k, not E, E)
# library
out = subprocess.run([sys.executable, os.path.join(os.path.dirname(HERE), "scripts", "library.py"), "entry", "solera", "--chars", "200"],
                     capture_output=True, text=True).stdout
check("library: Oxford SOLERA entry with citation", out.startswith("Oxford Companion, SOLERA (pdf 1833)"), out[:80])
# brief: one call carries the whole arrival
out = subprocess.run([sys.executable, os.path.join(os.path.dirname(HERE), "scripts", "brief.py"), "wren", "sage-lover"],
                     capture_output=True, text=True).stdout
check("brief: sanctum, room guide, rules, registry and persona in one output",
      all(x in out for x in ("SANCTUM PERSONA.md", "IN THE ROOM", "STUDIO RULES", "REGISTRY", "PERSONA (persona.py sage-lover)")), out[:80])
print("\n%d failure(s)" % len(fails))
sys.exit(1 if fails else 0)
