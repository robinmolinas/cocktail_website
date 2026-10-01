# Personality lint: Explorer → Sage (2026-09-30)

Source: `agent/data/Brand Personality + Roulette.xlsx`, BRANDING (12 archetypes) and PERSONALITY (132 pairings), read in full. `dionysus-experience/src/data/archetypes.ts` holds the same text (only the dashes are swapped), so every fix here has to land in both, and any rename also reaches the live site.

Scope: the 99 pairings with an Explorer, Hero, Innocent, Jester, Lover, Magician, Outlaw, Ruler or Sage primary. Regular Guy is human-written but still in the queue, so it gets a short section at the end.

## Resolution (2026-09-30): applied

Robin's decisions:
1. Rename while keeping the title (Noble King → Noble Ruler). Keep a name where a swap would lose the sense.
2. Keep the sensitive examples.
3. Rewrite the 99 stories to a world-class standard.

Applied to `agent/data/Brand Personality + Roulette.xlsx` (the XML was edited directly, so the embedded images survive) and to `dionysus-experience/src/data/archetypes.ts`. The originals are in Dionysus git HEAD (commit 03ad1f6). The `Cocktail_GPT/` copy has been synced to the same file.

**Renamed** (the old name → the new one):

- The Coloniser → **The Expedition Leader** (example: Avatar → Ernest Shackleton)
- The Fireman → **The Firefighter**
- The Noble King → **The Noble Ruler**
- The Fairy Godmother → **The Fairy Godparent**
- The Ingénue → **The Naïf**
- The Big Brother/Sister → **The Big Sibling**
- The Bad Boy/Grrl → **The Bad Influence**
- The Boy/Girl Next Door → **The One Next Door**
- The Virgin → **The Pure Heart**
- The Omnipotent God → **The Omnipotent One**
- Spelling only: The Savior → **The Saviour**, The Story Teller → **The Storyteller**, The Grand Master → **The Grandmaster**

**Kept**, because a swap would lose the sense:

- The Straight Man (option: *The Straight Face*)
- The Little Prince (a book title)
- **The Geisha** (Robin: keep; the story now presents geisha as the artists they are)
- The Knight in Shining Armour, The Sex Symbol, The Scandalmonger, The Tease, The Siren, The Wise Talker, The Spiritualist
- The Bumpkin and The Everyman (human family)

Robin approved *The Expedition Leader* and chose to keep *The Geisha* (2026-09-30).

**Examples corrected** only where the example was wrong or contradicted its personality:

- Richard → David Attenborough
- Shrek's Fairy Godmother → Cinderella's
- Shylock → the Fool in *King Lear* (Wise Fool)
- "Shyloch, Loki" → Loki
- "Troy" → Troy (Hector)
- "Sixtine" → Sistine Chapel
- "Roald Dahl's Gentle Giant" → Roald Dahl's BFG
- Name spellings: Gromit, Kaufman, Benigni, Teese, Russell, Stephen, McClane, Courtney, Marilyn, Geldof, Caribbean, 9/11

Every sensitive example stays.

**Descriptions**: typos and gendered wording fixed. One meaning change: the Quest Seeker is now "never held back by fear" instead of "never fearful".

**Stories**: all 99 rewritten. The rules followed:

- a person, not a brand promise
- the primary's want and fear, shaded by the secondary
- the example woven in where it lights the person up
- "they" throughout, and no archetype names
- British spelling, no em dashes
- 69–94 words
- no "Their X is Y:" formula; only 12 of 99 end on "Their fear is"

The three approved pours keep their anchors: the True Friend still has "the world feels kinder with them in it", the Connoisseur's fear is still being fooled, and the Trickster's "Nothing they do is an accident."

**BRANDING**: typos fixed; "He" removed (Explorer, Sage); Frigidity → Coldness; "2sc degree" → irony and tongue-in-cheek humour; "feeling well" → "feeling good".

**Not changed**:

- palette and imagery columns
- BRANDING Explorer "Cowardice" and "Bravery"
- the Caregiver, Creator and Regular Guy stories (human-written)
- *The Craftsman* (caregiver-creator, already poured; gendered, open for Robin)
- the Regular Guy examples flagged below (Joe the Plumber, *The Mechanic*, "Attentats de Londres")

The findings below are the lint as it stood **before** the fix.

## Verdict

**The structure is clean.** Every primary/secondary driver matches BRANDING, the four driver groups follow the standard Mark & Pearson quadrants, and each row's goal, fear and brands match its family.

**The writing isn't.** Only three families were written by a person: Caregiver, Creator and Regular Guy. Explorer is where the AI style starts: one Pantone swatch instead of three, and the formula below. The names, descriptions and examples in every family read like one human source (British idioms, French notes, the same typos). The AI wrote the Full Storytelling, the palette and the imagery.

| | Human rows (33) | AI rows (99) |
|---|---|---|
| Story ends on "Their *X* is *Y*: …" | 0 | 67 |
| Story brings in the row's own Example | 17 | 8 |
| Story mentions the primary fear | 2 | 6 |
| Story talks to "you", like an ad | 1 | 23 |
| Pantone swatches per row | 3 | 1 |

