---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - 'A-Product-Brief/project-brief.md'
  - 'B-Trigger-Map/05-Key-Insights.md'
  - '_progress/brainstorming/brainstorming-session-2026-06-11.md'
  - 'Cocktail_GPT legacy questionnaires (New Revamped Questionnaire.docx, Questionnaire.docx)'
session_topic: 'Questionnaire UX/UI — The Six Descents'
session_goals: 'Transform the legacy 19-question bank into a magic-biased, low-cognitive-load interactive experience consistent with the Ink Wash Clearing motion system, and define the questionnaire interaction architecture before WDS Phase 3 (Scenarios) and Phase 4 (UX Design).'
selected_approach: 'collaborative-critique'
techniques_used: ['Gap Analysis vs. Brief Promises', 'Interaction Genre Mapping', 'Upgrade Clustering with Complexity Triage']
ideas_generated: ['QX #1 — Six Descents structure', 'QX #2 — Stir-to-Answer polarity', 'QX #3 — Word-Droplet Shower', 'QX #4 — Banishing Ritual', 'QX #5 — One True Thing', 'QX #6 — Color Seed adaptivity', 'QX #7 — Behavioral signals to Storyteller', 'QX #8 — Threshold Perspective question', 'QX #9 — Alchemist Margin Notes', 'QX #10 — Ambivalence & Refusal as answers', 'QX #11 — Sediment Memory glass', 'QX #12 — Return-visit ink tint', 'QX #13 — Breath Pacing', 'QX #14 — Dual-Layer Copy Deck', 'QX #15 — Hold-to-Commit / Un-stir physics', 'QX #16 — Still Water mode', 'QX #17 — Answer-Composed Melody (parked)']
context_file: ''
---

> **Historical exploration — reviewed 8 October 2026.** The footage rationale and earlier iterations are preserved. Current intake is the live journey/v3 contract; retired quiz fields, mocktail promises and image tinting are not current requirements. Current direction: [experience specification](../../2026-07-08-experience-master-spec.md).

# Brainstorming Session Results — Questionnaire UX/UI

**Facilitator:** Claude (Brainstorming session with Robin)
**Date:** 2026-06-11

## Session Overview

**Topic:** The questionnaire experience — identified by Robin as the most important part of Dionysus.

**Core tension uncovered:** The legacy question bank (Cocktail_GPT) is essentially the Big Five Inventory plus taste scales — exactly the "too analytical, too clinical" experience the Product Brief says Celeste is fleeing. The brief promises "rapid emotional associations," but no design yet defined what *answering feels like*. This session designed that.

---

## Foundational Decisions (Locked with Robin)

| Decision | Choice | Rationale |
| :--- | :--- | :--- |
| **Question DNA** | Hybrid — disguised rigor, magic wins ties | Big Five polarities and taste scales remain the data backbone for the 132-persona matrix, but every item is reskinned as a sensory gesture. If rigor and magic conflict, magic wins. |
| **Adaptivity** | Light adaptivity | Earlier answers shape the look, tempo, and echoes of later questions. No mid-quiz backend scoring, no branching logic. Deep adaptive testing rejected as overcomplex. |
| **Flow** | One question at a time | Single question on screen; answering stirs the ink and surfaces the next. The 6 strata become *chapters*, not pages. Question count becomes invisible and tunable. |
| **Complexity guardrail** | Nothing may dominate the experience | Upgrades were triaged for technical cost and experiential weight. The Answer-Composed Melody was parked post-launch for this reason. |

---

## The Six Descents — Chapter Architecture

~19 questions experienced as 6 chapters. Each chapter is a density stratum with its own physics, palette, interaction genre, and emotional register. Chapter completion triggers the ink-layer-clearing wash. No counts, no progress bar — the ink level is the only clock.

