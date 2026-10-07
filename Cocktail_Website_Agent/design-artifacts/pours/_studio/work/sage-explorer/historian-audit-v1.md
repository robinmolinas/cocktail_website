# Historian fact audit v1: sage-explorer (The Philosopher), round 3

Audited: `historian-anchors.md` v1 (A1-A10), `mixologist-draft.md` v1 and `_studio/specs/sage-explorer.json` v1 (notes). The reading (`psychologist-reading-v1.md`) had not landed when I wrote this, so it gets audited in round 4 step 2. Card: `_studio/fact-cards/sylvius-morewood-genever.md`. Every page below was re-read on screen this session. The Matrix Grain chart (pdf 137, printed 127) was rendered and read as an image.

## Tomás's asks (r2)
| ask | verdict | source |
| --- | --- | --- |
| "a rich spirit tasting mostly of the grain" | **On the page, but in 1688.** The sentence describes the Dutch genever the English were copying after 1688, not today's bottle. For oude today, use pdf 870: "closest in flavor to a whisky", and juniper "not traditionally dominant" (both on screen). Card F13, F20. | GENEVER pdf 873; pdf 870 |
| "a stripped-down version … a stripped-down name: gin" | **On the page.** It is Oxford's run, so it stays in the dossier only. Guest text paraphrases it ("the English copied it and shortened its name": "geneva" became "gin", GIN pdf 890), and never uses "stripped", which *Half a Rim* owns ("stripped back"). Card F13. | GENEVER pdf 873; GIN pdf 890 |
| Wine base, from WHISKY pdf 2131 | **On the page:** "By 1588, Dutch distillers had moved from using French wine as the base for their genever to making their own from barley and rye." Cite only this page. Its paragraph carries no medicine. Card F12 now cites it. | WHISKY pdf 2131 |

## Drink v1 (draft and spec)
| ID | where | claim | verdict | fix (old → new) |
| --- | --- | --- | --- | --- |
| D1 | spec `subfamily`; draft Story in the glass ("the brandy *is* what genever was made from before grain") | brandy was genever's old base | **fix (scope).** The base was French *wine* (pdf 2131). The brandy is a spirit distilled from wine, not the base itself. Our riff. | spec: "French grape brandy, the base genever was made from before grain" → "French grape brandy, distilled from wine, as genever was before grain". Draft: "the brandy *is* what genever was made from before grain" → "the brandy is made from wine, which is what genever was made from before grain" |
| D2 | spec `subfamily` cites "GENEVER pdf 872-873" | wine base | **fix (citation only).** pdf 872-873 sets the wine next to "medicinal distillates" (your own fence). | "(Oxford WHISKY pdf 2131; GENEVER pdf 872-873)" → "(Oxford WHISKY pdf 2131)" |
| D3 | closingLine "Brandy in first, then the genever over it." | pour order | **fix (method order).** Method step 1 puts the syrup and the bitters in first, so "Brandy in first" is false against step 1. | "Brandy in first, then the genever over it." → "The brandy goes in before the genever." |
| D4 | Checks/Structure and spec `version`: "Holland gin and brandy were 'by far the most popular spirits used for Cocktails' … so the two spirits sitting together is old Cocktail ground" | the pair was mixed together | **fix (scope).** pdf 175 says each was popular, not that they shared a glass. | "so the two spirits sitting together is old Cocktail ground, not a modern bridge" → "so both spirits are old Cocktail ground; putting them in one glass is my riff" |
| D5 | "The base build is George Kappeler's 1895 Old-Fashioned" | Kappeler | **pass, with a fence.** Pdf 187 has sugar dissolved in water, two dashes Angostura, "a small piece ice", lemon peel, 2 oz spirit, the spoon left in, and versions with whiskey, brandy, Holland gin and Old Tom. Ours has a glass full of ice, syrup and a split base, so guest text says "after Kappeler's 1895 recipe", never "his recipe". | none |
| D6 | Codex p. 104 for the split base | split base | **pass.** P. 103 explains the Ideal Daiquiri's split base: a light rum "accented with a tiny amount" of agricole. P. 104 is that recipe (1¾ oz + ¼ oz). Cite pp. 103-104. | "Codex p. 104" → "Codex pp. 103-104" (citation only) |
| D7 | Matrix Grain chart carries brandy | pairing | **pass.** It's in the Alcohol segment, rendered page 127 (with sake). Grape and red wine are on the same wheel's fruit side. | none |
| D8 | oude 35% legal floor, sugar ≤20 g/L, "oude" a legal category | bottle | **pass** (pdf 875). The note's "Dutch or Belgian" matches "made in the Netherlands or Belgium". | none |
| D9 | `genever_oude` = distilled grain, not gluten | allergen | **pass** (moutwijn: rye, corn, malted barley, distilled at least three times, pdf 874; STUDIO-RULES 4). | none |
| D10 | Image: the square, broad-shouldered case bottle | prop | **pass** (the caption on pdf 872 calls it the "traditional broad-shouldered, square case bottle"). Colour: **no page gives oude genever's colour** (pdf 870-875 searched). Keep "pale gold-amber" labelled yours. Don't make it look aged (G6). | none |
| D11 | closingLine "what's there is usually older, and bigger" | life claim | **pass** as interpretation (it's about life, not history). Wren decides whether it takes her position words. | none |

## Anchors v1
| ID | verdict | note |
| --- | --- | --- |
| A1-A10 | **pass** on re-read. | One addition: F20 (pdf 870: oude closest to whisky in taste, juniper not traditionally dominant) is now on the card, for the drink paragraph. pdf 870 also calls genever "often trumpeted as the ancestor of gin", while JENEVER pdf 1102 calls it gin's ancestor outright. That isn't a conflict, but the reading should claim the ancestry, never that genever "was always mostly juniper". |

## Open for round 4 step 2
- The reading, sentence by sentence, against A1-A10, G1-G8 and D1-D4 once they've landed. Grep it for: "Leiden" (Morewood's words only), "physician", "medicine", "stripped", "aged", "original", "first gin", "everyone", "proved", "Kämpfer never".
