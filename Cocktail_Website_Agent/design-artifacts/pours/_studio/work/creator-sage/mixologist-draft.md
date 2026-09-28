# Tomás: drink draft v3.1, creator-sage (round 7)

Spec: `_studio/specs/creator-sage.json`. Numbers log: `mixologist-numbers.md`.
v3 vs v2: passion fruit syrup withdrawn for plain syrup (Wren R5: one change, not two; I concede, see Pairings). Orange liqueur note corrected (Thomas had no curaçao in his *whiskey* cocktail, *Imbibe!* pdf 176; it's Wondrich's swap, F9). Peel step reworded off *Still Yours*'s wording. Hester R5 absolutes struck. v3.1 (round 7): drink unchanged; closing line "beside" → "next to" (name *Beside the First*); name pick moved; image book fixed to Hester's audit v2 (the Improved recipes are an appendix at the back of the same book, not a facing page).

## Recipe

- **serves:** 1
- **glassware:** a small coupe (a stemmed cocktail glass with a rounded bowl), chilled, its rim wiped with lemon
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 60 ml | rye whiskey (any, 40–50%) | |
| 7.5 ml | simple syrup (sugar and water, 1:1) | |
| 2.5 ml (½ tsp) | orange liqueur (triple sec, Cointreau style) | instead of the cherry liqueur of 1876 |
| 2 dashes | Angostura bitters | |
| 5 ml (1 tsp) | green Chartreuse | where he put his dash of absinthe |
| 1 | strip of lemon peel, plus a lemon wedge for the rim | |

## Method
1. Put a small coupe in the freezer, or fill it with ice and water while you mix.
2. Empty the glass if you filled it, and run the cut side of a lemon wedge around the rim.
3. Measure the rye, the syrup, the orange liqueur and the bitters into a shaker. Add the teaspoon of green Chartreuse last, on its own.
4. Fill the shaker with ice and shake hard for about 10 seconds.
5. Strain into the cold glass.
6. Twist the strip of lemon peel over the glass to spray its oil onto the drink, then drop it in.

**closingLine:** *Taste it next to the one you already know. Then decide.*

