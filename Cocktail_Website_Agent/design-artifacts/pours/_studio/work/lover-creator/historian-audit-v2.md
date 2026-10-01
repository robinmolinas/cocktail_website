# Fact audit v2: lover-creator (The Muse), round 6 (Hester)

Audited: `psychologist-reading-v2.md` (mint build) and `mixologist-draft-card-alone-v2.md` (Tomás's live draft, card alone, coarse-sugar syrup). Facts: `fact-cards/gerald-murphy.md` (F1–F15). Replaces v1. **[S]** = depends on the syrup ruling (mint vs coarse sugar). Replacements are exact, so they can be taken word for word.

**Verdict: Not yet.** There are three fixes (V2-1, V2-2, V2-4), plus y4 in whichever build is ruled. Everything else passes.

## Carried from v1
| v1 item | Status in v2 |
|---|---|
| A1 "found" | Fixed ("favourite" = G's "frequented"). **"soon" survives**: see V2-1. |
| A5 "in Gerald's handwriting" | **Stands bare: pass.** Attributed by the caption ("Gerald Murphy's recipe") and by G's text ("copied out in his neat handwriting"). The fact tag cites both. No softener. |
| A5c "showed in Paris" | Cut from v2. Nothing to check. |
| A6 "Everyone kept…" | Still optional (our reading). |
| A8 y4 "I didn't add a thing" | Gone. New y4 audited below (V2-3, V2-4). |
| A11 epigraph | **Still fails cold**: see V2-2. |
| B5 "terrace" | Fixed in the live draft ("a pale, sun-warmed stone ledge"). If the mint build ships, carry the same fix and B4 ("the mint is his; adding it is mine") into its draft. The v1 mint draft is no longer in the folder. |

## Reading v2
| # | Text (v2) | Verdict | Old → new |
|---|---|---|---|
| **V2-1** | y1 "had a favourite little beach near Antibes, **and soon** Picasso, Hemingway and the Fitzgeralds were on it with them" | **Fix.** G gives no timing for the beach becoming "a gathering place for friends". | "had a favourite little beach near Antibes, and soon Picasso, Hemingway and the Fitzgeralds were on it with them." → "had a favourite little beach near Antibes, and it became a gathering place for their friends: Picasso, Hemingway, the Fitzgeralds." |
| **V2-2** | Epigraph "The name sounds like a joke. The handwritten card behind it is measured to the half-ounce." | **Fails cold.** The guest reads it just after the title *In Your Own Hand*, so "the name" is that name, and it isn't a joke. The half-ounce is now on the card, which fixes v1's second problem. | → "'Juice of a few flowers' sounds like a joke. The card is measured to the half-ounce." (16 words. It quotes the card's own heading, F3, so it's true in either build.) |
| V2-3 | y2 (measures, rim, "Seven of his fourteen paintings survive, and in one of them, *Cocktail*, the lid of a cigar box alone took him four months") | Pass (F3, F7, F8). | none |
| **V2-4** | y4 **[mint]** "But sugar on the rim sweetens your lips, not the drink, so it needed a little more, inside. I made that sweetness with mint, from a cocktail he called the Bailey." | **Fix, two parts.** (a) "Sugar on the rim… not the drink" holds only because *we* keep it on the outside (Regan's method, *Joy* pdf 137; his card just says "dip in coarse sugar", F13). (b) "Made that sweetness with mint" says the mint sweetens. The sugar sweetens, and the mint flavours the syrup. | "But sugar on the rim sweetens your lips, not the drink, so it needed a little more, inside. I made that sweetness with mint, from a cocktail he called the Bailey." → "But I keep that sugar on the outside of the glass, where it sweetens your lips and not the drink, so it needed a little more, inside. I made that a mint syrup, and the mint comes from a cocktail he called the Bailey." |
| V2-5 | y4 **[mint]** "In a letter, he wrote that he'd invented it, 'as were a great many other good things'. So this drink comes from two of his recipes, and joining them is my idea: I put the mint in as a nod to that sentence, where he simply says he made it." | **Pass.** F2: the quoted words are exact, and "invented" sits outside the quotes as the letter's claim about the Bailey. "Two of his recipes… my idea" is the required label. "As a nod" is the bartender's own motive, which is ours to state. | none |
| V2-6 | y4 "It's light, bright and properly sharp, four fresh juices and a little gin, and it fills two small glasses." | Pass (7.3%, 1.42% acid; 194 ml → 2 × 97 ml). | none |
| V2-7 | y4 **[coarse sugar]**, if Tomás's build is ruled. His offered line: "The cocktail I've made for you is that card, to the half-ounce. The only thing I added is more of his own sugar: he put it on the rim, and I dissolved a little in the glass as well, because his juices are sharp." | **Pass**, with one word. "His own sugar" is the card's "coarse sugar", and the syrup is made from the same (spec). "Because his juices are sharp" is backed by the balance (ratio 2.7 as written). Add the two glasses, because the closing line needs them. | "…because his juices are sharp." → "…because his juices are sharp. It's light and bright, and it fills two small glasses." |
| V2-8 | y5, the closing line in either wording | Pass: no fact. (The dossier note for Wren's version, "what Murphy did in his letter", is F2 and passes.) | none |
| V2-9 | Fact tags, y4 row "Regan… (the rim's sugar doesn't reach the drink)" and the front-matter line | Retag so the dossier doesn't hold the stronger claim (anchors follow the audit). | → "Regan, *Joy* pdf 137–138: rim sugar is kept on the outside only, so none falls into the drink (our method; the card says only 'dip in coarse sugar', F13)" |

## Tomás's live draft (card alone v2)
| # | Text | Verdict | Old → new |
|---|---|---|---|
| D1 | Balance: "At 7.3% it's the lightest pour in the studio (the next is *Down the Line*, 8.8%), and at 1.42% acid the sharpest" | Pass. I ran `balance.py` on all 30 specs on 2026-09-30. It needs the date. | "the lightest pour in the studio" → "the lightest of the 30 pours so far (balance.py, 2026-09-30)" |
| D2 | "The rim sugar is on the outside (Regan, *Joy* pdf 137)" | Pass, as our method (F13). | none |
| D3 | No-in-range proof (0.196 g acid per ml of alcohol at 47%, 0.161 at 57%; ceilings 0.063/0.076/0.06) | Arithmetic re-run: 2.76 g acid / 14.1 ml = 0.196 ✓; 17.1 ml → 0.161 ✓; 0.94/15 = 0.063 ✓; 57% before ice 17.1/120 = 14.25% ✓. | none |
| D4 | Rim sugar "about 2 g each" | Labelled unsourced by Tomás. Fine in Checks. | none |
| D5 | Grapefruit note: "statins among them" | Unsourced (his label). It stays out of the guest note. | Guest note → "Grapefruit can interfere with some medicines. If you take any, check first." (F15) |
| D6 | Image brief: stone ledge, no terrace | Pass (B5 fixed). | none |

## Name
*In Your Own Hand*: backed (v1 C). It rests on the same attribution as y2.

## Anchors
The Bailey row in `historian-anchors.md` is in if the mint is ruled, and goes to the dossier if the coarse sugar is. No anchor fact changes, and the anchors hold no rim claim, so V2-4 and V2-9 touch only the reading and its tags.

## To sign
V2-1 and V2-2 taken, y4 in the ruled build with V2-4 (mint) or V2-7 (coarse sugar), V2-9 retagged, and D1 dated. Then: "I'd put my name to this."
