# Tomás: draft Checks, The Sculptor (creator-caregiver), round 3

Spec: `_studio/specs/creator-caregiver.json`, with 60 ml London dry gin, 30 ml sweet vermouth and 7.5 ml Fernet-Branca (the written midpoint; the method fits it at 5–10 ml), stirred, coupe, orange peel.

### Checks

| check | result |
| --- | --- |
| Structure (*Cocktail Codex*) | Martini family: spirit + aromatized wine. Core = gin + sweet vermouth at 2:1, the *Codex* root ratio ("the Manhattan uses the same ingredient ratios but swaps in rye and sweet vermouth", p. 65). Balance = sweet vermouth. Seasoning = Fernet-Branca + orange oil. Amari "in tiny quantities, between a dash and a teaspoon" act as seasoning; with Fernet, "start with a small quantity… then add more, little by little" (*Codex*, p. 261). The method's gesture follows the *Codex*'s own instruction. ✓ |
| Balance (*Liquid Intelligence*, stirred, pdf 129–130 / pp. 125–126) | Stirred ranges: initial ABV 29–43, sugar 5.3–8.0, acid 0.15–0.20; final ABV 21–29%, sugar 3.7–5.6 g/100 ml, acid 0.10–0.14%, dilution 41–49%. **Fernet 5 ml: 25.7% · 3.80 g · 0.132% · 44.0% ✓. 7.5 ml: 25.7% · 3.85 g · 0.128% · 44.0% ✓. 10 ml: 25.7% · 3.89 g · 0.125% · 44.1% ✓.** Balanced at every stop of the method; spec written at 7.5 ml, the midpoint. Sugar sits near the floor (3.7), the dry end a Fernet drink wants. **v0 (equal parts 45/45 + 2 dashes; *Joy* pdf 299, *A Proper Drink* p. 252) OUT:** acid 0.29 initial / 0.21 final, finished sugar at the edge (5.64). Too much vermouth for Arnold's stirred ranges. Values: gin, sweet vermouth and Fernet-Branca all from the LI ingredient table (pdf 140–141); none unsourced. |
| Pairings | Own knowledge and *Codex*: Fernet reads as "caramel, coffee, and anise… a rich burnt orange elixir with a minty finish" (*Codex*, p. 261). The orange peel picks up its burnt orange; sweet vermouth's dark-fruit sweetness carries the bitterness; juniper and mint sit together in the *Flavor Matrix*'s aroma table (pdf 290). No surprising pairing forced: the surprise is that a teaspoon of the harshest bottle is what makes it. ✓ |
| Vetoes | egg-white ✗ · dairy ✗ · gluten ✗ (distilled) · nuts ✗ · spice ✗ (heat only; Fernet is bitter, not hot). `allergens.py --check ""` → contains [], matches, exit 0. **Veto-free.** |
| Makeable | Supermarket gin and sweet vermouth; Fernet-Branca is named because it is the drink (Coleman's own bottle); substitute style: "any dark, minty Italian fernet". A jar or mixing glass, a spoon, a strainer, a coupe from the freezer. |
