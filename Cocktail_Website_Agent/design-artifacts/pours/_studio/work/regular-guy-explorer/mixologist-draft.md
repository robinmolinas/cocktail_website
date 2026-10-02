# Mixologist draft: regular-guy-explorer (The Entrepreneur)

Tomás, round 5 (2026-10-01), R8-R10 applied. Spec: `_studio/specs/regular-guy-explorer.json` (v2).

**Family:** sidecar (a Margarita) · **Glassware:** cocktail glass (about 200 ml), chilled, no salt · **Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 60 ml | Sauza 100% agave blanco tequila (recommended; sold in the US as Sauza Signature Blue) | The brand Café Pacifico's Margaritas were made with, per one of its barmen; this is Sauza's 100% agave blanco, not Pacifico's exact bottle. Or any blanco tequila of 38-40%. |
| 22.5 ml | Giffard Triple Sec, 25% (recommended) | The brand Pacifico used, per one of its barmen. Giffard makes it at 25% and at 40% (Curaçao Triple Sec), and both balance. Or any French triple sec. |
| 22.5 ml | fresh lime juice | Squeezed the same day. |
| 7.5 ml | simple syrup | Equal parts sugar and water, stirred until clear. |
| 1 strip | grapefruit peel | The loose top: oils squeezed over the drink, then rested on the rim. |

## Method

1. Put the cocktail glass in the freezer for ten minutes, or fill it with ice and water while you work.
2. Measure the tequila, triple sec, lime juice and syrup into a shaker. Measure them exactly: this is the tight part.
3. Fill the shaker with ice and shake hard for about twelve seconds, until the outside is too cold to hold comfortably.
4. Empty the glass and strain the drink into it. No salt.
5. Now the loose part. Cut a wide strip of grapefruit peel with as little white as you can, hold it skin-side down over the glass and squeeze it so its oils fall on the drink, then rest it on the rim. That's my top. If someone else is making it, the top is theirs: anything that goes on the drink rather than into it.

## Checks

