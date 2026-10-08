---
title: '1.1 Shared core scaffold and Answers v3 vocabularies'
type: 'feature'
created: '2026-10-06'
status: 'done'
baseline_commit: '2c109e14a589971f7802f396584366481da3dc04'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 1'
worktree: '{project-root}/Dionysus-matching-core (branch matching-core, fast-forwarded to 2c109e14a589971f7802f396584366481da3dc04)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/spec/intake-contract.md'
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The spine's functional core (`shared/`) does not exist. The answer vocabularies live as untyped label lists inside `TheDepths.tsx`, so no contract exists that the matching core, the import, the App and epic 2's API can share.

**Approach:** Create `dionysus-experience/shared/` with three parts:
- the Answers v3 vocabularies, with permanent ids, and their strict zod schemas;
- the pairing key;
- a selection contract, whose first implementation filters vetoes and takes the top 3 by pairingKey. Scoring is added in 1.3.

Wire the tsconfig, vitest and ESLint boundaries the spine requires, so that `npm run build` type-checks and tests the core.

## Boundaries & Constraints

**Always:**
- The ids and fields are exactly those in `agent/spec/intake-contract.md`.
- The wire schema is `z.strictObject` at every level.
- `RevealRequest` has no `trace` and no diagnostics.
- `name` is trimmed, 1–40 characters, with no control characters.
- `drawnToward`, `soughtFor` and `flavors` are unique, hold at most 3 values, and are in vocabulary order.
- `shared/` is pure ES: no DOM, no Node, no React, no clock, no randomness.
- Imports are extensionless and relative; the repo's quote and semicolon style is kept.
- The tie-break is `pairingKey` ascending.

