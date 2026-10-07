# Family review: Magician (2026-10-06)

Reviewer notes in one paragraph: the most inventive family in the glass. A pousse-café whose darkest band floats, a Dukes-style Martini poured from the freezer, Ashley's 1731 shrub punch, the 30:60:120 doubling highball, a Blue Blazer with the fire taken out and a saucer put in, Coffey's wood-and-iron still answered with grain whisky, a Folle Blanche quarter handed back to cognac. The history is careful: hedges kept ("it seems", "the family says", "probably"), legends granted, and the work behind each claim visible in the dossiers. What recurs: (1) **the Peychaud's question** touches two pours here, *Their Night* and the approved *No Accident*. The rulebook itself cites *No Accident* as veto-free, so Robin's ruling has to reach the rulebook too. (2) **Dossier voice leaking into guest recipes**: "(my craft call)", "mine", a *Codex* page reference (*More Than One Head*), "unsourced: check the label" (*Built to Hold*). (3) **One proposal shape, three times**: the person who orchestrates the moment and isn't in it, asked to step into it (*Their Night*: "don't leave before it arrives"; *Cold Water First*: "you'll be in the laugh"; *Built to Hold*: "get to be surprised by your own world"). The stakes differ and each reads true, but a fourth would make it a formula. (4) Two proposals open on "my wish for you" (*On One Condition*, *Worth the Trade*); the Genie can keep it. (5) Taglines: five of eleven are the Everyone/You or not-X-but-Y shapes.

## Matrix rows

