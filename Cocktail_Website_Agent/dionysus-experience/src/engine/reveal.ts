// The browser's reveal (stories 1.5, 1.6): the journey's intake record → the
// selected authored pour.
//
// A thin wrap over the shared core. The request is projected from
// `record.answers` alone (toRevealRequest), so the trace and the diagnostics
// never reach selection. Selection is `selectShortlist` and the final choice
// is `boundedPick(shortlist, null)`, which is always shortlist[0] until the
// Bartender chooses within the shortlist (Epic 2). Assembly is
// `assembleReading` with no live copy, so `yours` is authored.
//
// This module pulls in the 1.5 MB authored registry, so App imports it lazily
// (on the way to the reveal or a gift), never from the landing bundle.

import type { SeedKey } from '../../shared/answers';
import { assembleReading, type Reading } from '../../shared/reading';
import { boundedPick, selectShortlist } from '../../shared/selection';
import { toRevealRequest, type IntakeRecord } from './intake';

export type { Reading };

/** The journey's reading. Throws when no authored pour can be selected or assembled. */
export function revealReading(record: IntakeRecord): Reading {
  const request = toRevealRequest(record);
  const pairing = boundedPick(selectShortlist(request), null);
  if (!pairing) throw new RangeError('No eligible authored pour');
  // the display name is hers as typed (trimmed); the wire's 'Guest' stays on the wire
  return assembleReading(pairing, null, record.answers.name.trim(), request.seed);
}

/** A reading for a known pairing (a gift link, a dev page). Throws on an unknown pairing. */
export function readingFor(pairing: string, name: string, seed: SeedKey | null): Reading {
  return assembleReading(pairing, null, name, seed);
}
