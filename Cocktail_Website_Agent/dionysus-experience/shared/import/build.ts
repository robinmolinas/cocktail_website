// The import's pure core: sources in memory → the store, the report and
// every problem. scripts/import-pours.ts does the I/O around it.

import { comparePairingKeys, isPairingKey, type PairingKey } from '../pairing.ts';
import type { AuthoredPour, CatalogueEntry } from '../data/schema.ts';
import { checkAllergens } from './allergens.ts';
import { pourFlavour, rankSweet } from './flavour.ts';
import { parseDossier } from './parseDossier.ts';
import { quantityDifferences } from './quantities.ts';
import { FlavourRulesSchema, IngredientTableSchema, SpecSchema, type FlavourRules, type IngredientTable, type Spec } from './sources.ts';
import { FLAVOURS } from '../answers.ts';

export type StoreSources = {
  dossiers: readonly { pairing: string; markdown: string }[];
  specs: ReadonlyMap<string, unknown>;
  ingredients: unknown;
  rules: unknown;
};

export type BuiltStore = {
  pours: AuthoredPour[];
  catalogue: CatalogueEntry[];
  warnings: Map<PairingKey, string[]>;
  // Every problem, prefixed with its pairing. Non-empty → nothing is written.
  errors: string[];
};

const zodProblems = (label: string, issues: readonly { path: PropertyKey[]; message: string }[]) =>
  issues.map((issue) => `${label}: ${issue.path.map(String).join('.') || '(root)'}: ${issue.message}`);

export function buildStore(sources: StoreSources): BuiltStore {
  const errors: string[] = [];
  const warnings = new Map<PairingKey, string[]>();

  const tableParsed = IngredientTableSchema.safeParse(sources.ingredients);
  const rulesParsed = FlavourRulesSchema.safeParse(sources.rules);
  if (!tableParsed.success) errors.push(...zodProblems('ingredient table', tableParsed.error.issues));
  if (!rulesParsed.success) errors.push(...zodProblems('flavour rules', rulesParsed.error.issues));
  if (!tableParsed.success || !rulesParsed.success) return { pours: [], catalogue: [], warnings, errors };
  const table: IngredientTable = tableParsed.data.ingredients;
  const rules = rulesParsed.data.rules as FlavourRules;
  const flavourIds: readonly string[] = FLAVOURS.map((f) => f.id);
  for (const [flavour, patterns] of Object.entries(rules)) {
    if (!flavourIds.includes(flavour) || flavour === 'sweet') errors.push(`flavour rules: "${flavour}" is not a regex-ranked flavour`);
    for (const [pattern] of patterns) {
      try {
        new RegExp(pattern);
      } catch {
        errors.push(`flavour rules: invalid pattern for ${flavour}: ${pattern}`);
      }
    }
  }
  // Every pattern compiles before any pour is read (pourFlavour would throw).
  if (errors.length) return { pours: [], catalogue: [], warnings, errors };

  const seen = new Set<string>();
  const built: { pour: AuthoredPour; strength: CatalogueEntry['flavour']; sugarConc: number }[] = [];
  for (const { pairing, markdown } of sources.dossiers) {
    const fail = (message: string) => errors.push(`${pairing}: ${message}`);
    if (!isPairingKey(pairing)) {
      fail('file name is not a pairing key');
      continue;
    }
    if (seen.has(pairing)) fail('duplicate dossier');
    seen.add(pairing);
    const notes: string[] = [];
    warnings.set(pairing, notes);

    const parsed = parseDossier(markdown, pairing);
    notes.push(...parsed.warnings);
    if (!parsed.ok) parsed.errors.forEach(fail);

    const rawSpec = sources.specs.get(pairing);
    let spec: Spec | null = null;
    if (rawSpec === undefined) fail('missing spec _studio/specs/' + pairing + '.json');
    else {
      const s = SpecSchema.safeParse(rawSpec);
      if (!s.success) zodProblems('spec', s.error.issues).forEach(fail);
      else if (s.data.pairing !== pairing) fail(`spec pairing "${s.data.pairing}" does not match`);
      else spec = s.data;
    }
    if (!parsed.ok || !spec) continue;

    const allergens = checkAllergens(parsed.pour.cocktail.contains, spec, table);
    allergens.errors.forEach(fail);
    notes.push(...allergens.warnings, ...quantityDifferences(parsed.pour.cocktail.recipe, spec, parsed.pour.cocktail.amountHeader));
    if (allergens.errors.length) continue;

    const { strength, sugarConc } = pourFlavour(spec, table, rules);
    built.push({ pour: parsed.pour, strength, sugarConc });
  }
  for (const pairing of sources.specs.keys()) {
    if (!seen.has(pairing)) errors.push(`${pairing}: spec has no dossier`);
  }

  if (errors.length) return { pours: [], catalogue: [], warnings, errors };

  // Sweet is ranked over the whole collection being imported.
  const sweet = rankSweet(built.map((b) => b.sugarConc));
  built.sort((a, b) => comparePairingKeys(a.pour.pairing, b.pour.pairing));
  const catalogue: CatalogueEntry[] = built.map(({ pour, strength, sugarConc }) => ({
    pairing: pour.pairing,
    status: pour.status,
    contains: pour.cocktail.contains,
    flavour: { ...strength, sweet: sweet(sugarConc) },
  }));
  return { pours: built.map((b) => b.pour), catalogue, warnings, errors };
}
