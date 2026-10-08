import { describe, expect, it } from 'vitest';
import { AnswersSchema, DRAWN, FLAVOURS, SOUGHT, canonicalWords, type RevealRequest } from '../answers';
import { ALL_PAIRINGS, type PairingKey } from '../pairing';
import catalogue from '../data/catalogue.json';
import { CatalogueEntrySchema } from '../data/schema';
import { boundedPick, selectShortlist, type EligibilityRecord } from './index';
import { GROUPS, round9, scorePairing, scorePersona, type ArchetypeVector } from './scoring';
import reference from './reference-v1.json';

type ReferenceCase = { id: string; target?: PairingKey; answers: Partial<RevealRequest>;
  records?: EligibilityRecord[]; pairings?: PairingKey[]; shortlist: PairingKey[];
  numeric?: { motive: ArchetypeVector; expression: ArchetypeVector;
    groups: Record<(typeof GROUPS)[number], ArchetypeVector>; pairings: Record<PairingKey, number> } };
const corpus = reference as unknown as { cases: ReferenceCase[]; rounding: { score: number; rounded: number }[] };
const store = CatalogueEntrySchema.array().parse(catalogue);
const byKey = new Map(store.map((entry) => [entry.pairing, entry]));
function complete(answers: Partial<RevealRequest>): RevealRequest {
  return AnswersSchema.parse({ v: 3, name: 'Reference', lens: null, seed: null, gravity: {}, texture: {}, vetoes: [],
    ...answers,
    drawnToward: canonicalWords(DRAWN, answers.drawnToward ?? []),
    soughtFor: canonicalWords(SOUGHT, answers.soughtFor ?? []),
    flavors: canonicalWords(FLAVOURS, answers.flavors ?? []),
  });
}
function supplied(fixture: ReferenceCase): readonly EligibilityRecord[] {
  if (fixture.records !== undefined) return fixture.records;
  if (fixture.pairings !== undefined) return fixture.pairings.map((key) => {
    const entry = byKey.get(key);
    if (!entry) throw new Error(`Unknown supplied pairing ${key}`);
    return entry;
  });
  return store;
}
describe('Python shortlist parity', () => {
  it('includes one leading witness for each ordered pairing', () => {
    const targets = corpus.cases.flatMap(({ target }) => target === undefined ? [] : [target]);
    expect(targets).toHaveLength(132);
    expect([...targets].sort()).toEqual(ALL_PAIRINGS);
    expect(new Set(corpus.cases.map(({ id }) => id)).size).toBe(corpus.cases.length);
  });
  it('includes numeric expectations for full, missing-group and conflicting answers', () => {
    expect(corpus.cases.filter(({ numeric }) => numeric !== undefined).map(({ id }) => id))
      .toEqual(['witness:caregiver-creator', 'drawnToward:freedom', 'conflicting']);
  });
  for (const fixture of corpus.cases) it(fixture.id, () => {
    const req = complete(fixture.answers);
    const records = supplied(fixture);
    const shortlist = selectShortlist(req, records);
    expect(shortlist).toEqual(fixture.shortlist);
    expect(selectShortlist(req, [...records].reverse())).toEqual(fixture.shortlist);
    if (fixture.records === undefined && fixture.pairings === undefined) {
      expect(selectShortlist(req)).toEqual(fixture.shortlist);
    }
    if (fixture.numeric !== undefined) {
      const persona = scorePersona(req);
      // 12 decimal places: tolerance 5e-13 for binary64 accumulation differences.
      for (const archetype of Object.keys(fixture.numeric.motive) as (keyof ArchetypeVector)[]) {
        expect(persona.motive[archetype]).toBeCloseTo(fixture.numeric.motive[archetype], 12);
        expect(persona.expression[archetype]).toBeCloseTo(fixture.numeric.expression[archetype], 12);
        for (const group of GROUPS) expect(persona.groups[group][archetype]).toBeCloseTo(fixture.numeric.groups[group][archetype], 12);
      }
      for (const record of records) expect(scorePairing(persona, record.pairing, req.flavors, record.flavour))
        .toBeCloseTo(fixture.numeric.pairings[record.pairing], 12);
    }
    if (fixture.target !== undefined) expect(shortlist[0]).toBe(fixture.target);
    expect(boundedPick(shortlist, undefined)).toBe(shortlist[0] ?? null);
    for (const pairing of shortlist) {
      const record = records.find((candidate) => candidate.pairing === pairing);
      expect(record).toBeDefined();
      expect(record?.contains.some((veto) => req.vetoes.includes(veto))).toBe(false);
    }
  });
  for (const { score, rounded } of corpus.rounding) it(`round ${score}`, () => expect(round9(score)).toBe(rounded));
});
