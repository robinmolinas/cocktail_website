# Distribution and sensitivity — matching model v1 (2026-10-08)

These figures describe the **model under stated answer assumptions, not the real audience**. Compare them with playtests later. Equal outcome frequencies are not the goal. The aim is that no persona is starved of evidence and no question group dominates.

**Answer models** (seeded simulation, 6,000 samples each; 132 authored, 105 veto-free):
- **U uniform:** every option is equally likely; 1–3 words per H5 round; each H4 pair is a, b or missed (45/45/10%); H3 uniform 0–100; 0–3 flavours.
- **H hesitant:** H3 clusters near the middle (normal, mean 50, sd 18); 1–2 words per round; 30% of H4 pairs missed; 0–2 flavours.
- **C coherent:** a hidden pairing answers in character, with options drawn in proportion to exp(2 × affinity to primary + 0.7 × affinity to secondary). This is **circular**: it uses the model's own affinities, so it measures whether a persona that answers as the weights assume comes back. It does not measure whether people really answer that way.

| metric | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| distinct top-1 outcomes (of 132) | 127 | 123 | 126 |
| largest single-outcome share (uniform = 0.0076) | 0.0255 | 0.0248 | 0.0393 |
| share of the 10 most common outcomes | 0.193 | 0.214 | 0.272 |
| exact top-1/top-2 ties | 0.0 | 0.0 | 0.0 |
| near ties (margin < 0.05) | 0.085 | 0.07 | 0.071 |
| median top-1 margin | 0.3775 | 0.4578 | 0.4714 |
| one changed answer changes the top-1 | 0.519 | 0.529 | 0.452 |
| one changed answer changes the primary | 0.309 | 0.288 | 0.305 |
| after one change, new top-1 was in the old shortlist | 0.664 | 0.613 | 0.737 |

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
| Magician | 0.121 | 0.127 | 0.13 |
| Outlaw | 0.078 | 0.086 | 0.072 |
| Regular Guy | 0.126 | 0.119 | 0.131 |
| Ruler | 0.025 | 0.009 | 0.053 |
| Sage | 0.023 | 0.01 | 0.041 |

**Recovery under C:** exact pairing 0.149, in the shortlist 0.321, reversed pair served instead 0.147. Chance would be 0.0076, 0.023 and 0.0076.

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
| drawnToward | 0.839 | 0.876 | 0.675 |
| soughtFor | 0.747 | 0.797 | 0.602 |
| gravity | 0.408 | 0.22 | 0.399 |
| texture | 0.428 | 0.293 | 0.374 |
| flavors | 0.047 | 0.021 | 0.037 |

**Flavour weight φ** (current 0.15), under U: share of top-1 results that change against the current φ: {'0.0': 0.043, '0.3': 0.05, '0.6': 0.135}.

**Vetoes**, under U: share of top-1 results that change when the veto is set: {'egg-white': 0.04, 'dairy': 0.026, 'gluten': 0.025, 'nuts': 0.12, 'spice': 0.026, 'all': 0.202}. Current contains counts: {'egg-white': 5, 'dairy': 4, 'gluten': 4, 'nuts': 14, 'spice': 4}.

**Empty intake** (no answers at all): every score is 0, so the result is decided by the pairingKey tie-break: ['caregiver-creator', 'caregiver-explorer', 'caregiver-hero']. The journey cannot normally produce this, because H3 always commits a value.

**Never observed in any of these answer models** (compare reachability-v1.md): ruler-explorer, ruler-magician, sage-explorer, sage-magician.

## Reading

1. **Observed ties are model results.** Uniform exact-tie rate: 0.0; near-tie rate: 0.085. The deterministic key rule still handles ties and an empty intake.
2. **Evidence remains uneven.** Caregiver, Creator, Ruler and Sage have fewer direct motive words in the current nine-word round. The tables quantify this model's skew; the proposed Q12 edit remains a separate, pending change described in matching-model.md.
3. **Reversed pairs remain difficult.** Under C, exact recovery is 0.149, reversed recovery 0.147, and shortlist recovery 0.321. These are circular simulation results, not guest validation.
4. **Single-answer sensitivity.** Under U, one edit changes the pairing 0.519 of the time and the primary 0.309; the new pairing was in the old shortlist 0.664 of the time.
5. **Group balance.** The ablation table reports each group's effect. Missing groups stay neutral; the remaining roles are never renormalized. Shipped scales remain fixed during regeneration.
