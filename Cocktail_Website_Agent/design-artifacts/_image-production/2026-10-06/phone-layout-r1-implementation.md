# Portrait-phone reveal correction r1

Robin authorized this producer to implement the phone fix: "you fix it".
Scope: Reading layout only, not image release, publication or the video journey.
Adapt skill informed a device-specific sequence rather than smaller type or
fake name coordinates. PRODUCT.md/DESIGN.md and existing edits were preserved.

## Implemented

- On screen<=900px in portrait, the full-bleed photograph occupies the first
  viewport. Its absolute stage scrolls with that part of the document.
- The existing100svh spacer now precedes the hero. Desktop hero remains fixed,
  so its layout is unchanged; phone hero is in normal flow after the image.
- Title, complete tagline and existing recipe/reading cue remain visible and
  grow with actual text length. Incoming reading follows with a real gap;
  it cannot cross an independently fixed, fading phone caption.
- A quiet44px-target "Your cocktail" anchor on the first phone screen points
  to the title. It is outside the aria-hidden stage, hidden on desktop/print,
  and static under reduced motion. Actual cue/tag clearance needs review.
- Phone vignette now veils only the nav end of the scene; its heavy bottom
  gradient and scroll-driven reading scrim no longer cover the paper.
- Image object-fit/crop, measured tag transforms, multiply seed ink,1.055
  arrival handover and1.115 breathing endpoint are unchanged. No public image
  or registration was changed; the separate material hold remains.
- Print still suppresses the stage and opening cue; the moved spacer remains
  hidden in print. No printed content was removed.

Files: dionysus-experience/src/components/TheReading.tsx, src/index.css and
the canonical DESIGN.md phone behavior note. The pre-existing removal of
first-screen Share/Save actions and unrelated stylesheet edits were preserved.

## Verification / limits

Source/diff-whitespace check passed. Original immutable v4 request and its
reviewer-owned FAIL were preserved. Image, metadata and pour remain unchanged.

The first current local validation/type/build invocation was rejected by
automatic execution review. Robin then explicitly approved these checks.
Image validation PASS (17 preserved public pairs); TypeScript PASS; production
bundle PASS in fresh private output/playwright/phone-layout-r1-build.Vg3z4G.
No existing dist or public assets were deleted or overwritten. No execution
workaround or local browser launch was attempted. Independent browser result
is still pending; compilation does not verify appearance or legibility.

The ready request was published before that fresh approval and stays immutable.
Its localVerification BLOCKED entries are publication-time history; current
supplementary proof lives in browser-review/producer-checks/
pilot-caregiver-innocent-v4-phone-layout-r1.json. Runtime fingerprints unchanged
between request publication and successful local checks.

The new request `pilot-caregiver-innocent-v4-phone-layout-r1` is a **layout-only
browser pilot using a materially held image**, not an eligible final image.
No browser PASS, accessibility certification or catalogue-wide acceptance is
claimed. A new callback is needed before accepting this runtime correction.

## Browser recheck interpretation

Opening/arrival/breathing/reduced motion: the whole glass, paper and essential
person traces must remain visible; the opening cue must avoid them. Name ink
must lie on writable paper and be readable in actual fonts and seed colors.

On phones, intentional scroll removes the photograph from view, then shows
its complete caption and reading. The name moving out of the viewport after
scroll is not itself a failure. Unexpected initial clipping, copy crossing the
paper while both are visible, hidden caption, disabled cues or horizontal
overflow are failures. Do not apply the old persistent-background phone
assertions to this deliberate sequential flow.

Desktop/ultrawide behavior and scoped vessel/tag/person retention must regress
cleanly against the original run. Confirm actual loaded assets/fonts and all
fingerprints at completion. Browser PASS cannot clear wine/material holds.
