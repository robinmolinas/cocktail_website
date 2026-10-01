# Tomás: drink draft, hero-explorer (The Quest Seeker), v1, round 5 (drink unchanged; Checks fixed per Hester H7-H8; image brief: no map)

Spec: `_studio/specs/hero-explorer.json` (v1). A hot toddy with a split core: stone-pine liqueur and aged rum, 3 to 1, with one teaspoon of allspice dram.

**Glassware:** heatproof glass mug with a handle (about 250 ml), warmed with hot water first
**Contains:** nuts

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | Zirbenz Stone Pine Liqueur of the Alps (recommended) | or any Alpine stone-pine liqueur (Zirbenlikör) of about 35%; made in Austria by Josef Hofer, a family distillery since 1797 |
| 15 ml | aged rum | any aged rum of 37.5 to 45% |
| 1 teaspoon (5 ml) | allspice dram (pimento dram) | |
| 7.5 ml | fresh lemon juice | |
| 1 teaspoon (5 ml) | demerara syrup | |
| 105 ml | hot water, just off the boil | |
| 1 strip | lemon peel | |

## Method

1. Fill the glass mug with hot water and leave it for a minute to warm, then tip the water out.
2. Pour in the stone-pine liqueur first, then the rum.
3. Add the teaspoon of allspice dram, the lemon juice and the demerara syrup.
4. Top with the hot water and stir a few times so it all comes together.
5. Squeeze the strip of lemon peel over the top of the mug so its oils fall on the drink, then drop it in. Drink it while it's hot.

