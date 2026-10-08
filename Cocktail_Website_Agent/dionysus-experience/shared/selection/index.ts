// Selection contract (AD-3, AD-4). Deterministic up to the shortlist; no RNG.
//
// 1.1 ships the contract with a stub score: every pairing scores 0, so the
// shortlist is the first 3 eligible pairings by key. 1.3 passes the authored
// scorer as `score`. Mirrors agent/matching/matching.py select_shortlist().

import type { RevealRequest, Veto } from '../answers';
import { comparePairingKeys, type PairingKey } from '../pairing';

export const SHORTLIST_SIZE = 3;

// What selection needs from the store: which pairings are authored and what
// each cocktail contains. Only authored pairings are passed in.
export type EligibilityRecord = {
  pairing: PairingKey;
  contains: readonly Veto[];
};

export type ScoreFn = (req: RevealRequest, pairing: PairingKey) => number;

const stubScore: ScoreFn = () => 0;

// Scores are compared rounded to 9 decimals, so float noise never decides.
const round9 = (score: number) => Math.round(score * 1e9) / 1e9;

// Drop records whose cocktail contains any of the guest's vetoes, sort by
// score descending then pairingKey ascending, take the top 3. Fewer than 3
// eligible → whatever exists; the pool floor is the store validator's job.
export function selectShortlist(
  req: RevealRequest,
  records: readonly EligibilityRecord[],
  score: ScoreFn = stubScore,
): PairingKey[] {
  const vetoes = new Set<Veto>(req.vetoes);
  return records
    .filter((record) => !record.contains.some((item) => vetoes.has(item)))
    .map((record) => ({ pairing: record.pairing, score: round9(score(req, record.pairing)) }))
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
