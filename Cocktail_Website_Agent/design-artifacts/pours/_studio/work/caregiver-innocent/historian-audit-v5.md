# Historian's audit v5: caregiver-innocent rework (round 8)
Audits `psychologist-reading-v4-rework.md` with Wren's two lint rewordings, and `mixologist-draft.md` with Tomás's round-8 closing line and Pairings row.
Sources re-opened this round: Oxford KIR pdf 1133, VERMOUTH-CASSIS pdf 2097, CRÈME DE CASSIS pdf 597; Joy pdf 213, 315; Flavor Matrix pdf 52; fact card `felix-kir.md`.

## Restored text
whoYouAre (both paragraphs) and y5 match `pours/caregiver-innocent.md` word for word (lines 55, 57, 69). No factual claims. Pass.

## Reading: fixes (exact old → new)
- **R1, y1.** "and for his years in that office he poured the same drink at every official gathering. He never saw the drink travel. Oxford notes it became internationally fashionable after he died." → "and for his years in that office he poured the same drink at official gatherings. He died just as the rest of the world was taking it up."
  Why: Joy says "at official functions" (pdf 315), and no source says *every*. "Never saw it travel" is false: in the 1950s he took it to Paris himself, drinking nothing else there, and the press renamed it for him (Oxford VERMOUTH-CASSIS pdf 2097). Oxford KIR puts his death "at the very beginning" of the international vogue (pdf 1133), not before it.
- **R2, y2.** "the dark syrup pressed from Dijon's black currants" → "the dark liqueur made from Burgundy's black currants"
  Why: crème de cassis is a liqueur, the fruit macerated in neutral alcohol and then sugared, not pressed (Oxford pdf 597). A guest who reads "syrup" may buy sirop de cassis, which is a different bottle with no alcohol. I'm reversing my round-6 "Wren's call" for exactly that reason.
- **R3, y2.** "He brought it to every gathering" → "He brought it to the city's receptions" (the same "every" as R1; Oxford pdf 1133 "the city's receptions", Joy pdf 315 "official functions").
- **R4, y3 (Wren's lint rewording moves a fact).** "They knew the glass he handed them, and very little of him." → "They knew the glass he handed them, and very little of what he carried in."
  Why: people knew him. He was elected as a "highly respected French resistance veteran" (pdf 1133), and the press renamed the drink "as a tribute to him" (pdf 2097). What the sources leave out is what it meant to him ("Neither says what that meant for him"), not the man. The earlier wording, "not much of the man", had the same flaw.
- **R5, y4.** "The cocktail I've made for you starts from his: crème de cassis, with Crémant de Bourgogne poured over it, built in the glass, not shaken." → "The cocktail I've made for you starts from the one he poured, with one change: Crémant de Bourgogne, Burgundy's sparkling wine, in place of the still white wine. It's built in the glass, not shaken."
  Why: "his" breaks the fence (y2 itself says he hadn't invented it). And the sparkling version is on record only from the 1970s, "the bubbles made their appearance" (pdf 2097), after he died. So our glass is his drink changed, never his drink.
- **R6, y4.** "a leaf of basil is pressed and strained away" → "a few basil leaves are pressed into the cassis and strained away" (the recipe uses 8–10 leaves).

## Reading: passes
- y2 "It came to be known by his name" (Wren's lint rewording): passes. It's Joy's wording ("what came to be known as the Kir", pdf 315) and claims no mechanism. Oxford disagrees with itself on how the name moved (pdf 1133 vs 2097, card C1).
- y3 "respected Resistance veteran" in both books: passes (pdf 1133 "highly respected", pdf 315 "revered for his work"). "Neither says what that meant for him": true. "whatever he might have set down … would have thought to ask": passes, hedged. "felt welcomed": our reading, inside the hedged paragraph.
- y4 "A Kir is supposed to taste of cassis": passes as the bartender's voice (the cassis sweetens and flavours the wine, Joy pdf 315). "The bubbles carry the basil up, so it's the first thing you meet": this is Tomás's own knowledge, labelled unsourced in Pairings. The epigraph rests on the same claim and passes on the same basis.
- Name, tagline and closing line make no historical claims. "leave outside" has no hits in any pour.

## Draft: fixes
- **D1, Recipe row and Plain language.** "a thick, sweet blackcurrant syrup" → "a sweet blackcurrant liqueur" (pdf 597). Same reason as R2.
- **D2, Structure, Pairings and spec `_notes`.** "surprise pairing for berry/blackcurrant" / "Berry/currant section … berry/currants" → "Flavor Matrix, BERRY (pdf 52): basil is a surprise pairing for berries; currants appear only among the berries' substitutes. Basil with blackcurrant by name isn't in the book: that step is mine." The page's subtypes are strawberry, blueberry, blackberry, raspberry and cranberry. This is the family-versus-bottle mistake again, and it was in my own anchors too.
- **D3, Balance.** Cassis sugar "35 g/100 ml (unsourced)" → "at least 40 g/100 ml (French legal minimum, 400 g per litre, Oxford pdf 597)". Rerun balance.py. The drink is freeform, so no range verdict moves, but the numbers must come from the page. The ABV stays unsourced, because pdf 597 gives none.
- **D4, Unsourced note.** "Crémant is not in the library" → "Oxford KIR pdf 1133 names crémant de Bourgogne, 'a local sparkling wine', for the Kir Royale". The spec's champagne_brut proxy is fine.
- **D5, Structure.** "(pdf 315: 'not easily categorised')" → the phrase isn't in *Joy*. pdf 315 says "FAMILY: ORPHANS", and pdf 213 defines Orphans as drinks that "don't fit into any of the drink families". Cite pdf 213, or drop the quotation marks.
- **D6, Texture/Resonance note.** "It is not identifiable as basil by most drinkers — it just makes the cassis brighter, and nobody knows why": "most drinkers" is a claim, and this is the hidden-helper shape Wren took out of the reading. Label it as own knowledge, or cut it.
- Closing line (new): passes. The lift is own knowledge and labelled as such; the method matches (basil pressed into the cassis and strained, Crémant poured over).

## My own misses, struck
- I already had a card, `fact-cards/felix-kir.md` (2026-09-27, proposed for caregiver-hero), and I re-researched Kir in round 1 instead of reading it. It held the pdf 2097 account that sinks "never saw it travel". That's a card-discipline failure, and it's mine.
- In `historian-anchors-rework.md` I dated Barabant's official drink "from 1904". That year is contested (card C1), so it's struck. I also carried "basil beside blackcurrant" without opening pdf 52; corrected in D2.
- In `historian-rework-candidates.md` I gave Brigham as "(1840–1877)". Oxford gives 1807–1877 (pdf 353). Corrected.
- The anchors now live in `historian-anchors.md` (rework), because the host asked for that file in round 4. The first pour's angelica anchors are kept as `historian-anchors-angelica.md`.

## Verdict
**Not yet as it stands.** With exactly R1–R6 in the reading and D1–D6 in the draft, as quoted, **I'd put my name to this.** None of them changes the story, the drink or its measures.
