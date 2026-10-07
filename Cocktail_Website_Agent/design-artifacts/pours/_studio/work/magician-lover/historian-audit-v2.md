# The Siren (magician-lover): fact audit v2 (Hester, round 4 step 2)

Audited as they stand: `psychologist-reading-v2.md` (the reading's first audit) and `mixologist-draft.md` v1.2 with `specs/magician-lover.json`. Card: `fact-cards/dukes-bar-martini.md` (F1–F17). Anchors re-grepped for every phrase below: none of them is in the anchors or the card.

## Reading v2 (owner: Wren)

| # | where | sentence | verdict | fix (old → new) |
| --- | --- | --- | --- | --- |
| R1 | epigraph | "Made the way one London bar makes its Martini." | **FAIL (scope)** | This is the "one change" problem again. The frozen glass, the vermouth coated round it, the frozen vodka, the teaspoon and the zest are ours (D4; draft header). Only the pour is the bar's. Old: "Made the way one London bar makes its Martini." → new: "Poured the way one London bar pours its Martini." (This matches y4. Oxford: "poured straight from bottle to glass".) |
| R2 | y2 | "it reaches you almost as strong as it left the bottle, and it's known for exactly that: a Martini of unusual strength." | **FAIL (scope)** | Oxford rests the bar's reputation on the *ritual* (F2). The strength is "the result" (F4), not what it's known for. Old: "it reaches you almost as strong as it left the bottle, and it's known for exactly that: a Martini of unusual strength." → new: "it reaches you almost as strong as it left the bottle: a Martini of unusual strength." |
| R3 | y2 | "So the bar has a famous house rule, two per guest." | **FAIL (meaning)** | The page says "two Martinis, maximum, per guest". "Two per guest" can read as the serving. Old: "a famous house rule, two per guest." → new: "a famous house rule: no more than two per guest." |
| R4 | y4 | "Of the two spirits that bar uses, I've chosen vodka" | **FAIL (scope)** | The page gives the two for the Martini, not the bar's whole shelf. Old: "Of the two spirits that bar uses, I've chosen vodka," → new: "That bar makes it with gin or vodka, and I've chosen vodka," |
| R5 | y4 | "I grate the zest of half a lemon onto it" | **FAIL (spec crossing)** | Draft v1.2 is a quarter. Old: "the zest of half a lemon" → new: "the zest of a quarter of a lemon". Same in the Notes table: "grated zest of half a lemon floating" → "grated zest of a quarter of a lemon floating", and "spec v1.1" → "spec v1.2". |
| P1 | y1 | small hotel; intimate, wood-panelled; known around the world for its Martini; table, trolley; frozen gin, or vodka, straight from the bottle; a little vermouth from a dasher bottle; lemon peel, twisted; no shaking, no stirring | PASS | F1–F3, F8; *Proper* p. 22 "small". No "dry", no order, vodka not called frozen. |
| P2 | y2 | "With no ice melting into it…" | PASS (inference) | No ice is on the page's method; "almost as strong" is Tomás's physics (Notes say so). |
| P3 | y2 | refuge; Amis 1988, "perhaps the best of all" | PASS | F7–F8; a paraphrase, no span, no "quiet". |
| P4 | y3 | "I like to think that rule is the bar's kindness … honest about what it is." | PASS (signposted) | F5, F10: nobody on record gives the rule's reason. |
| P5 | y4 | "poured the way that bar pours its own: straight from a freezer-cold bottle …, never stirred, never shaken"; a teaspoon of dry vermouth "so nothing stands in front of it"; "ice-cold and perfectly clear"; "a renowned classic" | PASS | F2–F3; F16 (*Codex*: vodka's flavour is easily overshadowed by the vermouth); colour is Tomás's call (the liquid is clear and the zest sits on top). Not called gentle, and not only scent (A4). |
| P6 | tagline, whoYouAre, y5, "this is me" | — | PASS | No facts. No drunkenness, myth kit, gender or "turn yourself down". |

## Draft v1.2 (owner: Tomás)

| # | where | text | verdict | fix (old → new) |
| --- | --- | --- | --- | --- |
| M1 | Temperature | "Arnold gives typical freezer temperatures as about −18 to −20°C (*LI* pp. 140, 155)." | **FAIL (attribution)** | My own A2 range was looser than the page, and it's mine to strike. Arnold calls −20°C typical; −18°C is the warm end he warns against. Old: "Arnold gives typical freezer temperatures as about −18 to −20°C (*LI* pp. 140, 155)." → new: "Arnold gives a typical freezer as −20°C (*LI* p. 155) and calls −18°C too warm (p. 140)." |
| M2 | Spark | "grated zest puts the whole of the yellow on the drink, in plain sight" | **FAIL (stale after ¼ lemon)** | Old: "puts the whole of the yellow on the drink, in plain sight" → new: "puts the yellow itself on the drink, where it can be seen" |
| M3 | Strength sweep | "Floor: 40%, so it reads as the page's strength and stays liquid in the freezer" | **FAIL (no ABV on the page)** | Old: "so it reads as the page's strength and stays liquid in the freezer" → new: "so it stays liquid in the freezer (my call; *LI* p. 140 covers spirit over 40%)" |
| M4 | Flags for Hester (2) | "… are unsourced; method step 1 says "stays liquid" on that basis." | **Stale** | Old: the whole item (2) → new: "(2) Landed: −20°C typical (*LI* p. 155); spirit over 40% won't freeze (p. 140); exactly 40% is my call." |
| M5 | For Wren | "("I put the whole of the lemon on top, where you can see it")" | **Stale** | Strike the suggested clause: it's a quarter now, and it's dossier only. |
| M6 | Header | "Spec: `_studio/specs/magician-lover.json` (v1.1)." | **Stale** | "(v1.1)" → "(v1.2)" |
| P7 | recipe, method 1–4, closing line, image brief, allergens, structure cites | — | PASS | F12–F17; A1, A2, A6, A7 landed as quoted. The closing line holds no fact. The image is not guest text ("quiet" lives only there). |

## Sign-off condition
Once R1–R5 and M1–M6 land word for word, the facts hold. Nothing here is a fact or drink problem outside these quoted wordings.

## Step 4 confirmation (Hester)
Re-checked on `psychologist-reading-v3.md` and `mixologist-draft.md` v1.2. R1–R5 are in the reading word for word (epigraph, y2 twice, y4 twice, Notes "quarter" and "spec v1.2"). M1–M6 are in the draft word for word; grep finds no "whole of the lemon", "whole of the yellow", "(v1.1)", "reads as the page's strength" or "−18 to −20". The "half a lemon" lines left in the draft (the v1.2 header and the Spark counterweight) only record the change. **PASS.**
Dossier note for Robin (not guest text, and no step is left to land it): the reading's Notes row still says "vodka of the two spirits the bar uses", the scope R4 fixed in y4. It should read "vodka, one of the two spirits the page gives for the Martini (F2)". Guest text is clean.
