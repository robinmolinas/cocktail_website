---
title: '1.7 Retire the legacy engine and retired answer fields'
type: 'refactor'
created: '2026-10-13'
status: 'done'
baseline_commit: 'cf75d74e6b13e79b0f29ca0a0987eeed7bd2fa7e'
route: 'oneshot'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 7'
worktree: '{project-root}/Dionysus-retire (branch retire-legacy-engine, from experience-revamp-2026-09 cf75d74)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** After 1.5 and 1.6 the pilot generator and its data are dead code that nothing imports: `src/engine/mixology.ts`, `src/data/cocktails.ts`, `src/data/questions.ts`, `src/data/sampleResult.ts` (`VISIONARY_SAMPLE`), and `src/types.ts` (the retired paper-quiz `Answers`, `CocktailResult`, `AgentLines`, `Ingredient`). `src/data/archetypes.ts` and `src/data/personas.ts` are two-line re-exports of `shared/data`. The live repo guide `AGENTS.md` and the app README still point readers at them, including "register images in `src/data/personas.ts`".

**Approach:** Delete those files, and keep the archetype and persona data in `shared/data` (it already lives there). Point the live docs (`AGENTS.md`, `dionysus-experience/README.md`) at the shared core: `shared/selection`, `shared/reading`, and `shared/data/personas.ts` for image registration. Dated design logs, specs, memlogs and image-production records stay as written. No behaviour, copy or visual change.

Decision (Robin, 2026-10-13): "continue with what you recommend, if there is anything that will change the experience or break something let me know".

</frozen-after-approval>

## Implementation Notes

- Deleted (git rm): `src/engine/mixology.ts`, `src/data/{cocktails,questions,sampleResult,archetypes,personas}.ts`, `src/types.ts`. Before deleting, I confirmed no live file imports them: they only referenced each other.
- `src/data/` now holds only the tracked impeccable cache (`src/data/.impeccable/hook.cache.json`). It belongs to that tool, so I left it.
- `shared/pairing.ts`: the comment now points at `shared/data/archetypes.ts`. The list stays re-declared there, so the pairing keys never load the archetype data and stories.
- Live docs updated:
  - `dionysus-experience/README.md`: the old "Engine & Scoring (mixology.ts)" section is now "Matching & Reading (shared/)", and image registration points at `shared/data/personas.ts`.
  - `AGENTS.md`: the repo map drops `data/` and `mixology.ts` and adds `shared/`, and image registration points at `shared/data/personas.ts`.
- Not touched: dated design logs, specs, memlogs and image-production JSON records that name the old paths. They are records of their time.
- Evidence of no behaviour change: the landing chunk hash is unchanged (`index-CMakXtWH.js`, the same as the 1.6 build). Results: 946 tests pass, `tsc -b`, the build and the landing check pass, and lint is at 39.

- Review fixes:
  - The live Pour Studio tool `GenAI Projects/skills/dps-tools/scripts/persona.py` (workspace root, outside git) read `src/data/archetypes.ts`. It had found no pairings since 2026-10-08, when that file became a re-export, and would have crashed once the file was deleted. I synced its two path lines to the in-repo copy, which already pointed at `shared/data`, and kept a backup in the session scratchpad.
  - Doc paths updated in DESIGN.md, persona-image-system.md, docs/SOURCES.md and the `_archive` README revival note.
  - The README reading section now reflects the four movements and `boundedPick`.
  - `ArchetypeId` is now `Archetype` from shared/pairing.
- Walkthrough evidence: every built JS, CSS and HTML file is byte-identical to the 1.6 build (shasum diff of `dist/`), so the dawn and night reveals on desktop and phone are unchanged.

## Review Triage Log

Blind hunter only (the oneshot route has one layer).

| # | Finding | Verdict | Evidence / route |
|---|---|---|---|
| 1 | The live root persona.py reads the deleted `src/data/archetypes.ts` | high | Confirmed: `persona.py creator-hero` → "no pairing" before the fix, and a FileNotFoundError after the deletion. Patched (two lines synced from the in-repo copy); it works after. |
| 2 | DESIGN.md, persona-image-system.md and docs/SOURCES.md name the deleted files | medium | Confirmed at the cited lines. These are live docs (impeccable, the image rule of record). Patched. |
| 3 | The `_archive` README gives revival steps that now fail | low | Confirmed: archived components import `../types`, `../data/questions` and `../data/personas`. Patched with a note pointing at cf75d74. |
| 4 | The 1.1 deferred item (personaKey vs pairingKey) was assigned to 1.7 and left open | medium | Confirmed it was open. The risk is already pinned by catalogue.test "registered scene … for all 132 pairings"; marked resolved with that evidence. personaKey is kept (it takes strings and has no same-archetype guard). |
| 5 | `ArchetypeId` duplicates `Archetype` with no parity test; stale "engine" header | low | Confirmed. Direct correction: a type-only alias. Patched. |
| 6 | The spec says lint "passes" when eslint exits non-zero at 39 | low | True, but the fix would edit this build's spec, so rejected. Lint is unchanged at the 39 baseline. |
| 7 | The ticket's "both walkthroughs still pass" was not recorded | medium | Confirmed it was missing. Settled by the byte-identical `dist/` diff against the 1.6 build. |
| 8 | The repo search was narrower than "repository … outside archived docs" | medium | Same root cause as 1 and 2. Re-searched src, shared, scripts, skills (root and repo) and docs. |
| 9 | The README still names TheSurfacing and agentLines, omits boundedPick and gives the wrong pour source | low | Confirmed. Patched. |
| 10 | The AGENTS.md map is incomplete (TheSurfacing, scripts, shared/import), and the README Run & Build omits commands | low | Real. Its fix edits AGENTS.md, so per the build rules it is deferred (deferred-work.md). |

## Verification

- `rg` over `src`, `shared`, `scripts` and the live docs finds no import of, or pointer to, the retired modules or fields.
- `npx vitest run`, `npx tsc -b`, `npm run build` (including the landing check) and `npm run lint` (at or under 39) pass.
- `revealReading` still gives dawn regular-guy-caregiver and night magician-outlaw (covered by `reveal.test.ts`).
