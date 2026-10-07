// Live variant servers: the real app on :5180, seen through four extra ports.
//
//   node serve-variants.mjs          (needs `npm run dev` already up on :5180)
//
//   :5181  A · current type   + flavour icons
//   :5182  B · Neue Montreal  + flavour icons
//   :5183  C · Switzer        + flavour icons
//   :5184  D · Satoshi        + flavour icons
//
// Each port proxies the dev server (HMR included) and adds one stylesheet to
// index.html. No file in dionysus-experience/ is touched; stop this script and
// the variants are gone. The icons are drawn with CSS masks keyed by a data
// attribute, so React's own DOM is never restructured.
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ART = path.resolve(HERE, '..');
const UP = { host: 'localhost', port: 5180 };
const VARIANTS = {
  5181: { label: 'A · Current type', css: null },
  5182: { label: 'B · Neue Montreal', css: 'b-neue-montreal.css' },
  5183: { label: 'C · Switzer', css: 'c-switzer.css' },
  5184: { label: 'D · Satoshi', css: 'd-satoshi.css' },
};
const FLAVOURS = ['sweet', 'bitter', 'spicy', 'herbal', 'fruity', 'citrusy', 'fresh', 'floral', 'smoky'];

function iconCss() {
  const rules = FLAVOURS.map((k) => {
    const svg = fs.readFileSync(`${ART}/icons/svg/${k}.svg`, 'utf8').replaceAll('currentColor', '#000').replace(/\s+/g, ' ');
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    return `.sphere-word[data-flavour="${k}"]::before{-webkit-mask-image:${url};mask-image:${url}}`;
  }).join('\n');
  return `/* flavour icons (H6) — see icons/README.md */
.sphere-word[data-flavour]::before{content:"";display:inline-block;width:22px;height:22px;margin-right:.35em;
  vertical-align:-0.32em;background:currentColor;opacity:.88;
  -webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;
  -webkit-mask-size:contain;mask-size:contain}
@media (max-width:640px){.sphere-word[data-flavour]::before{width:20px;height:20px}}
${rules}`;
}

// tags each H6 flavour word; attribute only, so React reconciliation is unaffected
const TAGGER = `(() => {
  const F = new Set(${JSON.stringify(FLAVOURS)});
  const tag = () => document.querySelectorAll('.sphere-word:not([data-flavour])').forEach((w) => {
    const k = w.textContent.trim().toLowerCase();
    if (F.has(k)) w.setAttribute('data-flavour', k);
  });
  new MutationObserver(tag).observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  tag();
})();`;

function variantCss(file) {
  if (!file) return '';
  // relative ../_trial-fonts/ urls resolve under /__variant/type/
  return fs.readFileSync(`${ART}/type/directions/${file}`, 'utf8')
    .replaceAll("url('../_trial-fonts/", "url('/__variant/type/_trial-fonts/");
}

function serveStatic(req, res) {
  const rel = decodeURIComponent(req.url.split('?')[0].replace(/^\/__variant\//, ''));
  const file = path.resolve(ART, rel);
  if (!file.startsWith(ART) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  const type = { '.otf': 'font/otf', '.woff2': 'font/woff2', '.css': 'text/css' }[path.extname(file)] ?? 'application/octet-stream';
  res.writeHead(200, { 'content-type': type, 'cache-control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}

for (const [port, v] of Object.entries(VARIANTS)) {
  const server = http.createServer((req, res) => {
    if (req.url.startsWith('/__variant/variant.css')) {
      res.writeHead(200, { 'content-type': 'text/css', 'cache-control': 'no-cache' });
      return res.end(variantCss(v.css) + '\n' + iconCss());   // re-read each load: edit a direction, refresh
    }
    if (req.url.startsWith('/__variant/')) return serveStatic(req, res);
    const headers = { ...req.headers, host: `${UP.host}:${UP.port}`, 'accept-encoding': 'identity' };
    const up = http.request({ ...UP, method: req.method, path: req.url, headers }, (ur) => {
      const isHtml = (ur.headers['content-type'] || '').includes('text/html');
      if (!isHtml) { res.writeHead(ur.statusCode, ur.headers); return ur.pipe(res); }
      let body = '';
      ur.setEncoding('utf8');
      ur.on('data', (c) => (body += c));
      ur.on('end', () => {
        body = body
          .replace('</head>', `<script>${TAGGER}</script></head>`)
          // last in the document, so it outranks the styles Vite injects into <head> at runtime
          .replace('</body>', `<link rel="stylesheet" href="/__variant/variant.css"></body>`)
          .replace(/<title>(.*?)<\/title>/, `<title>${v.label} — $1</title>`);
        const h = { ...ur.headers };
        delete h['content-length'];
        res.writeHead(ur.statusCode, h);
        res.end(body);
      });
    });
    up.on('error', () => { res.writeHead(502); res.end('Dev server on :5180 is not running.'); });
    req.pipe(up);
  });
  // Vite HMR websocket: pipe the upgrade straight through
  server.on('upgrade', (req, socket, head) => {
    const up = net.connect(UP.port, UP.host, () => {
      const lines = [`${req.method} ${req.url} HTTP/1.1`, ...Object.entries({ ...req.headers, host: `${UP.host}:${UP.port}` }).map(([k, val]) => `${k}: ${val}`)];
      up.write(lines.join('\r\n') + '\r\n\r\n');
      up.write(head);
      socket.pipe(up).pipe(socket);
    });
    up.on('error', () => socket.destroy());
    socket.on('error', () => up.destroy());
  });
  server.listen(+port, () => console.log(`http://localhost:${port}  ${v.label} + flavour icons`));
}
