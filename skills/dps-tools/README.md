# dps-tools — the Dionysus Pour Studio's instruments

Standard-library Python 3 scripts shared by all studio skills (Wren, Hester, Tomás, the room, the review desk).
Run from anywhere. They locate the workspace via `_bmad/`. Override folders with `DPS_POURS_FOLDER` / `DPS_LIBRARY_FOLDER`.

| Script | Used by | Does |
| --- | --- | --- |
| `scripts/persona.py PAIRING` | Wren (everyone) | Full profile: archetypes.ts + both xlsx sheets + 10 siblings + pour status. `--list [--primary X] [--status]` |
| `scripts/library.py search/entry/page/books` | Hester (everyone) | Page-marked search of `Dionysus/docs/_text`, Oxford entries by headword, citations per `_text/README.md` |
| `scripts/balance.py SPEC.json` | Tomás | Strength, sugar, acid and dilution vs Arnold's style ranges (in range / edge / OUT). Flags unsourced values |
| `scripts/allergens.py SPEC.json [--check]` | Tomás | Derives `contains` conservatively (vetoes are medical). An ingredient not yet in the table stops the check until it's added |
| `scripts/add_ingredient.py KEY --name … --contains … [--added]` | Tomás | Adds any new ingredient (surprising pairings welcome), classified on the safe side. Tomás's call; the table follows the drink, never limits it |
| `scripts/lint_pour.py PAIRING\|--all` | the room | Every rule in STUDIO-RULES that a machine can check (voice, archetype names, live drinking, echo, duplicates, motifs, contains vs spec, structure) |
| `scripts/brief.py ROLE PAIRING` | the agents, on arrival | Everything an agent loads to join a room, in one output: skill, sanctum, room guide, rulebook, registry, persona, the room so far |
| `scripts/registry.py [--write]` | the room, Robin | `_studio/registry.md` + the non-binding `menu-assessment.md` |
| `tests/test_tools.py` | builders | Pins the three approved pours' numbers and lint results. Run after any change |

**Data:** `data/ingredients.json` (ABV / sugar / acid / allergens per ingredient, each with its source or marked
*unsourced standard value*), `data/styles.json` (Arnold's ranges, dilution formulas, edge rules).

**Spec format** (one per pour, `pours/_studio/specs/<pairing>.json`, owned by Tomás): see `balance.py --help` and
`tests/fixtures/*.json` for the three approved pours.

Not yet here: `review.py` (the editing workbook export/sync). It needs openpyxl in the studio venv and is built
with `dps-review-desk`.
