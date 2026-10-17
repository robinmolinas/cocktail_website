import type { Root } from './cues';

// One glass, four gestures (design-artifacts/evolution/prototypes/
// sound-effects-2026-10-17, second pass):
//   touch    a choice          untouch  a choice taken back, a flavour left out, a step back
//   seal     a beat sealed     ink      a stroke of the name or the trace
export type EffectId = 'touch' | 'untouch' | 'seal' | 'ink';
export type EffectConditions = {
  trial: boolean;
  enabled: boolean;
  still: boolean;
  visible: boolean;
  running: boolean;
};
export type EffectOptions = {
  /** how many words are already gathered in this round (H5, H6): the touch climbs a chord tone each */
  step?: number;
  /** where on screen the gesture was, 0 (left) … 1 (right) */
  x?: number;
};
type Ticket = { at: number; epoch: number; level: number; stroke: number };

/** the shortest gap between two of the same gesture: a double-fire guard, never a throttle */
const SPACING: Record<EffectId, number> = { touch: 0.07, untouch: 0.07, seal: 0.4, ink: 0.035 };
/** ink: a leaky count of recent strokes; each stroke is softer the more came just before */
const INK_TAU = 0.7;
const INK_SOFTEN = 0.45;

// Semitones above the glass's D#. Every chord in the score holds D#, so step 0
// (her note) is consonant everywhere; the climb uses the tones of the chord
// sounding (measured from the cues: G#/A# chords hold G#, A#; B holds F#, B).
const LADDER: Record<Root, readonly number[]> = {
  'G#': [0, 5, 7, 12], 'A#': [0, 5, 7, 12], B: [0, 3, 8, 12], C: [0, 4, 7, 12],
};
// ink wanders between two chord tones in an uneven figure, so a name never ticks like a clock
const INK_FIGURE = [0, 1, 0, 0, 1, 0, 1, 1];

/** Gesture sounds are expendable: a missed sound is better than a late one. */
export class EffectPolicy {
  private epoch = 0;
  private last: Partial<Record<EffectId, number>> = {};
  private ink = { at: -Infinity, energy: 0, strokes: 0 };

  allowed(c: EffectConditions) {
    return c.trial && c.enabled && !c.still && c.visible && c.running;
  }

  reserve(id: EffectId, at: number, c: EffectConditions): Ticket | null {
    if (!this.allowed(c) || at - (this.last[id] ?? -Infinity) < SPACING[id]) return null;
    this.last[id] = at;
    let level = 1;
    let stroke = 0;
    if (id === 'ink') {
      const energy = this.ink.energy * Math.exp(-(at - this.ink.at) / INK_TAU);
      level = 1 / (1 + INK_SOFTEN * energy);
      stroke = this.ink.strokes;
      this.ink = { at, energy: energy + 1, strokes: stroke + 1 };
    }
    return { at, epoch: this.epoch, level, stroke };
  }

  current(ticket: Ticket, at: number, c: EffectConditions) {
    return this.allowed(c) && ticket.epoch === this.epoch && at >= ticket.at && at - ticket.at < 0.18;
  }

  cancel() { this.epoch++; }
}

/** the pitch of a gesture, in semitones from its recorded note */
export function semitones(id: EffectId, root: Root, step = 0, stroke = 0) {
  if (id === 'touch') {
    const ladder = LADDER[root];
    return ladder[Math.min(Math.max(0, Math.floor(step)), ladder.length - 1)];
  }
  if (id === 'ink') return LADDER[root][INK_FIGURE[stroke % INK_FIGURE.length]];
  return 0;
}

/** a little to the side the gesture was on; never more than a third of the way */
export function panFor(x?: number) {
  if (x === undefined || !Number.isFinite(x)) return 0;
  return Math.max(-0.3, Math.min(0.3, (x - 0.5) * 0.6));
}
