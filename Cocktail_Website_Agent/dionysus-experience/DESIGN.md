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
    fontFamily: "EB Garamond, serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.72
  hint:
    fontFamily: "EB Garamond, serif"
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

Dionysus is a continuous dark journey: the photographic spotlight hero invites
her into light suspended in liquid, and the cocktail's room emerges through
that same dark. The reveal never leaves the darkness (locked 2026-07-10,
"one stroke of dark"). Near-black liquid, candlelight ivory, glass spheres
and seed-coloured motes carry the experience. The warm paper/ink palette
serves print and preserved paper-era references; it does not require a paper
landing or an ink-clearing quiz. The seed is light and lettering, never a
tint over the persona scene.

This system explicitly rejects flat SaaS-style dashboards, cartoonish or
childish "magic" (wizard hats, bright neon), cliché generic cocktail menus,
and clinical stark-white minimalism. Nothing in the journey is a card, a
panel, or a box: interface elements are bubbles, drops, motes, rings, and
underlined lines of handwriting, suspended in the dark.

**Key Characteristics:**
- One voice: candlelit screens and a warm printed keepsake.
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
- **Reading-room Night** (#060505, `--night`): the ground of the cocktail
  page (H10/H11) and its overlays, one step darker and cooler than Deep
  Night. Recorded 2026-10-12 as it already ships (the review found the gap);
  keep the two distinct unless Robin decides to merge them.
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

**The Timber Room, Functional Metal Rule.** The user's clarification applies
to the bar/table and the overall atmosphere, not a blanket ban on equipment.
Use dark worn timber surfaces, tactile paper/linen and restrained warm light;
avoid metal counters, industrial backsplashes and chrome-dominated rooms.
Shakers, spoons, jiggers, knives, lamp hardware and personal objects may be
metal when their function makes sense, with natural reflections and wear.
Keep the cocktail dominant and the palette continuous with the experience.
This protects immersion while allowing a believable working bar.

**The Recipe-First Serving Rule.** Individual pours have one hero drinking
glass. A settled shared recipe may instead have one hero serving bowl/vessel
and necessary receiving cups, subject to a shared-serve pilot review. Never
change the serving format or invent a single-serve recipe for the photograph.
Each hero vessel carries one blank physical name tag.

**The Ready-Pour Production Rule.** Read the complete settled pour and current
image system; resolve obsolete impossible-detail briefs into plausible traces.
Pilot distinct serving types before scaling. Batch only ready pours and hand
off reviewed wide/portrait exports and measured tag/glass coordinates to one
integration owner. Candidate imagery, technical review and user approval are
separate states; existing assets are preserved until a replacement is accepted.

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
`shared/data/personas.ts`; the user's name is the only coloured ink added by the
interface.

Canonical asset layout:

- `public/personas/<pairing>/portrait.jpg` — 896×1200, print and keepsake.
- `public/personas/<pairing>/wide.jpg` — 1920×1080, 16:9 immersive reading room.
- `shared/data/personas.ts` — portrait/wide paths, tag transforms and glass focal
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
**Text:** EB Garamond, used at reading sizes: hints, the landing lede, the
reading's prose, the recipe's items and steps. Display's hairlines break up at
15px over footage; a book face holds, and reads calmer and narrower than the
Playfair text cut it replaced (2026-10-17, designer review, specimen direction
C in `../design-artifacts/evolution/prototypes/type-specimen-2026-10-17/`).
**Poles:** Cormorant Garamond italic 600, for H3's two pole words only
(`--font-pole`), sized ×1.33 to match Display's x-height. Never thin: 300
vanished on the cream cloud.
**Label:** Jost — the open Futura. Labels, amounts and numerals, buttons, the
landing's practical note. Didone + geometric sans is the 1920s bar-card
pairing, which is the speakeasy this brand is.

Tokens: `--font-display`, `--font-text`, `--font-pole`, `--font-label` in `index.css :root`.
Never name a family directly in a rule.

**Character:** The experience *speaks* in Playfair Display italic, *explains*
in EB Garamond, and *labels* in Jost. The voice is one family; the book face
only explains, and the sans only names and counts.

> 2026-09-29 (Robin): Inter and Zen Old Mincho are retired. This supersedes
> the earlier "Inter/Playfair locked" note — Robin asked for better
> combinations with Playfair Display as the main face. Do not add a fourth
> family.

### Hierarchy
- **Display** (500, clamp(2.75rem, 6.8vmin, 4.6rem), 1.04): the keepsake
  cocktail title and hero headline. Playfair.
- **Headline / Voice** (400 italic, clamp(1.3rem, 3vmin, 1.9rem), ~1.3): the
  journey's spoken lines — depth questions, ember words (the gravity poles
  are Cormorant 600, see Poles above). Playfair Display italic, with the `--legible` hairline over footage (see the
  Legibility Rule).
