// Privacy and parity end-to-end checks (story 1.8). Run: `npm run e2e`.
//
// Drives the real journey in Chromium against a private dev server:
//  · desktop 1440 with a mouse (H3 drag, H5 carry) and phone 390 with touch
//    (taps) make the same choices; both must reveal the shared core's pour for
//    that request, and both must write the identical request;
//  · the request carries exactly the Answers v3 fields, and the trace, the
//    name and the diagnostics appear in no network request;
//  · the H4/H3 diagnostics record what intake-contract.md defines;
//  · a broken gift link opens the landing; a valid one opens its pour.

import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import {
  BINARY_A,
  CHOICES,
  DESKTOP,
  PHONE,
  clickEmber,
  expectedPour,
  openAtHold,
  openPage,
  sleep,
  startServer,
  waitForPair,
  walkJourney,
} from './harness.mjs';

const JOURNEY_MS = 240_000;
const BINARY_KEYS = ['sharp-smooth', 'relaxed-excited', 'halffull-halfempty', 'control', 'quiet-loud', 'risk', 'bright-dark', 'soft-rough', 'harmonic'];
const GRAVITY_KEYS = ['solitary-social', 'controlled-wild', 'classic-experimental', 'analytical-instinctive', 'grounded-dreamlike'];
// what the hook returns: the v3 request with the name taken out
const WIRE_FIELDS_WITHOUT_NAME = ['drawnToward', 'flavors', 'gravity', 'lens', 'seed', 'soughtFor', 'texture', 'v', 'vetoes'];
// the pour CHOICES reach under model-v1 ("Whoever Comes In")
const CHOICES_PAIRING = 'regular-guy-caregiver';
// The only third parties the page may reach, and only to fetch: the
// <Analytics /> script and the Google Fonts stylesheet and files (index.css).
const ALLOWED_ORIGINS = new Set(['https://va.vercel-scripts.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']);

let server;
before(async () => { server = await startServer(); });
after(async () => { await server?.close(); });

describe('the journey on desktop and phone', () => {
  const runs = {};

  for (const device of [DESKTOP, PHONE]) {
    test(`${device.label}: reveals the shared core's pour, and nothing private leaves the browser`, { timeout: JOURNEY_MS }, async () => {
      const session = await openPage({ viewport: device.viewport, touch: device.touch, hideDevNav: true });
      try {
        const { title, intake } = await walkJourney(session.page, { url: server.url, touch: device.touch });
        const { request, diagnostics } = intake;

        // the request is Answers v3 and nothing else (the hook removes the name)
        assert.deepEqual(Object.keys(request).sort(), WIRE_FIELDS_WITHOUT_NAME);
        assert.equal(request.v, 3);
        assert.equal(request.lens, 'real');
        assert.equal(request.seed, 'galliano-gold');
        assert.deepEqual(request.gravity, Object.fromEntries(GRAVITY_KEYS.map((key, i) => [key, CHOICES.gravity[i]])));
        assert.deepEqual(request.texture, Object.fromEntries(BINARY_KEYS.map((key, i) => [key, CHOICES.texture[i]])));
        // chosen out of order, stored in vocabulary order
        assert.deepEqual(request.soughtFor, ['advice', 'comfort', 'calm']);
        assert.deepEqual(request.drawnToward, ['peace', 'belonging', 'caring']);
        assert.deepEqual(request.flavors, ['sweet', 'fruity']);
        assert.deepEqual(request.vetoes, ['dairy', 'nuts']);
        const wire = JSON.stringify(request);
        assert.ok(!wire.includes(CHOICES.trace), 'the trace is in the request');
        // the hook removes `name`; it must not have been copied anywhere else
        assert.ok(!wire.includes(CHOICES.name), 'the name is in another request field');
        assert.ok(!/h4Mode|gravityMoved|diagnostic|trace|insight/i.test(wire), 'diagnostics or trace fields are in the request');

        // the revealed pour is the shared core's shortlist head for this request
        const expected = await expectedPour(session.page, request);
        assert.ok(expected.name, `no authored pour for ${expected.pairing}`);
        assert.equal(title, expected.name);
        // and that pour is pinned, so a selection change can't pass silently
        // by moving both sides (re-pin, with a reason, when model-v1 changes)
        assert.equal(expected.pairing, CHOICES_PAIRING);

        // the diagnostics are complete and stayed in the browser
        assert.equal(diagnostics.h4Mode, 'timed');
        assert.equal(diagnostics.example, 'chosen');
        assert.deepEqual(Object.keys(diagnostics.texture).sort(), [...BINARY_KEYS].sort());
        for (const key of BINARY_KEYS) {
          const d = diagnostics.texture[key];
          assert.equal(d.status, 'chosen', `${key} was not recorded as chosen`);
          assert.ok(Number.isInteger(d.ms) && d.ms >= 0, `${key} has no catch time`);
        }
        assert.deepEqual(diagnostics.gravityMoved, Object.fromEntries(GRAVITY_KEYS.map((key) => [key, true])));

        // The reveal runs in the browser, so nothing should leave it at all:
        // every request is a same-origin GET or an allowed third-party fetch, with no
        // body. The substring check below is a second line, not the guard.
        const origin = new URL(server.url).origin;
        const unexpected = session.requests.filter(({ url, method, body }) => {
          const target = new URL(url);
          const allowed = target.origin === origin || ALLOWED_ORIGINS.has(target.origin);
          return !allowed || method !== 'GET' || body !== '';
        });
        assert.deepEqual(unexpected, [], 'the page made a request other than a same-origin or allowed third-party GET');
        const secrets = [CHOICES.trace, encodeURIComponent(CHOICES.trace), CHOICES.name, 'h4Mode', 'gravityMoved', 'timedOut', 'notTouched', 'interrupted'];
        const leaks = session.requests.filter(({ url, body }) => secrets.some((s) => url.includes(s) || body.includes(s)));
        assert.deepEqual(leaks, [], 'a network request carried the trace, the name or the diagnostics');

        assert.deepEqual(session.errors, [], 'the page logged errors');
        runs[device.label] = { title, request, statuses: Object.fromEntries(BINARY_KEYS.map((key) => [key, diagnostics.texture[key].status])), diagnostics };
      } finally {
        await session.close();
      }
    });
  }

  test('mouse and touch give identical answers and the same pour', () => {
    const desktop = runs[DESKTOP.label];
    const phone = runs[PHONE.label];
    assert.ok(desktop && phone, 'a journey did not complete');
    assert.deepEqual(phone.request, desktop.request);
    assert.equal(phone.title, desktop.title);
    // the diagnostics agree on everything but the catch times
    assert.deepEqual(phone.statuses, desktop.statuses);
    for (const field of ['h4Mode', 'example', 'gravityMoved']) assert.deepEqual(phone.diagnostics[field], desktop.diagnostics[field]);
  });
});

