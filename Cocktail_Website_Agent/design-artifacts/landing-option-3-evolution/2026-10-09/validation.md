# Validation — Option 3 evolution

- Full project build passed on 2026-10-09, with output at `/private/tmp/dionysus-option-3-evolution-build-2026-10-09`.
- Validated 132 persona image pairings, pour-store freshness (132 pours; 105 veto-free), selection-reference source hashes and TypeScript compilation.
- Vitest: 17 files passed; 925 tests passed. Vite production bundling passed. The existing large reveal-chunk warning remains.
- A temporary check executed the actual App.tsx route and selection source: 30 valid route/query cases, five invalid route cases, all active before/reveal files present, registry contains only Option 1/3A/3B, selector cleans variant overrides and preserves unrelated query arguments, refresh/back URL resolution and no duplicate history entries passed.
- `git diff --check` passed after the code changes.
- All four final decoded WebP files were inspected visually. PNG master pairs were independently reviewed; see [finish-review.md](finish-review.md). Disposition: **Ship at native-artwork and selector-source scope**; no required fixes.
- One detector attempt ran on App.tsx and index.css. It returned exit 2 with incumbent CSS warnings and design-token advisories. The tool truncated the report; [detector-output.txt](detector-output.txt) preserves the received output. The new focus-visible rule uses existing tokens and does not intersect the reported findings. This is not a global detector-clean claim.
- PNG prompt metadata and WebP prompt sidecars were saved after the build; this changed provenance only, not rendered pixels or application source.
- Live browser verification is unavailable on this host following repeated Chromium Mach-port bootstrap denial and loopback access failure. No browser responsiveness, computed contrast, actual selector keyboard/touch behavior or spotlight compositing certification is claimed.

