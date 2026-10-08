---
type: epic
title: "Answers select an authored pour in the browser"
parent: initiative-dionysus-continuation
covers: [CAP-1, CAP-2, CAP-4, CAP-6, CAP-7, CAP-8]
after: []
assignee: ""
risk: high
---

# Answers select an authored pour in the browser

## Description

This epic builds the functional core (`dionysus-experience/shared/`) that the spine requires. The core holds:

- Answers v3 and its vocabularies;
- the authored 132-pour catalogue imported from the Pour Studio;
- the deterministic shortlist from matching model v1;
- the bounded pick rule;
- `assembleReading`.

The App's normal journey then reveals the selected authored pour, using the local authored path (AD-9 fallback) until epic 2 adds the server. Every rule is pure and shared, so epic 2's API calls the same functions.

## Outcome

A guest's answers, on desktop or phone, select one of the 132 authored pours and the reveal shows it exactly as authored. Evidence: the CAP-8 reports and coverage fixtures.

## Requirements

- E1-R1 (CAP-1): `shared/answers.ts` declares the v3 vocabularies with permanent ids, `Answers` v3, `RevealRequest` (strict zod at every level, no trace) and `IntakeDiagnostics` (browser-only), per `agent/spec/intake-contract.md`. TheDepths imports the vocabularies.
- E1-R2 (CAP-4, CAP-6): an import turns the 132 dossiers + specs into `shared/data/pours` keyed by `pairingKey`, without rewording recipe or copy, carrying status, `contains` and flavour strengths. The validator fails the build on missing fields, a dossier/spec mismatch, or a breach of the development floor. `STRICT_STORE=1` enforces the launch gate.
- E1-R3 (CAP-2, CAP-8): `shared/selection` implements matching model v1 (`agent/spec/matching-model.md`) from `model-v1.json` + `model-v1.scales.json`:
  - pipeline: score, drop unauthored/vetoed, top 3 with 9-decimal comparison, pairingKey tie-break;
  - `boundedPick(shortlist, pick)`;
  - output identical to the reference implementation on every fixture.
- E1-R4 (CAP-7): `shared/reading.ts` provides `assembleReading(pairing, copy | null, name, seed)` and `acceptTailoring`, and `TheReading` renders a `Reading` (epigraph, whoYouAre, yours, The Ritual ending on `closingLine`).
- E1-R5 (CAP-1, CAP-6): `App` builds `Answers` v3 from the journey and reveals `assembleReading(shortlist[0], null, …)`. The fixed `VISIONARY_SAMPLE` becomes a dev fixture only. The legacy `craftCocktail` path retires.
- E1-R6 (CAP-8): the coverage tests replay `fixtures-v1.json` (132/132 lead) through the TS core. The reports are regenerated whenever weights, vocabulary or catalogue change.
- E1-R7 (Constraints): privacy checks (trace, name and diagnostics boundaries) and desktop/mobile answer parity are tested.

## Done when

1. `npm run build` runs the import validator and the core test suite, and both pass. They include 132/132 coverage fixtures leading as in `reachability-v1.md`, the veto-filter and floor tests, determinism, and nested-strict rejection.
2. A desktop (1440×900) and a phone (390×844) walkthrough with two different fixture answer sets reveal two different authored pours. Each pour's recipe, method, glass and reading text match its dossier verbatim.
3. A `RevealRequest` built from a completed journey contains no `trace`, no diagnostics and no unknown key. The parity test shows identical `Answers` for identical desktop and touch choices.
4. No production import of `engine/mixology.ts`, `data/cocktails.ts` or `VISIONARY_SAMPLE` remains in the normal journey. This is deployed to the Vercel production project.

## Boundaries

This epic covers the shared core and the App's local reveal. It is not the server shell, the Bartender, pour persistence or sharing (epic 2). It is not hold design (the experience conversation), pour content or approval (the Pour Studio), or images (image production). See the spec's Non-goals.

## References

- parent — Dionysus/Cocktail_Website_Agent/_bmad-output/initiative-dionysus-continuation/initiative-dionysus-continuation.md
- spec — Dionysus/Cocktail_Website_Agent/agent/spec/SPEC.md, Capabilities CAP-1, CAP-2, CAP-4, CAP-6–CAP-8
- spec — Dionysus/Cocktail_Website_Agent/agent/spec/intake-contract.md
- spec — Dionysus/Cocktail_Website_Agent/agent/spec/matching-model.md
- architecture — Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md, AD-1, AD-3, AD-4, AD-5, AD-9, AD-11, Consistency Conventions (Types & boundaries, Tests, Content gate), Brownfield Delta
- evidence — Dionysus/Cocktail_Website_Agent/agent/matching/ (model-v1.json, model-v1.scales.json, fixtures-v1.json, reachability-v1.md, distribution-v1.md, matching.py reference)
- content — Dionysus/Cocktail_Website_Agent/design-artifacts/pours/ (dossiers) and pours/_studio/specs/; ingredient table at skills/dps-tools/data/ingredients.json (workspace root, the live copy)
- constraint — Dionysus/Cocktail_Website_Agent/design-artifacts/2026-09-23-cocktail-meaning-model.md

## Notes

- Decision (2026-10-06): the tracer bullet is entry 1. It is the thinnest path through every layer: one vocabulary and schema in `shared/`, one hand-written pour record and `selectShortlist` stub, a vitest run, and `tsc -b` covering `shared/` from both tsconfigs.
- Decision (2026-10-06): lanes.
  - Matching owner: `shared/`, the import and the tests.
  - Design owner: `TheDepths.tsx` (entry 6).
  - Integration owner: `App.tsx`, `types.ts` and `TheReading` props (entries 5 and 7).
  - One writer per file at a time, per the continuation plan.
- Decision (2026-10-06): the bounded final choice is built here as a core rule (`boundedPick`). The LLM call that exercises it is epic 2.
- Decision (2026-10-06): the reveal uses all authored pours, with status visible in development. Release also serves all 132 authored pours (Robin, 2026-10-08).
- Assumption: the dossier markdown layout (Cocktail table, `**contains:**`, Anchors table, Reading blocks) is stable enough to parse. The import fails loudly on any deviation and never guesses.
- Unknown: entry 9 (Q12 words) has Robin's label approval as of 2026-10-08: Knowledge, Influence, Making, Caring. Implementation, coverage refresh and the actual 12-sphere world-layout check remain.
- Known gap: personas.ts / image registry. 17 public image pairs exist; the image queue separately records 115 generated candidate scenes, none newly accepted/integrated at the 2026-10-08 document check. Missing registered pairs use `_fallback.jpg` per AD-11. That is not a blocker, and it is recorded for the image owner.
