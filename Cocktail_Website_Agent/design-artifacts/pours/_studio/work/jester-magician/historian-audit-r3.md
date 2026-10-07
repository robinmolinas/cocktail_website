# Fact audit r3: jester-magician · Hester

Audited as they stand at round 3: `mixologist-draft.md` (drink v1), `_studio/specs/jester-magician.json`, Tomás's r2 turn. Wren's reading v1 doesn't exist yet, so I'll audit it in round 4, step 2. Every page below was opened in this call.

## Tomás's ask: apple brandy strength and colour

| # | Finding | Source |
|---|---|---|
| T1 | **Strength, sourced for American bottles only:** Laird's straight apple brandy is 100 proof (50%); Laird's 12-Year is 88 proof (44%). US bonded spirits are bottled at 100 proof. | *Codex* pp. 160–161; Oxford BOTTLED IN BOND pdf 325 |
| T2 | **Calvados's strength isn't on any library page.** Neither Oxford's CALVADOS (pdf 389–390), *Joy* (pdf 418) nor the *Codex* (p. 160) gives one. A legal 40% minimum would be from memory, so I haven't read it. So "40%" stays unsourced, and you can't have a sourced "40% or stronger". What is sourced: "American straight apple brandies run 44–50%" (T1). | as named |
| T3 | **Applejack isn't the same as apple brandy:** by US law it's "a blend of apple brandy and neutral grain spirits" (*Codex* p. 160). A guest told "American apple brandy" could easily pick up a bottle of applejack. (It's a distilled grain spirit, so it's not `gluten`.) | *Codex* pp. 160–161 |
| T4 | **Colour:** the spirit comes off the still clear and darkens in oak. Calvados must spend at least two years in barrel (Oxford pdf 390; *Codex* p. 160, "at least two years"). The only colour word on a page is Laird's 12-Year, "deep amber" (*Codex* p. 161). Unaged apple spirit is "limpid as the purest water" (*Jersey City News* 1892, via Oxford APPLEJACK pdf 128). So for the image you can say "an oak-aged, amber-toned spirit". The pale gold after the soda stays your estimate. | as named |
| T5 | Optional, for the image's apple: Oxford gives "green apple and fresh pear" as the aroma of calvados up to ten years old. | Oxford pdf 390 |

## Drink v1: findings (IDs, old → new)

| ID | Where | Finding | Old → new |
|---|---|---|---|
| D1 | Recipe, dry vermouth note | *LI* p. 155 says vermouth in a **diluted** cocktail is "horribly unstable". It doesn't say undiluted vermouth holds. | "kept cold and undiluted, it holds" → "kept cold and undiluted, it keeps longer" |
| D2 | Method step 2 | Arnold's cause is "the oxygen in the headspace", and his scope is a watered-down bottled cocktail, changing "within a few hours". "Goes stale" names a cause and a time the page doesn't give. | "watered-down vermouth goes stale within hours." → "vermouth in a watered-down cocktail changes within a few hours." |
| D3 | Keeping row | **Counterweight, said openly.** Arnold's cause, headspace air, applies to our bottle too, and the air grows with every 70 ml poured. The *Codex* p. 246 you cite calls vermouth "very fragile; once opened they will quickly oxidize" (the "within a week" there is for fino). The *Codex* p. 289's "up to 3 months" is for chamomile-infused vermouth funnelled back into its own bottle. "About a month" is already labelled as your call: keep the label, and add that the bottle loses freshness as it empties. | Add after "unsourced": "; the headspace grows with every pour (*LI* p. 155's cause), so it's freshest while the bottle is full." |
| D4 | closingLine | "still there next month" makes the guest a promise that rests on D3's unsourced month. I'm flagging it, not blocking it, because the Checks label it. If you'd rather not lean on the month: | "Then make one surprise that's still there next month." → "Then make one surprise that's still there next week." (your call) |
| D5 | Structure row | The Calvados and Tonic is Tyson Buhler's, in the *Codex*'s "Friends and Family" section. Its mixer is tonic, not soda, and his words are "may sound surprising". | "Calvados with a mixer is the *Codex*'s own, Buhler's Calvados and Tonic, p. 220, which calls the pairing "surprising"" → "Calvados with a mixer is in the *Codex*: Tyson Buhler's Calvados and Tonic (p. 220), a combination he says "may sound surprising"" |
| D6 | Recipe, apple brandy line (and the JSON note if it carries it) | T2 and T3. | "(Calvados or an American apple brandy, 40-50%)" → "(Calvados, or an American straight apple brandy, not applejack, 40-50%)", with Checks: "40% is unsourced; American straight apple brandies are 44–50% (*Codex* pp. 160–161)" |
| D7 | Sibling watch | *Fine by Me* is a highball at the same bar, and its lengthener is **dry cider, 135 ml** (spec `explorer-outlaw.json`). So both carry apple. Saying "ingredients … all differ" is too strong. | "Base, glass, ingredients and gesture all differ" → "Base, glass and gesture differ; both carry apple (its dry cider, my apple brandy)" |
| D8 | Image brief, the shadow | PDT's booth (Oxford pdf 1855, the photo) is a narrow wooden booth with **two tall glass-panelled folding doors**, shown closed. "Door standing ajar" also leans on Wren's trap 1 (getting in). | "the shape of an old-fashioned phone booth with its door standing ajar" → "the shape of a narrow wooden phone booth with tall folding doors, closed" |
| D9 | Image brief, the drink's shade | T4. | "the shade is my estimate, unsourced, until Hester gives the bottles' colours" → "apple brandy is oak-aged and amber-toned (Oxford pdf 390; *Codex* pp. 160–161); the pale gold after soda is my estimate" |
| D10 | Tomás's r2 turn (not the draft) | "A 37% bottle in a family fridge has to be labelled anyway" sounds like a rule, and I can't find a source for it. Keep it out of the reading and the Checks. | none (dossier note) |

