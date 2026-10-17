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
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { DevNav, type DevJumpTarget, type DevPage } from './TheDepths';
import { SEEDS } from '../../shared/answers';
import type { Reading } from '../../shared/reading';
import CtaButton from './CtaButton';
import { keepLinkFor, pourLinkFor } from '../engine/pourLink';
import { keptFromLocation, pourFromLocation } from '../engine/pourHash';
import { isRememberedPour, rememberPour } from '../engine/kept';
import { inlineTokens } from '../engine/inline';
import { qrPath } from '../engine/qr';
import { addressName, displayName } from '../../shared/name';
// Each story's dateline (designer review, 2026-10-17: guests didn't know the
// story was true). Written from each pour's dossier; keyed by pairing.
import storyLinesData from '../../shared/data/story-lines.json';
// `image` is the archival-image trial (one pour first, Robin 2026-10-17): a
// public-domain photograph of the record itself, never generated, set after
// story paragraph `after`. Provenance in design-artifacts/…/archival-trial-2026-10-17.
type StoryImage = { src: string; srcSmall: string; width: number; height: number; alt: string; caption: string; credit: string; after: number };
type StoryLine = { dateline: string; trueStory: boolean; image?: StoryImage };
const STORY_LINES = storyLinesData as Record<string, StoryLine>;

