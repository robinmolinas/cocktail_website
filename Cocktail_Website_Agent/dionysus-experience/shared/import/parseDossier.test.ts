import { describe, expect, it } from 'vitest';
import { AuthoredPourSchema, type AuthoredPour } from '../data/schema';
import creatorHero from '../data/pours/creator-hero.json';
import creatorMagician from '../data/pours/creator-magician.json';
import heroJester from '../data/pours/hero-jester.json';
import explorerCaregiver from '../data/pours/explorer-caregiver.json';
import { fixtureDossier } from './fixtures';
import { parseDossier, unwrapItalic } from './parseDossier';

function parsed(markdown: string, pairing = 'creator-hero') {
  const result = parseDossier(markdown, pairing);
  if (!result.ok) throw new Error(`expected ok, got:\n${result.errors.join('\n')}`);
  return result;
}

function failed(markdown: string, pairing = 'creator-hero') {
  const result = parseDossier(markdown, pairing);
  if (result.ok) throw new Error('expected the parse to fail');
  return result.errors;
}

describe('parseDossier: standard pour', () => {
  const { pour, warnings, vetoFree } = parsed(fixtureDossier());

  it('builds a full record in the schema', () => {
    expect(AuthoredPourSchema.safeParse(pour).success).toBe(true);
    expect(pour.pairing).toBe('creator-hero');
    expect(pour.status).toBe('approved');
    expect(pour.personality).toBe('The Visionary');
    expect(vetoFree).toBe(false);
  });

  it('copies guest text verbatim, unwrapping only the epigraph and closing line', () => {
    expect(pour.cocktail.name).toBe('Down the Line');
    expect(pour.cocktail.closingLine).toBe("Pass the shaker. Just don't let it stop.");
    expect(pour.reading.epigraph).toBe('Anyone can have the recipe.');
    expect(pour.reading.whoYouAre).toEqual(['You see the finished thing first.', 'What they don’t see is the arithmetic.']);
    expect(pour.reading.yours[1]).toBe('Second paragraph, with *emphasis* kept verbatim.');
    expect(warnings).toContain('inline markdown kept verbatim in reading.yours[1]');
  });

  it('reads the recipe table, omitting empty notes', () => {
    expect(pour.cocktail.amountHeader).toBe('amount');
    expect(pour.cocktail.recipe[0]).toEqual({ amount: '60 ml', item: 'London dry gin' });
    expect(pour.cocktail.recipe[3]).toEqual({ amount: '3 drops', item: 'orange flower water', note: 'as written in the recipe he gave away' });
    expect(pour.cocktail.method).toEqual(['Shake it dry.', 'Shake it with ice.']);
    expect(pour.cocktail.preparations).toEqual([]);
    expect(pour.cocktail.recipeIntro).toBeUndefined();
  });

  it('declares contains in vocabulary order', () => {
    expect(pour.cocktail.contains).toEqual(['egg-white', 'dairy']);
  });

  it('keeps dossier-only anchors, flagged', () => {
    expect(pour.anchors).toHaveLength(4);
    expect(pour.anchors.filter((a) => a.dossierOnly).map((a) => a.kind)).toEqual(['name (dossier only)']);
    expect(pour.anchors[1].speaksTo).toBeUndefined();
  });

  it('imports nothing from ## Dossier', () => {
    expect(JSON.stringify(pour)).not.toMatch(/Must never ship|draft v3/);
  });

  it('has 4 yours paragraphs', () => {
    expect(pour.reading.yours).toHaveLength(4);
  });
});

describe('parseDossier: batch and preparation', () => {
  const recipe = `Makes about eight drinks of 125 ml.

| amount (batch) | item | note (shown) |
| --- | --- | --- |
| 480 ml | aged rum | |
| 360 ml | tamarind water (below) | the star |
| *for the ice* | | |`;
  const afterTable = `**Tamarind water:** 150 g tamarind pulp. Keep 360 ml.

**Cherry syrup** (a day ahead): blend and sieve.`;
  const { pour } = parsed(fixtureDossier({ recipe, afterTable, serves: '14 (small cups, ladled)' }));

  it('keeps the intro line, the amount header and every preparation block', () => {
    expect(pour.cocktail.recipeIntro).toBe('Makes about eight drinks of 125 ml.');
    expect(pour.cocktail.amountHeader).toBe('amount (batch)');
    expect(pour.cocktail.preparations).toEqual([
      { title: 'Tamarind water', text: '150 g tamarind pulp. Keep 360 ml.' },
      { title: 'Cherry syrup', text: '(a day ahead): blend and sieve.' },
    ]);
  });

  it('keeps the serves bullet and sub-heading rows', () => {
    expect(pour.cocktail.serves).toBe('14 (small cups, ladled)');
    expect(pour.cocktail.recipe[2]).toEqual({ amount: '*for the ice*', item: '' });
  });
});

