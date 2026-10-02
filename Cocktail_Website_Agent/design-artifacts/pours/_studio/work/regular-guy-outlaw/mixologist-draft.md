# Mixologist draft v1.2: The Scoundrel (regular-guy-outlaw)

On the ruled Ford story (Wren r3). v1.1 makes Hester's audit v1 fixes B1–B4 and N1 (round 4); v1.2 makes audit v2's D1 and N6 (round 5). Spec: `_studio/specs/regular-guy-outlaw.json`.

**The drink:** a French 75 (gin, lemon, sugar, Champagne) built over ice in a big wine glass, not served in a flute. Ice in Champagne is the rule it breaks, openly, in step 1 of the method. The original recipe sides with the ice: Oxford's traditional French 75 is strained "into a highball glass filled with cracked ice", and Arnaud's flute version is, in Oxford's words, "counter to the original recipe" (FRENCH 75, pdf 851).

**Glassware:** large wine glass (about 500 ml), filled with ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 50 ml | Plymouth gin (41.2%), recommended | or any dry gin of 40–43% (for a 44% gin, use 45 ml) |
| 22.5 ml | fresh lemon juice | |
| 22.5 ml | simple syrup (1 sugar : 1 water) | |
| 90 ml | brut Champagne, cold | or any brut (dry) sparkling wine; the rest of the bottle is for the table |
| 1 | strip of lemon peel | squeezed over the top, then dropped in |

## Method

1. Fill a large wine glass right to the top with ice. Yes, for Champagne.
2. Shake the gin, lemon and syrup hard with ice for about five seconds, just enough to chill it.
3. Strain it over the ice in the wine glass.
4. Pour in the Champagne slowly, then lift it once with a spoon to mix.
5. Squeeze the lemon peel over the top so its oils fall on the drink, then drop it in.
6. Pour the rest of the bottle for whoever's with you.

## Checks

