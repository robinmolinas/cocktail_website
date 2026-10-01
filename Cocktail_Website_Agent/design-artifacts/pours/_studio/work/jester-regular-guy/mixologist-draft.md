# Tomás · draft v1.3 · jester-regular-guy (The Stand-up) · round 6, 2026-10-01

Spec: `_studio/specs/jester-regular-guy.json` (v1). balance.py (`freeform`, two glasses served apart): **the pair 10.2% ABV / 1.36 g sugar / 0.282% acid** (nearest style: highball, and inside its range on all three); rye glass alone 48.0% / 4.00 g / 0.150%; beer glass alone 5.0% / 1.00 g / 0.300%. allergens.py: **contains gluten, nuts**; `--check "gluten,nuts"` matches.

**Glassware:** a small stemmed glass (about 90 ml) for the rye, at room temperature, and a tall pilsner glass (about 400 ml), chilled, for the beer
**Contains:** gluten, nuts

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml (1½ oz) | apricot rye (below) | straight rye whiskey, 50% if you can find it, nothing under 45% |
| 330 ml (a bottle) | German-style pilsner, very cold | a pale, crisp, bitter lager; any brewery |
| *for the apricot rye* | | |
| 250 ml | straight rye whiskey, 50% (or at least 45%) | the whiskey the name meant in 1948: "straight rye with a beer chaser" |
| 60 g (8 to 10) | dried apricots, chopped | straight from the kitchen cupboard; strained out before serving. Check the pack for a nut warning. |

## Method

1. Chop the dried apricots and put them in a clean jar. Pour the rye over them, close the jar and shake it.
2. Leave it at room temperature for six to eight hours, shaking now and then. From the fourth hour, taste a drop every hour or so. Strain it when the rye tastes clearly of apricot but still tastes of rye.
3. Strain it through a sieve lined with a paper coffee filter into a clean bottle. Keep it in the fridge, and take it out a little before you pour.
4. Chill the pilsner glass in the freezer for ten minutes. Tilt it, pour the beer down the side, then straighten the glass at the end so it finishes with a finger of foam.
5. Pour 45 ml of the apricot rye into the small glass. Set the two down next to each other.
6. Sip the rye, then the beer. Nothing goes in either glass.

**closingLine:** *A sip of the rye, then the beer. And when you tell the joke, start with "I".*

