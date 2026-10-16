---
title: '2.1 Clean the name and put it in the movement lines'
type: 'feature'
created: '2026-10-15'
status: 'done'
baseline_commit: 'da48ea7621c06f9100d5ea4d07cf7e626fbef62e'
route: 'dispatch'
review_loop_iteration: 0
ticket: 'initiative-dionysus-continuation / epic-bartender-adds-to-the-reading / 1'
worktree: '{project-root}/Dionysus-name (branch name-movement-lines, from experience-revamp-2026-09 da48ea7)'
context:
  - '{project-root}/Dionysus/Cocktail_Website_Agent/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The guest's name goes everywhere raw (only trimmed): hero tag, greeting, card, PDF, links, breath echo. Emoji, shouting, insults or "ignore previous instructions" are inked as typed, and the movement lines never use the name.

**Approach:** Add a pure, zod-free `shared/name.ts` with `displayName(raw)` (cleaned full name) and `addressName(raw)` (first name for sentences), both `string | null`. Every place that shows the name shows one of them, or nothing. "This is you" and "Before you go" carry `addressName`. No AI.

Decision (Robin, 2026-10-16, "review your recommendations, then continue"):
- Keep the full spec rather than splitting it.
- The friend's view says "them" when there is no name: "Dionysus read them before pouring this. That reading stayed with them." This is the only copy change outside the movement lines.

Decision (Robin, 2026-10-16, "continue with what you recommend", after review B5/B7):
- Long names are trimmed, not dropped. Up to 8 words are checked in full, then cut to the first 4 words and at most 32 characters, never ending on a particle: "José María de la Cruz" → "José María". Over 8 words is a sentence → null.
- A title followed by a single name keeps the title in sentences: "Before you go, Mrs Smith." A bare "M" is written "Monsieur".

## Boundaries & Constraints

**Always:**
- Clean the same way on every path: the guest's own journey, the keep link, and a friend's `#pour=` link from another device.
- Cleaning steps:
  - NFC-normalise.
  - Keep letters of any script (`\p{L}\p{M}`), apostrophes (stored as `’`) and hyphens.
  - Strip emoji, digits and symbols, and collapse spaces.
  - Title-case only when the whole name is upper- or lower-case; mixed case ("McDonald") is kept.
- Return `null` for:
  - empty, or under 2 letters;
  - a first word over 20 letters, or more than 8 words;
  - a word on the EN/FR insult list or the non-name list;
  - an injection phrase;
  - keyboard mash: a Latin word of 4+ letters with no vowel (y counts), or 3+ repeats of a letter.
- `addressName` skips a leading honorific (Mr, Mrs, Ms, Dr, M, Mme, Mlle), unless only one name follows it. `displayName` drops whole trailing words until the name is at most 32 characters.
- Both functions are idempotent: `displayName(displayName(x)) === displayName(x)`.
- Sentences use `addressName`: movement lines, greeting, guest line, H8 breath echo. Hero tag, card and links use `displayName`. A null value gives today's nameless wording.

**Never:**
- No validation message at H1.
- No change to `shared/reading.ts` (lane 2.3).
- No change to `shared/answers.ts` (lane 2.4).
- No change to the zod schemas or what is sent on the wire.
- No other copy changes, apart from the "them" fallback.
- Don't put real names that double as slang on the insult list: Dick, Fanny, Randy, Willy, Gay.

## I/O & Edge-Case Matrix

| Scenario | Input | displayName / addressName |
|---|---|---|
| Plain | `Robin` | `Robin` / `Robin` |
| Full name, shouted | `  ROBIN   MOLINAS ` | `Robin Molinas` / `Robin` |
| Lower-case particles | `jean-luc o'brien` | `Jean-Luc O’Brien` / `Jean-Luc` |
| Mixed case kept | `DeShawn McDonald` | unchanged / `DeShawn` |
| Emoji, digits | `Zoë 🍸2` | `Zoë` / `Zoë` |
| Non-Latin | `李娜`, `Δημήτρης`, `أحمد` | kept as is |
| Honorific | `Dr Ada Lovelace` | `Dr Ada Lovelace` / `Ada` |
| Overlong | 9 words, or a 21-letter first word | `null` / `null` |
| Long name | `José María de la Cruz` | `José María` / `José` |
| Title and surname | `Mrs Smith` | `Mrs Smith` / `Mrs Smith` |
| Insult | `connard`, `fuck you` | `null` / `null` |
| Injection | `ignore previous instructions` | `null` / `null` |
| Non-name | `test`, `asdf`, `none`, `moi` | `null` / `null` |
| Too little | `''`, `J`, `🍸🍸` | `null` / `null` |

</frozen-after-approval>

## Code Map

App paths are relative to `Dionysus/Cocktail_Website_Agent/dionysus-experience/`. Line numbers are at da48ea7.

