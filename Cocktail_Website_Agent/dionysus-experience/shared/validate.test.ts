import { describe, expect, it } from 'vitest';
import { FIXTURE_RULES, FIXTURE_SPEC, FIXTURE_TABLE, fixtureDossier } from './import/fixtures';
import { buildStore } from './import/build';
import { ALL_PAIRINGS } from './pairing';
import type { AuthoredPour, CatalogueEntry } from './data/schema';
import { validateCatalogue } from './validate';

// A veto-free fixture pour cloned under any pairing key.
const base = (() => {
  const store = buildStore({
    dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier() }],
    specs: new Map([['creator-hero', FIXTURE_SPEC]]),
    ingredients: FIXTURE_TABLE,
    rules: FIXTURE_RULES,
  });
  if (store.errors.length) throw new Error(store.errors.join('\n'));
  return { pour: store.pours[0], entry: store.catalogue[0] };
})();

function store(keys: readonly string[], containsFor: (i: number) => string[] = () => []) {
  const pours = keys.map((pairing, i) => ({ ...base.pour, pairing, cocktail: { ...base.pour.cocktail, contains: containsFor(i) } }) as AuthoredPour);
  const entries = keys.map((pairing, i) => ({ ...base.entry, pairing, contains: containsFor(i) }) as CatalogueEntry);
  return { pours, entries };
}

describe('validateCatalogue', () => {
  it('passes a development store with 3 veto-free pours', () => {
    const { entries, pours } = store(ALL_PAIRINGS.slice(0, 3));
    expect(validateCatalogue(entries, pours, { strict: false })).toEqual([]);
  });

  it('fails the development floor naming it', () => {
    const { entries, pours } = store(ALL_PAIRINGS.slice(0, 3), (i) => (i === 0 ? [] : ['dairy']));
    expect(validateCatalogue(entries, pours, { strict: false })).toEqual(['floor: 1 veto-free authored pours, need ≥3 (AD-4)']);
  });

  it('strict: requires all 132 and ≥12 veto-free', () => {
    const partial = store(ALL_PAIRINGS.slice(0, 20));
    expect(validateCatalogue(partial.entries, partial.pours, { strict: true }).join('\n')).toMatch(/^strict floor: 20\/132 pairings authored/);
    const few = store(ALL_PAIRINGS, (i) => (i < 11 ? [] : ['nuts']));
    expect(validateCatalogue(few.entries, few.pours, { strict: true })).toEqual([
      'strict floor: 11 veto-free authored pours, need ≥12 (AD-4, STRICT_STORE=1)',
    ]);
    const full = store(ALL_PAIRINGS, (i) => (i < 12 ? [] : ['nuts']));
    expect(validateCatalogue(full.entries, full.pours, { strict: true })).toEqual([]);
  });

  it('catches an entry without a pour, a pour without an entry, duplicates and bad keys', () => {
    const { entries, pours } = store(ALL_PAIRINGS.slice(0, 4));
    const problems = validateCatalogue([...entries, entries[0], { ...entries[1], pairing: 'hero-hero' }], pours.slice(1), { strict: false });
    expect(problems).toContain(`catalogue[4] (${entries[0].pairing}): duplicate pairing`);
    expect(problems).toContain('catalogue[5] (hero-hero): unknown pairing key "hero-hero"');
    expect(problems).toContain(`catalogue entry ${entries[0].pairing} has no pour`);
    const orphan = validateCatalogue(entries.slice(1), pours, { strict: false });
    expect(orphan).toContain(`pour ${pours[0].pairing} has no catalogue entry`);
  });

  it('catches contains drifting between the catalogue and the pour', () => {
    const { entries, pours } = store(ALL_PAIRINGS.slice(0, 4));
    entries[3] = { ...entries[3], contains: ['dairy'] };
    expect(validateCatalogue(entries, pours, { strict: false })).toEqual([
      `${entries[3].pairing}: catalogue contains ["dairy"] ≠ pour contains []`,
    ]);
  });

  it('catches schema problems', () => {
    const { entries, pours } = store(ALL_PAIRINGS.slice(0, 3));
    const broken = { ...pours[0], anchors: pours[0].anchors.slice(0, 2), extra: true };
    const problems = validateCatalogue(entries, [broken, ...pours.slice(1)], { strict: false });
    expect(problems.some((p) => p.startsWith(`pour ${pours[0].pairing}: anchors`))).toBe(true);
    expect(problems.some((p) => p.startsWith(`pour ${pours[0].pairing}: (root)`) && p.includes('extra'))).toBe(true);
  });
});
