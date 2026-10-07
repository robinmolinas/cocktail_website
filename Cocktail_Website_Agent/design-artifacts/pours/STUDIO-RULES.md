# Authoring studio — the rulebook

Learned by authoring the first three pours with Robin (2026-09-24, party-mode
sessions with the Historian, the Mixologist and the Psychologist). The approved
examples are the reference for every rule:

- `sage-lover.md`: **A Brother's Care** (the Connoisseur), a Rob Roy riff
- `magician-outlaw.md`: **No Accident** (the Trickster), a Seelbach riff
- `innocent-regular-guy.md`: **Four Shares** (the True Friend), a punch bowl

All three are veto-free, which satisfies the AD-4 floor. Spec of the pour itself:
`../2026-09-23-cocktail-meaning-model.md` (read its Amendments).

## The room

| Agent | Works from | Owns |
| --- | --- | --- |
| **Psychologist** | Its own expertise; the full xlsx row (`agent/data/Brand Personality + Roulette.xlsx`, both sheets: goal, fear, description, example, story, imagery, drivers, per-archetype fears and tone); KB §2 | The reading of the person, the truth-vs-legend stance, epigraph, whoYouAre, the "why it's you" in `yours`, the final proposal |
| **Historian** | `Dionysus/docs/_text/historian/` (Oxford Companion, *Imbibe!*); web for anything missing, marked by tier | Lineage and story anchors, the dossier sources, legends vs facts |
| **Mixologist** | `Dionysus/docs/_text/mixologist/` (*Cocktail Codex*, *Liquid Intelligence*, *Flavor Matrix*) + its own craft | The recipe, method, closing line, the four checks |

Robin reviews and approves. Only Robin sets `status: approved`. Agents propose names, and Robin picks.

## How the room works (Robin, 2026-09-24)

**A conversation, not a pipeline.** The three stay in the room for the whole pour and chime in whenever they can add something, until they agree. Wren usually opens, because the person comes first ("if there was an order: Wren, then the historian, then the mixologist"). Anyone can interrupt at any time.

