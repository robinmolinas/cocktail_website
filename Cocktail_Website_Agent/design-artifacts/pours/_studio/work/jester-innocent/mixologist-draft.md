# jester-innocent · The Naïf: drink v2 (Tomás, round 4, 2026-10-04)

Spec: `_studio/specs/jester-innocent.json`. Family: Daiquiri (rum, lime, sugar), made as a swizzle. A Green Swizzle with no falernum, built from the parts of Trinidad's bottled base, Carypton: "rum, lime juice, sugar, and 'indigenous herbs of the West Indies'" (Oxford ANGOSTURA pdf 112). Carypton was long discontinued (*Imbibe!* pdf 124). The green is a barspoon of green absinthe, Wondrich's own stand-in for the wormwood bitters (pdf 125), steeped with tangerine peel: my adaptation of a 1937 tip for the bitters that he credits to Eleanor Early. It's never "Carypton's recipe", "the original" or "the glass Bertie drank".

**v1 → v2:** the home wormwood steep is gone. Hester (r3): thujone, which wormwood contains, is "a lethal neurotoxin in high concentrations", and absinthe stays clear of that because thujone "resists distillation" (Oxford ABSINTHE pdf 50). A home steep isn't distilled, and no page gives a safe level for one. I won't put an unsourced dose of a neurotoxin in front of a guest, so the distilled one leads, and the tangerine goes into it. The numbers barely move.

**Glassware:** tall Collins glass (about 350 ml), crushed ice, the swizzle stick left standing in it, no straw
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | white rum, a flavourful one (about 40%) | Wondrich's advice for this drink: "a flavorful white one" |
| 25 ml | fresh lime juice (about one lime) | measure it: 30 ml makes it too sharp |
| 20 ml | simple syrup (1:1, white sugar and water) | |
| 5 ml (1 barspoon) | green absinthe steeped with tangerine peel (method, step 1) | the green in the Green Swizzle. Use one barspoon, no more |
| 4 dashes | Angostura bitters, dashed on top at the end | a dark-red band over the green |
| 1 | wooden swizzle stick, left standing in the glass | no stick? a bar spoon does the same job |

## Method

1. **Two days ahead, make the tangerine absinthe.** Peel one tangerine thinly with a vegetable peeler, orange skin only, none of the white. Put the peel in a small clean jar with 100 ml green absinthe (the wormwood-forward kind) and close it. Leave it two days somewhere cool, and shake it once a day. Strain it and bottle it. A barspoon makes one drink, so the bottle makes about twenty.
2. Make crushed ice. Wrap a tray of ice cubes in a clean tea towel and bash it with a rolling pin until it's nearly snow.
3. Pour the rum, lime, syrup and one barspoon of the tangerine absinthe into the tall glass.
4. Fill the glass about four-fifths with crushed ice.
5. Stand the swizzle stick in the drink with its prongs at the bottom. Hold the handle between flat palms and rub your hands back and forth so the stick spins, moving it slowly up and down. Keep going until the outside of the glass turns white with frost, about 20 to 30 seconds.
6. Pack more crushed ice on top until it mounds over the rim. Dash the Angostura over the ice. Leave the stick in the glass.

**closingLine:** *Spin the stick between your palms until the glass goes white. Then go back for whatever you were hurried past.*

## Checks

