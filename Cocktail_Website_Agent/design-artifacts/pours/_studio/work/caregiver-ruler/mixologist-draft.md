# Mixologist draft: The Nanny (caregiver-ruler), Tomás, v1.1 (round 5: Hester D1, D2, D3, D5; nothing in the drink changed)

Spec: `_studio/specs/caregiver-ruler.json`. Grog, measured by one jigger: one of rum, four of cold water, half each of lime and a demerara syrup with a spoon of sherry vinegar in it. No ice.

## Recipe

**Glass:** a plain tumbler or highball glass (about 300 ml), no ice. Chill the water, not the glass.
**Contains:** veto-free

| amount | item | note |
| --- | --- | --- |
| 1 jigger (45 ml) | navy-strength rum (57%; any navy-strength rum, 54.5% or stronger) | strong enough to still taste of rum at four to one |
| 4 jiggers (180 ml) | cold water, from the fridge | four to one: Vernon's measure, 1740 |
| ½ jigger (22.5 ml) | fresh lime juice | |
| ½ jigger (22.5 ml) | demerara and sherry vinegar syrup, homemade (below) | the sugar, with a little sharpness kept in it |
| | *for the syrup:* 200 g demerara sugar, 100 ml water, 30 ml sherry vinegar | makes about 250 ml, enough for ten |

## Method

1. Make the syrup ahead, an hour or a day before. Warm the sugar and water in a small pan, stirring, until the liquid turns clear. Don't let it boil. Take it off the heat, stir in the sherry vinegar, let it cool, and bottle it. It keeps in the fridge.
2. Put a jug of water in the fridge so it's properly cold.
3. Use the same jigger for everything. Pour one jigger of rum into the glass.
4. Add four jiggers of cold water.
5. Add half a jigger of lime juice and half a jigger of syrup, and stir a few times. No ice: as it melted, it would change the measure.

