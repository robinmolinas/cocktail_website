# Mixologist draft: The Campaigner (caregiver-outlaw), v4, Tomás round 6 (Checks wording per Hester's re-run)

Spec: `_studio/specs/caregiver-outlaw.json` (v4). History: v1 was a daiquiri on Indian rum (round 2). v2 was a gin Tom Collins on jaggery syrup (round 3). v3 went back to the Indian-rum daiquiri on a rich syrup (round 4). **v4 is v2 restored**, now on Hester's sourced sugar figure and with the allergens corrected to her F20. This is the drink reading v1 describes.

## Recipe

**Glassware:** tall (Collins) glass, chilled, filled with ice
**Contains:** dairy, nuts

| amount | item | note |
| --- | --- | --- |
| 60 ml | London dry gin, 43% or stronger | |
| 30 ml | fresh lemon juice | |
| 25 ml | jaggery syrup (homemade) | the swap: an Indian cane sugar, made the old unrefined way, in place of white sugar |
| 50 ml | soda water, very cold | poured into the glass first |
| 1 strip | orange peel | |

## Method

1. Make the syrup ahead. Grate or finely chop 100 g cane jaggery (sold in blocks as gur in Indian grocers), stir it into 100 ml warm water until it dissolves, and let it cool. Keep it in the fridge.
2. Chill a tall glass and pour the cold soda water into it.
3. Shake the gin, lemon juice and jaggery syrup with ice for about five seconds, just long enough to chill them.
4. Strain into the glass on top of the soda (the pour mixes it, so there's no need to stir), then fill the glass with ice.
5. Squeeze the orange peel over the top so its oils fall on the drink, then drop it in.

No shaker? A jar with a tight lid does the same job.

**closingLine:** *Make it with the sugar you swapped. Then count the ones you've already won.*

## Checks

| check | result |
| --- | --- |
| Structure | *Cocktail Codex* Daiquiri family, Collins subfamily ("a sour served in a tall glass with ice and seltzer", p. 138). Core: London dry gin. Balance: lemon, jaggery syrup. Seasoning: orange oil. It's built on the Codex's Tom Collins (p. 138: 60 ml seltzer, 60 gin, 30 lemon, 22.5 simple; orange half wheel and brandied cherry). **The swap is the sugar.** The other changes follow from it: 25 ml of syrup, because jaggery carries less sugar than white sugar; 50 ml of soda, to keep the strength up; and an orange peel in place of the wheel and cherry. So nothing may say "only one change" (Hester's fence). |
| Balance | `balance.py`, style `collins`, soda as stage `top`: finished 14.6% abv (range 12.5–15.0), sugar 6.96 g/100 ml (6.0–7.5), acid 0.93% (0.55–0.95). **Balanced**, every figure in range. **Sugar figure sourced:** Hirpara et al. 2020, Table 1 (F19) gives 65–85 g sucrose plus 9–15 g reducing sugars per 100 g of jaggery. Hester's hand calculation for a 1:1 syrup is about 47–57 g/100 ml; the row uses 52. **Sweep** (gin 40/43/47% × jaggery 47/52/58 g × syrup 22.5/25 ml × soda 45/50 ml): at 25 ml and 50 ml it stays balanced throughout, with a sugar edge from about 57 g (7.60 vs 7.5; 7.73 at 58 g), the top of Hester's sourced range; still an edge, never OUT. At 40% gin the strength edges to 12.4 against a 12.5 floor, so the recipe asks for 43% or stronger. **Rejected:** soda 45 ml (OUT on sugar at 58 g); soda 60 ml (OUT on strength); syrup 27.5 ml (OUT on sugar); v3's rum daiquiri (balanced, withdrawn on story). |
| Pairings | *Flavor Matrix* pdf 240 (Sugar Syrup: cane syrup, molasses…): "deep, roasted notes", "a more flavorful alternative to plain sugar". Its best pairings include grain (the gin's base) and orange (the peel). Oxford pdf 1946 says brown-sugar syrups "pair best with dark spirits". I weighed that and set it aside: it's a preference, and the story here is her one swap, the sugar, not the spirit. Tamarind (a Matrix best pairing) was also set aside, because it would add a second idea. |
| Allergens | `allergens.py`: **dairy, nuts**, both from the jaggery syrup. Nuts: makers clarify jaggery with chemicals or, for organic jaggery, with plant extracts including **groundnut** and soybean (Hirpara et al. 2020, F20). Groundnut counts as nuts on the safe side. Soy has no veto in the studio's list. Dairy: some traditional makers clarify with milk (my own knowledge, unsourced, and not in F20's list). I've kept it on the safe side until a source rules it out. **No label clears this:** a vegan label still allows groundnut, and each maker picks its own clarifier, so a generic block can't be veto-free on the page (v3's "labelled vegan" route withdrawn; the `jaggery_syrup_labelled` row deleted). The pour is **not veto-free**. The family's AD-4 floor holds: six of the seven sibling specs are veto-free on `allergens.py`. Gin, lemon, soda, orange peel: none. |
| Makeable | Basic kit: a shaker or a jar, a strainer, a jigger. Generic styles only, no named bottle. Jaggery is sold as gur in Indian grocers and many supermarkets; the syrup is a two-minute stir. The gin needs to be 43% or stronger (many London drys are). |

## Image brief

- **Glass:** a tall, straight-sided Collins glass, full of clear ice cubes to the rim.
- **Drink:** pale gold to light amber (the jaggery tints it; not brown, not cloudy), lively with fine bubbles rising.
- **Garnish:** one strip of orange peel, curled down inside the glass against the ice.
- **Beside it:** a broken block of golden-brown cane jaggery, rough and matte, with a few grated crumbs on a wooden kitchen table. A small blue glass sugar bowl, empty, with gilt lettering that is **not legible** (the V&A type, c. 1820–30, F17: shown only as a blue glass bowl with gold letters).
- **Not in the frame:** no pamphlet (Wren left her missing name out of the reading), no readable slogans or inscriptions, no protest signs, no "slave-free" or East/West India labels, no rum, no demerara.
- **Light:** warm daylight on a kitchen table, not a bar.

## Names

| name | why |
| --- | --- |
| **Not Too Polite** (pick, all three) | her charge against her own side ("a great deal too much politeness", F12). It's what the Campaigner is, said kindly, and a bartender can say it out loud. |
| It Can Do Wonders | her answer to "what can a few families do?" (F7) |
| Twopence | the pamphlet's price (F3): a small thing that travelled |
| A Few Families | her own words (F7), Wren's pick for the runner-up |
