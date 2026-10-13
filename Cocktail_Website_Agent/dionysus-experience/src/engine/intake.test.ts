import { describe, expect, it } from 'vitest';
import { AnswersSchema } from '../../shared/answers';
import { JOURNEY_FIXTURES } from './fixtures';
import { WIRE_GUEST_NAME, toRevealRequest } from './intake';
import { emptyDiagnostics, emptyRecord, mergeDiagnostics, type IntakeRecord, type JourneyAnswers } from './record';

const withAnswers = (patch: Partial<JourneyAnswers>, base: IntakeRecord = emptyRecord()): IntakeRecord => ({
  ...base,
  answers: { ...base.answers, ...patch },
});

describe('toRevealRequest', () => {
  it('gives the dawn journey the same request the 1.5 label mapping did', () => {
    // captured from the 1.5 mapping (labels, hex, pole words) at 5682763
    expect(toRevealRequest(JOURNEY_FIXTURES.dawn)).toEqual({
      v: 3,
      name: 'Ada',
      lens: 'real',
      seed: 'galliano-gold',
      gravity: {
        'solitary-social': 72, 'controlled-wild': 18, 'classic-experimental': 22,
        'analytical-instinctive': 40, 'grounded-dreamlike': 15,
      },
      texture: {
        'sharp-smooth': 'b', 'relaxed-excited': 'a', 'halffull-halfempty': 'a', control: 'a',
        'quiet-loud': 'a', risk: 'a', 'bright-dark': 'a', 'soft-rough': 'a', harmonic: 'a',
      },
      drawnToward: ['peace', 'belonging', 'caring'],
      soughtFor: ['advice', 'comfort', 'calm'],
      flavors: ['sweet', 'fruity'],
      vetoes: [],
    });
  });

  it('gives the night journey the same request the 1.5 label mapping did', () => {
    expect(toRevealRequest(JOURNEY_FIXTURES.night)).toEqual({
      v: 3,
      name: 'Rafe',
      lens: 'night',
      seed: 'cassis-plum',
      gravity: {
        'solitary-social': 35, 'controlled-wild': 92, 'classic-experimental': 88,
        'analytical-instinctive': 85, 'grounded-dreamlike': 70,
      },
      texture: {
        'sharp-smooth': 'a', 'relaxed-excited': 'b', 'halffull-halfempty': 'b', control: 'b',
        'quiet-loud': 'b', risk: 'b', 'bright-dark': 'b', 'soft-rough': 'b', harmonic: 'b',
      },
      drawnToward: ['freedom', 'wonder', 'change'],
      soughtFor: ['honesty', 'courage', 'little-chaos'],
      flavors: ['bitter', 'spicy', 'smoky'],
      vetoes: ['egg-white', 'dairy'],
    });
  });

  it('always yields a request the strict schema accepts', () => {
    for (const fixture of Object.values(JOURNEY_FIXTURES)) {
      expect(AnswersSchema.safeParse(toRevealRequest(fixture)).success).toBe(true);
    }
  });

  it('projects the answers alone: the trace and the diagnostics never reach the request', () => {
    const record: IntakeRecord = {
      ...JOURNEY_FIXTURES.night,
      trace: 'a secret only the ink keeps',
      diagnostics: mergeDiagnostics(emptyDiagnostics(), {
        h4Mode: 'untimed',
        example: 'chosen',
        texture: { 'sharp-smooth': { status: 'chosen', ms: 412, interrupted: true } },
        gravityMoved: { 'solitary-social': true },
      }),
    };
    const request = toRevealRequest(record);
    expect(Object.keys(request).sort()).toEqual(
      ['drawnToward', 'flavors', 'gravity', 'lens', 'name', 'seed', 'soughtFor', 'texture', 'v', 'vetoes'],
    );
    const wire = JSON.stringify(request);
    for (const leak of ['secret', 'trace', 'diagnostics', 'h4Mode', 'untimed', 'example', 'gravityMoved', 'interrupted', 'status', '412']) {
      expect(wire).not.toContain(leak);
    }
    expect(request).toEqual(toRevealRequest(JOURNEY_FIXTURES.night));
  });

  it('keeps a sparse journey neutral', () => {
    expect(toRevealRequest(emptyRecord())).toEqual({
      v: 3, name: WIRE_GUEST_NAME, lens: null, seed: null, gravity: {}, texture: {},
      drawnToward: [], soughtFor: [], flavors: [], vetoes: [],
    });
  });

  it('borrows the wire name only when hers cannot travel', () => {
    expect(toRevealRequest(withAnswers({ name: '' })).name).toBe(WIRE_GUEST_NAME);
    expect(toRevealRequest(withAnswers({ name: '  Ada  ' })).name).toBe('Ada');
    expect(toRevealRequest(withAnswers({ name: '   ' })).name).toBe(WIRE_GUEST_NAME);
    expect(toRevealRequest(withAnswers({ name: 'x'.repeat(41) })).name).toBe(WIRE_GUEST_NAME);
    expect(toRevealRequest(withAnswers({ name: 'A\u200bda' })).name).toBe(WIRE_GUEST_NAME);
  });

  it('rejects word lists that are not in vocabulary order', () => {
    expect(() => toRevealRequest(withAnswers({ soughtFor: ['calm', 'advice'] }))).toThrow();
    expect(() => toRevealRequest(withAnswers({ drawnToward: ['caring', 'freedom'] }))).toThrow();
    expect(() => toRevealRequest(withAnswers({ flavors: ['smoky', 'sweet'] }))).toThrow();
    expect(() => toRevealRequest(withAnswers({ flavors: ['sweet', 'sweet'] }))).toThrow();
  });

  it('rejects ids outside the vocabularies rather than guessing', () => {
    const bad = (patch: Record<string, unknown>) => () =>
      toRevealRequest(withAnswers(patch as Partial<JourneyAnswers>));
    expect(bad({ lens: 'The real me' })).toThrow();
    expect(bad({ seed: '#c8102e' })).toThrow();
    expect(bad({ texture: { 'sharp-smooth': 'Smooth' } })).toThrow();
    expect(bad({ gravity: { 'solitary-social': 49.6 } })).toThrow();
    expect(bad({ vetoes: ['alcohol'] })).toThrow();
  });
});

