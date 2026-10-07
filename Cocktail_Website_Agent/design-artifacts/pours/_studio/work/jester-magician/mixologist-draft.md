# Drink v1.3: The Elf/Imp (jester-magician), Tomás, round 4

Spec: `_studio/specs/jester-magician.json` (balance.py: balanced, all three in range; allergens.py: veto-free).

**Serves:** 1 glass at a time, from a bottle made ahead for six
**Glassware:** a plain everyday tumbler (about 300 ml), filled with ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | apple brandy, oak-aged (a Calvados, or an American straight apple brandy, not applejack, 40-50%) | from the bottle in the fridge |
| 20 ml | dry vermouth | from the bottle; kept cold and undiluted, it keeps longer |
| 5 ml | rich syrup (2 parts sugar to 1 part water, by weight) | from the bottle |
| 110 ml | soda water, cold | added in the glass, never in the bottle |
| 1 strip | lemon peel, no white pith | squeezed over the top, then dropped in |

## Method

1. Make the rich syrup: warm 200 g sugar with 100 g water, stirring, until it's clear. Let it cool.
2. Make the bottle (six drinks): pour 270 ml apple brandy, 120 ml dry vermouth and 30 ml rich syrup into a clean 500 ml bottle. Close it and turn it over a few times. No water and no soda go in the bottle: vermouth in a watered-down cocktail changes within a few hours.
3. Label the bottle: the drink's name, "apple brandy, strong", and "70 ml over ice, top with soda". Keep it in the fridge. Use it within about a month; it's at its best while the bottle is still full.
4. To serve, fill a plain tumbler with ice and pour in 70 ml from the bottle.
5. Top with 110 ml cold soda water (130 ml if your apple brandy is stronger than 50%) and stir once, gently.
6. Squeeze a strip of lemon peel over the top so its oils fall on the drink, then drop it in.

## Checks

