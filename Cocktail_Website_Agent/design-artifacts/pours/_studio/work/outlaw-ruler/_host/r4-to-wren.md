**Host, round 4 of 5: audit and fixes.** Wren kept the quince and kept "his own, he kept small" as one clause, with the sale line as the turn. "Wheel" is gone because *Who's In?* owns it. Reading v1 is at `work/outlaw-ruler/psychologist-reading-v1.md`.

Three crossings are open:
1. **Tomás:** write spec v1 for the quince build (45 rye, 22.5 Cointreau, 22.5 lemon, 15 loosened paste, no added water), run the four checks, and name the shared row you add. Then correct y4's drink words against the spec ("a little quince paste", "strained into a chilled stemmed coupe"). Run the 45% substitute you said you'd run, and check a shop membrillo's ingredients for anything that needs a veto. Write the image brief.
2. **Hester:** audit reading v1 and spec v1 claim by claim, starting with Wren's four least-sure claims: F8 "admitted it wasn't good", the "first drops of a tsunami" card, "Others opened the breweries that followed", and F17 "aged longer". Keep the resonance test and history-under-half in view, since it's 48% of yours.
3. **Wren's open question to you both:** does y5 ("choose one part, steer it properly, let the rest run") sit too close to *Who's In?*'s "leave it to them, follow wherever it goes"? Each of you, give a yes or no and a reason.

Fixes go in place. Round 5 is sign-offs only.

---
Tomás's and Hester's round-4 turns, verbatim:

🍸 **Tomás:** Wren, Hester, spec v1 is written, and it lands with nothing added. One fact costs us, and I'm saying it first: the quince puts the pour at `nuts`.

**The spec** is in `_studio/specs/outlaw-ruler.json`, with the draft in `_studio/work/outlaw-ruler/mixologist-draft.md`. It's 45 ml Old Potrero Straight Rye (48.5%), 22.5 ml Cointreau, 22.5 ml lemon and 15 ml loosened quince paste, shaken, strained twice into a chilled coupe of about 200 ml, with an orange peel squeezed over the top.

**The four checks:**
- **Structure.** It's the Sidecar family, built on the Codex's classic (printed p. 151: 1½ oz cognac, 1 oz Cointreau, ¾ oz lemon). Mine, and owned as mine: rye for the cognac, the Cointreau cut to ¾ oz, the quince, and the fine sieve. The Codex's own root recipe adds "a tiny amount of simple syrup" because the classic is "a bit dry for most people" (printed p. 155). The quince takes that seat.
- **Balance** (balance.py, shaken): 18.6% strength, 6.32 g sugar per 100 ml, 0.841% acid, dilution 57.9%. Every reading is in range, initial and finished.
- **Pairings.** *Flavor Matrix* pdf 196 lists citrus and bourbon among quince's best pairings. The page names bourbon, not rye, so the rye pairing is my craft call.
- **Allergens:** see below.

**Sweeps.** Every variant is in range unless marked.
- **Today's bottles:** Toasted Barrel (51.2%) gives 19.2%, and Straight Rye (48.5%) is the spec.
- **Substitute rye:** 45% gives 17.8%, 43% gives 17.3%, 40% gives 16.6%. At 55% it goes to the edge (20.1%). So the substitute note says "any straight rye of 40-51%".
- **Quince sugar** from 25 to 35 g per 100 ml: 5.84–6.83 g, at either strength.
- **Quince acid** from 0 to 1%: 0.809–0.905%.
- **Quince dose** from 12.5 to 17.5 ml: in range. At 51.2% with 12.5 ml it's 19.6%, just under the 19.7% top.

**Two shared rows added**, both through `add_ingredient.py`, which takes the studio's lock:
- `old_potrero_rye`: 48.5%, veto-free. The ABVs are from oldpotrero.com (your read, Hester); "100 percent malted rye" is Oxford pdf 103.
- `quince_paste_loosened`: 30 g sugar and 0.3% acid per 100 ml, both unsourced, classed `nuts`.

**The membrillo check, and why it's `nuts`.** I can't read a shop label from here, and labels are yours, Hester. What I know (my own knowledge, unsourced): the same paste is sold with walnuts mixed in (membrillo con nueces), and it's packed and served alongside nuts. That's the same call I made for dried fruit (`apricot_steeped_rye`). When in doubt, it counts. So this is an edge for Robin: the pour leaves the veto-free floor, as *Whoopee* and *With the Bite In* already have. The recipe note gives the guest an action: "plain membrillo (just quince and sugar); check the pack for a nut warning".

There's a proven veto-free fallback Robin can switch to without a room: 7.5 ml syrup plus 10 ml cold water in place of the quince. It gives 18.2% at 48.5% and 18.8% at 51.2%, in range, and only y4's quince clause would go. Hester, if you find a page showing a plain membrillo that's certified nut-free and made away from nuts, I'll look at the class again. I won't lower it on anything less.

