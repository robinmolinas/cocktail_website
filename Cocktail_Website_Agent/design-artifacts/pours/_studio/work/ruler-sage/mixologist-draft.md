# ruler-sage · The Judge · drink draft v3, final (Tomás, round 5)

The story is ruled (the 1908 commission, card F1-F9). The definition names grain and malt, never the still (F5). One change from the classic, and the change is that definition. The saffron test is dropped (no source). Matches reading v2's y4.

**Glassware:** heavy old-fashioned glass (rocks glass, about 300 ml), filled with ice cubes
**Contains:** gluten (the barley malt syrup is undistilled malt; the whisky itself is not gluten)

## Recipe
| amount | item | note |
| --- | --- | --- |
| 60 ml | blended Scotch whisky | any blend, 40-43%: malt and grain whisky together |
| 7.5 ml (1½ tsp) | malt syrup | 1 part barley malt syrup (from a jar, the baking shelf) to 2 parts rich sugar syrup, stirred smooth; up to 1¾ tsp if your malt syrup is dark |
| 2 dashes | aromatic bitters (Angostura) | |
| 1 | orange peel strip | squeezed over the top, then dropped in |

## Method
1. Make the malt syrup: stir 1 tablespoon of barley malt syrup into 2 tablespoons of rich sugar syrup (2 parts sugar to 1 part water by weight, dissolved warm) until no streaks are left. It keeps in the fridge for weeks.
2. Put the malt syrup and the bitters in the glass, add the whisky, and stir to mix.
3. Fill the glass with ice cubes and stir for about 20 seconds, until the outside of the glass is cold.
4. Squeeze the orange peel over the top so its oils fall on the drink, then drop it in.

## Checks
| check | result |
| --- | --- |
| Structure | Old-Fashioned family (Codex): core 60 ml blended Scotch; balance malt syrup + bitters; seasoning orange oil. One change from the classic: the sugar carries barley malt. |
| Balance (balance.py, built) | 28.8% ABV · 7.69 g sugar/100 ml · 0.000% acid · dilution 24% fixed: all in range (27-32 / 6.5-8.5 / 0-0.05). Proven stops: 6.25 ml ok (6.54); 8.75 ml EDGE sugar (8.80, top of band, allowed for dark malt syrup because maltose tastes less sweet than cane sugar, unsourced); 10 ml OUT (9.87). Whisky strength: 43% ok (30.9%); 46% EDGE (33.0%) -> floor and ceiling: a blend of 40-43%. Stirred and served up instead: OUT (no acid, 6.64 g), so it stays on ice. |
| The sweetness caveat | A third of the sugar in the syrup is malt sugar (mostly maltose), which reads less sweet than cane (unsourced). So the dose sits mid-band in grams, and the 1¾ tsp stop is proven for anyone whose malt syrup is dark or strong. |
| Pairings | Flavor Matrix, Grain entry: malt sits on the Grain wheel (pdf 137, a place on the wheel, not a flavour claim); citrus is one of grain's "Best Pairings" (pdf 136), hence the orange peel. Barley malt with Scotch is the whisky's own raw material, which is my craft call, not a book's. Set aside: saffron (the thread test has no source), passion fruit (the Grain "Surprising Pairing", and already *Standing By*'s syrup with the same Scotch, which I missed in round 2), honey (the same Grain line as *Standing By*'s anchor). |
| Story in the glass | The commission's definition (card F5; secondary: Wilson, Daiches, McDowall, Lucas): whisky is spirit from cereal grain, its starch turned to sugar by malt; it names no still. The sugar in this glass is made with malt too. Never "the law" in guest text (C2: no year for the definition). Nothing in the glass is about the still (Coffey and single grain stay out). |
| Allergens (allergens.py) | contains: **gluten** <- malt syrup (row `malt_rich_syrup`, safe side: undistilled malt -> gluten, studio rule). Whisky, bitters and orange: veto-free. **EDGE for Robin: the pour is not veto-free.** Why the malt stays: it is the only ingredient that puts the story in the glass. The definition requires malt in every whisky (alongside cereal grain), whatever the still, and the reading's "one rule, whichever side they're on" clause rests on it. Without it, the drink is a plain blended Scotch Old-Fashioned beside *Standing By*. Gluten is an existing veto, not a new category (Robin 2026-09-30's "no new vetoes" was about categories: celery, sulphites, quinine, caffeine, wheat glucose). A coeliac guest's own veto protects them, and the Ruler family keeps seven veto-free pours, so the AD-4 floor holds. **A veto-free malt isn't possible:** malt extract keeps barley protein, and only a distilled malt (a single malt) would be gluten-free, which is Sage's subject and would add to the older side. **Proven fallback, if Robin wants veto-free** (switch without a room): 60 ml blended Scotch steeped with saffron (about 20 threads per 200 ml, 1 hour, strained; row `scotch_blended_saffron`, Oxford pdf 1072 for saffron's colour in alcohol), 7.5 ml honey syrup (3:1), 2 dashes Angostura, orange peel. Same numbers: 28.8% / 7.69 g / 0%, all in range; veto-free. The clause would become Hester's: honey is grain's classic partner, and grain was what the definition rested on (Matrix pdf 136 + F5). |
| Makeable | Barley malt syrup is a jar from the baking shelf of most supermarkets or health shops; no named bottles; kit: a glass, a bar spoon, a jigger. |
| Near misses | *Standing By* (blended Scotch Old-Fashioned, passion fruit, lemon peel, wine glass, no ice): different sweetener, peel, glass and ice. *Far Enough* (blended malt, no grain at all). No smoke, no Rob Roy, no Highball, no Sour. |

**closingLine:** *Stir until you can't see the malt. Then say what you've decided, and let the argument go on without you.*

4-gram check: run against every pour file: no shared 4-gram. "spoon" left out (seven sibling closing lines use it).

## Image brief
A heavy, plain old-fashioned glass on a clean, pale stone counter whose front edge runs as one straight horizontal line across the frame. The drink is clear amber with a warm brown depth (blended Scotch with a dark malt syrup), full of ordinary square ice cubes; one strip of orange peel rests against the inside of the glass, its skin facing out. Beside the glass is a small open jar of barley malt syrup, thick and dark brown, with a bar spoon lying flat in front of it, parallel to the counter edge. The background is a smooth, matt deep steel blue (Pantone 540 C). The light is bright, even and controlled from one side, with crisp shadows and nothing in soft focus. Composed, symmetrical, uncluttered. No gavel, scales, books, documents, labels, smoke or people.

## Names
- *By Its Name* (Wren)
- *Either Way* (Hester: the same answer whichever side; free as a name, though the phrase appears in the text of 11 pours)
- *Heard Out*
- *No Favourites* (mine until round 5; withdrawn: Wren is right that it reads as praise, which this person distrusts)
- **My pick (final): *Either Way***
