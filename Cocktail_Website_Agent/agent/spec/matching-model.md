# Matching model v1: signals, weights, pair formula, missing answers

Status: **implemented in story 1.3, 2026-10-08** (matching owner). This document is the contract for CAP-2 and CAP-8. AD-3 makes the values tunable core data. The values live in `../../dionysus-experience/shared/selection/model-v1.json` and `model-v1.scales.json`; TypeScript and Python read the same data. Evidence: `../matching/reachability-v1.md` and `distribution-v1.md`. Re-run `../matching/analyze.py`, `render.py` and `export-fixtures.py` after any change to weights, vocabulary or catalogue. The normal analysis reads shipped scales unchanged; it never recalibrates or overwrites them. Tests and builds check the exported reference's source hashes before comparing shortlists.

The questionnaire is a playful reflection, **not a validated psychological assessment**, and nothing in the product may claim otherwise.

## What primary and secondary mean

- **Primary = the core motive:** what the guest wants and fears losing. The pairing's goal and fear (BRANDING sheet) come from the primary.
- **Secondary = how that motive shows:** to other people and in temperament. It is the accent. *Caregiver × Creator* (The Craftsman) is care shown through making.
- Both are scored over the same 12 archetypes from two weightings of the same answers:
  - **M** (motive) leans on `drawnToward` (*What are you most drawn toward right now?*, H5's second round since 2026-10-06)
  - **E** (expression) leans on `soughtFor` (*What do people often come to you for?*, asked first), H4's quick instincts and H3's leanings.
- Consequence: which of two archetypes is primary in A × B against B × A is decided by **where the evidence comes from**. Evidence from what draws you makes an archetype the core. Evidence from how you come across makes it the accent.

## Pair formula

```
G_g(answers)[a]   centred contribution of answer group g to archetype a (absent answer = 0)
M[a] = Σ_g roleM_g · G_g[a] / scale_g
E[a] = Σ_g roleE_g · G_g[a] / scale_g
S(p, s) = M[p] + E[s] + φ · Σ_{f ∈ guest flavours} strength(pour(p,s), f)          p ≠ s
```

| group | roleM (motive) | roleE (expression) | scale_g | why |
| --- | --- | --- | --- | --- |
| H5 drawnToward | **1.0** | 0.3 | 0.373 | Desire and motive. The closest question to an archetype's goal. |
| H5 soughtFor | 0.4 | **1.0** | 0.347 | The social role others see. That is expression by definition. |
| H3 gravity | 0.5 | 0.6 | 0.303 | Style of moving through the world. Mostly expression, but the axes carry motive too (Controlled, Classic → Ruler). |
| H4 texture | 0.3 | 0.7 | 0.533 | Fast instinctive picks are temperament. The model must not lean on them for the core, because timing and attention confound them. |

- **Centring.** Within each group the core subtracts each archetype's mean affinity across that group's options. For H5, an option's column is its affinity minus the round's mean. For a binary or slider, it is ± half the difference between the poles. An archetype therefore cannot win just because more options mention it, and an absent answer is exactly neutral.
- **scale_g** is the group's spread under uniform answers (`calibrate()`, seed 20261006, 20,000 samples). After dividing by it, the role weights are comparable influence shares. The core ships these constants. It never recomputes them at runtime.
- **H3 lean** t = (value − 50)/50. It is linear, with no dead band, so a slight lean is a slight signal and a true midpoint is none.
- **Flavour fit φ = 0.15** per chosen flavour, scaled by the pour's 0–1 strength for it. φ is pour-level: it reorders close candidates and cannot override a clear persona margin. The median top-1 margin under U is ≈0.38, the p25 is ≈0.16, and φ changes 4–5% of top-1 results. Strengths are derived from the authored spec by `../matching/flavour-rules.json`, a proposed table that Tomás must review before launch. Sweet is ranked by the pour's sugar concentration in the live dps-tools table. Garnish is ignored.

## Selection (AD-3, unchanged order)

1. Score the 12 archetypes (M, E) and all 132 ordered pairings (S).
2. Drop pairings with no authored pour. Drop pairings whose `contains` meets any guest veto. A whole pour is removed: no substitution, no variant, no zero-proof.
3. Sort by S descending, comparing scores rounded to 9 decimals so float noise cannot reorder the shells. Ties break by `pairingKey` ascending. Take the top 3.
4. The Bartender picks one of the three. A pick outside the shortlist, or any failure, means `shortlist[0]` with the authored `yours` verbatim.

Determinism covers steps 1–3 and the fallback. It promises nothing about which of the three the LLM picks.

The catalogue floors (AD-4) guarantee a full shortlist for every veto set: ≥3 veto-free pours in development, all 132 plus ≥12 veto-free for launch. The validated shared catalogue has 132 authored pours, 105 veto-free, in the evidence regenerated on 2026-10-08. Draft, flagged and approved pours remain eligible; only absence from the supplied store or a matching veto removes a pour.

## Missing and conflicting answers

| case | handling |
| --- | --- |
| H4 pair timed out, skipped (Still Water), not presented, or interrupted and then missed | The key is absent and neutral. The reason is browser-only diagnostics, never scored in v3. |
| H5 round with 0 words | The group contributes 0. Other groups are **not** rescaled up, so thinner evidence yields smaller scores, but the ranking stays comparable. |
| H3 axis not reached | Absent and neutral. A committed 50 is also neutral, whether or not the mote moved: `gravityMoved` is diagnostic only. |
| No flavours | No flavour term. |
| Everything empty | All scores are 0, so the pairingKey tie-break decides: `caregiver-creator`. This is a deliberate, documented degenerate case; the live journey always commits H3. |
| Conflicting signals (e.g. drawn Peace, sought A little chaos) | No special rule. They are additive evidence, the margin shrinks, and the Bartender's shortlist carries the ambiguity. Model review logs per-group contributions and margins. These are never shown in the journey or sent to the LLM. |
| Untimed (reduced-motion) path | Scored identically. Timing is never an input in v3. |

## Timing (H4)

Timing is recorded as browser-only diagnostics (see intake-contract.md) and is **not an input**. It is a hypothesis: a fast catch may mean confidence, but reading speed, language, device, motor input, familiarity and attention all confound it. A timeout may mean ambivalence, confusion or a missed moment. Before timing may influence selection, playtests must compare outcomes with and without it, and a new answer version must put a coarse field on the wire, so that both shells score the same thing.

## Answer-to-signal table

Columns: **affects** = P (persona), R (recipe eligibility or preference), N (narrative only: Bartender, breath echoes, reading). Weights are raw 0–1 affinities before centring. Their sources are the archetype goals and fears in the BRANDING sheet (`../data/Brand Personality + Roulette.xlsx`).

### Context, identity and narrative only

| answer | meaning | affects | weight | rationale / risks |
| --- | --- | --- | --- | --- |
| H0 name | Dedication | N | — | Never sent to the LLM. Added by the assembler. |
| H1 lens (real, becoming, night, inner-child, past, another-side) | *Whose* self is being described | N | 0 | Scoring it would let the frame pick the persona. "Another side of me" is still the guest, with the same name. |
| H2 seed (8 liqueur colours) | First drop, mood colour | N | 0 | Colour–personality links are weak and culturally variable. The legacy scorer used colour as its only live input, which produced only 6 outcomes across 8 colours. |
| H7 trace | One private line | browser only | — | Never leaves the browser (AD-2). Never scored. |

### H5 drawnToward: *What are you most drawn toward right now?* (motive)

| word | affinities | rationale | ambiguity / redundancy |
| --- | --- | --- | --- |
| Freedom | Explorer 1.0, Outlaw 0.6 | Explorer's goal (Freedom, Independence). Outlaw's liberation. | — |
| Beauty | Lover 1.0, Creator 0.6 | Lover's sensuality. Creator's aesthetic self-expression. | — |
| Mastery | Hero 1.0, Sage 0.5, Ruler 0.5 | Hero's goal (Mastery). Sage's and Ruler's command of a field. | Shares Sage with Knowledge and Ruler with Influence. |
| Peace | Innocent 1.0, Caregiver 0.6, Sage 0.3 | Innocent's safety. Caregiver's calm. | — |
| Belonging | Regular Guy 1.0, Caregiver 0.5, Lover 0.3 | Regular Guy's goal (Belonging). | — |
| Pleasure | Jester 1.0, Lover 0.6 | Jester's goal (Pleasure, Enjoyment). | — |
| Wonder | Magician 1.0, Innocent 0.5, Explorer 0.3 | Magician's transformation. Innocent's sense of wonder. | — |
| Change | Outlaw 0.8, Magician 0.6, Creator 0.6 | Outlaw's revolution. Magician's transformation. Creator's innovation. | — |
| Knowledge | Sage 1.0, Explorer 0.3 | Sage's goal (Wisdom, Truth). Explorer's discovery. | Added by Q12 (2026-10-08). |
| Influence | Ruler 1.0, Hero 0.3, Magician 0.3 | Ruler's goal (Control, Power). Hero's impact. Magician's making things happen. | Added by Q12 (2026-10-08). |
| Making | Creator 1.0, Hero 0.3 | Creator's goal (Innovation, self-expression). Hero's achievement. | Added by Q12 (2026-10-08). |
| Caring | Caregiver 1.0, Regular Guy 0.3, Lover 0.3 | Caregiver's goal (Service). Regular Guy's and Lover's attachment. | Added by Q12 (2026-10-08). |

*Mischief* (Jester 0.8, Outlaw 0.6) was retired by Q12: it was redundant with Pleasure, Change and soughtFor's *A little chaos*. Its id is never reused.

### H5 soughtFor: *What do people often come to you for?* (expression)

| word | affinities | rationale | ambiguity / redundancy |
| --- | --- | --- | --- |
| Advice | Sage 1.0, Ruler 0.4, Caregiver 0.3 | Sage shares wisdom. | — |
| Comfort | Caregiver 1.0, Regular Guy 0.4, Innocent 0.3 | Caregiver's compassion. | — |
| Honesty | Innocent 0.8, Regular Guy 0.6, Sage 0.4 | Honesty is an Innocent goal. Regular Guy's fairness. | Broad, so it never peaks at 1.0. |
| Courage | Hero 1.0, Outlaw 0.4, Explorer 0.3 | Hero's goal (Courage). | — |
| Ideas | Creator 1.0, Magician 0.5, Explorer 0.3 | Creator's imagination. | — |
| Calm | Caregiver 0.6, Sage 0.5, Innocent 0.5, Ruler 0.3 | A steadying presence. | Overlaps with Comfort, so it is kept diffuse. |
| Taste | Lover 0.8, Creator 0.6, Ruler 0.4 | Lover's sensuality. Creator's aesthetics. Ruler's status. | — |
| A reality check | Ruler 0.8, Sage 0.6, Regular Guy 0.4 | Ruler's control and confidence. Sage's clarity. | — |
| A little chaos | Jester 1.0, Outlaw 0.7, Magician 0.3 | Jester's fun. Outlaw's disruption. | — |

### H3 gravity (lean −1 … +1)

| axis | left pole | right pole |
| --- | --- | --- |
| Solitary ↔ Social | Sage 0.8, Explorer 0.6, Creator 0.4 | Regular Guy 0.8, Jester 0.7, Lover 0.6, Caregiver 0.4 |
| Controlled ↔ Wild | Ruler 1.0, Sage 0.5, Caregiver 0.4, Hero 0.3 | Outlaw 0.9, Jester 0.6, Explorer 0.5 |
| Classic ↔ Experimental | Ruler 0.6, Regular Guy 0.6, Sage 0.5, Caregiver 0.3 | Creator 0.9, Magician 0.7, Explorer 0.4, Outlaw 0.3 |
| Analytical ↔ Instinctive | Sage 0.9, Ruler 0.5, Creator 0.3 | Lover 0.6, Jester 0.5, Explorer 0.5, Magician 0.5, Hero 0.4 |
| Grounded ↔ Dreamlike | Regular Guy 0.7, Caregiver 0.6, Hero 0.5, Ruler 0.4 | Magician 0.8, Innocent 0.7, Creator 0.6, Lover 0.3 |

Rationale: each pole follows the goals and fears in the BRANDING sheet:

- Ruler fears chaos.
- Outlaw seeks liberation and risk.
- Creator rejects the status quo.
- Sage seeks understanding.
- Magician transforms.
- Regular Guy belongs.

Ambiguity: Controlled and In control (H4) are near-duplicates for Ruler. Both are kept at modest weight, because H3 is a degree and H4 an instinct. They are flagged for a playtest redundancy check.

### H4 texture (quick catch; an absent pair is neutral)

| pair | pole a | pole b |
| --- | --- | --- |
| Sharp / Smooth | Sage 0.5, Outlaw 0.5, Hero 0.4, Ruler 0.3 | Lover 0.6, Caregiver 0.5, Regular Guy 0.4, Magician 0.3 |
| Relaxed / Excited | Regular Guy 0.5, Innocent 0.5, Sage 0.4, Caregiver 0.3 | Jester 0.6, Explorer 0.6, Hero 0.4, Lover 0.3 |
| Half-full / Half-empty | Innocent 0.8, Jester 0.4, Caregiver 0.3, Hero 0.3 | Outlaw 0.5, Sage 0.5, Ruler 0.3 |
| In control / Out of control | Ruler 0.9, Hero 0.5, Sage 0.3 | Outlaw 0.6, Jester 0.6, Explorer 0.4, Lover 0.3 |
| Quiet / Loud | Sage 0.6, Caregiver 0.4, Innocent 0.4, Creator 0.3 | Jester 0.7, Hero 0.4, Outlaw 0.4, Ruler 0.3 |
| Risk averse / Risk taker | Caregiver 0.5, Ruler 0.5, Innocent 0.5, Regular Guy 0.4 | Outlaw 0.7, Explorer 0.7, Hero 0.5, Magician 0.3 |
| Bright / Dark | Innocent 0.7, Jester 0.4, Caregiver 0.3 | Magician 0.6, Outlaw 0.6, Lover 0.4 |
| Soft / Rough | Caregiver 0.6, Innocent 0.5, Lover 0.4 | Outlaw 0.6, Hero 0.5, Explorer 0.5, Regular Guy 0.3 |
| Harmonic / Disharmonic | Caregiver 0.5, Innocent 0.5, Sage 0.4, Lover 0.3, Ruler 0.3 | Creator 0.6, Outlaw 0.6, Jester 0.4, Magician 0.3 |

Ambiguity:

- Half-empty and Dark read as negative. They are weighted to the sceptic and shadow archetypes (Sage, Outlaw, Magician), never as a penalty.
- Pole b includes Outlaw on seven of nine pairs. Centring cancels the volume effect, but a guest who catches mostly b-words will drift toward Outlaw. Playtest this.

### H6 flavours and vetoes

| answer | meaning | affects | handling |
| --- | --- | --- | --- |
| Flavours (≤3 of Sweet, Bitter, Spicy, Herbal, Fruity, Citrusy, Fresh, Floral, Smoky) | Taste preference | R (preference) | Flavour-fit term φ on the pour. Never an archetype signal. |
| Vetoes (egg-white, dairy, gluten, nuts, spice) | Must never be in the glass | R (eligibility) | Hard filter on whole pours before the shortlist. Under U, nuts changes 12% of top-1 results (14 pours contain nuts) and all five vetoes together change 20.3%. |

## Question edit Q12 (adopted 2026-10-08)

**Gap (nine-word round).** Caregiver, Creator, Ruler and Sage are primary for 2–5% of guests under uniform answers, against about 11% for the other eight. A guest answering in character as one of them gets that primary back only 10–22% of the time, against 30–56% for the others. Cause: drawnToward has no word whose core is their goal (Service, Innovation, Control, Wisdom). The 2026-09-18 overlap trims (Knowledge vs Mastery, Power and Recognition) removed exactly these, and drawnToward is the motive signal. All 132 pairings stay reachable (reachability-v1.md), so this is starved evidence, not a dead outcome.

**A weights-only fix does not close it.** Variant A raises soughtFor's motive role from 0.4 to 0.7. It moves Caregiver recovery 0.08 → 0.12 and Ruler 0.19 → 0.16, while blurring what makes a pairing reversed.

**Smallest useful edit (variant Q12):** in drawnToward, drop **Mischief** (redundant: see above) and add four goal words. drawnToward becomes 12 words.

| new word (label approved by Robin 2026-10-08) | affinities |
| --- | --- |
| Knowledge | Sage 1.0, Explorer 0.3 |
| Influence | Ruler 1.0, Hero 0.3, Magician 0.3 |
| Making | Creator 1.0, Hero 0.3 |
| Caring | Caregiver 1.0, Regular Guy 0.3, Lover 0.3 |

Historical Q12 experiment (2026-10-06, before the validated catalogue refresh; not part of the shipped model):

- Primary shares go to 0.05–0.10 for every archetype.
- Recovery for the four thin archetypes rises to 0.30–0.47.
- Exact-pairing recovery goes 0.137 → 0.151.
- Reversed-instead goes 0.148 → 0.136.

Cost: 12 spheres instead of 9 in H5's second round. soughtFor is unchanged.

Status: **adopted 2026-10-08** (Robin asked for the twelve words; labels as proposed). The H5 world lays out the round from its word count: four rows of three on phones, three rows of four on short phones (375×667), the far orbit on desktop. Regenerated evidence against the validated catalogue (distribution-v1.md):

- 132/132 pairings still lead the fallback on persona answers alone.
- Primary shares under U are 0.054–0.102. Caregiver, Creator, Ruler and Sage rose from 0.022–0.041 to 0.080–0.092.
- Recovery for those four rose from 0.10–0.22 to 0.29–0.47. Exact-pairing recovery is 0.149 → 0.146 and reversed-instead 0.147 → 0.148.
- Outlaw is now the thinnest primary (0.078 → 0.054 under U; recovery 0.30 → 0.21), because it lost Mischief's 0.6. Watch it in playtests.

These are simulated answer models, not observed production results.

## Review cadence

Any change to a weight, a vocabulary or the catalogue requires these to be re-run:

- `analyze.py` and `render.py`.
- The core's coverage tests over `fixtures-v1.json`.

A change that drops any pairing from "leads fallback" needs a new witness or an explicit decision.
