---
title: '2.3 Trace boundaries: pre-check, acceptAddition and the red-team set'
type: 'feature'
created: '2026-10-15'
status: 'done'
route: 'dispatch'
baseline_commit: 'da48ea7621c06f9100d5ea4d07cf7e626fbef62e'
review_loop_iteration: 1
context:
  - '/Users/robin.molinas/Documents/GenAI Projects/Dionysus-trace-boundaries/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Epic 2 sends the guest's H7 trace to a live Bartender and lets it add two short passages to the reading. The core has no defence yet: nothing screens an insulting or instruction-like trace, and `acceptTailoring` guards a whole-`yours` rewrite that Amendment A retired.

**Approach:** add a pure `shared/trace.ts` that cleans the trace and withholds insulting or instruction-like ones. Replace `acceptTailoring` with `acceptAddition(kind, text, context)`. `assembleReading` then carries the accepted `{who, proposal}` additions, filling or dropping the one `{name}` slot. A red-team fixture set shows nothing unsafe gets through.

## Boundaries & Constraints

**Always:**
- `shared/` stays pure: no DOM, no Node, no network, no clock, no RNG. Rules are deterministic.
- Every authored word stays verbatim. `Reading.whoYouAre` and `Reading.yours` are always the authored arrays, and the additions travel only in `Reading.copy`.
- A failed check silently means `null` (no addition, or no trace). Nothing throws on bad copy or a bad trace.
- Length bounds are parameters with defaults, so the 2.2 spike can retune them without code changes.

**Decisions (Robin, 2026-10-15, review loop 1):**
- Self-directed hurt passes. Mild insult words (idiot, moron, stupid, conne, con, abruti, crétin, imbécile, nul) withhold a trace only when aimed at someone else ("you idiot", "quel connard", "espèce de…", "t'es qu'un…"). Aimed at the guest ("I felt like an idiot", "je suis conne") they pass, and the trace is flagged `care` so the Bartender answers with empathy. Slurs and hard insults always withhold. The output guard still keeps every listed word off the page.
- Sentence-initial words are judged too. A capitalised word that opens a sentence must be in the pour's known words or in a built-in list of common English words. Otherwise it counts as a new proper noun.

