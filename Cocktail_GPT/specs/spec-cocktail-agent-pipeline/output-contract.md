# Output Contract — Front-end Payload

The single structured payload the engine emits and the React/Vite front-end renders directly (CAP-5, CAP-7). One payload per completed quiz. Field names are indicative; lock exact keys with the front-end before build.

```json
{
  "user": {
    "name": "string",
    "favourite_colour": "string (from quiz colour scale)"
  },
  "personality": {
    "archetype": "one of the 12",
    "persona_name": "one of the 132 (e.g. 'The Surrealist')",
    "why_you": "the runtime-personalized rationale — the core 'made for you' moment"
  },
  "cocktail": {
    "name": "string",
    "emotional_fit": "one sentence — why this drink is them, right now",
    "image_ref": "id of the pre-rendered 3D asset, personalized with name + favourite colour",
    "recipe": [ { "ingredient": "string (from real inventory)", "quantity": "string" } ],
    "method": [ "ordered preparation step", "..." ],
    "rationale": "why this drink fits the person and their moment",
    "symbolic_reading": "what the ingredients and preparation represent",
    "serving_ritual": "how to serve, sip, or reflect with the drink"
  }
}
```

## Field rules

- **Every** field populated; no nulls in the cocktail block for a successful run.
- `recipe[].ingredient` values must each exist in `../../List of ingredients.docx`.
- `emotional_fit` is exactly one sentence.
- Voice across all prose fields: mystical, sophisticated, theatrical, intimate (per PRODUCT.md brand personality).
- `image_ref` points to an asset produced by the separate asset-generation step; the engine does not generate the image.

## The 8 reveal elements (Robin's storyteller spec)

1. Cocktail name → `cocktail.name`
2. One-sentence emotional fit → `cocktail.emotional_fit`
3. Personalized image → `cocktail.image_ref` (+ `user.name`, `user.favourite_colour`)
4. Recipe → `cocktail.recipe`
5. Method → `cocktail.method`
6. Rationale → `cocktail.rationale`
7. Symbolic reading → `cocktail.symbolic_reading`
8. Serving ritual → `cocktail.serving_ritual`
