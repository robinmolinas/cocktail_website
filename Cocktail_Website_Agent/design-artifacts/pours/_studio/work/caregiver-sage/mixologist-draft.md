# Tomás: drink draft v1.1, caregiver-sage (round 5 of 6)

v1.1: drink unchanged. Wording fixed to Hester's audit v1 (X5, X6: "flavoured mostly with gentian root"; no "kept"). Drink colour corrected (Suze is "strong yellow-orange", Oxford SUZE pdf 1958). Scale dropped from the image. Name: I come round to *Since When* (see Names).
v1.2 (round 6): drink unchanged. Hester's audit v2, D1–D8, applied as the host quoted them. Suze's strength corrected to its 15% flagship (D6), so the headline numbers move slightly (24.5% → 23.9%); the recipe doesn't. Name ruled: *The Other Kindness* (tagline stays).

Spec: `_studio/specs/caregiver-sage.json` (v2). New rows (mine, `add_ingredient.py`): `cocchi_americano`, `suze`, `grapefruit_peel`, all `contains: none`.
Glass ruled by Wren in round 4 (Hester's case for a G&T heard): the White Negroni with Cocchi Americano.

## Recipe

- **serves:** 1
- **glassware:** a small stemmed cocktail glass, chilled, no ice
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 50 ml | London dry gin (40% or stronger) | |
| 20 ml | Cocchi Americano Bianco (recommended), or any white americano or quinquina (an aperitif wine bittered with cinchona bark) that's at least as sweet | the one with a good deal more of the cinchona's bite |
| 15 ml | Suze (recommended), or any French gentian aperitif | a bitter French aperitif flavoured mostly with gentian root |
| 1 wide strip | grapefruit peel | |

## Method
1. Put the glass in the freezer, or fill it with ice and water while you mix.
2. Pour the gin, the Cocchi Americano and the Suze into a mixing glass or a jar.
3. Fill it with ice and stir with a long spoon for about 30 seconds, until the outside of the mixing glass is very cold. The melting ice is part of the drink: it adds roughly a third to what you poured.
4. Empty the serving glass if you filled it, and strain the drink in. It should be perfectly clear.
5. Cut a wide strip of grapefruit peel, just the yellow part. Hold it over the drink, coloured side down, and pinch it so its oils fall on the surface. Then drop it in.

**closingLine:** *Don't tell anyone it's fine until you've tasted it. That includes you.*

- Carries the position, not the creed. The creed is whoYouAre's "You won't tell them it's probably nothing. Not until you know". The position is y5, which turns their care on themselves. The first sentence is their habit with other people. The second, "That includes you", is the turn, said without repeating y5's appointment or the tagline's "since when".
- Instructions, so "tasted" is fine here: the guest who makes it tastes it.
- **Avoided:** any "Taste it…" opening (*Beside the First*: "Taste it next to the one you already know"); "keep one back for yourself" (*Four Shares*); "Tell them…" (*The Other Berry*); stir/no-stir gestures (*No Accident*); "since when" (tagline); "probably nothing" (whoYouAre). A grep of every pour file finds no "it's fine" and no "that includes you".
- Wren owns the words: she may cut it, but the position should stay.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Martini family.** The White Negroni is a stirred aperitivo drink of spirit and aromatized wine (Wayne Collins, Bordeaux; *Proper* p. 106: 1 oz Plymouth gin, 1 oz Lillet Blanc, 1 oz Suze, stirred, cocktail glass, grapefruit twist; no year, *Codex* p. 89 and *Proper* disagree). **Core:** London dry gin. **Balance:** the two aperitifs carry all the sugar and the wine's small acid, as vermouth does in a Martini (*Codex* p. 65: the Vesper swaps Lillet for the vermouth; p. 74 treats "other aromatized wines" as creative stand-ins for vermouth that may need "adjustment to a cocktail's balance"). **Seasoning:** grapefruit oils. **The change:** Cocchi Americano for the Lillet. *Codex* p. 74: they "share a similar slightly bitter, orangey flavor", but "Cocchi packs a good deal more bitterness from cinchona"; Lillet "doesn't have the bitter kick it used to (the original formula, called Kina Lillet, had a bit more cinchona)". The *Codex*'s warning applies: Cocchi is about twice as sweet as Lillet (SAQ 200 g/L vs *LI* p. 136 9.5%), so the ratio has to move (below). |
| Balance (Arnold; style `stirred`) | Recipe 85 ml → dilution 43.0% → 121.5 ml (Suze at its 15% flagship). **Initial 34.2% / 7.18 g / 0.141%; finished 23.9% ABV / 5.02 g sugar/100 ml / 0.099% acid.** Five in range, **two acid EDGES** (initial 0.141 vs 0.15, finished 0.099 vs 0.10). Justified: a stirred drink's acid is the wine's, and this one has 35 ml of aromatized wine and aperitif to 50 ml gin, like a dry Martini. **Versions the numbers rejected:** Collins's equal parts (30/30/30), with Lillet or Cocchi: finished 18.4–20.0%, OUT under the 21% floor at every point swept. v1 2:1:1 (45/22.5/22.5): at Cocchi's real 200 g/L, sugar OUT at the sweet end (6.68–6.79 g vs 5.6) and strength OUT with a 40% gin (19.9–20.7%). Also rejected: 45/20/15 (OUT on strength or sugar at 40% gin), 50/20/20 and 45/15/15 (acid OUT, 0.084–0.095). **Sweeps on v2:** Suze sugar is **unsourced** (no trusted figure; Hester), so swept 10–18 g/100 ml, and Suze strength 15–20% (Suze 15%, Oxford pdf 1960 and SAQ; the 20% Saveur d'Autrefois bottling, Oxford pdf 1960). Gin 40–47%. Every combination is in range or edge: 21.3–24.5% / 4.52–5.59 g / 0.099–0.100%. Gin at 37.5% → 20.4–20.9% finished (under the 21% floor with the 15% Suze) → hence "40% or stronger" (40% → 21.3–21.9%, in range). **Substitute americano or quinquina, swept by sugar** (Suze 10–18): 16 g/100 ml → 3.86–4.84, in range; 14 → 3.53–4.52 (OUT low with a dry Suze); 9.5 (Lillet Blanc) → 2.79–3.78, OUT. Hence "at least as sweet" in the recipe. The numbers and vetoes are proved for Cocchi Americano; a substitute needs about 160 g/L sugar or more. |
| Pairings | **Classic:** gin, gentian and a white aperitif wine with grapefruit is Collins's own combination (*Proper* p. 106). Collins garnished his with a grapefruit twist (*Proper* p. 106). **The spark is the Cocchi swap.** The story is one change: the bottle with "a good deal more bitterness from cinchona" (*Codex* p. 74, comparing the bottles as they are now; nothing says Cocchi's recipe stayed the same, Hester X6). A second, Matrix-sourced change would contradict the reading's "I changed one thing" and dilute the point (my lesson from the Old Master: when the story is one change, the spark must be that change). The *Flavor Matrix* was consulted and set aside: its surprise pairings for citrus are "Sage, caraway, peanut, pecan" (pdf 80). Sage is *A Brother's Care*'s leaf and a pun on an archetype name the guest never sees. Caraway is *Not Only the Way*'s spark. Peanut and pecan bring the nuts veto into a veto-free pour. **Knock-on for the reading (Wren):** the ratio also moved (Collins's equal parts → 50/20/15), because Cocchi is twice as sweet as Lillet and the equal-parts drink falls under the stirred strength floor. So y4's "I changed one thing" is true of the ingredients but not the proportions. Suggest: "I changed one thing, and the measures moved to make room for it", or keep "one thing" and never say "his proportions". |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds); `--check ""`: declared contains matches. London dry gin is a distilled grain spirit, so **not gluten** (rule 4). Gentian (Suze) and cinchona (Cocchi) are bittering barks and roots with no heat, so **not `spice`** (heat only, rule 4). Both are wine- or spirit-based aperitifs with no nuts, cream or egg declared; wine fining is ignored (rule 4; neither bottle is labelled with egg or milk as far as I know, *unsourced*). Grapefruit peel touches no veto. **Flag for Robin (my own knowledge, unsourced):** quinine, and so cinchona-bittered drinks, is something some people are told to avoid for medical reasons (quinine sensitivity, certain medications). It isn't in our veto enum and the amount in a quinquina is unpublished (Hester), so I'm naming it rather than hiding it. It's a tonic-water-level caution, not an allergen. |
| Makeable | Kit: a mixing glass or jar, a long spoon, a strainer, a jigger, a peeler or knife, a small stemmed glass. **Named bottles:** Cocchi Americano (the story is this bottle; substitute style given with a sugar floor) and Suze (the White Negroni's own bitter; substitute style "any French gentian aperitif", proved for 15–20% and 10–18 g). Both are ordinary aperitif bottles at roughly vermouth prices (my own knowledge, unsourced), not rarities. Gin is a generic style. No homemade step, no niche kit. |

## Names (≥3; bartender-sayable)
- **The Other Kindness** (**all three pick it**; my ruling, round 6). The tagline stays (*You don't say "poor you". You ask "since when?"*), so a name that repeats "since when" one line above it would spend the title block twice. Wren's words, and my own round-4 case. It makes sense cold and invites a stranger in. It names the person, the kindness that says no (y2: 'the easy kindness would have been to help him. She didn't.'). At the bar: "an Other Kindness, please."
- **Since When** (Wren's round-3 pick; I backed it briefly in round 5, and we crossed). The Doctor's method in two words. It stands only if the tagline moves off "since when", and the tagline is the pour's strongest line.
- **Without Hesitation** (Wren). His words for how she said it. It belongs to the story more than the guest, who does hesitate afterwards ("go over it all the way home").
- **Unwritten** (Hester). The prescription she wouldn't write. Quiet, and it rewards the reading, but on a menu it tells a stranger nothing about themselves.
- **Said Twice** (Hester). The warning repeated because it matters.
- **Straight Answer** (mine). What they're sought for. Plain, a little dry.
- *Rejected:* "Bitter Truth" (a bitters brand, and a cliché); "No Way" (reads on a menu as a refusal of the drink); "Kept the Bark" (the drink, not the person, and "kept" fails Hester's X6).
- Epigraph (Wren's): *The bark in this glass was medicine once. It still tastes like it.* Checked against the drink: true. The cinchona in the Cocchi is the bark, and the drink is plainly bitter. It says "bark", never "quinine" or "a dose", per Hester's guard.
- Checked against the registry: no name repeats.

## Image brief

> A single small stemmed cocktail glass, chilled and faintly frosted, stands on a clean pale grey stone counter in cool, even morning light. The drink is perfectly clear, not cloudy, a light golden yellow with a warm orange edge where the bowl is deepest, still and bright, with no ice. A wide strip of grapefruit peel rests inside, curled against the bowl. Behind it, slightly out of focus, are a halved grapefruit with one strip of peel cut away, a small curled quill of reddish-brown cinchona bark on a plain white dish, and a closed, well-read hardback book lying flat with no lettering on its spine. The wall behind is a deep, calm blue. The one impossible detail: the glass's shadow on the stone isn't the shape of the glass. It is the shadow of a small cinchona branch in leaf, falling where the light says the glass's shadow should be. Palette: deep blue in the wall, soft grey stone, and a calming green only in the shadow's leaves.

- **Glass and drink:** a small stemmed cocktail glass, chilled, no ice. The drink as served is **clear, not cloudy** (stirred), but **not colourless**. It is **light golden yellow with a warm orange edge**: clear gin, pale gold Cocchi, and Suze, which Oxford calls "strong yellow-orange" (SUZE pdf 1958), 15 ml of it in about 122 ml. Never Negroni red, never green, never cloudy. Garnish: one wide grapefruit peel strip, in the glass.
- **Props (three, story):** the cinchona bark quill (the bark the reading is about, "medicine once"); the halved grapefruit (the peel in the drink); the closed book with a blank spine (the book the story comes from, unnamed). **The scale is dropped** (my call; Wren and Hester didn't rule). An empty scale beside bark can read as weighing a drug, which is exactly the powder-in-the-guest's-hands image Hester guarded against.
- **One impossible detail:** the shadow of the glass is a cinchona branch. The drink's truth shows in its shadow, the bitter bark it came from, without anything written. Quiet, and only one.
- **Must not appear:** people or hands (house rule); anything medical or clinical as props: no stethoscope, caduceus, pills, capsules, powder, scale or weights, syringe, dropper, pipette, test tube, prescription pad, white coat, hospital (Wren's traps: no profession label, nothing performed); tonic water, a tonic bottle, a highball glass, lime, ice in the glass (not a G&T); a Negroni-red drink, orange peel; any bottle label, readable text or logo; a second drink.
- **Palette:** the persona's deep blue (Pantone 5415 C) in the wall, subtle grey (438 C) in the stone, calming green (9280 C) only in the shadow's leaves. The drink stays its true light golden yellow.
