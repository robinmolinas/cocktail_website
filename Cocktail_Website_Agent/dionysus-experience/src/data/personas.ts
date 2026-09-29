// Persona image metadata — the 132 pre-authored cocktail portraits.
// Spec: design-artifacts/2026-07-07-the-surfacing-reveal-design.md §4, amended by
// design-artifacts/2026-07-08-experience-master-spec.md: images are 3:4 portrait
// (896×1200 masters), and instead of one fixed tag box, each image records where
// its own in-scene tag actually lies — the name is inked into that transform.
// The image itself is sacred: never tinted, graded, or overlaid.
//
// New assets use one directory per stable pairing key:
//   /personas/<primary>-<secondary>/portrait.jpg
//   /personas/<primary>-<secondary>/wide.jpg
// Legacy flat assets remain valid while the collection is migrated.

/** All coordinates are fractions of the image's natural size (0..1). */
export interface TagBox {
  /** centre of the writable area on the tag (avoids the twine hole) */
  cx: number;
  cy: number;
  /** writable width as a fraction of image width */
  w: number;
  /** rotation of the tag's long axis, CSS degrees (negative = rises to the right) */
  angle: number;
}

export interface PersonaImageMeta {
  src: string;
  /** optional 16:9 companion of the same scene, for full-bleed immersive
   *  backgrounds (H10, the reading). The 3:4 `src` stays the portrait master. */
  wide?: string;
  /** where that scene's own tag lies, in `wide` coordinates. The name is inked
   *  into this box exactly as `tag` does for the portrait master. */
  wideTag?: TagBox;
  tag: TagBox;
  /** glass focal point in the 16:9 screen master */
  wideGlass?: { x: number; y: number };
  /** where the drink's glow lives — the bloom's last spark dies here (beat 4) */
  glass: { x: number; y: number };
  /** optional per-image override for the spotlight's sharp radius (fraction of
   *  min(paintedW,paintedH)). Legacy field from the retired TheSurfacing reveal
   *  (now archived); unused by TheReading but kept so persona data stays stable. */
  focusFrac?: number;
}

/** The fallback carries the house pour (the Trickster) so the experience never breaks mid-rollout. */
const FALLBACK: PersonaImageMeta = {
  src: '/personas/_fallback.jpg',
  tag: { cx: 0.77, cy: 0.916, w: 0.26, angle: -17 },
  glass: { x: 0.5, y: 0.34 },
};

