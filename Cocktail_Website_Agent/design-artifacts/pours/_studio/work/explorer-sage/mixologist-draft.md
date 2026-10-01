# Tomás: drink draft, explorer-sage v0 (round 3 of 5)

v0 (round 3): the Zombie as Jeff Berry printed it (Oxford ZOMBIE pdf 2229), with every part named. It's shaken and poured over crushed ice, never blended. Berry's three rums are kept exactly, and the other proportions are mine. Spec: `_studio/specs/explorer-sage.json`.

**Pending (marked wherever they touch the draft):** (P1) Wren on the drink itself and its size; (P2) Wren on the grenadine (keep one plain teaspoon, or drop it); (P3) Hester on which Pernod (Oxford says "Pernod", the Codex says "Pernod Absinthe").

**Wording rule (Hester r2):** the recipe is always "the Zombie as Berry printed it". It's never "Beach's own" and never "the notebook's". The Codex Zombie Punch is a modern homage, and I cite it only for the method (shaken, over crushed ice).

## Recipe

- **serves:** 1
- **glassware:** a tall Zombie glass (about 590 ml), filled with crushed ice
- **contains:** `[]` (veto-free)

| amount | item | note |
| --- | --- | --- |
| 45 ml | gold Puerto Rican rum | the first of Berry's three rums |
| 45 ml | gold Jamaican rum | the second |
| 30 ml | Lemon Hart 151 Demerara rum (75.5%), recommended, or any Demerara (Guyanese) overproof rum of about 75% | the third, named in the recipe Berry printed; very strong |
| 37.5 ml | fresh lime juice | |
| 20 ml | fresh grapefruit juice | half of "Don's Mix", written out |
| 10 ml | cinnamon syrup, made at home | the other half of "Don's Mix" |
| 22.5 ml | falernum, made at home (lime zest, cloves, rum and sugar; no almond, no nutmeg, no ginger) | a bought falernum may hold almond or nutmeg, so this one is made where you can see what goes in |
| 1 teaspoon (5 ml) | grenadine, plain, bought | *pending Wren (P2)* |
| 1 dash | Angostura bitters | |
| 6 drops | Pernod | *pending Hester (P3)* |
| 1 | mint sprig | |

## Method
1. **The falernum (10 minutes, then a day; makes about 375 ml, enough for about 16 drinks).** With a vegetable peeler, take the green zest off 4 limes, leaving the white pith behind. Put the zest and 12 whole cloves in a clean jar with 150 ml of the gold Jamaican rum, close it and leave it at room temperature for 24 hours. Strain it. In a small pan, warm 200 g of sugar with 100 ml of water, stirring, just until the sugar dissolves, then let it cool. Stir the syrup into the strained rum. Write everything that went in on the jar's label. It keeps in the fridge for a few months.
2. **The cinnamon syrup (5 minutes, then 30 minutes off the heat).** Warm 200 g of sugar in 200 ml of water with 3 cinnamon sticks, stirring until the sugar dissolves, then let it simmer for 2 minutes. Take it off the heat and leave it for 30 minutes, then strain. It keeps in the fridge for about two weeks.
3. Fill the tall glass with crushed ice so it chills while you mix.
4. Put everything except the mint in a shaker. Add the grapefruit juice and the cinnamon syrup separately: that's "Don's Mix", two parts grapefruit to one of cinnamon.
5. Fill the shaker with ice cubes, close it and shake hard for about 10 seconds.
6. Strain over the crushed ice, and top the glass up with more crushed ice.
7. Slap the mint sprig once between your palms to wake its scent, then stand it in the ice.

**closingLine:** *Write everything that went in on the label. Then give the recipe to whoever asks.*

