// A fixed distillation used only by the dev-nav previews of H10 (the reading),
// so the arrival can be replayed without walking the questionnaire each time.
//
// This is no longer a sketch. The copy below is the authoring studio's approved
// creator-hero pour, verbatim, from design-artifacts/pours/creator-hero.md
// (status: approved, Robin 2026-09-25). It is the one pairing that is both an
// approved pour and an approved pilot image
// (design-artifacts/persona-image-system.md §9), so the scene the reading opens
// on was generated from this pour: the Ramos fizz with its standing foam, the
// worked shaker, the recipe on the brass clip, the 1925 newspaper.
//
// Keep it in sync with that file, and keep primary/secondary on Creator × Hero
// or the reading will open on a scene built for a different drink.
import type { CocktailResult } from '../types';

/** The Visionary (Creator × Hero), "Down the Line" — the approved pour. */
export const VISIONARY_SAMPLE: CocktailResult = {
  cocktailName: 'Down the Line',
  archetypeName: 'The Visionary',
  // lowercase, so the reading's subtitle reads "The Visionary, an iconic
  // vision..." — the archetype's own essence (data/archetypes.ts), trimmed
  archetypeEssence: 'an iconic vision, followed through to the end',
  archetypeStory:
    'Like the giant, not finished, Sagrada Familia, the Visionary has a dream that transcends the ordinary. Their pursuit of an iconic vision drives them, and even though the end may seem far away, their belief never wavers. The Visionary sees beyond what others can imagine and strives to bring that vision into existence, creating monumental works that stand the test of time.',
  primary: 'Creator',
  secondary: 'Hero',
  tagline: 'The dream is yours. Everyone else is building on it.',
  glassware: 'tall glass (a highball or Collins glass), no ice',
  flavorArc: 'citrus and cream shaken into a snowy white cloud, lifted with soda',
  colorName: 'Galliano Gold',
  zeroProof: false,
  ingredients: [
    { amount: '60 ml', item: 'London dry gin' },
    { amount: '15 ml', item: 'fresh lemon juice' },
    { amount: '15 ml', item: 'fresh lime juice' },
    { amount: '30 ml', item: 'simple syrup (sugar and water, 1:1)' },
    { amount: '30 ml', item: 'heavy cream' },
    { amount: '1', item: 'egg white (about 30 ml)' },
    { amount: '3 drops', item: 'orange flower water', note: 'as written in the recipe he gave away' },
    { amount: '60 ml', item: 'soda water, very cold' },
  ],
  procedure: [
    'Put a tall glass in the freezer.',
    'Pour the gin, both juices, the syrup, the cream and the orange flower water into a shaker. Add the egg white last.',
    'Close the shaker and shake it hard with no ice for about fifteen seconds, until it froths.',
    'Fill it with ice and shake hard for five minutes. That\'s longer than you\'ll want to. If someone is with you, hand them the shaker halfway, and don\'t let it stop.',
    'Strain it into the cold glass through a small sieve. No ice in the glass.',
    'Pour in the soda slowly, a little at a time, tapping the base of the glass on the table now and then, until a firm white cap of foam stands on top.',
    'No garnish. Serve it while the foam stands.',
  ],
  // [0] is the epigraph; then whoYouAre, then the five authored `yours`
  // paragraphs in their locked order. The pour's closing line is `closingLine`.
  whyYou: [
    'Anyone can have the recipe. The foam has to be earned.',
    'You see the finished thing first. Long before anyone else can, you can describe it: its size, its shape, what it will change. And you describe it so clearly that people want to help build it.',
    'What they don\'t see is the arithmetic you do alone: how far away the end is, what it will cost, whether you\'re the one slowing it down. Some nights you doubt the whole thing. You never do it out loud, because other people are building on your belief. What frightens you isn\'t that it won\'t get finished. It\'s that you\'ll make it smaller so it can be.',
    'In New Orleans, more than a hundred years ago, a saloonkeeper named Henry Ramos served a gin fizz unlike anyone else\'s: gin, lemon and lime, sugar, cream and egg white, shaken until the ice was gone and the drink had turned into a soft white cloud. It was slow to make. Then it became famous, which meant more of them, every one just as slow.',
    'The obvious thing would have been to shorten the shake. He didn\'t. He hired more hands instead. Beside each bartender stood one or two young Black men hired only to shake. By Mardi Gras in 1915 there were thirty-five men doing nothing but the shaking, each one working until his arms gave out, then passing the shaker down the line. The drink was never one man\'s work, and it couldn\'t have existed without theirs. And Ramos had always given the recipe away to anyone who asked. When Prohibition closed his bar, he went on giving it, and in 1925 he dictated it to a newspaper. He died three years later.',
    'I don\'t know why, but I like to think he knew what you know: the recipe was never the hard part. The hard part was refusing to make it smaller, and keeping it whole even when it needed more hands than he had. And when he couldn\'t carry it any further, he left it clear enough for other people to carry on. They still are. A century later, bartenders are still inventing ways to reach his standard, and his formula still works.',
    'So this is his drink, made to his standard: gin, lemon and lime, a little sugar, cream, egg white, three drops of orange flower water as written in the recipe he gave away, and soda to finish. Bartenders today shake it once without ice, to build the foam, and then hard with ice for five minutes, far longer than anyone expects. The soda goes in slowly, until a white cap forms on top. If someone is with you, hand them the shaker halfway. It can\'t be made halfway. It can be handed on.',
    'So, a proposal. Think of the thing you\'ve been quietly trimming so that it fits: your time, your budget, other people\'s patience. Put it back to its real size, and write it down that way, not the version that sounds reasonable: clear enough that someone else could pick it up and carry on. Then give it to them. Things this size are never finished by one person. But someone has to hold out for the whole of it.',
  ],
  closingLine: 'Pass the shaker when your arms give out. Just don\'t let it stop.',
  agentLines: { psychologist: '', historian: '', mixologist: '', storyteller: '' },
};
