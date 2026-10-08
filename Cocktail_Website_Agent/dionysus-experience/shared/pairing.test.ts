import { describe, expect, it } from 'vitest';
import { ALL_PAIRINGS, ARCHETYPES, isPairingKey, pairingKey, parsePairingKey } from './pairing';

describe('pairingKey', () => {
  it('formats lowercase primary-secondary slugs, spaces as dashes', () => {
    expect(pairingKey('Magician', 'Outlaw')).toBe('magician-outlaw');
    expect(pairingKey('Regular Guy', 'Sage')).toBe('regular-guy-sage');
    expect(pairingKey('Sage', 'Regular Guy')).toBe('sage-regular-guy');
  });

  it('refuses a self-pair', () => {
    expect(() => pairingKey('Hero', 'Hero')).toThrow();
  });
});

describe('parsePairingKey', () => {
  it('inverts pairingKey for every pairing', () => {
    for (const key of ALL_PAIRINGS) {
      const parsed = parsePairingKey(key);
      expect(parsed).not.toBeNull();
      expect(pairingKey(parsed!.primary, parsed!.secondary)).toBe(key);
    }
    expect(parsePairingKey('regular-guy-sage')).toEqual({ primary: 'Regular Guy', secondary: 'Sage' });
  });

  it('rejects anything else', () => {
    for (const key of ['', 'hero', 'hero-hero', 'Magician-Outlaw', 'regular guy-sage', 'regular-sage', 'magician-outlaw-', 'house-trickster']) {
      expect(parsePairingKey(key)).toBeNull();
      expect(isPairingKey(key)).toBe(false);
    }
  });
});

describe('ALL_PAIRINGS', () => {
  it('holds 132 unique keys and no self-pairs', () => {
    expect(ARCHETYPES).toHaveLength(12);
    expect(ALL_PAIRINGS).toHaveLength(132);
    expect(new Set(ALL_PAIRINGS).size).toBe(132);
    for (const key of ALL_PAIRINGS) {
      const { primary, secondary } = parsePairingKey(key)!;
      expect(primary).not.toBe(secondary);
    }
  });

  it('is ordered by key ascending', () => {
    const sorted = [...ALL_PAIRINGS].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    expect(ALL_PAIRINGS).toEqual(sorted);
    expect(ALL_PAIRINGS[0]).toBe('caregiver-creator');
    expect(ALL_PAIRINGS.at(-1)).toBe('sage-ruler');
  });
});
