# Designer playtest review, 17 October 2026

**Source:** Robin playtested the whole journey with a professional designer friend and brought about 25 raw comments. The comments were triaged into three batches and some long tracks, then built the same day with Robin in one Claude Code session (Opus 5.5).
**Status:** Batches 1–3 are **built and uncommitted**. Robin is moving the rest of Dionysus to another model, so this file is the handoff. Read "Start here" first.

## Start here (handoff)

- **Nothing from this review is committed.** Run `git status` in `Dionysus/` and you will see about 20 modified files and several new ones (listed under "Files touched"). Robin commits only when they ask. Never reset, stash or overwrite these changes.
- **Last verified state:**
  - The three typechecks pass: `npx tsc --noEmit -p tsconfig.app.json`, plus the shared and node configs.
  - `npm test` passed 1950 tests.
  - `npm run e2e` passed 8/8 after going back a question was built.
  - `npm run import:pours:check` is in sync.
  - Lint is below HEAD. The three edited pours have 0 lint errors.
- **Next step, which Robin agreed:** fix **H7 being faint on the pale foam**. The trace prompt and field sit centred over light foam, so they almost disappear. Make the ink stronger and add a soft lift around the letters. Do **not** put any dark plate, scrim or shadow block behind the text (see the standing rules).
- **After that:** a checkpoint commit, but only when Robin asks. Then the long tracks: a sound-effect family made from the score, and the 4K film ([journey video remake](2026-10-06-video-arrivals.md); the candle concept is rejected).
- **Waiting on Claude (or the next model):** Sonnet has already run the archival image search. Its candidates are in `../prototypes/archival-candidates/` (see "Archival images"). They must be checked by eye, and each must pass a Hester fact-check, before anything is registered.
- **Waiting on Robin:**
  - a UK rights check on the Shackleton photo before public launch;
  - whether the archival image trial extends beyond one pour.

## Standing rules from Robin (do not relitigate)

- Work inside one project. Ask before restructuring, moving or deleting anything. Ask before replacing any factual or on-screen copy.
- Don't edit `src/types.ts`. Edits to `App.tsx` are approved only for the landing copy and back navigation.
- Video: only `playUntil` at 1×, then freeze on the hold. Never vary `playbackRate`, and never scrub the video for an effect. Going back seeks once, and a held-frame dissolve hides the cut.
- No dark of any kind behind text. Pills are quiet hairlines, and choice motion is slow and physical.
- Say "The cocktail I've made for you"; never a bare "yours".
- Don't re-propose any of these:
  - AI-generated faces of real historical figures;
  - raising the flavour weight in matching;
  - the candle film concept;
  - the large lifted "pull" sentence;
  - a "make it yours" flavour twist (the flavour change was copy only).
- `npm audit` is deferred; don't ask about it again.
- Temporary files go in a scratch directory, never in the app folder. Don't edit files while e2e is running.
- Every dateline, "A true story" label and image caption is fact-checked by Hester (`dps-hester`) before it ships. The public-domain proof must cover **the exact file**, not just the moment it shows.
- Pour copy: the dossiers in `design-artifacts/pours/<pairing>.md` are the source of truth. Edit the dossier, run `npm run import:pours`, then check with `npm run import:pours:check` and `python3 skills/dps-tools/scripts/lint_pour.py <pairing>`. Run the lint from `GenAI Projects/`.

## Why the review mattered

The designer's two deepest points both hold up in the code:

1. **The film stops mid-move.** Holds froze while the camera was still at full speed. The fix is the "eased both" film, which is now the default (see Batch 1).
2. **The copy promised taste that the matcher doesn't deliver.** Flavours change the top pick only about 4% of the time, and Experimental is persona-only. Robin chose to fix the copy only (see Batch 3), not to raise the flavour weight.

## Batch 1: quick wins (built)

- The tag uses the guest's first name.
- The Keep link shares only the link.
- The card:
  - gets a short ingredient list (`shared/data/card-ingredients.json`, written by `scripts/export-card-ingredients.ts`);
  - drops "Poured for {name}".
