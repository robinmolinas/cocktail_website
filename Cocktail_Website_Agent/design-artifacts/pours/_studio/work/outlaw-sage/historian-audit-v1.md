# Historian audit v1: outlaw-sage (round 3)

Audited: `mixologist-draft.md` (drink v1) and `_studio/specs/outlaw-sage.json`, as filed at round 3. Wren's reading v1 hadn't landed when this was written, so it gets its own audit (v2) once it's filed.
Card: `fact-cards/jeffrey-morgenthaler-amaretto-sour.md` F1–F23.

## Checked and passing
| Claim | Source checked | Result |
|---|---|---|
| Oxford fix: 30 lemon, 15 simple syrup, 15 lightly whipped egg white, 22 cask-strength bourbon | Oxford pdf 97 | ✓ |
| *Codex* Amaretto Sour: liqueur core, syrup cut back for sweetness; 2 oz / 1 oz / ¼ oz | *Codex* p. 114 | ✓ (it also has a dash of Angostura; fine to leave out of a reference line) |
| Lemon with aged spirits | *Codex* p. 115 | ✓ |
| *Flavor Matrix* Nut: vinegar among best pairings; the others as listed | Matrix pdf 184 | ✓ "Only one that pushes against sweetness" is scoped to *Best Pairings* (citrus sits under *Surprising*), so it's fine as Tomás's reading |
| Amaretto generally made from apricot kernels; commonly thought almond | Oxford pdf 94 | ✓ (Oxford also calls the category "nut-flavored", which is the stronger cite for the Matrix mapping) |
| Allergens: nuts, egg-white; bourbon not gluten; fining ignored | STUDIO-RULES 4 | ✓ |

## Fixes (old → new)
| ID | Where | Old | New | Why |
|---|---|---|---|---|
| D1 | draft, Recipe, bourbon note | "bottled undiluted from the barrel; 55% or stronger" | "bottled at or near barrel strength; 55% or stronger" | Oxford PROOF pdf 1571: unless it's single-barrel, a "cask strength" label is a composite proof (F21). Raised in r2-hester-2. |
| D2 | draft, Checks, Lineage | "I use the 45 ml of its standard recipe on the same page (Hester to confirm against his post)" | "The 45 ml amaretto is his 2012 post's (F8); the page's own 45 ml belongs to the sour-mix standard." | The standard recipe is the drink he argued against. |
| D3 | draft, Checks, Balance | "**His printed fix on paper** (45 / 22 / 30 lemon / 15 simple / 15 white): 13.6% / 11.06 g / 0.950%, OUT on strength and sugar, acid at the edge." | keep, and add: "His 2012 post's version (45 / 22.5 / 30 lemon / 5 ml 2:1 syrup / 15 white) reads 14.7% / 9.10 g / 1.013%: OUT on acid, at the edge on strength and sugar (Hester's run, `rich_syrup` row)." | His two printings differ (C1). "Too weak and too sweet" (r2) is true only of the Oxford printing. The post version runs too sharp, which still supports cutting the lemon. |
| D4 | spec `_status` | "Morgenthaler's printed fix (45/22/30 lemon/15 simple/15 egg) reads OUT on acid; see Checks." | "Morgenthaler's Oxford printing (45/22/30 lemon/15 simple/15 egg) reads OUT on strength and sugar, acid at the edge; his 2012 post's reads OUT on acid; see Checks." | The spec contradicts the draft's Checks. |
| D5 | draft, Structure; spec `subfamily` | "split base, p. 104" / "a small second spirit (p. 104)" | "split base, pp. 103–104" | The words "split base" are on p. 103. P. 104 is the Ideal Daiquiri recipe that uses one. |
| D6 | draft, Image brief, Avoid | "cherries (the 1980s garnish)" | "cherries (the standard recipe's garnish, Oxford pdf 97, and the one in his post)" | Oxford doesn't date the garnish, and his own post garnishes with brandied cherries. |
| D7 | draft, Allergens | "The egg white is in his printed fix; it could go, but then the reading can't say it's made his way." | "The egg white is in his printed fix. With the syrup out and the lemon cut, the copy says 'built on his fix', never 'made his way'." | Three departures already (Tomás's own count). The same goes for r2's "made his way, then argued with": Wren, please don't use it. |
| D8 | draft, Recipe, amaretto note (guest-facing) | "any Italian amaretto, about 28%" | "any Italian amaretto" | 28% is unsourced (F19 gives only the >15% floor). Keep the figure in Checks, labelled unsourced. Makeable's "about 28%" gets "(unsourced)" too. |
| D9 | draft, Makeable | "No dry shake: the white is whipped first, as his entry says." | "No dry shake: the white is whipped first, as his Oxford entry says (his post froths it without ice)." | Optional. It keeps the two printings straight. |

## Anchors
I checked the anchors row "drink (ours)" against this audit, and it already says "Never 'his recipe'". I added nothing that the audit struck. No anchor carries "made his way", "28%" or "undiluted".
