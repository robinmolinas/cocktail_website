# Intake contract: Answers v3 and browser-only diagnostics

Status: **agreed 2026-10-06** between the matching owner and the experience design owner. It refreshes the AD-1 field list. Vocabularies are declared once in `shared/answers.ts`; `TheDepths` imports them. Labels are display copy and may change without a version bump. Ids are permanent.

## Wire: `Answers` → `RevealRequest`

This is the only intake that is scored. The browser and the server see the same values. It is a strict zod object at every level (AD-2). Unknown keys get a 400.

| field | type | hold | notes |
| --- | --- | --- | --- |
| `v` | `3` | — | Questionnaire version. |
| `name` | string, trimmed, 1–40, no control chars | H0 | Only free text on the wire. Never in the LLM prompt. |
| `lens` | `LensId \| null` | H1 | Values: `real`, `becoming`, `night`, `inner-child`, `past`, `another-side` ("Another side of me", which replaced "Someone else"). Context only, never scored. |
| `seed` | `SeedKey \| null` | H2 | Values: `campari-red`, `aperol-orange`, `galliano-gold`, `midori-green`, `curacao-blue`, `violette-purple`, `pamplemousse-rose`, `cassis-plum`. Hex and name are looked up in the core. |
| `gravity` | `Partial<Record<GravityKey, int 0..100>>` | H3 | Keys: `solitary-social`, `controlled-wild`, `classic-experimental`, `analytical-instinctive`, `grounded-dreamlike`. Absent means not reached. |
| `texture` | `Partial<Record<BinaryKey, 'a' \| 'b'>>` | H4 | Keys: `sharp-smooth`, `relaxed-excited`, `halffull-halfempty`, `control`, `quiet-loud`, `risk`, `bright-dark`, `soft-rough`, `harmonic`. Absent means no choice, whatever the reason. |
| `drawnToward` | `DrawnId[]` ≤3 | H5 round 2 (asked second since 2026-10-06) | Ids: `freedom`, `beauty`, `mastery`, `peace`, `belonging`, `pleasure`, `wonder`, `change`, `mischief`. Stored in vocabulary order, because the UI asks for no ranking. |
| `soughtFor` | `SoughtId[]` ≤3 | H5 round 1 (asked first since 2026-10-06) | Ids: `advice`, `comfort`, `honesty`, `courage`, `ideas`, `calm`, `taste`, `reality-check`, `little-chaos`. Same ordering rule. |
| `flavors` | `FlavourId[]` ≤3 | H6 | Ids: `sweet`, `bitter`, `spicy`, `herbal`, `fruity`, `citrusy`, `fresh`, `floral`, `smoky`. |
| `vetoes` | `Veto[]` | H6 | Values: `egg-white`, `dairy`, `gluten`, `nuts`, `spice`. Closed enum (AD-4). No Alcohol. |

Removed relative to the 2026-09-23 v2:

- `vessel`: the H6 glass beat was cut on 2026-09-29, because each pour's glass is fixed.
- The `color`/`colorName`/`colorTouched` triple, replaced by `seed`.
- `allergies`, replaced by `vetoes`.
- `insight`, renamed `trace`.
- Every retired paper-quiz field.

`trace` (H7) is part of the browser-side intake record only. It is never on the wire (AD-2).

## Browser-only: `IntakeDiagnostics`

These fields are never on the wire, never scored in v3, never logged server-side and never sent to the LLM. They may be exported only from a dev or playtest build, with an explicit tester action, and the export never includes name or trace.

| field | meaning |
| --- | --- |
| `h4Mode: 'timed' \| 'untimed'` | `untimed` = Still Water (reduced motion): no deadline, plus an explicit "let them cool". |
| `texture[key].status` | One of `chosen`, `timedOut`, `skipped` (explicit let-them-cool), `notPresented`. |
| `texture[key].ms` | For `chosen`: milliseconds from the **readable moment** to the catch. The readable moment is when both words are fully condensed (opacity reaches 1, ≈420 ms after the pair mounts), never while the instruction or the example glasses are showing. |
| `texture[key].interrupted` | The tab was hidden during the window. The UI pauses the pair and re-presents the **same** pair on return, with no count-in. The final status comes from the re-presentation, so a hidden tab never yields `timedOut`. |
| `example` | `'chosen' \| 'notTouched'`. The H4 example glasses ("Word 1" / "Word 2", no clock) are shown while the instruction is read. Touching one starts the game; otherwise it starts by itself after about 6.4 s. Never scored. This replaced the timed Tea/Coffee practice and the Ready/Set/Go (Robin, 2026-10-06). |
| `gravityMoved[key]` | Whether the mote moved before commit. It separates an active midpoint from an untouched 50. |

Timing becomes a scored input only after playtests compare models with and without it. That would require a new answer version with a coarse field on the wire, so both shells score the same thing (matching-model.md §Timing).

## Interaction invariants the scorer relies on

The design owner agreed these. Changing any of them needs matching sign-off and a coverage re-run.

- H3 stays a continuous 0–100 lean on every device. A tap-to-pole or stepped control would change the value distribution the scales were calibrated on.
- H5 stays two distinct, reversible rounds of at most 3 words each:
  - round 1 = *what others come to you for* (`soughtFor`);
  - round 2 = *what draws you* (`drawnToward`), where a word may also be carried into the circle, giving exactly the tap's answer.
  - Order is Robin's 2026-10-06 decision. It is not an input, but it is a playtest variable, because the first round may prime the second.
- Movement distance and tap order are decorative and never captured.
- Desktop and mobile write identical `Answers` for identical choices. The parity test compares the two.
