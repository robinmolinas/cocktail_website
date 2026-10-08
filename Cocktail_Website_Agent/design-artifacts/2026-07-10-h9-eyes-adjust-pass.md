> **Historical design record — reviewed 8 October 2026.** This dated plan/review remains evidence of its iteration. The current reveal is TheReading; use current image rules and accepted later decisions for new work. Current direction: [experience specification](2026-07-08-experience-master-spec.md).

# H9 · The "Eyes Adjust" Pass — fixing the bright-then-dark reveal

**Date:** 2026-07-10 · **Status:** Implemented and verified in browser
**Scope:** The splash-white → persona-image handoff (beats 3–4).
Spec base: `2026-07-07-the-surfacing-reveal-design.md` §2 beat 4.

## The problem (Robin: "it's bright then dark, it looks strange")

Measured against the threshold descent (the transition Robin likes — an
*ease-in* darkening over 1.5s with a veil flooding gradually), the reveal broke
three of that transition's rules:

1. **Luminance cliff.** The condense used `easeOutCubic`, so ~85% of the
   screen snapped from full cream to near-black in the first ~700ms — fastest
   exactly when the viewer's eyes were most dazzled.
2. **The world was revealed already at final darkness.** The vignette was at
   full strength from frame one, and on 16:9 screens the 4:5 image's side
   voids uncovered as raw `#0d0b09`. The spec asked for "eyes adjusting after
   a flash", but the settle didn't exist.
3. **The held white was a dead flat frame** — featureless `#fbf6ea` for ~1s
   (hold + image decode), reading as a broken page between two dark worlds.

## The pass (per-pixel luminance is now monotonic: white → warm → dark)

- **Condense easing** → `easeInOutCubic`, 2500 → 3000ms: the white *lingers*
  (the afterimage), *sweeps*, then *lands softly* in the glass. `HOLD_MS`
  trimmed 1500 → 1250 so the total beat barely grows.
- **The afterglow** (new `.surf-afterglow`, z-9 under the white): a warm
  radial halo keyed to the glass point — open over the sacred glass, warm out
  to the frame corners — that cools to nothing over 3.6s. Every uncovered
  region is first seen over-lit, then settles. The side voids never appear as
  raw black.
- **The vignette wakes** (0 → 1 over 3s, `.surf-vignette.on`) instead of
  starting at full darkness; the candle breathing takes over as it lands.
- **The white is light, not paper**: both `surface-white` (TheDepths) and
  `surf-white` (TheSurfacing) carry a subtle luminous-core radial (re-centred
  on the glass point by `layout()`), so the held frame reads as the flash
  itself. `SURFACE_WHISPER_MS` 600 → 400 (the condense now carries the linger).
- **Focus rack retimed** (2.8 → 3.4s; sharp focus 2.6 → 3s) to land with the
  new condense.

## Bug found while verifying: the atmosphere was 1.5× off on retina

`.surf-air` canvases had bitmap size `innerWidth × dpr` but no CSS size; an
absolutely-positioned canvas with `inset: 0` keeps its *intrinsic* size, so on
`devicePixelRatio ≥ 1.5` the entire atmosphere layer — beam, dust, spray,
ember rim, and the beam's sacred-glass punch-out — rendered scaled 1.5× from
the top-left, landing beside the glass instead of on it. Fixed by setting
explicit `style.width/height` in `fit()` (as the breath canvas already did).

## Also in this pass

- Ingredient-note separator in the keepsake aligned to the world's `·`
  (was an em-dash in JSX).

## Follow-ups (not done)

- Preload the persona image before the splash (compute `craftCocktail` at the
  letting-go) so slow networks never lengthen the held white.
- Engine content strings still contain em-dashes ("… — the joke is yours");
  review with the copy voice pass.
- Pre-existing lint debt: `react-hooks/purity` errors in `TheDepths.tsx`
  ~L1111–1127.

Reduced motion unchanged: beats 2–4 still collapse to a crossfade; the
afterglow never mounts.
