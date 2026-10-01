# Tomás: drink draft, explorer-hero v1.3 (round 7 of 7)

v1.3 (round 7): Hester's audit v4 fix (3) applied exactly as she wrote it: the Structure lineage now reads "the one old-school version the revival didn't bring back" (Oxford, COCKTAIL pdf 491: every kind "except the original"; the plain one "is rarely ordered"). The Names bullet now quotes the closing line that ships and y5 v4's wording. Nothing in the drink, the Ritual, the checks or the image brief moves (spec v1).

v1.2 (round 6): the drink doesn't move (spec v1). Hester's audit v2 applied exactly as she wrote it. **D1:** the availability flag is now sourced (Breaking Bourbon 2021, card F23). **D2 (optional, taken):** the lineage point is in Structure, Checks only, never in the reading. The name is *Nothing to It*, all three agreeing (Wren r5). The closing line stays at the r5 wording, *…let them hear how close it came.* Reading v3 still quotes the withdrawn r4 line ("tell them"), which is *The Other Berry*'s closing verb, and y5 v3 now says "tell them you were terrified" as well.

v1.1 (round 5): the drink doesn't move (spec v1). **Water:** it's in the method only, never in the story (Wren r4), and the recipe note now says so plainly. **Char:** Hester found the page (Oxford, WHISKY, BOURBON pdf 2140: the charring "helps to caramelize the sugars in the wood"; CHARRING, TOASTING pdf 437: "caramel and toffee notes"). Pairings now cites it, with her fence: it's the same thing done to a different sugar, so nothing says it "tastes like the barrel". Makeable cites pdf 2140 for why strong barrels exist (bourbon "generally gets stronger as it ages" in Kentucky), and never for proof rules. **Closing line reworded:** my "tell them" is *The Other Berry*'s closing verb ("Tell them it's tomato…"), and Wren's "Then tell someone" is *Instead*'s frame ("Then tell someone what they haven't heard of yet"). So the new line is *Take the sugar off at amber. And when they ask, let them hear how close it came.* **Names:** Wren's *Nobody Could Tell* is added, with my case below.

v1 (round 4): the story is ruled (Elmer T. Lee and Blanton's, Wren r3), and so are the caramel ("take it off at amber") and reading the label (within Hester's fence: barrels differ in strength, not in profile). The drink is the *Codex* root Old-Fashioned (p. 5) with one change, the spark: the sugar is a caramel syrup cooked to deep amber. One bourbon only, served up with no ice. A stronger barrel is brought to the named bottle's strength with water measured from its label, so bourbon and water always make 60 ml.

Spec: `_studio/specs/explorer-hero.json` (v1). New rows, both mine, added with `add_ingredient.py`, both `contains: none`:
- `bourbon_blantons`: the named bottle at its own row, 46.5% (93 proof; Breaking Bourbon 2021, secondary; Hester r3).
- `caramel_syrup`: 61.5 g/100 ml, which is *Liquid Intelligence*'s own row for a 70 Brix caramel syrup, where the sweetness is low "because of sugar breakdown during caramelization—a guess" (p. 137, pdf 141). The method follows LI's recipe (p. 347), scaled down for a home kitchen with no sugar meter. The scaling is my arithmetic, unsourced.

Sweeps: `work/explorer-hero/mixologist-sweep-r4.txt` (script `mixologist-sweep.py`).

## Recipe

- **serves:** 1
- **glassware:** a small tumbler (about 200 ml), chilled in the freezer, no ice
- **contains:** `[]`

