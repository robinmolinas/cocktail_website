# Video Generation Prompts — "The Suspended Pour"

**Date:** 2026-06-12
**Concept:** The entire questionnaire journey is one frozen instant of a cocktail being poured/stirred, traveled from the inside. The user's progress moves the camera up through the strata; the reveal breaks the surface and pulls back — it was a glass all along.
**Purpose of these prompts:** concept-validation footage. Prompt 1 tests the full emotional arc; Prompts 2–3 test the two building blocks the real build needs (loopable chapter holds + the reveal pull-back).

---

## Prompt 1 — THE FULL ASCENT (hero test, ~8–10s, 16:9)

> Photorealistic macro liquid cinematography, frozen-time bullet-time style. The camera begins deep inside a cocktail, at the very bottom of the glass — a vast dim amber world, thick and golden like honey lit by candlelight, tiny bubbles suspended motionless like planets, fine particles hanging frozen in the liquid. The camera ascends slowly and continuously upward through distinct strata of the drink, each layer a different world: first through deep amber spirit; then through two clouds of liqueur frozen mid-collision, one crimson and one cream, their tendrils interlocked but motionless; then past dark bitters droplets suspended mid-plunge above, trailing frozen ribbons; then through a burst of citrus oil frozen mid-explosion, hundreds of prismatic micro-droplets catching light like shattered glass; then up beneath the silvery underside of the liquid surface, garnish silhouettes visible above through the meniscus; then into dense white foam, soft bubbles glowing with diffused warm light, almost heavenly. Finally the camera breaks through the foam surface and pulls back fast and smooth — revealing in one continuous dolly-out that this entire universe was inside a single elegant coupe cocktail glass standing on a dark mahogany bar counter, warm bokeh bar lights behind it, a thin curl of citrus peel on the rim. Frozen time throughout except the final pull-back. Cinematic, ultra-detailed, shallow depth of field in macro, anamorphic feel, warm amber and gold palette with deep shadows. No people, no text, no logos.

**Notes:**
- If the tool supports keyframes/beats, weight the final pull-back as the climax (last ~2.5s).
- If 10s is too long, cut strata: amber depths → citrus burst → foam → surface-break reveal still proves the arc.

---

## Prompt 2 — CHAPTER HOLD LOOP (the "breathing freeze," ~5s, 16:9, loopable)

Tests whether a frozen stratum can idle beautifully behind a questionnaire overlay.

> Photorealistic macro shot inside a cocktail, frozen in time: two clouds of liqueur suspended mid-collision in golden liquid — one deep crimson, one ivory cream — their tendrils interlocked and motionless. Microscopic drift only: particles rotate almost imperceptibly, light shifts very subtly as if candlelight is breathing, tiny bubbles tremble in place but nothing travels. The frozen moment feels alive but held. Seamless loop, no camera movement, shallow macro depth of field, warm amber palette, dark vignette edges, cinematic, ultra-detailed. No people, no text.

**Notes:**
- Generate per-stratum variants by swapping the subject: suspended bitters drops / citrus oil burst / foam glow / deep amber depths.
- Ask for "seamless loop" explicitly; if unsupported, a 5s clip played forward-then-reverse works for testing.

---

## Prompt 3 — THE REVEAL PULL-BACK (the unveiling, ~6s, 16:9)

The money shot on its own, for iterating on the cinematic unveiling.

> The camera is submerged inside white cocktail foam, soft warm light glowing through dense bubbles. It rises and breaks through the liquid surface in extreme macro — droplets scatter in slow motion — then pulls back in one continuous smooth dolly-out and slight crane-up: an elegant coupe glass comes into frame, holding a luminous layered cocktail in ambers and golds, standing alone on a dark polished mahogany bar. Warm out-of-focus bar lights and bottle silhouettes in the background, a curl of orange peel on the rim, one slow drip running down the stem catching the light. The drink glows like the only lit thing in the room — a portrait of a cocktail as the hero. Slow motion transitioning to real time as the pull-back completes. Cinematic, photorealistic, anamorphic bokeh, warm amber and deep shadow palette. No people, no text.

---

## Prompt 1 · REV 2 — THE FULL ASCENT (all draft-1 fixes applied, ~10s, 16:9)

