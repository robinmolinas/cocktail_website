# Tomás, round 4 (updated round 5): the drink, the Checks, the Ritual, names, the image brief

Spec: `_studio/specs/creator-lover.json` (v3.1, round 5: the named bottle; nothing else changed). Story: Ted Breaux and absinthe (Hester's anchors). Person: Wren's card and reading v1. **Settled:** stirred once before the first sip (Wren R4); name *Rosetta* (Wren R5); closing line below (round 5).

## Recipe (for the pour)

- **glassware:** a stemmed water goblet or a large wine glass (240 ml or more)
- **contains:** `[]`

| amount | item | note (shown) |
| --- | --- | --- |
| 15 ml | cranberry syrup (below) | in the glass first, the way absinthe was sweetened before the spoon |
| 30 ml | Lucid absinthe (recommended), or any absinthe verte of 55% or stronger | Lucid is made to Ted Breaux's recipe |
| 120 ml | iced water | added slowly, a few drops at a time |

**Cranberry syrup** (makes enough for a dozen drinks or more; keeps two weeks in the fridge): weigh 200 g unsweetened, 100% cranberry juice (not cranberry "cocktail") and 200 g white sugar into a jar. Close it and shake, then leave it a few minutes and shake again, until the sugar has completely dissolved. No heat.

## Method (v3; Wren to read)

1. Put a jug of water in the fridge with plenty of ice, so it's as cold as it gets.
2. Pour 15 ml of cranberry syrup into the bottom of the glass.
3. Pour the absinthe in slowly, down the inside of the glass, so it floats on the syrup instead of mixing into it.
4. Hold the jug just above the glass and let the iced water fall into the absinthe in the thinnest trickle you can, a few drops at a time (no ice in the glass). Take a minute or two. The cloud comes up from where the water lands, and the red stays underneath.
5. Look at it. Then stir it once, all the way to the bottom, and drink it slowly.

**closingLine (settled round 5):** *Wait for the cloud. Then bring the red up into it.*
- Wren's wording of my line. "Then stir" was the exact opposite of the Trickster's "Don't stir it", and Robin cross-checks endings. "Bring the red up" is what the stir does, without echoing theirs.
- It's true in every glass: the cloud comes with the water, and one stir brings the syrup up and turns it rose (method 4–5). It's also the reading's position in the drink's words: the feeling brought up into the careful part.
- Dropped: *Wait for the cloud. Then stir the red up into it.* (my round-4 lean; the echo) / *Pour the water slowly. The rest takes care of itself.* (loses the red)
- Registry: no overlap with any closing line, tagline or epigraph.

## The layering question (Wren, R3): the physics

- **Does the red stay low?** Yes, by a wide margin. The syrup is about 1.24 g/ml (1:1 by weight, 200 g in 162 ml, LI's simple-syrup density, pp. 136–137). Absinthe at 68% is about 0.89 g/ml, and the absinthe-and-water above it ends near 0.98 g/ml. Anything that light floats on the syrup, the same way a layered drink holds its bands.
- **Is it true every time?** It is, if the method is followed: absinthe poured gently, and water in a thin, slow trickle from just above the glass. It fails if the absinthe is splashed in from a height, if the water is poured in a stream, or if it's stirred. Sugar is slow to spread, so the edge of the band blurs by a few millimetres over several minutes but doesn't disappear. I can't prove on paper how sharp the edge looks. It goes in Checks as a flag.
- **Is it drinkable unstirred?** **No.** The layer above the syrup is 13.6% alcohol with **no sugar and no acid** (30 absinthe + 120 water). Absinthe water with nothing to soften it. The drip Oxford describes is sweetened, with syrup in the glass or, later, a sugar cube (pdf 52, via Hester). The last mouthful would then be 15 ml of straight syrup. The balanced drink (12.4% / 5.84 g / 0.14%) only exists once it's stirred.
- **And the motif:** a red, sweet band at the bottom of an unstirred glass, "the feeling at the bottom", is the Trickster's drink and closing line (*No Accident*: don't stir it, it tells you the truth at the end).
- **So my proposal:** it's built in layers and served in layers, red under the cloud, true every time. Then it's stirred once before the first sip, and the red comes up into the cloud and turns it rose. The picture Wren wants is real. Nobody drinks it that way.

## Checks (for the dossier)

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family**: a spirit, sweetened a little, made long with water. The *Codex* calls a toddy "an Old-Fashioned that swaps in hot water for cold" (p. 38). The absinthe drip is the cold version of the same idea. **Core** = 30 ml absinthe. **Balance** = cranberry syrup (sugar, with a little acid). **Seasoning** = none needed: absinthe is already a whole garden of botanicals (Oxford ABSINTHE pdf 50: wormwood, aniseed, fennel, then petite wormwood, lemon balm, hyssop). **Where the syrup goes:** in the glass, not on a spoon. Oxford says that in the early 1800s absinthe was sweetened with plain or gum syrup already in the glass, and the spoon and sugar cube came later (ABSINTHE DRIP pdf 52). **Ratio:** Oxford's tradition is about five parts water to one (pdf 52). Ours is four to one plus syrup, a little stronger, and we never call it "the traditional ratio". ✓ |
| Balance (freeform; nearest: the hot/toddy ranges) | No style in *Liquid Intelligence* covers a drip, so it's run freeform (`balance.py`, no ranges applied). **v3.1 with Lucid (62%), stirred: 11.3% · 5.84 g · 0.14%** (with a generic 68% absinthe: 12.4 / 5.84 / 0.14), which sits inside the toddy ranges (10–13 / 5.5–7.5 / 0–0.3), the nearest long spirit-and-water structure. There's no ice in the glass and no melt: the dilution is the declared 120 ml of water. **Sweeps:** 10 ml syrup → 12.8 / 4.01 / 0.09 (too dry for absinthe's bitterness); 20 ml → 12.0 / 7.55 / 0.17 (the sweet end); 150 ml water (Oxford's 5:1) → 10.5 / 4.94 / 0.11. 15 ml and 120 ml is the measure. **Substitute sweep (absinthe strength):** 45% → 8.2%, 53% → 9.6%, 55% → 10.0%, 68% → 12.4%, 74% → 13.5% (sugar and acid don't move). Hence "55% or stronger": below it the drink falls under the toddy floor and tastes thin. **Unstirred (rejected):** the top layer is 13.6 / 0 / 0, and the last mouthful is straight syrup (layering physics: `work/creator-lover/mixologist-draft.md`). **Rejected earlier:** the caramel shard on the spoon (v2, 12.6 / 6.41 / 0.09) was dropped because it's perfectionism, the Sculptor's (Wren R3). It also couldn't be proven to dissolve in iced water. **Sourced bottle:** Lucid 62% (label, Hester F15; row `absinthe_lucid`). **Unsourced (flagged):** the generic absinthe row at 68%; the cranberry juice's sugar (~4 g/100 g) and acid (~2.4%). The syrup is 97% table sugar, so the verdict doesn't hang on the juice. |
| Pairings | **The spark, from the *Flavor Matrix*:** anethole gives fennel its anise flavour, and fennel's **surprise pairing is Vaccinium**, the genus of the cranberry (pdf 116). The berry wheel (pdf 53) has anise and star anise on it too. **Our inference, labelled:** we carry fennel's pairing over to absinthe through anethole, and absinthe as a style is made with aniseed and fennel (Oxford pdf 50). **What it tastes of:** anise and bitter herbs first, then sour-sweet red fruit underneath, long and cold. **Why the cranberry and not sugar alone:** sugar alone gives a drip with no acid at all (v2 caramel-only: 0.00%). The cranberry adds a little tartness and all of the colour. ✓ |
| Vetoes | egg-white ✗ · dairy ✗ · gluten ✗ (absinthe is a distilled spirit) · nuts ✗ · spice ✗ (anise and wormwood are botanicals, not heat). New rows, all `contains none`, my call: `cranberry_syrup` (updated round 4 to bottled unsweetened juice), `absinthe_lucid` (round 5), `caramel_shard` (added round 3; no longer in the drink). `allergens.py --check ""` → contains [], matches, exit 0. **Veto-free.** |
| Makeable | **Named bottle: Lucid (recommended), made to Ted Breaux's recipe** (*A Proper Drink* p. 245: his collaboration with Viridian Spirits; Hood River Distillers owns the brand; never "Breaux's own" and never "the first legal absinthe", Hester R4). Widely sold, not costly for an absinthe. **Substitute style: any absinthe verte of 55% or stronger** (swept above). The numbers and vetoes are proved for Lucid; for the style, the strength sweep covers it and any absinthe verte is unsweetened and a distilled spirit. "Anise and fennel" is true of the style (Oxford pdf 50) and of Lucid's label (F15). Unsweetened cranberry juice and sugar from a supermarket, no heat. Kit: a jug, a jigger, a bar spoon or teaspoon to stir, a stemmed glass. No fountain, no slotted spoon, no sugar cube, no flame. The drip takes a minute or two of patience, not skill. |

## Names (≥3, pick)

Registry checked: no overlap. **Pick: Rosetta** (Wren and Tomás, round 5; Wren gives it to the guest in yours 2). Runners-up: *Nowhere Near*, *Read Three Times* (Wren). *The Louche* dropped (Wren: a guest without French hears "disreputable" said about them).
- **Rosetta.** Breaux's own word for the two sealed bottles (*Proper* p. 244). Easy to say across a bar. It's the moment he tasted what he'd been reaching for, and that's the person's loneliness and devotion in one word. It's also true of the glass: it reads in two scripts, red and cloud.
- **Nowhere Near.** His admission, in our words. It's tender and self-deprecating, but it leans towards "never good enough", and that's the Sculptor's perfectionism guard. Wren to judge.
- **The Louche.** The drink's own word, beauty and bad name in one (Oxford pdf 1195). It's strong, but it's a technical term, and it names the drink more than the person.

## Image brief (draft)

> A single stemmed water goblet on a dark wooden table in a dim room, lit from one side like an old painting, deep shadow behind. In the glass, the drink as it's served, before stirring: a band of deep cranberry red at the bottom of the bowl, and above it a soft, milky, pale opal cloud that fills the rest of the glass. A thin trickle of iced water falls from a small metal jug held just above the glass, breaking into drops as it meets the cloud. Behind, half in shadow, two old sealed bottles with no labels, dusty, their wax unbroken. An old book lies open near the glass, its pages soft and worn from being read many times, a few ink marks in the margin. The glass's shadow on the table is clear, pale green over red, as if the water had never been added. + HOUSE STYLE + AVOID

- **Glass and drink:** a stemmed water goblet or large wine glass. As served: a deep red band low in the bowl, with an opaque, pale, milky opal cloud above it (pale green-white, never bright green). A crisp edge between them. Nothing on the rim, no garnish, no ice.
- **Props (story, four):** the metal jug mid-trickle (the slow water; no spoon of any kind over the glass); the two sealed, unlabelled old bottles (his "Rosetta stones", F3); the worn open book (read three times, F2), unreadable; a hand, ink on the fingertips, holding the jug, cropped at the wrist (the persona's imagery). The hand is optional.
- **One impossible detail:** the shadow shows the drink before the water, clear green over red. What only the maker knows it was.
- **Must not appear:** a sugar cube or slotted absinthe spoon (the Trickster's cube; the syrup is the older way); flames of any kind; an absinthe fountain; the "green fairy", fairies, Belle Époque posters, Van Gogh, Toulouse-Lautrec, skulls or anything about madness or hallucination (Oxford ABSINTHE: myth, out); Shakespeare, quills or theatre; lab glassware (too literal for the chemist); a second glass; text or readable labels; bright green liquid.
- **Palette:** the persona's deep red (Pantone 186 C), burnt orange (7625 C) as the warm side light, and metallic silver (877 C) in the jug. Chiaroscuro, high contrast. The drink stays its real colours: deep cranberry red below and pale opal above.
