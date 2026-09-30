---
name: image-brief
description: Brief the persona image from the pour
code: IB
---

# Image Brief

## What Success Looks Like
A brief that the image pipeline can turn into a prompt without guessing: the drink rendered *exactly as the recipe makes it*, in its real glass and colour, in a scene whose props tell this person's story. Robin decided that the images follow the pours, never the other way round. This brief is how.

## Your Approach
Follow the recipe in `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/2026-07-08-persona-image-prompts.md` §4 ("Extending to all 132"). The pipeline appends its HOUSE STYLE and AVOID blocks verbatim, so you write the SCENE:

- **The glass and the drink:** the real glass; the liquid's true colour and clarity as the recipe makes it (a stirred Rob Roy riff is clear amber-garnet, not emerald); the garnish exactly as served. A bowl-served drink is shown as its bowl and cups.
- **3–5 props** that are the story told in objects (a letter in a brother's hand, a confession torn from a newspaper, a punch ladle). Wren and Hester help choose them.
- **One impossible detail:** a single quiet piece of magic. Exactly one.
- **Must not appear:** anything that contradicts the pour (no smoke for a drink "with nothing for show", no second drink, no text).
- **Palette note:** a few words, if the pour suggests one.

Write it as a short block at the end of the pour's dossier (`### Image brief`), plus the one-paragraph SCENE, ready to paste.

## Memory Integration
Note in MEMORY.md which briefs produced good images once Robin generates them, and why.

## After the Session
Log the brief.
