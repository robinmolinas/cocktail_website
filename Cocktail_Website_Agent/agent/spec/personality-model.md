# Personality model: 12 archetypes, 132 ordered pairings

Refreshed 2026-10-06. Canonical data: `../data/Brand Personality + Roulette.xlsx`. Read it only. Never re-save it with openpyxl, because it embeds images.

- **BRANDING** holds the 12 archetypes: Driver group, Primary goals, Primary fears, Personality, voice. The goals and fears are the source of every matching weight (matching-model.md).
- **PERSONALITY** holds the 132 named pairings, 12 primaries × 11 secondaries (rows 3–135). The app's mirror is `dionysus-experience/src/data/archetypes.ts`, which becomes `shared/data/archetypes.ts`: primary, secondary, goal, fear, name, essence, story. The story is source material for the authors and is never rendered.

| archetype | goals (BRANDING) | fears |
| --- | --- | --- |
| Caregiver | Service, compassion, patience, empathy | Selfishness, indifference, cruelty |
| Creator | Innovation, creativity, imagination | Status quo, mediocrity, conformity |
| Explorer | Freedom, independence, bravery | Entrapment, cowardice, subordination |
| Hero | Mastery, courage, strength, perseverance | Weakness, incompetence, timidity |
| Innocent | Safety, wonder, trust, honesty | Punishment, danger, moral dilemma |
| Jester | Pleasure, enjoyment, humour, originality | Boredom, conventionality, monotony |
| Lover | Intimacy, connection, sensuality, passion | Isolation, loneliness, coldness |
| Magician | Power, transformation, intuition, charisma | Unintended results, insignificance, inertia |
| Outlaw | Liberation, revolution, leadership, risk | Powerlessness, dependence, restrictions |
| Regular Guy | Belonging, altruism, respect, fairness | Exclusion, discourtesy, individuality |
| Ruler | Control, power, confidence, status | Chaos, vulnerability, failure |
| Sage | Wisdom, understanding, clarity | Deception, conflict, ambiguity |

## Pairings

- **Ordered pairings.** A × B and B × A are distinct outcomes with distinct cocktails. The pairing's goal and fear come from the **primary** (the core motive). The **secondary** is how it shows. Example: Caregiver × Creator = The Craftsman. Selection follows from this (matching-model.md §What primary and secondary mean).
- **Key.** `pairingKey(primary, secondary)` is the lowercase primary-secondary slug, with spaces as dashes: `regular-guy-sage`. Key values are permanent (AD-11).
- **Never shown.** Archetype names and pairing keys never appear to the guest. They see the personality name, for example "The Visionary".
- **"Roulette".** Formerly the LLM's free pick among personas. It is now bounded: the Bartender chooses among the deterministic top 3 (AD-3).
