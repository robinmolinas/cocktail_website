# Historian audit v1: sage-regular-guy (The Dude), round 3

Audited as they stand (2026-10-02): `psychologist-reading-v1.md` (Wren, r3), `mixologist-draft.md` + `specs/sage-regular-guy.json` (Tomás, v1), `historian-anchors.md` (mine, now v1.1). Card: `fact-cards/fortaleza-guillermo-erickson-sauza.md`. Pages re-read this call: Oxford SAUZA pdf 1742-1744, DIFFUSER pdf 647, TAHONA pdf 1971; *Codex* pp. 199, 200, 208 (printed); *Flavor Matrix* pdf 306 (rendered page, seen). *Distiller* 2025 text on screen from r2. Web budget: spent (2 of 2); nothing new from the web.

**Verdict: Not yet.** No wrong story and no drink problem. Eight wording fixes in the reading (E1-E8), five notes in the drink files (D1-D5), three in my own anchors (fixed now). Fix IDs carry to round 4.

## Reading: fixes (owner Wren), old → new

| ID | where | old | new | why |
| --- | --- | --- | --- | --- |
| E1 | epigraph | It's still crushed by stone. | Its agave is still crushed by stone. | The tahona crushes the cooked agave, not the tequila (TAHONA pdf 1971; SAUZA pdf 1742). |
| E2 | y1 | The Sauza family began making tequila in 1873 | Sauza was founded in 1873 | 1873 is the brand's founding; Cenobio had run the Cuervo hacienda and bought a distillery before he renamed it (pdf 1742). The family's tequila-making didn't begin that year. |
| E3 | y1 | and it does the job fast. | and it gets more out of every plant. | Oxford gives the diffuser more sugar extracted, up to 99 percent (pdf 647), not speed. ("Speeds up processes" is Guillermo's word for modern equipment in general, W5's context, not the diffuser on a page.) You asked me to check "fast". |
| E4 | y3 | they'll never make the most tequila, or earn the most from it | they won't make the most tequila, or earn the most from it | His words are "won't ... nor will we" (W10). "Never" is ours and stronger. |
| E5 | y3 | I like to think the name was never the part he cared about. | I like to think the name was never the part he cared about most. | A signpost can't contradict the record: he named Los Abuelos to honour his grandfathers (F6), so the name did matter to him. "Most" keeps the romance and the fact. |
| E6 | y5 | or another blanco crushed by a stone wheel | or another blanco made with a stone wheel | Same as E1: the stone crushes the agave. |
| E7 | y5 | with cold soda and nothing else. | with cold soda and nothing else poured in. | Scope: the oregano comes two sentences later, so "nothing else" is false of the glass. |
| E8 | y5 | so it only brings out what's there. | so it brings out something already there. | *Matrix* pdf 306 lists one shared compound (carvacrol); oregano has its own scent too. "Only" is a scope claim the page doesn't make (Tomás's own draft says it "lifts a scent the tequila already shares"). |

## Reading: passes (checked against the page)
- Epigraph "had to find a name twice": barred, so Los Abuelos; forced by a rum's trademark, so Fortaleza (F6). "Still": as of 2025 (W5).
- y1: second-largest brand ("one of the biggest", pdf 1742); "the business was sold" with no year or seller (C1); the chain Spanish firm, Allied Domecq, Fortune Brands, Beam, Suntory (F2); "today its agave goes through a diffuser" (pdf 1744: Sauza's agave hearts are processed by diffuser; Oxford's present tense); steam and chemicals (pdf 1744); came in when agave ran short (pdf 647).
- y2: whole paragraph matches W1-W2, W3, F5-F6, G1, C2, G7. "As ... tells it" and "Guillermo felt" attribute both his account and his motive; "a fun project" is two of his words. "Wasn't allowed" = "barred", nobody named. The La Fortaleza link is signposted ("Maybe ... I like to think so"). Correct.
- y3: "over twenty years later" (2002 launch, Miller's narration, to 2025: 23 years); brick oven, slow cooking (W5, his "slowly steam cook"); tahona described as on pdf 1971, with no "ancient" or "only" (G3, G4); "far less efficient" for his "considerably less efficient", attributed, against modern mills (his roller and screw mills). "A name is what everyone fights over" reads as the bartender's opinion; pass.
- y4: "a piece of land, an old stone wheel, and a taste he remembered" rests on W3 and W8 (his own words); "old" for his "ancient" wheel. "Everyone else was busy with the name" is the bartender's framing of sourced events (the owners, the bar on the name, the rum's trademark); pass as framing, not as a claim about anyone's motive.
- y5: "simplest long drink" (*Codex* p. 200 puts spirit and soda among the simplest drinks at the bar); "one of the best" is the bartender's opinion, labelled so in your Notes, fine. I wouldn't use "a classic of its kind": nothing I've read calls the tequila highball a classic. "Bright and citrusy": *Codex* p. 208 gives "citrusy" for blanco with seltzer; "bright" is a taste word with no number against it; pass. Oregano as the twist tied to the story in words (Robin's rule): pass.
- Notes table: rows match the card; no dropped claim left in it, once E3 lands (the "fast" row should read "more sugar out, pdf 647").
- History share ≈ two-fifths: under half. No gendered word about the guest, no film, no "real", no "yours" alone.

