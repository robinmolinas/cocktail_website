# Tomás: lover-explorer draft (v1.4, round 6)

Status: v1.4 (round 6): closing line final (below). v1.3 (round 5): Hester's M1-M3 applied. Earlier: v1.2 (round 4). The drink hasn't changed since v1. v1.1 fixed the year to 1941 (Hester F4). v1.2 adds the guide's own recipe (Hester F17: vodka, on the guide's page), the closing line, the names and the image brief. Spec: `_studio/specs/lover-explorer.json`.

**Glassware:** a stemmed wine glass (about 250-300 ml), chilled, no ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | vodka | any plain vodka |
| 45 ml | tomato juice | a good plain bottled one, not a Bloody Mary mix: as much tomato as vodka, as in his cocktail guide |
| 15 ml | manzanilla sherry | or any fino: bone-dry, and it brings the savoury depth the Worcestershire used to |
| 15 ml | fresh lemon juice | |
| a small pinch | celery salt | |
| a small pinch | fine salt | leave it out if your tomato juice is already salted |

## Method

1. Fill the wine glass with ice and water to chill it while you mix.
2. Pour the vodka, tomato juice, manzanilla and lemon juice into a shaker, and add the celery salt and the salt.
3. Fill the shaker with ice and shake for ten seconds. No longer: tomato goes thin and frothy if you keep shaking.
4. Empty the glass and strain the drink into it. No ice in the glass: it's served up, as a cocktail.

**closingLine:** *There's no ice in it, so it ends. Choose the night's ending yourself, before the coats come out.*

Final (round 6). How it got here: in round 5 Wren and I crossed. I took her trim (*…while it's still this good.*) just as she moved to my v1.2 line (*There's no ice to keep it going, so it ends at its height. End the night the same way: raise a glass to it, and pick a date before the coats come out.*). This line keeps her trim's frame and takes the one thing she argued for in v1.2: "before the coats come out" turns whoYouAre's "long before anyone reaches for a coat" around at the very end, and it says "at its height" without the word. It leaves out the toast and the date, because those were y5's two steps again ("Say it out loud… Then name the next one, and the date"), and the pour shouldn't make its proposal twice. The gesture is the physics (no ice, so it ends), and the position is the guest's. It has nothing about the cold (*Left Standing*), no "next time", no "the best part", and no y5 words. I grepped every pour and work file for "before the coats" and "the night's ending": no clash.

## Checks

