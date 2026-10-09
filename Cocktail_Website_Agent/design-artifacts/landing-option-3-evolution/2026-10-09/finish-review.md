# Disposition

**Ship at the reviewed artwork and selector-source scope.** Both Option 3 directions satisfy the narrow refinement brief. No required fix was found in the inspected native artwork or the changed selector source. This is a bounded asset/source disposition, not a full browser UI approval.

# Evidence

- Visually inspected the native `before.png` and `revealed.png` in `3a-soft-glow/` and `3b-hidden-embers/`, alongside `dionysus-experience/public/first.png` and the accepted centered `public/landing-trial/two-worlds-revealed-v2.png`.
- Each before/reveal pair shares its native dimensions: 3A is 1670 × 942; 3B is 1672 × 941. Their respective face, hair, collar, shoulder, and torso contours approximately align by visual inspection. The pairs retain the centered, outward-facing composition.
- Read `src/App.tsx`, the landing and selector rules in `src/index.css`, and their current diff. Checked `index.html` and the active artwork references for old Option 2 preload references. All four referenced Option 3 WebP delivery files exist.
- Used the Impeccable craft floor and the existing product/design context, with the user's explicit preference for magical complexity and the pinned headline, copy, and CTA taking precedence over broader style defaults. The parent had already run the once-per-session context loader.

# Material findings

- **Containment passes visibly.** Both reveals keep the ingredients, glass bodies, feet, and garnishes within their owner's silhouette. In particular, the woman's pale flower now sits well inside the head/neck interior. The coupe is lower in the neck/chest area, and its right-hand garnish stays inside the throat contour. The discoveries along the shoulder and chest also stay inside the figure. No visible ingredient or garnish projects into the surrounding air.
- **The tonal alternatives are distinct.** 3A reduces the accepted centered artwork's broad amber wash while preserving soft atmospheric light and hair detail. 3B suppresses more of the ambient field and body illumination, producing a more graphic shadow with brighter discoveries concentrated inside the figures. Both retain a somber, fading surround consistent with the Option 1 reference; 3B is the darker direction.
- **Complexity and composition remain intact.** Citrus spirals and wheels, botanical clusters, flowers, spices, faceted golden light, the man's highball, and the woman's coupe remain legible. Both figures' faces stay dark and anonymous. The chest discoveries persist instead of being reduced to one isolated object.
- **The source presents exactly three options.** `LandingVariant` and `LANDING_ARTWORK` contain only original, centered/3A, and embers/3B. The preload loop consumes that same registry, so the retired Option 2 pair is no longer preloaded by this code. Historical Option 2 paths and query values resolve to 3A as compatibility aliases.
- **Defaults and routes agree by source inspection.** `/` defaults to 3A; `/homepage-3` and `/homepage-3a` select 3A; `/homepage-3b` selects 3B; `/homepage-1` and `/original` select Option 1. Selector actions write the corresponding route and clear the variant query parameters, and the history listener reads the route again.
- **Selector semantics are coherent in source.** The labelled group contains three native `type="button"` controls, each with `aria-pressed` tied to the same variant state. 3A/3B have descriptive accessible names. Hover, active, and explicit `:focus-visible` rules are present. The diff preserves the existing typography, tokens, headline, copy, CTA, and layout outside this selector refinement.

# Required fixes

None at this bounded scope.

# Limits

These PNGs are native asset evidence, not browser renders. Browser screenshots and interaction testing are excluded because Chromium cannot bootstrap on this macOS host following the confirmed Mach-port denial. This review therefore does not certify responsive cropping, selector placement at actual viewport sizes, computed contrast, touch-target dimensions, keyboard operation, font loading, image-loading latency, or the moving spotlight transition. Approximate contour matching is a visual assessment, not a runtime compositing test. No browser attempt was made and no new recapture is required by this disposition. The parent owns the single final source-detector pass and build/lint validation.
