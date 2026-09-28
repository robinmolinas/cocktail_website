# Tomás: Ritual, Checks and image brief, v1 draft (creator-hero, round 4)

Spec: `_studio/specs/creator-hero.json` (the *Cocktail Codex* Ramos Gin Fizz, unchanged).
**Rework 2026-09-25:** Robin cleared orange flower water (no allergen); it's in `ingredients.json` now. `allergens.py --check "egg-white,dairy"` matches, exit 0. The fallback is retired (kept below, struck, for the record).

## Cocktail (draft for the pour file)

- **glassware:** tall glass (a highball or Collins glass), no ice
- **contains:** `["egg-white", "dairy"]`

**recipe**

| amount | item | note (shown) |
| --- | --- | --- |
| 60 ml | London dry gin | |
| 15 ml | fresh lemon juice | |
| 15 ml | fresh lime juice | |
| 30 ml | simple syrup (sugar and water, 1:1) | |
| 30 ml | heavy cream | |
| 1 | egg white (about 30 ml) | |
| 3 drops | orange flower water | as written in the recipe he gave away |
| 60 ml | soda water, very cold | |

**method**
1. Put a tall glass in the freezer.
2. Pour the gin, both juices, the syrup, the cream and the orange flower water into a shaker. Add the egg white last.
3. Close the shaker and shake it hard with no ice for about fifteen seconds, until it froths.
4. Fill it with ice and shake hard for five minutes. That's longer than you'll want to. If someone is with you, hand them the shaker halfway, and don't let it stop.
5. Strain it into the cold glass through a small sieve. No ice in the glass.
6. Pour in the soda slowly, a little at a time, tapping the base of the glass on the table now and then, until a firm white cap of foam stands on top.
7. No garnish. Serve it while the foam stands.

