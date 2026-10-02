# Tomás, round 2 working notes (provisional, not a draft)

Spec: `_studio/specs/regular-guy-sage.json` v0: 30 ml sloe gin, 30 ml London dry gin (47%), 22.5 ml dry vermouth, 2 dashes orange bitters, stirred, lemon peel, small stemmed glass chilled, no ice.

## Numbers (stirred, Arnold; my sweep script, in-memory overrides only)
| version | finished | verdict |
| --- | --- | --- |
| Smith's thirds (30 sloe / 30 sweet / 30 dry, Oxford pdf 280) | 15.3% / 9.40 g / 0.41% | OUT strength, sugar, acid (table acid 0.5) |
| LI's Blackthorn (45 Plymouth / 22.5 sweet / 22.5 sloe, LI p. 131) | 22.3% / 6.21 g | OUT sugar (8.80 initial vs 8.0). LI's own printout: start 8.9 g, also above Arnold's stirred band |
| plan's sloe-led 45 sloe / 22.5 gin / 15 dry / 7.5 sweet | 20.9% / 8.22 g | OUT sugar at every sloe sugar 15-30 g; strength edge |
| **v0 30 / 30 / 22.5 dry, sloe acid 0** | 22.3% / 5.60 g / 0.113% | **all in range** |
| v0, sloe acid 0.1 | 22.3% / 5.60 g / 0.138% | all in range |
| v0, sloe acid 0.2 | 0.164% | OUT acid (high) |
| v0, sloe acid 0.5 (table) | | OUT acid |
| v0, sloe sugar 15 / 25 / 30 g | 4.34 / 6.86 / 8.11 g | ok / OUT / OUT |
| v0, sloe 20% or gin 40% | 20.9% / 20.7% | edge strength |
| v0, sloe 30% | 23.2% | ok |

## What the numbers say
- A sloe-gin-led stirred drink runs past Arnold's sugar band; even his own Blackthorn does. Sloe gin leads the taste and colour, the gin carries the volume (1:1).
- The sloe gin's sugar decides the drink (15 g ok, 25 g OUT). Bought sloe gins vary; a home batch varies most. So the method has to let the guest set the sloe gin to the bottle. Next round I prove the rule (e.g. "if it's very sweet, 22.5 ml sloe gin and 37.5 ml gin").
- Table: `sloe_gin` acid 0.5% is unsourced. LI p. 131 gives its Blackthorn a start acid of 0.15%, which its 22.5 ml of sweet vermouth (0.6%) supplies alone, so Arnold's model gives sloe gin ~0. Proposed change to 0 (source: derived from LI p. 131). Effect on *Whoopee* (outlaw-explorer): finished acid 0.895% -> 0.754%, edge, not OUT; its Checks numbers would need a note for Robin.

## Allergens
`nuts` (sloe gin, Hester's card `_studio/fact-cards/sloe-gin.md`). Stands for bought and home-made: the stones steep for months either way. This pour leaves the veto-free floor; said plainly in the recipe.

## Matrix
Stone fruit (pdf 236): best pairings include citrus and wine (the twist and the vermouth: present, not a surprise) and fruit brandy; surprises beer (gluten), sage (*A Brother's Care*'s leaf), soy sauce: set aside, as *Whoopee* did. No spark chosen yet.

## Sibling distance
Martini · sloe gin · small stemmed glass: free in the registry. *Whoopee* is Daiquiri · sloe gin · coupe (shaken, lemon, Cynar). Near the Sage plan's Lone Voice (Martini · port · small port glass): owned. Not "small wild cousins of the plum", "turns it red", "no syrup".
