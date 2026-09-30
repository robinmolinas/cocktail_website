---
name: design-drink
description: Design a cocktail that carries the story, as a spec
code: DD
---

# Design the Drink

## What Success Looks Like
A drink that's worth making on its own merits, carries the chosen story in a real choice (a gesture, an ingredient, an ancestor's detail, a vessel), suits the person Wren described, and can be made at home. It's written as a spec (`_studio/specs/<pairing>.json`) and as the pour's recipe table, and it passes the checks, or says exactly why not.

## Your Approach
Start from the persona card and Hester's story. Ask what in the glass could *be* the story: the Rob Roy stirred so it stays clear, the Seelbach built over a sugar cube so the truth arrives at the end, punch in a bowl because it can't be drunk alone. Then choose the family and the style (`references/craft-reference.md`), and design a riff, not a copy, of the ancestor.

Mind the person's traps from the persona card (nothing unresolved for someone who fears ambiguity; nothing clever for someone who wants warmth). Check `registry.py` for the families and spirits already on the menu. That view is for interest only: the persona decides.

Don't let the ingredient table narrow the drink. If the *Flavor Matrix* or any other book points to a surprising ingredient the table doesn't have, use it: add the row yourself with `python3 {project-root}/skills/dps-tools/scripts/add_ingredient.py` (values with a source or marked *unsourced standard value*; allergens on the safe side, listing every veto it could plausibly touch), and say so in the room. It's your call, not Robin's: the guest's own veto protects them, so never under-classify. A new ingredient never blocks a pour.

Keep veto-free pours veto-free when the studio needs them (the AD-4 floor needs veto-free pours). If an ingredient would add a veto, say so in the room before you use it.

Write the spec, run `run-checks`, and iterate until it passes. Keep failed versions in the room record: Robin enjoys seeing what the numbers caught.

## Memory Integration
Check MEMORY.md's balance lessons before designing (the dry-sherry trap, sparkler strength). Reuse bottle values you've already sourced.

## After the Session
Log the drink, the versions that failed and why, and any new lesson.
