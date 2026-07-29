---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - Dionysus/Cocktail_Website_Agent/agent/spec/SPEC.md
  - Dionysus/Cocktail_Website_Agent/agent/spec/pipeline-stages.md
  - Dionysus/Cocktail_Website_Agent/agent/spec/personality-model.md
  - Dionysus/Cocktail_Website_Agent/agent/spec/output-contract.md
  - Dionysus/PRODUCT.md
  - Dionysus/Cocktail_Website_Agent/design-artifacts/A-Product-Brief/project-brief.md
  - Dionysus/Cocktail_Website_Agent/design-artifacts/D-Design-System/00-design-system.md
  - Dionysus/Cocktail_Website_Agent/Knowledge base/cocktail_counsel_knowledge_base.md
  - Dionysus/Cocktail_Website_Agent/agent/data/cocktail-workflow-v0.json
workflowType: 'architecture'
project_name: 'Dionysus'
user_name: 'Robin'
date: '2026-06-17'
requirementsBasis: 'SPEC (bmad-spec) in lieu of PRD — spec-cocktail-agent-pipeline, locked 2026-06-17'
---

# Architecture Decision Document — Dionysus Cocktail Agent Pipeline

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional (SPEC, 7 capabilities)** — split into two runtimes:
- Offline authoring (CAP-3 Historian, CAP-4 Mixologist) → writes the 132-asset store.
- Per-user runtime (CAP-1 intake, CAP-2 hybrid selection, CAP-5 Storyteller framing, CAP-7 JSON handoff).
- CAP-6 ties the tiers; runtime is "serve + frame only."

**Non-Functional:**
- Fast reveal (<4s transitions; must not block 60fps FE) → pre-baked store + ≤2 runtime LLM calls. The quiz/ink animation visually masks runtime latency, relaxing the hard ceiling.
- Cost-sensitive (personal budget) → pre-bake the expensive creativity once; cheap runtime.
- Curated quality → offline batch pipeline with a human review gate, backed by an automated validator.
- Secret boundary: the LLM key must sit behind a server/edge layer, never in the browser. Settled — true regardless of the orchestration choice.
- English-only; minimal personal data (name + free-text trace); no compliance/multi-tenancy.

**Scale & Complexity:**
- Primary domain: full-stack web + LLM agent backend
- Complexity: medium
- Components (~6): FE app [exists] · runtime API/edge fn · personality-selection module + matrix data · 132-asset store · offline authoring pipeline · image personalization.

### Architectural Framing (refined in party review)

- **The 132-store is the spine, not a detail.** A versioned content artifact with an explicit schema and a record-of-truth role — not an afterthought blob. Runtime is essentially a **cached lookup** (persona → fixed drink) with one creative call (the "why you") bolted on; everything except the framing is cacheable per persona.
- **Orchestration is two decisions, not one.** Tier A (authoring the 132) and Tier B (per-user runtime) have opposite needs — batch / visual / latency-irrelevant vs cheap / fast / low-overhead — and may use different tools. Decide separately in Step 4. (Early review lean: n8n or a script for authoring, in-app serverless for runtime.)
- **The runtime framing is the load-bearing "feels-seen" surface.** With drinks pre-baked, the per-user "why you" call carries the entire personalization. The user's `trace` (free-text) and `colour` are **required inputs** to that call, not garnish — otherwise the result reads like a horoscope. Open product question: is the persona-match shown to the user, or hidden behind the framing?

### Technical Constraints & Dependencies

- FE exists: React + Vite + TS, Tailwind, client-side PDF (jspdf), Canvas/WebGL fluid, Web Audio.
- Selection bounded to the 132-matrix (matrix data must be reachable at runtime, distinct from the finished-drink store). Ingredients are experience-authored, not inventory-bound.
- Output: one JSON payload per `output-contract.md`.
- 3D reveal images pre-rendered, referenced by id; personalization = name + favourite colour.
- Knowledge base "Cocktail Counsel" (Canon / Abstraction / Generation layers + symbolism libraries) feeds the Historian (authoring) and Storyteller (framing).
- Candidate runtimes: n8n (has n8n-skills + old `cocktail-workflow v0.json`) vs in-app TS serverless vs hybrid — decided in Step 4.
- Model: Claude (Anthropic API) default.

### Cross-Cutting Concerns

- FE/BE data contract (`output-contract.md`) — the integration seam.
- Secret management + server boundary for LLM calls.
- 132-asset store: schema, versioning, write path from the offline pipeline, and Robin's curation.
- **Curation gate = human taste review + automated validator** (payload conforms to `output-contract.md`; recipe is mixologically coherent).
- Runtime cost/latency (≤2 LLM calls/user) + caching (non-framing output is cacheable per persona).
- Hybrid-selection determinism: deterministic scoring (unit-testable) + LLM pick (needs a rubric + fixtures to catch drift).
- **Eval harness:** the 11 real persona fixtures are gold — but on the OLD questionnaire; must be migrated to the new schema before use. No production feedback loop yet for detecting bad matches.
- Image personalization location (client canvas overlay vs server).

## Runtime Agents & Prompts

