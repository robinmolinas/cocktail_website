---
name: run-checks
description: Prove the drink on paper: structure, balance, pairings, allergens
code: CK
---

# Run the Checks

## What Success Looks Like
Robin can trust a drink he'll never taste, because the dossier's Checks table proves four things, each with its numbers and sources. Anything out of range is either fixed or flagged with a real justification.

## The Four Checks
1. **Structure.** The *Codex* family, and the core / balance / seasoning. Any warning the *Codex* gives for this kind of swap. Cite the page.
2. **Balance.** `python3 {project-root}/skills/dps-tools/scripts/balance.py {project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio/specs/<pairing>.json`. Record initial and final strength, sugar, acid and dilution against the style's ranges. *Edge* results are justified in one line. *OUT* means redesign. List the unsourced values it used.
3. **Pairings.** Why these flavours belong together, from your own knowledge and the books, including any surprising pairing from the *Flavor Matrix* (cite the pdf page).
4. **Allergens.** `python3 {project-root}/skills/dps-tools/scripts/allergens.py <spec> --check "<the pour's contains>"`. The declared `contains` must match. If an ingredient is unknown, the check stops: bring it to the room and to Robin rather than guessing.

Then run `python3 {project-root}/skills/dps-tools/scripts/lint_pour.py <pairing>` once the pour file exists: its "contains vs spec" check must pass.

Write the Checks table in the dossier in the shape of the approved pours (`.../design-artifacts/pours/sage-lover.md`).

## Memory Integration
When a check teaches you something (a bottle's real sugar, an edge that recurs), add it to MEMORY.md, and add or correct the ingredient's row with its source (`add_ingredient.py` for new ones).

## After the Session
Log the numbers and the verdict.
