> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../2026-07-08-experience-master-spec.md).

# Product Brief: Dionysus

> The strategic foundation — why this product exists, who it serves, and what success looks like.

**Created:** 2026-06-11
**Author:** Robin (Strategist, Product Owner & Head Designer)
**Agent:** Saga (Strategic Business Analyst)
**Status:** Complete
**Last Updated:** 2026-06-11

---

## Strategic Summary

Dionysus is an interactive art piece disguised as a web application. It guides visitors through a serene, sumi-e ink wash personality quiz that distills their inner self into a deeply personalized cocktail — complete with a calligraphic recipe, a historically-grounded narrative explaining *why* that drink reflects who they are, and a stunning hand-painted visual of the finished cocktail.

This is not a utility. It is a non-commercial, high-fidelity portfolio showcase designed to demonstrate the absolute pinnacle of what is possible when human creative direction partners with AI engineering. There are no commercial KPIs, no revenue targets, and no hard deadlines. The only metric that matters is whether a visitor feels something — whether they stay, admire, and want to share what they found.

The backend orchestrates three specialized AI agents — the Historian, the Mixologist, and the Storyteller — who collaborate to craft a recommendation that is not arbitrary but *meaningful*: rooted in the historical and emotional symbolism of real ingredients, shaped by a proprietary 132-persona archetype matrix, and delivered through a narrative that makes the user feel genuinely seen.

---

## Vision

Create a world-class, serene web application that guides users on a magical journey of self-discovery through a sumi-e and Suminagashi-themed personality quiz, leveraging a collaborative multi-agent AI backend to generate and visually display deeply personalized cocktails representing the user's core personality.

**Key principles:**
- **AI Showcase Ambition:** A premier portfolio piece demonstrating AI-guided design and development at the highest level of craft.
- **Serene, Immersive Aesthetics:** Visuals and transitions draw from Japanese sumi-e ink wash paintings, water marbling (Suminagashi), and Pottermore-style page-turn animations.
- **Agentic Backend:** Multiple specialized AI agents (Historian, Mixologist, Storyteller) operate collaboratively to craft the recipe and a bespoke, heartfelt narrative.
- **Web-First Output with PDF Export:** The cocktail and story are presented dynamically on the website, with the option to download a beautifully formatted PDF recipe card.

---

## Target Users

### Primary: The Curious Esthete & Self-Explorer

A person drawn by the sensory art of mixology and the quiet thrill of personality reflection. They are not seeking utility — they are seeking a moment of sensory curiosity and emotional connection.

**Context:** Visiting the site during personal downtime — a brief, quiet workday break at their desktop, or winding down in bed on their phone in the evening.

**Drivers:**
- Mixology excitement — appreciation for cocktails as creative, exciting art forms
- Self-discovery — desire to see how a cocktail profile reflects who they are, specifically the *why* behind the recommendation

**Frustrations:**
- **Calculated arbitrariness** — quizzes where the outcome feels pre-programmed
- **Cognitive load** — long, wordy questionnaires that require deep logical thinking
- **Lack of narrative depth** — results that output a generic label without explaining why

**How they currently solve this:**
- Buzzfeed-style personality tests (too generic, too childish)
- Myers-Briggs/archetype tests (too analytical, too clinical)
- Standard mixology lists and books (lack personal reflection)

### Secondary: Creative Peers, Leads & Recruiters

Design directors, software engineering leads, and recruiters evaluating Robin's portfolio. They do not need separate portfolio menus — they experience the quiz as a primary user. The world-class quality of the design, animation, and engineering *is* the portfolio showcase.

---

## Core Product Concept

**"Distillation of the Unseen Self" — The Cocktail Within You**

The app operates as an interactive, calligraphic alchemy laboratory. Instead of "building" a recipe from scratch through input selections, the application *uncovers* a complex liquid identity that already exists inside the user's mind, history, and preferences.

### The Journey Structure

