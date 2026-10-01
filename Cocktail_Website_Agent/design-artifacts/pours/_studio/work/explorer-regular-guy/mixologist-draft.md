# Tomás: drink draft, explorer-regular-guy v1.3 (round 7 of 7)

v1.3 (round 7): Hester's audit v3 D2 applied exactly as she wrote it: the stale "unsourced" note on Chichicapa's 48% now cites the Caskers listing (F25). Nothing in the drink, the Ritual, the Checks or the image brief moves (spec v1). The name is *Brought Home*, confirmed by all three (r7a). Reading X9 ("built in a tall glass, then filled with ice and lengthened with sparkling water") checked against Method steps 3-4: it matches.

v1.2 (round 6): the drink doesn't move (spec v1). Hester's audit notes applied. **Lime:** the teaspoon is ours, set by the acid sweep; Oxford uses half a lime (pdf 1470). **Chichicapa's 48%** now has a page (a Caskers listing, secondary, 'may vary'; the 40% floor covers any variation), in the Makeable row and the table row. **Image:** pink grapefruit throughout, so the drink is blush-pink, not straw-gold. **Names:** I concede the pick to *Brought Home*. Wren's point convinced me: "wanting it both ways" is an idiom of reproach, and it's the very sneer this person hides (wanting the adventure *and* the return ticket). *Both Ways* stays as the runner-up with that flag. Wren cut y4's market line, so the closing line is the only place the honey invitation lives.

v1.1 (round 5): the drink doesn't move (spec v1). Wren's reading v1 is in. The closing line holds, on one condition: y4's last sentence ("if you've never tried the one sold at the next market over, this is your excuse") goes, because it makes the same invitation as the Ritual's line, and y5 already holds the position. For y4 I offered wording that stays on the page: "one of the first two he bottled under a village's name" (Proper p. 248), instead of "now a bottle anyone can buy" (Hester r4). Whether Chichicapa is still sold (my knowledge: yes, unsourced) stays in Makeable, not the reading. Wren's name *Brought Home* is added to Names.

v1 (round 4): the story is ruled (Ron Cooper, Wren r3). A mezcal Paloma built in the glass, Del Maguey Chichicapa recommended, and the spark is **a honey from where the guest lives, made into a syrup that gives about three-quarters of the drink's sugar**. The soda is built from fresh grapefruit juice, the honey and sparkling water. It's billed as equal to the mezcal (Wren r3): two place names in one glass. Hester's r3 fixes are applied. The Paloma is "people say", never "traditional". The honey varying by source is the Matrix's point, and "from where you live" is ours. Oxford's soda uses sugar, so the honey is our change.

Spec: `_studio/specs/explorer-regular-guy.json` (v1). New rows, all mine, added with `add_ingredient.py`:
- `mezcal_del_maguey_chichicapa`: the named bottle at its own row, 48%, the label strength (Caskers listing, "Proof 96 (48% ABV)", which says the ABV may vary; secondary; Hester F25).
- `local_honey_syrup`: equal volumes of runny honey and warm water, 58 g/100 ml, computed and unsourced.
- `salt_pinch` and `grapefruit_wedge`: not modelled.

All four are `contains: none`.

## Recipe

- **serves:** 1
- **glassware:** a tall highball glass (about 300 ml), filled with ice
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 50 ml | Del Maguey Chichicapa mezcal (recommended), or any unaged espadín mezcal of at least 40% that names its village on the label | the village's name is on the bottle |
| 15 ml | honey syrup: equal parts runny honey and warm water, made with a honey from where you live (any runny honey works) | the other place name in the glass, and most of its sweetness |
| 30 ml | fresh pink grapefruit juice (white works too) | |
| 1 teaspoon (5 ml) | fresh lime juice | |
| a small pinch | fine salt | as in the Paloma |
| 100 ml | cold sparkling water | |
| 1 | grapefruit wedge | |

