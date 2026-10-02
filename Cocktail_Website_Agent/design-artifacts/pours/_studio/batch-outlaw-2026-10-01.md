# Batch outlaw: summary for Robin

The batch ran from 2026-09-30 to 2026-10-01: eleven pours, each in its own room, after the family plan was written (`plans/outlaw.md`). It ran headless, so you weren't asked anything along the way. **Ten pours are drafts and one is flagged.** Every pour lints with 0 errors. Every room closed with three sign-offs and no open objections. Nothing is approved; review the pours at the review desk (`dps-review-desk`).

**Rounds:** the round limit changed three times during the batch.
- Caregiver started on 7 rounds and switched to 6 after round 2.
- Creator, regular-guy and explorer ran on 6.
- Hero ran on 5 from round 4.
- Innocent, jester, lover, magician and ruler ran on 5.
- Sage ran on the new process: 4 rounds, with turns written straight to file by the agents, status-line returns, and round 4 split into four steps.

## Flags and edges first

**Flagged: your call**
- ***Where You Stand* (outlaw-regular-guy): balance is OUT on acid, by the room's choice.**
  - The drink is Embury's CANADIAN: whisky, curaçao, bitters and maple.
  - It reads OUT only under `stirred`, whose acid floor assumes vermouth.
  - Accept the OUT, or ask for a drink that is honestly in range. A rule candidate below would settle the case.

**Not veto-free (5 of 11)**
- ***In One Piece* (caregiver): contains spice.**
- ***Whoopee* (explorer): contains nuts.**
- ***With the Bite In* (jester): contains nuts, because a shared row was reclassified.**
  - In this room, Tomás reclassified the shared `coca_cola` row in `dps-tools/data/ingredients.json` as `nuts`. His reason: two published historical 7X formulas contain nutmeg oil, which Coca-Cola denies. He took the safe side.
  - **This affects another family.** *The Way It Felt* (innocent-creator) uses cola and still says veto-free in its own file. I didn't edit it.
  - From the sage room on, the process forbids reclassifying an existing row. The agent proposes the change and the host flags it.
- ***Before It Had a Name* (ruler): contains nuts, by the room's choice.**
  - The spark is quince paste. A plain membrillo of quince, sugar and lemon carries "May Contain: Tree Nuts".
  - **A veto-free fallback is ready and needs no new room.** It uses 7.5 ml syrup and 10 ml cold water in place of the paste, and its balance is checked (`work/outlaw-ruler/mixologist-fallback.json`). Its replacement drink paragraph (y4) is written and audited in `psychologist-alternatives.md`.
  - Wren says the story doesn't need the quince, so this is a real choice.
- ***Hear Me Out* (sage): contains nuts and egg white.**
  - The amaretto is the story: it is Morgenthaler's drink. The plan flagged this from the start.

**Other edges**
- ***Rent-Free* (lover): strength is an EDGE at 9.4%, by the room's choice.** The drink is dry California white and soda. The only fix that came in range added brandy beside the wine, and the room struck that as the story told backwards.
- ***Can't Watch* (hero): a library gap.** The *Lagos Daily Times* of 14 Sept 1968, p. 3, is cited secondhand and wasn't read.
- **The "who you are" text runs long (lint warning only):** *Can't Watch* at 196 words and *For Its Own Good* at 206 words, against examples of about 90–150. Both were left as signed.
- ***For Its Own Good* (magician): a second name for you.** The room picked *For Its Own Good*. *In Support* is offered as the second choice.
- **Dated endings to re-check before publishing:**
  - *Before It Had a Name*: Anchor's comeback was promised but not pouring as of autumn 2026.
  - *Kept*: the Chartreuse supply cap.

## The eleven pours

