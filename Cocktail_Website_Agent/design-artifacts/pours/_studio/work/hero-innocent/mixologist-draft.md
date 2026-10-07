# Tomás: drink draft, hero-innocent (The Initiate), v1, round 4 step 1 (drink unchanged; Hester's audit r3 T1–T4 landed)

Spec: `_studio/specs/hero-innocent.json` (v1). A savoury Highball built on the Bullshot as Dale DeGroff prints it (Oxford BULLSHOT pdf 375): vodka lengthened with beef broth, both of his orange touches, his splash of sherry. No lemon or lime anywhere.

**Glassware:** tall highball glass (about 400 ml), filled with ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | vodka | any vodka, 37.5% or stronger |
| 90 ml | plain beef broth, made at home | beef shin and bones, onion, carrot and water; no salt, no stock cube; made the day before |
| 5 ml | fresh orange juice | one of the two orange touches |
| 5 ml | medium dry sherry | an amontillado style works |
| 1 small pinch | fine salt | the broth has none of its own |
| 1 strip | orange peel | the other orange touch |

## Method

1. The day before, make the broth: put about 1 kg of beef shin on the bone, one onion cut in half and one carrot in a large pan with 2 litres of cold water. Bring it slowly to a bare simmer and keep it there for about 3 hours, skimming off the grey foam as it rises. Strain through a fine sieve, add no salt, let it cool and keep it in the fridge (it keeps 3 days, or freeze it). Lift off the fat once it's cold.
2. If the broth has set to a soft jelly in the fridge, that's a good broth. Warm it just until it pours again, then let it cool to room temperature.
3. Fill a tall glass to the top with ice.
4. Put the vodka, 90 ml of broth, the orange juice, the sherry and a small pinch of salt in a shaker with plenty of ice.
5. Shake hard for about ten seconds, then strain into the glass.
6. Squeeze a strip of orange peel over the drink so its oils fall on it, then lay the peel on the ice.

