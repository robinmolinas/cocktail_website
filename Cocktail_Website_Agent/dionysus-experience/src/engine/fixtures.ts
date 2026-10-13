// Two whole journeys, written in the shape TheDepths writes (1.6): Answers v3
// ids, word lists in vocabulary order, the trace and the diagnostics beside
// them. Used by the engine tests and, in dev only, preloaded with
// `?fixture=dawn` / `?fixture=night` so a walkthrough can jump to H9 and seal
// a real journey's answers.

import { emptyDiagnostics, type IntakeRecord } from './record';

export const JOURNEY_FIXTURES = {
  // a careful, grounded host: comfort and calm, belonging and peace
  dawn: {
    answers: {
      name: 'Ada',
      lens: 'real',
      seed: 'galliano-gold',
      gravity: {
        'solitary-social': 72,
        'controlled-wild': 18,
        'classic-experimental': 22,
        'analytical-instinctive': 40,
        'grounded-dreamlike': 15,
      },
      texture: {
        'sharp-smooth': 'b',
        'relaxed-excited': 'a',
        'halffull-halfempty': 'a',
        control: 'a',
        'quiet-loud': 'a',
        risk: 'a',
        'bright-dark': 'a',
        'soft-rough': 'a',
        harmonic: 'a',
      },
      soughtFor: ['advice', 'comfort', 'calm'],
      drawnToward: ['peace', 'belonging', 'caring'],
      flavors: ['sweet', 'fruity'],
      vetoes: [],
    },
    trace: 'I keep the door open.',
    diagnostics: emptyDiagnostics(),
  },
  // a restless night owl: chaos and courage, freedom and change
  night: {
    answers: {
      name: 'Rafe',
      lens: 'night',
      seed: 'cassis-plum',
      gravity: {
        'solitary-social': 35,
        'controlled-wild': 92,
        'classic-experimental': 88,
        'analytical-instinctive': 85,
        'grounded-dreamlike': 70,
      },
      texture: {
        'sharp-smooth': 'a',
        'relaxed-excited': 'b',
        'halffull-halfempty': 'b',
        control: 'b',
        'quiet-loud': 'b',
        risk: 'b',
        'bright-dark': 'b',
        'soft-rough': 'b',
        harmonic: 'b',
      },
      soughtFor: ['honesty', 'courage', 'little-chaos'],
      drawnToward: ['freedom', 'wonder', 'change'],
      flavors: ['bitter', 'spicy', 'smoky'],
      vetoes: ['egg-white', 'dairy'],
    },
    trace: 'I leave before the lights come up.',
    diagnostics: emptyDiagnostics(),
  },
} satisfies Record<string, IntakeRecord>;

export type JourneyFixture = keyof typeof JOURNEY_FIXTURES;

export const isJourneyFixture = (key: string | null): key is JourneyFixture =>
  key !== null && Object.hasOwn(JOURNEY_FIXTURES, key);
