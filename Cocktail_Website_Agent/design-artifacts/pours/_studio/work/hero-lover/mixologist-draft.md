# Mixologist draft: hero-lover (The Dashing Hero)

v1.2, round 4 step 1 (2026-10-04; drink unchanged since v1; Hester's r3 audit D1-D8 landed). Spec: `_studio/specs/hero-lover.json`. Built on Wren's accepted lead (the Vesper, owned as fiction) and her lead for the spark (the frozen rum drink the name came from, Oxford VESPER pdf 2099).

**Glassware:** deep champagne goblet (about 200 ml), chilled. As the novel orders it: "One. In a deep champagne goblet." (*Casino Royale*, 1953; card F3). Oxford's chilled cocktail glass is its own modern recipe (pdf 2100).
**Contains:** veto-free.

## Recipe

| amount | item | note |
| --- | --- | --- |
| 1 teaspoon (5 ml) | Jamaican rum, white or aged | not spiced, not sweetened; goes in first. Jamaican is my choice, for the island where the drink behind the name was served |
| 60 ml (three measures) | Gordon's London Dry gin, recommended | the gin the order names; or any London dry gin |
| 20 ml (one measure) | vodka | any plain vodka |
| 10 ml (half a measure) | Lillet Blanc | the aperitif wine once sold as Kina Lillet |
| 1 large, thin slice | lemon peel | cut wide, with as little white pith as you can |

## Method

1. Chill the glass: half an hour in the freezer, or fill it with ice and water while you work.
2. Pour the teaspoon of rum into the shaker first.
3. Then make the order exactly as it was given: three measures of gin, one of vodka, half a measure of Lillet.
4. Fill the shaker with ice and shake it very well, until the outside of the tin is ice-cold (about 10 to 15 seconds).
5. Empty the glass, and strain the drink into it.
6. Squeeze the lemon peel over the top so its oils fall on the drink, then drop it in.

## Checks

| Check | Result | Reasoning |
| --- | --- | --- |
| **Structure** | *Cocktail Codex* **Martini** family, split base | The *Codex* files the Vesper as a classic Martini whose "two core spirits are combined", with Lillet blanc in place of vermouth (p. 71; also pp. 65, 75). Core: gin and vodka. Balance: Lillet Blanc. Seasoning: the lemon peel's oils, and the teaspoon of rum (a small second spirit under the base; my call). The order is kept word for word in its proportions (3 : 1 : ½, a measure = 20 ml) and its method (shaken, as the order says; the *Codex* and *Joy* differ on stirring and ratios, *Joy* pdf 402 shakes it). |
| **Balance** | **OUT on sugar, justified** (`balance.py`, style `shaken-spirit`) | 95 ml → dilution 62.7% → 154.6 ml. Initial 36.0% / 1.00 g / 0.063%. **Finished 22.1% ABV (21-29, in range) · 0.61 g sugar/100 ml (3.7-5.6, OUT) · 0.039% acid (0-0.14, in range).** **Why it stands:** a dry Martini is outside Arnold's sample. His stirred ranges come from sixteen analysed drinks, "ignore outliers" (LI pdf 129), and his recipe sheet holds no Martini (my search of pdf 132-139). In his own words, "a martini contains no added sugar" (LI pdf 232). The story is the exact order, so sugar would break it. **Sweep:** Gordon's at 37.5 / 40 / 47.3% (the label differs by market; unsourced, Hester checks), rum 0 or 5 ml at 40 or 63%, and a smaller 45/15/7.5 build: every point 22.0-26.1% / 0.59-0.65 g / 0.037-0.041%, the same single OUT, so the numbers hold for any London dry gin and any Jamaican rum of 40% or more. The rum moves nothing measurable (no-rum: 22.0% / 0.65 g). **Proved fallback, if Robin wants it in range:** +10 ml simple syrup reads 20.3% (edge) / 4.22 g (in range) / 0.036%, balanced with an edge. I don't recommend it: it sweetens his order. |
| **Pairings** | gin, vodka, Lillet Blanc, lemon peel; spark: Jamaican rum | The base pairing is the order itself, and the books agree it works: the vodka "acts as a diluting agent, taking the edge off the gin" (*Joy* pdf 402); Lillet adds "a fruitier quality" than vermouth (*Codex* p. 71). **Spark:** In Ivar Bryce's account, which Oxford relays with an "apparently", the name came from "a curious drink of frozen rum with fruit and herbs" served at a country house in Jamaica (pdf 2099). The page names no particular rum, fruit or herb, and doesn't say where the rum came from. So I take only what it names, rum, and Jamaican is my choice, for the island where it was served: never "the rum they served". No fruit or herbs invented. A teaspoon goes in first, under the order: the private origin under the public polish (Wren's lead). Taste: my craft call, unsourced: a teaspoon of Jamaican rum in 95 ml is a seasoning, there in the finish for someone looking for it, and it gives back some weight when the gin is a soft 37.5% bottling (*Joy* warns a soft gin leaves the drink with "little character", pdf 402). **Flavor Matrix consulted and set aside:** no entry pairs rum with Lillet or with juniper (`library.py` "rum Lillet": no hits); the spark comes from the story's own page. Allspice dram set aside: it's *Someone Else's Map*'s spark in this family. |
| **Allergens** | **veto-free** (`allergens.py`: contains []) | Gordon's: new row `gin_gordons` (unsweetened London dry, no veto; distilled grain spirits aren't `gluten`, STUDIO-RULES 4). Jamaican rum: new row `rum_jamaican_any`, no veto (unsweetened, unspiced, as specified). Vodka, Lillet Blanc, lemon peel: existing rows, no veto. Wine fining ignored (no labelled bottle). Counts toward the AD-4 floor. |
| **Makeable** | basic kit; one recommended bottle | A shaker, a strainer, a jigger, a teaspoon, a peeler or small knife. Gordon's is named because the order names it; the numbers and vetoes are proved for any London dry gin of 37.5-47.3%. The change in its bitterness came in 1917, decades before Fleming and Bryce mixed with it (Oxford pdf 2100): never "the original can't be made". |
| **Sibling watch** | Martini · London dry gin · champagne goblet: free | The novel's goblet holds (Hester r2), and it keeps the shape clear of *Say So* (large V-shaped cocktail glass), *Quite Alive* (coupe) and *Can't Watch* (Nick & Nora). The order's "One." is a single drink: `serves` 1. The rum spark is a teaspoon, like *Someone Else's Map*'s allspice dram: the closing line keeps "spoon" out. |

**closingLine:** *The rum goes in first, under the order. Once, tell one of them they're the reason.*

(Changed from "where nobody looks" in r4 step 1: that phrase is *Not Only the Way*'s motif, the care added "where nobody looks" in caregiver-creator's Checks and image brief. "Under the order" is free in every pour file; "they're the reason" too. *Fair Measure*'s "You're the reason" is about the guest, not the people they love.)

## Image brief

- **Glass:** a deep champagne goblet on a short stem, frosted from the freezer, about two-thirds full: the novel's glass.
- **Drink:** nearly clear, with a faint straw tint from the half measure of Lillet Blanc (my estimate, unsourced: 10 ml of a pale gold aperitif wine in about 155 ml). Very cold: a thin frost on the bowl, tiny ice shards on the surface from the hard shake.
- **Garnish:** one large, thin, wide slice of lemon peel, inside the drink, curving along the bowl.
- **Setting:** night. A dark, polished bar top, black (Pantone Black C), one hard light from the side, deep shadows, clean lines. The glass alone, set slightly off-centre, as if placed exactly there by someone who has already stepped away.
- **The story in objects:** nothing shows the rum. That's the point: the private thing is under the order and the image keeps it.
- **Must not appear:** a tuxedo or bow tie, a gun, casino chips, cards or a roulette table, a cocktail shaker in the air, a woman, a second glass, any Bond prop or title, any bottle label, rum bottles, tropical fruit or herbs.

## Names

- *Exactly So* (my pick): the exactness is how they love, and the drink is his order, with one teaspoon under it.
- *Three and One*: the order's own count, for a bartender to say out loud.
- *Ice-Cold*: the order's own words, and the surface the Lover side fears being taken for.
- Set aside: *Without a Word* (echoes *Quite Alive*'s never-say-it frame, Wren's trap); anything with "who it's for" (*Whoever Comes In*'s closing line).