| Check | Result |
| --- | --- |
| **Structure** | Daiquiri family (rum, lime, sugar), Codex, built and swizzled in its own tall glass on crushed ice: the Codex's crushed-ice build (p. 134: fill about four-fifths, swizzle, pack and mound). **Core:** 60 ml white rum. **Balance:** 25 ml lime against 20 ml syrup. **Seasoning:** a barspoon of tangerine absinthe (the green and the wormwood), Angostura on top. The swizzle's "three constants" are "spirits, wormwood bitters, and ice", and lime and sugar are "sometimes omitted" (*Imbibe!* pdf 124). Here lime and sugar are the parts of Trinidad's bottled base (Oxford pdf 112), and the absinthe stands in for the wormwood bitters (Wondrich's own alternative, pdf 125). |
| **Balance** (`balance.py`, style `shaken`) | 113.2 ml → 54.5% dilution → 174.9 ml. Initial 25.5% / 11.34 g / 1.325%. **Finished 16.5% ABV / 7.34 g / 0.858% acid: all in range, no edges.** Why `shaken`: crushed ice swizzled until the outside frosts dilutes about as much as a shake (my craft call; Oxford SWIZZLE pdf 1963 gives the frost as the stop). **Versions the numbers rejected** (v1, same rum, lime and syrup): the Codex daiquiri ratio, 60:30:22.5, gave acid 0.98 (EDGE), and lime at 30 ml gave 0.99 (OUT). Hence "measure it: 25 ml". **Sweeps, all ok:** absinthe at 45% (15.9%) and 74% (16.6%); the strong corner, rum 43% + absinthe 74%, 17.5%; the weak corner, rum 37.5% + absinthe 45%, 15.2%; lime 22.5 (acid 0.79) and 27.5 (0.93); syrup 17.5 (6.58 g) and 22.5 (8.07 g). **Melt, by hand** (crushed ice keeps melting; Wondrich: "a long, slow sipper", pdf 125). At 40% melt (stopped early), 18.2% / 8.09 g / 0.95% acid, sharp at the edge. That's why the method runs to the frost. At 70%, 15.0% / 6.67 g / 0.78%. At 85%, 13.8% / 6.13 g / 0.72%. At 100%, 12.7% / 5.67 g / 0.66%. It starts as a sour and finishes inside the Collins band (12.5–15%), a cooler by the bottom of the glass, "tall, pale, and frosty" (pdf 125). |
| **Pairings** | Rum, lime and sugar are the daiquiri's own. The swizzle's bitter is wormwood, "a regular Swizzle made green by the addition of 'wormwood bitters'" (*Imbibe!* pdf 124). Absinthe brings wormwood with aniseed and fennel (Oxford pdf 50), so it's a touch more anise than the old bitters. At a barspoon in 175 ml that's a seasoning, which is my reading. **The spark, accepted by Wren:** tangerine peel. Wondrich gives it as "a pro tip" from Eleanor Early's 1937 Caribbean travel book, *Ports of the Sun*, for the wormwood bitters (pdf 125). Steeping it into the absinthe is my adaptation, so the copy never says it's Early's way with absinthe. I'd expect it to pull the wormwood toward a sunny, sweet-peel side, but that taste note is my craft call. **Flavor Matrix consulted, set aside:** no wormwood or tangerine entry (one mandarin line in a recipe, pdf 83). Angostura on top is Wondrich's "rosy cap" (pdf 125) and the 1912 traveller's "green shading gradually into the dark red of bitters near the surface" (pdf 124). I use 4 dashes, not his "good 12", so the red stays a band. My call. |
| **Allergens** (`allergens.py`) | `contains: []`, **veto-free** (counts toward the AD-4 floor). White rum, lime, syrup: none. Angostura: none (bitters aren't `spice`). New row this round, my call: `absinthe_verte_tangerine` is none (a distilled spirit and citrus peel). v1's `wormwood_tangerine_bitters` row stays in the table, unused by this pour. Anise and wormwood are botanicals, not heat (as in *Rosetta*). **Falernum left out on purpose:** Barbados falernum was spiced "chiefly bitter almond" (*Imbibe!* pdf 124), and Oxford lists nutmeg and "sometimes" almonds (pdf 761), so a bought one would be `nuts`. It's also *Show Your Working*'s motif. **Safety (not a veto):** the home wormwood steep was dropped (see v1 → v2). The guest text carries no health words, and the method gives the dose exactly: "one barspoon, no more", never "to taste". |
| **Makeable** | Jar, peeler, sieve, tea towel, rolling pin, a tall glass, a swizzle stick or bar spoon. The only prep is the tangerine absinthe: two days, which the rules allow. Green absinthe is a shop bottle; no brand is named. The style is Wondrich's "wormwood-forward" kind (pdf 125), green from the chlorophyll of its finishing herbs (Oxford pdf 50), proved at 45–74%. *Rosetta* owns absinthe as its base. Here it's a barspoon of seasoning, owned. A bar spoon spun between the palms instead of a stick is my craft call, unsourced. The white rum is unnamed. Wondrich warns that Wray & Nephew overproof is "probably going too far" as the base. |
| **Distance** | Daiquiri · white rum · tall Collins glass, crushed ice. *Show Your Working* is also a crushed-ice rum Daiquiri, but with Demerara overproof in a Zombie glass. *Who's In?* is vodka with a straw, and ours has no straw (Wren). *Is It Just Me* (regular-guy-jester) has Malört, a wormwood liqueur; ours is a barspoon of absinthe, and wormwood is never a closing-line word. Angostura 1919 is *With the Bite In*'s named rum, so ours stays unnamed. **The frost:** *The Alchemist*'s closing line owns "stop stirring once the glass is frosted". Frost is in my method only (Oxford's own stop). My closing line says "goes white" and makes its turn somewhere else. *The Sculptor*'s closing line is "Look up before you pour", so "look up" stays out of mine. |
| **For Hester** | (1) Carypton's parts (Oxford pdf 112) and "discontinued it decades ago" (*Imbibe!* pdf 124). (2) The tangerine is Wondrich crediting Early's 1937 *Ports of the Sun* for the *bitters* (pdf 125). We haven't read Early, and putting it in absinthe is mine. (3) Absinthe's green from chlorophyll, and thujone "resists distillation" (Oxford pdf 50). (4) "Wormwood-forward" absinthe as Wondrich's stand-in (pdf 125). (5) The 1912 colour line (pdf 124), Amphlett's prongs (pdf 123) and "pale" (pdf 125), for the image. |

