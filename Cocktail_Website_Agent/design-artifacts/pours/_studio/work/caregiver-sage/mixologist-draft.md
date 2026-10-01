# Tomás: drink draft, caregiver-sage rework v1.1 (round 8 of 8)

v1.1 (round 8): Hester's audit v4, D1–D6, applied word for word; the recipe, numbers and vetoes don't move. Name: I move to *Instead* (see Names). closingLine: Wren's replacement taken (see below).

Story ruled by Robin (2026-09-30, chat): Wondrich and Old Tom, with the Martinez (the 2:1 Regan suggests, with Ransom Old Tom, no maraschino). This replaces the retired Cocchi White Negroni draft (v1.2) completely.

Spec: `_studio/specs/caregiver-sage.json` (rework v1). The retired v2 spec is copied out of the studio tree, not kept alongside. New row (mine, `add_ingredient.py`): `old_tom_ransom`, `contains: none`. Also still in the table from round 3: `beef_broth_canned` (unused, safe-side).

## Recipe

- **serves:** 1
- **glassware:** a small stemmed cocktail glass, chilled, no ice
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 60 ml | Ransom Old Tom gin (recommended), or any Old Tom gin | the gin from the story: an old, slightly sweet style, this one with a little time in barrel |
| 30 ml | sweet (red) vermouth | |
| 1 dash | aromatic bitters | |
| 1 dash | orange bitters | |
| 1 strip | lemon peel | |

## Method
1. Put the glass in the freezer, or fill it with ice and water while you mix.
2. Pour the gin, the vermouth and both bitters into a mixing glass or a jar. Most Martinez recipes add a little maraschino, a cherry liqueur, here. This one leaves it out, and nothing goes in its place.
3. Fill it with ice and stir with a long spoon for about 30 seconds, until the outside is very cold. The melting ice is part of the drink: it adds about two-fifths to what you poured.
4. Empty the serving glass if you filled it, and strain the drink in. No ice in the glass.
5. Cut a strip of lemon peel, just the yellow part. Twist it over the glass so its oil falls on the drink, then rest it on the rim.

**closingLine:** *Twist the lemon over it. Then tell someone what they haven't heard of yet.*

