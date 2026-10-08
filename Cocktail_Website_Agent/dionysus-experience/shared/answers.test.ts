import { describe, expect, it } from 'vitest';
import {
  BINARIES,
  DRAWN,
  FLAVOURS,
  GRAVITIES,
  LENSES,
  QUESTIONNAIRE_VERSION,
  SEEDS,
  SOUGHT,
  VETOES,
  canonicalWords,
  idFromLabel,
  parseRevealRequest,
  type Answers,
} from './answers';

const full = (): Answers => ({
  v: 3,
  name: 'Robin',
  lens: 'another-side',
  seed: 'pamplemousse-rose',
  gravity: {
    'solitary-social': 0,
    'controlled-wild': 100,
    'classic-experimental': 50,
    'analytical-instinctive': 12,
    'grounded-dreamlike': 88,
  },
  texture: {
    'sharp-smooth': 'a',
    'relaxed-excited': 'b',
    'halffull-halfempty': 'a',
    control: 'b',
    'quiet-loud': 'a',
    risk: 'b',
    'bright-dark': 'a',
    'soft-rough': 'b',
    harmonic: 'a',
  },
  drawnToward: ['freedom', 'wonder', 'mischief'],
  soughtFor: ['advice', 'honesty', 'little-chaos'],
  flavors: ['bitter', 'herbal', 'smoky'],
  vetoes: ['egg-white', 'nuts'],
});

const rejects = (input: unknown) => expect(parseRevealRequest(input).success).toBe(false);

describe('vocabularies', () => {
  it('carry exactly the ids in intake-contract.md', () => {
    const ids = (v: readonly { id: string }[]) => v.map((o) => o.id);
    expect(ids(LENSES)).toEqual(['real', 'becoming', 'night', 'inner-child', 'past', 'another-side']);
    expect(ids(SEEDS)).toEqual([
      'campari-red', 'aperol-orange', 'galliano-gold', 'midori-green',
      'curacao-blue', 'violette-purple', 'pamplemousse-rose', 'cassis-plum',
    ]);
    expect(ids(GRAVITIES)).toEqual([
      'solitary-social', 'controlled-wild', 'classic-experimental', 'analytical-instinctive', 'grounded-dreamlike',
    ]);
    expect(ids(BINARIES)).toEqual([
      'sharp-smooth', 'relaxed-excited', 'halffull-halfempty', 'control', 'quiet-loud',
      'risk', 'bright-dark', 'soft-rough', 'harmonic',
    ]);
    expect(ids(DRAWN)).toEqual(['freedom', 'beauty', 'mastery', 'peace', 'belonging', 'pleasure', 'wonder', 'change', 'mischief']);
    expect(ids(SOUGHT)).toEqual(['advice', 'comfort', 'honesty', 'courage', 'ideas', 'calm', 'taste', 'reality-check', 'little-chaos']);
    expect(ids(FLAVOURS)).toEqual(['sweet', 'bitter', 'spicy', 'herbal', 'fruity', 'citrusy', 'fresh', 'floral', 'smoky']);
    expect(ids(VETOES)).toEqual(['egg-white', 'dairy', 'gluten', 'nuts', 'spice']);
    expect(QUESTIONNAIRE_VERSION).toBe(3);
  });

  it('has no Alcohol veto', () => {
    expect(idFromLabel(VETOES, 'Alcohol')).toBeNull();
  });
});

describe('idFromLabel', () => {
  it('maps current and legacy labels to permanent ids', () => {
    expect(idFromLabel(LENSES, 'Another side of me')).toBe('another-side');
    expect(idFromLabel(LENSES, 'Someone else')).toBe('another-side');
    expect(idFromLabel(LENSES, 'The me I’m becoming')).toBe('becoming');
    expect(idFromLabel(SEEDS, 'Pamplemousse Rosé')).toBe('pamplemousse-rose');
    expect(idFromLabel(SEEDS, 'Curaçao Blue')).toBe('curacao-blue');
    expect(idFromLabel(SOUGHT, 'A reality check')).toBe('reality-check');
    expect(idFromLabel(VETOES, 'Egg whites')).toBe('egg-white');
  });

  it('returns null for an unknown label', () => {
    expect(idFromLabel(LENSES, 'Nobody')).toBeNull();
    expect(idFromLabel(SEEDS, 'Chartreuse Green')).toBeNull();
  });
});

