# Family review: Sage (2026-10-06)

Reviewer notes in one paragraph: the family with the best stories for its persona. Each one is about how knowledge is handled, not just possessed: Sylvius's attribution granted and then narrowed, Biot checking Pasteur with his own acid, Barnard's gap in the casks, Forrester saying it again at greater length, the Clover Club honouring its targets before teasing them. The drinks are among the collection's most original (a popcorn-syrup Old-Fashioned batched in the freezer, coffee ice that arrives later, a Sidecar soured with verjus, port and cold tea), and the twists are tied in words. Hester's hedges are visible in the text, sometimes too visible: *At the Time* says "the history" or "the record" three times, which is the research talk Robin has edited out before. What recurs is checking again, late, alone (*Look Again*, *On the Record*, *Note to Self*). That's true to the archetype, and no two use the same words. The proposals are the most varied in my four families. One safety gap (*What It Rests On*'s popcorn), one counting slip Hester already caught (*On the Record*), and two 1–1–1 name splits for Robin.

## Matrix rows

| pairing | name | status | T | H | V | P | tagline | priority | top issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sage-caregiver | *Further Than Me* | draft | ok | ok | ok | ok | keep (alternative in table) | — | no change |
| sage-creator | *What It Rests On* | draft | **major:** Checks says "the recipe note sends anyone using bought popcorn to the pack, since butter is dairy and coconut oil is nuts". The guest's recipe note says no such thing | ok | ok | minor: near-identical ingredients to *In Kind* (lover-sage: bourbon, syrup, measured water; cosine 0.98), but a different serve (frozen, up, in a coupe vs a julep cup) | keep | P1 | missing allergen guard on a veto-free pour |
| sage-explorer | *Look Again* | draft | ok | ok: the legend granted before it's corrected, a model of the rule | ok | ok | keep | — | no change |
| sage-hero | *At the Time* | draft | ok | ok | minor: "in the history that tells his story", "the same history says", "The record is smaller: a history that says…" is research talk | ok | keep | P2 | y3's ending told as a sourcing note |
| sage-innocent | *Are You Quite Sure?* | flagged | ok: freeform stirred verjus sour, honest | minor: history at about half (y1 and y2 are all chemistry); "polarised light" unexplained | ok | ok | alternative offered | P2 | 1–1–1 name split |
| sage-jester | *In Good Part* | draft | ok: dilution edge 45.6 vs 46 is trivial | ok | ok | ok: near the reversed *Against My Better Judgement* (humour and truth), distinct (dignity vs hope) | keep | — | no change |
| sage-lover | *A Brother's Care* | approved | ok | ok | ok | ok | keep (approved) | — | approved pour: no errors found |
| sage-magician | *Plain to See* | draft | ok | ok | minor: epigraph's "In one, the rye is usually a little" is a stumble | minor: close to the reversed *Already There* (both fear people following them into a mistake; both answer with "give them the way of seeing") | keep | P3 | epigraph wording; reversed-pair closeness |
| sage-outlaw | *On the Record* | flagged | ok: OUT on the stirred bands is honest (a port core, the *Codex*'s Bamboo shape). Port sugar is unsourced, and the sweetest bottles go OUT | minor: y4 "his second telling" counts two tellings where the reading gives three (1844, 1845, 1852) | ok | ok | keep | P2 | apply Hester's step-4 fix |
| sage-regular-guy | *Whatever They Call It* | flagged | ok | ok | minor: closing line repeats method 5 and y5 ("the soda turns the tequila citrusy by itself") | ok | keep | P3 | 1–1–1 name split; closing line |
| sage-ruler | *Note to Self* | draft | ok | ok | minor: tagline is a symmetrical abstract pair | ok: same story domain as the reversed *Either Way* (Scotch-whisky history), different person | replace | P3 | tagline |

## Revision proposals (ranked, most important first)

### sage-creator · P1 · ground: Tomás · routine
- **Where:** recipe row (popcorn syrup), note
- **Current (verbatim):** "100 g demerara sugar dissolved in 100 ml hot water; off the heat, stir in about 20 g plain popcorn (2½ cups, from about 2 tablespoons of kernels), cover for 30 minutes, then press it through a sieve. Makes about 120 ml; keeps a week in the fridge"
- **Proposed:** "100 g demerara sugar dissolved in 100 ml hot water; off the heat, stir in about 20 g plain popcorn (2½ cups, from about 2 tablespoons of kernels, popped dry or in a little plain oil, with no butter), cover for 30 minutes, then press it through a sieve. Makes about 120 ml; keeps a week in the fridge. If you use bought popcorn, check the pack: butter is dairy, and coconut oil counts as nuts"
- **Why it improves the pairing:** the pour is veto-free only because the popcorn is plain. Microwave and bought popcorn often carries butter or coconut oil. Tomás's Allergens row says the guest note already sends buyers to the pack, but it doesn't. This is the one guard the veto-free classification depends on.
- **Checks before applying:** `allergens.py` unchanged (`popcorn_demerara_syrup` row); lint.

### sage-outlaw · P2 · ground: Hester · routine
- **Where:** `yours 4`
- **Current (verbatim):** "The same kind of wine, said again at greater length, as a nod to his second telling."
- **Proposed:** "The same kind of wine, said again at greater length, as a nod to his telling it again."
- **Why it improves the pairing:** y3 gives three tellings (the 1844 pamphlet, more in print "by the next year", the 1852 evidence), so "second telling" miscounts. Hester's step-4 fix (Open items, not applied because the room had signed) keeps the image and is true. The epigraph ("once in short, then again at greater length") and closing line ("Make the second pour the bigger one", about the pours, not the tellings) still hold.
- **Checks before applying:** lint.

### sage-hero · P2 · ground: Wren · Robin
- **Where:** `yours 3`, last four sentences
- **Current (verbatim):** "I like the size of the ending, too. We don't know whether he ever got everything he went downtown for. The record is smaller: a history that says Seven Grand made the difference, and one man who calls it, "to me", the turning point. I suspect you trust that ending more than a triumphant one."
- **Proposed:** "And I like that the ending is a modest one. Nobody claims he got everything he went downtown for, only that one bar made the difference and, for one man at least, was the turning point. I suspect you trust that ending more than a triumphant one."
- **Why it improves the pairing:** "The record is smaller: a history that says…" makes the guest read a sourcing note. Robin turned "Nobody I've read says…" into plain speech in caregiver-hero. The new wording keeps both hedges (the book's "made the difference", Taggart's personal "turning point") and the Grandmaster's taste for a modest ending, and saves about 15 words.
- **Checks before applying:** Hester to confirm "for one man at least" carries Taggart's "to me"; lint.

### sage-innocent · P2 · ground: Wren · Robin
- **Where:** `name` (flagged 1–1–1: *Are You Quite Sure?* · *Nothing Escaped You* · *Before Your Eyes*)
- **Current (verbatim):** "Are You Quite Sure?"
- **Proposed:** "Before Your Eyes"
- **Why it improves the pairing:** the name sits on the guest's card, and "Are You Quite Sure?" read cold is said *to* the guest. That's the very doubt the Prodigy is tired of hearing, and only the reading turns it into Biot's blessing. *Before Your Eyes* is the story's resolution (the salt made in front of him, the result read by his own eye) and the proposal's ("Show them… let them look for themselves"), and it carries what the guest gains. *Nothing Escaped You* flatters. Wren and Tomás have said they could take *Before Your Eyes*. Robin's pick.
- **Checks before applying:** registry for the name; the closing line and epigraph don't echo it.

### sage-innocent · P3 · ground: Hester · routine
- **Where:** `yours 1`, fourth sentence
- **Current (verbatim):** "Their crystals looked alike, yet in water only the first turned polarised light to one side."
- **Proposed:** "Their crystals looked alike, yet in water only the first turned polarised light (light filtered so it vibrates in one direction) to one side."
- **Why it improves the pairing:** plain language. Every bar term in the collection gets explained, and this science term is the hinge of the whole story. With y1 and y2 both history, it's the sentence most likely to lose the guest.
- **Checks before applying:** Hester to verify the gloss; lint.

### sage-hero · P3 · ground: Wren · routine
- **Where:** `yours 1`
- **Current (verbatim):** "Going out to bars and restaurants in Los Angeles had left him in love with the city's rundown old centre, which, in the history that tells his story, was dead."
- **Proposed:** "Going out to bars and restaurants in Los Angeles had left him in love with the city's rundown old centre, which one book calls dead."
- **Why it improves the pairing:** same research-talk fix as y3, in fewer words. y2's "the same history says" can then read "the same book says".
- **Checks before applying:** lint.

### sage-magician · P3 · ground: Wren · routine
- **Where:** `epigraph`
- **Current (verbatim):** "Two countries, two whiskies, both often called rye. In one, the rye is usually a little."
- **Proposed:** "Two countries, two whiskies, both often called rye. In one, there's usually only a little rye in it."
- **Why it improves the pairing:** "the rye is usually a little" trips the reader on a cold line. The fix says the same thing (anchor `lineage`: "corn is usually its main grain, with a little rye").
- **Checks before applying:** lint.

### sage-regular-guy · P3 · ground: Tomás · Robin
- **Where:** `closingLine`
- **Current (verbatim):** "No lime: the soda turns the tequila citrusy by itself. Next time the table's arguing, speak up once, for the small thing nobody else noticed."
- **Proposed:** "Pinch the oregano and lay it on the ice. Next time the table's arguing, speak up for the small thing nobody else noticed."
- **Why it improves the pairing:** the first sentence is said three times (method 5, y5, closing line). The oregano is y5's "small thing nobody thought to pick", so the craft half now hands straight to the life half.
- **Checks before applying:** registry for closing lines (no "pinch" collision); lint.

### sage-regular-guy · P3 · ground: Wren · Robin
- **Where:** `name` (flagged 1–1–1: *Whatever They Call It* · *Small and Real* · *What Stayed*)
- **Current (verbatim):** "Whatever They Call It"
- **Proposed:** keep "Whatever They Call It"
- **Why it improves the pairing:** it's the only one of the three that sounds like the person (the Dude's shrug) as well as the story (a tequila that lost two names). *Small and Real* describes the drink, and *What Stayed* is the estate's. Hester and Tomás have both said they could take it.
- **Checks before applying:** none.

