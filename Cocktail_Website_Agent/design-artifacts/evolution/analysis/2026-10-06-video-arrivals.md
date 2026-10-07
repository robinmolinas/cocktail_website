# Video arrivals: why the holds feel abrupt (2026-10-06)

Analysis only. Nothing under `dionysus-experience/src` or `public/` was touched. Candidates are in `design-artifacts/evolution/prototypes/video-arrivals/`.

## Verdict

**Mostly the footage, plus a smaller runtime twitch, and the overlay timing makes it more noticeable.**

1. **Footage (primary cause).** At every hold the camera is still at full speed when the freeze lands. At five of the eight holds it is actually speeding up into the stop (×1.04 to ×1.44 of its speed 0.5 s earlier). The other three are slowing only slightly (×0.77 to ×0.88), which is nowhere near zero. The freeze cuts from 50 to 340 times the "frozen" motion level down to zero in a single frame. That is a hard stop, and no runtime trick allowed under the locked rules can soften it. The 06-12 log entry already named this ("a hard start+stop: native 1× jumps to full speed and halts instantly"). That fix was then attempted with `playbackRate`, which is now ruled out.
2. **Runtime (secondary).** In real Chromium, `playUntil` pauses less than one frame late (0.1 to 8.6 ms). But at **RESONANCE, FINISH and SURFACE_CUT** it deterministically shows one frame *past* the hold and then snaps one frame back (3/3 runs each). That puts a backward twitch right on the stop, and it happens at the two fastest holds. RESONANCE also freezes on the wrong frame: setting `currentTime = 8.2` on the ms-stamped WebM shows 8.166.
3. **Overlay timing (makes it worse).** At GRAVITY, RESONANCE, FINISH and TRACE the question starts fading in on the exact frame the camera stops, so the stop and the text land together. At SEED, HIDDEN and BREATH there are 0.4 s, 0.9 s and 1.1 s of dead stillness first. At HIDDEN, the hardest stop (accelerating ×1.44 in the second-fastest stretch of film) is followed by 0.9 s with nothing else on screen, so the stop is fully exposed.

Also found: **the footage itself judders all the time.** `journey.mp4` and `journey.webm` are about 24 fps material padded to 30 fps. There are 93 exact duplicate frames, one every 4 to 6 frames, so every ~160 ms the image holds for 66 ms. This is not the arrival problem. It is probably why slowing the footage down "read as lag", because a slowed-down judder is a bigger judder.

## Method

- **Probe.** `ffprobe` was run on both sources. Chrome and Firefox play **`journey.webm`** (VP9, 2560×1440, 30 fps, 453 frames, every frame a keyframe, ms timestamps, 14.5 MB), because it is the first `<source>`. Safari and iOS play `journey.mp4` (H.264 High, 1920×1080, 30 fps, 453 frames, B-frames, faststart already on, 9.9 MB). The MP4 has **only 5 keyframes: 0, 2.767, 8.700, 11.433, 13.200 s.**
- **Motion energy.** Both files were decoded to 320×180 grey, and I took the mean absolute luma difference between consecutive frames (0–255 scale). "Velocity" is the sum over 0.2 s windows. Duplicate frames show up as ≈0.05, which I use as the "frozen" level. The two sources give the same numbers to within 1%.
- **Runtime.** A frozen worktree of HEAD was served on :5182 and driven with Playwright 1.60 in full Chromium (new headless, no dropped frames: frame gaps stayed at 33.5 to 34.3 ms).
  - Instrumentation: `pause`, `play` and the `currentTime` setter were hooked, plus `seeking`/`seeked` events, and `requestVideoFrameCallback` logged every presented frame's `mediaTime`.
  - Real flow measured: arrival→DEPTHS, lens pick→SEED, seed pick→GRAVITY.
  - All 9 targets were also replayed 3× with an exact copy of `playUntil`, starting 1.2 s before each hold, then again with a rVFC-based pause for comparison.
  - The old headless-shell run (software decode, dropped frames) was thrown out as unrepresentative.
  - Server and worktree were removed afterwards.
