import { useEffect, useRef } from 'react';

// H5 · The Resonance — "A world of your own" (Robin, 2026-10-06; prototype in
// design-artifacts/evolution/prototypes/h5-world). Replaces rev 4's sphere
// cluster ("The Effervescence"). Robin asked for what people come to you for
// FIRST, so she constitutes herself, and then for her to reach toward what
// draws her: gravity, planets, integration. "You" is one circle of her H2
// seed colour from start to end, never the glass.
//   · Birth: her seed opens into a bubble — a lit skin around an empty centre.
//   · Round 1 (soughtFor): the words ride a very slow orbit around her.
//     Touched (or carried to her), a word's orbit gives way: it falls in on a
//     curve, gathering speed, meets her skin with a ripple and stays inside
//     her as written light. Each fills her a little. Touch it to let it go.
//   · The turn: she kindles once and her first light crosses the dark; the
//     far words appear as it reaches them.
//   · Round 2 (drawnToward): touched, part of her light leaves her on a curve
//     (matter streaming between two stars) and settles round the word as a
//     ring. Nothing stays drawn between them. Touch again and it unwinds home.
//   · The hand-over to H6 (Robin, 2026-10-06: "make it world class"). She
//     becomes the drink, in three movements:
//       1. Gather: the rings unwind home and what draws her is drawn in, so
//          everything she is and wants becomes one body (integration).
//       2. Condense: the bubble draws itself in to one dense, luminous drop
//          of her colour, and the words inside her dissolve into its light.
//       3. Release: her skin lets go and she rises as fine effervescence of
//          her own colour. The camera climbs to the finish hold with it, the
//          night lifts, and H6's flavours rise through her fizz.
//     The canvases outlive the hold (TheDepths keeps her mounted into H6)
//     until the last bubble has gone; then onGone unmounts her.
// Answers: ≤ max each, stored in vocabulary order; no order, distance, speed
// or drag path is captured (agreed with the matching owner, 2026-10-06).
// Carrying a word to her is the journey's second drag (Robin's exception to
// DESIGN.md's one-drag rule); it gives exactly the tap's answer.
// The whole hold is imperative: positions and particles are written straight
// to the DOM and two canvases every frame, never through React state.

export type WorldRound = { key: 'soughtFor' | 'drawnToward'; prompt: string; words: string[] };

type Props = {
  rounds: [WorldRound, WorldRound];
  max: number;
  seedHex: string;
  still: boolean;
  leaving: boolean;
  onSeal: (key: WorldRound['key'], words: string[]) => void;
  /** she has let go: the camera may rise to H6 */
  onDone: () => void;
  /** her last bubble has gone: she can be unmounted */
  onGone: () => void;
};