- Wren's line, taken in round 8 (my ruling). It replaces my *Don't stop at no. Say what they should make instead.*, which gave y5's advice ("don't leave them with only the no. Tell them what you'd make instead") a second time, one line later.
- Carries the position, not the creed: the last step of the method, then the act the story is about (Wondrich telling his friend about a gin the friend had never heard of, Hester F10) carried into the guest's life. No "no", no "instead", and nothing claims Wondrich refused anything.
- It echoes y5's "this is me" line ("They may never have heard of it") on purpose, as a refrain, not a repeat of the advice.
- **Avoided:** "Tell them…" as an opener (*The Other Berry*); "Make it…" as an opener (*Not Too Polite*, in this family; *Making the Calls*); "for yourself" (*Four Shares*), which is why my own alternative, *Make it once for yourself. Then give someone the name of the gin.*, is set aside; stir/no-stir gestures (*No Accident*); "since when" (tagline). A grep of every pour finds no "twist the lemon" and no "heard of yet".

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Martini family.** *Codex* p. 83 opens the Martini's "extended family" with the Martinez, "which introduces a small amount of highly flavorful liqueur to the Martini formula"; p. 86 prints it as Hayman's Old Tom and Carpano Antica 1:1, a teaspoon of maraschino, orange bitters, lemon twist. **Core:** Old Tom gin, "slightly sweet… distinct from London dry" (p. 68); the Martinez is "believed" to have been made with it originally (p. 68: keep the hedge). **Balance:** sweet vermouth, "dark red and often bitter, with sweet cherry flavors" (p. 72, the style described as a family), carrying the sugar and the wine's acid, as vermouth does in every Martini. **Seasoning:** one dash of aromatic and one of orange bitters (Arnold's pair, *LI* p. 131), and lemon oil. **What's changed from the Codex's:** the proportions are the 2:1 Regan suggests, "2 ounces of Old Tom and 1 ounce of vermouth", with "I highly recommend the Ransom Old Tom" (*Joy* pdf 336). The accent is left empty: no maraschino (nuts) and no substitute. The orange-liqueur swap is Wondrich's on the Improved Cocktail page (*Imbibe!* pdf 180), which is *Beside the First*'s drink, so it isn't borrowed. Without the accent, this is the Martinez's core and balance alone. Dossier only: Regan adapts his from Jerry Thomas's 1887 book (*Joy* pdf 336), so the reading keeps Thomas out (*Beside the First*). Oxford MARTINEZ (pdf 1243): first in print 1884, original recipe "subject to interpretation". |
| Balance (Arnold; style `stirred`) | Recipe 91.6 ml → dilution 43.3% → 131.3 ml. **Initial 35.0% / 6.42 g / 0.197%; finished 24.4% ABV / 4.48 g sugar/100 ml / 0.137% acid. All seven in range, no edges** (spec at Ransom 44%, sugar 1.75 g/100 ml). **Unsourced:** Ransom's abv is its label (my knowledge) and its sugar is unpublished, so the spec sits at the midpoint of a 0-3.5 g sweep. The top of that sweep is Oxford's historical Old Tom, "around 35 grams per liter" (OLD TOM GIN pdf 1436). Orange bitters: standard value. **Sweep, Old Tom 37.5-47% × 0-3.5 g (vermouth at *LI*'s 16 g):** finished 21.8-25.7% / 3.66-5.35 g / 0.136-0.139%. Every point is in range except the unsweetened (0 g) column, which reads **edge on sugar** (initial 5.28 vs 5.3; finished 3.66-3.73 vs 3.7, inside the 25% margin). Justified: that's a dry Old Tom in a bitter stirred drink, the dry end of the style, which suits this guest. **My numbers caught me:** in round 5 I said "in range at every point". The 0 g points are edges, not in range. **Vermouth sweep (Ransom 44%):** 13 g vermouth with an unsweetened Old Tom goes **OUT low** (3.00 g); 20 g with a 3.5 g Old Tom goes **OUT high** (6.20 g); 13 g with 3.5 g, and 20 g with 0 g, both land at 4.60, in range. So the numbers are proved for an ordinary sweet vermouth (about 16 g/100 ml), not for the extremes paired the wrong way. See Makeable. **Versions the numbers rejected:** Arnold's Martinez with maraschino (*LI* p. 131, 60/30/6.75): my sweep reproduces his printed 6.6 g at 3.5 g Old Tom, OUT on sugar, and nuts. The *Codex*'s 1:1 without maraschino (45/45): acid OUT (0.208%) and sugar edge to OUT (5.57-6.78 g). |
| Pairings | **Classic:** Old Tom, sweet vermouth, bitters and lemon oil are the Martinez as three of our books give it (*Codex* p. 86, *LI* p. 131, *Joy* pdf 336; all add maraschino, which we leave out). Lemon twist: *Codex* p. 86 and *LI* p. 131. **The spark: none from the *Flavor Matrix*, on purpose.** I consulted it and set it aside. The vermouth maps to Grape (pdf 140): its surprising pairings are pumpkin, capsicum and beet, and none belongs in a stirred gin drink or in this story. Beef (pdf 44, checked in round 3 for another candidate) doesn't apply. What makes the drink interesting comes from the books and is tailored to this person (Robin, 2026-09-30: no spark is fine if the drink is interesting from the books). (1) The gin is the story's own. Ransom is the Old Tom Wondrich advised his friend to make (*Proper* p. 241), and Wondrich discloses in print that he had a hand in it ("fair warning", *Imbibe!* pdf 68). (2) Oxford pdf 1436: of the old sweetened gins, Old Tom "had the least added sugar and water", "the strongest allowed to be sold". (3) The maraschino is left out and nothing sweet replaces it. That's the Doctor's habit in the glass: nothing added to make it go down easier. |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds); `--check ""`: declared contains matches. Old Tom is a distilled grain spirit, so **not gluten** (rule 4; Ransom's grain bill is not in the library, and distillation settles it either way). Sweet vermouth is wine; fining is ignored (rule 4). Aromatic and orange bitters are not heat, so **not `spice`**. Lemon peel touches no veto. No maraschino, so **no nuts**: that was the reason it came out. |
| Makeable | Kit: a mixing glass or jar, a long spoon, a strainer, a jigger, a peeler or knife, a small stemmed glass. **Named bottle:** Ransom Old Tom, because the story is this bottle (Wondrich's advice to its maker). Substitute style: **any Old Tom gin**, proved from 37.5% to 47% and from unsweetened to Oxford's historical ~35 g/L (edges only at the unsweetened end). The numbers and vetoes are proved for Ransom at its label strength; its sugar is unpublished, so the sweep covers it. **Vermouth:** generic "sweet (red) vermouth", proved at an ordinary sweetness. A very rich vermouth with a sweetened Old Tom tips over (6.20 g), and a thin one with an unsweetened Old Tom falls short (3.00 g). I don't put that warning on the page, because an ordinary bottle of each lands in range. Old Tom is a regular bottle in a well-stocked shop, not a rarity (my knowledge, unsourced). No homemade step, no niche kit. |

## Names (≥3; bartender-sayable)
- **Instead** (**all three pick it**; I moved in round 8). The page's own word ("advised him to instead make an Old Tom", *Proper* p. 241), and the reading's turn: what Wondrich gave "wasn't a verdict on the plan. It was an instead." The Doctor never leaves you with only the no. It makes sense cold and makes a stranger curious. At the bar: "an Instead, please." **What moved me:** Hester's point that *Fair Warning* shares its first word and its shape with the Nanny's *Fair Measure*, in this same family. That's my own lesson (opening words clash within a family: *Still Improving* against *Still Yours*). And "Warning" leans towards the medical ground Robin closed.
- **Fair Warning** (my round-7 pick, kept on record for Robin). What the Doctor gives: the unwelcome thing, said before it costs you, with nothing hidden. It's also Wondrich's own phrase beside Ransom (*Imbibe!* pdf 68). No cocktail or brand by that name was found (Hester, web and library: "none found", not proof). Against it: the *Fair Measure* echo and the medical lean.
- **Over Lunch** (Hester). **The Other Plan**, **Old Friend** (Wren).
- **Nothing Added.** The gin style with "the least added sugar and water", and the drink with the maraschino left out. Risk: it reads as a label claim.
- **Straight Answer** (mine). What they're sought for. Plain, a little dry.
- *Rejected:* "Old Tom's Advice" (names the gin, not the person); "The Better Gin" (a boast); "Since When" (the tagline stays).
- Checked against the registry: no name repeats.

## Image brief

> A single small stemmed cocktail glass, chilled and faintly frosted, stands on a clean pale grey stone counter in cool, even morning light. The drink is clear, not cloudy, a deep reddish amber, still, with no ice. A strip of lemon peel rests on the rim, only the yellow part. Behind it, slightly out of focus, stand a glass mixing jar with a long spoon resting inside, a lemon with one strip of peel cut away, and a squat, old-fashioned gin bottle with no label, holding pale gold gin. The wall behind is a deep, calm blue. The one impossible detail: the gin in the unlabelled bottle is clear as water in its top half and pale gold in its bottom half, as if one gin were quietly turning into another inside the glass, with no line between them. Palette: deep blue in the wall, soft grey stone, and a calming green only in the tint of the bottle's glass.

- **Glass and drink:** a small stemmed cocktail glass, chilled, no ice. The drink is stirred, so **clear, not cloudy**. Its colour is **deep reddish amber**: 30 ml of sweet vermouth, which the *Codex* calls "dark red" (p. 72), in 60 ml of Old Tom with "a little barrel age" (*Imbibe!* pdf 68). Never Negroni-scarlet, never pale gold, never cloudy. Garnish: one strip of lemon peel on the rim.
- **Props (three, story):** the mixing jar and spoon (stirred, exact, nothing performed); the lemon with its strip cut away (the garnish); the unlabelled old-style gin bottle (the Old Tom the story is about; no text).
- **One impossible detail:** the bottle whose gin is clear above and pale gold below, one gin becoming another. It carries the story's "instead" (a plain gin becoming an Old Tom) without any words. Quiet, and only one.
- **Must not appear:** people or hands (house rule); cherries, a cocktail cherry, a maraschino bottle (the drink leaves the cherry out); anything medical or clinical (no stethoscope, pills, dropper, scale, prescription pad); readable labels, text or logos; ice in the glass; orange peel; a second drink; a highball glass; a still or distillery.
- **Palette:** the persona's deep blue (Pantone 5415 C) in the wall, subtle grey (438 C) in the stone, calming green (9280 C) only in the bottle glass's tint. The drink stays its true reddish amber.