- Candidate only, for Wren: it's her seed (r2) made into an act plus the gift. Registry and pour grep: no "label" or "whoever asks" in any sibling's closing line or proposal frame. The act matches Method step 1.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Daiquiri family, tiki branch.** The Codex places the Zombie Punch with the Daiquiri variations (p. 126), and a Daiquiri variation keeps "a core assemblage of spirit, acidity, and sweetness" (p. 127). **Core:** three rums, split (Codex p. 104: a split base). **Balance:** lime and grapefruit for acid, with homemade falernum, cinnamon syrup and a teaspoon of grenadine for sugar. **Seasoning:** cloves and lime zest (inside the falernum), cinnamon, Angostura, six drops of Pernod, and mint on top. **The parts are the ones Berry printed** (Oxford ZOMBIE pdf 2229), with Don's Mix split into its two named halves. **The proportions are mine** (see Balance). **The method is not his:** his recipe blends for no more than five seconds with 3/4 cup of crushed ice, then adds ice to fill. I shake on cubes and strain over crushed ice, as the Codex's modern Zombie Punch does (p. 127). That keeps the blender out (it's *For Good*'s) and needs no machine. |
| Balance (Arnold; style `shaken`) | `balance.py` v0: 216.1 ml, 57.7% dilution, 340.7 ml. **Final 18.4% ABV / 7.09 g sugar / 0.809% acid, all in range** (15-19.7 / 5-8.9 / 0.76-0.94). Initial 29.0% / 11.18 g / 1.275%, and dilution 57.7%, all in range. **Berry's printed proportions, on the same formula, come out OUT:** 21.0% strength, 0.56% acid and 4-5 g sugar (the sugar depends on the falernum: sweep in `mixologist-r2-notes.md`). So I raised the lime (22.5 → 37.5 ml), Don's Mix (15 → 30 ml) and the falernum (15 → 22.5 ml), and kept his rums exactly (45/45/30). This is my shake on paper, not a verdict on his five-second blend, which waters the drink down more. The acid shortfall would hold at any dilution. **Sweep** (balance.py's own `analyse`, with table values patched): gold Jamaican at 43% 18.7% and at 46% 19.1%, in range. Demerara overproof at 69% gives 17.9%, in range. Falernum sugar at 48 or 59 g/100 ml gives 6.73 or 7.45 g, in range. A sweeter grapefruit (12 g sugar, 1.8% acid) gives 0.773% acid, in range but at the low end. Sharper lime (6.5%) gives 0.864%. The Pernod read as a 68% absinthe changes nothing at 6 drops. **Grenadine (P2):** dropped, it gives 18.8% / 6.26 g / 0.817%, in range. With falernum at 25 ml it gives 6.59 g. That corrects my r2 line: 2.5 ml more falernum keeps the drink in range, but it doesn't fully put the grenadine's sugar back. **Size flag (P1):** about 62.7 ml of pure alcohol in one glass (340.7 ml × 18.4%), roughly six UK units (my arithmetic). That's about three ordinary cocktails. Strength per sip sits inside the sours range. It's the quantity that's big, and the crushed ice keeps melting into it. Robin set no strength ceiling. I flag it here, and the reading must never joke about the strength or the two-per-guest limit (Wren's medicine trap). **Unsourced:** the falernum's values (16% and 53.5 g/100 ml, my arithmetic), the cinnamon syrup (simple syrup's value), the grenadine (65 g, label-typical) and the Pernod (40%). |
| Pairings | **The pairings are in the recipe itself:** rum, lime and sugar with clove are falernum's own base, which Oxford describes as rum, sugar and lime with Caribbean spices "such as cloves" (FALERNUM pdf 761). Grapefruit with cinnamon is Don's Mix as Berry printed it (ZOMBIE pdf 2229). **The *Flavor Matrix* was consulted and set aside.** Its citrus entry lists ginger among the best pairings (pdf 80), but our table classes ginger as spice (heat), so it stays out of the falernum, and nothing else on the page earned a place. Following Robin's rule (2026-09-30), what makes the drink interesting comes from the books instead: the code name broken open in the method (Don's Mix written out as its two halves) and the falernum made at home. Both are personal to someone who wants the whole answer. **Story tie:** nothing in the glass has to be taken on trust. That's my reading of the gift Wren named, and I offer it to her, not as a claim. |
| Allergens | `allergens.py`: `contains: []`, **veto-free** (counts toward the AD-4 floor). `--check ""` matches. **Falernum is the line I'd guard:** Oxford says spices "such as cloves, ginger, and nutmeg" and that "almonds are sometimes added" (pdf 761). On the safe side, any bought falernum counts as nuts, and a gingered one as spice. This one has lime zest, cloves, rum and sugar only. **Swapping in a bought falernum loses the drink its veto-free place**, so the recipe note says why it's homemade. Cinnamon and cloves are baking spices, not heat (STUDIO-RULES 4). No nutmeg anywhere, so there's no nutmeg garnish. No orgeat. Rums are distilled from cane, not grain. New rows, all mine: `rum_gold_puerto_rican`, `rum_gold_jamaican`, `rum_lemon_hart_151`, `falernum_homemade`, `cinnamon_syrup`, `grenadine`, `pernod_anise` (all `none`). |
| Makeable | **Kit:** a shaker and strainer, a jigger, a vegetable peeler, a small pan, a jar, a fine sieve, a tall glass, crushed ice (bought, or cubes wrapped in a tea towel and hit with a rolling pin; my craft call). **Prep:** the falernum takes 10 minutes plus a day and makes about 16 drinks. The cinnamon syrup takes about 35 minutes. **Named bottle:** Lemon Hart 151, recommended because it's in the recipe Berry printed. The substitute is a style, **any Demerara (Guyanese) overproof rum of about 75%**, swept down to 69%. Numbers and vetoes are proved for the named bottle at 75.5% and for the style. Lemon Hart 151's availability varies by country (my knowledge, unsourced), so the style matters. **Safety:** 151-proof rum is flammable. No flame anywhere in the drink or the image. **Other rums:** generic styles, gold Puerto Rican and gold Jamaican, as Berry printed them. **Pernod (P3):** if Hester finds it's the anise spirit, the line reads "Pernod (anise)"; if absinthe, the room decides whether six drops sits too near *Rosetta*. Either way it's six drops and changes no number. |

## Image brief
- **Glass:** a tall, plain, straight-sided Zombie glass (about 590 ml), clear, with no tiki carving or mug. It's packed to the rim with crushed ice (spec).
- **Drink:** cloudy amber-orange, from the gold and Demerara rums, grapefruit and lime. That's my estimate from the bottles, unsourced, so describe it and never claim it. If the grenadine stays, at most a faint warmth, never red or pink.
- **Garnish:** one mint sprig standing in the ice (Method step 7). Nothing else: no parasol, cherry, orange slice or pineapple (the Codex's garnish isn't ours).
- **Props:** a small glass jar of the homemade falernum, with lime zest and whole cloves visible inside and a plain paper label handwritten with its contents (illegible at this distance, no brand). Two cinnamon sticks, half a grapefruit and a lime, set back from the glass.
- **Setting (persona imagery):** a quiet desk in window light, with an open notebook showing a plain handwritten list (not readable, no cipher or code marks). Pantone 2955 C deep blue in the shadows and the notebook's cover. Calm focus, not a party.
- **Never:** a tiki mug, skulls, palm trees, grass skirts, torches or flames, a blender, an absinthe or Pernod bottle, a code or cipher, a padlock or cage, film reels, cameras or a Hollywood sign (Wren's day-job trap), microfilm, a likeness of anyone, any brand label, any year, two glasses.

## Names (three needed; Wren and Robin pick)
- **Pick: In Full.** It's the gift, said in two words: the whole answer, handed over. It's about the person, not the drink (the person wants the answer complete, not the chase), and a bartender can say it across a bar. Registry: no hits.
- **Rum and Fruit Juice.** The answer that explained nothing, used as the name of the drink that finally explains it. It's witty, and the recipe is the rebuttal. But it's the story's line, not the person's, and it may spend the reading's best quote in the title block. Strong runner-up.
- **Spelled Out.** Plain and warm, but it leans on the code-breaking (Wren's trap 3), so it's my weakest.
