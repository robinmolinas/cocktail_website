---
title: '1.5 App reveals the selected authored pour'
type: 'feature'
created: '2026-10-08'
status: 'done'
baseline_commit: 'aee5f146f8cd19617ea0e751d1594368d9bad766'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 5'
worktree: '{project-root}/Dionysus-reveal (branch app-reveal, from experience-revamp-2026-09 aee5f14)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Every guest is shown the same fixed reveal (*Down the Line*, `VISIONARY_SAMPLE`), whatever they answered.

**Approach:** When the journey seals, App turns the journey's answers into Answers v3, runs `selectShortlist` locally, takes `boundedPick(shortlist, null)` and assembles that pour's `Reading` with authored copy. TheReading renders a `Reading`, and the share link carries `{pairing, name, seed}` (AD-10).

## Boundaries & Constraints

**Always:**
- The recipe, method, preparations, glass, closing line, epigraph, whoYouAre and yours all render verbatim, inline `*em*`/`**strong**` included. The Ritual ends on `closingLine` (AD-5).
- Selection and assembly run only through the shared core; App adds no scoring rules. Unknown or missing answers stay neutral.
- The shared reading registry stays out of the landing bundle (it is loaded lazily on the way to the reveal or gift).
- A reveal that can't be built never strands the guest: it opens the landing, as a broken link does today.
- Gift view: the recipe without the reading, as now. A link with an old full-result payload or an unknown pairing counts as broken (AD-10).
- Decision (Robin, 2026-10-08): the letter drops the archetype essence line. The archetype name stays in the kicker, and the letter opens on the epigraph. The raw sheet essences never reach the guest.
- The other sessions' uncommitted edits in the main checkout (App/TheReading "spirit within" copy) are merged in, not overwritten.

**Never:** No change to TheDepths, ResonanceWorld, styling tokens or `index.css` beyond what new markup needs, nor to `shared/` rules, authored content or images. No Bartender, server, persistence or `/pour/:id`. Retired engine files are not deleted (that is 1.7). No deploy, no push.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Two journeys | Two different fixture answer sets | Two different authored pours, each matching `selectShortlist(...)[0]` | N/A |
| Veto | Allergies include Dairy | Revealed pour's `contains` excludes dairy | N/A |
| Sparse journey | Dev jump to H6, most answers empty | A valid authored reveal (neutral scoring) | N/A |
| Share round trip | Share, then open the link | Gift view of the same pairing, name and seed colour | Bad or old payload → landing |
| Missing image | Pairing without persona geometry | `_fallback.jpg` with fallback coordinates | N/A |

</frozen-after-approval>

## Code Map

App root: `Dionysus-reveal/Cocktail_Website_Agent/dionysus-experience`.

- `src/App.tsx` -- `prepareReveal`/`finishDepths` (`:244-265`) and `devPage` (`:282-297`) use `VISIONARY_SAMPLE`; the gift decode effect (`:105-132`) sets `result`. `answers.color` is a hex; `DEFAULT_ANSWERS` stays.
- `src/types.ts` -- the app `Answers` (labels, written by TheDepths) stays until 1.6. `CocktailResult` stays for the legacy engine until 1.7.
- What TheDepths writes today: `lens` = label; `color` = hex; `gravity` = v3 keys, 0–100; `texture` = binary key → pole word (`'Sharp'`); `soughtFor`/`drawnToward`/`flavors` = labels; `allergies` = labels joined by `', '`; `name` is trimmed and non-empty after H1. A dev jump can leave the name empty.
- `shared/answers.ts` -- `idFromLabel`, `canonicalWords`, `SEEDS` (hex), `BINARIES` (a/b words), `AnswersSchema` (`name` min 1).
- `shared/selection/index.ts` -- `selectShortlist(req)` over the production catalogue; `boundedPick`.
- `shared/reading.ts` -- `assembleReading(pairing, null, name, seed)` → `Reading` (`archetype`, `cocktail` with `recipe/preparations/method/closingLine/recipeIntro?/serves?/amountHeader`, `epigraph`, `whoYouAre`, `yours`, `persona`). It imports the 1.5 MB static registry, hence the lazy load.
- `src/components/TheReading.tsx` -- reads `result.*` throughout (`:58-131`, `:274-284`, `:331-476`). The share at `:273` strips fields of a `CocktailResult`.
- `src/engine/pourLink.ts` -- 'g'/'p' gzip+base64url framing (reuse it); the payload changes.
- `src/components/VelvetRope.tsx:26` -- shares a sample link from `VISIONARY_SAMPLE`; it becomes the `creator-hero` pairing.
- `src/data/sampleResult.ts` -- no longer imported (deletion is 1.7).

