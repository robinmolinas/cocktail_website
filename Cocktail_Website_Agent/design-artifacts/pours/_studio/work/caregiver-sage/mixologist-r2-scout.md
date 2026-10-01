# Tomás, rework round 2: scouting the Chartreuse candidates (nothing locked)

Scout specs only. No `_studio/specs/caregiver-sage.json` written until the story is ruled.

| candidate | spec run | balance.py (finished) | verdict | allergens.py |
| --- | --- | --- | --- | --- |
| Last Word (Oxford LAST WORD pdf 1166; *Proper* p. 76; *LI* p. 132) | 22.5 ml each: London dry gin 47%, green Chartreuse, maraschino, lime; shaken | 20.8% / 9.56 g / 0.93%, dilution 61.1% | OUT (initial sugar 15.40 vs 8.0-13.5; initial acid 1.50 vs 1.2-1.4; three edges) | **nuts** (maraschino) |
| Bijou, Harry Johnson 1900 (Oxford BIJOU pdf 266 recipe) | 30 ml each: Plymouth gin, sweet vermouth, green Chartreuse; 1.5 ml orange bitters; stirred | 26.1% / 9.32 g / 0.136%, dilution 44.3% | OUT on sugar only (finished 9.32 vs 3.7-5.6); strength, acid, dilution ok | veto-free (orange bitters unsourced) |
| Alaska (*Joy* pdf 229) | 45 ml London dry gin 47%, 15 ml yellow Chartreuse; stirred | 31.0% / 5.34 g / 0% | OUT on acid (no wine), strength edge | veto-free |

