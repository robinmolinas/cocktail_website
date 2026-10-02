# Mixologist draft: outlaw-magician (The Disrupter), v1

Tomás, round 5 step 1, 2026-10-01 (v1 + audit S1–S3). Story: Angelo Gaja's 1996 declassification (Hester's anchors v2), ruled by Wren in round 4. Spec: `_studio/specs/outlaw-magician.json`.

**Glassware:** heavy old-fashioned glass (rocks glass, about 300 ml), one large ice cube
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | young grappa | giovane or bianco, not wood-aged, 37.5-43% (a Piedmont grappa, if you can find one); Italy's spirit made from the skins, seeds and stems left once grapes are pressed for wine |
| 10 ml | Nebbiolo syrup (below) | a young Langhe Nebbiolo warmed with its own weight of sugar; it's the only sweetness in the drink |
| 2 dashes | orange bitters | |

**Nebbiolo syrup** (makes about 400 ml; keeps in the fridge for about a week, my estimate): 250 ml dry young Nebbiolo (a Langhe Nebbiolo) and 250 g white sugar.

## Method

1. Make the syrup ahead. Put the Nebbiolo and the sugar in a small pan over low heat and stir until the sugar has dissolved. Don't let it boil: it should still taste of the wine. Let it cool, then bottle it and keep it in the fridge.
2. Put the syrup and the bitters in the glass. Add the grappa and stir to mix.
3. Add the large ice cube and stir about fifteen times, until the glass feels cold. Serve it straight away, with no garnish.

## Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family**: spirit, sugar, bitters, built on one cube. **Core** = grappa. **Balance** = the Nebbiolo syrup, which is the drink's only sugar. **Seasoning** = orange bitters. The wine sits in the sweet part, not the core: my craft call, from the numbers below. |
| Balance | `balance.py`, style `built` (Lee's rule: it's served on one cube): 70 ml + dashes, 24% melt, **28.8% / 6.95 g / 0.038% — balanced** (ranges 27-32 / 6.5-8.5 / 0-0.05). **Sweeps** (`sweep.py`): syrup 12.5 ml 28.1% / 8.39 g ok; **7.5 ml OUT** (5.40 g), so the recipe holds 10 ml. Grappa at 37.5% 27.1% ok, at 43% 30.8% ok, at 45% 32.2% EDGE, **at 50% 35.6% OUT**, so the recipe says 37.5-43%. If warming drives all the alcohol out of the syrup, it's 27.8%, still in range. **Rejected v0 (round 4), my direction from round 3:** grappa, sweet vermouth and Nebbiolo stirred and served up. Every split from 45/22.5/22.5 to 50/30/20 was OUT: 19.1-20.8% (under 21), sugar 2.89-3.54 g (under 3.7), acid 0.18-0.22% (over 0.14). The wine brings water and acid but no sugar. Carried in the syrup, it reads at 0.038% acid. Lesson as before: a juicy ingredient belongs in the syrup. The Cabernet is dropped with Darmagi (legend-grade, Hester). |
| Pairings | Grape with grape: a pomace spirit sweetened with the wine. *Liquid Intelligence* p. 275 (pdf 279): if you mix a red wine with a spirit like Cognac, "you might choose a sweet wine" to mask the tannins present in both. Here the syrup makes the wine sweet. That's Arnold's reason applied to grappa (my craft call); it is not his recipe. ***Flavor Matrix* consulted and set aside:** the Grape entry (pdf 140) is about table grapes ("most of the grapes that turn up in stores"), and its surprise pairings (pumpkin, capsicum, beet) would be a second change. The story's one change is a plain young wine holding the drink. No Barbera in the glass: at the story's 5-15% of the wine, it would come to about 1 ml a drink. Nobody could taste that, so it stays in the reading as the counterweight. |
| Vetoes | `allergens.py` → contains `[]`, **veto-free** (counts toward the AD-4 floor). egg-white ✗ · dairy ✗ · gluten ✗ (grappa is distilled from grape) · nuts ✗ · spice ✗ (no heat). Wine fining ignored (STUDIO-RULES 4, no named bottle). **New shared rows, my call** (added with `add_ingredient.py`): `grappa` (none; Joy pdf 421 and Oxford GRAPPA pdf 935 for what it is, 40% unsourced; row name changed to "young grappa" in round 5, values untouched), `red_wine_nebbiolo` (none; LI dry-red sugar and acid, 14% unsourced), `nebbiolo_syrup` (none; computed: 61.7 g / 0.34% / ≤8.6%). Orange bitters values unsourced (as the table has them). |
| Makeable | Two bottles, sugar and bitters, with a small pan and a jar. No named bottle: young grappa and Langhe Nebbiolo are styles. **Grappa:** young (giovane or bianco, not wood-aged; Oxford's giovane rests at least six months in steel or glass, Hester S1); 37.5% is the legal minimum to be sold (Hester S1), and 43% is the sweep's ceiling. "A Piedmont grappa" is a style suggestion, never a claim about the pomace: no page calls grappa Piedmont's own (Oxford: called "cot" in Piemonte, "grappa di Barolo" a geographical grappa; Hester S2). **No Barbaresco in the syrup** (S3): no page says one can be young, and it would cook the story's famous wine. The syrup uses a third of the wine bottle, and the rest can be drunk. Kept off *Rent-Free* (no wine over ice, no stemmed wine glass, no soda). |
| Collisions | No pour touches Piedmont, Nebbiolo or grappa (registry grep). The Old-Fashioned on one cube is the family's third Old-Fashioned (*Asked In*: small tumbler, one large cube; *Kept*: cubed ice), and its glass is close to *Asked In*'s. The base keeps the triple unique, and that's owned here. The method avoids *Asked In*'s "twenty seconds" and *Overnight*'s wash. |

**closingLine:** *Warm the wine, never boil it. Then take apart what you love, and leave room for someone to put it back.*

(The room's line: Wren took it in round 4. It mirrors the children's return without saying he caused it, and shares no word with the name.)

## Image brief

- **Glass:** a heavy old-fashioned glass, about 300 ml, with one large ordinary ice cube. No garnish.
- **Drink:** about 90 ml, a light, clear red-amber: clear grappa tinted by 10 ml of dark wine syrup. This is my expectation, unsourced; nobody has made it.
- **Props:** an unlabelled bottle of red wine with its cork beside it, and a small glass jar of dark red syrup. Nothing else.
- **Out:** fire, smoke, broken or shattering glass, vineyards uprooted, any legible label, any winery name.

## Names

- **For Its Own Good** (pick, all three; Wren's): what this guest quietly says as they end the thing, with the wink in it. About the person, not only the story.
- **In Support** (second, for Robin): from his own "in support of Barbaresco"; cold, it asks "of what?".
- **One Only**: his "one Barbaresco only".
- **House Wine**: the plain young wine holding the drink together.
