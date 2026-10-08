// Selection contract (AD-3, AD-4). Deterministic up to the shortlist; no RNG.
//
// Default scoring implements matching v1 over the supplied catalogue.

import type { RevealRequest, Veto } from '../answers';
import { comparePairingKeys, type PairingKey } from '../pairing';
import catalogue from '../data/catalogue.json';
import { CatalogueEntrySchema } from '../data/schema';
import { round9, scorePairing, scorePersona, type FlavourStrengths } from './scoring';

export const SHORTLIST_SIZE = 3;

// What selection needs from the store: which pairings are authored and what
// each cocktail contains. Only authored pairings are passed in.
export type EligibilityRecord = {
  pairing: PairingKey;
  contains: readonly Veto[];
  flavour?: FlavourStrengths;
};

export type ScoreFn = (req: RevealRequest, pairing: PairingKey) => number;

const productionCatalogue = CatalogueEntrySchema.array().parse(catalogue);

// Drop records whose cocktail contains any of the guest's vetoes, sort by
// score descending then pairingKey ascending, take the top 3. Fewer than 3
// eligible → whatever exists; the pool floor is the store validator's job.
export function selectShortlist(
  req: RevealRequest,
  records: readonly EligibilityRecord[] = productionCatalogue,
  score?: ScoreFn,
): PairingKey[] {
  const vetoes = new Set<Veto>(req.vetoes);
  const persona = score === undefined ? scorePersona(req) : undefined;
  return records
    .filter((record) => !record.contains.some((item) => vetoes.has(item)))
    .map((record) => ({
      pairing: record.pairing,
      score: round9(score === undefined
        ? scorePairing(persona!, record.pairing, req.flavors, record.flavour)
        : score(req, record.pairing)),
    }))
    .sort((a, b) => b.score - a.score || comparePairingKeys(a.pairing, b.pairing))
    .slice(0, SHORTLIST_SIZE)
    .map((entry) => entry.pairing);
}

// The Bartender's bounded final choice: anything outside the shortlist means
// shortlist[0]. An empty shortlist → null.
export function boundedPick(shortlist: readonly PairingKey[], pick: unknown): PairingKey | null {
  const chosen = shortlist.find((pairing) => pairing === pick);
  return chosen ?? shortlist[0] ?? null;
}
