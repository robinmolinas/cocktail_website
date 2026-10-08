# "The Missing Note": a score for the whole journey, written for ElevenLabs Music

Proposal, 8 October 2026. **Outcome (same day):** take "Glass Chords" was integrated (design log, 2026-10-08). It landed in G♯, not D, and the withheld-third rule only half survived. This is a fourth music concept, alongside the three sketches in this folder. It grows out of sketch 1 (felt piano) and the glass harmonics all three share. It also keeps the locked Water & Ink arc: silence on the landing, a hush for H7, the splash as the loudest moment, and silence at the unveiling except for the nib. Nothing here is built or wired, and none of it is Robin's decision yet.

## The idea

- **One instrument made of the drink.** The signature sound is a glass organ: rubbed and bowed glasses, tuned and stacked into sustained chords. Felt piano, a solo cello, soft low strings, a very quiet organ pedal and moving liquid sit around it.
- **One harmonic rule.** Everything from the descent to the letting go is built on open fifths (D and A), with no third, so the music is neither major nor minor. The first third in the whole piece is the F♯ at the H10 reveal, and the chord turns D major. The music doesn't decide who you are until the cocktail does.
- **The ascent follows the harmonic series.** Each layer adds the next overtone of D: D, D, A, D. The next overtone after those is F♯, the note held back until H10.
- **One motif.** On felt piano: A, D, E … F♯. Through the journey only the first three notes play, hanging on the E. At H10 the motif completes.
- **Restraint.**
  - No drums, no pulse (H4 has its own clock), no brass, no trailer hits.
  - Time is measured in breaths: a swell every 8 seconds, which is two bars at 60 BPM.
  - There is one crescendo (H8), built as a tide, not a hit.

| Chapter | Sound | Layer / overtone |
|---|---|---|
| Landing | Silence. The tap is the first sound (the submerge effect). | — |
| H1 Threshold | A low D, more pressure than note, under a liquid hush | Pressure · D |
| H2 Seed | One glass tone an octave up, as the drop lands | Glass · D |
| H3 Gravity | Cellos lean in on the fifth, in slow swells like currents | Current · A |
| H4 Hidden Self | Felt piano plays the unresolved question, A–D–E, sparsely | Question · D |
| H5 A world of your own | All four layers. The glass blooms and the chord widens with a soft ninth (E). | all |
| H6 Finish | All four, lighter. High glass partials shimmer like fizz. | all, Pressure low |
| H7 Trace | Hush. Only the glass remains, a held breath while you write. | Glass only |
| H8 Breath | The rise: all layers back, plus the engine's slow swell | all, up |
| H9 Letting Go | Near-silence. A thin falling glass tone, then the splash: the loudest moment, bleaching into air | effects |
| Unveiling | Total silence, except the nib | effect |
| H10 / H11 | The motif completes: A, D, E, F♯, the first major third. The cello answers, then the music settles under the letter. | The Answer · F♯ |

## Rules for every prompt

- **Never name an artist, composer or film.** The ElevenLabs API rejects prompts that reference copyrighted artists with a `bad_prompt` error. Describe the technique instead.
- **Every part uses the same key and tempo:** D, 60 BPM. ElevenLabs says the model holds a stated key and BPM closely enough to layer outputs.
- **For the loops, state what to leave out.** Their docs put it as "the negative space is the prompt".
- **The no-third rule is the instruction the model is likeliest to ignore. Check it by ear.** If you hear a major or minor chord before the H10 cue, regenerate, or use section editing (inpainting) on that part only.

## 1. The suite: hear the whole idea in one piece (4:30)

Use this to audition and lock the sound. It cannot ship as the journey's audio: H4 is timed and H5, H7 and the wait are self-paced, so a fixed 4:30 track will drift against every guest.

### Text prompt (paste into ElevenLabs Music)

