# Searchable text of the studio library

One-time text extraction (2026-09-24) of the books in `../historian/` and
`../mixologist/`, so the authoring agents can search in milliseconds instead of
opening a PDF for every pour. **Private research only.** Never copy this text
into a pour or into the app repo. Facts go into the per-pour dossier with a
citation, and the wording is always our own.

| File | Book | How to cite |
| --- | --- | --- |
| `historian/imbibe.md` | *Imbibe!* (Wondrich) | `Imbibe!, pdf N` |
| `historian/oxford-companion.md` | *Oxford Companion to Spirits and Cocktails* | by entry headword + pdf page: `Oxford Companion, ROB ROY (pdf 1667)`. Its "printed" labels are PDF artefacts (e.g. `1 667`); ignore them |
| `historian/mezcal-bookey-summary.md` | Bookey summary of Janzen's *Mezcal* | **never cite**: leads only, confirm elsewhere |
| `historian/a-proper-drink.md` | *A Proper Drink* (Simonson, 2016): the cocktail revival | `A Proper Drink, p. N` (from `printed N`). Index: `a-proper-drink.index.md` |
| `mixologist/joy-of-mixology.md` | *The Joy of Mixology*, revised ed. (Regan, 2018; OCR, the PDF's text layer is broken) | `Joy of Mixology, pdf N`. Index: `joy-of-mixology.index.md` |
| `mixologist/cocktail-codex.md` | *Cocktail Codex* (epub) | `Cocktail Codex, p. N` (from `=== printed N ===`) |
| `mixologist/liquid-intelligence.md` | *Liquid Intelligence* (Arnold) | `Liquid Intelligence, p. N` (from `printed N`) |
| `mixologist/flavor-matrix.md` | *The Flavor Matrix* (OCR of a scanned PDF) | `Flavor Matrix, pdf N`; OCR can garble numbers and names, so check the page image before citing a figure |

Books added later carry an **index** beside them (`<file>.index.md`): chapters with pages, recipes with creators, who's where. Read it before searching.

Every page starts with a marker line: `=== pdf N ===` or
`=== pdf N | printed M ===` (`=== chapter …` in the Codex).

## Finding things

```bash
# every hit with its line number, then look back for the nearest page marker
grep -n -i "solera" historian/oxford-companion.md
# the page a line sits on
awk 'NR<=45100 && /^=== /{m=$0} END{print m}' historian/oxford-companion.md
```

Research answers become reusable fact cards (one per drink or ingredient, with
citations) so each fact is looked up and verified once, then reused across all
132 pours.