- **Overlays.** Read from `TheDepths.tsx` (`playUntil(..., () => setStage(x))` call sites and the arrival effects) and `index.css` (`.hold-q` heroFadeUp 0.8 s, `.hold-hint` +0.45 s, `.sphere-btn` sphereIn at `--d`, `.q-rise`, `.depth-line`, `.trace-input-row`).

## Per-hold table

Motion values are mean |ΔY| per real frame, measured on the WebM. "−0.5 s" is the average over frames −18…−12 before the hold; "arrival" is the average of the last 3 real frames. The frozen level is ≈0.05.

| Hold | Time | Motion −0.5 s → arrival | Overshoot (pause late) / snap measured | Overlay entry, relative to the freeze | Diagnosis |
|---|---|---|---|---|---|
| DEPTHS | 0.6 | 2.5 → 2.6 (×1.04) | 0.1–6.5 ms. Frame lands clean in synthetic runs; the real arrival once showed 0.633, then snapped back 1 frame | `.depth-line` starts at 0 ms (full by ~490 ms); the arrival is still under the `.depth-veil` black (2 s fade from 0.15 s) | Hard stop, but slow and mostly hidden by the veil. Minor |
| SEED | 1.5 | 3.3 → 3.8 (×1.16) | 1–8 ms, clean | Ring `.q-rise` with **0.4 s delay**, so 0.4 s of dead still first | Hard stop while accelerating, then a gap |
| GRAVITY | 3.1 | 5.3 → 6.6 (×1.24) | 1–8 ms, clean (one real-flow seek took 424 ms, invisible because the frame is held) | `.hold-q` at **0 ms**, hint +450 ms | Hard stop while accelerating; text pops on the stop frame |
| HIDDEN | 5.7 | 11.9 → 17.2 (×1.44) | 0.3–8 ms, clean | **900 ms of nothing** (`hStage 'intro'`), then the practice prompt; hint +900 ms after that | **Worst stop:** fast and accelerating, then fully exposed |
| RESONANCE | 8.2 | 14.9 → 13.2 (×0.88) | ~7 ms late. **Shows 8.200, then snaps back to 8.166, 3/3.** The float `8.2` floors to the previous ms-stamped WebM frame, so it freezes one frame early | `.hold-q` at 0 ms, hint +450, spheres 380 + 95i ms; both night veils *start* fading (1.4 s / 1.8 s) at the freeze | Fastest stop, plus a back-twitch, plus the brightest frame darkening only *after* the stop |
| FINISH | 9.4 | 11.4 → 8.8 (×0.77) | 2–9 ms late. **Shows 9.433, then snaps back to 9.400, 3/3** | `.hold-q` at 0 ms, hint +450, flavour spheres start rising at once | Fast stop plus a back-twitch |
| TRACE | 10.7 | 4.7 → 3.7 (×0.80) | 4–6 ms, clean | `.hold-q` at 0 ms, hint +450, input fade 1 s @ 450 ms | Moderate stop; text on the stop frame |
| BREATH | 11.9 | 3.1 → 2.5 (×0.81) | 0.2–2.5 ms, clean | `BREATH_STILL_MS` 1100 ms of stillness (intended) | Slow stop; the closest to a natural landing |
| SURFACE_CUT | 12.95 | 8.3 → 15.5 (×1.9) | **Shows 12.966, then snaps back to 12.933, 3/3.** 12.95 is mid-frame (frame 388.5) | Under the sink veil (`DARK_AT_MS` 380 + 1100 grow) | Hidden by the dark; the snap is harmless but sloppy |

Seek cost after the snap: 17–72 ms on the WebM (all-intra, so cheap). The held frame stays on screen while it runs, so it is not visible. On the MP4 (Safari), the same snap at RESONANCE has to decode from the 2.767 s keyframe, which is ~163 frames. That is a real decode spike exactly at arrival.

