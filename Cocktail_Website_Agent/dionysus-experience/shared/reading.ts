// One synchronous, pure payload for browser and API surfaces. Only `yours`
// may be tailored; the identity, cocktail and other reading blocks are authored.

import { z } from 'zod';
import type { SeedKey } from './answers';
import { ARCHETYPE_PAIRINGS, type ArchetypePairing } from './data/archetypes';
import { personaImageFor, type PersonaImageMeta } from './data/personas';
import { AUTHORED_POURS } from './data/pours/static';
import type { Cocktail } from './data/schema';
import { parsePairingKey, type PairingKey } from './pairing';

export type LiveCopy = { yours: string[] };

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

const paragraphs = z.array(z.string().refine((text) => /[^\p{White_Space}\p{Cc}\p{Cf}]/u.test(text))).min(1);
const liveCopy = z.strictObject({ yours: paragraphs });

// Explicit English function words, including their contractions. No stemming:
// distinct content words stay distinct, and repeated words retain multiplicity.
const FUNCTION_WORDS = new Set(`
  a an the and or but nor so yet if unless because although though while whether
  as than that this these those all any both each either every neither none
  some such another other others much many more most few fewer less least
  i me my mine myself we us our ours ourselves you your yours yourself yourselves
  he him his himself she her hers herself it its itself they them their theirs themselves
  who whom whose which what whatever whichever whoever whomever
  am is are was were be being been do does did doing have has had having
  can could may might must shall should will would ought
  about above across after against along among around at before behind below beneath
  beside between beyond by despite down during except for from in inside into
  near of off on onto out outside over past since through throughout till to
  toward towards under underneath until up upon via with within without
  here there where when why how then also just only even not no
  i'm you're he's she's it's we're they're i've you've we've they've
  i'd you'd he'd she'd we'd they'd i'll you'll he'll she'll we'll they'll
  isn't aren't wasn't weren't don't doesn't didn't haven't hasn't hadn't
  can't cannot couldn't won't wouldn't shouldn't mustn't needn't let's
  that's there's what's who's where's when's why's how's
`.trim().split(/\s+/));

function contentWords(text: string): string[] {
  const normalized = text.normalize('NFKC').toLowerCase().replace(/[\u2018\u2019\u02bc\uff07]/g, "'");
  const words = normalized.match(/\p{L}[\p{L}\p{M}]*(?:'[\p{L}\p{M}]+)*/gu) ?? [];
  return words.filter((word) => !FUNCTION_WORDS.has(word));
}

const characterLength = (text: readonly string[]) => text.reduce((total, paragraph) => total + [...paragraph].length, 0);

/** Guard paragraph arrays; accepted strings are preserved exactly as supplied. */
export function acceptTailoring(authored: readonly string[], tailored: unknown): tailored is string[] {
  const source = paragraphs.safeParse(authored);
  const candidate = paragraphs.safeParse(tailored);
  if (!source.success || !candidate.success || source.data.length !== candidate.data.length) return false;

  const baselineLength = characterLength(source.data);
  const candidateLength = characterLength(candidate.data);
  if (candidateLength * 100 < baselineLength * 70 || candidateLength * 100 > baselineLength * 130) return false;

  const remaining = new Map<string, number>();
  let totalWords = 0;
  for (const paragraph of source.data) {
    for (const word of contentWords(paragraph)) {
      remaining.set(word, (remaining.get(word) ?? 0) + 1);
      totalWords++;
    }
  }
  if (totalWords === 0) return false;

  let retained = 0;
  for (const paragraph of candidate.data) {
    for (const word of contentWords(paragraph)) {
      const count = remaining.get(word) ?? 0;
      if (count > 0) {
        retained++;
        remaining.set(word, count - 1);
      }
    }
  }
  return retained * 2 >= totalWords;
}

function cloneCocktail(cocktail: Cocktail): Cocktail {
  return {
    ...cocktail,
    recipe: cocktail.recipe.map((line) => ({ ...line })),
    preparations: cocktail.preparations.map((preparation) => ({ ...preparation })),
    method: [...cocktail.method],
    contains: [...cocktail.contains],
  };
}

function clonePersona(persona: PersonaImageMeta): PersonaImageMeta {
  return {
    ...persona,
    tag: { ...persona.tag },
    glass: { ...persona.glass },
    ...(persona.wideTag ? { wideTag: { ...persona.wideTag } } : {}),
    ...(persona.wideGlass ? { wideGlass: { ...persona.wideGlass } } : {}),
  };
}

/** Invalid or absent identities throw; malformed live copy silently falls back. */
export function assembleReading(pairing: string, copy: LiveCopy | null, name: string, seed: SeedKey | null): Reading {
  const identity = typeof pairing === 'string' ? parsePairingKey(pairing) : null;
  if (!identity) throw new RangeError('Invalid pairing');

  const key = pairing as PairingKey;
  const pour = AUTHORED_POURS[key];
  const archetype = ARCHETYPE_PAIRINGS.find((row) => row.primary === identity.primary && row.secondary === identity.secondary);
  if (!pour || pour.pairing !== key || !archetype || pour.personality !== archetype.name) {
    throw new RangeError(`Missing authored identity for pairing: ${key}`);
  }

  const candidate = liveCopy.safeParse(copy);
  const accepted = candidate.success && acceptTailoring(pour.reading.yours, candidate.data.yours)
    ? { yours: [...candidate.data.yours] }
    : null;

  return {
    pairing: key,
    archetype: { ...archetype },
    cocktail: cloneCocktail(pour.cocktail),
    epigraph: pour.reading.epigraph,
    whoYouAre: [...pour.reading.whoYouAre],
    yours: [...(accepted?.yours ?? pour.reading.yours)],
    persona: clonePersona(personaImageFor(identity.primary, identity.secondary)),
    name,
    seed,
    copy: accepted,
  };
}
