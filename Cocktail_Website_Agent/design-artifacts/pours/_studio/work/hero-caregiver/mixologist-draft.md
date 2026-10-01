# Tomás: drink draft, hero-caregiver (The Saviour), v1, round 6 (Checks fixed per Hester's audit v1: X5, X6; the drink is unchanged)

Spec: `_studio/specs/hero-caregiver.json` (v1). A split-core Highball from the Manhattan's family: rye and sweet vermouth in equal parts, made long with soda.

**Glassware:** tall glass (highball, about 350 ml), filled with ice
**Contains:** veto-free

## Recipe

| amount | item | note |
| --- | --- | --- |
| 45 ml | straight rye whiskey | |
| 45 ml | sweet (Italian red) vermouth | the same measure as the rye: half the weight is the vermouth's |
| 2 dashes | Angostura bitters | |
| 120 ml | soda water, cold | added last |
| 1 strip | lemon peel | |

## Method

1. Fill a tall glass to the top with ice.
2. Measure 45 ml of rye into the glass. Then fill the same jigger to the same line with sweet vermouth and pour that in too.
3. Shake in the Angostura (two dashes) and stir five or six turns with a long spoon, just to chill.
4. Top with the cold soda water, then lift the drink once, gently, with the spoon.
5. Squeeze a strip of lemon peel over the top of the glass so its oils fall on the drink, then drop it in.

