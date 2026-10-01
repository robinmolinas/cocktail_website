# Mixologist draft: The Genie (magician-creator), v1, Tomás round 7 (audit v1 X6-X7, audit v2 Y1; closing line settled)

Spec: `_studio/specs/magician-creator.json` (v1). Story ruled by Wren in round 3: Klemm, Campbell Apartment (short) to Pico (the heart). The drink follows the story's order: the stand-in is the ask that came first, and the Collins d'Electra is the wish granted.

## Recipe

**Glassware:** tall (Collins) glass, chilled, filled with ice
**Contains:** veto-free

| amount | item | note |
| --- | --- | --- |
| 30 ml | London dry gin | |
| 30 ml | vodka | gin and vodka together, the two spirits the book names for this drink |
| 30 ml | fresh lemon juice | |
| 20 ml | fresh rosemary syrup (homemade) | the herb he chose for it |
| 1 tsp (5 ml) | orange liqueur (Cointreau or any clear triple sec) | stirred with the bitters: the stand-in for orange bitters Klemm describes at the Campbell Apartment |
| 2 dashes | Angostura bitters | |
| 60 ml | soda water, very cold | poured last |
| 1 sprig | fresh rosemary | for the scent |

## Method

1. Make the syrup ahead. Warm 100 g sugar in 100 ml water, stirring, until it dissolves. Take it off the heat, add two sprigs of fresh rosemary, and leave it to steep for 20 minutes. Strain, and let it cool. It keeps a week in the fridge.
2. In a small glass, stir the orange liqueur and the Angostura together. That's your stand-in for orange bitters.
3. Chill a tall glass and fill it with ice.
4. Pour the gin, vodka, lemon juice, rosemary syrup and the stand-in into a shaker with ice. Shake for about five seconds, just long enough to chill them.
5. Strain into the glass, top with the soda, and give it one gentle stir from the bottom.
6. Clap the rosemary sprig once between your hands to wake its scent, and stand it in the glass.

No shaker? A jar with a tight lid does the same job.

**closingLine:** *Mix the stand-in first: that's the ask. Clap the rosemary last: that one's for you.*

