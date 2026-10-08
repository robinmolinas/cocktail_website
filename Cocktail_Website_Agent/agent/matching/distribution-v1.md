# Distribution and sensitivity — matching model v1 (2026-10-08)

These figures describe the **model under stated answer assumptions, not the real audience**. Compare them with playtests later. Equal outcome frequencies are not the goal. The aim is that no persona is starved of evidence and no question group dominates.

**Answer models** (seeded simulation, 6,000 samples each; 132 authored, 105 veto-free):
- **U uniform:** every option is equally likely; 1–3 words per H5 round; each H4 pair is a, b or missed (45/45/10%); H3 uniform 0–100; 0–3 flavours.
- **H hesitant:** H3 clusters near the middle (normal, mean 50, sd 18); 1–2 words per round; 30% of H4 pairs missed; 0–2 flavours.
- **C coherent:** a hidden pairing answers in character, with options drawn in proportion to exp(2 × affinity to primary + 0.7 × affinity to secondary). This is **circular**: it uses the model's own affinities, so it measures whether a persona that answers as the weights assume comes back. It does not measure whether people really answer that way.

| metric | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| distinct top-1 outcomes (of 132) | 132 | 132 | 132 |
| largest single-outcome share (uniform = 0.0076) | 0.0227 | 0.0187 | 0.0337 |
| share of the 10 most common outcomes | 0.161 | 0.148 | 0.252 |
| exact top-1/top-2 ties | 0.0 | 0.0 | 0.0 |
| near ties (margin < 0.05) | 0.076 | 0.062 | 0.062 |
| median top-1 margin | 0.4052 | 0.516 | 0.5385 |
| one changed answer changes the top-1 | 0.51 | 0.529 | 0.44 |
| one changed answer changes the primary | 0.299 | 0.279 | 0.272 |
| after one change, new top-1 was in the old shortlist | 0.682 | 0.623 | 0.758 |

**Primary share by archetype** (expected if even: 0.083)

| archetype | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| Caregiver | 0.08 | 0.082 | 0.073 |
| Creator | 0.092 | 0.087 | 0.074 |
| Explorer | 0.095 | 0.089 | 0.102 |
| Hero | 0.073 | 0.08 | 0.066 |
| Innocent | 0.079 | 0.08 | 0.082 |
| Jester | 0.076 | 0.085 | 0.078 |
| Lover | 0.077 | 0.079 | 0.083 |
| Magician | 0.102 | 0.092 | 0.115 |
| Outlaw | 0.054 | 0.06 | 0.051 |
| Regular Guy | 0.096 | 0.096 | 0.101 |
| Ruler | 0.09 | 0.085 | 0.099 |
| Sage | 0.087 | 0.086 | 0.076 |

**Recovery under C:** exact pairing 0.146, in the shortlist 0.328, reversed pair served instead 0.148. Chance would be 0.0076, 0.023 and 0.0076.

| latent primary | primary recovered |
| --- | --- |
| Caregiver | 0.29 |
| Creator | 0.37 |
| Explorer | 0.51 |
| Hero | 0.28 |
| Innocent | 0.34 |
| Jester | 0.32 |
| Lover | 0.38 |
| Magician | 0.53 |
| Outlaw | 0.21 |
| Regular Guy | 0.42 |
| Ruler | 0.47 |
| Sage | 0.41 |

**Group influence:** how often removing one group changes the top-1.

| group | U uniform | H hesitant | C coherent (circular) |
| --- | --- | --- | --- |
| drawnToward | 0.849 | 0.891 | 0.695 |
| soughtFor | 0.745 | 0.787 | 0.586 |
| gravity | 0.405 | 0.215 | 0.377 |
| texture | 0.408 | 0.276 | 0.351 |
| flavors | 0.04 | 0.017 | 0.039 |

**Flavour weight φ** (current 0.15), under U: share of top-1 results that change against the current φ: {'0.0': 0.04, '0.3': 0.047, '0.6': 0.131}.

**Vetoes**, under U: share of top-1 results that change when the veto is set: {'egg-white': 0.037, 'dairy': 0.036, 'gluten': 0.042, 'nuts': 0.087, 'spice': 0.028, 'all': 0.197}. Current contains counts: {'egg-white': 5, 'dairy': 4, 'gluten': 4, 'nuts': 14, 'spice': 4}.

**Empty intake** (no answers at all): every score is 0, so the result is decided by the pairingKey tie-break: ['caregiver-creator', 'caregiver-explorer', 'caregiver-hero']. The journey cannot normally produce this, because H3 always commits a value.

**Never observed in any of these answer models** (compare reachability-v1.md): none.

## Reading

1. **Observed ties are model results.** Uniform exact-tie rate: 0.0; near-tie rate: 0.076. The deterministic key rule still handles ties and an empty intake.
2. **Evidence is more even since Q12.** The twelve-word round gives every archetype a direct motive word; Outlaw, which lost Mischief, is now the thinnest primary. The tables quantify this model's skew; matching-model.md records the edit.
3. **Reversed pairs remain difficult.** Under C, exact recovery is 0.146, reversed recovery 0.148, and shortlist recovery 0.328. These are circular simulation results, not guest validation.
4. **Single-answer sensitivity.** Under U, one edit changes the pairing 0.51 of the time and the primary 0.299; the new pairing was in the old shortlist 0.682 of the time.
5. **Group balance.** The ablation table reports each group's effect. Missing groups stay neutral; the remaining roles are never renormalized. Shipped scales remain fixed during regeneration.
