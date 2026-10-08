---
type: initiative
title: "Every guest gets the authored cocktail their answers point to"
parent: none
covers: [CAP-1, CAP-2, CAP-3, CAP-4, CAP-5, CAP-6, CAP-7, CAP-8]
after: []
assignee: ""
risk: high
---

# Every guest gets the authored cocktail their answers point to

## Description

This initiative is the matching-and-integration track of the 2026-10-06 continuation plan. The live journey reveals one fixed pilot (*Down the Line*) for everyone, and the legacy engine scores questions the journey no longer asks. The refreshed spec (`agent/spec/SPEC.md`, CAP-1–CAP-8) and the architecture spine (AD-1–AD-14) define the target. Answers v3 feed a deterministic shortlist over the 132 authored pours. The Bartender then makes a bounded pick and tailors `yours`, with the authored text served verbatim as the fallback. Experience design, collection review, images and sound continue in their own conversations and artifacts. Here they are touch points.

## Outcome

A first-time guest receives, in-session, the authored cocktail of the pairing their answers select, which is the spec's success signal, and the CAP-8 report shows every pairing at least reaching the shortlist.

## Done when

1. A full desktop and mobile journey reveals the authored pour selected from its answers, not the fixed pilot, for any of the 132 coverage fixtures.
2. The live Bartender path picks within the shortlist and tailors `yours`. Every failure path serves `shortlist[0]` with the authored text, and the guest sees no error.
3. The catalogue validator passes the development floors in build. The strict launch gate (all 132 authored and at least 12 veto-free, after the classification review) passes before release.
4. The privacy checks hold: no trace, trace-derived text or diagnostics on the wire; no name in the LLM prompt; no personal reading stored or shown on a pour link.
5. The CAP-8 reachability and distribution reports are regenerated against the shipped model and catalogue. Production is deployed on Vercel.

## Boundaries

This initiative covers the backend and data seams behind the finished front-end (the spine's scope), plus the App and TheDepths edits that the spine's Brownfield Delta requires. It does not cover hold design, pour content and approval, images or sound. See the spec's Non-goals.

- Touch point: `TheDepths.tsx` (H1–H7 capture, H4/H3 diagnostics hooks, the Q12 sphere layout). Owner: experience design conversation. It imports vocabularies from epic 1 entry 1.
- Touch point: pour dossiers, specs, `contains` classification and approval status. Owner: cocktail review conversation (Pour Studio). Epic 1 imports them read-only.
- Touch point: persona images and geometry (`personas.ts`). Owner: image production. They are registered by one integration owner.
- Touch point: audio director. Owner: experience design, per the spine's Audio convention.
- Tracer path across epics: fixture answers → `selectShortlist` → `assembleReading` → TheReading (epic 1), then the same request through `POST /api/reveal` (epic 2).

## References

- spec — Dionysus/Cocktail_Website_Agent/agent/spec/SPEC.md, sections Capabilities, Constraints
- architecture — Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md, AD-1–AD-14 and Brownfield Delta
- plan — Dionysus/Cocktail_Website_Agent/design-artifacts/2026-10-06-parallel-work-plan.md, section Questionnaire algorithm work in detail

## Notes

- Decision: no platform-baseline epic. The app already builds and deploys on Vercel from `dionysus-experience`. Epic 1 entry 1 adds the `shared/` core and test tooling the spine requires (2026-10-06).
- Decision: the ticket store is repo files, and the active initiative is this one (Robin, 2026-10-06).
- Decision: pursue the Q12 drawnToward word edit (Robin, 2026-10-06). Robin confirmed Knowledge, Influence, Making and Caring on 2026-10-08, replacing Mischief in the second H5 round. Copy is settled; the build retains 9 words until ticket 1.9 implements 12 and refreshes coverage.
- Decision: the first release serves all 132 authored pours, not approved-only, behind the strict launch gate and the build's content checks (Robin, 2026-10-08).
- Waits on nothing outside this tree. Epic 2 waits on epic 1 for the shared core contracts.
