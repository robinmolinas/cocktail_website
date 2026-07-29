// The Velvet Rope · the degrade state, never the strategy (master spec §3)
//
// THESIS: nobody ever reaches a broken hold. The journey's holds are composed
//   against a wide frame; on a viewport too small to hold them, the ritual
//   declines *in world* rather than rendering badly. This is deliberately NOT
//   a mobile gate — H3 and H5 carry portrait presets and the phone journey is
//   meant to run. It catches only genuinely unsupported frames.
// STORY: she is not turned away empty-handed. Two gifts, per the spec: send
//   herself the door (so the journey waits on a wider table), or taste one
//   already poured (a house exemplar — the payoff craft in ninety seconds).
// FORM: the depths' own material — night field, candle-ivory Playfair voice,
//   the Veil pill. No boxes, no cards.

import { useEffect, useState, type CSSProperties } from 'react';
import { CONNOISSEUR_SAMPLE } from '../data/sampleResult';
import { pourLinkFor } from '../engine/pourLink';

export default function VelvetRope({ onAnyway }: { onAnyway: () => void }) {
  const [note, setNote] = useState<string | null>(null);
  const [exemplar, setExemplar] = useState<string | null>(null);

  // the house pour travels the same way any shared pour does — no separate
  // build, no server: the exemplar is an ordinary #pour= link
  useEffect(() => {
    let cancelled = false;
    pourLinkFor({ from: '', color: '#c8102e', result: CONNOISSEUR_SAMPLE })
      .then((url) => { if (!cancelled) setExemplar(url); });
    return () => { cancelled = true; };
  }, []);

  const sendTheDoor = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Dionysus', text: 'The cocktail within, on a wider table:', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setNote('The door is in your pocket');
    } catch {
      setNote('The ink would not take — try once more');
    }
    setTimeout(() => setNote(null), 2400);
  };

  return (
    <section className="vr-root" style={{ '--c': '#e8702a' } as CSSProperties}>
      <div className="vr-inner">
        <p className="vr-label">The Threshold</p>
        <h1 className="vr-title">This ritual is poured on a wider table.</h1>
        <p className="vr-sub">
          The depths need more room than this screen can give them. Take the door with you —
          or taste one already poured.
        </p>
        <div className="vr-actions">
          <button type="button" className="vr-pill" onClick={sendTheDoor}>
            {note ?? 'Send yourself the door'}
          </button>
          {exemplar && (
            <a className="vr-pill vr-pill-quiet" href={exemplar}>
              Taste one already poured
            </a>
          )}
        </div>
        {/* never a dead end: the rope is a courtesy, not a lock */}
        <button type="button" className="vr-anyway" onClick={onAnyway}>
          cross anyway
        </button>
      </div>
    </section>
  );
}
