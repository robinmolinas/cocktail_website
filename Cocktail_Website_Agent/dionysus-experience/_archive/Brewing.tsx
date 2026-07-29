import { useEffect, useState } from 'react';
import type { CocktailResult } from '../types';

// Phase C: the four ateliers take turns over your answers while the glass fills.

const STAGE_MS = 2600;

interface BrewingProps {
  result: CocktailResult;
  userColor: string;
  onComplete: () => void;
}

export default function Brewing({ result, userColor, onComplete }: BrewingProps) {
  const [stage, setStage] = useState(0);

  const stages = [
    { role: 'The Psychologist', line: result.agentLines.psychologist },
    { role: 'The Historian', line: result.agentLines.historian },
    { role: 'The Mixologist', line: result.agentLines.mixologist },
    { role: 'The Storyteller', line: result.agentLines.storyteller },
  ];

  useEffect(() => {
    if (stage >= stages.length) {
      const t = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStage((s) => s + 1), STAGE_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const fill = Math.min(1, (stage + 1) / stages.length);
  const active = stages[Math.min(stage, stages.length - 1)];

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* swirling ink orb with a rising fill */}
      <div className="relative mb-12 h-40 w-40 sm:h-48 sm:w-48">
        <div
          className="brew-orb absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${userColor}cc, #16140f 75%)`,
          }}
        />
        <div className="brew-orb-2 absolute inset-3 rounded-full border border-[#f4efe6]/20" />
        <div className="brew-orb-3 absolute -inset-3 rounded-full border border-[#16140f]/15" />
        {/* liquid level ring */}
        <svg viewBox="0 0 100 100" className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] -rotate-90">
          <circle cx="50" cy="50" r="47" fill="none" stroke="#16140f" strokeOpacity="0.12" strokeWidth="1.5" />
          <circle
            cx="50" cy="50" r="47" fill="none"
            stroke={userColor} strokeWidth="2" strokeLinecap="round"
            strokeDasharray={`${fill * 295.3} 295.3`}
            style={{ transition: 'stroke-dasharray 2.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </svg>
      </div>

      <div key={stage} className="max-w-xl">
        <p className="q-rise text-[11px] uppercase tracking-[0.45em] text-[#16140f]/50">{active.role}</p>
        <p className="q-rise mt-4 font-playfair italic text-2xl leading-snug text-[#16140f] sm:text-3xl" style={{ animationDelay: '120ms' }}>
          {active.line}
        </p>
      </div>

      <div className="mt-12 flex gap-3">
        {stages.map((s, i) => (
          <span
            key={s.role}
            className="h-1.5 w-1.5 rounded-full transition-all duration-700"
            style={{ background: i <= stage ? '#16140f' : '#16140f33', transform: i === stage ? 'scale(1.6)' : 'scale(1)' }}
          />
        ))}
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-[0.35em] text-[#16140f]/35">
        Distilling the cocktail within you
      </p>
    </div>
  );
}
