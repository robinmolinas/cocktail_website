import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Answers } from '../types';
import { FREQUENCY_OPTIONS } from '../data/questions';

// H1 · The Threshold — "The Quiet Depths"
// The journey footage holds at the S1 depths frame (~0.6s). Two cold-open
// lines, the bare name input, then the six lens bubbles. Committing the lens
// un-freezes time: the camera rises to the S2 seed hold (~1.5s).
//
// H2 · The Seed — "The First Drop"
// Eight suspended liqueur drops in a loose ring. Hovering one whispers its
// name and breathes its hue into the world; touching one bursts it and the
// world keeps her colour from here to the surface. Committing rises to the
// S2 gravity hold (~3.1s, the two clouds interlocked).

// H3 · The Gravity — "The Mote Between Two Storms"
// On the interlocked-clouds hold (~3.1s), the two liquid bodies take the
// poles of each polarity. A mote in her seed colour hangs between them;
// she drags it toward whichever cloud pulls her and lets go where it feels
// true. The footage stays frozen on this one hold through all five polarities
// (no per-question rise — that read as lag); the fifth answer rises to the
// bitters hold (~5.7s) at natural 1x — the chapter change is the only camera move.

// H4 · The Hidden Self — "Twin Embers"
// On the bitters hold (~5.7s, black teardrops overhead), a practice pair
// ("This" / "That", round -1, unscored) teaches the motion before nine
// "inner texture" binaries play one at a time. The practice round is three
// beats: its prompt ("Too quick to think. Trust the spirit within.")
// appears alone, the hint follows once it's had a moment to land, and only
// once an average reader would have finished both do the embers ignite in.
// Two glowing embers hang suspended — the same core language as H3's mote —
// each carrying one word, pulsing like a heartbeat. Then they start to cool:
// the pulse weakens, they shrink and dim toward a dead coal. Catch the one
// that's more you before it's gone — it flares white-hot and bursts, the
// other finishes guttering out. What cools unanswered is "a part of you the
// drink keeps secret" (the Storyteller's hidden self). The footage stays
// frozen through all nine; the
// last catch rises to the resonance hold (~8.2s). No chapter cards.

const HOLD_DEPTHS = 0.6;
const HOLD_SEED = 1.5;
const HOLD_GRAVITY = 3.1;
const HOLD_HIDDEN = 5.7;
const HOLD_RESONANCE = 8.2;
const HOLD_FINISH = 9.4;
const HOLD_TRACE = 10.7;
const HOLD_BREATH = 11.9;

// H8 · The Breath — "What the Ink Remembers" (rev 2: "There You Are")
// Atop the crown (~11.9s), the latency pocket: the LLM distillation will
// happen behind this scene, so the wait itself is staged. After a beat of
// stillness, echoes of her own journey surface one after another — short
// fragments composed from the Answers object (never the trace verbatim:
// the scenario's standing privacy rule is allusion only). As each echo
// sinks it releases a mote of light that drifts in and settles onto an
// anchor laid along the brand's own continuous-line figure — the human
// silhouette that loops inward into a cocktail glass (the nav mark, the
// hero's "Discover the Spirit Within" made literal). When the last echo
// has surfaced, one stroke draws through every anchor in a single
// unbroken motion and the spirit-point ignites inside the glass:
// "there you are." The person assembled from their own answers.
// The seam for the real engine: today distillation is instant, so exactly
// one cycle plays before the figure draws. When an agent call exists,
// hold in 'echoes' (looping a reshuffled cycle) until it resolves.
const BREATH_STILL_MS = 1100;      // arrival stillness before the first echo
const BREATH_FRAG_STAGGER_MS = 1500;
const BREATH_FRAG_LIFE_MS = 3300;  // in → hold → out of one echo
const BREATH_MOTE_AT_MS = 2350;    // when an echo's mote departs (≈ the echo starting to sink)
const BREATH_MOTE_FLIGHT_MS = 1100;
// Preset surfacing spots (percent), ordered so consecutive echoes never
// rise near one another; the centre band is kept clear for the figure.
const BREATH_SPOTS = [
  { x: 32, y: 34 }, { x: 68, y: 56 }, { x: 66, y: 30 }, { x: 30, y: 60 },
  { x: 50, y: 26 }, { x: 36, y: 72 }, { x: 70, y: 42 }, { x: 28, y: 46 },
  { x: 50, y: 70 },
];
// Keep in sync with the logo if it ever changes.
// Concept 05: The Zen Coupe (Continuous Line)
// Coordinate space: 24 × 24 (matches App.tsx viewBox). Center: (12, 12).
const SPIRIT_PATH =
  'M 7.2 20.4 C 8.4 20.4 11.28 19.68 11.28 16.8 L 11.28 13.44 C 7.2 13.44 2.88 11.52 2.88 7.2 C 2.88 6.48 3.36 6 4.32 6 L 19.68 6 C 20.64 6 21.12 6.48 21.12 7.2 C 21.12 11.52 16.8 13.44 12.72 13.44 L 12.72 16.8 C 12.72 19.68 15.6 20.4 16.8 20.4';
const SPIRIT_DOT = { x: 12, y: 9.6, r: 0.8 };

// H9 · The Surfacing — beats 2–3 (spec: design-artifacts/2026-07-07-the-surfacing-reveal-design.md,
// revised by the 2026-07-10 "one stroke of dark" pass — see
// design-artifacts/2026-07-10-h9-one-stroke-of-dark.md).
// Beat 2 "The Letting Go": after "there you are." holds, the spirit-point
// detaches and falls as a drop of her seed colour — the colour's last
// appearance as light. Beat 3 "The Sinking": the instant the drop exits the
// frame the footage resumes at 1x and the crown splash (~12.5s) catches it;
// then the dark takes the frame the same way the threshold descent does — the
// film sinks out of light under a flooding veil, fully black BEFORE the
// camera pull-back can reveal the video's own amber glass (locked: the only
// drink the user ever sees is their own; Robin 2026-07-10: no white flash —
// the journey is dark-to-dark, the reveal kindles WITHIN the darkness).
// The video freezes at SURFACE_CUT under the veil; TheSurfacing (beats 4–5)
// picks up from full black via onComplete.
const RELEASE_HOLD_MS = 1500;  // "there you are." held before the letting go
const RELEASE_FALL_MS = 1150;  // the drop's fall, quadratic ease-in
const SURFACE_CUT = 12.95;      // freeze here — the pull-back must never show the video's glass
const DARK_AT_MS = 380;         // the dark starts flooding this far into the splash (crown visible, then taken)
const DARK_GROW_MS = 1100;      // veil flood + film sink to full black (sync: surfaceSinkIn/surfaceFilmSink in index.css)
const SURFACE_BLACK_HOLD_MS = 150; // full black → onComplete. A beat, not a stop: the flow
                                   // must never read as the animation halting (Robin 2026-07-10);
                                   // the persona image is pre-decoded via onPrepare, so the
                                   // emergence starts the moment the black lands.

// H5 · The Resonance — "The Effervescence" (rev 3: fizz over ink over
// starlight)
// Robin's call, twice over: a constellation of stars never read as a drink
// (rev 1), and swapping the colour for her seed hue wasn't enough either
// (rev 2) — a lit point joined to another lit point by a line is star-chart
// grammar no matter what hue it's drawn in. What actually reads as a drink,
// unprompted, is the fizz. Night still falls over the burst (see the
// resonance-only veil in the render below), but the words are tiny bubbles
// suspended in the liquid; touching one catches it — it ignites in her seed
// colour and starts fizzing, a continuous stream of finer bubbles rising
// from it, not a static line to anywhere. When two or three streams are
// rising at once they drift toward one another as they climb — the
// connection is a shared current, not a wire. The third catch is a rush of
// extra fizz from their gathered centre — "the drink notices" without a
// ripple-ring standing in for it. "let it resonate" seals the question: the
// caught bubbles gather and rise together to break the surface, then the
// second word-shower falls in. After both, the camera rises to the finish
// hold (~9.4s). No time pressure here — after H4's speed, this hold is
// abundance and wonder.
// x/y are the desktop scatter (hand-placed against the 16:9 footage). mx/my are
// the portrait preset: the wide scatter collapses on a phone — words clipped the
// right edge and four pairs of tap targets overlapped, with no undo for a
// mis-tap. Each word gets its own Y band (so overlap is impossible by
// construction) and an X clamped to its own rendered width (so even "A reality
// check" never reaches an edge). Master spec §3: adapt per hold, don't letterbox.
const RES_QUESTIONS = [
  {
    key: 'drawnToward' as const,
    prompt: 'What are you most drawn toward right now?',
    words: [
      { w: 'Freedom', x: 16, y: 27, mx: 21.6, my: 24 },
      { w: 'Beauty', x: 38, y: 23, mx: 86.8, my: 28.9 },
      { w: 'Mastery', x: 60, y: 26, mx: 15.6, my: 33.8 },
      { w: 'Pleasure', x: 81, y: 30, mx: 74.2, my: 38.7 },
      { w: 'Recognition', x: 88, y: 47, mx: 38.8, my: 43.6 },
      { w: 'Knowledge', x: 70, y: 44, mx: 53.5, my: 48.5 },
      { w: 'Belonging', x: 49, y: 41, mx: 47.3, my: 53.5 },
      { w: 'Peace', x: 28, y: 45, mx: 61.1, my: 58.4 },
      { w: 'Power', x: 11, y: 52, mx: 25.8, my: 63.3 },
      { w: 'Wonder', x: 33, y: 63, mx: 84.2, my: 68.2 },
      { w: 'Change', x: 56, y: 58, mx: 12.7, my: 73.1 },
      { w: 'Mischief', x: 77, y: 62, mx: 79.2, my: 78 },
    ],
  },
  {
    key: 'soughtFor' as const,
    prompt: 'What do people often come to you for?',
    words: [
      { w: 'Advice', x: 14, y: 25, mx: 47.8, my: 24 },
      { w: 'Energy', x: 33, y: 22, mx: 58.4, my: 28.2 },
      { w: 'Protection', x: 53, y: 25, mx: 31.8, my: 32.3 },
      { w: 'Honesty', x: 73, y: 22, mx: 81.3, my: 36.5 },
      { w: 'Ideas', x: 88, y: 30, mx: 11.5, my: 40.6 },
      { w: 'Comfort', x: 10, y: 40, mx: 82.2, my: 44.8 },
      { w: 'Courage', x: 29, y: 37, mx: 28.7, my: 48.9 },
      { w: 'Taste', x: 47, y: 40, mx: 59.7, my: 53.1 },
      { w: 'Perspective', x: 66, y: 37, mx: 47.7, my: 57.2 },
      { w: 'Fun', x: 85, y: 44, mx: 54.5, my: 61.4 },
      { w: 'Leadership', x: 17, y: 55, mx: 37.1, my: 65.5 },
      { w: 'Calm', x: 36, y: 60, mx: 78.4, my: 69.7 },
      { w: 'A reality check', x: 58, y: 55, mx: 23.5, my: 73.8 },
      { w: 'A little chaos', x: 79, y: 62, mx: 77.7, my: 78 },
    ],
  },
];
const RES_MAX = 3;

// H6 · The Finish — "The Pour" (rev 4 — back to basics)
// The personality phase is over; this hold is the first time the journey
// shows an actual glass. Three beats, deliberately plain and ephemeral —
// Robin's own correction after two more elaborate passes: "keep it very
// simple." Same order as the original build: flavours first, then the
// glass, then what to leave out.
//   1. Choose the flavours — nine words, each inside a simple glassy
//      bubble (the same visual language as H1's lens bubbles: a
//      translucent sphere, no per-word colour), floating slowly upward
//      and recycling at the bottom when unclaimed. A click pops one —
//      up to three — the bubble simply bursts, nothing shoots anywhere.
//   2. Choose the glass — four full illustrations (Canvas, not buttons),
//      much larger than any prior hold's UI. A click chooses; it becomes
//      THE glass — plain, no liquid performance, just the vessel.
//   3. What to leave out — six forbidden ingredients, a plain toggle
//      list. Click to exclude, click again to include — no stroke, no
//      particles, nothing more than the toggle itself.
// Mood, from the footage's own prompts and the chapter map: H5 was vast and
// airy (an expanse to drift through); this is the opposite — quiet and close,
// everything else dark, warm rim-light the only glow, "the only lit thing
// in the room." The completed glass holds a beat, then the world dissolves
// back to the real footage and rises to the trace hold (~10.7s — H7).
const FIN_MAX_FLAVORS = 3;
// `lane` is the horizontal center each bubble rises through (evenly spread,
// with a little sinusoidal wobble added at render time) — vertical position
// is fully simulated (see finBubbleAnim), not stored here.
const FIN_FLAVORS = [
  { w: 'Sweet', lane: 8 }, { w: 'Bitter', lane: 18.5 },
  { w: 'Spicy', lane: 29 }, { w: 'Herbal', lane: 39.5 },
  { w: 'Fruity', lane: 50 }, { w: 'Citrusy', lane: 60.5 },
  { w: 'Fresh', lane: 71 }, { w: 'Floral', lane: 81.5 },
  { w: 'Smoky', lane: 92 },
];

const FIN_VESSELS: { key: string; label: string; shape: 'rocks' | 'coupe' | 'collins' | 'flute'; x: number; scales: Record<string, number> }[] = [
  { key: 'short', label: 'Short & strong', shape: 'rocks', x: 22, scales: { long: 15, carbonated: 10, complex: 70, drinkNight: 35, modern: 40 } },
  { key: 'poised', label: 'Poised & ceremonial', shape: 'coupe', x: 41, scales: { long: 20, carbonated: 5, complex: 75, drinkNight: 85, modern: 30 } },
  { key: 'tall', label: 'Tall & cold', shape: 'collins', x: 60, scales: { long: 90, carbonated: 30, complex: 45, drinkNight: 25, modern: 55 } },
  { key: 'light', label: 'Light & Sparkling', shape: 'flute', x: 79, scales: { long: 75, carbonated: 90, complex: 25, drinkNight: 20, modern: 70 } },
];
// Hand-feel writes straight into drinkScales (mixology.ts already reads these
// five keys) — no separate raw-label field, matching how gravity/selfScales/
// moodScales work elsewhere.