| Check | Result |
| --- | --- |
| **Structure** | Highball family: a core spirit lengthened with a nonalcoholic mixer (*Codex* Highball template; Calvados with a mixer is in the *Codex*: Tyson Buhler's Calvados and Tonic (p. 220), a combination he says "may sound surprising"). Core: apple brandy, split with dry vermouth, so what waits in the bottle is a spirit-and-vermouth mix about 2:1, the shape of a stirred cocktail, undiluted. Balance: soda water (the dilution) and 5 ml rich syrup. Seasoning: lemon peel oils. The door's shape, as the plan asked: an everyday-looking glass of something pale and fizzy, poured from a bottle like anything else in the fridge, that opens onto a proper cocktail. Nothing in it is hidden: the label and the recipe say what it is. |
| **Balance** | `highball`, soda staged as `top`. 180 ml: **14.4% ABV (10-16), 2.81 g sugar/100 ml (0-7), 0.067% acid (0-0.6): all in range.** The bottle itself is 37.1% (strong: hence the label). Sweeps (my `sweep.py`, one call): apple brandy at 40% 11.9%, at 50% 14.4% (the table's row), at 60% 16.9% EDGE, which 130 ml soda brings back to 15.2%; so the method says 130 ml above 50%. Soda 90-130 ml stays in at 40-50% (50%/90 ml is the edge, 16.2%: the recipe says 110). Syrup 0-10 ml stays in (0.34-5.14 g); 5 ml is my call for a dry, apple-forward drink. Vermouth 15-30 ml stays in, and its sugar 0-5 g/100 ml moves the drink only 2.47-3.03 g. Not modelled: the one gentle stir's melt (style note). |
| **Keeping** | The bottle is undiluted on purpose: Arnold, *LI* p. 155, "vermouth in a diluted cocktail is horribly unstable" (it changes within hours once watered), so water arrives only as soda, in the glass. The fridge: the *Codex* keeps vermouth-based and fragile low-proof bottles refrigerated (p. 230; p. 246 on vermouth and fino oxidising once opened), and its infused vermouths keep "up to 3 months" refrigerated (p. 289). **"About a month" for this mix is my craft call, unsourced**, set well inside the *Codex*'s three months for a chamomile-infused vermouth kept in its own bottle; the headspace grows with every pour (*LI* p. 155's cause), so it's freshest while the bottle is full. Vermouth is "very fragile" once opened (*Codex* p. 246). Nothing in the guest's text promises a time: the method carries it, and the closing line no longer leans on it. |
| **Pairings** | Apple with brandy and wine: both on the Pome Fruit "Best Pairings" line (*Flavor Matrix* pdf 196), and lemon (citrus) on the same line. **Matrix consulted for a spark and set aside:** apple's "Surprising Pairings" (pdf 196) are basil, crab, sage, olive, peas. Basil is *Before the Room*'s, sage is *A Brother's Care*'s leaf, olive brine is *Making the Calls*'s dash, crab doesn't belong in a glass, and peas are a legume I'd have to list as `nuts` on the safe side, which would cost this pour its veto-free place. Chamomile with Calvados (*Codex* p. 40) is the *Codex*'s, and chamomile already turns up in seven pour files. So the interest is the serve itself (Robin 2026-09-30: no spark is fine if the drink is made interesting): a cocktail that waits, ready, in an everyday bottle, for whoever opens the fridge. |
| **Allergens** | allergens.py: **veto-free** (counts toward the AD-4 floor). Apple brandy, dry vermouth, rich syrup, soda, lemon peel: no veto in the table. Wine fining in the vermouth ignored (rules 4: no named bottle). No new rows. |
| **Makeable** | No named bottle: apple brandy as a style, "a Calvados, or an American straight apple brandy, not applejack, 40-50%", proven at 40, 50 and 60% (above 50%, more soda). What the style is, from Oxford: Calvados is a cider-based brandy from Normandy, clear off the still, darkening in oak, and sold as calvados after two years in barrel ("Fine", "Trois pommes"; CALVADOS pdf 389-390); the *Codex* favours Calvados of at least three years for mixing, as younger ones can get lost in the mix (p. 160). Oxford's APPLEJACK (pdf 128-129) uses "applejack" and "apple brandy" as old names for one American spirit, oak-mellowed; today's labels differ (below). **No library page gives Calvados a strength** (Hester T2), so 40% is unsourced and rests on my sweep; American straight apple brandies are 44-50% (*Codex* pp. 160-161, Hester T1). Not applejack: by US law it's "a blend of apple brandy and neutral grain spirits" (*Codex* p. 160, Hester T3), so the recipe says so. Kit: a 500 ml bottle with a cap or swing top, a jigger, a tumbler, a vegetable peeler. Nothing to perform at serving: pour, top, stir once. |
| **Sibling watch** | First apple-brandy base in the registry. Family: *The Wink* has mezcal (avoided, Wren). *Worth the Trip* (gin Rickey) adds the soda on arrival; here soda is added at every glass from a bottle that waits, and the closing line doesn't rest on the soda. *Rent-Free* leaves a bay leaf in its wine bottle overnight in the fridge: nothing steeps in mine. *For Good* owns "make it a day ahead" in its closing line: mine doesn't say ahead. *Brought Home* owns "name on the bottle": I say "label". **Flag for Wren and Hester:** *Fine by Me* (the Trailblazer, explorer-outlaw) is also set at this bar and is also a Highball (bourbon, tall highball glass). Base, glass and gesture differ; both carry apple (its dry cider, my apple brandy), so neither text compares this drink to cider. Robin will read two highballs from one bar: owned in the reading's one clause about the overlap. No olive, no salt swap, no hidden layer, no cloud, nothing from a hot dog or the show. |

**closingLine:** *Label the bottle before it goes in the fridge. Then plant your next surprise somewhere it's still going once you've left the house.*

## Image brief

**The glass and the drink:** a plain, straight-sided everyday tumbler (about 300 ml), filled with ice, holding a clear, pale gold, gently fizzing drink (an amber spirit and a pale vermouth cut with more than their volume of soda: apple brandy is oak-aged and amber-toned, Oxford pdf 390, *Codex* pp. 160-161; the pale gold after soda is my estimate). A curl of lemon peel sits against the ice near the top.

**Scene:** a home kitchen counter at night, lit only by the cool white light spilling from a fridge door standing open just out of frame. Beside the tumbler stands the bottle it came from: a plain clear 500 ml swing-top bottle, a little over half full of the same liquid, darker and undiluted, with an acid-green paper tag (Pantone 802 C) tied round its neck on string, its handwriting turned away so no text shows. Props: a small bottle of soda water, cap off; a whole green apple; a lemon with one strip of peel missing and a vegetable peeler beside it.

**One impossible detail:** the fridge light throws the swing-top bottle's shadow up the kitchen wall, and the shadow is the shape of a narrow wooden phone booth with tall glass-panelled folding doors, closed (the booth as Oxford's photo shows it, pdf 1855), with no lettering.

**Must not appear:** people or hands, readable text or numbers, a second drink, hot dogs or any food from a hot-dog shop, a television or spy gadgets, a keyhole, a password, a velvet rope or anything about getting in, a sign or a brand on the booth's shadow, a phone receiver off its hook (how the booth opens is on no page), olives, smoke or a cloud, a shaker or a coupe.

**Palette:** the fridge's cool white and the night kitchen's soft shadow, the drink's warm pale gold, and one sharp acid green (802 C) in the tag and the apple.

## Names

- **The Kind You'd Want** (my pick): it recognises the person's private rule. Their trouble is always the kind people would want, which is why they're let in on purpose. Sayable at a bar ("I'll have The Kind You'd Want"), a little cheeky, and it shares no word with the closing line.
- **While You're Out**: the surprise that keeps working when its maker's gone. It leans on the position, so it may give it away twice with the closing line.
- **Help Yourself**: the open bottle in the fridge. Warm, but it captions the serve more than the person.
- **Let In on Purpose**: from the persona's first line. It's true, but it reads as a description.