(Round 6: two gestures from the method, steps 2 and 6, in the story's order: the stand-in is the Campbell ask, the rosemary is the Pico wish. It doesn't restate y5 ("say yes… name the one part"), it shows the same position in the glass. Struck on the way: "Then say…" (*Before the Room*), "your way" (*No Accident*, *Still Yours*), "you'd most like to" (*Hoping You'd Come*). 4-gram check with lint's `ngrams()` against every pour, the registry and reading v2: clean.)

## Checks

| check | result |
| --- | --- |
| Structure | *Cocktail Codex* Daiquiri family, Collins subfamily ("a sour served in a tall glass with ice and seltzer", p. 138), on the Codex Tom Collins frame (p. 138: 60 ml seltzer, 60 gin, 30 lemon, 22.5 simple). Core: London dry gin and vodka, split 30/30. Balance: lemon, rosemary syrup, the orange liqueur's sugar. Seasoning: Angostura, orange liqueur, rosemary scent. **Whose is what (Wren's condition 1):** *Proper* p. 135 names only three things for the Collins d'Electra: gin, vodka and a fresh rosemary syrup. The lemon, the soda, every proportion, the split, the method and the stand-in's measures are mine. The stand-in itself is from the page ("they mixed Cointreau and Angostura together", *Proper* p. 135). Klemm's "they" is unnamed and undated, so the notes say "the stand-in Klemm describes at the Campbell Apartment", never who mixed it or when (Hester, round 4). It's a stand-in, not orange bitters, and no copy calls it bitters (X1, X7). **Method vs the Codex:** the proportions sit on the Codex frame, but the method doesn't: the Codex puts the seltzer in the glass first and the ice last (p. 138), while mine strains over ice and tops with soda. So "on the Codex frame", never "the Codex way". Hester found no build anywhere else (round 3), so nothing may say "his recipe"; the reading says "built on three things the page names". |
| Balance | `balance.py`, style `collins`, soda as stage `top`: recipe 116.6 ml, 25% dilution, 205.8 ml finished. **14.0% abv (range 12.5–15.0), 6.85 g sugar/100 ml (6.0–7.5), 0.875% acid (0.55–0.95). Balanced, every figure in range, no edges.** **Sweep (96 variants):** gin 40% and 47% × split 30/30, 40/20, 45/15 × syrup 15/17.5/20/22.5 ml × orange liqueur 5/7.5 ml × soda 45/60 ml (lemon 30, Angostura 2 dashes). The chosen build holds at both gin strengths (13.0% at 40%), so any London dry gin works. The split moves only strength, never sugar or acid. **Rejected:** syrup 15 ml with soda 60 (OUT low on sugar, 5.52); syrup 22.5 ml with 7.5 ml liqueur and soda 45 (OUT high, 8.25); soda 45 with 47% gin (strength OUT, 15.1–16.5). Syrup sugar is an **unsourced estimate** on a 1:1 simple-syrup basis (the table's `rosemary_syrup` row, added this pour); the rosemary adds scent and taste, no sugar, acid or strength. The 25% base dilution is the style's estimate, not a Codex figure. |
| Pairings | Gin, lemon and a herb syrup is a standard Collins build (my craft). **The *Flavor Matrix*, asked for rosemary with orange (Wren, round 3):** it has no line pairing them. The CITRUS entry (pdf 80) lists best pairings (cilantro, ginger, bell pepper, cauliflower, broccoli, Brussels sprouts, dark chocolate) and surprise pairings (sage, caraway, peanut, pecan); rosemary is in neither. Rosemary appears on the citrus grid (pdf 81), but the grid doesn't grade it, so I claim nothing from it. The entry does say citrus flavour is "based largely on woody or pine aromas" (pdf 80); that rosemary itself smells of pine is my own knowledge, unsourced, so it isn't written as the book's pairing. The Codex's own Tom Collins is garnished with an orange half wheel (p. 138, via Hester): orange beside a gin Collins has a precedent in the frame, though not with rosemary. **No Matrix twist, not forced** (Wren: "if there isn't, don't force it"). The Matrix's own surprise pairings are taken anyway: sage is *A Brother's Care*'s leaf and caraway is *Not Only the Way*'s. The twist here is the story's own stand-in, and the reading says in one clause why it's there (Wren's condition 3). That the Pico "relate to the kitchen" line is tasted in a kitchen herb is **my reading** (his line covers all his Pico drinks). |
| Allergens | `allergens.py`: **veto-free** (counts toward the AD-4 floor). Gin and vodka are distilled grain spirits, **not** gluten (rule 4). Orange liqueur, Angostura, lemon, soda, rosemary: none. **Maraschino is in the words only**: it would be `nuts` (stones crushed in before distilling, Codex p. 174, Oxford pdf 1227). New rows, all allergen-free, my call: `rosemary_syrup`, `rosemary_sprig` (garnish), `gin_london_dry_40` (strength-sweep row only). |
| Makeable | Basic kit: a shaker or a jar, a strainer, a jigger, a small saucepan. Generic styles only, no named bottle ("Cointreau" is how the page names the stand-in, so it's written as the example, with "any clear triple sec" as the style). Fresh rosemary is sold in any supermarket. Oxford says heat may be needed to break down a woody herb's structure when there's no alcohol to extract it (HERBS pdf 999). |
| Neighbour | *Not Too Polite* (caregiver-outlaw) is also a gin Collins in a Collins glass (60 gin, 30 lemon, 25 jaggery syrup). This one differs by base (gin and vodka split), sweetener (rosemary) and seasoning (the orange-bitters stand-in); owned here in one clause. The Collins glass stays because the drink's name asks for it. |

## Image brief

- **Glass:** a tall, straight-sided Collins glass, filled with clear ice cubes to the rim.
- **Drink:** very pale gold with a faint blush from the two dashes of Angostura, and a slight haze from the lemon (my own reading of the colour: the book gives none; Angostura's red-brown is my knowledge, unsourced). Fine bubbles rising. Never blue, never green.
- **Garnish:** one fresh rosemary sprig standing up out of the ice, exactly as served.
- **Beside it:** a small tumbler with a spoon in it, a little orange liqueur stained with bitters at the bottom (the stand-in, just made); a plain bottle of clear orange liqueur and a bitters bottle, labels turned away; a bunch of fresh rosemary on a wooden kitchen board; a sheet of paper with a short handwritten list of ten lines and no recipes under them, **not legible**.
- **One impossible detail:** one line of ink on that list is lifting off the paper and curling up into the air towards the glass, as if the name had heard itself.
- **Setting:** a restaurant bar with the warm light of a kitchen pass behind, out of focus. Not a hotel bar, not a railway station.
- **Must not appear:** no maraschino bottle or cocktail cherries (the maraschino is in the words only), no Campari, no foam, no flame, no lamp or genie imagery, no readable text or brand, no second drink, no book.
- **Palette note:** one accent of vivid sky blue (Pantone 299 C) in the scene (the board's cloth or the wall behind), never in the drink.

## Names

| name | why |
| --- | --- |
| **On One Condition** (my pick) | Klemm's deal was a yes with an "if" (*Proper* p. 135), and that's the position: the wish said as part of the yes. It's sayable across a bar ("I'll have an On One Condition"), and a little mysterious cold. It doesn't repeat the closing line's words. ("In the same breath" was struck from my first closing line: it's *Making the Calls*'s.) |
| In Return | the same position, quieter; risks sounding transactional |
| Ten Names | the Campbell ask (ten names, no recipes); true, but it names the smaller half |
| Name Your Wish | Wren's pick; strong, but it leans towards the lamp (Hester), and the Genie hears wishes rather than asks for them |
| Your Own Way | the secret wish, freedom; plainest; "their own way" is already in *Not Only the Way*'s reading, so a weaker option |
