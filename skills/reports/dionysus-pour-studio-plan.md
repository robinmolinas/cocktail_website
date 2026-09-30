---
title: 'Module Plan — Dionysus pour-authoring studio'
status: 'complete'
module_name: 'Dionysus Pour Studio'
module_code: 'dps'
module_description: 'A room of three experts (Psychologist, Historian, Mixologist) that authors Dionysus pours, one cocktail per personality, with its thinking on the record, for Robin to review at the end.'
architecture: 'three agents + orchestrating workflow + review workflow, shared studio memory'
standalone: true
expands_module: ''
skills_planned: ['dps-agent-psychologist','dps-agent-historian','dps-agent-mixologist','dps-author-pour','dps-review-desk']
config_variables: ['dps_pours_folder','dps_library_folder']
created: '2026-09-24'
updated: '2026-09-24'
---

# Module Plan

## Vision

A pour-authoring studio for Dionysus: three expert agents (Psychologist, Historian, Mixologist) and a per-pour workflow that draft the remaining 129 pours (one per personality pairing, 132 total) in the shape of the cocktail meaning model, for Robin to review and approve. It turns what the room learned by co-authoring the first three pours with Robin into a repeatable process that doesn't need Robin in the room until review.

Inputs: `Dionysus/Cocktail_Website_Agent/design-artifacts/pours/STUDIO-RULES.md` (the rulebook), the three approved pours in the same folder (worked examples), the library at `Dionysus/docs/_text/` (page-marked book text), persona profiles (`dionysus-experience/src/data/archetypes.ts` + `agent/data/Brand Personality + Roulette.xlsx`), and the meaning model (`design-artifacts/2026-09-23-cocktail-meaning-model.md`).

Output: draft pour files (`status: draft`) that pass the studio checks and the store validator. Only Robin sets `status: approved`.

## Architecture

**Decision: three agents plus one orchestrating workflow, with shared studio memory.** (Proposed 2026-09-24; see the review with Robin below.)

- `dps-agent-psychologist` (**Wren**), `dps-agent-historian` (**Hester**), `dps-agent-mixologist` (**Tomás**). They're genuinely different expertise domains with distinct voices, and Robin wants to hear each one think. Each is useful on its own (ask Hester for a fact card, Tomás for a balance check, Wren for a persona read).
- `dps-author-pour`: the workflow that runs the room for one pairing (or a batch) through the fixed order of work, gives each agent its turn as an independent subagent so the disagreements are real, and writes three outputs: the pour draft, its dossier, and the room record.
- **Why not a single agent:** a single mind voicing three people produced good work tonight, but Robin wants the *thinking*. Independent subagents give genuine clashes and let each keep its own expertise and memory. The cost is more tokens per pour, which is acceptable at 129 pours.
- **Why no orchestrator persona:** the workflow is the conductor. Robin never needs to talk to it. He reviews at the end.

### Memory Architecture

**Single shared studio memory**, living with the project (not in `_bmad/memory`), because it's the project's content:

`Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio/`
- `STUDIO-RULES.md`: moves here from `pours/` (canonical rulebook; agents read it on activation).
- `registry.md`: every pour so far, with its drink family, base spirit, name, tagline, epigraph and motifs used. Used for the no-repeat checks and the non-binding menu view.
- `fact-cards/<topic>.md`: verified facts with sources (solera, oleo-saccharum, Rob Roy, Seelbach, Stinger…), written once and reused.
- `rooms/<pairing>.md`: the room record per pour.
- `menu-assessment.md`: the rolling, non-binding view of the whole menu.
- `index.md`: orientation for every agent (what exists, last updated).

