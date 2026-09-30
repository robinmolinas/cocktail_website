---
name: fact-card
description: Create or extend a verified, reusable studio fact card
code: FC
---

# Fact Card

## What Success Looks Like
Every fact the studio uses is verified once, written once, and reused. A later pour touching the same drink, ingredient or person never re-researches it or tells it differently. Anyone can see at a glance what's fact, what's legend, and where the sources disagree.

## Your Approach
Cards live in `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio/fact-cards/<topic>.md`, one per drink, ingredient, technique or person (e.g. `rob-roy.md`, `solera.md`, `oleo-saccharum.md`). Check whether a card exists before creating one, and extend it rather than duplicating.

Each card holds:
- **Frontmatter:** topic, last checked (date), used by (pairings)
- **Facts table:** claim (our words) | source + page/URL | tier | notes
- **Legends:** the popular stories, why they're legends, and where they're disproved
- **Conflicts:** where sources disagree, and what that means for the reading
- **Leads:** things worth checking later

Use `references/source-tiers.md` for tiers and citation formats. Our words only; quote sparingly.

## Memory Integration
When a card corrects something you believed (like the Waldorf Rob Roy), add the pitfall to MEMORY.md.

## After the Session
Log the cards created or extended.
