import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Answers, CocktailResult } from './types';
import { personaImageFor } from './data/personas';
import TheDepths, { type DevJumpTarget, type DevPage } from './components/TheDepths';
import TheReading from './components/TheReading';
import NotFound from './components/NotFound';
import VelvetRope from './components/VelvetRope';
import { isUnsupportedViewport } from './engine/viewport';
import { VISIONARY_SAMPLE } from './data/sampleResult';
import CtaButton from './components/CtaButton';
import { decodePour, pourFromLocation } from './engine/pourLink';

const BG_IMAGE_1 = "/first.png";
const BG_IMAGE_2 = "/reveal.png";

// The cursor spotlight: the second world (reveal.png) is painted full-bleed and
// masked to a soft circle that follows the pointer. The circle is a pure CSS
// radial-gradient mask positioned by two custom properties (--mx/--my); the
// smoothed rAF loop in App writes those straight to this element's style, so the
// spotlight tracks the cursor with zero React re-renders and no canvas readback.
// Before the first mouse move the origin sits off-screen (-999px), so nothing is
// revealed — the same cold open as before.
function RevealLayer({ image, layerRef }: { image: string; layerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={layerRef}
      className="reveal-spotlight absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{ backgroundImage: `url('${image}')` }}
    />
  );
}

// landing → depths → reading (master spec 2026-07-08 §1). The old quiz/brewing
// paper phases left the flow, and TheSurfacing's diorama keepsake left with the
// 2026-07-24 pass: both the owner's reveal (H10) and the friend's arrival (H11)
// are now TheReading. The retired components are archived under _archive/ (see
// _archive/README.md) — kept for reference, out of the compiled tree.
// 'gift' is the fourth door: a #pour= link opens straight onto a friend's
// keepsake, and its one invitation leads back to the landing.
// 'notfound' is the poetic 404 (master spec §4): the app is served at '/', so
// any other pathname is a glass that was never poured. Broken #pour= links keep
// their deliberate "never strand a guest" return home — the 404 is for routes,
// not for gifts that failed to decode.
type Phase = 'landing' | 'depths' | 'gift' | 'reading' | 'notfound';

// The one real route is '/'. Anything else reached the app by mistake.
const isUnknownRoute = (): boolean =>
  !pourFromLocation() && window.location.pathname !== '/';

const DEFAULT_ANSWERS: Answers = {
  name: '',
  lens: null,
  answerStyle: null,
  childhood: null,
  city: '',
  age: '',
  gender: null,
  color: '#e8702a',
  colorName: '',
  colorTouched: false,
  gravity: {},
  selfScales: {},
  personality: null,
  interpersonal: null,
  workEthic: null,
  emotional: null,
  creativity: null,
  moodScales: {},
  texture: {},
  drawnToward: [],
  soughtFor: [],
  styles: [],
  flavors: [],
  drinkScales: {},
  allergies: '',
  insight: '',
};

