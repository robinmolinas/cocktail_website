---
title: '1.2 Import the 132 authored pours with a content-gate validator'
type: 'feature'
created: '2026-10-08'
status: 'done'
baseline_commit: 'e61e86325553c8082bdcfe80cdb51ae12d3d2af8'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 2'
worktree: '{project-root}/Dionysus-matching-core (branch matching-core)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/2026-09-23-cocktail-meaning-model.md'
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md'
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/spec/matching-model.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The 132 authored pours exist only as markdown dossiers plus spec JSON in the Pour Studio. The app can't serve them, and nothing guards their completeness or allergen safety at build time.

**Approach:**
- A deterministic import turns each dossier into a typed pour record, without rewording any guest-facing text, and writes a small eligibility catalogue plus one file per pour into `shared/data/`.
- A validator, run in the build, enforces the content gate and the AD-4 veto floors over the committed data.

## Boundaries & Constraints

**Always:**
- Guest-facing text is copied verbatim. The only transforms allowed are trimming whitespace and removing the single wrapping `*…*` around the epigraph and the closingLine.
- `yours` = exactly the numbered paragraphs under `**yours**`. Anything after them in the Reading section (reviewer notes, draft closing lines, empty duplicate headings) is excluded and listed in the report.
- Preserve the recipe's intro line (e.g. a batch yield), its amount-column header, every preparation block between the recipe table and `**method**` (e.g. "Tamarind water: …"), and the `serves:` bullet when present.
- The output is byte-identical across runs: sorted keys, no timestamps. Source hashes go in a manifest.
- Allergen safety is strict. A pour fails if its declared `contains` misses any allergen carried by its spec ingredients or garnish (per the live dps-tools ingredient table), if `contains` holds a non-veto value, or if `veto_free` disagrees with `contains`.
- The validator runs over the committed data only, because the deployed app has no access to the dossiers.

**Never:**
- Rewriting, summarising or "fixing" copy.
- Importing anything from the `## Dossier` section.
- Failing the build on quantity-format differences between dossier and spec. Those are reported.
- Network access, or reading from `src/`.
- Touching TheDepths, TheReading, App, types or index.css.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Standard pour | creator-hero dossier + spec | full record; 5 `yours` paragraphs; contains `[egg-white, dairy]` | N/A |
| Batch + preparation | creator-magician | `recipeIntro` "Makes about eight drinks of 125 ml.", amount header "amount (batch)", a preparation "Tamarind water" with its text | N/A |
| Notes after yours | hero-jester (trailing "closing line: …") | yours = numbered paragraphs only; the note appears in the report, never in the record | report warning |
| Duplicate empty heading | explorer-caregiver (second `**yours**`) | ignored; yours intact | report warning |
| Under-declared allergen | a fixture whose spec has `egg_white` but `contains: []` | import exits non-zero naming the pairing | error |
| Missing field / anchors < 3 / unknown status | broken fixture | import exits non-zero | error, lists every problem |
| Floors | committed catalogue | dev: ≥3 veto-free authored; `STRICT_STORE=1`: 132 + ≥12 veto-free | test failure naming the floor |
| Re-run | import twice | identical bytes; `--check` exits 0 | `--check` exits 1 on drift |

</frozen-after-approval>

## Code Map

- **Work in the worktree** `/Users/robin.molinas/Documents/GenAI Projects/Dionysus-matching-core/Cocktail_Website_Agent/dionysus-experience` (branch `matching-core`). Never edit the main checkout. Do not commit.
- **Sources (read-only):**
  - Dossiers: `../design-artifacts/pours/<pairing>.md` (132, excluding `STUDIO-RULES.md` and `_studio/`).
  - Specs: `../design-artifacts/pours/_studio/specs/<pairing>.json`.
  - Ingredient table (the live copy, outside the repo): `/Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/data/ingredients.json`. The script takes an `--ingredients` flag, defaulting to that path resolved relative to the app dir: `../../../skills/dps-tools/data/ingredients.json` from the main checkout, the same relative depth in the worktree.
  - Flavour rules: `../agent/matching/flavour-rules.json`.
