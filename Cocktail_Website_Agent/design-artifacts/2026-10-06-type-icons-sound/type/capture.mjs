import { chromium } from '/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/dionysus-experience/node_modules/playwright/index.mjs';
import fs from 'node:fs'; import path from 'node:path';
const ART = '/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/design-artifacts/2026-10-06-type-icons-sound/type';
const OUT = process.argv[2] || `${ART}/screens/raw`;
const only = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });
const DIRS = { a: null, b: 'b-neue-montreal.css', c: 'c-switzer.css', d: 'd-satoshi.css' };
const VPS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phoneS: { viewport: { width: 375, height: 667 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  phoneL: { viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const NAME = 'Zoë Nguyễn-Ångström';
function css(file) {
  if (!file) return '';
  let s = fs.readFileSync(`${ART}/directions/${file}`, 'utf8');
  return s.replace(/url\('(\.\.\/_trial-fonts\/[^']+)'\)/g, (_, rel) => {
    const b = fs.readFileSync(path.resolve(`${ART}/directions`, rel)).toString('base64');
    return `url(data:font/otf;base64,${b}) format('opentype')`;
  });
}
async function run(b, dk, vk) {
  const ctx = await b.newContext(VPS[vk]); const p = await ctx.newPage();
  const style = css(DIRS[dk]);
  const inject = async () => {
    await p.addStyleTag({ content: '.dev-nav{opacity:0!important}\n' + style });
    await p.evaluate(async () => { await Promise.all([...document.fonts].map(f => f.load().catch(() => {}))); await document.fonts.ready; });
  };
  const shot = async (n) => { await p.waitForTimeout(250); await p.screenshot({ path: `${OUT}/${dk}_${vk}_${n}.png` }); };
  await p.goto('http://localhost:5180/'); await p.waitForTimeout(1500); await inject();
  await p.getByRole('button', { name: /Discover my cocktail/ }).click(); await p.waitForTimeout(3500);
  const nav = p.locator('.dev-nav');
  const jump = async (l) => nav.getByRole('button', { name: l, exact: true }).click({ force: true });
  await jump('H1 lens'); await p.waitForTimeout(4500); await shot('h1');
  await jump('H4 practice'); await p.waitForTimeout(3200); await shot('h4practice');
  await jump('H4·8');
  for (const t of [900, 700, 700, 700]) { await p.waitForTimeout(t); }
  await shot('h4pair');
  await jump('H5'); await p.waitForTimeout(5000); await shot('h5');
  await jump('H10 settled'); await p.waitForTimeout(4500);
  await inject();
  await p.evaluate((name) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.nodeValue.includes('Celeste')) n.nodeValue = n.nodeValue.replaceAll('Celeste', name); }, NAME);
  await p.waitForTimeout(1500); await shot('h10top');
  await p.locator('.tr-card').first().scrollIntoViewIfNeeded(); await p.evaluate(() => document.querySelector('.tr-card')?.scrollIntoView({ block: 'start' }));
  await p.waitForTimeout(1800); await shot('h10recipe');
  await p.evaluate(() => document.querySelector('.tr-epigraph')?.scrollIntoView({ block: 'start' })); await p.mouse.wheel(0, -120);
  await p.waitForTimeout(1800); await shot('h10letter');
  await ctx.close();
}
const b = await chromium.launch();
const jobs = [];
for (const dk of Object.keys(DIRS)) for (const vk of Object.keys(VPS)) if (!only || only.split(',').includes(`${dk}_${vk}`)) jobs.push([dk, vk]);
for (let i = 0; i < jobs.length; i += 4) await Promise.all(jobs.slice(i, i + 4).map(([d, v]) => run(b, d, v).catch(e => console.error(d, v, e.message))));
await b.close(); console.log('done', jobs.length);
