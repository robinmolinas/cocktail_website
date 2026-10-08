> **Exploration reference — reviewed 8 October 2026.** Type alternatives were declined; music remains open. Sample-engine behavior, prices/licences and recommendations are dated proposal evidence, not production implementation or a purchase decision. Current direction: [experience specification](../../2026-07-08-experience-master-spec.md).

# Background music: three concepts, production path, rights, integration

Status: **concept sketches for Robin to audition.** They are not production masters and are not wired into the app. I synthesised them; I could not listen to them. They are checked by measurement (seam continuity, loudness, peaks, spectrograms), not by ear. Robin's ear is the test.

## Audition

Serve this folder over HTTP (browsers block audio decoding from `file://`):

```bash
python3 -m http.server 5198 -d "Dionysus/Cocktail_Website_Agent/design-artifacts/2026-10-06-type-icons-sound"
# open http://localhost:5198/sound/player/
```

1. Tap **Sound off** (top right) to start.
2. Pick a concept.
3. Step through *Landing → Descent → H7 trace → H8/H9 reveal → H10 reading* over real captures from the app.

To hear the loop point on its own, `previews/*.seam-check.mp3` plays the last 12 s straight into the first 12 s.

## The three concepts

All three follow the plan's brief: warm nocturnal ambient, no vocals, a loose 64 BPM pulse where there is one, and room to read. Faint glass harmonics are the shared signature across all three.

| # | Concept | Character | Loop | Where it could fail |
| --- | --- | --- | --- | --- |
| 1 | **Felt piano — The Back Room** | Sparse felt piano (1–3 soft notes a bar, rests), a low root/fifth drone, glass harmonic every other chord. D minor, modal, one chord per ~19 s. | 150 s | Melody can pull attention during reading; synthetic piano is the least convincing timbre of the three |
| 2 | **Textural — Under the Surface** | Slow pad fields in D Lydian drift, a breathing "liquid" noise bed, two sub swells, irregular rubbed-glass tones, one distant felt note per chord. Almost no melody. | 156 s | May read as generic ambient; least "speakeasy" |
| 3 | **Nocturne trio — Last Orders** | Restrained jazz-adjacent: brushed time, half-note upright bass with approach notes, dark electric-piano comping, ii–V changes in D♭. | 180 s | The steady pulse is the most present; it may compete with H4's own timing |

**My recommendation to audition first:** concept 1 for the journey, provided the reading duck (below) keeps the piano under the letter. It is closest to "felt piano, faint glass" in the plan and carries the room's warmth. Concept 2 is the safe fallback if the piano distracts. If Robin likes the trio's warmth, concept 3's pulse should be tested against H4 before it is chosen.

## Technical preparation (done for all three)

- **Seamless by construction.** Every note, LFO and reverb tail is computed circularly over the loop length. Verified: the step across each loop point is an ordinary step, below the 91st percentile of all sample steps in its file.
- **Loudness.** −22 LUFS integrated, linear gain only (so the loop stays periodic). Peaks are −6.8 / −7.5 / −8.3 dBFS. The engine plays at master 0.6 and ducks further per scene.
- **Formats.** `masters/*.master.wav` is 48 kHz/24-bit, exactly one loop, and the source for any re-encode. `web/*.webm` (Opus 112 kbps, ~3 MB) and `web/*.m4a` (AAC 160 kbps, for Safari) carry 2 s of the loop's own tail before and head after. `web/loops.json` gives `loopStart`/`loopEnd`. Any window of exactly one loop length is seamless, so codec priming offsets cannot open a gap.
- **Reproducible.** `src/synth.py` and then `src/export.py` regenerate everything bit-identically.

## Sound control and transitions: proposal for the experience owner

Reference implementation: `player/sound-engine.js` (no framework, 175 lines, ports to TS by adding types). Verified in Chromium:
- no audio context before the first tap;
- loop points applied (2 s → 152 s on a 154 s decode);
- every scene target reached;
- concept swap crossfades without restarting the scene;
- a hidden tab fades and suspends, and returning restores;
- *off* mutes only the user gain;
- no console errors.

