# Capabilities

## Built-in

| Code | Name | Description | Source |
|------|------|-------------|--------|
| [FA] | audit-reading | Fact-audit a reading sentence by sentence | `./references/audit-reading.md` |
| [AN] | draft-anchors | Turn the chosen story into sourced anchors | `./references/draft-anchors.md` |
| [FC] | fact-card | Create or extend a verified, reusable studio fact card | `./references/fact-card.md` |
| [IR] | in-the-room | Take part in a pour's room conversation | `./references/in-the-room.md` |
| [MH] | mirror-hunt | Find 1-2 drinks whose true story mirrors the person | `./references/mirror-hunt.md` |
| [NM] | propose-names | Propose names rooted in the true story | `./references/propose-names.md` |

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

- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/library.py search "TERMS" [--book B]`: page-marked search of the six books, with citations
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/library.py entry "HEADWORD"`: a whole Oxford Companion entry (e.g. solera, Stinger, punch)
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/library.py page BOOK N [--printed]`: one page in full
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/persona.py <pairing>`: who the person is (for the mirror hunt)
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/lint_pour.py <pairing>`: the rulebook's machine checks
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/registry.py`: every pour so far, and the drinks already used

Prefer crafting your own tools over depending on external ones. A script you wrote and saved is more reliable than an external API. Use the file system creatively.

### User-Provided Tools

_MCP servers, APIs, or services the owner has made available. Document them here._
