# Tomás: notes, creator-magician (The Makeover Artist)

## Round 1: lead, before Wren's read

**Idea:** a clarified milk punch. The makeover is physics, not a trick: a sour is poured into milk, the milk breaks (curds, looks ruined), it rests, and it runs through a coffee filter overnight. What comes out is clear and softer than what went in, because the casein binds the harsh, astringent compounds and leaves with the curds (LI pp. 263-267, pdf 267-271; Franklin's 1763 milk-punch letter is quoted there, p. 267). Whey stays, so it's silky. Basic kit: jug, spoon, sieve, paper coffee filter, fridge. Done in the kitchen, never at the table: no performance.

**Spark (Flavor Matrix, Dairy, pdf 104):** best pairings tropical fruit, dried fruit, honey; **surprise pairings: date, tamarind**. Tamarind is the spark: brown, sticky, the least glamorous thing in the pantry, and its sour is what breaks the milk. Brown in; the wash strips colour as well as tannin (LI p. 266, pdf 270: proteins "strip color and some flavors"), so it should come out amber. The colour is my expectation, not proven.

**New row:** `tamarind_water` (seedless pulp block soaked in hot water, pressed through a sieve, ~100 g pulp : 250 ml). Estimated 20 g sugar/100 ml, 4.0% acid (tartaric), from USDA raw tamarind sugars ~57 g/100 g and a literature 8-18% tartaric range. Unsourced, flagged. Allergens: none (a legume, not a nut; no veto touches it). The drink contains **dairy** regardless (whey proteins and lactose pass the filter).

## Sketches (pre-wash, balance.py freeform)

| v | rum aged | tamarind water | lime | demerara | cold black tea | milk | ml | ABV | sugar | acid |
|---|---|---|---|---|---|---|---|---|---|---|
| 0a | 60 | 20 | 10 | 15 | 15 | 30 | 150 | 16.0 | 9.96 | 0.93 |
| **0b** | 60 | 20 | 10 | 10 | 15 | 30 | 145 | 16.6 | 8.17 | 0.97 |
| 0c | 60 | 30 | 0 | 10 | 15 | 30 | 145 | 16.6 | 9.44 | 0.83 |
| 0d | 50 | 20 | 10 | 10 | 0 | 30 | 120 | 16.7 | 9.87 | 1.17 |
| 0e | 60 | 25 | 5 | 10 | 15 | 30 | 145 | 16.6 | 8.81 | 0.90 |

**Post-wash estimate for 0b (by hand; balance.py can't model the break):**
- Curds take the milk's fat and casein, ~6.5 ml per 100 ml milk -> ~2 ml out. Liquid held in the curds leaves in proportion, so it doesn't move the concentrations.
- Acid spent breaking the milk: LI p. 268 (pdf 272) breaks 250 ml milk with 15 g of 15% citric solution (~2.25 g acid) or ~33 ml lemon (~2 g), i.e. ~0.8-0.9 g acid per 100 ml milk. For 30 ml milk: ~0.25 g. Treated as fully spent (the safe side for "too sour").
- 0b after the wash: 24 ml alcohol / ~143 ml = **~16.8% ABV**, ~11.85 g / 143 = **~8.3 g sugar/100 ml**, (1.40 - 0.25) g / 143 = **~0.81% acid**.
- Against Arnold's shaken-sour finished ranges (15-19.7 / 5.0-8.9 / 0.76-0.94): inside on all three, at the sweet end on sugar, and 1.5 g of that sugar is lactose (far less sweet than sucrose), so it will taste drier than 8.3 reads. Served straight from the fridge, so no further dilution to add; one large cube adds a little melt.
- 0c (tamarind alone breaks the milk, no lime) lands ~0.67% acid after the wash: too flat. Lime stays for brightness.

## To settle
- Wren: is "it has to look ruined before it's right" the person? (Guard: the reveal happens in the kitchen, not performed.)
- Hester: milk punch history (Franklin 1763 is in LI p. 267; anything earlier, and anything true about tamarind in punch).
- Base spirit: aged rum for now; Franklin's was brandy.
- Glass: not a coupe (four already). Sibling watch: Rosetta's cloud (appears, louche), As It Was ("the colour was always there"), Four Shares (the night before).

## Round 2: milk punch conceded; the Cosmopolitan, cranberry first

**Conceded the milk punch.** Wren's person wants "that's so you", and a sour turned clear as water is the "I'd never have recognised it" drink. Also Hester's point: clarity is Half a Rim's and Rosetta's already. (`tamarind_water` row stays in the table; harmless.)

**New rows:** `vodka_citrus` (40%, none), `cranberry_juice_unsweetened` (4.0 g / 2.4%, same basis as Rosetta's cranberry_syrup, Codex p. 183 "very tannic"), `cranberry_cocktail` (12.5 g / 0.65%, estimate, for the "before" only). All unsourced standard values; none touch a veto. Tests 0 failures.

**Shaken, balance.py:**

| spec | vodka citrus | Cointreau-style | lime | cranberry | simple | final ABV / sugar / acid | verdict |
|---|---|---|---|---|---|---|---|
| c1 Codex p. 183 (Cecchini-based) | 60 | 22.5 | 15 | 15 pure | 15 | 16.7 / 7.94 / 0.64 | OUT acid |
| c2 a 90s bar version | 45 | 15 | 10 | 30 cocktail | 0 | 15.7 / 5.00 / 0.52 | OUT acid, sugar at the floor |
| c4 cranberry, no lime | 60 | 15 | 0 | 30 pure | 15 | 16.2 / 7.67 / 0.39 | OUT acid |
| **c7 cranberry first** | 60 | 15 | 15 | 30 pure | 15 | **14.7 / 7.06 / 0.79** | balanced, ABV edge (0.3 under 15) |
| c10 more lime + sugar | 60 | 15 | 20 | 30 pure | 20 | 13.8 / 8.10 / 0.89 | OUT ABV |

Reading:
- The Codex's own Cosmo reads OUT on acid. Cranberry is ~2.4% acid against lime's 6%, and its tannin reads as tartness that balance.py can't hear (same lesson as the Trinidad Sour: a classic can read OUT when a sensation the tool doesn't model is loud). Justifiable, but we don't need to: c7 lands.
- Cranberry as the star (30 ml, double the Codex's 15) only balances if the lime stays at full weight. Without it (c4) it's flat and sweet: the "sweet mess" the Codex warns about (p. 183).
- c7 is veto-free (allergens.py: []), which the milk punch wasn't.
- ABV edge: 14.7 vs 15.0, from the extra juice. Justify (a longer, fruit-led sour) or trim simple to 12.5.

**Open for the room:**
- The spark isn't here yet: c7 is still a Cosmopolitan. Matrix Berry (pdf 52): cranberry's surprise pairings are basil, mushroom, cumin, olive; best pairings include citrus, apricot, peach. To look at next round.
- Rosetta also has cranberry (a syrup layered under absinthe). Keep it here only if the cranberry *is* the story (the bottle the craft bars stopped stocking, Oxford pdf 586 per Hester).
- Wren's guard against a "rescued bad drink" shape (Half a Rim): the angle here is the written-off *ingredient*, not the drink.
- Family: sidecar (Codex p. 154 places the Cosmo there). No pour in the registry uses the sidecar family yet.

## Round 3: back to the milk punch, tamarind as the star

**Came across (back).** What convinced me: Hester's Arnold passage. The wash took the tea's astringency out and "the tea flavor was still very strong" (LI p. 263). So the milk doesn't turn the drink into something else; it takes the harsh edge off and leaves the thing more like itself. That answers my own R2 objection. And Wren's "the only one who isn't worried halfway through" puts the person in the ruined middle, which is where the drink physically is for an hour.

**Wren's guard: does the tamarind still taste of tamarind after the wash?** Casein goes after polyphenols (tannins, astringency; LI p. 265), not acids or sugars. Tamarind's sourness is tartaric acid and its body is sugar, so both pass. Some colour and some flavour go too (LI p. 266: proteins "strip color and some flavors"), so the tamarind has to be dosed as the star: 40 ml, double my R1 sketch, and the only acid in the drink (no lime).

**v1 spec -> `specs/creator-magician.json`** (per serve, made as a batch):
60 aged rum / 40 tamarind water / 5 demerara syrup / 15 cold strong black tea / 30 whole milk.
- balance.py freeform, pre-wash: 16.0% / 8.40 g / 1.07%.
- Post-wash by hand: 148 ml; **~16.2% / ~8.5 g / ~0.91%**, inside Arnold's sour ranges (15-19.7 / 5-8.9 / 0.76-0.94). ~1.5 g of that sugar is lactose (much less sweet), so it drinks drier.
- Milk 1:4 to punch, the same ratio as Arnold's 250 ml milk : 1 L vodka (LI p. 268).
- allergens.py: dairy (whey and lactose pass the filter).
- Tea stays: it's Arnold's before-and-after in the glass (tea's astringency out, tea flavour in).

**The sensitive number is the tamarind's acid.** The row is an estimate (4.0%); pulp blocks vary. At 3% the drink lands ~0.64% (flat); at 5%, ~1.18% (sharp). In range only for ~3.45-4.1%. Fix for a home maker: weigh the pulp (100 g seedless block : 250 ml hot water), and taste the punch before it meets the milk: it should taste too sour, because the milk takes some of that. If it doesn't, a squeeze of lime. Needs a source for tamarind pulp acidity (Hester?).

**Method notes (Rockett's gesture, per Hester):** stir the punch into the milk, not the milk into the punch (LI p. 269). Don't stir after it breaks. Let it rest. Pour through a sieve lined with a paper coffee filter; the first runnings come out cloudy, so pour them back through: the curds on the filter are what clean it. Fridge; keeps (whey foam fades in about a week per LI p. 267, the punch itself holds).

**Sweep (post-wash estimates, 60 rum / 30 milk):**
| tamarind | lime | demerara | tea | post ABV / sugar / acid | tamarind share of acid |
|---|---|---|---|---|---|
| **40** | 0 | 5 | 15 | 16.2 / 8.5 / 0.91 | 100% |
| 30 | 0 | 5 | 0 | 19.5 / 8.6 / 0.77 | 100% |
| 30 | 5 | 5 | 15 | 16.8 / 7.5 / 0.87 | 80% |

Glass still open: not a coupe; not one large clear cube (Half a Rim). Wren's word guard: the reveal isn't "clear".