### Chapter 0 — The Threshold *(before the first descent)*
**[QX #8] Threshold Perspective question.** Resurrected from the legacy questionnaire: *"Who approaches the glass?"* — honest self / dream alter ego / favorite character. The first touch of ink.
- Framing device: the Storyteller agent adjusts narrative voice to the chosen lens.
- Disarming move: permission to play removes self-report anxiety.
- Pure data: the lens itself is an input to the matrix.

### Chapter I — Spirit Base *(heavy, slow, dark)* — 3 questions
Origins. Setting of upbringing, place of attachment — answered by touching painted scenes that bleed open in the wash. One scene per screen, slow and weighty.

**[QX #6] Color Seed.** *"Which color is you?"* — the user dips the bar-spoon into a Suminagashi color ring. The chosen hue tints all subsequent marbling. Personalization begins at question ~3, not at the reveal. This is the light-adaptivity seed.

### Chapter II — Liqueur *(viscous, marbling)* — 4 questions
**[QX #2] Stir-to-Answer.** Core polarities (Self-centered–Caring, Preserver–Disruptor, Realist–Dreamer, Analytical–Intuitive). Two inks enter the glass from opposite sides; the user **stirs toward one**. The marbling ratio is the score. Big Five data, disguised as gesture.

### Chapter III — Bitters *(thin, sharp, fast)* — 4 questions
Remaining polarities (Day–Night, Loner–Social, In control–Out of control, Quiet–Loud) as quick directional flicks — droplets cast left or right. Cadence doubles; this is the momentum chapter.

### Chapter IV — Citrus *(bright, effervescent)* — 3 questions
**[QX #3] Word-Droplet Showers.** ~10 words fall like ink drops per screen ("velvet, thunder, dusk, neon…"); the user taps what resonates; taps bloom, the rest dissolve. Covers style/identity facets and openness items. Three showers, ~15 seconds each — each shower runs as one continuous screen, not separate ceremonies.

### Chapter V — Garnish *(playful, tactile)* — 3 questions
Taste preferences, undisguised but physical:
- Flavor profiles (sweet, bitter, spicy, herbal, citrusy) as ingredients flicked into or away from the glass.
- Short/long and still/carbonated as glassware silhouettes that morph under touch.
- **[QX #4] The Banishing Ritual.** *"What shall never touch your glass?"* — allergies and dietary restrictions crossed out with an ink stroke. Practical data, in-fiction.

### Chapter VI — Foam *(near-silence, stillness)* — 2 questions
Cocktail familiarity as a single quiet gesture, then:
**[QX #5] One True Thing.** *"Tell the alchemist one true thing."* — optional free text rendered in calligraphy as the user types. Skipped by letting the foam settle. The soundscape is nearly gone; this is the held breath before the Overflow Reveal.

---

## Cross-Cutting Mechanics

### The "Seen" Arc (Cluster A — adopted)
- **[QX #9] Alchemist Margin Notes.** Exactly two moments mid-quiz where a single calligraphic line appears during a chapter wash, generated client-side from behavioral heuristics: *"You stir like someone who decides before they doubt."* Restraint rules: never more than two; observational and slightly uncanny, never ingratiating. ⚠️ **Kill-if-not-perfect flag:** if copy testing reads as cheesy, this feature is cut without debate.
- **[QX #10] Ambivalence & Refusal as answers.** Holding the spoon still mid-glass = "both" (a scored midpoint, not a cop-out). Lifting the spoon out of the glass = a respected refusal, available to the Storyteller: *"There is one thing you would not tell me. The rye is for that."*
- **[QX #7] Behavioral signals.** Stir velocity, hesitation, and decisiveness are recorded per answer and passed to the Storyteller agent as structured metadata. The narrative may reference behavior, not just answers — the "screenshot moment."

### The Fingerprint (Cluster B — adopted minus melody)
- **[QX #11] Sediment Memory.** Every answer leaves a permanent trace in the glass — a hue, a swirl, a grain. By Chapter VI the marbled liquid is a one-of-one fingerprint of the session. The Overflow Reveal pours from *this exact liquid*: the cocktail visibly originates from the user's choices, defeating the "pre-programmed outcome" fear at the perceptual level. Rides the existing fluid-sim state; no separate system.
- **[QX #12] Return-visit ink tint.** On a second visit, the opening wash carries a faint tint of the user's last Color Seed (localStorage). Trivial cost, high delight.
- **[QX #17] Answer-Composed Melody — PARKED (post-launch phase).** Each stratum as an instrument; the user unknowingly composes a six-part motif replayed at the reveal. Parked: highest technical cost, and the only upgrade that risks competing with the visual climax.

### Craft Details (Cluster C — adopted)
- **[QX #13] Breath Pacing.** Two seconds of engineered stillness between chapters — ink settles, sound drops out. Rapid chapters only feel fast against stillness.
- **[QX #14] Dual-Layer Copy Deck.** Every question has a poetic surface and a precise polarity underneath: *"When the night thins — do you hold the room, or does the room hold you?"* (scores Loner–Social). The copy deck is a first-class deliverable; no item ships with clinical phrasing. Each entry: surface copy, scored polarity, matrix dimension, interaction genre.
- **[QX #15] Hold-to-Commit / Un-stir.** Answers commit by holding ~600ms (ink darkens to confirm); a backward drag within ~2s un-stirs. No buttons, no confirmation dialogs.
- **[QX #16] Still Water mode.** The reduced-motion / accessibility variant as a *designed* experience: ink becomes slow paper-fade washes, gestures become taps, full keyboard navigability. Honors `prefers-reduced-motion`. Also serves Edward the Evaluator as evidence of engineering conscience.

### Mobile Parity
Every gesture has a touch twin (stir = drag, flick = swipe, tap = tap). Strata viscosity applies identically to touch physics. Hold-to-commit thresholds tuned separately for touch.

---

## Recommended Amendments to the Product Brief

Not yet applied — for Robin's sign-off:

1. **"19 questions across 6 pages" → "~19 questions across 6 chapters (one question on screen at a time)."** The page metaphor no longer matches the one-at-a-time flow; chapter language preserves the density-strata structure while making the count tunable.
2. **Microcopy table additions:** Threshold question ("Who approaches the glass?"), Banishing Ritual ("What shall never touch your glass?"), One True Thing ("Tell the alchemist one true thing").
3. **Key Features addition:** Sediment Memory glass and behavioral-signal storytelling as named features.
4. **Constraints addition:** Still Water mode (reduced-motion variant) as a fixed requirement, not a nice-to-have.

---

## Open Items Carried Forward (from the wider 100x critique)

Flagged during this session but deliberately not designed yet — candidates for the next brainstorms before/while entering WDS Phase 3:

1. **Shareability flywheel.** The trigger map's engine is Celeste *sharing*, but the only output is a PDF. Needs: unique result URLs, Open Graph image of the hand-painted cocktail, share-first result page. Highest-leverage missing feature in the product.
2. **Reveal image strategy.** "Stunning hand-painted visual" — real-time AI generation vs. pre-painted asset library vs. hybrid is undecided, and it shapes cost, latency, and the quality ceiling of the climax.
3. **Latency-as-ritual.** "Zero perceived delay" vs. a 3-agent backend is a contradiction. Candidate fixes: stream answers to the backend after Chapter III so agents pre-compute; make the Distillation screen content-bearing (Historian fragments), not a spinner.
4. **Edward's hidden layer.** A post-reveal "see how your cocktail was distilled" view exposing agent reasoning traces as calligraphic marginalia — the portfolio inside the art piece.
5. **Non-alcoholic variant.** A mocktail rendering of the same archetype — inclusivity and shareability both.
6. **Cocktail naming craft.** The name is the single most-quoted artifact; the Storyteller needs explicit naming guidelines (unique, poetic, never generic-label).

---

## Session Summary

### Key Achievements
- Diagnosed the brief-vs-question-bank contradiction: clinical BFI items cannot ship in a product whose persona flees clinical quizzes.
- Designed the Six Descents: chapter-based questionnaire architecture where each density stratum is an interaction genre, not just a visual layer.
- Locked three foundational decisions: hybrid magic-biased question DNA, light adaptivity, one-question-at-a-time flow.
- Adopted a triaged upgrade set (seen-arc, fingerprint, craft details) with explicit complexity guardrails; parked the melody concept post-launch.
- Defined the Dual-Layer Copy Deck as a first-class deliverable for Phase 4.

### Next Steps
1. **WDS Phase 3 (Scenarios):** Sequence the ~19 questions into the six chapters formally; allocate each legacy item (or its replacement) to a chapter and interaction genre.
2. **Dual-Layer Copy Deck:** Draft surface copy + polarity mapping for every question. Magic-biased rewrite of all BFI items.
3. **Phase 4 (UX Design):** Page specifications per chapter using the WDS template, with Sketches/ per chapter.
4. **Brief amendments:** Apply the four recommended amendments after Robin's sign-off.
5. **Separate brainstorms:** Shareability flywheel and reveal image strategy (open items #1 and #2) before development begins.
