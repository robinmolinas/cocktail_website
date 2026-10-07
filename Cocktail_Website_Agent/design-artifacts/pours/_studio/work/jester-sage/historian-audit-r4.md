# Fact audit r4 (step 2): jester-sage (The Cynic)

Audited as they stood on 2026-10-04, round 4 step 2: `psychologist-reading-v2.md` (Wren), `mixologist-draft.md` (v1.2) and `_studio/specs/jester-sage.json` (v1.1) (Tomás). Card: `fact-cards/charles-k-field-hotaling-verse.md`, with G3 rewritten this round. Anchors were fixed in the same call (lineage row and turn row; see A1).

## r3 fixes: landed?

| ID | Status |
|---|---|
| R1 epigraph | Landed: "A four-line poem about San Francisco's 1906 fire ends on whiskey." **Passes** (the verse's last word is "whiskey"; the fire is dated, the poem isn't). |
| R2 y1 | Landed. **Passes.** |
| R3 y1 | Landed as "came through the disaster" ("it" would have pointed at "deserved it": a good catch). **Passes.** |
| R4 y2 | Landed as "still quoting it today, a hundred and more years on". **Fails, and the fault is in my own R4** (see F1). |
| R5 y5 | Landed: "Two-thirds of what I pour in" (60 of 91.6 ml, 65.5%). **Passes.** |
| R6 y5 | Landed. **Passes.** "Running all through it" is true too. |
| R7 y5 | Landed: "the hope Field sent out under another name, with no face on it". **Passes** (OAC: no press pictures; WP: the pseudonym). |
| D2 spec | Landed: "(Codex p. 65: spirit plus aromatized wine), stirred". **Passes.** |
| D3, L-a | Landed in draft and spec: scoped to the family, and no year for the dry Manhattan. **Passes.** |

## Remaining fixes, old → new

**The strongest point: two spans in the reading are measured from the poem, and the poem's year is on no page (card L6).** Both are my fault: r2 gave "more than twenty years later", and r3 R4 gave "more than a century later". Each measures from the poem. Measure from the fire instead, which is dated.

| ID | Owner | Where | Old | New | Why |
|---|---|---|---|---|---|
| F1 | Wren | yours 2, last sentence | "People are still quoting it today, a hundred and more years on." | "People were still quoting it a hundred and more years after the fire." | "a hundred and more years on" measures from the poem's undated birth. And "today" is a present-tense claim resting on a 2024 page: past tense, dated from the fire, is what Minnick 2024 supports (118 years). 4-grams checked against every pour .md and the registry: no hits on "years after the fire", "a hundred and more years" or "and more years after". |
| F2 | Wren | yours 3, s2 | "Twenty-one years later, from 1927 to 1940, Field was" | "Two decades after the fire, from 1927 to 1940, Field was" | "Later" follows the verse paragraph, so it measures from the poem (undated). And from the fire, "twenty-one years" needs *Cheerio*'s start month, which isn't on my record (April 1906 to early 1927 is twenty). "Two decades" holds either way. No 4-gram hits ("two decades after the", "decades after the fire"). |
| F3 | Wren | Notes, y2 row | "y2 \"still quoting it today, a hundred and more years on\" (rests on MIN 2024; never \"at once\", L2)" | "y2 \"were still quoting it a hundred and more years after the fire\" (MIN 2024, 118 years after 1906; the poem's own year is on no page, L6; never \"at once\", L2)" | Follows F1. |
| F4 | Wren | Notes, y3 row | "y3 \"Twenty-one years later\" (1906 → 1927, G3), 1927 to 1940" | "y3 \"Two decades after the fire\" (1906 → 1927, measured from the fire, G3), 1927 to 1940" | Follows F2. |
| F5 | Wren | Notes, y5 row | "\"a classic Martini\" = the shape (Codex Martini family), " | (delete) | y5 no longer says "a classic Martini". A stale reason in the Notes is a dropped claim kept. |
| F6 | Wren | header paragraph, citation only | "passive verbs for *Cheerio*'s photographs and fee; \"more than twenty years later\"." | "passive verbs for *Cheerio*'s photographs and fee; spans measured from the fire, never the poem (G3)." | Stale. Citation only. |
| F7 | Tomás | draft line 3 and spec `version`, citation only | "Charles K. Field's 1906 Hotaling verse" | "Charles K. Field's Hotaling verse on the 1906 fire" | The verse's year is on no page (L6). My own card title had the same slip, now struck. |

## Everything else, sentence by sentence: passes

- **Title block.** The tagline and the name carry no facts. The epigraph passes (R1).
- **whoYouAre.** It holds no historical claims and no profession, and it isn't about alcohol.
- **y1.** Passes: Minnick has the clergy claim (F4), and the warehouse survived thanks to its staff, the fire department and the Navy (F5). "A city that had just lost so much was told it had deserved it" is a fair gloss of "divine retribution for the city's sins", with no toll and no ruins.
- **y2.** The verse is V1 word for word, with the same line breaks as my record. "Is credited with" holds (F10). The faith lines read as the bartender's own reading ("I love that…").
- **y3.** From 1927 to 1940 (OAC; WP citing *A to Z of Old Time Radio*); NBC; "poetry and inspirational talks" (OAC "lectures"); "a made-up name: Cheerio" (WP); both clauses passive (OAC); "remembered as his" / "under another name"; "I like to think he wanted it that way". All pass. Only the span needs fixing (F2).
- **y4.** Interpretation, framed as mine ("I think you'd understand him").
- **y5.** "Already on record in the 1800s: a Manhattan made with dry vermouth" passes: both 1884 (Oxford pdf 1244) and 1891 (*Imbibe!* pdf 194) fall in the 1800s, and no year is given. Against the method, word for word: stirred with ice (step 4); no ice in the glass, chilled (steps 2 and 5); "two-thirds of what I pour in" (65.5%); "just two dashes" (spec); the oil, then the peel comes out (step 6); "one and a half teaspoons" = 7.5 ml; "a ripe pear, left overnight in sugar" (syrup recipe); "nothing on the glass" (image brief). "Till the mixing glass frosts" is a fair picture of "until the outside is very cold" (a jar frosts too). All pass.
- **y6.** Position only.
- **Lint warnings.** `[yours 3]` "his" and `[yours 4]` "him" both refer to **Charles K. Field (1873–1948), a historical person** (card F1), never the guest. Accept both.
- **Draft v1.2 and spec v1.1.** The Checks hold: Codex p. 65; Matrix pdf 196, scoped to the family; the pear is in no other pour; bourbon is labelled as a choice; Old Potrero is never named; the birch-pollen note is labelled unsourced; 60 of 90 ml poured in ≈ 46% finished (60/131.1). Image brief: an unbranded 1930s radio fits *Cheerio* 1927–1940 (F12–F13), and nothing on the radio names anyone. The closing line matches step 6, which is the last step. All pass apart from F7.

## A1: anchors, fixed in this call
- lineage row: "still retold more than a century later" → "still being retold more than a hundred years after the fire".
- turn row: "More than twenty years later, from 1927 to 1940" → "Two decades after the fire, from 1927 to 1940".
- Card G3 rewritten: every span is measured from the fire. My r2 and r3 spans are struck as mine.

## Status
No wrong fact and no drink problem. There are seven wording fixes: F1–F6 for Wren and F7 for Tomás. F6 and F7 are citation-only. Once they land as quoted, I'd put my name to this.
