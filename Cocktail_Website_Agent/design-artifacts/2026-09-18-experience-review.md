# Dionysus — Experience Review and Revamp Brief (pre-backend)

**Date:** 2026-09-18 (rev 2, after a full end-to-end run in the browser)
**Author:** Claude (Fable 5.1), from Robin's dictated walkthrough + `Dionysus walkthrough.mov`
**Status:** Review only. Nothing in the app was changed. This is the brief for the model that implements the revamp.
**App:** `Dionysus/Cocktail_Website_Agent/dionysus-experience` (Vite + React 19). Files referenced below are relative to `src/`. Line numbers are as of 2026-09-18; re-grep before editing.

**How this was verified.** Every finding below was checked three ways: Robin's video (77 frames), the code (`components/TheDepths.tsx`, `components/TheReading.tsx`, `App.tsx`, `index.css`, `engine/mixology.ts`, `data/personas.ts`, `engine/pourLink.ts`), and a complete real run in the browser from the hero through H1–H9, the reading, "Send it on", the friend's gift page, a 375 px mobile pass of the reading, and a Playwright print-media render of the keepsake. Zero console errors during the run. Items marked **[seen]** were observed on screen; **[code]** were confirmed in source.

---

## 0. Verdict

The bones are excellent: the hero reveal, the descent, the seed drop, the gravity mote, the breath's continuous-line figure, the splash-to-dark, and the reading room are genuinely theatrical and must be protected. The problem is **coherence**, not design. Nine holds were built one at a time and each invented its own continue button, hint style, progress indicator and selection grammar, so a first-time visitor is re-taught the interface at every hold, and on the three brightest holds (H4, H6, H7) the teaching text is barely visible.

There are also **five concrete overlap/visibility bugs** found on the real run that were not in Robin's notes (§4, §6, §7, §10), and the print output has three bugs (§10).

**Do not touch (locked and loved, reconfirmed by Robin this walkthrough):** hero composition + cursor reveal + CTA animation; the threshold descent fade; H2's drop burst; H3's mote drag; H8 echoes → figure → "there you are."; H9 drop → splash → dark; the reading room composition. Change copy and timing around them, never the choreography.

---

## 1. Cross-cutting rules (do these first; they resolve half the per-hold notes)

### 1.1 One "continue" affordance
**[code]** Six labels in three visual forms for the same action:

| Hold | Label | Element / form | Where |
|---|---|---|---|
| H1 | `Deepen` | `.depth-continue` — uppercase tracked Veil pill | `TheDepths.tsx:2140-2142`, `index.css:165` |
| H5 (×2) | `let it resonate` | `.res-seal` — bare lowercase italic text | `TheDepths.tsx:2445-2455` |
| H6 flavours | `carry it forward` | `.res-seal` | `TheDepths.tsx:2494-2504` |
| H6 vetoes | `nothing to exclude` / `seal the glass` | `.res-seal` | `TheDepths.tsx:2552-2558` |
| H7 trace | `let it settle` / `leave nothing but tonight` | `.res-seal` inside a pill | `TheDepths.tsx:2681-2683` |

**Change:** one label, one component, one position for every confirm. Use the `.depth-continue` Veil pill (it is the design-system button, DESIGN.md §5) everywhere, positioned at `bottom: 14%` centre (where `.res-seal` already sits, `index.css:760`). Label: **"Continue"**. If Robin wants one word with flavour, **"Descend"** is honest on every hold (the camera literally moves down/up between holds) — but then it must be used on all of them. Exception: H7's trace may keep "let it settle" / "leave nothing but tonight" as the journey's bookend, in the same pill. Retire "Deepen", "carry it forward", "let it resonate", "seal the glass", "nothing to exclude".

### 1.2 One hint style, per the design system's own rule
DESIGN.md §3 Italic Voice Rule: *speaking = Playfair italic; labelling/instructing = Inter.* **[code]** Every instruction line is Playfair italic and tiny:

