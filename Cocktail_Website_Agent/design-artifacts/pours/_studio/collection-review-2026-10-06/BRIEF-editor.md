# Brief: family editor (applying Robin's decisions, 2026-10-06)

You are the **editor** for your families: you apply what Robin agreed today, in the pour files and room records, and nothing else. Each editor owns a disjoint set of pour files, so you never touch another family's pour. The shared files (ingredient table, specs, `styles.json`, `balance.py`, `STUDIO-RULES.md`, registry, `review.xlsx`, sanctums) are owned by the coordinator: **never edit them.**

Paths are relative to `Dionysus/Cocktail_Website_Agent/design-artifacts/pours/` unless they start with `skills/` (= `/Users/robin.molinas/Documents/GenAI Projects/skills/`, the live tools).

## Robin's answers (2026-10-06), verbatim where it matters

D1 "approve all they're fine" → shared rows Peychaud's, Coca-Cola, Underberg, Batavia arrack and Amaro Nonino are **none** (already changed in the table). D2 "accept" → OUT readings of recognised forms are accepted **by structure** (already in the specs' `accepted` blocks / `stirred-spirit` style; flip has no acid range). D3 A (*In Your Own Hand* ships Murphy's measures). D4 A + Hester's fix ("for all the drink balances you can also check the cocktail codex": Tomás does that pass after you; **don't touch the Checks › Balance rows**). D5 A (names below). D6 A (*The Wink*: one plain clause, Hester's wording). D7 A (*Whoever Comes In* keeps the cash machine). D8 A. D9 A (rules now in STUDIO-RULES). D10 accept (*Far Enough*'s sign-offs stand). D11 "no means accept the current line" (taglines unchanged, except *For Good*). D12 B (*Word Gets Round* is in a rework room: **don't touch regular-guy-ruler**). D13 "Apply the changes, I trust your taste judgement" (the variety rules; now the subsection "Variety across the collection" in `STUDIO-RULES.md`). D14 "whatever you recommend" (change only creator-ruler's ¶1; plus the five one-sentence close-pair fixes).

Read first: `STUDIO-RULES.md` (including today's additions), `_studio/robin-edits.md`, `_studio/collection-review-2026-10-06/decision-pack.md`, `revision-queue.md`, the family reviews for your families and `reviews/_corpus.md`, and `hester-2026-10-06.md` (Hester's exact wording for *The Wink*, *Either Way* and *On the Record*).

## What to apply, per pour

**1. Decision items** (only in the pours named):

| pour | apply |
| --- | --- |
| hero-outlaw, innocent-jester, magician-ruler, outlaw-jester, ruler-outlaw | `contains` → `[]` everywhere it appears (frontmatter `veto_free: true            # contains: []`, both cocktail-block lines); Checks › Allergens / Vetoes: add one sentence "Ruled none by Robin 2026-10-06 (D1): a row is classed only on a stated ingredient; <row> rested on <tasting note / historical formula / secret recipe / unread summary / dropped palm sap>." Open items: mark the old question resolved. Check `allergens.py specs/<pairing>.json` gives `[]`. |
| innocent-creator, jester-caregiver, magician-caregiver, ruler-regular-guy, hero-regular-guy, magician-outlaw (approved) | files already say the right thing; only update any Checks / Open items prose that still says the cola/Peychaud's/Underberg/Bénédictine question is open (Bénédictine stays nuts) |
| explorer-hero, outlaw-regular-guy, hero-lover, innocent-ruler, innocent-caregiver, ruler-innocent, innocent-creator, lover-innocent, jester-hero, regular-guy-caregiver, lover-creator, sage-outlaw | frontmatter `status: flagged` → `status: draft`; replace the `flag:` line with `accepted: balance by structure (Robin 2026-10-06, D2/D3/D4); reason in Checks`; Open items: the FLAG bullet becomes "**Resolved (Robin 2026-10-06, D2):** …" keeping the reasoning. |
| explorer-ruler | same status/flag treatment: "Robin accepted the round-6 sign-offs (2026-10-06, D10)". |
| jester-ruler | name → ***Don't Look at Me*** (Robin D5). Everywhere the name appears (H1, `name`, Names considered: record "Robin's pick 2026-10-06 (D5): *Don't Look at Me*", image brief if it names it, closing references). Status → draft, flag line removed (name split resolved). |
| innocent-ruler, sage-regular-guy | name stays (*Whole World*, *Whatever They Call It*), now Robin's pick (D5): record it in Names considered; status → draft; flag line removed. |
| sage-innocent | name → ***Nothing Escaped You*** (D5), everywhere, recorded as Robin's pick. Its balance flag: the spec now reads freeform; the flag comes off as "accepted by structure (D2)". Status → draft. |
| jester-hero | also D6: apply **all of section 1** of `hester-2026-10-06.md` in the pour file and `work/jester-hero/historian-anchors.md` (y1 sentence, anchors story row, guard row, the new Fact audit row, Open items bullet, Checks Language row, Sources). The fact card is already corrected (by the coordinator). Use her clause as written ("the two"), not the variant that names Texas twice. |
| ruler-sage | D8: malt stays; apply section 2 of `hester-2026-10-06.md` (the Checks Allergens clause, the anchors "fallback only" row, and the fallback y4 in `work/ruler-sage/psychologist-alternatives.md`); add her "if the fallback is ever switched in" list to Open items. |
| sage-outlaw | D4: yours 4 → Hester's recommended wording, "as a nod to the way he kept saying it" (section 3 of her file). |
| regular-guy-caregiver | D7: Wren's cash-machine risk note becomes "Robin 2026-10-06 (D7): keep." |
| outlaw-ruler | D8: quince paste stays (a may-contain label counts); Open item resolved. |
| magician-jester | D8: leave both cacao rows; Open item: "Robin 2026-10-06 (D8): Tomás to align both to the makers' labels; until then unchanged." |
| hero-innocent | D8: on the beef-broth recipe row note, add "made with beef: not for vegetarians". |
| lover-caregiver | yours 4 "a spoonful and a half" → "a teaspoon and a half". |
| explorer-creator | D11: tagline → "You don't mind losing a weekend if nobody loses ten minutes again." (Robin's yes) and the companion whoYouAre ¶1 fix from `reviews/explorer.md`. Record Robin's yes. |
| creator-ruler | D14: the creator review's ¶1 fix. Leave ruler-creator's ¶1 alone. |
| the five close pairs in `reviews/_corpus.md` (*I'll Tell You Later*/*Only Half Joking*, *Hold the Shark*/*The Wink*, *By Design*/*Up Close*, *Already There*/*Plain to See*, *The Big Words*/*Wide Open*) | apply the one-sentence fix in the pour the corpus review names |

**2. Routine P1s** (Robin: "Apply the routine P1s"): the queue's Q002–Q006 and Q008 in your families, verbatim. (Q001 is Robin's own sentence: leave it. Q007 is in the rework room.)

**3. Queue items for your pours.** Apply every `routine` item (P1–P3). Apply `Robin`-kind items on **Wren's ground** that improve voice or clarity without changing a story, drink, fact, name or tagline (Robin trusts the taste judgement). **Skip** and list as "left for Robin": any tagline change (except *For Good*), anything that changes a recipe's ingredients or amounts, a story or a historical claim, and anything a review marked "Hester to verify" or "Tomás to check".

**4. Variety pass (D13).** Apply the six rules in `STUDIO-RULES.md` › "Variety across the collection", choosing the weakest instances first, until each **family of 11** is within: the strict "X doesn't scare/frighten you. Y does." frame in at most 1 pour, the fear turn in any form in at most 2; "Here's what that gives / it deserves to be said / someone should tell you" in at most 3; a rarity stamp ("rare", "Very few people", "no small thing", "Hardly anyone") in at most 2; "I like to think" as the first words of yours 3 in at most 3; proposals opening on "So" in at most 4, and no "So here's my…" preamble; "I hope…" as the reading's last sentence in at most 1; "Next time" in a closing line in at most 1. Use the corpus review's before/after examples where they exist. Make the smallest edit that works; never move a factual claim out of its "I like to think" signpost.

## What never changes

- **Robin's words.** Every "after" text in `_studio/robin-edits.md` is his: never alter, trim or move those sentences, even for a variety rule (if a rule hits one, count it and leave it). The same goes for any line he picked (accepted names and taglines).
- **Approved pours** (creator-hero, innocent-regular-guy, magician-outlaw, sage-lover): only the decision items above. No queue polish, no variety pass.
- No new facts. No new gendered language about the guest. No bare "yours" for the drink. "The cocktail I've made for you" stays. History stays at most half the reading. Specs, recipe amounts and ingredients don't change (if a fix would need that, skip it and report it).
- Status never becomes `approved`.

## For every pour you change

1. Edit the pour file carefully (exact replacements; keep the markdown shape the review desk parses: `- **name:**`, `**recipe**` table, `**method**`, `## Reading`, `**epigraph**`, `**whoYouAre**`, `**yours**`, `**closingLine**`).
2. `python3 skills/dps-tools/scripts/lint_pour.py <pairing>` → 0 errors (fix your own edit if not; warnings you introduce get a one-line reason in your report).
3. At the top of the room record `_studio/rooms/<pairing>.md`, right after its `# ` heading line, add:
   ```
   ## Collection review edits, 2026-10-06 (editor)
   - **Robin's decisions applied:** D… (one line each)
   - **Edits** (before → after, short): field: "…" → "…"
   - **Left for Robin:** … (or none)
   ```
4. Log it in your report `_studio/collection-review-2026-10-06/applied/<family>.md`: one row per pour (pairing · decisions · queue items applied (Q ids) · variety edits · skipped and why · lint), then the family's counts against the variety targets (before → after).

Work family by family; write each family's report before starting the next. Return one line: families done, pours changed, items applied, items left for Robin, lint status.
