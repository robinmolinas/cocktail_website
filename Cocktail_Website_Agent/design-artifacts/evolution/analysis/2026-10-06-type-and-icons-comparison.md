# Type directions and flavour marks — comparison (2026-10-06)

These are prototypes only. Nothing under `dionysus-experience/src` was touched. The CSS that matters (`.hold-q`, `.hold-hint`, `.sphere`, `.sphere-word`, `.ember`, `.tr-*`, `.cta`, `.hold-next`) was copied into the prototypes, and only the families, sizes and spacing were swapped for role tokens.

## What was rendered

**Prototype:** `design-artifacts/evolution/prototypes/type-directions/`
- `index.html`: the gallery. Each frame is an iframe at its true viewport size, so the vmin/vw clamps and the 640px phone rules behave as they do in the app. It has a Desktop 1440×900 / Phone 375×667 toggle and a "side by side / one direction per row" toggle, plus a table of the role rules.
- `screen.html?dir=A|B|C|D&s=h1|h4p|h4c|h5|h6|h10`: one screen at full size (`&asis` turns off the phone position nudge described below).
- `directions.css`: the role tokens for each direction. This is the source of truth for the rules.
- `glyphs.html`: a test of how each font handles names in other languages.
- `assets/`: real hold frames from `journey.mp4` at 0.6s (H1), 5.7s (H4), 8.2s (H5) and 9.4s (H6), plus `personas/creator-hero` wide and portrait (this matches `sampleResult.ts`, "Down the Line").

**Screens (real copy from TheDepths.tsx and sampleResult.ts):**
- **H1:** "Who is this cocktail for?", the six lenses (with the settled "Another side of me"), and "for Zoë Ångström-Núñez" under the question as an accented-glyph check. It is a test string, not proposed copy.
- **H4 practice (`h4p`):** "Too quick to think. Trust the spirit within." with its hint and the Tea / Coffee pair. **H4 round (`h4c`):** "Which is more you?" with In control / Out of control.
- **H5:** "What do people often come to you for?", the nine words including "A reality check" and "A little chaos", one lit, the longer "1 of 3 chosen…" hint, and the Continue pill.
- **H6:** "What flavours are calling you?", the nine flavours shown mid-rise, one lit.
- **H10:** the kicker "The Visionary · poured for Zoë Ångström-Núñez", the title, the tagline, the epigraph, the lead paragraph, and the bottom Share / Save house pills. Pills sit at the foot, not by the title, per the plan.

**Screenshots** are in `type-directions/shots/`:
- `{A,B,C,D}-{h1,h4p,h4c,h5,h6,h10}-desktop.png` (1440×900) and `-phone.png` (375×667 @2x).
- `{A,B,C,D}-{h1,h5,h6,h10}-phone-asis.png`: the app's current phone geometry, unmodified.
- `sheet-{screen}-desktop.png` (a 2×2 grid, A B / C D) and `sheet-{screen}-phone.png` (A B C D in a row). Start with these.
- `glyph-coverage.png`: Polish, Czech, Turkish, Vietnamese, Danish and Irish names in every family.

**Prototype-only phone nudge.** At 375×667 the app's current layout lets the H1, H5 and H6 sphere clusters climb into the question and hint, whatever the typeface (see the `-phone-asis` shots). Overlapping text would have hidden the type being compared, so the default phone render moves the head up to 7.5% and the cluster down a little. It also drops the epigraph on the H10 phone screen. No type token changes. This is not a layout proposal. The collision belongs to the plan's Mobile row.

## Role rules (summary; exact values in `directions.css`)

