import { useSyncExternalStore } from 'react';
import { score } from './score';

// The one sound control: a hairline pill on the nav's line, opposite the
// mark, in the same place on every screen, so a guest can see how to stop the
// music before it ever starts (the landing). Static by design: four bars that
// stand when on and lie down when off, no pulsing, no blinking dot.
export default function SoundToggle() {
  const { enabled, unavailable } = useSyncExternalStore(score.subscribe, score.snapshot);
  if (unavailable) return null;
  return (
    <button
      type="button"
      className={`sound-toggle${enabled ? ' is-on' : ''}`}
      aria-pressed={enabled}
      onClick={() => score.toggle()}
    >
      <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="sound-label">{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
