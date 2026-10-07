# Dionysus Persona Image System

Status: production rule for the 132 pre-authored cocktail portraits  
Visual source of truth: `dionysus-experience/DESIGN.md`  
Runtime registry: `dionysus-experience/src/data/personas.ts`

Production readiness and review: `2026-10-06-persona-image-production-review.md`.
Clarified 2026-10-06: functional metal is allowed; the bar/table and overall
environment must retain the established Dionysus atmosphere.
Later clarification, same day: tagline/editorial approval is not an image
creation gate. A draft can be image-ready when its recipe, serving details and
personality direction are coherent and settled. Keep editorial status unchanged.

## 1. The rule

**One room, different person.** Every image is a frame from the same Dionysus
world. The cocktail and personality change; the photographic universe does
not.

The fixed world is a private, old-world reading room or hotel bar emerging
from near-black: dark worn walnut, glass, cream paper, used linen,
restrained burgundy and olive, one warm practical light, natural falloff, and
fine analog grain. It must connect visually to the landing silhouette, the
underwater film and the keepsake reading room.

The variable story is the evidence a particular person left in that world.
Minimal personalities leave very little. Expansive personalities leave more.
The scene may become calmer, denser, warmer, stranger or more formal, but it
must never become a different visual brand.

## 2. Reading order

Every image must communicate in three passes:

1. **Drink:** one immediately legible, physically accurate cocktail.
2. **Person:** two to four plausible human traces that reveal temperament,
   habit, fear, care or ambition.
3. **Pour:** restrained ingredients or tools that explain what is actually in
   the glass.

If ingredients dominate pass two, the image is a recipe photograph, not a
persona portrait. If a visual needs the written reading to be understood, it
is a puzzle and must be removed.

## 3. Fixed house grammar

### Scene

- Near-black historic interior; no bright studio backdrop.
- Dark, genuinely worn wood is the default surface.
- Glass, paper, linen, ceramic, cork and fruit are supporting materials.
- No metal bar or tabletop, industrial backsplash or chrome-dominated room.
  Functional shakers, jiggers, spoons, knives, lamp hardware and personal
  objects are allowed when useful to the recipe or person. Give them credible
  reflections and handling wear; keep the cocktail dominant. They need not be
  artificially hidden or dulled. The restriction protects the room's warmth
  and material continuity, not a ban on normal bar equipment.
- Stainless-steel bars, modern kitchens, neon clubs, white marble and clinical
  minimalism are outside the world.
- Leave a quiet, dark copy-safe region in the wide composition, normally
  25–35% of the left side.

### Light and colour

- One believable warm practical source, normally from camera-right.
- Shadows fall naturally into deep neutral brown-black.
- Warmth is restrained: retain neutral wood, grey metal, dirty cream paper and
  natural ingredient colours. Do not wash the entire frame orange.
- No HDR microcontrast, uniform rim lighting or perfectly round decorative
  bokeh.
- A little highlight halation, corner softness, shadow noise and irregular
  35 mm-style grain are desirable.

### Drink

- For an individual serve: exactly one drinking glass and one finished cocktail.
- For an explicitly settled shared serve: one hero serving vessel holding the
  actual recipe, with only the necessary ladle and a few receiving cups. Cups
  imply sharing, never a repeated line of finished cocktails. Record this
  exception in the serving-type pilot review before production; do not depict
  a bowl recipe as an invented single-serving drink.
- Glassware, liquid opacity, dilution, ice, foam, bubbles, condensation, rim
  treatment and garnish must match the pour specification.
- Cocktail physics outrank symbolism. Foam must behave like foam; ice must
  look cut and wet; citrus must look used when the scene says it was used.
- The glass remains the sharpest or second-sharpest object in the frame.

### Tag

- Attachment physics clarification,2026-10-07: a believable support chain is
  required, not just paper near the drink. For stemware, wrap the narrow stem
  below the bowl. For stemless tumblers/highballs, use a snug friction-held
  circumferential cotton-twine loop around the outside body below the rim;
  show the curved front arc, credible side occlusion and visible knot. Never
  anchor cord to a naked top edge, foam, ice, garnish or liquid, drill the
  glass, invent a hidden hook, or show a loose floating halo. From the knot,
  a short continuous tether passes through a real punched paper hole. Paper
  hangs below its support under gravity, separate from glass, or honestly
  rests on timber with a contact shadow. No adhesive-looking tag, cord/glass
  intersections, disconnected strands or implausible suspension. Inspect this
  mechanical chain at original resolution; uncertain attachment stays held.