**closingLine:** *Pine first, then a spoon of what came next. Then ask someone what they'd like you to find.*

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| **Structure** | Old-Fashioned (*Codex* root), hot toddy, split core | The *Codex* files the toddy as an Old-Fashioned with hot water for cold, at about 4 parts water to 2 of spirit (the style note in `balance.py`, from the *Codex*'s three toddies). Core: Zirbenz 45 ml split with aged rum 15 ml. The split is the importer's own pairing: "Combine with Scotch or aged rum for robust, complex toddies" (alpenz.com product page, fetched 2026-10-01; marketing, secondary). Scotch is already in four registry pours (*Serviceable*, *Standing By*, *For Kicks*, *A Brother's Care*), so the room has rum. Balance: the liqueur's own sugar, a teaspoon of demerara syrup and 7.5 ml lemon. Seasoning: a teaspoon of allspice dram and lemon oil. The pine is three quarters of the spirit, so the bottle he came back from Austria with is the drink, not a seasoning. |
| **Balance** | balanced (`balance.py`, style `hot`) | 182.5 ml, no dilution (hot water declared). **12.5% ABV (range 10–13), 6.15 g sugar/100 ml (5.5–7.5), 0.25% acid (0–0.3).** All in range. **Open item: Zirbenz's sugar is unsourced.** I found no published figure. 15 g/100 ml is my design value, with the EU's 100 g/L floor for any liqueur as the lower bound (Reg. (EU) 2019/787, my own knowledge, not checked here). One web page claims 120 g/L, but it also gives 38% ABV against the label's 35%, so I haven't used it. **Sweep (same formula):** with the 5 ml syrup, sugar stays in range for a liqueur of 12.5–20.5 g/100 ml (10 → 4.91, OUT; 25 → 8.61, OUT). Without the syrup, the range is 18.5–26.5 (15 → 4.57, OUT). So if the bottle's figure is found above about 20 g/100 ml, the syrup comes out. Both stops are proved. Strength holds across the substitutes: rum at 37.5% gives 12.3%, but at 46% it hits 13.0% (an edge), so the rum note says up to 45%. A stone-pine liqueur at 38% would give 13.3% (OUT), so the substitute note says "about 35%". Allspice dram swept 20–30% ABV and 15–40 g/100 ml: 12.5–12.7%, 5.87–6.56 g/100 ml, all in range. Its ABV and sugar are unsourced too, but at 5 ml they barely move anything. Lemon held at 7.5 ml because the hot band's acid ceiling is 0.3% (LI: acid sparingly in hot drinks). |
| **Pairings** | pine, aged rum, allspice, lemon | The importer gives pine with aged rum in a toddy (above). The importer's allspice dram page says it adds "a drying aromatic" to "toddy-style drinks" (alpenz.com/product-allspice.html, fetched 2026-10-01; marketing). Lemon and pine are my craft call. Zirbenz's own profile is "berry fruit over an intricate, pine-floral backbone, with a slight minty freshness" (importer). **The *Flavor Matrix* has no pine entry.** I consulted it: only pine nut and pineapple come up, so I set it aside. **The spark is from the story instead:** the teaspoon of allspice dram is the kind of bottle Seed might "pull from his bag" (*Proper* p. 240 gives it as an example; Hester F11, H5). So the first find and a later one are in the same glass, which is what Wren's story turns on. Its folk-remedy origin (Oxford PIMENTO DRAM pdf 1513) stays out of the guest text (Hester: medicine is off limits for this family). |
| **Allergens** | **nuts** (`allergens.py`: contains ["nuts"] ← Zirbenz) | Zirbenz is made by steeping the young whole cones of the Arolla stone pine (importer's 2026 catalogue; *PUNCH* 2015; Hester F15). The traditional method cuts the cones into 3–5 mm slices and steeps them for five or six weeks (de.wikipedia, tertiary). The cones hold the seeds, which are sold as pine nuts (en.wikipedia *Pinus cembra*, tertiary). So pine nuts are in the steep, and STUDIO-RULES 4 lists pine nuts under `nuts`. This is our inference from the method; the maker gives no allergen statement (Hester G12). Every stone-pine liqueur is made the same way, so no substitute clears it. **This pour leaves the veto-free floor**, as the family plan budgeted (nine Hero rows can still be veto-free). Allspice dram: allspice berries extracted with high-proof spirit, "most often rum", plus sugar and lime juice (Oxford pdf 1513). It tastes "reminiscent of" nutmeg but contains none, and allspice is a baking spice, not heat, so it's clean. Both rows were added to the table this round (`add_ingredient.py`, by Tomás). Aged rum, demerara syrup, lemon and water are clean. |
| **Makeable** | basic kit; one particular bottle | A kettle, a jigger and a teaspoon. Zirbenz is listed in the importer's 2026 catalogue (Hester F16), so it's still imported as of October 2026, in 750 ml and 375 ml bottles. The half bottle helps. Allspice dram is a style that more than one maker sells (unsourced). I declined Hester's option to name St. Elizabeth (H5): the reading says "the kind of bottle", one teaspoon doesn't need a brand, and a second bottle from the same importer would make the glass read like his catalogue. The numbers and the veto are proved for Zirbenz itself; for a substitute stone-pine liqueur, the strength floor and ceiling are above. |
| **Siblings and registry** | clear | Old-Fashioned (hot) · stone-pine liqueur · glass mug is on no registry row. The family has no other hot drink (*Next One's Mine* is a tall rye highball, *The Long Answer* a long bourbon sour in a beer glass, *Anyone Would Have* a gin sling on the rocks). Against *Off Duty* (the hot Irish whiskey toddy): no honey, no herb, no timed steep, and nobody makes it for the guest. You make it yourself, after you're back. Against *Hoping You'd Come* (cold cognac and apple): different temperature, base and glass. Hester's G13 is kept: the toddy is the importer's suggestion and ours, never "the way he sold it". |

## Image brief

- **Glass and drink:** a heatproof clear glass mug with a handle, steam rising. The drink is clear and warm, with an earthy red cast. That colour is from the bottle: the importer says Zirbenz takes its "natural earthy red colors" from the fruit. Read it as red-amber once the water lightens it and the rum deepens it (the mixed colour is my estimate). A strip of lemon peel rests inside.
- **Props (the story in objects):** a single young stone-pine cone, reddish-purple and still whole, lying on the table (the fruit that's picked fresh, per the importer). A worn canvas shoulder bag, its flap half open, with the neck of one small unlabelled bottle just showing (the kind of bottle he might "pull from his bag", *Proper* p. 240). A pair of wool mittens drying beside the mug (after skiing: "sold as an après ski tradition", *Proper* p. 240).
- **One impossible detail:** the steam from the mug traces the line of a mountain ridge, and the ridge goes on past the edge of the frame.
- **Must not appear:** a fedora, a whip, snakes, any map or chart of any kind (Hester's caution: the name carries the map, the image never does), temples or relics, loose pine nuts, a medicine bottle or anything medical, a trophy or medal, skis worn heroically on a summit, any brand label or text, a second drink.
- **Palette:** pine green and earthy red, warm wood, wool grey, and Pantone 124 C gold kept to the light.

**SCENE (ready to paste):** A clear heatproof glass mug with a handle stands on a warm wooden table, full of a hot, clear drink with an earthy red cast, steam rising from it, a strip of lemon peel resting inside. Beside it lies a single young stone-pine cone, reddish-purple and whole. A worn canvas shoulder bag sits nearby with its flap half open, the neck of one small unlabelled bottle just showing. A pair of grey wool mittens dry by the mug. The steam above the mug traces the line of a mountain ridge that runs on past the edge of the frame. Pine green and earthy red, warm wood, golden light.

## Names

- **Round 4: *Someone Else's Map* is the room's pick (Wren's), with *What's Next* second. Both go to Robin.** What moved me: the reading already says "next" six times, so *What's Next* would spend the reading's word a seventh time, and any Pioneer could say it. *Someone Else's Map* names the turn only this person takes: a friend's wish becomes the next quest, so the map never runs out. **My caution, on record for Robin:** read cold, "someone else's map" can sound like following another person's route, which is this person's fear of being led. The tagline and the reading turn it round, but the name is read first.
- ***What's Next*** (my round-3 pick): the question they hide on the evening they arrive. A strong order across a bar, but generic.
- ***Sixty Cases*** (Wren's): the epigraph's number. Concrete, but it names the story, not the person, and it repeats the epigraph.
- ***The Next Find***: Seed's method. Another "next".
- ***Treeline***: where the cones are picked. The bottle's place, not the person's.
- *Not Finished* / *Not Done Yet*: set aside, because two registry names already open with "Not".

**Closing line, round 4:** I took Wren's change. "The spoon from the bag" claimed this spoon came out of Seed's own bag, and it never does. "A spoon of what came next" is true every time it's made. The second sentence asks for a wish, not an opinion, so it stays clear of *The Long Answer*.
