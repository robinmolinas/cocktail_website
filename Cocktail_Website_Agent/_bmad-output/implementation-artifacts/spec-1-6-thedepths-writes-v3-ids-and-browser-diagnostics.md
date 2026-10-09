---
title: '1.6 TheDepths writes v3 ids and browser-only diagnostics'
type: 'feature'
created: '2026-10-08'
status: 'draft'
baseline_commit: 'da22abd2b8e5e286837eaeddd0fbb11bacb2158c'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 6'
worktree: '{project-root}/Dionysus-depths (branch depths-v3-ids, from experience-revamp-2026-09 da22abd)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/spec/intake-contract.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** TheDepths keeps private copies of every option list and writes display labels, a hex colour and pole words. `src/engine/intake.ts` maps those back to ids at the reveal, so a copy edit silently turns an answer neutral. Nothing records the H4/H3 diagnostics the intake contract defines.

**Approach:** TheDepths imports the shared vocabularies and writes Answers v3 ids directly into a browser `IntakeRecord` (`answers`, `trace`, `diagnostics`) held by App. It records `IntakeDiagnostics` as the contract defines them. The reveal request is projected from `record.answers` alone.

## Boundaries & Constraints

**Always:**
- Same choices give the same Answers: tap or carry, mouse or touch, timed or Still Water. Word lists, flavours and vetoes are stored in vocabulary order.
- Diagnostics follow intake-contract.md:
  - `ms` counts from the readable moment, which is the 250 ms catch threshold.
  - A hidden-tab gap marks `interrupted` and re-presents the same pair. The final status comes from that re-presentation.
  - Pairs not reached are `notPresented`.
  - Let-them-cool is `skipped`.
  - The 1/2 example records `chosen` or `notTouched`.
  - `gravityMoved[key]` is true once the guest moves that mote by pointer or key before commit.
- Trace and diagnostics never enter a `RevealRequest`, a share link or any network call. A dev-only read hook may expose request-minus-name and diagnostics. It is compiled out of production.
- Guests see the same copy and visuals. The H4 v4 instruction, the timed 1/2 example, its readable gate and the Still Water behaviour are preserved.
- `shared/answers.ts` exports stay stable. Zod does not enter the landing bundle.
- Decision (Robin, 2026-10-08, "let's go for 1.6" after being told the ticket names the design owner): the matching owner builds 1.6.

**Never:** No scoring change, no vocabulary or label change, no new question. No deletion of `src/types.ts` `Answers`/`CocktailResult`, `mixology.ts` or `sampleResult.ts` (that is 1.7). No committed Playwright suite (that is 1.8). No diagnostics export UI. No push.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Dawn fixture journey | ids written by holds | `toRevealRequest(record)` gives the same request as the 1.5 label mapping did | N/A |
| Mouse vs touch | identical choices, H3 drag vs tap, H5 carry vs tap | identical request; diagnostics may differ only in `ms` | N/A |
| H4 caught | catch at t ms after mount | `status:'chosen'`, `ms = t − 250` (≥0) | N/A |
| H4 expired | no catch | `timedOut`, texture key absent | N/A |
| Tab hidden mid-pair | rAF gap > 500 ms | same pair re-presented; `interrupted:true`; taps during the 600 ms pause are ignored | N/A |
| Still Water | reduced motion | `h4Mode:'untimed'`; let-them-cool → `skipped` | N/A |
| Empty name (dev jump) | name '' | request name 'Guest' | N/A |

</frozen-after-approval>

## Code Map

App root: `Dionysus-depths/Cocktail_Website_Agent/dionysus-experience`.

- `shared/answers.ts` -- vocabularies (`:17-112`), `idFromLabel`, `canonicalWords`, then the zod schema, then the `IntakeDiagnostics` types (`:208-231`). The comment at `:220` says "fully condensed"; the contract says 250 ms. Correct the comment.
- `src/components/TheDepths.tsx` -- private lists (all match shared exactly):
  - `LENSES` :338
  - `SEEDS` :355 (`s` size stays UI-only, plus `SEED_POS` :367)
  - `GRAVITIES` :294 and `BINARIES` :257 (`key`→`id`)
  - `RES_QUESTIONS` :184 (the comment at :167 says "nine", which is stale)
  - `FIN_FLAVORS` :216 and `FIN_VETOES` :221
  - `EXAMPLE_PAIR` :248 stays local.
