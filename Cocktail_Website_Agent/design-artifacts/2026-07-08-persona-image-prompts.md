> **Historical design record — reviewed 8 October 2026.** This dated plan/review remains evidence of its iteration. The current reveal is TheReading; use current image rules and accepted later decisions for new work. Current direction: [experience specification](2026-07-08-experience-master-spec.md).

# Persona Image Prompts — the 132 cocktails

**Date:** 2026-07-08 · **Author:** Robin with Claude
**Governing constraints:** Surfacing spec §4 (asset spec) — portrait ·
blank tag in the lower-right region · dark-ambient lighting family · full
scenes, never a product shot · the image is sacred (never tinted at runtime;
seed colour is lettering only).

> **Amended 2026-07-08, after the first two real images (Trickster, Visionary):**
> the standard is **3:4 portrait (896×1200 masters)**, not 4:5 — generator-native
> and both first images would lose their tags to a 4:5 crop. And the tag no
> longer needs a *fixed* position/angle: both generations landed beautiful
> natural in-scene tags, so each image instead records its own tag transform
> (`{cx, cy, w, angle}` + a `glass` glow point) in
> `dionysus-experience/src/data/personas.ts` (~1 min per image). The prompt
> keeps asking for a blank tag toward the lower right; the Photoshop master-tag
> composite is now the fallback for generations whose tag lands badly, not the
> default workflow. The bloom test below is unchanged.

---

## 1. The house style block

Every prompt = **[SCENE, unique per persona] + [HOUSE STYLE, verbatim] + [AVOID]**.
The house style is what makes 132 different worlds read as one collection.

**HOUSE STYLE (append verbatim to every prompt):**

> Cinematic still-life photograph, 3:4 portrait. A dark, mystical, intimate
> scene — a high-end speakeasy hidden behind a fortune teller's parlour. The
> cocktail is the brightest point in the frame, glowing softly as if lit from
> within the glass; warm candlelight catches the edges of the scene; deep warm
> shadow toward the frame edges, but no pure-black voids — every shadow keeps a
> faint ember of detail. Rich theatrical set dressing that reveals a
> personality, not a product shot. A small blank vintage paper tag on twine is
> tied to the glass, hanging toward the lower right, completely blank. Shot on
> medium format, shallow depth of field, soft filmic grain, high contrast,
> saturated colour popping against darkness.

**AVOID (negative prompt / suffix):**

> no people, no faces, no hands, no text, no lettering, no logos, no labels,
> no writing on the tag, no neon, no plastic, no daylight, no white
> background, no bar-menu look, not flat-lay

**Parameter hints:** Midjourney: `--ar 3:4 --style raw`; Firefly: aspect 3:4,
content type Photo; SDXL/Flux: portrait 896×1200, put AVOID in the negative
prompt.

### Why the light must sit *inside* the glass
Beat 4's choreography contracts the warm-white bloom toward the drop's landing
point and "the last white spark dies inside the glass." An image whose
brightest highlight lives in the drink makes that hand-off seamless: the bloom
appears to condense *into* the cocktail's own glow.

### The tag: prompt it, then standardise it in post (recommended)
Generators will not hit "22% width at −5°, same spot, 132 times." Keep the tag
in the prompt (so the scene lights and occludes it naturally), but expect to
**composite one master tag asset over every image in a fixed template**
(Photoshop smart object: bottom-right quadrant, 22% width, −5°). The UI inks
the name into that exact box — pixel consistency beats prompt luck. If a
generation lands a beautiful natural tag in the right zone, keep it; the
template is the guarantee, not the rule.