## Notes
- Last Word: sweet-sour, herbal, cherry-stone; nothing bitter in it. Our table has maraschino as `nuts` (creator-regular-guy call), so the pour would lose veto-free. Pitched and passed twice already (creator-hero: "its hero is the man who revived it"; creator-sage: a corrected Last Word read as *As It Was*'s twin: gin, lime, coupe, a drink rescued from a book). Its history is Stenson's revival, a second story reached through the ingredient.
- Bijou: Oxford pdf 266: Johnson's 1900 edition replaced the Grand Marnier with green Chartreuse, "turning a rich and pleasant drink into a spicy and invigorating one". 1900 is before the 1903 expulsion (Oxford CHARTREUSE pdf 439): the Chartreuse in Johnson's recipe was made in France before the monks left (my inference from the two dates). *Codex* p. 176: the Bijou relies "on a large dose of green Chartreuse to create a highly complex cocktail that's balanced by the bitterness of Campari" (the Codex's own version, recipe text not extracted). The classic is too sweet for this guest on paper; a riff has a real job (sugar down, bitterness up).
- Alaska: legible two-bottle drink, but the yellow is the sweeter, lower-proof Chartreuse (Oxford pdf 439) and there's no bitterness.
- Overlap to flag: *Beside the First* (creator-sage) y4 already says green Chartreuse "grew out of a monks' medicine and is still made under Carthusian monks, to a recipe only a few of them know". Oxford pdf 439 carries the expulsion (1903), Tarragona (to 1989), Marseille 1921, home 1932; the counterfeit ("liquidatreuse") and the bankruptcy are not in it.
- Family shelf (caregiver): highball 4, daiquiri 2, old-fashioned 2, martini 1 (the Angel, Plymouth gin, small stemmed wine glass), flip 1. Sidecar family: none. Base spirits free in caregiver: bourbon, rye, cognac, tequila, mezcal, and any liqueur-led core.

---

# Round 3: the Bijou falls with Hester's strike; scouting DeGroff's Bullshot (nothing locked)

- Bijou withdrawn: it stood on the monks' story, and Hester struck that story (Oxford pdf 439 doesn't carry it).
- New table row: `beef_broth_canned` (Tomás, 2026-09-30). Values unsourced (~0 abv, 0.5 g sugar, 0 acid). Allergens on the safe side because brands vary: gluten (wheat-based yeast extract or hydrolysed protein), egg-white (consommé cleared with egg white), dairy (milk powder or lactose in some stock bases).
- Scout spec: DeGroff's Bullshot as Oxford prints it (pdf 375) without the Tabasco and the black pepper, both heat and so both `spice`: 45 ml vodka 40%, 100 ml canned beef broth, 5 ml orange juice, 5 ml medium dry sherry (proxied by the amontillado row, which is dry, so the sugar is understated), orange peel.
  - Shaken, then over ice (dilution formula for shaken, 39.2%): **finished 8.7% / 0.52 g / 0.030%**. Every shaken-sour range is OUT, which is meaningless here because the drink isn't a sour.
  - Freeform, undiluted: 12.2% / 0.73 g / 0.042%. Nearest styles: highball, hot, shaken-spirit.
  - allergens.py: **egg-white, dairy, gluten** (all from the canned broth). A homemade beef stock (bones, water, onion, salt) would be veto-free. Celery isn't one of our vetoes.
- Read: there's almost no sugar and almost no acid, so it's a strong seasoned cold broth. That fits the story (the lemon and lime were what came out) but not the palate (nothing bitter or herbal). On DeGroff's glass it would be the family's fifth tall glass on ice.
- Flavor Matrix, Beef (pdf 44): best pairings are nuts, dried fruit, butter, cream, mustard, alliums, cocoa. Surprise pairings are **cocoa, grapes, dried currant**. Orange isn't listed. Grapes are already in DeGroff's recipe as the sherry. Cocoa is the bitterness this guest is missing. Candidate only; see the one-change caution in the turn.

---

# Round 5: the Martinez with Old Tom (Wondrich / Seestredt), scouting only

Sweep script: scratchpad `sweep.py`. It patches an Old Tom row into balance.py's table in memory, so the table on disk is unchanged. Style: stirred. Bitters: 1 ml Angostura + 1 ml orange bitters.

| version | Old Tom abv / sugar swept | finished | verdict |
| --- | --- | --- | --- |
| LI's Martinez (p. 131): 60 Old Tom / 30 sweet vermouth / 6.75 maraschino | 40% / 0-3.5 g | 22.8% / 5.13-6.63 g / 0.128% | at 3.5 g it reproduces LI's own printed 6.6 g (calibration): OUT on sugar; maraschino = nuts |
| Codex's Martinez (p. 86) without the maraschino: 45/45 | 44% / 0-3.5 g | 21.6% / 5.57-6.78 g / 0.208% | sugar edge to OUT, acid OUT high |
| **Regan's 2:1 (Joy pdf 336, "preferably Ransom"), maraschino left out: 60/30** | 40-47% / 0-3.5 g | **22.8-25.7% / 3.65-5.31 g / 0.136-0.138%** | in range across the whole sweep (0 g is the sugar floor's edge) |

- Oxford OLD TOM GIN (pdf 1436): Old Tom "began as the stronger base gin and had the least added sugar and water"; "the strongest allowed to be sold"; sugar "seem[s] to have been around 35 grams per liter" (= the 3.5 g end of my sweep). Wondrich (*Imbibe!* pdf 68): Ransom is "an older version, from when it was a much more loosely defined category", with a little barrel age. Ransom's own abv and sugar: not in the library. That's why the sweep runs 40-47% and 0-3.5 g.
- Substitute style: the sweep supports "any Old Tom gin" across Oxford's sugar and 40-47%.
- Accent slot: the maraschino is left out, not replaced (nuts; the curaçao swap is *Beside the First*'s). The drink balances without it.
- *Flavor Matrix*: Grape (for the vermouth, pdf 140): surprising pairings are pumpkin, capsicum and beet. Beef: done last round. No honest hit for a Martinez yet. Consulted, provisionally set aside.
- Glass: stirred and short. Nick & Nora is the Connoisseur's, a small coupe is the Old Master's, a small stemmed wine glass is the Angel's, so this one needs a plain cocktail glass or a small tumbler with no ice. To be settled with the spec.
