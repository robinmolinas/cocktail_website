import { chromium } from '/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/dionysus-experience/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const ART = '/Users/robin.molinas/Documents/GenAI Projects/Dionysus/Cocktail_Website_Agent/design-artifacts/2026-10-06-type-icons-sound';
const svgs = Object.fromEntries(['sweet','bitter','spicy','herbal','fruity','citrusy','fresh','floral','smoky'].map(n => [n, fs.readFileSync(`${ART}/icons/svg/${n}.svg`, 'utf8')]));
const nm = fs.readFileSync(`${ART}/type/directions/b-neue-montreal.css`, 'utf8').replace(/url\('(\.\.\/_trial-fonts\/[^']+)'\)/g, (_, rel) =>
  `url(data:font/otf;base64,${fs.readFileSync(`${ART}/type/directions/${rel}`).toString('base64')}) format('opentype')`);
const ICON_CSS = `.dev-nav{opacity:0!important}
.flavour-icon{display:block;width:var(--fi,22px);height:var(--fi,22px);margin:0 auto 5px;color:#fbf4e8;opacity:.88}
.flavour-icon svg{width:100%;height:100%;display:block}
@media (max-width:640px){.flavour-icon{--fi:20px;margin-bottom:4px}}`;
const VPS = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 375, height: 667 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
const b = await chromium.launch();
for (const dir of ['a', 'b']) for (const [vk, vp] of Object.entries(VPS)) {
  const ctx = await b.newContext(vp); const p = await ctx.newPage();
  await p.goto('http://localhost:5180/'); await p.waitForTimeout(1200);
  await p.getByRole('button', { name: /Discover my cocktail/ }).click(); await p.waitForTimeout(3000);
  await p.addStyleTag({ content: ICON_CSS + (dir === 'b' ? nm : '') });
  await p.locator('.dev-nav').getByRole('button', { name: 'H6', exact: true }).click({ force: true });
  await p.waitForTimeout(2500);
  // add the icons as soon as the words exist, and keep re-adding (the field re-renders)
  await p.evaluate((svgs) => {
    const put = () => document.querySelectorAll('.sphere-word').forEach(w => {
      const k = w.textContent.trim().toLowerCase();
      if (svgs[k] && !w.previousElementSibling?.classList.contains('flavour-icon')) {
        const s = document.createElement('span'); s.className = 'flavour-icon'; s.innerHTML = svgs[k]; w.before(s);
      }
    });
    put(); setInterval(put, 100);
  }, svgs);
  await p.evaluate(async () => { await Promise.all([...document.fonts].map(f => f.load().catch(() => {}))); });
  for (const t of [4500]) { await p.waitForTimeout(t); await p.screenshot({ path: `${ART}/icons/in-app-${dir}-${vk}.png` }); }
  // a chosen state: catch Citrusy and Herbal if visible
  for (const w of ['Citrusy', 'Herbal']) { const el = p.locator('.sphere-word', { hasText: w }).first(); if (await el.count()) await el.click({ force: true }).catch(() => {}); await p.waitForTimeout(500); }
  await p.waitForTimeout(1500); await p.screenshot({ path: `${ART}/icons/in-app-${dir}-${vk}-chosen.png` });
  await ctx.close();
}
await b.close(); console.log('ok');
