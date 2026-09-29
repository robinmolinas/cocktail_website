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
    fontFamily: "Playfair, serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.72
  hint:
    fontFamily: "Playfair, serif"
    fontSize: "clamp(15px, 1.9vmin, 17px)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Jost, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    letterSpacing: "0.22em"
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

## 2.5 Persona Image System

**The One Room, Different Person Rule.** Every cocktail portrait belongs to
the same Dionysus world: near-black atmosphere, one believable warm practical
light, dark worn wood, glass, tactile paper or linen, restrained colour, and
photographic imperfection. Personality changes what happened in the room
— the object count, evidence, gesture and emotional temperature — but never
changes the world into a modern studio, stainless-steel bar, neon club, or
bright lifestyle set.

**The No-Metal Image Rule.** Brass remains a small interface colour, not a
photographic material direction. Persona scenes are authored from timber,
glass, paper, linen, ceramic, cork, fruit and shadow. Never use a metal counter,
backdrop, lamp, shaker or hero tool; never let chrome, steel or brass define the
room. If a recipe makes a tiny functional metal part unavoidable, it must be
dull, peripheral and visually subordinate enough that the scene still reads as
wood-and-paper Dionysus at first glance.

Each image must read in this order:

1. **The drink** — one physically accurate hero cocktail.
2. **The person** — two to four plausible traces of who made it or who it is
   for. Human presence is implied through wear, repair, ritual and placement;
   no literal portrait is required.
3. **The recipe** — ingredients and tools appear only when they clarify the
   pour. They never become the main subject.

**The No-Puzzle Rule.** A story detail must be understandable before the
reading explains it. No impossible reflected drinks, unexplained coloured
rings, magical stains, symbolic object armies, or other metaphors that need a
caption. Surrealism is allowed only when the visual remains immediately
legible and physically grounded.

**The Observed Photograph Rule.** Use one plausible light source, natural
shadow falloff, restrained saturation, uneven handling wear, imperfect prop
placement, slight optical softness and fine irregular grain. Reject piped or
sculpted cocktail textures, perfect CGI ice, uniform gloss, HDR microcontrast,
decorative pseudo-writing, flawless symmetry, and generic cinematic bokeh.

**The Tag Rule.** Every scene includes one blank physical cream tag, tied to
the glass and fully inside frame. It is slightly handled, never typeset inside
the source image. Its writable area and angle are recorded per asset in
`src/data/personas.ts`; the user's name is the only coloured ink added by the
interface.

Canonical asset layout:

- `public/personas/<pairing>/portrait.jpg` — 896×1200, print and keepsake.
- `public/personas/<pairing>/wide.jpg` — 1920×1080, 16:9 immersive reading room.
- `src/data/personas.ts` — portrait/wide paths, tag transforms and glass focal
  point, keyed by the stable `<primary>-<secondary>` pairing.

The wide master is composed full-bleed, not contained. Keep its left 30–35%
quiet enough for copy, and keep the drink, tag and essential personality traces
inside the central 86% vertically and 90% horizontally. This protects them when
`object-fit: cover` trims a small amount on 16:10 laptops and ultrawide screens.

The full generation template, anti-AI checklist and acceptance gate live in
`../design-artifacts/persona-image-system.md`. That document is the production
rule for completing the 132-image library; this section is the visual-system
contract.

## 3. Typography

**Voice:** Playfair Display — italic for everything spoken (questions, choice
words, titles), roman where a title needs to stand upright.
**Text:** Playfair — the same designer's optical-size cut (`opsz` 5–1200),
used at reading sizes: hints, the landing lede, the reading's prose, the
recipe's items and steps. Display's hairlines break up at 15px over footage;
the text cut holds.
**Label:** Jost — the open Futura. Labels, amounts and numerals, buttons, the
landing's practical note. Didone + geometric sans is the 1920s bar-card
pairing, which is the speakeasy this brand is.

Tokens: `--font-display`, `--font-text`, `--font-label` in `index.css :root`.
Never name a family directly in a rule.

**Character:** The experience *speaks* in Playfair Display italic, *explains*
in Playfair upright, and *labels* in Jost. One family says everything the
guest reads; the sans only names and counts.

