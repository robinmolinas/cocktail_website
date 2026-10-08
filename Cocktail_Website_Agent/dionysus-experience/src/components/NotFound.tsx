// The poetic 404 · "The Last Drop"
//
// THESIS: the journey's own drop-and-rings gesture (H2/H7/H8) with the result
//   withheld — a drop falls into the dark and nothing rises to meet it. Refuses
//   the category-default "404 / Page not found / [Home]" centred card.
// OWN-WORLD: deep warm-black (--night), warm gold rim-light and ember, drifting
//   dust and slow smoke (the hero's atmosphere). Playfair italic voice, Inter
//   sub, brass (--gold) micro-label. Circles/rings and one frosted pill — no
//   boxes. Colour is light only, never a fill.
// STORY: the visitor understands they reached a glass never poured; the falling
//   drop that never lands says nothing is here; one door — "Discover the spirit
//   within" — leads home to the entrance's own promise.
// FIRST VIEWPORT: full-bleed black; a live canvas where a seed-ember drop falls
//   and ripples into nothing on a slow loop, lantern-warmth trailing the pointer;
//   above it a brass "404 · Not Poured" whisper, the Playfair line "This glass
//   was never poured.", an Inter sub-line, and the house CTA.
// FORM: The Last Drop — candidate 4 of the grounded list (seed c301a92b); no
//   staging challenger taken. The cursor-as-lantern from the hero is fused in as
//   a restrained interaction layer, not a second structure.

import { useEffect, useRef, type CSSProperties } from 'react';
import CtaButton from './CtaButton';

const EMBER = '255,176,136'; // --ember, the warm light
const FLAME = '232,112,42';  // --vermilion, the flame

