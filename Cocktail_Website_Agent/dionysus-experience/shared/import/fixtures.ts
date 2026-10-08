// Small inline dossiers for the import tests. Each mirrors a layout seen in
// the real 132 (surveyed 2026-10-08), cut down to the parts that matter.

export type FixtureOptions = {
  frontmatter?: string;
  contains?: string;
  serves?: string;
  recipe?: string;
  afterTable?: string;
  anchors?: string;
  yours?: string;
  afterYours?: string;
  omit?: ('name' | 'tagline' | 'closingLine' | 'epigraph')[];
};

const ANCHORS = `| kind | fact | meaning | speaksTo |
| --- | --- | --- | --- |
| lineage | A fact about the drink's ancestor. | What it says about you. | drawnToward: Mastery |
| gesture | A fact about the shake. | Why the shake is yours. | |
| name (dossier only) | Research-only fact. | Not used in the reading. | n/a |
| ingredient | A fact about the garnish. | Small and kept. | flavours: Fresh |`;

const YOURS = `1. First paragraph of the passage.

2. Second paragraph, with *emphasis* kept verbatim.

3. Third paragraph.

4. Fourth paragraph, the proposal.`;

export function fixtureDossier(o: FixtureOptions = {}): string {
  const omit = new Set(o.omit ?? []);
  const lines = [
    '---',
    o.frontmatter ?? 'pairing: creator-hero\npersonality: The Visionary\nstatus: approved            # Robin, 2026-09-25\nveto_free: false',
    '---',
    '',
    '# Pour — Test · The Visionary (creator-hero)',
    '',
    '## Cocktail',
    '',
    omit.has('name') ? '' : '- **name:** Down the Line',
    omit.has('tagline') ? '' : '- **tagline:** The dream is yours.',
    '- **glassware:** tall glass, no ice',
    `- **contains:** ${o.contains ?? '`["egg-white", "dairy"]`'}`,
    o.serves ? `- **serves:** ${o.serves}` : '',
    '',
    '**recipe**',
    '',
    o.recipe ??
      `| amount | item | note (shown) |
| --- | --- | --- |
| 60 ml | London dry gin | |
| 30 ml | heavy cream | |
| 1 | egg white (about 30 ml) | |
| 3 drops | orange flower water | as written in the recipe he gave away |`,
    '',
    o.afterTable ?? '',
    '',
    '**method**',
    '1. Shake it dry.',
    '2. Shake it with ice.',
    '',
    omit.has('closingLine') ? '' : "**closingLine:** *Pass the shaker. Just don't let it stop.*",
    '',
    '## Anchors',
    '',
    o.anchors ?? ANCHORS,
    '',
    '## Reading',
    '',
    ...(omit.has('epigraph') ? [] : ['**epigraph**', '*Anyone can have the recipe.*', '']),
    '**whoYouAre**',
    'You see the finished thing first.',
    '',
    'What they don’t see is the arithmetic.',
    '',
    '**yours** (authored base; the live tailoring keeps these paragraphs, anchors and order)',
    '',
    o.yours ?? YOURS,
    '',
    o.afterYours ?? '',
    '',
    '---',
    '',
    '## Dossier (research only — never shipped)',
    '',
    'Tomás draft v3 notes. y5 is weak. (dossier) Must never ship.',
    '',
  ];
  return lines.join('\n');
}

export const FIXTURE_SPEC = {
  pairing: 'creator-hero',
  ingredients: [
    { key: 'gin_london_dry', ml: 60 },
    { key: 'cream', ml: 30 },
    { key: 'egg_white', ml: 30 },
    { key: 'orange_flower_water', drops: 3 },
  ],
  garnish: [],
};

export const FIXTURE_TABLE = {
  ingredients: {
    gin_london_dry: { sugar: 0, contains: [] },
    cream: { sugar: 3, contains: ['dairy'] },
    egg_white: { sugar: 0, contains: ['egg-white'] },
    orange_flower_water: { sugar: 0, contains: [] },
    simple_syrup: { sugar: 61.5, contains: [] },
    lemon_peel: { sugar: 0, contains: [] },
  },
};

export const FIXTURE_RULES = {
  rules: {
    herbal: [['gin|genever', 0.5]],
    floral: [['orange_flower', 1.0]],
    citrusy: [['lemon', 1.0]],
  },
};