## Method
1. Make the honey syrup ahead. In a small jar, stir 1 tablespoon of runny honey into 1 tablespoon of warm (not boiling) water until smooth, then let it cool. If your honey has set hard, stand the jar in hot water first so it runs. Keep it equal parts: a thicker syrup makes the drink too sweet. This makes enough for two drinks, and the rest keeps in the fridge.
2. Squeeze the grapefruit and the lime.
3. In a tall glass, pour the honey syrup, 1 teaspoon of lime, the grapefruit juice and the mezcal, then add a small pinch of salt. Stir until the honey and the salt have disappeared.
4. Fill the glass with ice. Top with the cold sparkling water, then lift the drink once from the bottom with a long spoon.
5. Set a grapefruit wedge on the rim.

**closingLine:** *Buy the honey on a street near home you've never walked down. It still counts.*

- **What it carries:** Wren's r3 position made physical, "you don't need a ticket to go one street further", and a next find twenty minutes from your door. It ends on a gain, with the near find given the same dignity as the far one ("It still counts"). It's an instruction about the drink's own spark, so it belongs to the Ritual.
- **Guards:** Wren's honey guards hold: it names a street, never bees, flowers or nectar, and it makes no health claim. Any runny honey still works (recipe note), so the line invites and never sneers at a supermarket jar.
- **Avoided:**
  - "Add the soda when you get there" (*Worth the Trip*), so no arrival or soda timing.
  - "down the side" (*Serviceable*).
  - "tell someone" (*Instead*).
  - "Take someone" (*Left Standing*'s y5).
  - "go back" (*Off-Label*).
  - "one village further" (Wren's rule).

  No registry closing line uses "honey", "street" or "counts" in this sense. *Not Too Polite*'s "count the ones you've already won" is a different verb and a different sense.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Highball family: a Paloma.** The Codex prints the Paloma among its highballs as "simply grapefruit soda and tequila with a squeeze of lime", adding that it "can also be made with mezcal, and we highly recommend trying that variation" (p. 212). **Core:** unaged single-village mezcal. **Balance:** a grapefruit soda built in the glass from fresh grapefruit juice, honey syrup and sparkling water. Oxford notes that craft bartenders replace the soda with "grapefruit juice, sugar, and sparkling water" (PALOMA pdf 1470), and the honey in place of sugar is ours. **Seasoning:** lime and a pinch of salt, both in Oxford's recipe (pdf 1470). The amount of lime is ours: Oxford uses half a lime's juice, and our teaspoon is set by the acid sweep below. **No salt rim:** the Codex's half-rim (p. 212) is *Half a Rim*'s. The pinch stays in the drink as seasoning, and the reading never mentions it (so it can't meet *Making the Calls*' unseen dash). Nothing in the numbers moves if the room cuts it. |
| Balance (Arnold; style `highball`) | `balance.py`: base 100 ml at 24.0% ABV / 11.90 g / 1.020%, then 100 ml sparkling water on top. **Final: 12.0% ABV / 5.95 g sugar per 100 ml / 0.510% acid, all in range** (10-16 / 0-7 / 0-0.6). Dilution: 0% modelled, since a built highball's brief stir isn't modelled (styles.json note). **The rejected versions (round 3 provisional, `mixologist-provisional-r3.md`):** 60 ml grapefruit + 10 lime went OUT at 0.99% acid, and 45 + 7.5 lime went OUT at 0.78%. Fresh juice carries about twice the acid of the grapefruit soda the Paloma was built on, so the juice drops to 30 ml and the honey carries the sugar. **Sweeps** (my arithmetic, the same formulas, which reproduce the printout):<br>• Mezcal 40 / 45 / 50 / 55%: 10.0 / 11.2 / 12.5 / 13.8%, all in, so the substitute is "at least 40%".<br>• Honey syrup 52-61.5 g/100 ml: 5.50-6.21 g, all in.<br>• Pink or white grapefruit (sugar 8-12 g, acid 1.8-3.0%): 5.59-6.19 g, 0.42-0.60% acid, all in; 3.0% sits on the ceiling.<br>• Soda 80-120 ml: 13.3-10.9%, all in.<br>• No lime: 0.37% acid.<br>**Two sweeps fail, and the method is written to stop them.** A thick 2:1 honey syrup (~77 g) goes OUT at 7.38 g sugar, hence "keep it equal parts". A 10 ml lime goes OUT at 0.644% acid, hence "1 teaspoon". **Honey's share of the sugar:** 73% (70-78% across the sweeps), so the guest's own jar is really tasted. **Chichicapa's 48%:** a US retailer listing, 'Proof 96 (48% ABV)', noted as possibly varying (Caskers; secondary; Hester r5). The 40-55% sweep covers any variation. **Unsourced:** honey's density (~1.42 g/ml) and so the syrup's 58 g, and the salt. The grapefruit and lime values are LI's (pp. 136-137). |
| Pairings | **Classic:** agave spirit, grapefruit, lime and salt are the Paloma (Oxford pdf 1470), and mezcal in it is the Codex's own recommendation (p. 212). **The spark, a honey from where you live:** the *Flavor Matrix* says honey "can vary quite widely depending on where the bees… sourced their nectar", and that many commercial honeys are blended from several floral sources (pdf 148). Its best pairings begin with citrus and include alcohol (pdf 148). Its chart (pdf 149) lists **mezcal**, in the Smoke segment between vanilla and mint, as well as tequila in the Alcohol segment. I checked this on the rendered page image, because the OCR runs the labels together. So the pairing is on the page, and Hester's card F9 ("tequila, not mezcal") needs correcting. **Scope (Hester F8):** the Matrix's variation is by floral source. "From where you live" is our reading, never the Matrix's claim, and the reading names the honey by place, never by bees or flowers (Wren r3). **The story in the taste:** about three-quarters of the sugar is the guest's honey, so the drink doesn't work without it, which is Wren's "billed as equal". It also sits beside Cooper's rule of selling each mezcal "as is, rather than blending it" (Oxford DEL MAGUEY pdf 638): a bottle from one village and a jar from one place. **Consulted and set aside:** corn (Matrix pdf 89 lists mezcal), because it reads as the far place, not home. Tomato (pdf 245) is *The Other Berry*'s. Grape (pdf 141) has no story here. |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds), and `--check ""` matches the declared contains. Mezcal is a distilled agave spirit. Honey, grapefruit, lime and salt touch no veto in the enum (egg-white, dairy, gluten, nuts, spice). **An edge, not a veto (my knowledge, unsourced):** grapefruit is known to interact with some prescription medicines, so a guest who has been told to avoid grapefruit should skip this one. I'd put that in the dossier's open items for Robin, and never in the reading. |
| Makeable | **Kit:** a tall glass, a jigger or measuring spoon, a jar, a citrus squeezer and a long spoon. It's built in the glass, no shaker. **Named bottle:** Del Maguey Chichicapa, recommended because it's one of the first two villages Cooper named on a bottle (Oxford COOPER pdf 573; Proper p. 248) and the one he had to pour away at the border (Hester F18). **Substitute style:** an unaged espadín mezcal of at least 40% that names its village on the label (the sweep sets the floor). The numbers and vetoes are proved on the named bottle's 48% (Caskers listing, secondary) and on that floor. It's on sale today (the same listing), and the reading says only that it carries the village's name on the label. **Cost flag:** single-village bottlings cost more than a mixing mezcal like Vida (my knowledge, unsourced). The pour stays at 50 ml, the mezcal is still what you taste first, and the honey can be any jar. **Yields** (a quarter to a third of a grapefruit for 30 ml; a lime gives more than a teaspoon) are my estimates. |

## Names (≥3; bartender-sayable)
- **Brought Home** (the room's pick: Wren's, and mine since round 6). What this person does with every find, and what Cooper did. My round-5 case (it names one direction only) is answered by y4, which carries the equal halves in words.
- **Both Ways** (runner-up; my pick until round 6). **Flag (Wren r5):** "wanting it both ways" is an idiom of reproach, and it's exactly the sneer this person hides, so a cold reader may hear the jab first. That convinced me. This is a person for whom going and coming home are one act (Wren r1), and this is the return ticket given its dignity: a ticket both ways is the one they'd never apologise for. It also describes the glass without captioning it: a village's name one way, a street near home the other. It's two words and easy across a bar ("a Both Ways, please"), a little mysterious, and it names no drink, spirit or place. Fear check: the opposite of *stuck*. Registry: no name opens with "Both", and it's not a sibling phrase. The only "both ways" in the pour files is a Manhattan printed with two vermouths, in `hero-caregiver.md`'s dossier, a different sense.
- **Come Back Tomorrow.** The policeman's tip (Hester F14), and it's what this person always does. It's warm and human, but it takes the name from one line of the story, and it sits near *Hoping You'd Come*.
- **Say Where.** From Wren's runner-up line ("You never just say it was good. You say where"). It's sharp and sayable, but it spends her line before the reading can.
- **Two Addresses.** The glass's two place names. It's clear, but it reads as a caption.
- *Rejected:*
  - "Round Trip" (the travel word, and it sits near *Worth the Trip*).
  - "The Way Back" (turning back is the Expedition Leader's).
  - "Souvenir" (kitsch, Wren's trap 10).
  - "Village" anything (the plant row and "one village further").
  - "Finds You" (spends Wren's epigraph).
- **Tagline candidate (Wren's call):** *Halfway through the best meal, you're already choosing who to send.*

## Image brief

> A tall, straight highball glass stands on a wooden kitchen table at home, late in the evening, candlelit. The glass is full of clear ice and a pale, softly cloudy, blush-pink drink, lightly sparkling, with a small wedge of pink-fleshed grapefruit on the rim and no salt on it. Beside it, a small plain glass jar of runny golden honey with its lid off and a teaspoon resting across the mouth. Behind it, a squat bottle of clear mezcal with no visible label. In front, a loose fan of printed holiday photographs, face up: a painted doorway, a market stall, a narrow side street, with no people in them. Half a pink grapefruit sits cut side up on a small board. One impossible detail: in the largest ice cube, a tiny sunlit street is reflected, bright as midday, though the room is lit only by candles. Warm coral in the candlelight and the painted walls in the photographs.

- **Glass and drink:** a tall highball glass (about 300 ml), full of ice, with a pink grapefruit wedge on the rim and no salt. **Colour (my read, unsourced):** unaged mezcal is clear, and the pink grapefruit juice gives the blush and the soft cloud (Hester r5: pink juice turns it blush). At 15 ml of syrup in 200 ml, the honey adds no colour I'd claim. The recipe allows white grapefruit, but the image shows the pink it names first.
- **Props (story):**
  - The honey jar with the spoon (home's half of the glass, the closing line).
  - The unlabelled mezcal bottle (the village's half; no label, per the house rules).
  - The fan of photographs (the trip told at your own table, "the best night of a trip is sometimes the one after it", Wren r1).
  - The halved grapefruit (what's in the glass).
- **One impossible detail:** a midday street reflected in the ice at night. The far place is carried home inside the drink. It's quiet, and there's only one.
- **Must not appear:**
  - The house rules: people, faces, hands, text, labels, logos.
  - Holiday kitsch (Wren trap 10): a worm, a salt rim or salt dish, a shot glass, a lime wedge on salt, an umbrella, a sombrero, a straw.
  - Anything of *Left Standing*'s: an agave plant, bats, flowers.
  - Bees, honeycomb or a honey dipper shaped like a hive (Wren: name the honey by place, never bees).
  - Anything of the story's fear: a border, police, a checkpoint, luggage, tickets, a passport.
  - A second glass, a pitcher or a jug (no round, Wren r1).
  - A Margarita glass or coupe.
- **Palette:** Pantone 7416 C, warm coral (sociability and joy), in the candle glow and the painted walls of the photographs. The candlelit room follows the house style, and the one daylit spot is the street in the ice.
