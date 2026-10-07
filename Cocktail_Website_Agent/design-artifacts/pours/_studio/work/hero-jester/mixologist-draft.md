# hero-jester · The Storyteller: drink v1 (Tomás, round 2, 2026-10-04)

Spec: `_studio/specs/hero-jester.json`. Family: Daiquiri (tiki), Codex p. 136. The Mai Tai to the formula Vic dated to 1944, as Oxford prints it (MAI TAI pdf 1211–1212), with two changes of mine: the orgeat's almonds are toasted first (the spark), and the sugar syrup is cut from 7.5 ml to 5 ml. So it's never "his recipe": it's "Vic's formula, with the almonds toasted".

**Glassware:** double old-fashioned glass (about 350 ml), packed with crushed ice
**Contains:** nuts

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | Appleton Estate 12 Year Old Rare Casks Jamaica rum (43%), recommended, or any aged Jamaican rum, the oldest you can find | Vic's seventeen-year Wray & Nephew is long gone. Appleton Estate became part of J. Wray and Nephew, the firm behind Vic's rum, in the early twentieth century. |
| 30 ml | fresh lime juice (about one lime; keep half the shell) | measure it: a big lime's juice pushes the drink too sharp |
| 15 ml | orange curaçao (a dry style, about 40%) | |
| 15 ml | toasted almond orgeat (an almond syrup scented with orange flower water), made at home (method, step 1) | the almonds go in the oven first, like anything a cook wants to taste of more |
| 5 ml (1 teaspoon) | simple syrup (1:1) | Vic wrote "a dash" |
| 1 | big branch of fresh mint, standing up out of the ice | |
| ½ | the squeezed lime shell, dropped in | |

## Method

