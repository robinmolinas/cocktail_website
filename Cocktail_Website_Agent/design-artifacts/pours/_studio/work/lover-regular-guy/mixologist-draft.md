# Mixologist draft: The Rough Diamond (lover-regular-guy)

v1.3, round 6 (twelve-seconds wording synced to reading v2; Plumber's Coming claim corrected). v1.2, round 5: The drink is unchanged since v1 (round 2). Round 5 takes in Hester's audit v1, items M1–M8 (listed old → new at the foot), Wren's image beat and the name. Round 4: This round: the closing line is corrected (Hester), the honey is lighter (*Codex* p. 45), cites are fixed, and the image brief and names are added. Spec: `_studio/specs/lover-regular-guy.json`. Sweeps: `work/lover-regular-guy/_sweeps/`.

**Glass:** rocks glass, one large plain cube (the biggest cube your freezer makes; not clear, not cut)
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml (2 oz) | bourbon | Elijah Craig Small Batch recommended, or any straight bourbon between 40% and 50% |
| 22.5 ml (¾ oz) | fresh lemon juice | squeezed the same day |
| 15 ml (½ oz) | honey syrup | three parts light runny honey (wildflower, or a light clover) to one part water, shaken in a closed jar until smooth |

## Method

1. Make the honey syrup: three spoons of light runny honey and one of water in a jar, lid on, shaken until it's smooth.
2. Put one large ice cube in a rocks glass.
3. Pour the bourbon, lemon and honey syrup into a shaker and fill it three-quarters with ice.
4. Close it and shake hard for thirty seconds.
5. Strain it over the cube. Nothing on top.

## Checks

| check | result |
| --- | --- |
| Structure | *Codex* Daiquiri root family. It's the *Codex*'s Whiskey Sour (p. 130: Elijah Craig Small Batch, ¾ lemon, ¾ syrup, over one large cube) with honey syrup in the sugar's place, which is the *Codex*'s own "flavorful syrup for the simple syrup" move (p. 130, Bee's Knees). Core: bourbon. Balance: lemon and honey syrup. Seasoning: none. It starts from the Gold Rush as *A Proper Drink* prints it (p. 96, page image checked: 2 oz bourbon, ¾ oz lemon, ¾ oz honey syrup made from three parts honey to one of water, with no unit on the page; shaken 30 seconds; rocks glass, one large cube). Siegal's order was the idea (bourbon sour, honey syrup instead of sugar, *PUNCH*). The measures and method are the printed recipe's. |
| Balance | `balance.py`, style *shaken (sours)*: 97.5 ml, 57.6% dilution, 153.6 ml finished. 18.4% ABV, 8.73 g sugar/100 ml, 0.88% acid: **balanced**. One edge: initial sugar is 13.75 vs 13.5, before dilution. Finished sugar is in range at the sweet end, which is where p. 96's "rich, nearly decadent" drink should sit. |
| Our one change: a third less honey syrup | Proper's ¾ oz (22.5 ml) of its 3:1 honey syrup reads **OUT**: 12.19 g/100 ml finished vs Arnold's 8.9 ceiling (initial 18.99 vs 13.5). I tested ½, ⅝ and ⅔ oz of honey syrup with ¾ and ⅞ oz lemon, and only ½ oz with ¾ oz lemon lands. That's 15 ml against 22.5, **exactly a third less**, so the reading's "a third less honey syrup than the printed recipe" is true. Tool cross-check: the same drink with Arnold's thinner honey syrup (61.5 g/100 ml) gives 17.2% / 8.68 g / 0.83%, his own printed numbers for the Gold Rush itself (LI p. 133: 2 oz bourbon at 47%, ¾ oz lemon, ¾ oz honey syrup, over a large rock; he names no bottle). The reading states no measures as Siegal's or the house's. |
| PUNCH's formula | *PUNCH* (2021) gives Petraske's usual sour formula as 2 : 1 : ¾. With the 3:1 honey syrup it reads **OUT on sugar and acid**: 16.3% / 11.57 g / 1.04% (initial acid 1.60 vs 1.4). With 1 oz lemon, every honey amount from ½ to ¾ oz is OUT on acid (at ½ oz: 17.2% / 8.27 g / 1.10%). Proper's ¾ oz lemon stays. |
| Which bourbon | **Elijah Craig Small Batch.** It's Proper's recommendation (p. 96 prints "single batch", which Hester reads as a slip for Small Batch, our inference) and the bourbon in the *Codex*'s own Whiskey Sour (p. 130). The *Codex* makes it the benchmark "for Old-Fashioneds" and says it works equally well shaken and stirred (p. 8). *PUNCH* has Knob Creek for the first one and Elijah Craig 12-year-old as the house bourbon after that. The 12-year-old was sold as Small Batch until the age statement came off in January 2016 (*The Spirits Business*), so today's bottle is younger whiskey under the same name: never "the bourbon they used". That it's the bottle Proper meant is our inference (card F21). The 94 proof (47%) is still unsourced: Arnold's own Gold Rush uses a 47% bourbon (LI p. 133) but names no bottle. The sweep covers 40–50%. |
| Strength sweep | Straight bourbon at 40%: 16.0% / 8.95 g (edge) / 0.90%. At 45%: 17.7 / 8.79 / 0.89. At 47%: 18.4 / 8.73 / 0.88. At 50% (bottled-in-bond): 19.3 / 8.65 / 0.87. All balanced. Substitute note: "any straight bourbon between 40% and 50%". |
| The 30 seconds | Kept because Proper prints it (p. 96). Arnold: 8 to 12 seconds gives about the same drink, and past 12 "almost nothing additional happens" (LI pp. 97–98). His measure is chilling and dilution, under his own ice rules. So the numbers above (his 10-second dilution model) hold for a 30-second shake. The last eighteen seconds barely change the glass (Arnold: "almost nothing additional", for chilling and dilution). Reading v2's y4 says "After about twelve seconds, the drink barely changes" (v1's wording, passed as Y4g; Wren reverted her round-4 line). The closing line says "The cold's done by twelve" (the kitchen sense of Arnold's "at least 10 seconds you will be OK", p. 98). Nothing says Milk & Honey shook for show: the extra seconds are ours to use. |
| Pairings | Lemon, not lime, with bourbon, because lime's astringency fights bourbon's vanilla, spice and tannins (*Codex* p. 130, Whiskey Sour). Lemon's soft acidity "doesn't distract from honey" (*Codex* p. 130, Bee's Knees). Honey's best pairings include citrus and alcohol (*Flavor Matrix* pdf 148), and bourbon whiskey is on honey's pairing wheel (pdf 149). |
| The honey (changed from v1) | Three books, three verdicts: the Matrix calls clover "spiced" (pdf 148), LI calls clover "fairly neutral" (p. 53), and the *Codex* finds "most commercial clover honeys dominate other ingredients" and uses light honeys or a generic wildflower (p. 45). The drink's case is "the bourbon gets a word in", so I go with the *Codex*: a light runny honey, wildflower or a light clover. "3:1 by volume" is the *Codex*'s (p. 45). Proper gives no unit, and Arnold works by weight (LI p. 53). Sugar is unchanged at ~87 g/100 ml (computed, unsourced). Proper doesn't say which honey the house used, so the reading never names one. The syrup is "the house honey syrup" (Petraske in Siegal's account, p. 96; Toby Maloney had a hand, *PUNCH*: fact card C5). |
| Spark | The *Matrix* was consulted and set aside, on purpose. Siegal's drink is one change, "as simple as that" (p. 96), and a second change would break the story (Wren agreed in round 3). Honey's surprising pairings (pdf 148) are olive (the brine dash is *Making the Calls*'), sage (*A Brother's Care*'s leaf) and capsicum (heat, the `spice` veto, or a bridge). **Ginger is out twice over.** Ross's Penicillin was "a riff on the Gold Rush" (Proper p. 170), and Siegal answered it with his own Ginger Gold Rush (*PUNCH*). A darker honey would be deeper, but Arnold tried buckwheat "many times" with no luck (LI p. 53). The interest comes from the books and from the person: a third less honey syrup, so the bourbon gets a word in, and eighteen seconds of shaking after the cold is done. |
| Allergens | `allergens.py`: contains [], so **veto-free** (counts toward the AD-4 floor). Bourbon is a distilled grain spirit, not `gluten` (STUDIO-RULES 4). Honey is on no veto list. New table rows (mine, safe side): `honey_syrup_3to1` (87 g/100 ml, computed, unsourced), `bourbon_elijah_craig` (47%, unsourced), and two sweep rows, `bourbon_40` and `bourbon_bib`. |
| Makeable | Shaker, jigger, strainer, a jar, a rocks glass, and a large-cube tray or the biggest cube the freezer makes. The named bottle is widely sold. The *Codex* names Elijah Craig Small Batch its benchmark whiskey for Old-Fashioneds, working equally well shaken and stirred (p. 8), and uses it in its Whiskey Sour (p. 130). Substitute as a style: any straight bourbon, 40–50%. Numbers and vetoes are proved for the named bottle and across that range. |
| Sibling guards | Plain cube, never clear or cut (*Half a Rim*). Honey syrup is this family's (plan Claims). Innocent's Regan row is a Whiskey Sour in a stemmed sour glass, straight up: a different glass, and no honey. *Still Yours* and *Fair Measure* name Petraske only among their runners-up (grepped). The closing line opens "Thirty seconds", not "Shake it" (*Still Yours* opens "Shake it hard"), and never says "spend them" (*Off Duty*'s "Spend them sitting down"). |

**closingLine:** *Thirty seconds of shaking. The cold's done by twelve. Say it in the other eighteen.*

(v1 said "The drink needs twelve". Hester: that rounds Arnold up and widens him, since his range is 8–12 "about the same". "The cold's done by twelve" is on the page, LI pp. 97–98.)

## Image brief

- **The glass and the drink:** a heavy rocks glass with one large plain ice cube, faintly cloudy (not clear, not cut). The drink is shaken bourbon, lemon and honey: hazy, a pale amber-gold, with a thin film of fine bubbles on top (honey syrup's proteins help a sour foam, LI p. 93), a little lower than full around the cube. The hue is my read, unsourced: Oxford (WHISKY, BOURBON, pdf 2142) quotes an 1824 writer, Parker, that a charred barrel "will also give a good color to the liquor"; no page describes the drink's colour, and lemon and dilution lighten it. No garnish. Cold beads on the glass.
- **Props (the story in objects):** (1) a steel cocktail shaker, just set down, still frosted except for two hand-shaped patches where it was held (the thirty seconds, and the hands that shook it); (2) a small glass jar of honey syrup, lid on (the house syrup, shaken in a closed jar, p. 96); (3) a stack of identical folded newspapers tied with string, print too soft to read (the thirty copies, p. 93; nobody knows what he did with them, so they're simply a bought stack, untouched); (4) an adjustable wrench on a worn leather work glove (the plumber was coming, p. 88; the persona's "hands fixing things").
- **The person's part (Wren, round 4):** she asked for worn hands mid-shake, the body half-turned away. The image recipe forbids a person in frame ("never a person in frame", `2026-07-08-persona-image-prompts.md` §4), and mid-shake the drink is in the tin, not the glass. So the hands come in as their trace. The shaker is just set down, and its frost is wiped clear in two broad hand-shaped patches where it was gripped for half a minute. It's physics, not magic: warm hands melt the frost.
- **One impossible detail:** the honey in the jar glows from inside like a small lamp. It's the warmest light on the bench, falling across the glove and the glass.
- **Must not appear:** money, cash, a wallet or a bill (the guest's scene is never money); a car; readable text or headlines; a person or hands in frame; a second glass; an egg-white head, a garnish, clear or carved ice, smoke; gold nuggets, pans or mining imagery (Siegal's name has no hidden meaning, *PUNCH*: never illustrate "Gold Rush").
- **Palette:** rugged brown (Pantone 4635 C), honey gold and steel. High contrast, one warm overhead bulb, city-night dark at the edges, but light enough to bloom from warm white.

**SCENE (ready to paste):** A heavy rocks glass on a scarred wooden workbench at night, one large plain ice cube, faintly cloudy, standing in a hazy pale amber-gold drink with a thin film of fine bubbles on top, no garnish, cold beads on the glass. Beside it, a steel cocktail shaker just set down, frosted with cold except for two broad hand-shaped patches where it was gripped; a small glass jar of honey syrup with its lid on; a stack of identical folded newspapers tied with string, their print too soft to read; an adjustable wrench resting on a worn leather work glove. The honey in the jar glows softly from within like a small lamp, the warmest light on the bench, falling across the glove and the glass. Rugged brown, honey gold and steel; high contrast under a single warm overhead bulb; no people, no hands, no text.

## Names

**Pick: *Any Day*** (Wren's, and mine since round 5). What moved me: the rulebook's first name rule, that the name resonates with the person, not just the story (*A Brother's Care*, not *The Brother's Letter*). *The Plumber's Coming* is Petraske's sentence, not the guest's. And Robin's caregiver edits ask for appealing words, never modest ones: a plumber on a menu is the modest word.

| name | for | against |
| --- | --- | --- |
| *The Plumber's Coming* (my round-4 pick; now runner-up) | The person's one true thing in three words: a mention, not an ask, and heard as help (p. 88). (Siegal's rule, *PUNCH*: names that bring "a feeling or a thought or a chuckle", "not names that have a hidden meaning or connection to the origin of the drink". It gets the chuckle, but it's drawn from the story this pour tells, so the rule leans against it. Strictly, the plumber was the bar's origin, not the Gold Rush's: Hester's round-5 "it breaks it" overstated the rule. *Any Day* passes it cleanly.) Blunt, funny, unglamorous, and sayable across a bar ("I'll have a Plumber's Coming"). It sits beside the tagline without echoing it: the name is the mention, the tagline the rule. | The plumber implies a bill. The reading and image keep money out of the guest's scene, so the name carries the moment, not the money. |
| *Thirty Copies* | Pride said as a purchase (p. 93). y3's "you'd rather buy thirty copies than say so". Short and a little mysterious. | Three thirties in one pour (name, the y4 clause, closing line) turns a coincidence into a motif. |
| ***Any Day*** (pick, round 5: moved to Wren's) | It's the person's love, not the story: the gift and the promise in two words. The line y5 hands the guest ("I'd do this for you any day") means that ordering it is saying the sentence once, across a bar. It's short, human and a little mysterious cold, and the tagline settles "any day now". | My worry was that it spends y5's line early. Wren's answer, that ordering it is saying it, turns that into the point. |
| *The Other Eighteen* | Wren's alt, the moment itself. | It gives the closing line away before the drink is made, the same issue as *Any Day*. |
| *Heard You* | The one true thing, two words. | Flat said out loud. It reads as a reply, not a drink. |

No clash with any registry name, tagline or epigraph (grepped the pours for "plumber", "thirty copies", "any day" and "heard you": none).

## Anchor rows (for Hester's table, as Wren asked)

| kind | fact | meaning | speaksTo |
| --- | --- | --- | --- |
| drink | Proper prints ¾ oz honey syrup (p. 96, page image). Ours is ½ oz, a third less. The printed measure reads OUT on Arnold's sugar range for sours (12.19 vs 8.9 g/100 ml, `balance.py`, LI pp. 129–130), and ½ oz lands (8.73). | "So the bourbon gets a word in": our choice, stated as ours. | the drink as proof; the position (a word in) |
| method | "If you shake more than 12, almost nothing additional happens" (LI p. 97; his measure is chilling and dilution, 8–12 s "about the same", pp. 97–98). Reading (v2 y4): "After about twelve seconds, the drink barely changes." Closing line: "the cold's done by twelve". | The seconds after the cold are free: hands busy, back to the room. | position: say it while your hands are busy |

## Round 5 changes (Hester audit v1, M1–M8), old → new

- **M1** Structure: "as T. J. Siegal ordered it … honey syrup 3:1" → "as *A Proper Drink* prints it … three parts honey to one of water, with no unit on the page"; order vs printed recipe split.
- **M2** Our one change: "his own printed numbers for a 2 : ¾ : ¾ honey sour (LI p. 133)" → "his own printed numbers for the Gold Rush itself (LI p. 133: 2 oz bourbon at 47%, ¾ oz lemon, ¾ oz honey syrup, over a large rock; he names no bottle)".
- **M3** PUNCH's formula: "house sour formula" → "usual sour formula".
- **M4** Which bourbon: fixed in v1.1 (Codex p. 8 "for Old-Fashioneds", p. 130). Now also "47% is my knowledge, unsourced" → "our inference (F21) … 94 proof still unsourced; Arnold's Gold Rush uses a 47% bourbon (LI p. 133) but names no bottle".
- **M5** Makeable: "benchmark whiskey for shaken and stirred drinks, p. 8" (v1) → "benchmark whiskey for Old-Fashioneds, working equally well shaken and stirred (p. 8), and uses it in its Whiskey Sour (p. 130)".
- **M6** The 30 seconds: "The last eighteen seconds change nothing in the glass" (v1) → "The last eighteen seconds barely change the glass (Arnold: 'almost nothing additional', for chilling and dilution)".
- **M7** Pairings: "Every honey carries Maillard-like, toasty aromas (pdf 148)" (v1) → removed in v1.1 (the line didn't carry the drink). "Toasty" is in no copy.
- **M8** Recipe row, step 1 and Spark: "clover honey" / "the plainest jar in the shop, and the warm one" (v1) → "light runny honey (wildflower, or a light clover)", Codex p. 45. "Spiced" is the Matrix's word only, and "warm" is in no copy (done in v1.1, matching spec v1.1).
- **Closing line (X8):** "The drink needs twelve." → "The cold's done by twelve." (round 4).
- **Image:** Wren's hands mid-shake → frost wiped in two hand-shaped patches on the set-down shaker (no person in frame, per the image recipe).
- **Name pick:** *The Plumber's Coming* → *Any Day*.
