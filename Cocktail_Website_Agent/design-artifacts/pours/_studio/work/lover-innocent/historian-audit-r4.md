# Fact audit r4 (round 4, step 2), lover-innocent (The Pure Heart)

Hester, 2026-10-04. I audited the files as they stand: `psychologist-reading-v2.md`, `mixologist-draft.md` v1.1 and `_studio/specs/lover-innocent.json`. Card: `_studio/fact-cards/rita-taketsuru.md`. Anchors v2 were fixed in the same call (person row sourced to Itoh; Flip and lavender-egg rows added; the name row's "no tragedy" struck). The web budget is spent, so this audit uses the library and the round-2 fragments only. **Fixes still to land: A1, A2 (Wren), B1, B2 (Tomás).** Everything else passes. Nothing is approved; Robin approves.

## Reading v2, sentence by sentence

| # | sentence (short) | source | verdict |
|---|---|---|---|
| Epigraph | "A Japanese whisky, a whole egg, and a love story that began in Scotland." | Oxford pdf 1975 ("love story"; they met and married in Scotland); Codex p. 240 | Pass (cold, true; Wren's r3 ask answered) |
| y1.1 | young chemist lodging with a doctor's widow in Scotland | pdf 2156 "young chemists"; Itoh 2001 fragment (doctor's widow); pdf 1975 (landlady) | Pass |
| y1.2 | firm in Osaka sent him to learn how whisky is made | pdf 1975, 2156 | Pass |
| y1.3 | January 1920 married her daughter; she went to Japan with him | Itoh (Jan 1920); pdf 1975 | Pass |
| y2.1 | firm in administrators' hands; distillery plans on hold | pdf 1975, 2156 | Pass |
| y2.2 | the work he'd been sent to learn had nowhere to go | pdf 2156 "had foundered"; he resigned (pdf 1975) | Pass (fair reading) |
| y2.3 | "Whatever Rita made of that, nobody wrote down her words." | none | **A1, fail**: an absence claim I can't support (her letters are a biographer's source; Checkland 1998 is unread), and it talks about the record itself (Robin: "We don't know…") |
| y2.4 | she taught English and piano | Ross 2017 fragment | Pass, exactly as it stands |
| y2.5 | found work making whisky for another firm; later moved north together to Yoichi, where he started his own company | pdf 1975, 1391 | Pass |
| y2.6 | Today it's called Nikka, one of Japan's biggest whisky makers | pdf 1391, 1975 ("second-largest") | Pass (Wren's r3 ask: a fair softening) |
| y2.7 | lived in Hokkaido for the rest of their lives | pdf 1975 | Pass |
| y3.1–2 | "I like to think she knew…" / "didn't take any of it back" | signposted; pdf 1975 (stayed) | Pass |
| y3.4 | 2014 morning drama of the two of them; Oxford calls it a love story | pdf 1975 | Pass |
| y3.5 | "Nobody needed a sad ending." | none | **A2, fail**: it sits right after the drama and reads as a claim about it. I haven't read how *Massan* ends (my memory says it closes on her death: unsourced), and Wren's guard keeps her death out either way. Cut it. |
| y4.1 | Flip, renowned classic: spirit, sugar, whole egg, white and yolk, yolk richness / white froth, shaken hard, served cold | Codex pp. 240, 252 ("CLASSIC"), 253 | Pass. D1 resolved: no contrast with other drinks |
| y4.2 | Nikka, from Masataka's company, the one that began when they moved north | pdf 1391 | Pass |
| y4.3 | eggs in a closed box on a bed of lavender; whole, uncracked shell lets the scent through to the white | Codex p. 94, p. 253 | Pass |
| y4.4 | "I like to think that's you: nothing broken, and still open." | signposted | Pass. D2 resolved |
| y4.5 | silky and rich, just enough demerara, colour of pale toffee, lavender under the froth, chilled coupe | spec; taste is Tomás's call | Pass on fact. **Not mine, flagged for the owners:** the image brief moved off "pale toffee" and "foam" on Wren's own r3 conditions, but y4 still says "pale toffee" and "under the froth". Wren and Tomás settle it in step 3. |
| y5 | the proposal | none needed | Pass |

## Draft v1.1 and spec

| # | where | verdict | fix |
|---|---|---|---|
| B1 | Raw egg row: "The main risk comes through cracked shells, which is why step 1 says uncracked. The alcohol and the sugar don't make a raw egg safe (p. 253)" | **Fail.** p. 253 asks for clean eggs without cracks but names no "main risk", and it says nothing about sugar. It says alcohol isn't high enough to kill bacteria, and there's no evidence that citrus acidity does. | old: "The main risk comes through cracked shells, which is why step 1 says uncracked. The alcohol and the sugar don't make a raw egg safe (p. 253), so the recipe never claims they do." → new: "The *Codex* asks for clean eggs without cracks, which is why step 1 says uncracked. The alcohol doesn't make a raw egg safe (p. 253), so the recipe never claims it does." |
| B2 | Spark row: "The *Codex* says egg drinks can smell of \"wet dog\" as the white oxidises" | **Scope.** p. 253 says "egg white cocktails". | "egg drinks" → "egg-white drinks" |
| B3 | Bottle: Nikka From the Barrel, 51.4% | **Unsourced; stays labelled.** No library page gives the label strength, price or availability, and the web budget is spent. The recipe and sweep already prove the drink from 45% up, so nothing rests on the 51.4%. **Open item for Robin:** check the label and price. If it fails, the fallback is Tomás's own: "Nikka, any blended bottling of 45% or more". | none (keep "strength unsourced, label to be checked" in the draft, and "unsourced" on the table row) |
| B4 | Brandy Flip proportions, root 2 oz, "creamy hooch", p. 94 method, p. 143 "seductive floral hint", Matrix pdf 108 | Pass (each read on the page this round) | — |
| B5 | Image: harbour, Yoichi a fishing port (pdf 1975); piano a prop | Pass | — |
| B6 | Spec JSON | Pass (45 / 22.5 / 50 ml; coupe; no garnish; the status line matches Codex pp. 94, 252, 253) | — |
| B7 | closingLine "The egg goes in whole…" | Pass (Method step 3 cracks the egg whole into the shaker) | — |

## Fixes, old → new (for step 3)
- **A1 (Wren, y2):** "Whatever Rita made of that, nobody wrote down her words. What she did is on record: she taught English and piano." → "We don't know what Rita made of that. We know what she did: she taught English and piano."
- **A2 (Wren, y3):** "…calls it what it was, a love story. Nobody needed a sad ending." → "…calls it what it was, a love story."
- **B1 (Tomás, Raw egg row):** as in the table above.
- **B2 (Tomás, Spark row):** "egg drinks can smell of \"wet dog\"" → "egg-white drinks can smell of \"wet dog\"".
- **Owners' consistency (not a fact):** y4's "pale toffee" and "under the froth" against the image's "light amber-beige" and "fine-bubbled top", and Wren's r3 "no froth earned / colour stays pale".