**closingLine:** *Four of water to one of rum. The lime and the sugar are theirs.*

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Highball family.** The *Codex* says "A Highball can be effervescent or still" (p. 201), and "a Highball is simply the combination of a spirit and some sort of mixer" (also p. 201). This one is still. **Core:** navy-strength rum. **Mixer:** cold water, four times the rum: Vernon's ratio (Hester F4, Oxford GROG pdf 951; SPIRITS IN THE MILITARY pdf 1868). **Balance:** lime and sugar, the allowance Vernon let the men buy (F5), in a Daiquiri's pairing. Oxford says this made it "effectively" punch (F5, pdf 1868–1869). **Seasoning:** sherry vinegar in the syrup. Everything is a whole or half jigger, so the proportions, and every number below, hold for any jigger size. It's written out at 45 ml. |
| Balance (Arnold; style `highball`, the lengthener is still water) | 270 ml, with no dilution, no ice and no melt. **Finished: 9.5% ABV, 6.69 g sugar per 100 ml, 0.57% acid.** Sugar and acid are in range (0–7, 0–0.6). They also sit inside the Collins sugar and acid bands (6–7.5, 0.55–0.95), the nearest still sour-and-long structure. **Strength is an EDGE, 0.5 under the highball floor of 10%. I'm keeping it on purpose:** the four to one is the rule this pour is about, and I won't strengthen it to reach a range. By my figures the *Codex*'s own Whisky Highball (p. 199: 2 oz scotch, 6 oz cold seltzer) sits at about 10%, taking the scotch at 40% and ignoring melt. It's cold, and there's nothing to melt, so it drinks at the strength it's poured. **Versions rejected:** the toddy sketches (round 1) were *Off Duty*'s rejected version (Hester), so the whole shape was dropped. Grog with plain demerara syrup at 15/15 ml: balanced but thin, 10.2% / 3.40 g / 0.32%, a ration more than a drink. The Collins style as run by `balance.py` adds a shake's dilution this drink never gets (8.8% / 6.18 / 0.53); only the undiluted figures apply. **Sweeps:** lime and syrup each 0.4–0.6 jigger: 9.2–9.8% / 5.4–8.0 g / 0.47–0.66%. Everything within a bar spoon of the recipe holds; a heavy hand with the syrup (0.6) goes sweet, at 7.9 g. **Rum strength:** 54.5% gives 9.1%, 57% gives 9.5%, 63% gives 10.5%, and an ordinary 40% rum gives 6.7%, too thin. Hence "54.5% or stronger". **Unsourced (flagged):** sherry vinegar at 7% acidity (my own knowledge of the Jerez minimum); demerara treated as table sugar, as *LI*'s own syrup values imply (61.9 against 61.5, pdf 140–141). |
| Pairings | **Classic:** rum, lime and sugar are grog as Vernon allowed it (F5), and the Daiquiri's own three. **The spark is sherry vinegar in the sugar.** The *Flavor Matrix*'s Sugar Syrup entry covers cane syrup, molasses, sorghum and maple syrup, not demerara sugar. It lists sherry vinegar among that family's **best pairings** (pdf 240: "Port wine, tamarind, sherry vinegar, apple, grain, orange"). Tamarind is *Overnight*'s. Orange and apple are ordinary beside lime. **Copy fence (Hester D3):** say sherry vinegar "goes with cane syrup and molasses, the sugars rum is made from", never that it "pairs with demerara". Demerara is my choice of a cane sugar that keeps some of its molasses flavour (my own knowledge, unsourced). Sherry vinegar is the one nobody expects in a glass. Vinegar is "the only common food acid that is aromatic" (*LI* p. 59, pdf 63), so it brings a smell as well as sharpness. At 2.7 ml a glass, it's about a sixth of the drink's acid. **Why it's in the sugar:** the sugar is the part of grog that was the men's to add, for their own taste. The syrup is made ahead by whoever holds the measure, and it has a little sharpness in its sweetness: care that doesn't only soothe. That's my reading, for Wren to keep or cut. The Nanny's measure stays untouched (rum and water only), so the spark can't blur the rule. Kept off lime-at-sea (Wren R2): the lime is Vernon's fact, and no lineage story is told about it. |
| Allergens | `allergens.py`: **veto-free** (AD-4 floor holds). Rum is distilled cane, so it touches nothing. **New rows (my call, safe side):** `rum_navy` (57%, contains none) and `demerara_sherry_vinegar_syrup` (cane sugar, water, wine vinegar; contains none: wine fining is ignored, STUDIO-RULES 4, and no bottle is named). **Flag for Robin:** sherry vinegar carries sulphites. We have no veto for them, so I'm naming it here rather than hiding it. |
| Makeable | Kit: a jigger, a small pan, a bottle for the syrup, a jug, a glass and a spoon. No shaker, no ice. Demerara sugar and sherry vinegar are both supermarket shelf items. Navy-strength rum is a style, not a named bottle; most well-stocked shops carry one. The syrup takes ten minutes and makes ten drinks. **Facts for the copy (Hester's fence, R2):** navy strength (54.5%) is an 1866 regulation (F11), so we never say Vernon's men drank rum this strong, and never "Vernon's recipe": ours is grog as a highball, with a syrup he never had. |

## Image brief

**SCENE:** A plain, heavy glass tumbler on a scrubbed pale wooden table, in cool, even morning light. The drink fills it about three-quarters: pale amber-gold, softly hazy from the lime, still, with no ice and no garnish. Beside it, in a neat row, stand a steel jigger, a clear glass jug of cold water beaded with condensation, and a small corked bottle of dark amber syrup without a label. A halved lime rests on a small board. Behind them, out of focus, a wall clock reads early morning. The one impossible detail: the water line in the jug sits exactly level with a fine line etched round the glass at a fifth of its height, as if the glass had been made for this measure.

- **Glass and drink:** a plain tumbler, no ice. The drink is **pale amber-gold and softly hazy**: dark rum at one in six, with fresh lime. It is never dark brown or clear. No garnish, no lime wheel, no sugar rim.
- **Props (four, story):** the jigger (one measure for everything; F4's ratio); the cold water jug (the rule was water, F1); the unlabelled syrup bottle (the allowance, made ahead, F5); the halved lime (the men's lime, F5).
- **Morning clock:** Wren's "there's any left in the morning". Keep it only if she keeps that line.
- **Must not appear:** ships, sailors, anchors, rope, the sea or anything naval (*Serviceable* and *Not Only the Way* have been to sea); a cask or barrel (reads as a rum brand); people or hands; children, cradles or nursery things (Wren: no parenthood assumed); a steaming mug or a teacup (*Off Duty*); ice; a second drink; readable text, labels or logos.
- **Palette:** the persona's deep red (7621 C) as one small accent (a cloth or the cork's band), muted orange (730 C) in the wood and the drink's warmth, soft green (370 C) only in the lime.

## Names

1. **Fair Measure** (my pick). It's the Nanny's whole move: not less, not none, but fair, and seen to be fair (F6). It's sayable across a bar ("A Fair Measure, please"), and it doesn't repeat Wren's tagline ("why it lasts"). A name that repeats the tagline spends the title block twice.
2. **Four to One.** Exact and a little mysterious, but it captions the drink more than the person.
3. **The Allowance.** The lime and the sugar, the part left to them. A little stiff out loud.
4. **Still There Tomorrow.** It's the person. Too long, and it leans on Wren's morning line.

Checked against `registry.py`: none of these names or the closing line is taken. **Sibling pages (grep):** *Rosetta* is also four parts water to one, with absinthe and syrup ("Ours is four to one plus syrup"), which is another reason against name 2. *Quite Alive*'s reading has "The care is in the measure, not the size." That's a reading line, not its name or motif, but Wren should check it against our y3–y5. *Full Measure* was a rejected name of mine in *Down the Line*.
