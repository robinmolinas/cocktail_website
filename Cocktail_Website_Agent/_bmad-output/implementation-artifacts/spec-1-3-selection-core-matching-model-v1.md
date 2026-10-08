---
title: '1.3 Selection core implementing matching model v1'
type: 'feature'
created: '2026-10-08'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'a4087f5786c0a6d6c618fb845c2001e1a997378d'
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 3'
worktree: '{project-root}/Dionysus-matching-core (branch matching-core)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Selection still defaults to zero scores. The imported cocktails cannot yet be ranked from the guest's answers.

**Approach:** Implement matching v1 in shared/, with Python consuming the same data. Verify identical shortlists and refresh evidence.

## Boundaries & Constraints

**Always:**
- Keep weights, shipped scales and nine drawnToward words; evidence regeneration reads scales, never replaces them. Missing groups are neutral. Centre words over the full round; gravity is linear around 50; texture uses half the pole difference. Group order: drawnToward, soughtFor, gravity, texture.
- Score = primary motive + secondary expression + phi times chosen flavour strengths. Filter vetoed pours, compare at nine decimals with Python-compatible rounding, break ties by pairingKey and take three.
- Only supplied catalogue entries are authored; every status is eligible. Store validation owns floors. Preserve boundedPick, including null for an empty pool.
- Preserve scorer injection. Compute motive/expression once per request; use supplied flavour strengths. Absent flavour is zero only for synthetic eligibility records.

**Never:** Tune weights, implement Q12, change content, edit src/, integrate the reveal, call the Bartender, deploy or commit. No DOM, Node, network, clock or randomness in shared/. Name, lens, seed, trace and diagnostics never affect scores.

## I/O & Edge-Case Matrix

| Scenario | Input | Expected behaviour | Error handling |
|---|---|---|---|
| Coverage | 132 witness answer sets | Each intended pairing leads; full shortlist equals Python | Test failure |
| Neutral intake | Empty groups or midpoint gravity | Zero persona signal; empty intake leads caregiver-creator | Valid input |
| Vetoes | Any of 32 veto combinations | No vetoed pour; three candidates with current store | Store gate owns floors |
| Tie | Equal rounded scores, including negative boundaries | Lexical pairing order matches Python | Test failure |
| Sparse pool | Supplied subset or no records | Only supplied pairings; short list or empty list | No invented pour |

</frozen-after-approval>

## Code Map

App root: `{project-root}/Dionysus-matching-core/Cocktail_Website_Agent/dionysus-experience`. Paths below are relative to it; braces group sibling files.

- `shared/{answers,pairing}.ts`: intake and identity helpers; parse regular-guy correctly.
- `shared/selection/index.ts`: stub default, ScoreFn and boundedPick.
- `shared/data/{catalogue.json,schema.ts}`, `shared/validate.ts`: validated CatalogueEntry and floors.
- `../agent/matching/{matching,analyze,render}.py`: reference math and evidence tools.

## Tasks & Acceptance

**Execution:**
- [x] `shared/selection/model-v1{,.scales}.json` -- relocate data unchanged; update readers/references; remove old authoritative copies.
- [x] `../agent/matching/{matching,analyze}.py` -- read shared data; derive identity from known pairs; keep absent pairings unauthored. Read shipped scales normally; calibration may compare, never overwrite.
- [x] `shared/selection/{scoring,index}.ts` -- implement centred vectors, role weights, flavour fit and default scoring; retain injection.
- [x] `../agent/matching/export-fixtures.py`, `shared/selection/reference-v1.json` -- export Python answers/shortlists for all witnesses plus flavour/veto/sparse cases; add --check and SHA-256 provenance for model, scales, catalogue, witnesses and reference implementation.
- [x] `scripts/check-selection-reference.ts`, `package.json` -- gate tests/build on provenance freshness. Always check shared inputs; check Python/witness sources when present, skipping absent analysis sources only in the standalone deployed copy.
- [x] `shared/selection/{scoring,coverage,selection}.test.ts` -- test the matrix, group contributions, context independence, input immutability and reordering. Complete and canonicalize fixture requests before strict parsing.
- [x] `../agent/matching/{render.py,fixtures-v1.json,reachability-v1.*,distribution-v1.*}`, `../agent/spec/matching-model.md` -- refresh evidence and source/count/date prose; distinguish simulation from observations.