1. Make the almond syrup a day ahead, or that morning. Spread 150 g blanched almonds on a baking tray and toast them in the oven at 180°C for 8 to 10 minutes, until pale gold and smelling toasted. Let them cool. Blend them with 300 ml cold water for a minute, leave it 30 minutes, then squeeze it all through a clean cloth into a bowl. Weigh the almond milk, pour it into a pan with the same weight of white sugar, and warm it gently, stirring, until the sugar has gone (don't let it boil). Off the heat, stir in ¼ teaspoon orange flower water. Bottle it: about 400 ml, two weeks in the fridge.
2. Make crushed ice: wrap a tray of ice cubes in a clean tea towel and bash it with a rolling pin.
3. Squeeze the lime, measure 30 ml of juice, and keep half the shell.
4. Put the rum, lime, curaçao, almond syrup and sugar syrup in a shaker with a big scoop of the crushed ice. Shake hard for about ten seconds.
5. Pour everything, ice and all, into the glass. Pack more crushed ice on top until it mounds over the rim.
6. Push the half lime shell into the ice, cut side up. Squeeze the mint branch once in your hand so it smells, and stand it up beside the shell.

**closingLine:** *Take the almonds to gold before anything else: that's where the taste is. Next time someone asks how it went, give them what happened, nothing added.*

## Checks

| Check | Result |
| --- | --- |
| **Structure** | Daiquiri family (tiki), Codex p. 136: the Mai Tai is "funky rums, almond-laced orgeat, orange liqueur, and lime juice", served over crushed ice, which "lightens the flavors". **Core:** 60 ml aged Jamaican rum (Vic's was one Jamaican rum, Oxford pdf 1211; the Codex and *Joy* pdf 328 split it with Martinique rum, a split I don't follow). **Balance:** 30 ml lime against 15 ml orgeat, 15 ml curaçao and 5 ml syrup. **Seasoning:** the curaçao, the orange flower water in the orgeat, the mint's scent. **Codex warning heeded:** a Mai Tai "can easily teeter toward being too sweet" (p. 136), so the syrup is cut (below). |
| **Balance** (`balance.py`, style `shaken`) | 125 ml → 54.5% dilution → 193 ml. Initial 25.4% ABV / 13.25 g / 1.44% acid. **Finished 16.5% ABV / 8.58 g / 0.93% acid: all in range.** One EDGE: initial acid 1.44 (range 1.2–1.4), a lime-forward start that's in range once shaken (0.93, inside 0.76–0.94). **Versions the numbers rejected:** Oxford's own 7.5 ml syrup → finished sugar 9.22 (EDGE, over 8.9); Vic's "Rock Candy Syrup" as a rich syrup (89 g) → 10.27 (OUT); a sweet Dutch curaçao (35 g, 30%) → 10.06 (OUT). So: 5 ml of plain 1:1 syrup, Vic's "dash", and a dry curaçao. **Sweeps (5 ml syrup):** lime 27.5 ml → 16.8 / 8.70 / 0.87 ok; lime 32.5 → acid 0.99 OUT, so the recipe says "measure it", 30 ml; rum 40% (lime 27.5, dry curaçao) → 15.9 / 8.38 / 0.88 ok; rum 46% with a sweet curaçao → sugar 9.48 EDGE; orgeat sugar 55 g → 8.06 ok, 70 g → 9.22 EDGE. **Crushed ice keeps melting:** +10 ml melt → 15.4 / 8.04 / 0.87 ok; +20 ml → 14.5% EDGE; +30 ml → 13.7% OUT. That's the last sips of any crushed-ice drink, which the Codex says lightens it "just the right amount" (p. 136). Unsourced values: orange curaçao (40%, 25 g, swept 20–35 g and 30–40%); Appleton 12 at 43% (label, Hester checks); the orgeat's 61.7 g/100 ml is computed (1:1 by weight, sugar 0.62 ml/g, LI p. 51), the almond milk's own sugar ignored. Strength: about 32 ml of alcohol, no ceiling in the rules. |
| **Pairings** | Rum, lime, almond and orange is the classic's own (Oxford calls the formula "elegant, layered, timeless", pdf 1212). **The spark, from the *Flavor Matrix* (pdf 184, Nut entry):** nuts "should be toasted to enhance their flavor… Toasting also creates Maillard reactions", and the entry's best pairings include caramel and roasted meat; its surprising pairings include citrus, which the lime already is. So the almonds are toasted before they become orgeat: rounder, deeper, more like browned sugar against the funky rum. **Why it's this person's:** before the shark and the Trader, Vic was "proprietor, bartender, and chef" of an Oakland barbecue shack, and he "drew on his own culinary skills" for his drinks (Oxford BERGERON pdf 258). The cook's step comes from the plain record, and it's the step that makes the drink taste better. **Set aside from the same Matrix entry:** pineapple (rival hotels "mixed rum with pineapple juice or orange juice" and called it a Mai Tai, Oxford pdf 1211: the name without the drink, so it's out by the story) and mango (*Straight Up*'s). |
| **Allergens** (`allergens.py`) | `contains: ["nuts"]`, from the toasted almond orgeat (almonds; STUDIO-RULES 4 lists orgeat as nuts). The plan's lean and Wren's call: declare it. A seed orgeat would clear the veto but lose the spark and Vic's "subtle almond flavor" (*Joy* pdf 327). Orange flower water: none (Robin 2026-09-25). Appleton, curaçao, lime, syrup, mint: none. The family keeps nine veto-free rows (plan). New rows added this round, on the safe side: `orgeat_toasted_almond` (nuts), `rum_appleton_12` (none), `lime_shell_half` and `mint_branch` (garnish, none). |
| **Makeable** | Oven, blender, clean cloth, pan, shaker, tea towel and rolling pin. The orgeat is the only prep. A bought orgeat makes a fine Mai Tai but not this one; the numbers hold for one between 55 and 61.7 g sugar per 100 ml and go EDGE at 70. Appleton 12 is proved at 43% and swept 40–46%; the substitute style ("any aged Jamaican rum, the oldest you can find") is Oxford's own advice (pdf 1212). |
| **For Hester** | (1) Appleton 12's label name and 43%. (2) Scope of pdf 132: Appleton is *part of* J. Wray and Nephew; never "the same rum" or "the same distillery" as Vic's seventeen-year. (3) "A dash of Rock Candy Syrup" is Vic's 1970 telling, via tradervics.com, via Regan (*Joy* pdf 327). (4) "Proprietor, bartender, and chef" and "his own culinary skills" (pdf 258) carry the spark's link. (5) Vic's curaçao was "from Holland" (*Joy* pdf 327); mine is a dry style, so nothing may say "his curaçao". |

## Image brief

**Glass and drink:** a heavy double old-fashioned glass packed with crushed ice mounded above the rim; the drink a hazy gold under the ice (the rum's gold is Vic's own word for his, "surprisingly golden", *Joy* pdf 327; the haze from the almond milk in the orgeat is my craft call); a tall branch of fresh mint standing up out of the ice, and half a squeezed lime shell pushed into the ice beside it, cut side up.

**Props (story):** a small baking tray of toasted almonds, pale gold, cooling on a folded tea towel (the cook's step); a wooden citrus squeezer with the other half lime; a scrapbook-style notebook lying open, pages full of handwriting too small to read (the telling); a plain unlabelled bottle of golden rum.

**One impossible detail:** the mint branch's shadow on the wall behind is a full-sized palm tree, its fronds moving as if in a breeze. A small thing, told large.

**Must not appear:** pineapple, cherries, paper umbrellas, tiki mugs or Hawaiian kitsch (the rival hotels' Mai Tai, Oxford pdf 1211); any shark; any crutch, cane, prosthetic or anything about a leg; any text or label; a second drink.

**Palette:** Pantone 2597 C (mythic purple) in the dusk behind; warm, cinematic lamplight on the glass, the almonds and the notebook.

**SCENE (ready to paste):** A heavy double old-fashioned glass on a worn wooden counter, packed with crushed ice mounded above the rim over a hazy golden drink, a tall branch of fresh mint standing up out of the ice and half a squeezed lime shell pushed into it, cut side up. Beside it, a small baking tray of pale-gold toasted almonds cooling on a folded tea towel, a wooden citrus squeezer holding the other half of the lime, a scrapbook-style notebook lying open with pages of tiny unreadable handwriting, and a plain unlabelled bottle of golden rum. Warm, cinematic lamplight; a deep mythic-purple dusk behind. On the wall, the mint branch's shadow is a full-sized palm tree, its fronds stirring as if in a breeze.

## Names

- ***Ask Me Again*** *(my pick).* The gift said out loud: people ask for the same one again. It praises the person, not the drink, and it's easy to say across a bar.
- ***Hinky Dink's.*** The barbecue shack Vic ran before he was the Trader (Oxford pdf 258): the plain beginning, and a name you'd smile saying (Hester's pick too; spelling confirmed in her anchors, F4–F5). I could take it.
- ***Just as Good.*** Wren's position in three words: the plain version is just as good. Weaker: it could read as a review of the drink.
- I could take Wren's *Frankly Speaking* if Hester clears it.