The 4 conceptual agents map onto the two tiers — only two run live:

| Agent | When | Produces (output element) |
|---|---|---|
| Psychologist | runtime — deterministic scoring (v1 `mixology.ts`) → **LLM final pick** | the chosen personality |
| Historian | Tier A — offline authoring (Robin + designer) | feeds symbolic reading (#7) |
| Mixologist | Tier A — offline authoring | cocktail name (#1), recipe (#4), method (#5) |
| **Bartender** (was "Storyteller") | runtime — **the one LLM call** | emotional fit (#2, names the personality) + rationale (#6, names the user) |

- The **runtime LLM call is the Bartender**; it also carries the Psychologist's final pick (pick + framing in one call). Prompt: `prompts/bartender.md`.
- Of the 8 reveal elements, the live call writes only **#2 and #6**; #1/#4/#5/#7/#8 are pre-authored in the 132-store; #3 is a pre-rendered render + UI name overlay. See `spec/output-contract.md`.
- **Symbolic reading (#7)** is pre-authored per cocktail (decodes ingredients + method into meaning); the Bartender may echo it but does not write it.
- 132 personalities = **primary × secondary archetype pairings** (`dionysus-experience/src/data/archetypes.ts`, generated from the xlsx) — not "11 personas per archetype."
- Open (Tier-A authoring): does each personality carry a **zero-proof variant** for non-drinkers? (KB pushes a non-alcoholic path.)

## Foundation (substrate)

Brownfield front-end — no FE starter. The real app is `dionysus-experience/` (React 19 + Vite 8 + TS 6 + Tailwind 4). The architecture adds a thin backend substrate, co-located in that app:
- **Runtime (Tier B):** Vercel Functions running **Hono ^4.12**, behind one endpoint. LLM key server-side.
- **LLM access:** a provider-agnostic adapter (Anthropic SDK ^0.104 or OpenRouter, switchable by config).
- **Offline authoring (Tier A):** plain TypeScript scripts via **tsx**, sharing the runtime's types.
- **Shared types:** one module defining the questionnaire `Answers`, the `PersonalityEntry` store shape, and the `output-contract` payload — imported by FE + API + authoring + the v1 engine.
- Versions verified Jun 2026: Vite 8.0.16, Hono 4.12.25, @anthropic-ai/sdk 0.104.2.

## Core Architectural Decisions

### Data Architecture
- **132-store = an in-repo, versioned content module** (no DB), keyed by primary×secondary pairing (132 entries). Hand-authored by Robin + designer; imported by both client and the API function. Schema → `store-schema.md`.
- Selection data already exists: `archetypes.ts` (132 pairings) + `mixology.ts` weight tables — reused, no migration.
- **Build-time validator:** every personality has a complete cocktail + `imageRef` + `fallback`; payload conforms to `spec/output-contract.md`; recipe is mixologically coherent.
- **Caching:** prompt-cache the static prompt (system + candidate data) where the provider supports it; only #2/#6 are per-user.

### Security
- No accounts/auth (anonymous public quiz). No PII persistence — name + answers processed transiently.
- **LLM key server-side only** (the reason the server tier exists).
- Per-IP rate limiting on the reveal endpoint (cost/abuse guard; also smooths OpenRouter-free's 20/min cap).

### API & Communication
- **One endpoint: `POST /api/reveal`.** Client computes the deterministic shortlist (reuse `mixology.ts`), sends `{answers, name, shortlistIds}`; server makes the **one Bartender LLM call** (final pick + #2 + #6) and returns `{chosen_personality_id, emotional_fit, rationale}`; client renders the matched pre-authored cocktail + name overlay.
- **Graceful fallback:** if the call errors/rate-limits → deterministic top-1 pick + the entry's `fallback` (#2/#6). The reveal never breaks; only the prose degrades.
- Contract = `spec/output-contract.md` (shared types).

### Frontend
- Existing React 19 + Vite flow: Questionnaire → Brewing (masks latency) → CocktailReveal. Deterministic scoring stays client-side (instant shortlist). Name overlaid client-side on the per-personality 3D render. Recipe-card PDF via existing jspdf.

### Infrastructure & Model
- **Host: Vercel** — `dionysus-experience/` SPA + `/api`, one deploy. `ANTHROPIC_API_KEY` / `OPENROUTER_API_KEY` in env.
- **Model = provider-agnostic adapter.** Default: **OpenRouter free `:free` model** ($0/call; 50/day, or 1,000/day after a one-time $10; 20/min). Fallback ladder: (1) deterministic `fallback` (never breaks); (2) optional Haiku 4.5 (~$0.006/call) as paid overflow. Quality dial → Sonnet 4.6 / Opus 4.8 by config. (Pricing verified Jun 2026.)
- Monitoring minimal; anonymized `{chosen_personality_id}` logging deferred (future feedback loop).

### Implementation sequence
1) shared types + store schema → 2) author a few sample personalities → 3) `/api/reveal` (Bartender call + fallback) → 4) wire client (shortlist → endpoint → reveal + name) → 5) build validator → 6) author all 132 (Robin + designer).
