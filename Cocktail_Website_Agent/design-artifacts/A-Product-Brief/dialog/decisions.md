# Key Decisions Log

**Project:** Dionysus
**Format:** Append-only decision log

---

## Decision 1: Project Location and Structure

**Date:** 2026-06-11
**Step:** Phase 0 - Project Setup
**Session:** 1

**Context:**
The initial project setup placed files at the root of the workspace directory. The client requested that everything related to this project live inside the specific project folder: `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent`.

**What was decided:**
The WDS folder structure was relocated under `Cocktail_Website_Agent/design-artifacts`. Custom overrides were added to `_bmad/custom/config.toml` to tell the BMad system where to look for WDS files.

**Why:**
To keep the workspace clean and maintain all design and code files inside the repository for the `Cocktail_Website_Agent` project.

**Impact:**
All subsequent phase templates and design logs will be created and modified inside the subdirectory.

**Alternatives considered:**
- Workspace root `design-artifacts` — Rejected to maintain project repository self-containment.

**Documented in:** `_bmad/custom/config.toml`, `wds-project-outline.yaml`

---

## Decision 2: Client Profile & Scope

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 1a: Client Profile)
**Session:** 1

**Context:**
To tailor our design specifications and timeline, we need to understand the client's organization structure, tech capabilities, and internal drivers.

**What was decided:**
Dionysus is scoped as a solo personal/portfolio project for Robin (acting as Strategist, Product Owner, and Head Designer). AI agents are the sole engineering team. There is no hard deadline; the project will follow a quality-first approach to create a world-class, award-winning experience.

**Why:**
The project is intended as a showcase of high-end, AI-partnered design and development experiences, rather than a commercial product with strict time-to-market constraints.

**Impact:**
We can spend additional time on high-fidelity designs, animations, and transitions (e.g., Suminagashi aesthetics, Pottermore-style page turns) to ensure visual and experiential excellence.

**Documented in:** `dialog/client-profile.md`

---

## Decision 3: Unified Quiz Motion Design System (Option A Base)

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 4: Concept / Brainstorming)
**Session:** 1

**Context:**
The standard progress indicators (filling glasses, loading bars) were rejected to create a premium, immersive self-discovery journey. We needed a progress metaphor that represents "the cocktail within you" while leveraging Japanese Suminagashi/Sumi-e aesthetics.

**What was decided:**
We selected **Option A: The Ink Wash Clearing** as the core progress metaphor and expanded it using SCAMPER refinement into a unified system:
- **Metaphor:** Subtracting dark sumi ink washes page-by-page to uncover a clean watercolor paper background.
- **Glass Silhouette:** A central translucent glass silhouette glows and fills with vibrant marbled colors (Theme 1: Canvas).
- **Physical Density Strata:** The 6 quiz pages represent specific layers (spirit base, liqueur, bitters, citrus, garnish, foam) with custom fluid animations (Theme 2: Strata).
- **Tactile Cursor Stirring:** The cursor acts as a bar spoon, swirling ink marbling in real-time and triggering transition whirlpools (Theme 2: Stirring).
- **Sensory climax:** The final screen overflows with colors that paint the recommendations and recipe in calligraphy, accompanied by an auditory decrescendo-to-crescendo (Theme 3: Climax).
- **Minimal UI:** Traditional web form elements (numbers, cards, containers, progress bars) are eliminated.

**Why:**
Directly supports the client's vision of an artistic, calming portfolio piece that feels like a premium interactive painting rather than a web questionnaire.

**Impact:**
Shapes Phase 2 Trigger Mapping (connecting answers to density layers), Phase 3 UX Scenarios, and the Phase 5 engineering prototypes (2D Canvas fluid solvers).

**Documented in:** `_progress/brainstorming/brainstorming-session-2026-06-11.md`

---

## Decision 4: Success Metrics & Experience Quality Standards

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 8: Define Success Criteria)
**Session:** 1

**Context:**
As a high-fidelity portfolio piece, Dionysus has no commercial or financial KPIs. We needed to define aesthetic, engagement, and timeline success parameters.

**What was decided:**
- **Experience Quality:** The site must feel like an interactive art piece. Performance is set at a strict **60fps** target. Quiz transitions must run in **under 4 seconds** (Pottermore benchmark).
- **Engagement Goal:** The 19-question quiz must achieve a **>80% completion rate**, using fluid dynamics and gamification (tactile bar-spoon cursor) to prevent drop-off.
- **Output Success:** Measured by emotional resonance (visual beauty + agent-written storytelling) and utility (high PDF download rates).
- **Timeline:** Continuous high-quality sprint milestones over a rushed MVP.

**Why:**
Ensures our design implementation prioritizes high-performance interactive physics and visual craft.

**Impact:**
Sets the quality bar for animation optimization and responsive mobile testing.

**Documented in:** `dialog/08-metrics.md`

---

## Decision 5: Competitive Positioning & Moats (Alchemical History)

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 9: Analyze Competitive Landscape)
**Session:** 1

