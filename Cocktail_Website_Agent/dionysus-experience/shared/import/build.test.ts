import { describe, expect, it } from 'vitest';
import { buildStore, type StoreSources } from './build';
import { loadersModule, renderReport, stableJson, staticModule } from './emit';
import { FIXTURE_RULES, FIXTURE_SPEC, FIXTURE_TABLE, fixtureDossier } from './fixtures';

const sources = (overrides: Partial<StoreSources> = {}): StoreSources => ({
  dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier() }],
  specs: new Map([['creator-hero', FIXTURE_SPEC]]),
  ingredients: FIXTURE_TABLE,
  rules: FIXTURE_RULES,
  ...overrides,
});

describe('buildStore', () => {
  it('builds the pour and its catalogue entry', () => {
    const store = buildStore(sources());
    expect(store.errors).toEqual([]);
    expect(store.pours.map((p) => p.pairing)).toEqual(['creator-hero']);
    expect(store.catalogue[0]).toMatchObject({ pairing: 'creator-hero', status: 'approved', contains: ['egg-white', 'dairy'] });
    expect(store.catalogue[0].flavour.herbal).toBe(0.5);
    expect(store.catalogue[0].flavour.floral).toBe(0.3); // drops → ×0.3
  });

  it('fails, naming the pairing, when contains misses an allergen the spec carries', () => {
    const store = buildStore(
      sources({ dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier({ contains: '`[]`', frontmatter: 'pairing: creator-hero\npersonality: The Visionary\nstatus: draft' }) }] }),
    );
    expect(store.pours).toEqual([]);
    expect(store.errors).toContain('creator-hero: contains misses "egg-white" (carried by egg_white)');
    expect(store.errors).toContain('creator-hero: contains misses "dairy" (carried by cream)');
  });

  it('counts garnish allergens', () => {
    const spec = { ...FIXTURE_SPEC, garnish: ['nutmeg_grated'] };
    const table = { ingredients: { ...FIXTURE_TABLE.ingredients, nutmeg_grated: { sugar: 0, contains: ['nuts'] } } };
    const store = buildStore(sources({ specs: new Map([['creator-hero', spec]]), ingredients: table }));
    expect(store.errors).toEqual(['creator-hero: contains misses "nuts" (carried by nutmeg_grated)']);
  });

  it('fails on a spec ingredient missing from the table', () => {
    const spec = { ...FIXTURE_SPEC, ingredients: [...FIXTURE_SPEC.ingredients, { key: 'mystery_liqueur', ml: 10 }] };
    const store = buildStore(sources({ specs: new Map([['creator-hero', spec]]) }));
    expect(store.errors).toEqual(['creator-hero: spec ingredient "mystery_liqueur" is not in the ingredient table']);
  });

  it('reports an over-declared veto without failing', () => {
    const store = buildStore(
      sources({ dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier({ contains: '`["egg-white", "dairy", "nuts"]`' }) }] }),
    );
    expect(store.errors).toEqual([]);
    expect(store.warnings.get('creator-hero')?.some((w) => w.startsWith('contains declares "nuts"'))).toBe(true);
  });

  it('fails on a missing spec and on a spec with no dossier', () => {
    const store = buildStore(sources({ specs: new Map([['hero-creator', { ...FIXTURE_SPEC, pairing: 'hero-creator' }]]) }));
    expect(store.errors).toContain('creator-hero: missing spec _studio/specs/creator-hero.json');
    expect(store.errors).toContain('hero-creator: spec has no dossier');
  });

  it('lists the parse errors of every broken pour, each prefixed with its pairing', () => {
    const store = buildStore(
      sources({
        dossiers: [
          { pairing: 'creator-hero', markdown: fixtureDossier({ omit: ['name'] }) },
          { pairing: 'hero-creator', markdown: fixtureDossier({ frontmatter: 'pairing: hero-creator\npersonality: X\nstatus: nope' }) },
        ],
        specs: new Map([
          ['creator-hero', FIXTURE_SPEC],
          ['hero-creator', { ...FIXTURE_SPEC, pairing: 'hero-creator' }],
        ]),
      }),
    );
    expect(store.errors.some((e) => e.startsWith('creator-hero: cocktail.name'))).toBe(true);
    expect(store.errors.some((e) => e.startsWith('hero-creator: status'))).toBe(true);
  });

  it('reports quantity differences against the spec without failing', () => {
    const spec = { ...FIXTURE_SPEC, ingredients: [{ key: 'gin_london_dry', ml: 50 }, ...FIXTURE_SPEC.ingredients.slice(1)] };
    const store = buildStore(sources({ specs: new Map([['creator-hero', spec]]) }));
    expect(store.errors).toEqual([]);
    const notes = store.warnings.get('creator-hero') ?? [];
    expect(notes).toContain('quantity: spec gin_london_dry = 50 ml has no matching amount in the recipe');
    expect(notes).toContain('quantity: recipe "60 ml London dry gin" (60 ml) has no matching spec amount');
  });

  it('fails on an ingredient-table row with no contains (unclassified)', () => {
    const table = { ingredients: { ...FIXTURE_TABLE.ingredients, cream: { sugar: 3 } } };
    expect(buildStore(sources({ ingredients: table })).errors.join('\n')).toMatch(/^ingredient table: ingredients\.cream\.contains/m);
  });

  it('returns a bad flavour-rules pattern as an error instead of throwing', () => {
    const store = buildStore(sources({ rules: { rules: { herbal: [['gin(', 0.5]] } } }));
    expect(store.errors).toEqual(['flavour rules: invalid pattern for herbal: gin(']);
  });

  it('quantities: dashes/drops in ml, ml in the item, ranges, dilution skipped, the rest listed as not compared', () => {
    const recipe = `| amount | item | note |
| --- | --- | --- |
| 45 ml (1½ oz) | rye | |
| 2 dashes | Angostura bitters | |
| 3 drops | orange flower water | |
| 1 | egg white (about 30 ml) | |
| 0-20 ml | cold water, only if needed | |
| 1 strip | orange peel | |`;
    const spec = {
      pairing: 'creator-hero',
      ingredients: [
        { key: 'gin_london_dry', ml: 45 },
        { key: 'cream', dashes: 2 },
        { key: 'orange_flower_water', drops: 3 },
        { key: 'egg_white', ml: 30 },
        { key: 'simple_syrup', ml: 10 },
        { key: 'water', ml: 25 },
        { key: 'lemon_peel', ml: 0 },
        { key: 'simple_syrup', g: 5 },
      ],
      garnish: [],
    };
    const table = { ingredients: { ...FIXTURE_TABLE.ingredients, water: { sugar: 0, contains: [] } } };
    const store = buildStore(
      sources({ dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier({ recipe }) }], specs: new Map([['creator-hero', spec]]), ingredients: table }),
    );
    expect(store.errors).toEqual([]);
    expect((store.warnings.get('creator-hero') ?? []).filter((w) => w.startsWith('quantity') || w.startsWith('not compared'))).toEqual([
      'not compared: recipe "1 strip orange peel"',
      'not compared: spec simple_syrup {"g":5}',
    ]);
  });

  it('quantities: a batch recipe is not compared', () => {
    const recipe = `| amount (batch) | item | note |
| --- | --- | --- |
| 480 ml | gin | |`;
    const store = buildStore(sources({ dossiers: [{ pairing: 'creator-hero', markdown: fixtureDossier({ recipe }) }] }));
    expect(store.warnings.get('creator-hero')).toContain('not compared: batch recipe');
  });

  it('is deterministic: two runs render identical bytes', () => {
    const render = () => {
      const store = buildStore(sources());
      return [
        stableJson(store.catalogue),
        ...store.pours.map(stableJson),
        loadersModule(store.pours.map((p) => p.pairing)),
        staticModule(store.pours.map((p) => p.pairing)),
        renderReport({ pairings: store.pours.map((p) => p.pairing), statuses: new Map(store.pours.map((p) => [p.pairing, p.status])), warnings: store.warnings, vetoFree: 0 }),
      ].join('\u0000');
    };
    expect(render()).toBe(render());
  });
});