| Class | Size / alpha | Used by | Where |
|---|---|---|---|
| `.hidden-hint` | 13 px / 0.5 | H4 practice hint | `index.css:575` |
| `.res-sub` | 13 px / 0.6 | H5, H6 ×3, H7 ×2 sub-lines | `index.css:747` |
| `.grav-hint` | 13 px / 0.55 | H3 "drag the glow…" | `index.css:444` |
| `.fin-glass-label` | 12–14.5 px / 0.7 | H6 glass names | `index.css:853` |

**Change:** one `.depth-hint` class: Inter 400, 14–15 px, `letter-spacing: 0.04em`, candle-ivory at 0.8 alpha, the standard black underlay (`text-shadow: 0 1px 3px #000, 0 0 12px rgba(0,0,0,0.85)`), and on bright bands (§1.5) a pool of night behind it. Apply to all the elements above and drop `font-playfair italic` from those `<p>`s (`TheDepths.tsx:2327, 2353, 2417, 2473, 2511, 2532, 2575, 2662`). Questions stay Playfair italic.

### 1.3 One progress indicator
**[seen]** H3: 5 dots bottom-centre (`.grav-dots`, `index.css:457`, `bottom: 13%`). H4: 9 dots bottom-centre (`.hidden-dots`, `index.css:627`, `bottom: 11%`) that fade as used. H5, H6, H7: nothing. Robin likes the dots.
**Change:** one dot component, one position (`bottom: 11%` or `13%`, pick one), same 7 px ring, on every multi-step hold: H3 ×5, H4 ×9, H5 ×2, H6 ×3. Never chapter labels (locked).

### 1.4 One transition grammar
Robin: reuse the threshold fade for every fade. **[code]** The descent is `.hero-descend` + `.descent-veil` (`index.css:97-108`), driven by `descendIntoDepths()` in `App.tsx:213-224` (1.55 s). The return to the landing (`goHome`, `App.tsx:304-312`) is a hard cut; the reading arrives via its own `tr-blackout` (`index.css:1545`); H6's seal has `.fin-bloom`; H7's has `.trace-bloom`.
**Change:** write the rule into DESIGN.md: *phase changes are the descent veil; hold-to-hold moves are the camera (video playing at 1×); nothing else.* Route `goHome` and the gift's "Discover the cocktail within you" through the same veil; keep `TheReading`'s from-black arrival (it is dark-to-dark already). Leave the in-journey ascents alone.

### 1.5 One legibility rule on bright bands
**[seen]** The footage has three bright bands: H4 cream cloud (`HOLD_HIDDEN` 5.7 s), H6 foam (`HOLD_FINISH` 9.4 s), H7 dome (`HOLD_TRACE` 10.7 s). H7 already solves it with `.trace-pool` (`index.css:994`, a local radial pool of night); H4 and H6 have nothing behind their text except a 20 px soft shadow (`.hidden-q`, `index.css:482`).
**Change:** reuse `.trace-pool` (rename to `.depth-pool`) behind the question + hint block on H4 and H6 (mount it inside `hidden-stage` at `TheDepths.tsx:2346` and `fin-stage` at `:2467`). DESIGN.md's Darkness Rule explicitly asks for this.

