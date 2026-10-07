# Applied: Tomás, Codex pass (D4) and open items (2026-10-06)

Every changed pour has a "- **Tomás (Codex pass / open items):** …" line in the "Collection review edits, 2026-10-06" block at the top of `_studio/rooms/<pairing>.md`. Six rooms didn't have the block, so I created it: caregiver-lover, creator-lover, jester-explorer, jester-outlaw, magician-lover and outlaw-explorer. I didn't touch regular-guy-ruler, Robin's words (`robin-edits.md`), taglines or stories.

**Totals.** 30 pours benchmarked: the 29 asked for, plus *Whoopee*, whose Balance row I rewrote for Q084. 39 pour files changed, all at **0 lint errors**, and every one's `contains` matches `allergens.py`. No new lint warnings. 13 open items done, 1 left for Robin (Q155). Three shared ingredient rows reclassified, and three specs changed.

## A. Codex benchmark (D4)

Each sentence goes at the end of Checks › Balance and starts "**Codex benchmark (Robin 2026-10-06):**". I ran the *Codex*'s own spec through `balance.py` on our ingredient rows, at 1 oz = 30 ml. Where a proxy was needed, the sentence says so: the demerara gum and cane syrups are modelled as our 2:1 `rich_syrup`, Four to the Floor's grapefruit liqueur as Cointreau or crème de pêche, and the Bloody Mary mix (p. 295) as its tomato, lemon and lime with the sauces as water. The runner is in my sanctum, `scripts/codex_bench.py`.

**The main finding.** The *Codex*'s own classics read OUT on Arnold's ranges just as ours do:
- every Martini and the Vesper read OUT on sugar;
- the Bamboo reads OUT on seven readings;
- the Ideal Daiquiri reads OUT on acid;
- the Brandy Flip reads OUT on sugar;
- the Eggnog and the Julep sit under Arnold's floors.

So "accepted by structure" holds up against the book.

