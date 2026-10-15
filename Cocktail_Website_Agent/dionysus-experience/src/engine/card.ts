// The calling card: "Keep your cocktail" → "As an image", and
// "Share your cocktail" → "Send the card" (H10).
//
// A 1080×1920 phone-shaped picture, because the camera roll is where people
// actually keep things. The persona's portrait master fills the top with the
// owner's name inked on its own paper tag, exactly as the room inks it. The
// type sits below on the night itself, never on the photograph and never on
// a dark patch (no dark behind text), and a small paper label carries a QR code:
// a kept card's to the keep link, so the picture is also the way back to the
// reading; a shared card's to the gift link, which keeps the reading private.
//
// Sacred Glass Rule: the photograph is never tinted. Its foot only darkens into
// the night, above the type. The seed colour appears as light: the inked
// name, the hairline and the dedication.
import qrcode from 'qrcode-generator';
import type { Reading } from '../../shared/reading';

const W = 1080;
const H = 1920;
const PHOTO_H = 1350;
const M = 96; // side margin
const NIGHT = '#0d0b09';
const GOLD = '#b08d57';
const TITLE = '#f2ead9';
const IVORY = '#f5ead8';
const MUTED = '#9a8f7c';
const INK = '#1a1410';

const DISPLAY = '"Playfair Display", Georgia, serif';
const LABEL = 'Jost, Futura, system-ui, sans-serif';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`card image failed: ${src}`));
    img.src = src;
  });