**closingLine (v2, Wren's wording, accepted round 6):** *Pass the shaker when your arms give out. Just don't let it stop.*
- v1 was *Pass the shaker if you must. Just don't stop shaking.* Wren's ruling: "if you must" turns passing the shaker into a concession, and this guest already hears asking for help as weakness. Accepted.
- Registry: unique. It doesn't echo the epigraph ("The recipe was always free. The effort never was.").
- Wren to judge: it's close in spirit to the tagline ("You won't make it smaller so it can be done"), but none of the words are shared. Alternative: *When your arms give out, pass it on. The foam waits for no one.*

Sources for the method: *Cocktail Codex*, Ramos Gin Fizz (shake once without ice, then with ice for five minutes, "more than enough"; add the soda slowly and tap the glass until a white puck of foam forms). *Liquid Intelligence*, egg-white sidebar (add the egg white after the other ingredients). The five minutes is the Codex's working time for a home cook, not a historical claim about Ramos's bar (Hester: shake times stay out of the reading).

## Checks (dossier table draft)

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | Daiquiri (sour) family, sours with bubbles, fizz subfamily. The Ramos is a Silver Fizz enriched with heavy cream (*Codex*, Silver Fizz / Ramos Gin Fizz). Core = gin; balance = lemon + lime against simple syrup; seasoning = orange flower water; texture = egg white + cream; lengthened with soda. ✓ |
| Balance (*Liquid Intelligence*, egg-white and carbonated drinks, pdf 130 / p. 126) | Arnold has no fizz category, so it's judged in two stages. **1. The shaken base** (180 ml, egg-white ranges): initial sugar 11.02 ✓, acid 1.00 ✓ (top of range); finished sugar 7.82 ✓, acid 0.71 edge (range 0.49–0.68). **Strength OUT**: 15.7% initial (18–23), 11.1% finished (12.1–15.2). The whole gap is the 30 ml of cream: without it the same base starts at 18.8%, inside the range. That's our reading of the numbers, not Arnold's statement. The dilution figure (40.9% against 46–49) follows from the low starting strength, and the tool models a 10 s shake, not five minutes. **2. After the soda:** about 314 ml at roughly 9% ABV, 6.3 g sugar/100 ml and 0.57% acid. That's below every Arnold strength range: a low-strength long drink by design, and the Codex classic as printed. **Flagged edge, justified, not hidden.** Unsourced value: heavy cream (3 g sugar/100 ml). |
| Pairings | Own knowledge: gin + lemon + lime + sugar is the sour core. Cream softens the acid and rounds the juniper, the old cream-lemonade idea Ramos joined to the fizz (Oxford, RAMOS GIN FIZZ, pdf 1608, via Hester). *Flavor Matrix*: floral and fruit aromas are "very closely related because all fruit-bearing plants produce a flower", and orange blossom is the book's first example of a floral aroma (pdf 270). The blossom sits on the citrus it comes from. No surprising pairing forced: the surprise in this drink is the effort. ✓ |
| Vetoes | egg ✓ (egg white) · dairy ✓ (heavy cream) · gluten ✗ (distilled gin doesn't count) · nuts ✗ · spice ✗. `contains: ["egg-white", "dairy"]`. Orange flower water: no allergen (Robin, 2026-09-25). `allergens.py --check` matches, exit 0. This would be the studio's first pour that isn't veto-free. The AD-4 floor (3 veto-free) is already held by the approved three. |
| Makeable | Supermarket bottles. Orange flower water is sold in the baking aisle. One shaker, a small sieve, a tall glass. The only hard part is the five minutes, and that's the point. |

## Image brief (draft)

### Image brief
- **Glass and drink:** a tall, straight-sided highball glass, no ice, no straw, no garnish. The drink is opaque ivory-white, softly clouded, with a firm white cap of foam on top, level with the rim (*Codex*: "a white puck of foam should form on top"). The only foam above the glass is the impossible spire below. Faint condensation on the glass.
- **Props (the story in objects):** a line of old tin shakers standing down the length of the bar, fading into the dark, as if waiting to be passed on · a folded old newspaper with illegible print, left open on the counter · a small brown bottle of orange flower water · halved lemons and limes and one cracked eggshell on a board.
- **One impossible detail:** the foam keeps rising above the glass into a slender, unfinished spire, still being built.
- **Must not appear:** people or hands (the house rule; the shakermen are honoured in the story, not drawn); ice in the glass; any garnish; a second drink; any readable text; any cathedral or blueprint (the story is Ramos's, not Gaudí's).
- **Palette:** night-blue shadows (Pantone 7690), soft gold bar light (7403), a touch of burgundy in the wood (200).

**SCENE (paste-ready):** A tall, straight-sided highball glass stands alone on a dark wooden New Orleans bar at night, filled with an opaque ivory-white gin fizz and no ice, no straw and no garnish. A firm white cap of foam sits on top, and from its centre the foam keeps on rising into a slender, unfinished spire, still being built. Behind it, a long line of old tin cocktail shakers stands down the length of the bar, fading into deep blue shadow. On the counter lie a folded old newspaper with illegible print, a small brown bottle of orange flower water, and a board with halved lemons and limes and one cracked eggshell. Soft gold light falls on the glass; burgundy tones in the old wood.

## ~~Fallback if Robin rules out orange flower water~~ (retired 2026-09-25: Robin cleared it)
~~Drop the 3 drops. After step 6, squeeze a strip of orange peel over the foam so its oils fall on it, then discard the peel. That keeps an orange-blossom lift and covers the egg smell (*Codex*, egg-white section). `contains` stays `["egg-white", "dairy"]`. The recipe note moves to the cream or goes. In the image brief, the bottle of orange flower water becomes a strip of orange peel on the board. Hester's caution stands: without the flower water it isn't Ramos's 1925 formula, so paragraph 4 of the reading would have to say "his drink, near enough".~~

## Names (Tomás, round 5)

The registry shows no clash for any of these.

| name | said across a bar | what it says about the person | risk |
| --- | --- | --- | --- |
| **Down the Line** (pick) | "A Down the Line, please." | Two true meanings in one everyday phrase. It's the chain of shakers the drink needed (*Imbibe!* pdf 111, "a long chain"), and it's where this person is always looking: years down the line, past their own part in it. It names the handover without promising an ending. | It could read as "later, someday". Paragraph 3 answers that. |
| **Full Measure** | "Full Measure." | The refusal of the smaller version, in bar language. | It sits close to the tagline in idea. |
| **The Whole of It** | "The Whole of It." | Taken from the proposal ("tell someone the whole of it"). Their vision at its real size. | It depends on the proposal to land, and it's softer to say. |
| Not Yet Finished (not offered for the pick) | | The unfinished cathedral. | It dwells on the ending, which Wren asked us to avoid. |

Avoided: *One and Only One* (Ramos's own name for the drink, Hester's fact). A signature is the Auteur's need, not the Visionary's (Wren).

### Round 6
Pick held: **Down the Line**. Against *Well Shaken*: "well" is bar talk for the house pour, the cheapest bottle on the rail, so said across a bar it sounds like "a well, shaken". That's ordering the smaller version by name. It also now echoes the epigraph ("never how long to shake"). To Robin as options: Well Shaken, The Whole of It, Full Measure.

### Round 8: review of the assembled pour-draft.md
- The recipe, method, closing line, Checks and names match this file. No clash: the tagline (*Slow you can live with. Small you can't.*), the epigraph (*He gave the recipe away. The cloud has to be earned.*) and the closing line share no words and do different jobs. The "cloud" in the epigraph is craft-true (the *Codex* calls the texture "a boozy liquid cloud").
- My own error, fixed: the image brief had the foam "standing just above the rim". That's the wording I told Wren to drop in round 6, and it also blurred the one impossible detail. The real foam is now a cap on top, level with the rim, and the spire is the only thing above the glass. The host should carry this into pour-draft.md.

## Rework check, round 11 (2026-09-25)
The earlier notes above that quote the old tagline and epigraph (the closing-line echo checks, the round-8 draft check) are history. The new pair (*Your plans were never meant to fit in one lifetime.* / *Anyone can have the recipe. The foam has to be earned.*) touches nothing in the recipe, method, Checks or image brief. The brief already shows the foam cap and the newspaper (the recipe he gave away), so the image supports the new epigraph as it stands. No change.
