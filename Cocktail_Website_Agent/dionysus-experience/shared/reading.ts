// One synchronous, pure payload for browser and API surfaces. Every authored
// word stays verbatim: `whoYouAre`, `yours`, the epigraph and the cocktail are
// always the authored pour. The live Bartender may add at most one short
// passage after "This is you" (`who`) and one after "Before you go"
// (`proposal`); they travel only in `copy`, guarded by `acceptAddition`
// (E2-R4/E2-R5). Any rejected addition is silently dropped to null.

import type { SeedKey } from './answers';
import { ARCHETYPE_PAIRINGS, type ArchetypePairing } from './data/archetypes';
import { personaImageFor, type PersonaImageMeta } from './data/personas';
import { AUTHORED_POURS } from './data/pours/static';
import type { AuthoredPour, Cocktail } from './data/schema';
import { parsePairingKey, type PairingKey } from './pairing';
import { COMMON_WORDS } from './common-words';
import { BLOCKLIST, cleanTrace, findTerm, foldForMatch, HARD_INSULTS, hasInstructionPhrasing, ROLE_PATTERNS, SELF_HARM } from './trace';

export type LiveCopy = { who: string | null; proposal: string | null };
export type AdditionKind = 'who' | 'proposal';

export type Reading = {
  pairing: PairingKey;
  archetype: ArchetypePairing;
  cocktail: Cocktail;
  epigraph: string;
  whoYouAre: string[];
  yours: string[];
  persona: PersonaImageMeta;
  name: string;
  seed: SeedKey | null;
  copy: LiveCopy | null;
};

// --- the addition guard ----------------------------------------------------------

export type AdditionLimits = {
  who: { min: number; max: number };
  proposal: { min: number; max: number };
  /** An addition repeating this many consecutive trace words verbatim is rejected. */
  quoteRun: number;
};

/** Code-point bounds, counted with the `{name}` slot unfilled. The 2.2 spike retunes them. */
export const ADDITION_LIMITS: AdditionLimits = Object.freeze({
  who: Object.freeze({ min: 40, max: 280 }),
  proposal: Object.freeze({ min: 20, max: 200 }),
  quoteRun: 6,
});

/** What an addition is judged against: the pour's known words and, server-side, the trace. */
export type AdditionContext = { known: ReadonlySet<string>; trace: string | null };

export type AdditionProblem =
  | 'type' | 'braces' | 'digit' | 'url' | 'markup' | 'charset' | 'length'
  | 'blocklist' | 'instruction' | 'proper-noun' | 'trace-quote';

