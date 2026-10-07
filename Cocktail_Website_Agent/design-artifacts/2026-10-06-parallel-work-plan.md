# Dionysus continuation plan — 6 October 2026

Purpose: organize the user's design, cocktail content, and questionnaire algorithm work into parallel conversations with clear deliverables and handoffs. This is a planning artifact. It does not approve cocktails, replace copy, generate assets, or implement the redesign.

BMAD continuity review: 6 October 2026. The three-track structure is retained. This plan now routes work through the existing WDS, Dionysus Pour Studio, and BMAD Method artifacts and preserves the finalized architecture's runtime rules.

## Starting point checked in this planning session

- The active application is `Cocktail_Website_Agent/dionysus-experience`. The user tests it at localhost:5180. This plan is grounded in source files, studio records, and recent chats; the live desktop/mobile experience has not been visually audited in this session.
- All **132 ordered pairings** exist: 12 primary archetypes × 11 different secondary archetypes. A × B and B × A are separate outcomes.
- All **132 dossiers and 132 recipe specs** exist. Dossier status is **112 draft, 16 flagged, 4 approved**. Authored does not mean approved. The approved pairings are creator-hero, innocent-regular-guy, magician-outlaw, and sage-lover.
- The app currently reveals **Down the Line / The Visionary** for every completed questionnaire. `App.tsx` uses `VISIONARY_SAMPLE` in both result preparation and completion.
- The older matching engine exists, but it does not score the active H3 gravity, H4 texture, or H5 attraction answers. It composes recipes from templates rather than selecting the authored collection. Reconnecting it unchanged would leave colour as the active persona-scoring input under normal questionnaire defaults; a read-only calculation found only six ordered outcomes across the eight colour choices. This is a conditional source finding, not a full reachability proof.
- H4 saves the chosen word, but not response time. Timeout and explicit skip both leave an absent answer. Reduced-motion mode removes the deadline.
- Current type uses Playfair Display, Playfair, and Jost. Share/save actions currently appear both near the reading title and at the bottom.
- The October 2 tagline review covers 65 complete pours. Recommendations have not been applied to dossiers; the file includes the user's yes/no/retry annotations and feedback that a line can be too specific to the story rather than the persona.
- There are 17 portrait/wide image pairs in the application. Existing assets and approved visual pilots are different counts; the production image system identifies three approved visual pilots.
- Existing local changes belong to ongoing work. Preserve them; do not reset, stash, or overwrite them as part of starting these conversations.

## Decisions already made by the user

1. Preserve the overall Dionysus atmosphere and immersive experience while improving clarity, motion, and mobile use.
2. Remove the noninteractive answer/history bubbles from H4 rather than making them navigation controls. This applies to H4's history indicators, not the selectable spheres elsewhere.
3. Replace the final H1 lens **Someone else** with **Another side of me**. Keep the user's name; explore another version of the same person. Do not introduce another person's identity.
4. Keep **Share your cocktail** and **Save the recipe** at the bottom of the reading only.
5. Finish the relevant cocktail before producing its final images.
6. Respect the later image direction from the existing image chat: functional metal objects are allowed. Avoid metal defining the environment, such as steel counters, industrial tables, or chrome backdrops.

## Build on the existing BMAD framework

This is an evolution of the existing product. Preserve the product brief, trigger map, scenarios, design history, architecture decisions, pour dossiers, and agent memories. Use focused updates; do not restart discovery, reinstall BMAD, or create a competing set of requirements.

The shared installation is at `/Users/robin.molinas/Documents/GenAI Projects/_bmad`. Its team overrides already pin BMAD outputs to `Dionysus/Cocktail_Website_Agent/_bmad-output`, WDS artifacts to `Dionysus/Cocktail_Website_Agent/design-artifacts`, and Pour Studio artifacts to the existing `design-artifacts/pours` folder. No active initiative is set in the inspected config layers. The repository's vendored BMAD help uses the newer ticket-tree workflow; the shared help CSV still describes older sprint tooling. Follow the installed skill's own help for execution, preserving the legacy artifacts and links. Any initiative selection or artifact migration should be an explicit operation, not an incidental effect of starting a chat.

