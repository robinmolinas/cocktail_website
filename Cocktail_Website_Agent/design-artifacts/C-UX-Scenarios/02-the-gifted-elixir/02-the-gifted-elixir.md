---
design_intent: D
design_status: built
---

# 02: The Gifted Elixir

Created 11 June 2026 · Refreshed 8 October 2026

## Transaction and context

Danielle opens a friend's pour on her phone. She wants to admire the cocktail, perhaps make it for her friend, and see what her own would be. The gift creates curiosity without sharing her friend's private reading.

## Path

1. The room opens through dark, presenting the friend's cocktail and name.
2. Danielle explores the recipe. The owner-only epigraph, whoYouAre and yours reading are withheld.
3. **Discover the spirit within you** returns her to the Entrance to begin her own journey.

The same TheReading component renders the owner and gift states. The old miniature ink overflow and full shared narrative are superseded.

## Built and planned

The current fragment link opens gift mode. Epic 2 replaces the full-result fragment with a minimal `{pairing, name, seed}` fallback, adds server-owned `/pour/:id` records, crawler share HTML and dynamic OG. Records store identity and source, never personal reading text. House pours are distinct authored examples and may show their own house reading.

Do not call server sharing or per-pour previews complete until the endpoints, routing and unfurl are verified. The architecture has resolved the old URL/privacy design questions; implementation remains.

[Shared surface](2.1-the-shared-elixir/2.1-the-shared-elixir.md) · [Architecture AD-7–AD-14](../../../agent/ARCHITECTURE-SPINE.md)
