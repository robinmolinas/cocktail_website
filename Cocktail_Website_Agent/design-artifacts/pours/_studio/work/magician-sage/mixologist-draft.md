# Tomás: drink draft, magician-sage (The Clairvoyant), v1.3, round 4 step 3 (Hester's audit v2, T1-T2, landed; drink unchanged); v1.2, round 4 step 1 (Hester's audit v1, M1-M7, landed); v1.1, round 3 (Hester's r2 card landed); v1, round 2

Spec: `_studio/specs/magician-sage.json` (v1). A grappa Martini: Nonino single-varietal grappa, recommended, stirred with French blanc vermouth that has spent an hour with a fresh fig leaf, and one teaspoon of simple syrup. Strained into a chilled tulip glass, no garnish. The plan's shape (Martini · single-varietal grappa · tulip grappa glass), built on Wren's accepted lead (r1).

**Glassware:** small tulip-shaped grappa glass with an open rim (about 150 ml), chilled, no ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 50 ml | Nonino single-varietal grappa (monovitigno), recommended | young, not wood-aged, made from one named grape; or any young, not wood-aged single-varietal grappa, 40% or stronger |
| 20 ml | blanc vermouth with fig leaf, homemade (below) | French blanc vermouth (Dolin Blanc style): pale, sweet and herbal |
| 5 ml (1 teaspoon) | simple syrup | equal parts sugar and water, stirred until clear |
| | *for the fig-leaf vermouth:* 1 medium fresh fig leaf, 200 ml blanc vermouth | tear the leaf into three or four pieces, leave it in the vermouth at room temperature for about an hour, then lift it out. Keep the vermouth in the fridge. Fig-leaf sap can irritate skin: rinse your hands after tearing it |

## Method

1. Steep the fig leaf in the blanc vermouth at room temperature. Taste it after half an hour, and lift the pieces out by about an hour. The vermouth keeps in the fridge; this makes enough for ten drinks.
2. Put the tulip glass in the freezer to chill.
3. Pour the grappa, the fig-leaf vermouth and the syrup into a mixing glass or a jar. Fill it with ice and stir for about fifteen seconds.
4. Strain into the chilled glass. No garnish: the grape is what you should smell first.

**closingLine:** *Steep the leaf and leave the figs. When you see where someone's heading, give them your reasons too.*

(Mine for the gesture: the tree is grown for its fruit, and the drink takes a part the tree isn't mainly grown for. The position is Wren's r1 direction, "show them what you noticed, not only what you see coming", said short; it's hers to reword. "Leaf" is in two sibling closing lines (*Just Knew*'s bay leaf, *Worth Finding*'s leaf on the table); here the leaf is never shown, it's steeped and lifted out. Not "noticed": *Whatever They Call It* closes on "the small thing nobody else noticed".)

## Checks