### 1.6 One selection grammar
Seven ways to choose exist. Collapse to the three families already in DESIGN.md §5 "Glass Sphere":
- **Glass bubble** = choose one / up to three: H1 (`.lens-bubble`), H6 flavours (`.fin-bubble`) — **and H5 should adopt it** (§5).
- **Mote / ember** = a value or a timed catch: H3, H4.
- **Illustration / toggle** = H6 glass, H6 vetoes (Robin's "keep it plain" call).
H2's drops are bubbles with colour inside — same family. H7's rings go away with the frequency question (§7).

### 1.7 Honest framing
The hero says "Seven depths"; the user answers ~22 prompts across 7 holds (1 name + 1 lens + 1 colour + 5 gravity + 9 binaries + 2 resonance + flavours + glass + vetoes + frequency + trace). Say "a few minutes" and keep the mystery in the visuals (§2).

---

## 2. Landing — the Entrance (`App.tsx:336-377`)

**Verdict: keep the page.** Copy-only changes:

| Finding | Sev. | Change | Where |
|---|---|---|---|
| "Seven depths lie between you and your liquid avatar. Step into the dark and let the oracle pour." — nobody knows what a depth or a liquid avatar is | 🟡 | **"A few minutes of honest answers. One cocktail that could only be yours."** (or "Answer honestly for five minutes. Leave with a drink that is entirely you.") | `App.tsx:371` |
| "…a bespoke, masterfully animated cocktail recipe" — the result is a pre-authored image + recipe, not an animation | 🟢 | "…into a cocktail made for you alone, with its recipe and its reading." | `App.tsx:364` |
| Logo: right concept (the continuous-line coupe pays off in H8), thin drawing at nav size | 🟢 | Separate task. Keep the single-stroke figure-into-glass; redraw with heavier stroke and a clearer profile. Update both copies of the path: `App.tsx` nav `<svg>` and `SPIRIT_PATH` in `TheDepths.tsx:82` (the comment says keep in sync). | — |
| Nav wordmark is a button that calls `goHome` mid-journey, no confirmation — the only real trap in the flow | 🟢 | During `phase === 'depths'` either disable it or ask once in a Veil pill ("leave the depths?") and exit through the descent veil. | `App.tsx:322-326` |

---

## 3. H1 — The Threshold (`TheDepths.tsx:2120-2172`)

| Finding | Sev. | Change | Where |
|---|---|---|---|
| **[seen]** "Your name…" placeholder reads grey: ivory at **0.3 alpha** | 🟡 | 0.8 alpha of candle-ivory (warm, never `#fff` — DESIGN.md §6). Also raise `.trace-input::placeholder` from 0.55 to 0.8. | `index.css:156-159`, `:1155` |
| "Deepen" | 🟡 | §1.1 | `TheDepths.tsx:2141` |
| "Who should this cocktail capture?" | 🟡 | **"Who is this cocktail for?"** (Robin's older "Who are you building this cocktail for?" breaks fiction: Dionysus pours, she doesn't build.) | `TheDepths.tsx:2151` |
| Lenses "The night version of me" and "A fictional persona" don't land | 🟡 | `LENSES` → **The real me · The best version of me · A dream alter ego · My inner child · My future self · One of my many selves**. ("One of my many selves" is Robin's "multiple personalities" without the clinical note.) If "best version" and "future self" feel too close, swap "My future self" for **"Who I am when no one is watching"**. | `TheDepths.tsx:474-481` |
| Lens never reaches the engine | 🔴 backend | **[code]** `craftCocktail` (`mixology.ts:303-315`) scores `answerStyle`, `childhood`, `selfScales`, `moodScales`, `personality`… — all retired paper-quiz fields `TheDepths` never writes. `lens`, `gravity`, `texture`, `drawnToward`, `soughtFor` are never read; only `color`, `flavors`, `drinkScales`, `allergies`, `frequency`, `name`, `insight` reach the result. Decide the answer→Bartender contract before renaming questions. | `engine/mixology.ts:303-330` |

Keep: the two cold-open `LINES` (`:469-472`), keystroke bubbles, bubble drift, six bubbles in 2×3.

---

## 4. H2 — The Seed (`TheDepths.tsx:2175-2219`) and H3 — The Gravity (`:2221-2340`)

**H2 — keep the mechanic.** Two real findings:

1. **[seen] Several drops vanish against same-hue footage.** At `HOLD_SEED` (1.5 s) the frame is amber with a crimson ink cloud top-left and cream top-right. Campari, Aperol and Cassis sit on or beside the crimson cloud; Galliano sits on amber. The drops are only `clamp(44px, 7.5vmin, 60px)` (`index.css:283-285`, `--w` at `TheDepths.tsx:2204`) with a 38 % rim. **Change:** grow the drops ~25 % (`clamp(56px, 9vmin, 76px)`), strengthen the rim (`--c` 60 % + a 1 px ivory outer ring), and add a faint dark halo (`box-shadow: 0 0 0 6px rgba(0,0,0,0.18)`) so every colour reads on every part of the frame. Re-check `SEED_POS` (`:497-506`) so no drop lands on the cloud of its own hue.
2. **[code] Liqueur names only on hover** (`.seed-drop:hover .seed-label`, `index.css:323`) — touch users never see them. **Change:** also show `.seed-label` on the chosen drop during the burst (add it to `.seed-burst` state) for ~1.2 s.

Robin's colour question, verified against `SEEDS` (`:485-494`): all eight are real liqueurs. The *names* are what fail, not the pours:

| Now | Behind it | Proposed label (liqueur first; the colour is already visible) |
|---|---|---|
| Campari Red | Campari | **Campari** |
| Aperol Orange | Aperol | **Aperol** |
| Galliano Gold | Galliano | **Galliano** |
| Midori Green | Midori | **Midori** |
| Curaçao Blue | Blue Curaçao | **Blue Curaçao** |
| Violette Purple | Crème de Violette | **Crème de Violette** |
| Pamplemousse Pink | Giffard Pamplemousse Rose | **Pamplemousse Rosé** (or **Lillet Rosé** if Robin wants an explicit rosé pink) |
| Cassis Plum | Crème de Cassis | **Crème de Cassis** (alternatives if plum should read darker: Chambord, sloe gin) |

`colorName` feeds the breath echo "`{colorName} runs through it`" (`:451`) and the reading (`mixology.ts:423`), so the new labels must still read as a sentence ("Pamplemousse Rosé runs through it" — fine).

**H3 — keep.** Robin likes it and it is the reference for the dots. One change: `.grav-hint` → the shared hint style (§1.2). The mote drag is a slider, not drag-and-drop, so the "no drag" lock does not apply.

---

## 5. H4 — The Hidden Self (`TheDepths.tsx:2345-2408`; timing `:402-417`; paint `:1020-1062`)

Robin: loves choosing quickly; the start is confusing; can't see the text. Diagnosis from the real run:

1. **[seen] The riddle is readable, the instruction is not.** "Too quick to think. Trust the spirit within." (`.hidden-q`) sits on the cream cloud; the actual how — "catch either one before it cools — nine will ask something real" (`.hidden-hint`, 13 px / 0.5) — is not legible without leaning in.
2. **[seen] The practice pair is "This / That"**, so she can't tell whether she is being asked something.
3. **[seen] Rounds are 3.4 s** (`FROZEN_MS` 850 + `THAW_MS` 2550). On my run, the practice round and the first two real pairs (Sharp/Smooth, Relaxed/Excited) had expired before I had finished reading the instruction. The only clock cue is the ember shrinking and shifting to blue-grey (`.dimming`, driven by `paintDrops`, `:1041-1046`) — real but subtle.
4. **[seen] The nine bottom dots read as decoration** and one fades per round.
5. **[code] No pool of night** behind the text on the brightest band.

**Change (keep the mechanic):**
- **Replace the practice round with one plain instruction beat** in the hint style on a pool of night, held using the existing read-time gate (`PRACTICE_REVEAL_DELAY_MS`, `:414`): *"Nine quick pairs. Don't think — tap the one that's more you before it fades."* Then straight into `BINARIES[0]`. If Robin wants to keep a rehearsal, use a real, weightless pair (**Tea / Coffee**) instead of This/That (`:2371`, `:2381`). "Trust the spirit within" may stay as the first line of that beat (it is one of the three-beat motif lines), never as the only explanation.
- **Make the clock legible in the ember itself:** a thin ring that drains around each `.ember-core` over `THAW_MS` (a conic-gradient border keyed to the same `tp` value `paintDrops` already computes at `:1041`), plus a stronger hue shift toward dead coal.
- **Prompt:** on real rounds keep only "Which is more you?" (`:2360`), at the top of the `.hidden-q` clamp, on the pool.
- **Timing:** `THAW_MS` 2550 → ~3400 (round ≈ 4.25 s); keep the Still Water "never cools" twin (`:419-425`, `:1098`).
- **Progress:** replace `.hidden-dots` with the shared dot system (§1.3).