- **Body** (400, 1.04–1.08rem, 1.6–1.72): keepsake prose and recipe lines.
  EB Garamond.
- **Label** (Jost 500, 0.7–0.76rem, 0.16–0.26em tracking, uppercase): brass
  section labels, the kicker, the reading cue, the way-onward pill. This is a *named brand system* (the keepsake's
  apothecary labels), deliberately scoped to the keepsake and threshold pill —
  never scaffolded above every section.
- **Hint** (EB Garamond 400 upright, 15–17px): ivory at 0.86 under the
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
its own rhythm, in **four movements** (Robin, 2026-10-12; chosen over an
annotated margin and a moving camera after testing all three). The studio
writes every letter to one shape, and each movement opens on one line said
aloud:

1. **"This is you, {the personality}."** — `whoYouAre`, at lead size.
2. **"The inspiration for your cocktail."** — the epigraph, then the story,
   its reveal and why it is you (`yours` up to the last two paragraphs). The
   epigraph is about the cocktail and teases the story, so on screen it opens
   the story, not the letter (Robin: at the top it spoke about the drink where
   she expected herself). Print keeps it as the head of sheet two.
3. **"The cocktail I've made for you: {name}."** — the drink-as-proof
   paragraph ("So this is his drink…"), then the recipe card itself. The
   recipe used to come before the letter; now it arrives where the story
   arrives at the drink. The whole line is italic, the name included (a roman
   name inside the italic line read as a mistake, Robin 2026-10-12).
4. **"Before you go."** — the proposal, at lead size like who-you-are, then
   Share and Keep.

The order is load-bearing: the proof paragraph says "his drink" and recaps
the story, so it can only follow it. A guest still gets the recipe first and
no letter.

| step | size | notes |
| --- | --- | --- |
| section label | 0.66rem, 0.22em, uppercase | brass |
| movement line | clamp(1.5rem, 2vw, 1.86rem) / 1.2 | Playfair Display italic, title ivory, balanced; its mark on the spine |
| epigraph (opens the story) | clamp(1.18rem, 1.4vw, 1.34rem) / 1.42 | Playfair Display italic, body ivory, max 32ch |
| lead (who you are, the proposal) | clamp(1.14rem, 1.24vw, 1.26rem) / 1.66 | title ivory: the two places the letter speaks straight to her |
| body (the story, the proof) | 1.1rem / 1.76 | body ivory, measure held to 36rem (~67ch) |
| closing line | clamp(1.06rem, 1.2vw, 1.2rem) | Playfair italic; the pour's own last words |
| quiet action | 0.78rem | muted, hairline underline |

### Named Rules
**The Italic Voice Rule.** If the interface is *saying* something to her, it
is Playfair Display italic. If it is *explaining* how, it is EB Garamond
upright. If it is *labelling or counting*, it is Jost. Never mix the jobs
in one line — which is also why a recipe amount (Jost, brass) and the thing
you pour (EB Garamond) are two faces.

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
  written line. On phones (≤640px) the gravity line runs almost edge to edge,
  so its two words sit *above* their ends, like the marks on a scale, never on
  the line (Robin's phone test, 2026-10-13).
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
  always the house vermilion. Share and Keep are equals — same pill, no seed
  glow on either (a lit Share read as a red shadow).
- **Way-onward pill** (`.hold-next`): see the hold grammar.
- **Quiet action** (`.tr-quiet`): Jost, muted, hairline underline — "Start again",
  and the three ways to keep the cocktail.
- **Sound control** (`SoundToggle` → `.sound-toggle`, mounted beside App in
  `main.tsx`): a small hairline pill on the nav's line, opposite the mark,
  centred on the mark's glyph, the same on every screen (the landing included,
  so she can see how to stop the music before it starts). Jost tracked caps in
  full ivory with `--legible`, so it reads over H2's amber and H4's cream with
  no dark behind it. Four static bars stand when on and lie down when off;
  they never pulse. Hidden in print.
- **Focus:** `outline: 2px solid var(--vermilion)` with offset; focus states
  must survive the dark.