- Carries the position (p5: change one thing, show the two side by side, let people choose) as something a reader can do. Doesn't repeat the tagline or epigraph. Grep of every pour file: no "then decide", no "next to the one". Says "next to", not "beside", so it doesn't echo the name *Beside the First* or the epigraph's "beside it".

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family.** The root is "a glass of booze that's been sweetened with sugar and seasoned with bitters" (p. 4). The Codex prints the **Improved Whiskey Cocktail** as "probably one of the first popular Old-Fashioned variations", seasoned with absinthe (p. 17), and defines "improved" as "adding a bit of highly flavorful liqueur to a basic cocktail" (p. 88). **Core:** rye. **Balance:** simple syrup and a half-teaspoon of orange liqueur. **Seasoning:** Angostura, a teaspoon of green Chartreuse in the absinthe's place, lemon oil on the rim and on top. **Serve:** shaken with ice and strained, as Wondrich reconstructs Thomas's 1876 serve (*Imbibe!* pdf 180, a composite; Hester R4). That's our choice following his reading, never "his method"; it also keeps the drink off *A Brother's Care*'s stirring. **Our one change:** absinthe → green Chartreuse, the same slot, a larger dose (1 tsp against Wondrich's reading of ⅛ tsp for Thomas's dash). **Not ours:** maraschino → orange liqueur is Wondrich's own suggestion (pdf 180, F9), taken because maraschino is nuts in our table. His plain *whiskey* cocktail had no curaçao (pdf 176), so never "where he first had it". |
| Balance (Arnold; style `shaken-spirit`, the Stinger's category: shaken, no citrus juice) | Recipe 77 ml → dilution 67.0% → 128.6 ml. **Finished 26.9% ABV, 5.11 g sugar/100 ml, 0% acid. All in range** (21–29 / 3.7–5.6 / 0–0.14). `balance.py` notes Arnold has no own category here; strength and sugar are judged against stirred finished ranges, acid not required. Thomas's recipe as written (Wondrich's dash sizes, maraschino, absinthe) reads 27.4% / 3.44 g (sugar EDGE, just under the floor). **Sweeps:** syrup 5 ml → 27.8% / 4.04 g (in); 7.5 ml (pick) → 5.11 g; 10 ml → 6.13 g (**OUT**), so "a little sugar" means 7.5 ml at most. Chartreuse 2.5 ml → 4.78 g (in); 7.5 ml → 5.42 g (in): the teaspoon is a taste choice, not a balance one. Whiskey strength: 50% → 26.9%; 45% → 24.8%; 40% → 22.8%: any rye from 40% to 50% is in range. Rejected on the way: built on a rock (60 ml of 50% rye → 36.2%, over 32%); Arnold's stirred ranges (acid OUT by design, they assume vermouth); passion fruit syrup v1/v2 (balanced, 5.02 g, withdrawn for the person, below). |
| Pairings | **Classic:** rye, sugar, Angostura and lemon oil are the whiskey cocktail itself; orange with whiskey is an old pairing (my own knowledge), and Wondrich's swap (F9). Green Chartreuse as a seasoning with whisky: the *Codex*'s Smokescreen gets its "herbaceousness from green Chartreuse" against scotch (p. 132); the La Valencia pairs Chartreuse (yellow) with rye (p. 188). **The spark is the Chartreuse in the dash slot**: an original change inside a classic, which is what the riff rule asks. **The *Flavor Matrix* was consulted and its surprise set aside:** Grain (rye's base) lists passion fruit among its surprising pairings (pdf 136; coconut on the same list is nuts). It balanced (v2), but Wren showed it was a second change for a person whose whole story is one visible change, and the guest would taste two new things fighting for the one slot the story points to. That convinced me. Recorded so Robin sees the spark rule was applied, not skipped. **What it tastes of:** rye's spice and grain, a green herbal lift in the middle from the Chartreuse, a faint orange sweetness, lemon on the lip. Strong, cold, aromatic. No pour uses Chartreuse in the drink (grep). |
| Allergens | `allergens.py`: **veto-free** (AD-4 floor holds). Maraschino (nuts, stones distilled with the fruit) is out, which is why the orange liqueur is in. Rye is a distilled grain spirit, so **not gluten** (rule 4). Angostura and Chartreuse are not spice (heat only). The `passion_fruit_syrup` row I added in round 4 stays in the table, unused. |
| Makeable | Kit: shaker, strainer, jigger, a coupe, a lemon. No homemade prep beyond stirring sugar into water. **Green Chartreuse is named because there's only one**: the style substitute is "any strong green herbal liqueur", and the numbers and vetoes are proved for Chartreuse only (55%, 25 g/100 ml). It's the priciest bottle here, but at a teaspoon a drink one bottle lasts a very long time. Rye and orange liqueur are generic styles. |

## Names (≥3; bartender-sayable)
- **Beside the First** (Wren; Hester's pick; **now mine too**). Sayable, a little mysterious, and it's the person's position: the new one never replaces the old. Hester's audit backs it read as "in the same book". I moved because Hester is right that *Still Improving* opens like *Still Yours*, and two "Still" names in one family would blur on a menu.
- *Still Improving* (my first pick, withdrawn for the reason above).
- *Fourteen Years On*, *Not Settled*, *The Supplement* (Hester), for the record.
- **One Change.** The position in two words, and the drink: one teaspoon in one slot.
- **The Spoonful.** The bar's name for it; more about the drink than the person.
- Checked against the registry: no repeats.

## Image brief

> A small chilled coupe on a worn, pale taupe wooden workbench under warm, low, late-afternoon light. The drink is a clear deep amber-gold, very slightly hazy from the shaking, with a thin ring of fine bubbles at the edge. The rim catches a faint wet shine where lemon was wiped around it, and a curl of lemon peel rests in the drink. Beside the glass, an old, thick bound book lies open near its end: every page is yellowed, cracked and time-worn, except the last few pages at the back, which are bright, new and white, as if they had been printed and bound in this morning; none of the text is readable. On those new pages lies a single silver teaspoon holding a few drops of vivid green liqueur. Near the book: half a lemon, a small plain unlabelled bottle of green liqueur, and a pencil beside a rough sketch of a glass on parchment, its lines corrected over and over. + HOUSE STYLE + AVOID

- **Glass and drink:** a small coupe, stemmed, rounded shallow bowl. As served: **clear deep amber-gold** (rye, with only a teaspoon of green in 77 ml, so never green), a faint shaken haze and a fine ring of bubbles. Lemon shine on the rim (not sugar, not salt). One curl of lemon peel in the drink. No ice in the glass.
- **Props (story, four):** the old book with new pages at the back (the Improved recipes added in a supplement at the back of the same book, the old ones left standing; *Imbibe!* pdf 17, 179; Hester audit v2); the teaspoon of green (our one change, in the slot of his dash); the half lemon (the rim and the peel of his serve, F11); the corrected sketch on parchment (a master still refining their own work; the persona's "sketches and blueprints", "aged textures").
- **One impossible detail:** the last pages of a century-and-a-half-old book are freshly printed and bright white. It reads as "added to, not replaced". Not a facing page (Hester: there never was one). *Rosetta* also has a worn open book; ours is told by the new pages, theirs is unreadable and read three times, so the meaning differs, but Robin may want one of them to change if the images sit together.
- **Must not appear:** absinthe, a sugar cube, a fountain or drip (*Rosetta*); passion fruit or any tropical fruit (withdrawn); any Vitruvian Man or Da Vinci drawing (Wren: imagery, not a hook); a crown, throne, trophy or award; sage leaves (*A Brother's Care*); a second drink; people or hands; readable text, labels or logos; a green drink; a sugared rim; ice in the glass.
- **Palette:** the persona's rich green (Pantone 342 C) only in the spoonful and the small bottle; earthy taupe (7504 C) in the bench and the old page; warm ochre (1355 C) in the light and in the drink's amber. The drink stays its true colour, clear amber-gold.
