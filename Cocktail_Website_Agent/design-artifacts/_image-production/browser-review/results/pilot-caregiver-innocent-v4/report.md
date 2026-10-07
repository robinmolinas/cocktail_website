# Browser review — pilot-caregiver-innocent-v4

**Disposition: FAIL** (browser gate only; not an editorial, material or release decision).
Desktop and ultrawide pass. All three portrait phones fail because the hero copy covers the tag and the phone vignette buries the name.

| | |
|---|---|
| Batch | `pilot-caregiver-innocent-v4` (request `requests/pilot-caregiver-innocent-v4.json`, sha256 `7369b534…ae40b2`, status `ready`) |
| Candidate | caregiver-innocent **v4**, "Before the Room" |
| Reviewer | Claude Code session `genai-projects-61` (independent browser reviewer) |
| Reviewed | 2026-10-06, run finished 18:24 UTC (20:24 Paris) |
| Browser | Playwright 1.60.0, headless Chromium 148.0.7778.96, macOS |
| Freshness | All 16 request fingerprints (pour, 8 candidate files, 7 runtime inputs) matched at start **and** at completion. Result is current, not stale. |

## Verdict by viewport

| Viewport | Ada | Alexandria-Rose | Owner of the defect |
|---|---|---|---|
| 1920×1080 | PASS | PASS | — |
| 1440×900 | PASS | PASS | — |
| 2048×1036 | PASS | PASS | — |
| 3440×1440 | PASS (tight) | PASS (tight) | — (note: paper bottom ~15 px from viewport edge, inside frame feather band) |
| 390×844 | **FAIL** | **FAIL** | application layout (+ image composition) |
| 430×932 | **FAIL** | **FAIL** | application layout (+ image composition) |
| 320×568 | **FAIL** | **FAIL** | application layout (+ image composition) |

States tested per viewport and name (14 cases, 672 screenshots):
- **Settled, motion on:** breathing frozen at 0, ¼, ½, ¾ and 1 of the 52 s `tr-ken` cycle; measured frame scale 1.055 → 1.115.
- **Scroll:** p = 0.25, 0.5 and 1, each at breathing 0 and 1.
- **Arrival (intro):** ten samples from 0.4 s to 9 s. Animation clocks were resynced after each pause, so CSS stays in step with the component's 2.4 s ink timer.
- **Reduced motion:** settled and intro.

Every named capture has a bare twin taken at the identical frozen animation phase, with the name hidden. The ink was taken from the difference between the two.

## What was verified

- **Intended image, not a fallback.** Every page loaded `…/2026-10-06/caregiver-innocent/v4/portrait.jpg` (sha256 `9c286229…`). Desktop also loaded `wide.jpg` (`dfefca6a…`), used as the scene, with portrait as the print plate. Both hashes equal the request's. No `_fallback.jpg`, no older version.
- **Actual fonts.** Taken from Chrome DevTools' platform-font report, not `document.fonts.ready`. All are web fonts and no system fallback was used:
  - Name ink: Playfair Display Italic `PlayfairDisplay-Italic`
  - Title: `PlayfairDisplayItalic-Medium`
  - Tagline: `PlayfairDisplay-Italic`
  - Kicker: `JostRoman-Medium`
  - Cue: `Jost-Regular`
  - Reading body: `Playfair5ptSemiExpanded-Light`
- **Browser errors.** No console errors or warnings, page errors, failed requests or HTTP ≥ 400 in any case.
- **Authored copy.** I made a private review-only adaptation (see below) that renders the real TheReading/index.css with the dossier's current title, personality, tagline, recipe, ritual, epigraph, reading and closing line. All 17 long strings were checked verbatim against `pours/caregiver-innocent.md` (sha256 `1e16f17d…`). The placeholder fixture was not used as copy evidence.

## Findings

### 1. Phones: hero copy covers the tag, and the name is unreadable (FAIL)

On all three portrait phones the hero block (`.tr-hero`, fixed bottom, `padding-bottom: 8vh`) sits directly over the tag:
- At 390×844 and 430×932 the **title** "Before the Room" crosses the paper. "Ada" sits under "Room", and the start of "Alexandria-Rose" is hidden behind the title.
- At 430×932 the kicker line also touches the paper.
- At 320×568 the **tagline** runs across the paper and the name is effectively invisible.

The overlap persists through:
- every breathing phase
- reduced motion (settled and intro)
- the arrival from ~4.6 s onward, once the copy rises

The phone `.tr-vig` gradient (0.94 → 0.80 black over the bottom 32%) also darkens the paper. Measured ink-to-paper contrast under the name is **1.05–1.08:1** on phones, against 1.4–2.0:1 on desktop. The name is not legible even where the copy leaves gaps.

The image itself is not the immediate cause. In the 3.6 s arrival frame, before the copy rises, the full flute, coat collar, folded cloth, tag and name are all clearly visible and legible on the phone (`390x844-Ada-arrival-3600.png`).

### 2. Name fitting and tag measurements: correct on every viewport

On desktop and ultrawide, 100% of detected ink lies within the measured paper polygon and on paper-coloured master pixels. None is within 18 master px of the hole/string, and none is left of the writable edge (x 1068).

Ink spans, in master px:
- Ada: x 1113–1193, y 713–752
- Alexandria-Rose: x 1093–1218, y 716–744

Font sizes go down to 10.2 px (Alexandria-Rose at 320). On phones the ink is also centred on the paper (checked in tag zooms). A few detected pixels fall near the hole there, but those are compositing changes from the overlapping title/tagline, not name ink. The registered `tag`/`wideTag` values work, so **no metadata correction is needed.**