/** Keyed `<primary>-<secondary>` — lowercase, spaces→dashes (matches findPairing ids). */
const PERSONA_IMAGES: Record<string, PersonaImageMeta> = {
  'magician-outlaw': {
    src: '/personas/magician-outlaw/portrait.jpg',
    wide: '/personas/magician-outlaw/wide.jpg',
    tag: { cx: 0.695, cy: 0.729, w: 0.179, angle: 77 },
    wideTag: { cx: 0.646, cy: 0.729, w: 0.075, angle: 77 },
    wideGlass: { x: 0.61, y: 0.44 },
    glass: { x: 0.61, y: 0.44 },
  },
  'creator-caregiver': {
    src: '/personas/creator-caregiver/portrait.jpg',
    wide: '/personas/creator-caregiver/wide.jpg',
    tag: { cx: 0.632, cy: 0.657, w: 0.179, angle: 55 },
    wideTag: { cx: 0.661, cy: 0.657, w: 0.075, angle: 55 },
    wideGlass: { x: 0.615, y: 0.47 },
    glass: { x: 0.522, y: 0.47 },
  },
  'creator-jester': {
    src: '/personas/creator-jester/portrait.jpg',
    wide: '/personas/creator-jester/wide.jpg',
    tag: { cx: 0.701, cy: 0.759, w: 0.179, angle: 60 },
    wideTag: { cx: 0.69, cy: 0.759, w: 0.075, angle: 60 },
    wideGlass: { x: 0.635, y: 0.49 },
    glass: { x: 0.57, y: 0.49 },
  },
  'creator-lover': {
    src: '/personas/creator-lover/portrait.jpg',
    wide: '/personas/creator-lover/wide.jpg',
    tag: { cx: 0.728, cy: 0.71, w: 0.179, angle: 55 },
    wideTag: { cx: 0.67, cy: 0.71, w: 0.075, angle: 55 },
    wideGlass: { x: 0.615, y: 0.46 },
    glass: { x: 0.596, y: 0.46 },
  },
  'creator-magician': {
    src: '/personas/creator-magician/portrait.jpg',
    wide: '/personas/creator-magician/wide.jpg',
    tag: { cx: 0.683, cy: 0.745, w: 0.179, angle: 55 },
    wideTag: { cx: 0.641, cy: 0.745, w: 0.075, angle: 55 },
    wideGlass: { x: 0.56, y: 0.57 },
    glass: { x: 0.47, y: 0.57 },
  },
  'creator-outlaw': {
    src: '/personas/creator-outlaw/portrait.jpg',
    wide: '/personas/creator-outlaw/wide.jpg',
    tag: { cx: 0.673, cy: 0.682, w: 0.179, angle: 56 },
    wideTag: { cx: 0.647, cy: 0.682, w: 0.075, angle: 56 },
    wideGlass: { x: 0.62, y: 0.48 },
    glass: { x: 0.608, y: 0.48 },
  },
  'creator-regular-guy': {
    src: '/personas/creator-regular-guy/portrait.jpg',
    wide: '/personas/creator-regular-guy/wide.jpg',
    tag: { cx: 0.776, cy: 0.798, w: 0.179, angle: 52 },
    wideTag: { cx: 0.753, cy: 0.798, w: 0.075, angle: 52 },
    wideGlass: { x: 0.67, y: 0.53 },
    glass: { x: 0.579, y: 0.53 },
  },
  'creator-ruler': {
    src: '/personas/creator-ruler/portrait.jpg',
    wide: '/personas/creator-ruler/wide.jpg',
    tag: { cx: 0.638, cy: 0.632, w: 0.179, angle: 61 },
    wideTag: { cx: 0.695, cy: 0.632, w: 0.075, angle: 61 },
    wideGlass: { x: 0.635, y: 0.47 },
    glass: { x: 0.495, y: 0.47 },
  },
  'creator-sage': {
    src: '/personas/creator-sage/portrait.jpg',
    wide: '/personas/creator-sage/wide.jpg',
    tag: { cx: 0.652, cy: 0.687, w: 0.179, angle: 63 },
    wideTag: { cx: 0.586, cy: 0.687, w: 0.075, angle: 63 },
    wideGlass: { x: 0.52, y: 0.46 },
    glass: { x: 0.494, y: 0.46 },
  },
  'innocent-regular-guy': {
    src: '/personas/innocent-regular-guy/portrait.jpg',
    wide: '/personas/innocent-regular-guy/wide.jpg',
    tag: { cx: 0.701, cy: 0.724, w: 0.179, angle: 79 },
    wideTag: { cx: 0.69, cy: 0.724, w: 0.075, angle: 79 },
    wideGlass: { x: 0.62, y: 0.47 },
    glass: { x: 0.534, y: 0.47 },
  },
  'creator-hero': {
    src: '/personas/creator-hero/portrait.jpg',
    wide: '/personas/creator-hero/wide.jpg',
    tag: { cx: 0.632, cy: 0.792, w: 0.191, angle: 67 },
    wideTag: { cx: 0.682, cy: 0.792, w: 0.08, angle: 67 },
    wideGlass: { x: 0.625, y: 0.49 },
    glass: { x: 0.496, y: 0.49 },
  },
  'creator-innocent': {
    src: '/personas/creator-innocent/portrait.jpg',
    wide: '/personas/creator-innocent/wide.jpg',
    tag: { cx: 0.764, cy: 0.76, w: 0.191, angle: 74 },
    wideTag: { cx: 0.706, cy: 0.76, w: 0.08, angle: 74 },
    wideGlass: { x: 0.61, y: 0.53 },
    glass: { x: 0.535, y: 0.53 },
  },
  'creator-explorer': {
    src: '/personas/creator-explorer/portrait.jpg',
    wide: '/personas/creator-explorer/wide.jpg',
    tag: { cx: 0.65, cy: 0.67, w: 0.191, angle: 66 },
    wideTag: { cx: 0.648, cy: 0.67, w: 0.08, angle: 66 },
    wideGlass: { x: 0.625, y: 0.47 },
    glass: { x: 0.596, y: 0.47 },
  },
  // The Knight in Shining Armour — Lover × Hero. The rain-marked scarf,
  // softened gloves and repaired linen make devotion an action, not a symbol.
  'lover-hero': {
    src: '/personas/lover-hero/portrait.jpg',
    wide: '/personas/lover-hero/wide.jpg',
    tag: { cx: 0.72, cy: 0.77, w: 0.25, angle: 27 },
    wideTag: { cx: 0.745, cy: 0.77, w: 0.105, angle: 27 },
    wideGlass: { x: 0.61, y: 0.45 },
    glass: { x: 0.399, y: 0.45 },
  },
  // The Connoisseur — Sage × Lover. The preserved notebook, kept letter and
  // paired samples carry the story; the sage-topped drink remains the hero.
  'sage-lover': {
    src: '/personas/sage-lover/portrait.jpg',
    wide: '/personas/sage-lover/wide.jpg',
    tag: { cx: 0.719, cy: 0.696, w: 0.179, angle: 62 },
    wideTag: { cx: 0.677, cy: 0.696, w: 0.075, angle: 62 },
    wideGlass: { x: 0.62, y: 0.47 },
    glass: { x: 0.584, y: 0.47 },
  },
};

export function personaKey(primary: string, secondary: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  return `${norm(primary)}-${norm(secondary)}`;
}

export function personaImageFor(primary: string, secondary: string): PersonaImageMeta {
  return PERSONA_IMAGES[personaKey(primary, secondary)] ?? FALLBACK;
}
