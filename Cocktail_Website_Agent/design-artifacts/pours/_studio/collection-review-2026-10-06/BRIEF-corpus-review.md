# Brief: corpus review (collection review, 2026-10-06)

You are the **corpus reviewer**. Family reviewers have each read their own families in depth (`reviews/<family>.md`). You read **across** the collection, for what no single family can see. Recommendations only: you never edit a pour, spec, room, plan, fact card, sanctum, ingredient table or `review.xlsx`.

Paths are relative to `Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio/collection-review-2026-10-06/` unless stated.

## Read first

- `../../STUDIO-RULES.md` (Robin's rulebook) and `../robin-edits.md` (his direct edits: final, never reverted).
- `BRIEF-family-review.md` (the axes and priorities the family reviewers used).
- `signals.md` (mechanical cross-collection flags), `decision-pack.md` (what Robin is already being asked; don't duplicate it).
- The family reviews in `reviews/`, the ones that exist when you start. Don't redo their work; build on it.

## Your four jobs

1. **All 66 reversed pairs** (`reversed/<a>__<b>.md`, both pours side by side). For each: is the *primary* motivation recognisably different, and does each pour read as its own person? Verdict per pair: `distinct`, `close` or `interchangeable`, with one line of evidence (quote). For `close` and `interchangeable`, name what should move and in which pour (tagline, whoYouAre's key sentence, the proposal), and why.
2. **Collection voice.** From `signals.md` and your own reading of the corpus files (`corpus/*.md`): recurring openings (yours 1), proposal formulas ("So here's my…", "One thing I'd…", "So when someone…", "Next time…"), closing-line shapes ("Next time, …" endings), the "isn't X. It's Y" turn in whoYouAre, "quiet/quietly", "nobody/everyone", and the 95% "I like to think" (allowed as the signature; say whether it's become a tic in any position). Decide which are real problems for a guest who reads two or three pours (friends compare) and which are harmless. Propose a small set of variety rules the editor can apply, each with two before/after examples from real pours.
3. **Repeated historical anchors and people.** Shared fact cards and people named in more than one reading (signals list them: Gary Regan, Trader Vic, Dave Arnold, David Wondrich, Jerry Thomas, Jeffrey Morgenthaler, Robert Simonson, Del Maguey, Kir, Hanky Panky, Cecchini…). For each, say whether the two tellings collide for a guest (same anecdote, same lesson) or are fenced (different facet), with the excerpts.
4. **Recipe neighbours across the collection.** `signals.md` lists the closest pairs (e.g. *As It Was* / *Straight Back* / *Further Than Me*; *In Kind* / *What It Rests On*; *Leave It With Me* / *Off the Tour* / *The Other Berry*; *Just So You Know* / *On Their Behalf*; *Quite Alive* / *Anyway*). Read each pair's recipe and method in the corpus files. Robin's rule: a drink category is never "taken"; only the exact same cocktail is ruled out. So the question is only whether a guest who saw both would feel they got the same drink. Verdict and, where needed, the smallest difference that would fix it (Tomás's ground: mark `Tomás to check`).

## Write

`reviews/_corpus.md`:

```markdown
# Corpus review (2026-10-06)

Summary: the five things that matter most across the collection, ranked.

## Reversed pairs (66)
| pair | verdict | evidence | what should move |

## Collection voice
Findings, then the proposed variety rules (each with two before/after examples, verbatim "before").

## Repeated anchors and people
| anchor / person | pours | collide or fenced | note |

## Recipe neighbours
| pours | verdict | note |

## Revision proposals (ranked)
Same block shape as the family reviews (### <pairing> · P1|P2|P3 · ground · routine|Robin, then Where / Current (verbatim) / Proposed / Why / Checks).
```

Return a single line: file written, reversed-pair verdict counts, proposal counts.
