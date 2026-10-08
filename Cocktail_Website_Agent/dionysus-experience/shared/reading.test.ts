import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FLAVOURS, SEEDS } from './answers';
import { ARCHETYPE_PAIRINGS } from './data/archetypes';
import catalogue from './data/catalogue.json';
import { personaImageFor } from './data/personas';
import { AUTHORED_POURS } from './data/pours/static';
import { POUR_STATUSES, type AuthoredPour } from './data/schema';
import { parsePairingKey, type PairingKey } from './pairing';
import { acceptTailoring, assembleReading, type LiveCopy } from './reading';
import { validateCatalogue } from './validate';

const pours = Object.values(AUTHORED_POURS);
const importedRegistry = { ...AUTHORED_POURS };
const SAMPLE = 'creator-magician';

// Explicit, schema-valid records keep edge cases independent of whichever
// pours happen to be imported in a sparse development store.
function fixturePour(pairing: PairingKey, personality: string): AuthoredPour {
  return {
    pairing,
    personality,
    status: 'approved',
    cocktail: {
      name: 'Fixture Pour',
      tagline: 'A small light in the glass.',
      glassware: 'Coupe',
      serves: '1',
      recipeIntro: 'Keep the glass cold.',
      amountHeader: 'amount',
      recipe: [
        { amount: '45 ml', item: 'gin', note: 'chilled' },
        { amount: '', item: 'lemon peel' },
        { amount: '*for the ice*', item: '' },
      ],
      preparations: [{ title: 'Chill', text: 'Chill the glass.' }],
      method: ['Stir and strain.'],
      closingLine: 'Keep the light.',
      contains: [],
    },
    anchors: [1, 2, 3].map((n) => ({ kind: 'gesture', fact: `Fixture fact ${n}.`, meaning: `Fixture meaning ${n}.`, dossierOnly: false })),
    reading: {
      epigraph: 'A small light remains.',
      whoYouAre: ['You keep an ember glowing in the rain.'],
      yours: ['An **ember** warms the glass while silver moonlight settles on the rim.', 'A quiet flame carries your warmth through the mist and rain.'],
    },
  };
}

const authored = fixturePour(SAMPLE, 'The Makeover Artist');
const fixturePours = [authored, fixturePour('caregiver-creator', 'The Craftsman')];

function useRegistry(records: readonly AuthoredPour[]) {
  for (const key of Object.keys(AUTHORED_POURS) as PairingKey[]) delete AUTHORED_POURS[key];
  for (const record of records) AUTHORED_POURS[record.pairing] = record;
}