const FIN_VETOES = ['Egg whites', 'Dairy', 'Gluten', 'Nuts', 'Alcohol', 'Spice'];
const FIN_HERO = { x: 50, y: 33 };
const FIN_HERO_SCALE = 2.3;
// The candidate glasses stand on a shared shelf line (percent of viewport
// height) — bases aligned, labels a fixed step below — rather than sharing a
// vertical center, which left each shape's base at a different height.
const FIN_BASELINE = 54;
const FIN_REST_SCALE = 1.12;
const FIN_HOVER_SCALE = 1.2;

// H7 · The Trace — "The Still Surface" (rev 2: the depth gauge)
// On the foam-dome hold (~10.7s) the journey goes near-silent — the chapter
// map's register for this hold is a held breath, not another set piece. Two
// questions, one quiet gesture each:
//   1. Night's craft — "How often does a cocktail find you?" The dome's own
//      geometry becomes five concentric rings on a still surface: Never at
//      the rim, Exclusively at the heart, where a single drop of her colour
//      waits, pulsing. Touch a ring: one ripple of her colour rolls across
//      the surface, the other rings exhale away, and the chosen ring is
//      drawn down into the heart — the answer absorbed by the drink.
//      Rev 2, Robin's call ("not very consumer intuitive"): rev 1 scattered
//      the five labels at staggered bearings so no two stacked — which also
//      meant nobody could tell which label named which ring, or that the
//      rings were an ordered scale at all, on the footage's brightest band
//      where the hairline strokes barely survived. Now every label hangs on
//      one plumb-line dropped from the heart to the rim: a marker dot where
//      the line crosses each ring, its word beside it — a depth gauge laid
//      on the surface. Read top to bottom it's simply an ordered list
//      (Exclusively … Never); the rings stay the theatre. A local pool of
//      night behind the dial buys back the contrast the veil alone couldn't.
//   2. The trace — "Leave one trace of yourself." The journey's bookend: it
//      opened with her name on a bare line in the dark (H1), it closes with
//      one confidence on the same bare line. Each keystroke releases a mote
//      that rises and dissolves — H1's bubbles rose and froze because time
//      had stopped; here, at the end, the breath is finally let go.
// Sealing blooms once and rises to the breath hold (~11.9s), where the
// reveal work (The Breath / The Unveiling) will pick up.
// Ring values ARE the FREQUENCY_OPTIONS strings — mixology.ts branches on
// them ('Never' → zero-proof), so the contract lives in data/questions.ts.
const TRACE_RINGS = FREQUENCY_OPTIONS.map((value, i) => ({
  value,
  r: 46 - i * 8, // rim → heart
}));

// Pure glass illustrations — no component state, so these live at module
// scope. Two structural families share one drawing path: tumblers (rocks,
// collins — straight walls, rounded bottom) and stemmed glasses (coupe,
// flute — a bowl tapering to a point, then a stem and base). `interior`
// traces only the liquid cavity (bowl only, inset, no stem) for clipping.
type GlassShape = 'rocks' | 'coupe' | 'collins' | 'flute';

const glassGeom = (shape: GlassShape) => {
  switch (shape) {
    case 'rocks': return { stemmed: false as const, topHW: 32, botHW: 28, height: 58, corner: 9 };
    case 'collins': return { stemmed: false as const, topHW: 18, botHW: 16, height: 96, corner: 6 };
    case 'coupe': return { stemmed: true as const, bowlHW: 38, bowlDepth: 30, stemLen: 30, baseHW: 22 };
    case 'flute': return { stemmed: true as const, bowlHW: 15, bowlDepth: 66, stemLen: 22, baseHW: 18 };
  }
};

const traceGlassPath = (ctx: CanvasRenderingContext2D, shape: GlassShape, cx: number, cy: number, scale: number, interior: boolean) => {
  const g = glassGeom(shape);
  const inset = interior ? 4 * scale : 0;
  ctx.beginPath();
  if (!g.stemmed) {
    const topY = cy - (g.height / 2) * scale;
    const botY = cy + (g.height / 2) * scale - inset;
    const topHW = g.topHW * scale - inset;
    const botHW = g.botHW * scale - inset;
    const corner = g.corner * scale;
    ctx.moveTo(cx - topHW, topY + inset);
    ctx.lineTo(cx - botHW, botY - corner);
    ctx.quadraticCurveTo(cx - botHW, botY, cx - botHW + corner, botY);
    ctx.lineTo(cx + botHW - corner, botY);
    ctx.quadraticCurveTo(cx + botHW, botY, cx + botHW, botY - corner);
    ctx.lineTo(cx + topHW, topY + inset);
  } else {
    const topY = cy - ((g.bowlDepth + g.stemLen) / 2) * scale + inset;
    const bowlBotY = topY + g.bowlDepth * scale - inset;
    const bowlHW = g.bowlHW * scale - inset;
    ctx.moveTo(cx - bowlHW, topY);
    ctx.quadraticCurveTo(cx - bowlHW, bowlBotY, cx, bowlBotY);
    ctx.quadraticCurveTo(cx + bowlHW, bowlBotY, cx + bowlHW, topY);
    if (!interior) {
      const stemTopY = topY + g.bowlDepth * scale;
      const stemBotY = stemTopY + g.stemLen * scale;
      const stemHW = 2.2 * scale;
      const baseHW = g.baseHW * scale;
      ctx.moveTo(cx - stemHW, stemTopY);
      ctx.lineTo(cx - stemHW, stemBotY);
      ctx.lineTo(cx - baseHW, stemBotY);
      ctx.moveTo(cx + stemHW, stemTopY);
      ctx.lineTo(cx + stemHW, stemBotY);
      ctx.lineTo(cx + baseHW, stemBotY);
    }
  }
};

const glassRimY = (shape: GlassShape, cy: number, scale: number) => {
  const g = glassGeom(shape);
  return g.stemmed ? cy - ((g.bowlDepth + g.stemLen) / 2) * scale : cy - (g.height / 2) * scale;
};
const glassRimHW = (shape: GlassShape, scale: number) => {
  const g = glassGeom(shape);
  return (g.stemmed ? g.bowlHW : g.topHW) * scale;
};
const glassBaseY = (shape: GlassShape, cy: number, scale: number) => {
  const g = glassGeom(shape);
  return g.stemmed ? glassRimY(shape, cy, scale) + (g.bowlDepth + g.stemLen) * scale : cy + (g.height / 2) * scale;
};
// Draws one glass at (cx,cy): soft drop shadow, then the glass body
// (subtle material tint, stroke, a rim ellipse for the opening, a
// highlight streak where light catches the glass). Deliberately plain —
// no liquid performance. The glass is the vessel, nothing more.
const drawGlass = (
  ctx: CanvasRenderingContext2D,
  shape: GlassShape,
  cx: number, cy: number, scale: number, alpha: number,
) => {
  if (alpha <= 0.01 || scale <= 0.01) return;
  ctx.save();

  const shadowY = glassBaseY(shape, cy, scale) + 5 * scale;
  const shadowRX = glassRimHW(shape, scale) * 1.05;
  const shadowGrad = ctx.createRadialGradient(cx, shadowY, 0, cx, shadowY, Math.max(1, shadowRX));
  shadowGrad.addColorStop(0, `rgba(10,6,3,${0.34 * alpha})`);
  shadowGrad.addColorStop(1, 'rgba(10,6,3,0)');
  ctx.fillStyle = shadowGrad;
  ctx.beginPath();
  ctx.ellipse(cx, shadowY, Math.max(1, shadowRX), Math.max(1, shadowRX * 0.3), 0, 0, Math.PI * 2);
  ctx.fill();

  traceGlassPath(ctx, shape, cx, cy, scale, false);
  const bodyGrad = ctx.createLinearGradient(cx - 40 * scale, cy, cx + 40 * scale, cy);
  bodyGrad.addColorStop(0, `rgba(255,255,255,${0.03 * alpha})`);
  bodyGrad.addColorStop(0.45, `rgba(255,255,255,${0.13 * alpha})`);
  bodyGrad.addColorStop(0.55, `rgba(255,255,255,${0.13 * alpha})`);
  bodyGrad.addColorStop(1, `rgba(255,255,255,${0.03 * alpha})`);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.globalAlpha = alpha * 0.55;
  ctx.strokeStyle = 'rgba(250,244,232,0.9)';
  ctx.lineWidth = Math.max(1, scale * 0.9);
  ctx.stroke();

  const rimY = glassRimY(shape, cy, scale);
  const rimHW = glassRimHW(shape, scale);
  ctx.beginPath();
  ctx.ellipse(cx, rimY, Math.max(1, rimHW), Math.max(2.5, rimHW * 0.15), 0, 0, Math.PI * 2);
  ctx.globalAlpha = alpha * 0.65;
  ctx.strokeStyle = 'rgba(250,244,232,0.9)';
  ctx.lineWidth = Math.max(1, scale * 0.7);
  ctx.stroke();

  const baseY = glassBaseY(shape, cy, scale);
  ctx.beginPath();
  const hlX = cx - rimHW * 0.5;
  ctx.moveTo(hlX, rimY + 8 * scale);
  ctx.quadraticCurveTo(hlX - 3 * scale, (rimY + baseY) / 2, hlX + 1 * scale, baseY - 10 * scale);
  ctx.globalAlpha = alpha * 0.45;
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = Math.max(1, scale * 1.1);
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.restore();
};

// "Positive – Negative" renamed to "Half-full – Half-empty" (Freya's proposal):
// optimism with zero wrong answer, the most cocktail-native pair possible.
const BINARIES = [
  { key: 'sharp-smooth', a: 'Sharp', b: 'Smooth' },
  { key: 'relaxed-excited', a: 'Relaxed', b: 'Excited' },
  { key: 'halffull-halfempty', a: 'Half-full', b: 'Half-empty' },
  { key: 'control', a: 'In control', b: 'Out of control' },
  { key: 'quiet-loud', a: 'Quiet', b: 'Loud' },
  { key: 'risk', a: 'Risk averse', b: 'Risk taker' },
  { key: 'bright-dark', a: 'Bright', b: 'Dark' },
  { key: 'soft-rough', a: 'Soft', b: 'Rough' },
  { key: 'harmonic', a: 'Harmonic', b: 'Disharmonic' },
];

const FROZEN_MS = 850;  // a calm beat: both embers hang suspended, pulsing
const THAW_MS = 2550;   // then they cool — the pulse weakens, they shrink and dim
const ROUND_MS = FROZEN_MS + THAW_MS; // total catch window per binary

// The practice round (-1) is three beats, not one: the prompt appears alone
// first, the hint follows once it's had a moment to land, and only once an
// average reader would have finished both do the embers ignite in — a touch
// before, so it feels anticipated rather than lagging. 19 words total
// ("Too quick to think. Trust the spirit within." + the hint below it) at
// ~200 words/min, a standard reading-speed estimate, is ~5.7s to read.
const PRACTICE_HINT_DELAY_MS = 900;          // the hint follows the prompt, not simultaneous
const PRACTICE_READ_MS = 5700;               // 19 words @ ~200 wpm
const PRACTICE_REVEAL_DELAY_MS = PRACTICE_READ_MS - 1400; // Robin: read ~1s long against the estimate — trimmed
const PRACTICE_FROZEN_MS = 1500;
const PRACTICE_THAW_MS = 4200;
const PRACTICE_ROUND_MS = PRACTICE_REVEAL_DELAY_MS + PRACTICE_FROZEN_MS + PRACTICE_THAW_MS;

// Still Water: the catch is the one hold in the journey that runs on a clock,
// and a clock is exactly what a motor- or cognition-impaired visitor cannot
// beat (WCAG 2.2.1). Under reduced motion the embers ignite and simply stay —
// they never cool, the round never expires — and "let them cool" becomes an
// explicit gesture instead of a deadline, so the hidden self stays reachable.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// First pole lives on the dark crimson cloud (left), second on the cream (right).
const GRAVITIES = [
  { key: 'solitary-social', left: 'Solitary', right: 'Social' },
  { key: 'controlled-wild', left: 'Controlled', right: 'Wild' },
  { key: 'classic-experimental', left: 'Classic', right: 'Experimental' },
  { key: 'analytical-instinctive', left: 'Analytical', right: 'Instinctive' },
  { key: 'grounded-dreamlike', left: 'Grounded', right: 'Dreamlike' },
];

// H8 · Composes the breath's echoes from the canonical Answers. Everything
// here is allusion in her own words EXCEPT the trace — the scenario's
// standing privacy rule: the one true thing is never echoed verbatim,
// anywhere, ever. It gets one fixed allusion line, always last.
const buildBreathEchoes = (a: Answers, vesselLabel: string | null): string[] => {
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
  const out: string[] = [];
  if (a.name.trim()) out.push(`for ${a.name.trim()}`);
  if (a.lens) out.push(`poured for ${lower(a.lens)}`);
  if (a.colorName) out.push(`${a.colorName} runs through it`);
  const grav = Object.entries(a.gravity);
  if (grav.length) {
    const [key, v] = grav.reduce((best, cur) => (Math.abs(cur[1] - 50) > Math.abs(best[1] - 50) ? cur : best));
    const pair = GRAVITIES.find((g) => g.key === key);
    if (pair && Math.abs(v - 50) > 8) out.push(`leaning ${(v < 50 ? pair.left : pair.right).toLowerCase()}`);
  }
  const textures = Object.values(a.texture);
  if (textures.length) out.push(`${textures[0].toLowerCase()}, when no one is asking`);
  if (textures.length < BINARIES.length) out.push('and a part of you it keeps secret');
  if (a.drawnToward.length) out.push(`drawn toward ${a.drawnToward.slice(0, 2).map((w) => w.toLowerCase()).join(' & ')}`);
  if (a.soughtFor.length) out.push(`what they come to you for: ${a.soughtFor[0].toLowerCase()}`);
  if (a.flavors.length) out.push(`${a.flavors.map((w) => w.toLowerCase()).join(', ')} on the tongue`);
  if (vesselLabel) out.push(`${vesselLabel.toLowerCase()} in the hand`);
  const firstWard = a.allergies.split(',').map((s) => s.trim()).filter(Boolean)[0];
  if (firstWard) out.push(`never ${firstWard.toLowerCase()}`);
  if (a.frequency === 'Never') out.push('your first taste of the craft');
  if (a.frequency === 'Exclusively') out.push('a devotee of the craft');
  const capped = out.slice(0, 8);
  if (a.insight.trim()) capped.push('…and the one thing you told only the ink');
  if (capped.length < 3) capped.push('the glass is listening', 'what settles now settles true');
  return capped;
};

