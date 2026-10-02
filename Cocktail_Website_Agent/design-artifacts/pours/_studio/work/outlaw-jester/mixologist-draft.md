# Mixologist draft: outlaw-jester (The Subverter), v1.2, round 5 (audit S1–S3, the 40%, and the closing line to Wren's v3; drink unchanged)

Spec: `_studio/specs/outlaw-jester.json`. Story: Lord Invader's "Rum and Coca-Cola" (ruled by Wren r3; Hester's card `_studio/fact-cards/lord-invader-rum-and-coca-cola.md`). The drink is older than the song (Oxford pdf 107: popular in Venezuela by 1911): never "his" drink.

**Glassware:** tall glass (highball, about 350 ml), filled with ice
**Contains:** nuts (the cola, on the safe side: see Checks)

## Recipe
| amount | item | note |
| --- | --- | --- |
| 60 ml | Angostura 1919 aged rum (recommended), or any column-distilled aged rum, not spiced, about 40% | from Trinidad, made by the same house as the bitters |
| 15 ml | fresh lime juice | about half a lime; keep the squeezed half |
| 120 ml | Coca-Cola, recommended (or any full-sugar cola) | fridge-cold, freshly opened |
| 2 dashes | Angostura bitters | on top, last |
| 1 | squeezed lime half | dropped into the glass, not muddled |

## Method
1. Fill a tall glass with ice and pour in the rum. Stir for three seconds.
2. Squeeze in the lime, then drop the squeezed half into the glass.
3. Pour the cola gently down the side, and stir once.
4. Shake two dashes of bitters onto the top, so the first thing you smell is the island.

## Checks
| check | result | why |
| --- | --- | --- |
| Structure | **Highball** (Codex root family): core rum, lengthened with cola; balance lime against the cola's sugar; seasoning two dashes of Angostura. | The build is the *Codex*'s Cuba Libre (p. 213: 2 oz rum, ¼ oz lime, 4 oz cola, stir 3 s, stir once). My changes, owned: the lime goes up from 7.5 to 15 ml, twice the *Codex*'s, for more bite; and the glass is filled with ice, where the *Codex* uses three cubes (S2). The *Codex* says the lime "draws that flavor out of the cola while also cutting through its sweetness", because "lime peel is a key ingredient in most colas". Dropping the squeezed lime into the glass is after Baker's way, as *Joy* gives it (pdf 272), without his muddling (S3). *Joy* says muddling releases few oils without sugar. The bitters on top are mine as well. **Rum (S2):** the *Codex* calls for white rum, and *Joy* (pdf 273) for light rum. The aged rum is my departure, so the island's own exported bottle can carry it (Oxford pdf 114). The numbers are identical at 40% with no sugar. *Joy*'s full spec (60 rum / 30 lime / 90 cola) runs OUT on acid, at about 1.0% by my sum. **Scope (Hester r3):** *Joy*'s praise and Baker's dropped lime are filed under CUBA LIBRE, which Oxford pdf 613 says is "also known as" Rum and Coca-Cola. |
| Balance | **In range** (`balance.py`, style `highball`): 12.6% ABV, 6.63 g sugar/100 ml, 0.49% acid (10–16 / 0–7 / 0–0.6). | **Lime sweep:** the *Codex*'s 7.5 ml gives 13.1 / 6.83 / 0.27, in range but near the sugar top. 17.5 ml gives 0.56 acid, in range. 20 ml gives 0.62, an EDGE. *Joy*'s "at least one ounce" (30 ml) gives 0.88, **OUT**. So 15 ml is the most lime that's comfortably inside, and the bite comes with it. **Rum sweep:** 45 ml gives sugar 7.17, an EDGE (too sweet). 50 ml gives 11.1 / 6.98, in range. Strength across 37.5–43% rum (`sweep.py`): 11.8–13.5%, all in range. **Cola sweep:** 100 ml gives 14.0 / 6.18 / 0.54, in range. 150 ml gives sugar 7.15, an EDGE. So the recipe says 120. **Melt:** the 3-second stir isn't modelled. 20 ml of melt would give about 11.4 / 6.0 / 0.44, still in range. The dashes are counted (1.6 ml). Unsourced: the cola's sugar and acid (label, own estimate) and the rum's 40%. |
| Pairings | Rum with cola and lime, from the *Codex* (p. 213: "rum's sugarcane backbone complements the cola's round spice flavors"). Angostura on top: "Produced in Trinidad" (*Codex* p. 14). The bottle tastes "like a rum-fueled Christmas party", which the same page says of Angostura itself. | **Matrix consulted and set aside.** Citrus (pdf 80) gives surprise pairings of sage, caraway, peanut and pecan. Sage and caraway are siblings' sparks (*A Brother's Care*, *Not Only the Way*), and the nuts would add a veto. That list is OCR, and the page hasn't been rendered. Cane syrup (pdf 240) gives garlic, fish and olive, and none of them belongs in this glass. **The interest instead:** the island in two bottles from one house. Oxford pdf 114 has the Siegert family's bitters company moving to Trinidad in 1875. Robert Siegert began making rum in the 1930s, on a multi-column still in Laventille, and Trinidad Distillers was established in 1949 (S1). The page spells it "Leventille". The lime is the bite: it cuts through the cola's sweetness. **Scope (Hester r3):** *Codex* p. 213's "lime peel is a key ingredient in most colas" is about colas in general. Coca-Cola's formula is secret, and the published old ones list lemon and orange oils, not lime. So no line says this cola contains lime, or that the lime draws out something hidden in it. |
| Allergens | **nuts** (`allergens.py`: `contains: ["nuts"]`, from the cola alone) | **My veto call: Coca-Cola goes to `nuts`, on the safe side.** Two published historical formulas list nutmeg oil (Hester C1–C2: Beal's notebook, *AJC* 1979; Pemberton's notebook via Pendergrast; both via This American Life). Coca-Cola denies that either is the formula, and today's recipe is secret. Nutmeg counts as nuts (Robin). The table row is now reclassified. **This pour leaves the AD-4 veto-free floor**, and the Outlaw plan's "Subverter stays veto-free" no longer holds. The same row is in *The Way It Felt* (innocent-creator), and its Checks say veto-free: that's a note for Robin, not an edit by this room. The rum is a distilled cane spirit, with no class. Angostura bitters: baking spice isn't `spice`, and the table has it as no class. Its recipe is secret, and no page names nutmeg in it. Lime: none. |
| Makeable | Tall glass, ice, jigger, bar spoon. Supermarket and liquor-shop bottles. | The numbers are proved for Angostura 1919. The substitute is a **style**, taken from Oxford's own description of Angostura's rums (pdf 114: "column-distilled and aged in bourbon barrels"), and the sweep covers 37.5–43%. Coca-Cola is named because the song names it. Any full-sugar cola substitutes, but diet cola isn't proved. **The 1919's 40% is still unconfirmed on a label.** My attempts to fetch the maker's and retailers' pages this session were blocked or stopped, so it stays my own knowledge, marked unsourced. That doesn't move the numbers: `sweep.py` (balance.py with the rum's ABV overridden in memory) has the recipe in range at 37.5% (11.8% ABV) and at 43% (13.5% ABV), with sugar and acid unchanged (6.63 g / 0.49%), and the substitute style says "about 40%". Guest text gives no strength for the named bottle. **Cost, plainly** (own knowledge, unsourced, typical shop prices): Angostura 1919 is a mid-priced aged rum, about £35–40 in the UK or $35–40 in the US for a 70 cl / 750 ml bottle. That's roughly what a good bourbon costs, and the bottle makes about 12 drinks. The substitute style can be had for less. The cola and limes are pocket change. |

