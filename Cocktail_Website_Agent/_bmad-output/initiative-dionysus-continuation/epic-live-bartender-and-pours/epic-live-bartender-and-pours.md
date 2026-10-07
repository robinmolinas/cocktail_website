---
type: epic
title: "The Bartender tailors the reading; pours persist and share"
parent: initiative-dionysus-continuation
covers: [CAP-2, CAP-5, CAP-7]
after: []
assignee: ""
risk: high
---

<!-- Envelope only. Requirements and the breakdown are written at this epic's inception. -->

# The Bartender tailors the reading; pours persist and share

## Description

This epic adds the spine's API shell on top of epic 1's core:

- `POST /api/reveal` (the server `selectShortlist`, the OpenRouter Bartender ladder making a bounded pick and tailoring `yours`, the `acceptTailoring` guard, the Upstash pour write and rate limit);
- `GET /api/pours/:id`;
- the share HTML and the OG image;
- house pours and the four-outcome router.

`App` owns the request from the H6 seal. The H8 breath waits, with a 9 s cap, for the local authored fallback.

## Outcome

Guests read a `yours` passage woven from their answers in the author's voice, can share a pour link that unfurls, and never see a failure. The weekly authored-ratio check is the ops signal.

## Done when

1. With a key configured, a reveal returns a shortlist pick and a tailored `yours` that passes `acceptTailoring`. Reviewed final-choice fixtures show each pick is one of the three.
2. With no key, an invalid pick, a timeout, a 429 or schema skew, the guest gets `shortlist[0]` with the authored text and `pourId: null`, and no error is shown.
3. No prompt contains the name or the trace. Pour records hold no reading text, and the gift view withholds the reading.
4. `/pour/:id` unfurls with the OG image, dead ids show the poetic 404, and this is deployed to production.

## Boundaries

The `api/` and `server/` shells, `vercel.json`, sharing, OG and house pours. It is not the matching model or the catalogue (epic 1), and it is not hold design.

## References

- parent — Dionysus/Cocktail_Website_Agent/_bmad-output/initiative-dionysus-continuation/initiative-dionysus-continuation.md
- spec — Dionysus/Cocktail_Website_Agent/agent/spec/SPEC.md, CAP-2, CAP-5, CAP-7
- architecture — Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md, AD-2, AD-6–AD-10, AD-12–AD-14, Deploy and Ops conventions

## Notes

- Waits on epic 1 because the API imports the shared Answers schema, `selectShortlist`, `assembleReading` and `acceptTailoring`.
- Open question: which reviewed shortlist cases count as Bartender final-choice evidence (a playtest design question, from the spec's Open Questions).
