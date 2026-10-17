# Quiet sound effects

## Second pass · 17 October 2026 (current)

Open `index.html` from disk. It plays five real moments of the journey (your
name, the quick pairs, gathering words, flavours then leaving out, writing the
sentence), each as **music only**, **first pass** and **second pass**, mixed the
way the app mixes them. The app plays the second pass under `?sfx=trial`
(development only); normal visits stay music-only until Robin approves.

**Why the first pass was replaced.**
- **Material.** Measured, the Glass Chords recording has no isolated struck
  notes: it is a continuous G#/D# drone with bright shimmer on top. Every cut
  was a slice of a held note with a fade-in added, so it swelled instead of
  touching, carried the drone, and stopped dead at 0.78 s.
- **Harmony.** The choice was retuned to the chord's root, which turned its D#
  into F, F# or G. F is outside the chord, and the note jumped whenever the
  harmony turned.
- **Hierarchy.** The meaningful moments were the quietest. A seal sat 20–23 dB
  under the music (effectively silent), and the name's seal was cut at its peak
  by the stage change 0.82 s later.
- **Writing.** Ink fired at most once every 1.6 s, so a five-letter name sounded
  only its first letter, and a sentence sounded at arbitrary letters.

**The family: one glass, four gestures.** It is synthesised in-house in the
score's key (A440): a near-pure glass partial set, which is how the score's own
glass measures, on D# and G#. Those are the two notes every chord in the
journey holds.

