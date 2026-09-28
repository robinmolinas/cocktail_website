# Tomás, creator-jester (The Surrealist): working notes

## Round 1
- Direction: Dalí's own drink. *Les Dîners de Gala* (1973) has a "Casanova" cocktail. FROM MEMORY, UNVERIFIED: orange juice, Campari, ginger, brandy, an herbal liqueur (Vieille Cure?), a pinch of cayenne. Not in any of our books (library search: no Dalí hits except Regan's "Passion of Dalí", Joy pdf 360-361, a Rob Roy riff by Trykowski, too close to A Brother's Care). Needs Hester.
- v0a (45 cognac / 15 Bénédictine / 15 Campari / 30 orange / 15 lemon): OUT on acid (0.62 finished). Orange at 0.8% acid can't carry a sour.
- v0c (50 / 10 / 15 / 25 orange / 20 lemon): balanced with edges, 15.4% / 5.17 g / 0.77%; initial sugar 7.89 and acid 1.17 on the edge. Contains: spice (the cayenne). Campari's bitterness is loud and balance.py can't hear it (Trinidad lesson), so v1 wants the sugar higher.
- Honey syrup tries (v0d): extra juice/syrup thins it below 15%; not the way.
- Matrix support: honey x capsicum is a listed surprising pairing (pdf 148); capsicum best pairings include citrus and aromatic spices (pdf 68).
- Bénédictine stands in for the herbal liqueur; ginger isn't in the table yet (add if the direction holds).

## Round 1, after reading Wren's persona card
- Wren: "the Flavor Matrix pairing *is* the person", delicious first, strange second, no gimmick (colour change ruled out, I agree), Dalí never a mirror. So the Casanova is parked as a lead for Hester only.
- **v1 (my proposal): the tomato daiquiri.** 60 white rum / 22.5 lime / 20 cherry-tomato-and-vanilla syrup, shaken, coupe. `mixologist-v1-tomato.json`. Balanced, every line ok: 23.4% / 12.82 g / 1.37% initial; 15.4% / 8.41 g / 0.90% finished; dilution 52.5%. Veto-free (`--check ""` matches).
- The spark (Matrix): vanilla's surprise pairing is tomato (pdf 245); in the tomato entry, strawberries are the listed substitute (pdf 244). So: the most ordinary sweet drink there is, the strawberry daiquiri, with the strawberry swapped for the thing that shares its place. Tomato's other surprise pairings: tea, coconut, passion fruit, cardamom, berries (pdf 244).
- Why a syrup, not juice: Codex p. 218 (Tarby) says fresh tomato juice is thin and separates from booze; my juice versions ran OUT (12% finished, acid low, dilution 43-47%). The syrup: ripe cherry tomatoes crushed with their weight in sugar and a split vanilla pod, overnight in the fridge, strained. Household kit.
- New rows (my call, all contains none): `cherry_tomato` (unsourced standard value), `vanilla_syrup`, `tomato_vanilla_syrup` (derived).
- White rum is new to the set (aged rum 1; gin 3).
- Open: tomato values are unsourced standard values; look for a source. Salt pinch? (tomato + salt is natural; Half a Rim owns salt, avoid.)