| check | result |
| --- | --- |
| Structure | *Codex* sidecar family (p. 154: the Margarita is the Sidecar's template with tequila and lime). Core: blanco tequila. Balance: lime against triple sec plus a little syrup. Seasoning: grapefruit oils on top. Proportions are the *Codex*'s (p. 166: 2 oz tequila, ¾ orange liqueur, ¾ lime, ¼ simple syrup; its service, a rocks glass with one cube and half a salt rim, isn't ours, and its named tequila is never used here), because Estes's own proportions aren't on record (*Proper* p. 79 gives only the bottles, "to Estes' specifications", per Danny Smith). Never "his recipe". |
| Balance | `balance.py`, shaken (sours): **balanced.** Goes in at 26.3% / 9.42 g / 1.200%, comes out at 17.0% / 6.07 g / 0.773%, 55.3% dilution, 174.7 ml. **Edge, justified:** initial acid sits exactly on its floor (1.20). These are the *Codex*'s proportions, unchanged. Because there's no slack, **the loose top goes on, never in**: a 5 ml float of a 45% spirit sends initial acid OUT (1.149) and 2.5 ml more syrup takes it to the edge (1.174). The peel adds oils only: no sugar, acid or strength. |
| Balance, bottle sweeps | Giffard makes a 25% Triple Sec and a 40% Curaçao Triple Sec (giffard.com, Hester F24). *Proper* p. 79 says only "Giffard triple sec", so I name the bottling called that, the 25%. **Giffard publishes no sugar figure** (only "100g/L min"), so the new `giffard_triple_sec` row carries Cointreau's 25 g/100 ml (LI) as a **stand-in**, labelled so. Sweep, both strengths × 10/15/20/25/30/35/40 g/100 ml: **in range from 20 g up** (finished 17.0-18.6%, 5.33-8.00 g). At 15 g the sugar goes to the edge, and at 10 g initial sugar is OUT (6.42). More syrup can't rescue a dry one: 10-12.5 ml of syrup pushes acid to the edge or OUT (1.149). So the proof holds for a triple sec of at least 20 g sugar per 100 ml. Giffard's label doesn't let me confirm that, and Checks says so. Tequila swept at 38/40/46%: 38 and 40 in range; 46% goes edge on four counts (20.3% finished, 0.748% acid). Hence "38-40%" in the note. |
| Pairings | **Classic:** tequila, orange liqueur and lime are the Margarita (*Codex* pp. 154, 166). **Top:** grapefruit, a citrus beside the lime and the orange. The *Flavor Matrix* puts citrus flavour mostly in the oils of the coloured rind (pdf 80), which is why the top is a peel and not a juice. **Matrix consulted and set aside:** citrus's surprise pairings (pdf 80) are sage (*A Brother's Care*'s leaf), caraway (*Not Only the Way*'s), peanut and pecan (both `nuts`: the pour would lose its veto-free place). Its best pairings include ginger (pungency = `spice` in our table, same cost) and cilantro (a Mexico postcard, against Wren's condition). Tequila as avocado's surprise pairing (pdf 40) is a postcard too. No Matrix spark, then, on purpose (Robin 2026-09-30: no spark is fine if the drink is interesting). What makes it interesting is the gesture: a drink in two parts, one measured exactly and one left to whoever's making it, Bayly's "tight on bottom, loose on top" (F11) in the glass. |
| Allergens | `allergens.py`: contains nothing, **veto-free** (counts toward the AD-4 floor). Distilled agave spirit, orange liqueur, lime, sugar, grapefruit peel. A guest's own "top" isn't in the spec. The closing line steers it to things that go *on*, but any allergen in it is theirs to watch. |
| Makeable | Shaker, strainer, jigger, freezer: basic kit. Both bottles are widely sold. **Bottles (Hester F22-F24).** Giffard: Triple Sec 25% and Curaçao Triple Sec 40%, no sugar published (F24); both strengths swept (Balance). **Tequila, Hester's option (b):** today's basic Sauza silver is a mixto (51% agave, Oxford SAUZA pdf 1743), and nobody knows which Sauza Pacifico poured in the 1980s. So I name Sauza's 100% agave blanco (US: Signature Blue, 40%; UK name unchecked), **as Sauza's, not as Pacifico's bottle**. The reading never says "the same tequila" and never praises it. Spirit for the guest's sake: 100% agave over a mixto. Numbers and vetoes are proven for 40% blanco and the stand-in triple sec, and the named bottles by the sweeps, not by their labels. |
| Distinctness | The registry's third Margarita, with Wren's condition met. Not *Half a Rim* (Tommy's: agave syrup, no orange liqueur, half a salt rim, rocks glass, clear cube). Not *For Good* (frozen batch for four, Cointreau and vanilla, goblet). Ours: Pacifico's bottles, shaken, served up, no salt, a guest-chosen top. *Off-Label* hands over the core spirit, and ours never touches the core. No sibling uses grapefruit peel as a top (pour files grepped: grapefruit appears in *Fair Measure*, *Brought Home*, *Show Your Working* and others, all as juice or other roles, and Robin's rule is that a category is never taken). |

**closingLine:** *Measure the bottom exactly. Then hand the top to someone else, and join the people you made room for.*

(Round 4: "drink it as a guest" withdrawn, because Wren showed being looked after is the Rescuer's. Her "stay for the first one" collides with *Unrehearsed*'s y5 "Stay for the second that follows". "Hand the top to someone else" is hers. "Join the people you made room for" is free in every pour file (grepped "made room", "join the", "hand the top"). It avoids sitting, regulars (an archetype pun) and "the other side of".)

## Image brief

- **The glass:** a classic stemmed cocktail glass (about 200 ml), frosted from the freezer, filled to just below the rim with a pale, slightly cloudy Margarita. Both bottles are clear, so the colour is the fresh lime's: a soft greenish white, a thin froth line on the surface from the hard shake. **No salt rim.** A wide strip of grapefruit peel, pink-orange skin outward, rests on the rim.
- **The setting:** a long, plain wooden bar counter in warm, natural daylight. Further along the counter, softly out of focus, three or four more of the same glass with the same pale drink, **each with a different top**: a lime wheel, an orange twist, a mint leaf, nothing at all. Same drink, different hands.
- **Mood:** busy-friendly, a place people come back to, with nobody in frame.
- **Never:** sombreros, cacti, chillies, piles of limes, tequila-bottle hero shots, neon, salt, a bar stool pulled out (*Whoever Comes In*'s image), people, dark backgrounds.
- **Palette nod (persona):** let a bright sky blue and a bold orange appear only as real objects (a blue-glazed tile behind the bar, the grapefruit peel's orange). Never a tint over the drink.

## Names

1. **Loose on Top** (my pick): Bayly's half of the rule, the half that's the person's gift. A bartender would say it out loud, and it doesn't repeat the tagline.
2. **Own Style**: the rule's promise, short. Weaker, because it sounds like a fashion label.
3. **Room at the Bar**: the turn of the story (other people found a place in it). Risk: close to "Somewhere others belonged" if the tagline goes there.
4. **Support Myself**: Estes's plain reason in his own words. It's honest, but it's his line, not the guest's, and it reads flat cold.