| amount | item | note |
| --- | --- | --- |
| 60 ml | Blanton's Original Single Barrel bourbon (recommended), or any single-barrel bourbon | one barrel, bottled on its own; if your bottle is stronger than 47.5%, pour less and make up the 60 ml with water (step 3) |
| 0-20 ml | cold water, only for a bottle stronger than 47.5% (none for Blanton's) | measured from the label (step 3) |
| 1½ teaspoons (7.5 ml) | caramel syrup, made at home (step 1) | sugar taken to deep amber and no further |
| 2 dashes | Angostura bitters | |
| 1 | strip of orange peel | for its scent only |

## Method
1. Make the caramel syrup ahead. Put 1 tablespoon of water in a small heavy pan and pour 200 g of white sugar on top. Heat it on medium without stirring, just swirling the pan now and then, and watch it the whole time. It goes clear, then pale gold, then deep amber. Take it off the heat at deep amber, as soon as it smells toasted and before any smoke rises: past that point it turns bitter in seconds. Stand back and slowly pour in 200 ml of hot water. It will spit and boil hard, and the caramel will set into lumps. Put the pan back on a low heat and stir until everything has dissolved, then let it bubble gently for a minute or two more, until it's about as thick as runny honey. Let it cool and keep it in a closed jar in the fridge. It makes enough for about 25 drinks.
2. Put a small tumbler in the freezer for at least 10 minutes.
3. Read the strength on your bottle's label. Up to 47.5% (95 proof), use 60 ml of bourbon and no water. If it's stronger, the bourbon and cold water together make 60 ml:
   - up to 51.5% (103 proof): 55 ml bourbon + 5 ml water
   - up to 57% (114 proof): 50 ml + 10 ml
   - up to 63% (126 proof): 45 ml + 15 ml
   - up to 70% (140 proof): 40 ml + 20 ml
4. In a mixing glass or jar, pour 1½ teaspoons of caramel syrup, 2 dashes of Angostura, then the bourbon (and the water, if you need it). Fill it with ice and stir steadily for about 30 seconds, until the outside of the glass feels very cold.
5. Strain into the cold tumbler. Don't add ice.
6. Squeeze the orange peel over the top, skin side down, so its oils fall on the drink. Rub it once around the rim, then set it aside.

**closingLine:** *Take the sugar off at amber. And when they ask, let them hear how close it came.*

- **What it carries:** the first sentence is the method's own step, and Wren's reason for the caramel: knowing exactly how far to go, and stopping there (r3). The second turns the shrug. It asks the guest to own how near it came to going wrong, which is the fear, in the caramel's own terms (it really does come close to burning). It points to a future moment, the one Wren's y5 names. "Let them hear" is the gift: the fear is something the next person gets to hear. It doesn't repeat y5's words ("terrified", "that you went"), but it makes the same ask, so Wren decides whether y5 or the closing line carries the position (the *Brought Home* lesson: never both). If y5 keeps it, my fallback is the first sentence alone, *Take the sugar off at amber, not a second later.* v1's "tell them" was withdrawn because it's *The Other Berry*'s closing verb, and Wren's r4 "Then tell someone how close it came" repeats *Instead*'s "Then tell someone what they haven't heard of yet" word for word in its opening.
- **Avoided:**
  - "Spend them sitting down" (*Off Duty*): nothing about after the moment, or rest.
  - "Then say one thing you'd usually leave outside" (*Before the Room*): no confession frame.
  - "Then tell someone" (*Instead*) and "Tell them" (*The Other Berry*).
  - "say so" (*Serviceable*) and "say one thing" (*Before the Room*): no "say" either.
  - "Take someone" (*Left Standing*'s y5).
  - "Make it a day ahead" (*For Good*) and "Leave it overnight" (*Overnight*).
  - "Don't stir it" (*No Accident*).

  No registry closing line uses "amber", "close", "ask" or "let them hear". "Making it look easy" is the Lover plan's, and it's avoided everywhere.

## Checks

| Check | Result |
| --- | --- |
| Structure (*Cocktail Codex*) | **Old-Fashioned family, the whiskey Old-Fashioned.** The *Codex* root recipe (p. 5): 2 oz bourbon, 1 teaspoon demerara gum syrup, 2 dashes Angostura plus 1 dash of a second aromatic bitters, orange and lemon twists, stirred and strained over one large cube. The Old-Fashioned is "a glass of booze that's been sweetened with sugar and seasoned with bitters" (p. 4). **Core:** one single-barrel bourbon, with no second spirit and no split base (Wren r1: nothing that blends the barrel away). **Balance:** caramel syrup in place of the demerara gum syrup. **Seasoning:** 2 dashes Angostura and the scent of an orange peel. **Our changes, all owned:** (1) the caramel syrup is the spark (see Pairings); (2) the second bitters and the lemon twist are dropped, following the *Codex*'s advice that aged whiskey calls for "a light hand with the bitters" (p. 12; how aged Blanton's is isn't on our page, so this is my call); (3) it's served up with no ice, not over a cube, so nothing melts after the pour; (4) the peel is set aside, not left in the glass. It's never "the classic recipe": it's a riff on the *Codex*'s. **Lineage (Hester D2):** served up with no ice, it's also close to the "original, spirits-sugar-bitters-up" Cocktail, the one old-school version the revival didn't bring back (Oxford, COCKTAIL pdf 491; OLD-FASHIONED COCKTAIL pdf 1427). *Beside the First* (the Improved Cocktail, served up) is a neighbour, owned: rye, shaken, a lemon-wiped rim and green Chartreuse, where this is one bourbon, stirred, with a cooked sugar. This point stays in Checks. It doesn't go in the reading, because "first" winks at the guest's name. |
| Balance (Arnold; style `stirred`) | `balance.py`: 69.1 ml, dilution 45.3%, 100.4 ml. **Initial:** 41.4% ABV / 6.77 g / 0%. **Final: 28.5% ABV / 4.66 g sugar / 0% acid.** Strength, sugar and dilution are all in range (21-29 / 3.7-5.6 / 41-49). **Acid reads OUT (0 vs 0.10-0.14) on every version.** Arnold's stirred acid floor assumes vermouth, so it's a range artefact for any spirit-only stirred drink. The same reading is in *Standing By*'s Checks. The verdict line says OUT for that reason only.<br>**Strength sweep (the label step):** stirring can't rescue a strong barrel, because Arnold's stirred dilution tops out at about 46-47% whatever the strength (round 3: 60 ml at 55-65% finishes at 33-39%, OUT). So water is measured from the label, with bourbon and water always making 60 ml. I checked each band at both ends: 40% → 24.9%; 47.5% → 29.0%; 51.5% at 55 + 5 → 28.9%; 57% at 50 + 10 → 29.0%; 63% at 45 + 15 → 28.9%; 70% at 40 + 20 → 28.6%. The lowest band start is 26.0%, at 63% with 40 + 20. All are in range, and sugar is 4.65-4.72 g throughout. The band tops sit at the strength ceiling by design. One step weaker is always safe, so a guest who's unsure picks the next band down the list.<br>**Syrup sweep:** a home caramel's real sweetness is uncertain (no sugar meter), so it was swept from 50 to 75 g: 3.80-5.67 g. It stays in range up to 70 g, and 75 g is on the edge. LI adds that caramel "isn't as sweet as the sugar it contains" (p. 347). 5 ml is on the edge (3.24 g), and 10 ml goes OUT on initial sugar (5.99 g finished). So the recipe says 1½ teaspoons.<br>**Bitters:** 1-3 dashes change nothing.<br>**Rejected:** 60 ml neat at any strength above 47.5% (round 3), and a 2:1 caramel at 7.5 ml (OUT on sugar, round 3).<br>**Unsourced:** the home syrup's Brix (my scaling of LI p. 347), the 30-second stir and the batch yield. |
| Pairings | **Classic:** bourbon, sugar and aromatic bitters with orange oil are the Old-Fashioned (*Codex* pp. 4-5). **The spark, caramel:** the *Flavor Matrix* lists bourbon among caramel's substitutes (pdf 72), and corn lists caramel among its best pairings (pdf 88). Every bourbon is at least 51% corn by US regulation (Oxford, CORN pdf 583; Hester r3), so the pairing rests on the grain, but it's never "most of Blanton's flavour is corn", because its mash bill isn't published. **Why it makes the barrel louder, not covered:** it's the same reasoning the *Codex* uses for demerara, a syrup that "deepens the richness already found in the spirit" (p. 12). Carrying that reasoning over to caramel is my call. It brings in no flavour the Matrix doesn't already pair with bourbon. **The char, on the page (Hester r4):** every bourbon ages in new charred oak, and "the charring of the wood helps to caramelize the sugars in the wood" (Oxford, WHISKY, BOURBON pdf 2140). Heating the wood gives "caramel and toffee notes" (CHARRING, TOASTING pdf 437). So the pan does to the sugar what the char did to the wood. **Fence:** it's the same thing done to a different sugar, so nothing in the copy says the syrup "tastes like the barrel". **The Matrix's chemistry stays out of the copy** (Hester r3: its "Maillard" is the book's). **The stop at amber is a real step:** LI takes caramel to "almost but not quite burned" (p. 347) and pictures a sequence where the fourth pan is burnt (p. 184). The Matrix says burnt sugar goes "bitter, acrid" (pdf 72). `balance.py` can't hear bitterness, so the method's stop is what protects the drink. **Consulted and set aside:** vanilla (corn's surprise pairing, pdf 88): the barrel already brings it (*Codex* p. 12: vanillin from the oak), so adding more would cover the barrel. Apple (*Hoping You'd Come*'s roasted apples). Coconut (nuts veto). Red wine (it colours the barrel). Maple (the Trailblazer's). |
| Allergens | `allergens.py`: **veto-free** (the AD-4 floor holds). `--check ""` matches. Bourbon is a distilled grain spirit, not gluten (STUDIO-RULES 4). The caramel is plain white sugar and water. Angostura and orange peel touch no veto. |
| Makeable | **Kit:** a small heavy pan, a jar, a mixing glass or jar, a bar spoon, a strainer, a jigger and a freezer. No sugar meter: the syrup is judged by colour and thickness, and the sweep covers the uncertainty. **Safety:** the caramel is far hotter than boiling water, and adding the water makes it spit (LI p. 347: "It will boil violently"), so the method says to stand back. **Named bottle:** Blanton's Original Single Barrel, recommended, because the story names it: the first single-barrel bourbon brand (Oxford BLANTON'S pdf 283). **Substitute style:** any single-barrel bourbon. The numbers and vetoes are proved for the named bottle at 46.5%, and the label bands prove any strength from 40% to 70%. **Why strong barrels exist:** in Kentucky, bourbon "generally gets stronger as it ages" (Oxford, WHISKY, BOURBON pdf 2140; Hester r4). That page isn't used for proof rules, because its still-and-entry sentence is garbled. **Water, method only (Wren r4):** for Blanton's the water is zero, so the reading never mentions it. **Fence (Hester r3):** Blanton's barrels are picked to "a specific flavor profile" (pdf 283), so nothing in the pour promises that the guest's barrel tastes different. The label step is about strength only. **Availability flag:** Blanton's "has become so hard to find" (Breaking Bourbon, 2021; secondary), which is why the substitute is a style. **Neighbours owned:** *No Accident* (a sparkler in a flute, an unstirred sugar cube), the Magician plan's bottled-in-bond Old-Fashioned (cubed ice, no brand) and the Trailblazer plan's (bacon-washed, maple, one large cube). All are bourbon Old-Fashioneds, and this is the only one served up with no ice and a cooked sugar. The Trailblazer room should know the caramel is here, since the Matrix lists maple as a caramel substitute. |

