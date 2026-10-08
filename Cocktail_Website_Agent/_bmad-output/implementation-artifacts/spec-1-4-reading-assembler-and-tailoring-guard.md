---
title: '1.4 Reading assembler and tailoring guard'
type: 'feature'
created: '2026-10-08'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'a4087f5786c0a6d6c618fb845c2001e1a997378d'
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 4'
worktree: '{project-root}/Dionysus-reading-assembler (branch reading-assembler)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The imported pours have no shared reading payload or tailoring guard for browser/API surfaces.

**Approach:** Add a synchronous, pure reading assembler joining identity, the authored cocktail and reading, image geometry, name and seed. Accept live `yours` only when it passes the shared guard.

## Boundaries & Constraints

**Always:**
- Preserve authored text, recipe fields and image coordinates. Null/rejected copy uses authored `yours` verbatim; accepted copy changes only `yours`. All statuses remain usable.
- Require the same paragraph count, aggregate character length within inclusive ±30%, and at least 50% of authored content words retained. Malformed copy falls back silently.
- Use the existing image fallback for valid pairings without metadata. Invalid/self/unknown pairings fail clearly rather than returning another cocktail.
- Pass name and nullable seed through without rewriting prose. Returned data cannot mutate canonical sources or another reading.

**Never:** Change authored JSON/content, selection, App, TheReading, TheDepths, styling or image assets; call the Bartender, integrate the reveal, deploy or commit. No DOM, Node, network, clock, randomness or browser imports in shared/.

## I/O & Edge-Case Matrix

| Scenario | Input | Expected behaviour | Error handling |
| --- | --- | --- | --- |
| Authored fallback | Each pairing, copy:null | Complete authored cocktail and all three reading blocks verbatim | Test failure |
| Accepted tailoring | Same paragraphs, passing length and words | Replace only yours; retain accepted copy | Valid input |
| Failed tailoring | Shape/count/length/words fail | Authored yours, copy:null | Silent fallback |
| Missing image | Valid pour without registered geometry | Existing _fallback.jpg and coordinates | Valid input |
| Invalid identity | Malformed, self or unknown key | No substituted pour | RangeError |
| Isolation | Mutate candidate/output; assemble again | Inputs and later readings unchanged | Test failure |

</frozen-after-approval>

## Code Map

App root: `{project-root}/Dionysus-reading-assembler/Cocktail_Website_Agent/dionysus-experience`. Paths below are relative to it.

- `shared/data/schema.ts` -- reuse Cocktail/AuthoredPour, including optional fields and blank recipe cells; anchors stay internal.
- `shared/data/pours/index.ts` -- lazy POUR_LOADERS; its generator is `shared/import/emit.ts`, called by `scripts/import-pours.ts`.
- `src/data/{archetypes,personas}.ts` -- pure data; all 132 identity names match pour.personality, with 17 images registered. Relocate and re-export.
- `shared/{pairing,answers}.ts` -- reuse parsePairingKey/SeedKey; avoid findPairing's legacy fallback on invalid keys.

## Tasks & Acceptance

**Execution:**
- [x] `shared/data/{archetypes,personas}.ts`, `src/data/{archetypes,personas}.ts` -- relocate unchanged and keep re-export shims; bring forward this prerequisite from 1.7.
- [x] `shared/import/emit.ts`, `scripts/import-pours.ts`, `shared/data/pours/static.ts` -- generate a deterministic static AUTHORED_POURS registry alongside the unchanged lazy index. Preserve sparse-store semantics and all existing output bytes; include the new file in import checks.
- [x] `shared/reading.ts` -- export Reading, LiveCopy, acceptTailoring(authored, tailored) and assembleReading(pairing, copy|null, name, seed). Strictly validate copy; reject invalid/missing pour identity; clone returned data.
- [x] `shared/reading.test.ts`, `shared/import/build.test.ts`, `shared/data/catalogue.test.ts` -- cover the matrix, every pour, registry/metadata parity, tailoring boundaries and mutation isolation.

