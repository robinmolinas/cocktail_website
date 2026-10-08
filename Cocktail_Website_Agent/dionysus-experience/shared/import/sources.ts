// Shapes of the import's non-markdown sources: the Pour Studio spec, the
// live dps-tools ingredient table and the flavour rules. Loose objects: the
// import reads only the fields it needs and ignores the rest.

import { z } from 'zod';

export const SpecLineSchema = z.looseObject({
  key: z.string().min(1),
  ml: z.number().optional(),
  dashes: z.number().optional(),
  dash: z.number().optional(),
  drops: z.number().optional(),
  stage: z.string().optional(),
});

export const SpecSchema = z.looseObject({
  pairing: z.string(),
  ingredients: z.array(SpecLineSchema).min(1),
  garnish: z.array(z.union([z.string().min(1), z.looseObject({ key: z.string().min(1) })])).optional(),
});

export const IngredientSchema = z.looseObject({
  sugar: z.number().nullable().optional(),
  // Required: an unclassified row must stop the import, never read as allergen-free.
  contains: z.array(z.string()),
});

export const IngredientTableSchema = z.looseObject({
  ingredients: z.record(z.string(), IngredientSchema),
});

export const FlavourRulesSchema = z.looseObject({
  rules: z.record(z.string(), z.array(z.tuple([z.string(), z.number()]))),
});

export type SpecLine = z.infer<typeof SpecLineSchema>;
export type Spec = z.infer<typeof SpecSchema>;
export type IngredientTable = Record<string, z.infer<typeof IngredientSchema>>;
export type FlavourRules = Record<string, [string, number][]>;

export const garnishKeys = (spec: Spec): string[] =>
  (spec.garnish ?? []).map((g) => (typeof g === 'string' ? g : g.key));
