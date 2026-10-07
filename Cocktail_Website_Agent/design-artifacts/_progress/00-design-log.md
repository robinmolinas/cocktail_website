# Design Log

**Project:** Dionysus
**Started:** 2026-06-11
**Method:** Whiteport Design Studio (WDS)

---

## Start here (session handoff — updated 2026-10-06)

Robin is continuing Dionysus in three parallel tracks: experience design, cocktail collection review, and questionnaire matching. The [continuation plan](../2026-10-06-parallel-work-plan.md) records the full scope, settled choices, first deliverables, dependencies, file ownership, BMAD source map and conversation briefs. This is planned work; no new implementation or cocktail approval is implied.

Continue the existing WDS propose → build → browser verification → log rhythm through focused product-evolution cycles. Read the existing brief, trigger map and scenarios. The active reveal is `TheReading.tsx`; historical Surfacing/white-bloom entries below are not the current build target. Preserve the later dark-to-dark direction, native video playback and the current image production rules.

Design choices from Robin: H4 needs clearer practice and a premium Ready/Set/Go launch; remove its noninteractive history bubbles; replace the final H1 lens with **Another side of me**, retaining the entered name; keep share/save only at the bottom of the reading. H5 attraction gameplay, typography, smoother arrivals, mobile controls, background music and flavour icons need focused exploration/verification.

The backend architecture is already finalized in `agent/ARCHITECTURE-SPINE.md` (2026-09-23). Its pending handoff is a `bmad-spec` refresh, not a fresh architecture phase. Preserve deterministic top-three eligible pairings followed by the Bartender's bounded choice, unchanged authored recipes/copy fallback, veto filtering, no zero-proof at launch, trace/name privacy and the shared-core seams. Reconcile the later removal of the vessel question and specify H4 timing/status before implementation. The current app still reveals a fixed pilot; coverage and integration remain work to do.

Content proceeds through the existing Pour Studio review desk and Wren/Hester/Tomás reworks. All 132 pours are authored; 112 are draft, 16 flagged and 4 approved at this handoff. Preserve Robin's workbook and tagline annotations. Final images follow settled pours; natural functional metal is allowed while the environment remains predominantly dark timber, glass, paper and linen.

The three tracks can audit/prototype in parallel. Shared answer meanings require a design/matching handoff; one writer owns shared UI files at a time. Carry decisions back into the existing source artifacts and record concrete checks and honest task status. The older handoffs below are dated history; later explicit decisions take precedence.

---

## Start here (session handoff — updated 2026-07-09)

**The Surfacing had a feel-pass** on top of the 2026-07-08 build, after Robin reviewed it live against the two real images. Seven notes, all addressed — see the 2026-07-09 log entry for the full detail. Highlights: the reveal is now **fully autoplay** (no click required — supersedes the reveal spec's "advance is strictly user-initiated" line for this beat specifically, Robin's explicit call in this session); the persona image is now a **spotlight composite** (sharp glass, softly blurred/darkened surround) rather than shown flat/full; the white-to-image condense carries a seed-coloured ember on its collapsing edge; the keepsake got section labels ("The Pour" / "The Ritual" / "The Reading") and a numbered ritual list. `TheSurfacing.tsx` and the surfacing block in `index.css` are the files to read for current behaviour — the 2026-07-08 entry below describes the superseded first-pass version.

## Start here (session handoff — updated 2026-07-08)

**THE WHOLE EXPERIENCE IS NOW FINALISED** — see `design-artifacts/2026-07-08-experience-master-spec.md`, the consolidated spec closing every open experience decision in one evening session (2026-07-07) with Robin: sharing (`/pour/:id`, persist-at-reveal, save·send, dynamic OG with inked name), **full responsive mobile journey** (per-hold adaptation + focal-map crops; velvet rope demoted to degrade state — the "desktop-first" constraint below is superseded for layout, though the no-drag lesson stands), resilience (silent LLM fallback — apology state deleted; poetic 404 incl. dead pour IDs; Still Water first-class), the Entrance side door ("taste one already poured" whisper), the "Water & Ink" sound arc (splash = loudest moment; unveiling silent but the nib), the Surfacing's final calls (whisper: **"meet the cocktail within"**; keepsake title warm ivory, seed colour in the name only), routes `/` + `/pour/:id` + poetic 404, and the Edward-lens craft floor gating "built" status. All 13 session decisions are in the spec's §10 table. **Next step: architecture** (BMAD create-architecture against the locked two-tier pipeline), then implementation plans per area — Surfacing beats 4–5 remain the next build item.

