// Quantity differences between the dossier's recipe (the guest's) and the
// spec (the Mixologist's balance model). Informative only: their units
// legitimately differ, so this never fails the import.
//
// Both sides are compared in ml, using the ingredient table's stated units
// (dash = 0.8 ml, drop = 0.05 ml). A dossier range ("5–10 ml", "0-20 ml")
// matches any spec value inside it. Spec lines at 0 ml and the dilution
// keys (water, ice_water) are skipped. Batch recipes are not compared. Every
// line, on either side, that can't be compared is listed as "not compared".

import type { RecipeLine } from '../data/schema.ts';
import type { Spec } from './sources.ts';

const DASH_ML = 0.8;
const DROP_ML = 0.05;
const DILUTION_KEYS = new Set(['water', 'ice_water']);
const EPSILON = 1e-6;

const num = (n: number) => String(Number(n.toFixed(3)));
const value = (s: string) => Number(s.replace(',', '.'));
const NUMBER = String.raw`(\d+(?:[.,]\d+)?)`;
const RANGE_ML = new RegExp(String.raw`${NUMBER}\s*[–-]\s*${NUMBER}\s*ml\b`, 'i');
const POINT_ML = new RegExp(String.raw`${NUMBER}\s*ml\b`, 'i');
const DASHES = new RegExp(String.raw`${NUMBER}\s*dash(?:es)?\b`, 'i');
const DROPS = new RegExp(String.raw`${NUMBER}\s*drops?\b`, 'i');

type Range = { lo: number; hi: number };

function amountMl(text: string): Range | null {
  const range = RANGE_ML.exec(text);
  if (range) return { lo: value(range[1]), hi: value(range[2]) };
  const ml = POINT_ML.exec(text);
  if (ml) return { lo: value(ml[1]), hi: value(ml[1]) };
  const dash = DASHES.exec(text);
  if (dash) return { lo: value(dash[1]) * DASH_ML, hi: value(dash[1]) * DASH_ML };
  const drop = DROPS.exec(text);
  if (drop) return { lo: value(drop[1]) * DROP_ML, hi: value(drop[1]) * DROP_ML };
  return null;
}

// The amount cell first; failing that, an ml written in the item
// ("egg white (about 30 ml)").
function dossierMl(line: RecipeLine): Range | null {
  const fromAmount = amountMl(line.amount);
  if (fromAmount) return fromAmount;
  const inItem = POINT_ML.exec(line.item);
  return inItem ? { lo: value(inItem[1]), hi: value(inItem[1]) } : null;
}

const show = (r: Range) => (r.lo === r.hi ? `${num(r.lo)} ml` : `${num(r.lo)}–${num(r.hi)} ml`);

export function quantityDifferences(recipe: readonly RecipeLine[], spec: Spec, amountHeader = 'amount'): string[] {
  if (amountHeader.includes('batch')) return ['not compared: batch recipe'];
  const out: string[] = [];
  const notCompared: string[] = [];

  const dossier: { range: Range; label: string }[] = [];
  for (const line of recipe) {
    const label = `${line.amount} ${line.item}`.trim();
    const range = dossierMl(line);
    if (range) dossier.push({ range, label });
    else notCompared.push(`not compared: recipe "${label}"`);
  }

  const fromSpec: { ml: number; label: string }[] = [];
  for (const line of spec.ingredients) {
    if (DILUTION_KEYS.has(line.key)) continue;
    const ml =
      typeof line.ml === 'number'
        ? line.ml
        : typeof line.dashes === 'number'
          ? line.dashes * DASH_ML
          : typeof line.dash === 'number'
            ? line.dash * DASH_ML
            : typeof line.drops === 'number'
              ? line.drops * DROP_ML
              : null;
    if (ml === 0) continue;
    if (ml === null) {
      const { key, ...amount } = line;
      notCompared.push(`not compared: spec ${key} ${JSON.stringify(amount)}`);
      continue;
    }
    fromSpec.push({ ml, label: line.key });
  }

  // Exact points first, then ranges, so a range never takes a point's match.
  const unmatched = [...dossier];
  const inside = (r: Range, ml: number) => ml >= r.lo - EPSILON && ml <= r.hi + EPSILON;
  for (const s of fromSpec) {
    let i = unmatched.findIndex((d) => d.range.lo === d.range.hi && inside(d.range, s.ml));
    if (i < 0) i = unmatched.findIndex((d) => inside(d.range, s.ml));
    if (i >= 0) unmatched.splice(i, 1);
    else out.push(`quantity: spec ${s.label} = ${num(s.ml)} ml has no matching amount in the recipe`);
  }
  for (const d of unmatched) out.push(`quantity: recipe "${d.label}" (${show(d.range)}) has no matching spec amount`);
  return [...out, ...notCompared];
}
