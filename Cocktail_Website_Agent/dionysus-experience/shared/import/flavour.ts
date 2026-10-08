// Flavour strengths per pour, 0..1 for each guest flavour. Must equal
// agent/matching/matching.py load_catalogue() exactly:
// - each rule is a regex on the spec ingredient key × an amount factor
//   (≥20 ml → 1.0; ≥7.5 ml → 0.6; anything else, incl. dashes/drops → 0.3);
// - a flavour's strength is the max over ingredients, capped at 1;
// - garnish is ignored;
// - sweet is the pour's sugar concentration (ml ingredients not at
//   stage "top"), ranked over the whole collection.

import { FLAVOURS, type FlavourId } from '../answers.ts';
import type { FlavourRules, IngredientTable, Spec, SpecLine } from './sources.ts';

export type FlavourStrengths = Record<FlavourId, number>;

export function amountFactor(line: SpecLine): number {
  const ml = line.ml;
  if (typeof ml === 'number') return ml >= 20 ? 1.0 : ml >= 7.5 ? 0.6 : 0.3;
  return 0.3; // dashes, drops, pieces, barspoons, leaves
}

const compiled = new WeakMap<FlavourRules, [string, RegExp, number][]>();

function compile(rules: FlavourRules): [string, RegExp, number][] {
  let list = compiled.get(rules);
  if (!list) {
    list = Object.entries(rules).flatMap(([flavour, patterns]) =>
      patterns.map(([pattern, base]): [string, RegExp, number] => [flavour, new RegExp(pattern), base]),
    );
    compiled.set(rules, list);
  }
  return list;
}

// Strengths before the sweet ranking (sweet = 0), plus the sugar
// concentration the ranking needs.
export function pourFlavour(spec: Spec, table: IngredientTable, rules: FlavourRules): { strength: FlavourStrengths; sugarConc: number } {
  const strength = Object.fromEntries(FLAVOURS.map((f) => [f.id, 0])) as FlavourStrengths;
  const patterns = compile(rules);
  let sugarG = 0;
  let vol = 0;
  for (const line of spec.ingredients) {
    const key = line.key;
    for (const [flavour, pattern, base] of patterns) {
      if (pattern.test(key)) {
        const f = flavour as FlavourId;
        strength[f] = Math.min(1.0, Math.max(strength[f], base * amountFactor(line)));
      }
    }
    if (typeof line.ml === 'number' && line.stage !== 'top') {
      vol += line.ml;
      sugarG += (line.ml * (table[key]?.sugar || 0)) / 100;
    }
  }
  return { strength, sugarConc: vol ? (sugarG / vol) * 100 : 0 };
}

// Sweet over the collection: ≥ the value at index ⌊2n/3⌋ of the ascending
// list → 1.0, ≥ the value at ⌊n/3⌋ → 0.5, else 0.
export function rankSweet(sugarConcs: readonly number[]): (sugarConc: number) => number {
  const ranked = [...sugarConcs].sort((a, b) => a - b);
  if (!ranked.length) return () => 0;
  const t1 = ranked[Math.floor(ranked.length / 3)];
  const t2 = ranked[Math.floor((2 * ranked.length) / 3)];
  return (c) => (c >= t2 ? 1.0 : c >= t1 ? 0.5 : 0.0);
}
