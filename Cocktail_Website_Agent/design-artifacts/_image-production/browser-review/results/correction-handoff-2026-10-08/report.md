# Browser and name review: correction handoff of 8 October 2026

**Result:** 6 swapped live, 1 waiting on Robin, 12 held.
This covers the browser and name gates and the live swap only. All material and personality holds listed in `claude-correction-handoff.json` still stand for every candidate, including the six now live.

| | |
|---|---|
| Handoff | `2026-10-08/claude-correction-handoff.json` (19 pairs, 17 pairings) |
| Baseline | commit `53b988a` |
| Reviewer | Claude Code |
| Browser | Playwright 1.60.0, headless Chromium, macOS |
| Method | Gift links (`#pour=p…`, `{pairing, name, seed:null}`) on the dev server, real TheReading with authored copy. Settled after 11 s with motion on. Viewports 1920×1080, 1440×900 and 390×844 @2x (top, plus scrolled half a screen). Names `Ada` and `Alexandria-Rose`. Dev nav hidden. |
| Errors | None. No console errors, page errors or failed persona requests in 192 renders (`log-live.json`, `log-cand.json`). Every render loaded its own pairing, never `_fallback`. |

Each candidate was compared against the live image twice: first as static sheets with the registered tag boxes drawn on (`screenshots/static/`), then in the browser against the live render (`screenshots/rendered/R-*.png`).

## Swapped live (in the working tree, not committed)

The JPEGs in `public/personas/<pairing>/` now match the handoff hashes byte for byte, and the `personas.ts` boxes come from `runtimeCandidate`. `validate:images` reports 132 pairings, `tsc -p tsconfig.app.json` is clean, and vitest passes 925/925.

| Pairing | Why it beats live | Name |
|---|---|---|
| explorer-creator (For Good) | Glass no longer oversized; smooth frozen serve; on the phone the whole glass and caliper are in frame (live crops the glass) | Both names fit |
| innocent-creator (The Way It Felt) | Card now carries the hand-drawn two-colour trace (live card is blank); phone holds glass, cake and card | Both names fit |
| jester-explorer (Unrehearsed) | Pulled back to about 33% height; the crumpled fold reads "unrehearsed"; ice is more convincing | Both names fit, small but clean |
| jester-lover (I'll Tell You Later) | Tidier gift group, dark copy column; phone holds both cups and the gifts | Both names fit |
| lover-creator (In Your Own Hand) | Smaller glasses, palette clutter gone; phone holds both glasses and the painting | Both names fit |
| ruler-jester (Who's In?) | Smaller serve, open room; phone holds glass, gloves and phone | **Hold:** `Alexandria-Rose` runs off the paper at 1920 (see below) |

**ruler-jester name fit.** `wideTag.w` is 0.032, which is 62 px at 1920. The ink rule `max(min(w·0.26, w·1.5/len), 10)` drops a 15-character name to the 10 px floor, and the final "e" lands on the wood. The live image is narrower still (`w` 0.029), so the swap makes nothing worse, but long names fail on both. A metadata change can't fix this because the paper itself is too small. The fix is a larger tag in the image (image issue) or a long-name rule in the app (application layout).

## Robin's call

| Pairing | For the candidate | Against it |
|---|---|---|
| magician-jester (Even When You Know) | Spectacles plus magnifier match the brief; live shows a balance scale instead. Phone frame is better. | Desktop glass fills about 60% of frame height (live about 40%), the "drink fills the screen" problem fixed on 2026-09-28 |

## Held (live image stays)

| Candidate | Reason (browser or composition) | Class |
|---|---|---|
| explorer-jester b14 | Desktop cup is a close-up and the vise and spanner crowd the right half; live is better balanced. The candidate portrait is good. | image |
| jester-innocent b14 | Desktop glass grew (about 55% height incl. swizzle), against the pull-back brief. Phone improves. Not a clear win. | image |
| jester-regular-guy b14 | Both vessels much larger than live | image |
| magician-ruler b14 | Cup much larger than live | image |
| hero-creator b15 | Desktop glass larger; phone improves; garnish-count hold still open | image |
| hero-innocent b15 | Very tall glass dominates the wide | image |
| hero-regular-guy b15 | Glass fills most of the wide | image |
| jester-magician b15 | Close-up; glass fills most of the wide | image |
| lover-caregiver v3 b15 | Superseded by v5 (same composition, chunky apple) | — |
| **lover-caregiver v5 b16** | **The liquid is right**: fine pulp replaces the chunks. But the glass fills about 70% of the desktop height and the olive throw sits in the copy column at 1440. Live keeps the small glass and the quiet left side. | image |
| outlaw-magician v3 b15 | Superseded by v5 | — |
| **outlaw-magician v5 b16** | **The liquid colour is right** (lighter, more transparent). But the maroon bag fills the left third behind the kicker and title, and the glass is larger than live. | image |

## Recommended next production steps

1. **lover-caregiver and outlaw-magician:** apply the v5 liquid edit to the *live* composition (in `public/personas/`), not to the v3 scene. Both liquid fixes worked; it's the scene that loses to live.
2. **Scale drift:** 8 of the 12 holds lost because the glass got bigger. The batch14/15 refinements mostly moved the camera in. The 30–35% glass-height target still needs enforcing at generation time.
3. **Small tags:** any `wideTag.w` under about 0.05 will overflow 12+ character names at the 10 px ink floor. ruler-jester is the confirmed case; screen for others before the next batch.

All 19 candidates keep their `acceptance` flags false. This review does not change the handoff JSON.
