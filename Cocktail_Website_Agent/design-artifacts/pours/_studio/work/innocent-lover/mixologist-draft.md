# Mixologist draft: innocent-lover (The Teenage Heart-throb)

Tomás, round 4 step 1, 2026-10-04. **Drink v3** (v2's numbers; the flame is gone). Spec: `_studio/specs/innocent-lover.json`. Story: the Brooklyn Cocktail (the plan's lead, accepted by Wren in r1). Anchors: Hester's `historian-anchors.md` and `fact-cards/brooklyn-cocktail.md` (F-numbers); her audit v1 (D1–D14) is landed below.

**What the glass says.** The earliest Brooklyn on record "apparently never left" the Brooklyn Club (Oxford BROOKLYN COCKTAIL pdf 360). In 1945 the *Brooklyn Eagle* printed the club's drink as equal parts 100-proof Jamaica rum and Italian vermouth, with a dash of Angostura (F17). This glass takes that rum, that strength and that dash, at my own proportions (2:1), with a spoon of amaro where Grohusko's 1908 Brooklyn had a French orange bitter (pdf 360–361). It ends with a wide orange peel squeezed high over the top, so the drink makes itself known before anyone tastes it.

**Versions.** v1 (r2): generic aged rum 40%, no bitters; balanced (22.5% / 4.33 g / 0.130% finished). v2 (r3): the club's Jamaica rum at about 50% and its dash of Angostura (Hester r2); balanced (below). v3 (r4): same liquid as v2. **The flamed peel is out**, on Wren's ruling, and I agree with it. What convinced me: the charge that follows this person all their life is that it's all for attention, and a flare of showmanship on top of their drink says exactly that. DeGroff himself calls it "a highly theatrical technique" (Oxford FLAMING A TWIST pdf 800). The orange stays, unflamed, squeezed high.

## Recipe

Glassware: cocktail glass (about 180 ml), chilled
Contains: veto-free

| amount | item | note |
| --- | --- | --- |
| 60 ml | aged Jamaican rum, about 50% (any aged Jamaican rum from 40% to 57% works; not spiced) | the style and strength of the rum in the Brooklyn Club's drink, as the *Eagle* printed it in 1945 |
| 30 ml | sweet vermouth (Italian style) | the club poured as much vermouth as rum; at half the rum the drink stays bright |
| 7.5 ml | Amaro CioCiaro (*recommended*), or any dark, bittersweet Italian amaro (herbal liqueur) with a burnt-orange taste, about 30% | in place of the 1908 Brooklyn's French orange bitter, Amer Picon; the stand-in Oxford and *Imbibe!* both name |
| 1 dash | Angostura bitters | the club's dash |
| 1 | wide strip of peel from a fresh, thick-skinned orange, about 2.5 cm across | squeezed high over the top, then dropped in |

## Method

1. Put the cocktail glass in the freezer for 10 minutes, or fill it with ice and water while you mix.
2. With a small knife, cut a wide strip of peel from a fresh, thick-skinned orange, about 2.5 cm across, leaving a little of the white underneath so it holds its shape.
3. Fill a mixing glass or a jar with ice. Pour in the rum, the vermouth, the CioCiaro and the dash of bitters.
4. Stir for about 30 seconds, until the outside of the glass is very cold.
5. Empty the cocktail glass and strain the drink into it.
6. Hold the peel by its edges, orange side down, high above the glass (about a hand's width), and squeeze it sharply so its oils fall in a fine spray over the drink.
7. Rub the orange side around the rim and drop the peel in.

**closingLine:** *Squeeze the peel from high up, so nobody misses it. If they laugh, keep the words the same size.*

(Carries Wren's position, "same words, same size", in my wording. No "say it again" (*sage-outlaw*'s), no "catch", no "first". Grepped against every pour: "from high up", "nobody misses" and "same size" are on no closing line or method. The reading's y5 also says "Same words, same size": Wren, if that's one echo too many, the closing line keeps it and y5 can turn it, or the other way round; your call on the reading.)

## Checks