| pairing | name | status | T | H | V | P | tagline | priority | top issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| magician-caregiver | *Their Night* | draft | major: `contains: []`, but the live tool gives `nuts` (Peychaud's). An all-anise shaken drink is otherwise honest, and the haze is explained | ok: "probably" kept for the name's journey; the maker unnamed | ok | ok | change | P1 | allergen line contradicts the tool |
| magician-creator | *On One Condition* | draft | minor: glassware/contains repeated inside the cocktail block | ok: "railroad executive's private office" is on the card (F3, *Proper* pp. 134–135) | ok | ok | change | P2 | tagline mass-contrast / public-private |
| magician-explorer | *One More Adjustment* | draft | minor: y4 "a spoonful each of syrup and calvados" vs the recipe's "1 barspoon (5 ml)" | ok | minor: y3 "I couldn't say why" talks about the research | ok | change | P2 | tagline is a vague not-X-but-Y |
| magician-hero | *Worth the Trade* | draft | ok: the Folle Blanche Armagnac is niche, but its style substitute is honest about what's lost | ok | minor: "So here's my wish for you" repeats *On One Condition*'s proposal intro | ok | change | P2 | tagline mass-contrast / public-private |
| magician-innocent | *More Than One Head* | draft | minor: the cordial note carries dossier voice: "made the *Codex*'s way (Blended Strawberry Syrup, p. 47: …)", "mine", "(my craft call)" | ok: 1906 / toddies passed (pdf 1112) | ok | ok: the Sorcerer's Apprentice, exactly | keep | P2 | research talk in guest recipe |
| magician-jester | *Even When You Know* | draft | ok: the freeform 45 ml layered drink is honest; the method's bottle test is good practice | ok | ok | ok | change | P2 | tagline is not-X-but-Y |
| magician-lover | *Undimmed* | draft | ok: the freeform is honest (no ice, so no dilution; 38% by design, and the reading says so through the two-drink rule) | ok | ok | minor: close to the reversed *Worth Finding* (both hold back, both clear Martinis) | keep (optional alt) | none | no change |
| magician-outlaw | *No Accident* | approved | major: `contains: []` (and the rulebook's "veto-free"), but the live tool gives `nuts` (Peychaud's) | ok | ok | ok | keep (approved) | P1 | approved pour: allergen line contradicts the tool |
| magician-regular-guy | *Cold Water First* | draft | ok | ok | minor: y4 runs 241 words, Wondrich named three times | ok | keep current | P3 | over-long drink paragraph |
| magician-ruler | *Built to Hold* | draft | minor: recipe note says "about 50%, unsourced: check the label" in guest text; nuts declared correctly for Batavia arrack | ok: hedges kept throughout | ok | ok | keep | P2 | research talk in guest recipe |
| magician-sage | *Already There* | draft | ok: the fig-leaf sap warning is good | ok: house accounts labelled "the family says" | minor: the epigraph's "distilled like that" is vague cold | ok | keep | P3 | epigraph clarity |

## Revision proposals (ranked, most important first)

### magician-outlaw · P1 · ground: Tomás · Robin · approved pour
- **Where:** cocktail block `contains`; frontmatter `veto_free`; and `STUDIO-RULES.md` ("All three are veto-free, which satisfies the AD-4 floor")
- **Current (verbatim):** `contains: []`
- **Proposed:** if Robin confirms Peychaud's → nuts: `contains: ["nuts"]`, `veto_free: false`, and the rulebook line becomes "*A Brother's Care* and *Four Shares* are veto-free, which satisfies the AD-4 floor; *No Accident* contains nuts (Peychaud's)." If Robin reverses the classification instead, nothing changes here.
- **Why it improves the pairing:** this is a real allergen error on an approved pour: a nut-veto guest would be shown it. The drink needn't change. The Peychaud's is half of "two kinds of bitters", and dropping it would alter an approved recipe, so that's not my recommendation. The label is what has to be true.
- **Checks before applying:** Robin's Peychaud's ruling (it settles *Anyway* and *Their Night* too); `allergens.py`; `lint_pour.py magician-outlaw`; the collection's AD-4 floor count (signals: "approved and veto-free: 2" already assumes this).

### magician-caregiver · P1 · ground: Tomás · Robin
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens
- **Current (verbatim):** `contains: []`
- **Proposed:** `contains: ["nuts"]`, `veto_free: false`; Checks: "Allergens: **nuts**, from Peychaud's bitters (classified nuts on the safe side)." The Peychaud's is what turns the drink pink, and the 1911 recipe has it, so it stays.
- **Why it improves the pairing:** the file and the tool disagree, and the tool is the safe side.
- **Checks before applying:** the same Peychaud's ruling; `allergens.py`; lint.

### magician-innocent · P2 · ground: Tomás · routine
- **Where:** recipe, the cordial paragraph below the table
- **Current (verbatim):** "**Strawberry and lemon cordial (about 300 ml, ten drinks):** 100 g ripe hulled strawberries and 100 g white sugar, blended cold until the sugar has gone, pressed through a fine sieve; made the *Codex*'s way (Blended Strawberry Syrup, p. 47: equal weights of fruit and sugar, blended cold, sieved), then lengthened with the same volume of fresh lemon juice (about 150 ml, four or five lemons; mine). Fridge, up to a week (my craft call)."
- **Proposed:** "**Strawberry and lemon cordial (about 300 ml, ten drinks):** 100 g ripe hulled strawberries and 100 g white sugar, blended cold until the sugar has gone, then pressed through a fine sieve. Stir in the same volume of fresh lemon juice (about 150 ml, four or five lemons). Keep it in the fridge and use it within a week."
- **Why it improves the pairing:** the guest is reading a recipe, not a dossier. Page numbers and "my craft call" belong in Checks, where they already are. Clear before clever.
- **Checks before applying:** none (same quantities).

### magician-ruler · P2 · ground: Tomás · routine
- **Where:** recipe row "Batavia arrack", item
- **Current (verbatim):** "Batavia arrack (from Java; about 50%, unsourced: check the label), recommended, or a full-flavoured Jamaican-style rum of 50% or stronger"
- **Proposed:** "Batavia arrack (from Java; about 50%: check the label), recommended, or a full-flavoured Jamaican-style rum of 50% or stronger"
- **Why it improves the pairing:** "unsourced" is studio vocabulary. "Check the label" already tells the guest what to do.
- **Checks before applying:** none.

### magician-hero · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone remembers that you saved it. You remember what you had to change."
- **Proposed:** "You can't enjoy the rescue until you've counted what it cost."
- **Why it improves the pairing:** the Everyone/You public/private formula. The option is the Good Wizard's habit (the part of you that "isn't, quite" relieved) as behaviour, and it sets up the proposal's "let yourself enjoy the whole of what you saved" without saying it.
- **Checks before applying:** registry; lint.

### magician-creator · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Nobody gets what they asked you for. They get what they meant."
- **Proposed:** options: "Ask you for a few words and you'll come back with the speech of the night." / the 2 October recommendation, "You hear the wish underneath the request; yours stays unspoken."
- **Why it improves the pairing:** the current line is Nobody/They, public/private. The 2 October recommendation doesn't lean on the anecdote and is acceptable. My first option is closer to Robin's one `yes`: concrete behaviour that needs no Campbell Apartment.
- **Checks before applying:** registry; lint ("yours" in the rec is the person's wish, fine).

### magician-explorer · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Nothing is ever only what it is. Not to you."
- **Proposed:** "You'd rather make one more change than press send."
- **Why it improves the pairing:** the current line is abstract, the most horoscope-like in the family (true of almost any curious person), and a not-X-but-Y. The option is the Alchemist's real fear, the last irreversible step, in seven words.
- **Checks before applying:** registry; lint.

### magician-jester · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You don't win arguments. You change what people see."
- **Proposed:** "You'd rather show someone than tell them they're wrong."
- **Why it improves the pairing:** not-X-but-Y with a full-stop beat. The option keeps the Illusionist's move (the thing on the table instead of an argument) as behaviour, without whoYouAre's words.
- **Checks before applying:** registry; lint.

### magician-caregiver · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "It was never your night. You made sure it was theirs."
- **Proposed:** options: "You've arranged their surprise and slipped out before the lights go on." / the 2 October recommendation, "You arrange the moment and hide at the back of the room."
- **Why it improves the pairing:** the current line repeats the name (*Their Night*) and is a public/private pair. The recommendation doesn't lean on the anecdote but repeats whoYouAre's "at the back". The first option names the exact behaviour the proposal asks the guest to change.
- **Checks before applying:** registry; lint. If the first option is taken, check the closing line ("don't slip out early") doesn't now echo it too closely. If it does, take the recommendation.

### magician-explorer · P3 · ground: Wren · routine
- **Where:** `yours 3`
- **Current (verbatim):** "I couldn't say why he began in wood and iron. I like to think it was where he could still change his mind, and the copper was where he stopped."
- **Proposed:** "We don't know why he began in wood and iron, but I like to think it was where he could still change his mind, and the copper was where he stopped."
- **Why it improves the pairing:** this is Robin's own fix in *Off Duty*, word for word in shape.
- **Checks before applying:** none.

### magician-explorer · P3 · ground: Tomás · routine
- **Where:** `yours 4`
- **Current (verbatim):** "and a spoonful each of syrup and calvados, the apple brandy of Normandy"
- **Proposed:** "and a bar spoon each of syrup and calvados, the apple brandy of Normandy"
- **Why it improves the pairing:** the recipe says "1 barspoon (5 ml)". This is the collection's spoon-wording question (see *Hoping You'd Come*).
- **Checks before applying:** none.

### magician-hero · P3 · ground: Wren · routine
- **Where:** `yours 5`
- **Current (verbatim):** "So here's my wish for you: once you've pulled something through and it's safe again, look for whatever had to make way."
- **Proposed:** "So once you've pulled something through and it's safe again, look for whatever had to make way."
- **Why it improves the pairing:** "my wish for you" belongs to the Genie (*On One Condition*: "So this is my wish for you"), and "so here's my…" is the collection's most repeated proposal opening (×6).
- **Checks before applying:** none.

### magician-regular-guy · P3 · ground: Hester · routine
- **Where:** `yours 4`
- **Current (verbatim):** "Take away the fire and the pouring, says David Wondrich, the historian, and the Blazer is \"merely a Scotch Whisky Skin\": whisky, lemon peel and boiling water. The Skin was once a popular hot drink in its own right, and still a very good one, Wondrich says. Thomas's recipe from the following year…"
- **Proposed:** "Take away the fire and the pouring, says David Wondrich, the historian, and the Blazer is \"merely a Scotch Whisky Skin\": whisky, lemon peel and boiling water. Thomas's recipe from the following year…"
- **Why it improves the pairing:** the paragraph is 241 words, the longest drink paragraph in my families, and names Wondrich three times. The cut sentence adds praise but nothing to the person, and it brings history back under half.
- **Checks before applying:** none (a cut).

### magician-creator · P3 · ground: Tomás · routine
- **Where:** cocktail block, after the recipe table
- **Current (verbatim):** "**Glassware:** tall (Collins) glass, chilled, filled with ice / **Contains:** veto-free"
- **Proposed:** delete both lines (the block already gives glassware and `contains: []` above).
- **Why it improves the pairing:** duplicated fields, which the site may show twice.
- **Checks before applying:** lint.

### magician-sage · P3 · ground: Wren · Robin
- **Where:** `epigraph`
- **Current (verbatim):** "One grape variety made the grappa here. Grappa was first distilled like that in Friuli."
- **Proposed:** "The grappa here comes from a single grape. Nobody made grappa that way until 1973, in Friuli."
- **Why it improves the pairing:** read cold, "distilled like that" doesn't say what "that" is. The option makes the tease plain and keeps the story's year for the reading to explain.
- **Checks before applying:** Hester: "first grappa from a single grape" (Oxford GRAPPA pdf 936) carries "nobody… until 1973". Keep Oxford's scope (single-grape pomace), not the house's 1967 test bottling (C6).

## Taglines

| pairing | current | in 10-02? | verdict | candidate(s) | note |
| --- | --- | --- | --- | --- | --- |
| magician-caregiver | It was never your night. You made sure it was theirs. | yes, unmarked | change (alt or rec) | "You've arranged their surprise and slipped out before the lights go on." | The rec ("You arrange the moment and hide at the back of the room") doesn't lean on the anecdote; acceptable, but it repeats "at the back". |
| magician-creator | Nobody gets what they asked you for. They get what they meant. | yes, unmarked | change (alt or rec) | "Ask you for a few words and you'll come back with the speech of the night." | The rec doesn't lean on the anecdote; it's the semicolon shape the 10-02 set overuses. |
| magician-explorer | Nothing is ever only what it is. Not to you. | no | change | "You'd rather make one more change than press send." | Abstract; not-X-but-Y. |
| magician-hero | Everyone remembers that you saved it. You remember what you had to change. | no | change | "You can't enjoy the rescue until you've counted what it cost." | Public/private. |
| magician-innocent | You never worry it won't work. You worry it will. | no | keep | none | A not-X-but-Y, but it's the persona's whole surprise and it stops a scroll. A collection-level reason to keep. |
| magician-jester | You don't win arguments. You change what people see. | no | change | "You'd rather show someone than tell them they're wrong." | Not-X-but-Y. |
| magician-lover | You never set out to change anyone. People change around you all the same. | no | keep (optional alt) | "You ask one question, and somebody's life changes direction." | Fine as it stands; the alt is more concrete. |
| magician-outlaw | You never break a rule by accident. | no | keep (approved) | none | Approved. |
| magician-regular-guy | You practise alone so that strangers can laugh together. | yes, unmarked | keep current | none | The rec ("…for the moment two strangers look at each other and laugh") lengthens it and lifts whoYouAre's sentence. The current line is one of the 10-02 set's strongest. |
| magician-ruler | They get the surprise. You built the room it happens in. | no | keep | none | Two beats, but concrete; no echo. |
| magician-sage | You can tell who someone will become. You can rarely say how. | no | keep | none | Close to whoYouAre's "you can't really say", but the line is the persona. |

## Reversed pairs and siblings

- **magician-caregiver / caregiver-magician** (*Their Night* / *Till Spring*): distinct. Arranging someone's moment and slipping out vs believing they'll be all right and turning up till spring.
- **magician-creator / creator-magician** (*On One Condition* / *Overnight*): distinct. Granting more than was asked vs changing everything but the part that's theirs. Both "hear what's underneath", so keep the Genie on wishes and the Makeover Artist on the part kept.
- **magician-explorer / explorer-magician** (*One More Adjustment* / *Just Knew*): distinct, though both are stirred Martinis (signals). Grain whisky, blanc and calvados vs a gin-Campari build. The person differs: the endless adjuster vs the keeper of quiet habits.
- **magician-hero / hero-magician** (*Worth the Trade* / *Day Job*): distinct. The hard change and its cost vs hidden power.
- **magician-innocent / innocent-magician** (*More Than One Head* / *Let's Try It*): distinct; both highballs (signals). See `reviews/innocent.md`.
- **magician-jester / jester-magician** (*Even When You Know* / *The Kind You'd Want*): distinct.
- **magician-lover / lover-magician** (*Undimmed* / *Worth Finding*): close. Both hold something back, both in a clear Martini in a small stemmed glass. *Worth Finding* keeps one thing unsaid so people stay; *Undimmed* turns its intensity down so nobody loses their footing. The proposals ask different things ("tell one person what you've been saving" vs "stop coming in at half"), and the drinks differ (shochu, gin and shiso, stirred vs freezer vodka, unstirred, grated zest). Not interchangeable; no change. A further cross-family echo: *Day Job*'s "You'd rather nobody near you felt outshone" is the Siren's fear in other words.
- **magician-outlaw / outlaw-magician** (*No Accident*, approved / *For Its Own Good*): distinct.
- **magician-regular-guy / regular-guy-magician** (*Cold Water First* / *Good for Years*): distinct.
- **magician-ruler / ruler-magician** (*Built to Hold* / *The Long View*): close. Both foresee what could go wrong ("the evening has already happened once, in your head" vs "you mention what could go wrong before anyone else is worried"). The Omnipotent One holds the whole system and fears the piece that moves; the Legend speaks early and waits to be heard. Distinct enough.
- **magician-sage / sage-magician** (*Already There* / *Plain to See*): close in shape, both "seeing how it could be". People vs systems; distinct.
- **Inside the family:** (1) Runaway growth is the fear in both *More Than One Head* ("directions you didn't pick") and *Built to Hold* ("the piece that moves by itself"). They're distinct, because the Apprentice fears success and the Omnipotent One fears a loss of control, but a third Magician-row pour shouldn't use it. (2) The "step into the moment you made" proposal (above). (3) Phrase overlap outside the family: *Even When You Know*'s white crème de cacao is "clear as water, and it tastes of chocolate", and *Day Job* (hero-magician) calls it "a chocolate liqueur as clear as water". Since the illusion is *Even When You Know*'s whole point, I'd vary *Day Job*'s wording (for the Hero reviewer). (4) Beetroot is in *Even When You Know* (bourbon) and *Accomplices* (sweet vermouth). Different meaning, and both Checks note the other, but *Accomplices*' Checks still say "No pour uses beetroot". That's a dossier fix for the Lover editor.