**Not verified:** the AAC/Safari path (Playwright's Chromium has no AAC) and real phones.

**One owner.** One `SoundEngine` instance, created by `App` (ARCHITECTURE-SPINE: one audio owner). Stages *report* to it with `setScene()`. Nothing awaits it, so music never gates a stage or a video arrival. If audio cannot load or is blocked, the control hides and the journey is unchanged.

**Scene map.** One song for the whole journey; changes are level and tone, never a restart.

| Journey | Scene | Level × master | Low-pass | Time constant |
| --- | --- | --- | --- | --- |
| Landing (paper world) | `silent` | 0 | — | — |
| Descent → H1–H6 | `depths` | 1.0 | 9 kHz | 1.6 s (fades in over the descent) |
| H7 trace | `hush` | 0.38 | 1.5 kHz | 2.2 s (DESIGN.md: the journey goes near-silent here) |
| H8 breath → H9 reveal | `surfacing` | 1.0 | 14 kHz | 3.2 s (a slow opening, never a hit or flash in sound) |
| H10 reading / H11 gift | `reading` | 0.55 | 5.2 kHz | 3.0 s |

**The control.**
- A hairline pill, top-right, opposite the nav mark, in the same place on every screen.
- It is the Veil pill's sibling: hairline rim, near-clear glass, tracked caps, "Sound on" / "Sound off".
- It has a four-bar glyph that settles low when off. It is static, with no pulsing and no blinking dot.
- It is a `button` with `aria-pressed`, with the house vermilion focus ring.
- The choice is remembered in `localStorage`, but audio still waits for a tap (browser autoplay policy). The "Discover my cocktail" tap counts as that gesture.
- Label typography follows whichever type direction is chosen.

**Open decision for Robin: is sound on or off by default?** Recommendation: **on at the descent**, with the control visible on the landing beforehand. The entry tap starts the music, and the guest can see how to stop it before it begins. The alternative is off until chosen. That is the safer option in offices, but most guests would never hear the music. Either way, a stored "off" is always respected.

**Tab/background.** Fade out over ~0.6 s and suspend the context; on return, resume and fade back over ~1.5 s, only if sound was on. Mobile browsers also suspend on lock; the engine resumes on the next visibility change.

## Production path for the final track

The sketches pick a *direction*. The shipped track should be produced properly from the chosen sketch. In order of preference:

1. **Commission a composer or sound designer** with the chosen sketch as a reference: a 2–3 minute loop plus the same stem split. You get the clearest rights (written assignment or exclusive licence) and real instruments.
   - **Deliverables:** a 48k/24-bit master, a loop-ready edit, stems (piano/pad/glass).
   - **Rights to ask for:** a written licence for web, social and paid promotion, worldwide and perpetual, ideally exclusive.
2. **Suno on a paid plan.** Suno's current guidance: *"Songs downloaded while subscribed are granted commercial use rights."* It also says this *"does not guarantee copyright protection"*; that depends on the country's copyright office ([Suno help](https://help.suno.com/en/articles/9601665)).
   - Generate **only while subscribed**, and keep the account, prompt and download date with the track.
   - Expect to edit a generated song into a loop yourself: crossfade at a phrase boundary, then re-check the seam. Generated songs have intros and endings and are not loop-ready.
   - Risk: you probably cannot stop others using similar AI output, and protection is unclear.
3. **Ship a refined version of these sketches.** They have no third-party rights (no samples, no models, no presets), so they are ours outright. The piano timbre would need real sampling or a commissioned performance to be production-grade.

**Rights record to keep with the selected track** (`sound/RIGHTS.md` when chosen):
- title and version;
- source (composer and contract / Suno plan, account, prompt, download date / in-house synthesis commit);
- licence scope and territory;
- whether it is exclusive;
- copyright claim, if any;
- file hashes of the shipped files.

Current sketches: in-house synthesis by `src/synth.py`, 6 Oct 2026, no third-party material.
