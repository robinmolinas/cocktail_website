// The 19 questions of the Dionysus rite, organised across six chapters.

export interface ScaleDef {
  id: string;
  left: string;
  right: string;
}

export const ANSWER_STYLES = [
  'From the perspective of an extraterrestrial alien',
  'As honest as possible about myself',
  'To become my dream alter ego',
  'To impersonate my favourite character',
  'To challenge your system',
  'From the perspective of one of my multiple personalities',
];

export const CHILDHOOD_SETTINGS = [
  'Countryside',
  'Small town',
  'City',
  'Metropolis',
  'Suburbs',
  'Various',
];

export const GENDERS = [
  'Male',
  'Female',
  'Transgender',
  'Non-binary',
  'Prefer not to respond',
];

export const SELF_SCALES: ScaleDef[] = [
  { id: 'caring', left: 'Self-centered', right: 'Caring' },
  { id: 'leader', left: 'Follower', right: 'Leader' },
  { id: 'fighter', left: 'Evader', right: 'Fighter' },
  { id: 'participant', left: 'Observer', right: 'Participant' },
  { id: 'disruptor', left: 'Preserver', right: 'Disruptor' },
  { id: 'dreamist', left: 'Realist', right: 'Dreamist' },
  { id: 'intuitive', left: 'Analytical', right: 'Intuitive' },
  { id: 'anticonsumerist', left: 'Consumerist', right: 'Anti-consumerist' },
  { id: 'theoretical', left: 'Practical', right: 'Theoretical' },
  { id: 'energetic', left: 'Lazy', right: 'Energetic' },
  { id: 'night', left: 'Day', right: 'Night' },
  { id: 'social', left: 'Loner', right: 'Social' },
  { id: 'heavy', left: 'Light', right: 'Heavy' },
  { id: 'sophisticated', left: 'Simple', right: 'Sophisticated' },
];

export const PERSONALITY_TRAITS = [
  'Is talkative',
  'Is reserved',
  'Tends to be quiet',
  'Is sometimes shy',
  'Is outgoing, sociable',
];

export const INTERPERSONAL_TRAITS = [
  'Is sometimes rude',
  'Starts quarrels',
  'Has a forgiving nature',
  'Is generally trusting',
  'Finds faults in others',
];

export const WORK_TRAITS = [
  'Does a thorough job',
  'Is reliable',
  'Perseveres',
  'Follows plans',
  'Is easily distracted',
];

export const EMOTIONAL_TRAITS = [
  'Relaxed',
  'Worries a lot',
  'Emotionally stable',
  'Calm under stress',
  'Gets nervous easily',
];

export const CREATIVITY_TRAITS = [
  'Original',
  'Curious',
  'Deep thinker',
  'Inventive',
  'Values aesthetics',
];

export const MOOD_SCALES: ScaleDef[] = [
  { id: 'smooth', left: 'Sharp', right: 'Smooth' },
  { id: 'excited', left: 'Relaxed', right: 'Excited' },
  { id: 'negative', left: 'Positive', right: 'Negative' },
  { id: 'outofcontrol', left: 'In control', right: 'Out of control' },
  { id: 'loud', left: 'Quiet', right: 'Loud' },
  { id: 'risktaker', left: 'Risk averse', right: 'Risk taker' },
  { id: 'dark', left: 'Bright', right: 'Dark' },
  { id: 'rough', left: 'Soft', right: 'Rough' },
  { id: 'disharmonic', left: 'Harmonic', right: 'Disharmonic' },
];

export const STYLE_OPTIONS = [
  'Business',
  'Hipster',
  'Preppy',
  'Classic',
  'Sexy',
  'Casual',
  'Sporty',
  'Urban',
  'Trendy',
  'Rocker',
  'Bohemian',
  'Hippie',
  'Punk',
  'Tomboy',
  'Vintage',
  'Artsy',
];

export const FREQUENCY_OPTIONS = [
  'Never',
  'Rarely',
  'Sometimes',
  'Frequently',
  'Exclusively',
];

export const FLAVOR_OPTIONS = [
  'Sweet',
  'Bitter',
  'Spicy',
  'Herbal',
  'Fruity',
  'Citrusy',
  'Fresh',
];

export const DRINK_SCALES: ScaleDef[] = [
  { id: 'drinkNight', left: 'Day', right: 'Night' },
  { id: 'complex', left: 'Simple', right: 'Complex' },
  { id: 'modern', left: 'Classic', right: 'Modern' },
  { id: 'long', left: 'Short', right: 'Long' },
  { id: 'carbonated', left: 'Still', right: 'Carbonated' },
];

export const KANJI_NUMERALS = ['一', '二', '三', '四', '五', '六'];
export const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export const CHAPTER_TITLES = [
  { title: 'The Mask You Choose', sub: 'Every reading begins with how you wish to be read.' },
  { title: 'The Shape of the Vessel', sub: 'The facts of you, before the ink moves.' },
  { title: 'Fourteen Waters', sub: 'Let each stroke rest where it feels true. There are no numbers here.' },
  { title: 'The Company You Keep', sub: 'How you move among others, in their words and yours.' },
  { title: 'The Inner Weather', sub: 'Storms, stillness, and the colours in between.' },
  { title: 'The Taste of You', sub: 'Finally, the appetites. Tell us what the glass should hold.' },
];
