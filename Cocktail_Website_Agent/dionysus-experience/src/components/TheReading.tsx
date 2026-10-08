// H9.5 / H10.5 · The Reading — an alternate keepsake direction (dev-nav preview).
//
// "The reading room." The cocktail is not a picture on a page: it is the room
// you are seated in. A full-bleed 16:9 scene (personas.wide), candlelit, with
// smoke crossing the frame. The reading is inked into that room's left margin,
// so the drink never leaves you.
//
// Sacred Glass Rule: the scrim only darkens, never colours. The image is never
// tinted — which is also why the drifting coloured "smoke" bands that used to
// cross the room were removed (2026-09-29).
//
// H9.5 (intro) plays the arrival: black → the weather gathers → the cocktail
// kindles out of the dark → the text writes itself in. H10.5 is the settled
// state. Nothing here touches the locked TheSurfacing reveal; styles are .tr-.
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { DevNav, type DevJumpTarget, type DevPage } from './TheDepths';
import { SEEDS } from '../../shared/answers';
import type { Reading } from '../../shared/reading';
import CtaButton from './CtaButton';
import { pourLinkFor } from '../engine/pourLink';
import { inlineTokens } from '../engine/inline';

// The house amber, for a journey that never chose a seed colour.
const DEFAULT_SEED_HEX = '#e8702a';

// The authored copy's inline emphasis, rendered from engine/inline's tokens.
function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineTokens(text).map((token, i) =>
        token.kind === 'break' ? <br key={i} />
          : token.kind === 'strong' ? <strong key={i}>{token.text}</strong>
          : token.kind === 'em' ? <em key={i}>{token.text}</em>
          : <Fragment key={i}>{token.text}</Fragment>,
      )}
    </>
  );
}