| Role | A · current | B · Geist (stand-in) + Newsreader | C · Switzer + Playfair | D · Satoshi + Instrument Serif |
|---|---|---|---|---|
| Question | Playfair Display *italic* 400 · clamp(1.4rem, 3vmin, 1.85rem) · 0 · lh 1.25 | Geist 400 · clamp(1.35rem, 2.9vmin, 1.8rem) · −0.018em · 1.22 | Switzer 400 · same clamp as B · −0.012em · 1.25 | Satoshi 500 · clamp(1.4rem, 3vmin, 1.85rem) · −0.02em · 1.2 |
| Hint | Playfair 400 · clamp(15px, 1.9vmin, 17px) · 1.5 | Geist 400 · clamp(14.5px, 1.8vmin, 16px) · 1.5 | Switzer 400 · same as B | Satoshi 400 · clamp(15px, 1.85vmin, 16.5px) · 1.5 |
| Choice word | Playfair Display *italic* 500 · clamp(15px, 1.95vmin, 18px), phone clamp(13px, 3.5vw, 15px) | Geist 500 · clamp(14.5px, 1.85vmin, 17px), phone clamp(13px, 3.4vw, 14.5px) · −0.01em | Switzer 500 · as B · −0.005em | Satoshi 500 · clamp(15px, 1.9vmin, 17.5px), phone clamp(13px, 3.45vw, 15px) · −0.01em |
| H4 pair word | clamp(1.35rem, 3vmin, 1.95rem) | clamp(1.3rem, 2.8vmin, 1.8rem) · −0.02em | as B · −0.015em | clamp(1.35rem, 2.9vmin, 1.85rem) · −0.025em |
| Reading title | Playfair Display *italic* 500 · clamp(2.4rem, 5vw, 4.4rem) · −0.02em · 1.1 | Newsreader *italic* 400 · clamp(2.6rem, 5.2vw, 4.6rem) · 1.04 | Playfair (opsz) *italic* 500 · clamp(2.5rem, 5vw, 4.4rem) · 1.06 | Instrument Serif *italic* 400 · clamp(3rem, 6vw, 5.4rem) · 0.98 |
| Tagline | Playfair Display *italic* 400 · clamp(1.02rem, 1.36vw, 1.35rem) | Newsreader *italic* | Playfair *italic* | Satoshi 400 (upright) |
| Body (lead) | Playfair 1.16rem / 1.66 | Newsreader 1.2rem / 1.6 | Playfair 1.14rem / 1.66 | Satoshi 1.06rem / 1.7 |
| Button | Jost 500 · 0.9rem · 0.04em | Geist 500 · 0.9rem | Switzer 500 · 0.9rem | Satoshi 500 · 0.92rem |
| Way-onward pill / label | Jost 400/500 · 11px · 0.24–0.26em caps | Geist 500 · 0.18–0.2em caps | Switzer 500 · 0.2–0.22em caps | Satoshi 700 · 0.16–0.2em caps |

Family count: A uses 3 families, B 2, C 2 (Jost retires), D 2.

## Findings that hold for every direction (not typeface problems)

1. **H6 at 9.4s puts the question on pale foam.** It is illegible in all four directions (`sheet-h6-*`). This frame is the brightest of the four holds (mean luma 137, against H1 61, H4 83 and H5 107). By the Legibility Rule, the fix is to move `.hold-head` down into the liquid band below the foam line, not to darken behind it.
2. **The brief's labels are off.** 8.2s (H5) is not the darkest hold: it is a bright amber field full of starbursts. The darkest frame is H1 at 0.6s. Hint text on H5 is noisy in every face.
3. **H4 bright band.** "Coffee" and "Out of control" sit on the cream smoke at x = 67%. That right-hand sphere is the weakest word on the screen in every direction. Weight helps more than family here (see D).
4. **Phone 375×667.** Clusters collide with the question (see `-phone-asis`). This is a layout bug, as noted above.
5. **Hyphenated names break at the hyphen** in the uppercase H10 kicker on phones ("ÅNGSTRÖM- / NÚÑEZ") in all directions. Wrap the inked name in a `nowrap` span or use U+2011. On phones the gold kicker also lands on the bright glass.
6. **On the H10 phone screen, any paragraph sits over the glass.** Keep the reading below the fold on phones, which is what the app does today.
7. The design-skill critique also flags the tracked all-caps kicker with middle dots and the caps "CONTINUE" pill as template tells. They are locked today, but worth a look if the label face changes anyway.

## Per-direction notes