const LINES = [
  'Somewhere, a cocktail that does not exist yet is waiting to be made.',
  'There are no right answers, only honest ones.',
];

const LENSES = [
  'The real me',
  'A dream alter ego',
  'The night version of me',
  'My inner child',
  'My future self',
  'A fictional persona',
];

// Each colour is a real pour. The hue is the answer; the name is the whisper.
// `s` varies the droplet size so the ring feels found, not arranged.
const SEEDS = [
  { name: 'Campari Red', hex: '#c8102e', s: 1.0 },
  { name: 'Aperol Orange', hex: '#ff6f1f', s: 0.86 },
  { name: 'Galliano Gold', hex: '#f2c24e', s: 1.12 },
  { name: 'Midori Green', hex: '#58b947', s: 0.92 },
  { name: 'Curaçao Blue', hex: '#1287c8', s: 1.05 },
  { name: 'Violette Purple', hex: '#7b5aa6', s: 0.88 },
  { name: 'Pamplemousse Pink', hex: '#f2789f', s: 0.97 },
  { name: 'Cassis Plum', hex: '#5c2447', s: 1.08 },
];

// Loose elliptical ring (percent positions inside the seed stage container).
const SEED_POS = [
  { x: 50, y: 8 },
  { x: 76, y: 17 },
  { x: 90, y: 46 },
  { x: 77, y: 76 },
  { x: 50, y: 88 },
  { x: 23, y: 77 },
  { x: 10, y: 45 },
  { x: 24, y: 16 },
];

type Stage = 'arrive' | 'lines' | 'name' | 'lens' | 'ascend1' | 'seed' | 'ascend2' | 'gravity' | 'ascend3' | 'hidden' | 'ascend4' | 'resonance' | 'ascend5' | 'finish' | 'ascend6' | 'trace' | 'ascend7' | 'breath' | 'surface';
type HiddenStage = 'intro' | 'play' | 'gap';
type FinBeat = 'flavors' | 'glass' | 'ward';
type TraceBeat = 'ring' | 'trace';

// H5 canvas scene particles: an ignition/converge spark, and an ambient dust
// mote rising through the frozen burst.
type Spark = { x: number; y: number; vx: number; vy: number; r: number; life: number; ttl: number; c: string };
type Mote = { x: number; y: number; r: number; a: number; tw: number; ts: number; vx: number; vy: number };

interface Bubble {
  x: number;
  y: number;
  r: number;
  vy: number;
  freezeY: number;
  alpha: number;
  phase: number;
  /** per-frame alpha loss — H7's trace motes dissolve as they rise; H1's frozen name-bubbles never set it */
  decay?: number;
}

/** Dev-only quick-nav targets — every hold/round the experience can jump to. */
export type DevJumpTarget = 'lens' | 'seed' | 'gravity' | 'resonance' | 'finish' | 'trace' | 'breath' | 'surface' | number;

/** The pages past the journey. 'reading' = H10, the cocktail's own room (the
 *  journey's destination); 'reading-in' replays its arrival out of the dark.
 *  'gift' = H11, the friend's view (still the diorama keepsake). */
export type DevPage = 'gift' | 'reading' | 'reading-in';

// Dev-only bottom-left quick-nav, shared by TheDepths and TheSurfacing so the
// experience stays navigable from anywhere (including the reveal). Stripped
// from production builds by the import.meta.env.DEV gates at both call sites.
export function DevNav({ onJump, onPage }: { onJump: (target: DevJumpTarget) => void; onPage?: (page: DevPage) => void }) {
  return (
    <div
      className="fixed bottom-2 left-2 z-[999] flex max-w-[95vw] flex-wrap gap-1 rounded bg-black/75 p-2 font-mono text-[10px] text-white/80"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('lens')}>H1 lens</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('seed')}>H2 seed</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('gravity')}>H3 gravity</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump(-1)}>H4 practice</button>
      {BINARIES.map((b, i) => (
        <button key={b.key} className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump(i)}>H4·{i}</button>
      ))}
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('resonance')}>H5</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('finish')}>H6</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('trace')}>H7</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('breath')}>Breath</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('surface')}>H9</button>
      {onPage && (
        <>
          <button className="rounded border border-[#c8102e]/50 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onPage('reading-in')}>H10 arrival</button>
          <button className="rounded border border-[#c8102e]/50 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onPage('reading')}>H10 settled</button>
          <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onPage('gift')}>H11 friend</button>
        </>
      )}
    </div>
  );
}

