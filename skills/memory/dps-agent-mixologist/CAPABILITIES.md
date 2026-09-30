# Capabilities

## Built-in

| Code | Name | Description | Source |
|------|------|-------------|--------|
| [DD] | design-drink | Design a cocktail that carries the story, as a spec | `./references/design-drink.md` |
| [IB] | image-brief | Brief the persona image from the pour | `./references/image-brief.md` |
| [IR] | in-the-room | Take part in a pour's room conversation | `./references/in-the-room.md` |
| [NM] | propose-names | Propose names a bartender would say out loud | `./references/propose-names.md` |
| [CK] | run-checks | Prove the drink on paper: structure, balance, pairings, allergens | `./references/run-checks.md` |
| [RI] | write-ritual | Write the recipe notes, method and closing line in plain words | `./references/write-ritual.md` |

## Learned

_Capabilities added by the owner over time. Prompts live in `capabilities/`._

| Code | Name | Description | Source | Added |
|------|------|-------------|--------|-------|

## How to Add a Capability

Tell me "I want you to be able to do X" and we'll create it together.
I'll write the prompt, save it to `capabilities/`, and register it here.
Next session, I'll know how.
Load `./references/capability-authoring.md` for the full creation framework.

## Tools

The Dionysus Pour Studio's instruments (standard-library Python; run with `python3`):

- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/balance.py SPEC.json`: strength, sugar, acid and dilution vs Arnold's style ranges (in range / edge / OUT)
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/allergens.py SPEC.json [--check LIST]`: the `contains` list, conservatively; an ingredient not yet in the table stops it until added
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/add_ingredient.py KEY --name … --contains …`: add any new ingredient (safe-side allergens, your call): the table never limits the drink
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/library.py search "TERMS" --book codex|li|matrix`: the craft books, page-marked
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/persona.py <pairing>`: who the person is
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/lint_pour.py <pairing>`: the rulebook's machine checks
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/registry.py`: every pour so far: families, spirits, glassware

Prefer crafting your own tools over depending on external ones. A script you wrote and saved is more reliable than an external API. Use the file system creatively.

### User-Provided Tools

_MCP servers, APIs, or services the owner has made available. Document them here._
