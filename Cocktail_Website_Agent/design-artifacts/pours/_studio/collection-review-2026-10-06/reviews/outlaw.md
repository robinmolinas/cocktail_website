# Family review: Outlaw (2026-10-06)

Reviewer notes in one paragraph: the strongest family I read for story choice. Every pour finds a true episode where the rule-breaking has a cost and a shape (Stoumen's soft drinks, the posted invitations, Solarin's arrest, the Chartreuse letter, Gaja demoting his own wines, Olmstead's no-guns rule), and the legends are labelled with care: Hester's guards hold throughout, and I found no claim that the anchors and audits don't carry. The drinks are honest about their numbers. The two edges and the one OUT are real features of the drink (a wine highball, a spirit-only stirred drink), with one exception: *Whoopee*'s edge comes from a later table change, not from the drink, so its Checks no longer describe it. What recurs: three Old-Fashioneds built on one template (60 ml base, a tablespoon of liqueur or wine syrup, a little rich syrup, two dashes, lemon peel squeezed and dropped in, with identical method wording in *Asked In* and *Kept*). That's allowed, and the bases differ enough. Proposals that start with "So…" (six of eleven), and two "my side" openings (*Kept*, *Hear Me Out*). In the taglines, the 2 October recommendations mostly reuse the whoYouAre's own key phrase, so I'd keep more current lines than that review did. The one real swap risk is *With the Bite In*: its central insight restates the approved *No Accident*'s.

## Matrix rows

| pairing | name | status | T | H | V | P | tagline | priority | top issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| outlaw-caregiver | *In One Piece* | draft | ok | ok | ok | minor: "Nobody even has to be brave" repeats the reversed pour's "didn't have to be brave" | keep | P3 | shared "brave" motif with *Not Too Polite* |
| outlaw-creator | *Asked In* | draft | ok | ok | ok | ok: near *Still Yours* on being taken up by the mainstream, but the fear differs (being owned by the authorities vs worn out by everyone else) | take 10-02 rec | P3 | tagline is a Nobody/public-private turn |
| outlaw-explorer | *Whoopee* | draft | minor: acid EDGE (1.17 / 0.75) after the `sloe_gin` acid went 0.5 → 0; Checks still print the old 1.39 / 0.90 "all in range" | ok: web sources only, owned in Open items | ok | ok | keep | P2 | balance edge comes from the table change, not the drink; 22.5 ml lemon clears it |
| outlaw-hero | *Can't Watch* | draft | minor: Pedro's is the one bottle with no realistic substitute (the fallback is the same scarce style); honest in Open items | ok: contested ban dates kept out; "The ban ended that same year" claims no cause | minor: whoYouAre 196 words | ok | keep | — | no change |
| outlaw-innocent | *Kept* | draft | ok: allocation scarcity owned | ok | minor: "Here's my side of it" also opens *Hear Me Out*'s proposal | minor: its fear (a gentle, kindly drift) is close to *Fresh Air*'s | keep | P3 | duplicate proposal opening in the family |
| outlaw-jester | *With the Bite In* | draft | ok: `nuts` from the cola row, matches tool | ok | ok | minor: whoYouAre ¶2's core line restates the approved *No Accident*'s ("a joke slips past people's guard") | candidate offered | P2 | swap risk with an approved pour on the central insight |
| outlaw-lover | *Rent-Free* | draft | ok: 9.4% EDGE is honest (a wine core, no spirit, by design) | ok | minor: tagline is clever before clear ("Even where you stop is a hideout") | ok | replace | P2 | tagline |
| outlaw-magician | *For Its Own Good* | draft | ok | ok | minor: whoYouAre 206 words | ok | replace | P3 | tagline echoes whoYouAre's last line ("love… end") |
| outlaw-regular-guy | *Where You Stand* | flagged | minor: OUT on acid is honest (Embury's drink has none; the stirred band is a vermouth band); "a spoonful of sugar syrup" vs the teaspoon | ok | ok | ok | take 10-02 rec | P3 | keep the recipe; the OUT is a style gap, not a drink fault |
| outlaw-ruler | *Before It Had a Name* | draft | ok: `nuts` from quince "may contain"; fallback proved | minor: "by the autumn of 2026 it still hadn't poured a drop" reads oddly in present-day Oct 2026 and will date | minor: tagline repeats whoYouAre ¶2 almost word for word | ok | replace | P2 | tagline/whoYouAre echo |
| outlaw-sage | *Hear Me Out* | draft | ok: initial acid EDGE 1.42 justified (finished in range) | ok | ok | ok | keep | — | no change |

## Revision proposals (ranked, most important first)

### outlaw-explorer · P2 · ground: Tomás · Robin
- **Where:** recipe row (lemon), and Checks › Balance
- **Current (verbatim):** "| 20 ml (⅔ oz) | fresh lemon juice | squeezed just before |"
- **Proposed:** "| 22.5 ml (¾ oz) | fresh lemon juice | squeezed just before |"
- **Why it improves the pairing:** the drink went to the acid edge only because the shared `sloe_gin` row's acid was corrected from 0.5% to 0% (regular-guy-sage r3). The Checks still say "All in range… 22.5 ml of lemon instead of 20 goes OUT", which is no longer true. At 22.5 ml, `balance.py` (run on a scratch copy) gives initial 25.8% / 10.20 g / 1.29%, finished 16.6% / 6.59 g / 0.83%: everything mid-band. ¾ oz is also a friendlier measure than ⅔ oz. No guest text names the lemon amount.
- **Checks before applying:** `balance.py` on the edited spec; Tomás's 48-case sweep re-run with sloe acid 0–0.2%; rewrite the Checks › Balance row (and drop the "22.5 ml goes OUT" sentence); lint.

### outlaw-jester · P2 · ground: Wren · Robin
- **Where:** `whoYouAre 2`, sentences 2–3
- **Current (verbatim):** "The joke isn't a reflex. It's how the true thing gets past the people it's about, because put plainly, it would be stopped."
- **Proposed:** "The joke isn't a reflex, and it never punches down. It's aimed at whoever's at the head of the table, because that's the one place a plain sentence would be stopped."
- **Why it improves the pairing:** the approved *No Accident* already owns "You say your truest things as jokes, because a joke slips past people's guard where an argument never would." The Subverter's own ground, in its story (the soldiers' dollars, the governor's bow tie), is the direction of the joke: always upward, at whoever holds the power. The new line keeps the mechanism but makes the aim the point, which sets up ¶3's "laughs at whatever's in charge".
- **Checks before applying:** lint (4-gram check against *No Accident* and *Quote Me*); Wren's swap test.

### outlaw-ruler · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone sees the rebel. Nobody sees the plan."
- **Proposed:** options: "You hear the next thing early, and quietly give it somewhere to go." / "The first version is already in your head while everyone else is still arguing." (the 2 October line)
- **Why it improves the pairing:** the current tagline repeats whoYouAre ¶2's opening ("People see the rebel. They don't see the plan"), so the title block spends the reading's reveal before the reading starts. It's also the collection's most common cadence (mass contrast, public then private). Both options are behaviour that needs no Anchor story. The first avoids "first version", which whoYouAre ¶1 also uses.
- **Checks before applying:** registry check for taken lines; lint.

### outlaw-lover · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You love like it's a getaway. Even where you stop is a hideout."
- **Proposed:** options: "Every time you've fallen for someone, you've also left somewhere." / "You've never fallen for anyone without packing a bag."
- **Why it improves the pairing:** "Even where you stop is a hideout" has to be decoded. It's clever before clear, and the guest meets it cold. The 2 October line ("staying by choice is the harder trick") gives away the proposal. Both options are concrete Fugitive behaviour: love and leaving as one act (whoYouAre ¶1's "Whoever you fell for was also the way out"), without borrowing that sentence's words.
- **Checks before applying:** registry; lint.

### outlaw-magician · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else keeps it going. You love it enough to end it."
- **Proposed:** options: "You'd rather lose a tradition than watch it go through the motions." / "You know when keeping something alive is what's killing it." (the 2 October line)
- **Why it improves the pairing:** the current line pre-empts whoYouAre's closing sentence ("That's love too: the kind that's willing to end things"), and it's a mass-contrast turn. The first option uses fresh words and one sentence. The 2 October line is acceptable too, but "alive" also sits in whoYouAre ¶1.
- **Checks before applying:** registry; lint.

### outlaw-creator · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Nobody had to let you. It was good before they did."
- **Proposed:** "A locked door gets you moving; an open one makes you hesitate." (the 2 October line)
- **Why it improves the pairing:** the 2 October line is persona behaviour that needs no Glenlivet story, and it carries the whoYouAre's real turn (the yes is what you don't trust) without using its words. The current line is fine, but it's a Nobody-opening public/private turn.
- **Checks before applying:** registry; lint.

