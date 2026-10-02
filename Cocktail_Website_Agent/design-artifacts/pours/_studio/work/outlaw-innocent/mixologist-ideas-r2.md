# Tomás, round 2: drink leads (no spec yet; story not ruled)

## The lever, credited exactly
- *A Proper Drink* p. 178: "every drink had its own sweetener" is **Camper English's** observation about Vogler's **Beretta** menu (2008), not Bar Agricole's and not Vogler's own words. Sweeteners he lists: Demerara syrup, honey, maple syrup, grenadine. "It's not just simple syrup."
- Same page, Erik Adkins on Vogler: "Everything had to have a sense of place and time and a link to agriculture."
- p. 177: he travels to France for Cognac, Armagnac and Calvados and buys full barrels, "eliminating the middle man".
- p. 179: Bar Agricole (2010) opened with "an Old-Fashioned stubbornly made with brandy"; his drinks "shy away from sweetness". (No recipe given for it on any page.)

## Lead: the Armagnac's own sweetener (Floc de Gascogne)
- Oxford FLOC DE GASCOGNE (pdf 818-819): a mistelle, grape juice in its first stage of fermentation mixed with Armagnac; both juice and Armagnac must come from the Armagnac production area, "often coming from the same property". 18-20% ABV. Name from Occitan "Lou Floc", "bouquet of flowers" (coined 1954). Served cool, "increasingly viewed as a cocktail enhancer".
- Shape: Codex root Old-Fashioned, built on cubed ice. The one change is the syrup: rich syrup made with white Floc in place of water (2 sugar : 1 Floc by weight/volume, i.e. 200 g sugar into 100 ml Floc, dissolved cold or barely warm so the Floc keeps its strength and scent).
- Why not Floc poured as a modifier: as the sole sweetener it would need ~118 ml against 45 ml Armagnac (13 g/100 ml, unsourced), i.e. a Floc drink. At 20 ml plus a little syrup (variant B) acid trips the built band (0.095% vs 0.05) and sugar sits low. And Armagnac + mistelle stirred is *The First Guess*'s shape (cognac + Pineau, Martini). So: in the syrup only.

## Scouting arithmetic (by hand, built: 24% fixed dilution; bands 27-32% / 6.5-8.5 g / <=0.05%)
| version | finished ABV | sugar g/100 ml | acid % |
| --- | --- | --- | --- |
| A: 60 Armagnac 40% + 7.5 Floc syrup + 2 dashes | 29.5 | 8.28-8.48 | 0.018 |
| A: same, Armagnac 43% | 31.6 (top edge) | 8.28-8.48 | 0.018 |
| A: same, Armagnac 46% | 33.7 (OUT) | 8.28-8.48 | 0.018 |
| B: 50 Armagnac + 20 Floc + 5 rich syrup | 25.6-28.8 | 5.68-6.74 | 0.095 (OUT) |

Floc sugar swept 10/13/15 g/100 ml (unsourced; Pineau's row uses 13), acid 0.45% (unsourced). Sugar near the top edge: the spec will likely dose 6-6.5 ml, or 50 ml Armagnac, and sweep the Armagnac's strength (40-46%) to set a ceiling. Run through `balance.py` once the story is ruled.

## Flags
- **Sibling:** *The First Guess* (innocent-explorer) reads Pineau as grape juice "stopped with young cognac ... before it could become wine". That line is the tempting mirror for this person ("refusing to become") and it's theirs: our reading may not use it. Our claim is "its own sweetener": same grapes, same place.
- **Makeable:** Floc is mostly sold locally (Oxford: a third at the cellar door, a third in French shops). Hester: is white Floc buyable abroad? Substitute style if not: white Pineau des Charentes (its cognac sibling), with the "own" meaning owned as lost.
- **Hester:** a page for Floc's sugar (an AOC minimum, as Pineau's 120 g/L) would turn the unsourced 13 g into a floor.
- **Vetoes:** Armagnac, Floc (grape must + grape spirit), sugar, aromatic bitters, lemon peel: expected veto-free (fining ignored). Floc needs a table row.
- **Registry:** honey set aside (two siblings own it: *Brought Home*'s local honey, *Any Day*'s honey for sugar). Caramel syrup is *Nothing to It*'s. Floc is in no pour.
