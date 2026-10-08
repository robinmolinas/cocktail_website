# Dionysus — Experience Specification

Created 8 July 2026 · Reconciled 8 October 2026

This is the current experience contract. It incorporates the later dark reveal, TheReading, September interaction changes and October approvals. Its earlier July text is preserved in the [review archive](_archive/2026-10-08-document-refresh/2026-07-08-experience-master-spec.md).

## Authority and evidence

Robin's later explicit decisions supersede earlier concepts. [The design log](_progress/00-design-log.md) records those decisions and dated browser checks. [DESIGN.md](../dionysus-experience/DESIGN.md) owns appearance and motion. The [pipeline specification](../agent/spec/SPEC.md), [intake contract](../agent/spec/intake-contract.md) and [architecture spine](../agent/ARCHITECTURE-SPINE.md) own answer semantics, matching, privacy and technical boundaries.

Source code establishes what is implemented. A planned requirement is not built merely because it appears here. The [continuation status](2026-10-06-continuation-status.md) tracks the distinction.

## 1. Journey and surfaces

The active app is `dionysus-experience`. Its normal flow is **landing → depths → reading**; gifts and unknown routes have their own states. The current reveal component is **TheReading**, replacing TheSurfacing.

| Hold | Current interaction | Data meaning |
| --- | --- | --- |
| H1 · Threshold | Quiet introduction, name, six lenses; final lens **Another side of me** | Identity/context only; never another person's identity |
| H2 · Seed | Eight liqueur-colour drops | Seed colour; not an archetype score |
| H3 · Gravity | Five mote choices on a continuous 0–100 lean | Personality evidence; same range on every device |
| H4 · Hidden Self | Centred instruction, rising launch, unscored **1 / 2** example, nine timed binary pairs | Caught pole or absent; timing/status remain browser-only and unscored |
| H5 · Resonance | **A world of your own**; soughtFor first, drawnToward second | Up to three reversible choices in each round, stored in vocabulary order |
| H6 · Finish | Nine flavours with icons, then five veto categories | Bounded flavour fit and whole-pour eligibility; no glass choice |
| H7 · Trace | Optional personal line | Browser only, including anything derived from it |
| H8 · Breath | Local echoes, figure, preparation wait | App owns the result; future remote request has the AD-9 cap |
| H9 · Letting Go | Transition through dark into the cocktail's room | Native video; no white-bloom rebuild |
| H10 · Owner reading | Cocktail, epigraph, whoYouAre, yours and recipe/ritual | Authored content; only yours may later be tailored |
| H11 · Gift | Same room and recipe, with an invitation to discover one's own | Personal reading withheld |

The Entrance headline is **“Discover your Spirit Within”**; the primary button is **“Discover my cocktail”**. The supporting note promises about five minutes and a recipe plus reading. Preserve the loved hero composition.

## 2. H4 and H5 decisions

H4 v4 is built and approved. The instruction is **“Tap the word that is more you.”** The timed hint is **“Two at a time. Go with your gut, or let both fade.”** Still Water uses **“Two at a time. Take your time, or let both go.”** The lines rise together; the example is **1 / 2**, on the real clock but unscored. Tea/Coffee practice, Ready/Set/Go and history bubbles are superseded.

Blind taps are ignored. A hidden/frozen tab re-presents the same pair with a fresh window, without a count-in. Still Water has no deadline and an explicit **Let them cool** action. Use the actual readable threshold defined by the interaction, not time spent reading the introduction, for diagnostics.

H5 is built and approved. Round 1 gathers **what people come to you for** into the central sphere; a tap or carrying a word into it gives the same answer. Round 2 marks **what draws you** with rings. Both rounds remain reversible; distance, speed and tap order do not score. The H4-to-H5 nightfall and H5-to-H6 gather/condense/release handover are implemented with reduced-motion counterparts.

**Q12 approved 8 October:** remove Mischief from drawnToward and add **Knowledge, Influence, Making, Caring**, giving twelve words in the second round. The app and v1 evidence still use nine until ticket 1.9 lands. Recheck the actual ResonanceWorld layout on phones and regenerate calibration, reachability, distribution and fixtures before claiming Q12 implemented.

## 3. Reading, imagery and print

The persona scene fills the room. On portrait phones, the opening scene occupies the first screen with its physical name tag unobscured; the title and reading follow below in document flow. The existing pilot passed the recorded 320, 375 and 390px checks. That result is not approval of every new image candidate.

