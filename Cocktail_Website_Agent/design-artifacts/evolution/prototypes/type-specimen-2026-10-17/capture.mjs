// Type specimen, 2026-10-17 (designer playtest, Batch 3). Shoots the LIVE app
// (dev server on :5180) with only its three font tokens swapped, so every
// screen is today's real layout. Nothing here touches dionysus-experience/src.
// Run: node capture.mjs   (needs the dev server running)
import { createRequire } from 'module';
const require = createRequire('/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/dionysus-experience/package.json');
const { chromium } = require('playwright');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const gcss = async (q) => (await fetch(`https://fonts.googleapis.com/css2?${q}&display=swap`, { headers: { 'user-agent': UA } })).text();
const RAW = await gcss('family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900');
// aliases with size-adjust, so the Garamonds are compared at Playfair's x-height
const alias = (css, fam, as, adj) => css.split('@font-face').filter((b) => b.includes(`'${fam}'`))
  .map((b) => '@font-face' + b.replace(`'${fam}'`, `'${as}'`).replace(/}\s*$/, `  size-adjust: ${(adj * 100).toFixed(1)}%;\n}`)).join('\n');

const DIRS = {
  A: { label: 'A · Today: Playfair Display + Playfair', vars: '' },
  B: { label: 'B · Cormorant Garamond + EB Garamond', vars: "--font-display: 'CG Adj', Georgia, serif; --font-text: 'EB Adj', Georgia, serif;" },
  C: { label: 'C · Playfair Display + EB Garamond', vars: "--font-text: 'EB Adj', Georgia, serif;" },
};
const SCREENS = [
  { id: 'h1', jump: 'H1 lens', wait: 3600, stage: 'lens' },
  { id: 'h3', jump: 'H3 gravity', wait: 3600, stage: 'gravity' },
  { id: 'h5', jump: 'H5', wait: 4200, stage: 'resonance' },
  { id: 'h6', jump: 'H6', wait: 9000, stage: 'finish' },
  { id: 'h10', jump: 'H10 settled', wait: 5000 },
  { id: 'h10-letter', jump: 'H10 settled', wait: 5000, scroll: true },
];
const POLES = [
  { id: 'pd400', label: 'Playfair Display italic 400', css: "font-family: 'Playfair Display'; font-weight: 400;" },
  { id: 'pd500', label: 'Playfair Display italic 500 (today)', css: '' },
  { id: 'pd700', label: 'Playfair Display italic 700 (bold)', css: "font-family: 'Playfair Display'; font-weight: 700;" },
  { id: 'cg300', label: 'Cormorant Garamond italic 300 (thin)', css: "font-family: 'CG Adj'; font-weight: 300;" },
  { id: 'cg600', label: 'Cormorant Garamond italic 600', css: "font-family: 'CG Adj'; font-weight: 600;" },
];
const DEVICES = [['desktop', { width: 1440, height: 900 }, false], ['phone', { width: 390, height: 844 }, true]];

const b = await chromium.launch();
let faces = '';
for (const [dev, vp, mobile] of DEVICES) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5180/');
  await p.waitForTimeout(1500);
  if (!faces) {
    // measure x-heights once, with the raw families loaded
    await p.addStyleTag({ content: RAW });
    const xh = await p.evaluate(async () => {
      const fams = ['Playfair Display', 'Playfair', 'Cormorant Garamond', 'EB Garamond'];
      await Promise.all(fams.map((f) => document.fonts.load(`italic 500 100px "${f}"`).then(() => document.fonts.load(`400 100px "${f}"`))));
      const c = document.createElement('canvas').getContext('2d');
      // at the size each is used (Playfair has optical sizes), as a fraction of it
      const at = { 'Playfair Display': 40, 'Cormorant Garamond': 40, Playfair: 17, 'EB Garamond': 17 };
      return Object.fromEntries(fams.map((f) => { c.font = `400 ${at[f]}px "${f}"`; return [f, c.measureText('x').actualBoundingBoxAscent / at[f]]; }));
    });
    faces = alias(RAW, 'Cormorant Garamond', 'CG Adj', xh['Playfair Display'] / xh['Cormorant Garamond'])
      + alias(RAW, 'EB Garamond', 'EB Adj', xh['Playfair'] / xh['EB Garamond']);
    console.log('x-height / em', xh);
  }
  await p.getByRole('button', { name: 'Discover my cocktail' }).click();
  await p.locator('input.depth-input').waitFor({ state: 'visible', timeout: 20000 });
  await p.addStyleTag({ content: RAW + faces });
  const style = await p.addStyleTag({ content: '/* swap */' });
  const set = (css) => style.evaluate((el, c) => { el.textContent = c; }, css);
  const jump = (l) => p.evaluate((l) => [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === l)?.click(), l);
  const hideNav = '[class*="z-[9999]"]:has(> button), .fixed:has(> button + button + button + button) { visibility: hidden !important; }';
  for (const s of SCREENS) {
    for (const [d, dir] of Object.entries(DIRS)) {
      await set(`:root { ${dir.vars} } ${hideNav}`);
      await jump('H1 lens'); await p.waitForTimeout(400); // re-enter, so every arrival replays
      await jump(s.jump);
      if (s.stage) await p.locator(`section[data-stage="${s.stage}"]`).waitFor({ timeout: 10000 });
      await p.waitForTimeout(s.wait);
      await p.evaluate(() => document.fonts.ready);
      if (s.scroll) {
        await p.mouse.move(vp.width / 2, vp.height / 2);
        await p.mouse.wheel(0, vp.height * 1.15); await p.waitForTimeout(2200);
      }
      await p.screenshot({ path: `shots/${d}-${s.id}-${dev}.jpg`, type: 'jpeg', quality: 84 });
    }
  }
  for (const pole of POLES) {
    await set(`${hideNav} .grav-pole { ${pole.css} }`);
    await jump('H1 lens'); await p.waitForTimeout(400);
    await jump('H3 gravity'); await p.locator('section[data-stage="gravity"]').waitFor();
    await p.waitForTimeout(3600);
    await p.screenshot({ path: `shots/pole-${pole.id}-${dev}.jpg`, type: 'jpeg', quality: 84 });
  }
  await ctx.close();
}
await b.close();
console.log(JSON.stringify({ DIRS: Object.fromEntries(Object.entries(DIRS).map(([k, v]) => [k, v.label])), SCREENS: SCREENS.map((s) => s.id), POLES: POLES.map((x) => [x.id, x.label]) }));
