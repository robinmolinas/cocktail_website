# Tomás: working notes, creator-hero (The Visionary)

No sanctum yet: working from the seed templates (assets/) and references/.

## Round 2: first look at Hester's candidates (probes only, not the pour)

### Ramos Gin Fizz, the Codex classic (`mixologist-ramos-classic-probe.json`)
- Source spec: *Cocktail Codex*, "Ramos Gin Fizz" (Daiquiri family > sours with bubbles > fizzes): 2 oz gin, 1/2 oz lime, 1/2 oz lemon, 1 oz simple, 1 oz heavy cream, 1 egg white, 3 drops orange flower water, 2 oz seltzer. Dry shake, then shake with ice (Codex: 5 min is enough; the ten-minute shake is "more theater than necessary"). A puck of foam forms on top.
- `allergens.py`: `["egg-white", "dairy"]`. Allowed (the AD-4 floor is held by the three veto-free pours), but this would be the studio's first pour with a non-empty `contains`. Flag to Robin.
- Orange flower water: **not in ingredients.json**, so `allergens.py` stops (exit 2). It needs a human allergen decision before it can go in.
- `balance.py` (egg-white style, the closest available): OUT. Finished 8.6% ABV / 6.04 g sugar / 0.548% acid against 12.1-15.2 / 6.7-9.0 / 0.49-0.68. Cause: the studio has no fizz/long-drink style. The tool also counts the soda before dilution and models a 10 s shake, not a long one. Next step: look for a sourced fizz band in *Liquid Intelligence* (or judge against a Collins-type band) before calling it edge or out. Heavy cream value is unsourced.

### Last Word, equal parts (`mixologist-lastword-probe.json`)
- Veto-free. `balance.py` (shaken): OUT on initial sugar 15.4 (8.0-13.5) and initial acid 1.5 (1.2-1.4); edge on finished ABV 20.8 and sugar 9.56. It's a rich classic, so it would need justifying too.

Neither story wins or loses on numbers alone.

## Round 3: v1 = the Codex classic, unchanged (`_studio/specs/creator-hero.json`)

60 ml London dry gin, 15 lemon, 15 lime, 30 simple syrup, 30 heavy cream, 1 egg white (30 ml), 3 drops orange flower water; shake without ice, then shake hard with ice (Codex: five minutes is enough); strain into a tall glass with no ice; top slowly with 60 ml cold soda until the foam stands up. No garnish.

**Structure.** *Cocktail Codex* Daiquiri (sour) family, sours with bubbles, fizz subfamily. Core: gin. Balance: lemon + lime against simple syrup. Seasoning: orange flower water. Texture: egg white + cream. Lengthener: soda.

**Balance, in two stages** (the studio has no fizz range):
1. The shaken base, egg-white style (`mixologist-v1-base.json`): initial sugar 11.02 and acid 1.00 are in range, finished sugar 7.82 is in range, finished acid 0.71 is an edge (0.49-0.68). Strength is OUT: initial 15.7% (18-23), finished 11.1% (12.1-15.2). The whole gap is the 30 ml of cream. Take it out and the same base starts at 18.8%, inside Arnold's range. So this is an egg-white sour at Arnold's strength plus an ounce of cream, the drink's defining addition. That is my inference from the numbers, not Arnold's statement. The dilution OUT (40.9 against 46-49) follows from the low starting ABV, and the tool models a 10 s shake, not a five-minute one.
2. The soda top: about 9% ABV, 6.3 g sugar and 0.57% acid in ~314 ml. That's below every Arnold range, and it's a low-strength long drink by design. To be flagged as an edge and justified, not hidden. Judged as a whole-drink carbonated (`mixologist-v1-full-carbonated.json`), it's OUT on everything, which is the wrong frame: carbonated drinks aren't shaken.

**Allergens.** `["egg-white", "dairy"]`, plus orange flower water UNKNOWN, so allergens.py exits 2 on the spec. My position: don't cut it to close tonight; send it to Robin as a single allergen decision. Fallback if Robin says no: orange peel squeezed over the foam (already in the table, veto-free), which also covers the egg-white smell (Codex, egg-white section).

**Makeable.** Gin, two citrus fruits, sugar, cream, an egg, soda, and a bottle of orange flower water (a baking-aisle item). One shaker and a tall glass.