function App() {
  // a #pour= link opens in the dark and stays there while the payload decodes —
  // the gift unveils out of that black, the same one-stroke grammar as H9. An
  // unknown pathname opens straight onto the poetic 404.
  const [phase, setPhase] = useState<Phase>(() =>
    pourFromLocation() ? 'gift' : isUnknownRoute() ? 'notfound' : 'landing',
  );
  const [leaving, setLeaving] = useState(false);
  // 'in' sinks the world into the dark, 'out' surfaces the next one from it.
  // Every change of world passes through this one veil.
  const [descending, setDescending] = useState<null | 'in' | 'out'>(null);
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
  const [result, setResult] = useState<CocktailResult | null>(null);
  // gift mode: the sharer's identity, rebuilt from the link so the reading can
  // ink their name onto the tag and thread their seed colour as usual
  const [giftAnswers, setGiftAnswers] = useState<Answers | null>(null);

  // bumped on every arrival so re-entering the same view remounts and replays
  // the choreography from the top (declared here because the pour effect below
  // bumps it too)
  const [readingTake, setReadingTake] = useState(0);

  // A pour can arrive after mount too — pasted into the address bar of an
  // already-open tab, or followed from a second link — so the decode listens
  // for hash changes rather than running once and never again.
  useEffect(() => {
    let cancelled = false;

    const openPour = () => {
      const encoded = pourFromLocation();
      if (!encoded) return;
      decodePour(encoded).then((pour) => {
        if (cancelled) return;
        if (!pour) {
          // a broken link never strands the guest — the invitation opens instead
          window.history.replaceState(null, '', window.location.pathname);
          setPhase('landing');
          return;
        }
        setGiftAnswers({ ...DEFAULT_ANSWERS, name: pour.from, color: pour.color });
        setResult(pour.result);
        setReadingTake((n) => n + 1); // remount so the arrival replays from the top
        setPhase('gift');
      });
    };

    openPour();
    window.addEventListener('hashchange', openPour);
    return () => {
      cancelled = true;
      window.removeEventListener('hashchange', openPour);
    };
  }, []);

  // the gift's one invitation: the same descent as the threshold — the veil
  // darkens over the keepsake, the borrowed pour is shed under the dark, and
  // she opens at H1 to begin her own ritual
  const beginOwnJourney = () => {
    descendIntoDepths(() => {
      window.history.replaceState(null, '', window.location.pathname);
      setGiftAnswers(null);
      setResult(null);
      setAnswers(DEFAULT_ANSWERS);
    });
  };

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== 'landing') return;

    // Write the spotlight origin straight onto the reveal layer's custom
    // properties — no React state, so the pointer track never re-renders App.
    const writeSpotlight = (x: number, y: number) => {
      const el = revealRef.current;
      if (!el) return;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    // pointermove (not mousemove) so a mouse or pen still drives this exactly
    // as before, but the listener isn't silently mouse-only.
    const handlePointerMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
        writeSpotlight(e.clientX, e.clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Touch has no hover, so a static screen never fires pointermove and the
    // second world (reveal.png) was never uncovered on a phone. Reduced
    // motion aside, a visitor who never drags gets a slow autonomous drift —
    // the same device already shipped on the 404's lantern — so the reveal
    // still happens without asking for a gesture this experience never asks
    // for elsewhere (desktop-first, no drag interactions).
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();

    const updateCursor = (now: number) => {
      if (mouse.current.x !== -999) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        writeSpotlight(smooth.current.x, smooth.current.y);
      } else if (!reduced) {
        const t = (now - start) / 1000;
        writeSpotlight(
          window.innerWidth * (0.5 + 0.22 * Math.sin(t * 0.11)),
          window.innerHeight * (0.5 + 0.16 * Math.sin(t * 0.08 + 1.3)),
        );
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  const updateAnswers = (patch: Partial<Answers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  };

  // The descent: the one door into the depths, shared by every entrance —
  // the landing's threshold and the gift's invitation alike. The veil darkens
  // over whatever page is leaving, then the depths open at H1. `prepare` runs
  // under full dark, where any state shedding is invisible.
  const descendIntoDepths = (prepare?: () => void) => {
    setLeaving(true);
    setDescending('in');
    window.setTimeout(() => {
      prepare?.();
      setDevJump(null); // a stale dev jump must never hijack a real descent
      setPhase('depths');
      setDescending(null);
      setLeaving(false);
    }, 1550);
  };

  // The rope is checked at the threshold, not on every resize: once she is
  // inside the depths a rotation must never yank the journey out from under
  // her. `roped` latches false the moment she chooses to cross anyway.
  const [roped, setRoped] = useState(false);
  const beginJourney = () => {
    if (isUnsupportedViewport()) { setRoped(true); return; }
    descendIntoDepths();
  };
  const crossAnyway = () => { setRoped(false); descendIntoDepths(); };

  // TheDepths fires onPrepare at the letting-go (~1.6s before the handoff):
  // the result is distilled HERE and the persona image pre-decoded, so the
  // black-on-black cut into TheSurfacing carries no decode stall — the
  // emergence starts the instant the black lands (no stop in the flow).
  // craftCocktail may not be pure, so the prepared result is kept in a ref
  // and finishDepths reuses it rather than rolling a second one.
  const preparedResult = useRef<CocktailResult | null>(null);
  const prepareReveal = () => {
    // For testing: lock output to approved cocktail "Down the Line" (The Visionary) which has full artwork and copy
    const r = VISIONARY_SAMPLE;
    preparedResult.current = r;
    const meta = personaImageFor(r.primary, r.secondary);
    const img = new Image();
    // the reading opens on the wide scene when the persona has one
    img.src = meta.wide ?? meta.src;
    img.decode?.().catch(() => { /* decode failure only costs the head start */ });
  };

  // TheDepths fires this at full black — the reading mounts black-on-black, so
  // the cut is invisible and the arrival kindles straight out of the breath's
  // own dark.
  const finishDepths = () => {
    // For testing: lock output to approved cocktail "Down the Line" (The Visionary)
    const r = VISIONARY_SAMPLE;
    setResult(r);
    setReadingIntro(true);
    setReadingTake((n) => n + 1);
    setPhase('reading');
  };

  // Dev-only: the reveal's quick-nav sends the journey back to any hold —
  // TheDepths remounts and lands straight on the target (initialJump).
  const [devJump, setDevJump] = useState<DevJumpTarget | null>(null);
  const devNavigate = (target: DevJumpTarget) => {
    setDevJump(target);
    setPhase('depths');
  };

  // Dev-only: H10.5 (the alternate hero→scroll keepsake) plays with a from-black
  // "fades in with clouds" intro when arrived via H9.5.
  const [readingIntro, setReadingIntro] = useState(false);

  // Dev-only: H10 opens the cocktail page (the owner's keepsake), H11 the same
  // keepsake as the invited friend sees it. A result is distilled on the spot
  // when the journey hasn't produced one yet.
  const devPage = (page: DevPage) => {
    // H9.5 / H10.5 — the alternate keepsake, always shown with the approved
    // Visionary pour ("Down the Line") so it reads as designed.
    if (page === 'reading' || page === 'reading-in') {
      setResult(VISIONARY_SAMPLE);
      setReadingIntro(page === 'reading-in');
      setReadingTake((n) => n + 1);
      setPhase('reading');
      return;
    }
    // H11 · the friend's arrival, always shown with the Visionary sample so the
    // reading room renders with its designed 4:3 scene and calibrated tag coords.
    setResult(VISIONARY_SAMPLE);
    setGiftAnswers({ ...DEFAULT_ANSWERS, name: answers.name.trim() || 'Celeste', color: answers.color });
    setPhase('gift');
  };

  // The way back out. It used to be a hard cut straight to the Entrance —
  // the one transition in the experience that wasn't a transition. Now it
  // wears the same veil as the way in, sinking before the Entrance surfaces.
  const goHome = () => {
    setLeaving(false);
    setDescending('in');
    window.setTimeout(() => {
      // clear a share hash or an unknown pathname so the entrance owns a clean '/'
      if (window.location.hash || window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/');
      }
      setGiftAnswers(null);
      setResult(null);
      setPhase('landing');
      setDescending('out');
      window.setTimeout(() => setDescending(null), 900);
    }, 1150);
  };

  return (
    <div className="min-h-screen bg-[#0d0b09]">

      <nav className="site-nav print:hidden">
        <button
          type="button"
          onClick={goHome}
          className="nav-mark flex items-center gap-2 pointer-events-auto cursor-pointer group hover:opacity-80 transition-opacity focus:outline-none focus-visible:outline-2 focus-visible:outline-[#e8702a] focus-visible:outline-offset-4 focus-visible:rounded-full"
          aria-label="Return to Dionysus homepage"
        >
          {/* the glyph's own drawing starts ~3px inside its 24px box; pulling it
              back by that much puts the stroke itself on the gutter line */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" style={{ color: '#f5ead8', marginLeft: '-3px' }}>
            {/* Concept 05: The Zen Coupe */}
            <path d="M 7.2 20.4 C 8.4 20.4 11.28 19.68 11.28 16.8 L 11.28 13.44 C 7.2 13.44 2.88 11.52 2.88 7.2 C 2.88 6.48 3.36 6 4.32 6 L 19.68 6 C 20.64 6 21.12 6.48 21.12 7.2 C 21.12 11.52 16.8 13.44 12.72 13.44 L 12.72 16.8 C 12.72 19.68 15.6 20.4 16.8 20.4" />
            <circle cx="12" cy="9.6" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          <span className="nav-word">Dionysus</span>
        </button>
      </nav>

      {phase === 'landing' && (
        <section className="relative w-full overflow-hidden h-screen bg-[#0d0b09]" style={{ height: '100dvh' }}>
          <div
            className={`absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom ${leaving ? 'hero-descend' : ''}`}
            style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
          />

          <RevealLayer image={BG_IMAGE_2} layerRef={revealRef} />

          <div className="landing-fade" aria-hidden="true" />
          <div className={`landing-copy ${leaving ? 'hero-exit' : ''}`}>
            <h1 className="landing-title">
              <span className="landing-kicker hero-anim hero-reveal" style={{ animationDelay: '0.25s' }}>Discover your</span>
              <span className="landing-name hero-anim hero-reveal" style={{ animationDelay: '0.42s' }}>Cocktail<br />Within</span>
            </h1>
            <p className="landing-lede hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
              There’s a cocktail out there that resonates with who you are, the one
              that represents your innermost self. Through a series of short
              questions, we distill your essence into a cocktail made for you alone.
            </p>
          </div>
          {/* The door sits bottom-right on purpose: the pointer has to cross the
              frame to reach it, and on the way it uncovers the cocktail hidden
              in the image (the reveal spotlight follows the pointer). */}
          <div className={`landing-go hero-anim hero-fade ${leaving ? 'hero-exit' : ''}`} style={{ animationDelay: '0.9s' }}>
            <p className="landing-note">About five minutes. You leave with the recipe and a reading of why it’s yours.</p>
            <CtaButton onClick={beginJourney}>Discover my cocktail</CtaButton>
          </div>
        </section>
      )}

      {phase === 'depths' && (
        <TheDepths
          answers={answers}
          onUpdate={updateAnswers}
          onPrepare={prepareReveal}
          onComplete={finishDepths}
          initialJump={import.meta.env.DEV ? devJump ?? undefined : undefined}
          onDevPage={import.meta.env.DEV ? devPage : undefined}
        />
      )}

      {/* H10 · the reading. The journey's destination: the cocktail's own room,
          arriving out of the breath's dark. `key` remounts it when the arrival
          is re-triggered, so the choreography replays from the top. */}
      {phase === 'reading' && result && (
        <TheReading
          key={`${readingIntro ? 'in' : 'settled'}-${readingTake}`}
          result={result}
          seed={answers.color}
          name={answers.name.trim()}
          intro={readingIntro}
          onPourAgain={goHome}
          onDevJump={import.meta.env.DEV ? devNavigate : undefined}
          onDevPage={import.meta.env.DEV ? devPage : undefined}
        />
      )}

      {/* H11 · the friend's arrival. The same room, but the light in it is hers:
          it opens on the sharer's name alone in the dark, inks that name onto
          the tag in her seed colour (master spec §2), and hands the guest the
          recipe without the reading. While the pour decodes, giftAnswers is null
          and the frame stays black, so the gift unveils out of that same dark. */}
      {phase === 'gift' && result && giftAnswers && (
        <TheReading
          key={`gift-${readingTake}`}
          result={result}
          seed={giftAnswers.color}
          name={giftAnswers.name.trim()}
          intro
          gift
          onMeetYourOwn={beginOwnJourney}
          onDevJump={import.meta.env.DEV ? devNavigate : undefined}
          onDevPage={import.meta.env.DEV ? devPage : undefined}
        />
      )}

      {/* the poetic 404 · a glass that was never poured (master spec §4) */}
      {phase === 'notfound' && <NotFound onHome={goHome} />}

      {/* the velvet rope · the degrade state, never a dead end (master spec §3) */}
      {roped && <VelvetRope onAnyway={crossAnyway} />}

      {descending && (
        <div
          className={`descent-veil fixed inset-0 z-[80] pointer-events-none${descending === 'out' ? ' descent-veil-out' : ''}`}
        />
      )}
      <Analytics />
    </div>
  );
}

export default App;
