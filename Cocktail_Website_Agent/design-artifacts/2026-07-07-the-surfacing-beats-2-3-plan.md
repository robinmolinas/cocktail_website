> **Historical design record — reviewed 8 October 2026.** This dated plan/review remains evidence of its iteration. The current reveal is TheReading; use current image rules and accepted later decisions for new work. Current direction: [experience specification](2026-07-08-experience-master-spec.md).

# The Surfacing — Beats 2–3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** After "there you are.", the spirit-point detaches and falls as a seed-coloured drop (beat 2); the footage resumes at 1× so the crown splash catches it, and a warm-white bloom whites out the frame before the video's own glass is ever revealed (beat 3).

**Architecture:** Everything lives in `TheDepths.tsx` as a new final stage `surface`, extending the existing breath canvas effect (the drop is drawn by the same rAF tick that draws the figure) and the existing `playUntil` video contract. The bloom is a pure-CSS overlay. A new optional `onComplete` prop fires at full white — the seam `TheSurfacing` (beats 4–5, separate plan) will attach to.

**Tech Stack:** React 19 + Vite + Tailwind v4 (utility classes + a hand-rolled CSS block per hold in `src/index.css`), canvas 2D, no test runner.

**Spec:** `design-artifacts/2026-07-07-the-surfacing-reveal-design.md`

**Project conventions that bind this plan (from `_progress/00-design-log.md`):**
- Video may ONLY be driven via `playUntil(target, then)` — native 1× play, freeze on arrival. Never `playbackRate`, never scrub.
- No chapter labels/numbers shown to the user.
- Honor `prefers-reduced-motion`.
- Verify with `npx tsc --noEmit -p tsconfig.app.json` (plain `tsc --noEmit` checks NOTHING in this repo) plus a browser pass via the dev-only debug bar.
- This folder is **not a git repository** — verification steps replace commit steps. Log every built increment in `_progress/00-design-log.md`.

**Repo root for all paths:** `Dionysus/Cocktail_Website_Agent/dionysus-experience/`

---

## Task 1: Beat 2 — The Letting Go

The spirit-point holds ~1.5s after "there you are.", then detaches and falls as a drop of the user's seed colour while the figure and caption fade. At end of fall the world is dark and still (Task 2 attaches the splash).

**Files:**
- Modify: `src/components/TheDepths.tsx`
- Modify: `src/index.css`

- [x] **Step 1: Add the H9 header comment and beat-2 constants**

In `TheDepths.tsx`, directly after the `SPIRIT_DOT` constant (line ~83), insert:

```ts
// H9 · The Surfacing — beats 2–3 (spec: design-artifacts/2026-07-07-the-surfacing-reveal-design.md)
// Beat 2 "The Letting Go": after "there you are." holds, the spirit-point
// detaches and falls as a drop of her seed colour — the colour's last
// appearance as light. Beat 3 "The Splash": the instant the drop exits the
// frame the footage resumes at 1x and the crown splash (~12.5s) catches it;
// at the splash's peak a warm-white bloom swells from the impact point and
// whites out the frame BEFORE the camera pull-back can reveal the video's
// own amber glass (locked: the only drink the user ever sees is their own).
// The video freezes at SURFACE_CUT under the bloom; TheSurfacing (beats 4–5)
// picks up from full white via onComplete.
const RELEASE_HOLD_MS = 1500;  // "there you are." held before the letting go
const RELEASE_FALL_MS = 1150;  // the drop's fall, quadratic ease-in
```

- [x] **Step 2: Add release state and refs**

Next to the existing H8 state block (`const [breathShowReveal, setBreathShowReveal] = useState(false);`, line ~580), add:

```ts
// H9 · beat 2 — the letting go
const [breathReleased, setBreathReleased] = useState(false);
const releaseAtRef = useRef<number | null>(null);
const surfaceBegun = useRef(false);
```

- [x] **Step 3: Reset release state on breath (re-)entry**

