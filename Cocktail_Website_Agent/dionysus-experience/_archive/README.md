# Archive — retired experience components

These files were part of earlier architectural passes of the Dionysus experience
(quiz era → TheDepths era → TheReading era). None are imported by the live app
(`src/App.tsx` → TheDepths → TheReading → NotFound). They are kept here for
reference only and are **not compiled** (outside `src/`, which `tsconfig.app.json`
scopes to).

Archived on 2026-07-24 during an Impeccable audit cleanup.

| File | Belonged to |
|---|---|
| `TheSurfacing.tsx` | The retired diorama keepsake reveal (replaced by `TheReading`, 2026-07-24) |
| `Questionnaire.tsx` | The paper-world quiz phase (replaced by the in-liquid holds of `TheDepths`) |
| `controls.tsx` | The quiz's paper-world form library (PillGroup, InkSlider, ColorDrop, Field) |
| `ink.ts` | `splashInk` — the quiz's ink-scatter effect, used only by `controls.tsx` |
| `Brewing.tsx` | The old "brewing" interstitial |
| `GlassProgress.tsx` | The old glass-fill progress meter |
| `CocktailReveal.tsx` | The old flat reveal (pre-TheSurfacing) |
| `Suminagashi.tsx` | The old paper-marbling background effect |
| `InkFlood.tsx` | The old ink-flood transition |
| `App.css` | Vite scaffold CSS, never imported |

To revive any of these, move it back under `src/` and restore its imports.