describe('parseDossier: material after yours', () => {
  it('excludes a trailing closing-line note and reports it', () => {
    const { pour, warnings } = parsed(
      fixtureDossier({ afterYours: "**closing line:** Tomás's (final: *Pass the shaker. Never stop.*). y5 avoids it." }),
    );
    expect(pour.reading.yours).toHaveLength(4);
    expect(JSON.stringify(pour)).not.toMatch(/closing line:|y5|Never stop/);
    expect(warnings.some((w) => w.startsWith('excluded trailing reading block: **closing line:**'))).toBe(true);
    expect(warnings.some((w) => w.startsWith('trailing closing line differs'))).toBe(true);
  });

  it('ignores an empty duplicate **yours** heading', () => {
    const { pour, warnings } = parsed(fixtureDossier({ afterYours: '**yours**' }));
    expect(pour.reading.yours).toHaveLength(4);
    expect(pour.reading.yours[3]).toBe('Fourth paragraph, the proposal.');
    expect(warnings).toContain('duplicate **yours** heading after the yours paragraphs ignored');
  });

  it('keeps continuation lines (a quoted verse) inside their paragraph', () => {
    const yours = `1. One.

2. He wrote four lines:
*If, as they say,*
*God spanked the town*
I love that it never argues.

3. Three.

4. Four.`;
    const { pour } = parsed(fixtureDossier({ yours }));
    expect(pour.reading.yours[1]).toBe('He wrote four lines:\n*If, as they say,*\n*God spanked the town*\nI love that it never argues.');
  });

  it('reports a duplicate capitalised label after the table and uses the bullet', () => {
    const { pour, warnings } = parsed(fixtureDossier({ afterTable: '**Glassware:** coupe.\n**Contains:** egg-white.' }));
    expect(pour.cocktail.glassware).toBe('tall glass, no ice');
    expect(pour.cocktail.preparations).toEqual([]);
    expect(warnings.filter((w) => w.startsWith('duplicate label'))).toHaveLength(2);
  });
});

describe('parseDossier: broken dossiers fail with every problem listed', () => {
  it('missing fields, too few anchors and an unknown status', () => {
    const anchors = `| kind | fact | meaning | speaksTo |
| --- | --- | --- | --- |
| lineage | A fact. | A meaning. | |`;
    const errors = failed(
      fixtureDossier({
        frontmatter: 'pairing: creator-hero\npersonality: The Visionary\nstatus: done',
        anchors,
        omit: ['name', 'closingLine', 'epigraph'],
      }),
    );
    const all = errors.join('\n');
    expect(all).toMatch(/^status:/m);
    expect(all).toMatch(/^cocktail\.name:/m);
    expect(all).toMatch(/missing \*\*closingLine:\*\*/);
    expect(all).toMatch(/missing \*\*epigraph\*\*/);
    expect(all).toMatch(/^anchors:.*at least 3 anchors that are not dossier-only/m);
  });

  it('a non-veto value in contains', () => {
    expect(failed(fixtureDossier({ contains: '`["egg-white", "alcohol"]`' })).join('\n')).toMatch(/non-veto value.*alcohol/);
  });

  it('veto_free disagreeing with contains', () => {
    const errors = failed(fixtureDossier({ frontmatter: 'pairing: creator-hero\npersonality: The Visionary\nstatus: draft\nveto_free: true' }));
    expect(errors.join('\n')).toMatch(/veto_free: true disagrees/);
  });

  it('a pairing that does not match the file name', () => {
    expect(failed(fixtureDossier(), 'hero-creator').join('\n')).toMatch(/does not match the file name/);
  });
});