Departures mirror the arrivals. Each move starts with `play()` from a freeze and goes 0 → full speed in one frame, after a 620–1150 ms exit animation with the camera still. If Robin feels a "jolt" on leaving as well as arriving, this is the cause.

## Prototype candidates

All candidates are 1080p H.264 with faststart, a keyframe on every hold frame, and BT.709 tags. The hold frames are the original pixels (mean |Δ| 0.2–0.5 against the current hold frame, which is compression noise). They play at native 1× and freeze for real, so the easing is baked into the pixels and does not use `playbackRate` or scrubbing.

How they were made (`retime.py`):

1. Drop the 93 duplicate frames (`dup-frames-select.txt`).
2. Re-time the remaining frames to an exact 24 fps.
3. `minterpolate` (motion-compensated) to 120 fps.
4. Resample to 30 fps along a time map. Each hold's last **0.5 s of source** plays over **1.0 s** with velocity `1 − smoothstep`: it starts at 1×, ends at exactly 0, and accelerates smoothly at both ends.

The ramps contain no repeated frames; motion falls steadily to the noise floor. The 1× stretches are now evenly paced (frame-to-frame steady at 7.2–8.6, against the original 5,5,5,5,0 pattern), so the 24→30 judder is gone as a side effect. I checked full-resolution frames from the fastest stretches (falling drops, starbursts, the foam line) and found no warping, and no back-and-forth frames (a metric check found 0). Robin still needs to watch it in motion: motion interpolation can soften very thin strands.

| File | Size | What it is | Arrival motion, last 3 frames (vs ~5–15 now) |
|---|---|---|---|
| `journey-eased-arrivals-24p.mp4` (**recommended**) | 10.5 MB, 18.87 s | Eased arrivals, judder removed | 0.10–0.36 (×0.02–0.04 of the speed 0.5 s before) |
| `journey-eased-both-24p.mp4` | 11.1 MB, 20.97 s | Same, plus a 0.3 s eased departure after each hold (not after BREATH, so the splash choreography is untouched) | same |
| `journey-keyframed.mp4` | 12.0 MB, 15.1 s | Current timing re-encoded with a keyframe at every hold (Safari seek fix only). SSIM 0.995 / PSNR 51.6 dB against the current file | unchanged |

Scratch only: `journey-eased-arrivals.mp4` (original cadence) is inferior because its 1× pacing alternates 5/9. It is at `/private/tmp/claude-501/-Users-robin-molinas-Documents-GenAI-Projects/ac5d0637-1ce1-43aa-a44b-6cbe983894a0/scratchpad/cand/`.

### Proposed constants if a retimed asset is adopted

Write them as frame/30 so they always land inside a frame:

| Constant | Now | Eased arrivals (24p) | Eased both (24p) |
|---|---|---|---|
| `HOLD_DEPTHS` | 0.6 | `31/30` (1.0333) | `31/30` |
| `HOLD_SEED` | 1.5 | `73/30` (2.4333) | `82/30` (2.7333) |
| `HOLD_GRAVITY` | 3.1 | `136/30` (4.5333) | `154/30` (5.1333) |
| `HOLD_HIDDEN` | 5.7 | `228/30` (7.6) | `255/30` (8.5) |
| `HOLD_RESONANCE` | 8.2 | `318/30` (10.6) | `354/30` (11.8) |
| `HOLD_FINISH` | 9.4 | `369/30` (12.3) | `414/30` (13.8) |
| `HOLD_TRACE` | 10.7 | `423/30` (14.1) | `477/30` (15.9) |
| `HOLD_BREATH` | 11.9 | `474/30` (15.8) | `537/30` (17.9) |
| `SURFACE_CUT` | 12.95 | `505/30` (16.8333) | `568/30` (18.9333) |

