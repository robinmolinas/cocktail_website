# Collection review, 2026-10-06

The cocktail-content track of the continuation plan (`../../../2026-10-06-parallel-work-plan.md`). **Status (2026-10-06, evening):** Robin answered the decision pack, and the changes are applied: see `applied-summary.md` and `applied/`. Approval stays with Robin: draft pours are authored, not settled.

| file | what it is | for |
| --- | --- | --- |
| `applied-summary.md` | what landed on each decision, the state now, and F1–F6 still open | **Robin, first** |
| `decision-pack.md` | D1–D14 as asked (answered 2026-10-06; D6 carries Hester's correction) | record |
| `calibration-batch.md` | Wren's 8-pour tagline calibration, parked for the later tagline pass Robin asked for | later |
| `revision-queue.md` | all 173 proposals, ranked (P1→P3, routine before Robin's calls), with verbatim excerpts and exact replacement text | the editor, after Robin's answers |
| `matrix-132.md` / `.csv` | one row per ordered pairing: drink, live balance and allergens, lint, neighbours, reversed pair, and separate T/H/V/P verdicts, tagline verdict, priority | reference |
| `reviews/<family>.md`, `reviews/_corpus.md` | the 12 family reviews and the cross-collection review (66 reversed pairs, voice variety rules V1–V6, repeated anchors, recipe neighbours) | evidence behind the queue |
| `handoff/index.md` | every permanent pairing key: settled or not, where its recipe/copy and image brief live, what's open | catalogue import and image production |
| `signals.md`, `corpus/`, `reversed/`, `lint/`, `matrix.json` | generated inputs | reviewers |
| `tools/` | `extract.py` → `signals.py` → `queue.py` → `build_matrix.py` (re-run after any change; `extract.py --fresh` re-runs balance and allergens) | the editor |
| `BRIEF-*.md` | the reviewers' briefs | reuse in the next pass |

## How changes land (one editor)

1. Robin answers the decision pack and marks the calibration batch.
2. The editor applies the routine P1s, then the agreed items, pour by pour, in the pour files. Recipe edits go through Tomás (spec + `allergens.py` must agree with `contains`); new facts go through Hester; voice edits are Wren's ground. Each pour gets `lint_pour.py` and a note at the top of its room record (`rooms/<pairing>.md`) saying what changed and on whose decision.
3. Lessons Robin's choices teach go to the agents' sanctums (`_bmad/memory/dps-agent-*/`) and, where he accepts a rule, to `STUDIO-RULES.md`.
4. Re-run `tools/`, `registry.py --write`, and re-export the review desk (check `review.py status` for unsynced edits first).

Use the live tools in the workspace's `skills/` (see D10).