describe('acceptTailoring', () => {
  it.each([
    ['ember!', false], // 60%
    ['ember!!', true], // 70%, inclusive; one of two content words
    ['ember glow!!!', true], // 130%, inclusive
    ['ember glow!!!!', false], // 140%
  ])('enforces inclusive length boundaries: %s → %s', (candidate, expected) => {
    expect(acceptTailoring(['ember glow'], [candidate])).toBe(expected);
  });

  it.each([
    ['ember!!', true],
    ['ember!', false],
    [`ember${'😀'.repeat(8)}`, true],
    [`ember${'😀'.repeat(9)}`, false],
  ])('counts Unicode code points: %s → %s', (candidate, expected) => {
    expect(acceptTailoring([`ember${'😀'.repeat(5)}`], [candidate])).toBe(expected);
  });

  it('uses aggregate length and aggregate words across paragraphs', () => {
    expect(acceptTailoring(['ember', 'glow'], ['ember glow', '!'])).toBe(true);
    expect(acceptTailoring(['ember glow', 'mist rain'], ['mist rain', 'ember glow'])).toBe(true);
  });

  it('includes exactly half of the authored word occurrences', () => {
    expect(acceptTailoring(['ember glow mist rain'], ['ember glow silk wave'])).toBe(true);
    expect(acceptTailoring(['ember glow mist rain'], ['ember silk dusk wave'])).toBe(false);
    expect(acceptTailoring(['ember glow mist'], ['ember glow rain'])).toBe(true);
    expect(acceptTailoring(['ember glow mist'], ['ember dusk rain'])).toBe(false);
  });

  it('uses a multiset so repeating one word cannot manufacture retention', () => {
    expect(acceptTailoring(['ember glow mist rain'], ['ember ember ember ember'])).toBe(false);
    expect(acceptTailoring(['ember ember glow mist'], ['ember ember dusk wave'])).toBe(true);
    expect(acceptTailoring(['ember ember glow mist'], ['ember dusk dusk dusk'])).toBe(false);
  });

  it('excludes English function words and rejects baselines without content words', () => {
    expect(acceptTailoring(['the amber moon'], ['the other star'])).toBe(false);
    expect(acceptTailoring(['the and you'], ['the and you'])).toBe(false);
    expect(acceptTailoring(["you're at the ember"], ["you're at the other"])).toBe(false);
    expect(acceptTailoring(['😀!!!'], ['😀!!!'])).toBe(false);
  });

  it('normalizes case, Unicode letters and apostrophes without stemming', () => {
    expect(acceptTailoring(['CAFÉ moon'], ['cafe\u0301 MOON'])).toBe(true);
    expect(acceptTailoring(['ＦＩＲＥ ember'], ['fire EMBER'])).toBe(true);
    expect(acceptTailoring(['pilot’s ember'], ["PILOT'S EMBER"])).toBe(true);
    expect(acceptTailoring(['pilotʼs ember'], ["pilot's ember"])).toBe(true);
    expect(acceptTailoring(['火焰 星光'], ['火焰 雨水'])).toBe(true);
    expect(acceptTailoring(['embers moon'], ['ember rain'])).toBe(false);
    expect(acceptTailoring(['pilot’s ember glow rain'], ['pilots silk glow dusk'])).toBe(false);
  });

  it.each([
    null, undefined, 'ember glow', {}, { yours: ['ember glow'] }, [], [''], ['  \n\t'],
    [42], [null], [undefined], new Array(1), ['ember glow', 'ember glow'],
  ])('rejects malformed or wrong-count paragraph arrays: %j', (candidate) => {
    expect(acceptTailoring(['ember glow'], candidate)).toBe(false);
  });

  it('does not mutate either paragraph array', () => {
    const source = Object.freeze(['ember glow']);
    const candidate = Object.freeze([' EMBER glow ']);
    expect(acceptTailoring(source, candidate)).toBe(true);
    expect(source).toEqual(['ember glow']);
    expect(candidate).toEqual([' EMBER glow ']);
  });
});

describe('assembleReading with the imported store', () => {
  it('covers every imported pairing', () => {
    expect(pours.map((pour) => pour.pairing)).toEqual(catalogue.map((entry) => entry.pairing));
  });

  it.each(pours)('preserves the complete authored $pairing reading', (pour) => {
    const identity = parsePairingKey(pour.pairing)!;
    const archetype = ARCHETYPE_PAIRINGS.find((row) => row.primary === identity.primary && row.secondary === identity.secondary)!;
    const result = assembleReading(pour.pairing, null, '  René **M**\n  ', null);
    expect(result).toEqual({
      pairing: pour.pairing,
      archetype,
      cocktail: pour.cocktail,
      ...pour.reading,
      persona: personaImageFor(identity.primary, identity.secondary),
      name: '  René **M**\n  ',
      seed: null,
      copy: null,
    });
    expect(result.archetype.name).toBe(pour.personality);
    expect(result).not.toHaveProperty('anchors');
  });

  it.each(pours)('accepts bounded tailoring of only $pairing yours', (pour) => {
    const yours = pour.reading.yours.map((paragraph) => `${paragraph}!`);
    const copy = { yours };
    const result = assembleReading(pour.pairing, copy, 'Robin', 'campari-red');
    expect(result).toEqual({ ...assembleReading(pour.pairing, null, 'Robin', 'campari-red'), yours, copy });
    expect(result.copy).not.toBe(copy);
    expect(result.yours).not.toBe(copy.yours);
    expect(result.copy!.yours).not.toBe(copy.yours);
  });
});

