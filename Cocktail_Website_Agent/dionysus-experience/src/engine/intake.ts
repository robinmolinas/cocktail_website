// The app's journey answers → the Answers v3 wire request (story 1.5).
//
// TheDepths still writes display labels (lens, words, allergies), a hex seed
// and pole words for texture. This maps them onto the permanent ids the shared
// core scores, then parses the result with the strict v3 schema. Anything
// unknown or missing is dropped, so it stays neutral. The mapping disappears
// when TheDepths writes ids directly (1.6).
//
// No scoring rules live here: selection and assembly belong to shared/.

import {
  AnswersSchema,
  BINARIES,
  DRAWN,
  FLAVOURS,
  GRAVITIES,
  LENSES,
  QUESTIONNAIRE_VERSION,
  SEEDS,
  SOUGHT,
  VETOES,
  canonicalWords,
  idFromLabel,
  type BinaryKey,
  type GravityKey,
  type Pole,
  type RevealRequest,
  type SeedKey,
  type Veto,
} from '../../shared/answers';
import type { Answers as AppAnswers } from '../types';

// Names are never scored, so a journey without a usable name (a dev jump, or
// one the schema would refuse) borrows this on the wire only.
export const WIRE_GUEST_NAME = 'Guest';

/** The seed id for a hex colour, or null when the hex is not one of the eight seeds. */
export function seedFromHex(hex: string): SeedKey | null {
  const wanted = hex.trim().toLowerCase();
  return SEEDS.find((seed) => seed.hex.toLowerCase() === wanted)?.id ?? null;
}

const labelsToIds = <V extends readonly { id: string; label: string }[]>(vocab: V, labels: readonly string[]) =>
  canonicalWords(vocab, labels.map((label) => idFromLabel(vocab, label)).filter((id): id is V[number]['id'] => id !== null));

function gravityFrom(raw: Record<string, number>): Partial<Record<GravityKey, number>> {
  const out: Partial<Record<GravityKey, number>> = {};
  for (const { id } of GRAVITIES) {
    const value = raw[id];
    if (typeof value !== 'number' || !Number.isFinite(value)) continue;
    out[id] = Math.min(100, Math.max(0, Math.round(value)));
  }
  return out;
}

function textureFrom(raw: Record<string, string>): Partial<Record<BinaryKey, Pole>> {
  const out: Partial<Record<BinaryKey, Pole>> = {};
  for (const binary of BINARIES) {
    const word = raw[binary.id];
    if (word === binary.a) out[binary.id] = 'a';
    else if (word === binary.b) out[binary.id] = 'b';
  }
  return out;
}

// Allergies arrive as labels joined by ', '. All five vetoes may be chosen, so
// this is not a word list (those cap at three): unique, in vocabulary order.
function vetoesFrom(allergies: string): Veto[] {
  const chosen = new Set(allergies.split(',').map((label) => idFromLabel(VETOES, label)));
  return VETOES.filter((veto) => chosen.has(veto.id)).map((veto) => veto.id);
}

const wireName = (name: string) => {
  const trimmed = name.trim();
  return AnswersSchema.shape.name.safeParse(trimmed).success ? trimmed : WIRE_GUEST_NAME;
};

/** Throws when the mapped request does not parse (it always should). */
export function toRevealRequest(app: AppAnswers): RevealRequest {
  return AnswersSchema.parse({
    v: QUESTIONNAIRE_VERSION,
    name: wireName(app.name ?? ''),
    lens: app.lens ? idFromLabel(LENSES, app.lens) : null,
    seed: seedFromHex(app.color ?? ''),
    gravity: gravityFrom(app.gravity ?? {}),
    texture: textureFrom(app.texture ?? {}),
    drawnToward: labelsToIds(DRAWN, app.drawnToward ?? []),
    soughtFor: labelsToIds(SOUGHT, app.soughtFor ?? []),
    flavors: labelsToIds(FLAVOURS, app.flavors ?? []),
    vetoes: vetoesFrom(app.allergies ?? ''),
  });
}