### A · Current (Playfair Display / Playfair / Jost)
- **Bright/dark holds:** the weakest on bright frames. The italic hairlines and the Playfair text cut in the hint thin out over the H4 smoke and the H5 starbursts. "Coffee" and "Out of control" are the softest renders in the set. It is fine on H1 and on the reading.
- **Phone wrapping:** "Out of control" and "A reality check" both break to two lines. Italic choice words at 13–15px read as decoration more than labels.
- **Accents:** full coverage, including Vietnamese. Diacritics are small at 15px.
- **Contemporary feel / atmosphere:** the most "fortune-teller", and the least contemporary. Every line is italic Didone, so questions, choices and title all speak in one register, and nothing reads as a control.

### B · Neue Montreal → STAND-IN Geist + Newsreader
- **Licensing status:** Neue Montreal is paid (Pangram Pangram). There is no legitimate free-hosted webfont. Copies on font-mirror CDNs are unlicensed and were not used. Pangram's free download is a personal-use trial only. A web licence (package pricing starts around $40; the web/app scope is set in their EULA or a tailored quote) is needed before a true render or shipping. [Specimen and licences](https://pangrampangram.com/products/neue-montreal).
- **Why Geist stands in:** it is free (OFL, Google Fonts) and has the same squarish, low-contrast neo-grotesk screen voice. Inter is the closer match on paper but was retired in this project (2026-09-29), so it was not used.
- **Bright/dark holds:** clearer than A, about level with C at 400.
- **Phone:** "A little chaos" wraps to two lines.
- **Accents:** full coverage.
- **Feel:** the most neutral. Geist in particular reads as a developer or SaaS product, which is a PRODUCT.md anti-reference. Neue Montreal is a little warmer, but probably not enough to change that.
- **Newsreader** is a handsome, restrained title and reading serif, but quieter than Playfair at hero size.

### C · Switzer + Playfair (the reading serif kept)
- **Bright/dark holds:** clear on H1, H5 and the H4 practice line. At 400 the question is a touch light over the H4 smoke. D at 500 shows that weight is what carries bright holds.
- **Phone wrapping:** the narrowest face of the four. "Out of control" fits on one line at desktop (`h4c`) and "A little chaos" fits on phones, so it wraps the least.
- **Accents:** full coverage, including Vietnamese.
- **Feel:** quiet, humane, contemporary without the startup tone. The questionnaire reads as controls. The reveal keeps Playfair italic, so the landing, the reading and the printed keepsake keep their voice.
- **Families:** it drops from three to two (Jost retires; Switzer takes labels and buttons).

### D · Satoshi + Instrument Serif (serif only for the name and epigraph)
- **Bright/dark holds:** the most legible on bright holds (500 weight, open geometric forms). It gives the strongest H4 practice line and the clearest "Out of control" over the smoke.
- **Phone:** "A little chaos" stays on one line.
- **Accents:** **fails Vietnamese.** "Nguyễn" renders with a detached tilde (`glyph-coverage.png`). This matters for a feature that inks the user's own name. Other Latin names pass.
- **Feel:** the most explicitly contemporary, slightly app-like. Instrument Serif makes a striking, fashion-press title (`D-h10-desktop.png`). With Satoshi body text, though, the reading becomes a sans letter and loses the fortune-teller voice.
- **Render note:** an earlier D render had silently fallen back to Helvetica because combined Fontshare requests return only the first family. It was fixed with one `<link>` per family and re-shot. Font loading was verified for every direction.

## Licensing per font

