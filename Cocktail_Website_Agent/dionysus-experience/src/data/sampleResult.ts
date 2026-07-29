// A fixed distillation used only by the dev-nav previews of H10 (the reading),
// so the arrival can be replayed without walking the questionnaire each time.
import type { CocktailResult } from '../types';

/** The Connoisseur (Sage × Lover), "The Annotated Serenade". */
export const CONNOISSEUR_SAMPLE: CocktailResult = {
  cocktailName: 'The Annotated Serenade',
  archetypeName: 'The Connoisseur',
  archetypeEssence: 'a scientist of the senses',
  archetypeStory:
    'The Connoisseur studies pleasure with precision. They notice nuance, train perception, and turn taste into language, making the sensory world legible and richer.',
  primary: 'Sage',
  secondary: 'Lover',
  tagline: 'For the one who reads pleasure like a text.',
  glassware: 'Nick & Nora',
  flavorArc: 'garnet bitterness resolving into slow, sherried warmth',
  colorName: 'Campari Red',
  zeroProof: false,
  ingredients: [
    { amount: '50 ml', item: 'single malt scotch', note: 'older than the question' },
    { amount: '15 ml', item: 'ten-year oloroso sherry' },
    { amount: '10 ml', item: 'Campari', note: 'for the garnet' },
    { amount: '2 dashes', item: 'orange bitters' },
    { amount: 'garnish', item: 'a drop of ten-year sherry, floated on top like a marginal note' },
  ],
  procedure: [
    'Stir over a single clear block until the glass frosts and the aromas begin to separate.',
    'Strain into a chilled Nick & Nora.',
    'Float the sherry drop last; do not stir it in, and let it read as a note in the margin.',
    'Express an orange coin over the surface, then set it aside.',
  ],
  whyYou: [
    'You taste the world in footnotes.',
    'Where others drink, you annotate. A flavour is never just a flavour to you: it is a claim to be tested, a memory to be placed, a small argument won against the ordinary. You have trained your senses the way others train for a race, and the discipline shows: you know why a thing is excellent, not merely that it is.',
    'This pour is built the way you think: patient scotch that has read everything, a sherry note left deliberately unresolved, a garnet thread of bitterness so the sweetness has something to argue with. Sip it slowly. It was made to be understood, not finished.',
  ],
  agentLines: { psychologist: '', historian: '', mixologist: '', storyteller: '' },
};
