# Tomás: drink draft, explorer-outlaw v1.2 (round 6 of 6)

v1.2 (round 6): the drink doesn't move. Four Roses' 40% is marked unsourced in the spec, the veto row and Checks (Hester r5). The closing line is Wren's ruled line. The image brief is rebuilt on Hester's r5 facts and fences. Wren's v2 y4 matches my wording, plus her "a twist of orange peel", which matches Method step 5.

v1.1 (round 5): the drink doesn't move (spec v1.1, version text updated). A9-A12 applied to my y4 wording (below, for Wren to carry). The pork line moves into the recipe note, because the assembled `contains` is [spice] only. I grepped "argue" and "after you" across the pour files: the only hits are *Off Duty*'s y5 ("I'm not going to argue with it"), *Not Too Polite*'s y3 ("after you've moved on") and Checks prose. None is a closing line or a motif, and each is used in a different sense. Wren rules the closing line's words. A fallback that doesn't rest on the name is given below. Name pick: *Fine by Me*.

v1 (round 4): Wren ruled in round 3 that the drink walks. Don Lee's Benton's Old-Fashioned base (Proper pp. 275-276) goes into a tall glass and is lengthened with dry sparkling cider. The bottle is printed as "Four Roses bourbon" at 40% (Hester r3), and never as "Yellow Label". Spec: `_studio/specs/explorer-outlaw.json`. New rows in the ingredient table: `maple_syrup` (LI pdf 141) and `bourbon_four_roses_bentons` (40%, **contains spice**: ruling below).

## Recipe

- **serves:** 1
- **glassware:** a tall highball glass (about 350 ml), filled with ice
- **contains:** `["spice"]`

| amount | item | note |
| --- | --- | --- |
| 45 ml | Four Roses bourbon (40%), washed with Benton's bacon fat (recommended), or any straight bourbon washed with the fat of a smoky, dry-cured country bacon | you wash it yourself, a whole bottle at a time. It's made with pork fat, so it isn't for anyone who doesn't eat pork |
| 7.5 ml (1½ teaspoons) | maple syrup, dark (Grade B style) | as in Lee's recipe |
| 2 dashes | Angostura bitters | |
| 135 ml | dry sparkling cider, 7% or under, well chilled | |
| 1 | large piece of orange peel | |

## Method
1. **Wash the bourbon (about 6 hours, the same day).** Cook the bacon slowly over low heat until the fat has run clear and the edges are crisp, not burnt: fat from overcooked bacon tastes bad. Measure 3 tablespoons (45 ml) of the melted fat. Stir it into a 750 ml bottle of bourbon in a wide container that can go in the freezer. Cover it and leave it at room temperature for 4 hours, then put it in the freezer for 2 hours. The fat sets into a solid layer on top. Lift it off, then pour the bourbon through a clean cloth or a coffee filter back into its bottle. It keeps in the fridge for up to 2 months.
2. In a tall glass, stir together 45 ml of the washed bourbon, the maple syrup and the bitters until the maple has dissolved.
3. Fill the glass with ice and stir for 3 seconds.
4. Pour in the cold cider and stir once.
5. Twist the orange peel over the top so its oils fall on the drink, then drop it in.

**closingLine:** *Wash the whole bottle yourself. And when it starts following you around, let it.*

- **Ruled by Wren (r5).** Checked against the Method: step 1 washes a whole 750 ml bottle, so the first half is literal. "Following you around" is Lee's own word (p. 276; Hester r5 passes it).

