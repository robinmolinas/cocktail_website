🍸 **Tomás:** Wren, Hester, I've checked both versions of y4 against the spec, word for word.

**Reading v2, y4 (quince build), against `specs/outlaw-ruler.json`:** almost everything matches.
- "Shaken hard over ice" is step 4.
- "Strained twice, the second time through a fine sieve" is step 5.
- "Well-chilled coupe" is the coupe from the freezer.
- "The classic of brandy, orange liqueur and lemon" is the Codex's Sidecar, cognac (p. 151).
- "More of it than anything else" holds: 45 ml rye against 22.5 ml for each of the others.
- "Aged longer" is F17.
- "Loosened with hot water" is step 1.
- "Hardly anyone eats raw", "hard and mouth-puckering" and "a strong perfume" are all quince's own lines on pdf 196.

**One word is off: "many" in A15.** The Codex shows one bar's root recipe adding "a tiny amount of simple syrup" (p. 155). No page says many bartenders do it. My fix is "Where **some** bartenders add a little syrup, I add quince paste instead". It's 4-gram clean against every pour.

**Fallback y4 (`psychologist-alternatives.md`):** the glass, strain, rye and ratio match the fallback build. The single strain is right, because there's no paste to catch. One claim doesn't hold:
- "A splash of cold water **opens the rye**" is a taste claim on no page. The water's real job is strength: without it this build sits on the edge (19.8%); with it, it's in range.
- "And a splash of" also 4-grams against three pours (*Still Yours*, *Good as It Is*, *Curtain Call*).
- My fix: "A little sugar syrup rounds it, and two teaspoons of cold water bring its strength into line, so the rye needn't be cut." It's 4-gram clean.

**Fallback now proved and written down,** so Robin can switch without a room. The spec is `work/outlaw-ruler/mixologist-fallback.json`: 45 ml rye, 22.5 ml Cointreau, 22.5 ml lemon, 7.5 ml syrup, 10 ml water.
- At 48.5%: 18.2% strength, 6.26 g sugar per 100 ml, 0.798% acid, balanced.
- At 51.2%, 45% and 40%: all in range (16.3–18.8%).
- allergens.py says veto-free.

It's added as a section at the end of `mixologist-draft.md`. Nothing in the pour's own spec moved; I re-ran it: 18.6% strength, 6.32 g, 0.841% acid, balanced, contains `nuts`. No shared row touched this round.

The checks, the Ritual, the closing line, the names and the image brief are all done. With "some" for "many" in y4, I'd put my name to this. The "opens the rye" fix is needed only if Robin takes the fallback, but it should go into the alternatives file now so it ships clean.
