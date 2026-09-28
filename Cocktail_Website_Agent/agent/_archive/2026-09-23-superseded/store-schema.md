# 132-Store Schema

The pre-authored content store — **one entry per personality** (132 = primary × secondary archetype pairings). Hand-authored by Robin + designer (Tier A). Shipped in-repo as a typed module, imported by the front-end, the `/api/reveal` function, and the authoring scripts.

## Entry shape

```ts
import type { ArchetypeId } from './archetypes'; // store lives beside archetypes.ts

type DrinkFunction =
  | 'mirror' | 'soothe' | 'clarify' | 'challenge'
  | 'celebrate' | 'close' | 'reconnect' | 'release'; // KB §1.10 — the drink's one emotional job

interface PersonalityEntry {
  // ── Identity — already in archetypes.ts (generated from the xlsx) ──
  id: string;              // stable slug, e.g. "explorer-x-sage"
  primary: ArchetypeId;
  secondary: ArchetypeId;
  name: string;            // the named pairing, e.g. "The Visionary"
  essence: string;         // one-line essence
  story: string;           // the pairing's short story
  goal: string;
  fear: string;

  // ── The cocktail — authored in Tier A (Robin + designer) ──
  cocktail: {
    name: string;                    // #1
    drinkFunction: DrinkFunction;    // guides the Bartender's framing
    glassware: string;
    recipe: { ingredient: string; quantity: string; note?: string }[]; // #4
    method: string[];                // #5 — ordered steps
    symbolicReading: string;         // #7 — what the ingredients + method represent (stable)
    servingRitual: string;           // #8 — how to serve, sip, reflect
    zeroProof?: {                    // optional non-alcoholic variant (open question)
      recipe: { ingredient: string; quantity: string; note?: string }[];
      method: string[];
    };
  };

  // ── Image (#3) — pre-rendered 3D render; the UI overlays the user's name ──
  imageRef: string;        // asset id/path for this personality's render

  // ── Deterministic fallback — served for #2/#6 when the Bartender LLM is down/rate-limited ──
  fallback: {
    emotionalFit: string;  // generic #2 (names the personality, no user specifics)
    rationale: string[];   // generic #6
  };
}

type Store = Record<string /* id */, PersonalityEntry>; // 132 entries
```

## Field provenance

| Field | Source |
|---|---|
| `id, primary, secondary, name, essence, story, goal, fear` | already in `archetypes.ts` — lift as-is |
| `cocktail.*` (#1, #4, #5, #7, #8, glassware, drinkFunction) | **authored Tier A** (Robin + designer) |
| `imageRef` (#3) | asset-generation step |
| `fallback.*` | seedable from the v1 engine, then lightly curated |

## Live vs authored at runtime
- The Bartender (`prompts/bartender.md`) writes **only** `emotional_fit` (#2) and `rationale` (#6) per user, plus the final pick.
- Everything else in the entry is served **as authored**.
- `fallback` is what the deterministic path returns for #2/#6 when the LLM is unavailable — so the reveal is always complete.

## Authoring on-ramp
1. Run the existing v1 engine (`mixology.ts`) once per pairing to **seed** a draft store (procedural cocktail + a templated fallback).
2. Robin + designer rewrite each entry to quality — the seed is scaffolding, not the product.
3. Curate against the KB's four north-star tests (taste, symbolic, human, hospitality) and the avoid-list (KB §1.13).

## Validator (build-time)
- All 132 ids present and unique; each a valid primary×secondary pairing (no self-pairs).
- Every entry: non-empty cocktail (name, ≥2 recipe items, ≥2 method steps, `symbolicReading`, `servingRitual`), an `imageRef`, and a `fallback`.
- A payload assembled from any entry conforms to `spec/output-contract.md`.

## Location (proposed)
- `dionysus-experience/src/data/personalities.ts` — the store (typed by the shared types).
- `dionysus-experience/src/shared/types.ts` — `Answers`, `PersonalityEntry`, the `output-contract` payload — imported by the SPA, the `/api` function, and the authoring scripts.