What this means for the pours:

1. **The stories describe a brand, not a person.** Lines like "Their promise is renewal: you will feel awake again" are ad copy. For `whoYouAre`, Wren needs the person's inner life: what they want, what they fear, what they hide. The AI rows almost never give her the fear, and the fear is where the "oh wow, that's me" moment comes from.
2. **Each family repeats one word.** 10 of 11 Innocent stories say "Their innocence is…", 9 of 11 Sage stories say "Their wisdom is…", and 8 Outlaw stories say rebellion or "outlaw energy". Inside a batch, the rooms will pick up that rhythm and the pours will sound alike.
3. **Stories and examples are disconnected.** The human rows open with the example ("Like Gepetto…"). The AI rows leave it out, and in about 12 cases the example contradicts the story (listed below).
4. **Primary and secondary sometimes swap places.** A few stories read as the reverse pairing, or leave out the primary motive completely (explorer-creator, explorer-sage, hero-lover, lover-ruler, outlaw-regular-guy).

## Tags

- **FIX**: wrong fact, an example that contradicts the personality, or something that would embarrass or hurt a guest. Fix before that pairing is poured.
- **DECIDE**: your call (names, sensitive examples). I give options.
- **SHARPEN**: the story misses the primary motive or fear, or blurs into a sibling. The room can make up for it, but a fixed row makes a better pour.
- **TYPO**: mechanical.

Suggested examples marked *(lead)* come from my memory. Hester has to source them before any of them goes into a pour.

---

## Explorer (goal Freedom · fear Entrapment): next in the queue

Family note: none of the 11 stories uses the fear of being trapped. That fear is the Explorer's engine: the job, the town, the version of themselves they're escaping.

- **explorer-caregiver · The Conservationist**
  - **FIX**: "Sir Richard Attenborough" was the actor and director, David's brother. The naturalist is **Sir David Attenborough**.
  - **TYPO**: "mankind" → "humankind".
  - **SHARPEN**: the story is all protection and has no freedom in it. The real tension is someone who needs to roam but can't roam without feeling responsible for what they find.
- **explorer-creator · The Innovator**
  - **SHARPEN**: this reads as Creator × Explorer. Innovation is the *Creator's* goal, and the story is "prototypes… progress… new systems". An Explorer-first inventor builds the new thing as a way out of the one that already exists.
  - **DECIDE**: Dyson appears in BRANDING as the Magician brand example, and this row overlaps the Experimentalist, Alchemist, Mad Inventor and Game-Changer (see the clusters below).
- **explorer-regular-guy · The Tourist**: mostly fine. "Tourist" can read as a mild put-down.
  - **SHARPEN**: the honest tension is adventure with a return ticket, exploring inside safe limits. That's the Regular Guy's need to belong pulling against the Explorer's pull outward.
- **explorer-hero · The Pioneer**
  - **FIX** (example vs story): the story and imagery are a frontier settler ("tents, rust, hands working in harsh conditions, self-reliant"). Neil Armstrong was one face of a team of about 400,000. Either change the story to "going first on behalf of everyone", which fits Armstrong's "one small step", or change the example.
  - Keep it clearly apart from the Trailblazer: the Pioneer goes first so others can follow, the Trailblazer goes first without permission.
- **explorer-innocent · The Discoverer**: fine. Newton's apple is a late anecdote and the apple on the head is a myth, which is Hester's territory. "Their promise is renewal: you will feel awake again" is ad voice.
- **explorer-jester · The Mad Inventor**
  - **TYPO**: "Grommit" → "Gromit".
  - Otherwise fine.
- **explorer-lover · The Sense Seeker**
  - **TYPO**: "Exploring the sense" → "senses".
  - **SHARPEN**: it's a near-twin of lover-explorer (Pleasure Seeker) and close to the Connoisseur. Draw the line by primary: the Sense Seeker feels free through the senses (new places reached through taste and texture); the Pleasure Seeker wants closeness *with people* through pleasure.
  - Nigel Slater is little known outside the UK.
- **explorer-magician · The Spiritualist**
  - **FIX**: *The Secret* is a law-of-attraction book about getting what you want, not a journey inward. It contradicts the story ("ritual, connection to something larger"). Better fits *(lead)*: Siddhartha (Hesse), the Beatles in Rishikesh, the Camino de Santiago, *Eat Pray Love*.
  - **DECIDE**: "Spiritualist" names a specific 19th-century movement that tried to talk to the dead through séances. The row means a spiritual seeker. Keep the name but tell the room, or rename it (The Seeker, The Pilgrim).
- **explorer-outlaw · The Trailblazer**
  - **FIX** (example vs story): the imagery is a road movie ("night drives, neon, desert highways, motion blur") and the story is "you do not need permission". Hillary was famously modest, and he and Tenzing agreed to say they reached the summit together. That isn't the Outlaw. Kerouac's *On the Road* *(lead)* matches the imagery exactly, or use *Easy Rider*.
