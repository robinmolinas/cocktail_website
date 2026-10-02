# Fact audit v2: ruler-sage (The Judge), round 4 step 2

Audited as the files stand: `psychologist-reading-v2.md` (title block, whoYouAre, yours y1–y5, Notes), `mixologist-draft.md` and `specs/ruler-sage.json`. Card: `fact-cards/whisky-commission-1908.md` (F1–F12; F10–F12 added this round). Anchors v3 follow this audit.

## Sentence by sentence
| line | sentence (short) | verdict | source / note |
|---|---|---|---|
| epigraph | whisky in this glass that rival distillers once insisted wasn't whisky | pass | F2 (pdf 2149, "heated debate"); blended Scotch carries grain whisky (F11, pdf 2132, 209) |
| whoYouAre | (no historical claims) | pass | |
| y1 | "For decades, Scotland argued about a word." | **fix A1** | "decades" holds (1830s to 1908; Dublin's 1878 pamphlet, F12). "Scotland" doesn't: pdf 2149 names no country, and the loudest pot-still voices on the page are the Dublin distillers (pdf 541) |
| y1 | 1830s, Lowlands, a new still that could run without stopping; light, pure, cheap enough for city factory workers | pass | F1 (pdf 2149). "run without stopping" is a fair plain gloss of "continuous" |
| y1 | malt makers, old pot stills, said it wasn't whisky at all | pass | F2 |
| y1 | "They had age and tradition on their side." | pass | pdf 70 calls them the makers of "traditional whiskies"; age follows from the 1830s start of grain whisky (F1). Notes: add pdf 70 |
| y1 | "The grain side had the money: by 1877 six of the biggest grain distillers had joined forces." | **fix A2** | pdf 666 gives size ("largest"), not money, and says "conceived in 1877" (a date, not "by"). "The money" was my own r2 shorthand ("the bigger business"), so the error is mine |
| y2 | 1908, a British commission, evidence in person from across the trade | pass | F6 (pdf 317, 1697, 875); gin, rum and genever witnesses support "across the trade" |
| y2 | "Where it landed was plain." + the definition, no still named | pass | F5 (secondary, four books). The paragraph gives no year for the definition, so C2 holds |
| y2 | "The new spirit was whisky." | pass | F4, F5 |
| y2 | "Blending stayed legal, and there were rules now for what a label could claim." | pass on "stayed legal" (legal since 1860, F10, pdf 284); **fix A3** on "there were rules now" | Oxford says the commission set "labeling requirements" (pdf 70). Whether and when they became law isn't on any page I've read (C2), so tell what the commission did |
| y3 | "That settled the law, not the argument." | pass | F3 ("legally, anyway") |
| y3 | decades of marketing; the older whisky as the real one has largely won people over | pass, scoped | F8 (pdf 70). The sentence is general and names no country, which fits Oxford's US-plus-Scotch scope. Keep it general |
| y3 | "The ruling stood anyway." | pass | F9 (the category is current) |
| y3 | "the call made on what was true, not on which side was more charming or more powerful" | **fix A4** | A motive for the commission that no page states. The call also went the larger side's way (F7), so "not on which side was more powerful" reads as a claim about its reasons |
| y3 | "I like to think the people it looked after most weren't in the room…" | pass | signposted (R2) |
| y4 | Old-Fashioned among the most renowned classics | pass | Codex p. 2 ("found in almost any respectable cocktail book") |
| y4 | "blended Scotch: malt and grain whisky together, the very thing that argument was about" | pass on the blend (F11); **fix A5** on "the very thing" | The argument was whether the grain spirit was whisky (F2), not about blends as such |
| y4 | "Only the sugar is different." | pass | Codex p. 2: spirit, sugar, bitters, water. The Scotch is named in the sentence before |
| y4 | barley malt, "the one thing the commission's definition said every whisky needs, whatever still it came from" | **fix A6** (this is the definition line Tomás asked me to audit) | The definition asks for cereal grain, distilled, with its starch turned to sugar by malt (F5). Malt is one requirement, not "the one thing". "Whatever still" passes (no still named) |
| y4 | "The malt makes it rounder and warmer than plain sugar would." | Tomás's taste call, not a fact | his maltose note is flagged unsourced in Checks. Fine as a taste line |
| y4 | Angostura; heavy glass packed with ice; orange peel squeezed above last, for its scent | pass | Method 2–4, word by word. Bitters go in with the syrup (step 2), and "as well" doesn't order them |
| y5 | (position, no facts) | pass | |
| closingLine | "Stir until you can't see the malt…" | pass | Method 1 ("until no streaks are left") and 2 |
| draft, Checks: Allergens | "The definition's one requirement is malt" | **fix A7** | same scope fault as A6 |
| draft, Checks | "no new vetoes" was about categories | pass | Robin's 2026-09-30 note lists celery, sulphites, quinine, caffeine and wheat glucose. Gluten is an existing veto, and undistilled malt is `gluten` by STUDIO-RULES check 4 |
| draft, recipe | "any blend, 40-43%: malt and grain whisky together" | pass | F11 |
| draft, fallback | saffron colour in alcohol | pass | pdf 1072. "Equally" must not return (corn, pdf 88) |
| draft, Pairings | malt on the Grain wheel; citrus a best pairing | pass | Matrix pdf 137, 136 |
| spec `version` | "after the definition on card F5 (… no still named)" | pass | |
| Notes y1 / y4 | age and tradition: F1/F2; "malt is the one thing" | **fix A8** (citation-only) | add pdf 70 to the y1 row; reword the y4 row as in A6 |

## Fixes, old → new
- **A1** (y1) "For decades, Scotland argued about a word." → "For decades, distillers argued about a word."
- **A2** (y1) "The grain side had the money: by 1877 six of the biggest grain distillers had joined forces." → "The grain side had the size: in 1877, six of the biggest grain distillers joined forces."
- **A3** (y2) "Blending stayed legal, and there were rules now for what a label could claim." → "Blending stayed legal, and the commission set out what a label could claim."
- **A4** (y3) "That will be familiar to you: the call made on what was true, not on which side was more charming or more powerful, and then held, liked or not." → "That will be familiar to you: a call that went against the side with age and tradition, and then held, liked or not."
- **A5** (y4) "malt and grain whisky together, the very thing that argument was about." → "malt and grain whisky together, the two whiskies that argument was about."
- **A6** (y4) "I sweeten it with a syrup made partly from barley malt, the one thing the commission's definition said every whisky needs, whatever still it came from." → "I sweeten it with a syrup made partly from barley malt, which the commission's definition asked of every whisky, whatever still it came from."
- **A7** (draft, Allergens) "The definition's one requirement is malt" → "The definition requires malt in every whisky (alongside cereal grain), whatever the still"
- **A8** (Notes) y1 age/tradition row: add "pdf 70 ('traditional whiskies')". y4 row "malt is the one thing the commission's definition said every whisky needs" → "the definition asks for malt in every whisky; no still named (F5, secondary)".

## Anchors
Anchors v3 written in this same call. The counterweight row now says "larger" (A2), the honey and saffron rows are moved to "fallback only", and malt, blend and 1860 rows are added (F10, F11). No anchor holds a claim the reading dropped.

## Verdict
Every claim is sourced or signposted once A1–A8 land. A1–A6 are Wren's words, A7 is Tomás's, and A8 is citation-only. Nothing in the drink changes. The gluten edge is a fact either way. Which version goes ahead is Robin's call, and I'd sign either one. I'll check A1–A8 against the files in round 5, not against the reports.