describe('assembleReading with isolated fixtures', () => {
  beforeEach(() => {
    useRegistry(JSON.parse(JSON.stringify(fixturePours)) as AuthoredPour[]);
  });

  afterEach(() => {
    useRegistry(Object.values(importedRegistry));
  });

  it('exercises optional recipe fields, blank cells and inline markdown', () => {
    const result = assembleReading(SAMPLE, null, 'Robin', null);
    expect(result.cocktail).toEqual(authored.cocktail);
    expect(result.yours).toEqual(authored.reading.yours);
    expect(result.cocktail.serves).toBe('1');
    expect(result.cocktail.recipeIntro).toBe('Keep the glass cold.');
    expect(result.cocktail.recipe[1].amount).toBe('');
    expect(result.cocktail.recipe[2].item).toBe('');
    expect(result.cocktail.recipe[0].note).toBe('chilled');
    expect(result.cocktail.preparations).toEqual(authored.cocktail.preparations);
    expect(result.yours[0]).toContain('**ember**');
  });

  it('preserves accepted whitespace and markdown exactly', () => {
    const copy = { yours: authored.reading.yours.map((paragraph) => `\u200B  **${paragraph}**  \u0000`) };
    const result = assembleReading(SAMPLE, copy, 'Robin', null);
    expect(result.yours).toEqual(copy.yours);
    expect(result.copy).toEqual(copy);
  });

  it.each(['\u200B', '\u0000', ' \u200B\u0000\u200E\t\u0085'])(
    'falls back for a whitespace/control/format-only paragraph even when aggregate bounds pass: %j', (blank) => {
      const copy = { yours: [authored.reading.yours.join(' '), blank] };
      expect(acceptTailoring(authored.reading.yours, copy.yours)).toBe(false);
      expect(assembleReading(SAMPLE, copy, 'Robin', null)).toEqual(assembleReading(SAMPLE, null, 'Robin', null));
    },
  );

  it.each([
    undefined, 'text', 42, [], {}, { yours: 'text' }, { yours: [] }, { yours: [null] },
    { yours: new Array(authored.reading.yours.length) },
    { yours: authored.reading.yours, whoYouAre: authored.reading.whoYouAre },
    { yours: authored.reading.yours, cocktail: authored.cocktail },
    { yours: authored.reading.yours, extra: undefined },
    { yours: authored.reading.yours.map(() => '') },
    { yours: authored.reading.yours.map(() => '  \n\t') },
    { yours: authored.reading.yours.slice(1) },
    { yours: [...authored.reading.yours, authored.reading.yours[0]] },
    { yours: authored.reading.yours.map(() => 'ember') },
    { yours: authored.reading.yours.map((paragraph) => paragraph.repeat(2)) },
    { yours: authored.reading.yours.map((paragraph) => 'z'.repeat([...paragraph].length)) },
  ])('silently falls back for rejected live copy: %j', (copy) => {
    expect(assembleReading(SAMPLE, copy as LiveCopy, 'Robin', null)).toEqual(assembleReading(SAMPLE, null, 'Robin', null));
  });

  it.each(SEEDS)('passes $id through without rewriting prose', ({ id }) => {
    const result = assembleReading(SAMPLE, null, 'Robin', id);
    expect(result.seed).toBe(id);
    expect(result.yours).toEqual(authored.reading.yours);
  });

  it.each(POUR_STATUSES)('keeps a %s pour usable', (status) => {
    const authored = AUTHORED_POURS[SAMPLE]!;
    const original = authored.status;
    try {
      authored.status = status;
      expect(assembleReading(SAMPLE, null, 'Robin', null).cocktail).toEqual(authored.cocktail);
    } finally {
      authored.status = original;
    }
  });

  it('carries the registered image geometry for the pairing', () => {
    expect(assembleReading('caregiver-creator', null, 'Robin', null).persona).toEqual(personaImageFor('Caregiver', 'Creator'));
    expect(assembleReading('caregiver-creator', null, 'Robin', null).cocktail).toEqual(AUTHORED_POURS['caregiver-creator']!.cocktail);
  });

  it.each(['', 'hero-hero', 'regular-guy-regular-guy', 'hero-unknown', 'Hero-Sage', 'hero-sage ', 'hero', 'constructor', null, 42, Symbol('pairing')])(
    'fails clearly for invalid pairing %j', (pairing) => {
      expect(() => assembleReading(pairing as string, null, 'Robin', null)).toThrow(RangeError);
    },
  );

  it('assembles a valid sparse registry that has neither fixture pairing', () => {
    const sparse = [
      fixturePour('caregiver-explorer', 'The Researcher'),
      fixturePour('caregiver-hero', 'The Rescuer'),
      fixturePour('caregiver-sage', 'The Doctor'),
    ];
    const entries = sparse.map((pour) => ({
      pairing: pour.pairing,
      status: pour.status,
      contains: pour.cocktail.contains,
      flavour: Object.fromEntries(FLAVOURS.map(({ id }) => [id, 0.5])),
    }));
    expect(validateCatalogue(entries, sparse, { strict: false })).toEqual([]);
    useRegistry(sparse);
    expect(AUTHORED_POURS).not.toHaveProperty(SAMPLE);
    expect(AUTHORED_POURS).not.toHaveProperty('caregiver-creator');
    for (const pour of sparse) {
      const result = assembleReading(pour.pairing, null, 'Robin', null);
      expect(result.cocktail).toEqual(pour.cocktail);
      expect(result.yours).toEqual(pour.reading.yours);
    }
    expect(() => assembleReading(SAMPLE, null, 'Robin', null)).toThrow(RangeError);
  });

  it('fails for a valid pairing absent from a sparse store', () => {
    const original = AUTHORED_POURS[SAMPLE];
    try {
      delete AUTHORED_POURS[SAMPLE];
      expect(() => assembleReading(SAMPLE, null, 'Robin', null)).toThrow(RangeError);
    } finally {
      AUTHORED_POURS[SAMPLE] = original;
    }
  });

  it('fails on missing or mismatched identity metadata', () => {
    const authored = AUTHORED_POURS[SAMPLE]!;
    const identity = ARCHETYPE_PAIRINGS.find((row) => row.primary === 'Creator' && row.secondary === 'Magician')!;
    const index = ARCHETYPE_PAIRINGS.indexOf(identity);
    const originalPersonality = authored.personality;
    const originalPairing = authored.pairing;
    try {
      authored.personality = 'Another identity';
      expect(() => assembleReading(SAMPLE, null, 'Robin', null)).toThrow(RangeError);
      authored.personality = originalPersonality;
      authored.pairing = 'creator-hero';
      expect(() => assembleReading(SAMPLE, null, 'Robin', null)).toThrow(RangeError);
      authored.pairing = originalPairing;
      ARCHETYPE_PAIRINGS.splice(index, 1);
      expect(() => assembleReading(SAMPLE, null, 'Robin', null)).toThrow(RangeError);
    } finally {
      authored.personality = originalPersonality;
      authored.pairing = originalPairing;
      if (!ARCHETYPE_PAIRINGS.includes(identity)) ARCHETYPE_PAIRINGS.splice(index, 0, identity);
    }
  });

  it.each(['creator-magician', 'caregiver-creator'] as const)('isolates every mutable output and candidate for %s', (key) => {
    const pour = AUTHORED_POURS[key]!;
    const identity = parsePairingKey(key)!;
    const canonicalBefore = JSON.stringify([pour, ARCHETYPE_PAIRINGS, personaImageFor(identity.primary, identity.secondary)]);
    const candidate = { yours: [...pour.reading.yours] };
    const result = assembleReading(key, candidate, 'Robin', null);
    const independent = assembleReading(key, null, 'Robin', null);
    const independentBefore = JSON.stringify(independent);

    candidate.yours[0] = 'candidate changed';
    expect(result.yours).toEqual(pour.reading.yours);
    expect(result.copy!.yours).toEqual(pour.reading.yours);
    result.archetype.name = 'changed';
    result.cocktail.name = 'changed';
    result.cocktail.recipe[0].item = 'changed';
    result.cocktail.recipe.push({ amount: '1', item: 'changed' });
    if (result.cocktail.preparations[0]) result.cocktail.preparations[0].text = 'changed';
    result.cocktail.preparations.push({ title: 'changed', text: 'changed' });
    result.cocktail.method[0] = 'changed';
    result.cocktail.contains.push('nuts');
    result.whoYouAre[0] = 'changed';
    result.yours[0] = 'changed';
    result.copy!.yours[0] = 'changed';
    result.persona.src = 'changed';
    if (result.persona.tag) result.persona.tag.cx = 0;
    result.persona.glass.x = 0;
    if (result.persona.wideTag) result.persona.wideTag.cx = 0;
    if (result.persona.wideGlass) result.persona.wideGlass.x = 0;

    expect(candidate.yours).toEqual(['candidate changed', ...pour.reading.yours.slice(1)]);
    expect(JSON.stringify([pour, ARCHETYPE_PAIRINGS, personaImageFor(identity.primary, identity.secondary)])).toBe(canonicalBefore);
    expect(JSON.stringify(independent)).toBe(independentBefore);
    expect(assembleReading(key, null, 'Robin', null)).toEqual(independent);
  });
});
