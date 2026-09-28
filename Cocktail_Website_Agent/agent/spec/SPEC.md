---
id: SPEC-cocktail-agent-pipeline
companions:
  - pipeline-stages.md       # the 5-stage agent I/O contract + two-tier data flow
  - personality-model.md     # 12 archetypes + 132-persona matrix + roulette mechanic + source-data map
sources:
  - ../../../PRODUCT.md
  - ../../design-artifacts/A-Product-Brief/project-brief.md
  - ../../Knowledge base/cocktail_counsel_knowledge_base.md
---

> ⚠️ **Partly superseded (2026-09-23) — pending a `bmad-spec` refresh.** Where this spec conflicts with `../ARCHITECTURE-SPINE.md`, the spine wins: vetoes now steer the match (the "no allergen accommodation" constraint is gone; "Alcohol" is not a veto; no zero-proof at launch); the canonical intake is the live journey (`Answers` v2), not the revamped questionnaire docx; `output-contract.md` is archived (the reading = tagline + epigraph + 2 paragraphs, never persisted); the trace never reaches the server.

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents in frontmatter are for traceability only. The questionnaire, the Brand Personality + Roulette workbook, the ingredient inventory, and the persona fixtures are **live source data downstream MUST read** — mapped in `pipeline-stages.md` and `personality-model.md`, not duplicated here.

# Dionysus — Cocktail Personality Agent Pipeline

## Why

A vision to realize, on top of a real opportunity. Dionysus serves the *right drink at the right time* so a user feels **seen** — it distills a person's inner self into a deeply personalized cocktail and the narrative of why it is theirs. The front-end experience (quiz canvas, Suminagashi animation, design system) is already built via the WDS track; the multi-agent **brain** that turns questionnaire answers into a personality, a drink, and a story is the missing half — and the product's stated moat ("Alchemical History AI"). This spec locks WHAT that brain must do, for the primary *Curious Esthete & Self-Explorer* and for portfolio evaluators. It does not choose the runtime technology — that is the architecture step.

## Delivery model (locked)

**Two tiers.**
- **Tier A — offline, authored once per persona.** The Historian and Mixologist author the 132 cocktails + narratives (one per persona), curated and QA'd by Robin before any user sees them.
- **Tier B — runtime, per user.** Intake → hybrid personality selection → Bartender framing of the *matched, pre-authored* drink. The runtime LLM (the **Bartender**) generates only the personalized **rationale** + the one-sentence emotional fit; it never invents or alters a recipe.

## Capabilities

- id: CAP-1
  intent: Capture a user's self-portrait through the quiz into a structured profile that downstream stages consume.
  success: A completed questionnaire yields one normalized profile object (identity-frame, colour, 5 gravity axes, drivers, what-people-come-for, inner-texture pairs, flavours, vessel, craft-level, free-text trace) per `pipeline-stages.md#stage-1`; every field populated or explicitly null.

- id: CAP-2
  intent: Select the brand-personality the user will identify with via a hybrid mechanism — deterministic scoring narrows the 132 to a shortlist, the LLM makes the final pick and writes the rationale.
  success: Given a profile, the Psychologist returns exactly one chosen personality (one of the 132 in `personality-model.md`, tied to one of 12 archetypes) plus a concise rationale citing specific questionnaire answers; selection is reproducible to the shortlist and judged "feels like them" on the persona fixtures by a human reviewer.

- id: CAP-3
  intent: (Tier A) Surface cocktails and ingredients whose history, culture, and symbolism resonate with a persona — inspiration, not the final drink.
  success: For each persona, output lists cocktails (origin, story, persona-link) and ingredients (story, persona-link), each carrying an explicit one-sentence link to the archetype; moral-and-cultural context (e.g. rum & the slave trade, cognac & the African-American community) handled respectfully; never specifies the final recipe.

- id: CAP-4
  intent: (Tier A) Design one canonical cocktail per persona from the historian's inspiration and the persona's traits.
  success: A complete recipe (ingredients with quantities + method) where each major choice traces to a historian inspiration or a persona trait, and ingredients are chosen for symbolic/emotional fit and mixological coherence. Exactly one cocktail per persona; the runtime never swaps ingredients.

