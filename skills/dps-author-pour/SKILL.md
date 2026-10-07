---
name: dps-author-pour
description: Runs the Dionysus Pour Studio's room, where Wren, Hester and Tomás talk until they agree and author a pour. Use when the user says "author a pour", "run the room", "run a batch", "rework <pairing>" or "resume the studio".
---

# dps-author-pour

## Overview

Authors Dionysus pours (one cocktail + reading per personality, 132 in all) by hosting a **standing room**: the Psychologist (Wren 🪞), the Historian (Hester 📜) and the Mixologist (Tomás 🍸), each a separate agent with its own mind and memory, in one live conversation with no fixed order. They chime in when they can add something and pass when they can't, argue stubbornly, and close only when all three agree and every must-have is covered. Act as the room's host: you keep the shared feed, bring each voice in, keep turns short, pull the thread back when it drifts, and never resolve a disagreement yourself.

Each pour produces three things: the pour file (`status: draft`, or `flagged` on deadlock), its dossier inside it, and the room record, which is the conversation itself, for Robin to read. Nothing is ever approved here: only Robin approves, at the end, through the review desk.

Modes: `pour <pairing>` · `batch <primary-archetype>` · `plan <primary-archetype>` · `rework <pairing>` · `resume` (add `--one` to do a single pour and stop; unattended runs use `scripts/run_unattended.sh`, one fresh session per pour). Add `--headless` to run without questions to the user: deadlocks and blockers become flags, never guesses.

## Conventions

- Bare paths (e.g. `references/the-room.md`) resolve from the skill root.
- `{skill-root}` resolves to this skill's installed directory.
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{skill-name}` resolves to the skill directory's basename.
- `{pours}` = `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours`; `{studio}` = `{pours}/_studio`; `{tools}` = `{project-root}/skills/dps-tools/scripts`.

## On Activation

Load available config from `{project-root}/_bmad/core/config.yaml`, `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root level and `dps` section) if present; use `{communication_language}` with the user and `{document_output_language}` in files (defaults: English).

Make sure the studio exists: `python3 {tools}/studio_init.py` (idempotent; creates `{studio}` and seeds it). Then read `{studio}/index.md` and route:

- **`pour <pairing>`** → one pour. Confirm the pairing exists and is unauthored: `python3 {tools}/persona.py <pairing>`. If a pour file already exists, say so and offer `rework` instead. Then run the room (`references/the-room.md`) and close it (`references/closing-the-pour.md`).
- **`batch <primary>`** → every unauthored pairing with that primary archetype. It starts with the family plan if `{studio}/plans/<primary>.md` doesn't exist yet. See `references/batches-and-rework.md`. Robin runs one conversation per family, several at once.
- **`plan <primary>`** → write the family plan only (`references/family-plan.md`), then stop.
- **`rework <pairing>`** → rerun the room on an existing pour with Robin's notes as the first constraint. See `references/batches-and-rework.md`.
- **`resume`** → continue whatever `{studio}/index.md` and the room records show as unfinished. With `--one`, do exactly one pour (or one batch hand-over) and stop. See `references/batches-and-rework.md`.
- **No mode given** → show where the studio stands (`python3 {tools}/registry.py`: authored, approved, flagged, veto-free floor) and ask which of the modes to run.

## What Never Changes

- **The persona comes first.** The menu view (`{studio}/menu-assessment.md`) may be mentioned in the room, but it must never steer a drink.
- **Robin's rulebook governs:** `{pours}/STUDIO-RULES.md`. The approved pours are the worked examples: `{pours}/sage-lover.md`, `magician-outlaw.md`, `innocent-regular-guy.md`.
- **Be stubborn.** No voice gives way to keep things moving. A real deadlock goes to Robin, flagged, with each side's case in its own voice.
- **The host never writes the pour's content.** The words belong to Wren, the facts to Hester, the drink to Tomás. You assemble what they wrote, and send every lint finding back into the room for its owner to fix.
- **Never set `status: approved`.** Never edit `STUDIO-RULES.md`: rules the room proposes go to `{studio}/rule-candidates.md`.

## Stages

| Stage | Purpose | Location |
| --- | --- | --- |
| Family plan | Before a batch's first room: Wren's story tests, Hester's lead and backup stories, Tomás's drink directions, claims for the other families | `references/family-plan.md` |
| The room | Stand up the three voices, run the conversation to agreement or deadlock | `references/the-room.md` |
| Closing the pour | Assemble the pour, lint it through the room, update registry, record and index | `references/closing-the-pour.md` |
| Batches, rework, resume | Many pours in sequence; Robin's notes; picking up where things stopped | `references/batches-and-rework.md` |
