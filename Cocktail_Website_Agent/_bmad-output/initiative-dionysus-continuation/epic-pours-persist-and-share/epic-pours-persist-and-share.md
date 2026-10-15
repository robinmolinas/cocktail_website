---
type: epic
title: "Pours persist and share by link"
parent: initiative-dionysus-continuation
covers: [CAP-7]
after: []
assignee: ""
risk: medium
---

<!-- Envelope only. Requirements and the breakdown are written at this epic's inception. -->

# Pours persist and share by link

## Description

This epic was split from the old epic 2 (Robin, 2026-10-15). It covers:

- pour records written by `/api/reveal` to Upstash, with a `pourId` (AD-7);
- `GET /api/pours/:id`;
- `/pour/:id` share links and server-rendered share HTML;
- the OG image (AD-13);
- house pours (AD-8);
- the four-outcome router (AD-14).

## Outcome

A shared pour link unfurls with its image and opens the gift view. A dead id shows the poetic 404.

## Boundaries

Not the Bartender or the name cleaner (epic 2), and not the matching model (epic 1).

## References

- parent — Dionysus/Cocktail_Website_Agent/_bmad-output/initiative-dionysus-continuation/initiative-dionysus-continuation.md
- architecture — Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md, AD-7, AD-8, AD-10, AD-13, AD-14, Amendment A

## Notes

- Waits on epic 2 for `/api/reveal`.
- Pour records hold no reading text and no trace. The personal additions stay on the guest's device.
