// The Surfacing — beats 4–5 of the reveal.
// Spec: design-artifacts/2026-07-07-the-surfacing-reveal-design.md (§2 beats 4–5)
// + design-artifacts/2026-07-08-experience-master-spec.md §7 + the 2026-07-09
// feel-pass + the "Living Lens" overdrive + the 2026-07-10 "layered world"
// pass (Robin): the keepsake is a 3D diorama, plus the 2026-07-10 "one
// stroke of dark" pass, rev 2 (Robin, animator's notes): TheDepths hands
// off at full black and the scene UNVEILS from shadow — no ember, no seed
// glow, no flash; the image simply emerges out of the murk (sharp focus
// circle first, blurred surround after), and the cocktail's title follows
// it quickly, naming what just appeared. Two atmosphere canvases wrap
// the cocktail panel — dust and a warm room-glow live BEHIND it (occlusion is
// the depth cue), beam/spray/ink-sparkle and camera-near bokeh live in FRONT —
// and a depth engine moves every plane at its own rate under the cursor:
// the story text nearest and fastest, the image panel micro-tilting in true
// 3D behind it, the back dust slowest. No scrollbar: the story column fades
// into the dark at its edges instead of hitting a rail.
//
// Autoplay throughout (2026-07-09 call): no click is required; a click after
// the whisper only skips ahead early.
//
// The glass itself is sacred — nothing tints, grades, or washes the sharp
// focal circle. The beam is erased over it each frame; particles may pass in
// front (they are objects in the air, not a grade).

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Answers, CocktailResult } from '../types';
import { personaImageFor } from '../data/personas';
import { DevNav, type DevJumpTarget, type DevPage } from './TheDepths';
import CtaButton from './CtaButton';
import { pourLinkFor } from '../engine/pourLink';

const EMERGE_MS = 2800; // the scene's unveiling out of the black (sync: surfFocus/surfRack in index.css)
const TITLE_LAG_MS = 350; // image first, then quickly its name (the staggered reveal)
const HOLD_MS = 1250; // pure atmosphere after the emergence, before the ink
const INK_MS = 1300; // the name's stroke-on duration
const INK_TO_WHISPER_MS = 750;
const WHISPER_HOLD_MS = 2600; // how long the whisper sits before auto-advancing
const GLIDE_MS = 750; // beat 5: image → right column

const REDUCED_TO_WHISPER_MS = 900;
const REDUCED_WHISPER_HOLD_MS = 1800;
const GREET_MS = 2600; // gift mode: the sharer's name breathes in the dark before the unveiling

const FOCUS_FRAC = 0.24; // sharp spotlight radius, as a fraction of min(paintedW, paintedH)
const FEATHER_FRAC = 0.52; // additional radius over which it falls off into the blur

const DUST_COUNT = 40;
const BOKEH_COUNT = 5;
const AIR_DPR_CAP = 1.5; // glows don't need retina; full-screen composites do cost

// the diorama: per-plane parallax rates (px at full cursor deflection).
// Nearest moves most — the story is the closest plane, the back dust the deepest.
const PAR_STORY = 20;
const PAR_BOKEH = 26;
const PAR_FRONT_DUST = 12;
const PAR_IMAGE = 6;
const PAR_BACK_DUST = 4;
const TILT_DEG = 3; // the image panel's micro-tilt at full deflection

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '');
  const n = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16);
  if (Number.isNaN(n)) return [232, 112, 42];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const WARM: [number, number, number] = [251, 246, 234];

/** The rect the image's pixels actually paint inside `box` under object-fit: contain. */
function paintedRect(box: DOMRect, natW: number, natH: number) {
  const scale = Math.min(box.width / natW, box.height / natH);
  const w = natW * scale;
  const h = natH * scale;
  return { x: box.x + (box.width - w) / 2, y: box.y + (box.height - h) / 2, w, h };
}

interface AirParticle {
  x: number; y: number; vx: number; vy: number;
  r: number; life: number; maxLife: number; tw: number;
  kind: 'dust' | 'spray' | 'spark' | 'ink' | 'bokeh';
  plane: 'back' | 'front';
  seedMix: number; // 0 = warm white, 1 = seed colour
}

