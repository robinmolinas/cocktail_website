// Shared types for the Dionysus experience.

export interface Answers {
  name: string;
  lens: string | null; // "Who should this cocktail capture?" (H1 · The Threshold)
  answerStyle: string | null;
  childhood: string | null;
  city: string;
  age: string;
  gender: string | null;
  color: string; // hex
  colorName: string; // liqueur + colour, e.g. "Aperol Orange" (H2 · The Seed)
  colorTouched: boolean;
  gravity: Record<string, number>; // 0..100 per polarity, 0 = first pole (H3 · The Gravity)
  selfScales: Record<string, number>; // 0..100, key = ScaleDef id
  personality: string | null;
  interpersonal: string | null;
  workEthic: string | null;
  emotional: string | null;
  creativity: string | null;
  moodScales: Record<string, number>;
  texture: Record<string, string>; // H4 · binary key → caught word; absent key = "hidden self"
  drawnToward: string[]; // H5 · "What are you most drawn toward right now?" (up to 3)
  soughtFor: string[]; // H5 · "What do people often come to you for?" (up to 3)
  styles: string[]; // up to 3
  flavors: string[]; // up to 3
  drinkScales: Record<string, number>;
  allergies: string;
  insight: string;
}

export interface Ingredient {
  amount: string;
  item: string;
  note?: string;
}

export interface AgentLines {
  psychologist: string;
  historian: string;
  mixologist: string;
  storyteller: string;
}

export interface CocktailResult {
  cocktailName: string;
  archetypeName: string; // e.g. "The Visionary"
  archetypeEssence: string;
  archetypeStory: string;
  primary: string;
  secondary: string;
  tagline: string;
  glassware: string;
  flavorArc: string;
  colorName: string;
  zeroProof: boolean;
  ingredients: Ingredient[];
  procedure: string[];
  whyYou: string[];
  /** The pour's own last words (authoring studio: `closingLine`). Set apart as
   *  the reading's ending rather than buried as a final body paragraph. Absent
   *  on engine-built results, which simply end on their last `whyYou`. */
  closingLine?: string;
  agentLines: AgentLines;
}