> Photorealistic macro liquid cinematography, bullet-time frozen moment. The camera floats deep inside a vast, boundless universe of golden liquid that fills the entire frame edge to edge — no glass walls, no rim, no surface line, no background, no recognizable location: only liquid, light and suspended matter, endless in every direction like the inside of an amber nebula. Everything is frozen completely motionless as if time itself has stopped — bubbles hang like planets, fine golden particles hang like stars — only the camera moves. In one single continuous unbroken vertical ascent, no cuts, no dissolves, the camera rises slowly upward through distinct strata of this frozen liquid cosmos: first the deep amber depths, dim and heavy like honey lit by distant candlelight; then through two colossal clouds of liqueur frozen mid-collision, one deep crimson and one ivory cream, their tendrils interlocked and perfectly still; then past dark bitters droplets suspended mid-plunge overhead, trailing motionless ribbons; then through a frozen explosion of citrus oil, hundreds of prismatic micro-droplets hanging in space catching the light like shattered stained glass; then into dense white foam, soft motionless bubbles glowing with warm diffused light, bright and heavenly. Then the climax: the camera breaks upward through the foam surface — slow-motion droplets scatter into the air — and in one continuous accelerating dolly-out time returns to normal, revealing that this entire cosmos was inside a single elegant coupe glass standing on a dark mahogany bar counter: no ice, golden liquid crowned with silky white foam, one curl of lemon peel on the rim, warm bokeh of bar bottles far behind. The glass and the drink remain exactly identical from the moment they appear until the final frame. Cinematic, ultra-detailed, anamorphic, shallow macro depth of field inside the liquid, warm amber and gold palette with deep shadows, subtle film grain. No people, no hands, no text, no logos, no watermarks, no glass walls or bar environment visible before the final reveal.

---

## Draft 1 review (2026-06-12 — `Video_drafts/Photorealistic_macro_liquid_ci.mp4`)

**Validated:** stratum art direction (liqueur collision frame is perfect), citrus-wheel-through-meniscus composition, the reveal shot's grading and staging. The concept works.

**Fix in rev 2 (ranked):**
1. POV leak — camera often outside the glass (walls/rim/surface visible, bar bokeh mid-journey) → spoils the twist. Interior must be boundless.
2. No continuous ascent — reads as cross-dissolved setups, not one elevator ride upward.
3. Slow motion ≠ frozen time — holds must be bullet-time suspended; only the camera moves.
4. Continuity drift in the reveal (drink changes between shots); also no ice in a coupe — foam crown instead.
5. Push interior scale toward cosmic (nebula, bubbles as planets) so the snap to "one small glass" hits harder.

**Rev-2 boilerplate — append to every INTERIOR prompt:**
> The liquid world fills the entire frame edge to edge — no glass walls, no rim, no surface line, no background visible. Vast and boundless, like the inside of a nebula. Everything is suspended completely motionless as if time has stopped; only the camera moves, one continuous unbroken vertical ascent. No cuts.

**Rev-2 boilerplate — for the REVEAL prompt:**
> The exact same glass and drink remain identical throughout the pull-back: an elegant coupe, no ice, golden liquid with a silky white foam crown, one curl of lemon peel — slow-motion droplets scatter as the camera breaks the surface, then time returns to normal as the dolly-out completes.

**Strategy confirmed:** modular build (≈7 boundless stratum holds + short upward pushes + the reveal generated separately) — single-clip generations are for arc-feeling only.

---

## Shared technical guidance

- **Aspect:** 16:9 for desktop-first (the experience is desktop-primary; 9:16 variants are a later mobile question)
- **Palette:** warm amber/gold + deep shadow — matches the built hero's grading
- **Forbid:** people, hands, text, logos, watermarks (consistency + the "no humans" production advantage)
- **Color Seed strategy:** generate footage in *neutral warm amber* — the per-user tint is applied live in the browser (CSS/WebGL grading), not baked into footage
- **Real-build structure (later, Phase 6):** ~7 loopable holds (Prompt 2 family) + ~7 short upward "push" transitions + the reveal (Prompt 3). Prompt 1 is for concept validation only.
