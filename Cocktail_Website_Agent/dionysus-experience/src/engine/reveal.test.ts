import { describe, expect, it } from 'vitest';
import { AUTHORED_POURS } from '../../shared/data/pours/static';
import { selectShortlist } from '../../shared/selection';
import { JOURNEY_FIXTURES } from './fixtures';
import { toRevealRequest } from './intake';
import { emptyRecord, type IntakeRecord, type JourneyAnswers } from './record';
import { readingFor, revealReading } from './reveal';

const withAnswers = (patch: Partial<JourneyAnswers>): IntakeRecord => {
  const base = emptyRecord();
  return { ...base, answers: { ...base.answers, ...patch } };
};

const sparse = emptyRecord();

// The reference witness for Creator × Hero ("Down the Line", which holds
// dairy and egg white), written the way TheDepths writes it.
const visionary = withAnswers({
  name: 'Celeste',
  drawnToward: ['beauty', 'change', 'making'],
  soughtFor: ['courage', 'ideas'],
  texture: { 'sharp-smooth': 'a', 'halffull-halfempty': 'a', control: 'a', 'quiet-loud': 'b', 'bright-dark': 'a', 'soft-rough': 'b' },
  gravity: { 'solitary-social': 100, 'controlled-wild': 0, 'classic-experimental': 87, 'analytical-instinctive': 46, 'grounded-dreamlike': 0 },
});

describe('revealReading', () => {
  it('reveals the same authored pours as before 1.6 (dawn regular-guy-caregiver, night magician-outlaw)', () => {
    expect(revealReading(JOURNEY_FIXTURES.dawn).pairing).toBe('regular-guy-caregiver');
    expect(revealReading(JOURNEY_FIXTURES.night).pairing).toBe('magician-outlaw');
  });

  it('reveals different authored pours for different journeys, each the shortlist head', () => {
    const dawn = revealReading(JOURNEY_FIXTURES.dawn);
    const night = revealReading(JOURNEY_FIXTURES.night);
    expect(dawn.pairing).not.toBe(night.pairing);
    for (const [fixture, reading] of [[JOURNEY_FIXTURES.dawn, dawn], [JOURNEY_FIXTURES.night, night]] as const) {
      expect(reading.pairing).toBe(selectShortlist(toRevealRequest(fixture))[0]);
      const pour = AUTHORED_POURS[reading.pairing]!;
      expect(reading.cocktail).toEqual(pour.cocktail);
      expect(reading.epigraph).toBe(pour.reading.epigraph);
      expect(reading.whoYouAre).toEqual(pour.reading.whoYouAre);
      expect(reading.yours).toEqual(pour.reading.yours);
      expect(reading.copy).toBeNull();
      expect(reading.name).toBe(fixture.answers.name);
    }
    expect(dawn.seed).toBe('galliano-gold');
    expect(night.seed).toBe('cassis-plum');
  });

  it('is deterministic', () => {
    expect(revealReading(JOURNEY_FIXTURES.night).pairing).toBe(revealReading(JOURNEY_FIXTURES.night).pairing);
  });

  it('ignores the trace and the diagnostics', () => {
    const noisy: IntakeRecord = {
      ...JOURNEY_FIXTURES.dawn,
      trace: 'something else entirely',
      diagnostics: { ...JOURNEY_FIXTURES.dawn.diagnostics, h4Mode: 'untimed', example: 'chosen' },
    };
    expect(revealReading(noisy).pairing).toBe(revealReading(JOURNEY_FIXTURES.dawn).pairing);
  });

  it('honours a dairy veto', () => {
    const open = revealReading(visionary);
    expect(open.pairing).toBe('creator-hero');
    expect(open.cocktail.contains).toContain('dairy');
    const dairyFree: IntakeRecord = { ...visionary, answers: { ...visionary.answers, vetoes: ['dairy'] } };
    const vetoed = revealReading(dairyFree);
    expect(vetoed.cocktail.contains).not.toContain('dairy');
    expect(vetoed.pairing).toBe(selectShortlist(toRevealRequest(dairyFree))[0]);
  });

  it('reveals a valid authored pour for a sparse journey', () => {
    const reading = revealReading(sparse);
    expect(AUTHORED_POURS[reading.pairing]).toBeDefined();
    expect(reading.name).toBe('');
    expect(reading.seed).toBeNull();
  });
});

describe('readingFor', () => {
  it('assembles a known pairing with the given name and seed', () => {
    const reading = readingFor('creator-hero', 'Celeste', 'campari-red');
    expect(reading.cocktail.name).toBe(AUTHORED_POURS['creator-hero']!.cocktail.name);
    expect(reading.name).toBe('Celeste');
    expect(reading.seed).toBe('campari-red');
  });

  it('throws on an unknown pairing', () => {
    expect(() => readingFor('hero-hero', '', null)).toThrow();
    expect(() => readingFor('nope', '', null)).toThrow();
  });
});
