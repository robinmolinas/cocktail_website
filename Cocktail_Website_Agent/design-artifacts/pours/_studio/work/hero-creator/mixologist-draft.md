# Tomás · draft v1 · hero-creator (The Idealist) · round 4, 2026-09-30

Spec: `_studio/specs/hero-creator.json` (v1). balance.py: **balanced, all three in range**. allergens.py: **veto-free**, and `--check ""` matches.

**Glassware:** a large, heavy, round-bowled beer glass (about 400 ml), with one large piece of ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 75 ml (2½ oz) | bourbon (any, 40–46%) | the reader's own choice, where the older recipes say rye |
| 30 ml (1 oz) | fresh lemon juice (about one lemon) | |
| 30 ml (1 oz) | fresh orange juice (half an orange) | the reader said many preferred it to orange bitters |
| 15 ml (½ oz) | pomegranate grenadine, home-made (below) | real pomegranate, which Fougner wrote the reputable French makers used |
| 45 ml (1½ oz) | cold seltzer (soda water) | the reader wrote "plain water or seltzer"; I chose the seltzer |
| 1 sprig | fresh mint, lightly bruised | his "improvement", in place of crème de menthe |
| 2 | orange half-slices | |
| 1 small piece | fresh pineapple (tinned is fine) | |
| 1 | fresh cherry, or a cherry kept in brandy (not a bright-red maraschino-style one) | |
| | *for the grenadine:* 250 g pure pomegranate juice (unsweetened; a bottle is fine) and 250 g sugar | nothing else: no orange, no acids |

## Method

1. Make the grenadine ahead. Put the pomegranate juice and sugar in a jar, close it and shake (or blend) until the sugar has dissolved. Keep it in the fridge.
2. Put one large piece of ice in a large, heavy, round-bowled beer glass.
3. Pour the bourbon, lemon juice, orange juice and grenadine into a shaker. Fill it with ice and shake briefly, about five seconds. That leaves room for the seltzer.
4. Strain it into the glass, over the ice.
5. Top up with the cold seltzer (soda water).
6. Press the mint sprig once between your fingers to wake it up. Tuck it into the glass with the orange half-slices, the pineapple and the cherry, the way the reader wrote it.

**closingLine:** *Mint in last, the way the reader wrote it. Then see who writes back.*

