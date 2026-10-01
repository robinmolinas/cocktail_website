# Tomás, final draft (round 6): drink v1, one change

Spec: `_studio/specs/magician-caregiver.json` (style `shaken-spirit`).

Glass: cocktail glass, chilled. Contains: veto-free.

## Recipe

| amount | item | note |
| --- | --- | --- |
| 15 ml | Spanish anís dulce, 35% | sweet anise, like the ojen the 1911 drink used |
| 45 ml | Spanish anís seco, 40 to 50% | a dry anise with far less sugar: the one thing I've changed |
| 2 dashes | Peychaud's bitters | it turns the drink pink |
| 2 dashes | Angostura bitters | |

## Method

1. Chill the cocktail glass: put it in the freezer, or fill it with ice water while you mix.
2. Put both anís and both bitters in a shaker with plenty of ice. Shake hard for about 12 seconds, until the tin is ice-cold.
3. It turns hazy as the cold water from the ice goes in. That's the anise, not a mistake.
4. Empty the glass if you filled it with water, and strain the drink in.

**closingLine:** *Shake it until the tin is ice-cold. This time, don't slip out early.*

## Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family**: spirit, sugar, bitters. The core is anise spirit, split sweet and dry. The sugar is the anís dulce's own, and the two bitters season it. It's shaken, as Oxford gives the 1911 drink (PINK LADY COCKTAIL pdf 1521: "a jigger of ojen … shaken up with Peychaud's and Angostura"). It isn't the stirred, Peychaud's-only 1935 Pink Shimmy (Hester C9). |
| The one change | Three parts in four of the sweet anise are swapped for a dry anís with far less sugar. The anise is still the taste, and the two bitters and the shake stay. The change carries strength without sugar, and it works where nobody sees it. It turns a sweet liqueur with bitters into a proper cocktail. |
| Rejected on the numbers | **The 1911 drink as printed** (60 ml ojen): OUT on sugar at every value tried (11.7 to 23.2 g per 100 ml against a 5.6 ceiling). **Fino as the only change:** OUT on strength in every shape (14.8 to 18.4% against a 21% floor), and its acid runs over the ceiling. **v0 and v2** (dulce, seco and fino): balanced in part of the band, but two changes, and v0 went OUT at a 40 g dulce. Withdrawn. |
| Balance (Arnold; `shaken-spirit`) | 63.2 ml recipe, 67.3% dilution, 105.7 ml in the glass. **27.5% strength, 4.32 g sugar per 100 ml, 0% acid, all in range** (21-29 / 3.7-5.6 / 0-0.14). Dulce at 35% and 29 g per 100 ml. That figure is **derived, not printed** (Hester F23: a retailer's label for one dulce gives 35% and 308 kcal per 100 ml, and the alcohol accounts for about 193 of them; our arithmetic). Treat it as unsourced. |
| Sweep | The law (RD 164/2014 art. 6, Hester F20): a dulce is 35-45% and over 200 g/l of sugar, with no ceiling. A seco may hold up to 50 g/l. **With a dulce of 25-35 g and a seco of 40-50% holding 0-2.5 g:** in range, 23.6-27.5% strength and 3.75-5.48 g sugar, except at 35 g with a 2.5 g seco (6.2-6.3 g, OUT). **At the 29 g figure:** in range for a seco of 0-2.5 g (4.32-5.48 g). A seco at the legal 5 g maximum goes OUT (6.4-6.6 g). A dulce at the legal floor, 20 g, with a fully dry seco: 3.1 g, OUT low. The numbers are proved for a 35% dulce near 29 g and a genuinely dry seco. Label claims for sugar in a seco aren't required by law, so this is flagged, not solved. |
| Pairings | Anise with Peychaud's red-licorice and anise notes. *Codex* p. 17 says this of Peychaud's in the Improved Whiskey Cocktail (Hester T2), where it also "increas[es] the impression of sweetness". Angostura gives warm spice (the family word; its recipe is secret). **No *Flavor Matrix* spark, on purpose.** I consulted it (fennel pdf 116; pome fruit sharing anethole, pdf 298) and set it aside: the interest is the lost 1911 drink, and a spark the guest could see would work against someone whose help goes unseen (Wren). |
| Colour and haze | Pink: Peychaud's colours ojen pink (1935 booklet p. 27, Hester F18). With the Angostura I expect a soft, dusty pink (my inference). Haze: anethole comes out of solution in cold water (Oxford ANISE SPIRITS pdf 115, LOUCHE pdf 1195). A seco can carry more essential oil than a dulce (F20), so how thick the haze gets is unsourced. The drink is called "hazy", and the closing line makes no claim about the cloud (Hester T3). |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds). `anis_dulce` and `anis_seco` were added this pour, contains none: aniseed, star anise and fennel aren't heat spices (rule 4). |
| Makeable | A shaker, a strainer, a jigger. No named bottle. The only one with history, Legendre Ojen (42%, rebuilt from Fernández bottles), is sold almost only in New Orleans, which fails rule 5 (Hester). The page gives styles: Spanish anís dulce 35%, and anís seco 40-50%. Both are sold widely in Spain and by Spanish importers. |
| Closing line | The gesture is the shake. The position is y5's "don't leave before it arrives", in new words, so the reading's last sentence isn't echoed (Wren). No cloud (T3). Grepped every pour and the registry: no "slip out" and no "this time". "Too cold to hold" is in four methods, so I used "ice-cold". It avoids "walk in" (three pours), "stay long enough" (*No Accident*) and "gone" (*Off Duty*). |

## Image brief

A chilled stemmed cocktail glass holding a hazy drink, soft and dusty pink, with no garnish. It stands at the near edge of a white tablecloth. Behind it, well out of focus, a party is already under way: warm lights, and soft shapes of people turned towards someone we can't see. No hand is in shot, and no face can be made out. The glass is the only sharp thing, set down a moment ago by whoever made it.

- Never an empty or half-set room, which would read as getting ready (the Geisha's).
- No wand, pumpkin, clock or midnight.
- No pink décor: the pink stays in the glass.
- No red swirling into a cloud (*Rosetta*).

## Names

- **Their Night**: Wren's pick, and mine. It says what the Godparent gives away. ← pick
- **Unasked**: one word, and it's the whole of their help.
- **Under Another Name**: Wren's. It's true of the Pink Shimmy (Oxford F7).
- **Nobody Asked**: a bartender would say it with a shrug.
