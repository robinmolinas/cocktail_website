# Decision pack for Robin: cocktail collection, 6 October 2026

These are the open questions from the twelve batch summaries, checked against today's files. I found no decision of yours made after the summaries apart from your tagline marks on the Explorer rows. Each card gives the question, why it's open, an excerpt, which pours it touches, two options and my recommendation. Answer with the card number and a letter, e.g. "D1 B, D2 A, D5 as recommended".

**Where things stand.** 132 pours authored: 4 approved (*Down the Line*, *Four Shares*, *No Accident*, *A Brother's Care*), 112 draft, 16 flagged. All 132 lint with 0 errors. Draft means authored, not settled. No pour, spec or rule has been changed by this review.

---

## D1 · Allergens: what evidence makes an ingredient "nuts"? (affects an approved pour and the safety floor)

**Why it's open.** Three shared rows were moved to `nuts` from inside other rooms, on evidence of very different strength:

| row | evidence on file | pours it moves |
| --- | --- | --- |
| Peychaud's | Oxford's tasting description, "anise, nutmeg, and clove **notes**", from a secret recipe | ***No Accident* (approved)**, *Anyway*, *Their Night*, *Had to Be Serious*, *One Table* (already nuts) |
| Coca-Cola | nutmeg oil in two published **historical** 7X formulas, which the maker denies | *The Way It Felt*, *With the Bite In* |
| Underberg | secret recipe, no botanical list read | *No Promises* |
| Bénédictine | Oxford **lists nutmeg among its 27 plants** | *Anyone Would Have*, *One Table* |

Meanwhile Angostura, also a secret recipe, is unclassed and sits in dozens of pours. **Consequence today:** by the live tool, only **2 approved pours are veto-free**, under the AD-4 floor of 3. `menu-assessment.md` still says "Floor met", and four pour files still say veto-free while the tool says nuts (*No Accident*, *Anyway*, *Their Night*, *The Way It Felt*).

- **A. Keep every safe-side call.** I update the four files to `nuts`, and you approve one more veto-free pour to restore the floor.
- **B. A row is `nuts` only on a stated ingredient** (a published ingredient list, the maker's declaration, a "may contain" label on the recommended bottle, or a book that names the ingredient), never on a tasting note, a rumoured historical formula or "secret recipe" alone. Peychaud's, cola and Underberg go back to none; Bénédictine, maraschino and kirsch stay nuts. Your nutmeg rule is unchanged.

**Recommendation: B.** It's the same test Angostura already passes, and it keeps *No Accident* as approved. A recipe note can still say "proprietary recipe" where a guest might want to check.

## D2 · Balance: judge drinks by their real structure (12 of the 16 flags)

**Why it's open.** `balance.py` holds every drink to Arnold's ranges for the nearest style, so whole classes of honest drinks read OUT by construction. I re-ran all twelve:

| structure | pours | what reads OUT |
| --- | --- | --- |
| spirit-only stirred (no vermouth, no citrus) | *Nothing to It*, *Where You Stand* | acid (floor assumes vermouth) |
| bone-dry Martini | *One Line*, *Whole World* | sugar |
| wine-core stirred | *Night Light*, *Say So* | strength, acid, dilution |
| long, low-strength wine highball | *The Way It Felt* (6.5%) | strength |
| Flip or nog, no citrus | *Wide Open*, *The Wink* | acid only. The tool's `flip` style borrows Arnold's egg-white **sour** ranges; *Wide Open* is in range on strength and sugar |
| shaken espresso | *Whoever Comes In* | acid |

- **A. Accept these ten "by structure".** The flag comes off each and the reason stays in Checks. Tomás's open rule candidates become tool changes: a stirred-spirit style; a wine-core note; a flip/nog style with no acid floor.
- **B. Keep each as an individual flag** for you to rule on pour by pour.

**Recommendation: A.** None of the ten is a badly balanced drink; each is a recognised form the tool doesn't model. The two OUT pours that are genuine choices are D3 and D4.

## D3 · *In Your Own Hand* (lover-creator): ship Murphy's handwritten measures?

**Why.** It's 7.3% ABV with 1.42% acid, the lightest and sharpest pour in the studio. Tomás proved that no build in range keeps all five of Murphy's measures.

> "The cocktail I've made for you keeps every one of his measures, and his sugar on the rim… It's light, bright and properly sharp, four fresh juices and a little gin, and it fills two small glasses." (yours 4)

- **A. Ship as written.** It's lemonade-level sharp with a sour's sugar-to-acid ratio (7.7), in two small glasses.
- **B. Move one measure** (e.g. 1½ oz gin). It comes into range, and y4 loses "every one of his measures".

**Recommendation: A.** The Muse's fear is being loved as an idea; keeping his hand is the point.

## D4 · *On the Record* (sage-outlaw): a port drink with no spirit

**Why.** Ruby, then tawny at twice the measure, with cold black tea: 10.8%, too acidic for stirred, and the port sugar is unsourced (at the sweet end it goes OUT on sugar too). Tomás offers his own lever: dry vermouth instead of the tea, moving it toward *Night Light*'s shape. Hester's unapplied fix is also here ("as a nod to his second telling" → "as a nod to his telling it again", because the reading gives three tellings).

- **A. Accept by structure** (as D2) and apply Hester's wording fix.
- **B. Rework the drink**: a short room for Tomás, swapping the tea for dry vermouth, with y4 rewritten to match.

**Recommendation: A**, plus Hester's fix. The tea is what makes it *this* person's drink, and it's no worse balanced than a Bamboo.

## D5 · Four names split 1–1–1

The rulebook says a name resonates with the person, not just the story. In three rooms, two voices wrote that they could take the same name:

| pour | options | could-take | recommendation |
| --- | --- | --- | --- |
| jester-ruler (The Straight Man), rye Rickey | *Somewhere to Land* (Wren) · *Dry Wit* (Tomás) · *Don't Look at Me* (Hester) | Wren and Tomás could take *Don't Look at Me* | ***Don't Look at Me*.** It's the guest's own deadpan, and it plays against the proposal ("let them catch you laughing") |
| innocent-ruler (The Little Prince), thrown Martini | *Whole World* (Wren) · *All Right Today* (Tomás) · *The Second Sip* (Hester) | Tomás and Hester could take *Whole World* | ***Whole World*** (*All Right Today* spends the reading's best line; *The Second Sip* repeats the closing line) |
| sage-regular-guy (The Dude), tequila highball | *Whatever They Call It* (Wren) · *Small and Real* (Tomás) · *What Stayed* (Hester) | Tomás and Hester could take *Whatever They Call It* | ***Whatever They Call It*** |
| sage-innocent (The Prodigy), verjus Sidecar | *Are You Quite Sure?* (Wren) · *Nothing Escaped You* (Tomás) · *Before Your Eyes* (Hester) | Wren and Tomás could take *Before Your Eyes* | ***Nothing Escaped You*.** *Before Your Eyes* names the story's demonstration and sits beside its sibling *Plain to See*; *Are You Quite Sure?* reads as doubting the guest. Your other choice is *Before Your Eyes* |

- **A.** Take the four recommendations.
- **B.** Pick differently per row.

## D6 · *The Wink* (jester-hero): the setting under the story

**Why.** The eggnog was made by Texian prisoners at Perote in 1843 for the **San Jacinto anniversary**. They were a raiding force taken at Mier; seventeen had been shot at Salado four weeks earlier, and their toasts included an ethnic insult. The reading names none of this:

> "For a date that mattered to them, they got hold of mezcal, eggs, donkey's milk and a loaf of sugar…" · "…was told it was how the prisoners kept their saints' days at home"

- **A. Keep it, with one plain clause** naming who they were (e.g. "Texans taken on a raid into Mexico", for Hester to word). The story stays the owl and the nerve, but it no longer reads as innocent captives.
- **B. Replace the story** in a short rework room (the drink can stay).

**Recommendation: A.** The guest would find the context in one search. Owning it in a clause is the rulebook's own way with awkward facts.

> **Correction (Hester, after Robin chose A, 2026-10-06):** the framing above, and the example clause "Texans taken on a raid into Mexico", came from an error on her fact card. The room held two groups: about fifty Bexar men taken when Woll's army seized San Antonio (Trimble, the owl, among them) and sixteen Mier men from the Texan raid on Mier. The clause applied is hers: "men taken in the raids the two had been making on each other the year before". Robin's decision (one plain clause, no side) is unchanged. Card C5 is corrected.

## D7 · *Whoever Comes In* (regular-guy-caregiver): the cash-machine image

> "The person sitting by the cash machine with a paper cup, the one talking to nobody on the bus, the tourist turning the map round for the third time."

Wren flagged that it reads, gently, as someone sleeping rough.

- **A. Keep it.** It's the most recognisable case of the persona's gift (eyes that stop), it's respectful, and it sits in a list with two milder cases.
- **B. Soften it** to "the person selling the street paper".

**Recommendation: A.**

## D8 · Smaller allergen and content calls (each one has a written fallback)

| pour | question | recommendation |
| --- | --- | --- |
| *Before It Had a Name* (outlaw-ruler) | Quince paste carries "May contain: tree nuts". Keep it (nuts), or use the proved syrup fallback (veto-free; y4 already written)? | Keep the paste: under D1 B a may-contain label counts |
| *Either Way* (ruler-sage) | Barley malt syrup is gluten. It's the one ingredient that puts the 1908 definition in the glass. Keep it, or use the saffron/honey fallback? | Keep the malt (gluten is an existing veto); have Hester audit the fallback's y4 anyway |
| *Built to Hold* (magician-ruler) | Batavia arrack is classed nuts for palm sap that Oxford says left the formula | Rule on it under D1: "none" if B |
| *Even When You Know* (magician-jester) | `creme_de_cacao_white` = none, but the cacao-nib tincture = nuts + dairy; the two can't both be right | Align both to the maker's labels (Tomás); until then keep the safer one |
| *There It Goes* (innocent-jester) | Amaro Nonino = spice, from an unread search summary listing galangal | Under D1 B, back to none until a page is read |
| *Work It Out* (hero-innocent) | A beef-broth Bullshot, veto-free but not vegetarian | A one-line recipe note, "made with beef broth", with no new veto |

## D9 · Rules already in your words but not yet in STUDIO-RULES

Your instructions are on record in `rule-candidates.md` but were never written into the rulebook: **a drink category is never "taken"** (09-28); **no spark is fine, but the drink must still be interesting from the books** (09-30); **mild words in real drink names are fine** (09-30); **no new vetoes** for celery, sulphites, quinine, caffeine or wheat glucose (09-30). Tomás's **honey/agave in hot drinks** rule (top half of `hot`; EDGE justified above 7.5 g) awaits your yes.

- **A.** I write all five into STUDIO-RULES in its style, quoting you, and show you the lines.
- **B.** Leave them in the candidates file.

**Recommendation: A** (the first four are already your decisions).

## D10 · Process and data

- ***Far Enough* (explorer-ruler)** ran 6 rounds against a cap of 5 (host error). All three signed after the last change and nothing is in dispute. **Recommend: accept the sign-offs.**
- **Two copies of the studio tools.** The live ingredient table is the workspace's `skills/dps-tools/data/ingredients.json` (345 rows). The copy inside the Dionysus repo (`Dionysus/skills/dps-tools/`, which `AGENTS.md` points to and which gets pushed) has 116 rows and fails 104 of the 132 specs. The catalogue import will need the live one. **Recommend: copy root → repo once, one way, and note in `AGENTS.md` which is canonical.** This is outside the pours folder, so I'll wait for your yes.

## D11 · Taglines: reading your marks, and the calibration batch

Your marks on the 2 October review (Explorer rows):

| pour | your mark | I read it as |
| --- | --- | --- |
| *For Good* | yes | Use "You don't mind losing a weekend if nobody loses ten minutes again." |
| *Left Standing*, *Nothing to It*, *In a Minute*, *Why Not?*, *Fine by Me* | no | Keep the current line |
| *Straight Back*, *Just Knew* | retry | New candidates in the calibration batch |
| *Brought Home* | "too specific to the story, not the persona" | Retry, built on behaviour, not the anecdote |

**Please confirm that "no" means keep the current line.** Taken across all 132, the current lines are 99 two-sentence taglines, 67 opening with "You" and 32 opening with a mass word (Everyone/Nobody/People). Your "no"s are right line by line, so the fix is to vary the *other* lines, not to replace these.

**The calibration batch is ready: [`calibration-batch.md`](calibration-batch.md).** Wren wrote eight pours (your three retries plus five failure types), each with option A (a trade-off, in the register of your *For Good* yes) and option B (a different cadence: a question, a very short line). She turned down every reviewer candidate, mostly because they swapped the formula for a domestic prop ("a first-aid kit in the car"). Mark it yes/no/retry like the 2 October file, and answer her four register questions. Nothing goes collection-wide until you have. *For Good*'s accepted line waits for one companion fix: whoYouAre ¶1 opens with the same idea (queue item, Wren's ground).

## D12 · Two pours serve a whiskey Rickey

*Somewhere to Land* (jester-ruler: rye, half a lime with its shell in, Apollinaris, three cubes) and *Word Gets Round* (regular-guy-ruler: bourbon, 15 ml lime or lemon by taste, soda, crushed ice). Both say "The cocktail I've made for you is a Rickey", and both methods end "No sugar, and nothing on top." The jester room owned the neighbour and argued five differences. The corpus reviewer reads it as the one pair under your "only the exact same cocktail is off-limits" rule.

- **A. Both stay**, with the duplicated method line reworded in one of them.
- **B. *Word Gets Round* gets a new drink** in a short Tomás room. Its story is Heugel's packer's cases (the price of limes), not the Rickey, so the story can stay.

**Recommendation: B.** A guest is told "a Rickey" both times, and the rule's spirit is the drink the guest receives. *Word Gets Round* also has a P1 to fix anyway: "the official cocktail of Washington, DC" is on Hester's fenced list but is in its guest text.

## D13 · The voice engine (collection-wide variety rules)

The corpus review found that no phrase is the problem: the pattern of moves is. About 40 whoYouAre sections turn the fear the same way ("X doesn't scare you. Y does."), about 30 end on a rarity stamp ("Very few people can", "That's rarer than you think"), about 25 announce the kindness before giving it ("Here's what that gives…"), 55 proposals open on "So", 19 readings end "I hope…", and 10 closing lines repeat the proposal as "Next time, …". It proposes six variety rules (V1–V6 in `reviews/_corpus.md`, each with before/after examples from real pours). Every one keeps your existing rules (the kindness is still said once per reading; "I like to think" stays the signature).

- **A. Calibrate first.** Wren applies V1–V6 to the same eight calibration pours, as drafts, for you to read beside the originals.
- **B. Accept V1–V6 now** as rule candidates, and apply them family by family.

**Recommendation: A**, the same order as the taglines.

## D14 · The one interchangeable reversed pair

*Making the Calls* (creator-ruler) and *On Their Behalf* (ruler-creator) open whoYouAre on the same observation (something slightly off, a word on a page). 52 of the 66 reversed pairs read distinct, 13 close, and this one interchangeable. Both family reviews proposed rewriting their own side. **Recommendation:** change only creator-ruler's ¶1 (the creator review's version). The five close pairs that collide on a single sentence each get a one-sentence fix in the queue.

---

**Routine safety and makeability fixes (P1) ready to apply when you say "apply the routine P1s"** (exact text in `revision-queue.md` Q001–Q008; none changes a recipe's numbers):
- *Nothing to It*: method step 3 promises a strength list and stops at a colon. The bands proved in Checks go in.
- *For Good*: steps 3–4 can double the lime (the warm-freezer fix already puts it in the bag).
- *Against My Better Judgement*: the recipe says pear syrup "(below)", and there's nothing below. The quantities from Checks go in.
- *What It Rests On*: Checks says a recipe note warns anyone using bought popcorn (butter, coconut oil), but the note isn't in the recipe.
- *The Wink*: a raw egg, plus mezcal poured into its shell, with no pasteurised-egg line in the recipe (Checks says the draft has one).
- *Is It Just Me*: "dried fruit is often packed alongside nuts" was failed by Hester's audit as an unsourced fact in guest text → "Check the pack for a nut warning."
- *Word Gets Round*: cut "and is now the official cocktail of Washington, DC" (fenced on Hester's card).
- *Serviceable*: your Post-it sentence. Hester passes it with a nuance; it's in a desk note, and your words aren't changed.

**Other routine fixes I'll queue unless you object** (no change of meaning): *Hoping You'd Come* y4 "a spoonful and a half" → "a teaspoon and a half" (matches the recipe's 1½ tsp, avoids a tablespoon reading); *On the Record* Hester's wording fix (if D4 A); the four `contains` lines once D1 is decided; `menu-assessment.md` refresh.

**No action needed, for your information:** *By Design* now uses any white rum of 50% (all seven numbers in range, no bottle named; going back to Bacardi would mean an OUT flag). *Whoopee* sits at a balance edge since `sloe_gin` acid was corrected to Liquid Intelligence's 0%; it's still in range.
