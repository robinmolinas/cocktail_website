# Fact audit r4 (step 2): jester-ruler, reading v2 + drink v3 (Hester)

Audited as they stand: `psychologist-reading-v2.md`, `mixologist-draft.md` (v3), `_studio/specs/jester-ruler.json`. Pages re-read for this pass (r2/r3 calls, same pages): Oxford RICKEY pdf 1661–1664, SHOOMAKER'S 1789; *Imbibe!* 117–119. Card `george-williamson-joe-rickey.md`. IDs carry old → new. Owner named on each.

## Fixes still to land

| ID | Owner | Where | Old | New | Why |
|---|---|---|---|---|---|
| **L1** | Wren | yours 2 | "In two of the three stories told about the lime, it came from behind the bar." | "Even the lime has its stories: in Rickey's own, the switch to lime came from one of the bartenders; in another, a stranger handed Williamson the limes." | **My shorthand, and my strongest objection.** I gave the room "in two of the three tellings the lime came from behind the bar" in r2. It's false for Brown's: there "an unknown stranger … gave Williamson some limes" (Oxford pdf 1663). The limes came from a customer's side of the bar. Only Rickey's account puts it on a bartender. "The three stories" also collides with "at least three of his own accounts" two sentences earlier, which are a different three. Struck from my anchors and card in this call. |
| **L2** | Tomás | draft, Checks, Story in the glass | "and the lime that, in two of the tellings, came from the bar and was in Rickey's own 1895 recipe either way" | "and the lime that, in Rickey's own telling, came from one of the bartenders, and was in his 1895 recipe either way" | Same error as L1, from my r3 D3 fix wording. Dossier only, citation-grade. |
| **L3** | Wren | epigraph | "Named after a regular, made by the bartender." | "Named after a regular, mixed by the bartender." | Read cold, "made by" beside "its author" reads as *created by*, which is the C2 contest (Sander, Williamson, Rickey, a stranger). "Mixed" is what the page has: Rickey had Williamson start making them for him (*Imbibe!* pdf 117). 14 words, unchanged. |
| **L4** | Wren | yours 1 | "By 1889, at a Washington bar everyone called Shoo's, a new drink had caught on" | "By the end of 1889, at a Washington bar everyone called Shoo's, a new drink had caught on" | Oxford: "circulating by the end of 1889", widespread in Washington "the next summer" (pdf 1663). Wondrich only has 1889 as the year it reached the *Post* (pdf 117). Plain "By 1889" reads as January. |
| **L5** | Wren | yours 4 | "made with whiskey the way it caught on at Shoo's" | "made with whiskey, the way it caught on at Shoo's" | Without the comma, "the way" covers our whole build (rye, Apollinaris, cubes). That's our pairing, not the recorded drink (r3 D3). With the comma it covers only the base. |
| **L6** | Wren | reading file header and Resonance *Facts* | "the lime only as \"two of the three stories\"" (header); "*Facts:* \"two of the three stories\", never \"disliked\"" (Resonance) | "the lime only as each telling's own (Rickey's: a bartender; Brown's: a stranger's limes)"; "*Facts:* the lime told per telling, never \"disliked\"" | Anchors follow the audit, and so does the dossier. |

## Checked and passing

| Where | Text | Source / ruling |
|---|---|---|
| epigraph s2 | "The regular denied being its author." | Oxford pdf 1662: he "was not the author" (1893). PASS. |
| tagline, whoYouAre | no facts | PASS (Wren's ground). |
| y1 | "whiskey, half a lime, soda water and ice, and no sugar at all" | pdf 1661; *Imbibe!* 118. PASS |
| y1 | "a lobbyist known as Colonel Joe Rickey, who would show bartenders how to make it wherever he went" | *Imbibe!* pdf 117 (Wondrich's "no doubt"; "known as" carries the quotation-mark "Colonel"). Paraphrased, no copy. PASS |
| y1 | "Mixing it was the head bartender, George Williamson, who worked there for years and stayed with the drink a long time" | *Imbibe!* 117; Oxford 1789 ("head bartender", "much of that time"); 1663 ("long association"). PASS |
| y2 | "In 1893 Rickey told a New York paper that he wasn't the drink's author at all" | pdf 1662 ("merely its introducer"). PASS |
| y2 | "at least three of his own accounts … printed in his lifetime" | pdf 1662–1663. PASS |
| y2 | "A later writer named Williamson as the real inventor." | Brown 1930, pdf 1663. PASS |
| y2 | "Whether or not Rickey drank it himself, his friends did, and ordered it by his name." | pdf 1663 (friends drank it and tied it to him; two friends came asking for a "Joe Rickey"). PASS |
| y2 | "in 1895, when he wrote his recipe out by hand for a newspaper, the lime was in it" | pdf 1662; *Imbibe!* 118. PASS |
| y3 | Williamson's pleasure, his silence | Signposted twice ("I like to think"). "The bartender had the drink": he made it (*Imbibe!* 117), and it sits inside the signposted run. PASS, narrowly |
| y4 | "a renowned classic" · "long, very cold and bone dry" | pdf 1664 ("a true sensation"); spec (no sugar, 0.14 g). PASS |
| y4 | "Shoo's sold its own and it often went into this drink" | pdf 1789 ("commonly used in the whisky version"). PASS |
| y4 | "he reportedly preferred Apollinaris, a sparkling mineral water, and I like to think it makes the lime taste a little brighter" | pdf 1663 "reportedly"; brightening signposted (r3 D7 landed). PASS |
| y4 | "The half lime belongs to both of them, whoever started it." | Figurative, hedged by "whoever started it"; F12. PASS |
| y4 | "the rye to the bar where Williamson poured" | pdf 1789. Agency stays with the bar. PASS |
| y5 | no facts | PASS |
| closingLine (v3) | "Lime first, no sugar, not a word. Next time, let them catch you laughing." | Lime first = method step 1, the *Brooklyn Eagle* order (*Imbibe!* pdf 119); no sugar = pdf 1661. No historical claim. Matches the method word for word (lime, then ice, rye, water). PASS. **Crossing note:** reading v2's header still says Wren accepts closing line v2. The line is Tomás's, so v3 stands, but Wren, your header should name v3. |
| draft v3 | D2, D3 (except L2), D5–D10, D13 | Landed as quoted in r3. PASS |
| spec | `subfamily` "after Shoo's … (Apollinaris, which the colonel reportedly preferred)" | PASS |
| image brief | plain green bottle, no label; nothing historical claimed | PASS |

## Lint warnings (gendered pronouns)
All four are historical people, never the guest. **[yours 1]** "wherever he went": Rickey. **[yours 2]** "he wasn't the drink's author", "his own accounts", "his lifetime", "his friends", "his name", "he wrote his recipe": all Rickey. **[yours 3]** "he heard each new version": Williamson. **[yours 4]** "he reportedly preferred", "his water", "a nod to him": Rickey. Accepted.

## Apollinaris (Tomás's standing ask)
Unchanged since r3: the library dates it as a current product only to about 2014 (LI p. 312; *Imbibe!* pdf 122). My web budget was spent in r2, so the 2026 label is unread. `contains: none` holds on the category for a plain, unflavoured mineral water. The recipe now says "plain (unflavoured)", with the style as substitute. PASS for the floor, labelled unverified in the dossier.

**Verdict:** once L1–L6 land exactly as quoted, I'd put my name to this. L1 is the only one that changes a fact in the guest text, and the error is mine.
