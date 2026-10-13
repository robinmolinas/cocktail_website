// Answers v3: the one canonical intake contract (AD-1, AD-2).
// Source of truth: agent/spec/intake-contract.md (agreed 2026-10-06).
//
// Every option list the journey asks is declared once, with a permanent id,
// in ./vocab.ts (zod-free, so the journey can import it without pulling zod
// into the landing bundle) and re-exported from here. The wire request is
// `Answers` exactly (it is already trace-free), parsed with a
// `z.strictObject` at every level.
//
// Pure ES: no DOM, no Node, no React, no clock, no randomness.

import { z } from 'zod';

// The `.ts` extension is needed: the node strip-types build scripts resolve answers.ts directly.
export * from './vocab.ts';
import {
  BINARIES,
  DRAWN,
  FLAVOURS,
  GRAVITIES,
  LENSES,
  MAX_WORDS,
  SEEDS,
  SOUGHT,
  VETOES,
} from './vocab.ts';

export const QUESTIONNAIRE_VERSION = 3;

type IdOf<V extends readonly { id: string }[]> = V[number]['id'];

// ── Wire schema ─────────────────────────────────────────────────────────────

const idsOf = <V extends readonly { id: string }[]>(vocab: V) =>
  vocab.map((option) => option.id) as unknown as readonly [IdOf<V>, ...IdOf<V>[]];

const optionalKeys = <K extends string, S extends z.ZodType>(keys: readonly K[], value: S) =>
  Object.fromEntries(keys.map((key) => [key, value.optional()])) as { [P in K]: z.ZodOptional<S> };

// Unique and in vocabulary order: each id's index is strictly greater than
// the previous one's.
const wordList = <V extends readonly { id: string }[]>(vocab: V) => {
  const ids = idsOf(vocab);
  const order = new Map<string, number>(ids.map((id, i) => [id, i]));
  return z
    .array(z.enum(ids))
    .max(MAX_WORDS)
    .refine(
      (list) => list.every((id, i) => i === 0 || (order.get(id) ?? -1) > (order.get(list[i - 1]) ?? -1)),
      { message: 'Words must be unique and in vocabulary order' },
    );
};

// Control, format (zero-width, bidi override, BOM) and line/paragraph separators.
const CONTROL_CHAR = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u;

// Length is counted in code points, so an emoji counts as one character.
const NameSchema = z
  .string()
  .trim()
  .min(1)
  .refine((name) => [...name].length <= 40, { message: 'Name must be at most 40 characters' })
  .refine((name) => !CONTROL_CHAR.test(name), { message: 'Name must not contain control characters' });

export const AnswersSchema = z.strictObject({
  v: z.literal(QUESTIONNAIRE_VERSION),
  name: NameSchema,
  lens: z.enum(idsOf(LENSES)).nullable(),
  seed: z.enum(idsOf(SEEDS)).nullable(),
  gravity: z.strictObject(optionalKeys(idsOf(GRAVITIES), z.int().min(0).max(100))),
  texture: z.strictObject(optionalKeys(idsOf(BINARIES), z.enum(['a', 'b']))),
  drawnToward: wordList(DRAWN),
  soughtFor: wordList(SOUGHT),
  flavors: wordList(FLAVOURS),
  vetoes: z
    .array(z.enum(idsOf(VETOES)))
    .max(VETOES.length)
    .refine((list) => new Set(list).size === list.length, { message: 'Vetoes must be unique' }),
});

// The wire request is the same object: `Answers` carries no trace and no
// diagnostics, so there is no projection step that could leak them (AD-2).
export const RevealRequestSchema = AnswersSchema;

export type Answers = z.infer<typeof AnswersSchema>;
export type RevealRequest = z.infer<typeof RevealRequestSchema>;

// Never throws: the caller gets a zod error to handle as a silent fallback.
export function parseRevealRequest(input: unknown) {
  return RevealRequestSchema.safeParse(input);
}
