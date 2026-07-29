# Dionysus — Complete Experience Specification

**Date:** 2026-07-08 (finalisation session, evening of 2026-07-07)
**Author:** Robin with Claude (Fable)
**Status:** Final — every open experience decision is closed. This document is the
input to the architecture phase; nothing below is provisional unless explicitly
marked "build-phase detail."

**What this document is:** the consolidated finalisation of the whole webapp
experience. It does not restate what earlier documents already lock — it closes
every gap between them. Read together with:

- `_progress/00-design-log.md` — build history, locked constraints (top section)
- `2026-07-07-the-surfacing-reveal-design.md` — the reveal, beats 1–5
- `C-UX-Scenarios/00-ux-scenarios.md` — scenarios and page coverage
- Cross-session memory: the agent pipeline (two-tier, "Bartender" single call,
  deterministic fallback) is locked and unchanged by this document.

---

## 1. The experience at a glance

```
/                    The journey: Entrance (hero, locked) → The Depths (H1–H9)
                     → The Surfacing (unveiling + keepsake)
/pour/:id            A poured result: owner permalink, shared guest arrival,
                     and the curated house exemplars — one page, three uses
anything else        The poetic 404
```

Phases in `App`: **landing → depths → reveal**. `craftCocktail(answers)` and the
Bartender call resolve during the breath (H8's ENGINE SEAM — unchanged). The old
quiz/brewing/CocktailReveal phases leave the flow (components stay in the repo).

---

## 2. Sharing — The Gifted Elixir (supersedes the 2.1 outline's mechanics)

The 2.1 outline's "miniature overflow replay" was written against the retired
ink-wash reveal. Its intent carries over; its mechanics are now:

**The shared page is the Condensed Surfacing.** `/pour/:id` opens on warm white —
the same bloom the owner saw — and the persona image resolves out of it with the
unveiling choreography (condense → focus pull → the name inks onto the tag in the
owner's seed colour), then the keepsake composes below. ~3–4 s, no interaction
required. Reduced-motion twin: crossfade with the name pre-inked (same rule as
the owner reveal).

**Persistence: server-side at reveal.** Every completed reveal writes one small
record and mints a short unguessable ID (`/pour/x7k2m9`):

| Field | Note |
|---|---|
| `id` | short, unguessable |
| `pairing` | primary–secondary archetype key (selects the persona image + pre-authored cocktail) |
| `name` | the given name from H1, as displayed on the tag |
| `seed` | the seed colour |
| `emotionalFit`, `rationale` | the Bartender's two live fields (or the deterministic template text) |
| `createdAt` | also gives completion analytics for free |

**The trace ("one true thing") is never persisted and never sent to the server.**
The allusion-only rule is already enforced client-side in the breath; the
persisted record contains no trace-derived content.

**Owner affordances on the keepsake:** a quiet sibling pair — **save** (print CSS
→ PDF, as specced) **· send** (copy link on desktop, native share sheet on
mobile). Send failure gets a quiet in-world retry line, never a raw error.

**Guest-arrival state** (unchanged in intent from 2.1): identical narrative and
recipe to the owner view; "preserve this recipe" available to guests; primary CTA
is **"Discover the cocktail within you"** → the Entrance (fresh start; only the
Color Seed persists, per the abandonment rule).

**OG preview: persona image + inked name.** A dynamic OG route composites the
name onto the tag so the link unfurls as "made for her," not stock art. (The 132
base images double as the compositing source; no per-result image storage.)

---

## 3. Mobile — the full responsive journey

Decision: **the journey itself goes fully responsive — same magic, adapted per
hold.** No separate "mobile version"; each hold is adapted on its own terms with
the same propose → build → verify rhythm as desktop (Playwright mobile viewport).

**The focal map.** The footage is never re-shot or letterboxed. Portrait gets a
centre-crop (`object-fit: cover`) driven by a per-stage focal map: every hold
freezes at a known timestamp, so each stage declares the frame's heart (the
clouds, the bitters drops, the crown…) and `object-position` tracks it. One
small data structure; values are a build-phase detail tuned per hold.

**Per-hold adaptation notes** (the known work, from the desktop builds):

- H1 — name input must survive the software keyboard; lens bubbles are taps already.
- H3 — the mote drag gets a touch twin with a widened hit area.
- H5 — constellation scatter gets a portrait layout preset (extreme-ratio scatter
  was already an open feel-check).
- H6 — the four glasses likely compose 2×2; bubbles/wards are taps already.
- H7 — ring label density fix (open feel-check on desktop too).
- H8 — the nine echo surfacing spots get a portrait preset.
- H2, H4, H9, Surfacing — tap/choreography-only; focal map + type scale expected
  to suffice.

**The Velvet Rope is the degrade state, not the strategy.** While mobile holds
are still being built, and permanently for genuinely unsupported devices (tiny
viewports, ancient browsers), the journey shows an in-world threshold —
*"this ritual is poured on a wider table"* (copy tbc in register) — with two
gifts, never a dead end: **send yourself the door** (email/copy the link) and
**taste one already poured** (a house exemplar `/pour/:id`). Nobody ever reaches
a broken hold. Default copy (tunable in build against the register): *"this
ritual is poured on a wider table — send yourself the door, or taste one
already poured."*

**The shared page (`/pour/:id`) is mobile-first from day one** — it is where
Danielle lands, independent of the journey's mobile rollout.

---

## 4. Resilience — the four states, finalised

- **Silent fallback (supersedes 3.1's "agent-failure apology").** When the
  Bartender call fails or times out, the deterministic engine's result surfaces
  through the *identical* choreography — the user never knows. The two live
  fields fall back to template copy written well enough to stand alone. The
  in-fiction apology + exemplar recovery state is **deleted from the spec**
  (the fallback makes it unreachable).
- **The poetic 404** — *"The ink has settled. This glass was never poured."* —
  covers unknown routes **and dead/mistyped `/pour/` IDs**, with a quiet path to
  the Entrance ("discover your own").
- **Still Water (reduced-motion) is a first-class designed mode**, not per-hold
  patchwork: every surface has a twin (already true for H1–H9 and the Surfacing;
  the shared page crossfades with the name pre-inked). Sound in Still Water:
  the bed stays, the transients go.
- **Resize & touch parity** — resizing mid-hold must not break any canvas scene
  (acceptance criterion; largely already true via DPR-aware canvases); every
  desktop gesture has a calibrated touch twin (see §3).

---

## 5. The Entrance side door

The hero — locked-as-loved — gains exactly one whisper: a muted line below the
primary CTA, **"taste one already poured"**, leading to a curated house exemplar
(`/pour/:id`, the Trickster pour — Magician × Outlaw — per Scenario 03's design
resolution). It serves Edward's 3–5 minute audit budget (the payoff craft in
ninety seconds) and the hesitant visitor from the trigger map. No second button,
no competition with the primary CTA; hero composition otherwise untouched.

Exemplars are ordinary pour records authored by the house — no separate build.

---

## 6. Sound identity — "Water & Ink," choreographed to the flow

**Principle (Robin's framing, locked):** the audio follows the flow of the
questionnaire and the reveal — keyed to the journey's stages and beats, never a
generic ambient loop. Diegetic-first: every sound comes from inside the drink's
world. **Silence is an instrument** — everything before the unveiling exists to
buy its quiet.

The arc, mapped to the footage:

| Beat | Sound |
|---|---|
| Entrance (hero) | Silence. The CTA click is the audio unlock *and* the first sound: a soft submerging swallow as the descent begins. |
| The holds (H1–H8) | One continuous felt-not-heard bed — filtered, pressurised, inside-the-liquid. It never stops; it breathes. |
| Interactions | Tiny diegetic accents: keystroke motes tick like micro-bubbles (H1); the seed lands as one deep drop (H2); gravity commits as leaning currents (H3); embers catch with a soft flare (H4); each glint a faint glass harmonic (H5); bubble catches pop gently (H6); rings ripple, trace keystrokes scratch like a nib (H7); echoes surface as whisper-swells (H8). |
| Ascents between holds | The bed briefly opens — water moving, rising. |
| The letting go (H9) | Near-silence as the tableau exhales; the falling drop is a thin descending tone. |
| The splash | **The loudest single moment of the entire piece** — the crown heard for real; the bloom bleaches the sound as it bleaches the frame, washing into soft air. |
| The unveiling | Total silence. The only sound at the money shot is the nib inking the name. |
| The keepsake | The gentlest return of the bed, domesticated, under the composing text. |

**Mechanics:** unlocked by the Entrance CTA gesture (autoplay-safe); a quiet
in-world toggle with the preference persisted; Still Water keeps the bed and
drops the transients. Asset sourcing/authoring is a build-phase task; this
direction is final.

---

## 7. The Surfacing — final opens closed

- **The unveiling whisper:** **"meet the cocktail within"** — closing the
  three-beat motif that runs through the experience: *"Discover the Spirit
  Within"* (hero) → *"trust the spirit within"* (H4 practice) → *"meet the
  cocktail within"* (unveiling). The line makes the advance read as an
  introduction, not a UI action.
- **Superseded 2026-07-09 (Robin's live call, feel-pass):** the advance from
  the whisper into the keepsake is no longer user-initiated — it autoplays on
  a timer (~8.6s from mount; ~2.7s reduced-motion). A click after the whisper
  still skips ahead early as an escape hatch, but nothing waits on one. See
  the design log's 2026-07-09 entry for the full feel-pass (spotlight
  composition, ember-edged condense, keepsake formatting).
- **Beat-5 title colour: warm ivory.** The seed colour lives in the inked name
  and nowhere else — one coloured element on the keepsake keeps the name
  unmistakably *the* personal thing. (The no-tint rule on the persona image is
  unchanged and absolute.)
- Beat 3's transitional whisper stub ("the surface breaks · to be continued")
  disappears once `TheSurfacing` attaches to `onComplete`.
- **Asset amendments (2026-07-08, from the first two real images):** persona
  images are **3:4 portrait** (896×1200 masters), not 4:5; beat 4 renders them
  full-height `contain` on the dark stage (full-bleed cover would crop out the
  tag and the glass on wide screens; no vignette — the no-grade rule is
  absolute); the fixed tag safe area is replaced by a **per-image tag
  transform** (`src/data/personas.ts`: `{cx, cy, w, angle}` + a `glass` point
  the bloom condenses into). Beats 4–5 are BUILT and verified — see the design
  log 2026-07-08 entry.

---

## 8. The craft floor — the Edward-lens acceptance block

Every surface inherits, and no hold or page reaches "built" status without
verifying, **in both desktop and mobile viewports**:

- 60 fps floor on desktop; no jank on a mid-range phone (DPR-capped canvases)
- Zero console errors
- Transitions < 4 s
- Touch parity for every gesture (§3)
- A Still Water twin (§4)
- Resize-safe mid-animation (§4)
- Type-check via `npx tsc --noEmit -p tsconfig.app.json` (the root config checks nothing)

---

## 9. What architecture must now answer

The experience is closed; these are the questions this spec hands to the
architecture phase (BMAD create-architecture, against the locked pipeline:
Vercel Functions + Hono, one `/api/reveal`, OpenRouter-free Bartender with
deterministic fallback):

1. **Pour storage** — where the ~2 KB pour records live (Vercel KV or
   equivalent), ID generation, retention (default: keep forever).
2. **Endpoints** — `/api/reveal` now also persists and returns the pour ID;
   `GET /pour/:id` data fetch; the dynamic **OG image route** (persona image +
   name composited; e.g. satori/@vercel/og over the 132 base images).
3. **Routing** — client routing for `/` vs `/pour/:id` vs 404 within the
   Vite/React app (currently phase-state only, no router).
4. **Exemplar authoring** — how house pours (the Trickster, the velvet-rope
   pour) are seeded into storage.
5. **Analytics** — what, beyond pour-creation timestamps, is worth capturing
   (completion funnel per hold?) without adding tracking weight.
6. **Audio delivery** — asset format/loading strategy so the bed never stalls
   the video (build-phase, but architecture should reserve the seam).

**Explicitly out of v1 experience scope** (unchanged): runtime image
generation, per-user recipe editing, non-English, the allergens question
(dropped with the pipeline), zero-proof variants (open Tier-A authoring
question, not an app-experience question).

---

## 10. Decision record (2026-07-07 session)

| # | Decision | Choice |
|---|---|---|
| 1 | Shared link opens into | Condensed Surfacing (auto-plays bloom → image → name → keepsake) |
| 2 | Persistence | Server-side at reveal; short unguessable ID |
| 3 | Owner share affordance | save · send quiet sibling pair on the keepsake |
| 4 | OG preview | Persona image + inked name (dynamic route) |
| 5 | Mobile | Full responsive journey, staged per hold; focal-map crops; velvet rope as degrade state only |
| 6 | LLM failure | Silent deterministic fallback; apology state deleted |
| 7 | Resilience block | Poetic 404 (incl. dead pour IDs), Still Water first-class, resize criterion, quiet send-retry |
| 8 | Entrance side door | Yes — whisper line "taste one already poured" below the CTA → house exemplar |
| 9 | Sound | "Water & Ink" diegetic arc choreographed to the flow; splash loudest; unveiling silent but the nib |
| 10 | Unveiling whisper | "meet the cocktail within" |
| 11 | Keepsake title colour | Warm ivory; seed colour reserved for the name alone |
| 12 | Wiring/routes | landing → depths → reveal; `/`, `/pour/:id`, poetic 404 |
| 13 | Craft floor | Edward-lens block (§8) gates "built" status everywhere |
