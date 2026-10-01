# innocent-hero · The Underdog · Tomás's draft (v1, round 2)

Spec: `_studio/specs/innocent-hero.json`. Story: Vadrna (accepted by Wren, round 1). Wren owns the words; everything below is mine to defend on the drink and open to her on the wording.

**Family:** Daiquiri (a sour: the *Codex* Basic Sour, p. 106)
**Glass:** a thin stemmed coupe, chilled in the freezer
**Contains:** nuts (on the safe side: mango; see Checks)

## Recipe

| amount | item | note |
| --- | --- | --- |
| 65 ml | borovička (a juniper spirit from Slovakia and the Czech Republic) | Or, if you can't find it, a juniper-led London dry gin. |
| 22.5 ml | fresh lime juice | |
| 17.5 ml | blended mango syrup (homemade, below) | Tropical fruit, the kind he brought into his drinks after a trip to London. Mango is related to cashew and pistachio, so if nuts are a worry, leave this one aside. |

## Method

1. The day before, or up to two weeks ahead, make the mango syrup. Weigh 250 g ripe, peeled mango flesh and 250 g white sugar, blend until smooth and the sugar has dissolved, then press it through a fine sieve. Keep it covered in the fridge.
2. Put the coupe in the freezer for ten minutes.
3. Pour the borovička, lime juice and mango syrup into a shaker. (Some borovičkas have a little sugar added: if yours tastes sweet on its own, use 15 ml of syrup.)
4. Fill it with ice, close it, and shake firmly for about twelve seconds, until the outside of the shaker is frosted.
5. Strain into the cold glass, through a small tea sieve to catch the ice chips. No garnish.

**closingLine:** *No garnish. And when good news comes, let it in first.*

## Checks

