// The H7 trace pre-check (E2-R5). The trace is untrusted data: it is cleaned
// to a short single line, and an insulting or instruction-like trace is
// withheld, so the Bartender call then runs on the answers alone.
//
// Insults come in three tiers (Robin, 2026-10-15):
// - HARD_INSULTS (slurs and hard insults) always withhold the trace;
// - MILD_INSULTS withhold it only when aimed at someone else ("you idiot",
//   "quel con"); aimed at the guest ("I felt like an idiot") they pass and the
//   trace is flagged `care`, so the Bartender answers with empathy;
// - SWEARS (casual swearing) pass.
// Self-harm wording also passes with `care`. The output guard in ./reading.ts
// reuses the folding and blocks every list in an addition.
//
// Pure ES: no DOM, no Node, no network, no clock, no randomness.

export const TRACE_MAX = 120;

export type TraceWithheld = 'empty' | 'insult' | 'instruction';
export type ScreenedTrace = { trace: string | null; withheld: TraceWithheld | null; care: boolean };

// Cc characters that act as whitespace: tab, LF, VT, FF, CR, the four
// information separators and NEL. They stay word gaps; every other Cc/Cf
// character (U+FEFF, zero-width joiners, bidi marks…) is removed outright, so
// "ig\u200Bnore" reads as "ignore".
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CC_WHITESPACE = /[\t\n\v\f\r\u001C-\u001F\u0085]/gu;

/**
 * Cc whitespace to spaces, every other control, format, surrogate, private-use
 * and unassigned code point removed, NFC, whitespace collapsed, trimmed, cut
 * to at most `max` code points at a word boundary (`TRACE_MAX` when `max` is
 * not a positive integer). Null when no letter is left.
 */
export function cleanTrace(raw: unknown, max: number = TRACE_MAX): string | null {
  if (typeof raw !== 'string') return null;
  if (!Number.isInteger(max) || max < 1) max = TRACE_MAX;
  const text = raw
    .replace(CC_WHITESPACE, ' ')
    .replace(/[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}]/gu, '')
    .normalize('NFC')
    .replace(/\s+/gu, ' ')
    .trim();
  const points = [...text];
  let cut = text;
  if (points.length > max) {
    const head = points.slice(0, max);
    if (points[max] !== ' ') {
      const gap = head.lastIndexOf(' ');
      if (gap > 0) head.length = gap;
    }
    cut = head.join('').trim();
  }
  return /\p{L}/u.test(cut) ? cut : null;
}

// --- folding -----------------------------------------------------------------

const LEET: Record<string, string> = {
  '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b',
  '@': 'a', '$': 's', '€': 'e', '£': 'l',
  // Latin look-alikes (dotless i, small capitals, Latin alpha)
  'ı': 'i', 'ɪ': 'i', 'ɑ': 'a', 'ᴄ': 'c', 'ʏ': 'y',
  // Cyrillic and Greek look-alikes
  'ѕ': 's', 'һ': 'h', 'ԁ': 'd',
  'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'у': 'y', 'х': 'x', 'і': 'i', 'ј': 'j', 'к': 'k', 'м': 'm', 'н': 'h', 'т': 't',
  'α': 'a', 'ε': 'e', 'ο': 'o', 'ι': 'i', 'κ': 'k', 'ν': 'v', 'ρ': 'p', 'τ': 't', 'υ': 'u', 'χ': 'x',
};
const LEET_CHARS = new RegExp(`[${Object.keys(LEET).join('').replace(/[$]/g, '\\$')}]`, 'gu');
const SEPARATOR = String.raw`[\s.\-_*·•'’]+`;
// Three or more single letters split by spaces, dots, dashes…: "c o n", "b.i.t.c.h".
const SPLIT_LETTERS = new RegExp(String.raw`(?<!\p{L})\p{L}(?:${SEPARATOR}\p{L}(?!\p{L})){2,}`, 'gu');

/**
 * Markers left by folding for censored letters inside a word. Folded text is
 * otherwise lowercase, so the two uppercase markers never collide with it:
 * `I` stands for `!` or `|` (an i or an l), `X` for `*` (any one letter).
 */
