// Real-browser name-tag check for the staged candidates (2026-10-06).
//
// Runs Codex's private review fixture (output/playwright/image-review.html,
// served by review-vite.config.ts on :5179) in Chromium. For every selected
// candidate × name × viewport it records:
//   1. geometry: the rendered name's glyph box against the measured paper box,
//      both mapped through the live <img>'s cover fit and frame transform;
//   2. pixels: a screenshot with and without the name; every pixel the name
//      changes (its ink) must land on light tag paper in the un-named frame,
//      not on wood, string, shadow or the glass.
// Plus a full-viewport screenshot of every case for human review of copy and
// personality evidence. Read-only towards production and the image records.
//
//   node tag-check.mjs            (fixture server must be up on :5179)
import { chromium } from '../../../../dionysus-experience/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const OUT = path.join(HERE, 'shots');
fs.mkdirSync(OUT, { recursive: true });
const queue = JSON.parse(fs.readFileSync(path.join(ROOT, 'queue.json'), 'utf8'));
const CANDS = queue.progress.selectedCandidates.map((c) => ({ pairing: c.pairing, version: c.version }));
const NAMES = ['Ada', 'Alexandria-Rose'];
// the same seven viewports as the exporter's geometry checks
const VPS = [
  { id: 'w1920', width: 1920, height: 1080, dsf: 1 },
  { id: 'w1440', width: 1440, height: 900, dsf: 1 },
  { id: 'w2048', width: 2048, height: 1036, dsf: 1 },
  { id: 'w3440', width: 3440, height: 1440, dsf: 1 },
  { id: 'p390', width: 390, height: 844, dsf: 2, mobile: true },
  { id: 'p430', width: 430, height: 932, dsf: 2, mobile: true },
  { id: 'p320', width: 320, height: 568, dsf: 2, mobile: true },
];
const only = process.argv[2]; // optional "pairing/version" filter

function measurementsFor(c) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, c.pairing, c.version, 'measurements.json'), 'utf8'));
}

async function settle(p) {
  // finish the arrival, freeze anything that breathes, so the two frames differ only by the name
  await p.evaluate(() => {
    for (const a of document.getAnimations()) {
      const it = a.effect?.getTiming?.().iterations;
      if (it === Infinity) a.pause(); else { try { a.finish(); } catch { a.pause(); } }
    }
  });
  await p.waitForTimeout(150);
}