## Names (≥3; bartender-sayable)
- **Nothing to It** (the room's pick: all three, Wren r5). It's what this person says afterwards, the shrug Wren describes ("it went fine, nothing to it", persona card), and Lee's own "I had no idea" is that register. The name recognises the person, and the reading and the closing line turn it: y5's "don't make it sound like nothing", and "let them hear how close it came". It's easy to say across a bar ("a Nothing to It, please"), a little wry, and it names no spirit, place or person. Fear check: it's the mask, not the cage, and the reading takes it off. Registry: no name opens with "Nothing". *A Brother's Care*'s epigraph ("Nothing in this glass is pretending") and *Left Standing*'s closing line ("Nothing goes on top") share only the first word.
- **Nobody Could Tell** (Wren's pick, r4). It's exactly the person, and it would sit well above her tagline (*You went first, so they knew they could*). My case against it: the reading already says it twice, "Nobody's ever been able to tell" (whoYouAre) and "nobody could tell" (y3). So the name spends the recognition before the reading lands it, and hearing it a third time makes it land less. *Nothing to It* is the mask the reading takes off, so the turn happens in the reading, not in the title. I'd hold my pick, but both are good, and the choice is Robin's.
- **Went Anyway.** The position in two words, which gives it away twice with the tagline (my memory: the name recognises, the closing line turns).
- **In Front of Everyone.** Wren's mirror, but long, and it reads as a caption.
- **Who Goes First.** Sayable, but "first" winks at the guest's own personality name.
- *Rejected:*
  - "Off the Heat" (the opening clashes with *Off Duty* and *Off-Label*).
  - "Just Before" (near *Before the Room*).
  - "Made It Look Easy" (the Lover plan's phrase).
  - "Straight From the Barrel" (a Blanton's product name).
  - "First Barrel" and "One Barrel" (captions).
  - Anything with steps, flags, summits or the moon (Wren's traps).

## Image brief

> A small, heavy tumbler stands on a scarred wooden workbench in an old barrel warehouse at first light, cold blue dawn at a high window, oak barrels stacked on wooden racks fading into shadow behind. The glass is frosted from the freezer and holds a clear, deep amber drink, no ice, filled a little over halfway, with a faint sheen of orange oil on the surface. Beside it lies a curled strip of orange peel, already squeezed. Behind the glass, a small heavy pan with a thin glaze of amber caramel still in it and a wooden spoon resting across. A squat bourbon bottle with no visible label or stopper figure. A plain glass jar of dark amber syrup. One impossible detail: far back on the racks, a single barrel is lit by a warm spotlight from nowhere, as if on a stage, while every other barrel stays in shadow. Weathered wood, rust-coloured iron hoops, early-morning cold.

- **Glass and drink:** a small tumbler (about 200 ml), chilled in the freezer, no ice. It's about half full (100 ml finished), so show it a little over halfway. The peel is set aside, not in the glass. **Colour (my read, unsourced):** bourbon is amber, and 7.5 ml of deep-amber caramel syrup and 2 dashes of Angostura in 100 ml make it a shade deeper, still clear because it's stirred.
- **Props (story):**
  - The pan with a thin amber glaze and the spoon (the step taken to amber and stopped: Wren's reason for the caramel).
  - The unlabelled bottle (one barrel, bottled on its own; no label, per the house rules, and no horse-and-rider stopper, which reads as a logo).
  - The syrup jar (the caramel, made ahead).
  - The warehouse racks (years out of sight).
  - The lit barrel (the one shown to everyone).
- **One impossible detail:** a single barrel under a stage light with no lamp. The one barrel bottled on its own, in front of everyone (Wren's mirror). It's quiet, and there's only one.
- **Must not appear:**
  - The house rules: people, faces, hands, text, labels, logos.
  - Anything from the sheet or Wren's traps: the moon, flags, footprints, summits, a diving board, a microphone, a stage audience.
  - Ice in the glass or a large cube (it's served up).
  - Smoke, black or burnt caramel.
  - A flute or a sugar cube (*No Accident*).
  - Bacon or a maple syrup bottle (the Trailblazer's).
  - A second glass.
  - Military objects (the war stays out).
- **Palette:** Pantone 7593 C (rust, grit and endurance), in the barrel hoops and the warm spotlight against the cold dawn.
