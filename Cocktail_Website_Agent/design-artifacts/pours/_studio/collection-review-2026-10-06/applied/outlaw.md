# Applied: Outlaw family (editor C, 2026-10-06)

Each changed pour has a note at the top of its room record (`_studio/rooms/<pairing>.md`). No spec, shared table, tagline, recipe amount or Checks › Balance row was touched.

| pairing | decisions | queue items applied | variety edits | skipped and why | lint |
| --- | --- | --- | --- | --- | --- |
| outlaw-caregiver *In One Piece* | — | Q158 (cut "Nobody even has to be brave.") | V1: W3 "Not of getting hurt. Of the day…" → said straight | — | 0 err, 4 warn (new: motif overlap "we don't know which" with innocent-ruler, in y4 text I didn't touch; the other pour must have changed) |
| outlaw-creator *Asked In* | — | — | — | Q159 tagline (D11); Oxford-name P3 (Hester to verify) | 0 err, unchanged |
| outlaw-explorer *Whoopee* | — | — | — | Q084: changes the lemon amount (recipe), and it's Tomás's to check | 0 err, unchanged |
| outlaw-hero *Can't Watch* | — | — | — | — | 0 err, unchanged |
| outlaw-innocent *Kept* | — | Q137 (cut "Here's my side of it.") | V1: W2 "Trouble never scared you much. What scares you is how gently it would happen" → "What scares you is how gently the change would come" | — | 0 err, unchanged |
| outlaw-jester *With the Bite In* | D1: `contains` → `[]`, `veto_free: true`; Checks › Allergens + caveat anchor record the ruling; Open item resolved; `allergens.py` → `[]` | Q085 (W2: the joke "never punches down… aimed at whoever's at the head of the table") | — (kept as one of the two fear turns) | — | 0 err (was 1: contains mismatch), 3 warn |
| outlaw-lover *Rent-Free* | — | — | V1: W2 strict frame → "Being parked is the real fear"; V2: W3 announcement + "Not many people can give that." removed; V4: cut "So my proposal is this." | Q086 tagline (D11) | 0 err, unchanged |
| outlaw-magician *For Its Own Good* | — | — | — | Q160 tagline (D11) | 0 err, unchanged |
| outlaw-regular-guy *Where You Stand* | D2: `flagged` → `draft`, `accepted:` line, FLAG bullet → resolved (spec reads `stirred-spirit`, balanced) | Q138 ("spoonful" → "teaspoonful", Embury's own word; "teaspoon of sugar syrup" tripped a motif overlap with *Asked In*) | V1: W3 "It's never the rules that get to you. It's the people…" → "What gets to you is the people who write the rules…" | Q161 tagline (D11) | 0 err, unchanged |
| outlaw-ruler *Before It Had a Name* | D8: quince stays (`nuts` on the may-contain label); Open item resolved | Q139 ("in the autumn of 2026 it still wasn't pouring") | V1: W2 "Catching on was never the worry…" → "What worries you is what it turns into afterwards"; V2: cut "That's rarer than you'd think." | Q087 tagline (D11); Oxford-name P3 (Hester) | 0 err, unchanged |
| outlaw-sage *Hear Me Out* | — | — | V4: "So here's my side, and I mean it." → "Here's my side, and I mean it." (the side-taking is the pour's point) | Oxford-name P3 (part of the story; Hester) | 0 err, unchanged |

**Left for Robin (outlaw):** Q084 (*Whoopee* lemon 20 → 22.5 ml, a recipe change for Tomás); the taglines Q086, Q087, Q159, Q160, Q161 (D11 keeps the current lines); the Oxford-name P3 for *Asked In*, *Before It Had a Name*, *Hear Me Out* (Hester); Anchor's pouring status, to be re-checked before publishing.

## Variety targets (family of 11, before → after)

| rule | target | before | after |
| --- | --- | --- | --- |
| strict "X doesn't scare you. Y does." | ≤ 1 | 2 (*Rent-Free*; *Kept* near-strict) | 0 |
| fear turn, any form | ≤ 2 | 7 | 2 (*With the Bite In*, *Whoopee*'s "more than any height") |
| "Here's what that gives / deserves to be said / worth saying plainly" | ≤ 3 | 4 | 3 (*In One Piece*, *Before It Had a Name*, *For Its Own Good*) |
| rarity stamp | ≤ 2 | 3 | 1 (*Whoopee*; *Before It Had a Name*'s "a fruit hardly anyone eats raw" is a fact about quince, not a stamp) |
| "I like to think" opens yours 3 | ≤ 3 | 3 | 3 |
| proposal opens on "So" | ≤ 4 | 5 | 3 |
| "So here's my…" preamble | 0 | 1 | 0 |
| "I hope…" ends the reading | ≤ 1 | 0 | 0 |
| "Next time" in the closing line | ≤ 1 | 1 | 1 (*Hear Me Out*) |
