# Tomás: drink draft v1, creator-ruler (round 4)

Spec: `_studio/specs/creator-ruler.json` (= `mixologist-vB.json`).

## Recipe (serves 1)

- **glassware:** a coupe (a stemmed cocktail glass), chilled
- **contains:** `[]`

| amount | item | note (shown) |
| --- | --- | --- |
| 45 ml | Cognac (any VS or VSOP) | |
| 22.5 ml | orange liqueur (triple sec, Cointreau style) | |
| 7.5 ml | honey syrup (honey and warm water, 1:1, cooled) | inside the sweet part |
| 22.5 ml | fresh lemon juice | |
| 1 dash | brine from a jar of plain green olives (not stuffed) | works like a pinch of salt |
| 1 | strip of lemon peel | |

## Method (plain words)
1. Put a coupe in the freezer, or fill it with ice and water while you mix.
2. Stir a spoon of honey into a spoon of warm water until it runs. Let it cool.
3. Measure everything into a shaker: Cognac, orange liqueur, honey syrup, lemon, and one dash of the brine from a jar of plain green olives. Measure it, don't guess: the drink holds a strong-sweet-sour frame to the millilitre.
4. Fill with ice, shake hard for about 10 seconds, strain into the cold glass.
5. Squeeze the lemon peel over the top so its oils fall on the drink, then drop it in.

## Checks
| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Sidecar family.** Core: Cognac with a substantial orange liqueur (Codex p. 154, "Sidecar orthodoxy": core = spirit + flavourful liqueur; balanced and seasoned by the liqueur, "sometimes in combination with another sweetener"; balanced by lemon). **Balance:** lemon (sour); orange liqueur + honey syrup (sweet). **Seasoning:** orange liqueur's peel, a dash of olive brine (salt), lemon oils. **Frame:** the Sidecar ratio Saunders says she started from ("Say ... three-quarters lemon, one Cointreau, one and a half ounces Cognac", *Proper* p. 163), held to the millilitre: 45 strong / 30 sweet / 22.5 sour. Holding the totals is **our** rule, not hers (she added syrup on top, p. 164; Hester). The frame alone balances in range (`mixologist-frame-sidecar.json`: 19.6% / 5.06 g / 0.87% / 59.4%). |
| Balance (Arnold, style `shaken`) | Initial 27.9% ABV, 10.78 g/100 ml, 1.38% acid. Finished 17.8% ABV, 6.88 g sugar, 0.88% acid, dilution 56.7%. **All in range.** Sweep of the sweet part (liqueur/honey): 30/0 → 19.5% / 5.02 g (in, near sugar floor); 20/10 → 17.3% / 7.51 g (in); 22.5/7.5 (pick); 15/15 → 16.2%, initial sugar 13.57 (EDGE, over 13.5). The pick is the middle and every measure is a multiple of ⅛ oz. Brine values unsourced (see Allergens). |
| Pairings | Own knowledge: Cognac, orange and lemon are the Sidecar; honey with brandy and lemon is a known pairing (the Bee's Knees family's honey-lemon). *Flavor Matrix*: Grape (Cognac's base) best pairings include **honey** (pdf 140); Honey best pairings **citrus, wine, alcohol**, surprising pairings **olive**, sage, capsicum (pdf 148). **The spark is the olive**: a dash of brine, the salt Arnold adds to sours ("a drop or two of this is all it takes to make a cocktail pop", LI p. 61; "5 drops saline solution or a generous pinch of salt" in a Cointreau-lime sour, LI p. 115). One dash (0.8 ml) of brine at a typical ~8% salt (unsourced) is ~0.06 g, about Arnold's five drops of 20% saline (0.05 g). Sage (also on the Honey list) is refused: it's *A Brother's Care*'s leaf. No pour uses olive or honey as an ingredient (grep). |
| Allergens | `allergens.py`: **veto-free** (AD-4 floor holds). New row `green_olive_brine` added by me (acid 0.5%, sugar 0, ABV 0, salt not modelled: **unsourced**). Classified `none` **only because the recipe says plain, unstuffed olives**: brine from olives stuffed with almonds would touch nuts, with chilli/jalapeño spice. The method says so in plain words. Honey is not a veto category. |
| Makeable | No named bottle: generic styles (Cognac VS/VSOP, triple sec, supermarket honey and olives). Kit: shaker, strainer, jigger, a coupe. The jigger matters: this drink is measured, not free-poured. |


## Closing line
**closingLine:** *Make the first one to the millilitre. Then set it down, name what you'd change, and let someone else make the second.*

- Carries the position (y5: set it down, let them make it again), not the creed. No "tell them" (*The Other Berry*), no shaker handed on (*Down the Line*), no "don't fix it" (*Overnight*), "name" not "say" (*The Other Berry* y5 "say what you saw"). grep of all pour files: no "set it down", no "make the second". "To the millilitre" is literal (the recipe holds 45/30/22.5 ml) and avoids repeating y5's "exactly".

## Names (≥3; bartender-sayable)
- **Making the Calls** (Wren's pick; I back it). Said over a bar it's a sentence, not a label, but it's her condition and the guest's whole way of working. It's true of the glass too: every measure is a call.
- **The Call** (mine). The short version, easier to order, but it loses her voice.
- **One Dash** (mine). The spark, the thing nobody names. It's about the drink more than the person.
- *Set It Down* (Wren): I'd keep it off the title, because it's now in the closing line.

## Image brief

> A single chilled coupe standing alone on a dark wooden bar before opening, caught in one hard pool of light from above, like a stage lit for one scene. The drink is a pale, hazy gold, a little cloudy from the shaking and the lemon, with a fine pale ring of tiny bubbles at the rim, and a curl of lemon peel resting in it. Beside it, laid out in exact order: a steel jigger on its side, a small dish of plain green olives, a little jar of honey with a spoon in it, and a halved lemon. Behind them, half in shadow, an open notebook whose pages are covered in lines of handwritten measures, most of them crossed out and rewritten, unreadable. A bar stool is pushed in, and the room beyond falls away into deep navy and brown. Just above the glass, one single drop of pale brine hangs in the air, perfectly still, catching the light. + HOUSE STYLE + AVOID

- **Glass and drink:** a coupe (stemmed, rounded bowl), chilled. As served: pale, hazy gold (Cognac and honey warmed by lemon), never clear amber, never orange, never green. A thin ring of fine bubbles at the rim. One curl of lemon peel. **No olive in or on the glass** (the brine is a dash in the drink; the olives stay in their dish).
- **Props (story, four):** the jigger (every part measured, the frame held to the millilitre); the notebook of crossed-out, rewritten measures (Maloney's "little tiny tweaks", F8; the persona's "script pages marked with notes"); the dish of plain green olives and the honey jar (the two swaps: the spark and the sweet); the halved lemon.
- **One impossible detail:** a single drop of brine hanging in the air above the glass, still. The one dash nobody will name, held in the light. Wren to judge that it reads as "the smallest thing matters", not as "a mistake being made".
- **Must not appear:** any film prop (clapperboard, camera, director's chair, film reel: no film puns, Wren); a crown, throne or anything regal; a tall glass or foam (*Down the Line*); sage (*A Brother's Care*); an olive on a pick or in the drink (reads as a Martini); a second drink; people or hands; readable text, logos or labels; a sugared rim.
- **Palette:** the persona's Midnight Navy (295 C) in the shadows and the room, Dark Umber (7567 C) in the wood of the bar, Steel Gray (424 C) in the jigger; cinematic hard top-light with strong shadow (the persona's imagery). The drink keeps its real colour, pale hazy gold, the warmest light in the frame.
