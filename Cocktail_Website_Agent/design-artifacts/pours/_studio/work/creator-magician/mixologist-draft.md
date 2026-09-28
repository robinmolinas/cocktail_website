# Tomás, round 4 (updated rounds 5-6): the drink, the Checks, the Ritual, names, the image brief

Spec: `_studio/specs/creator-magician.json` (v2, round 4). Story: Dave Arnold's milk-washed Arnold Palmer (Hester's anchors). Person: Wren's card ("You're the only one who isn't worried"). Served as Wren asked (R3): made the night before, poured cold from the bottle, the guest never sees the curds.

## What changed from v1, and why
- **Hester's tamarind source sank v1.** Her figures (El-Siddig et al. 2006, via `fact-cards/tamarind.md`) put the sour part of our tamarind water near 1.2–2.6% and its sugar at 7–13 g, not my 4% and 20 g. I re-set the row to the middle (2.0% / 10 g). v1 with tamarind as the only acid then comes out ~0.37% acid after the wash: flat. **So the lime comes back (10 ml).** Tamarind still gives 60% of the acid and all the fruit.
- **The tea moved into the rum.** 15 ml of brewed tea took it under 15% alcohol. Arnold steeps the tea in the spirit itself (LI pp. 268–269), which is his before-and-after exactly. New row `rum_aged_tea` (contains none).

## Recipe (for the pour)

- **glassware:** a small tumbler (rocks glass), chilled, no ice
- **contains:** `["dairy"]`
- **Makes:** about a litre, 7 or 8 glasses. Per glass it's the spec: 60 tea rum / 45 tamarind water / 10 lime / 7.5 demerara syrup / 30 whole milk, before the wash.

| amount (batch) | item | note (shown) |
| --- | --- | --- |
| 480 ml | aged rum, steeped with 15 g loose black tea | the milk softens the tea's harsh edge and leaves its flavour |
| 360 ml | tamarind water (below) | the star; sour tamarind, never sweet |
| 80 ml | fresh lime juice | |
| 60 ml | demerara syrup (equal weights demerara sugar and hot water) | |
| 240 ml | cold whole milk | it curdles, and the curds are strained out |

