---
name: dps-setup
description: Sets up the Dionysus Pour Studio module in a project. Use when the user requests to 'install dps module', 'configure Dionysus Pour Studio', 'setup the pour studio' or 'check the studio'.
---

# Module Setup

## Overview

Installs and configures the Dionysus Pour Studio (`dps`): Wren, Hester and Tomás, the room that authors pours (`dps-author-pour`) and Robin's review desk (`dps-review-desk`). Module identity, config questions and the agent roster come from `./assets/module.yaml`. Help entries come from `./assets/module-help.csv`.

Setup does three things:
1. Registers the module's config and help entries.
2. Prepares the studio's working folder and its Python environment.
3. Checks the research library.

It's safe to re-run at any time. Nothing is ever moved or deleted: no pours, no rulebook, and no other module's files.

`{project-root}` is a **literal token** in config values. Never substitute it with an actual path.

## Conventions

- Bare paths (e.g. `./scripts/register.py`) resolve from the skill root.
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{tools}` = `{project-root}/skills/dps-tools/scripts` (the studio's shared toolkit).

## On Activation

1. Read `./assets/module.yaml` (code `dps`, the two config questions, the agent roster).
2. Detect the config layout:
   - **TOML layout** (`{project-root}/_bmad/config.toml` exists): installer-managed, so it's never edited. The module registers in `{project-root}/_bmad/custom/config.toml` and the help catalog `{project-root}/_bmad/_config/bmad-help.csv`, through `./scripts/register.py`.
   - **YAML layout** (`{project-root}/_bmad/config.yaml`, or no config yet): use `./scripts/merge-config.py` and `./scripts/merge-help-csv.py`. Both need pyyaml, so run them with `uv run`.
3. If a `dps` section already exists, say this is an update and use its values as defaults.

Arguments like `accept all defaults`, `--headless` or inline values ("the pours are in X") map onto the two questions, and prompting is skipped. Still show the summary at the end.

## Collect Configuration

Ask both questions from `./assets/module.yaml` together, with their defaults, so Robin can answer once ("defaults are fine"). If no core config exists yet (YAML layout only), also ask for `user_name`, the language, and `output_folder`.

## Register

- **TOML layout:** `python3 ./scripts/register.py --project-root {project-root} --pours <answer> --library <answer>`. It replaces its own marked `[modules.dps]` block in `custom/config.toml` and changes nothing else in the file. It replaces the module's rows in the help catalog.
  - A BMAD reinstall rebuilds that catalog, so tell Robin to re-run dps-setup after one. The config survives, because `custom/` is never touched by the installer.
  - If it reports a `[modules.dps]` table it didn't write, stop and show Robin.
- **YAML layout:** write the answers to a temp JSON file `{"core": {...}, "module": {...}}` (leave out `core` if it exists), then run:
  - `uv run ./scripts/merge-config.py --config-path "{project-root}/_bmad/config.yaml" --user-config-path "{project-root}/_bmad/config.user.yaml" --module-yaml ./assets/module.yaml --answers {temp-file}`
  - `uv run ./scripts/merge-help-csv.py --target "{project-root}/_bmad/module-help.csv" --source ./assets/module-help.csv --module-code dps`
  - Don't pass `--legacy-dir`: this setup never deletes installer files.

The studio's scripts read the configured folders themselves (`{tools}/_common.py`: environment, then this config, then the workspace defaults), so a non-default folder works everywhere once it's registered.

## Prepare the Studio

Resolve `{project-root}` to real paths for these steps only:

1. **Studio folder:** `python3 {tools}/studio_init.py`. It creates `_studio/` (rooms, specs, fact cards, work, index, rule candidates), seeds the specs of pours already authored, and writes the registry. It never touches pours or `STUDIO-RULES.md`.
2. **Review desk environment:** `python3 {project-root}/skills/dps-review-desk/scripts/review.py setup`. It creates `_studio/.venv` with openpyxl. Homebrew's Python blocks a system-wide pip, so this is the only way the workbook can be written.
3. **Library:** check that the library folder exists and that its files carry page markers (`=== pdf N`). If it's missing or empty, say so: Hester can't source facts without it. Offer to extract a new book into it:
   - text PDF → PDFKit text
   - scanned PDF → macOS Vision OCR
   - epub → HTML text

   Add each new book to `Dionysus/docs/SOURCES.md` with its trust tier.
4. **Toolkit check:** `python3 {project-root}/skills/dps-tools/tests/test_tools.py` must end with `0 failure(s)`. If not, report the failures and stop before anyone authors a pour.
5. **Skills available by name:** check that each dps skill is in `{project-root}/.claude/skills/`. If they're only in `{project-root}/skills/`, offer to link them there (a symlink per skill, so the source stays single). Ask first: it changes what the workspace loads.

## Confirm

Summarise:
- the config written (where, and which values), and whether it was a fresh install or an update
- the help entries added
- what the studio preparation created or found
- the library status
- the toolkit result

Then introduce the agents from the roster in `./assets/module.yaml`, and say each will hold a short First Breath the first time Robin talks to them. Finish with the `module_greeting`.
