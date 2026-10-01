# Fact audit v1: magician-caregiver (Hester, round 4)

Against: `psychologist-reading-v1.md` (Wren, r3) and spec v0 (`_studio/specs/magician-caregiver.json`, Tomás r3). Card: `fact-cards/pink-lady-hazel-dawn.md` F1–F21, C1–C9.
Verdict: **Not yet.** Two blockers (X1, X2), five fixes, the rest pass.

## Blockers

| id | where | text | problem | fix |
|---|---|---|---|---|
| X1 | y4 | "is the drink from that night, the original Pink Lady the books lost: sweet ojen shaken with both bitters. I've added one thing…: a measure of fino" | False against spec v0. v0 is 20 ml anís dulce + **30 ml anís seco** + 30 ml fino + bitters: two changes (the anise split and the fino), and no ojen by name. Also "the original Pink Lady" collides with Oxford's own lead sentence ("gin, grenadine, and, originally, lime juice and applejack", pdf 1521); and "the books lost" is false, since the 1935 Peychaud's booklet printed it as the Pink Shimmy (F18). | Rewrite y4 to the spec Wren rules on. If v0 stands: "…starts from the drink from that night: sweet Spanish anise shaken with both bitters. I've split the anise, half of it the dry kind, and added a measure of fino underneath…" Drop "original" and "the books lost" ("the one that lost the name" is safe). |
| X2 | y4 | "It takes the edge off the sweetness" (said of the fino) | In v0 the seco does most of that work (Tomás's own sweep: fino alone stays OUT, 7.4–14.7 g). Assigns a cause to the wrong ingredient. | Give the fino what it does: the acid and dryness (Codex p. 77: "fino sherry is so dry"). The sweetness line goes on the split, or on "together". |

## Fixes

| id | where | text | problem | fix |
|---|---|---|---|---|
| F-a | epigraph | "Made in 1911 for a surprise party. The name went on without it." | (1) Cold-epigraph pronoun: the implied subject is *this* cocktail, which is a riff made now. (2) Oxford hedges the swap ("probably not the one"); the epigraph states it flat. | "The drink behind this one was made in 1911 for a surprise party. The name probably went on without it." (or any wording that puts 1911 on the ancestor and keeps "probably") |
| F-b | y1 | "As she told it, there was a surprise party… and a drink was made for it… a measure of ojen… shaken with Peychaud's and Angostura bitters." | Scope: "as she told it" covers the party (F3). The recipe is Oxford's, from the 1911 *Chronicle* (F6), not Dawn's telling. As written, she vouches for the ojen. | End the "as she told it" sentence at the party and the name; start a new one for the recipe ("That first Pink Lady was…"). |
| F-c | y2 | "Nobody wrote down who arranged that party, or who made the drink." | Absence claim beyond the source: we know only that Oxford names nobody. | "Who arranged that party, or who made the drink, isn't on record." (avoids *Off Duty*'s "we don't know who") |
| F-d | y2 | "And the name didn't stay with their drink." | Flat where Oxford says "probably". The "probably" arrives one sentence later, attached to something else. | "And the name probably didn't stay with their drink." or move "probably" into this sentence. |
| F-e | y3 | "the story Hazel Dawn told wasn't about who made her drink. It was about a surprise party in her honour." | We have Oxford's one-line summary of what she told, through four links (F4). Whether she named a maker is unknown. | "And what Hazel Dawn told, as it reached us, was that it was made for a surprise party in her honour." |

## Pass (checked)

- y1: *The Pink Lady*, 1911, New Amsterdam theatre (F1); Hazel Dawn (F2; "young": b. 1890, 21 in 1911); Murray's Roman Gardens, 42nd Street (F3); "sweet Spanish anise liqueur" (F13 Monti; F15; keep it the category, not a bottle).
- y2: 1913 gin-and-applejack (F8); "probably a different drink altogether" (F6); "the one that went into the recipe books" (F8, "entered the canon"); "simpler and cruder… by the end of Prohibition most bars made it with gin, grenadine and egg white" (F9: "all but the best bars", "generally"; "most" is the softer claim, passes).
- y3: "I like to think" signposts the worry. "In New Orleans it carried on under another name, the Pink Shimmy" (F7; no date given, none added). No "nobody's credit" in the reading (C7). "The name wandered off. The night stayed hers" reads as interpretation, passes.
- y4: cloud "because anise clouds when it meets cold water" (F17). "softly pink" is Tomás's craft call; the 1935 booklet supports that Peychaud's colours ojen pink (F18). "bone-dry" for fino passes (Codex p. 77 "so dry"); "pale" is craft (Tomás).
- y5: no facts; "A surprise is the one kind of help you can see land" is the bartender's position, not history.
- whoYouAre, tagline: no factual claims.

## For Tomás (spec, not the reading)

- **Dulce sugar band:** Spain's RD 164/2014 art. 6 (F20): a labelled *anís dulce* is 35–45% and **over 200 g/l**, with **no ceiling**. So the law gives your floor (20 g/100 ml, where v0 goes OUT) and nothing above it. The 25–35 g window is inside the legal class but no bottle figure is sourced: mark it unsourced, or find a label.
- **Seco sugar isn't zero:** up to 50 g/l (5 g/100 ml) is legal. Sweep it.
- **Cloud claim fails on the law's own numbers:** essential oils are 0.75–1.5 g/l in dulce but **1–3 g/l in seco** (F20). 30 ml seco + 20 ml dulce carries 45–120 mg of oil against 45–90 mg in a 60 ml dulce jigger. "No thicker than hers" can't stand; the 1911 bottle's oil is unknown anyway.
