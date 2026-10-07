# Family review: Jester (2026-10-06)

Reviewer notes in one paragraph: a lively family with real range in the glass: an ice shell cracked at the table, a café brûlot never lit, a bottled highball waiting in the fridge, a swizzle, a Boilermaker, an 1806 Cock-Tail with banana. The stories are funny on their own (the owl at Perote, Odd McIntyre, the phone booth, Croswell's "ready to swallow anything else"), and the readings let the joke land before they explain it. What recurs: (1) **audit fixes that never reached the guest text.** *Is It Just Me* still carries both of Hester's D1/D3 fails, and *Against My Better Judgement* promises a pear syrup "(below)" that isn't there. These are the family's real errors, and they're mechanical. (2) **Signposted kindness as a formula.** "Here's what those nights gave people", "Here's your gift", "here's what it does for people", "So here it is, out loud", "It's time someone told you what that's worth": the gift is said in nearly every whoYouAre, as Robin asked, but by the same signpost. Vary it; don't remove it. (3) **The "table nodding along to something false" scene** appears in *Quote Me*, in the reversed *With the Bite In* and in *Kept*. The rooms fenced against it and each version differs, but the opening scene is the same. (4) Tagline cadence: six of eleven are two short sentences with a full-stop beat. Two allergen and safety items are open: *Anyway*'s Peychaud's (nuts), and *The Wink*'s raw egg, whose pasteurised-egg advice sits in Checks but not in the recipe the guest sees.

## Matrix rows

| pairing | name | status | T | H | V | P | tagline | priority | top issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| jester-caregiver | *Anyway* | draft | major: `contains: []`, but the live tool gives `nuts` (Peychaud's) | ok | ok: the "I'd have gone to both" / "I'd come to both" callback works | ok | change (take 10-02 rec) | P1 | allergen line contradicts the tool |
| jester-creator | *For Kicks* | draft | ok: orgeat declared nuts and glossed | ok: "Buenos Aires" checked against the 1927 trap list (A10) | ok | ok | keep | none | no change |
| jester-explorer | *Unrehearsed* | draft | ok: freeform judged by hand against the built range, honestly. Zacapa is named for a sourced reason (*Codex* p. 109) with a style substitute; the ice-shell method is home-makeable and says how to check | ok | ok | ok | change (take 10-02 rec) | P2 | tagline is the mass-contrast "Anyone can…" |
| jester-hero | *The Wink* | flagged | minor: the acid OUT is honest (a nog has no citrus; balance.py judges it on egg-white sour ranges). But the raw-egg advice (pasteurised for anyone pregnant, elderly or unwell) is only in Checks; and y4 says "a spoonful" where the recipe says 1 teaspoon | minor: the San Jacinto setting is hidden rather than owned; see proposal | ok | ok | keep | P1 | raw-egg safety note missing from the guest recipe |
| jester-innocent | *Off the Tour* | draft | ok | ok: the fiction is owned ("in a story") | minor: y3 states the "taken for fiction" fact and leaves it; the tagline does the tying instead | ok | change | P2 | tagline leans on the anecdote's reveal; mass-contrast |
| jester-lover | *I'll Tell You Later* | draft | ok: never lit; kirsch declared nuts | ok | minor: "So here it is, out loud:" names the rule | ok | keep (optional alt) | P3 | rule-announcing signpost |
| jester-magician | *The Kind You'd Want* | draft | minor: "it keeps longer" (Robin: "last"); otherwise a well-built bottled highball with label, yield and keeping time | ok | minor: "the sugar was salt" is *Got You*'s prank ("Salt in the sugar bowl") | ok | change | P2 | motif shared with regular-guy-jester; tagline formula |
| jester-outlaw | *Quote Me* | draft | ok: freeform justified; acid OUT honest for a spirit-only Old-Fashioned | ok: banana-liqueur dating already corrected (R8) | ok | ok: distinct from *With the Bite In* (blunt vs smuggled) | keep | none | no change |
| jester-regular-guy | *Is It Just Me* | draft | major: recipe note states as fact "dried fruit is often packed alongside nuts" (audit D1 FAIL, never applied); y4 "for an afternoon" against a 6–8 hour method (D3 FAIL, never applied) | ok | ok | ok | keep current | P1 | unsourced claim in guest text |
| jester-ruler | *Somewhere to Land* | flagged | ok | minor: "who would show bartenders how to make it wherever he went" drops Wondrich's "no doubt" | ok: three "I like to think" is heavy but signposted | ok | keep | P3 | hedge lost; name split is Robin's |
| jester-sage | *Against My Better Judgement* | draft | major: the recipe says pear syrup "(below)" and method 1 says "make the pear syrup", but no syrup recipe, yield or keeping time is given | ok | ok | ok | change | P1 | instruction can't be followed |

## Revision proposals (ranked, most important first)

### jester-caregiver · P1 · ground: Tomás · Robin
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens
- **Current (verbatim):** `contains: []`
- **Proposed:** `contains: ["nuts"]` and `veto_free: false`, with Checks: "Allergens: **nuts**, from Peychaud's bitters (classified nuts in the ingredient table, on the safe side: its recipe isn't published)." If Robin reverses the Peychaud's classification instead, the file stands. The same ruling settles *Their Night* and the approved *No Accident*.
- **Why it improves the pairing:** a guest who vetoes nuts would be shown this drink. The file and the tool must agree before the pour is shown.
- **Checks before applying:** Robin's ruling on Peychaud's → nuts (open since batch ruler); `allergens.py`; `lint_pour.py jester-caregiver`; the family's AD-4 floor count.

### jester-sage · P1 · ground: Tomás · routine
- **Where:** recipe table (new last row) and `method 1`
- **Current (verbatim):** recipe note "made the night before (below)"; method "1. The night before, make the pear syrup."
- **Proposed:** add a recipe row: "| | *for the pear syrup:* 1 ripe pear (about 150 g peeled and cored), chopped small, and 150 g white sugar | makes about 150 ml, enough for about twenty drinks |". Method 1 becomes: "1. The night before, make the pear syrup. Stir the chopped pear and the sugar together in a jar, close it and leave it in the fridge overnight. In the morning, press it through a sieve and keep only the syrup. Keep it in a closed jar in the fridge and use it within a week. If it comes out thin, use 10 ml in the drink."
- **Why it improves the pairing:** the guest can't make the drink as written. The Checks already fix the rule (equal weights of fruit and sugar; 10 ml if thin, never less than 7.5), and the reading already says "a ripe pear, left overnight in sugar". This only puts it where the guest can see it.
- **Checks before applying:** Tomás to confirm the yield and keeping time (both his craft calls, unsourced); `balance.py` is unaffected (the row is already swept at 50–70 g); lint.

### jester-regular-guy · P1 · ground: Tomás · routine
- **Where:** recipe row "dried apricots", note
- **Current (verbatim):** "straight from the kitchen cupboard; strained out before serving. Check the pack: dried fruit is often packed alongside nuts"
- **Proposed:** "straight from the kitchen cupboard; strained out before serving. Check the pack for a nut warning."
- **Why it improves the pairing:** Hester's audit (D1) failed "often" as an unsourced fact in guest text, and the anchors fence says the same ("Never 'dried fruit is often packed with nuts' as fact"). The `nuts` call itself stands.
- **Checks before applying:** none (the audit's own wording).

### jester-hero · P1 · ground: Tomás · routine
- **Where:** recipe row "whole egg", note
- **Current (verbatim):** "wash it before you crack it, because half its shell gets used"
- **Proposed:** "wash it before you crack it, because half its shell gets used. It's raw, so use a pasteurised egg if the drink is for anyone pregnant, elderly or unwell"
- **Why it improves the pairing:** the Checks and Open items both say "the draft says" this, but the guest-facing recipe doesn't. A raw egg plus a sip poured into the shell is a safety line the guest should see.
- **Checks before applying:** none.

### jester-regular-guy · P2 · ground: Wren · routine
- **Where:** `yours 4`
- **Current (verbatim):** "a handful of dried apricots, chopped and left in the rye for an afternoon, then strained out."
- **Proposed:** "a handful of dried apricots, chopped and left in the rye for several hours, then strained out."
- **Why it improves the pairing:** the method says six to eight hours, tasted from the fourth. Hester failed "an afternoon" (D3) for underselling it and gave this wording; it was never applied.
- **Checks before applying:** none.

### jester-hero · P2 · ground: Hester · Robin
- **Where:** `yours 1`, `yours 2` (the story's setting)
- **Current (verbatim):** "In April 1843, prisoners from Texas were being held in the fortress prison at Perote, in Mexico, … For a date that mattered to them, they got hold of mezcal, …" and "Their captain came round, was told it was how the prisoners kept their saints' days at home, and turned to go."
- **Proposed:** options:
  (a) keep the story, and own its edge in two plain clauses: y1 "…For a date that mattered to them, the anniversary of a Texan victory over Mexico, which their guards would hardly have toasted, they got hold of mezcal, …"; y2 "…was told, not quite truthfully, that it was how the prisoners kept their saints' days at home, and turned to go."
  (b) replace the story (Hester to propose another hardship-humour mirror) and keep the drink only if the new story carries it.
- **Why it improves the pairing:** the Open items name what the reading hides: a raiding force taken at Mier, celebrating San Jacinto in a Mexican prison, with toasts that include an ethnic insult. Today the guest gets a warm prison-humour story whose cover story ("saints' days") reads as true. I think (a) is enough: it owns the date in one plain clause without war, deaths or toasts, it makes the captain's moment funnier (he's being fibbed to and still names the joke), and it keeps the joke off the guard. If Robin finds the setting itself wrong for a guest, it's (b). I wouldn't ship it as it stands.
- **Checks before applying:** Hester to verify the wording against Green p. 260 and the card's C4 ("San Jacinto anniversary"; "we told him"); lint; history share stays under half (y1–y2 are 167 of 480 words).

### jester-magician · P2 · ground: Wren · routine
- **Where:** `whoYouAre` paragraphs 1 and 2
- **Current (verbatim):** "This morning the sugar was salt." … "The salt goes back."
- **Proposed:** "This morning every mug in the cupboard was turned to face the wall." … "The mugs go back."
- **Why it improves the pairing:** salt for sugar is *Got You*'s prank ("Salt in the sugar bowl"), and *Got You* is the Prankster, who owns it more naturally. The mugs keep the Elf/Imp's rules: harmless, aimed at one person, put right in seconds.
- **Checks before applying:** grep the collection for "mug"; lint.

### jester-sage · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone hears the joke. Hardly anyone hears the hope."
- **Proposed:** options: "Your sharpest jokes are about whatever let you down." / "You've a comeback for everything that went wrong, and a picture of how it should have gone."
- **Why it improves the pairing:** the current line is mass-contrast and public/private, and it prints the reading's key pair (joke/hope), which also appears in y3 and the closing line ("say the hope first and the joke second"). Both options show the Cynic's behaviour and leave the hope for the reading to find.
- **Checks before applying:** registry; lint.

### jester-innocent · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Nobody believes your stories. They all happened."
- **Proposed:** options: "Something always happens to you on the dull days." / "Put you somewhere with rules about sitting still, and something will go sideways."
- **Why it improves the pairing:** the current line is the Green Swizzle's reveal (taken for fiction, but real) laid on the guest, and the anchors fence that fact as "never on the guest". It's also mass-contrast. The Naïf's behaviour (absorbed by a small thing in a dull room) needs no swizzle.
- **Checks before applying:** registry; lint.

### jester-magician · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone calls it trouble. Only you know the rules."
- **Proposed:** "Every trick you play, you've already worked out how to undo."
- **Why it improves the pairing:** the current line is the Everyone/Only-you public/private formula. The option is the whoYouAre's rule ("everything can be put right in seconds") as behaviour, in one sentence.
- **Checks before applying:** registry; lint.

### jester-caregiver · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You decide it's going to be a good night. Then you make it one."
- **Proposed:** "You plan the fun because waiting for the mood has never worked." (the 2 October recommendation)
- **Why it improves the pairing:** the current line repeats whoYouAre's opening ("you've decided it's going to be good anyway") in a You/Then two-beat. The recommendation doesn't lean on Clara Bell Walsh, and it's concrete behaviour. I'd take it as it stands.
- **Checks before applying:** registry; lint.

### jester-explorer · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Anyone can get the laugh. You're after the second before it."
- **Proposed:** "The silence before the laugh is your favourite part." (the 2 October recommendation)
- **Why it improves the pairing:** it drops the "Anyone can… You…" contrast and keeps the true thing, with no Aviary anecdote. whoYouAre's "a second where nobody knows whether they're allowed to laugh" is the same idea in different words.
- **Checks before applying:** registry ("best part" is *Curtain Call*'s; "favourite part" isn't, but grep).

### jester-hero · P3 · ground: Tomás · routine
- **Where:** `yours 4`
- **Current (verbatim):** "and when the drink is poured, put a spoonful of mezcal in it."
- **Proposed:** "and when the drink is poured, put a teaspoon of mezcal in it."
- **Why it improves the pairing:** the recipe and method say 1 teaspoon (5 ml). This is the same wording question as *Hoping You'd Come*.
- **Checks before applying:** none.

### jester-lover · P3 · ground: Wren · routine
- **Where:** `whoYouAre` paragraph 3
- **Current (verbatim):** "So here it is, out loud: you give people something to look forward to."
- **Proposed:** "So here it is: you give people something to look forward to."
- **Why it improves the pairing:** "out loud" is the rulebook's own phrase for the kindness rule, and the guest hears the machinery. Robin's edits just say the thing.
- **Checks before applying:** none.

### jester-ruler · P3 · ground: Hester · routine
- **Where:** `yours 1`
- **Current (verbatim):** "a lobbyist known as Colonel Joe Rickey, who would show bartenders how to make it wherever he went."
- **Proposed:** "a lobbyist known as Colonel Joe Rickey, who, it's said, showed bartenders how to make it wherever he went."
- **Why it improves the pairing:** the audit sources this to Wondrich's "no doubt" (*Imbibe!* pdf 117), which is an inference. The reading states it as a habit on record. A two-word hedge keeps it honest in a reading that is all about competing accounts.
- **Checks before applying:** none. Separately, the name split (1–1–1) is Robin's: I'd back *Somewhere to Land*, which names what the person gives. *Dry Wit* leans on the drink, and *Don't Look at Me* on the hiding.

### jester-magician · P3 · ground: Tomás · routine
- **Where:** recipe row "dry vermouth", note
- **Current (verbatim):** "from the bottle; kept cold and undiluted, it keeps longer"
- **Proposed:** "from the bottle; kept cold and undiluted, it lasts longer"
- **Why it improves the pairing:** Robin's plain-verb rule.
- **Checks before applying:** none.

## Taglines

| pairing | current | in 10-02? | verdict | candidate(s) | note |
| --- | --- | --- | --- | --- | --- |
| jester-caregiver | You decide it's going to be a good night. Then you make it one. | yes, unmarked | take rec | "You plan the fun because waiting for the mood has never worked." | The rec doesn't lean on the anecdote. The current line repeats whoYouAre's opening. |
| jester-creator | You made it up. Now everyone says it. | yes, unmarked | keep current | optional: "You're still doing the bit years after everyone forgot how it started." | The rec ("A throwaway joke becomes tradition in your hands") is vaguer and ends on a stock phrase. The current line is plain and true. |
| jester-explorer | Anyone can get the laugh. You're after the second before it. | yes, unmarked | take rec | "The silence before the laugh is your favourite part." | No anecdote; it removes the mass contrast. |
| jester-hero | Things get bad. You get funnier. | no | keep | none | Two beats, but short, true and not echoed. |
| jester-innocent | Nobody believes your stories. They all happened. | no | change | "Something always happens to you on the dull days." / "Put you somewhere with rules about sitting still, and something will go sideways." | It leans on the swizzle's reveal, which the anchors fence off the guest. |
| jester-lover | You always know the perfect moment. It's never the first one. | no | keep (optional alt) | "You'd rather keep good news for dessert than waste it on the starter." | The current line is fine; the alt is more concrete if Robin wants a change of cadence. |
| jester-magician | Everyone calls it trouble. Only you know the rules. | no | change | "Every trick you play, you've already worked out how to undo." | Public/private formula. |
| jester-outlaw | Rooms get more honest around you. Rarely politer. | no | keep | none | One of the family's best. |
| jester-regular-guy | You say what everybody does. Suddenly nobody's the only one. | yes, unmarked | keep current | optional: "Every table you sit at ends up admitting something." | The rec ("You confess first…") misreads the person: the reading's whole point is that this guest says "everybody", not "I", and the proposal asks them to start confessing. The rec would give the ending away as already true. |
| jester-ruler | You hardly crack a smile. You're having the best time in the room. | no | keep | none | Concrete and recognisable. |
| jester-sage | Everyone hears the joke. Hardly anyone hears the hope. | no | change | "Your sharpest jokes are about whatever let you down." / "You've a comeback for everything that went wrong, and a picture of how it should have gone." | Mass contrast; it prints the reading's key pair. |

## Reversed pairs and siblings

- **jester-caregiver / caregiver-jester** (*Anyway* / *Worth the Trip*): distinct. One plans the fun for a flat room; the other times one laugh for someone hurting.
- **jester-creator / creator-jester** (*For Kicks* / *The Other Berry*): distinct, though both are shaken sours (signals flags it): a kept-going joke vs noticing what's already strange. Scotch-Irish with orgeat and coffee-bean "flies" vs rum and tomato-vanilla.
- **jester-explorer / explorer-jester** (*Unrehearsed* / *Why Not?*): distinct. The unplanned laugh vs the long way round.
- **jester-hero / hero-jester** (*The Wink* / *Hold the Shark*): close in theme: both are humour against bad days. They're distinct in time and stakes: *The Wink* keeps morale during weeks of it and fears the morning the joke won't come; *Hold the Shark* turns the bad day into the best story afterwards. Keep them apart: no "story" words in *The Wink*, no "morning" words in *Hold the Shark* (the sage fence already notes *The Wink*'s mornings).
- **jester-innocent / innocent-jester** (*Off the Tour* / *There It Goes*): distinct. Absorbed by a small thing vs can't stop laughing at someone else's.
- **jester-lover / lover-jester** (*I'll Tell You Later* / *Only Half Joking*): close. Both are teasers who enjoy the effect. *I'll Tell You Later* is about timing and withholding; *Only Half Joking* is about teasing as hidden compliment (see `reviews/lover.md`). Distinct enough, and the drinks are far apart.
- **jester-magician / magician-jester** (*The Kind You'd Want* / *Even When You Know*): distinct. Harmless household tricks vs changing what people see in an argument.
- **jester-outlaw / outlaw-jester** (*Quote Me* / *With the Bite In*): close but distinct. Both bring truth to a table through humour. *Quote Me* says it bluntly and enjoys the gasp; *With the Bite In* smuggles it inside a joke. Their opening scenes are close (everyone praising / nodding along), and *Kept* (outlaw-innocent) opens on the same nodding table. That's three; no fourth.
- **jester-regular-guy / regular-guy-jester** (*Is It Just Me* / *Got You*): distinct, apart from the prank shared with *The Kind You'd Want* (proposal above).
- **jester-ruler / ruler-jester** (*Somewhere to Land* / *Who's In?*): distinct. The straight man who feeds the laugh vs the leader whose joke carries the plan.
- **jester-sage / sage-jester** (*Against My Better Judgement* / *In Good Part*): distinct. Joking to protect a hope vs joking so nobody has to be wrong.
- **Inside the family:** (1) The "Here's what… gives / Here's your gift" signpost carries the kindness in *Anyway*, *The Kind You'd Want*, *Is It Just Me*, *I'll Tell You Later* and *Quote Me* ("It's time someone told you…"). Keep the kindness and vary the introduction; only *I'll Tell You Later*'s "out loud" is proposed for change. (2) *Anyway* and *Is It Just Me* both close whoYouAre on the gift mattering "more than" the joke or the laugh ("it matters more than whether the game worked" / "That matters more than the laugh"). That's a near-identical cadence, P3, and I'd leave it unless an editor is already in *Is It Just Me*. (3) No recipe neighbours inside the family: the eleven glasses are genuinely different, and none needs changing to equalise the menu.
