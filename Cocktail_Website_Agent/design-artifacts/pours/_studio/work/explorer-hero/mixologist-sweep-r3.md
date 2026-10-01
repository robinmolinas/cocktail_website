# Tomás, round 3 sweep (not the spec; the spec waits on Wren's ruling)
Style stirred (Arnold). 60 ml bourbon at each strength, caramel syrup modelled as 1:1 simple (61.5 g/100 ml; caramelised sugar tastes less sweet, LI pdf 187, so the printed sugar overstates), 2 ml Angostura. Acid reads OUT on every line (0 vs 0.10-0.14): Arnold's stirred floor assumes vermouth, a range artefact for any spirit-only stirred drink. Run: python3 mixologist-sweep.py
```
   40% caramel11    5 ml w0   | init 37.2%/ 4.71g | dil 44.1% ->  96.5 ml | fin 25.8% / 3.27 g | initial sugar edge, finished sugar edge
   45% caramel11    5 ml w0   | init 41.6%/ 4.71g | dil 45.4% ->  97.4 ml | fin 28.6% / 3.24 g | initial sugar edge, finished sugar edge
 46.5% caramel11    5 ml w0   | init 43.0%/ 4.71g | dil 45.7% ->  97.6 ml | fin 29.5% / 3.24 g | initial sugar edge, finished abv edge, finished sugar edge
   50% caramel11    5 ml w0   | init 46.1%/ 4.71g | dil 46.2% ->  98.0 ml | fin 31.5% / 3.22 g | initial abv edge, initial sugar edge, finished abv OUT, finished sugar OUT
   55% caramel11    5 ml w0   | init 50.6%/ 4.71g | dil 46.6% ->  98.2 ml | fin 34.5% / 3.22 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar OUT
   60% caramel11    5 ml w0   | init 55.1%/ 4.71g | dil 46.4% ->  98.1 ml | fin 37.6% / 3.22 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar OUT
   65% caramel11    5 ml w0   | init 59.5%/ 4.71g | dil 45.8% ->  97.7 ml | fin 40.8% / 3.23 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar edge

   40% caramel11  7.5 ml w0   | init 35.8%/ 6.76g | dil 43.6% ->  99.8 ml | fin 24.9% / 4.71 g | all in (acid aside)
   45% caramel11  7.5 ml w0   | init 40.1%/ 6.76g | dil 45.0% -> 100.8 ml | fin 27.7% / 4.66 g | all in (acid aside)
 46.5% caramel11  7.5 ml w0   | init 41.4%/ 6.76g | dil 45.4% -> 101.0 ml | fin 28.5% / 4.65 g | all in (acid aside)
   50% caramel11  7.5 ml w0   | init 44.5%/ 6.76g | dil 46.0% -> 101.5 ml | fin 30.5% / 4.63 g | initial abv edge, finished abv edge
   55% caramel11  7.5 ml w0   | init 48.8%/ 6.76g | dil 46.5% -> 101.8 ml | fin 33.3% / 4.61 g | initial abv OUT, finished abv OUT
   60% caramel11  7.5 ml w0   | init 53.1%/ 6.76g | dil 46.5% -> 101.8 ml | fin 36.2% / 4.61 g | initial abv OUT, finished abv OUT
   65% caramel11  7.5 ml w0   | init 57.4%/ 6.76g | dil 46.2% -> 101.6 ml | fin 39.3% / 4.62 g | initial abv OUT, finished abv OUT

   40% caramel11   10 ml w0   | init 34.6%/ 8.66g | dil 43.1% -> 103.0 ml | fin 24.2% / 6.05 g | initial sugar edge, finished sugar edge
   45% caramel11   10 ml w0   | init 38.7%/ 8.66g | dil 44.6% -> 104.1 ml | fin 26.8% / 5.99 g | initial sugar edge, finished sugar edge
 46.5% caramel11   10 ml w0   | init 40.0%/ 8.66g | dil 45.0% -> 104.4 ml | fin 27.6% / 5.97 g | initial sugar edge, finished sugar edge
   50% caramel11   10 ml w0   | init 42.9%/ 8.66g | dil 45.7% -> 104.9 ml | fin 29.5% / 5.94 g | initial sugar edge, finished abv edge, finished sugar edge
   55% caramel11   10 ml w0   | init 47.1%/ 8.66g | dil 46.3% -> 105.4 ml | fin 32.2% / 5.92 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar edge
   60% caramel11   10 ml w0   | init 51.2%/ 8.66g | dil 46.6% -> 105.5 ml | fin 35.0% / 5.91 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar edge
   65% caramel11   10 ml w0   | init 55.4%/ 8.66g | dil 46.4% -> 105.4 ml | fin 37.8% / 5.91 g | initial abv OUT, initial sugar edge, finished abv OUT, finished sugar edge

   40% caramel21    5 ml w0   | init 37.2%/ 6.69g | dil 44.1% ->  96.5 ml | fin 25.8% / 4.64 g | all in (acid aside)
   45% caramel21    5 ml w0   | init 41.6%/ 6.69g | dil 45.4% ->  97.4 ml | fin 28.6% / 4.60 g | all in (acid aside)
 46.5% caramel21    5 ml w0   | init 43.0%/ 6.69g | dil 45.7% ->  97.6 ml | fin 29.5% / 4.59 g | finished abv edge
   50% caramel21    5 ml w0   | init 46.1%/ 6.69g | dil 46.2% ->  98.0 ml | fin 31.5% / 4.58 g | initial abv edge, finished abv OUT
   55% caramel21    5 ml w0   | init 50.6%/ 6.69g | dil 46.6% ->  98.2 ml | fin 34.5% / 4.57 g | initial abv OUT, finished abv OUT
   60% caramel21    5 ml w0   | init 55.1%/ 6.69g | dil 46.4% ->  98.1 ml | fin 37.6% / 4.57 g | initial abv OUT, finished abv OUT
   65% caramel21    5 ml w0   | init 59.5%/ 6.69g | dil 45.8% ->  97.7 ml | fin 40.8% / 4.59 g | initial abv OUT, finished abv OUT

   40% caramel21  7.5 ml w0   | init 35.8%/ 9.62g | dil 43.6% ->  99.8 ml | fin 24.9% / 6.70 g | initial sugar OUT, finished sugar OUT
   45% caramel21  7.5 ml w0   | init 40.1%/ 9.62g | dil 45.0% -> 100.8 ml | fin 27.7% / 6.63 g | initial sugar OUT, finished sugar OUT
 46.5% caramel21  7.5 ml w0   | init 41.4%/ 9.62g | dil 45.4% -> 101.0 ml | fin 28.5% / 6.62 g | initial sugar OUT, finished sugar OUT
   50% caramel21  7.5 ml w0   | init 44.5%/ 9.62g | dil 46.0% -> 101.5 ml | fin 30.5% / 6.59 g | initial abv edge, initial sugar OUT, finished abv edge, finished sugar OUT
   55% caramel21  7.5 ml w0   | init 48.8%/ 9.62g | dil 46.5% -> 101.8 ml | fin 33.3% / 6.57 g | initial abv OUT, initial sugar OUT, finished abv OUT, finished sugar OUT
   60% caramel21  7.5 ml w0   | init 53.1%/ 9.62g | dil 46.5% -> 101.8 ml | fin 36.2% / 6.56 g | initial abv OUT, initial sugar OUT, finished abv OUT, finished sugar OUT
   65% caramel21  7.5 ml w0   | init 57.4%/ 9.62g | dil 46.2% -> 101.6 ml | fin 39.3% / 6.58 g | initial abv OUT, initial sugar OUT, finished abv OUT, finished sugar OUT

water for strong barrels, caramel11 7.5:
   55% caramel11  7.5 ml w0   | init 48.8%/ 6.76g | dil 46.5% -> 101.8 ml | fin 33.3% / 4.61 g | initial abv OUT, finished abv OUT
   55% caramel11  7.5 ml w5   | init 45.5%/ 6.30g | dil 46.1% -> 108.9 ml | fin 31.1% / 4.31 g | initial abv edge, finished abv OUT
   55% caramel11  7.5 ml w10  | init 42.6%/ 5.91g | dil 45.6% -> 115.8 ml | fin 29.3% / 4.06 g | finished abv edge
   55% caramel11  7.5 ml w15  | init 40.1%/ 5.56g | dil 45.0% -> 122.5 ml | fin 27.7% / 3.83 g | all in (acid aside)
 57.5% caramel11  7.5 ml w0   | init 50.9%/ 6.76g | dil 46.6% -> 101.9 ml | fin 34.7% / 4.61 g | initial abv OUT, finished abv OUT
 57.5% caramel11  7.5 ml w5   | init 47.5%/ 6.30g | dil 46.4% -> 109.1 ml | fin 32.5% / 4.31 g | initial abv OUT, finished abv OUT
 57.5% caramel11  7.5 ml w10  | init 44.5%/ 5.91g | dil 46.0% -> 116.1 ml | fin 30.5% / 4.05 g | initial abv edge, finished abv edge
 57.5% caramel11  7.5 ml w15  | init 41.9%/ 5.56g | dil 45.5% -> 122.9 ml | fin 28.8% / 3.82 g | all in (acid aside)
   60% caramel11  7.5 ml w0   | init 53.1%/ 6.76g | dil 46.5% -> 101.8 ml | fin 36.2% / 4.61 g | initial abv OUT, finished abv OUT
   60% caramel11  7.5 ml w5   | init 49.5%/ 6.30g | dil 46.5% -> 109.2 ml | fin 33.8% / 4.30 g | initial abv OUT, finished abv OUT
   60% caramel11  7.5 ml w10  | init 46.4%/ 5.91g | dil 46.3% -> 116.3 ml | fin 31.7% / 4.04 g | initial abv edge, finished abv OUT
   60% caramel11  7.5 ml w15  | init 43.7%/ 5.56g | dil 45.8% -> 123.2 ml | fin 29.9% / 3.81 g | initial abv edge, finished abv edge
 62.5% caramel11  7.5 ml w0   | init 55.2%/ 6.76g | dil 46.4% -> 101.8 ml | fin 37.7% / 4.62 g | initial abv OUT, finished abv OUT
 62.5% caramel11  7.5 ml w5   | init 51.5%/ 6.30g | dil 46.6% -> 109.2 ml | fin 35.2% / 4.30 g | initial abv OUT, finished abv OUT
 62.5% caramel11  7.5 ml w10  | init 48.3%/ 5.91g | dil 46.5% -> 116.4 ml | fin 33.0% / 4.03 g | initial abv OUT, finished abv OUT
 62.5% caramel11  7.5 ml w15  | init 45.4%/ 5.56g | dil 46.1% -> 123.5 ml | fin 31.1% / 3.80 g | initial abv edge, finished abv OUT
   65% caramel11  7.5 ml w0   | init 57.4%/ 6.76g | dil 46.2% -> 101.6 ml | fin 39.3% / 4.62 g | initial abv OUT, finished abv OUT
   65% caramel11  7.5 ml w5   | init 53.5%/ 6.30g | dil 46.5% -> 109.2 ml | fin 36.5% / 4.30 g | initial abv OUT, finished abv OUT
   65% caramel11  7.5 ml w10  | init 50.2%/ 5.91g | dil 46.6% -> 116.5 ml | fin 34.2% / 4.03 g | initial abv OUT, finished abv OUT
   65% caramel11  7.5 ml w15  | init 47.2%/ 5.56g | dil 46.4% -> 123.7 ml | fin 32.3% / 3.80 g | initial abv OUT, finished abv OUT
acid line example: {'value': 0.0, 'range': [0.1, 0.14], 'verdict': 'OUT'}
```

Equal-ethanol rule: bourbon + water = 60 ml, water = 60 x (1 - 46.5/label ABV). Same ethanol and volume as 60 ml at 46.5%, so the numbers are identical to the 46.5% line (28.5% / 4.65 g, in range) at any strength: 50% -> 55.8 + 4.2; 55% -> 50.7 + 9.3; 60% -> 46.5 + 13.5; 65% -> 42.9 + 17.1.
