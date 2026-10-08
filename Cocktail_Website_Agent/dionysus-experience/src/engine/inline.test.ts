import { describe, expect, it } from 'vitest';
import { AUTHORED_POURS } from '../../shared/data/pours/static';
import { inlineTokens } from './inline';

describe('inlineTokens', () => {
  it('reads **strong**, *em* and line breaks', () => {
    expect(inlineTokens('**The syrup.** Toast *gently*\nthen stop')).toEqual([
      { kind: 'strong', text: 'The syrup.' },
      { kind: 'text', text: ' Toast ' },
      { kind: 'em', text: 'gently' },
      { kind: 'break' },
      { kind: 'text', text: 'then stop' },
    ]);
    expect(inlineTokens('*for the ice*')).toEqual([{ kind: 'em', text: 'for the ice' }]);
    expect(inlineTokens('')).toEqual([]);
  });

  it('leaves no * in any rendered field of any authored pour', () => {
    for (const pour of Object.values(AUTHORED_POURS)) {
      const { cocktail: c, reading: r } = pour!;
      const fields = [
        ...c.recipe.flatMap((line) => [line.amount, line.item, line.note ?? '']),
        c.glassware, c.serves ?? '', c.recipeIntro ?? '',
        ...c.preparations.flatMap((prep) => [prep.title, prep.text]),
        ...c.method, c.closingLine, r.epigraph, ...r.whoYouAre, ...r.yours,
      ];
      for (const field of fields) {
        for (const token of inlineTokens(field)) {
          if (token.kind !== 'break') expect(token.text, `${pour!.pairing}: ${field}`).not.toContain('*');
        }
      }
    }
  });
});
