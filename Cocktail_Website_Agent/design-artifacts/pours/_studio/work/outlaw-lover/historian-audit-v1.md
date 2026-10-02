# Fact audit v1: outlaw-lover (The Fugitive)

Hester, round 4, 2026-10-01. Audited `psychologist-reading-v1.md` (Wren, r3), `mixologist-draft.md` and `_studio/specs/outlaw-lover.json` (Tomás, r3), against the fetched Gutenberg texts (#516 *Silverado*, #24332 Sanchez, #627 *Essays of Travel*, #31809 Colvin, #47001 Miller) and the library. Card: `fact-cards/stevenson-fanny-silverado.md`. Each fix has an ID, an owner and old → new.

## Fixes

| ID | Owner | Where | Old → new | Why (source) |
|---|---|---|---|---|
| A1 | Wren | y3 | "From inside, he wrote, the old cracked house seemed to burst with light" → "From outside, he wrote, the old cracked house seemed to burst with light" | **FAIL.** He was out on the platform by the forge, hearing the others talk "from bunk to bunk"; the light came *out* "through all the vertical chinks" and fell on the thicket (*Silverado*, last paragraph). |
| A2 | Wren | y3 | "they bought land, cleared it themselves and built a house they called Vailima" → "they bought land, set about clearing it and building a house, and called the place Vailima" | **FAIL.** Sanchez ch. VIII: "The natives employed in clearing and planting"; Fanny sometimes did the work herself to show them. And the name was chosen for the land ("five waters", for a stream), not the house. |
| A3 | Wren | y2 | "After the wedding, the two didn't rent a house. They moved into one: an abandoned miners' bunkhouse…" → "After the wedding, the two moved into an abandoned miners' bunkhouse … and lived there as squatters" | The absolute isn't on the page: they first stayed in Calistoga, at "the hotel" (*Silverado*, "The Scot Abroad"), and whether anyone was paid at Silverado isn't recorded. "Squatters" is his own word (the title). |
| A4 | Wren | y1 | "in a cabin in the very heart of the emigrant decks" → "in the second cabin, a class of berths in the middle of the emigrant decks" | "A cabin" reads as a private cabin. He went "by the second cabin", a class with "a table at command" (*Essays of Travel*, "The Second Cabin"). |
| A5 | Wren | y4 | "he tasted a 'Hock', a white in the German style" → "he tasted a wine sold as 'Hock', the English name for German white wine" | We know the wine's name, not its style ("Schramberger Hock", "Napa Wine"). The gloss is Oxford's ("hock [i.e., German white wine]", HIGHBALL pdf 1005). |
| A6 | Wren (motif) | y4 | "The night before, one bay leaf goes into the bottle" → e.g. "The evening before, …" | Not a fact: *Four Shares* owns "the night before" in its method and its y4 ("It starts the night before"). Tomás kept it out of his text for that reason. |
| A7 | Tomás + Wren | y4 / spec | y4 "a tall wine glass" vs spec "large stemmed wine glass (about 450 ml)" → one wording in both (I'd use "a large stemmed wine glass") | The reading and the spec must name the same glass. |
| A8 | Tomás | Checks, Structure | "A non-spirit core changes the template (Codex p. 9)" → "The Codex makes this point for the Old-Fashioned (p. 9: a fortified wine or amaro as the core, with the template adjusted); I borrow it for a Highball" | Family vs member: printed p. 9 is the Old-Fashioned chapter. |
| A9 | Tomás | draft + spec `_status` | Strike Version B (brandy) from the draft and the Checks' balance row; `_status` "pending Wren's balance call" → "v1, wine only (Wren r3)" | Wren ruled "the band, never the brandy". The dossier mustn't keep a drink the pour dropped. |
| A10 | Tomás | Checks, Pairings | "so a cold wine keeps the soda lively and melts less ice" → keep the first half on LI p. 289; label "melts less ice" as craft (unsourced) | LI printed p. 289 says only that a colder liquid holds more CO2 at a given pressure. |
| A11 | Tomás + Wren | closingLine | "Bay in the bottle, bottle in the cold…" | Not a fact. It breaks Wren's r3 guard ("no bay in our closing line"); flagged for the owners. |
| A12 | Tomás + Wren | names | *Rent-Free* | The page has the phrase as the appeal of an idea, said first with an eye on Pine Flat; it never says they paid no rent at Silverado. Fine as a name, but the reading must never say they lived rent-free, and if it's picked with "rent-free" cut from v1, the title has nothing in the reading to point at. Wren's call. |

## Passes (checked on the page this round)

| Line | Verdict | Source |
|---|---|---|
| Epigraph, wine kept in a mine by newlyweds | pass | *Silverado*, "Episodes…" ("keeping their wine in the tunnel"); married 19 May 1880, squatting after (Sanchez ch. V). "The cold": Nellie's tunnel mouth, "where coolness always held sway". |
| y1 "In 1879 … sailed for America" | pass | Sanchez ch. V (he took ship for America; "In the year 1879" at Monterey); the *Amateur Emigrant* dedication is signed "R.L.S. 1879". He sailed from Glasgow and touched at Greenock: no port in the reading, good. |
| y1 "In California he married Fanny" | pass | Sanchez: they "went quietly across the bay and were married". Either shore is California; no city named, good. |
| y1 parents, "an American and a stranger", gave in completely | pass | Sanchez ch. V ("yielded without reserve"). One clause, mid-paragraph. |
| y2 mountain above the Napa Valley; Fanny's son and their dog | pass | *Silverado* opening (Mount Saint Helena, Napa County), "The Act of Squatting" (Sam, Chuchu). |
| y2 "King and Queen of Silverado"; poison oak "grown up through the floor" | pass | "through a chink in the floor, a spray of poison oak had shot up"; "first care to cut away that poison oak … by which we took possession". |
| y2 tunnel, "the one place on that hot hillside that stayed cool" | pass | Sanchez ch. V ("excessively hot there during the day"; the tunnel mouth). |
| y3 single candle in the neck of a bottle; far hills | pass (with A1) | Last paragraph; the watcher kept conditional ("would have stopped to watch"). |
| y3 "home" as Nellie's word | pass | Sanchez ch. VIII, credited to her. |
| y3 "still bringing her each morning's writing to judge" | pass | **"According to their custom" is a habit, not one day:** Sanchez uses it twice for her criticising his work, in ch. VII (her written objections, "by his request and according to their custom") and ch. VIII. "Still" holds. |
| y4 "the long, light drink the highball itself grew from" | pass | Oxford pdf 1005: "Its roots go back to the Austrian Spritzer—white wine and soda-water". "Grew from" is a fair plain version of "roots go back to". Byron absent, good. |
| y4 "a canyon he wrote smelled of sweet bay at sunrise and late at night" | pass | "Toils and Pleasures". The leaf is never "his bay", good. |
| No reason for the mountain or for Samoa; no illness, no death; no Cicero; no "bottled poetry"; no Gosse, no Grez, nothing from Part II | pass | Guards held. |
| Spec: veto-free, wine fining ignored, no winery named | pass | STUDIO-RULES check 4; Schramsberg unnamed (Tomás's note labelled unsourced). Matrix pdf 141 has "laurel" (text layer). |

## Open for Wren
- "Fourteen rich years" (Sanchez ch. V) is usable if she wants it: credit it to Nellie, and it counts from the wedding.

Verdict: not yet. A1 and A2 are fails; A3–A10 are fixes. Once they land in v2 and the files, I re-check in round 5.
