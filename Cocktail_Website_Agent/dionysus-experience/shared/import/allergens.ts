// Allergen safety (AD-4): a pour's declared `contains` must cover every veto
// its spec ingredients and garnish carry in the live dps-tools ingredient
// table. Vetoes are medical, so under-declaration is an error; an extra
// declared veto is safe and only reported.

import { VETOES, type Veto } from '../answers.ts';
import { garnishKeys, type IngredientTable, type Spec } from './sources.ts';

const VETO_IDS: readonly string[] = VETOES.map((option) => option.id);

export type AllergenCheck = { derived: Veto[]; errors: string[]; warnings: string[] };

export function checkAllergens(declared: readonly Veto[], spec: Spec, table: IngredientTable): AllergenCheck {
  const errors: string[] = [];
  const warnings: string[] = [];
  const carriers = new Map<string, string[]>();
  const keys = [...spec.ingredients.map((line) => line.key), ...garnishKeys(spec)];
  for (const key of keys) {
    const row = table[key];
    if (!row) {
      errors.push(`spec ingredient "${key}" is not in the ingredient table`);
      continue;
    }
    for (const veto of row.contains) {
      if (!VETO_IDS.includes(veto)) {
        errors.push(`ingredient table row "${key}" carries non-veto value "${veto}"`);
        continue;
      }
      carriers.set(veto, [...(carriers.get(veto) ?? []), key]);
    }
  }
  const derived = VETO_IDS.filter((id) => carriers.has(id)) as Veto[];
  for (const veto of derived) {
    if (!declared.includes(veto)) {
      errors.push(`contains misses "${veto}" (carried by ${carriers.get(veto)?.join(', ')})`);
    }
  }
  for (const veto of declared) {
    if (!carriers.has(veto)) warnings.push(`contains declares "${veto}", which no spec ingredient carries (safe; check it)`);
  }
  return { derived, errors, warnings };
}
