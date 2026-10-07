# Tomás, drink v1: The Bad Influence (lover-outlaw)

Round 2, 2026-10-04; round 3: Hester's r2 scopes landed (measures mine, no "original"); round 4 step 1: Hester T1–T3 (T3 already in since r3), Wren's closing line. Spec: `_studio/specs/lover-outlaw.json`. Story: Employees Only, New York, 2004 (*A Proper Drink* pp. 155–157; Wren r1 accepted the plan's lead with conditions).

**The drink in one line:** a rye Manhattan with the curaçao Employees Only put in theirs (Oxford COCKTAIL VARIATION pdf 533), and one change of mine: the sweet vermouth is steeped with raw beetroot, made by hand the day before. Slicing the beet marks your fingers red. That's the "hand in it" Wren asked for: something the guest makes themselves, that leaves a mark on whoever made it (the sheet's driver: *leave a mark*).

**Glassware:** coupe (about 180 ml), chilled. Employees Only "used coupes" (Proper p. 157).
**Contains:** veto-free.

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | straight rye whiskey | any straight rye; proved from 40% to 50% |
| 30 ml | beetroot sweet vermouth | sweet vermouth steeped with raw beetroot (below); the change I made |
| 7.5 ml | orange curaçao, dry style | Employees Only's Manhattan adds curaçao; the measure is mine |
| 2 dashes | Angostura bitters | |
| 1 strip | orange peel | |

**Beetroot sweet vermouth (makes enough for eight):** 50 g peeled raw beetroot, thinly sliced, in 250 ml sweet vermouth. Cover and leave at room temperature for about 12 hours, then strain and keep it in the fridge.

## Method

1. Peel and slice the beetroot with your bare hands. Your fingers will go red. Leave them.
2. Steep the slices in the sweet vermouth for about 12 hours, covered, then strain. It keeps in the fridge.
3. Put a coupe in the freezer.
4. Pour the rye, the beetroot vermouth, the curaçao and the bitters into a mixing glass or a jar.
5. Fill it with ice and stir for about 30 seconds, until the outside of the glass is very cold.
6. Strain into the cold coupe.
7. Squeeze the orange peel over the top so its oils fall on the drink, then drop it in.

**closingLine:** *Slice the beetroot yourself and leave the red on. Then ask someone to something dull, and keep whoever comes.*

(v2, round 4: Wren's wording, taken. My v1 second half repeated her y5. Grepped: "something dull", "keep whoever" and "leave the red" are in no pour or registry row. It doesn't claim the stain lasts.)

## Checks