- id: CAP-5
  intent: (Tier B) Present the matched pre-authored cocktail so the user feels it was made for them — the "served by someone who noticed more than the obvious" moment.
  success: The Bartender returns the full output contract in `output-contract.md` (name, one-sentence emotional fit, personalized image ref, recipe, method, rationale, symbolic reading, serving ritual), with the rationale framed live to the user's answers; on fixtures it reads as unmistakably personal to a human reviewer.

- id: CAP-6
  intent: Deliver the locked two-tier split — Tier A authors the 132 offline; Tier B matches and frames live, generating only the personalized rationale + emotional fit.
  success: A user completing the quiz receives, in-session, their matched pre-authored cocktail framed to their specific answers; offline, a complete 132-entry set exists and is curatable/QA-able by Robin before it ever reaches a user.

- id: CAP-7
  intent: Hand the front-end a single structured payload it renders directly as the cocktail reveal.
  success: The emitted payload validates against `output-contract.md` and the React/Vite app renders every field without transformation or missing data.

## Constraints

- Ingredients are authored as part of the cocktail experience — chosen for symbolic/emotional fit (per the KB ingredient-symbolism library) and mixological coherence. They are **not** bound to a fixed real-world bar inventory (the v1 home-bar constraint is dropped).
- Personality selection is bounded to the proprietary 12-archetype / 132-persona matrix in `../data/Brand Personality + Roulette.xlsx`, and is **hybrid**: deterministic scoring narrows the field, the LLM makes the final pick + rationale.
- Historian and Mixologist run **offline** (Tier A) to author the 132; they are not in the runtime path. Exactly **one canonical cocktail per persona** — the runtime never swaps ingredients or regenerates a recipe.
- The 132 cocktails are **pre-authored**; the runtime LLM scope is personalization + presentation ("why you") only.
- **No allergen/exclusion accommodation.** The quiz does not ask what to avoid, because a serve-only runtime cannot honor it without deceiving the user.
- Brand voice is mystical, sophisticated, theatrical, intimate — "a high-end speakeasy hidden behind a fortune-teller's parlor." Honor it; avoid the anti-references (flat SaaS tone, cartoonish magic, generic menu copy).
- The reveal image is a **pre-rendered 3D asset** personalized with the user's name and favourite colour, referenced by id — not generated at runtime.
- The engine emits exactly one structured payload conforming to `output-contract.md`; the front-end consumes, it does not co-author content.

## Non-goals

- Choosing the runtime/orchestration technology (n8n vs in-app vs hybrid) — that is `bmad-create-architecture`.
- Building or restyling the quiz UI, canvas animation, or design system — owned by the WDS track.
- Real-time generative recipe creation or runtime ingredient substitution — explicitly out (serve-only).
- Allergen/dietary accommodation, ordering, delivery, e-commerce, or account/auth systems.
- A general cocktail database, bartending tutorial, or inventory-management tool.
- Multi-language output at launch (English only).

## Success signal

A first-time *Curious Esthete* finishes the quiz and, in-session, is handed a cocktail framed so precisely to their answers that they feel *seen* — enough to download the recipe card or share the result. Measured by the WDS targets (>80% quiz completion, high recipe-card download/share rate) and, on the real persona fixtures, a human reviewer agreeing the chosen personality and the "why you" are unmistakably that person's.

## Assumptions

- The "New Revamped Questionnaire" (minus the now-removed exclusions question) is the canonical current intake. The persona fixture docs (Florence Boudot, Margot, …) use an older questionnaire and are legacy input fixtures.
- "132 personalities" = 12 archetypes × 11 named personas (PERSONALITY sheet, rows 3–135).
- The Psychologist's "two candidate persona profiles" are an intermediate reasoning step; the contract output is the single chosen personality.
- Flavours/vessel/colour/trace feed selection as secondary signal and the Bartender's framing — they do not change the (fixed) recipe.
- English-only at launch.
- The 132 base 3D cocktail renders are produced by a separate asset-generation step and referenced by id.

## Open Questions

- Historian list size: how many cocktails and ingredients should the Historian surface per persona while authoring (Tier A)?
- Image personalization: name + favourite colour only, or more (e.g. a generated note/garnish)? Where do the 132 base 3D renders originate?
- Questionnaire consolidation: standardize on the revamped questionnaire (now minus exclusions) and migrate/re-collect the fixtures; reconcile the prompt count.
