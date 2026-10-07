# The Flirt (lover-jester): Tomás's draft, v1 (round 2)

Spec: `_studio/specs/lover-jester.json`. Harrington's Jasmine with his four measures untouched, plus one thing of mine: a jasmine tea syrup. Wren's conditions: no grapefruit in the glass (kept), a spark only if the first taster would have teased it (see Pairings), interesting, not a plain classic.

**Glassware:** cocktail glass (about 180-200 ml), chilled
**Contains:** veto-free

## Recipe
| amount | item | note |
| --- | --- | --- |
| 45 ml | London dry gin | any London dry, 37.5% or stronger |
| 22.5 ml | fresh lemon juice | squeezed today |
| 7.5 ml | Cointreau | as the recipe prints it; or any clear orange liqueur (triple sec) at 40% |
| 7.5 ml | Campari | as the recipe prints it; it brings the pink and the bitter |
| 12.5 ml | jasmine tea syrup | homemade: plain jasmine green tea and sugar, equal weights (see Method) |
| 1 | lemon peel | a wide strip, for the top |

## Method
1. Make the syrup first (it keeps about a week in the fridge): pour 100 ml of water just off the boil over 2 teaspoons (about 5 g) of plain jasmine green tea, leave it 3 minutes, strain, and stir in 100 g of white sugar until it dissolves. Let it cool.
2. Put a cocktail glass in the freezer.
3. Measure the gin, lemon, Cointreau, Campari and 2½ teaspoons (12.5 ml) of the jasmine syrup into a shaker.
4. Fill the shaker three-quarters with ice and shake hard until the outside is too cold to hold.
5. Strain into the cold glass.
6. Squeeze the lemon peel over the top so its oils fall on the drink, then rest it on the rim.

## Checks
| Check | Result |
| --- | --- |
| Structure (*Codex*) | **Sidecar family.** The Codex prints the Pegu Club, the Jasmine's parent, in the Sidecar chapter (p. 184). Core: London dry gin. Balance: lemon (sour); Cointreau, Campari and the jasmine syrup (sweet). Seasoning: Campari's bitterness, the lemon oils, the jasmine. Harrington's four measures as Oxford gives them in ml (JASMINE pdf 1099: 45 / 22.5 / 7.5 / 7.5; Proper p. 58 the same in ounces; Hester confirms both books agree), with Campari in place of the bitters and lemon in place of lime, as the pages put it. My one addition goes on top; none of his measures moves. |
| Balance (Arnold, style `shaken`) | Recipe 95 ml, dilution 56.2%, 148.4 ml in the glass. Initial 27.3% / 12.34 g / 1.42% acid; finished **17.5% / 7.90 g / 0.91% acid**. Every finished number in range. **One edge, justified (round 3):** initial acid 1.42 vs 1.40, before the ice, from keeping Harrington's lemon at his measure. What's drunk is the finished drink, and its acid sits inside the band (0.91 of 0.76-0.94): a tart sour, not a sharp one. I tried to move it and every move costs more than it clears: 13.75 ml syrup still reads 1.403 initial (and 14.9% at 37.5% gin, an EDGE); 15 ml clears acid (1.385) but puts initial sugar over at 13.6 (vs 13.5) and finished sugar on the edge at 40% gin (8.92); lemon down to 20 ml clears it (finished 17.9% / 8.05 g / 0.83%) but moves one of his four measures, and the drink's rule is that none of them moves and mine goes on top. So 12.5 ml stays, with a 0.02 edge on the pre-ice figure. **The classic as printed reads OUT** (47% gin: 3.06 g sugar, 1.02% acid; 40%: 3.13 g, 1.05%): very tart and dry by Arnold's ranges. balance.py can't hear bitterness, and Campari's argues for more sugar, not less. The syrup is the fix, so the spark is also the balance. **Sweeps (all through sweep.py):** syrup 5 ml OUT (acid), 7.5 ml OUT (acid), 10 ml OUT (initial acid 1.46), **12.5 ml in at every strength** (gin 37.5% 15.0% / 8.12 g; 40% 15.7% / 8.06 g; 47% 17.5% / 7.90 g), 15 ml EDGE at 40% (sugar 8.92) and 37.5% (sugar 8.99, ABV 14.7). Syrup sugar 50 or 65 g/100 ml (a looser or tighter home syrup): 6.93 g / 8.20 g, both in. A sweeter triple sec (30 g/100 ml): 8.15 g, in. So the gin floor is 37.5%, and the syrup measure is fixed at 12.5 ml. |
| Pairings | Own knowledge: gin, lemon, orange liqueur and a red bitter are the Jasmine itself; jasmine with citrus is the everyday pairing of jasmine tea with lemon (my knowledge, unsourced). *Flavor Matrix*: on the Olive page (pdf 296, rendered, not OCR), the OLIVE + JASMINE pairing runs through **benzyl acetate**, whose aromas are "fruit, honey, jasmine" and which the page says is also shared with **tea**; pdf 268 lists benzyl acetate in pear, blueberry and jasmine. So jasmine-scented tea carries a compound the book files under jasmine. I don't claim more than that (the Matrix doesn't pair jasmine with gin or Campari). **The spark, and why it's this person's:** the drink was named for Matt Jasmin, and the name went out with an "e" he never had (Proper p. 58), which spells a friend's name the way English spells the flower. Harrington's drink has no jasmine in it. I put some in: the tease played back, years late, and the thing the first taster would have teased me for (my imagined tease, "took you long enough": Checks only, never quoted in the reading or given to anyone in the story; Hester D8). It is in the taste (scent and a little tannin from the tea; sugar from the syrup; no acid, no strength), not a garnish. **Grapefruit:** none in the glass (the Muse's and the Prankster's). Olive stays out (it's *Making the Calls*' spark); I cite the page only for the compound. |
| Allergens | `allergens.py`: **veto-free** (AD-4 floor holds). New row `jasmine_tea_syrup` added by me: sugar as 1:1 simple syrup (LI table), no acid, no ABV; classified `none` **because the recipe says plain jasmine green tea**: tea is on no veto list. A blend with other flowers, fruit or nut pieces would need its own row; the syrup line says "plain". Caffeine isn't a veto. Gin, Campari and Cointreau are `none` in the table already. |
| Makeable | Shaker, strainer, jigger, freezer, a small pan or kettle. Jasmine green tea is a supermarket tea. Cointreau and Campari are named because the recipe names them (Proper p. 58, Oxford pdf 1099); Cointreau's substitute is a style (clear orange liqueur, 40%). Campari's substitute would be a red Italian bitter, but **the numbers are proved for Campari only** (24%, 24 g/100 ml, LI table); a lighter red bitter would change strength and colour. |
| Flag for the host / Hester | The Lover plan's Claims say "Our Jasmine is a drink named for a man, **with no jasmine in it**", to keep off Explorer's reserved backup "jasmine and frangipani, per Baker". My spark puts jasmine in. No pour uses jasmine (grep of every pour file), and Explorer's batch closed without the Baker backup. **Settled (Hester, audit r3, J1):** the plan's line is superseded. Claims clause: *"Jasmine, owned: Explorer's Baker backup (frangipani and night-blooming jasmine) was never poured. Here the jasmine comes from the drink's misspelled name, as tea in a syrup, and Baker is never mentioned."* Riff guard (D11): his four measures and one thing of mine, never "his recipe". |