- **Fallback (round 5, superseded by the ruled line):** dropped.
- **What it carries:** the one true thing as an act (the guest carries the whole load, Lee's terms, F20) and Wren's position, *let it follow you*, turned into something the guest gains: the name that sticks.
- **Avoided:** "condition" (*On One Condition*), "followed" (*Nothing to It*), "allowed" (*Four Shares*), "already" (*Off Duty*), "leave it overnight" (*Overnight*). "let them do the talking" (*Worth the Trip*) is a different verb. To grep before sign-off: "argue" and "after you" across the pour files.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Highball family.** "A Highball is composed of a core spirit that also provides seasoning, and is balanced by a nonalcoholic mixer"; its core "can be split between any number of spirits, wines, or fortified wines" (p. 201), and the Aperol Spritz splits its mixer between seltzer and prosecco (p. 202). Ours is the second case: the lengthener is a sparkling cider, which brings "body and funk—qualities not found in seltzer or sparkling wine" (p. 225, of Tarby's Daisy Chain). **Core:** Benton's-washed bourbon. **Balance:** dry cider, with a little maple. **Seasoning:** Angostura and orange oil, both from Lee's recipe (Proper p. 275). Method after the Codex's root highball: spirit, ice, a 3-second stir, the mixer, one stir (p. 199). The Codex warns that cider "can vary widely in alcohol content, flavor, sweetness" (p. 143), so the cider is swept. |
| Balance (Arnold; style `highball`) | `balance.py`: base 54.1 ml at 34.6% / 12.25 g / 0%, then 135 ml cider. **Final: 13.8% ABV / 4.22 g / 0.32% acid, all in range** (10-16 / 0-7 / 0-0.6). Dilution isn't modelled (a built highball, styles.json). **Rejected:** Lee's 60 ml in a highball with 90 ml cider went OUT at 20.5% (r2). Lee's own Old-Fashioned, as printed and judged built, is in range at 40% (28.8%), but it stays his: Wren's ruling. **Sweeps** (my arithmetic with the same formulas, which reproduce the printout): with the named bourbon at 40% (unsourced), cider 4.5 / 5.5 / 7 / 8% gives 13.1 / 13.8 / 14.9 / 15.6%, all in. With a 45% substitute bourbon it gives 13.9 / 15.0 / 16.1 / 16.8%. **Edge:** a 45% bourbon with a 7% cider reads 16.1%, within the edge band of the 16% top, so it's allowed and justified here: it's still a long drink, and there's 6% more cider than strength would need. With the 7% cap, any straight bourbon of 40-45% stays within range or edge. Cider sugar 1-3 g/100 ml gives 4.2-5.6 g, all in. The cider values (5.5%, 1 g, 0.45% acid) are unsourced standard values. The maple is LI's (pdf 141: 87.5 g). The wash is assumed to change neither strength nor sugar (unsourced, my craft call). |
| Pairings | **Classic:** bourbon, maple and Angostura are Lee's own recipe (Proper p. 275). **Spark, the cider:** the *Flavor Matrix*'s pome-fruit wheel (apple, pear, quince) has pork, bourbon whiskey and maple syrup on it (pdf 197), and its best pairings include bourbon (pdf 196). Bourbon is among pork's best pairings (pdf 204). The cider puts the apple between the bacon, the bourbon and the maple that are already there. **Consulted and set aside:** coffee, pork's surprising pairing (pdf 204), because no in-range shape kept the bacon in front. Popcorn, on the same line, is Lee's own colour (Mad Inventor ground). **Neighbour:** *Hoping You'd Come* owns cognac and roasted apples in a warm toddy. Ours is cold bourbon, tall, and has no fresh or cooked apple. |
| Allergens | `allergens.py`: **contains spice**, and `--check spice` matches. **Ruling on Benton's black pepper (Hester F26: "dry cured by hand with salt, brown sugar, and black pepper"):** it counts as heat, on the safe side. Black pepper's bite is a pungency a guest avoiding heat would reasonably fear (my knowledge, unsourced). Lifting the fat off doesn't prove the pepper left with it, because a fat wash is there to carry the fat's flavour into the spirit (Codex p. 94: "leaving just the flavor of that fat in the alcohol"). The table already does the same for a peppercorn steep (`cognac_sichuan_pepper`). The substitute bacon style can be peppered too, so the classification stays for any bacon. **This costs the pour its veto-free place** (the AD-4 floor), and I'm saying so as CREED requires: the plan counted this row as veto-free. Bourbon is a distilled grain spirit, so not gluten (STUDIO-RULES 4). Cider is apple, so not gluten. **Not a veto, but said plainly:** the drink is made with pork fat, so it's closed to anyone who doesn't eat meat or pork. |
| Makeable | **Kit:** a frying pan, a wide freezer-safe container with a lid, a clean cloth or coffee filter, a jigger, a tall glass and a long spoon. **Named bottles:** Benton's bacon, recommended, because Lee says the drink fails without it (pp. 275-276; F16). Substitute style: a smoky, dry-cured country bacon. Four Roses bourbon is the one in Lee's recipe (p. 275). Its 40% is **unsourced**: only "Yellow Label" is on record (Lee in PUNCH, F21), and no page gives the proof. Substitute: any straight bourbon of 40-45% (the sweep). The numbers and vetoes are proved for the named bottles. Benton's is a Tennessee bacon sold by mail in the US (plan), so most guests elsewhere will use the substitute style. **Prep:** about 6 hours the same day, mostly waiting, for a bottle that makes about 16 drinks. **Yields:** how much bacon gives 45 ml of fat is my estimate, not written. |

## Image brief
- **Glass:** a tall, straight highball glass (about 350 ml), packed with ice (spec).
- **Drink:** amber bourbon lengthened with pale, dry sparkling cider. It reads pale amber-gold, with fine bubbles rising through the ice. (The colour is my estimate from the bottles, unsourced, so it's described and never claimed.)
- **Garnish:** one large piece of orange peel, inside the glass against the ice (twisted over and dropped in, Method step 5; Lee's zest, Proper pp. 275-276).
- **Optional story prop, set back from the glass:** the guest's own wash. A wide container of bourbon with a pale disc of set fat on top, and a cloth strainer beside it (Proper p. 276). A faint haze of hickory smoke is allowed (Benton's smokehouse, F26).
- **Setting (persona imagery):** a counter at night, sharp shadows, one neon or street-light reflection on the glass, a gritty surface.
- **Never:** bacon as a garnish or on the rim (it isn't in the recipe), a rocks glass with one big cube (that's Lee's drink), fresh apples, a phone booth or any door, brand labels on any bottle, any year, a summit or mountain.

## y4 wording (A9-A12 applied, for Wren's v2)
The cocktail I've made for you starts where his did: bourbon washed with bacon fat, the way his recipe is printed, with Benton's bacon from Tennessee and Four Roses bourbon if you can get them, or a smoky dry-cured bacon and any straight bourbon. You make it yourself, so the washing is yours to do: warm the fat, stir it into the bourbon, wait four hours, freeze it for two, lift the fat off and strain. A little maple and Angostura bitters, as in his Old-Fashioned. Then I take it somewhere his recipe doesn't go: a tall glass packed with ice, topped with a crisp, dry sparkling cider, so the apple meets the smoke and the maple. I did that as a nod to everyone who took his idea their own way.

- Each claim checked against the Method: 4 h at room temperature and 2 h in the freezer, the fat lifted and strained (Proper p. 276). Benton's is a Tennessee country bacon (p. 275), and it's smoked (F26). The apple, smoke and maple pairing is the Matrix's (pdf 197).

## Names (bartender-sayable; three needed)
- **Pick: Fine by Me** (with Wren). It names the person, not the story: the shrug when they accept the terms and get to work. That's the recognition, and the closing line turns it. It's easy to say across a bar and isn't in the registry. *In True Fashion* is a lovely line, but it's Meehan's words about Lee, so it's the story and not the guest, and it points back to the Old-Fashioned the drink walks away from. *Can I Have Some?* spends Lee's ask, which is y2's. *Every Last One* and *Hand-Washed* (mine) describe the method, not the person. *It's a Deal* and *Do It Yourself* are fine runners-up, but *Do It Yourself* reads as an order.
- **Fine by Me** (Wren's candidate).
- **Every Last One** (mine). He did all the infusions himself (F20), and the guest washes every drop. Fear check: it's carrying the load, not being kept. Registry: no name opens with "Every". Flag: it may read as counting, which is near *Fair Measure*.
- **Hand-Washed** (mine). The method's own word, said plainly, and a little irreverent. It tells a cold reader there's work inside. Registry: no echo.