### outlaw-regular-guy · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You know how things really get done. You also know what you'll never do."
- **Proposed:** "You know every back door and exactly which one you won't use." (the 2 October line)
- **Why it improves the pairing:** this is concrete behaviour, as Robin's one `yes` was, with the line inside it. It's one sentence instead of a symmetrical pair. There's a faint image overlap with whoYouAre ¶1 ("which door opens if you knock the right way"). That's acceptable, because the tagline adds the refusal.
- **Checks before applying:** registry; lint.

### outlaw-regular-guy · P3 · ground: Tomás · routine
- **Where:** `yours 4`
- **Current (verbatim):** "with orange curaçao, Angostura and a spoonful of sugar syrup."
- **Proposed:** "with orange curaçao, Angostura and a teaspoon of sugar syrup."
- **Why it improves the pairing:** the whole drink turns on the exact teaspoon (recipe, method, closing line). "Spoonful" is the one place where the unit goes vague.
- **Checks before applying:** lint.

### outlaw-ruler · P3 · ground: Hester · routine
- **Where:** `yours 3`
- **Current (verbatim):** "A new owner has promised it back, though by the autumn of 2026 it still hadn't poured a drop."
- **Proposed:** "A new owner has promised it back, though in the autumn of 2026 it still wasn't pouring."
- **Why it improves the pairing:** we're in the autumn of 2026, so the past perfect reads as if from a later date. The plain present-dated clause says the same thing and is easier to update.
- **Checks before applying:** Hester to re-check Anchor's status before publishing (Open items already asks for this).

