# sage-caregiver · The Mentor · drink draft v1.4 (Tomás, round 4 step 3)

Built on the plan's lead as Wren accepted it (r1): the Southside, for many years the 21 Club's house drink (Oxford SOUTHSIDE pdf 1851, undated: "long", never "still"), never "the drink Rea learned". No make-ahead step (Oxford's steeped "mix" on the same page is left out: *Whoever Comes In* and *For Good* own it), nothing handed over at the top (*Loose on Top*). The spark is tarragon, shaken in beside the mint: one thing that isn't in the Southside as Oxford prints it (in guest text, a signposted "one thing of my own"; never pinned on the 21 Club, Hester D3).

**Glassware:** highball glass (about 300-350 ml), chilled, filled with ice
**Contains:** veto-free

## Recipe
| amount | item | note |
| --- | --- | --- |
| 60 ml | London dry gin | ideally 43% or stronger; 40% works, just a touch lighter |
| 30 ml | fresh lemon juice | lemon, as Oxford's Southside has it |
| 22.5 ml | simple syrup | equal weights of sugar and water, stirred until clear |
| 6 | fresh mint leaves | shaken in and strained out |
| 8 | fresh tarragon leaves | about the tip of one sprig; shaken in beside the mint, strained out |
| 60 ml | soda water, cold | added last |
| 1 + 1 | sprig of mint and sprig of tarragon | to finish, set in together |

## Method
1. Put the highball glass in the freezer for ten minutes, then fill it with ice.
2. Put the gin, lemon juice, simple syrup, mint leaves and tarragon leaves in a shaker. Fill it with ice and shake hard but briefly, about five seconds, so there's room left for the soda.
3. Pour it through the shaker's strainer and a small tea strainer into the glass, so no bits of leaf get through.
4. Add the cold soda water and give it one quick stir.
5. Clap the mint sprig and the tarragon sprig once between your hands to wake their scent, then set them in the glass together.

## Checks
| check | result |
| --- | --- |
| Structure | Daiquiri family, long: a Collins (Codex files the Southside as a Daiquiri variation, p. 128). Core 60 ml London dry gin; balance 30 ml lemon + 22.5 ml simple syrup; seasoning mint and tarragon, shaken in and strained; lengthened with 60 ml soda, added last. |
| Balance (balance.py, collins, soda staged as top) | **14.1% ABV · 7.14 g sugar/100 ml · 0.90% acid** (with the 47% gin in the ingredient table; 43% gives 12.9%), dilution 25% fixed: all in range (12.5-15 / 6-7.5 / 0.55-0.95). The lemon sits near the top of the acid band, as a Southside should: bright, and the sugar is there to keep it kind. |
| Departure from the page, owned | Oxford's measures (45 gin / 30 lemon / 22.5 syrup) under a 60 ml soda top run **OUT** on strength (11.6%) with sugar and acid on the edge; less soda only pushes sugar and acid OUT (30 ml: 9.43 g, 1.19%). So the gin goes to 60 ml, the Codex's Tom Collins weight (p. 138); lemon and syrup stay as Oxford prints them. Never "the 21 Club's recipe" in guest text: it's the Southside, long the 21 Club's house drink, made my way. Never "still" (Hester, r2). |
| Sweeps | Gin strength: 47% all in; 43% all in (12.9%); **40% EDGE strength (12.0%)**; 37.5% OUT (11.2%) -> floor 40%, 43%+ recommended (the recipe note says so). Soda: 50 ml EDGE sugar (7.51); 75 ml in range (13.1%). Syrup: 20 ml in range (6.47 g); 25 ml EDGE sugar (7.78). |
| Pairings | *Flavor Matrix* pdf 270: the compounds that make citrus smell of citrus (limonene, myrcene, citronellol) are also found in many herbs, "especially basil, sage, mint, tarragon". So tarragon shares mint's citrus side and sits naturally with the lemon: a second herb from the same list, not more mint. Gin, lemon and a tarragon sprig already share a glass in Humberto Marques's Little Dragon (with mango, dry sherry, honey and matcha; *Joy of Mixology* pdf 323-324); there the tarragon is a garnish only, so shaking it in is my own step. Tarragon is used in no other pour (grep of every pour file). Set aside: basil (fifteen pours), sage (*A Brother's Care*'s leaf), lime (the Codex leans lime, p. 128, but Oxford's page says lemon; the Codex's own Southside is lime, up, in a coupe, with Angostura, so the tall build follows Oxford and the copy never says "the Codex's Southside"), grapefruit, ginger and dairy (Wren's and the plan's fences). John Evelyn's line on tarragon in *Joy* is a health claim: kept out (family ground). |
| Taste words in the reading | y4 now says only "and still it brings something of its own", which makes no taste claim. ("Soft", "sweet" and "faintly aniseed" were offered in the room and aren't in the reading.) |
| Story in the glass | The Southside was "for many years" the 21 Club's house drink (Oxford pdf 1851; undated, so "long", never "still", and never placed in Rea's years there, which are undated too): the place where Jerry Berns schooled Rea. The tarragon is one thing that isn't in the Southside as Oxford prints it (no page gives the 21's own recipe, so never "the house never used it"; for the guest, "one thing of my own"): the drink goes somewhere the printed classic doesn't, which is as much of Wren's (5) as the glass can honestly carry. It stands beside the mint, not instead of it, and its sprig goes in as its own, not tucked behind. That's my reading, never a fact about Rea's drinks. |
| Allergens (allergens.py) | contains: none. **Veto-free** (counts toward the AD-4 floor). New rows, added this round on the safe side: `tarragon_leaves` and `tarragon_sprig_clapped` (leaf herb, no heat, no veto). Existing rows used as they stand: gin, lemon, simple syrup, soda, `mint_leaves`, `mint_sprig_clapped`. |
| Makeable | Fresh tarragon is a supermarket herb-aisle packet; no named bottle; kit: shaker, strainer, a small tea strainer, jigger. Clapping a sprig: Oxford pdf 1853 (its credited bartender stays out of guest text). The Codex pours the seltzer first and doesn't stir (p. 138); soda last with one stir is Oxford's build (pdf 1851). |
| Near misses | *On One Condition* (gin Collins, Collins glass, clapped rosemary): different herbs, glass and syrup; my closing line doesn't use "clap" (its closing line does). *Not Too Polite* (gin Collins, jaggery, orange peel), *Worth the Trip* (gin and cognac highball, ginger-cumin, mint sprig, spice), *In Your Own Hand* (gin, grapefruit, mint syrup, up). Lemon and mint only, no grapefruit, ginger or dairy, as the plan asked. |

