import { describe, expect, it } from 'vitest';
import { isRememberedPour, lastRememberedPour, rememberPour } from './kept';

const memory = (seed: Record<string, string> = {}): Storage => {
  const m = new Map(Object.entries(seed));
  return {
    get length() { return m.size; },
    clear: () => m.clear(),
    getItem: (k) => m.get(k) ?? null,
    key: (i) => [...m.keys()][i] ?? null,
    removeItem: (k) => { m.delete(k); },
    setItem: (k, v) => { m.set(k, String(v)); },
  };
};

const ada = { pairing: 'sage-lover', name: 'Ada', seed: null };

describe('kept pours', () => {
  it('remembers a pour exactly, name and seed included', () => {
    const store = memory();
    rememberPour(ada, store);
    expect(isRememberedPour(ada, store)).toBe(true);
    expect(isRememberedPour({ ...ada, name: 'Celeste' }, store)).toBe(false);
    expect(isRememberedPour({ ...ada, seed: 'galliano-gold' }, store)).toBe(false);
  });

  it('keeps the newest first, once, and at most twelve', () => {
    const store = memory();
    for (let i = 0; i < 14; i++) rememberPour({ ...ada, name: `n${i}` }, store);
    rememberPour({ ...ada, name: 'n5' }, store);
    expect(lastRememberedPour(store)?.name).toBe('n5');
    expect(JSON.parse(store.getItem('dionysus.kept')!)).toHaveLength(12);
    expect(isRememberedPour({ ...ada, name: 'n0' }, store)).toBe(false);
  });

  it('forgets nothing it cannot read and never throws', () => {
    expect(isRememberedPour(ada, memory({ 'dionysus.kept': '{nope' }))).toBe(false);
    expect(isRememberedPour(ada, memory({ 'dionysus.kept': '[{"pairing":1}]' }))).toBe(false);
    expect(isRememberedPour(ada, null)).toBe(false);
    const full = { ...memory(), setItem: () => { throw new Error('quota'); } } as Storage;
    expect(() => rememberPour(ada, full)).not.toThrow();
  });
});