### outlaw-innocent · P3 · ground: Wren · routine
- **Where:** `yours 5`, first sentence
- **Current (verbatim):** "Here's my side of it. Keep the promise."
- **Proposed:** "Keep the promise."
- **Why it improves the pairing:** *Hear Me Out*, where "my side" is the whole point, opens its proposal with "So here's my side". *Kept*'s proposal stands without the preamble, and starting on the imperative is stronger.
- **Checks before applying:** lint.

### outlaw-caregiver · P3 · ground: Wren · Robin
- **Where:** `whoYouAre 2`, last sentence
- **Current (verbatim):** "Here's the gift in it: when you're there, nobody has to fight. Nobody even has to be brave."
- **Proposed:** "Here's the gift in it: when you're there, nobody has to fight."
- **Why it improves the pairing:** the reversed pour *Not Too Polite*, which Robin has edited, says "The people who didn't have to be brave on their own." Dropping the second sentence keeps the gift stated out loud and removes the shared motif from the reversed pair.
- **Checks before applying:** none.

**Not proposed, with my view:**
- *Where You Stand*'s OUT: keep the recipe. The OUT is honest. The `stirred` acid band (0.10–0.14) comes from vermouth drinks, and Embury's Canadian has no acid at all. The built-on-a-cube fallback (1¼ tsp maple) would close it clean, but it leaves Embury's teaspoon and the coupe that y4 describes. The right fix is the `stirred-spirit` style Tomás suggests (it would also clear *Nothing to It*), which is a tool change, not a pour edit.
- *Before It Had a Name*'s quince: I'd keep it. The "may contain" is honestly classed `nuts`, the twist is tied to the story in words ("a nod to a sour beer he took on, and put right"), and the fallback (plain syrup and water) loses the drink's one spark. If Robin wants the pour on the veto-free floor, the fallback is proved and its y4 is already audited. Robin's call.
- *Can't Watch*'s bottle: Pedro's at about £3.50 a drink is within the rule, but outside four cities it's hard to find, and the fallback is the same scarce style. No good alternative keeps the story, so I'd leave it and accept the reach.

## Taglines