**The room closes only when** all three sign off *and* the must-haves are covered:
- the persona read
- a story whose true history mirrors the person, with sourced anchors. The mirror can be a cocktail's history, **an ingredient's** (its past and how it's used), or **a person's**: the bartender, the one it was first poured for, whoever wrote it down. Use whatever relates most to the guest; the Oxford Companion covers people and ingredients too (Robin 2026-09-26)
- the four checks
- the reading
- the fact audit
- the resonance test
- names (≥3 plus a pick)
- the image brief

**Be stubborn.** An objection stands until the objector is genuinely convinced. A real deadlock goes to Robin flagged, with each side's case in its own voice. The conversation *is* the room record Robin reads.

**No reference image.** Persona images are only templates. The final images are generated *from* the pour, never the other way round.

## The cocktail checks

1. **Structure.** Place it in its *Cocktail Codex* root family and name the core, balance and seasoning. Heed the Codex's warnings (e.g. a dry-sherry swap needs more volume *and* a sweetener, p. 77).
2. **Balance, on paper** (Robin doesn't taste). Compute strength, sugar g/100 ml, acid % and dilution with Arnold's formulas. Check them against *Liquid Intelligence* ranges for the style (pdf 129–130). Flag anything outside a range, and say why, instead of hiding it. **No type of drink is off limits** (Robin 2026-09-25): hot, long, frozen, egg, anything. Every one of the *Codex*'s six root families (Old-Fashioned, Martini, Daiquiri, Sidecar, Highball, Flip) has a style in `balance.py`, including hot toddies, highballs, Collinses and fizzes with soda added last. Anything else is `freeform`: numbers without ranges, justified in Checks. Standard values for bottles not in the library are listed as *unsourced*.
   - **Judge a drink by its real structure** (Robin 2026-10-06: "accept"; "for all the drink balances you can also check the cocktail codex"). Arnold's ranges are built for spirit drinks, so a recognised form the tool doesn't model reads OUT by construction: a bone-dry Martini on sugar, a wine-core or port drink on strength and acid, a long wine highball on strength, a Flip or nog, or a shaken espresso on acid. That's not a bad drink. Spirit-only stirred drinks use the `stirred-spirit` style (no acid floor); Flips and nogs have no acid range. For the rest, Tomás benchmarks the drink against the *Cocktail Codex*'s own specs for that form (e.g. the Bamboo, a 2:1 Martini) and says so in Checks, and Robin's acceptance goes in the spec's `accepted` block, so `balance.py` reports the reading **BY STRUCTURE** rather than hiding it. Only Robin accepts.
   - **Honey or agave in a hot drink** (Robin 2026-10-06, Tomás's sourced proposal): fructose tastes less sweet hot (*LI* p. 51, p. 183, "use more"), so aim for the top half of `hot` (6.5–7.5 g); above 7.5 reads EDGE, justified in Checks by *LI* p. 183.
3. **Pairings.** The Mixologist's own knowledge plus the books. The *Flavor Matrix* is a cookbook, used for occasional **surprising** pairings: map a spirit to its base (barley → Grain, sherry/vermouth → Grape). Never force a surprise. **The ingredient table never limits the drink** (Robin 2026-09-25): any ingredient the pairing calls for is welcome. If it isn't in the table yet, the Mixologist adds it (`add_ingredient.py`: values with a source or marked unsourced, allergens classified on the safe side). It's the Mixologist's decision, not Robin's: what protects the guest is their own veto, so the classification must never under-state what the ingredient could touch. Never a flag or a blocker.
   - **A spark, not just the classic** (Robin 2026-09-26: "don't make it necessarily simply the cocktail, use the flavour matrix to find something original, a spark"). The story's drink is the starting point, not the finished recipe. Look in the *Flavor Matrix* for one original touch. Riff when the riff adds something to the personality, and keep the classic only when the classic itself is the point. The balance between original and riff is the Mixologist's call. A riff changes what the facts may claim: never "his recipe" for a drink we've changed.
   - **No spark is fine, but the drink must still be interesting** (Robin 2026-09-30: "if there are no spark, it's fine but we need to make the cocktail somewhat interesting - you have many cocktail books Tomas in your knowledge base, use them to make them interesting all while keeping the main point which is to make it personalised to the person"). When the room keeps a classic or sets the *Flavor Matrix* aside, Tomás uses the library to give it something worth noticing, tailored to the person.
   - **A drink category is never "taken"** (Robin 2026-09-28: "it's not because one persona in the family uses the hot toddy that another cannot - it mustn't be the exact same cocktail, but similar categories of cocktails are fine. Again, the objective is to find the best tailored cocktail for each persona."). Only the exact same cocktail is ruled out, and two whiskey Rickeys count as the same cocktail even with a different whiskey and water (Robin 2026-10-06, D12). **How far that reaches** (Robin 2026-10-06, F1, on the studio's recommendation): the same template with only the spirit swapped *within its kind* (rye for bourbon, one gin for another, one rum for another) is the same cocktail. A different spirit family (gin to vodka, whiskey to brandy), or a riff that changes the template itself (a modifier, a split base, a spark in the glass), makes a different drink.
4. **Vetoes are medical (allergy), not taste. Classify on the safe side.**
   - Nutmeg, coconut, orgeat, amaretto, hazelnut liqueur and pine nuts → `nuts`.
   - Cream liqueurs and butter-washed spirits → `dairy`.
   - Undistilled beer or malt → `gluten`. Distilled grain spirits are **not** `gluten`.
   - `spice` = **heat only** (bitters and baking spices don't count).
   - Wine **fining agents are ignored** unless a specific named bottle is labelled with egg or milk.
   - **What makes a row an allergen: a stated ingredient** (Robin 2026-10-06, D1). A published ingredient list, the maker's declaration, a "may contain" label on the recommended bottle, or a book that names the ingredient (Bénédictine's nutmeg, maraschino's crushed stones). Never a tasting note, a rumoured historical formula or "secret recipe" alone: Peychaud's, Coca-Cola and Underberg are none, like Angostura. A shared row is only reclassified by the Mixologist with a note to Robin, never quietly from another family's room.
   - **No new vetoes** (Robin 2026-09-30) for the celery family, sulphites, quinine, caffeine or wheat glucose syrup. A drink built on meat (a beef-broth Bullshot) gets a plain recipe note, not a veto (Robin 2026-10-06, D8).
5. **Who it's for, and which bottles** (Robin 2026-09-26). Most guests will only *read* the pour and feel included in it; some will make it at home; a few will ask a bartender for it. So bottles may be particular, and a niche spirit is fine when it makes the drink resonate with the person (that's the first priority), but never so expensive or obscure that the guest feels they could never make it.
   - **Generic style by default** ("blended scotch", "sweet vermouth").
   - **Name a bottle when it really matters:** history (Laphroaig in the Penicillin), or a drink built around one bottle. Mark it *recommended*, and give the substitute **as a style, never another brand** (e.g. "or any smoky Islay single malt").
   - A named bottle is checked for allergens as that bottle (e.g. its fining, if labelled).
   - **Equipment:** assume the basics (shaker, strainer, jigger, mixing glass or jar, bar spoon, muddler, blender, a freezer). Never niche kit like a sous vide, dehydrator or centrifuge. Homemade syrups and overnight steps are fine when they serve the drink.
   - **Strength and sharing:** no ceiling and no quota. The only aim is a drink that resonates with the personality. A shared bowl or a strong drink is fine when that's what the person calls for; numbers outside a style's range are still flagged and explained in Checks.

## The reading

- **Title block:** the **name** resonates with the person, not just the story (*A Brother's Care*, not *The Brother's Letter*). The **tagline** is about the person. The **epigraph** is about the cocktail. The two never echo each other. The epigraph is read **before** the reading, so it must make sense cold: it teases the story and never depends on it (a line only the reading unlocks just confuses; Robin 2026-09-25).
- **whoYouAre:** the inner "oh wow, this is the real me". It shows what they hide and what they fear, turned into what they give. It isn't a formula (the "among your friends" angle was right for one person, not a template). There are no profession labels, and it isn't about alcohol.
- **yours:** story → reveal → why it's you → the drink as proof → a proposal. The guest must *see themselves* in the story. It should never read as a list of connections.
- **History takes at most half of the reading** (Robin 2026-09-26). The first four pours are the right weight; never more. A niche story is welcome: guests like discovering new cocktails and ingredients.
- **One voice:** a single bartender speaks. "I", never "we".
- **Never "yours" alone for the drink** (Robin 2026-09-30: "yours is confusing alone"). Say "The cocktail I've made for you", "the cocktail I crafted for you", "your cocktail" or similar. "Yours" about the person stays fine ("never yours to finish"). The lint flags "Yours…" at a sentence start, "so yours", "made yours" and "in yours".
- **Signature vs. rationed phrases:** "I like to think…" is the bartender's signature and may recur. "Here's what I'd ask of you" and "That's you, isn't it?" are used **only now and then** (roughly one pour in four at most). Vary how the proposal and the recognition moment are introduced.
- **Romantic interpretation is welcome when it's signposted** ("I don't know why, but I like to think…"). Only sourced statements count as fact, including someone's motive.
- **The guest is reading, not drinking.** Never assume the drink is in their hand. The proposal points to a future moment or to life beyond the glass.
- **Ryu takes a position.** End with a concrete proposal.
- **Plain language.** Explain any bar or wine term in everyday words (a solera becomes "rows of barrels where the oldest is never emptied").
- **No gendered language about the guest, ever.** Second person only. Never infer gender from a name.
- **Archetype names are never shown.** Only the personality name, as discreet as the inked tag. So no puns on archetype names.
- **Coincidences are owned, not hidden**, in one plain clause.
- **No repeated motifs across pours** (e.g. "the truth at the bottom of the glass" belongs to the Trickster).
- **The Bartender manga:** the feeling, never its words.
- **Mild words in real drink names are fine; heavy direct insults are not** (Robin 2026-09-30, after *Worth the Trip*: the Suffering Bastard can be named).

### Learned from Robin's edits to batch caregiver (2026-09-30)

Inferred from his 26 direct edits (`_studio/robin-edits.md`). In each rule, the examples are his.

- **Say the kindness out loud.** The rooms left the person's gift implied, and Robin added a clause naming it: "They'll just sleep well, *that's how you share that you care*"; "the next thing that isn't fair, *that's your purpose*"; "People love to hear that you've cared for them." Once per reading, state plainly what the person's way gives others, and that it's worth something. Insight into the fear isn't enough. The guest should also leave feeling valued.
- **Tie the twist to the story in words.** Say why the change is in the glass, in one clause: "I swapped the sugar *as an ode to her courage*." Never leave the guest to work out the link between the addition and the story.
- **Let the drink sound worth having.** Say when it's a famous or renowned classic ("a renowned classic", "famous mixed drinks", "a classic", not "an everyday drink"). Describe the guest's drink with appealing words, never modest ones ("crispest", not "plainest").
- **End on what the guest gains.** A proposal that asks for restraint also gives something back: "focus on enjoying the fun yourself" (not "the measure can stay yours"). End on the guest's choice ("…but that you choose to say") or a warm wish from the bartender ("and I wish you plenty").
- **Be gentle about the person's failings.** Say "some of what you try goes nowhere", not "most". Ground the trait in lived experience ("because you know to ask from experience"). Name what's at stake inside them too ("breaking a promise to others, but most importantly to yourself").
- **Grant the legend before correcting it.** Say "Maybe, but it almost certainly didn't", not a flat "It didn't."
- **Clear before clever.** If a pronoun could point to more than one person, use the name ("Barry retired"). Say what "things" are ("his four original cocktail ingredients"). Use plain verbs ("it doesn't last", not "it doesn't keep") and modern spelling ("bathroom", even when the source wrote "bath-room"). Don't talk about the research itself ("Nobody I've read says…" → "We don't know…, but I like to think…"). "We" for people in general is fine.
- **A familiar touchstone from outside the bar is welcome.** A well-known book, or an everyday story like the Post-it Note, can make the point land faster. Use at most one per reading. Hester still sources any fact in it.
- **One vivid word beats a general one** ("a *rowdy* kitchen goes quieter").

### Variety across the collection (Robin 2026-10-06)

Guests compare pours with friends, so what matters is the pattern of moves across readings, not any one phrase. Accepted from the collection review (Robin, D13: "Apply the changes, I trust your taste judgement"). Each rule keeps the rules above (the kindness is still said once per reading; "I like to think" stays the signature). The numbers are targets across the collection, not quotas for one pour.

- **Say the fear straight in most pours.** Keep the "not X, but Y" turn only where X is something people really assume about the guest. "X doesn't scare you. Y does." goes in no more than one pour per archetype row or column; the turn in all its forms in about 1 pour in 6. ("The hard part doesn't frighten you. Wobbling in front of them does." → "What you guard against is wobbling in front of them.")
- **Say the kindness in the sentence, the way Robin does, without announcing it or grading it as rare.** Say its worth through the people who receive it or through what follows. "Here's what that gives… / it deserves to be said" goes in at most 1 pour in 4; "That's rare / Very few people can / no small thing" goes in at most 1 in 5. ("…that's your doing. Hardly anyone can give that." → "…that's your doing. It's worth every minute you spent on duty.")
- **"I like to think" doesn't always open the reveal.** It's the first words of yours 3 in at most 1 pour in 4. Elsewhere it arrives mid-sentence, after the fact or the image. Every signposted claim stays inside the signpost.
- **A proposal starts on the instruction, not an announcement of one.** No "So here's my request / position." Ryu's instruction *is* the position. At most 1 proposal in 3 opens on "So".
- **End on the guest's choice or gain more often than on a wish.** "I hope…" ends at most 1 reading in 8. Where the sentence before it is already the gain, stop there. "It was never X. It was you." belongs to *In One Piece*.
- **The closing line stays with the glass, or turns outward in an image of its own; it never repeats the proposal.** The model is *Further Than Me*: "Put the two sprigs in together. Then find out what one of them knows now that you don't." At most 1 closing line in 12 uses "Next time".

## Facts and the dossier

- Every `fact` needs a source and page. Tiers: the library is primary. Web sources are secondary, and the closest one to the original is preferred.
- Anything unsourced is marked a **legend** and never becomes an anchor (e.g. the "Waldorf" Rob Roy origin).
- **Whenever the fact audit corrects a fact, the anchors table is updated in the same round**, so the dossier never holds a claim the reading dropped (Robin 2026-09-25).
- When sources conflict, say so and don't state the contested detail (e.g. the Seelbach's invented year, 1912 or around 1917).
- Every dossier keeps: checks, sources, legends and inferences, and open items.
- Shared facts become reusable fact cards (e.g. solera, oleo-saccharum), so each is verified once.

## Pour format additions (for the next spec refresh)

- Epigraph and tagline roles as above (meaning model, Amendments).
- An optional `serves` field (the True Friend's punch serves about 14).
