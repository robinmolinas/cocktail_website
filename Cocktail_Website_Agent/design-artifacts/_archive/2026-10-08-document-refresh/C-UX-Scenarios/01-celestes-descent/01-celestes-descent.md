> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../../2026-07-08-experience-master-spec.md).

---
design_intent: S
design_status: not-started
---

# 01: Celeste's Descent

**Project:** Dionysus
**Created:** 2026-06-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Discover the cocktail within her — surrender to the full six-chapter ritual and take home the artifact that proves it was real.

---

## Business Goal (Q2)

**Goal:** Engagement proof of the portfolio vision — the experience must be compelling enough to carry a visitor through all six chapters and make the output worth preserving.
**Objective:** >80% quiz completion rate, >40% PDF recipe downloads (Trigger Map: Portfolio Objectives). Every other goal (Edward's validation, the sharing flywheel) depends on this transaction succeeding.

---

## User & Situation (Q3)

**Persona:** Celeste the Curious (Primary)
**Situation:** Celeste, 28, senior brand designer at a boutique studio. A quiet mid-afternoon lull at her desk; headphones already on from a focus session; aesthetically fatigued after a day of reviewing boxy, conversion-driven layouts.

---

## Driving Forces (Q4)

**Hope:** A moment of genuine magic — a drink that *is* her, justified so beautifully she feels seen.

**Worry:** Nineteen questions of clinical checkboxes ending in a generic "You're a Margarita!" with AI-flavored platitudes.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop — the bar-spoon cursor is the signature instrument, and this is her workday-break context. Mobile parity is documented per-page and stress-tested in Scenario 03 (Edward's Audit), not in this sunshine path.
**Entry:** A fellow designer drops the link in their studio's inspiration Slack channel: *"okay this is the most beautiful thing I've seen this year."* She clicks it between tasks, expecting to give it thirty seconds.

---

## Best Outcome (Q7)

**User Success:**
Completes the ritual in ~4 unhurried minutes, reads a narrative that names something true about her, downloads the recipe card, and plans to mix the drink this weekend.

**Business Success:**
One full completion + one PDF download logged toward the 80%/40% targets — and she reposts the link, turning the flywheel.

---

## Shortest Path (Q8)

1. **The Entrance** — Ink marbles under her first cursor movement; she clicks "Discover the cocktail within you"; the soundscape wakes
2. **The Threshold** — Chooses who approaches the glass: her honest self
3. **Chapter I — Spirit Base** — Touches the painted scene of her origins; dips the spoon to choose her color, which tints everything after
4. **Chapter II — Liqueur** — Stirs four polarities; the marbling ratio records each answer
5. **Chapter III — Bitters** — Casts quick directional droplets; momentum builds
6. **Chapter IV — Citrus** — Taps resonant words as they fall; they bloom into the wash
7. **Chapter V — Garnish** — Flicks flavors into the glass; crosses out what shall never touch it
8. **Chapter VI — Foam** — Near-silence; she types one true thing to the alchemist
9. **The Distillation** — "Distilling your essence..." — the agents work behind breathing ink
10. **The Overflow Reveal** — Her sediment liquid overflows; the name paints itself letter-by-letter; she reads the narrative and feels *seen* ✓
11. **The Recipe Card** — "Preserve this recipe" — the PDF lands in her downloads ✓

---

## Trigger Map Connections

**Persona:** Celeste the Curious (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** The thrill of alchemical connection — a recommendation justified through history and ingredient symbolism that makes her feel genuinely understood
- ✅ **Want:** Immersive visual & tactile play — her movements physically shape the interface
- ✅ **Want:** A beautiful digital artifact — the calligraphic PDF recipe card
- ❌ **Fear:** The "Buzzfeed quiz" disillusionment — defeated by the 132-persona matrix and the Sediment Memory glass (the result visibly originates from her choices)
- ❌ **Fear:** Form-field friction & clinical layouts — defeated by the chrome-free, gesture-based Six Descents
- ❌ **Fear:** Repetitive AI platitudes — defeated by the Storyteller's constrained poetic narrative grounded in Historian research

**Business Goal:** Portfolio vision — >80% completion, >40% PDF downloads

---

## Design Inputs

- **Questionnaire architecture:** `_progress/brainstorming/brainstorming-session-2026-06-11-questionnaire-ux.md` (The Six Descents — chapter genres, Sediment Memory, behavioral signals, breath pacing, Still Water mode)
- **Motion system:** `_progress/brainstorming/brainstorming-session-2026-06-11.md` (Ink Wash Clearing, bar-spoon cursor, Overflow Reveal, Subtractive Soundscape)
- **Abandonment rule:** Fresh start, always — a ritual interrupted is a ritual restarted. Only the Color Seed tint persists across visits (localStorage).

---

## Scenario Steps

Steps are outlined one at a time after scenario creation. The first step is processed automatically.

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 1.1 | `1.1-the-entrance/` | ✅ BUILT — existing hero ("Spirit Within", spotlight reveal); not redesigned | Clicks "Cross the Threshold" |
| 1.2 | `1.2-the-threshold/` | Prologue — explain the ritual without deflating it; she inscribes her name | Begins Chapter I — Spirit Base |
| 1.3 | `1.3-chapter-i-spirit-base/` | _To be outlined_ | _To be outlined_ |
| 1.4 | `1.4-chapter-ii-liqueur/` | _To be outlined_ | _To be outlined_ |
| 1.5 | `1.5-chapter-iii-bitters/` | _To be outlined_ | _To be outlined_ |
| 1.6 | `1.6-chapter-iv-citrus/` | _To be outlined_ | _To be outlined_ |
| 1.7 | `1.7-chapter-v-garnish/` | _To be outlined_ | _To be outlined_ |
| 1.8 | `1.8-chapter-vi-foam/` | _To be outlined_ | _To be outlined_ |
| 1.9 | `1.9-the-distillation/` | _To be outlined_ | _To be outlined_ |
| 1.10 | `1.10-the-overflow-reveal/` | ✍️ SPECIFIED as **The Surfacing** (beats 1–4: drop → splash → bloom → persona-image unveiling); supersedes the Overflow Reveal concept | Her gesture ("read your story") opens the keepsake |
| 1.11 | `1.11-the-recipe-card/` | ✍️ SPECIFIED as **The Surfacing** beat 5 (in-world keepsake, image right / text left; PDF via print CSS — no separate page) | _Final — scenario success_ ✓ |

> **Note 2026-07-07:** steps 1.3–1.9 were realized in-build as the "Suspended Pour" journey (H1–H8 in `TheDepths.tsx` — see `_progress/00-design-log.md`), and 1.10–1.11 are specced against that build in `design-artifacts/2026-07-07-the-surfacing-reveal-design.md`.

**First step** (1.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within each page spec.
