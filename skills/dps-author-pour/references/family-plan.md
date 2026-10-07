# The Family Plan

Written once per family, before the batch's first room. Paths: `{pours}` = `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours`, `{studio}` = `{pours}/_studio`, `{tools}` = `{project-root}/skills/dps-tools/scripts`, `{plans}` = `{studio}/plans`.

## Why (Robin 2026-09-30)
In the caregiver-sage rework, five of eight rounds went on finding a story. Most rejections were collisions with siblings: a bottle, a drink or a motif another pour of the family already had. Wren's tests for an acceptable story also surfaced one at a time, so candidates died on tests nobody had stated yet. Planning the whole family at once states the tests up front and catches the collisions once, not eleven times. Robin runs one conversation per family, several at the same time, so a plan also carries **claims** that the other families read.

**The plan is a starting point, not a verdict.** Every room tests its row against Wren's round-1 read and may overturn it. Being stubborn in the room still matters more than following the plan.

## Who
Wren and Hester plan the stories. Tomás does one pass at the end on drink directions and bottles. The host only runs the steps and checks the file is complete. The words are the agents'.

## Steps (host)
1. `python3 {skill-root}/scripts/room.py plan <primary>`: creates `{plans}/work/<primary>/` and prints the pairings and the other families' plans.
2. **Wren first, alone.** Stand her up as `dps-wren` (pass `model: "opus"` if the host isn't on Opus) with: "Family plan for <Primary>. Arrive with one call: `python3 {tools}/brief.py psychologist --plan <primary>`. Write `{plans}/work/<primary>/psychologist-sketches.md` as `references/family-plan.md` describes, then return one line: done, plus anything the host must know."
3. **Hester next**, as `dps-hester`, with the same arrival (`brief.py historian --plan <primary>`). She reads Wren's sketches and writes the plan file `{plans}/<primary>.md` (she owns it). **She writes its Claims section first**, as soon as her picks are firm, so parallel families see them early.
4. **One review each way.** SendMessage Wren: "Hester's plan is in `{plans}/<primary>.md`. For each pairing: accept, replace (say why), or take the backup. Write your verdicts into the plan's rows, then return one line." Then SendMessage Hester with Wren's verdicts: she swaps, or states her case in the row. Anything still split is written in the row as **Open:** with both cases, for the room to settle. No third loop.
5. **Tomás, one pass**, as `dps-tomas` (`brief.py mixologist --plan <primary>`): he adds a **Drink direction** line to every row and the reserved bottles and drink shapes to Claims. No numbers yet: those are the room's.
6. **Check and hand over.** Every pairing has Wren's test, a lead, a backup and a drink direction. Note the plan in the batch row of `{studio}/index.md` ("plan: plans/<primary>.md"). Interactive: show Robin one line per pairing (pairing → lead story → drink direction) and ask if he wants anything changed before the first room. Headless: go on.

Budget: about one room's worth of calls, once per family. Each agent writes its file in one go, with no rounds of chat.

## What each writes
**Wren (`psychologist-sketches.md`)**, per pairing, 6–10 lines:
- the one true thing about this person that no sibling shares, and what they hide, fear and give
- how they differ from each close sibling, including pours the family already has
- the traps (profession labels, gendered readings, puns on archetype names)
- **the story test:** what a mirror story must show for this guest to see themselves. State all of it now, for example who the story's person must face, what it must cost them, what must hold, and what is out (health, quality-only, secrets…). In caregiver-sage these tests came one per round. Here they come first.

**Hester (`{plans}/<primary>.md`)**, per pairing: a **lead** and a **backup** story. Each gets its source (book + page, tier), one line on how it passes Wren's test, and its guards (legends, conflicting sources, what may never be claimed). Rules:
- Verify on the page, not from memory. A story whose key facts aren't on the page isn't a candidate.
- No two pairings in the family share a person, a story or an ingredient-story.
- Nothing already used in the registry, or claimed in another family's plan, unless the room would own the overlap in one clause and the plan says so.
- Mirrors can be a cocktail's history, an ingredient's, or a person's (STUDIO-RULES), and niche is welcome.

**Tomás**, per pairing: the **drink direction** the story suggests, as Codex family · base · key bottle (if the story names one) · glass, and one line on why it comes out of the story rather than through a bridging ingredient. Across the family: no two siblings share the same base + family + glass; check bottles and shapes against the registry and other plans; keep an eye on the veto-free floor. Flag any row whose likely drink breaks a veto the story can't do without.

## The plan file
```
# Family plan: <Primary> (<date>)

## Claims (other families read this)
- **People:** …
- **Stories:** …
- **Ingredient stories and key bottles reserved:** …
- **Drink shapes reserved (family · base · glass):** …

## <pairing> · <Personality>
- **Wren's test:** …
- **Lead:** <story>. <source, tier>. Passes because … Guards: …
- **Backup:** …
- **Wren:** accept | replace: … | take the backup
- **Open:** (only if Wren and Hester still differ, both cases in a line each)
- **Drink direction (Tomás):** <family> · <base> · <bottle> · <glass>. From the story because …
```

## In the rooms
`brief.py` prints the family plan to every room agent, so each sees its row. **Round 1 (Wren alone)** gives the person in detail and her verdict on the row's lead story against her test. **Round 2**: Hester verifies the lead on the page or brings the backup, and Tomás gives drink ideas from the direction but writes no spec until Wren has ruled on the story. If a room overturns its row, the host adds a one-line note to the plan's row ("room chose …"), so the claims stay true for the other families.
