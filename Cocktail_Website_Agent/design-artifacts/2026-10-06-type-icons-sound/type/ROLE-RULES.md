> **Exploration reference — reviewed 8 October 2026.** Type alternatives were declined; music remains open. Sample-engine behavior, prices/licences and recommendations are dated proposal evidence, not production implementation or a purchase decision. Current direction: [experience specification](../../2026-07-08-experience-master-spec.md).

# Type directions: comparison, recommendation, role rules

Status: **exploration, awaiting Robin's choice.** Nothing here is applied to `dionysus-experience/`. The 2026-09-29 rule in `DESIGN.md` §3 (Playfair Display as the voice, no fourth family) stays in force until Robin picks a direction. All three directions keep the system at three families or fewer.

## How the comparison was made

The same real screens, captured from the running app (localhost:5180, 6 Oct working tree). Each direction is injected at capture time as an override stylesheet (`directions/*.css`). The copy, frame and moment are identical; only type changes.

- **Screens:** H1 lens, H4 practice instruction (the brightest frame), H4 *Harmonic / Disharmonic* (the longest pair), H5 *drawn toward* (the darkest hold), H10 title/tagline/dedication, H10 card, H10 letter.
- **Viewports:** desktop 1440×900, small phone 375×667, large phone 430×932.
- **Stress inputs:** the accented dedication "Zoë Nguyễn-Ångström" replaces the sample name.
- **Open `compare.html`** for every screen side by side, desktop row above phones. `screens/board_*.jpg` are 2×2 desktop boards and 4-up phone strips. `name-specimen.png` is the glyph test.

| | Direction | Families | What changes |
| --- | --- | --- | --- |
| A | Current (control) | Playfair Display · Playfair · Jost | — |
| B | **Neue Montreal speaks, Playfair keeps the cocktail** | PP Neue Montreal (+ Text cut) · Playfair Display · Playfair | Questions, hints, choice words, pills and labels go to Neue Montreal. The title, tagline, epigraph, closing and letter stay serif. Jost retires. |
| C | Switzer, the quiet one | Switzer · Playfair Display · Playfair | Switzer Light questions, Switzer labels. The title stands upright. The tagline moves to sans. |
| D | Satoshi throughout | Satoshi · Playfair Display | Satoshi everywhere, including the letter. Serif only for the cocktail's name and epigraph. |

## Findings

1. **Sans helps most where the type is smallest.** In 112–142px spheres, two-line phrases like "The me I'm becoming" and "The night version of me" read faster in all three sans faces than in Playfair Display italic. This holds on phones too. It is the strongest argument for changing.
2. **Questions read more contemporary in sans, but lose voice.** Playfair italic made every line sound *spoken*. The sans directions lose that unless the serif is kept somewhere meaningful.
3. **The cocktail wants the serif.** The upright title in C reads ordinary next to the italic. Satoshi in D's letter flattens the card/letter distinction (DESIGN.md's Two Movements Rule). It also makes four screens of prose read like an app article. Keep the reading serif.
4. **The bright H4 frame is a placement problem, not a typeface problem.** "Too quick to think…" crosses the dark sphere into pale smoke in every direction. The sans faces hold their edges slightly better than the Playfair hairlines. The Legibility Rule's answer still applies: move the line, don't darken behind it.
5. **Glyph coverage separates the faces.** Satoshi and Switzer have no Vietnamese ễ. Switzer renders it from a lighter fallback; Satoshi stacks the marks wrongly ("ê" plus a loose tilde). Neue Montreal and the current Playfair/Jost cover everything tested (ë ễ Å ö ç œ æ ø ł ñ ß ş ğ ı, curly quotes, dashes, ellipsis). Guests type their own name and their H7 trace, so this matters.
6. **The dedication already wraps on a 375px phone** in every direction, including the current one ("THE VISIONARY · POURED FOR ZOË NGUYỄN-" / "ÅNGSTRÖM"). This is not caused by any of these directions. It needs a rule of its own: see role rules.
7. **B and C are close on screen.** At real sizes Neue Montreal and Switzer differ less than their specimens suggest. Neue Montreal has slightly more character in the lowercase and a Text cut for 14–16px hints. Switzer is lighter and quieter.

## Recommendation: B, Neue Montreal for the journey, Playfair for the cocktail

Choose **B** with the guest-writing rule below.
- It wins on the plan's success test: questions and options read clearly, feel contemporary, and still belong to the same product, because the cocktail keeps its serif.
- It is the only sans candidate with full coverage for names and traces.
- It has a Text cut for the small hints over footage.

