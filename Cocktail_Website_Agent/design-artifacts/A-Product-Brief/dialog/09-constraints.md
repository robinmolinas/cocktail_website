> **Discovery history — reviewed 8 October 2026.** This records the original June discussion; completed discovery is preserved. Retired ink-quiz details and older constraints do not override later decisions. Current direction: [experience specification](../../2026-07-08-experience-master-spec.md).

# Step 10: Capture Constraints

**Completed:** 2026-06-11
**Session:** 1

---

## Opening Outline

**Agent proposed:**
Constraints framed positively as design parameters, detailing:
- **Timeline & Budget (Flexible):** Quality-first portfolio showcase, no commercial deadlines.
- **Tech Stack (Fixed):** React/Vite template, mobile audio limitations (requiring user click to initiate Web Audio), and fluid physics optimization for mobile 60fps.
- **Brand & Content (Fixed):** Japanese sumi-e and Suminagashi themes, calligraphic UI, and 12x11 archetype matrix boundaries.

**User's response:**
Robin requested to skip further discussion and proceed, confirming the parameters.

---

## Design Parameters Summary

### 1. Flexible Parameters
- **Timeline & Launch:** Sprints are driven by quality milestones. We can spend extra iterations on polish, physics simulations, and prompt tuning.
- **Features:** Backend agent complexity can scale as needed during development.

### 2. Fixed Parameters
- **Aesthetic Boundaries:** Calligraphy-led, container-free UI. Sumi-e and Suminagashi visual style is the core constraint.
- **Mobile Audio:** Autoplay restrictions require that the **Subtractive Soundscape** is enabled only after the first user gesture (e.g., clicking "Begin Your Journey").
- **Performance Budget:** Fluid physics must be optimized to run at a consistent 60fps on typical mobile screens at night.

---

**Documented in:** `wds-project-outline.yaml` → `constraints`