---

## 6. H5 — The Resonance (`TheDepths.tsx:2411-2464`; data `:134-174`; CSS `index.css:655-745`)

Robin: two important questions, "doesn't feel good enough". **[seen]** On a real run the words are legible (the video under-exposed them), but they are 14–17 px labels scattered without order across the darkest scene in the journey; the chosen state (`.res-lit`) is a small rim colour + fizz; "let it resonate" is a lone bare line at the bottom at 0.55 alpha until the third pick. Three revisions have fought the "star chart" read; the footage itself (black stalks, star glints) is the star chart.

**Change — give the two most important questions the clearest, already-established grammar:**
- Put each word **inside a glass bubble** (`.lens-bubble` / `.fin-bubble` material) so H1 / H5 / H6 are one affordance (§1.6). Keep the fizz on catch as the flourish.
- **Fewer, larger:** 9 words per round instead of 12/14 (trim `RES_QUESTIONS[].words`), Playfair italic ~1.3 rem inside the bubble, arranged as a loose ring or two rows (drop the hand-scattered `x/y`; keep the portrait `mx/my` idea as a preset).
- **Chosen = bubble rim + glow in `--c`, bubble grows 1.12**, unchosen dim at three (already `.res-dim`).
- **Count in the hint** ("2 of 3"), and the confirm in the Veil pill (§1.1).
- Keep both prompts and both word lists; "A reality check" and "A little chaos" are the best options in the journey.

---

## 7. H6 — The Finish (`TheDepths.tsx:2466-2565`; data `:202-228`) and H7 — The Trace (`:2568-2688`)

**H6 flavours — keep** (Robin likes the pop/un-pop). Two bugs found on the real run:
- **[seen] Bubbles float through the question and hint.** The rise loop recycles bubbles anywhere from `y = 8 %` to `102 %` (`:1626-1631`) while the question sits at `top: 13 %` and the hint just below it; on my run "Fruity" covered "What flavou[rs are calli]ng you?". **Change:** clamp the rise band below the text: recycle at `b.y < 26` instead of `< 8` (`:1631`) and spawn at `26 + Math.random() * 70` (`:1626`), or move the question/hint into a pool-of-night block at the top and exclude that block from the lane band.
- **[seen] Bubbles also drift under the dev nav** at the bottom (dev only, harmless).
- "carry it forward" → §1.1 (`:2503`). Add the pool (§1.5).

**H6 glass — "How should the drink sit in your hand?"** Robin unsure it is used. **[code]** It is the *only* question that shapes the physical drink: `FIN_VESSELS[].scales` (`:210-215`) → `drinkScales` → `mixology.ts:329-334` (long / carbonated / complex / night / modern → lengthener, complexity, glassware). **Keep it**, but:
- Ask it plainly: **"What kind of drink do you want in your hand?"** (`:2510`).
- **[seen]** The four glasses are hairline strokes on the foam band with 12–14 px labels; add the pool behind the shelf, thicken the stroke in `drawGlass` (`:330`), hint style for labels.
- **[code]** Label casing is inconsistent: "Light & Sparkling" vs "Short & strong" (`:214`) → "Light & sparkling".
- Backend: the Bartender must consume these five scales or the question becomes decorative.

**H6 vetoes — "What should never touch your glass?" — keep** (Robin). One bug:
- **[seen] The hero glass is drawn through the hint.** After choosing, the chosen glass lerps to `FIN_HERO = {x:50, y:33}` at scale 2.3 (`:221-222`) and its rim lands on "touch to exclude it" (`.res-sub` at `top: 13% + 40px`). **Change:** `FIN_HERO.y` → ~40 (or scale 2.0), or move the ward question + hint into the same top pool block as the other beats and keep the glass below it.
- Seal label → §1.1 (`:2557`). Note the "Alcohol" veto already yields zero-proof (`mixology.ts:328`).

