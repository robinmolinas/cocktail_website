# innocent-jester · The Giggler · drink v1.1 (Tomás, round 4 step 1, 2026-10-04)

Spec: `_studio/specs/innocent-jester.json`. The story's own drink, Sam Ross's Paper Plane (*A Proper Drink* p. 288), in its standard version with Aperol (Campari came first, and the page doesn't say who swapped it). I've made two changes, both there so it makes you smile rather than wince: the lemon is 2.5 ml (half a teaspoon) short, and five drops of salt water take the edge off the two bitters. Once it's salted it isn't his recipe. The reading can say "the Paper Plane, with two small changes of mine", never "his recipe", never "his original", and never "equal parts" for this glass (our lemon is short, and the Maverick's closing line owns "Equal measures").

**v1 → v1.1:** recipe unchanged. Nonino's sugar is now Hester's lead figure (20.8 g/100 ml), which moves the drink to 8.11 g, still in range. **The pour now contains `spice`** (galangal in the Nonino, see Allergens), so it no longer counts as veto-free. Method step 4 has lost "hard". The closing line is final. The image detail is approved by Wren. The recipe note explains "amaro" (lint).

**glassware:** coupe (about 180–200 ml), chilled
**contains:** `["spice"]`

## Recipe

| amount | item | note |
| --- | --- | --- |
| 22.5 ml (¾ oz) | bourbon | 43% or stronger |
| 22.5 ml (¾ oz) | Amaro Nonino Quintessentia, recommended | an Italian bitter herbal liqueur made on grappa (a brandy distilled from what's left after winemaking); or any other bitter herbal liqueur made on grappa |
| 22.5 ml (¾ oz) | Aperol, recommended | or any bright orange Italian bitter aperitif of about 11% |
| 20 ml | fresh lemon juice | a touch less than the printed recipe's ¾ oz, so it's bright, not sharp |
| 5 drops | salt water | 1 level teaspoon fine salt stirred into 4 teaspoons water; or a small pinch of fine salt |

## Method

1. Make the salt water once: stir 1 level teaspoon of fine salt into 4 teaspoons of warm water until it's clear. It keeps in the fridge for months.
2. Put the coupe in the freezer to chill.
3. Pour the bourbon, the Nonino, the Aperol and the lemon juice into a shaker. Add five drops of the salt water.
4. Fill the shaker three-quarters full with ice, close it and shake for about 12 seconds, until the shaker's too cold to hold comfortably.
5. Strain into the cold coupe. No garnish.

**closingLine:** *Five drops of salt water before you shake. And when something's funny, laugh out loud.*

(Final. Wren r3: my v1 line, "don't wait to see if anyone else is laughing", pulled against her y5, which has the guest look round for someone else trying not to laugh. This one carries her position, that a laugh is never to be held in, as something to do. It doesn't repeat her y5 words ("don't hold it in", "let yours go"). Checked against every closing line: none uses "laugh". "Laugh first" is the Mad Inventor's, and this isn't it. "Let it out" was out, because it reads too close to *Straight Up*'s "let it in first". The only shared phrase is "out loud", where *Show Your Working* has "ask your oldest question out loud", a different verb. No word is shared with *Can't Help It*.)

## Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Sidecar family.** The Codex puts the equal-parts Last Word in the Sidecar chapter. Its two liqueurs come "in place of the Cointreau", and because they "bring a lot of proof to the cocktail", the base spirit is "reduced in proportion" (pp. 178–179). Its Twist of Menton uses exactly our two bitters, Aperol and Amaro Nonino, in place of the Chartreuse and maraschino (p. 191). The Paper Plane has the same shape. That filing is mine, by analogy: the Codex doesn't print the Paper Plane. **Core:** bourbon, split with Nonino (35%, Codex p. 259). **Balance:** lemon against the sugar in the Aperol and Nonino. **Seasoning:** the orange, rhubarb and herbs of the two bitters (Codex pp. 258–259), and the salt. |
| Balance (*Liquid Intelligence*, style `shaken`) | **Balanced: every number in range.** 87.8 ml → 52.4% dilution → 133.7 ml. Initial 23.3% / 12.36 g / 1.37%. **Finished 15.3% ABV (range 15.0–19.7), 8.11 g sugar/100 ml (5.0–8.9), 0.897% acid (0.76–0.94).** It sits at the sweet end of the sugar range, which is where a drink with two bitters should sit (balance.py can't taste bitterness). **The printed recipe reads OUT:** with the full ¾ oz of lemon it's 14.9% (EDGE) and 0.99% acid (OUT). 20 ml of lemon lands it. Salt isn't modelled (five drops add about 0.25 ml). |
| Balance sweeps | **Nonino sugar 20.8 g/100 ml:** a search summary says Alko (Finland's state retailer) lists 208 g/l: a **lead; the page wasn't read** (Hester r3). It sits above the top of my earlier 6–20 sweep. At the old 12 g estimate the drink is 6.63 g, also in range. **Aperol sugar UNSOURCED** (modelled at 26 g; Hester rejected the "11 g" that circulates, which looks like its 11% strength misread). With Nonino at 20.8 g, Aperol at 18 gives 6.77 g, 22 gives 7.44 g, 26 gives 8.11 g and 30 gives 8.79 g, all in range. **Only at 34 g does it go EDGE (9.46 g).** No fix helps there: adding lemon sends acid to EDGE at 0.94, and less Nonino or more bourbon only gets it down to 9.2–9.4 g. So if Aperol is ever sourced at 34 g or more, it stays EDGE and gets justified as the bitter-sweet end. **Bourbon strength:** 43% gives 15.0% (in range), 40% gives 14.6% (EDGE), so the recipe says "43% or stronger". **Aperol strength** (Oxford pdf 125: 11–15%, depending on market): at 15% it's 15.9%, in range. With Campari, the first version (LI 24% / 24 g), it's 17.1% / 6.17 g / 0.879%, in range, for the record only. |
| Pairings | **Salt with these two bitters is the Codex's own move.** Salinity "can help lift the flavors of bright fruit liqueurs or help tame bitter ingredients" and "help meld the flavors of dense amari" (p. 181). In the Exit Strategy, "a generous amount of salt solution rounds off the bitter edges" of 1½ oz Amaro Nonino with 6 drops (p. 11). Our 5 drops sit against ¾ oz of Nonino plus ¾ oz of Aperol. Arnold wants salt below the point where you can taste it (LI p. 61). That's the aim, not a promise, so the reading says "It isn't meant to taste salty" (H8, in Wren's v2 words). **Why salt is the spark** (in Wren's words, y4): it brings nothing of its own, and it takes the frown off the bitter. That's what the guest's laugh does for other people's jokes. **Flavor Matrix consulted and set aside:** popcorn (it sits beside bourbon whiskey on the Cocoa and Pork wheels, pdf 85 and 205, as a neighbour, not a stated pairing; and popcorn is *What It Rests On*'s syrup); ginger for the bar's name (a pun, and `spice`); Ginger's own trick of using "the crystallized sugar that gathered around the edges of liqueurs like Campari" (*Proper* p. 144) as an Aperol-sugar rim (sugar rims are *In Your Own Hand*'s and *Not the Same*'s ground, and it would push the sugar over the top). The Matrix's own line on salt (pdf 263) is merged with the next column in the scan, so I don't quote it. |
| Allergens (`allergens.py`) | **`["spice"]`. Not veto-free.** Two rows were added for this pour, both my calls. `aperol`: none. Oxford pdf 125 gives oranges, cinchona, rhubarb and gentian, and says the recipe is "supposedly" the original; no nut or heat is on record, the same call as the studio's Campari row. `amaro_nonino`: **reclassified from none to `spice` in r4, on my own row from r2. No other spec uses it.** The botanicals list in the same unread search summary (Hester r3) includes **galangal**. The *Flavor Matrix* puts galangal in ginger's family, among the "pungent spices" (pdf 132), and this studio files ginger under `spice` (*Worth the Trip*). The list is unread, the dose is a botanical in a liqueur, and the veto is medical, so it counts. **For Robin:** if a maker's list without galangal turns up, or he rules that a botanical trace isn't heat, the row goes back to none and the pour is veto-free again, with nothing else to change. No nut or nutmeg is listed, so no `nuts`. Bourbon is a distilled grain spirit, so not `gluten`. Salt: none. |
| Makeable | Shaker, strainer, jigger and freezer. Two recommended bottles, because the printed recipe names them (*Proper* p. 288), with substitutes given as styles. **The numbers and vetoes are proved for Aperol and Nonino only.** A substitute aperitif or bitter liqueur changes the sugar (see the sweep) and has to be checked for nuts and heat. The salt water is one teaspoon of salt, made once. |
| Distinct | Registry: no other bourbon Sidecar. Coupes are common; this drink isn't. No sibling uses Aperol or Nonino in a recipe (grep: only a mention in *Kept*'s anchors). |

## Image brief

**Glass and drink:** a chilled coupe, a little frosted, filled to just under the rim with a hazy, bright orange drink. It's lighter than Aperol on its own ("vibrantly orange", Oxford pdf 125) and clouded by the shaken lemon, with a thin line of fine foam at the edge. No garnish, no ice.
**Props (story):** a bench or bar top of glossy orange plastic (Ginger's "lots of orange plastic", *Proper* p. 144); a small clear dropper bottle of salt water, no label; half a squeezed lemon; a printed menu card lying face down (the menu that "read like a comedy script", p. 144; no readable text).
**One impossible detail:** one corner of the face-down menu has lifted off the bench by itself and folded into the nose of a paper plane, as if it's about to take off. (Wren r3: y3 owns the paper-plane picture as "I like to think".)
**Must not appear:** a cocktail cherry, popcorn, ginger root, Jägermeister, a second drink, people or hands, any readable text or logo, anything childlike (no sweets, cartoons or classroom), a sugar rim.
**Palette:** the persona's neon yellow (Pantone 803 C) as the light and the wall behind; the orange of the drink and of the plastic bench; nothing dark behind.

> SCENE: A chilled, lightly frosted coupe stands on a glossy orange plastic bar top, filled to just under the rim with a hazy, bright orange cocktail, lighter than the bottle's orange, clouded by fresh lemon, with a thin line of fine foam at the edge. No garnish, no ice. Beside it: a small clear dropper bottle of water with no label, half a squeezed lemon, and a printed menu card lying face down. One corner of the menu has lifted from the bench by itself and folded into the nose of a paper plane, as if about to take off. Bright, warm neon-yellow light fills the wall behind. Nothing dark, no people, no text.

## Names

- *Can't Help It* (my pick, held to the vote): it recognises the person in their own words. The laugh gets out before they can stop it. Wren r3: "I could take *Can't Help It*."
- *In Stitches*
- *Out Loud* (if the room picks it, the closing line's "laugh out loud" changes, because the closing line must share no word with the name)
- *Nothing Wrong*: withdrawn. Wren finds it reads as a defence when cold, and Hester notes it's our paraphrase of Briars, close to *Nothing to It*.
- I could take Wren's *There It Goes*.