// The letter's four movements (Robin chose this layout, 2026-10-12), in the
// order the studio writes every letter: who you are; the story, its reveal and
// why it is you; the drink as proof; a proposal. Each opens on one line said
// aloud, so she always knows where she is in the reading.
type Movement = 'who' | 'story' | 'cocktail' | 'proposal';

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
  const heroRef = useRef<HTMLElement>(null);
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
  // Every surface inks the cleaned name, or none (2.1): the full one on the
  // tag, card, PDF and links; the first one in sentences. The gift path's
  // name comes from a link another device wrote, so it is cleaned here too.
  const inkName = displayName(name || devName) ?? '';
  const address = addressName(name || devName);
  // The tag carries the first name only (playtest, 2026-10-17): a full name
  // shrank to fit the paper until nobody could read that it was theirs.
  const tagName = address ?? inkName;
  // A #pour= link can bring the owner back rather than a friend: their keep
  // link, or their own share link opened on the device that poured it (user
  // test, 2026-10-12: people shared the cocktail to themselves and lost the
  // reading). Either way the room hands back the whole reading. Only a link
  // can bring them back: the dev H11 preview has none and stays the friend's.
  const [owned] = useState(() =>
    gift && pourFromLocation() !== null
    && (keptFromLocation() || isRememberedPour({ pairing: reading.pairing, name: inkName, seed: reading.seed })),
  );
  const guest = gift && !owned;
  useEffect(() => {
    if (!guest) rememberPour({ pairing: reading.pairing, name: inkName, seed: reading.seed });
  }, [guest, reading.pairing, reading.seed, inkName]);
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

  // Portrait phones: the photograph gives up exactly the height its caption
  // needs, so the name, its three words and the line about her are on the
  // first screen (Robin, phone test 2026-10-13: before, the photograph filled
  // the screen and the title waited a scroll below). The CSS clamps the scene
  // to a floor, so a very long caption pushes the cue, not the glass, away.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero || !portraitScene) return;
    const measure = () => root.style.setProperty('--hero-h', `${Math.ceil(hero.offsetHeight)}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    return () => { ro.disconnect(); root.style.removeProperty('--hero-h'); };
  }, [portraitScene]);

  // The reading opens at its top, once. Not in the effect below: that one re-runs
  // whenever the scene swaps between its wide and portrait crops, and printing
  // swaps it (an A4 sheet matches the portrait query), so "The recipe as a PDF"
  // used to drop her back at the top on closing the print dialog. Turning a
  // tablet or resizing past 900px did the same.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll progress 0→1 across the first ~3/4 viewport: drives the plate's glide
  // to the right, the pool of night on the left, and the hero's fade. Transform
  // and opacity only, written to one custom property on the root.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.75)));
      el.style.setProperty('--p', p.toFixed(4));
      // the hero's actions fade with it; once they are ghosts they must stop
      // catching clicks meant for the reading scrolling beneath them
      el.classList.toggle('tr-scrolled', p > 0.4);
      // the letter's movements: each one's mark on the spine lights once begun
      el.querySelectorAll<HTMLElement>('.tr-part').forEach((part) => {
        part.classList.toggle('tr-part-on', part.getBoundingClientRect().top < vh * 0.55);
      });
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
      const vw = frameRef.current?.clientWidth || window.innerWidth || 1;
      const vh = frameRef.current?.clientHeight || window.innerHeight || 1;
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
      // fit the name to the writable width, whatever its length. The floor is
      // 7px, not 10: a phone's scene is shorter than the screen now, so a small
      // tag (the coupe's is ~40px wide) cut "Bartholomew" at "Bartholom".
      el.style.fontSize = `${Math.max(Math.min(w * 0.26, (w * 1.5) / Math.max(tagName.length, 1)), 7)}px`;
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
    // the phone scene's height follows its caption, not the window
    const frameRo = new ResizeObserver(() => { fit(); inkTag(); });
    if (frameRef.current) frameRo.observe(frameRef.current);
    return () => {
      frameRo.disconnect();
      bgEl?.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [bgPosX, bgPosYPreferred, tagName, tagBox]);

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

  const copyText = async (payload: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(payload);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = payload;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let copied: boolean;
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      ta.remove();
      return copied;
    }
  };

  // The page's two pills each unfold their ways in place (user test,
  // 2026-10-12), one row open at a time.
  // · Share: the link, or the card. Both carry the gift link, which opens on
  //   the recipe and keeps the reading private (AD-10).
  // · Keep: a link for themselves (the keep link, which opens the whole
  //   reading again), a card for their photos whose QR code is that same
  //   link, or the PDF, the printed keepsake it always was.
  type Way = 'share' | 'keep';
  const [open, setOpen] = useState<Way | null>(null);
  const [note, setNote] = useState<{ way: Way; text: string } | null>(null);
  const links = useRef<Partial<Record<Way, Promise<string>>>>({});
  const cards = useRef<Partial<Record<Way, Promise<Blob>>>>({});
  const noteFor = (way: Way, text: string) => {
    const next = { way, text };
    setNote(next);
    window.setTimeout(() => setNote((n) => (n === next ? null : n)), 2800);
  };
  const linkFor = (way: Way) => {
    const payload = { pairing: reading.pairing, name: inkName, seed: reading.seed };
    return (links.current[way] ??= way === 'keep' ? keepLinkFor(payload) : pourLinkFor(payload));
  };
  const cardFor = (way: Way) =>
    (cards.current[way] ??= linkFor(way).then((url) =>
      import('../engine/card').then(({ renderCard }) => renderCard({ ...reading, name: inkName }, seed, url, way)),
    ));
  // opening warms the link and the card, so the share sheet still opens inside
  // the tap that asked for it (Safari drops a share that waits too long)
  const toggle = (way: Way) => {
    setOpen((o) => (o === way ? null : way));
    void linkFor(way);
    cardFor(way).catch(() => { delete cards.current[way]; });
  };

  // The cue glides down rather than jumping (playtest, 2026-10-17: the jump
  // dropped "This is you" under the top edge, so the reading seemed to start
  // at the story). It stops with the first heading level with the glass on a
  // wide screen, just under the bar on a phone, and leaves the address alone:
  // the hash used to overwrite a #pour= keep link.
  const goToReading = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById('tr-reading');
    if (!section) return;
    e.preventDefault();
    const target = section.querySelector<HTMLElement>('.tr-opener') ?? section;
    const vh = window.innerHeight || 1;
    const offset = portraitScene ? Math.min(120, vh * 0.14) : vh * 0.3;
    const to = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
    const from = window.scrollY;
    const focus = () => {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(to - from) < 4) {
      window.scrollTo(0, to);
      focus();
      return;
    }
    const duration = Math.min(1700, Math.max(900, Math.abs(to - from) * 1.25));
    const start = performance.now();
    let frame = 0;
    // a hand on the wheel or the glass takes over at once
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      window.scrollTo(0, from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
      else { stop(); focus(); }
    };
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    frame = requestAnimationFrame(step);
  };

  // the three words tell a friend what kind of drink it is before they tap
  const shareText = `Dionysus read me and poured “${cocktail.name}”: ${cocktail.words.join(', ').toLowerCase()}. Meet the spirit within:`;

  const sendLink = async (way: Way) => {
    const url = await linkFor(way);
    if (navigator.share) {
      // a friend gets the invitation; her own copy is the bare link, so
      // "Copy" in the sheet hands back something she can paste and open
      try {
        await navigator.share(way === 'share'
          ? { title: 'Dionysus', text: shareText, url }
          : { title: `Dionysus · ${cocktail.name}`, url });
      } catch {
        /* she closed the sheet */
      }
      return;
    }
    // a friend gets the invitation with the link; their own copy is just the link
    const copied = await copyText(way === 'share' ? `${shareText} ${url}` : url);
    // never a raw error (master spec §2) — the failure stays in the world
    noteFor(way, !copied ? 'The ink would not take — try once more'
      : way === 'share' ? 'Link copied' : 'Link copied. It opens your whole reading.');
  };

  // when no share sheet will take the picture (an in-app browser, an older
  // phone, a refused share), the card itself appears under its row: pressing
  // and holding an image is the one way to send or save it that works everywhere
  const [shownCard, setShownCard] = useState<{ way: Way; src: string } | null>(null);
  const showCard = (way: Way, blob: Blob) => {
    const reader = new FileReader();
    reader.onload = () => setShownCard({ way, src: String(reader.result) });
    reader.readAsDataURL(blob);
  };

  const sendCard = async (way: Way) => {
    let blob: Blob;
    let url: string;
    try {
      [blob, url] = await Promise.all([cardFor(way), linkFor(way)]);
    } catch {
      delete cards.current[way];
      noteFor(way, 'The card would not print — try once more');
      return;
    }
    const slug = cocktail.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const file = new File([blob], `dionysus-${slug || 'cocktail'}.jpg`, { type: 'image/jpeg' });
    const phone = window.matchMedia('(pointer: coarse)').matches;
    // The card goes as the picture itself, through the share sheet (WhatsApp,
    // Messages, AirDrop…). A shared card carries the invitation and the link
    // as its caption, since a friend can't scan a code on their own screen; a
    // kept one goes alone, so "Save Image" stays on offer. A desktop keeping it
    // simply downloads it.
    if ((phone || way === 'share') && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share(way === 'share'
          ? { files: [file], text: `${shareText} ${url}` }
          : { files: [file], title: cocktail.name });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    if (phone) {
      showCard(way, blob);
      return;
    }
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = file.name;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 4000);
    noteFor(way, way === 'share' ? 'Card saved. Attach it to any message.' : 'Card saved');
  };

  // the printed keepsake carries the way back: the owner's PDF a QR code to
  // their keep link (the whole reading), a guest's to the gift it came from
  const [printQr, setPrintQr] = useState<{ size: number; d: string } | null>(null);
  useEffect(() => {
    let live = true;
    const payload = { pairing: reading.pairing, name: inkName, seed: reading.seed };
    (guest ? pourLinkFor(payload) : keepLinkFor(payload))
      .then(qrPath)
      .then((qr) => { if (live) setPrintQr(qr); })
      .catch(() => { /* the page prints without it */ });
    return () => { live = false; };
  }, [guest, inkName, reading.pairing, reading.seed]);

  // ---- the recipe, built once: the guest's page, the owner's story, print ----
  const recipeCard = (
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
  );

  // ---- the letter's movements ----
  const yoursCount = reading.yours.length;
  const proposalAt = yoursCount - 1;
  const proofAt = yoursCount - 2;
  const storyAt = reading.yours.map((_, i) => i).slice(0, proofAt);
  const yoursParagraph = (i: number) => (
    <div className="tr-para" key={`yours-${i}`}>
      <p><Inline text={reading.yours[i]} /></p>
    </div>
  );
  const storyLine = STORY_LINES[reading.pairing];
  const storyImage = storyLine?.image;
  const storyFigure = storyImage && (
    <figure className="tr-archival" key="archival">
      <img
        src={storyImage.src}
        srcSet={`${storyImage.srcSmall} 900w, ${storyImage.src} ${storyImage.width}w`}
        sizes="(max-width: 640px) 100vw, 36rem"
        width={storyImage.width} height={storyImage.height}
        alt={storyImage.alt} loading="lazy" decoding="async"
      />
      <figcaption>
        <span>{storyImage.caption}</span>
        <span className="tr-archival-credit">{storyImage.credit}</span>
      </figcaption>
    </figure>
  );
  const storyParagraph = (i: number) => (
    <Fragment key={`story-${i}`}>
      {yoursParagraph(i)}
      {storyImage?.after === i && storyFigure}
    </Fragment>
  );
  const epigraphSentences = reading.epigraph.split(/(?<=[.!?…])\s+(?=[A-Z‘“"])/);
  // "This is you, the Visionary." — every personality title starts with "The"
  const personality = reading.archetype.name.replace(/^The /, 'the ');
  const opener: Record<Movement, ReactNode> = {
    who: address ? <>This is you, {address}: {personality}.</> : <>This is you, {personality}.</>,
    story: <>The inspiration for your cocktail.</>,
    // all italic, like the other three lines (Robin: a roman name read as a mistake)
    cocktail: <>The cocktail I’ve made for you: {cocktail.name}.</>,
    proposal: address ? <>Before you go, {address}.</> : <>Before you go.</>,
  };
  const movement = (id: Movement, children: ReactNode) => (
    <section className={`tr-part tr-part-${id}`} aria-labelledby={`tr-part-${id}`}>
      <h2 className="tr-opener" id={`tr-part-${id}`}>
        <span className="tr-opener-mark" aria-hidden="true" />
        {opener[id]}
      </h2>
      {children}
    </section>
  );

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
            {owned
              ? <>{address ? `welcome back, ${address}.` : 'welcome back.'} The cocktail Dionysus made for you.</>
              : address
                ? <>a cocktail made for {address}, poured by Dionysus.</>
                : <>a cocktail, poured by Dionysus.</>}
          </p>
        </div>
      )}
      {/* the room: the cocktail IS the background, never a plate on a page */}
      <div className="tr-stage" aria-hidden="true">
        <div className="tr-bg">
          <div ref={frameRef} className="tr-frame">
            <img ref={bgRef} src={sceneSrc} alt="" draggable={false} />
            {tagName && tagBox ? (
              <span
                ref={tagRef}
                className={`tr-tagname${named ? (intro ? ' tr-inking' : ' tr-inked') : ''}`}
              >{tagName}</span>
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
      {/* On desktop this clears the fixed poster; on portrait phones it
          reserves the photograph, sized to leave its caption on screen. */}
      <div className="tr-spacer" aria-hidden="true" />
      <header className="tr-hero" ref={heroRef}>
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
          {/* the glass in three words, where a menu puts them: under the drink's
              name, before the line about her. Every word leads with its point;
              the one that would open a line is trimmed at the margin (CSS).
              The commas are for screen readers. */}
          <p className="tr-words">
            <span className="tr-words-run">
              {cocktail.words.map((word, i) => (
                <span className="tr-word" key={i} style={{ '--w': i } as CSSProperties}>
                  <span className="tr-word-dot" aria-hidden="true">·</span>
                  {word}
                  {i < cocktail.words.length - 1 ? <span className="sr-only">,</span> : null}
                </span>
              ))}
            </span>
          </p>
          <p className="tr-for">{cocktail.tagline}</p>
          {/* print only: the paper's way back to the screen */}
          {printQr ? (
            <figure className="tr-print-qr" aria-hidden="true">
              <svg viewBox={`-3 -3 ${printQr.size + 6} ${printQr.size + 6}`} shapeRendering="crispEdges">
                <path d={printQr.d} />
              </svg>
              <figcaption>{guest ? 'Scan to find this cocktail again' : 'Scan to return to your reading'}</figcaption>
            </figure>
          ) : null}
          {/* Share and save live only at the bottom (Robin, 2026-10-06): the
              arrival belongs to the cocktail, the actions to the end. */}
          <a className="tr-cue" href="#tr-reading" onClick={goToReading}>
            {guest ? 'The recipe' : 'Your reading and recipe'}
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
        {/* A guest's page is the recipe. The owner's recipe now lives inside
            the letter, where the story arrives at the drink; this copy stays
            for print, where the recipe keeps page one (the Two Sheets Rule). */}
        <div className={guest ? undefined : 'tr-card-print'}>{recipeCard}</div>

        <div className="tr-section tr-why" ref={letterRef}>
          {guest ? (
            <>
              <p className="tr-label">The Reading</p>
              {/* the guest is told what they are not being shown; the absence is
                  the point, and it is the reason the door below exists */}
              <p className="tr-private">
                Dionysus read {address ?? 'them'} before pouring this. That reading
                stayed with {address ?? 'them'}. <em>Yours is still unpoured.</em>
              </p>
            </>
          ) : (
            <>
              {/* the spine: her colour rising through the margin as she reads */}
              <div className="tr-spine" aria-hidden="true"><span /></div>
              {/* print keeps the epigraph as the head of sheet two, on its own
                  (no "The Reading" label over it, Robin 2026-10-12); on screen it
                  opens the story it teases (Robin, 2026-10-12: at the top of the
                  reading it spoke about the cocktail where she expected herself) */}
              <p className="tr-epigraph tr-epigraph-print">
                {epigraphSentences.map((sentence, i) => (
                  <span className="tr-epigraph-line" key={i}><Inline text={sentence} /></span>
                ))}
              </p>

              {movement('who', <>
                {reading.whoYouAre.map((paragraph, i) => (
                  <p key={`who-${i}`}><Inline text={paragraph} /></p>
                ))}
              </>)}

              {movement('story', <>
                {storyLine && (
                  <p className="tr-dateline">
                    <span>{storyLine.dateline}</span>
                    {storyLine.trueStory && <span className="tr-dateline-true">A true story</span>}
                  </p>
                )}
                <p className="tr-epigraph tr-epigraph-lead">
                  {/* one line per sentence, so the aphorism turns at its own break */}
                  {epigraphSentences.map((sentence, i) => (
                    <span className="tr-epigraph-line" key={i}><Inline text={sentence} /></span>
                  ))}
                </p>
                {storyAt.map(storyParagraph)}
              </>)}

              {movement('cocktail', <>
                {yoursParagraph(proofAt)}
                {/* the drink as proof, then the drink itself */}
                <div className="tr-card-inline">{recipeCard}</div>
              </>)}

              {movement('proposal', <>
                {yoursParagraph(proposalAt)}
              </>)}
            </>
          )}
          {/* the guest keeps the recipe (master spec §2) but the page has one
              real destination, so the door out is the only loud thing here */}
          <div className="tr-actions">
            {guest ? (
              <CtaButton onClick={onMeetYourOwn}>
                Discover the spirit within you
              </CtaButton>
            ) : (
              <>
                {/* The page's two jobs, as equals (Robin, 2026-09-29): share is
                    what brings the next guest, keep is theirs. Share was
                    a 0.78rem underline beside the pill; it now leads, with her
                    colour on its rim. Starting again stays the quiet one. */}
                <CtaButton icon="share" onClick={() => toggle('share')} ariaExpanded={open === 'share'} ariaControls="tr-ways-share">
                  {/* a narrow row keeps both pills on one line as "Share" /
                      "Keep"; the rest stays for screen readers */}
                  Share<span className="tr-long"> your cocktail</span>
                </CtaButton>
                {/* each pill's ways unfold in place under the pills: quiet
                    underlines, never a menu or a modal */}
                <div id="tr-ways-share" className={`tr-keep${open === 'share' ? ' tr-keep-open' : ''}`} inert={open !== 'share'}>
                  <div className="tr-keep-inner">
                    <button type="button" className="tr-quiet" onClick={() => sendLink('share')}>Send the link</button>
                    <button type="button" className="tr-quiet" onClick={() => sendCard('share')}>Send the card</button>
                    <span className="tr-keep-note" role="status">{note?.way === 'share' ? note.text : null}</span>
                    {shownCard?.way === 'share' ? (
                      <figure className="tr-card-shown">
                        <img src={shownCard.src} alt={`The card for ${cocktail.name}`} />
                        <figcaption>Press and hold the card to send or save it.</figcaption>
                      </figure>
                    ) : null}
                  </div>
                </div>
                <CtaButton icon="save" onClick={() => toggle('keep')} ariaExpanded={open === 'keep'} ariaControls="tr-ways-keep">
                  Keep<span className="tr-long"> your cocktail</span>
                </CtaButton>
                <div id="tr-ways-keep" className={`tr-keep${open === 'keep' ? ' tr-keep-open' : ''}`} inert={open !== 'keep'}>
                  <div className="tr-keep-inner">
                    <button type="button" className="tr-quiet" onClick={() => sendLink('keep')}>A link for myself</button>
                    <button type="button" className="tr-quiet" onClick={() => sendCard('keep')}>As an image</button>
                    <button type="button" className="tr-quiet" onClick={() => window.print()}>The recipe as a PDF</button>
                    <span className="tr-keep-note" role="status">{note?.way === 'keep' ? note.text : null}</span>
                    {shownCard?.way === 'keep' ? (
                      <figure className="tr-card-shown">
                        <img src={shownCard.src} alt={`The card for ${cocktail.name}`} />
                        <figcaption>Press and hold the card to send or save it.</figcaption>
                      </figure>
                    ) : null}
                  </div>
                </div>
                {(onPourAgain ?? (owned ? onMeetYourOwn : undefined)) && (
                  <button type="button" className="tr-quiet" onClick={onPourAgain ?? onMeetYourOwn}>
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