| check | result |
| --- | --- |
| **Structure** | *Codex* Martini family, a Manhattan: core rye (60 ml), balance beetroot sweet vermouth (30 ml, the 2:1 of LI's Manhattan with Rye, p. 130: 60 rye / 26.66 vermouth), seasoning curaçao and Angostura. **Every measure is mine:** no library page gives Employees Only's Manhattan measures (Hester r2), so the copy never says "their recipe" or "the original"; it may say only that the bar's Manhattan adds curaçao (Oxford pdf 533). The curaçao is also part of the sugar: without it the finished drink falls to 3.45 g/100 ml, under Arnold's 3.7 floor, so it stays. |
| **Balance** (`balance.py`, style stirred) | 99.1 ml → 44.6% dilution → 143.3 ml. Start 38.6% / 6.50 g / 0.166%; finish **26.7% / 4.50 g / 0.115%**. All seven in range (finish bands 21–29%, 3.7–5.6 g, 0.10–0.14%). |
| **Sweep** (`sweep.py`, all in range unless said) | Rye 40% → 22.9%; rye 46% → 25.1%. Beet vermouth at 14%/14 g → 26.5%/4.29 g; at 16.5%/17 g → 27.0%/4.91 g; unsteeped vermouth → 27.0%/4.70 g/0.126% (so the beet changes the taste, not the balance). Curaçao 5 ml → 4.17 g; 10 ml → 4.81 g; curaçao sugar 20–35 g → 4.24–5.02 g; a 30% curaçao at 35 g → 5.03 g. Worst corner (50% rye, sweet vermouth, 35 g curaçao) → 5.43 g, in range. **Rejected:** vermouth cut to 22.5 ml → finished acid 0.093%, OUT (the stirred bands need the vermouth's acid; same lesson as the Hanky Panky). |
| **Pairings** | *Flavor Matrix* GRAPE (pdf 140) lists beet among grape's surprising pairings; the vermouth is the drink's grape, so that's where the beet goes, never in the rye. The page lists the pairing; it doesn't describe the taste, so the copy shouldn't either. My own call (unsourced): beetroot's earthy sweetness sits under the rye's spice, and orange is a familiar partner for beetroot in the kitchen. Steep time after *Codex* p. 95 (low-proof vermouth infuses slowly; their 20% St-Germain gets about 12 hours). Employees Only "played with infusions" (Proper p. 157), so an infusion is in the house's character, though no page says they made this one. **Considered and set aside:** Grain's surprising passion fruit (pdf 136) is *Standing By*'s, a sibling; chamomile is in four pours; the stone-fruit page's soy sauce (pdf 236) is salty and savoury, which Wren ruled out (no soup, no salt); a shaken Manhattan (Employees Only's drinks were "largely… shaken", Oxford pdf 721) fails Arnold's own test: "booze won't hold texture when shaken" (LI p. 92). |
| **Allergens** (`allergens.py`) | `contains: []`, **veto-free** (keeps the AD-4 floor). New row `sweet_vermouth_beet` added by me: beetroot is not a nut, grain, dairy, egg or heat, so none. Curaçao row: brandy-based, none. |
| **Makeable** | Basic kit: knife, board, a jar with a lid, a sieve, a mixing glass or jar, a bar spoon, a strainer. No named bottles: any straight rye, any sweet vermouth, any dry-style orange curaçao. The beetroot row's numbers are my estimate (unsourced): the slices drink some vermouth and give back beet water, so I model ~15% and ~15 g, and the sweep covers 14–16.5% and 14–17 g. |
| **Siblings** | *Out of Your Way* (the Knight) is 60 ml red Bordeaux with 30 ml rye, at room temperature, in a red wine glass: half wine, no vermouth, no ice, no curaçao. This is a cold, stirred, rye-led Manhattan. The closer drink is *Up Close* (ruler-lover, another family): a rye Manhattan with pineapple in a stemmed cocktail glass. Ours differs in the curaçao, the beetroot vermouth and the coupe. Martini · rye · coupe is in no registry row. No pour uses beetroot (*Say So* set a beet vermouth aside, as pink). |
| **Colour** | Unsourced, my estimate: beetroot's red going into an already red-brown sweet vermouth should read as a deep garnet, darker than a usual Manhattan, and clear (stirred). Not pink. Hester can't source this for a homemade steep, so the reading shouldn't name the colour; the image brief does, flagged. |

## Image brief

- **Glass and drink:** a chilled coupe, slightly frosted, filled with a clear, deep garnet-red stirred drink (darker than a usual Manhattan; my estimate, unsourced), a strip of orange peel resting in it. No ice in the glass.
- **Props (3–5):** a raw beetroot, half sliced, on a scarred wooden board, the knife beside it, its juice bleeding into the grain; a stoppered jar of the strained red vermouth; red fingerprints on the coupe's foot and stem; the cuff of a white jacket at the frame's edge (Employees Only's bartenders wore white chef's jackets, Proper p. 156); the curved edge of a dark bar top (their bar's undulating design, p. 155).
- **One impossible detail:** the red fingerprints on the stem are from two different hands, overlapping, though only one person could have held it.
- **Must not appear:** soup or a bowl, water, the sea or a pool, stage microphones or guitars, crowds, coats, house lights coming up, a clock, a second drink, any text.
- **Palette:** deep wine (Pantone 7426 C), beetroot red, the white cuff, warm low tungsten light with hard contrast; a little grit.

**SCENE:** A chilled coupe on the curved edge of a dark, worn bar, holding a clear, deep garnet-red stirred drink with a strip of orange peel resting in it. Beside it, a raw beetroot half sliced on a scarred wooden board, its red juice running into the grain, the knife still there, and a stoppered jar of red vermouth. Red fingerprints mark the coupe's foot and stem. At the edge of the frame, the cuff of a white jacket. The impossible detail: the fingerprints on the stem come from two different hands, overlapping, as if two people had held it at once. Warm, low, hard-contrast light; deep wine and beetroot red.

## Names

- **My pick (held to the vote): *Red-Handed*.** Caught in the act, together, and the beetroot's mark is real. Grepped: no pour's name, tagline, epigraph or closing line; the phrase appears once, in *Why Not?*'s resonance notes (explorer-jester), not in its copy.
- Also: *Caught in It* · *Bad Company* (Wren's; I could take it, if Hester clears the band).
- I could take *Accomplices*. One flag on my own pick: "red-handed" means being caught doing wrong; Wren decides whether that reads as fond for this person.