## Drink files: notes (owner Tomás)

| ID | where | old | new | why |
| --- | --- | --- | --- | --- |
| D1 | Checks, Makeable; spec `version` | "(Oxford SAUZA pdf 1742-1743: estate-grown agave, crushed with a tahona)" / "estate-grown agave, tahona" | "(Oxford SAUZA pdf 1742-1743: his tequila, made with a tahona)" | C5: "100 percent estate-grown" was what he set out to do; as of 2025 they grow some agave and buy the rest (W6). |
| D2 | Method 5 and closingLine | "The soda brings out the citrus in the tequila by itself." / "the soda finds the citrus by itself" | "The soda turns the tequila citrusy by itself." / "the soda turns it citrusy by itself" (or your own wording) | *Codex* p. 208: blanco is "earthy and vegetal on its own" and "becomes citrusy" in a Highball. "The citrus in the tequila" says there's citrus in the bottle; the page says the soda makes it taste so. Wording only. Wren has a separate note on the second half of the closing line (*Not the Same*). |
| D3 | Recipe "(40%)" and the new `fortaleza_blanco` row | 40%, unsourced | Keep 40% marked **unsourced** in the row and Checks. Name it "Fortaleza Blanco (the standard one, not the Still Strength)". | No page I've read gives the label strength, and both web visits are spent. Miller (2025) lists a separate still-strength blanco, so "Blanco" alone could send the guest to the stronger bottle. Your 38-46% sweep covers both, so the balance verdict stands. |
| D4 | Checks, Structure | "The *Codex*'s classic Whisky Highball is just spirit and seltzer ... (p. 199)" | "The *Codex*'s classic Whisky Highball is spirit and seltzer, with a lemon wedge the authors leave out of their root recipe (p. 199)" | The printed p. 199 card still lists "Garnish: 1 lemon wedge"; the text then omits it. Dossier only. |
| D5 | Image brief | "a fist-sized grey volcanic stone" | "a fist-sized rough grey stone" | No page says what Fortaleza's tahona is made of; Oxford's "volcanic stone tahona wheel" is Patrón's (pdf 1482). |

## Drink files: passes
- *Codex* p. 199: 2 oz to 6 oz, three cubes, a three-second stir, one stir after the seltzer; "unnecessary at best" for the lemon wedge; 5 oz to 2 oz "in Highballs with more assertive whiskies" (your 2:5, carried to tequila as your call). p. 200 "theatrical affectation" is on the page (note: the authors also "heartily endorse" the ritual, so the contrast is your reading, not theirs; dossier only).
- *Matrix* pdf 306 (rendered, I've seen it): Papaya + Tequila share carvacrol ("caraway, spice, thyme"), "also shared with cilantro, cumin, oregano, blueberries". Pass. (The pair also shares 2-methylthiophene; not used.)
- Balance arithmetic: 20 ml ethanol in 175 ml = 11.4%; 38% with 150 ml = 9.5% (EDGE, owned); melt 15 ml and 25 ml = 10.5% and 10.0%. Pass.
- Oregano: no other pour file contains it (grep). *Further Than Me*'s herb is clapped tarragon (its draft row). Pass.
- Bottle facts (your four), answered in my r3 turn: (1) 40% unsourced (D3); (2) tahona: secondary, his 2025 words cover their production, and the standard blanco is one of their line (W5, Miller); no separate "tahona expression" exists to name; (3) the substitute style is real: Oxford names other tequilas made with a tahona (El Tesoro pdf 717, Siete Leguas pdf 1799, Patrón pdf 1482) and industrial distilleries adding it back (TEQUILA pdf 2002); per-expression blancos aren't on those pages, so keep it a style; (4) price: unsourced, so no price anywhere; availability: "on allocation and tough to find anywhere" (Miller 2025), so the substitute carries the guest who can't buy it.

## My anchors (fixed now, v1.1)
- A2 fact: "two big distilleries" → "two industrial distilleries" (his word; "big" was mine).
- A6 meaning: "Plain, heavy and slow, and it works." → "Plain and old, and by his own account less efficient than a modern mill." ("Heavy", "slow" and "it works" were mine, on no page.)
- A7 fact: "much less efficient" → "considerably less efficient" (his word).
- Grep for every phrase above in the anchors: done in the same call.