| Font | Licence | Web use | Link |
|---|---|---|---|
| Playfair Display, Playfair, Jost, Geist, Newsreader, Instrument Serif | SIL OFL 1.1 | Free, self-hosting allowed | [fonts.google.com](https://fonts.google.com) |
| Switzer | ITF Free Font License (FFL) | Free for commercial use; no modification or redistribution. Secondary sources disagree on whether self-hosting needs ITF's written consent, so serve it via the Fontshare CSS API (as the prototypes do) or confirm with ITF before self-hosting. | [fontshare.com/fonts/switzer](https://www.fontshare.com/fonts/switzer) |
| Satoshi | ITF FFL | Same as Switzer | [fontshare.com/fonts/satoshi](https://www.fontshare.com/fonts/satoshi) |
| Neue Montreal | Commercial (Pangram Pangram) | Paid web licence required; the free trial is personal use only | [pangrampangram.com](https://pangrampangram.com/products/neue-montreal) |

Sources on the FFL: [Fontshare Switzer](https://www.fontshare.com/fonts/switzer), [Fontshare Satoshi](https://www.fontshare.com/fonts/satoshi), [madegooddesigns Fontshare licence review](https://madegooddesigns.com/fontshare/), [fontalternatives Switzer](https://fontalternatives.com/fonts/switzer/). Neue Montreal alternatives: [fontalternatives](https://fontalternatives.com/alternatives/neue-montreal/).

## Recommendation

- **Primary: C, Switzer for questions, hints, choices, labels and buttons, with Playfair (the opsz family) for the cocktail name, tagline, epigraph and reading.** It is the clearest balance of contemporary controls and the brand's reading voice. It wraps the least on phones, passes every name tested, costs nothing, and cuts the system to two families. Before locking it, render the question and H4 pair at Switzer 500 (the static 500 is already loaded): D shows that weight, not family, carries the bright holds.
- **Fallback: D, Satoshi.** Use it if bright-hold legibility is weighted above everything else. Pair it with Playfair rather than Instrument Serif for the reading body, and solve name rendering for Vietnamese (fall back to Switzer or Playfair for the name span).
- **Not recommended:** B. It would need a paid licence, and its stand-in reads closest to SaaS.
- **Not recommended:** staying on A for the questionnaire. It is the weakest on bright holds and makes every control italic decoration. It remains right for the reveal.
- **Note:** this supersedes the 2026-09-29 note that "Playfair Display [is] the main face" for the questionnaire. That is Robin's call to make, and DESIGN.md §3 (the Italic Voice Rule and the Didone + geometric pairing) would need to be rewritten.

## Flavour marks

**Prototype:** `design-artifacts/evolution/prototypes/flavour-icons/`
- `icons.js` is the source.
- `svg/flavour-{sweet,bitter,spicy,herbal,fruity,citrusy,fresh,floral,smoky}.svg` are the individual files: 24×24, one 1.5 stroke, round caps and joins, `currentColor`, no fills. Dots are zero-length strokes.
- `index.html` renders the real `.sphere` and `.sphere-word` over the 9.4s H6 frame. Options: `?dir=A|B|C|D` for typography, `?side` for the mark beside the word instead of above it, `?specimen&sizes=96-18` for a specimen sheet.

**The marks:**
- **Sweet:** a honey dipper and drop. A first-draft sugar cube with grains read as a die.
- **Bitter:** a bitters bottle with a dasher cap and label.
- **Spicy:** a chilli.
- **Herbal:** a curving sprig with alternating leaves. A first draft with paired leaves read as a wheat ear, which is risky next to the "Gluten" veto.
- **Fruity:** cherries.
- **Citrusy:** a wedge with rind and segments.
- **Fresh:** one mint leaf.
- **Floral:** a five-petal blossom.
- **Smoky:** two wisps over an ember line.

**Shots** are in `flavour-icons/shots/`:
- `h6-A-stacked-{desktop,phone}.png`: the mark above the word, current type.
- `h6-A-beside-{desktop,phone}.png`
- `h6-C-stacked-{desktop,phone}.png`: with the recommended Switzer.
- `specimen-*.png` and `specimen-large-*.png`: 96 / 18px on the dark.

**Notes:**
- **Placement:** stacked (mark above the word) is the one to use. Beside the word, "Citrusy" nearly touches the rim of a 97px phone sphere.
- **Size:** at desktop the mark renders about 22px and looks slightly timid inside a 142px sphere. Use clamp(22px, 2.7vmin, 26px). 18px with a 1.6 stroke works on phones.
- **Weakest at phone size:**
  1. **Spicy:** the chilli thins to a leaf or feather shape and can be confused with Fresh.
  2. **Bitter:** reads as "a bottle", which could be any spirit or sauce, not specifically bitters.
  3. **Smoky:** reads as steam, i.e. "hot".
  - The strongest are Fruity, Citrusy, Floral and Herbal.
- **On the pale foam band** every hairline mark washes out, the same as the question does. Moving the H6 head and cluster into the liquid band (finding 1) fixes both.
- Words still carry the meaning everywhere. The marks sit at 0.86 ivory, one step quieter than the word, and go full ivory with the word when lit.
