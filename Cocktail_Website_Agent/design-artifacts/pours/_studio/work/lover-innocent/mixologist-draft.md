# Mixologist draft: The Pure Heart (lover-innocent)

v1.1, round 4 step 1 (2026-10-04): the drink is unchanged since v1 (round 3); this round takes in Hester's audit r3 (D1–D11) and Wren's r3 conditions, listed at the foot. v1, round 3. Story: Rita Cowan Taketsuru (Wren r1, Hester passed it in r2; anchors v1). Spec: `_studio/specs/lover-innocent.json`. Sweeps: `work/lover-innocent/_sweeps/mixologist-v1-sweep.txt`.

**Glass:** coupe (about 180 ml), chilled
**Contains:** egg-white (a whole raw egg)

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml (1½ oz) | Japanese blended whisky | Nikka From the Barrel recommended, or any Japanese blended whisky of 45% or stronger |
| 22.5 ml (¾ oz) | demerara syrup | one part demerara sugar to one part hot water, stirred until it dissolves, then cooled |
| 1 | whole egg, large | the freshest you can get, clean and uncracked, kept cold; left overnight in its shell beside dried culinary lavender (see Method) |

## Method

1. The night before, line a small lidded box with kitchen paper and scatter a tablespoon of dried culinary lavender over it. Lay the eggs on top, whole, close the lid, and put the box in the fridge. Use the freshest eggs you can get, clean and uncracked, and keep them cold until you use them: the alcohol doesn't make a raw egg safe. The shell lets the scent through to the white.
2. Chill the coupe in the freezer.
3. Crack one egg into the shaker, yolk and white together. Add the whisky and the demerara syrup.
4. Close the shaker and shake hard with no ice for about fifteen seconds, until the egg is light and fully mixed in.
5. Fill it with ice and shake hard again, a little longer than you would for most drinks, until the tin is ice-cold.
6. Strain it into the coupe through the shaker's strainer and a small sieve held over the glass. Leave the top bare: no nutmeg.

## Checks

