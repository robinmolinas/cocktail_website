---
name: Dionysus — The Suspended Pour
description: A mystical cocktail-personality journey; ink on paper above, light in dark liquid below.
colors:
  ink: "#16140f"
  paper: "#f4efe6"
  vermilion: "#e8702a"
  seal-red: "#c43c1e"
  brass: "#b08d57"
  deep-night: "#0d0b09"
  candle-ivory: "#f5ead8"
  ember: "#ffb088"
  splash-white: "#fbf6ea"
  keepsake-title: "#f2ead9"
  keepsake-body: "#cfc4ae"
  keepsake-muted: "#9a8f7c"
  seed-campari-red: "#c8102e"
  seed-aperol-orange: "#ff6f1f"
  seed-galliano-gold: "#f2c24e"
  seed-midori-green: "#58b947"
  seed-curacao-blue: "#1287c8"
  seed-violette-purple: "#7b5aa6"
  seed-pamplemousse-pink: "#f2789f"
  seed-cassis-plum: "#5c2447"
typography:
  display:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(2.75rem, 6.8vmin, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.04
  headline:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.3rem, 3vmin, 1.9rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.96rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.2em"
rounded:
  pill: "999px"
  orb: "50%"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 2.2rem"
  button-veil:
    backgroundColor: "#ffffff08"
    textColor: "{colors.candle-ivory}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.9rem"
  pill-choice:
    backgroundColor: "#f4efe699"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.15rem"
  pill-choice-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.15rem"
---

# Design System: Dionysus — The Suspended Pour

> **Source-of-truth note (BMAD/WDS integration).** This file is the project's
> design system — WDS step D. `design-artifacts/D-Design-System/` points here;
> do not create a second design-system document there. Strategic context lives
> in `PRODUCT.md` and the BMAD artifacts it links. Experience decisions (what
> each hold does, locked constraints) live in the design log and master spec —
> this file only owns how things *look and move*.

## 1. Overview

**Creative North Star: "The Speakeasy Behind the Fortune Teller's Parlor"**

Dionysus is one continuous pour told in two materials — **ink on paper** above
the surface, **light in dark liquid** below (the "Water & Ink" identity). The
landing world is warm paper, sumi ink, and a vermilion seal: a printed
invitation. The journey world (the Suspended Pour, holds H1–H9) is near-black
liquid where everything luminous — candlelight ivory text, glass bubbles,
seed-coloured motes — floats against darkness. The two worlds meet once, at
the descent into the drink; the reveal never leaves the dark (locked
2026-07-10, "one stroke of dark"): the splash sinks to black the same way the
threshold descent does, and the persona scene kindles out of that black from
the drop's seed-coloured ember.

This system explicitly rejects flat SaaS-style dashboards, cartoonish or
childish "magic" (wizard hats, bright neon), cliché generic cocktail menus,
and clinical stark-white minimalism. Nothing in the journey is a card, a
panel, or a box: interface elements are bubbles, drops, motes, rings, and
underlined lines of handwriting, suspended in the dark.

**Key Characteristics:**
- Two worlds, one voice: warm paper above, candlelit depths below.
- Darkness is the canvas; light (and *her* seed colour) is the paint.
- Circles and pills only — the system has no rectangles, no cards.
- Motion is choreography, not decoration: every hold has an entrance, a
  breath, and an exit, all eased on `cubic-bezier(0.16, 1, 0.3, 1)`.
- The user's chosen seed colour threads the entire journey via the `--c`
  custom property — always as light, never as surface tint.

## 2. Colors

Two palettes, one per world, joined by the eight data-driven seed colours.

### Primary
- **Vermilion** (#e8702a): the brand's flame. The seal accent of the paper
  world, focus outlines, hover glows on keepsake actions, and the default
  seed before one is chosen. Never spread as a surface; it appears as stamp,
  ember, and outline.
- **Seal Red** (#c43c1e): the hanko-stamp deep of vermilion; reserved for the
  stamped seal moments of the paper world.

### Secondary
- **Brass** (#b08d57): the metallic whisper — keepsake section labels
  ("The Pour" / "The Ritual" / "The Reading"), ingredient amounts, ritual
  numerals. Always small, tracked (0.2em), uppercase.
- **The Eight Seeds** (data: `TheDepths.tsx` `SEEDS`): Campari Red #c8102e,
  Aperol Orange #ff6f1f, Galliano Gold #f2c24e, Midori Green #58b947,
  Curaçao Blue #1287c8, Violette Purple #7b5aa6, Pamplemousse Pink #f2789f,
  Cassis Plum #5c2447. The user's choice becomes `--c` and colours every
  subsequent mote, ripple, ember, and the inked name on the keepsake tag.

### Neutral
- **Ink** (#16140f): the paper world's text, buttons, and slider thumbs — warm
  near-black, never pure #000.
- **Paper** (#f4efe6): the paper world's body background, always washed with
  the `paper-wash` radial gradients and the SVG `grain` overlay — never flat.
- **Deep Night** (#0d0b09): the depths' base dark; the Surfacing's frame.
- **Candle Ivory** (#f5ead8): all text over the dark world, usually at
  0.5–0.92 alpha depending on rank; full-strength #fffaf0 on hover/chosen.
- **Ember** (#ffb088): the warm interactive glow of the depths — input carets,
  focused underlines, bubble hover rims.
- **Splash White** (#fbf6ea): the warm white of the reveal bloom; also the
  Surfacing's whisper-paper. Never used as a page background.
- **Keepsake ramp** (#f2ead9 → #cfc4ae → #9a8f7c): title → body → muted
  echoes on the keepsake panel.

### Named Rules
**The Seed Colour Rule.** Her colour appears only as *light* — motes, glows,
ripples, ember rims, and the inked lettering of her name. It is never a
background, never a tint over imagery, never a fill on a panel.

**The Sacred Glass Rule.** The 132 persona images are never tinted, graded,
or colour-mixed. Colour may sit *beside* the glass (the tag, the air), never
*on* it.

**The Darkness Rule.** In the depths, darkness makes the light pop: raise
contrast by darkening the surround (veils, pools of night), never by
flattening the palette. Text over the dark world always carries a black
text-shadow underlay for legibility.

## 3. Typography

**Display Font:** Playfair Display, italic (with serif fallback)
**Body Font:** Inter (with sans-serif fallback)
**Accent Font:** Zen Old Mincho (`.font-mincho`, falls back to Playfair)

**Character:** The experience *speaks* in Playfair Display italic — every
question, pole, whispered line, and the user's own handwriting (inputs) is the
fortune teller's voice. Inter is the quiet hand that carries labels, hints,
and body copy without ever raising its voice. Zen Old Mincho appears for the
sumi-ink Japanese accents of the paper world.

> Inter and Playfair are locked brand identity (shipping since the hero was
> approved). Identity-preservation wins: do not swap them for variants, and do
> not add a fourth family.

### Hierarchy
- **Display** (500, clamp(2.75rem, 6.8vmin, 4.6rem), 1.04): the keepsake
  cocktail title and hero headline. Playfair.
- **Headline / Voice** (400 italic, clamp(1.3rem, 3vmin, 1.9rem), ~1.3): the
  journey's spoken lines — gravity poles, depth questions, ember words.
  Playfair italic, always with a deep black text-shadow over footage.
- **Body** (400, 0.96–1.05rem, 1.6–1.75): keepsake prose, capped at 62ch.
  Inter.
- **Label** (500, 0.68–0.76rem, 0.2em tracking, uppercase): brass section
  labels and the "for" line. This is a *named brand system* (the keepsake's
  apothecary labels), deliberately scoped to the keepsake and threshold pill —
  never scaffolded above every section.
- **Hint** (400, 13px, 0.04–0.06em): candle-ivory at ~0.5 alpha; interaction
  whispers ("touch a depth", drag hints).

### Named Rules
**The Italic Voice Rule.** If the interface is *saying* something to her, it
is Playfair italic. If it is *labelling* something, it is Inter. Never mix
the two jobs in one line.

## 4. Elevation

The depths have no shadow ladder — **depth is light**. Hierarchy is conveyed
by luminosity (glows keyed to `--c`, e.g. `0 0 24px 2px var(--c)`), by inset
glass highlights on bubbles, and by layered veils (radial pools of night,
breathing vignettes, blur planes). `backdrop-filter: blur(2–4px)` is reserved
for glass-sphere elements (bubbles, drops, the threshold pill) where the
refraction *is* the material — never as decorative glassmorphism on panels.

The paper world allows exactly one soft ink shadow family for pressed/raised
states: `0 10px 28px -10px rgba(22,20,15,0.5)` on `btn-ink` and
`0 8px 22px -8px rgba(22,20,15,0.55)` on active pills.

### Named Rules
**The Light-Is-Depth Rule.** To bring an element forward in the depths, make
it glow brighter or sit on a darker pool — never give it a drop shadow.

## 5. Components

Everything is a circle, a pill, or a line. Nothing is a box.

### Buttons
- **Shape:** full pill (999px radius), always.
- **Ink button** (paper world): ink #16140f on paper #f4efe6, 0.9rem 2.2rem,
  0.08em tracking; hover scales 1.04 with deeper ink shadow; active 0.96.
- **Veil button** (depths; `.depth-continue`, `.surf-action`, the trace seal):
  transparent with 1px ivory border at ~0.16–0.25 alpha, candle-ivory text,
  backdrop blur 4px; hover warms the border toward ember/vermilion with a
  soft glow. Fades in only when it has earned the right to exist.
- **Focus:** `outline: 2px solid var(--vermilion)` with offset (see slider
  thumb); focus states must survive the dark.

### Pills / Choices (paper world)
- **Style:** 1px ink border at 0.28 alpha on translucent paper (0.6 alpha),
  13px Inter; hover lifts 1px and solidifies the border.
- **Selected:** inverts to solid ink with paper text and the ink shadow.

### Inputs
- **Style:** no boxes — a bare bottom border only (1px, ink 0.3 alpha on
  paper; ivory 0.3 alpha in the depths), Playfair italic text: the user
  writes in the experience's own hand.
- **Focus:** border warms (ink solid / ember 0.75) and, in the depths, the
  text gains an ember glow (`text-shadow: 0 0 18px rgba(255,176,136,0.35)`).
- **Placeholders:** same hue as the text at ~0.3–0.55 alpha, lifted on dark
  holds where the footage is bright.

### The Glass Sphere family (signature)
The journey's one repeated affordance: a translucent glass orb with a
refractive highlight at its upper-left shoulder.
- **Lens bubble** (H1): clamp(118–154px), 1px warm rim, inner radial
  highlight, drifting on desynced 5–8s currents; hover swells 1.1.
- **Seed drop** (H2): the same sphere with the seed colour glowing *inside*
  the glass (radial from centre), backdrop-blur refracting the footage.
- **Mote / ember** (H3–H4): the condensed form — a 26–38px radiant dot of
  `--c` with the double glow, used as slider handle and catchable word-anchor.
- All burst, fizz, or dissolve on selection; none ever "click" statically.

### Keepsake lists (the recipe)
- **Ingredients:** flexed rows, brass amounts (min-width 4.5rem), hairline
  ivory dividers at 0.07 alpha, no bullets.
- **Ritual:** CSS-counter numerals in brass, tabular-nums, 2rem hang.
- Prints clean: the print stylesheet flattens to ink-on-white; keep it working.

### Slider (paper world)
A brush line with imperceptible ticks and an irregular ink-blob thumb
(organic border-radius), rotating slightly on hover. No numbers shown.

## 6. Do's and Don'ts

### Do:
- **Do** honor `prefers-reduced-motion` on every hold — each animation needs
  its static or near-instant (0.2–0.4s) counterpart, and canvas effects need
  their own reduced-motion branch. This ships already; keep the standard.
- **Do** keep text over footage legible with the black text-shadow underlay
  and, on bright bands, a pool-of-night backing layer.
- **Do** drive all seed-coloured styling through the `--c` custom property.
- **Do** ease with `cubic-bezier(0.16, 1, 0.3, 1)` (or the 0.22/0.61/0.36/1
  glide for camera moves); never bounce, never elastic.
- **Do** use `playUntil(target, then)` for the journey footage — native 1×
  play, freeze on arrival.

### Don't:
- **Don't** build anything resembling a "flat, SaaS-style dashboard" — no
  cards, no panels, no boxes (PRODUCT.md anti-reference, verbatim).
- **Don't** use "cartoonish or childish magic" — no wizard hats, no bright
  neon glows; magic here is candlelight and ink, not sparkle effects.
- **Don't** lay out results as a "cliché generic cocktail menu"; the keepsake
  is an apothecary reading, not a menu grid.
- **Don't** go "clinical or overly minimal stark-white"; even the splash
  white is warm (#fbf6ea) and the paper is grained and washed.
- **Don't** tint, grade, or colour-overlay the persona images (the Sacred
  Glass Rule) — the seed colour is lettering and light only.
- **Don't** slow, scrub, or variable-rate the journey video, ever.
- **Don't** show chapter labels or numbers to the user; the journey reads as
  one continuous experience.
- **Don't** redesign the hero/landing — it is locked and loved.
- **Don't** add drag interactions; every depth interaction is a click/touch.
- **Don't** use pure #000 or pure #fff anywhere; both worlds are warm.
