# Fact audit v4 (final): jester-caregiver (The Morale Booster), *Anyway*

Hester, round 7 (2026-09-30). Audits `psychologist-reading-v4.md` (Wren, round 6), `mixologist-draft.md` v1.2 (Tomás, round 6) and spec `specs/jester-caregiver.json` v1.1, against the card `fact-cards/clara-bell-walsh-cocktail-party.md` (F1–F17, L1–L5, C1–C3) and audits v1–v3. v4 differs from v3 in y4 only, which I checked by diff.

**Verdict: PASS.** Every factual claim is sourced and within its page's scope. Every interpretation is signposted. The anchors match.

## Reading v4

| # | where | claim | verdict |
| --- | --- | --- | --- |
| D1 | epigraph | "People tried everything to fix the orange in the Bronx cocktail. This is one more try." | PASS (*Imbibe!* pdf 237). |
| D2 | y1 | Sunday afternoon, early 1917, St. Louis; about fifty guests; noon until one; a newspaper gave her the credit; the first party on record "planned as a cocktail party and called one" | PASS (Oxford pdf 512; F1, F2, F4). Unchanged since v3 (C2). |
| D3 | y2 | other themes; babies and bottles; didn't catch on; still one of the ways people get together | PASS (F3, F9). |
| D4 | y3 | "It's the cocktail party people remember. But it might never have come without the ones before it…"; the Sazeracs; "I like to think…" ×2 | PASS (F3, F6, F9). |
| D5 | y4 | "the sensation of her day … on her menu … famously hard to get right … goes weak, so people kept trying new answers" | PASS (Oxford pdf 358, 512; *Imbibe!* pdf 237). |
| D6 | y4 (new) | "The version I start from doesn't pour juice at all: one thin slice of orange is crushed in the shaker, peel and all, because the peel is where most of an orange's flavour is." | **PASS.** Oxford's recipe muddles an orange wheel cut in eight and pours no juice (pdf 358). "Most of" matches the *Matrix* pdf 80. "Thin" comes from our spec, and Oxford gives no thickness, so the claim is additional but not contradicted. The colon clause reads as how the orange goes into this glass. Nothing is claimed as "mine" or as the record's old trick. |
| D7 | y4 | "You can taste the orange without drowning the gin." | PASS (spec: no juice poured; 20.2%). |
| D8 | y4 (new) | "Then I added mine. A pinch of cracked coriander seeds goes in with the orange: coriander is one of the usual flavourings in London dry gin, with a lemony note of its own." | PASS (spec ¼ tsp; Oxford pdf 894; C9 fixed). No count (C12). |
| D9 | y4 | "in place of the Angostura there are two dashes of Peychaud's, the Sazerac's bitters, for the guests who'd rather have had a Sazerac" | PASS (spec; Oxford pdf 358, 1750; F6). |
| D10 | y5 | the list; "Throw it anyway. I'd come to both." | PASS. No facts. |
| D11 | closing line | *Muddle the whole wheel, peel and all. Then tell the story of the one that didn't take.* | PASS. No facts. "Whole wheel" matches method steps 2–3. It's the same line in the draft (v1.2) and in Wren's note. |
| D12 | name, tagline | *Anyway*; "You decide it's going to be a good night. Then you make it one." | PASS. No claims. |

## Draft v1.2 and spec v1.1

| # | where | now reads | verdict |
| --- | --- | --- | --- |
| T1 | orange note | "the peel is where most of an orange's flavour is" | PASS. |
| T2 | sweet vermouth note | "more of the sweet than Oxford's recipe: it puts back the sugar a pour of orange juice would bring" | PASS. |
| T3 | Structure | "Oxford's recipe shakes it (pdf 358), and so does *Imbibe!*'s (pdf 238…)" | PASS. No "always". |
| T4 | Balance | "The analogy is mine: Oxford's 'neither-flesh-nor-fowl' (pdf 358) is its phrase for a Bronx with too little orange, not for this acidity." | PASS. The phrase is labelled, and its scope is given. |
| T5 | Makeable | "any London dry gin of 43% or more (the 37.5–40% ones run the drink thin…)" | PASS. "Many" is cut. |
| T6 | spec | `coriander_seed` 0.25 tsp in `ingredients`; `"garnish": []` | PASS. Matches method step 5 (strained) and step 6 (nothing on the rim). |
| T7 | coriander note | "one of the usual flavourings in London dry gin, with a lemony note of its own; strained out before serving" | PASS (Oxford pdf 894). |
| T8 | unsourced values | the wheel's ~10 ml of juice, gin at 47%, the coriander dose, "a few dozen seeds" (in Tomás's notes) | PASS as labelled: all are marked as his estimates. None is in guest text. |
| T9 | citations | Oxford pdf 358, 491, 894, 1447, 1502, 1750; *Imbibe!* pdf 237–238; *Matrix* pdf 80; *Codex* p. 64, 66 | PASS. All read on the page, rounds 2–5. |
| T10 | image brief | clock at a few past twelve; paper crown; sideboard; no babies, bottles, mansion, Sazerac or Waldorf | PASS. |

## Stays out (confirmed absent from reading v4 and draft v1.2)
The 1922 *Times* sneer; "instant hit" / "within weeks"; the Country Club; the dinner at one; the Plaza and the mansion; the Waldorf; Wondrich's Sazerac aside; the "kiddie drinks" rant; the 1903 and 1906 parties; any month; any newspaper's name; any motive given to Walsh.

**Sign-off: I'd put my name to this**, on reading v4, draft v1.2 and spec v1.1.