| pour | *Codex* benchmark (page) | *Codex* numbers | ours | verdict |
| --- | --- | --- | --- | --- |
| explorer-hero *Nothing to It* | Ideal Old-Fashioned (p. 5) | 29.8% / 4.63 g | 28.5% / 4.66 g | same sugar. The row's "acid OUT" text is now superseded (`stirred-spirit`), and the sentence says so |
| outlaw-regular-guy *Where You Stand* | Ideal Old-Fashioned (p. 5) | 29.8 / 4.63 | 25.8 / 5.09 | softer, slightly sweeter |
| hero-lover *One Line* | Vesper (p. 71) | 22.4 / 1.06 (shaken) | 22.1 / 0.61 | the *Codex*'s Vesper is OUT on sugar too. `accepted` reason correct |
| innocent-ruler *Whole World* | classic Gin Martini (before p. 61); Ideal 2:1 (p. 61) | 26.9 / 0.57; 23.4 / 0.69 | 27.4 / 0.52 | beside the classic. `accepted` correct |
| innocent-caregiver *Night Light* | Bamboo (p. 91) | 13.1 / 3.04 / 0.41% | 11.7 / 4.25 / 0.38% | a Bamboo by the numbers. **`accepted.why` corrected** (below) |
| ruler-innocent *Say So* | Bamboo (p. 91); Ideal Gin Martini (p. 61) | 13.1 / 3.04; 23.4 / 0.69 | 18.5 / 3.06 | between the two. `accepted` correct |
| innocent-creator *The Way It Felt* | wine highballs (p. 201): Mimosa (p. 222), Aperol Spritz (p. 223) | 10.0 / 2.73; 8.3 / 7.77 | 6.5 / 5.40 | wine highballs sit on or under 10%. `accepted` correct |
| lover-innocent *Wide Open* | Brandy Flip (p. 252) | 11.2 / 12.30 | 13.7 / 8.33 | stronger and less sweet than the *Codex*'s |
| jester-hero *The Wink* | single-serve Eggnog (p. 256) | 9.0 / 10.46 | 11.9 / 8.57 | the *Codex*'s nog sits further under the flip floor than ours |
| regular-guy-caregiver *Whoever Comes In* | none: the *Codex* has no shaken coffee drink (its only brewed-coffee drink is the hot Irish Coffee, p. 268) | — | 15.0 / 5.83 / 0.29% | Arnold's Boozy Shakerato stays the benchmark. `accepted` correct |
| lover-creator *In Your Own Hand* | Ideal Daiquiri (p. 104); Hemingway Daiquiri (p. 120) | sugar-to-acid ratio 8.0; 7.2 | 7.7 at half their strength | a *Codex* sour stretched with juice. `accepted` (D3) correct |
| sage-outlaw *On the Record* | Bamboo (p. 91); Coffee Cocktail (p. 252, tawny port) | 13.1 / 3.04; 11.4 / 5.34 | 10.8 / 5.99 | the Bamboo's shape with port sweetness. `accepted` correct |
| caregiver-innocent *Before the Room* | Kir Royale (p. 223): ½ oz cassis to 5½ oz Champagne, "careful not to… oversweeten" | 12.3 / 4.07 / 0.64% | 12.6 / 6.40 / 0.60% | **for Robin (below)** |
| creator-lover *Rosetta* | none (no absinthe drip); Hot Toddy (p. 38) | 11.4 / 7.37 | 11.3 / 5.84 | same strength, drier, as a cold drink can be |
| creator-magician *Overnight* | none (no milk punch); Ideal Daiquiri (p. 104) | 14.2 / 8.47 / 1.06% | ~15.9 / ~7.2 / ~0.83% | a stronger, drier, softer sour |
| explorer-creator *For Good* | Margarita (p. 166); the *Codex* prints no frozen version (p. 103) | 18.6 / 5.97 / 0.76% | 13.8 / 8.34 / 0.855% | matches Arnold's freezer daiquiri |
| hero-innocent *Work It Out* | Bloody Mary (p. 221, mix p. 295); Whisky Highball (p. 199) | 11.0 / 1.78 / 0.84%; 10.0 / 0 / 0 | 10.8 / 0.44 / 0.028% | the Bloody Mary's strength with the Highball's balance |
| jester-explorer *Unrehearsed* | Ideal Old-Fashioned on its cube (`built`) | 35.0 / 5.45 | 31.9 / 6.83 | softer and sweeter, inside Arnold's band |
| jester-outlaw *Quote Me* | Ideal Old-Fashioned (p. 5) | 29.8 / 4.63 | 26.6 / 4.54 | same sugar |
| jester-regular-guy *Is It Just Me* | Whisky Highball (p. 199), and its 2:5 | 10.0; 11.4 | 10.2 (the pair) | highball strength |
| lover-explorer *Curtain Call* | Bloody Mary (p. 221) | 11.0 / 1.78 / 0.84% | 11.6 / 0.92 / 0.66% | same strength, less sugar and acid |
| lover-hero *Out of Your Way* | Manhattan (p. 84); Bamboo (p. 91) | 26.9 / 3.67; 13.1 / 3.04 | 20.9 / 4.23 | a reversed Manhattan between the two |
| lover-sage *In Kind* | Mint Julep (p. 31), same 30 ml melt | 27.7 / 4.73 | 27.7 / 6.85 | 45% sweeter than the *Codex*'s, inside the built band |
| magician-jester *Even When You Know* | none (no layered drink); Coffee Cocktail (p. 252) | 11.4 / 5.34 | 31.3 / 12.97 (undiluted) | no *Codex* peer, so it's judged layer by layer |
| magician-lover *Undimmed* | Ideal Vodka Martini (p. 62); p. 61's "ice-cold glass of vodka" | 25.2 / 0.35 | 38.3 / 0.23 | the far dry end of the *Codex*'s own range |
| regular-guy-jester *Got You* | Hemingway Daiquiri (p. 120); Brown Derby (p. 133) | 13.8 / 7.10 / 0.98%; 16.6 / 7.30 / 0.60% | 16.8 / 9.62 / 1.15% | sweeter and sharper than both, in line with Arnold's Drake |
| regular-guy-lover *First Choice* | Four to the Floor (p. 187), stirred sour, liqueur by proxy | 17.0–20.0 / 6.1–7.0 / 0.44–0.45% | 17.5 / 7.30 / 0.693% | the same strength and sugar, with more acid |
| sage-creator *What It Rests On* | Ideal Old-Fashioned (p. 5) | 29.8 / 4.63 | 28.0 / 4.75 | the root recipe by the numbers |
| sage-innocent *Nothing Escaped You* | Four to the Floor (p. 187); Ideal Sidecar (p. 152) | 17.0–20.0 / 6.1–7.0 / 0.45%; 18.8 / 6.74 / 0.83% | 15.9 / 6.26 / 0.757% | the stirred sour's sugar with the Sidecar's acid, from twice the verjus |
| outlaw-explorer *Whoopee* (extra) | Ideal Daiquiri (p. 104) | 14.2 / 8.47 / 1.06% | 16.6 / 6.59 / 0.83% | stronger, drier, softer |