- **explorer-ruler · The Coloniser**
  - **FIX**: the example contradicts the name. In *Avatar* the colonisers are the villains.
  - **FIX**: the story's hedge ("done well, their modern expression is ethical… expansion with consent") is the AI apologising for the name.
  - **DECIDE**: I strongly suggest a rename. No guest should read "you are The Coloniser". Explorer × Ruler is someone who discovers new ground and wants to give it order: they map it, lead the party and bring everyone home.
    - **The Cartographer**: maps the unknown.
    - **The Expedition Leader**: Shackleton *(lead)*, who led the *Endurance* crew and brought every one of them home. It also has a drink story: crates of Mackinlay's whisky from his 1907 Nimrod hut were found in the Antarctic ice and later recreated. Hester to verify.
- **explorer-sage · The Genius**
  - **SHARPEN**: it's almost the same as sage-explorer (The Philosopher) because the freedom motive is missing. Einstein is the right example for the right reason: he hated rote schooling and did his best thinking as a daydreaming patent clerk. For him the mind is where he's free. Make that the story.

## Hero (goal Mastery · fear Weakness)

Family note: the Hero's inner truth is fear overcome, not the absence of fear. Several rows say "never fearful" or "courage is their default setting". That's a poster, not a person.

- **hero-caregiver · The Savior**
  - **DECIDE**: Jesus as the example is religious, and the pour will be about alcohol. It also nudges the room toward water into wine. A non-religious option with the same arc *(lead)*: Sydney Carton in *A Tale of Two Cities* ("It is a far, far better thing I do"), a man who thought himself worthless and proves otherwise by giving himself up.
  - **SHARPEN**: the Hero's shadow here is the martyr who can't accept help, because needing help feels like weakness. Also keep it apart from caregiver-hero (The Rescuer): the Saviour is proving their worth, the Rescuer is serving.
  - **TYPO**: "selflessand" → "selfless and". The file is British elsewhere (Armour, humour), so "Saviour".