describe('canonicalWords', () => {
  it('dedupes, drops unknown ids, sorts into vocabulary order and caps at 3', () => {
    expect(canonicalWords(DRAWN, ['mischief', 'freedom', 'freedom', 'nope'])).toEqual(['freedom', 'mischief']);
    expect(canonicalWords(FLAVOURS, ['smoky', 'sweet', 'fresh', 'bitter'])).toEqual(['sweet', 'bitter', 'fresh']);
    expect(canonicalWords(SOUGHT, [])).toEqual([]);
  });

  it('always yields a list the schema accepts', () => {
    const a = full();
    a.drawnToward = canonicalWords(DRAWN, ['wonder', 'beauty']);
    expect(parseRevealRequest(a).success).toBe(true);
  });
});

describe('parseRevealRequest', () => {
  it('accepts a full v3 answer set and returns typed data', () => {
    const result = parseRevealRequest(full());
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toEqual(full());
  });

  it('accepts absent optional answers', () => {
    const result = parseRevealRequest({
      v: 3, name: 'R', lens: null, seed: null, gravity: {}, texture: {},
      drawnToward: [], soughtFor: [], flavors: [], vetoes: [],
    });
    expect(result.success).toBe(true);
  });

  it('trims the name', () => {
    const result = parseRevealRequest({ ...full(), name: '  Robin  ' });
    expect(result.success && result.data.name).toBe('Robin');
  });

  it('never throws, whatever it is given', () => {
    for (const input of [undefined, null, 42, 'x', [], {}]) {
      expect(() => parseRevealRequest(input)).not.toThrow();
      rejects(input);
    }
  });

  it('rejects unknown keys at every depth', () => {
    rejects({ ...full(), extra: 1 });
    rejects({ ...full(), gravity: { ...full().gravity, 'up-down': 50 } });
    rejects({ ...full(), texture: { ...full().texture, tall: 'a' } });
  });

  it('rejects trace and diagnostics on the wire', () => {
    rejects({ ...full(), trace: 'the one thing' });
    rejects({ ...full(), diagnostics: { h4Mode: 'timed' } });
    rejects({ ...full(), gravityMoved: {} });
  });

  it('rejects retired v2 fields', () => {
    rejects({ ...full(), vessel: 'coupe' });
    rejects({ ...full(), allergies: 'nuts' });
    rejects({ ...full(), v: 2 });
  });

  it('rejects name bounds', () => {
    rejects({ ...full(), name: '' });
    rejects({ ...full(), name: '   ' });
    rejects({ ...full(), name: 'x'.repeat(41) });
    rejects({ ...full(), name: 'Ro\u0000bin' });
    rejects({ ...full(), name: 'Ro\nbin' });
    rejects({ ...full(), name: 'Ro\u0085bin' });
    rejects({ ...full(), name: '\u200B' });
    rejects({ ...full(), name: 'Ro\u202Ebin' });
    rejects({ ...full(), name: 'Ro\u2028bin' });
    expect(parseRevealRequest({ ...full(), name: 'x'.repeat(40) }).success).toBe(true);
  });

  it('counts the name in code points', () => {
    expect(parseRevealRequest({ ...full(), name: '🍸'.repeat(40) }).success).toBe(true);
    rejects({ ...full(), name: '🍸'.repeat(41) });
  });

  it('rejects gravity out of range or fractional', () => {
    rejects({ ...full(), gravity: { 'solitary-social': 101 } });
    rejects({ ...full(), gravity: { 'solitary-social': -1 } });
    rejects({ ...full(), gravity: { 'solitary-social': 2.5 } });
  });

  it('rejects a texture pole other than a or b', () => {
    rejects({ ...full(), texture: { control: 'c' } });
  });

  it('rejects 4 words, duplicates and out-of-order words', () => {
    rejects({ ...full(), drawnToward: ['freedom', 'beauty', 'mastery', 'peace'] });
    rejects({ ...full(), soughtFor: ['advice', 'advice'] });
    rejects({ ...full(), flavors: ['smoky', 'sweet'] });
    rejects({ ...full(), flavors: ['umami'] });
  });

  it('rejects unknown enum values', () => {
    rejects({ ...full(), lens: 'someone-else' });
    rejects({ ...full(), seed: '#c8102e' });
    rejects({ ...full(), vetoes: ['alcohol'] });
  });

  it('rejects duplicate and over-long veto lists', () => {
    rejects({ ...full(), vetoes: ['nuts', 'nuts'] });
    rejects({ ...full(), vetoes: ['egg-white', 'dairy', 'gluten', 'nuts', 'spice', 'nuts'] });
    expect(parseRevealRequest({ ...full(), vetoes: ['spice', 'egg-white', 'dairy', 'gluten', 'nuts'] }).success).toBe(true);
  });
});