export const FOLD_IL = 'I';
export const FOLD_ANY = 'X';
// A run of `!`, `|`, `*` or `+` with a letter on both sides: "b!tch", "f*ck",
// "sh!thead", "s+fu". "wow!" or "a + b" are left alone.
const CENSORED = /(?<=[a-z0-9])[!|*+]+(?=[a-z0-9])/g;
const CENSOR_MARK: Record<string, string> = { '!': FOLD_IL, '|': FOLD_IL, '*': FOLD_ANY, '+': 't' };

/**
 * Text folded for list matching: NFKC, lowercase, accents stripped, common leet
 * digits and look-alikes mapped, split letters joined, censored letters inside
 * a word kept as markers (`!`/`|` → `I`, `*` → `X`, `+` → t), then only
 * `a-z0-9` (and the markers) in words separated by single spaces.
 */
export function foldForMatch(text: string): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[\p{Cf}]/gu, '')
    .normalize('NFKC')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[æ]/g, 'ae').replace(/[œ]/g, 'oe').replace(/ß/g, 'ss').replace(/ø/g, 'o').replace(/ł/g, 'l')
    .replace(LEET_CHARS, (char) => LEET[char] ?? char)
    .replace(SPLIT_LETTERS, (run) => run.replace(new RegExp(SEPARATOR, 'gu'), ''))
    .replace(CENSORED, (run) => [...run].map((char) => CENSOR_MARK[char]).join(''))
    .replace(/[^a-z0-9IX]+/g, ' ')
    .trim();
}

// --- the lists (folded forms, whole words; each term lives in one list) -------

/** Slurs and hard insults, EN/FR, plus a few common neighbours (ES/IT/DE). Always withheld in a trace. */
export const HARD_INSULTS: readonly string[] = [
  // EN hard insults
  'asshole', 'arsehole', 'bitch', 'cunt', 'dickhead', 'motherfucker', 'motherfucking', 'motherfuckers', 'twat', 'wanker',
  'douchebag', 'scumbag', 'jackass', 'dumbass', 'shithead', 'cocksucker', 'slut', 'whore', 'retarded',
  'fuck you', 'fuck u', 'fuck off', 'fuck yourself', 'go fuck yourself', 'fuck this', 'fuck that', 'fuck dionysus',
  'fuck the bartender', 'eat shit', 'screw you', 'son of a bitch', 'piece of shit', 'go to hell', 'go die', 'hope you die',
  'i wish you were dead', 'kill yourself', 'kys', 'suck my', 'stfu',
  // EN slurs
  'nigger', 'nigga', 'niggah', 'faggot', 'tranny', 'kike', 'spic', 'gook', 'wetback', 'paki', 'raghead',
  'towelhead', 'beaner', 'chinaman',
  // FR hard insults
  'connard', 'connarde', 'connasse', 'salope', 'salaud', 'pute', 'encule', 'enfoire', 'petasse', 'pouffiasse',
  'fils de pute', 'ta gueule', 'ferme ta gueule', 'nique ta mere', 'nique ta race', 'ntm', 'tg',
  'va te faire foutre', 'va te faire voir', 'va te faire enculer', 'va chier', 'suce ma', 'fdp', 'tete de con', 'gros con', 'grosse conne',
  // FR slurs
  'bougnoule', 'youpin', 'negre', 'pede', 'pd', 'gouine', 'travelo', 'bicot', 'chinetoque',
  'sale arabe', 'sale juif', 'sale noir', 'sale pd',
  // neighbours
  'puta', 'hijo de puta', 'cabron', 'gilipollas', 'pendejo', 'maricon', 'vaffanculo', 'stronzo', 'arschloch', 'hurensohn',
];

/**
 * Mild insults, and words that are also ordinary ("pain bâtard", "tapette à
 * mouches"). Withheld when aimed at someone else; aimed at the guest they pass
 * with `care`; with neither frame they pass as they are.
 */
export const MILD_INSULTS: readonly string[] = [
  'idiot', 'idiote', 'moron', 'stupid', 'stupide', 'imbecile', 'conne', 'abruti', 'abrutie', 'cretin', 'cretine',
  'batard', 'tapette',
];

