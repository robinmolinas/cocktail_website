# Epic 1 Context: Answers select an authored pour in the browser

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Replace the fixed pilot reveal with an authored cocktail selected from the guest's actual journey answers. Build a pure shared core for the versioned intake, the 132-pour catalogue, deterministic selection, bounded final choice and reading assembly, then connect it to the browser's normal journey. The same rules must later support the API shell without changing outcomes. The standard planning-artifacts directory is empty; this context is distilled from the epic, its ticket tree and the referenced canonical agent specification, intake contract, matching model and architecture spine.

## Stories

- Story 1.1: Shared core scaffold and Answers v3 vocabularies
- Story 1.2: Import the 132 authored pours with a content-gate validator
- Story 1.3: Selection core implementing matching model v1
- Story 1.4: Reading assembler and tailoring guard
- Story 1.5: App reveals the selected authored pour
- Story 1.6: TheDepths writes v3 ids and browser-only diagnostics
- Story 1.7: Retire the legacy engine and retired answer fields
- Story 1.8: Privacy and parity end-to-end checks
- Story 1.9: drawnToward word edit (Q12) and coverage re-run
- Story 1.10: Refactor sweep

## Requirements & Constraints

- Select among 132 ordered pairings of 12 archetypes. Reversing a pair changes its personality: primary is core motive; secondary is how that motive shows. The journey is a playful reflection and makes no psychological-validity claims.
- Preserve the authored cocktail, recipe, method, glass, closing line and reading. Runtime recipe generation, substitutions and zero-proof variants are outside scope. Selection excludes incomplete pours and removes whole pours containing any chosen veto: egg-white, dairy, gluten, nuts or spice.
- Always require at least three authored veto-free pours so every veto combination can yield three candidates. Launch additionally requires all 132 authored pours and at least twelve veto-free. Ingredient classification must support the declared allergens before the floors are trusted.
- Keep permanent vocabulary ids and one Answers v3 contract. Missing answers are neutral. Lens and seed do not affect archetype scores; flavours influence only bounded pour fit. Timing, H4 status and H3 movement diagnostics never affect v3 scores.
- Keep trace and trace-derived content in the browser. Diagnostics never enter requests; the name never reaches the LLM. Model contributions and margins belong only in controlled analysis, never in journey output, server logs or model prompts.
- Demonstrate the same ranked shortlist as the reference for every coverage fixture, with all 132 pairings leading their witness fixture. Regenerate analysis reports and coverage evidence whenever weights, vocabulary or catalogue change.
- Build gates must validate content and the shared core. Desktop and phone walkthroughs must reveal different authored pours for different fixture answers, with text matching the dossiers. Strict nested schemas and identical answers across input methods are release evidence.

## Technical Decisions

- Use a functional TypeScript core in shared/ with no DOM, Node APIs, network, clock or randomness. Browser and future API shells import the same rules. Browser code cannot import server/API code; server/API code cannot import browser code. Separate TypeScript configurations and import restrictions enforce the seams.
- Data owns weights and calibrated scales; never duplicate constants in implementation. Centre each answer group's affinities, normalize by its fixed calibrated spread and apply separate motive/expression role weights. Gravity is linear around 50. Pair score combines primary motive, secondary expression and the bounded authored-pour flavour term; missing groups do not rescale the remaining groups.
- Rank eligible candidates by score rounded to nine decimals, then permanent pairingKey ascending. Return the top three. A final choice outside that shortlist, or a failed choice, resolves to its first entry. Selection and fallback are deterministic; the future LLM choice is not.
- Pairing identity is a permanent lowercase primary-secondary key, including dashed multiword names. Authored pours own cocktail and reading content; archetypes own identity; personas own image geometry. Missing images use _fallback.jpg.
- One assembler produces the Reading payload for every surface. A null live-copy argument uses authored yours verbatim. The tailoring guard requires the same paragraph count, total length within thirty percent and retention of at least half the authored content words; failed tailoring falls back to authored copy. Recipe and other reading blocks remain authored.
- Requests use strict zod objects at every nesting level. Shared vocabularies supply both types and UI options. Retire obsolete questionnaire fields and production imports of the legacy generator and fixed sample once integration is complete.

## UX & Interaction Patterns

App owns reveal orchestration when H6 seals. This epic serves the local authored result until the server epic adds the Bartender. TheReading renders epigraph, whoYouAre and yours, with The Ritual ending on closingLine. The experience voice stays mystical, sophisticated, theatrical and intimate, in English.

H3 remains continuous from zero to one hundred on every device. H5 has two reversible rounds of at most three words: soughtFor first, drawnToward second. Tap and drag yield the same answer; word ordering follows vocabulary order rather than selection order. Untimed/reduced-motion choices score identically. Changing these semantics requires matching approval and renewed coverage evidence.

## Cross-Story Dependencies

The scaffold precedes import and selection; catalogue import precedes both selection and reading assembly. Selection and assembly are independent once their prerequisites are complete, then jointly enable App integration. Journey vocabulary/diagnostic integration follows App integration; retirement and privacy/parity checks follow the connected journey. Cleanup follows the completed implementation stories.

The design conversation owns TheDepths; the integration writer for App, types and TheReading must be assigned. One writer owns a file at a time. Q12's twelve-word drawnToward vocabulary has Robin's 2026-10-08 copy approval: Knowledge, Influence, Making and Caring replace Mischief in the second round. Implementation, the actual world-layout check and renewed coverage remain; current v1 retains nine words. All authored pours are used during development; the first release serves all 132 authored pours under the strict content gate (Robin, 2026-10-08); formal editorial approval is recorded separately. Content approval, image production and hold redesign remain with their respective owners. Server calls, persistence and sharing are deferred to Epic 2.
