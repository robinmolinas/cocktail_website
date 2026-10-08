import { describe, expect, it } from 'vitest';
import { AnswersSchema } from '../../shared/answers';
import type { Answers } from '../types';
import { JOURNEY_FIXTURES } from './fixtures';
import { WIRE_GUEST_NAME, seedFromHex, toRevealRequest } from './intake';

const blank = (patch: Partial<Answers> = {}): Answers => ({
  ...JOURNEY_FIXTURES.dawn,
  name: '', lens: null, color: '#e8702a', colorName: '', colorTouched: false,
  gravity: {}, texture: {}, drawnToward: [], soughtFor: [], flavors: [], allergies: '', insight: '',
  ...patch,
});

describe('toRevealRequest', () => {
  it('maps labels, hex, pole words and allergies onto v3 ids', () => {
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
      // vocabulary order, never tap order
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

  it('keeps a sparse journey neutral', () => {
    expect(toRevealRequest(blank())).toEqual({
      v: 3, name: WIRE_GUEST_NAME, lens: null, seed: null, gravity: {}, texture: {},
      drawnToward: [], soughtFor: [], flavors: [], vetoes: [],
    });
  });

  it('borrows the wire name only when hers cannot travel', () => {
    expect(toRevealRequest(blank({ name: '  Ada  ' })).name).toBe('Ada');
    expect(toRevealRequest(blank({ name: '   ' })).name).toBe(WIRE_GUEST_NAME);
    expect(toRevealRequest(blank({ name: 'x'.repeat(41) })).name).toBe(WIRE_GUEST_NAME);
    expect(toRevealRequest(blank({ name: 'A\u200bda' })).name).toBe(WIRE_GUEST_NAME);
  });

  it('drops unknown labels, keys and words rather than guessing', () => {
    const request = toRevealRequest(blank({
      lens: 'A stranger',
      color: '#123456',
      gravity: { 'solitary-social': 49.6, 'not-a-pole': 10, 'controlled-wild': 140, 'grounded-dreamlike': Number.NaN },
      texture: { 'sharp-smooth': 'Smooth', 'quiet-loud': 'Shouty', nonsense: 'Sharp' },
      drawnToward: ['Mischief', 'Caring', 'Freedom', 'Freedom'],
      soughtFor: ['Advice', 'Snacks'],
      flavors: ['Umami', 'Smoky'],
      allergies: 'Alcohol, Nuts, Dairy,  Gluten , Egg whites, Spice',
    }));
    expect(request.lens).toBeNull();
    expect(request.seed).toBeNull();
    expect(request.gravity).toEqual({ 'solitary-social': 50, 'controlled-wild': 100 });
    expect(request.texture).toEqual({ 'sharp-smooth': 'b' });
    expect(request.drawnToward).toEqual(['freedom', 'caring']);
    expect(request.soughtFor).toEqual(['advice']);
    expect(request.flavors).toEqual(['smoky']);
    // all five vetoes travel, in vocabulary order
    expect(request.vetoes).toEqual(['egg-white', 'dairy', 'gluten', 'nuts', 'spice']);
  });

  it('maps the legacy lens label to its permanent id', () => {
    expect(toRevealRequest(blank({ lens: 'Someone else' })).lens).toBe('another-side');
  });
});

describe('seedFromHex', () => {
  it('matches the eight seeds case-insensitively and nothing else', () => {
    expect(seedFromHex('#C8102E')).toBe('campari-red');
    expect(seedFromHex('#e8702a')).toBeNull();
    expect(seedFromHex('')).toBeNull();
  });
});