| Gesture | Sound | Where |
| --- | --- | --- |
| touch | D#5, a fingertip on the glass. When words are gathered (H5, H6), each one climbs a tone of the chord sounding (D#, G#, A#, D#; over B, D#, F#, B, D#) | lens, seed, gravity, H4 pairs, H5 words, H6 flavours, a flavour brought back |
| untouch | G#4, damped, sinking 15 cents | a word taken back, a flavour left out, going back a question |
| seal | the open fifth placed together (G#4, then D#5 24 ms later), the longest room | name, flavours, what to leave out, the sentence |
| ink | D#6 with a breath of nib, wandering between two chord tones | every stroke of the name and the sentence, softer as typing quickens, full after a pause |

**Engine changes** (`src/audio/effects*.ts`, `score.ts`):
- The gestures feed the score's depth filter and scene level, so they sit in
  the water with the music: muffled in the H7 hush, opening on the ascents.
- A stage change no longer cuts a ringing sound. The seal carries into the next
  chapter, which enters on the same D#.
- Only a repeat of the same gesture within a few tens of ms is ignored (a
  double-fire guard), so a keystroke can no longer swallow a seal.
- At four voices the oldest ring gives way; a new gesture is never the silent one.
- Each sound leans up to 30% towards where the tap was, with ±4 cents and
  ±0.7 dB of unevenness, so repeats never sound mechanical.
- Unchanged: one context and master, the Sound switch, nothing in Still Water
  (master spec), muted or hidden tabs, and late decodes dropped (180 ms).

**Levels** (`manifest-v2.json`): each sound's loudest 400 ms is set under the
median loudness of the beds it plays over (BS.1770, through the app's low-pass
at those holds): touch −17.5 dB, untouch −22, seal −16, ink −25 (first stroke;
about −35 in fast typing). Robin's first listen (17 Oct): "a bit too loud,
quieter/smoother", so every level came down 5 dB. The attacks were also
softened (touch 3.5 → 14 ms, ink 1.5 → 6 ms, seal ~40 ms), the fingertip tick
was removed, and the bright overtones were reduced.

**Reproduce:**
`uv run --with numpy --with scipy python -I render_v2.py` writes `assets/v2/`,
the app's `public/audio/effects/{touch,untouch,seal,ink}.mp3` and
`manifest-v2.json`. Then `uv run --with numpy --with scipy python -I build_player_v2.py`
writes `assets/scenes/` and `index.html`.

**Verified 17 Oct:**
- Three typechecks pass, along with 1967 unit tests (17 sound cases, including
  "every gesture is a tone of the chord sounding") and `npm run e2e` 8/8.
- In headless Chromium, desktop and phone, the app:
  - warms four files;
  - sounds all 5 letters of a name and all 26 strokes of a sentence;
  - gives H5 the sequence touch, touch step 1, touch step 2, untouch.
- Mute silences further sounds. Ordinary visits, Still Water and Sound off
  fetch nothing.
- A late decode is dropped, and missing files leave the journey working.
- A recording of the app's own output shows the name's seal ringing about 4 s,
  past the next question's arrival.
- Chrome decodes the files with no lead-in (0.1 ms).
- Measured in the scene mixes, every gesture's pitch is inside the chord
  sounding. The first pass produced F over the A# chord.

Robin's ear decides character and level. The first pass below is kept for
comparison (`assets/*.mp3`, `render.py`, `build_player.py`, `manifest.json`).
`public/audio/effects/choice.mp3` and `release.mp3` are no longer used by the
app; they can be removed with Robin's OK (copies are in `assets/`).

---

## First pass (superseded)

Robin chose **“Barely there—felt more than heard”** on 17 October 2026.
The three effects are an audition, not an accepted final sound direction.

Open `index.html` directly in a browser. Native audio players work from disk.
Each scene has an isolated sample, the music alone, and the same music with
two gestures at 2.2 and 5.4 seconds. The louder-detail control affects only
the isolated samples; the comparisons always retain the journey's mix.

The local app preview enables the trial only with `?sfx=trial` in development.
Ordinary visits and production stay music-only. The existing Sound control
owns music and effects together. No app wording, typography, H7 styling,
video timing or answer meaning changes.

## The family

| Sound | Material | Use |
| --- | --- | --- |
| Choice | A filtered glass/chord fragment, 0.78 seconds | Successful lens, seed, gravity, ember, world and flavour choices; tuned to the chord sounding |
| Ink | A high-passed fragment of the score's wash, 0.28 seconds | Name and trace writing, at most once per 1.6 seconds |
| Release | A reversed and softened fragment of the same wash, 1.1 seconds | Letting a chosen word go and sealing a written line or flavour beat |

These are musical textures, not recordings of a real nib or water. The large
splash remains the existing score's wash. No extra reveal hit or melody is
added in this pass. The sound uses one existing AudioContext and master, at
most two transient voices, with a 250 ms gap between gestures. Samples whose
decoding takes over 180 ms are dropped, not replayed late. Stage changes,
mute and backgrounding cancel queued/active effects. Still Water omits them.

## Source and reproduction

All three are derivatives of the existing **Glass Chords and Felt Key
Breathing** source, recorded in
`../../../2026-10-06-type-icons-sound/sound/RIGHTS.md`.
No third-party sample library or new generative service is used.
`manifest.json` records the exact source hash, source windows, filters,
envelopes, encoded-file hashes, measured peaks and RMS levels.

Run `python3 render.py`, then `python3 build_player.py`. Both use the Python
standard library and ffmpeg. The first writes these audition samples and the
matching app files in `public/audio/effects/`. The second writes the paired
comparisons and native-audio player. Originals are preserved.

The generated files have been checked by measurement; Robin's listening
pass determines whether their character and level are right.

## Verification · 17 October 2026

- Three typechecks: app, shared and node pass.
- `npm test`: 1960 tests pass, including 10 sound-policy cases.
- `npm run e2e`: 8/8 pass (normal journey, privacy, parity, diagnostics, gifts).
- Headless Chromium: real mouse and touch gestures produce ink, release and
  choice; long typing is spaced, and Sound off stops further effects.
- Ordinary visits, stored Sound off and Still Water fetch zero effect files.
- Delayed decoding drops a missed sound; missing files leave navigation working.
- All nine comparison clips play from disk on desktop and phone layouts.
- New audio modules pass ESLint. No changes to App.tsx, types.ts or journey CSS.
- Recorded desktop mix: mean −26.7 dBFS, peak −12.4 dBFS; no clipping.

Browser evidence (results, screenshots, actual output recordings and driver)
is in `/private/tmp/dionysus-sfx-2026-10-17/`. Asset hashes and measured levels
are in the adjacent `manifest.json`. No commit has been made.