**closingLine:** *Put the two sprigs in together. Then find out what one of them knows now that you don't.*

Wording by Wren (r3), ruled in by me (r4): "call one of them" sat too close to *Hoping You'd Come*'s "call the one you'd most like to see", and "ask" would have repeated y5's "Ask them to explain it". Checked: "knows now" is in no pour file; "find out what" appears only inside three Explorer-family readings, never a closing line; "two sprigs" appears only in two recipes (*On One Condition*'s rosemary syrup, the Healer's thyme), never a closing line; no "teach" (*Tried and True*), no "clap" (*On One Condition*), no "side by side". It carries Wren's position (let one of them teach you something back), and y5's "Don't wait for them to ring" now carries the hidden ache.

## Image brief
A tall, plain highball glass on a light wooden table by a window, in warm, soft daylight. The drink is pale and lightly cloudy from fresh lemon, with fine bubbles rising through clear ice cubes to the top. Two herb sprigs stand in the glass together, equally tall: one mint, with rounded, bright green, toothed leaves, and one tarragon, with long, narrow, darker green leaves. Neither is tucked behind the other. Behind the glass, a smooth, warm yellow wall (Pantone 7406 C), softly lit. Calm, clear, uncluttered. No people, no notebooks, no books, no labels, no bar or restaurant setting, no lemon wheel on the rim.

## Names
- *Gladly Outgrown*
- *Past the House*
- *Two Sprigs*
- *Their Own Now*
- *Further Than Me* (Wren)
- *Long the House Drink* (Hester)
- *Heard About It* (Hester)
- *Somewhere Else Now* (Hester)
- **My pick (the vote): *Gladly Outgrown*** (it recognises the one true thing in Wren's read; the closing line does the turning)