## Image brief

**Glass and drink:** a tall, straight Collins glass, its outside frosted white, packed with crushed ice mounded above the rim. Through the frost, the drink is pale with a faint green cast: "tall, pale, and frosty" (Wondrich, *Imbibe!* pdf 125), a barspoon of green absinthe in it (green from chlorophyll, Oxford pdf 50). It shades into a thin band of dark red where the Angostura was dashed over the top ice (the 1912 traveller's "green shading gradually into the dark red of bitters near the surface", pdf 124). A plain wooden swizzle stick stands up out of the ice: a long, thin stem, its short prongs hidden at the bottom (Amphlett, pdf 123). No straw.

**Props (story):** a small glass jar of green spirit with curls of tangerine peel steeping in it (the spark); a tangerine beside it, its peel coming away in one long thin spiral; a folded striped deckchair caught halfway through collapsing on the bright floor behind (the person: an ordinary thing taken on, gone gloriously wrong; Wren's deckchair); a folded paper visitor's map, no text, with a neat dotted route that wanders off the edge of the paper (dropping off the tour).

**One impossible detail:** the swizzle stick is still spinning on its own, a faint blur at the top of the stem, though nobody is touching it.

**Must not appear:** people, hands or any body part; Bertie Wooster or any 1920s figure; exhibition buildings, a lion or any Wembley landmark; a straw; mint (that's the Queen's Park Swizzle); a bright emerald, crème-de-menthe green (the drink is pale); a falernum bottle; loose wormwood leaves or herbs; an absinthe spoon, sugar cube or water fountain (*Rosetta*'s ritual); broken or smashed glass, a plate-glass window, police anything (the story's ending stays out); any medicine or life-saving imagery; any text, label, lettering or logo; a second drink.

**Palette:** Pantone 290 C, soft sky blue, in the wall and the light; bright, clean daylight; the tangerine's orange as the one warm note.

**SCENE (ready to paste):** A tall, straight Collins glass on a clean pale table in bright daylight, its outside frosted white, packed with crushed ice mounded above the rim over a pale drink with a faint green cast that shades into a thin band of dark red at the top of the ice. A plain wooden swizzle stick stands up out of the ice. Beside it, a small glass jar of green spirit with curls of tangerine peel steeping in it, and a tangerine whose peel is coming away in one long thin spiral. A folded paper map with no writing lies open, its neat dotted route wandering off the edge of the paper. Behind, a striped deckchair is caught halfway through folding in on itself. Soft sky-blue wall, clean light. The swizzle stick is still spinning on its own, a faint blur at the top of the stem, though nobody is touching it.

## Names

- ***Off the Tour*** *(my pick).* The gift in three words: the good thing is never on the official route, and they're the one who finds it. It praises the person, it's easy to say across a bar, and it shares no word with the tagline or the epigraph.
- ***Three Minutes Later*** (Hester's pick; Wren's list). Bertie's own beat, from the look to the bar (l. 943). I could take it.
- ***Hot Bricks*** (Wren's). Bertie's boredom in his own words. It's funny, but it names the fear, not the gift.
- I could take Wren's *Something Always Happens*. My closing line avoids "something" so nothing echoes.