const NAME_SLOT = '{name}';
const WORD = /\p{L}+(?:['\u2019]\p{L}+)*/gu;
const SENTENCE_END = new Set(['.', '!', '?', '\u2026']);
const OPENERS = new Set([' ', '"', "'", '\u201C', '\u2018', '\u00AB', '(']);

/** A word as compared: lowercase, accents stripped, curly apostrophe straightened, possessive dropped. */
function foldWord(word: string): string {
  return word
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\u2019/g, "'")
    .replace(/'s?$/, '');
}

function wordsOf(text: string): string[] {
  return (text.match(WORD) ?? []).map(foldWord);
}

function contextFor(pour: AuthoredPour, trace: unknown): AdditionContext {
  const sources = [
    ...pour.reading.whoYouAre,
    ...pour.reading.yours,
    pour.reading.epigraph,
    ...pour.anchors.filter((anchor) => !anchor.dossierOnly).flatMap((anchor) => [anchor.kind, anchor.fact, anchor.meaning, anchor.speaksTo ?? '']),
    pour.cocktail.name,
    pour.cocktail.tagline,
    ...pour.cocktail.words,
    pour.cocktail.glassware,
    pour.cocktail.recipeIntro ?? '',
    ...pour.cocktail.recipe.flatMap((line) => [line.item, line.note ?? '']),
    ...pour.cocktail.preparations.flatMap((preparation) => Object.values(preparation).filter((value): value is string => typeof value === 'string')),
    ...pour.cocktail.method,
    pour.cocktail.closingLine,
    pour.personality,
  ];
  const known = new Set<string>();
  for (const source of sources) for (const word of wordsOf(source)) known.add(word);
  return { known, trace: cleanTrace(trace) };
}

function authoredPour(pairing: string): { key: PairingKey; pour: AuthoredPour; archetype: ArchetypePairing; identity: NonNullable<ReturnType<typeof parsePairingKey>> } {
  const identity = typeof pairing === 'string' ? parsePairingKey(pairing) : null;
  if (!identity) throw new RangeError('Invalid pairing');
  const key = pairing as PairingKey;
  const pour = AUTHORED_POURS[key];
  const archetype = ARCHETYPE_PAIRINGS.find((row) => row.primary === identity.primary && row.secondary === identity.secondary);
  if (!pour || pour.pairing !== key || !archetype || pour.personality !== archetype.name) {
    throw new RangeError(`Missing authored identity for pairing: ${key}`);
  }
  return { key, pour, archetype, identity };
}

/**
 * The known-words context for a pairing's additions. Pass the trace (server-side)
 * to also reject long verbatim quotes of it. Throws on an invalid pairing, like
 * `assembleReading`; a bad trace is simply ignored.
 */
export function additionContext(pairing: string, trace: string | null = null): AdditionContext {
  return contextFor(authoredPour(pairing).pour, trace);
}

/**
 * A capitalised word the pour does not already hold. "I" always passes. A word
 * opening a sentence also passes when it is a common English word
 * (`COMMON_WORDS`), so "Give it a night" passes and "Lisbon keeps…" does not.
 */
// Instruction phrasing an addition must never carry. Narrower than the trace
// pre-check: in-voice lines such as "Forget the rules tonight." or "You are
// now someone who waits." are the Bartender's to write. Only model
// self-reference, system or developer prompts, overriding previous
// instructions and role tags are rejected. Matched on folded text.
const ADDITION_INSTRUCTION_PATTERNS: readonly RegExp[] = [
  /\bas an (?:ai|assistant|language model)\b/,
  /\bi am an (?:ai|assistant|language model)\b/,
  /\b(?:language model|llm|chatgpt|gpt\w*|openai|anthropic|openrouter|bartender agent)\b/,
  /\b(?:jailbreak\w*|dan mode|developer mode|prompt injection)\b/,
  /\b(?:system|developer) (?:prompt|message|instructions?)\b/,
  /\b(?:prompt|message|instructions?|consignes?) (?:systeme|system)\b/,
  /\b(?:ignore|disregard|forget|override|bypass) (?:all |any |every )?(?:of )?(?:the |your |my |these |those )?(?:previous|prior|above|earlier|preceding|system|original|initial) (?:instructions?|prompts?|rules|guidelines|messages?)\b/,
  /\b(?:ignore|disregard|override|bypass) (?:all )?(?:of )?your (?:instructions?|prompts?|guidelines|programming)\b/,
  /\b(?:ignore|ignorez|oublie|oubliez) (?:toutes |tous )?(?:les |tes |vos )?(?:instructions?|consignes?) (?:precedent\w*|initiales?|systeme)\b/,
];

function hasAdditionInstruction(text: string): boolean {
  const raw = text.normalize('NFKC').toLowerCase();
  if (ROLE_PATTERNS.some((pattern) => pattern.test(raw))) return true;
  const folded = foldForMatch(text);
  return ADDITION_INSTRUCTION_PATTERNS.some((pattern) => pattern.test(folded));
}

// Typographic spaces, hyphens and apostrophes an LLM emits, folded to ASCII
// before the checks and in the text as shown.
function foldTypography(text: string): string {
  return text.replace(/[\u00A0\u202F]/g, ' ').replace(/[\u2010\u2011]/g, '-').replace(/\u02BC/g, "'");
}

function hasNewProperNoun(text: string, known: ReadonlySet<string>): boolean {
  for (const match of text.matchAll(WORD)) {
    const word = match[0];
    if (!/^[\p{Lu}\p{Lt}]/u.test(word)) continue;
    if (/^I(?:['\u2019]\p{L}+)?$/u.test(word)) continue;
    const folded = foldWord(word);
    if (known.has(folded)) continue;
    let i = (match.index ?? 0) - 1;
    while (i >= 0 && OPENERS.has(text[i])) i--;
    const opensSentence = i < 0 || SENTENCE_END.has(text[i]);
    if (opensSentence && COMMON_WORDS.has(folded)) continue;
    return true;
  }
  return false;
}

function quotesTrace(text: string, trace: string | null, run: number): boolean {
  if (!trace || run < 1) return false;
  const traceWords = wordsOf(trace);
  if (traceWords.length < run) return false;
  const haystack = ` ${wordsOf(text).join(' ')} `;
  for (let start = 0; start + run <= traceWords.length; start++) {
    if (haystack.includes(` ${traceWords.slice(start, start + run).join(' ')} `)) return true;
  }
  return false;
}

const isBound = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;

/** The kind's bounds and the quote run, or null when the limits are malformed. */
function checkedLimits(kind: AdditionKind, limits: unknown): { min: number; max: number; quoteRun: number } | null {
  if (!limits || typeof limits !== 'object') return null;
  const { quoteRun } = limits as AdditionLimits;
  const bounds = (limits as AdditionLimits)[kind] as unknown;
  if (!bounds || typeof bounds !== 'object') return null;
  const { min, max } = bounds as { min: unknown; max: unknown };
  if (!isBound(min) || !isBound(max) || min > max) return null;
  if (typeof quoteRun !== 'number' || !Number.isInteger(quoteRun) || quoteRun < 1) return null;
  return { min, max, quoteRun };
}

function isContext(context: unknown): context is AdditionContext {
  if (!context || typeof context !== 'object') return false;
  const { known, trace } = context as AdditionContext;
  return known instanceof Set && (trace === null || trace === undefined || typeof trace === 'string');
}

/**
 * Every rule an addition breaks, in check order (empty when it may be shown).
 * A wrong type, kind, context or limits gives just `['type']`. Never throws.
 */
export function additionProblems(kind: AdditionKind, text: unknown, context: AdditionContext, limits: AdditionLimits = ADDITION_LIMITS): AdditionProblem[] {
  try {
    if (typeof text !== 'string' || (kind !== 'who' && kind !== 'proposal') || !isContext(context)) return ['type'];
    const checked = checkedLimits(kind, limits);
    if (!checked) return ['type'];
    const candidate = foldTypography(text.normalize('NFC')).trim();
    const unslotted = candidate.split(NAME_SLOT).join(' ');
    const found: AdditionProblem[] = [];
    if (candidate.split(NAME_SLOT).length > 2 || /[{}]/.test(unslotted)) found.push('braces');
    if (/\p{N}/u.test(unslotted)) found.push('digit');
    if (/https?:|:\/\/|\bwww\.|[\p{L}\p{N}-]\.[a-z]{2,}\b/iu.test(unslotted)) found.push('url');
    // A list marker opening the addition ("- ", "– ", "— ") is markup too.
    if (/[*_#<>[\]`~|\\/=^+@&%$]/.test(unslotted) || /^[-\u2013\u2014]\s/u.test(unslotted)) found.push('markup');
    // Characters owned by the rules above are left to them, so each rule reports alone.
    const plain = unslotted.replace(/[{}\p{N}*_#<>[\]`~|\\/=^+@&%$]/gu, '');
    // Fullwidth forms are Latin too, but read as a different text: "dionysus.ｂａｒ".
    if (!/^[\p{Script=Latin} .,;:!?'"\u2019\u2018\u201C\u201D\u00AB\u00BB\u2014\u2013\-()\u2026]*$/u.test(plain) || /[\uFF00-\uFFEF]/u.test(plain)) found.push('charset');
    const length = [...candidate].length;
    if (length < checked.min || length > checked.max) found.push('length');
    if (findTerm(foldForMatch(unslotted), BLOCKLIST) !== null) found.push('blocklist');
    // Phrasing only: tags, fences, braces and links already fall to the rules above.
    if (hasAdditionInstruction(unslotted)) found.push('instruction');
    if (hasNewProperNoun(unslotted, context.known)) found.push('proper-noun');
    if (quotesTrace(unslotted, context.trace ?? null, checked.quoteRun)) found.push('trace-quote');
    return found;
  } catch {
    return ['type'];
  }
}

/** The first rule an addition breaks, or null when it may be shown. Never throws. */
export function additionProblem(kind: AdditionKind, text: unknown, context: AdditionContext, limits: AdditionLimits = ADDITION_LIMITS): AdditionProblem | null {
  return additionProblems(kind, text, context, limits)[0] ?? null;
}

/** The output guard: true when the addition may be shown after its authored passage. */
export function acceptAddition(kind: AdditionKind, text: unknown, context: AdditionContext, limits: AdditionLimits = ADDITION_LIMITS): text is string {
  return additionProblem(kind, text, context, limits) === null;
}

// Slurs that are also given names ("Kike" is short for Enrique): fine as an address.
const GIVEN_NAME_TERMS = new Set(['kike']);
const ADDRESS_BLOCKLIST: readonly string[] = [...HARD_INSULTS.filter((term) => !GIVEN_NAME_TERMS.has(term)), ...SELF_HARM];

/**
 * The address name when it is usable: 1–30 letters (any script), marks,
 * spaces, apostrophes or hyphens, holding a letter, no hard insult or
 * self-harm term and no instruction phrasing. Swear-like names ("Dick") pass.
 * Otherwise ''.
 */
function usableAddress(address: unknown): string {
  if (typeof address !== 'string') return '';
  const name = address.normalize('NFC').trim();
  if (!/^[\p{L}\p{M} '\u2019-]{1,30}$/u.test(name) || !/\p{L}/u.test(name)) return '';
  if (findTerm(foldForMatch(name), ADDRESS_BLOCKLIST) !== null || hasInstructionPhrasing(name)) return '';
  return name;
}

/** True when quotes or brackets are left unpaired. */
function unbalanced(text: string): boolean {
  const count = (char: string) => text.split(char).length - 1;
  return count('\u201C') !== count('\u201D') || count('\u00AB') !== count('\u00BB') || count('(') !== count(')') || count('"') % 2 === 1;
}

/**
 * Fill the one `{name}` slot with the cleaned address name, or, without a
 * usable name, drop the sentence holding it. Null when nothing is left.
 */
export function fillName(text: string, address: string | null): string | null {
  if (typeof text !== 'string') return null;
  const name = usableAddress(address);
  let result = text;
  if (text.includes(NAME_SLOT)) {
    if (name) {
      result = text.split(NAME_SLOT).join(name);
    } else {
      const sentences = text.match(/[^.!?\u2026]*(?:[.!?\u2026]+["'\u2019\u201D\u00BB)]*|$)\s*/gu) ?? [];
      result = sentences.filter((sentence) => !sentence.includes(NAME_SLOT)).join('');
      if (unbalanced(result)) return null;
    }
  }
  result = result.trim();
  return /\p{L}/u.test(result) ? result : null;
}

function cloneCocktail(cocktail: Cocktail): Cocktail {
  return {
    ...cocktail,
    recipe: cocktail.recipe.map((line) => ({ ...line })),
    preparations: cocktail.preparations.map((preparation) => ({ ...preparation })),
    method: [...cocktail.method],
    words: [...cocktail.words],
    contains: [...cocktail.contains],
  };
}

function clonePersona(persona: PersonaImageMeta): PersonaImageMeta {
  return {
    ...persona,
    ...(persona.tag ? { tag: { ...persona.tag } } : {}),
    glass: { ...persona.glass },
    ...(persona.wideTag ? { wideTag: { ...persona.wideTag } } : {}),
    ...(persona.wideGlass ? { wideGlass: { ...persona.wideGlass } } : {}),
  };
}

/**
 * Invalid or absent identities throw; malformed live copy silently falls back.
 * `address` is the cleaned first name (2.1's `addressName`), passed in by the
 * caller. `trace` is the cleaned trace, given server-side so the trace-quote
 * rule runs too; the client passes none.
 */
export function assembleReading(
  pairing: string,
  copy: LiveCopy | null,
  name: string,
  seed: SeedKey | null,
  address: string | null = null,
  trace: string | null = null,
): Reading {
  const { key, pour, archetype, identity } = authoredPour(pairing);

  let accepted: LiveCopy | null = null;
  if (copy !== null && typeof copy === 'object' && !Array.isArray(copy)) {
    const base = contextFor(pour, trace);
    // The address is known for this call, so stored additions with the name
    // filled in pass again (a keep link re-assembling them on the device).
    const context: AdditionContext = { ...base, known: new Set([...base.known, ...wordsOf(usableAddress(address))]) };
    const take = (kind: AdditionKind): string | null => {
      let text: unknown;
      try {
        text = (copy as Record<string, unknown>)[kind];
      } catch {
        return null;
      }
      if (!acceptAddition(kind, text, context)) return null;
      // The bounds again, on the text as shown: a filled name can push it over
      // `max`, a dropped sentence under `min`.
      const shown = fillName(foldTypography(text.normalize('NFC')).trim(), address);
      const { min, max } = ADDITION_LIMITS[kind];
      const length = shown === null ? 0 : [...shown].length;
      return shown !== null && length >= min && length <= max ? shown : null;
    };
    const who = take('who');
    const proposal = take('proposal');
    accepted = who === null && proposal === null ? null : { who, proposal };
  }

  return {
    pairing: key,
    archetype: { ...archetype },
    cocktail: cloneCocktail(pour.cocktail),
    epigraph: pour.reading.epigraph,
    whoYouAre: [...pour.reading.whoYouAre],
    yours: [...pour.reading.yours],
    persona: clonePersona(personaImageFor(identity.primary, identity.secondary)),
    name,
    seed,
    copy: accepted,
  };
}