Knock-on effects:
- Every ascent gets 0.5 s longer (0.8 s for "both").
- BREATH→SURFACE_CUT stays 1× (1.03 s against 1.05 s), so `DARK_AT_MS`, `DARK_GROW_MS` and `SURFACE_BLACK_HOLD_MS` still fit.
- `pickSeed`'s `after(2700, setTintPhase('memory'))` now falls 0.55 s before the GRAVITY arrival, instead of at it. That is still "during the ascent".
- The 2600 ms arrival fallback is still later than the 1.03 s DEPTHS arrival.
- `journey-poster.jpg` is still correct (same first-hold pixels).
- The **WebM must be rebuilt too**, because Chromium plays it first. Run the same pipeline from `journey.webm` (its duplicates fall at the same positions). Encode with `-c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -g 30 -force_key_frames <holds>` and check that it stays under ~15 MB. This was not rendered here (1440p motion interpolation takes about 12 minutes).

## Ranked recommendations (all within the locked rules: native 1×, true freeze, dark-to-dark)

1. **Retime the source asset** with `journey-eased-arrivals-24p.mp4` and its WebM sibling, and apply the constants above. This is the only fix for the primary cause, because the deceleration lives in the footage and not in the player. Robin should judge it in motion first, specifically (a) whether the longer ascents feel right and (b) whether the interpolated slow frames look clean on a big screen. If departures also feel abrupt, try `journey-eased-both-24p.mp4`.
2. **Switch `playUntil`'s stop detection to `requestVideoFrameCallback`.** Pause on the frame that *is* the hold, and seek only if the presented frame is off by more than half a frame, to `frame/30 + 0.25/30`. Measured in Chromium, this removed every back-snap (RESONANCE, FINISH) and every redundant seek. Keep the current rAF loop as the fallback where rVFC is missing. Sketch:
   ```ts
   const F = 1 / 30, frameT = Math.floor(target * 30 + 1e-6) / 30;
   const on: VideoFrameRequestCallback = (_n, m) => {
     if (m.mediaTime >= frameT - F / 2) {
       v.pause();
       if (Math.abs(m.mediaTime - frameT) > F / 2) v.currentTime = frameT + F / 4;
       then?.(); return;
     }
     videoRvfc.current = v.requestVideoFrameCallback(on);
   };
   videoRvfc.current = v.requestVideoFrameCallback(on); v.play();
   ```
   Even without a new asset, this alone fixes the RESONANCE wrong-frame freeze and the twitch at RESONANCE, FINISH and SURFACE_CUT. Also move `SURFACE_CUT` onto a frame (`388/30` today).
3. **Keyframe the MP4 at the holds** (Safari/iOS). Use `journey-keyframed.mp4` if the current timing stays; the retimed candidates already have them. With recommendation 2 there is usually no seek at all, but debug jumps and any residual snap stop paying a 100+ frame decode.
4. **Sequence the text against the arrival in one consistent way.** This is a design call for Robin.
   - With an eased asset, `then()` fires at the end of a deceleration, so text entering at 0 ms reads as "arriving as the camera settles". Keep that.
   - Make the dead gaps consistent: trim HIDDEN's 900 ms empty intro to about 400–500 ms, which matches SEED's 0.4 s.
   - For RESONANCE, consider starting the night veils as `ascend4` begins, so the brightest frames darken during the approach rather than after the stop.
5. **Do not** reintroduce `playbackRate` shaping or `currentTime` scrubbing. The evidence above explains why it read as lag: slowing down footage that is already 24 fps with duplicate padding multiplies the judder. The baked, motion-interpolated ease avoids that.

## Files

- Prototypes: `design-artifacts/evolution/prototypes/video-arrivals/`
  - `journey-eased-arrivals-24p.mp4` + `.json` (hold times and output→source time map)
  - `journey-eased-both-24p.mp4` + `.json`
  - `journey-keyframed.mp4`
  - `retime.py`
  - `dup-frames-select.txt`
- Scratch (motion arrays, Playwright logs `measure-newheadless.json`, `rvfc.mjs`, 120 fps intermediates): `/private/tmp/claude-501/-Users-robin-molinas-Documents-GenAI-Projects/ac5d0637-1ce1-43aa-a44b-6cbe983894a0/scratchpad/`
