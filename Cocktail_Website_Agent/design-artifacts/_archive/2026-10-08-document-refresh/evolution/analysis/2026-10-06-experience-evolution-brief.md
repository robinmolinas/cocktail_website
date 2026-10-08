> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../../2026-07-08-experience-master-spec.md).

# Experience evolution brief — 6 October 2026

WDS Phase 8 (product evolution), experience-design track of the [continuation plan](../../2026-10-06-parallel-work-plan.md). Agent: Freya. Single production UI writer for `TheDepths.tsx`, `TheReading.tsx` and `index.css` in this cycle.

Context: continuous improvement (Context B). The problem statement, scope and success criteria come from the plan's "Design work in detail" table and Robin's recorded decisions. They were not re-interviewed.

## 1. Product snapshot (checked in the browser today)

- The journey runs H1 → H10 on one continuous video with native 1× holds. All holds were walked at 1440×900, 375×667, 390×844 and 430×932, plus reduced motion. There were no console errors. Details: [mobile interaction audit](2026-10-06-mobile-interaction-audit.md).
- The reveal is still the fixed *Down the Line / The Visionary* pilot. Matching and catalogue work belongs to the matching owner.
- Type is Playfair Display / Playfair / Jost. There is no audio code yet. The seam is defined in `agent/ARCHITECTURE-SPINE.md` (Audio row): one `src/audio` director, assets in `public/audio`, unlocked on the Entrance CTA gesture, never gating a stage or video transition, failing silently. Still Water keeps the bed and drops the transients.

## 2. Applied today (settled and reversible; browser-verified)

| ID | Change | Files | Verified |
|---|---|---|---|
| EXP-01 | **H4 history bubbles removed.** The kept/secret dot row and its CSS are gone. Immediate catch feedback is unchanged. | TheDepths.tsx, index.css | 1440 + 390 screenshots. No element on H4 offers navigation. |
| EXP-02 | **H1 final lens → "Another side of me".** The name is retained, and the dedication still reads "poured for {name}". `lens` still stores the label until `shared/answers.ts` maps it to id `another-side`. | TheDepths.tsx | 390 screenshot. The breath echo renders "poured for another side of me". |
| EXP-03 | **H10 share/save only at the bottom.** The title-area pair and its CSS are removed. The recipe cue now arrives at 2.2s, the slot the actions vacated. Print rules are unchanged. | TheReading.tsx, index.css | Desktop hero is clean. At 390 the bottom shows Share, Save and Start again. |
| EXP-04 | **H4 blind taps ignored.** A pair can't be answered until it is ~93% condensed (250ms; after the practice reading beat). The fade at the end of the window stays catchable. | TheDepths.tsx | A tap 60ms into pair 2 was not caught. A later tap was caught. |
| EXP-05 | **H4 hidden tab no longer creates a "secret".** A frame gap over 500ms (tab hidden or frozen) hides the pair and presents the same pair again with a fresh window. Agreed with the matching owner. | TheDepths.tsx | rAF held for 6s mid-pair → same pair (Half-full) re-condensed and had a full window. |
| EXP-06 | **Short phones (≤720px tall): lens/H5 cluster clears the question.** The cluster sits lower, and the decorative vertical stagger is dropped on non-lens clusters. | index.css | At 375×667, H1: question ends at 111, spheres start at 177. H5 Q1 with 3 chosen: hint ends at 196, cluster spans 202–536, Continue at 544. |
| EXP-17 | **Video holds stop on the right frame.** `playUntil` now pauses on the presented hold frame (`requestVideoFrameCallback`) and seeks only if it is off by more than half a frame. The rAF loop stays as the fallback. Still native 1× and a true freeze: no playbackRate, no scrubbing. | TheDepths.tsx | Real transitions H4→RESONANCE and H5→FINISH: last presented frames were 8.200 and 9.400, with **zero seeks**. Before, 8.2 froze on 8.166, and RESONANCE/FINISH/SURFACE_CUT showed one frame past the hold and snapped back. |
| EXP-07 | **44px touch targets with no visual change.** Invisible hit areas on the Veil pill (`.hold-next`) and "Start again". | index.css | Code review only. Pill appearance is unchanged. |

