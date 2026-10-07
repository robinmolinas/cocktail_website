# Fact audit r4 (round 4, step 2): jester-innocent (The Naïf)

Hester, 2026-10-04. Audited as they stand: `psychologist-reading-v2.md`, `mixologist-draft.md` (drink v2), `_studio/specs/jester-innocent.json` (v2). Card: `fact-cards/green-swizzle-wodehouse.md`. r3 fixes H1–H10: all landed (checked in the file). Wren's own variants of them (H1 at 16 words, H7 "For years", "nobody needs to pretend") all pass. Anchors were brought into line in the same call (spark row and wormwood row, to v2).

## Strongest point: the drinks crossed

**y4 describes the withdrawn v1 drink.** Wren wrote y4 against draft v1 while Tomás took out the home wormwood steep. y4 still says "wormwood bitters you steep at home". Its reason then fails for v2 as well: Oxford says steeped wormwood is extremely bitter, but **distilled, as in absinthe, the bitter compounds stay behind** (WORMWOOD pdf 2212). So "Wormwood is about as bitter as anything gets, so I steep it with tangerine peel" isn't true of the absinthe. "About as bitter as anything gets" also outruns "extremely bitter".

## Fixes (old → new)

| ID | File | Old → new | Why |
| --- | --- | --- | --- |
| J1 | reading y4 | "The green comes from wormwood bitters you steep at home for two days. Wormwood is about as bitter as anything gets, so I steep it with tangerine peel, a travel writer's tip passed on by a drinks historian, and I put that in for you: the bright thing that turns up in the middle of something grim." → "The green comes from a barspoon of green absinthe, a spirit made with wormwood, that I steep with tangerine peel for two days. The tangerine is a travel writer's tip for the old wormwood bitters, passed on by a drinks historian; I borrowed it for the absinthe, and I put it in for you: the bright thing that turns up in the middle of something grim." | Drink v2 (draft method step 1). Absinthe made with wormwood: Oxford pdf 48. The tip was for the *bitters* (*Imbibe!* pdf 125), and putting it in absinthe is Tomás's. "Grim" stays as your metaphor, with no bitterness claim behind it. |
| J2 | reading y4 | "rebuilt from the listed parts of an old Trinidad bottled base nobody makes any more: white rum, fresh lime and sugar." → "rebuilt from the parts listed for an old Trinidad bottled base, discontinued decades ago. Mine are white rum, fresh lime and sugar." | **The colon hands our recipe to the bottle.** Carypton's listed parts are "rum, lime juice, sugar" and West Indian herbs (Oxford pdf 112). "White" and "fresh" are ours. "Nobody makes any more" is an absence claim; the page says only that Angostura "discontinued it decades ago" (*Imbibe!* pdf 124). |
| J3 | reading y4 | "You give it your whole attention for half a minute" → "You give it your whole attention for about half a minute" | Method step 5: "about 20 to 30 seconds". |
| J4 | reading Notes | "'about as bitter as anything gets' is my plain-words rendering of Oxford's 'extremely bitter' (pdf 2212), for Hester" → delete. And "'gets gentler as you go' = Tomás's melt sweep (16.3% → 12.6–14.8%)" → "(v2: 16.5% → 15.0–12.7% from 70% to 100% melt)". And "two days, tangerine peel, barspoon = method step 1" → "…= method step 1 (v2: green absinthe, not a home wormwood steep)". | The Notes keep dropped claims (my pitfall). Numbers per draft v2's Balance row. |
| J5 | draft, intro paragraph | "steeped with tangerine peel, a 1937 tip he credits to Eleanor Early." → "steeped with tangerine peel: my adaptation of a 1937 tip for the bitters that he credits to Eleanor Early." | Scope: the tip was for the wormwood bitters (pdf 125). The Pairings row already says this; the intro didn't. |
| J6 | spec `subfamily` | "steeped with tangerine peel (Early's 1937 tip, via Wondrich)" → "steeped with tangerine peel (our adaptation of Early's 1937 tip for the bitters, via Wondrich)" | Same as J5. Notes in the JSON count. |
| J7 | draft, method step 1 | "100 ml green absinthe (the more bitter, wormwood-forward kind)" → "100 ml green absinthe (the wormwood-forward kind)" | "More bitter" is unsourced, and Oxford says distillation leaves the bitter compounds behind (pdf 2212). Wondrich's word is "wormwood-forward" (pdf 125). |
| J8 | draft, Checks › Structure | "a barspoon of tangerine absinthe (the green and the bitter herb)" → "a barspoon of tangerine absinthe (the green and the wormwood)" | Same reason as J7. |

## Passed (checked on the page)

- **Epigraph** "A Green Swizzle, Wembley, 1924. In a story, Bertie Wooster vowed to name a son after it.": it names the ancestor, owns the fiction, and paraphrases the vow (C2). The first printing is 1924 (Oxford pdf 756). Passes. The fallback passes too.
- **y1–y3** as landed: H3 (stare, then the waggled eyebrow, ll. 714–716, 756), H4, H5, H6 (l. 954, before l. 958), H7, H8, H9. Pass. Both "he"s are Bertie: fine.
- **y4, the rest:** "a Caribbean classic" (Oxford pdf 945, "a traditional Caribbean drink"); "the stick does the stirring … the glass tells you when to stop" (Oxford pdf 1963, swizzle until frosted; the frost word stays out); "tall, pale" (*Imbibe!* pdf 125); "four dashes of Angostura on top" (spec); "gets gentler as you go" (melt sweep). No "Carypton's recipe", no Bertie's glass, no island, no health words. All pass.
- **y5** and **whoYouAre:** no historical claims beyond "on the tour" (ll. 909–931). Pass.
- **Draft, checked on the page:** Carypton's parts (Oxford pdf 112); "discontinued it decades ago" (*Imbibe!* pdf 124); "a flavorful white one" and Wray & Nephew "probably going too far" (pdf 124); absinthe's chlorophyll green and fennel, and its use "in small amounts … much like bitters" (Oxford pdf 50); the thujone lines (pdf 50); Codex p. 134 (Collins glass, four-fifths crushed ice, swizzle, pack and mound: a Mojito page, applied by analogy, fine); the 1912 "green shading … dark red" (*Imbibe!* pdf 124); Amphlett's 1873 stick, "a long stem with four or five short prongs … at the bottom" (*Imbibe!* pdf 123); "tall, pale, and frosty" and "a long, slow sipper" (pdf 125); the Queen's Park Swizzle's mint (Oxford pdf 1590). All pass.
- **Closing line** "Spin the stick between your palms until the glass goes white. Then go back for whatever you were hurried past.": it matches method step 5 (palms, frost). Passes.
- **Safety:** with no wormwood steep, every wormwood ingredient in the glass is distilled. The dose is exact ("one barspoon, no more"). There are no health words. My r3 gap for Robin is closed by the removal; it stays in the dossier as the reason.
- **Image brief:** no Wembley, no people, no window or police, no medicine imagery. "Pale with a faint green cast" fits a barspoon in 175 ml. Passes.

## If J1–J8 land exactly as quoted
I'd put my name to this.
