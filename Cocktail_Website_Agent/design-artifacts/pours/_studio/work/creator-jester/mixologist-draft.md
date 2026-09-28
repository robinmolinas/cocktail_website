# Tomás, round 4 (updated round 5): the drink, the Checks, the Ritual, names, the image brief

Spec: `_studio/specs/creator-jester.json` (v1.1: round 4 added the cherry tomato on the rim; nothing else changed). Name (room, round 5): **The Other Berry**. Reading: Wren's v1 (`psychologist-reading-v1.md`), checked against the glass in round 5.

## Recipe (for the pour)

- **glassware:** coupe, chilled
- **contains:** `[]`

| amount | item | note (shown) |
| --- | --- | --- |
| 60 ml | light, dry white rum | |
| 22.5 ml | fresh lime juice | |
| 20 ml | cherry-tomato and vanilla syrup (below) | made the way you'd make a strawberry syrup |
| 1 | small ripe cherry tomato, for the rim | where the strawberry would sit |

**Cherry-tomato and vanilla syrup** (a day ahead; makes enough for a dozen drinks or more): put 250 g ripe cherry tomatoes and 250 g white sugar in a blender and blend until completely smooth and the sugar has dissolved. Don't heat it. Push it through a fine sieve into a jar, pressing the pulp to get all the liquid out, and throw the skins and seeds away. Split a vanilla pod lengthways, scrape the seeds into the jar and drop the pod in. Leave it in the fridge overnight, then take the pod out. It keeps up to two weeks in the fridge. Taste it before you use it, and if it fizzes at all, throw it out. (No pod? Half a teaspoon of vanilla extract instead.)

## Method (v1.1; Wren to read)

1. A day ahead, make the syrup (above).
2. Put the coupe in the freezer for ten minutes, or fill it with ice and water while you mix.
3. Pour the rum, the lime juice and the syrup into a shaker.
4. Fill the shaker with ice and shake hard for about ten seconds, until the outside is too cold to hold.
5. Empty the glass if it's full of ice water. Strain the drink into it through a small sieve, so no bits of tomato get through.
6. Cut a small slit in the bottom of a cherry tomato and sit it on the rim, where the strawberry would go.

**closingLine (settled with Wren, round 5):** *Tell them it's tomato before they taste it.*
- It's the reading's position in the drink's words: no warning, no reveal, say the strange thing first. It agrees with the rim tomato, which tells the guest the same thing before the first sip.
- It's true in every glass, and there's no trick in it: the guest knows what's in the drink before tasting it.
- Dropped: *Serve it for dessert.* (my round-4 lean; it's already Wren's guess in yours 3, so as a closing line it would repeat the reading) / *Put it where the strawberry goes. Don't explain.* ("don't explain" reads as hiding, the opposite of the position).
- Registry: no overlap with any closing line, tagline or epigraph.

## Checks (for the dossier)

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Daiquiri (sour) family**: a spirit, citrus and a sweetener (p. 105). **Core** = 60 ml light white rum. **Balance** = lime + the cherry-tomato-and-vanilla syrup, in the *Codex*'s basic sour proportions (2 oz spirit, ¾ oz citrus, ¾ oz syrup, p. 106; our 20 ml of syrup is a touch under ¾ oz because the syrup is a little sweeter than simple). **Seasoning** = the vanilla, in the syrup. **The swap is the *Codex*'s own method:** its Blended Strawberry Syrup is equal weights of fruit and sugar, blended cold and sieved, because heat gives strawberries an artificial taste (p. 47). We make that syrup with cherry tomatoes in the strawberry's place. **Why a syrup and not juice:** the *Codex* warns that fresh tomato juice has a thin flavour and separates from spirit (p. 218). My juice versions ran **OUT** (about 12% finished, dilution 43–47%). **Syrup care:** fruit syrups spoil faster than plain ones: two weeks at most, taste first, throw away if it fizzes (p. 46). ✓ |
| Balance (*Liquid Intelligence*, shaken, pdf 129–130) | Shaken ranges: initial ABV 23–31.5, sugar 8–13.5, acid 1.2–1.4; final ABV 15–19.7%, sugar 5–8.9 g/100 ml, acid 0.76–0.94%, dilution 51–60%. **v1.1: initial 23.4% · 12.82 g · 1.37%; final 15.4% · 8.41 g · 0.90% · dilution 52.5%. All ✓, no edges.** **Sweep:** 17.5 ml syrup balances (15.7% · 7.54 g · 0.91%); 22.5 ml goes to the sweet edge (initial sugar 14.04, final 9.24) and strength 15.0, so 20 ml is the measure. The sweep also covers a syrup that comes out about 12% weaker or stronger than modelled. **Rejected:** cherry-tomato juice muddled into the shaker (50–60 rum / 20–22.5 lime / 17.5–22.5 vanilla syrup / 30–40 tomato juice): all **OUT**, at 10.7–12.5% finished, initial acid 1.03–1.12, dilution 43–47%. The juice waters the drink down before the ice does. **Unsourced values (flagged):** the cherry tomato's sugar (~3.5 g/100 g) and acid (~0.45%) are standard values; LI's ingredient table has no tomato (pp. 136–137). They reach the drink only through the syrup, where the sugar is 97% table sugar, so the verdict doesn't hang on them. The syrup row is derived (equal weights of tomato and sugar ≈ 63.9 g sugar/100 ml, LI's simple-syrup density). Rum and lime from the LI table (pdf 140–141). |
| Pairings | **Rum and lime:** the Daiquiri itself (*Codex* pp. 105–106). **The spark, from the *Flavor Matrix*:** vanilla's surprise pairing is **tomato** (pdf 256). In the tomato entry, **strawberries** are the listed substitute (pdf 244), so the tomato goes into the seat a strawberry would take. Botanically the tomato is a berry and the strawberry isn't (pdf 52). The book even makes the same swap the other way round: a strawberry "ketchup" on a burger (pdf 55). **Correction (round 4):** in rounds 1–3 I cited vanilla's entry as pdf 245. It's pdf 256; pdf 244 (tomato) was right. **Vanilla with citrus** is one of vanilla's best pairings (pdf 256), which is why the vanilla sits happily against the lime. **What it tastes of:** ripe red fruit and vanilla, bright with lime, a little savoury underneath. It's not a Bloody Mary: no salt, no pepper, no celery. Fresh-tomato cocktails are a modern category (Oxford, TOMATO-BASED COCKTAILS pdf 2039), so this isn't a first, and nothing in the reading should say it is. ✓ |
| Vetoes | egg-white ✗ · dairy ✗ · gluten ✗ (rum is distilled from cane) · nuts ✗ · spice ✗ (no pepper, no chilli). Tomato and vanilla touch no veto. New rows, all `contains none`, my call: `cherry_tomato`, `vanilla_syrup`, `tomato_vanilla_syrup`, `cherry_tomato_whole` (garnish). `allergens.py --check ""` → contains [], matches, exit 0. **Veto-free.** |
| Makeable | No named bottle. Style: "a light, dry white rum" (the *Codex* uses a light rum in its Daiquiri experiments, p. 118). Cherry tomatoes, sugar and a vanilla pod from any supermarket (extract as a fallback). Kit: blender, fine sieve, jar, shaker, strainer, jigger, coupe. Overnight wait, no heat, no skill. Ripeness matters: the redder and sweeter the tomatoes, the better the syrup. |