async function runCase(ctx, c, name, vp, m) {
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  const url = `http://127.0.0.1:5179/output/playwright/image-review.html?candidate=${c.pairing}/${c.version}&name=${encodeURIComponent(name)}`;
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForSelector('.tr-frame img', { state: 'attached' });
  await p.evaluate(() => document.querySelector('.tr-frame img').decode().catch(() => {}));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(3800); // arrival + inking
  await settle(p);
  await p.addStyleTag({ content: '.dev-nav{display:none!important}' });
  if (process.env.NUDGE) await p.addStyleTag({ content: `.tr-tagname{translate:${process.env.NUDGE}}` });

  const g = await p.evaluate((m) => {
    const img = document.querySelector('.tr-frame img');
    const tag = document.querySelector('.tr-tagname');
    const wide = /wide/.test(img.currentSrc || img.src);
    const [cx0, cy0, cw, ch] = wide ? m.wideCrop : m.portraitCrop;
    const W = img.naturalWidth, H = img.naturalHeight;
    const toExport = (x, y) => [((x - cx0) * W) / cw, ((y - cy0) * H) / ch];
    const r = img.getBoundingClientRect();
    const lw = img.offsetWidth, lh = img.offsetHeight;
    const s = r.width / lw;
    const k = Math.max(lw / W, lh / H);
    const cs = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    const ox = (lw - W * k) * cs[0], oy = (lh - H * k) * cs[1];
    const toScreen = ([x, y]) => [r.left + (ox + x * k) * s, r.top + (oy + y * k) * s];
    const P = m.bounds.paper;
    const [px0, py0] = toScreen(toExport(P.x0, P.y0));
    const [px1, py1] = toScreen(toExport(P.x1, P.y1));
    let glyph = null, fontPx = null;
    if (tag) {
      const range = document.createRange();
      range.selectNodeContents(tag);
      const rr = [...range.getClientRects()];
      if (rr.length) glyph = { x0: Math.min(...rr.map((q) => q.left)), y0: Math.min(...rr.map((q) => q.top)), x1: Math.max(...rr.map((q) => q.right)), y1: Math.max(...rr.map((q) => q.bottom)) };
      const t = new DOMMatrix(getComputedStyle(tag).transform === 'none' ? undefined : getComputedStyle(tag).transform);
      fontPx = parseFloat(getComputedStyle(tag).fontSize) * Math.hypot(t.a, t.b) * s;
    }
    // page copy that crosses the tag (hero text is the only copy on the first screen)
    const paperBox = { x0: px0, y0: py0, x1: px1, y1: py1 };
    const collisions = [];
    for (const el of document.querySelectorAll('.tr-hero-inner, .tr-hero-inner *')) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue;
      const cs2 = getComputedStyle(el);
      if (cs2.visibility === 'hidden' || +cs2.opacity === 0) continue;
      const range = document.createRange(); range.selectNodeContents(el);
      for (const q of range.getClientRects()) {
        const w = Math.min(q.right, px1) - Math.max(q.left, px0), h = Math.min(q.bottom, py1) - Math.max(q.top, py0);
        if (w > 1 && h > 1) { collisions.push({ cls: el.className || el.tagName, overlapPx: Math.round(w * h) }); break; }
      }
    }
    return { wide, paper: paperBox, glyph, fontPx, tagPresent: !!tag, collisions, vw: innerWidth, vh: innerHeight };
  }, m);

  const tagId = `${c.pairing}_${c.version}_${vp.id}_${name === 'Ada' ? 'short' : 'long'}`;
  // full viewport, for human review of copy + personality evidence
  await p.screenshot({ path: path.join(OUT, `${tagId}.jpg`), type: 'jpeg', quality: 78 });

  let px = null;
  if (g.glyph) {
    const pad = 24;
    const bx0 = Math.max(0, Math.floor(Math.min(g.paper.x0, g.glyph.x0) - pad));
    const by0 = Math.max(0, Math.floor(Math.min(g.paper.y0, g.glyph.y0) - pad));
    const bx1 = Math.min(g.vw, Math.ceil(Math.max(g.paper.x1, g.glyph.x1) + pad));
    const by1 = Math.min(g.vh, Math.ceil(Math.max(g.paper.y1, g.glyph.y1) + pad));
    const clip = { x: bx0, y: by0, width: bx1 - bx0, height: by1 - by0 };
    const named = await p.screenshot({ clip });
    fs.writeFileSync(path.join(OUT, `${tagId}.tag.png`), named);
    await p.addStyleTag({ content: '.tr-tagname{visibility:hidden!important}' });
    await p.waitForTimeout(120);
    const bare = await p.screenshot({ clip });
    px = await p.evaluate(async ({ a, b, clip, paper, dsf }) => {
      const load = (b64) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.src = 'data:image/png;base64,' + b64; });
      const [A, B] = await Promise.all([load(a), load(b)]);
      const cv = document.createElement('canvas'); cv.width = A.width; cv.height = A.height;
      const cx = cv.getContext('2d', { willReadFrequently: true });
      cx.drawImage(A, 0, 0); const da = cx.getImageData(0, 0, A.width, A.height).data;
      cx.clearRect(0, 0, A.width, A.height); cx.drawImage(B, 0, 0); const db = cx.getImageData(0, 0, A.width, A.height).data;
      const lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      // paper reference: bright end of the measured paper box in the bare frame
      const inPaper = [];
      const sx = A.width / clip.width;
      const p0x = (paper.x0 - clip.x) * sx, p1x = (paper.x1 - clip.x) * sx, p0y = (paper.y0 - clip.y) * sx, p1y = (paper.y1 - clip.y) * sx;
      for (let y = Math.max(0, p0y | 0); y < Math.min(A.height, p1y); y++) for (let x = Math.max(0, p0x | 0); x < Math.min(A.width, p1x); x++) inPaper.push(lum(db, (y * A.width + x) * 4));
      inPaper.sort((u, v) => u - v);
      const ref = inPaper.length ? inPaper[Math.floor(inPaper.length * 0.9)] : 0;
      let ink = 0, off = 0, outside = 0;
      let ix0 = 1e9, iy0 = 1e9, ix1 = -1, iy1 = -1;
      for (let y = 0; y < A.height; y++) for (let x = 0; x < A.width; x++) {
        const i = (y * A.width + x) * 4;
        const d = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
        if (d < 36) continue;
        ink++;
        ix0 = Math.min(ix0, x); iy0 = Math.min(iy0, y); ix1 = Math.max(ix1, x); iy1 = Math.max(iy1, y);
        if (lum(db, i) < ref * 0.6) off++;
        if (x < p0x || x > p1x || y < p0y || y > p1y) outside++;
      }
      return { ink, offPaper: off, outsidePaperBox: outside, paperRefLum: Math.round(ref),
        inkBox: ink ? { x0: clip.x + ix0 / sx, y0: clip.y + iy0 / sx, x1: clip.x + (ix1 + 1) / sx, y1: clip.y + (iy1 + 1) / sx } : null };
    }, { a: named.toString('base64'), b: bare.toString('base64'), clip, paper: g.paper, dsf: vp.dsf });
  }
  await p.close();
  return { tagId, ...c, name, viewport: vp.id, errors, ...g, px };
}

