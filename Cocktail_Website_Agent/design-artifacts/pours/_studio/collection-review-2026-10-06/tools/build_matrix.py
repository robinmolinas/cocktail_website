#!/usr/bin/env python3
"""Collection review 2026-10-06: the 132-row review matrix and the image/copy handoff index.

Joins matrix.json (computed: balance, allergens, neighbours, tagline flags), lint/ results and the
family reviewers' "Matrix rows" tables (reviews/<family>.md). Writes:
  matrix-132.md       one row per ordered pairing; technical, editorial and persona axes kept separate
  matrix-132.csv      the same, for a spreadsheet
  handoff/index.md    every permanent pairing key with what is settled and what is still open
Usage: python3 build_matrix.py
"""
import csv, json, re
from pathlib import Path

REVIEW = Path(__file__).resolve().parent.parent
m = json.loads((REVIEW / "matrix.json").read_text())

# reviewer rows
rv = {}
for f in sorted((REVIEW / "reviews").glob("*.md")) if (REVIEW / "reviews").exists() else []:
    t = f.read_text()
    sec = t.split("## Matrix rows", 1)[-1].split("\n## ", 1)[0]
    for line in sec.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 10 and cells[0] in m:
            rv[cells[0]] = dict(zip(["T", "H", "V", "P", "tagline", "priority", "top issue"], cells[3:10]))


def lint_summary(k):
    p = REVIEW / "lint" / f"{k}.txt"
    if not p.exists():
        return "?"
    s = re.search(r"(\d+) error\(s\), (\d+) warning\(s\)", p.read_text())
    return f"{s.group(1)}e/{s.group(2)}w" if s else "?"


def contains_norm(x):
    s = re.sub(r"[`\s]", "", x or "").split("(")[0]
    try:
        return sorted(json.loads(s))
    except Exception:
        return s


rows = []
for k, r in sorted(m.items()):
    b = r["balance"]
    tool = r["contains_tool"]
    drift = "" if contains_norm(r["contains_file"]) == (sorted(tool) if isinstance(tool, list) else tool) else "DRIFT"
    rev = f"{r['secondary']}-{r['primary']}"
    q = rv.get(k, {})
    rows.append({
        "pairing": k, "personality": r["personality"], "name": r["name"], "status": r["status"].split()[0],
        "drink": f"{r['family']}/{r['style']}" + (f" ×{r['serves']}" if r["serves"] and r["serves"] != 1 else ""),
        "ABV/sugar/acid": f"{b.get('abv','?')}/{b.get('sugar','?')}/{b.get('acid','?')}",
        "balance": "OUT" if b.get("verdict", "").startswith("OUT") else ("freeform" if b.get("verdict", "").startswith("freeform") else ("edge" if b.get("raw_out") else "ok")),
        "contains": (", ".join(tool) if isinstance(tool, list) and tool else ("veto-free" if tool == [] else str(tool)[:30])) + (f" ({drift})" if drift else ""),
        "lint": lint_summary(k),
        "tagline flags": ", ".join(r["tagline_flags"]),
        "nearest recipe": f"{r['neighbours'][0][0]} {r['neighbours'][0][1]}" if r["neighbours"] else "",
        "reversed": f"{rev} *{m[rev]['name']}*" if rev in m else "",
        "T": q.get("T", ""), "H": q.get("H", ""), "V": q.get("V", ""), "P": q.get("P", ""),
        "tagline verdict": q.get("tagline", ""), "priority": q.get("priority", ""), "top issue": q.get("top issue", ""),
    })

cols = list(rows[0].keys())
md = ["# Collection matrix: all 132 ordered pairings (2026-10-06)\n",
      "Computed columns (drink → nearest recipe) come from the live tools; T (technical/makeability), H (history), V (voice), P (persona fit and distinctiveness), tagline verdict and priority come from the family reviews in `reviews/`. Axes are kept separate on purpose. Status is the pour file's; draft is not approval.\n",
      f"Reviewed rows: {len(rv)} of {len(rows)}.\n",
      "| " + " | ".join(cols) + " |", "| " + " | ".join("---" for _ in cols) + " |"]
for r in rows:
    md.append("| " + " | ".join(str(r[c]).replace("|", "/") for c in cols) + " |")
(REVIEW / "matrix-132.md").write_text("\n".join(md) + "\n")
with open(REVIEW / "matrix-132.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    w.writerows(rows)

# handoff index
(REVIEW / "handoff").mkdir(exist_ok=True)
h = ["# Handoff by permanent pairing key (2026-10-06)\n",
     "For the catalogue import (matching track) and image production. **Settled** = Robin has approved the pour (`status: approved`); nothing else is settled, whatever its draft quality. Image production starts only from a settled pour (continuation plan, decision 5), using `design-artifacts/persona-image-system.md`: where a dossier brief still asks for \"one impossible detail\", keep it as the authors' intent and replace it in the production brief with ordinary human traces (system, step on older briefs). Pairing keys are `<primary>-<secondary>`, ordered; A×B and B×A are different outcomes.\n",
     "| pairing | personality | name | settled? | recipe/copy handoff | image brief | open before hand-off |",
     "| --- | --- | --- | --- | --- | --- | --- |"]
for r in rows:
    k = r["pairing"]
    settled = r["status"] == "approved"
    opens = []
    if "DRIFT" in r["contains"]:
        opens.append("contains line vs live table (decision D1)")
    if r["status"] == "flagged":
        opens.append("flag: " + m[k]["flag"][:90])
    if m[k]["serves"] and m[k]["serves"] != 1:
        opens.append(f"serves {m[k]['serves']}: reconcile with the one-glass image rule")
    h.append(f"| {k} | {r['personality']} | *{r['name']}* | {'**yes** (approved)' if settled else 'no (' + r['status'] + ')'} | "
             f"{'`../../../' + k + '.md` Cocktail + Reading; spec `../../specs/' + k + '.json`' if settled else '—'} | "
             f"{'dossier `### Image brief`' if m[k]['image_brief'] else 'missing'} | {'; '.join(opens) or '—'} |")
(REVIEW / "handoff" / "index.md").write_text("\n".join(h) + "\n")
print(f"matrix rows {len(rows)}, reviewed {len(rv)}")
