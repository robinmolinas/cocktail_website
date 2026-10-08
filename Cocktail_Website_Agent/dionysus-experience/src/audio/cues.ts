// The score's cues: sections of one ElevenLabs suite ("Glass Chords and Felt
// Key Breathing", generated 8 Oct 2026 from the "Missing Note" prompt), cut by
// design-artifacts/2026-10-06-type-icons-sound/sound/src/cut_score.py. Every
// section sits on the same root (G#), so any crossfade between them is
// consonant. Looped cues are seamless by construction between loopStart and
// loopEnd (seconds into the file); the values are the script's output.
//
// Two different chords crossfaded beat against each other in the bass (a
// 3–10 Hz flutter, measured on the first integration), so a chapter enters on
// the chord already sounding and moves on in its own time; `chords` makes
// that possible.
//
// Rights record and prompt: design-artifacts/2026-10-06-type-icons-sound/sound/.

export type CueId = 'pressure' | 'firstlight' | 'current' | 'question' | 'world' | 'rise' | 'lettinggo' | 'answer';

export type Root = 'G#' | 'A#' | 'B' | 'C';

export type Cue = {
  file: string;
  /** omitted on one-shot cues */
  loopStart?: number;
  loopEnd?: number;
  /** where the bass changes chord, [file seconds, root]; omitted = G# throughout.
   *  Measured from the suite (changes land on its 8 s breath grid). */
  chords?: [number, Root][];
};

export const CUES: Record<CueId, Cue> = {
  pressure:   { file: '01-pressure.mp3',   loopStart: 7.2115, loopEnd: 31.5 },    // H1: the stack, felt more than heard
  firstlight: { file: '02-firstlight.mp3', loopStart: 8.2978, loopEnd: 31.5 },    // H2, H7: the bass falls away, a held glass fifth
  current:    { file: '03-current.mp3',    loopStart: 7.7064, loopEnd: 31.8 },    // H3, the reading bed: breathing every 8 s
  question:   { file: '04-question.mp3',   loopStart: 0.05,   loopEnd: 32.3461,   // H4: two chords, alternating every 8 s
                chords: [[0, 'G#'], [0.55, 'A#'], [8.55, 'G#'], [16.55, 'A#'], [24.55, 'G#']] },
  world:      { file: '05-world.mp3',      loopStart: 0.2466, loopEnd: 32.0,      // H5–H6: the widest harmony
                chords: [[0, 'B'], [8.0, 'A#'], [16.0, 'G#']] },
  rise:       { file: '06-rise.mp3',       loopStart: 5.2731, loopEnd: 37.0,      // H8: brighter, climbing
                chords: [[0, 'G#'], [16.0, 'C'], [24.0, 'A#'], [32.0, 'G#']] },
  lettinggo:  { file: '07-lettinggo.mp3' },                                       // H9: one shot, the wash on the splash
  answer:     { file: '08-answer.mp3' },                                          // H10: one shot, the chord blooms and fades
};

/** H9: where the letting-go cue's bright wash peaks (seconds into its file). */
export const WASH_AT = 11.075;

/** the root sounding at `pos` seconds into a cue */
export function rootAt(cue: Cue, pos: number): Root {
  let root: Root = 'G#';
  for (const [t, r] of cue.chords ?? []) if (pos >= t) root = r;
  return root;
}

/** the first place at or after `from` where the cue sounds `root`, or null */
export function entryOn(cue: Cue, root: Root, from = 0): number | null {
  if (!cue.chords) return root === 'G#' ? from : null;
  const segs = cue.chords;
  for (let i = 0; i < segs.length; i++) {
    const end = segs[i + 1]?.[0] ?? cue.loopEnd ?? Infinity;
    if (segs[i][1] === root && end > from + 1) return Math.max(segs[i][0], from);
  }
  return null;
}

/** the order the journey meets them, for prefetching one step ahead */
export const JOURNEY_ORDER: CueId[] = ['pressure', 'firstlight', 'current', 'question', 'world', 'rise', 'lettinggo', 'answer'];
