---
pairing: outlaw-jester
personality: The Subverter
status: closed           # open | closed | deadlock | flagged
round: 5               # budget: 5 (pour) · 5 (rework)
started: 2026-10-01
mode: batch            # pour | batch | rework
---

# The room: The Subverter (outlaw-jester)

## Collection review edits, 2026-10-06 (editor)
- **Robin's decisions applied:** D1 (Coca-Cola row ruled none: `contains` → `[]`, `veto_free: true`; Checks › Allergens and the caveat anchor record the ruling; the Open item is marked resolved; `allergens.py` gives `[]`).
- **Edits** (before → after, short): frontmatter/contains: `["nuts"]` → `[]`; whoYouAre ¶2 (Q085, Wren's ground, swap risk with the approved *No Accident*): "The joke isn't a reflex. It's how the true thing gets past the people it's about, because put plainly, it would be stopped." → "The joke isn't a reflex, and it never punches down. It's aimed at whoever's at the head of the table, because that's the one place a plain sentence would be stopped."
- **Left for Robin:** none (tagline unchanged per D11).

## Where things stand
- **Must-haves:** [x] persona read (Wren r1) · [x] story + sourced anchors (Lord Invader, Rum and Coca-Cola (Khan 1947, Baron 1948, Cowley/Folkways); Wren ruled r3) · [x] drink + four checks (spec v1, highball, balanced 12.6% / 6.63 g / 0.49%, contains nuts (cola, safe side)) · [x] reading (v3) · [x] fact audit (Hester PASS, historian-audit-v2.md + B1–B4 re-grepped) · [x] resonance test (Wren: ready on v2 and v3) · [x] names (≥3 + pick) (With the Bite In (all three)) · [x] image brief (Tomás r3, matched r5)
- **Last change to the pour:** r5 (step 3: B1–B4 + y5 lint)
- **Sign-offs (valid only if after the last change):** Wren ✓ r5 · Hester ✓ r5 · Tomás ✓ r5
- **Open objections:** none
- **Robin's notes (rework):** none

## Summary for Robin
- **The persona in one line:** someone whose laugh is aimed up, at the boss, the rule or the money, on purpose. The joke is how a true thing gets past the people it's about. They fear the joke being taken: stopped, or sung back with the point quietly removed (Wren r1).
- **The story chosen:** Lord Invader (Rupert Grant) and "Rum and Coca-Cola", Trinidad, 1943. The song passed the police commissioner's board of censors in Khan's tent. The American comedian Morey Amsterdam heard it while entertaining the troops and took it home. The Andrews Sisters made it a hit, and the first 200,000 records named Amsterdam as composer. In 1947 a New York court found that Lord Invader had written the words. He was paid seven years late and was often short of money even then. He kept joking: *Yankee Dollar* (1946, chorus only) and *Crisis in Arkansas* (c. 1959, the bow-tie joke at Governor Faubus). Sources: *Khan v. Leo Feist* (1947) and *Baron v. Leo Feist* (1948), both primary, via the Caselaw Access Project, plus Cowley's Smithsonian Folkways notes. **Runner-up:** none. The plan's lead was struck.
- **What failed and why:**
  - **H. L. Mencken,** the plan's lead, struck by Wren in r1. The deliberate arrest is *Can't Watch*'s shape, an editor in court is Croswell's, and his posthumous diary punches down, which fails point 5, the ending after the page.
  - **The plan's Planter's Punch** went with him.
  - **"Actual size" and *Down to Size*.** *Down the Line* owns size.
  - **"The lime draws out what the cola was hiding".** *Codex* p. 213 is about colas in general, and Coca-Cola's recipe is secret.
  - ***Joy*'s "seldom held in high regard"** is filed under CUBA LIBRE.
  - **"He sued", "he won", "his song"**: the plaintiff was Khan and the tune was Belasco's.
  - **"Twice the usual"**: there is no single usual.
  - **The closing line swap:** Tomás withdrew his first line over a y5 echo. Wren moved y5 and asked for the line back.
  - **Host slip:** my round-5 plan had Hester audit v2 in parallel. I held her back until v3 existed and said so in the step-2 turn.
- **The "this is me" line:** *It's how the true thing gets past the people it's about, because put plainly, it would be stopped.*
- **Names:** *With the Bite In* (all three by r4). Also considered: *Slipped Past*, *Past the Censors*. *Actual Size* and *Down to Size* were struck.
- **Edges:** **contains nuts, on the safe side.** Tomás reclassified the shared `coca_cola` row in `dps-tools/data/ingredients.json` as `nuts`. Two published historical 7X formulas list nutmeg oil, and Coca-Cola denies they are the formula. **This also changes what the tools report for innocent-creator (*The Way It Felt*), whose file still says veto-free. It was not edited here, so Robin needs to decide.**
  - **Drink:** 60 ml Angostura 1919 rum (recommended; 40% is unread on a label, swept 37.5–43%; about £35–40 a bottle, unsourced), or a column-distilled aged rum, not spiced, about 40%. Add 15 ml lime with the squeezed half dropped in, not muddled, then 120 ml Coca-Cola and 2 dashes of Angostura on top. Tall glass, ice. Highball, balanced at 12.6% / 6.63 g / 0.49%.
  - **Tagline:** *Said straight, they'd stop you. So you make them laugh.*
  - **Closing line:** *Squeeze the lime and drop it in. If they sing it back wrong, write a new one.*
  - **Stale dossier note:** the closing-line note in the dossier says y5 reads "Make the next one". y5 now reads "Come up with another", after a lint-only change in r5. It's a dossier note, not guest text.
- **Rule candidates:** none new. A possible one for Robin: an ingredient row's veto class can change in one room and silently alter a sibling family's shipped pour. Registry could flag pours whose `contains` no longer matches `allergens.py`.

## The room

🕯️ **Host:** The room is open for **outlaw-jester, The Subverter**, in the Outlaw batch. You each got your brief (skill, sanctum, rulebook, registry, persona, this room) in one call. Worked examples: `sage-lover.md`, `magician-outlaw.md`, `innocent-regular-guy.md`. This family so far: `outlaw-caregiver.md` (*In One Piece*, draft), `outlaw-creator.md` (*Asked In*, draft), `outlaw-explorer.md` (*Whoopee*, draft), `outlaw-hero.md` (*Can't Watch*, draft), `outlaw-innocent.md` (*Kept*, draft), `outlaw-regular-guy.md` (*Where You Stand*, flagged). Scratch folder: `_studio/work/outlaw-jester/`. For interest only, from the menu view: Codex families: daiquiri 20, old-fashioned 17, martini 14, highball 12, sidecar 4, flip 1, ? 1. The family plan is `_studio/plans/outlaw.md` (this pairing's row: a starting point, not a verdict). **Five rounds at most.** Round 1 is Wren's alone: she lays out who the person is, in detail. Hester and Tomás join in round 2, and Tomás writes no spec until the story is ruled.
Standing notes from Robin: **a spark, not just the classic** (STUDIO-RULES check 3: use the *Flavor Matrix* to find something original; riff when it adds something to the person). **If no spark fits, the drink must still be interesting:** Tomás uses the cocktail books to make it so, always personalised to the person; a guest shown only a plain classic may feel let down (Robin 2026-09-30); **5 rounds at most** (Robin 2026-10-01; round 1 is Wren's alone); a lint-only fix that changes no fact and nothing in the drink doesn't void the others' sign-offs. Lessons so far: the story has to be in the glass; no drink you perform; check sibling motifs in the registry.
The spark rule (STUDIO-RULES check 3): use the Flavor Matrix to find something original; riff only when the riff adds something to the person.

### Round 1

🪞 **Wren:** Hester, Tomás, this is the Subverter as I read them. The full card is in `_studio/work/outlaw-jester/psychologist-persona-card.md`, and the court pages are saved next to it.

**The one true thing.** Their laugh is aimed up, at the boss, the rule, the sacred cow, the money, and they joke on purpose. The joke is how a true thing gets past the people it's about. Said straight, it would be stopped. Two pours already hold the nearby lines. *Worth the Trip* has "you joke because it is" (serious), and that's comfort for one person. *The Other Berry* has "you meant it, and it stings… taken as only a joke", and that's being misread by accident. So no "only joking" and no "meant it" anywhere in our text. The Subverter chooses the joke as cover.

- **What they hide:** how much they mean it. Once people know, it stops working, and someone stops them.
- **What they fear:** not the telling-off, which only shows it landed. They fear the joke being taken: stopped outright, or sung back by people who never hear what it was about. Powerlessness is the laugh that changes nothing.
- **What they give,** and we say it out loud: when they laugh at the thing in charge, everyone else gets to see it at its real size. A room that has laughed at something together is less afraid of it.

**Siblings and traps.**
- *Can't Watch* owns the deliberate arrest and "where it can be seen".
- *Asked In* owns "taken by the establishment, then answered", so our ending can't be about credit or ownership (*Still Yours* sits close too).
- The gift must not drift into *Is It Just Me*'s belonging, *Not Too Polite*'s cause, *Got You*'s affectionate prank, the Scandalmonger's gasp (Croswell) or the Trickster's hoax (*No Accident* fears being ignored; this guest fears being made harmless).
- Out: cruelty, punching down, anything sexual in the story's joke, a political side today, and colonial history used as costume.

**Story test, five points:**
1. A joke aimed at power, told openly.
2. Power pushes back, or the joke is taken.
3. They keep joking afterwards, on a page.
4. The joke made people think again, or landed on the record as true.
5. New, from the last room: the ending holds after the page.

**Verdict on the plan row: Mencken is struck.**
- Selling the banned issue in Boston so he'd be arrested is now our own registry's shape ("got himself arrested", *Can't Watch*).
- An editor in court for what he published is Croswell's.
- He fails point 5. His diary, published in 1989, and his 1918 Nietzsche introduction carry antisemitic and racist lines. That's from Wikipedia, which is a lead only: it cites the AP's "Mencken Was Pro-Nazi, His Diary Shows", and scholars dispute how far it goes. This guest's gift is punching up, and a guest who looks him up finds him punching down. I won't hand them that mirror.

**Lord Invader is now on a page, so I'm promoting him to lead, with corrections.** The pages are primary court opinions from the Caselaw Access Project:
- *Khan v. Leo Feist*, 70 F. Supp. 450 (1947), affirmed 165 F.2d 188 (2d Cir. 1947). Finding 1 says Rupert Grant, "whose platform title was 'Invader' and 'Lord Invader'", wrote the words in February 1943. Khan testified that every calypso, this one included, went before "a board of censors of whom the Commissioner of Police is chairman" before it could be performed. The defence called the song "inherently salacious, immoral and lewd". The judge said it was a "recognition of a development in the economy of Trinidad which was too important to escape the comment".
- *Baron v. Leo Feist*, 78 F. Supp. 686 (1948). The song "was sung a great deal by both natives and soldiers": the soldiers sang the joke about themselves. On Amsterdam: "There is no doubt in my mind that Amsterdam brought both the words and the music with him from Trinidad." The first 200,000 records named Amsterdam as composer.
- **Corrections, Hester:** the lyric case was Khan's, in 1947. Khan ran the calypso tent Grant sang in and held the copyright. 1948 was Belasco's melody case. The $150,000 and "Amsterdam kept the copyright" are on Wikipedia only, so the reading never says "he won it back". Point 3 isn't on a page yet: he kept writing ("Yankee Dollar", later records). Could you fetch Smithsonian Folkways or similar in round 2? Without it the lead fails point 3.
- **Guards:** say the target as what the soldiers' dollars were doing to the island, never the women and never the lyric's subject. The radio refusal was over drink and the brand, so never "banned for its bite". The censors are Khan's testimony and are said as his. There's no backup yet. A possible lead, as a fallback only: calypsonians singing against Trinidad's 1930s censorship of their songs (Atilla the Hun), which needs pages.
- **Ending:** the court put his name on it, and the answer to a stolen joke is the next one.

Tomás, the Planter's question goes with Mencken, and so does that drink shape. If you go to rum and cola, note that *The Way It Felt* already uses Coca-Cola.

### Round 2

🍸 **Tomás:** Wren, I'm with you on Lord Invader, as long as Hester finds a page for point 3. I'm happy to let Mencken's punch go with him. My drink lead comes from the song: keep it **rum and Coca-Cola**. The joke rides on that name, and the radio refusal was about the drink and the brand (Oxford pdf 504, as the plan cites it). *The Way It Felt* uses the same cola for a different drink, and Robin's rule says a category is never taken, only the exact cocktail. So the drink is a Highball: rum, lime, Coca-Cola, a tall glass and ice. Hester, it should be "rum and Coca-Cola" in the text, not "Cuba Libre". That name belongs to another island and carries its own slogan.

**What makes it interesting, from the books.** The *Codex* (p. 213) says: "lime peel is a key ingredient in most colas, so the juice draws that flavor out of the cola while also cutting through its sweetness." That's this guest in physics. The lime shows what was in the cola all along, and the sweetness gets a bite. *Joy* (pdf 272–273) agrees from the other side: the drink is "seldom held in high regard, but when made properly it can be a heavenly potion". It also gives Baker's way, with the squeezed lime dropped into the glass. So the cocktail is the cheerful version everyone sang, made with the bite in. The second touch is Trinidad's own: Angostura is "produced in Trinidad" (*Codex* p. 14), so a few dashes go on top, and the island is the first thing you smell. I'll still check the *Matrix* once the story is ruled. If nothing earns its place, I won't force it.

**Two things to settle early, before any spec:**
- **Lime amount.** I haven't run anything yet; story comes first. But my rough sum puts *Joy*'s "at least one ounce" of lime at about 0.7% acid, above the highball band's 0.6. The *Codex*'s quarter ounce should land inside it. I'll run both once Wren rules.
- **Vetoes.** Our table lists Coca-Cola and Angostura as veto-free, and both recipes are secret. From my own knowledge, with no source, published versions of Coca-Cola's old formula list nutmeg oil. Robin counts nutmeg as `nuts`. Hester, can you find a page either way? If one names nutmeg, the cola becomes `nuts` here, and *The Way It Felt*'s Checks have to change too.

**Rum.** If Hester finds a page describing Trinidad rum as a style, I'll use that as the base. The only Trinidad bottle the *Codex* names is a 69% overproof (p. 109), and that's too hot to carry a highball.

📜 **Hester:** Wren, I agree Lord Invader leads. Point 3 and point 5 are now both on a page. The card is `_studio/fact-cards/lord-invader-rum-and-coca-cola.md` (F1–F18, C1–C4). My source is John Cowley's notes to Smithsonian Folkways SFW CD 40454, *Calypso in New York* (2000). Cowley is a scholar and cites the period press for each claim. I OCR'd the booklet, and the text is in the scratch folder.

**Point 3, two pages.**
- **The stronger one, *Crisis in Arkansas*** (recorded around March 1959, Folkways FW 8733; booklet pp. 23–24). It's aimed at Governor Faubus over Little Rock. The chorus mocks him for wearing a black bow tie and tuxedo while he calls Black people names. That's a joke at power, told openly, years after the theft.
- **The earlier one, *Yankee Dollar*** (January 1946, while the case was still running; pp. 12–13). *Down Beat* called it "a sort of sequel". In the chorus, having sung the hit gets him nowhere without the dollars. Only the chorus is usable: the verses are about the women.
- **Out:** *God Made Us All*. It's not safely his, because Cowley cites a 1943 Trinidad paper crediting Lord Pretender with the song.

**Point 5: the ending holds, but with a cost we must say.**
- The defendants didn't pay him until seven years later.
- The Folkways letters show he was "always short of money", even after the settlement (pp. 4–5).
- He kept recording for Folkways until his last session on 6 June 1961, and died that October (pp. 5–6). The booklet's own back cover says 1962, so we give no death year.
- So "the answer to a stolen joke is the next one" is true. "He was made whole" is not. No dollar figure either: the 1955 paper says $132,000 and Wikipedia says $150,000.

**One gift from the record, and two fixes to your corrections.**
- **The gift:** the man who took the joke was "the American comedian Morey Amsterdam" (p. 4; Khan calls him a "public entertainer"). The judge called the taking "deliberate and intentional". The first 200,000 records named Amsterdam as the composer (*Baron*).
- **Fix 1:** the tune was never Grant's. *Baron* says he learned Belasco's 1906 "L'Année Passée" from Belasco's cousin and changed a few notes. So we always say "his words".
- **Fix 2:** the plaintiff was Khan. On the stand Grant said "I don't own no rights". The court found Grant the author (Finding 1). Say "a court put his name on it", never "he sued" or "he won".
- **Confirmed:** your censors line is in *Khan*, word for word.
- **A counterweight for the dossier:** he recorded an unreleased Pepsi-Cola jingle around 1947 (pp. 13–14).

**Tomás, your two asks.**
- **Nutmeg (C1–C2).** There's no library page either way. Two published historical formulas list "nutmeg oil" in 7X: Beal's notebook, printed in the *Atlanta Journal-Constitution* in 1979, and Pemberton's notebook, via Pendergrast. My source for both is This American Life's "The Recipe" page. Coca-Cola denies that's the real formula (Reuters via NBC, 2011), and today's recipe is secret. Under the safe-side rule I'd make the cola `nuts`, and *The Way It Felt*'s Checks would need the same note. It's your call.
- **Trinidad rum (C3).** No page describes a Trinidad style. Oxford pdf 114 describes Angostura's rums only: column-distilled, bourbon barrels, "tarry fruitiness". That's a bottle, not a style. The distillery dates from 1949, after the song. If the island matters, name an Angostura rum as recommended and give the substitute as a style.
- **Two more.** The drink is older than the song (Oxford pdf 107: popular in Venezuela by 1911). So never call it "his" drink.

### Round 3

🕯️ **Host:** Round 3 of 5. After this round two remain: round 4 for the audit and fixes, round 5 for sign-offs on the exact files, in steps.

Crossings from round 2. First, Hester has pages for Wren's points 3 and 5 (Cowley's Folkways notes). *Crisis in Arkansas* (c. 1959) is a joke at power, years after the theft, and *Yankee Dollar* (1946) is usable on its chorus only. The ending holds with a cost: he was paid seven years late, he was "always short of money", and the death year conflicts. She also corrects Wren's "the court put his name on it": the tune was Belasco's, so it's always "his words", and the plaintiff was Khan, so never "he sued" or "he won". Second, Tomás asked for nutmeg in the cola, and Hester's answer is that two published historical formulas list nutmeg oil, Coca-Cola denies them, and there's no library page. She'd make the cola `nuts` on the safe side and calls it Tomás's call. That would also touch *The Way It Felt*, a pour outside this room; this room doesn't edit it, so any change there goes to Robin as a note. Third, Hester finds no Trinidad rum style on a page, only Angostura's own rums (Oxford pdf 114, distillery 1949). The drink is older than the song (pdf 107), so it's never "his".

Asked: Wren, rule on the story with these pages, and write reading v1 if it holds. Hester, the anchors on Wren's ruling. Tomás, spec v1 through `balance.py` (highball) and `allergens.py`, your veto call on the cola, and the rum as a recommended bottle plus a substitute style.

Ticked: persona read.

📜 **Hester:** Wren, Tomás, the anchors are in `_studio/work/outlaw-jester/historian-anchors.md`. They assume Wren's lead holds. There are 14 rows, every one on the card: story, target, setting (the censors), taken (the comedian, the 200,000 records), radio, record (the court), kept joking (*Yankee Dollar*, chorus only), kept aiming up (*Crisis in Arkansas*, the bow tie only), after (paid seven years late, short of money, recording until June 1961), drink, twist, the Angostura ingredient, and two caveats (no Trinidad rum style on a page; nutmeg). At the bottom there's a list of what never goes in guest text.

Tomás, I checked your two cites, and both quotes are on the page. One thing about scope. *Codex* p. 213's "lime peel is a key ingredient in most colas" is about colas in general, so the reading can't say Coca-Cola's own recipe has lime. Its formula is secret, and the published old ones list lemon and orange oils, not lime. Also, *Joy*'s "heavenly potion" and Baker's dropped lime are both filed under CUBA LIBRE (pdf 272–273). Your "rum and Coca-Cola" name still stands: Oxford pdf 613 says the Cuba Libre is "also known as" Rum and Coca-Cola. Just don't let "seldom held in high regard" read as something said about the song's drink. And *Joy* calls for light rum, if that helps with the base.

Wren, the one row I'd fight for is "record". The court found the words were his and the taking "deliberate and intentional". But the plaintiff was Khan, and the tune was Belasco's. So: "a court in New York wrote down whose words they were". Never "he sued", "he won it back" or "his song".

🪞 **Wren:** Story ruled: **Lord Invader holds on all five points**, and I'm grateful, Hester, the Cowley pages make it whole. Point 3 is in two parts. *Yankee Dollar* (chorus only) turns the joke on himself while the case is still going. *Crisis in Arkansas* aims up again years later. *Crisis in Arkansas* stays in: a 1957 governor keeping nine Black students out of school is history and power, not a party today. We use the bow-tie joke only. The ending holds because we say what it cost, in y2: paid seven years late, and often short of money even after. Both your fixes are accepted. It's "the words were Lord Invader's" and "a New York court later found", never "he sued", "he won" or "his tune". There's no month, no dollar figure and no death year.

**Reading v1** is in `_studio/work/outlaw-jester/psychologist-reading-v1.md`. The facts sit in a notes table (F1–F18), with nothing tagged in guest text. Every paragraph 4-grams clean against all pours. History is about half of yours (0.50 by my count, with y3's last line counted as the guest's). The epigraph is 14 words.
- **Epigraph:** *A song made this drink famous. The song was never really about the drink.*
- **Tagline (pick):** *You make the scariest thing in the room look its actual size.* Alternative: *Said straight, they'd stop you. So you make them laugh first.*
- **The "this is me" line (whoYouAre):** "It's how the true thing gets past the people it's about, because said straight, it would be stopped." The fear: "hearing your line from somebody else, everyone laughing, with the point quietly taken out." The gift is said out loud: "That's how you hand people their nerve back."
- **The position (y5):** don't spend the evening proving it was yours; "Write the one after it, and aim it a little higher."
- **Names:** *With the Bite In* (pick), *Actual Size* (only if the tagline changes), *Past the Censors*.

**Tomás**, y4 is provisional on your spec. It says: rum and Coca-Cola, "rarely given much credit" but a classic made properly, long and cold over plenty of ice, the rum from Trinidad, and fresh lime squeezed and dropped in. The lime line is the *Codex* one: it "draws out what the cola was already hiding and cuts its sweetness". It's there "as a nod to the song, sweet enough for everyone to sing, with its bite kept". Angostura goes on last. I wrote it to avoid "a few dashes" and "tall glass full of ice", both taken. Tell me if the lime amount or the rum changes a word. On nutmeg I'm with the safe side: if the cola goes `nuts`, I agree, and *The Way It Felt* goes to Robin as a note, not an edit.

**Hester**, please audit three lines:
- "His got through": that's Khan's testimony about the tent.
- "made it a hit": F6.
- "turned the joke on himself": my gloss on *Down Beat*'s "sort of sequel", which needs your ruling.

🍸 **Tomás:** Hester, thank you for the pages. Spec v1 is written, and it's a draft until Wren rules. It's a Highball in a tall glass of ice: 60 ml Angostura 1919 rum (recommended, or any column-distilled aged rum, not spiced, about 40%), 15 ml lime with the squeezed half dropped in, 120 ml Coca-Cola, and two dashes of Angostura on top. **`balance.py`, highball: in range, 12.6% / 6.63 g / 0.49%.** The swept versions, so nobody keeps a number for the wrong reason:
- **Lime:** the *Codex*'s 7.5 ml is in range but near the sugar top (6.83). 20 ml is an EDGE on acid (0.62). *Joy*'s "at least one ounce" is **OUT** (0.88).
- **Rum and cola:** 45 ml of rum is an EDGE on sugar (7.17), and so is 150 ml of cola (7.15).
- **Rum strength:** 37.5–43% stays in range, by hand.

Where the interest comes from: the *Codex* says lime "draws that flavor out of the cola" because "lime peel is a key ingredient in most colas" (p. 213). That's the joke's physics: it brings out what was already in the glass. Oxford pdf 114 puts the bitters and the rum in one Trinidad house (bitters moved to Trinidad in 1875, the rums from 1949), so the island is the first thing you smell. I checked the *Matrix* and set it aside. The Citrus surprise pairings (pdf 80) are sage, caraway and nuts, and sage and caraway are already siblings' sparks. Cane syrup's are garlic, fish and olive.

**My veto call: the cola is `nuts`, on the safe side.** It rests on Hester's C1–C2: two published formulas list nutmeg oil, the company's denial isn't a recipe, and nutmeg counts as nuts. I've changed the row in the table, and `allergens.py` now gives `["nuts"]`. So this pour leaves the veto-free floor, and the plan's "Subverter stays veto-free" no longer holds. *The Way It Felt* uses the same row, so that's a note for Robin; this room doesn't edit it. Its Checks currently say veto-free.

The draft also has the method, Checks, image brief, names (my pick is *Down to Size*) and a proposed closing line: *"Squeeze the lime and drop it in. If they sing it back wrong, write a new one."* It's in `_studio/work/outlaw-jester/mixologist-draft.md`. Wren, one flag on your gift line: *Down the Line* already has "put it back to its real size", in another sense.

### Round 4

🕯️ **Host:** Round 4 of 5. After this round one remains, round 5, for sign-offs on the exact files, in steps.

Crossings from round 3:
- **The lime line.** Wren's y4, the lime "draws out what the cola was already hiding", crossed Hester's scope note. *Codex* p. 213's lime peel is said of colas in general, so no line may say Coca-Cola's own recipe has lime.
- **"Rarely given much credit".** Wren's line crossed Hester's note that *Joy*'s "seldom held in high regard" is filed under CUBA LIBRE and mustn't read as said about the song's drink.
- **"The rum from Trinidad".** Wren's y4 has it. Hester found no Trinidad style on a page, and Tomás's spec names Angostura 1919 as recommended, with "any column-distilled aged rum" as the substitute.
- **"Its actual size".** Tomás flags *Down the Line*'s "put it back to its real size". That touches Wren's tagline pick and the name *Actual Size*. Tomás's own name pick, *Down to Size*, sits in the same field.
- **The veto.** Tomás reclassified the shared Coca-Cola row in `ingredients.json` as `nuts` on Hester's C1–C2. That makes this pour `nuts`, and it changes what the tools report for *The Way It Felt* (innocent-creator), whose file still says veto-free. This room doesn't edit that pour; the batch summary carries it to Robin.
- **The closing line.** Tomás proposes "Squeeze the lime and drop it in. If they sing it back wrong, write a new one." Wren's y5 ends "Write the one after it", so Wren rules on the closing line.

Asked: Hester, audit reading v1 (including Wren's three lines) and spec v1. Wren, the resonance test and v2 with the audit, and rule on the closing line, the tagline and the names. Tomás, clear Hester's audit on your side and give the cost of the recommended rum plainly under Makeable. All three, your name pick.

Ticked: persona read, story + sourced anchors, reading (v1), drink + four checks (spec v1, `nuts`), image brief. Open: fact audit, resonance test, names.

🍸 **Tomás:** Hester, I've cleared your audit on my side, and nothing in the drink changes: same spec, same numbers (12.6% / 6.63 g / 0.49%, in range), still `nuts`. Draft v1.1 is in `mixologist-draft.md`.
- **Lime:** my Pairings line no longer says the lime brings out anything hidden in the cola. It now says what the *Codex* says it does: it "cuts through" the cola's sweetness. Your scope note is in Checks.
- **Credit:** *Joy*'s praise and Baker's dropped lime are filed under CUBA LIBRE, with Oxford pdf 613's "also known as" alongside.
- **Light rum:** noted as a departure. The *Codex* calls for white rum and *Joy* for light. The aged rum is mine, so the island's own exported bottle can carry it, and the numbers are identical at 40% with no sugar. *Joy*'s full spec (60 rum / 30 lime / 90 cola) runs OUT on acid, at about 1.0%.

**Cost, plainly, under Makeable:** Angostura 1919 is a mid-priced aged rum, about £35–40 or $35–40 a bottle. That's around a good bourbon's price, and the bottle makes about twelve drinks. The figures are my own knowledge and unsourced.

**Wren, two fixes to your y4.** Each is your call on the words.
- "Most colas carry lime peel… draws out what the cola was already hiding" breaks Hester's scope note, because it reads as this cola's recipe. Something like "squeezed and dropped in, to cut through the cola's sweetness and give it its bite" is on the page.
- "The rum is from Trinidad" is true of the bottle I recommend, not of the substitute style. "The rum I'd pour is made in Trinidad" keeps it honest. Makeable carries the substitute.
- The lime stays at 15 ml, so no other word changes.

**Names: I'll go with *With the Bite In*.** I'm dropping *Down to Size*: next to your "actual size" tagline it would spend the title block twice. **The closing line:** my v1 said your y5's "write the one after it" a second time, so I've withdrawn it. My new proposal is *"Squeeze the lime and drop it in. Keep the bite, and they'll still sing along."* It's free in the registry and the pour files. It turns your gift into the glass: the point kept in, the song still sung. Your ruling.

🪞 **Wren:** Tomás, Hester, v2 is in `_studio/work/outlaw-jester/psychologist-reading-v2.md`. The resonance test and the change list are at the bottom of the file.

**Changes for Hester's grep:**
1. whoYouAre p2: "said straight, it would be stopped" → "put plainly, it would be stopped".
2. y4: the *Joy* CUBA LIBRE line is gone. "people rarely give it much credit, but made properly it's a classic worth having" → "and simple, but made properly it's a classic worth asking for by name".
3. y4: "The rum is from Trinidad." → "The rum I'd pick is from Trinidad, from the same house as the Angostura bitters that go on last" (Oxford pdf 114). "I'd pick" leaves room for the substitute.
4. y4: the lime line is now scoped to colas in general, never Coca-Cola: "Most colas have lime peel in them somewhere, so fresh lime tends to bring that forward and cut the sweetness."
5. y4: "with its bite kept" → "I put in twice the usual as a nod to the song: sweet enough for everyone to sing, and still sharp". That's 15 ml against the *Codex*'s 7.5 (p. 213), and "bite" is saved for the name.
6. y4: the separate bitters sentence is merged into the rum sentence.
7. y5: "Write the one after it" → "Make the next one".

y1–y3 and the epigraph are unchanged until Hester rules on "His got through", "made it a hit" and "turned the joke on himself". "A New York court later found the words were Lord Invader's" stays. It's F9's own wording, and it never says sued, won or his song.

**Closing line:** I accept Tomás's line as it stands: *"Squeeze the lime and drop it in. If they sing it back wrong, write a new one."* It's y5's position in the guest's hands, with the song's verb. That's why y5 now says "Make the next one", so the two don't echo.

**Tagline:** "actual size" is struck. Tomás is right: *Down the Line* owns size. The pick is **"Said straight, they'd stop you. So you make them laugh."** It's the one true thing, offered as an invitation. I left out "laugh first", which is *Unrehearsed*'s.

**Names:** *Down to Size* and *Actual Size* are struck for the same size reason, and "cut down to size" leans toward humiliation. My pick is **With the Bite In**. The alternative is *Slipped Past* (Tomás's), and *Past the Censors* is third.

**Resonance test.** The "this is me" line is "It's how the true thing gets past the people it's about, because put plainly, it would be stopped." whoYouAre has one generic sentence, p3's opener, and the line after it carries it. The swap test passes against the Reassurer, the Surrealist, the Stand-up, the Trickster, the Maverick, the Campaigner and the Rule Breaker. The weakest punch is the scene's first line, which I'm keeping because it pays off at "a beat late". Every paragraph, the tagline, the closing line and the name 4-gram clean against every pour. History is 0.50 of yours.

The verdict is ready, pending Hester's audit of those three lines. If she clears them, I'd put my name to this.

📜 **Hester:** Wren, Tomás, audit v1 is in `_studio/work/outlaw-jester/historian-audit-v1.md`. **Not yet, but close:** six fixes for Wren and three for Tomás. None of them touches the story.

**Wren, your three asks first. All three pass.**
- **"His got through."** Khan testified that a song could be performed only after the board approved it. The court also found the song was "publicly rendered on March 1, 1943" in his tent. Your line follows from those two facts, and nowhere claims the censors objected.
- **"Made it a hit."** Cowley says their version "was an instant hit", and Oxford pdf 504 has the public driving the song to the top.
- **"Turned the joke on himself."** That's what the chorus itself says: she turns him down "not because you sang 'Rum and Coca-Cola'", but because he hasn't got the dollar. And "came to entertain the troops" holds too: *Baron* has Amsterdam arriving "as an entertainer for the U.S.O."

**Wren's six fixes (old → new):**
- **A1:** "sang it together" → "alike". *Baron* says both sang it, not together. My own anchors had "as much as", which was my shorthand, and I've struck it.
- **A2:** "found the words were Lord Invader's" → "found that Lord Invader had written the words". That was my r3 wording, and it reads as ownership, but Khan held the rights.
- **A3:** "a sort of sequel" is *Down Beat*'s phrase → "a follow-up".
- **A4, epigraph:** "this drink" means our glass, and no song made that famous → "A song made rum and Coca-Cola famous." The second sentence passes. The judge read the song as being about the island's economy, while the radio networks refused it as a song about alcohol.
- **A5:** "The rum is from Trinidad" → "The rum I'd reach for is from Trinidad". The substitute rum isn't from Trinidad.
- **A6, scope:** "what the cola was already hiding" says Coca-Cola has lime in it. Its recipe is secret, the *Codex* says only "most colas", and the old published formulas list lemon and orange, not lime. Keep the idea for the guest under an "I like to think".

**Tomás's three fixes:**
- **S1:** pdf 114 puts the rum-making in the 1930s, and Trinidad Distillers in 1949.
- **S2:** the *Codex* classic is white rum over three cubes. Own that change as well as the lime.
- **S3:** Baker also muddles the lime, so say "after Baker's way, without his muddling".

The cola as `nuts` passes as carded. The 1919's 40% stays open until you check the current label.

The anchors and card F6 were fixed in the same call. My name pick is *With the Bite In*. The *Codex* and *Joy* both say the drink is only worth having made properly, with the lime in.

### Round 5

🕯️ **Host:** Round 5 of 5, the last. It runs in steps:
1. Fixes and the audit, in parallel.
2. Each owner clears what's left and signs on the exact files.
3. Hester confirms on the files.

Crossings from round 4:
- **The audit crossed v2.** Hester audited v1 while Wren wrote v2. v2 already changes y4's rum line ("The rum I'd pick is from Trinidad", against Hester's A5 "I'd reach for") and the lime line (scoped to "most colas", against A6, which asks for an "I like to think"). A1–A4 (the epigraph, "together", "found that Lord Invader had written the words", "a follow-up") are not yet in v2.
- **The closing line.** Wren accepted Tomás's first line ("If they sing it back wrong, write a new one"). In the same round Tomás withdrew it, because it said y5's "write the one after it" a second time, and proposed "Squeeze the lime and drop it in. Keep the bite, and they'll still sing along." Wren has since changed y5 to "Make the next one". Wren rules on which line stands.
- **The names.** All three now pick *With the Bite In*. The tagline is "Said straight, they'd stop you. So you make them laugh."
- **Tomás's side.** S1–S3 are open. So is the 1919's 40%, pending a label check.

Step 1: Wren writes v3 with A1–A6 (each carried, or answered in her own words), plus the closing-line ruling and a change list. Tomás clears S1–S3 and the 40% and matches the draft to the closing line once Wren rules. Hester audits v2 and draft v1.1 now against her A and S lists, so step 2 knows exactly what's left.

Ticked: everything except the fact audit.

🪞 **Wren:** Hester, Tomás, v3 is in `_studio/work/outlaw-jester/psychologist-reading-v3.md`. The change list and the closing-line ruling are in the file. Thank you, Hester, for clearing the three lines.

**A1–A6, old → new:**
- **A1, y1:** "sang it together" → "and soldiers and Trinidadians alike sang it."
- **A2, y2:** "found the words were Lord Invader's" → "found that Lord Invader had written the words."
- **A3, y3:** "a sort of sequel" → "a follow-up".
- **A4, epigraph:** *A song made rum and Coca-Cola famous. The song was never really about the drink.* It's 16 words by the lint's count.
- **A5, y4:** answered in my words in v2 and unchanged here: "The rum I'd pick is from Trinidad, from the same house as the Angostura bitters". "I'd pick" does the job of your "I'd reach for", and the substitute is never called Trinidadian.
- **A6, y4:** cut rather than signposted. Under any "I like to think", the hidden-in-the-cola idea still reads as this cola's recipe. It's now "Then the lime, squeezed and dropped into the glass, to cut through the cola's sweetness", which is on the *Codex* page, as Tomás suggested.

**History-share trims,** with no fact added. History had gone to 0.517 once y4 shrank.
- y1: "the police commissioner's board of censors".
- y2: "heard it while entertaining the troops and took it home"; "and that the taking was deliberate" is cut (it stays in the dossier); "even after that" → "even then".
- y5: "aim it a little higher than the last".

History is now 0.499 of yours. Every paragraph and the epigraph 4-gram clean against every pour. whoYouAre, the tagline ("Said straight, they'd stop you. So you make them laugh.") and the name *With the Bite In* are unchanged.

**Closing line:** Tomás, I'm asking for your first line back: *"Squeeze the lime and drop it in. If they sing it back wrong, write a new one."* You withdrew it because of my echo, and that echo is gone, since y5 now says "Make the next one". Your new line shares "bite" with the name, and the title block and closing line should share no words. It also has the joke survive by staying sweet, which softens the position.

I'll sign on the exact files in step 2.

🍸 **Tomás:** Wren, I'll take the first line back, and you've convinced me. The echo is gone now that y5 says "Make the next one". "Bite" belongs to the name. And having the joke survive by staying sweet did soften the position. So the closingLine is *"Squeeze the lime and drop it in. If they sing it back wrong, write a new one."* The draft now matches v3. The recipe's lime row reads "dropped into the glass, not muddled", and nothing in the drink changed.

Hester, I've cleared S1–S3 in `mixologist-draft.md` (v1.2) and in the spec's notes:
- **S1:** Robert Siegert's rum-making began in the 1930s, on a multi-column still. Trinidad Distillers came in 1949 (pdf 114).
- **S2:** the *Codex*'s white rum and three cubes are owned as my changes, along with the doubled lime.
- **S3:** it's "after Baker's way, without his muddling".

**The 40% is still unconfirmed on a label.** I couldn't read the maker's or a shop's page this session, so it stays my own knowledge, marked unsourced. It doesn't change the drink. `balance.py` at 37.5% and at 43% (my new one-call sweep, overriding the rum's ABV in memory) gives 11.8% and 13.5% ABV, with sugar and acid unchanged at 6.63 g / 0.49%. Both are in range. Guest text gives no strength for the named bottle, and the substitute says "about 40%". If you can read the label, I'll put your page in the row.

The spec is still in range at 12.6% / 6.63 g / 0.49%. `allergens.py` still gives `["nuts"]`, from the cola alone. I'll sign in step 2, on the exact files.

🕯️ **Host:** Step 2. One change to the plan in my round-5 turn: I held Hester's audit back until v3 existed, so she audits the final text once instead of v2 and then v3. Wren's v3 carries A1–A4, answers A5 in her own words ("I'd pick"), and cuts A6's line instead of signposting it. Tomás's draft v1.2 clears S1–S3 and takes his first closing line back at Wren's request: "Squeeze the lime and drop it in. If they sing it back wrong, write a new one." The 1919's 40% stays unsourced, swept at 37.5–43% and in range, with no strength given in guest text. Hester audits reading v3, draft v1.2 and the spec as files, and signs or names what fails. Then Wren and Tomás sign on the same files.

📜 **Hester:** Wren, Tomás, audit v2 is in `_studio/work/outlaw-jester/historian-audit-v2.md`. A1–A6 and S1–S3 are all closed in the files. A5 and A6 are closed in Wren's own words, and they're good. **Not yet:** four fixes remain, each a few words, and none touches the story or the drink.

- **B1 (Wren, y4):** "I put in twice the usual" → "I doubled the lime in the recipe I started from". Ours is twice the *Codex*'s quarter ounce, but *Joy* asks for at least an ounce, which is twice ours. There is no single "usual".
- **B2 (Wren, y4):** "Then the lime" → "And the lime". It follows "the bitters that go on last", so "Then" puts the lime after the bitters. The method has the lime at step 2 and the bitters at step 4.
- **B3 (Tomás, the spec's `_status`):** "lime draws the cola's own lime peel out" → "lime peel is a key ingredient in most colas; the juice cuts the cola's sweetness". It's A6's scope problem, still alive in the JSON.
- **B4 (Wren, the Notes, which are the dossier):** fix the stale rows to match the text.
  - y2: "found he had written the words", with "deliberate" marked dossier only.
  - y3: "a follow-up", with *Down Beat*'s phrase credited to it.
  - The rulings line: change "found the words were Lord Invader's" to match y2.
  - y4: cite "a classic" to *Codex* p. 213.
  - The header: "Reading v3".

Everything else passes on the page. That includes the closing line, the 40% as labelled, the `nuts` call and the cost line. My anchors were updated in the same call. Once B1–B4 are in the files, I'd put my name to this.

🕯️ **Host:** Step 3, the sign-offs. Hester leaves four word-level fixes, and none touches the story or the drink. B1, B2 and B4 are Wren's: y4's "twice the usual", "Then the lime", and the stale Notes rows. B3 is Tomás's, the spec's `_status` line. Each owner makes their fixes in place, re-reads the other's file, and signs on the exact files as they then stand. Hester then re-greps and confirms.

🍸 **Tomás:** Hester, B3 is in. The spec's `_status` now reads "lime peel is a key ingredient in most colas; the juice cuts the cola's sweetness". A grep finds "own lime peel" in neither the spec nor the draft. I re-ran the spec: still balanced at 12.6% / 6.63 g / 0.49%, `contains: ["nuts"]`. Draft v1.2 is unchanged and matches it. It says "twice the *Codex*'s" lime, which is true under B1's scope.

Wren, I've just re-read y4 in `psychologist-reading-v3.md`, and B1 and B2 aren't in yet. It still says "Then the lime" and "I put in twice the usual". So, **not yet:** only on those two phrases. With Hester's wording ("And the lime…", "I doubled the lime in the recipe I started from"), y4 matches my method and my numbers, because the lime goes in at step 2, the bitters at step 4, and it's 15 ml against the *Codex*'s 7.5. On the spec as it stands, draft v1.2 and v3 with exactly those two fixes, **I'd put my name to this**. If y4 lands in any other words, bring me back and I'll read it again.

🪞 **Wren:** Hester, B1, B2 and B4 are in `psychologist-reading-v3.md` now. y4 reads "And the lime, squeezed and dropped into the glass, to cut through the cola's sweetness. I doubled the lime in the recipe I started from, as a nod to the song: sweet enough for everyone to sing, and still sharp." The Notes now match the text:
- the header says "Reading v3";
- y2: "found that Lord Invader had written the words", with "deliberate" marked dossier only;
- y3: "a follow-up", with *Down Beat* credited;
- y4: "a classic" is cited to *Codex* p. 213, and the lime row matches B1;
- the rulings line matches y2.

One more change, a lint-only fix with no fact or claim touched. My last 4-gram run found "make the next one" in `ruler-jester.md`, which is new since round 4. So y5's "Make the next one, and aim it a little higher than the last." is now "Come up with another, and aim it a little higher than the last." It's quoted in the file's change list. Every paragraph, the epigraph, the tagline, the closing line and the name are clean against every pour. History is 0.49 of yours.

Tomás, I've re-read draft v1.2 against v3. It's 15 ml lime with the half "dropped into the glass, not muddled", and the bitters go on last in step 4, so "And the lime" sits right. The closing line is *"Squeeze the lime and drop it in. If they sing it back wrong, write a new one."* Contains: nuts. No strength is given in guest text. The *Codex*'s "draws that flavor out" quote stays in your Checks with Hester's scope note beside it, and that's dossier, so I'm fine with it.

The "this is me" line holds: "It's how the true thing gets past the people it's about, because put plainly, it would be stopped." On reading v3 and mixologist-draft v1.2 as they now stand, the resonance test says ready. I'd put my name to this.

🕯️ **Host:** Step 3, the last turns. Wren's B1, B2 and B4 are in, and y4 uses Hester's wording exactly, which is Tomás's stated condition. She also changed y5 lint-only ("Make the next one" → "Come up with another"), because `ruler-jester.md` now holds that 4-gram. No fact and nothing in the drink changed. Tomás confirms his signature on the files as they stand. Hester re-greps B1–B4 and the y5 change, and confirms.

🍸 **Tomás:** Wren, I re-read y4 and y5 in `psychologist-reading-v3.md`. y4 has Hester's wording exactly: "And the lime, squeezed and dropped into the glass, to cut through the cola's sweetness. I doubled the lime in the recipe I started from…". That matches my method (lime at step 2, bitters at step 4) and my numbers (15 ml against the *Codex*'s 7.5). y5's "Come up with another" changes no fact and nothing in the drink. It also keeps clear of the closing line's "write a new one", which now appears only once, in my draft. The spec stands, still balanced at 12.6% / 6.63 g / 0.49% and `contains: ["nuts"]`, with B3 in. On reading v3, `mixologist-draft.md` v1.2 and `specs/outlaw-jester.json` as they now stand, I'd put my name to this.

📜 **Hester:** Wren, Tomás, I've re-grepped the files as they stand, and all four fixes are in.

- **B1 and B2 are in y4, word for word:** "And the lime…" and "I doubled the lime in the recipe I started from". Neither "twice the usual" nor "Then the lime" is left in guest text. Both survive only in the change lists, as history.
- **B3:** the spec's `_status` now says "lime peel is a key ingredient in most colas; the juice cuts the cola's sweetness". "Own lime peel" no longer appears in the spec or the draft.
- **B4:** the Notes header is "Reading v3". The y2 row says "had written the words", with "deliberate" marked dossier only. The y3 row credits *Down Beat* for "a sort of sequel". The y4 rows cite *Codex* p. 213.
- **Wren's y5 change** to "Come up with another" is lint-only: it touches no fact or claim, and the "I like to think" signpost and the position are unchanged.

Every fact in yours, the epigraph and the spec is on a page or signposted. The anchors match the audit, the cola's `nuts` call rests on card C1–C2, and the 1919's 40% is labelled unsourced, with no strength given in guest text. On psychologist-reading-v3.md, mixologist-draft.md v1.2 and specs/outlaw-jester.json as they now stand, I'd put my name to this.
