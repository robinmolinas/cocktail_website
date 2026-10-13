---
title: '1.6 TheDepths writes v3 ids and browser-only diagnostics'
type: 'feature'
created: '2026-10-08'
status: 'done'
baseline_commit: '5682763cf409788a676727982e502442cd2b6c96'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 6'
worktree: '{project-root}/Dionysus-depths (branch depths-v3-ids, fast-forwarded to experience-revamp-2026-09 5682763 on 2026-10-13)'
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
- Decision (Robin, 2026-10-13, "continue with what you recommend"): keep the full spec (about 2,100 tokens) as one goal, and approve and continue.
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
- `src/components/TheDepths.tsx` (refs at 5682763) -- private lists (all match shared exactly):
  - `LENSES` :345
  - `SEEDS` :362 (`s` size stays UI-only, plus `SEED_POS` :374)
  - `GRAVITIES` :301 and `BINARIES` :264 (`key`→`id`)
  - `RES_QUESTIONS` :191 (the comment at :174 says "nine", which is stale)
  - `FIN_FLAVORS` :223 and `FIN_VETOES` :228. Since 2026-10-09 the H6 flavour field's arrival code keys on `FIN_FLAVORS[i]` and `held`; keep the indices stable.
  - `EXAMPLE_PAIR` :255 stays local.
- TheDepths writes:
  - `commitName` :875, `pickLens` :886, `pickSeed` :896
  - `commitGravity` :917, `catchDrop` :1090 (round −1 skipped at :1097, write at :1101)
  - RW `onSeal` :2394 (labels), `sealCatch` :1536 (catch order, write at :1538), `sealWard` :1579, `sealTrace` :1611
- Echo text: `buildBreathEchoes` :313 reads labels. It must look labels up by id.
- H4 mechanics:
  - `startHRound` :1045, with `hStart` the only timestamp, the readable flag at :1069, and the rAF-gap re-present at :1062-1064 (stage stays 'play' during the 600 ms pause, a bug).
  - Expiry :1072, `letThemCool` :1082 (button :2366), `advanceHidden` :1033, `ROUND_MS` :282.
  - Still Water: :545-546.
  - H4 v4 code to preserve: `H4_LINES` :258, `H4_LINE_MS`/`H4Line` :286-290, `hReadable`/`hLine` :552-556, the round-0 quieting at :1055, the kickoff :1126-1142, the `h4-dusk` overlay :2040, and the markup :2329-2370.