export default function TheSurfacing({ answers, result, onDevJump, onDevPage, gift, onMeetYourOwn }: {
  answers: Answers;
  result: CocktailResult;
  onDevJump?: (target: DevJumpTarget) => void;
  onDevPage?: (page: DevPage) => void;
  /** gift mode: this keepsake arrived through a shared link — the viewer is the friend, not the soul it was poured for */
  gift?: boolean;
  /** gift mode's one invitation: begin the viewer's own journey */
  onMeetYourOwn?: () => void;
}) {
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  // Dev-only overrides so each persona image can be inspected without a full
  // journey: /?persona=creator-hero&name=Celeste (compiled out of prod).
  const devParams = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null;
  const personaOverride = devParams?.get('persona');
  const meta = personaOverride
    ? personaImageFor(personaOverride.split('-')[0] ?? '', personaOverride.split('-')[1] ?? '')
    : personaImageFor(result.primary, result.secondary);
  const inkName = devParams?.get('name') ?? answers.name.trim();

  const wrapRef = useRef<HTMLDivElement>(null); // glides in beat 5
  const drift = useRef<HTMLDivElement>(null); // whisper-parallax layer (beat 4)
  const imgRef = useRef<HTMLImageElement>(null); // the sharp, masked focal layer
  const vignetteRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const airFrontRef = useRef<HTMLCanvasElement>(null);
  const airBackRef = useRef<HTMLCanvasElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false); // image decoded — nothing starts before this
  const [settled, setSettled] = useState(false);
  const [titled, setTitled] = useState(false); // the staggered reveal: image, then quickly its name
  const [inked, setInked] = useState(false);
  const [whispered, setWhispered] = useState(false);
  const [kept, setKept] = useState(false);
  // gift mode's opening beat: the sharer's name alone in the dark
  const [greeting, setGreeting] = useState(false);
  // clipboard fallback's quiet confirmation on the share button label
  const [shareNote, setShareNote] = useState<string | null>(null);
  const timeouts = useRef<number[]>([]);
  const after = (ms: number, fn: () => void) => timeouts.current.push(window.setTimeout(fn, ms));

  // "share with a friend": the native share sheet where it exists, the
  // clipboard where it doesn't. The link carries the whole keepsake in its
  // fragment (see engine/pourLink.ts) until /pour/:id persistence lands.
  const shareKeepsake = async () => {
    const text = `Dionysus read me and poured “${result.cocktailName}”. Meet the cocktail within:`;
    // the reading and the agents' notes are personal — they never leave with
    // the link. The friend receives the cocktail, not the soul it came from.
    const url = await pourLinkFor({
      from: answers.name.trim(),
      color: answers.color,
      result: {
        ...result,
        whyYou: [],
        archetypeStory: '',
        agentLines: { psychologist: '', historian: '', mixologist: '', storyteller: '' },
      },
    });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Dionysus', text, url });
      } catch {
        /* she closed the sheet — nothing to do */
      }
      return;
    }
    const payload = `${text} ${url}`;
    let copied: boolean;
    try {
      await navigator.clipboard.writeText(payload);
      copied = true;
    } catch {
      // some embedded browsers deny the async clipboard — the legacy path still works
      const ta = document.createElement('textarea');
      ta.value = payload;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      ta.remove();
    }
    setShareNote(copied ? 'Link copied' : 'Copying failed');
    after(2200, () => setShareNote(null));
  };

  // ---- shared scene state the atmosphere engine reads every frame ----------
  const seedRgb = useMemo(() => hexToRgb(answers.color), [answers.color]);
  const scene = useRef({
    glass: { x: 0, y: 0 }, // viewport px
    focusR: 120,
    minDim: 600,
    inkStart: 0, // performance.now() when the nib begins, 0 = not inking
    tagA: { x: 0, y: 0 }, // writable-area start (left end, screen px)
    tagB: { x: 0, y: 0 }, // writable-area end
    beamOn: false,
    par: { x: 0, y: 0 }, // lerped cursor deflection, each axis in [-0.5, 0.5]
    kept: false,
  });

  // ---- geometry: the tag's ink, and the spotlight that keeps the glass sharp
  // while its surround stays softly dark. Recomputed on resize and per-frame
  // through the beat-5 glide and diorama tilt, so everything travels together.
  const layout = () => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    const tag = tagRef.current;
    if (!img || !wrap || !img.naturalWidth) return;
    const wrapRect = wrap.getBoundingClientRect();
    const r = paintedRect(img.getBoundingClientRect(), img.naturalWidth, img.naturalHeight);

    if (tag) {
      const w = meta.tag.w * r.w;
      tag.style.left = `${r.x + meta.tag.cx * r.w - w / 2}px`;
      tag.style.top = `${r.y + meta.tag.cy * r.h}px`;
      tag.style.width = `${w}px`;
      tag.style.transform = `translateY(-50%) rotate(${meta.tag.angle}deg)`;
      // fit the name to the writable width, whatever its length
      const size = Math.min(w * 0.24, (w * 1.6) / Math.max(inkName.length, 1));
      tag.style.fontSize = `${Math.max(size, 11)}px`;

      // the nib's path across the tag, in screen space, for the ink-sparkle
      const th = (meta.tag.angle * Math.PI) / 180;
      const cx = r.x + meta.tag.cx * r.w;
      const cy = r.y + meta.tag.cy * r.h;
      scene.current.tagA = { x: cx - (w / 2) * Math.cos(th), y: cy - (w / 2) * Math.sin(th) };
      scene.current.tagB = { x: cx + (w / 2) * Math.cos(th), y: cy + (w / 2) * Math.sin(th) };
    }

    const lx = r.x - wrapRect.x + meta.glass.x * r.w;
    const ly = r.y - wrapRect.y + meta.glass.y * r.h;
    const minDim = Math.min(r.w, r.h);
    const focusR = (meta.focusFrac ?? FOCUS_FRAC) * minDim;
    const featherR = focusR + FEATHER_FRAC * minDim;
    const spot = `radial-gradient(circle at ${lx}px ${ly}px, #000 0, #000 ${focusR}px, transparent ${featherR}px)`;
    img.style.webkitMaskImage = spot;
    img.style.maskImage = spot;
    if (vignetteRef.current) {
      vignetteRef.current.style.background =
        `radial-gradient(circle at ${lx}px ${ly}px, transparent ${focusR * 1.1}px, rgba(11,7,4,0.66) ${featherR * 1.9}px)`;
    }

    scene.current.glass = { x: r.x + meta.glass.x * r.w, y: r.y + meta.glass.y * r.h };
    scene.current.focusR = focusR;
    scene.current.minDim = minDim;
  };

  // ---- beat 4 driver: the whole choreography plays on its own; nothing here
  // waits for a click. A click after the whisper only skips ahead early. -----
  useEffect(() => {
    let cancelled = false;
    const img = imgRef.current;
    if (!img) return;
    const unveil = () => {
      if (cancelled) return;
      setReady(true);
      layout();
      if (reduced) {
        // crossfade straight to the settled spotlight, name pre-inked
        setSettled(true);
        setTitled(true);
        setInked(true);
        after(REDUCED_TO_WHISPER_MS, () => setWhispered(true));
        after(REDUCED_TO_WHISPER_MS + REDUCED_WHISPER_HOLD_MS, () => setKept(true));
        return;
      }
      scene.current.beamOn = true;
      // the unveiling: TheDepths handed off at full black, and the scene
      // simply emerges from the shadow — CSS drives it (.lit gates the
      // layers, surfFocus/surfRack breathe them in). No ember, no glow:
      // the image itself is the event. Its name follows a beat later.
      after(EMERGE_MS, () => setSettled(true));
      after(EMERGE_MS + TITLE_LAG_MS, () => setTitled(true));
      // gift mode carries no tag ink — the image and its title stand alone
      if (!gift) {
        after(EMERGE_MS + HOLD_MS, () => {
          scene.current.inkStart = performance.now();
          setInked(true);
        });
      }
      after(EMERGE_MS + HOLD_MS + INK_MS + INK_TO_WHISPER_MS, () => setWhispered(true));
      after(
        EMERGE_MS + HOLD_MS + INK_MS + INK_TO_WHISPER_MS + WHISPER_HOLD_MS,
        () => setKept(true),
      );
    };
    // gift mode opens on the greeting alone — the friend learns whose keepsake
    // this is while the world is still black; then the unveiling proceeds as
    // ever. Reduced motion keeps the beat (statically, briefer) — the friend
    // must still learn whose cocktail arrived.
    const begin = () => {
      if (cancelled) return;
      if (gift) {
        setGreeting(true);
        after(reduced ? 1600 : GREET_MS, () => {
          setGreeting(false);
          unveil();
        });
        return;
      }
      unveil();
    };
    img.decode().then(begin).catch(begin); // decode failure must never strand the reveal
    return () => {
      cancelled = true;
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- the atmosphere engine: two canvases (behind / in front of the panel),
  // one rAF, six systems --------------------------------------------------------
  useEffect(() => {
    if (reduced || !ready) return;
    const front = airFrontRef.current;
    const back = airBackRef.current;
    if (!front || !back) return;
    const ctxF = front.getContext('2d');
    const ctxB = back.getContext('2d');
    if (!ctxF || !ctxB) return;

    const dpr = Math.min(window.devicePixelRatio || 1, AIR_DPR_CAP);
    const fit = () => {
      for (const c of [front, back]) {
        c.width = Math.round(window.innerWidth * dpr);
        c.height = Math.round(window.innerHeight * dpr);
        // an absolutely-positioned canvas with inset:0 keeps its INTRINSIC size
        // (width/height attrs), so without an explicit CSS size the whole
        // atmosphere rendered 1.5× off on retina — beam, rim, and the sacred-
        // glass punch-out all landed beside the glass instead of on it
        c.style.width = `${window.innerWidth}px`;
        c.style.height = `${window.innerHeight}px`;
      }
    };
    fit();
    window.addEventListener('resize', fit);

    const parts: AirParticle[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // dust lives in and around the beam, forever — split across the two planes
    const spawnDust = (anywhere: boolean) => {
      const s = scene.current;
      const spread = s.focusR * 2.6;
      parts.push({
        kind: 'dust',
        plane: Math.random() < 0.55 ? 'back' : 'front',
        x: s.glass.x + rand(-spread, spread),
        y: anywhere ? rand(0, window.innerHeight) : s.glass.y + rand(-s.minDim * 0.75, s.focusR),
        vx: rand(-2.5, 2.5),
        vy: rand(2, 9) * (Math.random() < 0.35 ? -0.5 : 1), // mostly sinking, some floating
        r: rand(0.6, 1.9),
        life: 0, maxLife: rand(6, 14),
        tw: rand(0, Math.PI * 2),
        seedMix: Math.random() < 0.12 ? rand(0.4, 0.8) : 0,
      });
    };
    for (let i = 0; i < DUST_COUNT; i++) spawnDust(true);

    // camera-near bokeh: a handful of big, soft, slow orbs on the nearest plane
    const spawnBokeh = () => {
      parts.push({
        kind: 'bokeh',
        plane: 'front',
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: rand(-3.5, 3.5),
        vy: rand(-2.5, 2.5),
        r: rand(4.5, 10),
        life: 0, maxLife: rand(14, 26),
        tw: rand(0, Math.PI * 2),
        seedMix: Math.random() < 0.3 ? rand(0.2, 0.5) : 0,
      });
    };
    for (let i = 0; i < BOKEH_COUNT; i++) spawnBokeh();

    const spawnInk = (px: number, py: number) => {
      parts.push({
        kind: 'ink',
        plane: 'front',
        x: px + rand(-2, 2), y: py + rand(-2, 2),
        vx: rand(-14, 14), vy: rand(-26, -4),
        r: rand(0.5, 1.3),
        life: 0, maxLife: rand(0.35, 0.7),
        tw: 0,
        seedMix: rand(0.5, 1),
      });
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const s = scene.current;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctxF.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxB.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxF.clearRect(0, 0, W, H);
      ctxB.clearRect(0, 0, W, H);

      const flick =
        0.8 +
        0.14 * Math.sin(now * 0.00113) +
        0.06 * Math.sin(now * 0.00047 + 1.7) +
        0.04 * Math.sin(now * 0.0031 + 0.4);

      // — behind the panel: the room's own warm glow, separating it from the
      // void (only visible once the panel shrinks at the keepsake) —
      if (s.kept) {
        const halo = ctxB.createRadialGradient(
          s.glass.x, s.glass.y, s.focusR * 0.4,
          s.glass.x, s.glass.y, s.minDim * 1.25,
        );
        halo.addColorStop(0, rgba(WARM, 0.055 * flick));
        halo.addColorStop(0.55, rgba(WARM, 0.028 * flick));
        halo.addColorStop(1, rgba(WARM, 0));
        ctxB.fillStyle = halo;
        ctxB.fillRect(0, 0, W, H);
      }

      // — the candlelight beam (organic flicker), erased over the sacred glass.
      // Drawn as a rotated elliptical glow: no straight edges anywhere, so it
      // reads as light in the air rather than a projected sheet. —
      if (s.beamOn) {
        const base = s.kept ? 0.07 : 0.1;
        ctxF.save();
        ctxF.translate(s.glass.x + s.focusR * 0.2, s.glass.y - s.minDim * 0.42);
        ctxF.rotate(0.12); // the light leans, like a bar lamp just off-axis
        ctxF.scale(1, 3.1);
        const beamR = s.focusR * 1.35;
        const glow = ctxF.createRadialGradient(0, 0, 0, 0, 0, beamR);
        glow.addColorStop(0, rgba(WARM, base * flick));
        glow.addColorStop(0.6, rgba(WARM, base * flick * 0.45));
        glow.addColorStop(1, rgba(WARM, 0));
        ctxF.fillStyle = glow;
        ctxF.beginPath();
        ctxF.arc(0, 0, beamR, 0, Math.PI * 2);
        ctxF.fill();
        ctxF.restore();
        // punch the beam fully out of the sharp focal circle — the image is
        // sacred; the wash may only live where the blur already does
        ctxF.globalCompositeOperation = 'destination-out';
        const hole = ctxF.createRadialGradient(
          s.glass.x, s.glass.y, s.focusR,
          s.glass.x, s.glass.y, s.focusR * 1.6,
        );
        hole.addColorStop(0, 'rgba(0,0,0,1)');
        hole.addColorStop(1, 'rgba(0,0,0,0)');
        ctxF.fillStyle = hole;
        ctxF.fillRect(0, 0, W, H);
        ctxF.globalCompositeOperation = 'source-over';
      }

      // (the seed-coloured ember that used to wake the scene here left with
      // rev 2 of the one-stroke pass — the unveiling is the image's alone)

      // — ink-sparkle following the nib —
      if (s.inkStart > 0) {
        const p = (now - s.inkStart) / INK_MS;
        if (p <= 1) {
          const px = s.tagA.x + (s.tagB.x - s.tagA.x) * p;
          const py = s.tagA.y + (s.tagB.y - s.tagA.y) * p;
          if (Math.random() < 0.85) spawnInk(px, py);
        } else {
          s.inkStart = 0;
        }
      }

      // — advance and draw every particle on its own plane, at its own
      // parallax rate (the diorama) —
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          const respawn = p.kind === 'dust' ? spawnDust : p.kind === 'bokeh' ? spawnBokeh : null;
          parts.splice(i, 1);
          if (respawn && !document.hidden) respawn(false);
          continue;
        }
        if (p.kind === 'spray') p.vy += 300 * dt; // gravity
        if (p.kind === 'ink') p.vy += 90 * dt;
        if (p.kind === 'dust' || p.kind === 'bokeh') p.vx += Math.sin(now * 0.0004 + p.tw) * 0.6 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        let a: number;
        const frac = p.life / p.maxLife;
        if (p.kind === 'dust') {
          const twinkle = 0.55 + 0.45 * Math.sin(now * 0.0016 + p.tw);
          const fade = Math.min(frac * 6, 1, (1 - frac) * 6);
          // dust catches the beam: brighter near the beam axis
          const beamGlow = s.beamOn
            ? Math.max(0, 1 - Math.abs(p.x - s.glass.x) / (s.focusR * 2.2)) * 0.5
            : 0;
          a = (0.16 + beamGlow) * twinkle * fade * (p.plane === 'back' ? 0.8 : 1);
        } else if (p.kind === 'bokeh') {
          const breathe = 0.6 + 0.4 * Math.sin(now * 0.0006 + p.tw);
          const fade = Math.min(frac * 8, 1, (1 - frac) * 8);
          a = 0.07 * breathe * fade;
        } else {
          a = (1 - frac) * (p.kind === 'spark' ? 0.8 : 0.9);
        }
        if (a <= 0.005) continue;
        const col: [number, number, number] = [
          WARM[0] + (seedRgb[0] - WARM[0]) * p.seedMix,
          WARM[1] + (seedRgb[1] - WARM[1]) * p.seedMix,
          WARM[2] + (seedRgb[2] - WARM[2]) * p.seedMix,
        ];
        const ctx = p.plane === 'back' ? ctxB : ctxF;
        const rate = p.kind === 'bokeh' ? PAR_BOKEH : p.plane === 'back' ? PAR_BACK_DUST : PAR_FRONT_DUST;
        const ox = -s.par.x * rate;
        const oy = -s.par.y * rate * 0.7;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, a);
        if (p.kind === 'bokeh') {
          ctx.shadowColor = rgba(col, a);
          ctx.shadowBlur = 16; // soft, out-of-focus — the nearest plane
        } else if (p.kind !== 'dust') {
          ctx.shadowColor = rgba(col, a * 0.9);
          ctx.shadowBlur = 7;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reduced]);

  // ---- whisper-parallax: static glass presentation (no mouse wobble) --------
  useEffect(() => {
    if (reduced || !settled || kept) return;
    const el = drift.current;
    if (!el) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const t0 = performance.now();
    const blur = el.querySelector('.surf-image-blur') as HTMLElement | null;
    const tick = (now: number) => {
      if (coarse) {
        // touch: slow autonomous drift
        target.x = Math.sin((now - t0) / 2400) * 2.5;
        target.y = Math.cos((now - t0) / 3100) * 2;
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      if (blur) blur.style.translate = `${cur.x * 0.9}px ${cur.y * 0.9}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
      if (blur) blur.style.translate = '';
    };
  }, [settled, kept, reduced]);

  // ---- the diorama: static text & image positioning (no mouse tilt on hover) --
  useEffect(() => {
    const sc = scene.current; // plain data ref, stable for the component's life
    sc.kept = kept;
    if (reduced || !kept) return;
    const story = storyRef.current;
    const wrap = wrapRef.current;
    if (!story || !wrap) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const t0 = performance.now();
    const tick = (now: number) => {
      if (coarse) {
        target.x = Math.sin((now - t0) / 3400) * 0.22;
        target.y = Math.cos((now - t0) / 4300) * 0.18;
      }
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      sc.par = { x: cur.x, y: cur.y };
      story.style.transform = `translate3d(${-cur.x * PAR_STORY}px, ${-cur.y * PAR_STORY * 0.7}px, 0)`;
      wrap.style.transform =
        `perspective(1100px) rotateY(${cur.x * TILT_DEG}deg) rotateX(${-cur.y * TILT_DEG * 0.75}deg) ` +
        `translate3d(${-cur.x * PAR_IMAGE}px, ${-cur.y * PAR_IMAGE * 0.7}px, 0)`;
      layout(); // re-glue the tag + spotlight
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      story.style.transform = '';
      wrap.style.transform = '';
      sc.par = { x: 0, y: 0 };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kept, reduced]);

  // ---- keep the tag + spotlight glued through resizes and the beat-5 glide --
  useEffect(() => {
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!kept) return;
    let raf = 0;
    const t0 = performance.now();
    const follow = (now: number) => {
      layout();
      if (now - t0 < GLIDE_MS + 200) raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kept]);

  const skipAhead = () => {
    if (whispered && !kept) setKept(true);
  };

  // ---- beat 5 content groups (staggered) --------------------------------------
  const readingLines = result.whyYou.slice(1); // [0] is the opening line, styled as its own epigraph
  const groups: { key: string; node: React.ReactNode }[] = kept
    ? [
        { key: 'title', node: <h1 className="surf-title font-playfair">{result.cocktailName}</h1> },
        { key: 'for', node: <p className="surf-for">{result.tagline}</p> },
        {
          key: 'archetype',
          node: (
            <p className="surf-archetype">
              <span className="font-playfair italic">{result.archetypeName}</span>
              <span className="surf-essence"> · {result.archetypeEssence}</span>
            </p>
          ),
        },
        {
          key: 'ingredients',
          node: (
            <div>
              <p className="surf-label">The Pour</p>
              <ul className="surf-ingredients">
                {result.ingredients.map((ing) => (
                  <li key={ing.item}>
                    <span className="surf-amount">{ing.amount}</span>
                    <span className="surf-item">
                      {ing.item}
                      {ing.note ? <em className="surf-note"> · {ing.note}</em> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
        {
          key: 'ritual',
          node: (
            <div>
              <p className="surf-label">The Ritual</p>
              <ol className="surf-ritual">
                {result.procedure.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          ),
        },
        // the reading is between Dionysus and the soul it was poured for —
        // the friend sees the cocktail, never the reading (and the shared
        // link never carries it; see shareKeepsake)
        ...(gift
          ? []
          : [{
              key: 'why',
              node: (
                <div className="surf-why">
                  <p className="surf-epigraph font-playfair italic">{result.whyYou[0]}</p>
                  <p className="surf-label">The Reading</p>
                  {readingLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ),
            }]),
        {
          key: 'actions',
          node: gift ? (
            // the friend's row is one door: their own journey. The keepsake
            // stays the sharer's — nothing here saves someone else's soul.
            <div className="surf-actions print:hidden">
              <CtaButton onClick={onMeetYourOwn}>
                Discover <span className="font-bold">your</span> cocktail
              </CtaButton>
            </div>
          ) : (
            // share links the experience itself until /pour/:id persistence exists (master spec §2)
            <div className="surf-actions print:hidden">
              <CtaButton onClick={() => window.print()}>
                Save the keepsake
              </CtaButton>
              <CtaButton onClick={shareKeepsake}>
                {shareNote ?? 'Share with a friend'}
              </CtaButton>
            </div>
          ),
        },
      ]
    : [];

  return (
    <div
      className={`surfacing-root${ready ? ' lit' : ''}${kept ? ' kept' : ''}${whispered && !kept ? ' inviting' : ''}`}
      style={{ '--c': answers.color } as React.CSSProperties}
      onClick={skipAhead}
    >
      {/* the deep plane: dust and the room's warm glow, occluded by the panel */}
      {!reduced && <canvas ref={airBackRef} className="surf-air surf-air-back" aria-hidden />}

      <div ref={drift} className="surf-drift">
        <div ref={wrapRef} className="surf-imgwrap">
          <div className="surf-focus">
            <img
              className={`surf-image-blur${ready && !reduced ? ' racking' : ''}`}
              src={meta.src}
              alt=""
              draggable={false}
              aria-hidden
            />
            <img
              ref={imgRef}
              className={`surf-image surf-image-sharp${ready && !reduced ? ' focusing' : ''}`}
              src={meta.src}
              alt=""
              draggable={false}
            />
            <div ref={vignetteRef} className={`surf-vignette${ready ? ' on' : ''}${settled && !reduced ? ' breathing' : ''}`} aria-hidden />
          </div>
        </div>
        {/* the name, inked onto the image's own tag in her seed colour —
            the gift keeps the image clean; the greeting already named her */}
        {!gift && (
          <div ref={tagRef} className="surf-tag" aria-hidden={!inked}>
            <span
              className={`surf-name font-playfair italic${inked ? ' inking' : ''}${reduced ? ' preinked' : ''}`}
              style={{ color: answers.color }}
            >
              {inkName}
            </span>
          </div>
        )}
      </div>

      {/* the near plane: beam, spray, ink-sparkle, camera-near bokeh */}
      {!reduced && <canvas ref={airFrontRef} className="surf-air surf-air-front" aria-hidden />}

      {/* the staggered reveal: the image appears, then quickly its name —
          "oh, so THIS is what it's called." Dissolves into the keepsake,
          where the story column re-states the title in full. */}
      {titled && !kept && (
        <h1 className="surf-reveal-title font-playfair italic">{result.cocktailName}</h1>
      )}

      {/* gift mode: whose keepsake this is, alone in the dark before the unveiling */}
      {greeting && (
        <p className="surf-greeting font-playfair italic">
          {inkName ? (
            <><span className="surf-greeting-name">{inkName}</span>&rsquo;s personalised cocktail</>
          ) : (
            'a personalised cocktail'
          )}
        </p>
      )}

      {/* the gift keeps this beat silent — the image and the cocktail's title carry it alone */}
      {whispered && !kept && !gift && (
        <p className="surf-whisper font-playfair italic">meet the cocktail within</p>
      )}

      {/* the quick-nav follows the journey into the reveal (dev builds only) */}
      {import.meta.env.DEV && onDevJump && <DevNav onJump={onDevJump} onPage={onDevPage} />}

      {kept && (
        <div ref={storyRef} className={`surf-story${gift && !reduced ? ' composing' : ''}`}>
          {/* gift mode: the keepsake COMPOSES (master spec §2) — the image
              settles first (the glide), then the column writes itself in,
              group by group, slower than the owner's stagger: this page has
              to do all the seduction on its own */}
          {groups.map((g, i) => (
            <div
              key={g.key}
              className="surf-group"
              style={reduced ? undefined : { animationDelay: gift ? `${0.95 + i * 0.3}s` : `${0.35 + i * 0.11}s` }}
            >
              {g.node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
