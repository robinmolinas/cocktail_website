// The Dionysus engine: psychologist -> historian -> mixologist -> storyteller.
// Deterministic for a given set of answers, so the same soul receives the same glass.

import type { Answers, CocktailResult, Ingredient } from '../types';
import { findPairing, type ArchetypeId } from '../data/archetypes';
import { SPIRITS, FLAVOR_MODS, COLOR_NAMES } from '../data/cocktails';
import { SELF_SCALES, MOOD_SCALES } from '../data/questions';

type Scores = Record<ArchetypeId, number>;

const ALL: ArchetypeId[] = [
  'Caregiver', 'Creator', 'Explorer', 'Hero', 'Innocent', 'Jester',
  'Lover', 'Magician', 'Outlaw', 'Regular Guy', 'Ruler', 'Sage',
];

function emptyScores(): Scores {
  return Object.fromEntries(ALL.map((a) => [a, 0])) as Scores;
}

type Weights = Partial<Record<ArchetypeId, number>>;

function add(scores: Scores, weights: Weights, factor = 1) {
  for (const [k, v] of Object.entries(weights)) {
    scores[k as ArchetypeId] += (v ?? 0) * factor;
  }
}

// ----- option weight tables -------------------------------------------------

const ANSWER_STYLE_W: Record<string, Weights> = {
  'From the perspective of an extraterrestrial alien': { Explorer: 2, Magician: 1.5 },
  'As honest as possible about myself': { Innocent: 1.5, Sage: 1.5 },
  'To become my dream alter ego': { Magician: 2, Creator: 1 },
  'To impersonate my favourite character': { Jester: 1.5, Lover: 1 },
  'To challenge your system': { Outlaw: 2.5 },
  'From the perspective of one of my multiple personalities': { Creator: 1.5, Magician: 1.5 },
};

const CHILDHOOD_W: Record<string, Weights> = {
  Countryside: { Innocent: 1.5, Caregiver: 1 },
  'Small town': { 'Regular Guy': 1.5, Caregiver: 0.5 },
  City: { Creator: 1.5, Lover: 0.5 },
  Metropolis: { Ruler: 1.5, Hero: 1 },
  Suburbs: { 'Regular Guy': 1.5, Innocent: 0.5 },
  Various: { Explorer: 2 },
};

// Sliders: [left-side weights, right-side weights]
const SELF_SCALE_W: Record<string, [Weights, Weights]> = {
  caring: [{ Outlaw: 1, Ruler: 0.5 }, { Caregiver: 1.5 }],
  leader: [{ 'Regular Guy': 1 }, { Ruler: 1, Hero: 0.8 }],
  fighter: [{ Innocent: 1 }, { Hero: 1.2, Outlaw: 0.6 }],
  participant: [{ Sage: 1.2 }, { Hero: 0.8, Jester: 0.8 }],
  disruptor: [{ Caregiver: 0.7, Ruler: 0.7 }, { Outlaw: 1.2, Creator: 0.8 }],
  dreamist: [{ 'Regular Guy': 0.8, Sage: 0.6 }, { Magician: 1.2, Innocent: 0.6 }],
  intuitive: [{ Sage: 1.4 }, { Magician: 1.2, Lover: 0.4 }],
  anticonsumerist: [{ Lover: 0.8, Ruler: 0.8 }, { Explorer: 1, Outlaw: 0.8 }],
  theoretical: [{ 'Regular Guy': 1.2 }, { Sage: 1.4 }],
  energetic: [{ Jester: 0.6 }, { Hero: 1, Explorer: 0.8 }],
  night: [{ Innocent: 1.2 }, { Lover: 1, Magician: 0.8 }],
  social: [{ Explorer: 0.7, Sage: 0.7 }, { Jester: 1, 'Regular Guy': 0.8 }],
  heavy: [{ Innocent: 0.8, Jester: 0.8 }, { Ruler: 0.9, Magician: 0.7 }],
  sophisticated: [{ 'Regular Guy': 1, Innocent: 0.6 }, { Ruler: 1, Lover: 0.8 }],
};