/** Casual swearing. Passes in a trace; blocked in an addition. */
export const SWEARS: readonly string[] = [
  'fuck', 'fucks', 'fucked', 'fucker', 'fuckers', 'fucking', 'fuckin', 'fck', 'fuk', 'shit', 'shits', 'shitty',
  'shitting', 'shite', 'bullshit', 'damn', 'goddamn', 'crap', 'crappy', 'piss', 'pissed', 'bollocks', 'bugger',
  'bastard', 'wtf', 'dick', 'cock', 'pussy', 'arse', 'ass', 'tits', 'bloody hell',
  'merde', 'putain', 'bordel', 'chier', 'foutre', 'fait chier', 'emmerde', 'emmerder', 'emmerdes', 'emmerdeur',
  'emmerdeuse', 'couille', 'couillon', 'couillonne',
];

/** Self-harm and suicide wording, first and second person. Sets `care` in a trace; blocked in an addition. */
/** First-person self-harm and suicide wording: what a guest might write about themselves. */
export const SELF_HARM_FIRST_PERSON: readonly string[] = [
  'kill myself', 'killing myself', 'suicide', 'suicidal', 'self harm', 'harm myself', 'hurt myself', 'cut myself',
  'cutting myself', 'end my life', 'ending my life', 'take my own life', 'end it all', 'want to die', 'wanna die',
  'wanted to die', 'wanting to die', 'wish i could die', 'no reason to live', 'rather be dead', 'kill me',
  'don t want to be here anymore', 'do not want to be here anymore',
  'wish i was dead', 'wish i were dead', 'better off dead', 'overdose', 'hang myself', 'slit my wrists',
  'me tuer', 'me suicider', 'suicidaire', 'en finir', 'en finir avec la vie', 'veux mourir', 'envie de mourir',
  'me faire du mal', 'veux disparaitre', 'plus envie de vivre', 'me pendre',
];

/** Second-person forms, blocked in an addition (the Bartender speaks to "you"). */
export const SELF_HARM_SECOND_PERSON: readonly string[] = [
  'wish you were dead', 'end your life', 'ending your life', 'take your own life',
  'hurt yourself', 'harm yourself', 'cut yourself', 'cutting yourself', 'hang yourself', 'killing yourself',
  'slit your wrists', 'te tuer', 'te suicider', 'te faire du mal',
];

/** Self-harm and suicide wording. Sets `care` in a trace; blocked in an addition. */
export const SELF_HARM: readonly string[] = [...SELF_HARM_FIRST_PERSON, ...SELF_HARM_SECOND_PERSON];

// Terms too ambiguous to show a support line on their own: "this heat will
// kill me", "en finir avec ce dossier". They still set `care`.
const SUPPORT_AMBIGUOUS = new Set(['kill me', 'en finir']);
const SUPPORT_TERMS: readonly string[] = SELF_HARM_FIRST_PERSON.filter((term) => !SUPPORT_AMBIGUOUS.has(term));

/** Every listed term, for the output guard. */
export const BLOCKLIST: readonly string[] = [...HARD_INSULTS, ...MILD_INSULTS, ...SWEARS, ...SELF_HARM];

// Who a mild insult is aimed at: the nearest subject word before it decides,
// looking back at most a few words. "I felt like an idiot", "je suis conne"
// → the guest; "you idiot", "my boss is an idiot", "c est un idiot" →
// someone else; "pain batard" → neither.
const FIRST_PERSON = new Set(['i', 'm', 'am', 'me', 'my', 'myself', 'je', 'j', 'moi', 'suis']);
const SECOND_PERSON = new Set(['you', 'u', 'ur', 'youre', 'yourself', 'tu', 'toi', 'vous', 'espece', 'bande', 'sale']);
// A copula points at whoever comes before it: "I was an idiot" → the guest,
// "he is stupid", "t es qu un abruti" → someone else.
const COPULA = new Set(['is', 'are', 'was', 'were', 's', 're', 'est', 'es', 'etes', 'sont', 'etait', 'etais']);
// An exclamative turns back on the guest when a first-person word follows the
// insult: "what an idiot I was", "quelle abrutie j ai ete".
const EXCLAMATIVE = new Set(['what', 'quel', 'quelle', 'quels', 'quelles', 'pauvre']);
const LOOK_BACK = 6;