In the H8 driver effect (the one starting `// H8 · The Breath — one composed cycle of echoes…`, line ~1528), after `setBreathShowReveal(false);` add:

```ts
setBreathReleased(false);
releaseAtRef.current = null;
surfaceBegun.current = false;
```

- [x] **Step 4: Add the release trigger effect**

Immediately after the H8 driver effect, add:

```ts
// H9 · beat 2 — "there you are." holds, then the spirit-point lets go.
useEffect(() => {
  if (!breathShowReveal || stage !== 'breath') return;
  const t = window.setTimeout(() => {
    releaseAtRef.current = performance.now();
    setBreathReleased(true);
  }, RELEASE_HOLD_MS);
  return () => window.clearTimeout(t);
}, [breathShowReveal, stage]);
```

- [x] **Step 5: Fade the figure and draw the falling drop in the canvas tick**

In the breath canvas effect's `tick`, two changes.

(a) Just after `const spiritR = SPIRIT_DOT.r * figScale;`, compute the release factor and set a global fade for everything the figure owns:

```ts
// H9 · the letting go: once released, the whole frozen tableau exhales.
const rel = releaseAtRef.current;
const relT = rel === null ? 0 : Math.min(1, (now - rel) / RELEASE_FALL_MS);
const figureAlpha = rel === null ? 1 : Math.max(0, 1 - relT / 0.85);
ctx.globalAlpha = figureAlpha;
```

(The existing `ctx.globalAlpha = 1;` at the bottom of `tick` already restores it.)

(b) Just before that trailing `ctx.globalAlpha = 1;`, draw the drop on top at full alpha:

```ts
// ---- H9 · the drop: the spirit-point falls out of the world ----
if (rel !== null && relT < 1) {
  ctx.globalAlpha = 1;
  const fallY = (t: number) => spiritPt.y + (h + 80 - spiritPt.y) * t * t;
  const dy = fallY(relT);
  const ty = fallY(Math.max(0, relT - 0.06));
  ctx.beginPath();
  ctx.moveTo(spiritPt.x, ty);
  ctx.lineTo(spiritPt.x, dy);
  ctx.strokeStyle = `rgba(${sRgb}, ${0.5 * (1 - relT * 0.5)})`;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.shadowColor = seedHex;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(spiritPt.x, dy, Math.max(2.6, spiritR * 0.9), 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 250, 238, 0.95)';
  ctx.shadowColor = seedHex;
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;
}
```

- [x] **Step 6: Fade "there you are." with the release**

In the render, replace:

```tsx
{breathShowReveal && (
  <p className="breath-reveal font-playfair italic">there you are.</p>
)}
```

with:

```tsx
{breathShowReveal && (
  <p className={`breath-reveal font-playfair italic${breathReleased ? ' breath-reveal-out' : ''}`}>
    there you are.
  </p>
)}
```

- [x] **Step 7: Add the fade-out keyframes**

