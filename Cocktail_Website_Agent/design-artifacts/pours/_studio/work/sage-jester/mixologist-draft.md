# Drink v1: The Wise Fool (sage-jester) · Tomás, rounds 2-3

Spec: `_studio/specs/sage-jester.json` (v1, unchanged in round 3; Hester's anchors moved the story tie, not the drink). New row: `raspberry_red_wine_syrup` (added this round, contains none).

## Recipe

**Glassware:** coupe, chilled in the freezer, no ice in the glass.
**Contains:** egg-white.

| amount | item | note |
| --- | --- | --- |
| 60 ml | Plymouth gin, recommended | as Oxford's Clover Club recipe prints it; or any soft, earthy dry gin, less juniper-led than a London dry, about 41-44% |
| 15 ml | fresh lemon juice | squeezed the same day |
| 35 ml | raspberry and red wine syrup | homemade: 100 g fresh raspberries, 100 g white sugar and 100 ml dry young red wine (a Cabernet Sauvignon style), blended cold and sieved; makes about 250 ml, enough for seven drinks; keeps a week in the fridge |
| 15 ml | egg white | about half a large white, loosened with a fork first so it pours |

No garnish: the froth is the top of the drink.

## Method

1. Up to a week ahead, make the syrup. Put the raspberries, sugar and wine in a blender and blend on low until you can't feel any sugar grains, about a minute. Leave it 30 minutes, then press it through a fine sieve to take out the seeds. Jar it and keep it in the fridge.
2. Put the coupe in the freezer.
3. Crack an egg, keep the white, and whisk it lightly with a fork for a few seconds so it pours. Measure 15 ml.
4. Pour the gin, lemon juice, syrup and egg white into a shaker. Close it and shake hard with no ice for about 10 seconds, so the white turns to froth.
5. Open it, fill it with ice, and shake hard again for 12 to 15 seconds, until the outside is too cold to hold comfortably.
6. Strain it into the cold coupe through a small tea strainer held over the glass, so the froth comes out smooth.

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| Structure | Pass | *Codex* Daiquiri family: a sour. **Core:** gin. **Balance:** lemon (sour) against the raspberry and red wine syrup (sweet). **Seasoning:** the wine inside the syrup; egg white for texture: "froth and body", in Wondrich's modern editor's note (*Imbibe!* pdf 240; Hester F14), not a 1901 statement. The 1901 and 1931 recipes say only "gin" (F13), so never "the original was Plymouth". The drink is the club's own, Oxford's four ingredients (gin, lemon juice, raspberry syrup, egg white; CLOVER CLUB pdf 481), with one change: the syrup. So never "Killackey's recipe" or "the original": "the Clover Club, with a syrup of my own". |
| Balance | Pass, one edge justified | `balance.py`, style `egg-white`: recipe 125 ml, dilution 45.6%, 182 ml. Initial 21.3% / 11.59 g / 0.95% (all in range). **Finished 14.7% ABV (12.1-15.2), 7.96 g sugar/100 ml (6.7-9.0), 0.652% acid (0.49-0.68): all in range.** Edge: dilution 45.6% against Arnold's 46-49%. It's the shaken formula's own output for a 21.3% start, not a choice, and every finished number sits inside its band. **Why the proportions moved from Oxford's:** Oxford's printed spec (60 gin, 15 lemon, 10 syrup, 10 egg white) reads OUT here: 17.8% / 3.04 g with my syrup, 17.5% / 4.88 g even with a plain equal-weight raspberry syrup. Too strong and too dry for the egg-white band, so the syrup goes from 10 to 35 ml and the white from 10 to 15 ml; the gin stays at the full 60 ml (Wren's "full measure"). **Sweeps (all in range unless said):** lemon 12.5 ml (14.9% / 8.08 / 0.58); egg white 10 ml (15.2% / 8.25 / 0.68); syrup sugar 37-45 g/100 ml (berry sweetness varies: 7.25-8.78 g); raspberry acid 0.6-1.1% in the syrup (0.61-0.71%, edge at the sharp end); wine 12.5% instead of 14.5% (14.5%). Rejected: lemon 20-25 ml (acid 0.79-0.92, OUT at every syrup dose), syrup 40 ml (OUT), egg white 20-30 ml at 35 ml syrup (OUT). |
| Pairings (spark) | Pass | **The spark: the raspberry syrup is made with dry red wine instead of water.** *Flavor Matrix* BERRY (pdf 52): berries' best pairings include citrus and wine, and raspberry is a listed subtype; the Matrix's own raspberry infusion is made in red wine vinegar (pdf 219, printed p. 209, with black pepper and thyme, both left out: pepper is heat, a `spice` veto, and one touch is enough). In the taste, not by looking: the drink still reads as Oxford's "frothy pink" Clover Club, but the raspberry tastes deeper and darker, of fruit and wine rather than sweets. That's Wren's C6, the seriousness under the pink, and it's in the glass every time. **Physics, owned:** egg white is a protein, and "proteins are very good at stripping tannins" (*Liquid Intelligence* p. 266, on clarifying). So the white softens the wine's grip: you get the wine's depth, not its pucker. The same page adds that proteins also strip colour and some flavours (that's in clarifying, with long contact), so the shaken drink's deeper colour is my estimate, not a result. That's my inference from Arnold's page, so the reading never says "tannic" or "bite". **Story tie (Hester A9, F10, F21: the club's own 1884 book):** wine was on the club's table. Members paid for their own wines, and the book speaks of "the Club wine" and "the Club champagne". The 1901 and 1931 recipes have no wine (F13), so the syrup is my riff, never "their recipe". No colour is on the page, so never "the red wine they drank": the red is my choice for the raspberry. Crockett's "dined and wined, and wined again" (F22, *Joy* pdf 267) isn't used: it's a late relay, it carries the Bellevue-Stratford anachronism (C1), and it's an excess line. **Surprise pairings consulted and set aside** (pdf 52: basil, mushroom, cumin, olive): basil is *Before the Room*'s; olive brine is *Making the Calls*' dash; raspberry with cumin is ruler-jester's syrup; mushroom doesn't belong in a sour. |
| Allergens | Pass | `allergens.py`: **contains egg-white** (egg white). Plymouth gin: distilled, no veto. Raspberries and sugar: none. Red wine: fining ignored, as no bottle is named (STUDIO-RULES 4). New row `raspberry_red_wine_syrup` classified `none` on that basis; if the room names a wine, it's checked as that bottle. The family floor holds without this row (plan: every other led Sage row is directed veto-free). |
| Makeable | Pass | **Plymouth gin, recommended, only because Oxford's recipe prints it** (Wren's C5): none of Plymouth's history goes in the pour; *Just This Once* owns that, and it's a different glass and story. Substitute, a style: a soft, earthy dry gin, less juniper-led than a London dry. Strength sweep: 43% in range (15.2%), 45% at the strength edge (15.7%), 40% keeps every finished number in range (14.3% / 7.99 / 0.655) and only the formula's dilution drops under Arnold's band. So "about 41-44%". Numbers and vetoes are proved for Plymouth (41.2%, label value unsourced). Wine: any dry young red, Cabernet Sauvignon style, nothing costly. Kit: blender, fine sieve, shaker, small tea strainer, fork, coupe. Nothing niche. Raw egg: half a white per drink. |
| Near misses | Owned | *Not Only the Way* (Daiquiri · London dry gin · coupe): apart by Plymouth, the raspberry, the egg and the wine. *Down the Line* (gin, egg-white foam): apart by no five-minute shake, no cream, no soda, no tall glass. *Just This Once* (Daiquiri · Plymouth): bottle overlap, owned above. Ruler-jester's raspberry syrup (blended cold too): apart by the wine, the gin, the family and the glass. Never Lowe's half-vermouth build (Reiner's). No mint leaf on top (that's the Clover Leaf, *Imbibe!* pdf 240). |

**closingLine:** *Froth it before the ice goes in. Then tell one joke tonight that's for nobody's good.*

(Provisional, carrying Wren's P1 lean: every joke of theirs does someone good; this one doesn't have to. Wren kept P1 in round 3. "Froth it before the ice goes in" replaces "Make the froth first" (Hester H12: the syrup, glass and egg come before the froth; the shake without ice comes before the ice, method step 4). Checked across every pour file: "nobody's good" appears nowhere; "before the ice goes in" appears only in *regular-guy-magician*'s Checks prose about Regan's order (not a closing line, reading or motif); "shake it once without ice" is *Down the Line*'s reading and "Shake it hard" a registry closing line, so neither is used.)

## Image brief

**The drink:** a chilled coupe, no ice, holding the Clover Club: frothy pink (Oxford's word for the drink), a smooth pale-pink cap of froth about a finger deep on top, the body below a little deeper in colour from the red wine (my estimate, unsourced; never purple, never brown). No garnish of any kind.

**Setting:** a Philadelphia hotel's dining table after dinner, in the club's spirit, around 1900 (no hotel named), seen close: a white linen tablecloth, the coupe in front. Beside it, a small dish of fresh raspberries. No wine glass on the table: the club's wine has no colour on record (Hester F21), so a glass of red would show something the page doesn't say. A folded newspaper lies at the edge of the cloth with a few pencil notes in its margin, nothing legible (the club were journalists, Oxford pdf 481; the persona's "marginal notes on headlines"). Warm, low light, as if the room is still talking.

**Must not appear:** people or hands; any legible text, headline or name; politicians, flags, rosettes or anything partisan; masks or jester props; a wine glass, a bottle or raised goblets (the club's goblet custom is a drinking ritual, F21); a mint leaf (the Clover Leaf); more than one Clover Club (no Yeats's three); a raspberry on a pick or on the rim (that's Reiner's bar's garnish, *Joy* pdf 269); ice in the glass; anything dark behind where text will sit.

## Names

- **A Laughing Matter** (my pick): the person makes the serious thing into one, so the one it's about can take it home. Praises the person; the closing line shares no word with it.
- **In Good Part**: "to take it in good part", how the one it's about receives the joke. The face kept.
- **No Offence**: the deadpan line before the truth. Riskier: it can read as the joke's apology.