- User scale clarification,2026-10-07: the tag is a discreet label, not a large
  postcard competing with the drink. Go On and Whoever Comes In were rejected
  for oversized paper. Keep the paper visibly smaller than the bowl, loosely
  tied and separate from the glass. A numeric writing-width target must not
  inflate its physical scale; measure the real blank face and test name fit
  later. Smaller paper does not by itself prove glyph or mobile acceptance.
- One blank cream paper tag is physically tied to the hero vessel (glass or
  approved shared-serving vessel).
- It stays fully inside both crops and has enough clean writable space for a
  name.
- Paper shows subtle handling: a small curl, faint crease or softened corner.
- No text is generated on the tag. The app adds the user's name later.
- Tag centre, writable width and angle are measured separately on the actual
  portrait and wide exports. Hand off these measurements to the single
  integration owner for `src/data/personas.ts`; never copy generic coordinates.

## 4. Variable personality grammar

Choose evidence from the pour's `whoYouAre`, anchors and image brief. Prefer
habits over symbols.

| Personality energy | Evidence budget | Treatment |
| --- | ---: | --- |
| restrained / minimalist | 1–3 objects | air, precision, clean hierarchy |
| intimate / caregiver | 2–4 objects | wear, preparation for one person, warmth |
| formal / ruler / sage | 2–4 objects | order, patina, inherited tools, quiet control |
| experimental / explorer | 4–6 objects | revisions, repairs, mismatched tools, active process |
| exuberant / jester | 3–5 objects | playful but plausible imbalance; never neon spectacle |

Good personality evidence includes a repaired apron, a dog-eared recipe,
gloves softened at the fingers, a knife placed from use rather than styling,
or a half-finished note with no readable copy. Weak evidence includes literal
archetype props, generic artist tools, unexplained object repetition, magical
stains, or a pile of ingredients that merely lists the recipe.

## 5. Anti-AI gate

Production calibration, 2026-10-06: more surface detail is not more realism.
Describe walnut as mostly flat long grain with a low satin sheen and sparse
wear at real contact points, not uniformly crackled/alligator varnish. Plain
glass has unobstructed patches and a few uneven droplets; ice has broad wet
faces, ordinary trapped air and melting corners, not ornamental etching.
Keep paper, cloth, leather, sugar, wood and glass materially distinct. Compare
both actual JPEG exports against established house controls at full size;
passing crop calculations or an owner's self-review does not release a scene.

Reject or revise an image when any of these is true:

- cocktail texture resembles ice cream, frosting, plastic, resin or CGI;
- ice is a flawless gemstone or contains decorative geometry;
- every prop is turned toward camera or spaced at even intervals;
- wear is evenly distributed rather than concentrated at real contact points;
- the scene contains pseudo-writing, faux equations or conveniently symbolic
  diagrams;
- timber, glass and ceramic share the same synthetic glossy highlight treatment;
- a metal counter/tabletop, industrial backdrop or chrome-dominated room
  replaces the worn-timber world; functional metal alone is not a rejection;
- the palette is uniformly amber/orange with no neutral colour left;
- the image relies on perfect symmetry, generic bokeh or an obvious luxury-ad
  composition;
- a surreal device needs an explanation (for example repeated reflected
  cocktails or coloured rings from drinks that could not create them);
- the image could be found unchanged on a generic cocktail mood board.

Prefer a small amount of awkwardness: an object partly cropped, a tag slightly
curled, a cloth folded imperfectly, or focus that falls off naturally.

## 6. Generation prompt template

Use one built-in image-generation call per asset/variant, followed by targeted
edits when needed. Review the three established visual pilots first; use their
photographic grammar without inheriting their recipe, props or approval status.