**H7 — "How often does a cocktail find you?" — remove** (Robin's call, safe). **[code]** Its only engine effect is `frequency === 'Never'` → zero-proof (`mixology.ts:328`), already covered by the Alcohol veto; the only other uses are two optional echo lines (`TheDepths.tsx:461-462`). Delete `traceBeat === 'ring'` (`:2573-2656`), `TRACE_RINGS` (`:259`), `chooseRing`/`moveRingFocus` (`:1506-1528`), the ring CSS (`index.css` `.trace-dial`, `.trace-ring*`, `.trace-plumb`, `.trace-heart`, `.trace-ripple`), and the two echo lines; open H7 directly on the trace. Keep `frequency` in `Answers` (`types.ts`) as an unused field or drop it and the two `mixology` references together.

**H7 — "Leave one trace of yourself." — keep.** Hint → shared style at 15 px / 0.8 (`:2662`); placeholder alpha → 0.8 (`index.css:1155`). The seal labels may stay as the bookend exception, in the Veil pill.

---

## 8. H8 — The Breath and H9 — The Letting Go (`TheDepths.tsx:436-467`, `:1731-1800`, `:2694-2730`)

**Keep, untouched.** **[seen]** On the real run: "for Robin" → "poured for a dream alter ego" → "Pamplemousse Pink runs through it" → "drawn toward freedom & belonging" → "and a part of you it keeps secret" → "…and the one thing you told only the ink" → the figure draws → "there you are." → drop → splash → black. This is the emotional peak and it works.

Follow-through only:
- `buildBreathEchoes` prints "poured for {lens lowercased}" (`:447`). After §3, read every echo aloud: "poured for the best version of me", "poured for one of my many selves" both work.
- After §7, delete the two frequency echo lines (`:461-462`) so the fill-to-three logic (`:466`) still runs.
- After §4, "{colorName} runs through it" (`:451`) must still read with liqueur-first names.

---

## 9. H10 — The Reading (`components/TheReading.tsx`; CSS `index.css:1500-1615`)

**[seen] Arrival sequence on the real run:** black → room kindles (~2.5 s) → kicker + title rise (~4 s) → tagline → name inks onto the tag (5.4 s). Robin: the name should already be there when the image appears.

| Finding | Sev. | Change | Where |
|---|---|---|---|
| Name inks **after** the title | 🟡 | Trigger `setNamed(true)` at ~2.4 s (during the kindle, before `--stage` 3.1 s), and delay the hero by ~0.6 s so the order is *room → name → title*. Reduced-motion twin stays pre-inked. | `TheReading.tsx:205-213` (delay `5400`), `index.css:1544` (`--stage: 3.1s`), `:1436-1445` (`tr-ink`) |
| Kicker exposes internals: "THE CONNOISSEUR · SAGE × LOVER" | 🟡 | Render `{result.archetypeName}` only, or "The Connoisseur · poured for {inkName}". | `TheReading.tsx:315` |
| Actions too poetic: "Preserve this recipe" / "Send it on" / coda "Pour again, another night" | 🟡 | Three `CtaButton`s: **Save the recipe** · **Share** · **Start again**. Keep "The ink has settled." as the line above them if Robin wants one flourish. | `TheReading.tsx:385-405`, `index.css:1585-1613` |
| **[seen]** "Send it on" copies silently, then the button reads "The link is yours" for 2.2 s | 🟢 | "Link copied" (or show the link in a pill for a beat). Share text is good — keep. | `TheReading.tsx:216-260` |
| **[seen]** Mobile: the fixed nav wordmark overprints the scrolling ingredient text ("garnish" under "Dionysus") | 🟢 | Give the nav a short top fade (`mask`/gradient) on `.tr-root`, or hide the wordmark once the reading scrolls. | `App.tsx:322`, `index.css:1622` |
| Gift page (H11) **[seen]**: title on black → room → greeting → "Discover the cocktail within you" | ✓ | Works. Do **not** plain-ify this CTA; it is the product's hook. | — |

---

## 10. Save as PDF (print) — three bugs, all verified with a print-media render

Rendered with Playwright `emulateMedia({media:'print'})` on the settled reading and exported to PDF:

1. **No image.** `.tr-stage { display: none }` (`index.css:1729`) hides the only element containing the persona image (`TheReading.tsx:280-284`); the PDF opens on "THE CONNOISSEUR · SAGE × LOVER / The Annotated Serenade". **Change:** add a print-only `<figure class="tr-print-plate">` at the top of `<main>` with `<img src={meta.src}>` (the 3:4 master) and the inked name positioned by `meta.tag`, shown only under `@media print`.
2. **The dev nav prints.** `[class*="dev-nav"], [class*="DevNav"]` (`index.css:1756`) matches nothing — `DevNav` has only Tailwind utilities (`TheDepths.tsx:541-545`). Verified: computed `display: flex` under print. Production builds strip it via `import.meta.env.DEV`, so it never ships, but dev PDFs are wrong. **Change:** add `className="dev-nav …"` to the `DevNav` root.
3. **No "for whom" line.** `.tr-for` is the tagline, not the name; the name lives only on the hidden tag. **Change:** print "Poured for {inkName} · {date}" under the title.

Also drop the "Sage × Lover" kicker from print (follows §9).

Nice-to-have: treat the PDF as a designed keepsake (plate → title → for-line → The Pour → The Ritual → The Reading); the paper/ink print palette is already in place (`index.css:1726-1761`).

---

## 11. Share flow (for the backend phase)

**[code]** `#pour=` carries the whole `CocktailResult` gzip+base64url in the URL fragment (`engine/pourLink.ts`); `shareKeepsake` strips `whyYou`, `archetypeStory` and `agentLines` (`TheReading.tsx:218-227`) so the guest gets the recipe, not the reading. The gift page inks the sharer's name and colour. This is the right shape; the master spec's `/pour/:id` + OG image is the backend item and nothing here blocks it.

---

## 12. Priority list for the implementing model

1. **Unify the grammar** (§1): Veil pill + one label; Inter hint class at 14–15 px / 0.8; shared dots; `.depth-pool` behind text on H4/H6 (H7 has it); descent veil for every phase change.
2. **Fix the overlap bugs** (§7, §4): flavour bubbles through the question (`TheDepths.tsx:1626-1631`), hero glass through the hint (`FIN_HERO`, `:221`), invisible seed drops (`index.css:283`, `SEED_POS`).
3. **Rebuild H4's on-ramp** (§5): instruction beat, real or no practice pair, draining ring on the ember, `THAW_MS` ≈ 3400, shared dots.
4. **Re-set H5 in bubbles** (§6): 9 larger words in the glass-bubble grammar, clear chosen state, count, pill confirm.
5. **Copy pass** (§2, §3, §4, §7, §9): hero sub-line, "Who is this cocktail for?", the six lenses, liqueur-first seed names + label on burst, plain glass question, label casing, plain action buttons, kicker without "Sage × Lover".
6. **Remove H7 frequency** (§7) and its echo lines; enlarge the trace hint and placeholders.
7. **Reading timing** (§9): room → name → title.
8. **PDF** (§10): print plate + for-line; `dev-nav` class.
9. **Backend contract** (§3): list which of the ~22 answers the Bartender will consume; today only colour, flavours, glass scales, vetoes, frequency, name and trace reach the engine.

**Verification per item** (the project's own craft floor, master spec §8): desktop + 390 px, zero console errors, reduced-motion twin present, `npx tsc --noEmit -p tsconfig.app.json` clean, and a real run from the hero — the DevNav jumps skip the seed colour, so H4/H5/H6 states must be checked with a chosen seed. For print, render with Playwright `emulateMedia({media:'print'})` rather than eyeballing the dialog.