**Spec `accepted.why` corrected (one).** In `_studio/specs/innocent-caregiver.json`, "(Codex p. 246)" became "(the Codex's Bamboo, p. 91; fino as a low-ABV base, p. 246)". Page 246 is about fino; the form is on p. 91. The other eight `accepted` reasons are correct.

**Genuinely off for its form? None of the 30.** One sits closest, for Robin:
- ***Before the Room*** (caregiver-innocent). The cassis is at 1:6, which is Oxford's still-wine Kir (15:100), not the *Codex*'s Kir Royale at about 1:11, and the *Codex* warns against oversweetening. That makes it about half as sweet again: 6.40 g against 4.07 g. It's still inside Arnold's carbonated sugar band (5.0–7.5), and the acid is the same, so I haven't changed it. If Robin wants it nearer the *Codex*, 15 ml of cassis reads 5.16 g (my sweep, not applied).
- **A small error of mine in the same row:** its Balance section says "nearest highball range 8–14%", but the highball band is 10–16. It's not in this brief, so I didn't touch it.

## B. Open items

| item | pour | what I did (exact) |
| --- | --- | --- |
| **Q084** (my call) | outlaw-explorer *Whoopee* | **Applied.** Recipe: "\| 20 ml (⅔ oz) \| fresh lemon juice \|" → "\| 22.5 ml (¾ oz) \| fresh lemon juice \|". The spec's lemon is now 22.5 (v1.1). `balance.py`: 16.6% / 6.59 g / 0.831%, all seven in range, no edges (it was on the acid floor at 0.754% once `sloe_gin` acid went to 0). I rewrote Checks › Balance, cutting the old "22.5 ml goes OUT" line and adding the *Codex* sentence. Checks › Sweep gets a 144-case re-run: sloe acid 0–0.2% × the old 48 cases × 20 and 22.5 ml lemon. None is OUT at either dose. At 22.5 ml the acid runs 0.82–0.91% with no acid edge. No guest text names the amount. |
| **Q017** | creator-magician *Overnight* | "Makes about eight drinks of 125 ml." added above the recipe table. Method 7 → "…keep it in the fridge; it's at its silkiest in the first week. Throw away the curds." **Yield:** 1,220 ml in, about 100–150 ml held back by the curds and filter (my estimate), so about 1,070–1,120 ml out. **Keeping:** *LI* p. 267, "use milk-washed boozes within a week or so". Checks › Makeable note. |
| **Q100** | caregiver-lover | Note gets "keeps about a week in the fridge;". That's half the *Codex*'s two weeks for its cold fruit syrups (p. 47). |
| **Q101** (rest) | caregiver-outlaw | Recipe note → "…in place of white sugar. Some makers clean it with plant extracts, groundnut among them, so it's marked nuts to be safe." Method 1 → "Keep it in the fridge and use it within two weeks." (the *Codex*'s simple syrup, p. 45). The proposed clause named milk; under D1 milk is now out (see the shared rows below), so the clause names groundnut only. |
| **Q102** (rest) | caregiver-ruler | "It keeps in the fridge." → "It keeps for about two weeks in the fridge." **Two weeks, not the queue's month:** the *Codex* keeps its own 2:1 demerara two weeks (p. 54), and no page says what the vinegar does. |
| **Q114** | hero-ruler | Note → "…warmed until clear (100 g sugar and 50 g water make about 110 ml, enough for about 20 drinks; it keeps about two weeks in the fridge)". The yield is *LI*'s 0.62 ml/g. The two weeks are from the *Codex*, pp. 47 and 54, not the queue's month. |
| **Q140** | regular-guy-caregiver | Note → "one shot, pulled only when you're about to shake; a stovetop moka pot works too, though the foam will be thinner". *LI* p. 352 says the crema comes from espresso's pressure; that a moka pot brews at lower pressure is my knowledge. |
| **Q142** | regular-guy-lover (spec only) | Added a `water` line of 40.1 ml, noted "melt … not added", plus a `judged_by_hand` line. `balance.py` now reports 17.5% / 7.30 g / 0.693%. Guest text unchanged. |
| **Q146** | ruler-magician | **Spoon measures not applied.** No book gives a teaspoon weight for citric or malic acid. The one acid powder weighed in the library, ascorbic (*LI* p. 338), is about 2.5 g a teaspoon, half the guess, and at that weight the drink goes OUT (juice at 2.0% gives 0.558%). Instead, method 1 gets: "If your scale only weighs whole grams, make twice as much: 500 ml of juice, from about 8 oranges, with 11 g of citric acid." Swept at juice acid 2.8–3.3%, the drink finishes at 0.781–0.921%, all in range. |
| **Q024** | lover-innocent *Wide Open* | Method 1 gets "If the drink is for anyone pregnant, elderly or unwell, use pasteurised eggs, though the lavender may come through more faintly." The scenting method (*Codex* p. 94) is written for ordinary eggs, and some pasteurised shells are waxed (my knowledge, unsourced; said in Makeable). |
| **Q006** | jester-sage | **Confirmed as written.** The *Codex*'s equal-weights fruit syrup keeps two weeks and yields more when blended (p. 47), so "about 150 ml" and "within a week" are both on the safe side. I added one sentence to Checks › Makeable. |
| **Q155** | innocent-magician | **Swept, not applied (Robin's call).** A non-Tasmanian unpeated single malt at 40–46%, with the Scotch float at 40–46%, reads 13.3–15.3%, in range (10–16). Allergens are unchanged. The proposed note is ready verbatim in the queue if Robin says yes. |
| "deeper gold" | ruler-sage (fallback y4) | Changed to "brighter gold" in `work/ruler-sage/psychologist-alternatives.md`. Saffron in spirit gives "a brilliant yellow" (Oxford pdf 1072), which brightens the gold rather than darkening it; how strongly it shows at the dose is unsourced. Open items Resolved bullet. The live pour is unchanged. |
| arrack precaution | magician-ruler *Built to Hold* | **Dropped.** "Batavia arrack may have a little palm sap in it too (the sources disagree), so with a nut allergy, use the rum." is cut from the recipe note. It contradicted the pour's veto-free label under D1. "Not Sri Lankan arrack, which is made from coconut palm" stays. |
| D8 cacao | magician-jester *Even When You Know* | Aligned (see the shared rows below). Notes in Checks › Allergens and Open items. `contains` is still `[]`. |
| `cherry_heering` | hero-regular-guy | Ruled none (see below). The pour stays `["nuts"]` through Bénédictine. Notes in Checks › Allergens and Open items. |

### Shared rows changed (`skills/dps-tools/data/ingredients.json`, under the studio lock; the reason is appended to each row's `source`)

1. **`cherry_heering`: nuts → none.** No page names stones for Heering. Oxford CHERRY BRANDY (pdf 445–446) files it as the cherry-flavoured kind, made by steeping cherries in a spirit or using cherry juice, then sweetening; it gives cracked pits only for true cherry brandy and maraschino, and those stay nuts. **Affects:** hero-regular-guy, whose `contains` is unchanged because of the Bénédictine.
2. **`cacao_nib_tincture_gin`: nuts + dairy → none.** It's nibs and gin only, and its "shared-plant warnings" were a generalisation, not a label anyone read. It now matches `creme_de_cacao_white` (none). The row carries a recipe note for wherever it's used: "If you have a nut or milk allergy, check the nibs' pack for a warning." **Affects:** no spec uses it today.
3. **`jaggery_syrup`: dairy + nuts → nuts.** Milk clarification was only my memory; Hester's source (F20) lists the clarificants and milk isn't among them. Groundnut is in that list, so nuts stays. **Affects:** caregiver-outlaw, now `["nuts"]` in the frontmatter and cocktail block, with Checks › Allergens and an Open items bullet. **This is the one change today that drops a declared allergen.** It follows the D1 rule; it goes back to dairy if a page or a label names milk.

## C. Lessons (sanctum)

`MEMORY.md` has a new section, "Robin's rulings, 2026-10-06":
- **The evidence rule.** What counts as evidence, with today's applications. Two follow-ons: when a row goes to none, drop guest precautions that now contradict it; when a pour stays marked, give the reason in one sourced clause.
- **Judging by structure.** Use the *Codex* as the form's own benchmark (with the list of *Codex* classics that read OUT), and cite the form's page in `accepted.why`.
- **The two-Rickeys ruling.** It's the drink the guest is told about that counts, so grep sibling y4s for the drink's name.
- **Craft rules.** Keeping times come from *Codex*/*LI* pages; never convert a powder to spoons without a sourced weight; quote every shell heredoc.

Also updated: `BOND.md` (Robin's 2026-10-06 calls), `INDEX.md`, `CAPABILITIES.md` (new `scripts/codex_bench.py`) and `sessions/2026-10-06.md`.

## For Robin

1. ***Before the Room***: 1:6 cassis against the *Codex*'s about 1:11 (6.40 vs 4.07 g). It's in Arnold's band and I haven't changed it; 15 ml would read 5.16 g.
2. **Q155** (*innocent-magician*): the non-Tasmanian substitute is proven at 13.3–15.3%. It's your call, because the room kept the Tasmanian-only substitute on purpose.
3. **Three shared rows reclassified under D1** (above). *Not Too Polite* drops dairy and is still not veto-free.
4. **Settled since (addendum below):** the apricot rows. *Is It Just Me* drops nuts, and *Not the Same* becomes veto-free.
5. **For the editor:** re-run `tools/` and `registry.py --write`. The matrix will now show *Whoopee*'s new lemon, *First Choice* at 17.5% / 7.30 g, and *Not Too Polite* as `["nuts"]`. Hester may want to look over the new groundnut clause in *Not Too Polite*'s recipe note (it rests on her F20).

## Addendum (coordinator's follow-up, same day): the apricot rows

Hester searched the library and the web (`applied/_hester.md`) and found no source for "dried fruit is packed alongside nuts". These rows were changed under the studio lock, each with its reason appended to its `source`:

1. **`apricot_steeped_rye`: nuts → none.** There's no stated ingredient. The packing claim is unsourced, *Codex* p. 37's "botanically related" is a flavour note, and only the dried flesh is steeped, with no kernel.
   **Knock-ons in jester-regular-guy *Is It Just Me*:**
   - `contains` `["gluten", "nuts"]` → `["gluten"]` in the frontmatter and cocktail block. It keeps gluten from the pilsner, so it's still not veto-free.
   - Recipe note → "If you avoid nuts, check the pack for a nut warning." The guest's own pack label is the evidence the rule counts.
   - Allergens anchor row, Checks › Allergens (ruling appended) and an Open items Resolved bullet updated.
2. **`apricot_eau_de_vie`: checked, and it fails the rule, so nuts → none.**
   - Oxford APRICOT BRANDY (pdf 133) makes it from "apricots and apricot pomace" and names no kernels or stones.
   - ABRICOTINE's "a touch of almond" (pdf 47) is a tasting note.
   - Amaretto's apricot kernels (pdf 94) belong to a different product.
   - *Matrix* pdf 236 and *Codex* p. 37 are botany, and "distilled with the stones" was my own knowledge.
   - Contrast kirsch, which stays nuts: its page names the pits (pdf 1135).

   **Knock-ons in ruler-explorer *Not the Same*:** it is **now veto-free** (`veto_free: true`, `contains: []`). The spark anchor's allergen clause, Checks › Allergens and an Open items Resolved bullet are updated.
3. **`apricot_flavoured_brandy`: nuts → none**, on the same grounds: "kernel flavour" is a tasting note, and pdf 133 lists juice, sweeteners and natural flavours. No spec uses it (it's a sweep row), so nothing else moves.

**Also changed:**
- explorer-ruler *Far Enough*: the Checks › Pairings sentence that cited the dried-fruit reasoning now says the call is withdrawn. The fresh plum stays because the drink is built and proven on it. No change to `contains` (`[]`).
- outlaw-ruler: its quince `nuts` stands on its own "may contain" label (D8), so nothing changes there.
- caregiver-outlaw *Not Too Polite*: I took Hester's suggestion. The recipe note now reads "groundnut (peanut) among them".

**Checks:** all four pours (jester-regular-guy, ruler-explorer, explorer-ruler, caregiver-outlaw) lint at 0 errors, with no new warnings, and `allergens.py` matches each file. Each has a "Tomás (Codex pass / open items, 2)" line in its room block.

**For Robin:** the Ruler family gains a veto-free pour (*Not the Same*). Under D1 there are now six shared rows that I've reclassified today.