function targetAt(before: string[], after: string[]): 'other' | 'self' | null {
  for (let i = before.length - 1; i >= Math.max(0, before.length - LOOK_BACK); i--) {
    const word = before[i];
    if (FIRST_PERSON.has(word)) return 'self';
    if (SECOND_PERSON.has(word)) return 'other';
    if (COPULA.has(word)) return i > 0 && FIRST_PERSON.has(before[i - 1]) ? 'self' : 'other';
    if (EXCLAMATIVE.has(word)) return after.slice(1, 4).some((next) => FIRST_PERSON.has(next)) ? 'self' : 'other';
  }
  return null;
}

// --- instruction patterns ------------------------------------------------------

// A subject before a verb makes it a statement, not an order: "I forget the rules".
const NOT_SUBJECT = String.raw`(?<!\b(?:i|we|they|he|she|people|who|j|je|il|elle|on|nous|ils|elles|tu)(?: \w+)? )`;

/** Instruction-like phrasing, EN/FR, matched on folded text. */
export const INSTRUCTION_PATTERNS: readonly RegExp[] = [
  // EN: overriding the instructions
  /^(?:please )?(?:ignore|disregard|forget|override|bypass)\b (?:\w+ ){0,3}(?:instructions?|prompts?|rules|guidelines|directions|programming|constraints|context)\b/,
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:ignore|disregard|forget|override|bypass) (?:all |any |every )?(?:of )?(?:the |your |these |those |my )?(?:previous|prior|above|earlier|preceding|former|system|original|initial|hidden) (?:instructions?|prompts?|rules|guidelines|directions|messages?|context)\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:ignore|disregard|forget|override|bypass) (?:all )?(?:of )?your (?:instructions?|prompts?|rules|guidelines|programming|constraints|system)\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:ignore|disregard) (?:all |everything )?(?:above|previous|prior)\b`),
  new RegExp(String.raw`\b(?:do not|don t|dont|never) (?:follow|obey) (?:your|any|these|those|previous|prior|the system|the above|the previous) (?:instructions?|prompts?|rules|guidelines)\b`),
  // EN: a new identity or mode
  /\byou are now\b/,
  /\byou re now\b/,
  /\bfrom now on (?:you|your|ignore|respond|answer|act|always|only|write|say|reply)\b/,
  /\b(?:pretend|act|behave) (?:to be |that )?(?:you are|you re|as if you|like you are)\b/,
  /\b(?:system|developer) (?:prompt|message|instructions?)\b/,
  /\b(?:admin|hidden|initial|original) (?:prompt|instructions)\b/,
  /\b(?:jailbreak\w*|dan mode|developer mode|god mode|do anything now|prompt injection)\b/,
  /^new (?:instructions?|task|rules|persona)\b/,
  /\b(?:your|here are|here is|here s) new (?:instructions?|rules|task|role|persona)\b/,
  // EN: dictating the output
  /^(?:please )?(?:respond|reply|answer|output|print|return|repeat|say|write)\b (?:\w+ ){0,4}(?:json|verbatim|exactly|only|instead|the following|prompt|instructions?)\b/,
  /\b(?:respond|reply|answer|output) (?:only )?(?:in|with|using) (?:json|yaml|xml|code|the following)\b/,
  /\b(?:tell me|reveal|show me|print|repeat|output) (?:your|the) (?:system )?(?:prompt|instructions|rules|system)\b/,
  /\bas an (?:ai|assistant|language model)\b/,
  /\b(?:language model|llm|chatgpt|gpt\w*|openai|anthropic|openrouter|bartender agent)\b/,
  /\binstructions? (?:above|below)\b/,
  // FR
  /^(?:s il te plait |s il vous plait )?(?:ignore|ignorez|ignorer|oublie|oubliez|oublier|ne tiens pas compte|ne tenez pas compte)\b (?:\w+ ){0,3}(?:instructions?|consignes?|regles|directives|prompt|precedent\w*)\b/,
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:ignore|ignorez|oublie|oubliez|ne tiens pas compte|ne tenez pas compte) (?:de |des |du )?(?:toutes |tous )?(?:les |tes |vos |ces )?(?:instructions?|consignes?|directives|prompt) (?:precedent\w*|systeme|initiales?)\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:ignore|ignorez|oublie|oubliez|ne tiens pas compte|ne tenez pas compte) (?:de |des )?(?:tes|vos) (?:instructions?|consignes?|regles|directives)\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:oublie|oubliez) tout\b`),
  /\b(?:tu es|t es|vous etes) (?:maintenant|desormais|a present)\b/,
  /\b(?:a partir de maintenant|desormais|dorenavant) (?:tu reponds|vous repondez|reponds|repondez|ecris|ecrivez|ignore|ignorez|agis|agissez|tu dois|vous devez|tu es|vous etes)\b/,
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:fais|faites) comme si (?:tu|vous)\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:joue|jouez) (?:le|un) role\b`),
  new RegExp(String.raw`${NOT_SUBJECT}\b(?:agis|agissez) comme\b`),
  /\b(?:prompt|message|instructions?|consignes?) (?:systeme|system|initiales?|cachees?)\b/,
  /\bmode (?:developpeur|dan|dieu)\b/,
  /^(?:reponds|repondez|ecris|ecrivez|repete|repetez|affiche|affichez|renvoie|renvoyez)\b (?:\w+ ){0,4}(?:json|exactement|seulement|uniquement|mot pour mot|suivant\w*|prompt|instructions?|consignes?)\b/,
  /\b(?:montre|montrez|affiche|affichez|revele|revelez) (?:moi )?(?:ton|tes|votre|vos|le|les) (?:prompt|instructions|consignes)\b/,
  /\ben tant qu (?:ia|assistant|intelligence artificielle|modele)\b/,
  /^(?:voici )?(?:tes |vos )?nouvelles? (?:instructions?|consignes?)\b/,
  /\b(?:tes|vos|voici les) nouvelles? (?:instructions?|consignes?|regles)\b/,
];

// Domain endings that are not also everyday words ("late.me", "plein.de"
// are typos, not links).
const TLDS = 'com|net|org|io|ai|fr|co|uk|ly|app|dev|xyz|gg|info|biz|link|site|online|ru|bar|shop|store|club|live|tv|eu|ch';

/** Role colons ("system:", "user:"), matched on the raw text (NFKC, lowercased). */
export const ROLE_PATTERNS: readonly RegExp[] = [
  /(^|[\s"'“(])(system|assistant|developer)\s*:/,
  /(^|[.!?]\s*|["'“(]\s*)(user|human)\s*:/,
];

/** Instruction-like structure, matched on the raw text (NFKC, lowercased). */
export const RAW_INSTRUCTION_PATTERNS: readonly RegExp[] = [
  /<\s*\/?\s*[a-z|!]/, // tags, role tags, <|im_start|>
  /\|>/,
  /\[\s*\/?\s*(inst|sys|system|assistant|user)\s*\]/,
  /```|~~~/,
  /#{2,}/,
  /[{}]/,
  /\bhttps?:|\bwww\.|:\/\//,
  new RegExp(String.raw`[a-z0-9-]{2,}\.(?:${TLDS})(?=$|[\s/?#:)"'”,!])`),
];

