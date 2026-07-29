// Mixology knowledge base: every archetype carries its own spirit, ritual and vocabulary.

import type { ArchetypeId } from './archetypes';

export interface SpiritProfile {
  base: string;
  baseNote: string; // why this spirit, in the mixologist's voice
  zeroProof: string; // spirit-free substitution
  garnish: string;
  method: 'shaken' | 'stirred';
  adjectives: string[];
  nouns: string[];
}

export const SPIRITS: Record<ArchetypeId, SpiritProfile> = {
  Caregiver: {
    base: 'amber rum, aged in oak',
    baseNote: 'aged rum keeps its warmth even on ice, the way you keep yours',
    zeroProof: 'roasted barley & vanilla cordial',
    garnish: 'a ribbon of orange peel, pressed gently over the surface',
    method: 'stirred',
    adjectives: ['Gentle', 'Amber', 'Harbouring', 'Quiet', 'Velvet'],
    nouns: ['Hearth', 'Shelter', 'Lullaby', 'Embrace', 'Lantern'],
  },
  Creator: {
    base: 'genever, the painter’s gin',
    baseNote: 'genever is gin before the rules arrived: malt-rich, unfinished, full of possibility',
    zeroProof: 'juniper & malt botanical distillate',
    garnish: 'a single brushstroke of bitters across the foamless surface',
    method: 'shaken',
    adjectives: ['Unfinished', 'Inkstained', 'Original', 'Folded', 'Handmade'],
    nouns: ['Atelier', 'Sketch', 'Manuscript', 'Kiln', 'First Draft'],
  },
  Explorer: {
    base: 'mezcal joven, smoke from another valley',
    baseNote: 'mezcal tastes of distance: agave roasted in earth pits far from any map you own',
    zeroProof: 'smoked lapsang souchong infusion',
    garnish: 'a salted grapefruit twist, like a coastline',
    method: 'shaken',
    adjectives: ['Wandering', 'Smoked', 'Borderless', 'Feral', 'Northbound'],
    nouns: ['Cartographer', 'Horizon', 'Expedition', 'Compass', 'Frontier'],
  },
  Hero: {
    base: 'small-batch bourbon',
    baseNote: 'bourbon is courage you can pour: charred oak, high proof, no apologies',
    zeroProof: 'toasted oak & maple infusion',
    garnish: 'a flamed orange coin, scorched at the edge',
    method: 'stirred',
    adjectives: ['Burnished', 'Undefeated', 'Iron', 'Dawnlit', 'Steadfast'],
    nouns: ['Standard-Bearer', 'Vanguard', 'Anthem', 'Summit', 'Last Stand'],
  },
  Innocent: {
    base: 'elderflower-kissed dry gin',
    baseNote: 'gin and elderflower: the taste of a garden before anyone told it about winter',
    zeroProof: 'elderflower & white tea cordial',
    garnish: 'a single edible blossom, floating',
    method: 'shaken',
    adjectives: ['First', 'Unclouded', 'Morning', 'Paper-White', 'Featherlight'],
    nouns: ['Daybreak', 'Meadow', 'Promise', 'Snowmelt', 'Open Window'],
  },
  Jester: {
    base: 'blanco tequila, bright as a punchline',
    baseNote: 'blanco tequila refuses to be serious: green, peppery, grinning',
    zeroProof: 'verjus with green peppercorn',
    garnish: 'a chili-salt rim on one half of the glass only; the joke is yours',
    method: 'shaken',
    adjectives: ['Laughing', 'Sideways', 'Confetti', 'Electric', 'Mischief'],
    nouns: ['Punchline', 'Carnival', 'Wink', 'Firecracker', 'Encore'],
  },
  Lover: {
    base: 'cognac, warmed by the hand',
    baseNote: 'cognac doesn’t speak first: it waits, opens slowly, and stays on the lips',
    zeroProof: 'black grape & rose reduction',
    garnish: 'a rose petal and two drops of orange blossom water',
    method: 'stirred',
    adjectives: ['Crimson', 'Whispered', 'Silk', 'Candlelit', 'Devoted'],
    nouns: ['Letter', 'Serenade', 'Pulse', 'Perfume', 'Slow Dance'],
  },
  Magician: {
    base: 'dry gin through an absinthe-rinsed glass',
    baseNote: 'absinthe is the oldest trick in the book: one rinse and the whole drink changes its nature',
    zeroProof: 'star anise & butterfly-pea infusion that shifts colour with citrus',
    garnish: 'a mist of absinthe set briefly alight, then extinguished',
    method: 'stirred',
    adjectives: ['Midnight', 'Quicksilver', 'Gilded', 'Hidden', 'Twice-Turned'],
    nouns: ['Alchemist', 'Eclipse', 'Veil', 'Séance', 'Sleight of Hand'],
  },
  Outlaw: {
    base: 'rye whiskey, straight from the shadow of the law',
    baseNote: 'rye bites first and explains later: spice with a record',
    zeroProof: 'charred chili & black tea infusion',
    garnish: 'a charred rosemary sprig, still smoking',
    method: 'stirred',
    adjectives: ['Stolen', 'Black-Market', 'Unrepentant', 'Burnt', 'Lawless'],
    nouns: ['Heretic', 'Getaway', 'Manifesto', 'Wildfire', 'Jailbreak'],
  },
  'Regular Guy': {
    base: 'craft vodka, honest and clear',
    baseNote: 'vodka doesn’t posture: it lets every other ingredient tell the truth',
    zeroProof: 'cucumber & mineral water base',
    garnish: 'a thick wedge of lime, the kind a friend would cut',
    method: 'shaken',
    adjectives: ['Honest', 'Sunday', 'Neighbourly', 'Open-Door', 'Plainspoken'],
    nouns: ['Front Porch', 'Local', 'Handshake', 'Kitchen Table', 'Regular'],
  },
  Ruler: {
    base: 'Japanese single malt whisky',
    baseNote: 'Japanese whisky is order distilled: precision in every drop, authority without a raised voice',
    zeroProof: 'oolong & sandalwood infusion',
    garnish: 'one perfect, clear ice sphere: carved, not cracked',
    method: 'stirred',
    adjectives: ['Sovereign', 'Obsidian', 'Measured', 'Crowned', 'Imperial'],
    nouns: ['Edict', 'Throne', 'Meridian', 'Signet', 'Court'],
  },
  Sage: {
    base: 'single malt scotch, older than the question',
    baseNote: 'old scotch has read everything: peat, salt, and patience in the same sentence',
    zeroProof: 'smoked rooibos & fig infusion',
    garnish: 'a drop of ten-year sherry floated on top, like a marginal note',
    method: 'stirred',
    adjectives: ['Annotated', 'Candleworn', 'Patient', 'Archival', 'Lucid'],
    nouns: ['Library', 'Axiom', 'Almanac', 'Observatory', 'Last Word'],
  },
};