| Check | Result |
| --- | --- |
| **Structure** | Syrup: the *Codex* method for its blended strawberry syrup (p. 47), with mango. *Codex* Daiquiri family: a sour. Core borovička; balance lime and a blended mango syrup; no seasoning, no garnish (the Basic Sour is "No garnish", p. 106). The *Codex* warns that the Daiquiri "often manifests as a blender catastrophe" with fruit (p. 103): this one isn't blended or frozen; the fruit is in the syrup, pressed through a sieve, and the drink is shaken and served up. Borovička is "the Czechoslovak version of gin" (Oxford, pdf 1710), so this is a gin sour in shape: the *Codex* says a swapped spirit keeps a sour balanced, not that it will be delicious (p. 118). |
| **Balance** (`balance.py`, shaken sours) | **v1, all in range.** Initial 24.8% / 12.18 g / 1.33% acid; finished 16.1% / 7.92 g / 0.86% acid; dilution 53.8%, 161.5 ml in the glass. **Rejected on paper:** 60/22.5/22.5, the Basic Sour's own proportions with the syrup for simple: sugar OUT (10.24 g finished vs 8.9), because a blended fruit syrup at equal weights is richer than 1:1 simple. 60/25/20: acid OUT (1.48 initial). 60/22.5/17.5: in range at 40% but strength edges at 37.5% (14.8% finished), so I raised the spirit to 65 ml rather than set a floor. **Strength sweep:** borovička at 37.5% and 40%, and a London dry gin at 40% and 47%, all in range (gin 47%: 18.4% finished). **Borovička's values:** 40% is sourced for one bottle class: *Spišská borovička* is 39.7–40.3% vol (its GI dossier, read by Hester); other labels unsourced, swept at 37.5%. The same dossier lists liquid invert sugar, amount not given, so **0 g sugar is unsourced**. Swept: at 2 g/100 ml in the spirit, still all in range (13.41 g initial, 8.72 finished); at 4 g, sugar edges (14.65 / 9.53), and 15 ml of syrup brings it back in (13.28 / 8.60). So the recipe holds for borovička up to about 2 g sugar per 100 ml; the note in Method tells a guest to taste first and use 15 ml if their bottle is sweet. **Unsourced values:** mango syrup 71 g sugar / 0.25% acid per 100 ml, my estimate from ~14 g sugar and ~0.4% acid per 100 g mango flesh halved by the sugar. By hand: at 64 or 78 g the initial sugar stays 11.0 to 13.3, in range. |
| **Pairings** | The spark is the mango. The *Flavor Matrix* pairs mango with dill "thanks mainly to the woody, piney aromas of both ingredients" (pdf 251), and gin as a family carries juniper's pine (Oxford BOTANICAL, pdf 321; DRY, pdf 682). Juniper itself has "piney-camphorous notes" (Oxford JUNIPER, pdf 1123). So the fruit from far away shares a piney note with the juniper spirit already in the glass: it tastes as if it had always belonged there. Lime with mango: my own knowledge. The Matrix's surprise pairing for tropical fruit, dill (pdf 248), was consulted and set aside: one addition only, and it's the one on the page. |
| **Story in the glass** | All on *Proper* pp. 206–207: the shaker he asked the pub boss to buy him the day after seeing *Cocktail* (asked for; the page never says he got one); Paparazzi already served Daiquiris when he arrived (p. 206), so the family was the house style, never his invention; after a visit to London he "threw out the bar's thick glassware and simple garnishes, and incorporated tropical fruits imported from Holland" (pp. 206–207): the thin coupe and the tropical fruit come from that sentence; mango is our pick from the "tropical fruits imported from Holland" (no fruit is named). No garnish is the *Codex* Basic Sour's (p. 106), my choice: what he threw out were the *simple* garnishes, so a bare rim is never his London lesson. **Owned as mine, not on the page:** borovička. Oxford gives it only as "the Czechoslovak version of gin" (pdf 1710); Slovak production is on record (the GI dossier); any tie to his road is unsourced, and nothing says he poured it. So the link is "I like to think…" only, and never the village as his home. Nothing here claims a recipe of his. |
| **Allergens** (`allergens.py --check nuts`) | contains `nuts`, declared matches. **New rows (mine, on the safe side):** `borovicka` (none: a distilled spirit; distilled grain isn't gluten, STUDIO-RULES 4), `borovicka_375` (sweep row), `mango_syrup` (**nuts**: mango is in the cashew and pistachio family and cross-reactions are reported, my knowledge, unsourced; a nut-allergic guest could reasonably fear it). **This costs the veto-free floor a row:** the plan expected the Underdog veto-free. The family still has three veto-free pours (*Four Shares*, *Night Light*, *The Way It Felt*). If the room wants this one veto-free, the fruit changes and the pine link goes with it; I'd rather keep the mango. |
| **Makeable** | Borovička is sold in Central European shops and online, at about gin prices (my knowledge, unsourced); the substitute style is a juniper-led London dry gin (proved at 40% and 47%). Note: with gin the shape becomes Daiquiri · gin · coupe, which is *Not Only the Way*'s, but only for a guest who swaps; the pour itself is borovička. Mango: fresh and ripe, or frozen chunks thawed. Kit: scale, blender, sieve, shaker, jigger, freezer. |

## Image brief

- **Glass and drink:** a thin-walled stemmed coupe, misted with cold, filled to just below the rim. The drink is opaque and cloudy, a soft pale golden yellow (the colour of ripe mango flesh thinned by lime and a clear spirit: my reading of the bottles, not sourced), with a thin pale froth from the shake. No garnish of any kind, no fruit on the rim.
- **Props (3–5):** a brown paper package on the bar, its string undone and paper folded back, contents not shown (we don't know what was in it); a plain cocktail shaker (the one he asked for; the page never says he got it, so nothing marks it as his); a few used paper train tickets, no readable text; half a ripe mango, cut, beside a chopping board.
- **One impossible detail:** rain runs down the window behind the bar, and one drop runs upward.
- **Light and palette:** warm sunlight coming in after rain; golden yellow (Pantone 1235 C), brown paper, steel.
- **Must not appear:** dice, cards, chips, roulette or anything from a casino; a trophy, medal, certificate or letter with text; any text or labels; a second drink; a bottle label; hair or dreadlocks; Japanese bar tools or anything from Tokyo; a mango slice or any garnish on the glass.

**SCENE (ready to paste):** A thin-walled stemmed coupe, misted with cold, holds an opaque, cloudy, pale golden-yellow cocktail with a thin pale froth and no garnish. Beside it on a worn wooden bar, a brown paper package lies opened, its string undone and the paper folded back, its contents out of view. A plain steel cocktail shaker stands behind it, a few used paper train tickets lie scattered nearby, and half a ripe mango rests cut-side up by a small chopping board. Warm sunlight comes through a rain-streaked window behind the bar; one raindrop on the glass runs upward.

## Names

- **Straight Up** (my pick): it's how the drink is served, up and without ice, and it's what this person has always done, played it straight. Said across a bar it sounds like an order, which is the point: nobody suspects a name that's also the plain truth.
- **No Catch**: the win checked for the catch, and there isn't one. Strong, but it says the position, which the closing line should carry.
- **The Long Way Round**: the road, honestly; softer, risks "poverty as colour" if the reading leans on it.
- **Last to Hear**: Wren's line; better kept for the tagline than spent on the name.

For Wren, not mine to set: tagline candidate (hers) "Everyone else could see how far you'd come. You were the last to hear." (My epigraph idea with a year span is withdrawn: Hester, round 2, the award year is contested, 2007 vs Simonson's 2008, so no year anywhere.)
