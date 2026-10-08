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
  /** absent only on the stand-in, which has no tag: no name is inked */
  tag?: TagBox;
  /** glass focal point in the 16:9 screen master */
  wideGlass?: { x: number; y: number };
  /** where the drink's glow lives — the bloom's last spark dies here (beat 4) */
  glass: { x: number; y: number };
  /** optional per-image override for the spotlight's sharp radius (fraction of
   *  min(paintedW,paintedH)). Legacy field from the retired TheSurfacing reveal
   *  (now archived); unused by TheReading but kept so persona data stays stable. */
  focusFrac?: number;
}

/** The stand-in for a pairing with no registered scene yet. It must never
 *  pass for another guest's cocktail (Robin, 2026-10-08: the old stand-in, a
 *  green coupe on a house of cards, read as the wrong drink), so it shows no
 *  glass and no tag: the journey's own amber bubbles, and no inked name. */
export const PERSONA_FALLBACK: PersonaImageMeta = {
  src: '/personas/_fallback.jpg',
  wide: '/personas/_fallback-wide.jpg',
  glass: { x: 0.5, y: 0.5 },
  wideGlass: { x: 0.5, y: 0.5 },
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
  // The Healer — Caregiver × Magician. The repaired errand bag and syrup
  // prepared in advance make the care practical rather than medicinal.
  'caregiver-magician': {
    src: '/personas/caregiver-magician/portrait.jpg',
    wide: '/personas/caregiver-magician/wide.jpg',
    tag: { cx: 0.76, cy: 0.795, w: 0.25, angle: 18 },
    wideTag: { cx: 0.83, cy: 0.795, w: 0.105, angle: 18 },
    wideGlass: { x: 0.632, y: 0.53 },
    glass: { x: 0.29, y: 0.53 },
  },
  // The Nanny — Caregiver × Ruler. The clock and the same glass measure used
  // throughout turn restraint into a quiet act of care.
  'caregiver-ruler': {
    src: '/personas/caregiver-ruler/portrait.jpg',
    wide: '/personas/caregiver-ruler/wide.jpg',
    tag: { cx: 0.76, cy: 0.8, w: 0.26, angle: 20 },
    wideTag: { cx: 0.782, cy: 0.8, w: 0.109, angle: 20 },
    wideGlass: { x: 0.576, y: 0.52 },
    glass: { x: 0.279, y: 0.52 },
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
  // ── Provisional images (Robin, 2026-10-08) ─────────────────────────────
  // Robin approved every selected draft from image production for now, so
  // every pairing has its own scene while acceptance checks continue. Source:
  // design-artifacts/_image-production/2026-10-06/queue.json
  // (progress.selectedCandidates); coordinates are each export's
  // runtimeCandidate. Material, personality, tag and browser holds recorded
  // there still stand; replace an entry when its corrected version lands.
  // Not Only the Way (v4)
  'caregiver-creator': {
    src: '/personas/caregiver-creator/portrait.jpg',
    wide: '/personas/caregiver-creator/wide.jpg',
    tag: { cx: 0.688, cy: 0.629, w: 0.204, angle: 22.0 },
    wideTag: { cx: 0.678, cy: 0.629, w: 0.086, angle: 22.0 },
    wideGlass: { x: 0.617, y: 0.456 },
    glass: { x: 0.544, y: 0.456 },
  },
  // Serviceable (v2)
  'caregiver-explorer': {
    src: '/personas/caregiver-explorer/portrait.jpg',
    wide: '/personas/caregiver-explorer/wide.jpg',
    tag: { cx: 0.326, cy: 0.737, w: 0.275, angle: 0.5 },
    wideTag: { cx: 0.601, cy: 0.737, w: 0.116, angle: 0.5 },
    wideGlass: { x: 0.59, y: 0.497 },
    glass: { x: 0.301, y: 0.497 },
  },
  // Off Duty (v3)
  'caregiver-hero': {
    src: '/personas/caregiver-hero/portrait.jpg',
    wide: '/personas/caregiver-hero/wide.jpg',
    tag: { cx: 0.63, cy: 0.61, w: 0.152, angle: -4.6 },
    wideTag: { cx: 0.653, cy: 0.61, w: 0.064, angle: -4.6 },
    wideGlass: { x: 0.601, y: 0.54 },
    glass: { x: 0.506, y: 0.54 },
  },
  // Before the Room (v5)
  'caregiver-innocent': {
    src: '/personas/caregiver-innocent/portrait.jpg',
    wide: '/personas/caregiver-innocent/wide.jpg',
    tag: { cx: 0.701, cy: 0.824, w: 0.271, angle: 10.0 },
    wideTag: { cx: 0.773, cy: 0.824, w: 0.114, angle: 10.0 },
    wideGlass: { x: 0.646, y: 0.383 },
    glass: { x: 0.399, y: 0.383 },
  },
  // Worth the Trip (v3)
  'caregiver-jester': {
    src: '/personas/caregiver-jester/portrait.jpg',
    wide: '/personas/caregiver-jester/wide.jpg',
    tag: { cx: 0.403, cy: 0.746, w: 0.308, angle: 1.7 },
    wideTag: { cx: 0.654, cy: 0.746, w: 0.129, angle: 1.7 },
    wideGlass: { x: 0.61, y: 0.513 },
    glass: { x: 0.299, y: 0.513 },
  },
  // Standing By (v3)
  'caregiver-lover': {
    src: '/personas/caregiver-lover/portrait.jpg',
    wide: '/personas/caregiver-lover/wide.jpg',
    tag: { cx: 0.731, cy: 0.683, w: 0.229, angle: 1.0 },
    wideTag: { cx: 0.74, cy: 0.683, w: 0.096, angle: 1.0 },
    wideGlass: { x: 0.641, y: 0.486 },
    glass: { x: 0.493, y: 0.486 },
  },
  // Not Too Polite (v5)
  'caregiver-outlaw': {
    src: '/personas/caregiver-outlaw/portrait.jpg',
    wide: '/personas/caregiver-outlaw/wide.jpg',
    tag: { cx: 0.373, cy: 0.734, w: 0.319, angle: 0 },
    wideTag: { cx: 0.622, cy: 0.734, w: 0.134, angle: 0 },
    wideGlass: { x: 0.594, y: 0.499 },
    glass: { x: 0.308, y: 0.499 },
  },
  // Everybody's (v2)
  'caregiver-regular-guy': {
    src: '/personas/caregiver-regular-guy/portrait.jpg',
    wide: '/personas/caregiver-regular-guy/wide.jpg',
    tag: { cx: 0.658, cy: 0.779, w: 0.207, angle: 2.7 },
    wideTag: { cx: 0.689, cy: 0.779, w: 0.087, angle: 2.7 },
    wideGlass: { x: 0.613, y: 0.619 },
    glass: { x: 0.477, y: 0.619 },
  },
  // Instead (v2)
  'caregiver-sage': {
    src: '/personas/caregiver-sage/portrait.jpg',
    wide: '/personas/caregiver-sage/wide.jpg',
    tag: { cx: 0.724, cy: 0.707, w: 0.249, angle: 4.0 },
    wideTag: { cx: 0.722, cy: 0.707, w: 0.105, angle: 4.0 },
    wideGlass: { x: 0.603, y: 0.534 },
    glass: { x: 0.439, y: 0.534 },
  },
  // Left Standing (v3)
  'explorer-caregiver': {
    src: '/personas/explorer-caregiver/portrait.jpg',
    wide: '/personas/explorer-caregiver/wide.jpg',
    tag: { cx: 0.642, cy: 0.733, w: 0.268, angle: 4.0 },
    wideTag: { cx: 0.697, cy: 0.733, w: 0.112, angle: 4.0 },
    wideGlass: { x: 0.582, y: 0.533 },
    glass: { x: 0.368, y: 0.533 },
  },
  // For Good (v2)
  'explorer-creator': {
    src: '/personas/explorer-creator/portrait.jpg',
    wide: '/personas/explorer-creator/wide.jpg',
    tag: { cx: 0.379, cy: 0.732, w: 0.167, angle: 70 },
    wideTag: { cx: 0.621, cy: 0.732, w: 0.07, angle: 70 },
    wideGlass: { x: 0.579, y: 0.398 },
    glass: { x: 0.28, y: 0.398 },
  },
  // Nothing to It (v5)
  'explorer-hero': {
    src: '/personas/explorer-hero/portrait.jpg',
    wide: '/personas/explorer-hero/wide.jpg',
    tag: { cx: 0.43, cy: 0.677, w: 0.292, angle: 1.7 },
    wideTag: { cx: 0.623, cy: 0.677, w: 0.123, angle: 1.7 },
    wideGlass: { x: 0.597, y: 0.529 },
    glass: { x: 0.369, y: 0.529 },
  },
  // In a Minute (v4)
  'explorer-innocent': {
    src: '/personas/explorer-innocent/portrait.jpg',
    wide: '/personas/explorer-innocent/wide.jpg',
    tag: { cx: 0.631, cy: 0.67, w: 0.271, angle: 3.5 },
    wideTag: { cx: 0.693, cy: 0.67, w: 0.114, angle: 3.5 },
    wideGlass: { x: 0.583, y: 0.491 },
    glass: { x: 0.369, y: 0.491 },
  },
  // Why Not? (v2)
  'explorer-jester': {
    src: '/personas/explorer-jester/portrait.jpg',
    wide: '/personas/explorer-jester/wide.jpg',
    tag: { cx: 0.922, cy: 0.77, w: 0.107, angle: 44.0 },
    wideTag: { cx: 0.895, cy: 0.77, w: 0.045, angle: 44.0 },
    wideGlass: { x: 0.752, y: 0.603 },
    glass: { x: 0.581, y: 0.603 },
  },
  // Straight Back (v2)
  'explorer-lover': {
    src: '/personas/explorer-lover/portrait.jpg',
    wide: '/personas/explorer-lover/wide.jpg',
    tag: { cx: 0.524, cy: 0.75, w: 0.11, angle: 65.0 },
    wideTag: { cx: 0.701, cy: 0.75, w: 0.046, angle: 65.0 },
    wideGlass: { x: 0.596, y: 0.601 },
    glass: { x: 0.275, y: 0.601 },
  },
  // Just Knew (v2)
  'explorer-magician': {
    src: '/personas/explorer-magician/portrait.jpg',
    wide: '/personas/explorer-magician/wide.jpg',
    tag: { cx: 0.896, cy: 0.671, w: 0.194, angle: 75.0 },
    wideTag: { cx: 0.703, cy: 0.679, w: 0.085, angle: 75.0 },
    wideGlass: { x: 0.579, y: 0.52 },
    glass: { x: 0.613, y: 0.519 },
  },
  // Fine by Me (v4)
  'explorer-outlaw': {
    src: '/personas/explorer-outlaw/portrait.jpg',
    wide: '/personas/explorer-outlaw/wide.jpg',
    tag: { cx: 0.117, cy: 0.702, w: 0.182, angle: -68.0 },
    wideTag: { cx: 0.468, cy: 0.702, w: 0.077, angle: -68.0 },
    wideGlass: { x: 0.566, y: 0.537 },
    glass: { x: 0.35, y: 0.537 },
  },
  // Brought Home (v2/jpeg-review-2026-10-08)
  'explorer-regular-guy': {
    src: '/personas/explorer-regular-guy/portrait.jpg',
    wide: '/personas/explorer-regular-guy/wide.jpg',
    tag: { cx: 0.868, cy: 0.78, w: 0.125, angle: 53.0 },
    wideTag: { cx: 0.732, cy: 0.78, w: 0.053, angle: 53.0 },
    wideGlass: { x: 0.659, y: 0.571 },
    glass: { x: 0.694, y: 0.571 },
  },
  // Far Enough (v2)
  'explorer-ruler': {
    src: '/personas/explorer-ruler/portrait.jpg',
    wide: '/personas/explorer-ruler/wide.jpg',
    tag: { cx: 0.563, cy: 0.65, w: 0.204, angle: 75.0 },
    wideTag: { cx: 0.731, cy: 0.656, w: 0.089, angle: 75.0 },
    wideGlass: { x: 0.604, y: 0.512 },
    glass: { x: 0.274, y: 0.513 },
  },
  // Show Your Working (v2)
  'explorer-sage': {
    src: '/personas/explorer-sage/portrait.jpg',
    wide: '/personas/explorer-sage/wide.jpg',
    tag: { cx: 0.581, cy: 0.784, w: 0.104, angle: 63.0 },
    wideTag: { cx: 0.743, cy: 0.784, w: 0.044, angle: 63.0 },
    wideGlass: { x: 0.66, y: 0.599 },
    glass: { x: 0.385, y: 0.599 },
  },
  // Next One's Mine (v3)
  'hero-caregiver': {
    src: '/personas/hero-caregiver/portrait.jpg',
    wide: '/personas/hero-caregiver/wide.jpg',
    tag: { cx: 0.41, cy: 0.666, w: 0.165, angle: 7.5 },
    wideTag: { cx: 0.669, cy: 0.666, w: 0.069, angle: 7.5 },
    wideGlass: { x: 0.617, y: 0.529 },
    glass: { x: 0.286, y: 0.529 },
  },
  // The Long Answer (v2)
  'hero-creator': {
    src: '/personas/hero-creator/portrait.jpg',
    wide: '/personas/hero-creator/wide.jpg',
    tag: { cx: 0.805, cy: 0.789, w: 0.178, angle: 36.0 },
    wideTag: { cx: 0.791, cy: 0.789, w: 0.075, angle: 36.0 },
    wideGlass: { x: 0.722, y: 0.579 },
    glass: { x: 0.64, y: 0.579 },
  },
  // Someone Else's Map (v2)
  'hero-explorer': {
    src: '/personas/hero-explorer/portrait.jpg',
    wide: '/personas/hero-explorer/wide.jpg',
    tag: { cx: 0.724, cy: 0.687, w: 0.222, angle: 9.4 },
    wideTag: { cx: 0.723, cy: 0.687, w: 0.093, angle: 9.4 },
    wideGlass: { x: 0.659, y: 0.532 },
    glass: { x: 0.57, y: 0.532 },
  },
  // Work It Out (v2)
  'hero-innocent': {
    src: '/personas/hero-innocent/portrait.jpg',
    wide: '/personas/hero-innocent/wide.jpg',
    tag: { cx: 0.774, cy: 0.774, w: 0.121, angle: 57.0 },
    wideTag: { cx: 0.719, cy: 0.774, w: 0.051, angle: 57.0 },
    wideGlass: { x: 0.624, y: 0.556 },
    glass: { x: 0.547, y: 0.556 },
  },
  // Hold the Shark (v2)
  'hero-jester': {
    src: '/personas/hero-jester/portrait.jpg',
    wide: '/personas/hero-jester/wide.jpg',
    tag: { cx: 0.872, cy: 0.804, w: 0.116, angle: 39.0 },
    wideTag: { cx: 0.89, cy: 0.804, w: 0.049, angle: 39.0 },
    wideGlass: { x: 0.759, y: 0.648 },
    glass: { x: 0.558, y: 0.648 },
  },
  // One Line (v3)
  'hero-lover': {
    src: '/personas/hero-lover/portrait.jpg',
    wide: '/personas/hero-lover/wide.jpg',
    tag: { cx: 0.567, cy: 0.59, w: 0.212, angle: 30.0 },
    wideTag: { cx: 0.708, cy: 0.603, w: 0.103, angle: 30.0 },
    wideGlass: { x: 0.64, y: 0.319 },
    glass: { x: 0.426, y: 0.345 },
  },
  // Day Job (v2)
  'hero-magician': {
    src: '/personas/hero-magician/portrait.jpg',
    wide: '/personas/hero-magician/wide.jpg',
    tag: { cx: 0.561, cy: 0.603, w: 0.218, angle: 17.0 },
    wideTag: { cx: 0.67, cy: 0.603, w: 0.092, angle: 17.0 },
    wideGlass: { x: 0.603, y: 0.341 },
    glass: { x: 0.403, y: 0.341 },
  },
  // No Promises (v2)
  'hero-outlaw': {
    src: '/personas/hero-outlaw/portrait.jpg',
    wide: '/personas/hero-outlaw/wide.jpg',
    tag: { cx: 0.558, cy: 0.669, w: 0.211, angle: 80.0 },
    wideTag: { cx: 0.695, cy: 0.669, w: 0.089, angle: 80.0 },
    wideGlass: { x: 0.566, y: 0.587 },
    glass: { x: 0.251, y: 0.587 },
  },
  // Anyone Would Have (v2)
  'hero-regular-guy': {
    src: '/personas/hero-regular-guy/portrait.jpg',
    wide: '/personas/hero-regular-guy/wide.jpg',
    tag: { cx: 0.822, cy: 0.776, w: 0.251, angle: 14.0 },
    wideTag: { cx: 0.698, cy: 0.776, w: 0.105, angle: 14.0 },
    wideGlass: { x: 0.51, y: 0.555 },
    glass: { x: 0.375, y: 0.555 },
  },
  // Dressed for It (v2)
  'hero-ruler': {
    src: '/personas/hero-ruler/portrait.jpg',
    wide: '/personas/hero-ruler/wide.jpg',
    tag: { cx: 0.849, cy: 0.731, w: 0.266, angle: 5.0 },
    wideTag: { cx: 0.749, cy: 0.731, w: 0.112, angle: 5.0 },
    wideGlass: { x: 0.645, y: 0.543 },
    glass: { x: 0.601, y: 0.543 },
  },
  // Leave It With Me (v2)
  'hero-sage': {
    src: '/personas/hero-sage/portrait.jpg',
    wide: '/personas/hero-sage/wide.jpg',
    tag: { cx: 0.613, cy: 0.659, w: 0.168, angle: 8.0 },
    wideTag: { cx: 0.754, cy: 0.659, w: 0.071, angle: 8.0 },
    wideGlass: { x: 0.644, y: 0.503 },
    glass: { x: 0.352, y: 0.503 },
  },
  // Night Light (v2)
  'innocent-caregiver': {
    src: '/personas/innocent-caregiver/portrait.jpg',
    wide: '/personas/innocent-caregiver/wide.jpg',
    tag: { cx: 0.516, cy: 0.635, w: 0.305, angle: 11.3 },
    wideTag: { cx: 0.665, cy: 0.635, w: 0.128, angle: 11.3 },
    wideGlass: { x: 0.557, y: 0.361 },
    glass: { x: 0.258, y: 0.361 },
  },
  // The Way It Felt (v2)
  'innocent-creator': {
    src: '/personas/innocent-creator/portrait.jpg',
    wide: '/personas/innocent-creator/wide.jpg',
    tag: { cx: 0.446, cy: 0.761, w: 0.155, angle: 61 },
    wideTag: { cx: 0.693, cy: 0.761, w: 0.065, angle: 61 },
    wideGlass: { x: 0.598, y: 0.531 },
    glass: { x: 0.22, y: 0.531 },
  },
  // The First Guess (v2)
  'innocent-explorer': {
    src: '/personas/innocent-explorer/portrait.jpg',
    wide: '/personas/innocent-explorer/wide.jpg',
    tag: { cx: 0.732, cy: 0.69, w: 0.293, angle: 6.7 },
    wideTag: { cx: 0.711, cy: 0.69, w: 0.123, angle: 6.7 },
    wideGlass: { x: 0.594, y: 0.472 },
    glass: { x: 0.456, y: 0.472 },
  },
  // Straight Up (v3)
  'innocent-hero': {
    src: '/personas/innocent-hero/portrait.jpg',
    wide: '/personas/innocent-hero/wide.jpg',
    tag: { cx: 0.588, cy: 0.628, w: 0.108, angle: 24.0 },
    wideTag: { cx: 0.629, cy: 0.628, w: 0.045, angle: 24.0 },
    wideGlass: { x: 0.592, y: 0.448 },
    glass: { x: 0.5, y: 0.448 },
  },
  // There It Goes (v3)
  'innocent-jester': {
    src: '/personas/innocent-jester/portrait.jpg',
    wide: '/personas/innocent-jester/wide.jpg',
    tag: { cx: 0.634, cy: 0.69, w: 0.187, angle: 25.0 },
    wideTag: { cx: 0.752, cy: 0.69, w: 0.078, angle: 25.0 },
    wideGlass: { x: 0.696, y: 0.418 },
    glass: { x: 0.5, y: 0.418 },
  },
  // The Big Words (v2)
  'innocent-lover': {
    src: '/personas/innocent-lover/portrait.jpg',
    wide: '/personas/innocent-lover/wide.jpg',
    tag: { cx: 0.624, cy: 0.722, w: 0.345, angle: 5.1 },
    wideTag: { cx: 0.711, cy: 0.722, w: 0.145, angle: 5.1 },
    wideGlass: { x: 0.595, y: 0.363 },
    glass: { x: 0.349, y: 0.363 },
  },
  // Let's Try It (v2)
  'innocent-magician': {
    src: '/personas/innocent-magician/portrait.jpg',
    wide: '/personas/innocent-magician/wide.jpg',
    tag: { cx: 0.333, cy: 0.697, w: 0.101, angle: 57.0 },
    wideTag: { cx: 0.632, cy: 0.697, w: 0.042, angle: 57.0 },
    wideGlass: { x: 0.572, y: 0.497 },
    glass: { x: 0.189, y: 0.497 },
  },
  // Fresh Air (v2)
  'innocent-outlaw': {
    src: '/personas/innocent-outlaw/portrait.jpg',
    wide: '/personas/innocent-outlaw/wide.jpg',
    tag: { cx: 0.447, cy: 0.688, w: 0.212, angle: 11.5 },
    wideTag: { cx: 0.673, cy: 0.688, w: 0.089, angle: 11.5 },
    wideGlass: { x: 0.596, y: 0.547 },
    glass: { x: 0.262, y: 0.547 },
  },
  // Whole World (v2)
  'innocent-ruler': {
    src: '/personas/innocent-ruler/portrait.jpg',
    wide: '/personas/innocent-ruler/wide.jpg',
    tag: { cx: 0.678, cy: 0.644, w: 0.222, angle: 14.7 },
    wideTag: { cx: 0.747, cy: 0.644, w: 0.093, angle: 14.7 },
    wideGlass: { x: 0.661, y: 0.422 },
    glass: { x: 0.474, y: 0.422 },
  },
  // Just So You Know (v5)
  'innocent-sage': {
    src: '/personas/innocent-sage/portrait.jpg',
    wide: '/personas/innocent-sage/wide.jpg',
    tag: { cx: 0.625, cy: 0.63, w: 0.158, angle: 13.0 },
    wideTag: { cx: 0.623, cy: 0.63, w: 0.066, angle: 13.0 },
    wideGlass: { x: 0.563, y: 0.431 },
    glass: { x: 0.483, y: 0.431 },
  },
  // Anyway (v4)
  'jester-caregiver': {
    src: '/personas/jester-caregiver/portrait.jpg',
    wide: '/personas/jester-caregiver/wide.jpg',
    tag: { cx: 0.637, cy: 0.687, w: 0.234, angle: 24.0 },
    wideTag: { cx: 0.624, cy: 0.687, w: 0.098, angle: 24.0 },
    wideGlass: { x: 0.546, y: 0.397 },
    glass: { x: 0.452, y: 0.397 },
  },
  // For Kicks (v2)
  'jester-creator': {
    src: '/personas/jester-creator/portrait.jpg',
    wide: '/personas/jester-creator/wide.jpg',
    tag: { cx: 0.671, cy: 0.694, w: 0.17, angle: 20.0 },
    wideTag: { cx: 0.79, cy: 0.694, w: 0.071, angle: 20.0 },
    wideGlass: { x: 0.725, y: 0.428 },
    glass: { x: 0.517, y: 0.428 },
  },
  // Unrehearsed (v2)
  'jester-explorer': {
    src: '/personas/jester-explorer/portrait.jpg',
    wide: '/personas/jester-explorer/wide.jpg',
    tag: { cx: 0.506, cy: 0.728, w: 0.149, angle: 55 },
    wideTag: { cx: 0.668, cy: 0.728, w: 0.062, angle: 55 },
    wideGlass: { x: 0.568, y: 0.53 },
    glass: { x: 0.266, y: 0.53 },
  },
  // The Wink (v2)
  'jester-hero': {
    src: '/personas/jester-hero/portrait.jpg',
    wide: '/personas/jester-hero/wide.jpg',
    tag: { cx: 0.462, cy: 0.704, w: 0.142, angle: 88.0 },
    wideTag: { cx: 0.734, cy: 0.704, w: 0.06, angle: 88.0 },
    wideGlass: { x: 0.661, y: 0.634 },
    glass: { x: 0.289, y: 0.634 },
  },
  // Off the Tour (v2)
  'jester-innocent': {
    src: '/personas/jester-innocent/portrait.jpg',
    wide: '/personas/jester-innocent/wide.jpg',
    tag: { cx: 0.62, cy: 0.817, w: 0.073, angle: 66.0 },
    wideTag: { cx: 0.733, cy: 0.817, w: 0.031, angle: 66.0 },
    wideGlass: { x: 0.673, y: 0.655 },
    glass: { x: 0.477, y: 0.655 },
  },
  // I'll Tell You Later (v2)
  'jester-lover': {
    src: '/personas/jester-lover/portrait.jpg',
    wide: '/personas/jester-lover/wide.jpg',
    tag: { cx: 0.499, cy: 0.788, w: 0.117, angle: 67.0 },
    wideTag: { cx: 0.688, cy: 0.788, w: 0.049, angle: 67.0 },
    wideGlass: { x: 0.583, y: 0.643 },
    glass: { x: 0.249, y: 0.643 },
  },
  // The Kind You'd Want (v2)
  'jester-magician': {
    src: '/personas/jester-magician/portrait.jpg',
    wide: '/personas/jester-magician/wide.jpg',
    tag: { cx: 0.442, cy: 0.668, w: 0.068, angle: 65.0 },
    wideTag: { cx: 0.73, cy: 0.668, w: 0.029, angle: 65.0 },
    wideGlass: { x: 0.673, y: 0.548 },
    glass: { x: 0.308, y: 0.548 },
  },
  // Quote Me (v2)
  'jester-outlaw': {
    src: '/personas/jester-outlaw/portrait.jpg',
    wide: '/personas/jester-outlaw/wide.jpg',
    tag: { cx: 0.547, cy: 0.687, w: 0.103, angle: 73.0 },
    wideTag: { cx: 0.723, cy: 0.687, w: 0.043, angle: 73.0 },
    wideGlass: { x: 0.66, y: 0.573 },
    glass: { x: 0.397, y: 0.573 },
  },
  // Is It Just Me (v2)
  'jester-regular-guy': {
    src: '/personas/jester-regular-guy/portrait.jpg',
    wide: '/personas/jester-regular-guy/wide.jpg',
    tag: { cx: 0.547, cy: 0.766, w: 0.061, angle: 67.0 },
    wideTag: { cx: 0.672, cy: 0.766, w: 0.026, angle: 67.0 },
    wideGlass: { x: 0.652, y: 0.594 },
    glass: { x: 0.499, y: 0.594 },
  },
  // Don't Look at Me (v2)
  'jester-ruler': {
    src: '/personas/jester-ruler/portrait.jpg',
    wide: '/personas/jester-ruler/wide.jpg',
    tag: { cx: 0.37, cy: 0.723, w: 0.111, angle: 71.0 },
    wideTag: { cx: 0.73, cy: 0.723, w: 0.047, angle: 71.0 },
    wideGlass: { x: 0.654, y: 0.584 },
    glass: { x: 0.189, y: 0.584 },
  },
  // Against My Better Judgement (v2)
  'jester-sage': {
    src: '/personas/jester-sage/portrait.jpg',
    wide: '/personas/jester-sage/wide.jpg',
    tag: { cx: 0.531, cy: 0.574, w: 0.111, angle: 32.5 },
    wideTag: { cx: 0.714, cy: 0.574, w: 0.047, angle: 32.5 },
    wideGlass: { x: 0.652, y: 0.347 },
    glass: { x: 0.383, y: 0.347 },
  },
  // Hoping You'd Come (v2)
  'lover-caregiver': {
    src: '/personas/lover-caregiver/portrait.jpg',
    wide: '/personas/lover-caregiver/wide.jpg',
    tag: { cx: 0.386, cy: 0.757, w: 0.088, angle: 60.0 },
    wideTag: { cx: 0.661, cy: 0.757, w: 0.037, angle: 60.0 },
    wideGlass: { x: 0.633, y: 0.596 },
    glass: { x: 0.318, y: 0.596 },
  },
  // In Your Own Hand (v2)
  'lover-creator': {
    src: '/personas/lover-creator/portrait.jpg',
    wide: '/personas/lover-creator/wide.jpg',
    tag: { cx: 0.584, cy: 0.643, w: 0.105, angle: 66.0 },
    wideTag: { cx: 0.64, cy: 0.643, w: 0.044, angle: 66.0 },
    wideGlass: { x: 0.598, y: 0.548 },
    glass: { x: 0.484, y: 0.548 },
  },
  // Curtain Call (v2)
  'lover-explorer': {
    src: '/personas/lover-explorer/portrait.jpg',
    wide: '/personas/lover-explorer/wide.jpg',
    tag: { cx: 0.728, cy: 0.695, w: 0.114, angle: 73.0 },
    wideTag: { cx: 0.742, cy: 0.695, w: 0.048, angle: 73.0 },
    wideGlass: { x: 0.719, y: 0.48 },
    glass: { x: 0.674, y: 0.48 },
  },
  // Wide Open (v2)
  'lover-innocent': {
    src: '/personas/lover-innocent/portrait.jpg',
    wide: '/personas/lover-innocent/wide.jpg',
    tag: { cx: 0.682, cy: 0.634, w: 0.199, angle: 6.4 },
    wideTag: { cx: 0.703, cy: 0.634, w: 0.084, angle: 6.4 },
    wideGlass: { x: 0.642, y: 0.499 },
    glass: { x: 0.538, y: 0.499 },
  },
  // Only Half Joking (v3)
  'lover-jester': {
    src: '/personas/lover-jester/portrait.jpg',
    wide: '/personas/lover-jester/wide.jpg',
    tag: { cx: 0.527, cy: 0.727, w: 0.219, angle: 9.0 },
    wideTag: { cx: 0.693, cy: 0.747, w: 0.1, angle: 9.0 },
    wideGlass: { x: 0.615, y: 0.38 },
    glass: { x: 0.357, y: 0.39 },
  },
  // Worth Finding (v2)
  'lover-magician': {
    src: '/personas/lover-magician/portrait.jpg',
    wide: '/personas/lover-magician/wide.jpg',
    tag: { cx: 0.783, cy: 0.686, w: 0.221, angle: 19.0 },
    wideTag: { cx: 0.748, cy: 0.686, w: 0.093, angle: 19.0 },
    wideGlass: { x: 0.643, y: 0.41 },
    glass: { x: 0.534, y: 0.41 },
  },
  // Accomplices (v2)
  'lover-outlaw': {
    src: '/personas/lover-outlaw/portrait.jpg',
    wide: '/personas/lover-outlaw/wide.jpg',
    tag: { cx: 0.591, cy: 0.744, w: 0.219, angle: 15.5 },
    wideTag: { cx: 0.688, cy: 0.744, w: 0.092, angle: 15.5 },
    wideGlass: { x: 0.611, y: 0.482 },
    glass: { x: 0.407, y: 0.482 },
  },
  // Any Day (v2)
  'lover-regular-guy': {
    src: '/personas/lover-regular-guy/portrait.jpg',
    wide: '/personas/lover-regular-guy/wide.jpg',
    tag: { cx: 0.44, cy: 0.554, w: 0.194, angle: -1.5 },
    wideTag: { cx: 0.64, cy: 0.554, w: 0.081, angle: -1.5 },
    wideGlass: { x: 0.593, y: 0.514 },
    glass: { x: 0.329, y: 0.514 },
  },
  // By Design (v2)
  'lover-ruler': {
    src: '/personas/lover-ruler/portrait.jpg',
    wide: '/personas/lover-ruler/wide.jpg',
    tag: { cx: 0.46, cy: 0.659, w: 0.214, angle: 69.5 },
    wideTag: { cx: 0.578, cy: 0.659, w: 0.09, angle: 69.5 },
    wideGlass: { x: 0.531, y: 0.507 },
    glass: { x: 0.349, y: 0.507 },
  },
  // In Kind (v2)
  'lover-sage': {
    src: '/personas/lover-sage/portrait.jpg',
    wide: '/personas/lover-sage/wide.jpg',
    tag: { cx: 0.59, cy: 0.772, w: 0.199, angle: 11.4 },
    wideTag: { cx: 0.678, cy: 0.772, w: 0.084, angle: 11.4 },
    wideGlass: { x: 0.578, y: 0.543 },
    glass: { x: 0.352, y: 0.543 },
  },
  // Their Night (v2)
  'magician-caregiver': {
    src: '/personas/magician-caregiver/portrait.jpg',
    wide: '/personas/magician-caregiver/wide.jpg',
    tag: { cx: 0.685, cy: 0.67, w: 0.093, angle: 80.0 },
    wideTag: { cx: 0.647, cy: 0.67, w: 0.039, angle: 80.0 },
    wideGlass: { x: 0.623, y: 0.43 },
    glass: { x: 0.63, y: 0.43 },
  },
  // On One Condition (v2)
  'magician-creator': {
    src: '/personas/magician-creator/portrait.jpg',
    wide: '/personas/magician-creator/wide.jpg',
    tag: { cx: 0.472, cy: 0.721, w: 0.114, angle: 84.0 },
    wideTag: { cx: 0.699, cy: 0.721, w: 0.048, angle: 84.0 },
    wideGlass: { x: 0.639, y: 0.587 },
    glass: { x: 0.329, y: 0.587 },
  },
  // One More Adjustment (v2)
  'magician-explorer': {
    src: '/personas/magician-explorer/portrait.jpg',
    wide: '/personas/magician-explorer/wide.jpg',
    tag: { cx: 0.695, cy: 0.504, w: 0.199, angle: 15.7 },
    wideTag: { cx: 0.761, cy: 0.504, w: 0.087, angle: 15.7 },
    wideGlass: { x: 0.646, y: 0.383 },
    glass: { x: 0.432, y: 0.388 },
  },
  // Worth the Trade (v2)
  'magician-hero': {
    src: '/personas/magician-hero/portrait.jpg',
    wide: '/personas/magician-hero/wide.jpg',
    tag: { cx: 0.883, cy: 0.634, w: 0.167, angle: 74.0 },
    wideTag: { cx: 0.769, cy: 0.634, w: 0.07, angle: 74.0 },
    wideGlass: { x: 0.647, y: 0.515 },
    glass: { x: 0.591, y: 0.515 },
  },
  // More Than One Head (v2)
  'magician-innocent': {
    src: '/personas/magician-innocent/portrait.jpg',
    wide: '/personas/magician-innocent/wide.jpg',
    tag: { cx: 0.614, cy: 0.73, w: 0.118, angle: 36.0 },
    wideTag: { cx: 0.744, cy: 0.73, w: 0.05, angle: 36.0 },
    wideGlass: { x: 0.648, y: 0.531 },
    glass: { x: 0.386, y: 0.531 },
  },
  // Even When You Know (v2)
  'magician-jester': {
    src: '/personas/magician-jester/portrait.jpg',
    wide: '/personas/magician-jester/wide.jpg',
    tag: { cx: 0.567, cy: 0.68, w: 0.105, angle: 65.0 },
    wideTag: { cx: 0.711, cy: 0.68, w: 0.044, angle: 65.0 },
    wideGlass: { x: 0.681, y: 0.586 },
    glass: { x: 0.496, y: 0.586 },
  },
  // Undimmed (v2)
  'magician-lover': {
    src: '/personas/magician-lover/portrait.jpg',
    wide: '/personas/magician-lover/wide.jpg',
    tag: { cx: 0.635, cy: 0.662, w: 0.128, angle: 77.0 },
    wideTag: { cx: 0.667, cy: 0.662, w: 0.054, angle: 77.0 },
    wideGlass: { x: 0.648, y: 0.457 },
    glass: { x: 0.59, y: 0.457 },
  },
  // Cold Water First (v2)
  'magician-regular-guy': {
    src: '/personas/magician-regular-guy/portrait.jpg',
    wide: '/personas/magician-regular-guy/wide.jpg',
    tag: { cx: 0.157, cy: 0.72, w: 0.254, angle: -8.7 },
    wideTag: { cx: 0.53, cy: 0.72, w: 0.106, angle: -8.7 },
    wideGlass: { x: 0.565, y: 0.52 },
    glass: { x: 0.241, y: 0.52 },
  },
  // Built to Hold (v2)
  'magician-ruler': {
    src: '/personas/magician-ruler/portrait.jpg',
    wide: '/personas/magician-ruler/wide.jpg',
    tag: { cx: 0.906, cy: 0.724, w: 0.078, angle: 66.0 },
    wideTag: { cx: 0.76, cy: 0.724, w: 0.033, angle: 66.0 },
    wideGlass: { x: 0.65, y: 0.6 },
    glass: { x: 0.642, y: 0.6 },
  },
  // Already There (v2)
  'magician-sage': {
    src: '/personas/magician-sage/portrait.jpg',
    wide: '/personas/magician-sage/wide.jpg',
    tag: { cx: 0.615, cy: 0.665, w: 0.208, angle: 6.0 },
    wideTag: { cx: 0.706, cy: 0.665, w: 0.087, angle: 6.0 },
    wideGlass: { x: 0.618, y: 0.513 },
    glass: { x: 0.406, y: 0.513 },
  },
  // In One Piece (v2)
  'outlaw-caregiver': {
    src: '/personas/outlaw-caregiver/portrait.jpg',
    wide: '/personas/outlaw-caregiver/wide.jpg',
    tag: { cx: 0.856, cy: 0.635, w: 0.142, angle: 82.0 },
    wideTag: { cx: 0.737, cy: 0.635, w: 0.06, angle: 82.0 },
    wideGlass: { x: 0.675, y: 0.56 },
    glass: { x: 0.709, y: 0.56 },
  },
  // Asked In (v2)
  'outlaw-creator': {
    src: '/personas/outlaw-creator/portrait.jpg',
    wide: '/personas/outlaw-creator/wide.jpg',
    tag: { cx: 0.95, cy: 0.591, w: 0.211, angle: 74.0 },
    wideTag: { cx: 0.81, cy: 0.591, w: 0.089, angle: 74.0 },
    wideGlass: { x: 0.69, y: 0.498 },
    glass: { x: 0.664, y: 0.498 },
  },
  // Whoopee (v2)
  'outlaw-explorer': {
    src: '/personas/outlaw-explorer/portrait.jpg',
    wide: '/personas/outlaw-explorer/wide.jpg',
    tag: { cx: 0.573, cy: 0.528, w: 0.234, angle: 4.6 },
    wideTag: { cx: 0.707, cy: 0.528, w: 0.098, angle: 4.6 },
    wideGlass: { x: 0.627, y: 0.35 },
    glass: { x: 0.382, y: 0.35 },
  },
  // Can't Watch (v2)
  'outlaw-hero': {
    src: '/personas/outlaw-hero/portrait.jpg',
    wide: '/personas/outlaw-hero/wide.jpg',
    tag: { cx: 0.756, cy: 0.651, w: 0.185, angle: 34.3 },
    wideTag: { cx: 0.721, cy: 0.651, w: 0.078, angle: 34.3 },
    wideGlass: { x: 0.613, y: 0.428 },
    glass: { x: 0.499, y: 0.428 },
  },
  // Kept (v2)
  'outlaw-innocent': {
    src: '/personas/outlaw-innocent/portrait.jpg',
    wide: '/personas/outlaw-innocent/wide.jpg',
    tag: { cx: 0.258, cy: 0.536, w: 0.222, angle: -1.4 },
    wideTag: { cx: 0.613, cy: 0.536, w: 0.093, angle: -1.4 },
    wideGlass: { x: 0.602, y: 0.461 },
    glass: { x: 0.231, y: 0.461 },
  },
  // With the Bite In (v2)
  'outlaw-jester': {
    src: '/personas/outlaw-jester/portrait.jpg',
    wide: '/personas/outlaw-jester/wide.jpg',
    tag: { cx: 0.323, cy: 0.67, w: 0.179, angle: 73.0 },
    wideTag: { cx: 0.654, cy: 0.67, w: 0.075, angle: 73.0 },
    wideGlass: { x: 0.593, y: 0.472 },
    glass: { x: 0.178, y: 0.472 },
  },
  // Rent-Free (v2)
  'outlaw-lover': {
    src: '/personas/outlaw-lover/portrait.jpg',
    wide: '/personas/outlaw-lover/wide.jpg',
    tag: { cx: 0.329, cy: 0.677, w: 0.11, angle: 74.0 },
    wideTag: { cx: 0.706, cy: 0.677, w: 0.046, angle: 74.0 },
    wideGlass: { x: 0.683, y: 0.46 },
    glass: { x: 0.274, y: 0.46 },
  },
  // For Its Own Good (v2)
  'outlaw-magician': {
    src: '/personas/outlaw-magician/portrait.jpg',
    wide: '/personas/outlaw-magician/wide.jpg',
    tag: { cx: 0.694, cy: 0.7, w: 0.167, angle: 15.0 },
    wideTag: { cx: 0.77, cy: 0.7, w: 0.07, angle: 15.0 },
    wideGlass: { x: 0.625, y: 0.556 },
    glass: { x: 0.349, y: 0.556 },
  },
  // Where You Stand (v2)
  'outlaw-regular-guy': {
    src: '/personas/outlaw-regular-guy/portrait.jpg',
    wide: '/personas/outlaw-regular-guy/wide.jpg',
    tag: { cx: 0.349, cy: 0.567, w: 0.085, angle: 70.0 },
    wideTag: { cx: 0.682, cy: 0.567, w: 0.036, angle: 70.0 },
    wideGlass: { x: 0.664, y: 0.391 },
    glass: { x: 0.306, y: 0.391 },
  },
  // Before It Had a Name (v2)
  'outlaw-ruler': {
    src: '/personas/outlaw-ruler/portrait.jpg',
    wide: '/personas/outlaw-ruler/wide.jpg',
    tag: { cx: 0.564, cy: 0.691, w: 0.164, angle: 16.0 },
    wideTag: { cx: 0.678, cy: 0.691, w: 0.069, angle: 16.0 },
    wideGlass: { x: 0.614, y: 0.601 },
    glass: { x: 0.412, y: 0.601 },
  },
  // Hear Me Out (v3)
  'outlaw-sage': {
    src: '/personas/outlaw-sage/portrait.jpg',
    wide: '/personas/outlaw-sage/wide.jpg',
    tag: { cx: 0.415, cy: 0.72, w: 0.107, angle: 74.0 },
    wideTag: { cx: 0.684, cy: 0.72, w: 0.045, angle: 74.0 },
    wideGlass: { x: 0.605, y: 0.596 },
    glass: { x: 0.226, y: 0.596 },
  },
  // Whoever Comes In (v3)
  'regular-guy-caregiver': {
    src: '/personas/regular-guy-caregiver/portrait.jpg',
    wide: '/personas/regular-guy-caregiver/wide.jpg',
    tag: { cx: 0.65, cy: 0.576, w: 0.16, angle: 9.6 },
    wideTag: { cx: 0.673, cy: 0.576, w: 0.067, angle: 9.6 },
    wideGlass: { x: 0.586, y: 0.496 },
    glass: { x: 0.442, y: 0.496 },
  },
  // Right Here (v2)
  'regular-guy-creator': {
    src: '/personas/regular-guy-creator/portrait.jpg',
    wide: '/personas/regular-guy-creator/wide.jpg',
    tag: { cx: 0.47, cy: 0.636, w: 0.215, angle: 4.6 },
    wideTag: { cx: 0.635, cy: 0.636, w: 0.09, angle: 4.6 },
    wideGlass: { x: 0.616, y: 0.541 },
    glass: { x: 0.425, y: 0.541 },
  },
  // Loose on Top (v2)
  'regular-guy-explorer': {
    src: '/personas/regular-guy-explorer/portrait.jpg',
    wide: '/personas/regular-guy-explorer/wide.jpg',
    tag: { cx: 0.711, cy: 0.651, w: 0.202, angle: 11.2 },
    wideTag: { cx: 0.74, cy: 0.651, w: 0.085, angle: 11.2 },
    wideGlass: { x: 0.658, y: 0.433 },
    glass: { x: 0.516, y: 0.433 },
  },
  // I'll Do It (v2)
  'regular-guy-hero': {
    src: '/personas/regular-guy-hero/portrait.jpg',
    wide: '/personas/regular-guy-hero/wide.jpg',
    tag: { cx: 0.846, cy: 0.632, w: 0.222, angle: 24.0 },
    wideTag: { cx: 0.821, cy: 0.632, w: 0.093, angle: 24.0 },
    wideGlass: { x: 0.666, y: 0.61 },
    glass: { x: 0.479, y: 0.61 },
  },
  // Good as It Is (v2)
  'regular-guy-innocent': {
    src: '/personas/regular-guy-innocent/portrait.jpg',
    wide: '/personas/regular-guy-innocent/wide.jpg',
    tag: { cx: 0.057, cy: 0.536, w: 0.131, angle: -78.0 },
    wideTag: { cx: 0.477, cy: 0.536, w: 0.055, angle: -78.0 },
    wideGlass: { x: 0.588, y: 0.56 },
    glass: { x: 0.321, y: 0.56 },
  },
  // Got You (v2)
  'regular-guy-jester': {
    src: '/personas/regular-guy-jester/portrait.jpg',
    wide: '/personas/regular-guy-jester/wide.jpg',
    tag: { cx: 0.617, cy: 0.637, w: 0.098, angle: 62.0 },
    wideTag: { cx: 0.675, cy: 0.637, w: 0.041, angle: 62.0 },
    wideGlass: { x: 0.643, y: 0.47 },
    glass: { x: 0.54, y: 0.47 },
  },
  // First Choice (v2)
  'regular-guy-lover': {
    src: '/personas/regular-guy-lover/portrait.jpg',
    wide: '/personas/regular-guy-lover/wide.jpg',
    tag: { cx: 0.657, cy: 0.587, w: 0.093, angle: 77.0 },
    wideTag: { cx: 0.721, cy: 0.587, w: 0.039, angle: 77.0 },
    wideGlass: { x: 0.694, y: 0.388 },
    glass: { x: 0.593, y: 0.388 },
  },
  // Good for Years (v2)
  'regular-guy-magician': {
    src: '/personas/regular-guy-magician/portrait.jpg',
    wide: '/personas/regular-guy-magician/wide.jpg',
    tag: { cx: 0.738, cy: 0.741, w: 0.085, angle: 73.0 },
    wideTag: { cx: 0.818, cy: 0.741, w: 0.036, angle: 73.0 },
    wideGlass: { x: 0.734, y: 0.624 },
    glass: { x: 0.538, y: 0.624 },
  },
  // Just This Once (v2)
  'regular-guy-outlaw': {
    src: '/personas/regular-guy-outlaw/portrait.jpg',
    wide: '/personas/regular-guy-outlaw/wide.jpg',
    tag: { cx: 0.687, cy: 0.68, w: 0.097, angle: 73.0 },
    wideTag: { cx: 0.755, cy: 0.68, w: 0.041, angle: 73.0 },
    wideGlass: { x: 0.726, y: 0.427 },
    glass: { x: 0.617, y: 0.427 },
  },
  // Word Gets Round (v2)
  'regular-guy-ruler': {
    src: '/personas/regular-guy-ruler/portrait.jpg',
    wide: '/personas/regular-guy-ruler/wide.jpg',
    tag: { cx: 0.678, cy: 0.552, w: 0.2, angle: 5.0 },
    wideTag: { cx: 0.714, cy: 0.552, w: 0.084, angle: 5 },
    wideGlass: { x: 0.647, y: 0.406 },
    glass: { x: 0.519, y: 0.406 },
  },
  // Tried and True (v2)
  'regular-guy-sage': {
    src: '/personas/regular-guy-sage/portrait.jpg',
    wide: '/personas/regular-guy-sage/wide.jpg',
    tag: { cx: 0.744, cy: 0.702, w: 0.234, angle: 14.4 },
    wideTag: { cx: 0.807, cy: 0.702, w: 0.098, angle: 14.4 },
    wideGlass: { x: 0.718, y: 0.5 },
    glass: { x: 0.53, y: 0.5 },
  },
  // Go On (v3)
  'ruler-caregiver': {
    src: '/personas/ruler-caregiver/portrait.jpg',
    wide: '/personas/ruler-caregiver/wide.jpg',
    tag: { cx: 0.453, cy: 0.687, w: 0.151, angle: -15.9 },
    wideTag: { cx: 0.645, cy: 0.687, w: 0.063, angle: -15.9 },
    wideGlass: { x: 0.718, y: 0.488 },
    glass: { x: 0.628, y: 0.488 },
  },
  // On Their Behalf (v2)
  'ruler-creator': {
    src: '/personas/ruler-creator/portrait.jpg',
    wide: '/personas/ruler-creator/wide.jpg',
    tag: { cx: 0.548, cy: 0.653, w: 0.256, angle: 25.2 },
    wideTag: { cx: 0.695, cy: 0.653, w: 0.108, angle: 25.2 },
    wideGlass: { x: 0.607, y: 0.377 },
    glass: { x: 0.339, y: 0.377 },
  },
  // Not the Same (v2)
  'ruler-explorer': {
    src: '/personas/ruler-explorer/portrait.jpg',
    wide: '/personas/ruler-explorer/wide.jpg',
    tag: { cx: 0.446, cy: 0.676, w: 0.104, angle: 71.0 },
    wideTag: { cx: 0.704, cy: 0.676, w: 0.044, angle: 71.0 },
    wideGlass: { x: 0.673, y: 0.578 },
    glass: { x: 0.373, y: 0.578 },
  },
  // A Place Kept (v2)
  'ruler-hero': {
    src: '/personas/ruler-hero/portrait.jpg',
    wide: '/personas/ruler-hero/wide.jpg',
    tag: { cx: 0.564, cy: 0.606, w: 0.135, angle: -1.3 },
    wideTag: { cx: 0.673, cy: 0.606, w: 0.057, angle: -1.3 },
    wideGlass: { x: 0.629, y: 0.499 },
    glass: { x: 0.459, y: 0.499 },
  },
  // Say So (v2)
  'ruler-innocent': {
    src: '/personas/ruler-innocent/portrait.jpg',
    wide: '/personas/ruler-innocent/wide.jpg',
    tag: { cx: 0.162, cy: 0.651, w: 0.165, angle: -68.8 },
    wideTag: { cx: 0.55, cy: 0.651, w: 0.069, angle: -68.8 },
    wideGlass: { x: 0.6, y: 0.388 },
    glass: { x: 0.282, y: 0.388 },
  },
  // Who's In? (v4)
  'ruler-jester': {
    src: '/personas/ruler-jester/portrait.jpg',
    wide: '/personas/ruler-jester/wide.jpg',
    tag: { cx: 0.802, cy: 0.771, w: 0.07, angle: 80.0 },
    wideTag: { cx: 0.755, cy: 0.771, w: 0.029, angle: 80.0 },
    wideGlass: { x: 0.708, y: 0.59 },
    glass: { x: 0.689, y: 0.59 },
  },
  // Up Close (v2)
  'ruler-lover': {
    src: '/personas/ruler-lover/portrait.jpg',
    wide: '/personas/ruler-lover/wide.jpg',
    tag: { cx: 0.808, cy: 0.638, w: 0.268, angle: 3.5 },
    wideTag: { cx: 0.806, cy: 0.638, w: 0.112, angle: 3.5 },
    wideGlass: { x: 0.656, y: 0.416 },
    glass: { x: 0.452, y: 0.416 },
  },
  // The Long View (v2)
  'ruler-magician': {
    src: '/personas/ruler-magician/portrait.jpg',
    wide: '/personas/ruler-magician/wide.jpg',
    tag: { cx: 0.662, cy: 0.657, w: 0.199, angle: 10.0 },
    wideTag: { cx: 0.746, cy: 0.657, w: 0.084, angle: 10.0 },
    wideGlass: { x: 0.66, y: 0.517 },
    glass: { x: 0.457, y: 0.517 },
  },
  // Had to Be Serious (v2)
  'ruler-outlaw': {
    src: '/personas/ruler-outlaw/portrait.jpg',
    wide: '/personas/ruler-outlaw/wide.jpg',
    tag: { cx: 0.88, cy: 0.778, w: 0.147, angle: 35.0 },
    wideTag: { cx: 0.712, cy: 0.778, w: 0.062, angle: 35.0 },
    wideGlass: { x: 0.612, y: 0.554 },
    glass: { x: 0.642, y: 0.554 },
  },
  // One Table (v2)
  'ruler-regular-guy': {
    src: '/personas/ruler-regular-guy/portrait.jpg',
    wide: '/personas/ruler-regular-guy/wide.jpg',
    tag: { cx: 0.863, cy: 0.64, w: 0.226, angle: 83.0 },
    wideTag: { cx: 0.751, cy: 0.64, w: 0.095, angle: 83.0 },
    wideGlass: { x: 0.645, y: 0.546 },
    glass: { x: 0.611, y: 0.546 },
  },
  // Either Way (v2)
  'ruler-sage': {
    src: '/personas/ruler-sage/portrait.jpg',
    wide: '/personas/ruler-sage/wide.jpg',
    tag: { cx: 0.823, cy: 0.598, w: 0.208, angle: 73.0 },
    wideTag: { cx: 0.857, cy: 0.598, w: 0.087, angle: 73.0 },
    wideGlass: { x: 0.746, y: 0.565 },
    glass: { x: 0.558, y: 0.565 },
  },
  // Further Than Me (v4)
  'sage-caregiver': {
    src: '/personas/sage-caregiver/portrait.jpg',
    wide: '/personas/sage-caregiver/wide.jpg',
    tag: { cx: 0.848, cy: 0.773, w: 0.097, angle: 58.0 },
    wideTag: { cx: 0.702, cy: 0.773, w: 0.041, angle: 58.0 },
    wideGlass: { x: 0.634, y: 0.577 },
    glass: { x: 0.687, y: 0.577 },
  },
  // What It Rests On (v2)
  'sage-creator': {
    src: '/personas/sage-creator/portrait.jpg',
    wide: '/personas/sage-creator/wide.jpg',
    tag: { cx: 0.494, cy: 0.683, w: 0.222, angle: -24.0 },
    wideTag: { cx: 0.571, cy: 0.683, w: 0.093, angle: -24.0 },
    wideGlass: { x: 0.649, y: 0.569 },
    glass: { x: 0.679, y: 0.569 },
  },
  // Look Again (v2)
  'sage-explorer': {
    src: '/personas/sage-explorer/portrait.jpg',
    wide: '/personas/sage-explorer/wide.jpg',
    tag: { cx: 0.769, cy: 0.671, w: 0.135, angle: 13.0 },
    wideTag: { cx: 0.809, cy: 0.671, w: 0.057, angle: 13.0 },
    wideGlass: { x: 0.687, y: 0.533 },
    glass: { x: 0.477, y: 0.533 },
  },
  // At the Time (v2)
  'sage-hero': {
    src: '/personas/sage-hero/portrait.jpg',
    wide: '/personas/sage-hero/wide.jpg',
    tag: { cx: 0.875, cy: 0.691, w: 0.117, angle: 70.0 },
    wideTag: { cx: 0.82, cy: 0.691, w: 0.049, angle: 70.0 },
    wideGlass: { x: 0.705, y: 0.461 },
    glass: { x: 0.6, y: 0.461 },
  },
  // Nothing Escaped You (v2)
  'sage-innocent': {
    src: '/personas/sage-innocent/portrait.jpg',
    wide: '/personas/sage-innocent/wide.jpg',
    tag: { cx: 0.511, cy: 0.611, w: 0.1, angle: 33.0 },
    wideTag: { cx: 0.669, cy: 0.611, w: 0.042, angle: 33.0 },
    wideGlass: { x: 0.623, y: 0.41 },
    glass: { x: 0.4, y: 0.41 },
  },
  // In Good Part (v2)
  'sage-jester': {
    src: '/personas/sage-jester/portrait.jpg',
    wide: '/personas/sage-jester/wide.jpg',
    tag: { cx: 0.5, cy: 0.589, w: 0.127, angle: 79.0 },
    wideTag: { cx: 0.673, cy: 0.589, w: 0.053, angle: 79.0 },
    wideGlass: { x: 0.645, y: 0.504 },
    glass: { x: 0.432, y: 0.504 },
  },
  // Plain to See (v2)
  'sage-magician': {
    src: '/personas/sage-magician/portrait.jpg',
    wide: '/personas/sage-magician/wide.jpg',
    tag: { cx: 0.462, cy: 0.699, w: 0.236, angle: 0.5 },
    wideTag: { cx: 0.553, cy: 0.699, w: 0.099, angle: 0.5 },
    wideGlass: { x: 0.624, y: 0.59 },
    glass: { x: 0.631, y: 0.59 },
  },
  // On the Record (v2)
  'sage-outlaw': {
    src: '/personas/sage-outlaw/portrait.jpg',
    wide: '/personas/sage-outlaw/wide.jpg',
    tag: { cx: 0.739, cy: 0.75, w: 0.335, angle: 2.3 },
    wideTag: { cx: 0.729, cy: 0.75, w: 0.141, angle: 2.3 },
    wideGlass: { x: 0.627, y: 0.422 },
    glass: { x: 0.496, y: 0.422 },
  },
  // Whatever They Call It (v2)
  'sage-regular-guy': {
    src: '/personas/sage-regular-guy/portrait.jpg',
    wide: '/personas/sage-regular-guy/wide.jpg',
    tag: { cx: 0.396, cy: 0.743, w: 0.151, angle: 72.0 },
    wideTag: { cx: 0.721, cy: 0.743, w: 0.063, angle: 72.0 },
    wideGlass: { x: 0.663, y: 0.555 },
    glass: { x: 0.256, y: 0.555 },
  },
  // Note to Self (v2)
  'sage-ruler': {
    src: '/personas/sage-ruler/portrait.jpg',
    wide: '/personas/sage-ruler/wide.jpg',
    tag: { cx: 0.732, cy: 0.733, w: 0.132, angle: 8.0 },
    wideTag: { cx: 0.769, cy: 0.733, w: 0.056, angle: 8.0 },
    wideGlass: { x: 0.663, y: 0.561 },
    glass: { x: 0.48, y: 0.561 },
  },
};

export function personaKey(primary: string, secondary: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  return `${norm(primary)}-${norm(secondary)}`;
}

export function personaImageFor(primary: string, secondary: string): PersonaImageMeta {
  return PERSONA_IMAGES[personaKey(primary, secondary)] ?? PERSONA_FALLBACK;
}
