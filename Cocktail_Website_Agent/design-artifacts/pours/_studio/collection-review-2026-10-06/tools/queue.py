#!/usr/bin/env python3
"""Collection review 2026-10-06: gather every proposal from reviews/*.md into one ranked queue.

Ranking: priority (P1 < P2 < P3), then routine before Robin (routine work is cleared before he is asked),
then the approved pours last within a tier (they change only for real errors). Writes revision-queue.md.
Usage: python3 queue.py
"""
import re
from pathlib import Path

REVIEW = Path(__file__).resolve().parent.parent
items = []
for f in sorted((REVIEW / "reviews").glob("*.md")):
    t = f.read_text()
    for blk in re.split(r"\n(?=### )", t):
        m = re.match(r"### ([a-z\-]+(?:, [a-z\-]+)*)\s*·\s*(P[123])\s*·\s*ground:\s*([^·\n]+?)\s*·\s*([^\n]+)", blk)
        if not m:
            continue
        body = blk.split("\n", 1)[1] if "\n" in blk else ""
        body = body.split("\n## ", 1)[0].strip()
        kind = m.group(4).lower()
        items.append({"pairing": m.group(1), "p": m.group(2), "ground": m.group(3).strip(),
                      "kind": "routine" if kind.startswith("routine") else "Robin",
                      "approved": "approved" in kind, "src": f.stem, "body": body,
                      "d1": bool(re.search(r"Peychaud|coca_cola|Coca-Cola|cola\b", body))})
order = {"P1": 0, "P2": 1, "P3": 2}
items.sort(key=lambda x: (order[x["p"]], x["d1"], x["kind"] != "routine", x["approved"], x["pairing"]))

out = ["# Ranked revision queue (2026-10-06)\n",
       "Every proposal from the family and corpus reviews, ranked: priority, then routine work before Robin's calls, then approved pours. "
       "Nothing here has been applied. **routine** = no change of meaning, applied by one editor once Robin agrees the batch; "
       "**Robin** = his call (several are cards in `decision-pack.md`); **D1** = waits on the allergen-evidence ruling. "
       "Source file in brackets.\n"]
c = {}
for x in items:
    c[(x["p"], x["kind"])] = c.get((x["p"], x["kind"]), 0) + 1
out.append("| | routine | Robin |\n| --- | --- | --- |\n" + "".join(
    f"| {p} | {c.get((p,'routine'),0)} | {c.get((p,'Robin'),0)} |\n" for p in ("P1", "P2", "P3")))
n = 0
for p in ("P1", "P2", "P3"):
    out.append(f"\n## {p}\n")
    for x in (y for y in items if y["p"] == p):
        n += 1
        tags = [x["kind"], "ground: " + x["ground"]] + (["D1"] if x["d1"] else []) + (["approved pour"] if x["approved"] else [])
        out.append(f"\n### Q{n:03d} · {x['pairing']} · {' · '.join(tags)} [{x['src']}]\n{x['body']}\n")
(REVIEW / "revision-queue.md").write_text("".join(out))
print(n, c)