- **hero-creator · The Idealist**: fine. Nuance for the room: Dylan refused the "voice of a generation" role.
- **hero-regular-guy · The Fireman**
  - **DECIDE**: gendered name → **The Firefighter** (rule 12).
  - **TYPO**: "whould" → "would".
  - "911" should be "9/11 firefighters (FDNY)".
  - **SHARPEN**: the description ("anyone would have done the same") repeats regular-guy-hero (the Have-a-Go Hero). The Hero-first version is about *drilled* courage: they trained for this moment, and the crew is their family (that's the Regular Guy part).
- **hero-explorer · The Quest Seeker**
  - **SHARPEN**: "Never fearful" is wrong for Indiana Jones, who is afraid of snakes. Brave in spite of fear is the truer and better line.
- **hero-innocent · The Initiate**: good.
  - **TYPO**: "hteir" → "their".
- **hero-jester · The Story Teller**: good.
  - **TYPO**: "Storyteller" is one word.
  - Note for Hester: this is the one personality that *prefers* the legend to the fact, so apply the truth-versus-legend rule in its favour. In *Big Fish*, the tall tales turn out to be partly true.
- **hero-lover · The Dashing Hero**
  - **SHARPEN**: there's no Lover in the story. It's nerve, charm and style, but never who they're brave *for*.
  - **FIX** (example vs description): the description says "swashbuckling", and Bond isn't. A swashbuckler would be d'Artagnan or Errol Flynn *(lead)*.
  - If Bond stays: the Vesper is written into the book and named for the one woman he loved, which is very Lover. Kina Lillet no longer exists, though.
  - **DECIDE**: "always lands on his feet" is gendered.
- **hero-magician · The Superhero**
  - **SHARPEN**: the Magician part is transformation, which means Clark Kent. The double life (the ordinary self covering the extraordinary one) is the insight a guest will recognise. The story leaves it out.
- **hero-outlaw · The Lovable Rogue**: good.
  - **TYPO**: "Caribean" → "Caribbean". Name Jack Sparrow.
- **hero-ruler · The Warrior**
  - **FIX**: "Troy" is ambiguous. **Hector** is Hero × Ruler (the prince who defends his city out of duty). Achilles defies his king, which is Hero × Outlaw.
- **hero-sage · The Problem Solver**
  - **FIX**: Apple's Genius Bar is a retail help desk, and Apple is the BRANDING Magician brand. Fits for "calm under pressure, turns complexity into a path forward" *(lead)*: the Apollo 13 engineers who made a square CO₂ filter fit a round socket, or Alan Turing (but see sage-magician).

## Innocent (goal Safety · fear Punishment)

Family note: 10 of 11 stories end on "Their innocence is…". Also, the sheet makes the goal *Safety*; the classic Innocent (Pearson) wants happiness and goodness. Read with Safety, the pours will come out cautious. Tell Wren to read "fear of punishment" as **fear of getting it wrong and being blamed**, which is gentler, true, and something almost everyone recognises.

- **innocent-caregiver · The Big Brother/Sister**: good, and consistent (it's a child's care).
  - **DECIDE**: slash name, and "Big Brother" also calls up Orwell. **The Big Sibling**?
- **innocent-creator · The Naive Artist**
  - **FIX**: Gauguin is a poor fit for innocence, and ethically fraught today (his Tahiti "wives" were young girls). Dubuffet was a trained painter who *promoted* outsider art.
  - The textbook naïve painter is **Henri Rousseau** *(lead)*, "Le Douanier": a self-taught customs officer, laughed at, then honoured by Picasso at the 1908 Bateau-Lavoir banquet. It matches the story line for line.
  - **TYPO**: "form the outside" → "from".
- **innocent-regular-guy · The True Friend**: approved pour. Nothing to do.
- **innocent-explorer · The Free Spirit**
  - **FIX**: Burton's 2010 Alice is a sword-wielding 19-year-old, which is Hero. Carroll's original Alice is the Innocent Explorer.
- **innocent-hero · The Underdog**: good. *Forrest Gump* is an even better fit ("stumbles upon greatness without realising it" is Gump exactly), but he's taken by regular-guy-sage. See the end section.
- **innocent-jester · The Giggler**: good.
- **innocent-lover · The Teenage Heart-throb**
  - **FIX** (name vs description): the description is someone *feeling* first love. A heart-throb (Bieber) is someone *being adored*. Pick one.
  - For first love, *Moonrise Kingdom* *(lead)*. Keep it apart from lover-innocent (below): this one is the thrill of a first crush, that one is a lifelong simple love.
  - **DECIDE**: "Teenage" for adult guests.
- **innocent-magician · The Dreamer**: good.
  - **Echo alert**: "the world becomes kinder when someone refuses to stop imagining…" echoes the approved Four Shares tagline, "The world is kinder with you in it." Flag it for the motif check.
  - Nuance for the room: Dorothy's lesson is that home was enough all along, which is the Innocent's need for safety.
- **innocent-outlaw · The Outsider**
  - **FIX**: Christopher McCandless (*Into the Wild*) starved alone in Alaska in 1992. A pour would end up romanticising a death.
  - **Thoreau** *(lead)* is the textbook Innocent × Outlaw: two years at Walden Pond for a simple life, and a night in jail for refusing a tax.
- **innocent-ruler · The Little Prince**
  - **SHARPEN**: it's close to innocent-sage and sage-innocent (three "clear-eyed child" rows). The Ruler part is *responsibility for one's small world*: the rose, the baobabs pulled up every morning, "you become responsible forever for what you have tamed". Build the story on that.
  - **DECIDE**: gendered, but it's a title quote.
- **innocent-sage · The Wise Kid**: good. The difference from innocent-ruler is that this one *says* the true thing out loud.

## Jester (goal Pleasure · fear Boredom)

Family note (BRANDING): "using 2sc degree" is French *second degré*. In English: tongue-in-cheek, irony.

- **jester-caregiver · The Morale Booster**
  - **TYPO**: "feels others with happiness" → "fills".
  - **SHARPEN**: "Clown" is generic, and clowns scare a real share of people. Patch Adams *(lead)* is Jester × Caregiver exactly. Keep it apart from caregiver-jester (The Reassurer): this one *needs* the fun and shares it; the Reassurer cares first and jokes to help.
- **jester-creator · The Wacky One**
  - **FIX**: Popeye doesn't create anything (his thing is spinach and fists). Willy Wonka *(lead)* is the Jester × Creator: absurd inventions, fizzy lifting drinks.
- **jester-regular-guy · The Stand-up**: good.
- **jester-explorer · The Alternative Comic**: good.
  - **TYPO**: "Kaufmann" → "Kaufman".
- **jester-hero · The Wise Talker**
  - **TYPO**: "Lroberto Begnini… La Vita E Bella" → Roberto Benigni, *La vita è bella*.
  - **DECIDE**: "Wise Talker" isn't an English phrase. Was the source's word **Wisecracker**? That fits Benigni's Guido exactly.
  - Sensitivity: the film is set in a Holocaust camp. Brief the room.
- **jester-innocent · The Ingénue**
  - **FIX**: an ingénue is the theatre's innocent young *woman* (the feminine French form), and Mr Bean is petty and often mean. That contradicts "without ever being mean".
  - **Paddington** *(lead)* is the Jester × Innocent: wide-eyed, polite, causes chaos. And marmalade is a gift to Tomás.
  - **DECIDE**: gendered name. **The Naïf**?
- **jester-lover · The Tease**
  - **TYPO**: "Dita Von Tease" → Teese. "teaseyou" → "tease you".
  - **DECIDE**: tone of the name for guests.
- **jester-magician · The Elf/Imp**
  - **TYPO**: "mischivious" → "mischievous".
  - **SHARPEN**: Tim Tam is an Australian biscuit, and its famous ad was a *genie*, which is Magician × Creator. **Puck** *(lead)*: "Lord, what fools these mortals be!", and a love potion squeezed from a flower. Mischief with a potion.
- **jester-outlaw · The Scandalmonger**
  - **FIX**: in 2025 Russell Brand was charged in the UK with rape and sexual assault. He denies the charges. Replace him regardless of the outcome.
  - **FIX** (word): a scandalmonger *spreads gossip about others*. The description means a provocateur.
  - Options *(lead)*: Lenny Bruce, arrested for obscenity and pardoned after his death; Sacha Baron Cohen. Rename to **The Provocateur**?
- **jester-ruler · The Straight Man**
  - **FIX**: Laurel and Hardy are both comics. Classic straight men *(lead)*: Bud Abbott ("Who's on First?"), Ernie Wise, Dean Martin.
  - **DECIDE**: gendered, and "straight" can be misread. **The Straight Face**? **The Foil**?
- **jester-sage · The Cynic**
  - **FIX**: "Steven" → Stephen Colbert. He's a satirist, famously sincere, and his TV persona was a parody, so he isn't a cynic.
  - Keep the name and make it work with **Diogenes the Cynic** *(lead)*: lived in a jar, searched Athens with a lantern for one honest man, and told Alexander the Great to get out of his sunlight. That's Jester × Sage exactly, and it turns a negative label into a flattering one.

## Lover (goal Intimacy · fear Isolation)

Family note (BRANDING): the fear "Frigidity" is a dated, gendered clinical word; use **coldness**. "All about feeling well" is French *se sentir bien*; in English, "feeling good". BMW is an odd Lover brand, but brands don't drive pours.

- **lover-caregiver · The Geisha**
  - **FIX**: "serving to attend to your every need" repeats the Western mistake. Geisha are trained artists (dance, music, conversation), not servants.
  - **DECIDE**: I strongly suggest a rename. It's a gendered cultural label to hand any guest. Lover × Caregiver is love shown through attentive care, **The Host**. The perfect example is **Babette's Feast** *(lead)*: she spends her whole lottery win on one dinner for people who never knew who she was. The wines are named on screen.
- **lover-creator · The Muse**: fine. Deeper example *(lead)*: Lee Miller, Man Ray's muse, who became a war photographer.
- **lover-regular-guy · The Rough Diamond**: good. McClane's whole motive is getting back to Holly, so it's really Lover-first.
  - **TYPO**: "McLane" → "McClane".
- **lover-explorer · The Pleasure Seeker**
  - **SHARPEN**: Casanova ended his life as a lonely librarian in a Bohemian castle, writing it all down. That's the Lover's fear of isolation behind the banquet. Use it.
  - See explorer-lover for the split between the two.
- **lover-hero · The Knight in Shining Armour**
  - **DECIDE**: "gets the girl" → "wins the heart".
  - Otherwise good.
- **lover-innocent · The Virgin**
  - **DECIDE**: I strongly suggest a rename. It labels a guest's sexual history, and it's wrong on its own terms: Romeo and Juliet consummate their marriage (Act 3, Scene 5). **The Sweetheart**?
  - **FIX**: *Romeo & Juliet* is reckless young passion, not "pure, simple, untainted". Carl and Ellie in *Up* *(lead)*, the opening montage, is this personality exactly.
- **lover-jester · The Flirt**: good.
- **lover-magician · The Charmer**
  - **FIX**: Zorro is Hero × Outlaw. His mask is a disguise, not seduction.
  - **SHARPEN**: the story ("control… danger") reads as magician-lover (The Siren). The Lover-first Charmer's magic makes *you* feel seen. The best fit is *Like Water for Chocolate* *(lead)*, where Tita's feelings pass into her cooking and whoever eats it feels them. Or *Chocolat*. Both are food and drink hooks.
- **lover-outlaw · The Bad Boy/Grrl**
  - **TYPO**: "Courntey" → Courtney.
  - **DECIDE**: gendered slash name.
- **lover-ruler · The Sex Symbol**
  - **TYPO**: "Marylin" → Marilyn.
  - **SHARPEN**: the story is all Ruler ("owns the room, power dressed as pleasure"). The Lover's fear, isolation, is the whole truth of Monroe: desired by everyone, known by almost no one, Marilyn covering Norma Jeane. That's the "oh wow" line, and the story leaves it out.
  - **DECIDE**: the name, for guests. **The Icon**?
- **lover-sage · The Romantic**
  - **FIX**: Byron is "mad, bad and dangerous to know", which is Lover × Outlaw. "An intellectual love of true beauty" is **Keats** *(lead)*: "Beauty is truth, truth beauty", and his letters to Fanny Brawne match the story's "letters and longing".

## Magician (goal Power/Transformation · fear Unintended results)

Family note: "Power" comes first in the goal cell. For a person, that pushes readings toward domination (see magician-ruler). Put **Transformation** first.

- **magician-caregiver · The Fairy Godmother**
  - **FIX**: in *Shrek 2* the Fairy Godmother is the **villain**: she manipulates Fiona, runs a potion factory and dies at the end. That's the exact opposite of this personality. Use Cinderella's.
  - **FIX**: the story uses "She/Her". Change to "they" (rule 12).
  - **TYPO**: "behoind" → "behind".
  - **DECIDE**: gendered name.
- **magician-creator · The Genie**
  - **FIX**: the story uses "He/His". Change to "they".
  - **SHARPEN**: the genie grants every wish while stuck in "an itty-bitty living space", and nobody asks what the genie wants. For a guest that's the insight: the one who makes everyone's wishes come true.
- **magician-regular-guy · The Entertainer**: "Card trick nerd" isn't an example, and "nerd" reads as a jab. Something specific *(lead)*: Ricky Jay, or David Blaine's early street magic, which matches the imagery.
- **magician-explorer · The Alchemist**: good. Hester nugget: the real Nicolas Flamel was a Paris scribe, and the alchemy legend came centuries after him.
  - Cliché alert: "bartender as alchemist" is the most worn-out line in cocktail writing. Warn the room.
- **magician-hero · The Good Wizard**
  - **SHARPEN**: Harry is Hero-first (the boy, then the magic). The Magician-first good wizard is **Gandalf**: "You shall not pass", then Grey becoming White. He's currently on magician-sage, where he fits less well. See the next rows.
- **magician-innocent · The Sorcerer's Apprentice**: very good. The brooms multiplying is literally the Magician's fear of unintended results. The story could say so.
- **magician-jester · The Illusionist**: fine.
- **magician-lover · The Siren**
  - **DECIDE**: in the myth, sirens lure sailors to their deaths, and they're female. It overlaps lover-magician (see above).
- **magician-outlaw · The Trickster**: approved pour. The example "Shyloch" is wrong (see sage-jester) but doesn't touch the pour.
- **magician-ruler · The Omnipotent God**
  - **TYPO**: "Sixtine" → Sistine.
  - **FIX**: there's no person in the story ("total authority over reality… beyond negotiation"), so Wren gets nothing to work with.
  - **DECIDE**: telling a guest they're a god is grandiose and may offend religious guests. The human version of Magician × Ruler is the one who designs and runs the whole world around them and can't stand surprises (the Magician's fear plus the Ruler's control). **Prospero** *(lead)* is exactly that: he rules his island by magic and, at the end, gives the magic up ("this rough magic I here abjure"). Rename: **The Sovereign**? **The World-Maker**?
- **magician-sage · The Clairvoyant**
  - **SHARPEN**: "Knows what you are thinking before you do" describes **Sherlock Holmes** *(lead)*, who reads Watson's thoughts from his face, with deduction that looks like magic. Suggested swap: Holmes here, Gandalf to magician-hero.

## Outlaw (goal Liberation · fear Powerlessness)

Family note: "rebellion" or "outlaw energy" appears in 8 of the 11 story punchlines.

- **outlaw-caregiver · The Gentle Giant**: good. Name the example properly: *The BFG*.
- **outlaw-creator · The Rule Breaker**: good.
- **outlaw-regular-guy · The Gangster**
  - **FIX**: the description is gendered ("He knows the deal, he calls the shots, he makes the rules").
  - **SHARPEN**: the Regular Guy part (belonging, loyalty, one of us) is missing. The story is Ruler ("leverage, controlled intimidation"). Outlaw × Regular Guy is the *crew*: loyalty outside the law.
  - Capone gives Tomás Prohibition, and Capone opened a soup kitchen during the Depression *(lead)*, which is the neighbourhood's-own angle.
  - **DECIDE**: the name, for guests.
- **outlaw-explorer · The Thrill Seeker**: fine.
  - Palette: 805 C is fluorescent *red*, not hot pink. Also on jester-outlaw.
- **outlaw-hero · The Maverick**: good.
  - **TYPO**: "hey don't" → "They don't".
- **outlaw-innocent · The Adolescent**
  - **FIX**: Peaches Geldof (sic, "Geldoff") died of an overdose at 25, leaving two babies. Don't use her.
  - **SHARPEN**: the story has no innocence in it ("shock the world into noticing them"). **Holden Caulfield** *(lead)* is Outlaw × Innocent exactly: he rebels because the adult world is "phony", and he dreams of catching children before they fall. The lighter option is Ferris Bueller.
- **outlaw-jester · The Subverter**
  - **DECIDE**: the Joker is a mass murderer. A satirist who unsettles power *(lead)*: Chaplin in *The Great Dictator*, which mocked Hitler in 1940.
- **outlaw-lover · The Fugitive**: fine, but Bonnie and Clyde were real killers. The room should use the legend knowingly.
- **outlaw-magician · The Disrupter**
  - **DECIDE**: Shiva is a living religion's god, attached to a cocktail. Suggestion *(lead)*: **David Bowie**, who killed off Ziggy Stardust on stage in 1973 to become someone else. That's destroying in order to renew.
- **outlaw-ruler · The Leading Edge**: good.
  - **TYPO**: "parking off" → "Sparking off".
- **outlaw-sage · The Devil's Advocate**
  - **FIX**: the example is the 1997 film, in which Al Pacino plays the literal devil. The personality means the Church's *advocatus diaboli*, whose job was to argue against making someone a saint.
  - *(lead)*: Christopher Hitchens gave evidence against Mother Teresa's beatification, playing devil's advocate for real.

## Ruler (goal Control · fear Revolution)

Family note: the PERSONALITY cell cuts BRANDING's "Revolution / Chaos" down to "Revolution". For a person the fear is **chaos**. With "Revolution" as the fear, ruler-outlaw (The Revolutionary) contradicts its own family. That's actually a rich tension (the revolutionary who, once in power, fears the next revolution), but only if the story owns it.

Also, the Ruler rows lean on real politicians: Gandhi, Mandela, Lincoln, Churchill, Che, Clinton, plus Branson. Some guests will bristle. Your call how many to keep.

- **ruler-caregiver · The Caring Leader**
  - **FIX**: Gandhi never ruled. He's Outlaw (civil disobedience).
  - **Aragorn** *(lead)*: "The hands of the king are the hands of a healer." That's Ruler × Caregiver in a single line.
- **ruler-creator · The Perfectionist**: good.
- **ruler-regular-guy · The People's Representative**: good. Nuance *(lead)*: Mandela wore the Springbok jersey at the 1995 Rugby World Cup final.
- **ruler-explorer · The Reformer**: good. Emancipation is freedom, which is the Explorer part.
- **ruler-hero · The Noble King**
  - **FIX**: "statue" is a placeholder, not an example. **King Arthur** *(lead)*: the Round Table, where no seat is higher than another, also works as a sharing hook.
  - **DECIDE**: gendered name. **The Noble Ruler**?
- **ruler-innocent · The Diva**
  - **FIX**: the story is pure shadow ("petulant… entitlement"), which is an insult to hand a guest.
  - Innocent × Ruler is someone who insists the world be as beautiful as they were promised. Behind the demands is the child who wanted to be adored and safe.
  - The original diva is **Maria Callas** *(lead)*, "La Divina": enormous talent, tempestuous, very breakable. Richer than Mariah Carey.
- **ruler-jester · The Charismatic Leader**: fine. Note that Branson's Virgin is the BRANDING *Outlaw* brand.
- **ruler-lover · The Magnetic Leader**
  - **FIX**: remove "(playing the sax lol)".
  - **DECIDE**: Clinton brings the Lewinsky scandal to the table. **Cleopatra** *(lead)* is the textbook Ruler × Lover, and it has a drink legend: Pliny says she dissolved a pearl in vinegar and drank it to win a bet with Antony.
- **ruler-magician · The Legend**
  - **TYPO**: "ruelr" → "ruler".
  - Churchill is divisive (the 1943 Bengal famine) and comes with a martini legend Hester would need to check.
- **ruler-outlaw · The Revolutionary**
  - **DECIDE**: Che executed prisoners and is divisive. The alternative *(lead)* is George Washington: the revolutionary who turned down a crown and stepped down after two terms. That's the Ruler who beat his own fear.
- **ruler-sage · The Judge**
  - **SHARPEN**: Judge Judy is TV entertainment. **King Solomon** *(lead)* is the byword for the wise judge, or Ruth Bader Ginsburg.

## Sage (goal Wisdom · fear Deception)

Family note: 9 of 11 stories end on "Their wisdom is…". BRANDING's Sage line has "He can be seen as guide" (gendered) and "ibre Baskerville" (→ Libre).

- **sage-caregiver · The Mentor**: good.
  - **TYPO**: "nd" → "and".
- **sage-creator · The Architect**
  - **FIX**: "Image stock de plans" is a French placeholder, not an example. **Brunelleschi** *(lead)*: he raised Florence's impossible dome and invented the machines to build it, and there's a (disputed) egg anecdote. Or Zaha Hadid. Avoid Christopher Wren, who shares a name with the psychologist.
- **sage-regular-guy · The Dude**: good. The example comes with a drink (White Russian, dairy). Tomás should decide deliberately whether the classic *is* the point.
- **sage-explorer · The Philosopher**: good. Plato's *Symposium* is literally a drinking party *(lead)*.
- **sage-hero · The Grand Master**
  - **TYPO**: "Grandmaster" is one word.
  - "Chess player" is generic: Kasparov against Deep Blue *(lead)*, or *The Queen's Gambit* (careful: Beth's addictions).
