#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""studio_init.py - create the studio's working folder (pours/_studio/) if it's missing. Safe to re-run.

Usage:
  studio_init.py            create what's missing, report what exists
  studio_init.py --check    report only (exit 1 if anything is missing)

Creates: rooms/ (one room record per pour), specs/ (Tomás's drink specs), fact-cards/ (Hester's),
work/ (per-pour scratch), index.md, rule-candidates.md; seeds specs/ for already-authored pours from
the tools' test fixtures; then writes registry.md + menu-assessment.md. Never moves or edits pours or
STUDIO-RULES.md (the rulebook stays at pours/STUDIO-RULES.md).
"""
import os, shutil, sys
from _common import POURS, STUDIO, TOOLS

DIRS = ["rooms", "specs", "fact-cards", "work"]
INDEX = """# Studio index

Orientation for every studio agent. Read first.

- **Rulebook (Robin's):** `../STUDIO-RULES.md`
- **Pours:** `../<pairing>.md` (status: draft | flagged | approved; only Robin approves)
- **Room records:** `rooms/<pairing>.md` (the conversation IS the record)
- **Drink specs (Tomás):** `specs/<pairing>.json`
- **Fact cards (Hester):** `fact-cards/<topic>.md`
- **Scratch per pour:** `work/<pairing>/`
- **Registry + menu view:** `registry.md`, `menu-assessment.md` (regenerate: `registry.py --write`)
- **Rule candidates for Robin:** `rule-candidates.md`

## Batches
| batch | pairings | status | started | notes |
| --- | --- | --- | --- | --- |
"""
RULES = """# Rule candidates

Proposed by the room or learned from Robin's edits. Nothing here is a rule until Robin accepts it
(then it's added to `../STUDIO-RULES.md`).

| date | proposed by | rule | why | Robin |
| --- | --- | --- | --- | --- |
"""


def main(argv):
    if len(argv) > 1 and argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    check = "--check" in argv
    missing = []
    for d in DIRS:
        p = os.path.join(STUDIO, d)
        if not os.path.isdir(p):
            missing.append(d + "/")
            if not check:
                os.makedirs(p)
    for name, body in (("index.md", INDEX), ("rule-candidates.md", RULES)):
        p = os.path.join(STUDIO, name)
        if not os.path.exists(p):
            missing.append(name)
            if not check:
                open(p, "w", encoding="utf-8").write(body)
    fx = os.path.join(TOOLS, "tests", "fixtures")
    for f in sorted(os.listdir(POURS)):
        if not f.endswith(".md") or not f[0].islower():
            continue
        pairing = f[:-3]
        spec, seed = os.path.join(STUDIO, "specs", pairing + ".json"), os.path.join(fx, pairing + ".json")
        if not os.path.exists(spec) and os.path.exists(seed):
            missing.append("specs/%s.json" % pairing)
            if not check:
                os.makedirs(os.path.dirname(spec), exist_ok=True)
                shutil.copy2(seed, spec)
    if check:
        print("missing: " + ", ".join(missing) if missing else "studio complete")
        return 1 if missing else 0
    print("created: " + ", ".join(missing) if missing else "studio already complete")
    import registry
    registry.main(["registry.py", "--write"])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
