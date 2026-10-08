import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Answers } from '../types';
import { FlavourIcon } from './FlavourIcon';
import { ResonanceWorld } from './ResonanceWorld';

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
// On the bitters hold (~5.7s, black teardrops overhead), nine "inner texture"
// binaries play one at a time.
// The on-ramp (v4, Robin, 2026-10-06; prototype in design-artifacts/evolution/
// prototypes/h4-ready-set-go): "Tap the word that is more you." is born in
// the true middle of the frame while the whole frame dims a little, and one
// short line follows under it. Both read there, then rise together to the
// head, and the rise IS the start: no "try one first", no Ready · Set · Go.
// As they arrive, the first pair is just "1" and "2" (round -1, unscored)
// on the real clock, so the mechanic is learnt by doing it once. Then Sharp /
// Smooth; the second line fades and the question stays for all nine.
// (Rev 2's Tea / Coffee rehearsal and its "Too quick to think" prompt are
// gone.)
// Rev 2 (2026-09-18 review) — this hold read as the journey's one confusing
// stretch, and the diagnosis was the on-ramp, never the mechanic:
//   · the prompt said what NOT to do ("too quick to think") while the actual
//     instruction sat underneath it at 13px / 0.5 alpha on the brightest band
//     in the film. It is now the shared .depth-hint voice over a pool of night.
//   · the practice pair was "This" / "That", which teaches the motion with
//     words that mean nothing, so a first-timer could not tell whether the
//     question had started. Tea / Coffee is weightless and still real.
//   · the word is now the ember itself (rev 3): large, on a pool of seed
//     colour, cooling in place — a draining ring was tried and rejected.
//   · the prompt used to lift out of the way as the embers arrived, moving
//     the one thing she was still reading. It now stays where every other
//     hold keeps its question.
// Two glowing embers hang suspended — the same core language as H3's mote —
// each carrying one word, pulsing like a heartbeat. Then they start to cool:
// the pulse weakens, they shrink and dim toward a dead coal. Catch the one
// that's more you before it's gone — it flares white-hot and bursts, the
// other finishes guttering out. What cools unanswered is "a part of you the
// drink keeps secret" (the Storyteller's hidden self). The footage stays
// frozen through all nine; the
// last catch rises to the resonance hold (~8.2s). No chapter cards.

// Dev-only video trial (2026-10-06 video audit): `?video=arrivals` or
// `?video=both` plays a retimed candidate, with the camera eased into each
// hold (and out of it, for "both"), in the real journey, so it can be judged
// in place before any asset swap. Served by the prototype server on :5190
// (design-artifacts/evolution/prototypes). import.meta.env.DEV strips it from
// production builds. Holds are 30fps frame numbers.
const VIDEO_TRIALS = {
  arrivals: { src: 'http://localhost:5190/video-arrivals/journey-eased-arrivals-24p.mp4', frames: [31, 73, 136, 228, 318, 369, 423, 474], cut: 16.841667 },
  both: { src: 'http://localhost:5190/video-arrivals/journey-eased-both-24p.mp4', frames: [31, 82, 154, 255, 354, 414, 477, 537], cut: 18.941667 },
} as const;
const trialKey = import.meta.env.DEV && typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('video') : null;
const VIDEO_TRIAL = trialKey === 'arrivals' || trialKey === 'both' ? VIDEO_TRIALS[trialKey] : null;
const trialHold = (i: number, fallback: number) => (VIDEO_TRIAL ? VIDEO_TRIAL.frames[i] / 30 : fallback);

const HOLD_DEPTHS = trialHold(0, 0.6);
const HOLD_SEED = trialHold(1, 1.5);
const HOLD_GRAVITY = trialHold(2, 3.1);
const HOLD_HIDDEN = trialHold(3, 5.7);
const HOLD_RESONANCE = trialHold(4, 8.2);
const HOLD_FINISH = trialHold(5, 9.4);
const HOLD_TRACE = trialHold(6, 10.7);
const HOLD_BREATH = trialHold(7, 11.9);

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
const SURFACE_CUT = VIDEO_TRIAL ? VIDEO_TRIAL.cut : 12.95; // freeze here — the pull-back must never show the video's glass
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
// ripple-ring standing in for it. Confirming gathers the caught bubbles and
// rises them together to break the surface, then the second word-shower falls
// in. After both, the camera rises to the finish hold (~9.4s). No time
// pressure here — after H4's speed, this hold is abundance and wonder.
// Rev 4 (2026-09-18 review). These are the two questions the whole reading
// leans on, and they were the hold that felt least finished: twelve and
// fourteen bare 14px labels, hand-scattered at unrelated bearings, on the
// darkest frame in the film, with the catch signalled only by a 13px dot
// changing colour. Nothing in the layout said "these are choices".
//   · Nine words per round, not twelve/fourteen — each one gets room to be
//     read and to be a comfortable target. The cuts are the overlaps:
//     Recognition/Power fold into each other, Knowledge into Mastery,
//     Energy and Fun into A little chaos, Perspective into Advice,
//     Leadership into Courage, Protection into Comfort.
//   · Each word rides inside a Glass Sphere — the journey's established
//     "choose me" affordance (H1's lenses, H6's flavours) — so H1, H5 and H6
//     now speak one language instead of three.
//   · Rev 4.1 (Robin): the first cut spread the nine at fixed percentages
//     across the whole frame, which read as a grid and sat still. They are
//     now the lens question's sibling — a close, centred 3×3 cluster
//     (.res-cluster) riding the lens bubbles' own desynced drift — so the
//     layout is CSS, not data.
// Robin, 2026-10-06 ("A world of your own"): what people come to you for is
// asked FIRST, so she constitutes herself before she reaches for anything.
// Order changes nothing in the answer shape or the matching model; the
// matching owner logs questionnaire order as a playtest variable.
const RES_QUESTIONS = [
  {
    key: 'soughtFor' as const,
    prompt: 'What do people often come to you for?',
    words: ['Advice', 'Comfort', 'Honesty', 'Courage', 'Ideas', 'Calm', 'Taste', 'A reality check', 'A little chaos'],
  },
  {
    key: 'drawnToward' as const,
    prompt: 'What are you most drawn toward right now?',
    words: ['Freedom', 'Beauty', 'Mastery', 'Peace', 'Belonging', 'Pleasure', 'Wonder', 'Change', 'Knowledge', 'Influence', 'Making', 'Caring'],
  },
] as const;
const RES_MAX = 3;
// H4 → H5: night falls over the ~2.5s rise and keeps falling after it, so the
// world dims like dusk, not like a light switched off. Same value on both
// stages, so the transition never restarts at the arrival.
const NIGHTFALL = 'opacity 5.5s cubic-bezier(0.45, 0, 0.35, 1)';

// H6 · The Finish — "The Pour" (rev 5, 2026-09-29)
// Two beats, one object — the sphere cluster every other choice uses:
//   1. Choose the flavours — H5's cluster again: up to three, each lights in
//      her seed colour and fizzes (the resonance canvas runs here too).
//   2. What to leave out — the same cluster played backwards: pop the bubbles
//      she never wants in the glass. A popped bubble leaves its word behind,
//      struck; touching it blows the bubble back.
// The glass beat is gone (Robin, 2026-09-29). Each persona's pour has its own
// fixed glass (agent/spec/SPEC.md: vessel "does not change the recipe"), so
// asking for one promised something the reveal could not keep — choose a
// coupe, be handed a highball. The drinkScales it wrote default to 50 in
// mixology.ts. Rev 4 rose the flavours through the frame at a smaller size,
// which is what made this hold feel like a different product from H5.
const FIN_MAX_FLAVORS = 3;
const FIN_FLAVORS = ['Sweet', 'Bitter', 'Spicy', 'Herbal', 'Fruity', 'Citrusy', 'Fresh', 'Floral', 'Smoky'];
// "Alcohol" was dropped from this list (Robin, 2026-09-29 rev 2): this is a
// question about what she can't have, and alcohol isn't an allergen. That was
// also the only way to ask for a zero-proof pour — mixology.ts still honours
// /alcohol/ in `allergies`, so a future zero-proof entry point can reuse it.
const FIN_VETOES = ['Egg whites', 'Dairy', 'Gluten', 'Nuts', 'Spice'];

