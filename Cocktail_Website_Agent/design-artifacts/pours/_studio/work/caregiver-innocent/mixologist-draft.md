# Tomás: drink draft v3.2, caregiver-innocent (round 8: audit v3 wording applied, drink unchanged)

v3.2 (round 7): drink unchanged. Substitute style narrowed to Hester's wording ("any London dry gin that lists angelica among its botanicals"): the style gives angelica only as "general consensus" (pdf 894). Plymouth kept over Beefeater: both are on record (pdf 1538 / pdf 245), but reading v4's y3 quotes Plymouth (pdf 1541), so the glass must be that gin. "Gentlest" superlative cut. Closing line set (Wren takes it; Hester passes it).

v3.1 (round 6): gin named: **Plymouth gin, recommended** (Hester X1: angelica was in its seven by 1860, Oxford pdf 1538, and is on record in it today: "a bit more earthy, from the rooty angelica and orris", pdf 1541). Substitute style: any London dry gin. Proportions unchanged. Lint motif with *Quite Alive* accepted (see Structure).

v3 (round 5): rebuilt for the settled story, angelica ("boosts the juniper", Oxford pdf 894). Gin back in, stirred. Camomile is out (Wren: a bedtime-calm cliché, and no longer needed). Candied angelica stem beside the glass (Wren's proposal, card F8). v2's cognac sour is withdrawn: it had no gin, so angelica had nothing to boost.
Hester's fix taken: angelica is never said to add "no taste of its own". The only verb is "boosts".

Spec: `_studio/specs/caregiver-innocent.json`. New row: `candied_angelica` (a garnish, eaten separately, outside the balance).

## Recipe

- **serves:** 1
- **glassware:** a small stemmed wine glass, chilled
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 50 ml | Plymouth gin (recommended) | angelica is on record in it; or any London dry gin that lists angelica among its botanicals |
| 25 ml | blanc vermouth | a pale, lightly sweet vermouth (Dolin Blanc style); not dry vermouth |
| 7.5 ml | Bénédictine | recommended: a liqueur of 27 plants finished with honey, angelica among them; nothing else quite does its job |
| 1 piece | candied angelica stem, about 5 cm | on a small plate beside the glass, to taste on its own |

## Method
1. Put the glass in the freezer, or fill it with ice and water while you mix.
2. Pour the gin, the vermouth and the Bénédictine into a mixing glass or a jar.
3. Fill it with ice and stir gently with a long spoon for about 15 seconds, until the outside of the glass feels very cold.
4. Empty the glass if you filled it, and strain the drink in. It should be clear, with no ice in it.
5. Put the piece of angelica on a small plate beside the glass.

**closingLine:** *Taste the stem first, on its own. It's worth knowing without the gin.*

- **Set (round 7).** Wren takes it (reading v4 changed her y3 to "the half worth meeting" so the two don't echo); Hester passes it (no historical claim).

- It carries Wren's position (y3–y5: known only by what you do for others; let someone have the rest of you) as something a reader can do, and it doesn't repeat y5's "come in tired".
- **Avoided:** "never only" (*Not Only the Way* y3: "The care was never only in the drink"); "on its own" appears only in *Beside the First*'s method (the Chartreuse added last), not in a closing line; "first" appears in *As It Was* ("Hold it up to the light first") in a different sense. "Meet the rest of you" is y5's, so it isn't used here.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Martini family**, stirred. **Core:** gin (Plymouth; or any London dry that lists angelica among its botanicals). **Balance:** blanc vermouth (sugar and a little acid) plus Bénédictine (24.5 g sugar/100 ml, LI table). **Seasoning:** none added; angelica is on record in the gin (Plymouth, "the rooty angelica and orris", Oxford pdf 1541) and among Bénédictine's 27 plants (pdf 256). No job is claimed for it in the Bénédictine (Hester X2). The candied stem is served beside the glass, not in it. **Lint motif with *Quite Alive*** (gin, vermouth and a spoonful, stirred): accepted. Both sit on the Martini family's root, like *A Brother's Care*, but ours is pale and honeyed (blanc vermouth, Bénédictine) where hers is dark and bitter (sweet vermouth, Fernet), in a different glass, with a different gesture (the stem tasted apart). The vermouth is physics: without it the stirred drink goes OUT on acid, and dry vermouth goes OUT on sugar. The shared words were the reading's; reading v4 changed them, and lint is clean. |
| Balance (Arnold; `stirred`) | **Plymouth gin (41.2%, own row; label ABV unsourced):** recipe 82.5 ml → dilution 42.6% → 117.7 ml. **Initial 33.5% / 6.17 g / 0.18%, finished 23.5% ABV / 4.32 g sugar/100 ml / 0.13% acid. All seven in range**, with sugar mid-range: soft, not sweet. **Sweeps:** blanc vermouth 20, 22.5 and 27.5 ml are all balanced (finished sugar 3.96–4.43). Bénédictine 5 and 10 ml are both balanced (3.88 and 4.65 g). Gin at 47% (table), 43%, 40% and 37.5% (modelled as gin plus water) all balance (finished 25.7 / 24.5 / 23.0 / 22.0%). So the substitute style (any London dry gin that lists angelica among its botanicals) is proved across the whole strength range; only the named bottle carries the "angelica on record" claim. **Versions the numbers rejected:** v1c (blanc 30, Bénédictine 7.5): acid OUT, 0.15 against 0.14. Blanc 30 with Bénédictine 5: acid at the edge. Dry vermouth for blanc: sugar OUT (1.71 g); hence "not dry vermouth" in the recipe. v0b toddy: edges, and ruled out by Wren. v2 cognac sour: balanced, but withdrawn for the story. |
| Pairings | **The pairing is the story:** angelica "boosts the juniper" (Oxford, GIN, pdf 894), so the gin is its home. Bénédictine carries angelica among its 27 plants and is finished with honey (Oxford, BÉNÉDICTINE, pdf 256). Blanc vermouth is my own call (unsourced): pale and lightly sweet, it keeps the drink clear and golden. Angelica is also used in vermouth (Grieve F8, secondary; I claim only "used in", not in which bottles). **The spark:** the candied stem, tasted apart from the drink. Grieve (1931, secondary, card F8) records the plant being grown near London "for the use of its candied stems". It's the one place the guest meets angelica on its own. The *Flavor Matrix* was consulted: camomile sat beside angelica (pdf 81, 85), but Wren ruled it a cliché for this person and the stem does the story's work, so it was set aside. |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds). Gin is a distilled grain spirit, so not gluten (rule 4). I added `candied_angelica` as `contains: none`: stem, sugar and, in some brands, glucose syrup and colouring, none of which touches egg-white, dairy, nuts or spice. Glucose syrup can be made from wheat, but it's highly refined, and I'm treating it the way we treat distilled grain spirits. If Robin wants it on the safe side, it goes to `gluten`. **Flag for Robin (unsourced, my own knowledge):** angelica is in the celery and carrot family (the same flag as the Craftsman's caraway), and some people with celery allergy may react to it. Celery isn't in our veto enum. |
| Makeable | Kit: a mixing glass or jar, a long spoon, a strainer, a jigger. Plymouth gin is named because the story needs a gin whose angelica is on record (Hester X1); it's widely sold and mid-priced; substitute style: any London dry gin that lists angelica among its botanicals (numbers proved across 37.5-47%; y4's "angelica is in the gin" then holds by the label, not by our source). Blanc vermouth is a generic style. Bénédictine is the other named bottle: widely stocked, recommended, with no true substitute style, so the numbers and vetoes are proved for it only. *Substitute, if the guest has none:* a honeyed herbal liqueur (yellow Chartreuse style; not proven, run it before shipping). **Candied angelica (unsourced, my own knowledge):** a traditional baking and confectionery item, sold by bakers' suppliers, speciality grocers and online; the French town of Niort is known for it. It's niche, but you can buy it, it keeps for months, and one tub lasts a long time. If there's none, the drink still stands without it. |

## Names (≥3; bartender-sayable)
- **The Rest of You** (Wren's pick). It's the position as an invitation. It's four words at a bar, but it resonates, and resonance comes first. **I back it.**
- **Boosts.** The source's own verb. Short, odd enough to remember, and hard to say without explaining.
- **Both Halves.** It holds the "easy half" line, but it half-points at a two-part drink we don't serve.
- **Twice Over.** Mine: angelica is in the glass twice (gin, Bénédictine), and a third time on the plate. It's sayable, but it captions the drink more than the person.
- Registry checked: no name repeats.

## Image brief

> A single small stemmed wine glass, chilled and faintly frosted, stands on a pale linen cloth by a tall window full of soft morning light. The drink is perfectly clear and pale straw-gold, with no ice and no garnish in the glass. Beside it, on a small white saucer, lies one piece of candied angelica stem, about five centimetres long, a soft translucent green with a fine sparkle of sugar. Through the window, out of focus, is a pale sky-blue morning with a few soft white clouds. The light falls through the glass and throws a small warm gold patch on the linen. The one impossible detail: the patch of light the drink casts on the cloth is shaped like the angelica stem, as if the glass remembers what it's made with. Soft heavenly white, delicate sky blue, one soft gold accent. Calm, still, nobody in the frame.

- **Glass and drink:** a small stemmed wine glass, chilled, no ice. The drink is **clear, pale straw-gold** (gin, blanc vermouth and a little Bénédictine; stirred, so no froth and no cloud). There's nothing in the glass.
- **Not earthy by sight:** Oxford's earthiness is the *root's* ("rooty angelica", pdf 1541); the candied piece is the *stem*. No prop implies the stem tastes of earth.
- **The stem:** candied angelica, on its own saucer, beside the glass and never in it (the story: tasted on its own). Translucent green, sugared. Not bright dyed green.
- **Palette:** the persona's own: Pantone 7541 C (soft white), 290 C (sky blue), 9140 C (soft gold, carried by the drink and its light).
- **Never:** halos, wings, feathers, angels, religious imagery (Wren: no halos, no religious framing), smoke, flames, a coupe, a Nick and Nora.
- Every prop is tagged to a fact: the glass and drink (the spec), the stem (Grieve F8, candied stems). The window, linen and clouds are the persona's imagery ("light-filled scenes, delicate clouds"), not facts.
