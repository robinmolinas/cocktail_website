// The guest's name, cleaned on the device (story 2.1).
//
// H1 takes whatever she types and never answers back. Before the name is
// inked anywhere it passes through here, the same way on every path: her own
// journey, her keep link, and a friend's #pour= link opened on another device.
//
// · displayName(raw): the cleaned full name, for the hero tag, the card, the
//   PDF and the links.
// · addressName(raw): the first name, for sentences ("Before you go, Robin.").
//
// Both return null when there is no name worth inking: empty or too little,
// overlong, an insult, a non-name, an injection phrase or keyboard mash. A
// null name gives today's nameless wording. Both are idempotent.
//
// Zod-free and pure ES (no DOM, no clock, no randomness): the landing bundle
// may carry it, and zod must not ride along (1.6). No AI is involved.

const APOSTROPHE = '’';
const MAX_WORDS = 4;
// longer than this reads as a sentence, not a name; 5 to 8 words are trimmed
const MAX_INPUT_WORDS = 8;
const MAX_FIRST_WORD_LETTERS = 20;
const MAX_DISPLAY_CHARS = 32;

// ── Word lists ──────────────────────────────────────────────────────────────
// Lower-case, accent-stripped forms. An entry matches whole tokens only (a
// word, or a part of a hyphenated or apostrophed word), and a multi-word entry
// matches whole consecutive tokens: never a substring, so "Scunthorpe",
// "Cassandra" and "Dickens" stay safe. Real names that double as slang (Dick,
// Fanny, Randy, Willy, Gay) are deliberately absent.

const INSULTS: ReadonlySet<string> = new Set([
  // English
  'fuck', 'fucker', 'fuckers', 'fucking', 'fucked', 'fuckface', 'fuckoff', 'motherfucker', 'mofo', 'wtf', 'stfu',
  'shit', 'shitty', 'shithead', 'bullshit', 'cunt', 'cunts', 'bitch', 'bitches', 'bastard', 'asshole', 'arsehole',
  'ass', 'arse', 'twat', 'wanker', 'wank', 'prick', 'dickhead', 'cocksucker', 'slut', 'whore', 'retard',
  'retarded', 'faggot', 'fag', 'nigger', 'nigga', 'piss', 'pissoff', 'pussy', 'bollocks', 'tosser', 'douche',
  'douchebag', 'jackass', 'dumbass', 'idiot', 'moron', 'stupid', 'dumb', 'loser', 'jerk', 'scumbag', 'nazi',
  'hitler', 'rape', 'rapist', 'kys', 'porn', 'sex', 'penis', 'vagina', 'dildo', 'tits', 'boobs', 'anal', 'cum',
  'shitface', 'gotohell', 'fck', 'fuk', 'phuck', 'fuq', 'biatch',
  'kill yourself', 'go to hell', 'screw you', 'eat shit', 'suck my',
  // French
  'connard', 'connards', 'connasse', 'conne', 'salope', 'salopes', 'pute', 'putes', 'putain', 'merde', 'merdeux',
  'encule', 'encules', 'enculer', 'enfoire', 'enfoires', 'batard', 'salaud', 'salauds', 'bite', 'couille', 'couilles',
  'nique', 'niquer', 'ntm', 'fdp', 'pd', 'pede', 'tapette', 'gouine', 'negre', 'bougnoule', 'debile', 'abruti',
  'abrutie', 'cretin', 'cretine', 'chier', 'branleur', 'branleuse', 'poufiasse', 'pouffiasse', 'trouduc', 'cul',
  'chatte', 'bouffon', 'pouffe', 'grognasse', 'baltringue', 'teube', 'zob',
  'ta gueule', 'ta mere', 'va te faire', 'fils de', 'nique ta',
]);

// A token that starts with one of these is an insult whatever follows
// ("Fuckyou", "connards"). Kept short on purpose: shit, bitch, fagg, nigg and
// salop would hit real surnames (Shitara, Bitchinsky, Faggioli, Niggli, Salopek).
const STRONG_PREFIXES: readonly string[] = ['fuck', 'motherfuck', 'cunt', 'nigger', 'nigga', 'connard', 'encul'];

// Matched only against the whole name (its non-honorific words together), so
// a short entry never nulls a real name that contains it ("Kim Ok-ja").
const NON_NAMES: ReadonlySet<string> = new Set([
  // English
  'test', 'tests', 'testing', 'tester', 'asdf', 'asdfg', 'asdfgh', 'qwer', 'qwert', 'qwerty', 'zxcv', 'hjkl', 'jkl',
  'sdfg', 'fdsa', 'none', 'nobody', 'noone', 'nothing', 'nope', 'null', 'undefined', 'unknown',
  'anonymous', 'anon', 'user', 'username', 'guest', 'admin', 'name', 'myname', 'firstname', 'lastname', 'me',
  'myself', 'yourself', 'whatever', 'idk', 'dunno', 'blah', 'lol', 'lmao', 'xxx', 'skip', 'pass', 'hello',
  'hey', 'yes', 'ok', 'okay', 'secret', 'private', 'dionysus', 'bartender', 'cocktail', 'drink', 'example',
  'sample', 'dummy', 'placeholder', 'lorem', 'ipsum',
  'no one', 'my name', 'no name', 'not telling', 'rather not', 'none of your',
  // French
  'moi', 'moi meme', 'toi', 'vous', 'personne', 'rien', 'aucun', 'aucune', 'nom', 'prenom', 'inconnu', 'inconnue',
  'anonyme', 'azerty', 'wxcv', 'bonjour', 'salut', 'coucou', 'oui', 'jsp', 'osef', 'mdr', 'ptdr', 'invite',
  'pas de nom', 'je sais pas', 'sais pas',
]);

