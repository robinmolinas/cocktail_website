import { describe, expect, it } from 'vitest';
import catalogue from '../data/catalogue.json';
import { amountFactor, pourFlavour, rankSweet } from './flavour';
import { FIXTURE_RULES, FIXTURE_TABLE } from './fixtures';

describe('amountFactor', () => {
  it('scales by ml: ≥20 → 1, ≥7.5 → 0.6, else 0.3; non-ml → 0.3', () => {
    expect(amountFactor({ key: 'x', ml: 20 })).toBe(1);
    expect(amountFactor({ key: 'x', ml: 7.5 })).toBe(0.6);
    expect(amountFactor({ key: 'x', ml: 7 })).toBe(0.3);
    expect(amountFactor({ key: 'x', dashes: 2 })).toBe(0.3);
  });
});

describe('pourFlavour', () => {
  it('takes the max over ingredients, ignores garnish, and leaves top-stage ml out of the sugar', () => {
    const spec = {
      pairing: 'creator-hero',
      ingredients: [
        { key: 'gin_london_dry', ml: 10 },
        { key: 'gin_london_dry', ml: 40 },
        { key: 'simple_syrup', ml: 20 },
        { key: 'simple_syrup', ml: 100, stage: 'top' },
      ],
      garnish: ['lemon_peel'],
    };
    const { strength, sugarConc } = pourFlavour(spec, FIXTURE_TABLE.ingredients, FIXTURE_RULES.rules as never);
    expect(strength.herbal).toBe(0.5);
    expect(strength.citrusy).toBe(0); // the lemon peel is garnish
    expect(strength.sweet).toBe(0); // ranked later, over the collection
    expect(sugarConc).toBeCloseTo((20 * 61.5) / 100 / 70 * 100, 12);
  });
});

describe('rankSweet', () => {
  it('ranks at ⌊n/3⌋ and ⌊2n/3⌋ of the ascending list', () => {
    const sweet = rankSweet([5, 0, 1, 4, 2, 3]); // sorted 0..5; t1 = 2, t2 = 4
    expect([0, 1, 2, 3, 4, 5].map(sweet)).toEqual([0, 0, 0.5, 0.5, 1, 1]);
    expect(rankSweet([])(3)).toBe(0);
  });
});

// Parity with the reference implementation. Constants from
// agent/matching/matching.py load_catalogue(), run 2026-10-08 against the
// same sources (dossiers + specs, flavour-rules.json, the live dps-tools
// ingredient table): `python3 -c "import matching as m; cat =
// m.load_catalogue(m.Model(m.load_model())); print(cat[k]['flavour'])"`.
// The import was also checked equal on all 132 pours that day.
const MATCHING_PY: Record<string, Record<string, number>> = {
  'creator-hero': { sweet: 1.0, bitter: 0.0, spicy: 0.0, herbal: 0.5, fruity: 0.0, citrusy: 0.6, fresh: 0.8, floral: 0.3, smoky: 0.0 },
  'creator-magician': { sweet: 0.5, bitter: 0.0, spicy: 0.0, herbal: 0.5, fruity: 1.0, citrusy: 0.6, fresh: 0.0, floral: 0.0, smoky: 0.0 },
  'hero-jester': { sweet: 1.0, bitter: 0.0, spicy: 0.0, herbal: 0.0, fruity: 1.0, citrusy: 1.0, fresh: 0.0, floral: 0.0, smoky: 0.0 },
  'jester-sage': { sweet: 0.0, bitter: 0.5, spicy: 0.0, herbal: 0.5, fruity: 0.6, citrusy: 0.0, fresh: 0.0, floral: 0.0, smoky: 0.0 },
  'lover-creator': { sweet: 1.0, bitter: 0.0, spicy: 0.0, herbal: 1.0, fruity: 1.0, citrusy: 1.0, fresh: 1.0, floral: 0.0, smoky: 0.0 },
};

describe('flavour parity with matching.py', () => {
  for (const [pairing, expected] of Object.entries(MATCHING_PY)) {
    it(pairing, () => {
      const entry = catalogue.find((e) => e.pairing === pairing);
      expect(entry?.flavour).toEqual(expected);
    });
  }
});