| check | result |
| --- | --- |
| **Structure** | Codex **Daiquiri family**, a sparkling-wine sour: p. 138 puts "sours that have bubbly ingredients added" "in the Daiquiri's extended family", with Collins drinks, fizzes and sparkling-wine cocktails as its sub-families (the French 75, p. 142). Core: gin plus brut Champagne. Balance: lemon and simple syrup. Seasoning: lemon peel oils. **I depart from the Codex's cut on purpose.** It brings the base down to "half the gin, and two-thirds of the lemon juice and simple syrup" (p. 142: 30/15/15 under 120 ml of wine in a flute). Ours is 50/22.5/22.5 under 90 ml, because poured over ice the Codex's flute spec goes dry (5.35 g, OUT; Rejected versions below). |
| **Balance** | `balance.py`, style `collins` (short shake, wine as `stage: top`, served on ice): **15.0% / 7.15 g / 0.95%, balanced (range 12.5–15.0 / 6.0–7.5 / 0.55–0.95)**. It starts at the top of all three bands on purpose, because the ice in the glass walks it down. Melt sweep (water added after the pour, stage `top`): +20 ml 13.7% / 6.52 / 0.87, in range · +40 ml 12.6% / 6.00 / 0.80, in range · +50 ml 12.1% / 5.77, edge · +60 ml 11.7% / 5.55, OUT. That's what "designed for the ice" means: it stays balanced through about 40 ml of melt. How long that takes isn't modelled, so I don't promise a time. |
| **Strength sweeps** | Gin: 40% 14.8% in range · 41.2% (Plymouth) 15.0% · 42% 15.2% edge · 43% 15.5% edge on the first sip, back in range by +20 ml melt (14.1%) · 44% 15.7% **OUT** on the first sip, so a 44% gin takes 45 ml (15.1% / 7.37 / 0.98, edge; +40 ml melt 12.6%, in range) · 47% 16.4% OUT. So the substitute is "a dry gin of 40–43%", never just "any gin". **Plymouth's 41.2% is unsourced** (Hester N1: no page we have gives today's label; Oxford pdf 1541 says the 1998 owners returned it "to close to its original proof"; the 44% is the 1860 bottling, pdf 1538). The 44% line in the recipe note covers that doubt. Oxford says Plymouth "stands alone in flavor profile" (pdf 1541), so a substitute changes the taste, not the balance. Wine: 11% → 14.6%, 12.5% → 15.3% edge; sugar 0 → 6.80 g, 1.2 g/100 ml (the top of brut) → 7.32 g, all balanced. |
| **Rejected versions** | The Codex's own (30 gin / 15 / 15 / 120 wine) reads 13.7% / **5.35 g OUT** on the on-ice ranges: built for a flute, it's too dry once poured over ice · 45/20/15 + 90: 15.4% edge, 5.40 g OUT · **my round-2 demi-sec idea:** a demi-sec wine (4.1 g/100 ml, unsourced midpoint) with 15 ml syrup gave 15.4% edge / 6.97 / 0.96 edge, and with 40 ml melt 12.8% / 5.75 edge. That's no better than brut with a little more syrup, and it adds a harder-to-find bottle. My numbers caught me, so it's dropped. |
| **Pairings** | Gin, lemon and Champagne is the classic's own pairing. I consulted the *Flavor Matrix* and set it aside: the ice is this drink's one change (the Old Master lesson: a second change blurs the first). I also considered and rejected a dash of Angostura, a Pink Gin nod (Oxford PINK GIN pdf 1520: Plymouth and Angostura, "the addition of ice was common, if not exactly approved"): bitters, sugar and Champagne together are the Champagne Cocktail's shape, which is *No Accident*'s ground. What makes the drink interesting instead is from the books: the original recipe sides with the ice (Oxford pdf 851, above), and the recipe is rebuilt so the melt lands it rather than thins it. |
| **Allergens** | `allergens.py`: contains [], **veto-free** (counts toward the AD-4 floor). Wine fining is ignored (STUDIO-RULES 4). Plymouth is checked as the named bottle. |
| **Makeable** | Shaker, jigger, strainer, bar spoon, one wine glass. No homemade syrup beyond 1:1. The numbers and vetoes are proved for Plymouth at 41.2% (label ABV, unsourced) and swept at 40–44%. Hester cleared naming Plymouth (N1: Ford's link is on the page, *Proper* pp. 109–112, and Oxford PLYMOUTH cross-refers FORD, SIMON, pdf 1541). Guard N2: never "Ford saved Plymouth". |
| **y4 claim (for Wren)** | Ours is 15.0% / 7.15 g / 0.95%: sharper and sweeter than both flute recipes on our pages (Codex p. 142: 13.7 / 5.35 / 0.89; Arnaud's, Oxford pdf 851: 17.4 / 3.62 / 0.68); stronger than the Codex's only. "So it's still balanced while the ice melts into it" holds to about 40 ml of melt. |
| **Guards for the reading (Wren's words; facts are Hester's)** | Never the field gun the name comes from (the family leaves war alone), Prohibition (Oxford: it rose during it; that's the Outlaw family's ground), "intoxicating", or "Jazz Age… irresponsible" (pdf 850–851). "Champagne Collins" is Oxford's own phrase, if the name "French 75" is better left unsaid. No flute anywhere. |
| **Siblings** | Apart from *Before the Room* (Crémant highball, cassis and basil, flute, no ice), *No Accident* (Champagne Cocktail shape, flute), the Prankster's Collins (Old Tom gin, highball glass, no wine) and *Not Too Polite* (gin Collins, Collins glass). Registry triple (daiquiri · Plymouth gin · large wine glass with ice): free (B1 re-check; nearest is *Straight Back*: daiquiri · London dry gin · rocks glass of crushed ice). In the family plan's spread this makes three Daiquiris (Bumpkin, Prankster, Scoundrel), plus the Champion if it takes B, and the Martini count drops to three. No sibling shares base, family and glass. |

**closingLine:** *Ice first, whoever's watching. Then pour the rest of the bottle for the table.*

## Image brief

**Glass and drink:** a large, plain stemmed wine glass filled to the brim with ordinary clear ice cubes. The drink is pale straw-gold and slightly hazy from the lemon, with fine bubbles climbing between the cubes. One long strip of lemon peel curls down among the ice. Nothing on the rim.
**Props (3–5):** an opened bottle of Champagne with no readable label, standing on a bare table, not in a bucket · two or three empty wine glasses set beside it, waiting to be poured for the table · a folded, unreadable sheet of paper beside the bottle, like an invoice (Ford's invoices, *Proper* p. 111; nothing written on it can be legible) · a white linen napkin dropped casually across a place setting, as at the end of a dinner.
**One impossible detail:** a single bubble has risen out of the glass and hangs in the air just above the rim, like a small moon.
**Must not appear:** a flute; an ice bucket; money or cash; any gun, uniform or war imagery; Prohibition props; spilled drinks or party mess; any legible text or brand.
**Palette:** deep charcoal table and wall, warm light from one side for strong light and shadow; a burnt-orange glow in the lemon peel; one bright red note (the foil torn from the bottle's neck).

SCENE: A large, plain stemmed wine glass stands on a deep charcoal table, filled to the brim with ordinary clear ice cubes, and pale straw-gold sparkling liquid, slightly hazy, with fine bubbles climbing between the cubes and one long strip of lemon peel curled among them. Beside it, an opened bottle of Champagne with no readable label stands bare on the table, its torn bright-red neck foil lying beside it, and two or three empty wine glasses wait to be poured. A folded sheet of paper lies near the bottle, unreadable, and a white linen napkin has been dropped across a place setting. Light comes hard from one side, making angular shadows. Above the rim of the full glass, a single bubble has risen out and hangs in the air like a small moon.

## Names

Proposals (pick held to round 5):
- **Just This Once**: what the guest says at the rule, and what the person behind the desk says back. Free in the registry and in every pour file.
- **Worth the Ask**: praises the person who asks, not the drink. Free.
- **Any Chance?**: the ask itself, said with a grin. Free.
- Struck: *Go On, Then* (*Go On* is the Caring Leader's name) and *Let Off* (the Saviour's room considered it, so it's a near miss).
