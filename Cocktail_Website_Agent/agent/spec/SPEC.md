---
id: SPEC-cocktail-agent-pipeline
companions:
  - intake-contract.md        # Answers v3 (wire) + browser-only diagnostics; agreed with the design owner
  - matching-model.md         # primary/secondary meaning, pair formula, weights, signal table, missing answers, question edit
  - pipeline-stages.md        # two tiers, five stages, boundaries (diagram)
  - personality-model.md      # 12 archetypes, 132 ordered pairings, pairingKey
  - ../ARCHITECTURE-SPINE.md  # adopted: AD-1..14, seams, privacy, deploy (owned by the architecture)
  - ../matching/reachability-v1.md   # adopted evidence for CAP-8 (generated)
  - ../matching/distribution-v1.md   # adopted evidence for CAP-8 (generated)
  - ../../design-artifacts/2026-09-23-cocktail-meaning-model.md  # adopted: pour shape, anchors, tailoring
  - ../../design-artifacts/pours/STUDIO-RULES.md                 # adopted: authoring rules for Tier A
sources:
  - ../../dionysus-experience/PRODUCT.md
  - ../../design-artifacts/A-Product-Brief/project-brief.md
---

> **Canonical contract** (refreshed 2026-10-06; the decision record is `.memlog.md`, with the 2026-06-17 history in `.decision-log.md`). This SPEC and its `companions:` are what to build, test and validate. Where it conflicts with a pre-refresh copy, this version wins. `ARCHITECTURE-SPINE.md` governs technical seams.

# Dionysus: Cocktail Personality Pipeline

## Why

This is a vision to realise. Dionysus distils a guest's answers into one of 132 personalities and hands them that personality's authored cocktail, with a reading of why it is theirs, so they feel *seen*. The audience is the Curious Esthete and portfolio evaluators. The front-end journey is built. The missing half is honest matching: the live app still reveals one fixed pilot for everyone, and the legacy engine scores only questions the journey no longer asks. This spec fixes what the matching, the authored catalogue and the live tailoring must do.

## Capabilities

- **CAP-1**
  - **intent:** The guest's journey produces one canonical, versioned intake that selection and tailoring consume.
  - **success:** A completed journey yields `Answers` v3 per intake-contract.md. Every value is a stable vocabulary id or explicitly absent. Desktop and mobile produce identical `Answers` for identical choices. Diagnostics and trace stay in the browser.

- **CAP-2**
  - **intent:** Choose the guest's personality with a hybrid: deterministic scoring narrows to the three best eligible pairings, then the Bartender picks one.
  - **success:**
    - The same answers give the same ranked shortlist in both shells.
    - Vetoed and unauthored pours never appear.
    - A pick outside the shortlist, or any failure, serves `shortlist[0]`.
    - Ties resolve by pairingKey.
    - The guest's answers, judged by a human reviewer in playtests, "feel like them".

- **CAP-3**
  - **intent:** (Tier A) Each pairing's cocktail carries true history and symbolism that mirror the personality.
  - **success:** Every pour has at least 3 sourced anchors (`{kind, fact, meaning, speaksTo?}`). Moral and cultural context is handled respectfully. Facts are used, wording is not copied. Hester's fact audit passes.

- **CAP-4**
  - **intent:** (Tier A) One canonical cocktail per ordered pairing, designed for the personality.
  - **success:**
    - Each of the 132 has one recipe, a method, a fixed glass, a `closingLine` and an explicit `contains`.
    - Its balance and allergen checks are recorded.
    - The runtime never alters it.
    - The imported catalogue matches the dossier and spec exactly.

- **CAP-5**
  - **intent:** (Tier B) The matched pour is presented so it reads as made for this guest.
  - **success:**
    - The Bartender tailors only `yours`, weaving in 2–3 of the guest's answers.
    - The output passes `acceptTailoring`.
    - Otherwise the authored passage is served verbatim.
    - The name and trace never reach the LLM.
    - On playtests it reads as personal.

- **CAP-6**
  - **intent:** Keep the two-tier split: authored offline, matched and tailored live.
  - **success:**
    - All 132 pours are authored and reviewable offline, with approval status visible in development.
    - The runtime generates nothing but the tailored `yours` and the pick.
    - Release requires the review gates.

