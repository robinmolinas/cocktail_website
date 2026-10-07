# Tomás: drink draft, magician-hero (The Good Wizard), v1.2, round 4 step 3 (Hester's V2 landed); v1.1, round 4 step 1 (Hester's T1-T4 landed); v1, round 3

Spec: `_studio/specs/magician-hero.json` (v1). A split-base brandy Old-Fashioned, stirred and strained over one large cube. VS cognac is the core. Beside it goes a smaller measure of young Armagnac made from Folle Blanche, with a blended gooseberry syrup for sugar and a green, sharp edge. Story as Hester verified it in round 2 (`historian-anchors.md`; card `_studio/fact-cards/cognac-phylloxera-folle-blanche.md`): the rootstock found in Texas, and the Folle Blanche that gave way in Cognac and is still grown.

**Glassware:** old-fashioned glass (rocks glass, about 300 ml), one large ice cube
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | VS cognac | made mostly from Ugni Blanc, the grape that replaced Folle Blanche once the vines were saved |
| 15 ml | young Armagnac made from Folle Blanche | look for "Folle Blanche" on the label, young or unaged, 40% or stronger. The grape that made way in Cognac and is still grown in Armagnac. If you can't find one, any young Armagnac gives the same balance, but it may hold little or none of the Folle Blanche |
| 10 ml (2 teaspoons) | gooseberry syrup, homemade (below) | |
| | *for the syrup:* 200 g green gooseberries (fresh, or frozen and thawed), 100 g white sugar | blend cold until smooth, press through a fine sieve; keeps about a week in a closed jar in the fridge. Not cape gooseberries (physalis): a different fruit |

## Method

1. Make the syrup ahead: blend the gooseberries and sugar until smooth, with no heat. Press the purée through a fine sieve with the back of a spoon and keep the liquid.
2. Put the large cube in the old-fashioned glass to chill it.
3. Pour the cognac, then the Folle Blanche Armagnac, then the syrup, into a mixing glass or a jar. Fill it with ice cubes and stir for about 20 seconds, until the outside feels cold.
4. Strain it over the large cube. No garnish: the Folle Blanche's flower is the scent on top.

**closingLine:** *Keep the quarter of Folle Blanche, however small it looks. Once it's safe, find a place again for what you had to give up.*

