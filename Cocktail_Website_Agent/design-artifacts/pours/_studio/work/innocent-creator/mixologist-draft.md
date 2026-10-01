# innocent-creator: Tomás's draft (v2, round 6: Hester's D1–D3 applied)

Spec: `_studio/specs/innocent-creator.json`. The Kalimotxo as the Oxford Companion prints it (equal parts red wine and Coca-Cola, a tall glass full of ice, stirred; CALIMOTXO pdf 386). One change, ruled by Wren in round 3: the ice is the same half and half, frozen into cubes. Nothing else is added.

**glass:** tall glass (about 400 ml), filled with the frozen Kalimotxo cubes
**contains:** veto-free
**serves:** 1

## Recipe

| amount | item | note |
| --- | --- | --- |
| 100 ml | young Spanish red wine, unoaked (a young Rioja or Garnacha, the kind poured by the glass) | fridge-cold; never a grand bottle |
| 100 ml | Coca-Cola, recommended (or any full-sugar cola) | fridge-cold, freshly opened: the fizz comes from this pour |
| about 8 cubes (a glassful) | cubes frozen from the same half and half | made first, below; they melt into more of the drink, not water |

For one tray of cubes (enough for two glasses): 150 ml of the same red and 150 ml cola.

## Method

1. **The cubes (at least 6 hours ahead).** Stir 150 ml red wine and 150 ml cola together in a jug until the fizz settles, so the tray doesn't foam over. Pour into an ice-cube tray (a silicone one is easiest: the cubes come out soft) and freeze on the coldest setting. They freeze softer than water ice, a bit like an ice lolly.
2. Put the wine and a fresh bottle of cola in the fridge, so both are cold.
3. Fill a tall glass to the top with the cubes, straight from the freezer.
4. Pour in the wine, then the cola, slowly: it foams up on the cubes.
5. Stir once, gently, and serve it straight away.

## Checks

