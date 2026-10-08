---
stepsCompleted: [1, 2]
inputDocuments:
  - Dionysus/Cocktail_GPT/specs/spec-cocktail-agent-pipeline/SPEC.md
  - Dionysus/Cocktail_GPT/specs/spec-cocktail-agent-pipeline/pipeline-stages.md
  - Dionysus/Cocktail_GPT/specs/spec-cocktail-agent-pipeline/personality-model.md
  - Dionysus/Cocktail_GPT/specs/spec-cocktail-agent-pipeline/output-contract.md
  - Dionysus/PRODUCT.md
  - Dionysus/Cocktail_Website_Agent/design-artifacts/A-Product-Brief/project-brief.md
  - Dionysus/Cocktail_Website_Agent/design-artifacts/D-Design-System/00-design-system.md
  - Dionysus/Cocktail_Website_Agent/Knowledge base/cocktail_counsel_knowledge_base.md
  - Dionysus/Cocktail_GPT/old_workflow/cocktail-workflow v0.json
workflowType: 'architecture'
project_name: 'Dionysus'
user_name: 'Robin'
date: '2026-06-17'
requirementsBasis: 'SPEC (bmad-spec) in lieu of PRD — spec-cocktail-agent-pipeline, locked 2026-06-17'
---

> **Superseded pipeline reference — reviewed 8 October 2026.** The active contract is Cocktail_Website_Agent/agent/spec/SPEC.md with ARCHITECTURE-SPINE.md. Preserve this earlier record; its old output shape, missing vetoes and questionnaire assumptions are not build instructions. Current direction: [experience specification](../Cocktail_Website_Agent/design-artifacts/2026-07-08-experience-master-spec.md).

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
- Recipes bounded to the real inventory; selection bounded to the 132-matrix (matrix data must be reachable at runtime, distinct from the finished-drink store).
- Output: one JSON payload per `output-contract.md`.
- 3D reveal images pre-rendered, referenced by id; personalization = name + favourite colour.
- Knowledge base "Cocktail Counsel" (Canon / Abstraction / Generation layers + symbolism libraries) feeds the Historian (authoring) and Storyteller (framing).
- Candidate runtimes: n8n (has n8n-skills + old `cocktail-workflow v0.json`) vs in-app TS serverless vs hybrid — decided in Step 4.
- Model: Claude (Anthropic API) default.

### Cross-Cutting Concerns

- FE/BE data contract (`output-contract.md`) — the integration seam.
- Secret management + server boundary for LLM calls.
- 132-asset store: schema, versioning, write path from the offline pipeline, and Robin's curation.
- **Curation gate = human taste review + automated validator** (every recipe's ingredients ∈ inventory; payload conforms to `output-contract.md`).
- Runtime cost/latency (≤2 LLM calls/user) + caching (non-framing output is cacheable per persona).
- Hybrid-selection determinism: deterministic scoring (unit-testable) + LLM pick (needs a rubric + fixtures to catch drift).
- **Eval harness:** the 11 real persona fixtures are gold — but on the OLD questionnaire; must be migrated to the new schema before use. No production feedback loop yet for detecting bad matches.
- Image personalization location (client canvas overlay vs server).