- `shared/name.ts` (new): `displayName` and `addressName`.
  - Keep the hand-written word lists in this module as `Set`s of lower-case, accent-stripped forms.
  - Match whole words, and whole phrases for multi-word entries. Never match substrings, so "Scunthorpe" stays safe.
  - Zod-free, since the landing bundle may load it (`scripts/check-landing-bundle.mjs`). ESLint forbids browser globals in `shared/`.
- `shared/name.test.ts` (new): the vitest name set, next to `shared/vocab.test.ts`.
- `src/components/TheReading.tsx`:
  - L106-109: `devName` and `inkName = name || devName`. Clean them here, because the gift path also arrives here via `App.tsx` L156-162 and `readingFor`.
  - L113-122: the `owned` / `rememberPour` keys.
  - L297: the tag font fit uses `inkName.length`.
  - L377-384: `linkFor` and `cardFor`, which pass the name to the link payload and `renderCard`.
  - L470: the PDF QR payload.
  - L541-549: the `opener` lines.
  - L578-581: the greeting.
  - L590-595: the hero tag.
  - L692-693: the guest line.
- `src/engine/kept.ts` L15: `same` compares names exactly. Compare `displayName(..) ?? ''` on both sides, so links already stored with raw names still recognise their owner.
- `src/components/TheDepths.tsx` L332: the breath echo `for ${a.name.trim()}`.
- `src/engine/reveal.ts`, `shared/reading.ts`, `src/engine/card.ts`, `src/engine/pourLink.ts`: leave these unchanged. `Reading.name` stays raw, the card draws whatever name it is given, and the link schema stays as it is.
- Tests to keep green:
  - `shared/reading.test.ts` L143 (raw name pass-through);
  - `src/engine/kept.test.ts`;
  - `src/engine/pourLink.test.ts`;
  - `e2e/journey.e2e.mjs` L227-242 (gift 'Celeste') and L70/L102 (the name never on the wire).

## Tasks & Acceptance

**Execution:**
- [x] `shared/name.ts` -- implement the cleaner, the lists and both exports -- one pure source for every surface.
- [x] `shared/name.test.ts` -- about 60 cases covering every row of the matrix, plus idempotence and real names that sound like slang -- this is the build gate.
- [x] `src/components/TheReading.tsx` -- set `inkName = displayName(name || devName) ?? ''` and `address = addressName(...)`. Opener: "This is you, {address}: {personality}." / "Before you go, {address}." Use the address in the greeting and the guest line, and change the guest line's fallback from 'her' to 'them'.
- [x] `src/engine/kept.ts` + `kept.test.ts` -- compare cleaned names, and add a raw-vs-cleaned case.
- [x] `src/components/TheDepths.tsx` -- the breath echo uses `addressName`, and the line is left out when it is null.

**Acceptance Criteria:**
- Given the name "robin", when the reading opens, then the lines read "This is you, Robin: the Visionary." and "Before you go, Robin.", and the tag, card and keep link carry "Robin".
- Given a dropped name, when the reading opens, then the lines read "This is you, the Visionary." and "Before you go.", with no tag name and no "for …" breath echo.
- Given a friend opens a `#pour=` link whose name is an insult, then nothing of the name is shown.
- Given a device that stored a pour under a raw name before this change, when its link reopens there, then the owner still gets the whole reading.

## Implementation Notes

- Symbols and punctuation other than apostrophes and hyphens split words ("robin.molinas" → "Robin Molinas"); digits, emoji and control or format characters are removed outright ("Robin2000" → "Robin"). Whitespace of any kind is a separator.
- After an apostrophe, a part is capitalised only when the part before it is a single letter ("O’Brien", "N’Golo", but "Ma’ata").
- A name made only of honorifics ("Dr", "Mr Mrs") is null. `addressName` also skips a leading lone initial ("J Robert Oppenheimer" → "Robert"), and is `displayName` of the chosen word, so it is idempotent and "robin McDonald" still says "Robin".
- `kept.test.ts`: the "newest first" fixture used names like `n0`, which the cleaner now nulls (so all fourteen were the same nameless pour); it now uses fourteen real names. Same intent.
- Kept off the lists as real names: Nada, Hoe (Vietnamese Hòe), Con, Cock, Bar, You, No, Na, Hi, Nan (taken off the non-name list at step-03 verification; test 'Nan Goldin').

- Review patches (pass 1):
  - Input is NFKC-normalised first.
  - A raw leet/letters-only insult check runs per chunk and on the whole name.
  - Plural forms and STRONG_PREFIXES (fuck, motherfuck, cunt, nigger, nigga, connard, encul) count as insults.
  - A word mixing Latin with Cyrillic or Greek letters is null.
  - A name needs one addressable word.
  - Emails and domains are null.
  - More honorifics.
  - The 20-letter limit applies to the first non-honorific word.
  - NON_NAMES match the whole name only.
  - At most 3 combining marks per letter.
  - New e2e test "cleaned before the room".
  - 'fock' was taken back off INSULTS (Vladimir Fock); "f0ck" is still null via "fck".