export function ResonanceWorld({ rounds, max, seedHex, still, leaving, onSeal, onDone, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const cb = useRef({ onSeal, onDone, onGone });
  useEffect(() => { cb.current = { onSeal, onDone, onGone }; });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return mountWorld(el, {
      rounds, max, seedHex, still,
      onSeal: (k, w) => cb.current.onSeal(k, w),
      onDone: () => cb.current.onDone(),
      onGone: () => cb.current.onGone(),
    });
    // mounted once per arrival at the hold; TheDepths keys it to restart
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={root} className={`rw absolute inset-0 ${leaving ? 'is-leaving' : ''}`} />;
}

/* ------------------------------------------------------------------ engine */

type Orbit = { a: number; rx: number; ry: number };
type Pt = { x: number; y: number };
type WState = 'free' | 'falling' | 'inside' | 'lifting' | 'returning' | 'ringed';
type Word = {
  w: string; i: number; slot: HTMLDivElement; el: HTMLButtonElement;
  state: WState; home: Orbit | Pt; pos: Pt; t0: number; dur: number;
  r0: number; a0: number; touched: boolean; drag: boolean; dragged: boolean; found: boolean;
  backFrom: Pt; endA: number; endR: number;
};
type Mote = { phase: 'flow' | 'ring' | 'home'; t0: number; dur: number; a0: number; phi: number; w: number; j: number; size: number; bend: number; from: Pt | null };
type Ring = { o: Word; motes: Mote[]; formed: number; leaving: boolean };
type Pull = { a: number; t0: number; amt: number; out: boolean };
type Fizz = { x: number; y: number; vx: number; vy: number; r: number; life: number; ttl: number; c: number[]; ph: number };
type Opts = Omit<Props, 'leaving'>;

const isOrbit = (h: Orbit | Pt): h is Orbit => 'a' in h;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const RING_TILT = -0.32;

function mountWorld(host: HTMLElement, o: Opts): () => void {
  const { rounds, max, still } = o;
  const T = (ms: number) => (still ? Math.min(ms, 1) : ms);
  const isPhone = () => window.innerWidth <= 640;
  const timers: number[] = [];
  const after = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, ms)); };

  // her colour, as light only: the darkest seeds are lifted toward ivory
  const hex = /^#[0-9a-f]{6}$/i.test(o.seedHex) ? o.seedHex : '#e8702a';
  const SEED = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16));
  const IVORY = [255, 242, 222];
  const lum = (0.2126 * SEED[0] + 0.7152 * SEED[1] + 0.0722 * SEED[2]) / 255;
  const LIGHT = SEED.map((c, k) => Math.round(c + (IVORY[k] - c) * (lum < 0.25 ? 0.34 : lum < 0.45 ? 0.2 : 0.1)));
  const WARM = LIGHT.map((c, k) => Math.round(c + (IVORY[k] - c) * 0.55));
  const DEEP = SEED.map((c) => Math.round(c * 0.78));
  // the brighter her colour, the clearer her interior, so ivory writing
  // inside her reads on every seed (gold would otherwise swallow it)
  const CLEAR = Math.max(0.45, Math.min(1, 1.25 - lum));
  const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  host.style.setProperty('--c', hex);

  host.innerHTML = `<canvas class="rw-back" aria-hidden="true"></canvas><div class="rw-field"></div><canvas class="rw-front" aria-hidden="true"></canvas><div class="rw-ui"></div>`;
  const back = host.querySelector<HTMLCanvasElement>('.rw-back')!;
  const front = host.querySelector<HTMLCanvasElement>('.rw-front')!;
  const field = host.querySelector<HTMLDivElement>('.rw-field')!;
  const ui = host.querySelector<HTMLDivElement>('.rw-ui')!;
  const bx = back.getContext('2d')!;
  const fx = front.getContext('2d')!;
  const sizeCanvases = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const [c, x] of [[back, bx], [front, fx]] as const) {
      c.width = Math.round(window.innerWidth * dpr); c.height = Math.round(window.innerHeight * dpr);
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 32;
  {
    const s = sprite.getContext('2d')!;
    const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,250,240,1)'); g.addColorStop(0.18, rgba(WARM, 0.9)); g.addColorStop(0.45, rgba(LIGHT, 0.35)); g.addColorStop(1, rgba(LIGHT, 0));
    s.fillStyle = g; s.fillRect(0, 0, 32, 32);
  }
  const dot = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, a: number) => {
    ctx.globalAlpha = a; ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
  };

  /* ----------------------------------------------------------------- her */
  const self = { x: 0, y: 0, R: 0, born: 0, fill: 0, fillTo: 0, kindle: 0, kindleT0: 0, near: 0, condense: 0, condenseT0: 0, releaseT0: 0, ripples: [] as { a: number; t0: number; soft: boolean }[], pulls: new Map<string, Pull>() };
  let headBottom = 0;
  const placeSelf = () => {
    const w = window.innerWidth, h = window.innerHeight;
    if (isPhone()) {
      self.R = Math.min(60, w * 0.155, h * 0.068);
      self.x = w / 2;
      self.y = Math.max(h * 0.285, headBottom + (h < 720 ? 14 : 22) + self.R);
    } else {
      self.R = Math.min(92, h * 0.1);
      self.x = w / 2;
      self.y = h * 0.54;
    }
    // what is written inside her is sized to her, so it never spills past her skin
    host.style.setProperty('--rw-r', `${self.R}px`);
  };

  /* -------------------------------------------------------------- the words */
  let round = 0, locked = false, words: Word[] = [];
  const answers: Record<WorldRound['key'], string[]> = { soughtFor: [], drawnToward: [] };
  const wordR = () => (words[0] ? (words[0].el.querySelector('.sphere') as HTMLElement).offsetWidth / 2 : 50);
  const nextTop = () => { const n = ui.querySelector<HTMLElement>('.hold-next'); return n ? n.offsetTop : window.innerHeight * 0.9; };

  const layout = (n: number, ri: number): (Orbit | Pt)[] => {
    const w = window.innerWidth, h = window.innerHeight;
    const r = wordR();
    if (isPhone()) {
      // a phone stacks them under her in threes, the same place both rounds
      const cols = 3, rows = Math.ceil(n / cols);
      let size = r * 2;
      const top = self.y + self.R + (h < 720 ? 10 : 18);
      const avail = nextTop() - 14 - top;
      if (avail / rows < size + 6) {
        size = Math.max(64, avail / rows - 6);
        host.style.setProperty('--rw-size', `${Math.floor(size)}px`);
      }
      const step = Math.min(size + 18, avail / rows);
      const y0 = top + step / 2 + Math.max(0, (avail - step * rows) / 2) * 0.4;
      const colW = Math.min(w / cols, size + 26);
      return Array.from({ length: n }, (_, i) => ({ x: self.x + ((i % cols) - 1) * colW, y: y0 + Math.floor(i / cols) * step + (i % cols === 1 ? 8 : 0) }));
    }
    // desktop: round 1 rides an inner orbit, close enough to fall in;
    // round 2 waits on a far one, out where only her light can reach. The
    // inner orbit turns, so it is fitted for a word passing straight overhead.
    const off = Math.PI / n;
    const reach = ri === 0 ? 1 : Math.cos(off);
    const room = Math.min(self.y - r - headBottom - 18, nextTop() - 18 - r - self.y) / reach;
    const rx = ri === 0 ? Math.min(w * 0.27, 380) : Math.min(w * 0.4, 600);
    const ry = Math.min(ri === 0 ? h * 0.255 : h * 0.29, room);
    return Array.from({ length: n }, (_, i) => ({ a: -Math.PI / 2 + off + (i / n) * Math.PI * 2, rx, ry }));
  };
  const orbitPos = (h: Orbit): Pt => ({ x: self.x + Math.cos(h.a) * h.rx, y: self.y + Math.sin(h.a) * h.ry });
  const place = (w: Word, s = 1) => { w.slot.style.transform = `translate(${w.pos.x}px, ${w.pos.y}px) scale(${s})`; };
  const hintText = () => {
    const n = answers[rounds[round].key].length;
    return n === 0 ? 'Choose up to three' : `${n} of ${max} chosen. Select one again to change your mind.`;
  };

  const startRound = (ri: number, far: boolean) => {
    round = ri; locked = false;
    const r = rounds[ri];
    const keepHeld = ui.querySelector('.rw-held')?.outerHTML ?? '';
    ui.innerHTML = `<div class="hold-head"><h2 class="hold-q">${esc(r.prompt)}</h2><p class="hold-hint">${hintText()}</p></div>
      ${keepHeld || '<div class="rw-held"></div>'}
      <button type="button" class="hold-next rw-next">Continue</button>`;
    const head = ui.querySelector<HTMLElement>('.hold-head')!;
    head.style.setProperty('--hd', far ? '1100ms' : '700ms');
    // she is placed once: the same object, in the same place, through both
    // rounds. So she is placed under the tallest head either round can show
    // (the longer prompt, the longer hint), or round 2's head would meet her.
    if (ri === 0) {
      const q = head.querySelector('.hold-q')!, hint = head.querySelector('.hold-hint')!;
      const keep = [q.textContent, hint.textContent];
      q.textContent = rounds.map((x) => x.prompt).sort((a, b) => b.length - a.length)[0];
      hint.textContent = `${max} of ${max} chosen. Select one again to change your mind.`;
      headBottom = head.offsetTop + head.offsetHeight;
      [q.textContent, hint.textContent] = keep;
      placeSelf();
    }
    headBottom = Math.max(headBottom, head.offsetTop + head.offsetHeight);
    field.innerHTML = '';
    words = r.words.map((w, i) => {
      const slot = document.createElement('div');
      slot.className = 'rw-slot';
      slot.innerHTML = `<div class="rw-drift"><button type="button" class="rw-word${far ? ' is-unseen' : ''}" aria-pressed="false" style="--d:${1300 + i * 110}ms"><span class="sphere"><span class="sphere-word">${esc(w)}</span></span></button></div>`;
      field.append(slot);
      const el = slot.querySelector<HTMLButtonElement>('.rw-word')!;
      return { w, i, slot, el, state: 'free', home: { x: 0, y: 0 }, pos: { x: 0, y: 0 }, t0: 0, dur: 0, r0: 0, a0: 0, touched: false, drag: false, dragged: false, found: false, backFrom: { x: 0, y: 0 }, endA: 0, endR: 0 } as Word;
    });
    const pos = layout(r.words.length, ri);
    words.forEach((w, i) => { w.home = pos[i]; const h = pos[i]; w.pos = isOrbit(h) ? orbitPos(h) : { ...h }; place(w); });
    words.forEach((w) => {
      w.el.onclick = () => { if (w.dragged) { w.dragged = false; return; } choose(w); };
      if (ri === 0 && !still) carry(w);
    });
    ui.querySelector<HTMLButtonElement>('.rw-next')!.onclick = () => seal(ri);
    positionHeld();
    if (far) revealFar();
    update();
  };

  const update = () => {
    const r = rounds[round], list = answers[r.key];
    const hint = ui.querySelector('.hold-hint');
    if (hint) hint.textContent = hintText();
    const next = ui.querySelector('.rw-next');
    next?.classList.toggle('is-ready', list.length > 0 && !locked);
    next?.classList.toggle('is-full', list.length >= max);
    for (const w of words) {
      const on = list.includes(w.w);
      w.el.setAttribute('aria-pressed', String(on));
      w.el.classList.toggle('is-dim', !on && list.length >= max);
    }
  };
  const sortList = (list: string[]) => list.sort((a, b) => rounds[round].words.indexOf(a) - rounds[round].words.indexOf(b));

  const choose = (w: Word) => {
    if (locked) return;
    const list = answers[rounds[round].key];
    const on = list.includes(w.w);
    if (!on && list.length >= max) { refuse(w); return; }
    if (on) list.splice(list.indexOf(w.w), 1); else list.push(w.w);
    sortList(list);                                       // vocabulary order: no ranking
    if (round === 0) { if (on) lift(w); else fall(w, false); }
    else { if (on) unwind(w); else reach(w); }
    update();
  };
  const refuse = (w: Word) => { w.el.classList.add('is-refused'); after(430, () => w.el.classList.remove('is-refused')); };

  /* --------------------------------------- round 1: they fall into her */
  const fall = (w: Word, quick: boolean) => {
    w.state = 'falling'; w.t0 = performance.now(); w.dur = T(quick ? 700 : 1500);
    const dx = w.pos.x - self.x, dy = w.pos.y - self.y;
    w.r0 = Math.hypot(dx, dy); w.a0 = Math.atan2(dy, dx); w.touched = false;
    w.el.classList.remove('is-dragging'); w.el.classList.add('is-falling');
    self.pulls.set(w.w, { a: w.a0, t0: w.t0, amt: 0, out: false });
  };
  const lift = (w: Word) => {
    // let go: it leaves her the way it came and finds its orbit again
    w.state = 'lifting'; w.t0 = performance.now(); w.dur = T(1300);
    w.el.classList.remove('is-inside'); w.el.classList.add('is-lifting');
    renderHeld();
  };
  const stepRound1 = (now: number, dt: number) => {
    for (const w of words) {
      if (w.state === 'free' && isOrbit(w.home) && !still && !w.drag) {
        w.home.a += dt * 0.012;                  // a very slow orbit: alive, never a moving target
        w.pos = orbitPos(w.home); place(w);
      }
      if (w.state === 'falling') {
        const t = clamp01((now - w.t0) / w.dur);
        const g = Math.pow(t, 1.9);             // gathering speed
        const r = lerp(w.r0, self.R * 0.25, g);
        const a = w.a0 + 0.95 * g;                // the curve of an orbit giving way
        w.pos = { x: self.x + Math.cos(a) * r, y: self.y + Math.sin(a) * r };
        const s = lerp(1, 0.32, Math.pow(t, 1.4));
        place(w, s);
        const wr = wordR() * s;
        w.el.style.opacity = r < self.R + wr * 0.2 ? String(clamp01((r - self.R * 0.25) / (self.R * 0.75 + wr * 0.2))) : '1';
        const p = self.pulls.get(w.w); if (p) { p.a = a; p.amt = Math.sin(t * Math.PI) * 0.9; }
        if (!w.touched && r < self.R + wr * 0.85) { w.touched = true; self.ripples.push({ a, t0: now, soft: false }); }
        if (t >= 1) {
          w.state = 'inside'; w.el.classList.remove('is-falling'); w.el.classList.add('is-inside'); w.el.style.opacity = '';
          self.pulls.delete(w.w);
          // in the hand-over what draws her is taken into her light, not written
          if (!ending) { self.fillTo = answers.soughtFor.length / max; renderHeld(); }
        }
      } else if (w.state === 'lifting') {
        const t = clamp01((now - w.t0) / w.dur), e = easeOut(t);
        const home = isOrbit(w.home) ? orbitPos(w.home) : w.home;
        const ha = Math.atan2(home.y - self.y, home.x - self.x), hr = Math.hypot(home.x - self.x, home.y - self.y);
        const r = lerp(self.R * 0.3, hr, e), a = ha - 0.95 * (1 - e);
        w.pos = { x: self.x + Math.cos(a) * r, y: self.y + Math.sin(a) * r };
        place(w, lerp(0.32, 1, e));
        w.el.style.opacity = String(clamp01(t * 2.2));
        if (t >= 1) { w.state = 'free'; w.el.classList.remove('is-lifting'); w.el.style.opacity = ''; self.fillTo = answers.soughtFor.length / max; }
      } else if (w.state === 'returning') {
        const t = clamp01((now - w.t0) / w.dur), e = easeOut(t);
        const home = isOrbit(w.home) ? orbitPos(w.home) : w.home;
        w.pos = { x: lerp(w.backFrom.x, home.x, e), y: lerp(w.backFrom.y, home.y, e) }; place(w);
        if (t >= 1) w.state = 'free';
      }
    }
  };

  // Carry: pick a word up and bring it to her. The tap does exactly the same.
  const carry = (w: Word) => {
    w.el.addEventListener('pointerdown', (e) => {
      if (locked || w.state !== 'free' || round !== 0) return;
      const sx = e.clientX, sy = e.clientY, start = { ...w.pos };
      let moved = false;
      const end = () => {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      };
      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 8) return;
        if (!moved) {
          if (answers.soughtFor.length >= max) { refuse(w); end(); return; }
          moved = true; w.drag = true; w.el.classList.add('is-dragging');
        }
        w.pos = { x: start.x + dx, y: start.y + dy }; place(w);
        self.near = clamp01(1 - (Math.hypot(w.pos.x - self.x, w.pos.y - self.y) - self.R) / (self.R * 2.2));
      };
      const up = () => {
        end(); self.near = 0;
        if (!moved) return;
        w.dragged = true; w.drag = false;
        if (Math.hypot(w.pos.x - self.x, w.pos.y - self.y) < self.R + wordR() * 1.1) {
          // close enough: she takes it from here
          answers.soughtFor.push(w.w); sortList(answers.soughtFor);
          fall(w, true); update();
        } else {
          // not close enough: it drifts back to its orbit
          w.el.classList.remove('is-dragging');
          w.state = 'returning'; w.t0 = performance.now(); w.dur = T(700); w.backFrom = { ...w.pos };
        }
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  };

  // the words she holds, written inside her; touch one to let it go
  const positionHeld = () => {
    const held = ui.querySelector<HTMLElement>('.rw-held');
    if (held) { held.style.left = `${self.x}px`; held.style.top = `${self.y}px`; }
  };
  const renderHeld = () => {
    const held = ui.querySelector<HTMLElement>('.rw-held');
    if (!held) return;
    positionHeld();
    const inside = words.filter((w) => w.state === 'inside').map((w) => w.w).sort((a, b) => rounds[0].words.indexOf(a) - rounds[0].words.indexOf(b));
    const had = new Set([...held.querySelectorAll<HTMLElement>('button')].map((b) => b.dataset.w));
    held.innerHTML = inside.map((w) => `<button type="button" data-w="${esc(w)}" aria-label="Let ${esc(w)} go"${had.has(w) ? ' class="is-settled"' : ''}>${esc(w)}</button>`).join('');
    held.querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
      b.onclick = () => { const w = words.find((x) => x.w === b.dataset.w); if (w && round === 0) choose(w); };
    });
  };

  /* ------------------------------------ round 2: her light goes out to them */
  const rings = new Map<string, Ring>();
  const ringGeom = (w: Word) => { const k = isPhone() ? 1.16 : 1.3, wr = wordR(); return { cx: w.pos.x, cy: w.pos.y, rx: wr * k, ry: wr * k * 0.3 }; };
  const ringPoint = (g: ReturnType<typeof ringGeom>, phi: number, j: number) => {
    const x = Math.cos(phi) * g.rx * j, y = Math.sin(phi) * g.ry * j;
    return { x: g.cx + x * Math.cos(RING_TILT) - y * Math.sin(RING_TILT), y: g.cy + x * Math.sin(RING_TILT) + y * Math.cos(RING_TILT), near: Math.sin(phi) > 0 };
  };
  const curve = (s: Pt, e: Pt, bend: number, u: number): Pt => {
    // a quadratic arc, always bending the same way round: one sky, one spin
    const cx = (s.x + e.x) / 2 - (e.y - s.y) * bend, cy = (s.y + e.y) / 2 + (e.x - s.x) * bend, v = 1 - u;
    return { x: v * v * s.x + 2 * v * u * cx + u * u * e.x, y: v * v * s.y + 2 * v * u * cy + u * u * e.y };
  };
  const reach = (w: Word) => {
    w.state = 'ringed';
    const now = performance.now(), g = ringGeom(w);
    const toward = Math.atan2(g.cy - self.y, g.cx - self.x);
    const n = isPhone() ? 64 : 90;
    const motes: Mote[] = Array.from({ length: n }, (_, k) => ({
      phase: 'flow', t0: now + (still ? 0 : (k / n) * 820 + Math.random() * 120), dur: T(1150 + Math.random() * 450),
      a0: toward + (Math.random() - 0.5) * 0.7, phi: Math.random() * Math.PI * 2,
      w: 0.42 + Math.random() * 0.22, j: 0.92 + Math.random() * 0.16, size: 5 + Math.random() * 6, bend: 0.18 + Math.random() * 0.1, from: null,
    }));
    rings.set(w.w, { o: w, motes, formed: 0, leaving: false });
    self.pulls.set(w.w, { a: toward, t0: now, amt: 0, out: true });
    after(T(1400), () => { if (w.state === 'ringed') w.el.classList.add('is-ringed'); });
  };
  const unwind = (w: Word) => {
    w.state = 'free'; w.el.classList.remove('is-ringed');
    const rg = rings.get(w.w); if (!rg) return;
    const now = performance.now();
    rg.motes.forEach((m) => { m.phase = 'home'; m.t0 = now + (still ? 0 : Math.random() * 520); m.dur = T(1000 + Math.random() * 400); m.from = null; });
    rg.leaving = true;
  };
  const drawRings = (now: number, dt: number) => {
    bx.globalCompositeOperation = 'lighter'; fx.globalCompositeOperation = 'lighter';
    const surf = (a: number): Pt => ({ x: self.x + Math.cos(a) * self.R * 0.98, y: self.y + Math.sin(a) * self.R * 0.98 });
    for (const [key, rg] of rings) {
      const g = ringGeom(rg.o);
      let settled = 0, alive = 0;
      for (const m of rg.motes) {
        if (m.phase === 'ring') m.phi += dt * m.w;
        if (m.phase === 'flow') {
          alive++;
          if (now < m.t0) continue;
          const u = easeIO(clamp01((now - m.t0) / m.dur));
          const p = curve(surf(m.a0), ringPoint(g, m.phi, m.j), m.bend, u);
          dot(bx, p.x, p.y, m.size * (0.7 + Math.sin(u * Math.PI) * 0.5), 0.55 + 0.35 * Math.sin(u * Math.PI));
          if (u >= 1) m.phase = 'ring';
        } else if (m.phase === 'ring') {
          alive++; settled++;
          const p = ringPoint(g, m.phi, m.j);
          dot(p.near ? fx : bx, p.x, p.y, m.size * 0.62, p.near ? 0.85 : 0.4);
        } else {
          if (now < m.t0) { alive++; m.phi += dt * m.w; const p = ringPoint(g, m.phi, m.j); dot(p.near ? fx : bx, p.x, p.y, m.size * 0.62, p.near ? 0.85 : 0.4); continue; }
          if (!m.from) m.from = ringPoint(g, m.phi, m.j);
          const u = easeIO(clamp01((now - m.t0) / m.dur));
          if (u < 1) { alive++; const p = curve(m.from, surf(m.a0), -m.bend, u); dot(bx, p.x, p.y, m.size * (0.8 - u * 0.3), 0.7 * (1 - u * 0.5)); }
        }
      }
      // the ring itself, once enough of her has arrived: a hairline of her light
      rg.formed = lerp(rg.formed, rg.leaving ? 0 : settled / rg.motes.length, 0.06);
      if (rg.formed > 0.02) {
        for (const [ctx, a0, a1, k] of [[bx, Math.PI, Math.PI * 2, 0.22], [fx, 0, Math.PI, 0.45]] as const) {
          ctx.globalAlpha = rg.formed * k; ctx.strokeStyle = rgba(WARM, 1); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx, g.ry, RING_TILT, a0, a1); ctx.stroke();
        }
      }
      const p = self.pulls.get(key);
      if (p && p.out) {
        const age = now - p.t0;
        p.amt = still ? 0 : age < 1600 ? Math.sin(clamp01(age / 1600) * Math.PI) * 0.8 + 0.25 * clamp01(age / 800) : 0.25;
        if (rg.leaving) self.pulls.delete(key);
      }
      if (rg.leaving && alive === 0) { rings.delete(key); self.ripples.push({ a: Math.atan2(g.cy - self.y, g.cx - self.x), t0: now, soft: true }); }
    }
    bx.globalAlpha = 1; fx.globalAlpha = 1; bx.globalCompositeOperation = 'source-over'; fx.globalCompositeOperation = 'source-over';
  };

  /* ----------------------------------------------------------- draw her */
  const drawSelf = (now: number) => {
    if (self.condenseT0) self.condense = still ? 0 : easeIO(clamp01((now - self.condenseT0) / 1100));
    // she lets go: her skin fades as her fizz takes over (still: a plain fade)
    const vis = self.releaseT0 ? 1 - clamp01((now - self.releaseT0) / (still ? 700 : 520)) : 1;
    if (vis <= 0) return;
    const breath = still ? 0 : Math.sin(now / 1600) * 0.012 * (1 - self.condense);
    const R = self.R * easeOut(self.born) * (1 + breath + self.kindle * 0.03) * lerp(1, 0.32, self.condense) * (1 + (1 - vis) * 0.35);
    if (R < 0.5) return;
    const { x, y } = self;
    self.fill = lerp(self.fill, self.fillTo, 0.035);
    // condensing, she grows denser and brighter: the whole of her in one drop
    const cz = self.condense;
    const f = lerp(self.fill, 1, cz), k = Math.max(self.kindle, cz * 0.8), near = self.near, fi = lerp(f * CLEAR, 1, cz);
    ctx0.globalAlpha = vis;
    // her outline leans, very slightly, toward whatever is pulling on her
    const N = 120, path = new Path2D();
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      let r = 1;
      for (const p of self.pulls.values()) r += p.amt * 0.075 * Math.exp(6 * (Math.cos(a - p.a) - 1));
      const px = x + Math.cos(a) * R * r, py = y + Math.sin(a) * R * r;
      if (i) path.lineTo(px, py); else path.moveTo(px, py);
    }
    path.closePath();
    const ctx = ctx0;
    // 1 · the light she gives off into the liquid: faint as a bubble, warm once full
    ctx.globalCompositeOperation = 'lighter';
    const haloR = R * (2.1 + f * 0.6 + k * 0.5 + cz * 1.6);
    const h = ctx.createRadialGradient(x, y, R * 0.8, x, y, haloR);
    h.addColorStop(0, rgba(LIGHT, 0.05 + f * 0.13 + k * 0.08 + near * 0.08)); h.addColorStop(1, rgba(LIGHT, 0));
    ctx.fillStyle = h; ctx.beginPath(); ctx.arc(x, y, haloR, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    // 2 · her body: a bubble's skin first, filling with light as what others
    //     come to her for arrives. Her centre stays her own colour so what is
    //     written there stays legible; the light gathers toward her skin.
    ctx.save(); ctx.clip(path);
    const body = ctx.createRadialGradient(x - R * 0.18, y - R * 0.22, 0, x, y, R * 1.02);
    body.addColorStop(0, rgba(DEEP, 0.04 + fi * 0.34));
    body.addColorStop(0.5, rgba(LIGHT, 0.05 + fi * 0.24));
    body.addColorStop(0.84, rgba(LIGHT, 0.14 + fi * 0.3));
    body.addColorStop(1, rgba(WARM, 0.4 + f * 0.2));
    ctx.fillStyle = body; ctx.fillRect(x - R * 1.2, y - R * 1.2, R * 2.4, R * 2.4);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 3; i++) {
      // the light inside her moves: three slow currents near her skin
      const t = (now / 1000) * (0.11 + i * 0.03) + i * 2.1;
      const cx = x + Math.cos(t) * R * 0.62, cy = y + Math.sin(t * 1.3) * R * 0.58;
      const c = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
      c.addColorStop(0, rgba(WARM, (0.03 + fi * 0.14) * (still ? 0.7 : 1))); c.addColorStop(1, rgba(WARM, 0));
      ctx.fillStyle = c; ctx.fillRect(x - R, y - R, R * 2, R * 2);
    }
    // where a word met her skin, a ring spreads across her
    self.ripples = self.ripples.filter((rp) => now - rp.t0 < 1500);
    for (const rp of self.ripples) {
      const t = (now - rp.t0) / 1500;
      ctx.globalAlpha = vis * (1 - t) * (rp.soft ? 0.35 : 0.6);
      ctx.strokeStyle = rgba(WARM, 1); ctx.lineWidth = 1.5 * (1 - t) + 0.5;
      ctx.beginPath(); ctx.arc(x + Math.cos(rp.a) * R, y + Math.sin(rp.a) * R, R * 2.1 * easeOut(t), 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = vis; ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
    // 3 · her skin: one lit hairline and the soft glow a bubble catches. No
    //     inner highlight arc (Robin, 2026-10-06: keep the bubble clean).
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = rgba(LIGHT, 0.55 + near * 0.3 + k * 0.2); ctx.lineWidth = 1.1; ctx.stroke(path);
    const hl = ctx.createRadialGradient(x - R * 0.42, y - R * 0.48, 0, x - R * 0.42, y - R * 0.48, R * 0.5);
    hl.addColorStop(0, 'rgba(255,250,240,0.32)'); hl.addColorStop(1, 'rgba(255,250,240,0)');
    ctx.fillStyle = hl; ctx.beginPath(); ctx.arc(x - R * 0.42, y - R * 0.48, R * 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  };
  const ctx0 = bx;

  // the first light she gives, crossing the dark once; the far words are found by it
  let wave: { t0: number; dur: number; max: number } | null = null;
  const reveal = (w: Word) => { w.found = true; w.el.classList.remove('is-unseen'); w.el.classList.add('is-found'); };
  const revealFar = () => { wave = { t0: performance.now() + T(300), dur: T(2600), max: Math.hypot(window.innerWidth, window.innerHeight) * 0.62 }; };
  const drawWave = (now: number) => {
    if (!wave || now < wave.t0) return;
    const t = clamp01((now - wave.t0) / wave.dur);
    const r = lerp(self.R, wave.max, easeOut(t));
    bx.globalCompositeOperation = 'lighter';
    const g = bx.createRadialGradient(self.x, self.y, Math.max(0, r - 90), self.x, self.y, r);
    g.addColorStop(0, rgba(LIGHT, 0)); g.addColorStop(0.75, rgba(LIGHT, 0.09 * (1 - t))); g.addColorStop(1, rgba(LIGHT, 0));
    bx.fillStyle = g; bx.beginPath(); bx.arc(self.x, self.y, r, 0, Math.PI * 2); bx.fill();
    bx.globalCompositeOperation = 'source-over';
    for (const w of words) if (!w.found && (t >= 1 || Math.hypot(w.pos.x - self.x, w.pos.y - self.y) < r + wordR() * 0.4)) reveal(w);
    if (t >= 1) wave = null;
  };

  /* ---------------------------------------------------------- the turns */
  let ending = false, released = false, gone = false;
  const fizz: Fizz[] = [];
  let fizzUntil = 0;
  const seal = (ri: number) => {
    if (locked) return;
    const key = rounds[ri].key;
    if (!answers[key].length) return;
    locked = true;
    o.onSeal(key, [...answers[key]]);
    ui.querySelector('.hold-head')?.classList.add('is-leaving');
    ui.querySelector('.rw-next')?.classList.add('is-leaving');
    ui.querySelector('.rw-held')?.classList.add('is-locked');
    update();
    if (ri === 0) {
      // THE TURN: what wasn't taken drifts off; she is whole, and kindles once
      words.forEach((w) => { if (w.state === 'free' || w.state === 'returning') w.el.classList.add('is-leaving'); });
      after(T(500), () => { self.fillTo = Math.max(self.fill, 0.82); self.kindleT0 = performance.now(); });
      after(T(1500), () => startRound(1, true));
      return;
    }
    // THE HAND-OVER TO H6
    ending = true;
    words.forEach((w) => { if (w.state !== 'ringed') w.el.classList.add('is-leaving'); });
    const ringed = words.filter((w) => w.state === 'ringed');
    // 1 · gather: her light comes home, and what drew her follows it in
    after(T(250), () => ringed.forEach((w) => unwind(w)));
    ringed.forEach((w, k) => after(T(520 + k * 150), () => fall(w, false)));
    // 2 · condense: the words written in her dissolve into her light
    const gathered = T(520 + Math.max(0, ringed.length - 1) * 150 + 1500);
    after(gathered, () => {
      self.condenseT0 = performance.now();
      ui.querySelector('.rw-held')?.classList.add('is-dissolving');
    });
    // 3 · release: she lets go as her own fizz, and the camera rises with it
    after(gathered + (still ? 600 : 1150), () => {
      self.releaseT0 = performance.now();
      released = true;
      fizzUntil = performance.now() + 950;
      o.onDone();
    });
    // whatever happens, she is gone well after the camera has arrived
    after(gathered + 9000, () => { if (!gone) { gone = true; o.onGone(); } });
  };

  // her effervescence: rings of her light (never filled discs, so they read as
  // bubbles), buoyant, wobbling as they climb, popping at the end of their life
  const stepFizz = (now: number, dt: number) => {
    if (released && !still && now < fizzUntil) {
      const R = self.R * 0.32;
      const n = Math.round((isPhone() ? 120 : 190) * dt / 0.95);
      for (let k = 0; k < n; k++) {
        const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * R * 1.4;
        const big = Math.random() < 0.12;
        fizz.push({
          x: self.x + Math.cos(a) * d, y: self.y + Math.sin(a) * d,
          vx: Math.cos(a) * (20 + Math.random() * 50), vy: -(30 + Math.random() * 110),
          r: big ? 3.4 + Math.random() * 3 : 0.9 + Math.random() * 2.2,
          life: 1, ttl: 2400 + Math.random() * 2200, c: Math.random() < 0.62 ? LIGHT : [255, 248, 236], ph: Math.random() * Math.PI * 2,
        });
      }
    }
    if (!fizz.length) {
      if (released && !gone && (still || now > fizzUntil + 300)) { gone = true; o.onGone(); }
      return;
    }
    bx.globalCompositeOperation = 'lighter';
    for (let i = fizz.length - 1; i >= 0; i--) {
      const b = fizz[i];
      b.vy -= 34 * dt;                          // buoyancy: they keep climbing
      b.vx *= 1 - 0.9 * dt;
      b.x += (b.vx + Math.sin(now / 420 + b.ph) * 14) * dt;
      b.y += b.vy * dt;
      b.life -= (dt * 1000) / b.ttl;
      if (b.life <= 0 || b.y < -12) { fizz.splice(i, 1); continue; }
      const popping = b.life < 0.12;
      const rr = b.r * (popping ? 1 + (0.12 - b.life) * 9 : 1);
      // like H6's own risers, they dissolve just under the question, never across it
      const under = clamp01((b.y - window.innerHeight * 0.2) / (window.innerHeight * 0.12));
      const a = (popping ? b.life / 0.12 : Math.min(1, (1 - b.life) * 12) * 0.9) * under;
      bx.globalAlpha = a * 0.85; bx.strokeStyle = rgba(b.c, 1); bx.lineWidth = 1;
      bx.beginPath(); bx.arc(b.x, b.y, rr, 0, Math.PI * 2); bx.stroke();
      if (rr > 1.2) {
        bx.globalAlpha = a * 0.8; bx.fillStyle = 'rgba(255,252,246,0.9)';
        bx.beginPath(); bx.arc(b.x - rr * 0.32, b.y - rr * 0.32, Math.max(0.5, rr * 0.3), 0, Math.PI * 2); bx.fill();
      }
    }
    bx.globalAlpha = 1; bx.globalCompositeOperation = 'source-over';
  };
  // the moment her skin lets go: her light spreads once into the liquid
  const drawLetGo = (now: number) => {
    if (!self.releaseT0) return;
    const t = clamp01((now - self.releaseT0) / 1400);
    if (t >= 1) return;
    const R0 = self.R * 0.32, r = lerp(R0, self.R * 3.2, easeOut(t));
    bx.globalCompositeOperation = 'lighter';
    const g = bx.createRadialGradient(self.x, self.y, 0, self.x, self.y, r);
    g.addColorStop(0, rgba(WARM, 0.42 * (1 - t))); g.addColorStop(0.45, rgba(LIGHT, 0.16 * (1 - t))); g.addColorStop(1, rgba(LIGHT, 0));
    bx.fillStyle = g; bx.beginPath(); bx.arc(self.x, self.y, r, 0, Math.PI * 2); bx.fill();
    bx.globalCompositeOperation = 'source-over';
  };

  /* ------------------------------------------------------------ the loop */
  let raf = 0, last = performance.now();
  // she forms as the night is still settling, not after it
  const bornT0 = performance.now() + T(700);
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    self.born = clamp01((now - bornT0) / T(1600));
    if (self.kindleT0) { const t = (now - self.kindleT0) / T(1800); self.kindle = t < 1 ? Math.sin(clamp01(t) * Math.PI) : 0; if (t >= 1) self.kindleT0 = 0; }
    bx.clearRect(0, 0, window.innerWidth, window.innerHeight); fx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stepRound1(now, dt);
    drawWave(now);
    drawSelf(now);
    drawRings(now, dt);
    drawLetGo(now);
    stepFizz(now, dt);
    raf = requestAnimationFrame(frame);
  };
  const onResize = () => {
    sizeCanvases();
    const head = ui.querySelector<HTMLElement>('.hold-head');
    if (head) headBottom = head.offsetTop + head.offsetHeight;
    placeSelf();
    const pos = layout(words.length, round);
    words.forEach((w, i) => { w.home = pos[i]; const h = pos[i]; if (w.state === 'free' || w.state === 'ringed') { w.pos = isOrbit(h) ? orbitPos(h) : { ...h }; place(w); } });
    positionHeld();
  };

  sizeCanvases();
  startRound(0, false);
  window.addEventListener('resize', onResize);
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    timers.forEach((t) => window.clearTimeout(t));
    window.removeEventListener('resize', onResize);
    host.innerHTML = '';
  };
}