| Check | Result | Reasoning |
| --- | --- | --- |
| Structure | Highball family, savoury branch, served up. Core: vodka. Balance: tomato juice (the mixer), lemon. Seasoning: manzanilla, celery salt, salt. | The *Codex* files the Bloody Mary as a Highball, "the queen of all savory cocktails" (p. 221; p. 211 puts it at the savoury end of juice highballs). **The guide's own recipe** (1941, Hester F5–F6, C1; *Joy*'s copy says 1945; guide p. 57, F17, OCR of the 1946 fifth printing): Gaston Lauryssen, host at the St. Regis, gave it 2 oz tomato juice, 2 oz vodka, a fraction of a teaspoon of Worcestershire, a pinch of salt, and more the OCR cuts off. *Joy* says it was "served straight up as a cocktail" (pdf 249), which the guide's visible lines don't show. Regan's adapted recipe (*Joy* pdf 373: 1½ oz each, 2 dashes Worcestershire, 2 dashes lemon, salt and cayenne, shaken and strained into a chilled cocktail glass) is his adaptation, not the guide's. Vodka, not gin, on the guide's own page: Lauryssen's Red Snapper is 2 oz. tomato juice to 2 oz. vodka (guide p. 57, archive.org OCR of the 1946 fifth printing; Hester F17). Oxford adds that in 1964 Petiot credited Jessel with the tomato juice and vodka combination, and that at the St. Regis the drink was known as the Red Snapper (BLOODY MARY pdf 293). The hotel's drink, "spices and all", was a documented speciality from at least 1941 (pdf 292). The gin story is a legend (L3). Equal parts isn't a first: the 1929 Broadway mix was already equal parts tomato juice and gin (pdf 292). **Kept from the guide:** equal parts vodka and tomato, and the pinch of salt. **Kept from Joy:** served up. **Mine:** 45 ml each rather than 2 oz, so it stays a short drink; manzanilla; 15 ml lemon; celery salt; the Worcestershire left off; shaken for ten seconds (Regan's method, my timing). So it's a riff that starts from the recipe Lauryssen gave: never "his recipe", "Gaige's drink" or "the original". |
| Balance | Freeform (Arnold has no savoury style): shaken for 10 s, 120 ml becomes about 174 ml (45.2% dilution), **11.6% ABV, 0.92 g sugar/100 ml, 0.66% acid**. | References, my arithmetic: Regan's adaptation reads 13.2% / 1.0 g / **0.22% acid**, which is flat, so I raised the lemon from 2 dashes to 15 ml. The guide's own 2 oz each, with no lemon visible, would be flatter still. The *Codex*'s baseline Bloody Mary (p. 221, mix p. 295) runs about 11% / 2 g / 0.8% before its ice melts (Worcestershire and hot-sauce acid not counted), so 0.66% sits between the two: sharper than Regan's, softer than the Codex's. The sugar is low because it's savoury: the salt carries it, as in any Bloody Mary. Tomato juice values are **unsourced** (my knowledge). Swept 2.5-4.0 g sugar and 0.35-0.5% acid, the drink moves only to 0.79-1.18 g and 0.65-0.69%. Vodka at 37.5-50%: 11.1-13.8%. The shake uses `balance.py`'s shaken formula. The spec is `freeform`, so no sour's ranges are applied to a savoury drink. |
| Pairings | Tomato with vodka and with sherry: both are on tomato's wheel in the *Flavor Matrix* (pdf 245). The *Codex* suggests manzanilla *in place of* the vodka, "to up the savory ante" (p. 221). Ours is a splash beside the vodka: the idea is the Codex's, the measure is mine. | The manzanilla is my change, and it has a job. The guide's recipe had Worcestershire (guide p. 57, F17; Regan keeps it, *Joy* pdf 373), which I leave off for the vetoes, and the sherry brings back the savoury depth. It also puts his two loves, wine and cooking (Oxford GAIGE pdf 861), in one glass: in the reading, "so his cellar and his kitchen share the glass". **Matrix surprises consulted and set aside** (tomato, pdf 244: tea, coconut, passion fruit, cardamom, berries). Tea is *Overnight*'s steep. Coconut is `nuts`. Passion fruit and berries pull tomato towards the sweet fruit *The Other Berry* made of it. Cardamom has nothing of him in it. Tomato is owned against *The Other Berry*: there it's a sweet fruit in a daiquiri, and a surprise; here it's savoury, where it usually lives, and nobody is surprised. |
| Allergens | `allergens.py`: **veto-free**. | Vodka is a distilled grain spirit, so not `gluten`. Manzanilla: wine fining is ignored (STUDIO-RULES 4). The guide's Worcestershire is left off (malt vinegar in the common bottling, `gluten` on the safe side, my knowledge), and so is Regan's cayenne (`spice`). Celery salt: celery isn't in the veto enum, and it has no heat. Three rows were added in round 2, all `contains: none`: `tomato_juice`, `manzanilla`, `celery_salt`. |
| Makeable | Shaker, strainer, jigger, a wine glass. Every bottle is a supermarket style. | No named bottle. Plain bottled tomato juice, the kind the *Codex*'s mix uses (p. 295). A wine glass rather than Regan's cocktail glass, because about 174 ml finished won't fit a standard cocktail glass. "Tomato goes thin and frothy if you keep shaking" is my bar knowledge, unsourced. |
| Siblings | Highball · vodka · stemmed wine glass: no registry pour shares it. | Only *The Other Berry* has tomato (owned above). "Cure", "morning after" and brunch stay out of every line (Wren; *Worth the Trip* owns the cure). The closing line says nothing about the cold (*Left Standing*'s). |

**(resolved in reading v2, X7)** **For the reading (y4), drink-side note for Wren and Hester:** "it was served straight up, shaken, then strained into a chilled glass with no ice. I kept that." claims more than the page. "Served straight up as a cocktail" is *Joy*'s history (pdf 249). "Shaken, then strained into a chilled glass" is Regan's adapted method (pdf 373), and the guide's visible lines give neither. Suggested: "It had as much vodka as tomato juice, and it was served straight up as a cocktail, with no ice. I kept that." The rest of y4 matches the spec: a splash (15 ml) of manzanilla, fresh lemon, a pinch of celery salt, shaken and served up, short, "a real ending".

## Names

| name | for | against |
| --- | --- | --- |
| **Curtain Call** (Wren's pick; mine too) | The moment at the end of a show when people cheer: the ending loved, which is the turn this person needs. Two words, easy to say across a bar ("A Curtain Call, please"). The theatre is his, and the feeling is the guest's. | It leans towards the position, and the tagline ("Even the last one") is about ending too. It stays a recognition, though, because it names the applause, not the leaving. It makes no claim about his curtains (Hester's 150 guard): it's the guest's night, not his count. |
| Lights Up | Wren's whoYouAre line in two words. | Say it at a bar and it sounds like "start". It also spends the reading's best line on the title. |
| While It's Good | The position, plainly. | It's the position, so with the closing line it would say the turn twice (my lesson: the name recognises, the closing line turns). |
| Full Table (mine) | The feast and the company: the person wants the whole table, and his last book is a table of friends. Sayable. | It says nothing about the ending, so it's the safe one. |
| House Lights (mine) | The theatre's word for the lights coming up at the end. | It's too close to *Lights Up*, and it names the fear, not the gift. Held for the record. |

Out: *Encore*. At a bar it means "one more", which is Wren's trap. Registry and work files checked: no clash for *Curtain Call*, *Full Table* or *House Lights*.

**Pick: *Curtain Call*.**

## Image brief

- **The glass and the drink:** one stemmed wine glass (about 250-300 ml), chilled so the bowl is lightly misted, filled a little over half with an opaque tomato red, slightly lighter than tomato juice from the shake, with a thin pale froth ring at the top edge. No ice, no garnish, no celery stalk, no lemon wedge, no salted rim. The hue is my read, unsourced: the tomato juice gives the colour, and the manzanilla (pale) and lemon barely move it.
- **Props (the story in objects):** (1) a long dinner table, late in the evening, still set: napkins dropped, a scatter of crumbs, chairs pushed back a little but not empty-looking. Its **candles are still tall**, barely burned down: the night was ended at its height, not after it; (2) a 1930s tabletop radio, its dial softly lit (*Kitchen Cavalcade*, the pleasure shared every day with strangers, F3); (3) a small letterpress dinner menu card, the print too soft to read (the barn press that printed dinner menus, F12); (4) a pale, unlabelled sherry bottle beside a folded linen cloth (the cellar in the glass); (5) a small desk calendar or pocket diary open at a page with one date circled in pencil, no readable numbers (the next one, named).
- **One impossible detail:** every candle flame on the table leans gently towards the glass, all together, like a cast taking a bow.
- **Must not appear:** people or hands; a second glass; ice; a highball glass; celery, a lemon wedge, a cherry tomato or any garnish (*The Other Berry*'s tomato sits on its rim); hot sauce, Worcestershire or pepper; morning light, a brunch spread, coffee, aspirin, or anything that says morning after; a clock or watch (nobody's watching the time); a bill, money or taxi; a stage, actors or a curtain (the name carries the theatre, so the picture doesn't need to); readable text; a playbill with a count.
- **Palette:** candlelight amber and warm cream, with the drink the strongest red-orange in the frame, close to the persona's Pantone 1585 orange. The shadows are soft warm brown, velvet rather than black.

**SCENE (ready to paste):** A single chilled stemmed wine glass, lightly misted, holds an opaque tomato-red cocktail served up with no ice, with a thin pale froth at its edge. It stands on a long candlelit dinner table late in the evening: napkins dropped, chairs pushed back a little, the tall candles barely burned down. Around it are a 1930s tabletop radio with its dial softly glowing, a small letterpress dinner menu card with print too soft to read, a pale unlabelled sherry bottle on folded linen, and a pocket diary open with one date circled in pencil. Every candle flame leans gently towards the glass, all together, like a cast taking a bow. Warm amber and cream light, soft velvet-brown shadows, the drink the richest red-orange in the frame. No people, no ice, no garnish, no text.
