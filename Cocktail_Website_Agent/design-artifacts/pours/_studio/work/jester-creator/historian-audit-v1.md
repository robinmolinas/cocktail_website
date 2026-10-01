# Fact audit v1: The Wacky One (jester-creator), Hester, round 5

Audited: `psychologist-reading-v1.md` (Wren, r4), `mixologist-draft.md` and `specs/jester-creator.json` v1 (Tomás, r4). Card: `fact-cards/harry-mcelhone-international-bar-flies.md` (F1–F26 after this round). Every failing line has an ID and old → new. **Verdict: not yet.** 6 fails in the reading (A1, A5, A6, A10, A12, A17), 1 wording fail (A9), 1 in the draft (D7), and a rule flag (A28, history over half). Everything else passes.

## Reading

| ID | line (v1) | verdict | source | old → new |
| --- | --- | --- | --- | --- |
| A1 | y1 "The way his bar's own book tells it" | **FAIL (clarity)** | Robin's "clear before clever": "his" comes before Harry is named, so the guest can't tell whose bar | "The way his bar's own book tells it, it started in 1924" → "The way a Paris bar's own book tells it, it started in 1924". Then y2 names the bar (A5). |
| A2 | y1 "a New York columnist called the regulars of the Paris bars barflies" | pass | F5 (1927 book: a "mournful" *Cosmopolitan* piece that called Paris's drinkers "barflies"); Oxford "New York journalist" (pdf 1272), "columnist" (pdf 292) | Doesn't call his piece a joke: correct. |
| A3 | y1 "the ones who never seem to leave" | pass | our gloss (Wren's r3 guard) | — |
| A4 | y1 "His name, and this is true, was Oscar Odd McIntyre." | pass | F10 (Library of Congress authority file no2006030975) | — |
| A5 | y2 "Then Harry McElhone, a Scot who ran Harry's New York Bar, took it one step further." | **FAIL (one maker)** | F5: between the column and Harry's meeting came the nightclub man's advert, and that advert is the joke. "Then Harry" makes Harry the next step, and y3's "The joke wasn't his" needs the joke to belong to someone on the page | → "Then a Montmartre nightclub man joked about it in an advert, and Harry McElhone, the Scot who ran that bar, Harry's New York Bar, took it one step further." (About 10 more words: see A28.) |
| A6 | y2 "and that Christmas the International Bar Flies was founded there" | **FAIL (date precision)** | F5: "about Christmas 1924" | "and that Christmas the International Bar Flies was founded there" → "and around Christmas the International Bar Flies was founded there" |
| A7 | y2 "McIntyre was made president, 'Big Blue Bottlefly'." | pass | F6 ("foisted upon" him) | — |
| A8 | y2 "The book lists Harry as 'Little Blue Bottlefly'." | pass | F6 | "Lists" keeps the agency right (Wren's guard). |
| A9 | y2 "The badge was a housefly on a sugar lump." | **FAIL (wording)** | F17: the book prints it as the society's *emblem*. "Badge" claims a worn object, and the only emblems the text describes being worn are the dead-fly joke (F7) | "The badge was a housefly on a sugar lump." → "Its emblem was a housefly on a sugar lump." Or cut it, which was Wren's own first cut. y4's "Here they're for the Bar Flies" stands on the society's name without it. |
| A10 | y2 "in branches called traps, from Shanghai to Pittsburgh" | **FAIL** | F20: the 1927 list of traps (printed pp. 91–92, read on the page images) has Shanghai (Trap 17, Plaza Hotel) but **no Pittsburgh**. Pittsburgh is only one of the cities the chapter says members greet each other in. | "from Shanghai to Pittsburgh" → "from Shanghai to Buenos Aires" (Traps 17 and 57b). Oxford and the book agree on the five thousand, and Oxford calls the branches traps (pdf 1272): the join holds. |
| A11 | y3 "The joke wasn't his. He just wouldn't let it end where anyone else would have" | pass, one word | first sentence: F5, once A5 lands. Second: interpretation | After A5, the nightclub man didn't let it end either: "where anyone else would have" → "where most people would have" |
| A12 | y3 "And he never stopped." | **FAIL (absolute)** | The next sentence has him leaving in 1940, and the authorities seized the bar (Oxford pdf 973). "Never" is a claim | "And he never stopped." → "And he kept it going." (Supported: it "kept growing for years afterward", pdf 1272, and a later booklet lists him as its President, F22.) |
| A13 | y3 "In 1940, with the war closing in on Paris, he locked his papers in a safe, buried it and left." | pass | F14 (Oxford pdf 1272: "German troops closing in", "important papers", "buried it outside of Paris", fled to London) | — |
| A14 | y3 "After the war he returned to the bar and picked up where he left off" | pass | F14 | The scope is right: Oxford's line is about the bar, and so is this sentence. |
| A15 | y3 "and his family still runs it" | pass (dated) | Oxford 2021, both entries (they disagree on who, C2); the bar's own site, fetched 2026-10-01: the MacElhone family "est toujours aux commandes" (F24) | Brand copy, and its "since 1911" is wrong (he bought the bar in 1923), so it supports only the present tense. No name in guest text. |
| A16 | y3 "I like to think the silliness was one of the things he kept safe." | pass | signposted | — |
| A17 | y4 "The cocktail I've made for you is Cameron's Kick" | **FAIL (riff)** | STUDIO-RULES 3: "A riff changes what the facts may claim". The spec changes the book's lemon and orgeat (22.5 / 17.5 against its sixths) and adds the beans, and the next clause dates the recipe to his books, so it reads as his recipe | "The cocktail I've made for you is Cameron's Kick, a forgotten classic" → "The cocktail I've made for you is my take on Cameron's Kick, a forgotten classic" |
| A18 | y4 "a forgotten classic" | **pass (Wren's question)** | Oxford A FORGOTTEN CLASSIC (pdf 829) defines the term and names Cameron's Kick among its examples | Oxford's own label. It stays. |
| A19 | y4 "first appeared in Harry's 1922 book and again in his bar's 1927 one" | pass | Oxford pdf 829; F12, F18 | By y4 "Harry's" has a referent. |
| A20 | y4 "a Scotch whisky and an Irish whiskey shaken together in equal parts, with lemon and orgeat, a sweet almond syrup" | pass | spec 30 / 30; Oxford ORGEAT pdf 1451 | "Equal parts" covers the two whiskies only, and that's how it reads. |
| A21 | y4 "sounds like it shouldn't work, and it plainly does" | pass (opinion) | balance in range (Tomás) | The bartender's judgement, not a record. |
| A22 | y4 "the way sambuca, an Italian anise liqueur, is often served 'with the fly', because with a little imagination the beans look like houseflies" | pass | Oxford SAMBUCA pdf 1723 ("usually served 'con la mosca'", "one or three coffee beans") | It doesn't call the custom old, or Rome's: correct (see D7). |
| A23 | y4 "Here they're for the Bar Flies." | pass | the twist tied in words (Robin's rule) | — |
| A24 | epigraph "Three coffee beans float on top"; y4 "floated on top" | **pass, now sourced** | F23: Rodrigues et al., "Evaluation of Physical Properties of Coffee during Roasting", *CIGR Journal* vol. V (2003), Table 2. The particle density of roasted beans across four studies is 438–755 kg/m³ (green: 1,200–1,284), against 1,000 for water | Roasted beans are lighter than water, so they float. The floating is **our inference** from the measured density (labelled ours in Checks). How long they stay up isn't measured: never "they never sink". |
| A25 | y4 "They bring the smell of roasted coffee to every sip, and if you bite one, a bitter crunch against the almond." | pass (taste) | Tomás's tasting words | — |
| A26 | title block: name, tagline, epigraph | pass | — | Not a fact point, Wren's call: the tagline's "Now everyone says it" sits a little against whoYouAre's "a word only your people use". |
| A27 | whoYouAre | pass | no historical claims | — |
| A28 | history weight | **RULE FLAG** | STUDIO-RULES: history takes "at most half". v1 is 51% (Wren's count: 199 / 387) | A5 adds about 10 words and A9's cut saves 8. After both, the reading still needs about 13 more history words out to reach half. Options: A9 cut (−8); y3 "with the war closing in on Paris" → "with the war closing in" (−2); fold A7 and A8 into one sentence, "The book lists McIntyre as president, 'Big Blue Bottlefly', and Harry as 'Little Blue Bottlefly'." Wren's choice. |

## Draft and spec (Tomás)

| ID | line | verdict | source | old → new |
| --- | --- | --- | --- | --- |
| D1 | "half and half, the way Harry's book has it" | pass | F12 | — |
| D2 | "his book's own note says it's made from almonds" | pass | F12 | — |
| D3 | Codex: the split base is a "strategy" that can generate "a wide variety of drinks" (p. 22) | pass | *Codex* p. 22, checked on the page | — |
| D4 | image brief: "an almond syrup the Codex makes from almond milk (p. 285)" | pass (search) | *Codex* p. 285: hits for both "House Orgeat" and "almond milk" | I didn't read the recipe line by line. Tomás's rendered read stands. |
| D5 | Matrix Grain wheel: coffee, almond, citrus (pdf 137) | pass (search) | the OCR of pdf 137 has "Roasted", "almond" and "coffee" | Tomás read the wheel's positions on the image. The coffee-and-almond pairing is labelled his own: correct. |
| D6 | step 5 "They float on the thin froth the shaking leaves." | pass | F23 for the float (A24). The froth is craft | — |
| D7 | "For Wren": "an old Italian way of serving sambuca, now served that way around the world" / "sambuca's old custom" (and Wren's r3 "an old Italian joke") | **FAIL** | Oxford pdf 1723 **contrasts** the two: around Rome it's sipped straight from the freezer, while "around the world" it's usually served with the fly. It gives no age for the custom | Never "old" and never "Italian way". → "the way sambuca is often served", as y4 already has it. The name "con la mosca" is Italian, so "the Italian name for it" is fine. |
| D8 | "Coffee beans: in no pour (grepped)" | pass, **watch** | Oxford ESPRESSO MARTINI (pdf 739): its recipe garnishes with three coffee beans | Not a sibling pour, but three beans on a froth in a coupe is the Espresso Martini's look. Image brief: add "must never read as an Espresso Martini: nothing dark or espresso-coloured, no dark crema". Checks: own the neighbour in one line. |
| D9 | image brief: "the society's fly, as on the 1927 cover"; "his pocket cocktail book" | pass | F17 (cover and p. 94); Oxford pdf 1271 ("vest-pocket cocktail book") | — |
| D10 | names: *Trap One* "(F20)"; *Little Blue Bottlefly* "(F6)" | pass | F6, F20 | "Listed as" holds for the second. |

## Anchors follow the audit (same call)
`historian-anchors.md` v3: the traps row now reads "Shanghai to Buenos Aires". Rows added: the float (F23) and the Espresso Martini watch. The spark row now says "never 'old', never 'Italian way'" (D7). The glass row now says "my take on" (A17). The family row now cites the bar's site (A15). The phrases the audit fixed ("Pittsburgh", "never stopped", "that Christmas", "badge", "is Cameron's Kick") were grepped in the anchors; none remains as a claim.

## Against reading v2 (round 6)

Ruled on v2's text as it stands.

| ID | status on v2 | old (v2) → new |
| --- | --- | --- |
| A1 | **stands** | y1 "The way his bar's own book tells it" → "The way a Paris bar's own book tells it". And y2 "Harry McElhone, a Scot who ran Harry's New York Bar" → "Harry McElhone, the Scot who ran that bar, Harry's New York Bar" |
| A5 | **closed** | v2 puts the advert in y1 and has Harry answer "with an advert of his own". Checked against F5. "Nightclub owner" rests on the page's "his Montmartre joint": accepted. |
| A6 | **stands** | y2 "and that Christmas the International Bar Flies was founded there" → "and around Christmas the International Bar Flies was founded there" |
| A9 | **stands** | y2 "The badge was a housefly on a sugar lump." → "Its emblem was a housefly on a sugar lump." Or cut it (my recommendation: see A28). If its tie moves to y4, write "whose emblem was a housefly", never "badge". |
| A10 | **closed, conceded** | v2's "over five thousand members, from Shanghai to Pittsburgh, and its branches were called traps" puts Pittsburgh on the members, not the traps. The chapter itself has members greeting each other "in Shanghai or Liverpool, Madrid or Pittsburg" (p. 85). My own r4 turn said the members wording was on the page, so Buenos Aires isn't needed. |
| A11 | **stands** | y3 "where anyone else would have" → "where most people would have" (the nightclub owner didn't let it end either, and v2 now says so). |
| A12 | **stands** | y3 "And he never stopped." → "And he kept it going." (The next sentence has him leaving in 1940. The later booklet supports "kept it going".) |
| A15 | moot | v2 drops the family line. The anchors row is struck to match. |
| A17 | **closed, conceded** | v2 keeps "is Cameron's Kick" but owns the change in words two sentences later, so no guest takes it for his recipe. That's what convinced me. |
| N1 | **new FAIL** | y4 "a little more lemon than his book does" → "a little more lemon than his 1927 book does". y4 names two books, and only the 1927 proportions are known to us. The 1922 *ABC*'s aren't on any page we've read. |
| N2 | pass | y3 "A later booklet of the society lists its president as 'Exalted Blue Bottle Fly': Harry. He'd been promoted." (F22). "Promoted" is our joke, and it's true of the two listed titles. Undated in the reading: correct. Its place after "After the war…" rests on the dealer's date (1953, secondary). |
| N3 | pass | y1 "a gloomy magazine piece" for "mournful" (F5); "his Christmas Eve takings would go to the 'needy barflies'" (F5). |
| N4 | pass | y4 "a whisky sour" (Oxford pdf 829: "a whisky sour built on a base of scotch and Irish whisky"); "half each" (spec 30 / 30). |
| T1 | taste (Tomás's) | Tomás's fix is right on scope: y4 "They bring the smell of roasted coffee to every sip" → "a little roasted-coffee scent as you lift the glass". |
| A24 | pass, **update the label** | The float now rests on Rodrigues et al. 2003 (F23), labelled as our inference. Tomás's own 0.6–0.8 g/ml arithmetic is superseded, so Checks and the dossier should cite the paper. |
| A28 | **flag for Robin** | The rule's text is "History takes at most half **of the reading**". v2 is 41% of the whole reading (pass on the text), but 55% of yours. If Robin means yours, cutting A9's emblem sentence (9 words) is the cheapest start, and it clears A9 too. |