const MOOD_SCALE_W: Record<string, [Weights, Weights]> = {
  smooth: [{ Hero: 0.8, Ruler: 0.6 }, { Lover: 1.2 }],
  excited: [{ Innocent: 0.8, Sage: 0.6 }, { Jester: 1, Explorer: 0.8 }],
  negative: [{ Innocent: 1, Jester: 0.8 }, { Outlaw: 1, Sage: 0.6 }],
  outofcontrol: [{ Ruler: 1.4 }, { Outlaw: 1, Jester: 0.8 }],
  loud: [{ Sage: 1.2 }, { Jester: 1, Hero: 0.8 }],
  risktaker: [{ Caregiver: 1, 'Regular Guy': 0.8 }, { Outlaw: 1, Explorer: 1 }],
  dark: [{ Innocent: 1.4 }, { Magician: 1, Outlaw: 0.8 }],
  rough: [{ Caregiver: 0.9, Lover: 0.9 }, { Outlaw: 1, Hero: 0.8 }],
  disharmonic: [{ Caregiver: 0.8, Innocent: 0.8 }, { Outlaw: 0.9, Creator: 0.9 }],
};

const PERSONALITY_W: Record<string, Weights> = {
  'Is talkative': { Jester: 1.5, 'Regular Guy': 0.5 },
  'Is reserved': { Sage: 1.5, Ruler: 0.5 },
  'Tends to be quiet': { Sage: 1, Innocent: 1 },
  'Is sometimes shy': { Innocent: 1.5, Caregiver: 0.5 },
  'Is outgoing, sociable': { Jester: 1, Lover: 1 },
};

const INTERPERSONAL_W: Record<string, Weights> = {
  'Is sometimes rude': { Outlaw: 1.5, Jester: 0.5 },
  'Starts quarrels': { Outlaw: 1.2, Hero: 0.8 },
  'Has a forgiving nature': { Caregiver: 1.5, Innocent: 0.5 },
  'Is generally trusting': { Innocent: 1.2, 'Regular Guy': 0.8 },
  'Finds faults in others': { Ruler: 1.2, Sage: 0.8 },
};

const WORK_W: Record<string, Weights> = {
  'Does a thorough job': { Creator: 1, Sage: 1 },
  'Is reliable': { Caregiver: 1, 'Regular Guy': 1 },
  Perseveres: { Hero: 1.8 },
  'Follows plans': { Ruler: 1.8 },
  'Is easily distracted': { Jester: 1, Explorer: 1 },
};

const EMOTIONAL_W: Record<string, Weights> = {
  Relaxed: { 'Regular Guy': 1, Innocent: 0.8 },
  'Worries a lot': { Caregiver: 1.5 },
  'Emotionally stable': { Ruler: 1, Sage: 0.8 },
  'Calm under stress': { Hero: 1.2, Sage: 0.6 },
  'Gets nervous easily': { Innocent: 0.8, Creator: 0.8 },
};

const CREATIVITY_W: Record<string, Weights> = {
  Original: { Creator: 1.8 },
  Curious: { Explorer: 1.5, Sage: 0.5 },
  'Deep thinker': { Sage: 1.8 },
  Inventive: { Magician: 1.2, Creator: 0.8 },
  'Values aesthetics': { Lover: 1.2, Creator: 0.8 },
};

const STYLE_W: Record<string, Weights> = {
  Business: { Ruler: 1 },
  Hipster: { Creator: 1 },
  Preppy: { Ruler: 0.6, 'Regular Guy': 0.4 },
  Classic: { Sage: 0.6, Ruler: 0.4 },
  Sexy: { Lover: 1 },
  Casual: { 'Regular Guy': 1 },
  Sporty: { Hero: 1 },
  Urban: { Creator: 0.5, Outlaw: 0.5 },
  Trendy: { Lover: 0.5, Jester: 0.5 },
  Rocker: { Outlaw: 1 },
  Bohemian: { Creator: 0.5, Explorer: 0.5 },
  Hippie: { Innocent: 0.5, Explorer: 0.5 },
  Punk: { Outlaw: 1 },
  Tomboy: { Hero: 0.7, Explorer: 0.3 },
  Vintage: { Sage: 0.5, Lover: 0.5 },
  Artsy: { Creator: 1 },
};

