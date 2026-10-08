// Dossier markdown → AuthoredPour. Pure: a string in, a record or a list of
// problems out. No I/O, no clock.
//
// Guest-facing text is copied verbatim. The only transforms are trimming
// whitespace and unwrapping the single `*…*` around the epigraph and the
// closing line. Nothing from `## Dossier` onward is read, and nothing after
// the numbered `yours` paragraphs reaches the record (it is reported).
//
// Layout (surveyed 2026-10-08, see spec-1-2): frontmatter; `## Cocktail`
// (bullets, **recipe** + optional intro + table, optional preparation blocks,
// **method**, **closingLine:**); `## Anchors` (a 4-column table);
// `## Reading` (**epigraph**, **whoYouAre**, **yours**).
//
// Imports carry `.ts` extensions so the Node import script can load them.

import { VETOES, type Veto } from '../answers.ts';
import { isPairingKey } from '../pairing.ts';
import { AuthoredPourSchema, type Anchor, type AuthoredPour, type Preparation, type RecipeLine } from '../data/schema.ts';

export type ParseResult =
  | { ok: true; pour: AuthoredPour; vetoFree: boolean | null; warnings: string[] }
  | { ok: false; errors: string[]; warnings: string[] };

const VETO_IDS: readonly string[] = VETOES.map((option) => option.id);
const BULLET_LABELS = ['name', 'tagline', 'glassware', 'contains', 'serves'] as const;
type BulletLabel = (typeof BULLET_LABELS)[number];

const BOLD_LINE = /^\*\*(.+?)\*\*\s*(.*)$/;
const NUMBERED = /^(\d+)\.\s+(.*)$/;
const TABLE_SEPARATOR = /^\|\s*:?-{3,}/;
const RULE = /^-{3,}\s*$/;
const INLINE_MARKDOWN = /\*|`|\[[^\]]*\]\(|(^|\s)_\S/;

const quote = (line: string, max = 90) => JSON.stringify(line.length > max ? `${line.slice(0, max - 3)}…` : line);

// `(dossier only)`, and its variants `(dossier only, Wren r4)` and `(dossier)`.
const DOSSIER_ONLY = /\(dossier(?:\s+only)?\b/i;
// …or said at the start of the meaning column ("Dossier only. …", "Not used
// in the reading: …"). Anchored at the start: mid-text "X: dossier only"
// refers to one detail of a usable anchor (caregiver-creator, creator-ruler,
// ruler-explorer).
const DOSSIER_ONLY_MEANING = /^(?:dossier only|not used in the reading)/i;

// `*text*` → `text`; anything else is returned trimmed, unchanged.
export function unwrapItalic(value: string): string {
  const trimmed = value.trim();
  const m = /^\*(?!\*)(.*[^*])\*$/s.exec(trimmed);
  return m ? m[1].trim() : trimmed;
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

function splitFrontmatter(markdown: string, errors: string[]): { meta: Map<string, string>; body: string } {
  const meta = new Map<string, string>();
  if (!markdown.startsWith('---\n')) {
    errors.push('missing frontmatter');
    return { meta, body: markdown };
  }
  const end = markdown.indexOf('\n---\n', 4);
  if (end < 0) {
    errors.push('unterminated frontmatter');
    return { meta, body: markdown };
  }
  for (const line of markdown.slice(4, end).split('\n')) {
    const m = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    meta.set(m[1], m[2].replace(/\s+#.*$/, '').trim());
  }
  return { meta, body: markdown.slice(end + 5) };
}

// `## Name` → its lines. Stops at `## Dossier…` (research only, never read).
function splitSections(body: string, errors: string[], warnings: string[]): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current: string[] | null = null;
  for (const line of body.split('\n')) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      if (heading[1].startsWith('Dossier')) break;
      const name = heading[1];
      if (sections.has(name)) errors.push(`duplicate section "## ${name}"`);
      current = [];
      sections.set(name, current);
      continue;
    }
    if (current) current.push(line);
    else if (line.trim() && !line.startsWith('# ')) warnings.push(`text before the first section ignored: ${quote(line)}`);
  }
  for (const name of sections.keys()) {
    if (!['Cocktail', 'Anchors', 'Reading'].includes(name)) errors.push(`unexpected section "## ${name}"`);
  }
  for (const name of ['Cocktail', 'Anchors', 'Reading']) {
    if (!sections.has(name)) errors.push(`missing section "## ${name}"`);
  }
  return sections;
}

