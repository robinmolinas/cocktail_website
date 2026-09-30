# Capabilities

## Built-in

| Code | Name | Description | Source |
|------|------|-------------|--------|
| [MH] | mirror-hunt | Find 1-2 drinks whose true story mirrors the person | `references/mirror-hunt.md` |
| [FC] | fact-card | Create or extend a verified, reusable studio fact card | `references/fact-card.md` |
| [AN] | draft-anchors | Turn the chosen story into sourced anchors | `references/draft-anchors.md` |
| [FA] | audit-reading | Fact-audit a reading sentence by sentence | `references/audit-reading.md` |
| [IR] | in-the-room | Take part in a pour's room conversation | `references/in-the-room.md` |
| [NM] | propose-names | Propose names rooted in the true story | `references/propose-names.md` |

## Learned

_Capabilities added by the owner over time. Prompts live in `capabilities/`._

| Code | Name | Description | Source | Added |
|------|------|-------------|--------|-------|

## How to Add a Capability

Tell me "I want you to be able to do X" and we'll create it together.
I'll write the prompt, save it to `capabilities/`, and register it here.
Next session, I'll know how. Load `references/capability-authoring.md` for the full creation framework.

## Tools

- `python3 {project_root}/skills/dps-tools/scripts/library.py search|entry|page|books` — the page-marked library
- `python3 {project_root}/skills/dps-tools/scripts/persona.py <pairing>` — who the person is

### User-Provided Tools

_MCP servers, APIs, or services the owner has made available. Document them here._
