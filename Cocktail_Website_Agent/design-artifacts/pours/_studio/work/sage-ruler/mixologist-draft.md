# sage-ruler · The Scientist · drink v1.3 (Tomás, round 4 step 1, 2026-10-02; recipe note to Hester's H5 wording, closing line set; numbers unchanged since v1)

Spec: `_studio/specs/sage-ruler.json` (v1). A Whisky Highball, built the *Codex*'s careful way (p. 214), with a little vanilla for the cask.

- **glassware:** tall highball glass (about 300 ml), chilled in the freezer, 1-inch ice cubes added one at a time
- **contains:** veto-free

## Recipe

| amount | item | note |
|---|---|---|
| 50 ml | unpeated Highland single malt Scotch whisky | ideally one whose label says it was aged in bourbon casks, with no sherry or wine finish |
| ⅛ teaspoon | pure vanilla extract | the real thing, not "vanilla flavouring"; oak casks give whisky some of the same flavour |
| 100 ml | soda water or seltzer, very cold | straight from the fridge; two parts soda to one of whisky |

## Method

1. Put the glass in the freezer for at least 15 minutes, and the soda in the fridge.
2. Pour the whisky and the vanilla into the cold glass.
3. Lower one ice cube in with a bar spoon so it doesn't crack, and wait about 10 seconds.
4. Stir slowly until drops form on the outside of the glass, about 10 seconds.
5. Add one or two more cubes, until the ice is two-thirds of the way up, and stir briefly.
6. Pour in just enough soda that the ice doesn't float. Push the spoon to the bottom, raise the lowest cube about an inch, and lower it again: that mixes it without knocking out the bubbles.
7. Add a last cube and the rest of the soda. Stir once, a single turn, and serve straight away.

## Checks

| Check | Finding | Verdict |
|---|---|---|
| Structure | *Codex* root family: **Highball**. Core: unpeated Highland single malt. Balance: cold seltzer only; the classic Whisky Highball "is balanced solely by sparkling water" (p. 211). Seasoning: ⅛ tsp vanilla extract (aroma; no sugar, acid or strength that the numbers notice). Build and 2:1 ratio: the *Codex*'s own technique section, every step with its physical reason: chilled glass and very cold seltzer keep the bubbles; the first cube tempers so it doesn't crack; 1-inch cubes as the middle ground between flat and warm; lifting the bottom cube mixes without stirring the gas out; one final turn only (p. 214). This is the careful part on show, and every step is physics, not ceremony: I take p. 214's method, not p. 200's Ginza service ritual ("theatrical affectation"). No lemon wedge: "unnecessary at best" (p. 199). | pass |
| Balance (`balance.py`, style `highball`) | 50 ml at 40% + 0.6 ml vanilla extract (35%), then 100 ml seltzer topped: **13.4% ABV, 0.00 g sugar/100 ml, 0.000% acid**: all in range (10-16 / 0-7 / 0-0.6). VERDICT: balanced. Sweep (`sweep.py`): malt at 43% 14.4%, 46% 15.4% (in range, near the top); 125 ml seltzer 11.5% (46%: 13.2%); vanilla at ¼ tsp 13.5%, none 13.3%. Melt isn't modelled by the style; p. 214's ~10-second stir plus three or four cubes, by hand as extra water: +15 ml 12.2%, +30 ml 11.2%, +40 ml 10.6%; 46% with no melt 15.4%. Every case in range. Zero sugar and zero acid are the *Codex*'s classic (p. 199, p. 211); seltzer's "impression of acidity" (p. 211) is carbonic and not counted. | pass |
| Pairings | Whisky and seltzer: the *Codex*'s root Highball (p. 199). **Spark (*Flavor Matrix*):** vanilla's Best Pairings list **whiskey** (pdf 256). The link to the story: vanillin is one of the flavours an oak cask gives a spirit (Oxford MATURATION pdf 1265; BOTANICAL pdf 321, "vanillin flavors produced by oak casks"). So the one addition names the cask, the thing Barnard's record barely mentions, in the glass and in the recipe. **Honesty guard:** Oxford FLAVORED SYRUP pdf 809 notes synthetic vanillin can be added to "amplify a whisky's existing vanilla notes": here it's real extract, written in the recipe, never hidden. Never say the vanilla *is* the cask or replaces it. Consulted and set aside: sherry, Madeira or port in a split core (*Codex* p. 208: "many of the barrels used for aging scotch" once held them): sherry is the Connoisseur's, port the Lone Voice's, Madeira the Discoverer's. A spoon of bourbon (same page): two whiskies from two countries is the Game-Changer's. | pass |
| Allergens (`allergens.py`) | contains: [] · **veto-free** (counts toward the AD-4 floor). New row, my call: `scotch_single_malt_highland_unpeated` (40% typical label, unsourced for the style; distilled grain, so not gluten). `vanilla_extract` and `soda_water` existing rows, contains none. | pass |
| Makeable | Supermarket or any spirits shop: an unpeated Highland single malt (no named bottle; the style is the point), pure vanilla extract from the baking shelf, soda water. Kit: freezer, bar spoon, measuring spoon. Numbers and vetoes proved for the style at 40-46%. | pass |
| Siblings | *Whatever They Call It* (sage-regular-guy): also a Codex Highball, but tequila, 2:5, the plain three-cube build and an oregano sprig; mine is malt, 2:1 and p. 214's careful build. *Further Than Me* (Southside): shaken, citrus and sugar. *Serviceable* (blended Scotch with hops): different whisky and spark. *Asked In* (unpeated Speyside malt, Old-Fashioned): different region, family and glass. *Cold Water First* (Caol Ila): no Islay, no smoke here. Words kept off the method: "mists" (*Are You Quite Sure?*), "condensation" (six pours), "one turn" (*What It Rests On*, *Are You Quite Sure?*). | pass |

**closingLine:** *Ease the first cube in slowly. Then leave the hunch in the margin, where someone will find it.*

(r4 step 1. First sentence = Method step 3, *Codex* p. 214. Second = Wren's y5 position, put yourself in the notes, handed to the guest: the hunch is theirs, the margin is their notes, and "someone will find it" answers y5's "what they'll want to read". No historical claim. Kept off: "Write…", "Measure…", "say so", "let them check", "Show your working", "go back to", "Lift the…" (*Cold Water First* and ten pours), "Raise…" (*Out of Your Way*), "glad you did" (*Are You Quite Sure?*), "record", and the name candidates' words (note, self, copy). "In the margin" appears only in two image briefs (creator-lover, creator-regular-guy), never in a closing line or a reading.)

## Image brief

A tall, smooth-sided highball glass on a pale grey bench (Pantone 7541 C, cool light grey), in clean, controlled daylight from one side. The whisky lengthened with soda, a pale straw colour, lighter than the whisky alone (the image's choice from Oxford's range for barrel-aged spirit, pale yellow to mahogany, pdf 2206; not a claim about every bottle of the style), fine bubbles rising, four clear 1-inch cubes, drops of water on the outside of the glass. A bar spoon stands in the glass. Beside it: a small level ⅛-teaspoon measure and a small dark bottle of vanilla extract, no label shown. A closed notebook with a pencil laid along it, square to the bench edge. A careful hand at the edge of the frame, lowering one cube on the spoon is optional. No still, no cask, no engraving, no book open to any page, no lemon, no smoke, no lab glassware beyond the drink. Quiet, exact, warm in its light.

## Names

- *Fair Copy* (my pick): the clean, corrected copy of a record, the one people can check.
- *Noted*
- *In Fine Detail*
