# Historian audit v1: sage-magician (The Game-Changer), round 3

Audited as they stand at round 3: `psychologist-reading-v1.md` (Wren), `mixologist-draft.md` and `specs/sage-magician.json` (Tomás), `historian-anchors.md` (mine, now v1.2). Against the card `fact-cards/michael-jackson-beer-whisky-writer.md`, Oxford pdf 925, 1091–1092, 1255, 2146–2147, 2177, *Codex* p. 9, and the *Flavor Matrix* pdf 89, 136–137 (both charts viewed as rendered images). Each fix has an ID and is written old → new. The words are the owner's to change; these are the smallest wordings that make each line true.

## Verdict
**Not yet.** Ten wording fixes (H1–H10). Two of them are substantive. H3: y3 says he handed people something "rather than a list of verdicts", but his 1990 book rated every single malt he could find. And H4/H6: "his map", which was my shorthand, and it reached y4, the Notes and the Resonance. Nothing else in the reading is unsourced. The signposts hold (y3), the before is right (y2), and history is about a third.

## Reading v1
| ID | where | old → new | why (source) |
|---|---|---|---|
| H1 | epigraph | "Only one of them is mostly rye." → "One of them is usually mostly corn." | Some Canadian whiskies aren't corn-led (Oxford pdf 2146: "several Canadian distilleries continue to make whisky from grains other than corn"). Corn is "usually the predominant grain" (pdf 925). Scoping the epigraph is safer than scoping the recipe, because a guest can't read a mash bill off most Canadian labels. Wren's question answered: rescope the epigraph. Tomás's recipe already says "usually". |
| H2 | y1 | "writing about pubs for local papers in West Yorkshire" → "writing about pubs for weekly papers in West Yorkshire" | pdf 1091 says "weekly papers". "Local" was my own word in A1's meaning: struck there too. |
| H3 | y3 | "and that it's why he handed people a map rather than a list of verdicts:" → "and that it's why his big idea was a way of grouping, not a verdict:" | He did hand people verdicts: his 1990 guide "rated every single malt brand he could find on a 1–100 scale" (pdf 1091). The signpost covers the motive, not the "rather than". The new line keeps the reading off the ratings (Wren's condition) without denying them. |
| H4 | y4 | "To honour his map, I used one of my own, a chart of which flavours belong together," → "In his honour, I used a guide of my own, a chart of which flavours belong together," | "Map" isn't Oxford's word (it says "showing the relationships among the world whisky types", pdf 1091). It was my plan's shorthand, and I struck it in r3 (T5). Mine, not Wren's or Tomás's. |
| H5 | y2 | "Perhaps the best tribute to him is that books like his, unique in their day, now seem obvious." → "Perhaps the best tribute to him is that his kind of book, new in its day, now seems obvious." | "Unique in their day" is Oxford's run of words (pdf 1091), so it's a copy risk. And "books like his … unique" contradicts itself: if there were books like his, his weren't unique. Keep "perhaps" and the single "obvious". |
| H6 | y4 | "Canadians call their whisky \"rye\"," → "Canadians often call their whisky \"rye\"," | pdf 925: "often referred to as rye". |
| H7 | y4 | "today most of it is made mainly from corn, with a little rye for flavour." → "today most of it is made mainly from corn, usually with a little rye for flavour." | pdf 2146: corn whisky is "generally flavored with small amounts of rye". Wren asked, and the answer is yes. |
| H8 | y4 | "American rye whiskey is the reverse: mostly rye." → "American rye whiskey must be at least half rye." | The legal floor is 51% (MASH BILL pdf 1255; *Codex* p. 9). Oxford's "reversed" compares rye with bourbon (pdf 925), not with Canadian whisky. "Same name, the grains swapped" in the next sentence still carries the comparison, as ours. |
| H9 | y4 | "I found tamarind, dark and sour, and it brings the two whiskies into balance." → "I found tamarind, dark and sour, and it gives the drink the sourness it needs to balance." | On paper, the tamarind brings the acid (`stirred` band, Tomás's Checks). Nothing measures it balancing the two whiskies against each other. Tomás struck the same overreach in his own words ("only it can do" → "it brings the acid"). |
| H10 | y4 | "Chilled hard with ice in a jar," → "Stirred with ice in a jar," | The method is a stir (step 3). "Chilled hard" could send a guest to the shaker. |

Notes and Resonance (dossier: the Notes table keeps dropped claims, so fix them too):
- Resonance, "with the spark found the way his readers found related whiskies: on a map" → "with the spark found the way his readers found related whiskies: by how things relate".
- Notes, epigraph row: once H1 lands, "only the American one is mostly rye" → "the Canadian one is usually mostly corn (pdf 925, 2146)".
- Notes, y4 row "American rye mostly rye ('the reverse')" → "American rye at least half rye (pdf 1255; *Codex* p. 9); the comparison with Canadian is ours (A8)".
- Notes, y4 "tamarind … brings the drink into balance" → "brings the acid".

Checked and passing: y1 the 1977 date, "English journalist", "no relation to the singer" (one clause), "took beer thoroughly and seriously" (paraphrase of "thorough and serious approach"), "brought in an idea" (= introduced) and the five beers. y2 "ten years later" (1977 → 1987), "how the world's whisky types are related", the publishers' before (pdf 2177: it was the publishers, and none of the books is named), "many of whom counted him an inspiration, or simply a friend" (it attaches to brewers and distillers, as on the page). y3's signpost covers the worry and the "place a beer you've never tasted" gloss. y4 the wheat-whisky origin of "rye" (pdf 2146), "something listed beside both grains" (both charts, rendered), and "a renowned whiskey classic". whoYouAre and y5 make no fact claims.

## Drink (Tomás)
| ID | where | old → new | why |
|---|---|---|---|
| D1 | spec `version` | "called 'rye' though corn is now its main grain, flavoured with small amounts of rye" → "often called 'rye', though corn is usually its main grain, generally flavoured with small amounts of rye" | T2 landed in the draft but not in the spec's JSON (pdf 925, 2146). |
| D2 | spec `version` | "Oxford GRAIN pdf 926 area" → "Oxford GRAIN-BASED SPIRITS pdf 925" | The sentence is on pdf 925. |
| D3 | spec `version` vs Method | spec "15 s stir" vs Method step 3 "about 20 seconds" | One of them is wrong. Make them agree (Tomás's call; the stated time is a method claim). |
Draft recipe, Checks and image brief: pass. T1–T5 landed as quoted. The Embury flag claim matches *outlaw-regular-guy*'s flag line (acid OUT). The image brief's diagram is unattributed and has no legible text: fine.

## Anchors (mine), fixed in this same call
- A1 meaning: "pub talk in a local paper" → "pieces about pubs in weekly papers" (H2).
- A4 meaning: "The map of relations" → "How things relate", with a fence against "his map" (H4).
- Grepped the anchors for "map", "local", "mostly", "unique" and "verdict": no other hits in the guest-facing table. "Mostly" doesn't appear. A8 already says "at least half rye" and "usually".

## Names (held to the round-4 vote)
My pick: *Worth Following*. I could take *Plain to See*. Neither name makes a fact claim.