### sage-ruler · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Impressive is easy. Exact is what you're after."
- **Proposed:** "You'd rather write it down than remember it wrong."
- **Why it improves the pairing:** the current line is a symmetrical pair of abstractions that could fit any perfectionist (*On Their Behalf*, *Making the Calls*). The candidate is the Scientist's own habit (the meter readings, the bread times), in fresh words, with no Barnard needed.
- **Checks before applying:** registry; lint.

### sage-innocent · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You got there first. You're still glad you did."
- **Proposed:** "You learned early to sound less sure than you are."
- **Why it improves the pairing:** "still glad you did" leaves the guest to supply what they're glad about. The candidate is the Prodigy's recognisable habit (the "I think" in front of what they know) without using the reading's or closing line's words.
- **Checks before applying:** registry; lint.

**Not proposed, with my view:**
- *On the Record*'s OUT: accept it. A port core can't meet spirit-Martini bands, and Tomás's comparison to the Bamboo shape (and *Night Light*) is the honest one. Finished sugar runs EDGE to OUT across the unsourced port range, so the tea is doing real work. Worth a sourced residual-sugar figure (Hester's Mayson lead) before publishing, not a recipe change.
- *Plain to See* vs *Already There* (magician-sage): both fear leading people into a mistake, and both answer with "give them the reasons or the way of seeing, not the conclusion". *Plain to See* owns this more truly, because Jackson's styles *are* a way of seeing. The cheaper differentiation sits in *Already There*'s proposal, which belongs to the other reviewer, so I flag it rather than move *Plain to See*.
- *A Brother's Care* (approved): no fact, safety, allergen or rule error found. Its "That's you, isn't it?" and its history weight are Robin-approved.