- TheDepths writes:
  - `commitName` :870, `pickLens` :882, `pickSeed` :893
  - `commitGravity` :913, `catchDrop` :1093 (round −1 skipped at :1089)
  - RW `onSeal` :2344 (labels), `sealCatch` :1488 (catch order), `sealWard` :1531, `sealTrace` :1563
- Echo text: `buildBreathEchoes` :306-330 reads labels. It must look labels up by id.
- H4 mechanics:
  - `startHRound` :1038-1071, with `hStart` the only timestamp, the readable flag at :1062, and the rAF-gap re-present at :1055-1059 (stage stays 'play' during the 600 ms pause, a bug).
  - Expiry :1064, `letThemCool` :1075, `catchDrop` :1083.
  - Still Water :538.
  - H4 v4 code to preserve: :27-39, :243-283, :541-549, :977, :1047, :1119-1135, :2281-2312.
- H3 slider: pointer events :2195-2205, keys :2211-2227, `revertGravity` :936.
- `src/components/ResonanceWorld.tsx` -- takes label words and seals labels. Leave it untouched and map labels→ids at TheDepths' boundary, using lists derived from the shared vocab.
- `src/components/FlavourIcon.tsx:20` -- looks up `name.toLowerCase()`; for flavours this equals the id.
- `src/App.tsx` -- `Answers` state, `DEFAULT_ANSWERS` :65-92, `INITIAL_ANSWERS` :96, `updateAnswers` :237, `startReveal` :272, `devPage` :328 (`seedFromHex(answers.color)`).
- `src/engine/intake.ts` -- becomes `IntakeRecord`, `emptyRecord()` and a projection-only `toRevealRequest(record)`. `seedFromHex` is dropped.
- `src/engine/reveal.ts` -- `revealReading(record)`.
- `src/engine/fixtures.ts` -- the dawn/night journeys, rewritten in id shape. Dawn's soughtFor becomes vocabulary order. Used by `intake.test.ts` and `reveal.test.ts`.
- Tests are node vitest only. The parity check is an ad-hoc Playwright (`playwright` lib) script run from `Cocktail_Website_Agent/` against `vite --port 5180`.

## Tasks & Acceptance

**Execution:**
- [ ] `shared/vocab.ts` (new) + `shared/answers.ts` -- move the vocabularies, id types, `idFromLabel`, `canonicalWords` and the diagnostics types into a zod-free module. `answers.ts` re-exports them. -- TheDepths can then import them without pulling zod into the landing bundle.
- [ ] `src/engine/intake.ts` (+ test) -- `JourneyAnswers` (v3 minus `v`, `name` may be empty), `IntakeRecord`, `emptyRecord()`, `toRevealRequest(record)` (adds `v`, wire name, strict parse; trace and diagnostics cannot reach it). Tests: projection excludes trace and diagnostics; empty name → 'Guest'; out-of-order words rejected.
- [ ] `src/engine/reveal.ts`, `fixtures.ts` (+ tests) -- take an `IntakeRecord`. Fixtures in id shape give the same pairings as before (dawn regular-guy-caregiver, night magician-outlaw).
- [ ] `src/components/TheDepths.tsx` -- import the shared lists and write ids. Record diagnostics through an `onDiagnostics` callback. Fix the paused-pair tap. Echo text looks up labels.
- [ ] `src/App.tsx` -- hold an `IntakeRecord`. `updateAnswers`, `updateTrace` and `updateDiagnostics` merge into it. The reveal and devPage read `record`. A DEV-only `window.__dionysusIntake()` returns `{request without name, diagnostics}`.
- [ ] `deferred-work.md` -- mark the 1.5 "private option lists untested" entry resolved.

**Acceptance Criteria:**
- Given a mouse journey and a touch journey with identical choices, when each seals, then both requests are identical. The diagnostics have nine texture entries plus `h4Mode`, `example` and the five `gravityMoved` values.
- Given the built app, when the landing loads, then the landing chunk contains no zod and no `__dionysusIntake`.
- Given tests, `tsc -b`, the build and lint, then they pass, with lint at or under 39 errors.

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npx vitest run` -- all pass
- `npx tsc -b && npm run build` -- clean. `grep -l zod dist/assets/index-*.js` finds nothing.
- `npm run lint` -- ≤39 errors

**Manual checks:**
- Playwright parity script at 1440 (mouse, H3 drag, H5 carry) and at 390 with touch (tap): requests equal, diagnostics shape complete, the reveal shows the same pairing, zero console errors.