// H7 · The Trace — "The Still Surface" (rev 3: one question, not two)
// On the foam-dome hold (~10.7s) the journey goes near-silent — the chapter
// map's register for this hold is a held breath, not another set piece.
//
// Rev 3 (2026-09-18 review) removed the hold's first beat, "How often does a
// cocktail find you?" — the five-ring depth gauge. Robin's call, and it costs
// the result nothing: the only thing the answer ever reached was
// `frequency === 'Never' → zero-proof`, which H6's "Alcohol" veto used to
// produce (that veto is gone too — see FIN_VETOES), plus two optional echo lines in the breath. It also removed the
// last piece of UI in the journey that still read as a diagram. If the
// question is ever wanted back, it should be one line and three bubbles.
//
// What remains is the bookend: "Leave one trace of yourself." The journey
// opened with her name on a bare line in the dark (H1) and closes with one
// confidence on the same bare line. Each keystroke releases a mote that rises
// and dissolves — H1's bubbles rose and froze because time had stopped; here,
// at the end, the breath is finally let go.
// Sealing blooms once and rises to the breath hold (~11.9s), where the
// reveal work (The Breath / The Unveiling) picks up.

// "Positive – Negative" renamed to "Half-full – Half-empty" (Freya's proposal):
// optimism with zero wrong answer, the most cocktail-native pair possible.
// The example (round -1, unscored): "1" and "2" on the real clock. Numbers,
// not words, so nobody mistakes it for a question (Tea / Coffee was read as
// one), and it still teaches the whole gesture once.
const EXAMPLE_PAIR = { a: '1', b: '2' };
// 16 words (6 + 10), which is what H4_RISE_MS is measured against: keep them
// in step if either line changes. The line stays as the question for all nine.
const H4_LINES = {
  prompt: 'Tap the word that is more you.',
  hint: 'Two at a time. Go with your gut, or let both fade.',
  hintStill: 'Two at a time. Take your time, or let both go.',
};

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
// Rev 2 (2026-09-18 review): 2550 gave a 3.4s round, which is enough time to
// choose but not enough to ALSO read two words you have never seen — on a
// cold run the first two real pairs expired mid-read. 3400 buys the reading
// without softening the "don't think" instinct the hold exists for.
const THAW_MS = 3400;   // then they cool — the pulse weakens, they shrink and dim
const ROUND_MS = FROZEN_MS + THAW_MS; // total catch window per binary

// The on-ramp's beats. 16 words at ~200 words/min is ~4.8s from the line,
// so it rises at 5.6s; the example condenses as the line arrives at the head.
const H4_LINE_MS = 350;
const H4_HINT_MS = 1500;
const H4_RISE_MS = 5600;
const H4_RISE_SETTLE_MS = 1100;
type H4Line = 'off' | 'in' | 'hint' | 'up' | 'quiet';

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
const buildBreathEchoes = (a: Answers): string[] => {
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
  const firstWard = a.allergies.split(',').map((s) => s.trim()).filter(Boolean)[0];
  if (firstWard) out.push(`never ${firstWard.toLowerCase()}`);
  const capped = out.slice(0, 8);
  if (a.insight.trim()) capped.push('…and the one thing you told only the ink');
  if (capped.length < 3) capped.push('the glass is listening', 'what settles now settles true');
  return capped;
};

const LINES = [
  'Somewhere, a cocktail that does not exist yet is waiting to be made.',
  'There are no right answers, only honest ones.',
];

// The six lenses for "Who is this cocktail for?"
const LENSES = [
  'The real me',
  'The me I’m becoming',
  'The night version of me',
  'My inner child',
  'The me I used to be',
  // Was "Someone else" (Robin, 2026-10-06): the cocktail is always hers, and
  // the dedication keeps her name — this lens is another version of her, never
  // another person's drink.
  'Another side of me',
];

// Each colour is a real pour. The hue is the answer; the name is the whisper.
// `s` varies the droplet size so the ring feels found, not arranged.
// The template is liqueur + colour (Robin, 2026-09-18 — a liqueur-only cut
// was tried and reverted). These flow on into the breath's echo
// ("… runs through it") and the reading, so they have to read as a phrase.
const SEEDS = [
  { name: 'Campari Red', hex: '#c8102e', s: 1.0 },
  { name: 'Aperol Orange', hex: '#ff6f1f', s: 0.86 },
  { name: 'Galliano Gold', hex: '#f2c24e', s: 1.12 },
  { name: 'Midori Green', hex: '#58b947', s: 0.92 },
  { name: 'Curaçao Blue', hex: '#1287c8', s: 1.05 },
  { name: 'Violette Purple', hex: '#7b5aa6', s: 0.88 },
  { name: 'Pamplemousse Rosé', hex: '#f2789f', s: 0.97 },
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
type FinBeat = 'flavors' | 'ward';

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
      className="dev-nav fixed bottom-2 left-2 z-[999] flex max-w-[95vw] flex-wrap gap-1 rounded bg-black/75 p-2 font-mono text-[10px] text-white/80"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('lens')}>H1 lens</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('seed')}>H2 seed</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump('gravity')}>H3 gravity</button>
      <button className="rounded border border-white/20 px-1.5 py-0.5 hover:bg-white/10" onClick={() => onJump(-1)}>H4 example</button>
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

/** The journey's one progress language: a row of ringed dots that fill in her
 *  seed colour as each step settles. H3 and H4 each grew their own row at
 *  their own height, and H5 and H6 had none at all — so "how much of this is
 *  left" was answered differently, or not at all, on every hold. H3 and H4
 *  keep their richer dots (kept vs. secret); this is the plain one. */
function DepthDots({
  count,
  index,
  seed,
  onSelect,
  isClickable,
  hasAnswer,
  ariaLabel,
}: {
  count: number;
  index: number;
  seed: string;
  onSelect?: (i: number) => void;
  isClickable?: (i: number) => boolean;
  hasAnswer?: (i: number) => boolean;
  ariaLabel?: (i: number) => string;
}) {
  return (
    <div className="depth-dots">
      {Array.from({ length: count }, (_, i) => {
        const isCurrent = i === index;
        const clickable = Boolean(onSelect && isClickable?.(i));
        const answered = hasAnswer ? hasAnswer(i) : i < index;
        const style = {
          background: answered ? seed : 'transparent',
          borderColor: isCurrent ? seed : 'rgba(255, 235, 200, 0.3)',
        };

        if (clickable && onSelect) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className="depth-dot is-clickable"
              aria-label={ariaLabel ? ariaLabel(i) : `Step ${i + 1} of ${count}`}
              style={style}
            />
          );
        }

        return (
          <span
            key={i}
            className="depth-dot"
            aria-current={isCurrent ? 'step' : undefined}
            style={style}
          />
        );
      })}
    </div>
  );
}