- **sage-innocent · The Prodigy**: Tavi Gevinson is little known now. Matilda or Mozart *(lead)*.
- **sage-jester · The Wise Fool**
  - **FIX**: Shylock is the Jewish moneylender in *The Merchant of Venice*, and the play's treatment of him is antisemitic. He's no fool and no truth-teller. The Shakespearean wise fool is **the Fool in *King Lear*** or **Feste** in *Twelfth Night*.
  - **TYPO**: "A wise man… yusing" → "A wise person… using".
- **sage-lover · The Connoisseur**: approved pour.
- **sage-magician · The Game-Changer**
  - **SHARPEN**: Jobs is Magician-first. The Sage-first game-changer is **Alan Turing** *(lead)*: the Sage fears deception, and he broke Enigma. Handle his persecution with care.
- **sage-outlaw · The Lone Voice**: very good. "Eppur si muove" is apocryphal, which is Hester's territory.
- **sage-ruler · The Scientist**: good.

---

## Clusters to keep apart

Each pairing has a mirror (A × B and B × A), and several AI stories blur them. The rule of thumb: **the primary is the why, the secondary is the how.**

- **Experimenters**: creator-explorer (Experimentalist), explorer-creator (Innovator), explorer-jester (Mad Inventor), magician-explorer (Alchemist), sage-creator (Architect), sage-magician (Game-Changer). Innovation for its own sake / escape / play / transformation / understanding / impact.
- **Clear-eyed children**: innocent-ruler (Little Prince), innocent-sage (Wise Kid), sage-innocent (Prodigy). Responsibility / plain truth / early knowledge.
- **Satirists**: jester-outlaw (Scandalmonger), outlaw-jester (Subverter), jester-sage (Cynic), sage-jester (Wise Fool). Shock for fun / tear down norms / puncture nonsense / tell the truth.
- **Seducers**: lover-magician (Charmer), magician-lover (Siren), jester-lover (Tease), lover-jester (Flirt), lover-ruler (Sex Symbol).
- **Sense lovers**: explorer-lover (Sense Seeker), lover-explorer (Pleasure Seeker), sage-lover (Connoisseur, approved).
- **Everyday heroes**: hero-regular-guy (Fireman), regular-guy-hero (Have-a-Go Hero), regular-guy-caregiver (Good Samaritan), caregiver-hero (Rescuer, poured), hero-caregiver (Saviour).

