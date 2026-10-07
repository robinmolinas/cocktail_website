# Family review: Innocent (2026-10-06)

Reviewer notes in one paragraph: the strongest family I've read for whoYouAre. The readings are full of observed behaviour (the smaller hand at the crossing, the birthday card that runs onto the back, the crumb on someone's chin, the bike you keep running), and every pour states its kindness plainly. The stories are well chosen and mostly niche in a good way (flor, Baudoinia, Vadrna's mail, Boadas's throw, Thoreau's apples), and the twist is tied to the story in words almost everywhere. What recurs: (1) **the tagline lifts its key words straight out of whoYouAre**. *Night Light*'s tagline is whoYouAre's opening sentence ("You were small too."), *Whole World*'s repeats "To anyone else it looks small", *Let's Try It*'s uses the "probably not" that also appears in whoYouAre and the proposal. So the first thing the guest reads after the name is a line they'll read again a moment later. (2) Three siblings carry the Innocent's fear as the same phrase, being "told off" (*The First Guess*, *There It Goes*; *Just So You Know* has "the truth was rude"). It's the right fear for the family, but the words could vary. (3) A pre-emptive hedge is the mechanism in *Let's Try It* ("probably not" first) and *The First Guess* ("you ask lightly, with a smile"), and it also appears in the reversed *Are You Quite Sure?* ("I think" first). They're distinct enough, but an editor shouldn't add a fourth. The two balance OUTs (*Night Light*, *Whole World*) are honest. The one real error is *The Way It Felt*'s allergen line.

## Matrix rows

| pairing | name | status | T | H | V | P | tagline | priority | top issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| innocent-caregiver | *Night Light* | flagged | ok: the OUT is honest; a fino core with vermouth around it is the Bamboo's shape and balance.py has no sherry-core style; syrup yield and keeping time given | ok | minor: "and it deserves saying out loud" announces the rule instead of just doing it | ok | change | P2 | tagline is whoYouAre's first sentence word for word |
| innocent-creator | *The Way It Felt* | flagged | major: `contains: []` / `veto_free: true`, but the live tool gives `nuts` (Coca-Cola, and so the Kalimotxo cubes). The strength OUT is honest: it's a wine-and-cola drink | ok: history about 49%, at the limit but within it | minor: y4 "so as it melts… so nothing waters it down" (two "so"s) | ok | alternative | P1 | allergen line contradicts the tool |
| innocent-explorer | *The First Guess* | draft | minor: method 1 "and it keeps" (Robin's rule is "last", not "keep") | minor: y2 "so it must live on something else too" is firmer than Oxford's "it is believed" | ok | ok | keep current | P3 | "it must" overstates a hedged source |
| innocent-hero | *Straight Up* | draft | ok: mango flagged nuts and named in the note; sugar adjustment for sweet borovičkas is a good touch | ok | ok | ok | change | P2 | tagline retells the mail anecdote; public/private formula |
| innocent-jester | *There It Goes* | draft | ok | minor (dossier only): anchor says "one regular remembered"; *Proper* p. 144 says Jason Crawley, a London bartender. The reading's "one bartender" is right | ok | ok | keep (optional alt) | P3 | anchors table contradicts the reading and the source |
| innocent-lover | *The Big Words* | draft | minor: y5 "a spoonful" for 7.5 ml | minor: history is y1–y3 (290 of 553 words) plus the 1945 recipe in y5, so just over half | ok | ok | keep | P2 | history slightly over half |
| innocent-magician | *Let's Try It* | draft | minor: the only substitute is "any Tasmanian single malt", dear and rare outside Australia (the dossier says so itself) | ok | minor: y3 "at their distillery": whose? | ok | change | P3 | tagline repeats "probably not" (whoYouAre and proposal) |
| innocent-outlaw | *Fresh Air* | draft | ok | ok | ok | ok: the Outsider's no is kind, not defiant; it reads true | change | P2 | tagline is the mass-contrast / public-private formula |
| innocent-regular-guy | *Four Shares* | approved | ok | ok | ok | ok | keep (approved) | none | approved pour; no error found |
| innocent-ruler | *Whole World* | flagged | ok: the dry-Martini sugar OUT is honest; tablespoon measures match the story and the method | ok: history about 51%, borderline (y3 is half story) | minor: y4 "Which drinks Boadas throws, I can't say" talks about the research | ok | change | P2 | tagline repeats whoYouAre's "To anyone else it looks small" |
| innocent-sage | *Just So You Know* | draft | ok | ok: the shared Regan card is owned in one clause ("He turns up more than once in my stories") | ok | ok | keep | none | no change |

## Revision proposals (ranked, most important first)

### innocent-creator · P1 · ground: Tomás · Robin
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens row
- **Current (verbatim):** `veto_free: true            # contains: []` and Checks: "**veto-free** (`allergens.py --check ""`: matches) … None is on the veto list"
- **Proposed:** `contains: ["nuts"]`, `veto_free: false`, and Checks: "Allergens: **nuts**, from the Coca-Cola (`coca_cola` is classified nuts in the ingredient table, on the safe side); the frozen cubes carry the same cola. Red wine fining ignored (STUDIO-RULES 4)." If Robin instead reverses the `coca_cola` classification in the table, the file stays as it is. Either way, the file and the tool must agree before this pour is shown.
- **Why it improves the pairing:** a guest who vetoes nuts would be shown this drink today. The rulebook says the classification must never under-state, so until Robin rules, the tool's answer is the guest-facing one.
- **Checks before applying:** Robin's ruling on `coca_cola` → nuts (open since batch outlaw); `allergens.py`; `lint_pour.py innocent-creator` (the ERROR clears); AD-4 floor count drops by one.

### innocent-lover · P2 · ground: Hester · Robin
- **Where:** `yours 3`
- **Current (verbatim):** "Brooklyn kept at it. Less than two months after Prohibition ended, a reader wrote to the *Brooklyn Eagle*: there's a Manhattan and a Bronx, so why not a Brooklyn? Recipes came in for weeks. In 1945 the Bronx borough president teased that Brooklyn still had no cocktail, …"
- **Proposed:** "Brooklyn kept at it. In 1945 the Bronx borough president teased that Brooklyn still had no cocktail, …" (the rest of the paragraph unchanged)
- **Why it improves the pairing:** history runs just over half (y1–y3 plus y5's 1945 recipe). The 1934 letter repeats the beat that 1910 and 1945 already make, so cutting it brings the reading under half without losing the laugh or the thirty-three recipes.
- **Checks before applying:** none factual (it's a cut). Keep the 1934 anchors in the dossier as "not in the reading".

### innocent-caregiver · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You were small too. You looked after them anyway."
- **Proposed:** options: "You're calm first and frightened later, once everyone's safe." / "You've been checking the little ones are all right since you were one of them."
- **Why it improves the pairing:** the current line is whoYouAre's first sentence word for word, so the guest reads it twice in ten seconds. The 2 October recommendation ("You learned to be brave by holding a smaller hand") repeats whoYouAre's "holding the smaller hand". Both options are behaviour that needs neither the flor nor the anecdote.
- **Checks before applying:** `registry.py` for taglines already taken; lint.

### innocent-hero · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else could see how far you'd come. You were the last to hear."
- **Proposed:** "You trust the work long before you trust the praise."
- **Why it improves the pairing:** the current line is the mail anecdote (Vadrna finding out last) in the Everyone/You public-private formula. The 2 October recommendation ("You trust the work sooner than the good news.") is the right direction, but "good news" is already in the closing line ("when good news comes, let it in first"). This version keeps the idea and drops the echo.
- **Checks before applying:** registry; lint.

### innocent-ruler · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "It looks small to everyone else. It's never been small to you."
- **Proposed:** options: "You've kept the same plant alive for fifteen years and you'd still call it nothing." / "Some things you've looked after every day for years, and you've never once called it effort."
- **Why it improves the pairing:** the current line is a public/private turn, and it repeats whoYouAre's "To anyone else it looks small". The options show the behaviour (daily tending, played down) without the reading's words.
- **Checks before applying:** registry; lint. Separately, the name split (1–1–1) is still Robin's: I'd back *Whole World*, which the reading earns in its last line ("nothing small is ever only small").

### innocent-outlaw · P2 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "Nobody quite believes you when you say it's enough. It is."
- **Proposed:** options: "Your life fits in one sentence, and you like it that way." / "You stepped out of the race quietly and never went back for the finish line."
- **Why it improves the pairing:** the current line is the collection's most common shape (Nobody… / short full-stop beat). The first option is the wedding scene's truth ("There isn't any rest") as plain behaviour, and needs no Thoreau.
- **Checks before applying:** registry; lint.

### innocent-caregiver · P3 · ground: Wren · routine
- **Where:** `whoYouAre` paragraph 2
- **Current (verbatim):** "Here's what that gives them, and it deserves saying out loud: the ones who grew up near you learned from you that the dark can be got through."
- **Proposed:** "Here's what that gives them: the ones who grew up near you learned from you that the dark can be got through."
- **Why it improves the pairing:** the clause names the studio's rule ("say the kindness out loud") instead of simply doing it. Robin's own versions just say it ("that's how you share that you care").
- **Checks before applying:** none.

### innocent-magician · P3 · ground: Wren · Robin
- **Where:** `tagline`
- **Current (verbatim):** "You always say \"probably not\" first. You never mean it."
- **Proposed:** "You can see it working out long before you'd dare say so."
- **Why it improves the pairing:** "probably not" is whoYouAre's phrase and the proposal's ("drop the 'probably not'"), so the tagline gives away the reading's key words. It's also a not-X-but-Y.
- **Checks before applying:** registry; lint.

### innocent-lover · P3 · ground: Tomás · routine
- **Where:** `yours 5`
- **Current (verbatim):** "mine has a spoonful of a dark, bittersweet Italian liqueur that tastes of burnt orange"
- **Proposed:** "mine has a bar spoon and a half of a dark, bittersweet Italian liqueur that tastes of burnt orange"
- **Why it improves the pairing:** the recipe says 7.5 ml, and "a spoonful" could be read as a tablespoon (twice that). "A bar spoon and a half" is Robin's own wording in *Before the Room*.
- **Checks before applying:** none.

### innocent-magician · P3 · ground: Tomás · Robin
- **Where:** recipe row 1, note
- **Current (verbatim):** "or any Tasmanian single malt, 40-46%; not cask strength"
- **Proposed:** "or any Tasmanian single malt, 40-46%; not cask strength. If Tasmanian whisky is hard to find where you are, any unpeated single malt aged partly in sherry or port casks makes the same drink in spirit."
- **Why it improves the pairing:** the dossier itself says Tasmanian malts are dear and hard to find outside Australia, and the rulebook says a niche bottle mustn't leave the guest feeling they could never make it. The story stays with Lark; the guest gets a way in.
- **Checks before applying:** Tomás to sweep `balance.py` at 40–46% for the fallback style; `allergens.py` (no change expected); Robin, because the room kept the Tasmanian-only substitute on purpose ("so the story stays").

### innocent-magician · P3 · ground: Wren · routine
- **Where:** `yours 3`
- **Current (verbatim):** "if somebody tastes whisky for the first time at their distillery, it should be a good first time."
- **Proposed:** "if somebody tastes whisky for the first time from the Larks' distillery, it should be a good first time."
- **Why it improves the pairing:** "their" could be Grant's distillery or the Larks'; the anchor means the Larks'. Clear before clever.
- **Checks before applying:** Hester to confirm against SB that Grant meant the Larks' whisky.

### innocent-explorer · P3 · ground: Hester · routine
- **Where:** `yours 2`
- **Current (verbatim):** "It feeds on the spirit that escapes ageing barrels, yet it's millions of years older than any barrel, so it must live on something else too."
- **Proposed:** "It feeds on the spirit that escapes ageing barrels, yet it's millions of years older than any barrel, so it's thought to live on something else too."
- **Why it improves the pairing:** Oxford (pdf 238) hedges it ("it is believed"). Owning the uncertainty also suits a guest whose whole joy is the open question.
- **Checks before applying:** none.

### innocent-explorer · P3 · ground: Tomás · routine
- **Where:** `method 1`
- **Current (verbatim):** "That makes enough for four drinks, and it keeps."
- **Proposed:** "That makes enough for four drinks, and it lasts."
- **Why it improves the pairing:** Robin's plain-verb rule ("it doesn't last", not "it doesn't keep").
- **Checks before applying:** none.

### innocent-ruler · P3 · ground: Wren · routine
- **Where:** `yours 4`
- **Current (verbatim):** "Which drinks Boadas throws, I can't say, so this one is mine."
- **Proposed:** "We don't know which drinks Boadas throws, so this one is mine."
- **Why it improves the pairing:** this is the same move Robin made in *Off Duty* ("Nobody I've read says…" → "We don't know…"): don't talk about the research.
- **Checks before applying:** none.

### innocent-jester · P3 · ground: Hester · routine
- **Where:** Anchors, `place` row (dossier only)
- **Current (verbatim):** "one regular remembered \"lots of orange plastic\", like \"a psychedelic spaceship\""
- **Proposed:** "Jason Crawley, a London bartender who moved to Australia, remembered \"lots of orange plastic\", like \"a psychedelic spaceship\""
- **Why it improves the pairing:** *Proper* pp. 143–144 introduce Crawley as "a London bartender who relocated to Australia". The reading's "one bartender remembered" is right. The anchor contradicts it, and the rulebook keeps the dossier in line with the reading.
- **Checks before applying:** none (verified against `a-proper-drink.md`, printed pp. 143–144).

## Taglines

| pairing | current | in 10-02? | verdict | candidate(s) | note |
| --- | --- | --- | --- | --- | --- |
| innocent-caregiver | You were small too. You looked after them anyway. | yes, unmarked | change (neither current nor rec) | "You're calm first and frightened later, once everyone's safe." / "You've been checking the little ones are all right since you were one of them." | The rec doesn't lean on the anecdote, but it repeats whoYouAre's "holding the smaller hand"; the current line is whoYouAre's first sentence. |
| innocent-creator | You never saw what was wrong with it. Nor did anyone it was for. | yes, unmarked | keep current, or alternative | "You'd rather give it today, lopsided, than perfect next month." | The rec ("looks like the feeling, not the instructions") is a not-X-but-Y and repeats whoYouAre's "It looks like how the thing felt" and the name. The current line is decent but echoes "You still don't see what was wrong with it". The alternative is plain behaviour. |
| innocent-explorer | Your questions are how everyone else starts looking. | yes, unmarked | keep current | none | The rec ("willing to guess wrong") leans on the Baudoin anecdote and repeats the name and the proposal. The current line is one clean sentence. |
| innocent-hero | Everyone else could see how far you'd come. You were the last to hear. | yes, unmarked | change (rec, adjusted) | "You trust the work long before you trust the praise." | The current line is the anecdote; the rec is right but collides with the closing line's "good news". |
| innocent-jester | You find it funny first. Then everyone does. | no | keep; optional alt | "Your laugh usually gets there before the punchline." | Concrete and true, but it's the "X first, then everyone" cadence shared with *Anyway* and *For Kicks*. The alt is the whoYouAre scene, said differently. |
| innocent-lover | You've never loved anything a little. | no | keep | none | One of the family's best: one sentence, behaviour, no echo. |
| innocent-magician | You always say "probably not" first. You never mean it. | no | change | "You can see it working out long before you'd dare say so." | The current line repeats whoYouAre's and the proposal's key phrase. |
| innocent-outlaw | Nobody quite believes you when you say it's enough. It is. | no | change | "Your life fits in one sentence, and you like it that way." / "You stepped out of the race quietly and never went back for the finish line." | Mass-contrast, public/private. |
| innocent-regular-guy | The world is kinder with you in it. | no | keep (approved) | none | Approved pour; not an error. |
| innocent-ruler | It looks small to everyone else. It's never been small to you. | no | change | "You've kept the same plant alive for fifteen years and you'd still call it nothing." / "Some things you've looked after every day for years, and you've never once called it effort." | Public/private, and it repeats whoYouAre's "To anyone else it looks small". |
| innocent-sage | You tell people what you'd want to be told. | no | keep | none | Strong; close to whoYouAre's "what you'd want, if it were you" but not the same words. |

## Reversed pairs and siblings

- **innocent-caregiver / caregiver-innocent** (*Night Light* / *Before the Room*): distinct. Both have a calm person at the centre, but *Before the Room* is about the wants hidden behind the calm ("say the window"), and *Night Light* is about the frightened child inside the calm ("tell them you were scared too"). The drinks are far apart (fino stirred vs a cassis-basil sparkler).
- **innocent-creator / creator-innocent** (*The Way It Felt* / *Half a Rim*): distinct. One adds nothing and corrects nothing; the other cuts until it's spare. They even answer each other.
- **innocent-explorer / explorer-innocent** (*The First Guess* / *In a Minute*): distinct, though both are stirred, Martini-shaped and curious. Asking out loud vs stopping to look are different behaviours, and the bottles (Cognac region vs Madeira and rum) differ in the glass.
- **innocent-hero / hero-innocent** (*Straight Up* / *Work It Out*): close in theme, both about proof and not believing you've arrived. The stakes differ: *Straight Up* fears being thought a cheat and checks good news for the catch; *Work It Out* waits for someone to hand over the answer. Acceptable; don't let either borrow the other's "prove" words.
- **innocent-jester / jester-innocent** (*There It Goes* / *Off the Tour*): see `reviews/jester.md`. Distinct: the laugher vs the storyteller nobody believes.
- **innocent-lover / lover-innocent** (*The Big Words* / *Wide Open*): distinct. Loving out loud in public vs loving again after hurt. The *Wide Open* fence on "reply-now / careful / hurt" is respected.
- **innocent-magician / magician-innocent** (*Let's Try It* / *More Than One Head*): both highballs (signals flags it). Distinct in the glass (still whisky and water vs a strawberry-lemon cordial highball) and in the person (keeping hopes for others vs worrying it will work).
- **innocent-outlaw / outlaw-innocent** (*Fresh Air* / *Kept*): distinct. Both say no, but *Fresh Air* says it to a bigger life and stays kind, while *Kept* says it to keep a promise to the person you'd never become.
- **innocent-regular-guy / regular-guy-innocent** (*Four Shares* / *Good as It Is*): distinct.
- **innocent-ruler / ruler-innocent** (*Whole World* / *Say So*): both Martinis (signals flags it). Distinct: a plain, thrown two-bottle Martini for someone who tends small things vs a vermouth-heavy Martini with Tokaji for someone who asks for wonderful. The experiential difference is real.
- **innocent-sage / sage-innocent** (*Just So You Know* / *Are You Quite Sure?*): distinct. Telling the truth to someone vs knowing it and being doubted.
- **Inside the family:** (1) "told off" carries the Innocent fear in *The First Guess* ("a few of your questions got you told off") and *There It Goes* ("being told off for it so often that one day you stop"). Fine for now, but no new Innocent pour should use the phrase. (2) The pre-emptive hedge (*Let's Try It*'s "probably not", *The First Guess*'s "as if it hardly matters") sits close to the reversed *Are You Quite Sure?*'s "I think". (3) "Here's what that gives them, and it deserves saying out loud" (*Night Light*) and "Your way does something for people, and someone should tell you" (*Fresh Air*) both announce the kindness before giving it. *Fresh Air*'s reads naturally and can stay; *Night Light*'s is proposed above. (4) Outside the family, *Just So You Know* sits at 0.94 to *On Their Behalf* (both bourbon sours in a stemmed glass, both bartender's-learning stories): different in the glass (plain sour with pressed sugar vs curaçao, vermouth and soda) and in the person. Acceptable.