### Colour freedom
Each pairing owns its own palette — the runtime never tints the image, so
there is nothing to match. Choose colours that tell the persona's story and
pop against darkness (the brand's own principle).

---

## 2. The Trickster — Magician × Outlaw (`magician-outlaw.jpg`)

*Priority: first image to produce — it's the house exemplar behind the
Entrance side door and the velvet rope.*

**Essence:** subverting received wisdom through tricks; disruption with a
point; the rules revealed as illusions.
**Palette:** deep emerald and violet, candlelit amber, a wink of gold.

**Prompt A — "The Impossible Pour":**
> A coupe glass of luminous emerald-green cocktail balanced impossibly on a
> collapsing house of antique playing cards, mid-trick — one card frozen
> midair; a silver bar spoon bent into a knot beside it; a smoke ring hanging
> above the drink like a halo; scattered tarot cards face-down, one corner
> lifting as if about to flip itself; velvet table, candle flame bending the
> wrong way. + HOUSE STYLE + AVOID

**Prompt B — "The Rigged Game":**
> A cocktail split into two perfectly separated layers of violet and gold in a
> crystal coupe, sitting at the centre of an abandoned shell game — three
> tarnished silver cups overturned, a pearl escaping from under the wrong one;
> loaded dice mid-roll, frozen; a fortune teller's crystal ball in the
> background reflecting the drink upside-down; curling incense smoke forming a
> question mark. + HOUSE STYLE + AVOID

**Prompt C — "The Escaped Card":**
> An emerald cocktail in a vintage coupe on a magician's trunk, garnished with
> a playing card that is burning at one corner with cold violet flame that
> gives off no smoke; handcuffs unlocked and draped like jewellery; a mirror
> behind the glass reflecting a *different* cocktail than the one in front of
> it; moth-eaten velvet curtain, brass keys that fit no lock. + HOUSE STYLE +
> AVOID

---

## 3. The Visionary — Creator × Hero (`creator-hero.jpg`)

**Essence:** an iconic vision followed to the end — the unfinished Sagrada
Família; belief that never wavers; monumental works.
**Palette:** deep sapphire blue and warm gold; dawn light in darkness.

**Prompt A — "The Unfinished Cathedral":**
> A tall, spire-like cocktail in an elegant fluted glass, glowing warm gold,
> standing on an architect's drafting table like a scale model among its own
> blueprints — hand-inked cathedral drawings, brass drafting compass and
> ruling pens; behind it, the silhouette of an unfinished cathedral under
> construction scaffolding, one high window letting a single shaft of dawn
> light fall onto the drink; sawdust like gold dust in the air. + HOUSE STYLE
> + AVOID

**Prompt B — "The Maquette":**
> A sapphire-blue cocktail in a sculptural stemmed glass at the centre of a
> master builder's studio, surrounded by miniature plaster maquettes of
> impossible towers; a spiral of golden liquid suspended inside the drink like
> a staircase; wax-sealed scrolls of plans, a lantern burning low after
> everyone else has gone home; scaffolding shadows striping the wall. + HOUSE
> STYLE + AVOID

**Prompt C — "Seen Before It Exists":**
> A golden cocktail whose rising bubbles form the faint ghost-image of a
> cathedral spire above the glass, as if the drink is dreaming its own
> monument; drafting table, unfurled blueprint underneath acting as the
> coaster, ink still wet; a plumb line hanging perfectly still beside it; one
> candle and one shaft of blue pre-dawn light competing across the scene. +
> HOUSE STYLE + AVOID

---

## 4. Extending to all 132 — the recipe

For each pairing in `archetypes.ts`, write the SCENE from its `essence` +
`story` fields:

1. **One glass, one drink** — the persona's silhouette and colour (the drink
   *is* the person; never two drinks, never a person in frame).
2. **A world around it** — 3–5 props that *are* the pairing's story told in
   objects (the Trickster's bent spoon, the Visionary's blueprints). Props do
   the personality work; the register does the mood work.
3. **One impossible detail** — a single quiet piece of magic (a card frozen
   midair, bubbles forming a spire). Exactly one; more turns it into fantasy
   art.
4. Append HOUSE STYLE + AVOID verbatim. Same parameters every time.

**Workflow per image:** generate 4–8 variations → pick for *scene truth*
first, light-in-glass second → crop/outpaint to exact 3:4 → composite the
master tag *only if the natural tag landed badly* → **downsize + convert to
JPEG at the 896×1200 master size** → export `public/personas/<primary>-<secondary>.jpg`
(lowercase, spaces→dashes). Generators output heavy PNGs (8MB+); the app ships
these files as-is, so the convert step is mandatory, not optional —
`sips -s format jpeg -z 1200 896 -s formatOptions 82 in.png --out out.jpg`
lands ~260KB, matching the existing personas. Then record the image's
`tag {cx,cy,w,angle}` + `glass {x,y}` in `dionysus-experience/src/data/personas.ts`
(~1 min per image; measure the glass glow point and the tag's writable centre
off the pixels). The best rejected candidates are worth keeping — they're
OG/marketing material.

**Bloom test (acceptance):** put the image full-screen and fade in from
warm white (`#fbf6ea`). If the scene reads within ~1.8s and the eye lands in
the glass, it passes beat 4. If the edges vanish into the white or the glass
isn't the landing point, relight.