| check | result |
| --- | --- |
| Structure | *Codex* Flip root family: "booze, sugar, and whole egg, served cold" (p. 240). Core: Japanese blended whisky. Balance: demerara syrup. Texture: the whole egg (the yolk's fat and the white's froth, p. 253). Seasoning: lavender, carried in the egg white (p. 94, p. 253). Proportions are the *Codex*'s Brandy Flip (p. 252: 1½ oz spirit, ¾ oz demerara syrup, 1 whole egg). Its warning sets the measure: too much spirit "and it just tastes like creamy hooch", so I use 45 ml, not the root recipe's 2 oz (p. 241). The *Codex* uses its demerara gum syrup. I use a plain 1:1 demerara syrup a home cook can make. |
| Balance | `balance.py`, style `flip` (Arnold has no flip category; the tool judges it on his egg-white ranges): 117.5 ml, 43.8% dilution, 168.9 ml finished. **13.7% ABV, 8.33 g sugar/100 ml: both in range**, and the sugar sits mid-band, not at the sweet end (Wren's sugar trap). **Acid 0.00%, OUT by structure, justified:** a Flip has no citrus (*Codex* pp. 240–241: spirit, sugar, egg), and Arnold's range is borrowed from egg-white sours. The *Codex*'s own Brandy Flip reads OUT on acid in the same way. Verdict: balanced on every axis a Flip has. |
| Sweeps | Whisky 40 / 45 / 50 / 60 ml: 12.9 / 13.7 / 14.4 / 15.8% (60 ml is edge on strength and drops the sugar to 7.19 g). Syrup 15 / 20 / 25 / 30 ml: sugar 5.92 (OUT) / 7.56 / 9.08 (edge) / 10.49 (OUT), so 20–22.5 ml is the window. Egg 45 / 55 ml: 14.2 / 13.2%, 8.65 / 8.04 g, both in range, so any large egg works. *Codex* root shape (60 ml spirit, 2 tsp sugar ≈ 15 ml syrup): 16.6% / 5.07 g, OUT on both. That's the "creamy hooch" on paper. |
| Strength (substitute floor) | Nikka From the Barrel at 51.4% (label strength unsourced; Hester to check). Same recipe with the style: 40% → 11.0% (OUT, under the 12.1 floor), 43% → 11.7% (edge), 45% → 12.2% (in), 46% → 12.4% (in). So the substitute is "any Japanese blended whisky of 45% or stronger", never "any". At 40%, 60 ml lands (12.7% / 7.45 g), but I won't write a second recipe into the table. Numbers and vetoes are proved for the named bottle and for 45%-plus. |
| The bottle (Hester's notes) | **Nikka From the Barrel (recommended; strength unsourced, label to be checked; D9).** Nikka, because it's his company (anchors: "drink" row; Oxford NIKKA pdf 1391, TAKETSURU pdf 1975). They lived in Hokkaido for the rest of their lives, and his distillery was at Yoichi (pdf 1975; D3). Nothing in the reading rests on the bottling. The reading calls it his company, never hers. **Not Nikka Coffey Grain**, though the *Codex* recommends it (p. 207): the Magician plan's Alchemist guards it ("never Nikka's Coffey Grain"). **Not the Taketsuru Pure Malt**: it carries his name, and she's the subject. From the Barrel is a blend, malt and grain whisky together (my knowledge, unsourced), so no Coffey Grain bottle is named anywhere in this pour. Price and availability are Hester's to check. If From the Barrel fails her check, the recipe line becomes "Nikka, any blended bottling of 45% or more" with the same sweep. |
| Pairings | Whole egg with an aged brown spirit: the *Codex* pairs the "woodsy juiciness" of Cognac with "the fattiness of the egg" (p. 252). Whisky in the same seat is my craft call. Egg with lavender is the *Codex*'s own example, twice (p. 94, p. 253). Lavender with whisky is my craft call (unsourced). The *Codex* uses lavender bitters with a gin, for "a seductive floral hint" (p. 143), and that is the dose I want: a scent, not a flavour you could name. |
| Spark | **The egg is infused while it's still whole.** The *Codex*: "infuse them with flavor while they're still in their semipermeable shell … the egg white will quickly absorb the aroma" (p. 253; method p. 94). The egg goes into the drink whole, and its shell let the lavender through without breaking. Whole, and still open: that's physics, and it's the person. It also does a job. The *Codex* says egg-white drinks can smell of "wet dog" as the white oxidises, which is why bartenders grate nutmeg on top (p. 253). Nutmeg counts as `nuts`, so the lavender in the white covers that job from the inside. **Matrix, set aside:** egg's surprise pairings are vanilla, carrot and rhubarb (pdf 108). Rhubarb is pink (the Flirt's colour), vanilla is *Note to Self*'s spark, and carrot didn't earn a place. **Correction to my round 2:** I said most egg drinks today use only part of the egg. The *Codex* says the whole egg is "probably the most common approach" (p. 253). The reading mustn't set the whole egg against a habit. The gesture is the egg kept whole and still letting the lavender through, not a rule broken. Hester D1: "A Flip takes the whole egg, white and yolk: the yolk for richness, the white for froth (Codex p. 253)." D2: "can't be separated once shaken" is my image, not a page, so it's out of this draft altogether. Codex p. 253 says only that the yolk's lecithin makes "a smooth, thick, uniform texture". |
| Allergens | `allergens.py`: contains ["egg-white"], from the whole egg (the veto enum's only egg entry; a whole egg contains the white). Not veto-free. The Lover family's other ten are planned veto-free or already are (plan Claims), so the AD-4 floor holds. Whisky is a distilled grain spirit, not `gluten` (STUDIO-RULES 4). Lavender and demerara are on no veto list. Nutmeg, the *Codex*'s garnish (p. 241), is left off: it would add `nuts`. New table rows (mine, safe side): `nikka_from_the_barrel` (51.4%, unsourced), `japanese_blended_whisky` (style, 40% floor, for the sweep), `egg_whole_lavender` (about 50 ml, contains egg-white). |
| Raw egg | *Codex* p. 253: the freshest eggs, clean and uncracked, kept cold. The *Codex* asks for clean eggs without cracks, which is why step 1 says uncracked. The alcohol doesn't make a raw egg safe (p. 253), so the recipe never claims it does. |
| Makeable | Shaker, strainer, small sieve, jigger, a lidded box, kitchen paper, a coupe. Dried culinary lavender is sold for baking. The overnight step is a fridge and a box, no kit. The named bottle is a widely sold Japanese blend (unsourced; Hester checks). Substitute as a style: a Japanese blended whisky, 45% or stronger. |
| Sibling and family guards | Lover family has no Flip; the registry's only one is *Everybody's* (an Irish coffee, cream, no egg). No family reserves a whisky Flip. Innocent's Alexander backup is Flip · London dry gin · cocktail glass, so ours is a different base. The Nikka highball shape (Dreamer) is released, and we don't use it anyway. No apple, no pink, no honey (the Gold Rush's), no shiso or shochu (the Charmer's), no sling. Lavender appears in no pour's recipe; *Everybody's* uses it only as an image colour. The egg-white sours (*Down the Line*, *In Good Part*, *Hear Me Out*) use the white alone, and this one uses the whole egg. "Crack" is not free: *Unrehearsed* closes "Crack it in front of them", so my closing line opens on the egg instead. "Reply now", "love you for" and "in whole" appear in no pour (grepped). |

**closingLine:** *The egg goes in whole. And when you want to reply, reply now: that's what they love you for.*

(Position: the fear on Wren's card is catching yourself waiting an hour to reply. The line turns that into a choice and ends on what it gives. It doesn't share a word with any name on the list.)

## Image brief

- **The glass and the drink:** a chilled coupe, frosted with cold, holding a pale, softly opaque drink, a light amber-beige, with a thin, smooth, fine-bubbled top, bare. No garnish, no nutmeg. The colour is my read, unsourced: whisky and demerara go amber, and a whole egg shaken through turns it pale and opaque. (Wren r3: the colour stays "pale", and no cream or sweetness words.)
- **Props (the story in objects):** (1) a small lidded box, open, lined with kitchen paper, with dried lavender scattered under a few whole brown eggs (the overnight step, *Codex* p. 94); (2) one eggshell, cracked cleanly in two, set down beside the shaker, empty (the egg went in whole); (3) a plain dark whisky bottle with no readable label; (4) at the frame's edge, an upright piano's closed lid with a folded piece of sheet music resting on it, notes too soft to read ("she taught English and piano", Ross 2017, secondary: a prop, never a scene).
- **Setting:** a pale wooden table by a window, soft northern daylight, white linen under the glass. Through the window, out of focus, the grey-blue of a harbour (Yoichi is a fishing port, Oxford pdf 1975). No snow, no landmarks.
- **One impossible detail:** one unbroken egg in the box glows softly from inside, like a paper lantern, and the faint shadow of lavender shows through its shell. It's whole, and the light still gets through.
- **Must not appear:** pink or blush in the drink (the Flirt's), apples, a ship or luggage (the voyage is the Knight's), wedding rings or a wedding, kimono or tartan (no costume of either country), readable text or labels, a person or hands, a second glass, nutmeg, a Nikka label or logo, flowers as decoration on the drink.
- **Palette:** white linen, pale wood, soft daylight, lavender's grey-violet in the box only, the drink's pale amber-beige. The persona's soft blush (Pantone 705 C) appears only in the daylight's warmth on the linen, never as a pink object.

**SCENE (ready to paste):** A chilled coupe, frosted with cold, on white linen on a pale wooden table by a window in soft northern daylight. It holds a pale, softly opaque, light amber-beige drink with a thin, smooth, fine-bubbled top, and no garnish. Beside it, a cocktail shaker just set down, and an eggshell cracked cleanly in two, empty. A small lidded box stands open, lined with kitchen paper, with dried lavender scattered under a few whole brown eggs. One unbroken egg glows softly from inside like a paper lantern, and the faint shadow of the lavender shows through its shell. A plain dark whisky bottle with no readable label. At the edge of the frame, the closed lid of an upright piano with a folded sheet of music on it, its notes too soft to read. Through the window, out of focus, the grey-blue of a harbour. White, pale wood, pale amber-beige and a little grey-violet; quiet and airy; no people, no hands, no text, nothing pink.

## Names

**Pick: *Wide Open*** (held to round 4). It's the person as they choose to be after every hurt, and the egg is the same: whole, with the shell still letting the lavender in. Said across a bar, it sounds like an invitation, which is the Lover's tone.

| name | for | against |
| --- | --- | --- |
| ***Wide Open*** (pick) | The fear turned inside out: never guarded. Warm, sayable, and it says nothing literal about the drink, so the closing line keeps the egg. No registry name, tagline or epigraph uses "open". One closing line does: *Plain to See*'s "with their eyes open", which is a different sense (grepped). "Wide open" appears once, in *Asked In*'s image brief (a door standing wide open), not in its title block. | Could tip toward naive if the tagline doesn't show they saw the risk. Wren's tagline carries that. |
| *Every Time* | The choice remade after each letdown (Wren's one true thing). | *For Kicks* closes "Three flies, every time." (registry), and *The Way It Felt*'s reading has "every time it gets shorter". |
| *All of It* (my round-2 pick, withdrawn) | Love given whole, and the whole egg. | *Making the Calls*' tagline is "You'd rather be blamed for all of it…" (registry), so it echoes a registry line. |
| *Unguarded* (Wren's) | Names the fear turned round. I could take it. | One word, a little cool for a drink this soft, and it describes the person rather than speaking to them. |
| *Arrived* (Hester's) | Her word, which Hester sourced ("arrived", never "returned"). | It's the story's verb, not the person's. The rulebook wants the name to resonate with the person (*A Brother's Care*, not *The Brother's Letter*). |
| *Still Open* | Whole and still open, the spark in two words. | "Still" opens *Still Yours* (registry), and *Still Improving* was a family clash before. |

## Round 4 step 1 changes (Hester audit r3, Wren r3), old → new

- **D1** My r2 contrast ("most egg drinks use only part of the egg") is gone from every file of mine. The Spark row now quotes Hester's D1 line.
- **D2** "Can't be separated once shaken" is absent from the draft. The Spark row records that it's my image, not a page.
- **D3** "Yoichi in Hokkaido is where they lived for the rest of their lives" → "They lived in Hokkaido for the rest of their lives, and his distillery was at Yoichi".
- **D9** The bottle row now reads "Nikka From the Barrel (recommended; strength unsourced, label to be checked)". The substitute stays "a Japanese blended whisky, 45% or stronger", and the sweep runs from 40% to 51.4%.
- **D10** "His company" throughout. Nothing says she founded it.
- **D11** The Method (step 1) and the egg's recipe note: "the freshest you can get, clean and uncracked, kept cold". Method: "the alcohol doesn't make a raw egg safe".
- **Wren r3 (colour, foam):** image "pale toffee and cream … fine, close-grained foam" → "pale, softly opaque, a light amber-beige … thin, smooth, fine-bubbled top". Method step 4: "until the egg is frothy" → "until the egg is light and fully mixed in". The drink, spec, glass (a coupe of about 180 ml, chilled in the freezer) and closing line are unchanged.

## Round 4 step 3 (Hester audit r4), old → new

- **B1** Raw egg row: "The main risk comes through cracked shells, which is why step 1 says uncracked. The alcohol and the sugar don't make a raw egg safe (p. 253), so the recipe never claims they do." → "The *Codex* asks for clean eggs without cracks, which is why step 1 says uncracked. The alcohol doesn't make a raw egg safe (p. 253), so the recipe never claims it does."
- **B2** Spark row: "egg drinks can smell of \"wet dog\"" → "egg-white drinks can smell of \"wet dog\"".
- **B3** stays as Hester labelled it: "strength unsourced, label to be checked". It's an open item for Robin.
