---
title: 'Review — ARCHITECTURE-SPINE.md (adversarial + rubric)'
target: ../ARCHITECTURE-SPINE.md (status draft, updated 2026-09-23)
reviewed: 2026-09-23
lenses: [A — adversary (two conforming units that still clash), B — rubric]
evidence: spine, .memlog.md, spec/SPEC.md (+ companions), design-artifacts/2026-07-08-experience-master-spec.md, dionysus-experience/src @ 2026-09-23
---

> **Architecture review history — reviewed 8 October 2026.** The architecture spine contains the adopted resolutions. This preserves the findings at their date; it is not a fresh external technology/licence verification. Current direction: [experience specification](../../design-artifacts/2026-07-08-experience-master-spec.md).

# Review: Dionysus architecture spine

## Verdict

The spine gets the big seams right. It has a pure shared core, a server that is the only writer, a trace that stays client-side, and deterministic selection. But it is **not yet build-safe**. The pour read path is missing from the spine, the live-copy wire shape is missing, and the reveal-request ownership is missing, even though `.memlog.md` decided the first two. As written, the SPA and API units can each obey every AD and still ship a `/pour/:id` that 404s, a reading that renders as one blob, and a local fallback that is not "identical". There is also one internal contradiction (AD-7 vs AD-13 on client text in our HTML), one AD-vs-convention contradiction (AD-4 vs the content gate), and one hard ops cliff (OpenRouter free quota, hidden by the silent fallback).

## Findings by severity

| # | Sev | Finding | Where | Fix (short) |
|---|---|---|---|---|
| 1 | **Critical** | No pour read endpoint and no SPA route rule. `/pour/:id` data handoff (inline vs fetch) and dead-id signalling are undefined. Brownfield `App.tsx:48` sends every `/pour/:id` to the 404. | AD-13 (spine:143-147), map row "Routing" (spine:250); memlog decided `GET /api/pours/:id` but it never reached the spine | New **AD-14** (text in A1) |
| 2 | **High** | Live-copy shape is unspecified: is `reading` a string or 2 paragraphs? `assembleReading` has no `answers` parameter, so the local fallback cannot build the "identical" template copy. | AD-5 (spine:76-80), AD-6 (82-90), AD-9 (114) | `LiveCopy = {epigraph: string, reading: [string,string]}` plus one `revealCore()` shared by both shells (A2) |
| 3 | **High** | Reveal request has no single owner. The H8 ENGINE SEAM (`TheDepths.tsx:1677`) contradicts the AD-9 commit at `onPrepare`. The client falls back only on "429 or network error", so a 400/5xx or version skew is unspecified. Pours are written at H6 seal, so abandoned journeys store names forever and `createdAt` stops meaning "completed reveal". | AD-9 (107-115), AD-7, Deferred analytics (257) | Tightened AD-9 (A3) |
| 4 | **High** | `name` and `seed` have no bounds, and `name` is injected into server HTML (og meta) and the OG image. That contradicts AD-7's own "Prevents: clients injecting text into pages on our domain". House pours use `name: ''` while the journey requires a non-empty name. | AD-1, AD-7 (95), AD-13 (147) | `Name`/`SeedKey` schemas plus an escape rule (A4) |
| 5 | **High** | AD-4 says the validator *always* requires ≥12 veto-free cocktails. The Content-gate convention says only under `STRICT_STORE=1`. Today there are **0** authored cocktails, and empty or <3 shortlist behaviour is undefined in both shells. | AD-3 (64-66), AD-4 (74), convention (164) | Define the pool-floor rule and the empty-pool fallback (A5) |
| 6 | **High (ops)** | OpenRouter `:free` is capped at 50 req/day (1000 after a one-time $10) and 20 rpm, **per account, shared across the whole ladder**. The silent fallback plus logging only `{pairing,source,ms,model}` means the product quietly becomes template-only and nobody sees it. The optional Haiku rung has no spend cap. | AD-12 (137-141), Logging/Degradation conventions | Decide the $10 top-up, set a key credit limit, and add a daily `source` ratio check (B6) |
| 7 | Medium | `pipeline-stages.md` and `personality-model.md` are still "canonical companions". They still send the trace to the Bartender (`pipeline-stages.md:18,64`), still ban exclusions (`:39`), and still point at the archived docx (`:40`). Only SPEC.md got the superseded banner, and SPEC's frontmatter still lists the archived `output-contract.md`. | SPEC.md:1-6, companions | Banner or archive both companions; drop the dead companion link (B8) |
| 8 | Medium | The OG function's 500 KB cap gets blown if it imports the core barrel. `archetypes.ts` alone is about 1.2k lines of prose, plus 132 cocktails, plus a TTF. OG composition source (portrait `tag` vs `wide`/`wideTag`) is left to "design". | AD-13, Structural seed (193-196) | Import rule plus a fixed composition source (A7) |
| 9 | Medium | Type-check and import boundaries can't be enforced as specified. `tsconfig.app.json` includes only `src` with `lib: DOM`, so `api/` and `server/` are never type-checked and DOM or clock use in `shared/` compiles clean. | Paradigm (30, 41), Tests convention (163) | Three tsconfigs plus a lint boundary rule (B2) |
| 10 | Medium | House pours render the gift view ("That reading stayed with her"), so the side door and velvet rope, whose purpose is "the payoff craft in ninety seconds" (master §5), show no reading at all. This is a product fork. | AD-7 (98), AD-8 | House pours may carry authored copy and render the owner view (A8) |
| 11 | Low-Med | Audio "loaded after the first gesture" can't deliver master §6's "CTA click *is* the first sound". The audio preference store and the gift-page sound aren't defined. | Audio convention (165) | Prefetch on idle, unlock and play on gesture (B7) |
| 12 | Low | Pours are pointers, not snapshots. Editing a recipe changes every old link, and renaming or removing a pairing kills links. Nothing says `PairingKey` is permanent. | AD-7, AD-11 | One sentence in AD-11 (A9) |

