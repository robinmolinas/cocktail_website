- source_spec: `spec-1-1-shared-core-scaffold-answers-v3.md`
  summary: ~~src/data/archetypes.ts ArchetypeId and src/data/personas.ts personaKey() duplicate the archetype list and slug rule that shared/pairing.ts now owns, with no parity test.~~
  **Resolved 2026-10-13 (1.7):** `ArchetypeId` is now an alias of `shared/pairing`'s `Archetype`, so there is one list. `personaKey()` stays: it takes display strings and has no same-archetype guard, so it is not a drop-in for `pairingKey`. Since 53b988a, though, `catalogue.test.ts` "has a registered scene with geometry for all 132 pairings" resolves every `pairingKey` through `personaImageFor`, and its `src` must equal `/personas/<key>/portrait.jpg`. A slug drift would fail that test instead of falling back silently.
  evidence: Review pass 1 (blind-hunter + verification-gap) found no test linking personaKey or PERSONA_IMAGES keys to pairingKey or isPairingKey. A rename on either side would silently send valid reveals to the fallback image. Ticket 1.7 (moving the data into shared/data) should replace personaKey with pairingKey and add a test that every image key passes isPairingKey.
- source_spec: `spec-1-2-import-authored-pours-content-gate.md`
  summary: The allergen gate covers spec ingredients and garnish only. Dossier recipe lines with no spec line (e.g. "or any fernet" alternatives) and unresolved "may contain" questions (batavia_arrack, coca_cola → nuts; quince) are not represented.
  evidence: 1.2 review row 20. Needs a Pour Studio lint mapping every dossier recipe row to a spec key, and a way to record unresolved allergen questions. Owner: cocktail review conversation and Tomás.
- source_spec: `spec-1-2-import-authored-pours-content-gate.md`
  summary: ~~The live dps-tools ingredient table sits outside the git repo (workspace-root skills/); the in-repo Dionysus/skills copy is stale (116 vs 345 rows).~~
  **Resolved 2026-10-08:** Dionysus/skills/dps-tools/data/ingredients.json is identical to the workspace-root copy (345 rows, verified by diff). The import script reads this in-repo path by default. No action needed.
  evidence: 1.2 review row 21.
- source_spec: `spec-1-2-import-authored-pours-content-gate.md`
  summary: ~~sage-lover and magician-outlaw carry outdated staging notes above their first section.~~
  **Resolved 2026-10-08:** Both notes updated to reflect that `npm run import:pours` is the copy mechanism and the file is the source.

- source_spec: `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/spec-1-3-selection-core-matching-model-v1.md`
  summary: Keep experimental --phi analysis outputs separate from canonical shipped-model evidence.
  evidence: Baseline analyze.py already overwrites distribution, reachability and witnesses under --phi; effective phi is recorded now, but reachability prose still implies shipped configuration (B3, medium).

- source_spec: `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/spec-1-3-selection-core-matching-model-v1.md`
  summary: ~~Correct the hesitant answer-model assumption to agree with its sampler.~~
  **Resolved 2026-10-08, document review:** The renderer and sample_hesitant docstring now state 37% missing in expectation (10% initially absent + 30% of the remaining 90%). The Markdown report was regenerated; sampler behavior and numeric data are unchanged.
  evidence: sample_hesitant retains 70% of the 90% choices made by sample_uniform, so 37% are missing; baseline report and docstring state 30% (B4, medium).

- source_spec: `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/spec-1-3-selection-core-matching-model-v1.md`
  summary: ~~Correct the coherent answer-model equation used to describe the simulation.~~
  **Resolved 2026-10-08, document review:** The renderer now states exp(2 × (primary + 0.7 × secondary)), with word-option scope explicit. The Markdown report was regenerated; scoring and sampling behavior are unchanged.
  evidence: sample_coherent computes exp(2 * (primary + 0.7 * secondary)); the baseline renderer describes exp(2 * primary + 0.7 * secondary), preventing exact reproduction (B5, medium).

- source_spec: `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/spec-1-3-selection-core-matching-model-v1.md`
  summary: ~~Render computed final-choice status and describe shortlist-only witnesses accurately.~~
  **Resolved 2026-10-08, document review:** The renderer now uses each row's computed final_choice and labels the witness column without claiming every witness leads. Reachability Markdown was regenerated; all current 132 still lead.
  evidence: Baseline render.py hardcodes selectable for every row and labels all witnesses as leading; analyze.py can produce unreachable/unverified or top-three-only rows, though all current 132 lead (B10, low).
- source_spec: `spec-1-5-app-reveals-the-selected-authored-pour.md`
  summary: ~~TheDepths' private option lists (lenses, seed hexes, poles, words, flavours, vetoes) are not tested against the shared v3 vocabularies, so a copy edit there silently drops answers to neutral.~~
  **Resolved 2026-10-13 (1.6):** TheDepths has no private option lists any more. It imports the vocabularies from the zod-free shared/vocab.ts and writes Answers v3 ids straight into App's IntakeRecord; src/engine/intake.ts is now a projection of `record.answers` with a strict parse, and the label→id mapping is gone. Only H5's sealed labels are mapped back to ids at TheDepths' boundary, against lists derived from the same vocab.
  evidence: src/engine/intake.ts maps labels via idFromLabel and drops unknowns; no test imports TheDepths' lists. Closes when 1.6 makes TheDepths write v3 ids directly.
- source_spec: `spec-1-5-app-reveals-the-selected-authored-pour.md`
  summary: No automated test drives App's reveal wiring (journey answers → revealed reading; failed reveal or broken gift → landing).
  evidence: the repo has no component or e2e harness; 1.5 was verified by a manual Playwright walkthrough. Fits 1.8's end-to-end checks.
- source_spec: `spec-1-6-thedepths-writes-v3-ids-and-browser-diagnostics.md`
  summary: The H4/H3 diagnostics logic (chosen ms = t − 250, timedOut/skipped clearing the texture key, interrupted on re-present, taps ignored during the 600 ms pause, example chosen/notTouched, gravityMoved) has no committed test; it was verified only by ad-hoc Playwright scripts.
  evidence: The logic lives in TheDepths closures, the vitest environment is node with no component harness, and 1.6 ruled out a committed Playwright suite. Fits 1.8's journey smoke, which can read `window.__dionysusIntake()` in a dev build. It extends the 1.5 entry "No automated test drives App's reveal wiring", which now also covers the record reset and updateTrace/updateDiagnostics.
- source_spec: `spec-1-7-retire-legacy-engine-and-retired-answer-fields.md`
  summary: The AGENTS.md repo map is incomplete beside the lines 1.7 edited. `components/` still lists TheSurfacing (archived), `scripts/` names only validate-persona-images.mjs, and the new `shared/` line leaves out `import/` and `validate.ts`. The app README's Run & Build section also omits `npm test`, `npm run lint` and `npm run import:pours`.
  evidence: 1.7 blind-hunter review. AGENTS.md is agent context, so per the build rules its completeness pass is deferred rather than patched here. Owner: whoever next refreshes the project context (bmad-project-context).