## Round 2 (Hester's A: the Knickebein)
- Engel 1878 as Oxford gives it (15 ml each curaçao / noyaux / maraschino, yolk, whipped white, Angostura drops): `mixologist-engel-1878.json`, freeform. Everything mixed (the last swallow): 16.7% ABV, 15.6 g sugar/100 ml, **0 acid**, no ice, no dilution. The first third is the liqueurs alone: ~34% ABV, ~32 g sugar/100 ml, a straight liqueur. Flip finished range for comparison: 12.1-15.2% / 6.7-9.0 g / 0.49-0.68%. Contains egg-white (yolk and white) + nuts (noyaux, maraschino).
- Rows added (my call): `creme_de_noyaux` (nuts, unsourced), `egg_yolk` (egg-white on the safe side, unsourced).
- The physics I like: the last swallow makes the flip in the mouth. The copyists did in the shaker what the drinker was meant to do at the end, which is why Oxford's "keeps the flavours, loses the idea" is literally true.
- Riff lever: Oxford only requires the layer under the yolk to be denser than ~1.025 g/ml. A pre-diluted sour base (lime + syrup + cold water) is ~1.07-1.09 by my rough estimate (1 + 0.385 x sugar g/ml), so the yolk floats on it; a lighter spirit layer (~0.95-0.96, even pre-diluted to ~30%) sits on top of the yolk. The yolk hangs mid-glass, and by the last swallow it's a balanced flip.
- Sketch (freeform, all mixed): 45 white rum / 20 lime / 20 tomato-vanilla syrup / 30 cold water / 1 yolk -> 13.6% / 9.99 g / 0.95%. Needs tuning toward the flip band (sugar and acid a bit high). Matrix chain: egg's surprise pairing is vanilla (pdf 108), vanilla's is tomato (pdf 245). Thomas's 1862 Pousse l'Amour had vanilla cordial round a yolk (Hester F10).
- Food safety: raw yolk and white -> Checks line (fresh eggs, pasteurised if in doubt).

## Round 3
- Knickebein off (Wren: stage directions = control/performance; a raw yolk bursting, read cold, is a dare. Hester withdrew). I concede: the yolk riff needed the instructions to work, and the instructions are the problem.
- Where the glass lands: the tomato daiquiri, v1 unchanged, now in `_studio/specs/creator-jester.json`. 15.4% / 8.41 g / 0.90%, all ok, veto-free.
- Story: I back Wren's tomato history (Nix v. Hedden, 1893, if Hester can source it), because it's the only story that's *in* the glass: the court filed the tomato as a vegetable, and this drink uses it as the fruit. The Black Velvet (champagne + stout) would need its own glass; a Velvet story next to a tomato daiquiri doesn't ride in the drink (Creed: story in the glass). Casanova: dropped (secondary source, and Dalí stays out).

## Round 4
- All three on the tomato (Hester sourced Nix v. Hedden; Wren came across). Full draft: `mixologist-draft.md` (recipe, syrup, method, 3 closing lines, Checks, 4 names + pick, image brief).
- Find: the Codex's Blended Strawberry Syrup (p. 47: equal weights fruit + sugar, blended cold, sieved; heat makes strawberries taste artificial) is now our syrup method, with tomatoes in the strawberry's place. Shelf life p. 46.
- Caught myself: vanilla entry is Matrix **pdf 256**, not 245 (rounds 1-3). Fixed in spec, draft. Tomato pdf 244 was right.
- Matrix pdf 55: strawberry "ketchup" on a burger, the same swap the other way round.
- Spec v1.1: garnish cherry_tomato_whole (new garnish row). Balanced all ok; veto-free; tests 0 failures.

## Round 5
- Wren's reading v1: name The Other Berry; tagline "You don't make things strange. You notice they already are."; epigraph "Made like a strawberry daiquiri. There isn't a strawberry in it."; closing line = my alternative "Tell them it's tomato before they taste it." Conceded "Serve it for dessert" (already her guess in yours 3).
- Drink paragraph (yours 4) vs the glass: syrup blended cold with sugar + vanilla ✓; "surprisingly go well together" = Matrix surprise pairing (pdf 256) ✓; "ripe red fruit and vanilla first" ✓; "no trick" ✓. One ask: "takes a strawberry daiquiri (rum, lime and a fruit syrup, shaken)" defines the strawberry daiquiri as our build; the famous one is often blended with whole strawberries. Our "made like" rests on the Codex's strawberry syrup (p. 47). Fix: "takes the shape of a strawberry daiquiri".
- Draft updated: closing line settled, name pick recorded.

## Round 7
- Provisional checked against my draft: all carried as written. Lint 0 errors. Numbers re-run: 15.4 / 8.41 / 0.90, veto-free. Dossier nits sent to host (see turn). Signed off.