**y4's drink words, Wren:**
- "a little quince paste" is right: one tablespoon of loosened paste is about 7 g of paste.
- "In place of sugar syrup" suggests the classic contains syrup, and the Codex's classic doesn't. Use "Instead of a spoon of sugar syrup, I add a little quince paste, loosened with hot water."
- "strained into a chilled stemmed coupe" should become "strained twice, the second time through a fine sieve, into a chilled coupe". The sieve catches bits of paste, and a coupe already has a stem.
- "perfumed" is on the page (pdf 196: "a strong perfume"). "Mouth-puckering" is a fair plain word for "astringent". "Deep" isn't on the page, so drop it or own it as mine.
- "The renowned classic of brandy, orange liqueur and lemon" and "more of it than anything else" both hold.

**Closing line:** *Mash the quince until no lumps are left. Then pick what you'll steer yourself, and let the rest run.* It shares no word with *Before It Had a Name*, and has no 4-gram match in any pour. The image brief is in the draft: a coupe on a workbench in a warehouse corner, the paste beside a raw yellow-green quince, and one impossible reflection. No beer, no wheel, no text.

**y5 against *Who's In?*: no, not too close.** Its act is to hand the whole evening over and follow someone else. Ours keeps one part and lets the rest go, so the person still steers something. But it has a nearer neighbour: *On One Condition* (magician-creator) says "name the one part you'd like to make entirely on your own". "Choose the one part you'll steer" sits beside it, though no 4-gram matches. I'd write "pick what you'll steer yourself", as in the closing line.

Not yet: I need Hester's audit of the spec and her answer on the membrillo label first. The `nuts` edge goes to Robin either way.

📜 **Hester:** Wren, Tomás, audit v1 is at `work/outlaw-ruler/historian-audit-v1.md`. It's a **FAIL for now**, but every fix is wording and none touches the story. The anchors (v2) and the card (F18–F23) were fixed in the same call.

**Wren's four least-sure claims:**
- **"Admitted it wasn't good" passes.** It's his own 2015 line. The sentence it sits in fails, though (A2).
- **"Tsunami" passes, and it's carded as F18.** It's Holbrook's narration in the 2004 *Chronicle*, about the 1970s beers.
- **"Others opened the breweries that followed" passes.** Abate (2010): Sierra Nevada and others followed his lead.
- **"Aged longer" passes.** The first was bottled at one year; today's are six, eight and thirteen.

**Reading fixes (old → new):**
- **A1, epigraph.** No page has small-brewery beer "everywhere" by 1993. And "the rye in this glass" is today's bottle, or a substitute. Mine: *Old Potrero began as a brewer's next idea, once other brewers had followed his lead.* The words are yours to change.
- **A2.** "He liked its beer" is contested: his "brew of choice" in Holbrook 2004, but "rarely drank Anchor" in Ogle 2006, p. 261. → "Its beer, he admitted later, wasn't good: a lot of the time it was sort of sour."
- **A5.** "It caught on … everywhere": his own beer barely left the Bay for years. → "What he'd started caught on…"
- **A7.** The secret was the work, kept from his staff, not a corner nobody knew. And "made rye" in 1993 dates the rye. → "And in 1993 he set up stills in a corner of the brewery to make rye whiskey, a secret from all but a few of his staff."
- **A9.** There were two buyers. → "whatever the new boss said" (Keith Greggor was the CEO).
- **A11.** Date it: "…when I last read about it, in the autumn of 2026, it hadn't poured a drop."
- **A12.** Oxford pdf 2165 says a *wave of new small-distillery ryes* began with his, not the whole revival. → "a wave of new small-distillery ryes the same book says began with his".
- **A15 and A16:** Tomás's syrup and sieve wordings.
- **A18:** "deep" isn't on pdf 196. Drop it, or own it as your taste.

History is about 41% of the reading, and every fix is the same length or shorter.

**Tomás, the spec:**
- **S1.** The Matrix "Best Pairings" belong to the whole apple/pear/quince entry, not to quince. That's family versus member again.
- **S2.** Both labels I read list lemon. → "plain membrillo (quince, sugar and lemon, with no nuts in the ingredients)".
- **S3, the label check (lean):** **`nuts` holds.** Ponce de León's paste is just quince 52%, sugar and lemon, yet it carries "May Contain: Tree Nuts" (GFI Foods listing). Mitica's listing says "None", but a distributor's listing isn't a nut-free certificate. The edge goes to Robin, with your syrup fallback.
- **S5.** Say "today's *core* bottlings are six years old".
- Your Codex p. 151 and p. 155 quotes check out on the page.
- Image: Holbrook puts the stills "behind a roll-top door". Brick is on no page, so treat it as imagery only.

**y5:**
- ***Who's In?*: no.** Theirs hands the whole night over for one evening; ours keeps one part and lets the rest go. One echo to cut: "keep your hands on all of it" → "hold on to all of it".
- ***On One Condition*: yes, it's close** ("the one part"). I'd take Tomás's "pick what you'll steer yourself".

**The resonance test passes.** The microscope, the secret stills and the turn ("whatever the new boss said") are this person's. The fear is said and it isn't the end, and the ask gives something back.

Not yet: I need A1, A2, A5, A7, A9, A11, A12, A15, A16, A18, S1, S2 and S5 in the files. Once I've grepped them there, I'd put my name to this.
