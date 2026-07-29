import { useEffect, useRef } from 'react';

// Live suminagashi (Japanese water marbling) simulation.
// Uses the classical mathematical-marbling operations:
//   drop:  P' = C + (P - C) * sqrt(1 + r^2 / |P - C|^2)
//   tine:  P' = P + (z * lambda / (d + lambda)) * M   (cursor drags comb the ink)
// Other components may scatter ink by dispatching:
//   window.dispatchEvent(new CustomEvent('ink-drop', { detail: { x, y, color } }))

const POINTS_PER_DROP = 110;
const MAX_DROPS = 64;

interface Drop {
  xs: Float32Array;
  ys: Float32Array;
  color: string;
  alpha: number;
}

interface SuminagashiProps {
  /** ink colours cycled between paper-coloured clearing drops */
  colors?: string[];
  paper?: string;
  /** ms between automatic drops */
  cadence?: number;
  interactive?: boolean;
  className?: string;
  opacity?: number;
}

export default function Suminagashi({
  colors = ['#16140f', '#3c3a33', '#e8702a'],
  paper = '#f4efe6',
  cadence = 2400,
  interactive = true,
  className = '',
  opacity = 1,
}: SuminagashiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef(colors);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drops: Drop[] = [];
    let dirty = true;
    let raf = 0;
    let dropCount = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    };
    resize();
    window.addEventListener('resize', resize);

    const addDrop = (cx: number, cy: number, r: number, color: string, alpha: number) => {
      const r2 = r * r;
      for (const d of drops) {
        for (let i = 0; i < POINTS_PER_DROP; i++) {
          const dx = d.xs[i] - cx;
          const dy = d.ys[i] - cy;
          const len2 = dx * dx + dy * dy;
          if (len2 < 0.0001) continue;
          const scale = Math.sqrt(1 + r2 / len2);
          d.xs[i] = cx + dx * scale;
          d.ys[i] = cy + dy * scale;
        }
      }
      const xs = new Float32Array(POINTS_PER_DROP);
      const ys = new Float32Array(POINTS_PER_DROP);
      for (let i = 0; i < POINTS_PER_DROP; i++) {
        const a = (i / POINTS_PER_DROP) * Math.PI * 2;
        xs[i] = cx + Math.cos(a) * r;
        ys[i] = cy + Math.sin(a) * r;
      }
      drops.push({ xs, ys, color, alpha });
      if (drops.length > MAX_DROPS) drops.shift();
      dirty = true;
    };

    const tine = (x: number, y: number, dx: number, dy: number) => {
      const mag = Math.hypot(dx, dy);
      if (mag < 0.5) return;
      const ux = dx / mag;
      const uy = dy / mag;
      const z = Math.min(mag * 0.55, 14); // displacement strength
      const lambda = 38; // falloff
      for (const d of drops) {
        for (let i = 0; i < POINTS_PER_DROP; i++) {
          // perpendicular distance from the tine line through (x, y) along (ux, uy)
          const px = d.xs[i] - x;
          const py = d.ys[i] - y;
          const dist = Math.abs(px * -uy + py * ux);
          const f = (z * lambda) / (dist + lambda);
          d.xs[i] += ux * f;
          d.ys[i] += uy * f;
        }
      }
      dirty = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.xs[0], d.ys[0]);
        for (let i = 1; i < POINTS_PER_DROP; i++) ctx.lineTo(d.xs[i], d.ys[i]);
        ctx.closePath();
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (dirty) {
        render();
        dirty = false;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // drops fall in clusters around a slowly wandering anchor — alternating ink
    // and paper-coloured drops at the same spot is what draws the concentric rings
    let anchorX = 0;
    let anchorY = 0;
    const moveAnchor = () => {
      anchorX = w * (0.18 + Math.random() * 0.64);
      anchorY = h * (0.15 + Math.random() * 0.7);
    };
    const autoDrop = () => {
      if (dropCount % 7 === 0) moveAnchor();
      const cx = anchorX + (Math.random() - 0.5) * 60;
      const cy = anchorY + (Math.random() - 0.5) * 60;
      const inkTurn = dropCount % 2 === 0;
      if (inkTurn) {
        const palette = colorsRef.current;
        const color = palette[Math.floor(dropCount / 2) % palette.length];
        addDrop(cx, cy, 14 + Math.random() * 55, color, color === '#16140f' ? 0.18 : 0.3);
      } else {
        // a paper-coloured drop pushes the ink into rings, like a breath on water
        addDrop(cx, cy, 30 + Math.random() * 85, paper, 0.94);
      }
      dropCount++;
    };

    // seed the pond
    for (let i = 0; i < 10; i++) autoDrop();
    const interval = reduced ? 0 : window.setInterval(autoDrop, cadence);

    let lastX = -1;
    let lastY = -1;
    const onMove = (e: PointerEvent) => {
      if (!interactive || reduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lastX >= 0) tine(x, y, x - lastX, y - lastY);
      lastX = x;
      lastY = y;
    };
    window.addEventListener('pointermove', onMove);

    const onInkDrop = (e: Event) => {
      const det = (e as CustomEvent<{ x: number; y: number; color: string }>).detail;
      if (!det) return;
      const rect = canvas.getBoundingClientRect();
      addDrop(det.x - rect.left, det.y - rect.top, 14 + Math.random() * 26, det.color, 0.34);
      addDrop(det.x - rect.left, det.y - rect.top, 6 + Math.random() * 10, paper, 0.9);
    };
    window.addEventListener('ink-drop', onInkDrop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('ink-drop', onInkDrop);
      if (interval) window.clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, [paper, cadence, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}