**closingLine:** *Squeeze the lime and drop it in. If they sing it back wrong, write a new one.*
(This is restored by Wren's ruling in r5. The echo with y5 is gone, since y5 now says "Make the next one". My r4 alternative is withdrawn: it shared "bite" with the name, and having the joke survive by staying sweet softened the position.)

## Image brief
**Glass and drink:** a tall, plain highball glass filled to the top with ordinary ice. The drink is dark brown, as the cola makes it, with a thin collar of fizz. A squeezed lime half sits wedged among the ice. A few dark-red drops of bitters are on the surface of the fizz.
**Props (3–5):** a 78 rpm shellac record in a plain brown paper sleeve, with no label text; a pencilled sheet of song lyrics, folded, with the writing too small to read; a half lime and a small knife on a wooden counter; an open cola bottle with no visible logo.
**One impossible detail:** the shadow the glass throws across the counter is a wide grin.
**Must not appear:** any text, logos or brand labels; soldiers, uniforms, flags or a naval base; people; nutmeg; smoke; a second drink.
**Palette:** warm brown and lime green against a deep vivid purple (Pantone 2592) wash behind, with harsh, raking light.

**SCENE (paste):** A tall plain highball glass filled with ice and a dark brown rum-and-cola, a thin collar of fizz on top, a squeezed lime half wedged among the cubes, a few dark-red drops of bitters on the surface. Beside it on a worn wooden counter, a 78 rpm shellac record in a plain brown paper sleeve, a folded pencilled lyric sheet (illegible), a cut lime and a small knife, and an open cola bottle with no label. Harsh raking light from one side against a deep vivid purple background. The glass's shadow on the counter forms a wide grin.

## Names
1. **With the Bite In** (Wren's pick, and now mine). It praises the person, a joke that keeps its point, and the drink proves it: the lime is the bite. It's sayable, and no registry name is close.
2. **Past the Censors** (Wren's). It's true to the setting, but it names the obstacle rather than the person.
3. **Down to Size** (mine, withdrawn as the pick). It sits in the same field as the tagline's "actual size", so it would spend the title block twice.
