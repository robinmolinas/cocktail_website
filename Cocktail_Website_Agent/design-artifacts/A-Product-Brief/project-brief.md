# Product Brief: Dionysus

Created 11 June 2026 · Refreshed 8 October 2026 · Product owner: Robin

## Purpose

Dionysus is a non-commercial portfolio experience that turns a short ritual of self-reflection into an authored cocktail and a personal reading. The guest should feel seen, enjoy the craft, and want to share or make the drink. Robin directs the product, design and editorial decisions; quality determines the pace.

The promise is expressed as **“Discover your Spirit Within”**. “Spirit” carries the double meaning of liquor and self; the supporting copy and **“Discover my cocktail”** button make the output concrete. The 8 October wording supersedes the September “Cocktail Within” headline.

## Who it serves

**Celeste, the curious self-explorer**, wants sensory discovery, a thoughtful explanation and a recipe worth keeping. She fears generic personality labels, clinical forms and AI platitudes. She may arrive on a desktop during a quiet break or on a phone in the evening.

**Edward, the portfolio evaluator**, judges the same experience for design, engineering, responsiveness and resilience. The craft is the portfolio; the guest journey does not need technical explanations or a separate recruitment interface.

**Danielle, the recipient of a shared pour**, admires a friend's cocktail and can begin her own journey. The recipe is a gift; the friend's private reading is withheld.

## The current experience

The Entrance leads into **The Suspended Pour**, a continuous video journey that plays at native speed and pauses for each interaction. It ends in **TheReading**, the cocktail's dark photographic room, with the owner's reading and recipe. The retired nineteen-question, six-page ink-clearing concept is historical.

- H1: name and perspective, including **Another side of me**; the guest's name stays theirs.
- H2: a seed colour carried as light and lettering.
- H3: five continuous 0–100 gravity choices.
- H4: a centred instruction rises into the unscored **1 / 2** example, followed by nine binary word pairs. Missing choices are respected; Still Water removes the deadline.
- H5: **A world of your own**. First, what others come to you for gathers into the central sphere; second, what draws you receives rings of its light. Each round allows up to three reversible choices. Carrying a word is an alternative to tapping in the first round.
- H6: flavours with fine line icons, then ingredient vetoes. Glassware is fixed by the pour; there is no vessel question or Alcohol veto.
- H7: an optional trace that stays in the browser.
- H8–H9: the breath and dark reveal transition.
- H10: the owner reading. Portrait phones show the unobscured scene first, then the title and text below. **Share your cocktail** and **Save the recipe** appear at the bottom only. Printing produces two clean sheets.

The [experience specification](../2026-07-08-experience-master-spec.md) owns the detailed flow and implementation limits. [DESIGN.md](../../dionysus-experience/DESIGN.md) owns visual rules.

## What makes the result meaningful

The collection has **132 ordered pairings**: twelve archetypes, each paired with eleven different secondary archetypes. Reversing a pair changes the outcome. Primary expresses the core motive; secondary expresses how it shows. This is a creative reflection, with no claim of psychological validity.

The Pour Studio authors the collection offline through psychology, history, mixology and storytelling. Every pairing has one recipe, fixed glass, sourced anchors and authored reading. At runtime, deterministic scoring selects three eligible pours; the future Bartender chooses within those three and may tailor only `yours`. Recipes and historical facts stay authored. Failed selection or tailoring uses the first-ranked pour and authored text.

The distinction is essential: the runtime selects and frames the collection; it does not research or invent a new drink for each guest. The [pipeline specification](../../agent/spec/SPEC.md) and [architecture spine](../../agent/ARCHITECTURE-SPINE.md) govern this boundary.

## Success and constraints

- First-time guests understand the interactions, finish the journey and find the result personally meaningful.
- Motion is smooth, text legible, input equivalent on desktop and phone, and Still Water usable. Native video playback stays at 1×. Intentional choreography is judged by its approved rhythm; the old blanket four-second transition limit no longer describes the experience.
- Different answer fixtures must reveal different authored pours. Catalogue, veto, privacy, fallback and coverage checks must pass before release.
- The recipe and letter save cleanly, and shared gifts invite another visit without exposing the personal reading.
- The original **>80% completion** and **>40% save** targets remain aspirations. They are not measured results; browser print opening does not prove a PDF was saved. No per-hold analytics is authorized by these targets.

English only. No accounts, commerce, runtime images, recipe substitutions or zero-proof variants at launch. Vetoes filter whole pours. All 132 authored pours are eligible for the first release under the strict content gate; formal editorial approval remains separately recorded.

## State and next work

The journey and reading UI exist. Matching components are being built, but the primary app still reveals the fixed *Down the Line / The Visionary* pilot. Current component and integration status belongs in the [continuation status](../2026-10-06-continuation-status.md), not in this strategic brief.

Robin approved **Knowledge, Influence, Making and Caring** on 8 October, replacing Mischief in H5's drawnToward round. The production list remains nine words until ticket 1.9 implements twelve and refreshes coverage. Music and broader mobile refinement remain open. Historical discovery and decisions are preserved in `dialog/` and the [document review](../../_bmad-output/document-review-2026-10-08.md).