## Tasks & Acceptance

**Execution:**
- [x] `src/engine/intake.ts` (+ test) -- `toRevealRequest(appAnswers)`. It maps labels to ids, hex to seed, pole words to `a`/`b`, and allergies to vetoes, then parses with `AnswersSchema`. An empty name borrows `'Guest'` on the wire only, because names are never scored. This mapping disappears when 1.6 writes ids directly.
- [x] `src/engine/reveal.ts` (+ test) -- `revealReading(appAnswers)` and `readingFor(pairing, name, seed)`, which wrap the shared core. App lazy-imports this module.
- [x] `src/engine/pourLink.ts` (+ test) -- the payload becomes `{pairing, name, seed}`, parsed strictly. The framing stays.
- [x] `src/App.tsx` -- state holds a `Reading`. Prepare starts the reveal promise, and finish awaits it before mounting the reading. The gift path assembles from the link. Dev pages use a `creator-hero` fixture. Failure goes home.
- [x] `src/components/TheReading.tsx` -- `reading: Reading` prop. Seed hex comes from `SEEDS`. The Pour renders recipe, preparations and inline markdown; The Ritual ends on `closingLine`. The letter shows epigraph, whoYouAre and yours. Share uses the new payload.
- [x] `src/components/VelvetRope.tsx` -- the sample link uses the new payload.

**Acceptance Criteria:**
- Given the built app, when the landing loads, then the network shows no pour registry chunk until the journey reaches H9 or a gift link opens.
- Given tests, `tsc -b`, the strict build and lint, then they pass, and lint stays at the 39 baseline errors.

## Implementation Notes

- Robin approved the spec on 2026-10-08 ("continue with 1.5 build", with image validation running in another session). Built in worktree `Dionysus-reveal`, branch `app-reveal`, from aee5f14.
- New modules: `src/engine/{intake,reveal,pourHash,inline,fixtures}.ts`. App lazy-loads `reveal`, `pourLink` and `TheReading`. The landing bundle is 269 kB; the registry is a separate 1.28 MB `reveal-*` chunk, loaded at H9 or on a gift link. A 10 s ceiling sends a stalled reveal home.
- TheReading renders `Reading`:
  - The Pour adds serves/recipeIntro, a non-"amount" measure heading, the glass and the preparations. Each preparation's title sits above its text, because the importer drops the authored colon.
  - The Ritual ends on `closingLine`.
  - The letter runs epigraph → whoYouAre → yours.
  - Inline `**`/`*`/newline is handled by `inlineTokens`.
- Share and gift use `{pairing, name, seed}`. A name the payload rule refuses (e.g. one with a ZWJ emoji) travels as ''.
- Merged the main checkout's "spirit within" copy edits into App, TheReading, VelvetRope and NotFound. Not taken:
  - the `sampleResult.ts` tagline (that file is unused and goes in 1.7);
  - the `index.css` print-veil fix, which stays the other session's.

## Design Notes

The reveal is not shuffled: `boundedPick(shortlist, null)` is always `shortlist[0]`, so the same answers always give the same pour until Epic 2's Bartender picks within the shortlist. Persona images come from the registry (`shared/data/personas.ts`). As of 2026-10-08, 17 pairs are integrated and the other 115 exist only as unaccepted candidates (`design-artifacts/_image-production/2026-10-06/queue.json`), so those pairings show `_fallback.jpg`. Image production owns acceptance; once a pair is registered, the reveal uses it with no code change.

## Verification

**Commands:**
- `npm test`, `npx tsc -b`, `STRICT_STORE=1 npm run build -- --outDir <scratch>`, `npx eslint .` -- all pass; 39 baseline lint errors.

**Manual checks:**
- Playwright, desktop 1440×900 and phone 390×844. Two fixture answer sets (preloaded in dev, journey jumped to H9 and sealed) reveal two different pours. Their name, recipe, method and reading match the dossiers verbatim, a share link opens the same pour as a gift, and the console shows zero errors.

## Review Triage Log

Three layers reported before triage: blind hunter 12 findings, edge-case hunter 9, verification-gap 4 gaps + 1 other.