**Where things stand (build):** the "Suspended Pour" video-journey questionnaire (`dionysus-experience`, component `TheDepths.tsx`) is being built one hold at a time, directly in code, with Robin — no formal page-specs/sketches phase; this project is deliberately running WDS Phase 3 (Agentic Development) as propose → build → verify in browser → log. **H1 through H8 are built and verified** (H8 · The Breath is at rev 2 "There You Are" — the continuous-line figure draws through the echo-motes' anchors and the spirit-point ignites). **The reveal phase is designed and specced: "The Surfacing"** — see `design-artifacts/2026-07-07-the-surfacing-reveal-design.md`. **Beats 2–3 are now BUILT and verified in `TheDepths` (H9 · The Letting Go + The Splash):** the spirit-point falls as a seed-coloured drop, the footage resumes at 1× so the crown splash catches it, and a warm-white bloom whites out the frame (freeze at `SURFACE_CUT` 12.95s) before the video's own glass is revealed; a new `onComplete` prop fires at full white. Next: **beats 4–5** ("The Unveiling" money shot + "The Keepsake") in a new `TheSurfacing` component attached to `onComplete`, plus App wiring (landing → depths → reveal) — separate plan; needs the 132 persona images (fallback tier first).

**Locked, do-not-relitigate constraints** (all holds):
- The hero/landing page is already built and loved — never redesign it.
- The background video (`journey.mp4`) must never look laggy: only ever `playUntil(target, then)` — native 1× play, freeze on arrival. Never slow/variable `playbackRate`, never scrub `currentTime`.
- No chapter labels/numbers shown to the user — the journey must read as one continuous experience.
- This experience is desktop-first — no drag-and-drop interactions (learned the hard way on H6; see below).
- Register: mystical/sophisticated/theatrical/intimate ("a high-end speakeasy behind a fortune teller's parlor"), darkness makes light and color pop, high contrast for text over dark backgrounds, honor `prefers-reduced-motion` on every hold.
- **Tooling gotcha:** `npx tsc --noEmit` alone checks nothing in `dionysus-experience` (root tsconfig has no files, only references). Always use `npx tsc --noEmit -p tsconfig.app.json`. (Also saved as a cross-session memory.)
- **Reveal-phase locked decisions (2026-07-07, Robin's explicit calls):** the video's own amber cocktail is **never shown** — the splash (footage 11.9→~13.0s) whites out at its peak into a pre-authored persona image; the persona image is **never tinted or graded** by the user's seed colour (colour appears only as lettering — the name inked on the tag; title placement still open); the 132 persona images are pre-authored by Robin, not runtime AI; reveal stays in-world (dark/warm), advance is always user-initiated.

**Next up: The Surfacing** — implementation plan from the spec, then build. Beat order: beat 2 (the letting go — seed-coloured drop falls from the figure) and beat 3 (splash + bloom cut) need zero new assets; beats 4–5 (unveiling + keepsake) can run on a single `_fallback.jpg` before any of the 132 persona images exist.

**After The Surfacing** (agreed order): sound identity (the entire journey is silent today — the surfacing is where it pays off most), then the craft floor (mobile, performance, reduced-motion audit), then the real LLM distillation wired into the breath's ENGINE SEAM. Sharing (2.1 The Shared Elixir) renders through the Surfacing keepsake's guest-arrival state.

**For full detail:** the `## Log` section below (newest entries first) has the complete build history per hold, including every rejected direction and why. `_progress/brainstorming/journey-map-suspended-pour.md` has the per-hold design rationale and footage timing map. Both are current as of this handoff.

---

## Backlog

> Business-value items. Add links to detail files if needed.

- [x] Complete product brief — Phase 1
- [x] [Define trigger map — Phase 2](file:///Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/design-artifacts/B-Trigger-Map/00-trigger-map.md)
- [x] [Create user scenarios — Phase 3](file:///Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/design-artifacts/C-UX-Scenarios/00-ux-scenarios.md)
- [ ] UX Design (page specs + sketches) — Phase 4

---

## Current

| Task | Started | Agent |
|------|---------|-------|
| Experience evolution — H4 clarity, H5 concepts, typography/mobile and reading actions | in progress 2026-10-06 — EXP-01…07 built; P-H4, P-H5, P-TYPE awaiting Robin ([brief](../evolution/analysis/2026-10-06-experience-evolution-brief.md)) | WDS / Freya |
| Pipeline spec refresh, then matching audit and authored-catalogue integration | pending; architecture finalized 2026-09-23 | BMAD spec / matching owner |
| Cocktail decision pack, corpus/voice review, then images for settled pours | planned 2026-10-06 | Pour Studio / review owner |

**Rules:** Mark what you start. Complete it when done (move to Log). One task at a time per agent.

---

## Design Loop Status

> Per-page design progress. Updated by agents at every design transition.

| Scenario | Step | Page | Status | Updated |
|----------|------|------|--------|---------|
| 01-celestes-descent | 1.1 | The Entrance | wireframed | 2026-06-11 |
| 01-celestes-descent | 1.1 | The Entrance | built | 2026-06-11 |
| 01-celestes-descent | 1.2 | The Threshold | wireframed | 2026-06-11 |
| 01-celestes-descent | all | Full journey (1.1–1.11) | wireframed | 2026-06-12 |
| 01-celestes-descent | 1.2 | The Threshold (H1 · The Quiet Depths) | built | 2026-06-12 |
| 01-celestes-descent | 1.3 | The Seed (H2 · The First Drop) | built | 2026-06-12 |
| 01-celestes-descent | 1.4 | The Gravity (H3 · The Mote Between Two Storms) | built | 2026-06-12 |
| 01-celestes-descent | 1.5 | The Hidden Self (H4 · The Catch) | built | 2026-06-12 |
| 01-celestes-descent | 1.5 | The Hidden Self (H4 · Twin Embers, rev) | built | 2026-07-02 |
| 01-celestes-descent | 1.4 | The Gravity (H3 · The Breath, rev) | built | 2026-07-02 |
| 01-celestes-descent | 1.6 | The Resonance (H5 · The Constellation / Living Night Sky) | built | 2026-07-02 |
| 01-celestes-descent | 1.7 | The Finish (H6 · The Pour, rev 4 — flavours/glass/restrictions) | built | 2026-07-03 |
| 01-celestes-descent | 1.8 | The Trace (H7 · The Still Surface) | built | 2026-07-06 |
| 01-celestes-descent | 1.9 | The Distillation (H8 · The Breath, rev 2 "There You Are") | built | 2026-07-06 |
| 01-celestes-descent | 1.10–1.11 | The Surfacing (reveal + keepsake, supersedes Overflow Reveal + Recipe Card) | specified | 2026-07-07 |
| 01-celestes-descent | 1.10 | The Surfacing beats 2–3 (H9 · The Letting Go + The Splash) | built | 2026-07-07 |
| 01-celestes-descent | 1.10–1.11 | The Surfacing beats 4–5 (TheSurfacing · Unveiling + Keepsake, real Trickster/Visionary images) | built | 2026-07-08 |
| 03-edwards-audit | 3.1 | The poetic 404 (NotFound · "The Last Drop") | built | 2026-07-24 |
| 01-celestes-descent | 1.10–1.11 | The Reading (H10 owner + H11 friend, replaces TheSurfacing) | built | 2026-07-24 |
| 01-celestes-descent | all | Front-end craft pass (a11y, mobile, copy, ending, 404 rebalance) | built | 2026-07-25 |
| 03-edwards-audit | 3.1 | The Velvet Rope (degrade state, <320×440) | built | 2026-07-25 |
| 01-celestes-descent | all | Coherence revamp (one grammar; H4 on-ramp; H5 in spheres; H7 frequency cut) | built | 2026-09-18 |
| 01-celestes-descent | 1.5 | H4 history dots removed; blind-tap guard; hidden-tab replay (EXP-01/04/05) | built | 2026-10-06 |
| 01-celestes-descent | 1.2 | H1 lens "Another side of me" (EXP-02) | built | 2026-10-06 |
| 01-celestes-descent | 1.10–1.11 | H10 share/save bottom only (EXP-03) | built | 2026-10-06 |
| 01-celestes-descent | 1.5 | H4 clear practice + Ready · Set · Go (P-H4) | explored | 2026-10-06 |
| 01-celestes-descent | 1.6 | H5 two directions — A figure / B two rounds (P-H5) | explored | 2026-10-06 |
| 01-celestes-descent | all | Type directions + flavour icons (P-TYPE) | explored | 2026-10-06 |
| 01-celestes-descent | all | Type: keep Playfair system (alternatives declined) | approved | 2026-10-06 |
| 01-celestes-descent | 1.7 | H6 flavour icons (icon above word) | built | 2026-10-06 |
| 01-celestes-descent | 1.5 | H4 v2 — centred line, unlabelled rehearsal, breath count-in | explored | 2026-10-06 |
| 01-celestes-descent | 1.5 | H4 v3 — line + "Word 1/Word 2" examples, the rise is the start | superseded by v4 | 2026-10-06 |
| 01-celestes-descent | 1.5 | H4 v4 — instruction + one short line read in the true middle, both rise, first timed pair is "1 / 2" (larger numerals) | built in app (Robin: "perfect") | 2026-10-06 |
| 01-celestes-descent | 1.6 | H5 "Surface Tension" (drop reaches out / takes in) | explored | 2026-10-06 |
| 01-celestes-descent | 1.6 | H5 "A world of your own" (rounds swapped: gathers in, then reaches out; tap + carry) | built in app (Robin: "I love it") | 2026-10-06 |

**Status values:** `discussed` → `wireframed` → `specified` → `explored` → `building` → `built` → `approved` | `removed`

**How to use:**
- **Append a row** when a page reaches a new status (do not overwrite — latest row per page is current status)
- **Read on startup** to see where the project stands and what to suggest next

---

## Log

### 2026-10-06 (late) — H4 → H5 night slowed; H5 → H6 hand-over: "she becomes the drink"

**Robin:** the screen went dark too quickly from H4 to H5, and the H5 to H6 transition "has not been worked on… make it world class".

**H4 → H5:** both night veils now share one `NIGHTFALL` transition (5.5s, `cubic-bezier(0.45, 0, 0.35, 1)`) across `ascend4` and `resonance`, so it never restarts on arrival. Measured on the H5 veil at 0.5s steps: 0 → 0.03 → 0.18 → 0.37 → 0.56 → 0.83 → 0.91 → 1.0, where the old 2.4s fade was dark almost at once. Her bubble now forms 700ms in, while the night is still settling.

**H5 → H6** (`ResonanceWorld.tsx`):
- **One thesis:** she becomes the drink, in three movements.
  1. **Gather** (0–~2.3s): the rings unwind home and the ringed words fall into her. Integration: what she is and what she wants become one body.
  2. **Condense** (~1.1s): the bubble draws in to a dense, bright drop of her colour, and the words written inside her dissolve into its light.
  3. **Release:** her skin lets go with one soft spread of her light. She rises as fine effervescence (rings of her light, buoyant, wobbling, popping), and `onDone` starts the camera rise at that same moment.
- The H5 night lifts slowly (3.4s) as she lets go. Her fizz climbs on through the H6 arrival and dissolves under the question, as H6's own risers do. H6's flavours rise through it.
- TheDepths keeps the world mounted into `finish` (`resAfterglow`) until `onGone` (last bubble, with a 9s safety). Leaving H5 now fades only the hold's words, never the canvases.
- **Still Water:** no plume, no spatial condense; she fades in place.

**Verified:**
- Full journeys at 1440×900 and 390×844 reached H10 with no console errors, and H6 is fully interactive.
- The world unmounted by about 6–11s after the last Continue.
- Hand-over frames: `evolution/prototypes/h5-world/hand-*.png`.

### 2026-10-06 (night) — H5 "A world of your own" built; H4 → H5 hand-over smoothed

**Robin:** "I love it"; keep the bubble clean (no inner top-left arc); "include H5 and make sure the transition from H4 to H5 is smooth".
- **Order:** his own, soughtFor first.
- **Carry:** kept, since the prototype he approved had it on.
- **Q12:** still 9 words (ticket 1.9 will move round 2 to the 12-word list).

**Built:**
- **`src/components/ResonanceWorld.tsx`** is the H5 hold as a self-contained imperative engine (two canvases plus DOM spheres), ported from the prototype.
- **`TheDepths.tsx`:**
  - `RES_QUESTIONS` now asks soughtFor first.
  - The rev 4 sphere cluster, its state (resQ, maxResQ, resChosen, resSealing, resSealT0), toggleGlint, sealResonance, revertResonance and H5's DepthDots are removed.
  - The world mounts for `resonance` and `ascend5`, saves each round on Continue through `onUpdate`, and fades out while the camera rises to H6 instead of vanishing.
  - The old cluster's back-dots are gone: round 1's words stay written inside her through round 2 instead.
- **CSS:** `.rw*` in `index.css`.
- **DESIGN.md:** the one-drag rule now names H5's carry as the second sanctioned drag, and the Sphere section describes `.rw`.

**H4 → H5 hand-over:**
- H4's dusk now lives outside the hold, so it eases away during the rise instead of popping off with the hold.
- Both night veils start falling during `ascend4` (2.4s), so the camera move and the darkening are one gesture.
- Her bubble then forms in the dark at the citrus hold. The video playback rule is untouched: native 1×, true freeze.

**Verified:**
- Full journeys H1 → H10 at 1440×900 and 390×844, plus a Still Water run at 375×667, all with no console errors. Round 1 held Advice, Calm and A little chaos.
- Round 2 geometry: words clear the head and Continue at every size (desktop 189 vs head 183, 780 vs Continue 806; 375 phone 594 vs 597).
- Two phone fixes from the first pass:
  - Her position is measured against the tallest head either round can show, so round 2's two-line hint no longer meets her.
  - The writing inside her is sized to her radius and wraps long words.
- `tsc` is clean. Lint fell from 40 to 39 problems (the removed code carried one).
- Screenshots: `evolution/prototypes/h5-world/app-*.png`, `rm-app-*.png`.

### 2026-10-06 (evening) — H4 v4 (Robin's review of v3)

**Robin:** the line should be in the middle of the page, not near the top. The instruction appears first, then the description under it. The description read as AI-written, so it should be more to the point. Both lines then rise together, and the rise starts the timer. The first pair is just "1" and "2", then Sharp / Smooth and onward.

**Built** in `evolution/prototypes/h4-ready-set-go/` (v3 moved to `./v3/`):
- "Tap the word that is more you." is centred at 50% on desktop and phone. At 1.5s the line "Two at a time. Go with your gut, or let both fade." appears under it (Still Water: "Two at a time. Take your time, or let both go.").
- At 5.6s both lines rise to the head and the "1 / 2" pair condenses on the real clock. There's no button to press first.
- The second line fades once Sharp / Smooth arrives. The question stays.
- The example diagnostic is unchanged for the matching owner: `example: chosen | notTouched`, outside the timing data. A timeout on 1/2 counts as notTouched.

**Verified** at 1440 and 390: line midpoint at 450/900 and 422/844; the timeout path and the tap path both reach Sharp/Smooth; no errors. Screenshots: `v4-*.png`.

**Built in the app** (Robin: "perfect, 1 and 2 can be a bit bigger"). In `TheDepths.tsx` (H4):
- The Tea / Coffee rehearsal, the "Too quick to think" prompt and the PRACTICE_* timings are replaced by `H4_LINES`, `EXAMPLE_PAIR` (1 / 2) and the `H4_*_MS` beats.
- One `.h4-line` is born in the middle and rises; the question stays "Tap the word that is more you." for all nine.
- `.h4-dusk` dims the whole frame to 0.28 while she reads and 0.16 after the rise.
- The example runs on the nine's clock (850 + 3400ms, readable at 250ms). `.ember.is-number` sets the numerals at clamp(2.3rem, 5.4vmin, 3.2rem); the prototype matches.
- The hidden-tab replay and Still Water's "Let them cool" are unchanged.

**Checked:**
- `tsc -p tsconfig.app.json` is clean, and lint stays at its 40-problem baseline.
- Full journeys at 1440×900 and 390×844 ran H1 to H10 with no console errors. The line sits mid-frame (450/900, 422/844), the example shows 1 / 2, the first real pair is Sharp / Smooth, and the hint has faded by then.
- Screenshots: `app-v4-*.png`.

### 2026-10-06 (evening) — Cycle 3: H5 "A world of your own" (Robin's reorder)

**Source:** Robin's review of "Surface Tension". He liked round 2: the words coming into the circle "just made sense, it's part of you". Round 1's reaching neck felt "gamified, gimmicky". His direction: ask what people come to you for **first**, so she constitutes herself as a bubble, then let her spread toward what attracts her. His themes were gravity, planets and integration. He pointed at 21st.dev and React Bits as possible sources.

**Prototype:** `evolution/prototypes/h5-world/` (served at http://localhost:5190/h5-world/; options `?seed=`, `?n=12`, `?motion=still`, `?drag=0`). The concept is described in [`evolution/analysis/2026-10-06-h5-concepts.md`](../evolution/analysis/2026-10-06-h5-concepts.md) §0.
- **Birth:** her H2 seed opens into a bubble of her own colour: a lit skin around an empty centre.
- **Round 1, soughtFor:** the words ride a very slow orbit around her. Touched, a word's orbit gives way and it falls in on a curve, gathering speed. It meets her skin with a ripple and stays inside her as written light, and each word fills her a little. A word can also be carried to her by hand. Touch it inside her to let it go.
- **Turn:** she kindles once, and her first light crosses the dark. The far words appear as that light reaches them.
- **Round 2, drawnToward:** touched, part of her light leaves her on a curve, the way matter streams between two stars, and settles around the word as a ring. Nothing stays drawn between them; the ring is the only sign it was chosen. Touched again, the ring unwinds home.
- **End:** what draws her turns slowly with her, at its distance: her world.

**Verified:** full journeys at 1440×900 and 390×844 (9 words), 390×844 and 375×667 (12 words, Still Water) with no errors and no overlaps. The answers kept vocabulary order. Carrying, short-drag return and release from inside her all work. Ivory writing inside her was checked on blue, gold, green and orange. Her interior clears as her colour brightens, so the gold seed no longer swallows the text.

**Component sources** ([`evolution/analysis/2026-10-06-h5-component-sources.md`](../evolution/analysis/2026-10-06-h5-component-sources.md), a bounded audit by a separate agent):
- React Bits is MIT + Commons Clause, so it can be used inside the app.
- 21st.dev licences vary per component.
- None of the shortlisted WebGL effects respects reduced motion, and most are mouse-only.
- The app has no animation dependencies today. The prototype uses hand-written canvas only, so a production port needs no new package.

**Open for Robin:**
1. This concept versus Surface Tension.
2. The round order swap. The matching owner confirmed the shape, weights and fixtures are unchanged, and Q12 stays attached to drawnToward. Their caveat: asking soughtFor first may prime the motive answer through social role, which would blur the A×B / B×A distinction, already the model's weakest point. Their recommendation: if Robin likes the order, ship it and log questionnaire order as a playtest variable. Drag is fine if it records exactly what a tap does.
3. Whether to override DESIGN.md's one-drag rule so a word can be carried to her (tap stays primary).

### 2026-10-06 (later) — Cycle 2: Robin's review → H4 v2, H5 "Surface Tension", decisions

**Source:** Robin's review of cycle 1's prototypes, plus his decisions recorded by the type/icons/sound session.

**Robin's decisions:**
- **Type: keep Playfair Display / Playfair / Jost.** Neue Montreal, Switzer and Satoshi were seen live and declined. DESIGN.md §3 stands; the 2026-10-06-type-icons-sound role rules are historical only.
- **H1 lens phrases at weight 400** (500 read as bold). Built by the type/icons session.
- The H1 *question* still feels "a bit intense" next to the calm cold-open lines. A softer-Playfair comparison is in [`evolution/analysis/2026-10-06-h1-lens-type.md`](../evolution/analysis/2026-10-06-h1-lens-type.md). The recommendation, **murmur**, keeps sizes, colour and layout and swaps only the face: the question becomes variable Playfair italic 400 at `opsz` 40, the lens words the same at `opsz` 24. It loses Display's sharp hairlines on the pale top band. Root cause: the cold-open lines read calm because they sit on the dark centre, not because they use a different face. H1-only first; the whole questionnaire later, if approved. Awaiting Robin; not applied.
- **H6 flavour icons approved and built:** icon on top, word beneath, new Fresh dewdrop. Built by the type/icons session (`FlavourIcon.tsx`); DESIGN.md §5 updated.
- **Music:** undecided. Loops and engine are in `2026-10-06-type-icons-sound/sound/` and will come to this track as a spec.
- **Video:** Robin's favourites are the eased candidates ("eased both" or "eased arrivals"). To judge them in the real journey there is a dev-only trial: `?video=both` / `?video=arrivals` (TheDepths `VIDEO_TRIALS`, served from :5190). Adoption still needs his pick between the two, plus a matching WebM render.

**H4 v2 prototype** (`evolution/prototypes/h4-ready-set-go/`, v1 kept in `v1/`). Robin rejected the extra click and found the v1 count-in "cheesy… too powerful".
- No "Try one first". The instruction is born at the centre of the frame and read there; the whole frame dims evenly so ivory holds on the cream smoke, with nothing behind the words.
- It rises to the head and stays as the question for all nine.
- The two glasses gather, then Tea/Coffee condense as an unlabelled rehearsal.
- **Ready · Set · Go is a breath:** small italic words, opacity only, while the empty glasses gather light. The dim deepens through the breath and releases on Go.

**H4 v3** (Robin, after v2): *"it makes it better"*.
- The dim is lighter: 0.28 while reading, 0.16 in play.
- Tea/Coffee and Ready · Set · Go are removed.
- Two example glasses, "Word 1" / "Word 2", sit where every pair will sit, under the line (31% / 30% on phones). The mechanic is visible in one look.
- Touching one plays the catch and starts the game; if she only reads, it starts by itself at ~6.4s. **The line rising to the head is the start.** The first pair condenses where the examples were.
- A hidden tab re-presents the same pair, with no count-in.
- The matching owner has been told the practice diagnostic becomes `example: chosen | notTouched`.
- v1 and v2 are kept in subfolders. Next: build v3 into TheDepths' H4, replacing today's practice beat.

**H5 "Surface Tension" prototype** (`evolution/prototypes/h5-surface-tension/`; options in [`evolution/analysis/2026-10-06-h5-concepts.md`](../evolution/analysis/2026-10-06-h5-concepts.md)). She is one drop of her seed colour, a circle, not the glass.
- **Round 1:** the drop *reaches* for a word, and the neck pinches off, leaving a bead of her with it.
- **The turn:** the beads flow home, leaving motes in orbit.
- **Round 2:** the words *come to her* and are held inside her.

Alternatives B (Reflection), C (Lean) and D (Gravity well) are written up. The answer shape is unchanged.

**Coordination:**
- The type/icons/sound session wrote to `src/` once (icons, lens weight). It has confirmed nothing is pending, and from now on it hands UI changes to this track as specs.
- One writer for TheDepths/index.css is restored.

### 2026-10-06 — Experience evolution cycle 1: settled changes built, prototypes for review

**Agent:** Freya (WDS 8, product evolution) · **Source:** the continuation plan's experience brief and Robin's recorded decisions · **Full brief:** [`evolution/analysis/2026-10-06-experience-evolution-brief.md`](../evolution/analysis/2026-10-06-experience-evolution-brief.md)

**Built and browser-verified at 1440 / 375 / 390 px with no console errors:**
- **EXP-01** H4 kept/secret dot row removed.
- **EXP-02** H1 "Someone else" → "Another side of me", with the name kept.
- **EXP-03** H10 share/save only at the bottom; the cue moved into the vacated 2.2s slot.
- **EXP-04** H4 ignores taps until a pair is readable (250ms into the condense).
- **EXP-05** H4: a hidden or frozen tab replays the same pair instead of expiring it into a "secret".
- **EXP-06** On ≤720px-tall phones the cluster clears the question (H1, H5).
- **EXP-07** Invisible 44px hit areas on the Veil pill and "Start again".

`tsc -p tsconfig.app.json` clean. ESLint 40, all pre-existing (HEAD 41). **Complete journeys** (landing → H10, real taps/drags, no dev jumps) pass at 390×844 and 1440×900, including the lens "Another side of me", 8 caught plus 1 faded H4 pair, and a dedication "poured for Zoë". There are no title-area actions, the bottom shows Share/Save, and there are zero console errors.

**Audits (separate artifacts, no source edits):**
- [Mobile interaction audit](../evolution/analysis/2026-10-06-mobile-interaction-audit.md): four sizes plus reduced motion, landscape, backgrounding and blind-tap probes.
- [Type and icons comparison](../evolution/analysis/2026-10-06-type-and-icons-comparison.md).
- [Video arrivals](../evolution/analysis/2026-10-06-video-arrivals.md): the abruptness is mostly in the footage, which is at full speed or accelerating at every hold. The source is ~24fps padded to 30.
- **EXP-17** built: `playUntil` stops on the presented hold frame via `requestVideoFrameCallback`, with the rAF loop as fallback. RESONANCE no longer freezes on 8.166, and the one-frame overshoot/snap at RESONANCE, FINISH and SURFACE_CUT is gone (zero seeks measured).
- Retimed eased-arrival assets wait on Robin's in-motion review (V1–V3 in the brief).

**Prototypes awaiting Robin:**
- **P-H4** (`evolution/prototypes/h4-ready-set-go/`): one instruction at her own pace, a labelled Tea/Coffee rehearsal that can be repeated, then a restrained Ready · Set · Go. The window runs from readable.
- **P-H5** (`evolution/prototypes/h5-two-directions/`): A, the figure with light out then in; B, two plain rounds plus a turning beat.
- **P-TYPE:** recommended Switzer for questionnaire UI with Playfair for the reading (overrides the 09-29 main-face decision, so it's Robin's call), Satoshi as fallback. Flavour icons go above the word; Spicy, Bitter and Smoky need a second pass.

**Mobile decisions for Robin (D1–D5):**
- H3 confirm-before-commit (keeps 0–100)
- H2 tap-to-preview names
- an inert nav mark in the depths
- an upright veil for mid-journey landscape
- a multi-line H7 field on phones

**Coordination:** the answer format v3 is agreed with the matching owner. H4 timing/status/interruption and the H3 `moved` flag stay local UI state until `shared/answers.ts` is published. `types.ts`/`App.tsx` belong to the integration owner.

**Lesson:** headless Chromium's CDP `Page.setWebLifecycleState frozen` does not stop rAF or timers. Test hidden-tab behaviour by holding rAF callbacks instead.

### 2026-10-06 — Parallel continuation plan aligned with BMAD

**Source:** Robin's design/content/algorithm requests and explicit request to continue building on the BMAD framework.

- Created the continuation plan and reviewed it against the existing WDS, Pour Studio, pipeline spec, finalized architecture and installed BMAD help.
- Retained the three parallel tracks and assigned artifact/file owners. Each track resumes its existing sources; shared-intake decisions feed the spec owner before matching/UI integration.
- Corrected planning drift: hybrid selection remains a deterministic eligible shortlist plus Bartender choice; runtime recipe variants/zero-proof remain outside launch scope; trace and personal-reading privacy remain binding. Coverage will distinguish fallback, shortlist and final-choice evidence.
- Recorded **Another side of me** (same name), removal of H4 history bubbles and bottom-only reading actions as user decisions. H4 timing interpretation and H5 game mechanics remain to validate.
- Updated this handoff and Current section to reflect experience evolution, pending spec refresh and collection review. Preserved dated history and existing configuration. No source code, pour dossiers, approval status or canonical spec was changed by this alignment.

### 2026-09-29 — One system pass, rev 2 (Robin: "the previous version felt cleaner and more premium")

**Source:** Robin's notes on the one-system pass. The shared system stays; what changed is how heavy it had become.

- **Landing:** back to two corners. The title sits top-left ("Discover your" small italic in ember over a stacked, upright "Cocktail / Within") and is kept narrow so it never reaches the silhouette. The paragraph sits under it. The note and **Discover my cocktail** are bottom-right, so the pointer crosses the frame and uncovers the hidden cocktail on the way. On phones everything settles at the foot over a fall of shadow.
- **No dark behind text, anywhere.** The `--legible` wide dark halo was cut to a 1px hairline, and `.hold-shade` was removed (it is why the footage felt "super dark" on H1). H0 and H7 now show clean ivory.
- **H0:** the question was removed again. It is just the bare line with "Your name…", and Continue sits right under it.
- **H1:** the lens spheres are larger (`.is-lens`), and the phrases now wrap in two lines.
- **H2:** "Which colour feels like you?" sits in the centre of the ring, with the tried-on colour named beneath it.
- **H3:** the poles are larger.
- **H4 catch, rebuilt:** her colour blooms inside the glass, fine fizz climbs out of it (the resonance canvas now also runs on H4, fizz only), then it rises and dissolves over ~1s while the other sinks. The ripple rings are gone. The gap between pairs after a catch is now 1050ms.
- **Continue (all holds):** back to the light Veil pill (Jost 400, 11px, 0.24em tracking, hairline). H7's pill stays at the foot of the frame, because under the line it vanished on the foam.
- **H6 flavours rise again,** as before but on the shared spheres. They climb in lanes, condense in above the pill and dissolve under the question. Catching one holds it, and risers ease around a held one. The "leave out" spheres rise up into a still cluster.
- **"Alcohol" was removed from "leave out"** (it isn't an allergen). This also removes the only zero-proof path. `mixology.ts` still honours /alcohol/, so a zero-proof entry point can come back as its own question later.
- **Breath:** the spirit is a luminous point in the chalice's own mote language, with one slow ring. The glass bubble read as cartoony.
- **H10:** Share and Save are identical pills (the `lit` prop was removed), and both glyphs are vermilion.

**Verified:** desktop 1440×900, mobile 390×844 and reduced motion walks, all with zero console errors. Video frames of the H4 catch and the H6 rise were checked. `tsc -p tsconfig.app.json` is clean and `vite build` passes. Lint shows 40 problems (was 32), and every new one is the existing Math.random purity rule, now also hit by the new fizz particles.

---

### 2026-09-29 — One system pass (Robin's walkthrough notes → implementation)

Robin's read: "many small things built individually without a common DS." Every note was built, and the fix was a shared vocabulary rather than per-hold patches. DESIGN.md §3 and §5 carry the system; this entry records the calls.

- **Type.** Playfair Display stays the voice. The optical-size **Playfair** text cut replaces Inter for hints, prose, the landing lede and the recipe's items and steps. **Jost** replaces Inter for labels, amounts, numerals and buttons. Zen Old Mincho is gone. This supersedes DESIGN.md's "Inter/Playfair locked" line, on Robin's explicit request for "better combinations of fonts."
- **Landing.** The copy is now "Discover your Cocktail Within" plus Robin's paragraph (typo fixed: "that resonates"). The "A few minutes…" line is replaced by practical expectations: "About five minutes. You leave with the recipe and a reading of why it's yours." The CTA "Cross the Threshold" becomes "Find my cocktail". The layout is one column on a shared `--gutter`, so the nav mark and the copy share one left edge; the title is set like the H10 cocktail title.
- **One hold grammar.** Question in a fixed slot under a shared top shade (`.hold-shade`, which replaces the radial "pools of night"), hint beneath, choice centre, `.hold-next` pill with one entrance, dots at the foot. H0 gains the question "What should we call you?".
- **One "choose me" object.** H1, H4, H5 and both H6 beats use the same sphere at one size, in Playfair Display italic. H1 was 12px Inter; H6 had smaller spheres rising through the frame.
- **One exit.** The chosen sphere surfaces, the rest dissolve. H0 and H7 lift their line off the underline. The white "fin-bloom" and "trace-bloom" flashes are deleted (Robin: "feels cheap").
- **One ripple.** A thin double ring (`.ripple`) replaces the 2px stamped circle on H2, H3 and H4.
- **H2.** "Which colour feels like you?" keeps the poetry and is clearer than "is yours". The ring's centre names the colour being tried on.
- **H3.** The poles are choice words: 500 weight, full ivory, larger, the leaned side brightening.
- **H4.** The pairs ride large spheres. Cooling is now a dissolve: the glass thins, the word holds, then blurs at the very end. Rev 3's brightness filter greyed the words and the seed-colour blob smeared under them — the "cheap" feeling.
- **H6.** The glass beat is removed (Robin's instinct, agreed): the pour's glass is fixed per persona (SPEC.md: vessel "does not change the recipe"), so the question promised something the reveal couldn't keep. The flavours are H5's cluster, with fizz. "What to leave out" is the same cluster played backwards: pop a bubble to exclude, tap the struck word to restore. **Follow-up:** `vessel` is still listed in agent/ARCHITECTURE-SPINE.md (AD-1) and spec/SPEC.md; drop it there when the answer contract is next touched.
- **H7.** The dark "sphere" behind the input is removed; the shared shade carries legibility.
- **Breath.** The spirit point is now a glass bubble (rim, seed-coloured core, one highlight), the same object that then falls. It replaces the flat white disc with a pulsing blur.
- **H10.** The haze bands and grain are removed: they tinted the photo red and orange, against the Sacred Glass Rule, and read as lens smudges. The blinking cue dot is gone; the cue reads "Your recipe and reading". **Share + Save** are equal pills on the first screen (Share lit with the seed colour) and again at the end. A top scrim stops the reading printing under the nav mark. Fixed a specificity bug that set "The Reading" label at body size.
- **Verified** at 1440×900 and 390×844 and with reduced motion. Zero console errors; `tsc -p tsconfig.app.json` is clean and `vite build` passes. Lint has 32 errors against a baseline of 29; all are the existing React-compiler purity rule on `Math.random` particles.

### 2026-09-18 — Coherence revamp (walkthrough review → implementation)

**Agent:** Claude Code (Fable review, Opus implementation) with Robin · **Where:** `TheDepths.tsx`, `TheReading.tsx`, `App.tsx`, `index.css`, `types.ts`, `engine/mixology.ts`, `data/sampleResult.ts` · **Source:** Robin's dictated walkthrough of the whole experience + `Dionysus walkthrough.mov`; full review at `design-artifacts/2026-09-18-experience-review.md`.

**The diagnosis was coherence, not craft.** Nine holds built one at a time had each grown their own confirm button, instruction voice, progress row and selection grammar, so a first-timer was re-taught the interface at every hold. Three holds also carried real defects that only showed on a cold end-to-end run, not in the video.

**The one grammar (applies to every hold):**
- **One confirm.** Six labels in three forms (`Deepen`, `let it resonate`, `carry it forward`, `seal the glass`, `nothing to exclude`, `let it settle`) → one Veil pill reading **Continue**, always at `bottom: 14%`. `.res-seal` is now that pill; H1's `.depth-continue` already was one.
- **One instruction voice.** Every hint shipped as 13px Playfair italic at 0.5–0.6 alpha, which broke DESIGN.md §3's own Italic Voice Rule (the interface *speaks* in Playfair, it *labels* in Inter) and was unreadable over the bright bands. New `.depth-hint`: Inter, 14.5px, 0.8 alpha, black underlay. `.hidden-hint` / `.res-sub` / `.grav-hint` / `.fin-glass-label` keep position only.
- **One progress row.** `.depth-dots` at `bottom: 6%` (clear of the pill) on H3, H4, **and now H5 and H6**, which had none. New `DepthDots` component for the plain case; H3/H4 keep their kept/secret modifiers.
- **One pool of night.** `.depth-pool` on H4 and H6, the treatment H7 already used. (First cut clipped its own gradient and drew a hard line across the footage — the box now outruns the fade.)
- **One transition.** `goHome` was the only change of world that was a hard cut; it now sinks through the descent veil and the Entrance surfaces from it (`descending: 'in' | 'out'`, new `.descent-veil-out`).

**Per hold:**
- **Hero** — "Seven depths lie between you and your liquid avatar" promised a number the journey does not keep (22 prompts across 7 holds) in words nobody parses → "A few minutes of honest answers. One cocktail that could only be yours." Body copy stopped promising an animated recipe.
- **H1** — placeholder was ivory at **0.3 alpha** and read as disabled grey → 0.8. "Who should this cocktail capture?" → **"Who is this cocktail for?"**. Lenses: "The night version of me" → "The best version of me" (the aspirational answer the set lacked), "A fictional persona" → "One of my many selves".
- **H2** — **three of the eight drops were invisible**: at 44–60px with a 38% rim, Campari, Aperol and Cassis vanished into the crimson ink cloud this hold freezes on. Now 56–76px with a 60% rim and a dark outer halo. The liqueur name only appeared on **hover**, so touch never saw it — it now also whispers on the burst. Names lead with the bottle (`Pamplemousse Pink` → `Pamplemousse Rosé`, `Campari Red` → `Campari`) since the drop is already visibly coloured.
- **H4** — the journey's one confusing hold, and it was the on-ramp every time, never the mechanic. The prompt said what *not* to do while the actual instruction sat at 13px/0.5 on the brightest band; the practice pair was "This / That", which teaches the gesture with words that mean nothing; and **nothing showed a clock was running**, so expiry read as the interface breaking. Now: a plain instruction in the shared voice on a pool of night, **Tea / Coffee** as the rehearsal, a draining ring on each ember (`.ember-clock`, fed `--ember-clock` from `paintDrops`), `THAW_MS` 2550 → **3400** (a cold run showed the first two real pairs expiring mid-read), and the prompt no longer lifts away while she is still reading it.
- **H5** — rev 4. The two questions the whole reading leans on were asked as 12–14 hand-scattered 14px labels on the darkest frame in the film, with the catch signalled by a 13px dot. Each word now rides inside a **Glass Sphere** — the affordance H1 and H6 already use — nine per round in a jittered 3×3, with a live "2 of 3 chosen" count. Word lists trimmed on overlap (Recognition/Power, Knowledge/Mastery, Energy+Fun/A little chaos, Perspective/Advice, Leadership/Courage, Protection/Comfort).
- **H6** — two overlap bugs found only on a real run: the flavour bubbles **rose straight through the question** (band now starts at 30% instead of 8%), and the chosen glass grew into `FIN_HERO.y = 33` which drew its rim **through the ward instruction** (now 43). "How should the drink sit in your hand?" → **"What kind of drink do you want in your hand?"** (it is the only question that shapes the physical drink — `FIN_VESSELS.scales` → `drinkScales` → the lengthener, complexity and glassware). "Light & Sparkling" → "Light & sparkling".
- **H7** — **the frequency question is gone** (Robin's call). Verified cost: nothing. Its only effect on the drink was `frequency === 'Never' → zero-proof`, which H6's own "Alcohol" veto already produces, plus two optional breath echoes. Removing it also deleted the last UI in the journey that read as a diagram. `frequency` is out of `Answers`, `mixology`, and the echo builder; the hold now opens straight on the trace.
- **H10** — the name inked at **5.4 s**, *after* the title rose at 4 s, so she watched the drink arrive, be named, and only then have her own name written. Now 2.4 s, with the title held to 3.7 s: room → name → title (measured: tag 0→1 across 2.4–4.0 s, title 4.8–5.6 s). Kicker stopped printing the engine's pairing key ("THE CONNOISSEUR · SAGE × LOVER" → "· poured for {name}"). Actions are plain: **Save the recipe · Share · Start again**, with "The ink has settled." kept as the closing line.
- **Print** — three real bugs, all confirmed with a print-media render. The persona image lives inside `.tr-stage`, which print hides, so **the PDF had no cocktail at all**; there is now a print-only `.tr-print-plate` (the 3:4 master) at the head of the page. The dev-nav print rule matched `[class*="dev-nav"]` but `DevNav` carried only Tailwind utilities, so it never applied — the component now has the class. And the dedication is set as type (`Poured for {name}`) because the inked tag belongs to the hidden scene.

**Verification:** `tsc --noEmit -p tsconfig.app.json` clean; `vite build` clean; eslint **35 problems before and after** (all pre-existing, none added — checked against a worktree of the base commit); zero console errors on a cold end-to-end run in a fresh tab; H5 at 375×812 → 9 spheres, **0 overlaps, no overflow, no horizontal scroll**; reduced-motion twin verified (tag at opacity 1 by 1.8 s); gift view (H11) unchanged in behaviour; "Start again" verified sinking through the veil and surfacing on the Entrance; share verified on both paths (native sheet where `navigator.share` exists, "Link copied" on the clipboard path).

**Addendum, same day — Robin's four notes on the first pass, all applied:**
1. **H2** — the dark outer halo on the drops read as a drawn circle → removed; the larger size and 60% rim carry the visibility on their own.
2. **H2** — the liqueur-only names were reverted to the **liqueur + colour template** (`Campari Red`, `Aperol Orange`, … `Pamplemousse Rosé`, `Cassis Plum`). The whisper-on-burst for touch stays.
3. **H4** — the draining ring was rejected ("the disappearing is already understandable"), and the real issue was named: the words are the point and they were the smallest thing on the hold. **The word is now the ember**: set at clamp(1.55rem, 3.4vmin, 2.3rem) Playfair on a blurred pool of seed colour (`.ember-glow`), at 33% / 67% like H3's poles; the cooling happens to the word itself (halo draws in via `--ember-glow`, slight shrink via `--ember-scale`, never below ~60% brightness while live). The 38px bead, `.ember-orb`, `.ember-clock` and `.ember-core` are gone.
4. **H5** — the fixed-percentage 3×3 read as a grid and sat still → it is now the lens question's sibling: a centred `.res-cluster` (CSS grid, `gap 0.75rem 1.25rem`) riding `lensDriftA/B` with nine staggered `nth-child` offsets; `RES_QUESTIONS[].words` is now a plain string list and the portrait preset is gone (the cluster fits 375px by itself). **The seal animation was replaced**: the converge-to-centroid + `.res-rise` bead that launched to the top of the frame read as fireworks; chosen bubbles now **surface** (rise 78px, dissolve, 90ms apart, `resSurface`) while their fizz streams follow, and the rest dissolve in place (`resDissolve` / `resDissolveDim`). Found and fixed while doing it: the old code set the exit `opacity` inline, which `resGlintIn`'s `both` fill silently out-cascaded, so the unchosen never actually faded — exits are keyframe classes with explicit `from` states now.

Verification for the addendum: tsc clean, build clean, eslint 35 → 29 (six pre-existing errors left with the deleted code, none added), zero page errors; seal sampled mid-flight (chosen rising and fading, unchosen fading, no bead); H4 "In control / Out of control" and the H5 cluster checked at 375px for overlap and overflow.

**Left deliberately undone:** the engine still scores from the retired paper questionnaire's fields — `craftCocktail` reads `answerStyle`, `childhood`, `selfScales`, `moodScales`, `personality`… none of which `TheDepths` writes, while `lens`, `gravity`, `texture`, `drawnToward` and `soughtFor` are never read. That is the backend phase, and the answer→Bartender contract should be settled before any further question copy is written.


### 2026-07-25 — Front-end craft pass (impeccable critique → implementation)

**Agent:** Claude Code / Impeccable (with Robin) · **Where:** `App.tsx`, `TheDepths.tsx`, `TheReading.tsx`, `NotFound.tsx`, `index.css`, new `VelvetRope.tsx` + `engine/viewport.ts` · **Source:** Robin: full diagnosis of landing → H11 → 404, then "implement your recommendations" (front-end only; the engine is explicitly out of scope until the experience is pixel-perfect).

**Diagnosis first.** Dual-pass `/impeccable critique` (design review sub-agent + deterministic pass). Design health scored 25/40 (all ten heuristics) — the loss concentrated almost entirely in one cluster: control, freedom, recovery, status. Design specificity passed emphatically; the craft was never the problem.

**Two P0s found, both invisible from the UI:**
1. **Every shared link inked "Dionysus"** — `TheReading.tsx` hardcoded `from: 'Dionysus'` while `inkName` sat in scope. The flywheel's only outbound surface was anonymising every pour. **Fixed** (`from: inkName`); verified end-to-end by generating a real link and cold-loading it (guest now sees "Robin" on the tag, in the greeting, and in the withheld-reading line).
2. **The archetype engine ignores 16 of the journey's 24 answers** — `craftCocktail` still scores from the retired paper questionnaire's fields (`answerStyle`, `childhood`, `selfScales`, `personality`…), none of which `TheDepths` writes. Only the H2 colour reaches it, so two maximally opposite people get identical archetypes; 8 seeds collapse to 6 pairings, all resolving to `_fallback.jpg`. **NOT fixed — deliberately deferred** per Robin: the engine is the next phase. Note the DEV substitution at `App.tsx` (`if (!meta.wide) r = CONNOISSEUR_SAMPLE`) masks this locally, which is why it survived.

**Shipped this pass (17 items, all verified):**
- **A11y:** H7's five frequency rings were bare `<circle onClick>` — a *terminal* keyboard dead end (WCAG 2.1.1). Now a `role="radiogroup"` of real buttons with roving tabindex, arrow/Home/End, manual activation (selection is irreversible, so never select-on-arrow), vermilion focus ring, and the ring + dot + label all highlighting with focus. Verified completable keyboard-only including typing the trace.
- **A11y:** H4's 3.4 s-per-binary catch had no accommodation (WCAG 2.2.1). Under `prefers-reduced-motion` the embers now ignite and hold — no cooling, no expiry — and a Veil-pill *"let them cool"* makes the hidden-self outcome an explicit gesture. Verified with real emulation: at 7.2 s reduced-motion embers sit at opacity 1 with the round unadvanced; normal motion unchanged (0.21, auto-advanced).
- **A11y:** `TheReading`'s intro timers ignored reduced motion (5.4 s / 8.3 s of frozen scene). Now 1.4 s / 2.7 s twins.
- **Mobile:** H5 overflowed and had 4 overlapping tap-target pairs at 390 px. Added a portrait preset (unique Y band per word, X clamped to each word's own rendered width, alternating sides) plus a compacted glint (dot beside the word, not above). Verified **zero** overflow / word-overlap / tap-overlap / chrome-collision at 375, 390, 430 px across both rounds.
- **Mobile:** H3's track widened (6%/6%) and mote grown to 36 px (44 px dragging) — precision went from ~2.5 px to 3.3 px per value-point.
- **Mobile:** the hero's cursor-spotlight bound only `mousemove`, so its signature reveal never fired on touch. Now `pointermove` + an autonomous lissajous drift when no pointer ever arrives (the 404's own lantern device). Verified drifting on a touch context, mouse tracking unchanged.
- **Mobile:** scroll cue (134×15) and home mark (117×28) given ≥44 px hit areas via invisible `::before` — glyphs untouched.
- **The Velvet Rope** (master spec §3, previously unbuilt) — but scoped correctly as the *degrade state*: fires only below 320 px wide / 440 px tall, never on a normal phone. Two gifts (send yourself the door · taste one already poured, an ordinary `#pour=` exemplar) plus a "cross anyway" escape. Verified: rope at 300×420, **not** shown at 390×844, escape works.
- **The ending.** The owner's five-minute arc terminated on two grey buttons with no closing gesture and no way back — the guest had a better ending than the owner. Added a coda: *"The ink has settled. / Pour again, another night"* → the Entrance. Print-hidden.
- **Copy:** hero "Seven questions" → **"Seven depths"** (24 answers were being promised as 7); `CONTINUE` → **"Deepen"** (the brief's own microcopy); `Save the keepsake`/`Share with a friend` → **"Preserve this recipe"/"Send it on"**; `"Copying failed"` → *"The ink would not take — try once more"* (master spec §2 forbids raw errors); **"Floreal" → "Floral"** (the hero art already said FLORAL); en-GB sweep ("flavors" → "flavours").
- **Legibility:** H6's flavour words shipped `text-shadow: none` over the footage's brightest band — retrofitted the black underlay; `.depth-input` gained a resting underlay alongside its ember glow.
- **Craft:** `* { font-family: Inter }` at `index.css:4` was defeating inheritance app-wide — the hero's 64 px "Spirit Within" was rendering in **Inter** despite `font-mincho`. Moved to `body`; verified zero inheritance victims.
- **404:** pool moved 0.72 → 0.80 and rest beat 1500 → 800 ms; ring alpha 0.5 → 0.85. Peak lit pixels 2.8 k → 308 k, max alpha 74 → 166, dead space below the CTA 41.8% → 34%. Ring radius kept small (0.22 → 0.26 only) — Robin's earlier 0.30 → 0.22 tune existed precisely so the ripple never frames the door.
- **Hygiene:** `#pour=` now re-decodes on `hashchange` (pasting a link into an open tab did nothing); journey video gained an 18 kB poster (`preload` left `auto` — the "never laggy" constraint outranks the byte saving); deleted `cloud_bg.mp4` (a 163-byte CloudFront error string), `icons.svg`, unused `lucide-react`, and ~140 lines of dead paper-world CSS (`btn-ink`, `pill`, `ink-range`, `paper-wash`, `grain`, `paper-vignette` — `q-rise` preserved, the depths still use it).

**Verified:** `tsc -p tsconfig.app.json` clean; production build clean (342 kB JS / 110.7 kB gzip, 87 kB CSS / **17.36 kB gzip**, down from 17.69); mechanical detector **5 advisory findings, 0 errors** (3 font-size + 2 colour, all DESIGN.md-drift, two of them the locked hero); eslint back to exactly its **35 pre-existing** problems (every one introduced this pass was fixed — `stillWater` split into render-state + rAF-ref, `readingTake` hoisted, viewport helper moved out of the component file). Full walk of **13 surfaces × desktop 1440×900 + mobile 390×844: zero horizontal overflow, zero console errors** on every one.

**Open / not done:**
- The archetype engine (P0-2) — deferred by design; this is the next phase.
- `DESIGN.md` still documents the archived paper world in §5 and predates `TheReading`; the detector's 5 advisories are that drift. Worth `/impeccable document`.
- `TheReading` (H10/H11) still has no design-log entry of its own and no row in the Design Loop Status table.
- No git repository for the app — Edward's Phase 3 is literally "inspects the underlying repository".
- H1/H2/H4/H6/H8/H9 have no portrait presets yet; they no longer overflow, but they were composed for a wide frame and deserve the same per-hold pass H3/H5 just got.


### 2026-07-24 — The poetic 404 BUILT (NotFound · "The Last Drop")

**Agent:** Claude Code / Impeccable (with Robin) · **Where:** new `NotFound.tsx`, `index.css` (`.nf-` block), `App.tsx` (wiring) · **Source:** Robin: "help me create the error 404 page — we've moved away from the water and ink design, so create one that fits the current design and feel of the app."

**Direction.** Ran the impeccable new-work flow as a *whole surface inside the established dark world* (DESIGN.md unchanged — an extension, not a new world). Concept-seed assigned candidate 4 of the grounded list: **"The Last Drop"** — the journey's own drop-and-rings gesture (H2/H7/H8) with the *result withheld*: a seed-ember drop falls into the dark and **nothing rises to meet it**. Fused the hero's other signature device, the **cursor-as-lantern**, as a restrained interaction layer (pointer warmth lifting the dust it passes over — searching the dark, finding only the empty pool). Explicitly refused the ink-on-paper metaphor the old spec's "The ink has settled" 404 line leaned on.

**Built.** Full-bleed `--night` field; a DPR-capped Canvas 2D engine (one rAF): ~18–38 drifting gold dust motes, a drop that falls (accelerating, with a trailing streak + white-hot core), pools at a low surface line, blooms once, and rolls 3 ellipse rings outward that fade to nothing on a ~5.3s loop; a lantern radial that smooths toward the pointer (autonomous lissajous drift on touch/idle). Composition above the pool: brass "404 · Not Poured" whisper (Robin's call — recognizable without breaking the spell), Playfair-italic **"This glass was never poured."**, an Inter sub-line, and the house `CtaButton` "Discover the spirit within" → returns to the Entrance. Reduced-motion renders one settled static frame (pool + a single still ring), now repainted on resize. **Trigger = unknown routes only** (`isUnknownRoute()` in App: pathname ≠ '/' and no `#pour=`); broken share links keep their deliberate silent return-home. `goHome` now also resets an unknown pathname to '/'.

**Verified** (Playwright, screenshots read back): desktop 1440×900 (drop mid-fall + mid-ripple), mobile 390×844 (title breaks to two balanced lines, ripple clears the CTA), reduced-motion static + a reduced-motion **resize repaint** (130k+ lit px, not blank — the one fix from the finish review); CTA and the top-left Dionysus mark both reset the URL to '/' and reveal the landing hero; `tsc -p tsconfig.app.json` + eslint clean; **zero console/page errors** every run; mechanical detector = 0 findings in `NotFound.tsx` (the only `.nf-` hits are the locked-brand Inter, which DESIGN.md pins, and two advisory font clamps mirroring the sibling `.tr-` poster styles). Independent finish review: **SHIP**. Tuned once against screenshots (surface 0.64→0.72, ring radius 0.30→0.22 so the pool reads *beneath* the door, never an oval framing it).

**Open for Robin's eye:** the exact anchor copy (three registers were offered; "This glass was never poured." chosen); whether dead `/pour/` links should also route here (currently kept as silent return-home per the existing "never strand a guest" call — master spec §4 would send them here instead).


### 2026-06-11 — Project initialized (Phase 0)
- Type: greenfield
- Complexity: complex
- Tech stack: react

### 2026-06-11 — Product Brief Complete (Phase 1)
- Vision, Users, Concept, Metrics, Competitive Landscape, Constraints, Platform Strategy, Tone of Voice all captured through collaborative dialog.
- Final Product Brief synthesized and confirmed: `A-Product-Brief/project-brief.md`
- 8 decisions logged in `dialog/decisions.md`
- Next: Phase 2 — Trigger Mapping

### 2026-06-11 — Trigger Mapping Complete (Phase 2)
- Formulated Portfolio-centric Business Goals (`01-business-goals.md`).
- Designed Primary Persona Celeste the Curious (`02-celeste-the-curious.md`) and Secondary Persona Edward the Evaluator (`03-edward-the-evaluator.md`).
- Mapped psychological triggers/barriers into Key Insights (`05-Key-Insights.md`).
- Prioritized core features based on psychological impact (`feature-impact-analysis.md`).
- Built visual representation in `00-trigger-map.md`.
- Next: Phase 3 — UX Scenarios

### 2026-06-11 — Phase 3: UX Scenarios Complete

**Agent:** Saga (Scenario Outline)
**Scenarios:** 3 scenarios covering 13 pages (13/13 assigned in coverage matrix)
**Quality:** Excellent — all three scenarios scored 7/7 Completeness, 7/7 Quality, 7/7 Mistakes Avoided, 4/4 Best Practices

**Artifacts Created:**
- `C-UX-Scenarios/00-ux-scenarios.md` — Scenario index with page coverage matrix
- `C-UX-Scenarios/01-celestes-descent/01-celestes-descent.md` — Celeste's Descent (Primary, 11 pages)
- `C-UX-Scenarios/01-celestes-descent/1.1-the-entrance/1.1-the-entrance.md` — First step outline
- `C-UX-Scenarios/02-the-gifted-elixir/02-the-gifted-elixir.md` — The Gifted Elixir (Danielle Receives, 1 page)
- `C-UX-Scenarios/02-the-gifted-elixir/2.1-the-shared-elixir/2.1-the-shared-elixir.md` — First step outline
- `C-UX-Scenarios/03-edwards-audit/03-edwards-audit.md` — Edward's Audit (Secondary, 1 cross-cutting page + annotations)
- `C-UX-Scenarios/03-edwards-audit/3.1-the-resilience-states/3.1-the-resilience-states.md` — First step outline

**Key Decisions (Phase 3):**
- **One implementation, three uses:** The Shared Elixir (2.1) and the Poured Elixir exemplars both render through the Overflow Reveal's (1.10) guest-arrival state — no separate views built.
- **New scope vs. Product Brief:** results persist server-side with unique shareable URLs and per-result OG images (deliberate addition, strengthens Edward's architecture-validation story).
- **The Poured Elixir:** the trigger map's "secret roulette/bypass mode" upgraded into a real product surface — curated Trickster-persona exemplar (Magician × Outlaw) behind a quiet "taste one already poured" side door, doubling as agent-failure fallback.
- **Annotation model for Edward:** he owns no views; Scenario 01/02 page specs receive "Edward lens" acceptance-criteria blocks in Phase 4. Only the Resilience States (3.1) is his own page.
- **Abandonment rule:** fresh start always; only the Color Seed tint persists (localStorage).
- **Storyteller privacy constraint:** the "one true thing" free-text is never echoed verbatim in shareable narratives — allusion only.

**Summary:** Three scenario outlines transform the Trigger Map into linear sunshine paths: Celeste's full six-chapter ritual (Entrance → Recipe Card), Danielle's mobile share-arrival conversion, and Edward's audit traversing both via acceptance-criteria annotations. All 13 pages are assigned; questionnaire architecture (The Six Descents) and motion system (Ink Wash Clearing) brainstorms carried in as design inputs.

**Design Intent (chosen at handover):** 01 Celeste's Descent → [S] Suggest (agent proposes step by step, Robin confirms each); 02 The Gifted Elixir → [D] Dream Up; 03 Edward's Audit → [D] Dream Up. Rationale: visualise the derived pages first, then reiterate together — "for everything visual it's important to see."

**Next:** Phase 4 — UX Design

### 2026-07-10 — The Keepsake becomes a 3D diorama (the layered world)

**Agent:** Claude Code / Fable · **Where:** `TheSurfacing.tsx`, `index.css` surfacing block · **Source:** Robin: "the page after H9… I don't want to see a scroll bar… it must be 3D — text in front, cocktail in the back (but not far back), effects in front and behind the cocktail image… a layered world, make it immersive."

**1. No scrollbar, no chrome.** `.surf-story` hides its scrollbar entirely (`scrollbar-width: none` + WebKit rule; still wheel/touch-scrollable) and instead wears **edge fade masks** — content ghosts into the dark 7vh from the column's top and bottom instead of hitting a rail. Bottom padding bumped to 14vh so the save action clears the fade at scroll end. Print resets the mask (it would wash printed content) and the parallax transform.

**2. The diorama.** The atmosphere split into **two canvases** around the panel: `.surf-air-back` (z 1, *behind* the image) carries ~55% of the dust plus a **warm room-glow halo** behind the panel at the keepsake — occlusion by the panel is the depth cue, the glow separates it from the void; `.surf-air-front` (z 11) keeps the beam, spray, ember rim, ink-sparkle, and gains **5 camera-near bokeh orbs** (large, soft, `shadowBlur 16`, alpha ≈0.07 — the out-of-focus nearest plane). The story column moved to z 12: text is the frontmost plane, per Robin's explicit layering (effects sandwich the image, text stays in front).

**3. The depth engine** (new kept-mode rAF, replacing the beat-4 drift at the handoff): every plane moves at its own parallax rate under the cursor — story ±10px (nearest, fastest), bokeh ±13 via canvas offset, front dust ±6, **image panel ±3 with a true 3D micro-tilt** (`perspective(1100px) rotateY ±1.5° rotateX ±1.1°`, transform-only — never fights the inset glide, and text stays crisp because no 3D transform ever touches the story), back dust ±2 (deepest). `layout()` runs per frame while deflected so the tag ink and spotlight stay glued to the tilting panel. Coarse pointers get a slow autonomous lissajous drift — the world never freezes on touch. Cleanups zero all transforms.

**Verified** (Playwright, screenshots read back): keepsake at rest — no scrollbar, story fading at its bottom edge, back dust visible beside the panel; hard cursor deflection — story measured translating 3.3× the panel (8.9px vs 2.7px) with the panel at rotateY −1.33°, "Celeste" glued to the tag throughout; **frame cadence unchanged at 8.3ms median / 9.2ms p95** with both canvases + per-frame layout live; reduced-motion renders **zero** canvases and no diorama and still auto-advances; mobile (390px) stacks cleanly, no scrollbar, masks working; print block covers both canvases + mask/transform resets; tsc + eslint clean (one `react-hooks/exhaustive-deps` warning fixed by capturing the scene ref); **zero console errors or warnings**.

**Open for Robin's eye:** parallax amplitudes (PAR_* constants + TILT_DEG 3 — tuned subtle; easy to push if the world should lean harder); bokeh count/size; whether the back halo (≈0.055 alpha) reads on his display.

### 2026-07-10 — The Surfacing OVERDRIVE: "The Living Lens" (H9 made alive)

**Agent:** Claude Code / Fable via `/impeccable` overdrive · **Where:** `TheSurfacing.tsx` (atmosphere engine added), `index.css` surfacing block · **Source:** Robin: "audit and improve H9 to make it world-class and award winning — really make it super immersive… it needs to Wow." Overdrive's propose-first rule ran; Robin picked **The Living Lens** (hybrid: cinematography + the project's own particle language, Canvas 2D, zero new deps) over particles-only, lens-only, and WebGL (the H5 precedent — tech-demo risk — held).

**What was added — one canvas (`.surf-air`, DPR-capped 1.5), one rAF, five systems:**
1. **Splash spray** — ~30 luminous droplets (warm-white/seed mix) arc from the glass point and fall under gravity during the condense: the last of the crown settling as the light collapses. Material continuity through the white.
2. **The TRUE ember rim** — found-bug fixed: the feel-pass "seed ember riding the collapsing edge" never rendered in colour (CSS masks read only gradient *alpha*; the seed stop was just a translucent band). The rim is now drawn on canvas in actual seed colour with a glow, plus a faint warm chromatic sister-ring (lens fringing), shedding sparks as it collapses.
3. **Volumetric candlelight beam** — a rotated elliptical glow leaning off-axis above the glass, organic multi-sine flicker, drawn each frame then **erased over the full sharp focal circle** (`destination-out` from `focusR`): the sacred-image rule holds — the wash lives only where the blur already does. (First build used a trapezoid; visible straight seams in screenshots → replaced with the ellipse.)
4. **Dust motes** (~36) — drifting, twinkling, brightening as they cross the beam axis; alive through beat 4 and dimmed (canvas at 0.45) through the keepsake.
5. **Ink-sparkle** — during the name's stroke-on, particles rise from the nib position, computed along the tag's rotated writable axis; timing synced (nameInk 1.4s→1.3s = INK_MS).

**Plus the optics:** a **two-plane focus rack** — the blurred surround starts near-sharp (`blur(7px) brightness(0.8)`) and racks OUT over 2.8s while the glass racks IN (existing surfFocus), so the condense reads as eyes adjusting, not a wipe; **candle-breathing vignette** (uneven 4.6s opacity keyframe); **depth parallax** — the blur plane now moves at 0.9× the drift layer under the cursor, separating the planes physically. Story-column scrollbar tinted into the ivory family.

**Verified** (Playwright, frame-by-frame screenshot readback, both personas): condense with visible seed rim + spray at 1440×900; settled beam + dust on both images (Trickster emerald, Visionary gold — the beam anchors per-persona via the `glass` point); ink-sparkle riding the nib; auto-advance intact in normal, reduced-motion (canvas absent entirely, pre-inked, still auto-advances), and 390px mobile; **frame cadence measured: 8.3ms median / 9.3ms p95** (locked ~120Hz with the full atmosphere live); print unaffected (canvas hidden); tsc + eslint clean; **zero console errors or warnings in every run**.

**Standing hook findings, kept intentional:** Inter as base font (pre-existing, locked hero identity); the beat-5 `.surf-imgwrap` inset transition (single absolute element, one-shot 750ms; transform-scale would distort the contain-fit image — documented 2026-07-08).

**Open for Robin's eye:** beam intensity (peak ≈0.10 alpha — brighter kills the dark; dimmer disappears on bright displays); dust density; whether the keepsake's dimmed atmosphere (0.45) should die entirely instead.

### 2026-07-09 — The Surfacing feel-pass (seven notes from Robin, all built)

**Agent:** Claude Code / Fable · **Where:** `TheSurfacing.tsx` (substantial rewrite), `index.css` surfacing block, `personas.ts` (+`focusFrac`) · **Source:** Robin watched the 2026-07-08 build live against the two real images and gave seven notes as an expert-designer brief. All seven addressed in one pass:

1. **The condense is slower and warmer, not a mechanical wipe.** `CONDENSE_MS` 1800→2500, eased with `easeOutCubic` instead of symmetric in-out, and — the actual smoothness fix — a **seed-coloured ember now rides the collapsing edge** of the white (an extra `radial-gradient` stop in the user's own `answers.color`, faded via a small hex→rgba helper): the drop's colour, gone dark at beat 2, reappears one last time as the ring that closes around the glass. Reads as one continuous gesture with the fall, not two disconnected effects.
2. **The mystical spotlight.** The persona image is no longer shown flat/full. It's now two stacked `<img>`s in a `.surf-focus` wrapper: a blurred/darkened backdrop (`blur(30px) brightness(0.42)`, scaled up + `overflow:hidden` to hide the blur's edge halo) underneath a sharp copy masked (in JS, `layout()`, keyed to each persona's `glass` point) to a soft circle around the drink (`FOCUS_FRAC`/`FEATHER_FRAC` = 0.24/0.52 of the painted box's min dimension) — plus a matching radial darkening `.surf-vignette` on top. **This refines, not breaks, the "image is sacred" lock:** the sharp focal circle around the glass is still never tinted or graded; the permission to blur/darken applies only to the surround, per Robin's explicit direction this session. The same spotlight composition now carries into the beat-5 keepsake column too, for one consistent visual language.
3. **No click.** The whole beat 4→5 handoff is timer-driven now (`after()` chains landing on `setKept(true)` automatically ≈8.6s after mount, ≈2.7s in reduced-motion) — the spec's original "advance is strictly user-initiated" is explicitly superseded for this beat by Robin's live call. A click after the whisper still skips ahead early (kept as an escape hatch, not advertised) — never a forced wait, never a required tap.
4. **Title bigger.** `.surf-title` clamp 2–3.1rem → 2.75–4.6rem.
5. **"Elaborated for [name]."** Root-caused: the component was reconstructing its own weaker copy (`Elaborated for {inkName || 'you'}`) instead of using `result.tagline`, which `craftCocktail` already builds correctly from `answers.name` with the on-brand fallback `'a nameless soul'` (used elsewhere in the narrative). Swapped to render `result.tagline` directly — one source of truth, correct fallback, no more generic "you". Confirmed via testing that H1's `commitName` already blocks empty names on the real path; the blank name Robin saw only happens via the dev debug-jump buttons (H9 etc.), which skip H1 entirely and are not a product bug.
6. **Name on the tag, in her colour** — already built in the prior pass (`.surf-name` inked via clip-path in `answers.color`, `mix-blend-mode: multiply`); reconfirmed working end-to-end on both images once tested through a real name rather than a debug jump.
7. **Cleaner recipe formatting.** Added brass-coloured section labels — **The Pour** / **The Ritual** / **The Reading** — a hairline-divided epigraph (`whyYou[0]`, styled as its own pull-quote) ahead of "The Reading" body, a flex-aligned ingredient list (amount column + item, thin dividers between rows) replacing the old cramped inline list, and custom brass `counter()` numerals on the ritual steps replacing plain browser decimal numbering. Narrative paragraphs got more line-height, a brighter/more legible tint, and a `62ch` measure cap.

**Verified** (fresh dev server, Playwright driving the real debug-bar flow, screenshots read back frame-by-frame): the full autoplay timeline confirmed on both persona images at desktop (1440×900) — condense (ember visible mid-collapse) → settled spotlight hold → name inking → whisper → **auto-advance with no click** → keepsake with all labels/dividers rendering; same full pass repeated at mobile width (390px, stacked layout, spotlight still reads correctly on portrait); reduced-motion pass confirmed pre-inked name, no condense/motes, and the **same auto-advance** on its own shorter timeline; print output checked and one real bug caught and fixed in this same pass — `.surf-why p:not(.surf-epigraph)`'s screen-only rule outranked the print colour override on specificity, washing out "The Reading" paragraphs on the printed keepsake to near-illegible pale text; fixed with `!important` (consistent with the rest of that print block). `tsc -p tsconfig.app.json` clean, `eslint` clean, **zero console errors across every run**.

**Noted, not fixed (pre-existing, out of scope):** debug-jumping straight to H9 (rather than a natural H1→H9 walkthrough) skips the self/mood-scale questions too, so a debug-jump test always resolves to the same top archetype pairing ("The Alternative Comic") regardless of which `?persona=` image is requested for display, and produces a sentence with a missing trait word ("you lean ."). Confirmed this is a testing-path artifact of the engine's scoring, not a Surfacing bug — real playthroughs populate all of it correctly.

**Open for Robin:** exact condense duration/ember strength are tuned by eye, not measured against a reference — worth a live feel-check; whether the beat-5 keepsake wants the spotlight vignette dialled back slightly now that the image sits in a smaller column.

### 2026-07-08 — The Surfacing beats 4–5 BUILT (TheSurfacing · The Unveiling + The Keepsake) — with the first two REAL persona images

**Agent:** Claude Code / Fable (with Robin live, same session as the master spec) · **Where:** new `TheSurfacing.tsx`, new `src/data/personas.ts`, `index.css`, `App.tsx` rewired, `TheDepths.tsx` (stub gated) · **Assets:** Robin generated the first two persona images from the prompts doc (`2026-07-08-persona-image-prompts.md`) — `public/personas/magician-outlaw.jpg` (The Trickster, also copied as `_fallback.jpg` since it's the house pour) and `creator-hero.jpg` (The Visionary).

**Two asset-spec amendments forced by the real images (supersede the Surfacing spec §4 constants):**
1. **3:4 portrait (896×1200) replaces 4:5** — generator-native, and cropping to 4:5 would clip both images' tags and the Trickster's tarot halo. Note: 3:4 full-bleed cover on 16:9 would crop out BOTH the tag and the glass — so beat 4 renders the image **full-height `contain` on the dark stage** (no vignette ever — the no-grade rule is absolute), which also keeps one geometry path for beats 4+5.
2. **Per-image tag transform replaces the fixed tag safe area.** Both generations landed beautiful natural in-scene tags in different positions/angles — better than a composited master tag. Each image now records `{cx, cy, w, angle}` (+ a `glass` point for the bloom) in `src/data/personas.ts`; the name is inked into *that*. ~1 min of annotation per image across the 132.

**Built:** beat 4 — mounts white-on-white from TheDepths' `onComplete` (cut invisible; image `decode()`d before anything starts); rAF-driven radial mask condenses the warm white into the glass point (the disc dims as it drowns — the last spark dies in the drink); focus pull keyframe on the img alone (parallax and glide own separate elements — the heroFadeUp lesson, honoured); 6 seed-coloured motes drift down; held silence; the name strokes on via clip-reveal in seed colour with `mix-blend-mode: multiply` (reads as real ink in the parchment); 2–3px whisper-parallax (autonomous drift on touch); whisper **"meet the cocktail within"** at 5.5s; advance strictly click. Beat 5 — imgwrap glides right via a one-shot 700ms inset transition (deliberate layout anim on a single absolute element; design-hook flagged it, kept: transform-scale would distort the `contain` image; swap to aspect-matched FLIP only if it ever janks), tag follows via per-frame re-glue; story composes left with 110ms stagger: title (**warm ivory**, locked), ELABORATED FOR [name], pairing + essence, ingredients (brass amounts), ritual, whyYou, **save the keepsake** (print CSS: light page, tag/actions hidden; "send" joins the row when `/pour/:id` exists). Mobile <900px: image stacks above, story scrolls below. Dev-only `?persona=&name=` overrides for inspecting any image without a journey.

**App rewired to the master spec:** phases now `landing → depths → reveal`; `craftCocktail(answers)` resolves at the depths' `onComplete` (ENGINE SEAM untouched); quiz/brewing/CocktailReveal left the flow (components remain in repo); TheDepths' "to be continued" stub only renders when no `onComplete` is attached.

**Verified** (fresh dev server; Playwright + preview tools): tsc `-p tsconfig.app.json` clean; eslint clean (one `preserve-manual-memoization` error fixed by dropping a needless `useMemo`); H9 → white → condense → image → ink → whisper for BOTH images at 1440×900 and 808×949 (screenshots confirmed: name sits on the tag at the tag's own angle, whisper clear of the tag after moving it to 3.5vh); keepsake verified in desktop two-column (story 7vw/44vw, image column right, tag re-glued after resize) AND stacked mobile; a11y snapshot confirmed all 7 content groups + save action; reduced-motion emulated pass: no condense/motes, name pre-inked, whisper appears, groups render opacity-1 without stagger; **zero console errors or warnings across every run**. Tag metadata tuned twice against screenshots (trickster cy 0.925→0.916; creator-hero cx/cy/w/angle refined).

**Open for Robin's feel-pass:** condense duration (1.8s) and the 0.45 inner-edge softness of the mask; ink speed (1.4s); whether the keepsake wants a quiet way back to the entrance (not specced — abandonment rule says refresh = fresh start); **one full natural pass H1 → keepsake** with a real name/seed (the debug path drives the same setters, but the gold-standard run is Robin's own); the print page is styled but untested on paper.

### 2026-07-08 — WHOLE EXPERIENCE FINALISED (master spec written)

**Agent:** Claude Code / Fable (with Robin live, evening of 2026-07-07 — Robin's last Fable session; all planning had to close tonight) · **Spec:** `design-artifacts/2026-07-08-experience-master-spec.md`

One structured session closed every remaining experience decision ahead of the architecture phase. Decisions (full detail + rationale in the spec; choices were Robin's, via structured options):

1. **Sharing:** shared link = the **Condensed Surfacing** (auto-plays bloom → persona image → name-inking → keepsake, ~3–4s, reduced-motion twin pre-inked). Persist **every reveal server-side** (~2KB record, short unguessable ID → `/pour/:id`; the trace is never persisted or sent). Keepsake gains a quiet **save · send** pair. **OG preview = persona image + inked name** via a dynamic route.
2. **Mobile:** **full responsive journey** — Robin's call ("it needs to keep the same magic… adapt for mobile"). Per-hold adaptation, staged, same propose→build→verify rhythm; **focal map** (per-stage `object-position` on known freeze frames) instead of blind centre-crop; known work: H1 keyboard, H3 touch-drag twin, H5/H8 portrait presets, H6 2×2 glasses, H7 label density. Velvet rope ("this ritual is poured on a wider table" + send-yourself-the-door + taste-one-already-poured) demoted to **degrade state only**. Shared page mobile-first regardless.
3. **Resilience:** **silent deterministic fallback** on Bartender failure (apology/exemplar recovery state deleted — unreachable); poetic 404 also covers dead pour IDs; Still Water formalised as a first-class mode; resize-safe criterion; quiet retry on send failure.
4. **Side door:** yes — one muted whisper line under the hero CTA, "taste one already poured" → house exemplar pour (Trickster). Hero otherwise untouched.
5. **Sound:** **"Water & Ink"** — diegetic arc choreographed to the questionnaire flow and reveal (Robin's criterion: "needs to fit the video and the entire flow from start to reveal"). Felt-not-heard underwater bed through the holds, per-interaction accents, bed opens on ascents, **the splash is the loudest moment of the piece**, the unveiling is silent except the nib inking the name. Unlock on the Entrance CTA gesture; persisted toggle.
6. **Surfacing opens closed:** unveiling whisper = **"meet the cocktail within"** (completes the motif: "Discover the Spirit Within" → "trust the spirit within" → this). Keepsake **title warm ivory; seed colour reserved for the name alone**.
7. **Wiring/routes:** landing → depths → reveal; `/`, `/pour/:id` (owner + guest + exemplars, one page three uses), poetic 404.
8. **Craft floor:** Edward-lens block (60fps desktop / no-jank mid-range mobile, zero console errors, <4s transitions, touch parity, Still Water twin, resize-safe, real tsc command) gates "built" status in **both viewports**.

**Handed to architecture (spec §9):** pour storage, `/api/reveal` + pour-fetch + OG endpoints, client routing, exemplar seeding, analytics scope, audio delivery seam.

### 2026-07-07 — The Surfacing beats 2–3 BUILT (H9 · The Letting Go + The Splash)

**Agent:** Claude Code (with Robin live) · **Where:** `TheDepths.tsx`, `index.css` · **Spec:** `design-artifacts/2026-07-07-the-surfacing-reveal-design.md` · **Plan:** `design-artifacts/2026-07-07-the-surfacing-beats-2-3-plan.md`

**The reveal now has a body.** The breath's frozen tableau — figure drawn, spirit-point ignited, "there you are." — no longer just holds. It lets go, then breaks the surface.

**Beat 2 (The Letting Go):** "there you are." holds `RELEASE_HOLD_MS` **1500ms**, then the spirit-point detaches and falls as a bright drop of her seed colour with a seed-tinted trail, accelerating on a quadratic ease over `RELEASE_FALL_MS` **1150ms** while the whole figure/motes tableau exhales to black (a single `globalAlpha` factor on the breath canvas tick) and the caption fades out (`breath-reveal-out` replacement keyframe). The colour's last appearance as light.

**Beat 3 (The Splash + Bloom Cut):** the instant the drop exits frame the footage resumes at 1× via the locked `playUntil` contract (native play, freeze on arrival — never `playbackRate`, never scrub) and the crown splash catches the drop. At the crown's peak (`BLOOM_AT_MS` **450ms** into playback, ≈12.35s) a pure-CSS warm-white radial bloom (`#fbf6ea`) swells from the impact point over `BLOOM_GROW_MS` **900ms** and whites the frame out **before the pull-back can reveal the video's own amber glass** — the video freezes at `SURFACE_CUT` **12.95s** under the bloom (locked: the only drink the user ever sees is their own). Full-white hold, then a whisper stub ("the surface breaks · to be continued") and `onComplete` fire at white. Reduced-motion collapses the whole thing to a quick fade-to-white with the whisper, no splash playback.

**Architecture:** everything lives in `TheDepths` as a new final `surface` stage; the drop is drawn by the same rAF tick that draws the figure; a new optional `onComplete` prop fires at full white for `TheSurfacing` (beats 4–5, next plan) to attach to. App wiring untouched.

**Verified (browser, via Playwright driving the dev-only debug bar):** H9 direct — surface stage renders, bloom → white → whisper in sequence, **`video.currentTime` froze at exactly 12.95 with `paused === true`** (the pull-back glass never showed). End-to-end from "Breath": reveal → seed-drop fall (screenshot-confirmed the figure fading with the drop's trail at frame bottom) → splash auto-began → bloom → full warm-white → whisper, again freezing at 12.95/paused. Re-entry hygiene: H7-after-H9 clears the surface, Breath-after-H9 replays cleanly. Reduced-motion: no splash playback, `currentTime` stayed at 11.9 (HOLD_BREATH), quick fade + whisper. `tsc --noEmit -p tsconfig.app.json` clean; lint shows no new errors in `TheDepths.tsx` (only the pre-existing `react-hooks/refs` / synchronous-setState noise). No console errors in any run.

**Open feel-checks for Robin:** fall duration (1150ms — does the drop hang right?); bloom warmth `#fbf6ea` (warm cream, not pure white — reads correctly on the frozen splash); whisper copy "the surface breaks · to be continued" (stub — beat 4's real line is still tbc).

### 2026-07-07 — The Surfacing DESIGNED (reveal phase · spec written)

**Agent:** Claude Code (with Robin live) · **Source:** Robin: "we've just finished the breath, what's next? … the unveiling is the money shot, we need to get this right." · **Spec:** `design-artifacts/2026-07-07-the-surfacing-reveal-design.md`

**Context note:** since the H8 entry below, the breath was revised to **rev 2 "There You Are"** (in code): the echoes' motes settle onto anchors along the brand's continuous-line figure (`SPIRIT_PATH`, the nav mark), one stroke draws through them, the spirit-point ignites — "there you are." The Surfacing picks up from exactly there.

**The footage discovery that shaped everything:** `journey.mp4` is 15.1s — 3.2 seconds *past* the breath hold (11.9s) were never used: a drop splashing into a cocktail's surface (~12.5s) and a pull-back to a finished amber drink on a bar (~14.9s). The ascent doesn't surface into open air — it surfaces **inside the glass**.

**The five beats** (1–3 in `TheDepths`, new final stage `surface`; 4–5 in a new component `TheSurfacing`):
1. **The figure** — "there you are.", spirit-point in her seed colour (exists).
2. **The letting go** — the spirit-point detaches and falls as a seed-coloured drop; the colour's last appearance as light.
3. **The splash** — footage resumes at 1× (11.9→~13.0s); the crown splash catches her drop; at its peak a warm-white bloom whites out the frame **before the video's amber glass is ever revealed** (Robin's call: the only drink the user ever sees is their own). Video unmounts behind the bloom.
4. **The unveiling (the money shot)** — the persona image resolves from the bloom with fixed choreography: light *condenses* (radial mask contracts toward the drop's landing point, last spark dies inside the glass in the image) · focus pull (scale 1.05 + blur → sharp) · 5–7 seed-coloured motes from the breath drift down and dissolve · held silence, zero UI · the name inks itself onto the image's tag handwriting-style in seed colour · whisper-parallax on cursor (bookends the hero's spotlight) · one quiet line ("read your story", copy tbc) — advance strictly user-initiated.
5. **The keepsake** — image glides right (~40% column), text composes left with staggered motion: title, "Elaborated for [name]", archetype pairing, ingredients, ritual, narrative, save-keepsake (print CSS → light PDF page). In-world, dark/warm; immersion never breaks.

**Colour rule (Robin, locked):** the persona image is sacred — no tint/grade/overlay ever. Seed colour = lettering only (tag name; whether the beat-5 title also carries it is an open question in the spec).

**The 132 persona images (Robin authors, not runtime AI):** full scenes — decoration, atmosphere, "uncovering of who the person is," not merely a glass, not constrained to a bar. Three constants so one build serves all 132: **4:5 portrait · fixed blank tag safe area (proposal: bottom-right, ~22% width, ~-5°) · dark-ambient lighting family** (must emerge legibly from a warm-white bloom). Files `public/personas/<primary>-<secondary>.jpg` keyed by `findPairing`; `_fallback.jpg` covers gaps. Tiered rollout: fallback → 12 pure pairings → remaining 120.

**Engineering:** `TheDepths` gains `surface` stage + `onComplete(answers)`; App phases become landing → depths → reveal, computing `craftCocktail(answers)` at handoff; old quiz/brewing phases leave the flow (components kept); the breath's ENGINE SEAM is untouched (real distillation resolves during the echoes, before the drop falls); `prefers-reduced-motion` collapses beats 2–4 to a crossfade with the name pre-inked.

**Status:** spec written, pending Robin's review of the doc. Open: whisper copy; title colour strength/scope. Agreed next phases after this: sound identity → craft floor → real LLM distillation.

### 2026-07-06 — H8 · The Breath BUILT ("What the Ink Remembers")

**Agent:** Claude Code (with Robin live) · **Where:** `TheDepths.tsx`, `index.css`, `App.tsx` · **Source:** Robin: "let's build the breath — the unveiling is the money shot and needs to be epic," deferring S6 until the cocktail visual question (image/3D per persona) is answered.

**The latency pocket is now a scene.** On the crown hold (~11.9s), after a beat of stillness, *echoes* of her own journey surface and sink one after another — short fragments composed from the canonical `Answers` object (`buildBreathEchoes`, module-scope pure): "for {name}", "poured for {lens}", "{colour} runs through it", the strongest gravity lean, a caught texture word ("{word}, when no one is asking"), "and a part of you it keeps secret" when any binaries cooled unanswered, drawn-toward / sought-for words, flavours on the tongue, the vessel in the hand, the first ward, and a craft line for the *Never* / *Exclusively* poles. **The trace is never echoed verbatim** — the scenario's allusion-only rule is enforced in the builder itself: one fixed line ("…and the one thing you told only the ink"), always last. `TheDepths` now receives `answers` as a prop from App for exactly this.

**Choreography:** fragments are CSS-only once mounted (one keyframe owns each echo's whole in/hold/out lifecycle including its centring transform; inline `animation-delay` staggers them at 1.5s, life 3.3s, ~2 visible at once) across nine preset surfacing spots ordered so consecutive echoes never rise near each other. Her seed tint lifts over the footage for the whole hold (the colour gathering back). When the cycle completes, everything condenses into a **single drop of her colour** at the centre with two rings rolling outward — the deliberate mirror of H7's still-surface rings — pulsing softly under "the surface is about to break · to be continued," which is the exact frame the Unveiling will inherit.

**The engine seam is explicit:** today distillation is instant, so exactly one cycle plays before the condense (a `setTimeout` at cycle end, commented as THE ENGINE SEAM). When the real agent call exists, the hold stays in 'echoes' looping a reshuffled cycle until it resolves — the scene was architected for variable latency from the start. Debug: the "Breath" button re-jump restarts the cycle in place via a run-nonce the driver effect is keyed on.

**Verified:** tsc clean (real command). Natural pass H7 → breath: echoes composed correctly for the session's data, trace allusion present with the typed trace ("the harbour at dawn") appearing nowhere on screen, drop + rings + held line screenshot-confirmed, re-jump restart confirmed via a 3.2s instrumented poll (still → surfacing at ~1.4s → hold). No console errors.

**Open feel-checks for Robin:** echo pacing (1.5s stagger / 3.3s life — a full-data cycle runs ~15s, which is also the latency budget it hides); whether the condensed drop should hold indefinitely or breathe the footage's next seconds; tbc copy.

### 2026-07-06 — H7 · The Trace BUILT ("The Still Surface")

**Agent:** Claude Code (with Robin live) · **Where:** `dionysus-experience` — `TheDepths.tsx`, `index.css` · **Source:** the journey map's own register for this hold ("near-silence, one quiet gesture + free text") and the log's standing note to propose something restrained after H6's three rebuilds.

**Beat 1 — night's craft as five concentric rings.** On the foam-dome hold (~10.7s) the dome's own geometry becomes rings on a still surface: *Never* at the rim, *Exclusively* at the heart, where a single drop of her seed colour pulses. Rings and labels are one SVG dial (`pointer-events: stroke` hit bands ~7.5 units wide, the innermost also accepting clicks anywhere inside it); labels sit on their rings at staggered bearings so no two stack. Touch a ring: one ripple of her colour rolls outward from that radius, the heart flares and goes out, the unchosen rings exhale, and the chosen ring is drawn down into the centre — the answer absorbed by the drink. Values are the `FREQUENCY_OPTIONS` strings verbatim (mixology branches on `'Never'` → zero-proof), so the data contract stays in `data/questions.ts`.

**Beat 2 — the trace is the journey's bookend.** "Leave one trace of yourself" on the same bare `depth-input` line the name was written on in H1. Each keystroke releases a mote on the same canvas as H1's name-bubbles — but where those rose and froze (time had stopped), these dissolve as they rise (a `decay` field on the bubble sim; the surface is cleared of H1's frozen bubbles on arrival). Seal copy is state-aware: *"let it settle"* with text, *"leave nothing but tonight"* without — the trace stays optional without a labelled skip. Sealing blooms once and rises natively to a new breath hold (11.9s), a staged stub ("the ink holds its breath · to be continued") where the reveal work will pick up. Enter submits.

**The night veil extended.** The trace hold turned out to be the footage's brightest stratum (the crown at ~11.9s its whitest frame) — the resonance/finish darkening veil now stays down through trace → ascent → breath, plus a whisper of dark drop-shadow under the ring strokes for the bright band. Without it the rings and sub-copy washed out entirely (screenshot-confirmed both ways).

**Verified** with the real command (`tsc -p tsconfig.app.json` clean): full natural pass H7 → breath — ring hover brightens ring+label as a pair, choosing *Frequently* fired ripple/absorb/fade choreography and swapped to the trace line ~1.4s later with the input auto-focused; typed a trace, seal copy switched, sealed, video rose natively to exactly 11.9 → breath line legible. Debug bar gained a "Breath" button; H7 re-jump resets cleanly. No console errors.

**Open feel-checks for Robin:** ring count vs. label density on small viewports; whether the heart-drop should carry a whispered label ("the heart of the craft"); breath-stub copy.

### 2026-07-06 — H6 interaction pass (held bubbles, glass shelf, ward row)

**Agent:** Claude Code (with Robin live) · **Where:** `TheDepths.tsx`, `index.css` · **Source:** Robin's three edits on the built hold, then two live corrections.

**Flavours: pop → hold.** Selected bubbles no longer burst away — a click freezes the bubble exactly where it was touched (the tick loop just stops writing its position) and lights it in her seed colour; a second click releases it to resume rising from where it stood. Robin's correction folded in: the release hint (strike-through on hover) is gated behind an *armed* flag set only when the pointer leaves the held bubble — the catching click itself never shows the strike, which read as rejecting the choice just made.

**Glasses: the real bug was `heroFadeUp`.** Its `transform` keyframes with `both` fill permanently override any `translate()` centering on animated elements — every hit-target/label had silently been anchored top-left, which is exactly the misalignment Robin screenshotted. Centering moved to negative margins (immune), the four glasses now stand with bases on a shared shelf line (`FIN_BASELINE` 54%, y-target keeps each base pinned at the current scale so a hovered glass grows upward from where it stands), labels one consistent step below, and one 150×230px button spans glass + caption (probe-verified both clickable). The same fix cured a latent half-size jump in the bubble pop.

**Wards:** the six exclusions moved off their scattered absolute bottom-edge positions (which collided with the seal) into one composed wrapping row beneath the hero glass.

**Verified:** tsc clean (real command), full H6 pass, held/release/arm cycles probe-verified, no console errors (one "Maximum update depth" burst investigated and attributed via log-marker ordering to HMR churn on the mounted component, not product code — clean across all post-reload runs).

### 2026-07-03 — H6 · The Finish rev 4 BUILT ("The Pour," back to basics)

**Agent:** Freya · **Where:** `dionysus-experience` — `TheDepths.tsx`, `index.css` · **Source:** Robin: "start again... same order as before — flavors first, then the glass, then the restrictions... those bubbles on the first question [H1's lens bubbles] — rather than doing what we just did with colors, which feels gamified and cheap, keep it very ephemeral and simple: bubbles float to the top, come back at the bottom, choose max three... restriction is very simple, we're making it too complicated."

**Fourth pass on this hold in one day.** Order reverted to the original (flavours → glass → restrictions). Flavour bubbles rebuilt to match H1's lens-bubble language exactly — a plain translucent glass sphere, the word centered inside, **no per-flavour colour at all**. They rise continuously (not H1's in-place drift, per Robin's explicit "float to the top... come back at the bottom") and recycle when unclaimed. A click **pops** the bubble in place (scale up, fade — a soap bubble bursting); nothing shoots anywhere, since there's no glass yet to shoot toward at this point in the new order.

**The glass lost its entire liquid system.** Since flavours are now chosen before the glass exists, there was no live moment left to justify "pouring" — so `drawGlass` had the gradient/meniscus/internal-bubbles code removed outright, back to just the illustration. The glass still persists as a plain settled backdrop through the restrictions step.

**Restrictions simplified to a plain reversible toggle** — no stroke, no particles, no one-way banish. Click excludes (dim + strikethrough), click again includes. This is a genuine simplification, not a re-skin: the spark system, the ink-stroke system, and the liquid-fill system are all gone from the file.

**A testing-tool gap surfaced and fixed along the way, unrelated to the H6 rebuild itself:** `npx tsc --noEmit` (no `-p` flag) was silently checking the *root* `tsconfig.json`, which declares `"files": []` and only project references — so it had been reporting a clean pass without checking any real source all day, across every prior H6 revision. Correct invocation for this repo: `npx tsc --noEmit -p tsconfig.app.json`. Running it for real surfaced one genuine pre-existing bug in H5's canvas effect (an unguarded `resDust.current` iteration, missing the `!` its sibling `finDust.current!` already used) — fixed. Every earlier "tsc clean" claim today should be read as "Vite/esbuild transpiled without error," not a real type-check.

**Verified** with the corrected command: clean. Full run — caught 3 bubbles (H1-style spheres confirmed via screenshot, no colour, no glass rendering behind them), sealed into the glass step (four plain glasses, unchanged), chose one, reached restrictions (glass persists plain, no liquid), toggled one exclusion on and back off (confirmed both directions via computed class + seal copy), excluded one for real, sealed, video rose natively to exactly 10.7 → trace stub. No console errors.

**Open feel-checks for Robin:** bubble rise speed without colour to help track any one bubble; whether the glass should carry any small acknowledgment of the chosen flavours; restriction layout now that it's a toggle rather than a one-way action.

<details>
<summary>rev 1 — "The Garnish Crown" (superseded same day)</summary>

Three fixed canvas charms (flavour/vessel/veto) above the prompt: flavours ignited via tap (reusing H5's glint language) and threaded light up to their charm; the vessel was four CSS glass-silhouettes pressed into a foam-line, auto-advancing; veto pendants were severed via tap, leaving a ward-mark tick on the crown. Fully built and verified working — tsc clean *(later found to be a false-positive check — see rev 4)*, all three steps functioned, no console errors — before Robin asked for alternatives grounded in the founding brainstorm, which led directly to rev 2.

</details>

<details>
<summary>rev 2 — "The Pour," drag-based (superseded same day)</summary>

Choose the glass (click) → drag flavour vials onto the glass, each pouring in as a stacked hard-edged colour band → swipe (or tap) to banish ward tokens, a real swipe leaving an ink-stroke trail. Fully built and verified working before Robin flagged that drag-and-drop doesn't suit a desktop-first experience and that the stacked bands looked cheap, leading directly to rev 3.

</details>

<details>
<summary>rev 3 — "The Pour," click-only, glass-first (superseded same day)</summary>

Three fixes in one pass: (1) no drag anywhere — pouring and banishing both became clicks; (2) flavours became coloured bubbles rising below the glass, a click catching one with a spark burst arcing its colour into the glass; (3) the flat stacked liquid bands were replaced with one smooth `createLinearGradient` blend plus a meniscus highlight and internal bubbles. Ward banishing got an auto-drawn ink-stroke on click. Fully built and verified working (via Vite/esbuild transpilation, not a real type-check — see rev 4) before Robin asked for a full restart: revert the order to flavours-first, drop the per-flavour colour and the "shooting into the glass" payoff as gamified and cheap, and simplify restrictions — leading directly to rev 4 above.

</details>

### 2026-07-02 — H5 · The Resonance BUILT ("The Constellation")

**Agent:** Freya · **Where:** `dionysus-experience` — `TheDepths.tsx`, `index.css`, `types.ts`, `App.tsx` · **Source:** Robin: "let's move to the next questionnaire, the citrus — please make it award-winning"

**Decision (Robin):** option 1 of 3, The Constellation — the only direction where the act of choosing creates something that's hers. (Rejected: Rising Shower — cycling words force waiting/hunting across 12 options; The Prism — a 12-spoke radial reads as a menu wheel.)

**The design:** on the 8.2s citrus-burst hold (the footage's climax), the two questionnaire multi-selects — "What are you most drawn toward right now?" (12) and "What do people often come to you for?" (14), max 3 each — play as scattered **prismatic glints**: white sparks with faint iridescent halos drifting on individual currents, words beneath. Touch ignites a glint in her seed colour and **canvas threads draw between all chosen pairs** — her own constellation inside the drink. Touch again releases (threads retract). At three the unchosen dim; a fourth touch gets a refusal shake. No time pressure — the deliberate opposite of H4. "let it resonate" seals: the constellation contracts to its centroid, a single point of light rises, and the second word-shower falls in; the second seal rises the camera to the new finish hold (9.4s). Data: `Answers.drawnToward` / `soughtFor`.

**Key engineering choice:** threads read the glints' live `getBoundingClientRect` positions every rAF frame (max 3 rects/frame) instead of mirroring positions in state — so threads drift with the words, and at the seal they contract with the glints automatically. One source of truth; the seal needed zero extra thread choreography.

**Verified via the debug bar** — and H5 is the first hold where screenshots are race-free (no timers), so visual proof was finally possible: a clean capture shows the seed-colour triangle (Freedom→Wonder→Mischief) spanning the burst, reading as native against the footage's own starbursts. Also confirmed by DOM/pixel sampling: 12/14 words per phase, dim-at-three, refusal shake, release, seal→rise→Q2→seal→exactly 9.4→"to be continued" stub, canvas threads inked (pixel readback), no console errors. Two harness notes: (1) one screenshot came back a frame stale (footage only, UI "missing") — a re-capture showed the true state; check twice before diagnosing invisible UI; (2) an in-page await chain >~3s got GC'd ("Promise was collected") mid-verification — its in-page effects still executed; re-sample rather than re-run.

**Open feel-checks for Robin:** drift amplitude; thread brightness; whether Q1→Q2 wants a longer breath; scatter layout at extreme viewport ratios.

**Rev 2 — "Living Night Sky" (same day, Robin via `/impeccable` overdrive: "100x what was just created... and the text is sometimes a bit hard to see, maybe darken the background"):** overdrive's propose-first rule ran; Robin picked Living Night Sky (Canvas 2D craft) over WebGL Bloom (dependency + tech-demo risk) and Choreographed Sky (motion-only). Register confirmed `brand` via the project's PRODUCT.md — whose own principle ("use darkness to make the light and colors pop") is the legibility fix: **night falls over the burst** (wash deepened to 0.24/0.36/0.74) and every word gets a soft radial pocket of shadow, larger type, brighter ink — verified legible directly over the footage's brightest flare. The scene: 36 rising twinkling dust motes (additive blend); curved gradient filaments (wide glow under white-hot core, ivory→seed→ivory) with a light-pulse traveling each one and breathing halos at the stars; ignition/release/converge spark bursts; a one-shot 900ms "the drink noticed" flare when the third star lands (threads brighten, dust drifts toward the constellation); DPR-aware canvas (crisp at retina); words condense in from blur; the rising seal-light leaves a trail. `prefers-reduced-motion` honored end-to-end for the first time (static dust, full threads, no particles — PRODUCT.md's accessibility line made real). tsc clean, no console errors, clean screenshot proof. Harness note: mid-verification the preview tab kept resetting/reloading under me — evidence (viewport width change, fresh vite connect, state wipes between evals) points to the tab being open and driven concurrently on the user's side while I automated it; not a code fault. State logic verified twice regardless; the final capture is clean.

**Still open:** dust density/brightness; flare strength; whether H4's ember words should inherit the word-pocket treatment.

---

### 2026-07-02 — H4 rev · "The Spark" (look-and-feel pass on the binary game)

**Agent:** Freya · **Where:** `dionysus-experience`, `TheDepths.tsx` + `index.css` · **Source:** Robin: "I like the speed aspect and that it feeds the algo, but I don't like the look and feel — recommendations considering the video behind and where we're at"

**Diagnosis:** the Thaw build's two ~110px near-opaque near-black blobs were static except for the melt — read as UI buttons sitting on the footage rather than something alive in the world, and heavy dark mass doesn't communicate speed even though the timing mechanic does.

**Presented 3 options grounded in the actual footage** (S3 · The Bitters is described as "black teardrops... first starbursts"): (1) Starburst Words — swap the blob for a shard of light echoing the sparkle already emerging in-frame; (2) The Trailing Stems — anchor the word to a fraying, snapping thread; (3) Twin Embers — reuse H3's mote language directly. Robin picked **1**.

**Built:** the binary game keeps its exact mechanic and data contract — only the object changes. Each word now lives on a **spark**: white-hot core cooling to the seed colour (`.spark-rays::before`), a thin hollow diamond shard frame (`::after`), 8 rays radiating out at alternating lengths (`.spark-ray`, rotated via inline `transform: rotate(deg) scaleY(var(--ray-scale))`). Lifecycle changed from freeze→melt to **ignite → breathe → dim**: rays grow in from 0.4× over the first 260ms, breathe via a continuous sine flicker for the whole round, then contract inward while the core dims over `THAW_MS` — no more downward sink/heavy blur. Catch flashes the rays to 2.6× and the core to full white-hot before dissolving; the miss gutters the rays to near-zero. `--ray-scale`/`--core-op` are CSS custom properties written every rAF frame on the button element (no transition, matching the existing direct-write pattern) and only get transition-gated via `[data-caught='1']` at the terminal catch/dismiss moment, so the two animation systems never fight. Renamed `.bitters-*` → `.spark-*` throughout (markup and CSS) to match.

**Verified:** tsc clean; walked the full journey end-to-end via the preview MCP. Data pipeline confirmed correct — one live catch registered as "kept" at the right binary key, the rest auto-expired as "secret" dots, all 9 rounds cycled without error, journey rose to exactly 8.2s with no chapter text. **Could not get a clean live-painted screenshot this pass** — the automated preview tab reports `document.visibilityState: 'hidden'`, which throttles the rAF paint loop specifically (React's timers still advance close to real time, so state/data is trustworthy; only the frame-by-frame visual paint stalls). Same class of limitation noted in the original H4 build. One incidental screenshot at the 5.7s hold caught the raw footage itself mid-round-transition (sparks not yet painted) — but it showed the real footage already has genuine sparkle flares and red-stemmed drops in frame, which is a good sign the new language belongs there. Robin's own focused browser is unaffected by this throttling.

**Open feel-checks for Robin:** ignite/breathe/dim pacing (inherited the 850/2550ms split from the Thaw build, untested at this new visual); catch-flash intensity (2.6×); whether the word reading just below the spark (rather than overlapping it, as before) is clear enough.

**Rev 2 — "Twin Embers" (Robin, same day):** "I don't like 1 (the image above the text is ugly), do 3, if I don't like that we'll come back to 1 but change the shard of light." Swapped the whole starburst object (core + diamond shard + 8 rays) for the plain glowing-orb language already live in H3's mote — one circle, same radial-gradient recipe, no separate ornament sitting above the word. Lifecycle became **ignite → pulse → cool**: it breathes with a steady heartbeat (`sin(elapsed / 480)` driving both scale and glow) while alive, then the pulse amplitude weakens as it shrinks and dims toward a dead coal over `THAW_MS` — stays visible while cooling, only dissolves in the last ~30% of the window. Catch flares it to 2.3× scale / 1.6 glow before bursting; a miss collapses it to `scale 0.3 / glow 0.05` and fades. Renamed `.spark-*` → `.ember-*` throughout; `SPARK_RAYS` and the ray markup are gone entirely — the whole visual is one element now (`.ember-core`).

Walked the journey twice to verify. The first pass taught a test-methodology lesson: manually calling `video.play()` to nudge a throttled wait, then not re-checking before it kept rolling, let the video drift several real seconds forward past the intended freeze point — the resulting screenshot showed the S6 Reveal frame (finished glass on the bar) instead of the bitters hold. Not a product bug: nothing in the shipped code calls `.play()` without a paired target-and-pause the way `playUntil` does; this was purely an artifact of nudging the raw DOM API by hand during testing. Fixed by only calling `.play()` while `currentTime` is still short of the target, never after arrival. The second pass produced a clean, correctly-backgrounded screenshot at 5.7s: two small warm pearls of light beneath "Which is more you?", sitting naturally alongside the real bitters teardrops and trailing red stems visible in the footage. tsc clean, no console errors, rose to exactly 8.2s.

**Open feel-checks for Robin:** whether the plain orb reads as too close to H3's mote (shared signature vs. each hold having its own); pulse/cool pacing (same 850/2550ms baseline as the Spark rev, still untested at this visual); catch-flare intensity (2.3×/1.6). If this doesn't land either, the next move per Robin is back to option 1 with the shard of light redesigned rather than dropped.

**Rev 3 — Twin Embers approved, two refinements (Robin, same day):**

1. **"Bring the drops a tiny bit closer together... the gap between mentally selecting and physically selecting is too big to infer anything."** `--x` moved from 37%/63% to 41%/59% — less mouse travel between reading both words and clicking the chosen one.
2. **"The game starts abruptly, I'd almost give them an initial question that explains the game... a bit like a training."** Added round **-1**: an unscored practice pair, "This" / "That", shown before the real nine. Its prompt swaps to *"First, the feel of it"* (from "Which is more you?") and its hint reads *"catch either one before it cools — nine will ask something real."* `catchDrop` now guards the whole data-write block behind `hRound >= 0`, so catching (or missing) the practice pair never touches `Answers.texture`. Removed the old round-0-only hint — the practice round now owns that teaching moment, so real round 0 plays exactly like rounds 1–8, no leftover instruction text. The 9-dot progress row maps over the real `BINARIES` only, so it was already immune to a phantom 10th entry — confirmed live rather than assumed.

**Verified:** tsc clean. While testing, `preview_console_logs` surfaced a "Maximum update depth exceeded" React warning — logged a unique `console.error` marker before each fresh reload to tell stale from live errors in the tool's rolling log buffer (it's a reliable technique, worth reusing). First read as pre-existing/stale; a later marker-bounded check (see rev 4 below) placed it precisely between two markers from *this* session's own testing, correlating with an unusually aggressive 150ms-interval async polling script rather than any normally-paced walkthrough — narrowed down, not fully root-caused, but consistently absent from every gently-paced test since. Functionally confirmed regardless: practice-pair click writes nothing to `Answers.texture`, advances cleanly into real round 0, dot row stays at exactly 9 with no phantom entry, `--x` positions read 41%/59% live.

**Rev 4 — practice-round copy and pacing (Robin, same day):** "I like the question 0 concept but... the text doesn't really explain what they must do — it's too quick." Two changes:

1. **New prompt**, replacing "First, the feel of it": ***"Too quick to think — trust the spirit within."*** Explicit about the gut-instinct framing Robin asked for, and a deliberate callback to the hero's own tagline ("Discover the Spirit Within") — reframes the catch-before-it-cools mechanic as *why* speed matters here (outrunning deliberation), not just a game rule.
2. **Staggered, slower reveal** — "have the two drops appear maybe a tiny bit after the text and disappear slower... the user needs time to read and then to choose." Added `PRACTICE_REVEAL_DELAY_MS = 600` (embers stay at opacity 0 until the prompt's had a beat alone), `PRACTICE_FROZEN_MS = 1500` and `PRACTICE_THAW_MS = 4200` (vs. the real 850/2550 — roughly double the decision window). `paintDrops(elapsed, round)` now takes the round index and branches its constants; `startHRound` computes a practice-specific `PRACTICE_ROUND_MS` for the expiry check instead of the shared `ROUND_MS`. Real rounds 0–8 are untouched — same constants, same behavior as before.

**Verified:** tsc clean. Walked the journey with a fresh marker; measured the actual prompt→embers stagger at ≈490ms against the 600ms target (within the preview's own polling granularity), and confirmed no "Maximum update depth" recurrence after this marker despite the timing changes.

**Rev 5 — same day, two more requests:** "the timing between the text arriving and the two dots appearing is too long — use the timing from the text after clicking Cross the Threshold, it was good" + "add something for us for testing that allows us to navigate to another question so it's easier to debug and build."

1. **Reveal delay retimed against a concrete reference.** `.depth-line` (H1's cold-open lines) reaches full clarity at 16% of its 3.05s keyframe ≈ 488ms — that's the app's own established "how long before the next thing arrives" rhythm. `PRACTICE_REVEAL_DELAY_MS` moved from 600 to **480**, matching it directly instead of guessing.
2. **A dev-only debug bar.** `import.meta.env.DEV`-gated (compiled out of production builds entirely), fixed bottom-left, jumps straight to H1 lens / H2 seed / H3 gravity / H4 practice / H4 round 0–8 / H5 — pausing the video at the exact hold timestamp and driving the same state setters the real flow uses (`setStage`, `startHRound`, gravity round reset). Cuts a 20+ step, multi-throttled-ascent walkthrough down to one click. New `debugJump()` helper in `TheDepths.tsx`.

**A real bug found and fixed along the way:** jumping into H4 via the debug bar raced the existing "kick off H4" `useEffect` (which independently schedules `startHRound(-1)` 900ms after `stage` becomes `'hidden'`) — the debug jump's own immediate `startHRound(target)` and the effect's delayed one could both fire, restarting the round out from under itself. Added a `skipHiddenKickoff` ref: `debugJump` sets it right before changing `stage`, the effect checks it and self-cancels once, consuming the flag. This is a debug-tool-only fix (the natural in-app flow only ever reaches `'hidden'` once per journey, so it was never reachable through normal play) — but worth calling out since it's a case where an internal tool caught a real race condition in the app's own effect design.

**Diagnosing intermittent test failures:** while validating the debug bar, a long uncontrolled manual test chain (many jumps and reloads accumulated in one browser tab) once produced content disappearing from H4 mid-round. Added temporary `window.__trace` instrumentation to `startHRound`, `debugJump`, and the kickoff effect, then reproduced the exact suspected sequence (practice → gravity → practice) in one continuous script — trace showed a single clean `startHRound` call each time with the skip-flag consumed correctly, and a full DOM content sample across 1.8s showed nothing wrong. A subsequent full-lifecycle trace from a fresh reload (42 samples across the whole 6.18s round) matched the design exactly: opacity 0 until ~480ms, ignite ramp, held fully visible through the frozen phase and 70% of the cool (scale/glow carry the cooling cue, not opacity), dissolving at ~6150ms. Read as an artifact of that one long, messy manual chain rather than a reproducible bug — instrumentation removed after confirming.

**Rev 6 — three-beat practice intro (Robin, same day):** "the text 'too quick to think' should appear in the middle alone, then a bit later 'catch either one', then you estimate the reading time and only then (or a tiny bit before) have This/That appear." Restructured the practice round's reveal from a single delay into three explicit beats:

1. **Prompt alone.** "Too quick to think — trust the spirit within." fades in by itself — nothing else is present for the first ~900ms.
2. **Hint follows.** `PRACTICE_HINT_DELAY_MS = 900` — "catch either one before it cools — nine will ask something real" starts fading in right as the prompt finishes settling, driven by inline `animationDelay` (moved out of the CSS class, which previously hardcoded `0.6s`, so the JS constant is the single source of truth).
3. **Embers wait for reading time.** Both lines together are 19 words; at ~200 words/min (a standard reading-speed estimate), that's ~5.7s to read (`PRACTICE_READ_MS = 5700`). `PRACTICE_REVEAL_DELAY_MS` is now `PRACTICE_READ_MS - 400` = **5300ms** — the embers ignite in a touch before an average reader would finish, so it feels anticipated rather than lagging.

**Verified** using the new debug bar (jumped straight to H4 practice, no walkthrough needed) with a 40-sample, 6-second trace of all three elements' computed opacity in one continuous script: prompt ramps 0→1 over the first ~900ms while hint and embers stay at 0; hint ramps in from ~1050ms to ~1950ms while embers stay at 0; embers stay at 0 all the way to ~5250ms, then ramp 0→1 by ~5550ms — matching the 5300ms target closely given 150ms sampling granularity. No console errors. This is also the first change verified via the debug bar instead of a full journey walkthrough — dropped verification time from several minutes of throttled ascents to a single jump.

**Rev 7 — layout + timing, same day:** "'Too quick to think' must appear in the middle (vertically) with 'catch either' right underneath, then BOTH move up and the bubbles appear. The timing is right, maybe 1s too long — reduce a bit."

**Layout:** new `.practice-text` wrapper (`TheDepths.tsx` + `index.css`) holds the prompt and hint together as a single centered pair — `position: absolute; top: 42%; transform: translate(-50%, -50%)` — instead of the prompt sitting at its normal `top: 13%`. Real rounds' standalone "Which is more you?" prompt is completely untouched (still renders directly, no wrapper). Inside the wrapper, `.hidden-q`/`.hidden-hint` drop to `position: static` so the flex column (`gap: 12px`) stacks them tightly, prompt above hint.

**Motion:** a new `practiceTextRef` gets a `.lifted` class toggled by `paintDrops` — the same function already driving the embers' scale/glow/opacity every rAF frame — the instant `elapsed >= revealDelay`. `.lifted` moves the wrapper to `top: 13%` (matching where the real-round prompt normally sits) over a 1.1s ease, so the centered pair glides up and out of the way in the same beat the embers ignite in below. One function now drives both halves of the choreography, so they're guaranteed to be in sync — no separate timers to drift apart.

**Timing:** `PRACTICE_REVEAL_DELAY_MS` trimmed from `PRACTICE_READ_MS - 400` to `PRACTICE_READ_MS - 1400` (5300ms → **4300ms**, ~1s earlier), per Robin's empirical read that the 200wpm estimate ran slightly long against how it actually felt.

**Verified:** tsc clean. A 34-sample trace (wrapper `top`, `.lifted` state, and all three opacities, sampled together in one script) showed the wrapper motionless at `top: 396px` through 4200ms while prompt (0→1 by 900ms) then hint (0→1 by ~1950ms) read normally; at 4350ms `.lifted` engages and `top` glides 396→318→209→157→135→126→123px over the following ~750ms while ember opacity climbs 0→0.3→0.88→1 in the same window — confirming the lift and the reveal are genuinely one synchronized motion, not two independent timers that happen to be close. Screenshot of the final (lifted) state confirms a clean composition: prompt+hint at top, both embers reading clearly below. No console errors.

---

### 2026-07-02 — H3 rev 3 · "The Breath" (felt progress per answer, playback untouched)

**Agent:** Freya · **Where:** `dionysus-experience`, `TheDepths.tsx` + `index.css` · **Source:** Robin: "make it so the user moves on a tiny bit every time they answer so they get the feeling of progress"

**The constraint that shaped it:** H3's per-answer video rises were already tried and rejected twice (playbackRate glide, currentTime scrub — both read as lag; see the 06-12 H3 entry). So the Breath moves the *world*, never the *footage*: all motion is GPU compositing on top of the paused frame.

**Built (option 1 of 3 presented; Robin picked 1):**
- **The lean:** each committed answer adds a persistent +0.6% `transform: scale` to the paused video (spring ease 1.15s, origin `50% 38%` so the world predominantly slides down = drifting upward). Five answers accumulate to ≤3%.
- **The bloom:** a warm screen-blended radial (`.grav-breath`) blinks over the frame as each answer lands (~0.58s).
- **Directional pair swap:** the answered pole pair drifts up and away (`gravPairOut` → translateY(-12px)); the next rises from below (`gravPairIn` ← translateY(14px)) — you pass questions as you rise.
- **The exhale:** on the fifth answer the accumulated lean eases back to 1 over 2.4s *while* the real chapter ascent plays (3.1→5.7 at native 1×) — the zoom is absorbed by the footage's own motion, so the chapter rise stays the one unmistakable move (Robin's earlier ruling: chapter change > question change).

**Verified in preview:** scale measured 1.006 → 1.012 → 1.018 → 1.024 across four commits with the video paused at exactly 3.1 throughout (playback never driven); bloom node present on commit; after Q5 the transform returned to exactly 1 at the 5.7 hold and H4 started normally; no console errors; tsc clean.

**Open feel-checks for Robin:** per-answer lean size (0.6%/answer — one constant), bloom strength (0.22 alpha), whether the pair's vertical drift is too much or just right.

---

### 2026-06-12 — H4 · The Hidden Self BUILT ("The Catch")

**Agent:** Freya · **Where:** `dionysus-experience`, `TheDepths.tsx`

**Decision (Robin):** Option A · The Catch. Nine "inner texture" binaries on the frozen bitters hold (5.7s); two dark bitters drops sink and dissolve, each carrying one word; click the one that's more you before it melts. A miss is meaningful — unanswered = the hidden self (absent key in `Answers.texture`), a dotted "secret" progress dot, never a failure. Proceeded with two Freya recommendations Robin didn't override: renamed "Positive – Negative" → **"Half-full – Half-empty"**, and kept all nine binaries.

**Built:** intro card ("Catch the word that feels more like you — before it sinks away") → nine rounds. Each round: two `.bitters-drop`s (dark glossy teardrops with trailing stems, matching the footage's real suspended bitters) sink via an rAF engine (`DROP_FALL = 3.3s`); catch freezes both mid-fall (no CSS-keyframe jump), blooms the chosen into the seed colour with a ripple at the click point, dissolves the other; timeout records the miss as hidden. Progress dots fill with the seed colour (kept) or show dotted (secret). `Answers.texture` added (binary key → caught word). After the ninth, footage rises 5.7→8.2s at native 1× to the resonance hold with a Chapter V stub. Stages `ascend4`/`resonance` and `HiddenStage` added.

**Verified end-to-end:** walked through to H4; round 0 catch of "Sharp" fired the green (Midori seed) ripple + 1 kept dot; uncaught rounds advanced as secrets; sequence rose to exactly 8.2s / Chapter V. Drops read as native to the world.

**Open feel-checks for Robin:** 3.3s fall (forgiving vs snappy); whether contemplative players accumulate too many "secrets"; both tunable via `DROP_FALL`.

**Rev: switched A → B "The Thaw" + removed all chapter cards (Robin, same day).** Robin: "try option B now," and "since we don't write anything for chapter 1,2,3, no need to show chapter 4 and 5 — it must feel smooth as they go from question to question." Reworked the rAF engine: drops no longer fall from offscreen; they hang **frozen and suspended** mid-frame (`FROZEN_MS = 850ms`, sharp, motionless), then **thaw** (`THAW_MS = 2550ms`) — sink (≤20vh), blur (→8px), and fade; the frozen stem dissolves as it detaches. Catch still freezes both, blooms the chosen sharp into the seed colour with a ripple, dissolves the other. Removed the "Chapter IV" intro card (replaced with a one-time subtle hint) and the "Chapter V" stub label (now neutral "to be continued"). Verified via DOM sampling (frozen: filter none, opacity 1 → thaw: blur 7.4px, opacity fading) and a held-frame screenshot; confirmed no "Chapter" text anywhere. **Legibility fix** after the screenshot showed washed-out drops: near-opaque black drop body + stronger gloss/rim, bolder brighter words with a triple-shadow halo. **Test-harness note:** the preview renderer throttles rAF/video when unfocused, so the journey stalls mid-arrival between calls — perfectly-timed screenshots are unreliable from the agent side, but a focused browser (Robin's) runs normally.

---

### 2026-06-12 — H3 · The Gravity BUILT ("The Mote Between Two Storms")

**Agent:** Freya · **Where:** `dionysus-experience`, `TheDepths.tsx`

**Decision (Robin):** Option A — the two clouds of the 3.1s hold take the poles of each polarity; a mote in her seed colour is dragged between them; release commits. Chosen over B (literal stir — murky gesture-to-meaning) and C (timed pull — turns reflection into a reflex test).

**Built:** five rounds on the interlocked-clouds frame — pole labels in Playfair italic over their clouds (first pole on crimson, second on cream), brightening and swelling as the mote nears; side glows (crimson left, ivory right) answer the drag; release-as-commit with seed-colour ripple; labels crossfade between rounds; progress dots fill with her colour; round-1 hint *"drag the glow — let go where it feels true."* `Answers.gravity` record added (0 = first pole). After round five, footage 3.1→5.7s, freezing under the suspended bitters drops — the H4 hold — with a Chapter IV stub.

**Bug found & fixed:** the pole labels' wrapper animates `filter`, which makes it the containing block for its absolute children — they anchored to the viewport top until the wrapper was made full-bleed (`position:absolute; inset:0`).

**Verified end-to-end:** drag feedback live, all five commits stored, freeze at exactly 5.70s. The 5.7s frame's black teardrops overhead are the natural game pieces for H4 · The Sinking Drops.

**Refinement (Robin, same day): answer-as-continuation with a marked part-boundary.** Each gravity release now plays a small footage sliver (`GRAV_ANSWER_STEP = 0.18s`) so every answer feels like the climb continuing rather than a static hold. Crucially the slivers stay small (5 × 0.18 ≈ 0.9s, ending ~4.0s) so the **final ascent into Chapter IV is a visibly bigger move** (~1.8s, up to 5.7s) — the chapter change must not read identically to a single answer. Measured cadence ~10:1 (chapter rise : per-answer nudge). Verified: per-answer deltas ~0.18s, final leap 3.88→5.70s, Chapter IV resolves at exactly 5.70.

**Smoothness experiment — TRIED THEN REVERTED (Robin, same day):** to address per-answer abruptness, replaced the small-step `playUntil` with an eased `scrubTo` tween (0.18s/answer over 1100ms; chapter leap over 2100ms). Robin found it broke the feel ("now it doesn't work anymore") and asked to revert. **Reverted in full** back to the even one-fifth cadence: each answer plays one fifth of the 3.1→5.7s span via native `playUntil` (≈0.52s steps), the fifth answer arrives directly at Chapter IV. `scrubTo` and `GRAV_ANSWER_STEP` removed.

**H3 motion — two experiments, both reverted; LANDED on no per-question rises (Robin, same day).**

Attempt A — eased `glide()` + small steps. Asks were (1) per-question scroll < chapter scroll, (2) kill the "bounce." Diagnosis (instrumented): the bounce was a hard start+stop (native 1× jumps to full speed and halts instantly, no ease). Built `glide(target, then, peak)` shaping `playbackRate` via a smootherstep envelope; `GRAV_STEP = 0.22s` per question, chapter move ~1.7s. Verified the easing and the 8× chapter:question ratio.

**Robin's verdict: the variable/slow `playbackRate` made the background video LAGGY** (slow-mo on ~30fps footage stutters) — "the background video being not laggy is the priority… revert to before where there are no rises for each question, it looked so much better."

**Final (locked):** removed `glide`, `scrubTo`, `GRAV_STEP`. Back to native-1× `playUntil` (freeze on arrival) as the only playback path. **H3 has no per-question camera movement** — the footage holds frozen (paused) on the 3.1s gravity frame through all five polarities; the fifth answer rises to the 5.7s bitters hold at natural 1×. This matches the original journey-map mapping (one hold per question group). Verified: paused at 3.1 across Q1–Q5; chapter transition measured 0.99× to exactly 5.70; Chapter IV resolves. Background video smooth. **Lesson:** never drive the hero footage at slow/variable `playbackRate` — full-speed playback or a true freeze only.

---

### 2026-06-12 — H2 · The Seed BUILT ("The First Drop" — the Color Seed is real)

**Agent:** Freya · **Where:** `dionysus-experience`, continuing inside `TheDepths.tsx`

**Decision (Robin):** Option A, kept simple — 8 fixed drops, no drag-blend — but every colour is a real pour: Campari Red, Aperol Orange, Galliano Gold, Midori Green, Curaçao Blue, Violette Purple, Pamplemousse Pink, Cassis Plum. Also from Robin on H1: the six lens bubbles now drift on desynced currents (static felt dead; frozen ≠ lifeless).

**Built:** seed ring on the 1.5s liqueur-cloud hold — glossy drops drifting in a loose ellipse around *"Which colour is yours?"*; hover whispers the pour's name and breathes the hue into the world (live `color` + `soft-light` blend layers over the footage — the Color Seed strategy working on neutral amber); touch bursts the drop (ripple in its colour), dissolves the rest, deepens the grade permanently, and un-freezes time to the 3.1s interlocked-clouds frame (the H3 Gravity hold) with a Chapter III stub. `Answers.colorName` added alongside `color`/`colorTouched`.

**Verified end-to-end in browser:** freeze at exactly 1.5s and 3.1s; the Curaçao commit turns the crimson/cream clouds plum-noir and moonlit ivory — the same footage, hers. Touch devices commit without the hover preview (acceptable; revisit in mobile pass).

**Rev 2 (same day, Robin's review):** (1) drops redesigned from opaque glossy spheres ("cartoonish") to translucent glass droplets — backdrop-refraction, colour glowing inside, varied sizes — they now belong to the liquid; (2) the committed hue became **a pulse, then a memory**: full bloom (~50%) for two breaths on commit, exhaling over ~2.8s to a 10% whisper so the footage's own cinematography leads the journey; the full hue returns at The Unveiling (the revealed drink wears her colour). Question keeps its H2 position — it's the beat that teaches "answering changes the world." Verified: memory state lands at exactly 0.10/0.07 opacity on the gravity hold, which reads natural again.

---

### 2026-06-12 — H1 · The Threshold BUILT in the app ("The Quiet Depths" on the accepted footage)

**Agent:** Freya · **Where:** `dionysus-experience` (the real build, not a prototype)

**Journey map locked first** (`_progress/brainstorming/journey-map-suspended-pour.md`): the questionnaire maps onto `best_full_video.mp4` — 7 question groups on 7 natural holds (H1 Threshold → H7 Trace), "The Breath" latency pocket at ~11.9s, the untouched 12–15.1s pull-back as The Unveiling. Robin approved H1 fine-design (option A "The Quiet Depths") with two cuts: no duration line, no name preamble — bare input like the old prologue; keep "no right answers — only honest ones."

**What was built:**
- New phase `depths` between `landing` and `quiz`; footage copied to `public/journey.mp4`
- **Descent transition** replaces InkFlood on "Cross the Threshold": hero image scales up + sinks dark (`hero-descend`) under a radial black veil (`descent-veil`, ~1.5s) → opens in the depths
- `components/TheDepths.tsx`: video plays 0→0.6s and freezes (S1 depths hold); canvas field of frozen shimmer-bubbles; two cold-open lines (click to skip); bare name input — each keystroke releases a bubble that rises and freezes; six glassy lens-bubbles ("Who should this cocktail capture?") — hover swells, choosing fizzes the others upward; commit un-freezes time: footage plays 0.6→1.5s and freezes on the liqueur-cloud frame (the H2 Seed hold) with a "Chapter II · The Seed — to be continued" caption
- `types.ts`: `Answers.lens` added; name + lens stored via `onUpdate`
- Verified in browser end-to-end: descent, hold at 0.6s, lines, name, lens, ascent frozen at exactly 1.5s

**Still open on H1:** soundscape unlock on the threshold click (backlog), mobile pass, footage regenerated at production quality (current clip is 1280×720 structural reference).

---

### 2026-06-12 — Full-journey review: THE PIVOT (ink is dead, long live the bar)

**Agent:** Freya · **Source:** Robin's step-by-step walkthrough of the full-journey prototype

**Verdicts kept (the prototype validated these):**
- **Prologue:** keep simple — explain what/how long/concept, start with name for personalization. Text refinable. "It's got to start here."
- **Game-like chapters:** each questionnaire chapter becoming a mini-game is loved — keep this quality
- **Ch III flicks:** speed is right. Upgrade idea: words appear then *gradually fade* — answer before it disappears
- **Ch IV catch-words:** playful selection is right
- **Color Seed:** limited palette = easy selection, good
- **Garnish:** keep simple; "how does it sit in the hand" with line drawings liked
- **Restrictions:** fine, but remove "mezcal smoke" as an option
- **Distillation:** enjoyable, can be better
- **Recipe:** "Preserve" liked, but add **"Share this recipe"** as a first-class action

**Verdicts changed:**
- ❌ **THE INK CONCEPT IS DEAD.** Ink wash / e-ink / suminagashi does not fit "uncovering your inner cocktail." Remove everywhere.
- ❌ Sediment glass (bottom-left progress cup) — remove
- ❌ Color-gradient scene cards — must be *images* (the city, the restless sea…)
- ❌ Ch II glass-swirl stir — not cocktail-related enough; rethink exercise
- ❌ Abstract backgrounds — all to be replaced
- Hero stand-in not needed (real one exists)

**The new north star (to brainstorm):**
- **Background = a pre-made video journey**: a person exploring a bar / a drink being made; each chapter is a different part of the video — you physically move through the scene as you descend
- **Questionnaires float on top** — each one creative, game-like, and *cocktail-related*
- **The Reveal = cinematic unveiling** — the big showcase moment; Robin will supply example outputs
- Open follow-up: prologue background ("the whole reveal at the background, we'll see — we can do better")

**Next:** brainstorm the world-class questionnaire journey on the video-journey premise.

---

### 2026-06-12 — Full-journey prototype built (hero → recipe card)

**Agent:** Freya · **Source:** Robin — "I need the entire webapp to visualise what we're doing, otherwise I can't give good feedback"

**Artifact:** `C-UX-Scenarios/01-celestes-descent/prototypes/celestes-descent-full-journey.html` — single-file playable prototype of the complete descent, built to current best recommendation. Stages: Hero (stand-in with spotlight reveal + side door) → Threshold (rev 3: glimpses + lantern handoff) → Ch I scenes + Color Seed → Ch II stir-to-answer ×4 → Ch III flicks ×4 → Ch IV word shower → Ch V garnish + banishing → Ch VI foam + one true thing → Distillation (Historian fragments) → Overflow Reveal (strata spill + painted name + narrative) → Recipe Card.

**Systems embodied:** InkFlood page turns; Ink Wash Clearing (wash overlay + marbling density decrease per chapter); Sediment Memory glass (bottom-left, one stratum per answer); Color Seed tinting (Ch IV blooms, recipe seal); behavioral signal (flick decisiveness → narrative line); naming engine (tapped word + origin scene → cocktail name, so the name visibly comes from her choices); banishing honored in recipe; "one true thing" alluded to, never echoed.

**Known simplifications (prototype only):** hero is a canvas stand-in, not the real first.png/reveal.png art; ~14 of ~19 questions; no audio; no hold-to-commit/un-stir; no Still Water mode; no lens question; PDF download simulated.

| Scenario | Step | Page | Status | Updated |
(Design Loop Status: full journey at `wireframed` via this prototype)

---

### 2026-06-11 — 1.2 The Threshold: concept pivot (rev 3 — "Glimpses + Lantern Handoff")

**Agent:** Freya · **Source:** Robin's rev 2 review — "the ink might not have been the best design decision for this page"

**Core insight:** what Robin loves about the hero is *revelation by your own hand* (the cursor-spotlight reveal), not ink atmospherics. The prologue must inherit the reveal mechanic; the ink begins only when the descent begins.

**Chosen concept (blend of brainstorm options B + D):**
- The prologue stays in the hero's **dark world** — full continuity
- The dark veil hides **painted glimpses of the six chapters** (color ring & spoon, marbling spirals, cast droplets, falling words, garnished coupe with banished sprig, foam & "one true thing…"), each labeled with kanji numeral + chapter name; her cursor-spotlight reveals them — she previews the journey by exploring, the same gesture as the hero
- Prologue text stays **plainly lit and minimal**: approved heading, ceremony line, name field, "Discover the cocktail within me"
- **The Lantern Handoff** on submit: the spotlight detaches from her cursor, drifts to center, shrinks to a bright drop, and **blooms into the paper world** — where the first ink drop of Chapter I falls. This is the canonical bridge from the dark hero world to the light Ink Wash world.
- Brainstorm options considered: A (text hidden, read by lantern), B (glimpses), C (name lifts the veil), D (lantern handoff), E (plain + ambient reveal). B+D selected.

---

### 2026-06-11 — 1.2 The Threshold: direction synthesis (rev 2)

**Agent:** Freya · **Source:** Robin's review of the first Threshold prototype

- **InkFlood transition kept as-is** — the build's existing blot-cover-recede page turn (`InkFlood.tsx`) beats any new invention; all page turns use it
- **Ink Wash Clearing confirmed as the spine:** Threshold = densest ink state (chapter 0 of 6); each chapter washes a layer away; clean paper by the Reveal. Reconciles with the inversion rule: always black ink on light paper, just densest at the start
- **Layout = the build's Prologue column, simplified:** kicker, Playfair italic heading ("Before the ink stirs, tell us your name."), ceremony body copy (replaces "nineteen questions" line), practical whisper, modest centered input ("Inscribe your name…"), ink button
- **CTA label:** "Discover the cocktail within me" — echoes the hero's promise in her own voice (Robin's choice over "Open Chapter One" / "Begin the descent")
- **Name required** (personalised cocktail creator); name feeds the Storyteller
- "Who approaches the glass?" dropped as the prompt — too big, too complicated

---

### 2026-06-11 — Phase 4 re-scope: The Entrance already exists (built hero)

**Agent:** Freya · **Source:** Robin's review of the 1.1 prototype

**Key realization:** 1.1 The Entrance is already built and loved — the hero page in `dionysus-experience` ("Discover the Spirit Within", silhouette artwork, cursor spotlight that reveals the cocktail within via first.png/reveal.png, "Cross the Threshold" CTA). It is NOT to be redesigned. Status set to `built`.

**The real design frontier:** everything after the "Cross the Threshold" click. First target: **1.2 The Threshold**, reframed as a **prologue** — explains the ritual, lets the user inscribe their name, then begins the descent. Robin tested a beta of the post-threshold flow (Questionnaire/Brewing/Reveal components) and didn't like it; we design this fresh.

**Design direction feedback (applies to all post-threshold pages):**
- **Inverted ink:** light/paper background with BLACK sumi ink on top — not dark canvas with light ink
- **Restrained interactivity:** light play and movement are good, but the ink must not become a drawing toy — atmospheric response, not a doodling canvas
- **Side door approved:** "taste one already poured" bottom-right, discreet — whisper rule confirmed. (Delta: not yet present on the built hero — to add in development.)
- Existing visual language to honor: Playfair Display italic + Inter + Zen Old Mincho, dark theatrical hero with amber/orange accents

**Artifact note:** `1.1-the-entrance/prototypes/the-entrance-prototype.html` is superseded as an entrance concept; retained as a motion/ink-feel reference only.

---

## About This Folder

- **This file** — Single source of truth for project progress
- **agent-experiences/** — Compressed insights from design discussions (dated files)
- **wds-project-outline.yaml** — Project configuration from Phase 0 setup

**Do not modify `wds-project-outline.yaml`** — it is the source of truth for project configuration.
