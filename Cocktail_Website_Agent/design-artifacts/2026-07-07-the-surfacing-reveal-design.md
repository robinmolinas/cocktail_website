> **Historical design record — reviewed 8 October 2026.** This dated plan/review remains evidence of its iteration. The current reveal is TheReading; use current image rules and accepted later decisions for new work. Current direction: [experience specification](2026-07-08-experience-master-spec.md).

# The Surfacing — Reveal Phase Design

**Date:** 2026-07-07 · **Status:** Approved in session, pending final review
**Scope:** The phase after H8 · The Breath — completing the journey's arc from
"there you are." to the keepsake.

## 1. Context

The Depths (`src/components/TheDepths.tsx`) ends at the breath: the continuous-line
figure draws itself, the spirit-point ignites, "there you are." appears — and the
experience dead-ends. `TheDepths` has no `onComplete`; the old rice-paper
`CocktailReveal` belongs to the previous visual world and is not reachable from the
new journey. The journey footage (`public/journey.mp4`, 15.1s) contains 3.2 unused
seconds after the breath hold (11.9s): a drop splashing into a cocktail's surface
(~12.5s) and a pull-back to a finished amber drink on a bar (~14.9s).

**Core creative decision:** the ascent doesn't surface into open air — it surfaces
*inside the glass*. The user's distilled self becomes the drop that lands in their
own drink. The video's amber cocktail is **never shown**: the splash whites out at
its peak and resolves into a pre-authored persona image of *their* cocktail.

## 2. The sequence

Beats 1–3 live in `TheDepths` (new final stage `surface`); beats 4–5 live in a new
component (working name `TheSurfacing`).

### Beat 1 — The figure (exists today)
"there you are." holds. The spirit-point burns in the user's seed colour
(`seedHex` already drives the breath canvas — confirm the dot uses it).

### Beat 2 — The letting go (new)
After a ~1.5s hold, the spirit-point detaches from the figure and falls as a
seed-coloured drop, accelerating below the frame. The figure's line dims behind it.
This is the seed colour's last appearance as light.

### Beat 3 — The splash (footage 11.9s → ~13.0s)
The instant the drop exits the frame, the film resumes at 1x. The crown splash
(~12.5s) catches it — everything the user gave across eight chapters lands in the
drink. At the splash's peak, a warm-white bloom swells from the impact point and
whites out the frame **before the camera pull-back reveals the video's glass**.
The video unmounts behind the bloom.

### Beat 4 — The unveiling (new · the money shot)
The persona image resolves from the bloom. Choreography, t=0 at white-out peak:

| t | Move |
| --- | --- |
| 0 – 1.8s | **Light condenses, not fades.** A radial mask contracts the white from the screen edges toward the drop's landing point; the scene is uncovered edge-first (eyes adjusting after a flash). The last white spark dies inside the glass in the image. |
| 0.4 – 3.0s | **Focus pull.** Image arrives at scale ~1.05 with soft blur, settles to sharp 1:1 (ease-out). Reads as coming into focus, not being placed. |
| 0 – 3.0s | **The world settles onto it.** 5–7 seed-coloured motes from the breath survive the bloom, drift down over the scene, dissolve. |
| 3.0 – 3.6s | **Held silence.** No UI, nothing interactive, nothing skippable. |
| 3.6 – 5.0s | **The name inks itself.** The tag is part of the image but empty; the user's name strokes on handwriting-style in their seed colour (SVG stroke or clip reveal over the tag safe area). |
| from 3.0s | **The breath responds.** 2–3px cursor parallax on the image (slow autonomous drift on touch). Bookends the landing page's cursor-spotlight. |
| from ~5.5s | **The whisper.** One quiet line fades in below (e.g. "read your story"). Advance is user-initiated, never automatic. |

**Colour rule (final):** the image is sacred — no tint, grade, or overlay ever
touches it. The seed colour appears only as lettering: the name on the tag
(beat 4) and the cocktail title in the text column (beat 5). Drop = colour as
light; lettering = colour as ink.

### Beat 5 — The keepsake (new)
On the user's gesture, the image glides right into a ~40% column (~700ms cubic
ease, slight scale-to-fit) and the keepsake text composes on the left with
staggered motion (80–120ms per group): cocktail title (seed-colour ink),
"Elaborated for [name]", archetype pairing name + essence, ingredients, ritual,
"why you" narrative, save-keepsake action. The image stays beside the words the
whole time they read. Dark, warm typographic world — immersion never breaks.

## 3. Engineering

- **`TheDepths`**: add stage `surface` (beats 2–3) and an `onComplete(answers)`
  prop, fired when the bloom reaches full white. Add a `surface` debug jump.
- **`TheSurfacing` (new component)**: beats 4–5. Background opens on the full
  bloom so the handoff is pixel-seamless; the video is already unmounted.
  Receives `answers` + `CocktailResult`.
- **App phase machine**: `landing → depths → reveal(TheSurfacing)`. Result
  computed with the existing `craftCocktail(answers)` engine at handoff. The old
  `quiz` / `brewing` phases leave the main flow (components kept for reference).
- **Persona image lookup**: keyed by the archetype pairing from
  `findPairing(primary, secondary)` (`src/data/archetypes.ts:1209`). File path
  `public/personas/<primary>-<secondary>.jpg` (lowercase, spaces→dashes, e.g.
  `regular-guy-sage.jpg`). A single `public/personas/_fallback.jpg` covers any
  missing file — the experience never breaks mid-rollout.
- **LLM seam unchanged**: the breath keeps its latency pocket; when the real
  distillation exists it resolves during the echoes, before the drop falls.
- **PDF keepsake**: print CSS restyles the beat-5 content onto a light page,
  persona image included.
- **Reduced motion**: `prefers-reduced-motion` collapses beats 2–4 to a simple
  crossfade with the name pre-inked; beat 5 renders without stagger.

## 4. Asset spec — the 132 persona images

Pre-authored (not runtime-generated), one per archetype pairing. Scenes may range
as far as each pairing's world demands — full compositions with decoration and
atmosphere, ethereal and revealing, not merely a glass, not constrained to a bar.
Three constants make one set of code and one transition work for all 132:

1. **Aspect ratio 4:5 portrait** — works full-bleed-centred in beat 4 and as the
   right column in beat 5, and crops well into the PDF.
2. **Tag safe area** — every image includes a physical tag in the same position,
   size, and angle (proposal: bottom-right quadrant, ~22% of image width, ~-5°),
   left blank; the name overlay renders into this fixed box.
3. **Lighting family** — dark-ambient/ethereal, bright enough at the edges to
   emerge legibly from a warm-white bloom.

**Rollout tiers:** 1 fallback → the 12 pure pairings (primary = secondary
adjacent, i.e. the 12 archetypes' signature scenes) → remaining 120 in batches.
Code is complete at tier 1.

## 5. Out of scope (next phases, in order)

1. **Sound identity** — the whole journey is currently silent; the surfacing
   (muffled depth → bloom → open room-tone) is where it will pay off most.
2. **Craft floor** — mobile layout, performance budget, loading states.
3. **Real LLM distillation** wired into the breath's seam.

## 6. Open questions

- Exact whisper copy ("read your story" is a placeholder).
- Whether the beat-5 title uses the seed colour at full strength or as a muted
  ink derivative for legibility on dark ground (decide in build against real
  seed hues).
