# Tomás, outlaw-explorer: working notes (round 2, PROVISIONAL, no spec until the story is verified)

## Gesture withdrawn
Plan's "taste it first" gesture (from Kirke's "testing it first wouldn't have been particularly dangerous") is dropped as the drink's gesture. Under Wren's r1 read, a bartender telling the guest to test first is the padded voice. Kirke's line stays his, in the reading only.

## Spark lead (for Wren to rule)
- Cynar, artichoke-based: Oxford FLOC DE GASCOGNE pdf 822 ("artichoke-based amari like Cynar").
- Codex p. 260: Cynar "has a reputation as being extremely bitter" but "falls somewhere between" the light and the dense amari; vegetal, earthy, eucalyptus, long bitter finish.
- Flavor Matrix pdf 32 (ARTICHOKE): Surprise Pairings "Plum, yogurt, sesame, cilantro". The entry is about the vegetable (cooked artichoke), not Cynar: scope the claim that way.
- Sloe is a Prunus (blackthorn, Prunus spinosa: Oxford PRUNELLE pdf 1573); Matrix stone-fruit entry covers Prunus drupes incl. plums (pdf 236). So: "artichoke and plum, a surprise pairing; the sloe is the plum's wild cousin" (my bridge, scoped).
- Tie for the reading (Wren's call): the bottle with the frightening reputation is the friendliest bitter on the shelf; artichoke in a cocktail sounds like a dare, and it makes the drink. Point 4 (danger turned into a game). Risk: could read as "the danger was smaller than it looked", shrinking the guest's choice.
- Not used: Matrix stone fruit surprise pairings beer (gluten), sage (A Brother's Care's leaf), soy sauce (wheat = gluten); best pairings basil and lemongrass already in the registry.
- Considered and dropped: blackthorn as the hedge that fences them in. Oxford pdf 1537's hedgerow line is about damsons, not sloes. Unsourced for sloe.
- Book lead (no spark needed): Imbibe! pdf 96, 1890s Blackthorn Sours "with sloe gin, pineapple syrup, and a splash of apricot liqueur".

## Table rows added (Tomás, 2026-10-01)
- `sloe_gin`: 26% (label of the common British style, unsourced), sugar ~20 g/100 ml (back-calculated from LI p. 131 Blackthorn), acid 0.5% unsourced. Veto-free: berries steeped whole, stones not crushed (unsourced, usual method). Goes to `nuts` if a named bottle cracks its stones (as maraschino, Codex p. 174).
- `cynar`: 16.5% (label, unsourced), sugar ~18 g/100 ml unsourced, veto-free (as Campari).

## Numbers (style `shaken`, provisional)
| version | finished | verdict |
| --- | --- | --- |
| A 30 sloe / 30 gin 47% / 22.5 lemon / 15 syrup | 14.8% / 10.55 g / 1.015% | OUT (sugar, acid) |
| D 30/30/22.5 + 7.5 syrup + 7.5 Cynar | 15.5% / 8.27 g / 1.007% | OUT (acid) |
| K 45 sloe / 30 gin / 22.5 lemon / 7.5 syrup, no Cynar | 16.0% / 8.66 g / 0.976% | OUT (initial acid 1.50) |
| **H 45 sloe / 30 gin 47% / 20 lemon / 7.5 Cynar, no syrup** | **17.0% / 6.70 g / 0.895%** | **all in range** |
| L 45 / 30 / 22.5 lemon / 15 Cynar | 16.3% / 6.95 g / 0.908% | balanced |
| J as H, gin 40%, + 5 syrup | 15.2% / 8.40 g / 0.871% | balanced |
| G 30/30 gin 40% / 22.5 / 11.25 syrup / 7.5 Cynar | 13.9% / 9.65 g / 0.989% | OUT |

Lesson: sloe gin is the syrup. A sloe sour with the usual syrup goes OUT on sugar; it needs little or no syrup and ~20 ml lemon. A 40% gin pulls strength to the floor.
To do before the spec: sweep sloe gin sugar (15-30 g/100 ml) and strength (20-30%), and gin strength (40-47%); the sugar estimate decides whether a bottle gets named.
Allergens (H): veto-free.

## Round 3: sweep of spec H (`_studio/specs/outlaw-explorer.json`, provisional)
45 sloe gin / 30 London dry gin / 20 lemon / 7.5 Cynar, no syrup, shaken, coupe. 48 cases, not one OUT:
- sloe gin sugar 15 / 20 / 25 / 30 g per 100 ml x strength 20 / 26 / 30% x gin 47 / 40%: finished 14.4-17.9% ABV, 5.24-9.82 g, 0.886-0.922% acid.
- Edges only: sugar at 30 g/100 ml (9.43-9.82 g finished, top edge); strength at a 20% sloe gin with a 40% gin (14.4%, dilution 50.7%).
- With 37.5 ml of a 40% gin: 15.1-16.4%, all balanced or edge.
- Cynar at 15 ml goes OUT at 30 g sloe sugar (initial 13.6+): keep it at 7.5 ml.
Result: no bottle needs naming for balance. Substitute rule: a traditional British sloe gin of 25% or more; any London dry gin of 40% or more. Allergens: veto-free.
