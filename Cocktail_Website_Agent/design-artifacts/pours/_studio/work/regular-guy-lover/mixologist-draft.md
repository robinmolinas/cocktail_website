# Mixologist draft: regular-guy-lover (The One Next Door), v2

Tomás, round 4. Spec: `_studio/specs/regular-guy-lover.json` (v2).

The Cohasset Punch the way the regulars had it at the bar (Oxford COHASSET PUNCH pdf 549–550), cut to three-quarters for an ordinary coupe. **No Matrix spark** (Wren's ruling, round 3; I concede, see Checks). What makes it this guest's is the bar's own difference from the printed recipe: a slice of peach the guest soaks in brandy at home, days ahead. I'm claiming **Oxford's stirred coupe, not Lowe's shaved ice.** Lowe's is a printed recipe, and the story is that the regulars put the bar's version above the printed one and the bottled one (pdf 549). Oxford's spec follows the bar: stirred, at length, with a peach soaked in brandy. I've left out Lowe's "preserved peach and its liquor". Pouring in the can's syrup waters the drink down (probe: 16.2% at 212 ml for the full size).

**Glassware:** coupe (about 200 ml), chilled
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | amber rum | an aged rum made from molasses, the kind New England once made |
| 45 ml | sweet (red) vermouth | half the drink, and most of its sweetness |
| about a third of a lemon | fresh lemon, cut into small pieces | pressed in the glass for its juice and the oil in its peel |
| ¾ teaspoon (3.75 ml) | rich sugar syrup (2 parts sugar to 1 part water, by weight) | |
| 1 dash | orange bitters | |
| 1 slice | brandied peach | an eighth of a peach, soaked in brandy for a few days until soft right through |

## Method

1. A few days ahead (at least a night; they keep a week in the fridge): cut a ripe peach, or drained canned peach halves, into eighths. Put the slices in a clean jar, cover them with brandy, add a spoonful of sugar syrup (or of the can's syrup), put the lid on and leave them in the fridge until they're soft right through.
2. Put a coupe in the freezer.
3. Cut about a third of a lemon into small pieces and press them hard in the bottom of a mixing glass or jar with a muddler (the end of a rolling pin works), so they give up their juice and the oil in the peel.
4. Add the rum, the vermouth, the sugar syrup and the bitters.
5. Fill the glass with ice and stir for a long time, a full minute. Stirring keeps the drink round and smooth. Shaking would make it frothy.
6. Lift a peach slice out of the jar and put it in the bottom of the cold coupe. Pour the drink over it through the strainer and a tea strainer, to catch the bits of lemon.

**closingLine:** *Give the peach its few days in the brandy. And the next time you want to be chosen, let it show.*

## Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Daiquiri family (a sour), stirred on purpose.** Spirit, citrus and sugar, but the sweet vermouth does two jobs: it's half the core and it brings most of the sugar (my reading of the structure). The family plan filed it under Martini. My numbers caught me there: the acid is a sour's (below). Oxford calls vermouth with citrus "relatively rare" and names this drink as one of the few (MODERN VERMOUTH pdf 2096). Seasoning: orange bitters, and the brandied peach. |
| Balance (Arnold; judged by hand, spec style `freeform`) | **No style in `balance.py` fits a stirred drink with sour-level citrus.** Run as `stirred`, all seven are OUT (finished 17.5% ABV / 7.30 g sugar per 100 ml / 0.693% acid, dilution 37.5%, 147 ml), because the stirred ranges assume no citrus. Run as `shaken`, strength, sugar and dilution are in range and the acid is just under (0.62% against 0.76–0.94). **My reference is Arnold's own stirred lemon drink**, the Schokozitrone (LI p. 209: stirred, 15 ml lemon, 19.2% / 7.4 g / 0.70%, sugar-to-acid about 10.6). Ours at the stirred dilution is 17.5% / 7.30 g / 0.693%, sugar-to-acid 10.5: the same balance, a little lighter because vermouth is half the base. **Sweeps:** lemon yield 10–15 ml gives 17.9 / 7.42 / 0.60 to 17.2 / 7.17 / 0.78 (all near the reference). "At length": Arnold stirs his briefly, so I added 5 and 10 points of extra melt by hand: 16.9 / 7.04 / 0.669 (153 ml) and 16.3 / 6.80 / 0.646 (158 ml). It still fits a 200 ml coupe and stays inside the shaken bands for strength and sugar. A 46% rum gives about 19.1 / 7.2 / 0.69 (v1 sweep; the soy drops moved nothing measurable). **Sugar:** at Oxford's full dose scaled (5 ml at 45/45) it's 8.1 g with a ratio of 13.6, too sweet beside the reference, so ¾ teaspoon is Oxford's 5 ml at three-quarters (pdf 550: 60/60/5). **Not counted:** the brandy the peach slice carries into the glass. My estimate (unsourced) is a few millilitres, about +0.5% ABV. Oxford's full size (60/60/5/15) runs 17.7 / 7.37 / 0.65 at 194 ml, which is why it calls for a *large* coupe. |
| Pairings | **The classic, kept:** rum, sweet vermouth and lemon with a peach, Oxford pdf 549–550. **The Matrix was consulted and set aside.** The drink is already the *Flavor Matrix*'s peach in a glass: the stone-fruit page's Best Pairings include "citrus", "fruit brandy" and "wine" (pdf 236), here the lemon, the brandy-soaked peach and the vermouth. Its Surprise Pairings ("beer, sage, soy sauce") were each ruled out: sage is *A Brother's Care*'s leaf, beer is *Is It Just Me*'s, and soy sauce was my v1 lead. **Why I conceded the soy (Wren, round 3):** this person's deepest fear is exclusion, and the gluten flag would turn guests away at the veto. A brown kitchen bottle beside the regular's remembered "brown bottle" would read as our answer to the legend. And it made them secretly sophisticated. The first reason convinced me. The second I'd already guarded against, and she's right that a guest wouldn't read the guard. The lemongrass fallback gave the guest nothing they'd feel, so it's out too. **What makes it interesting instead (Robin 2026-09-30):** the bar's own difference from the printed recipe, the peach eighth soaked in brandy until soft (pdf 549), made by the guest days ahead. The printed recipe's peach "was usually interpreted as half a canned peach". The spoonful of syrup is my own departure from the bar's: Oxford says "brandy and some liqueur", but names no liqueur, so I use a spoonful of syrup. The reading never calls it the bar's recipe. |
| Allergens | `allergens.py` on the spec: **veto-free** (counts toward the AD-4 floor); `--check ""`: declared contains matches. `brandied_peach` (added round 3): peach flesh only, no kernel, so veto-free, my call, as with crème de pêche in *Left Standing*. Rum and brandy are distilled; vermouth fining is ignored (rule 4). Orange bitters: no veto in the table. The `soy_sauce` row I added in round 3 stays in the table (gluten, on the safe side) but isn't in this drink. |
| Makeable | Kit: mixing glass or jar, muddler (or a rolling pin), bar spoon, strainer, tea strainer, jigger, teaspoon, coupe, a jar for the peaches. Bottles: amber rum (style, no named bottle; Lawrence's Medford rum was aged until "high flavored, ripe and mellow", an 1881 description, RUM, MEDFORD pdf 1699; that's a style guide here, not a claim about any modern bottle), sweet vermouth, brandy (any), a ripe peach or canned peaches, a lemon, orange bitters. Soaking the peach a few days ahead is the only planning. Nothing niche. |
| Distinct | *Left Standing* puts a spoon of crème de pêche in a stirred tequila Martini. Ours is fruit in the glass, a rum sour stirred with lemon: a different drink. In this family, *Got You* (the Prankster) is also a Chicago drink in a chilled coupe and a Daiquiri-family sour, but it's built on Malört and grapefruit and shaken to slush, with a pinch of salt: a different drink. The reading should keep Chicago from becoming the shared note. Registry rum pours (*Four Shares*, *Overnight*, *In a Minute* and others) don't overlap. Closing line (v3, round 5): no "plan" or "fallback" (Wren: they are the reading's this-is-me line, and "plan A" is in the tagline), no "gracious" (y5 already says it), no "let them see" (y5). "Let it show" and "want to be chosen" appear in no pour file ("keep it to yourself", my first try, is in *A Brother's Care*'s whoYouAre). I avoided the "X ahead." opening because *Got You* (this family) closes "Freeze the grapefruit hours ahead" and another pour "Make it a day ahead". The gesture is the peach's days in brandy, not *Overnight*'s "leave it overnight" (tea in the rum) or *Four Shares*' night-before oleo. |

## Image brief

**Glass and drink:** a chilled coupe, about three-quarters full. The drink is amber-red from the red vermouth and the amber rum, and slightly hazy from the pressed lemon (my description from the bottles' colour names; no source gives the colour of this drink). One soft slice of brandied peach rests at the bottom of the bowl, deep orange-gold, seen through the drink. No ice in the glass, no peel on the rim.

**Props (story in objects):**
- an open glass jar of brandied peach slices beside the glass, the lid off and a fork resting on it (the bar's soaked peach, made at home days ahead)
- a mixing glass with melting ice and a long spoon still standing in it (stirred, at length)
- a cut lemon, a third of it gone, on a small wooden board
- a window behind, at dusk, onto a quiet neighbourhood street with a warm porch light across the way

**One impossible detail:** a small lighthouse-shaped neon glow in a window across the street, no letters on it, whose beam falls only on this one glass.

**Must not appear:** people or hands; any text or lettering (the real sign said "Home of Cohasset Punch": shape only, never words); a keg, telegram or summer house (the origin is told in rival versions); any demolition, rubble or crane; a second drink; shaved or crushed ice; a labelled bottle; a brown bottle of any kind (the regular's dash stays a memory); a peach tin (the soaked peach is the point); anything seductive or romantic (candles for two, roses).

**Palette:** the persona's own: soft yellow, light peach, pale green, warm and gentle. The peach in the glass is the one strong colour.

**SCENE (ready to paste):** A chilled coupe of amber-red, slightly hazy cocktail stands on a wooden kitchen counter by a window at dusk, one soft slice of orange-gold brandied peach resting at the bottom of the glass. Beside it, an open glass jar of peach slices in brandy with a fork across its rim, a mixing glass of melting ice with a long bar spoon still standing in it, and a cut lemon with a third gone on a small board. Through the window, a quiet neighbourhood street, a warm porch light across the way, and in a window opposite, a small wordless neon lighthouse whose beam falls on this one glass and nothing else. Soft yellow, light peach and pale green light; homely, warm, unhurried.

## Names

Names are the room's. **Final pick: First Choice** (Wren, Hester and Tomás, round 5).

- **First Choice** (the room's pick). It's the plainest word for this person's want. The tagline now ends "someone's plan A", so the title block no longer says it twice, which was my one condition.
- **Sent For** (my round 3–4 pick, withdrawn). Wren's reason convinced me: for this guest, being sent for is the wound, the "free tonight?" text that comes when other plans fall through. Hester's reason adds that it rests on the keg, which is only Oxford's version of the origin, and a title can't carry "the story goes".
- **Called For.** A bar phrase (what a guest calls for). Softer; kept as a runner-up for Robin.
