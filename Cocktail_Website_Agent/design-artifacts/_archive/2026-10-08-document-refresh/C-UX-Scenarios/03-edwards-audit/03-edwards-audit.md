> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../../2026-07-08-experience-master-spec.md).

---
design_intent: D
design_status: not-started
---

# 03: Edward's Audit

**Project:** Dionysus
**Created:** 2026-06-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Verify, inside a five-minute attention budget, that Dionysus demonstrates genuine creative engineering — performance, architecture, resilience — and reach a confident hiring recommendation.

---

## Business Goal (Q2)

**Goal:** The portfolio objectives Celeste never consciously notices: locked 60fps, <4s transitions, error-free agent orchestration.
**Objective:** Converting into the trigger map's ultimate metric — the hiring recommendation (Trigger Map: Portfolio Objectives + Edward's validation checkpoint role).

---

## User & Situation (Q3)

**Persona:** Edward the Evaluator (Secondary)
**Situation:** Edward, 38, creative director / engineering lead, burning through a candidate-review block between meetings. Desktop with DevTools already open; a mid-range phone on the desk for the parity check he always does.

---

## Driving Forces (Q4)

**Hope:** Finally — a portfolio proving both sensory craft *and* engineering depth, worth posting in the team channel.

**Worry:** Another laggy GPT-wrapper that stutters on first resize and hallucinates mezcal-with-chocolate-syrup.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (Chrome + DevTools) with a deliberate mid-quiz phone check — the audit *is* multi-device.
**Entry:** Clicks the portfolio link from Robin's résumé during a hiring loop, fully expecting to close the tab within ninety seconds.

---

## Best Outcome (Q7)

**User Success:**
Every probe he throws — rapid hover, viewport resize, reduced-motion toggle, console watch — comes back clean; he leaves confident he's found a creative engineer, not a template assembler.

**Business Success:**
The recommendation: Edward shares Dionysus in his team Slack and puts Robin forward for the role.

---

## Shortest Path (Q8)

His sunshine path is *finding quality everywhere he probes*:

1. **The Entrance (audit)** — First-load speed, instant 60fps marbling under violently fast mouse movement, zero console errors
2. **The Poured Elixir** — Clicks *"taste one already poured"*; watches the miniature overflow; evaluates the narrative, recipe realism, and painting — the GPT-wrapper fear dies in sixty seconds
3. **The Descent (his own)** — Output quality has earned his time; he begins the quiz himself, stress-probing as he goes — viewport resize, gesture spam, two chapters repeated on the phone for touch parity
4. **The Resilience States** — Toggles `prefers-reduced-motion`, finds Still Water is designed rather than disabled; glimpses the poetic broken state
5. **The Verdict** — His own reveal lands clean; PDF survives his zoom; he inspects the repo, posts the link in team Slack, recommends Robin ✓

---

## Trigger Map Connections

**Persona:** Edward the Evaluator (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** Flawless creative engineering — locked 60fps under adversarial interaction
- ✅ **Want:** Agentic architectural sophistication — structured multi-agent output, now including server-persisted results and OG image generation
- ✅ **Want:** Cohesive, container-free design voice — Still Water mode proves the design system extends to accessibility
- ❌ **Fear:** Laggy, heavy animations — defeated by the performance budget at every step
- ❌ **Fear:** GPT-wrapper hallucinations — defeated fastest by the Poured Elixir exemplar (curated, mixology-grounded output visible in 60 seconds)
- ❌ **Fear:** Poor responsive adaptation — defeated by the mid-quiz phone parity check

**Business Goal:** Portfolio objectives (60fps, <4s) → hiring recommendation

---

## Design Resolution: The Poured Elixir (decided 2026-06-11)

**Origin:** Upgrades the trigger map's "Should Address: quick testing needs → secret roulette/bypass mode" from a tester's backdoor into a real product surface — the showcase that converts.

**Mechanism:** One to three hand-curated exemplar elixirs (polished content, zero generation risk) with permanent URLs, rendered through the **Overflow Reveal guest-arrival state** (same implementation as Scenario 02's Shared Elixir — miniature overflow, full narrative, recipe-as-gift, prominent "Discover the cocktail within you" CTA). No new view is created.

**The exemplar persona: The Trickster (Magician × Outlaw, from the 132-persona matrix).**
- Chosen as the witty wink to whoever clicks the shortcut: the Magician primary is instant transformation, the Outlaw secondary is permission to skip the rules — mythology's patron of the shorter road (Hermes, Loki, coyote).
- The exemplar's narrative knowingly addresses the skipper: *"Patience was never your virtue. You wanted the essence without the descent — so here is the drink of those who take the shorter road."*
- Mirror-image detail: the matrix's **Alchemist (Magician × Explorer)** sits adjacent — the archetype of those who complete the full ritual. Skipper = Trickster; journeyer = Alchemist. The matrix itself rewards the patient path.
- Runners-up recorded: The Lovable Rogue (Hero × Outlaw), The Scoundrel (Regular Guy × Outlaw).

**Guardrails:**
1. **The whisper rule.** On the Entrance, the exemplar link is a quiet calligraphic aside (*"taste one already poured"*) that never competes with the primary CTA. The ritual remains the hero; the exemplar is a side door.
2. **Exemplars as fallback.** If the agent backend fails mid-Distillation, the apology offers an exemplar — the poetic broken state gains a graceful second act.

**Works for all personas:** Edward gets the output proof inside his attention budget; a hesitant Celeste gets evidence the destination is worth six chapters; the Danielle path already proved that seeing another's elixir creates the itch for your own. Seed of the future Gallery of Souls (Phase 4 post-launch).

---

## Annotation Model

Edward owns no views — steps 1, 2, 3, and 5 of his path traverse views owned by Scenarios 01 and 02. During Phase 4, each of those page specs receives an **"Edward lens" acceptance-criteria block** (performance budgets, console cleanliness, resize behavior, touch parity) rather than duplicate pages here.

Only step 4 creates a folder in this scenario: the cross-cutting **Resilience States**.

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 3.1 | `3.1-the-resilience-states/` | Prove that failure, accessibility, and edge cases are designed, not patched | Edward returns to the main flow, fears retired ✓ |

**On-step interactions** are documented as storyboard items within the page spec.
