# Browser name-tag check: 22 staged candidates (2026-10-06)

Run by: Claude Code session, at Robin's request, for the image-production root owner (Codex). This is real-browser evidence, kept separate from Codex's calculated geometry.

- **Runtime:** Chromium (Playwright 1.60). Codex's own private fixture `output/playwright/image-review.html` was served by `review-vite.config.ts` on 127.0.0.1:5179. It renders the actual `TheReading` component and stylesheet with each candidate's staged metadata.
- **Not touched:** production source, `public/`, the runtime registry, `queue.json` and Codex's review files. Integration and acceptance stay with root.

## What was tested

22 selected candidates (from `queue.json`) × 2 names (`Ada`, `Alexandria-Rose`) × the exporter's 7 viewports = **308 real renders**. The viewports were 1920×1080, 1440×900, 2048×1036 and 3440×1440 (wide master), plus 390×844, 430×932 and 320×568 (portrait master, DPR 2).

Per case:
1. **Glyph geometry.** The rendered name's glyph box (DOM range rects) against the measured paper box, mapped through the live `<img>` cover fit and frame transform.
2. **Ink-on-paper pixels.** Screenshot with and without the name. Every pixel the name changes must land on paper-bright pixels in the un-named frame (≥ 60% of the paper's 90th-percentile luminance), and inside the paper box.
3. **Copy collision.** Any visible hero text (kicker, dedication, title, tagline, cue) intersecting the paper box.
4. **Size.** The rendered name size, with a 10px floor.

The detector was validated with a **negative control**: the name was pushed 90×40px off the tag, and 13 of 14 cases failed as they should. The one pass was 3440px, where the tag is wide enough that the nudge stays on paper.

## Results

### Desktop / ultrawide (wide master): 176 / 176 pass

- Names sit fully on blank paper for both short and long names on all 22 candidates.
- No page copy crosses any tag.
- Two automatic flags were **overruled by inspection** as detector false positives: `caregiver-outlaw/v5` and `lover-sage/v2`, both at 3440 with the short name. The ultrawide vignette darkens part of the tag below the luminance threshold, but the crops show the name entirely on paper.
- The smallest long-name render is 10.6px at 1440 and 320. It is legible but small; innocent-hero's small tag is no worse than the others.
- On the desktop contact grid, the copy stays in the quiet left side, and the drink, tag and personality traces stay visible on every candidate.

### Phones (portrait master): failing on all 22, and on the shipped pair too

25 of 132 phone cases pass. The failures are not image-specific:
- **Page copy crosses the tag** in 104 cases.
- **The name is too dimmed to register** in 18 cases.
- **Ink partly off paper** in 27 cases. Several of these are dimming under the mobile bottom fade, not true misses.

On portrait phones the tag sits at the foot of the glass. That is exactly where the reading's first screen puts the kicker/dedication, title, tagline and cue, over the bottom fade. The live app at :5180 shows the same for the shipped "Down the Line" pair at 320, 375 and 390: the inked name is hidden under the title block.

So this is a **layout decision, not an image defect**. Regenerating images can't fix it without breaking the current rule to place tags low by the glass. Options for Robin and the experience-design owner:
- **(a)** On portrait phones, start the hero copy below the scene (scroll-revealed), so the first screen is the scene and the inked tag alone.
- **(b)** Shift the portrait image up on phones (`object-position`) so the tag clears the copy band. This costs head-room above the glass.
- **(c)** Accept that phones show the name only in the dedication line, and treat the tag ink as a desktop flourish.

Recommendation: (a). It keeps the reveal's "meet the cocktail" moment and needs no image work.

Per-candidate phone details are in `results.json` for after the layout is decided. Candidates where the tag also sits partly off paper in the portrait crop, independent of copy, may still need image attention: caregiver-creator/v4, caregiver-jester/v3 and innocent-jester/v3 at 390/430. Re-run once the layout changes.

## Files

- `tag-check.mjs`: the check. `node tag-check.mjs [pairing/version]`, with the fixture up on :5179. `NUDGE="90px 40px"` runs the negative control.
- `results.json`: all 308 cases (geometry, ink stats, collisions, verdict and reasons).
- `shots/`: a full-viewport JPEG and a tag close-up PNG per case.
- `sheets/`: one contact sheet per candidate (1440 short, 390 long, 320 short, plus four tag close-ups).
- `sheets.sh`: rebuilds `sheets/`.

## Not covered

- Material realism: the 18 root visual holds stand; this check does not release them.
- Real phones and Safari/WebKit (not installed).
- Name lengths beyond the two test names.
