# Tomás: drink draft, hero-outlaw (The Lovable Rogue), v1, round 4 step 3 (Hester r3 D1, D2, D4, D5 and r4 T1, T2 landed; the drink is unchanged)

Spec: `_studio/specs/hero-outlaw.json` (v1). A rye Old-Fashioned built on one large cube. The bitters are Underberg, one of the two bitters LeNell Smothers broke local liquor rules to stock, because they counted as food, so grocery-store goods (*A Proper Drink* p. 237; anchors row "rule"). The sugar is a spoon of sorghum syrup.

**Glassware:** small rocks glass (single old-fashioned, about 200 ml), one large ice cube
**Contains:** nuts (provisional: the Underberg row, on the safe side; see Allergens)

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | straight rye whiskey, 40-43% | any straight rye at that strength; stronger bottles run too hot over one cube |
| 7.5 ml (1½ teaspoons) | sorghum syrup | pure sorghum syrup; or pure cane syrup. Measure it: half a teaspoon either way tips the balance |
| 5 ml (1 teaspoon) | Underberg | recommended; or another digestif bitters |
| 1 strip | orange peel | |

## Method

1. Spoon the sorghum syrup and the Underberg into the glass.
2. Pour in the rye and stir with a bar spoon until the syrup has disappeared into the whiskey, about fifteen seconds. Do it before the ice: once it's cold, the syrup clings to the spoon.
3. Add one large ice cube and stir for another twenty to thirty seconds, until the outside of the glass feels cold.
4. Squeeze the strip of orange peel over the top so its oils fall on the drink, then drop it in.

**closingLine:** *Stir the sorghum in first: once it's cold, it clings. Then tell one person you'll be there, ahead of time.*

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| **Structure** | Old-Fashioned (*Codex* root, pp. 3-6) | Spirit, sugar, bitters and water (*Codex* p. 3). Core: straight rye, the whiskey she stocked when hardly anyone stocked it (*Proper* pp. 237, 239; Simonson's narration, never quoted as "when no one had rye", Hester r2/D5). Balance: sorghum syrup, in the place of the *Codex*'s teaspoon of demerara syrup (p. 5). Seasoning: Underberg, a teaspoon, in the place of aromatic bitters, plus orange oil. Built on one large cube, so judged as `built` (the Trailblazer rule: style as served). |
| **Balance** | balanced (`balance.py`, style `built`) | 72.5 ml at 36.1% ABV, 9.31 g sugar/100 ml, 0.031% acid; 24% melt to 89.9 ml. **Finished: 29.1% ABV (27-32), 7.51 g/100 ml (6.5-8.5), 0.025% acid (0-0.05).** All in range, no edges. **Sweeps (sweep.py, one call):** rye 37.5 / 40 / 43% → 27.5 / 29.1 / 31.1%, in range; **45% → 32.5%, edge; 50% → 35.8%, OUT** (50 ml of a 50% rye still 35.1%, OUT): so the recipe says 40-43%. Sorghum 5 ml → 5.18 g, **OUT**; 10 ml → 9.68 g, **OUT**: the 7.5 ml is a measure, not a "to taste". Sorghum sugar is unsourced (90 g/100 ml): at 100 g → 8.34, in range; at 75 g → 6.26, edge (then 10 ml lands at 8.06). Underberg 5 / 7.5 / 10 ml → 7.51 / 7.26 / 7.02 g, all in range (with 43% rye at 10 ml: 31.4%, in range); Underberg sugar 0 → 10 g/100 ml (unsourced) moves sugar to 8.06, in range. **Acid edge to watch:** if pure sorghum carries 1% acid instead of my unsourced 0.3%, acid reads 0.083%, OUT of Arnold's no-acid band (it trips at about 0.6%); nobody tastes 0.08% as sour, but it's flagged. **Melt by hand (one big cube melts 15-30%, my lesson):** 40% rye at 15% melt → 31.4% / 8.09 g, at 30% → 27.8% / 7.16 g, both in range; 43% rye at 15% → 33.6%, over, so a 43% bottle needs the full thirty-second stir. Stirred and strained, it reads OUT (6.48 g, no vermouth acid), which is why it's built. |
| **Pairings** | rye, sorghum, herbal bitters, orange | Sorghum: the *Flavor Matrix*'s Sugar Syrup entry (pdf 240) makes sorghum syrup like cane syrup, from juiced sorghum, boiled down (pdf 240; Oxford SORGHUM pdf 1834: pressed stalks, juice boiled into syrup; a grass of the same subfamily as sugar cane), and lists **grain** among the family's best pairings: rye is a grain. **The tie to her is my choice, not a fact about the syrup** (round 4, on Hester's D3 guard): I chose it with her words in mind ("With my Southern background, bourbon had to play a major role", *Proper* p. 238), so the reading may say the sorghum is my nod to the Southern background she talks about. It may never call sorghum syrup a Southern syrup (my knowledge, unsourced; Oxford's "southern United States" heartland, pdf 1834, is sorghum *spirit*), and never call it bitter (Oxford's "naturally bitter" is the grain). Underberg: on her page by name (p. 237); I name no flavour in the bottle (no source read about it: the family word is "herbal bitter"). Orange peel: the *Codex*'s Old-Fashioned twist (p. 5). **The *Matrix* surprises, consulted and set aside:** Grain's coconut (`nuts`), passion fruit (OUT on acid, built: the Craftsman's lesson) and clam (pdf 136); Sugar Syrup's garlic, fish and olive (pdf 240). So no surprise. The interest is a German herbal digestif bitters, from her page, used by the teaspoon where aromatic bitters usually go, and a pantry syrup darker than plain sugar, from the *Matrix*. |
| **Allergens** | `nuts`, provisional (`allergens.py`: contains ["nuts"], from Underberg only) | **Underberg is new to the table and I classed it `nuts` on the safe side:** its recipe is secret, I've read no botanical list, and a herbal bitters can carry nutmeg (the Bénédictine lesson, Oxford pdf 256). **Round 3: the row stands.** Hester found no botanical list in the library and her web budget is spent (r2), so the doubt can't be cleared, and in doubt it counts. The pour **isn't veto-free**, though the plan expected it to be (Robin: the Hero family loses one veto-free row; the story needs this bottle, and a substitute bitters would cut the drink off from her page). A note for Robin: if a published Underberg botanical list shows no nutmeg or nuts, the row can be reclassified and this pour becomes veto-free with no other change. No heat (baking spices don't count). Rye is a distilled grain spirit, not `gluten`. Sorghum syrup (new row, my call): the pressed juice of sorghum stalks, boiled down (Oxford SORGHUM pdf 1834); not malt, not the grain, no veto. Orange peel clean. |
| **Makeable** | basic kit; one recommended bottle | Glass, bar spoon, jigger or teaspoons. Underberg comes in small single-serve bottles (the size is unsourced, so the recipe gives the teaspoon, not a share of a bottle). Sorghum syrup is easy to find in the US South, harder elsewhere (my knowledge, unsourced): cane syrup is the substitute style. Numbers and vetoes proved for Underberg only; a substitute herbal digestif bitters must be read for nutmeg and nuts on its own label. |
| **Siblings and registry** | clear (shape reserved in the Hero plan) | Old-Fashioned · rye · small rocks glass, one cube. Not *The Alternative Comic*'s glass (300 ml, an ice shell) nor *Beside the First*'s coupe; no Peychaud's (Sazerac, *Beside the First*). The Saviour's rye is a highball. No maple (the Gangster's), no honey (*Off Duty*, *Any Day*). **Open item:** the *Red Hook* is a modern classic (rye, Punt e Mes, maraschino; Oxford RED HOOK pdf 1623; *Proper* p. 114), created at Milk & Honey (Lover's ground). Ours isn't it and claims nothing from it; if the reading names the neighbourhood, a cocktail-literate guest may think of it (Hester and Wren: owned in a clause, or left alone). **Guard:** Underberg is a digestif ("designed to aid digestion", *Joy* pdf 419): never in guest text (the family's medicine ground). |

