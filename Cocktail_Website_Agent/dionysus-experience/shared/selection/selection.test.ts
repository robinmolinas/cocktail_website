import { describe, expect, it } from 'vitest';
import { FLAVOURS, VETOES, type FlavourId, type RevealRequest, type Veto } from '../answers';
import type { PairingKey } from '../pairing';
import catalogue from '../data/catalogue.json';
import { CatalogueEntrySchema } from '../data/schema';
import { boundedPick, selectShortlist, type EligibilityRecord } from './index';
import type { FlavourStrengths } from './scoring';

const request = (vetoes: Veto[] = []): RevealRequest => ({
  v: 3, name: 'Robin', lens: null, seed: null, gravity: {}, texture: {},
  drawnToward: [], soughtFor: [], flavors: [], vetoes,
});

const records: EligibilityRecord[] = [
  { pairing: 'sage-ruler', contains: [] },
  { pairing: 'caregiver-creator', contains: ['nuts'] },
  { pairing: 'magician-outlaw', contains: ['dairy'] },
  { pairing: 'hero-jester', contains: ['nuts', 'egg-white'] },
  { pairing: 'regular-guy-sage', contains: [] },
];

const reversed = [...records].reverse();
const shuffled = [records[2], records[4], records[0], records[3], records[1]];

describe('selectShortlist (neutral default score)', () => {
  it('drops vetoed pairings and takes the first 3 by key', () => {
    expect(selectShortlist(request(['nuts']), records)).toEqual(['magician-outlaw', 'regular-guy-sage', 'sage-ruler']);
  });

  it('takes the first 3 by key with no vetoes', () => {
    expect(selectShortlist(request(), records)).toEqual(['caregiver-creator', 'hero-jester', 'magician-outlaw']);
  });

  it('is deterministic under input reordering', () => {
    for (const vetoes of [[], ['nuts'], ['dairy', 'egg-white']] as Veto[][]) {
      const expected = selectShortlist(request(vetoes), records);
      expect(selectShortlist(request(vetoes), reversed)).toEqual(expected);
      expect(selectShortlist(request(vetoes), shuffled)).toEqual(expected);
    }
  });

  it('returns what exists when fewer than 3 are eligible', () => {
    expect(selectShortlist(request(['nuts', 'dairy']), records)).toEqual(['regular-guy-sage', 'sage-ruler']);
    expect(selectShortlist(request(), [])).toEqual([]);
  });

  it('does not mutate its input', () => {
    const copy = records.map((r) => ({ ...r }));
    selectShortlist(request(['nuts']), records);
    expect(records).toEqual(copy);
  });
});

describe('selectShortlist (injected score)', () => {
  it('sorts by score descending, then key ascending', () => {
    const scores: Partial<Record<PairingKey, number>> = { 'sage-ruler': 2, 'regular-guy-sage': 1, 'magician-outlaw': 1 };
    const score = (_: RevealRequest, p: PairingKey) => scores[p] ?? 0;
    expect(selectShortlist(request(), records, score)).toEqual(['sage-ruler', 'magician-outlaw', 'regular-guy-sage']);
  });

  it('treats scores equal to 9 decimals as a tie', () => {
    const score = (_: RevealRequest, p: PairingKey) => (p === 'sage-ruler' ? 0.1 + 0.2 : 0.3);
    expect(selectShortlist(request(), records, score)).toEqual(['caregiver-creator', 'hero-jester', 'magician-outlaw']);
  });
});

const store = CatalogueEntrySchema.array().parse(catalogue);
const strengths = (overrides: Partial<Record<FlavourId, number>> = {}): FlavourStrengths =>
  Object.fromEntries(FLAVOURS.map(({ id }) => [id, overrides[id] ?? 0])) as FlavourStrengths;