type ParsedCocktail = {
  bullets: Partial<Record<BulletLabel, string>>;
  contains: Veto[] | undefined;
  recipeIntro: string | undefined;
  amountHeader: string | undefined;
  recipe: RecipeLine[];
  preparations: Preparation[];
  method: string[];
  closingLine: string | undefined;
};

function parseContains(raw: string, errors: string[]): Veto[] | undefined {
  const m = /^`(\[.*\])`$/.exec(raw);
  if (!m) {
    errors.push(`**contains:** must be a backticked JSON array, got ${quote(raw)}`);
    return undefined;
  }
  let list: unknown;
  try {
    list = JSON.parse(m[1]);
  } catch {
    errors.push(`**contains:** is not valid JSON: ${quote(raw)}`);
    return undefined;
  }
  if (!Array.isArray(list) || !list.every((v) => typeof v === 'string')) {
    errors.push('**contains:** must be an array of strings');
    return undefined;
  }
  const bad = list.filter((v) => !VETO_IDS.includes(v));
  if (bad.length) errors.push(`**contains:** holds non-veto value(s) ${JSON.stringify(bad)} (allowed: ${VETO_IDS.join(', ')})`);
  if (new Set(list).size !== list.length) errors.push(`**contains:** lists a veto twice: ${JSON.stringify(list)}`);
  if (bad.length) return undefined;
  // Data, not copy: canonicalised to vocabulary order.
  return VETO_IDS.filter((id) => list.includes(id)) as Veto[];
}

function parseCocktail(lines: string[], errors: string[], warnings: string[]): ParsedCocktail {
  const out: ParsedCocktail = {
    bullets: {},
    contains: undefined,
    recipeIntro: undefined,
    amountHeader: undefined,
    recipe: [],
    preparations: [],
    method: [],
    closingLine: undefined,
  };
  type Mode = 'bullets' | 'intro' | 'table' | 'afterTable' | 'method' | 'closed';
  let mode: Mode = 'bullets';
  const intro: string[][] = [];
  let tableHeader: string[] | null = null;
  let methodOpen = false; // the last method item may take continuation lines
  let prepBreak = false; // a blank line since the last preparation line
  let lastNumber = 0;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      methodOpen = false;
      prepBreak = true;
      if (mode === 'intro' && intro.length && intro[intro.length - 1].length) intro.push([]);
      continue;
    }

    const bullet = /^-\s+\*\*([^*]+?):\*\*\s*(.*)$/.exec(line);
    if (bullet) {
      const label = bullet[1];
      if (mode !== 'bullets') {
        errors.push(`bullet ${quote(line)} after **recipe**`);
        continue;
      }
      if (!(BULLET_LABELS as readonly string[]).includes(label)) {
        errors.push(`unknown cocktail bullet **${label}:**`);
        continue;
      }
      const key = label as BulletLabel;
      if (out.bullets[key] !== undefined) errors.push(`duplicate bullet **${label}:**`);
      out.bullets[key] = bullet[2].trim();
      continue;
    }

    if (line === '**recipe**') {
      if (mode !== 'bullets') errors.push('duplicate **recipe**');
      mode = 'intro';
      continue;
    }

    if (line.startsWith('|')) {
      if (mode !== 'intro' && mode !== 'table') {
        errors.push(`table row outside the recipe: ${quote(line)}`);
        continue;
      }
      mode = 'table';
      if (TABLE_SEPARATOR.test(line)) continue;
      const row = cells(line);
      if (!tableHeader) {
        tableHeader = row;
        if (row.length !== 3 || !row[0].startsWith('amount') || row[1] !== 'item' || !row[2].startsWith('note')) {
          errors.push(`recipe table header must be | amount… | item | note… |, got ${quote(line)}`);
        }
        out.amountHeader = row[0];
        continue;
      }
      if (row.length !== 3) {
        errors.push(`recipe row must have 3 cells, got ${row.length}: ${quote(line)}`);
        continue;
      }
      const [amount, item, note] = row;
      out.recipe.push(note ? { amount, item, note } : { amount, item });
      continue;
    }

    if (mode === 'table') mode = 'afterTable';

    if (line === '**method**') {
      if (mode !== 'afterTable') errors.push('**method** must follow the recipe table');
      mode = 'method';
      continue;
    }

    const closing = /^\*\*closingLine:\*\*\s*(.*)$/.exec(line);
    if (closing) {
      if (out.closingLine !== undefined) errors.push('duplicate **closingLine:**');
      if (mode !== 'method') errors.push('**closingLine:** must follow **method**');
      out.closingLine = unwrapItalic(closing[1]);
      mode = 'closed';
      continue;
    }

    if (mode === 'intro') {
      if (!intro.length) intro.push([]);
      intro[intro.length - 1].push(line);
      continue;
    }

    if (mode === 'afterTable') {
      const bold = BOLD_LINE.exec(line);
      if (bold) {
        const title = bold[1].replace(/:\s*$/, '').trim();
        if ((BULLET_LABELS as readonly string[]).includes(title.toLowerCase())) {
          warnings.push(`duplicate label **${bold[1]}** after the recipe table ignored (the lowercase bullet is used): ${quote(line)}`);
          continue;
        }
        if (!bold[2].trim()) {
          errors.push(`preparation **${bold[1]}** has no text`);
          continue;
        }
        out.preparations.push({ title, text: bold[2].trim() });
        prepBreak = false;
        continue;
      }
      const last = out.preparations[out.preparations.length - 1];
      if (last) {
        last.text = `${last.text}${prepBreak ? '\n\n' : '\n'}${line}`;
        prepBreak = false;
        continue;
      }
      errors.push(`unexpected text between the recipe table and **method**: ${quote(line)}`);
      continue;
    }

    if (mode === 'method') {
      const item = NUMBERED.exec(line);
      if (item) {
        const n = Number(item[1]);
        if (n !== lastNumber + 1) warnings.push(`method step numbered ${n} after ${lastNumber}`);
        lastNumber = n;
        out.method.push(item[2].trim());
        methodOpen = true;
        continue;
      }
      if (methodOpen && out.method.length) {
        out.method[out.method.length - 1] += `\n${line}`;
        continue;
      }
    }

    errors.push(`unexpected line in ## Cocktail: ${quote(line)}`);
  }

  const paragraphs = intro.filter((p) => p.length).map((p) => p.join('\n'));
  if (paragraphs.length) out.recipeIntro = paragraphs.join('\n\n');
  if (out.bullets.contains !== undefined) out.contains = parseContains(out.bullets.contains, errors);
  if (!tableHeader) errors.push('missing recipe table');
  if (out.closingLine === undefined) errors.push('missing **closingLine:**');
  return out;
}

