# Dionysus Persona Image System

Status: production rule for the 132 pre-authored cocktail portraits  
Visual source of truth: `dionysus-experience/DESIGN.md`  
Runtime registry: `dionysus-experience/src/data/personas.ts`

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
- Metal is not part of the image's material language. No metal counters,
  backsplashes, lamps, shakers or hero bar tools. An unavoidable tiny closure
  or utensil must remain dull, peripheral and visually negligible.
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

- Exactly one drinking glass and one finished cocktail.
- Glassware, liquid opacity, dilution, ice, foam, bubbles, condensation, rim
  treatment and garnish must match the pour specification.
- Cocktail physics outrank symbolism. Foam must behave like foam; ice must
  look cut and wet; citrus must look used when the scene says it was used.
- The glass remains the sharpest or second-sharpest object in the frame.

### Tag

- One blank cream paper tag is physically tied to the glass.
- It stays fully inside both crops and has enough clean writable space for a
  name.
- Paper shows subtle handling: a small curl, faint crease or softened corner.
- No text is generated on the tag. The app adds the user's name later.
- Tag centre, writable width and angle are measured separately for portrait
  and wide assets and recorded in `src/data/personas.ts`.

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

Reject or revise an image when any of these is true:

- cocktail texture resembles ice cream, frosting, plastic, resin or CGI;
- ice is a flawless gemstone or contains decorative geometry;
- every prop is turned toward camera or spaced at even intervals;
- wear is evenly distributed rather than concentrated at real contact points;
- the scene contains pseudo-writing, faux equations or conveniently symbolic
  diagrams;
- timber, glass and ceramic share the same synthetic glossy highlight treatment;
- chrome, steel, brass or another metal object becomes a visible motif, focal
  prop, surface, fixture or backdrop;
- the palette is uniformly amber/orange with no neutral colour left;
- the image relies on perfect symmetry, generic bokeh or an obvious luxury-ad
  composition;
- a surreal device needs an explanation (for example repeated reflected
  cocktails or coloured rings from drinks that could not create them);
- the image could be found unchanged on a generic cocktail mood board.

Prefer a small amount of awkwardness: an object partly cropped, a tag slightly
curled, a cloth folded imperfectly, or focus that falls off naturally.

## 6. Generation prompt template

Use one built-in image-generation call per pairing. Provide the three approved
pilots as style references when useful; describe their role as style only.

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
35 mm editorial photograph, not a glossy advertisement.

DRINK — PHYSICAL TRUTH
<glassware, exact liquid colour/opacity, ice, foam, rim, garnish and
condensation from the pour specification>

PERSON — PLAUSIBLE EVIDENCE
<two to four concrete traces derived from whoYouAre and anchors>

POUR — SUPPORTING EVIDENCE
<zero to three ingredients/tools needed to clarify the recipe>

COMPOSITION
Landscape 16:9; exactly one drink; hero just right of centre; 30–35% quiet dark
copy space on the left. Keep drink, tag and essential personality evidence in
the central 86% vertically and 90% horizontally for responsive cover cropping.

TAG
One blank cream physical tag tied to the glass, slightly handled, fully in
frame, clean writable area, no printed or handwritten text.

REALISM
One plausible source; natural falloff; uneven contact wear; restrained grain;
slight corner softness; no HDR; no uniformly orange grade; no perfect prop
spacing; accurate drink physics.

AVOID
Second drink; people or hands unless explicitly approved; modern steel bar;
white studio; neon; fake text; logos; symbolic object armies; unexplained
surrealism; CGI ice; sculpted foam; glossy product-ad perfection; metal
counter, backdrop, lamp, shaker or prominent bar tool; chrome or brass decor.
```

## 7. Production workflow

1. Read the complete pour file. Extract drink truth, the guest's recognition
   line, two personality traces and at most three recipe traces.
2. Write the scene hierarchy before the prompt: drink → person → pour.
3. Generate the wide 16:9 scene first. Review it without reading the pour. If
   the personality does not register, revise the evidence rather than adding
   symbolism.
4. Run the anti-AI gate. Correct one issue per edit pass, preserving approved
   invariants.
5. Produce a 3:4 portrait companion from the same scene. Recompose when a crop
   would lose the glass, tag or personality evidence; crop only when all three
   survive cleanly.
6. Export web JPEGs:
   - `public/personas/<pairing>/portrait.jpg` — exactly 896×1200.
   - `public/personas/<pairing>/wide.jpg` — exactly 1920×1080 (16:9).
7. Register `src`, `wide`, `tag`, `wideTag` and `glass` in
   `src/data/personas.ts`.
8. Verify the name overlay with a short name and a long name, desktop and
   portrait viewport. The name must remain on paper after cover cropping.
9. Run `npm run build`, inspect both images at full size, and log approval in
   the corresponding pour file or production tracker.

## 8. Acceptance checklist

- [ ] Same Dionysus world as the landing, journey and keepsake.
- [ ] Timber, glass, paper and linen define the scene; metal does not define a
      surface, fixture, tool or decorative motif.
- [ ] One physically accurate cocktail; no second glass.
- [ ] Personality is readable from plausible evidence.
- [ ] Ingredients support rather than dominate.
- [ ] No unexplained visual puzzle or literal archetype cliché.
- [ ] One believable light source; restrained amber; neutral shadows survive.
- [ ] No obvious AI texture, pseudo-writing, CGI ice or sculpted foam.
- [ ] Blank physical tag is fully visible in wide and portrait.
- [ ] Wide left-side copy space remains usable.
- [ ] Portrait is 896×1200; wide is 1920×1080 (16:9).
- [ ] Tag transforms and glass point are registered and visually checked.
- [ ] Build passes.

## 9. Approved pilot references

- `creator-hero` — **Down the Line**: ambition and handover through one Ramos
  fizz, one worked shaker and one inherited recipe.
- `creator-innocent` — **Half a Rim**: subtraction through the half-salted rim,
  one clear cube and its discarded cloudy offcut.
- `creator-explorer` — **Off-Label**: iteration through repair, revisions and
  an absent maker's personal tools; no coloured rings or magical marks.

These pilots define the shared photographic world, not a requirement to reuse
their exact lamp, surface composition or props.
