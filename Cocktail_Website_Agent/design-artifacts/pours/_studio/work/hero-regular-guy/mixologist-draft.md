# Tomás · draft v1.1 · hero-regular-guy (The Firefighter) · round 5, 2026-10-01

(v1.2, round 6: Hester's T1–T5 applied as worded; no number moved. v1.1: nothing in the glass changed. Bénédictine reclassified to nuts; closing line is Wren's rewrite; colour words fixed; name moved to Wren's.)

Spec: `_studio/specs/hero-regular-guy.json` (v1). balance.py: **balanced, all three in range** (13.9% / 6.39 g / 0.75%). allergens.py: **nuts** (Cherry Heering, my safe-side call; Bénédictine, nutmeg on Oxford pdf 256), and `--check nuts` matches.

**Glassware:** a large rocks glass (about 400 ml), with one large ice cube
**Contains:** nuts

## Recipe

| amount | item | note |
| --- | --- | --- |
| 30 ml (1 oz) | London dry gin (any, 40–47%) | one of each: that's the whole recipe |
| 30 ml (1 oz) | Cherry Heering (recommended), or another red cherry liqueur | the red cherry brandy Singapore drank then; it's what turns the drink pink |
| 30 ml (1 oz) | Bénédictine (recommended), or another sweet herbal liqueur | a French liqueur of herbs and spices, finished with honey |
| 30 ml (1 oz) | fresh lime juice (about one lime) | |
| 90 ml (3 oz) | cold soda water | |
| 3 dashes | Angostura bitters | on top, last |
| 1 | large ice cube | |

## Method

1. Pour the gin, Cherry Heering, Bénédictine and lime juice straight into a large rocks glass: 30 ml of each.
2. Add one large ice cube and stir for about 20 seconds, until the outside of the glass feels cold.
3. Top up with the cold soda water and give it one gentle stir.
4. Shake three dashes of Angostura bitters onto the top. No garnish.

**closingLine:** *One of each, so anyone can learn it. Someone beside you already has.*

(Wren's rewrite, round 5, accepted: "The people beside you" is a 4-gram *Making the Calls* uses. It carries y5, and it turns on the shrug: anyone *can* learn it, and the recipe proves it. It avoids "Let someone…" (*Next One's Mine*'s close), "by heart" (*Off Duty*) and "Nothing to it" (Wondrich, about the plain old Sling (spirits, sugar, water), pdf 121, and a registry name).)

## Checks

| check | result |
| --- | --- |
| **Structure** (*Cocktail Codex*) | **Daiquiri family, sparkling sour:** a sour lengthened with soda on ice. *Joy* files the Singapore Sling under "sparkling sours" (pdf 388), and the *Codex* keeps soda-lengthened sours in its Daiquiri chapter (p. 138, Tom Collins). **Core:** gin. **Balance:** lime against the sugar in the two liqueurs; nothing else is sweet. **Seasoning:** Angostura on top, and the cherry and herbal liqueurs doubling as seasoning. |
| **Balance** (Arnold; style `collins`) | Recipe 120 ml, built and stirred over one large cube (25% dilution: the tool's estimate for a Collins; Arnold gives 24% for a drink built on a rock) → base 150 ml at 22.2% / 10.22 g / 1.20%, then 90 ml soda → **240 ml at 13.9% ABV / 6.39 g sugar per 100 ml / 0.75% acid: all in range** (12.5–15 / 6.0–7.5 / 0.55–0.95). **My numbers caught the tool:** balance.py leaves out dashes, so the three dashes of Angostura (about 1 ml of alcohol) aren't counted. By hand, with them: **14.2%**, still in range. **Gin sweep:** 40% gives 13.0% (tool) / 13.3% (by hand), 47% gives 13.9 / 14.2, all in range. **Dilution:** one big cube stirred for 20 seconds may melt less than 25% (unsourced). The worst case I ran, 15% melt with a 47% gin and the bitters counted, is **15.1%: an edge, a hair over the top of the band**, and flagged. Sugar and acid stay in range. **Tolerances (by hand, 75 ml soda):** lime 25–35, Bénédictine 25–35 and Heering 25–35 ml all in range. A cherry liqueur from 16 to 30% and 20 to 30 g sugar/100 ml stays in range; 35 g is an edge. **Versions the numbers rejected:** Wondrich's own suggested tweak (more gin, half the Bénédictine, a quarter less lime: 45/30/15/22.5, the same as *Joy*'s version, pdf 389) reads OUT on sugar at every soda length (5.0–5.75), and OUT on strength below 90 ml soda. Oxford's 1910s recipe (45 gin, 15 each of the rest, pdf 1804) reads OUT three ways (17.8% and 4.44 g at 60 ml soda; 3.79 g and 0.44% acid at 90). Wondrich's own 1–2 oz of water reads OUT on strength with a 47% gin (60 ml: 15.9%), so the 90 ml of soda is mine. **Unsourced values:** Cherry Heering at 24% (label) and ~25 g sugar/100 ml, which I back-calculated from LI's Blood and Sand (p. 133), so it's an estimate built on Arnold's own estimates. |
| **Pairings** | Gin, cherry liqueur, Bénédictine, lime and Angostura are the Sling's own frame, as written down in 1913 (Oxford pdf 1803; *Imbibe!* pdf 122). **Matrix:** stone fruit's best pairings include "citrus, fruit brandy… wine", and cherries' flavour comes from "almond, fruit, and vegetal aromas" (pdf 236; the page is about the fruit, not a cherry liqueur), so cherry and lime are a pairing the Matrix backs. **No ingredient comes from the Matrix. I consulted it for a spark and set it aside:** its surprise pairings for stone fruit are beer, sage and soy sauce, and sage is *A Brother's Care*'s leaf. Wren's ruling is "the Sling nobody could make that night, made properly", so a second change would muddy the answer. **No spark, stated.** The interest, personalised: most people who know the Sling know the sweet, pineapple-heavy hotel version from the 1970s (Oxford pdf 1804, "sweet, rather sticky"). This is the older, drier one, and its recipe is four equal parts that anyone can remember. |
| **Allergens** | `allergens.py` → `contains: ["nuts"]`, from Cherry Heering **and Bénédictine**; `--check nuts` matches. **New row (mine, 2026-10-01): `cherry_heering`, classed `nuts` on the safe side.** It's a cherry liqueur that may have the stones crushed in with the fruit (unsourced), so I made the same call the table makes for maraschino. **Row fixed (round 5, on Hester's finding): `benedictine` was `contains: []` and is now `nuts`.** Oxford lists nutmeg among its twenty-seven plants and spices (BÉNÉDICTINE pdf 256), and the studio rule is nutmeg → nuts. No other spec uses the row. Both substitutes (another red cherry liqueur, another sweet herbal liqueur) get the same class. Gin, lime, soda and Angostura: none. So the pour has two independent sources of `nuts`, and no single swap makes it veto-free. **This costs a veto-free place** (Boundary: said out loud). The Hero plan counted this row veto-free, so the family now has eight veto-free pours, with the Quest Seeker, the Storyteller and this one as `nuts`. The only veto-free Sling I found would swap the cherry for claret (Oxford pdf 1804; Wondrich pdf 122: "not without merit"), but that isn't the drink nobody could make, so I didn't take it. Wren decides if the floor matters more. |
| **Makeable** | A jigger, a bar spoon and a large rocks glass: no shaker and no strainer. It's built in the glass it's served in. Bottles: any London dry gin; **Cherry Heering, named** (the only cherry brandies in Singapore's liquor adverts of the time were red Bols or Heering, *Imbibe!* pdf 122; Oxford: "either Heering or Bols", pdf 1804; substitute style: another red cherry liqueur); **Bénédictine, named** (it's in the 1913 order by name; substitute style: another sweet herbal liqueur). Both are ordinary liquor-shop bottles, but they're two bottles a home bar may not have. The numbers and the vetoes are proved for Heering and Bénédictine only; a sweeter cherry liqueur (above ~30 g sugar/100 ml) runs sweet. |
| **The story in the glass** | The Singapore Sling is what a customer ordered and nobody behind the bar knew how to make (*Proper* p. 72). The glass holds it made properly, in the oldest written order we have: in 1913, members of the Singapore Cricket Club asked for "one Cherry Brandy, one Domb [that is, D.O.M. Bénédictine], one Gin, one Lime Juice, some Ice and water, [and] a few dashes of bitters" (*Imbibe!* pdf 122; the order is also in Oxford pdf 1803, with its own brackets). Wondrich reads each "one" as 1 oz (the Singapore measure then, pdf 122), so it's **one of each**. **The gesture:** it's built in the glass, with no shaker and nothing to show (Wondrich: "Build… over ice. Stir briefly", pdf 122), and it's four equal measures you never have to look up. That's the practice made so ordinary it needs no book. **Ours, owned:** the rocks glass and single cube (Wondrich says a Collins glass); 90 ml of soda (his 1–2 oz); three dashes; no garnish (Wondrich: "If you must garnish"). Never "the original recipe" as our claim (that's Wondrich's word), never Raffles or Ngiam Tong Boon, and never "his" Sling: the page never says Dionysos made one. |
| **Sibling watch** | *Worth the Trip* (gin, lime, Angostura, soda) is a highball in a tall glass full of ice, with brandy, ginger-cumin syrup and mint. Ours has no ginger, mint or brandy, is a different family, and sits in a rocks glass with one cube. *Not Too Polite* is a gin sour in a Collins glass, so ours stays out of the Collins. The shape is exactly the Hero plan's reservation for this row (Daiquiri · London dry gin · rocks glass, one large cube), and no registry triple matches it. No pour uses Heering, Bénédictine or a Sling. *Fair Measure* opens its close with a ratio ("Four of water to one of rum"), so ours says "One of each", not a count. |

## For Hester: what the glass relies on (a Sling card, please)
- S1: the 1913 Cricket Club order, in *Imbibe!* pdf 122 (with the *Singapore Weekly Sun*, 20 Sep 1913, in Oxford's bibliography, pdf 1805) and Oxford pdf 1803.
- S2: Wondrich's 1 oz reading of "one", Heering or Bols as the cherry brandy (from Singapore's liquor adverts, not its recipes), and "Build in a Collins glass over ice. Stir briefly" (*Imbibe!* pdf 122).
- S3: the 1970s Raffles version, sweeter, with pineapple (Oxford pdf 1804), if Wren wants the contrast in one clause.
- Guards I'd suggest: nothing on who invented it (Oxford and *Imbibe!* both debunk Ngiam Tong Boon); keep out the colonial colour (*Imbibe!*'s "(white) inhabitants", "pink slings for pale people") and the Cricket Club's snobbery ("vulgar"). The page doesn't say whether the Casa U-Betcha guest ever got their Sling (Hester's P2).

## Image brief

- **Glass and drink:** a large, heavy rocks glass with one large clear ice cube. The drink is a deep, rosy pink-red, a little hazy from the lime (not crystal clear), with fine bubbles along the cube. That colour is my estimate from a red cherry liqueur lengthened with soda; the 1903 "pink slings" (*Imbibe!* pdf 122) are period support, not a measurement. Three dark-brown drops of Angostura sit on the surface, just starting to bleed into the pink. No garnish, no straw.
- **Props (the story in objects):** a secondhand cocktail book lying open, its spine soft and cracked (the first book, from a used section; *Proper* pp. 60, 72); behind it, a short run of worn, mismatched old books (hundreds, in time); four open bottles in a row with no readable labels: clear, deep red, amber-gold, and a small bitters bottle; a steel jigger, still wet; half a squeezed lime.
- **One impossible detail:** one page of the open book is lifting and turning on its own, as if someone is still looking for the recipe.
- **Must not appear:** fire, smoke, flame, helmets, uniforms or gear; a white jacket or a bartender's coat; readable text or labels; pineapple, a cherry or any garnish; palms, rattan, tiki or hotel-veranda colonial scenery; a shaker; a second drink; a person.
- **Palette:** dark wood, old paper, the drink's pink-red, and one flame-orange note (Pantone 165 C, the persona's colour): the cloth ribbon bookmark in the open book.

