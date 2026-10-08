// The content gate over the committed store (AD-4, spine "Content gate").
// Runs in `npm run build`. Development: ≥3 veto-free authored pours.
// `STRICT_STORE=1` (launch): all 132 pairings and ≥12 veto-free.

import { beforeAll, describe, expect, it } from 'vitest';
import { ALL_PAIRINGS } from '../pairing';
import { validateCatalogue } from '../validate';
import catalogue from './catalogue.json';
import { POUR_LOADERS } from './pours';
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
