// The build's freshness step (`--check --if-sources`) separates drift that
// changes what a guest can be served safely from drift that is only newer
// copy. The Pour Studio edits dossier wording all the time, so copy drift
// must not break every build; a changed `contains`, status or set of
// pairings must.

import type { CatalogueEntry } from '../data/schema.ts';
import { stableJson } from './emit.ts';

export type Drift = {
  // Selection- or safety-relevant: fail the build.
  safety: string[];
  // Pairings whose flavour strengths changed (informative).
  flavour: string[];
};

type Comparable = { pairing: string; status?: unknown; contains?: unknown; flavour?: unknown };

export function classifyDrift(committed: unknown, regenerated: readonly CatalogueEntry[]): Drift {
  if (!Array.isArray(committed)) return { safety: ['committed catalogue.json is missing or not an array'], flavour: [] };
  const before = new Map<string, Comparable>();
  for (const entry of committed as Comparable[]) {
    if (entry && typeof entry.pairing === 'string') before.set(entry.pairing, entry);
  }
  const after = new Map<string, CatalogueEntry>(regenerated.map((e) => [e.pairing, e]));
  const safety: string[] = [];
  const flavour: string[] = [];
  const same = (a: unknown, b: unknown) => stableJson(a) === stableJson(b);

  for (const key of before.keys()) if (!after.has(key)) safety.push(`${key}: removed from the store`);
  for (const [key, now] of after) {
    const was = before.get(key);
    if (!was) {
      safety.push(`${key}: new in the store`);
      continue;
    }
    if (!same(was.contains, now.contains)) safety.push(`${key}: contains ${JSON.stringify(was.contains)} → ${JSON.stringify(now.contains)}`);
    if (!same(was.status, now.status)) safety.push(`${key}: status ${JSON.stringify(was.status)} → ${JSON.stringify(now.status)}`);
    if (!same(was.flavour, now.flavour)) flavour.push(key);
  }
  return { safety, flavour };
}