(Mine. The gesture is the measure: 15 of the 60 ml of brandy, a quarter. The position is Wren's y5, "bring a little of it back in", said without her words, reworded because "room" closes *Loose on Top* and *For Its Own Good*, "left behind" is in three pours, and "last" is in seven closing lines. "Give up" is about the guest, never the grape: the grape gave way to rot (Hester C3). Wren owns the position, so she can move it.)

## Checks

| check | result |
| --- | --- |
| Structure | *Codex* Old-Fashioned family: spirit, sugar, seasoning. Core: 60 ml grape brandy, split 45 cognac / 15 Folle Blanche Armagnac (*Codex* p. 104: a split base with a small second spirit). Balance: 10 ml gooseberry syrup, which brings the sugar and a little acid. Seasoning: the gooseberry's sharp edge. **No bitters** (my craft call): the Folle Blanche spirit is "floral and fruity" and "best young" (Oxford ARMAGNAC pdf 139), and its flower is the point of the quarter measure. Aromatic bitters would cover it. |
| Shape chosen | **(b), the stirred Old-Fashioned on one large cube.** Not (a), the shaken sour: a sour needs 0.76-0.94% acid finished (LI, balance.py `shaken`), and neither verjus nor a gooseberry syrup gets there without drowning a quarter-measure of floral spirit. The story is cognac making room, so the brandies lead, and that's an Old-Fashioned. One large cube keeps it apart from *Kept* (Armagnac Old-Fashioned on ordinary cubes) and *Hoping You'd Come* (cognac Old-Fashioned, small wineglass). |
| Balance (balance.py, `stirred`) | 70 ml, 43.3% dilution, 100.3 ml. Initial 34.9% / 6.29 g / 0.200%; finished **24.4% / 4.39 g / 0.140%**. Every line in range. **Acid sits on the top edge** of Arnold's stirred band (0.10-0.14; initial 0.15-0.20). Judged `stirred` because it is stirred and strained. `built` (24% melt, no acid) reads OUT on acid (0.161), as any built drink with fruit would. |
| Melt on the cube (freeform, by hand against `stirred`) | After the strain the cube keeps melting. +10 ml: 22.2% / 3.99 g / 0.127%, all in. +20 ml: 20.3% / 3.66 g / 0.116%, now under the strength and sugar floors. +30 ml: 18.8% / 3.38 / 0.107. So the drink starts at the acid edge, moves into the band, and thins out slowly as any drink on a rock does. No guest text claims anything about the last sips (that's *No Accident*'s ground). |
| Sweeps (sweep.py) | **Gooseberry syrup acid (unsourced, row 1.4%):** 1.0% gives 0.100 (in, floor), 1.5% 0.150 (edge over), 1.6% 0.160 (OUT), 1.8% 0.179 (OUT). **Proven for a syrup of 1.0-1.4% acid** (fruit about 1.3-1.8%). A sharper batch tastes a touch sharper than Arnold's stirred band, still far under any sour. On the cube, +10 ml melt brings 1.5% back to 0.136 (in). **Syrup sugar (unsourced, row 44 g):** 38 g gives 3.79, 50 g 4.99, both in. **Dose:** 7.5 ml gives 3.40 g (sugar edge), 9 ml 4.00 / 0.127 (in), 12.5 ml acid 0.169 (OUT). 10 ml (two teaspoons) is the written measure. **Folle Blanche spirit strength:** 40% 24.4, 45% 25.1, 50% 25.7, all in ("40% or stronger"). **Cognac at 40%:** 24.0, in. **Split 40/20:** 24.3 / 4.39 / 0.140, identical, so the quarter isn't a numbers call. It's the story's ("a little room back", Wren r1). |
| Pairings and spark | Brandy is on the *Matrix*'s Grape wheel. Its GRAPES entry (pdf 140) says grapes "have an affinity for sour flavors" and lists **gooseberries among their substitutes**. **The spark:** Oxford says Folle Blanche's other name means "lip-stinger", which suggests its acidity (pdf 139), and that its spirit is "floral and fruity". A straight spirit carries "minimal titratable acid" (*LI* pdf 140, the note above its table), so its brandy keeps the flowers but very little of the sharpness. (Never "acid doesn't distil": Oxford names volatile acids that do carry over, pdf 765-766, Hester r3. That physics stays out of the reading.) The gooseberry puts a green, sharp edge back, from a fruit the *Matrix* lists among the grape's substitutes. It's a fruit's sharpness, never "the grape's own acid" (*Are You Quite Sure?*'s motif). It reads as a tart edge, not a fruit drink (10 ml of a 2:1 fruit syrup). No pour uses gooseberry (grep). **Withdrawn from my r2:** verjus. My r2 said no pour used it, but my grep was broken: *Are You Quite Sure?* (sage-innocent) runs verjus as "the grape's own acid" in a stirred grape brandy, on this same *Matrix* line. Also set aside: Sichuan pepper (`cognac_sichuan_pepper`, a sibling's, same line), chamomile (six pours), anything Texan (a rootstock doesn't change how the fruit tastes). |
| Story in the glass | The cognac is the saved vineyard. It's made mostly from Ugni Blanc (Oxford pdf 879), which replaced Folle Blanche when the vines were replanted on grafted roots, because Folle Blanche's tight bunches rotted (Oxford COGNAC pdf 545-546; never "couldn't take the graft", Hester card C3). The quarter of young Folle Blanche spirit is the grape that made way in Cognac and is still grown in Armagnac, about 5% (pdf 139; Hester's "still here" row). Fair to the replacement: the cognac is the core, never "dull" (Hester's guard; Oxford pdf 139 on Ugni Blanc's elegant spirit). |
| Allergens (allergens.py) | contains: none. **Veto-free** (counts toward the AD-4 floor). New rows this round, my call: `folle_blanche_armagnac` (grape brandy, none of the five vetoes; 40% floor unsourced, swept 40-50%) and `gooseberry_syrup` (fresh berry and sugar, none; values unsourced, swept). Existing row `cognac` unchanged. |
| Makeable | No named bottle. **The Folle Blanche Armagnac is the bottle a guest may hunt for:** Hester found no page naming one (r2, r3), so it's a style, "young Armagnac labelled Folle Blanche", never a brand. Ordinary and blanche Armagnac aren't Folle Blanche by default (pdf 138-139: mostly Ugni Blanc and baco), so the label has to say the grape. Fallback, in the recipe note: any young Armagnac gives identical numbers (same 40% row), but the guest is told it may hold little or none of the Folle Blanche. Gascony's other name for the grape is never printed, and nor is any look-alike wine name (Hester r3): "Folle Blanche" only, so nobody buys the wrong bottle. Gooseberries are seasonal; frozen ones work for a blended syrup (my craft call, unsourced). Kit: blender, fine sieve, jigger, mixing glass or jar, bar spoon, strainer. |
| Edges for Robin | (1) Acid on the top edge of the stirred band, and the syrup's acid and sugar are unsourced estimates. Proven for a syrup of 1.0-1.4% acid; a sharper batch runs a touch sharp. (2) The Folle Blanche spirit is a style no page names a bottle for. Single-varietal Folle Blanche Armagnacs exist to my knowledge (unsourced), and the fallback is any young Armagnac, told honestly. |

## Image brief

**Glass and drink:** a heavy old-fashioned glass with one large clear cube. The drink is pale amber, lighter than a straight cognac because a quarter of it is a young, nearly clear brandy and the syrup is pale green (my estimate, unsourced). There may be a faint haze from the fruit. No garnish.

**Props (3-5), each only what its fact says:**
- a grafted vine cutting: a young European vine joined onto a separate rootstock, the join visible (Oxford pdf 545: saved by a rootstock; Hester's "transformation" row)
- a lump of white chalk (pdf 545: the region's deep chalk soils)
- a small, tight bunch of pale green wine grapes (pdf 545-546: Folle Blanche's bunches grew tight). Sound fruit, no rot shown.
- a few green gooseberries beside a small glass jar of their pale green syrup
- a second, smaller bottle of nearly clear young brandy, label turned away

**One impossible detail:** a single fresh green tendril curls out of the chalk lump, as if the chalk itself were growing a vine.

**Must not appear:** text or legible labels, maps or flags, insects of any kind (no louse), rotting fruit, a second drink, flame or smoke, blackcurrants or anything purple (*Before the Room*'s cassis), cellar walls (*The First Guess*).

**Palette:** warm amber light falling out of deep shadow (the persona's dramatic contrast), chalk white, vine green, and one crimson note (Pantone 200 C, the persona colour) in the cloth under the glass.

**SCENE (paste-ready):** A heavy old-fashioned glass with one large clear ice cube, holding a pale amber stirred drink, lighter than straight cognac, no garnish, on a crimson cloth. Warm light falls from one side into deep shadow. Beside it: a grafted vine cutting with the join between young vine and rootstock clearly visible; a lump of white chalk; a small tight bunch of pale green wine grapes; a few green gooseberries next to a little glass jar of pale green syrup; a smaller bottle of nearly clear young brandy with its label turned away. One impossible detail: a single fresh green vine tendril curls out of the lump of chalk.

## Names

The person, not only the story: someone who changes things enough to save them and owns the trade.

- ***Worth the Trade*** (my pick): it says the save was worth it and doesn't pretend it was free. That's the Good Wizard's whole stance, and it never mentions grapes, magic or rescue.
- *The Right Call*: praises the decision, not the drink. Plainer.
- *New Roots*: rescue by transformation, in the vine's own terms. Closer to the story than the person.
- *Both Kept*: the saved thing and the one that made way, both in the glass. Quieter.

I could take *Still There* (Wren) or *On New Roots* (Hester). I hold *Worth the Trade* until round 4's vote.

Registry and pours grepped: none of the four names is taken, and "trade" appears in no name or closing line.