- **Dossier layout (surveyed 2026-10-08; all 132 conform):**
  - Frontmatter: `pairing`, `personality`, `status` (draft|flagged|approved, with an optional `# comment`), and optional `veto_free`, `accepted`, `authored_in`, etc.
  - `## Cocktail`: bullets `**name:**`, `**tagline:**`, `**glassware:**`, `**contains:**` (a backticked JSON array), and optional `**serves:**`.
    - `**recipe**`, optional intro paragraph(s), then a table `| amount… | item | note… |`. The header varies, e.g. `note (shown)` or `amount (batch)`.
    - Optional bold-labelled preparation paragraphs (about 12 pours, e.g. creator-explorer, creator-innocent, lover-creator, magician-ruler).
    - `**method**` as a numbered list.
    - `**closingLine:**` in italics.
    - sage-jester repeats `**Glassware:**`/`**Contains:**` (capitalised) after its table. These are duplicates; report them, and use the lowercase bullets.
  - `## Anchors`: a table `| kind | fact | meaning | speaksTo |`. One pour labels the columns differently (`fact (sourced)`, `meaning (for this person)`). An anchor whose kind contains `(dossier only)` is kept, flagged `dossierOnly: true`.
  - `## Reading`:
    - `**epigraph**` + an italic line;
    - `**whoYouAre**` + 2–3 paragraphs;
    - `**yours**` + a heading-comment line, then numbered paragraphs (4–6). Then possibly trailing labelled notes (about 20 pours: caregiver-explorer, hero-jester, hero-lover, ruler-sage …) and `---`.
  - `## Dossier (research only — never shipped)`: everything from here on is excluded.
- **Specs:** `{pairing, ingredients[{key, ml?|dashes?|drops?…, stage?}], garnish[], serves?, …}`. Verified 2026-10-08: allergen under- or over-declaration is 0/132.
- **Flavour derivation** must equal `agent/matching/matching.py` `load_catalogue()`:
  - regex on the key × an amount factor (≥20 ml → 1.0; 7.5–20 ml → 0.6; else 0.3);
  - max over ingredients, capped at 1;
  - garnish ignored;
  - sweet = sugar concentration (Σ ml·sugar/100 over ml ingredients not at `stage: "top"`, ÷ Σ those ml × 100), ranked over the collection: ≥ the value at index ⌊2n/3⌋ of the ascending list → 1.0, ≥ index ⌊n/3⌋ → 0.5, else 0.
- **Reuse:** `shared/pairing.ts` (`isPairingKey`, `ALL_PAIRINGS`) and `shared/answers.ts` (`VETOES`, `FLAVOURS`, `Veto`, `FlavourId`).

## Tasks & Acceptance

**Execution:**
- [x] `shared/data/schema.ts`: zod schemas and types for `AuthoredPour` (pairing, status, personality, cocktail {name, tagline, glassware, serves?, recipeIntro?, amountHeader, recipe[{amount, item, note?}], preparations[{title, text}], method[], closingLine, contains: Veto[]}, anchors[{kind, fact, meaning, speaksTo?, dossierOnly}] min 3, reading {epigraph, whoYouAre[], yours[] min 1}) and `CatalogueEntry` {pairing, status, contains, flavour: Record<FlavourId, number>}. Strict objects. Rationale: AD-11 and the meaning model, with one typed shape for 1.3–1.5 and epic 2.
- [x] `shared/import/parseDossier.ts` (pure: markdown string in → `{pour, warnings}` or errors) and `shared/import/flavour.ts` (pure: spec + table + rules → strengths; plus the sweet ranking over the collection). Rationale: unit-testable parsing with no I/O in the core.
- [x] `scripts/import-pours.ts` (Node 22+ with type stripping: `node --experimental-strip-types`, or plain `node` on 25): reads the sources; runs the parse and the allergen checks; writes `shared/data/catalogue.json` (sorted by pairing), `shared/data/pours/<pairing>.json` and `shared/data/manifest.json` (sha256 of every source file, the rules file and the ingredient table); writes `../agent/catalogue/import-report.md` (warnings per pour: trailing reading material, a trailing closing line that differs from the canonical one, inline markdown left in guest text, quantity differences against the spec, duplicate labels). It exits non-zero on any error. `--check` regenerates in memory and exits 1 if the committed files differ. Add the scripts `import:pours` and `import:pours:check`.
- [x] `shared/validate.ts`: `validateCatalogue(entries, pours, {strict})` checks:
  - every entry has a pour and vice versa;
  - unique and valid keys;
  - schema;
  - `contains` equals the pour's;
  - floors: always ≥3 entries with empty `contains`; strict = all 132 and ≥12.
  It returns the problems. `shared/data/catalogue.test.ts` runs it over the committed data (strict when `STRICT_STORE=1`), so `npm run build` gates it.
- [x] Tests:
  - `shared/import/*.test.ts` covers every matrix row, using small inline fixture dossiers (a standard pour, batch plus preparation, trailing notes, duplicate yours, under-declared allergen, missing field). It also includes snapshot-free assertions on the real creator-magician, hero-jester and creator-hero records.
  - A parity test: flavour strengths for 5 named pours equal the values from `matching.py`, which the builder runs once and pastes as constants, with the source noted.