function parseAnchors(lines: string[], errors: string[]): Anchor[] {
  const anchors: Anchor[] = [];
  let header: string[] | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (!line.startsWith('|')) {
      errors.push(`unexpected line in ## Anchors: ${quote(line)}`);
      continue;
    }
    if (TABLE_SEPARATOR.test(line)) continue;
    const row = cells(line);
    if (!header) {
      header = row;
      if (row.length !== 4 || row[0] !== 'kind' || !row[1].startsWith('fact') || !row[2].startsWith('meaning') || !row[3].startsWith('speaksTo')) {
        errors.push(`anchors header must be | kind | fact… | meaning… | speaksTo |, got ${quote(line)}`);
      }
      continue;
    }
    if (row.length !== 4) {
      errors.push(`anchor row must have 4 cells, got ${row.length}: ${quote(line)}`);
      continue;
    }
    const [kind, fact, meaning, speaksTo] = row;
    const anchor: Anchor = { kind, fact, meaning, dossierOnly: DOSSIER_ONLY.test(kind) || DOSSIER_ONLY_MEANING.test(meaning) };
    if (speaksTo) anchor.speaksTo = speaksTo;
    anchors.push(anchor);
  }
  if (!header) errors.push('missing anchors table');
  return anchors;
}

type ParsedReading = { epigraph: string | undefined; whoYouAre: string[]; yours: string[] };

