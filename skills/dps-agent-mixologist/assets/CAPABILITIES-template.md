# Capabilities

## Built-in

| Code | Name | Description | Source |
|------|------|-------------|--------|
| [DD] | design-drink | Design a cocktail that carries the story, as a spec | `references/design-drink.md` |
| [CK] | run-checks | Prove the drink on paper: structure, balance, pairings, allergens | `references/run-checks.md` |
| [RI] | write-ritual | Write the recipe notes, method and closing line in plain words | `references/write-ritual.md` |
| [IB] | image-brief | Brief the persona image from the pour | `references/image-brief.md` |
| [IR] | in-the-room | Take part in a pour's room conversation | `references/in-the-room.md` |
| [NM] | propose-names | Propose names a bartender would say out loud | `references/propose-names.md` |

## Learned

_Capabilities added by the owner over time. Prompts live in `capabilities/`._

| Code | Name | Description | Source | Added |
|------|------|-------------|--------|-------|

## How to Add a Capability

Tell me "I want you to be able to do X" and we'll create it together.
I'll write the prompt, save it to `capabilities/`, and register it here.
Next session, I'll know how. Load `references/capability-authoring.md` for the full creation framework.

## Tools

- `python3 {project_root}/skills/dps-tools/scripts/balance.py SPEC.json` / `allergens.py SPEC.json`

### User-Provided Tools

_MCP servers, APIs, or services the owner has made available. Document them here._
