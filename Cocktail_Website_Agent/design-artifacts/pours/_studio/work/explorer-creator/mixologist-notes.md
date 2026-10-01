# Tomás, working notes (explorer-creator)

## Round 3 scratch arithmetic (not a spec; Arnold's formulas by hand, LI table values from ingredients.json)
- Check of method: Arnold's slushy daiquiri (LI printed p. 142: 120 rum, 120 water, 45 simple, 52.5 lime) recomputes to 14.22% / 8.45 g/100 ml / 0.93%, matching his printed 14.2 / 8.4 / 0.93.
- Freezer batch, per drink: 60 tequila blanco, 30 Cointreau, 22.5 simple, 112.5 water frozen; 37.5 lime at the blend -> 262.5 ml, 13.71% / 8.36 g / 0.86%. Sits on Arnold's slushy rules (p. 141: ~14%, below 15.5; sugar at most 9 g/100 ml).
- Cointreau as the only sweetener (60/30/30 lime + water to 14%): ~3.1 g/100 ml. Too dry for a drink this cold; a syrup is needed. Martinez's printed recipe (F17) has syrup and Cointreau both.
- Martinez's printed blender recipe (F17: 60 tequila, 15 lime, 30 simple, 30 Cointreau, 1/2 cup ice), at Arnold's ~90% blender dilution (an assumption; his ice was measured by volume): ~14.0% / 10.2 g / 0.35%. Sweet and low on acid vs the blended band (7.5-8.5 g, 0.5-0.65%). Never said in copy; we don't serve "his recipe".
- balance.py "blended" assumes ~90% ice melt, which a freezer batch doesn't have. Run as freeform, reference = Arnold's slushy numbers, justified in Checks.
- To sweep later: substitute triple secs below 40% (strength and sugar move); avocado if ruled (adds volume, fat, little sugar; strength drops ~1.5 points at 30 g).
