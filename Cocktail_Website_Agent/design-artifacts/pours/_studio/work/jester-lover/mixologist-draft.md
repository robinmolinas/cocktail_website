# Drink v1.2: The Tease (jester-lover), Tomás, round 4

Spec: `_studio/specs/jester-lover.json` (balance.py: balanced, all three in range; allergens.py: nuts).

**Serves:** 2 (about 80 ml a cup)
**Glassware:** two demitasse cups (small coffee cups, about 90 ml) on saucers, warmed with hot water first
**Contains:** nuts (the kirsch: a cherry spirit, listed under nuts to be safe)

## Recipe

| amount | item | note |
| --- | --- | --- |
| 30 ml | VS cognac | steeped a few hours ahead with the peels and cinnamon |
| 15 ml | kirsch (clear, unsweetened cherry brandy) | steeped with the cognac; two parts cognac to one of kirsch, as in Oxford's recipe |
| 1 strip each | lemon peel and orange peel, no white pith | steeped in the spirits, then lifted out |
| half | cinnamon stick, broken into pieces | steeped in the spirits, then lifted out |
| 17.5 ml | demerara syrup (equal weights demerara sugar and water) | warmed with the spirits |
| 1 | orange-peel spiral (half an orange, cut round in one long strip), studded with 6 cloves | the warm spirits run down it into the cups |
| 100 ml | hot coffee with chicory (New Orleans style; or any dark-roast filter coffee), freshly made | added at the end, 50 ml a cup, by someone else |

## Method

1. A few hours ahead (3 to 4 is plenty), put the lemon and orange peel strips and the broken half cinnamon stick in a small jar with the cognac and kirsch. Close it and leave it.
2. When you're nearly ready, make the coffee and keep it hot. Fill the two cups with hot water to warm them. Cut the orange spiral and push the 6 cloves into it.
3. Lift the peels and cinnamon out of the jar. Pour the spirits and the syrup into a small pan and warm them over a low heat until they just steam, under a minute. Never let it bubble, and never light it.
4. Empty the cups. Hold the clove spiral over the first cup on a fork and pour half the warm spirits slowly down it, so they run over the peel and the cloves. Do the same over the second cup.
5. Hand the coffee to someone else. They pour 50 ml into each cup, whenever they like. Stir once and drink it hot.

## Checks

