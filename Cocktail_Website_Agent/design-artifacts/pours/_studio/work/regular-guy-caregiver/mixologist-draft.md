# The Good Samaritan: Tomás's draft (v3, round 4)

Spec: `_studio/specs/regular-guy-caregiver.json`. Story ruled by Wren (round 1): the *caffè sospeso*.

**Glass:** coupe or cocktail glass (about 200 ml), chilled
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | brandy | an aged grape brandy, such as a VS cognac or a Spanish brandy |
| 30 ml | espresso | one shot, pulled only when you're about to shake |
| 15 ml | roasted parsnip syrup | made ahead; the jar keeps about a week in the fridge |
| 2 drops | salt water | or a small pinch of salt |

## Method

1. Ahead of time: peel and slice 250 g of parsnips and roast them at 200°C for about 35 minutes, until the edges are brown. Simmer them for 10 minutes with 250 g sugar and 250 ml water, let it cool, then strain, pressing on the parsnips. You'll have about 400 ml, enough for twenty-odd drinks. Keep it in the fridge.
2. Chill the glass.
3. When someone's actually there, pull one espresso. Never before: it loses its texture fast.
4. Put the brandy, the syrup and the salt in a shaker, then the espresso. Fill it with ice and shake hard for about 10 seconds.
5. Strain into the cold glass and drink it at once: the texture doesn't last.

## Checks

| Check | Result |
| --- | --- |
| Structure | *Codex* Old-Fashioned family: spirit (brandy) as the core, roasted parsnip syrup as the balance, espresso as the bitter seasoning, plus salt. Shaken, not stirred, because espresso's body is foam and an emulsion, and "stirring is for limpid drinks" (LI p. 352, pdf 356). It starts from the Italian *caffè shakerato* (espresso shaken with ice and a little sugar, LI p. 353, pdf 357), with brandy added and no cream. **Owned against the book (Hester D1/D2):** Arnold warns that "adding liquor to a shakerato throws off the dilution and body" and fixes it with cream and a cooler shot (LI p. 354, pdf 358). I leave the cream out on purpose: it would cost the dairy veto and walk into *Everybody's* (cream on coffee). So the drink has a light, short-lived texture, not a lasting foam, and the method says to drink it at once. The brandy and syrup go into the tin before the shot, which takes some heat off it (my arithmetic: 30 ml at about 70°C into 75 ml at room temperature lands near 35°C); no separate cooling step. Never "Arnold's recipe" or "his". |
| Balance | `balance.py`, style `shaken`: 105.1 ml → 51.9% dilution → 159.7 ml; **15.0% ABV, 5.83 g sugar/100 ml, 0.29% acid.** Strength, sugar and dilution in range. Acid reads OUT against the sours' band, which is set for citrus; there is no citrus here. Judged instead against Arnold's own shaken coffee drinks: Café Touba 16.1% / 8.0 g / 0.39% (LI p. 206, pdf 210) and the Boozy Shakerato 10.2% / 3.9 g / 0.29% (LI p. 354). Ours sits between them, on the Shakerato's acid exactly. **Edges (my sweep, shaken formula):** brandy at 36% runs 13.7%, at 43% 16.0%. A hot espresso melts extra ice: about 19 g more water if it goes in near 50°C (30 ml × 50°C ÷ 80 cal/g, my arithmetic), so about 13.4% at worst, still above Arnold's Boozy Shakerato. The syrup's sugar (62 g/100 ml) is my estimate, unsourced. |
| Pairings | Brandy and coffee: the *Codex* pairs cognac with espresso flavours in *In Hot Water* (p. 38). **Spark:** the *Flavor Matrix* entry for root vegetables ("Main Subtypes: Celery root, parsnip, salsify") gives "Best Pairings: Celery, cauliflower, bourbon, coffee, lemon, basil", and says the class is "most commonly roasted or boiled and puréed" (pdf 224). The pairing is for the class, not parsnip alone; roasting is my choice from that line. "Carrot cake" is my taste note, not the book's. Salt: "any cocktail that includes fruit, chocolate, or coffee benefits from a pinch of salt", kept below the point you'd taste it (LI p. 61, pdf 65). |
| Allergens | `allergens.py`: **veto-free** (AD-4 floor holds). New rows added on the safe side: `espresso` (none), `brandy_aged_grape` (none), `saline_solution` (none), `parsnip_syrup` (none). **Flag for Robin (unsourced, my knowledge):** parsnip is in the carrot and celery family, like the caraway in *Not Only the Way*; celery isn't in our veto list, so the guest can't veto it. Some brandies are sweetened or coloured; the numbers assume an unsweetened bottle. |
| Makeable | Basic kit plus an espresso: a machine, a stovetop moka pot or a café's takeaway shot. Oven and pan for the syrup. No named bottle. |