**Acceptance Criteria:**
- Given the reference corpus, when tests run, then every shortlist matches Python and 132/132 witness targets lead.
- Given stale provenance, when tests/build run, then they fail; a standalone deployment still checks shared inputs.
- Given shared inputs, when reports regenerate, then weights/scales stay unchanged and reports show 132 authored, 105 veto-free.
- Given the baseline, when verification runs, then tests/build/types pass and lint adds no problems to the existing 39; src/ stays untouched.

## Implementation Notes

- Robin delegated the choice on 2026-10-08 ("whatever you recommend"); approved the spec and continued implementation in the clean matching-core checkout.

- Implemented in the matching-core checkout; no src/ or content edits and no commit. Model and scale moves retain their original bytes (Git reports 100% similarity).
- The initial fresh implementation agent could not execute writes under automatic approval review; the parent completed the implementation from the approved spec. SciPy analysis used the existing workspace virtual environment after uv cache installation failed.
- Regenerated reachability and distribution from the validated shared store and fixed shipped scales: 132 authored, 105 veto-free, 132 persona-only leads; the 132 witness answer sets were unchanged byte for byte. Exported 398 Python shortlist cases with six SHA-256 source hashes and 17 rounding cases.
- Matrix audit: coverage.test.ts runs all 132 targets and full shortlists; scoring.test.ts checks empty/midpoint neutrality; selection.test.ts covers 32 veto sets and injected positive/negative ties; coverage.test.ts and selection.test.ts cover sparse/empty supplied pools. All covering tests ran and passed.
- Verification before review: 549/549 tests passed; strict build passed including types, catalogue freshness and parity. The runner forbids directory deletion even on approved runs, so Vite uses a fresh output folder; gate tests preserve temporary scratch evidence only when cleanup returns EPERM.
- Review patches bind completed reachability and witness outputs to the input snapshot, reject changed sources and stale outputs, exercise the default production-catalogue path against Python, and compare group, motive, expression and all pairing scores for three representative inputs at a 5e-13 tolerance. Seven Python regression tests cover success, interrupted solvers, failed witness writes, edits during loading/solving, stale sources/outputs and distribution-only runs.
- Final verification on 2026-10-08: 550/550 app tests (12 files) and 7/7 Python report checks pass; npx tsc -b is clean; the strict production build passes at /private/tmp/dionysus-story-1-3-build-20261008-1324. Lint remains 39 errors only in unchanged TheDepths.tsx, zero warnings and no changed-file errors. The 398-case Python reference is fresh; full analysis and rendering completed with 132 persona-only leads, 132 authored and 105 veto-free, unchanged shipped model/scales and unchanged witness bytes. src/ remains untouched and the final diff passes whitespace checks.
- All 13 review findings are recorded below: six resolved in five patch groups, four pre-existing analysis issues deferred, and three rejected with specific evidence. The refreshed unified diff is /private/tmp/bmad-story-1-3-20261008-1214.diff (405,702 bytes), including the untracked Python regression tests. No commit, push, deployment or reveal integration was performed, in accordance with the approved frozen intent.

## Spec Change Log

## Review Triage Log

All three independent review layers completed before triage. Each finding was classified before grouping; V1 is the verification layer's pre-verified gap. The original implementation child is unavailable in the current agent tree, so the parent applies the prescribed small patches.

