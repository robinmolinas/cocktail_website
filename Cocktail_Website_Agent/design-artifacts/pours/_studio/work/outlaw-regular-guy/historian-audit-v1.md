# Fact audit v1: outlaw-regular-guy, reading v1 (Wren, round 3)

Hester, round 4, 2026-10-01. Cards: `fact-cards/roy-olmstead.md` (F#), `fact-cards/embury-canadian-maple.md` (E#). Sources: HL (HistoryLink 4015), LII (277 U.S. 438), FJC (Hamm 2010), KATZ (389 U.S. 347), Oxford pdf 1226. Each fix has an ID and old → new.

## Fixes
| id | where | old | new | why | severity |
|---|---|---|---|---|---|
| A1 | y1 | "In 1920, Roy Olmstead was the youngest lieutenant in the Seattle police when he was caught…" | "Roy Olmstead had been the youngest lieutenant in the Seattle police. In 1920 he was caught bootlegging Canadian whisky and dismissed." | HL gives "youngest Lieutenant on the force" at his 1919 promotion; nothing dates it to March 1920. A superlative pinned to a date is a claim. | minor |
| A2 | y2 | "in a trade that was turning to hijacking" | "in a trade that was dangerous and often violent" | HL scopes the hijacking to the bootleggers *his* low prices put out of business, so "the trade was turning to it" overgeneralises (and hides that he helped cause it). HL calls rumrunning "an inherently hazardous and violent endeavor". | fix |
| A3 | y2 | "He told them he'd rather lose a shipment than a life." | "Better to lose the liquor than a life, he told them." | Your words are almost HistoryLink's sentence verbatim ("He told his men he would rather lose a shipment of liquor than a life"). The fact stands (two secondaries agree on the substance), but this is the our-words rule. | fix |
| A4 | y2 | "in 1928 the Supreme Court let the evidence in, five votes to four" | "in 1928 the Supreme Court ruled, five votes to four, that the evidence could stand" | The trial court let it in. The Supreme Court upheld the conviction and ruled the evidence could be used (LII). | minor |
| A5 | y3 | "officials should be held to the same rules they command of everyone else" | "officials should be held to the same rules the law commands of everyone else" | Brandeis: officials "shall be subjected to the same rules of conduct that are commands to the citizen". The commands are the *law's*. "They command" makes the officials the rule-makers, which Brandeis doesn't say. | fix |
| A6 | y4 | "the Manhattan, the great stirred classic" | "the Manhattan, a renowned stirred classic" | "The great" is a superlative (the Martini has an equal claim). Keep the renown, drop the ranking. Re-audit y4 against Tomás's spec. | minor |

## Wren's four wordings
1. **"caught bootlegging Canadian whisky" (F2): PASS.** HL: his gang was unloading Canadian whiskey at Meadowdale on 22 March 1920. He escaped the roadblock but was identified, surrendered and pleaded guilty. FJC p. 34: "caught by federal agents while unloading illegal Canadian liquor". "Caught" is FJC's word.
2. **"tapped his phones": PASS.** LII (Taft): four federal prohibition officers tapped the lines from the homes of four petitioners and from the chief office. HL: several telephones "including Olmstead's home". So the phones were his home's and his business's.
3. **"the biggest bootlegger on Puget Sound": PASS.** HL's lede: he "became the biggest bootlegger" (in Seattle's dry years), and the Seattle press called him "King of the Puget Sound Bootleggers". HL's lede says "biggest bootlegger"; I'm the one who added "on Puget Sound", from the nickname. FJC: "His organization soon dominated" Seattle's supply. Defensible as is.
4. **"officials should be held to the same rules they command of everyone else": FIX, see A5.**

## Sentence checks that pass
- y1 "as an officer, he'd taken bribes" (FJC pp. 7, 29: F3). "he was the one paying them" (FJC p. 7, LII facts: F4). "Soon" is FJC's ("soon dominated").
- y2 "his men weren't allowed to carry guns" (HL; HW, F6). Scoped to his men, correctly. "wiretapping was a crime in Washington State" (LII: 1909 statute, a misdemeanor, quoted by the majority itself; Brandeis: "wire tapping is a crime", F11). "five votes to four" (F14).
- y3 "a government that breaks the law breeds contempt for it" is Brandeis (LII), paraphrased. FJC credits it to Holmes, and that's FJC's slip. "Nearly forty years on, the Court came round to the dissent on wiretaps": *Katz*, 18 Dec 1967, 39 years. Note: Katz's majority never cites Brandeis's dissent (it cites only Warren & Brandeis 1890). It reached the dissent's view in substance and held that such listening is a search. So "came round to the dissent" is fair, but **never "adopted Brandeis's dissent"**. "he'd enforced the rules while letting himself off" (F3). "his men knew exactly where his line was" is inference from "he told his men", and it's fine as it stands. Don't add anything else they "knew".
- y4 "the kind of whisky that filled his cases: Canadian" (HL: "nearly 100 cases of Canadian whiskey", 1920; "200 cases of Canadian liquor" daily). "Maple can take over a drink if you let it" (Oxford pdf 1226, Soole: "can dominate a drink"). "for the country the whisky came from" is our gesture and makes no Embury claim (E2: his Canadian has no maple). It's consistent with the card. That maple stands for Canada isn't sourced in the library; it's common knowledge, labelled ours. **Pending:** "a strict measure, and not a drop more" holds only if the spec gives an exact measure (never "to taste"). Re-audit when Tomás's spec lands.
- **Epigraph: PASS.** "A century ago" (1920s). "On both sides of it" rests more on F3/F4 (the police, on the law's side, took his money) and F5 (FJC: he broke Canadian law with forged papers, which covers the border reading too) than on F11. The agents broke state law to *catch* the whisky, not *for* it. Both readings of "both sides" (the law, the border) are true. The dossier should cite F3, F4 and F5.
- Tagline, whoYouAre, y5: no historical claims.

## Name
My pick: ***Your Word***. *Where You Stand* would be the registry's third "stand" name (*Standing By*, *Left Standing*). It's not a lint fail, but it's a family echo, and whoYouAre already says "where they stand". *Your Word* is what y5 lands on, and it's rooted in the one thing on the record: a rule he told his men. Second choice: *Where You Stand*.

## Verdict
Not yet: A2, A3 and A5 to fix (A1, A4 and A6 are minor), and y4 to re-audit against the spec.
