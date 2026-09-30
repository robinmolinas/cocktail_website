# Dionysus — The Cocktail Within You

An immersive, sumi-e ink-wash journey of self-discovery that distills a person into a single, bespoke cocktail.

Deployed live on Vercel: [https://dionysus.vercel.app](https://dionysus.vercel.app)

---

## The Journey Architecture

1. **The Landing** (`App.tsx`) — Dark, cinematic entry with cursor spotlight reveal and ambient sound.
2. **The Depths** (`TheDepths.tsx`) — A continuous video-journey questionnaire running on `journey.mp4` with native 1× playback and frozen keyframe holds:
   - **H1 · The Threshold**: Name and the six lens bubbles ("Who is this cocktail for?").
   - **H2 · The Seed**: Liqueur ring selection with hover whispers and droplet bursts.
   - **H3 · The Gravity**: Interactive motes drifting between dual liquid polarities.
   - **H4 · The Hidden Self**: Twin cooling embers; rapid instinctual choice.
   - **H5 · The Resonance**: Floating glass spheres and effervescent fizz clusters.
   - **H6 · The Finish**: Flavor preferences and vetoes.
   - **H7 · The Trace**: Sealing one personal reflection.
   - **H8 · The Breath**: Echoes assembling along the continuous-line spirit silhouette.
   - **H9 · The Surfacing**: The drop falls, the crown splashes, and the dark takes the frame.
3. **The Surfacing & Keepsake** (`TheSurfacing.tsx`, `TheReading.tsx`) — Unveiling of the bespoke cocktail portrait:
   - Authored persona imagery (`public/personas/<pairing>/portrait.jpg` and `wide.jpg`).
   - Detailed recipe (exact ingredients, glassware, ice, technique).
   - Sensory tasting notes and step-by-step ritual.
   - Comprehensive narrative reading by the Psychologist, Historian, and Mixologist.

---

## Engine & Scoring (`src/engine/mixology.ts`)

- Maps user choices across the **12 Jungian archetypes**.
- Resolves the top two archetypes into one of **132 primary × secondary pairings** (`src/data/archetypes.ts`).
- Composes recipe, modifiers, allergies, and zero-proof substitutions deterministically.

---

## Run & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run automated persona image validation, type checks, and build
npm run build

# Run image validation script alone
npm run validate:images
```

---

## Persona Images

Active personas are stored in `public/personas/<pairing>/`:
- `portrait.jpg`: 896 × 1200 px JPEG
- `wide.jpg`: 1920 × 1080 px JPEG
Registered in `src/data/personas.ts`.
