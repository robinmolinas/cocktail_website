# Hester: fact audit v2 (round 4, step 2)

Audited as they now stand: `psychologist-reading-v2.md` (16:45), `mixologist-draft.md` v1.1 (16:45), `_studio/specs/regular-guy-outlaw.json` (v1.1), and my own `historian-anchors.md`. Re-checked in this call: Oxford PINK GIN pdf 1520, FRENCH 75 pdf 851 (Arnaud's spec), and *Codex* pp. 138 and 142. I ran `balance.py` on Arnaud's flute recipe for C1.

**Verdict: FAIL on one wording each (C1 Wren, D1 Tomás). Everything else passes.** A1–A8 and B1–B4 from v1 have all landed in the files (checked line by line below).

## v1 fixes: landed?
| ID | In the file now | Status |
|---|---|---|
| A1 | epigraph: "The man sent to sell the gin in this glass said he never sold a bottle." | ✓ |
| A2 | "An American whiskey company took over selling Plymouth and wanted nothing to do with whatever his job was" | ✓ (Jim Beam: Oxford's "Jim Beam company", *Proper* p. 111) |
| A3 | "Then" cut | ✓ |
| A4 | "Somebody guessed, and didn't mind." | ✓ |
| A5 | "and the idea was copied across the trade" | ✓ |
| A6 | demi-sec line gone | ✓ |
| A7 | "the gin he said he never sold" | ✓ |
| A8 | "a rule people love to quote … They needn't. The original recipe went over cracked ice, in a tall tumbler." | ✓ (see Wren's question below) |
| B1 | Structure: Daiquiri family, p. 138 quoted; spec `"family": "daiquiri"` | ✓ |
| B2 | "I depart from the Codex's cut on purpose" with its words | ✓ |
| B3 | "the original recipe sides with the ice (Oxford pdf 851)" in the intro and Pairings | ✓ |
| B4 | "Arnaud's flute version is, in Oxford's words, 'counter to the original recipe'" | ✓ |

## New findings
| ID | Owner | Where | Old | Problem | New |
|---|---|---|---|---|---|
| **C1** | Wren | y4 | "I've made it a little stronger, sharper and sweeter than the flute version" | Oxford's own flute version (Arnaud's, pdf 851: 37 cognac / 7 / 7 / 75 brut) runs **17.4% / 3.62 g / 0.68%** by `balance.py` (collins). Ours is 15.0 / 7.15 / 0.95. That's **sharper and sweeter than both flute recipes on our pages, but stronger than the Codex's only, not Arnaud's**. "The flute version" can't carry "stronger". | "I've made it a little sharper and sweeter than the flute version, so it stays balanced as the ice melts into it." |
| **D1** | Tomás | Checks, "y4 claim (for Wren)" row | "So 'stronger, sharper and sweeter than the usual recipe' is true." | Same as C1. Arnaud's flute recipe is stronger (17.4%). | "Against both flute recipes on our pages (Codex p. 142: 13.7% / 5.35 g / 0.89%; Arnaud's, Oxford pdf 851: 17.4% / 3.62 g / 0.68%, `balance.py` collins), ours is sharper and sweeter. It's stronger than the Codex's only, so the reading says 'sharper and sweeter'." |

## Passes (claims re-read this round)
- **"The original recipe went over cracked ice, in a tall tumbler"** (Wren's question): **fair.** Oxford's traditional recipe is strained "into a highball glass filled with cracked ice". Its Arnaud sentence makes "served up" and "flute" "counter to the original recipe" (pdf 851). A highball glass is a tall, straight-sided tumbler, so "tall tumbler" is a plain-language gloss, not a new claim. Citation only: Oxford FRENCH 75, pdf 851.
- "a French 75, a renowned Champagne classic": the Codex files it as CLASSIC (p. 142). Oxford says it "commands a healthy respect" and is a station of the renaissance's "cocktail cult" (pdf 850–851). ✓
- "a rule people love to quote": the bartender's voice, granted and then corrected at once by a sourced line. No page is claimed for it. ✓
- "so it stays balanced as the ice melts into it": Tomás's melt sweep is in range to +40 ml, and no time is promised. ✓
- "The rest of the bottle goes round the table … when Ford got a yes, other people came along": method step 6, and the handful of bartenders (*Proper* p. 111). ✓
- y1–y3 are unchanged from v1 passes or v1 fixes. "On the bills, Blacknell said" is fair: the invoicing is the subject of his quote (p. 111). Optional: "Of the trips", the page's own scope.
- Epigraph: "the gin in this glass" names the recommended bottle. Plymouth is the recommendation, so it holds.
- Tomás: PINK GIN quote "the addition of ice was common, if not exactly approved" ✓ (pdf 1520, verbatim). Codex p. 138 "the Daiquiri's extended family … sours that have bubbly ingredients added" ✓. Codex p. 142 30/15/15/120 and "half the gin, and two-thirds…" ✓. The 44% sweep and the "use 45 ml" note ✓. The registry triple is free ✓. The closing line, image brief and names have no fact problems.

## Notes (not blocking; dossier wording)
- N5 (Wren, Resonance): "Blacknell was 'brought in to save' it, the page's verb". The page's verb is "**called in** to save" (*Proper* p. 109). y1's "brought in" is a fair paraphrase. Only the "the page's verb" label is off.
- N6 (Tomás, Strength sweeps): "returned it 'to close to its original proof', 44%". Oxford doesn't number the "original proof". 44% is the 1860 bottling (pdf 1538). Write "(44% in the 1860 bottling, pdf 1538)", so the number isn't put in pdf 1541's mouth.
- N7: "Ford's invoices" in the image brief. The invoicing on p. 111 was for Plymouth's trips. As an unreadable prop it's fine.
- The lint warnings ("he/his" in the epigraph and yours 1–4): every one is Ford or Blacknell, or the epigraph's "the man sent". None is the guest. **Accept.**

## Anchors
No anchor carries "stronger" or "the page's verb", so `historian-anchors.md` stands as written in round 3. Grepped for: "stronger", "flute version", "original proof", "brought in". No hits needing change.
