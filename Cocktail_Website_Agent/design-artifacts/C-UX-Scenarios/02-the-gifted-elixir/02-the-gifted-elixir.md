---
design_intent: D
design_status: not-started
---

# 02: The Gifted Elixir (Danielle Receives)

**Project:** Dionysus
**Created:** 2026-06-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Receive a friend's elixir, feel the intimacy of seeing them *seen* — and cross the threshold into her own descent.

---

## Business Goal (Q2)

**Goal:** The organic-visibility flywheel — delighted users bring the next visitor at zero cost.
**Objective:** This is the conversion edge of the whole loop: share → arrival → begin. (Trigger Map: flywheel — Celeste's sharing drives organic visibility for the portfolio.)

---

## User & Situation (Q3)

**Persona:** Danielle — "the next Celeste." A creative peer in Celeste's group chat, one shared link behind. (No new psychology invented: Danielle is the Celeste archetype at the pre-Dionysus stage.)
**Situation:** Evening, on the sofa, half-watching something, phone in hand.

---

## Driving Forces (Q4)

**Hope:** A glimpse into her friend's inner self — and the itch of *"what would mine be?"*

**Worry:** Another quiz-spam time sink; and quietly — that her result won't be as beautiful as Celeste's.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile — links from messaging apps are opened on phones. (Deliberate contrast: Scenario 01 covers desktop; this scenario covers the mobile arrival.)
**Entry:** An iMessage from Celeste: the link unfurls into a hand-painted cocktail with a calligraphic name, captioned *"this is so me it's scary."* Danielle taps it during the ad break.

---

## Best Outcome (Q7)

**User Success:**
Thirty seconds of genuine admiration — Celeste's painting, her cocktail's name, one resonant line of her narrative — then taps the invitation and begins her own ritual.

**Business Success:**
A measured share→start conversion: one new visitor acquired at zero cost, the flywheel's second turn made observable.

---

## Shortest Path (Q8)

1. **The Shared Elixir** — Opens the link; a condensed overflow animation blooms Celeste's painting into view with her cocktail's name in calligraphy and her narrative; below, a quiet invitation: *"Discover the cocktail within you"*
2. **→ The Entrance** — Taps the invitation; the ink swallows the screen and she lands at the start of her own descent (handoff into Scenario 01) ✓

---

## Trigger Map Connections

**Persona:** Danielle ("the next Celeste" — Celeste archetype, pre-Dionysus stage)

**Driving Forces Addressed:**
- ✅ **Want:** The thrill of alchemical connection — witnessed secondhand through a friend's result, sparking her own curiosity
- ❌ **Fear:** Quiz-spam disillusionment — defeated by arriving at a work of art instead of a landing page with a signup form

**Business Goal:** Organic visibility flywheel — zero-cost visitor acquisition via shared results

---

## Design Resolution (decided 2026-06-11)

**The Shared Elixir is NOT a separate view.** It is the **Overflow Reveal view (1.10) in guest-arrival state** — same implementation, different entry choreography:

1. **The miniature overflow.** Celeste earned her reveal through six chapters; Danielle arrives cold. The shared view replays a condensed overflow on load — ~2 seconds of ink blooming into the painting, the name brushing itself in. Same component as 1.10's climax, shortened choreography.
2. **The recipe is a gift.** "Preserve this recipe" remains available to guests — Danielle can make Celeste's cocktail for her. Same view, no fork.
3. **Privacy constraint (Storyteller).** The narrative must never echo the "one true thing" free-text verbatim — allusion only. This makes the full narrative safe to share. Prompt constraint, not a view fork.
4. **CTA prominence.** In guest-arrival state, "Discover the cocktail within you" is the primary action; in owner state, "Preserve this recipe" leads.

**Architectural consequence (new scope vs. Product Brief):** results must persist server-side with unique shareable URLs (e.g., `/elixir/the-midnight-cartographer`) and per-result Open Graph images. The brief currently assumes no persistence — this is deliberate added scope, strengthening Edward's architecture-validation story.

**Open dependency:** Detailed mechanics (URL scheme, OG image generation, what renders before JS loads) await the shareability brainstorm flagged in `_progress/brainstorming/brainstorming-session-2026-06-11-questionnaire-ux.md` (Open Item #1).

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 2.1 | `2.1-the-shared-elixir/` | Convert a friend's gift into her own curiosity | Taps "Discover the cocktail within you" → handoff to 1.1 The Entrance ✓ |

**First step** (2.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within the page spec.
