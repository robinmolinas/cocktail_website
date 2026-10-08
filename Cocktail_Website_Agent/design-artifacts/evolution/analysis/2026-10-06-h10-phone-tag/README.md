# H10 phone name-tag check (2026-10-08)

Robin chose option (a) from the Types / icons and sounds session's tag report (`design-artifacts/_image-production/2026-10-06/browser-tag-check/REPORT.md`): on portrait phones, the hero copy starts below the scene.

The layout was already built in the working tree before this check: the `.tr-scene-cue` "Your cocktail" link, the in-flow `.tr-hero`, and the portrait media block in `index.css`. It came with commit 2c109e1, plus a later edit to TheReading.tsx at 09:45 on 8 Oct. This session didn't write it. This is a verification only, and nothing was edited.

**Method:** full journeys from H1 to H10 against localhost:5180, with the shipped "Down the Line" pair and the name "Zoë". Each run waited 9s on the reading page, then measured the first screen and pressed the cue.

| Viewport | Tag box (x, y, w, h) | Copy over the tag | Title top (first screen) | After the cue | Console |
|---|---|---|---|---|---|
| 390×844 | 244, 617, 80, 130 | none | 904 (below the fold) | title at 96 | clean |
| 375×667 | 226, 488, 63, 103 | none | 727 (below the fold) | title at 96 | clean |
| 320×568 | 193, 415, 54, 87 | none | 628 (below the fold) | title at 96 | clean |

**Result:** passes. The first screen is the scene alone. The inked name reads clearly on the tag at all three sizes, and the page is no wider than the screen.

**One follow-up for the owner of TheReading:** after the cue, the kicker ("The Visionary · poured for Zoë") sits inside the top nav veil (`.tr-root::before`) and reads very faint. The title's `scroll-margin-top: max(6rem, …)` lands the title at 96px, which leaves the kicker under the veil. Possible fixes:
- point the cue at the kicker; or
- raise the scroll margin by about the kicker's height.

**Screenshots:** `first-screen-*.png` and `after-cue-*.png` in this folder.

**Other note:** after the matching owner's `npm install` on 8 Oct, the :5180 dev server served "504 Outdated Optimize Dep". It was restarted with `vite --force`.
