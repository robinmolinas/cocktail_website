# Dionysus — The Cocktail Within You

An immersive, sumi-e ink-wash journey of self-discovery that distills a person into
a single, bespoke cocktail. Built as the full interactive experience on top of the
original Dionysus landing page (which is preserved untouched, spotlight reveal and all).

## The Journey

1. **The Landing** — the original hero with the cursor-spotlight reveal.
2. **Phase A · The Threshold** — "Begin Your Journey" dissolves the hero and an ink
   bloom floods the screen, opening onto living rice paper.
3. **Phase B · The Rite (19 questions, 6 chapters + prologue)** — every page floats on a
   **real-time suminagashi simulation**: the classical Japanese water-marbling
   mathematics (drop displacement + tine lines) run on canvas, and the user's cursor
   combs the ink. Selecting an answer literally drops ink into the pond.
   Progress is measured by a **coupe glass slowly filling** with the user's chosen colour —
   no numbers anywhere, including the fourteen "ultra-smooth" trait sliders.
   Page turns are sub-2-second ink floods (Pottermore-style rich transitions).
4. **Phase C · The Distillation** — four ateliers take turns over the answers:
   the Psychologist, the Historian, the Mixologist, the Storyteller.
5. **Phase D · The Reveal** — a keepsake scroll: evocative cocktail name, archetype
   (from the 132-pairing brand-personality matrix), "Elaborated for [name]" tagline,
   precise ingredients, step-by-step ritual, a long bespoke "Why you" narrative, an
   AI-image placeholder frame, and **Save as PDF** (print-optimised keepsake).

## The Engine (`src/engine/mixology.ts`)

Deterministic, fully client-side:

- All 19 verbatim answers score the **12 Jungian brand archetypes** (weights per
  option, per slider pole, per colour hue).
- Top two archetypes resolve against the **132 primary×secondary pairings**
  extracted from `Brand Personality + Roulette.xlsx` (`src/data/archetypes.ts`) —
  e.g. Outlaw × Hero → *The Maverick*.
- The cocktail is composed from archetype spirits, flavour-desire modifiers,
  drink-quality scales (short/long, still/carbonated, simple/complex, classic/modern,
  day/night), with **allergy-aware substitutions** (nuts, gluten, egg, dairy, citrus,
  mint, honey) and a full **zero-proof build** when frequency = "Never".
- Names, narrative and agent lines are seeded from a hash of the answers, so the
  same soul always receives the same glass.

## Run

```bash
npm install
npm run dev     # local
npm run build   # type-checks + production build
```

## Notable files

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Phase machine: landing → quiz → brewing → reveal (landing preserved) |
| `src/components/Suminagashi.tsx` | Live water-marbling canvas (mathematical marbling) |
| `src/components/InkFlood.tsx` | Ink-bloom page-turn transition |
| `src/components/Questionnaire.tsx` | Prologue + six chapters, validation, progress |
| `src/components/GlassProgress.tsx` | The filling coupe |
| `src/components/Brewing.tsx` | The four ateliers |
| `src/components/CocktailReveal.tsx` | Keepsake scroll + PDF export |
| `src/engine/mixology.ts` | Scoring, recipe composition, narrative generation |
| `src/data/archetypes.ts` | 132 archetype pairings (generated from the Excel) |
| `src/data/cocktails.ts` | Spirits, flavour modifiers, colour naming |
| `src/data/questions.ts` | The 19 questions across six chapters |