| ID | Finding | Verdict | Evidence and route |
| --- | --- | --- | --- |
| B1/E1 | A pending reveal survives goHome/dev jumps and can force the reading over the landing | medium | Confirmed: only `pendingReveal.current !== pending` guards the late resolve, and nothing resets it. Patch: clear it on every exit. |
| B2 | No ceiling on the held dark if a chunk hangs | medium | Confirmed: a hanging dynamic import never settles, which strands the guest (frozen Always). Patch: race the reveal against a timeout that resolves null. |
| B3 | A failed reveal drops the journey with no message | false | The frozen intent specifies exactly this: a reveal that can't be built opens the landing. |
| B4 | index.html titles still say "cocktail within" | false | The main checkout's uncommitted index.html edit already renames all three; it is the other session's file and comes with the merge. |
| B5 | Old full-result links now open as broken | false | AD-10 rule and the frozen Always both record this decision. |
| B6 | Epigraph and closing line render unguarded | false | `CocktailSchema.closingLine` and `epigraph` are `text` (min 1), enforced by the content gate; no empty value reaches the reading. |
| B7/E5 | answersRef synced in an effect can be stale at prepare | false | The last onUpdate is H8's trace (TheDepths:1555); onPrepare fires at H9 beginSurface (:723), many renders later. |
| B8/E8 | sampleResult.ts, mixology.ts, CocktailResult, src/data/personas.ts left orphaned | false | The frozen Never assigns retirement to 1.7; src/data/personas.ts is the 1.4 re-export shim. |
| B8b/E9 | Dead `.tr-essence` and letter `.tr-closing` CSS | low | Confirmed: this change removed their only markup. Patch: delete (a direct deletion). |
| B9 | Invisible control characters raw in test source | low | Confirmed in intake/pourLink tests; the bidi one triggers Trojan Source warnings. Patch: use \u escapes. |
| B10/V4 | The inline emphasis renderer is untested | medium | Gap filed pre-verified. Patch: pure tokenizer module, tested over every rendered authored field. |
| B10b | pourFromLocation and the App gift path are untested | low | pourHash is a moved one-liner; App wiring is V3 (deferred). Reject the pourHash part as negligible. |
| B11 | The fallback-image test requires some pairing to lack an image | medium | Confirmed: `expect(missing).toBeDefined()` fails once all 132 images land, which is the image pipeline's goal. Patch: drop it; `shared/reading.test.ts:232` covers the matrix row with an injected record. |
| B12a | A note's `*em*` nests inside the note's `<em>` and loses its emphasis | low | Confirmed for the 4 notes with emphasis. Patch: one CSS rule setting nested em upright. |
| B12b | No size cap on decodePour (gzip bomb) | low | A crafted link only stalls the tab of whoever opens it; the fix adds guards. Reject. |
| B12c/E4 | VelvetRope's lazy import has no catch | low | Confirmed: unhandled rejection. Patch: a direct `.catch`. |
| E2/E3/V1 | A name with a ZWJ emoji or other Cf character makes a link its own decoder rejects | medium | Confirmed by the V1 demonstration ("Ada 👩‍💻"). Patch: encodePour sends '' when the name fails the payload's name rule, plus a round-trip test. |
| E6 | canonicalWords slices in vocabulary order beyond three words | false | TheDepths caps each round at RES_MAX = 3 and flavours at FIN_MAX_FLAVORS = 3. |
| E7 | A non-seed hex falls back to house amber | false | TheDepths writes only its 8 SEEDS hexes or the default `#e8702a`, which equals DEFAULT_SEED_HEX. |
| V2 | TheDepths' private option lists aren't tested against the v3 vocabularies | medium | Gap filed pre-verified; all lists match today. A fix needs a TheDepths change (frozen Never). Defer: 1.6 removes the mapping. |
| V3 | No automated test of the App reveal wiring | medium | Gap filed pre-verified; no component/e2e harness exists. Defer (1.8 privacy/parity e2e). |

Final verification (parent, after review fixes): `npm test` 924/924 across 17 files; `npx tsc -b` clean; `STRICT_STORE=1` build passes (132 pours); lint 39 baseline errors; `git diff --check` clean. Playwright smoke on the patched dev build at 1440×900 and 390×844: fixture `dawn` → *Whoever Comes In* (regular-guy-caregiver, `_fallback.jpg`), `night` → *No Accident* (magician-outlaw, persona image); closing lines equal the authored JSON, no raw `*` on the page, zero console errors. The implementer's earlier walkthrough also covered share → gift round trip and broken/unknown links → landing.
