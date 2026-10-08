> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../2026-07-08-experience-master-spec.md).

# UX Scenarios: Dionysus

> Scenario outlines connecting Trigger Map personas to concrete user journeys

**Created:** 2026-06-11
**Author:** Robin with Claude (UX Scenario Facilitator)
**Method:** Whiteport Design Studio (WDS)

---

## Scenario Summary

| ID | Scenario | Persona | Pages | Priority | Status |
|----|----------|---------|-------|----------|--------|
| 01 | Celeste's Descent | Celeste the Curious (Primary) | 11 | ⭐ P1 | ✅ Outlined |
| 02 | The Gifted Elixir | Danielle ("the next Celeste") | 1 | P2 | ✅ Outlined |
| 03 | Edward's Audit | Edward the Evaluator (Secondary) | 1 (+ annotations) | P2 | ✅ Outlined |

---

## Scenarios

### [01: Celeste's Descent](01-celestes-descent/01-celestes-descent.md)
**Persona:** Celeste the Curious — the thrill of alchemical connection (feeling genuinely seen)
**Pages:** The Entrance, The Threshold, Chapter I — Spirit Base, Chapter II — Liqueur, Chapter III — Bitters, Chapter IV — Citrus, Chapter V — Garnish, Chapter VI — Foam, The Distillation, The Overflow Reveal, The Recipe Card (PDF)
**User Value:** A serene, magical ritual of self-discovery ending in a beautiful, personally meaningful recipe artifact
**Business Value:** >80% completion and >40% PDF download targets proven; a delighted advocate created

---

### [02: The Gifted Elixir](02-the-gifted-elixir/02-the-gifted-elixir.md)
**Persona:** Danielle — "the next Celeste," one shared link behind
**Pages:** The Shared Elixir (= the Overflow Reveal in guest-arrival state — no separate build)
**User Value:** Thirty seconds of genuine admiration of a friend's elixir, then a personal invitation to discover her own
**Business Value:** Zero-cost visitor acquisition; the flywheel's second turn made observable

---

### [03: Edward's Audit](03-edwards-audit/03-edwards-audit.md)
**Persona:** Edward the Evaluator — flawless creative engineering under a 3–5 minute attention budget
**Pages:** The Resilience States (cross-cutting); audit beats annotate Scenario 01/02 pages via "Edward lens" acceptance criteria in Phase 4
**User Value:** Confidence he has found a creative engineer, not a template assembler
**Business Value:** The hiring recommendation — the portfolio's ultimate success metric

---

## Page Coverage Matrix

| Page | Scenario | Purpose in Flow |
|------|----------|----------------|
| 1.1 The Entrance | 01 | Arrest attention; promise magic; CTA click unlocks audio. Side door: "taste one already poured" → Poured Elixir exemplar |
| 1.2 The Threshold | 01 | "Who approaches the glass?" — perspective lens chosen with the first touch of ink |
| 1.3 Chapter I — Spirit Base | 01 | Origins via painted scenes; the Color Seed tints the whole journey |
| 1.4 Chapter II — Liqueur | 01 | Stir-to-answer polarities; marbling ratio as score |
| 1.5 Chapter III — Bitters | 01 | Rapid directional flicks; the momentum chapter |
| 1.6 Chapter IV — Citrus | 01 | Word-droplet showers; tap-to-bloom associations |
| 1.7 Chapter V — Garnish | 01 | Flavor flicks, glassware morphing, the Banishing Ritual (allergies) |
| 1.8 Chapter VI — Foam | 01 | Near-silence; "Tell the alchemist one true thing" |
| 1.9 The Distillation | 01 | Agents work behind breathing ink; latency as ritual |
| 1.10 The Overflow Reveal | 01 | Sediment liquid overflows; calligraphic name; narrative — the "seen" moment |
| 1.11 The Recipe Card (PDF) | 01 | "Preserve this recipe" — the artifact downloads |
| 2.1 The Shared Elixir | 02 | Guest-arrival state of 1.10: miniature overflow, recipe-as-gift, conversion CTA |
| 3.1 The Resilience States | 03 | Still Water mode, agent-failure recovery, poetic broken state, resize/touch parity |

**Coverage:** 13/13 pages assigned to scenarios

**Key shared-implementation note:** The Poured Elixir exemplars (Trickster persona — see Scenario 03 Design Resolution) and the Shared Elixir both render through the Overflow Reveal's guest-arrival state. One implementation, three uses: owner reveal, shared result, curated exemplar.

> **Delta 2026-07-08 — whole experience finalised; 2.1 mechanics and 3.1 partially superseded.** See `../2026-07-08-experience-master-spec.md`: the Shared Elixir's "miniature overflow replay" becomes the **Condensed Surfacing** on `/pour/:id` (persist-at-reveal, dynamic OG with inked name); 3.1's agent-failure apology state is **deleted** (silent deterministic fallback); the desktop-first platform note is superseded by a **full responsive journey** (staged per hold, velvet-rope degrade state); the Poured Elixir side door is confirmed on the Entrance as a whisper. Intent of all three scenarios otherwise carries over.

> **Delta 2026-07-07 — 1.10 + 1.11 superseded by "The Surfacing".** The reveal is now designed against the built "Suspended Pour" journey (`TheDepths`, H1–H8) rather than the ink-wash concept: the splash in the journey footage whites out into one of 132 pre-authored persona images (never tinted by the user's colour; name inked onto an in-image tag), then the image glides right and the keepsake text composes left — PDF via print CSS replaces the separate Recipe Card page. The "seen" moment and the guest-arrival shared state carry over unchanged in intent. Spec: `design-artifacts/2026-07-07-the-surfacing-reveal-design.md`.

---

## Design Inputs & Decisions Carried Into Phase 4

- **Questionnaire architecture:** `../_progress/brainstorming/brainstorming-session-2026-06-11-questionnaire-ux.md` (The Six Descents)
- **Motion system:** `../_progress/brainstorming/brainstorming-session-2026-06-11.md` (Ink Wash Clearing system)
- **Abandonment rule:** fresh start always; only the Color Seed tint persists (localStorage)
- **New scope vs. Product Brief:** server-persisted results, unique shareable URLs, per-result OG images
- **Storyteller privacy constraint:** the "one true thing" free-text is never echoed verbatim — allusion only

---

## Next Phase

These scenario outlines feed into **Phase 4: UX Design** where each page gets:
- Detailed page specifications (template: `resources/wds-4-ux-design/templates/page-specification.template.md`)
- Wireframe sketches (each page folder has a `Sketches/` subfolder)
- Component definitions
- Interaction details
- **"Edward lens" acceptance-criteria blocks** on every Scenario 01/02 page spec (60fps floor, zero console errors, <4s transitions, touch parity)

---

_Generated with Whiteport Design Studio framework_
