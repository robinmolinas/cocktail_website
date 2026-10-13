---
title: '1.8 Privacy and parity end-to-end checks'
type: 'chore'
created: '2026-10-13'
status: 'done'
baseline_commit: '8af401fd16b20fdf506e0f4ed9dc722d89f978a2'
route: 'oneshot'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 8'
worktree: '{project-root}/Dionysus-e2e (branch e2e-privacy-parity, from experience-revamp-2026-09 8af401f)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
  - '{project-root}/Dionysus/Cocktail_Website_Agent/agent/spec/intake-contract.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The journey's privacy and parity guarantees have been checked only by ad-hoc browser scripts kept outside the repo:
- the request carries Answers v3 only;
- trace and diagnostics stay in the browser;
- mouse and touch give the same answers.

Nothing re-checks them when the journey changes. Two deferred items wait on this:
- 1.5: no automated test drives App's reveal wiring;
- 1.6: the H4/H3 diagnostics logic has no committed test.

**Approach:** Add a committed end-to-end suite, run with `npm run e2e`. It drives the real journey in Chromium against a dev server it starts and stops itself:
- desktop at 1440 with a mouse (H3 drag, H5 carry);
- phone at 390 with touch (taps).

It reads the DEV-only `window.__dionysusIntake()` hook and asserts:
- every journey: the revealed pour is the shared core's shortlist head for that request. The request has exactly the v3 fields, and the trace, the name and the diagnostics appear in no network request.
- both journeys: the two requests are identical, and each has complete diagnostics.
- dev-jump runs: the H4 edge cases (expiry → timedOut, a paused re-present → interrupted with the paused tap ignored, Still Water → untimed and skipped) and keyboard `gravityMoved`.
- links: a broken gift link opens the landing, and a valid one opens that pour.

It uses the `playwright` library already in devDependencies, with Node's built-in test runner. Nothing is installed, so it is `npm run e2e` rather than the ticket's `npx playwright test` (Robin stopped a package install on 2026-10-13). It is not part of `npm run build`, which stays fast.

Decision (Robin, 2026-10-13): "continue with what you recommend".

</frozen-after-approval>

## Implementation Notes

- New `dionysus-experience/e2e/harness.mjs`:
  - a private Vite dev server via `createServer`, on port 5199 with fallback and a temp cacheDir, so it never disturbs a dev server on 5180;
  - the browser session, which records console errors and every request URL and body;
  - `walkJourney`, the full journey by mouse (H3 drag, H5 carry) or by touch (taps), promoted from the 1.6 ad-hoc parity script;
  - `expectedPour`, which imports `/shared/selection/index.ts` and `/shared/data/pours/static.ts` in the page, so the expected pour comes from the very modules the app runs.
- New `e2e/journey.e2e.mjs` (node:test, 7 tests in 3 suites):
  - desktop and phone journeys, then parity;
  - H4/H3 diagnostics, timed and Still Water;
  - broken and valid gift links.
- The privacy assertions:
  - the hook's request has exactly the v3 field set, minus the name the hook removes;
  - the request JSON holds no trace, diagnostics or insight field;
  - no request the page made carries the trace (raw or URL-encoded), the name or diagnostics keys.
- `package.json`: `npm run e2e` (`node --test --test-concurrency=1 …`), not part of `build`. README: Run & Build lists it.
- deferred-work.md: the 1.6 diagnostics entry is resolved. The 1.5 App-wiring entry is resolved except for one path: a reveal that throws or times out going home has no fault-injection hook yet.
- Runs: two consecutive runs gave 7/7 pass, about 4.5 minutes each. vitest has 946 passing, `tsc -b` is clean and lint is at 39, all unchanged.

- Review fixes:
  - The network check is now an allowlist: same-origin GETs, plus GETs to the analytics script and Google Fonts origins, with no bodies. The substring check (trace, name, diagnostics words) is a second line.
  - The request is checked for the name in any field.
  - The revealed pairing is pinned (`regular-guy-caregiver` for CHOICES under model-v1), besides matching the shared core's head.
  - Parity also compares the per-pair statuses, `h4Mode`, `example` and `gravityMoved`.
  - Broken links now cover an undecompressable `g` and a well-formed `p` naming no pour. Each must land on the landing with the hash cleared and no errors.
  - The reveal chunks are warmed up after the server starts, and the cache dir is per checkout.
  - After the title, the journey waits for the network to go idle, so the reading's own loads are inspected.
  - The README lists the prerequisites.
- Not linted: `eslint.config.js` covers only `**/*.{ts,tsx}`, so the `e2e/*.mjs` files sit outside lint. The 39 count is unaffected by construction.
- E1-R6 (same shortlist as the reference for every coverage fixture) stays covered by vitest `shared/selection/coverage.test.ts` and `selection:reference:check` (1.3). This suite adds the browser-side parity.
- Final run after the fixes: 7/7 (the third consecutive pass).

## Review Triage Log

Blind hunter only (oneshot route).

| # | Finding | Verdict | Evidence / route |
|---|---|---|---|
| 1 | The network leak check has almost nothing to inspect, and its substring list is narrow | medium | Confirmed: the reveal is local, so traffic is module GETs, fonts and analytics. Patched with an allowlist plus a wider substring list. |
| 2 | Requests stop being checked at the title, and H10 leave-actions are never exercised | medium | The first part is confirmed and patched (wait for network idle). Driving the H10 actions needs share, clipboard and PDF stubs: deferred. |
| 3 | The request is never checked for the name | medium | Confirmed (the hook deletes `name`). Patched. |
| 4 | The revealed pairing is never asserted, and the expectation uses the code under test | medium | Confirmed. Patched: pinned `regular-guy-caregiver`. Selection correctness itself is covered by the 1.3 reference tests. |
| 5 | The 1.6 deferred item is closed although the 250 ms offset is untested | low | Confirmed. Wording corrected in deferred-work.md. |
| 6 | The 1.5 deferred item omits the record reset | low | Confirmed. Wording corrected. |
| 7 | Gift-link coverage is thin: no unknown pairing, no `p` kind, no errors or hash check | low | Confirmed. Patched: a `p` link naming no pour, with errors and hash-cleared checks. The keep-mark and hashchange paths are rejected (rare in use; each needs its own fixture). |
| 8 | The README omits prerequisites (Chromium, network, port) | low | Confirmed. Patched. AGENTS.md listing deferred (agent context). |
| 9 | The new suite is not linted, so "lint unchanged" proves nothing | low | True. Recorded in the notes rather than adding an `.mjs` lint block (an `.mjs` block would add new config surface). |
| 10 | A cold start could hit the 10 s reveal ceiling, and the cacheDir is shared across worktrees | maybe-false → patched | Not observed (the cold first run passed). The warm-up and per-checkout cacheDir are direct and cheap. |
| 11 | Fixed sleeps and a narrow pause window may be flaky under load | maybe-false (medium if true) | 3/3 local passes. Deferred with what would settle it. |
| 12 | The ticket's verify text and E1-R6 coverage don't match the work; parity skips diagnostics | low | The parity part is patched. E1-R6 is noted as covered by 1.3. The ticket's `verify` text belongs to the entry and is superseded by this spec's frozen intent. |

## Verification

- `npm run e2e`: every test passes, run twice in a row to check it is stable.
- `npx vitest run`, `npx tsc -b` and `npm run lint` (39 baseline) are unchanged. The suite lives outside vitest's include.
