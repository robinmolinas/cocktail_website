# jester-outlaw · The Scandalmonger · drink v1.2 (Tomás, round 4 step 1, 2026-10-04; drink unchanged from v1, wording per Hester r2 and audit r3 D1-D12)

Spec: `_studio/specs/jester-outlaw.json` (v1). Family: Old-Fashioned (Codex p. 5), served up, no ice.

**Glassware:** small tumbler (about 200 ml), chilled in the freezer, no ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | aged Jamaican rum (40-43%; not spiced, not sweetened) | the spirit; many aged Jamaican rums carry a stewed-banana taste |
| 20 ml | Giffard Banane du Brésil banana liqueur (about 25%), recommended for its real bananas, or any banana liqueur of about 25% (a sweeter *crème de banane*: 15 ml) | the sugar, given as banana, out in the open |
| 2 dashes | Angostura bitters | the bitters |
| 30 ml | ice-cold still water, poured from a jug of water and ice | the water, measured: none of the ice goes in |
| 1 | strip of orange peel | squeezed over the top, then dropped in |

## Method

1. At least two hours ahead, put the rum, banana liqueur and bitters in a small jar or plastic bottle (not filled to the brim), close it, and put it in the freezer. Put the tumbler in the freezer too.
2. Just before serving, fill a jug with water and ice and let it stand for a few minutes.
3. Pour the cold mix into the frozen tumbler. Measure in 30 ml of the ice-cold water from the jug, and none of the ice.
4. Stir a few turns with a spoon.
5. Hold the orange peel skin side down over the glass and squeeze it, so its oils fall on the drink. Drop it in.

## Checks

| check | result |
| --- | --- |
| Structure | Old-Fashioned (Codex root, p. 5): core aged Jamaican rum 60 ml; balance: banana liqueur (its sugar) and water; seasoning: Angostura, orange oil. It is the 1806 definition's four things, "spirits of any kind, sugar, water, and bitters" (*Imbibe!* pdf 169; Oxford COCK-TAIL pdf 493), with **one change: the sugar arrives as banana.** The shape sits close to Oxford's own Cock-Tail recipe (pdf 494, card F10): small Old-Fashioned glass, 60 ml spirit, sugar, water, bitters, "cold water to taste", stirred, no ice named. Oxford's spirit is brandy, genever or young whisky: **the rum, its age and the banana are mine**, and nothing in the pour says his cock-tails were rum (card C5). Banana liqueur seasoning a stirred spirit drink is the Codex's move (Bananarac, p. 35: ½ oz Giffard Banane du Brésil with cognac and rye, plus ½ tsp demerara syrup); making it the only sweetener is ours. No banana liqueur is on record in 1806 (Oxford BANANA pdf 202: banana syrup in spirits in mid-19th-century manuals, crème de banana recipes in the early 20th century), so nothing in the pour lets the glass imply Croswell had banana (D11). "Any kind" is never the guest's choice: the rum and the liqueur are fixed. |
| Balance (balance.py) | **Why freeform, and how it's judged** (the same case as *What It Rests On*): the water is poured in as an ingredient (LI p. 152), not melted from ice, and no style of Arnold's has a declared-water, no-ice dilution. balance.py reads it as served, `freeform`: **26.6% ABV · 4.54 g sugar/100 ml · 0.00% acid**, 111.6 ml. Judged by hand on Arnold's **stirred, finished** band (21-29 / 3.7-5.6 / 0.10-0.14; LI pdf 129-130): strength **in**, sugar **in** (mid-band), acid **OUT, justified**: Arnold's stirred acid comes from vermouth, and a spirit-only Old-Fashioned has none by nature (so do *Nothing to It*, *Beside the First*, *What It Rests On*). Cross-check, run: the same mix stirred on ice, style `stirred`: 25.3% / 4.32 g, about 36 ml of melt, so the 30 ml of water is a touch less than the drink's own stirred dilution, decided in advance. **Sweeps** (my `sweep.py`): rum 43% 28.2% (in); 46% 29.9% (edge), back in at 40 ml water (27.4%), so the recipe says 40-43%. Water 25 / 35 ml: 27.9% / 25.5%, all in. Liqueur sugar (**unsourced**, 25 g/100 ml in the row): 20 g 3.64 (edge, just under), 30 g 5.44 (in), 35 g 6.33 (OUT), so a sweeter crème de banane goes to 15 ml (4.99, in); 15 ml at 25 g reads 3.58 (edge), 25 ml 5.42 (in). Control: without the liqueur the drink has no sugar at all (0.07 g): the banana *is* the balance, not decoration. Unsourced values: Giffard ABV 25% (unverified: no library page; label unchecked), liqueur sugar 25 g/100 ml, the jar mix (~36% ABV) not freezing in a home freezer (my call). |
| Temperature | Arnold's freezer Manhattan, from a freezer at about -20 °C plus ice water, finishes around -3.3 °C, "just a bit cooler than you would get from stirring" (LI p. 153); ours is assumed similar (my estimate, his drink). LI p. 153 uses plastic because glass can break if overfilled in the freezer: step 1 says "not filled to the brim". |
| Pairings | Rum and banana: Codex p. 110, aged Jamaican rums "tend to have a stewed banana flavor" (with one exception named on the same page: Appleton "tastes like fresh fruit"; and Hamilton Jamaican Pot Still Dark, a rum brand, leaves "a lingering banana flavor"); p. 109 finds "an undeniable banana flavor" even in Gosling's. So the liqueur says out loud the banana that's often already in the rum. The Codex on Giffard specifically: "balanced and characterized by a true banana flavor—a rarity in liqueurs" (p. 35): that praise is for the named bottle, which is why it's recommended, with Oxford BANANA pdf 202 (Giffard among the older European brands using "real bananas", where many others are artificially flavoured); the substitute is a style, proved on sugar by the sweep. Orange peel and Angostura with aged rum: my craft (the Codex root's peel, p. 5). *Flavor Matrix*: consulted (banana, rum, molasses); pdf 271 groups bananas with the "tropical" lactones, but the OCR merges columns and it's a category page, not a pairing: not cited. The spark comes from the Codex, with the Matrix set aside. |
| Allergens | `allergens.py`: contains [] → **veto-free** (counts toward the AD-4 floor); declared matches. New row `banane_du_bresil` (added by me): contains none: banana, sugar and a distilled spirit touch no veto. Named bottle, so per STUDIO-RULES 5 its label should be checked as that bottle. **Label not checked** (Hester r3: no source in budget): **flagged for Robin.** Composition (banana, sugar, a distilled spirit) touches no veto; a label allergen statement is the only open risk. Numbers and vetoes are proved for Giffard; the substitute is held to "about 25%" and the sugar rule above. |
| Makeable | One aged rum, one banana liqueur, Angostura, an orange, a jar and a freezer. No shaker, no special ice. |
| Siblings and shapes | old-fashioned · aged Jamaican rum · small tumbler, no ice. Nearest: *Why Not?* (old-fashioned · aged rum · hot teacup, Jester), *Nothing to It* (bourbon), *Plain to See* (rye), *Overnight* (daiquiri, tea rum): apart by base, family or glass. The freezer-and-ice-water method is *What It Rests On*'s too (its closing line is a hand-off; this one isn't). No banana in any pour so far (grep: only a fruit bowl in *The Kind You'd Want*'s reading). Nearest published drink: the Bananarac (Codex p. 35), cognac and rye with absinthe: not ours. |
| Wren's fences | Banana isn't a dare or a pulled face: the Codex's line is that it "once seemed questionable at best", until Giffard's liqueur "far exceeded" the team's expectations (p. 35): the gasp, then "hang on". Nothing at the bottom: the banana is on the label and in the first smell. Bitters are a seasoning (2 dashes). No vinegar. No ice is the formula's water, measured, never an ending. I found no honest ingredient for "ready to swallow anything else", so that line stays in the words, not the glass. |