**Acceptance Criteria:**
- Given all 132 imported pours, when assembled with null copy, then identity, cocktail, epigraph, whoYouAre and yours match their canonical sources, including inline markdown and optional recipe fields.
- Given the importer, when run twice and checked, then its new registry is byte-stable and existing catalogue/pour/manifest/report/lazy-index bytes are unchanged.
- Given the baseline app, when tests, types and strict build run, then they pass; lint adds no errors to the existing 39, and frontend re-exports preserve current behaviour.

## Implementation Notes

- Robin approved continuing in this session on 2026-10-08 by delegating the recommendation and asking for a solid result. The approved intent is frozen; implementation remains isolated on reading-assembler, from the merged 1.2 baseline, with the completed 1.3 changes preserved in matching-core.
- Local setup reuses the existing matching-core node_modules through an ignored symlink; dependencies and lockfile are unchanged. Use the reading-assembler app root for commands.

## Spec Change Log

## Review Triage Log

All three independent layers completed before triage: blind hunter returned 10 findings, edge-case hunter returned none, and verification-gap returned one Other finding (no coverage-gap findings). Verdicts below were rendered individually before grouping.

| ID | Finding | Verdict | Evidence and route |
| --- | --- | --- | --- |
| B1 | Invisible-only paragraphs pass the blank check | medium | Confirmed: Zod's current trim-based refinement accepts U+200B; the supplied two-paragraph example also passes aggregate length and retention. Patch the existing blank refinement to reject whitespace/control/format-only text, preserving accepted strings, with a regression case. |
| B2 | Oversized candidates allocate before rejection | low | Confirmed that parsing copies arrays and code-point counting allocates proportionally to input. No assembler consumer currently accepts external responses, and a large candidate still fails the guard correctly. Reject: pathological input is unlikely in everyday use and the proposed early bounds add guard complexity. |
| B3 | A throwing getter escapes safeParse | low | Confirmed by executing a throwing `yours` getter through the same strict Zod schema. Such accessors cannot arrive in the specified JSON Bartender response; normal malformed JSON values already fall back. Reject: the proposed catch/alternate boundary adds complexity for an exceptional programmer-created object. |
| B4 | Symbol pairing raises TypeError during error formatting | low | Confirmed the error interpolation throws TypeError for Symbol before constructing RangeError. Patch with a constant invalid-pairing message and a regression case; this is a direct correction without new guards or public surface. |
| B5 | Changed numbers can pass word retention | false | The approved guard explicitly counts normalized letter words, with numeric/factual constraints owned by Bartender prompting and validation (spine AD-5). The numerical guard implements its declared rules; it makes no semantic fact-preservation claim. Reject. |
| B6 | Store-dependent fixtures break sparse development tests | medium | Confirmed: `creator-magician` is dereferenced during test registration and optional-feature assertions require particular imported records, while the unchanged development validator accepts any qualifying sparse store. Patch the fixture tests to use isolated explicit records; retain round trips over every actually imported record. |
| B7 | Input copy should be unknown rather than LiveCopy/null | false | The public signature matches the approved API; AD-5 validates external JSON before assembly. Casts in malformed-input tests deliberately exercise runtime defence. No caller is forced to cast validated live copy. Reject the unsolicited public API change. |
| B8 | Eager registry enlarges the initial browser bundle | false | Source searches show no frontend import of the assembler or static registry; current production behaviour is unchanged. The synchronous registry is intentional, and reveal integration/loading is expressly excluded from this ticket. No initial-bundle regression occurs in this change. Reject. |
| B9 | Dossier anchors remain in the browser bundle | false | The new registry has no frontend consumer, and assembled Reading objects omit all anchors. Existing lazy pour JSON already includes anchors. The intent requires anchors to stay out of rendered reading data, not to be confidential; no new browser exposure occurs here. Reject. |
| B10 | Direct importers can mutate canonical registry | false | Direct mutation of a public data module is possible, but the claimed output-isolation violation does not occur: every mutable Reading branch is cloned and tested. The contract governs returned data; it does not promise frozen canonical module exports. Existing archetype/persona exports must retain behaviour. Reject. |
| V1 | Archetype relocation breaks persona.py and its callers | medium | Parent confirmed `persona.py --list` returns `(0)` and read the literal parser plus the existing 132-pairing regression check. Room/brief/review tools use this parser. Patch its source path to the shared canonical file and run the existing tools checks. |

