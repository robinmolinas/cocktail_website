> **Discovery history — reviewed 8 October 2026.** This records the original June discussion; completed discovery is preserved. Retired ink-quiz details and older constraints do not override later decisions. Current direction: [experience specification](../../2026-07-08-experience-master-spec.md).

# Step 3: User Definition

**Completed:** 2026-06-11
**Session:** 1

---

## Opening Question

**Agent asked:**
To build our target user profiles for Dionysus, we want to look past basic demographics and focus on the behaviors, goals, and contexts of the people visiting the site... Who do you see as the primary user we are designing for? What are they trying to achieve or feel? What are their biggest frustrations with typical personality quizzes or portfolio showcases today?

**User's initial response:**
The primary user is someone curious to discover their "inner cocktail." This stems from two forms of curiosity:
1. **Mixology Excitement:** An appreciation for cocktails as creative, exciting art forms—varying in shape, color, ice physics, and preparation methodologies.
2. **Self-Discovery:** A desire to see how a cocktail profile reflects who they are, specifically focusing on the *why* (e.g., the story crafted by the Mixologist and Historian agents explaining what was learned from their quiz answers).

Their primary frustrations with existing quizzes are that they feel generic, arbitrary, or take too long. They prefer the Pottermore-style approach of making fast, emotional, and intuitive choices rather than logical/calculated ones.

---

## User Exploration

### Primary User Discovery

**Key exchanges:**

**Agent:**
Since this is a portfolio/showcase project, how much should we design for creative peers, leads, or recruiters? Are they secondary users who need to quickly see the tech/design highlights, or should they just experience the quiz themselves? And where/when do you imagine people taking this quiz?

**User:**
Recruiters, creative peers, and leads will experience the site primarily by stepping into the shoes of the primary user. We don't design specialized UI for them; instead, the world-class quality of the design and engineering speaks directly to their professional standards. 
In terms of usage context, they will take the quiz on a desktop (either during a workday break or at night) or on a mobile device at night while relaxing. High mobile-responsiveness is critical.

---

## Reflection Checkpoint

**Agent's synthesis:**
The target audience of Dionysus isn't seeking standard utility or logical calculation; they are seeking a moment of sensory curiosity and emotional connection. They want a fast, magical experience that feels deeply personalized and gives them a meaningful explanation of their results. The design itself (world-class visuals, motion, and audio) acts as the proof-of-work that satisfies professional portfolio viewers.

**User response:**
- [x] Confirmed
- [ ] Corrected

---

## Primary User Definition

**Who they are:**
The **Curious Esthete & Self-Explorer**. A person intrigued by the sensory and visual art of mixology who enjoys personalized narratives and symbolic representations of their personality.

**Their context:**
Visiting the site during personal downtime—either a brief, quiet workday break at their desktop or winding down in bed on their mobile phone in the evening.

**Their frustrations:**
- **Calculated Arbitrariness:** Quizzes where the math feels obvious (e.g., "Answer A = Extrovert") and the outcome feels pre-programmed.
- **Cognitive Load:** Long, wordy questionnaires that require deep logical thinking, dragging down the magical/mystical mood.
- **Lack of Narrative Depth:** Results that just output a generic label without explaining *why* the combination of their traits yielded this specific cocktail.

**What they're trying to achieve:**
To experience a brief, relaxing, and visually stunning escape that rewards them with a deeply personalized, calligraphic cocktail recipe and a rich, agent-generated narrative explaining how their personality is distilled into that drink.

**How they currently solve this:**
- Buzzfeed-style personality tests (often too generic/childish).
- Myers-Briggs/Archetype tests (often too analytical and clinical).
- Standard mixology lists/books (lack personal reflection).

---

## Secondary Users

**User 2: Creative Peers, Leads, & Recruiters**
- **Description:** Design directors and software engineering leads evaluating Robin's portfolio.
- **Needs:** They do not need separate portfolio menus; they want to experience the quiz as a primary user but will judge the micro-interactions, canvas performance, loading transitions, and typography choices.

---

## User Scenarios Captured

**Scenario 1: The Workday Desktop Break**
A design lead clicks a link to Dionysus from Robin's resume during a quick workday break. Sitting at their dual-monitor setup, they expect a premium desktop experience. They put their headphones on, choose fast emotional word pairings in a gorgeous calligraphic UI, drag sliders that stir virtual sumi-e ink, and are rewarded with an animated, overflowing liquid reveal that prints a custom cocktail card.

**Scenario 2: The Evening Mobile Wind-Down**
A casual visitor opens the link on their iPhone in bed. The interface scales perfectly, text target taps are highly responsive, and page navigation works via fluid swipe/drag transitions representing vertical liquid density. The subtractive soundscape gently calms them, ending in a clean calligraphy reveal that they can download as a beautiful PDF to try at a bar.

---

**Documented in:** `wds-project-outline.yaml` → `users`