(It carries y5's position, swapping "everybody" for "I", in the drink's own order, without repeating y5's words. v1.1, round 5: "tell it" became "tell your story", because "it" could point back to the beer (clear before clever). Registry and pour files grepped: no "start with", no "sip of the", no "your story", no "when you tell". The runner-up is *"Rye, then the beer. Say it was you who ordered it."*)

## Checks

| check | result |
| --- | --- |
| **Structure** (*Cocktail Codex*) | **Highball root, served apart:** a spirit with a long, fizzy partner, but in two glasses, never mixed, so `freeform`. It's the Boilermaker as Oxford defines it: "a glass of beer accompanied by… a shot of whisky", and the unmixed pair is the one that got the name (BOILERMAKER pdf 306). **Core:** straight rye. **Balance:** the pilsner (its bitterness and its cold). **Seasoning:** the dried apricot, in the rye. Nothing is dropped in (the Depth Charge, pdf 306, is out). |
| **Balance** (Arnold; `freeform`, no dilution: no ice in either glass) | **The pair, as drunk (375 ml):** 10.2% / 1.36 g / 0.282%. That sits inside the highball range on all three (10–16% / 0–7 g / 0–0.6%), which is my comparison, since freeform applies no ranges. **Rye glass alone:** 48.0% / 4.00 g / 0.150%. It's a neat pour, so no style range fits. 4 g/100 ml is barely sweet: under half a stirred drink's floor (3.7–5.6 *after* dilution, from 5.3–8.0 before). It reads as dried fruit, not sugar. **Beer glass:** 5.0% / 1.0 g / 0.30% (the table's beer row, unsourced). **Steep sweep (the extraction is my estimate):** 0 / 2 / 4 / 6 / 8 g sugar per 100 ml of rye → the pair at 0.88 / 1.12 / 1.36 / 1.60 / 1.84 g. It stays dry at every stop, so the tasting step in the method is about flavour, not safety. **Rye strength sweep:** 40% → the pair at 9.0% (under the highball's 10% floor), 45% → 9.6% (just under), 50% → 10.2% (in). So the recipe says **50% if you can, nothing under 45%**, and at 45% the pair is a touch lighter than a highball, flagged here. **Unsourced values:** the steep row (rye at the table's 50% less ~4% for the fruit's water; dried apricot ~53% sugar by mass, ~30% extracted; acid ~0.15%) and the beer row. **Ratio:** the *Codex* says to start dried fruit at 1:4 by weight to the spirit (p. 99, in its infusion section). 60 g to 250 ml of rye (~235 g) is about 1:4. **Method:** the *Codex*'s infusion method: combine, taste often, strain through a lined sieve, refrigerate (pp. 94–95). The *Codex* keeps room temperature for infusions of an hour or less (p. 94), and says a higher-proof spirit infuses faster (p. 95). **A six-to-eight-hour room-temperature steep is my craft call, unsourced.** I chose it because dried fruit is gentler than the *Codex*'s quick examples (chile, tea), and the tasting step from the fourth hour guards against it going too far. |
| **Pairings** | **The pair is the page's:** Billy Rose in 1948, "straight rye with a beer chaser" (pdf 307). Oxford's pair as habits changed was German beer with Irish or American whisky (pdf 306). Modern menus pair spirits and beers in "various and creative ways", some still rye and lager (pdf 307). **The spark (*Flavor Matrix*):** beer is a surprise pairing for stone fruit, and apricot is one of the family's main subtypes (STONE FRUIT pdf 236). Hester's fences: the *Matrix* describes fresh fruit, so no lactone or aroma claim for dried apricots, and **rye with apricot is my craft call**, not the book's. **Set aside:** stout with Irish whiskey (Oxford's Irish Car Bomb, pdf 306); a cherry beer with bourbon (the Straight Man's base, and no longer the plain order); the Kopstoot's brim (Wren, r3). |
| **Allergens** | `allergens.py` → **gluten, nuts**; `--check` matches. **gluten:** the beer, undistilled (STUDIO-RULES 4). It can't be avoided: the beer is the story. A gluten-free beer would keep the veto off but stop being the plain order (my r2 call). The rye is distilled grain, so not gluten. **nuts, new and my call (safe side):** new row `apricot_steeped_rye`. Dried fruit is commonly packed where nuts are (unsourced, but a reasonable fear for a nut-allergic guest), and stone fruit and almonds are botanically related (*Codex* p. 37). The recipe note tells the maker to check the pack. This costs the floor nothing, since the pour wasn't veto-free anyway. It does lose the drink for a nut-veto guest, and I'd rather that than under-declare. **Sulphites** in dried apricots aren't in the veto enum. |
| **Makeable** | A jar, a sieve and a coffee filter, a jigger, a freezer. Bottles: any straight rye (50% ideally, at least 45%); any German-style pilsner; supermarket dried apricots. No brand anywhere. The numbers are proved across 40–50% rye and 0–8 g of extracted sugar. |
| **The story in the glass** | Two glasses, side by side in the image only (*Till Spring* owns the phrase "side by side": never in the text). The plain order is kept: Spring's line had no joke on it, and the drink's face has no trick. The one change is inside the rye, from the kitchen cupboard, and you find it when you taste it (Hester Q3: a steep can also show in the smell and the colour). That's y4's tie. |
| **Sibling watch** | **Shape:** freeform · rye · small stemmed glass + tall pilsner glass is free. Hero's Saviour is highball · rye · tall glass with ice, a mixed drink; the Alternative Comic's reserved shape is rye · rocks glass. I avoided a rocks glass and a shot glass for that reason, and Wren's "never a shot". The Idealist's round-bowled beer glass holds a mixed bourbon drink with ice; ours is a tall pilsner glass of beer only. **Apricot:** in no pour as an ingredient (grepped; *Left Standing* only quotes the *Codex*'s liqueur list). **Steep words:** no "overnight", no "a day ahead" (*Overnight*, *For Good*). |

## For Wren: y4 v1 against the spec
- "a handful of dried apricots, steeped in the rye and strained out" → the spec is **8 to 10 dried apricots, chopped**, for a whole bottle's worth (250 ml). If y4 keeps "a handful", it's true for the batch. Suggest: "a handful of dried apricots, chopped and left in the rye for several hours, then strained out" (Hester D3; "an afternoon" undersold six to eight hours).
- "so every sip of the cold, bitter beer brings the apricot forward" → that's a taste claim, and only the pairing is sourced. Suggest: "and beer turns out to be one of stone fruit's surprising partners, so the cold beer after it is the apricot's partner too". Or label it: "I like to think every sip of the beer brings the apricot forward".
- "a straight rye, which is what the name meant in 1948" → true (Billy Rose, pdf 307).
- "a pairing that's back on good bar menus now" → either is true. Record fix (Hester, r5): "good" passed her A14 as the bartender's word. I was wrong to call it a fail.
- "Nothing gets dropped in, and nothing gets mixed" → true to the spec.
- **Contains now reads gluten and nuts.** If y4 mentions the cupboard, no change is needed; the nuts are in the Contains line and the recipe note only.
- A sweetness word, if one is wanted: dry (1.36 g for the pair; the rye glass is barely sweet).

## Image brief

- **Glass and drink:** on a small round café table by a window, two glasses. The left one is a small stemmed glass (about 90 ml), a third full of clear amber rye. The colour is my estimate; no book gives it. The right one is a tall, slender pilsner glass, tapered toward the foot and frosted from the freezer, full of pale gold, clear, sparkling lager, with a finger of white foam. That colour is my estimate too. The two glasses are close together, with nothing between them. No ice, nothing on any rim, nothing in either glass.
- **Props (the story in objects):** a small paper bag of dried apricots from the supermarket, opened and folded over at the top, three or four soft orange apricots spilling out onto the table, framed like a punchline (the cupboard thing nobody looks at twice). A folded newspaper with narrow columns and no readable text, for the 1896 *Herald* and Spring's 1933 column. A simple beer mat under the tall glass, plain, no logo.
- **One impossible detail:** in the window glass behind the table, the reflection shows the street's café tables. On every one of them stands the same small stemmed glass beside the same tall beer, as far as the eye can see. The guest's order turns out to be everyone's.
- **Must not appear:** a shot glass, or any glass dropped into the beer; a stout or dark beer; a rocks glass or ice; a microphone, stage, spotlight or anyone performing; people's faces (a passer-by's blurred back outside the window is fine); readable text, logos or brands (no Carlsberg); a tulip glass filled to the brim; a bar counter with a bartender; anything industrial (no boilers, no metalworker's tools); a Kopstoot bow.
- **Palette:** daylight from a street window, bright approachable blue (Pantone 285 C, the persona's colour) in the window frame or the café chair, white café table, the rye's amber, the lager's pale gold, the apricots' soft orange.

**SCENE (ready to paste):** Daylight comes through a street-side café window with a bright blue frame. On a small round white table stand two glasses close together. One is a small stemmed glass, a third full of clear amber rye whiskey. The other is a tall, slender pilsner glass, frosted from the freezer, full of pale gold sparkling lager with a finger of white foam, standing on a plain beer mat. Nothing is in either glass, and there's no ice. Beside them, a small paper bag of dried apricots lies opened and folded over, with three or four soft orange apricots spilled onto the table. A folded newspaper with narrow columns of unreadable print lies at the table's edge. In the window's reflection, the street's café tables recede into the distance, and on every one of them stands the same small stemmed glass beside the same tall beer. White, bright blue, amber, pale gold and apricot orange.

## Names

- ***Is It Just Me*** (Wren's pick, and mine). It's the person's opening line and the confession hidden in the joke, and the reading answers it. Across a bar it's a laugh before the drink arrives ("I'll have an Is It Just Me"), and that's this person. On a menu, I'd keep it without a question mark (Wren's open point): the bartender says it as a name, not a question. It doesn't repeat the tagline. Registry: free.
- ***No Joke***. It's Spring's line for the Boilermaker, the one in his column with no joke on it, and the drink's face has no trick. It's short and funny to order. But it captions the story (y2) more than the person, so it's the runner-up.
- ***A Whiskey and a Beer***. This is the order itself, plain on purpose, and it's the epigraph's opening words. That's my case against it: it would spend the epigraph twice.
- ***Not Only You***. Wren's. It's warm and true, but it gives away y5's ending ("it was never just one person's") before the reading gets there.

## Round 5: y4 v2 (Wren's alternatives) and Hester's A15 against the spec
- **"a handful" holds.** The spec is 60 g, 8 to 10 dried apricots (about 6–7 g each, my estimate), for 250 ml of rye, about five or six pours of 45 ml. A handful is roughly that, but only for the batch. So y4 must not read as a handful per glass. "A handful of dried apricots, chopped and left in the rye for several hours, then strained out" is true (v1.2, Hester D3), with no *Overnight* or *For Good* words.
- **Hester's A15:** "I like to think the cold, bitter beer brings the apricot forward" is signposted, and "cold" and "bitter" are the spec's (a very cold German-style pilsner). It passes for me.
- **Wren's new lines:** "Two glasses, nothing in between" is true to the spec (no ice, nothing in either glass). "The apricot is inside the rye, and you only find it by tasting" is true too: it's strained out, and the rye looks like rye. There's no aroma claim. "As plain as Dave Ray's line" is Wren's comparison, and it's fine with the drink.
- **Closing line against y5:** y5 says swap "everybody does this" for "I do this". The closing line gives the same move as a thing to do, "start with 'I'", after the drink's own order. It doesn't repeat y5's words, the tagline's "You say what everybody does", or the name. v1.1 only changes "it" to "your story".
- **Nothing in the drink changed:** spec v1, balance.py and allergens.py are as in round 4.

## Round 6: v1.2 (Hester's D1–D3; nothing in the drink changed)
- **D1:** the recipe note now reads "Check the pack for a nut warning." The `nuts` call stands, and the Checks row keeps its reasoning (labelled unsourced, plus *Codex* p. 37).
- **D2:** the method is cited as *Codex* pp. 94–95, and the six-to-eight-hour room-temperature steep is labelled as my craft call.
- **D3:** "an afternoon" → "for several hours" in my y4 suggestions.
- **Q3 taken in the Checks:** "you find it when you taste it".
- **A14 record fix:** "good bar menus" passed.
- **Closing line:** v1.1 stands, *A sip of the rye, then the beer. And when you tell your story, start with "I".*, pending Wren's ruling. The case: "it" right after "the beer" can read as telling the beer (clear before clever). The position and y5's agreement are unchanged. If Wren holds "tell it", I won't call that a deadlock, since the meaning is the same, but I'd rather the clearer one ship.
- **Spec v1, balance.py and allergens.py:** unchanged (10.2% / 1.36 g / 0.282% for the pair; gluten, nuts).

## Round 6b: v1.3 (closing line only)
- *…when you tell your story…* → *…when you tell the joke…* (Wren's preference, which I took). "Tell the story" is *Anyway*'s closing line in this family ("Then tell the story of the one that didn't take"). My grep for "your story" missed it. "The joke" is y5's own word ("People enjoy you for the joke") and keeps "it" off the beer. Registry: no "the joke" in any closing line.
- Reading v3's y4 still says "left in the rye for an afternoon". Hester's D3 makes it "for several hours". That's a one-phrase fix, and nothing else in y4 moves against the spec.