```text
Use case: photorealistic-natural
Asset type: Dionysus persona cocktail portrait

PAIRING
<pairing key> — <pour name> — <personality name>
Tagline: <tagline>

FIXED DIONYSUS WORLD
Near-black historic reading-room/hotel-bar interior; dark worn walnut, glass,
cream paper, used linen, ceramic and cork; one believable warm practical light from
camera-right; neutral brown-black shadows; restrained saturation; observed
35 mm editorial photograph, not a glossy advertisement. Functional metal tools
may appear naturally when relevant; the bar/table remains worn timber.

DRINK — PHYSICAL TRUTH
<glassware, exact liquid colour/opacity, ice, foam, rim, garnish and
condensation from the pour specification>

PERSON — PLAUSIBLE EVIDENCE
<two to four concrete traces derived from whoYouAre and anchors>

POUR — SUPPORTING EVIDENCE
<zero to three ingredients/tools needed to clarify the recipe>

COMPOSITION
Landscape 16:9; exactly one drink; hero just right of centre; 30–35% quiet dark
copy space on the left. Aim to keep essential content within roughly the
central 20–80% vertically, then check the actual app's cover windows rather
than treating a prompt margin as proof. Plan a separate 896:1200 portrait-safe
window AND the narrower window exposed when that portrait covers a tall phone.
Keep the complete vessel, paper and two recognisable personality traces in
that inner window with clearance; a full portrait export is not the phone view.
For approved shared serves, describe the hero
vessel and receiving cups explicitly rather than using the one-glass default.

TAG
One blank cream physical tag tied to the hero vessel, slightly handled, fully in
frame, clean writable area, no printed or handwritten text.
Stem loop for stemware; snug exterior body loop below rim for stemless glass.
Visible continuous loop → knot → short downward tether → punched hole → paper,
with credible occlusion, gravity and air gap/contact. Nothing tied to drink rim.

REALISM
One plausible source; natural falloff; uneven contact wear; restrained grain;
slight corner softness; no HDR; no uniformly orange grade; no perfect prop
spacing; accurate drink physics. Mostly flat long-grain timber with a low
satin sheen and sparse contact scuffs; ordinary smooth wet ice; sparse uneven
glass droplets with clear patches; distinct material reflections. No raised
alligator varnish, ornamental etched ice or shared plastic sheen.

AVOID
Second drink; people or hands unless explicitly approved; modern steel bar;
white studio; neon; fake text; logos; symbolic object armies; unexplained
surrealism; CGI ice; sculpted foam; glossy product-ad perfection; metal
bar/table or industrial backdrop; chrome-dominated room.
```

## 7. Production workflow

1. Read the continuation plan, this system, application `DESIGN.md`, current
   review decisions and the complete settled pour before each image. Inspect
   existing wide/portrait assets before proposing a replacement. A reviewed
   draft is not overall user approval, but draft status alone does not block
   image work; preserve unsynced workbook decisions.
2. Establish a readiness record: recipe, vessel, serving size, garnish, liquid
   appearance, ice/foam/bubbles and personality evidence must be settled. If a
   tagline, name or other wording is still being refined, proceed when those
   changes do not alter the photographed drink or personality direction. Never
   generate tagline/name text on the physical tag. If a dossier still requires
   an impossible detail, retain it as historical author
   intent but replace it in the production brief with ordinary human traces.
   Do not alter recipe or invent ingredients to make a metaphor work.
3. Pilot representative serving types against the established visual world
   before scaling: foam highball, rocks/ice/rim, stemmed shaken, stirred,
   sparkling flute and shared bowl. Add hot/ceramic, crushed-ice or other types
   only as their pours become ready. Candidate pilots are not final approvals.
4. Batch by readiness and serving type, never catalogue order. Write the scene
   hierarchy: drink → person → pour, with two personality traces and at most
   three recipe traces. Save prompt and source revision with the asset.
5. Generate the wide 16:9 scene first. Review it without reading the pour. If
   the personality does not register, revise the evidence rather than adding
   symbolism.
6. Run the anti-AI gate. Correct one issue per edit pass, preserving approved
   invariants.