export interface FlavorMod {
  ingredient: string;
  amount: string;
  zeroProofSwap?: string;
  note: string;
}

export const FLAVOR_MODS: Record<string, FlavorMod> = {
  Sweet: {
    ingredient: 'wildflower honey syrup',
    amount: '15 ml',
    note: 'sweetness, but the kind with a backbone',
  },
  Bitter: {
    ingredient: 'Italian red bitter liqueur',
    amount: '15 ml',
    zeroProofSwap: 'grapefruit & gentian cordial',
    note: 'a noble bitterness: it asks you to stay a moment longer',
  },
  Spicy: {
    ingredient: 'ginger & bird’s-eye chili cordial',
    amount: '10 ml',
    note: 'heat that arrives late, like a good story’s twist',
  },
  Herbal: {
    ingredient: 'green Chartreuse',
    amount: '10 ml',
    zeroProofSwap: 'fresh basil & thyme, lightly bruised',
    note: 'one hundred and thirty herbs keeping a secret',
  },
  Fruity: {
    ingredient: 'white peach purée',
    amount: '20 ml',
    note: 'orchard fruit at the exact day of ripeness',
  },
  Citrusy: {
    ingredient: 'yuzu juice',
    amount: '15 ml',
    note: 'yuzu, citrus that learned calligraphy',
  },
  Fresh: {
    ingredient: 'cucumber ribbons & torn mint',
    amount: 'a generous handful',
    note: 'cold stream water, remembered',
  },
  Floral: {
    ingredient: 'elderflower liqueur',
    amount: '15 ml',
    zeroProofSwap: 'elderflower cordial, lightly diluted',
    note: 'a whole garden folded into one glass',
  },
  Smoky: {
    ingredient: 'mezcal, rinsed through the glass',
    amount: '5 ml',
    zeroProofSwap: 'lapsang souchong tea reduction',
    note: 'a ghost of campfire that never quite leaves',
  },
};

// Hue buckets for naming the user's representative colour.
export const COLOR_NAMES: { maxHue: number; name: string }[] = [
  { maxHue: 14, name: 'vermilion' },
  { maxHue: 38, name: 'ember orange' },
  { maxHue: 55, name: 'gold-leaf yellow' },
  { maxHue: 80, name: 'young bamboo green' },
  { maxHue: 150, name: 'deep jade' },
  { maxHue: 195, name: 'teal of still water' },
  { maxHue: 230, name: 'indigo' },
  { maxHue: 265, name: 'twilight violet' },
  { maxHue: 300, name: 'plum-blossom purple' },
  { maxHue: 335, name: 'rose madder' },
  { maxHue: 360, name: 'crimson' },
];
