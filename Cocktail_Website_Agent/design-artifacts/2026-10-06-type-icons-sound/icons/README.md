# Flavour icons (H6): sample set and rules

Status: **in the app since 2026-10-06** (`src/components/FlavourIcon.tsx`, H6 only), after Robin asked for icon above word and a new Fresh. The set covers all nine H6 flavours, because a partial set could not be judged for coherence.

| Flavour | Mark | Why this object |
| --- | --- | --- |
| Sweet | sugar cube, two loose grains | the bar's own sugar, not a candy or a heart |
| Bitter | bitters dasher bottle with paper label | the ingredient bartenders reach for |
| Spicy | chilli with stem cap | unambiguous at 18px |
| Herbal | sprig of alternating rounded leaves | **redrawn**: the first rosemary sprig read as wheat, which collides with the Gluten veto on the next beat |
| Fruity | two cherries on joined stems, one leaf | reads as "fruit" without being citrus |
| Citrusy | half wheel: rind and segments | the plan's peel/wedge |
| Fresh | a dewdrop with a small companion drop (cold condensation) | **redrawn** 2026-10-06: Robin rejected the mint leaf; a cucumber slice was tried and read as a button at size |
| Floral | five-petal blossom, open centre | elderflower/rose without being either |
| Smoky | three wisps over a smouldering stick | — |

Files: `svg/*.svg` (one per flavour). `size-sheet.html` renders them at 28/22/18px on deep night and on paper. `in-app-{a,b}-{desktop,phone}[-chosen].png` show them injected into the real H6 spheres: A = current type, B = recommended Neue Montreal, "-chosen" = Citrusy + Herbal lit.

## Rules

- **Drawing.** 24-unit grid, 1.25 stroke, round caps and joins, outline only. Tiny filled grains on Sweet are the one exception. Everything uses `currentColor`. One object per mark: no scenes, no sparkle.
- **Material match.** The hairline matches the chalice dots and the H8/H9 line work (DESIGN.md: "match new marks to the neighbouring material").
- **Placement.** Inside the sphere, *above* the word (Robin, 2026-10-06), gap 4px (3px on phones). The word carries the meaning; the icon only speeds recognition. Never show an icon without its word.
- **Size.** 32px desktop, 26px phones (≤640px), with the stroke at 1.1 grid units so it stays a hairline (about 1.2–1.5px).
- **Colour.** The word's ivory at 0.8, so the word leads; 0.9 on hover. Lit: full ivory plus a faint seed-colour glow, light around the line, never ink on it (Seed Colour Rule).
- **Motion.** None of its own. The icon rides and dissolves with its sphere.
- **Accessibility.** `aria-hidden="true"`; the word is the accessible name.
- **Scope.** H6 flavours only. The "leave out" vetoes stay word-only for now: a crossed-out egg or wheat reads as a warning label, not an invitation. Revisit only if Robin asks.

## Integration note

`FIN_FLAVORS` in TheDepths.tsx is a word list. Map word → icon in a small `flavourIcons` record next to it and render the SVG inline before `.sphere-word`. Inline SVG keeps `currentColor` and avoids a network request. The CSS used for the capture is at the top of `capture-in-app.mjs`.

Observation for the design owner, unrelated to the icons: at 375px a lit H6 sphere overlaps its rising neighbours (see `in-app-a-phone-chosen.png`, Sweet under Herbal). This already happens in the current app.