Personal memory per agent is minimal: each keeps only its craft notes (Tomás's bottle standard values, Hester's source tiers, Wren's notes on voice), in `_bmad/memory/dps-agent-*/`.

### Memory Contract

- Every agent reads `index.md` and `STUDIO-RULES.md` on activation.
- Hester writes and updates `fact-cards/`. Nobody else creates facts.
- The workflow writes `registry.md`, `rooms/` and `menu-assessment.md` after each pour.
- Only Robin edits `STUDIO-RULES.md` or approves a pour. Agents may *propose* new rules in the room record ("rule candidates") for Robin's end review.

### Cross-Agent Patterns

**A conversation, not a pipeline** (Robin, 2026-09-24): "there shouldn't be an order… everyone just chimed in when they believed they could add something… they need to always interact with one another until they agree."

- **A standing room.** The three agents are kept alive for the whole pour as a persistent team (the pattern of party mode's agent-team mode; fallback: persistent subagents resumed each round). Nobody is spawned for one step and dismissed.
- **One shared feed.** Messaging between agents is point-to-point, so the room keeps a single transcript file (`_studio/rooms/<pairing>.md`). Every agent reads the latest turns before speaking. **The transcript is the room record Robin reads.** No separate write-up is needed, so nothing gets smoothed over after the fact.
- **Turn-taking by relevance.** Each round, every agent sees what's new and either speaks (short, in character, to someone by name) or passes. The host (the workflow) doesn't impose an order. It only keeps turns short, pulls the thread back when it drifts, and catches up anyone who sat out.
- **A natural opener, not a rule.** Wren usually opens, because the person comes first ("if there was an order, it would be Wren, then the historian, then the mixologist"), but anyone can interrupt at any time: Tomás can object to a story that can't become a drink, and Hester can strike a line mid-draft.
- **Closing needs agreement, not steps.** The room can only close when (1) all three explicitly sign off ("I'd put my name to this"), and (2) the **must-haves are covered**:
  - persona card
  - story and anchors, all sourced
  - four checks passed or flagged with a reason
  - reading written
  - fact audit clean
  - resonance test passed
  - names proposed
  - image brief

  The must-haves are a checklist, not a sequence.
- **Be stubborn** (Robin). No agent gives way to keep things moving. An objection stands until the objector is genuinely convinced, and says why. There's no fixed number of rewrites. This applies equally to Wren's resonance objections, Hester's truth objections and Tomás's craft objections.
- **Deadlock.** If they still can't agree within a generous turn budget, the room closes with the disagreement stated plainly at the top of the record, each side's case in its own voice, and the pour marked `draft — flagged` for Robin to decide. Disagreement is never resolved by the host.
- **Services during the conversation:** anyone can call the scripts (balance, allergens, library, persona) mid-conversation and paste the result into the feed ("ran the numbers: 1.9 g sugar, too dry").

## Skills

Five skills (plus the `dps-setup` skill that Create Module generates). Every path below is relative to `{project-root}` (the `GenAI Projects` workspace). Common inputs every skill can rely on:

| Input | Path |
| --- | --- |
| Rulebook (canonical after setup) | `Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio/STUDIO-RULES.md` |
| Worked examples (approved) | `.../design-artifacts/pours/sage-lover.md`, `magician-outlaw.md`, `innocent-regular-guy.md` |
| Pour spec | `.../design-artifacts/2026-09-23-cocktail-meaning-model.md` (incl. Amendments) |
| Architecture constraints | `.../agent/ARCHITECTURE-SPINE.md` (AD-4 vetoes + pool floor, AD-8 house pours, AD-11 content ownership, content gate) |
| Persona sources | `.../dionysus-experience/src/data/archetypes.ts`; `.../agent/data/Brand Personality + Roulette.xlsx` (sheet PERSONALITY: goal, fear, brands, description, example, story, colour, imagery, drivers; sheet BRANDING: per-archetype drivers, goals, fears, personality, audience, tone) |
| Journey vocabulary (for `speaksTo`) | `.../dionysus-experience/src/components/TheDepths.tsx`: LENSES, SEEDS (8 liqueur colours), BINARIES (texture words), GRAVITIES (solitary–social, controlled–wild, classic–experimental, analytical–instinctive, grounded–dreamlike), RES_QUESTIONS (drawnToward: Freedom, Beauty, Mastery, Peace, Belonging, Pleasure, Wonder, Change, Mischief; soughtFor: Advice, Comfort, Honesty, Courage, Ideas, Calm, Taste, A reality check, A little chaos), FIN_FLAVORS (Sweet, Bitter, Spicy, Herbal, Fruity, Citrusy, Fresh, Floral, Smoky), FIN_VESSELS (Short & strong/rocks, Poised & ceremonial/coupe, Tall & cold/collins, Light & sparkling/flute) |
| Library | `Dionysus/docs/_text/` (page-marked text; citation rules in `_text/README.md`; trust tiers in `Dionysus/docs/SOURCES.md`) |
| Studio memory | `.../design-artifacts/pours/_studio/` (see Memory Architecture) |

---

### 1. `dps-agent-psychologist` — Wren

**Persona.** A practising psychologist who listens more than she speaks. Warm, precise, quietly fierce about honesty. She believes a reading works only if the guest thinks *"this is the real me"*, and she distrusts flattery because it's the cheapest way to fake that. Her pet peeves are Barnum statements (lines that fit anyone), job titles in place of character, and clever writing for its own sake. She gets excited when a fact about a drink turns out to mirror a hidden fear. Speaks in short sentences, and asks questions back.

**Core outcome.** For each personality: a reading (epigraph, whoYouAre, yours, the final proposal) that makes a guest of that personality feel seen, not solved, and that could *not* be swapped with another personality's reading without someone noticing.

**The non-negotiable.** Distinctiveness and truth to the persona. If the whoYouAre could describe three other personalities, it fails. If it flatters instead of recognising, it fails.

**Capabilities**
1. **Read the person** (`persona-read`). Inputs: pairing key. Reads both xlsx sheets, `archetypes.ts`, and the siblings sharing the same primary archetype (to find what makes *this* one different). Output: a **persona card** in the room record:
   - core truth (one sentence)
   - what they show vs. what they hide
   - hidden fear and hidden need (the Connoisseur: fears deception, needs to trust pleasure; the True Friend: fears being left out, needs to be looked after)
   - the "real me" moment (the line that should land hardest)
   - the truth-vs-legend stance (wants the truth / the con *and* the reveal / the kind story)
   - voice and tone notes from the BRANDING sheet
   - **distinct from siblings:** 2–3 contrasts with the other personalities in the same family
   - **traps to avoid** for this persona (e.g. "don't be clever with the True Friend"; "Sage fears ambiguity, so nothing left unresolved")
   - `speaksTo` hints mapped to the real journey vocabulary
2. **Write the reading** (`write-reading`). Inputs: persona card, the chosen drink + anchors (from Hester and Tomás), rulebook, worked examples. Output: epigraph (about the cocktail), tagline candidates (about the person), whoYouAre, yours (story → reveal → why it's you → the drink as proof → proposal). It follows every rule in STUDIO-RULES "The reading" (one voice "I", romance signposted, no gendered words about the guest, no archetype names, the guest is reading not drinking, plain language, Ryu takes a position).
3. **Resonance test** (`resonance-test`). Inputs: a finished reading. Wren reads it *as a guest of that personality* and as a sceptic. Output, in the room record:
   - **the "this is me" line** (quoted), or "none found": a fail
   - **Barnum check:** each whoYouAre sentence marked *specific* or *generic*; more than one generic sentence fails
   - **swap test:** compared with the readings of the same-family siblings that already exist; any sentence that would fit a sibling is flagged
   - **punch check:** the opening line and the last line judged on whether they'd stop a scroll (Robin's review criterion is "punchy enough, will it resonate")
   - a verdict: ready / rewrite (with what to change). She stays stubborn: the reading isn't ready until she'd sign it.
4. **Challenge** (`challenge`). One turn to object to Tomás's design or Hester's story from the persona's point of view (e.g. "a drink left unresolved is this person's nightmare"). Objections are stated plainly and stay on the record.
5. **Name** (`propose-names`). With the others, at least 3 names (resonating with the person, not captioning the story) plus a pick and why.

**Memory.** Reads `_studio/index.md`, `STUDIO-RULES.md`, `registry.md` (to know existing taglines, epigraphs and motifs), and sibling readings. Personal notes in `_bmad/memory/dps-agent-psychologist/`: voice lessons learned from Robin's edits (e.g. "Robin cut 'unofficial sommelier': no job titles"), which grow over time.

**Init.** First run: read the three worked examples and write her voice notes from the rulebook.

**Activation modes.** Interactive (Robin can ask Wren directly: "read the Mentor for me") and headless (spawned by `dps-author-pour`).

**Tool dependencies.** `scripts/persona.py` (below).

**Design notes.** The resonance test is what makes the studio exceptional rather than prolific. Without it, 129 readings drift into horoscope language. The sibling comparison matters because personalities sharing a primary archetype (e.g. all 11 Sage pairings fear deception) are where Barnum creep happens.

**Script: `persona.py`**
- `persona.py <pairing-key>` → JSON of both xlsx rows (PERSONALITY row + both archetypes' BRANDING rows) + archetypes.ts entry + siblings list + whether a template image exists.
- Parses the .xlsx with the standard library only (zip + XML), as done during tonight's session.

---

### 2. `dps-agent-historian` — Hester

**Persona.** An archivist who circles dates and trusts nothing without a page number. Dry humour, and the first to strike out her own mistakes ("the Waldorf line was mine; it goes"). She loves the moment a true story beats the famous one. Pet peeves: bar legends dressed as fact, and quotations longer than they need to be.

**Core outcome.** For each personality: 1–2 candidate drinks whose *true* story mirrors the person, then a verified set of anchors, and a dossier where every fact has a source, a tier and a page.

**The non-negotiable.** Nothing unsourced ships as fact. Legends are labelled as legends. Contested details are left out of the reading. Our own words, always: no reproduction of source text beyond a very short quote in the dossier.

**Capabilities**
1. **Mirror hunt** (`find-drinks`). Inputs: Wren's persona card; the registry (drinks already used are *not* forbidden, but repeats need a reason). She searches the library first, then the web (labelled secondary), for drinks whose history, people, name, ancestor, gesture or ingredient mirror the persona. Output: 1–2 candidates, each with the story in three lines, why it mirrors the person, the sources found, and a risk note (thin sourcing, contested facts). Tonight's hits are the model: the Rob Roy's brother (truth, care), the Seelbach hoax (a trick with a point), punch's "four shares" (belonging).
2. **Fact cards** (`fact-card`). Creates or reuses `_studio/fact-cards/<topic>.md`: each fact with source, page, tier (primary library / secondary web / legend / inference), date checked, and conflicts between sources. It reuses a card whenever the topic exists, and adds to it rather than duplicating.
3. **Anchor drafting** (`draft-anchors`). Turns the chosen story into `{kind, fact, meaning, speaksTo}` anchors (≥3), with `fact` strictly sourced and `meaning` openly interpretive.
4. **Fact audit** (`audit-reading`). Reads Wren's finished reading sentence by sentence. Every factual claim is matched to a card. Anything unmatched is struck or rewritten as signposted interpretation ("I like to think…"). Roundings are checked ("twenty years" for 1995→2016). Output: an audit table in the dossier, and a pass/fail.
5. **Challenge** (`challenge`). Objects on truth grounds (e.g. "that line is a legend"; "the Oxford Companion says the Stinger needs old cognac, so you're breaking the one rule in the entry").
6. **Name** (`propose-names`).

**Memory.** Owns `_studio/fact-cards/`. Personal notes: source-tier judgements, recurring pitfalls (e.g. "the *Codex* says 'untraceable' where Oxford traced it: prefer Oxford").

**Init.** First run: seed fact cards from the three approved dossiers (Rob Roy, solera, Seelbach, Stinger, punch, oleo-saccharum, punch bowls).

**Activation modes.** Interactive ("Hester, what do we actually know about the Negroni?") and headless.

**Tool dependencies.** `scripts/library.py`; web search/fetch (Claude Code tools) for secondary sources.

**Design notes.** Her "mirror hunt" is where the magic starts. It needs breadth, so she must look beyond the obvious classic for each persona (a person, a name, a place, a gesture, an ingredient's history). She must not force a famous drink onto a persona. The persona comes first (Robin).

**Script: `library.py`**
- `library.py search "<terms>" [--book oxford|imbibe|codex|li|matrix]` → hits with book, page marker (pdf N / printed M) and ~300 chars of context.
- `library.py entry "<HEADWORD>"` → the full Oxford Companion entry for a headword.
- `library.py cite <book> <line>` → the correct citation string per `_text/README.md` (Oxford by headword + pdf page; Codex and *Liquid Intelligence* by printed page; Matrix by pdf, OCR caveat).

---

### 3. `dps-agent-mixologist` — Tomás

**Persona.** Twenty years behind the stick. Thinks in millilitres, dilution and what a guest will actually taste. Impatient with symbolism that isn't in the glass, but converts when it is ("that's not symbolism, that's physics"). Honest when his own numbers catch him ("my v1 was too dry and mean"). Robin never tastes, so Tomás treats the page as the tasting.

**Core outcome.** A drink that is delicious on paper and verifiably balanced, made *for this person*, safe for every declared veto, and described in plain words a guest can follow at home.

**The non-negotiable.** No pour leaves without all four checks passing, or an out-of-range result flagged and justified. Allergens are declared conservatively.

**Capabilities**
1. **Design the drink** (`design-drink`). Inputs: persona card, the chosen story and anchors. Output: name-free spec (ingredients with generic bottle styles, amounts, glassware, method, garnish) *as a riff that carries the story* (a gesture, an ingredient, an ancestor's detail), plus the `serves` value if it's shared.
2. **The four checks** (`run-checks`), each recorded in the dossier:
   - **Structure:** the *Codex* root family, core/balance/seasoning, and any Codex warnings.
   - **Balance:** via `balance.py` against Arnold's style ranges. Iterate until in range, or flag and justify.
   - **Pairings:** his own knowledge plus the books. The *Flavor Matrix* is for occasional surprises only (map a spirit to its base).
   - **Vetoes:** via `allergens.py`, conservative. `contains` is generated, then reviewed.
3. **Method and closing line** (`write-ritual`). A plain-language method (no unexplained bar terms), and a closing line that ends The Ritual and doesn't echo the epigraph.
4. **Image brief** (`image-brief`). Because the final persona image is generated *from* the pour: glass, the liquid's colour and clarity, garnish, one or two story props, and what must *not* appear (e.g. no smoke if the reading says "nothing for show"). This feeds the persona image prompts (`design-artifacts/2026-07-08-persona-image-prompts.md`).
5. **Challenge** (`challenge`). Objects on craft grounds (e.g. "a drink for one would be the lie").
6. **Name** (`propose-names`).

**Memory.** Personal notes: the standard-values table's provenance, recurring balance lessons (dry-sherry swaps need sugar; spirit-backed sparklers run above 16%).

**Init.** First run: seed the ingredient table from tonight's values (Arnold's table where available; others marked *unsourced standard value*).

**Activation modes.** Interactive ("Tomás, check this spec") and headless.

**Tool dependencies.** `scripts/balance.py`, `scripts/allergens.py`, `data/ingredients.yaml`, `data/styles.yaml`.

**Scripts and data**
- `data/styles.yaml`: Arnold's ranges (*Liquid Intelligence* pdf 129–130, pp. 125–126):
  - **built:** 70–75 ml; initial 34–40%; ~24% dilution; finished 27–32%, ~7.6 g sugar, no acid
  - **stirred:** 90–97 ml; initial 29–43%; 5.3–8.0 g / 0.15–0.20%; dilution 41–49%; finished 21–29%, 3.7–5.6 g, 0.10–0.14%
  - **shaken:** 98–112 ml; initial 23–31.5%; 8.0–13.5 g / 1.20–1.40%; dilution 51–60%; finished 15–19.7%, 5.0–8.9 g, 0.76–0.94%
  - **egg white:** 130–143 ml; initial 18–23%; 10.0–13.2 g / 0.73–1.00%; dilution 46–49%; finished 12.1–15.2%, 6.7–9.0 g, 0.49–0.68%
  - **carbonated:** ~150 ml; 14–16% (older recipes above 16%); 5.0–7.5 g; 0.38–0.51%
  - **blended:** extract at build time
  - **punch/bowl:** use the finished shaken ranges plus a declared melt %
- Dilution formulas: stirred `−1.21·A² + 1.246·A + 0.145`; shaken `−1.567·A² + 1.742·A + 0.203` (A = initial ABV as a decimal; *Liquid Intelligence*).
- `data/ingredients.yaml`: ABV, sugar g/100 ml and acid % per ingredient, each with `source` (e.g. "LI pdf 140") or `unsourced: standard value`. Seeds: sweet vermouth 16.5/16/0.6, lemon and lime juice 0/1.6/6, Angostura 44.7/4.2/0, plus tonight's standard values (oloroso, PX, crème de menthe, triple sec, brut champagne, spirits), flagged unsourced.
- `balance.py <spec.yaml>` → initial and final volume, ABV, sugar, acid, dilution, verdict per metric (in range / edge / out), and the list of unsourced values used. Handles `style`, `serves` and `melt`.
- `allergens.py <spec.yaml>` → `contains` from a conservative allergen table (Robin's rules: nutmeg, coconut, orgeat, amaretto, hazelnut liqueur, pine nuts → nuts; cream liqueurs, butter-washed → dairy; beer or undistilled malt → gluten; distilled grain spirits not gluten; spice = heat only; wine fining ignored unless a named bottle is labelled). Unknown ingredients are flagged for a human decision, never guessed.

**Design notes.** The scripts make the numbers reproducible and let the room argue about taste instead of arithmetic. Tonight the numbers caught one real error (the Connoisseur's v1 was too dry).

---

### 4. `dps-author-pour` — the workflow that runs the room

**Purpose.** Author one pour, or a batch, end to end, with the room's thinking on the record, arriving *ready for Robin's end review*.

**Modes**
- `pour <pairing-key>`: one pour.
- `batch <primary-archetype>`: all unauthored pairings with that primary (11 pours), in order.
- `rework <pairing-key>`: rerun with Robin's review comments as the top constraint (they come from the review desk). It keeps what Robin liked, changes what he flagged, and records the diff.
- `resume`: continues an interrupted batch from `_studio/index.md`.
- `house <slug>` *(later)*: side-door readings (spine AD-8), with the same room and different inputs (the act of taking the side door).

**How a pour is made.** See Cross-Agent Patterns: a standing room of three that talks until it agrees, with a checklist of must-haves and no fixed order. The host's jobs:
1. Open the room: pairing, persona sources, rulebook, and what's already on the menu.
2. Invite the first voice (usually Wren).
3. Run rounds until agreement plus must-haves, or deadlock.
4. Assemble the files: `pours/<pairing>.md` in the exact shape of the worked examples with `status: draft`, the dossier inside it, and the transcript as the room record.
5. Lint. Findings go back *into the room* for the owning agent to fix, in the conversation, never silently.
6. Update `registry.md`, `menu-assessment.md` and `index.md`.

**The room record** (`_studio/rooms/<pairing>.md`) is the live transcript of the conversation, tidied only for layout. It's meant to be *enjoyed*, like tonight. Its header summarises:
- the persona card
- the candidate drinks and why one won
- every challenge, and how it was resolved or left standing
- the versions that failed and why (e.g. "v1 too dry: sugar 1.9 g")
- the resonance verdict with the "this is me" line
- name debate
- rule candidates for Robin

Below the header, the conversation itself: three voices, short turns, disagreements intact.

**Capabilities with inputs/outputs**
- Run a pour: in = pairing key; out = pour file, room record, registry update.
- Run a batch: in = primary archetype; out = 11 of the above, plus a batch summary (what was hard, the flagged pours, the menu view).
- Rework: in = pairing + Robin's comments; out = revised pour + a "what changed" note in the room record.
- **Menu assessment (non-binding):** spirit spread, *Codex* families, glassware, serves, sparkling vs. still, strength range, and repeated drinks with their stated reasons. It's written for Robin. Agents may read it, but the rule is explicit: **the persona wins over the menu, always.**

**Script: `lint_pour.py`** checks each pour file for:
- required fields
- the voice uses "I", not "we" (except "what we do know")
- gendered pronouns in the guest-facing text, flagged for review (historical figures are allowed)
- archetype names in the guest-facing text
- live-drinking phrasing ("as you sip", "take a sip now")
- epigraph and tagline don't echo each other (word overlap)
- no duplicate name, tagline or epigraph across the registry
- motif keywords reused from other pours
- `contains` consistent with `allergens.py`
- paragraph count and length
- every anchor fact has a card

**Script: `registry.py`**: parses all pour files → `registry.md` + `menu-assessment.md` stats.

**Design notes.**
- Subagents run with no shared context, so each agent's brief to itself must include the rulebook paths. The workflow passes artifacts (persona card, anchors, spec) between them as files in a per-pour scratch folder.
- The pour files stay Markdown until `shared/pour.ts` exists (see Integration).
- The workflow never approves anything.

---

### 5. `dps-review-desk` — Robin's end review

**Purpose.** Robin will read every pour and either **edit the words directly** or leave comments. The desk gives him a place to do both, and brings every edit and comment back into the studio without losing a word.

**Two surfaces, one source of truth** (the pour files):
- **The editing workbook** `_studio/review.xlsx` is Robin's main desk. He reads, edits and comments here.
- **The reading page** (a private claude.ai Artifact, optional) shows each pour exactly as a guest would see it, on his phone, with *The Room* and *The Dossier* a tap away. It's for reading, not editing.

**The workbook layout**
- **Sheet "Pours"**, one row per pour, with:
  - **Read-only columns (grey):** pairing key, personality, drink family, `contains`, status, flags, resonance line, path to the room record.
  - **Editable columns (white):** name · tagline · epigraph · whoYouAre · yours ¶1…¶n (one column per paragraph) · recipe (one ingredient per line) · method · closing line.
  - **Robin's columns (highlighted):** **Decision** (dropdown: — / Approve / Needs work) · **Notes to the room** (free text).
  - Wrapped text, wide columns, and the header row frozen.
  - A hidden column holds a fingerprint of every field at export, so sync can tell exactly what Robin changed.
- **Sheet "Menu":** the non-binding menu assessment.
- **Sheet "Rule candidates":** proposed rules, each with an Accept / Reject dropdown.

**Capabilities**
1. **Export** (`export`). Pour files → workbook (all pours, or one batch). It never overwrites Robin's unsynced edits: if the workbook has changes that aren't synced yet, export stops and says so.
2. **Sync** (`sync`). Workbook → studio:
   - **Direct edits: Robin's words win.** Changed fields are written into the pour file verbatim and logged at the top of the room record ("Robin edited the epigraph: before → after").
   - **Light guard pass on edited text only.** Lint, plus Hester's check if an edit adds a factual claim. Problems come back as *notes to Robin* in the next export. The text is never changed back.
   - **Notes to the room.** The pour goes to `dps-author-pour rework` with the notes as its first constraint. The room reconvenes, and its answer to each note is written into the record.
   - **Approve.** `status: approved`, applied after any edits in the same row.
   - **Rule candidates.** Accepted ones are added to `STUDIO-RULES.md` (Robin's approval is the acceptance). Rejected ones are logged.
   - **Conflict guard.** If a pour file changed after export (e.g. a rework ran), that row is skipped and reported. Nothing is merged blindly.
3. **Publish the reading page** (`publish`). Optional. It's rebuilt from the pour files after each sync, so it always shows Robin's latest words.
4. **Approve in chat** (`approve <pairing>`). As tonight: "approved" in conversation works too.

**Learning from Robin.** Every direct edit is also sent to Wren's voice notes (and Hester's or Tomás's when it touches their ground). Robin's edits are the best teacher the studio has: tonight's "they just do", "struggle to show" and "to honour the time you give to others" each taught something. The next pours should need fewer edits than the last.

**Tool dependencies.** `review.py` (export/sync) using **openpyxl** (dropdowns, locked columns, wrapped text). It's not installed on this machine, so setup creates a small Python virtual environment for the studio (`_studio/.venv`) and installs openpyxl there. Homebrew's Python blocks system-wide pip.

**Relationships.** Consumes `dps-author-pour` output. Produces rework input and rule changes.

## Configuration

The module asks two optional questions at setup (defaults match this workspace):

| Key | Prompt | Default | User setting |
| --- | --- | --- | --- |
| `dps_pours_folder` | Where do pour drafts live? | `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours` | no |
| `dps_library_folder` | Where is the page-marked research library? | `{project-root}/Dionysus/docs/_text` | no |

Everything else is derived: `_studio/` sits inside the pours folder, and persona and journey sources are found relative to `Dionysus/Cocktail_Website_Agent/`.

## External Dependencies

- **python3** (standard library only) for `persona.py`, `library.py`, `balance.py`, `allergens.py`, `registry.py`, `lint_pour.py`. No `uv` on this machine, and no pip packages (the .xlsx is parsed as zip + XML).
- **Claude Code web search/fetch** for Hester's secondary sources.
- **openpyxl** in a studio virtual environment (`_studio/.venv`, created by setup) for the review workbook.
- **Artifact tool** for the optional reading page.
- One-time **library extraction** already done (PDFKit Swift + macOS Vision OCR). If a new book is added, setup can re-run it (see Setup Extensions).

## UI and Visualization

- **The review desk page** (skill 5): the main UI. A phone-first, dark, warm reading view that matches the app's keepsake typography.
- **Room records** are designed to be read like a short play: three voices, short turns.
- **Menu assessment** as a table plus a few small charts on the review page: spirits, *Codex* families, glassware, strength range.
- **Batch summary** at the end of each batch: flagged pours first.

## Setup Extensions

On first run (`dps-setup`):
0. Create `_studio/.venv` and install openpyxl.
1. Create `_studio/` with `index.md`, `registry.md`, `menu-assessment.md`, `rule-candidates.md`, `fact-cards/` and `rooms/`.
2. ~~Move `STUDIO-RULES.md` into `_studio/`~~ (dropped 2026-09-25: it stays at `pours/STUDIO-RULES.md`). `studio_init.py` does steps 1 and 3 (specs) idempotently.
3. Seed the fact cards from the three approved dossiers, the registry from the three approved pours, and the room records from tonight's sessions (reconstructed summaries).
4. Seed `ingredients.yaml` and `styles.yaml`.
5. Verify the library exists and is page-marked. Offer to extract a new book (PDF text → PDFKit; scanned → Vision OCR; epub → HTML text) into `_text/`, and add it to `SOURCES.md`.

## Integration

- **Upstream:** the meaning model and the spine define the pour. The studio follows them, and proposes spec changes (like `serves`) as rule candidates.
- **Downstream, now:** Markdown staging pours in `design-artifacts/pours/`, one `.md` file per pour.
- **For Robin:** the editing workbook `_studio/review.xlsx` (read, edit, comment, approve; see skill 5), and the optional reading page.
- **Downstream, later:** once `shared/pour.ts` and `shared/validate.ts` exist (the first build stories after `bmad-spec` and the epics), add an `export` capability to `dps-author-pour` that writes approved pours as typed entries in `shared/data/pours/` and runs the validator. Only `status: approved` pours are exported.
- **Images:** each pour's image brief feeds the persona image pipeline (`design-artifacts/2026-07-08-persona-image-prompts.md`, memory: persona image pipeline).
- **The live Bartender** (spine AD-6) only ever sees approved pours. The anchors' `speaksTo` hints give it the journey answers each passage can weave in.
- **BMAD:** writes nothing to `_bmad-output`. The studio's outputs are project content.

## Creative Use Cases

- "Wren, read the Mentor for me": a persona card without authoring anything.
- "Hester, what's the real story of the Negroni?": a fact card on demand.
- "Tomás, balance this for me": any spec through `balance.py`, including Robin's own ideas.
- House pours (side door, AD-8): the same room writes the Trickster-who-was-sneaky and the Impatient.
- A zero-proof track later (spine: deferred): the same checks with non-alcoholic ranges.
- The room records can become content in themselves (a making-of for the site?).

## Ideas Captured

### Robin, on how the room works and how he reviews (2026-09-24)

- Keep the Excel: "I'm likely to read all of them, and as I read I'll direct edit or leave some comments." So it needs a place for direct edits, and edits must flow back.
- "Be stubborn."

- No fixed order. A living conversation where anyone chimes in when they can add something, like the party-mode sessions. They keep interacting until they agree. If there must be an order: Wren, then Hester, then Tomás.
- Asked what the output format is: see Integration (Markdown staging → typed store; review page; optional spreadsheet overview).


### The spark (Robin, 2026-09-24)

- Psychologist, Historian and Mixologist agents, plus a per-pour workflow, draft the remaining 129 pours for Robin's approval.
- Rules = `STUDIO-RULES.md`. Worked examples = the three approved pours (A Brother's Care, No Accident, Four Shares). Library = `Dionysus/docs/_text/`.
- Output = draft pour files that pass the checks and the validator.
- The room already exists as a proven practice: it's the party-mode session that authored the first three pours. The module makes that room run without Robin present until review.
- Order of work per pour is already fixed by the rulebook: Psychologist reads the person, Historian brings 1–2 candidate drinks whose true story mirrors them, Mixologist designs and runs the four checks, Psychologist writes the reading and the Historian fact-checks it, agents propose at least 3 names with a pick.

### Robin's answers (2026-09-24, Phase 1–2)

- **Name:** Dionysus Pour Studio. Code `dps` (proposed, Robin didn't object).
- **Review happens once, at the very end.** Robin reads every pour and judges one thing: is it punchy enough, will it resonate. No mid-pour checkpoints. So the studio must bring each pour to "approved-ready" on its own, and make Robin's end review fast.
- **The persona comes first, always.** The #1 priority is making the cocktail *for that person*. A menu-level assessment (spirits spread, families, bowls, repeats) can run as the menu grows, but it must only *inform*, never steer a creation much. The only hard cross-pour rule stays: no repeated motifs, and no duplicate names.
- **Robin wants the room's thinking, not just clean drafts.** The clashes (Hester striking her own legend, Wren catching the ambiguity fear, Tomás's too-dry v1) are part of the value. Each pour ships with a readable record of the room: who argued what, what was rejected and why.
- "Let's get to it!": high energy, wants to move to building.

### Context found while loading (to explore in Phase 2)

- `dionysus-experience/shared/` and `shared/validate.ts` don't exist yet. The "validator" the drafts must pass is specified (spine content gate, AD-4, AD-11) but not built.
- The three approved pours are Markdown staging files; the target store is TypeScript in `shared/data/pours/`.
- The launch gate (`STRICT_STORE=1`) needs all 132 pours and at least 12 veto-free. Three veto-free pours exist.
- 129 pours at one Robin review each: review bandwidth is the real bottleneck.
- "No repeated motifs across pours" and "each drink's true story mirrors the person" imply a cross-pour registry (drinks claimed, motifs used, names taken) once there are dozens of pours.
- Shared fact cards (solera, oleo-saccharum, Rob Roy, Seelbach, Stinger runner-up) are meant to be verified once and reused.
- Balance is computed on paper with Arnold's formulas against *Liquid Intelligence* ranges: a deterministic calculator is a natural script.
- House pours (side-door readings: the sneaky Trickster, the Impatient, the Cautious) are also authored text and may share the same studio.

## Build Log

- **2026-09-24: step 1 done: scripts and data** in `{project-root}/skills/dps-tools/` (shared toolkit; every skill calls it by path, instead of each skill carrying its own copy as the briefs above first said). `persona.py`, `library.py`, `balance.py`, `allergens.py`, `lint_pour.py`, `registry.py`, `pourfile.py` (parser), `data/ingredients.json` (70 ingredients, sourced from *Liquid Intelligence* where it has them, including Cointreau and Peychaud's), `data/styles.json` (7 styles + edge rules), `tests/test_tools.py` (13 regression checks pinning tonight's three pours: all pass).
- Each pour now also has a machine-readable **spec** (`_studio/specs/<pairing>.json`, owned by Tomás) that the balance, allergen, lint and registry scripts read. Setup seeds it from `dps-tools/tests/fixtures/`.
- The lint's voice signatures ("Here's what I'd ask", "I like to think") are allowed to repeat. It flagged one real repetition: "That's you, isn't it?" appears in two pours. Question for Robin.
- The three pour files were normalised to one canonical format (no approved wording changed).
- **2026-09-25: step 2 done: `dps-agent-psychologist` (Wren)** at `{project-root}/skills/dps-agent-psychologist/`.
  - **Type:** memory agent, name fixed at build, configuration-style First Breath (about 10 min: she shows Robin her read of his taste and asks 3–6 questions), evolvable, no customize override surface.
  - **Activation paths:** First Breath / `--room <feed>` (joins a pour's room silently: no greeting, no First Breath in the room) / rebirth.
  - **Capabilities:** PR persona-read, WR write-reading, RT resonance-test (plus `resonance-calibration.md`: passing lines and deliberate horoscope failures), IR in-the-room, NM propose-names, LE learn-from-edits.
  - **Seeds:** BOND is seeded with a **voice ledger of Robin's 12 edits** from the first three pours. CREED carries domain standing orders (Barnum watch, voice protection).
  - **Room turn contract** (the workflow must follow it): the host brings each agent in with `--room <feed>`; the agent returns exactly one line, `<icon> **<Name>:** <turn>` or `<icon> **<Name>:** (passes)`, and signs off with "I'd put my name to this." or "Not yet: …". Artifacts go in the pour's scratch folder the host names.
  - **Checks:** `scripts/tests/test_init-sanctum.py` (15 checks) passes; path scan passes.
  - **Accepted warnings:** `uv` isn't installed, so the ruff lint can't run; the init script prints text, not JSON (inherited from the template). The builder's templates assume `uv run`, but this machine uses `python3`.
- **2026-09-25: step 3 done: `dps-agent-historian` (Hester)** at `{project-root}/skills/dps-agent-historian/`.
  - **Type:** memory agent, name fixed, configuration First Breath (asks how much history, how niche, which web sources, thin stories, new books), evolvable.
  - **Capabilities:** MH mirror-hunt, FC fact-card (she owns `_studio/fact-cards/`), AN draft-anchors, FA audit-reading (sentence-by-sentence audit table in the dossier), IR in-the-room, NM propose-names.
  - **Knowledge files:** `source-tiers.md` (every book, its tier and citation format, web tiers, the fact/legend/inference/our-reading labels, conflicts, copyright) and `mirror-examples.md` (the three hunts that worked, and what they share).
  - **Checks:** same as Wren (15/15 sanctum test, path scan passes, 21-line bootloader).
- **2026-09-25: step 4 done: `dps-agent-mixologist` (Tomás)** at `{project-root}/skills/dps-agent-mixologist/`.
  - **Type:** memory agent, name fixed, configuration First Breath (asks who's mixing, bottles, tools, strength ceiling, shared drinks, prep), evolvable.
  - **Capabilities:** DD design-drink (writes `_studio/specs/<pairing>.json`, which he owns), CK run-checks (the four checks via `balance.py` / `allergens.py` / lint; the Checks table), RI write-ritual (method, recipe notes, closing line), IB image-brief (SCENE block per the persona image prompts recipe §4, at the end of the dossier), IR in-the-room, NM propose-names.
  - **Knowledge file:** `craft-reference.md`: the six *Codex* families with core, balance and seasoning (Flip = egg/dairy/nutmeg, never for veto-free pours), the spec format, balance lessons, the journey's vessels, plain-language method, pairings.
  - **Checks:** same results as Wren and Hester.
- **2026-09-25: step 5 done: `dps-author-pour` (the room)** at `{project-root}/skills/dps-author-pour/`.
  - **Structure:** complex workflow: SKILL.md (35 lines) routes to `references/the-room.md`, `closing-the-pour.md` and `batches-and-rework.md`; `assets/room-template.md`; `.decision-log.md` holds every design call.
  - **How the room runs:** three foreground subagents per pour, continued with SendMessage (the standing room). Parallel rounds: each agent sees only the new turns and speaks or passes. A question addressed by name gets an immediate reply. Robin can speak in the room.
  - **Closing:** 8 must-haves (artifact exists *and* its owner presented it) + 3 sign-offs given at or after the last change + lint 0 errors on the assembled pour. Stall = 3 rounds; deadlock = +2 rounds or the budget (10 rounds per pour, 5 per rework; was 16, revised by Robin 2026-09-25) → `flagged`.
  - **Host role:** it assembles and never writes content; lint findings go back to each part's owner.
  - **Batches and rework:** a batch = one primary archetype, a fresh room per pour. Rework keeps Robin's words verbatim and reruns audit, resonance and lint.
  - **Fallbacks and headless:** fresh agents each round, or one mind voicing all three (labelled). Headless runs return JSON.
  - **Supporting changes:** `studio_init.py` added to dps-tools (idempotent; creates `_studio/`, seeds specs, writes the registry). **STUDIO-RULES.md stays at `pours/STUDIO-RULES.md`** (the move was dropped). Unborn agents in the room read their `assets/` seeds.
  - **Checks:** path scan is clean except `.decision-log.md` at the root, which the builder's own process requires (a scanner/process conflict). Custom integrity check 25/25 after one fix.
- **2026-09-25: step 6 done: dry run on `creator-hero` (the Visionary)**, Robin absent.
  - **Result:** **Down the Line**, a Ramos Gin Fizz, in 8 rounds. Closed `flagged` on one decision for Robin, the orange flower water, which is unknown to the ingredient table.
  - **Files:** pour `pours/creator-hero.md`; room record `_studio/rooms/creator-hero.md`; first fact card `fact-cards/ramos-gin-fizz.md` (F1–F18); spec `_studio/specs/creator-hero.json`.
  - **What worked:** real disagreements, resolved on the record (the orange flower water debate), and self-corrections (Hester struck two of her own claims). Sign-off voiding was used once. Wren's resonance test rewrote the tagline and two horoscope sentences unprompted. The agents' seeds alone were enough.
  - **Found and fixed:** `registry.py` leaked spec errors into the menu families; the anchors table lagged behind the audit corrections (now a rule candidate).
  - **Toolkit gap:** no fizz style in `balance.py`; staged soda isn't handled (rule candidate).
  - **Cost:** each agent's context grew to about 150–185k tokens by round 8. Across 129 pours that's substantial. Consider summarising the feed to each agent after about 5 rounds, or a smaller model for the host.
- **2026-09-25: step 7 done: `dps-review-desk`** at `{project-root}/skills/dps-review-desk/` (simple workflow + `scripts/review.py`).
  - **Commands:** `setup` (creates `_studio/.venv` with openpyxl) · `export` · `status` · `sync` · `note` · `approve`. The workbook `_studio/review.xlsx` has four sheets: Read me, Pours, Rule candidates, Menu. On Pours, white cells are editable words, yellow are Robin's (Decision, Notes to the room), and grey are locked for reading.
  - **Robin's words win:** only changed fields are written, verbatim, and the write is refused unless the file parses back to exactly what he typed.
  - **Nothing is lost:** export refuses while there are unsynced edits, and every old workbook is archived. Both stop while Excel has the file open. A row whose pour changed after export is skipped, and its words are kept as desk notes.
  - **One hold:** a recipe edit holds that row's approval until Tomás updates the spec, because the allergen veto depends on it.
  - **Where his words go:** each edit is logged (before → after) at the top of the room record and in `_studio/robin-edits.md`, the agents' learning ledger. Notes queue a `rework queued` row in the index. Accepted rules are written into STUDIO-RULES.md by the workflow.
  - **Checks:** 28/28 on a throwaway copy of the pours folder.
  - **Deferred:** the reading page (`publish`).
  - **Personalities (Robin, 2026-09-25):** the Pours sheet has a read-only personality card beside each pour (from `persona.py`), and the workbook has a full Personalities sheet (both archetypes). Tests: 30/30.
- **2026-09-25: step 8 done: Create Module → `dps-setup`** at `{project-root}/skills/dps-setup/`.
  - **Contents:** `assets/module.yaml` (2 config questions, the three agents in the roster) and `assets/module-help.csv` (21 entries, menu codes unique).
  - **Adapted to this workspace's TOML config:** `scripts/register.py` (standard library) writes a marked `[modules.dps]` block plus the three `[agents.dps-agent-*]` tables into `_bmad/custom/config.toml`, and replaces the module's rows in `_bmad/_config/bmad-help.csv`. Re-run it after a BMAD reinstall. Tested on a copy: it updates in place when re-run, and changes nothing else.
  - **Removed from the template:** `cleanup-legacy.py`, because it deletes installer folders. The YAML-layout scripts are kept for other workspaces; they need pyyaml, run through `uv`.
  - **Studio extensions in setup:** `studio_init.py`, `review.py setup` (the venv), the library check, the toolkit tests, and an offer to link the dps skills into `.claude/skills/`.
  - **`_common.py` now reads the dps config:** environment first, then config, then defaults.
- **Step 8b: Validate Module.** The bundled validator is older than this install. It expects `after`/`before` and no `_meta` row, while the installed catalog and the builder's own setup template use `preceded-by`/`followed-by` with `_meta`. It also reads the module name from the last `name:` line (an agent's). On a copy converted to its format, it passes: no orphans, no duplicate codes, and all references resolve. The roster matches each agent's `customize.toml`.

## Build Roadmap

1. **Scripts and data first** (`balance.py`, `allergens.py`, `library.py`, `persona.py`, `registry.py`, `lint_pour.py` + `styles.yaml`, `ingredients.yaml`). They're deterministic, testable against tonight's three pours (each must reproduce tonight's numbers and pass lint), and every agent depends on them.
2. **`dps-agent-psychologist`** (Build an Agent). The person comes first, in the room and in the build. The resonance test is the hardest capability, so it's built with the three approved readings as passing examples and deliberately generic versions as failing ones.
3. **`dps-agent-historian`**: fact cards seeded from the dossiers.
4. **`dps-agent-mixologist`**: checks proven against tonight's numbers.
5. **`dps-author-pour`** (Build a Workflow): the standing room, the shared feed, turn-taking, closing rules, lint.
6. **Dry run on the Visionary (`creator-hero`)**, compared with how tonight felt. Robin reviews.
7. **`dps-review-desk`**: workbook export/sync first (Robin's main desk), then the reading page.
8. **Create Module (CM)** → `dps-setup`; then **Validate Module (VM)**.
9. First real batch.
- **2026-09-25: Robin's review of the dry run.**
  - **The ingredient table never limits the drink.** A new `dps-tools/scripts/add_ingredient.py` lets Tomás add any ingredient (safe-side allergens, marked `review: pending`). Lint warns, never errors, and the table's rules, the CREED and the references are updated. Rule candidate 3 is superseded.
  - **Round budget:** 10 per pour, 5 per rework, and the agents know the clock ("The Clock" in each `in-the-room.md`).
  - **Epigraph rule** (in STUDIO-RULES): it must make sense before the reading.
  - `_common.py` understands `drops`.
  - Rework 1 of creator-hero took rounds 9–12, with fresh agents.
- **2026-09-25: Robin's rules and the fourth approval.**
  - **No drink type is off limits.** `balance.py` gains styles hot, highball, collins, fizz, blended, flip and freeform, with a staged `top` for soda poured last. All six Codex root families are mapped (`styles.json` `_codex_families`), and each new style's derivation from Codex recipes is written in its note.
  - **Anchors follow audit corrections.** This is now in STUDIO-RULES.
  - **New ingredients are Tomás's call**, with no approval step for Robin (the guest's own veto protects them).
  - **Tests:** 19 checks, including the Visionary and the Codex Hot Toddy and Whisky Highball.
  - **Pour #4 approved:** creator-hero, *Down the Line*.

