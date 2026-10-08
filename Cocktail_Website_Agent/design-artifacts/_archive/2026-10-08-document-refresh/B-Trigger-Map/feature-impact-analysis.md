> Historical copy preserved on 8 October 2026. Current experience: [master specification](../../../2026-07-08-experience-master-spec.md).

# Feature Impact Analysis: Dionysus

## Scoring Legend

- **Primary Persona - Celeste the Curious (⭐):** High = 5 pts | Medium = 3 pts | Low = 1 pt  
- **Secondary Persona - Edward the Evaluator (💼):** High = 3 pts | Medium = 1 pt | Low = 0 pts

- **Max Possible Score:** 8 (5 from Celeste, 3 from Edward)  
- **Must Have Threshold:** 6+ or Primary High (5)

---

## Prioritized Features

| Rank | Feature | Score | Decision |
| :--- | :--- | :---: | :--- |
| 1 | **Interactive Bar Spoon Cursor (WebGL/Canvas Fluid solver)** | 8 | Must Have MVP |
| 2 | **Subtractive Fluid-Sinking Page Transitions** | 8 | Must Have MVP |
| 3 | **Agent Storytelling Engine (Historian, Mixologist, Storyteller)** | 8 | Must Have MVP |
| 4 | **Paint Overflow Climax Animation** | 6 | Must Have MVP |
| 5 | **Print-Ready PDF Recipe Card (Client-side Export)** | 6 | Must Have MVP |
| 6 | **Alchemical Questionnaire Interface (Container-free layout)** | 6 | Must Have MVP |
| 7 | **Subtractive Soundscape (Web Audio API)** | 6 | Must Have MVP |
| 8 | **Developer Bypass / Secret "Roulette" Button** | 4 | Consider for MVP |
| 9 | **Gallery of Souls (Anonymous recent results log)** | 3 | Defer |
| 10 | **Interactive Garnishes (Drag-and-drop on results card)** | 3 | Defer |

---

## Decisions

### ⭐ Must Have MVP (Primary High OR Top Tier Score):

#### 1. Interactive Bar Spoon Cursor (Score: 8)
- **Celeste (5):** Direct sensory translation of mixology stirring; provides a magical, responsive visual play loop.
- **Edward (3):** Immediate proof of Robin's capability to run high-performance WebGL/Canvas physics at 60fps.
- **Product Promise:** Interactive HTML5 Canvas fluid simulation that marbles background sumi-e ink washes in real-time.

#### 2. Subtractive Fluid-Sinking Page Transitions (Score: 8)
- **Celeste (5):** Alleviates 19-question fatigue by making page navigation feel like sinking through density layers of a cocktail.
- **Edward (3):** Demonstrates strict engineering optimization, keeping transition times under 4 seconds without frame drops.
- **Product Promise:** Transition animation where answering questions clears away ink density layers, revealing clean watercolor paper.

#### 3. Agent Storytelling Engine (Score: 8)
- **Celeste (5):** Guarantees that the cocktail recommendation feels authentic, deeply personalized, and alchemically grounded.
- **Edward (3):** Demonstrates backend design capability, showing how multiple independent AI agents collaborate cleanly.
- **Product Promise:** Integration of Historian (origins/symbolism), Mixologist (formula mapping), and Storyteller (poetic narrative) agents.

#### 4. Paint Overflow Climax Animation (Score: 6)
- **Celeste (5):** The high-point emotional payoff of the quiz—transforming dark ink into a vibrant splash of color.
- **Edward (1):** High-end design detail that proves visual polish and animation timing.
- **Product Promise:** WebGL splash animation that paint-reveals the calligraphy title and final glass silhouette.

#### 5. Print-Ready PDF Recipe Card (Score: 6)
- **Celeste (5):** Allows her to save a beautiful calligraphic recipe card, extending the digital magic to the real world.
- **Edward (1):** Demonstrates frontend utility skills (client-side PDF canvas rendering and print styling).
- **Product Promise:** Custom styled PDF download formatted like hand-painted parchment scroll.

#### 6. Alchemical Questionnaire Interface (Score: 6)
- **Celeste (5):** Minimizes form friction, replacing standard boxes and inputs with large typography and fluid touch/click targets.
- **Edward (1):** Showcases design aesthetic leadership by rejecting boring, standard UI libraries.
- **Product Promise:** Container-free, clean layout optimized for Outfit/Inter type styling.

#### 7. Subtractive Soundscape (Score: 6)
- **Celeste (5):** Enhances the serene and magical atmosphere of the quiz, creating a crescendo to the climax.
- **Edward (1):** Demonstrates proficiency with the browser Web Audio API.
- **Product Promise:** Ambient audio that shifts volume and density in response to user actions and page depth.

---

### 🚀 Consider for MVP:

#### 8. Developer Bypass / Secret "Roulette" Button (Score: 4)
- **Celeste (1):** Low value; breaks the magical build-up of the quiz.
- **Edward (3):** Critical for rapid review. An evaluator who has only 3 minutes needs a way to bypass the 19 questions to immediately test the Climax screen and backend AI response.
- **Product Answer:** A hidden, calligraphic gesture or a small, styled button that allows developers/leads to trigger a random "roulette" results reveal instantly.

---

### 🌟 Defer (Nice-to-Have):

#### 9. Gallery of Souls (Score: 3)
- **Celeste (3):** Fun extension to see what other personalities and drinks exist.
- **Edward (0):** Negligible impact on technical recruitment evaluation.
- **Decision:** Defer to post-launch phase; focus on perfect quiz delivery first.

#### 10. Interactive Garnishes (Score: 3)
- **Celeste (3):** Adds extra play value on the results screen.
- **Edward (0):** Minimal portfolio validation weight.
- **Decision:** Defer to future enhancements.

---

## Strategic Implications

1. **Celeste-First Optimization:** Every design decision must prioritize Celeste's emotional journey (wonder, magic, and curiosity). Edward is fully satisfied if the experience created for Celeste is technically perfect and visually stunning.
2. **The "Bypass" Necessity:** To ensure Edward doesn't bounce, we must build a hidden developer shortcut (e.g., clicking the Dionysus title logo 3 times or a secret keyboard key) to bypass the 19-question quiz and jump directly to the AI-generated results screen.
3. **No Component Libraries:** Since both Celeste and Edward expect unique visual identity, we will write vanilla CSS animations and Canvas loops, avoiding Bootstrap/Material UI cards or input inputs.

---

## Related Documents

- **[00-trigger-map.md](00-trigger-map.md)** - Visual overview and navigation
- **[01-business-goals.md](01-business-goals.md)** - Portfolio objectives and flywheel
- **[02-celeste-the-curious.md](02-celeste-the-curious.md)** - Primary persona
- **[03-edward-the-evaluator.md](03-edward-the-evaluator.md)** - Secondary persona (de-emphasized)
- **[05-Key-Insights.md](05-Key-Insights.md)** - Strategic implications

---

_Back to [Trigger Map](00-trigger-map.md)_
