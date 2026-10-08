> **Dated collection revision record.** Later editorial progress is in [approved tagline voice](../tagline-voice-approved-2026-10-07.md), which records 36 accepted lines on 8 October. Copy acceptance does not change full-pour approval status. Current cross-track state: [continuation status](../../../2026-10-06-continuation-status.md).

# What was applied, 6 October 2026

Robin answered the decision pack (D1–D14) and said "Apply the routine P1s" and, on the voice rules, "Apply the changes, I trust your taste judgement". This is what landed. Every changed pour has a **"Collection review edits, 2026-10-06"** block at the top of its room record (`../rooms/<pairing>.md`), listing each edit before → after and whose decision it was. Detailed logs are in `applied/`.

**State now:** 132 pours: 4 approved, 128 draft, **0 flagged**. All 132 lint with 0 errors. Live `balance.py`: 0 OUT (12 accepted by structure, 17 freeform, each now with a Codex benchmark). Allergens: every pour file matches `allergens.py`. **105 of 132 are veto-free** (95 this morning). Approved and veto-free: 3, so the AD-4 floor is met. Nothing was approved by the studio.

## By decision

| | what changed |
| --- | --- |
| D1 | Peychaud's, Coca-Cola, Underberg, Batavia arrack and Amaro Nonino rows → none, with the reason kept in each row. Bénédictine, maraschino and kirsch stay nuts. Tomás applied the same rule to `cherry_heering`, `cacao_nib_tincture_gin` and the three apricot rows (→ none: no stated ingredient), and dropped `dairy` from `jaggery_syrup` (it was his unsourced memory). Pours newly veto-free: *No Promises*, *There It Goes*, *Built to Hold*, *With the Bite In*, *Had to Be Serious*, *Not the Same*. *Is It Just Me* is now gluten only. *Not Too Polite* is nuts only. |
| D2–D4 | `balance.py`: Flips have no acid range, there's a new `stirred-spirit` style, and specs carry an `accepted` block reported as **BY STRUCTURE**. 12 flags are off. Tomás benchmarked all 30 structure and freeform drinks against the *Cocktail Codex*, and none is off for its form. The Codex's own Martinis and Bamboo read OUT on the tool the same way. *On the Record* yours 4 → "as a nod to the way he kept saying it" (Hester). |
| D5 | *Don't Look at Me* (jester-ruler), *Nothing Escaped You* (sage-innocent); *Whole World* and *Whatever They Call It* recorded as Robin's picks. |
| D6 | *The Wink* y1 now says who the prisoners were: "men taken in the raids the two had been making on each other the year before". **Correction:** the decision pack's framing ("Texans taken on a raid into Mexico") came from an error on Hester's card. Trimble was a Bexar prisoner taken at San Antonio. Card C5 is corrected. |
| D7, D8 | Kept the cash machine; kept quince paste and malt syrup; *Either Way*'s fallback wording audited and fixed; *Work It Out* now says "made with beef: not for vegetarians". |
| D9 | Five rules written into STUDIO-RULES (plus the evidence rule, judge-by-structure with the Codex, and the variety rules). 11 rule candidates marked settled. |
| D10 | *Far Enough*'s sign-offs accepted. `Dionysus/skills/dps-*` synced from the live root copy; `AGENTS.md` says which is canonical. |
| D11 | *For Good*'s tagline → "You don't mind losing a weekend if nobody loses ten minutes again.", with its whoYouAre companion fix. All other taglines unchanged ("no" = keep). |
| D12 | *Word Gets Round* reworked (4 rounds, three voices, unanimous name): **now a Jack Rose** (apple brandy, lime or lemon by taste, pomegranate grenadine, frozen coupe; 19.3% · 8.22 g · 0.83%; veto-free). The room first tried a vodka Collins and ruled it the same cocktail as *Not Too Polite*'s Tom Collins (see F1). The "official cocktail of Washington, DC" line is gone. |
| D13 | The six variety rules applied across the 128 non-approved pours (120 edits; Caregiver was already within the targets); every family is now within them. |
| D14 | *Making the Calls* ¶1 changed (*On Their Behalf* untouched); the five close-pair one-sentence fixes are in. |
| Routine P1s | All applied: *Nothing to It* strength bands; *For Good* lime; *Against My Better Judgement* pear syrup; *What It Rests On* popcorn note; *The Wink* raw-egg line; *Is It Just Me* nut-warning wording; *Word Gets Round* DC line. *Serviceable*'s Post-it sentence is yours, so it stays, with Hester's note on the desk. |

Plus 69 queue items applied by the editors and 13 by Tomás (keeping times, yields, clarity, *Whoopee*'s lemon 20 → 22.5 ml), Hester's leftovers (3 history cuts, a new epigraph for *Already There* where the proposed one broke her card, *Oxford Companion* naming made consistent), and two tool fixes: `room.py` wrote a string's open items one character per bullet (five Magician pours restored word for word from source), and the balance tool's freeform distance assumed every style had an acid range.

**Not touched:** Robin's own sentences (every robin-edits row), the four approved pours beyond decision items, and every tagline except *For Good*.

## F1–F6: Robin took the recommendations (2026-10-06, evening)

- **F1:** STUDIO-RULES check 3 now says that the same template with the spirit swapped *within its kind* is the same cocktail, while a different spirit family or a real riff makes a different drink. Tomás scanned all 132 (`f1-same-cocktail-scan.md`): **no two pours are the same cocktail**, and 34 close neighbours are different. The closest are *Nothing to It* and *What It Rests On* (both bourbon Old-Fashioneds served up; caramel vs popcorn syrup). Five verdicts rest only on a flavoured sugar or a pinch of seasoning (T1–T5 in the scan), so if Robin ever reads "spark" more narrowly, at most five pours would move.
- **F2:** confirmed. The jaggery dairy stays removed.
- **F3:** *Out of Your Way* goes from about 56% to 49% history (Wren, history cut only; the dossier is kept consistent).
- **F4:** *Before the Room* keeps its 1:6 cassis.
- **F5:** *Let's Try It* adds a style substitute ("any single malt of 40–46% aged at least partly in wine, sherry or port casks", after Oxford's own description of Tasmanian malts); Lark stays recommended; in range across the sweep.
- **F6:** "So I'll name it." is gone from *Word Gets Round*. *Nothing Escaped You* glosses "polarised light (light that vibrates in one direction)", sourced to HyperPhysics.

All 132 lint with 0 errors; 105 veto-free; review.xlsx re-exported.

**Still open, later:** the tagline pass (`calibration-batch.md`; Robin wants a fresh, stronger pass).
