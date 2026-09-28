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
3. **Pairings.** The Mixologist's own knowledge plus the books. The *Flavor Matrix* is a cookbook, used for occasional **surprising** pairings: map a spirit to its base (barley → Grain, sherry/vermouth → Grape). Never force a surprise. **The ingredient table never limits the drink** (Robin 2026-09-25): any ingredient the pairing calls for is welcome. If it isn't in the table yet, the Mixologist adds it (`add_ingredient.py`: values with a source or marked unsourced, allergens classified on the safe side). It's the Mixologist's decision, not Robin's: what protects the guest is their own veto, so the classification must never under-state what the ingredient could touch. Never a flag or a blocker.
   - **A spark, not just the classic** (Robin 2026-09-26: "don't make it necessarily simply the cocktail, use the flavour matrix to find something original, a spark"). The story's drink is the starting point, not the finished recipe. Look in the *Flavor Matrix* for one original touch. Riff when the riff adds something to the personality, and keep the classic only when the classic itself is the point. The balance between original and riff is the Mixologist's call. A riff changes what the facts may claim: never "his recipe" for a drink we've changed.
4. **Vetoes are medical (allergy), not taste. Classify on the safe side.**
   - Nutmeg, coconut, orgeat, amaretto, hazelnut liqueur and pine nuts → `nuts`.
   - Cream liqueurs and butter-washed spirits → `dairy`.
   - Undistilled beer or malt → `gluten`. Distilled grain spirits are **not** `gluten`.
   - `spice` = **heat only** (bitters and baking spices don't count).
   - Wine **fining agents are ignored** unless a specific named bottle is labelled with egg or milk.
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