function verdict(r) {
  const why = [];
  if (r.errors.length) why.push('page error: ' + r.errors[0]);
  if (!r.tagPresent || !r.glyph) why.push('no name rendered on the tag');
  if (r.px) {
    if (r.px.ink === 0) why.push('name produced no visible ink');
    const offPct = r.px.ink ? (100 * r.px.offPaper) / r.px.ink : 0;
    const outPct = r.px.ink ? (100 * r.px.outsidePaperBox) / r.px.ink : 0;
    r.offPaperPct = +offPct.toFixed(2);
    r.outsidePaperBoxPct = +outPct.toFixed(2);
    if (offPct > 2) why.push(`${offPct.toFixed(1)}% of ink falls on non-paper pixels`);
    if (outPct > 2) why.push(`${outPct.toFixed(1)}% of ink falls outside the measured paper box`);
  }
  if (r.collisions?.length) why.push('page copy crosses the tag: ' + [...new Set(r.collisions.map((c) => c.cls))].join(', '));
  if (r.fontPx != null && r.fontPx < 10) why.push(`name renders at ${r.fontPx.toFixed(1)}px — below a 10px legibility floor`);
  r.result = why.length ? 'FAIL' : 'PASS';
  r.why = why;
  return r;
}

const b = await chromium.launch();
const results = [];
for (const c of CANDS) {
  if (only && `${c.pairing}/${c.version}` !== only) continue;
  const m = measurementsFor(c);
  const jobs = [];
  for (const vp of VPS) {
    const ctx = await b.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dsf, isMobile: !!vp.mobile, hasTouch: !!vp.mobile });
    jobs.push((async () => { for (const n of NAMES) results.push(verdict(await runCase(ctx, c, n, vp, m))); await ctx.close(); })());
  }
  await Promise.all(jobs);
  const mine = results.filter((r) => r.pairing === c.pairing);
  console.log(`${c.pairing}/${c.version}: ${mine.filter((r) => r.result === 'PASS').length}/${mine.length} pass`);
}
await b.close();
fs.writeFileSync(path.join(HERE, only ? 'results-partial.json' : 'results.json'), JSON.stringify(results, null, 1));