`tsc -p tsconfig.app.json` is clean. ESLint shows 40 problems, all pre-existing: HEAD has 41, and removing the dot row fixed one ref read. None of them is in new code.

## 3. Prototypes for review

Each is a standalone page using the app's own sphere/ember/pill CSS over the real hold frame. Open the files directly in a browser.

### P-H4 · Clear practice, then Ready · Set · Go
[`../prototypes/h4-ready-set-go/index.html`](../prototypes/h4-ready-set-go/index.html) (add `?motion=still` for Still Water, `?diag=1` for the captured timing)

1. **One instruction, read at your own pace:** "Tap the word that is more you." / "Two words at a time, a few seconds each. If neither is you, let them fade. That counts too." Nothing is timed. Two hairline *seats* already show where the words will appear. **Try one first** starts the practice.
2. **Labelled rehearsal:** PRACTICE · "Tea or coffee?" runs on the real clock but is unscored. A quiet line confirms the result ("Coffee. That's all it is." / "It faded. That's fine. Whatever fades stays a secret."). Then **Practise again** or **I'm ready**.
3. **Ready · Set · Go:** three 760ms beats between the seats. Each word condenses, holds and lifts like a chosen sphere. One hairline ring in her colour closes inward, like a drop meeting a surface. The seats warm on "Go", and the first pair condenses where practice did. There is no numeral, no flash, and nothing loud.
4. **The nine:** "Which is more you?" with no history row. The window is measured from **readable** (fully condensed), never from the instruction.
5. **Interruption:** a hidden tab pauses the pair. On return, "Set · Go" replays and the same pair is shown again.
6. **Still Water:** no deadline. "Neither — let them go" records `skipped`.

Screenshots: `shot-1…6-*-{1440,390}.png` in the prototype folder.

Questions for Robin: (a) is the instruction copy right? (b) should the nine show a quiet "3 of 9" kicker, or no progress at all (the prototype has none)? (c) Ready/Set/Go once only, or also on returning from an interruption (the prototype does both)?

### P-H5 · Two directions
[`../prototypes/h5-two-directions/index.html`](../prototypes/h5-two-directions/index.html) (`?concept=a` / `?concept=b`)

- **A · The figure.** The Dionysus continuous-line coupe/figure draws itself at the centre. Round 1, *ONE OF TWO · OUTWARD*, "What draws you right now?": a choice sends a mote **out** from her to the word and leaves a flowing thread. Round 2, *TWO OF TWO · INWARD*, "What do people come to you for?": a choice brings light **in** from the word, and her spirit-point warms. A small caption keeps round 1 visible ("drawn toward freedom · peace · wonder"). On phones the field is a 3×3 grid under the figure. The light still travels, but threads don't stay, because a standing line would cross neighbouring spheres.
- **B · Two plain rounds.** Today's cluster, with the same kickers and copy, plus one turning beat between the rounds: *"Now turn it around."*
- **Both keep:** up to three per round, reversible, one Continue, no ranking and no intensity. Answers are stored in vocabulary order, so movement and tap order are decorative only (agreed with the matching owner).

**My recommendation:** test B's wording first, because it is the cheapest change that might be enough. Keep A if testers still blur the two questions. A's direction-of-light is the clearest signal of the change, and the figure ties H5 to the H8 breath figure.

Questions for Robin: (a) A, B or A-lite (A's motion with B's layout)? (b) Prompt wording: "What draws you right now?" (proposed) versus today's "What are you most drawn toward right now?"

### P-TYPE · Type directions and flavour icons
[`../prototypes/type-directions/index.html`](../prototypes/type-directions/index.html) and [`../prototypes/flavour-icons/index.html`](../prototypes/flavour-icons/index.html). Full notes and licences: [type and icons comparison](2026-10-06-type-and-icons-comparison.md).

- **Recommended: C, Switzer** for questions, hints, choices, labels and buttons, with **Playfair kept** for the cocktail name, tagline and reading.
  - It wraps the least on phones and set every test name, including Vietnamese and Polish.
  - It is free (Fontshare).
  - It drops a family, because Jost retires.
  - Try Switzer **500** on the question and the H4 pair before locking it. At 400 it looks thin on the bright H4 frame (I checked the screenshot).