// ----- deterministic randomness ----------------------------------------------

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// ----- colour helpers --------------------------------------------------------

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return { h: 18, s: 70, l: 54 };
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s: s * 100, l: l * 100 };
}

export function nameColor(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  if (l < 12) return 'sumi black';
  if (l > 92) return 'rice-paper white';
  if (s < 12) return l > 55 ? 'morning-mist grey' : 'inkstone grey';
  const bucket = COLOR_NAMES.find((c) => h <= c.maxHue) ?? COLOR_NAMES[0];
  return bucket.name;
}

const COLOR_HUE_W = (hex: string): Weights => {
  const { h, s, l } = hexToHsl(hex);
  if (l < 15 || (s < 15 && l < 50)) return { Outlaw: 1, Magician: 1 };
  if (l > 88 || (s < 15 && l >= 50)) return { Innocent: 1.5 };
  if (h < 20 || h >= 340) return { Lover: 1, Hero: 0.5 };
  if (h < 45) return { Jester: 0.8, Explorer: 0.7 };
  if (h < 70) return { Innocent: 0.7, Jester: 0.8 };
  if (h < 160) return { Caregiver: 0.8, Explorer: 0.7 };
  if (h < 200) return { Sage: 0.8, Caregiver: 0.7 };
  if (h < 250) return { Sage: 0.8, Ruler: 0.7 };
  if (h < 290) return { Magician: 1.5 };
  return { Lover: 1, Magician: 0.5 };
};

// ----- scale helpers ----------------------------------------------------------

function applyScales(
  scores: Scores,
  values: Record<string, number>,
  table: Record<string, [Weights, Weights]>,
) {
  for (const [id, [leftW, rightW]] of Object.entries(table)) {
    const v = values[id] ?? 50;
    const t = (v - 50) / 50; // -1 .. 1
    if (t < -0.08) add(scores, leftW, -t);
    else if (t > 0.08) add(scores, rightW, t);
  }
}

interface ScaleExtreme {
  label: string;
  strength: number;
}

function extremes(
  values: Record<string, number>,
  defs: { id: string; left: string; right: string }[],
  count: number,
): ScaleExtreme[] {
  return defs
    .map((d) => {
      const v = values[d.id] ?? 50;
      const t = (v - 50) / 50;
      return { label: t >= 0 ? d.right : d.left, strength: Math.abs(t) };
    })
    .filter((e) => e.strength > 0.15)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, count);
}

// ----- allergy handling -------------------------------------------------------

interface AllergyRule {
  pattern: RegExp;
  veto: RegExp; // ingredients to remove
  swap?: Ingredient;
  note: string;
}

const ALLERGY_RULES: AllergyRule[] = [
  {
    pattern: /nut|almond|orgeat/i,
    veto: /almond|orgeat|nut/i,
    note: 'kept entirely nut-free for you',
  },
  {
    pattern: /egg/i,
    veto: /egg|foam|white/i,
    note: 'no egg, no foam, clarity instead',
  },
  {
    pattern: /dairy|milk|lactose|cream/i,
    veto: /cream|milk|dairy/i,
    note: 'free of any dairy',
  },
  {
    pattern: /gluten|wheat|celiac|coeliac/i,
    veto: /whisky|whiskey|bourbon|rye|scotch|barley|malt|genever/i,
    swap: { amount: '50 ml', item: 'añejo tequila, 100% agave', note: 'gluten-free by nature, noble by character' },
    note: 'rebuilt on pure agave to stay gluten-free',
  },
  {
    pattern: /citrus|lime|lemon|yuzu/i,
    veto: /lime|lemon|yuzu|grapefruit|citrus/i,
    swap: { amount: '20 ml', item: 'verjus (pressed unripe grapes)', note: 'all the brightness of citrus, none of the citrus' },
    note: 'verjus carries the acidity so citrus never has to',
  },
  {
    pattern: /mint/i,
    veto: /mint/i,
    swap: { amount: 'a few leaves', item: 'fresh shiso', note: 'cooler than mint, and rarer' },
    note: 'shiso stands in where mint would have been',
  },
  {
    pattern: /honey/i,
    veto: /honey/i,
    swap: { amount: '15 ml', item: 'agave nectar', note: '' },
    note: 'agave replaces honey throughout',
  },
  {
    pattern: /spice|spicy|chili|chilli|pepper/i,
    veto: /chili|pepper/i,
    swap: { amount: '10 ml', item: 'muddled cucumber ribbons', note: 'coolness where the heat would have been' },
    note: 'kept cool: no chili, no pepper',
  },
];

