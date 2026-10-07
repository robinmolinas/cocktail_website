# Batch innocent: summary for Robin

The batch ran from 2026-09-30 to 2026-10-04: ten pours, each in its own room with three fresh agents, from the family plan (`plans/innocent.md`). *Four Shares* (innocent-regular-guy) was already approved. It ran headless, two pours at a time at your request, so you weren't asked anything along the way. Disagreements the rooms couldn't settle are flagged below rather than decided. The round cap changed during the batch: innocent-caregiver ran 7, creator, explorer and hero ran 6, and every room from jester on ran 4, with round 4 in four steps.

Result: 7 drafts, 3 flagged. 6 of the 10 are veto-free.

## Flags and edges first

**Flagged: your call**
- ***Whole World* (innocent-ruler): two flags.**
  - Balance reads OUT on sugar (initial 0.75 against 5.3–8.0). It's a plain dry gin Martini, thrown tin to tin, and a dry Martini always reads there. Wren and Tomás kept it plain on purpose, because the story is one gesture kept going, so the throw is the drink's interest. The reason is in Checks, as with *One Line* and *Say So*.
  - The name split three ways: *Whole World* (Wren), *All Right Today* (Tomás) and *The Second Sip* (Hester). Tomás and Hester each said they could take *Whole World*, which the pour carries until you pick.
- ***Night Light* (innocent-caregiver): balance reads OUT on the stirred ranges, by choice.** The core is fino, a Bamboo with chamomile-honey, so it's too weak for the stirred style (11.7%). Tomás quotes Codex p. 246: a spirit core drowns fino.
- ***The Way It Felt* (innocent-creator): balance reads OUT on strength, by choice.** It's a Kalimotxo at 6.5% against the highball's 10–16%. Adding a spirit would be the very correction this guest fears.

**Allergen rulings waiting for you**
- ***The Way It Felt* (innocent-creator) still says veto-free, but its spec now gives nuts.** In batch outlaw, outlaw-jester reclassified the shared `coca_cola` row as nuts, on the safe side, because nutmeg oil appears in two published historical formulas. The pour file was never edited. Either rule the cola row back to none, or have the pour re-assembled with `contains: ["nuts"]`.
- ***There It Goes* (innocent-jester) contains spice from a botanicals list nobody has read.** Hester found a lead that Nonino's amaro uses galangal, and Tomás reclassified his own new `amaro_nonino` row as spice. You can rule it back to none.

**Not veto-free (3, by choice):** *The First Guess* (spice: a Sichuan peppercorn steep), *Straight Up* (nuts) and *There It Goes* (spice, above). *The Way It Felt* would be a fourth if the cola ruling stands.

**Edges worth a look**
- ***Let's Try It* (innocent-magician):** the core of the story (the fishing trip, Lyn's question, Grant's ten-at-night call) is Bill Lark's own telling in a 2022 trade interview, a secondary source. The *Oxford Companion* confirms only the 1992 law change and the licence. `pepperberry_water` stays in ingredients.json, used by no pour.
- ***Fresh Air* (innocent-outlaw):** the Stone Fence's original spirit is contested, so the pour says "the older way" and never "the original recipe".
- ***Just So You Know* (innocent-sage):** Gary Regan is also the person in *Just Knew* (explorer-magician). That room left the Scotch Sours and the waitress to this pour on purpose, so this one tells only that anecdote and names him once. The waitress is unnamed, and "caught" is all she does on the page.
- ***Whole World* (innocent-ruler):** it shares the Boadas entry with *Day Job* (hero-magician). Four fences keep them apart: no Floridita, no Constante and no Havana in the guest text, and the throw belongs to this pour.
- ***The Big Words* (innocent-lover):** the newspaper facts are OCR text only, and "first" is contested between Oxford entries, so the pour never calls Grohusko's Brooklyn the first.
- ***Straight Up* (innocent-hero):** borovička's tie to his road is offered as "I like to think", not as fact.
- **Library gaps** the rooms named: Maria Dolors Boadas, *Los cóctels del Boadas Cocktail Bar* (1990), which would say what Boadas throws; and the Kalimotxo origin sources (Miles, Celhay).