> 2026-09-29 (Robin): Inter and Zen Old Mincho are retired. This supersedes
> the earlier "Inter/Playfair locked" note — Robin asked for better
> combinations with Playfair Display as the main face. Do not add a fourth
> family.

### Hierarchy
- **Display** (500, clamp(2.75rem, 6.8vmin, 4.6rem), 1.04): the keepsake
  cocktail title and hero headline. Playfair.
- **Headline / Voice** (400 italic, clamp(1.3rem, 3vmin, 1.9rem), ~1.3): the
  journey's spoken lines — gravity poles, depth questions, ember words.
  Playfair italic, with the `--legible` hairline over footage (see the
  Legibility Rule).
- **Body** (400, 1.04–1.08rem, 1.6–1.72): keepsake prose and recipe lines.
  Playfair text cut.
- **Label** (Jost 500, 0.7–0.76rem, 0.16–0.26em tracking, uppercase): brass
  section labels, the kicker, the reading cue, the way-onward pill. This is a *named brand system* (the keepsake's
  apothecary labels), deliberately scoped to the keepsake and threshold pill —
  never scaffolded above every section.
- **Hint** (Playfair 400 upright, 15–17px): ivory at 0.86 under the
  question — the "how" beside the "what". Sentence case, plain words
  ("Choose up to three", "Select one again to change your mind").

### The keepsake reading scale (H10 / H11)

The keepsake carries two kinds of content and they must never be typeset
alike. Its own ramp, documented here because the general hierarchy above is
the journey's and this is the destination's:

**The card** — the artifact. What is in the glass and how it is built. Dense,
tabular, scanned rather than read; two columns above 1100px.

| step | size | notes |
| --- | --- | --- |
| section label | 0.66rem, 0.22em, uppercase | brass; "The Pour" / "The Ritual" |
| amount | 0.86rem, tabular-nums | brass, 4.4rem min-width |
| item / step | 0.95rem / 1.5–1.66 | body ivory; notes in muted italic |

**The letter** — the reading. Prose in the fortune teller's voice, one measure,
its own rhythm.

| step | size | notes |
| --- | --- | --- |
| section label | 0.66rem, 0.22em, uppercase | brass |
| attribution | 0.82rem | muted; the archetype line, *above* the epigraph |
| epigraph | clamp(1.34rem, 1.9vw, 1.74rem) | Playfair italic, title ivory, max 30ch |
| lead paragraph | 1.07rem / 1.66 | title ivory — the letter's one entry point |
| body | 0.99rem / 1.72 | body ivory, measure held to 36rem (~67ch) |
| closing line | clamp(1.06rem, 1.2vw, 1.2rem) | Playfair italic; the pour's own last words |
| quiet action | 0.78rem | muted, hairline underline |

### Named Rules
**The Italic Voice Rule.** If the interface is *saying* something to her, it
is Playfair Display italic. If it is *explaining* how, it is Playfair
upright. If it is *labelling or counting*, it is Jost. Never mix the jobs
in one line — which is also why a recipe amount (Jost, brass) and the thing
you pour (Playfair) are two faces.

**The Legibility Rule.** Text over footage carries `--legible`: a hairline of
warm shadow (`0 1px 2px`, 0.26 alpha) that only defines the letter edge and is
never seen as a shape. Contrast comes from full-strength ivory and weight. Both
a hard `0 1px 3px #000` underlay (turns ivory grey) and a wide dark halo (reads
as a dark patch behind the words) were rejected by Robin. Where a frame is too
pale for ivory, move the element to a darker part of the frame — don't darken
behind it.

**The Paragraph Gap Rule.** In keepsake prose the space *between* paragraphs
must exceed the leading *within* them (currently 1.95rem against a 1.72
line-height). When it does not, paragraphs cannot separate and the reading
collapses into one grey wall however good the copy is.

**The Two Movements Rule.** The card and the letter are different materials.
The card may sit on a pool of night and split into columns; the letter never
does. Neither is ever a panel — no border, no radius, no fill of its own.

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

### The hold grammar (H0–H7)
Every hold is the same four parts, one class each. There is no shade behind
the question: a top-down `.hold-shade` was tried and removed (Robin: the
footage "got super dark"). No dark patches or falls of shadow behind text.
- **`.hold-head`** — question (`.hold-q`) and hint (`.hold-hint`) in one
  stack at 12.5% from the top — except H0, which is only the bare line, and
  H2, whose question sits in the centre of the colour ring.