**Free fallback, if the licence is unwanted:** C's face (Switzer) with B's role rules. Keep the italic serif title and the serif tagline (C's upright title and sans tagline are its weakest choices). The guest-writing rule then covers Switzer's missing Vietnamese.

Do not take D: the letter stops being a letter.

## Role rules for direction B

Tokens replace families; no rule names a family directly (unchanged house rule).

| Role | Token | Face | Size / weight / tracking | Where |
| --- | --- | --- | --- | --- |
| Voice: questions, poles | `--font-voice` (new) | Neue Montreal 400, roman | `clamp(1.3rem, 2.75vmin, 1.7rem)`, lh 1.22, −0.012em. Poles 300, −0.02em | `.hold-q`, `.grav-pole` |
| How: hints | `--font-voice-text` (new) | Neue Montreal **Text** 400 | `clamp(14px, 1.75vmin, 16px)`, 0 tracking | `.hold-hint`, `.depth-hint`, `.seed-name` |
| Choice words | `--font-voice` | Neue Montreal 400 | sphere size unchanged, −0.005em | `.sphere-word` (H1, H4, H5, H6) |
| Labels, pills, amounts | `--font-label` → Neue Montreal | 400, uppercase | 0.16em for labels/kicker/cue (Jost's 0.22–0.26em is too wide for a grotesk); pill 0.16em at 11px; CTA 0.01em sentence case | `.hold-next`, `.cta`, `.tr-kicker`, `.tr-cue`, `.tr-label`, `.tr-amount`, `.tr-quiet`, ritual numerals |
| The cocktail | `--font-display` | Playfair Display italic 500 | unchanged | `.tr-title`, `.tr-tagname`, `.nav-word` (the mark) |
| The cocktail speaks | `--font-display` | Playfair Display italic 400 | unchanged | `.tr-for` (tagline), `.tr-epigraph`, `.tr-closing`, `.tr-greet-*` |
| The letter and the card's items | `--font-text` | Playfair (text cut) | unchanged | `.tr-why p`, `.tr-item`, `.tr-ritual li` |
| **The guest's own hand** | `--font-display` | Playfair Display italic | unchanged | `.depth-input` (name, trace) and the guest's name in the dedication |

Named rules to replace DESIGN.md's Italic Voice Rule:

- **The Two Voices Rule.** The journey *asks* in Neue Montreal; the cocktail *answers* in Playfair. Anything the guest is asked, chooses or is told how to do is sans. Anything that belongs to her cocktail is serif: its name, its line, its letter.
- **The Ink Rule.** Whatever the guest writes stays in Playfair Display italic: her name on the bare line, her trace, and her name wherever the interface repeats it. It is her hand, and it is the face with the widest script coverage. *Markup change:* wrap `{inkName}` in its own span inside `.tr-kicker-for` (TheReading.tsx ~L384) so the name can stay serif inside the sans label.
- **The Dedication Rule.** On phones, the archetype and the dedication take two lines on purpose: archetype, then "Poured for *Zoë Nguyễn-Ångström*". Never let a long name break mid-word across an uppercase label.
- Unchanged: the Legibility Rule (`--legible` hairline only), and "Do not add a fourth family". B still has three.

## Licensing (verify before shipping; nothing purchased)

- **PP Neue Montreal (Pangram Pangram).** Commercial web use needs a paid licence ("licences start at $40"; the web tier depends on traffic, so confirm at purchase). The files in `_trial-fonts/` are the *Free for Personal Use* download. Its FAQ allows testing, proofing and pitches, not a commercial project. **Do not deploy them.** If B is chosen, buy the web licence for Regular, Light, Italic and Text Book (the trial has no Medium). Then self-host the licensed WOFF2 files and preload Regular.
- **Switzer / Satoshi (Indian Type Foundry, Fontshare).** ITF Free Font License: free for commercial use. Serving through the Fontshare CSS API is clearly covered. Sources disagree on whether self-hosting needs ITF's written consent, so check the licence text bundled with the download before self-hosting.
- **Playfair / Playfair Display.** SIL OFL via Google Fonts, as today.

## For the implementer

The direction files are written as overrides for the capture. Port them as token changes in `index.css :root`, plus the per-role selectors above, not as an appended stylesheet. Update DESIGN.md §3 (Voice/Text/Label, the Italic Voice Rule, the 2026-09-29 note) in the same change. Then re-run the comparison capture against the built result.

The capture script lives with these artifacts (`capture.mjs`). Run it with node, with the dev server up at :5180.
