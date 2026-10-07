# Fact audit v1: sage-caregiver (The Mentor) · Hester, r3

Audited the files as they stand: `historian-anchors.md` (mine, r2), `mixologist-draft.md` and `specs/sage-caregiver.json` (Tomás, v1), and Tomás's r2 turn. `psychologist-reading-v1.md` didn't exist when I wrote this, so the reading is unaudited and v2 will cover it.
Every page below was opened in this call's session: Oxford pdf 1614–1615, 1851, 1853; *Codex* pp. 128, 138; *Joy* pdf 323–324; *Matrix* pdf 270. I re-ran balance.py on the spec (14.1% · 7.14 g · 0.897%, matching Tomás's figures).

## Fixes (old → new)

| ID | Where | Old | New | Why |
|---|---|---|---|---|
| D1 | draft, Recipe, lemon note | "lemon, as the 21 Club's Southside has it" | "lemon, as Oxford's Southside has it" | Oxford pdf 1851 prints *a* Southside recipe (Felten's entry). It says 21 serves the drink but never gives 21's own recipe. |
| D2 | draft, Checks, Pairings | "Oxford's page, the 21's, says lemon" | "Oxford's page says lemon" | Same as D1. |
| D3 | draft intro line; Checks, Story in the glass; Tomás's r2 turn | "one thing the house didn't put in" / "the one thing the house didn't put in" / "one thing the house never put in" | "one thing that isn't in the Southside as Oxford prints it" (dossier). In guest text, as a signposted reading: "one thing of my own" | **My strongest point this round.** No page tells us what went into 21's Southside, so "the house never put tarragon in" is a claim about 21's recipe that nobody has read. The meaning holds (the drink goes somewhere the printed classic doesn't). It just can't be pinned on the house. Wren: keep this out of the reading too. |
| D4 | spec JSON, `subfamily` | "the 21 Club's house drink (Oxford SOUTHSIDE pdf 1851: gin, lemon, simple syrup, half a dozen mint leaves, …)" | "the 21 Club's house drink (Oxford SOUTHSIDE pdf 1851 names it as such; Oxford's printed recipe: gin, lemon, simple syrup, half a dozen mint leaves, …)" | The colon hands Oxford's recipe to the 21 Club (a pitfall I've logged before). |
| D5 | draft, Checks, Balance | "**14.1% ABV · 7.14 g sugar/100 ml · 0.90% acid**" | "**14.1% ABV · 7.14 g sugar/100 ml · 0.90% acid** (with the 47% gin in the ingredient table; 43% gives 12.9%)" | The headline figure belongs to a 47% gin, but the recipe note says "ideally 43% or stronger". A guest with a 43% gin gets 12.9%, which is still in range. Say which bottle the number is for. |
| D6 | draft, Recipe, gin note | "40% works, just a touch lighter" | "40% works, just a touch lighter than we'd like" (or keep it, and own the EDGE in Checks, as the Sweeps row already does) | 40% runs EDGE on strength (12.0%, under the 12.5 floor). "Works" is fine *only* because the Sweeps row owns the edge. Tomás's call. A pass if he keeps the Sweeps line. |
| D7 | draft, Checks, Pairings | "Gin, lemon and tarragon already meet in Humberto Marques's Little Dragon … so the pairing is proven in a glass" | "Gin, lemon and a tarragon sprig already share a glass in Humberto Marques's Little Dragon (with mango, dry sherry, honey and matcha; *Joy* pdf 323–324)" | In the Little Dragon, the tarragon is a garnish sprig only, among four other flavours. "Proven" goes further than that. Checks only. |

## Passes

| Claim | Source | Verdict |
|---|---|---|
| Southside = tall gin, lemon, sugar, mint, soda; "for many years" 21's house drink; 45/30/22.5/about 6 leaves, shaken, strained over ice, soda, mint sprig | Oxford pdf 1851 | pass. "Half a dozen" = 6 ✓. |
| Steeped mix left out | Oxford pdf 1851 (2–3 days in the fridge) | pass (Wren's fence). |
| Codex files the Southside as a Daiquiri variation | *Codex* p. 128 ("this classic Daiquiri variation") | pass. Note: the Codex's own Southside is lime, up, in a coupe, with a dash of Angostura. That's why our tall build follows Oxford, not the Codex. Never say "the Codex's Southside". |
| 60 ml gin = the Codex's Tom Collins weight; a short shake of about five seconds | *Codex* p. 138 (2 oz Beefeater; "about five seconds") | pass. Method step 2 matches the page. The Codex pours seltzer first and doesn't stir. Our soda-last-plus-one-stir is our own method, and it's fine as ours. |
| Citrus-aroma compounds are found in many herbs, "especially basil, sage, mint, tarragon" | *Matrix* pdf 270 | pass. "Shares mint's citrus side" is a fair gloss of the list, labelled as a pairing note. |
| Clapping a sprig to release its scent | Oxford pdf 1853 | pass for Makeable. The technique's credit (Maloney, Milk & Honey) stays out of guest text: ruler-outlaw's man, and Lover-family ground. |
| Tarragon used in no other pour | grep of `pours/` (only "Tarragona" turns up, in Chartreuse rows) | pass. |
| Evelyn's tarragon line kept out | *Joy* pdf 324 (a health claim) | pass. |
| closingLine "Put the two sprigs in together. Then call one of them, and ask what they know now that you don't." | no fact in it; "call one of them" and "know now" not found in the pour files | pass on facts. The wording is Tomás's and Wren's to rule. |
| Image brief | no historical claim (no bar, no 21, no people) | pass. |

## My own anchors, self-audit
- The C1 founder fence stands, and it also covers the dossier: write "Jerry Berns, at the 21 Club", never "founder". Grep the draft: there's no "founder" in it ✓.
- I added one line to this audit, not to the anchors: the Codex Southside differs from Oxford's (above). No anchors row says "the Codex's Southside", so nothing to fix there.
- My r2 "pitched" never reached the anchors ("talked to six") ✓. "Five turned him down" isn't in any file ✓.

## Status
Drink v1 passes on facts once D1–D4 land (D5–D7 are clarity fixes, Tomás's call). The reading isn't audited yet. **Not yet.**