### Existing sources and owners

Paths in this table are relative to `Dionysus/Cocktail_Website_Agent`.

| Track | Existing sources to read first | Workflow and owner | Record the result in |
| --- | --- | --- | --- |
| Experience design | `design-artifacts/A-Product-Brief/project-brief.md`, `design-artifacts/B-Trigger-Map/00-trigger-map.md`, `design-artifacts/C-UX-Scenarios/00-ux-scenarios.md`, `design-artifacts/2026-07-08-experience-master-spec.md`, `design-artifacts/2026-09-18-experience-review.md`, `design-artifacts/_progress/00-design-log.md`, and `dionysus-experience/DESIGN.md` | WDS/Freya; `wds-8-product-evolution` for focused improvements, with the existing propose → build → browser verification → log rhythm | Existing scenario/design artifacts and design log; feed agreed intake changes to the spec owner |
| Cocktail content | `design-artifacts/pours/STUDIO-RULES.md`, `design-artifacts/pours/_studio/index.md`, `design-artifacts/pours/_studio/review.xlsx`, batch summaries, and existing tagline review | Pour Studio review desk; Wren for voice/persona, Hester for facts, Tomás for recipe/checks; rework only affected pours through `dps-author-pour` | Existing dossiers/specs, rooms, review desk and voice lessons; approval stays with Robin |
| Matching and integration | `agent/ARCHITECTURE-SPINE.md`, `agent/.memlog.md`, `agent/spec/SPEC.md` and its companions, plus the current intake source | `bmad-spec` refresh first; `bmad-architecture` only for actual shared-decision changes; `bmad-ticket` for approved task breakdown; `bmad-build` per implementation task | Existing contract and decision history, then the configured BMAD output area for the joined task/build records |
| Cocktail images | `design-artifacts/persona-image-system.md`, the reviewed pour and current application `DESIGN.md` | Existing image-production work and Tomás's corrected physical drink brief | Existing asset folders and image metadata, with a single integration owner |

The older `Cocktail_GPT/specs/spec-cocktail-agent-pipeline` material remains a preserved reference. The active backend contract is the Website Agent's `agent/` material. Its `SPEC.md` and companions explicitly say they are partly superseded pending a BMAD spec refresh; `ARCHITECTURE-SPINE.md` is marked final and takes precedence over their conflicting older provisions. Historical design-log entries retain their dates and are not current instructions where later user decisions supersede them. Observed source behaviour establishes implementation gaps, not permission to change an agreed requirement.

### Architecture rules carried into this plan

- **Hybrid matching:** deterministic scoring produces the top-three eligible ordered pairings; the Bartender chooses within that shortlist. A failed or invalid choice uses the first-ranked authored pour. Determinism applies to the shortlist and local fallback, not an unrestricted promise about the LLM's final choice.
- **One authored recipe per pairing:** runtime matching and tailoring do not alter recipes. The Bartender tailors only the authored `yours` passage, within the existing voice/fact guard; fallback serves the authored passage verbatim.
- **Vetoes filter whole pours:** the current vocabulary is egg-white, dairy, gluten, nuts, and spice. No recipe substitution and no zero-proof variant at launch. The catalogue floor remains at least three pours with empty `contains` in development, and all 132 plus at least twelve such pours for the strict launch gate. Review ingredient classifications before asserting the floor is satisfied.
- **Privacy:** H7's trace and anything derived from it remain in the browser. The guest's name never reaches the LLM. Personal readings are neither persisted nor exposed in shared gifts. H4 timing is proposed intake metadata; any server transport must be specified before implementation.
- **Shared core and seams:** one answer vocabulary, pairing key, selector and reading assembler; pure shared rules imported by browser/API shells. `App` owns reveal orchestration and the authored fallback. One audio owner; music never gates a stage or video transition.
- **Current intake reconciliation:** the September 23 contract still includes a vessel field, while the September 29 source records its removal because each pour has fixed glassware. Refresh that drift and specify the new H4 answer statuses/timing without reintroducing a removed question.

