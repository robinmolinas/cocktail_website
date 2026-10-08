// The content gate over the committed store (AD-4, spine "Content gate").
// Runs in `npm run build`. Development: ≥3 veto-free authored pours.
// `STRICT_STORE=1` (launch): all 132 pairings and ≥12 veto-free.

import { beforeAll, describe, expect, it } from 'vitest';
import { ALL_PAIRINGS, pairingKey, parsePairingKey } from '../pairing';
import { validateCatalogue } from '../validate';
import catalogue from './catalogue.json';
import { ARCHETYPE_PAIRINGS } from './archetypes';
import { PERSONA_FALLBACK, personaImageFor } from './personas';
import { POUR_LOADERS } from './pours';
import { AUTHORED_POURS } from './pours/static';
import type { AuthoredPour } from './schema';

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const strict = env.STRICT_STORE === '1';

let pours: AuthoredPour[] = [];

beforeAll(async () => {
  pours = await Promise.all(ALL_PAIRINGS.flatMap((key) => POUR_LOADERS[key]?.() ?? []));
});

describe(`the committed store (${strict ? 'STRICT_STORE=1' : 'development'})`, () => {
  it('passes the validator', () => {
    expect(validateCatalogue(catalogue, pours, { strict })).toEqual([]);
  });

  it('has a loader for every catalogue entry', () => {
    expect(pours.map((p) => p.pairing)).toEqual(catalogue.map((e) => e.pairing));
  });

  it('keeps the static registry identical to the lazy store and catalogue', () => {
    expect(Object.keys(AUTHORED_POURS)).toEqual(Object.keys(POUR_LOADERS));
    expect(Object.values(AUTHORED_POURS)).toEqual(pours);
    expect(validateCatalogue(catalogue, Object.values(AUTHORED_POURS), { strict })).toEqual([]);
  });

  it('matches every pour personality to its permanent archetype identity', () => {
    const identities = new Map(ARCHETYPE_PAIRINGS.map((row) => [pairingKey(row.primary, row.secondary), row]));
    expect(identities.size).toBe(ALL_PAIRINGS.length);
    expect([...identities.keys()].sort()).toEqual(ALL_PAIRINGS);
    for (const pour of pours) expect(identities.get(pour.pairing)?.name).toBe(pour.personality);
  });

  it('has a registered scene with geometry for all 132 pairings', () => {
    for (const key of ALL_PAIRINGS) {
      const identity = parsePairingKey(key)!;
      const image = personaImageFor(identity.primary, identity.secondary);
      expect(image.src).toBe(`/personas/${key}/portrait.jpg`);
      expect(image.wide).toBe(`/personas/${key}/wide.jpg`);
      expect(image.tag).toBeDefined();
      expect(image.wideTag).toBeDefined();
      expect(image.glass).toBeDefined();
      expect(image.wideGlass).toBeDefined();
    }
  });

  it('falls back to a stand-in with no glass and no tag for an unregistered key', () => {
    expect(personaImageFor('Nobody', 'Else')).toEqual(PERSONA_FALLBACK);
    expect(PERSONA_FALLBACK.tag).toBeUndefined();
    expect(PERSONA_FALLBACK.wideTag).toBeUndefined();
  });
});

// Nothing from a `## Dossier` section or from trailing reading notes reaches
// what the guest sees. Anchors are never rendered; only `(dossier…)` kinds
// are checked there, and dossier-only anchors are exempt.
const literal = (word: string) => new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const FORBIDDEN: RegExp[] = [
  ...['Tomás', 'Wren', 'Hester', 'Robin', 'y5', 'draft v', 'spec v', 'closing line', '(dossier'].map(literal),
  /\b[rR]\d+\b/, // studio round markers (r4, R2)
];

function guestFields(pour: AuthoredPour): [string, string][] {
  const c = pour.cocktail;
  const r = pour.reading;
  return [
    ['personality', pour.personality],
    ['name', c.name],
    ['tagline', c.tagline],
    ['glassware', c.glassware],
    ['serves', c.serves ?? ''],
    ['recipeIntro', c.recipeIntro ?? ''],
    ['amountHeader', c.amountHeader],
    ...c.recipe.map((line, i): [string, string] => [`recipe[${i}]`, `${line.amount} | ${line.item} | ${line.note ?? ''}`]),
    ...c.preparations.map((p, i): [string, string] => [`preparations[${i}]`, `${p.title}: ${p.text}`]),
    ...c.method.map((m, i): [string, string] => [`method[${i}]`, m]),
    ['closingLine', c.closingLine],
    ['epigraph', r.epigraph],
    ...r.whoYouAre.map((p, i): [string, string] => [`whoYouAre[${i}]`, p]),
    ...r.yours.map((p, i): [string, string] => [`yours[${i}]`, p]),
  ];
}

describe('no studio or dossier text in guest fields', () => {
  it(`scans every pour (${catalogue.length})`, () => {
    const hits: string[] = [];
    for (const pour of pours) {
      for (const [field, value] of guestFields(pour)) {
        for (const pattern of FORBIDDEN) {
          const m = pattern.exec(value);
          if (m) hits.push(`${pour.pairing}.${field}: "${m[0]}"`);
        }
      }
      for (const [i, anchor] of pour.anchors.entries()) {
        if (!anchor.dossierOnly && anchor.kind.includes('(dossier')) hits.push(`${pour.pairing}.anchors[${i}].kind`);
      }
    }
    expect(hits).toEqual([]);
  });
});
