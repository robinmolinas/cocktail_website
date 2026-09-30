# Memory

_Curated long-term knowledge. Empty at birth — grows through sessions._

_This file is for distilled insights, not raw notes. Capture the essence: decisions made, ideas worth keeping, patterns noticed, lessons learned._

_Keep under 200 lines. Raw session notes go in `sessions/YYYY-MM-DD.md` (not here). Distill insights from session logs into this file during Pulse. Prune what's stale. Every token here loads every session — make each one count. See `references/memory-guidance.md` for full discipline._

## Open Questions (from First Breath, 2026-09-26)
- None blocking. Watch Robin's first-draft edits to recipes and methods: they'll show how much method detail a reader (not a maker) actually wants.

## Balance Lessons
- **Dry sherry for sweet vermouth collapses the sugar** (Connoisseur v1: 1.9 g vs a 3.7 g floor). Put it back from the same family (a spoon of PX).
- **Sparklers backed by spirit run above 16%** (Trickster ~19.5%): flag it in Checks.
- **Equal-parts sweet-vermouth stirred drinks go OUT on acid** (Hanky Panky 45/45: 0.29/0.21). 2:1 lands; a small amaro seasoning moves nothing.
- **A range in the recipe is fine when every stop is proven** (Quite Alive, Fernet 5/7.5/10 ml all balanced; spec written at the midpoint).
- **Check style words against the bottle** ("fernets are unsweetened", but Fernet-Branca is 8 g/100 ml in LI). The reading must not contradict the Checks.
- **A fizz is judged in stages** (Ramos): the soda goes on after dilution, as `"stage": "top"`, style `fizz`.
- **An old recipe's "dash" isn't a modern dash** (Ensslin's 2 dashes ≈ 1 tsp per Imbibe!). Check the historian's conversion before writing "his dose".
- **A book listing an ingredient isn't a book describing its flavour** (Codex p. 66 lists orris, says nothing of violets). Cite the claim, not the neighbourhood.
- **A family description isn't a bottle** (twice now: Fernet "unsweetened", Angostura "clove and cinnamon", Codex p. 14 describes aromatic bitters as a family; Angostura's recipe is secret). Before naming a flavour *in* a named bottle, find a source about that bottle, or say the family's word ("warm spice").
- **To prove a guest-chosen slot, sweep it** (Off-Label accent): run the spec at the slot's extremes (37.5% and 65%, zero sugar and acid) and every real candidate. Then state the rule with its bounds ("any unsweetened spirit"), and never let copy say "whatever".
- **A named bottle still gets a substitute style** (STUDIO-RULES 5), even when the drink is built on it. Flag in Makeable that the numbers and vetoes are proved for the named bottle only.
- **Classics can read OUT on Arnold's ranges when bitterness is loud** (Trinidad Sour, 30 ml orgeat: 11.98 g vs 8.9). balance.py can't hear bitterness: land in range, but at the sweet end.
- **Say *why* a rejected spec is OUT from its own printout, one reading per source** (Tommy's: I said Bermejo's raised lime *and* sugar; his sugar was 8.67, in range. Only *Proper*'s raised both). A thinned syrup's water also pulls strength down.

- **A page number comes from the last page marker *before* the line** (Surrealist: I cited vanilla's Matrix entry as pdf 245 for three rounds; it's 256. I'd read the marker printed after the snippet). When grepping raw text, get the page with awk, or use `library.py`'s own page.
- **A juicy ingredient belongs in the syrup, not the shaker** (tomato: juice versions ran ~12% finished, dilution 43-47%; the Codex's blended-fruit syrup, p. 47, equal weights fruit and sugar, blended cold, keeps it in range).

- **A layered drink is judged as it's drunk, layer by layer** (Rosetta: syrup under absinthe-and-water holds by density, 1.24 vs <0.98 g/ml, but unstirred the top is 13.6% / 0 g / 0% and the last sip is straight syrup). Serve it layered, stir once before drinking. And a sweet band left unstirred is No Accident's motif ("don't stir… truth at the bottom"): check the registry's closing lines before any stir/no-stir gesture.
- **A named bottle gets its own row at its real ABV, and the substitute style gets a strength sweep** (Lucid 62% → 11.3%; vertes 45-74% → 8.2-13.5%). Set the floor from the sweep ("55% or stronger") instead of writing "any".

- **Check sibling *readings*, not only the registry, before a closing line** (Trend Setter: "don't apologise for it" was The Other Berry's y5 position; the registry lists closing lines only). grep the pour files for the key verb.
- **My colour leaks through props and recipe notes too** ("carton" for the cranberry, "after hours" for a staff drink: neither on any page). An image prop tagged with a fact must be only what the fact says.
- **A shaken herb gives taste, not only scent.** Say "scent and a little taste; no sugar, acid or strength".
- **When the story is "he kept his drink", the spark goes outside his proportions** (basil shaken in and strained). Sweep the liqueur core of a daisy: a 30% orange liqueur drops a 2:1:1:1 under the sours' strength floor.

- **Propose a gesture only after the story's drink shape is known** (Auteur: my freezer pre-dilution died in one round because her drinks are shaken, LI p. 152). A gesture can be the creed rather than the position; the closing line carries the position.
- **Salt is noticed, not picked out** (LI p. 61): never write "nobody will taste" a seasoning dash, and never say a seasoning "decides" the drink. A dash of olive brine ≈ Arnold's five drops of saline (brine salt unsourced ~8%).
- **Recipe goes in `mixologist-draft.md` as a table** (`| amount | item | note (shown) |`) with glassware and contains above it; closing line as `**closingLine:** *…*`; `## Image brief`. The assembler reads only that.

- **An equal-parts classic can read OUT** (Last Word 22.5×4: 15.4 g, 1.50% acid, 20.8%). Numbers can carry a "correction" story, but only if the story is this person's (correcting someone else's classic was the Auteur's move).
- **Spirit-only shaken drinks use `shaken-spirit`** (Improved Cocktail): built ranges cap at 32%, stirred ranges demand vermouth's acid.
- **When the story is "one change", the spark must *be* that change** (Old Master: passion fruit balanced but was a second change; Wren right). Record in Checks that the Matrix was consulted and set aside, so Robin sees the rule applied.
- **"Where he first had it" must be checked per spirit** (Thomas's curaçao was in his brandy and gin cocktails, not his whiskey one, Imbibe pdf 176).
- **An image prop mustn't imply a layout the source never had** (facing old/new pages vs an appendix at the back). **Name openings clash in a family too** (*Still Improving* vs *Still Yours*).

- **A cordial must carry sugar and acid in a sour's ratio** (Craftsman: a 1:1 lime cordial went OUT on sugar at every size; 2:1 unwatered, OUT on acid). Thin it with water: ~31 g sugar / 3% acid, 45 ml to 60 ml gin, lands mid-range; 40-45 ml all in. Sweep gin strength too (40% = one edge, 37.5% = three).
- **The closing line carries the position, not the creed** (Wren, Craftsman: "if nobody asks, you got it right" argued the habit the reading asks them to drop). Grep sibling *proposal frames* too (Rosetta's "Next time… tell them").
- **Scope a book's claim exactly** (Oxford GIN pdf 894: caraway in the London dry style, not "early gin"; "some" aquavits). Label my own-knowledge flags as unsourced.

- **Grep sibling *anchors* for the spark's source line, not only the recipe** (Rescuer: sage was *A Brother's Care*'s leaf, from the same *Matrix* honey line). Check every candidate leaf against the pour files before proposing one.
- **Arnold's "less sugar hot" is about sucrose** (LI pdf 187): fructose-heavy sweeteners (agave, likely honey; honey's share unsourced) read *less* sweet hot. With honey, sit at the full end of the `hot` band and say why.
- **A hot drink's gesture is who makes it** (Rescuer: the toddy made *for* the guest, a two-minute steep they sit through). Never claim a drink warms or saves anyone.

- **A comparison is a snapshot, not a history** (Doctor: Codex p. 74 compares Cocchi and Lillet as they are now; "kept its bitterness" claimed a past). And never write a warning a book didn't give (I said the Codex warns off citrus with bitter aperitifs; it says the opposite for Bonal).
- **Get the real sugar and the flagship ABV before fixing a ratio** (Cocchi 200 g/L doubled Lillet's and sank v1; Suze flagship 15%, not 20%). Sweep, and state a substitute's floor ("at least as sweet", ~160 g/L).
- **Describe a drink's colour from its bottles' sourced colours**, never a guess (Suze "strong yellow-orange": light golden yellow, not green-straw).
- **A name that repeats the tagline spends the title block twice.** Hold that case; don't cave to a crossing.

- **Count a drink in one jigger when the story is a ratio** (Nanny grog: 1 rum : 4 water : ½ lime : ½ syrup, no ice). The numbers hold at any jigger size, and with no ice the ratio you measure is the ratio you drink. A still highball is the Codex's own (p. 201).
- **Cite the page the quote is on, and label a book-derived sum as mine** (Hester D2/D5: p. 201, not 202; "the Codex's Whisky Highball at 10%" was my own arithmetic).
- **When a reading counts differences ("one thing he never had"), count them against the spec** (strength from 1866 plus the vinegar is two).

## Studio Craft Leads
- *Codex* p. 118: swap any spirit into a sour and it stays balanced, not promised delicious. p. 104: split base, a small second spirit. p. 9: a non-spirit core needs the template adjusted.
- Parked gestures: clear ice (LI pp. 69–70) for a rocks drink; Ward's flamed orange twist; the Oaxaca Old-Fashioned / Del Maguey (fact card exists).
