# Mixologist draft: ruler-innocent (The Diva), v3 (Tomás, r5)

Spec: `_studio/specs/ruler-innocent.json` (v1; the drink hasn't changed since r3). Position B is ruled (Wren r3): a Martini with more vermouth than gin, the kind on Gin Palace's first list (*Proper* p. 141).

**Glassware:** large V-shaped cocktail glass (about 250 ml), chilled, no ice.
**Contains:** veto-free.

## Recipe
| amount | item | note |
| --- | --- | --- |
| 50 ml | Noilly Prat Original Dry, recommended | Or any French dry vermouth. Here it's poured, not dropped in. |
| 30 ml | London dry gin | Any London dry gin of 40% or stronger. |
| 20 ml | sweet Tokaji (labelled Aszú, 5 puttonyos) | (5 puttonyos: my label guidance, unsourced.) A rich, sweet wine from Hungary's Tokaj region, as a nod to the Budapest bar Chalker imagined. Not a dry Tokaji. Or any sweet white wine made from shrivelled grapes, in the Sauternes style. |
| 2 dashes | orange bitters | |
| 1 strip | lemon peel | |

## Method
1. Put the glass in the freezer for 10 minutes.
2. Pour the vermouth, gin, Tokaji and bitters into a mixing glass or a jar.
3. Fill it with ice and stir for about 15 seconds, until the outside feels very cold.
4. Strain into the cold glass. There's no ice in the glass.
5. Twist the lemon peel above the glass so its oils fall on the drink, then drop it in.

## Checks
| check | result |
| --- | --- |
| Structure | **Martini family** (Codex). **Core:** French dry vermouth with London dry gin. With more vermouth than gin, the wine leads, as in the Codex's Bamboo, where the vermouth surrounds a lighter base (p. 91). **Balance:** Tokaji. Its sugar does the job that sweet vermouth or syrup does for a dry wine core. **Seasoning:** orange bitters and lemon oil. The ratio is my call, since the page gives none: 50 vermouth : 30 gin : 20 Tokaji. That's "more vermouth than gin" (p. 141). It's never equal parts, which is *Can't Watch*'s line. **History, fenced (Hester F13–F15):** by the 1910s, two parts gin to one of vermouth was the standard Martini, and by 1954 it was five to one or drier (Oxford MARTINI pdf 1247). The old Martinis with more vermouth than gin used *sweet* vermouth and Old Tom gin (*Imbibe!* pdf 198–199). So this is "the kind on his first list", never "the original" or "the old way". **Siblings (corrected, audit T1):** no pour is a gin and dry vermouth Martini. *Just Knew* (15 ml) and *Anyway* (a teaspoon) use some dry vermouth, beside sweet vermouth or Campari. |
| Balance (Arnold, style `stirred`, run for its dilution physics) | Recipe 101.6 ml, dilution 38.5%, finished 140.7 ml. **Initial:** 25.6% ABV, 4.23 g sugar per 100 ml, 0.453% acid. **Finished:** 18.5% ABV, 3.06 g, 0.327%. Strength, sugar, acid and dilution read **OUT by structure, justified rather than fixed**. Arnold's stirred ranges assume a spirit core with vermouth as the modifier. A wine core lands lower in strength and higher in acid, and a mix at 26% melts less ice. **Benchmarks** (my arithmetic, same formula): the Codex's Bamboo (p. 91 proportions, with the table's fino standing in for amontillado) finishes at 12.4% / 3.02 g / 0.410%. A two-to-one gin Martini with dry vermouth (60/30, two dashes) finishes at 25.9% / 0.68 g / 0.136%. The drink without Tokaji (60 Noilly / 30 gin) finishes at 20.0% / 1.40 g / 0.281%. **So y4's "gentler and silkier than most Martinis" holds on paper:** it's 7.4 points lower in strength than the two-to-one, with 4.5 times its sugar. "Silkier" is my taste word for that body. **Versions the numbers rejected:** 60/30 with 10 ml Tokaji (2.27 g, a thin and sharp wine) and 60/30/15 (2.64 g). **Sweep:** gin at 40/43/47% gives 17.2/17.7/18.5%, and Tokaji at 12/14/18 g per 100 ml gives 2.8/3.1/3.6 g. Every stop sits between the Bamboo and the Martini, so the recipe's floor is "40% or stronger". A *dry* Tokaji would drop the sugar back toward the 1.40 g version, which is why the recipe asks for a sweet one. |
| Pairings | Dry vermouth with gin and orange bitters is the Martini's own pairing (Codex p. 73: a fifty-fifty with orange bitters and lemon). Tokaji with dry vermouth is wine with wine. That its rich sweetness suits the orange bitters is **my craft call, unsourced**. **Matrix consulted:** GRAPE (pdf 140) lists honey and stone fruit among its best pairings and beet as a surprising one. I set aside a beet-steeped vermouth (pink), because Chalker wanted the bar "to look like it had always been there" (p. 141), and Wren agreed a pink Martini performs. Camomile is *Night Light*'s, and the apricot spirit pálinka is the Reformer's rim. **Why it's interesting:** the spark comes from Chalker's own brief, a Budapest bar of the 1890s (p. 141), not from the *Matrix*. **Tokaji's source (Hester r3):** "a rich, sweet wine from Hungary's Tokaj region" rests on one low-tier web source. Nothing ties Tokaji to 1890s Budapest bars, so the link is our nod, signposted. Out of the text: "King of Wines", the royal gift story and "noble rot". "Aszú" appears only on the recipe line, as the word to look for on the label. |
| Allergens | `allergens.py`: contains nothing, **veto-free** (it counts toward the AD-4 floor). **New rows, my call (r3):** `noilly_prat_original_dry` (18% from the label, unsourced; sugar and acid are LI's generic dry vermouth, not measured for this bottle) and `tokaji_aszu` (11%, 14 g, 0.8%, all unsourced). Neither carries a veto: wine fining is ignored (STUDIO-RULES 4), and neither bottle is named with an egg or milk label. |
| Makeable | Basic kit: a jar, a spoon, a strainer and a freezer. Noilly Prat is widely available (*Codex* p. 73). Original Dry is Oxford's "archetype" (pdf 1395). Which Noilly Briars saw isn't on record, so the recipe never says "his". Sweet Tokaji comes in 500 ml bottles at wine shops (my knowledge, unsourced): particular, but within reach. The Sauternes-style substitute keeps the drink. The numbers and vetoes are proved for the named vermouth, with the gin and the Tokaji's sugar swept. |

**closingLine:** *Pour more vermouth than gin. Make the joke yourself, then ask for it anyway.*
(4-gram check against every pour file, the registry, the rooms and reading v1: free. The only matches are this room and the reading's "more vermouth than gin". It no longer says "a bit much", so the name *A Bit Much* isn't spent a second time.)

## Image brief
**SCENE:** A large, chilled V-shaped cocktail glass stands at the end of a sleek, modern bar counter with no stools. The drink is clear, with no ice, and pale gold (my estimate from the bottles, unsourced: a pale vermouth with a little sweet wine in it). A twist of lemon peel sits in it. Beside the glass are an open bottle of French dry vermouth and a slim bottle of Hungarian sweet wine, neither label readable. Behind the bar is a long, crowded row of gin bottles of every shape, about fifteen of them. In the foreground, out of focus, is the arm of a heavy old overstuffed armchair, one of the old furniture set around the modern bar (*Proper* p. 141). **One impossible detail:** a single stage spotlight in hot fuchsia falls on the glass alone, with no lamp or fixture anywhere in the frame. **Palette:** deep, old upholstery colours and gold, with the one fuchsia beam. **Must not appear:** people, text or prices, a dropper, olives, ice in the glass, a second drink, chocolate, a vodka bottle, smoke, anything pink in the drink.

## Names
- *Say So*: the person who says out loud how it should be ("and they will say so").
- *A Bit Much*: Wren's earlier pick. It's close to what Chalker said of his own bar's name ("a bit overblown"), taken back with a wink.
- *More, Please*: the Diva's "yes, this, more" (Wren's alternate).
- *The Whole Picture*: everything, down to the room's age.
- **Pick: *Say So*.** I'm back on it, and so is Wren, so the cross is closed. Her point convinced me: the name is read cold, before the reading has earned the wink, so *A Bit Much* could land as a jab. *Say So* praises the person, and it doesn't repeat the closing line.