### Task and handoff discipline

Give every implementation slice a stable ID, owner, requirement references, dependencies, a concrete verification criterion, and an honest status. Design concepts and audit findings can proceed in parallel; shared answers, catalogue rules and runtime wiring need an agreed contract before their respective implementation tasks. Do not mark planned work built or approved.

Candidate slices are H4 clarity/history indicators; H1 lens and H10 actions; typography/icons; video arrivals; H5 interaction; per-hold mobile adaptation; audio; recent content decisions; corpus/voice review; image batches; spec/intake refresh; signal/coverage audit; catalogue import; and hybrid reveal integration. These are planning candidates, not an already-approved ticket tree. Use the installed `bmad-ticket` workflow to formalize the breakdown after its requirement references are current, then `bmad-build` for implementation. Add ad hoc code review only when new evidence or a separate diff warrants it; use browser walkthroughs for experience review.

The immediate matching task is the previously pending spec refresh: adopt the finalized spine and later agreed changes, preserve CAP/AD identifiers and decision history, and reconcile the intake/reading contract. Design exploration and content review can continue during that refresh. This planning review does not claim the refresh or any build has been completed.

## Conversation setup and parallelism

Begin with three core conversations and keep this chat as the coordinator. Each conversation receives this plan, the project instructions in `Dionysus/AGENTS.md`, and the existing sources for its track in the BMAD table above. Specialist chat output must return to those sources rather than becoming an isolated chat-only decision.

| Conversation | Owns | First deliverable | Can start now | Main dependency |
| --- | --- | --- | --- | --- |
| Experience design — desktop and mobile | H1–H10 interaction, typography application, motion, mobile controls | Prioritized UX brief, H4 onboarding prototype, two H5 concepts, mobile interaction map | Yes | Agree answer meanings with matching conversation before changing H4/H5 data |
| Cocktail review and editorial | Recent decision pack, collection comparison, prose and recipe review | Short decision pack for Robin plus a 132-row review matrix | Yes | Decisions before finalizing affected dossiers and image briefs |
| Questionnaire matching | Contract refresh, answer-to-signal audit, hybrid model, reachability, distribution, catalogue integration | Refreshed existing spec, audit of current connections, proposed weights, shared answer format | Yes | Adopt finalized architecture first; revised question meanings before final model; finalized catalogue before release |
| Type, icons, and sound exploration | Comparison screens, icon samples, music samples | Three coherent visual/audio directions | Yes, as a design subtask | Experience owner applies the selected direction |
| Cocktail image production | Images for reviewed recipes, crops, name-tag placement | Existing-artifact review plus a small representative pilot | Brief preparation now; final production per settled pour | Final recipe, glass, garnish, story, and image rules |

Use agents for bounded subtasks inside these conversations. A mobile audit and a typography comparison can run alongside the design owner; family reviewers and a corpus reviewer can work alongside the content owner. Their first outputs should be separate recommendations or prototypes. They should not all edit the same application file or dossier.

For actual code work, use separate branches/checkouts where available. In a shared checkout, allow one writer for `TheDepths.tsx` and shared CSS at a time. The design owner implements UI; the matching owner implements the matcher and catalogue import; the coordinator integrates the answer type and `App.tsx` connection. Image production provides asset files and metadata for one owner to register. One content owner applies shared ingredient changes and refreshes registries after family edits land.

Start with up to three specialist agents running together. Extra specialist work can replace a finished slot. More simultaneous chats are useful only when their file ownership and inputs are independent.

Every handoff should state what was decided, what changed, what was checked, what remains open, and which files the next owner needs. The coordinator maintains this plan's decisions; conversations do not assume they automatically see another chat's latest messages.

## Work sequence

### Wave 1 — establish meaning and surface decisions

In parallel:

- Design: reproduce the reported desktop/mobile issues, prepare H4 clarity changes, prototype H5, and compare type on real Dionysus screens.
- Content: gather recent unresolved questions, check the review workbook for user edits, and build the cross-collection comparison.
- Algorithm: refresh the partly superseded spec from the finalized architecture and later agreed intake changes; inventory the active questions and scoring gaps; propose the shared answer format and weights within the hybrid ordered-pair model.

Robin reviews a compact decision pack and a few representative design concepts. Routine wording, source checking, and data consistency work should be done before asking him to decide.

### Wave 2 — improve the experience and validate the model

- Design applies H4 clarity, the lens label, bottom-only reading actions, selected typography/icons, mobile controls, and the agreed H5 interaction.
- Content reviewers propose focused revisions; the content owner applies agreed changes while preserving existing user decisions.
- Algorithm performs reachability search, distribution/sensitivity analysis, and recommends only question changes tied to a demonstrated gap.
- Asset exploration provides music samples and image pilot briefs. Settled recipes may enter image production without waiting for unrelated pours.

### Wave 3 — connect and verify

- Import reviewed authored cocktails into a catalogue keyed by ordered pairing.
- Connect questionnaire answers to the validated model and replace the fixed pilot in the normal journey.
- Integrate selected music and reviewed cocktail images.
- Run the complete desktop/mobile journey, recipe/copy checks, all 132 coverage fixtures, and invalid/failed Bartender-choice fallback cases. Record unapproved content or missing art explicitly before release.

## Design work in detail

| Item | Proposed direction | Reviewable success |
| --- | --- | --- |
| H4 practice and launch | One clear instruction, a Tea/Coffee rehearsal, then restrained **Ready → Set → Go** beats. Keep the choice positions stable and the response window separate from reading the instruction. Allow rehearsal again. | First-time testers can explain what to tap, when the timed round begins, and what happens without a choice. Practice is unscored. |
| H4 history bubbles | Remove the noninteractive history indicators and their occupied space; retain immediate feedback on the current choice. | No element in H4 appears to offer navigation that it cannot perform. |
| Typography | Compare complete type directions on H1 lens choices, H4 pairs, H5 words, and the reading, at desktop and phone sizes. Choose role/weight/spacing rules as well as families. | Questions and options read clearly, feel contemporary, and belong to the same product. |
| H1 final lens | **Another side of me**, retaining the entered name and a stable internal perspective value. | Result dedication still uses the user's name; the lens cannot imply another person's cocktail. |
| Video arrivals | First determine whether the abruptness is in the footage or overlay timing. Let motion decelerate into holds and sequence text after arrival. If needed, retime the source asset so runtime playback remains reliable. | Each arrival feels intentional; no sudden visual stop, lag, or dark-to-light flash. |
| H5 attraction game | A central representation of the person, played in two distinct directions: **what draws you** and **what others come to you for**. Start with a simple two-round prototype. | Testers understand the direction change and both rounds capture distinct answers. |
| Mobile | Design each hold for thumb reach, readable words, limited space, and interruption. Replace hover or difficult spatial gestures with appropriate touch controls. Share answer meanings and catalogue logic with desktop. | Every hold is completable on representative small/large phones without clipped choices, accidental actions, or dependence on hover. |
| H10 settled reading | Remove title-area share/save actions, keeping the bottom actions, recipe cue, sharing, and printable keepsake. | Arrival focuses on the cocktail; both actions remain discoverable at the end. |
| Sound | Compare subtle instrumental loops across the whole journey, with user-controlled sound, fades, and tab/background handling. | Music adds immersion while instructions remain easy to read and the silent experience stays complete. |
| Flavour icons | One coherent set of restrained botanical/ingredient line drawings beside labels: peel/wedge for Citrusy, sprig for Herbal, and analogous marks for the other choices. | Icons help recognition and remain legible at phone sizes; words retain the meaning. |

H5 prototype recommendation: show a small continuous-line figure derived from the Dionysus mark. In the first round, selecting a quality creates movement from the figure toward it. In the second, selecting what people seek brings abstract points toward the figure. Keep selection reversible and the existing maximum of three per round initially. On phones, a tap should perform the same selection as a spatial gesture. Do not silently interpret movement distance as intensity or order of taps as ranking.

