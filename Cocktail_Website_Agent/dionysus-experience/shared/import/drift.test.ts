import { describe, expect, it } from 'vitest';
import type { CatalogueEntry } from '../data/schema';
import { classifyDrift } from './drift';

const flavour = { sweet: 1, bitter: 0, spicy: 0, herbal: 0.5, fruity: 0, citrusy: 0.6, fresh: 0.8, floral: 0.3, smoky: 0 };
const entry = (pairing: CatalogueEntry['pairing'], over: Partial<CatalogueEntry> = {}): CatalogueEntry => ({
  pairing,
  status: 'draft',
  contains: [],
  flavour,
  ...over,
});
// The committed file has sorted keys; key order must not count as drift.
const committedJson = (entries: CatalogueEntry[]) => JSON.parse(JSON.stringify(entries.map((e) => ({ ...e, flavour: { ...e.flavour } }))));

describe('classifyDrift', () => {
  const base = [entry('creator-hero', { contains: ['egg-white', 'dairy'] }), entry('hero-jester')];

  it('no drift', () => {
    const sorted = base.map((e) => ({ ...e, flavour: Object.fromEntries(Object.entries(e.flavour).sort()) }));
    expect(classifyDrift(sorted, base)).toEqual({ safety: [], flavour: [] });
  });

  it('flavour-only drift is informative, not safety', () => {
    const now = [base[0], entry('hero-jester', { flavour: { ...flavour, sweet: 0.5 } })];
    expect(classifyDrift(committedJson(base), now)).toEqual({ safety: [], flavour: ['hero-jester'] });
  });

  it('contains, status and the pairing set are safety drift, each named', () => {
    const now = [entry('creator-hero', { contains: ['egg-white'], status: 'approved' }), entry('hero-lover')];
    expect(classifyDrift(committedJson(base), now).safety).toEqual([
      'hero-jester: removed from the store',
      'creator-hero: contains ["egg-white","dairy"] → ["egg-white"]',
      'creator-hero: status "draft" → "approved"',
      'hero-lover: new in the store',
    ]);
  });

  it('a missing committed catalogue is safety drift', () => {
    expect(classifyDrift(null, base).safety).toEqual(['committed catalogue.json is missing or not an array']);
  });
});