**Share your cocktail** and **Save the recipe** appear at the bottom only. Printing creates two clean sheets: recipe and portrait first, letter second. The 8 October print fix removes the navigation veil, mark and shadows from print.

The **Sacred Glass Rule** prohibits tinting or grading persona images. Seed colour appears as lettering and light. Portrait and wide assets, tag geometry, physically truthful serving and candidate acceptance follow the [Persona Image System](persona-image-system.md). Tagline/editorial approval is not a prerequisite for image creation when recipe, serving and personality are settled. Generation, export, browser acceptance and public integration are separate states.

## 4. Matching and privacy

The offline Pour Studio supplies one canonical recipe and authored reading per ordered pairing. Deterministic selection filters unauthored/vetoed pours, ranks eligible pairings and returns three; the future Bartender chooses within those three and tailors only yours. Recipes never change at runtime. Invalid or failed choices resolve to shortlist[0], with authored copy verbatim.

The browser keeps trace, trace-derived content and diagnostics. The guest's name never reaches the LLM. A private reading is shown only to its owner in-session; neither storage nor a gift link carries it. These rules supersede July's persisted emotionalFit/rationale and shared full-narrative proposal.

The primary App still uses a fixed pilot. Shared components being completed does not establish the normal journey's answer-to-pour integration or live Bartender behavior.

## 5. Sharing and routing

**Current implementation:** gifts use `/#pour=` with the legacy full-result fragment; TheReading's gift mode withholds the reading. The API, persisted pour links, crawler HTML and dynamic OG are planned, not live-verified here.

**Target, AD-7–AD-14:** the server stores only `{v, id, pairing, name, seed, source, createdAt}`. With a pour id, share `/pour/:id`; without one, share a minimal fragment containing `{pairing, name, seed}`. Both guest forms render the recipe without the private reading. House pours are authored constants and may show their own house reading. Unknown/dead ids lead to the poetic 404.

The approved **taste one already poured** whisper and house-pour routing remain Epic 2 work. They are not the current development jump controls.

## 6. Motion, mobile and resilience

- Play journey footage at native 1× via `playUntil`, then freeze on the hold frame. No variable-speed runtime playback or arbitrary scrubbing.
- Keep the dark-to-dark reveal and the user's seed as light. No chapter numbering or dashboard chrome in the guest journey.
- Adapt each hold to phones while preserving answer meaning. H3 remains continuous. H5 carry is optional; tap remains available.
- Honor reduced motion, keyboard interaction, resize safety and legible text. Verify desktop, portrait phone and orientation changes for the affected slice.
- Judge transitions against approved choreography, including the 5.5s H5 nightfall. The old blanket <4s limit is historical. Smooth UI motion is a goal; the source video is not promised to be 60fps.
- Future remote failure is silent, with an authored local result and AD-9's bounded wait. No apology/exemplar failure branch.

Broader mobile controls and the faint kicker after the portrait scene cue remain follow-ups in the [evolution brief](evolution/analysis/2026-10-06-experience-evolution-brief.md).

## 7. Type and sound

**Type settled:** retain Playfair Display / Playfair / Jost. H1 lens phrases use weight 400. Alternative type directions were declined. H6 flavour icons are built; veto words have no icons.

**Sound integrated 2026-10-08, pending Robin's listening pass and rights record:** the "Glass Chords" ElevenLabs take, cut into chapter cues and played by `src/audio/` along the Water & Ink arc (design log, 2026-10-08). Default on, remembered, unlocked by the door. The reserved seam is one audio director, unlocked by a user gesture, with a clear control, persisted preference, silent failure and no stage/video blocking. Still Water keeps any approved bed and omits transient effects.

Retimed-video candidates are trials awaiting adoption, not the production footage contract. Any adoption must update matching MP4/WebM assets and hold constants together.

## 8. Release evidence

Release requires the applicable content/strict-store checks, answer-based reveals, fixture coverage, privacy/fallback tests, desktop/phone parity and browser/print review. All 132 authored pours are eligible under the strict gate; formal approval status is kept separately. Completeness requires all 132 and at least twelve veto-free pours; development requires at least three. Catalogue gates do not prove every historical statement or every human-feel criterion.

The original completion/save percentages are portfolio aspirations, not measured findings. Current status and remaining verification are in the continuation handoff; historical decisions are in the design log and review archive.
