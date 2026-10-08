// Permanent pairing keys (AD-11). Key values are never renamed or removed.
//
// The archetype list mirrors `ArchetypeId` in src/data/archetypes.ts; it is
// re-declared here because shared/ never imports from src/ (the data file
// moves into shared/data/ in 1.7).

export const ARCHETYPES = [
  'Caregiver',
  'Creator',
  'Explorer',
  'Hero',
  'Innocent',
  'Jester',
  'Lover',
  'Magician',
  'Outlaw',
  'Regular Guy',
  'Ruler',
  'Sage',
] as const;

export type Archetype = (typeof ARCHETYPES)[number];

type Slug<S extends string> = S extends `${infer Head} ${infer Tail}` ? `${Lowercase<Head>}-${Slug<Tail>}` : Lowercase<S>;

export type ArchetypeSlug = Slug<Archetype>;
export type PairingKey = `${ArchetypeSlug}-${ArchetypeSlug}`;

export type Pairing = { primary: Archetype; secondary: Archetype };

const slug = <A extends Archetype>(archetype: A) => archetype.toLowerCase().replace(/ /g, '-') as Slug<A>;

// `pairingKey('Regular Guy', 'Sage')` → `'regular-guy-sage'`. An archetype
// never pairs with itself.
export function pairingKey(primary: Archetype, secondary: Archetype): PairingKey {
  if (primary === secondary) throw new RangeError(`An archetype never pairs with itself: ${primary}`);
  return `${slug(primary)}-${slug(secondary)}`;
}

// The inverse of pairingKey(). Anything that is not one of the 132 keys → null.
export function parsePairingKey(key: string): Pairing | null {
  for (const primary of ARCHETYPES) {
    const prefix = `${slug(primary)}-`;
    if (!key.startsWith(prefix)) continue;
    const rest = key.slice(prefix.length);
    const secondary = ARCHETYPES.find((a) => a !== primary && slug(a) === rest);
    if (secondary) return { primary, secondary };
  }
  return null;
}

export const isPairingKey = (key: string): key is PairingKey => parsePairingKey(key) !== null;

const byKey = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// All 132 ordered pairings, sorted by key ascending (the tie-break order).
export const ALL_PAIRINGS: readonly PairingKey[] = ARCHETYPES.flatMap((primary) =>
  ARCHETYPES.filter((secondary) => secondary !== primary).map((secondary) => pairingKey(primary, secondary)),
).sort(byKey);

export const comparePairingKeys = (a: PairingKey, b: PairingKey) => byKey(a, b);
