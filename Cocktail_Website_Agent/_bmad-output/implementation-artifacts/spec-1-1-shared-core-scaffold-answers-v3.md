---
title: '1.1 Shared core scaffold and Answers v3 vocabularies'
type: 'feature'
created: '2026-10-06'
status: 'draft'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 1'
worktree: '{project-root}/Dionysus-matching-core (branch matching-core, from c6a48cd90b3bed2ec84c823ac7e831afb470d308)'
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

- `dionysus-experience/src/components/TheDepths.tsx:157-345` holds today's label lists: `RES_QUESTIONS`, `FIN_FLAVORS`, `FIN_VETOES`, `BINARIES`, `GRAVITIES`, `LENSES` and `SEEDS`. Copy these labels into the vocabularies, and do not edit the file. HEAD's last lens is `'Someone else'`; the design working copy already shows `'Another side of me'`. Both map to `another-side`.
- `dionysus-experience/src/data/archetypes.ts:4` defines the `ArchetypeId` union, 12 values with `'Regular Guy'` containing a space. `shared/pairing.ts` re-declares the list. The data file moves later (1.7), so don't import from `src/`.
- `tsconfig.json` references the app and node configs. `tsconfig.app.json` includes `src`, with lib DOM. `tsconfig.node.json` includes `vite.config.ts`.
- `package.json`: `build` runs `validate:images && tsc -b && vite build`. There is no test script and no zod or vitest.
- `eslint.config.js` is a flat config with no import restrictions.
- Matching reference: `agent/matching/matching.py` `select_shortlist` (veto filter, sort `(-score, key)`). 1.3 adds the score.

## Tasks & Acceptance

**Execution:**
- [ ] `package.json` / lock: add `zod@^4.6.5` (dependency) and `vitest@^5.0.3` (dev). Add the scripts `"test": "vitest run"`, and set build to `validate:images && tsc -b && vitest run && vite build`. Rationale: the spine's build gate runs the core tests.
- [ ] `shared/answers.ts`: add the vocabularies as `as const` `{id, label}` arrays (lenses, seeds with hex, gravities with left/right, binaries with a/b, drawn, sought, flavours, vetoes); the derived id types; `idFromLabel()`; `AnswersSchema` / `RevealRequestSchema` (identical, both strict); `parseRevealRequest()`; `canonicalWords()`; the `IntakeDiagnostics` TS type; and `QUESTIONNAIRE_VERSION = 3`. Rationale: AD-1 and AD-2, and a single source for every list.
- [ ] `shared/pairing.ts`: add `ARCHETYPES`, `Archetype`, `PairingKey` (template literal), `pairingKey()`, `parsePairingKey()` and `ALL_PAIRINGS` (132, ordered). Rationale: AD-11.
- [ ] `shared/selection/index.ts`: add `EligibilityRecord {pairing, contains}`, `selectShortlist(req, records, score?)`, which filters vetoes, then sorts by score rounded to 9 decimals descending and then by key, then slices 3 (the score defaults to 0 until 1.3), and `boundedPick(shortlist, pick)`. Rationale: AD-3 and AD-4, and a contract both shells and 1.3 build on.
- [ ] `shared/*.test.ts`: tests for the matrix above, plus 132 unique keys, no self-pairs, `regular-guy-sage` formatting, determinism under input reordering, and `boundedPick` fallback.
- [ ] `tsconfig.shared.json` (new; lib ES2023 only, no DOM, includes `shared`) is referenced from `tsconfig.json`. `tsconfig.app.json` include becomes `["src", "shared"]`. Add `vitest.config.ts` (environment node, `shared/**/*.test.ts`) to `tsconfig.node.json`. Rationale: the spine's rule that shared gets ES lib only.
- [ ] `eslint.config.js`: `no-restricted-imports` blocks `shared/**` from importing `react*`, `node:*`, `../src/*`, `../server/*` and `../api/*`, and blocks `src/**` from importing `server` or `api`. Rationale: the spine's dependency diagram.

**Acceptance Criteria:**
- Given the worktree, when `npm run build` runs, then the type check (including `tsconfig.shared.json`), vitest and the Vite build all pass, and the bundle still builds the unchanged journey.
- Given a `shared/` file that references `window` or imports `react`, when `tsc -b` or `npm run lint` runs, then it fails. This was checked once with a throwaway edit.
- Given `npm run lint`, when compared with the 2026-09-29 baseline (40 problems), then no new problem comes from the new files or configs.

## Implementation Notes

## Spec Change Log

## Review Triage Log

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