| check | result |
| --- | --- |
| Structure | *Codex* Martini family: spirit and aromatized wine, stirred. **Core:** 50 ml young, not wood-aged single-varietal grappa. **Balance:** 20 ml French blanc vermouth (Codex p. 72: the French style is "delicate, sweet, and herbal") plus one teaspoon of simple syrup. **Seasoning:** the fig leaf, carried in the vermouth (the spark goes in the neutral part; the grappa is left untouched, so the grape leads). No bitters and no peel: a citrus oil or a bitter would sit on top of the grape, and Wren asked that the grape be what you notice. |
| Balance (balance.py, `stirred`) | 75 ml, 41.8% dilution (Arnold's stirred formula, LI pdf 127), 106.3 ml. Initial 31.6% / 7.57 g / 0.160%; finished **22.3% / 5.34 g / 0.113%**. **Every line in range**, no edges. |
| Why the teaspoon of syrup | A blanc-vermouth Martini can't balance on vermouth alone (sweep, same bottles): 50/25 is OUT on sugar (3.05 g); 45/35 reaches the sugar but goes OUT on acid (0.19%); pushing the vermouth up brings its acid with it. The teaspoon adds sugar with no acid. Without it: 2.60 g, OUT. |
| Sweeps (sweep.py) | **Grappa strength** (Nonino label ABV unsourced; row 41%): 37.5% gives 20.8% (edge, just under the 21% floor); 40% 21.9, 43% 23.1, 45% 24.0, 48% 25.2, all in. So the recipe says **40% or stronger**. **Blanc vermouth sugar** (LI's Dolin Blanc 13 g): 10 g 4.77 in; 16 g 5.90 (edge over 5.6). A sweeter blanc runs a touch sweet; Dolin-style is the written bottle. Grappa 40% with a 16 g blanc: 5.91 (edge); 48% with 10 g: 4.71 (in). **Syrup dose:** 3.75 ml 4.68 (in); 7.5 ml 6.59 (OUT), so it's one teaspoon. **Vermouth dose:** 15 ml OUT on acid (0.090); 25 ml 21.7 / 5.59 / 0.133 (in). **`built`** (served on ice): OUT, which is why it's served up. |
| Pairings and spark | Grappa maps to the *Matrix*'s Grape wheel (rule 3). **The spark: a fig leaf.** *Flavor Matrix* GRAPES (pdf 140) lists **figs among the grape's substitutes**, and FIG (pdf 120) lists wine among fig's best pairings. FIG also says that fig trees "are mainly grown for their fruit", while their "highly aromatic leaves are another valuable commodity" that "impart their distinctive flavor" when wrapped round food. That's Wren's ask in the glass: a part the tree isn't mainly grown for, used as it is (steeped and lifted out, not cooked, not changed), with its role already there. It mirrors the story without copying it, and without any "rescue" (Hester F2: pomace was never thrown away; by tradition it was buried, then distilled late and all together). The Noninos looked at the same pomace differently, one grape and fresh; the drink looks at the same fig tree differently, and takes the leaf. Never "waste" or "what nobody wanted" in guest text, for the pomace or the leaf. **What the leaf tastes like** beyond the Matrix's "highly aromatic" and "distinctive" is unsourced: I'd expect green, a little nutty and coconut-like (my knowledge), so the guest text should say only what the page says. **Set aside:** verjus (*Are You Quite Sure?* and *Worth the Trade*, a sibling), gooseberry (*Worth the Trade*), strawberry (*More Than One Head*, a sibling, uses hulled strawberries; I'd first thought of the tops they throw away, but it's the same fruit in the same family), melon (Matrix pdf 172 pairs it with wine, but nothing on the page about a part set aside), crème de pêche (*Left Standing*'s exact Martini move), a wine syrup of the same grape (*For Its Own Good*, Wren C4). |
| Story in the glass | The base is the story: a grappa made from one grape variety, the kind Oxford dates to Giannola Nonino and the house in the early 1970s (the family says 1 December 1973, after a 1967 test bottling from single-variety pomace, card C6) (Oxford GRAPPA pdf 936, POLI pdf 1544; house account H3; card `nonino-monovitigno-grappa.md`). "First" is first single-varietal *grappa* only (C4). Today's single-varietal grappa must be at least 85% one grape (F7). The picolit isn't required (probably out of reach, the plan's call); any Nonino single-varietal keeps the choice of one grape. Nothing from 1984 on (ÙE is not grappa, H10). The leaf is the bartender's nod, my choice, never a fact about the Noninos. Giannola's own quince and acacia-honey notes (H6) are legend-grade, so they stay out of the glass. |
| Allergens (allergens.py) | contains: none. **Veto-free** (counts toward the AD-4 floor). Grappa is distilled from grape (no veto); blanc vermouth's fining ignored (rule 4, no named vermouth); sugar. **New rows, my call:** `grappa_nonino_monovitigno` (none; Nonino's young single-varietal on record is the Picolit Cru, house page 2026-10-04; no page gives a strength, so 41% stays unsourced and the sweep, 40% or stronger, carries it) and `blanc_vermouth_fig_leaf` (none; values as `blanc_vermouth`; a fresh leaf, not dried fruit, so the safe-side dried-fruit `nuts` rule doesn't reach it). **For Robin:** fig isn't in our five vetoes; the recipe carries a caution with no cause, "Fig-leaf sap can irritate skin: rinse your hands after tearing it" (unsourced; kept on the safe side, Hester audit v1). |
| Makeable | One named bottle, recommended, with a style substitute (rule 5): "any young, not wood-aged single-varietal grappa, 40% or stronger". The numbers and the veto are proved for the named row and the 37.5-48% sweep. **The fig leaf is the reach:** a guest needs a fig tree, a neighbour with one, or a greengrocer who sells the leaves (my knowledge, unsourced). Without one, plain blanc vermouth gives identical numbers but loses the spark: never write "optional" until the room decides. One hour at room temperature follows the *Codex*'s room-temperature infusions for quick ingredients (p. 94: "generally an hour or less", tasted as they go), so the method says to taste at half an hour; no overnight wait (*Overnight*'s ground), no clarifying. Kit: jigger, mixing glass or jar, bar spoon, strainer, freezer. |
| Glass | The Instituto Nazionale Grappa recommends small tulip-shaped glasses with open rims (Oxford GRAPPA pdf 936, F10; no reason on the page). My craft reason, labelled as mine: a narrow bowl gathers the scent and the open rim lets it out, which suits a drink whose point is the grape's smell. |
| Collisions | Shape: Martini · grappa · tulip glass, unique. Near: *Left Standing* (Martini · tequila · copita, a small tulip glass) and *The First Guess* (Martini · cognac · small tulip glass): three tulip Martinis, apart by base. Against *For Its Own Good* (grappa Old-Fashioned, one large cube, Nebbiolo syrup): different family, glass, grappa style (single-varietal) and no wine. No pour puts fig in the glass; *sage-outlaw*'s Pairings cites the *Matrix* Fig chart (pdf 121) for its port. |
| Edges for Robin | (1) Fig leaf reach, above. (2) Nonino's young single-varietal on record is the Picolit Cru (house page, 2026-10-04); no page gives a strength, so 41% stays unsourced and the sweep (40% or stronger) carries it. No grape is named in the recipe. Robin may prefer to drop the brand to a style. The fig-sap caution is unsourced (no library page; Hester has asked Robin for a botanical source), kept on the safe side. (3) Sugar sits at 5.34 of a 3.7-5.6 band: soft rather than bone-dry, as a blanc Martini is. |

## Image brief

**Glass and drink:** a small tulip-shaped grappa glass with an open rim, on a short stem, chilled, about two-thirds full. The drink is nearly clear with a faint pale-straw tint: a young grappa with 20 ml of pale blanc vermouth (my estimate, unsourced; the leaf may add a faint green-gold, also unsourced). No garnish, no ice.

**Props (3-5), each only what its fact says:**
- one large fresh fig leaf lying flat beside the glass, a single torn piece missing from its edge (the spark, Matrix pdf 120)
- a small, shallow dish of freshly and lightly pressed pale grape skins, still moist (Oxford GRAPPA pdf 936). Fresh, never shown buried, heaped or spoiled (F2's old way is not the picture).
- a plain unlabelled glass bottle of clear spirit, label turned away
- an open notebook with a few lines of unreadable handwriting and a small pencil sketch of a single grape bunch (the small things noticed)

**One impossible detail:** in the polished dark wood under the glass, the drink's reflection shows a small bunch of pale grapes where the glass should be.

**Must not appear:** text or legible labels, crystal balls, tarot, star maps or runes, wizards or hats, a price tag, decorated or hand-blown bottles, whole figs, strawberries, a second drink, amaro bottles, flame or smoke.

**Palette:** deep indigo shadows (Pantone 2755 C, the persona colour), soft directional light from one side, the drink pale straw, the leaf green.

**SCENE (paste-ready):** A small tulip-shaped grappa glass with an open rim, on a short stem, chilled, two-thirds full of a nearly clear stirred drink with a faint pale-straw tint, no garnish, no ice, on polished dark wood in a quiet room with deep indigo shadows. Soft light falls from one side. Beside it: a single large fresh fig leaf lying flat, one torn piece missing from its edge; a small shallow dish of freshly pressed pale grape skins; a plain clear bottle with its label turned away; an open notebook with a few lines of unreadable handwriting and a small pencil sketch of one bunch of grapes. One impossible detail: the drink's reflection in the wood shows a small bunch of pale grapes where the glass should be.

## Names

The person: sees the part someone has to play, early, from small things, and can rarely say why.

- ***Hard to Say Why*** (my pick): it recognises the hidden thing Wren found, that the reasons are too small to say. The closing line then turns it ("give them your reasons too").
- *Something in Them*: the sight itself, about a person, warm.
- *Taken Seriously*: what they give: they take seriously what others laugh off. Closer to the story.

Grepped the registry: none taken. *Something in Them* starts like *Somewhere to Land* (one word in common); "Worth…" was dropped because three names already open with it.