| pairing | name | tagline | "this is me" |
| --- | --- | --- | --- |
| outlaw-caregiver (The Gentle Giant) | In One Piece | You never need to raise your voice. Everyone knows you could. | You decide it, again and again, and you've never told anyone how often. |
| outlaw-creator (The Rule Breaker) | Asked In | Nobody had to let you. It was good before they did. | It's the yes you don't trust. |
| outlaw-regular-guy (The Gangster) ⚑ | Where You Stand | You know how things really get done. You also know what you'll never do. | They may not know exactly where the line is. They know you won't cross it. |
| outlaw-explorer (The Thrill Seeker) | Whoopee | You'll jump off almost anything. As long as it was your idea. | The drop is the one kind of helpless you choose. |
| outlaw-hero (The Maverick) | Can't Watch | It's rarely your fight. That's never once stopped you. | Some of it is for you. |
| outlaw-innocent (The Adolescent) | Kept | You can smell a fake from across the room. The real thing, too. | You never got used to it. |
| outlaw-jester (The Subverter) | With the Bite In | Said straight, they'd stop you. So you make them laugh. | Put plainly, it would be stopped. |
| outlaw-lover (The Fugitive) | Rent-Free | You love like it's a getaway. Even where you stop is a hideout. | The road running out has never scared you. Being parked does. |
| outlaw-magician (The Disrupter) | For Its Own Good | Everyone else keeps it going. You love it enough to end it. | You only ever break the things you love. |
| outlaw-ruler (The Leading Edge) | Before It Had a Name | Everyone sees the rebel. Nobody sees the plan. | People see the rebel. They don't see the plan. |
| outlaw-sage (The Devil's Advocate) | Hear Me Out | You'll argue the other side. Sometimes it's even yours. | An idea nobody has argued with hasn't been tested. |

## What the rooms found hard

- **The plan's lead story was replaced in three rooms** because it failed on what came after the page or on the person's own words. Each time, a better story was found inside the same room.
  - *Kept*: Vogler's bars had all closed by 2025, he had launched his own label and a canned vodka soda, and wage-theft claims had been reported. The story became the Carthusians' cap on Chartreuse.
  - *With the Bite In*: Mencken was struck, because his deliberate arrest is *Can't Watch*'s shape and his posthumous diary punches down. The story became Lord Invader's "Rum and Coca-Cola".
  - *For Its Own Good*: Spurrier said "I thought I had it rigged for the French wines to win". The story became Gaja's 1996 declassification.
- **Outlaw stories pull towards villains and glamour.** The rooms kept the readings off punk, money as glamour and anyone's grief, and kept every "first" and "best" as the source's own claim.
- **The balance ranges assume a spirit base.** Three drinks fell outside them by design: a spirit-only stirred drink with no acid (regular-guy), a wine highball (lover), and a sour whose printed recipe reads OUT on paper (sage, where the glass is the room's own version).
- **Shared rows.** One reclassification (cola) reached into another family. From then on the process forbids it.
- **Host slips, each recorded in its room:**
  - hero: an OUT guessed before the numbers, and "of 6" said instead of 5;
  - innocent: asked Hester to source a note of yours;
  - jester: held Hester's audit back until v3;
  - sage: a config typo, caught by lint.

## Menu view (non-binding)

- **Codex families:**
  - highball 3 (caregiver, jester, lover)
  - old-fashioned 4 (creator, regular-guy, innocent, magician)
  - martini 1 (hero)
  - sidecar 1 (ruler)
  - daiquiri/sour 2 (explorer, sage)
- **Base spirits:** cognac, Scotch, Canadian whisky, sloe gin, ogogoro with gin, Armagnac, rum, California white wine, grappa, rye, and amaretto with bourbon. No two pours share a base.
- **Styles:** 1 wine highball (*Rent-Free*) and 1 with egg white (*Hear Me Out*).

## Rule candidates raised (in `rule-candidates.md`, open for you)

- **A stirred-spirit balance style**, with stirred dilution and no acid floor (regular-guy).
- **A wine-highball balance style**, or a note that `highball`'s 10% floor assumes a spirit base (lover).
- **Flag drift between a pour's `contains` and `allergens.py`**, and decide whether a shared row may be reclassified from another family's room (jester, cola).
- **Whether a precautionary "may contain" label classes an otherwise plain ingredient as the allergen** (ruler, quince paste).
