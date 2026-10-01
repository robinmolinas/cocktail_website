# Tomás: drink draft, explorer-ruler v1.1 (round 5 of 6)

v1.1 (round 5): the drink doesn't move (spec v1, version text updated). Hester's T1-T3 applied: T1, the Codex's fizzy-syrup warning is on p. 46, not 47; T2, the bottle is "named for him and built on a recreation of the whisky his expedition left under its hut" (A24), never "made in memory of"; T3, "dried fruit counts as nuts" is now sourced to the table's own safe-side call and labelled mine. Closing line: Wren's ruled line, accepted. Name pick: *Far Enough*.


v1 (round 4): Wren ruled in round 3 that the plum Old-Fashioned walks, on three conditions: the plum is a nod to the depot, never "the plums they found"; the syrup is prep, never the gesture; and "ripe" stays. **Two changes came after her ruling, both from my numbers, and here they are plainly.** (1) v0 (r3): the syrup went from 1:1 to rich (1 part plum to 2 of sugar), because a 1:1 syrup at 10 ml went OUT on acid at the sharp end of ripe plums (0.070% vs 0.05%). (2) v1 (r4): the dose drops from 7.5 to 6.25 ml (1¼ teaspoons), because a low-melt worst case (one big cube melting 15-20% instead of 24%) took the 7.5 ml version over the sugar band (8.56-8.93 g vs 8.5). Hester r3 applied: the Carlsbad plums were *preserved*, so the fresh plum is our stand-in, owned in one clause; the syrup is *adapted from* the Codex's strawberry syrup; plum is *on the Grain wheel*, not "a pairing". Spec: `_studio/specs/explorer-ruler.json`.

## Recipe

- **serves:** 1
- **glassware:** a heavy double old-fashioned tumbler (about 300 ml), with one large ice cube
- **contains:** `[]` (veto-free)

| amount | item | note |
| --- | --- | --- |
| 60 ml | Shackleton blended malt Scotch whisky (40%), recommended, or any Highland blended malt Scotch, 40-43% | a blended malt named for him and built on a recreation of the whisky his expedition left under its hut |
| 6.25 ml (1¼ teaspoons) | rich plum syrup, made at home from ripe plums | a nod to the preserved plums waiting at the last depot on the way back; fresh plums stand in for them |
| 2 dashes | Angostura bitters | |
| 1 | large piece of orange peel | |

## Method
1. **The plum syrup (about 20 minutes; makes about 220 ml, enough for about 35 drinks).** Stone 100 g of ripe plums and throw the stones away whole; don't crack them. Blend the flesh, skins and all, until smooth. Put it in a small pan with 200 g of white sugar and warm it gently, stirring, just until the sugar has dissolved; don't let it boil. Press it through a fine sieve and let it cool. It keeps in the fridge for about a week; if it ever tastes fizzy, throw it out.
2. Put the plum syrup and the bitters in the tumbler, then the whisky, and stir to mix.
3. Add one large ice cube and stir for about 30 seconds, until the outside of the glass feels cold.
4. Twist the orange peel over the top so its oils fall on the drink, then drop it in.

**closingLine:** *Drink the first sip to the top you turned round from. It was still the right place to turn.*