## The pours

| pairing | name | tagline | "this is me" | drink | status |
| --- | --- | --- | --- | --- | --- |
| innocent-caregiver (The Big Sibling) | *Night Light* | You were small too. You looked after them anyway. | "You were never less scared of the dark. You just had someone to be calm for." | fino Bamboo, chamomile-honey | **flagged** (balance) |
| innocent-creator | *The Way It Felt* | You never saw what was wrong with it. Nor did anyone it was for. | "Then someone explains, kindly, how it's usually done. You nod. You still don't see what was wrong with it." | Kalimotxo over its own ice | **flagged** (strength; cola ruling) |
| innocent-explorer | *The First Guess* | Your questions are how everyone else starts looking. | "When someone says 'actually, nobody's really sure', most people sigh. You light up." | cognac and Pineau, Sichuan peppercorn steep | draft, spice |
| innocent-hero (The Underdog) | *Straight Up* | Everyone else could see how far you'd come. You were the last to hear. | "There's a moment before the happiness. You replay how it happened, checking it was all fair, as if someone might ask." | borovička sour, mango syrup | draft, nuts |
| innocent-jester (The Giggler) | *There It Goes* | You find it funny first. Then everyone does. | "You're the one who can't stop laughing at it, and that's usually the moment it gets funny for everybody else." | Paper Plane riff with salt | draft, spice |
| innocent-lover | *The Big Words* | You've never loved anything a little. | "Nobody knows the pause after the big words better than you." | Brooklyn Club rum Manhattan, CioCiaro | draft |
| innocent-magician (The Dreamer) | *Let's Try It* | You always say "probably not" first. You never mean it. | "So now every hope comes with a little 'probably not' in front of it, said first, to beat everyone else to it." | still Lark highball, two teaspoons of Glenfarclas last | draft |
| innocent-outlaw (The Outsider) | *Fresh Air* | Nobody quite believes you when you say it's enough. It is. | "They mean it kindly, which is why you don't argue." | Stone Fence the older way: aged rum, dry still cider, raw apple | draft |
| innocent-ruler (The Little Prince) | *Whole World* | It looks small to everyone else. It's never been small to you. | "Other people ask how big it is. You ask whether it's all right today." | thrown dry gin Martini, 3:1 | **flagged** (sugar; name) |
| innocent-sage (The Wise Kid) | *Just So You Know* | You tell people what you'd want to be told. | "It just seemed like what you'd want, if it were you." | bourbon Whiskey Sour, sugar pressed into the lemon shell | draft |

## What the rooms found hard

- **Gentle drinks against the balance tool.** Three rooms kept a drink that balance.py reads OUT by structure: a wine core, a 6.5% highball and a dry Martini. In each case the room argued that the gentle drink is the person, and that a "corrected" one would be the very thing this family fears. All three are flagged rather than forced into range.
- **Allergens on rows the rooms added themselves.** *There It Goes* went from veto-free to spice in round 4, when a lead about Nonino's galangal made Tomás reclassify his own new row. In *Let's Try It*, an unsourced pepperberry water carried spice into a drink that didn't need it, so Tomás swapped it for a sourced bottle in round 4.
- **Owned overlaps.** This family borrowed from other families more than most. Regan is Explorer's person, the Boadas entry is Hero's bar, and the apple is held to one pour in the family. Each overlap was settled by fences written down in round 1 and checked by Hester's audits.
- **Names.** With picks held until the vote, eight rooms settled in one vote (unanimous or 2–1). Only innocent-ruler split 1–1–1.
- **The cap changing mid-batch** (from 7 rounds to 6, then 4). The 4-round rooms with round 4 in four steps closed cleanly. Both audits stayed, and every late fix landed in step 3.

## The family's menu view (non-binding)

Martini family 4 (caregiver's Bamboo, explorer, lover's Manhattan, ruler), Highball 3 (creator, magician, outlaw), Daiquiri/sour 2 (hero, sage) and Sidecar 1 (jester). With the approved *Four Shares* (a punch, on the Daiquiri root), the family has no Old-Fashioned, which balances the Explorer and Sage families' heavy share of them.

## Rule candidates

None raised in this batch.