| Finding | Verdict | Evidence and route |
| --- | --- | --- |
| B1 — premature completion flag | medium | `analyze.py` saves `reachability_regenerated: true` before the solver and either reachability output. An interrupted solver leaves old rows accepted by `render.py` under new metadata. Patch: start incomplete and mark complete only after both outputs and their hashes are saved. |
| B2 — unchecked report provenance | medium | `render.py` reads the metadata but never checks its input hashes; its separately loaded reachability rows are not bound to that analysis. Editing a shared input or replacing a report file therefore renders stale evidence. Patch: verify shared-source hashes and completed output hashes before rendering. |
| B3 — experimental phi replaces canonical evidence | medium | Baseline `analyze.py` already accepted `--phi` and overwrote the canonical distribution, reachability and witnesses. New metadata records the effective phi, but the reachability prose still implies shipped configuration. Defer the pre-existing experimental-output isolation issue. |
| B4 — hesitant missing rate | medium | The unchanged sampler inherits 10% missing choices and removes 30% of the rest, yielding 37%; the baseline renderer already said 30%. Developers cannot reproduce the distribution from that assumption. Defer this pre-existing sampler/prose mismatch. |
| B5 — coherent exponent | medium | The unchanged sampler computes `exp(2 * (primary + 0.7 * secondary))`, while the baseline renderer already printed `exp(2 * primary + 0.7 * secondary)`. Defer the pre-existing reproducibility error. |
| B6 — invalid model values | low | Invalid developer-edited JSON can produce non-finite runtime scores, but shipped inputs remain byte-identical and the build freshness gate rejects edits; Python reference export also fails on missing roles or zero scales. Such unsupported input edits are unlikely in everyday use, and comprehensive runtime guards add branches and a validation surface. Reject under the low-severity complexity rule. |
| B7 — duplicate supplied records | low | The supplied-array selector can repeat keys, as could the baseline filter/map/sort/slice implementation. The committed catalogue and normal build path reject duplicate pairings in `validateCatalogue`; all supported parity pools are unique. Duplicate synthetic caller data is rare, and the proposed new guard adds behavior and branches. Reject under the low-severity complexity rule. |
| B8 — numeric parity gap | medium | Current corpus assertions check ranking; the role-composition tests compare values computed by the same scorer. A small uniform error in role contributions can preserve rankings and those assertions. Patch: export independent Python group, motive, expression and pairing values for complete, missing-group and conflicting inputs, and compare with an explicit tolerance. |
| B9 — shortlist-only witnesses fail export | false | This build's approved matrix requires all 132 target witnesses to lead, and all current witnesses do. A shortlist-only witness violates that acceptance criterion; failing export is the required stale-witness signal, not rejection of a valid current corpus. Reject. |
| B10 — hardcoded final-choice cell | low | The renderer ignores the computed `final_choice` for an unreachable or unverified row. This literal and the misleading witness heading are unchanged from baseline; all current 132 rows lead, so current results are accurate. Defer the pre-existing renderer defect for non-leading rows. |
| E1 — solver failure leaves accepted old rows | medium | Independently confirms B1: the distribution is saved as complete before the solver starts. Same demonstrated defect; group with B1 and apply the completion patch once. |
| E2 — provenance captured after computation | medium | Hashing shared files only at the end can identify edited bytes rather than those loaded before a long analysis. Patch: capture before loading and check unchanged after loading, before publishing distribution and after reachability. |
| V1 — default-catalogue flavour parity | medium | Pre-verified: all corpus calls supply explicit records; default-path tests use empty flavours or compare two equally regressed calls. Dropping production flavour strengths would pass them. Patch: compare the omitted-records path to Python for every full-store case. |

Surviving patch groups: B1/E1 completion, B2 report provenance, E2 input snapshot, B8 numeric parity, V1 default-path parity. No intent or specification loopback is required. B3/B4/B5/B10 are appended separately to deferred-work.md.

## Verification

From the app: `npm test`, `npx tsc -b`, `STRICT_STORE=1 npm run build`, `npm run lint`, and `python3 ../agent/matching/export-fixtures.py --check`.

Evidence: `uv run --with scipy --with numpy python -I ../agent/matching/analyze.py`, then `python3 ../agent/matching/render.py` and reference export before final verification.

Report regressions, from Cocktail_Website_Agent with the analysis Python environment: `python -B -m unittest discover -s agent/matching -p test_evidence.py`. The existing ACN_VIDEO_PC_demo/work/.venv Python environment supplied SciPy/NumPy for this run; no new dependencies were installed.

## Completion (2026-10-08, taken over by the matching owner)

- The stored reference differed from a fresh export in the last floating-point digit of the three numeric cases (written before the final numeric patch); regenerated and confirmed stable across hash seeds and both Python environments.
- Committed as 32e8013, rebased onto 1.4 (f2b2838): 899/899 tests, types clean, reference fresh.
- Adopted Tomás's reviewed flavour rules (67b57ef): magician-ruler and outlaw-hero gain fruity 1; magician-ruler and caregiver-explorer lose smoky 0.3. Re-ran analysis: 132/132 persona-only leads, witnesses unchanged, distribution moved only in the third decimal. Rye kept at spicy 0.4 per measurement. Strict build, lint baseline 39, studio tools and Python report tests pass. Fast-forwarded into experience-revamp-2026-09.