- **Ruled by Wren (r4), accepted by Tomás (r5).** Checked against the Method: nothing in it makes the syrup the gesture; the act is the toast, the position is "the right place to turn". It's the gain, not the y5 position again ("file it under failure" stays in y5). Grepped: no closing line in the registry has "first sip", "right place" or "turned round"; "first sip" appears only in other pours' Checks and readings, as a description of a drink's layering, never as a toast or a motif.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family.** "Nearly any spirit can be used as the core as long as the other ingredients support and accent that spirit" (p. 9). **Core:** blended malt Scotch. **Balance:** a rich plum syrup instead of plain syrup or a sugar cube. **Seasoning:** Angostura and orange oil. The Codex warns that in an Old-Fashioned "increasing the amount of sweetener quickly sends the drink into cloying territory" (p. 64), which is why the dose is 1¼ teaspoons and was cut once already. **The syrup is adapted from the Codex's Blended Strawberry Syrup** (p. 47: equal weights of fruit and sugar, blended and sieved). Mine uses plums, twice the sugar to the fruit, and gentle warmth so that much sugar dissolves. That's my adaptation, not the Codex's plum syrup. The Codex's own warning carries over: taste a homemade syrup first, and don't use it if it's fizzy, because "it means the syrup has begun to ferment" (p. 46). |
| Balance (Arnold; style `built`) | `balance.py` v1: 67.8 ml, 24% fixed dilution, 84.1 ml. **Final 29.4% ABV / 7.04 g / 0.033% acid, all in range** (27-32 / 6.5-8.5 / 0-0.05). Sugar sits near Arnold's single figure of ~7.6 g (note). **Sweep** (balance.py's own `analyse`, with the table and melt patched): plum acid at both ends (0.6% and 1.0% in the fruit, so 0.27% and 0.45% in the syrup), and melt at 15 / 20 / 24 / 30%. **The named bottle at 40% is in range in every case** (28.0-31.7%, 6.72-7.59 g, 0.019-0.036%). A 43% substitute is in range at 24-30% melt (30.1-31.5%), edges at 20% (32.6%) and goes OUT if barely melted (15%: 34.0%). Hence the 30-second stir, and the substitute is "40-43%". 44% edges even at standard melt (32.2%), so it's out of the substitute range. **Rejected:** (a) 1:1 syrup, 10 ml: 0.070% acid at the sharp end, OUT. (b) 1:1, 7.5 ml: 6.01 g (edge, thin) and 0.054% (edge). (c) Rich, 7.5 ml (v0): in range at 24% melt (28.8% / 8.28 g / 0.039%), but 8.56-8.93 g at 15-20% melt, so sugar OUT. **Unsourced:** the plum values (about 9.9 g sugar/100 g, 0.6-1.0% malic acid) are my estimates, and the row is set at the sharp end. The sugar's volume is LI's (0.62 ml/g, pp. 136-137). Bitters' volume is counted by balance.py (1.6 ml). "Ripe" stays in the recipe because ripeness is what holds the acid in (Wren r3). |
| Pairings | **The plum, from the story:** the Bluff depot was "the one which I had told Joyce to lay out", and it held "Carlsbad plums, cakes, eggs, plum puddings" (Shackleton 1911, src 3919-20, 3977-79). The Carlsbad plums were a **preserved** plum sweet (Hester r3: an 1891 London cookbook files them with dried fruits and prunes, a 1900 exhibit with glacé fruits; not "candied" and not "stuffed"). **The fresh plum is our stand-in**, chosen because preserved or dried fruit would go in as nuts on the safe side and cost the pour its veto-free place. That's the table's own call, not a studio rule: its `apricot_steeped_rye` row classes dried fruit as nuts because "dried fruit is commonly packed alongside nuts" (my call, unsourced, made in an earlier pour), and I'd make the same call for a preserved plum. It's a nod to the depot and the planning behind it, never "the plums they found" (Wren r3). **In the books:** plum is **on the *Flavor Matrix*'s Grain wheel** (pdf 137, printed p. 127, rendered, in the Fruity arc), and whisky maps to Grain (STUDIO-RULES 3). It isn't among Grain's listed Best or Surprising Pairings (pdf 136), so I call it "on the wheel", never "a pairing". Bourbon whiskey is on the Stone Fruit wheel (pdf 237, rendered), and the Matrix roasts plums with bourbon, in a dessert (pdf 119). Scotch isn't named on any of these, so Scotch with plum is my craft call. The Stone Fruit text says plums' flavour comes from "fruity lactones with aromas of apricot, banana, and orange" (pdf 236), and that's why the peel is orange. **Consulted and set aside:** the plum pudding's spices (nutmeg counts as nuts) and the depot's eggs (a flip would lose veto-free, and the classic is "made from what keeps"). |
| Allergens | `allergens.py`: `contains: []`, **veto-free** (counts toward the AD-4 floor). Fresh plum flesh is stone fruit, not a nut, as the table's `cherry_fresh`. The stones come out whole and are never cracked, because kernels count as nuts (as `creme_de_noyaux`), and Method step 1 says so. Blended malt is a distilled grain spirit, so not gluten (STUDIO-RULES 4). There's no labelled fining for the named bottle that we know of. New rows, all mine: `shackleton_blended_malt`, `scotch_blended_malt`, `plum_syrup`. |
| Makeable | **Kit:** a blender, a small pan, a fine sieve, a jigger or teaspoon, a bar spoon, a heavy tumbler, a large-cube ice tray. **Named bottle:** Shackleton blended malt, 40%, no age statement (*The Spirits Business* and scotchwhisky.com, April 2017, via Hester). *The Spirits Business* says the brand is "inspired by" him, with Paterson's re-creation as its "foundation" (Hester r4). So it's always "named for him and built on a recreation of the whisky his expedition left under its hut" (A24): never "made in memory of" (no page says it), never the hut whisky itself, never the 50,000-bottle replica, and no type or age for the original. Any claim that it's on sale today gets dated. **Substitute style:** a Highland blended malt Scotch, 40-43% (the sweep). The numbers and vetoes are proved for the named bottle at 40% and for the style's range. **Prep:** 20 minutes for about a week of syrup. |