- **Fallback: D, Satoshi.** It is the most legible on bright frames, but it can't set Vietnamese ("Nguyễn" breaks) and reads slightly app-like.
- **Neue Montreal is out.** It has no free webfont, the render used a labelled stand-in, it needs a paid Pangram licence, and it reads closest to SaaS.
- **The trade-off for Robin:** moving the questionnaire to a sans overrides the 2026-09-29 decision to make Playfair Display the main face. A large part of today's mood is Playfair italic over footage. Under C the mood moves into the reveal, where the serif stays.
- **Flavour icons:** nine 24×24 line marks with a 1.5 stroke, round caps and no fill. Placing the icon **above** the word works, while beside the word crowds "Citrusy" on phones. Weakest at phone size: Spicy (can read as the Fresh leaf), Bitter (generic bottle) and Smoky (reads as steam). Those three need a second pass before building. I checked the live H6: the app's veil keeps question and icons readable over the foam. The comparison's "unreadable on foam" note comes from raw, unveiled frames.
- Unrelated finding for the reading: on phones the uppercase kicker breaks at the hyphen in a name like "Ångström-Núñez". The fix is to bind the name with a non-breaking hyphen. Minor.

### P-VIDEO · Smoother arrivals
Diagnosis ([report](2026-10-06-video-arrivals.md)):
- **Mostly the footage.** At all eight holds the camera is still at full speed when the freeze lands. At five it is *accelerating* into the stop. HIDDEN (5.7) is the worst.
- **The source is ~24fps padded to 30**, with 93 duplicate frames. This explains why slowing `playbackRate` read as lag.
- **The runtime overshoot** is fixed (EXP-17).
- **Overlays.** Text pops on the stop frame at GRAVITY, RESONANCE, FINISH and TRACE. SEED, HIDDEN and BREATH leave 0.4s, 0.9s and 1.1s of dead stillness first.

Decisions for Robin (watch the candidates in motion first; they are in `../prototypes/video-arrivals/`):

| # | Decision | Candidate | Note |
|---|---|---|---|
| V1 | Bake ease-in arrivals into the asset | `journey-eased-arrivals-24p.mp4` (10.5MB): each arrival's last 0.5s slows to a stop over 1.0s, and the hold frames are the original pixels. `journey-eased-both-24p.mp4` also eases the departures. | Ascents grow ~4s in total. New hold constants are in the report. The WebM (Chrome's first source) must be re-rendered to match before adoption. Very thin strands may soften. |
| V2 | If V1 is declined: keyframes only | `journey-keyframed.mp4` (12.0MB) | Prevents a ~163-frame decode spike on Safari for any residual seek. |
| V3 | One text rhythm against arrivals | Text enters as the camera settles. Trim HIDDEN's 900ms empty intro to ~450ms (SEED's rhythm). Start RESONANCE's night veil during the ascent rather than after the stop. | The HIDDEN intro merges with the P-H4 instruction if that is adopted. |

## 4. Decisions needed from Robin (from the mobile audit)

| # | Hold | Issue | Options | Recommendation | Meaning change? |
|---|---|---|---|---|---|
| D1 | H3 | Any touch-up commits: a tap, a vertical scroll attempt, or a tap on a pole word | 1. Drag, then confirm with a "Let go here" pill or a second tap on the mote. Tap-to-jump never commits.<br>2. Five discrete taps | **1** (the 0–100 value is kept) | 1: no. 2: yes, and needs the matching owner's sign-off |
| D2 | H2 | Liqueur names appear only on hover/focus, so touch users never see them before choosing | A. First tap previews (name + tint), second tap commits<br>B. Always-visible small captions on touch | **A**, which mirrors desktop hover | No |
| D3 | Global | The Dionysus mark exits the journey with one tap | Make it inert in the depths, or ask before leaving | **Inert in the depths.** Keep it live on the landing/reading. | No |
| D4 | Landscape | Rotating mid-journey breaks H5/H6 (clipped cluster, overlaps) | Compact landscape layout, or a gentle "turn your phone upright" veil mid-journey (as the rope does at the threshold) | **Upright veil** for now; it's the smallest reliable fix | No |
| D5 | H7 | The single-line trace hides its own start | 2–3 line auto-growing field on phones | Yes | No |

