// A coupe glass that slowly fills with ink as the rite progresses.
// No percentages, no numbers — the liquid itself is the measure.

interface GlassProgressProps {
  /** 0..1 */
  progress: number;
  color: string;
  chapter: string; // e.g. "II · VI"
}

const BOWL_TOP = 22;
const BOWL_BOTTOM = 62;

export default function GlassProgress({ progress, color, chapter }: GlassProgressProps) {
  const p = Math.max(0, Math.min(1, progress));
  const level = BOWL_BOTTOM - (BOWL_BOTTOM - BOWL_TOP) * p;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-[90] flex flex-col items-center gap-1 pointer-events-none select-none print:hidden">
      <svg width="74" height="104" viewBox="0 0 100 140" fill="none" aria-label="Your cocktail is taking form">
        <defs>
          <clipPath id="bowlClip">
            <path d="M14 20 C14 50 32 64 50 64 C68 64 86 50 86 20 Z" />
          </clipPath>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.92" />
            <stop offset="100%" stopColor="#16140f" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* liquid */}
        <g clipPath="url(#bowlClip)">
          <g style={{ transform: `translateY(${level - BOWL_TOP}px)`, transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <path
              className="glass-wave"
              d="M-100 22 Q -88 18 -76 22 T -52 22 T -28 22 T -4 22 T 20 22 T 44 22 T 68 22 T 92 22 T 116 22 T 140 22 T 164 22 T 188 22 L 188 140 L -100 140 Z"
              fill="url(#liquidGrad)"
            />
          </g>
        </g>

        {/* glass outline */}
        <path
          d="M14 20 C14 50 32 64 50 64 C68 64 86 50 86 20"
          stroke="#16140f" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85"
        />
        <line x1="50" y1="64" x2="50" y2="112" stroke="#16140f" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <path d="M30 118 Q 50 110 70 118" stroke="#16140f" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
        {/* rim shimmer */}
        <line x1="14" y1="20" x2="86" y2="20" stroke="#16140f" strokeWidth="1" opacity="0.3" />
      </svg>
      <span className="font-playfair italic text-[11px] tracking-[0.25em] text-[#16140f]/60">{chapter}</span>
    </div>
  );
}