In `src/index.css`, directly after the `.breath-reveal` reduced-motion block (after line ~1142's section), add:

```css
/* H9 · the letting go — the caption exhales as the drop falls */
@keyframes breathRevealOut {
  from { opacity: 1; }
  to { opacity: 0; transform: translate(-50%, -6px); }
}
.breath-reveal-out { animation: breathRevealOut 0.9s ease both; }
```

(A later single-class rule replaces the `animation` shorthand of `.breath-reveal`, which is how the fade wins over the entrance animation's `both` fill.)

- [x] **Step 8: Type-check**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: clean exit, no output.

- [x] **Step 9: Browser-verify beat 2**

Start the dev server (`npm run dev`), open the app, use the dev debug bar → "Breath". Watch the full cycle (~15s with session defaults; enter a name first via H1 if answers are empty). Verify: figure draws, "there you are." appears, holds ~1.5s, then the caption fades while a bright drop with a seed-coloured trail accelerates from the glass down out of frame and the figure/motes dim to black. No console errors. The world ending dark and still is correct for this task.

---

## Task 2: Beat 3 — The Splash and the Bloom Cut

The instant the drop exits, the video plays 11.9s → 12.95s at 1× (crown splash, frozen before the pull-back), a radial bloom swells from the impact point to full white, and a whisper stub appears. `onComplete` fires at full white.

**Files:**
- Modify: `src/components/TheDepths.tsx`
- Modify: `src/index.css`

- [x] **Step 1: Add beat-3 constants**

Below `RELEASE_FALL_MS` add:

```ts
const SURFACE_CUT = 12.95;      // freeze here — the pull-back must never show the video's glass
const BLOOM_AT_MS = 450;        // bloom starts this far into the splash playback (≈12.35s, crown peak)
const BLOOM_GROW_MS = 900;      // bloom growth to full white (keep in sync with surfaceBloomGrow in index.css)
const SURFACE_WHISPER_MS = 600; // full white → whisper + onComplete
```

- [x] **Step 2: Extend the Stage union and props**

Line ~470, append `'surface'` to the `Stage` union:

```ts
type Stage = 'arrive' | 'lines' | 'name' | 'lens' | 'ascend1' | 'seed' | 'ascend2' | 'gravity' | 'ascend3' | 'hidden' | 'ascend4' | 'resonance' | 'ascend5' | 'finish' | 'ascend6' | 'trace' | 'ascend7' | 'breath' | 'surface';
```

Line ~492, add the optional `onComplete` prop:

```ts
export default function TheDepths({ answers, onUpdate, onComplete }: { answers: Answers; onUpdate: (patch: Partial<Answers>) => void; onComplete?: () => void }) {
```

(`App.tsx` stays untouched — wiring the reveal phase is the beats 4–5 plan.)

- [x] **Step 3: Add surface phase state and `beginSurface`**

Next to the beat-2 state from Task 1, add:

```ts
// H9 · beat 3 — the splash and the bloom cut
const [surfacePhase, setSurfacePhase] = useState<'film' | 'bloom' | 'white' | 'held'>('film');
```

After the `debugJump` function, add:

```ts
// H9 · beat 3: footage resumes at 1x, the crown catches her drop, and the
// bloom whites out before the pull-back can reveal the video's own glass.
const beginSurface = () => {
  if (stageRef.current !== 'breath') return;
  setStage('surface');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // spec: beats 2–4 collapse to a simple crossfade — no splash playback
    setSurfacePhase('white');
    after(700, () => {
      setSurfacePhase('held');
      onComplete?.();
    });
    return;
  }
  setSurfacePhase('film');
  playUntil(SURFACE_CUT);
  after(BLOOM_AT_MS, () => setSurfacePhase('bloom'));
  after(BLOOM_AT_MS + BLOOM_GROW_MS, () => setSurfacePhase('white'));
  after(BLOOM_AT_MS + BLOOM_GROW_MS + SURFACE_WHISPER_MS, () => {
    setSurfacePhase('held');
    onComplete?.();
  });
};
```

- [x] **Step 4: Trigger the splash from the end of the fall**

In the canvas tick, inside the H9 drop block from Task 1 — change the guard and add the completion branch so the whole block reads:

```ts
// ---- H9 · the drop: the spirit-point falls out of the world ----
if (rel !== null) {
  if (relT >= 1) {
    if (!surfaceBegun.current) {
      surfaceBegun.current = true;
      beginSurface();
    }
  } else {
    ctx.globalAlpha = 1;
    const fallY = (t: number) => spiritPt.y + (h + 80 - spiritPt.y) * t * t;
    const dy = fallY(relT);
    const ty = fallY(Math.max(0, relT - 0.06));
    ctx.beginPath();
    ctx.moveTo(spiritPt.x, ty);
    ctx.lineTo(spiritPt.x, dy);
    ctx.strokeStyle = `rgba(${sRgb}, ${0.5 * (1 - relT * 0.5)})`;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.shadowColor = seedHex;
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(spiritPt.x, dy, Math.max(2.6, spiritR * 0.9), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 250, 238, 0.95)';
    ctx.shadowColor = seedHex;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
```

(The canvas effect's closure over `beginSurface` is from the render when the effect last ran — safe: `beginSurface` only touches refs (`stageRef`, `videoRef`, `timeouts`), stable setters, and the `onComplete` prop.)

Note: when `beginSurface` sets stage to `'surface'`, the breath canvas effect (keyed on `stage`) cleans itself up and `{stage === 'breath' && …}` unmounts the breath overlay — by then the figure has fully faded (`figureAlpha` hits 0 at `relT = 0.85`), so the cut is invisible.

- [x] **Step 5: Render the surface stage**

In the JSX, directly after the `{stage === 'breath' && ( … )}` block, add:

```tsx
{stage === 'surface' && (
  <div className="surface-stage pointer-events-none absolute inset-0 z-40">
    {surfacePhase !== 'film' && <div className="surface-bloom" />}
    {(surfacePhase === 'white' || surfacePhase === 'held') && <div className="surface-white" />}
    {surfacePhase === 'held' && (
      <p className="surface-whisper font-playfair italic">the surface breaks · to be continued</p>
    )}
  </div>
)}
```

- [x] **Step 6: Add the surface CSS**

In `src/index.css`, after the H9 block from Task 1, add:

```css
/* ---------- H9 · The Surfacing (beats 2–3) ---------- */
/* The bloom swells from the splash's impact point and whites out the frame
   before the footage's own glass can be revealed. Duration must match
   BLOOM_GROW_MS in TheDepths.tsx. */
@keyframes surfaceBloomGrow {
  from { opacity: 0; transform: scale(0.1); }
  30% { opacity: 0.85; }
  to { opacity: 1; transform: scale(3.2); }
}
.surface-bloom {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 90vmax;
  aspect-ratio: 1;
  margin: -45vmax 0 0 -45vmax;
  border-radius: 50%;
  background: radial-gradient(circle, #fbf6ea 0%, rgba(251, 246, 234, 0.92) 46%, rgba(251, 246, 234, 0) 72%);
  animation: surfaceBloomGrow 0.9s cubic-bezier(0.3, 0, 0.7, 0.4) both;
}
@keyframes surfaceWhiteIn { from { opacity: 0; } to { opacity: 1; } }
.surface-white {
  position: absolute;
  inset: 0;
  background: #fbf6ea;
  animation: surfaceWhiteIn 0.45s ease both;
}
@keyframes surfaceWhisperIn { from { opacity: 0; } to { opacity: 0.65; } }
.surface-whisper {
  position: absolute;
  left: 50%;
  top: 74%;
  transform: translateX(-50%);
  font-size: clamp(1rem, 2.2vmin, 1.25rem);
  color: rgba(62, 48, 30, 0.85);
  letter-spacing: 0.06em;
  white-space: nowrap;
  animation: surfaceWhisperIn 1.4s ease 0.4s both;
}
@media (prefers-reduced-motion: reduce) {
  .surface-bloom { animation-duration: 0.4s; }
  .surface-white { animation-duration: 0.3s; }
  .surface-whisper { animation-duration: 0.4s; animation-delay: 0.1s; }
}
```

- [x] **Step 7: Type-check**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: clean.

- [x] **Step 8: Browser-verify beat 3 end-to-end**

Debug bar → "Breath", watch through: echoes → figure → "there you are." → fall → **the video visibly plays the splash** → bloom swells from the impact point → full warm white → whisper fades in. Then verify the freeze frame: in the browser console (or preview_eval), `document.querySelector('video').currentTime` must read **12.95 ± 0.08** and `paused === true` — the pull-back glass must never have been visible. No console errors.

---

## Task 3: Debug Jump, Re-entry Hygiene, and the Log

**Files:**
- Modify: `src/components/TheDepths.tsx`
- Modify: `../design-artifacts/_progress/00-design-log.md`

- [x] **Step 1: Add `'surface'` to `debugJump`**

Extend the `debugJump` signature union with `'surface'`:

```ts
const debugJump = (target: 'lens' | 'seed' | 'gravity' | 'resonance' | 'finish' | 'trace' | 'breath' | 'surface' | number) => {
```

At the top of the string-target handling (before the `holds` map), add:

```ts
if (target === 'surface') {
  if (v) { v.pause(); v.currentTime = HOLD_BREATH; }
  timeouts.current.forEach((t) => window.clearTimeout(t));
  timeouts.current = [];
  setBreathReleased(false);
  releaseAtRef.current = null;
  surfaceBegun.current = true; // don't double-fire from a stray tick
  setStage('breath');          // beginSurface's guard requires the breath stage
  beginSurface();
  return;
}
```

- [x] **Step 2: Reset surface state on breath debug re-jump**

In the existing `if (target === 'breath' && stageRef.current === 'breath')` branch, the run-nonce restart already exists; the driver-effect resets from Task 1 Step 3 cover `breathReleased`/`releaseAtRef`/`surfaceBegun` on every (re-)entry. Additionally, jumping to *any* earlier hold after reaching `surface` must clear surface phase — add to the top of `debugJump` (right after the `cancelAnimationFrame` calls):

```ts
setSurfacePhase('film');
```

- [x] **Step 3: Add the debug button**

In the dev-only debug bar, after the "Breath" button:

```tsx
<button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => debugJump('surface')}>H9</button>
```

- [x] **Step 4: Type-check and lint**

Run: `npx tsc --noEmit -p tsconfig.app.json` — expected clean.
Run: `npm run lint` — expected no new errors in `TheDepths.tsx`.

- [x] **Step 5: Browser-verify the debug path and re-entry**

(a) Debug bar → "H9": splash + bloom + whisper play immediately from the breath hold.
(b) Debug bar → "H7" after reaching the whisper: the surface overlay disappears, H7 works normally.
(c) Debug bar → "Breath" after H9: the full breath cycle replays and flows into the surfacing again.
(d) OS-level reduce-motion on (or DevTools emulation): H9 shows a plain fade to white with the whisper, no splash playback.

- [x] **Step 6: Log the increment**

In `design-artifacts/_progress/00-design-log.md`: append a Design Loop Status row —

```
| 01-celestes-descent | 1.10 | The Surfacing beats 2–3 (H9 · The Letting Go + The Splash) | built | <today> |
```

— and add a dated `###` entry at the top of the newest-first log block (below the 2026-07-07 design entry) in the established voice: what was built, choreography timings chosen (`RELEASE_HOLD_MS` 1500 / `RELEASE_FALL_MS` 1150 / `SURFACE_CUT` 12.95 / bloom 450+900ms), verification performed (tsc, currentTime check, reduced-motion pass), and open feel-checks for Robin (fall duration, bloom warmth `#fbf6ea`, whisper copy "the surface breaks · to be continued").

---

## Self-review notes

- **Spec coverage:** beat 2 (drop in seed colour, figure/caption fade) → Task 1; beat 3 (1× splash via `playUntil`, bloom before pull-back, video never shows its glass, `onComplete` at white, reduced-motion collapse) → Task 2; dev tooling + log discipline → Task 3. Beats 4–5, App wiring, persona images: explicitly out of scope (next plan).
- **Type consistency:** `breathReleased` / `releaseAtRef` / `surfaceBegun` (Task 1) are the same names consumed in Tasks 2–3; `beginSurface` defined in Task 2 Step 3 is what Task 2 Step 4 and Task 3 Step 1 call; `surfacePhase` values `'film' | 'bloom' | 'white' | 'held'` match the render conditions.
- **Known seam:** `BLOOM_GROW_MS` (TS) and `surfaceBloomGrow` duration (CSS) must stay in sync — commented at both sites.