describe('H4 and H3 diagnostics', () => {
  test('timed: expiry, a catch, a timeout and a paused re-present', { timeout: 120_000 }, async () => {
    const session = await openPage({ viewport: DESKTOP.viewport });
    const { page } = session;
    try {
      await openAtHold(page, server.url, 'H4 example');
      await page.locator('.ember.is-number').first().waitFor();
      // the 1/2 example expires untouched
      await waitForPair(page, 0);
      await sleep(500);
      await clickEmber(page, 0);                 // pair 0 → a, chosen
      await waitForPair(page, 1);                // pair 1 expires untouched
      await waitForPair(page, 2);
      await sleep(400);
      // a frozen tab: block the main thread so the frame loop sees a >500 ms gap
      await page.evaluate(() => { const t = performance.now(); while (performance.now() - t < 900) { /* frozen */ } });
      await sleep(150);
      await clickEmber(page, 0);                 // during the 600 ms pause: ignored
      await sleep(1000);                         // the same pair is presented again
      assert.equal(await page.locator('.ember .sphere-word').first().textContent(), BINARY_A[2]);
      await sleep(450);
      await clickEmber(page, 1);                 // pair 2 → b, chosen, interrupted
      await waitForPair(page, 3);

      const { request, diagnostics } = await page.evaluate(() => window.__dionysusIntake());
      assert.equal(diagnostics.h4Mode, 'timed');
      assert.equal(diagnostics.example, 'notTouched');
      const pair0 = diagnostics.texture['sharp-smooth'];
      assert.equal(pair0.status, 'chosen');
      assert.ok(Number.isInteger(pair0.ms) && pair0.ms >= 0);
      assert.equal(pair0.interrupted, undefined);
      assert.deepEqual(diagnostics.texture['relaxed-excited'], { status: 'timedOut' });
      const pair2 = diagnostics.texture['halffull-halfempty'];
      assert.equal(pair2.status, 'chosen');
      assert.equal(pair2.interrupted, true);
      assert.equal(diagnostics.texture.control.status, 'notPresented');
      // a timed-out pair leaves no answer; the paused tap changed nothing
      assert.deepEqual(request.texture, { 'sharp-smooth': 'a', 'halffull-halfempty': 'b' });
      assert.deepEqual(session.errors, []);
    } finally {
      await session.close();
    }
  });

  test('Still Water: untimed, let them cool, and keyboard gravity', { timeout: 120_000 }, async () => {
    const session = await openPage({ viewport: DESKTOP.viewport, reducedMotion: 'reduce' });
    const { page } = session;
    try {
      await openAtHold(page, server.url, 'H3 gravity');
      const track = page.locator('.grav-track');
      await track.waitFor();
      await sleep(800);
      await track.focus();
      await page.keyboard.press('Enter');        // an untouched 50
      await sleep(1200);
      await track.focus();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');        // moved by key: 54
      await sleep(1200);

      await page.locator('.dev-nav button', { hasText: 'H4 example' }).click();
      await page.locator('.ember.is-number').first().waitFor();
      await sleep(500);
      await page.getByRole('button', { name: 'Let them cool' }).click();   // the example: notTouched
      await waitForPair(page, 0);
      await sleep(500);
      await page.getByRole('button', { name: 'Let them cool' }).click();   // pair 0: skipped
      await waitForPair(page, 1);
      await sleep(4800);                                                   // longer than a timed round
      assert.equal(await page.locator('.ember .sphere-word').first().textContent(), BINARY_A[1], 'Still Water must have no deadline');
      await clickEmber(page, 0);                                           // pair 1 → a
      await waitForPair(page, 2);

      const { request, diagnostics } = await page.evaluate(() => window.__dionysusIntake());
      assert.equal(diagnostics.h4Mode, 'untimed');
      assert.equal(diagnostics.example, 'notTouched');
      assert.deepEqual(diagnostics.texture['sharp-smooth'], { status: 'skipped' });
      assert.equal(diagnostics.texture['relaxed-excited'].status, 'chosen');
      assert.deepEqual(request.texture, { 'relaxed-excited': 'a' });
      assert.deepEqual(request.gravity, { 'solitary-social': 50, 'controlled-wild': 54 });
      assert.equal(diagnostics.gravityMoved['solitary-social'], false);
      assert.equal(diagnostics.gravityMoved['controlled-wild'], true);
      assert.deepEqual(session.errors, []);
    } finally {
      await session.close();
    }
  });
});