| check | verdict | numbers / source |
| --- | --- | --- |
| Structure | **Highball.** Core: red wine. Balance and lengthener in one: the cola, whose sugar and phosphoric acid round the dry wine (*Codex* p. 194: phosphoric acid gives most of a commercial soda's acidity; p. 191: cola brings "a burst of sugar and acidity"). Seasoning: none, by design. | A non-spirit core, so the template is adjusted (*Codex* p. 9 allows a fortified wine or amaro as an Old-Fashioned's core; applied here by analogy). The recipe is Oxford's printed Kalimotxo (pdf 386); the cubes are mine. Never "their recipe" for the glass as a whole, because of the ice. |
| Balance | **Strength OUT by design, sugar and acid in range:** 6.5% ABV, 5.40 g sugar/100 ml, 0.30% acid (highball: 10–16 / 0–7 / 0–0.6). | **Why the OUT stands:** the highball band is derived from spirit highballs (the *Codex*'s Whisky Highball and Gin and Tonic, `styles.json`). The Kalimotxo has no spirit: equal parts of 13% wine is 6.5%. Adding a spirit would correct a classic for a guest who hears every correction as "you got it wrong" (Wren, r1/r3). `freeform` gives the same numbers, nearest style highball. **The cubes, counted fully melted** (150 ml at the drink's own composition): 6.5% / 5.40 / 0.30, identical to the pour. **What plain ice would do** (melt of 40 ml and 80 ml while it's drunk, my assumption, unsourced): 5.4% / 4.50 / 0.25 and 4.6% / 3.86 / 0.21. **Wine sweep:** a 14.5% red gives 7.2% / 5.40 / 0.30; a 12% red about 6.0%. **One honest caveat** (*LI* p. 145, juice cubes): the first part of a frozen cube to melt is richer in sugar and flavour than the last. So the glass runs slightly sweeter and richer mid-drink (*LI* p. 145 says this of juice cubes; that the alcohol behaves the same way is my inference), and evens out at the drink's own numbers once a cube has melted. It's never watered down. Unsourced values: the wine's 13% (joven reds ~12.5–14%, own knowledge; sugar and acid as *LI*'s dry red, pdf 140–141); Coca-Cola's 10.6 g/100 ml (its label value, own knowledge, not read on a page) and ~0.05% acid (my estimate). |
| Freezing (Wren's ask) | **They freeze, and hold as cubes, softer than water ice.** | *LI* p. 141: a home freezer will freeze a drink mix kept under 15.5% ABV and 9 g/100 ml sugar; this is 6.5% and 5.4 g, well inside both. **How firm (my estimate, unsourced method:** ethanol-water freezing points from memory, plus an ideal-solution term for the sugar): it starts to freeze at about −2.5 to −2.8°C. At −18°C about three-quarters of each cube is ice (72–76% between −15°C and −20°C). By the same estimate, Arnold's slush base (p. 141–142, 16.8% before the lime) is only ~40% ice at −18°C, which is why his comes out a slush and ours comes out cubes. *LI* p. 145: "frozen juice is much softer than frozen water", and these will be too. Hence the silicone tray, the coldest setting, at least 6 hours (my figure, unsourced; Arnold's own batches freeze for longer: "It takes a long time to freeze these drinks properly", p. 141), and cubes taken out at the last moment. **Chilling:** only about three-quarters of each cube is ice, so each cube chills about a quarter less than water ice (my calculation). So the wine and cola go in fridge-cold and the glass is filled to the top. The fizz is the fresh cola's: the cola in the tray goes flat, and is stirred flat on purpose before freezing. |
| Pairings | Red wine and cola: the record is the pairing. | Oxford pdf 386 (equal parts; the taste "likened to sangria"); Schaap's "Basque-country classic" (fact card F9); *Codex* p. 18 (no grand wine in it, so a young red by the glass, F10). **Spark:** a technique, not a flavour. *LI* p. 145's juice cubes (ice made of an ingredient, so the drink isn't thinned) applied to the whole drink. The *Flavor Matrix* was consulted (Grape, pdf 140: best pairings include stone fruit and honey; "an affinity for sour flavours") and set aside on purpose. Any flavour added here would be a correction for this guest (Wren, r3), and the lime was ruled out for that reason. |
| Allergens | **veto-free** (`allergens.py --check ""`: matches) | Red wine: fining ignored (STUDIO-RULES 4); sulphites have no veto. Coca-Cola: caramel colour, phosphoric acid, flavourings, caffeine. None is on the veto list, caffeine isn't a veto, and the maker states its colas are gluten-free (own knowledge, unsourced). New rows: `red_wine_young_spanish`, `coca_cola`, `kalimotxo_ice`. The AD-4 floor gains a veto-free row. |
| Makeable | Jug, spoon, ice-cube tray, freezer, tall glass. Supermarket bottles. | The numbers and vetoes are proved for Coca-Cola, which is named because the drink's own record names it (Oxford pdf 386). The substitute is any **full-sugar** cola of similar sweetness. A diet cola changes the drink and the freeze (no sugar), and isn't proved. The wine is a style; the sweep covers 12–14.5%, and the cubes freeze across it. |

**closingLine:** *Stir once, over its own ice. How it's usually done can wait until they've tasted it.*

(Checked: no "overnight", "a day ahead" or "the night before"; no "fix" (*Overnight*), no "hand it over" (*In Your Own Hand*), no "wait for" (*Rosetta*), no "all the way down" (*Standing By*). "How it's usually done" calls back whoYouAre's line and turns it into the position: make it for them first, and let the explanation come later. Wren, if the callback spends your line, the plainer fallback is: *Stir once, over its own ice. Let them taste it before anyone explains it.*)

## Image brief

**SCENE:** A tall, plain glass on a sunlit kitchen table, filled to the top with dark, frosted cubes. The drink is a deep red-brown, nearly black in the middle and ruby where the light comes through at the edges, with a thin rim of tan-pink fizz on top. The cubes are the same dark colour as the drink, matte and frosty, not clear. No lime, no lemon, no fruit, no straw. Beside the glass is a silicone ice-cube tray holding a few more of the same dark cubes, a young red wine bottle and a plain glass bottle of cola (both without labels or logos), and a home-made cake iced bright sunny yellow, a little uneven. Leaning against the cake is a hand-drawn birthday card in crayon, a big round sun in the corner. **Impossible detail (one):** the crayon sun on the card gives off real warm light, a small patch of sunshine falling across the glass. **Palette:** sun-washed yellow (Pantone 7404 C) and bright flat colours, with the drink as the only dark note. The light is warm and airy, playful and sincere. **Must not appear:** a second drink, a jug, bowl or pitcher (one glass), a barman, a pointing hand, a festival, plastic bags, sangria fruit, citrus of any kind, wine glasses, brushes or canvases, any text or brand.

## Names

Bar angle: said across a counter, about the person, not the drink.
- *The Way It Felt* (Wren's pick). Sayable, and the person's own gift. One flag for Robin: *Not Only the Way* (the Craftsman, another Creator pour) shares "the way". The openings differ, so I'd keep it.
- *Obviously Lovely*: whoYouAre's "It's obviously lovely", the guest's own view of their work. Warm, a little funny, unguarded.
- *Colour of the Day*: the cake "iced the colour the day felt". It recognises the person. A slight brush with *Any Day*.
- *No Problem* (Wren's alternate): what the Basques saw in it. Funny, but it can read as dismissive cold.
- **Pick: *The Way It Felt*.** It names what the guest gives, and none of the others does that as plainly.