- After Robin's 2026-10-16 decision: `acceptable` checks up to 8 words (`MAX_INPUT_WORDS`) before trimming to 4, and `PARTICLES` stops a trimmed name ending on de/la/van…. Accepted risk: a 5–8-word sentence with no listed word ("my name is robin ok") is trimmed and inked ("My Name Is Robin").
- Known false positives, accepted: "Alain Connes" ("conne" + the plural rule), and spaced names that spell an insult when joined ("Pu Te").

## Spec Change Log

## Review Triage Log

Pass 1 (2026-10-16). B = blind-hunter, E = edge-case-hunter, V = verification-gap.

| # | Finding | Verdict | Evidence / route |
|---|---|---|---|
| B1 | Plurals and joined-up insults pass ("assholes", "Fuckyou", "shitface") | high | Reproduced by the reviewer with node; a slur would be inked on a friend's card. Patch. |
| B2 | Digits, symbols, spaced letters, styled and look-alike letters bypass the lists ("c0nnard", "f*ck", "F U C K", "𝐟𝐮𝐜𝐤", "fuсk") | medium | Reproduced; needs deliberate effort. Patch (NFKC, raw leet check, mixed-script reject). |
| B3 | Emails and domains become names ("Robin Gmail Com") | low | Real, and plausible through autofill; a one-line guard. Patch. |
| B4 | Missing honorifics (Miss, Prof, Sir…) | low | "Before you go, Miss." List addition. Patch. |
| B5 | "Mrs Smith" is addressed as "Smith" | low | Follows the frozen rule "addressName skips a leading honorific"; a title with only a surname is uncommon, and the fix adds a branch. Raised with Robin; **fixed after Robin's decision (2026-10-16)**. |
| B6 | A leading title gets past the 20-letter check | low | `acceptable` read `list[0]`. Direct correction. Patch. |
| B7 | More than 4 words → null drops "José María de la Cruz" | medium | The frozen rule says more than 4 words → null; changing it needs Robin. Raised with Robin; **fixed after Robin's decision (2026-10-16)**. |
| B8 | Case fix is whole-name only ("ROBIN molinas" stays) | low | As the frozen rule specifies; per-word fixing would break lower-case particles ("Anna van der Berg"). Rejected. |
| B9 | "Robin Robin Robin" is inked | low | Unlikely, and the fix adds a rule. Rejected. |
| B10 | `lastRememberedPour` returns raw stored names | low | Only tests call it today. Deferred to the landing-return-line owner. |
| B11 | No tests on the screen changes | medium | Same root cause as V1. |
| E1 | Spaced or dotted letters ("F U C K") | medium | Same root cause as B2. Patch. |
| E2 | Math-alphanumeric or homoglyph letters | medium | Same root cause as B2. Patch. |
| E3 | Run-together insults ("fuckyou", "gotohell") | high | Same root cause as B1. Patch. |
| E4 | Zalgo stacked marks inked | low | Only orphan marks were stripped. Direct cap. Patch. |
| E5 | Fullwidth "Ｒｏｂｉｎ" nulled as mash | medium | A real CJK-IME guest loses the name. NFKC fixes it. Patch. |
| E6 | Czech "Smrž" nulled as mash | low | Rare, and the fix would weaken the mash rule ("hjklm"). Rejected. |
| E7 | Short NON_NAMES words null real names ("Kim Ok-ja", "Anna Toi") | medium | Reproduced. Whole-name matching. Patch. |
| E8 | Partial shouting ("ROBIN McDONALD") | low | Same as B8. Rejected. |
| E9 | "A B" inked on the tag with no sentence name | low | Direct rule in `acceptable`. Patch. |
| E10 | Dropped-name pours merge in `kept` | low | Same pairing and seed means the same reading, so the merge does no harm. Rejected. |
| E11 | Claim: an insult in a `#pour=` link is still shown | high | Same root cause as B1/B2. Patch. |
| E12 | Claim: the header says insults are always null | high | Same root cause as B1/B2. Patch. |
| V1 | TheReading's cleaned name is checked by no test | medium | The gift e2e uses 'Celeste', which cleans to itself. Patch (new e2e test). |
| V2 | The breath echo's `addressName` is untested | low | The function is private; testing it means extracting it. Deferred. |

## Verification

**Commands:**
- `npm run build` (from the app) -- passes, including `shared/name.test.ts`.
- `npm run lint` -- no new errors beyond the 39 baseline.
- `npm run e2e` -- 7/7 pass.

**Manual checks:**
- Walk through on desktop and phone (dev server on port 5180) with "ROBIN 🍸" and with "asdf". Expect "Before you go, Robin." in the first case and the plain line in the second.