## Image brief
- **Glass:** a heavy, thick-bottomed double tumbler (about 300 ml) with one large clear cube (spec).
- **Drink:** amber whisky with a slight reddish cast from the plum syrup. My estimate, unsourced; describe it, never claim it.
- **Garnish:** one large piece of orange peel, inside the glass against the cube (Method step 4).
- **Optional story prop, set back:** two or three ripe fresh plums, one halved with its stone out. Fresh, not preserved, and nothing laid out as portions.
- **Setting (persona imagery):** a desk with an aerial map or survey chart, grid lines, a brass compass or surveying tool, Pantone 282 navy in the shadows and the paper. Calm and ordered, lit from one side.
- **Never:** the sea, a ship, ice floes, a flag on a pole or a summit, sledges, tents, plum pudding, a box of sweets, brand labels, any year, a second glass, or anything set out as shares.

## y4 check (for Wren's v2)
- Wren's v2 sentence ("An Old-Fashioned is built from things that keep… I've added one that doesn't. The plums at his depot were preserved ones, a boxed luxury; mine are fresh and blended into a rich syrup…") matches the Method: fresh, ripe plums, blended, made into a rich syrup that keeps about a week. "Preserved" is Hester's word. "Rich" is true (2 of sugar to 1 of fruit).
- Bottle line: "a blended malt named for him and built on a recreation of the whisky his expedition left under its hut" (A24) matches the recipe note and Makeable word for word.
- "One big cube in a heavy tumbler" matches the spec. Nothing in y4 claims the Codex or the Matrix.

## Names (three needed; Wren and Robin pick)
- **Pick: Far Enough** (with Wren and Hester). It's the one true thing in two words: as far as everyone can get back from, and it's warm, never praise. It sits beside the tagline ("You'll take them anywhere. You'll bring every one of them back.") without echoing it. A bartender can say it across a bar. Registry: no hits.
- **Far Enough** (Wren's).
- **Last Outward March** (Hester's). His own words for the turn (src 3599). It's the story's, not the guest's, and sterner than the person. It's the strongest runner-up.
- **Laid Out** and **Good Call** (mine), struck by Wren in r4. *Laid Out* reads as knocked flat, or a body laid out, which is the fear. *Good Call* is praise, and it sits next to *Making the Calls*. I agree with both.