(For Wren: this is instead of "Send it. Then ask people what they think, and mean the question.", which is already y5's last word. If the closing line repeated it, the pour would say the same thing twice in a row. This one closes on the glass and then on the answer coming back, which is the column working. "Writes back" is clear in the registry and the pour files.)

## Checks

| check | result |
| --- | --- |
| **Structure** (*Cocktail Codex*) | **Daiquiri family, Collins branch:** a sour lengthened with seltzer on ice. The *Codex* keeps the Tom Collins in its Daiquiri chapter (p. 138: 60 ml spirit, 30 lemon, 22.5 simple, 60 seltzer). **Core:** bourbon. **Balance:** lemon and orange juice against the pomegranate grenadine (the only added sugar). **Seasoning:** mint scent, orange and pineapple in the glass. The reader himself called the Ward Eight's basis "a whisky sour" (*Imbibe!* pdf 243). |
| **Balance** (Arnold; style `collins`) | Recipe 150 ml, shaken short (25% dilution: the tool's estimate, not a *Codex* figure) → base 187.5 ml at 18.0% / 7.92 g / 1.13%, then 45 ml seltzer → **232.5 ml finished at 14.5% ABV / 6.39 g sugar per 100 ml / 0.91% acid: all in range** (12.5–15 / 6.0–7.5 / 0.55–0.95). **Strength sweep (the bourbon is a style, not a bottle):** 40% → 12.9, 43% → 13.9, 45% → 14.5, 46% → 14.8, all in range; 47% → 15.2 edge; 50.5% (bottled-in-bond strength) → 16.3 **OUT**, so the recipe says 40–46%. **Tolerances:** lemon 25 in range, 35 acid edge (1.01); orange 30–40 in range, 22.5 strength edge; grenadine 15 in range, 20 sugar edge (7.71), 10 OUT (4.99); seltzer 45–60 in range. **Versions the numbers rejected:** 60 ml bourbon with 60 seltzer (11.5% OUT, too thin for the half orange); the reader's barspoon of sugar kept (+4 g: 8.00 sugar OUT); grenadine 20 with 60 seltzer (fine at 45%, but 11.8% OUT with a 40% bourbon). It's strong for a long drink, near the top of the Collins band, and the reader called his own "very pleasant, although highly potent" (pdf 244). **Unsourced values:** the pomegranate syrup's sugar and acid (~71 g / 0.5%, computed from ~14% sugar, ~0.8% acid juice: table row, caregiver-magician); bourbon at a typical 45% label. |
| **Pairings** | Bourbon, lemon, orange and grenadine are the Ward Eight's own frame, as the 1934 letter gives it (*Imbibe!* pdf 243–244). The *Codex* describes grenadine made from pomegranate juice as "both juicy and tangy" (p. 129, in its Jack Rose note; theirs is also spiked with orange oil, ours isn't). Mint with bourbon is the julep's (my own knowledge). **Matrix:** pomegranate "is also characterized by sharper aromas such as anise and mint" (pdf 200), and citrus heads its best-pairings list. So pomegranate's own aromas include mint. Wording (Hester, round 4): that clause, never "faint" or "a hint" as a claim of strength, never "the Matrix pairs them" (mint isn't on the pairings list), and the page describes the fruit and its juice, not a grenadine. **No ingredient comes from the Matrix.** I consulted it for an added spark and set it aside: its other partners are other pours' sparks (lemongrass: *Off Duty*, creator-explorer; tea: several; basil: *Before the Room*), anise sits beside *Rosetta*, and none of them is a voice from the column. What the Matrix adds is the finding that the reader's mint (1934) and Fougner's pomegranate (1936) share an aroma. **No spark, stated** (Wren and Tomás, round 4): the interest is the reader's own long version: Wondrich prints the letter (pdf 243–244) but makes it with rye, and no book gives this build; the pomegranate-mint link is a pairing, one plain clause in the reading. |
| **Allergens** | `allergens.py` → `contains: []`, **veto-free** (counts toward the AD-4 floor); `--check ""` matches. New rows (mine, 2026-09-30): `orange_half_slice`, `pineapple_piece`, `cherry_fresh`, `mint_sprig_bruised`, all none. **Cherry, on the safe side:** the table classes maraschino liqueur as `nuts`; bright-red cocktail cherries vary by maker (unsourced), so on the safe side the recipe names a fresh cherry or one kept in brandy, and rules out the bright-red maraschino-style kind. Pomegranate juice and sugar: none. |
| **Makeable** | Shaker, strainer, jigger, a jar; any large, round-bowled beer glass. Bottles: any bourbon from 40 to 46%, with no named bottle; pure pomegranate juice from a supermarket. The grenadine is a two-minute job, made ahead. Pineapple and cherry are the reader's fruit: a reader of the pour sees his glass, and a maker can skip the pineapple without moving a number (garnish, not modelled). |
| **The story in the glass** | Every ingredient comes from the reader's letter or from Fougner; the departures from the letter (the shake, the measures, the fixed grenadine, the sugar left out) are mine and owned. (Wondrich calls the one pre-Prohibition recipe "rather lackluster", pdf 243; we haven't seen it, so we don't claim what changed from it.) **The reader's:** bourbon; "a rather large piece of ice"; "a large, heavy glass of the type generally used for beer… a large round bowl"; fresh mint instead of crème de menthe ("This is an improvement"), bruised and put in "with the slices of orange"; the half orange "many prefer" instead of orange bitters; "plain water or seltzer" (the seltzer is my choice: a long sour wants the lift, and the numbers are proved for it; with plain water it's the same balance, flat); the orange, pineapple and cherries. **His sugar dropped under his own words:** "The amount of sugar should be regulated to taste, and likewise the grenadine." The orange and grenadine carry the sweetness, and with his spoon added the drink goes OUT. **Fougner's:** a grenadine of real pomegranate, after his June 1936 column on the "innumerable products masquerading under that name" (Oxford GRENADINE pdf 947–948). He gave no home recipe, so making it at home is my choice tied to his line, never "as he made it". **Ours, owned:** shaking it briefly (the *Codex*'s Collins method, and Wondrich's "shake gently"; the reader built it in the glass); the grenadine shaken in rather than poured on top, so the numbers are the drink; 75 ml, not Wondrich's 3 oz reading of "three-quarters full" (the letter gives no volume). Never "his recipe" or "the original Ward Eight": it's the reader's recipe, made up the way his letter allows. |
| **Sibling watch** | *Till Spring* also makes a pomegranate syrup at home. Its spark is the orange peel rubbed into it, so ours has no orange in the syrup, and the words are never "my own pomegranate syrup" or orange and pomegranate "side by side". The grenadine isn't "fakes" or labels (*A Brother's Care*) and isn't "the argument" (*Not Too Polite*). It isn't left "to taste" (*Everybody's* "ask how they take it"). The shape is free: daiquiri · bourbon · beer glass matches no registry triple or Hero reservation (the plan reserved Daiquiri, long, bourbon, large round beer goblet). Two stemmed goblets exist (*Rosetta*, *For Good*): ours is a heavy beer glass, and the image must read as one. Rye stays with *Next One's Mine*. |

## For Wren: y4 against the spec
- "a large piece of ice and soda": the reader wrote "plain water or seltzer". Suggest "…topped with plain water or seltzer", then "I went with the seltzer".
- The sugar: say it in one clause, tied to the story (Robin's rule). Suggest "I left out his spoon of sugar, as he allowed ('regulated to taste'): the orange and the grenadine carry the sweetness."
- "a faint scent of mint of its own" → "pomegranate's own aromas include mint" (Hester's round-4 wording, from pdf 200's "sharper aromas such as anise and mint").
- "long, bright and tart, with a blush of red": true to the numbers (acid 0.91, near the top of its band). The colour is a hazy, rosy orange, not red. If you want a strength word, the reader's is "highly potent", which is his, and it's true at 14.5%.

## Image brief

- **Glass and drink:** a large, heavy, thick-walled, round-bowled beer glass (a beer goblet), not a delicate stemmed wine goblet. One large piece of clear ice inside. The drink is hazy from fresh citrus and a warm rosy orange: amber bourbon, orange juice and a deep red pomegranate syrup, lightened by seltzer. This is my estimate from the ingredients, since no book gives the finished colour. Fine bubbles rise along the ice. Tucked in at the rim: one fresh mint sprig standing up, two orange half-moons, a small piece of pineapple and a fresh dark-red cherry on its stalk.
- **Props (the story in objects):** a folded 1930s newspaper, open to a column of grey type that can't be read (the column); a small stack of three opened letters in their envelopes, handwriting too small to read (more than one reader wrote in); a fountain pen with cobalt-blue ink, capped, beside them (answers in writing); a squeezed half lemon and half orange on a small board; a plain glass bottle of dark red syrup, no label (the grenadine, home-made).
- **One impossible detail:** the top envelope hovers a finger's width above the stack, as if it's only now landing.
- **Must not appear:** any readable text or headline; a microphone, protest sign, crowd, flag, ballot or election material; a typewriter; green liqueur; a commercial grenadine bottle or a bright-red maraschino cherry; a straw; a second drink; a person.
- **Palette:** newsprint cream, warm dark wood, the drink's rosy orange, and one cobalt-blue note in the ink (Pantone 286 C, the persona's colour).

**SCENE (ready to paste):** On a warm, dark wooden table stands a large, heavy, thick-walled beer glass with a big round bowl. It holds one large piece of clear ice and a hazy, warm rosy-orange drink, with fine bubbles rising along the ice. A fresh mint sprig stands up at the rim beside two orange half-moons, a small piece of pineapple and a dark-red cherry on its stalk. Beside the glass lies a folded 1930s newspaper, open to a column of grey type too blurred to read. Next to it is a small stack of three opened letters in their envelopes, and the top envelope hovers a finger's width above the others, as if it's only now landing. A capped fountain pen with cobalt-blue ink lies across the stack. There's a squeezed half lemon and half orange on a small board, and a plain glass bottle of dark red syrup with no label. Newsprint cream, warm wood, the rosy orange of the drink, one cobalt-blue note.

## Names

- ***The Long Answer*** (my pick). They rarely win the row. The answer comes later, at length, in the thing they make, and that's the one people quote. It's also literally a long drink, and it was a reader's answer to the column. It's sayable across a bar ("What are you having?" "The Long Answer"), a little mysterious, and it doesn't repeat the tagline's "quoting". Registry: no "Long" or "Answer" name.
- ***No Stupid Questions*** (Wren's lead). It's lovely and funny, and it's Fougner's patience. But it names what the column gave its readers more than who the guest is. Ordered out loud, it can sound like a quip at the bartender. It's my second.
- ***Plainly Put***: how they say it once they're making, not arguing. It's close to "Fougner was neither", but it's quieter than the other two.
- ***Glad You Asked***: the welcome, in a bartender's voice. It's warm, but it's the bartender's line more than the guest's.
- Wren's *Open Question* and *Neither* are on the record. *Neither* is intriguing but cold on a menu, as she says.