- **the choice** — centred: spheres, the seed ring, the gravity line, the
  written line.
- **`.hold-next`** — the way onward: the Veil pill — hairline rim, near-clear
  glass, Jost 400 at 11px, 0.24em tracking. Deliberately quiet: a heavier,
  filled version read as "too bold". At 12.5% from the foot; `.is-inline` puts
  it right under H0's line.
  It rises in with `nextIn` when it becomes available (or after `--next-delay`
  when it is available from the start); `.is-full` warms its rim with `--c`
  when the full choice is made; `.is-leaving` fades it with the head.
- **`.depth-dots`** — progress, at the foot.

**The One Exit Rule.** Every answer leaves the same way: the chosen rises
and dissolves (`.sphere-surface`, `--k` staggers), the rest let go where they
are (`.sphere-dissolve`), the head and pill fade (`holdOut`). A written line
lifts off its underline (`.depth-input.is-sealed`). No white flashes, blooms or
screen-wide glows on commit.

### Buttons
- **Shape:** full pill (999px radius), always.
- **House pill** (`CtaButton` → `.cta`): frosted, Jost 500, vermilion sweep on
  hover, glyph trailing (arrow = leads somewhere; share/save glyphs). Glyphs are
  always the house vermilion. Share and Save are equals — same pill, no seed
  glow on either (a lit Share read as a red shadow).
- **Way-onward pill** (`.hold-next`): see the hold grammar.
- **Quiet action** (`.tr-quiet`): Jost, muted, hairline underline — "Start again".
- **Focus:** `outline: 2px solid var(--vermilion)` with offset; focus states
  must survive the dark.

