# Tomás, draft v3 (round 6)

Spec: `_studio/specs/explorer-magician.json`

**Glassware:** rocks glass, filled with ice
**Contains:** veto-free

## Recipe
| amount | item | note |
| --- | --- | --- |
| 45 ml | London dry gin | |
| 22.5 ml | Campari | |
| 15 ml | sweet vermouth | |
| 15 ml | dry vermouth | half the vermouth dry, so the bitter and the sweet sit level |
| 1 | dried bay leaf, torn in half | from the jar in the kitchen cupboard; scent and a little taste |
| 1 | orange peel | squeezed over the top |

## Method
1. Fill a rocks glass with ice.
2. Put in the torn bay leaf, the gin, the Campari and both vermouths, in any order.
3. Stir for a few seconds.
4. Squeeze the orange peel over the top so its oils fall on the drink, then drop it in.

## Checks
| check | result |
| --- | --- |
| Structure | Martini family: the Negroni is a Martini variation (Codex p. 65, p. 89). Core: gin, with Campari "a unified part of the core" (Codex p. 89). Balance: sweet and dry vermouth. Seasoning: dried bay leaf, orange oil. |
| Balance | balance.py `stirred`: 32.5% → 22.8% ABV, 8.46 → 5.95 g sugar/100 ml (EDGE, band 3.7-5.6), 0.185 → 0.130% acid, dilution 42.2%. Balanced with edges. The sugar edge is deliberate: Campari's bitterness is loud and balance.py can't hear bitterness, so the drink sits at the sweet end of the band. Equal parts (30/30/30), Regan's printed proportions (*Joy* pdf 351), reads 20.8% / 9.49 g (OUT) / 0.14%, which is Arnold's own Negroni (LI pdf 135: 20.7 / 9.4 / 0.14); 45/30/30 still reads 8.06 g OUT. So the gin goes up and half the vermouth goes dry: my own balance, not Arnold's allowance. His "acceptable Negroni" with more gin keeps "the one-to-one correspondence between vermouth and Campari inviolate" (LI pdf 107), and ours has 30 ml vermouth to 22.5 ml Campari. Both are my departures from Regan's recipe, owned. (Swept and set aside: 45 / 22.5 / 11.25 / 11.25, which would keep his one-to-one, also balances at 23.6% / 5.87 g edge / 0.10%, but 11.25 ml is no measure a home jigger has.) Codex printed 90 calls La Rosita "our version of Gary Regan's adaptation" with the dry vermouth "key", but it doesn't say the split was his, so nothing ties the split to him. The method stays his ("BUILD in any order", *Joy* pdf 351). Sweep: 40% gin reads 20.8% EDGE / 6.00 g EDGE / dilution 40.6 EDGE, still balanced. The short stir sets no count: the Negroni "tastes good with normal dilution and tastes good with extra dilution" (LI pdf 107-108). The bay leaf adds no sugar, acid or strength. |
| Pairings | Flavor Matrix: laurel (bay) is on its Citrus wheel (pdf 81, printed 71) and its Grape wheel (pdf 141, printed 131), both rendered and read: so it meets the orange peel and the vermouths' wine. The spark is a kitchen-shelf one by design (Wren's test: ordinary, already within reach, no ceremony). Considered and set aside: cacao nib tincture (Codex p. 89; made specially, and nuts/dairy on the safe side), salt (the Auteur's dash in *Making the Calls*). No pour uses bay (grep). |
| Allergens | allergens.py: veto-free (counts toward the AD-4 floor). New row `bay_leaf_dried`: touches no studio veto (not a nut, dairy, gluten or egg, and not heat). |
| Makeable | Generic bottles, a glass, ice, a spoon, a jar of bay leaves. No named bottle. Numbers proved for a 47% gin and swept to 40%. |

**closingLine:** *Take the bay leaf from the jar you never think about. Then name one habit that's quietly kept you going.*

## Image brief
A heavy rocks glass full of ordinary ice cubes on a plain wooden kitchen table, the drink red (the Codex's "rich, red cloak" of Campari and sweet vermouth, p. 89). Half a dried bay leaf, dull olive green, sits against the ice near the top, with a curl of orange peel beside it. Behind the glass, slightly out of focus, an ordinary glass spice jar of dried bay leaves with its lid off. One soft light from the side, a deep indigo dusk in the window behind, nothing else on the table. No candles, no incense, nothing that looks holy.

## Names
- *Any Order* (Wren's pick; Regan's printed method). Caution: the epigraph already says "build it in any order", and y4 says it again, so the name would spend the line twice.
- *Just Knew* (from "I just knew it worked")
- *Second Nature*
- *Back of the Shelf*
Pick: *Just Knew* (all three, round 5).
