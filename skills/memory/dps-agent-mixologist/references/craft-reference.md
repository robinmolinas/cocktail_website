# Craft Reference

Tomás's working knowledge, from the studio's books and the first three pours. Not a capability: load it when designing or checking.

## The six root families (*Cocktail Codex*: core / balance / seasoning, p. vii)
Search the book with `python3 {project-root}/skills/dps-tools/scripts/library.py search "..." --book codex`.

| Family | Core | Balance | Seasoning | Studio notes |
| --- | --- | --- | --- | --- |
| **Old-Fashioned** | spirit | sugar (or a sweet liqueur/amaro) | bitters, citrus oil | the Champagne Cocktail is an Old-Fashioned with champagne for the spirit, built, not stirred (p. 27): *No Accident* |
| **Martini** | spirit + aromatized/fortified wine | the wine's sweetness | bitters, twist, small liqueur doses | the Manhattan and Rob Roy live here. **Swapping dry sherry for vermouth needs more volume *and* a sweetener (p. 77):** *A Brother's Care* v1 failed on exactly this |
| **Daiquiri** | spirit | citrus + sugar | modifiers, garnish | sours and punches (the Zombie Punch is filed here, p. 126): *Four Shares* |
| **Sidecar** | spirit | liqueur as the sweetener, with citrus | | |
| **Whisky Highball** | spirit | sparkling water | citrus, bitters | long, cold, low effort |
| **Flip** | spirit or fortified wine | egg and/or dairy | spice, nutmeg | **carries `egg-white`/`dairy` (and nutmeg = `nuts`)**: never for a pour that must stay veto-free |

## The spec (one per pour, `_studio/specs/<pairing>.json`)
The machine-readable drink that `balance.py`, `allergens.py`, `lint_pour.py` and `registry.py` read. Examples: `{project-root}/skills/dps-tools/tests/fixtures/sage-lover.json`, `magician-outlaw.json`, `innocent-regular-guy.json`.

```json
{"pairing": "sage-lover", "family": "martini", "style": "stirred", "glass": "nick-and-nora", "serves": 1,
 "ingredients": [{"key": "scotch_blended", "ml": 60}, {"key": "orange_bitters", "dashes": 2},
                 {"key": "sugar", "ml_dry": 150}, {"key": "sugar_cube", "count": 1}],
 "garnish": ["lemon_peel", "sage_leaf"], "melt": null}
```
- **style:** `built` | `hot` | `stirred` | `shaken-spirit` | `shaken` | `collins` | `fizz` | `blended` | `egg-white` | `flip` | `highball` | `carbonated` | `bowl` | `freeform`. A bowl takes `melt` (default 0.15). For long drinks, mark the lengthener poured last `"stage": "top"`; it's added after the base is diluted. For hot drinks, declare the hot water or tea as an ingredient. `freeform` is for anything no style fits: it gives the numbers and the nearest styles, and you justify the balance. Each style's source and derivation is in `data/styles.json`; the six *Codex* root families map to them under `_codex_families`. No type of drink is off limits.
- **Amounts** also take `drops` (0.05 ml).
- **Amounts:** `ml`, `dashes` (0.8 ml), `barspoons` (5 ml), `g`, `ml_dry` (granulated sugar), `count`
- **Keys** come from `{project-root}/skills/dps-tools/data/ingredients.json`, where every value has its source or is marked *unsourced standard value*. A missing ingredient is never a reason to change the drink: add it with `add_ingredient.py` (allergens on the safe side; your call).

## Balance lessons (keep adding)
- **Arnold's ranges are analysis of classics, not laws.** An *edge* is allowed but must be justified in the dossier; *OUT* means redesign.
- **Dry fortified wines take sugar out.** Replace sweet vermouth with dry sherry and the sugar collapses (1.9 g against a 3.7 g floor). Put it back from the same family (a spoon of PX) rather than a syrup bottle.
- **Spirit-backed sparklers run strong:** about 19–21% against Arnold's modern 14–16%. That's an edge (his older recipes ran higher), and it gets flagged.
- **Bowls are judged after the melt**, against the finished shaken ranges.
- **Spirits carry no sugar or acid** (*Liquid Intelligence* pdf 140). Liqueurs and wines do, so check the table.

## Glassware and the journey's vessels
The guest's H6 answer picks a vessel: *Short & strong* (rocks), *Poised & ceremonial* (coupe), *Tall & cold* (collins), *Light & sparkling* (flute). A pour's glass doesn't have to match every guest, but it's one of the answers the live tailoring can weave in. Name glasses a guest can buy: rocks, coupe, Nick & Nora, collins, flute, wine glass, punch bowl and cups.

## Bottles (Robin, 2026-09-26)
Most guests read the drink; some make it at home; a few order it. Generic styles by default. Name a bottle when it really matters (history, or a drink built on it: Laphroaig in the Penicillin), marked *recommended*, with the substitute given as a style, never another brand ("or any smoky Islay single malt"). A niche bottle is fine when it's what makes the drink resonate, never one so rare or costly the guest feels shut out.

## Plain-language method
*The Joy of Mixology* (`library.py … --book joy`; index `joy-of-mixology.index.md`) explains every technique in plain words (The Craft of the Mixologist, pdf 134–161) and gives Regan's drink families (pdf 204–223), a second lens on the *Codex*'s six roots. *A Proper Drink* (`--book proper`) has the original specs of 30 modern classics, in ounces, with their creators.
Write for someone at home. "Squeeze the peel over the top so its oils fall on the drink, then set it aside", not "express and discard". "Stir with ice until very cold", not "stir 30 s to 42% dilution". Say what to chill, in what order, and what to do with the garnish.

## Pairings
Own knowledge first, then the books. The *Flavor Matrix* has no spirit entries, so map each to its base (barley → Grain pdf 136, grape → Grape pdf 140, citrus pdf 80, fig pdf 120, honey pdf 148, and so on). Each entry gives **Best** and **Surprising** pairings. Use a surprise only when it earns its place (sage with orange and honey did). Its charts OCR badly, so use the prose pages.