## Names (≥3, pick)

Registry checked: no overlap with any name, tagline, epigraph or closing line.

- **The Other Berry** *(my pick).* Said across a bar it makes people lean in ("the other what?"), and the answer is a true fact that sounds made up (botanically, Matrix pdf 52). It's the person: they say the odd true thing, and a minute later it's obvious. It's true in every glass, since there's always a tomato in it and never a strawberry. **Room pick, round 5** (Wren: botanically the strawberry is the other one, so "other" isn't second-best).
- **For Dessert.** The Court's reason was the table (Hester F4), and this glass puts the tomato where the Court said it doesn't go. Quieter, a little mysterious; but it's more about the story than the person.
- **A Minute Later.** Wren's "it usually stops sounding weird about a minute later". It's the person more than the drink, but it echoes the "real me" line if that line keeps the minute, so it's a Wren call.
- **Botanically.** Funny as an answer to "What are you drinking?", but it leans pedant, and this person isn't out to be right.

## Image brief (draft)

> A single chilled coupe on a glossy tabletop, set like the last course of a dinner, with room around it. In it, a shaken rum-and-lime daiquiri the colour of pale coral, softly hazy, with a fine layer of tiny bubbles on the surface. On the rim, a small ripe cherry tomato with a slit in it, sitting exactly where a strawberry would sit. Beside the glass, a dessert plate with a small dessert spoon, empty. Behind it, a heavy old dictionary lies open, too far away to read. A split vanilla pod on the plate's edge, and a short vine with three cherry tomatoes on it lying on the table. The cherry tomato on the rim casts, on the tablecloth, the shadow of a strawberry. + HOUSE STYLE + AVOID

- **Glass and drink:** a chilled coupe, frosted a little from the freezer. The drink is shaken lime, rum and a red-fruit syrup, so it's **pale coral, hazy**, with a fine froth from the shaking. Never ketchup-red, never clear, never bright strawberry-pink. One whole small cherry tomato on the rim. Nothing else in or on the glass.
- **Props (story, four):** the empty dessert plate and spoon (served where the Court said it doesn't belong); the open dictionary (both sides read dictionaries aloud at the trial, Hester F2), unreadable; the split vanilla pod (the Matrix pairing); the cherry tomatoes on the vine (the fruit of a vine, F3). 
- **One impossible detail:** the tomato on the rim casts the shadow of a strawberry. It's the whole person in one image: the thing seen as what else it is, quietly, without anyone in the picture remarking on it.
- **Must not appear:** strawberries (only the shadow); anything Bloody Mary (celery, pepper, hot sauce, salt rim, a tall glass); a gavel, scales, a courtroom or a judge (too literal); melting clocks, lobsters, moustaches, ants or anything Dalí (the trap Wren and Hester named); paint, brushes or an easel (the literal artist); a second drink; smoke; text or readable labels.
- **Palette:** the persona's electric magenta, bright yellow and vivid cyan (Pantone 226 C, 116 C, 311 C) as the room's light and the tablecloth, high contrast. The drink stays its real pale coral, and the tomato its ripe red.