- The H10 cue scrolls gently, lets the reading peek above the fold, and no longer overwrites `#pour=`.
- H5:
  - the soughtFor labels are now **Clarity** (id `reality-check`) and **Mischief** (id `little-chaos`);
  - the ids and weights are the same, and `legacyLabels` map the old phrases (`shared/vocab.ts`, `agent/spec/matching-model.md`);
  - the let-go blink and the stacking are fixed.
- The H6 loop is now visible, and its hint is extended.
- The `--legible` shadow is removed from H0–H5.
- The **eased-both film** is the default `public/journey.webm` and `.mp4`, at 1440p. The originals are kept in `../prototypes/video-arrivals/original/`.

## Batch 2: journey layout (built)

- **"Middle, then rise":** every question opens in the middle and rises. The CSS is `.hold-arriving`, `.hold-head.is-arriving` and `.hold-body` in `index.css`. It is on H1, H3, H5 (round 1 only), H6 (both beats) and H7.
- **H4:**
  - a centred "or" (`.ember-or`) sits between the pair and fades in with it (0.42 s);
  - the top question fades once the real pairs begin.
- **H6:**
  - the flavours start low, wait for the question to rise, and start more gently;
  - the loop cue, which Robin picked as "sinks back", draws a flavour into a faint bead under the question, and the bead sinks back beside its lane (`RISE = 0.9` in TheDepths, about 3.5 s a lap, with no words);
  - the convection current and the one-off glint on return were rejected.
- **Copy (Robin picked):**
  - H6 title: "Which flavours do you lean towards?"
  - Breath echoes: "a taste for sweet & bitter" and "Campari Red, the first drop".
- **Landing copy and the back-swipe guard** are in `App.tsx`. The guard re-pushes a same-URL history entry, so Back never leaves the site mid-journey.
- **Going back a question** is in `TheDepths.tsx`.
  - **How it works:**
    - TheDepths listens to `popstate` and calls the latest `goBack` through `goBackRef`.
    - It first steps back within a hold: through the gravity rounds, and from H6's leave-out beat back to the flavours.
    - Then it goes to the previous hold. An ascent goes back to the hold it left.
  - **The film never runs backwards:**
    - the current frame is drawn onto a canvas (`rewindRef`);
    - the video seeks once to the earlier hold;
    - the held frame dissolves away over 1.3 s.
  - **Kept on return:** the name, the gravity marks, the H6 picks and the H7 trace (`restoreFinish`, `restoreTrace`).
  - **Opens fresh:** H1, H2 and H5. H4 replays from its line.
  - **No going back** from the breath onwards.

## Batch 3: decisions with the designer (built)

- **Type:**
  - Robin picked specimen direction **C** with Cormorant 600 poles. The board is in `../prototypes/type-specimen-2026-10-17/`, and it can be re-shot with `node capture.mjs` while the dev server runs.
  - Playfair Display stays for the questions and titles.
  - `--font-text` is now EB Garamond.
  - The new `--font-pole` is Cormorant Garamond italic 600, sized ×1.33, and is used on the H3 poles only.
  - Playfair (the text cut) is dropped from the `@import`.
  - `DESIGN.md` is updated.
- **Expectation copy pass:** applied (see the copy in Batch 2). The flavours got a copy reword only.
- **Datelines and "A true story" labels:**
  - **Where they live:** `shared/data/story-lines.json`, keyed by pairing (`dateline`, `trueStory`, optional `image`), with a test in `story-lines.test.ts`.
  - **The full record** (sources and flags) is `../prototypes/archival-trial-2026-10-17/story-lines-record.json`.
  - **Five are trueStory false:**
    - hero-lover (Bond, fiction);
    - jester-innocent (Wodehouse);
    - regular-guy-lover ("the story goes");
    - magician-outlaw (the Mint Julep hoax);
    - caregiver-jester (the El Alamein taxi).
  - **The big lifted "pull" line** was built, then removed the same day: Robin found it arbitrary.
