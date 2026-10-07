# Tomás: drink v1, The Dude (sage-regular-guy)

Spec: `_studio/specs/sage-regular-guy.json` (v1.1, round 4, 2026-10-02; numbers unchanged from v1).

**Glassware:** tall highball glass (about 300 ml), three ice cubes
**Contains:** veto-free

## Recipe
| amount | item | note |
| --- | --- | --- |
| 50 ml | Fortaleza Blanco tequila (the standard one, not the Still Strength), recommended | it can be hard to find: any blanco tequila made with a tahona, the old stone wheel, does the same job |
| 125 ml | cold soda water | straight from the fridge |
| 1 | small sprig of fresh oregano | pinched once, laid on the ice |

## Method
1. Pour the tequila into a tall glass and add three ice cubes.
2. Stir for three seconds, just enough to chill it.
3. Pour in the cold soda water and stir once.
4. Pinch the oregano sprig once between finger and thumb to wake its scent, and lay it on the ice.
5. No lime, no sugar. The soda turns the tequila citrusy by itself.

## Checks
| check | what the numbers and books say | status |
| --- | --- | --- |
| Structure | *Codex* root family: **Highball**. Core: blanco tequila. Balance: cold seltzer. Seasoning: none in the liquid; aroma from the oregano. The *Codex*'s classic Whisky Highball is spirit and seltzer, with a lemon wedge the authors leave out of their root recipe, built with three cubes, a three-second stir, seltzer, one stir (p. 199); they call it "unnecessary at best" (p. 199). Blanco tequila in place of whisky is the *Codex*'s own suggestion: on its own it is "earthy and vegetal", in a Highball it "suddenly becomes citrusy" (p. 208). The ratio is 2:5, the *Codex*'s preference "in Highballs with more assertive whiskies" (p. 199); carrying it to tequila is my call. I use the classic build, not the Japanese service ritual the *Codex* describes on p. 200 (its "theatrical affectation" is the opposite of this guest). | pass |
| Balance (`balance.py`, style `highball`) | 50 ml at 40%, then 125 ml soda topped: **11.4% ABV, 0.00 g sugar/100 ml, 0.000% acid**: all in range (10-16 / 0-7 / 0-0.6). VERDICT: balanced. Sweep (`sweep.py`): soda 100 ml 13.3%, 150 ml 10.0%; the *Codex*'s 2:6 at 60 ml : 180 ml 10.0%; substitute strength 38% 10.9%, 46% 13.1%, 46% with 150 ml 11.5%, 38% with 100 ml 12.7%: all in range. **One edge, owned:** a 38% tequila with 150 ml soda reads 9.5% (EDGE), so the recipe says 125 ml, not "top up". Melt from three cubes and a three-second stir isn't modelled; by hand, 15 ml of melt takes the spec to 10.5%, 25 ml to 10.0%: still in range. Zero sugar and zero acid are the *Codex*'s own classic (spirit and seltzer only, p. 199); the seltzer's "acidic note" (p. 208) is carbonic and not counted. | pass |
| Pairings | The spark: *Flavor Matrix* pdf 306 (Tropical Fruit page, rendered and read): tequila and papaya share **carvacrol** ("caraway, spice, thyme"), and the same compound is "also shared with" cilantro, cumin, **oregano** and blueberries. So the oregano carries a scent the *Matrix* lists in tequila itself: it leans on the bottle rather than competing with it (Wren's condition). It's laid on the ice, not shaken or muddled, so it gives scent and perhaps a little taste as the drink sits; no sugar, acid or strength. Oregano is in no other pour (grep of every pour file and spec). **Set aside:** lime (the soda does the citrus, *Codex* p. 208; and *Good as It Is* closes on its lime), grapefruit (*Brought Home*'s Paloma), salt (*Half a Rim*'s rim, *Brought Home*'s pinch), agave syrup and honey (a second sweet "real thing"), avocado (the *Matrix*'s surprise pairing for tequila, pdf 40-41: wrong for a long drink), papaya (a second flavour competing with the bottle), thyme (*Matrix*'s aroma word, but caregiver-hero's sprig; oregano is the plainer, kitchen-cupboard herb), and the White Russian (Wren's fence). | pass |
| Allergens (`allergens.py`) | contains: none. **Veto-free** (counts toward the AD-4 floor). New rows added this round on the safe side: `fortaleza_blanco` (distilled agave spirit, no veto) and `oregano_sprig_pinched` (leaf herb, no heat, so no `spice`: spice is heat only). Existing row used as it stands: `soda_water`. | pass |
| Makeable | One bottle, soda water, an oregano sprig from the herb aisle; kit: a jigger, a bar spoon. Fortaleza Blanco is **named and recommended** because the story is the tequila he made (Oxford SAUZA pdf 1742-1743: his tequila, made with a tahona; as of 2025 the agave is still crushed with the stone wheel, Hester A8). Substitute **as a style**: a blanco tequila made with a tahona. Numbers and vetoes are proved for the named bottle at 40%, and swept 38-46% for the style. **Within reach (Hester, r2):** Fortaleza is "on allocation and tough to find anywhere" (Miller, *Distiller* 2025, secondary; Hester W7), so the substitute has to carry most guests, and the recipe note says so plainly. The substitute style is real: other tequilas use a tahona too (Hester F8; Oxford EL TESORO pdf 717, SIETE LEGUAS pdf 1799, PATRÓN pdf 1482, TEQUILA pdf 2002), so the style is named, never a brand, and never "the only tahona". **Answered by Hester (r3):** the 40% label strength is **unsourced** (no page; kept marked so in the row); the recipe names the standard Blanco, not the Still Strength (Miller 2025 lists a separate still-strength blanco), and the 38-46% sweep covers both. The tahona covers their production as a whole (his 2025 answers), so there's no separate expression to name. No price anywhere (unsourced). Never the "100% agave" line on its own (*Half a Rim*). | pass (40% unsourced, swept) |
| Story in the glass | The drink is nothing poured in but the tequila he made and water with bubbles: the plainest long drink there is, so nothing masks what's in the bottle. What it doesn't have is the point too (Wren's test 4): no lime, no sugar, no liqueur, nothing poured to cover. The one small touch is the oregano, which nobody at the table would have picked, and which brings forward something already there: a scent the tequila shares. That's my reading, not a fact about Fortaleza's own serve. Copy never says "his recipe" or "how he drinks it". | pass |
| Siblings | *Further Than Me* (sage-caregiver) is also a tall glass with an herb: theirs is a shaken gin Southside with lime-and-sugar balance and **two sprigs clapped and set standing**; mine is a built spirit-and-soda with **one sprig pinched and laid flat on the ice**, never "clap", never two. *What It Rests On* (bourbon Old-Fashioned, popcorn-demerara): no overlap. *Brought Home* (mezcal Paloma, honey, salt, grapefruit): apart by spirit, sweetener and citrus. Phrases avoided in the closing line: "say", "tell", "keep" and "let go" (Wren r3: *Not the Same*'s "say what you're keeping", her y6 "Tell them", the tagline's "let"), "matters" and "part" (the tagline), "the one thing" (*Set out everything…*), "show someone" (*Where You Stand*), "Leave the lime in" (*Good as It Is*), "Stir once" (innocent-creator's closing line), "fuss" (Wren's fence), "the real thing" (*Kept*), "already in the…" (eight pours use it). | pass |

**closingLine:** *No lime: the soda turns the tequila citrusy by itself. Next time the table's arguing, speak up once, for the small thing nobody else noticed.*

## Image brief
A tall, plain highball glass on a worn kitchen counter in warm, soft, low-contrast afternoon light. The drink is crystal clear and colourless, with fine bubbles rising past three clear ice cubes; no lime, no fruit, no salt on the rim. One small sprig of fresh oregano, with small rounded soft-green leaves, lies flat across the top of the ice, not standing. Beside the glass: a plain clear glass bottle of tequila with no label or text; a chipped coffee mug; a small bunch of fresh oregano on a wooden chopping board; a fist-sized rough grey stone, heavy and plain, like a piece of an old mill wheel. The one impossible detail: the bubbles in the glass rise in one slow, steady circle, like a stone wheel turning. Behind, a warm beige wall (Pantone 4675 C). Easy, lived-in, unpolished. Must not appear: no rug or patterned carpet, no bowling, no bathrobe or sunglasses, no White Russian or any creamy drink, no second drink, no lime or lemon, no agave plant, no labels or text, no bar setting, no people.

## Names
- *Small and Real*
- *Not the Name* (note: shares "Name" with *Before It Had a Name* in the registry)
- *Easy on the Rest*
- *Worth the Keeping*
- *Whatever They Call It* (Wren)
- *What Stayed* (Hester)
- **My pick (held to the vote): *Small and Real*** (it recognises Wren's one true thing, the little they won't let go; it praises the person, not the drink, and leaves the turning to the closing line). I could take *Whatever They Call It*.
