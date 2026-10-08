- source_spec: `spec-1-1-shared-core-scaffold-answers-v3.md`
  summary: src/data/archetypes.ts ArchetypeId and src/data/personas.ts personaKey() duplicate the archetype list and slug rule that shared/pairing.ts now owns, with no parity test.
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
  summary: TheDepths' private option lists (lenses, seed hexes, poles, words, flavours, vetoes) are not tested against the shared v3 vocabularies, so a copy edit there silently drops answers to neutral.
  evidence: src/engine/intake.ts maps labels via idFromLabel and drops unknowns; no test imports TheDepths' lists. Closes when 1.6 makes TheDepths write v3 ids directly.
- source_spec: `spec-1-5-app-reveals-the-selected-authored-pour.md`
  summary: No automated test drives App's reveal wiring (journey answers → revealed reading; failed reveal or broken gift → landing).
  evidence: the repo has no component or e2e harness; 1.5 was verified by a manual Playwright walkthrough. Fits 1.8's end-to-end checks.