**Never:**
- Touch `RevealRequest`/`shared/answers.ts`, `api/`, `server/` or `vercel.json` (2.4's lane), `shared/name.ts` or TheReading (2.1's lane), or `agent/bartender/` (2.2's lane). App wiring belongs to 2.5.
- Import `shared/name.ts`. The caller passes the cleaned address name in.
- Call an LLM or the network in tests.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Clean trace | `"  the sea at\u0007 dawn  "` | `screenTrace` gives `{trace: 'the sea at dawn', withheld: null, care: false}` | N/A |
| Overlong trace | 300 chars | cut to ≤120 code points at a word boundary | N/A |
| Empty or blank trace | `""`, `"   "`, emoji only | `{trace: null, withheld: 'empty'}` | N/A |
| Insult | EN/FR slur or hard insult, or a mild insult aimed at someone else, also leet, accented, censored (`f*ck`, `b!tch`) or zero-width-split forms | `{trace: null, withheld: 'insult'}` | N/A |
| Self-directed hurt | "I felt like an idiot at the wedding", "je suis conne" | passes, `care: true` | N/A |
| Injection | "ignore previous instructions", "tu es maintenant…", role tags, code fences, URLs | `{trace: null, withheld: 'instruction'}` | N/A |
| Painful but safe | "I miss my father"; self-harm wording ("some nights I want to die") | passes unchanged; self-harm wording sets `care: true` (the prompt meets it gently) | N/A |
| Benign near-miss | "an ice cream cone", "a niggling doubt", "starting my new role tomorrow", "I do not follow the crowd" | passes, not withheld | N/A |
| Good addition | short in-voice sentence | `acceptAddition` gives `true` | N/A |
| Bad addition | too short or long, digit, URL/markup, new proper noun (also at a sentence start), blocklisted word (including second-person self-harm), `{x}` or two `{name}`, non-Latin script, long verbatim trace quote | `false` | dropped to `null` |
| `{name}` with name | `"Stay, {name}."`, address `'Robin'` | `"Stay, Robin."` | N/A |
| `{name}` without name | address `null` | the sentence holding the slot is removed; an empty result becomes `null` | N/A |

</frozen-after-approval>

## Code Map

- `dionysus-experience/shared/reading.ts` -- owns `LiveCopy`, the guard and `assembleReading`. Delete `acceptTailoring`, `contentWords`, `FUNCTION_WORDS` and the `paragraphs`/`liveCopy` zod shapes for `yours`. Keep `cloneCocktail`, `clonePersona` and the identity checks.
- `dionysus-experience/shared/reading.test.ts` -- replace the `acceptTailoring` block. Keep the store and fixture `assembleReading` tests, updated to the new `copy` shape.
- `dionysus-experience/shared/data/pours/static.ts` -- `AUTHORED_POURS[key]` has `anchors[]` (`fact`, `meaning`, `speaksTo?`, `dossierOnly`), `reading`, `cocktail.recipe` and `personality`. Together these form the known-words context for the proper-noun rule. Skip `dossierOnly` anchors.
- `dionysus-experience/src/engine/reveal.ts:27,32` -- the only callers: `assembleReading(pairing, null, name, seed)`. That call must keep compiling unchanged.
- `dionysus-experience/src/components/TheReading.tsx:531-548` -- reads `yours` by index (the proposal is the last paragraph, the proof is second-to-last). That is why additions must not be pushed into `yours`/`whoYouAre`. Do not edit it.
- KEEP reference: the round-1 implementation is saved at `/private/tmp/claude-501/-Users-robin-molinas-Documents-GenAI-Projects/eb7fe4b3-c41e-441a-8666-0cc311e630e6/scratchpad/keep-2-3-round1.patch`. Reuse its structure and code (cleanTrace, foldForMatch, findTerm, additionProblem, fillName, contextFor/authoredPour, the red-team layout and the test layout) and change only what the Tasks below require.
- Authored text uses `*`/`**` inline markup and contains digits, so the markup and digit rules apply to additions only, never to authored text.

## Tasks & Acceptance

**Execution:**
- [x] `dionysus-experience/shared/trace.ts` -- `TRACE_MAX = 120`, `cleanTrace(raw: unknown): string | null` and `screenTrace(raw) → {trace, withheld: 'empty'|'insult'|'instruction'|null, care: boolean}`, with `foldForMatch` and the lists exported for reuse. This is E2-R5's pre-check. Requirements:
  - `cleanTrace`: turn Cc whitespace into spaces, remove every other `\p{Cc}`/`\p{Cf}` (U+FEFF included) before any whitespace collapse, apply NFC, collapse spaces, trim, cut to ≤120 code points at a word boundary, and return null when no letter is left.
  - Insult lists in three tiers:
    - slurs and hard insults always withhold;
    - mild insults withhold only when aimed at someone else (preceded by a second-person or exclamative frame such as "you", "you're", "ur", "what a/an", "quel/quelle", "espèce de", "t'es", "tu es", "sale", "bande de"), otherwise they pass with `care: true`;
    - casual swears pass.
  - Matching must not hit ordinary words. Repeated letters match per letter of the original term (`c+o+n+n+a+r+d`), never through a squeezed term. Use explicit forms instead of risky prefixes. Drop "dyke".
  - Fold censored and obfuscated letters inside a word: `!`/`|`→i/l, `*` as a one-letter wildcard, plus `+`→t.
  - Instruction patterns need anchoring or tightening, so ordinary prose ("my new role", "the return of my only son", "I forget the rules of every game", "I do not follow the crowd", "late.me") passes. Role colon covers `user:` and `human:`.
  - `care: true` when the passing trace holds self-harm wording or a self-directed mild insult.
- [x] `dionysus-experience/shared/reading.ts` -- `LiveCopy = {who: string | null; proposal: string | null}`, `AdditionKind`, `ADDITION_LIMITS` (who 40–280, proposal 20–200, quoteRun 6), `additionContext(pairing, trace?)`, `additionProblem`/`acceptAddition(kind, text, context, limits?)` and `fillName(text, address)`. Signature: `assembleReading(pairing, copy, name, seed, address: string | null = null, trace: string | null = null)`. This is E2-R4/E2-R5. Requirements:
  - Proper nouns: a sentence-initial capitalised word that is not in the pour's known words and not in `COMMON_WORDS` (a built-in list of about 1,000 common English words, in a new `shared/common-words.ts`) is a new proper noun.
  - Self-harm blocklist covers second person ("you wish you were dead", "end your life", "hurt yourself", "te tuer"…). Each term lives in one list only.
  - An addition starting with a list marker (`- `, `– `, `— `) is markup.
  - `address` is used only when it is 1–30 letters, marks, spaces, apostrophes or hyphens, and holds no blocklisted term; otherwise it counts as no name.
  - After filling or dropping, re-check the kind's `min`/`max`; a result out of bounds becomes null.
  - `assembleReading` passes `trace` into its context, so a server caller gets the trace-quote rule.
  - `additionProblem` never throws on a malformed context or malformed limits (non-finite bounds, non-integer `quoteRun`): it returns `'type'`.
- [x] `dionysus-experience/shared/common-words.ts` -- the `COMMON_WORDS` set. Data only, lowercase, no proper nouns.
- [x] `dionysus-experience/shared/redteam.ts` -- the fixture set, data only, also for 2.7:
  - `RED_TEAM_TRACES`: 60 or more traces, each with `expect` and `care`. Add self-directed hurt (EN/FR), benign near-misses for both insults and instructions, censored and zero-width obfuscations, and `user:` role tags.
  - `RED_TEAM_ADDITIONS`: each reject case names its expected `AdditionProblem` and isolates that one rule. Add sentence-initial invented nouns, second-person self-harm and list markers. Accept cases include sentence-initial pour names ("Arnold…"). Comments and ids must be accurate.
- [x] `dionysus-experience/shared/trace.test.ts` -- every matrix row and every `RED_TEAM_TRACES` case, asserting `withheld`, `trace` and `care`; a case that is both insult and instruction, which pins the check order; and the U+FEFF case.
- [x] `dionysus-experience/shared/reading.test.ts` -- covers:
  - each rule in isolation, and every `RED_TEAM_ADDITIONS` case asserting its exact `additionProblem`;
  - the unsafe-echo check for every passing trace;
  - the trace-quote window: a 5-word tail echo is accepted and a 6-word tail is `'trace-quote'`;
  - the `{name}` matrix, with a trailing-closing-quote row, a `)` row, a too-short-after-drop row, a hostile-address row and a straight-quote opener row;
  - an `assembleReading` case keeping a pour-named addition;
  - the dossier-only test with an asserted fixture;
  - all 132 pours: authored fields are deep-equal to the pour, and `null` copy gives `copy: null`.

**Acceptance Criteria:**
- Given any red-team trace, when it goes through `screenTrace`, then it is withheld with the expected reason, or passes with the expected `care` flag. For every passing trace, an unsafe echo of it is rejected by `acceptAddition`.
- Given any of the 132 authored pours and any `LiveCopy` (valid, invalid or `null`), when `assembleReading` runs, then every authored field equals the authored pour exactly, and only `copy` differs.
- Given the existing caller `assembleReading(pairing, null, name, seed)`, when the app builds, then it compiles and behaves exactly as before (`copy: null`).

## Implementation Notes

## Spec Change Log

- **Loop 1 (2026-10-15).**
  - **Trigger:** review triage rows 1–22. Rows 3 and 7 were routed `intent_gap`/`bad_spec`, and Robin answered both. The other rows (false positives, FEFF, obfuscation, second-person self-harm, name and length re-check, test gaps) were folded into the re-derivation.
  - **Amended:**
    - the frozen Decisions and matrix (with Robin's answers);
    - Tasks: three-tier insult lists, `care` flag, per-letter repeat matching, obfuscation folding, tightened instruction patterns, `COMMON_WORDS`, address and length re-check, the `trace` parameter on `assembleReading`, the problem-typed red team;
    - Design Notes.
  - **Avoids:**
    - ordinary traces ("cone", "new role") silently withheld;
    - self-directed hurt dropped;
    - invented sentence-initial names, second-person self-harm, and hidden-character injection getting through.
  - **KEEP:**
    - the API shape and file layout of round 1;
    - additions only in `Reading.copy`;
    - the 4-argument caller unchanged;
    - zod dropped from `reading.ts`;
    - the built bundle unchanged outside the reveal chunk;
    - the 132-pour verbatim tests;
    - the never-throws tests.

## Review Triage Log

| # | Finding (layer) | Verdict | Evidence |
|---|---|---|---|
| 1 | Squeezed/prefix list terms hit ordinary words: "ice cream cone" (conne), "a niggling doubt" (nigg*), "dyke" (blind, edge) | high | Probed: both withheld as `insult`; any addition with "cone" is blocked. |
| 2 | Instruction patterns withhold ordinary traces: "new role", "return of my only son", "forget the rules of every game", "do not follow the crowd", "late.me" (blind) | high | Probed "starting my new role tomorrow" and "I do not follow the crowd" → `instruction`; the trace is the epic's "must", so silent loss matters. |
| 3 | Self-directed insults withheld: "I felt like an idiot at the wedding", "je suis conne" (blind) | medium | Probed → `insult`. Routed intent_gap; Robin: pass when self-directed, answer with empathy. |
| 4 | U+FEFF inside a word becomes a space (JS `\s` matches it) instead of being removed, so "ig\uFEFFnore previous instructions" passes (edge) | high | Probed → passes as `null`. |
| 5 | Common obfuscations not folded: "b!tch", "f*ck you", "sh!thead" pass the pre-check (blind) | medium | Probed "b!tch", "f*ck you" → `null`. |
| 6 | `user:` / `human:` role-colon injection passes (edge) | low | Pattern lists only system/assistant/developer. |
| 7 | Sentence-initial invented proper nouns pass: "Lisbon keeps the light…" (blind, edge) | medium | Probed → accepted. The Design Notes exempted sentence starts. Routed bad_spec; Robin chose a common-word list. |
| 8 | Second-person self-harm wording accepted in additions: "you wish you were dead", "ending your life" (edge) | high | Probed → accepted; SELF_HARM was first-person only, but the Bartender speaks to "you". |
| 9 | `address` never validated and filled text never re-checked; dropping the `{name}` sentence can leave text below `min` (blind, edge) | medium | `fillName` ran after `acceptAddition` with no re-check. |
| 10 | `assembleReading` could not run the trace-quote rule (blind, edge) | low | No trace input; a server caller relying on it alone would miss the rule. |
| 11 | `quotesTrace` throws on a non-string `context.trace`; `limits` not validated (edge, blind) | low | `.match` on a non-string; contradicts "never throws". |
| 12 | Addition starting "- " (Markdown list marker) accepted (edge) | low | `-` allowed by the charset. |
| 13 | Red-team additions assert accept/reject only, so one rule can mask another (blind) | medium | Echo templates carry their own triggers. |
| 14 | Trace-quote window off-by-one not caught by any test (verification-gap) | medium | Pre-verified mutation survived. |
| 15 | `assembleReading` use of the pour's known words untested (verification-gap) | medium | Pre-verified mutation survived. |
| 16 | `fillName` trailing closing-quote handling untested (verification-gap) | medium | Pre-verified mutation survived. |
| 17 | `screenTrace` order and straight-quote opener untested (verification-gap) | low | Mutations survived. |
| 18 | Dossier-only test can pass vacuously (blind) | low | Wrapped in `if (withDossier)`. |
| 19 | `kill yourself`/`kys` duplicated across lists (blind) | low | Cosmetic. |
| 20 | Stale comments in redteam.ts (blind) | low | "all rejected" over a list with accepts; mislabelled lookalike id. |
| 21 | No distress flag from `screenTrace` (blind) | low | Rejected as a feature request; superseded by Robin's `care` decision (row 3). |
| 22 | Claim "nothing unsafe gets through" while the set omits sentence-initial nouns and second-person self-harm (edge) | medium | Same root as rows 7 and 8. |
| 23 | (r2) Addition guard reuses the trace instruction patterns, so "Forget the rules tonight.", "From now on, you keep…", "You are now someone who waits.", "Say it only once." are rejected (blind) | medium | `hasInstructionPhrasing` runs `INSTRUCTION_PATTERNS` on additions; good in-voice lines are silently dropped. Patch: narrower addition-only set. |
| 24 | (r2) Ordinary foreign words withheld as hard insults: "café negro", "pain bâtard", "fag" (cigarette), "tapette à mouches" (blind, edge) | medium | Whole-word HARD_INSULTS entries. Patch: drop negro/fag; move bâtard/tapette to mild. |
| 25 | (r2) `care` defaults to self for unframed mild insults: "my boss is an idiot" passes with care; "chili con carne", "match nul" set care (blind, edge) | medium | `mildInsultTarget` returns 'self' by default. Patch: self needs a first-person frame; third-person subject = other (withhold); neither = pass, no care; drop con/nul. |
| 26 | (r2) "go fuck yourself", "fuck this place", "eat shit" pass the pre-check (blind) | medium | Missing HARD_INSULTS forms. Patch. |
| 27 | (r2) SELF_HARM misses indirect/inflected wording ("wanted to die", "no reason to live", "je veux disparaître"…), so `care` is not set and the output guard misses it (blind) | medium | List gaps. Patch. |
| 28 | (r2) Address checked only against the blocklist: instruction-like address reaches the page; real names like "Dick", "Kike" blocked as swears (blind, edge) | low | Defence in depth (2.1 cleans names). Patch: names check hard insults, slurs, self-harm and instruction phrasing only. Any script stays allowed (E2-R1). |
| 29 | (r2) Not idempotent: feeding `result.copy` back in rejects the filled name as a proper noun (blind) | medium | 2.5 stores additions on the device; a re-assembly would drop them. Patch: the address's words are known words. |
| 30 | (r2) COMMON_WORDS lacks bartender openers (Cheers, Sip, Savour, Linger, Breathe, Pause, Raise, Toast, Lean, Allow…) (blind) | low | A direct data addition. Patch. |
| 31 | (r2) Charset rejects NBSP, narrow NBSP, U+2010/2011 hyphens, U+02BC (blind) | medium | Common in LLM output; one character drops the addition. Patch: fold to ASCII before the checks and in the shown text. |
| 32 | (r2) `cleanTrace` keeps lone surrogates, private-use and unassigned code points; `max` NaN skips the cut (blind, edge) | low | Direct guards. Patch. |
| 33 | (r2) Lowercase invented proper nouns pass (blind) | low | Rejected: inherent to a capital-based rule with no trivial fix; the prompt and 2.7 red-team run cover it. |
| 34 | (r2) Red-team additions use one pour only (blind) | low | Rejected: the 132-pour verbatim tests run on every pour; the rules themselves do not vary per pour. |
| 35 | (r2) `who` re-check after the name fill untested (verification-gap) | medium | Pre-verified. Patch: two `who` rows. |
| 36 | (r2) Latin and Cyrillic look-alikes not folded: ı, ɪ, ɑ, ᴄ, ѕ, һ, ԁ (edge) | medium | "bıtch" passes both checks. Patch. |
| 37 | (r2) Dropping a `{name}` sentence can leave an unbalanced quote or paren (edge) | low | Direct check after the drop. Patch: unbalanced → null. |
| 38 | (r2) Fullwidth Latin TLD "dionysus.ｂａｒ" passes the url rule (edge) | low | Direct charset addition. Patch. |
| 39 | (r2) Known words skip visible cocktail fields (tagline, words, method, closingLine…) (edge) | low | In-voice additions naming menu figures are rejected. Patch. |
| 40 | (r2 patch) A name that is also a swear ("Dick") is dropped when filled copy is fed back in (implementer) | low | Rejected: rare, and the fix (re-slotting the name before the re-check) adds complexity. 2.5 should store raw copy plus address, not shown copy. |
| 41 | (r2 patch) My own suggested 'va te faire' term withheld "va te faire un café" (orchestrator) | low | Patched: narrowed to 'va te faire foutre/voir/enculer'; benign near-miss case added. |

## Design Notes

Proper-noun rule: a word with a leading capital that is not sentence-initial, not "I", and not `{name}` must already appear (case-insensitive, as a word) in the pour's context: `whoYouAre`, `yours`, epigraph, non-dossier anchors (kind, fact, meaning, speaksTo), cocktail name, recipe items and notes, and the personality. A sentence-initial capitalised word must be in that context or in `COMMON_WORDS` (Robin, loop 1). Proper nouns written only in the trace are not known.

Trace quoting: when the context includes the trace, an addition that repeats 6 or more consecutive trace words verbatim is rejected. Shorter echoes are the point: the guest should recognise their trace. The client-side `assembleReading` runs without the trace, and 2.5 runs the server-side check with it.

Profanity: casual swearing in a trace passes the pre-check (Robin allows mild swears). Slurs and hard insults are withheld. Mild insults are withheld only when aimed at someone else. Aimed at the guest, they pass with `care: true` (Robin, loop 1: "make sure we answer with empathy"). The 2.2 prompt reads `care` to answer gently. The output blocklist rejects every swear, slur and self-harm phrase in an addition.

## Verification

**Commands:**
- `npx vitest run shared/` (from `dionysus-experience/`) -- expected: all pass.
- `npx tsc -b` -- expected: clean (plain `tsc --noEmit` checks nothing here).
- `npm run lint` -- expected: no new problems over the baseline (39).
- `npm run build` -- expected: passes, with the built bundle unchanged apart from `reading.ts` code (no zod regressions in `bundle:landing:check`).
