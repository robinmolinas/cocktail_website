import { describe, expect, it } from 'vitest';
import type { RevealRequest, Veto } from '../answers';
import type { PairingKey } from '../pairing';
import { boundedPick, selectShortlist, type EligibilityRecord } from './index';

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

describe('selectShortlist (stub score)', () => {
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
