# Fact audit r4 (step 2): hero-outlaw (The Lovable Rogue)

Hester, round 4 step 2, 2026-10-04. Audited **as they stand**: `psychologist-reading-v2.md` (title block, whoYouAre, yours y1–y5, Notes), `mixologist-draft.md` (r4 step 1) and `specs/hero-outlaw.json` `_status`. Re-read on the page in this session: *Proper* pp. 237–239; Oxford AMARO pdf 98, KRÄUTERLIKÖR pdf 1150, SORGHUM pdf 1834; *Joy* pdf 419; *Matrix* pdf 240. Library search for "Underberg", "Rheinberg", "German bitters": Underberg appears only on *Proper* p. 237 and *Joy* pdf 419, and neither gives its country or its herbs.

## r3 items

D1, D2, D4, D5 landed in the draft (checked by grep); D5 in `_status` too; D6 struck. My r2 strikes: none survive in v2 (grepped "nobody else", "no one had", "never said", "bet"). **PASS.**

## Reading v2

| id | where | text | verdict | fix (old → new) |
| --- | --- | --- | --- | --- |
| R1 | y2 s1 | "Other shops didn't bother with bottles that sold slowly." | **FIX.** The page says "most liquor stores" (F8), not all of them. | "Other shops didn't bother" → "Most liquor shops didn't bother" |
| R2 | y2 s2 | "She told him, in 2014, that she knew how hard those things were to find" | **FIX.** "him" has no antecedent in y2 (the writer was in y1, and a pronoun shouldn't point back across a paragraph). Her words were "many items", not all of them. | "She told him, in 2014, that she knew how hard those things were to find" → "She told that writer, in 2014, that she knew how hard many of those things were to find" |
| R3 | y2 s2 | "while friends in the trade bought Hennessy by the case for the price" | **FIX.** Her words are that they "were more worried about buying massive cases of Hennessy to get a good price" (F9). The verb is a claim. My anchor said "bought": that was my shorthand, now fixed in anchors v3. | "bought Hennessy by the case for the price" → "worried about buying Hennessy by the case at a good price" |
| R4 | y2 s2 | "amaro, the bitter liqueur Italy makes from herbs" (Wren asked) | **PASS.** Oxford AMARO (pdf 98) gives the Italian word for "bitter" and "an Italian form of … potable bitters", and points to HERBAL LIQUEURS. y1's "bitter Italian liqueurs" also passes ("amaros from Italy", p. 237). | — |
| R5 | y2 s3 | "often just as famous for her temper" | **PASS** (the page's "often as much for her cantankerous personality as for her inventory", F11). | — |
| R6 | y2 s4 | "Being told off by her became almost a ritual for her regulars." | **FIX.** A rite of passage happens once, on the way in. A ritual repeats. The swap changes the fact (F14). | "almost a ritual for her regulars" → "almost an initiation for her regulars" |
| R7 | y2 s5–7 | Boelte: first visit, tissue paper, yelled at on the spot; later hired; "He says people are amazed…" | **PASS** (F12, F13 unlinked, F17 attributed). | — |
| R8 | y3 s3 | "And the people she told off were the ones who said her name with pride." | **FIX.** Only one person on the page speaks of the shop afterwards (Boelte), and what he describes is *other people's* amazement, not his pride. The page's plural is that the people told off were the store's "devotees" (F14). | "were the ones who said her name with pride" → "were the ones most devoted to the place" |
| R9 | y4 s2 | "a teaspoon of Underberg, a German herbal bitters," | **FIX.** Neither "German" nor "herbal" is in our books: *Joy* pdf 419 says only that it's a digestif bitters, and *Proper* p. 237 says bitters. My web budget is spent. My own anchor said "German herbal": my shorthand, struck in anchors v3. | "a teaspoon of Underberg, a German herbal bitters, as a nod" → "a teaspoon of Underberg bitters, as a nod" |
| R10 | y4 s2 | "as a nod to the rule she bent so her customers could have it" | **PASS.** She "flouted local liquor laws" to stock it, in a shop crammed "with what they needed" (p. 237), and her motive is on the record (F7). | — |
| R11 | y4 s3 | "the pressed juice of sorghum stalks boiled down until it's dark and rich, because its sweetness sits well with rye" | **FIX** (a small one). Oxford says the pressed juice is boiled into syrup (pdf 1834), and that's all; "until it's dark and rich" makes a process claim nobody has sourced. "Sits well with rye" passes on the *Matrix*'s family pairing with grain (pdf 240). | "boiled down until it's dark and rich, because" → "boiled down into syrup, because" |
| R12 | y1 | 2003; far end of Van Brunt Street; almost on the waterfront; the writer's joke; "found it regardless"; the stock list; grocery-store bitters "stocked those anyway" | **PASS** (F1–F5, F18; C2–C4 respected). | — |
| R13 | epigraph | "This glass holds grocery-store bitters. A Brooklyn liquor shop wasn't supposed to sell them." | **PASS** (F5). Makes sense cold, and it's about the cocktail. | — |
| R14 | whoYouAre, y3 s1–2, y5, tagline | the guest's half; "I like to think" signposted | **PASS.** No fact claims. | — |
| R15 | Notes table | rows for R1, R3, R6, R8 | **FIX.** Mirror each fix in its Notes row (the Notes keep dropped claims otherwise). | Notes: "bought Hennessy by the case for the price" → "worried about buying Hennessy by the case at a good price"; "almost a ritual" → "almost an initiation"; y3 row "said her name with pride" → "most devoted to the place"; add "most liquor shops (F8)" |

## Draft (Tomás)

| id | where | text | verdict | fix (old → new) |
| --- | --- | --- | --- | --- |
| T1 | Recipe, Underberg note (guest-facing) | "recommended; or any German-style herbal digestif bitters" | **FIX.** This is the same gap as R9: what Underberg is ("German", "herbal") isn't in our books. Only "digestif bitters" is (*Joy* pdf 419). It's the same ground I struck "a Southern pantry syrup" on. | "or any German-style herbal digestif bitters" → "or another digestif bitters" |
| T2 | Checks, Makeable | "Sorghum syrup is easy in the US South, harder elsewhere" | **FIX** (label only). | "Sorghum syrup is easy in the US South, harder elsewhere" → "Sorghum syrup is easy to find in the US South, harder elsewhere (my knowledge, unsourced)" |
| T3 | Allergens | Underberg `nuts` on the safe side | **PASS**, and agreed. Not veto-free on purpose. Library gap for Robin: a published Underberg ingredient declaration, which would also settle R9 and T1. | — |
| T4 | Structure, Pairings, Image, closingLine, `_status` | D-fixes landed; sorghum from Oxford pdf 1834 + *Matrix* pdf 240; tissue-paper rye; method matches closing line | **PASS.** | — |

**Anchors** v3 updated in the same call (Hennessy verb; Underberg's origin marked unsourced). Card F9 and F19 already say it correctly.
