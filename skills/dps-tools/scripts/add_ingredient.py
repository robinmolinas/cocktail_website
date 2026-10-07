#!/usr/bin/env python3
"""Add a new ingredient to data/ingredients.json, so the checks can run on it.

The table follows the drink, never the other way round (Robin 2026-09-25): a
surprising pairing from the Flavor Matrix or any other book is welcome, and
the Mixologist adds the row. It's his decision, not Robin's (Robin 2026-09-25):
what protects the guest is their own veto, so the allergen classification is
made on the safe side (see "_rules" in the table), and when the composition is
uncertain it lists every veto the ingredient could plausibly touch.

  add_ingredient.py KEY --name "yuzu juice" --abv 0 --sugar 1.5 --acid 5.5 \
      --contains none --source "unsourced standard value" --by Tomás --pour creator-hero
  add_ingredient.py --added          # rows added by the studio (for the record)
"""
import argparse, datetime, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import DATA, studio_lock, write_atomic  # noqa: E402

PATH = os.path.join(DATA, "ingredients.json")


def load():
    with open(PATH, encoding="utf-8") as f:
        return json.load(f)


def save(d):
    write_atomic(PATH, json.dumps(d, indent=1, ensure_ascii=False) + "\n")


def main():
    with studio_lock():
        return _main()


def _main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("key", nargs="?", help="snake_case key, e.g. yuzu_juice")
    ap.add_argument("--name")
    ap.add_argument("--abv", type=float)
    ap.add_argument("--sugar", type=float, help="g per 100 ml (solids: %% by mass)")
    ap.add_argument("--acid", type=float, help="%% titratable")
    ap.add_argument("--kind", default="liquid", choices=["liquid", "solid", "garnish"])
    ap.add_argument("--contains", help='comma list from the veto enum, or "none" (required: say it explicitly)')
    ap.add_argument("--source", help='book + page, or "unsourced standard value (...)"')
    ap.add_argument("--by", help="who added it (e.g. Tomás)")
    ap.add_argument("--pour", help="the pairing it was added for")
    ap.add_argument("--added", action="store_true", help="list rows the studio added")
    a = ap.parse_args()

    d = load()
    ing = d["ingredients"]
    if a.added:
        rows = [(k, v) for k, v in ing.items() if v.get("added_by")]
        for k, v in rows:
            print("%-24s %-28s contains=%s  (%s)" % (k, v["name"], v["contains"] or "none", v.get("added_by", "?")))
        print("%d added by the studio" % len(rows))
        return 0

    missing = [f for f in ("key", "name", "abv", "sugar", "acid", "contains", "source", "by", "pour")
               if getattr(a, f) is None]
    if missing:
        ap.error("missing: " + ", ".join(missing))
    if not re.fullmatch(r"[a-z0-9_]+", a.key):
        ap.error("key must be snake_case")
    if a.key in ing:
        ap.error("%s is already in the table" % a.key)
    enum = d["_veto_enum"]
    contains = [] if a.contains.strip().lower() == "none" else [c.strip() for c in a.contains.split(",") if c.strip()]
    bad = [c for c in contains if c not in enum]
    if bad:
        ap.error("not in the veto enum %s: %s" % (enum, ", ".join(bad)))

    ing[a.key] = {
        "name": a.name, "abv": a.abv, "sugar": a.sugar, "acid": a.acid, "source": a.source,
        "contains": contains, "kind": a.kind,
        "added_by": "%s, %s, %s" % (a.by, a.pour, datetime.date.today().isoformat()),
    }
    save(d)
    print("added %s (%s), contains=%s" % (a.key, a.name, contains or "none"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