## Taglines

| pairing | current | in 10-02? | verdict | candidate(s) | note |
| --- | --- | --- | --- | --- | --- |
| sage-caregiver | Everyone you've helped can manage without you now. That was always the plan. | no | keep (or alternative) | Your best advice is usually a question. | strong turn; "manage without you" sits close to whoYouAre ¶2's last line, hence the alternative |
| sage-creator | People lean on what you make without ever wondering why it holds. | no | keep | — | one clean observation; concrete |
| sage-explorer | The more you like an answer, the harder you look at it. | no | keep | — | the family's best line: behaviour, paradox, no anecdote |
| sage-hero | You'll let a good move look bad, and not say a word. | no | keep | — | concrete and in the persona's own idiom (moves) |
| sage-innocent | You got there first. You're still glad you did. | no | replace | You learned early to sound less sure than you are. | two short sentences with a vague second beat |
| sage-jester | You'll be the silly one, so nobody has to be the wrong one. | no | keep | — | strong; slight echo of y3 "the silly one", acceptable |
| sage-lover | Some truths last because someone loved them enough to keep them. | no | keep (approved) | — | Robin-approved, including the tagline |
| sage-magician | You take a yes more seriously than a no. | no | keep | — | short, true, and a little surprising |
| sage-outlaw | You don't like being the only one. You like pretending even less. | no | keep | — | not-X-but-Y flagged, but the second beat is the person's real priority, said plainly |
| sage-regular-guy | You let almost everything go. Just not the part that matters. | no | keep | — | clear; the name already carries the shrug |
| sage-ruler | Impressive is easy. Exact is what you're after. | no | replace | You'd rather write it down than remember it wrong. | abstract symmetry |

