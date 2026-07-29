# H9 · One Stroke of Dark — the reveal never leaves the darkness

**Date:** 2026-07-10 · **Status:** Implemented and verified in browser
**Supersedes:** the splash-white bloom of
`2026-07-07-the-surfacing-reveal-design.md` §2 beat 3–4 and the same-day
"eyes adjust" pass (`2026-07-10-h9-eyes-adjust-pass.md`).

## Robin's call

Reviewing H9: the bright-to-dark reveal (even eased) "feels very gimmicky…
it should be dark to dark, the same way that happens once you click on Cross
the Threshold… a reveal within the darkness… done in one stroke." Also: the
video's own drink should be barely seen.

So the white flash is gone entirely. The journey's two materials still meet
at the descent; the reveal now stays inside the dark world the whole way.

## The new choreography

**Beat 3 — The Sinking (TheDepths).** The drop falls, the film resumes at 1x,
the crown catches it (~12.5s). At `DARK_AT_MS` (380ms in) the dark takes the
frame with the threshold descent's exact grammar: a radial veil floods from
the edges (`surface-sink`, same `cubic-bezier(0.55, 0, 0.85, 0.4)` ease-in as
`descent-veil`) while the film itself sinks out of light
(`surface-film-sink`: brightness → 0.14, blur 2px — `heroDescend`'s fall).
Full black at ~1.5s, held `SURFACE_BLACK_HOLD_MS` (450ms), then `onComplete`.
The video freezes at `SURFACE_CUT` under the veil; its amber glass is never
seen.

**Beat 4 — The Kindle (TheSurfacing).** Mounts black-on-black. Nothing shows
until the persona image has decoded (`.surfacing-root:not(.lit)` gates the
layers), so slow networks lengthen the black breath, never flash the scene.
Then, in one stroke:

- **The ember** (front canvas): her drop's seed-coloured glow wakes at the
  glass point — warm core, seed halo — swells with `easeInOutCubic` over
  `KINDLE_MS` (2.8s), burns brightest mid-kindle, sheds sparks and the last
  splash spray, and dies into the drink as the scene arrives.
- **The sharp glass** breathes in behind it (`surfFocus`: opacity 0→1, scale
  1.045→1, blur 9→0, brightness 0.55→1; 2.8s, 0.35s delay).
- **The blurred surround** follows (`surfRack`: opacity 0→1 into its final
  blur(30)/brightness(0.42) grade; 3.2s, 0.6s delay).
- **The vignette** wakes 0→1 alongside (retained from the previous pass).

Ink, whisper, and keepsake beats are unchanged (`KINDLE_MS` replaced
`CONDENSE_MS` in the timing chain).

## Removed

- `surface-bloom` / `surface-white` (TheDepths) and `surf-white` /
  `surf-afterglow` (TheSurfacing), the white-mask rAF driver, and the
  `condensed` state.

## Reduced motion

TheDepths crossfades straight to black; TheSurfacing shows the settled scene
with the name pre-inked (kindle animations are `none`, layers forced
visible).

## Tuning knobs (if the splash still reads too bright/long)

- `DARK_AT_MS` (380) — how much of the crown is seen before the dark takes it.
- `DARK_GROW_MS` (1100) — the flood's length.
- `surfaceFilmSink` end brightness (0.14).

---

## Rev 2 — Robin's animator notes (same day)

Four notes, all implemented and verified:

1. **The video's drink was readable during the breath** — could pass for HER
   cocktail. → `breath-dim-veil` (TheDepths): a radial shadow eases in over
   2.4s when the breath stage arrives and stays through the splash, so the
   film is already receded before the sink takes it black.
2. **The black read as a stop.** → `SURFACE_BLACK_HOLD_MS` 450 → 150, and a
   new `onPrepare` seam: TheDepths fires it at the letting-go (~1.6s before
   handoff); App distills `craftCocktail` then (kept in a ref — the engine
   may not be pure — and reused at `finishDepths`) and pre-decodes the
   persona image. The emergence now starts the instant the black lands
   (`surfFocus` delay 0.35 → 0.15s, `surfRack` 0.6 → 0.35s). Measured black
   window: ~250–400ms — a beat in the flow, not a halt.
3. **The seed-coloured ember felt unnecessary** — the reveal should be an
   unveiling from shadow/cloud. → The entire kindle system (canvas glow,
   core, sparks, spray) is deleted; the image's own emergence (opacity +
   blur 14→0 + brightness 0.5→1, surround trailing) is the event.
4. **Staggered reveal: image, then its name.** → New `surf-reveal-title`:
   the cocktail's title (Playfair italic, bottom-center, `TITLE_LAG_MS`
   350ms after the image settles) rises in, holds through the whisper, and
   dissolves into the keepsake where the story column re-states it.

Knobs: `TITLE_LAG_MS` (350), title position (`bottom: 12vh`), dim-veil
depth (0.42 centre / 0.78 edges).

Open next: the keepsake page itself (layout/reveal), per Robin.