Minor items I'll apply without asking unless you object: clamp H8 echoes inside the gutter at ≤390; give the reading page's fixed mark a faint fade so text doesn't scroll under it (this must not read as a dark box); raise the H6 struck-word contrast slightly.

## 5. Still to come in this cycle

| ID | Slice | Status |
|---|---|---|
| EXP-08 | Type directions, compared | explored. Waits on Robin's choice of C / D / keep current. |
| EXP-09 | Flavour icons | explored (sample set). Spicy, Bitter and Smoky need a second pass, then build into H6 above the word. |
| EXP-10 | Video arrivals: retimed asset, MP4 keyframes, consistent text timing | diagnosed ([video arrivals](2026-10-06-video-arrivals.md)). Runtime part built (EXP-17). Asset and timing wait on Robin (V1–V3 below). |
| EXP-11 | Build the chosen H4 practice + Ready/Set/Go in TheDepths | waits on Robin's P-H4 review |
| EXP-12 | Build the chosen H5 concept | waits on Robin's P-H5 review |
| EXP-13 | Mobile decisions D1–D5 | waits on Robin |
| EXP-14 | Wire H4 status/readable-ms/interrupted, practice repeats and the H3 `moved` flag to `shared/answers.ts` diagnostics | waits on the matching owner publishing v3 (agreed format, below) |
| EXP-16 | H5 round 1 grows to 12 words (Q12, approved by Robin to pursue: drop Mischief; add Knowledge, Influence, Making, Caring; Robin sets final labels). Fit tested on production CSS. Today's 3-column cluster overlaps at 375, 390 and desktop. Phones 3×4 without the stagger (sphere clamp(74px, min(24vw, 11.4vh), 104px)) and desktop 4×3 clear everywhere: at 375×667 the margins are +10 to the head and +7 to Continue. Labels must stay ≤ ~10 characters per line. Shots in `2026-10-06-h5-12-word-fit/`. | fit verified; logged as an unknown on ticket 1.9. Ticket 1.1 publishes 9 words; 1.9 switches round 1 to 12 once Robin sets labels (the label limit goes to him with that question). Build the cluster modifier then. |
| EXP-15 | Sound: three loop concepts (warm nocturnal ambient, felt piano, faint glass harmonics, 60–70 BPM, no vocals, a seamless 2–3 min loop; piano-led / textural / acoustic-jazz-adjacent), a clear sound control, fades, tab/background handling, through the spine's single audio director | later; the type/icons/sound exploration conversation owns the samples |

## 6. Coordination record

**Matching owner, 6 Oct: answer format v3 agreed and locked.**
- `lens` becomes a `LensId` (`another-side` replaces "Someone else"). It is context only and not scored.
- The seed is a stable id and is narrative/image only.
- `gravity` is 0–100, with absent meaning never reached.
- `texture` is `a`/`b`, with absent meaning no choice.
- `drawnToward` and `soughtFor` hold ≤3 each, in vocabulary order.
- Vetoes are fixed ids. There is no vessel.
- Browser-only diagnostics, never scored in v3:
  - `h4Mode` timed/untimed;
  - per pair: status (chosen | timedOut | skipped | notPresented), ms from readable, and `interrupted`;
  - practice recorded separately, with repeats;
  - H3 `moved` per axis.
- Agreed additions from this track:
  - a hidden tab pauses and re-presents the same pair, so it never produces `timedOut`;
  - H5 movement and order are never captured;
  - an H3 discrete control needs matching sign-off.
- Until `shared/answers.ts` lands, these hooks stay local UI state. `types.ts`/`App.tsx` belong to the integration owner.

**Matching owner, later on 6 Oct:** tickets filed under `_bmad-output/initiative-dionysus-continuation/epic-matching-and-authored-reveal/tickets.toml`. This track's lane is ticket **1.6**: write v3 ids plus the browser-only diagnostics, after 1.1 (`shared/answers.ts`) and 1.5 (App integration). Robin approved pursuing Q12 (12 words in H5 round 1; rationale in `agent/spec/matching-model.md` §Recommended question edit). The fit report was sent back (EXP-16).