| Check | Result |
| --- | --- |
| **Structure** | Old-Fashioned family, hot: the *Codex* files the toddy as an Old-Fashioned with hot water for cold (p. 38). Core: cognac and kirsch. Balance: demerara syrup. Lengthened with hot coffee instead of water. Seasoning: lemon and orange peel and cinnamon steeped in the spirits; orange peel and cloves on the spiral. No cream and no beans (Wren's guard: apart from *Everybody's* Irish-coffee flip and *For Kicks*' floating beans). |
| **Balance** | `hot` style, no ice, no dilution. 162.5 ml for two: **11.3% ABV (10-13), 6.67 g sugar/100 ml (5.5-7.5), 0.062% acid (0-0.3): all in range.** Sweeps (my `sweep.py`, same call): syrup 15-20 ml stays in (5.80-7.50 g); I sit toward the sweet end because coffee and chicory are bitter and balance.py can't hear bitterness. Coffee 90-110 ml stays in (12.0-10.6%), so the recipe measures 50 ml a cup. Kirsch 40-45% and cognac 40-41% stay in (11.2-11.5%). **Edge, flagged:** warming loses some alcohol, which balance.py doesn't model. Taking a loss of 10% of the alcohol keeps it in (10.1%); 15% is the edge (9.6%); 20% is OUT (9.0%). The direction is the *Codex*'s (p. 38: alcohol evaporates when heated); the loss figures are my own assumptions, unsourced, so the method says "until it just steams, under a minute, never bubbling". **Departure from Oxford:** its recipe (pdf 381-382) is 360 ml spirits to 1.5 litres of coffee, about 1 : 4.2, with the sugar "to taste". At that ratio and this sugar it runs 7.3% and 3.71 g, OUT on both: it's a table service for a crowd, set alight before the coffee goes in. Mine is about 1 : 2, unlit, close to the *Codex* Hot Toddy's baseline of 4 oz water to 2 oz spirit (p. 38). So the order of the steps is the recipe I follow (Oxford's); the proportions are mine, and no copy may call it "Antoine's recipe" or "the original". The coffee-last order is the classic recipe's (Oxford, Commander's in *Joy* pdf 262), not every restaurant's (Hester C2); the hours of steeping are Oxford's only (C4). The spiral is orange, as Oxford's recipe paragraph and Commander's have it; the lemon is only in the steep (C1). |
| **Pairings** | The classic's own: coffee with cherry (kirsch), orange, clove and cinnamon. *Flavor Matrix* consulted (COFFEE and CHERRY pages) and set aside: the story here is the order, and Wren's guards rule out beans and cream. Kirsch with coffee is itself the surprise to most guests. Nothing added to Oxford's list of ingredients. |
| **Allergens** | allergens.py: **nuts**, from kirsch. New row, my call on the safe side, the same as maraschino and apricot eau-de-vie in this table: Oxford KIRSCHWASSER (pdf 1135, found by Hester): "distilled from cherries and their pits", with "almond-like" flavours; the *Flavor Matrix* lists benzaldehyde-bitter almond under CHERRY (pdf 304). **So the pour is not veto-free.** Dropping the kirsch for 45 ml cognac balances identically (11.4% / 6.67 g) but leaves Oxford's recipe; I keep it. Chicory, cloves, cinnamon: no veto (baking spices aren't `spice`, rules 4). Other new rows: `coffee_chicory`, `cinnamon_stick`, `clove`, all none. |
| **Makeable** | No Brûlot bowl, no flame, no niche kit: a jar, a small pan, a fork, two espresso or demitasse cups. Oxford's recipe uses French-roast coffee with chicory (pdf 381); any dark-roast filter coffee is the substitute style (same numbers: no sugar, acid ~0.1, unsourced). No named bottle. The steep: Oxford says "several hours", without a temperature; 3 to 4 hours is my craft call. |
| **Sibling watch** | First demitasse in the registry. *Cold Water First* (flamed Blue Blazer): never lit here. *Everybody's*: cream, whiskey, goblet; none here. *Off Duty*: whiskey toddy in a teacup, "two minutes" of thyme; this is coffee, cognac, a few hours' steep. *Overnight*'s overnight wait: not used (hours, not overnight). *Four Shares*: two cups, not a bowl. *Whoever Comes In* (Hester D6): brandy and coffee, part made ahead, coffee at the last moment. Theirs is about who it's for (a stranger, paid ahead), served chilled in a coupe; ours is about the timing, hot, two demitasse cups, the coffee poured by someone else. No line of ours (epigraph, closing, reading) may rest on "part ahead, the rest later" alone; the closing line rests on who holds the timing. |

**closingLine:** *Run the brandy down the peel. Then give someone else the coffee, and let the timing be theirs.*

## Image brief

Two small white porcelain demitasse cups on saucers, side by side on a deep cherry-red velvet cloth (Pantone 7421 C), under a single soft spotlight from above, the edges of the frame falling into warm shadow, with the fold of a red velvet curtain just visible behind. Both cups hold only the warm spirits so far: a shallow, clear amber in each, no coffee yet. Across one saucer lies a silver fork with a long spiral of orange peel hanging from its tines, studded with whole cloves. Beside the cups stands a small plain coffee pot, lid on, a thin thread of steam rising from its spout: the coffee everyone is waiting for, not yet poured. A broken cinnamon stick lies on the velvet. Elegant, playful, glamorous, close. One impossible detail: the coffee pot stands upright, but its shadow on the velvet is already tilted, pouring. No people, no hands, no faces, no flame, no fire, no smoke, no lit match, no silver bowl or ladle, no cream, no coffee beans, no third cup, no labels or text.

(Props: the cups, the studded spiral and the cinnamon are the recipe. The waiting pot is the order of the reveal: the thing everyone came for, held back. The velvet, spotlight and curtain are the persona's cabaret cues, which Wren keeps to the image only.)

## Names

- **Something's Coming** (my pick: test (4) in two words; everyone knows it, nobody's fooled, and it's said with a grin)
- *I'll Tell You Later* (Wren's pick; I could take it: it promises, so nobody's refused)
- *After the Plates* (I could take it: Wren's own scene)
- *Coffee Comes Last* (Hester's; I could take it, though it names the drink more than the person)
- *Diabolique* (Hester's pick): not for me. It's the drink's other name, so it praises the drink, not the person, and the devil in it belongs to the flaming show.
- ~~*Not Yet*~~ withdrawn: it's in *The Architect*'s reading (Hester).