## Checked and passing
- *LI* p. 155: the quotation "vermouth in a diluted cocktail is horribly unstable" is exact. *Codex* p. 230: lower-proof ingredients (vermouth) are refrigerated, not frozen. *Codex* p. 289: "up to 3 months" is there (scoped in D3). *Codex* p. 40: Alex Day's Calvados-chamomile toddy, so chamomile was rightly left alone.
- *Flavor Matrix* pdf 196 (Pome Fruit): best pairings include citrus, wine and brandy; the surprising pairings are basil, crab, sage, olive and peas. Exact.
- "First apple-brandy **base** in the registry" is true. Two pours use it only as a modifier: *The Alchemist* (5 ml calvados) and regular-guy-hero (15 ml apple brandy).
- Sibling motifs: *For Good*'s closing line is "Make it a day ahead…" (exact); *Brought Home* has "name on the bottle" (exact); *Rent-Free*'s bay leaf stays in its wine bottle overnight. None of them collides with v1's wording.
- No veto claim to dispute: there's no named bottle, so wine fining is ignored (rule 4).
- I didn't recompute the balance numbers (balance.py is the instrument). They aren't facts for the reading.

## Reading v1 (`psychologist-reading-v1.md`, read after the drink audit, same round)

| ID | Where | Finding | Old → new |
|---|---|---|---|
| R1 | y2 | **Wrong fact.** Freeman said the bacon-fat-in-bourbon idea "was born" at WD-50, not at this bar (*Proper* p. 231; card `don-lee-bentons-old-fashioned.md` F11). At this bar it became the best-known and best-selling drink (p. 275, F15). "Bacon-washed" also skips the method's real name. | "It's the same bar where someone else's bacon-washed bourbon was born, but that's another story." → "It's the same bar where someone else's bourbon, washed with bacon fat, became the best-seller, but that's another story." |
| R2 | y3 | "No sign" is a fact about the booth, and it rests on one photo (Oxford pdf 1855). The "I like to think" two sentences earlier doesn't carry to it. My anchors said "unmarked by any sign", which was my shorthand; now fixed. | "No sign, no wink, just a phone booth in a hot-dog shop" → "No wink, just a phone booth in a hot-dog shop" |
| R3 | y3 | "with nobody there to watch it land": a working bar always has someone there. The claim the page supports is that the maker isn't needed (F10), so the sentence should say that. | "with nobody there to watch it land" → "without him there to watch it land" |
| R4 | y4 | "for about a month" states the keeping time in the guest's text, and that time is Tomás's unsourced call (D3). The method carries it. | "mixed in a bottle that waits, labelled, in the fridge, for about a month." → "mixed in a bottle that waits, labelled, in the fridge." |
| R5 | y4 | "like the best sparkling cider": *Fine by Me*, set at the same bar, is lengthened with dry cider (D7). This comparison puts that sibling's ingredient into our glass in the guest's mind. It's a taste comparison, so it isn't false, but it fails the swap test. | "dry and bright, apple first, like the best sparkling cider." → "dry and bright, apple first." (or another comparison that isn't cider: Tomás's call) |
| R6 | y1 | Passes: "rough-and-tumble" is Simonson's 3-word adjective for the shop (p. 270), an allowed paraphrase length. The idea is "his idea" (F5). The booth is at the back (Oxford pdf 1854, 521). *Get Smart* uses my safe wording (G1–G4). "1960s" covers a 1965–70 run that began in the 1960s. | none |
| R7 | y2 | Passes: 2007 (three sources). "More than a decade later … still its door" is dated by Oxford © 2022. "Arguably" is given as one writer's. | none |
| R8 | tagline / whoYouAre | Not a fact problem, flagged for Wren: "Everyone calls it trouble" is in both. "Teatime" appears three times, and y3's "put back by teatime" and y5's "put right by teatime" are near twins. I'd keep two. Your words, your call. | none |

The Notes table follows the audit: if R1 lands, its y2 row should cite *Proper* p. 275 / F15 (best-seller), not p. 271. The y3 "no sign" row goes if R2 lands.