```
Instrumental only. A slow, intimate cinematic score in D, 60 BPM, no drums and no percussion pulse; time moves in long breaths, swelling every eight seconds. The signature instrument is a glass organ: wet fingers rubbed on wine-glass rims and bowed crystal glasses, tuned and layered into sustained, organ-like chords. With it: felt piano recorded close, a solo cello, low strings played softly over the fingerboard, a very quiet low pipe-organ pedal, and the sound of liquid moving. The harmony stays on open fifths (D and A) with no major or minor third until the final section. One recurring motif on felt piano: A, D, E, left hanging on the E.

0:00–0:30 Pressure. Underwater stillness: a sub-low D felt more than heard, a soft filtered liquid hush, no melody.
0:30–0:55 First light. One clear glass tone on high D, then a bowed glass fifth (A). Long decays, lots of space.
0:55–1:25 Current. Low cellos enter on D and A in slow swells that lean and recede like currents.
1:25–2:05 The question. Felt piano plays the motif A–D–E, sparse, unresolved, with silence between phrases; glass and strings sustain underneath.
2:05–2:40 A world of your own. The glass organ blooms: the chord widens with a soft ninth (E), warm and luminous, slowly turning.
2:40–2:55 Hush. Everything drops away to a single held high glass tone, almost silent, like a held breath.
2:55–3:30 The rise. All layers return and climb together in one long, patient crescendo; the motif repeats a step higher each time; the low organ pedal arrives underneath. Swelling like a tide, never a hit.
3:30–3:42 Letting go. Sudden near-silence. A thin glass tone slides slowly downward, then one bright swell peaks and dissolves into a white wash of air.
3:42–3:46 Silence. Near-total silence, only faint room tone.
3:46–4:30 The answer. Solo felt piano plays the motif complete for the first time: A, D, E, F-sharp. The first major third of the piece, D major, quiet and warm. A solo cello answers beneath it. The glass organ returns very softly and the final open D major chord rings out into silence.

Avoid: vocals, choir, drums, percussion, epic trailer hits, braams, brass, horns, electronic beats, synth arpeggios, risers, bombast, sentimentality, lo-fi crackle.
```

### Composition plan

Use this if the text prompt squashes the timings. Each section can be 3 s to 120 s long.

```json
{
  "positive_global_styles": [
    "instrumental only", "intimate cinematic score", "D", "60 BPM", "no percussion pulse",
    "glass organ of rubbed wine-glass rims and bowed crystal glasses", "felt piano recorded close",
    "solo cello", "soft low strings sul tasto", "very quiet low pipe-organ pedal", "moving liquid texture",
    "open fifths", "long breaths", "warm", "nocturnal", "restrained"
  ],
  "negative_global_styles": [
    "vocals", "choir", "drums", "percussion", "trailer hits", "braams", "brass", "horns",
    "electronic beats", "synth arpeggios", "risers", "bombast", "sentimental", "lo-fi crackle"
  ],
  "sections": [
    { "section_name": "Pressure", "duration_ms": 30000, "lines": [],
      "positive_local_styles": ["sub-low D drone felt more than heard", "soft filtered liquid hush", "underwater stillness"],
      "negative_local_styles": ["melody", "piano", "strings"] },
    { "section_name": "First light", "duration_ms": 25000, "lines": [],
      "positive_local_styles": ["one clear glass tone on high D", "then a bowed glass fifth on A", "long decays", "space"],
      "negative_local_styles": ["melody", "third", "piano"] },
    { "section_name": "Current", "duration_ms": 30000, "lines": [],
      "positive_local_styles": ["low cellos on D and A", "slow swells that lean and recede", "open fifths"],
      "negative_local_styles": ["melody", "third"] },
    { "section_name": "The question", "duration_ms": 40000, "lines": [],
      "positive_local_styles": ["felt piano motif A D E", "sparse", "unresolved, hanging on E", "silence between phrases", "glass and strings sustain underneath"],
      "negative_local_styles": ["F", "F-sharp", "major chord", "minor chord", "left-hand bass line"] },
    { "section_name": "A world of your own", "duration_ms": 35000, "lines": [],
      "positive_local_styles": ["glass organ blooms", "chord widens with a soft ninth E", "warm, luminous", "slowly turning"],
      "negative_local_styles": ["third", "pulse"] },
    { "section_name": "Hush", "duration_ms": 15000, "lines": [],
      "positive_local_styles": ["single held high glass tone", "almost silent", "a held breath"],
      "negative_local_styles": ["piano", "strings", "organ", "bass"] },
    { "section_name": "The rise", "duration_ms": 35000, "lines": [],
      "positive_local_styles": ["all layers return", "one long patient crescendo like a tide", "motif repeats a step higher each time", "low organ pedal arrives"],
      "negative_local_styles": ["hit", "impact", "drums", "third"] },
    { "section_name": "Letting go", "duration_ms": 12000, "lines": [],
      "positive_local_styles": ["sudden near-silence", "thin glass tone sliding slowly downward", "one bright swell dissolving into a white wash of air"],
      "negative_local_styles": ["melody", "drums"] },
    { "section_name": "Silence", "duration_ms": 4000, "lines": [],
      "positive_local_styles": ["near-total silence", "faint room tone"],
      "negative_local_styles": ["music", "notes"] },
    { "section_name": "The answer", "duration_ms": 44000, "lines": [],
      "positive_local_styles": ["solo felt piano plays motif A D E F-sharp", "first major third, D major", "quiet and warm", "solo cello answers beneath", "glass organ returns very softly", "final open D major chord rings out"],
      "negative_local_styles": ["crescendo", "strings section swell", "sentimental"] }
  ]
}
```

## 2. Production parts: the score the app plays

