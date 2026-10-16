# Epic 2 Context: The Bartender adds to the reading

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Make the authored reading from Epic 1 feel written for the guest, with no loss of quality. The guest's name is cleaned on the device and placed in the two movement lines ("This is you, Robin: the Visionary." and "Before you go, Robin."). No AI is involved, so this works on every path. A live Bartender call then adds one short passage to "This is you" and one to "Before you go". The passages are built from the H7 trace and at most one answer. Every authored word stays verbatim, and the call must finish inside the H8 breath. Any failure means no addition, and the guest sees nothing of it. Success means the guest recognises their own trace and name in a reading that still reads as Robin's. The standard planning-artifacts directory is empty, so this context is distilled from the epic, its ticket tree, the parent initiative, the canonical agent specification, its 2026-10-15 decisions and the architecture spine's 2026-10-15 amendment.

## Stories

- Story 2.1: Clean the name and put it in the movement lines
- Story 2.2: Bartender prompt, placement and model on measured latency (spike)
- Story 2.3: Trace boundaries: pre-check, acceptAddition and the red-team set
- Story 2.4: POST /api/reveal on Vercel with a stubbed Bartender
- Story 2.5: App asks at H7 seal and the breath waits
- Story 2.6: Rewrite the breath echo and the privacy line
- Story 2.7: Blind review, red-team pass and phone latency
- Story 2.8: Production deploy with key, limits and the ops check

## Requirements & Constraints

- **Name, on the device only.** The cleaner keeps letters of any script, apostrophes and hyphens. It removes emoji, digits and symbols, collapses spaces and fixes shouting or all-lowercase case. It gives the first name for sentences and the cleaned full name for hero, card, PDF and keep link. It returns null for empty, single-letter or overlong (about 20+ characters) names, for hand-written EN/FR insults, for obvious non-names and for injection phrases. H1 never shows a validation message. Without a name, the movement lines keep today's wording. The name is never sent to the server and never reaches the LLM.
- **Add, don't rewrite.** Only "This is you" (`whoYouAre`) and "Before you go" (the proposal paragraph) change. Each gets at most one short addition in the author's voice. The story and cocktail movements, the recipe and every authored word stay untouched. When a trace was written, the "This is you" addition must use it, with at most one answer echo. The runtime generates nothing else, and the pick stays deterministic (`shortlist[0]`): the Bartender does not choose.
- **The trace is untrusted data.** It is trimmed to at most 120 characters and stripped of control characters. It travels only in the reveal request body. It is never logged, stored, written to a record or echoed in an error. A pre-check withholds insulting or instruction-like traces, and the call then uses answers only. The prompt forbids following the trace, quoting it at length or judging it, and a painful trace is met gently or left alone. Insults or injection in the trace or answers must never surface in a reading.
- **Output guard.** An addition is rejected if it is too short or too long, contains digits, new proper nouns (invented facts), URLs, markup or blocklisted words, or has more than one `{name}` slot or any other braces. A rejected addition is dropped silently.
- **Latency.** Hard cap of 9 s from the request, judged on the slowest case (a phone on 4G), not the average. The server budget is 7 s or less. Additions stay short so the call stays fast.
- **Copy.** The breath echo "…the one thing you told only the ink" and the privacy line near Share must stop promising secrecy. Robin writes both lines.
- **Quality evidence.** About 30 test guests are reviewed blind (authored against personal), and the personal version must read at least as well. A red-team set (insults, injection, distress, other languages, emoji, empty) never surfaces unsafe text. About 60 tricky names each come out cleaned or null. Voice stays mystical, sophisticated, theatrical and intimate, in English.

## Technical Decisions