function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
describe('selectShortlist (matching v1)', () => {
  it('uses the validated production catalogue by default', () => {
    expect(selectShortlist(request())).toEqual(selectShortlist(request(), store));
  });
  it('uses supplied flavour strengths rather than a global pour lookup', () => {
    const req = { ...request(), flavors: ['smoky'] as FlavourId[] };
    const supplied: EligibilityRecord[] = [
      { pairing: 'caregiver-creator', contains: [], flavour: strengths() },
      { pairing: 'sage-ruler', contains: [], flavour: strengths({ smoky: 1 }) },
    ];
    expect(selectShortlist(req, supplied)).toEqual(['sage-ruler', 'caregiver-creator']);
    expect(selectShortlist(req, records)).toEqual(selectShortlist(request(), records));
  });
  it('retains draft and flagged as well as approved records', () => {
    const supplied = [
      { pairing: 'sage-ruler' as const, contains: [], status: 'approved' },
      { pairing: 'hero-jester' as const, contains: [], status: 'flagged' },
      { pairing: 'caregiver-creator' as const, contains: [], status: 'draft' },
    ];
    expect(selectShortlist(request(), supplied)).toEqual(['caregiver-creator', 'hero-jester', 'sage-ruler']);
  });
  it('uses persona answers in the default scorer', () => {
    const req = { ...request(), drawnToward: ['freedom'] as RevealRequest['drawnToward'] };
    const supplied: EligibilityRecord[] = [{ pairing: 'caregiver-creator', contains: [] }, { pairing: 'explorer-sage', contains: [] }];
    expect(selectShortlist(req, supplied)[0]).toBe('explorer-sage');
    expect(selectShortlist(request(), supplied)[0]).toBe('caregiver-creator');
  });
  it('filters all 32 veto combinations and keeps a full shortlist', () => {
    for (let mask = 0; mask < 1 << VETOES.length; mask++) {
      const vetoes = VETOES.filter((_, i) => mask & (1 << i)).map(({ id }) => id);
      const shortlist = selectShortlist(request(vetoes));
      expect(shortlist).toHaveLength(3);
      for (const key of shortlist) expect(store.find(({ pairing }) => pairing === key)!.contains.some((veto) => vetoes.includes(veto))).toBe(false);
    }
  });
  it('ignores context, trace and diagnostics', () => {
    const req = { ...request(), drawnToward: ['freedom', 'wonder'] as RevealRequest['drawnToward'],
      soughtFor: ['courage', 'ideas'] as RevealRequest['soughtFor'], gravity: { 'solitary-social': 18 },
      texture: { risk: 'b' as const }, flavors: ['herbal'] as FlavourId[] };
    const other = { ...req, name: 'Someone different', lens: 'another-side' as const, seed: 'cassis-plum' as const,
      trace: 'Private', diagnostics: { h4Mode: 'untimed' } };
    expect(selectShortlist(other)).toEqual(selectShortlist(req));
  });
  it('does not mutate frozen requests or records', () => {
    const req = freeze({ ...request(['nuts']), flavors: ['sweet', 'herbal'] as FlavourId[] });
    const supplied = freeze(store.map((entry) => ({ ...entry, contains: [...entry.contains], flavour: { ...entry.flavour } })));
    const before = JSON.stringify({ req, supplied });
    expect(() => selectShortlist(req, supplied)).not.toThrow();
    expect(JSON.stringify({ req, supplied })).toBe(before);
  });
  it('handles exact half ties in injected scores like Python', () => {
    const pair: EligibilityRecord[] = [{ pairing: 'sage-ruler', contains: [] }, { pairing: 'caregiver-creator', contains: [] }];
    for (const [sage, caregiver] of [[0.0009765625, 0.000976562], [-0.0029296875, -0.002929688], [-5e-10, -1e-9]]) {
      expect(selectShortlist(request(), pair, (_, key) => key === 'sage-ruler' ? sage : caregiver)).toEqual(['caregiver-creator', 'sage-ruler']);
    }
  });
});

describe('boundedPick', () => {
  const shortlist: PairingKey[] = ['magician-outlaw', 'regular-guy-sage', 'sage-ruler'];

  it('keeps a pick inside the shortlist', () => {
    expect(boundedPick(shortlist, 'sage-ruler')).toBe('sage-ruler');
  });

  it('falls back to shortlist[0] for anything else', () => {
    for (const pick of ['hero-jester', 'nonsense', '', null, undefined, 3, { pairing: 'sage-ruler' }]) {
      expect(boundedPick(shortlist, pick)).toBe('magician-outlaw');
    }
  });

  it('returns null for an empty shortlist', () => {
    expect(boundedPick([], 'sage-ruler')).toBeNull();
  });
});
