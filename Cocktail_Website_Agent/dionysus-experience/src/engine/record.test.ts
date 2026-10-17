import { describe, expect, it } from 'vitest';
import { DRAWN, MAX_WORDS, SOUGHT } from '../../shared/vocab';
import { toRevealRequest } from './intake';
import { emptyRecord, flavoursInOrder, labelsToIds, vetoesInOrder, type JourneyAnswers } from './record';

// Every helper's output must also survive the strict wire parse.
const parses = (patch: Partial<JourneyAnswers>) => {
  const base = emptyRecord();
  return toRevealRequest({ ...base, answers: { ...base.answers, ...patch } });
};

describe('labelsToIds (H5 seals)', () => {
  it('turns tap-order soughtFor labels into ids in vocabulary order', () => {
    const ids = labelsToIds(SOUGHT, ['Mischief', 'Calm', 'Advice']);
    expect(ids).toEqual(['advice', 'calm', 'little-chaos']);
    expect(parses({ soughtFor: ids }).soughtFor).toEqual(ids);
  });

  it('turns tap-order drawnToward labels into ids in vocabulary order', () => {
    const ids = labelsToIds(DRAWN, ['Caring', 'Peace', 'Belonging']);
    expect(ids).toEqual(['peace', 'belonging', 'caring']);
    expect(parses({ drawnToward: ids }).drawnToward).toEqual(ids);
  });

  it('drops unknown labels and duplicates', () => {
    const ids = labelsToIds(DRAWN, ['Mischief', 'Freedom', 'Freedom', 'freedom']);
    expect(ids).toEqual(['freedom']);
    expect(parses({ drawnToward: ids }).drawnToward).toEqual(ids);
  });
});

describe('flavoursInOrder (H6 beat 1)', () => {
  it('stores tap-order flavours in vocabulary order', () => {
    const ids = flavoursInOrder(['smoky', 'sweet', 'fruity']);
    expect(ids).toEqual(['sweet', 'fruity', 'smoky']);
    expect(parses({ flavors: ids }).flavors).toEqual(ids);
  });

  it('caps at MAX_WORDS', () => {
    const ids = flavoursInOrder(['smoky', 'floral', 'fresh', 'bitter', 'sweet']);
    expect(ids).toHaveLength(MAX_WORDS);
    expect(ids).toEqual(['sweet', 'bitter', 'fresh']);
    expect(parses({ flavors: ids }).flavors).toEqual(ids);
  });
});

describe('vetoesInOrder (H6 beat 2)', () => {
  it('stores pop-order vetoes in vocabulary order, all five allowed', () => {
    expect(vetoesInOrder(['nuts', 'dairy'])).toEqual(['dairy', 'nuts']);
    const all = vetoesInOrder(['spice', 'nuts', 'gluten', 'dairy', 'egg-white']);
    expect(all).toEqual(['egg-white', 'dairy', 'gluten', 'nuts', 'spice']);
    expect(parses({ vetoes: all }).vetoes).toEqual(all);
  });

  it('drops repeats', () => {
    expect(vetoesInOrder(['dairy', 'dairy'])).toEqual(['dairy']);
  });
});
