// The store validator: the content gate and the AD-4 veto floors, over the
// committed data in shared/data/ (the deployed app never sees the dossiers).
// Pure: returns the problems; an empty list means the store passes.

import { ALL_PAIRINGS, isPairingKey } from './pairing';
import { AuthoredPourSchema, CatalogueEntrySchema } from './data/schema';

// AD-4: every veto combination must still yield a full shortlist.
export const DEV_VETO_FREE_FLOOR = 3;
export const STRICT_VETO_FREE_FLOOR = 12;

export type ValidateOptions = { strict: boolean };

const pairingOf = (value: unknown): string | undefined =>
  value && typeof value === 'object' && typeof (value as { pairing?: unknown }).pairing === 'string'
    ? (value as { pairing: string }).pairing
    : undefined;

export function validateCatalogue(entries: readonly unknown[], pours: readonly unknown[], { strict }: ValidateOptions): string[] {
  const problems: string[] = [];
  const issues = (label: string, list: readonly { path: PropertyKey[]; message: string }[]) =>
    list.forEach((issue) => problems.push(`${label}: ${issue.path.map(String).join('.') || '(root)'}: ${issue.message}`));

  const entryByKey = new Map<string, unknown>();
  entries.forEach((entry, i) => {
    const key = pairingOf(entry);
    const label = `catalogue[${i}]${key ? ` (${key})` : ''}`;
    if (key === undefined) problems.push(`${label}: no pairing`);
    else if (!isPairingKey(key)) problems.push(`${label}: unknown pairing key "${key}"`);
    else if (entryByKey.has(key)) problems.push(`${label}: duplicate pairing`);
    else entryByKey.set(key, entry);
    const parsed = CatalogueEntrySchema.safeParse(entry);
    if (!parsed.success) issues(label, parsed.error.issues);
  });

  const pourByKey = new Map<string, unknown>();
  pours.forEach((pour, i) => {
    const key = pairingOf(pour);
    const label = `pour ${key ?? `#${i}`}`;
    if (key === undefined) problems.push(`${label}: no pairing`);
    else if (!isPairingKey(key)) problems.push(`${label}: unknown pairing key "${key}"`);
    else if (pourByKey.has(key)) problems.push(`${label}: duplicate pairing`);
    else pourByKey.set(key, pour);
    const parsed = AuthoredPourSchema.safeParse(pour);
    if (!parsed.success) issues(label, parsed.error.issues);
  });

  for (const [key, entry] of entryByKey) {
    const pour = pourByKey.get(key);
    if (!pour) {
      problems.push(`catalogue entry ${key} has no pour`);
      continue;
    }
    const e = CatalogueEntrySchema.safeParse(entry);
    const p = AuthoredPourSchema.safeParse(pour);
    if (e.success && p.success) {
      if (e.data.status !== p.data.status) problems.push(`${key}: catalogue status "${e.data.status}" ≠ pour status "${p.data.status}"`);
      if (JSON.stringify(e.data.contains) !== JSON.stringify(p.data.cocktail.contains)) {
        problems.push(`${key}: catalogue contains ${JSON.stringify(e.data.contains)} ≠ pour contains ${JSON.stringify(p.data.cocktail.contains)}`);
      }
    }
  }
  for (const key of pourByKey.keys()) {
    if (!entryByKey.has(key)) problems.push(`pour ${key} has no catalogue entry`);
  }

  const vetoFree = [...entryByKey.values()].filter((entry) => {
    const parsed = CatalogueEntrySchema.safeParse(entry);
    return parsed.success && parsed.data.contains.length === 0;
  }).length;
  if (vetoFree < DEV_VETO_FREE_FLOOR) {
    problems.push(`floor: ${vetoFree} veto-free authored pours, need ≥${DEV_VETO_FREE_FLOOR} (AD-4)`);
  }
  if (strict) {
    const missing = ALL_PAIRINGS.filter((key) => !entryByKey.has(key) || !pourByKey.has(key));
    if (missing.length) problems.push(`strict floor: ${ALL_PAIRINGS.length - missing.length}/132 pairings authored; missing ${missing.join(', ')}`);
    if (vetoFree < STRICT_VETO_FREE_FLOOR) {
      problems.push(`strict floor: ${vetoFree} veto-free authored pours, need ≥${STRICT_VETO_FREE_FLOOR} (AD-4, STRICT_STORE=1)`);
    }
  }
  return problems;
}
