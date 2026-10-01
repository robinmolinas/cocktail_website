# Fact audit v4 (Hester, round 6 step 3): reading v4 (`psychologist-reading-v4.md`), draft (`mixologist-draft.md`), spec (`_studio/specs/explorer-magician.json`)

Card: `_studio/fact-cards/gary-regan-mindful-bartending.md`. Checked against v3 by diff, and each changed sentence against its page (Joy pdf 115, 116, 119, 120, 351; Codex printed 89).

**Verdict: PASS. No open items.**

## R1–R3 (audit v3)
| ID | v4 text | status |
|---|---|---|
| R1 | "Writing about it, he told bartenders never to take things too seriously, and said that when he was setting up a bar alone, loud music could be his meditation." | landed word for word |
| R2 | "In his best-known book, he printed it with the Campari first," | landed |
| R3 | "The recipe doesn't say why." | landed |

## Wren's round-6 trims
| # | change | verdict | source |
|---|---|---|---|
| 1 | "a small English seaside town" | PASS | Joy pdf 119: "a small-town guy from a seaside resort in the northwest of England" |
| 2 | "He ate dinner alone at a table, then sat on" | PASS | Joy pdf 119: ate at a table, refused company, "continue to sit alone" |
| 3 | "It worked." cut | PASS | removal only; the quote carries it |
| 4 | "The idea of mindfulness for bartenders came to him at workshops, and he gave talks on it" | PASS | Joy pdf 115 (timing "when I was attending" kept; cities cut) |
| 5 | ", in an ice-filled glass" cut | PASS | removal only; Method keeps the ice |
| 6 | y3 "I'd guess something in your week does that for you, and you've never given it a name." | PASS | guest-side, signposted ("I'd guess"), no fact |

## Draft and spec
| item | verdict |
|---|---|
| Image brief: "red (the Codex's 'rich, red cloak' of Campari and sweet vermouth, p. 89)" | PASS. Codex printed 89, White Negroni headnote: "the Negroni's rich, red cloak of sweet vermouth and Campari". |
| Recipe / Method / Checks (T1 settled) / Contains veto-free / closing line / name pick *Just Knew* | PASS (as audit v2, unchanged) |
| Spec | PASS. 45 / 22.5 / 15 / 15, garnish bay_leaf_dried + orange_peel, rocks glass with ice, matches the recipe. Its `_draft` note is internal, not guest text. |

## Anchors
`historian-anchors.md` v2 holds no wording the audits struck (re-checked for "after attending", "just as well", "some mornings", "never said", "same chapter": none; "though" appears only inside his exact quote, pdf 119, which is correct). The name is *Just Knew*.

## Note for the host
`lint_pour.py explorer-magician` can't run until the pour file is assembled (FileNotFoundError). Lint at assembly. Any lint-only fix that changes no fact leaves this sign-off standing.
