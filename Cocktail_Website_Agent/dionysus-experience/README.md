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
3. **The Reading & Keepsake** (`TheReading.tsx`) — Unveiling of the authored cocktail portrait:
   - Authored persona imagery (`public/personas/<pairing>/portrait.jpg` and `wide.jpg`).
   - Detailed recipe (exact ingredients, glassware, ice, technique).
   - Sensory tasting notes and step-by-step ritual.
   - The authored reading in four movements, written for each pairing in the Pour Studio by its psychologist, historian and mixologist.

---

## Matching & Reading (`shared/`)

- The journey writes Answers v3 ids (`shared/answers.ts`, vocabularies in `shared/vocab.ts`).
- `shared/selection` scores them against the **12 archetypes** and shortlists three of the **132 primary × secondary pairings** (`shared/data/archetypes.ts`), leaving out any pour holding a chosen veto. The reveal takes the shortlist's first pour (`boundedPick(shortlist, null)`) until the Bartender chooses within it (Epic 2).
- `shared/reading.ts` assembles the selected pair's authored pour into one Reading. The pours are authored in `design-artifacts/pours/` and imported into `shared/data/pours` with `npm run import:pours`. Recipes are authored, never generated.

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

# Selection reference check and unit tests (vitest)
npm test

# Lint
npm run lint

# Re-import the authored pours from the dossiers (import:pours:check verifies without writing)
npm run import:pours

# End-to-end privacy and parity checks: the real journey in Chromium on
# desktop (mouse) and phone (touch), about 5 minutes; not part of build.
# Needs Playwright's Chromium once (npx playwright install chromium) and a
# network connection (fonts, analytics script). Its dev server uses port 5199.
# A failure also reports the page's errors and loads (a reload shows as a
# repeated URL), the journey video's state, the dev server's recent log, the
# URL and a screenshot path.
npm run e2e
# A page renderer four times slower; and the dev server's log printed live
E2E_CPU_THROTTLE=4 npm run e2e
E2E_VITE_LOG=info npm run e2e
```

---

## Persona Images

Active personas are stored in `public/personas/<pairing>/`:
- `portrait.jpg`: 896 × 1200 px JPEG
- `wide.jpg`: 1920 × 1080 px JPEG
Registered in `shared/data/personas.ts`.