**Context:**
We needed to define what prevents Dionysus from feeling like a generic tag-based drink recommender, and what constitutes its "unfair advantage."

**What was decided:**
We identified three main strategic moats:
1. **The Alchemical History Moat (AI Agent Archetype):** Recommendations are justified by the emotional and historical "baggage" of ingredients. The Historian agent explains *why* the classic drink or ingredient history mirrors the user's psychology, making the connection meaningful rather than arbitrary.
2. **The Bespoke Matrix Moat:** A custom-designed 12x11 archetype matrix mapping to 132 unique personalities.
3. **Personal Brand Moat:** Built around Robin's home craft-mixology expertise, ensuring the recipes themselves are technically credible and respected.

**Why:**
Differentiates the app from utility database indexes and standard MBTI quizzes, elevating it to a high-fidelity visual and narrative experience.

**Impact:**
Instructs the prompt design for the backend AI agents (specifically the Historian agent) to focus on historical meaning and emotional symbolism of ingredients, rather than just raw recipe matching.

**Documented in:** `dialog/09-competitive-landscape.md`

---

## Decision 6: Platform & Device Strategy

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 10A: Define Platform & Device Strategy)
**Session:** 1

**Context:**
We needed to determine the target devices, primary technical capabilities, and interaction models to guide visual design and frontend engineering.

**What was decided:**
- **Architecture:** Responsive Web Application (React + Vite + TypeScript).
- **Device Priority:** Equal priority desktop/mobile responsiveness. Desktop optimizes for wide calligraphic canvas and mouse-move velocity; mobile optimizes for touch drag/swipe gestures and tap target sizes.
- **Interaction Models:** 
  - Mouse hover and drag physics for the "bar-spoon" cursor.
  - Touch swipe/drag gesture mapping for mobile liquid stirring.
  - User-initiated click (e.g., "Begin Your Journey") to unlock Web Audio API context for the subtractive soundscape.
- **Core Technology Choices:** HTML5 Canvas/WebGL for fluid Suminagashi marbling, Web Audio API for decrescendo-to-crescendo audio, and clientside PDF generation (`jspdf` or similar) for recipe cards.

**Why:**
Directly supports our goals of a high-fidelity visual experience that runs smoothly at 60fps and remains fully accessible to portfolio reviewers on both office monitors and mobile phones.

**Impact:**
Shapes the visual layout specs in Phase 4 and the Canvas rendering optimizations in Phase 5.

**Documented in:** `_progress/wds-project-outline.yaml`

---

## Decision 7: Tone of Voice & Microcopy Decisions

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 11: Tone of Voice)
**Session:** 1

**Context:**
We needed to define a consistent, alchemical, and serene Tone of Voice for all UI microcopy, ensuring button labels, error handling, loading screens, and save functions match the premium sumi-e and Suminagashi artistic style.

**What was decided:**
- **Attributes:** Serene & Immersive, Evocative & Alchemical, Gentle & Guiding.
- **Start Quiz CTA:** "Discover the cocktail within you"
- **Next Page / Next Question:** "Deepen" (selected over "Descend" to prioritize a warm, introspective psychological journey over a dark or heavy transition).
- **Final Submission CTA:** "Stir"
- **Loading State:** "Distilling your essence..."
- **Validation / Field Error:** "Please leave your mark" (connecting back to sumi-e calligraphy).
- **PDF Download / Save CTA:** "Preserve this recipe" (selected over "Keep the record" or "Take this home" to match the mixology theme and calligraphic preservation).

**Why:**
Ensures all interactive elements feel integrated into the alchemical metaphor and support the feeling of a self-discovery artwork rather than a standard commercial web app questionnaire.

**Impact:**
Directly dictates the copy to be used in UI specification and React frontend component implementation.

**Documented in:** `dialog/11-tone-of-voice.md`, `wds-project-outline.yaml`

---

## Decision 8: Product Brief Synthesis (Step 12)

**Date:** 2026-06-11
**Step:** Phase 1 - Product Brief (Step 12: Create Product Brief)
**Session:** 1

**Context:**
All strategic discovery steps (Vision, Users, Concept, Metrics, Competitive Landscape, Constraints, Platform Strategy, Tone of Voice) were completed. We needed to synthesize everything into a single, coherent Product Brief document to serve as the North Star for all downstream design and development phases.

**What was decided:**
- Strategic narrative was presented to the user for confirmation before document generation.
- User confirmed the narrative was accurate and complete.
- The full Product Brief was compiled at `A-Product-Brief/project-brief.md`.

**Final narrative presented:** Yes — confirmed without adjustments.

**Adjustments during synthesis:** None required. User asked about phase sequencing (when questionnaire details and agent architecture are designed), which was clarified as Phase 2 (Trigger Mapping) and Phase 3 (UX Scenarios).

**User confirmation:** Confirmed.

**Brief generated:** `design-artifacts/A-Product-Brief/project-brief.md`

**Completion:** 2026-06-11