| Check | Result |
| --- | --- |
| **Structure** (*Cocktail Codex*) | **Martini family**, Manhattan branch. **Core:** aged Jamaican rum, 60 ml. **Balance:** sweet vermouth 30 ml, with 7.5 ml of amaro doing a share of the vermouth's job. *Codex* p. 87 (Brooklyn): "substitute small amounts of amari or liqueurs for a portion of the vermouth", the Brooklyn being the classic example. **Seasoning:** one dash of Angostura (the club's, F17) and the orange peel's oils. The *Codex*'s Brooklyn (p. 87) uses dry vermouth, as Straub's 1914 version did (Oxford pdf 360); ours keeps the sweet (Italian) vermouth that Grohusko (pdf 361) and the club (F17) used. **The proportions are mine:** 2:1 with an amaro, never "the club's recipe", "as served in 1883" or "the same rum" beyond its style and strength (D10). |
| **Balance** (`balance.py`, style `stirred`) | 98.3 ml (dash included) → dilution 44.4% → 142.0 ml. **Initial** 38.2% / 6.14 g / 0.183% (ranges 29–43 / 5.3–8.0 / 0.15–0.20). **Finished** 26.5% / 4.25 g / 0.127% (21–29 / 3.7–5.6 / 0.10–0.14). **All in range.** Values: rum LI pdf 140 straight-spirit note at 50% (row `rum_jamaican_aged_50`); sweet vermouth LI pdf 140–141 (16.5%, 16 g, 0.6%); Amaro CioCiaro LI pdf 140 (30%, 16.0 g, 0%); Angostura LI pdf 140–141. The peel isn't modelled (oils only). |
| Balance: rejected on paper | **The club's half-and-half** (45/45, 50% rum, a dash): finished acid 0.209, **OUT**. **Grohusko's equal parts** (45/45/5): acid 0.20, **OUT**; strength 20.2% and sugar 6.01 at the edges. **Vermouth 37.5 ml**: acid 0.151, **OUT**. Equal-parts sweet-vermouth stirred drinks go out on acid, so 2:1. |
| Balance: sweeps (all `stirred`) | **Rum strength** 40 / 46 / 57 / 63%: 22.6 / 24.9 / 29.2 (EDGE) / 31.6% (**OUT**). So the page says 40% to 57%; anything stronger goes over. **Amaro** 5 / 10 ml: in. **Amaro substitute style** 16.5% at 12 g and 35% at 28 g: in (4.05 / 4.88 g). **Vermouth sugar** 13 g (a drier one): 3.62 g, EDGE; 20 g (a richer one): in. **Rum with 2 g/100 ml added sugar** (unsourced): in (5.09 g). Stacked worst cases: driest (57% rum, 13 g vermouth, 12 g amaro) 29.2% / 3.38 g, EDGE on both; sweetest (40% rum with 2 g sugar, 20 g vermouth, 28 g amaro) 6.69 g, **OUT**. **Rule for the page:** an unsweetened aged Jamaican rum from 40% to 57%. Any sweet vermouth and any amaro of the stated style land, except a sweetened rum stacked on a rich vermouth and a sweet amaro. |
| **Pairings** | Rum and Italian vermouth with Angostura: the club's own drink (F17). Jamaican rum and CioCiaro: the *Codex* pairs a Jamaican pot-still rum with CioCiaro, the amaro working "as a bridge" (p. 32, Last One Standing). **The top:** CioCiaro's flavour "features burnt orange" (*Codex* p. 260); the peel puts fresh orange oil over it, so the nose meets fresh orange and the sip finds the darker, burnt orange underneath: one fruit, said twice. **Flavor Matrix consulted, no spark taken:** its citrus entry (pdf 80) and cane-syrup entry (pdf 240, orange among its best pairings; a sugar entry, not a rum entry, so a lead only) support orange with cane; its surprising pairings that would fit a Manhattan's top are siblings' ground (basil: *Before the Room*; cumin: *Who's In?*), and a float "tasted first" is *Straight Back*'s. Hegeman's 1910 cider, absinthe and ginger ale (F7) set aside: absinthe is *Rosetta*'s base, and cider with rum is held for a sibling. Robin's rule when no Matrix spark fits: make it interesting from the books, for this person. Here that's the club's overproof Jamaica rum and dash, the Brooklyn's amaro slot, and a peel squeezed high. **Flame considered and dropped** (above). The flamed orange twist is also the Lover plan's held backup for lover-ruler (Flame of Love, Oxford pdf 799; D11), so nothing of it remains here. |
| **Allergens** (`allergens.py --check ""`) | `contains: []`, **veto-free**, matches. **New rows, my call:** `amaro_ciociaro` (LI pdf 140 values; *Codex* p. 260 flavour), veto-free on the Campari and Cynar precedent: recipe unpublished, no nut, nutmeg, dairy, egg, gluten or heat ingredient on any page read. "Cola aromas" (*Codex* p. 260) is a tasting note, not an ingredient; flagged because cola itself is `nuts` in our table. `rum_jamaican_aged_50`: a straight spirit, veto-free. Angostura: the table's existing row (veto-free). No maraschino (`nuts`; Wren's condition 4). |
| **Makeable** | Mixing glass or jar, bar spoon, strainer, a small knife. CioCiaro is named because it's the stand-in Oxford (pdf 361) and *Imbibe!* name for Amer Picon in the Brooklyn, and the *Codex* calls it a favourite substitute (p. 260). The substitute is a style, swept above. Aged Jamaican rum at about 50% is a style, no brand: the numbers are proved from 40% to 57%. |
| **Edges and flags** | None in the spec. 57% rum and a drier vermouth are edges, stated above. For Wren's y4: 7.5 ml is half a tablespoon ("a spoonful" reads fine; "a little" is exact). |