### 3. Vessel and personality traces: retained

Glass, paper, coat-collar core and folded-handkerchief core are inside the viewport in every state, and outside the frame's feather mask everywhere except the 3440 paper edge.

Tightest margins (CSS px), consistent with the producer's ~5 master-px risk:
- Glass left edge: 5 px at 390, 6 px at 430, 17 px at 320
- Coat-core right edge: 28 px at 390, 31 px at 430

Visually the coat collar/lapel and folded cloth read as real traces, not slivers, at all three phone sizes. The optional wallet and basil are cropped on phones.

### 4. Motion

- **Arrival:** the scene opens at contain scale (0.62 on phones, 0.74 ultrawide, 0.90 on 16:10/2:1, 1.0 on 16:9), resolves from black, and pushes in to 1.055.
- **Handover:** tr-open → tr-ken hands over at exactly 1.055 → 1.055, with no pop.
- **Ink:** starts on schedule (~2.4 s) and runs left to right.
- **Reduced motion:** static 1.055 frame, immediate name, immediate copy.
- **Scroll:** the hero fades by p ≈ 0.48, then the scrim and reading take over. At 1920 the reading column stays left of the glass, and tag and name remain legible at p = 1.
- **Phone scroll (observation, app layout):** at p = 0.25 the first reading label ("The Pour") and recipe rows overlap the still-ghosted tagline/cue. Below the hero the scrim buries the tag, which is by design while reading.

### 5. Image and world observations (for producer judgement; these did not decide the browser gate)

Checked at full size against Down the Line, Half a Rim and Off-Label.

What holds:
- The recipe holds: one chilled flute, no ice, no garnish in the glass, and a violet-red base rising to gold-rose.
- Timber is the table surface, and the metal is functional (lamp).

What looks off:
- The wine carries **etched-looking filigree/squiggle lines** among the bubbles, clearly visible at desktop and phone scale (`source-crops/wide-glass-1to1.jpg`). This resembles the "etched squiggles" reason for the explorer-hero hold.
- The paper tag and the handkerchief share a faint embossed damask pattern, and the wallet has crocodile emboss.
- The frame is brighter and more amber than the house controls, which keep neutral brown-black shadows. The lit book spines top-left are busier than the controls' quiet copy side.

I am not releasing or imposing any hold. The producer and root own the material call.

## Smallest recommended correction

1. **Application layout, phones only (experience owner, not the image producer).** On `(max-width: 900px) and (orientation: portrait)`, keep the hero copy off the tag and stop the bottom vignette from burying the paper. For example:
   - lift or condense the phone hero block so its top edge stays below the tag's bottom edge or above its top, or
   - let the hero sit over the darker area beside the glass foot, and lighten `.tr-vig`'s bottom gradient where the tag lives.

   This recurs across pairings: the saved v2 captures showed the same defect, and the portrait tags sit at ~75–80% of the height. So it belongs in the shared layout, not in per-image recomposition. Desktop/ultrawide layout and all image metadata should be preserved as they are.
2. **Image-side alternative (larger).** Recompose the portrait so glass foot and tag end above ~55–60% of the portrait height, clear of the hero zone. On a portrait phone the master fills the height, so the cover crop cannot lift the tag vertically. This needs new generation and would put the now-passing phone trace geometry at risk, so I don't recommend it as the first move.
3. **Optional, image material.** If the producer agrees with observation 5, correct the etched filigree in the wine in a new version folder. That would need a new request.

After a layout fix, the batch needs a **new request**. This result is immutable and covers only the fingerprints above.

## Evidence

All screenshots are under `/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/dionysus-experience/output/playwright/browser-review/pilot-caregiver-innocent-v4/run-final/shots/`.

File names follow `<viewport>-<name>-<state>.png`, with a `-bare` twin and `-tagzoom` crops. The `trial/` folder holds pre-fix runner trials, which are not evidence.

Key frames:
- `390x844-Ada-settled-ken0.png`, `430x932-Alexandria-Rose-settled-ken1.png` and `320x568-Ada-settled-ken0.png`, with their `-tagzoom` crops (failure)
- `390x844-Ada-arrival-3600.png` (image works before the copy rises)
- `1920x1080-Ada-settled-ken0.png`, `1920x1080-Alexandria-Rose-settled-ken1-tagzoom.png`, `3440x1440-Alexandria-Rose-settled-ken1.png` and `1920x1080-Alexandria-Rose-scroll1-ken1.png` (passes)
- `../source-crops/` (1:1 crops of glass, tag and traces; 3× master tag crop used to locate the paper polygon and hole)

Raw measurements are in `run-final/raw-results.json` and `run-final/summary.txt`. Fingerprints are in `fingerprints-start.txt` and `fingerprints-end.txt`.

## Method notes and limits

- **Private adaptation.** `output/playwright/browser-review/_runner/authored-review.{html,tsx}` and `authored-copy.ts` reuse the producer fixture's in-memory candidate swap, adding authored copy and `?intro=1`. No production file, public asset, registry, queue or producer file was modified.
- **Essence line.** The reading's line was set as "the power of pure care", lowercased from `archetypes.ts`, following the sample's convention. It appears only in the reading, not the hero.
- **Paper polygon and hole.** Both were read by eye from a 3× master crop. The ink percentages are supporting evidence. The verdict comes from visual inspection of the rendered screenshots and tag zooms.
- **Browser coverage.** Headless Chromium only; Safari/WebKit and real devices were not tested. Phone runs used DPR 2 with touch emulation.
- **Runner file.** Only my runner `review.mjs` changed between the start and end fingerprint lists, from bug fixes made before the final run. It is not a reviewed input.