**closingLine:** *Put in the jasmine Harrington's spelling promised. Then pay one compliment with no tease around it, even if it comes out a letter off.*

## Image brief
- **Scene:** a bright bar counter late in the evening, warm and lively, light from above and from the side, a feeling of two people mid-conversation. Modernised vintage pin-up energy: bold graphic shapes in the background (a big rounded arch or a starburst panel), clean and upbeat, never dark behind the glass.
- **Glass and drink:** a chilled cocktail glass (V-shaped, stemmed), frosted on the outside. Pink from the Campari, as Harrington's was (Proper p. 58): bright and clear to slightly hazy, lighter at the edges. One wide strip of lemon peel resting on the rim. **No grapefruit anywhere, no flower in or on the glass, no straw.**
- **The gesture (one glass only; the other person stays out of frame, per Wren r3):** a hand sliding the glass across the counter toward someone just out of frame, as if mid-tease: the drink handed over, waiting to be played back.
- **Props (only what the facts say):** a steel shaker beaded with cold, a small jar of loose jasmine green tea with its lid off, a halved lemon, the bottle shapes of an orange liqueur and a red bitter with **no readable labels**.
- **One impossible detail:** a single small white jasmine flower hanging in the air just above the rim, still, as if the name had flowered on its own. Wren to judge that it reads as a wink, not a romance.
- **Colour:** the drink's pink and the persona's hot rose (Pantone 1925 C) as the accent; a little sparkle on the frost and the shaker. Avoid: lipstick marks, cherries, a couple, anything sultry or sexualised, grapefruit.

## Names
My pick (held to the vote): **Only Half Joking**. It names what's under the tease, which is the one true thing, without saying "compliment".
- *Caught It* (the tease landed; the point of a compliment said sideways)
- *Extra E* (the misspelling; about the drink more than the person, so lower)
- I could take Wren's *Your Move*.
