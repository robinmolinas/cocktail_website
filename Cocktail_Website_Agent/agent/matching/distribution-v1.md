# Distribution and sensitivity — matching model v1 (2026-10-06)

These figures describe the **model under stated answer assumptions, not the real audience**. Compare them with playtests later. Equal outcome frequencies are not the goal. The aim is that no persona is starved of evidence and no question group dominates.

**Answer models** (seeded simulation, 6,000 samples each):
- **U uniform:** every option is equally likely; 1–3 words per H5 round; each H4 pair is a, b or missed (45/45/10%); H3 uniform 0–100; 0–3 flavours.
- **H hesitant:** H3 clusters near the middle (normal, mean 50, sd 18); 1–2 words per round; 30% of H4 pairs missed; 0–2 flavours.
- **C coherent:** a hidden pairing answers in character, with options drawn in proportion to exp(2 × affinity to primary + 0.7 × affinity to secondary). This is **circular**: it uses the model's own affinities, so it measures whether a persona that answers as the weights assume comes back. It does not measure whether people really answer that way.

| metric | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| distinct top-1 outcomes (of 132) | 127 | 123 | 126 |
| largest single-outcome share (uniform = 0.0076) | 0.0255 | 0.0248 | 0.0393 |
| share of the 10 most common outcomes | 0.194 | 0.214 | 0.272 |
| exact top-1/top-2 ties | 0.0 | 0.0 | 0.0 |
| near ties (margin < 0.05) | 0.084 | 0.069 | 0.07 |
| median top-1 margin | 0.3783 | 0.4579 | 0.4714 |
| one changed answer changes the top-1 | 0.519 | 0.529 | 0.452 |
| one changed answer changes the primary | 0.309 | 0.288 | 0.305 |
| after one change, new top-1 was in the old shortlist | 0.664 | 0.613 | 0.738 |

**Primary share by archetype** (expected if even: 0.083)

| archetype | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| Caregiver | 0.022 | 0.01 | 0.029 |
| Creator | 0.041 | 0.035 | 0.044 |
| Explorer | 0.117 | 0.114 | 0.107 |
| Hero | 0.106 | 0.111 | 0.086 |
| Innocent | 0.11 | 0.114 | 0.105 |
| Jester | 0.124 | 0.162 | 0.112 |
| Lover | 0.107 | 0.105 | 0.09 |
| Magician | 0.12 | 0.127 | 0.13 |
| Outlaw | 0.078 | 0.086 | 0.072 |
| Regular Guy | 0.126 | 0.119 | 0.131 |
| Ruler | 0.025 | 0.009 | 0.053 |
| Sage | 0.023 | 0.01 | 0.041 |

**Recovery under C:** exact pairing 0.149, in the shortlist 0.322, reversed pair served instead 0.148. Chance would be 0.0076, 0.023 and 0.0076.

| latent primary | primary recovered |
| --- | --- |
| Caregiver | 0.1 |
| Creator | 0.22 |
| Explorer | 0.52 |
| Hero | 0.36 |
| Innocent | 0.4 |
| Jester | 0.42 |
| Lover | 0.38 |
| Magician | 0.56 |
| Outlaw | 0.3 |
| Regular Guy | 0.52 |
| Ruler | 0.19 |
| Sage | 0.16 |

**Group influence:** how often removing one group changes the top-1.

| group | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| drawnToward | 0.839 | 0.876 | 0.674 |
| soughtFor | 0.746 | 0.796 | 0.601 |
| gravity | 0.408 | 0.22 | 0.4 |
| texture | 0.429 | 0.294 | 0.374 |
| flavors | 0.047 | 0.021 | 0.038 |

**Flavour weight φ** (current 0.15), under U: share of top-1 results that change against the current φ: {'0.0': 0.043, '0.3': 0.049, '0.6': 0.135}.

**Vetoes**, under U: share of top-1 results that change when the veto is set: {'egg-white': 0.04, 'dairy': 0.027, 'gluten': 0.025, 'nuts': 0.159, 'spice': 0.036, 'all': 0.245}. Twenty pours contain nuts, which is why the nuts veto moves results most.

**Empty intake** (no answers at all): every score is 0, so the result is decided by the pairingKey tie-break: ['caregiver-creator', 'caregiver-explorer', 'caregiver-hero']. The journey cannot normally produce this, because H3 always commits a value.

**Never observed in any sample, but proven reachable** (see reachability-v1.md): caregiver-explorer, caregiver-magician, creator-explorer, creator-regular-guy, ruler-explorer, ruler-innocent, ruler-magician, ruler-outlaw, sage-explorer, sage-magician, sage-outlaw.

## Reading

1. **No ties, no dead outcomes.** Exact ties do not occur with continuous H3 values, and near ties stay under 9%. Every pairing is reachable.
2. **The thin-evidence skew is real and traced.** Caregiver, Creator, Ruler and Sage come out as primary 2–5% of the time, against about 11% for the rest. Even a guest answering in character as one of them gets that primary back only 10–22% of the time. The cause is the drawnToward question (*What are you most drawn toward?*): it has no word whose core is their goal (Service, Innovation, Control, Wisdom). The 2026-09-18 trims removed Knowledge, Power and Recognition as overlaps. Adding weight to soughtFor instead (variant A) barely helps: Caregiver goes 0.08 → 0.12 and Ruler 0.19 → 0.16. The question edit (variant Q12, matching-model.md §Recommended question edit) evens primary shares to 0.05–0.10 and lifts their recovery to 0.30–0.47.
3. **Reversed pairs are the hard distinction.** Under C, the reversed pair is served about as often as the right one. This is built in: the primary and secondary of a coherent guest pull on the same answers, and only the split between drawnToward (motive) and everything else (expression) tells them apart. The shortlist softens it: about a third of the time the right pairing is in the Bartender's three. Playtests should check whether guests feel the difference.
4. **Sensitivity is high per pairing and moderate per primary.** Changing one answer changes the exact pairing about half the time, and the primary about 30% of the time. In about 74% of cases the new result was already in the old shortlist. 132 fine outcomes from about 25 answers are expected to sit close together. This is acceptable as long as the shortlist absorbs most single-answer changes.
5. **Group balance holds.** The two H5 questions lead, as designed. H3 and H4 each still change about 40% of results. Flavour changes about 4–5% (a nudge, as designed), and so do single vetoes, except nuts.