function parseReading(lines: string[], canonicalClosing: string | undefined, errors: string[], warnings: string[]): ParsedReading {
  const out: ParsedReading = { epigraph: undefined, whoYouAre: [], yours: [] };
  type State = 'start' | 'epigraph' | 'who' | 'yoursHead' | 'yours' | 'trailing';
  let state: State = 'start';
  let seen = { epigraph: false, who: false, yours: false };
  let paragraph: string[] = [];
  let yoursOpen = false; // no blank line since the last numbered line
  let lastNumber = 0;
  const trailing: string[][] = [];
  let block: string[] = [];

  const flushWho = () => {
    if (paragraph.length) out.whoYouAre.push(paragraph.join('\n'));
    paragraph = [];
  };
  const flushBlock = () => {
    if (block.length) trailing.push(block);
    block = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (state === 'trailing') {
      if (!line || RULE.test(line)) {
        flushBlock();
        continue;
      }
      if (/^\*\*yours\*\*/.test(line)) warnings.push('duplicate **yours** heading after the yours paragraphs ignored');
      block.push(line);
      continue;
    }

    const inYours = state === 'yoursHead' || state === 'yours';

    if (line === '**epigraph**' && !inYours) {
      if (seen.epigraph) errors.push('duplicate **epigraph**');
      if (state === 'who') flushWho();
      seen = { ...seen, epigraph: true };
      state = 'epigraph';
      continue;
    }
    if (line === '**whoYouAre**' && !inYours) {
      if (seen.who) errors.push('duplicate **whoYouAre**');
      seen = { ...seen, who: true };
      state = 'who';
      continue;
    }
    if (/^\*\*yours\*\*/.test(line) && !inYours) {
      if (state === 'who') flushWho();
      seen = { ...seen, yours: true };
      state = 'yoursHead';
      continue;
    }

    if (state === 'start') {
      if (line) errors.push(`unexpected line before **epigraph**: ${quote(line)}`);
      continue;
    }
    if (state === 'epigraph') {
      if (!line) continue;
      if (out.epigraph === undefined) out.epigraph = unwrapItalic(line);
      else errors.push(`unexpected second epigraph line: ${quote(line)}`);
      continue;
    }
    if (state === 'who') {
      if (!line) flushWho();
      else if (BOLD_LINE.test(line)) errors.push(`unexpected label in **whoYouAre**: ${quote(line)}`);
      else paragraph.push(line);
      continue;
    }

    // yoursHead / yours
    const numbered = NUMBERED.exec(line);
    if (numbered) {
      const n = Number(numbered[1]);
      if (n !== lastNumber + 1) warnings.push(`yours paragraph numbered ${n} after ${lastNumber}`);
      lastNumber = n;
      out.yours.push(numbered[2].trim());
      yoursOpen = true;
      state = 'yours';
      continue;
    }
    if (!line) {
      yoursOpen = false;
      continue;
    }
    if (state === 'yoursHead') {
      if (RULE.test(line)) {
        state = 'trailing';
        continue;
      }
      warnings.push(`line between **yours** and its first paragraph skipped: ${quote(line)}`);
      continue;
    }
    if (yoursOpen && !RULE.test(line) && !BOLD_LINE.test(line)) {
      out.yours[out.yours.length - 1] += `\n${line}`;
      continue;
    }
    // Anything else ends the numbered paragraphs.
    state = 'trailing';
    if (RULE.test(line)) continue;
    if (/^\*\*yours\*\*/.test(line)) warnings.push('duplicate **yours** heading after the yours paragraphs ignored');
    block.push(line);
  }
  if (state === 'who') flushWho();
  flushBlock();

  for (const b of trailing) {
    const textBlock = b.join('\n');
    if (b.length === 1 && /^\*\*yours\*\*\s*$/.test(b[0])) continue; // already warned: empty duplicate heading
    if (!BOLD_LINE.test(b[0])) {
      // Unlabelled text after the list reads like guest copy; dropping it would truncate yours.
      errors.push(`unlabelled text after the numbered yours paragraphs (would be dropped): ${quote(b[0])}`);
      continue;
    }
    warnings.push(`excluded trailing reading block: ${textBlock.replace(/\n/g, ' ⏎ ')}`);
    if (/^\*\*closing ?line/i.test(b[0])) {
      const afterLabel = textBlock.replace(/^\*\*[^*]*\*\*/, '');
      const italic = /(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/.exec(afterLabel);
      const draft = italic?.[1].trim();
      if (draft && canonicalClosing !== undefined && draft !== canonicalClosing) {
        warnings.push(`trailing closing line differs from the canonical one: draft ${quote(draft, Infinity)} vs canonical ${quote(canonicalClosing, Infinity)}`);
      }
    }
  }
  if (!seen.epigraph) errors.push('missing **epigraph**');
  if (!seen.who) errors.push('missing **whoYouAre**');
  if (!seen.yours) errors.push('missing **yours**');
  if (out.yours.length && (out.yours.length < 4 || out.yours.length > 6)) {
    warnings.push(`yours has ${out.yours.length} paragraphs (expected 4–6)`);
  }
  return out;
}

// Guest-facing strings that still carry markdown (kept verbatim; reported).
function inlineMarkdownWarnings(pour: AuthoredPour): string[] {
  const fields: [string, string | undefined][] = [
    ['cocktail.name', pour.cocktail.name],
    ['cocktail.tagline', pour.cocktail.tagline],
    ['cocktail.glassware', pour.cocktail.glassware],
    ['cocktail.serves', pour.cocktail.serves],
    ['cocktail.recipeIntro', pour.cocktail.recipeIntro],
    ...pour.cocktail.recipe.flatMap((line, i): [string, string | undefined][] => [
      [`cocktail.recipe[${i}].amount`, line.amount],
      [`cocktail.recipe[${i}].item`, line.item],
      [`cocktail.recipe[${i}].note`, line.note],
    ]),
    ...pour.cocktail.preparations.map((p, i): [string, string] => [`cocktail.preparations[${i}]`, `${p.title} ${p.text}`]),
    ...pour.cocktail.method.map((m, i): [string, string] => [`cocktail.method[${i}]`, m]),
    ['cocktail.closingLine', pour.cocktail.closingLine],
    ['reading.epigraph', pour.reading.epigraph],
    ...pour.reading.whoYouAre.map((p, i): [string, string] => [`reading.whoYouAre[${i}]`, p]),
    ...pour.reading.yours.map((p, i): [string, string] => [`reading.yours[${i}]`, p]),
  ];
  return fields
    .filter(([, value]) => value !== undefined && INLINE_MARKDOWN.test(value))
    .map(([path]) => `inline markdown kept verbatim in ${path}`);
}

export function parseDossier(markdown: string, expectedPairing?: string): ParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { meta, body } = splitFrontmatter(markdown.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n'), errors);

  const pairing = meta.get('pairing');
  if (!pairing) errors.push('frontmatter: missing pairing');
  else if (!isPairingKey(pairing)) errors.push(`frontmatter: unknown pairing "${pairing}"`);
  if (expectedPairing !== undefined && pairing !== expectedPairing) {
    errors.push(`frontmatter pairing "${pairing ?? ''}" does not match the file name "${expectedPairing}"`);
  }
  const vetoFreeRaw = meta.get('veto_free');
  let vetoFree: boolean | null = null;
  if (vetoFreeRaw !== undefined) {
    if (vetoFreeRaw === 'true' || vetoFreeRaw === 'false') vetoFree = vetoFreeRaw === 'true';
    else errors.push(`frontmatter: veto_free must be true or false, got "${vetoFreeRaw}"`);
  }

  const sections = splitSections(body, errors, warnings);
  const cocktail = parseCocktail(sections.get('Cocktail') ?? [], errors, warnings);
  const anchors = parseAnchors(sections.get('Anchors') ?? [], errors);
  const reading = parseReading(sections.get('Reading') ?? [], cocktail.closingLine, errors, warnings);

  if (vetoFree !== null && cocktail.contains !== undefined && vetoFree !== (cocktail.contains.length === 0)) {
    errors.push(`frontmatter veto_free: ${vetoFree} disagrees with contains ${JSON.stringify(cocktail.contains)}`);
  }

  const candidate = {
    pairing,
    status: meta.get('status'),
    personality: meta.get('personality'),
    cocktail: {
      name: cocktail.bullets.name,
      tagline: cocktail.bullets.tagline,
      glassware: cocktail.bullets.glassware,
      ...(cocktail.bullets.serves !== undefined ? { serves: cocktail.bullets.serves } : {}),
      ...(cocktail.recipeIntro !== undefined ? { recipeIntro: cocktail.recipeIntro } : {}),
      amountHeader: cocktail.amountHeader,
      recipe: cocktail.recipe,
      preparations: cocktail.preparations,
      method: cocktail.method,
      closingLine: cocktail.closingLine,
      contains: cocktail.contains,
    },
    anchors,
    reading,
  };
  const parsed = AuthoredPourSchema.safeParse(candidate);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.map(String).join('.') || '(root)';
      errors.push(`${path}: ${issue.message}`);
    }
  }
  if (errors.length || !parsed.success) return { ok: false, errors, warnings };
  return { ok: true, pour: parsed.data, vetoFree, warnings: [...warnings, ...inlineMarkdownWarnings(parsed.data)] };
}
