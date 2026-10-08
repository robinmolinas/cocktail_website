// Answers v3: the one canonical intake contract (AD-1, AD-2).
// Source of truth: agent/spec/intake-contract.md (agreed 2026-10-06).
//
// Every option list the journey asks is declared here once, with a permanent
// id. Labels are display copy and may change without a version bump; ids
// never change. The wire request is `Answers` exactly (it is already
// trace-free), parsed with a `z.strictObject` at every level.
//
// Pure ES: no DOM, no Node, no React, no clock, no randomness.

import { z } from 'zod';

export const QUESTIONNAIRE_VERSION = 3;

// ── Vocabularies ────────────────────────────────────────────────────────────

// H1 · "Who is this cocktail for?" Context only, never scored.
export const LENSES = [
  { id: 'real', label: 'The real me' },
  { id: 'becoming', label: 'The me I’m becoming' },
  { id: 'night', label: 'The night version of me' },
  { id: 'inner-child', label: 'My inner child' },
  { id: 'past', label: 'The me I used to be' },
  // Was "Someone else" until 2026-10-06; the legacy label still maps here.
  { id: 'another-side', label: 'Another side of me', legacyLabels: ['Someone else'] },
] as const;

// H2 · The seed colour. Hex and display name live in the core only.
export const SEEDS = [
  { id: 'campari-red', label: 'Campari Red', hex: '#c8102e' },
  { id: 'aperol-orange', label: 'Aperol Orange', hex: '#ff6f1f' },
  { id: 'galliano-gold', label: 'Galliano Gold', hex: '#f2c24e' },
  { id: 'midori-green', label: 'Midori Green', hex: '#58b947' },
  { id: 'curacao-blue', label: 'Curaçao Blue', hex: '#1287c8' },
  { id: 'violette-purple', label: 'Violette Purple', hex: '#7b5aa6' },
  { id: 'pamplemousse-rose', label: 'Pamplemousse Rosé', hex: '#f2789f' },
  { id: 'cassis-plum', label: 'Cassis Plum', hex: '#5c2447' },
] as const;

// H3 · Gravity: a continuous 0–100 lean from `left` (0) to `right` (100).
export const GRAVITIES = [
  { id: 'solitary-social', left: 'Solitary', right: 'Social' },
  { id: 'controlled-wild', left: 'Controlled', right: 'Wild' },
  { id: 'classic-experimental', left: 'Classic', right: 'Experimental' },
  { id: 'analytical-instinctive', left: 'Analytical', right: 'Instinctive' },
  { id: 'grounded-dreamlike', left: 'Grounded', right: 'Dreamlike' },
] as const;

// H4 · Texture: binary pairs, pole `a` or `b`.
export const BINARIES = [
  { id: 'sharp-smooth', a: 'Sharp', b: 'Smooth' },
  { id: 'relaxed-excited', a: 'Relaxed', b: 'Excited' },
  { id: 'halffull-halfempty', a: 'Half-full', b: 'Half-empty' },
  { id: 'control', a: 'In control', b: 'Out of control' },
  { id: 'quiet-loud', a: 'Quiet', b: 'Loud' },
  { id: 'risk', a: 'Risk averse', b: 'Risk taker' },
  { id: 'bright-dark', a: 'Bright', b: 'Dark' },
  { id: 'soft-rough', a: 'Soft', b: 'Rough' },
  { id: 'harmonic', a: 'Harmonic', b: 'Disharmonic' },
] as const;

// H5 round 2 · "What are you most drawn toward right now?"
export const DRAWN = [
  { id: 'freedom', label: 'Freedom' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'mastery', label: 'Mastery' },
  { id: 'peace', label: 'Peace' },
  { id: 'belonging', label: 'Belonging' },
  { id: 'pleasure', label: 'Pleasure' },
  { id: 'wonder', label: 'Wonder' },
  { id: 'change', label: 'Change' },
  { id: 'mischief', label: 'Mischief' },
] as const;

// H5 round 1 · "What do people often come to you for?"
export const SOUGHT = [
  { id: 'advice', label: 'Advice' },
  { id: 'comfort', label: 'Comfort' },
  { id: 'honesty', label: 'Honesty' },
  { id: 'courage', label: 'Courage' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'calm', label: 'Calm' },
  { id: 'taste', label: 'Taste' },
  { id: 'reality-check', label: 'A reality check' },
  { id: 'little-chaos', label: 'A little chaos' },
] as const;

// H6 beat 1 · flavours.
export const FLAVOURS = [
  { id: 'sweet', label: 'Sweet' },
  { id: 'bitter', label: 'Bitter' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'herbal', label: 'Herbal' },
  { id: 'fruity', label: 'Fruity' },
  { id: 'citrusy', label: 'Citrusy' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'floral', label: 'Floral' },
  { id: 'smoky', label: 'Smoky' },
] as const;

// H6 beat 2 · what to leave out. Closed enum (AD-4); there is no Alcohol veto.
export const VETOES = [
  { id: 'egg-white', label: 'Egg whites' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'nuts', label: 'Nuts' },
  { id: 'spice', label: 'Spice' },
] as const;

export const MAX_WORDS = 3;

// ── Derived id types ────────────────────────────────────────────────────────

type IdOf<V extends readonly { id: string }[]> = V[number]['id'];

export type LensId = IdOf<typeof LENSES>;
export type SeedKey = IdOf<typeof SEEDS>;
export type GravityKey = IdOf<typeof GRAVITIES>;
export type BinaryKey = IdOf<typeof BINARIES>;
export type DrawnId = IdOf<typeof DRAWN>;
export type SoughtId = IdOf<typeof SOUGHT>;
export type FlavourId = IdOf<typeof FLAVOURS>;
export type Veto = IdOf<typeof VETOES>;
export type Pole = 'a' | 'b';

type LabelledOption = { readonly id: string; readonly label: string; readonly legacyLabels?: readonly string[] };

// Display label (current or legacy) → permanent id. Unknown label → null.
export function idFromLabel<V extends readonly LabelledOption[]>(vocab: V, label: string): IdOf<V> | null {
  const wanted = label.trim();
  for (const option of vocab) {
    if (option.label === wanted || option.legacyLabels?.includes(wanted)) return option.id as IdOf<V>;
  }
  return null;
}

// Any word list → the canonical wire form: known ids only, unique, in
// vocabulary order, at most MAX_WORDS. The UI asks for no ranking, so tap
// order is decorative and never captured.
export function canonicalWords<V extends readonly { id: string }[]>(vocab: V, words: readonly string[]): IdOf<V>[] {
  const chosen = new Set(words);
  return vocab
    .filter((option) => chosen.has(option.id))
    .map((option) => option.id as IdOf<V>)
    .slice(0, MAX_WORDS);
}

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

// ── Browser-only diagnostics ────────────────────────────────────────────────
// Never on the wire, never scored, never logged server-side, never sent to
// the LLM. Kept in the browser's IntakeRecord beside the trace (1.5/1.6).

export type TextureStatus = 'chosen' | 'timedOut' | 'skipped' | 'notPresented';

export type TextureDiagnostic = {
  status: TextureStatus;
  // For `chosen`: ms from the readable moment (both words fully condensed) to the catch.
  ms?: number;
  // The tab was hidden during the window; the same pair was re-presented.
  interrupted?: boolean;
};

export type IntakeDiagnostics = {
  h4Mode: 'timed' | 'untimed';
  texture: Partial<Record<BinaryKey, TextureDiagnostic>>;
  example: 'chosen' | 'notTouched';
  gravityMoved: Partial<Record<GravityKey, boolean>>;
};
