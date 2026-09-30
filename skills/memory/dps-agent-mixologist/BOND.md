# Bond

## Basics
- **Name:** Robin
- **Call them:** Robin
- **Language:** English

## Robin's Calls on the Drink (from the first three pours, 2026-09-24)
- **He won't taste the 132.** "I trust you, Tomás. Make sure the balance is right and that it tastes great." The numbers are the tasting.
- **Every cocktail passes the checks:** balance (with the *Codex* for structure), and flavour pairings. The *Flavor Matrix* is a cookbook: use it for the occasional surprising pairing, alongside your own knowledge and the other books.
- **Vetoes are medical, not taste. Classify on the safe side.** Nutmeg counts as nuts. Distilled grain spirits aren't gluten. Spice means heat only. Wine fining is ignored unless a named bottle is labelled.
- **Images follow the pour, never the reverse.** The existing persona images are templates. Your image brief is what the final image is generated from.
- **Shared drinks are fine** when the person calls for it (the True Friend's punch serves 14).

## Robin's Picks So Far
| Personality | Drink | What it taught |
| --- | --- | --- |
| The Connoisseur | *A Brother's Care*: a stirred Rob Roy riff, two sherries, orange bitters, a sage leaf | a dry-sherry swap needs a sweetener (the v1 was too dry) |
| The Trickster | *No Accident*: a Seelbach riff, never stirred, a bitters-soaked sugar cube | a technique can carry the story; sparklers backed by spirit run above 16%, so flag it |
| The True Friend | *Four Shares*: a punch bowl, oleo-saccharum made the night before | care that takes time; the drink can be for many |
| The Visionary | *Down the Line*: a Ramos Gin Fizz, five-minute shake, orange flower water, soda last | the room's first drink without him; he cleared orange flower water ("completely fine") and approved it after two reworks |

## Robin's Rules From the Visionary (2026-09-25)
- **The ingredient table never limits the drink.** A surprising ingredient from the *Flavor Matrix* or anywhere else is welcome. If it isn't in the table, I add it (`add_ingredient.py`), allergens on the safe side. **It's my call, not his to approve**: the guest's own veto protects them.
- **No type of drink is off limits:** hot, long, fizz, frozen, egg, anything, and at least the *Codex*'s six root families. `balance.py` has styles for all of them (hot, highball, collins, fizz with soda added last, blended, flip), and `freeform` for anything else.
- **Endings get cross-checked** once all the pours exist. Change one for distinctiveness only if the quality holds.

## Working Without Him (2026-09-26)
- **Be independent.** Robin isn't in the room for the remaining pours. He corrects after reading the first draft. The calls he'd have made mid-pour are mine, with the reasoning in the Checks table so he can follow it in one read.

## Books Added (2026-09-26)
- *The Joy of Mixology* (Regan; `library.py … --book joy`): drink families, plain-language technique (pdf 134–161), ~200 recipes. *A Proper Drink* (Simonson; `--book proper`): the original specs of 30 modern classics, with creators. Indexes beside each in `Dionysus/docs/_text/`.

## Who's Mixing, and Which Bottles (Robin, First Breath 2026-09-26)
- **Most guests just read the pour** and feel included in it. Second, they make it at home. Third, they ask a bartender for it. So the recipe has to read as possible even to someone who never makes it.
- **Bottles can be particular, not out of reach.** Not too expensive, not too niche, so nobody feels they could never make it. But the first priority is a drink that resonates with the person: a more niche spirit is fine when it's the one that does.
- **Name a bottle when it really matters** (history: Laphroaig in the Penicillin, go for it). Mark it recommended and give the substitute **as a style, never as another brand** ("or any smoky Islay single malt"). Otherwise, generic styles.

## Tools, Strength, Sharing (Robin, First Breath 2026-09-26)
- **Basic equipment, never niche kit.** Shaker, strainer, jigger, mixing glass or jar, bar spoon, muddler, blender, freezer: yes. Sous vide, dehydrator, centrifuge: no. Homemade syrups and overnight steps are fine (he didn't limit prep).
- **No constraints on strength or sharing** beyond resonance with the personality. The flagging rule still stands: outside a style's range, say so in Checks.

## Things They've Asked Me to Remember
- The persona comes first. The menu view may inform, never steer.
- Be stubborn.

## Things to Avoid
- Drinks that only a cocktail bar could make.
- Symbolism that isn't in the taste.

## Riff, Don't Recite (Robin, in the creator-explorer room, 2026-09-26)
- "The cocktails feel like the actual cocktail rather than a potential riff." Not a riff every time, but don't just serve the classic: **use the Flavor Matrix to find something original, a spark.** The balance between original and riff is mine; if the riff adds something to the personality, do it. (Context: Quite Alive and As It Was both sat close to the Hanky Panky and the Aviation.)
- **Room budget (Robin, 2026-09-26):** a pour has **8 rounds at most** (was 10); a rework has 5. Person, story and drink by round 3; full draft by round 5.
