# Tomás: cocktail, Ritual, Checks, image brief (draft v2, round 6)

v2 change: crème de violette 2 modern dashes (1.6 ml) → 1 tsp (5 ml). *Imbibe!* reads Ensslin's "2 dashes" as about a teaspoon (pdf 242; card C6), so v1 was not his dose. Hester's fixes applied: orris (F15), the dash (C6), Haus Alpenz (C7).

Spec: `_studio/specs/creator-regular-guy.json` (v2). Name, tagline and reading are the room's; nothing here is final wording until Wren reads it.

## Cocktail

- **glassware:** a stemmed cocktail glass (a coupe or any small stemmed glass), from the freezer
- **contains:** `["nuts"]` (maraschino, see Checks)

**recipe**

| amount | item | note (shown) |
| --- | --- | --- |
| 60 ml | London dry gin | |
| 22.5 ml | fresh lemon juice | |
| 15 ml | simple syrup (equal parts sugar and water, stirred until clear) | |
| 1 tsp (5 ml) | maraschino liqueur | |
| 1 tsp (5 ml) | crème de violette (Rothman & Winter recommended; or any crème de violette, a violet liqueur around 20%) | Ensslin's two dashes, about a teaspoon |

**method**
1. Put a stemmed glass in the freezer.
2. Squeeze the lemon.
3. Pour the gin, lemon juice, syrup and maraschino into a shaker. Add one teaspoon of crème de violette. No more than that.
4. Fill the shaker with ice and shake hard for about twelve seconds, until the outside is frosty.
5. Strain it into the cold glass.
6. Hand it over while the glass is still frosted.

**closingLine (draft):** *Hold it up to the light first. The colour was always there.*

(Hester's guard, round 4: never "his recipe" or "as he made it"; the glass is a modern build with his violette put back. Registry check: no closing line uses "light" or "colour". Wren's guards: no "small/smallest" near the violette, no camera words. The noticing lives in the closing line only (round 7: step 6 no longer repeats it). At 1 tsp the colour is visible, pale sky blue: "faint" and "only if you look" are retired everywhere.)

## Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | Daiquiri family, sour: spirit + citrus + sweetener. Core = London dry gin; balance = lemon + simple syrup; seasoning = maraschino + crème de violette. Reference Aviation: *Codex* p. 278 (60 Plymouth gin, 7.5 violette, 1 tsp maraschino, 22.5 lemon, 15 simple, shaken, coupe). The only change is the violette, cut from the *Codex*'s 7.5 ml to 5 ml, what Ensslin's "2 dashes" come to as *Imbibe!* reads them (pdf 242; card C6). The *Codex*'s build with his violette: never "his recipe". The *Codex* itself warns that violet liqueur works "in moderation" and turns to "liquid soap or perfume" in larger amounts (p. 175); Wondrich finds Ensslin's own balance soapy and uses less (F13); here 5 ml is 4.7% of the mix before shaking, under the *Codex*'s 6.7% and Ensslin's ~6%, because the build is longer and sweetened. We go no higher. ✓ |
| Balance (*Liquid Intelligence*, shaken) | Shaken ranges: initial ABV 23–31.5, sugar 8–13.5, acid 1.2–1.4; final ABV 15–19.7%, sugar 5–8.9 g/100 ml, acid 0.76–0.94%, dilution 51–60%. **v2: initial 28.7% · 12.29 g · 1.26%; final 18.2% · 7.81 g · 0.80% · dilution 57.3%. Every line in range.** v1 (1.6 ml violette, a modern dash) was also balanced (18.4% · 7.28 g · 0.82%) but wasn't his dose: my conversion caught me (C6). Rejected: **Ensslin 1916** (45 gin, 22.5 lemon, 2 dashes each maraschino and violette) OUT, finished sugar 1.35 (floor 5.0), acid 1.20 (ceiling 0.94): a sour with nothing to sweeten it. **Oxford** (50/15/8/5) OUT, 21.4% ABV, sugar 3.89. **Joy** (60/15/7.5/15) OUT, 21.3% ABV, acid 0.57, and 15 ml violette is the purple showpiece. His own spec has no sweetener but the two liqueurs; the syrup supplies what it lacks. Values: all from the LI ingredient table (pdf 140–141); none unsourced. 108 ml in, ~169 ml out: fits a standard coupe. |
| Pairings | Own knowledge and books: lemon and juniper are the gin sour's oldest pair. Maraschino's bitter-cherry, almond-like note (*Codex* p. 174) rounds the lemon's edge. The violette isn't a stranger to the gin: orris root is a common gin botanical (*Codex* p. 66), carried by many London dry gins (Beefeater, Plymouth, Gordon's; Oxford pdf 245, 1538, 1986), and its oil smells of fresh violets (Grieve, *A Modern Herbal*, 1931, secondary; card F15). Not every gin has it, so the reading says "many". The *Flavor Matrix* files violet's aroma compound (beta-ionone) alongside raspberry and cedar (pdf 278, 289): floral and woody, which is why it reads as perfume if overdone. No surprising pairing forced. ✓ |
| Vetoes | egg-white ✗ · dairy ✗ · gluten ✗ (distilled) · **nuts ✓ (maraschino)** · spice ✗. Maraschino is distilled from marasca cherries *with their crushed stones* and tastes of almond (*Codex* p. 174). The table had it `[]`; I moved it to `nuts` (round 4), the same safe-side call as amaretto under Robin's rule: a nut-allergic guest would reasonably fear it. `allergens.py --check "nuts"` → contains ["nuts"], matches, exit 0. **Not veto-free.** The veto-free floor stays met (3 approved, floor 3 now; 12 at launch). Maraschino can't be dropped: without it this isn't an Aviation. |
| Makeable | Supermarket gin, lemons, sugar. Maraschino liqueur is a standard back-bar bottle. Crème de violette is the one particular bottle, named because it is the story (the Rothman & Winter bottling is the one the importer Haus Alpenz brought back to the US in 2007; F11, C7), with the style as substitute. Shaker, strainer, jigger or teaspoon, a stemmed glass from the freezer. |
| Language | Method and closing line: second person, plain words, no bar jargon ("shake hard… until the outside is frosty"), no gendered words about the guest, no camera words. Reading (Wren's v3, Resonance above): second person; no drink assumed in hand (the ask is a printed day, given away); romance signposted ("I like to think"); El Bart hedged ("probably"); no archetype names; no "small/smallest" near the violette; he/his only for Ensslin (4 lint warnings, Wren's call). Drink text matches the spec: a teaspoon each, "a pale sky blue", "only the colour is his". ✓ |

## Image brief (draft)

> A single stemmed cocktail glass on a worn, dark-navy bar top in plain afternoon light, holding a cold, softly cloudy drink of pale sky blue, the colour of a sky just clearing; no garnish, no ice, a fine frost on the bowl. Beside it, a slim printed bar book with a faded crimson cloth cover lies open, its recipe columns too soft to read, a pencil resting in the fold beside one faint pencil tick in the margin. Behind, a half-squeezed lemon on a folded bar towel and a stoppered bottle of dark violet liqueur with no readable label; an old hotel bar softly out of focus. On the surface of the drink, an open sky with one drifting cloud is reflected, though the room has no window above it. + HOUSE STYLE + AVOID

- **Glass and drink:** stemmed cocktail glass (coupe); shaken, so softly cloudy, never clear; pale sky blue (5 ml violette in ~169 ml, about 3%). Not purple, not vivid blue, not lavender. No garnish (Ensslin's has none; the *Codex*'s cherry is not in our drink).
- **Props (story):** the open printed bar book (Ensslin's was printed, 1916: the record of what New York's bars were actually serving, F4; no legible text, no year, no title); the pencil and its one tick (someone noticed; our prop, not a fact about Ensslin); the lemon (the everyday sour); the violette bottle (the colour put back). Wren and Hester to cut or swap.
- **One impossible detail:** the sky reflected on the drink's surface in a room with no sky above it. The colour is really there.
- **Must not appear:** a camera, photographs, film, frames, darkroom anything (Wren: no camera talk); aeroplanes, propellers, pilots or wings (the WWI aviator story fails, fact card legend); a purple or vivid-blue drink; a cherry garnish; violet flowers (garnish-as-poetry); readable text, dates or brand names; a person or a face; a second drink; smoke.
- **Palette:** the persona's own: deep navy (Pantone 2766 C) in the bar top, crimson (485 C) in the book's spine, teal (7462 C) only as a hint in the cool light off the glass.
