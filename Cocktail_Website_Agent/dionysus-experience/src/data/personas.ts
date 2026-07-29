// Persona image metadata — the 132 pre-authored cocktail portraits.
// Spec: design-artifacts/2026-07-07-the-surfacing-reveal-design.md §4, amended by
// design-artifacts/2026-07-08-experience-master-spec.md: images are 3:4 portrait
// (896×1200 masters), and instead of one fixed tag box, each image records where
// its own in-scene tag actually lies — the name is inked into that transform.
// The image itself is sacred: never tinted, graded, or overlaid.

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
  /** optional 4:3 companion of the same scene, for full-bleed immersive
   *  backgrounds (H10, the reading). The 3:4 `src` stays the portrait master. */
  wide?: string;
  /** where that scene's own tag lies, in `wide` coordinates. The name is inked
   *  into this box exactly as `tag` does for the portrait master. */
  wideTag?: TagBox;
  tag: TagBox;
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
    src: '/personas/magician-outlaw.jpg',
    tag: { cx: 0.77, cy: 0.916, w: 0.26, angle: -17 },
    glass: { x: 0.5, y: 0.34 },
  },
  'creator-hero': {
    src: '/personas/creator-hero.jpg',
    tag: { cx: 0.745, cy: 0.912, w: 0.24, angle: -10 },
    glass: { x: 0.49, y: 0.47 },
  },
  // The Connoisseur — Sage × Lover. Natural in-scene tag (lower-right, lying on
  // the table, rounded twine end up-left → falls to the right, so +angle). The
  // aroma plume rises well above the glass; it dissolves into the blurred
  // surround by design, so the default focus radius stands.
  'sage-lover': {
    src: '/personas/sage-lover.jpg',
    wide: '/personas/sage-lover-43.jpg',
    wideTag: { cx: 0.677, cy: 0.848, w: 0.165, angle: 10 },
    tag: { cx: 0.72, cy: 0.875, w: 0.2, angle: 26 },
    glass: { x: 0.5, y: 0.57 },
  },
};

export function personaKey(primary: string, secondary: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  return `${norm(primary)}-${norm(secondary)}`;
}

export function personaImageFor(primary: string, secondary: string): PersonaImageMeta {
  return PERSONA_IMAGES[personaKey(primary, secondary)] ?? FALLBACK;
}