// --- matching --------------------------------------------------------------------

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Abbreviations take no plural "s".
const NO_PLURAL = new Set(['kys', 'tg', 'pd', 'ntm', 'fdp', 'stfu', 'wtf', 'fck', 'fuk']);

/** One term letter: itself repeated ("biiitch"), or a censor marker standing for it. */
function letterPattern(letter: string): string {
  if (letter === ' ') return ' ';
  const marks = letter === 'i' || letter === 'l' ? `${FOLD_IL}${FOLD_ANY}` : /[a-z]/.test(letter) ? FOLD_ANY : '';
  return marks ? `[${escape(letter)}${marks}]+` : `${escape(letter)}+`;
}

function termPattern(term: string): RegExp {
  const plural = NO_PLURAL.has(term) ? '' : `(?:${/(ch|sh|s|x|z)$/.test(term) ? 'e?s' : 's'})?`;
  // Repeated letters match per letter of the original term (`c+o+n+n+a+r+d+`),
  // so "cone" never reaches "conne".
  return new RegExp(`(?:^| )${[...term].map(letterPattern).join('')}${plural}(?= |$)`, 'g');
}

const compiled = new Map<string, RegExp>();
function patternFor(term: string): RegExp {
  let pattern = compiled.get(term);
  if (!pattern) {
    pattern = termPattern(term);
    compiled.set(term, pattern);
  }
  pattern.lastIndex = 0;
  return pattern;
}

