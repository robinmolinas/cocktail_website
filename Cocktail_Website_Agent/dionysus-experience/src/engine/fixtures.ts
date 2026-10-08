// Two whole journeys, written in the shape TheDepths writes today (labels, a
// hex seed, pole words, allergies joined by ', '). Used by the engine tests
// and, in dev only, preloaded with `?fixture=dawn` / `?fixture=night` so a
// walkthrough can jump to H9 and seal a real journey's answers.

import type { Answers } from '../types';

const BLANK: Answers = {
  name: '',
  lens: null,
  answerStyle: null,
  childhood: null,
  city: '',
  age: '',
  gender: null,
  color: '#e8702a',
  colorName: '',
  colorTouched: false,
  gravity: {},
  selfScales: {},
  personality: null,
  interpersonal: null,
  workEthic: null,
  emotional: null,
  creativity: null,
  moodScales: {},
  texture: {},
  drawnToward: [],
  soughtFor: [],
  styles: [],
  flavors: [],
  drinkScales: {},
  allergies: '',
  insight: '',
};

export const JOURNEY_FIXTURES = {
  // a careful, grounded host: comfort and calm, belonging and peace
  dawn: {
    ...BLANK,
    name: 'Ada',
    lens: 'The real me',
    color: '#f2c24e',
    colorName: 'Galliano Gold',
    colorTouched: true,
    gravity: {
      'solitary-social': 72,
      'controlled-wild': 18,
      'classic-experimental': 22,
      'analytical-instinctive': 40,
      'grounded-dreamlike': 15,
    },
    texture: {
      'sharp-smooth': 'Smooth',
      'relaxed-excited': 'Relaxed',
      'halffull-halfempty': 'Half-full',
      control: 'In control',
      'quiet-loud': 'Quiet',
      risk: 'Risk averse',
      'bright-dark': 'Bright',
      'soft-rough': 'Soft',
      harmonic: 'Harmonic',
    },
    soughtFor: ['Comfort', 'Calm', 'Advice'],
    drawnToward: ['Belonging', 'Peace', 'Caring'],
    flavors: ['Sweet', 'Fruity'],
    allergies: '',
    insight: 'I keep the door open.',
  },
  // a restless night owl: chaos and courage, freedom and change
  night: {
    ...BLANK,
    name: 'Rafe',
    lens: 'The night version of me',
    color: '#5c2447',
    colorName: 'Cassis Plum',
    colorTouched: true,
    gravity: {
      'solitary-social': 35,
      'controlled-wild': 92,
      'classic-experimental': 88,
      'analytical-instinctive': 85,
      'grounded-dreamlike': 70,
    },
    texture: {
      'sharp-smooth': 'Sharp',
      'relaxed-excited': 'Excited',
      'halffull-halfempty': 'Half-empty',
      control: 'Out of control',
      'quiet-loud': 'Loud',
      risk: 'Risk taker',
      'bright-dark': 'Dark',
      'soft-rough': 'Rough',
      harmonic: 'Disharmonic',
    },
    soughtFor: ['A little chaos', 'Courage', 'Honesty'],
    drawnToward: ['Freedom', 'Change', 'Wonder'],
    flavors: ['Bitter', 'Smoky', 'Spicy'],
    allergies: 'Dairy, Egg whites',
    insight: 'I leave before the lights come up.',
  },
} satisfies Record<string, Answers>;

export type JourneyFixture = keyof typeof JOURNEY_FIXTURES;

export const isJourneyFixture = (key: string | null): key is JourneyFixture =>
  key !== null && Object.hasOwn(JOURNEY_FIXTURES, key);