- H3 slider: pointer events :2245-2255 (the phone gravity scale was re-tuned 2026-10-13; don't touch it), keys :2261, `revertGravity` :943.
- `src/components/ResonanceWorld.tsx` -- takes label words and seals labels. Leave it untouched and map labels→ids at TheDepths' boundary, using lists derived from the shared vocab.
- `src/components/FlavourIcon.tsx:20` -- looks up `name.toLowerCase()`, which equals the id for every flavour. Called at TheDepths :2440.
- `src/App.tsx` -- `Answers` state, `DEFAULT_ANSWERS` :85, `INITIAL_ANSWERS` :117, `answersRef` :141, `updateAnswers` :264, `startReveal` :301, `devPage` :355 (`seedFromHex(answers.color)`). The 2026-10-12 keep/kept-pour code reads the link's `{pairing, name, seed}`, never answers, so it is out of scope.
- `src/engine/intake.ts` -- becomes `IntakeRecord`, `emptyRecord()` and a projection-only `toRevealRequest(record)`. `seedFromHex` is dropped.
- `src/engine/reveal.ts` -- `revealReading(record)`.
- `src/engine/fixtures.ts` -- the dawn/night journeys, rewritten in id shape. Dawn's soughtFor becomes vocabulary order. Used by `intake.test.ts` and `reveal.test.ts`.
- Tests are node vitest only. The parity check is an ad-hoc Playwright (`playwright` lib) script run from `Cocktail_Website_Agent/` against `vite --port 5180`.

## Tasks & Acceptance

**Execution:**
- [x] `shared/vocab.ts` (new) + `shared/answers.ts` -- move the vocabularies, id types, `idFromLabel`, `canonicalWords` and the diagnostics types into a zod-free module. `answers.ts` re-exports them. -- TheDepths can then import them without pulling zod into the landing bundle.
- [x] `src/engine/intake.ts` (+ test) -- `JourneyAnswers` (v3 minus `v`, `name` may be empty), `IntakeRecord`, `emptyRecord()`, `toRevealRequest(record)` (adds `v`, wire name, strict parse; trace and diagnostics cannot reach it). Tests: projection excludes trace and diagnostics; empty name → 'Guest'; out-of-order words rejected.
- [x] `src/engine/reveal.ts`, `fixtures.ts` (+ tests) -- take an `IntakeRecord`. Fixtures in id shape give the same pairings as before (dawn regular-guy-caregiver, night magician-outlaw).
- [x] `src/components/TheDepths.tsx` -- import the shared lists and write ids. Record diagnostics through an `onDiagnostics` callback. Fix the paused-pair tap. Echo text looks up labels.
- [x] `src/App.tsx` -- hold an `IntakeRecord`. `updateAnswers`, `updateTrace` and `updateDiagnostics` merge into it. The reveal and devPage read `record`. A DEV-only `window.__dionysusIntake()` returns `{request without name, diagnostics}`.
- [x] `deferred-work.md` -- mark the 1.5 "private option lists untested" entry resolved.

**Acceptance Criteria:**
- Given a mouse journey and a touch journey with identical choices, when each seals, then both requests are identical. The diagnostics have nine texture entries plus `h4Mode`, `example` and the five `gravityMoved` values.
- Given the built app, when the landing loads, then the landing chunk contains no zod and no `__dionysusIntake`.
- Given tests, `tsc -b`, the build and lint, then they pass, with lint at or under 39 errors.

## Implementation Notes

Built 2026-10-13 in `Dionysus-depths` (branch `depths-v3-ids`). Nothing is committed yet.

- **The record is split from the projection.** `IntakeRecord`, `JourneyAnswers`, `emptyRecord()`, `emptyDiagnostics()`, `mergeDiagnostics()` and `DiagnosticsPatch` live in a new zod-free `src/engine/record.ts`. `src/engine/intake.ts` keeps `toRevealRequest` and `WIRE_GUEST_NAME`, and re-exports the record API. The reason: App needs `emptyRecord()` at runtime from the landing on. If App imported it from a module that also imports `AnswersSchema`, zod would land in the entry chunk.
- **Review fixes.** The write helpers `labelsToIds`, `flavoursInOrder` and `vetoesInOrder` live in `record.ts`, and `record.test.ts` checks that tap-order input becomes vocabulary order and passes `toRevealRequest`. `npm run build` now ends with `bundle:landing:check` (`scripts/check-landing-bundle.mjs`), which fails if `dist/assets/index-*.js` contains `__dionysusIntake`, `ZodError` or `_zod`. A failed reveal is logged with `console.error`, in dev only and the error alone.
- `shared/answers.ts` imports `./vocab.ts` with the extension, because the `node --experimental-strip-types` build scripts resolve it directly. Its export surface is unchanged, and `shared/vocab.test.ts` pins it.
- **Diagnostics start complete.** `emptyDiagnostics()` sets all nine pairs to `notPresented`, all five `gravityMoved` values to false, `example` to `notTouched` and `h4Mode` to `timed`. TheDepths writes `h4Mode` at mount and each pair's final status. The status carries `interrupted` when the pair was re-presented.
- **How `ms` is measured.** `ms` is the tap's `event.timeStamp` minus (pair mount + 250 ms), clamped to 0 or more. The event time is used instead of `performance.now()` so the react-hooks purity lint stays at 39.
- **Pause fix.** During the 600 ms re-present pause, `hAnswered` is set to true and `hReadable` to false, so both a catch and "let them cool" are ignored. Expiry also sets `hAnswered`. A pair that expires or is skipped deletes its texture key.
- **`gravityMoved`.** It is set by pointer-down/move and by Arrow, Home or End. It stays true once set. Enter on an untouched mote records false.
- **Reset on a new journey.** App resets the record (to the dev fixture when `?fixture=` is set) on the threshold descent. Before, a second journey from the landing kept the first journey's answers. With diagnostics in the record, that would also have mixed the two journeys' diagnostics.
- **Echo order.** The breath echoes now list flavours and the first veto in vocabulary order, because they are read from the stored answers. Before, they followed catch and pop order. The words and templates are unchanged.
- **The dev hook.** `window.__dionysusIntake()` is async: it lazy-imports `engine/intake`, so dev never puts zod in the entry chunk either. It returns `{ request (no name), diagnostics }` and never the trace.
- **Parity checks.** The scripts were ad-hoc and run outside the repo (not committed). They used port 5181 with a separate `cacheDir`, because 5180 was taken by the main checkout's dev server and the two share `node_modules`.

## Spec Change Log

## Review Triage Log

Pass 1, 2026-10-13. Layers: blind hunter (BH), edge-case hunter (EC), verification gap (VG). No layer was skipped.

| # | Layer | Finding | Verdict | Evidence | Route |
|---|---|---|---|---|---|
| 1 | VG | TheDepths' write helpers (`labelsToIds`, `vetoesInOrder`, flavour canonicalisation) are untested, and a regression now fails the strict parse and sends the guest home | medium | Confirmed. The helpers are unexported in TheDepths; the intake tests feed hand-written id fixtures, and the 1.5 test that turned tap-order labels into ids was deleted. | patch (with 2, 3) |
| 2 | VG | Veto vocabulary order is not pinned by a test, and the schema checks only uniqueness | medium | Confirmed. In `answers.ts` the vetoes refine checks uniqueness only; `vetoesFrom` and its scrambled-order test were removed. | patch (grouped with 1) |
| 3 | BH | The H5 label→id boundary can silently drop answers to neutral, untested | medium | Same root cause as 1: `labelsToIds` drops unknown labels and no test reaches it. | patch (grouped with 1) |
| 4 | VG, BH | "No zod or dev hook in the landing chunk" has no automated check, and a "zod" grep is weak on minified output | medium | Confirmed. `npm run build` inspects no chunks; the spec's check is a manual grep. | patch |
| 5 | BH | A failed strict parse sends the guest home with nothing logged | medium | Confirmed. `startReveal` ends in `.catch(() => null)`; in 1.5 the same slip dropped the answer to neutral. | patch (DEV console.error) |
| 6 | BH | `beginOwnJourney` resets with `emptyRecord()`, the other entrances with `freshRecord()` | low | Confirmed at App.tsx:186-192; it only differs under the dev `?fixture=`. Direct correction. | patch |
| 7 | BH | The dev fixture record is shared by reference | low | Confirmed: `initialRecord` returns `JOURNEY_FIXTURES[x]` itself. Direct correction (`structuredClone`). | patch |
| 8 | BH | `RES_MAX` and `FIN_MAX_FLAVORS` duplicate the shared `MAX_WORDS`, which `canonicalWords` silently slices at | low | Confirmed at TheDepths :226, :245. Direct correction. | patch |
| 9 | BH | The RES_QUESTIONS comment contradicts itself (nine words, Knowledge folded into Mastery, versus Q12) | low | Confirmed. Comment fix. | patch |
| 10 | BH, EC | H6 comments point at a dead path: drinkScales in mixology, and `/alcohol/` in `allergies` for zero-proof | low | Confirmed at TheDepths :242-253; TheDepths no longer writes `allergies` and VETOES has no alcohol. Comment fix. | patch |
| 11 | BH | `interrupted` is set by any frame gap over 500 ms, not only a hidden tab | low | Confirmed. This is the 2026-10-06 rAF-gap mechanism, with no `visibilitychange` check. Documenting the approximation is a direct correction; behaviour is unchanged. | patch (comment) |
| 12 | BH | The `./vocab.ts` import extension has no comment saying why | low | Confirmed. The reason is only in this spec, and a lint or cleanup pass could strip it and break the import scripts. | patch (comment) |
| 13 | BH | The intake test's zero-width-space name became a raw invisible U+200B | low | Confirmed: intake.test.ts:96 holds raw bytes, where the baseline had `\u200b`. | patch |
| 14 | VG, BH | H4/H3 diagnostics and the paused-pair fix are checked only by hand | medium | Confirmed. The logic lives in component closures, and the frozen Never rules out a committed Playwright suite (1.8). The ad-hoc edge and parity scripts ran and passed. | defer (1.8) |
| 15 | BH | TheDepths takes `seedHex` from local `seedChosen`, so fixture or dev jumps render default orange | low | Pre-existing (before 1.6 `answers.color` was not read either) and dev-only. | reject |
| 16 | BH | `IdOf` is duplicated in answers.ts and vocab.ts | low | Two identical type aliases, with no named caller that would diverge. Negligible. | reject |
| 17 | EC | A zero-width gravity track would divide by zero and give NaN | false | `gravMoveTo` runs from pointer events on the track itself; an element receiving a pointer event has a non-zero rect. The keyboard path never calls it. | reject |
| 18 | EC | Arrow, Home or End at a bound marks the mote moved when it didn't move | low | Real but rare (only a key pressed at 0 or 100), and the fix adds a guard. | reject |

## Verification

**Commands:**
- `npx vitest run` -- all pass
- `npx tsc -b && npm run build` -- clean. `grep -l zod dist/assets/index-*.js` finds nothing.
- `npm run lint` -- ≤39 errors

**Manual checks:**
- Playwright parity script at 1440 (mouse, H3 drag, H5 carry) and at 390 with touch (tap): requests equal, diagnostics shape complete, the reveal shows the same pairing, zero console errors.
