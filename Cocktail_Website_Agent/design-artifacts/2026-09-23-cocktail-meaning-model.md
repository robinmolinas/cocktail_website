# The Cocktail Meaning Model — what each pour carries, and what the guest reads

*Design, 2026-09-23 (brainstorm with Robin). Supersedes the one-line `symbolism`
field and the live `{epigraph, reading}` shape in `agent/ARCHITECTURE-SPINE.md`
(updated the same day, AD-5 / AD-6 / AD-11).*

## Intent

The guest must see themselves in the cocktail, the way Ryu (Bartender) serves a
drink whose story *is* the guest's moment. The most important part of the whole
reading is **what makes this cocktail yours**. The truth of each drink's meaning
is authored by Robin (with the Historian, Mixologist and Psychologist authoring
agents). The runtime AI never invents meaning; it only tunes Robin's words to
this guest.

## 1. What each pour carries (data, one entry per personality ×132)

| Field | Shown | What it is |
| --- | --- | --- |
| `name`, `tagline`, `glassware` | yes | as today |
| `recipe[] {amount, item, note?}` | yes | `note` = a short visible meaning on an anchor ingredient ("older than the question") |
| `method[]` + `closingLine` | yes | the closing line ends The Ritual ("Sip it slowly. It was made to be understood, not finished.") |
| `contains: Veto[]` | no | vetoes held, for selection (spine AD-4) |
| `anchors[]` (≥3) | via the reading | the raw truth of the drink. Each is `{kind, fact, meaning, speaksTo?}`. `kind` is **open-ended**: lineage/ancestor, riff, ingredient (history or nature), gesture, glass, and anything else we invent (place, season, temperature, number…). `fact` = the true story or thing. `meaning` = what it says about this personality. `speaksTo` = the answers it resonates with, as a hint |
| `epigraph` | yes | one line about the personality, in the second person |
| `whoYouAre` | yes | one short paragraph about the personality. Draft from the existing `story` in `archetypes.ts` (from the xlsx), then refine |
| `yours[]` | yes, tailored | **what makes this cocktail yours**, the longest block. Written from the persona's point of view and built from the anchors: the story, then the detail, then why it's you |

No `sources` field; the content is ours. There is no ancestor field of its own:
lineage is simply an anchor kind. The serving ritual as a separate element is gone;
the closing line replaces it.

## 2. What the guest reads (owner view)

1. Hero: cocktail name, tagline, glass, and the name inked on the tag
2. **The Pour** (recipe with notes) · **The Ritual** (method, ending on the closing line)
3. **The Reading:**
   - **Epigraph** (authored, static per personality)
   - **Who you are** (authored, static per personality)
   - **What makes this cocktail yours** (authored base, **tailored live**)

Only the third block is live. Two guests of the same personality share the
epigraph and "who you are", and each gets a "yours" tuned to them.

## 3. Live tailoring rule ("weave in, keep your voice")

- The Bartender receives the shortlist (up to 3 candidate pours: essence, tagline,
  anchors, authored `yours`) plus the trace-free, name-free answers. It picks one
  and returns that pour's `yours` passage, tailored.
- **Robin's passage stays the backbone:** same anchors, same images, same order,
  same paragraph count. The AI weaves in 2–3 of the guest's actual answers (seed
  colour, lens, drawn toward, sought for, a texture word, flavours, the glass they
  chose) and may adjust a few sentences so they land.
- **No new facts.** Any fact must come from that pour's anchors.
- Checked in code: same paragraph count; length within ±30% of the authored
  passage; at least half of the authored passage's content words retained.
  Any failure means the authored passage is served verbatim.
- **Fallback = the authored passage, verbatim.** The reading is complete and
  true without the AI.

## 4. Consequences

- **Architecture spine:** AD-5 / AD-6 / AD-11 updated. `LiveCopy` is now just the
  tailored `yours`. `templateCopy` is no longer generated from answers; the
  fallback is the authored text. The one-line `symbolism` field is replaced by
  `anchors`.
- **Front-end (build):** The Reading renders epigraph, who-you-are, and yours
  (section labels are a copy decision). The Ritual ends on the closing line.
- **Authoring load per personality:** the cocktail, ≥3 anchors, epigraph,
  who-you-are (refined from the existing story), and the yours passage. This is the
  work of the **authoring studio**, designed next: Historian / Mixologist /
  Psychologist agents, the KB canon + symbolism libraries, Wondrich-style
  history research (facts only, our own words).
- **Sources caution:** historical facts are free to use. *Imbibe!* is research,
  never copied text. Use Bartender manga scenes or dialogue only if the rights are
  genuinely cleared; otherwise use its abstracted patterns only (guest, hidden
  need, drink, gesture).

## Example (the Connoisseur, reshaped)

- **epigraph:** "You taste the world in footnotes."
- **whoYouAre:** "Where others drink, you annotate. A flavour is never just a flavour to you…"
- **yours** (authored base, before tailoring): "This pour is built the way you think:
  patient scotch that has read everything, a sherry note left deliberately
  unresolved, a garnet thread of bitterness so the sweetness has something to
  argue with…"
- **tailored:** the same passage, now carrying *her* Campari Red and her pull toward
  mastery at the moments where the anchors already speak to them.

## Amendments (Robin, 2026-09-24, from authoring the first three pours)

- **Epigraph is about the cocktail; the tagline is about the person.** They must not echo each other. (Supersedes "epigraph = one line about the personality" in §1.)
- **One voice:** the reading is spoken by one bartender, so "I", never "we" ("I like to think…", "Here's what I'd ask of you"). "We" appears only where it means people in general ("what we do know").
- **`serves` (optional):** a pour can be a shared drink (the True Friend's punch serves about 14). Absent means one drink. Needs adding to the pour type (spine AD-11) at the next spec refresh.
- **Vetoes are medical, not taste.** Classify ingredients conservatively for allergy: anything a guest with that allergy might react to, or reasonably fear, goes in `contains`. Nutmeg counts as `nuts`. `spice` = heat only. Distilled grain spirits aren't `gluten`. Wine fining agents (egg white, milk protein) are ignored unless a specific named bottle is labelled with them.
- Full working rules: `pours/` staging files and their dossiers.