**closingLine:** *Name the banana as you pour it. Then ask who else thinks so, while everyone's still at the table.*

## Image brief

- **Glass and drink:** a small heavy tumbler (about 200 ml), frosted from the freezer, no ice at all. The drink is clear and still, amber (the aged rum's colour), filled about halfway. One strip of orange peel lies in the drink.
- **Props (3-5):** a whole ripe banana lying beside the glass in plain view, unpeeled; an old newspaper page, columns of small type, nothing legible (card F2: "a political paper"; its format isn't on record); a small glass jug of water with ice in it (the ice stays in the jug); a cut orange with one strip of peel taken.
- **One impossible detail:** a single line of type has lifted off the newspaper and hangs in the air just above the page, still illegible, as if it had been said out loud.
- **Light and palette:** one hard, direct camera flash, like a press photographer's, throwing short sharp shadows on a black ground. Amber and banana yellow; a single thin hot-pink (Pantone 805 C) neon edge far in the background, never on the drink.
- **Must not appear:** ice in the glass; a pink or red drink; banana slices or any garnish but the peel; any portrait, politician, president, courtroom or gavel; any readable words, headline or label; a second drink; smoke.
- **SCENE (ready to paste):** A small, heavy tumbler frosted from the freezer stands on a black surface, half full of a clear, still amber drink with one strip of orange peel in it and no ice. Beside it lies a whole ripe banana, unpeeled, in plain view, and behind it an old newspaper page, columns of small type, all illegible. One line of that type has lifted off the page and hangs in the air just above it. A small glass jug of iced water sits to one side, the ice kept in the jug, next to a cut orange with one strip of peel taken. A single hard, direct flash, like a press photographer's, throws short sharp shadows; the palette is amber and banana yellow, with one thin hot-pink neon edge far in the background.

## Names

My pick: ***Present Company*** (the polite phrase that excuses the people in the room; this person says it to them). Others: *To Their Faces*, *Said at the Table*, *On the Table*. I could take *Quote Me*. (If *Not at the Table* wins, I change "at the table" in my closing line.)
