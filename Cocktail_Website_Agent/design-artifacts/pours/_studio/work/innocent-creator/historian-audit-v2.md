# Fact audit v2: the drink (innocent-creator), Hester, round 5 (2026-10-01)

**Audits** `mixologist-draft.md` (v1, round 4) and `_studio/specs/innocent-creator.json`. Every citation was opened on the page in this call: *LI* pp. 141, 142, 145; *Codex* pp. 9, 18, 191, 194; Oxford pdf 386. The reading's fixes X1–X7 stay in `historian-audit-v1.md`, and I confirm them on Wren's v3 in round 6.

**Verdict: PASS once D1 and D2 are in.** D3 is a label only. Nothing in the glass changes.

| # | Where | Claim | Label | Source (read) | Verdict |
|---|---|---|---|---|---|
| 1 | header, Structure | the Kalimotxo as Oxford prints it: equal parts, a tall ice-filled glass, stir | fact | Oxford pdf 386 recipe | pass; "never 'their recipe' for the glass as a whole" is right |
| 2 | Structure | phosphoric acid gives most of a commercial soda's acidity | fact | *Codex* p. 194 ("responsible for most of the acidity in commercial sodas") | pass |
| 3 | Structure | cola brings "a burst of sugar and acidity" | fact (quote) | *Codex* p. 191 (said of the Long Island Iced Tea) | pass, quote exact |
| 4 | Structure | "A non-spirit core, so the template is adjusted (*Codex* p. 9)." | fact, scope | *Codex* p. 9 is about the **Old-Fashioned**: "a fortified wine or amaro can also fulfill this role", with adjustments | **D2, scope.** Old → new: "A non-spirit core, so the template is adjusted (*Codex* p. 9)." → "A non-spirit core, so the template is adjusted (*Codex* p. 9 allows a fortified wine or amaro as an Old-Fashioned's core; applied here by analogy)." |
| 5 | Balance | 6.5% / 5.40 g / 0.30%; strength OUT by design | numbers | `balance.py`; unsourced values labelled (wine 13%, Coca-Cola 10.6 g) | pass; the OUT is explained, and the unsourced values say so |
| 6 | Balance | "the first part of a frozen cube to melt is richer in sugar and flavour than the last. So the glass runs slightly stronger and sweeter mid-drink" | fact + inference | *LI* p. 145: "richer in sugar, acid, and flavor", said of **juice** cubes in a shaker. Alcohol isn't on the page. | **D1, the page's noun.** "Stronger" is an inference about alcohol. Old → new: "So the glass runs slightly stronger and sweeter mid-drink" → "So the glass runs slightly sweeter and richer mid-drink (*LI* p. 145 says this of juice cubes; that the alcohol behaves the same way is my inference)". In the room (r4), "stronger mid-drink, never thinner" carries the same word: never put it in the reading. |
| 7 | Freezing | a home freezer freezes a mix under 15.5% ABV and 9 g/100 ml sugar | fact | *LI* p. 141: "below 15.5 percent"; sugar "don't let it get above 9 grams per 100 milliliters" | pass. **Scope note:** Arnold's limits are for a batch frozen to be blended into a slush, and he warns that a freezer at −20°C or warmer may not be cold enough for his 14% mix. Ours, at 6.5%, is well inside, so the claim stands. |
| 8 | Freezing | "It takes a long time to freeze these drinks properly" | fact (quote) | *LI* p. 141 | pass. **D3, label only:** "at least 6 hours" is Tomás's figure (Arnold's own batches go in "the night before", a phrase our text rightly avoids). Mark it "(my figure)" in Checks. |
| 9 | Freezing | ~−2.5°C onset, ~¾ ice at −18°C, Arnold's base ~40%, 16.8% before the lime | estimate | labelled unsourced (Tomás's calculation); *LI* p. 142 gives 14.2% for the finished drink, so the 16.8% before lime and water is plausible | pass as labelled |
| 10 | Freezing | "frozen juice is much softer than frozen water" | fact (quote) | *LI* p. 145 | pass, quote exact; "a bit like an ice lolly" is ours, and fine |
| 11 | Pairings | taste "likened to sangria"; "Basque-country classic"; no grand wine | fact | Oxford pdf 386 (F12); Schaap (F9); *Codex* p. 18 (F8) | pass |
| 12 | Pairings | the spark is *LI* p. 145's juice cubes applied to the whole drink | fact + ours | *LI* p. 145 | pass; the analogy is owned |
| 13 | Allergens | veto-free; Coca-Cola gluten-free (own knowledge) | classification | `allergens.py`; labelled unsourced | pass |
| 14 | Makeable | Coca-Cola named because the record names it | fact | Oxford pdf 386 recipe ("Coca-Cola") | pass |
| 15 | Recipe | young Rioja or Garnacha, by the glass | ours | R4 (the name doesn't name the wine); F10 | pass; it's a style choice, never "what the Basques pour" (X7a) |
| 16 | Method 1 | "at least 6 hours ahead"; no "the night before" | method | X7b | pass |
| 17 | closingLine | "Stir once, over its own ice. How it's usually done can wait until they've tasted it." | ours | — | pass (no fact). Whether the callback spends whoYouAre's line is Wren's call. |
| 18 | Image brief | cake, card, cubes; no barman, festival, bags or fruit | ours | C3, guards | pass; it keeps every fenced item out |
| 19 | Names | *Not Only the Way* shares "the way" | check | registry | pass, and I agree it's distinct |

**Name pick (Hester): *The Way It Felt*.** It is the only name in the list that's true of the guest and of what the record shows. The drink was never made "right", only the way the people drinking it liked it. Runner-up: *Obviously Lovely*.