export default function NotFound({ onHome }: { onHome: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0;

    // ---- dust: the hero's floating gold, drifting slowly upward ----
    type Mote = { x: number; y: number; r: number; a: number; tw: number; tws: number; vx: number; vy: number };
    let motes: Mote[] = [];
    const buildMotes = () => {
      const n = Math.round(Math.min(38, Math.max(18, (W * H) / 46000)));
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.5 + Math.random() * 1.4,
        a: 0.05 + Math.random() * 0.16,
        tw: Math.random() * Math.PI * 2,
        tws: 0.6 + Math.random() * 1.1,
        vx: ((Math.random() - 0.5) * 4) / 1000, // px per ms
        vy: -(3 + Math.random() * 8) / 1000,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMotes();
    };
    resize();
    window.addEventListener('resize', resize);

    // ---- the lantern: warmth trailing the pointer (the hero's device) ----
    const ptr = { x: W / 2, y: H * 0.6, tx: -999, ty: -999, active: false };
    const onMove = (e: PointerEvent) => {
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      ptr.active = true;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // ---- the drop: falls through the words, pools below, ripples into nothing ----
    // the surface sits low so the ripple reads as a pool beneath the door, never
    // an oval framing it (RING_R keeps the widest ring narrower than the CTA)
    // The pool sits lower than it did (0.72 → 0.80): the composition was
    // top-heavy — 42% of a tall viewport sat empty under the door — and the
    // gesture belongs in that void, not crowded under the CTA. Radius stays
    // deliberately small (0.22 → 0.26 only): a wide ring reads as an oval
    // framing the door, which is the one thing this scene must not do.
    const SURF = 0.80; // the still surface, as a fraction of viewport height
    const RING_R = 0.26; // widest ring radius as a fraction of the smaller side
    const START = 0.14;
    // the rest beat was longer than the gesture — for ~2.5s of a 5.3s loop the
    // canvas held almost nothing, so the drop read as absent rather than quiet
    const FALL = 1150, RIPPLE = 2600, REST = 800;
    let phase: 'fall' | 'ripple' | 'rest' = 'fall';
    let pt0 = performance.now();
    let rings: { born: number }[] = [];

    const paintDust = (now: number, dt: number, LR: number) => {
      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -4) { m.y = H + 4; m.x = Math.random() * W; }
        if (m.x < -4) m.x = W + 4;
        else if (m.x > W + 4) m.x = -4;
        m.tw += (m.tws * dt) / 1000;
        let a = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        // the lantern lifts the dust it passes over — searching the dark
        const d = Math.hypot(m.x - ptr.x, m.y - ptr.y);
        if (d < LR) a += (1 - d / LR) * 0.22;
        ctx.globalAlpha = Math.min(0.5, a);
        ctx.fillStyle = `rgba(${EMBER},1)`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      void now;
    };

    // Reduced motion: one settled frame — the pool and a single still ring, no
    // loop. Repainted on resize too, so a rotate/resize never leaves it blank.
    const paintStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      paintDust(0, 0, Math.min(W, H) * 0.42);
      const sx = W / 2, sy = H * SURF;
      const rMax = Math.min(W, H) * RING_R;
      ctx.globalAlpha = 1;
      const pool = ctx.createRadialGradient(sx, sy, 0, sx, sy, rMax);
      pool.addColorStop(0, `rgba(${EMBER},0.13)`);
      pool.addColorStop(1, `rgba(${EMBER},0)`);
      ctx.fillStyle = pool;
      ctx.beginPath();
      ctx.ellipse(sx, sy, rMax, rMax * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(${EMBER},0.42)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(sx, sy, rMax * 0.5, rMax * 0.17, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };
    if (reduce) {
      paintStatic();
      // resize() (registered first) resizes + rebuilds motes and clears the
      // canvas; this repaints the settled frame on top of that.
      window.addEventListener('resize', paintStatic);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', paintStatic);
        window.removeEventListener('pointermove', onMove);
      };
    }

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;

      // smooth the lantern toward the pointer; drift on its own when idle/touch
      if (ptr.active && ptr.tx !== -999) {
        ptr.x += (ptr.tx - ptr.x) * 0.08;
        ptr.y += (ptr.ty - ptr.y) * 0.08;
      } else {
        const t = now / 1000;
        ptr.x = W * (0.5 + 0.22 * Math.sin(t * 0.34));
        ptr.y = H * (0.5 + 0.14 * Math.sin(t * 0.23 + 1.3));
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // the lantern's pool of warmth
      const LR = Math.min(W, H) * 0.42;
      const lg = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, LR);
      lg.addColorStop(0, `rgba(${EMBER},0.05)`);
      lg.addColorStop(0.5, `rgba(${FLAME},0.02)`);
      lg.addColorStop(1, `rgba(${EMBER},0)`);
      ctx.globalAlpha = 1;
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, W, H);

      paintDust(now, dt, LR);

      const sx = W / 2, sy = H * SURF;
      const el = now - pt0;

      if (phase === 'fall') {
        const p = Math.min(1, el / FALL);
        const y = H * START + (sy - H * START) * (p * p); // accelerate under gravity
        const tl = 10 + 26 * p; // the trailing streak grows with speed
        const tg = ctx.createLinearGradient(sx, y - tl, sx, y);
        tg.addColorStop(0, `rgba(${FLAME},0)`);
        tg.addColorStop(1, `rgba(${EMBER},${0.5 * (0.4 + p)})`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = tg;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sx, y - tl);
        ctx.lineTo(sx, y);
        ctx.stroke();
        const gg = ctx.createRadialGradient(sx, y, 0, sx, y, 16);
        gg.addColorStop(0, 'rgba(255,238,222,0.95)');
        gg.addColorStop(0.4, `rgba(${EMBER},0.5)`);
        gg.addColorStop(1, `rgba(${EMBER},0)`);
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(sx, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,244,232,0.95)';
        ctx.beginPath();
        ctx.arc(sx, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        if (p >= 1) { phase = 'ripple'; pt0 = now; rings = [{ born: now }]; }
      } else if (phase === 'ripple') {
        if (rings.length < 3 && el > rings.length * 300) rings.push({ born: now });
        // the impact bloom, dying
        const bloom = Math.max(0, 1 - el / 700);
        if (bloom > 0) {
          const bR = 10 + 34 * (1 - bloom);
          const bg = ctx.createRadialGradient(sx, sy, 0, sx, sy, bR);
          bg.addColorStop(0, `rgba(${EMBER},${0.8 * bloom})`);
          bg.addColorStop(1, `rgba(${EMBER},0)`);
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.ellipse(sx, sy, bR, bR * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        // rings roll outward on the still surface and fade — nothing rises
        for (const r of rings) {
          const rp = Math.min(1, (now - r.born) / 2200);
          const rad = 8 + rp * Math.min(W, H) * RING_R;
          ctx.globalAlpha = 1;
          // the gesture was measured at ~2.8k lit px on a 1.3M px canvas —
          // technically present, perceptually absent. Brightness, not size.
          ctx.strokeStyle = `rgba(${EMBER},${(1 - rp) * 0.85})`;
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          ctx.ellipse(sx, sy, rad, rad * 0.32, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (el > RIPPLE) { phase = 'rest'; pt0 = now; }
      } else {
        if (el > REST) { phase = 'fall'; pt0 = now; }
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="nf-root" style={{ '--c': '#e8702a' } as CSSProperties}>
      <canvas ref={canvasRef} className="nf-canvas" aria-hidden="true" />
      <div className="nf-vig" aria-hidden="true" />
      <div className="nf-content">
        <p className="nf-label nf-rise" style={{ '--d': '0s' } as CSSProperties}>404 · Not Poured</p>
        <h1 className="nf-title nf-rise" style={{ '--d': '0.12s' } as CSSProperties}>
          This glass was never poured.
        </h1>
        <p className="nf-sub nf-rise" style={{ '--d': '0.26s' } as CSSProperties}>
          You reached for something the dark never held. Whatever was poured here has long
          since evaporated. Your own glass still waits.
        </p>
        <div className="nf-cta nf-rise" style={{ '--d': '0.42s' } as CSSProperties}>
          <CtaButton onClick={onHome}>Discover your spirit within</CtaButton>
        </div>
        <span className="nf-sr">Error 404. This page could not be found.</span>
      </div>
    </section>
  );
}