1. **Entrance (Concealed Dark Landing):** A quiet, ink-swirling canvas. The user clicks "Discover the cocktail within you" and begins.
2. **Journey (Ink Wash Clearing Quiz):** 19 questions across 6 pages using rapid emotional associations. The cursor acts as a bar spoon, swirling sumi-e ink washes that represent density layers of a drink. Each page answered clears a layer of dark ink, revealing clean watercolor paper beneath.
3. **Climax (Overflow Reveal):** The ink overflows in a splash of watercolor paint. Out of the splash, calligraphy letters render the name of their cocktail, a beautiful hand-painted visual appears, and a narrative details why this recipe fits their personality.

### Implementation Principles

1. **Visual-First Narrative:** The climax is driven by a beautiful visual and a heartfelt story, not just text data.
2. **Subtractive Discovery:** The quiz is an act of clearing away noise (ink) to reveal the self.
3. **Tactile Mixology Metaphors:** Motion is structured around drink preparation physics — shaking, pouring, density, stirring, spilling.
4. **Physical Export Utility:** A clean, print-ready PDF card bridges the digital experience to real-life usage.

### Key Features

- **Interactive Bar Spoon Cursor:** A Canvas fluid simulation that marbles background inks in response to mouse/touch movement.
- **Density-Layered Quiz Transition:** Page-turn mechanics styled as sinking through 6 distinct fluid layers.
- **The Ink Overflow Climax:** An animation of colored inks overflowing from a glass silhouette to paint the results card.
- **Agent Storytelling Engine:** Backend API orchestration where a Historian agent researches drink origins and a Storyteller agent writes the personalized narrative.
- **Print-Ready PDF Recipe Card:** A beautifully formatted, downloadable layout of the cocktail, ingredients, method, and history.

---

## Competitive Landscape

### Current Alternatives

