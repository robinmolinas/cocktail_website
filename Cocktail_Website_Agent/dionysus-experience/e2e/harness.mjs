// End-to-end harness (story 1.8): a private dev server, a browser, and a
// driver that walks the real journey by mouse or by touch.
//
// The dev build is required: the suite reads the DEV-only
// window.__dionysusIntake() hook (src/App.tsx), which is compiled out of
// production. Nothing here is imported by the app.

import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, createServer } from 'vite';
import { chromium } from 'playwright';

export const APP_ROOT = fileURLToPath(new URL('..', import.meta.url));
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Everything the dev server logs (dep re-optimising, reloads, errors), kept so
// a failure can quote it; E2E_VITE_LOG=info also prints it.
const serverLog = [];
function recordingLogger() {
  const base = createLogger(process.env.E2E_VITE_LOG ?? 'error');
  const keep = (level) => (msg, options) => {
    serverLog.push(`${new Date().toISOString().slice(11, 23)} ${level} ${String(msg).replace(/\x1b\[[0-9;]*m/g, '')}`);
    base[level](msg, options);
  };
  return { ...base, info: keep('info'), warn: keep('warn'), warnOnce: keep('warnOnce'), error: keep('error') };
}

// Its own port and cache, so it never disturbs a dev server already running
// on 5180 (worktrees share node_modules).
export async function startServer() {
  const server = await createServer({
    root: APP_ROOT,
    configFile: join(APP_ROOT, 'vite.config.ts'),
    // one cache per checkout, so two worktrees' runs never race on it
    cacheDir: join(tmpdir(), `dionysus-e2e-vite-${createHash('sha1').update(APP_ROOT).digest('hex').slice(0, 8)}`),
    logLevel: 'info',
    customLogger: recordingLogger(),
    server: { port: 5199, strictPort: false, host: 'localhost' },
  });
  await server.listen();
  // compile the reveal's lazy chunks (the 1.5 MB registry, the reading room)
  // before any journey, so a cold cache can't trip the app's 10 s reveal ceiling
  await Promise.all(['/src/engine/reveal.ts', '/src/components/TheReading.tsx', '/src/engine/pourLink.ts']
    .map((url) => server.warmupRequest(url)));
  const url = server.resolvedUrls?.local?.[0];
  if (!url) throw new Error('the e2e dev server did not report a URL');
  return { url: url.replace(/\/$/, ''), close: () => server.close() };
}

export const DESKTOP = { label: 'desktop-1440-mouse', viewport: { width: 1440, height: 900 }, touch: false };
export const PHONE = { label: 'phone-390-touch', viewport: { width: 390, height: 844 }, touch: true };

/**
 * A fresh browser page that records console errors and every network request
 * (URL and body), so a test can prove what never left the browser.
 */
export async function openPage({ viewport, touch = false, reducedMotion = 'no-preference', hideDevNav = false }) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    hasTouch: touch,
    isMobile: touch,
    deviceScaleFactor: touch ? 3 : 1,
    reducedMotion,
  });
  if (hideDevNav) {
    // the DEV quick-nav covers the foot of a phone frame; taps must never land on it
    await context.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = '.dev-nav{display:none!important}';
        document.head.append(style);
      });
    });
  }
  const page = await context.newPage();
  // E2E_CPU_THROTTLE=4 runs the page on a CPU four times slower, to prove the
  // driver's waits hold on a loaded or CI machine
  const throttle = Number(process.env.E2E_CPU_THROTTLE ?? 1);
  if (throttle > 1) {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
  }
  const errors = [];
  const requests = [];
  // every main-frame load: a reload the test did not ask for (Vite's client
  // reloads silently on a dep re-optimise) shows as a repeated URL
  const navigations = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame()) navigations.push(`${new Date().toISOString().slice(11, 23)} ${frame.url()}`);
  });
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('request', (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData() ?? '' }));
  return { browser, page, errors, requests, navigations, close: () => browser.close() };
}

/**
 * Runs a test body; a failure also reports what the page logged, its loads,
 * the dev server's recent log, and a screenshot of where it stood.
 */