- **Archival image trial, one pour:**
  - explorer-ruler (Shackleton) shows the furthest-south photo of 9 January 1909, using the **published book plate** (Commons "Nimrod South 9 Jan 09.jpg") in `public/archival/`.
  - Hester rejected the first scan (AWI nimrod_42) because it was an unpublished exposure.
  - The provenance is in `../prototypes/archival-trial-2026-10-17/PROVENANCE.md`.
  - The UK rights are **not proven**. There may be a 1995 revival if the photographer was Marshall, who died in 1963.
  - Robin likes the image and wants to keep it.
- **Hester audit:**
  - 12 batches were checked, and 127 of 132 passed.
  - 5 dateline fixes were applied. The record is `../prototypes/archival-trial-2026-10-17/hester-audit-2026-10-17.json`.
- **Audit decisions** (Robin said "go"; recorded in PROVENANCE.md):
  - jester-explorer ("Unrehearsed") took Wren's v5 epigraph and ¶1–4 of the story, which fixes the six lines Hester failed. ¶4 now names the Zacapa rum the recipe already had. The shipped tagline and whoYouAre were kept.
  - magician-outlaw: "For about twenty years".
  - sage-lover: "to write it down".
  - magician-outlaw and caregiver-jester: trueStory set to false.
  - The no-flag and no-likeness image rules apply to **generated** images only, never to real archival photos.

## Archival images: Sonnet's candidates (not yet verified)

The prompt is in `../prototypes/archival-trial-2026-10-17/SONNET-IMAGE-SEARCH-PROMPT.md`. Sonnet wrote candidates to `../prototypes/archival-candidates/<pairing>/` on 17 October. Nothing is registered in the app.

| Pairing | Sonnet's first pick | Its own concerns |
| --- | --- | --- |
| jester-outlaw | *The Balance*, 1806, p.146 (the editor's reply), high | A rough microfilm scan with long-s type |
| magician-regular-guy | Thomas's 1862 *Bar-Tender's Guide*, Blue Blazer cut, p.77, high | The cut isn't captioned as Thomas; see NOTES.md |
| lover-hero | *New York World* board game, medium | Too busy at 640 px, so it needs a crop. The Bly print's rights come only from a Commons tag |
| caregiver-explorer | Priestley by Sharples, 1797, medium | Drawn in America, aged about 64. The 1772 apparatus plate is the strongest match but only 880 px wide |

**To register one:**
1. Look at the image yourself.
2. Have Hester verify the caption and the public-domain status of the exact file in both the US and the UK/EU.
3. Copy the image to `public/archival/`.
4. Add `image` to the pairing's entry in `story-lines.json`.
5. Run the tests (`story-lines.test.ts`, `scripts/story-lines-images.test.ts`).

Whether to go beyond explorer-ruler at all is Robin's call.

## Files touched (all uncommitted)

**Modified:**
- `agent/spec/matching-model.md`;
- the pours `jester-explorer`, `magician-outlaw` and `sage-lover` (both the `.md` dossiers and the `.json` files), plus `shared/data/manifest.json`;
- `dionysus-experience/` files:
  - `DESIGN.md`;
  - `public/journey.mp4` and `public/journey.webm`;
  - `shared/vocab.ts` and `shared/answers.test.ts`;
  - `src/App.tsx`, `src/components/TheDepths.tsx`, `src/components/ResonanceWorld.tsx` and `src/components/TheReading.tsx`;
  - `src/engine/card.ts` and `src/engine/record.test.ts`;
  - `src/index.css`.

**New:**
- `shared/data/story-lines.json` and `story-lines.test.ts`;
- `shared/data/card-ingredients.json`;
- `scripts/export-card-ingredients.ts` and `scripts/story-lines-images.test.ts`;
- `public/archival/`;
- in `design-artifacts/evolution/prototypes/`: `archival-trial-2026-10-17/`, `archival-candidates/`, `type-specimen-2026-10-17/` and `video-arrivals/original/`.

## Long tracks (not started)

- A sound-effect family made from the "Glass Chords" score.
- The 4K film remake: it is plates-first, and it keeps the rising-through-a-cocktail metaphor. The foam and phone-crop problems are measured.
- Later: more realistic persona images, and a history of the guest's choices.