7. Produce an exact 896:1200 portrait companion from the same scene. Recompose
   when a crop would lose the glass, tag or personality evidence; crop only
   when all three survive cleanly. Then calculate the actual app's second
   `cover` crop on tall phones. For example, a 702×940 source crop exposes
   only about 434 master pixels horizontally at 390×844, not all 702. This
   number depends on the crop and viewport: calculate it for each asset.
   Include the current frame's breathing scale and translation, not just
   `object-fit`: at scale 1.115 that nominal 434-pixel window narrows to about
   389 pixels, and its position changes. Check resting/reduced-motion, arrival,
   breathing endpoints and intermediate phases, plus the scrolling state.
   A coat reduced to an anonymous strip or a wallet reduced to its edge does
   not count as readable personality evidence. Do not stretch an image or
   falsify focal coordinates to conceal a composition that cannot fit.
8. Export reviewed JPEGs first into a versioned review/handoff directory:
   - `public/personas/<pairing>/portrait.jpg` — exactly 896×1200.
   - `public/personas/<pairing>/wide.jpg` — exactly 1920×1080 (16:9).
   These are eventual application destinations, not permission to overwrite
   existing public files. Preserve masters and review candidates separately.
9. Measure `tag`, `wideTag`, `glass` and `wideGlass` on the actual exports and
   record pixel positions, normalized values, crop transform and source hash.
   Also record physical glass/paper bounds and the bounds of the two essential
   personality traces. Check those traces against the app's calculated cover
   windows; explicitly distinguish optional partly cropped props from essential
   evidence. Geometry passing for glass/paper alone is not scene acceptance.
   One integration owner copies accepted exports to `public/personas` and
   registers `src`, `wide` and metadata in `src/data/personas.ts`.
10. The integration owner verifies the name overlay with a short name and a long name, desktop and
   portrait viewport. The name must remain on paper after cover cropping.
   A static font-size heuristic is only a risk screen: hitting a minimum font
   size is not proof of overflow, and avoiding it is not proof of fitting.
   Inspect actual glyph bounds in the app's loaded font, including narrow phones.
   Inspect the full page too: title, personalised kicker and epigraph must not
   cross the physical tag or obscure essential person evidence. Keep a named
   photo fitting its paper separate from a page that remains readable. The
   private fixture's placeholder copy is not proof that authored copy fits.
11. The integration owner runs the build and browser checks; the image owner
    inspects both exports at full size. Log image-production acceptance
    separately from Robin's visual approval and the pour's editorial status.
    The user's authorization to produce the collection permits reviewed assets
    to advance; it does not mark all recipes or copy approved. Record any
    outstanding visual issues rather than silently claiming final acceptance.

## 8. Acceptance checklist

- [ ] Same Dionysus world as the landing, journey and keepsake.
- [ ] Timber defines the bar/table; functional metal fits the warm shared world.
- [ ] Settled recipe and personality evidence, with source/decision recorded.
- [ ] One physically accurate hero serve; any shared-vessel exception is reviewed.
- [ ] Personality is readable from plausible evidence.
- [ ] Two essential personality traces remain recognisable after the tall-phone cover crop.
- [ ] Ingredients support rather than dominate.
- [ ] No unexplained visual puzzle or literal archetype cliché.
- [ ] One believable light source; restrained amber; neutral shadows survive.
- [ ] No obvious AI texture, pseudo-writing, CGI ice or sculpted foam.
- [ ] Blank physical tag is fully visible in wide and portrait.
- [ ] Actual loop/knot/tether/hole/paper chain has credible support, occlusion,
      gravity and air gap/contact; not a rim hook or adhesive-looking label.
- [ ] Wide left-side copy space remains usable.
- [ ] Portrait is 896×1200; wide is 1920×1080 (16:9).
- [ ] Tag transforms and glass point are registered and visually checked.
- [ ] Actual short/long-name glyphs fit on paper; calculated geometry is not substituted for browser evidence.
- [ ] Build passes.

## 9. Established visual pilot references

- `creator-hero` — **Down the Line**: ambition and handover through one Ramos
  fizz, one worked shaker and one inherited recipe.
- `creator-innocent` — **Half a Rim**: subtraction through the half-salted rim,
  one clear cube and its discarded cloudy offcut.
- `creator-explorer` — **Off-Label**: iteration through repair, revisions and
  an absent maker's personal tools; no coloured rings or magical marks.

These pilots define the shared photographic world, not a requirement to reuse
their exact lamp, surface composition or props. Visual-reference status is not
approval of every current dossier: check each pour's current readiness record.