**closingLine:** *Let someone get this one. Don't get the next.*

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| **Structure** | Highball (*Codex* root, pp. 199–202), split core | The *Codex* splits a Highball's core the way we do: the Americano is Campari and sweet vermouth topped with seltzer (p. 202). Here the core is rye and sweet vermouth, 1:1. The vermouth's sugar and acid are the whole balance (no syrup, no citrus juice). Seasoning: Angostura and lemon oil. The 1:1 ratio is on record: the 1880s–90s books often ran the Manhattan's whisky and vermouth one to one (Oxford, MANHATTAN pdf 1224). So "half" is true of this glass, and it has to stay 1:1 (at today's 2:1 the reading can't say "half"). |
| **Balance** | balanced (`balance.py`, style `highball`) | Base 91.6 ml at 33.5% ABV, 7.93 g sugar/100 ml, 0.295% acid, then 120 ml soda on top. **Finished: 14.5% ABV (range 10–16), 3.43 g/100 ml (0–7), 0.13% acid (0–0.6).** All in range; no edges. Rye at 50% (the table's LI value). **Sweeps (my arithmetic, same formula, no dilution before the top):** rye at 40 / 43 / 45% → 12.0 / 12.7 / 13.1% ABV, sugar and acid unchanged, all in range. Sweet-vermouth sugar from 13 to 20 g/100 ml (an unsourced spread across brands) → 2.8–4.3 g/100 ml, in range. The stir's melt isn't modelled (balance.py note); it can only pull the strength down a little, towards the middle of the range. **Rejected on paper this round:** 50 + 50 ml with 90 ml soda came out at 17.7% ABV, OUT (over 16); 45 + 45 ml with 90 ml was 16.9%, an edge. So the soda stays at 120 ml. |
| **Pairings** | rye, sweet vermouth, Angostura: the Manhattan's pairing; lemon peel for lift | The earliest known reference to the Manhattan (1882) is "whisky, vermouth and bitters" (Oxford, MANHATTAN pdf 1224). The sweet vermouth is on record from 1884: O. H. Byron printed the Manhattan both ways, once with French (dry) and once with Italian (sweet) vermouth (Oxford, MARTINI pdf 1244). Angostura is my craft call (the 1882 line says only "bitters"). Rye is my craft call too: one of the two whiskies in the Manhattan's early record (pdf 1224; Hester D4), never "the original". **Struck (Hester X5):** my round-4 citation of pdf 1221's "American Whisky, Italian Vermouth and Angostura Bitters". It comes from the 1945 Manhattan Club tale, which Oxford calls "simply not true". The 1874 dinner is never cited. Lemon, not orange: the persona's flavours are bitter, citrusy and fresh (Wren's card). **No *Flavor Matrix* spark, recorded so Robin sees the rule applied:** I looked for one that serves the split. Grain (pdf 136) and Grape (pdf 140) share honey and nuts among their best pairings (Hester's correction: I'd listed only honey). Honey is *Off Duty*'s, the Rescuer's, and that's the closest sibling, so it's set aside. Nuts (Grain's toasted nuts, Grape's walnut) would cost the veto-free row, and Grape's surprising pairings (pumpkin, capsicum, beet) don't serve the person. **What makes it interesting instead:** a Manhattan at its 1880s equal ratio, made long like an Americano. That's a drink you don't see on menus, and the split is the person (Wren r3), in plain sight in the jigger. **Fallback B (rye and ginger ale) set aside:** gingerol is "a relative of capsaicin" (*Matrix* pdf 132), so ginger counts as `spice` (heat), which would cost the family a veto-free row. |
| **Allergens** | veto-free (`allergens.py`: contains [], "declared contains matches") | Rye is a distilled grain spirit, so not `gluten` (STUDIO-RULES 4). The vermouth's wine fining is ignored (no named bottle). Angostura, soda and lemon peel are clean in the table. Counts toward the AD-4 floor. |
| **Makeable** | basic kit; everyday bottles | Glass, jigger, long spoon. Styles only, no named bottle: any straight rye (proved 40–50%) and any Italian-style sweet (red) vermouth (proved 13–20 g sugar/100 ml, unsourced spread). Vermouth is wine: once it's open, keep it in the fridge (my own knowledge, unsourced). |
| **Siblings and registry** | clear | Highball · rye · tall glass is on no registry row and no other family's reserved shape (Hero plan). Against *Off Duty* (the Rescuer): cold and long, nobody makes it for anyone, and the gesture is who *pays*, never who *makes* (Wren's guard). Against *Serviceable*: rye, not scotch; no hops. No "thirty" anywhere in the numbers (45 / 45 / 120, 2 dashes). |

## Image brief

- **Glass and drink:** a tall highball glass filled with clear ice. The drink is clear and bright, amber with a red cast: dark red Italian vermouth (*Codex* p. 72: dark, the colour from its flavourings and caramel colouring; Oxford VERMOUTH pdf 2096: Italian makers made "darker-colored, sweeter vermouth"; "red vermouths", pdf 2091) and amber rye, lightened by the soda. Fine bubbles rise along the ice. A long strip of lemon peel curls down inside the glass.
- **Props (the story in objects):** one steel jigger, standing empty beside the glass (the equal measure); two plain bone dice on the bar (the old saloon's way of deciding who paid the round: Oxford COCKTAIL pdf 490); a folded white waiter's apron at the edge of the frame (his waiters); a small paper bar tab, face down, with nothing on it.
- **One impossible detail:** one of the two dice rests on its edge, balanced, so nobody has lost the roll and nobody has to pay.
- **Must not appear:** cell bars, handcuffs, police or badges, newspapers, coins or silver, bread, red wine, rays of light breaking through, a cross, the number thirty, a second drink, any text.
- **Palette:** warm amber, white linen, dark worn wood, and one deep red note in the drink itself.

**SCENE (ready to paste):** A tall highball glass full of clear ice stands on a dark, worn wooden bar, holding a clear, bright amber drink with a red cast, fine bubbles rising along the ice and a long strip of lemon peel curling down inside. Beside it stands an empty steel jigger. Two plain bone dice lie on the bar, and one of them rests balanced on its edge, undecided. At the edge of the frame lies a folded white waiter's apron, and near the glass a small paper bar tab sits face down, blank. Warm amber light, white linen, dark wood, one deep red note in the drink.

## Names

- **Round 6, settled: *Next One's Mine*, with *I Owe You* second.** We crossed in round 5, and Wren's reason is the better one: the name is read first, so it should recognise the guest, and the closing line turns it round at the end, which is where the position belongs. That's my own lesson from the Craftsman (the closing line carries the position). So I've gone back to my pick, now on her reasoning.
- *Round 5 (superseded): I'd moved to Wren's* I Owe You*. Wren held* Next One's Mine *in round 6: the tagline already carries the turn, and read cold,* I Owe You *can sound like the bartender owing the guest.* What convinced me: my pick puts the habit on the menu, and hers puts the turn on it. A guest who orders it says, out loud, the three words the reading asks them to say, so the name is the position spoken, the way *A Brother's Care* names the person rather than the story. It's sayable across a bar ("What are you having?" "I Owe You") and makes people lean in. The closing line doesn't repeat it.
- ***Next One's Mine*** (the pick, settled by all three in round 7). It's the Saviour's own line, the one they say before anyone else can reach for a wallet. Said across a bar, it sounds like an order ("What are you having?" "Next One's Mine"), and it makes people lean in. Then the closing line turns it round ("Don't get the next"). It names the habit without praising it. The Auteur's room considered *The Next One* and didn't use it, so there's no registry clash.
- ***Owe Me One*** (Wren's, flipped): the thing they'd never let anyone say to them. Strong, but it reads as a demand when ordered.
- ***IOU*** (Wren's): the whole position in three letters. Short and sayable; a little cold for a warm pour.
- ***Even Split***: the glass itself, but it captions the drink more than the person.
- *Half Measures*: set aside. It fits the person who never does anything by halves, and the drink literally is half measures, but *Half a Rim* (the Minimalist) already opens with "Half", and name openings clash across the menu (*Still Improving* vs *Still Yours*).
