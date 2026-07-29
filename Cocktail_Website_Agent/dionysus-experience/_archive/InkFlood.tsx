import { useCallback, useEffect, useRef, type ReactElement } from 'react';

// Full-screen ink-bloom transition. flood(onCovered) grows an organic blot until
// the screen is sumi black, fires onCovered (swap the page underneath), then the
// ink withdraws. Whole figure stays well under two seconds.

const INK = '#16140f';
const COVER_MS = 620;
const HOLD_MS = 140;
const RECEDE_MS = 540;

interface Blob {
  cx: number;
  cy: number;
  phase1: number;
  phase2: number;
  amp1: number;
  amp2: number;
  scale: number;
}

export function useInkFlood(): { overlay: ReactElement; flood: (onCovered: () => void) => void } {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const busyRef = useRef(false);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  const flood = useCallback((onCovered: () => void) => {
    const canvas = canvasRef.current;
    // ignore re-entrant calls: a transition is already in flight and double
    // triggers (rapid clicks) must not skip pages
    if (busyRef.current) return;
    if (!canvas) {
      onCovered();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCovered();
      return;
    }
    busyRef.current = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      busyRef.current = false;
      onCovered();
      return;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.opacity = '1';

    const maxR = Math.hypot(w, h) * 0.75;
    const blobs: Blob[] = [
      { cx: w * 0.5, cy: h * 0.45, phase1: Math.random() * 7, phase2: Math.random() * 7, amp1: 0.16, amp2: 0.1, scale: 1 },
      { cx: w * 0.2, cy: h * 0.8, phase1: Math.random() * 7, phase2: Math.random() * 7, amp1: 0.2, amp2: 0.12, scale: 0.55 },
      { cx: w * 0.85, cy: h * 0.15, phase1: Math.random() * 7, phase2: Math.random() * 7, amp1: 0.2, amp2: 0.12, scale: 0.5 },
    ];

    const drawBlobs = (r: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = INK;
      for (const b of blobs) {
        const rr = r * b.scale;
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) {
          const a = (i / 90) * Math.PI * 2;
          const wobble = 1 + b.amp1 * Math.sin(5 * a + b.phase1) + b.amp2 * Math.sin(9 * a + b.phase2);
          const x = b.cx + Math.cos(a) * rr * wobble;
          const y = b.cy + Math.sin(a) * rr * wobble;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
    };

    const easeInQuart = (t: number) => t * t * t * t;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const start = performance.now();
    let covered = false;

    const tick = (now: number) => {
      const t = now - start;
      if (t < COVER_MS) {
        drawBlobs(maxR * easeInQuart(t / COVER_MS));
      } else if (t < COVER_MS + HOLD_MS) {
        if (!covered) {
          covered = true;
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = INK;
          ctx.fillRect(0, 0, w, h);
          onCovered();
          window.scrollTo({ top: 0 });
        }
      } else if (t < COVER_MS + HOLD_MS + RECEDE_MS) {
        const p = (t - COVER_MS - HOLD_MS) / RECEDE_MS;
        canvas.style.opacity = String(1 - easeOutQuart(p));
      } else {
        ctx.clearRect(0, 0, w, h);
        canvas.style.opacity = '0';
        busyRef.current = false;
        return;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, []);

  const overlay = (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none print:hidden"
      style={{ opacity: 0, width: '100vw', height: '100vh' }}
    />
  );

  return { overlay, flood };
}
