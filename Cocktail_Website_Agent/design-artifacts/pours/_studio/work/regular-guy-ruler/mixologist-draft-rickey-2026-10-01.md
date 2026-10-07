# The People's Champion: Tomás's draft (v2, round 4)

Spec: `_studio/specs/regular-guy-ruler.json`. Story: Bobby Heugel and the packer's cases (*PUNCH*, 2 April 2014), as Wren re-centred it in round 1. Wren ruled in round 3: lime from the odd case is the heart, lemon the honest alternative, no sugar. v2 takes in Hester's audit v1 (T1, T2, T4) and settles the glass.

**Glass:** highball glass (about 350 ml), filled with crushed ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 50 ml | bourbon | any straight bourbon, ideally about 45% |
| 15 ml | fresh lime juice | measured, not counted: any size of lime will do, so buy the odd-sized ones if your shop sells them cheaper. Or use lemon, if the lemons taste better that day |
| 100 ml | soda water | cold, added last |

## Method

1. Fill the glass to the top with crushed ice. A clean tea towel and a rolling pin will crush ordinary cubes.
2. Squeeze a lime and a lemon. Taste a drop of each juice. Use whichever tastes better today, and if anyone asks, tell them why.
3. Measure 15 ml of that juice into the glass. Don't go by halves or wedges: measured out, it makes no difference what size the lime was.
4. Add the bourbon, then top up with the soda water. Stir once, gently, from the bottom.
5. No sugar, and nothing on top. Drink it while the ice is still crisp.

## Checks

| Check | Result |
| --- | --- |
| Structure | *Codex* Highball family: bourbon as the core, soda water as the lengthener, fresh lime as the seasoning. There's no sweetener. The shape is the Rickey from Regan, *Joy of Mixology* pdf 376 (½ oz lime, 1½ oz "bourbon, rye, or Old Tom gin", 3-4 oz club soda, built on crushed ice). Regan: "The secret is in the amount of lime juice used, and many bartenders are guilty of serving merely a Highball with a squeeze of juice from just one wedge of lime." (Same page: "I'm not a fan of this drink", so never "a favourite of". No year for *Joy*: the library copy is the 2018 revision, Hester T4.) **The oldest rule counted limes:** the first Rickeys took "the juice of half a lime or a whole one if the limes were small" (Wondrich, *Imbibe!* pdf 118, via Hester). The measured 15 ml retires that count, which is why size stops mattering. No sugar is the classic Rickey's own rule (Oxford RICKEY pdf 1661, via Wren), so it isn't our twist; the twist is the measure. Crushed ice is Regan's and mine, never "traditional" (Wondrich pdf 119 quotes the 1895 *Philadelphia Times* against cracked ice without a straw, Hester T6). **What I changed from his recipe:** the bourbon is up from 45 to 50 ml so the drink holds its strength as the crushed ice melts. **The glass, ruled (Wren's flag):** a highball glass, not his wine glass. The Scoundrel's *Just This Once* is a large wine glass (about 500 ml) full of ice and bubbles; a smaller wine glass of crushed ice is still the same vessel in the same family of pours, and the two images would be twins. y4 v2 reads "built over a glassful of crushed ice" (Hester A4). Lemon is a tasted alternative. **Keep out of guest text:** Regan's page dates the Rickey to a lobbyist buying drinks for Congress (Crockett, 1935). That's politics (Wren's Out), so the drink appears only as a shape. |
| Balance | `balance.py`, style `highball`: 65 ml base, then 100 ml soda on top, 165 ml in all. **13.6% ABV, 0.15 g sugar/100 ml, 0.545% acid. All in range.** The style doesn't model melt, so I swept it with `sweep.py`. Melt of 15, 30 and 45 ml gives 12.5%, 11.5% and 10.7%, all in range. Bourbon at 40% stays in range up to 30 ml of melt (10.3%). At 45 ml of melt it needs about 43% (my arithmetic: about 10.2%), so the note says "ideally about 45%". At 50% with only 90 ml soda it reaches the strength edge (16.1%). **The amount is the edge, as Regan says:** with no melt, 17.5 ml lime is EDGE (0.63% acid) and 20 ml is EDGE (0.71%); at 45/105, 22.5 ml is OUT (0.78%). That's why the method measures the juice. Lemon gives the same numbers, since the LI table has both at 6% acid and 1.6 g sugar (pdf 140-141). |
| Pairings | Bourbon and citrus: the *Codex* pairs lime with unaged spirits and lemon with aged ones like bourbon, "with many exceptions", and says to taste the juice even though lemons and limes "tend to be fairly consistent" (both p. 115, "The Balance: Citrus Juice"; Hester T2). Together those make step 2: the guest tastes both and decides. Oxford pdf 466 (via Hester): lemon was the usual cocktail citrus until limes became widely available in the 1930s, so the lemon here is the older habit and not a stand-in. **I consulted the *Matrix* and set it aside** (Citrus, pdf 80, with best pairings cilantro, ginger and others). The story is about judging the fruit by its quality, so nothing goes in that would hide the fruit. That's my call, and it's on Robin's "no spark, still interesting" ground: the interest is that the guest chooses the fruit by tasting it. **Guard (Hester C1):** I never claim one lime yields more than another, or that odd-sized limes are as good (Hester A1/A2). **Confirmed for Wren's y4:** "measured out, it makes no difference what size the lime was" is true every time: 15 ml is 15 ml from any fruit. What can differ is the juice's taste, which is why step 2 tastes it. The quality complaint in *PUNCH* is about that year's limes in general, not the odd sizes. |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds). Distilled grain spirits aren't `gluten` (STUDIO-RULES 4). |
| Makeable | Basic kit: a jigger, a juicer or your hands, a tea towel and a rolling pin for the ice. No named bottle; any straight bourbon at 40% or more works, ideally about 45%. "Packer's case" is a trade term (Heugel), so the recipe says "odd-sized" instead. |

