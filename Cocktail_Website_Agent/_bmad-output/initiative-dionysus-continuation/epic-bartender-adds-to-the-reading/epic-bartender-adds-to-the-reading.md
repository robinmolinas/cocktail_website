---
type: epic
title: "The Bartender adds to the reading"
parent: initiative-dionysus-continuation
covers: [CAP-1, CAP-5, CAP-6, CAP-7]
after: []
assignee: ""
risk: high
---

# The Bartender adds to the reading

## Description

Epic 1 gives each guest an authored cocktail and reading picked from their answers. This epic makes the reading feel written for them in two ways, without lowering its quality:

- The guest's name, cleaned on the device, opens two movement lines: "This is you, Robin: the Visionary." and "Before you go, Robin." No AI is involved, so it works on every path.
- A live Bartender call adds one short passage to "This is you" and one to "Before you go". The passages are built from the H7 trace when one was written, plus at most one answer. Every authored word stays as written, and the story and cocktail movements are never touched.

The call starts when H7 seals and must finish inside the H8 breath (9 s cap). The trace is treated as untrusted data at every step. Any failure means no addition, silently.

## Outcome

The guest recognises their own trace and name in a reading that still reads as Robin's. Evidence: the blind side-by-side review, the red-team set, and the slowest-case latency on a phone.

## Requirements

- E2-R1 (CAP-5, Privacy): `shared/name.ts` cleans the H1 name: letters of any script, apostrophes and hyphens kept; emoji, digits and symbols removed; spaces collapsed; shouting or all-lowercase case-fixed. `addressName` gives the first name for sentences, `displayName` the cleaned full name for hero, card and PDF. It returns `null` for empty, single-letter or overlong names, names on the hand-written EN/FR insult list, obvious non-names and injection phrases. H1 shows no validation message.
- E2-R2 (CAP-5, CAP-7): the movement lines read "This is you, {name}: {the personality}." and "Before you go, {name}.". Without a name they keep today's lines. Hero, card, PDF and the keep link show `displayName`, or nothing.
- E2-R3 (CAP-1, Privacy): `RevealRequest` carries the trace (trimmed, ≤120 chars, control characters removed), still strict at every level, with no name and no diagnostics. It is never logged, stored or echoed in an error.
- E2-R4 (CAP-5, CAP-6): the Bartender contract. Its input is the pour's `whoYouAre`, the proposal paragraph, the anchors, the personality, the answers and the trace as delimited, quoted data. It returns strict JSON `{who, proposal}`: short passages in the author's voice, each nullable. `assembleReading` appends them after the authored text and fills a single `{name}` slot from `addressName`, or drops that sentence.
- E2-R5 (Privacy, CAP-5): trace boundaries.
  - A pre-check withholds a trace that is insulting or reads as instructions. The call then uses answers only.
  - The prompt forbids following, quoting at length or judging the trace. A painful trace is met gently or left alone.
  - `acceptAddition` rejects:
    - additions that are too short or too long;
    - digits;
    - new proper nouns;
    - URLs or markup;
    - blocklisted words;
    - more than one `{name}`, or any other braces.
  - A rejected addition is dropped.
- E2-R6 (CAP-6, AD-12): `POST /api/reveal` is a Vercel function.
  - It calls OpenRouter over `fetch` with `data_collection: 'deny'`, a measured model ladder and a ≤7 s budget.
  - It applies a 10/min/IP Upstash rate limit.
  - It logs one line per reveal (`{pairing, source, failReason, model, ms}`, nothing personal).
  - With no key, no Redis or any error, it returns `{who: null, proposal: null}`.
- E2-R7 (AD-9): `App` fires the request when H7 seals. The breath waits until ready or the 9 s cap. Additions are kept on the device with the remembered pour, so reopening the keep link on the same device shows them.
- E2-R8 (copy): the breath echo "…the one thing you told only the ink" and the privacy line near Share are rewritten so neither promises secrecy. Robin owns the words.
- E2-R9 (quality): about 30 test guests are reviewed blind, authored against personal, and the personal version reads at least as well. The red-team set (insults, injection, distress, other languages, emoji, empty) never surfaces anything unsafe. The slowest-case latency (phone, 4G) stays under the cap.

## Done when

1. `npm run build` passes, including the name set (about 60 tricky names: each cleaned or dropped) and the `acceptAddition` and red-team tests.
2. With a key configured, a completed journey shows the trace-based "This is you" passage and the "Before you go" line within the breath, and the name in both movement lines. With no key, a timeout, a 429, a bad response or a rejected addition, the guest sees the authored reading with no error.
3. The e2e privacy test shows the trace only in the `/api/reveal` body, never in a log line, storage or another request, and the name never in the prompt.
4. Robin's blind review passes. The slowest measured reveal on a phone over 4G is under 9 s. This is deployed to production.