**Never:**
- Touching `TheDepths.tsx`, `TheReading.tsx`, `App.tsx`, `types.ts` or `index.css` (other owners' lanes, entries 1.5 and 1.6).
- Scoring weights (1.3), pour content (1.2) or the reading assembler (1.4).
- Adding an Alcohol veto or a vessel field.
- Using `dangerouslySetInnerHTML`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Valid request | Full v3 answers | `parseRevealRequest` returns typed data | N/A |
| Unknown key at any depth | extra key at the root, or in `gravity` or `texture` | rejected | zod error, never thrown to the UI |
| Trace or diagnostics on the wire | `trace` or `diagnostics` key | rejected | as above |
| Bounds | name `''`, name of 41 characters, control character, gravity 101 or 2.5, 4 words, duplicates, out-of-order words | rejected | as above |
| Absent optional answers | lens null, seed null, empty records and lists | accepted | N/A |
| Label → id | `'Someone else'` or `'Another side of me'` → `another-side`; `'Pamplemousse Rosé'` → `pamplemousse-rose` | id | unknown label → `null` |
| Stub shortlist | 5 eligible records and veto `nuts` | first 3 non-nut pairings by key, deterministic | fewer than 3 eligible → returns what exists, and the floor is the validator's job (1.2) |

</frozen-after-approval>

## Code Map

- **Where to work:** every edit goes in the git worktree `/Users/robin.molinas/Documents/GenAI Projects/Dionysus-matching-core/Cocktail_Website_Agent/dionysus-experience` (branch `matching-core`). Never edit the main checkout at `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/`, because other sessions are working there. Do not commit. Run npm in the worktree app folder; it has no node_modules until `npm install`.
- `src/components/TheDepths.tsx` holds today's label lists: `RES_QUESTIONS` (~l.183–195: soughtFor is now asked first, drawnToward second; order is irrelevant to ids), `FIN_FLAVORS` (l.215), `FIN_VETOES` (l.220), `BINARIES`, `GRAVITIES`, `LENSES` (l.337, last is now `'Another side of me'`; the legacy `'Someone else'` must also map to `another-side`) and `SEEDS` (l.354). H5 renders through the new `src/components/ResonanceWorld.tsx`. Copy the labels into the vocabularies, and do not edit either file.
- `dionysus-experience/src/data/archetypes.ts:4` defines the `ArchetypeId` union, 12 values with `'Regular Guy'` containing a space. `shared/pairing.ts` re-declares the list. The data file moves later (1.7), so don't import from `src/`.
- `tsconfig.json` references the app and node configs. `tsconfig.app.json` includes `src`, with lib DOM. `tsconfig.node.json` includes `vite.config.ts`.
- `package.json`: `build` runs `validate:images && tsc -b && vite build`. There is no test script and no zod or vitest.
- `eslint.config.js` is a flat config with no import restrictions.
- Matching reference: `agent/matching/matching.py` `select_shortlist` (veto filter, sort `(-score, key)`). 1.3 adds the score.

## Tasks & Acceptance

**Execution:**
- [x] `package.json` / lock: add `zod@^4.6.5` (dependency) and `vitest@^5.0.3` (dev). Add the scripts `"test": "vitest run"`, and set build to `validate:images && tsc -b && vitest run && vite build`. Rationale: the spine's build gate runs the core tests.
- [x] `shared/answers.ts`: add the vocabularies as `as const` `{id, label}` arrays (lenses, seeds with hex, gravities with left/right, binaries with a/b, drawn, sought, flavours, vetoes); the derived id types; `idFromLabel()`; `AnswersSchema` / `RevealRequestSchema` (identical, both strict); `parseRevealRequest()`; `canonicalWords()`; the `IntakeDiagnostics` TS type; and `QUESTIONNAIRE_VERSION = 3`. Rationale: AD-1 and AD-2, and a single source for every list.
- [x] `shared/pairing.ts`: add `ARCHETYPES`, `Archetype`, `PairingKey` (template literal), `pairingKey()`, `parsePairingKey()` and `ALL_PAIRINGS` (132, ordered). Rationale: AD-11.
- [x] `shared/selection/index.ts`: add `EligibilityRecord {pairing, contains}`, `selectShortlist(req, records, score?)`, which filters vetoes, then sorts by score rounded to 9 decimals descending and then by key, then slices 3 (the score defaults to 0 until 1.3), and `boundedPick(shortlist, pick)`. Rationale: AD-3 and AD-4, and a contract both shells and 1.3 build on.
- [x] `shared/*.test.ts`: tests for the matrix above, plus 132 unique keys, no self-pairs, `regular-guy-sage` formatting, determinism under input reordering, and `boundedPick` fallback.
- [x] `tsconfig.shared.json` (new; lib ES2023 only, no DOM, includes `shared`) is referenced from `tsconfig.json`. `tsconfig.app.json` include becomes `["src", "shared"]`. Add `vitest.config.ts` (environment node, `shared/**/*.test.ts`) to `tsconfig.node.json`. Rationale: the spine's rule that shared gets ES lib only.
- [x] `eslint.config.js`: `no-restricted-imports` blocks `shared/**` from importing `react*`, `node:*`, `../src/*`, `../server/*` and `../api/*`, and blocks `src/**` from importing `server` or `api`. Rationale: the spine's dependency diagram.

**Acceptance Criteria:**
- Given the worktree, when `npm run build` runs, then the type check (including `tsconfig.shared.json`), vitest and the Vite build all pass, and the bundle still builds the unchanged journey.
- Given a `shared/` file that references `window` or imports `react`, when `tsc -b` or `npm run lint` runs, then it fails. This was checked once with a throwaway edit.
- Given `npm run lint`, when compared with the 2026-09-29 baseline (40 problems), then no new problem comes from the new files or configs.

## Implementation Notes

- 2026-10-08: implemented by a fresh build agent in the worktree (branch `matching-core`, uncommitted). The diff since the baseline was read and checked against every task; every matrix row has a passing test.
- Files: `shared/answers.ts`, `shared/pairing.ts`, `shared/selection/index.ts` and 3 test files (34 tests); `tsconfig.shared.json` and `vitest.config.ts` (new); `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `package.json` and the lock.
- Additions beyond the task list: `legacyLabels` on the another-side lens; the helpers `isPairingKey` and `comparePairingKeys` (plain `<`/`>` comparison, not locale-aware); `boundedPick([])` returns `null`; `canonicalWords` caps at 3 in vocabulary order.
- Verified 2026-10-08:
  - `npm run build` passes: validator, `tsc -b` (including the shared config), vitest 34/34, and the Vite build.
  - Lint shows 39 problems, the same set as the baseline. The baseline is 39, not the 40 assumed in the spec; no new problems.
  - Throwaway boundary edits failed as expected: `window` in `shared/` fails `tsc`; `react`, `node:fs` and `../src` imports fail lint.
- Notes for later tickets:
  - React in `shared/` is caught by lint only, because React types resolve without the DOM. That satisfies the criterion ("tsc or lint").
  - Duplicate records for one pairing are not deduplicated by `selectShortlist`. The 1.2 validator must reject duplicates.
  - The 1.3 scorer must return finite numbers.
  - Half-way rounding differs between JS `Math.round` and Python `round()` at the 9th decimal. Watch for this in the 1.3 parity check.

- Review pass 1 patches applied (triage rows 1–6): unique, capped vetoes; names reject Cf/Zl/Zp characters and are counted in code points; the ESLint shared block bans every package except zod (and vitest in tests) plus `window`/`document`/storage globals; relative paths out to src/server/api are blocked by an anchored regex. Re-verified: build passes, 36/36 tests, lint at the 39 baseline. Known limit: the relative-path regex can't tell how deep a file sits, so a future `shared/api` folder would be blocked falsely.

## Spec Change Log

## Review Triage Log

Pass 1, 2026-10-08. Layers: blind-hunter, edge-case-hunter, verification-gap.

| # | Finding (layer) | Verdict | Evidence | Route |
|---|---|---|---|---|
| 1 | `vetoes` accepts duplicates and unbounded length (blind, edge) | low | `z.array(z.enum(...))` has no max or uniqueness check; every other list has both. | patch |
| 2 | Name allows Cf/Zl/Zp characters, e.g. a name of only U+200B, or U+202E (blind, edge) | medium | `/\p{Cc}/u` covers Cc only. The name is rendered in the reveal and the OG image, so an invisible or spoofed dedication is possible. | patch |
| 3 | Name `.max(40)` counts UTF-16 units (blind, edge) | low | Emoji count as 2 units; the fix is a direct correction. | patch |
| 4 | ESLint `globals` in the shared block is ineffective (blind, edge) | low | Flat config merges `languageOptions.globals` with the base block's `globals.browser`. The no-DOM rule actually rests on tsconfig.shared.json. | patch |
| 5 | The shared import rule allows any other npm package (blind) | medium | Patterns list only React and `node:*`, so `@vercel/analytics` or `vite` would pass. This erodes the spine's "shared → nothing". | patch |
| 6 | The src rule's `**/server` and `**/api` globs over-match (blind, edge) | medium | The edge layer verified that `react-dom/server` matches, and a future `src/api` client would fail lint. | patch |
| 7 | JS `Math.round` vs Python `round()` at 9 decimals (blind, edge) | low | Both production shells run the same TS, so they cannot diverge. Only the 1.3 Python parity check is affected, and 1.3 owns the rounding rule (Implementation Notes). The fix is a cross-language decision, not a direct correction. | rejected (low) |
| 8 | NaN or non-finite injected scores break the comparator (blind, edge) | low | The only caller passes the stub, which returns 0. 1.3's scorer must return finite numbers, and that guarantee belongs to 1.3. | rejected (low) |
| 9 | Duplicate records produce a duplicate shortlist (blind, edge) | low | There is no caller yet. The 1.2 store validator rejects duplicate pairings (Implementation Notes). | rejected (low) |
| 10 | `idFromLabel` fails on a straight apostrophe or NFD text (blind, edge) | low | Labels come from the same vocabulary once 1.6 imports it, and nothing stores labels. Normalisation would add surface for an input no caller produces. | rejected (low) |
| 11 | Keys holding `undefined` survive in-process but not over JSON (edge) | false | Absent and undefined keys score identically (neutral). There is no behavioural difference between the shells. | rejected (false) |
| 12 | Dynamic `import()` or an alias bypasses the boundary (edge) | low | No alias is configured, and no dynamic import exists or is planned in shared/. | rejected (low) |
| 13 | `ARCHETYPES` and `src/data/personas.ts` `personaKey` are separate key sources with no parity test (blind, verification-gap) | medium | Shared root cause: src keeps its own archetype list and slug rule until 1.7 moves the data. A future rename would split the image keys from the pairing keys. Pre-existing duplication. | defer → 1.7 |

## Design Notes

The wire and record shapes are the same object, because `Answers` is already trace-free. The browser keeps the trace and the diagnostics in a separate `IntakeRecord` (1.5/1.6), so no projection step exists that could leak them.

Texture shape: `z.strictObject` with each of the 9 keys `.optional()` holding `z.enum(['a','b'])`.

Gravity: `z.int().min(0).max(100)` per optional key.

`IntakeDiagnostics` follows the current `intake-contract.md` (2026-10-06 revision): it has `example: 'chosen' | 'notTouched'` and no practice ms or repeats. H4 has no timed practice any more.

## Verification

**Commands:**
- `npm install` -- expected: lock updated, no peer errors
- `npx vitest run` -- expected: all shared tests pass
- `npx tsc -b` -- expected: clean
- `npm run build` -- expected: success
- `npm run lint` -- expected: no new problems against the baseline
