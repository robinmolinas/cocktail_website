# Fact audit v1: outlaw-hero (The Maverick), r4 (Hester)

On `psychologist-reading-v1.md` and `specs/outlaw-hero.json` v1. Card: `fact-cards/tai-solarin-ogogoro.md`. Fixes carry IDs with old → new; the words are Wren's to change.

**Verdict: FAIL, 5 fixes (A1–A5) and 1 spec fix (S1).** All are small enough for round 5. Everything else passes.

| id | line | claim | label | source | verdict |
|---|---|---|---|---|---|
| A1 | epigraph | "a man who never drank" | fact, overstated | Oxford pdf 1417: "a teetotaler" | **FIX.** Teetotaller means he didn't drink. It doesn't establish "never" (only Drinkabl says "never drank a drop", and it's derivative). old "who never drank" → new "who didn't drink". |
| A2 | epigraph | "arrested for half of this glass" | proportion claim | spec: 30 ml of 93.3 ml, about a third before dilution | **FIX.** Ogogoro is half the *spirits*, not half the glass. Also, our bottle is Pedro's (2017); he was arrested for the spirit, not for this bottle. old "got himself arrested for half of this glass" → new "got himself arrested for one of the two spirits in this glass" (or Wren's equivalent). |
| — | y1 | "Ogogoro is distilled from the sap of palm trees" | fact | Oxford pdf 1417 (raffia or oil palm) | pass |
| A3 | y1 | "For nearly fifty years, Nigeria's own spirit was against the law" | fact, overstated | Oxford pdf 1417: ogogoro's "origins appear to lie in the early 1930s"; local distilling banned 1919; changed 1968 (start contested: PUNCH 1910) | **FIX.** 1919–1968 is 49 years for local distilling. The spirit itself is on record only from the early 1930s, and both ends are contested. old "For nearly fifty years" → new "For decades". |
| A4 | y1 | "a treaty of 1919 banned distilling it at home" | fact, two words off | Oxford pdf 1417: the 1919 treaty "banned local distillation" | **FIX.** "At home" reads as inside your own house, and "it" says ogogoro already existed in 1919 (it's dated to the 1930s). old "banned distilling it at home" → new "banned distilling spirits locally". |
| item 3 | y1 | "Under British colonial rule" | setting | Oxford pdf 1417: restrictions "imposed by the British colonial power"; "the same 1919 treaty that limited cheap imports" | **pass.** The setting is on the page. Keep it a setting: never "Britain's treaty" or "the British banned it". Note: the treaty clause sits inside Oxford's "popular history" sentence, but as Oxford's own explanatory aside, and it names the treaty that limited imports in the sentence before. It stands. |
| — | y1 | foreign spirits could still be sold, gin above all; made anyway, more and more; illegal after 1960 | fact | Oxford pdf 1417 | pass (limited, not flooded: Wren's guard kept) |
| — | y2 | 1968; educator; got himself arrested for having some; on purpose, to show the unfairness of banning a local spirit and allowing foreign ones | fact | Oxford pdf 1417 ("contrived", "in order to dramatize") | pass. The motive is Oxford's, from its 1968 source. |
| — | y2 | "That September, a Lagos paper's headline read 'Solarin Freed of Gin Charge'" | fact | Oxford pdf 1418 bibliography: *Lagos Daily Times*, 14 Sep 1968, p. 3 | pass. No release date claimed. |
| item 1 | y2 | "The ban ended that same year." | fact at Oxford's date, no cause | Oxford pdf 1417 ("finally changed in 1968"); C1 owned | **pass.** I prefer yours to mine: it dates the end without crediting him alone, and point 3 still lands because it comes straight after the headline. Contested by three unsourced secondaries; the 1968 charge counts against them (card C1). |
| — | y2 | "And Tai Solarin didn't drink." | fact | Oxford pdf 1417 | pass |
| — | y3 | "How it went, we don't know." | true | card "Not found" | pass |
| A5a | y3 | "I like to think he didn't need to say much" | signposted, but a claim about absence | ZODML: he wrote regular columns for the *Daily Times* from 1958, the paper that ran the headline | **ADVISORY (strike).** He may well have written about it, so even signposted, "didn't need to say much" runs into his own column. It also points at speech, your guard. old "I like to think he didn't need to say much: he just made the rule do…" → new "I like to think he just made the rule do…" |
| A5b | y3 | "he made sure the charge had his name on it, nobody else's" | outside the signpost | Oxford "contrived to get himself arrested" + headline | **FIX (item 2).** "Made sure" is carried by "contrived". "Nobody else's" isn't on any page: we don't know who else was charged. And "his name on it" sits close to *In Your Own Hand*'s guarded "your name on it". old "and he made sure the charge had his name on it, nobody else's" → new "and made sure the charge landed on him". |
| — | y4 | "stirred, cold and strong, a close cousin of the Manhattan, that great classic" | fact (structure) + our praise | *Codex* p. 84 (Manhattan in "the Martini extended family"), p. 65 (the Martini's "likely historical predecessor"); spec 23.6% | pass. Your question: *Codex* pp. 65 and 84 carry it, so no further page is needed for "classic". |
| — | y4 | Pedro's: Nigerian ogogoro, palm sap, made in villages, refined in Lagos | fact | *Difford's* (distilled in villages in Delta and Ogun states, redistilled in Lagos "to produce a refined ògógóró") | pass |
| A6 | y4 | "I split them as a nod to what Tai Solarin was arrested for: one rule for both" | causal slip | Oxford pdf 1417 | **FIX.** He was arrested *for* possessing the spirit. "One rule for both" was the point he made by it. old "a nod to what Tai Solarin was arrested for" → new "a nod to the point Tai Solarin got himself arrested to make". |
| — | y4 | "Same jigger, same glass… Sweet vermouth… a dash of orange bitters" | recipe | spec v1 | pass (no "only" claim, so the unlisted demerara is fine). Re-check against Tomás's method once it lands. |
| — | y5 | proposal | our reading | — | pass (no facts) |

## Spec v1
| id | item | verdict |
|---|---|---|
| S1 | `version` text: "Pedro's Premium Ogogoro (40%, recommended)" | **FIX.** Artifex also sells a 5-year aged version. The ingredient table already says "unaged"; the spec text and the Makeable line must say "unaged" too. |
| — | balance | Re-run by me: 93.3 ml → 133.2 ml, 23.6% / 4.77 g / 0.135% acid / 42.7% dilution, all ok on `stirred`. "Unsourced values used: orange bitters" must be listed in Checks. |
| — | allergens | veto-free; ogogoro classified on the palm (raffia/oil palm, Oxford pdf 1417; PUNCH), not coconut. Difford's "coconut" is a taste note. Pass. |
| — | glass | Nick & Nora about 150 ml takes 133 ml: pass (tight). |
| — | support for Tomás | *Codex* p. 14: orange bitters "are great with unaged spirits—gin … especially when paired with a fortified wine". Optional for Checks. |
| — | split | Equal halves are ours; the *Codex* p. 71 splits are unequal. Checks must say so (never "as the Codex does"). |

## Names
Pick: **Can't Watch**. *One Rule for Both* is the glass, not the person. *Fair's Fair* sits close to *Fair Measure* (caregiver-ruler) in the registry.