The game must distinguish present attraction from perceived social role. Neither automatically defines the primary or secondary archetype. The matching audit determines what each contributes. Compare this concept with a simpler two-round selection treatment before committing to extra animation.

Suggested typography shortlist, as hypotheses to compare:

- **Neue Montreal** for questions and controls, with a restrained serif for occasional cocktail titles/reading: my first comparison direction for contemporary clarity. [Official specimen and licence options](https://pangrampangram.com/products/neue-montreal).
- **Switzer** for questions and labels, retaining a carefully chosen reading serif: a quieter comparison direction. [Official specimen](https://www.fontshare.com/fonts/switzer).
- **Satoshi** across the questionnaire with limited serif emphasis in the reveal: a more explicitly contemporary comparison. [Official specimen](https://www.fontshare.com/fonts/satoshi).

The comparison should include long words, accented names, bright and dark video holds, and narrow screens. Verify web licensing before shipping a selected font; no purchase is required for this planning step.

Recommended music direction: warm nocturnal ambient, sparse felt piano, restrained low textures and faint glass harmonics, a loose pulse around 60–70 BPM, no vocals, and enough quiet to read. Compare a piano-led version, a mostly textural version, and a restrained acoustic/jazz-adjacent version in the app. Prepare a seamless two-to-three-minute loop rather than assuming a generated song is loop-ready. Use gentle changes around the descent and reveal, without a new song at every question.

Suno is a reasonable candidate for the samples; its current guidance grants commercial use rights to tracks downloaded while subscribed to a paid plan. Keep the download/rights record with the selected track. [Suno paid-subscription guidance](https://help.suno.com/en/articles/9601665). Design a clear sound control and start audible playback through user interaction, with a graceful silent fallback if playback is blocked. [Browser audio guidance](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

## Cocktail content work in detail

### First deliverable: decisions Robin needs to make

Produce short cards with the pour, unresolved question, reason for the flag, relevant excerpt, affected neighbours, two concrete options, and a recommendation. Do not ask Robin to inspect whole room transcripts to discover the issue.

The existing summaries identify these starting points; check for intervening decisions before presenting them:

- **Lover batch, October 5:** historical proportions versus rework for *In Your Own Hand*; whether *Wide Open* is being checked against the wrong acid range for its Flip structure. Also review *By Design*'s rum choice and spoonful/teaspoon consistency in *Hoping You'd Come*.
- **Name splits:** Jester–Ruler (*Somewhere to Land / Dry Wit / Don't Look at Me*), Innocent–Ruler (*Whole World / All Right Today / The Second Sip*), Sage–Regular Guy (*Whatever They Call It / Small and Real / What Stayed*), Sage–Innocent (*Are You Quite Sure? / Nothing Escaped You / Before Your Eyes*).
- **Shared balance rules:** review dry Martinis, wine-led drinks, spirit-only drinks, and Flips by the appropriate structure before treating an automated range flag as a bad cocktail. Twelve of the sixteen flagged dossiers include a balance issue.
- **Story judgements:** review the historical framing of *The Wink* and the cash-machine image in *Whoever Comes In*.
- **Shared ingredient/data changes:** reconcile precautionary allergen classifications and analytical values with all affected dossiers, including existing approvals. Current menu claims and some dossiers lag shared table changes. Review the provenance of the classification, not merely its propagation.

Read the current `review.xlsx` without replacing it first; it may contain unsynced user decisions. Preserve the existing tagline file's accepted/rejected/retry notes.

### Whole-collection review

Create a 132-row matrix and a ranked revision queue. Read every full pour, including recipe, ritual, psychology, history, tagline, reading, and ending. Separate technical correctness, editorial quality, and persona distinctiveness rather than collapsing them into a single score.

Review:

1. **Persona fit:** primary motivation and secondary expression are recognizably distinct. Compare all 66 reversed pairs.
2. **Drink coherence:** ingredients, proportions, method, glass, garnish, dilution, and serving size make sense together and express the persona.
3. **Makeability:** preparations, substitutions, unusual ingredients, and instructions are reproducible and consistent.
4. **History:** sourced claims, uncertainty, repetition, and whether the story serves the drink/persona.
5. **Human voice:** specific recognizable behaviour, natural rhythm, clear emotional stakes, and minimal abstract flattery.
6. **Collection overlap:** nearest recipe neighbours, repeated historical anchors, interchangeable portraits, and recurring openings/endings.

Sharing a cocktail family or base spirit is allowed. Require a meaningful experiential distinction; do not invent novelty solely to equalize the menu. Proposed changes should include excerpts and explain why they improve the pairing.

### Taglines and the rest of the keepsake

Extend the existing 65-pour review to all 132. It found 52 two-sentence taglines, 32 openings beginning with You, and 16 mass-contrast openings. The problem is repetition across the collection as well as individual wording.

Flag formulas such as public impression followed by private correction, Everyone/Nobody contrasts, Not X but Y, repeated punctuation beats, vague praise, and excessive symmetry. Flags initiate editorial reading; they do not trigger automatic replacement. A strong existing line may stay.

Use recognizable persona behaviour, not a detail that only makes sense inside that drink's historical anecdote. Vary length and cadence across the set. Read the proposed taglines together, then check each against its complete dossier. Carry the same voice pass into the epigraph, reading, ritual, and closing line where needed. Calibrate a small representative batch with Robin before applying changes broadly.

### Image production

Use the current **persona-image-system.md** and the application design source. Older instructions requiring an impossible detail conflict with the newer rule of plausible human traces and need reconciliation before batch production.

Maintain one consistent Dionysus room: near-black, dark worn timber, glass, cream paper, linen, restrained warm practical light, natural wear, and credible photography. Functional metal is permitted; industrial metal environments are outside the user's clarified direction.

For each ready pour, lock recipe, liquid appearance, glass, ice, garnish, personality evidence, and blank physical name tag. First test a small set of distinct serving types against existing approved visual pilots. Resolve bowl/shared-serve recipes against the existing one-glass image rule rather than hiding the discrepancy.

Then produce in manageable batches. Review physical drink accuracy, shared world, distinct personality, usable negative space, mobile crop, and name-overlay placement. Required exports remain **portrait 896 × 1200 JPEG** and **wide 1920 × 1080 JPEG**, with per-image tag/glass coordinates and application validation. Existing image files should be assessed before generating replacements.

## Questionnaire algorithm work in detail

### Agree the shared answer format first

- Stable question/option identifiers and a questionnaire version.
- Status distinguishes **chosen**, **timed out**, **explicitly skipped**, and **not presented**.
- H4 stores selected pole and response time measured from when both options are readable and actionable. Mark practice separately; record timed/untimed mode and interrupted exposure.
- H3 distinguishes an actively chosen midpoint from an untouched default.
- H5 preserves **drawnToward** and **soughtFor** separately, initially up to three choices each. Ranking/intensity is stored only if the interface explicitly asks for it.
- Lens/context, personality evidence, flavour preference, and exclusions stay distinguishable. Another side of me retains the user's name.

### Audit meaning, usefulness, and weight

One row for every active answer: intended meaning, contribution to archetypes, direction/weight, rationale, ambiguity, redundancy, and whether it affects persona, recipe eligibility/preference, or narrative only. Identify unused questions, repeated signals, leading wording, and disproportionately influential groups.

Define what makes an archetype primary versus secondary in the product's model. Handle missing/conflicting answers explicitly. The finalized architecture selects the top three eligible pairings, using stable pairing-key ordering for ties; audit tie prevalence and adjust weights/questions where ties reveal weak distinctions. The legacy scorer's fixed archetype-order tie handling is a known implementation bias to retire. Record contributing answers and margins for model review, keeping that diagnostic detail out of the guest journey.

**Timing is an unvalidated hypothesis.** Fast answers may suggest confidence, but reading, language, device, motor input, familiarity, and attention are confounds. A timeout may reflect ambivalence, confusion, or a missed opportunity. Record first; compare models with and without timing in playtests before making it influential. Keep an untimed path comparable. Do not label the questionnaire as a validated psychological assessment.

### Prove reachability and measure skew

For each of the 132 ordered pairs, produce valid compatible answer fixtures and report separately whether it can lead the deterministic fallback, enter the top-three shortlist, and be chosen by the Bartender in a reviewed final-choice fixture. The coverage report distinguishes reachable, proven unreachable, and not yet proven at each layer. A deterministic fixture does not prove how often the Bartender chooses it. Random sampling cannot prove an unobserved outcome impossible; use constrained search or other justified feasibility analysis where needed.

Also simulate outcome frequencies under several stated answer models, including correlated/plausible answers as well as uniform options. Report tie rates, concentrated outcomes, sensitivity to one changed answer, and influence of each question group. These distributions describe the model and assumptions, not the real audience. Compare them with playtests later. Equal output frequencies are not the objective.

When a pair is unreachable or two personas cannot be distinguished, name the missing distinction and propose the smallest useful question edit/addition. Remove or repurpose questions only when the audit shows why. Re-run coverage after any change.

### Build the link to the authored collection

Import reviewed dossier/spec data into a single catalogue keyed by ordered pairing. Choose the authored cocktail and preserve its recipe, reading, and relevant image metadata. Do not silently replace it with the legacy recipe generator.

Define how flavour fit influences selection within the existing hybrid model. Ingredient vetoes remove incompatible authored pours before the shortlist is taken; they do not trigger recipe substitution or variants. Preserve the catalogue's development and strict-launch veto-free floors so a full eligible shortlist remains available. Zero-proof remains outside launch scope. Keep imagery truthful to the selected authored recipe.

In development, preview the whole authored collection with approval status visible to reviewers. Release readiness requires the applicable review gates. Build and validation can begin with pilot records while broader content review proceeds.

Final verification covers all 132 coverage fixtures, reversed-pair distinctions, deterministic shortlist/fallback, bounded Bartender choices, authored-copy fallback and tailoring guard, explicit tie policy, empty/partial answers, skips/timeouts, timing on/off, desktop/mobile answer parity, exact catalogue recipe/copy, veto filtering and catalogue floors, trace/name privacy, image availability and crop, share links, and printable output. Use tests for model and import correctness; use browser walkthroughs/playtests for comprehension and motion.

## Ready-to-use conversation briefs

These are briefs for starting or continuing chats. No new user-owned chats have been created by this planning session. Every brief inherits the BMAD source/owner table and architecture rules above. Continue existing artifacts, report agreed decisions back to their owner, and record requirement references and verification in task/build records.

### Experience design

Read Dionysus/AGENTS.md, this continuation plan, and the existing WDS sources in its BMAD table. Use focused WDS product-evolution cycles and the existing propose/build/browser-verification/design-log rhythm. Inspect the current application at localhost:5180 on desktop and phones. Preserve its immersive atmosphere. Own H4 clear practice and premium Ready/Set/Go, removal of H4 history bubbles, Another side of me with unchanged name, type comparisons, smoother video arrivals, an H5 two-direction attraction prototype, deliberate mobile controls, bottom-only share/save, and flavour icons. Start with a brief and reviewable prototypes. Coordinate answer meanings and timing capture with the matching owner before changing H4/H5 data. Delegate bounded audits/comparisons into separate artifacts; keep one production UI writer. Apply settled reversible improvements, validate each complete journey, and record decisions/status in the existing design log. Refer to the plan's music direction and the existing audio seam for later sound integration.

### Cocktail review and editorial

Read Dionysus/AGENTS.md, the continuation plan and STUDIO-RULES.md. Continue through the existing Pour Studio review desk, Wren/Hester/Tomás responsibilities, and targeted rework rooms. First inspect recent batch summaries and user annotations and produce a compact decision pack for Robin. Then review all 132 full pours, all 66 reversed pairs, recipe neighbours, repeated historical anchors, voice, and makeability. Extend the existing tagline review while preserving yes/no/retry decisions and avoiding lines overly tied to one anecdote. Produce a ranked revision queue with excerpts and recommendations; calibrate a small rewrite batch before applying collection-wide changes. Family reviewers may work in parallel in separate recommendation files; one editor applies agreed changes. Check review.xlsx for unsynced user edits before refreshing it. Do not equate authored/draft status with user approval. Record accepted edits in existing dossiers/rooms and agent lessons. Hand off settled recipes/copy and image briefs by permanent pairing key.

### Questionnaire matching

Read Dionysus/AGENTS.md, the continuation plan, agent/ARCHITECTURE-SPINE.md, agent/.memlog.md and the existing pipeline spec/companions. Begin with the pending bmad-spec refresh, preserving capability/architecture IDs and the finalized hybrid shortlist/Bartender model, authored fallback, veto filtering, no-zero-proof launch scope and privacy rules. Reconcile later intake changes. Audit active questions, stored answers, fixed pilot reveal and legacy scorer/generator. Agree the answer format with the design owner. Produce the answer-to-signal table, justified weights/pair formula, missing-answer handling, 132-row layered reachability report and distribution/sensitivity analysis. Treat timing as optional until tested. Recommend question edits only for identified gaps. Formalize tasks through the installed bmad-ticket workflow, then bmad-build to import/connect the authored catalogue and reveal. Verify deterministic shortlist/fallback, bounded final choice, recipe integrity, catalogue floors, privacy and desktop/mobile parity. Coordinate shared type/App changes with the integration owner.

### Type, icons, and sound exploration

Read the design decisions in the continuation plan and the current application design source. Produce side-by-side type directions on the same H1/H4/H5/reading screens, including phones; a small coherent flavour icon sample; and three subtle background-music concepts/samples with a production/rights note. Compare Neue Montreal, Switzer, and Satoshi as starting points. Keep artifacts separate from production UI until a direction is chosen. Prepare music for a seamless loop, a clear sound control, and gentle transitions. Deliver selected assets and role rules to the experience owner.

### Cocktail images

Read the continuation plan, current persona-image-system.md, application DESIGN.md, and the complete settled pour before making each image. Review existing assets and visual pilots first. Reconcile older impossible-detail briefs with the current plausible-traces rule and functional-metal clarification. Pilot representative serving types before scaling. Generate final images only when that pour's recipe, vessel, garnish, liquid appearance, and personality evidence are settled. Deliver reviewed wide/portrait JPEGs at required sizes and measured name-tag/glass metadata; one integration owner registers them. Batch by ready pours, not by arbitrary catalogue order.

## Source trail

- Application: `dionysus-experience/src/App.tsx`, `types.ts`, `components/TheDepths.tsx`, `components/TheReading.tsx`, `engine/mixology.ts`, `data/archetypes.ts`, `data/sampleResult.ts`, `data/personas.ts`, `index.css`, and `DESIGN.md`.
- Studio: `pours/_studio/registry.md`, `menu-assessment.md`, `index.md`, recent batch summaries, `rule-candidates.md`, `review.xlsx`, dossier frontmatter and specs.
- Existing editorial work: `pours/_studio/tagline-review-2026-10-02.md` and the recent tagline chat.
- Images: `design-artifacts/persona-image-system.md`, existing application assets, and the image chat's later functional-metal clarification.
- BMAD continuity: `agent/ARCHITECTURE-SPINE.md`, `agent/.memlog.md`, pipeline spec supersession banners, existing WDS sources/progress, shared `_bmad/custom/config.toml`, and installed `.claude/skills/bmod-method/help` plus WDS/Pour Studio skill files. Helper execution was rejected by automatic approval review; this alignment was completed from direct file inspection. It is not a completed spec refresh, ticket inception, or installation migration.

All relative paths above are within `Dionysus/Cocktail_Website_Agent` unless explicitly prefixed with Dionysus. The full corpus editorial audit, visual browser audit, and complete reachability proof are planned work; they were not performed by this planning session.