describe('staticModule', () => {
  it('has only imported keys, in deterministic order, with no invented sparse entries', () => {
    const rendered = staticModule(['hero-creator', 'creator-hero']);
    expect(rendered).toBe(staticModule(['creator-hero', 'hero-creator']));
    expect(rendered).toContain("import pour0 from './creator-hero.json';");
    expect(rendered).toContain("import pour1 from './hero-creator.json';");
    expect(rendered).toContain("  'creator-hero': pour0 as AuthoredPour,");
    expect(rendered).toContain("  'hero-creator': pour1 as AuthoredPour,");
    expect(rendered).not.toContain('hero-hero');
    expect(rendered).not.toContain('caregiver-creator');
    expect(rendered).toMatch(/Partial<Record<PairingKey, AuthoredPour>>/);
    expect(rendered).toMatch(/\n$/);
  });

  it('renders an empty development store without importing pours', () => {
    const rendered = staticModule([]);
    expect(rendered).not.toContain('import pour');
    expect(rendered).toContain('AUTHORED_POURS: Partial<Record<PairingKey, AuthoredPour>> = {\n};');
  });
});

describe('stableJson', () => {
  it('sorts keys at every level and drops undefined', () => {
    expect(stableJson({ b: 1, a: { d: [{ z: 1, y: 2 }], c: undefined } })).toBe(
      '{\n  "a": {\n    "d": [\n      {\n        "y": 2,\n        "z": 1\n      }\n    ]\n  },\n  "b": 1\n}\n',
    );
  });
});