**Owned near-misses:** *Fine by Me* (Trailblazer) is a bourbon highball in a tall glass of ice, but its bourbon is washed with bacon fat and the mixer is cider. Ours uses plain bourbon, lime, soda and crushed ice. *With the Bite In* and *Good as It Is* put the squeezed lime into the glass; ours has nothing in the glass. "Measure" stays out of the closing line (*Loose on Top*, *On Their Behalf*, *Can't Watch*).

**closingLine:** *Juice the odd-sized limes. Then take the chair they keep offering you.*

v2. Wren's y5 now says "Next time you're offered a seat where things get decided, say yes", so v1's "offer you the seat, take it" said y5 again in its own words. v2 agrees without echoing: "chair", not "seat"; "keep offering" picks up whoYouAre's refusals ("you come up with a reason to say no") instead of y5's "next time". The first sentence is a real step and the story's trick. No "measure" and no "tell them" (both in closing lines already). Grepped: no closing line or pour file has "the chair they" or "keep offering you".  I dropped "Ask for…" because *I'll Do It* (same family) and *Say So* both close on "ask for", and I dropped "Buy the…" because it's *Brought Home*'s.

## Image brief

- **Glass:** a plain highball glass (about 350 ml), packed to the rim with crushed ice (spec).
- **Drink:** pale gold and lightly hazy, with fine bubbles rising through the crushed ice. That's bourbon's amber thinned about three times by soda and juice: my description, unsourced. No garnish.
- **Story props (3-5), on a home kitchen counter:** a shallow cardboard produce box, open, holding limes of very different sizes, one as big as a fist; one lemon beside the box; a steel jigger holding pale juice; a hand juicer with a squeezed lime half.
- **One impossible detail:** a single drop of juice hanging in midair above the jigger, not falling.
- **Setting and light (persona imagery):** an ordinary kitchen in steady late-afternoon light, strong and structured. Palette from the sheet: deep navy (2768 C) in the wall tiles, warm amber (1375 C) in the light and the drink, metallic silver (877 C) in the jigger.
- **Never:** people or hands, a price tag, a label, a shop sign or any text, a lime wedge or shell in the glass, a straw, sugar, a wine glass, crowds, a second drink, anything that says Houston or Texas.

**SCENE:** A plain highball glass packed with crushed ice, filled with a pale gold, lightly hazy drink, fine bubbles rising and no garnish, stands on an ordinary kitchen counter in steady late-afternoon light. Beside it, an open cardboard produce box holds limes of very different sizes, one as big as a fist. A single lemon rests next to the box. A steel jigger stands full of pale juice, and a single drop hangs in midair just above it, not falling. A hand juicer holds a squeezed lime half. Deep navy wall tiles, warm amber light, a silver gleam on the jigger. No people, no text.

## Names

- **Word Gets Round.** The person's gift (they pass on what they know), with Heugel's "I've told everyone" kept as an echo, never quoted. It recognises; it doesn't carry the position.
- **In the Know.** Plain bar talk. **Flag:** *Where You Stand*'s tagline is "You know how things really get done", which is close to Wren's one true thing. The name would lean on it.
- **Odd Sizes.** The fruit nobody sorts, which measures out the same (Hester T1). Funny, and a bartender would say it. It's about the case, though, more than the person.
- **Worth Asking.** Against: *Worth the Trip* (Reassurer) already starts with "Worth". The same note applies to Wren's working title *Worth Knowing*.

I could take **Word Gets Round**. I'm holding my pick until round 5.
