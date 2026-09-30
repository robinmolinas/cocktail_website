#!/usr/bin/env python3
"""allergens.py - derive a pour's `contains` (veto list) from its spec, conservatively.

Usage:
  allergens.py SPEC.json              prints the contains list and why
  allergens.py SPEC.json --check "nuts,dairy"   compare with a declared contains; exit 1 on mismatch

Vetoes are MEDICAL, not taste (Robin, 2026-09-24): classify on the safe side. The allergen decision for
each ingredient lives in data/ingredients.json. An ingredient that isn't there yet stops the check (exit 2)
until the Mixologist adds it with add_ingredient.py, classified on the safe side (every veto it could plausibly
touch). The table never limits the drink, and new rows are his call: the guest's own veto is what protects them.
Veto enum (spine AD-4): egg-white | dairy | gluten | nuts | spice.
"""
import json, sys
from _common import load_spec, resolve, load_json, SpecError

ORDER = ["egg-white", "dairy", "gluten", "nuts", "spice"]


def derive(spec):
    lines = resolve(spec)
    found = {}
    for l in lines:
        for v in l["contains"]:
            found.setdefault(v, []).append(l["name"])
    return [v for v in ORDER if v in found], found


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    try:
        contains, why = derive(load_spec(argv[1]))
    except SpecError as e:
        print("spec error:", e, file=sys.stderr)
        return 2
    print("contains: %s" % json.dumps(contains))
    for v in contains:
        print("  %s <- %s" % (v, ", ".join(why[v])))
    if not contains:
        print("  veto-free (counts toward the AD-4 floor)")
    if "--check" in argv:
        declared = [x.strip() for x in argv[argv.index("--check") + 1].split(",") if x.strip()]
        if sorted(declared) != sorted(contains):
            print("MISMATCH: declared %s, derived %s" % (declared, contains))
            return 1
        print("declared contains matches")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