## Image brief

- **Glass and drink:** a small, heavy rocks glass (about 200 ml) with one large, plain ice cube. The drink is clear and deep amber, a shade darker than whiskey alone (rye, plus dark sorghum syrup and a dark herbal bitters; the bitters' colour is my knowledge, unsourced). A strip of orange peel rests against the cube.
- **Props (the story in objects):** a bottle of rye half-wrapped in white tissue paper, the paper peeled back at the neck (the Red Hook Rye Boelte started to unwrap, *Proper* p. 238; anchors row "gesture"); an opened cardboard case of mismatched dark bottles, labels turned away (the "oddball cases of amaros", p. 238); a small jar of sorghum syrup with a spoon in it; through a window behind, a quiet street running out to the waterfront at dusk (the end of Van Brunt Street, p. 237). No Underberg wrapper: Hester r2, the paper isn't on the page.
- **One impossible detail:** the tissue paper on the rye is quietly folding itself back over the bottle, as if someone had just been told off for unwrapping it.
- **Must not appear:** ships, the sea, sailors, pirates or anything nautical (family ground); police, crates of contraband or anything from Prohibition; a till, cash or price tags; a second drink; any readable text or label.
- **Palette:** rum brown and amber (Pantone 4975 C), warm shop light against a dusk blue street.

**SCENE (ready to paste):** A small, heavy rocks glass holding one large plain ice cube and a clear, deep amber drink, a strip of orange peel resting against the ice, stands on a worn wooden shop counter. Beside it, a bottle of rye is half-wrapped in white tissue paper, the paper peeled back at the neck and quietly folding itself back over the bottle. Behind, an opened cardboard case holds mismatched dark bottles with their labels turned away, and a small jar of dark syrup has a spoon standing in it. Through the window, a quiet street runs out to the waterfront at dusk. Warm shop light, rum brown and amber, dusk blue outside.

## Names (round 4 vote: *No Promises*)

- **My vote: *No Promises*** (Wren's). What convinced me: the name recognises the person and the closing line turns it ("Then tell one person you'll be there, ahead of time"), which is my own rule from *Next One's Mine*. *Comes Good* praises, where *No Promises* is the thing they'd say themselves.

- ***Comes Good*** (my pick, held): the persona's own line, "they'll come good in the end", said as praise of the person. Sayable across a bar. Shares no word with the closing line or with any registry name's opening.
- I could take ***No Promises*** (Wren's): the core truth. It must not echo the tagline if the tagline uses "said".
- I could take ***Hard to Find*** (Hester's): her own phrase for why she stocked what she did (p. 238). It fits someone you can't pin down; read cold, it may sound like the person is distant.
- ***End of the Street***: the shop's spot on the page (p. 237) and where they always turn up. A little long.
- ***Found Anyway***: "people found LeNell's anyway" (p. 237), but *Anyway* is the Morale Booster's name: likely out.
