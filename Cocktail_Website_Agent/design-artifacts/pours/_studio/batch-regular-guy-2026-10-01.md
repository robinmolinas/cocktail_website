# Batch regular-guy: summary for Robin

The batch ran on 2026-10-01: eleven pours, one fresh room each, after the family plan (`plans/regular-guy.md`). It ran headless, in five sittings of two pours each (three in the last), so nobody asked you anything along the way. **Ten are drafts and one is flagged.** Every pour lints with 0 errors. Every room closed with three sign-offs and no open objections, all within 5 rounds (caregiver opened under 6 and switched after round 1). Nothing is approved here: read, edit and approve at the review desk (`dps-review-desk`).

## Flags and edges first

**Flagged, your call**
- **Whoever Comes In (regular-guy-caregiver): balance OUT on acid only.** It's a brandy shakerato with fresh espresso and roasted parsnip syrup, and it has no citrus. So the acid reads OUT against the sours' citrus band. Tomás matched it to Arnold's Boozy Shakerato and justified it in Checks. Your call: accept the OUT, or ask for a drink that is in range. Wren also flags a risk for you: the cash-machine image reads gently as someone sleeping rough.

**For you: a shared-table change that touches another family**
- In the sage room, Tomás changed `sloe_gin`'s acid in `dps-tools/data/ingredients.json` from 0.5% to 0%. The 0.5% was his own unsourced guess from the outlaw-explorer room, and 0% comes from *Liquid Intelligence*'s Blackthorn. As a result, **Whoopee (outlaw-explorer) now sits at a balance edge.** Its file was not touched.

**Off the veto-free floor (2 of 11)**
- **Right Here (creator): contains nuts**, on the safe side. Wren questioned it, then accepted it.
- **Tried and True (sage): contains nuts.** Sloe gins can contain almond, and some makers crush the stones. The recipe note says so.

**The plan was changed in three rooms** (each plan row now carries a "room chose" note):
- Jester: the Collins lead was overturned.
- Outlaw: Wren replaced Rowles in round 1, because he hides behind the union rule. The room chose Simon Ford instead, and the vodka Martini became a French 75 over ice.
- Ruler: the row was Open. The room kept candidate A's *PUNCH* page but built it around Bobby Heugel's packer's cases. B (Duffy) is now Ruler's Legend.

**No Flavor Matrix spark in six pours, on purpose** (your 2026-09-30 rule: the drink is made interesting from the books instead):
- explorer: the gesture
- innocent: the caipirinha, nothing added
- lover: the soy sauce was dropped because its gluten would shut out a guest who fears exclusion
- magician: the jar is the spark
- ruler: the guest chooses lime or lemon
- sage: the 60 ml rule between the two gins

## The eleven

| pairing | name | drink | status | contains |
|---|---|---|---|---|
| caregiver (The Samaritan) | Whoever Comes In | brandy shakerato, fresh espresso, roasted parsnip syrup made ahead | **flagged** (acid OUT) | — |
| creator (The Hidden Talent) | Right Here | gin Old-Fashioned, Tanqueray, liquorice root syrup, kitchen tumbler | draft | nuts |
| explorer (The Entrepreneur) | Loose on Top | Margarita in two parts (Sauza blanco + Giffard), grapefruit peel left to whoever makes it | draft | — |
| hero (The Have A Go Hero) | I'll Do It | rye Manhattan on the rocks, split with apple brandy | draft | — |
| innocent (The Bumpkin) | Good as It Is | the caipirinha, nothing added, built in the glass | draft | — |
| jester (The Prankster) | Got You | frozen-grapefruit Malört sour after Arnold's Shaken Drake | draft | — |
| lover (The One Next Door) | First Choice | the Cohasset Punch, peach the regulars' way | draft | — |
| magician (The Mechanic) | Good for Years | mezcal and marmalade, shaken in the jar | draft | — |
| outlaw (The Scoundrel) | Just This Once | French 75 over ice in a large wine glass, Plymouth gin | draft | — |
| ruler (The People's Champion) | Word Gets Round | bourbon Rickey, no sugar, lime or lemon by taste | draft | — |
| sage (The Everyman) | Tried and True | Blackthorn: sloe gin and London dry always 60 ml between them, dry vermouth | draft | nuts |

## The last three, in brief

- **Just This Once (outlaw).**
  - Tagline: "You don't get away with things. You get let off. That's better."
  - Story: Simon Ford, Plymouth's ambassador, kept holding the dinners after the budget was cut, and he was kept on.
  - "This is me": "You get let off, which is different: someone decided to, because it's you."
  - Edges:
    - Plymouth's 41.2% label strength is unsourced. The recipe note covers a 44% gin.
    - "Let off" is our word, and the dinners being public is our inference.
    - Ford is living, so the reading uses the past tense throughout.
  - Name: 2–1 in the vote, then Wren took *Just This Once*. Her *Hard to Dislike* is the alternative.
- **Word Gets Round (ruler).**
  - Tagline: "Nobody near you pays extra for not knowing."
  - Story: in the 2014 lime crisis, Heugel, already an owner, handed the trade's trick to readers: buy the odd-sized limes, then measure.
  - "This is me": "You put what you know on the side of the people nobody told."
  - Edges:
    - Wren's own test fails on one point (Heugel owns many bars). She waived it, since the owner still gives the trick away.
    - No page says odd-sized limes are as good as sorted ones, so the epigraph credits "a bartender".
  - Name: unanimous.
- **Tried and True (sage).**
  - Tagline: "Most of what you know, somebody told you. You still remember who."
  - Story: sloe gin made at home and handed down. No named giver exists, and none was invented. A Frant pub's world championship, in one maker's blog (secondary), had home-made entries outscoring every commercial one.
  - "This is me": "Some of what you were told turned out to be wrong, and you let those bits go quietly."
  - Name: unanimous.

## Machinery (what changed in this batch)

- **Five-round rooms throughout, with round 4 in two steps:** Wren and Tomás make every change, then Hester audits the files as they stand. Round 5 is sign-offs and the one name vote.
- **Agents file their own turns** (`room.py turn --files`), and from outlaw on they **return a one-line status instead of the whole turn.** That kept the host's context small: three pours in one sitting.
- **Hester has a cap of 2 web visits per pour.**
- **A lesson added to `closing-the-pour.md`:** re-run `assemble` right before `close`. `close` ships `_host/provisional.md` as it stands, and the name comes from Wren's title block. The ruler pour was first written from a pre-round-5 assemble, which carried the old epigraph and the working title. It was fixed the same hour and re-linted.
- **No rule candidates** from any room.

Room records: `_studio/rooms/regular-guy-*.md`. Pours: `pours/regular-guy-*.md`.
