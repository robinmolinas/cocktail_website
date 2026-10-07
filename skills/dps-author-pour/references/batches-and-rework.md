# Batches, Rework, Resume

Paths: `{pours}` = `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours`, `{studio}` = `{pours}/_studio`, `{tools}` = `{project-root}/skills/dps-tools/scripts`. Use `{communication_language}` with Robin, and `{document_output_language}` in files.

## A batch (`batch <primary>`)
A batch is the unauthored pairings sharing one primary archetype: `python3 {tools}/persona.py --list --primary <Primary> --status`. Siblings are authored together on purpose: Wren's swap test works best when the family's other readings exist, so each new room can read the ones just written.

- Add a batch row to `{studio}/index.md` (`in progress`, the pairings, the date) before the first room opens.
- **Write the family plan first** (`references/family-plan.md`, Robin 2026-09-30): Wren and Hester plan a lead and a backup story for every pairing with Wren's story tests stated up front, and Tomás reserves drink directions and bottles. That catches sibling collisions once, before any room opens. Rooms then start from their row.
- **One conversation per family** (Robin 2026-09-30): Robin may run several families at once, each in its own conversation. Read "Several families at once" in `references/the-room.md` (claims, shared files, `/compact` between pours).
- Run one room per pairing (`references/the-room.md`, then `references/closing-the-pour.md`). **Each pour gets a fresh room with three fresh agents.** Their memory carries over through their sanctums and the studio files; their conversation doesn't, which keeps each room clean and small. Run `registry.py --write` between pours (`room.py close` does it). **Keep the host small:** unattended, one fresh session per pour (`resume --one` via `scripts/run_unattended.sh`); interactive, ask Robin to run `/compact` between pours (see "Keeping it lean" in `references/the-room.md`).
- A flagged or deadlocked pour doesn't stop the batch. Note it and move on.
- **At the end**, write `{studio}/batch-<primary>-<date>.md`:
  - each pour's name, tagline and "this is me" line
  - flags and edges, first
  - what the room found hard
  - the family's menu view (non-binding)
  - rule candidates raised

  Mark the index row `done`. Interactive: walk Robin through it and point him to `dps-review-desk` for reading, editing and approval. Headless: return `{"status": "complete", "batch": "<summary path>", "flagged": [<pairings>]}` only.

## Rework (`rework <pairing>`)
Robin's review sends a pour back with notes, and sometimes with his own direct edits already in the pour file.
- **His notes** come from the newest `## Robin's review, <date>` section at the top of the room record (written by the review desk's sync; a `rework queued` row in `{studio}/index.md` points to it) or from what he says in chat.
- **His direct edits are his words:** the review desk logs them at the top of the room record (before → after). They're kept verbatim and never changed back. If the room thinks an edit breaks something (an unsourced fact, a rule), it says so as a note for Robin and leaves the text alone.

Reopen the same room record: add a `## Rework, <date>` section, set `mode: rework` and `status: open`, and open with Robin's notes quoted as `👤 **Robin (review):** …`. They're the room's first constraint. The budget is 4 rounds (round 4 in four steps) unless Robin sets another in his notes: pass it as `room.py open … --mode rework --rounds N` and tell the agents "Round n of N". Stand up three fresh agents (the same prompt as in `references/the-room.md`). The room answers each note, in turns, and changes what it must. The pour goes back to `status: draft`. Sign-offs are needed again, and the fact audit, resonance test and lint are always rerun, even if only one line changed. Close as usual, and add a **What changed** list to the summary: each note → what the room did.

## Resume (`resume`)
Look for unfinished work: batch rows `in progress` and `rework queued` in `{studio}/index.md`, and room records with `status: open`.
- **An open room:** stand up three fresh agents with the usual prompt. They catch up by reading the feed, then take the room from the last round in its header.
- **A batch in progress:** finish its open room, then continue with its remaining unauthored pairings.
- **A queued rework** (from the review desk): run `rework <pairing>` for each pairing in the row, then mark the row `done`.

Tell Robin what you found before resuming, unless headless.

### One pour only (`resume --one`)
Used by `scripts/run_unattended.sh`, which runs one fresh headless session per pour, and by Robin when he wants one chat per cocktail. Do exactly one step, then stop:
1. **An open room** (`status: open`): stand up three fresh agents and finish it from the round in its header (they catch up through `brief.py`, which includes the room so far). Close it.
2. **Otherwise, the batch in progress** in `{studio}/index.md`: if its family plan (`{studio}/plans/<primary>.md`) doesn't exist yet, write it (`references/family-plan.md`) and stop; that's the step. If it exists, open a room for the batch's next unauthored pairing (in the row's order), run it and close it.
3. **A batch with nothing left** (every pairing authored): write its summary (above), mark the row `done`, then add the next family's batch row from the **Queue** line in `{studio}/index.md` and stop, without opening a room. The next run starts its first pour.
4. **The queue is empty:** stop.

Standing notes for every room opened this way: open it with `--note "The spark rule (STUDIO-RULES check 3): use the Flavor Matrix to find something original; riff only when the riff adds something to the person."` and a `--menu` line of the Codex family counts from `{studio}/menu-assessment.md` ("non-binding; never steers a drink").

Headless: end the session with exactly one line, `DPS-RUN: {"status": "<poured|flagged|planned|batch-done|queue-empty|blocked>", "pairing": "<pairing or null>", "note": "<one short sentence>"}`. `blocked` means something only Robin can fix (a missing file, a tool that won't run). Say what in `note`, and change nothing else.

## Not yet
House pours (the side-door readings, spine AD-8) will use the same room with different inputs. They're not part of this skill yet.