## Boundaries

This epic covers the name cleaner, the movement lines, `/api/reveal` and the Bartender, the trace boundaries, the App wait and the review. It does not cover pour persistence, share links, OG or house pours (epic 3), the matching model or the catalogue (epic 1), or hold design beyond the two copy lines.

## References

- parent — Dionysus/Cocktail_Website_Agent/_bmad-output/initiative-dionysus-continuation/initiative-dionysus-continuation.md
- spec — Dionysus/Cocktail_Website_Agent/agent/spec/SPEC.md, CAP-1, CAP-5, CAP-6, CAP-7, Constraints (Privacy)
- architecture — Dionysus/Cocktail_Website_Agent/agent/ARCHITECTURE-SPINE.md, Amendment A (2026-10-15), AD-2, AD-5, AD-6, AD-9, AD-12, Consistency Conventions (Rate limit, Logging, Config, Degradation)
- decisions — Dionysus/Cocktail_Website_Agent/agent/spec/.memlog.md, entries of 2026-10-15

## Notes

- Decision (Robin, 2026-10-15): the trace goes to the Bartender, with strong boundaries against insults and prompt injection.
- Decision (Robin, 2026-10-15): add, don't rewrite, only in "This is you" and "Before you go".
- Decision (Robin, 2026-10-15): the cleaned name goes in the movement lines, and is dropped when it fails.
- Decision (Robin, 2026-10-15): the LLM pick is dropped. Sharing and persistence move to epic 3.
- Decision (2026-10-15): lanes.
  - Entries 1, 2, 3, 4 and 6 have no prerequisites and can run at the same time, in separate worktrees.
  - One writer per file:
    - 2.1 owns `shared/name.ts` and TheReading's movement lines.
    - 2.3 owns `shared/reading.ts` (`LiveCopy`, `acceptAddition`, `assembleReading`) and `shared/trace.ts`.
    - 2.4 owns `RevealRequest` in `shared/answers.ts`, plus `api/`, `server/` and `vercel.json`.
    - 2.2 writes only `agent/bartender/`.
  - 2.3's length limits start as parameters, and 2.2's measured lengths set them.
  - Entry 5 joins them and updates epic 1's e2e privacy test, which today asserts no trace on the wire.
  - Entries 7 and 8 close the epic.
- Assumption: with no trace, the Bartender still adds both passages from the answers alone. Robin may prefer no call at all in that case (faster and cheaper). To confirm at entry 2.
- Assumption: the "This is you" passage goes after the authored paragraphs, and the "Before you go" line after the proposal paragraph. Entry 2 tests both placements.
- Unknown: which model meets quality and the 9 s cap. Entry 2 measures it. A paid model needs a credit limit (Robin).
- Needs Robin, can start now:
  - an OpenRouter account and key with a credit limit and training off (blocks entry 2's live runs);
  - Upstash Redis through the Vercel Marketplace (blocks entry 4's rate limit, not its shell);
  - the two copy lines (entry 6);
  - any real H7 traces from earlier playtests, for the fixtures.
- Handoff from 2.3 (merged 6b45d41, 2026-10-16):
  - **2.2**:
    - `screenTrace(raw)` in `shared/trace.ts` returns `{trace, withheld, care}`. The prompt must read `care`. Robin's decision: when the guest is hard on themselves ("I felt like an idiot", "je suis conne") or uses self-harm wording, the trace passes with `care: true`, and the Bartender must answer with empathy.
    - The additions are checked by `acceptAddition`. Its length limits (`ADDITION_LIMITS`: who 40–280, proposal 20–200, quote run 6) are placeholders until the spike measures real lengths.
  - **2.4**: import `TRACE_MAX` and `cleanTrace` from `shared/trace.ts`; don't add a second copy to `shared/answers.ts`. The 2.3 version also strips zero-width and BOM characters, lone surrogates and private-use code points. Replace `interimGuard` with `acceptAddition(kind, text, additionContext(pairing, trace))`, so the server-side check also enforces the trace-quote rule.
  - **2.5**: keep the raw additions (with the `{name}` slot) plus the address on the device, not the text as shown. `assembleReading(pairing, copy, name, seed, address, trace?)` re-fills the name. Feeding shown text back in can drop a name that is also a swear (such as "Dick").
  - **Open for Robin (before 2.7)**: a trace that mentions suicide or self-harm gets a gentle tone, but the guest is still served a cocktail. Decide whether that path should also offer a quiet support line, or skip the addition and the drink framing.