These are the same score, cut into parts the app can layer live.

### The Depths stems (H1–H8)

Four stems. Each one must be **exactly 128 s (32 bars at 60 BPM)** so they loop in lockstep. Generate each at about 2:15, then trim to 128.000 s on a bar line and seam-check it as with the October sketches.

**Pressure** (H1 on):
```
Instrumental only. A seamless ambient loop, 128 seconds, 60 BPM, in D. No intro, no ending, constant level throughout. A sub-low drone on D, dark and felt more than heard, under a very soft filtered liquid hush, like being deep underwater inside a glass. A slow breathing swell every eight seconds. No melody, no chords, no third.
Avoid: drums, percussion, melody, piano, strings, vocals, risers, fades.
```

**Glass** (H2 on; alone in H7):
```
Instrumental only. A seamless loop, 128 seconds, 60 BPM, in D. No intro, no ending, steady level. Solo glass organ: wet fingers rubbed on wine-glass rims and bowed crystal glasses, sustained tones on D and A only, overlapping slowly, long decays, lots of space. Pure open fifths, no third, no melody.
Avoid: drums, percussion, piano, strings, vocals, synth pads, risers, fades.
```

**Current** (H3 on):
```
Instrumental only. A seamless loop, 128 seconds, 60 BPM, in D. No intro, no ending, steady level. Solo low strings: cellos and violas played softly over the fingerboard, sustained D and A in slow swells that lean in and recede like currents, one swell every eight seconds. Open fifths only, no third, no melody.
Avoid: drums, percussion, piano, violins, vocals, brass, crescendo, fades.
```

**Question** (H4 on):
```
Instrumental only. A seamless loop, 128 seconds, 60 BPM, in D. No intro, no ending. Solo felt piano recorded close, soft and intimate, the felt and hammers audible. A three-note motif, A, D, E, played slowly once every sixteen seconds with silence between phrases, sometimes an octave higher, always left hanging on the E. Only the notes D, E and A. No chords, no bass line, no third.
Avoid: drums, percussion, strings, pads, vocals, reverb wash, arpeggios, fades.
```

How the layers change through the journey (a proposal for the experience owner):

| Chapter | Layers playing |
|---|---|
| H1 | Pressure fades in over the descent |
| H2 | Glass joins |
| H3 | Current joins |
| H4 | Question joins |
| H5–H6 | All four. In H6, Pressure is lowered. |
| H7 | Glass alone, at the existing `hush` level |
| H8 | All four, rising with the existing `surfacing` move |
| H9 | Fade to silence under the falling drop |

- **Still Water** keeps the stems and drops the effects.
- **The current `sound-engine.js`** plays one looping buffer. Stems need a small extension: start all four buffers at the same `when`, with one gain per stem per scene. That integration belongs to the audio owner in `App`.

### The Answer (H10 and H11)

```
Instrumental only. 60 BPM, D major, about 2 minutes 30 seconds, beginning from silence. 0:00–0:30: solo felt piano plays a four-note motif, A, D, E, F-sharp, slowly; then again with a soft D major chord beneath it, the moment of resolution, quiet and warm. 0:30–0:52: a solo cello answers with one long sustained line beneath. 0:52–2:30: a gentle, steady bed for reading: soft glass organ sustaining D major, the felt piano placing the motif once every twenty seconds, very low level, no build and no ending, constant level so it can loop.
Avoid: drums, percussion, vocals, choir, brass, crescendo, sentimentality, risers, fade-out.
```

Play 0:00–0:52 once, then loop the tail. One option is 0:52–2:28, which is 96 s, or 24 bars.

### Sound effects

These are for ElevenLabs Sound Effects, not Music.

- **Submerge** (the landing tap):
  ```
  A soft, close underwater submerge: a warm, muffled gulp of liquid as a glass is gently dipped. No splash. 2 seconds.
  ```
- **The drop and the splash** (H9):
  ```
  A single drop falling into a still cocktail in a crystal coupe: a thin, high glass tone gliding downward for one second, then one clear, close liquid splash with a crown of droplets, then a soft airy wash fading out. 5 seconds.
  ```
  The app places the impact on the video's splash frame, which is about 2.65 s into H9 (`RELEASE_HOLD_MS` plus `RELEASE_FALL_MS`). Measure the impact offset in the file once it is generated.
- **The nib** (the unveiling):
  ```
  A fountain-pen nib writing a short name on heavy cotton paper, slow and intimate, close-miked, in a quiet room. 3 seconds.
  ```

## Rights

Before anything ships, apply the record in [PRODUCTION-AND-RIGHTS.md](PRODUCTION-AND-RIGHTS.md):
- confirm the ElevenLabs plan covers commercial use;
- keep the prompt, account and download date with each file;
- keep the file hashes in `sound/RIGHTS.md`.