**SCENE (ready to paste):** On a dark wooden bar top stands a large, heavy rocks glass with one large clear ice cube and a deep, rosy pink-red drink, a little hazy from fresh lime, with fine bubbles along the cube. Three dark drops of bitters rest on the surface, just starting to bleed into the pink. Beside it, a secondhand cocktail book lies open, its spine soft and cracked, and a flame-orange cloth ribbon marks the page. One page is lifting and turning on its own. Behind it stands a short run of worn, mismatched old books. Four open bottles stand in a row with no readable labels: one clear, one deep red, one amber-gold and one small bitters bottle. There's a wet steel jigger and half a squeezed lime. Dark wood, old paper, the pink-red of the drink, one flame-orange note.

## Names

- ***Anyone Would Have*** (the pick, round 5: I moved to Wren's). The name recognises and the closing line turns, which is her rule and one I'd written down myself, and this is the guest's own shrug. It's harder to say across a bar than *One of Each*, but it makes people ask.
- ***One of Each*** (my round 4 pick, now second). It's the recipe, and it's the person: one of the crew, never the one out in front. A bartender can say it across a bar ("What are you having?" "One of Each"), and it sounds like an order, which is where the story starts. It doesn't repeat the tagline, and no registry name is close.
- ***Kept Going Back***: the practice, from p. 72. It's true and warm, but it's long, and it's his line, not the guest's.
- ***Ready When Asked***: the person's whole promise. It's clear, but it sits close to the tagline's job.
- ***Nobody Knew***: the Sling night. It's intriguing, but it leans on the two bartenders Wren won't blame.