**closingLine:** *Squeeze the orange peel over it last. When nobody will say what's wrong, read every menu you're handed.*

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| **Structure** | Highball (*Codex* root, savoury branch) | The *Codex* says a Highball can also be savoury, with the Bloody Mary as its queen (p. 221). Core: vodka. Lengthener: beef broth, which also brings the body and the savoury depth. Balance: no syrup and no citrus juice at all; the drink is balanced the way a Whisky Highball is, near zero sugar and acid, and the salt and broth do the work sugar and acid do in a sour. Seasoning: 5 ml orange juice, 5 ml medium dry sherry, orange oil. Shaken and strained over ice, as DeGroff prints it (Oxford BULLSHOT pdf 375). |
| **Balance** | freeform, judged by hand on the `highball` ranges: in range | Arnold has no savoury style, so `balance.py` runs it `freeform` (undiluted: 160 ml, 15.5% ABV, 0.63 g sugar/100 ml, 0.041% acid). Run as `shaken` for the dilution formula: **160 ml -> 43.6% dilution -> about 230 ml, 10.8% ABV, 0.44 g/100 ml, 0.028% acid.** On the highball ranges (10–16% / 0–7 g / 0–0.6%) all three are in range; strength sits in the lower third, so the melt in the glass (not modelled) can only pull it toward the floor. The shaken-sour ranges read OUT on every line, which means nothing here: it isn't a sour. **Why not DeGroff's proportions:** 45 ml vodka to 100 ml broth, shaken, reads **8.7%**, under the highball floor, so on paper it's a thin drink. 60 : 90 is my change, nearer the *Codex*'s savoury Highball (2 oz vodka to 5 oz mix, built, p. 221). **Sweeps (`sweep.py`, one call):** vodka 37.5% / 50% -> 10.3% / 13.0% (so "37.5% or stronger" holds); medium dry sherry sugar 0.2–5 g/100 ml (unsourced spread) -> 0.39–0.50 g; broth sugar 0.3 -> 1 g (unsourced) -> 0.72 g; broth 80 / 100 ml -> 11.4% / 10.3%. Without the orange juice: 0.18 g, 0.011% acid; the 5 ml is small in the numbers but it is the only fruit in the glass. Every stop lands. |
| **Pairings** | vodka, beef, orange, sherry: DeGroff's; the *Flavor Matrix* consulted, no spark added | The orange is the story: beef with orange on a Chinese menu (Oxford pdf 374–375; *Proper* pp. 11–12), still in DeGroff's printed recipe (pdf 375). The sherry is his too. **Matrix (Beef, pdf 44):** best pairings nuts, dried fruit, butter, cream, mustard, alliums, cocoa; surprise pairings cocoa, **grapes**, dried currant. Grapes are already in his glass, as the sherry, and sherry itself is on the Matrix's beef wheel by name (pdf 45, rendered by Hester), so the book backs a choice he'd made. Orange isn't in the Matrix's best or surprise pairings for beef (pdf 44). Its beef wheel has "citrus" (pdf 45), which covers orange, lemon and lime alike (pdf 80): the chart can't tell them apart, and that difference was the whole answer. (My r2 "off the chart" was false: the OCR had dropped "citrus"; Hester T1.) **No new spark, recorded so Robin sees the rule applied:** cocoa would be a second addition and read as a second answer competing with the orange (Wren's fence); dried currant likewise, and it's `nuts` on the safe side, which would cost a veto-free row; mustard is heat-adjacent and a second answer. **What makes it interesting instead:** a home-made broth with real body (the jelly in step 2 is the bones' gelatin), salted by the guest, and the two orange touches that are the whole story. An old New York steakhouse drink (Oxford pdf 374 says older steakhouses still served it as of 2021), once everywhere and now half-forgotten (Wondrich 2017, secondary). Once a favourite of ad men and movie stars (pdf 374); a drinks historian calls it surprisingly tasty when made with care (Wondrich 2017, Hester A11, secondary). **No lemon, and it matters:** one drinks historian's own 2017 Bullshot still uses lemon juice and a lemon wedge (Wondrich, Hester A6, secondary; one writer's recipe, never "the standard"), so the orange stays DeGroff's own answer. **Departures from DeGroff's print (mine, so "built on", never "his recipe"):** Tabasco and black pepper out (both `spice`); home-made broth, which his recipe allows ("canned or house-made"), not canned; a pinch of salt back in, because his broth was canned (at Charlie O's they left salt out "since the broth was so salty", pdf 374); vodka 45 -> 60 ml and broth 100 -> 90 ml (strength, above). |
| **Allergens** | veto-free (`allergens.py`: contains []) | **New rows, mine, this round:** `beef_broth_homemade` (beef, bones, water, onion, carrot only: no veto touched; no yeast extract, hydrolysed wheat protein, milk powder or egg-white clarification, which is why the existing `beef_broth_canned` row is gluten, egg-white, dairy); `sherry_medium_dry` (17.5%, 2.5 g sugar unsourced, swept; wine fining ignored, STUDIO-RULES 4). Vodka is a distilled spirit (not `gluten`). No Tabasco or pepper, so not `spice`. Celery deliberately left out of the broth (not a veto, but no reason to add a common allergen). Counts toward the AD-4 floor. **Not vegetarian** (not a veto; Makeable says so). |
| **Makeable** | basic kit; one overnight step | Large pan, sieve, shaker, strainer, jigger. Styles only, no named bottle: any vodka (proved 37.5–50%), any medium dry or amontillado sherry (proved 0.2–5 g sugar). The broth is the only real work (3 hours' simmer, the day before); about 1.2 litres from 2 litres of water, my estimate, so it serves many drinks or a soup. Broth timings and yield are my craft call, unsourced. A guest who uses a shop-bought broth must check its label: many carry wheat, milk or egg (that's why our row is home-made). |
| **Siblings and registry** | clear | Highball · vodka · tall glass on ice matches the Hero plan's reserved shape for the Initiate and no registry row. Against *Curtain Call* (The Pleasure Seeker: vodka, savoury, Red Snapper): no tomato, no manzanilla, no celery salt, no lemon; long on ice, not up in a wine glass. Against *Next One's Mine* (Saviour, the family's other Highball): rye and vermouth with soda; nothing shared but the glass type. No "fix", "ready", "young" or "first day" in my text; the peel step says "squeeze", since "twisted over the top" sits in *The First Guess* (Hester A5). Closing line checked: "go looking" is the Quest Seeker's (sibling), so not used; no word shared with my name pick. |

## Image brief

- **Glass and drink:** a tall highball glass full of ice. The drink is a light, warm amber-brown, faintly hazy (an unclarified home broth, lengthened with clear vodka), with a thin pale froth at the top from the shake. A wide strip of orange peel lies across the ice at the top.
- **Props (the story in objects):** an open restaurant menu card lying on the bar beside the glass, with columns of small print, nothing legible; a whole orange with one strip of peel cut away, and a small paring knife; a steel shaker tin, beaded with cold; a small dish of salt with a pinch taken out of it.
- **One impossible detail:** one line on the menu gives off a soft sunrise-yellow glow, as if it had just been found.
- **Must not appear:** lemon or lime in any form, a hot-sauce bottle, a pepper mill, tomato, celery, a soup bowl, a mentor figure or a second person, a second drink, any readable text.
- **Palette:** sunrise yellow (the persona's Pantone 1235), orange, warm amber-brown, pale wood.

**SCENE (ready to paste):** A tall highball glass full of ice stands on a pale wooden bar, holding a light, warm amber-brown drink, faintly hazy, with a thin pale froth at the top and a wide strip of orange peel laid across the ice. Beside it lies an open restaurant menu card, its small print too small to read; one line on it gives off a soft sunrise-yellow glow, as if it had just been found. Nearby sit a whole orange with one strip of peel cut away, a small paring knife, a steel shaker tin beaded with cold, and a small dish of salt with a pinch taken out. Warm morning light; sunrise yellow, orange and amber.

## Names

- ***Work It Out*** (my pick, held to the vote). Wren holds *Nobody Told Me*, Hester *On the Menu*; I could take *Nobody Told Me*.
- ***Work It Out***. "The bartender decided to work it out" is the moment on the page (*Proper* p. 12, Hester A7), and it's what this person does with a hard word: takes it home and works on it (Wren's "what they give"). Said across a bar it sounds like a dare to yourself ("What are you having?" "Work It Out"). It names the gift, not the drink.
- ***Nobody Told Me***: DeGroff's "Joe never told me anything", and the answer he found without being told. Strong, but it gives the position away before the closing line can.
- ***Without a Word***: the teacher's silence. Quieter; a little sad for a sunrise-yellow pour.
- *Not Quite*: set aside. It's the offhand verdict that stays with them, and it would land, but *Not Only the Way*, *Not Too Polite* and *Not the Same* already open with "Not".