**Word guard (Hester r2):** the sources say "coffee" and "caffè". The espresso is my build; never write that the sospeso was an espresso.

**Owned near-miss:** in shape it's a cousin of the Espresso Martini (spirit, espresso, sugar, shaken, foam). It isn't one: no vodka, no coffee liqueur, and the line it comes from is the Italian bar's shakerato. The reading never names the Espresso Martini (Explorer's Bradsell ground keeps it out too).

**closingLine:** *Make the syrup before you know who it's for.*

Wren's line, taken over mine. Mine ("Make more syrup than you'll drink. Pull the coffee only when someone's there.") said again what the epigraph already says ("made days ahead… waits until someone walks in"), and what y4 says a third time. Hers carries only the position, leave something waiting for the ones you'll miss, and it's still a real step: the jar is made days ahead. Checked: "who it's for" and "before you know" are in no closing line. *Off-Label*'s reading has "before you know what they'll be": a different 4-gram, so no lint hit.

## Image brief

- **Glass:** a coupe or cocktail glass (about 200 ml), chilled, a little frost on the bowl (spec).
- **Drink:** opaque dark brown, with a thin pale foam head right after the shake. Espresso is opaque and its body is foam (LI p. 352); the colours are my description, unsourced. No garnish (spec).
- **Story props (3–5), set on a plain café counter:** a small espresso cup on its saucer, empty and used, pushed to the side (the coffee is drunk, not waiting); two coins left on the counter by the till (paid ahead, nobody there to take them); a cloth over the machine's steam arm; a small, unlabelled bottle of amber syrup at the back (the part made ahead).
- **One impossible detail:** a tiny white cloud, the size of a cup, hovering just above the two coins (Mancini's coffee that falls "from the clouds", A3; Hester owns the wording).
- **Setting and light (persona imagery):** an everyday street-corner café counter in soft, natural morning light, candid and unposed. Palette from the sheet: soft sky blue (Pantone 544 C) in the window light, warm beige (467 C) in the counter and walls, olive green (575 C) in a tile or the cloth.
- **Never:** people or faces, a hand giving a cup, a second full drink, a cup "set aside" or saved, cream or whipped topping, flame, a chalkboard, ledger or any text or prices, Vesuvius or anything that says Naples or Italy, a flag, anyone in need shown as a case, steam rising from a hot cup.

**SCENE:** A chilled coupe of opaque dark-brown coffee cocktail, freshly shaken, a thin pale foam head on top and a faint frost on the bowl, no garnish, stands on the counter of an ordinary street-corner café in soft morning light. Beside it, an empty espresso cup sits on its saucer, pushed aside. By the till, two coins lie on the counter, and a tiny white cloud the size of a cup hovers just above them. A cloth hangs over the espresso machine's steam arm, and a small unlabelled bottle of amber syrup stands at the back. Warm beige counter and walls, soft sky-blue window light, an olive-green tile. No people, no text.

## Names

- **Whoever Comes In** (Wren's; I back it, and I drop my *In Front of You*). It's the custom's own rule: a coffee left for "an unidentified future customer" (Mancini, A2). It's also this guest's answer to "who is my neighbour?". And it's what the method does, since the shot is pulled only when someone arrives. *In Front of You* named the guest's attention. This one names the stranger, which is the one true thing. **One flag for Wren:** the epigraph ends "until someone walks in", so the name and the epigraph say "comes in" and "walks in" one line apart. I'd end the epigraph "…The rest waits until someone's there." It's your call.
- **One Waiting** (Hester's). Against: the drink's point is that no cup is kept waiting, only the syrup and the payment. "One waiting" reads as a cup set aside, and keeping a cup back is *Four Shares*'.
- **In Front of You** (mine, withdrawn in favour of the above).
- **From the Clouds** (Mancini's phrase). *Rosetta* owns "the cloud in this glass".
- **Anything Suspended?** (the ask, now on two sources). It's true, but as a name it explains the custom.

**Pick: Whoever Comes In.**