- **Shared core.** All new rules live in the pure `shared/` core: no DOM, network, clock or randomness. The name cleaner exposes `addressName` and `displayName` in `shared/name.ts`. The trace pre-check lives in `shared/trace.ts`. `LiveCopy`, `acceptAddition(kind, text, context)` and `assembleReading` live in `shared/reading.ts`. Import seams between `src`, `shared`, `server` and `api` stay enforced.
- **Live copy and assembly.** `LiveCopy` is `{who: string | null, proposal: string | null}`. It replaces the earlier whole-passage tailoring and its ±30% rewrite guard. `assembleReading` appends `who` after the authored `whoYouAre` and `proposal` after the authored proposal paragraph, then fills a single `{name}` slot from `addressName`, or drops the sentence holding it. A null addition leaves the authored text alone. Every surface still builds through this one assembler.
- **Guard limits.** The length limits in `acceptAddition` start as parameters. The spike's measured lengths set them.
- **Request.** `RevealRequest` carries the trimmed trace. It uses `z.strictObject` at every nesting level, has no name and no diagnostics, and returns 400 on unknown keys or schema skew. The client parses with the same schema before sending.
- **Bartender input and output.** The input is the pour's `whoYouAre`, the proposal paragraph, its anchors, the personality, the answers and the trace as delimited, quoted data. The output is strict JSON `{who, proposal}`, each nullable, zod-validated.
- **API shell.** `POST /api/reveal` is a Vercel function (Hono app in `api/`, services in `server/`, routing in `vercel.json`, its own api tsconfig). It calls only OpenRouter chat completions over plain `fetch`, and every request carries `provider: {data_collection: 'deny', require_parameters: true}`. `BARTENDER_MODELS` is an ordered ladder chosen by the spike on measured latency and quality, and it stops when the 7 s budget runs out. A paid fast model is allowed behind a credit limit, with the provider's training setting off.
- **Rate limit.** Upstash sliding window of 10 per minute per IP, with a 500 ms timeout and `pending` passed to `waitUntil`. Over the limit returns 429, and the client treats it as a fallback. IPs exist only in keys that expire with the window, which are prefixed by `VERCEL_ENV`.
- **Logging and ops.** Each reveal writes exactly one log line on every path: `{pairing, source, failReason, model, ms}`, with no answers, name or trace. A weekly check of the authored (fallback) ratio serves as the outage alarm.
- **Config and degradation.** Server-only env vars are `OPENROUTER_API_KEY`, `BARTENDER_MODELS` and `KV_REST_API_URL`/`KV_REST_API_TOKEN` (`UPSTASH_REDIS_REST_*` also accepted). No secret ever goes in `VITE_*`. Env vars are checked before any client is built. A missing key, missing Redis or any error returns `{who: null, proposal: null}`. The API never returns raw errors, and nothing crashes on a missing integration.
- **Orchestration.** `App` alone owns the request. It fires when H7 seals, not at H6. H8's engine seam is the wait: the breath loops until ready or the 9 s cap. Any non-200, network error, schema mismatch or cap firing serves the local authored reading. There is no retry and no visible error. Additions are kept on the device with the remembered pour, so the keep link reopens them on the same device.

## UX & Interaction Patterns

H1 stays open: there is no validation feedback on the name. The breath (H8) keeps looping its echoes while it waits and then condenses. The guest never sees an error, a spinner message or a degraded state. The fallback is simply the authored reading. TheReading renders each addition directly after its authored passage. The hero, card, PDF and keep link show the cleaned full name, or no name. The SPA relies on React escaping only, with no raw HTML from additions.

## Cross-Story Dependencies

- **Parallel start.** Stories 2.1, 2.2, 2.3, 2.4 and 2.6 have no prerequisites and run in parallel, in separate worktrees.
- **File ownership.** There is one writer per file:
  - 2.1 owns `shared/name.ts` and TheReading's movement lines.
  - 2.3 owns `shared/reading.ts` and `shared/trace.ts`.
  - 2.4 owns `RevealRequest` in `shared/answers.ts`, plus `api/`, `server/` and `vercel.json`.
  - 2.2 writes only `agent/bartender/`.
- **Joins.** 2.5 joins 2.1 to 2.4. It also updates Epic 1's e2e privacy test, which today asserts that no trace goes on the wire. That test must now allow the trace only in the `/api/reveal` body. 2.7 follows 2.5 and 2.6, and 2.8 follows 2.7.
- **Prior epic.** Epic 1's shared core (`selectShortlist`, `assembleReading`, the strict schemas, the catalogue) is a prerequisite.
- **Deferred to Epic 3.** Pour persistence and `pourId`, share links, OG and share HTML, house pours and the four-outcome router.
- **Needs Robin.**
  - An OpenRouter key with a credit limit and training off. It blocks the spike's live runs.
  - Upstash Redis through the Vercel Marketplace. It blocks the rate limit, but the shell can land with it disabled.
  - The two copy lines.
  - Any real H7 traces from playtests, for the fixtures.
- **Open assumptions, to confirm in the spike.**
  - With no trace, the call still runs on answers alone. Robin may prefer no call at all in that case.
  - Each addition goes after its authored paragraphs. The spike tests both placements.
