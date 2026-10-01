# Tomás, round 2 leads (no spec yet; story not ruled)

## The drink under the show
- Imbibe! pdf 141 (Wondrich): "from the unsentimental perspective of mixology, the Blue Blazer is not much of an invention, being merely a Scotch Whisky Skin" plus the bartender's usual mixing method, "and, of course, fire". So the glass holds the Skin: what's left when you take the show away.
- Whisky Skin, Imbibe! pdf 140: Thomas 1862, small bar glass, 2 oz Scotch, a piece of lemon peel, tumbler half full of boiling water. Notes: the 1887 edition says "Glenlivet or Islay"; Thomas gives no sugar, Wondrich takes 1 tsp Demerara; long strip of peel, no pith, in with the sugar "to ensure maximum extraction".

## Two whiskies that wouldn't have met
- Blue Blazer as printed 1863/1867, Imbibe! pdf 142: "Scotch and Irish whisky mixed [1 oz each]", teaspoon of sugar, lemon skin, "cover with cup". 1862 book: Scotch alone.
- Wondrich (pdf 142) suggests cask-strength Redbreast with cask-strength Caol Ila ("the brand Thomas had in his cellars") if you want smoke. Unlit, cask strength isn't needed (it was only for lighting: "very difficult to get anything weaker to light").
- Proposal: split base, Caol Ila (recommended; substitute any Islay single malt) with an Irish single pot still whiskey (style). Codex p. 104 for the split base. Smoke carries the fire with no flame; the Irish rounds it.

## Gesture (craft, unsourced physics)
- Thomas ends "cover with cup". Home version: sugar and peel under boiling water, covered with a saucer while it steeps, so the lemon oil and, after the whisky goes in, the smoke stay in the glass instead of the room. Lifting the cover is the only reveal, and it's the maker's.
- No throw, hot or unlit (Wren). Heatproof glass, warmed first.

## Vetoes
- Whisky (distilled grain: not gluten), sugar, lemon, water: veto-free expected. Run allergens.py once spec'd.

## To check before spec
- Spark: Matrix Grains pdf 136 best pairings honey, citrus (citrus already there as the peel). Honey is heavy in siblings (Any Day, Brought Home, Off Duty): grep before proposing anything.
- Sibling hot toddies: Off Duty (Irish whiskey, thyme, teacup), Hoping You'd Come (cognac, roast apples). Islay/smoke not used by any pour (grep 2026-10-01).
- Words: no "stand in" (Genie), no "a minute" without rewording (Half a Rim).

## Round 3: spec v1 (PENDING Wren's ruling) — `_studio/specs/magician-regular-guy.json`
- 30 ml Caol Ila 12 (43%, recommended; any Islay single malt) · 30 ml Irish single pot still whiskey (style, 40%+) · 14 g demerara sugar · 150 ml boiling water · 1 long strip lemon peel, no pith.
- balance.py (hot): 11.4% ABV, 6.40 g/100 ml sugar, 0.00% acid; 218.8 ml; all in range.
- Rejected on paper: 10 g sugar at 135 and 150 ml water (4.97 and 4.62 g, OUT low; Wondrich's single teaspoon is too little sugar for Arnold's hot band). 120 ml water sits at 13.2-13.4%, the top edge.
- Strength sweep (at 150 ml water, 14 g): 40/40 → 11.0%; 46/46 → 12.6%; cask-strength Islay 57 with Irish 40 → 13.3%, edge. Rule: bottling strength, not cask strength (unlit, the only reason for cask strength is gone: pdf 142).
- allergens.py: veto-free (AD-4 floor).
- Which printing: the 1863 recipe (as reprinted 1867, pdf 142) gives Scotch and Irish mixed, the small bar tumblers and "cover with cup". The 1862 book is Scotch alone (Hester). We follow 1863 and say so; no first-print year.
- Matrix consulted: Sugar Syrups (pdf 240) best pairings include grain, orange, apple, port, sherry vinegar (the last is Fair Measure's); Citrus surprises (pdf 80) sage, caraway, peanut, pecan: sage and caraway owned (A Brother's Care, Not Only the Way), nuts are vetoes. No spark taken yet.
