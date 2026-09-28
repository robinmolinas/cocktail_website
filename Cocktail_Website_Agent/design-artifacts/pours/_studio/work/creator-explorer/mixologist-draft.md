# Tomás, round 3: the drink, the Checks, the Ritual draft, the image brief

Spec: `_studio/specs/creator-explorer.json` (v1). Name still open, so it's written here as "the drink".

## Recipe (for the pour)

- **glassware:** coupe (a stemmed cocktail glass), chilled
- **contains:** `[]`

| amount | item | note (shown) |
| --- | --- | --- |
| 45 ml | Angostura aromatic bitters (recommended; or another aromatic bitters) | yes, the whole measure |
| 22.5 ml | fresh lemon juice | |
| 17.5 ml | lemongrass syrup (below) | |
| 15 ml | the accent: any unsweetened spirit you have open (rye, gin, mezcal, rum, brandy, whisky) | yours to change, every time |

**Lemongrass syrup** (makes about 250 ml; keeps two weeks in the fridge): slice 2 lemongrass stalks thinly and bruise them with the back of a knife. Warm them in a pan with 200 g sugar and 200 ml water, stirring until the sugar dissolves. Take it off the heat, leave it for 30 minutes, then strain it into a clean bottle.

## Method (draft; Wren to read)

1. Put a coupe in the freezer.
2. Pour the Angostura, the lemon juice and the lemongrass syrup into a shaker. Yes, all 45 ml of the bitters.
3. Now pick the accent: any unsweetened spirit on your shelf, such as rye, gin, mezcal, rum, brandy or whisky. Not a liqueur; it would make the drink too sweet. Try one you haven't used here before. Add 15 ml.
4. Fill the shaker with ice and shake hard for about ten seconds, until the outside is too cold to hold.
5. Strain it into the cold glass.

