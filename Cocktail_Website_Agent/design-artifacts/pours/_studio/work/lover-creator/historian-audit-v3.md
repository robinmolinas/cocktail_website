# Fact audit v3 (final): lover-creator (The Muse), round 7 step 2 (Hester)

Audited: `psychologist-reading-v4.md` (in full) and `mixologist-draft.md` v3 (the mint build), with spec v3 (`_studio/specs/lover-creator.json`). Facts: `fact-cards/gerald-murphy.md` F1–F15. This replaces v2, and it is the final audit in the series.

**Verdict: reading v4 passes in full. The draft has two lines to take word for word (D-1, D-2), and then it passes.**

## Reading v4, sentence by sentence
| Part | Verdict | Basis |
|---|---|---|
| Epigraph "'Juice of A Few Flowers' sounds like a joke. The handwritten card says otherwise." | **Pass.** The heading is the card's own (F3). "Handwritten" is attributed by the caption and G. "Says otherwise" is our reading of a card that turns the phrase into a measured recipe. It's interpretation, and fair: the card is measured, which is what "otherwise" claims. It reads cold, and it's true in either build. | F3 |
| Tagline, name | Pass: no fact. The name rests on y2's attribution. | F3 |
| whoYouAre | Pass: person-only. | — |
| y1 beach, gathering place, Picasso, Hemingway, the Fitzgeralds | Pass (G: "the small beach they frequented… became a gathering place for friends, including the Picassos, the Hemingways, the Fitzgeralds"). | G |
| y1 *Tender Is the Night*, "partly" | Pass. | F12 |
| y1 "just the juice of a few flowers"; "Maybe that's all it was." | Pass (the legend granted). | F1 |
| y2 card at Yale, in Gerald's handwriting, heading, measures, "shaken", rim | Pass, word for word with the card. | F3 |
| y2 "He showed in Paris from 1923, and seven of his fourteen paintings survive." | Pass. | F7, F14 |
| y2 *Cocktail*, the lid alone four months | Pass (G and W agree). | F8 |
| y3 "The charming version is the one that travelled"; "I like to think…" | Pass: our reading, signposted. | — |
| y4 "keeps every one of his measures, and his sugar on the rim" | Pass (spec v3: 30/30/30/15/15 ml, coarse-sugar rim). | F3, spec |
| y4 "I keep that sugar on the outside of the glass, where it sweetens your lips and not the drink" | Pass: our method, owned as ours. | F13 |
| y4 "I made that a mint syrup, and the mint comes from a cocktail he called the Bailey. In a letter, he wrote that he'd invented it, 'as were a great many other good things'." | Pass: the quote is exact, and "invented" is the letter's claim about the Bailey. | F2 |
| y4 "two of his recipes, and joining them is my idea… as a nod to that sentence" | Pass: the required label, and the bartender's own motive. | — |
| y4 "light, bright and properly sharp… fills two small glasses" | Pass. `balance.py` re-run now: 7.3% ABV, 10.92 g, 1.42% acid; 193.8 ml → 2 × 97 ml. | spec |
| y5, closingLine "…and put your name on it." | Pass: no fact. | — |
| Fact tags | Pass. They match the audit, and the y4 rim row is retagged (V2-9). | — |

## `mixologist-draft.md` v3
| # | Text | Verdict | Old → new |
|---|---|---|---|
| Recipe, method | Five measures = the card. "Dip that edge into… coarse sugar" = the card's verb. Outside-only is labelled ours. Mint syrup 250 g/250 ml = 1:1. | Pass. | none |
| Structure | "What's his: all five measures, the shake, and the rim…"; "The mint is his too: the Bailey…, a cocktail he wrote that he'd invented"; "What's ours: joining the two…, sugar on the *outside*…, the two-glass pour". | Pass. | none |
| Balance | Proof re-checked (0.196, 0.161, 0.063, 14.25%). The dated superlative checks out against my 30-spec run. | Pass. | none |
| Pairings | "The mint is his; adding it is mine." Bailey ingredients = F2. LI p. 133 and Codex p. 116 are verbatim. Matrix pdf 282 is on the page. | Pass. | none |
| **D-1** | Makeable: "(*A Brother's Care*'s nick-and-nora holds a stirred scotch Martini)" | **Fix.** *A Brother's Care* is a Rob Roy riff (scotch, vermouth, two sherries, bitters, stirred). Codex files it in the Martini family, but it isn't "a scotch Martini". | "holds a stirred scotch Martini" → "holds a stirred Rob Roy riff" |
| **D-2** | Vetoes: "A one-line note goes on the pour (Wren's condition)", but the note itself isn't in the draft | **Add it**, sourced to the title only (F15). "Statins among them" stays in Checks, labelled unsourced, and out of the note. | Recipe row, grapefruit: note "" → "can interfere with some medicines: if you take any, check first" |
| Makeable: *Beside the First*'s wording | "run the cut side of a lemon wedge around the rim" is verbatim in `creator-sage.md` step 2. | Pass. | none |
| Image brief | Windowsill, no terrace. The card is "handwritten, as *Gastronomica* photographs it". The blossoms point to F1. Must-not list covers the fenced ground. | Pass. | none |
| Names | *In Your Own Hand*: backed. | Pass. | none |

## Anchors
Updated in the same call (anchors follow the audit): the Bailey row is no longer conditional, now that the mint is poured. The maker row adds Paris (F14), as y2 says it. No other anchor fact changed.

## To sign
D-1 and D-2 taken word for word by Tomás, with no other change. Then, on reading v4 and draft v3: "I'd put my name to this."