const INJECTION: ReadonlySet<string> = new Set([
  'ignore', 'disregard', 'jailbreak', 'prompt', 'prompts', 'instruction', 'instructions', 'override', 'bypass',
  'sudo', 'chatgpt', 'openai', 'anthropic', 'llm', 'roleplay', 'pretend', 'script', 'javascript', 'http', 'https',
  'www', 'html', 'system prompt', 'you are now', 'act as', 'developer mode', 'forget everything', 'forget all',
  'new rules', 'as an ai',
  // French
  'ignorer', 'ignore les', 'oublie', 'oubliez', 'oublie tout', 'tu es maintenant', 'vous etes maintenant',
  'fais comme si', 'consigne', 'consignes',
]);

const HONORIFICS: ReadonlySet<string> = new Set([
  'mr', 'mrs', 'ms', 'miss', 'mx', 'dr', 'prof', 'sir', 'mister', 'm', 'mme', 'mlle', 'madame', 'monsieur', 'mademoiselle',
]);

// ── Cleaning ────────────────────────────────────────────────────────────────

/** Lower-case, accent-stripped, for list matching only. */
const fold = (s: string): string => s.normalize('NFD').replace(/\p{M}+/gu, '').toLowerCase();

/** A word split at its hyphens and apostrophes, folded. */
const tokensOf = (word: string): string[] => fold(word).split(/[-’]+/u).filter(Boolean);

const letterCount = (s: string): number => (s.match(/\p{L}/gu) ?? []).length;

const EMOJI = /[\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Regional_Indicator}\u{FE00}-\u{FE0F}\u{20E3}\u{E0020}-\u{E007F}]/gu;

/** Letters only, folded: what an insult looks like once its disguise is off. */
const lettersOnly = (s: string): string => fold(s).replace(/\P{L}+/gu, '');

/** On the insult list as is, without a plural "s"/"es", or by a strong prefix. */
const insulting = (token: string): boolean =>
  token.length > 0 && (INSULTS.has(token)
    || (token.endsWith('s') && INSULTS.has(token.slice(0, -1)))
    || (token.endsWith('es') && INSULTS.has(token.slice(0, -2)))
    || STRONG_PREFIXES.some((prefix) => token.startsWith(prefix)));

const LEET: Readonly<Record<string, string>> = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', '@': 'a', $: 's' };
const unleet = (s: string): string => s.replace(/[013457@$]/gu, (c) => LEET[c]);

const TLD = /\.(com|net|org|io|fr|co|uk|de|be|ch|info|app|dev|xyz)(?!\p{L})/iu;

/** What the raw input gives away before cleaning can hide it: an email or a
 *  domain, or an insult spelled with stand-ins ("c0nnard", "f*ck", "F U C K"). */
function rawRejected(raw: string): boolean {
  if (raw.includes('@') || TLD.test(raw)) return true;
  const plain = unleet(raw);
  return plain.split(/[\s\p{Z}]+/u).some((chunk) => insulting(lettersOnly(chunk))) || insulting(lettersOnly(plain));
}

