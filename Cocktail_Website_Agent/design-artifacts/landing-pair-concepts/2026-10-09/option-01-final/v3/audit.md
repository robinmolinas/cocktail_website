# Dionysus landing imagery — Impeccable audit and revision

Date: 2026-10-09  
Scope: the paired landing-page before/revealed artwork and its local-trial delivery. This is an image-focused assessment, not a whole-application accessibility or performance audit.

## Outcome

The accepted composition stays centered, with outward-facing anonymous profiles, a highball for the man, a coupe for the woman, and dark space for the existing headline and call-to-action. Revision 3 replaces the decorative ingredient inventory with a smaller composition and more selective light.

Visual verdict: a substantial improvement in restraint and material separation. The imagery remains a deliberately stylized double exposure. “100x” is a quality ambition, not a measured result.

## Independent assessment

Assessment A reviewed the original and v2 image pairs against the established Dionysus art direction without detector evidence. Assessment B independently inspected image delivery, dimensions, crop rules, reveal behavior and the final changed UI source. A finished before detector results were used in the parent assessment.

| Priority | Finding in v2 | Revision 3 response |
| --- | --- | --- |
| P1 | Glass, ice, liquid and the coupe foot shared an even orange glow. | Clearer ice and liquid, restrained glass reflections and a transparent coupe stem/foot. The highball has a longer irregular ice form and quieter side walls. |
| P1 | Too many ingredients, seeds and faceted jewels made the interiors read as a catalog. | Removed jewels, dense botanical wallpaper and torso decoration. Each person now has three principal ingredient forms with space around them. |
| P1 | Repeated hair loops resembled gold wire; the shoulder looked polished. | Reduced loop density and brightness, grouped more hair into darkness and subdued skin lighting. A stylized warm rim remains. |
| P2 | Both interiors repeated the same decorative effects. | The man has a loose ascending twist/herb/jasmine arrangement; the woman has a more compact citrus/bay/cacao arrangement. Glass shape and composition carry the distinction. |
| P2 | Dense filaments and glitter advertised spectacle before the hover. | Removed curling filaments and floating gems; quietened the haze and retained black outer wings and lower corners. |

The man’s flower and pale long drink avoid assigning only woody/heavy flavors to him. The woman’s cacao and amber drink avoid assigning only floral/light flavors to her. These are illustrative inner worlds, not rules tying cocktail preferences to gender.

## Before/reveal pairing

The before image was edited from the accepted reveal by removing the internal drinks and ingredients, preserving the framing and silhouettes. Both PNG masters and both delivery files are 1672 × 941. Manual review found no obvious outer-contour drift; exact pixel equivalence is not certified.

Both trial layers use the same entrance and departure animation classes and the same crop rules. This addresses the previous base-only zoom, which could temporarily misalign the artwork. The shared zoom also scales the spotlight mask during entrance; any temporary pointer offset is a source-based inference that has not been observed in a browser.

Portrait layout still fits the pair into the upper image band. At 390 × 844, the existing rule produces an approximately 693 × 390 image with about 151 pixels cropped from each side. The profiles occupy the retained middle region. Actual text overlap, contrast and responsive rendering remain unverified in a browser.

## Image delivery

| Asset | Dimensions | Bytes |
| --- | --- | ---: |
| v2 before PNG | 1672 × 941 | 1,420,348 |
| v2 revealed PNG | 1672 × 941 | 1,862,794 |
| v3 before WebP | 1672 × 941 | 106,154 |
| v3 revealed WebP | 1672 × 941 | 134,126 |

The previous delivered pair totaled 3,283,142 bytes. The refined WebP pair totals 240,280 bytes, a 92.7% reduction. This comparison includes both artwork revision and format conversion; it is not a compression-only claim. The v3 PNG masters total 2,922,957 bytes.

Delivery uses WebP quality 93, method 6, sharp YUV conversion and no metadata. The decoded WebP files were visually inspected alongside the accepted generation. No obvious compression damage was seen at the inspection scale; this does not certify every possible display size.

No fake upscaling was applied. Native source resolution can soften on larger/high-density screens. Both backgrounds load immediately, without coordinated decode readiness. No measured loading-time, Core Web Vitals or frame-rate claim is made.

## Verification

- Exactly one mechanical detector run: `impeccable detect --json src/App.tsx`. Exit code 0; saved output `detector.json` is `[]`, with zero findings. The detector inspects source, not image pixels; CSS was not its target.
- `git diff --check` passed.
- Full project build passed, including validation of 132 persona image pairings, pour-store freshness, selection-reference hashes, TypeScript, 17 test files / 925 tests, and production bundling.
- Build output: `/private/tmp/dionysus-two-worlds-v3-build-2026-10-09`. The existing large-chunk warning remains outside this image scope.
- Browser automation was unavailable: Chromium could not start because macOS rejected its bootstrap/Mach port registration. This final pass did not repeat the unchanged failing browser attempts. The agent environment also could not reach the existing localhost server, despite its listening process being confirmed earlier. Runtime visual verification is therefore still pending on the user's browser.

## Local trial

Refresh [the local experience](http://localhost:5180/) for the new pair. [Original artwork comparison](http://localhost:5180/?landing=original) remains available.

The trial is gated to development. Production selects the original artwork. Previous generations are preserved, and unrelated persona or questionnaire work was not edited by this revision.

## Residual visual judgment

The warm hair rim and surreal interior composition remain stylistic choices. Some rim strands are still more regular than natural hair. The image is calmer and clearer, but an art audit cannot prove that all viewers will stop perceiving it as generated. A final in-browser check should focus on the CTA's dark space, matching contours during pointer travel, and drink legibility at the user's normal viewport.

