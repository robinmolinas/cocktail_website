# Capabilities

## Built-in

| Code | Name | Description | Source |
|------|------|-------------|--------|
| [IR] | in-the-room | Take part in a pour's room conversation | `./references/in-the-room.md` |
| [LE] | learn-from-edits | Turn Robin's edits into lessons | `./references/learn-from-edits.md` |
| [PR] | persona-read | Read one personality and write its persona card | `./references/persona-read.md` |
| [NM] | propose-names | Propose names and taglines that resonate with the person | `./references/propose-names.md` |
| [RT] | resonance-test | Test a reading as its guest and as a sceptic | `./references/resonance-test.md` |
| [WR] | write-reading | Write the epigraph, tagline candidates, whoYouAre and yours | `./references/write-reading.md` |

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

- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/persona.py <pairing>`: full profile + siblings (`--list --primary X --status`)
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/lint_pour.py <pairing>`: the rulebook's machine checks
- `python3 /Users/robin.molinas/Documents/GenAI Projects/skills/dps-tools/scripts/registry.py`: every pour so far: names, taglines, epigraphs, closing lines

Prefer crafting your own tools over depending on external ones. A script you wrote and saved is more reliable than an external API. Use the file system creatively.

### User-Provided Tools

_MCP servers, APIs, or services the owner has made available. Document them here._
