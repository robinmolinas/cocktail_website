> **Superseded pipeline reference — reviewed 8 October 2026.** The active contract is Cocktail_Website_Agent/agent/spec/SPEC.md with ARCHITECTURE-SPINE.md. Preserve this earlier record; its old output shape, missing vetoes and questionnaire assumptions are not build instructions. Current direction: [experience specification](../../../Cocktail_Website_Agent/design-artifacts/2026-07-08-experience-master-spec.md).

# Personality Model — Archetypes, Matrix, Roulette

The proprietary model the Psychologist agent (CAP-2) selects from. **Canonical data:** `../../Brand Personality + Roulette.xlsx` — downstream MUST read this workbook for the actual attributes; this file explains its shape and how to use it.

## Workbook structure

- **Sheet `BRANDING`** — the 12 archetype definitions. Columns per archetype: `Drivers`, `Primary goals`, `Primary fears`, `Personality`, `Audience`, `Visual Style`, `Color Palette`, `Typography`, `Imagery`, `Tone of voice`, `Brand example`.
- **Sheet `PERSONALITY`** — the **132 named personas**, filter range `B3:N135` (132 data rows × 13 attribute columns). Each row is one named character that is a sub-variant ("roulette" result) of a parent archetype, with its own personality description, colour (Pantone), typography, imagery, and tone.

## The 12 archetypes

Creator · Regular Guy (Everyman) · Explorer · Hero · Innocent · Jester · Lover · Magician · Outlaw · Ruler · Sage · Caregiver.

Each carries Drivers / Primary goals / Primary fears, e.g.:
- **Creator** — Drivers: Innovation, Creativity, Imagination · Goal: provide structure & self-expression · Fears: status quo, mediocrity, conformity.
- **Explorer** — Drivers: Freedom, Independence, Bravery · Goal: seek paradise · Fears: entrapment, conformity.
- **Caregiver** — nurturing, protective, service & support · conveys trust, comfort, safety.

(Full attributes live in the workbook.)

## The 12 × 11 = 132 matrix ("roulette")

Each archetype fans out into ~11 named personas. Examples seen in the workbook:
- Caregiver → **The Nurse**
- Creator → **The Minimalist**, **The Surrealist**
- Jester / Outlaw → **The Subverter**, **The Morale Booster**

The Psychologist picks the **archetype** from the user's answers, then the specific **named persona** within it — that second pick is the "roulette." The chosen persona's attributes (colour, tone, imagery, personality) become the brand DNA every downstream agent honors.

## How questionnaire answers feed selection

The quiz is built to surface archetype signal:
- `drivers` options (Freedom, Beauty, Mastery, Pleasure, Recognition, Peace, Knowledge, Belonging, Power, Change, Wonder, Mischief) map onto archetype **Drivers/Goals**.
- `come_to_you_for`, `gravity` axes, and `inner_texture` pairs sharpen which archetype and which named persona fit.
- `colour`, `flavours`, `vessel`, `trace` carry into tone, the drink, and image personalization.

**Selection (locked):** hybrid — deterministic scoring narrows the 132 to a shortlist; the LLM makes the final pick and writes the rationale. "Roulette" = the LLM's choice among close-fitting personas.