## Examples that hand Tomás a drink

White Russian (The Dude), Vesper (Dashing Hero), a martini legend (Churchill), Prohibition (Capone), and the alchemist cliché. STUDIO-RULES already covers this ("classic OK when it IS the point"). The room just needs to decide deliberately.

## Colour (low priority)

The AI rows have one swatch each, against three in the human rows. Some swatches repeat: 2592 C purple × 5, Black C × 4, 290 C × 4. Two names are wrong: 805 C is fluorescent red, not hot pink, and 7421 C is a dark burgundy, not cherry. This only matters if palette feeds the image briefs.

## BRANDING sheet

- **Explorer**: the fears include "Cowardice" and the goals "Bravery", which belong to the Hero. The Explorer's classic fears are conformity, being trapped, and inner emptiness.
- **Explorer and Sage**: gendered ("He is restless", "He can be seen as guide").
- **Typos**: Self-suffiency, Strengh, Perseverence, Honestly (→ Honesty), Orginality, Emphaty, therfore, appealling, Exemples, ibre Baskerville.
- **Lover**: "Frigidity"; "feeling well". **Jester**: "2sc degree". See the family notes above.

## Regular Guy (human-written, later in the queue): quick look

- **regular-guy-caregiver · Good Samaritan**: "Attentats de Londres" (the 2005 London bombings?) is a French note about a terror attack, not an example. Fred Rogers' "look for the helpers" *(lead)* is the Good Samaritan in one line.
- **regular-guy-creator · Hidden Talent**: **TYPO** "alent" → "Talent".
- **regular-guy-explorer · The Entrepreneur**: "Sergei" → Sergey. Billionaire founders don't read as Regular Guy, the story is two sentences, and "16-6339 C" is a fashion (TCX) code, not a coated swatch.
- **regular-guy-innocent · The Bumpkin**: **DECIDE**. "Country bumpkin" is a put-down.
- **regular-guy-lover · Boy/Girl Next Door**: **DECIDE**. Gendered slash name.
- **regular-guy-magician · The Mechanic**: **FIX**. *The Mechanic* (1972 and 2011) is a film about a **hitman**. Scotty from *Star Trek*, the "miracle worker" engineer *(lead)*, fits.
- **regular-guy-outlaw · The Scoundrel**: "He's a down to earth lad" is gendered.
- **regular-guy-ruler · The People's Champion**: **FIX**. "Jo The Plumber" is Joe the Plumber, a 2008 campaign prop who wasn't a licensed plumber. That contradicts "overlooked expert". Sully Sullenberger *(lead)*, who put a jet down on the Hudson, is the quiet expert who shines when it matters.
- **regular-guy-sage · The Everyman**: the name collides with BRANDING, which uses "Everyman" for the Regular Guy archetype itself. Forrest Gump fits innocent-hero better. Uncle Iroh from *Avatar: The Last Airbender* *(lead)* is homespun wisdom over tea.

## Decisions for you

1. **Renames.** Gendered names (rule 12): Fireman, Straight Man, Ingénue, Fairy Godmother, Noble King, Bad Boy/Grrl, Big Brother/Sister, Little Prince, Boy/Girl Next Door. Loaded names: Coloniser, Geisha, Virgin, Omnipotent God, Sex Symbol, Scandalmonger (wrong word), Bumpkin. Renames reach `archetypes.ts` and the live site. None of the approved pours are affected.
2. **Sensitive real people and religious figures**: Jesus, Shiva, the Sistine God, Russell Brand (replace), Peaches Geldof (replace), McCandless, Che, Clinton, Churchill, Gandhi, the Joker. Keep, swap, or brief the room?
3. **Whether to rewrite the 99 AI stories** in the human rows' style: a person rather than a brand promise, the example woven in, the primary fear present, 45–60 words.
