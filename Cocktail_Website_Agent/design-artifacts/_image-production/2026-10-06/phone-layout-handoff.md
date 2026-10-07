# Experience-owner handoff — phone reveal/tag collision

Robin subsequently directed this producer to implement the fix ("you fix it").
The original handoff below is retained as the defect/acceptance reference;
implementation and the intentional phone scroll policy are recorded in
phone-layout-r1-implementation.md. No final browser pass is claimed.
Source: fresh independent browser result
`../browser-review/results/pilot-caregiver-innocent-v4/report.md` and root receipt
`browser-pilot-caregiver-innocent-v4-receipt.md`.

## Authorized correction scope

Correct the shared Reading reveal **on portrait phones only**, initially
`(max-width:900px) and (orientation:portrait)`. Preserve existing desktop,
laptop and ultrawide layout; no broad redesign, new cards, panels, image
grading, or changes to the video journey. Coordinate existing dirty changes
to `dionysus-experience/src/components/TheReading.tsx` and `src/index.css`.

The v4 asset and name metadata are correct geometrically; do not change
tag/wideTag coordinates, move ink off the paper, or shrink the name to hide
the overlap. Do not promote ink above the title as a layering workaround.
The independent material hold on v4 remains separate and is producer-owned.

## Defect and relevant implementation

- `.tr-hero` is fixed at the bottom; the<=900px rule uses8vh bottom padding.
  At390×844 and430×932 the title crosses the tag. At320×568 the tagline
  crosses the name. The430 kicker also touches the paper.
- Phone `.tr-vig` applies near-opaque bottom darkening:0.94 at0%,0.80 at32%.
  Rendered name/paper contrast is around1.05–1.08:1. Metadata cannot fix this.
- At3.6s arrival the scene reads before the copy enters; from~4.6s the overlap
  persists in every sampled breathing phase and reduced motion.
- At scrollp0.25 incoming recipe/label overlaps the ghosted tagline/cue.

Reserve separate legible regions for the cocktail/person/tag and the hero copy
using the **actual rendered** scene geometry and authored content height.
Assess an intentional compact phone composition or scene-then-copy arrangement;
do not blindly lift the title into the glass or use a single percentage that
only works for this pairing. Any actual layout choice belongs to the experience
owner. Reduce/reposition the phone vignette rather than lighten or recolor the
photograph. Retain the actual name's seed ink and physical-paper attachment.

## Constraints to preserve

- PRODUCT.md / DESIGN.md remain canonical: intimate candlelit timber room,
  near-black atmosphere, restrained light, Playfair/Playfair Display/Jost.
- No filters/tints on the drink. No UI card, gradient-text redesign or bright
  neutral page interruption. Functional metal equipment is allowed.
- Name fits on writable paper, clear of hole/string in every phase. Glass,
  coat-collar core and folded-cloth core remain recognizable and unclipped.
- Arrival and breathing retain continuous1.055 handover; reduced motion stays
  static and immediately legible. Reading cue remains usable.
- Preserve source recipe/copy and measured image metadata. Public assets and
  registry unchanged by the review/fix workflow unless root later releases.

## Required recheck

1. Real component and current dossier-authored copy, actual web fonts loaded;
   no placeholder-copy, fallback-image, or disabled-motion shortcuts.
2. Ada and Alexandria-Rose at390×844,430×932,320×568; settled/breathing extrema
   plus intermediate phases, arrival including copy entrance, reduced motion,
   and early/full reading scroll. No hero glyph crosses physical paper/name;
   the name stays visually readable, not merely within bounds.
3. All eight actual seed inks at least on settled/reduced-motion phone frames
   and the darkest relevant state. Record contrasting colors/edge cases;
   do not equate a red-ink or average-image measurement with accessibility.
4. Regression checks at1920×1080,1440×900,2048×1036,3440×1440 for both names.
   Ultrawide paper's existing~15 CSSpx edge clearance must not regress.
5. Check long authored titles/taglines on other ready representative serves
   before treating the shared fix as catalogue-wide. No text clipping/hiding
   as the solution. Preserve arrival, mask and recognizing-trace behavior.
6. Run proportionate local type/build checks, retain other-track edits. Deliver
   changed-file summary and evidence to Robin/root. Root publishes a **new**
   immutable ready request for changed inputs; do not overwrite the v4 FAIL.

Browser PASS alone does not clear the producer's material hold or constitute
publication, user/editorial approval, or image integration authority.