describe('parseDossier: review fixes', () => {
  it('fails on unlabelled text after the numbered yours paragraphs', () => {
    expect(failed(fixtureDossier({ afterYours: 'A fifth paragraph someone forgot to number.' })).join('\n')).toMatch(
      /unlabelled text after the numbered yours paragraphs.*A fifth paragraph/,
    );
  });

  it('strips a leading byte-order mark', () => {
    expect(parsed(`\uFEFF${fixtureDossier()}`).pour.pairing).toBe('creator-hero');
  });

  it('keeps single newlines inside a preparation and blank lines between its paragraphs', () => {
    const { pour } = parsed(fixtureDossier({ afterTable: '**Syrup:** line one\nline two\n\nsecond paragraph' }));
    expect(pour.cocktail.preparations).toEqual([{ title: 'Syrup', text: 'line one\nline two\n\nsecond paragraph' }]);
  });

  it('flags an anchor dossier-only from its meaning, and counts only usable anchors', () => {
    const anchors = `| kind | fact | meaning | speaksTo |
| --- | --- | --- | --- |
| lineage | A fact. | A meaning. | |
| gesture | A fact. | A meaning; a detail: dossier only. | |
| story | A fact. | Dossier only. Risky. | |
| after (optional) | A fact. | Not used in the reading. | |`;
    const errors = failed(fixtureDossier({ anchors }));
    expect(errors.join('\n')).toMatch(/^anchors:.*at least 3 anchors that are not dossier-only/m);
    const ok = parsed(fixtureDossier({ anchors: `${anchors}\n| glass | A fact. | A meaning. | |` }));
    expect(ok.pour.anchors.map((a) => a.dossierOnly)).toEqual([false, false, true, true, false]);
  });
});

describe('unwrapItalic', () => {
  it('removes exactly one wrapping pair', () => {
    expect(unwrapItalic(' *Sip it slowly.* ')).toBe('Sip it slowly.');
    expect(unwrapItalic('**bold**')).toBe('**bold**');
    expect(unwrapItalic('plain')).toBe('plain');
  });
});

// Snapshot-free checks on real imported records (shared/data/pours).
describe('real records', () => {
  const real = (json: unknown) => AuthoredPourSchema.parse(json) as AuthoredPour;

  it('creator-hero: standard pour, 5 yours paragraphs, contains egg-white and dairy', () => {
    const pour = real(creatorHero);
    expect(pour.reading.yours).toHaveLength(5);
    expect(pour.cocktail.contains).toEqual(['egg-white', 'dairy']);
    expect(pour.cocktail.closingLine).toBe("Pass the shaker when your arms give out. Just don't let it stop.");
    expect(pour.anchors.find((a) => a.kind === 'name (dossier only)')?.dossierOnly).toBe(true);
  });

  it('creator-magician: batch intro, amount header and the tamarind water preparation', () => {
    const pour = real(creatorMagician);
    expect(pour.cocktail.recipeIntro).toBe('Makes about eight drinks of 125 ml.');
    expect(pour.cocktail.amountHeader).toBe('amount (batch)');
    expect(pour.cocktail.preparations).toHaveLength(1);
    expect(pour.cocktail.preparations[0].title).toBe('Tamarind water');
    expect(pour.cocktail.preparations[0].text).toMatch(/^150 g block of sour, seedless tamarind pulp/);
    expect(pour.cocktail.preparations[0].text).toMatch(/Keep 360 ml\.$/);
  });

  it('hero-jester: yours is the numbered paragraphs only, without the trailing closing-line note', () => {
    const pour = real(heroJester);
    expect(pour.reading.yours).toHaveLength(5);
    expect(pour.reading.yours[4]).toMatch(/It'll be you\.$/);
    expect(JSON.stringify(pour.reading)).not.toMatch(/closing line|Tomás|y5/);
  });

  it('explorer-caregiver: the duplicate empty yours heading leaves yours intact', () => {
    const pour = real(explorerCaregiver);
    expect(pour.reading.yours).toHaveLength(5);
    expect(pour.reading.yours.some((p) => p.includes('**yours**'))).toBe(false);
  });
});
