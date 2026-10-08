// The authored store's shapes (AD-11, the cocktail meaning model).
//
// One typed shape for every pour, imported from design-artifacts/pours by
// scripts/import-pours.ts and validated in the build (shared/validate.ts).
// Every guest-facing string is the author's text verbatim; the import only
// trims whitespace and unwraps the single `*…*` around the epigraph and the
// closing line.
//
// Imports carry `.ts` extensions so scripts/import-pours.ts can load this
// file under Node's type stripping.

import { z } from 'zod';
import { FLAVOURS, VETOES, type FlavourId, type Veto } from '../answers.ts';
import { ALL_PAIRINGS, type PairingKey } from '../pairing.ts';

export const POUR_STATUSES = ['draft', 'flagged', 'approved'] as const;
export type PourStatus = (typeof POUR_STATUSES)[number];

export const MIN_ANCHORS = 3;

const text = z.string().min(1);
const pairing = z.enum(ALL_PAIRINGS as unknown as readonly [PairingKey, ...PairingKey[]]);
const veto = z.enum(VETOES.map((option) => option.id) as unknown as readonly [Veto, ...Veto[]]);
const flavourId = z.enum(FLAVOURS.map((option) => option.id) as unknown as readonly [FlavourId, ...FlavourId[]]);

// Unique, in vocabulary order (the import canonicalises the declared list).
const VETO_ORDER = new Map<string, number>(VETOES.map((option, i) => [option.id, i]));
const containsList = z
  .array(veto)
  .refine((list) => list.every((id, i) => i === 0 || (VETO_ORDER.get(id) ?? -1) > (VETO_ORDER.get(list[i - 1]) ?? -1)), {
    message: 'contains must be unique and in vocabulary order',
  });

// Either cell may be empty (a garnish with no amount; a sub-heading row such
// as `*for the ice*` with no item), never both.
export const RecipeLineSchema = z
  .strictObject({
    amount: z.string(),
    item: z.string(),
    note: text.optional(),
  })
  .refine((line) => line.amount !== '' || line.item !== '', { message: 'recipe line needs an amount or an item' });

export const PreparationSchema = z.strictObject({
  title: text,
  text,
});

export const CocktailSchema = z.strictObject({
  name: text,
  tagline: text,
  glassware: text,
  serves: text.optional(),
  recipeIntro: text.optional(),
  amountHeader: text,
  recipe: z.array(RecipeLineSchema).min(1),
  preparations: z.array(PreparationSchema),
  method: z.array(text).min(1),
  closingLine: text,
  contains: containsList,
});

// `kind` is an open string (lineage, riff, ingredient, gesture, glass…).
// Anchors are never rendered directly; a `(dossier only)` anchor is kept for
// the record and flagged so no surface uses it.
export const AnchorSchema = z.strictObject({
  kind: text,
  fact: text,
  meaning: text,
  speaksTo: text.optional(),
  dossierOnly: z.boolean(),
});

export const ReadingSchema = z.strictObject({
  epigraph: text,
  whoYouAre: z.array(text).min(1),
  yours: z.array(text).min(1),
});

export const AuthoredPourSchema = z.strictObject({
  pairing,
  status: z.enum(POUR_STATUSES),
  personality: text,
  cocktail: CocktailSchema,
  // Dossier-only anchors are kept for the record but don't count.
  anchors: z.array(AnchorSchema).refine((list) => list.filter((a) => !a.dossierOnly).length >= MIN_ANCHORS, {
    message: `needs at least ${MIN_ANCHORS} anchors that are not dossier-only`,
  }),
  reading: ReadingSchema,
});

// The eligibility catalogue: what selection needs, and nothing else.
export const CatalogueEntrySchema = z.strictObject({
  pairing,
  status: z.enum(POUR_STATUSES),
  contains: containsList,
  flavour: z.record(flavourId, z.number().min(0).max(1)),
});

export type RecipeLine = z.infer<typeof RecipeLineSchema>;
export type Preparation = z.infer<typeof PreparationSchema>;
export type Cocktail = z.infer<typeof CocktailSchema>;
export type Anchor = z.infer<typeof AnchorSchema>;
export type PourReading = z.infer<typeof ReadingSchema>;
export type AuthoredPour = z.infer<typeof AuthoredPourSchema>;
export type CatalogueEntry = z.infer<typeof CatalogueEntrySchema>;
