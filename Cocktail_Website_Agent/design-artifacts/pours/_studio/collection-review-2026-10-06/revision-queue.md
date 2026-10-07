# Ranked revision queue (2026-10-06)
Every proposal from the family and corpus reviews, ranked: priority, then routine work before Robin's calls, then approved pours. Nothing here has been applied. **routine** = no change of meaning, applied by one editor once Robin agrees the batch; **Robin** = his call (several are cards in `decision-pack.md`); **D1** = waits on the allergen-evidence ruling. Source file in brackets.
| | routine | Robin |
| --- | --- | --- |
| P1 | 8 | 5 |
| P2 | 16 | 69 |
| P3 | 52 | 23 |

## P1

### Q001 · caregiver-explorer · routine · ground: Hester [caregiver]
- **Where:** `yours 5` (fact audit)
- **Current (verbatim):** "Post-it Notes were born from a failed experiment to create a super-strong adhesive."
- **Proposed:** no change to the text (Robin's words). Add a sourced line for it to the fact audit and anchors (the 3M adhesive story: a strong adhesive was the aim, and a weak, reusable one came out).
- **Why it improves the pairing:** the rulebook says Hester still sources any fact in a touchstone. Right now this one is guest-facing and unaudited.
- **Checks before applying:** Hester to verify the wording against a source close to 3M. If the source says something different (e.g. "strong" rather than "super-strong"), take it to Robin; don't edit it.

### Q002 · explorer-creator · routine · ground: Tomás [explorer]
- **Where:** `method 4`
- **Current (verbatim):** "To serve two, put two goblets in the freezer for ten minutes. Squeeze 75 ml of lime juice. Break up one bag with your hands through the plastic, tip it into a blender with the lime, and blend just until smooth and thick, a few seconds. Blending longer only warms it."
- **Proposed:** "To serve two, put two goblets in the freezer for ten minutes. Squeeze 75 ml of lime juice, unless it's already in the bag from step 3. Break up one bag with your hands through the plastic, tip it into a blender with the lime, and blend just until smooth and thick, a few seconds. Blending longer only warms it."
- **Why it improves the pairing:** step 3's fix for a warm freezer puts the lime in the bag. Anyone who then follows step 4 adds a second 75 ml and gets a drink with twice the acid.
- **Checks before applying:** none (the recipe is unchanged).

### Q003 · explorer-hero · routine · ground: Tomás [explorer]
- **Where:** `method 3`
- **Current (verbatim):** "Read the strength on your bottle's label. Up to 47.5% (95 proof), use 60 ml of bourbon and no water. If it's stronger, the bourbon and cold water together make 60 ml:"
- **Proposed:** "Read the strength on your bottle's label. Up to 47.5% (95 proof), use 60 ml of bourbon and no water. If it's stronger, the bourbon and cold water together make 60 ml: up to 51.5%, 55 ml of bourbon and 5 ml of water; up to 57%, 50 ml and 10 ml; up to 63%, 45 ml and 15 ml; up to 70%, 40 ml and 20 ml. If you're between two, take the one with more water."
- **Why it improves the pairing:** as printed, the sentence promises a list that isn't there, so a guest with a cask-strength single barrel can't make the drink. The bands are already proved in Checks ("51.5% at 55 + 5 → 28.9%… 70% at 40 + 20 → 28.6%").
- **Checks before applying:** `balance.py` at each band end (already in Checks). Lint. On the flag: the acid OUT is a vermouth floor applied to a spirit-only drink, and that's honest. I'd recommend Robin accepts the Checks justification.

### Q004 · jester-hero · routine · ground: Tomás [jester]
- **Where:** recipe row "whole egg", note
- **Current (verbatim):** "wash it before you crack it, because half its shell gets used"
- **Proposed:** "wash it before you crack it, because half its shell gets used. It's raw, so use a pasteurised egg if the drink is for anyone pregnant, elderly or unwell"
- **Why it improves the pairing:** the Checks and Open items both say "the draft says" this, but the guest-facing recipe doesn't. A raw egg plus a sip poured into the shell is a safety line the guest should see.
- **Checks before applying:** none.

### Q005 · jester-regular-guy · routine · ground: Tomás [jester]
- **Where:** recipe row "dried apricots", note
- **Current (verbatim):** "straight from the kitchen cupboard; strained out before serving. Check the pack: dried fruit is often packed alongside nuts"
- **Proposed:** "straight from the kitchen cupboard; strained out before serving. Check the pack for a nut warning."
- **Why it improves the pairing:** Hester's audit (D1) failed "often" as an unsourced fact in guest text, and the anchors fence says the same ("Never 'dried fruit is often packed with nuts' as fact"). The `nuts` call itself stands.
- **Checks before applying:** none (the audit's own wording).

### Q006 · jester-sage · routine · ground: Tomás [jester]
- **Where:** recipe table (new last row) and `method 1`
- **Current (verbatim):** recipe note "made the night before (below)"; method "1. The night before, make the pear syrup."
- **Proposed:** add a recipe row: "| | *for the pear syrup:* 1 ripe pear (about 150 g peeled and cored), chopped small, and 150 g white sugar | makes about 150 ml, enough for about twenty drinks |". Method 1 becomes: "1. The night before, make the pear syrup. Stir the chopped pear and the sugar together in a jar, close it and leave it in the fridge overnight. In the morning, press it through a sieve and keep only the syrup. Keep it in a closed jar in the fridge and use it within a week. If it comes out thin, use 10 ml in the drink."
- **Why it improves the pairing:** the guest can't make the drink as written. The Checks already fix the rule (equal weights of fruit and sugar; 10 ml if thin, never less than 7.5), and the reading already says "a ripe pear, left overnight in sugar". This only puts it where the guest can see it.
- **Checks before applying:** Tomás to confirm the yield and keeping time (both his craft calls, unsourced); `balance.py` is unaffected (the row is already swept at 50–70 g); lint.

### Q007 · regular-guy-ruler · routine · ground: Hester [regular-guy]
- **Where:** `yours 4`, first sentence
- **Current (verbatim):** "The cocktail I've made for you is a Rickey, a classic that spread across America in the 1890s and is now the official cocktail of Washington, DC: bourbon, fresh lime and soda water."
- **Proposed:** "The cocktail I've made for you is a Rickey, a renowned classic that was already famous in the 1890s: bourbon, fresh lime and soda water."
- **Why it improves the pairing:** neither "spread across America" nor "the official cocktail of Washington, DC" is in this pour's anchors, fact audit or the Heugel card. Hester's Rickey card (`george-williamson-joe-rickey.md`) lists both phrases under **Fenced (never in guest text)**, naming *Word Gets Round*'s y4. The replacement rests on card F15 ("By the mid-1890s the gin version was the best known", Oxford pdf 1664). If Hester can source the 2011 DC designation from Oxford RICKEY (pdf 1661–1664) and add an anchor row, the original sentence can stay instead. That's Hester's call.
- **Checks before applying:** Hester to verify "already famous in the 1890s" against F15's wording; anchors row; lint.

### Q008 · sage-creator · routine · ground: Tomás [sage]
- **Where:** recipe row (popcorn syrup), note
- **Current (verbatim):** "100 g demerara sugar dissolved in 100 ml hot water; off the heat, stir in about 20 g plain popcorn (2½ cups, from about 2 tablespoons of kernels), cover for 30 minutes, then press it through a sieve. Makes about 120 ml; keeps a week in the fridge"
- **Proposed:** "100 g demerara sugar dissolved in 100 ml hot water; off the heat, stir in about 20 g plain popcorn (2½ cups, from about 2 tablespoons of kernels, popped dry or in a little plain oil, with no butter), cover for 30 minutes, then press it through a sieve. Makes about 120 ml; keeps a week in the fridge. If you use bought popcorn, check the pack: butter is dairy, and coconut oil counts as nuts"
- **Why it improves the pairing:** the pour is veto-free only because the popcorn is plain. Microwave and bought popcorn often carries butter or coconut oil. Tomás's Allergens row says the guest note already sends buyers to the pack, but it doesn't. This is the one guard the veto-free classification depends on.
- **Checks before applying:** `allergens.py` unchanged (`popcorn_demerara_syrup` row); lint.

### Q009 · regular-guy-ruler · Robin · ground: Tomás [_corpus]
- **Where:** recipe, method, yours 4, closingLine (the drink itself)
- **Current (verbatim):** y4 "The cocktail I've made for you is a Rickey, a classic that spread across America in the 1890s and is now the official cocktail of Washington, DC: bourbon, fresh lime and soda water." · method 5 "No sugar, and nothing on top. Drink it while the ice is still crisp."
- **Proposed:** options:
  (a) **Move *Word Gets Round* to another lime-led classic, in a short room for Tomás (Hester for y4).** The story only needs a drink where the citrus is measured, not counted, and where lemon can stand in "if the lemons are better that day". One candidate is a bourbon Buck (bourbon, measured lime, ginger ale over ice). Keep the measured-juice method and the "tell whoever's drinking why" ritual. This also makes the regular-guy review's P1 (the unsourced "official cocktail of Washington, DC") unnecessary.
  (b) **Robin rules that a rye Rickey with Apollinaris and a bourbon Rickey with soda are different enough.** Then apply the regular-guy review's y4 fix and change *Word Gets Round*'s method 5 so the two pours don't share a line, e.g. "No sugar. Drink it while the ice is still crisp."
- **Why it improves the pairing:** a guest who has both pours (they share the Ruler secondary, so friends of the same type will compare) gets the same named cocktail, introduced the same way. This is the only pair in the collection that meets Robin's own exclusion. *Somewhere to Land*'s story *is* the Rickey, so it keeps the drink.
- **Checks before applying:** (a) `balance.py` (highball style), `allergens.py` (ginger ale is a new row if it's not in the table), a fact card for whatever classic is named, lint; (b) lint only.

### Q010 · innocent-creator · Robin · ground: Tomás · D1 [innocent]
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens row
- **Current (verbatim):** `veto_free: true            # contains: []` and Checks: "**veto-free** (`allergens.py --check ""`: matches) … None is on the veto list"
- **Proposed:** `contains: ["nuts"]`, `veto_free: false`, and Checks: "Allergens: **nuts**, from the Coca-Cola (`coca_cola` is classified nuts in the ingredient table, on the safe side); the frozen cubes carry the same cola. Red wine fining ignored (STUDIO-RULES 4)." If Robin instead reverses the `coca_cola` classification in the table, the file stays as it is. Either way, the file and the tool must agree before this pour is shown.
- **Why it improves the pairing:** a guest who vetoes nuts would be shown this drink today. The rulebook says the classification must never under-state, so until Robin rules, the tool's answer is the guest-facing one.
- **Checks before applying:** Robin's ruling on `coca_cola` → nuts (open since batch outlaw); `allergens.py`; `lint_pour.py innocent-creator` (the ERROR clears); AD-4 floor count drops by one.

### Q011 · jester-caregiver · Robin · ground: Tomás · D1 [jester]
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens
- **Current (verbatim):** `contains: []`
- **Proposed:** `contains: ["nuts"]` and `veto_free: false`, with Checks: "Allergens: **nuts**, from Peychaud's bitters (classified nuts in the ingredient table, on the safe side: its recipe isn't published)." If Robin reverses the Peychaud's classification instead, the file stands. The same ruling settles *Their Night* and the approved *No Accident*.
- **Why it improves the pairing:** a guest who vetoes nuts would be shown this drink. The file and the tool must agree before the pour is shown.
- **Checks before applying:** Robin's ruling on Peychaud's → nuts (open since batch ruler); `allergens.py`; `lint_pour.py jester-caregiver`; the family's AD-4 floor count.

### Q012 · magician-caregiver · Robin · ground: Tomás · D1 [magician]
- **Where:** cocktail block `contains`; frontmatter `veto_free`; Checks › Allergens
- **Current (verbatim):** `contains: []`
- **Proposed:** `contains: ["nuts"]`, `veto_free: false`; Checks: "Allergens: **nuts**, from Peychaud's bitters (classified nuts on the safe side)." The Peychaud's is what turns the drink pink, and the 1911 recipe has it, so it stays.
- **Why it improves the pairing:** the file and the tool disagree, and the tool is the safe side.
- **Checks before applying:** the same Peychaud's ruling; `allergens.py`; lint.

### Q013 · magician-outlaw · Robin · ground: Tomás · D1 · approved pour [magician]
- **Where:** cocktail block `contains`; frontmatter `veto_free`; and `STUDIO-RULES.md` ("All three are veto-free, which satisfies the AD-4 floor")
- **Current (verbatim):** `contains: []`
- **Proposed:** if Robin confirms Peychaud's → nuts: `contains: ["nuts"]`, `veto_free: false`, and the rulebook line becomes "*A Brother's Care* and *Four Shares* are veto-free, which satisfies the AD-4 floor; *No Accident* contains nuts (Peychaud's)." If Robin reverses the classification instead, nothing changes here.
- **Why it improves the pairing:** this is a real allergen error on an approved pour: a nut-veto guest would be shown it. The drink needn't change. The Peychaud's is half of "two kinds of bitters", and dropping it would alter an approved recipe, so that's not my recommendation. The label is what has to be true.
- **Checks before applying:** Robin's Peychaud's ruling (it settles *Anyway* and *Their Night* too); `allergens.py`; `lint_pour.py magician-outlaw`; the collection's AD-4 floor count (signals: "approved and veto-free: 2" already assumes this).

## P2

### Q014 · caregiver-hero · routine · ground: Wren [caregiver]
- **Where:** `yours 1`, third and fourth sentences
- **Current (verbatim):** "The picture everyone knows is a dog with a little barrel of brandy on its collar. That's a legend."
- **Proposed:** "The picture everyone knows is a dog with a little barrel of brandy on its collar. It's a lovely picture, and almost certainly a legend."
- **Why it improves the pairing:** Robin's rule is to grant the legend before correcting it ("Maybe, but it almost certainly didn't"). yours 4 still pays the legend off ("There's no brandy in it, and that's on purpose").
- **Checks before applying:** none (card L1 calls it a legend). Lint.

### Q015 · caregiver-innocent · routine · ground: Wren [caregiver]
- **Where:** `yours 2`, first two sentences
- **Current (verbatim):** "Oxford and the *Joy of Mixology* both record him as a respected Resistance veteran, and neither says what that meant for him. I don't know what he brought into those receptions with him. But I like to think he understood what a glass does."
- **Proposed:** "He was also a respected veteran of the Resistance. We don't know what that meant for him, or what he brought into those receptions with him, but I like to think he understood what a glass does."
- **Why it improves the pairing:** this is the rule's own case ("Don't talk about the research itself… → 'We don't know…, but I like to think…'"). The bartender stops citing books and goes back to talking to the guest.
- **Checks before applying:** none (same anchor: Oxford pdf 1133, Joy pdf 315).

### Q016 · creator-explorer · routine · ground: Wren [creator]
- **Where:** `whoYouAre ¶2`, first sentence
- **Current (verbatim):** "Most of what you try doesn't work, and you honestly don't mind."
- **Proposed:** "Some of what you try doesn't work, and you honestly don't mind."
- **Why it improves the pairing:** this is Robin's own edit pattern ("Some of what you try goes nowhere", not "most"). The next sentence ("there are more of them than anyone guesses") still carries the volume.
- **Checks before applying:** lint.

### Q017 · creator-magician · routine · ground: Tomás [creator]
- **Where:** recipe header (`amount (batch)`), and method 7
- **Current (verbatim):** "Bottle what came through and keep it in the fridge. Throw away the curds."
- **Proposed:** add above the table "Makes about eight drinks of 125 ml." Method 7 → "Bottle what came through and keep it in the fridge; it's at its silkiest in the first week. Throw away the curds."
- **Why it improves the pairing:** a guest making a litre of punch a day ahead needs to know how many it serves and how long it lasts. The anchor already has the week ("It fades over about a week").
- **Checks before applying:** Tomás to verify the yield after clarification (980 ml of punch into 240 ml of milk, less what stays in the curds), and the keeping time. Re-run `balance.py` only if a quantity changes.

### Q018 · creator-outlaw · routine · ground: Wren [creator]
- **Where:** `yours 3`, second sentence
- **Current (verbatim):** "Then that changed. Last I read, in 2026, he still makes it at his own bar in Brooklyn, and he likes it, in his word, \"shrill\"."
- **Proposed:** "Then that changed. He still makes it at his own bar in Brooklyn, and he likes it, in his word, \"shrill\"."
- **Why it improves the pairing:** "Last I read" is the bartender talking about their reading, which the rules have ruled out. A year that's this year adds nothing for the guest.
- **Checks before applying:** Hester to verify "still" against the dated secondary (Lascelles, 2026; F19), and to put a date on the anchor so it can be re-checked.

### Q019 · explorer-jester · routine · ground: Wren [explorer]
- **Where:** `yours 2`, first sentence
- **Current (verbatim):** "Arnold, who happens to have written one of the books I mix from, decided to bring the iron back, to taste what had gone missing."
- **Proposed:** "Dave Arnold, a bartender who writes about the science of drinks, decided to bring the iron back, to taste what had gone missing."
- **Why it improves the pairing:** "the books I mix from" is the bartender talking about their sources, which the rules have ruled out. There's no hidden coincidence to own: y4 credits his kitchen method openly. The new clause tells the guest who he is.
- **Checks before applying:** Hester to confirm the description (Proper pp. 224–226; *LI*). Lint.

### Q020 · explorer-outlaw · routine · ground: Wren [explorer]
- **Where:** `yours 1`, last two sentences
- **Current (verbatim):** "You may have heard Lee invented it. He didn't."
- **Proposed:** "You may have heard Lee invented it. It's often told that way, but he didn't."
- **Why it improves the pairing:** Robin's rule is to grant the legend before correcting it. The fact stays firm (Proper p. 275, F12).
- **Checks before applying:** none. Lint.

### Q021 · jester-magician · routine · ground: Wren [jester]
- **Where:** `whoYouAre` paragraphs 1 and 2
- **Current (verbatim):** "This morning the sugar was salt." … "The salt goes back."
- **Proposed:** "This morning every mug in the cupboard was turned to face the wall." … "The mugs go back."
- **Why it improves the pairing:** salt for sugar is *Got You*'s prank ("Salt in the sugar bowl"), and *Got You* is the Prankster, who owns it more naturally. The mugs keep the Elf/Imp's rules: harmless, aimed at one person, put right in seconds.
- **Checks before applying:** grep the collection for "mug"; lint.

### Q022 · jester-regular-guy · routine · ground: Wren [jester]
- **Where:** `yours 4`
- **Current (verbatim):** "a handful of dried apricots, chopped and left in the rye for an afternoon, then strained out."
- **Proposed:** "a handful of dried apricots, chopped and left in the rye for several hours, then strained out."
- **Why it improves the pairing:** the method says six to eight hours, tasted from the fourth. Hester failed "an afternoon" (D3) for underselling it and gave this wording; it was never applied.
- **Checks before applying:** none.

### Q023 · lover-caregiver · routine · ground: Tomás [lover]
- **Where:** recipe row "sugar", note; `yours 4`
- **Current (verbatim):** note "Willard used as much sugar as brandy; I cut it to a spoonful and a half, or it would be more than four times too sweet"; y4 "so I kept it to a spoonful and a half."
- **Proposed:** note "Willard used as much sugar as brandy; I cut it to a teaspoon and a half, or it would be more than four times too sweet"; y4 "so I kept it to a teaspoon and a half."
- **Why it improves the pairing:** the amount column says 1½ tsp, and Tomás's own note (Open items) says "a spoonful" can be read as tablespoons, which would push the drink over the sugar ceiling. It's a guest-safety-of-taste fix that changes no meaning. My answer to the open question: teaspoon.
- **Checks before applying:** none (6 g is unchanged).

### Q024 · lover-innocent · routine · ground: Tomás [lover]
- **Where:** `method 1`
- **Current (verbatim):** "Use the freshest eggs you can get, clean and uncracked, and keep them cold until you use them: the alcohol doesn't make a raw egg safe."
- **Proposed:** "Use the freshest eggs you can get, clean and uncracked, and keep them cold until you use them: the alcohol doesn't make a raw egg safe. If the drink is for anyone pregnant, elderly or unwell, use pasteurised eggs."
- **Why it improves the pairing:** this is the same safety line *The Wink* carries in Checks, so the collection gives the same advice wherever a raw egg goes in.
- **Checks before applying:** Tomás to confirm that pasteurised in-shell eggs take the lavender scent the same way (*Codex* p. 94 is about ordinary eggs). If not, say so in one clause.

### Q025 · lover-jester · routine · ground: Wren [_corpus]
- **Where:** `whoYouAre ¶2`, fifth sentence; `yours 5`, last sentence
- **Current (verbatim):** "You're not afraid of the no. You're afraid of the flat answer: someone who takes it at face value and looks a little hurt, or smiles politely and lets it drop, and the joke is left hanging with only you holding it." · "I hope they tease you for it."
- **Proposed:** "What stays with you is the one who takes it at face value and looks a little hurt, or smiles politely and lets it drop, and the joke left hanging with only you holding it." · delete the last sentence, so the reading ends "…and the ones you tell will play back hardest of all."
- **Why it improves the pairing:** the reversed *I'll Tell You Later* has "It isn't a no that you dread. It's a flat 'just tell me'", the same sentence shape and the same word. Both readings also end on "I hope…". The previous sentence ("Said as a joke, a no costs nobody anything, you included") already carries the no.
- **Checks before applying:** lint.

### Q026 · magician-innocent · routine · ground: Tomás [magician]
- **Where:** recipe, the cordial paragraph below the table
- **Current (verbatim):** "**Strawberry and lemon cordial (about 300 ml, ten drinks):** 100 g ripe hulled strawberries and 100 g white sugar, blended cold until the sugar has gone, pressed through a fine sieve; made the *Codex*'s way (Blended Strawberry Syrup, p. 47: equal weights of fruit and sugar, blended cold, sieved), then lengthened with the same volume of fresh lemon juice (about 150 ml, four or five lemons; mine). Fridge, up to a week (my craft call)."
- **Proposed:** "**Strawberry and lemon cordial (about 300 ml, ten drinks):** 100 g ripe hulled strawberries and 100 g white sugar, blended cold until the sugar has gone, then pressed through a fine sieve. Stir in the same volume of fresh lemon juice (about 150 ml, four or five lemons). Keep it in the fridge and use it within a week."
- **Why it improves the pairing:** the guest is reading a recipe, not a dossier. Page numbers and "my craft call" belong in Checks, where they already are. Clear before clever.
- **Checks before applying:** none (same quantities).

### Q027 · magician-ruler · routine · ground: Tomás [magician]
- **Where:** recipe row "Batavia arrack", item
- **Current (verbatim):** "Batavia arrack (from Java; about 50%, unsourced: check the label), recommended, or a full-flavoured Jamaican-style rum of 50% or stronger"
- **Proposed:** "Batavia arrack (from Java; about 50%: check the label), recommended, or a full-flavoured Jamaican-style rum of 50% or stronger"
- **Why it improves the pairing:** "unsourced" is studio vocabulary. "Check the label" already tells the guest what to do.
- **Checks before applying:** none.

### Q028 · ruler-jester · routine · ground: Wren [ruler]
- **Where:** `epigraph`
- **Current (verbatim):** "A bartending school went bust. Its party bar didn't. This glass is that bar's size."
- **Proposed:** "A bartending school went bust. Its party bar didn't. This drink comes in that bar's big glass."
- **Why it improves the pairing:** the epigraph is read cold. "This glass is that bar's size" reads as a glass as big as a bar. The new line says what's meant (LAB's 14-oz glass, anchor `glass`) with no extra claim.
- **Checks before applying:** lint.

### Q029 · sage-outlaw · routine · ground: Hester [sage]
- **Where:** `yours 4`
- **Current (verbatim):** "The same kind of wine, said again at greater length, as a nod to his second telling."
- **Proposed:** "The same kind of wine, said again at greater length, as a nod to his telling it again."
- **Why it improves the pairing:** y3 gives three tellings (the 1844 pamphlet, more in print "by the next year", the 1852 evidence), so "second telling" miscounts. Hester's step-4 fix (Open items, not applied because the room had signed) keeps the image and is true. The epigraph ("once in short, then again at greater length") and closing line ("Make the second pour the bigger one", about the pours, not the tellings) still hold.
- **Checks before applying:** lint.

### Q030 · caregiver-creator · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You'd never call it pride. You'd call it doing it properly."
- **Proposed:** options: "You'll redo a hem nobody else would ever see." / "Nothing you make for someone leaves the house with a 'that'll do' on it."
- **Why it improves the pairing:** whoYouAre ¶2 already says it ("so you call it 'just doing it properly'"). The candidates show the care in the making without the pride/properly turn.
- **Checks before applying:** registry. Lint.

### Q031 · caregiver-explorer · Robin · ground: Wren [caregiver]
- **Where:** `yours 4`, first sentence
- **Current (verbatim):** "The cocktail I've made for you is the plainest but crispest drink those bubbles made possible: whisky and soda, tall, over ice."
- **Proposed:** "The cocktail I've made for you is the crispest drink those bubbles made possible: whisky and soda, tall, over ice."
- **Why it improves the pairing:** Robin's logged edit reads "the  but crispest" (he took "plainest" out), and the rule learned from it is "'crispest', not 'plainest'". The file brought the modest word back.
- **Checks before applying:** Robin to confirm that's what he meant. Lint.

### Q032 · caregiver-explorer · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You care about people you'll never meet."
- **Proposed:** options: "Mention a problem once and you'll still be looking it up at midnight." / "You're the one who reads the whole leaflet, small print included."
- **Why it improves the pairing:** the current line is the last phrase of whoYouAre ("reaches people you'll never meet"), and yours 3 echoes it again ("someone who will never know your name"). The candidates show the researching, which is the half of this person the line leaves out.
- **Checks before applying:** registry. Lint.

### Q033 · caregiver-hero · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else is still deciding. You've already gone."
- **Proposed:** options: "You keep a first-aid kit in the car, and you've used it on strangers." / "Your phone is never on silent, just in case."
- **Why it improves the pairing:** it's the public/private beat, and it repeats whoYouAre ("By the time anyone else has decided what to do, you're already moving"). The candidates show readiness as a habit, and the second quietly sets up the cost the reading names. (A torch or fuse-box line is avoided on purpose: hero-regular-guy's whoYouAre already has the fuse box.)
- **Checks before applying:** registry. Lint.

### Q034 · caregiver-innocent · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone breathes easier when you arrive. Nobody asks what you left at the door."
- **Proposed:** options: "You've never once sent food back." / "You say sorry when someone else bumps into you."
- **Why it improves the pairing:** this is two mass-contrast sentences with a public/private turn, and "left at the door" repeats whoYouAre ("You keep all of that on the other side of the door"). Both candidates are short, recognisable behaviour of someone keeping their place by never being any trouble, which is exactly what the reading unpacks.
- **Checks before applying:** registry. Lint.

### Q035 · caregiver-lover · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You've seen them at their worst. You're still here."
- **Proposed:** options: "You know how they take their tea on a good day and on a bad one." / "You can tell what kind of day they've had from the way the keys go down."
- **Why it improves the pairing:** the current line is whoYouAre's own sentence ("You've seen them at their worst more than once"), so it lands twice and the second time is weaker. Both options are steady, close attention that makes sense without Twain.
- **Checks before applying:** registry check for repeats. Lint (tagline length).

### Q036 · caregiver-magician · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You believe they'll be all right before they do."
- **Proposed:** "You turn up with soup and never ask how they're coping."
- **Why it improves the pairing:** the current line is good, but it's whoYouAre's opening idea and its closing phrase ("believing in people before they do"). The candidate is the "easy to say yes to" help, seen from outside. If Robin prefers to keep the current line, it can stay: it doesn't use a formula.
- **Checks before applying:** registry. Lint.

### Q037 · caregiver-regular-guy · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone gets the same you. That's the whole point."
- **Proposed:** options: "You've never saved the good biscuits for company." / "You learn the cleaner's name as fast as the host's."
- **Why it improves the pairing:** the current line repeats whoYouAre ("And everyone gets the same you.") and uses the mass-contrast beat. The 2 October recommendation ("The same cup is ready for everyone…") avoids the Irish Coffee anecdote but leans on the reading's "same cup" and gives away the proposal. Both options show the even-handedness as something you could see someone do.
- **Checks before applying:** registry. Lint.

### Q038 · caregiver-ruler · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You were never against the fun. You're why it lasts."
- **Proposed:** options: "You set an alarm for other people's last train." / "You're the one with plasters, a charger and the number for a taxi."
- **Why it improves the pairing:** the current line is whoYouAre ¶2 nearly word for word ("you were never against the fun. You're the reason there's any left in the morning"). Both options are the Nanny's watchfulness as behaviour, with no grog in them. (Head-counting is avoided on purpose: explorer-ruler's whoYouAre already counts heads in the car park.)
- **Checks before applying:** registry. Lint.

### Q039 · caregiver-sage · Robin · ground: Wren [caregiver]
- **Where:** `yours 1`, the parenthesis
- **Current (verbatim):** "(He edited the big Oxford book on spirits and cocktails that I lean on for these stories, so I'll own that.)"
- **Proposed:** "(He went on to edit the best-known encyclopedia of spirits and cocktails, so a good deal of what's written about Old Tom comes through him. I'd rather say so.)"
- **Why it improves the pairing:** the coincidence still has to be owned (yours 4 uses his Oxford entry), but the current line is about the bartender's reading list, which the rules have ruled out. The new one owns it as a fact about Wondrich, and it fits a guest whose fear is being deceived.
- **Checks before applying:** Hester to verify "went on to" (Ransom Old Tom 2008; the Companion came later) and "a good deal of what's written about Old Tom comes through him" (he signs Oxford's OLD TOM GIN entry, pdf 1439). Lint.

### Q040 · caregiver-sage · Robin · ground: Wren [caregiver]
- **Where:** `tagline`
- **Current (verbatim):** "You don't say \"poor you\". You ask \"since when?\""
- **Proposed:** options: "You read the small print on other people's prescriptions." / "You'd rather ask the awkward question now than visit later."
- **Why it improves the pairing:** "since when?" is the first line of whoYouAre, and the tagline also runs the not-X-but-Y formula. The first option is concrete and unmistakably this person.
- **Checks before applying:** registry. Lint.

### Q041 · creator-caregiver · Robin · ground: Wren [creator]
- **Where:** `tagline`
- **Current (verbatim):** "You never say it. You make it."
- **Proposed:** options: "Your birthday cards take longer than other people's presents." / "Your apology usually arrives as a lasagne."
- **Why it improves the pairing:** the current line restates whoYouAre's opening ("you rarely know what to say. You know what to make"), and "You never…" is the collection's most common opener (×8). Both options are making-instead-of-saying, seen from outside.
- **Checks before applying:** registry. Lint.

### Q042 · creator-innocent · Robin · ground: Wren [creator]
- **Where:** `yours 4` (whole paragraph)
- **Current (verbatim):** "So this one keeps his three ingredients and his habit of thinning the syrup with water, so none of it clings to the spoon. The measures are mine. The syrup is blue agave, the same plant the tequila comes from."
- **Proposed:** "So the cocktail I've made for you is that drink, the one people now order everywhere as a Tommy's Margarita, one of the best-loved modern classics. It keeps his three ingredients and his habit of thinning the syrup with water, so none of it clings to the spoon. The measures are mine. The syrup is blue agave, from the same plant as the tequila, so nothing in the glass is there to cover anything else."
- **Why it improves the pairing:** the guest is never told this is a famous drink, or what it's called, so they couldn't ask for it at a bar. Robin's rule: let the drink sound worth having. The last clause ties the blue-agave choice to the story in words ("nothing to hide behind"). The name comes after the story, so his not signing it still lands first.
- **Checks before applying:** Hester to verify "Tommy's" (the restaurant) and "one of the best-loved modern classics". Keep the anchor's fence ("never 'his recipe'"). Lint.

### Q043 · creator-jester · Robin · ground: Wren [creator]
- **Where:** `tagline`
- **Current (verbatim):** "You don't make things strange. You notice they already are."
- **Proposed:** options: "You see faces in plug sockets, and you say so." / "You're the one who points out the cloud that looks like a pear."
- **Why it improves the pairing:** the current line is not-X-but-Y. The candidates are the same noticing, as behaviour, and the "say so" sets up the proposal (stop apologising for it) without giving it away.
- **Checks before applying:** registry. Lint.

### Q044 · creator-magician · Robin · ground: Wren [creator]
- **Where:** `tagline`
- **Current (verbatim):** "You change everything except the part that makes it theirs."
- **Proposed:** options: "You've never walked past a skip without looking in." / "Give you a free Saturday and someone's spare room won't recognise itself."
- **Why it improves the pairing:** the current line is whoYouAre ¶1 nearly word for word ("you'll change nearly everything, except the one thing that makes it theirs"). The first option is the eye for what something could be, as a plain habit.
- **Checks before applying:** registry. Lint. ("Skip" is British; for a US-facing menu, "dumpster".)

### Q045 · creator-ruler · Robin · ground: Wren [_corpus]
- **Where:** `whoYouAre ¶1` and ¶2's second sentence (this decides between two family-review proposals)
- **Current (verbatim):** ¶1 "You can tell in a second when something is slightly off: the one wrong word on a page, the lamp in the wrong corner, the thing nobody else would ever notice. And you can't leave it. You send it back, with a note, and then again, until it's right."
- **Proposed:** apply `reviews/creator.md`'s creator-ruler P2 as written ("You see the whole thing before anyone else has seen a part of it: how the evening runs, how the room looks, what comes first and what comes last. After that, every piece has to match the picture, and you can't leave one that doesn't. You send it back, with a note, and then again, until it's right." plus its ¶2 change). Hold `reviews/ruler.md`'s ruler-creator ¶1 P2 as optional: once creator-ruler moves, it's no longer needed.
- **Why it improves the pairing:** the pair is the only interchangeable one, and both reviewers fixed their own side. One change is enough. The Auteur's change is truer to its primary (the whole vision), it frees the Perfectionist to keep "slightly off", and it also stops the tagline repeating ¶2 word for word.
- **Checks before applying:** Wren's swap read of all three (creator-ruler, ruler-creator, creator-sage); lint.

### Q046 · creator-ruler · Robin · ground: Wren [creator]
- **Where:** `whoYouAre ¶1`, and `whoYouAre ¶2` second sentence
- **Current (verbatim):** ¶1 "You can tell in a second when something is slightly off: the one wrong word on a page, the lamp in the wrong corner, the thing nobody else would ever notice. And you can't leave it. You send it back, with a note, and then again, until it's right." · ¶2 "The ones who stayed know it's simpler than that: you'd rather be blamed for all of it than praised for part of it."
- **Proposed:** ¶1 "You see the whole thing before anyone else has seen a part of it: how the evening runs, how the room looks, what comes first and what comes last. After that, every piece has to match the picture, and you can't leave one that doesn't. You send it back, with a note, and then again, until it's right." · ¶2 "The ones who stayed know it's simpler than that: it's the whole of it you care about, never only your part."
- **Why it improves the pairing:** ruler-creator (*On Their Behalf*) opens with "You notice the thing that's slightly off. The line on the page that sits a millimetre low…". The two whoYouAre openings are interchangeable, and so is the move (send it back). The Auteur is creator first: the drive is a whole vision that has to be theirs ("I want a project where I'm making the calls"), and that's what the new ¶1 leads with. Ruler-creator keeps the flaw-spotter. The ¶2 change stops the tagline being repeated word for word, so the tagline can stay.
- **Checks before applying:** resonance swap test against ruler-creator and creator-sage. Lint. (If Robin would rather keep ¶2, the alternative is a new tagline: "You know which way the forks should face, and you'll fix them while you talk.")

### Q047 · creator-sage · Robin · ground: Wren [creator]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else calls it finished. You call it the first edition."
- **Proposed:** options: "You still reread the things you wrote years ago, with a pencil." / "Your best-known work has your own notes in the margin."
- **Why it improves the pairing:** the Everyone/You public/private turn is the most flagged pattern in the set. The pencil is the Old Master's habit without the Jerry Thomas anecdote.
- **Checks before applying:** registry. Lint.

### Q048 · explorer-creator · Robin · ground: Wren [explorer]
- **Where:** `whoYouAre ¶1`, first two sentences (follows from Robin's `yes` on the tagline)
- **Current (verbatim):** "You'll happily spend a weekend on something so you never have to spend ten minutes on it again. Somewhere in your life there's the proof: a thing that used to jam, drip or stick, until one afternoon you'd had enough of it."
- **Proposed:** "Somewhere in your life there's the proof of how you work: a thing that used to jam, drip or stick, until one afternoon you'd had enough of it. You took it apart there and then, and it hasn't jammed since."
- **Why it improves the pairing:** Robin accepted "You don't mind losing a weekend if nobody loses ten minutes again." as the tagline. whoYouAre's first sentence says the same thing, so the guest would read it twice in a row. The tagline keeps the weekend; whoYouAre keeps the proof.
- **Checks before applying:** apply the tagline first. Resonance punch check (whoYouAre's first line). Lint.

### Q049 · explorer-lover · Robin · ground: Wren [explorer]
- **Where:** `tagline` (Robin: retry)
- **Current (verbatim):** "One taste, and you're somewhere else entirely. You always let it take you."
- **Proposed:** options: "You'll cross town for the right tomato." / "Every market you walk through costs you an hour and a bag of things to try."
- **Why it improves the pairing:** Robin rejected "You forget the year and remember the bread." (it's lifted from whoYouAre's bread). The current line repeats whoYouAre's "you're somewhere else, completely". Both candidates are the Sense Seeker's appetite as behaviour, with no Bramble, no blackberry and no memory needed. They're different lengths, and neither is two sentences.
- **Checks before applying:** registry. Swap check against lover-explorer, whose whoYouAre already has "the dish nobody else at the table dares to order", so no "dish" line here.

### Q050 · explorer-magician · Robin · ground: Wren [explorer]
- **Where:** `tagline` (Robin: retry)
- **Current (verbatim):** "You've been doing it for years. You just never called it that."
- **Proposed:** options: "You keep a notebook of lines worth living by, and lose it every spring." / "You light a candle for the hard days and forget it on the good ones."
- **Why it improves the pairing:** Robin rejected "The things that keep you steady rarely have names." (abstract). The current line only makes sense once the reading has told you what "it" is. Both candidates are the seeker's habits, with the warm self-mockery the whoYouAre has ("By Wednesday the inbox has it"). Neither needs Gary Regan.
- **Checks before applying:** registry. Lint.

### Q051 · explorer-regular-guy · Robin · ground: Wren [explorer]
- **Where:** `tagline` (Robin: "too specific to the story, not the persona")
- **Current (verbatim):** "Half the people you know have eaten somewhere because of you."
- **Proposed:** options: "You're the friend people text before they book anything." / "Your holiday photos are mostly of menus."
- **Why it improves the pairing:** Robin's note rejected the 2 October line ("…until someone asks you for the address"), which leaned on the reading's "the address". Both candidates are the Tourist's two sides (loves the find, can't wait to hand it round) as everyday behaviour. The current line is fine too, if Robin prefers to keep it: it doesn't depend on the mezcal.
- **Checks before applying:** registry. Lint.

### Q052 · explorer-ruler · Robin · ground: Hester [explorer]
- **Where:** `yours 1` (whole paragraph)
- **Current (verbatim):** "You may know the story of Ernest Shackleton's ship, crushed in the ice. Years before it, he walked towards the South Pole with three others, Frank Wild, Eric Marshall and Jameson Adams, hauling sledges onto the high plateau. At New Year 1909, short of food, he wrote that he made himself \"consider the lives of those who were with me\": go on too far, and they could never get back. He kept going south for days afterwards. On 6 January he admitted, that night, that it had to be their last march south with the sledge. Then a blizzard pinned them in their tent for two days, with the food going. On 9 January they left the sledge, pushed on to about 180 km from the Pole, planted the flag, turned their backs on the Pole, and started home. He wrote that failure was theirs, though they had done their best to avoid it. The Scott Polar Research Institute calls it \"the brave decision to turn for home\"."
- **Proposed:** "Years before his famous ship was crushed in the ice, Ernest Shackleton walked towards the South Pole with Frank Wild, Eric Marshall and Jameson Adams, hauling sledges onto the high plateau. At New Year 1909, short of food, he wrote that he made himself \"consider the lives of those who were with me\": go on too far, and they could never get back. He still kept going south for days, until a blizzard pinned them in their tent with the food going. On 9 January they left the sledge, pushed on to about 180 km from the Pole, planted the flag, and started home. He wrote that failure was theirs, though they had done their best to avoid it. The Scott Polar Research Institute calls it \"the brave decision to turn for home\"."
- **Why it improves the pairing:** at 619 words, with y1–y2 and y3's quotes, this reading is over the half-history line. The cut keeps every beat the guest needs (the sum, the wanting to go on, the trap, the turn, the "failure") and drops about 40 words: the separate 6 January admission and the repeated "Pole". The *Endurance* clause is still owned, in one clause.
- **Checks before applying:** Hester to verify the compressed sequence ("kept going south for days, until a blizzard pinned them": the 6 January admission came before the two-day blizzard, F7–F8) and to update the anchors if the 6 January line leaves the reading. On the flag: the content is sound and nobody disputes it, so I'd recommend Robin accepts the round-6 sign-offs rather than send it back for a rework.

### Q053 · explorer-ruler · Robin · ground: Wren [explorer]
- **Where:** `tagline` (10-02, unmarked)
- **Current (verbatim):** "You'll take them anywhere. You'll bring every one of them back."
- **Proposed:** "You plan the way back before anyone's packed for the way out."
- **Why it improves the pairing:** the current line is two You-sentences, and it echoes whoYouAre's "gets every one of them home". The 2 October line ("You measure adventure by who makes it back.") doesn't lean on Shackleton, but it's an abstraction. The candidate is the same care as behaviour, and it avoids the reading's key word "top".
- **Checks before applying:** registry. Lint.

### Q054 · explorer-sage · Robin · ground: Hester [explorer]
- **Where:** `yours 2`, last sentence
- **Current (verbatim):** "Two bars that were hits almost from the night they opened, in San Francisco and Chicago, owed him a debt, and the Chicago one is named after a lost drink whose recipe he uncovered."
- **Proposed:** cut the sentence.
- **Why it improves the pairing:** this is the collection's longest reading (630 words), and with y5's Haigh passage the history goes past half. This sentence is the one the person doesn't need: it's the payoff for Berry, not the mirror for the guest (y4 already says he printed every part). It also adds one of the nine "San Francisco"s across the collection.
- **Checks before applying:** none (removal only; the anchor stays in the dossier). Lint.

### Q055 · explorer-sage · Robin · ground: Wren [explorer]
- **Where:** `tagline` (10-02, unmarked)
- **Current (verbatim):** "You'll wait years for the real answer. Then you give it away."
- **Proposed:** "You read the footnotes, then the books the footnotes came from."
- **Why it improves the pairing:** the current line is the two-sentence beat, and it restates whoYouAre's last lines ("People get the whole answer from you, free"). The 2 October line ("…write the answer so nobody has to trust you") leans on Berry printing the recipe and repeats whoYouAre's "take it on trust". The candidate is the Genius's patience as a habit anyone would recognise.
- **Checks before applying:** registry. Lint.

### Q056 · hero-innocent · Robin · ground: Wren [hero]
- **Where:** `tagline`
- **Current (verbatim):** "There's more to you than this. You just can't prove it yet."
- **Proposed:** options: "You've reread one compliment from years ago more times than you'd admit." / "You write down everything your teacher says, including the jokes."
- **Why it improves the pairing:** whoYouAre ¶1 ends on the same thought in nearly the same words ("you're sure there's more in you than anyone has seen so far, and you don't have the proof yet"). Both candidates are the Initiate's hunger for the right person's word, shown as behaviour. The second sets up the proposal (the answer won't be handed over) without giving it away.
- **Checks before applying:** registry. Lint.

### Q057 · hero-regular-guy · Robin · ground: Wren [hero]
- **Where:** `tagline` (10-02, unmarked)
- **Current (verbatim):** "When it counts, you've already done it a hundred times."
- **Proposed:** "You've already checked where the exits are."
- **Why it improves the pairing:** the current line and the 2 October line ("Your calm is built from all the ordinary days nobody saw.") both restate whoYouAre's close ("a hundred ordinary ones you never mention"). The 2 October line doesn't use the Singapore Sling anecdote, but it is the reading's own sentence. The candidate is short, recognisable preparedness, and it leaves the "hundred" for the reading.
- **Checks before applying:** registry. Lint. (Avoid a fuse-box line here: whoYouAre already opens on it.)

### Q058 · hero-ruler · Robin · ground: Wren [hero]
- **Where:** `tagline`
- **Current (verbatim):** "Everything's gone wrong, and you still set the table at seven."
- **Proposed:** options: "You still make the bed on the morning it all falls apart." / keep the tagline, and change whoYouAre's first sentence from "The week everything goes wrong, you still set the table at seven." to "The week everything goes wrong, you still put a proper dinner on the table."
- **Why it improves the pairing:** the tagline and whoYouAre's first sentence are the same sentence, so the line that should stop the scroll is spent before the reading starts. Either fix keeps the Warrior's best image once.
- **Checks before applying:** registry. Lint.

### Q059 · innocent-caregiver · Robin · ground: Wren [innocent]
- **Where:** `tagline`
- **Current (verbatim):** "You were small too. You looked after them anyway."
- **Proposed:** options: "You're calm first and frightened later, once everyone's safe." / "You've been checking the little ones are all right since you were one of them."
- **Why it improves the pairing:** the current line is whoYouAre's first sentence word for word, so the guest reads it twice in ten seconds. The 2 October recommendation ("You learned to be brave by holding a smaller hand") repeats whoYouAre's "holding the smaller hand". Both options are behaviour that needs neither the flor nor the anecdote.
- **Checks before applying:** `registry.py` for taglines already taken; lint.

### Q060 · innocent-hero · Robin · ground: Wren [innocent]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else could see how far you'd come. You were the last to hear."
- **Proposed:** "You trust the work long before you trust the praise."
- **Why it improves the pairing:** the current line is the mail anecdote (Vadrna finding out last) in the Everyone/You public-private formula. The 2 October recommendation ("You trust the work sooner than the good news.") is the right direction, but "good news" is already in the closing line ("when good news comes, let it in first"). This version keeps the idea and drops the echo.
- **Checks before applying:** registry; lint.

### Q061 · innocent-lover · Robin · ground: Hester [innocent]
- **Where:** `yours 3`
- **Current (verbatim):** "Brooklyn kept at it. Less than two months after Prohibition ended, a reader wrote to the *Brooklyn Eagle*: there's a Manhattan and a Bronx, so why not a Brooklyn? Recipes came in for weeks. In 1945 the Bronx borough president teased that Brooklyn still had no cocktail, …"
- **Proposed:** "Brooklyn kept at it. In 1945 the Bronx borough president teased that Brooklyn still had no cocktail, …" (the rest of the paragraph unchanged)
- **Why it improves the pairing:** history runs just over half (y1–y3 plus y5's 1945 recipe). The 1934 letter repeats the beat that 1910 and 1945 already make, so cutting it brings the reading under half without losing the laugh or the thirty-three recipes.
- **Checks before applying:** none factual (it's a cut). Keep the 1934 anchors in the dossier as "not in the reading".

### Q062 · innocent-outlaw · Robin · ground: Wren [innocent]
- **Where:** `tagline`
- **Current (verbatim):** "Nobody quite believes you when you say it's enough. It is."
- **Proposed:** options: "Your life fits in one sentence, and you like it that way." / "You stepped out of the race quietly and never went back for the finish line."
- **Why it improves the pairing:** the current line is the collection's most common shape (Nobody… / short full-stop beat). The first option is the wedding scene's truth ("There isn't any rest") as plain behaviour, and needs no Thoreau.
- **Checks before applying:** registry; lint.

### Q063 · innocent-ruler · Robin · ground: Wren [innocent]
- **Where:** `tagline`
- **Current (verbatim):** "It looks small to everyone else. It's never been small to you."
- **Proposed:** options: "You've kept the same plant alive for fifteen years and you'd still call it nothing." / "Some things you've looked after every day for years, and you've never once called it effort."
- **Why it improves the pairing:** the current line is a public/private turn, and it repeats whoYouAre's "To anyone else it looks small". The options show the behaviour (daily tending, played down) without the reading's words.
- **Checks before applying:** registry; lint. Separately, the name split (1–1–1) is still Robin's: I'd back *Whole World*, which the reading earns in its last line ("nothing small is ever only small").

### Q064 · jester-caregiver · Robin · ground: Wren [jester]
- **Where:** `tagline`
- **Current (verbatim):** "You decide it's going to be a good night. Then you make it one."
- **Proposed:** "You plan the fun because waiting for the mood has never worked." (the 2 October recommendation)
- **Why it improves the pairing:** the current line repeats whoYouAre's opening ("you've decided it's going to be good anyway") in a You/Then two-beat. The recommendation doesn't lean on Clara Bell Walsh, and it's concrete behaviour. I'd take it as it stands.
- **Checks before applying:** registry; lint.

### Q065 · jester-explorer · Robin · ground: Wren [jester]
- **Where:** `tagline`
- **Current (verbatim):** "Anyone can get the laugh. You're after the second before it."
- **Proposed:** "The silence before the laugh is your favourite part." (the 2 October recommendation)
- **Why it improves the pairing:** it drops the "Anyone can… You…" contrast and keeps the true thing, with no Aviary anecdote. whoYouAre's "a second where nobody knows whether they're allowed to laugh" is the same idea in different words.
- **Checks before applying:** registry ("best part" is *Curtain Call*'s; "favourite part" isn't, but grep).

### Q066 · jester-hero · Robin · ground: Wren [_corpus]
- **Where:** `yours 5`, last two sentences
- **Current (verbatim):** "My guess is it was never only the jokes they were counting on. It was you, turning up every single day, and I'd love you to see that on their faces."
- **Proposed:** "My guess is that on that morning someone else will find the joke for once, because you've been showing them how every day. I'd love you to be there to laugh at it."
- **Why it improves the pairing:** the reversed *Hold the Shark* ends "It'll be you.", and *In One Piece* ends "It was you.". *The Wink*'s version is the third, and the one that belongs least: the Jester's gift is the laugh shared. The new ending gives the joke back to the guest and ends on what they gain. It's still signposted ("My guess").
- **Checks before applying:** lint; D6 (the story's setting) is a separate decision.

### Q067 · jester-hero · Robin · ground: Hester [jester]
- **Where:** `yours 1`, `yours 2` (the story's setting)
- **Current (verbatim):** "In April 1843, prisoners from Texas were being held in the fortress prison at Perote, in Mexico, … For a date that mattered to them, they got hold of mezcal, …" and "Their captain came round, was told it was how the prisoners kept their saints' days at home, and turned to go."
- **Proposed:** options:
  (a) keep the story, and own its edge in two plain clauses: y1 "…For a date that mattered to them, the anniversary of a Texan victory over Mexico, which their guards would hardly have toasted, they got hold of mezcal, …"; y2 "…was told, not quite truthfully, that it was how the prisoners kept their saints' days at home, and turned to go."
  (b) replace the story (Hester to propose another hardship-humour mirror) and keep the drink only if the new story carries it.
- **Why it improves the pairing:** the Open items name what the reading hides: a raiding force taken at Mier, celebrating San Jacinto in a Mexican prison, with toasts that include an ethnic insult. Today the guest gets a warm prison-humour story whose cover story ("saints' days") reads as true. I think (a) is enough: it owns the date in one plain clause without war, deaths or toasts, it makes the captain's moment funnier (he's being fibbed to and still names the joke), and it keeps the joke off the guard. If Robin finds the setting itself wrong for a guest, it's (b). I wouldn't ship it as it stands.
- **Checks before applying:** Hester to verify the wording against Green p. 260 and the card's C4 ("San Jacinto anniversary"; "we told him"); lint; history share stays under half (y1–y2 are 167 of 480 words).

### Q068 · jester-innocent · Robin · ground: Wren [jester]
- **Where:** `tagline`
- **Current (verbatim):** "Nobody believes your stories. They all happened."
- **Proposed:** options: "Something always happens to you on the dull days." / "Put you somewhere with rules about sitting still, and something will go sideways."
- **Why it improves the pairing:** the current line is the Green Swizzle's reveal (taken for fiction, but real) laid on the guest, and the anchors fence that fact as "never on the guest". It's also mass-contrast. The Naïf's behaviour (absorbed by a small thing in a dull room) needs no swizzle.
- **Checks before applying:** registry; lint.

### Q069 · jester-magician · Robin · ground: Wren [jester]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone calls it trouble. Only you know the rules."
- **Proposed:** "Every trick you play, you've already worked out how to undo."
- **Why it improves the pairing:** the current line is the Everyone/Only-you public/private formula. The option is the whoYouAre's rule ("everything can be put right in seconds") as behaviour, in one sentence.
- **Checks before applying:** registry; lint.

### Q070 · jester-sage · Robin · ground: Wren [jester]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone hears the joke. Hardly anyone hears the hope."
- **Proposed:** options: "Your sharpest jokes are about whatever let you down." / "You've a comeback for everything that went wrong, and a picture of how it should have gone."
- **Why it improves the pairing:** the current line is mass-contrast and public/private, and it prints the reading's key pair (joke/hope), which also appears in y3 and the closing line ("say the hope first and the joke second"). Both options show the Cynic's behaviour and leave the hope for the reading to find.
- **Checks before applying:** registry; lint.

### Q071 · lover-caregiver · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "You make people feel expected. Very few people can."
- **Proposed:** "Your house is ready long before anyone says they're coming."
- **Why it improves the pairing:** the current line repeats whoYouAre's "They should just feel expected" and its closing "Very few people are ever given that". The 2 October recommendation ("You move the chair nearer the fire…") repeats whoYouAre's chair and heater. The option is the same behaviour in new words, and it hints at the hope without naming it.
- **Checks before applying:** registry; lint.

### Q072 · lover-creator · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "People make their best things around you. So do you."
- **Proposed:** "Everyone shows you the unfinished thing; yours is still in the drawer." (the 2 October recommendation)
- **Why it improves the pairing:** "So do you" claims the opposite of the reading, whose whole point is that the guest's own work stays hidden ("something of yours, half done, that nobody has seen"). The recommendation doesn't lean on Murphy. It's the person.
- **Checks before applying:** registry; lint ("yours" here is the person's work, not the drink).

### Q073 · lover-hero · Robin · ground: Hester [lover]
- **Where:** `yours 2`; `yours 4` (last sentence)
- **Current (verbatim):** y2 "It nearly came to nothing. It all hung on a special mail train that night, and when they pulled into Amiens they were locked in their compartment and thought they'd be carried past." y4 "I made it warm for the fire Verne's wife lit with her own hands when they arrived, and for the two of them standing bareheaded in the cold courtyard to wave her off."
- **Proposed:** y2 "It nearly came to nothing: at Amiens they were locked in their compartment and thought they'd be carried past." y4 "I made it warm for the fire Verne's wife lit with her own hands when they arrived."
- **Why it improves the pairing:** the story runs well past half. The y4 clause repeats y3's courtyard scene, which already lands ("Nobody there was worried about anyone's hair"), and the mail-train mechanics add suspense without adding to the person. These cuts take about 30 words of story out and bring the reading close to half. If Robin wants it fully under, the next candidate is y1's "She asked only whether she'd miss any connections."
- **Checks before applying:** none factual (cuts only); keep the anchors in the dossier.

### Q074 · lover-innocent · Robin · ground: Wren [_corpus]
- **Where:** `yours 5`, fourth sentence
- **Current (verbatim):** "Then love the next person exactly as you would have before."
- **Proposed:** "Then love the next person exactly as you would have before, and the first time you catch yourself waiting three hours to reply, on purpose, reply now."
- **Why it improves the pairing:** the reversed *The Big Words* asks the same in public ("Same words, same size"). Tying *Wide Open*'s proposal to its own private fear (whoYouAre: "the evening you notice you've waited three hours to reply, on purpose") makes it this person's instruction, and it's concrete enough to do.
- **Checks before applying:** lint.

### Q075 · lover-innocent · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "You've been hurt. You still love like you haven't."
- **Proposed:** "You'd rather be hurt again than learn to play it cool."
- **Why it improves the pairing:** the current line echoes the poster quotation "love like you've never been hurt", so it reads as borrowed. The option is the reading's decision ("being hurt costs less than being careful") as behaviour, in the guest's own terms. It avoids the reversed *The Big Words*' "say it first" and "never has to wonder".
- **Checks before applying:** registry; lint.

### Q076 · lover-magician · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone wants to know you better. You make sure there's always more to know."
- **Proposed:** "You always leave one story for next time."
- **Why it improves the pairing:** mass-contrast and public/private. The option is the Charmer's habit, short, with no echo of whoYouAre's wording.
- **Checks before applying:** registry; lint.

### Q077 · lover-outlaw · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "You don't get people into trouble. You get them to drop the act."
- **Proposed:** "Two hours into anything polite, you're looking for the door, and someone to take with you."
- **Why it improves the pairing:** the current line is a not-X-but-Y, and it repeats whoYouAre twice ("You weren't getting them into trouble"; "people drop the act"). The option is the whoYouAre's "Coming?" moment as recognisable behaviour, with the accomplice already in it.
- **Checks before applying:** registry; lint.

### Q078 · lover-ruler · Robin · ground: Wren [lover]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone knows the effect you have. Almost nobody knows you designed it."
- **Proposed:** "You've practised the things people think you were born with."
- **Why it improves the pairing:** the current line is the Everyone/Almost-nobody formula, and it sits beside its reversed pair's "You know exactly what your attention does. And you mean all of it." (*Up Close*). A guest reading both would hear the same line twice. The option keeps the Sex Symbol's truth (it's authored, not luck) as behaviour.
- **Checks before applying:** registry; lint.

### Q079 · magician-creator · Robin · ground: Wren [magician]
- **Where:** `tagline`
- **Current (verbatim):** "Nobody gets what they asked you for. They get what they meant."
- **Proposed:** options: "Ask you for a few words and you'll come back with the speech of the night." / the 2 October recommendation, "You hear the wish underneath the request; yours stays unspoken."
- **Why it improves the pairing:** the current line is Nobody/They, public/private. The 2 October recommendation doesn't lean on the anecdote and is acceptable. My first option is closer to Robin's one `yes`: concrete behaviour that needs no Campbell Apartment.
- **Checks before applying:** registry; lint ("yours" in the rec is the person's wish, fine).

### Q080 · magician-explorer · Robin · ground: Wren [magician]
- **Where:** `tagline`
- **Current (verbatim):** "Nothing is ever only what it is. Not to you."
- **Proposed:** "You'd rather make one more change than press send."
- **Why it improves the pairing:** the current line is abstract, the most horoscope-like in the family (true of almost any curious person), and a not-X-but-Y. The option is the Alchemist's real fear, the last irreversible step, in seven words.
- **Checks before applying:** registry; lint.

### Q081 · magician-hero · Robin · ground: Wren [magician]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone remembers that you saved it. You remember what you had to change."
- **Proposed:** "You can't enjoy the rescue until you've counted what it cost."
- **Why it improves the pairing:** the Everyone/You public/private formula. The option is the Good Wizard's habit (the part of you that "isn't, quite" relieved) as behaviour, and it sets up the proposal's "let yourself enjoy the whole of what you saved" without saying it.
- **Checks before applying:** registry; lint.

### Q082 · magician-jester · Robin · ground: Wren [magician]
- **Where:** `tagline`
- **Current (verbatim):** "You don't win arguments. You change what people see."
- **Proposed:** "You'd rather show someone than tell them they're wrong."
- **Why it improves the pairing:** not-X-but-Y with a full-stop beat. The option keeps the Illusionist's move (the thing on the table instead of an argument) as behaviour, without whoYouAre's words.
- **Checks before applying:** registry; lint.

### Q083 · magician-sage · Robin · ground: Wren [_corpus]
- **Where:** `yours 5`, the middle three sentences
- **Current (verbatim):** "They're holding your reasons, and they can check them for themselves. If you're right, they'll know why. If you're wrong, nobody was steered by a guess."
- **Proposed:** "They're holding your reasons, and they can grow into them at their own pace. When they get there, they'll know they did it themselves."
- **Why it improves the pairing:** the reversed *Plain to See* is built on exactly this, a way of seeing "plain enough to use without you, and to notice if you've slipped". *Already There*'s person is the Magician (who someone will become), and its fear is that "they went ahead because you said so". The new lines answer that fear with ownership, not error-checking. The sage review names this side as the cheaper move.
- **Checks before applying:** lint; Wren's swap read against *Plain to See*.

### Q084 · outlaw-explorer · Robin · ground: Tomás [outlaw]
- **Where:** recipe row (lemon), and Checks › Balance
- **Current (verbatim):** "| 20 ml (⅔ oz) | fresh lemon juice | squeezed just before |"
- **Proposed:** "| 22.5 ml (¾ oz) | fresh lemon juice | squeezed just before |"
- **Why it improves the pairing:** the drink went to the acid edge only because the shared `sloe_gin` row's acid was corrected from 0.5% to 0% (regular-guy-sage r3). The Checks still say "All in range… 22.5 ml of lemon instead of 20 goes OUT", which is no longer true. At 22.5 ml, `balance.py` (run on a scratch copy) gives initial 25.8% / 10.20 g / 1.29%, finished 16.6% / 6.59 g / 0.83%: everything mid-band. ¾ oz is also a friendlier measure than ⅔ oz. No guest text names the lemon amount.
- **Checks before applying:** `balance.py` on the edited spec; Tomás's 48-case sweep re-run with sloe acid 0–0.2%; rewrite the Checks › Balance row (and drop the "22.5 ml goes OUT" sentence); lint.

### Q085 · outlaw-jester · Robin · ground: Wren [outlaw]
- **Where:** `whoYouAre 2`, sentences 2–3
- **Current (verbatim):** "The joke isn't a reflex. It's how the true thing gets past the people it's about, because put plainly, it would be stopped."
- **Proposed:** "The joke isn't a reflex, and it never punches down. It's aimed at whoever's at the head of the table, because that's the one place a plain sentence would be stopped."
- **Why it improves the pairing:** the approved *No Accident* already owns "You say your truest things as jokes, because a joke slips past people's guard where an argument never would." The Subverter's own ground, in its story (the soldiers' dollars, the governor's bow tie), is the direction of the joke: always upward, at whoever holds the power. The new line keeps the mechanism but makes the aim the point, which sets up ¶3's "laughs at whatever's in charge".
- **Checks before applying:** lint (4-gram check against *No Accident* and *Quote Me*); Wren's swap test.

### Q086 · outlaw-lover · Robin · ground: Wren [outlaw]
- **Where:** `tagline`
- **Current (verbatim):** "You love like it's a getaway. Even where you stop is a hideout."
- **Proposed:** options: "Every time you've fallen for someone, you've also left somewhere." / "You've never fallen for anyone without packing a bag."
- **Why it improves the pairing:** "Even where you stop is a hideout" has to be decoded. It's clever before clear, and the guest meets it cold. The 2 October line ("staying by choice is the harder trick") gives away the proposal. Both options are concrete Fugitive behaviour: love and leaving as one act (whoYouAre ¶1's "Whoever you fell for was also the way out"), without borrowing that sentence's words.
- **Checks before applying:** registry; lint.

### Q087 · outlaw-ruler · Robin · ground: Wren [outlaw]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone sees the rebel. Nobody sees the plan."
- **Proposed:** options: "You hear the next thing early, and quietly give it somewhere to go." / "The first version is already in your head while everyone else is still arguing." (the 2 October line)
- **Why it improves the pairing:** the current tagline repeats whoYouAre ¶2's opening ("People see the rebel. They don't see the plan"), so the title block spends the reading's reveal before the reading starts. It's also the collection's most common cadence (mass contrast, public then private). Both options are behaviour that needs no Anchor story. The first avoids "first version", which whoYouAre ¶1 also uses.
- **Checks before applying:** registry check for taken lines; lint.

### Q088 · regular-guy-caregiver · Robin · ground: Wren [regular-guy]
- **Where:** `whoYouAre 1`, last sentence
- **Current (verbatim):** "For a minute, someone who'd turned into part of the street is just a person in the queue again."
- **Proposed:** "For a minute, someone everyone had stopped seeing is just a person in the queue again."
- **Why it improves the pairing:** the studio's worry is that the cash-machine figure reads as someone sleeping rough. I'd keep the figure. The suspended coffee exists for exactly the person who can't afford one, and the reading's whole point is seeing them as "someone, not a problem". What makes it uncomfortable is "turned into part of the street", which describes the person as scenery in the reading's own voice. The new wording puts the blindness on everyone else, where ¶2 already puts it ("a street where everyone has stopped looking"), and keeps the person a person.
- **Checks before applying:** lint; Wren's resonance re-read of ¶1.

### Q089 · regular-guy-caregiver · Robin · ground: Wren [regular-guy]
- **Where:** `tagline`
- **Current (verbatim):** "Most people learn not to look. You never did."
- **Proposed:** options: "You can't walk past someone and call it nothing." / "Strangers get a real hello from you, and you mean it."
- **Why it improves the pairing:** the current line restates the whoYouAre opening ("Most people pick up a knack… looking through someone"). The 2 October recommendation ("Your eyes stop where everyone else's slide past") is lifted almost word for word from ¶1 ("Everyone else's eyes slide past. Your eyes stop."), so I'd decline it. Both options are behaviour the guest will recognise without the café story, in fresh words.
- **Checks before applying:** registry; lint.

### Q090 · regular-guy-creator · Robin · ground: Wren [regular-guy]
- **Where:** `tagline`
- **Current (verbatim):** "You thought you had to choose. You never did."
- **Proposed:** options: "You're better at it than anyone you grew up with knows." / "The thing you kept quiet is exactly what makes your people proud." (the 2 October line)
- **Why it improves the pairing:** the current tagline gives away the proposal's payoff ("You'll find out you never had to choose", y5) and whoYouAre's "you had to pick". The first option names the hidden talent among one's own people, with no anecdote and no echo. The 2 October line is acceptable but sits close to whoYouAre ¶2 ("They're proud it's one of theirs").
- **Checks before applying:** registry; lint.

### Q091 · regular-guy-magician · Robin · ground: Wren [regular-guy]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone says get a new one. You've already got the back off."
- **Proposed:** "A broken thing gives your hands somewhere to be." (the 2 October line)
- **Why it improves the pairing:** the current line repeats whoYouAre ¶1 ("You've got the back off before they've finished the sentence"). The 2 October line is persona behaviour that needs no okolehao, in fresh words, and it quietly points at the hidden side (the party where nothing's broken) without spending it.
- **Checks before applying:** registry; lint.

### Q092 · regular-guy-outlaw · Robin · ground: Wren [regular-guy]
- **Where:** `tagline`
- **Current (verbatim):** "You don't get away with things. You get let off. That's better."
- **Proposed:** options: "The answer was no until you asked." / "You've never met a closed kitchen you couldn't talk round."
- **Why it improves the pairing:** the current line is whoYouAre ¶2's reveal, used up front ("You don't. You get let off, which is different"). The 2 October line ("Every 'go on, then'…") also lifts a ¶2 sentence. The first option is short, one sentence and about the person, with nothing to decode. The second is warmer but leans on the ¶1 scene.
- **Checks before applying:** registry; lint.

### Q093 · ruler-creator · Robin · ground: Wren [ruler]
- **Where:** `whoYouAre 1`, first two sentences
- **Current (verbatim):** "You notice the thing that's slightly off. The line on the page that sits a millimetre low. The dish that should have come out hot. The word on a menu that doesn't mean what it says. Most people let it pass."
- **Proposed:** "Before anything leaves your hands, you check it once more. The dish that should have come out hot. The word on a menu that doesn't mean what it says. The sign printed a size too small for anyone over sixty to read. Most people let it pass."
- **Why it improves the pairing:** the reversed *Making the Calls* opens "You can tell in a second when something is slightly off: the one wrong word on a page…". The two openings are interchangeable. The Perfectionist's own ground, which ¶2 reveals, is the person at the end who'll never know. The new opening points at that person ("leaves your hands", a sign someone has to read) without spending ¶2's reveal, and drops the shared "slightly off" and "page".
- **Checks before applying:** lint (4-gram against *Making the Calls*); Wren's swap test.

### Q094 · ruler-creator · Robin · ground: Wren [ruler]
- **Where:** `tagline`
- **Current (verbatim):** "You'd rather seem cold than let anyone get the careless version."
- **Proposed:** "Your red pen is for someone who'll never know what you caught." (the 2 October line)
- **Why it improves the pairing:** the current tagline is whoYouAre ¶1's last clause ("you'd rather seem cold than let it go out like that"). The 2 October line is concrete persona behaviour, needs no Collins story, and carries the hidden reason (someone at the end) without the reading's words.
- **Checks before applying:** registry; lint.

### Q095 · ruler-lover · Robin · ground: Wren [_corpus]
- **Where:** `whoYouAre ¶1` last sentence; `¶2` first sentence
- **Current (verbatim):** "They go home thinking you're simply like that." · "You're not simply anything."
- **Proposed:** "They go home feeling remembered." · delete "You're not simply anything.", so ¶2 opens "You know exactly what your attention does, and you give it on purpose, because a lot holds together when you do."
- **Why it improves the pairing:** the reversed *By Design* has "They think you were simply born like that." It's the same beat, and both readings are about a deliberate effect. The new line keeps *Up Close* on what the attention gives the other person, which is its distinct ground. That matches the ruler and lover reviews' tagline changes.
- **Checks before applying:** lint; read with whichever tagline Robin picks for both pours.

### Q096 · ruler-lover · Robin · ground: Wren [ruler]
- **Where:** `tagline`
- **Current (verbatim):** "You know exactly what your attention does. And you mean all of it."
- **Proposed:** options: "You make one conversation feel like the whole point of the evening." / "People leave you feeling like the only one in the room."
- **Why it improves the pairing:** the current line opens whoYouAre ¶2 word for word ("You know exactly what your attention does"). It also leans on self-awareness, which is the reversed *By Design*'s ground ("Almost nobody knows you designed it"). The 2 October line ("You remember the sister, the interview…") lifts whoYouAre ¶1's scene. Both options move the line to what the attention gives the other person, which is *Up Close*'s distinct ground.
- **Checks before applying:** registry; lint.

### Q097 · sage-hero · Robin · ground: Wren [sage]
- **Where:** `yours 3`, last four sentences
- **Current (verbatim):** "I like the size of the ending, too. We don't know whether he ever got everything he went downtown for. The record is smaller: a history that says Seven Grand made the difference, and one man who calls it, "to me", the turning point. I suspect you trust that ending more than a triumphant one."
- **Proposed:** "And I like that the ending is a modest one. Nobody claims he got everything he went downtown for, only that one bar made the difference and, for one man at least, was the turning point. I suspect you trust that ending more than a triumphant one."
- **Why it improves the pairing:** "The record is smaller: a history that says…" makes the guest read a sourcing note. Robin turned "Nobody I've read says…" into plain speech in caregiver-hero. The new wording keeps both hedges (the book's "made the difference", Taggart's personal "turning point") and the Grandmaster's taste for a modest ending, and saves about 15 words.
- **Checks before applying:** Hester to confirm "for one man at least" carries Taggart's "to me"; lint.

### Q098 · sage-innocent · Robin · ground: Wren [sage]
- **Where:** `name` (flagged 1–1–1: *Are You Quite Sure?* · *Nothing Escaped You* · *Before Your Eyes*)
- **Current (verbatim):** "Are You Quite Sure?"
- **Proposed:** "Before Your Eyes"
- **Why it improves the pairing:** the name sits on the guest's card, and "Are You Quite Sure?" read cold is said *to* the guest. That's the very doubt the Prodigy is tired of hearing, and only the reading turns it into Biot's blessing. *Before Your Eyes* is the story's resolution (the salt made in front of him, the result read by his own eye) and the proposal's ("Show them… let them look for themselves"), and it carries what the guest gains. *Nothing Escaped You* flatters. Wren and Tomás have said they could take *Before Your Eyes*. Robin's pick.
- **Checks before applying:** registry for the name; the closing line and epigraph don't echo it.

## P3

### Q099 · caregiver-jester · routine · ground: Wren [caregiver]
- **Where:** `yours 1`, fourth and fifth sentences
- **Current (verbatim):** "I've never found out who named it. I like to think it was someone fond of the people drinking it, because that's the only way you can call someone that."
- **Proposed:** "We don't know who named it, but I like to think it was someone fond of the people drinking it, because that's the only way you can call someone that."
- **Why it improves the pairing:** Robin's own pattern for unknowns ("We don't know…, but I like to think…"). The anchor's fence ("never 'nobody knows'") was there to avoid overclaiming, and "we don't know" claims nothing.
- **Checks before applying:** Hester to confirm "We don't know" is within L2 (who named it is not on record). Lint.

### Q100 · caregiver-lover · routine · ground: Tomás [caregiver]
- **Where:** recipe row `passion fruit syrup`, note
- **Current (verbatim):** "equal weights passion fruit juice (fresh or bottled, unsweetened) and sugar, stirred until clear; takes the place of the crushed sugar"
- **Proposed:** "equal weights passion fruit juice (fresh or bottled, unsweetened) and sugar, stirred until clear; keeps about a week in the fridge; takes the place of the crushed sugar"
- **Why it improves the pairing:** a cold fruit syrup goes off quickly, and the guest is only using 7.5 ml a drink.
- **Checks before applying:** Tomás to set the keeping time.

### Q101 · caregiver-outlaw · routine · ground: Tomás [caregiver]
- **Where:** recipe row `jaggery syrup`, note; method 1; cocktail block
- **Current (verbatim):** "the swap: an Indian cane sugar, made the old unrefined way, in place of white sugar" / "Keep it in the fridge." / a repeated "**Glassware:** … **Contains:** dairy, nuts" pair under the recipe
- **Proposed:** note → "the swap: an Indian cane sugar, made the old unrefined way, in place of white sugar. Some makers clean it with milk or with groundnut extract, so it's marked dairy and nuts to be safe."; method 1 end → "Keep it in the fridge and use it within two weeks."; delete the repeated Glassware/Contains lines (the cocktail block already has both).
- **Why it improves the pairing:** a guest who sees "contains dairy, nuts" on gin, lemon and soda will think it's a mistake, and might ignore the line. One clause makes the safe-side call readable.
- **Checks before applying:** Hester/Tomás to verify the clause against ingredients.json (`jaggery_syrup`: groundnut is sourced F20; milk is Tomás's own knowledge, unsourced, so mark it "some traditional makers"). Tomás to set the keeping time.

### Q102 · caregiver-ruler · routine · ground: Tomás [caregiver]
- **Where:** method 1; cocktail block
- **Current (verbatim):** "let it cool, and bottle it. It keeps in the fridge." / repeated "**Glass:** … **Contains:** veto-free" lines
- **Proposed:** "let it cool, and bottle it. It keeps for about a month in the fridge."; delete the repeated Glass/Contains lines.
- **Why it improves the pairing:** a syrup that makes ten drinks needs a keeping time, and the block shouldn't say the glass twice.
- **Checks before applying:** Tomás to confirm the keeping time (2:1 demerara with vinegar).

### Q103 · creator-caregiver · routine · ground: Tomás [creator]
- **Where:** `yours 4`, first sentence
- **Current (verbatim):** "So the cocktail I've made for you is her drink, made to measure: gin, sweet vermouth and a spoonful of Fernet, stirred with ice until it's very cold."
- **Proposed:** "So the cocktail I've made for you is her drink, made to measure: gin, sweet vermouth and a barspoon of Fernet, stirred with ice until it's very cold."
- **Why it improves the pairing:** the method says "one barspoon… (about 5 ml)" and then counts in spoons. The reading should use the same word.
- **Checks before applying:** none.

### Q104 · creator-magician · routine · ground: Wren [creator]
- **Where:** `yours 2`, second sentence
- **Current (verbatim):** "Milk punch is on record from 1688, and by 1763 Benjamin Franklin was writing the curdled kind into a letter: boiling milk into the punch, then leave it to stand for two hours before straining it."
- **Proposed:** "Milk punch is on record from 1688, and by 1763 Benjamin Franklin was writing the curdled kind into a letter: pour boiling milk into the punch, leave it to stand for two hours, then strain it."
- **Why it improves the pairing:** the original changes grammar halfway through; the new sentence reads as the recipe it describes.
- **Checks before applying:** none (F gesture, 1763 letter).

### Q105 · creator-outlaw · routine · ground: Wren [_corpus]
- **Where:** `whoYouAre ¶2`, last sentence
- **Current (verbatim):** "And without meaning to, you hand people something they rarely name: the nerve to love a thing before anyone has given permission."
- **Proposed:** "And without meaning to, you hand people something they rarely name: the nerve to love a thing before anyone else does."
- **Why it improves the pairing:** permission is the reversed *Asked In*'s ground ("Nobody had to let you"). The Trend Setter's gift is liking it first, as its tagline says.
- **Checks before applying:** lint.

Proposal counts: **P1 1 · P2 8 · P3 8** (17 in all). Of these, 7 are collection-level (V1–V6 and the Oxford block) and 10 are pour-level.

### Q106 · creator-ruler · routine · ground: Tomás [creator]
- **Where:** method 2
- **Current (verbatim):** "Stir a spoon of honey into a spoon of warm water until it runs. Let it cool."
- **Proposed:** "Stir a teaspoon of honey into a teaspoon of warm water until it runs. Let it cool. You'll use 7.5 ml."
- **Why it improves the pairing:** step 3 says "Measure it, don't guess… to the millilitre", but "a spoon" could be a tablespoon (four times the drink's need).
- **Checks before applying:** none.

### Q107 · explorer-creator · routine · ground: Wren [explorer]
- **Where:** `yours 4`, fourth sentence
- **Current (verbatim):** "By coincidence, the book I took the method from describes it as making a 7-Eleven-style frozen treat."
- **Proposed:** "By coincidence, the freezer method I use was worked out to copy a 7-Eleven-style frozen treat."
- **Why it improves the pairing:** it owns the coincidence without the bartender talking about their reading list.
- **Checks before applying:** Hester to confirm the paraphrase of *LI* pp. 141–142 ("replicate a 7-Eleven-style frozen treat").

### Q108 · explorer-jester · routine · ground: Wren [_corpus]
- **Where:** `yours 5`, last sentence
- **Current (verbatim):** "Building is better with two, and I'd bet they'll want to do the next one with you."
- **Proposed:** "I'd bet they'll want to do the next one with you."
- **Why it improves the pairing:** *I'll Tell You Later* ends "you'll find the game is even better with two", and the reversed *Unrehearsed* also ends on company. The bet carries the point without the shared phrase. It also trims one of the four Explorer proposals the explorer review counts as ending "with someone".
- **Checks before applying:** lint.

### Q109 · explorer-ruler · routine · ground: Tomás [explorer]
- **Where:** `method 1`
- **Current (verbatim):** "Stone 100 g of ripe plums and throw the stones away whole; don't crack them. Blend the flesh, skins and all, until smooth. Put it in a small pan with 200 g of white sugar"; "(about 20 minutes; makes about 220 ml, enough for about 35 drinks)"
- **Proposed:** halve it: "Stone 50 g of ripe plums… with 100 g of white sugar"; "(about 20 minutes; makes about 110 ml, enough for about 17 drinks)"
- **Why it improves the pairing:** a syrup for 35 drinks that keeps for a week mostly gets thrown away. Half is still more than a week's drinks.
- **Checks before applying:** Tomás to confirm the yield. No balance change (same syrup, same 6.25 ml).

### Q110 · hero-caregiver · routine · ground: Wren [_corpus]
- **Where:** `whoYouAre ¶1`, first sentence
- **Current (verbatim):** "Something goes wrong for someone near you: the bill nobody can split, the call nobody wants to make, the mistake that was only half theirs."
- **Proposed:** "The bill nobody can split, the call nobody wants to make, the mistake that was only half theirs: someone near you is stuck with it."
- **Why it improves the pairing:** the reversed *Off Duty* opens "Something goes wrong: a fall on the stairs…". Both are crisis-help readings that end on being helped once, so the identical first words are what a guest would notice. The next sentence ("You don't rush.") still follows.
- **Checks before applying:** lint.

### Q111 · hero-creator · routine · ground: Tomás [hero]
- **Where:** `method 1`
- **Current (verbatim):** "Make the grenadine ahead. Put the pomegranate juice and sugar in a jar, close it and shake (or blend) until the sugar has dissolved. Keep it in the fridge."
- **Proposed:** "Make the grenadine ahead. Put the pomegranate juice and sugar in a jar, close it and shake (or blend) until the sugar has dissolved. Keep it in the fridge and use it within two weeks."
- **Why it improves the pairing:** a cold-made fruit syrup goes off. *Till Spring* uses the same base syrup and already gives two weeks.
- **Checks before applying:** Tomás to confirm.

### Q112 · hero-explorer · routine · ground: Tomás [hero]
- **Where:** recipe row `Zirbenz`, note
- **Current (verbatim):** "or any Alpine stone-pine liqueur (Zirbenlikör) of about 35%; made in Austria by Josef Hofer, a family distillery since 1797"
- **Proposed:** "or any Alpine stone-pine liqueur (Zirbenlikör) of about 35%; made in Austria by Josef Hofer, a family distillery since 1797. It's steeped from whole pine cones, seeds and all, so it's marked nuts to be safe."
- **Why it improves the pairing:** "contains: nuts" on a toddy with no nuts in the recipe reads as a mistake. The reason is already in Checks (cones hold the seeds sold as pine nuts; STUDIO-RULES 4).
- **Checks before applying:** Hester to confirm the wording stays within G12 (the maker gives no allergen statement, so "to be safe" carries it).

### Q113 · hero-innocent · routine · ground: Tomás [hero]
- **Where:** recipe row `plain beef broth`, note
- **Current (verbatim):** "beef shin and bones, onion, carrot and water; no salt, no stock cube; made the day before"
- **Proposed:** "beef shin and bones, onion, carrot and water; no salt, no stock cube; made the day before. It's made with beef, so it isn't for anyone who doesn't eat beef."
- **Why it improves the pairing:** *Fine by Me* already flags its pork in the same place. A guest who doesn't eat beef shouldn't have to read the method to find out.
- **Checks before applying:** none.

### Q114 · hero-ruler · routine · ground: Tomás [hero]
- **Where:** recipe row `rich simple syrup`, note
- **Current (verbatim):** "2 parts white sugar to 1 part water, by weight, warmed until clear"
- **Proposed:** "2 parts white sugar to 1 part water, by weight, warmed until clear (100 g sugar and 50 g water make enough for about 20 drinks; it keeps a month in the fridge)"
- **Why it improves the pairing:** the drink uses one teaspoon, so a guest needs to know how little to make, and how long it lasts.
- **Checks before applying:** Tomás to confirm the yield and keeping time.

### Q115 · hero-sage · routine · ground: Wren [hero]
- **Where:** `yours 4`, fourth sentence
- **Current (verbatim):** "The *Cocktail Codex* says a Daiquiri always asks for some quick thinking, because limes vary in sourness from one fruit to the next."
- **Proposed:** "A Daiquiri always asks for some quick thinking, because limes vary in sourness from one fruit to the next."
- **Why it improves the pairing:** y2 already cites "the *Oxford Companion*". Two books named in one reading makes the bartender sound like a researcher. The claim is plain craft, and it stays anchored (*Codex* p. 105).
- **Checks before applying:** none. Lint.

### Q116 · innocent-caregiver · routine · ground: Wren [innocent]
- **Where:** `whoYouAre` paragraph 2
- **Current (verbatim):** "Here's what that gives them, and it deserves saying out loud: the ones who grew up near you learned from you that the dark can be got through."
- **Proposed:** "Here's what that gives them: the ones who grew up near you learned from you that the dark can be got through."
- **Why it improves the pairing:** the clause names the studio's rule ("say the kindness out loud") instead of simply doing it. Robin's own versions just say it ("that's how you share that you care").
- **Checks before applying:** none.

### Q117 · innocent-explorer · routine · ground: Hester [innocent]
- **Where:** `yours 2`
- **Current (verbatim):** "It feeds on the spirit that escapes ageing barrels, yet it's millions of years older than any barrel, so it must live on something else too."
- **Proposed:** "It feeds on the spirit that escapes ageing barrels, yet it's millions of years older than any barrel, so it's thought to live on something else too."
- **Why it improves the pairing:** Oxford (pdf 238) hedges it ("it is believed"). Owning the uncertainty also suits a guest whose whole joy is the open question.
- **Checks before applying:** none.

### Q118 · innocent-explorer · routine · ground: Tomás [innocent]
- **Where:** `method 1`
- **Current (verbatim):** "That makes enough for four drinks, and it keeps."
- **Proposed:** "That makes enough for four drinks, and it lasts."
- **Why it improves the pairing:** Robin's plain-verb rule ("it doesn't last", not "it doesn't keep").
- **Checks before applying:** none.

### Q119 · innocent-jester · routine · ground: Hester [innocent]
- **Where:** Anchors, `place` row (dossier only)
- **Current (verbatim):** "one regular remembered \"lots of orange plastic\", like \"a psychedelic spaceship\""
- **Proposed:** "Jason Crawley, a London bartender who moved to Australia, remembered \"lots of orange plastic\", like \"a psychedelic spaceship\""
- **Why it improves the pairing:** *Proper* pp. 143–144 introduce Crawley as "a London bartender who relocated to Australia". The reading's "one bartender remembered" is right. The anchor contradicts it, and the rulebook keeps the dossier in line with the reading.
- **Checks before applying:** none (verified against `a-proper-drink.md`, printed pp. 143–144).

### Q120 · innocent-lover · routine · ground: Tomás [innocent]
- **Where:** `yours 5`
- **Current (verbatim):** "mine has a spoonful of a dark, bittersweet Italian liqueur that tastes of burnt orange"
- **Proposed:** "mine has a bar spoon and a half of a dark, bittersweet Italian liqueur that tastes of burnt orange"
- **Why it improves the pairing:** the recipe says 7.5 ml, and "a spoonful" could be read as a tablespoon (twice that). "A bar spoon and a half" is Robin's own wording in *Before the Room*.
- **Checks before applying:** none.

### Q121 · innocent-magician · routine · ground: Wren [innocent]
- **Where:** `yours 3`
- **Current (verbatim):** "if somebody tastes whisky for the first time at their distillery, it should be a good first time."
- **Proposed:** "if somebody tastes whisky for the first time from the Larks' distillery, it should be a good first time."
- **Why it improves the pairing:** "their" could be Grant's distillery or the Larks'; the anchor means the Larks'. Clear before clever.
- **Checks before applying:** Hester to confirm against SB that Grant meant the Larks' whisky.

### Q122 · innocent-ruler · routine · ground: Wren [innocent]
- **Where:** `yours 4`
- **Current (verbatim):** "Which drinks Boadas throws, I can't say, so this one is mine."
- **Proposed:** "We don't know which drinks Boadas throws, so this one is mine."
- **Why it improves the pairing:** this is the same move Robin made in *Off Duty* ("Nobody I've read says…" → "We don't know…"): don't talk about the research.
- **Checks before applying:** none.

### Q123 · jester-hero · routine · ground: Tomás [jester]
- **Where:** `yours 4`
- **Current (verbatim):** "and when the drink is poured, put a spoonful of mezcal in it."
- **Proposed:** "and when the drink is poured, put a teaspoon of mezcal in it."
- **Why it improves the pairing:** the recipe and method say 1 teaspoon (5 ml). This is the same wording question as *Hoping You'd Come*.
- **Checks before applying:** none.

### Q124 · jester-lover · routine · ground: Wren [jester]
- **Where:** `whoYouAre` paragraph 3
- **Current (verbatim):** "So here it is, out loud: you give people something to look forward to."
- **Proposed:** "So here it is: you give people something to look forward to."
- **Why it improves the pairing:** "out loud" is the rulebook's own phrase for the kindness rule, and the guest hears the machinery. Robin's edits just say the thing.
- **Checks before applying:** none.

### Q125 · jester-magician · routine · ground: Tomás [jester]
- **Where:** recipe row "dry vermouth", note
- **Current (verbatim):** "from the bottle; kept cold and undiluted, it keeps longer"
- **Proposed:** "from the bottle; kept cold and undiluted, it lasts longer"
- **Why it improves the pairing:** Robin's plain-verb rule.
- **Checks before applying:** none.

### Q126 · jester-ruler · routine · ground: Hester [jester]
- **Where:** `yours 1`
- **Current (verbatim):** "a lobbyist known as Colonel Joe Rickey, who would show bartenders how to make it wherever he went."
- **Proposed:** "a lobbyist known as Colonel Joe Rickey, who, it's said, showed bartenders how to make it wherever he went."
- **Why it improves the pairing:** the audit sources this to Wondrich's "no doubt" (*Imbibe!* pdf 117), which is an inference. The reading states it as a habit on record. A two-word hedge keeps it honest in a reading that is all about competing accounts.
- **Checks before applying:** none. Separately, the name split (1–1–1) is Robin's: I'd back *Somewhere to Land*, which names what the person gives. *Dry Wit* leans on the drink, and *Don't Look at Me* on the hiding.

### Q127 · lover-caregiver · routine · ground: Wren [lover]
- **Where:** `epigraph`
- **Current (verbatim):** "A captain wrote this toddy down from a barman said never to forget a face."
- **Proposed:** "A captain wrote this toddy down from a barman who, people said, never forgot a face."
- **Why it improves the pairing:** the reduced relative clause ("a barman said never to…") reads as a garble on first pass, and the epigraph is read cold.
- **Checks before applying:** none (the captain's own words are "who never forgets the face of a customer").

### Q128 · lover-creator · routine · ground: Tomás [lover]
- **Where:** cocktail block, after the recipe table
- **Current (verbatim):** "**glassware:** two nick-and-nora glasses (small, stemmed), chilled, each rim dipped in coarse sugar on the outside / **contains:** `[]` (veto-free) / **serves:** 2 (his measures fill two small glasses, about 97 ml each)"
- **Proposed:** delete the repeated glassware and contains lines; move "**serves:** 2 (his measures fill two small glasses, about 97 ml each)" up beside the block's glassware line.
- **Why it improves the pairing:** the block states glassware and contains twice; the extractor and the site may show both.
- **Checks before applying:** lint.

### Q129 · lover-explorer · routine · ground: Wren [lover]
- **Where:** `whoYouAre` paragraph 1
- **Current (verbatim):** "You're the one who says yes first. Yes to the cold sea in May, …"
- **Proposed:** "You say yes first, every time. Yes to the cold sea in May, …"
- **Why it improves the pairing:** *Is It Just Me* opens "You're the one who says it." (signals: the only repeated whoYouAre opening in the collection).
- **Checks before applying:** none.

### Q130 · lover-innocent · routine · ground: Wren [lover]
- **Where:** `yours 2`; `yours 3`
- **Current (verbatim):** y2 "How Rita took that, I couldn't say." y3 "In 2014, Japanese television made a morning drama of the two of them, and even the Oxford Companion calls it what it was, a love story."
- **Proposed:** y2 "We don't know how Rita took that." y3 "In 2014, Japanese television made a morning drama of the two of them, and it's remembered as what it was, a love story."
- **Why it improves the pairing:** both lines talk about the research. Robin's edit in *Off Duty* is the model ("We don't know…").
- **Checks before applying:** Hester to confirm "remembered as" is fair to Oxford pdf 1975 ("Masataka and Rita's love story").

### Q131 · lover-ruler · routine · ground: Hester [lover]
- **Where:** `yours 4`
- **Current (verbatim):** "A bartender in Havana named a cocktail for the star, light and sweet, a drink for the curls."
- **Proposed:** "A bartender in Havana, by one account, named a cocktail for the star, light and sweet, a drink for the curls."
- **Why it improves the pairing:** the anchor has the Havana maker as "by one 1928 account", and the guard notes two books name two makers. Two words own it.
- **Checks before applying:** none.

### Q132 · magician-creator · routine · ground: Tomás [magician]
- **Where:** cocktail block, after the recipe table
- **Current (verbatim):** "**Glassware:** tall (Collins) glass, chilled, filled with ice / **Contains:** veto-free"
- **Proposed:** delete both lines (the block already gives glassware and `contains: []` above).
- **Why it improves the pairing:** duplicated fields, which the site may show twice.
- **Checks before applying:** lint.

### Q133 · magician-explorer · routine · ground: Wren [magician]
- **Where:** `yours 3`
- **Current (verbatim):** "I couldn't say why he began in wood and iron. I like to think it was where he could still change his mind, and the copper was where he stopped."
- **Proposed:** "We don't know why he began in wood and iron, but I like to think it was where he could still change his mind, and the copper was where he stopped."
- **Why it improves the pairing:** this is Robin's own fix in *Off Duty*, word for word in shape.
- **Checks before applying:** none.

### Q134 · magician-explorer · routine · ground: Tomás [magician]
- **Where:** `yours 4`
- **Current (verbatim):** "and a spoonful each of syrup and calvados, the apple brandy of Normandy"
- **Proposed:** "and a bar spoon each of syrup and calvados, the apple brandy of Normandy"
- **Why it improves the pairing:** the recipe says "1 barspoon (5 ml)". This is the collection's spoon-wording question (see *Hoping You'd Come*).
- **Checks before applying:** none.

### Q135 · magician-hero · routine · ground: Wren [magician]
- **Where:** `yours 5`
- **Current (verbatim):** "So here's my wish for you: once you've pulled something through and it's safe again, look for whatever had to make way."
- **Proposed:** "So once you've pulled something through and it's safe again, look for whatever had to make way."
- **Why it improves the pairing:** "my wish for you" belongs to the Genie (*On One Condition*: "So this is my wish for you"), and "so here's my…" is the collection's most repeated proposal opening (×6).
- **Checks before applying:** none.

### Q136 · magician-regular-guy · routine · ground: Hester [magician]
- **Where:** `yours 4`
- **Current (verbatim):** "Take away the fire and the pouring, says David Wondrich, the historian, and the Blazer is \"merely a Scotch Whisky Skin\": whisky, lemon peel and boiling water. The Skin was once a popular hot drink in its own right, and still a very good one, Wondrich says. Thomas's recipe from the following year…"
- **Proposed:** "Take away the fire and the pouring, says David Wondrich, the historian, and the Blazer is \"merely a Scotch Whisky Skin\": whisky, lemon peel and boiling water. Thomas's recipe from the following year…"
- **Why it improves the pairing:** the paragraph is 241 words, the longest drink paragraph in my families, and names Wondrich three times. The cut sentence adds praise but nothing to the person, and it brings history back under half.
- **Checks before applying:** none (a cut).

### Q137 · outlaw-innocent · routine · ground: Wren [outlaw]
- **Where:** `yours 5`, first sentence
- **Current (verbatim):** "Here's my side of it. Keep the promise."
- **Proposed:** "Keep the promise."
- **Why it improves the pairing:** *Hear Me Out*, where "my side" is the whole point, opens its proposal with "So here's my side". *Kept*'s proposal stands without the preamble, and starting on the imperative is stronger.
- **Checks before applying:** lint.

### Q138 · outlaw-regular-guy · routine · ground: Tomás [outlaw]
- **Where:** `yours 4`
- **Current (verbatim):** "with orange curaçao, Angostura and a spoonful of sugar syrup."
- **Proposed:** "with orange curaçao, Angostura and a teaspoon of sugar syrup."
- **Why it improves the pairing:** the whole drink turns on the exact teaspoon (recipe, method, closing line). "Spoonful" is the one place where the unit goes vague.
- **Checks before applying:** lint.

### Q139 · outlaw-ruler · routine · ground: Hester [outlaw]
- **Where:** `yours 3`
- **Current (verbatim):** "A new owner has promised it back, though by the autumn of 2026 it still hadn't poured a drop."
- **Proposed:** "A new owner has promised it back, though in the autumn of 2026 it still wasn't pouring."
- **Why it improves the pairing:** we're in the autumn of 2026, so the past perfect reads as if from a later date. The plain present-dated clause says the same thing and is easier to update.
- **Checks before applying:** Hester to re-check Anchor's status before publishing (Open items already asks for this).

### Q140 · regular-guy-caregiver · routine · ground: Tomás [regular-guy]
- **Where:** recipe row (espresso)
- **Current (verbatim):** "| 30 ml | espresso | one shot, pulled only when you're about to shake |"
- **Proposed:** "| 30 ml | espresso | one shot, pulled only when you're about to shake; a stovetop moka pot works too |"
- **Why it improves the pairing:** an espresso machine isn't on the studio's basic-kit list. Checks › Makeable already allows a moka pot, but the guest never sees that. (I'd leave out the "café's takeaway shot" from Checks: the method's "Never before" rules it out.)
- **Checks before applying:** Tomás to confirm a moka shot shakes acceptably (texture). Lint.

### Q141 · regular-guy-explorer · routine · ground: Hester [regular-guy]
- **Where:** Anchors table, row `choice`, meaning column
- **Current (verbatim):** "(His words in 2017; how the handover ended isn't on record, and his regret in the same interview is in the dossier.)"
- **Proposed:** "(His words in 2017; how the handover ended isn't on record. His regret in the same answer, that he should have got out of the way about five years sooner, is used in y3 and y5; \"ashamed\" stays in the dossier.)"
- **Why it improves the pairing:** the rulebook asks for the anchors and the reading to match. y3 quotes the regret and y5 builds on it ("Don't leave it as late as he did"), but the anchor row still says it's dossier-only. Also for Hester: *Time Out* (16 Sep 2026, in Open items) reports liquidators for the Covent Garden company. The reading claims nothing about the outcome, so nothing changes, but the "ending holds today" check should note it.
- **Checks before applying:** none.

### Q142 · regular-guy-lover · routine · ground: Tomás [regular-guy]
- **Where:** spec `_studio/specs/regular-guy-lover.json`, `melt`
- **Current (verbatim):** `"melt": null` (implicit; the tool reports "dilution 0.0% -> 107.0 ml")
- **Proposed:** declare the stirred melt Checks already uses (37.5%, 147 ml), so `balance.py` reports 17.5% / 7.30 g / 0.693%
- **Why it improves the pairing:** the collection matrix and signals now show *First Choice* at 24.1% / 10.03 g, the undiluted mix, which isn't the drink. `balance.py`'s own note asks for melt to be declared on freeform specs. Guest text is unchanged.
- **Checks before applying:** `balance.py` re-run.

### Q143 · regular-guy-magician · routine · ground: Wren [regular-guy]
- **Where:** `yours 5`, first words
- **Current (verbatim):** "So, when you're next asked round and nothing's broken, leave the dripping tap alone."
- **Proposed:** "Next time you're asked round and nothing's broken, leave the dripping tap alone."
- **Why it improves the pairing:** its reversed pour *Cold Water First* opens its proposal "So when you're learning the next one…" (signals: "so when you're…" ×2, exactly this pair). Both proposals also make the same move (step out from behind the skill and into the room), so the openings shouldn't match too.
- **Checks before applying:** lint.

**Not proposed, with my view:**
- *Whoever Comes In*'s OUT: accept it. It's a shakerato (espresso, sugar and spirit, shaken), so the sours band's acid floor doesn't describe it. Arnold's Boozy Shakerato is the honest yardstick. The initial-strength edge (22.8%) is trivial.
- *Right Here*'s `nuts`: liquorice-as-legume is a cautious but defensible reading of "safe side" (there's no legume class). The guest note's "Check the pack for a nut warning" is about packing, not the legume reason. Fine as it is.
- *Loose on Top* beside *For Good*: both are Margaritas without salt. *For Good* is batched with vanilla and diluted ahead, *Loose on Top* is the shaken classic with a grapefruit top. By Robin's rule (only the exact same cocktail is off-limits), this passes, narrowly. I'd hold it there and not add a third.

### Q144 · ruler-caregiver · routine · ground: Tomás [ruler]
- **Where:** `yours 4`, last sentence
- **Current (verbatim):** "So this one can wait a couple of minutes while someone finishes what they're saying."
- **Proposed:** "So this one can wait a minute or two on its ice while someone finishes what they're saying."
- **Why it improves the pairing:** method step 4 says "a minute and a half or so", which is Arnold's tested figure. "A couple of minutes" is his outer limit. "A minute or two" covers both, and the method's figure stays the instruction.
- **Checks before applying:** none.

### Q145 · ruler-hero · routine · ground: Hester [ruler]
- **Where:** `yours 3`
- **Current (verbatim):** "and last I read, the family's descendants still have a big say in how it's made."
- **Proposed:** "and today the family's descendants still have a big say in how it's made."
- **Why it improves the pairing:** Robin replaced "Nobody I've read says…" with "We don't know…" (caregiver-hero). "Last I read" is the same research talk. The source is current (Cowdery, 2024), so "today" holds. The anchor row's "Date it ('last I read')" should change to match.
- **Checks before applying:** Hester to confirm Cowdery 2024 supports present tense; update anchor row `today`.

### Q146 · ruler-magician · routine · ground: Tomás [ruler]
- **Where:** `method 1`
- **Current (verbatim):** "Weigh in 3.4 g of citric acid and 2.1 g of malic acid, and stir until both have dissolved. If you only have citric acid, use 5.5 g."
- **Proposed:** "Weigh in 3.4 g of citric acid and 2.1 g of malic acid (if your scale can't weigh tenths of a gram, about ¾ teaspoon and ½ teaspoon), and stir until both have dissolved. If you only have citric acid, use 5.5 g (about 1¼ teaspoons)."
- **Why it improves the pairing:** a kitchen scale reads whole grams, and a 0.1 g scale isn't on the studio's basic-kit list. Spoon equivalents keep the recipe makeable.
- **Checks before applying:** Tomás to verify the spoon weights of powdered citric and malic acid (my figures are estimates, unsourced); `balance.py` sweep at ±15% acid.

### Q147 · sage-hero · routine · ground: Wren [sage]
- **Where:** `yours 1`
- **Current (verbatim):** "Going out to bars and restaurants in Los Angeles had left him in love with the city's rundown old centre, which, in the history that tells his story, was dead."
- **Proposed:** "Going out to bars and restaurants in Los Angeles had left him in love with the city's rundown old centre, which one book calls dead."
- **Why it improves the pairing:** same research-talk fix as y3, in fewer words. y2's "the same history says" can then read "the same book says".
- **Checks before applying:** lint.

### Q148 · sage-innocent · routine · ground: Hester [sage]
- **Where:** `yours 1`, fourth sentence
- **Current (verbatim):** "Their crystals looked alike, yet in water only the first turned polarised light to one side."
- **Proposed:** "Their crystals looked alike, yet in water only the first turned polarised light (light filtered so it vibrates in one direction) to one side."
- **Why it improves the pairing:** plain language. Every bar term in the collection gets explained, and this science term is the hinge of the whole story. With y1 and y2 both history, it's the sentence most likely to lose the guest.
- **Checks before applying:** Hester to verify the gloss; lint.

### Q149 · sage-magician · routine · ground: Wren [sage]
- **Where:** `epigraph`
- **Current (verbatim):** "Two countries, two whiskies, both often called rye. In one, the rye is usually a little."
- **Proposed:** "Two countries, two whiskies, both often called rye. In one, there's usually only a little rye in it."
- **Why it improves the pairing:** "the rye is usually a little" trips the reader on a cold line. The fix says the same thing (anchor `lineage`: "corn is usually its main grain, with a little rye").
- **Checks before applying:** lint.

### Q150 · caregiver-explorer · Robin · ground: Wren [caregiver]
- **Where:** `yours 3`, last sentence (Robin's)
- **Current (verbatim):** "(If you've never read Mitch Albom's \"the five people you meet in Heaven\", you'd love it)."
- **Proposed:** "(If you've never read Mitch Albom's *The Five People You Meet in Heaven*, you'd love it.)"
- **Why it improves the pairing:** typography only: the title in capitals and italics, and the full stop inside the brackets. No word changes.
- **Checks before applying:** Robin's sentence, so Robin to OK. Note for Robin, no proposal: this reading now has two outside touchstones (Albom and the Post-it Note), and the rule learned from his edits says one. Both are his, so it's his call.

### Q151 · caregiver-innocent · Robin · ground: Wren [caregiver]
- **Where:** `yours 4`, second sentence
- **Current (verbatim):** "Crémant de Bourgogne, Burgundy's sparkling wine, takes the place of the still white wine, built in the glass, not shaken."
- **Proposed:** "Crémant de Bourgogne, Burgundy's sparkling wine, takes the place of the still white wine, which makes it a Kir Royale, the famous sparkling version, built in the glass."
- **Why it improves the pairing:** Robin's rule is to say when the drink is a renowned classic, and a guest who wants to order this should know its name. "not shaken" answers a question nobody asked.
- **Checks before applying:** anchor already carries it (Kir Royale: crémant de Bourgogne or champagne, pdf 1133; bubbles from the 1970s, pdf 2097). Hester to confirm "famous". Lint.

### Q152 · hero-magician · Robin · ground: Wren [hero]
- **Where:** `tagline`
- **Current (verbatim):** "You could make the whole room feel slow. You never have."
- **Proposed:** "You fix the spreadsheet at midnight and let them present it."
- **Why it improves the pairing:** the current line paraphrases whoYouAre's turn ("someone who could make them feel small and chooses… to make them feel capable"), with the You/You two-beat. The candidate is the hidden ability handed over, as behaviour. It's optional: the current line is clear and works.
- **Checks before applying:** registry. Lint.

### Q153 · hero-ruler · Robin · ground: Hester [hero]
- **Where:** `yours 2`, last sentence
- **Current (verbatim):** "Money was so short that for the first two weeks, the bartenders poured from his own bottles from home."
- **Proposed:** cut the sentence.
- **Why it improves the pairing:** the reading is right on the half-history line. This detail is the one the Warrior's mirror doesn't need: the anchor itself says "One clause only", and here it's a whole sentence. Cutting it keeps the dress code and the "grant it first" turn untouched.
- **Checks before applying:** none (removal; the anchor stays in the dossier). Lint.

### Q154 · innocent-magician · Robin · ground: Wren [innocent]
- **Where:** `tagline`
- **Current (verbatim):** "You always say \"probably not\" first. You never mean it."
- **Proposed:** "You can see it working out long before you'd dare say so."
- **Why it improves the pairing:** "probably not" is whoYouAre's phrase and the proposal's ("drop the 'probably not'"), so the tagline gives away the reading's key words. It's also a not-X-but-Y.
- **Checks before applying:** registry; lint.

### Q155 · innocent-magician · Robin · ground: Tomás [innocent]
- **Where:** recipe row 1, note
- **Current (verbatim):** "or any Tasmanian single malt, 40-46%; not cask strength"
- **Proposed:** "or any Tasmanian single malt, 40-46%; not cask strength. If Tasmanian whisky is hard to find where you are, any unpeated single malt aged partly in sherry or port casks makes the same drink in spirit."
- **Why it improves the pairing:** the dossier itself says Tasmanian malts are dear and hard to find outside Australia, and the rulebook says a niche bottle mustn't leave the guest feeling they could never make it. The story stays with Lark; the guest gets a way in.
- **Checks before applying:** Tomás to sweep `balance.py` at 40–46% for the fallback style; `allergens.py` (no change expected); Robin, because the room kept the Tasmanian-only substitute on purpose ("so the story stays").

### Q156 · magician-caregiver · Robin · ground: Wren [magician]
- **Where:** `tagline`
- **Current (verbatim):** "It was never your night. You made sure it was theirs."
- **Proposed:** options: "You've arranged their surprise and slipped out before the lights go on." / the 2 October recommendation, "You arrange the moment and hide at the back of the room."
- **Why it improves the pairing:** the current line repeats the name (*Their Night*) and is a public/private pair. The recommendation doesn't lean on the anecdote but repeats whoYouAre's "at the back". The first option names the exact behaviour the proposal asks the guest to change.
- **Checks before applying:** registry; lint. If the first option is taken, check the closing line ("don't slip out early") doesn't now echo it too closely. If it does, take the recommendation.

### Q157 · magician-sage · Robin · ground: Wren [magician]
- **Where:** `epigraph`
- **Current (verbatim):** "One grape variety made the grappa here. Grappa was first distilled like that in Friuli."
- **Proposed:** "The grappa here comes from a single grape. Nobody made grappa that way until 1973, in Friuli."
- **Why it improves the pairing:** read cold, "distilled like that" doesn't say what "that" is. The option makes the tease plain and keeps the story's year for the reading to explain.
- **Checks before applying:** Hester: "first grappa from a single grape" (Oxford GRAPPA pdf 936) carries "nobody… until 1973". Keep Oxford's scope (single-grape pomace), not the house's 1967 test bottling (C6).

### Q158 · outlaw-caregiver · Robin · ground: Wren [outlaw]
- **Where:** `whoYouAre 2`, last sentence
- **Current (verbatim):** "Here's the gift in it: when you're there, nobody has to fight. Nobody even has to be brave."
- **Proposed:** "Here's the gift in it: when you're there, nobody has to fight."
- **Why it improves the pairing:** the reversed pour *Not Too Polite*, which Robin has edited, says "The people who didn't have to be brave on their own." Dropping the second sentence keeps the gift stated out loud and removes the shared motif from the reversed pair.
- **Checks before applying:** none.

**Not proposed, with my view:**
- *Where You Stand*'s OUT: keep the recipe. The OUT is honest. The `stirred` acid band (0.10–0.14) comes from vermouth drinks, and Embury's Canadian has no acid at all. The built-on-a-cube fallback (1¼ tsp maple) would close it clean, but it leaves Embury's teaspoon and the coupe that y4 describes. The right fix is the `stirred-spirit` style Tomás suggests (it would also clear *Nothing to It*), which is a tool change, not a pour edit.
- *Before It Had a Name*'s quince: I'd keep it. The "may contain" is honestly classed `nuts`, the twist is tied to the story in words ("a nod to a sour beer he took on, and put right"), and the fallback (plain syrup and water) loses the drink's one spark. If Robin wants the pour on the veto-free floor, the fallback is proved and its y4 is already audited. Robin's call.
- *Can't Watch*'s bottle: Pedro's at about £3.50 a drink is within the rule, but outside four cities it's hard to find, and the fallback is the same scarce style. No good alternative keeps the story, so I'd leave it and accept the reach.

### Q159 · outlaw-creator · Robin · ground: Wren [outlaw]
- **Where:** `tagline`
- **Current (verbatim):** "Nobody had to let you. It was good before they did."
- **Proposed:** "A locked door gets you moving; an open one makes you hesitate." (the 2 October line)
- **Why it improves the pairing:** the 2 October line is persona behaviour that needs no Glenlivet story, and it carries the whoYouAre's real turn (the yes is what you don't trust) without using its words. The current line is fine, but it's a Nobody-opening public/private turn.
- **Checks before applying:** registry; lint.

### Q160 · outlaw-magician · Robin · ground: Wren [outlaw]
- **Where:** `tagline`
- **Current (verbatim):** "Everyone else keeps it going. You love it enough to end it."
- **Proposed:** options: "You'd rather lose a tradition than watch it go through the motions." / "You know when keeping something alive is what's killing it." (the 2 October line)
- **Why it improves the pairing:** the current line pre-empts whoYouAre's closing sentence ("That's love too: the kind that's willing to end things"), and it's a mass-contrast turn. The first option uses fresh words and one sentence. The 2 October line is acceptable too, but "alive" also sits in whoYouAre ¶1.
- **Checks before applying:** registry; lint.

### Q161 · outlaw-regular-guy · Robin · ground: Wren [outlaw]
- **Where:** `tagline`
- **Current (verbatim):** "You know how things really get done. You also know what you'll never do."
- **Proposed:** "You know every back door and exactly which one you won't use." (the 2 October line)
- **Why it improves the pairing:** this is concrete behaviour, as Robin's one `yes` was, with the line inside it. It's one sentence instead of a symmetrical pair. There's a faint image overlap with whoYouAre ¶1 ("which door opens if you knock the right way"). That's acceptable, because the tagline adds the refusal.
- **Checks before applying:** registry; lint.

### Q162 · regular-guy-caregiver · Robin · ground: Wren [regular-guy]
- **Where:** `yours 3`, last sentence
- **Current (verbatim):** "You don't sort people into the ones who've earned a hello and the ones who haven't."
- **Proposed:** "Your kindness starts with stopping, before you know a thing about them."
- **Why it improves the pairing:** the current line is the reversed pour's territory (*Everybody's*: "Having favourites feels a bit selfish to you… so you don't"). Both pours are already coffee with a spirit. The new line ties the "why it's you" to the Samaritan's own act, stopping, which ¶1 and the proposal turn on.
- **Checks before applying:** lint (4-gram).

### Q163 · ruler-caregiver · Robin · ground: Wren [ruler]
- **Where:** `whoYouAre 1`, fourth sentence
- **Current (verbatim):** "Two friends going quiet in the wrong way."
- **Proposed:** "A group chat going quiet in the wrong way."
- **Why it improves the pairing:** *Either Way* opens on "Two friends fall out", and *One Table* lists "Two friends each want you to say the other one's wrong". This is one of three Ruler pours whose first scene is two friends at odds. A group chat is just as recognisable and keeps the "wrong kind of quiet".
- **Checks before applying:** lint.

### Q164 · ruler-explorer · Robin · ground: Wren [ruler]
- **Where:** `tagline`
- **Current (verbatim):** "People think you want to change it. You're the one who loves it most."
- **Proposed:** "You fight hardest to change the things you most want to keep."
- **Why it improves the pairing:** the current line spends whoYouAre ¶2's reveal ("you love the old version more than the people defending it") and is a public/private turn. The 2 October line ("You change the date because you want the party to survive") borrows the whoYouAre street-party scene, the "too specific" pattern Robin flagged. The candidate states the behaviour without either.
- **Checks before applying:** registry; lint.

### Q165 · ruler-hero · Robin · ground: Wren [ruler]
- **Where:** `whoYouAre 1`, second sentence
- **Current (verbatim):** "When you tell people there's a place for them, they stop worrying. They can, because you never do."
- **Proposed:** "When you tell people there's a place for them, they stop worrying. They can, because you've taken the worrying on yourself."
- **Why it improves the pairing:** "you never do" can read as "you never worry" or "you never stop worrying". ¶2 (the hidden cost, the fear they'd see you mind) needs the second reading. Clear before clever.
- **Checks before applying:** lint.

### Q166 · ruler-jester · Robin · ground: Wren [ruler]
- **Where:** `tagline`
- **Current (verbatim):** "With you it feels like a party. It's also going somewhere."
- **Proposed:** "The plan arrives disguised as the first joke." (the 2 October line)
- **Why it improves the pairing:** this is persona behaviour that needs no LAB, and it's one clean line. The current line is a two-beat turn, and "going somewhere" repeats y3's last words ("you mean the party to get somewhere").
- **Checks before applying:** registry; lint.

### Q167 · ruler-lover · Robin · ground: Wren [ruler]
- **Where:** `yours 5`
- **Current (verbatim):** "I think you'll get your answer, and I hope it surprises you, in the best way."
- **Proposed:** "I think you'll find out whether they'd still come, and I hope the answer surprises you, in the best way."
- **Why it improves the pairing:** "your answer" points back to a question asked once, in whoYouAre ¶2 ("if I stopped, would they still come?"), two sections earlier. Naming it makes the shortest proposal in the family land.
- **Checks before applying:** lint.

### Q168 · ruler-regular-guy · Robin · ground: Wren [ruler]
- **Where:** `whoYouAre 1`, third sentence
- **Current (verbatim):** "Two friends each want you to say the other one's wrong."
- **Proposed:** "Two neighbours each want you to say the other one's wrong."
- **Why it improves the pairing:** same sibling collision as above. *Either Way* keeps the two friends, because there it's the whole scene.
- **Checks before applying:** lint.

### Q169 · sage-innocent · Robin · ground: Wren [sage]
- **Where:** `tagline`
- **Current (verbatim):** "You got there first. You're still glad you did."
- **Proposed:** "You learned early to sound less sure than you are."
- **Why it improves the pairing:** "still glad you did" leaves the guest to supply what they're glad about. The candidate is the Prodigy's recognisable habit (the "I think" in front of what they know) without using the reading's or closing line's words.
- **Checks before applying:** registry; lint.

**Not proposed, with my view:**
- *On the Record*'s OUT: accept it. A port core can't meet spirit-Martini bands, and Tomás's comparison to the Bamboo shape (and *Night Light*) is the honest one. Finished sugar runs EDGE to OUT across the unsourced port range, so the tea is doing real work. Worth a sourced residual-sugar figure (Hester's Mayson lead) before publishing, not a recipe change.
- *Plain to See* vs *Already There* (magician-sage): both fear leading people into a mistake, and both answer with "give them the reasons or the way of seeing, not the conclusion". *Plain to See* owns this more truly, because Jackson's styles *are* a way of seeing. The cheaper differentiation sits in *Already There*'s proposal, which belongs to the other reviewer, so I flag it rather than move *Plain to See*.
- *A Brother's Care* (approved): no fact, safety, allergen or rule error found. Its "That's you, isn't it?" and its history weight are Robin-approved.

### Q170 · sage-regular-guy · Robin · ground: Tomás [sage]
- **Where:** `closingLine`
- **Current (verbatim):** "No lime: the soda turns the tequila citrusy by itself. Next time the table's arguing, speak up once, for the small thing nobody else noticed."
- **Proposed:** "Pinch the oregano and lay it on the ice. Next time the table's arguing, speak up for the small thing nobody else noticed."
- **Why it improves the pairing:** the first sentence is said three times (method 5, y5, closing line). The oregano is y5's "small thing nobody thought to pick", so the craft half now hands straight to the life half.
- **Checks before applying:** registry for closing lines (no "pinch" collision); lint.

### Q171 · sage-regular-guy · Robin · ground: Wren [sage]
- **Where:** `name` (flagged 1–1–1: *Whatever They Call It* · *Small and Real* · *What Stayed*)
- **Current (verbatim):** "Whatever They Call It"
- **Proposed:** keep "Whatever They Call It"
- **Why it improves the pairing:** it's the only one of the three that sounds like the person (the Dude's shrug) as well as the story (a tequila that lost two names). *Small and Real* describes the drink, and *What Stayed* is the estate's. Hester and Tomás have both said they could take it.
- **Checks before applying:** none.

### Q172 · sage-ruler · Robin · ground: Wren [sage]
- **Where:** `tagline`
- **Current (verbatim):** "Impressive is easy. Exact is what you're after."
- **Proposed:** "You'd rather write it down than remember it wrong."
- **Why it improves the pairing:** the current line is a symmetrical pair of abstractions that could fit any perfectionist (*On Their Behalf*, *Making the Calls*). The candidate is the Scientist's own habit (the meter readings, the bread times), in fresh words, with no Barnard needed.
- **Checks before applying:** registry; lint.

### Q173 · ruler-sage · routine · ground: Wren · D1 [ruler]
- **Where:** `yours 5`, first sentence
- **Current (verbatim):** "One thing I'd say to you, gently. Once everyone's been heard and you've made the call, you've done the fair part."
- **Proposed:** "Once everyone's been heard and you've made the call, you've done the fair part."
- **Why it improves the pairing:** this is the third "One thing…" proposal opening in the family (*Not the Same*: "One thing I'd like you to try"; *One Table*: "One thing, though"). The paragraph's gentleness is already in its words, so it doesn't need the preamble.
- **Checks before applying:** lint.

**Not proposed, with my view:**
- *Either Way*'s gluten: keep the malt. It's the only ingredient that puts the 1908 definition in the glass, and the tie is stated in words ("one rule, whichever side they're on"). The fallback's honey tie ("honey goes with grain") is much weaker. Wren's point that a veto excludes the very guest the reading promises equal treatment is real, but a guest who avoids gluten is served a different pour and never meets this line. Robin's call. If he chooses the fallback, Hester must audit its y4 first (Open items: unaudited).
- *Say So*'s OUT: accept it. It's a wine-led Martini (50 ml vermouth to 30 ml gin, plus 20 ml Tokaji), and the stirred bands are built on spirit-led drinks. The short stir (38.5% dilution, under the band) is right for a drink this low in strength. Like *Where You Stand*, this is a style gap in `balance.py`, not a flaw in the drink.
- **Peychaud's → `nuts` (ruler-outlaw's reclassification):** I agree with it on the safe side. The recipe is secret, and Oxford names nutmeg among its notes. That's the same logic as the cola row, and stricter than the Angostura and Campari calls, but it's defensible. The knock-on matters more than the call: the live tool now reads `nuts` for *No Accident* (magician-outlaw, **approved**), *Anyway* (jester-caregiver) and *Their Night* (magician-caregiver), while their files still say `[]` (signals: "contains: pour file vs live allergens.py"). That's a P1 allergen mismatch for those reviewers, and for Robin on the approved pour. *Had to Be Serious* and *One Table* already declare `nuts`.