export default function TheDepths({ answers, onUpdate, onPrepare, onComplete, initialJump, onDevPage }: { answers: Answers; onUpdate: (patch: Partial<Answers>) => void; onPrepare?: () => void; onComplete?: () => void; initialJump?: DevJumpTarget; onDevPage?: (page: DevPage) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const videoRaf = useRef<number | undefined>(undefined);
  const timeouts = useRef<number[]>([]);
  const stageRef = useRef<Stage>('arrive');

  const [stage, setStageState] = useState<Stage>('arrive');
  const [lineIdx, setLineIdx] = useState(0);
  const [name, setName] = useState('');
  const [chosen, setChosen] = useState<number | null>(null);
  const [appeared, setAppeared] = useState<boolean[]>(() => LENSES.map(() => false));
  const [hoverSeed, setHoverSeed] = useState<number | null>(null);
  const [seedChosen, setSeedChosen] = useState<number | null>(null);
  // The hue is a pulse, then a memory: full bloom on commit, then it exhales
  // to a whisper so the footage leads again. It returns in full at the reveal.
  const [tintPhase, setTintPhase] = useState<'bloom' | 'memory'>('bloom');
  const trackRef = useRef<HTMLDivElement>(null);
  const gravValues = useRef<Record<string, number>>({});
  const [gravRound, setGravRound] = useState(0);
  const [gravX, setGravX] = useState(50);
  const [gravDragging, setGravDragging] = useState(false);
  const [gravCommitted, setGravCommitted] = useState(false);
  const [gravHinted, setGravHinted] = useState(false);
  // The Breath: each committed answer nudges the frozen world a hair closer —
  // a persistent micro-zoom composited onto the PAUSED frame (never playback,
  // which is what read as lag) — with a brief warm bloom. The accumulated
  // lean exhales back to 1 during the real chapter ascent, absorbed by the
  // footage's own motion, so the chapter rise stays the one big move.
  const [gravBreaths, setGravBreaths] = useState(0);
  // H4 · The Catch
  const dropARef = useRef<HTMLButtonElement>(null);
  const dropBRef = useRef<HTMLButtonElement>(null);
  const practiceTextRef = useRef<HTMLDivElement>(null);
  const hRaf = useRef<number | undefined>(undefined);
  const hStart = useRef(0);
  // read during render (it gates the pass affordance), so it is state, not a
  // ref — the preference is sampled once at mount and never changes mid-hold
  const [stillWater] = useState(prefersReducedMotion);
  const stillWaterRef = useRef(stillWater); // for the rAF loop, which runs outside render
  // H5's scatter has a portrait preset; resize must re-pick it, and the
  // constellation canvas reads live positions each frame so it follows.
  const [resPortrait, setResPortrait] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = () => setResPortrait(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const hAnswered = useRef(false);
  const hResults = useRef<Record<string, string>>({});
  const skipHiddenKickoff = useRef(false); // set by debugJump so it doesn't race the natural kickoff
  const [hStage, setHStage] = useState<HiddenStage>('intro');
  const [hRound, setHRound] = useState(0);
  const [hChosen, setHChosen] = useState<'a' | 'b' | null>(null);
  const [hRipple, setHRipple] = useState<{ x: number; y: number; c: string } | null>(null);
  // H5 · The Effervescence
  const resCanvasRef = useRef<HTMLCanvasElement>(null);
  const resGlintRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resChosenRef = useRef<number[]>([]); // mirror for the canvas loop (avoids stale closures)
  const resSealT0 = useRef(0); // performance.now() when a seal began; 0 = not sealing
  const resSparks = useRef<Spark[]>([]); // bubble particles: catch-fizz / release / gather / notice, plus the continuous streams
  const resDust = useRef<Mote[] | null>(null); // the ambient fine-bubble field
  const [resQ, setResQ] = useState(0); // 0 = drawn toward, 1 = sought for
  const [resChosen, setResChosen] = useState<number[]>([]);
  const [resSealing, setResSealing] = useState(false);
  const [resRise, setResRise] = useState<{ x: number; y: number } | null>(null);
  // H6 · The Pour
  const finCanvasRef = useRef<HTMLCanvasElement>(null);
  const finGlassAnim = useRef<Record<string, { x: number; y: number; s: number; op: number }>>({}); // animated candidate transforms, lerped each frame
  const finBubbleAnim = useRef<Record<string, { x: number; y: number; vy: number; phase: number }>>({}); // rising-bubble sim per flavour
  const finBubbleRefs = useRef<Record<string, HTMLButtonElement | null>>({}); // DOM handles the tick loop writes position onto directly
  const finCaughtRef = useRef<string[]>([]); // mirror of finCaught, for the canvas loop
  const finVesselKeyRef = useRef<string | null>(null); // mirror for the canvas loop
  const finBeatRef = useRef<FinBeat>('flavors'); // mirror for the canvas loop — gates when the glass renders at all
  const finHoverRef = useRef<string | null>(null); // glass candidate under the pointer
  const finDust = useRef<Mote[] | null>(null); // the ambient foam-bubble field
  const [finBeat, setFinBeat] = useState<FinBeat>('flavors');
  const [finVesselKey, setFinVesselKey] = useState<string | null>(null);
  const [finCaught, setFinCaught] = useState<string[]>([]); // flavours committed, in catch order
  // Held bubbles whose pointer has LEFT once since the catch. The release
  // affordance (strike-through on hover) is gated on this: the catching click
  // happens with the pointer already on the bubble, and showing the strike in
  // that same instant read as a rejection of the choice just made.
  const [finArmed, setFinArmed] = useState<Set<string>>(new Set());
  const [finBanished, setFinBanished] = useState<string[]>([]);
  const [finSealed, setFinSealed] = useState(false);
  // H7 · The Trace
  const traceInputRef = useRef<HTMLInputElement>(null);
  const breathCanvasRef = useRef<HTMLCanvasElement>(null);
  const [traceBeat, setTraceBeat] = useState<TraceBeat>('ring');
  const [ringHover, setRingHover] = useState<number | null>(null);
  const [ringChosen, setRingChosen] = useState<number | null>(null);
  // The rings are an ordered scale, so the keyboard walks them with one tab
  // stop and the arrows. Selection is irreversible, so arrows move focus only
  // and Enter/Space commits — never select-on-arrow.
  const ringLabelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ringFocus, setRingFocus] = useState(0);
  const [traceText, setTraceText] = useState('');
  const [traceSealed, setTraceSealed] = useState(false);
  // H8 · The Breath
  const breathFrags = useRef<string[]>([]);
  const [breathPhase, setBreathPhase] = useState<'still' | 'echoes' | 'condense'>('still');
  const [breathRun, setBreathRun] = useState(0); // bumped by debug re-jump to restart the cycle in place
  const [breathShowReveal, setBreathShowReveal] = useState(false);
  // H9 · beat 2 — the letting go
  const [breathReleased, setBreathReleased] = useState(false);
  const releaseAtRef = useRef<number | null>(null);
  const surfaceBegun = useRef(false);
  // H9 · beat 3 — the splash, then the dark takes the frame (one stroke of dark)
  const [surfacePhase, setSurfacePhase] = useState<'film' | 'sink' | 'black' | 'held'>('film');

  const setStage = (s: Stage) => {
    stageRef.current = s;
    setStageState(s);
  };

  const after = (ms: number, fn: () => void) => {
    timeouts.current.push(window.setTimeout(fn, ms));
  };

  // Play the footage at natural 1x until `target`, then freeze there. Native
  // full-speed playback keeps the background video smooth (no slow/variable
  // playbackRate, which read as lag). Used only for chapter/scene transitions;
  // within a chapter the hold stays frozen.
  const playUntil = (target: number, then?: () => void) => {
    const v = videoRef.current;
    if (!v) { then?.(); return; }
    if (videoRaf.current) cancelAnimationFrame(videoRaf.current);
    const step = () => {
      if (v.currentTime >= target) {
        v.pause();
        v.currentTime = target;
        then?.();
        return;
      }
      videoRaf.current = requestAnimationFrame(step);
    };
    v.play().catch(() => { /* footage missing — the overlay world carries on */ });
    videoRaf.current = requestAnimationFrame(step);
  };

  // Dev-only: jump straight to any hold/round instead of replaying the whole
  // journey to test one spot. Stripped from production builds (import.meta.env.DEV).
  const debugJump = (target: 'lens' | 'seed' | 'gravity' | 'resonance' | 'finish' | 'trace' | 'breath' | 'surface' | number) => {
    const v = videoRef.current;
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    if (videoRaf.current) cancelAnimationFrame(videoRaf.current);
    setSurfacePhase('film');
    if (typeof target === 'number') {
      if (v) { v.pause(); v.currentTime = HOLD_HIDDEN; }
      // only relevant when actually (re-)entering 'hidden' — otherwise the effect never fires and the flag would go stale
      if (stageRef.current !== 'hidden') skipHiddenKickoff.current = true;
      setStage('hidden');
      startHRound(target);
      return;
    }
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
    const holds: Record<'lens' | 'seed' | 'gravity' | 'resonance' | 'finish' | 'trace' | 'breath', number> = {
      lens: HOLD_DEPTHS, seed: HOLD_SEED, gravity: HOLD_GRAVITY, resonance: HOLD_RESONANCE, finish: HOLD_FINISH, trace: HOLD_TRACE, breath: HOLD_BREATH,
    };
    if (v) { v.pause(); v.currentTime = holds[target]; }
    if (target === 'gravity') { setGravRound(0); setGravX(50); setGravCommitted(false); }
    if (target === 'resonance' && stageRef.current === 'resonance') {
      // re-jump onto the same stage: the arrival effect won't rerun, reset by hand
      resSealT0.current = 0;
      resSparks.current = [];
      setResQ(0);
      setResChosen([]);
      setResSealing(false);
      setResRise(null);
    }
    if (target === 'finish' && stageRef.current === 'finish') {
      // re-jump onto the same stage: the arrival effect won't rerun, reset by hand
      finGlassAnim.current = {};
      finBubbleAnim.current = {};
      setFinBeat('flavors');
      setFinVesselKey(null);
      setFinCaught([]);
      setFinArmed(new Set());
      setFinBanished([]);
      setFinSealed(false);
    }
    if (target === 'trace' && stageRef.current === 'trace') {
      // re-jump onto the same stage: the arrival effect won't rerun, reset by hand
      setTraceBeat('ring');
      setRingHover(null);
      setRingChosen(null);
      setTraceText('');
      setTraceSealed(false);
    }
    if (target === 'breath' && stageRef.current === 'breath') {
      setBreathRun((r) => r + 1); // the driver effect is keyed on this — restarts the cycle
    }
    setStage(target);
  };

  // Dev-only: when the reveal's quick-nav sends us back, land straight on the
  // requested hold instead of replaying the arrival. A short beat lets the
  // mount settle before the jump.
  useEffect(() => {
    if (!import.meta.env.DEV || initialJump == null) return;
    const t = window.setTimeout(() => debugJump(initialJump), 60);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // H9 · beat 3: footage resumes at 1x, the crown catches her drop, and the
  // dark floods in before the pull-back can reveal the video's own glass —
  // the threshold descent's grammar, played at the other end of the journey.
  const beginSurface = () => {
    if (stageRef.current !== 'breath') return;
    setStage('surface');
    // ~1.6s before the handoff: let the app compute the result and pre-decode
    // the persona image, so the emergence starts the instant the black lands
    onPrepare?.();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // spec: beats 2–4 collapse to a simple crossfade — no splash playback
      setSurfacePhase('black');
      after(700, () => {
        setSurfacePhase('held');
        onComplete?.();
      });
      return;
    }
    setSurfacePhase('film');
    playUntil(SURFACE_CUT);
    after(DARK_AT_MS, () => setSurfacePhase('sink'));
    after(DARK_AT_MS + DARK_GROW_MS, () => setSurfacePhase('black'));
    after(DARK_AT_MS + DARK_GROW_MS + SURFACE_BLACK_HOLD_MS, () => {
      setSurfacePhase('held');
      onComplete?.();
    });
  };

  const beginLines = () => {
    if (stageRef.current !== 'arrive') return;
    setStage('lines');
    setLineIdx(0);
    after(3050, () => {
      if (stageRef.current !== 'lines') return;
      setLineIdx(1);
      after(3050, () => {
        if (stageRef.current === 'lines') setStage('name');
      });
    });
  };

  // Arrival: descend out of black, sink to the depths hold.
  useEffect(() => {
    playUntil(HOLD_DEPTHS, beginLines);
    // Fallback if the video never becomes playable.
    after(2600, beginLines);
    return () => {
      if (videoRaf.current) cancelAnimationFrame(videoRaf.current);
      timeouts.current.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The suspended-bubble field: frozen planets that shimmer, plus the
  // bubbles each keystroke releases (they rise a little, then freeze).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (bubbles.current.length === 0) {
      for (let i = 0; i < 24; i++) {
        const y = Math.random() * canvas.height;
        bubbles.current.push({
          x: Math.random() * canvas.width,
          y,
          r: 1.5 + Math.random() * 7,
          vy: 0,
          freezeY: y,
          alpha: 0.16 + Math.random() * 0.34,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // fully-dissolved trace motes leave the field
      if (bubbles.current.some((b) => b.decay && b.alpha <= 0)) {
        bubbles.current = bubbles.current.filter((b) => !(b.decay && b.alpha <= 0));
      }
      for (const b of bubbles.current) {
        if (b.y > b.freezeY) {
          b.y += b.vy;
          if (b.y <= b.freezeY) b.y = b.freezeY;
        }
        if (b.decay) b.alpha = Math.max(0, b.alpha - b.decay);
        const a = b.alpha * (0.75 + 0.25 * Math.sin(t * 0.0006 + b.phase));
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 214, 165, ${a * 0.28})`;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255, 232, 200, ${a * 0.55})`;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.38, Math.max(0.6, b.r * 0.18), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const releaseKeyBubble = () => {
    const rect = inputRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = rect.top + rect.height * 0.4;
    bubbles.current.push({
      x: rect.left + 8 + Math.random() * Math.max(12, rect.width - 16),
      y,
      r: 1.6 + Math.random() * 3,
      vy: -(0.5 + Math.random() * 0.8),
      freezeY: y - (70 + Math.random() * 170),
      alpha: 0.4 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    });
  };

  const skipLines = () => {
    if (stageRef.current !== 'lines') return;
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
    setStage('name');
  };

  const commitName = () => {
    if (!name.trim()) return;
    onUpdate({ name: name.trim() });
    setStage('lens');
  };

  const pickLens = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    onUpdate({ lens: LENSES[i] });
    after(1000, () => {
      setStage('ascend1');
      playUntil(HOLD_SEED, () => setStage('seed'));
    });
  };

  const pickSeed = (i: number) => {
    if (seedChosen !== null) return;
    setSeedChosen(i);
    setHoverSeed(null);
    onUpdate({ color: SEEDS[i].hex, colorName: SEEDS[i].name, colorTouched: true });
    after(1150, () => {
      setStage('ascend2');
      playUntil(HOLD_GRAVITY, () => setStage('gravity'));
    });
    // The bloom holds for a couple of breaths, then recedes during the ascent.
    after(2700, () => setTintPhase('memory'));
  };

  const gravMoveTo = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return 50;
    const v = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setGravX(v);
    return v;
  };

  const commitGravity = (v: number) => {
    const pair = GRAVITIES[gravRound];
    gravValues.current[pair.key] = Math.round(v);
    onUpdate({ gravity: { ...gravValues.current } });
    setGravCommitted(true);
    setGravBreaths((b) => b + 1);
    const isLast = gravRound === GRAVITIES.length - 1;
    // The video stays frozen on the gravity hold through all five polarities —
    // no per-question rise (that slow per-answer playback read as lag). Only
    // the chapter change moves the camera, at smooth natural 1x.
    after(620, () => {
      if (isLast) {
        setStage('ascend3');
        playUntil(HOLD_HIDDEN, () => setStage('hidden'));
      } else {
        setGravRound((r) => r + 1);
        setGravX(50);
        setGravCommitted(false);
      }
    });
  };

  // How strongly each cloud is pulling the mote (0..1 per side).
  const leftPull = Math.max(0, (50 - gravX) / 50);
  const rightPull = Math.max(0, (gravX - 50) / 50);
  const seedHex = seedChosen !== null ? SEEDS[seedChosen].hex : '#e8702a';

  // The Breath's accumulated lean. Origin sits upper-middle so the world
  // predominantly slides down as it grows — the feeling of drifting upward.
  const breathScale = stage === 'gravity' ? 1 + gravBreaths * 0.006 : 1;

  // The world wears her colour: faintly while she tries one on, fully at the
  // moment of choice, then only as a memory.
  const tintHex = seedChosen !== null ? SEEDS[seedChosen].hex : hoverSeed !== null ? SEEDS[hoverSeed].hex : null;
  const [tintColorOp, tintLightOp] =
    seedChosen !== null
      ? stage === 'breath'
        ? [0.26, 0.16] // her colour gathers back over the world while the drink is distilled
        : tintPhase === 'bloom' ? [0.5, 0.32] : [0.1, 0.07]
      : hoverSeed !== null ? [0.22, 0.14] : [0, 0];
  const tintTransition =
    seedChosen !== null && tintPhase === 'memory'
      ? 'opacity 2.8s ease, background-color 0.9s ease'
      : 'opacity 0.9s ease, background-color 0.9s ease';

  // H4 · Twin Embers — drive the two embers with rAF so we can freeze them on
  // a catch (no CSS-keyframe jump). They hang suspended, pulsing like a
  // heartbeat, then cool: the pulse weakens as they shrink and dim toward a
  // dead coal. Both behave identically; they differ only in side and word.
  // Cooling away unanswered = the hidden self.
  const paintDrops = (elapsed: number, round: number) => {
    const isPractice = round === -1;
    const revealDelay = isPractice ? PRACTICE_REVEAL_DELAY_MS : 0;
    const frozenMs = isPractice ? PRACTICE_FROZEN_MS : FROZEN_MS;
    const thawMs = isPractice ? PRACTICE_THAW_MS : THAW_MS;
    const e = Math.max(0, elapsed - revealDelay); // the embers' own clock — held at the door until reveal
    const beat = Math.sin(e / 480); // a steady heartbeat pulse
    let op = 0, scale = 1, glow = 1;
    if (elapsed < revealDelay) {
      op = 0; // the prompt gets its beat alone before anything else appears
    } else if (stillWaterRef.current) {
      // Still Water: ignite, then hold — no pulse, no cooling, no deadline
      op = Math.min(1, e / 260);
      scale = 0.82 + 0.18 * op;
      glow = 0.85 + 0.15 * op;
    } else if (e < frozenMs) {
      const inT = Math.min(1, e / 260); // ignites in, then holds
      op = inT;
      scale = 0.82 + 0.18 * inT + beat * 0.05;
      glow = 0.85 + 0.15 * inT + beat * 0.1;
    } else {
      const tp = Math.min(1, (e - frozenMs) / thawMs); // cooling toward a dead coal
      const amp = 0.05 * (1 - tp * 0.7); // the pulse weakens as it dies
      scale = Math.max(0.4, 1 - tp * 0.58 + beat * amp);
      glow = Math.max(0.12, 1 - tp * 0.85 + beat * amp * 0.6);
      op = tp < 0.7 ? 1 : Math.max(0, (1 - tp) / 0.3); // stays visible while cooling, dies at the very end
    }
    if (isPractice && practiceTextRef.current) {
      // the centered prompt+hint pair lifts out of the way the instant the embers begin
      practiceTextRef.current.classList.toggle('lifted', elapsed >= revealDelay);
    }
    for (const ref of [dropARef, dropBRef]) {
      const el = ref.current;
      if (el && !el.dataset.caught) {
        el.style.opacity = String(op);
        el.style.setProperty('--ember-scale', scale.toFixed(3));
        el.style.setProperty('--ember-glow', glow.toFixed(3));
        el.classList.toggle('dimming', e >= frozenMs);
      }
    }
  };

  const advanceHidden = (next: number) => {
    if (next >= BINARIES.length) {
      setHStage('gap');
      after(750, () => {
        setStage('ascend4');
        playUntil(HOLD_RESONANCE, () => setStage('resonance'));
      });
      return;
    }
    after(560, () => startHRound(next));
  };

  const startHRound = (i: number) => {
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    hAnswered.current = false;
    setHChosen(null);
    setHRipple(null);
    setHRound(i);
    setHStage('play');
    hStart.current = performance.now();
    // Still Water has no deadline — the round ends when she ends it
    const roundMs = stillWaterRef.current ? Infinity : i === -1 ? PRACTICE_ROUND_MS : ROUND_MS;
    const tick = (now: number) => {
      const elapsed = now - hStart.current;
      paintDrops(elapsed, i);
      if (elapsed >= roundMs) {
        if (!hAnswered.current) { setHStage('gap'); advanceHidden(i + 1); }
        return;
      }
      hRaf.current = requestAnimationFrame(tick);
    };
    hRaf.current = requestAnimationFrame(tick);
  };

  // Still Water's twin of letting an ember cool away: the same respected
  // non-answer the timer would have recorded, made an explicit gesture.
  const letThemCool = () => {
    if (hStage !== 'play' || hAnswered.current) return;
    hAnswered.current = true;
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    setHStage('gap');
    advanceHidden(hRound + 1);
  };

  const catchDrop = (side: 'a' | 'b', clientX: number, clientY: number) => {
    if (hStage !== 'play' || hAnswered.current) return;
    hAnswered.current = true;
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    if (hRound >= 0) {
      // round -1 is the practice pair — it teaches the motion, not the data
      const bin = BINARIES[hRound];
      const word = side === 'a' ? bin.a : bin.b;
      hResults.current[bin.key] = word;
      onUpdate({ texture: { ...hResults.current } });
      setHChosen(side);
    }
    setHRipple({ x: clientX, y: clientY, c: seedHex });
    // freeze both, then flare the caught ember white-hot and burst it while
    // the other finishes guttering out — CSS transitions on [data-caught]
    // take over from here
    const chosen = side === 'a' ? dropARef.current : dropBRef.current;
    const other = side === 'a' ? dropBRef.current : dropARef.current;
    if (chosen) {
      chosen.dataset.caught = '1';
      chosen.classList.remove('dimming');
      requestAnimationFrame(() => {
        chosen.style.setProperty('--ember-scale', '2.3');
        chosen.style.setProperty('--ember-glow', '1.6');
        requestAnimationFrame(() => { chosen.style.opacity = '0'; });
      });
    }
    if (other) {
      other.dataset.caught = '1';
      requestAnimationFrame(() => {
        other.style.setProperty('--ember-scale', '0.3');
        other.style.setProperty('--ember-glow', '0.05');
        other.style.opacity = '0';
      });
    }
    setHStage('gap');
    advanceHidden(hRound + 1);
  };

  // Kick off H4 when the journey reaches the bitters hold — a short settling
  // beat (no chapter card), then the first pair thaws in.
  useEffect(() => {
    if (stage !== 'hidden') return;
    if (skipHiddenKickoff.current) { skipHiddenKickoff.current = false; return; } // debugJump already started a round
    setHStage('intro');
    const t = window.setTimeout(() => startHRound(-1), 900); // -1: the practice pair
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => () => { if (hRaf.current) cancelAnimationFrame(hRaf.current); }, []);

  // H5 · The Effervescence — catch, fizz, gather, seal.
  useEffect(() => { resChosenRef.current = resChosen; }, [resChosen]);

  const toggleGlint = (i: number) => {
    if (resSealing) return;
    const c = glintCenter(resGlintRefs.current[i]);
    if (resChosen.includes(i)) {
      if (c) spawnSparks(c.x, c.y, 'release');
      setResChosen(resChosen.filter((x) => x !== i));
      return;
    }
    if (resChosen.length >= RES_MAX) {
      // a gentle refusal: the field is full — release one first
      const el = resGlintRefs.current[i];
      if (el) {
        el.classList.add('res-refuse');
        after(430, () => el.classList.remove('res-refuse'));
      }
      return;
    }
    if (c) spawnSparks(c.x, c.y, 'ignite');
    if (resChosen.length + 1 === RES_MAX) {
      // the drink notices — a rush of extra fizz from the gathered centre,
      // not a ripple; that reads as still water, not carbonation
      const centers = [...resChosen, i]
        .map((k) => glintCenter(resGlintRefs.current[k]))
        .filter(Boolean) as { x: number; y: number }[];
      if (centers.length) {
        const ncx = centers.reduce((s, p) => s + p.x, 0) / centers.length;
        const ncy = centers.reduce((s, p) => s + p.y, 0) / centers.length;
        spawnSparks(ncx, ncy, 'notice');
      }
    }
    setResChosen([...resChosen, i]);
  };

  const glintCenter = (el: HTMLButtonElement | null) => {
    if (!el) return null;
    const dot = el.querySelector('.res-dot') ?? el;
    const r = (dot as HTMLElement).getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // Bubble particles: buoyant, never radiating outward like sparks — every
  // kind here rises. Ignite = the catch bursts a few bubbles loose, already
  // climbing; release = a weaker exhale as it's let go; converge = the
  // chosen bubbles rise toward the seal's gathering point; notice = a rush
  // of extra fizz when the third is caught. The continuous per-catch
  // streams live in the tick loop below, not here — this is only the
  // one-shot moments. Colour lives in her seed hue or a pale foam white,
  // never a filled disc; these must read as bubbles, not sparks or blots.
  // Skipped under reduced motion.
  const spawnSparks = (x: number, y: number, kind: 'ignite' | 'release' | 'converge' | 'notice', tx = 0, ty = 0) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const out = resSparks.current;
    const foam = 'rgb(255, 248, 236)';
    if (kind === 'ignite') {
      for (let k = 0; k < 8; k++) {
        const ang = Math.PI * 1.5 + (Math.random() - 0.5) * 2.4; // biased upward — buoyancy, not an explosion
        const sp = 20 + Math.random() * 50;
        out.push({ x, y, vx: Math.cos(ang) * sp * 0.4, vy: Math.sin(ang) * sp, r: 1.4 + Math.random() * 1.8, life: 1, ttl: 700 + Math.random() * 400, c: Math.random() > 0.4 ? seedHex : foam });
      }
    } else if (kind === 'release') {
      // a weak exhale, mostly sinking back before it fizzles — the catch let go
      for (let k = 0; k < 5; k++) {
        out.push({ x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 6, vx: (Math.random() - 0.5) * 12, vy: 10 + Math.random() * 18, r: 1 + Math.random(), life: 0.7, ttl: 500, c: foam });
      }
    } else if (kind === 'notice') {
      // the drink notices — a rush of fine, fast bubbles from the gathered centre
      for (let k = 0; k < 14; k++) {
        const ang = Math.PI * 1.5 + (Math.random() - 0.5) * 2.8;
        const sp = 40 + Math.random() * 90;
        out.push({ x, y, vx: Math.cos(ang) * sp * 0.5, vy: Math.sin(ang) * sp, r: 1 + Math.random() * 1.4, life: 1, ttl: 550 + Math.random() * 350, c: Math.random() > 0.5 ? seedHex : foam });
      }
    } else {
      for (let k = 0; k < 6; k++) {
        const jx = x + (Math.random() - 0.5) * 12;
        const jy = y + (Math.random() - 0.5) * 12;
        out.push({ x: jx, y: jy, vx: (tx - jx) / 0.7 + (Math.random() - 0.5) * 10, vy: (ty - jy) / 0.7 - 14, r: 1.4 + Math.random() * 1.6, life: 1, ttl: 780, c: Math.random() > 0.5 ? seedHex : foam });
      }
    }
  };

  const sealResonance = () => {
    if (resSealing || resChosen.length === 0) return;
    const q = RES_QUESTIONS[resQ];
    const chosenWords = resChosen.map((i) => q.words[i].w);
    onUpdate({ [q.key]: chosenWords } as Partial<Answers>);
    setResSealing(true);
    resSealT0.current = performance.now();
    // centroid of the catch — where the bubbles gather and rise from
    const centers = resChosen.map((i) => glintCenter(resGlintRefs.current[i])).filter(Boolean) as { x: number; y: number }[];
    const cx = centers.reduce((s, p) => s + p.x, 0) / centers.length;
    const cy = centers.reduce((s, p) => s + p.y, 0) / centers.length;
    // the caught bubbles rise and gather toward the surfacing point
    centers.forEach((p) => spawnSparks(p.x, p.y, 'converge', cx, cy));
    // chosen bubbles gather at the surfacing point, carrying their colour; the rest fade
    RES_QUESTIONS[resQ].words.forEach((_, i) => {
      const el = resGlintRefs.current[i];
      if (!el) return;
      const c = glintCenter(el);
      if (!c) return;
      if (resChosen.includes(i)) {
        el.style.transition = 'transform 0.66s cubic-bezier(0.5, 0, 0.6, 1), opacity 0.55s ease 0.18s';
        el.style.transform = `translate(calc(-50% + ${(cx - c.x).toFixed(1)}px), calc(-50% + ${(cy - c.y).toFixed(1)}px)) scale(0.45)`;
        el.style.opacity = '0';
      } else {
        el.style.transition = 'opacity 0.45s ease';
        el.style.opacity = '0';
      }
    });
    after(560, () => setResRise({ x: cx, y: cy }));
    after(1600, () => {
      setResRise(null);
      resSealT0.current = 0;
      if (resQ === 0) {
        setResQ(1);
        setResChosen([]);
        setResSealing(false);
      } else {
        setStage('ascend5');
        playUntil(HOLD_FINISH, () => setStage('finish'));
      }
    });
  };

  // The effervescence — one canvas scene composited over the PAUSED frame
  // (the footage is never touched): ambient fine bubbles already rising
  // through the liquid, a continuous fizzing stream from every caught word
  // (drawn as bubble rings with a highlight, never filled discs — that's
  // what keeps these reading as bubbles and not sparks or ink), streams
  // drifting toward one another when more than one is active (a shared
  // current, not a line between two points), and one-shot bursts for
  // catch/release/notice/gather. Reduced motion: static dust, no streams,
  // no bursts.
  useEffect(() => {
    if (stage !== 'resonance') return;
    const canvas = resCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    if (!resDust.current) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      resDust.current = Array.from({ length: 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.2,
        a: 0.1 + Math.random() * 0.26,
        tw: Math.random() * Math.PI * 2,
        ts: 0.4 + Math.random() * 0.8,
        vx: -3 + Math.random() * 6,
        vy: -2 - Math.random() * 5, // dust rises — it's a drink
      }));
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const chosen = resChosenRef.current;
      const centers = new Map<number, { x: number; y: number }>();
      for (const i of chosen) {
        const c = glintCenter(resGlintRefs.current[i]);
        if (c) centers.set(i, c);
      }
      let cx = 0;
      let cy = 0;
      if (centers.size) {
        for (const c of centers.values()) { cx += c.x; cy += c.y; }
        cx /= centers.size;
        cy /= centers.size;
      }
      // ---- the ambient fizz: fine bubbles already rising, whether or not
      //      anything's been caught yet ----
      ctx.globalCompositeOperation = 'lighter';
      for (const m of resDust.current!) {
        if (!reduced) {
          m.x += (m.vx * dt) / 1000;
          m.y += (m.vy * dt) / 1000;
          if (m.y < -8) { m.y = h + 8; m.x = Math.random() * w; }
          if (m.x < -8) m.x = w + 8;
          if (m.x > w + 8) m.x = -8;
        }
        const tw = reduced ? 0.8 : 0.85 + 0.15 * Math.sin(now / 2600 + m.tw);
        ctx.globalAlpha = m.a * tw;
        ctx.strokeStyle = 'rgb(255, 246, 226)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      // ---- the fizz: every caught word streams a steady trickle of finer
      //      bubbles from its live position. No line is ever drawn between
      //      chosen words — the streams themselves drift toward their
      //      shared centre below, which is the connection. ----
      if (!reduced) {
        for (const c of centers.values()) {
          if (Math.random() < dt / 260) {
            resSparks.current.push({
              x: c.x + (Math.random() - 0.5) * 6,
              y: c.y,
              vx: (Math.random() - 0.5) * 8,
              vy: -(26 + Math.random() * 22),
              r: 1 + Math.random() * 1.3,
              life: 1,
              ttl: 1400 + Math.random() * 600,
              c: Math.random() > 0.55 ? seedHex : 'rgb(255, 248, 236)',
            });
          }
        }
      }
      // ---- the bubbles: buoyant, never radial. Streams drift toward the
      //      shared centre as they climb when more than one is active, and
      //      every bubble pops (a quick flash of its rim, then gone) at the
      //      end of its life rather than just dissolving. ----
      if (resSparks.current.length) {
        const alive: Spark[] = [];
        for (const sp of resSparks.current) {
          if (centers.size > 1) {
            sp.vx += ((cx - sp.x) / 220) * ((18 * dt) / 1000);
          }
          sp.x += (sp.vx * dt) / 1000;
          sp.y += (sp.vy * dt) / 1000;
          sp.vy -= (8 * dt) / 1000; // buoyancy — it keeps climbing, not decelerating
          sp.life -= dt / sp.ttl;
          if (sp.life <= 0) continue;
          alive.push(sp);
          const popping = sp.life < 0.15;
          const rr = sp.r * (popping ? 1 + (0.15 - sp.life) * 8 : 1);
          const a = popping ? sp.life / 0.15 : Math.min(1, sp.life * 3);
          ctx.globalAlpha = a * 0.85;
          ctx.strokeStyle = sp.c;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, rr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = a * 0.9;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.beginPath();
          ctx.arc(sp.x - rr * 0.32, sp.y - rr * 0.32, Math.max(0.5, rr * 0.32), 0, Math.PI * 2);
          ctx.fill();
        }
        resSparks.current = alive;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      resDust.current = null;
      resSparks.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Fresh slate whenever the resonance hold begins (natural arrival or debug jump).
  useEffect(() => {
    if (stage !== 'resonance') return;
    resSealT0.current = 0;
    resSparks.current = [];
    setResQ(0);
    setResChosen([]);
    setResSealing(false);
    setResRise(null);
  }, [stage]);

  // H6 · The Pour — flavours, then the glass, then what to leave out.
  // Every interaction is a click, and every step is deliberately plain.
  // See the module-scope drawGlass() above for the glass illustration.
  useEffect(() => { finVesselKeyRef.current = finVesselKey; }, [finVesselKey]);
  useEffect(() => { finCaughtRef.current = finCaught; }, [finCaught]);
  useEffect(() => { finBeatRef.current = finBeat; }, [finBeat]);

  // Beat 1: choose the flavours. Bubbles rise on their own (tick loop
  // below); a click catches one before it gets away — the bubble freezes
  // right where it was touched and lights up in her seed colour
  // (`.fin-bubble-held`). Touching a held one releases it: it dims and
  // simply resumes rising from where it stood.
  const catchFlavor = (word: string) => {
    if (finBeat !== 'flavors') return;
    const disarm = () => setFinArmed((prev) => { const next = new Set(prev); next.delete(word); return next; });
    if (finCaught.includes(word)) {
      setFinCaught((prev) => prev.filter((w) => w !== word));
      disarm();
      return;
    }
    if (finCaught.length >= FIN_MAX_FLAVORS) return;
    setFinCaught((prev) => [...prev, word]);
    disarm(); // a fresh hold starts un-armed — the strike waits for the pointer to leave once
  };

  const sealCatch = () => {
    if (finCaught.length === 0) return;
    onUpdate({ flavors: finCaught });
    setFinBeat('glass');
  };

  // Beat 2: choose the glass. A click, per Robin — "the exact same
  // questionnaire, just much bigger." The chosen candidate becomes THE
  // glass (drawGlass's lerp handles the grow-to-hero animation); the rest
  // fade out inside the same canvas loop. Plain — no liquid performance.
  const chooseGlass = (key: string) => {
    if (finVesselKey) return;
    const v = FIN_VESSELS.find((x) => x.key === key);
    if (!v) return;
    setFinVesselKey(key);
    onUpdate({ drinkScales: v.scales });
    after(650, () => setFinBeat('ward'));
  };

  // Beat 3: what to leave out. A plain toggle — click to exclude, click
  // again to include. No stroke, no particles, nothing more than the
  // toggle itself.
  const toggleWard = (word: string) => {
    setFinBanished((prev) => (prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]));
  };

  const sealWard = () => {
    if (finSealed) return;
    onUpdate({ allergies: finBanished.join(', ') });
    setFinSealed(true);
    after(1400, () => {
      setStage('ascend6');
      playUntil(HOLD_TRACE, () => setStage('trace'));
    });
  };

  // H7 beat 1: one touch on the still surface. The ripple, the exhale of the
  // unchosen rings and the absorb-into-the-heart are all CSS keyed off
  // ringChosen; this only records the answer and lets the choreography play
  // out before the trace line fades in.
  const chooseRing = (i: number) => {
    if (ringChosen !== null) return;
    setRingChosen(i);
    setRingHover(null);
    onUpdate({ frequency: TRACE_RINGS[i].value });
    after(1400, () => setTraceBeat('trace'));
  };

  const moveRingFocus = (e: React.KeyboardEvent, i: number) => {
    if (ringChosen !== null) return;
    const last = TRACE_RINGS.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = Math.min(last, i + 1);
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = Math.max(0, i - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setRingFocus(next);
    ringLabelRefs.current[next]?.focus();
  };

  // H7 beat 2: each keystroke lets a mote of the first breath go — same
  // canvas as H1's name-bubbles, but these dissolve as they rise.
  const releaseTraceMote = () => {
    const rect = traceInputRef.current?.getBoundingClientRect();
    if (!rect) return;
    bubbles.current.push({
      x: rect.left + 8 + Math.random() * Math.max(12, rect.width - 16),
      y: rect.top + rect.height * 0.35,
      r: 1 + Math.random() * 2.2,
      vy: -(0.35 + Math.random() * 0.55),
      freezeY: -120, // never freezes — it rises until it has fully dissolved
      alpha: 0.5 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      decay: 0.0016 + Math.random() * 0.0018,
    });
  };

  const sealTrace = () => {
    if (traceSealed) return;
    onUpdate({ insight: traceText.trim() });
    setTraceSealed(true);
    after(1300, () => {
      setStage('ascend7');
      playUntil(HOLD_BREATH, () => setStage('breath'));
    });
  };

  // The scene: ambient dust throughout; uncaught flavour bubbles rise on
  // their own and recycle when they reach the top unclaimed (position
  // written straight to the DOM each frame — no React state churn for
  // continuous motion); the four glass candidates lerp toward their
  // target transform every frame (row position during beat 'glass', then
  // the chosen one grows into the hero position while the rest fade).
  // Reduced motion: static dust and bubbles, instant transforms.
  useEffect(() => {
    if (stage !== 'finish') return;
    const canvas = finCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    if (!finDust.current) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      finDust.current = Array.from({ length: 22 }, () => ({
        x: Math.random() * w,
        y: h * 0.15 + Math.random() * h * 0.85,
        r: 0.6 + Math.random() * 1.2,
        a: 0.06 + Math.random() * 0.16,
        tw: Math.random() * Math.PI * 2,
        ts: 0.4 + Math.random() * 0.7,
        vx: -2 + Math.random() * 4,
        vy: -3 - Math.random() * 5,
      }));
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // ---- ambient dust — this hold is close and warm, not vast; kept light ----
      ctx.globalCompositeOperation = 'lighter';
      for (const m of finDust.current!) {
        if (!reduced) {
          m.x += (m.vx * dt) / 1000;
          m.y += (m.vy * dt) / 1000;
          if (m.y < -8) { m.y = h + 8; m.x = Math.random() * w; }
          if (m.x < -8) m.x = w + 8;
          if (m.x > w + 8) m.x = -8;
        }
        const tw = reduced ? 0.7 : 0.55 + 0.45 * Math.sin((now / 1000) * m.ts * 2 + m.tw);
        ctx.globalAlpha = m.a * tw;
        ctx.fillStyle = 'rgb(255, 246, 230)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      // ---- the flavour bubbles: rise slowly, recycle when unclaimed ----
      for (const f of FIN_FLAVORS) {
        const el = finBubbleRefs.current[f.w];
        if (!el) continue; // not mounted (not in the 'flavors' beat)
        if (finCaughtRef.current.includes(f.w)) continue; // held — frozen right where she touched it
        if (!finBubbleAnim.current[f.w]) {
          finBubbleAnim.current[f.w] = { x: f.lane, y: 20 + Math.random() * 75, vy: 2.6 + Math.random() * 2, phase: Math.random() * Math.PI * 2 };
        }
        const b = finBubbleAnim.current[f.w];
        if (!reduced) {
          b.y -= (b.vy * dt) / 1000;
          if (b.y < 8) b.y = 96 + Math.random() * 6;
        }
        const wobble = reduced ? 0 : Math.sin(now / 1300 + b.phase) * 2.2;
        el.style.left = `${f.lane + wobble}%`;
        el.style.top = `${b.y}%`;
      }

      // ---- the glasses — only from beat 'glass' onward; nothing here during 'flavors' ----
      if (finBeatRef.current !== 'flavors') {
        const chosen = finVesselKeyRef.current;
        const k = reduced ? 1 : Math.min(1, dt / 260);
        for (const v of FIN_VESSELS) {
          // self-healing: a sibling "fresh slate" effect may clear this ref on
          // the same [stage] change, in either order — never trust it's populated
          if (!finGlassAnim.current[v.key]) finGlassAnim.current[v.key] = { x: v.x, y: FIN_BASELINE - 6, s: 0.7, op: 0 };
          const anim = finGlassAnim.current[v.key];
          const isChosen = chosen === v.key;
          // unchosen glasses stand on the shelf line: the y target keeps each
          // base pinned to FIN_BASELINE at the current scale, so a hovered
          // glass grows upward from where it stands
          const restY = FIN_BASELINE - (glassBaseY(v.shape, 0, anim.s) / h) * 100;
          const targetX = isChosen ? FIN_HERO.x : v.x;
          const targetY = isChosen ? FIN_HERO.y : restY;
          const targetS = chosen
            ? (isChosen ? FIN_HERO_SCALE : 0.5)
            : (finHoverRef.current === v.key ? FIN_HOVER_SCALE : FIN_REST_SCALE);
          const targetOp = chosen ? (isChosen ? 1 : 0) : 1;
          anim.x += (targetX - anim.x) * k;
          anim.y += (targetY - anim.y) * k;
          anim.s += (targetS - anim.s) * k;
          anim.op += (targetOp - anim.op) * k;
          if (chosen && !isChosen && anim.op < 0.01) continue;
          const cx = (anim.x / 100) * w;
          const cy = (anim.y / 100) * h;
          drawGlass(ctx, v.shape, cx, cy, anim.s, anim.op);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      finDust.current = null;
      finGlassAnim.current = {};
      finBubbleAnim.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Fresh slate whenever the finish hold begins (natural arrival or debug jump).
  useEffect(() => {
    if (stage !== 'finish') return;
    finGlassAnim.current = {};
    finBubbleAnim.current = {};
    setFinBeat('flavors');
    setFinVesselKey(null);
    setFinCaught([]);
    setFinArmed(new Set());
    setFinBanished([]);
    setFinSealed(false);
  }, [stage]);

  // Fresh slate whenever the trace hold begins (natural arrival or debug
  // jump). H1's frozen name-bubbles are cleared too — her trace writes on
  // still water, and the motes it releases are the only light on it.
  useEffect(() => {
    if (stage !== 'trace') return;
    bubbles.current = [];
    setTraceBeat('ring');
    setRingHover(null);
    setRingChosen(null);
    setTraceText('');
    setTraceSealed(false);
  }, [stage]);

  // H8 · The Breath — one composed cycle of echoes, then the drop condenses.
  // Answers are read once at entry (the journey behind us is already sealed).
  // THE ENGINE SEAM: when a real distillation call exists, hold in 'echoes'
  // (looping a reshuffled cycle) until it resolves; today it is instant, so
  // exactly one cycle plays before the condense.
  useEffect(() => {
    if (stage !== 'breath') return;
    breathFrags.current = buildBreathEchoes(answers, FIN_VESSELS.find((v) => v.key === finVesselKey)?.label ?? null);
    setBreathPhase('still');
    setBreathShowReveal(false);
    setBreathReleased(false);
    releaseAtRef.current = null;
    surfaceBegun.current = false;
    const t1 = window.setTimeout(() => setBreathPhase('echoes'), BREATH_STILL_MS);
    const total = BREATH_STILL_MS + (breathFrags.current.length - 1) * BREATH_FRAG_STAGGER_MS + BREATH_FRAG_LIFE_MS;
    const t2 = window.setTimeout(() => setBreathPhase('condense'), total + 350);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, breathRun]);

  // H9 · beat 2 — "there you are." holds, then the spirit-point lets go.
  useEffect(() => {
    if (!breathShowReveal || stage !== 'breath') return;
    const t = window.setTimeout(() => {
      releaseAtRef.current = performance.now();
      setBreathReleased(true);
    }, RELEASE_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [breathShowReveal, stage]);

  // H8 · canvas: motes drift from echo positions to anchors on the figure,
  // then the SPIRIT_PATH draws itself in one stroke and the spirit dot ignites.
  useEffect(() => {
    if (stage !== 'breath') return;
    const canvas = breathCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Sample anchor points along the SPIRIT_PATH in SVG-coordinate space (≈20×24).
    const n = breathFrags.current.length;
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgEl.setAttribute('d', SPIRIT_PATH);
    svgEl.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none';
    document.body.appendChild(svgEl);
    const totalLen = svgEl.getTotalLength();
    const anchorsRaw = Array.from({ length: Math.max(1, n) }, (_, i) => {
      const t = n <= 1 ? 0.5 : i / (n - 1);
      const pt = svgEl.getPointAtLength(t * totalLen);
      return { x: pt.x, y: pt.y };
    });
    document.body.removeChild(svgEl);

    const path2d = new Path2D(SPIRIT_PATH);

    // Seed colour components for rgba construction.
    const sr = parseInt(seedHex.slice(1, 3), 16);
    const sg = parseInt(seedHex.slice(3, 5), 16);
    const sb = parseInt(seedHex.slice(5, 7), 16);
    const sRgb = `${sr}, ${sg}, ${sb}`;

    // Per-mote timing from when this effect starts (≈ breath stage arrival).
    const t0 = performance.now();
    const moteStartMs = breathFrags.current.map((_, i) =>
      BREATH_STILL_MS + i * BREATH_FRAG_STAGGER_MS + BREATH_MOTE_AT_MS
    );
    const moteLandMs = moteStartMs.map((s) => s + BREATH_MOTE_FLIGHT_MS);
    const lastEchoEnd = BREATH_STILL_MS + (n - 1) * BREATH_FRAG_STAGGER_MS + BREATH_FRAG_LIFE_MS;
    const condenseMs = lastEchoEnd + 350;
    const DRAW_MS = reduced ? 80 : 1900;
    const IGNITE_DELAY_MS = 360;
    const IGNITE_MS = reduced ? 60 : 720;
    let revealFired = false;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - t0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Figure geometry — recomputed each frame so resize stays live.
      // figH is 42% of viewport, capped at 380px. Centre in SVG space: (12, 12).
      const figH = Math.min(h * 0.42, 380);
      const figScale = figH / 24;
      const figOX = w / 2 - 12 * figScale;
      const figOY = h * 0.48 - 12 * figScale;
      const toScrn = (px: number, py: number) => ({ x: figOX + px * figScale, y: figOY + py * figScale });
      const anchors = anchorsRaw.map((a) => toScrn(a.x, a.y));
      const spiritPt = toScrn(SPIRIT_DOT.x, SPIRIT_DOT.y);
      const spiritR = SPIRIT_DOT.r * figScale;

      // H9 · the letting go: once released, the whole frozen tableau exhales.
      const rel = releaseAtRef.current;
      const relT = rel === null ? 0 : Math.min(1, (now - rel) / RELEASE_FALL_MS);
      const figureAlpha = rel === null ? 1 : Math.max(0, 1 - relT / 0.85);
      ctx.globalAlpha = figureAlpha;

      // ---- landed motes: tiny glowing dots that mark the anchor positions ----
      for (let i = 0; i < n; i++) {
        if (elapsed < moteLandMs[i]) continue;
        const a = Math.min(1, (elapsed - moteLandMs[i]) / 280) * 0.48;
        ctx.beginPath();
        ctx.arc(anchors[i].x, anchors[i].y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 228, 180, ${a})`;
        ctx.shadowColor = seedHex;
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ---- motes in flight: depart from the echo's surface spot → anchor ----
      if (!reduced) {
        for (let i = 0; i < n; i++) {
          const start = moteStartMs[i];
          const end = moteLandMs[i];
          if (elapsed < start || elapsed >= end) continue;
          const raw = (elapsed - start) / BREATH_MOTE_FLIGHT_MS;
          const ease = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          const spot = BREATH_SPOTS[i % BREATH_SPOTS.length];
          const sx = (spot.x / 100) * w;
          const sy = (spot.y / 100) * h;
          const mx = sx + (anchors[i].x - sx) * ease;
          const my = sy + (anchors[i].y - sy) * ease;
          // trailing comet tail
          const trailRaw = Math.max(0, raw - 0.09);
          const trailEase = trailRaw < 0.5 ? 2 * trailRaw * trailRaw : 1 - Math.pow(-2 * trailRaw + 2, 2) / 2;
          const tx = sx + (anchors[i].x - sx) * trailEase;
          const ty = sy + (anchors[i].y - sy) * trailEase;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(255, 228, 175, ${0.42 - ease * 0.32})`;
          ctx.lineWidth = 1.3;
          ctx.lineCap = 'round';
          ctx.shadowColor = seedHex;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
          // mote head
          ctx.beginPath();
          ctx.arc(mx, my, 2.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 232, 185, ${0.88 - ease * 0.28})`;
          ctx.shadowColor = seedHex;
          ctx.shadowBlur = 13;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ---- condense: the figure strokes itself in one unbroken line ----
      if (elapsed >= condenseMs) {
        const condElapsed = elapsed - condenseMs;
        const prog = reduced ? 1 : Math.min(1, condElapsed / DRAW_MS);
        if (prog > 0) {
          ctx.save();
          ctx.translate(figOX, figOY);
          ctx.scale(figScale, figScale);
          ctx.setLineDash([totalLen * prog, totalLen + 1]);
          ctx.lineDashOffset = 0;
          ctx.strokeStyle = 'rgba(250, 236, 196, 0.86)';
          ctx.lineWidth = 1.1 / figScale;
          ctx.shadowColor = seedHex;
          ctx.shadowBlur = 15;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.stroke(path2d);
          ctx.setLineDash([]);
          ctx.shadowBlur = 0;
          // hot tip: the last ~4 % of drawn path glows bright — the "molten nib"
          if (!reduced) {
            const edgeLen = Math.min(0.04, prog) * totalLen;
            const edgeS = (prog - Math.min(0.04, prog)) * totalLen;
            ctx.setLineDash([edgeLen, totalLen + 1]);
            ctx.lineDashOffset = -edgeS;
            ctx.strokeStyle = 'rgba(255, 254, 246, 0.97)';
            ctx.lineWidth = 1.8 / figScale;
            ctx.shadowColor = `rgba(${sRgb}, 1)`;
            ctx.shadowBlur = 28;
            ctx.stroke(path2d);
            ctx.setLineDash([]);
            ctx.lineDashOffset = 0;
            ctx.shadowBlur = 0;
          }
          ctx.restore();
        }

        // ---- spirit dot ignition: after the stroke completes ----
        const igniteAt = condenseMs + DRAW_MS + IGNITE_DELAY_MS;
        if (elapsed >= igniteAt) {
          const ignT = Math.min(1, (elapsed - igniteAt) / IGNITE_MS);
          const pulse = 0.78 + 0.22 * Math.sin(elapsed / 310);
          // soft outer radiance
          const glowR = Math.max(1, spiritR * (1 + ignT * 2.6));
          const glo = ctx.createRadialGradient(spiritPt.x, spiritPt.y, 0, spiritPt.x, spiritPt.y, glowR * 4.5);
          glo.addColorStop(0, `rgba(255, 248, 230, ${ignT * 0.65 * pulse})`);
          glo.addColorStop(0.35, `rgba(${sRgb}, ${ignT * 0.38 * pulse})`);
          glo.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.beginPath();
          ctx.arc(spiritPt.x, spiritPt.y, glowR * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = glo;
          ctx.fill();
          // bright core
          const coreR = Math.max(0.5, spiritR * (0.65 + ignT * 0.35));
          ctx.beginPath();
          ctx.arc(spiritPt.x, spiritPt.y, coreR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 242, ${ignT * pulse})`;
          ctx.shadowColor = `rgba(${sRgb}, 0.9)`;
          ctx.shadowBlur = 22 * ignT;
          ctx.fill();
          ctx.shadowBlur = 0;
          if (!revealFired && ignT >= 1) {
            revealFired = true;
            window.setTimeout(() => setBreathShowReveal(true), 420);
          }
          // expanding bloom ring — one slow ripple after the ignition settles
          if (ignT >= 1) {
            const bloomT = Math.min(1, (elapsed - igniteAt - IGNITE_MS - 120) / 1600);
            if (bloomT > 0) {
              const bloomR = spiritR * (1 + bloomT * 10);
              const bloomA = (1 - bloomT) * 0.45;
              ctx.beginPath();
              ctx.arc(spiritPt.x, spiritPt.y, bloomR, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${sRgb}, ${bloomA})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

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

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, breathRun]);

  // the bubble canvas serves the opening (name-bubbles) and the closing
  // (trace motes) — hidden through the middle of the journey
  const overlayHidden = !(stage === 'arrive' || stage === 'lines' || stage === 'name' || stage === 'lens' || stage === 'trace');

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
      onClick={skipLines}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        /* preload stays "auto": playUntil drives real playback and the #1
           locked constraint is that the footage never looks laggy, so the
           buffer is bought up front. The poster is what changes — 18 kB that
           paints the first hold's own frame instantly, so the descent lands
           on the depths instead of on black while 14.5 MB arrives. */
        preload="auto"
        poster="/journey-poster.jpg"
        className={`absolute inset-0 z-0 h-full w-full object-cover ${
          stage === 'surface' && surfacePhase !== 'film' ? 'surface-film-sink' : ''
        }`}
        style={{
          // belt-and-braces: object-cover is set here too, so the fill never
          // depends on the class scanner picking the utility out of the template
          objectFit: 'cover',
          transform: `scale(${breathScale})`,
          transformOrigin: '50% 38%',
          transition: stage === 'ascend3'
            ? 'transform 2.4s ease' // the lean exhales into the real rise
            : 'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Enhanced journey footage (1440p VP9 / 1080p H.264). WebM first for
            quality on Chromium/Firefox; MP4 is the Safari/iOS fallback. */}
        <source src="/journey.webm" type="video/webm" />
        <source src="/journey.mp4" type="video/mp4" />
      </video>

      {/* arrival from black + the breathing of the held frame */}
      <div className="depth-veil absolute inset-0 z-10 pointer-events-none" />
      <div className="depth-breathe absolute inset-0 z-10 pointer-events-none" />

      {/* from the breath on, the film recedes into shadow: the video's own
          drink must never read as HER cocktail (Robin 2026-07-10). Stays up
          through the splash, until the sink takes the frame fully black. */}
      {(stage === 'breath' || stage === 'surface') && (
        <div className="breath-dim-veil absolute inset-0 z-10 pointer-events-none" />
      )}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)' }} />

      {/* the breath: a brief warm bloom as each gravity answer lands */}
      {stage === 'gravity' && gravBreaths > 0 && (
        <div key={gravBreaths} className="grav-breath absolute inset-0 z-10 pointer-events-none" />
      )}

      {/* the resonance, finish and trace holds are the footage's brightest
          strata — the night falls over them so the constellation / crown /
          still-surface rings can burn (PRODUCT.md: "use darkness to make
          the light pop"); also what makes the words legible. It stays down
          through the final ascent and the breath — the crown at ~11.9s is
          the footage's whitest frame. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(8, 4, 2, 0.24) 0%, rgba(8, 4, 2, 0.36) 48%, rgba(5, 2, 1, 0.74) 100%)',
          opacity: stage === 'resonance' || stage === 'finish' || stage === 'trace' || stage === 'ascend7' || stage === 'breath' ? 1 : 0,
          transition: 'opacity 1.4s ease',
        }}
      />

      {/* H5 only — nightfall. The chapter is "an open night sky", but the
          citrus-burst hold is the footage's brightest frame and its own
          starbursts drown the constellation. Real night falls over the burst:
          darkest overhead, the climax surviving low at the horizon like the
          glow inside the drink. The stars come out as the sky darkens. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 130% 95% at 50% 104%, rgba(10, 5, 14, 0.5) 0%, rgba(7, 3, 12, 0.72) 42%, rgba(4, 2, 10, 0.86) 76%, rgba(3, 1, 8, 0.9) 100%)',
          opacity: stage === 'resonance' ? 1 : 0,
          transition: 'opacity 1.8s ease',
        }}
      />

      {/* the Color Seed: live grade over the footage — try-on, bloom, memory */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          backgroundColor: tintHex ?? 'transparent',
          mixBlendMode: 'color',
          opacity: tintColorOp,
          transition: tintTransition,
        }}
      />
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          backgroundColor: tintHex ?? 'transparent',
          mixBlendMode: 'soft-light',
          opacity: tintLightOp,
          transition: tintTransition,
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ opacity: overlayHidden ? 0 : 1, transition: 'opacity 1.2s ease' }}
      />

      <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
        {stage === 'lines' && (
          <p
            key={lineIdx}
            className="depth-line max-w-xl text-center font-playfair italic text-xl sm:text-2xl leading-relaxed text-[#f5ead8]"
          >
            {LINES[lineIdx]}
          </p>
        )}

        {stage === 'name' && (
          <form
            className="q-rise flex flex-col items-center gap-9"
            onSubmit={(e) => { e.preventDefault(); commitName(); }}
          >
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => {
                if (e.target.value.length > name.length) releaseKeyBubble();
                setName(e.target.value);
              }}
              placeholder="Your name…"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              maxLength={40}
              className="depth-input"
              aria-label="Your name"
            />
            <button type="submit" className={`depth-continue ${name.trim() ? 'depth-continue-on' : ''}`}>
              Deepen
            </button>
          </form>
        )}

        {stage === 'lens' && (
          <div className="flex flex-col items-center gap-10 sm:gap-12">
            <h2
              className={`q-rise max-w-md text-center font-playfair italic text-xl sm:text-2xl text-[#f5ead8] ${chosen !== null ? 'lens-question-out' : ''}`}
            >
              Who should this cocktail capture?
            </h2>
            <div className="lens-grid">
              {LENSES.map((label, i) => (
                <div key={label} className="lens-drift">
                  <button
                    type="button"
                    onClick={() => pickLens(i)}
                    onAnimationEnd={() => {
                      if (chosen === null && !appeared[i]) {
                        setAppeared((prev) => prev.map((v, j) => (j === i ? true : v)));
                      }
                    }}
                    className={`lens-bubble ${appeared[i] ? 'lens-appeared' : ''} ${
                      chosen === null ? '' : chosen === i ? 'lens-chosen' : 'lens-fizz'
                    }`}
                    style={{ animationDelay: chosen === null ? `${i * 110}ms` : `${(i % 3) * 70}ms` }}
                  >
                    <span>{label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 'seed' && (
          <div className="seed-ring q-rise" style={{ animationDelay: '0.5s' }}>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14">
              <h2
                className={`max-w-xs text-center font-playfair italic text-xl sm:text-2xl text-[#f5ead8] ${
                  seedChosen !== null ? 'lens-question-out' : ''
                }`}
              >
                Which colour is yours?
              </h2>
            </div>
            {SEEDS.map((s, i) => (
              <div
                key={s.name}
                className="seed-pos"
                style={{ left: `${SEED_POS[i].x}%`, top: `${SEED_POS[i].y}%` }}
              >
                <div
                  className="seed-drift"
                  style={{
                    animationName: i % 2 ? 'lensDriftB' : 'lensDriftA',
                    animationDuration: `${5.2 + (i % 4) * 0.9}s`,
                    animationDelay: `${-i * 0.9}s`,
                  }}
                >
                  <button
                    type="button"
                    className={`seed-drop ${
                      seedChosen === null ? '' : seedChosen === i ? 'seed-burst' : 'seed-dissolve'
                    }`}
                    style={{ '--c': s.hex, '--w': `calc(clamp(44px, 7.5vmin, 60px) * ${s.s})` } as CSSProperties}
                    onMouseEnter={() => { if (seedChosen === null) setHoverSeed(i); }}
                    onMouseLeave={() => setHoverSeed((h) => (h === i ? null : h))}
                    onClick={() => pickSeed(i)}
                    aria-label={s.name}
                  >
                    <span className="seed-label font-playfair italic">{s.name}</span>
                  </button>
                </div>
                {seedChosen === i && <div className="seed-ripple" style={{ borderColor: s.hex }} />}
              </div>
            ))}
          </div>
        )}

        {stage === 'gravity' && (
          <div className="absolute inset-0">
            <div className="absolute left-0 right-0 top-[15%] flex justify-center">
              <h2 className="q-rise font-playfair italic text-xl sm:text-2xl text-[#f5ead8]">
                Choose your gravity
              </h2>
            </div>

            {/* the clouds reach back: each side glows as the mote nears it */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
              style={{
                background: 'radial-gradient(62% 52% at 10% 50%, rgba(165, 38, 52, 0.5) 0%, transparent 72%)',
                opacity: leftPull * 0.6,
                transition: gravDragging ? 'none' : 'opacity 0.5s ease',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
              style={{
                background: 'radial-gradient(62% 52% at 90% 50%, rgba(255, 240, 210, 0.4) 0%, transparent 72%)',
                opacity: rightPull * 0.6,
                transition: gravDragging ? 'none' : 'opacity 0.5s ease',
              }}
            />

            <div key={gravRound} className={`grav-pair ${gravCommitted ? 'grav-pair-out' : ''}`}>
              <span
                className="grav-pole grav-pole-left"
                style={{ opacity: 0.55 + leftPull * 0.45, transform: `translateY(-50%) scale(${1 + leftPull * 0.12})` }}
              >
                {GRAVITIES[gravRound].left}
              </span>
              <span
                className="grav-pole grav-pole-right"
                style={{ opacity: 0.55 + rightPull * 0.45, transform: `translateY(-50%) scale(${1 + rightPull * 0.12})` }}
              >
                {GRAVITIES[gravRound].right}
              </span>
            </div>

            <div
              ref={trackRef}
              className="grav-track"
              role="slider"
              tabIndex={gravCommitted ? -1 : 0}
              aria-label={`Choose your gravity: ${GRAVITIES[gravRound].left} to ${GRAVITIES[gravRound].right}. Use arrow keys, then press Enter to let go.`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(gravX)}
              aria-valuetext={
                gravX < 45
                  ? `Leaning ${GRAVITIES[gravRound].left}`
                  : gravX > 55
                    ? `Leaning ${GRAVITIES[gravRound].right}`
                    : `Balanced between ${GRAVITIES[gravRound].left} and ${GRAVITIES[gravRound].right}`
              }
              onPointerDown={(e) => {
                if (gravCommitted) return;
                try { (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); } catch { /* synthetic pointers */ }
                setGravDragging(true);
                setGravHinted(true);
                gravMoveTo(e.clientX);
              }}
              onPointerMove={(e) => {
                if (gravDragging && !gravCommitted) gravMoveTo(e.clientX);
              }}
              onPointerUp={(e) => {
                if (!gravDragging || gravCommitted) return;
                setGravDragging(false);
                commitGravity(gravMoveTo(e.clientX));
              }}
              onPointerCancel={() => setGravDragging(false)}
              onKeyDown={(e) => {
                if (gravCommitted) return;
                // arrows nudge the glow, Home/End throw it to a pole, Enter/Space
                // lets it go where it rests — the keyboard mirror of the drag
                const STEP = 4;
                if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                  e.preventDefault(); setGravHinted(true); setGravX((v) => Math.max(0, v - STEP));
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                  e.preventDefault(); setGravHinted(true); setGravX((v) => Math.min(100, v + STEP));
                } else if (e.key === 'Home') {
                  e.preventDefault(); setGravHinted(true); setGravX(0);
                } else if (e.key === 'End') {
                  e.preventDefault(); setGravHinted(true); setGravX(100);
                } else if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); commitGravity(gravX);
                }
              }}
            >
              <div className="grav-line" />
              <div
                className={`grav-mote ${gravDragging ? 'grav-mote-drag' : ''}`}
                style={{
                  left: `${gravX}%`,
                  '--c': seedHex,
                  transition: gravDragging ? 'none' : 'left 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                } as CSSProperties}
              >
                {gravCommitted && <span className="grav-ripple" style={{ borderColor: seedHex }} />}
              </div>
            </div>

            {gravRound === 0 && !gravHinted && (
              <p className="grav-hint font-playfair italic">drag the glow, let go where it feels true</p>
            )}

            <div className="grav-dots">
              {GRAVITIES.map((g, i) => (
                <span
                  key={g.key}
                  className="grav-dot"
                  style={{
                    background: i < gravRound || (i === gravRound && gravCommitted) ? seedHex : 'transparent',
                    borderColor: i === gravRound ? seedHex : 'rgba(255, 235, 200, 0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === 'hidden' && (
          <div className="hidden-stage absolute inset-0">
            {hStage !== 'intro' && (
              <>
                {hRound === -1 ? (
                  <div ref={practiceTextRef} className="practice-text">
                    <p className="hidden-q font-playfair italic">Too quick to think. Trust the spirit within.</p>
                    <p
                      className="hidden-hint font-playfair italic"
                      style={{ animationDelay: `${PRACTICE_HINT_DELAY_MS}ms` }}
                    >
                      catch either one before it cools — nine will ask something real
                    </p>
                  </div>
                ) : (
                  <p className="hidden-q font-playfair italic">Which is more you?</p>
                )}
                <div key={hRound} className="ember-field">
                  <button
                    ref={dropARef}
                    type="button"
                    className="ember"
                    style={{ '--x': '41%', '--c': seedHex } as CSSProperties}
                    onClick={(e) => catchDrop('a', e.clientX, e.clientY)}
                  >
                    <span className="ember-core" aria-hidden="true" />
                    <span className="ember-word">{hRound === -1 ? 'This' : BINARIES[hRound].a}</span>
                  </button>
                  <button
                    ref={dropBRef}
                    type="button"
                    className="ember"
                    style={{ '--x': '59%', '--c': seedHex } as CSSProperties}
                    onClick={(e) => catchDrop('b', e.clientX, e.clientY)}
                  >
                    <span className="ember-core" aria-hidden="true" />
                    <span className="ember-word">{hRound === -1 ? 'That' : BINARIES[hRound].b}</span>
                  </button>
                </div>
                {/* Still Water only: without a clock, letting both cool has to
                    be something she can actually do (WCAG 2.2.1) */}
                {stillWater && hStage === 'play' && (
                  <button type="button" className="ember-pass" onClick={letThemCool}>
                    let them cool
                  </button>
                )}
                <div className="hidden-dots">
                  {BINARIES.map((bin, i) => {
                    const settled = i < hRound || (i === hRound && hChosen !== null);
                    const kept = hResults.current[bin.key] !== undefined;
                    return (
                      <span
                        key={bin.key}
                        className={`hidden-dot ${i === hRound ? 'current' : ''} ${settled ? (kept ? 'kept' : 'secret') : ''}`}
                        style={{ '--c': seedHex } as CSSProperties}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {hRipple && (
              <span className="ember-ripple" style={{ left: hRipple.x, top: hRipple.y, borderColor: hRipple.c }} />
            )}
          </div>
        )}

        {stage === 'resonance' && (
          <div className={`res-stage absolute inset-0 ${resSealing ? 'res-sealing' : ''}`}>
            <canvas ref={resCanvasRef} className="absolute inset-0 pointer-events-none" />
            <div key={resQ} className="absolute inset-0">
              <p className="hidden-q font-playfair italic">{RES_QUESTIONS[resQ].prompt}</p>
              <p className="res-sub font-playfair italic">choose up to three · touch again to let go</p>
              {RES_QUESTIONS[resQ].words.map((word, i) => {
                const lit = resChosen.includes(i);
                const dim = !lit && resChosen.length >= RES_MAX;
                return (
                  <button
                    key={word.w}
                    ref={(el) => { resGlintRefs.current[i] = el; }}
                    type="button"
                    className={`res-glint ${lit ? 'res-lit' : ''} ${dim ? 'res-dim' : ''}`}
                    style={{
                      '--x': `${resPortrait ? word.mx : word.x}%`,
                      '--y': `${resPortrait ? word.my : word.y}%`,
                      '--c': seedHex,
                      '--d': `${380 + i * 95}ms`,
                      '--drift': `${7.5 + (i % 5) * 0.9}s`,
                      '--shim': `${2.6 + (i % 4) * 0.7}s`,
                    } as CSSProperties}
                    onClick={() => toggleGlint(i)}
                  >
                    <span className="res-drift">
                      <span className="res-dot" aria-hidden="true" />
                      <span className="res-word">{word.w}</span>
                    </span>
                  </button>
                );
              })}
              <button
                type="button"
                className="res-seal font-playfair italic"
                style={{
                  opacity: resChosen.length === 0 ? 0 : resChosen.length >= RES_MAX ? 0.95 : 0.55,
                  pointerEvents: resChosen.length === 0 ? 'none' : 'auto',
                  textShadow: resChosen.length >= RES_MAX ? `0 0 18px ${seedHex}` : undefined,
                }}
                onClick={sealResonance}
              >
                let it resonate
              </button>
            </div>
            {resRise && (
              <span
                className="res-rise"
                style={{ left: resRise.x, top: resRise.y, '--c': seedHex } as CSSProperties}
              />
            )}
          </div>
        )}

        {stage === 'finish' && (
          <div className="fin-stage absolute inset-0">
            <canvas ref={finCanvasRef} className="absolute inset-0 pointer-events-none" />

            {finBeat === 'flavors' && (
              <div className="absolute inset-0">
                <p className="hidden-q font-playfair italic">What flavours are calling you?</p>
                <p className="res-sub font-playfair italic">choose up to three as they rise · touch a kept one to let it go</p>
                {FIN_FLAVORS.map((f) => {
                  const held = finCaught.includes(f.w);
                  return (
                    <button
                      key={f.w}
                      ref={(el) => { finBubbleRefs.current[f.w] = el; }}
                      type="button"
                      className={`fin-bubble ${held ? 'fin-bubble-held' : ''} ${held && finArmed.has(f.w) ? 'fin-bubble-armed' : ''}`}
                      style={{ '--c': seedHex } as CSSProperties}
                      onClick={() => catchFlavor(f.w)}
                      onMouseLeave={() => {
                        if (finCaught.includes(f.w)) setFinArmed((prev) => new Set(prev).add(f.w));
                      }}
                      aria-pressed={held}
                    >
                      <span className="fin-bubble-label font-playfair italic">{f.w}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="res-seal font-playfair italic"
                  style={{
                    opacity: finCaught.length === 0 ? 0 : finCaught.length >= FIN_MAX_FLAVORS ? 0.95 : 0.55,
                    pointerEvents: finCaught.length === 0 ? 'none' : 'auto',
                    textShadow: finCaught.length >= FIN_MAX_FLAVORS ? `0 0 18px ${seedHex}` : undefined,
                  }}
                  onClick={sealCatch}
                >
                  carry it forward
                </button>
              </div>
            )}

            {finBeat === 'glass' && (
              <div className="absolute inset-0">
                <p className="hidden-q font-playfair italic">How should the drink sit in your hand?</p>
                <p className="res-sub font-playfair italic">choose its glass</p>
                {FIN_VESSELS.map((v, i) => (
                  <button
                    key={v.key}
                    type="button"
                    aria-label={v.label}
                    className="fin-glass-hit"
                    style={{ '--x': `${v.x}%`, animationDelay: `${160 + i * 90}ms` } as CSSProperties}
                    onClick={() => chooseGlass(v.key)}
                    onMouseEnter={() => { finHoverRef.current = v.key; }}
                    onMouseLeave={() => { if (finHoverRef.current === v.key) finHoverRef.current = null; }}
                  >
                    <span className="fin-glass-label font-playfair italic">{v.label}</span>
                  </button>
                ))}
              </div>
            )}

            {finBeat === 'ward' && (
              <div className="absolute inset-0">
                <p className="hidden-q font-playfair italic">What should never touch your glass?</p>
                <p className="res-sub font-playfair italic">touch to exclude it</p>
                {/* a composed row beneath the hero glass — not scattered along
                    the bottom edge where it collided with the seal */}
                <div className="fin-ward-row">
                  {FIN_VETOES.map((w, i) => {
                    const off = finBanished.includes(w);
                    return (
                      <button
                        key={w}
                        type="button"
                        className={`fin-ward ${off ? 'fin-ward-off' : ''} font-playfair italic`}
                        style={{ animationDelay: `${160 + i * 70}ms` }}
                        onClick={() => toggleWard(w)}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="res-seal font-playfair italic"
                  style={{ opacity: 0.85 }}
                  onClick={sealWard}
                >
                  {finBanished.length === 0 ? 'nothing to exclude' : 'seal the glass'}
                </button>
              </div>
            )}

            {finSealed && <div className="fin-bloom absolute inset-0 pointer-events-none" />}
          </div>
        )}

        {stage === 'trace' && (
          <div className="trace-stage absolute inset-0">
            {/* a local pool of night under both beats — this hold sits on the
                footage's brightest band and the shared veil alone can't carry
                hairline rings or a placeholder there */}
            <div className="trace-pool absolute inset-0 pointer-events-none" />
            {traceBeat === 'ring' && (
              <div className="absolute inset-0">
                <p className="hidden-q font-playfair italic">How often does a cocktail find you?</p>
                <p className="res-sub font-playfair italic">never at the rim, exclusively at the heart · touch the depth that holds you</p>
                <div className={`trace-dial ${ringChosen !== null ? 'trace-dial-chosen' : ''}`}>
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    {TRACE_RINGS.map((ring, i) => (
                      <circle
                        key={ring.value}
                        className={`trace-ring ${ringChosen === null ? (ringHover === i ? 'hover' : '') : ringChosen === i ? 'chosen' : 'faded'}`}
                        cx="50"
                        cy="50"
                        r={ring.r}
                        style={{ '--i': i, '--c': seedHex } as CSSProperties}
                      />
                    ))}
                    {/* the plumb-line: one hairline dropped from the heart to the
                        rim, a marker dot where it crosses each ring — the gauge
                        that makes the rings readable as an ordered scale */}
                    <line className="trace-plumb" x1="50" y1="52" x2="50" y2="96" />
                    {TRACE_RINGS.map((ring, i) => (
                      <circle
                        key={`dot-${ring.value}`}
                        className={`trace-dot ${ringChosen === null ? (ringHover === i ? 'hover' : '') : ringChosen === i ? 'chosen' : 'faded'}`}
                        cx="50"
                        cy={50 + ring.r}
                        r="1"
                        style={{ '--i': i, '--c': seedHex } as CSSProperties}
                      />
                    ))}
                    {/* the first drop, waiting at the heart of the craft */}
                    <circle className="trace-heart" cx="50" cy="50" r="1.1" style={{ '--c': seedHex } as CSSProperties} />
                    {ringChosen !== null && (
                      <circle
                        className="trace-ripple"
                        cx="50"
                        cy="50"
                        r={TRACE_RINGS[ringChosen].r}
                        style={{ '--c': seedHex } as CSSProperties}
                      />
                    )}
                    {/* invisible hit bands last, so they sit above the visuals */}
                    {TRACE_RINGS.map((ring, i) => (
                      <circle
                        key={`hit-${ring.value}`}
                        className={`trace-ring-hit ${i === TRACE_RINGS.length - 1 ? 'trace-ring-hit-heart' : ''}`}
                        cx="50"
                        cy="50"
                        r={ring.r}
                        onClick={() => chooseRing(i)}
                        onMouseEnter={() => { if (ringChosen === null) setRingHover(i); }}
                        onMouseLeave={() => setRingHover((h) => (h === i ? null : h))}
                      />
                    ))}
                  </svg>
                  {/* The labels are the dial's accessible control surface: the
                      SVG above is aria-hidden and pointer-only, so without
                      these the hold has no keyboard path at all. */}
                  <div role="radiogroup" aria-label="How often does a cocktail find you?">
                    {TRACE_RINGS.map((ring, i) => (
                      <button
                        key={`label-${ring.value}`}
                        ref={(el) => { ringLabelRefs.current[i] = el; }}
                        type="button"
                        role="radio"
                        aria-checked={ringChosen === i}
                        tabIndex={ringChosen !== null ? (ringChosen === i ? 0 : -1) : ringFocus === i ? 0 : -1}
                        className={`trace-ring-label font-playfair italic ${ringChosen === null ? (ringHover === i ? 'hover' : '') : ringChosen === i ? 'chosen' : 'faded'}`}
                        style={{ left: '52.5%', top: `${50 + ring.r}%`, '--i': i, '--c': seedHex } as CSSProperties}
                        onClick={() => chooseRing(i)}
                        onKeyDown={(e) => moveRingFocus(e, i)}
                        onFocus={() => { if (ringChosen === null) { setRingFocus(i); setRingHover(i); } }}
                        onBlur={() => setRingHover((h) => (h === i ? null : h))}
                        onMouseEnter={() => { if (ringChosen === null) setRingHover(i); }}
                        onMouseLeave={() => setRingHover((h) => (h === i ? null : h))}
                      >
                        {ring.value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {traceBeat === 'trace' && (
              <form
                className="absolute inset-0"
                onSubmit={(e) => { e.preventDefault(); sealTrace(); }}
              >
                <p className="hidden-q font-playfair italic">Leave one trace of yourself</p>
                <p className="res-sub font-playfair italic">a memory, a flavour you loved once, a place you carry · the ink keeps it</p>
                <div className="trace-input-row">
                  <input
                    ref={traceInputRef}
                    className="depth-input trace-input"
                    value={traceText}
                    onChange={(e) => {
                      if (e.target.value.length > traceText.length) releaseTraceMote();
                      setTraceText(e.target.value);
                    }}
                    placeholder="the summer my grandmother kept figs on the windowsill…"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={120}
                    disabled={traceSealed}
                    aria-label="Leave one trace of yourself"
                  />
                </div>
                <button type="submit" className="res-seal font-playfair italic" style={{ opacity: traceSealed ? 0 : 0.85 }}>
                  {traceText.trim() ? 'let it settle' : 'leave nothing but tonight'}
                </button>
              </form>
            )}

            {traceSealed && <div className="trace-bloom absolute inset-0 pointer-events-none" />}
          </div>
        )}

        {stage === 'breath' && (
          <div className="breath-stage absolute inset-0">
            <canvas ref={breathCanvasRef} className="absolute inset-0 pointer-events-none" />
            {breathPhase !== 'still' &&
              breathFrags.current.map((f, i) => {
                const spot = BREATH_SPOTS[i % BREATH_SPOTS.length];
                return (
                  <p
                    key={`${i}-${f}`}
                    className="breath-frag font-playfair italic"
                    style={{
                      '--x': `${spot.x}%`,
                      '--y': `${spot.y}%`,
                      animationDelay: `${i * BREATH_FRAG_STAGGER_MS}ms`,
                      animationDuration: `${BREATH_FRAG_LIFE_MS}ms`,
                    } as CSSProperties}
                  >
                    {f}
                  </p>
                );
              })}
            {breathShowReveal && (
              <p className={`breath-reveal font-playfair italic${breathReleased ? ' breath-reveal-out' : ''}`}>
                there you are.
              </p>
            )}
          </div>
        )}

        {stage === 'surface' && (
          <div className="surface-stage pointer-events-none absolute inset-0 z-40">
            {surfacePhase !== 'film' && <div className="surface-sink" />}
            {(surfacePhase === 'black' || surfacePhase === 'held') && <div className="surface-black" />}
            {/* dev stub only — with TheSurfacing attached, the black hands off silently */}
            {surfacePhase === 'held' && !onComplete && (
              <p className="surface-whisper font-playfair italic">the surface breaks · to be continued</p>
            )}
          </div>
        )}
      </div>

      {import.meta.env.DEV && <DevNav onJump={debugJump} onPage={onDevPage} />}
    </section>
  );
}
