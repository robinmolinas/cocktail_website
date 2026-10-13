---
title: '1.10 Refactor sweep'
type: 'refactor'
created: '2026-10-13'
status: 'done'
baseline_commit: 'df5aa33005f57efab04cbf7903a90a175d99eeb8'
route: 'oneshot'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-matching-and-authored-reveal / 10'
worktree: '{project-root}/Dionysus-sweep (branch refactor-sweep, from experience-revamp-2026-09 df5aa33)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Epic 1's build records leave four cleanups that fit this sweep:
- The e2e suite paces itself with fixed sleeps. On 2026-10-13 it failed 5 of 7 once under load, straight after a build.
- `agent/matching/analyze.py --phi X` writes its experimental run over the canonical evidence: `distribution-v1.json`, `reachability-v1.json`, and `fixtures-v1.json`, which the selection tests read.
- `npm run lint` lints the gitignored `output/` scratch folder, so the "39 baseline" drifts with whatever review files sit there (46 today).
- AGENTS.md's repo map and the app README's commands are stale: TheSurfacing is listed but archived, `scripts/` and `shared/` are incomplete, and `e2e/`, `npm test` and `import:pours` are missing.

**Approach:**
- Make the e2e driver wait on observable journey state instead of fixed pauses wherever such state exists. Add an opt-in CPU-throttled run (`E2E_CPU_THROTTLE`) to prove the result under load.
- Route `--phi` runs to a separate experiments folder.
- Ignore `output/` in the lint config.
- Refresh the AGENTS.md map and the README commands.

No app source, copy or visual changes: the built `dist/` must stay byte-identical.

Out of scope (still deferred, with owners):
- the allergen gate's dossier lines (Pour Studio);
- H10 leave-action e2e coverage (Epic 2);
- the reveal fault-injection path;
- TheDepths' 39 pre-existing react-hooks lint errors. Fixing them means restructuring the journey component, which risks the experience for no visible gain.

Decision (Robin, 2026-10-13): "do what you recommend".

</frozen-after-approval>

## Implementation Notes

- **e2e: deviation from the Approach.** Measurement came first. `E2E_CPU_THROTTLE=4` (new, CDP `Emulation.setCPUThrottlingRate`) passed 7/7 in about 4.7 minutes, so the fixed pauses survive a page renderer four times slower. That does not cover a loaded machine or dev server. The failures that did occur were stalls (below), not presses that came too early, so I kept the pauses. Replacing about 60 tuned pauses with no failing evidence against them would add risk, not remove it.
- The failure was reproduced once in four attempts: a cold Vite cache with `npm run build` running alongside, desktop only. The H1 "The real me" button was gone 1.5 s after it appeared. There was no page error, Vite logged no re-optimise, and the build writes nothing the dev server watches (checked with `find -newer`). Rewriting `dist/index.html` does not reload the page (probed). H1 has no auto-advance, and focus doesn't move to the lens. Cause not found.
- A plain run during review failed 3 of 7, with Microsoft Defender at about 70% CPU. Every failure was a stall:
  - desktop: the name screen never appeared within 20 s of the cold open;
  - timed H4: a pair never presented within 12 s.

  TheDepths moves from hold to hold when the journey video reaches each one (`playUntil`, via `requestVideoFrameCallback`). So a stalled video stalls the journey without any error. This is the leading hypothesis, not proven. The next three plain runs passed 7/7.
- What changed instead:
  - `explained(session, body)` wraps every test body. On a failure it appends:
    - the page errors;
    - every main-frame load (a silent Vite reload shows as a repeated URL);
    - the journey video's state (time, paused, readyState, networkState, error);
    - the last dev-server log lines (a recording `customLogger`);
    - the URL and a screenshot path.

    It writes them into `stack` as well, because node prints the stack captured when the error was thrown. A probe confirmed the output.
  - `E2E_VITE_LOG=info` prints the server log live.
  - The README documents both switches.
- `agent/matching/`:
  - `analyze.py`: a `--phi X` run writes to `experiments/phi-X/`.
  - `.gitignore`: ignores `experiments/`.
  - `render.py`: takes an optional folder, resolved against its own folder, with a clear exit when there is no data there. Experiment reports open with an "Experiment, not the shipped model. φ = X" note.
  - New `test_evidence.py` case: after a `--phi 0.6` run the shipped files are byte-unchanged, and only the experiment carries the note. 8/8 pass.
- `eslint.config.js`: `globalIgnores(['dist', 'output'])`. `npm run lint` is now 39 in any checkout, all of them TheDepths react-hooks errors from before this epic. The main checkout had read 46 because of scratch review files.
- `AGENTS.md`:
  - components: TheSurfacing is out; ResonanceWorld and VelvetRope are in.
  - shared: `validate`, `data/catalogue` and `import/` are added.
  - scripts: the import and check scripts are added.
  - `e2e/` and `agent/` are added.
  - commands: `npm test`, `import:pours` and `npm run e2e` are added.
- README Run & Build: `npm test`, lint and `import:pours` are added.
- deferred-work.md:
  - Resolved: the 1.3 `--phi` entry, the 1.7 AGENTS.md map entry and the 1.8 AGENTS.md e2e entry.
  - The 1.8 flakiness entry is updated with the evidence above.
- No app source changed. The build passes: 946 tests, `tsc -b`, and the landing check on `index-CMakXtWH.js`. A shasum of all 46 non-media `dist/` files is identical to the df5aa33 build in `Dionysus-deps`.
- Final: `npm run e2e` passed 7/7 three times in a row on the final harness, and lint is 39.

## Review Triage Log

Blind hunter only (oneshot route).

| # | Finding | Verdict | Route |
|---|---|---|---|
| 1 | The `[vite] optimized/reload` console check can't fire: the client's full-reload handler reloads without logging | medium: confirmed (client.mjs full-reload has no console call) | Patched: main-frame load log plus the dev server's recorded log. The console regex is removed. |
| 2 | `explained` misses the gift-link tests and the assertions after the journey | medium | Patched: it wraps every test body. |
| 3 | The CPU-throttle pass doesn't show the pauses hold on a loaded machine or server | medium: wording overreached | Patched: the notes and the deferred entry now claim the renderer only, and the stalls are recorded. |
| 4 | Rendered `--phi` reports still read as the shipped model | medium | Patched: an experiment note, tested. |
| 5 | `experiments/` is not gitignored | low | Patched: `agent/matching/.gitignore`. |
| 6 | `render.py`'s folder resolves from the current directory and is unchecked | low | Patched: resolved from the script folder, with an exit message. |
| 7 | No plain e2e pass recorded; dist only checked by chunk name | medium | Patched: three plain 7/7 runs and a shasum diff of `dist/`. |
| 8 | The story plan is a bare stub without an assignee | false | `tickets.py mark` writes the plan; sibling plans got an assignee only when one was set. Status moves at the end of this step. |
| 9 | Two deferred entries are half-updated | low | Patched: struck summary plus a separate Resolved line, as the other entries do. |
| 10 | The AGENTS.md command list doesn't match the README (`import:pours:check`, e2e switches, check scripts) | low: rejected | AGENTS.md gives the main commands; the README is the full reference, and agents rarely need the switches. |
| 11 | Failure screenshots pile up in the temp folder; no server context | low: half rejected | Server context is patched (#1). Screenshots are written only on failure, in the OS temp folder. |


