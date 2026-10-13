// The browser's intake record (story 1.6): what the journey writes, and the
// only place trace and diagnostics live.
//
// TheDepths writes Answers v3 ids straight into `answers`; `trace` (H7) and
// `diagnostics` (intake-contract.md §IntakeDiagnostics) sit beside them and
// never leave the browser. The wire request is a projection of `answers`
// alone (see ./intake.ts), so neither can reach it.
//
// Zod-free on purpose: App holds the record from the landing on, and the
// landing bundle must not carry zod. The strict parse lives in ./intake.ts,
// which only the lazily loaded reveal imports.

import {
  BINARIES,
  FLAVOURS,
  GRAVITIES,
  VETOES,
  canonicalWords,
  idFromLabel,
  type BinaryKey,
  type FlavourId,
  type GravityKey,
  type IntakeDiagnostics,
  type TextureDiagnostic,
  type Veto,
} from '../../shared/vocab';
import type { Answers } from '../../shared/answers';

/** Answers v3 without the version, as the journey writes it. `name` may be
 *  empty (a dev jump); the wire borrows a name for it. */
export type JourneyAnswers = Omit<Answers, 'v'>;

export type IntakeRecord = {
  answers: JourneyAnswers;
  /** H7 · the one confidence. Browser-only, never on the wire (AD-2). */
  trace: string;
  /** Browser-only, never on the wire, never scored. */
  diagnostics: IntakeDiagnostics;
};

/** A patch for the diagnostics: the texture and gravityMoved maps merge key by key. */
export type DiagnosticsPatch = {
  h4Mode?: IntakeDiagnostics['h4Mode'];
  example?: IntakeDiagnostics['example'];
  texture?: Partial<Record<BinaryKey, TextureDiagnostic>>;
  gravityMoved?: Partial<Record<GravityKey, boolean>>;
};

/** Every pair starts not presented and every mote untouched, so a sealed
 *  record always carries all nine texture entries and all five movements. */
export function emptyDiagnostics(): IntakeDiagnostics {
  return {
    h4Mode: 'timed',
    texture: Object.fromEntries(BINARIES.map(({ id }) => [id, { status: 'notPresented' } satisfies TextureDiagnostic])),
    example: 'notTouched',
    gravityMoved: Object.fromEntries(GRAVITIES.map(({ id }) => [id, false])),
  };
}

export function emptyRecord(): IntakeRecord {
  return {
    answers: {
      name: '',
      lens: null,
      seed: null,
      gravity: {},
      texture: {},
      drawnToward: [],
      soughtFor: [],
      flavors: [],
      vetoes: [],
    },
    trace: '',
    diagnostics: emptyDiagnostics(),
  };
}

// ── Write helpers: what TheDepths hands the record ───────────────────────────
// Tap, carry and pop order are decorative and never captured: every list is
// stored in vocabulary order, so the strict wire parse accepts it.

/** H5's sealed labels → ids, in vocabulary order, at most MAX_WORDS. Unknown labels are dropped. */
export const labelsToIds = <V extends readonly { id: string; label: string }[]>(vocab: V, labels: readonly string[]): V[number]['id'][] =>
  canonicalWords(vocab, labels.map((label) => idFromLabel(vocab, label)).filter((id): id is V[number]['id'] => id !== null));

/** H6 flavours, caught in any order → vocabulary order, at most MAX_WORDS. */
export const flavoursInOrder = (chosen: readonly FlavourId[]): FlavourId[] => canonicalWords(FLAVOURS, chosen);

/** H6 vetoes may all be chosen (no MAX_WORDS cap): unique, in vocabulary order. */
export const vetoesInOrder = (chosen: readonly Veto[]): Veto[] =>
  VETOES.filter(({ id }) => chosen.includes(id)).map(({ id }) => id);

export function mergeDiagnostics(prev: IntakeDiagnostics, patch: DiagnosticsPatch): IntakeDiagnostics {
  return {
    h4Mode: patch.h4Mode ?? prev.h4Mode,
    example: patch.example ?? prev.example,
    texture: { ...prev.texture, ...patch.texture },
    gravityMoved: { ...prev.gravityMoved, ...patch.gravityMoved },
  };
}
