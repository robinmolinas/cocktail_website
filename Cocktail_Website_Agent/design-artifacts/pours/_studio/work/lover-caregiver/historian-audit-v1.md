# Fact audit v1: lover-caregiver (The Geisha)

Hester, round 5 (2026-09-30). Audited: reading v1 (`psychologist-reading-v1.md`), drink draft v1 (`mixologist-draft.md`: recipe notes, method, closingLine, Checks, names) and spec `specs/lover-caregiver.json`, against `fact-cards/orsamus-willard.md` (F1–F17, C1–C3). Also read on the page this round: *Imbibe!* pdf 138 (Apple Toddy), Oxford TODDY pdf 2034, *Codex* pp. 38 and 201.

**Verdict: FAIL, on six fixable items (A1–A6).** Everything else passes. None of the fixes touches the drink's numbers.

## Must fix

| # | where | claim as written | label | source | verdict and fix (the words are Wren's / Tomás's) |
| --- | --- | --- | --- | --- | --- |
| A1 | epigraph | "The captain who wrote this recipe down said its maker never forgot a face." | fact (overstated twice) | Alexander 1833 vol. 2 p. 300; *Imbibe!* pdf 138 | **Fail.** (1) "this recipe": our glass changes the sugar, so the captain didn't write down *this* recipe (see the pitfall on a cold epigraph's pronoun). (2) "its maker": Willard isn't the Apple Toddy's maker in the sense of inventor. Its earliest citation is a 1792 comedy (*Imbibe!* pdf 138), the year he was born. The captain gives it as "says Mr. Willard… is thus made": Willard's recipe, not his invention. Fix it along these lines: *"A captain once wrote down how this was made, and said the barman who told him never forgot a customer's face."* Whatever the words, the drink must sit one step back from "this recipe", and the man must be the one who made it or told it, never "its maker". "A face" for "the face of a customer" passes if the rest is fixed. |
| A2 | y2 s1 | "He almost never left the hotel, and he'd do anything he could to make a guest comfortable." | told as fact; Oxford files it among the **stories** told of him | Oxford pdf 2193 ("no shortage of stories of his eccentricities—how he almost never left the hotel, how he would do anything possible…") | **Fail (signpost).** "People told a story about him" in y1 doesn't carry into a new paragraph (pitfall, *Off-Label*). Fix: open y2 with the same frame: "They said he almost never left the hotel…" or "The stories say…". "Make a guest comfortable" for "accommodate a guest's desires" passes as plain words. |
| A3 | y4 s1 | "One person he served did write him down." | fact (false by scope) | Oxford pdf 2192–94 bibliography and text: the *London Morning Post* (1829), a British traveller, Charles Augustus Murray (1839), a Buffalo reporter (1851); *Imbibe!* pdf 20 ("one patron recalled") | **Fail.** After "no book and no account of his own life", "one person… did write him down" reads as the only one, and several people wrote about him. What's true is narrower: he wrote nothing himself, and a guest wrote down his recipe. Fix: *"A guest did write down one thing of his."*, or start straight in with "A British army captain who drank at his bar…". |
| A4 | y4 s2 | "…the Apple Toddy, a drink so loved in America for over a century that it stood for the country itself, and then all but vanished." | fact (overstated) | *Imbibe!* pdf 138 | **Fail (soften).** The page: loved "from the beginning of the Republic… until the turn of the last century" (over a century passes), and "before the Mint Julep and the Cocktail assumed the role it was so popular that it was **something of** a signifier of Americanness." So it was only *something of* a sign, and only *early on*, before the julep and the cocktail took the role, never for the whole century. "Stood for the country itself" is two steps stronger. "All but vanished" passes ("disappeared with scarcely a trace", pdf 138; "seen no more" after Repeal, pdf 139; Oxford TODDY pdf 2035 still has modern examples, so "all but" is right). Fix: *"…a drink Americans loved for over a century, for a while almost a sign of being American, and then all but forgotten."* |
| A5 | y4 s3 | "The cocktail I've made for you follows Willard's:" | fact (overstated by the spec) | Spec: sugar 6 g against Willard's fourth part (Tomás's Checks) | **Fail.** The sugar leaves his fourths, so: *"is made after Willard's"*. The list after the colon then passes: roasted, wet paper, brandy, water, "a little sugar" (true of ours; the "little" is our change), one lump of ice. |
| A6 | draft, recipe note (apple) | "wrapped in wet brown paper and roasted until completely soft, then cooled, as Willard's own recipe has it" | fact (scope) | Alexander p. 300 | **Fail (scope; Tomás's).** "Then cooled" isn't on the page, and neither are "peeled and cored" in the same row. Willard gives: rolled in brown paper wetted with water, buried in live embers "till they are thoroughly roasted and quite soft". Fix: *"wrapped in wet brown paper and roasted until soft, as Willard's page has it; then cooled"*. |

## Softer notes (fix if you agree; not blocking alone)

| # | where | note |
| --- | --- | --- |
| N1 | y2 s2 | "it took a historian a great deal of digging to find even the basics" is sourced (*Imbibe!* pdf 22, paraphrased), but it talks about the research, which Robin's 2026-09-30 rule asks us not to do ("Nobody I've read says…" → "We don't know…"). An option that's still true: *"Even the plain facts of his life are hard to find."* "He left no book": Wondrich says "no book of recipes or biographical sketch". "No book" passes, since nothing he wrote is known. |
| N2 | draft, sugar note | "Willard used as much sugar as brandy": true by his fourths, but the page doesn't say whether it's by weight or by volume. "More than four times too sweet" is a modern judgement from `balance.py` (30.6 vs 7.0 g/100 ml). Better: "more than four times the sugar of a balanced drink today". |
| N3 | draft, Checks (Pairings) and names | "the only recipe on record in Willard's own reported words" and "The Fairest Apples: from Willard's own page". **Both are my round-3 shorthand, and I'm striking them.** Of the recipes his entries name, it's the one given in his reported words ("says Mr. Willard", Alexander p. 300; the others are credited to him by Wondrich, C3). Other records aren't ruled out. The page is the captain's, not Willard's: "the captain's page, in Willard's reported words". Neither is in the reading, so this is dossier-only. |
| N4 | method | Wren's y4 says "nearly all of it happens before anyone arrives: the apples roast, cool and wait". That's true in every version of the method, since the roasting and cooling always come first. If Tomás makes the jug (steps 2–3 ahead) the default rather than the option, the whole line holds even more plainly. |

## Passes

| where | claim | label | source |
| --- | --- | --- | --- |
| y1 s1 | back when hotel guests checked in at the bar, the City Hotel's desk clerk and bartender were the same man, Orsamus Willard | fact | Oxford pdf 2192 ("those were one and the same job: hotel guests checked in at the bar"); *Imbibe!* pdf 20 |
| y1 s2–4 | People told a story…: a guest sailed to England, stayed ten years, walked back into the bar; greeted by name, old room number remembered | fact that a story was told; signposted | Oxford pdf 2193 (F4) |
| y2 | he left no book and no account of his own life | fact | *Imbibe!* pdf 22 (F11) |
| y2 | when he went home to Massachusetts, his house had a number on every room door | fact; undated as ruled (C1) | Oxford pdf 2193–94; *Imbibe!* pdf 22 ("retired back home") (F6) |
| y2 | I like to think he was still getting rooms ready… | our reading, signposted | — |
| y3 | "Not the famous memory." | our reading | — |
| y4 | a British army captain who drank at his bar printed a few recipes in his travel book, and gave one of them to Willard by name: the Apple Toddy | fact | Alexander 1833 p. 300 (the numbered list: Cocktail with Sling, Mint Julep, Apple-toddy); *Imbibe!* pdf 175 (Willard mixed for him); C3 |
| y4 | the best apples rolled in wet paper and roasted until soft | fact (plain words for "fairest"; he buried them in embers, we use an oven, and the reading doesn't say how) | Alexander p. 300 |
| y4 | the grape brandy the historian David Wondrich believes Willard preferred | attributed | *Imbibe!* pdf 139 |
| y4 | "I kept it that way as a nod to you…" | our reading; the twist tied to the story in words (Robin's rule) | — |
| y5 | the position (ask) | ours; nobody in the story is pinned with the ask ("lured" out) | — |
| method 1 | Willard buried his in the embers of a fire | fact | Alexander p. 300 ("bury them in live embers") |
| method 1 | wet brown paper; 180°C for 30–45 min; half an apple per drink | method (Wondrich's modern notes), not a claim about Willard | *Imbibe!* pdf 139 |
| brandy note | "Willard's page says only brandy; Wondrich reads it as the grape brandy he preferred" | fact + attribution | Alexander p. 300; *Imbibe!* pdf 139 |
| Checks | toddy = Old-Fashioned with water swapped in (Codex p. 38); cold toddies, called slings; with bitters a Cock-Tail (Oxford TODDY pdf 2034); a Highball can be still (Codex p. 201) | fact | read on the page this round |
| closingLine | "Put the apples in, then call the one you're hoping will come." | instruction; no fact claimed | — |
| image brief | guest register, brass room-number plate, ember glow | imagery; no claim | — |

## Guards re-checked (all hold in v1)
No dates at all in the reading (C1). The captain is never "Alexander". No Cato, "lured", julep, ice pioneering, photographic memory, titles, death or grave. Hot toddy is out. Only the Apple Toddy is credited to Willard. The unused first name is dossier-only.

## Anchors
Updated in the same call (v2): hot row struck (cold ruled r4), "the only recipe in his own voice" never in the table; epigraph fence added.