---

## Lens A — Adversary

In each case below, both units obey every AD to the letter and still clash.

### A1. SPA "pour page" story vs API "share + OG" story: the pour read path (**Critical**)

- **Unit S (API):** implements AD-13. The share function already loads the `PourRecord` to fill `og:*`, so it inlines it as `<script type="application/json" id="pour">` and returns 200 with the unmodified `index.html` for a dead id (AD-13 only says dead ids "return the poetic 404", not how).
- **Unit P (SPA):** implements the "src location parser" (map row, spine:250) and fetches `GET /api/pours/:id`, as `.memlog.md` decided. That endpoint is not in any AD, so Unit S never builds it.
- **Result:** the SPA hits a missing endpoint. Via the existing `vercel.json` catch-all `/(.*) → /index.html` it may even get HTML back, which throws in `JSON.parse`. Meanwhile `App.tsx:48` `isUnknownRoute` already routes every path except `/` to `notfound`. The two units also disagree on the dead-id signal (HTTP status vs inline `null`), and on whether house pours resolve client-side (they are core constants, AD-8) or only through the API.
- **Tightened AD (new AD-14, "One pour read path"):**
  > `server/pours.getPour(id)` is the only lookup (house constants first, then `<VERCEL_ENV>:pour:<id>`). It backs exactly two routes: `GET /api/pours/:id → 200 PourRecord | 404 {error:{code:'pour_not_found'}}`, and `GET /api/share/:id`, which returns `index.html` with injected meta and **HTTP 404 without meta** for a dead id. The share HTML never inlines pour data. The SPA location parser has exactly four outcomes: `landing` (`/`), `pour(id)` (`/pour/:id` with `id` matching `^[0-9a-z]{10}$|^house-[a-z-]+$`), `fragment` (`/#pour=`), `notfound` (anything else). A malformed id is `notfound` without a fetch. `pour(id)` fetches `/api/pours/:id`, and any non-200 renders the poetic 404. `vercel.json` rewrite order: `/pour/:id → /api/share/:id`, then `/((?!api/).*) → /index.html`. The existing `/(.*)` catch-all is replaced.

### A2. Server "Bartender" story vs SPA "reading + local fallback" story: the live-copy shape (**High**)