### Inputs
- **Style:** no boxes — a bare bottom border only, Playfair Display italic in
  the choice-word ivory (#fbf4e8) with `--legible`: she writes in the
  experience's own hand, at the same strength as every choice word.
- **Focus:** the border warms to ember.
- **Commit:** the words lift off the line and dissolve while a breath of
  bubbles rises from it.

### The Sphere (signature — the one "choose me")
`.sphere-cluster > .sphere-drift > button.sphere-btn > .sphere > .sphere-word`.
H1's lenses, H4's pairs, H5's words, H6's flavours and H6's "leave out" are
all this one object: a translucent glass sphere (the `--sphere-*` tokens),
the word inside in Playfair Display italic 500, one size
(`clamp(112px, 15vmin, 142px)`; H1's phrases use `.is-lens`,
`clamp(132px, 18.5vmin, 176px)`; H4's pair uses a large variant), drifting on
desynced currents.
- **Rising field** (H6 flavours, `.sphere-field > .sphere-float`): the same
  spheres climb slowly in lanes, condensing in above the pill and dissolving
  under the question; catching one holds it, and risers ease around a held one.
  H6's "leave out" spheres rise up into a still cluster (`.is-rising`) instead.
- **States:** `.is-lit` (lights in `--c`, swells 1.1, fizzes on canvas at
  H5/H6), `.is-dim` (field full), `.is-refused` (a gentle shake),
  `.is-popped` (H6 · leave out: the glass pops into a ring of foam droplets,
  the struck word stays; tap again to blow it back — markup uses
  `.sphere-slot` so the word outlives its glass).
- **H4 variant (`.ember`)**: the round's clock is the glass thinning
  (`--ember-glow` scales rim/fill alpha), the word holding until the last
  stretch, then blurring away. Never a brightness filter on type. The catch
  (`.is-caught`): her colour blooms inside the glass, fine fizz climbs out of
  it (canvas), then it rises and dissolves over ~1s; the other sinks
  (`.is-passed`). No rings.
- **Seed drop** (H2): the sphere's sibling with the seed colour glowing inside;
  the ring's centre holds the question, with the colour being tried on named
  beneath it (`.seed-center`, `.seed-name`).
- **Spirit point** (H8/H9, canvas): not a sphere. It is the same material as
  the motes that draw the chalice (a point of warm light, `--c` as its glow),
  one size larger, sending out one slow ring. It is the drop that falls. (A
  glass bubble there read as cartoony next to the line work.)

### The Ripple
`.ripple` — two thin rings of `--c`, eased fast-then-slow, for H2's drop
chosen and H3's mote let go. Never a thick stamped circle, and not for a
sphere choice: on H4 the rings read as quick and flat (see the catch above).

### Keepsake lists (the recipe)
- **Ingredients:** flexed rows, brass amounts (min-width 4.4rem), hairline
  ivory dividers at 0.07 alpha, no bullets.
- **Ritual:** CSS-counter numerals in brass, tabular-nums, 2.3rem hang.
- Above 1100px the two sit side by side as one card; below, they stack.
- Prints clean: the print stylesheet flattens to ink-on-white; keep it working.

### The reading spine (H10)
A hairline in the letter's left margin, filling with `--c` from `--rp` (the
guest's progress through the reading, written from `TheReading.tsx`). It is
how four screens of prose stay navigable without a scrollbar, a percentage or
a chapter list. Light in the margin — inside the Seed Colour Rule. Hidden
below 1100px, where the column has no margin to hold it, and in print.

The browser scrollbar still exists as a native affordance, but it recedes into
the room: a 7px deep-night rail with a low-contrast warm-grey thumb, brightening
only on hover. It is scoped to the reading route; a white system rail must never
cut through the dark experience.

### The printed keepsake (exactly two sheets)

The page is the white — nothing prints a background. **Sheet one** is the
reason to press print: the portrait plate, the cocktail's name, and the whole
recipe in two columns, never split across a break, so it can be pinned up on
its own. **Sheet two** is the letter: label, attribution and epigraph spanning
the full width as a head, the reading in two columns beneath, and the pour's
closing line spanning the foot.

**The Two Sheets Rule.** It is never three. The letter scales to its own
length via `--letter-fit` (set in `TheReading.tsx`): printed column height goes
as the *square* of type size, so the scale is `sqrt(PAGE_CHARS / chars)`,
where `PAGE_CHARS = 2900` is the measured one-page capacity at full size.
Floor 0.5 (5pt), which holds ~11,500 characters — about 3.4× the longest
reading the studio has authored (the 19 pours run 1,812–3,347).

Two columns, **never three**: capacity is the sum of the column widths times
the page height, and that sum is fixed by the page. A third column only
subtracts another gap from it, so it holds slightly *less*. The two columns
earn their place against one readable 126mm column, not against each other.

### The reading room's first screen (H10)
Title, tagline, then **Share your cocktail** and **Save the recipe** as
equal house pills — they are the page's two jobs (traction and keepsake), so
they sit with the title, and repeat after the letter. The cue beneath reads
"Your recipe and reading". On phones the pills drop their tails
("Share" / "Save") to share one row. Once scrolled, a top scrim keeps the
reading from printing under the nav mark.

### The room (H10 background)
The persona scene is the page's background, never a plate on it. Nothing
drifts over the photograph: the smoke bands and grain were removed
(2026-09-29) — they tinted it and read as lens smudges. Desktop,
tablet and landscape-phone views use the full-bleed **16:9 wide master** with
`object-fit: cover`; portrait phones and printed keepsakes use the 3:4 master.
Small viewport trims are intentional and absorbed by the wide master's safe
area. There is no contained frame, feathered card edge or black side gutter.
The drink, its physical tag and essential personality evidence must remain
inside the protected centre defined in the Persona Image System.

### Slider (paper world)
A brush line with imperceptible ticks and an irregular ink-blob thumb
(organic border-radius), rotating slightly on hover. No numbers shown.

## 6. Do's and Don'ts

### Do:
- **Do** honor `prefers-reduced-motion` on every hold — each animation needs
  its static or near-instant (0.2–0.4s) counterpart, and canvas effects need
  their own reduced-motion branch. This ships already; keep the standard.
- **Do** keep text over footage legible with full-strength ivory and the
  `--legible` hairline; on a pale band, move the element, don't darken behind it.
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
- **Don't** let the nav mark and the page copy sit on different left edges —
  both hang from `--gutter`.
- **Don't** add drag interactions; every depth interaction is a click/touch
  (H3's mote is the one sanctioned drag, with a full keyboard mirror).
- **Don't** ask for anything the reveal cannot honour (why H6's glass beat
  was removed: each pour's glass is fixed).
- **Don't** use pure #000 or pure #fff anywhere; both worlds are warm.