| Alternative | Why Users Stick With It | Where It Falls Short |
| :--- | :--- | :--- |
| **Cocktail Databases** (Mixel, Difford's) | Mass coverage, trusted recipes | Purely utilitarian; no personalization or emotional connection |
| **Human Bartenders** | Direct craft, conversational | Dependent on bartender skill; no deep psychological profiling |
| **Generic Quizzes** (Buzzfeed, MBTI) | Fun, fast, simple | Feels arbitrary; no tangible, real-world outputs |
| **Doing Nothing** | No cognitive load | Misses discovering new flavors or understanding personality through drink craft |

### Our Unfair Advantages

1. **The Alchemical History Moat:** The Historian Agent connects the historical and emotional "baggage" of ingredients directly to the user's psychology. Recommendations are justified by real cocktail history and ingredient symbolism, not random tag-matching.
2. **The 132-Persona Matrix:** A proprietary 12×11 archetype grid ensures high resolution and accuracy. Results feel earned and authentic — not a simple 4-quadrant sorting hat.
3. **Personal Brand Credibility:** Robin's practical passion for mixology (infusions, syrups, techniques) ensures the recommended recipes are technically sound and respected by real-world drink enthusiasts.

### Reality Check

If a generic competitor adds a "quiz" feature, they will map results using basic hardcoded filters. Dionysus remains superior because it is an interactive art piece that treats the result as a calligraphic, narrative mirror. The competitor remains a utility; Dionysus is an emotional experience.

---

## Success Criteria

### 1. Aesthetic & Experience Fidelity (Primary)

- The visual presentation across all three pages must feel like a premium, interactive painting.
- UI rendering must maintain a consistent **60fps** on both desktop and mobile.
- Page transitions and ink clearing animations must resolve in **under 4 seconds**.
- Zero perceived delay or errors during multi-agent recommendation generation.

### 2. User Engagement & Retention (Secondary)

- **Quiz Completion Rate:** >80% for users who click "Begin," indicating that the tactile cursor and gestural transitions successfully offset the fatigue of a 19-question form.
- **Emotional Connection:** Measured by a high rate of PDF recipe card downloads, showing users find the output valuable enough to save.

### 3. Timeline Strategy

- Quality-first sprints. No rushed MVP. Sequential execution of WDS phases (Trigger Mapping → UX Scenarios → Visual Design System → Canvas Fluid Prototypes) with high fidelity at every stage.

---

## Constraints & Design Parameters

### Flexible

- **Timeline & Launch:** Sprints driven by quality milestones. Extra iterations on polish, physics simulations, and prompt tuning as needed.
- **Features:** Backend agent complexity can scale during development.

### Fixed

- **Aesthetic Boundaries:** Calligraphy-led, container-free UI. Sumi-e and Suminagashi visual style is the core constraint. No traditional web form elements (progress bars, numbered steps, card containers).
- **Mobile Audio:** Autoplay restrictions require that the Subtractive Soundscape is enabled only after the first user gesture.
- **Performance Budget:** Fluid physics must run at a consistent 60fps on typical mobile screens.

---

## Platform & Device Strategy

- **Architecture:** Responsive Web Application (React + Vite + TypeScript)
- **Device Priority:** Equal priority responsive design — desktop optimizes for wide calligraphic canvas and mouse-move velocity; mobile optimizes for touch drag/swipe gestures and tap target sizes.
- **Interaction Models:**
  - Mouse-hover and drag physics for the "bar-spoon" cursor (desktop)
  - Touch swipe/drag gesture mapping for mobile liquid stirring
  - User-initiated click to unlock Web Audio API context for the subtractive soundscape
- **Core Technologies:**
  - HTML5 Canvas 2D fluid solver for Suminagashi marbling
  - Web Audio API for decrescendo-to-crescendo soundscape layers
  - Clientside PDF generation (jspdf or similar) for recipe cards

---

## Tone of Voice

**For UI Microcopy & System Messages**

### Tone Attributes

1. **Serene & Immersive:** Calm, minimalist phrasing. Space is left for the visual ink wash and sensory cues to speak.
2. **Evocative & Alchemical:** The user's journey is framed as an alchemical distillation — using mixology terms (distill, stir, preserve, deepen).
3. **Gentle & Guiding:** Poetic, non-demanding instructions that treat the user as a partner in discovery.

### Microcopy Reference

| Context | Copy |
| :--- | :--- |
| Start Quiz CTA | "Discover the cocktail within you" |
| Next Page | "Deepen" |
| Final Submission | "Stir" |
| Loading State | "Distilling your essence..." |
| Validation Error | "Please leave your mark" |
| PDF Download | "Preserve this recipe" |

### Guidelines

**Do:**
- Use single-word or short-phrase labels that evoke the alchemical journey
- Let the visuals carry the emotional weight — keep text sparse
- Use cocktail and mixology metaphors consistently across all interactions

**Don't:**
- Use generic web form language ("Submit," "Next," "Error," "Download")
- Over-explain — the mystery is part of the experience
- Break the serene mood with exclamation marks, urgency, or casual slang

---

## Client & Working Relationship

| Field | Value |
|-------|-------|
| **Client** | Robin (Strategist, Product Owner & Head Designer) |
| **Project Type** | Solo / AI showcase portfolio |
| **Decision Style** | Fast-individual — Robin signs off on all designs and specifications |
| **Engineering Team** | AI Developer Agents (Antigravity & Mimir) |
| **Collaboration Style** | Highly collaborative on product strategy and design; autonomous code execution |
| **Timeline Culture** | Quality-first, no deadline |

---

## What's Next

This Product Brief establishes the strategic foundation. Every design decision downstream traces back to what's documented here.

**Phase 2: Trigger Mapping** — Map the 12×11 archetype matrix to user psychology. Define how quiz answers translate to personas and driving forces. Create the feature impact analysis that connects the questionnaire structure to the product concept.

---

**Status:** Product Brief Complete
**Next Phase:** Trigger Mapping (Phase 2)
**Generated:** 2026-06-11
