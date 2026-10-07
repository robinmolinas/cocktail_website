# Fact audit v2: The Giggler (innocent-jester), round 4 step 2

Hester, 2026-10-04. Audited as they stand: `psychologist-reading-v2.md` (title block, whoYouAre, yours y1–y5, Notes), `mixologist-draft.md` v1.1 (recipe, method, closing line, Checks, image brief, names) and `specs/innocent-jester.json`. Re-checked against card `sam-ross-ginger-paper-plane.md`, Oxford GRAPPA pdf 935, *Codex* pp. 11, 179, 181, 191, 258–259, *LI* p. 61 and *Flavor Matrix* pdf 132 (galangal "pungent spices", read this round).

**Verdict: the guest text PASSES. Four dossier lines still need fixing (R1–R4), old → new. None of them is in guest text, and none touches a fact the guest reads or the drink.**

## Audit v1 fixes, carried

| ID | v1 fix | in v2 | verdict |
|---|---|---|---|
| H1 | "Most people who went"; "one bartender remembered" | y1, word for word | PASS |
| H2 | "all 'so tongue in cheek', and 'there was a credibility gap'" | y2 | PASS |
| H3 | "It's called the Paper Plane" | y2 | PASS |
| H4 | "years later he called it" (my "2014" struck) | y2; Notes say "undated (past tense)" | PASS. A 2007 drink and a 2014–2016 quote: "years later" holds. |
| H5 | "A whole city's bars joined in" | y3 | PASS |
| H6 | grappa from skins and seeds | y4: "the grape skins, stems and seeds left once the juice is pressed out for wine" | PASS. Oxford GRAPPA pdf 935: "skins, stems, seeds… remaining after grapes are pressed to make wine". |
| H7 | the shake | y4: "until the shaker's uncomfortable to hold"; method step 4: "too cold to hold comfortably", "hard" gone from both | PASS. The reading matches the method. |
| H8 | the salt | y4: "It isn't meant to taste salty." | PASS. *LI* p. 61: salt "should be subthreshold". It states an aim, not a promise. |
| draft | "the original's ¾ oz" | "the printed recipe's ¾ oz" | PASS |

## Fresh pass on the files as they stand

| where | claim | verdict |
|---|---|---|
| epigraph | named for a song that was on; one city adopted it | PASS (F14, F16) |
| y1–y3 | every fact line | PASS (F1–F16; no year, no Violet Hour, no "his original", Reaburn and Briars named) |
| y4 | "a modern classic" | PASS (Oxford MILK & HONEY pdf 1304) |
| y4 | Aperol "bright orange… gently bitter"; Nonino "bitter herbal liqueur made on grappa" | PASS (Oxford pdf 125; *Codex* pp. 258–259) |
| y4 | "two small changes of mine" = the lemon and the salt | PASS against the spec |
| y4 | lemon trimmed "bright rather than sharp"; coupe from the freezer; poured off the ice | PASS against the recipe, method steps 2 and 5, and the balance (0.897%) |
| closing line | "Five drops of salt water before you shake. And when something's funny, laugh out loud." | PASS. Method step 3 puts the drops in before the ice, and it makes no claim. |
| recipe note | grappa "a brandy distilled from what's left after winemaking" | PASS (pomace, pdf 935) |
| Checks, Structure | "in place of the Cointreau", "reduced in proportion" (pp. 178–179); Twist of Menton (p. 191) | PASS, read on the page |
| Checks, Pairings | *Codex* p. 181 quotes; Exit Strategy 1½ oz Nonino, 6 drops (p. 11) | PASS |
| Checks, Allergens | galangal in ginger's family, "pungent spices" (Matrix pdf 132); ginger under `spice` in *Worth the Trip* | PASS as a safe-side call on an **unread** list, flagged for Robin. Note for him: the same Matrix sentence also puts cardamom in that family. The call rests on galangal's heat, not on the family alone. |
| image brief | orange plastic "Ginger's" (Crawley's memory, p. 144); comedy-script menu | PASS (props evoke; nothing claims the bench was Ginger's) |
| names | *Nothing Wrong* withdrawn | — |

## Still to fix (old → new)

| ID | file | old | new | why |
|---|---|---|---|---|
| R1 | reading v2, Story/Drink line (dossier) | "5 drops salt water, shaken, chilled coupe, no garnish; veto-free)" | "5 drops salt water, shaken, chilled coupe, no garnish; contains spice: galangal in the Nonino, Tomás r4)" | The drink changed its veto in step 1. The dossier must not keep a dropped claim. |
| R2 | draft, Pairings | "so the reading says \"it isn't there to make it taste salty\" (Hester H8)" | "so the reading says \"It isn't meant to taste salty\" (H8, in Wren's v2 words)" | It quotes a line the reading no longer has. |
| R3 | spec, `subfamily` | "two bitter liqueurs in place of the curaçao" | "two bitter liqueurs in place of the Cointreau" | *Codex* p. 179 says Cointreau. Scope fixes reach the JSON notes too. |
| R4 | draft, Balance sweeps | "Alko (Finland's state retailer) lists 208 g/l, a **lead from a search summary; the page wasn't read**" | "a search summary says Alko (Finland's state retailer) lists 208 g/l: a **lead; the page wasn't read**" | The sentence opens by stating, as fact, something nobody has read. The caveat belongs at the front. |

Once R1–R4 are in the files, I'd put my name to this.

## Step 4 confirmation (Hester, 2026-10-04)

Checked against the files themselves (grep), not against the reports:
- **R1** in: reading v2 drink line now says "no garnish; contains spice: galangal in the Nonino, Tomás r4)". "Veto-free" no longer appears anywhere in reading v2.
- **R2** in: draft Pairings now says "It isn't meant to taste salty" (H8, in Wren's v2 words).
- **R3** in: spec `subfamily` now says "in place of the Cointreau".
- **R4** in: draft Balance sweeps now says "a search summary says Alko … lists 208 g/l: a **lead; the page wasn't read**", with the caveat first.

Guest text unchanged since the step-2 pass. Nothing is left open except the `spice` flag, which Robin rules on: galangal comes from an unread botanicals list, and the call is Tomás's safe-side one. **Final: PASS.** Name: *There It Goes*. I'd put my name to this.