- **CAP-7**
  - **intent:** Every surface renders one payload built by one assembler.
  - **success:** Owner reveal, pour page, fragment fallback, OG and print all build through `assembleReading` (AD-5). The app renders the result without transformation.

- **CAP-8**
  - **intent:** The matching model is auditable before release.
  - **success:** For each of the 132 ordered pairings, a regenerated report shows whether it can lead the fallback, whether it can enter the shortlist, and whether it is selectable or has been observed as the final choice. Each answer is reachable, proven unreachable, or not yet proven. Distribution, tie, sensitivity and group-influence results are stated under named answer models. The core's coverage tests replay one witness fixture per pairing.

## Constraints

- **Selection.**
  - Selection is bounded to the 12 × 11 ordered matrix of the BRANDING/PERSONALITY workbook.
  - A × B and B × A are distinct.
  - Primary = core motive. Secondary = how it shows (matching-model.md).
  - Determinism covers the shortlist and fallback only. It is not a promise about the LLM's final choice.
- **Vetoes.**
  - `egg-white | dairy | gluten | nuts | spice` remove whole pours before the shortlist.
  - No substitution, no recipe variants, no zero-proof at launch. Alcohol is not a veto.
- **Catalogue floors.**
  - At least 3 veto-free authored pours, always.
  - The launch gate needs all 132 authored and at least 12 veto-free.
  - Floors are asserted only after the safe-side ingredient-classification review.
- **Answer roles.**
  - Lens and seed colour never score archetypes.
  - Flavours act only as a bounded pour-level fit.
  - H4 timing and status are browser-only and unscored until playtests justify them under a new answer version.
- **Privacy.**
  - The trace and anything derived from it never leave the browser.
  - The name never reaches the LLM.
  - Personal readings are never persisted or shown on a pour link.
  - Model diagnostics (per-group contributions, margins) never reach the journey, the logs or the LLM.
- **No generated recipes.** The legacy generator (`mixology.ts` / `cocktails.ts`) and the fixed `VISIONARY_SAMPLE` reveal retire from the normal journey. Nothing may silently replace an authored recipe.
- **Intake changes.** Any change to the H3 control type, the H5 round semantics, or a vocabulary requires a matching sign-off and a coverage re-run.
- **Voice.** Mystical, sophisticated, theatrical, intimate. The anti-references are flat SaaS tone, cartoonish magic and generic menu copy. English only.

## Non-goals

- Claiming psychological validity: the questionnaire is a reflection, not an assessment.
- Zero-proof or allergen-substituted variants, runtime recipe generation or ingredient swaps.
- Runtime image generation. Images are pre-made per pour (`persona-image-system.md`).
- Accounts, ordering, e-commerce, multi-language, per-hold funnel analytics.
- Visual and interaction design of the holds (WDS track). This spec fixes only what they must capture.
- Equalising outcome frequencies for its own sake.

## Success signal

- A first-time guest finishes the journey and receives, in-session, the authored cocktail of a pairing chosen from their answers (not the fixed pilot), with a `yours` passage woven from their answers. They share or save it.
- Before release, the CAP-8 report shows all 132 pairings at least reaching the shortlist.
- The coverage, fallback, veto, floor and privacy tests pass.

## Assumptions

- The live journey is the only intake. The archived questionnaire docx and the persona fixtures are not inputs.
- The answer models in distribution-v1.md (uniform, hesitant, coherent) describe the model, not the audience. Playtests replace them.
- The flavour-rule table is a reasonable first pass until Tomás reviews it.

## Open Questions

- **Q12 question edit.** H5 drawnToward (now asked second) would drop Mischief and add Knowledge, Influence, Making and Caring, for 12 words. Robin to confirm the copy; the design owner to check 12 spheres on phones.
- **Approved-only or all authored for the first release?** With approved-only, 4 pours ship today, 3 of them veto-free, which meets the floor but makes matching nearly moot.
- **Bartender final-choice fixtures.** Which reviewed shortlist cases count as evidence that the LLM's pick is sensible? This is a playtest design question.