- [x] Wiring:
  - `shared/` must not use `node:fs` (lint enforces this), so the import also generates `shared/data/pours/index.ts`, exporting `POUR_LOADERS: Record<PairingKey, () => Promise<AuthoredPour>>` built from `() => import('./<pairing>.json')`.
  - Set `resolveJsonModule: true` in `tsconfig.shared.json` and `tsconfig.app.json`.
  - The validator test imports `catalogue.json` statically and awaits every loader.
  - `scripts/` gets type-checking through `tsconfig.node.json` (include `scripts/**/*.ts`, types node), and lint applies to it as to any TS file.
- [x] Run the import and commit-ready the generated files in the worktree (not committed).

**Acceptance Criteria:**
- Given the sources, when `npm run import:pours` runs twice, then the outputs are byte-identical, with 132 pour files and 132 catalogue entries, and `import:pours:check` exits 0.
- Given the committed data, when `npm run build` runs, then the validator test passes in development mode. `STRICT_STORE=1 npx vitest run` reports the strict-gate result, which passes on today's claims: 132 authored, 99 veto-free.
- Given any record, then no text from a `## Dossier` section or from trailing reading notes appears in it. A test scans all 132 pour files for "Tomás", "y5", "draft v" and "(dossier" in guest fields; `dossierOnly` anchors are exempt.
- Given `import-report.md`, then it lists, per pour, every excluded trailing block and every quantity difference, so the content owner can act on it.

## Implementation Notes

- Spec is about 2,300 tokens, over the 1,600 guide. It is kept whole because it is a single goal (a parser, a generator and a validator for one data set) and splitting would separate the parser from its gate. Robin delegated this call too.
- Approval: Robin delegated the build decisions on 2026-10-08 ("do what you recommend — make sure that it's solid"). This spec was approved on that delegation, with no open questions.