/** canvas letterSpacing is not everywhere yet (older Safari), so track by hand */
function tracked(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, em: number) {
  const px = parseFloat(ctx.font.match(/(\d+(?:\.\d+)?)px/)?.[1] ?? '16') * em;
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + px;
  }
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** `way`: a kept card's QR code opens the whole reading; a shared one, the gift (recipe only). */
export async function renderCard(reading: Reading, seedHex: string, url: string, way: 'keep' | 'share' = 'keep'): Promise<Blob> {
  const { cocktail, persona, archetype } = reading;
  const name = reading.name;
  await Promise.all([
    document.fonts.load(`italic 500 96px ${DISPLAY}`),
    document.fonts.load(`italic 400 36px ${DISPLAY}`),
    document.fonts.load(`500 26px ${LABEL}`),
  ]).catch(() => undefined);
  const photo = await loadImage(persona.src);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('no 2d context');

  // ---- measure first: the type takes what it needs, the photograph the rest ----
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const count = qr.getModuleCount();
  const quiet = 3;
  const cell = Math.floor(196 / (count + quiet * 2));
  const side = cell * (count + quiet * 2);
  const qx = W - M - side;
  const qy = H - 92 - side;
  const foot = qy + side;
  const footTop = foot - 92; // the dedication's cap height, above its small label

  // the cocktail's name: one line if it can hold at a readable size, else two
  let size = 104;
  ctx.font = `italic 500 ${size}px ${DISPLAY}`;
  while (size > 66 && ctx.measureText(cocktail.name).width > W - 2 * M) {
    size -= 2;
    ctx.font = `italic 500 ${size}px ${DISPLAY}`;
  }
  const titleLines = wrap(ctx, cocktail.name, W - 2 * M);
  // the glass in three words, on one line: the size gives before the line does
  const words = cocktail.words.map((w) => w.toUpperCase());
  const DOT = '   ·   ';
  let wsize = 27;
  const wordsWidth = () => {
    ctx.font = `500 ${wsize}px ${LABEL}`;
    const text = words.join(DOT);
    return ctx.measureText(text).width + [...text].length * wsize * 0.24;
  };
  while (wsize > 20 && wordsWidth() > W - 2 * M) wsize -= 1;
  ctx.font = `italic 400 36px ${DISPLAY}`;
  const wide = wrap(ctx, cocktail.tagline, W - 2 * M);
  // the tagline may run full width only while it stays above the paper label
  const block = (lines: number) => 70 + 30 + titleLines.length * size * 1.08 + 58 + 36 + 22 + lines * 48;
  const tagLines = PHOTO_H + block(wide.length) <= qy - 28 ? wide : wrap(ctx, cocktail.tagline, qx - M - 40);
  const photoH = Math.min(PHOTO_H, footTop - 40 - block(tagLines.length));

  ctx.fillStyle = NIGHT;
  ctx.fillRect(0, 0, W, H);

  // ---- the photograph: cover the top band, the crop held on the glass ----
  const iw = photo.naturalWidth;
  const ih = photo.naturalHeight;
  const scale = Math.max(W / iw, photoH / ih);
  const pw = iw * scale;
  const ph = ih * scale;
  const ox = Math.min(0, Math.max(W - pw, W / 2 - persona.glass.x * pw));
  // keep the tag (low in every portrait) clear of the foot's fall
  const tagY = persona.tag ? persona.tag.cy * ph : ph / 2;
  const oy = Math.min(0, Math.max(photoH - ph, Math.min(photoH * 0.5 - persona.glass.y * ph, photoH - 200 - tagY)));
  ctx.drawImage(photo, ox, oy, pw, ph);

  // her name on the scene's own tag, in her colour, pressed into the paper
  if (name && persona.tag) {
    const t = persona.tag;
    const w = t.w * pw;
    const ink = Math.max(Math.min(w * 0.26, (w * 1.5) / Math.max(name.length, 1)), 10);
    ctx.save();
    ctx.translate(ox + t.cx * pw, oy + t.cy * ph);
    ctx.rotate((t.angle * Math.PI) / 180);
    ctx.globalCompositeOperation = 'multiply';
    ctx.font = `italic 400 ${ink}px ${DISPLAY}`;
    ctx.fillStyle = seedHex;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, 0, 0, w);
    ctx.restore();
  }

  // the photograph's foot sinks into the night, above the type
  const fall = ctx.createLinearGradient(0, photoH - 220, 0, photoH);
  fall.addColorStop(0, 'rgba(13, 11, 9, 0)');
  fall.addColorStop(1, NIGHT);
  ctx.fillStyle = fall;
  ctx.fillRect(0, photoH - 220, W, 220);
  ctx.fillStyle = NIGHT;
  ctx.fillRect(0, photoH, W, H - photoH);

  // ---- the type ----
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  let y = photoH + 70;

  ctx.font = `500 25px ${LABEL}`;
  ctx.fillStyle = GOLD;
  tracked(ctx, archetype.name.toUpperCase(), M, y, 0.26);
  y += 30;

  ctx.font = `italic 500 ${size}px ${DISPLAY}`;
  ctx.fillStyle = TITLE;
  for (const line of titleLines) {
    y += size * 1.08;
    ctx.fillText(line, M, y);
  }

  // the glass in three words, the way a menu describes it: ivory, brass points
  y += 58;
  ctx.font = `500 ${wsize}px ${LABEL}`;
  let wx = M;
  words.forEach((word, i) => {
    if (i) {
      ctx.fillStyle = GOLD;
      tracked(ctx, DOT, wx, y, 0);
      wx += ctx.measureText(DOT).width;
    }
    ctx.fillStyle = IVORY;
    ctx.globalAlpha = 0.9;
    tracked(ctx, word, wx, y, 0.24);
    ctx.globalAlpha = 1;
    // the last letter's tracking is not part of the gap before the point
    wx += [...word].reduce((sum, ch) => sum + ctx.measureText(ch).width + wsize * 0.24, 0) - wsize * 0.24;
  });

  // the hairline, in her colour, drawn out from the margin
  y += 36;
  const rule = ctx.createLinearGradient(M, 0, M + 120, 0);
  rule.addColorStop(0, seedHex);
  rule.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = rule;
  ctx.fillRect(M, y, 120, 2);
  y += 22;

  ctx.font = `italic 400 36px ${DISPLAY}`;
  ctx.fillStyle = IVORY;
  ctx.globalAlpha = 0.93;
  for (const line of tagLines) {
    y += 48;
    ctx.fillText(line, M, y);
  }
  ctx.globalAlpha = 1;

  // ---- the paper label: a QR code back to the reading ----
  ctx.fillStyle = IVORY;
  ctx.beginPath();
  ctx.roundRect(qx, qy, side, side, 10);
  ctx.fill();
  ctx.fillStyle = INK;
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) ctx.fillRect(qx + (c + quiet) * cell, qy + (r + quiet) * cell, cell, cell);
    }
  }

  // ---- the dedication, level with the label's foot ----
  const dedication = name ? `Poured for ${name}` : 'Poured by Dionysus';
  let dsize = 40;
  ctx.font = `italic 400 ${dsize}px ${DISPLAY}`;
  while (dsize > 26 && ctx.measureText(dedication).width > qx - M - 40) {
    dsize -= 1;
    ctx.font = `italic 400 ${dsize}px ${DISPLAY}`;
  }
  ctx.fillStyle = seedHex;
  ctx.fillText(dedication, M, foot - 52, qx - M - 40);
  ctx.font = `500 21px ${LABEL}`;
  ctx.fillStyle = MUTED;
  const scan = way === 'keep' ? 'SCAN FOR THE READING' : 'SCAN FOR THE RECIPE';
  tracked(ctx, name ? `DIONYSUS · ${scan}` : scan, M, foot, 0.2);

  return new Promise<Blob>((resolve, reject) =>
    // a JPEG: a photograph sends lighter that way (WhatsApp re-encodes to one anyway)
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('card encode failed'))), 'image/jpeg', 0.9),
  );
}