| pairing | current | in 10-02? | verdict | candidate(s) | note |
| --- | --- | --- | --- | --- | --- |
| outlaw-caregiver | You never need to raise your voice. Everyone knows you could. | yes (unmarked) | keep | — | the rec ("Your gentleness is a decision you make over and over") doesn't lean on the anecdote, but it restates whoYouAre ¶2 ("You decide it, again and again"); the current line is observed behaviour |
| outlaw-creator | Nobody had to let you. It was good before they did. | yes (unmarked) | take rec | A locked door gets you moving; an open one makes you hesitate. | rec doesn't lean on the anecdote |
| outlaw-explorer | You'll jump off almost anything. As long as it was your idea. | yes (unmarked) | keep | — | the rec ("The drop only feels free when you chose the edge") is abstract and echoes "the one kind of helpless you choose"; the current line is concrete and funny |
| outlaw-hero | It's rarely your fight. That's never once stopped you. | yes (unmarked) | keep | — | the rec ("Helplessness frightens you more than trouble ever has") is a fear statement, not behaviour |
| outlaw-innocent | You can smell a fake from across the room. The real thing, too. | yes (unmarked) | keep | — | the rec leans on whoYouAre's promise and runs long; "The real thing, too" quietly sets up the proposal |
| outlaw-jester | Said straight, they'd stop you. So you make them laugh. | yes (unmarked) | keep, or alternative | You can get the whole table laughing at the rule, its author included. | the rec ("…past the head of the table") borrows whoYouAre ¶1's image. If the ¶2 fix is applied, the current line is fine; the alternative adds the upward aim |
| outlaw-lover | You love like it's a getaway. Even where you stop is a hideout. | yes (unmarked) | replace | Every time you've fallen for someone, you've also left somewhere. / You've never fallen for anyone without packing a bag. | the rec gives away the proposal |
| outlaw-magician | Everyone else keeps it going. You love it enough to end it. | yes (unmarked) | replace | You'd rather lose a tradition than watch it go through the motions. | the rec is acceptable (no anecdote) |
| outlaw-regular-guy | You know how things really get done. You also know what you'll never do. | yes (unmarked) | take rec | You know every back door and exactly which one you won't use. | rec doesn't lean on the anecdote |
| outlaw-ruler | Everyone sees the rebel. Nobody sees the plan. | yes (unmarked) | replace | You hear the next thing early, and quietly give it somewhere to go. | current echoes whoYouAre ¶2; the rec is acceptable |
| outlaw-sage | You'll argue the other side. Sometimes it's even yours. | yes (unmarked) | keep | — | the rec ("…except the one you keep hidden") is flatter; the current line is witty and true |

## Reversed pairs and siblings

- outlaw-caregiver / caregiver-outlaw (*Not Too Polite*): distinct. Quiet strength that stays vs the first voice that speaks. They share only the "didn't have to be brave" motif (proposal above).
- outlaw-creator / creator-outlaw (*Still Yours*): close but distinct. Both are about a thing you made being taken up. Here the fear is the authorities' yes (being owned), there it's the crowd's (being worn out). Different drinks (Speyside Old-Fashioned vs a Cosmopolitan riff).
- outlaw-explorer / explorer-outlaw (*Fine by Me*): distinct. Who decides the edge vs the "only if" taken as a way in.
- outlaw-hero / hero-outlaw (*No Promises*): distinct. Breaking an unfair rule in public vs never promising and always coming.
- outlaw-innocent / innocent-outlaw (*Fresh Air*): close. Both fear the gentle drift rather than force ("only your own good reasons, one after another" vs "someone kind might ask"), and both stories are refusals of "more". *Kept* stays distinct through the vigilance (smelling the fake, the promise checked) and the brandy and Chartreuse glass, and *Fresh Air* through contentment. No change proposed. Worth a sentence in Wren's swap notes.
- outlaw-jester / jester-outlaw (*Quote Me*): distinct. A disguised truth vs a blunt one. But see *No Accident* below.
- outlaw-lover / lover-outlaw (*Accomplices*): distinct. Love as escape vs mischief as a way to intimacy.
- outlaw-magician / magician-outlaw (*No Accident*, approved): distinct. Ending what you love vs rule-breaking as invitation.
- outlaw-regular-guy / regular-guy-outlaw (*Just This Once*): distinct. The fixer's private line vs being let off as proof of belonging.
- outlaw-ruler / ruler-outlaw (*Had to Be Serious*): close. Both stories are about succession (Maytag letting Anchor go, Maloney facing the protégés' book), and both proposals end in handing part of it to the next people ("Let the rest run in other people's hands" vs "Ask what they'd do instead, and give them something towards it"). They separate on the fear (what it turns into in hands that never got it vs becoming the old guard yourself) and in the glass (rye Sidecar with quince vs a Pimm's Cup with Peychaud's). Not interchangeable, but neither proposal should move any closer to the other.
- outlaw-sage / sage-outlaw (*On the Record*): distinct. Arguing the other side vs being the only one who won't pretend.
- **Siblings:** *With the Bite In* ¶2 vs the approved *No Accident* (same family) is the one sentence-level swap risk (proposal above). *Asked In*, *Kept* and *For Its Own Good* are three Old-Fashioneds in tumblers with near-identical peel instructions. The bases (Speyside malt with elderflower, Armagnac with yellow Chartreuse, grappa with Nebbiolo syrup) give a real difference in the glass, so no change. Proposal openings: "So, one proposal" / "So I'd never tell you" / "So my proposal is this" / "So let me steer" / "So here's my side": five "So…" openings in eleven. Not a breach, but the editor shouldn't add more. *Whoopee* ¶3's "That's you:" is close to the rationed "That's you, isn't it?" but isn't it, and nowhere else in the family uses it.