// ----- the engine ---------------------------------------------------------------

export function craftCocktail(answers: Answers): CocktailResult {
  const scores = emptyScores();

  if (answers.answerStyle) add(scores, ANSWER_STYLE_W[answers.answerStyle] ?? {});
  if (answers.childhood) add(scores, CHILDHOOD_W[answers.childhood] ?? {});
  add(scores, COLOR_HUE_W(answers.color));
  applyScales(scores, answers.selfScales, SELF_SCALE_W);
  applyScales(scores, answers.moodScales, MOOD_SCALE_W);
  if (answers.personality) add(scores, PERSONALITY_W[answers.personality] ?? {});
  if (answers.interpersonal) add(scores, INTERPERSONAL_W[answers.interpersonal] ?? {});
  if (answers.workEthic) add(scores, WORK_W[answers.workEthic] ?? {});
  if (answers.emotional) add(scores, EMOTIONAL_W[answers.emotional] ?? {});
  if (answers.creativity) add(scores, CREATIVITY_W[answers.creativity] ?? {});
  for (const s of answers.styles) add(scores, STYLE_W[s] ?? {});

  const ranked = [...ALL].sort((a, b) => scores[b] - scores[a]);
  const primary = ranked[0];
  const secondary = ranked[1];
  const pairing = findPairing(primary, secondary);

  const seed = hashString(JSON.stringify(answers));
  const rng = mulberry32(seed);

  // ---------- the mixologist ----------
  const spirit = SPIRITS[primary];
  // H7's "how often does a cocktail find you?" was removed in the 2026-09-18
  // pass; its only effect on the drink was this branch, and H6's own "Alcohol"
  // veto already produces it.
  const zeroProof = /alcohol/i.test(answers.allergies);
  const long = (answers.drinkScales.long ?? 50) > 58;
  const carbonated = (answers.drinkScales.carbonated ?? 50) > 55;
  const complex = (answers.drinkScales.complex ?? 50) > 60;
  const simple = (answers.drinkScales.complex ?? 50) < 40;
  const nightDrink = (answers.drinkScales.drinkNight ?? 50) > 55;
  const modern = (answers.drinkScales.modern ?? 50) > 60;

  const glassware = long
    ? 'a tall highball, filled with a single column of clear ice'
    : nightDrink
      ? 'a chilled coupe, stem held between two fingers'
      : 'a low rocks glass over one large cube';

  const ingredients: Ingredient[] = [];
  ingredients.push({
    amount: long ? '45 ml' : '50 ml',
    item: zeroProof ? spirit.zeroProof : spirit.base,
    note: spirit.baseNote,
  });

  const chosenFlavors = answers.flavors.length > 0 ? answers.flavors.slice(0, 3) : ['Fresh'];
  const maxMods = simple ? 1 : chosenFlavors.length;
  for (const f of chosenFlavors.slice(0, maxMods)) {
    const mod = FLAVOR_MODS[f];
    if (!mod) continue;
    const useSwap = zeroProof && mod.zeroProofSwap;
    ingredients.push({
      amount: mod.amount,
      item: useSwap ? (mod.zeroProofSwap as string) : mod.ingredient,
      note: mod.note,
    });
  }

  if (!chosenFlavors.includes('Citrusy')) {
    ingredients.push({ amount: '20 ml', item: 'fresh lemon juice', note: 'to keep everything honest' });
  }
  if (!chosenFlavors.includes('Sweet')) {
    ingredients.push({ amount: '10 ml', item: 'cane sugar syrup', note: 'just enough to round the edges' });
  }
  if (complex) {
    ingredients.push({
      amount: '2 dashes',
      item: zeroProof ? 'saline solution' : 'aromatic bitters',
      note: 'the small print that makes the contract beautiful',
    });
  }
  if (carbonated) {
    ingredients.push({
      amount: 'top up',
      item: nightDrink && !zeroProof ? 'dry champagne' : 'chilled yuzu soda',
      note: 'lift, sparkle, departure',
    });
  }

  // allergies
  const allergyNotes: string[] = [];
  if (answers.allergies.trim()) {
    for (const rule of ALLERGY_RULES) {
      if (!rule.pattern.test(answers.allergies)) continue;
      for (let i = ingredients.length - 1; i >= 0; i--) {
        if (rule.veto.test(ingredients[i].item)) {
          if (rule.swap && i === 0) ingredients[i] = { ...rule.swap, amount: ingredients[i].amount };
          else if (rule.swap) ingredients[i] = rule.swap;
          else ingredients.splice(i, 1);
        }
      }
      allergyNotes.push(rule.note);
    }
  }

  ingredients.push({ amount: '', item: spirit.garnish });

  // ---------- procedure ----------
  const method = nightDrink ? 'stirred' : spirit.method;
  const procedure: string[] = [];
  procedure.push(`Chill ${glassware.split(',')[0]} until it fogs like breath on glass.`);
  if (primary === 'Magician' && !zeroProof) {
    procedure.push('Rinse the glass with absinthe, rolling it slowly, then cast the excess away.');
  }
  procedure.push(
    method === 'stirred'
      ? 'Combine everything except the garnish in a mixing glass over dense ice. Stir thirty slow revolutions. Patience is an ingredient.'
      : 'Combine everything except the garnish in a shaker with hard ice. Shake until the tin frosts and your hand begs forgiveness.',
  );
  procedure.push(
    method === 'stirred'
      ? 'Strain in silence. Watch how it pours: heavy at first, then willing.'
      : 'Double-strain, so nothing remains but intention.',
  );
  if (carbonated) procedure.push('Now the top-up, poured down a bar spoon so the bubbles arrive unbruised.');
  procedure.push(`Finish with ${spirit.garnish}.`);
  procedure.push(`Hold it to the light before the first sip. That ${nameColor(answers.color)} glow is yours.`);

  // ---------- the storyteller ----------
  const colorName = nameColor(answers.color);
  const adj = pick(rng, spirit.adjectives);
  const noun = pick(rng, SPIRITS[secondary]?.nouns ?? spirit.nouns);
  const city = answers.city.trim();
  const namePatterns: string[] = [
    `The ${adj} ${noun}`,
    `The ${noun} of ${city || 'Nowhere'}`,
    `${adj} ${noun}`,
    `The ${colorName.split(' ').slice(-1)[0].replace(/^./, (c) => c.toUpperCase())} ${noun}`,
  ];
  const cocktailName = city && rng() < 0.35 ? namePatterns[1] : pick(rng, [namePatterns[0], namePatterns[2], namePatterns[3]]);

  const displayName = answers.name.trim() || 'a nameless soul';
  const tagline = `Elaborated for ${displayName}`;

  const selfExtremes = extremes(answers.selfScales, SELF_SCALES, 3);
  const moodExtremes = extremes(answers.moodScales, MOOD_SCALES, 2);
  const traitWords = [...selfExtremes, ...moodExtremes].map((e) => e.label.toLowerCase());

  const flavorArc = chosenFlavors.length > 1
    ? `${chosenFlavors.slice(0, -1).join(', ').toLowerCase()} resolving into ${chosenFlavors[chosenFlavors.length - 1].toLowerCase()}`
    : `${chosenFlavors[0]?.toLowerCase() ?? 'fresh'}, held all the way through`;

  const whyYou: string[] = [];

  const childhoodPhrase: Record<string, string> = {
    Countryside: 'You began in the countryside',
    'Small town': 'You began in a small town',
    City: 'You began in the city',
    Metropolis: 'You began in a metropolis',
    Suburbs: 'You began in the suburbs',
    Various: 'You began in many places at once: a childhood that kept moving',
  };

  whyYou.push(
    `${displayName}. Before anything was poured, you were read. ` +
      (answers.childhood
        ? `${childhoodPhrase[answers.childhood] ?? `You began in ${answers.childhood.toLowerCase()}`}, and beginnings leave a watermark: they decide what feels like home in a glass. `
        : '') +
      (city
        ? `Now ${city} holds you, and a city always lends its tempo to the way a person drinks. `
        : '') +
      (answers.answerStyle === 'To challenge your system'
        ? `You told us, with admirable nerve, that you came to challenge the system. Noted. The system chose to fall a little in love with you instead.`
        : answers.answerStyle === 'From the perspective of an extraterrestrial alien'
          ? `You answered as a visitor from somewhere else entirely, which told us more truth than honesty ever could.`
          : answers.answerStyle
            ? `You chose to answer "${answers.answerStyle.toLowerCase()}", and the way a person chooses to be seen is the first ingredient.`
            : ''),
  );

  whyYou.push(
    `The psychologist's notes are plain: you lean ${traitWords.slice(0, 2).join(' and ')}` +
      (traitWords[2] ? `, with an unmistakable pull toward the ${traitWords[2]}` : '') +
      `. When asked for one colour to stand for all of you, you reached for ${colorName}, and that hue runs through this recipe like a signature through wet ink. ` +
      (answers.insight.trim()
        ? `And then you gave us the thing no questionnaire can demand: "${answers.insight.trim()}". That line is folded into this drink where only you will taste it.`
        : `You kept your private chapter private, so we left room in the glass for it.`),
  );

  whyYou.push(
    `The historian traced your lineage and found ${pairing.primary} blood crossed with ${pairing.secondary}, the pairing the old books call ${pairing.name}. ${pairing.story} ` +
      `Your kind seeks ${pairing.goal.toLowerCase()}; what it cannot abide is ${pairing.fear.toLowerCase()}. A drink for you must honour the first and never once taste of the second.`,
  );

  whyYou.push(
    `So the mixologist worked backwards from your nature. ${ingredients[0].item.charAt(0).toUpperCase() + ingredients[0].item.slice(1)}, because ${spirit.baseNote}. ` +
      `The arc of it is ${flavorArc}, ${long ? 'drawn long and unhurried, the way you take your hours' : 'kept short and certain, no syllable wasted'}. ` +
      (modern ? 'Built with a modern hand, because you have little patience for museums. ' : 'Built along classic lines, because some orders deserve keeping. ') +
      (zeroProof
        ? 'And it carries no alcohol at all: its power is in the architecture, not the proof. '
        : '') +
      (allergyNotes.length ? `It is also ${allergyNotes.join('; ')}. Care is not a garnish here, it is the recipe. ` : '') +
      `${spirit.garnish.charAt(0).toUpperCase() + spirit.garnish.slice(1)} closes the composition.`,
  );

  whyYou.push(
    `Why was this made for you, and only you? Because no one else stood at this exact crossing: ` +
      (answers.age.trim() ? `${answers.age.trim()} years in, ` : '') +
      (city ? `${city} outside the window, ` : '') +
      `${colorName} in the heart, ${traitWords[0] ?? 'quiet fire'} in the hands. ${pairing.name} does not appear twice. ` +
      `When you lift "${cocktailName}", you are not tasting a recipe; you are tasting a portrait, signed where the light hits the rim. Kanpai, ${displayName}.`,
  );

  const agentLines = {
    psychologist: `Reading the pressure of your strokes… you lean ${traitWords[0] ?? 'true'}, with ${colorName} underneath everything.`,
    historian: `Tracing the lineage… ${pairing.primary} crossed with ${pairing.secondary}. The archives call this soul ${pairing.name}.`,
    mixologist: `Then the base had to be ${zeroProof ? spirit.zeroProof : spirit.base.split(',')[0]}, balancing ${flavorArc}.`,
    storyteller: `It has a name now. They will call it "${cocktailName}".`,
  };

  return {
    cocktailName,
    archetypeName: pairing.name,
    archetypeEssence: pairing.essence,
    archetypeStory: pairing.story,
    primary: pairing.primary,
    secondary: pairing.secondary,
    tagline,
    glassware,
    flavorArc,
    colorName,
    zeroProof,
    ingredients,
    procedure,
    whyYou,
    agentLines,
  };
}