Four independent survivors route to patch: B1, B4, B6 and V1. None requires intent renegotiation or a spec-level change; none is deferred.

Resolution: the same implementation agent fixed all four with no public API change. The parent read the patch diff: the existing blank refinement rejects whitespace/control/format-only strings, invalid pairing errors use a constant message, fixture tests install and restore independent records, and the studio parser reads the relocated canonical file. All focused checks passed (344 reading tests and 20 existing studio-tools checks); the parent then reran full app verification successfully. No unresolved in-scope findings or deferred work remain.

## Design Notes

Intent gaps: none. Irreversibles: none. Footprint: 11 paths, including two data moves/shims, a generated registry and the new reading API/tests.

Reading contains pairing, archetype, cocktail, epigraph, whoYouAre, yours, persona, name, seed and copy (LiveCopy|null). A separate static registry makes assembly synchronous without changing existing lazy callers.

Guard choices: paragraph arrays contain nonblank strings; length is the sum of Unicode code points. Content words are case/Unicode-normalized letter words, excluding an explicit English function-word list, with apostrophes normalized and no stemming. Retention counts token occurrences with multiset intersection, so repetition cannot manufacture matches. Compare thresholds with integer arithmetic; a baseline with no content words is rejected. Preserve accepted strings exactly.

## Verification

From the app: `npm test`, `npx tsc -b`, `STRICT_STORE=1 npm run build` (fresh temporary output if cleanup is restricted), `npm run lint`, `npm run import:pours:check`. Confirm unchanged authored JSON, image files and relocated data literals against the baseline.

Implementation audit (2026-10-08): the parent read the complete unified diff, including untracked files, and verified all tasks and acceptance criteria. All six matrix rows have executed passing coverage in `shared/reading.test.ts`: 132 authored payloads, 132 accepted tailorings, rejected shape/count/length/words, exact missing-image geometry, invalid/missing identities, and candidate/output isolation. The guard also covers inclusive thresholds, Unicode, repeated words and function words. The implementer reported 441/441 tests, types, strict production build and import check passing; full lint retains only the baseline 39 errors in unchanged `TheDepths.tsx`.

Both importer runs were byte-identical across 137 outputs. Existing generated files and assets are unchanged; the parent independently compared 184 authored/generated/public files plus both relocated data modules against the baseline bytes. Initial production build output is `/tmp/dionysus-reading-assembler.T8aRj2`.

Final parent verification after review fixes (2026-10-08): `npm test` passes 446/446 tests across 10 files with no skips; `npx tsc -b` passes; the strict production build passes images, source freshness, types, all 446 tests and Vite output; `npm run import:pours:check` reports up to date (132 pours, 105 veto-free). Full lint remains exactly 39 baseline errors in unchanged `TheDepths.tsx`; `git diff --check` is clean. The six matrix rows still have executed passing coverage, with new invisible-only, Symbol and sparse-store regression cases included.

The refreshed unified diff, including all untracked files, is `/private/tmp/bmad-story-1-4-reviewed-rpnqjoyb.diff` (239192 bytes, 3814 lines). Final production output is `/private/tmp/dionysus-story-1-4-final-20261008-1429`. The 12 changed/new paths include the studio parser compatibility correction. Changes remain uncommitted on `reading-assembler` as required by the approved Never boundary; no push, merge, deployment or reveal integration was performed.