export default function TheReading({
  reading,
  intro = false,
  gift = false,
  onMeetYourOwn,
  onPourAgain,
  onDevJump,
  onDevPage,
}: {
  /** the assembled reading: the authored pour, her name (inked into the
   *  scene's own paper tag) and her seed (used only as light, never on the image) */
  reading: Reading;
  /** play the from-black arrival */
  intro?: boolean;
  /** H11: this pour arrived through a shared link. The viewer is the friend,
   *  not the soul it was poured for: the recipe is theirs, the reading is not. */
  gift?: boolean;
  /** the gift's one door: begin the viewer's own journey */
  onMeetYourOwn?: () => void;
  /** the owner's coda: back to the Entrance, for another night */
  onPourAgain?: () => void;
  onDevJump?: (target: DevJumpTarget) => void;
  onDevPage?: (page: DevPage) => void;
}) {
  // The document owns the viewport scrollbar. Scope the reading-room chrome to
  // this route and restore the paper world's native surface when it unmounts.
  useEffect(() => {
    document.documentElement.classList.add('reading-room');
    return () => document.documentElement.classList.remove('reading-room');
  }, []);

  const { cocktail, persona: meta, name } = reading;
  const seed = SEEDS.find((option) => option.id === reading.seed)?.hex ?? DEFAULT_SEED_HEX;
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  // Portrait phones use the 3:4 master; landscape phones, tablets and desktops
  // use the 16:9 room. The tag transform and glow follow the selected master.
  const [portraitScene, setPortraitScene] = useState(() =>
    window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px) and (orientation: portrait)');
    const sync = () => setPortraitScene(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const usesWideScene = Boolean(meta.wide) && !portraitScene;
  const sceneSrc = usesWideScene ? meta.wide! : meta.src;
  const tagBox = usesWideScene ? (meta.wideTag ?? meta.tag) : meta.tag;
  const sceneGlass = usesWideScene ? (meta.wideGlass ?? meta.glass) : meta.glass;
  // dev previews arrive without a journey behind them, so the tag would have
  // nothing to ink; ?name= overrides, matching the locked reveal's convention
  const devName = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('name') ?? 'Celeste'
    : '';
  const inkName = name || devName;
  // true once the name should be visible: immediately for settled, after the
  // arrival delay for intro (clip-path inside will-change+mask breaks pure CSS)
  const [named, setNamed] = useState(!intro);

  // Until every persona has a 16:9 companion, a portrait master still has to fill
  // a landscape frame. Cover it, but hold the crop on the drink (the glass point
  // we already record) so the cocktail is never the part that gets cut away.
  const bgPosX = usesWideScene ? 0.5 : sceneGlass.x;
  const bgPosYPreferred = usesWideScene ? 0.46 : sceneGlass.y;

  // The 16:9 screen master fills the viewport. Its production safe area keeps
  // the drink and tag intact when `cover` trims a little horizontal image on a
  // 16:10 laptop or a little vertical image on an ultrawide monitor.

  // The printed keepsake is exactly two sheets: the recipe, then the letter.
  // Readings vary in length, so the letter absorbs that itself rather than
  // pushing onto a third page.
  //
  // Column height goes as the SQUARE of type size (narrower measure means more
  // lines AND taller lines), so the scale needed is the square root of the
  // ratio. PAGE_CHARS is the character count that fills one printed page in two
  // columns at full size — measured against the real layout, not guessed: 3008
  // characters fit at 1.0 and 3906 did not fit at 0.933, which puts the true
  // capacity in [3008, 3400); 2900 takes the low end plus margin for the part
  // of a line each paragraph break wastes.
  //
  // Two columns, never three: capacity is the SUM of the column widths times the
  // page height, and that sum is fixed by the page — a third column subtracts
  // another 10mm gap from it, so it holds slightly LESS, not half as much again.
  // (Measured: three columns failed at 6733 characters where the model said it
  // should pass.) The two columns are worth it only because one readable column
  // at 126mm wasted a third of the page width.
  //
  // So type size is the single lever. The 0.5 floor is 5pt — the smallest that
  // survives a home printer — which holds ~11,700 characters. The 19 authored
  // pours run 1,812–3,347 (median 2,722), so the floor sits about three and a
  // half times past the longest reading the studio has ever written.
  const PAGE_CHARS = 2900;
  const letterChars =
    reading.epigraph.length +
    reading.whoYouAre.join(' ').length +
    reading.yours.join(' ').length;
  const letterFit = Math.min(1, Math.max(0.5, Math.sqrt(PAGE_CHARS / Math.max(letterChars, 1))));

  // Scroll progress 0→1 across the first ~3/4 viewport: drives the plate's glide
  // to the right, the pool of night on the left, and the hero's fade. Transform
  // and opacity only, written to one custom property on the root.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    window.scrollTo(0, 0);
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.75)));
      el.style.setProperty('--p', p.toFixed(4));
      // the hero's actions fade with it; once they are ghosts they must stop
      // catching clicks meant for the reading scrolling beneath them
      el.classList.toggle('tr-scrolled', p > 0.4);
      // --rp: how far through the letter she is (0 at its first line, 1 at its
      // last). The margin spine fills with her seed colour from this, which is
      // the only thing that makes four screens of prose feel navigable — and it
      // stays inside the Seed Colour Rule, since it is light in the margin.
      const letter = letterRef.current;
      if (letter) {
        const r = letter.getBoundingClientRect();
        const travel = r.height - vh * 0.5;
        const rp = travel > 0
          ? Math.min(1, Math.max(0, (vh * 0.5 - r.top) / travel))
          : (r.top < vh * 0.5 ? 1 : 0);
        el.style.setProperty('--rp', rp.toFixed(4));
      }
    };
    // --fit: the scale at which the WHOLE scene is visible during the arrival.
    // This used to fall back to a 4:3 guess before the image had decoded, which
    // wrote a wrong --fit on the first frame and then corrected it once `load`
    // fired — a step from 0.8333 to 0.9 at 1440×900. Now it simply declines to
    // answer until it can measure, and the CSS default (1, un-zoomed) holds.
    const fit = () => {
      const img = bgRef.current;
      const iw = img?.naturalWidth ?? 0;
      const ih = img?.naturalHeight ?? 0;
      if (!iw || !ih) return;
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const cover = Math.max(vw / iw, vh / ih);
      const contain = Math.min(vw / iw, vh / ih);
      el.style.setProperty('--fit', (contain / cover).toFixed(4));
    };

    // Lay her name onto the scene's own tag. object-fit: cover crops the image,
    // so the tag's fractional coords have to be mapped through the painted rect
    // (the same mapping the locked reveal does) or the ink drifts off the paper.
    const inkTag = () => {
      const img = bgRef.current;
      const frame = frameRef.current;
      const el = tagRef.current;
      if (!img || !frame) return;
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;
      const cw = frame.clientWidth;
      const ch = frame.clientHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const pw = iw * scale;
      const ph = ih * scale;
      // The cover crop always eats part of the scene, and the paper tag lives
      // near an edge: wide frames cut the bottom away, tall ones (a phone
      // holding a portrait master) cut the side away. Shift the crop on each
      // axis only as far as it takes to keep the ink on screen, otherwise hold
      // the framing we actually want. Without this her name silently vanishes.
      const keepInFrame = (
        preferred: number,
        visible: number,
        centre: number,
        half: number,
      ) => {
        if (visible >= 1) return preferred;
        const lo = (centre + half - visible) / (1 - visible); // don't crop past its far edge
        const hi = (centre - half) / (1 - visible);           // don't crop past its near edge
        if (lo > hi) return Math.min(1, Math.max(0, (centre - visible / 2) / (1 - visible)));
        return Math.min(1, Math.max(0, Math.min(Math.max(preferred, lo), hi)));
      };

      const visibleY = Math.min(1, ch / ph);
      const visibleX = Math.min(1, cw / pw);
      let ox = bgPosX;
      let oy = bgPosYPreferred;
      if (tagBox) {
        // the ink sits centred on the tag, so clear half its own extent plus paper
        oy = keepInFrame(oy, visibleY, tagBox.cy, 0.085);
        ox = keepInFrame(ox, visibleX, tagBox.cx, tagBox.w / 2 + 0.02);
      }
      img.style.objectPosition = `${(ox * 100).toFixed(1)}% ${(oy * 100).toFixed(1)}%`;
      if (!el || !tagBox) return;

      const left = (cw - pw) * ox;
      const top = (ch - ph) * oy;
      const w = tagBox.w * pw;
      el.style.left = `${left + tagBox.cx * pw}px`;
      el.style.top = `${top + tagBox.cy * ph}px`;
      el.style.width = `${w}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${tagBox.angle}deg)`;
      // fit the name to the writable width, whatever its length
      el.style.fontSize = `${Math.max(Math.min(w * 0.26, (w * 1.5) / Math.max(inkName.length, 1)), 10)}px`;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onResize = () => { onScroll(); fit(); inkTag(); };
    apply();
    fit();
    inkTag();
    // the image may not have decoded when we first measure
    const bgEl = bgRef.current;
    const onLoad = () => { fit(); inkTag(); };
    bgEl?.addEventListener('load', onLoad);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      bgEl?.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [bgPosX, bgPosYPreferred, inkName, tagBox]);

  // Trigger the ink as the room is still kindling — BEFORE the title rises
  // (.tr-intro .tr-hero-inner holds at 3.7 s). The name is the one personal
  // thing in the frame, so it should be the first thing to resolve and the
  // title should read as its caption: she used to watch the cocktail arrive,
  // then be named, then wait while her own name was written last (2026-09-18
  // review). Still Water stops the animation but the clock has to shorten
  // with it — master spec's twin is ~2.7 s.
  useEffect(() => {
    if (!intro) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? (gift ? 2700 : 1400) : 2400 + (gift ? 2900 : 0);
    const t = window.setTimeout(() => setNamed(true), delay);
    return () => clearTimeout(t);
  }, [intro, gift]);

  const [shareNote, setShareNote] = useState<string | null>(null);

  const shareKeepsake = async () => {
    const text = `Dionysus read me and poured “${cocktail.name}”. Meet the spirit within:`;
    // the link carries who and which pour, never the reading (AD-10)
    const url = await pourLinkFor({ pairing: reading.pairing, name: inkName, seed: reading.seed });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Dionysus', text, url });
      } catch {
        /* she closed the sheet */
      }
      return;
    }
    const payload = `${text} ${url}`;
    let copied: boolean;
    try {
      await navigator.clipboard.writeText(payload);
      copied = true;
    } catch {
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
    // never a raw error (master spec §2) — the failure stays in the world
    setShareNote(copied ? 'Link copied' : 'The ink would not take — try once more');
    setTimeout(() => setShareNote(null), 2200);
  };

  return (
    <div
      ref={rootRef}
      className={`tr-root${intro ? ' tr-intro' : ''}${gift ? ' tr-gift' : ''}`}
      style={{
        '--c': seed,
        '--letter-fit': letterFit.toFixed(3),
        '--glass-x': `${(sceneGlass.x * 100).toFixed(2)}%`,
        '--glass-y': `${(sceneGlass.y * 100).toFixed(2)}%`,
      } as CSSProperties}
    >
      {/* H11: the cocktail title surfaces from the dark; its dedication follows */}
      {gift && intro && (
        <div className="tr-greet" role="status">
          <strong className="tr-greet-name">{cocktail.name}</strong>
          <span className="tr-greet-rule" aria-hidden="true" />
          <p className="tr-greet-line">
            {inkName
              ? <>a cocktail made for {inkName}, poured by Dionysus.</>
              : <>a cocktail, poured by Dionysus.</>}
          </p>
        </div>
      )}
      {/* the room: the cocktail IS the background, never a plate on a page */}
      <div className="tr-stage" aria-hidden="true">
        <div className="tr-bg">
          <div ref={frameRef} className="tr-frame">
            <img ref={bgRef} src={sceneSrc} alt="" draggable={false} />
            {inkName && tagBox ? (
              <span
                ref={tagRef}
                className={`tr-tagname${named ? (intro ? ' tr-inking' : ' tr-inked') : ''}`}
              >{inkName}</span>
            ) : null}
          </div>
        </div>

        {/* the candles breathe over the glass */}
        <div className="tr-candle" />

        {/* darkness makes the light pop */}
        <div className="tr-vig" />
        {/* the lamps go down on the reading side only */}
        <div className="tr-scrim" />
      </div>

      {/* ---- the poster hero ---- */}
      <main>
      {/* The printed keepsake's plate. The room itself is a fixed full-bleed
          background that print has to hide, so without this the saved PDF
          opened on a title and no cocktail at all (2026-09-18 review). The
          portrait master is the one that prints — it is the whole scene, not
          the landscape crop — and the dedication is set as type here because
          the inked tag belongs to the hidden scene above. */}
      <figure className="tr-print-plate">
        <img src={meta.src} alt={`${cocktail.name}, poured by Dionysus`} />
        {inkName ? <figcaption className="tr-print-for">Poured for {inkName}</figcaption> : null}
      </figure>
      {/* Portrait phones let the named photograph arrive alone, then reveal
          the copy beneath it. This link is outside the aria-hidden scene. */}
      <a className="tr-cue tr-scene-cue" href="#tr-title">
        Your cocktail
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
      {/* On desktop this clears the fixed poster; on portrait phones it
          reserves the full-bleed photograph before the in-flow caption. */}
      <div className="tr-spacer" aria-hidden="true" />
      <header className="tr-hero">
        <div className="tr-hero-inner">
          {/* nbsp binds the separator to the name so it never orphans onto line 2 */}
          {/* the archetype, not the engine's pairing key: "SAGE × LOVER" is
              how the result is computed, not anything the reader asked for */}
          <p className="tr-kicker">
            {reading.archetype.name}
            {/* print carries the dedication under the plate instead, so it is
                not said twice on one page */}
            {inkName ? <span className="tr-kicker-for">{'\u00A0·'} poured for {inkName}</span> : null}
          </p>
          <h1 className="tr-title" id="tr-title">{cocktail.name}</h1>
          <p className="tr-for">{cocktail.tagline}</p>
          {/* Share and save live only at the bottom (Robin, 2026-10-06): the
              arrival belongs to the cocktail, the actions to the end. */}
          <a className="tr-cue" href="#tr-reading">
            {gift ? 'The recipe' : 'Your recipe and reading'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </header>

      {/* ---- the reading, on the left, the cocktail still in frame ----
           Two movements, because there are two kinds of content here and they
           were previously typeset identically. THE CARD is the artifact: what
           is in the glass and how it is built — dense, tabular, brass, read at
           a glance, side by side on a wide screen. THE LETTER is the reading:
           prose in the fortune teller's voice, one measure, its own rhythm and
           its own spine. Neither is a panel; the card sits on a pool of night
           (the system's way of raising contrast) and nothing here is a box. */}
      <section className="tr-reading" id="tr-reading">
        <div className="tr-card">
          <div className="tr-card-pool" aria-hidden="true" />
          <div className="tr-card-cols">
            <div className="tr-section">
              <p className="tr-label">The Pour</p>
              {cocktail.recipeIntro || cocktail.serves ? (
                <p className="tr-pour-note">
                  {cocktail.serves ? <Inline text={cocktail.serves} /> : null}
                  {cocktail.serves && cocktail.recipeIntro ? ' · ' : null}
                  {cocktail.recipeIntro ? <Inline text={cocktail.recipeIntro} /> : null}
                </p>
              ) : null}
              {/* the measure's own heading only when it says more than "amount" */}
              {cocktail.amountHeader !== 'amount' ? (
                <p className="tr-amount-head">{cocktail.amountHeader}</p>
              ) : null}
              <ul className="tr-ing">
                {cocktail.recipe.map((line, i) => (
                  <li key={i}>
                    <span className="tr-amount"><Inline text={line.amount} /></span>
                    <span className="tr-item">
                      <Inline text={line.item} />
                      {line.note ? <em> · <Inline text={line.note} /></em> : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="tr-glass"><span className="tr-glass-label">Glass</span> <Inline text={cocktail.glassware} /></p>
              {cocktail.preparations.map((prep, i) => (
                <div className="tr-prep" key={i}>
                  <p className="tr-prep-title"><Inline text={prep.title} /></p>
                  <p className="tr-prep-text"><Inline text={prep.text} /></p>
                </div>
              ))}
            </div>

            <div className="tr-section">
              <p className="tr-label">The Ritual</p>
              <ol className="tr-ritual">
                {cocktail.method.map((step, i) => (
                  <li key={i}><Inline text={step} /></li>
                ))}
              </ol>
              {/* the pour's own last words end the ritual (AD-5) */}
              <p className="tr-ritual-close"><Inline text={cocktail.closingLine} /></p>
            </div>
          </div>
        </div>

        <div className="tr-section tr-why" ref={letterRef}>
          {gift ? (
            <>
              <p className="tr-label">The Reading</p>
              {/* the guest is told what they are not being shown; the absence is
                  the point, and it is the reason the door below exists */}
              <p className="tr-private">
                Dionysus read {inkName || 'her'} before pouring this. That reading
                stayed with {inkName || 'her'}. <em>Yours is still unpoured.</em>
              </p>
            </>
          ) : (
            <>
              {/* the spine: her colour rising through the margin as she reads */}
              <div className="tr-spine" aria-hidden="true"><span /></div>
              <p className="tr-label">The Reading</p>
              {/* the letter opens on the epigraph (Robin, 2026-10-08: no
                  archetype essence line; the name stays in the kicker), then
                  who she is, then the passage about her cocktail */}
              <p className="tr-epigraph"><Inline text={reading.epigraph} /></p>
              {reading.whoYouAre.map((paragraph, i) => (
                <p key={`who-${i}`}><Inline text={paragraph} /></p>
              ))}
              {reading.yours.map((paragraph, i) => (
                <p key={`yours-${i}`}><Inline text={paragraph} /></p>
              ))}
            </>
          )}
          {/* the guest keeps the recipe (master spec §2) but the page has one
              real destination, so the door out is the only loud thing here */}
          <div className="tr-actions">
            {gift ? (
              <CtaButton onClick={onMeetYourOwn}>
                Discover the spirit within you
              </CtaButton>
            ) : (
              <>
                {/* The page's two jobs, as equals (Robin, 2026-09-29): share is
                    what brings the next guest, save is her keepsake. Share was
                    a 0.78rem underline beside the pill; it now leads, with her
                    colour on its rim. Starting again stays the quiet one. */}
                <CtaButton icon="share" onClick={shareKeepsake}>{shareNote ?? 'Share your cocktail'}</CtaButton>
                <CtaButton icon="save" onClick={() => window.print()}>Save the recipe</CtaButton>
                {onPourAgain && (
                  <button type="button" className="tr-quiet" onClick={onPourAgain}>
                    Start again
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      </main>

      {import.meta.env.DEV && onDevJump && <DevNav onJump={onDevJump} onPage={onDevPage} />}
    </div>
  );
}