**closingLine (chosen by Wren, round 4; Hester's S3 fix, round 5):** *It'll balance whichever spirit you pour. Whether you like it is the experiment.*
- Alternate kept: *Next time, change the last bottle. The drink can take it.* Dropped: *You won't use it again.* (fights the ending)

## Checks (for the dossier)

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | Daiquiri (sour) family: spirit + citrus + sugar. **Core = 45 ml Angostura**, the accent used as the base. It can be the core because it's 44.7% ABV (fact card F6, F8). The *Codex* allows a non-spirit core but warns the template needs adjusting (p. 9), which is why the sugar was re-proved rather than copied. **The 15 ml accent sits in the rye's own slot** (½ oz in Gonzalez's printed spec, *A Proper Drink* p. 315; F12), and works like the *Codex*'s split base, where a small second spirit rides on the main one (p. 104). **Balance** = lemon + lemongrass syrup ("the collaboration between citrus and sugar", p. 118). **Seasoning** = the lemongrass aroma. **Why the accent can move:** "swap in any spirit… we can't promise the result will be delicious, it will be balanced" (*Codex*, p. 118). Because the accent is small and the Angostura carries the flavour, a swap changes the drink's edge, not its structure. ✓ |
| Balance (*Liquid Intelligence*, shaken, pdf 129–130) | Shaken ranges: initial ABV 23–31.5, sugar 8–13.5, acid 1.2–1.4; final ABV 15–19.7%, sugar 5–8.9 g/100 ml, acid 0.76–0.94%, dilution 51–60%. **v1 with rye: initial 27.6% · 13.01 g · 1.35%; final 17.7% · 8.32 g · 0.863% · dilution 56.5%. All ✓.** The same spec with each accent (final ABV · sugar · acid): gin 17.4 · 8.34 · 0.865; mezcal 17.2 · 8.35 · 0.867; peated scotch 17.1 · 8.37 · 0.868; cognac 16.9 · 8.38 · 0.870; reposado tequila and aged rum 16.8 · 8.39 · 0.870. **All ✓, no edges.** Round 4, the strength extremes (a test spirit with no sugar or acid): 37.5% → final 16.6 · 8.41 · 0.872; 57% → 18.2 · 8.27 · 0.858; 65% (cask strength) → 18.9 · 8.22 · 0.853. **All ✓.** So the rule holds for any unsweetened spirit from 37.5% to 65%, which is every bottle a guest is likely to own; a liqueur is not covered (it brings sugar). **Rejected:** Gonzalez's own proportions (30 ml orgeat) read OUT on sugar (final 11.98 vs 8.9); at 20 ml syrup the sugar is at the edge (9.1); at 17.5 ml it's in range. **Bitterness caveat:** balance.py can't hear bitterness, and 45 ml of Angostura is loud, so the sugar sits at the top of the range (8.3 of 8.9), not the middle. Values: Angostura, lemon, spirits from the LI ingredient table (pdf 140–141); lemongrass syrup = LI simple syrup's sugar (my row, added round 2). None unsourced. |
| Pairings | Aromatic bitters of Angostura's kind lean on gentian, with warm spice (clove and cinnamon are typical of the family, *Codex* p. 14; Angostura's own recipe is secret, F5, F13; never "Angostura's cinnamon"). The *Flavor Matrix* lists cinnamon, cardamom, citrus and alcohol among lemongrass's best pairings (pdf 164): warm spice, lemon and spirit, all in this glass. Lemongrass gives aroma only; the stalk itself is woody and tasteless (same page), so it goes in as a syrup. Arnold pairs lemongrass with lemon in his Lemon Pepper Fizz (*Liquid Intelligence*, p. 203). The surprise: lemongrass where Gonzalez used orgeat. ✓ |
| Vetoes | egg-white ✗ · dairy ✗ · gluten ✗ (distilled; the accent is a distilled spirit, whichever it is) · nuts ✗ (orgeat removed) · spice ✗ (warm spice isn't heat). `allergens.py --check ""` → contains [], matches, exit 0. **Veto-free.** New row: lemongrass_syrup (none). |
| Makeable | Angostura is named because it is the drink (Gonzalez's bottle), marked recommended, with the substitute as a style per STUDIO-RULES 5: "another aromatic bitters". **Flag:** every number and the veto check are proved for Angostura (44.7%, 4.2 g/100 ml, LI table). At 45 ml a different brand changes the strength and sugar, and its label, not ours, decides its allergens. **Cost flag:** 45 ml is almost a quarter of a 200 ml bottle, so it's the priciest measure on the menu so far (Reiner's objection, in Gonzalez's telling). It's still a supermarket bottle. Lemongrass is in most supermarkets; the syrup takes a pan and 30 minutes. Shaker, strainer, jigger, coupe. |

## Image brief (draft)

> A single coupe on a scarred wooden workbench-bar, holding a shaken, cloudy, deep rust-red drink, near-opaque, with a thin tan foam on top and no garnish, light glowing inside the liquid. Around it, the evidence of trying: four or five different spirit bottles with their corks pulled, at different levels, none matching, crowded at the edge of the frame; a small dark bitters bottle lying on its side, nearly empty; a chopping board with bruised, sliced lemongrass stalks and squeezed lemon halves; a jigger tipped over. On the wood around the glass, the rings left by earlier glasses, each a different vivid colour: one purple, one orange, one green. + HOUSE STYLE + AVOID

- **Glass and drink:** coupe; shaken, so cloudy, never clear; deep rust-red-brown (45 ml Angostura with lemon); a thin foam from the shake; no ice, no garnish (no lemongrass stalk in the glass).
- **Props (story):** the mismatched open bottles (the accent, a different one each time); the near-empty bitters bottle (the whole measure, poured by the ounce); lemongrass and lemon on the board (the riff); the tipped jigger (mid-experiment, not finished).
- **One impossible detail:** the coloured rings. Every earlier version left a mark of its own colour, though no drink here could be purple, orange or green. They're the persona's three colours (Pantone 226 C, 1525 C, 356 C) and the pile of attempts nobody sees.
- **Must not appear:** paint, brushes, canvas or a gallery (the literal artist); maps, compasses or travel (the Explorer pours); a second drink; lab glass or smoke; readable labels or text; an accident motif (spill as a "happy accident").
- **Palette:** rust-red in the glass; purple, orange and green only in the rings.
