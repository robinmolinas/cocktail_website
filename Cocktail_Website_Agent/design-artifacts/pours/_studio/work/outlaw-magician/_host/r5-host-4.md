🕯️ **Host:** Close-out lint, still round 5. `room.py assemble` reports two errors, and the room can't close until they're cleared:
1. `ERROR anchor 'guard' needs both fact and meaning`. This is Hester's: one of the two `guard` rows in `historian-anchors.md` is missing a meaning in its own column (rows 10 and 16; row 16 looks like a rule with no fact). The fix is either to fill both columns or to move guards out of the anchor table into the notes.
2. `ERROR [whoYouAre] one bartender speaks: 'I', not 'we'`. This is Wren's: the lint catches the opening quote, "but we've always done it like this", even though someone else says it. The fix is to reword it so no "we" appears, for example "but it's always been done like this".

Neither fix is meant to change a fact or anything in the drink. Each owner fixes in place and says whether their sign-off stands. The others' sign-offs stand under the lint-only rule.