describe('emptyRecord', () => {
  it('starts every pair not presented and every mote untouched', () => {
    const { diagnostics } = emptyRecord();
    expect(diagnostics.h4Mode).toBe('timed');
    expect(diagnostics.example).toBe('notTouched');
    expect(Object.values(diagnostics.texture)).toHaveLength(9);
    expect(Object.values(diagnostics.texture).every((d) => d?.status === 'notPresented')).toBe(true);
    expect(Object.values(diagnostics.gravityMoved)).toEqual([false, false, false, false, false]);
  });

  it('is a fresh object each time', () => {
    const a = emptyRecord();
    a.answers.flavors.push('sweet');
    expect(emptyRecord().answers.flavors).toEqual([]);
  });
});

describe('mergeDiagnostics', () => {
  it('merges the texture and gravityMoved maps key by key', () => {
    const merged = mergeDiagnostics(
      mergeDiagnostics(emptyDiagnostics(), { texture: { risk: { status: 'timedOut' } }, gravityMoved: { 'controlled-wild': true } }),
      { texture: { harmonic: { status: 'skipped' } }, example: 'chosen' },
    );
    expect(merged.texture.risk).toEqual({ status: 'timedOut' });
    expect(merged.texture.harmonic).toEqual({ status: 'skipped' });
    expect(merged.texture['sharp-smooth']).toEqual({ status: 'notPresented' });
    expect(merged.gravityMoved['controlled-wild']).toBe(true);
    expect(merged.gravityMoved['solitary-social']).toBe(false);
    expect(merged.example).toBe('chosen');
    expect(merged.h4Mode).toBe('timed');
  });
});