- **Unit B (server):** AD-6 says `reading` is "exactly 2 paragraphs". It returns `reading: "para1\n\npara2"` and validates with a word count.
- **Unit R (SPA):** `TheReading.tsx:72,389` renders paragraphs from an array (`whyYou.slice(1).map`). It types `reading: string[]` (the memlog says `reading[]`).
- Both conform. The reading then renders as one paragraph with literal newlines, or gets split char-by-char by a `.map` on a string.
- **Second clash, same pair:** AD-9 requires the client to build "the identical deterministic reading locally". AD-6 says template copy is generated "from the trace-free answers plus the pairing identity". But AD-5's only entry point is `assembleReading(pairing, live | null, name, seed)`, and it has no answers. So Unit R calls `assembleReading(pairing, null, …)` and gets either an empty reading or a pairing-only template. Unit B's server-side template path used the answers. The results are not identical.
- **Tightened AD-5/AD-6:**
  > `LiveCopy = { epigraph: string; reading: [string, string] }` (plain text, no markdown or newlines inside a paragraph; word counts by `/\S+/`). The core exports `templateCopy(req: RevealRequest, pairing) → LiveCopy` and `revealCore(req, bartender: {pick, copy} | null) → { pairing, copy: LiveCopy, source }`, which runs selection, validates the pick against the shortlist, and substitutes `templateCopy` on any failure. The server calls `revealCore` with the Bartender result. The SPA's local fallback calls `revealCore(req, null)`. `assembleReading(pairing, copy: LiveCopy | null, name, seed)`: `null` means the gift view (reading hidden). It never synthesises copy.

### A3. `TheDepths` story vs `App` reveal-orchestration story: who fires, who waits (**High**)

- **Unit D (TheDepths):** AD-9 "binds `TheDepths` → `App`". Unit D adds `onVetoesSealed` in `sealWard` (`TheDepths.tsx:1485`). It also implements the documented **ENGINE SEAM** (`TheDepths.tsx:1677-1680`: "hold in 'echoes' … until it resolves") by awaiting a `revealPromise` prop before the condense.
- **Unit A (App):** implements AD-9 literally. It sends the request itself in a `useEffect` on `answers.vetoes`, and resolves the reveal at `onPrepare`, which fires from `beginSurface` (`TheDepths.tsx:803`), i.e. *after* the breath ends.
- **Result:** the breath waits for a promise that App only settles after the breath. Double requests are also possible (Unit D's callback and Unit A's effect both fire).
- **Further gaps under the same AD:**
  - The fallback triggers are listed only as "429 or a network error". A 400 from a strict schema after a deploy (an old SPA tab against a new API: version skew), or a 5xx, is unspecified, and a literal implementation throws.
  - A response arriving between `onPrepare` and `onComplete` (1.6 s) may or may not be used. The image pre-decode already ran for the local pairing.
  - The pour is written at H6 seal, so a guest who abandons at H7/H8 leaves a named `PourRecord` forever. The Deferred analytics line (spine:257) then counts H6 seals, not reveals.