### The score (sound)
One director, `src/audio/score.ts`, plays one ElevenLabs suite cut into chapter
cues (`src/audio/cues.ts`; the cutting script and rights live in
`../design-artifacts/2026-10-06-type-icons-sound/sound/`). TheDepths reports
its stages; nothing waits on the music, and it fails silently. Rules:
- **Silence frames it.** The landing is silent; the depths swell in out of the
  descent. The music never drops out mid-journey: under the unveiling (the
  name inking) the H9 wash rings out quietly until the answer takes it over
  (a silent unveiling read as the music breaking, Robin 2026-10-11).
- **One chapter, one cue.** A cue loops while she stays; a stage change
  crossfades forward, and ascents brighten the low-pass as the camera moves.
  A chapter enters on the chord already sounding (two roots crossfaded beat
  against each other in the bass).
- **H7 is a hush; H8 is the one rise.** The H9 wash lands on the splash, the
  loudest moment of the piece; H10 blooms the answer, then the gentlest bed
  under the letter.
- **Sound is on by default and remembered.** Audio still waits for her first
  touch (the door). "Off" fetches nothing more.

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
`clamp(132px, 18.5vmin, 176px)`; H4's pair uses a large variant, and its 1 / 2
example `.is-number` sets the numerals larger), drifting on
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
- **H5 · her world (`.rw`, ResonanceWorld.tsx)**: the same spheres
  (`.rw-word`, `clamp(92px, 11vmin, 110px)`, phones `clamp(80px, min(24vw,
  11vh), 100px)`) around ONE canvas-drawn circle of her seed colour, never the
  glass. Round 1's words orbit slowly and fall into her, and are then written
  inside her (`.rw-held`, sized to her radius). Round 2's chosen words wear a
  tilted ring of her light, split across a back canvas (behind the glass) and
  a front canvas. Her skin is one lit hairline plus a soft glow: no inner
  highlight arc. Her interior clears as her seed brightens, so the ivory
  writing reads on gold. Centring uses the `translate` property, because the
  entrance animation owns `transform`.
  **Hand-over to H6:** she gathers what drew her into herself, condenses to
  one bright drop, then lets go as her own effervescence while the camera
  rises. Her fizz dissolves under H6's question. The H4 → H5 night falls over
  5.5s and lifts over 3.4s; never a hard cut to dark.
- **H4 variant (`.ember`)**: the round's clock is the glass thinning
  (`--ember-glow` scales rim/fill alpha), the word holding until the last
  stretch, then blurring away. Never a brightness filter on type. The catch
  (`.is-caught`): her colour blooms inside the glass, fine fizz climbs out of
  it (canvas), then it rises and dissolves over ~1s; the other sinks
  (`.is-passed`). No rings.
- **Flavour mark** (H6 flavours only, 2026-10-06): a hairline line drawing
  (`FlavourIcon.tsx`, one family on a 24 grid) sits *above* its word, ivory at
  0.8 so the word leads; lit, it comes to full ivory with a faint `--c` glow,
  never coloured ink, never its own motion, aria-hidden. Fresh is a dewdrop
  with a small second drop (the mint leaf and cucumber slice were rejected).
  The "leave out" vetoes stay word-only. Rules: `../design-artifacts/2026-10-06-type-icons-sound/icons/README.md`.
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
a chapter list. Each movement's opening line has a 7px mark on it, night
with a faint ivory ring until she reaches that movement, then lit in `--c`.
Light in the margin — inside the Seed Colour Rule. Hidden below 1100px, where
the column has no margin to hold it, and in print (the movement lines carry
the way on phones).

The browser scrollbar still exists as a native affordance, but it recedes into
the room: a 7px deep-night rail with a low-contrast warm-grey thumb, brightening
only on hover. It is scoped to the reading route; a white system rail must never
cut through the dark experience.

### The printed keepsake (exactly two sheets)

The page is the white — nothing prints a background. **Sheet one** is the
reason to press print: the portrait plate, the cocktail's name, and the whole
recipe in two columns, never split across a break, so it can be pinned up on
its own. **Sheet two** is the letter: the epigraph alone spans the full width
as its head, one sentence per line (no "The Reading" label over it since
2026-10-12, matching the screen), and the reading runs in two columns beneath.

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
The title and tagline introduce the cocktail; **Share your cocktail** and
**Keep your cocktail** appear **only after the letter**, as equal house pills
(Robin, 2026-10-06; Keep replaced "Save the recipe" 2026-10-12). The opening
cue reads "Your recipe and reading". Where the row cannot hold both full
labels side by side (phones, a narrow letter column), the pills shorten to
"Share" / "Keep", so they always stand level on one line.

