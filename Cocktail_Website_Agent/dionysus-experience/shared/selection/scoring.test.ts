import { describe, expect, it } from 'vitest';
import { BINARIES, DRAWN, FLAVOURS, GRAVITIES, SOUGHT, type FlavourId, type RevealRequest } from '../answers';
import { ARCHETYPES } from '../pairing';
import model from './model-v1.json';
import { GROUPS, round9, scorePairing, scorePersona, type FlavourStrengths } from './scoring';

const request = (overrides: Partial<RevealRequest> = {}): RevealRequest => ({
  v: 3, name: 'Robin', lens: null, seed: null, gravity: {}, texture: {},
  drawnToward: [], soughtFor: [], flavors: [], vetoes: [], ...overrides,
});
const strengths = (overrides: Partial<Record<FlavourId, number>> = {}): FlavourStrengths =>
  Object.fromEntries(FLAVOURS.map(({ id }) => [id, overrides[id] ?? 0])) as FlavourStrengths;

describe('matching v1', () => {
  it('agrees with the intake and identity vocabularies', () => {
    expect(model.questionnaireVersion).toBe(3);
    expect(model.archetypes).toEqual(ARCHETYPES);
    expect(Object.keys(model.drawnToward)).toEqual(DRAWN.map(({ id }) => id));
    expect(Object.keys(model.soughtFor)).toEqual(SOUGHT.map(({ id }) => id));
    expect(Object.keys(model.gravity).filter((key) => !key.startsWith('_'))).toEqual(GRAVITIES.map(({ id }) => id));
    expect(Object.keys(model.texture).filter((key) => !key.startsWith('_'))).toEqual(BINARIES.map(({ id }) => id));
    expect(model.flavours).toEqual(FLAVOURS.map(({ id }) => id));
    expect(DRAWN).toHaveLength(9);
  });
  it('gives empty answers and midpoint gravity exactly zero signal', () => {
    const empty = scorePersona(request());
    expect(scorePersona(request({ gravity: Object.fromEntries(GRAVITIES.map(({ id }) => [id, 50])) }))).toEqual(empty);
    for (const a of ARCHETYPES) {
      expect(empty.motive[a]).toBe(0);
      expect(empty.expression[a]).toBe(0);
      for (const group of GROUPS) expect(empty.groups[group][a]).toBe(0);
    }
  });
  it('centres words over all options in their own round', () => {
    const drawn = scorePersona(request({ drawnToward: ['freedom'] })).groups.drawnToward;
    expect(drawn.Explorer).toBeCloseTo(1 - 1.3 / 9, 14);
    expect(drawn.Sage).toBeCloseTo(-0.8 / 9, 14);
    expect(drawn['Regular Guy']).toBeCloseTo(-1 / 9, 14);
    expect(scorePersona(request({ drawnToward: ['freedom', 'beauty'] })).groups.drawnToward.Explorer)
      .toBeCloseTo(1 - 2 * 1.3 / 9, 14);
    expect(scorePersona(request({ soughtFor: ['comfort'] })).groups.soughtFor.Caregiver).toBeCloseTo(1 - 1.9 / 9, 14);
  });
  it('uses a linear gravity lean with no dead band', () => {
    const left = scorePersona(request({ gravity: { 'solitary-social': 0 } })).groups.gravity;
    const right = scorePersona(request({ gravity: { 'solitary-social': 100 } })).groups.gravity;
    expect(left.Sage).toBe(0.4);
    expect(right.Sage).toBe(-0.4);
    expect(left['Regular Guy']).toBe(-0.4);
    expect(scorePersona(request({ gravity: { 'solitary-social': 51 } })).groups.gravity.Sage).toBeCloseTo(-0.008, 15);
    for (const a of ARCHETYPES) expect(left[a] + right[a]).toBe(0);
  });
  it('gives opposite texture poles opposite half-difference signals', () => {
    const a = scorePersona(request({ texture: { 'sharp-smooth': 'a' } })).groups.texture;
    const b = scorePersona(request({ texture: { 'sharp-smooth': 'b' } })).groups.texture;
    expect(a.Sage).toBe(0.25);
    expect(a.Lover).toBe(-0.3);
    for (const archetype of ARCHETYPES) expect(a[archetype] + b[archetype]).toBe(0);
  });
  it('adds groups without rescaling the remaining evidence', () => {
    const drawn = scorePersona(request({ drawnToward: ['freedom'] }));
    const sought = scorePersona(request({ soughtFor: ['comfort'] }));
    const both = scorePersona(request({ drawnToward: ['freedom'], soughtFor: ['comfort'] }));
    for (const a of ARCHETYPES) {
      expect(both.motive[a]).toBeCloseTo(drawn.motive[a] + sought.motive[a], 14);
      expect(both.expression[a]).toBeCloseTo(drawn.expression[a] + sought.expression[a], 14);
    }
  });
  it('ignores word and answer-object insertion order', () => {
    const req = request({ drawnToward: ['freedom', 'beauty', 'mastery'], soughtFor: ['advice', 'comfort', 'ideas'],
      gravity: { 'solitary-social': 13, 'controlled-wild': 88 }, texture: { 'sharp-smooth': 'a', control: 'b' } });
    expect(scorePersona({ ...req, drawnToward: [...req.drawnToward].reverse(), soughtFor: [...req.soughtFor].reverse(),
      gravity: Object.fromEntries(Object.entries(req.gravity).reverse()), texture: Object.fromEntries(Object.entries(req.texture).reverse()) }))
      .toEqual(scorePersona(req));
  });
  it('uses primary motive and secondary expression with multiword identities', () => {
    const persona = scorePersona(request({ drawnToward: ['belonging'], soughtFor: ['advice'] }));
    expect(scorePairing(persona, 'regular-guy-sage', [])).toBe(persona.motive['Regular Guy'] + persona.expression.Sage);
    expect(scorePairing(persona, 'sage-regular-guy', [])).toBe(persona.motive.Sage + persona.expression['Regular Guy']);
  });
  it('adds only chosen supplied flavour strengths without changing the persona', () => {
    const req = request({ drawnToward: ['wonder'], flavors: ['sweet', 'smoky'] });
    const persona = scorePersona(req);
    const base = scorePairing(persona, 'magician-explorer', []);
    expect(scorePersona({ ...req, flavors: [] })).toEqual(persona);
    expect(scorePairing(persona, 'magician-explorer', req.flavors, strengths({ sweet: 0.5, bitter: 1, smoky: 0.8 })))
      .toBeCloseTo(base + 0.15 * 1.3, 14);
    expect(scorePairing(persona, 'magician-explorer', req.flavors)).toBe(base);
  });
});

describe('Python-compatible rounding', () => {
  it.each([[5e-10, 1e-9], [-5e-10, -1e-9], [0.0009765625, 0.000976562],
    [-0.0009765625, -0.000976562], [0.0029296875, 0.002929688], [-0.0029296875, -0.002929688],
    [0.1 + 0.2, 0.3], [-0.1 - 0.2, -0.3]])('rounds %s to %s', (score, rounded) => {
    expect(round9(score)).toBe(rounded);
  });
  it('preserves negative zero', () => expect(Object.is(round9(-1e-12), -0)).toBe(true));
});