## Image brief

**Glass and drink:** a stemmed cocktail glass (about 180 ml), frosted from the freezer, filled to just under the rim. The drink is stirred, so it's perfectly clear, with no bubbles or foam: dark and clear, with a warm reddish glow where the light comes through (colour words kept loose: no source gives the shade). A wide strip of orange peel, a little white showing at its edges, lies in the drink and curls up against the inside of the glass. Tiny bright beads of orange oil sit on the surface.

**Props (the story in objects):**
1. A fresh orange beside the glass, one wide strip cut from its side, and a small knife.
2. A small stack of handwritten recipe slips and letters on cheap paper, some folded, held with a paper clip: the recipes people kept sending in. The writing is a blur of ink, never readable.
3. A folded newspaper page under the slips, its columns only grey texture, no headline or readable words.
4. Behind the glass, a heavy wooden door standing half-open into a dim, quiet room with a leather armchair: the club the earliest one on record apparently never left. The glass stands on the near side of the doorway.

**One impossible detail:** the fine spray of orange oil from the squeeze hangs in the air above the glass, motionless, a small glinting cloud that hasn't fallen yet.

**Must not appear:** any flame, match or fire; hearts, roses, petals, lipstick; a bridge, a skyline or any Brooklyn landmark; readable text, dates or headlines anywhere; a second drink or a bottle label; people or hands; a cherry; a phone; anything pink in the glass.

**Palette note:** warm reddish amber and orange against the dark room; the persona's soft pink only as a blush in the candlelight on the paper, never in the drink.

**SCENE (ready to paste):** A frosted stemmed cocktail glass, filled almost to the rim with a perfectly clear, dark stirred drink glowing warm reddish where the light comes through, a wide strip of orange peel curled inside it and tiny beads of orange oil glinting on the surface. Above the glass, a fine spray of orange oil hangs motionless in the air, a small glinting cloud that hasn't fallen yet. Beside it, a fresh orange with one wide strip cut from its side and a small knife; a loose stack of handwritten recipe slips and letters on cheap paper, held with a paper clip, on top of a folded newspaper page whose columns are only grey texture. Behind the glass, a heavy wooden door stands half-open into a dim, hushed room with a leather armchair; the glass stands on the near side of the threshold. No readable text, no people, no flame.

## Names

(Mine, held until the vote.) **Out Loud** (my pick: it's the person, not the drink) · *Full Volume* · *In Print*. I could take Wren's *The Big Words*. Checked: none is in the registry, and none shares a word with the closing line.