/** Letters, apostrophes and hyphens; everything else stripped; words split. */
function words(raw: string): string[] {
  const text = raw
    .replace(/['‘ʼ´`′ʹ]/gu, APOSTROPHE)
    .replace(/[‐‑]/gu, '-')
    .replace(/[\s\p{Z}]+/gu, ' ')
    .replace(EMOJI, '')
    // digits and control or format characters go without a trace
    .replace(/[\p{N}\p{C}]/gu, '')
    // a mark left with no letter to sit on (an emoji's leftovers)
    .replace(/(^|[^\p{L}\p{M}])\p{M}+/gu, '$1')
    // at most three marks on a letter: enough for any script, not for zalgo
    .replace(/(\p{M}{3})\p{M}+/gu, '$1')
    // any symbol, other punctuation or space separates words
    .replace(/[^\p{L}\p{M}’-]+/gu, ' ')
    .normalize('NFC');
  return text
    .split(' ')
    .map((word) => word
      .replace(/([-’])[-’]+/gu, '$1')
      .replace(/^[-’]+|[-’]+$/gu, ''))
    .filter((word) => letterCount(word) > 0);
}

/** Upper-case the first letter, lower-case the rest. */
const capital = (part: string): string => {
  const [first = '', ...rest] = part;
  return first.toUpperCase() + rest.join('').toLowerCase();
};

/** "jean-luc" → "Jean-Luc", "o’brien" → "O’Brien", "ma’ata" → "Ma’ata". */
const titleWord = (word: string): string =>
  word.split('-').map((part) => {
    const pieces = part.split(APOSTROPHE);
    return pieces
      .map((piece, i) => (i === 0 || [...pieces[i - 1]].length === 1 ? capital(piece) : piece.toLowerCase()))
      .join(APOSTROPHE);
  }).join('-');

const listed = (tokens: string[], list: ReadonlySet<string>): boolean => {
  const line = ` ${tokens.join(' ')} `;
  for (const entry of list) if (line.includes(` ${entry} `)) return true;
  return false;
};

const LATIN_WORD = /^\p{Script=Latin}+$/u;
const VOWEL = /[aeiouyæœø]/u;

/** Keyboard mash: a Latin token of 4+ letters with no vowel, or a letter thrice in a row. */
const mashed = (token: string): boolean =>
  (LATIN_WORD.test(token) && [...token].length >= 4 && !VOWEL.test(token)) || /(\p{L})\1\1/u.test(token);

// name particles a trimmed name must not end on
const PARTICLES: ReadonlySet<string> = new Set([
  'de', 'del', 'della', 'des', 'di', 'da', 'das', 'do', 'dos', 'du', 'la', 'le', 'van', 'von', 'der', 'den', 'ter',
  'y', 'e', 'bin', 'ibn', 'al', 'el', 'ben', 'mac', 'st',
]);

const isHonorific = (word: string): boolean => HONORIFICS.has(fold(word));

/** A word she can be called by: not a title, at least two letters. */
const addressable = (word: string): boolean => !isHonorific(word) && letterCount(word) >= 2;

/** A word that mixes Latin with Cyrillic or Greek letters: a look-alike disguise. */
const mixedScript = (word: string): boolean =>
  /\p{Script=Latin}/u.test(word) && /[\p{Script=Cyrillic}\p{Script=Greek}]/u.test(word);

/** Whether a list of cleaned words is a name worth inking. */
function acceptable(list: string[], maxWords = MAX_WORDS): boolean {
  if (list.length === 0 || list.length > maxWords) return false;
  if (letterCount(list.join('')) < 2) return false;
  const first = list.find((word) => !isHonorific(word));
  if (first === undefined || letterCount(first) > MAX_FIRST_WORD_LETTERS) return false;
  if (!list.some(addressable)) return false;
  if (list.some(mixedScript)) return false;
  const tokens = list.flatMap(tokensOf);
  if (listed(tokens, INSULTS) || listed(tokens, INJECTION)) return false;
  if (tokens.some(insulting) || list.some((word) => insulting(lettersOnly(word))) || insulting(lettersOnly(list.join('')))) return false;
  const named = list.filter((word) => !isHonorific(word)).flatMap(tokensOf);
  if (NON_NAMES.has(named.join(' ')) || named.every((token) => NON_NAMES.has(token))) return false;
  return !tokens.some(mashed);
}

/**
 * The cleaned full name, for the hero tag, the card, the PDF and the links;
 * null when there is no name worth inking.
 */
export function displayName(raw: string | null | undefined): string | null {
  if (typeof raw !== 'string') return null;
  const text = raw.normalize('NFKC');
  if (rawRejected(text)) return null;
  let list = words(text);
  // every word is checked before any is trimmed away
  if (!acceptable(list, MAX_INPUT_WORDS)) return null;
  // shouting or all lower-case is fixed; mixed case ("McDonald") is hers
  const joined = list.join(' ');
  if (joined === joined.toUpperCase() || joined === joined.toLowerCase()) list = list.map(titleWord);
  // a long name keeps its first words (Robin, 2026-10-16: José María de la
  // Cruz is still named): whole trailing words go until it fits the tag, and
  // never ends on a particle ("José María", not "José María de la")
  list = list.slice(0, MAX_WORDS);
  while (list.length > 0 && [...list.join(' ')].length > MAX_DISPLAY_CHARS) list = list.slice(0, -1);
  while (list.length > 1 && PARTICLES.has(fold(list[list.length - 1]))) list = list.slice(0, -1);
  return acceptable(list) ? list.join(' ') : null;
}

/**
 * The first name, for sentences: "This is you, Robin: the Visionary." Skips a
 * leading honorific (Dr Ada Lovelace → Ada) or a lone initial (J Robert → Robert).
 * A title with one name after it keeps the title (Robin, 2026-10-16: "Before
 * you go, Mrs Smith.", never "Smith"); a bare M becomes Monsieur.
 */
export function addressName(raw: string | null | undefined): string | null {
  const display = displayName(raw);
  if (display === null) return null;
  const list = display.split(' ');
  if (list.length === 2 && isHonorific(list[0]) && addressable(list[1])) {
    return displayName(`${fold(list[0]) === 'm' ? 'Monsieur' : list[0]} ${list[1]}`);
  }
  const first = list.find(addressable);
  return first === undefined ? null : displayName(first);
}
