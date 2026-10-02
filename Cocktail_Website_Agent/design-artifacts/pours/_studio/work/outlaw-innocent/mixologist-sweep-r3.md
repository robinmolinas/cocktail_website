# Tomás, round 3: spec v1 sweep (held until a new story is ruled)

Spec: `_studio/specs/outlaw-innocent.json`. Style `built` (made in the glass on ordinary cubes, stirred there; Arnold's spirit-on-a-rock: 24% dilution, 27-32% / 6.5-8.5 g / <=0.05%).

**v1:** 60 ml Armagnac (40%) · 10 ml (2 tsp) Floc syrup, 1:1 (100 g white sugar stirred into 100 ml white Floc de Gascogne, no heat, ~162 ml) · 2 dashes aromatic bitters (Angostura row) · lemon peel. `balance.py`: **29.1% / 7.94 g / 0.032%, balanced.** `allergens.py`: contains [] (veto-free; AD-4 floor holds). Each drink carries ~6 ml of Floc (10 x 100/162).

Why 1:1, not 2:1: a 2:1 syrup at 7.5 ml (29.5 / 8.40, balanced) carries only ~3 ml of Floc per drink; 1:1 doubles it at the same sugar. Floc poured straight as a modifier was rejected in r2 (acid OUT at 20 ml; ~118 ml as sole sweetener; and it's *The First Guess*'s shape).

## Strength ceiling (Wren r3)
| Armagnac | as written (60 ml) | with the water rule |
| --- | --- | --- |
| 40% | 29.1, in range | - |
| 43% | 31.1, in range | - |
| 45% | 32.5, edge | 57.3 + 2.7 ml water: 31.1, in range |
| 46% | ~33.2, OUT (2:1 sweep 33.7) | - |
| 48% | OUT | 53.8 + 6.2 ml water: 31.1 |
| 52% | OUT | 49.6 + 10.4 ml water: 31.1 |
| 56% | OUT | 46.1 + 13.9 ml water: 31.1 |

**Rule:** Armagnac of 40-43%: pour 60 ml. Stronger (cask-strength bottles, often 45-56%; unsourced): Armagnac + cold water = 60 ml, with the Armagnac at 2,580 / its ABV ml (60 x 43 / ABV). Sugar and acid don't move (7.94 / 0.032). Proven to 56%.

## Syrup dose
| syrup | sugar | verdict |
| --- | --- | --- |
| 7.5 ml | 6.19 | edge (low) |
| 10 ml | 7.94 | in range (Arnold's ~7.6) |
| 12.5 ml | 9.57 | OUT |
Floc sugar unsourced: swept 8 / 13 / 18 g/100 ml -> 7.58 / 7.93 / 8.28 g finished, all in range. Floc ABV 18-20% (Oxford pdf 818) moves the finish by <0.2%.

## Melt (cubed ice; balance.py fixes 24%)
15% melt: 31.4% / 8.56 g (sugar just over; 43% Armagnac 33.6% OUT) · 30% melt: 27.8% / 7.57 g. Ordinary cubes melt more than one big cube, so the low-melt case is unlikely; stated, not hidden.

## Pineau fallback
White Pineau des Charentes syrup, 1:1: identical numbers at every row above (Pineau 17.5% vs Floc 18%). If used, the "same grapes, same place" claim is lost (cognac's region, not Armagnac's): say so in Makeable, and the reading can't use it.

## Rows added (all `none`, my call)
armagnac (40%), armagnac_43/45/46/48/52/56 (sweep), floc_de_gascogne_blanc (18%; sugar 13 and acid 0.45 unsourced, set as Pineau's), floc_rich_syrup and pineau_rich_syrup (2:1, rejected), floc_syrup_1to1, pineau_syrup_1to1.

## For the new story
Library check on Wren's baco thread: Oxford ARMAGNAC pdf 139 says only that baco blanc (once baco 22A; folle blanche x Noah) is "the only hybrid grape" allowed in the French AOC system, very high acid, best after 10-12 years. No page in the library on any removal or growers' fight: web, Hester's. If it runs, the drink can name the style "a Bas-Armagnac with a high share of baco" (no brand) and the water rule covers cask strength.