export default function TheDepths({ answers, onUpdate, onPrepare, onComplete, initialJump, onDevPage }: { answers: Answers; onUpdate: (patch: Partial<Answers>) => void; onPrepare?: () => void; onComplete?: () => void; initialJump?: DevJumpTarget; onDevPage?: (page: DevPage) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const videoRaf = useRef<number | undefined>(undefined);
  const videoRvfc = useRef<number | undefined>(undefined);
  const timeouts = useRef<number[]>([]);
  const stageRef = useRef<Stage>('arrive');

  const [stage, setStageState] = useState<Stage>('arrive');
  const [lineIdx, setLineIdx] = useState(0);
  const [name, setName] = useState('');
  const [chosen, setChosen] = useState<number | null>(null);
  const [hoverSeed, setHoverSeed] = useState<number | null>(null);
  const [seedChosen, setSeedChosen] = useState<number | null>(null);
  // The hue is a pulse, then a memory: full bloom on commit, then it exhales
  // to a whisper so the footage leads again. It returns in full at the reveal.
  const [tintPhase, setTintPhase] = useState<'bloom' | 'memory'>('bloom');
  const trackRef = useRef<HTMLDivElement>(null);
  const gravValues = useRef<Record<string, number>>({ ...(answers?.gravity || {}) });
  const [gravRound, setGravRound] = useState(0);
  const [maxGravRound, setMaxGravRound] = useState(() => Math.max(0, Object.keys(answers?.gravity || {}).length));
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
  const hRaf = useRef<number | undefined>(undefined);
  const hStart = useRef(0);
  // read during render (it gates the pass affordance), so it is state, not a
  // ref — the preference is sampled once at mount and never changes mid-hold
  const [stillWater] = useState(prefersReducedMotion);
  const stillWaterRef = useRef(stillWater); // for the rAF loop, which runs outside render
  const hAnswered = useRef(false);
  // The embers are live while still invisible (practice's reading beat) or
  // barely condensed (a new pair); a tap then answered words she could not
  // read (2026-10-06 audit). Set by the round's rAF 250ms into the condense,
  // when they are ~93% in. The fade at the end stays catchable, as before.
  const hReadable = useRef(false);
  const hResults = useRef<Record<string, string>>({});
  const skipHiddenKickoff = useRef(false); // set by debugJump so it doesn't race the natural kickoff
  const [hStage, setHStage] = useState<HiddenStage>('intro');
  const [hLine, setHLine] = useState<H4Line>('off');
  const [hRound, setHRound] = useState(0);
  // H5 · The Effervescence
  const resCanvasRef = useRef<HTMLCanvasElement>(null);
  const resGlintRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const finFloatRefs = useRef<(HTMLDivElement | null)[]>([]); // H6: the rising carriers the flavour spheres ride in
  const finCaughtRef = useRef<string[]>([]);
  const resChosenRef = useRef<number[]>([]); // mirror for the canvas loop (avoids stale closures)
  const resSparks = useRef<Spark[]>([]); // bubble particles: catch-fizz / release / gather / notice, plus the continuous streams
  const resDust = useRef<Mote[] | null>(null); // the ambient fine-bubble field
  // H5 is its own component (ResonanceWorld); this key restarts it on a debug re-jump
  const [resWorldKey, setResWorldKey] = useState(0);
  // she stays mounted into H6 until her last bubble has gone (her fizz is the
  // hand-over); false again once ResonanceWorld reports it
  const [resAfterglow, setResAfterglow] = useState(false);
  // H6 · The Pour — its spheres register into resGlintRefs, so the resonance
  // canvas (fizz, pops) serves both holds
  const [finBeat, setFinBeat] = useState<FinBeat>('flavors');
  const [maxFinBeat, setMaxFinBeat] = useState(() => (answers?.flavors?.length ? 1 : 0));
  const [finCaught, setFinCaught] = useState<string[]>([]); // flavours committed, in catch order
  const [finBanished, setFinBanished] = useState<string[]>([]);
  const [finLeaving, setFinLeaving] = useState(false); // a beat is exiting — its head, pill and spheres go
  const [finSealed, setFinSealed] = useState(false);
  // H0 · the name, let go
  const [nameSealed, setNameSealed] = useState(false);
  // H7 · The Trace
  const traceInputRef = useRef<HTMLInputElement>(null);
  const breathCanvasRef = useRef<HTMLCanvasElement>(null);
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
  const stopVideoWatch = () => {
    if (videoRaf.current) cancelAnimationFrame(videoRaf.current);
    const v = videoRef.current;
    if (v && videoRvfc.current !== undefined && typeof v.cancelVideoFrameCallback === 'function') v.cancelVideoFrameCallback(videoRvfc.current);
    videoRvfc.current = undefined;
  };
  const playUntil = (target: number, then?: () => void) => {
    const v = videoRef.current;
    if (!v) { then?.(); return; }
    stopVideoWatch();
    // Stop on the presented frame that IS the hold (2026-10-06 video audit).
    // Polling currentTime on rAF paused up to a frame late, so RESONANCE,
    // FINISH and SURFACE_CUT showed one frame past the hold and snapped back,
    // and 8.2 froze on 8.166. Still native 1x and a true freeze; seek only if
    // the presented frame is off by more than half a frame. The source is
    // 30fps-stamped.
    if (typeof v.requestVideoFrameCallback === 'function') {
      const F = 1 / 30;
      const frameT = Math.floor(target * 30 + 1e-6) / 30;
      const onFrame: VideoFrameRequestCallback = (_now, meta) => {
        if (meta.mediaTime >= frameT - F / 2) {
          v.pause();
          videoRvfc.current = undefined;
          if (Math.abs(meta.mediaTime - frameT) > F / 2) v.currentTime = frameT + F / 4;
          then?.();
          return;
        }
        videoRvfc.current = v.requestVideoFrameCallback(onFrame);
      };
      videoRvfc.current = v.requestVideoFrameCallback(onFrame);
      v.play().catch(() => { /* footage missing — the overlay world carries on */ });
      return;
    }
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
    stopVideoWatch();
    setSurfacePhase('film');
    if (typeof target === 'number') {
      if (v) { v.pause(); v.currentTime = HOLD_HIDDEN; }
      // only relevant when actually (re-)entering 'hidden' — otherwise the effect never fires and the flag would go stale
      if (stageRef.current !== 'hidden') skipHiddenKickoff.current = true;
      setStage('hidden');
      setHLine(target === -1 ? 'up' : 'quiet');
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
    if (target === 'gravity') { setGravRound(0); setMaxGravRound(0); setGravX(50); setGravCommitted(false); }
    if (target === 'resonance' && stageRef.current === 'resonance') {
      // re-jump onto the same stage: mount a fresh world
      setResWorldKey((k) => k + 1);
    }
    if (target === 'finish' && stageRef.current === 'finish') {
      // re-jump onto the same stage: the arrival effect won't rerun, reset by hand
      setFinBeat('flavors');
      setMaxFinBeat(0);
      setFinCaught([]);
      setFinBanished([]);
      setFinLeaving(false);
      setFinSealed(false);
    }
    if (target === 'trace' && stageRef.current === 'trace') {
      // re-jump onto the same stage: the arrival effect won't rerun, reset by hand
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
      stopVideoWatch();
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

  // The name is let go the way every answer is: the words lift off the line
  // and dissolve, a breath of bubbles rises from it, then the next hold. It
  // used to cut straight to H1 on Enter — the one hard cut in the journey.
  const commitName = () => {
    if (!name.trim() || nameSealed) return;
    onUpdate({ name: name.trim() });
    setNameSealed(true);
    for (let k = 0; k < 7; k++) after(k * 45, releaseKeyBubble);
    after(820, () => setStage('lens'));
  };

  // One tap answers. The chosen sphere lights, then surfaces like H5's; the
  // other five let go where they are. (It used to balloon to 2x and blur while
  // the rest shot 58vh upward — a second, louder exit grammar.)
  const pickLens = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    onUpdate({ lens: LENSES[i] });
    after(1150, () => {
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
    const currentRound = gravRound;
    const pair = GRAVITIES[currentRound];
    gravValues.current[pair.key] = Math.round(v);
    onUpdate({ gravity: { ...gravValues.current } });
    setGravCommitted(true);
    setGravBreaths((b) => b + 1);
    const isLast = currentRound === GRAVITIES.length - 1;
    // The video stays frozen on the gravity hold through all five polarities —
    // no per-question rise (that slow per-answer playback read as lag). Only
    // the chapter change moves the camera, at smooth natural 1x.
    after(620, () => {
      if (isLast) {
        setStage('ascend3');
        playUntil(HOLD_HIDDEN, () => setStage('hidden'));
      } else {
        const nextRound = currentRound + 1;
        setGravRound(nextRound);
        setMaxGravRound((prev) => Math.max(prev, nextRound));
        const savedVal = gravValues.current[GRAVITIES[nextRound]?.key];
        setGravX(savedVal !== undefined ? savedVal : 50);
        setGravCommitted(false);
      }
    });
  };

  const revertGravity = (targetIndex: number) => {
    if (gravCommitted) return;
    if (targetIndex === gravRound) return;
    const canJump = targetIndex <= maxGravRound || gravValues.current[GRAVITIES[targetIndex]?.key] !== undefined;
    if (!canJump) return;

    setGravRound(targetIndex);
    const savedVal = gravValues.current[GRAVITIES[targetIndex]?.key];
    setGravX(savedVal !== undefined ? savedVal : 50);
    setGravDragging(false);
    trackRef.current?.focus();
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
  // The example (round -1) runs on the same clock as the nine: the reading
  // beat now belongs to the line, before any round starts.
  const paintDrops = (elapsed: number) => {
    const revealDelay = 0;
    const frozenMs = FROZEN_MS;
    const thawMs = THAW_MS;
    const e = Math.max(0, elapsed - revealDelay);
    const beat = Math.sin(e / 520); // a slow breath, not a throb
    let op = 0, scale = 1, glow = 1;
    // The cooling is legible on the word itself (see .ember-word: its halo
    // draws in, it dims and shrinks a little as --ember-glow / --ember-scale
    // run down), so there is no separate clock. A draining ring was tried and
    // rejected — Robin, 2026-09-18: the disappearing is already understood.
    if (elapsed < revealDelay) {
      op = 0;
    } else if (stillWaterRef.current) {
      // Still Water: ignite, then hold — no pulse, no cooling, no deadline
      op = Math.min(1, e / 260);
      scale = 0.82 + 0.18 * op;
      glow = 0.85 + 0.15 * op;
    } else if (e < frozenMs) {
      const inT = 1 - Math.pow(1 - Math.min(1, e / 420), 3); // condenses in, eased
      op = inT;
      scale = 0.88 + 0.12 * inT + beat * 0.015;
      glow = 1;
    } else {
      // Dissolving into the liquid (rev 4): the glass thins and sinks a touch,
      // the sphere draws in only slightly, and the word stays sharp for the
      // first half — it blurs away only in the last stretch (see .ember CSS).
      // It used to shrink to 40% and grey out through a brightness filter.
      const tp = Math.min(1, (e - frozenMs) / thawMs);
      const amp = 0.015 * (1 - tp);
      scale = 1 - tp * 0.16 + beat * amp;
      glow = Math.max(0.05, 1 - tp * 0.95);
      op = tp < 0.78 ? 1 : Math.max(0, (1 - tp) / 0.22);
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

  // `gap` is the breath between pairs: longer after a catch, so the chosen
  // sphere can finish rising before the next pair condenses
  const advanceHidden = (next: number, gap = 560) => {
    if (next >= BINARIES.length) {
      setHStage('gap');
      after(750, () => {
        setStage('ascend4');
        playUntil(HOLD_RESONANCE, () => setStage('resonance'));
      });
      return;
    }
    after(gap, () => startHRound(next));
  };

  const startHRound = (i: number) => {
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    hAnswered.current = false;
    hReadable.current = false;
    setHRound(i);
    setHStage('play');
    hStart.current = performance.now();
    // Still Water has no deadline — the round ends when she ends it
    const roundMs = stillWaterRef.current ? Infinity : ROUND_MS;
    // the second line has done its job once the real words begin
    if (i >= 0) setHLine('quiet');
    let lastFrame = hStart.current;
    const tick = (now: number) => {
      // A hidden or frozen tab stops rAF, so a long gap between frames means
      // she was away. The pair she never saw must not expire into a "secret"
      // (2026-10-06 mobile audit; agreed with the matching owner): hide it and
      // present the same pair again.
      if (now - lastFrame > 500) {
        paintDrops(0);
        after(600, () => startHRound(i));
        return;
      }
      lastFrame = now;
      const elapsed = now - hStart.current;
      if (elapsed >= 250) hReadable.current = true;
      paintDrops(elapsed);
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

  const catchDrop = (side: 'a' | 'b') => {
    if (hStage !== 'play' || hAnswered.current) return;
    // Only a word she can read can be chosen (see hReadable)
    if (!hReadable.current) return;
    hAnswered.current = true;
    if (hRaf.current) cancelAnimationFrame(hRaf.current);
    if (hRound >= 0) {
      // round -1 is the example (1 / 2): it teaches the motion, not the data
      const bin = BINARIES[hRound];
      const word = side === 'a' ? bin.a : bin.b;
      hResults.current[bin.key] = word;
      onUpdate({ texture: { ...hResults.current } });
    }
    // The catch (rev 5 — Robin: the flash-and-double-ring read as quick and
    // flat). The chosen sphere fills with her colour from its centre, lets a
    // column of fine fizz loose, then rises and dissolves into the drink —
    // the same "surfacing" every other choice makes, given room to breathe.
    // The other sinks back into the depths. No rings. Classes drive it; the
    // rAF paint has already stopped, so nothing fights the CSS.
    const chosen = side === 'a' ? dropARef.current : dropBRef.current;
    const other = side === 'a' ? dropBRef.current : dropARef.current;
    if (chosen) {
      chosen.dataset.caught = '1';
      chosen.classList.remove('dimming');
      chosen.classList.add('is-caught');
      const sph = chosen.querySelector('.sphere')?.getBoundingClientRect();
      if (sph) spawnSparks(sph.left + sph.width / 2, sph.top + sph.height / 2, 'absorb', sph.width / 2);
    }
    if (other) {
      other.dataset.caught = '1';
      other.classList.add('is-passed');
    }
    setHStage('gap');
    advanceHidden(hRound + 1, 1050);
  };

  // Kick off H4 when the journey reaches the bitters hold: the line is born in
  // the middle, the short line follows, both rise, and the rise starts the
  // example pair. Nothing to press first.
  useEffect(() => {
    if (stage !== 'hidden') return;
    if (skipHiddenKickoff.current) { skipHiddenKickoff.current = false; return; } // debugJump already started a round
    setHStage('intro');
    setHLine('off');
    const ts = [
      window.setTimeout(() => setHLine('in'), H4_LINE_MS),
      window.setTimeout(() => setHLine('hint'), H4_HINT_MS),
      window.setTimeout(() => setHLine('up'), H4_RISE_MS),
      window.setTimeout(() => startHRound(-1), H4_RISE_MS + (stillWater ? 300 : H4_RISE_SETTLE_MS)), // -1: the example
    ];
    return () => ts.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => () => { if (hRaf.current) cancelAnimationFrame(hRaf.current); }, []);

  // H5 · The Resonance lives in ResonanceWorld. The helpers below (centres,
  // bubble particles, the shared canvas) now serve H4's catch and H6.
  const glintCenter = (el: HTMLButtonElement | null) => {
    if (!el) return null;
    const dot = el.querySelector('.sphere') ?? el;
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
  const spawnSparks = (x: number, y: number, kind: 'ignite' | 'release' | 'notice' | 'pop' | 'absorb', radius = 46) => {
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
    } else if (kind === 'absorb') {
      // H4 · the catch: fine fizz loosed from inside the glass, climbing in a
      // soft column — born across the sphere's body, so it reads as the drink
      // coming alive in it rather than a burst from one point
      for (let k = 0; k < 28; k++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.sqrt(Math.random()) * radius * 0.62;
        out.push({
          x: x + Math.cos(a) * d,
          y: y + Math.sin(a) * d,
          vx: (Math.random() - 0.5) * 14,
          vy: -(34 + Math.random() * 46),
          r: 1.2 + Math.random() * 1.9,
          life: 1,
          ttl: 900 + Math.random() * 700,
          c: Math.random() > 0.45 ? seedHex : foam,
        });
      }
    } else if (kind === 'pop') {
      // H6 · left out: the glass skin breaks — a ring of droplets flung
      // outward from the rim, foam-white (a refusal carries no seed colour),
      // each one already turning buoyant
      const R = 46;
      for (let k = 0; k < 12; k++) {
        const ang = (k / 12) * Math.PI * 2 + Math.random() * 0.3;
        const sp = 70 + Math.random() * 60;
        out.push({ x: x + Math.cos(ang) * R, y: y + Math.sin(ang) * R, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 10, r: 0.9 + Math.random() * 1.3, life: 1, ttl: 420 + Math.random() * 260, c: foam });
      }
    } else {
      // the drink notices — a rush of fine, fast bubbles from the gathered centre
      for (let k = 0; k < 14; k++) {
        const ang = Math.PI * 1.5 + (Math.random() - 0.5) * 2.8;
        const sp = 40 + Math.random() * 90;
        out.push({ x, y, vx: Math.cos(ang) * sp * 0.5, vy: Math.sin(ang) * sp, r: 1 + Math.random() * 1.4, life: 1, ttl: 550 + Math.random() * 350, c: Math.random() > 0.5 ? seedHex : foam });
      }
    }
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
    if (stage !== 'resonance' && stage !== 'finish' && stage !== 'hidden') return;
    const withDust = stage !== 'hidden'; // H4 borrows only the fizz, not the ambient field
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
      for (const m of withDust ? resDust.current! : []) {
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


  // H6 · The Pour — flavours, then what to leave out. Both beats are the
  // sphere cluster; the spheres register into resGlintRefs, and the canvas
  // above (running for 'finish' too) gives the chosen flavours H5's fizz.
  useEffect(() => {
    if (stage !== 'finish') return;
    resChosenRef.current = finBeat === 'flavors' ? finCaught.map((w) => FIN_FLAVORS.indexOf(w)) : [];
  }, [stage, finBeat, finCaught]);

  useEffect(() => { finCaughtRef.current = finCaught; }, [finCaught]);

  // Beat 1 rises (rev 6 — Robin liked the old rise, not its look). The nine
  // flavour spheres climb slowly through the liquid in lanes, condensing out
  // of the depths just above the pill and dissolving just under the question;
  // catching one holds it where it was touched (it lights and fizzes, as in
  // H5), and letting it go lets it climb on. A rising sphere that meets a held
  // one in its lane eases around it rather than through it. Everything is
  // written straight to the carriers' transforms — no React state per frame.
  // Reduced motion: the field stands still, already spread out.
  useEffect(() => {
    if (stage !== 'finish' || finBeat !== 'flavors') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = FIN_FLAVORS.length;
    const st = FIN_FLAVORS.map(() => ({ p: -1, xo: 0, op: 0 }));
    const smooth = (a: number, b: number, v: number) => {
      const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    let raf = 0;
    const t0 = performance.now();
    let last = t0;
    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const first = finFloatRefs.current.find(Boolean);
      const size = first ? first.offsetWidth : 150;
      const gutter = Math.min(104, Math.max(20, w * 0.065));
      const cols = Math.max(3, Math.min(n, Math.floor((w - 2 * gutter) / (size * 1.1))));
      const laneW = (w - 2 * gutter) / cols;
      const head = document.querySelector<HTMLElement>('.fin-stage .hold-head');
      const headBottom = head ? head.offsetTop + head.offsetHeight : h * 0.24;
      const yTop = headBottom + size * 0.5 + 8;
      const yBot = h * 0.875 - 40 - size * 0.5;
      const travel = Math.max(size, yBot - yTop);
      const held = finCaughtRef.current;
      const pts: { x: number; y: number; lane: number; held: boolean }[] = [];
      for (let i = 0; i < n; i++) {
        const lane = i % cols;
        const inLane = Math.floor((n - 1 - lane) / cols) + 1;
        const s0 = st[i];
        if (s0.p < 0) s0.p = (Math.floor(i / cols) / inLane + lane * 0.618) % 1; // golden stagger across lanes
        const isHeld = held.includes(FIN_FLAVORS[i]);
        if (!isHeld && !reduced) s0.p = (s0.p + dt / (21000 - (lane % 3) * 1800)) % 1;
        pts.push({ x: gutter + laneW * (lane + 0.5), y: yBot - s0.p * travel, lane, held: isHeld });
      }
      for (let i = 0; i < n; i++) {
        const s0 = st[i];
        const pt = pts[i];
        // ease around a held sphere in the same lane
        let xo = 0;
        if (!pt.held) {
          for (const q of pts) {
            if (!q.held || q.lane !== pt.lane) continue;
            const reach = size * 1.08;
            const k = 1 - Math.min(1, Math.abs(pt.y - q.y) / reach);
            if (k <= 0) continue;
            const dir = pt.lane === 0 ? 1 : pt.lane === cols - 1 ? -1 : i % 2 ? 1 : -1;
            xo = dir * k * k * (3 - 2 * k) * size * 0.92;
          }
        }
        s0.xo += (xo - s0.xo) * Math.min(1, dt / 140);
        // condense in at the foot of the band, dissolve at its head; a held
        // sphere is always whole. The field arrives one sphere at a time.
        const band = smooth(0, 0.13, s0.p) * (1 - smooth(0.85, 1, s0.p));
        const entrance = reduced ? 1 : smooth(0, 1, (now - t0 - 250 - i * 120) / 700);
        const target = (pt.held ? 1 : reduced ? 1 : band) * entrance;
        s0.op += (target - s0.op) * Math.min(1, dt / 160);
        const el = finFloatRefs.current[i];
        if (!el) continue;
        el.style.transform = `translate3d(${(pt.x + s0.xo - size / 2).toFixed(1)}px, ${(pt.y - size / 2).toFixed(1)}px, 0)`;
        el.style.opacity = s0.op.toFixed(3);
        el.style.filter = s0.op > 0.98 ? 'none' : `blur(${((1 - s0.op) * 4).toFixed(2)}px)`;
        el.style.pointerEvents = s0.op > 0.45 ? 'auto' : 'none';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, finBeat]);

  // Beat 1: choose the flavours — H5's toggle, word for word
  const catchFlavor = (i: number) => {
    if (finBeat !== 'flavors' || finLeaving) return;
    const word = FIN_FLAVORS[i];
    const c = glintCenter(resGlintRefs.current[i]);
    if (finCaught.includes(word)) {
      if (c) spawnSparks(c.x, c.y, 'release');
      setFinCaught(finCaught.filter((w) => w !== word));
      return;
    }
    if (finCaught.length >= FIN_MAX_FLAVORS) {
      const el = resGlintRefs.current[i];
      if (el) {
        el.classList.add('is-refused');
        after(430, () => el.classList.remove('is-refused'));
      }
      return;
    }
    if (c) spawnSparks(c.x, c.y, 'ignite');
    setFinCaught([...finCaught, word]);
  };

  // Every beat leaves the same way H5 does: the chosen surface a beat apart,
  // the rest let go where they are, the question and the pill fade.
  const exitSpheres = (words: string[], chosen: string[]) => {
    words.forEach((w, i) => {
      const el = resGlintRefs.current[i];
      if (!el) return;
      if (chosen.includes(w)) {
        el.style.setProperty('--k', `${chosen.indexOf(w) * 90}ms`);
        el.classList.add('sphere-surface');
      } else {
        el.classList.add(chosen.length >= FIN_MAX_FLAVORS && words === FIN_FLAVORS ? 'sphere-dissolve-dim' : 'sphere-dissolve');
      }
    });
  };

  const sealCatch = () => {
    if (finCaught.length === 0 || finLeaving) return;
    onUpdate({ flavors: finCaught });
    setFinLeaving(true);
    exitSpheres(FIN_FLAVORS, finCaught);
    after(1250, () => {
      setFinLeaving(false);
      setFinBeat('ward');
      setMaxFinBeat(1);
    });
  };

  const revertFinish = (targetBeatIdx: number) => {
    if (finLeaving || finSealed) return;
    if (targetBeatIdx === 0 && finBeat === 'flavors') return;
    if (targetBeatIdx === 1 && finBeat === 'ward') return;
    if (targetBeatIdx === 1 && maxFinBeat < 1) return;

    const currentWords = finBeat === 'flavors' ? FIN_FLAVORS : FIN_VETOES;
    currentWords.forEach((_, i) => {
      const el = resGlintRefs.current[i];
      if (el) {
        el.classList.remove('sphere-surface', 'sphere-dissolve', 'sphere-dissolve-dim', 'is-refused');
        el.style.removeProperty('--k');
      }
    });

    setFinBeat(targetBeatIdx === 0 ? 'flavors' : 'ward');
  };

  // Beat 2: what to leave out — pop the bubble. Reversible: the word stays
  // behind, struck, and touching it blows the bubble back.
  const toggleWard = (i: number) => {
    if (finLeaving || finSealed) return;
    const word = FIN_VETOES[i];
    const popping = !finBanished.includes(word);
    if (popping) {
      const c = glintCenter(resGlintRefs.current[i]);
      if (c) spawnSparks(c.x, c.y, 'pop');
    }
    setFinBanished((prev) => (popping ? [...prev, word] : prev.filter((w) => w !== word)));
  };

  const sealWard = () => {
    if (finSealed) return;
    onUpdate({ allergies: finBanished.join(', ') });
    setFinSealed(true);
    setFinLeaving(true);
    exitSpheres(FIN_VETOES, []);
    after(1100, () => {
      setStage('ascend6');
      playUntil(HOLD_TRACE, () => setStage('trace'));
    });
  };

  // H7: each keystroke lets a mote of the first breath go — same
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

  // The trace is let go like the name: the line lifts and dissolves and its
  // motes rise with it. (It used to flash a white bloom over the frame, which
  // read as a camera flash rather than a breath let out.)
  const sealTrace = () => {
    if (traceSealed) return;
    onUpdate({ insight: traceText.trim() });
    setTraceSealed(true);
    const burst = Math.min(14, 6 + Math.round(traceText.length / 8));
    for (let k = 0; k < burst; k++) after(k * 40, releaseTraceMote);
    after(1150, () => {
      setStage('ascend7');
      playUntil(HOLD_BREATH, () => setStage('breath'));
    });
  };

  // Fresh slate whenever the finish hold begins (natural arrival or debug jump).
  useEffect(() => {
    if (stage !== 'finish') return;
    setFinBeat('flavors');
    setFinCaught([]);
    setFinBanished([]);
    setFinLeaving(false);
    setFinSealed(false);
  }, [stage]);

  // Fresh slate whenever the trace hold begins (natural arrival or debug
  // jump). H1's frozen name-bubbles are cleared too — her trace writes on
  // still water, and the motes it releases are the only light on it.
  useEffect(() => {
    if (stage !== 'trace') return;
    bubbles.current = [];
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
    breathFrags.current = buildBreathEchoes(answers);
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

    // The spirit-point (rev 3): the same material as the motes that drew
    // the chalice — a point of warm light with her colour as its glow, only a
    // size larger. Rev 2's glass bubble (rim, highlight, halo disc) read as
    // cartoony beside those fine dots (Robin). `stretch` draws it out into a
    // drop while it falls.
    const drawSpiritPoint = (x: number, y: number, r: number, alpha: number, stretch: number) => {
      if (r < 0.3 || alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.scale(1 / Math.sqrt(stretch), stretch);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 240, 210, 0.97)';
      ctx.shadowColor = seedHex;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 6; // a tighter second pass warms the core toward her colour
      ctx.fill();
      ctx.restore();
    };

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
    const IGNITE_MS = reduced ? 60 : 900;
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
      const spiritR = Math.max(3.2, figScale * 0.24); // the landed motes are 2.4px

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

        // ---- the spirit-point ignites: after the stroke completes ----
        // It gathers from nothing to a point of light a little larger than the
        // motes, breathes very slightly while it holds, and sends out one slow
        // ring of her colour. (Rev 1 was a flat disc in a big pulsing blur;
        // rev 2 a glass bubble — both too much beside the fine line work.)
        const igniteAt = condenseMs + DRAW_MS + IGNITE_DELAY_MS;
        if (elapsed >= igniteAt) {
          const ignT = Math.min(1, (elapsed - igniteAt) / IGNITE_MS);
          const grow = 1 - Math.pow(1 - ignT, 3);
          // once she lets go, the falling bubble below IS this one — stop
          // drawing it at rest so there is never a second
          const breathe = reduced || ignT < 1 ? 1 : 0.9 + 0.1 * Math.sin((elapsed - igniteAt - IGNITE_MS) / 950);
          if (rel === null) drawSpiritPoint(spiritPt.x, spiritPt.y, spiritR * grow, grow * breathe, 1);
          if (!revealFired && ignT >= 1) {
            revealFired = true;
            window.setTimeout(() => setBreathShowReveal(true), 420);
          }
          if (ignT >= 1) {
            const rt = Math.min(1, (elapsed - igniteAt - IGNITE_MS - 140) / 2000);
            if (rt > 0 && rt < 1) {
              const re = 1 - Math.pow(1 - rt, 3);
              ctx.beginPath();
              ctx.arc(spiritPt.x, spiritPt.y, spiritR * (2 + re * 13), 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${sRgb}, ${(1 - rt) * 0.38})`;
              ctx.lineWidth = 1;
              ctx.shadowColor = seedHex;
              ctx.shadowBlur = 8;
              ctx.stroke();
              ctx.shadowBlur = 0;
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
          drawSpiritPoint(spiritPt.x, dy, spiritR, 1, 1 + relT * 0.9);
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
        {VIDEO_TRIAL ? (
          <source src={VIDEO_TRIAL.src} type="video/mp4" />
        ) : (
          <>
            <source src="/journey.webm" type="video/webm" />
            <source src="/journey.mp4" type="video/mp4" />
          </>
        )}
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
          // it begins falling during the rise from H4, so the move and the
          // dusk are one gesture, and falls slowly: over the whole rise and
          // on past the arrival (Robin, 2026-10-06: 2.4s went dark too fast)
          opacity: stage === 'ascend4' || stage === 'resonance' || stage === 'finish' || stage === 'trace' || stage === 'ascend7' || stage === 'breath' ? 1 : 0,
          transition: stage === 'ascend4' || stage === 'resonance' ? NIGHTFALL : 'opacity 1.4s ease',
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
          opacity: stage === 'ascend4' || stage === 'resonance' ? 1 : 0,
          // and lifts slowly as she lets go into the drink (H5 → H6)
          transition: stage === 'ascend4' || stage === 'resonance' ? NIGHTFALL : 'opacity 3.4s cubic-bezier(0.45, 0, 0.35, 1)',
        }}
      />

      {/* H4's dusk: the whole frame dims while she reads the line, evenly (no
          patch behind the words), and lifts most of the way back as it rises.
          It lives out here so it eases away during the rise to H5 instead of
          vanishing with the hold. */}
      <div className="h4-dusk absolute inset-0 z-10" data-phase={stage === 'hidden' ? hLine : 'off'} aria-hidden="true" />

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
            className="absolute inset-0"
            onSubmit={(e) => { e.preventDefault(); commitName(); }}
          >
            {/* Just the line (Robin, rev 2: a question above it said less than
                the bare line did). The pill sits right under it, one small form. */}
            <div className="name-input-row q-rise">
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
                disabled={nameSealed}
                className={`depth-input ${nameSealed ? 'is-sealed' : ''}`}
                aria-label="Your name"
              />
              <button
                type="submit"
                className={`hold-next is-inline ${name.trim() && !nameSealed ? 'is-ready' : ''} ${nameSealed ? 'is-leaving' : ''}`}
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {stage === 'lens' && (
          <div className="absolute inset-0">
            <div className={`hold-head ${chosen !== null ? 'is-leaving' : ''}`}>
              <h2 className="hold-q">Who is this cocktail for?</h2>
            </div>
            <div className="sphere-cluster is-lens">
              {LENSES.map((label, i) => (
                <div key={label} className="sphere-drift">
                  <button
                    type="button"
                    onClick={() => pickLens(i)}
                    className={`sphere-btn ${
                      chosen === null ? '' : chosen === i ? 'is-lit sphere-surface' : 'sphere-dissolve'
                    }`}
                    style={{ '--c': '#ffb088', '--d': `${200 + i * 90}ms`, '--k': '420ms' } as CSSProperties}
                  >
                    <span className="sphere"><span className="sphere-word">{label}</span></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 'seed' && (
          <>
            <div className="seed-ring q-rise" style={{ animationDelay: '0.4s' }}>
              {/* the question sits in the ring's centre; the colour she is
                  trying on is named beneath it */}
              <div className={`seed-center ${seedChosen !== null ? 'is-leaving' : ''}`}>
                <h2 className="hold-q">Which colour feels like you?</h2>
                <p
                  className="seed-name"
                  style={(hoverSeed ?? seedChosen) !== null ? ({ '--c': SEEDS[(hoverSeed ?? seedChosen)!].hex } as CSSProperties) : undefined}
                >
                  {(hoverSeed ?? seedChosen) !== null && (
                    <span key={hoverSeed ?? seedChosen}>{SEEDS[(hoverSeed ?? seedChosen)!].name}</span>
                  )}
                </p>
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
                      style={{ '--c': s.hex, '--w': `calc(clamp(56px, 9vmin, 76px) * ${s.s})` } as CSSProperties}
                      onMouseEnter={() => { if (seedChosen === null) setHoverSeed(i); }}
                      onMouseLeave={() => setHoverSeed((h) => (h === i ? null : h))}
                      onFocus={() => { if (seedChosen === null) setHoverSeed(i); }}
                      onBlur={() => setHoverSeed((h) => (h === i ? null : h))}
                      onClick={() => pickSeed(i)}
                      aria-label={s.name}
                    />
                  </div>
                  {seedChosen === i && <span className="ripple" style={{ '--c': s.hex } as CSSProperties} />}
                </div>
              ))}
            </div>
          </>
        )}

        {stage === 'gravity' && (
          <div className="absolute inset-0">
            <div className="hold-head">
              <h2 className="hold-q">Choose your gravity</h2>
              {gravRound === 0 && !gravHinted && (
                <p className="hold-hint">Drag the glow toward the side that pulls you, and let go where it feels true</p>
              )}
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
                style={{ opacity: 0.84 + leftPull * 0.16, transform: `translateY(-50%) scale(${1 + leftPull * 0.08})`, transformOrigin: 'left center' }}
              >
                {GRAVITIES[gravRound].left}
              </span>
              <span
                className="grav-pole grav-pole-right"
                style={{ opacity: 0.84 + rightPull * 0.16, transform: `translateY(-50%) scale(${1 + rightPull * 0.08})`, transformOrigin: 'right center' }}
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
                {gravCommitted && <span className="ripple" style={{ '--c': seedHex } as CSSProperties} />}
              </div>
            </div>

            <div className="depth-dots">
              {GRAVITIES.map((g, i) => {
                const hasAnswer = gravValues.current[g.key] !== undefined;
                const isCurrent = i === gravRound;
                const isClickable = !gravCommitted && !isCurrent && (i <= maxGravRound || hasAnswer);
                const isFilled = i < gravRound || (i === gravRound && gravCommitted) || hasAnswer;
                const style = {
                  background: isFilled ? seedHex : 'transparent',
                  borderColor: i === gravRound ? seedHex : 'rgba(255, 235, 200, 0.3)',
                };

                if (isClickable) {
                  return (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => revertGravity(i)}
                      className="grav-dot is-clickable"
                      aria-label={`Question ${i + 1} of ${GRAVITIES.length}: ${g.left} or ${g.right}`}
                      style={style}
                    />
                  );
                }

                return (
                  <span
                    key={g.key}
                    className="grav-dot"
                    aria-current={isCurrent ? 'step' : undefined}
                    style={style}
                  />
                );
              })}
            </div>
          </div>
        )}

        {stage === 'hidden' && (
          <div className="hidden-stage absolute inset-0">
            {/* ONE line the whole way: born in the middle, carried up to the
                head, never replaced */}
            <div
              className={`h4-line ${['in', 'hint', 'up', 'quiet'].slice(0, ['off', 'in', 'hint', 'up', 'quiet'].indexOf(hLine)).join(' ')} ${hStage === 'gap' && hRound === BINARIES.length - 1 ? 'is-leaving' : ''}`}
            >
              <h2 className="h4-q">{H4_LINES.prompt}</h2>
              <p className="h4-hint">{stillWater ? H4_LINES.hintStill : H4_LINES.hint}</p>
            </div>
            {hStage !== 'intro' && (
              <>
                <div key={hRound} className="ember-field">
                  {/* two spheres, like H3's two poles — the word inside each is
                      the thing she reads and the thing that dissolves */}
                  <button
                    ref={dropARef}
                    type="button"
                    className={`ember${hRound === -1 ? ' is-number' : ''}`}
                    style={{ '--x': '33%', '--c': seedHex } as CSSProperties}
                    onClick={() => catchDrop('a')}
                  >
                    <span className="sphere"><span className="sphere-word">{hRound === -1 ? EXAMPLE_PAIR.a : BINARIES[hRound].a}</span></span>
                  </button>
                  <button
                    ref={dropBRef}
                    type="button"
                    className={`ember${hRound === -1 ? ' is-number' : ''}`}
                    style={{ '--x': '67%', '--c': seedHex } as CSSProperties}
                    onClick={() => catchDrop('b')}
                  >
                    <span className="sphere"><span className="sphere-word">{hRound === -1 ? EXAMPLE_PAIR.b : BINARIES[hRound].b}</span></span>
                  </button>
                </div>
                {/* Still Water only: without a clock, letting both cool has to
                    be something she can actually do (WCAG 2.2.1) */}
                {stillWater && hStage === 'play' && (
                  <button type="button" className="hold-next ember-pass is-ready" onClick={letThemCool}>
                    Let them cool
                  </button>
                )}
                {/* No history row here (Robin, 2026-10-06): the kept/secret
                    dots offered navigation they could not perform. The catch
                    itself is the feedback. */}
              </>
            )}
          </div>
        )}

        {(stage === 'resonance' || stage === 'finish' || stage === 'hidden') && (
          <canvas ref={resCanvasRef} className="absolute inset-0 z-[29] pointer-events-none" />
        )}

        {(stage === 'resonance' || ((stage === 'ascend5' || stage === 'finish') && resAfterglow)) && (
          <ResonanceWorld
            key={resWorldKey}
            rounds={[
              { key: RES_QUESTIONS[0].key, prompt: RES_QUESTIONS[0].prompt, words: [...RES_QUESTIONS[0].words] },
              { key: RES_QUESTIONS[1].key, prompt: RES_QUESTIONS[1].prompt, words: [...RES_QUESTIONS[1].words] },
            ]}
            max={RES_MAX}
            seedHex={seedHex}
            still={stillWater}
            // rising to H6, her words go and her fizz carries on up
            leaving={stage !== 'resonance'}
            onSeal={(key, words) => onUpdate({ [key]: words } as Partial<Answers>)}
            onDone={() => {
              setResAfterglow(true);
              setStage('ascend5');
              playUntil(HOLD_FINISH, () => setStage('finish'));
            }}
            onGone={() => setResAfterglow(false)}
          />
        )}

        {stage === 'finish' && (
          <div className={`fin-stage absolute inset-0 ${finLeaving ? 'is-sealing' : ''}`}>
            <DepthDots
              count={2}
              index={finBeat === 'flavors' ? 0 : 1}
              seed={seedHex}
              onSelect={revertFinish}
              isClickable={(i) => !finLeaving && !finSealed && (i === 0 ? finBeat !== 'flavors' : finBeat !== 'ward' && maxFinBeat >= 1)}
              hasAnswer={(i) => i === 0 ? finCaught.length > 0 : finBanished.length > 0 || finSealed}
              ariaLabel={(i) => i === 0 ? 'Flavours to include' : 'Flavours to leave out'}
            />

            {finBeat === 'flavors' && (
              <div className="absolute inset-0">
                <div className={`hold-head ${finLeaving ? 'is-leaving' : ''}`}>
                  <h2 className="hold-q">What flavours are calling you?</h2>
                  <p className="hold-hint">
                    {finCaught.length === 0
                      ? 'Catch up to three as they rise'
                      : `${finCaught.length} of ${FIN_MAX_FLAVORS} chosen. Select one again to change your mind.`}
                  </p>
                </div>
                <div className="sphere-field">
                  {FIN_FLAVORS.map((w, i) => {
                    const lit = finCaught.includes(w);
                    const dim = !lit && finCaught.length >= FIN_MAX_FLAVORS;
                    return (
                      <div key={w} ref={(el) => { finFloatRefs.current[i] = el; }} className="sphere-float">
                        <button
                          ref={(el) => { resGlintRefs.current[i] = el; }}
                          type="button"
                          aria-pressed={lit}
                          className={`sphere-btn ${lit ? 'is-lit' : ''} ${dim ? 'is-dim' : ''}`}
                          style={{ '--c': seedHex, '--d': '0ms' } as CSSProperties}
                          onClick={() => catchFlavor(i)}
                        >
                          <span className="sphere is-flavour"><FlavourIcon name={w} /><span className="sphere-word">{w}</span></span>
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className={`hold-next ${finCaught.length > 0 && !finLeaving ? 'is-ready' : ''} ${finCaught.length >= FIN_MAX_FLAVORS ? 'is-full' : ''} ${finLeaving ? 'is-leaving' : ''}`}
                  style={{ '--c': seedHex } as CSSProperties}
                  onClick={sealCatch}
                >
                  Continue
                </button>
              </div>
            )}

            {finBeat === 'ward' && (
              <div className="absolute inset-0">
                <div className={`hold-head ${finLeaving ? 'is-leaving' : ''}`}>
                  <h2 className="hold-q">What should never touch your glass?</h2>
                  <p className="hold-hint">
                    {finBanished.length === 0
                      ? 'Pop anything you want left out, or continue if nothing'
                      : `${finBanished.length} left out. Select one again to bring it back.`}
                  </p>
                </div>
                {/* the same spheres, rising up from the depths into a still
                    cluster this time — something to look over carefully */}
                <div className="sphere-cluster is-rising">
                  {FIN_VETOES.map((w, i) => {
                    const popped = finBanished.includes(w);
                    return (
                      <div key={w} className="sphere-drift">
                        <button
                          ref={(el) => { resGlintRefs.current[i] = el; }}
                          type="button"
                          aria-pressed={popped}
                          aria-label={popped ? `${w}, left out` : w}
                          className={`sphere-btn ${popped ? 'is-popped' : ''}`}
                          style={{ '--c': seedHex, '--d': `${200 + i * 140}ms` } as CSSProperties}
                          onClick={() => toggleWard(i)}
                        >
                          <span className="sphere-slot">
                            <span key={popped ? 'popped' : 'whole'} className="sphere" />
                            <span className="sphere-word">{w}</span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className={`hold-next ${!finLeaving ? 'is-ready' : 'is-leaving'}`}
                  style={{ '--next-delay': '1s' } as CSSProperties}
                  onClick={sealWard}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}

        {stage === 'trace' && (
          <div className="trace-stage absolute inset-0">
            <form
              className="absolute inset-0"
              onSubmit={(e) => { e.preventDefault(); sealTrace(); }}
            >
              <div className={`hold-head ${traceSealed ? 'is-leaving' : ''}`}>
                <h2 className="hold-q">Leave one trace of yourself</h2>
                <p className="hold-hint">A memory, a flavour you loved once, a place you carry. The ink keeps it.</p>
              </div>
              <div className="trace-input-row">
                <input
                  ref={traceInputRef}
                  className={`depth-input trace-input ${traceSealed ? 'is-sealed' : ''}`}
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
              {/* at the foot of the frame, not under the line: the foam band
                  behind the line is the palest in the film and the Veil pill
                  vanishes on it */}
              <button
                type="submit"
                className={`hold-next ${traceSealed ? 'is-leaving' : 'is-ready'}`}
                style={{ '--next-delay': '0.9s' } as CSSProperties}
              >
                Continue
              </button>
            </form>
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