- **Tightened AD-9:**
  > `App` alone owns the reveal: it builds `RevealRequest` via `RevealRequest.parse(pick(answers))` (client-side strict parse, so the trace can't even be sent), fires once per journey on `TheDepths`' `onVetoesSealed`, and tags the request with a journey token. `TheDepths` never awaits it: the ENGINE SEAM is retired and the breath plays one cycle. The **commit point is `onPrepare`**. Whatever has settled by then is used. A response settling later is discarded. Any non-2xx, invalid body, abort (client `AbortController` at 9 s) or network error means `revealCore(req, null)` with `pourId: null`. Accepted consequence: a pour may exist that its owner never saw or shared. Pour count is therefore "H6 completions", not "reveals", and analytics must say so. *(If Robin wants no stored names for abandoners, the alternative is to move the request to H7 seal.)*

### A4. API reveal-schema story vs OG/share story: `name` and `seed` (**High**)

- **Unit V (schema):** AD-1 lists `name` and `seed {hex,name}` with no bounds or optionality. Unit V writes `name: z.string()` and `seed: {hex: z.string(), name: z.string()}`.
- **Unit O (share):** AD-13 says to "inject `og:*` meta". Unit O templates `<meta property="og:title" content="A cocktail made for ${name}">`.
- Both conform, and a 5 KB name containing `"><script>` becomes stored XSS on our domain. That is exactly the harm AD-7 claims to prevent (spine:95).
- The fragment path (AD-10) carries a client-chosen `seed.hex` into `style={{'--c': seed}}` (`TheReading.tsx:265`) and a client-chosen `pairing` into image lookups.
- House pours need `name: ''` (nameless, as `VelvetRope.tsx:26` does today), but a `PourRecord` schema shared with `Answers.name` (`TheDepths.tsx:938` requires non-empty) rejects them.
- **Tightened AD-1/AD-7/AD-13:**
  > `Name = z.string().trim().max(40)` with no control characters (matches `maxLength={40}`, `TheDepths.tsx:2103`). `min(1)` applies in `RevealRequest`; `PourRecord.name` allows `''`. `seed` is a `SeedKey` enum (the 8 `SEEDS`). Hex and display name are looked up in the core, never transported. Every `RevealRequest` field other than `name` is a `z.enum` or array of enums from `shared/answers.ts`, so `name` is the only free text on the wire. Fragment payloads are parsed with the same `PourRecord`-minus-id schema, and an unknown `pairing` means the fragment is treated as broken. Server-rendered HTML escapes every interpolated value, and `og:image` is an absolute URL built from the request host.

### A5. Selection story vs content-gate/build story: the empty pool (**High**)

- **Unit Sel:** AD-4 says the "store validator requires at least 12 cocktails that contain none of the five". Unit Sel therefore assumes `shortlist.length === 3` always and indexes `shortlist[0..2]` in the Bartender prompt.
- **Unit Gate:** the Content-gate convention (spine:164) enforces that floor *only* with `STRICT_STORE=1`, and excludes unauthored pairings otherwise.
- Today `cocktails.ts`/`mixology.ts` is procedural and **no authored cocktail exists**, so every pre-launch build has an empty pool. Selection returns `[]`, `shortlist[0]` is `undefined`, the server throws, and the client fallback (which uses the same core) throws too. The "user never sees an error" guarantee fails in both shells at once.
- **Tightened AD-3/AD-4:**
  > The validator *always* requires ≥3 authored, veto-free cocktails (`STRICT_STORE=1` raises that to all 132 and ≥12). If the filtered pool is smaller than 3, the shortlist is the pool, padded from the veto-free pool by score. If it is still empty, the result is the house Trickster pairing with `source: 'template'`. The Bartender prompt accepts 1–3 candidates.

### A6. Bartender story vs ops story: the ladder budget (**Medium**)

- AD-12 says "the ladder stops when the 7s budget runs out", but gives no per-rung timeout. Unit L1 gives rung 1 the full 7 s, so the paid Haiku rung is never reached when free models are slow (typical `:free` latency is 3-15 s). Unit L2 splits evenly (2.3 s each), so the free models almost always time out and Haiku pays for most reveals.
- **Tightened AD-12:**
  > Each rung gets `min(remaining, 4s)`. The paid rung is only tried if ≥2.5 s remain. A 429 from OpenRouter skips all remaining `:free` rungs (they share one account quota). Each log line carries `rungsTried` and `failReason`.

### A7. OG-image story vs data-layout story: bundle cap and composition source (**Medium**)

- `api/og` may import `api → shared` (spine:41). A developer importing `shared/data` (the natural barrel) pulls all archetype prose, all 132 cocktails, and `symbolism`, plus the ink font, which is enough to breach the 500 KB `@vercel/og` cap that AD-13 itself cites.
- Separately, the OG story composites onto `wide` using `wideTag` (landscape matches 1200×630). The share-page story assumes the portrait `tag`, as in print (`TheReading.tsx:319`). Both are "persona geometry". `TheReading.tsx:78` also silently drops the name when `wide` exists without `wideTag`.
- **Tightened AD-13/AD-11:**
  > `api/og` imports only `shared/data/personas.ts`, `shared/pour.ts` (house pours) and `server/pours.ts`, never a barrel. A size check fails the build above 450 KB. OG composites the **portrait `src` + `tag`**, contained on the dark ground at 1200×630. The validator requires `wide ⇔ wideTag`.

### A8. Side-door/velvet-rope story vs pour-page story: house pours (**Medium, product fork**)

- AD-7 says "pour links always render the gift view". AD-8 makes house pours ordinary `PourRecord`s with no copy.
- The side door (master §5) exists to show "the payoff craft in ninety seconds". Rendered as a gift, it shows "Dionysus read her before pouring this. That reading stayed with her" for a nameless soul (`TheReading.tsx:379-381`). Unit H could reasonably add a `reading` to house records, which contradicts AD-7's `PourRecord v1` shape.
- **Tightened AD-8** (needs Robin's product call):
  > House pours are `HousePour = PourRecord & { copy: LiveCopy }`, authored in the core, and render the owner view (reading shown) with the gift CTA. Guest pours never carry copy. The velvet rope and side door link `/pour/house-trickster`, replacing the `#pour=` + `CONNOISSEUR_SAMPLE` link at `VelvetRope.tsx:26`.

### A9. Authoring story vs sharing story: pointer vs snapshot (**Low**)

- A pour stores only `pairing`, so Robin editing a recipe after QA silently changes every link already shared. A friend sees a different drink than the owner printed. Renaming a key kills links, and the reader has no `v` for content.
- **Add to AD-11:**
  > `PairingKey` values are permanent once any pour references them. Pour pages show the *current* authored cocktail. This is intended: pours are pointers, not snapshots.

### A10. Rate-limit story vs environments story (**Low**)

- The storage keys are env-prefixed (spine:162), but the rate-limit keys are not. Preview QA traffic then consumes production budget on the shared Upstash DB. Under venue NAT (a group at one bar), 10/min per IP pushes guests to local fallback: `pourId: null`, fragment links only. That is acceptable, but it should be stated.
- **Fix:**
  > Rate-limit prefix `<VERCEL_ENV>:rl:`. State that NAT groups degrade to fragment sharing by design.

---

## Lens B — Rubric

### B1. Does it fix the real divergence points and miss none?

**Fixed well:**
- Answer-shape drift (AD-1), which was the 2026-09-18 blocker: `craftCocktail` scores fields the journey never writes (`mixology.ts:303-337` reads `drinkScales`/`allergies`, while `TheDepths` never reaches lens, gravity or texture for scoring).
- Three keyings of one personality (AD-11 `pairingKey` matches `personas.ts:68-71`).
- Client and server picking differently (AD-3).
- Trace leakage (AD-2).
- Client-written pour content (AD-7).

**Missed:**
- The pour read path and SPA routing (A1).
- The live-copy wire shape (A2).
- Reveal-request ownership and commit point (A3).
- Input bounds (A4).
- The empty pool (A5).
- Per-rung budget (A6).
- OG import surface (A7).

Several of these were *decided* in `.memlog.md` (`GET /api/pours/:id`, `reading[]`, the Hono catch-all mount) but never promoted into the spine. The spine is the build substrate and the memlog is not, so those decisions are effectively lost.

### B2. Is each AD rule enforceable, and does it prevent its stated divergence?

| AD | Enforceable? | Prevents its divergence? | Gap |
|---|---|---|---|
| AD-1 | Yes (TS type + zod) | Partly | No optionality/bounds/enums. "Exactly the fields the live journey writes" is not true of today's journey (see B4). It is a target contract. |
| AD-2 | Server side yes (strict schema) | Mostly | Enforced only *after* the trace is already transmitted. Add a client-side strict parse (A3). |
| AD-3 | Yes (vitest determinism) | Yes, if the pool is non-empty | A5 |
| AD-4 | Yes (validator) | Contradicted by the content-gate convention | A5 |
| AD-5 | Yes (single export) | No: the signature can't produce template copy | A2 |
| AD-6 | Yes (zod) | Shape unspecified | A2 |
| AD-7 | Yes | Self-contradicted by AD-13 name injection | A4 |
| AD-8 | Yes | Yes | House-pour reading (A8) |
| AD-9 | Hard to test (timing), and has no owner | No | A3 |
| AD-10 | Yes | Mostly | The existing `'g'/'p'` version char (`pourLink.ts:7-9`) isn't mentioned. State "v2 prefix `'2'`; any other prefix is a broken link → landing" so old full-result links fail cleanly rather than half-decode. |
| AD-11 | Yes | Yes | A7 (`wide⇔wideTag`), A9 |
| AD-12 | Yes | Budget semantics ambiguous | A6 |
| AD-13 | Yes | Data handoff and dead-id status undefined | A1, A4, A7 |
| Import rules (spine:41) and "no DOM/Node/clock/RNG" (spine:30) | **No mechanism named** | — | `tsconfig.app.json` has `include: ["src"]` and `lib: ["ES2023","DOM"]`, so `shared/` compiles with DOM available and `api/`/`server/` are never type-checked (`build` = `tsc -b` over app+node only). **Fix:** `tsconfig.shared.json` (lib ES2023, `types: []`: no DOM, no Node), `tsconfig.api.json` (Node types, includes `api`, `server`, `shared`), both added to root `references`. Add ESLint `no-restricted-imports` per folder and `no-restricted-globals`/`no-restricted-properties` for `Date`, `Math.random`, `fetch`, `window` in `shared/`. Also note `allowImportingTsExtensions` + Vercel's function bundler: settle the import-extension convention for `shared/` now. |

### B3. Could anything under Deferred let units diverge?

- **"Exact function file names and rewrite wiring"** (spine:261): yes. Rewrite order against the existing catch-all `vercel.json` and the Hono mount style (memlog: catch-all `api/[[...route]].ts` via `hono/vercel`, *not* zero-config Hono) are integration contracts, not craft. Promote both (A1).
- **"OG card visual design"** (spine:259): the composition *source* (portrait vs wide) is data, not design. Fix it now (A7). Fonts affect the bundle cap, so reserve ≤150 KB.
- **"Weight tables and formula"** (spine:255): safe, since there is one owner in the core. But "fixtures re-collected on the new journey" has no format. Suggest `shared/selection/fixtures/*.json` typed as `RevealRequest`, so fixtures double as the A3 contract test.
- **"Per-hold analytics"** (spine:257): safe, but the stated v1 metric is mislabelled (A3). SPEC's success signal (share and download rate, SPEC.md:79) has *no* measurement in v1. Add two Vercel Web Analytics custom events, `share` and `print`. Adding them later would be a cross-unit change.
- **"Pour deletion by hand"** (spine:258): safe, but see privacy (B6).
- Sound design, zero-proof and non-English: safe as deferred.

### B4. Does it ratify the brownfield code rather than contradict it?

It mostly ratifies *intent*, but several ADs require edits the spine never lists. Stories will under-scope unless there is a migration list:

| Spine says | Code today | Change required |
|---|---|---|
| AD-1 `seed {hex,name}` | `onUpdate({color, colorName, colorTouched})` `TheDepths.tsx:957`; `App.tsx:59-61` | Write `seed` (prefer `SeedKey`, A4) |
| AD-1 `vessel` (one of 4 keys) | writes `drinkScales: v.scales` `TheDepths.tsx:1474`; key kept in local state `finVesselKey` | Write `vessel: key` |
| AD-1/AD-4 `vetoes: Veto[]` | `allergies: finBanished.join(', ')` `TheDepths.tsx:1487`; labels incl. `'Alcohol'` `TheDepths.tsx:215` | Enum, drop Alcohol, labels from core |
| AD-1 `trace` | `insight` `TheDepths.tsx:1514`, `types.ts:29` | Rename; echo `TheDepths.tsx:462` keeps the allusion-only rule |
| H8 echoes | read `colorName`, `allergies` (`TheDepths.tsx:445,459`) | Read from v2 fields |
| AD-5 `Reading` | `TheReading` takes `CocktailResult` (`TheReading.tsx:44-72`); share strips fields (`:217-228`) | Prop becomes `Reading`; share uses AD-10 |
| AD-10 | `pourLink.ts` carries the full `CocktailResult` | Rewrite to `{pairing,name,seed}` |
| AD-13 / routing | `App.tsx:48` 404s everything except `/` | New parser (A1) |
| AD-8 | `VelvetRope.tsx:26` fragment + `CONNOISSEUR_SAMPLE`; no side door on the landing | `/pour/house-*` |
| AD-11 retire mixology | `App.tsx:245,259` call `craftCocktail`; DEV override to `CONNOISSEUR_SAMPLE` `App.tsx:263-266` | Replace with `revealCore`; keep the DEV sample only as a `Reading` fixture |
| AD-9 | ENGINE SEAM comment `TheDepths.tsx:1677` | Retire (A3) |

- **Verified consistent:** `pairingKey` = `personaKey` (`personas.ts:68-71`); 9 binaries (`TheDepths.tsx:386-396`); 5 gravities (`:428-434`); ≤3 drawn/sought (`:157-168`); ≤3 of 9 flavours; 4 vessels (`:208-213`); 132 unique pairings in `archetypes.ts`, with no self-pairs; `ArchetypePairing` owns name/essence/story/goal/fear exactly as the AD-11 table says. `TheReading` renders only cocktailName, archetype name + essence, tagline, ingredients, procedure, epigraph and paragraphs, matching the simplified contract.
- **Recommendation:** add a short "Brownfield delta" section to the spine and correct AD-1's wording to "the fields the journey *will* write (v2)".

### B5. SPEC capability coverage

| CAP | Covered | Note |
|---|---|---|
| CAP-1 | AD-1, AD-2 | SPEC's "craft-level" and "every field populated or explicitly null" are superseded implicitly. Say so in the SPEC banner. |
| CAP-2 | AD-3, AD-4, AD-12 | SPEC wants a "rationale citing specific answers" from selection. Now it is the reading. Fine. |
| CAP-3 / CAP-4 | Map row only; `binds:` omits them (spine:11) | Tier-A authoring has no AD for the store *format* beyond the AD-11 table: file-per-pairing vs one module, and who runs the validator. Acceptable for offline authoring, but add `binds: CAP-4` via AD-4/AD-11. |
| CAP-5 | AD-6, AD-9, AD-12 | Shape gap (A2) |
| CAP-6 | Paradigm, AD-11 | OK |
| CAP-7 | AD-5, AD-7 | "One payload" is now `RevealResponse` + `assembleReading`. OK once A2 lands. |

### B6. Dimension coverage

| Dimension | Status | Comment |
|---|---|---|
| Deployment / hosting | Decided | Vercel project root must be `Cocktail_Website_Agent/dionysus-experience` (the git root is `Dionysus/`). State it, since `api/` must sit under the root dir. |
| Environments | Decided | Prod + preview + `vercel dev`. **Gap:** Vercel Deployment Protection on previews makes the share function's self-fetch of `/index.html` 401, and crawlers can't unfurl previews. Either bundle `index.html` into the function at build time (`includeFiles`) instead of self-fetching, or document the protection bypass. Self-fetch also adds latency on every share hit. |
| Ops / monitoring | **Under-decided** | One log line per *successful* reveal. Nothing counts 400s, 429s, OpenRouter quota hits or the `source='template'` share. With the free tier at 50/day (memlog verified), the silent fallback hides a total LLM outage. **Decide:** the $10 top-up (1000/day), log `failReason` on every path including 4xx, and a weekly check (or Vercel log drain query) on the template ratio. |
| Cost | Partly | Rate limit is per IP only; no global cap. Set an OpenRouter key credit limit before enabling the Haiku rung. |
| Security | Partly | Covered: secrets and client-written content. Missing: output escaping (A4), input bounds (A4), prompt-injection surface (name only after A4; wrap it as data in the prompt, or omit it, since the live copy "need not name" the persona), and the fragment `pairing` whitelist. |
| Privacy | **Open (not listed)** | Names are stored forever with no notice. Answers (a psychological self-portrait) plus the name go to `:free` providers. Several OpenRouter free endpoints require the account's "allow providers to log/train" setting. Recommendation: do **not** send `name` to the LLM. Add one in-world privacy line near the Share button or footer. Record the OpenRouter data-policy setting as a decision. IPs in rate-limit keys expire with the window: state it. Manual deletion is fine for v1. |
| Testing | Partly | Core-only vitest misses the highest-risk seam: the SPA↔API contract, which the silent fallback hides. Add a vitest that parses fixture `RevealRequest`s built by the same `pick(answers)` helper the SPA uses. Playwright is already a devDependency, so add one smoke test: `/pour/house-trickster` renders and a dead id 404s. |
| Versioning / skew | Partly | Record `v` is covered. SPA↔API deploy skew is not. Enable Vercel Skew Protection, or accept that a 400 means fallback (A3), and log it. |
| Accessibility / reduced motion | N/A (FE-owned) | Audio convention should restate "Still Water keeps the bed, drops transients" (master §4/§6). |

### B7. Master spec §9 items

| §9 item | Answered? | Where / gap |
|---|---|---|
| 1. Pour storage (store, id, retention) | **Yes** | Upstash via Marketplace, nanoid(10) `[0-9a-z]`, no TTL, env prefix (AD-7, AD-8, conventions). 36^10 ≈ 3.7e15 (~52 bits) is ample against guessing. |
| 2. Endpoints incl. OG | **Partly** | `POST /api/reveal` yes (response is missing `pageUrl`/`id` shape details); OG yes (AD-13); **`GET` pour data missing** (A1). |
| 3. Routing | **Partly** | Server side yes. SPA parser states not specified, and brownfield 404s `/pour/:id` (A1). |
| 4. Exemplar seeding | **Yes** | House `PourRecord` constants (AD-8). Product gap: they render without a reading (A8). Name the set: `house-trickster` (side door, master §5) and the velvet-rope pour (today it's the Connoisseur; pick one). |
| 5. Analytics | **Yes (deferred funnel)** | But the v1 metric is mislabelled and share/print aren't measured (B3). |
| 6. Audio seam | **Mostly** | A single director, `public/audio`, never gates. The contradiction with §6's "CTA click is the first sound" needs: prefetch the first cue and bed on landing idle (no `AudioContext`), create or resume the context and play on the CTA gesture. Missing: format (Opus/WebM with AAC fallback), preference persistence (`localStorage`, per-viewer), and gift-page behaviour (silent until a gesture). |

### B8. Are the supersessions internally consistent?

- **Reading not persisted:** consistent across AD-5, AD-7, AD-10 and `TheReading`'s gift view (`TheReading.tsx:374-383`). The side effect on house pours needs a call (A8). The master spec §2 "owner permalink" now opens as a gift for the owner too. That's fine without auth, but say it in AD-7 so nobody builds an "is this my pour?" heuristic (for example, `localStorage` of minted ids), which would be a second rendering path.
- **Vetoes accommodated:** internally consistent (AD-1/AD-3/AD-4). Note the design consequence: a guest who vetoes all five is limited to the ≥12 veto-free personalities, so vetoes bias the *personality*, not just the drink. That's accepted by "Vetoes steer the match", but the SPEC CAP-2 success wording ("the personality they identify with") should acknowledge it.
- **'Alcohol' removed:** consistent. `mixology.ts:331` zero-proof retires with mixology, and the H7 frequency-question comment (`TheDepths.tsx:234-237`) that relied on the Alcohol veto becomes stale.
- **Output contract simplified:** consistent with `TheReading`. `symbolism` is "Bartender input only, never rendered", but AD-9's local fallback means the full store, symbolism included, ships in the SPA bundle. That's harmless, but the "never rendered" rule should also say "may be public".
- **Supersession hygiene:** SPEC.md has a banner, but its frontmatter still lists the archived `output-contract.md` as a companion. `pipeline-stages.md` (trace → Bartender `:18,:64`; exclusions removed `:39`; docx canonical `:40`) and `personality-model.md` (`:35` trace carries into the drink) are unbannered "canonical" companions contradicting AD-2 and AD-4. A story writer following SPEC's "Canonical contract" box will implement the old rules. Banner or archive both.

---

## Patch list (apply to the spine)

1. Add **AD-14** "One pour read path" (A1) and promote the memlog's Hono catch-all mount and rewrite order out of Deferred.
2. Rewrite **AD-5/AD-6**: `LiveCopy` tuple, `templateCopy`, `revealCore` shared by both shells (A2).
3. Rewrite **AD-9**: App owns the request, client strict parse, commit at `onPrepare`, any non-2xx or abort means local, ENGINE SEAM retired, pour-count semantics (A3).
4. Tighten **AD-1/AD-7/AD-13**: `Name`, `SeedKey`, enum-only fields, escaping, absolute `og:image` (A4).
5. Reconcile **AD-4** with the content gate and define the empty/short-pool rule (A5).
6. **AD-12**: per-rung timeout, a 429 skips the free rungs, `failReason` logging (A6). Ops: $10 top-up decision, credit cap, template-ratio check (B6).
7. **AD-13**: OG import whitelist, size check, portrait composition; validator `wide⇔wideTag` (A7).
8. **AD-8**: house pours carry authored copy and render the owner view (Robin's call) (A8).
9. Add three tsconfigs and lint boundary rules to the conventions (B2).
10. Add a "Brownfield delta" section (B4) and a Privacy row (B6). Fix the audio convention (B7). Banner or archive `pipeline-stages.md` and `personality-model.md`, and drop `output-contract.md` from SPEC's companions (B8).
