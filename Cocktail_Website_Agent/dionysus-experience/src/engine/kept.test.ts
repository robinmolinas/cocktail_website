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
// fourteen names the cleaner keeps, so each is a different pour
const NAMES = ['Ada', 'Bea', 'Cleo', 'Dora', 'Elio', 'Faye', 'Gus', 'Hana', 'Iris', 'Jude', 'Kai', 'Lena', 'Milo', 'Nora'];

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
    for (const name of NAMES) rememberPour({ ...ada, name }, store);
    rememberPour({ ...ada, name: 'Faye' }, store);
    expect(lastRememberedPour(store)?.name).toBe('Faye');
    expect(JSON.parse(store.getItem('dionysus.kept')!)).toHaveLength(12);
    expect(isRememberedPour({ ...ada, name: 'Ada' }, store)).toBe(false);
  });

  it('knows a pour stored under a raw name by its cleaned name, and back', () => {
    const store = memory();
    // stored before the cleaner (2.1): the name exactly as typed
    rememberPour({ ...ada, name: 'ROBIN 🍸' }, store);
    expect(isRememberedPour({ ...ada, name: 'Robin' }, store)).toBe(true);
    // a link written before the cleaner, reopened after it
    const fresh = memory();
    rememberPour({ ...ada, name: 'Robin' }, fresh);
    expect(isRememberedPour({ ...ada, name: '  robin ' }, fresh)).toBe(true);
    expect(isRememberedPour({ ...ada, name: 'Robine' }, fresh)).toBe(false);
    // a name the cleaner drops is the nameless pour
    const nameless = memory();
    rememberPour({ ...ada, name: '' }, nameless);
    expect(isRememberedPour({ ...ada, name: 'asdf' }, nameless)).toBe(true);
    expect(isRememberedPour({ ...ada, name: 'Robin' }, nameless)).toBe(false);
  });

  it('forgets nothing it cannot read and never throws', () => {
    expect(isRememberedPour(ada, memory({ 'dionysus.kept': '{nope' }))).toBe(false);
    expect(isRememberedPour(ada, memory({ 'dionysus.kept': '[{"pairing":1}]' }))).toBe(false);
    expect(isRememberedPour(ada, null)).toBe(false);
    const full = { ...memory(), setItem: () => { throw new Error('quota'); } } as Storage;
    expect(() => rememberPour(ada, full)).not.toThrow();
  });
});
