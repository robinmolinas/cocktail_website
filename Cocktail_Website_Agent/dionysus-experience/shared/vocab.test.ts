import { describe, expect, it } from 'vitest';
import * as answers from './answers';
import * as vocab from './vocab';

describe('vocab', () => {
  it('is re-exported from answers unchanged, so answers.ts exports stay stable', () => {
    for (const [name, value] of Object.entries(vocab)) {
      expect(answers[name as keyof typeof answers], name).toBe(value);
    }
    expect(Object.keys(vocab).sort()).toEqual([
      'BINARIES', 'DRAWN', 'FLAVOURS', 'GRAVITIES', 'LENSES', 'MAX_WORDS', 'SEEDS', 'SOUGHT', 'VETOES',
      'canonicalWords', 'idFromLabel',
    ]);
  });
});