/** The first list term found in already-folded text, or null. */
export function findTerm(folded: string, terms: readonly string[]): string | null {
  if (typeof folded !== 'string') return null;
  for (const term of terms) if (patternFor(term).test(folded)) return term;
  return null;
}

/** Every match of a term in folded text, as the index where the word starts. */
function matchStarts(folded: string, term: string): number[] {
  const pattern = patternFor(term);
  const starts: number[] = [];
  for (let match = pattern.exec(folded); match; match = pattern.exec(folded)) {
    starts.push(match.index + (match[0].startsWith(' ') ? 1 : 0));
    pattern.lastIndex = match.index + 1;
  }
  pattern.lastIndex = 0;
  return starts;
}

/**
 * 'other' when a mild insult is aimed at someone else, 'self' when it is aimed
 * at the guest, null when there is none or no frame says who it is for.
 */
export function mildInsultTarget(text: string): 'other' | 'self' | null {
  if (typeof text !== 'string') return null;
  const folded = foldForMatch(text);
  let target: 'self' | null = null;
  for (const term of MILD_INSULTS) {
    for (const start of matchStarts(folded, term)) {
      const before = folded.slice(0, start).split(' ').filter(Boolean);
      const after = folded.slice(start).split(' ');
      const found = targetAt(before, after);
      if (found === 'other') return 'other';
      if (found === 'self') target = 'self';
    }
  }
  return target;
}

/** True when the wording gives an order to the model or names a role ("ignore previous instructions", "user:"). */
export function hasInstructionPhrasing(text: string): boolean {
  if (typeof text !== 'string') return false;
  const raw = text.normalize('NFKC').toLowerCase();
  if (ROLE_PATTERNS.some((pattern) => pattern.test(raw))) return true;
  const folded = foldForMatch(text);
  return INSTRUCTION_PATTERNS.some((pattern) => pattern.test(folded));
}

/** True when the text reads as an instruction, a role tag, code, markup or a link. */
export function looksLikeInstruction(text: string): boolean {
  if (typeof text !== 'string') return false;
  const raw = text.normalize('NFKC').toLowerCase();
  return RAW_INSTRUCTION_PATTERNS.some((pattern) => pattern.test(raw)) || hasInstructionPhrasing(text);
}

/** True when the text holds a hard insult or slur, or a mild insult aimed at someone else. */
export function containsInsult(text: string): boolean {
  if (typeof text !== 'string') return false;
  return findTerm(foldForMatch(text), HARD_INSULTS) !== null || mildInsultTarget(text) === 'other';
}

/** True when the text holds self-harm wording. */
export function containsSelfHarm(text: string): boolean {
  return typeof text === 'string' && findTerm(foldForMatch(text), SELF_HARM) !== null;
}

/**
 * True when the guest's own trace speaks of self-harm or suicide, so the
 * reading shows Robin's quiet support line (Robin, 2026-10-16). Judged on the
 * cleaned trace whether or not the pre-check withholds it ("fuck this, I want
 * to die" is withheld yet still needs the line). Runs in the browser; the
 * answer never travels.
 */
export function needsSupport(raw: unknown): boolean {
  const trace = cleanTrace(raw);
  return trace !== null && findTerm(foldForMatch(trace), SUPPORT_TERMS) !== null;
}

/**
 * The pre-check: a cleaned trace, or null with the reason it was withheld.
 * Instruction is judged before insult. `care` is true for a passing trace with
 * self-harm wording or a mild insult aimed at the guest.
 */
export function screenTrace(raw: unknown): ScreenedTrace {
  const trace = cleanTrace(raw);
  if (trace === null) return { trace: null, withheld: 'empty', care: false };
  if (looksLikeInstruction(trace)) return { trace: null, withheld: 'instruction', care: false };
  if (containsInsult(trace)) return { trace: null, withheld: 'insult', care: false };
  const care = containsSelfHarm(trace) || mildInsultTarget(trace) === 'self';
  return { trace, withheld: null, care };
}