export async function explained(session, body) {
  try {
    return await body();
  } catch (error) {
    const lines = [];
    if (session.errors.length) lines.push(`page errors: ${session.errors.join(' | ')}`);
    lines.push(`page loads: ${session.navigations.join(' | ')}`);
    // the journey advances when the video reaches each hold, so a stalled
    // video stalls the journey with no error at all
    const video = await session.page.evaluate(() => {
      const v = document.querySelector('video');
      return v && { t: Number(v.currentTime.toFixed(2)), paused: v.paused, readyState: v.readyState, networkState: v.networkState, error: v.error?.code ?? null };
    }).catch(() => null);
    if (video) lines.push(`video: ${JSON.stringify(video)}`);
    if (serverLog.length) lines.push(`dev server: ${serverLog.slice(-8).join(' | ')}`);
    const shot = join(tmpdir(), `dionysus-e2e-failure-${Date.now()}.png`);
    if (await session.page.screenshot({ path: shot }).then(() => true, () => false)) lines.push(`at ${session.page.url()}, screenshot ${shot}`);
    // node prints the stack, which captured the message when it was thrown
    const extra = lines.map((line) => `\n  ${line}`).join('');
    const original = error.message;
    error.message += extra;
    if (typeof error.stack === 'string') error.stack = error.stack.replace(original, error.message);
    throw error;
  }
}

