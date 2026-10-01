# Fact audit v2: jester-explorer, spec v1 + Tomás's draft v1 + reading v2 (y4, epigraph)

Read on screen today: *Codex* pp. 6, 7, 22, 109 (printed); *LI* pp. 78-79 (pdf 82-83) and pdf 145; *Time Out Chicago* 2014 (round 2, re-quoted from the card); Zacapa 23's strength on two retailer pages (Caskers, Flaviar: "80 (40% ABV)", "750ml • 40% ABV"; Caskers notes the ABV "may vary"). The spec is `_studio/specs/jester-explorer.json` v1 (45 rye / 15 Zacapa 23 / 10 demerara / 2 Angostura / 20 water; orange peel).

**Verdict: FAIL, with five fixes (B1-B5) plus A1-A6, which are still open in y1-y3 (v2 changed only y4).** The spec passes.

## Tomás's two asks
| ask | finding | verdict |
| --- | --- | --- |
| Zacapa 23 at 40% | Caskers: "Proof 80 (40% ABV)", "may vary"; Flaviar: "750ml • 40% ABV". Secondary (retailers); the brand page didn't render | **Pass.** Mark it "40% (retailer listings, 2026; may vary by market)". Change *unsourced* to *secondary* in Checks |
| "rum" on the *Time Out* page | "Describe your cocktail-making style in in three words. Hugs, rum and rock." (*Time Out Chicago*, Feb 2014) | **Pass.** Scope: his cocktail-making style, in 2014 |

## Fixes (old → new)
| ID | where | old | problem | new (proposal) |
| --- | --- | --- | --- | --- |
| B1 | draft, Checks › Makeable | "The batch and the shell both come out of the same freezer… so there's very little time and **no temperature gap for melting**" | **The page cited says the opposite.** *LI* pp. 78-79: ice at 0° melts into a 0° gin mixture anyway, because entropy wins, until the mix reaches its own lower freezing point. With no temperature gap, ice still melts into a strong drink. Only the short time keeps the melt small, and that part is unmeasured | "Ice melts into a strong drink even at the same temperature, until the mix reaches its own freezing point (*LI* pp. 78-79). What keeps the melt small here is time: the drink goes in just before serving (my craft call, unmeasured; the melt cases stand in)." |
| B2 | epigraph | "*The most familiar cocktail there is, sealed inside ice.*" | A1 (no source for the superlative), plus Tomás's flag: our shell has a hole on top, so it isn't sealed. The epigraph is about **our** glass | "*One of the most familiar cocktails there is, poured inside ice. Nobody tastes it until the ice breaks.*" (or "held inside ice") |
| B3 | y4 | "It waits, cold and already diluted, in a shell of ordinary cloudy ice" | Method step 4: the drink waits in the freezer and goes into the shell just before serving (Tomás's own note) | "It's poured, cold and already diluted, into a shell of ordinary cloudy ice from your own freezer" |
| B4 | y4 | "the whole craft of it is restraint, so it's made exactly" | *Codex* p. 6: "an exercise in restraint", then "precision is the name of the game". "The whole craft" overstates: the same page also names subtlety and technique | "and it's an exercise in restraint, so it's made exactly" |
| B5 | y4, **if the rum is carried**; draft "For Wren" | "the rum and the rye are known to get on" (Tomás's suggested words) | **Family vs bottle** (my sixth such catch in this studio): *Codex* p. 109's affinity is Zacapa's, "because it's aged in former whiskey barrels". It isn't true of rum in general, and the substitute style ("any aged Spanish-style rum") doesn't carry it | "this rum and rye are known to get on", or name it ("Zacapa and rye are known to get on"). If the substitute is poured, the claim doesn't hold for it. The three words must keep their scope: "When Joly described his cocktail-making style in three words, rum was one of them" |

## Still open from audit v1 (not yet in v2)
A1 (y1 "the most expected cocktail there is"), A2 ("perhaps the finest"), A3 ("from the first week, and somebody laughed"), A4 ("in the same week"; Wren's resonance quotes it too), A5 (the "because" and "nobody had time"), A6 ("hadn't felt like a bar"). Wording is in `historian-audit-v1.md`. Wren's speaksTo row 3 also carries "(nobody had time to talk)", my struck shorthand; the anchors use the corrected words.

## Passes
| claim | source | verdict |
| --- | --- | --- |
| Spec: Old-Fashioned root; split base | *Codex* p. 6 (orthodoxy, quoted exactly); p. 22 ("pulling back on the base and adding another spirit… to accent the primary spirit": the ellipsis drops "like apple brandy,", which is fair) | pass |
| Rye "a distinct spiciness" | *Codex* p. 7 | pass, scoped: the line is about rye **in a bourbon mashbill**. "Rye brings spiciness" as grain is fine; it's flavour, not the `spice` veto |
| Zacapa for Old-Fashioned riffs; affinity with rye | *Codex* p. 109 | pass for Zacapa only (B5). **Guard:** "23" isn't an age. The same entry calls it "a blend of rums aged between six and twenty-five years" (and slips into "Zacapa XO"). Never "23-year-old" anywhere in the pour |
| Batch stays liquid | *LI* pdf 145 (under about 15.5% to freeze; 31.9% here) | pass |
| y4 v2: "A home freezer can't freeze a drink that strong, so plain ice holds it like a cup" | *LI* pdf 145 | pass |
| y4 v2: the renowned classic; as many recipes as bartenders | *Codex* p. 6 ("ask ten bartenders…"); Oxford pdf 1429 (one of the most popular) | pass |
| y4 v2: the maker cracks it at the table while the guest looks on; it runs out over its own broken ice | method step 5 | pass. **Ours**, not the 2011 serve (the server cracked it, F7) |
| "Nothing in the bottle is strange" | spec | pass, with or without the rum |
| Method: cup, spoon, freezer; 3-4 hours | Tomás's craft call, labelled | pass |
| Closing line: *Crack it in front of them. Then don't leave the table.* | ours; credits nobody | pass |
| Image brief: no sling, no sphere, no birdcage, no lab | F5, F10 guards | pass |

## The name
*Unrehearsed* passes on fact, **as long as it stays on the person and the reaction**. The 2011 drink was the most rehearsed thing in the story: "years workshopping the cocktails" (*Proper* p. 234, F1). So never "an unrehearsed drink" or "an unrehearsed bar". Motif watch (for the lint, not a fact): "rehearsal" is in *Cold Water First*'s anchors ("a quiet rehearsal nobody sees"), and "you rehearsed it" is in *Not Too Polite*'s whoYouAre. The name is the opposite of both, which reads as distinct, but it's in a crowded family.

## Anchors
Re-synced in the same call: speaksTo is Wren's (journey words), drink rows are added for the spec, and the rum row is scoped to Zacapa.