## Reversed pairs and siblings

- sage-caregiver / caregiver-sage (*Instead*): distinct. Letting them find it vs asking the hard question.
- sage-creator / creator-sage (*Beside the First*): distinct. The hidden frame vs questioning your own classic. In the glass, *What It Rests On*'s near-twin is *In Kind* (lover-sage), not its reversed pour.
- sage-explorer / explorer-sage (*Show Your Working*): distinct. Checking the neat answer you love vs carrying the unanswered question for years. They're neighbours, and they don't collide.
- sage-hero / hero-sage (*Leave It With Me*): distinct, a good mirror (the patient move vs the improvised rescue).
- sage-innocent / innocent-sage (*Just So You Know*): distinct. Being talked down to vs telling someone the crumb on their chin.
- sage-jester / jester-sage (*Against My Better Judgement*): close in mechanism (a joke carries a truth), distinct in what's protected (the other person's dignity vs one's own hope).
- sage-lover / lover-sage (*In Kind*): distinct.
- sage-magician / magician-sage (*Already There*): close (see above).
- sage-outlaw / outlaw-sage (*Hear Me Out*): close in situation (one voice against the room), distinct in motive (the evidence you found vs testing an idea by opposing it), and a good pair to read side by side.
- sage-regular-guy / regular-guy-sage (*Tried and True*): distinct.
- sage-ruler / ruler-sage (*Either Way*): close in story domain (both are Scotch history), distinct in the person and the glass.
- **Siblings:** "check it again, late" appears in *Look Again* ("go back to the traveller's words late at night"), *On the Record* ("you check it again, usually late") and, in spirit, *Note to Self*. The wording differs and it's the archetype's core, so no change, but no fourth. *What It Rests On*, *Note to Self* and *A Brother's Care* all end on letting go of control or analysis (the gaps, the hunch in the margin, the first sip unnamed). That's acceptable because each is tied to its own scene. Cross-family: *Loose on Top* recommends Sauza by name, while *Whatever They Call It* uses Sauza's diffuser as the industrial foil. Neither sneers, so it holds, but the editor should keep *Whatever They Call It* y1 free of judgement words.
