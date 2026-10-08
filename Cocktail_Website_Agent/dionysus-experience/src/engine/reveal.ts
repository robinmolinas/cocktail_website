// The browser's reveal (story 1.5): journey answers → the selected authored pour.
//
// A thin wrap over the shared core. Selection is `selectShortlist` and the
// final choice is `boundedPick(shortlist, null)`, which is always
// shortlist[0] until the Bartender chooses within the shortlist (Epic 2).
// Assembly is `assembleReading` with no live copy, so `yours` is authored.
//
// This module pulls in the 1.5 MB authored registry, so App imports it lazily
// (on the way to the reveal or a gift), never from the landing bundle.

import type { SeedKey } from '../../shared/answers';
import { assembleReading, type Reading } from '../../shared/reading';
import { boundedPick, selectShortlist } from '../../shared/selection';
import type { Answers as AppAnswers } from '../types';
import { toRevealRequest } from './intake';

export type { Reading };

/** The journey's reading. Throws when no authored pour can be selected or assembled. */
export function revealReading(app: AppAnswers): Reading {
  const request = toRevealRequest(app);
  const pairing = boundedPick(selectShortlist(request), null);
  if (!pairing) throw new RangeError('No eligible authored pour');
  // the display name is hers as typed (trimmed); the wire's 'Guest' stays on the wire
  return assembleReading(pairing, null, (app.name ?? '').trim(), request.seed);
}

/** A reading for a known pairing (a gift link, a dev page). Throws on an unknown pairing. */
export function readingFor(pairing: string, name: string, seed: SeedKey | null): Reading {
  return assembleReading(pairing, null, name, seed);
}

export { seedFromHex } from './intake';