describe('gift links', () => {
  test('a broken link opens the landing', { timeout: 60_000 }, async () => {
    const session = await openPage({ viewport: PHONE.viewport, touch: true });
    try {
      const { page } = session;
      // a link that won't decompress, and a well-formed one naming no pour
      const unknown = 'p' + Buffer.from(JSON.stringify({ pairing: 'nobody-else', name: 'Celeste', seed: null })).toString('base64url');
      for (const encoded of ['gnot-a-real-pour', unknown]) {
        await page.goto('about:blank');
        await page.goto(`${server.url}/#pour=${encoded}`);
        await page.getByRole('button', { name: 'Discover my cocktail' }).waitFor({ timeout: 15000 });
        assert.equal(await page.locator('h1.tr-title').count(), 0);
        assert.ok(!page.url().includes('#pour='), 'the broken link was left in the address bar');
      }
      assert.deepEqual(session.errors, []);
    } finally {
      await session.close();
    }
  });

  test('a valid link opens its pour, with the sharer\'s name', { timeout: 60_000 }, async () => {
    const session = await openPage({ viewport: PHONE.viewport, touch: true });
    const { page } = session;
    try {
      await page.goto(`${server.url}/`);
      const { hash, name } = await page.evaluate(async () => {
        const { encodePour } = await import('/src/engine/pourLink.ts');
        const { AUTHORED_POURS } = await import('/shared/data/pours/static.ts');
        const encoded = await encodePour({ pairing: 'creator-hero', name: 'Celeste', seed: 'galliano-gold' });
        return { hash: `#pour=${encoded}`, name: AUTHORED_POURS['creator-hero'].cocktail.name };
      });
      await page.goto('about:blank');
      await page.goto(`${server.url}/${hash}`);
      await page.locator('h1.tr-title').waitFor({ timeout: 30000 });
      assert.equal((await page.locator('h1.tr-title').textContent())?.trim(), name);
      await page.getByText('Celeste').first().waitFor({ timeout: 10000 });
      assert.deepEqual(session.errors, []);
    } finally {
      await session.close();
    }
  });
});
