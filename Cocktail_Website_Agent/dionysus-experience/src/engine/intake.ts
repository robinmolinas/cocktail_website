// The browser's intake record → the Answers v3 wire request (stories 1.5, 1.6).
//
// TheDepths writes v3 ids directly (1.6), so this is a projection, not a
// mapping: the request is built from `record.answers` alone, field by field,
// so the trace and the diagnostics cannot reach it, then parsed with the
// strict v3 schema. Only the name is touched: a journey without a usable one
// borrows the wire name.
//
// This module carries zod, so only the lazily loaded reveal (and dev hooks)
// import it; App holds the record through the zod-free ./record.
//
// No scoring rules live here: selection and assembly belong to shared/.

import { AnswersSchema, QUESTIONNAIRE_VERSION, type RevealRequest } from '../../shared/answers';
import type { IntakeRecord } from './record';

export { emptyRecord, type IntakeRecord, type JourneyAnswers } from './record';

// Names are never scored, so a journey without a usable name (a dev jump, or
// one the schema would refuse) borrows this on the wire only.
export const WIRE_GUEST_NAME = 'Guest';

const wireName = (name: string) => {
  const trimmed = name.trim();
  return AnswersSchema.shape.name.safeParse(trimmed).success ? trimmed : WIRE_GUEST_NAME;
};

/** Throws when the journey's answers do not parse (they always should). */
export function toRevealRequest(record: IntakeRecord): RevealRequest {
  const { answers } = record;
  return AnswersSchema.parse({
    v: QUESTIONNAIRE_VERSION,
    name: wireName(answers.name),
    lens: answers.lens,
    seed: answers.seed,
    gravity: answers.gravity,
    texture: answers.texture,
    drawnToward: answers.drawnToward,
    soughtFor: answers.soughtFor,
    flavors: answers.flavors,
    vetoes: answers.vetoes,
  });
}