**Tamarind water:** 150 g block of sour, seedless tamarind pulp (from a supermarket's world-food aisle or an Asian grocer; the packet should not say "sweet"). Break it up into a bowl, pour on 375 ml just-boiled water, leave 30 minutes, mash it with a fork, and press it through a sieve with the back of a spoon. Keep 360 ml.

## Method (v1; Wren to read)

**A day ahead**
1. Put the tea in the rum in a jar, shake it, and leave it 20 to 30 minutes, until it's as dark as strong tea. Strain out the leaves.
2. Make the tamarind water.
3. Mix the tea rum, tamarind water, lime and demerara syrup in a jug. Taste it. It should be too sour to enjoy: the milk softens it. If it isn't, add lime a little at a time until it is.
4. Pour the milk into a large bowl. Pour the punch into the milk slowly, stirring gently as you go (the punch into the milk, never the milk into the punch). Within a minute or so the milk breaks into soft curds, like scrambled egg in cloudy liquid. It looks ruined. That's right.
5. Stop stirring. Leave it an hour.
6. Set a sieve lined with a paper coffee filter over a clean jug, and pour everything in, curds and all. The first cup runs cloudy: pour it back over the curds. Once the curds have settled on the filter, they do the cleaning. Leave it to drip in the fridge overnight. Don't press it.
7. Bottle what came through and keep it in the fridge. Throw away the curds.

**To serve**
8. Pour it cold from the bottle into a chilled small tumbler, about 125 ml. No ice.

Notes: step 4's order is Arnold's modern rule (LI p. 269), not the old recipes' (Franklin poured hot milk into the punch; Hester R3). Step 6's pouring back through the curds is our method, not history. It's best within about a week (Arnold on milk-washed spirits, LI p. 267); I make no claim beyond that.

**closingLine (settled round 5):** *Leave it overnight, and don't fix what you find.*
- Wren's line, and I took it over mine. It's true of the glass: the one way a home maker ruins this is panicking at the curds, stirring them or squeezing the filter, which pushes the cloudiness back through (method 5-6). And it carries the reading's position (yours 5: don't fix it straight away) as a gesture with the drink. The adjusting happens before the milk (step 3); after it, you leave it.
- Dropped: *Make it tonight. Pour it tomorrow like it took no time at all.* (mine; it restated the name and the serve, not the person's position) / *Nobody has to see the middle. Just pour.* / *Pour it from the bottle. Let them think it was easy.*
- Registry: no overlap. Nearest ending is No Accident's "Don't stir it." Different verb and a different act (theirs is served unstirred to be drunk in bands; ours is left alone while it's made). Flag for Robin's cross-check.

## Checks (for the dossier)

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Daiquiri family, made as a milk punch.** A sour (spirit, sour, sweet), batched, broken with milk and filtered. **Core** = aged rum steeped with black tea. **Balance** = tamarind water and lime (sour), demerara syrup and the tamarind's own sugar (sweet). **Seasoning** = the tea. **The wash:** milk 1:4 to the punch, Arnold's own ratio (250 ml milk to 1 L, LI p. 268). The milk protein binds the tannic, astringent compounds and leaves with the curds, "leaving the rest of the tea flavor intact" (LI p. 265); the whey stays and gives it a silky body (p. 263). Acid and sugar aren't what the protein takes, so I **expect** the tamarind's sourness and fruit to come through (Wren's guard). It's an expectation, not a certainty: the same proteins also strip "some flavors" (LI p. 266), and nobody has made it yet. That's why the tamarind is dosed as the star (45 ml, the biggest thing after the rum). |
| Balance | `balance.py` (freeform: nothing models the break), **before the wash:** 152.5 ml, **15.7% / 7.08 g / 0.98%**. **After the wash, by hand:** the curds take the milk's fat and casein (~6.5% of the milk's volume, ~2 ml a glass); liquid held in the curds leaves in proportion and doesn't move the numbers. Breaking the milk spends acid: LI p. 268 breaks 250 ml of milk with ~2–2.25 g acid, so ~0.85 g per 100 ml milk, ~0.25 g a glass, all counted as spent (the safe side). **Result: ~15.9% / ~7.2 g / ~0.83%**, inside Arnold's shaken-sour finished ranges (15–19.7 / 5.0–8.9 / 0.76–0.94). **No ice:** it's already at drinking strength, because the water in the tamarind and the milk's whey do what melted ice does in a shaken sour; ice would take it under 15%. Served at fridge temperature, warmer than a shaken sour, so sweetness and alcohol read a little louder; it sits mid-range on sugar, and ~1.5 g of that sugar is lactose, which tastes far less sweet. **Sensitivity (flag):** across Hester's tamarind range (sour acid 1.2–2.6%, sugar 7–13 g), it lands 0.59–1.01% acid and 6.3–8.1 g sugar. The flat end is caught by method step 3 (too sour before the milk; add lime). **Rejected:** v1 (60 rum / 40 tamarind / 5 demerara / 15 tea / 30 milk, no lime) ~0.37% acid after the wash with the sourced tamarind values; v0b and the tea-as-water versions under 15%. Tamarind values are estimates from a secondary source; the post-wash figures are arithmetic, not measured. |
| Pairings | **Spark:** tamarind is one of the *Flavor Matrix*'s surprise pairings for dairy (Dairy, pdf 104). The dairy pairing wheel (pdf 105) carries rum, tea, citrus and tamarind, every flavour in this glass. Tamarind and lime, sour on sour: tamarind brings a dark, dried-fruit sourness, lime brings the bright top. **What I expect it to taste of** (on paper; untasted): tamarind first, tart and a little like dates, then strong black tea without its bite, the rum underneath, and a soft, rounded body. |
| Vetoes | egg-white ✗ · **dairy ✓** (the milk's whey proteins and lactose pass the filter; only the curds are removed) · gluten ✗ (rum is distilled) · nuts ✗ (tamarind is a legume pod, not a nut) · spice ✗ (no heat). New rows, my call: `tamarind_water` (none; revised round 4 to Hester's source), `rum_aged_tea` (none). `allergens.py` → contains `["dairy"]`. **Not veto-free.** |
| Makeable | No named bottle: any aged rum, any strong loose black tea, a block of sour tamarind (world-food aisle or Asian grocer; not "sweet tamarind"), limes, demerara sugar, whole milk. Kit: a jar, a sieve, paper coffee filters, a large bowl, a jug, a bottle, the fridge. About 30 minutes of work and a night of waiting. Nothing to do at serving but pour. |

## Names (≥3, pick)

Registry checked: no overlap.
- **Pick: Overnight.** Said across a bar, it's short and a little mysterious ("an Overnight, please"). It's true of the glass (made the night before, poured as if it took no time) and of the person: the overnight transformation everyone sees, and the hours nobody does. **Flag for Wren:** *Four Shares* already makes its oleo "the night before" (care that takes time). The name puts the night at the front; if that reads as their motif, drop it.
- **The Break.** What the milk does, the moment it looks ruined, and the person's calm through it. Sayable, but it can read as "a rest".
- **Side Benefit.** Arnold's "unintended side benefit", the silk. Wren said the ending may grow from it, so it may belong to the reading, not the name.
- **Still Strong.** From "the tea flavor was still very strong": that's so you. But across a bar it sounds like a comment on the alcohol.

## Image brief (draft)

> A chilled small tumbler, no ice, on a pale wooden kitchen table in bright morning light from a window, the wall behind it a soft sky blue. The glass is two-thirds full of a translucent pale amber-gold drink, bright where the light passes through it, poured moments ago. Beside it stands a plain glass bottle with a swing-top stopper, cold, beaded with condensation, holding the rest of the same gold drink. On the table: a tamarind pod cracked open, its brown, brittle shell broken away from the sticky dark pulp; a small heap of loose black tea leaves on a saucer; half a lime, cut side up. A tangerine-coloured linen cloth folded under the bottle. Inside the broken tamarind pod, the pulp glows the same bright gold as the drink. + HOUSE STYLE + AVOID

- **Glass and drink:** a small tumbler (rocks glass), no ice, no garnish. The drink is translucent pale amber-gold, never milky, never brown, never bright orange. (Colour is my expectation: the wash strips colour as well as tannin, LI p. 266; nobody has made it yet.)
- **Props (story, four):** the cold bottle (made the night before, poured from); the cracked tamarind pod (the humble ingredient in the starring role); loose black tea (Arnold's tea); half a lime.
- **One impossible detail:** the pulp inside the ugly tamarind pod glows the colour of the finished drink. The good version already in there.
- **Must not appear:** curds, milk, a milk jug or carton, a sieve, a coffee filter, anything mid-process (the middle happens where nobody's watching, Wren R3); before-and-after split frames or "reveal" TV staging; magic wands, top hats, sparkles, glitter; any colour-changing liquid; ice; a second glass; Benjamin Franklin, Dickens or any historical figure; text or readable labels.
- **Palette:** the persona's sunshine yellow (Pantone 106 C) as the morning light, vivid sky blue (299 C) on the wall, bright tangerine (1655 C) in the cloth. Bright and clean. The drink stays its real colour, pale amber-gold.