async function center(locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('element has no box');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** The first texture word of each H4 pair, in order (shared BINARIES pole a). */
export const BINARY_A = ['Sharp', 'Relaxed', 'Half-full', 'Planned', 'Quiet', 'Risk averse', 'Bright', 'Soft', 'Harmonic'];

/**
 * The one set of choices both devices make. Word lists are deliberately out
 * of vocabulary order: the stored answer must not depend on tap order.
 */
export const CHOICES = {
  name: 'Zephyrine',
  lens: 'The real me',
  seed: 'Galliano Gold',
  gravity: [72, 18, 22, 40, 15],
  texture: ['b', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
  soughtFor: ['Calm', 'Advice', 'Comfort'],
  drawnToward: ['Caring', 'Peace', 'Belonging'],
  flavours: ['Fruity', 'Sweet'],
  vetoes: ['Nuts', 'Dairy'],
  trace: 'the lighthouse keeps my secret',
};

/**
 * Walks the whole journey from the landing to the reading. Desktop uses the
 * mouse and the drag paths (H3 drag, H5 carry into the circle); phone uses
 * touch taps throughout. Returns the reading's title and the intake hook.
 */
export async function walkJourney(page, { url, touch }, choices = CHOICES) {
  const press = async (locator) => {
    const p = await center(locator);
    if (touch) await page.touchscreen.tap(p.x, p.y);
    else await page.mouse.click(p.x, p.y);
  };

  await page.goto(`${url}/`);
  await sleep(1200);
  await press(page.getByRole('button', { name: 'Discover my cocktail' }));
  await sleep(2500);
  // a tap anywhere skips the two cold-open lines
  await page.locator('section').first().click({ position: { x: 5, y: 5 } }).catch(() => {});

  // H0 · the name
  const nameInput = page.getByLabel('Your name');
  await nameInput.waitFor({ timeout: 20000 });
  await nameInput.fill(choices.name);
  if (touch) await press(page.locator('.name-input-row .hold-next'));
  else await page.keyboard.press('Enter');

  // H1 · the lens
  const lens = page.locator('.sphere-btn', { hasText: choices.lens });
  await lens.waitFor({ timeout: 10000 });
  await sleep(1500);
  await press(lens);

  // H2 · the seed
  const seed = page.getByRole('button', { name: choices.seed });
  await seed.waitFor({ timeout: 15000 });
  await sleep(1500);
  await press(seed);

  // H3 · gravity: drag the mote (mouse) or tap the spot (touch)
  const track = page.locator('.grav-track');
  await track.waitFor({ timeout: 15000 });
  await sleep(1200);
  for (const value of choices.gravity) {
    const box = await track.boundingBox();
    const x = box.x + (box.width * value) / 100;
    const y = box.y + box.height / 2;
    if (touch) {
      await page.touchscreen.tap(x, y);
    } else {
      const mote = await center(page.locator('.grav-mote'));
      await page.mouse.move(mote.x, y);
      await page.mouse.down();
      await page.mouse.move(x, y, { steps: 12 });
      await page.mouse.up();
    }
    await sleep(1300);
  }

  // H4 · the 1/2 example, then the nine pairs
  await page.locator('.ember.is-number').first().waitFor({ timeout: 20000 });
  await sleep(600);
  await press(page.locator('.ember').first());
  for (let k = 0; k < BINARY_A.length; k++) {
    await page.waitForFunction((word) => document.querySelector('.ember .sphere-word')?.textContent === word, BINARY_A[k], { timeout: 10000 });
    await sleep(550);
    await press(page.locator('.ember').nth(choices.texture[k] === 'a' ? 0 : 1));
  }

  // H5 round 1 · what others come to you for: carry (mouse) or tap (touch)
  await page.locator('.rw-word', { hasText: 'Advice' }).waitFor({ timeout: 25000 });
  await sleep(3200);
  for (const word of choices.soughtFor) {
    const sphere = page.locator('.rw-word', { hasText: new RegExp(`^${word}$`) });
    const from = await center(sphere);
    if (touch) {
      await page.touchscreen.tap(from.x, from.y);
    } else {
      const circle = await page.evaluate(() => {
        const held = document.querySelector('.rw-held');
        return { x: parseFloat(held.style.left), y: parseFloat(held.style.top) };
      });
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(circle.x, circle.y, { steps: 20 });
      await page.mouse.up();
    }
    await sleep(1800);
  }
  await page.locator('.rw-next.is-ready').waitFor({ timeout: 5000 });
  await press(page.locator('.rw-next'));

  // H5 round 2 · what draws you (taps on both devices; carry is round 1 only)
  await page.waitForFunction(() => document.querySelectorAll('.rw-word.is-found').length >= 12, null, { timeout: 15000 });
  await sleep(1500);
  for (const word of choices.drawnToward) {
    await press(page.locator('.rw-word', { hasText: new RegExp(`^${word}$`) }));
    await sleep(1300);
  }
  await page.locator('.rw-next.is-ready').waitFor({ timeout: 5000 });
  await press(page.locator('.rw-next'));

  // H6 beat 1 · flavours rise; catch each once it is fully condensed in frame
  await page.locator('.fin-stage .sphere-float').first().waitFor({ timeout: 30000 });
  for (const word of choices.flavours) {
    const float = page.locator('.fin-stage .sphere-float', { hasText: word });
    const deadline = Date.now() + 40000;
    for (;;) {
      const settled = await float.evaluate((el) => {
        const r = el.getBoundingClientRect();
        return parseFloat(el.style.opacity || '0') > 0.95 && r.top > 160 && r.bottom < window.innerHeight - 140;
      });
      if (settled) break;
      if (Date.now() > deadline) throw new Error(`flavour ${word} never settled in frame`);
      await sleep(200);
    }
    await press(float.locator('button'));
    await sleep(900);
  }
  await page.locator('.fin-stage .hold-next.is-ready').waitFor({ timeout: 5000 });
  await press(page.locator('.fin-stage .hold-next'));

  // H6 beat 2 · what never touches the glass
  await page.getByRole('button', { name: 'Gluten' }).waitFor({ timeout: 10000 });
  await sleep(1800);
  for (const word of choices.vetoes) {
    await press(page.getByRole('button', { name: word, exact: true }));
    await sleep(700);
  }
  await sleep(800);
  await press(page.locator('.fin-stage .hold-next'));

  // H7 · the trace
  const trace = page.getByLabel('Leave one trace of yourself');
  await trace.waitFor({ timeout: 15000 });
  await trace.fill(choices.trace);
  if (touch) { await sleep(1200); await press(page.locator('.trace-stage .hold-next')); }
  else await page.keyboard.press('Enter');

  // H8 → H9 → the reading
  await page.locator('h1.tr-title').waitFor({ timeout: 90000 });
  const title = (await page.locator('h1.tr-title').textContent())?.trim() ?? '';
  // let the reading room's own loads (persona image, audio) arrive, so the
  // caller's request log covers the arrival too
  await page.waitForLoadState('networkidle').catch(() => {});
  const intake = await page.evaluate(() => window.__dionysusIntake());
  return { title, intake };
}

/**
 * The pour the shared core reveals for a request, computed in the page from
 * the very modules the app runs (the dev server serves them).
 */
export async function expectedPour(page, request) {
  return page.evaluate(async (req) => {
    const selection = await import('/shared/selection/index.ts');
    const { AUTHORED_POURS } = await import('/shared/data/pours/static.ts');
    // names are never scored; the wire borrows one when the journey has none
    const pairing = selection.boundedPick(selection.selectShortlist({ ...req, name: 'Guest' }), null);
    return { pairing, name: AUTHORED_POURS[pairing]?.cocktail.name ?? null };
  }, request);
}

/** Dev-jump straight to a hold through the DEV quick-nav. */
export async function openAtHold(page, url, navLabel) {
  await page.goto(`${url}/`);
  await sleep(1000);
  await page.getByRole('button', { name: 'Discover my cocktail' }).click();
  await page.locator('.dev-nav').waitFor({ timeout: 10000 });
  await page.locator('.dev-nav button', { hasText: navLabel }).click();
}

export const waitForPair = (page, k) =>
  page.waitForFunction((word) => document.querySelector('.ember .sphere-word')?.textContent === word, BINARY_A[k], { timeout: 12000 });

export async function clickEmber(page, n) {
  const box = await page.locator('.ember').nth(n).boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}