**The three words (2026-10-12).** Each cocktail carries three menu words
about the glass itself, never the guest (Tomás's review; `- **words:**` in
each dossier's Cocktail block, exactly three, none repeating the name or the
personality title). They sit where a menu puts them, under the title and
before the tagline: the name and its words are one group, the line about
her stands apart below. Set in the label voice (Jost caps, 0.24em) but in
candle ivory, so they never read as a second kicker; brass points between.
They arrive last, one word at a time (`tr-sip`, 0.45 s apart, after the
tagline has landed); the reading cue follows them. When a narrow screen
wraps them, the point that would open a line is clipped at the margin, so
every line begins with a word. The same line runs in ink on the PDF, in
ivory between the title and the seed hairline on the card (one line, the
size gives before the line does), and in the share text: "…poured “Down the
Line”: dreamy, creamy, floral."

**Keeping it (2026-10-12).** Testers shared the cocktail *to themselves* to
keep it and got the friend's view, without the reading. Each pill now unfolds
its ways as quiet underlines in place under the pills (never a menu or a
modal), one row open at a time. **Share** stays the gift: **Send the link** or
**Send the card** (the card below, its QR code to the gift link, captioned
"scan for the recipe"). **Keep** offers **A link for myself** (a keep link, `#pour=k…`, which opens the whole
reading with "welcome back, {name}."), **As an image** (a 1080×1920
picture: portrait master with the name inked on its tag, type below on the
night, a paper-label QR code back to the keep link; `src/engine/card.ts`.
It is sent as the picture itself, a ~230 KB JPEG, through the share sheet,
so it lands in WhatsApp as a photo; a shared card carries the invitation and
link as its caption. Where no sheet will take it, the card appears under its
row to press and hold) and
**The recipe as a PDF** (the print keepsake, which carries a QR code at the
foot of its title block: the owner's to the keep link, a guest's to the gift
link; it sits level with the plate's foot, so the recipe keeps page one). The device also remembers its
own pours (`src/engine/kept.ts`), so an owner opening their own share link on
that device gets the reading too. Neither is a lock: the reading is authored
per pairing, and a forwarded keep link shows it to whoever holds it. Portrait phones show the
unobscured scene with its caption beneath it on the first screen, the reading below. The screen nav scrim
keeps text from passing under the mark; it and the mark are hidden in print.

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

**Portrait-phone reveal (2026-10-06 mobile correction; 2026-10-13 caption
on the first screen).** The full-bleed room fills the first screen *less its
caption*: the scene's height is `100svh` minus the measured hero (kicker,
name, three words, tagline, cue; `--hero-h` in TheReading.tsx), floored at
`54svh` so a long name pushes the cue, never the glass, off screen. Robin's
phone test: a first screen of photograph alone made the title wait a scroll.
The old "Your cocktail" scene cue is gone; the caption itself is the cue. The
recipe/reading follow in normal document flow, and on portrait phones only the
opening photograph scrolls away rather than remaining behind the copy. The
scene's last 8% dissolves into Night so it never stops at a hard edge over the
caption; the tag crop keeps the ink above that band. No caption is
superimposed on the tag, and no vignette buries the ink. Because the scene
paints smaller, the inked name may shrink to 7px to stay on a small tag. Desktop, tablet-landscape and landscape-phone poster behavior is retained.
This is a responsive sequence within the same dark world, not a contained
photograph, a new card, a recipe change or a tint over the drink.

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
  one continuous experience. (The reading's movement lines are not labels:
  they are sentences in Dionysus's voice, unnumbered — Robin, 2026-10-12.)
- **Don't** let the nav mark and the page copy sit on different left edges —
  both hang from `--gutter`.
- **Don't** add drag interactions; every depth interaction is a click/touch.
  Two drags are sanctioned: H3's mote (with a full keyboard mirror) and
  carrying a word into her at H5 round 1 (Robin, 2026-10-06), which is only
  an alternative to the tap and records exactly what the tap records.
- **Don't** ask for anything the reveal cannot honour (why H6's glass beat
  was removed: each pour's glass is fixed).
- **Don't** use pure #000 or pure #fff anywhere; both worlds are warm.
