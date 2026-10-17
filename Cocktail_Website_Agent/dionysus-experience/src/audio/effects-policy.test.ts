import { describe, expect, it } from 'vitest';
import { EffectPolicy, panFor, semitones, type EffectConditions } from './effects-policy';
import { CUES, rootAt, type Root } from './cues';

const audible: EffectConditions = { trial: true, enabled: true, still: false, visible: true, running: true };
const PC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const D_SHARP = 3;

describe('quiet interaction sounds', () => {
  it.each([
    { trial: false }, { enabled: false }, { still: true }, { visible: false }, { running: false },
  ])('does not reserve playback or warm files when the conditions are %j', (condition) => {
    const policy = new EffectPolicy();
    const conditions = { ...audible, ...condition };
    expect(policy.allowed(conditions)).toBe(false);
    expect(policy.reserve('touch', 1, conditions)).toBeNull();
  });

  it('guards a double fire of one gesture, but never lets one gesture silence another', () => {
    const policy = new EffectPolicy();
    expect(policy.reserve('touch', 1, audible)).not.toBeNull();
    expect(policy.reserve('touch', 1.03, audible)).toBeNull();
    expect(policy.reserve('seal', 1.05, audible)).not.toBeNull();
    expect(policy.reserve('touch', 1.2, audible)).not.toBeNull();
    // a stroke just before the Enter must not swallow the seal
    expect(policy.reserve('ink', 2, audible)).not.toBeNull();
    expect(policy.reserve('seal', 2.01, audible)).not.toBeNull();
  });

  it('sounds every stroke, softer as typing quickens, and full again after a pause', () => {
    const policy = new EffectPolicy();
    const first = policy.reserve('ink', 1, audible)!;
    expect(first.level).toBe(1);
    let last = first;
    for (let k = 1; k <= 12; k++) {
      const t = policy.reserve('ink', 1 + k * 0.12, audible);
      expect(t).not.toBeNull();
      expect(t!.level).toBeLessThanOrEqual(last.level + 1e-9);
      last = t!;
    }
    expect(last.level).toBeLessThan(0.4);   // fast typing: about −9 dB or lower
    expect(last.level).toBeGreaterThan(0.2); // still there, felt
    expect(policy.reserve('ink', 6, audible)!.level).toBeGreaterThan(0.95);
  });

  it('drops a sample that arrives too late for the gesture', () => {
    const policy = new EffectPolicy();
    const ticket = policy.reserve('touch', 1, audible)!;
    expect(policy.current(ticket, 1.05, audible)).toBe(true);
    expect(policy.current(ticket, 1.3, audible)).toBe(false);
  });

  it('rechecks mute and Still Water after decoding', () => {
    const policy = new EffectPolicy();
    const ticket = policy.reserve('ink', 1, audible)!;
    expect(policy.current(ticket, 1.02, { ...audible, enabled: false })).toBe(false);
    expect(policy.current(ticket, 1.02, { ...audible, still: true })).toBe(false);
  });

  it('cancels pending sounds across off/on, backgrounding and chapter changes', () => {
    const policy = new EffectPolicy();
    const ticket = policy.reserve('touch', 1, audible)!;
    policy.cancel();
    expect(policy.current(ticket, 1.05, audible)).toBe(false);
    expect(policy.reserve('touch', 2, audible)).not.toBeNull();
  });
});

describe('the glass is always in the chord', () => {
  // the pitch classes each chord in the score actually sounds (measured, see the manifest)
  const CHORD: Record<Root, number[]> = {
    'G#': [8, 3, 10], 'A#': [10, 3, 8, 5], B: [11, 3, 6], C: [0, 3, 2, 10, 7],
  };
  const pitch = (st: number) => (D_SHARP + st) % 12;

  it('a single choice is always her note, D#, which every chord holds', () => {
    for (const root of Object.keys(CHORD) as Root[]) expect(pitch(semitones('touch', root, 0))).toBe(D_SHARP);
  });

  it.each(Object.keys(CHORD) as Root[])('over %s, gathering climbs through that chord\'s tones', (root) => {
    const steps = [0, 1, 2, 3, 7].map((s) => semitones('touch', root, s));
    for (let k = 1; k < steps.length; k++) expect(steps[k]).toBeGreaterThanOrEqual(steps[k - 1]);
    for (const st of steps) expect(CHORD[root]).toContain(pitch(st));
    for (let k = 0; k < 16; k++) expect(CHORD[root]).toContain(pitch(semitones('ink', root, 0, k)));
  });

  it('the roots the journey can sound are all covered', () => {
    for (const cue of Object.values(CUES)) {
      expect(Object.keys(CHORD)).toContain(rootAt(cue, 0));
      for (const [, root] of cue.chords ?? []) expect(Object.keys(CHORD)).toContain(root);
    }
    expect(PC[pitch(semitones('touch', 'G#', 1))]).toBe('G#');
  });

  it('leans towards where the gesture was, never far', () => {
    expect(panFor(undefined)).toBe(0);
    expect(panFor(0.5)).toBe(0);
    expect(panFor(0)).toBeCloseTo(-0.3);
    expect(panFor(1)).toBeCloseTo(0.3);
    expect(panFor(-4)).toBe(-0.3);
    expect(panFor(Number.NaN)).toBe(0);
  });
});
