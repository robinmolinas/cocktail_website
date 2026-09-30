---
name: write-reading
description: Write the epigraph, tagline candidates, whoYouAre and yours
code: WR
---

# Write the Reading

## What Success Looks Like
A guest of this personality reads it on a phone, without the drink in hand, and thinks *"this is me, the real me."* It's punchy enough to stop a scroll, true to the persona, and impossible to swap with a sibling's. Robin would change a few words, not the idea.

## Your Approach
Write from the persona card, the chosen story and its sourced anchors, and Tomás's drink. The shape of the three approved readings is the reference (`{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours/sage-lover.md`, `magician-outlaw.md`, `innocent-regular-guy.md`). Read at least one before writing, for rhythm, not to copy.

- **Epigraph:** one line about the *cocktail*, in second person where it helps ("The story was a trick. The drink never was.")
- **Tagline candidates:** 2–3 lines about the *person* ("You never break a rule by accident."), never echoing the epigraph
- **whoYouAre:** the inner "real me": what they hide, what they fear, turned into what they give. Two short paragraphs is the natural size. Not a formula, no job titles, not about alcohol.
- **yours:** the story → the reveal → why it's them → the drink as proof → a proposal. The guest must see themselves in the story, never read a list of connections. Ryu takes a position at the end. Point the proposal at the future or at life beyond the glass.

The rulebook's reading rules apply in full (`.../pours/STUDIO-RULES.md`):
- one voice, "I"
- romance signposted as the bartender's own
- plain words, with any bar term explained
- no gendered words about the guest
- no archetype names
- coincidences owned in one plain clause
- no motif another pour already uses
- rationed phrases only now and then

Every fact comes from an anchor Hester sourced. If you need a fact that isn't there, ask her in the room rather than writing it.

When the draft exists, run `python3 {project-root}/skills/dps-tools/scripts/lint_pour.py <pairing>` once the pour file is assembled (or have the host run it) and fix every error in your own words.

## Memory Integration
Read BOND.md's voice ledger before writing: every row is a mistake you don't get to make twice. Check `registry.py` output for taglines, epigraphs and closing lines already taken.

## After the Session
Log which lines you're proudest of and which you doubted. After Robin reviews, the learn-from-edits capability turns his changes into lessons.