- 2026-10-08, implemented by a fresh build agent in the worktree, then two patch rounds after review (triage rows 1–14, plus a follow-up: the freshness step fails only on safety drift).
- Final verification (by me, not the agent's report):
  - `npm run build` passes, with the freshness step reporting "committed store is fresh (132 pours, 105 veto-free)" and 97/97 tests.
  - The strict gate passes.
  - Lint shows the 39-problem baseline.
  - `import:pours:check` is clean.
  - `src/` is untouched.
- Deploy simulation: with the app dir alone, the freshness step skips with a clear message (exit 0). Changing `contains` in catalogue.json fails the build (exit 1).
- A scan of every guest field in all 132 records for studio markers (Tomás, Wren, Hester, Robin, y5, r4, draft v, spec v, closing line, (dossier, F-numbers, pdf) found 0 hits.
- Deviations accepted:
  - `.ts` import extensions in `shared/import`, because Node's type stripping requires them.
  - `POUR_LOADERS` is Partial, with the validator enforcing all 132.
  - The dossier-only meaning rule is anchored at the start of the meaning, because "contains" would hide 3 usable anchors.
  - 105 veto-free, not 99 (the dossiers changed after the first tally; matching.py agrees).
- For the content owner (`agent/catalogue/import-report.md`): hero-jester's closing line needs a decision. There are 49 quantity differences to review, and 20 excluded trailing blocks confirmed not shipped.

## Spec Change Log

## Review Triage Log

Pass 1, 2026-10-08. Layers: blind-hunter, edge-case-hunter, verification-gap.

| # | Finding (layer) | Verdict | Evidence | Route |
|---|---|---|---|---|
| 1 | Committed store never re-checked against sources in the build (verification-gap, blind) | high | `build` runs only the committed-data test. A re-classified allergen in the table, or a spec gaining egg or dairy, would ship stale `contains` with a green build. | patch (freshness check in build when sources present) |
| 2 | Ingredient-table `contains` optional, so a row without it counts as allergen-free (edge) | medium | `sources.ts:24` `contains: z.array(z.string()).optional()`. No row lacks it today, but it must fail safe. | patch |
| 3 | Dossier-only anchors signalled in the meaning are not flagged; the ≥3 count includes dossier-only anchors (edge) | medium | magician-lover "story" and caregiver-jester "after (optional)" say "Dossier only" in the meaning. All 132 still have ≥3 usable anchors. | patch |
| 4 | A continuation line after the numbered `yours` would truncate guest copy with only a warning (edge) | medium | Not reached today (20 trailing blocks, all labelled notes or the duplicate heading), but a silent truncation of guest copy must be an error. | patch |
| 5 | Report header says nothing reached the records, but inline markdown does (blind, verification-gap) | low | `emit.ts` header vs the 60 inline-markdown fields kept verbatim by design. | patch |
| 6 | hero-jester closing-line conflict filed as informative (blind) | low | The trailing "final" line is longer than the canonical one. One source is wrong, so it needs a decision. | patch (report section) and handed to the content owner |
| 7 | Quantity report mostly false positives, and it skips lines silently (blind, edge) | medium | Dashes not converted, ranges read as their upper bound, 0 ml and dilution lines reported, batch recipes compared with single drinks, ml in the item column ignored. Buries real differences. | patch |
| 8 | Leak scan too narrow (blind, edge) | low | Wren, Hester, Robin, r4, "closing line" and spec v not forbidden; personality, amountHeader and preparation titles not scanned. | patch |
| 9 | Report lacks a status breakdown (blind) | low | "Nothing to report" reads as ready for drafts. | patch (with row 5) |
| 10 | Duplicate-heading warning counted as excluded material (blind) | low | explorer-caregiver is a heading, not text. | patch (with row 5) |
| 11 | Regex compile error escapes the collected errors (edge) | low | `compile()` throws a SyntaxError past the collected error list. Direct fix. | patch |
| 12 | `--pours --check` swallows the next flag (edge) | low | Direct guard. | patch |
| 13 | BOM breaks the frontmatter; preparation line breaks not verbatim (edge) | low | Neither occurs today; both fixes are one-liners that protect verbatim copy. | patch |
| 14 | No `engines` field (blind) | low | Type stripping needs Node ≥22.6. | patch |
| 15 | Draft or flagged pours satisfy the strict floors (blind, edge) | false | AD-4 counts authored pours. Whether release is approved-only is Robin's open question (initiative Notes). Visibility is added by row 9. | rejected |
| 16 | Sugar in g / ml_dry and 0-ml lines skew flavour strengths (edge) | low | The behaviour is identical to the matching.py reference by design. Model tuning belongs to 1.3. | rejected (noted for 1.3) |
| 17 | Partial writes on failure (edge) | low | Dev-only script. `--check` detects any half state; a re-run fixes it. | rejected |
| 18 | Sweet rank depends on the collection; parity constants brittle (blind) | low | The collection-ranked definition is intentional (matching-model.md); the constants carry their source. | rejected |
| 19 | `POUR_LOADERS` is Partial (edge) | false | `PairingKey` allows self-pairs, so a total Record cannot type-check. The validator enforces all 132. | rejected |
| 20 | Allergens checked from the spec only; dossier-only recipe lines and "may contain" open questions are unchecked (blind) | medium | The intent scopes the check to the spec. The correspondence between dossier and spec ingredients is the Pour Studio's lint responsibility. Open allergen questions (batavia_arrack, coca_cola, quince) await Robin. | defer → content owner |
| 21 | Live ingredient table outside the repo; the repo copy is stale (blind) | medium | Reproducibility. Row 1's skip-when-absent keeps the build safe; the copy must be synced by the content owner. | defer → content owner |
| 22 | Staging notes before the first section in sage-lover and magician-outlaw (blind) | low | Source dossier edits belong to the content owner. | defer → content owner |
| 23 | Spec claims 99 veto-free; data shows 105 (edge) | false | Dossiers changed after the 2026-10-06 tally; matching.py agrees on 105. The docs refresh in 1.3. | rejected |

## Design Notes

- **Two-file split.** The eligibility catalogue is small; selection needs only pairing, contains and flavour. Full pours are one file per pairing, so 1.5 can load the chosen pour lazily, keeping roughly 800 KB of copy out of the first bundle. Both live in `shared/`, so epic 2's API imports the same files.
- **Committed generated data.** The deployed app (a Vercel subtree of dionysus-experience) never sees `design-artifacts/` or the workspace-root ingredient table. The import is a local, deliberate step; the build validates what was committed.
- **Strict about allergens, informative about quantities.** The dossier is the guest's recipe, and the spec is Tomás's balance model. Their units legitimately differ (teaspoons vs ml, batch vs single drink). Only allergen disagreement is unsafe.
- **Inline markdown in guest text** (about 22 `yours` blocks contain `*emphasis*`) is kept verbatim. How it renders is 1.4/1.5's choice; the report lists it.

## Verification

**Commands:**
- `npm run import:pours && npm run import:pours:check` -- expected: exit 0, 132 pours
- `npx vitest run` -- expected: all pass
- `STRICT_STORE=1 npx vitest run shared/data` -- expected: pass
- `npx tsc -b && npm run build` -- expected: success
- `npm run lint` -- expected: no new problems against the baseline of 39
