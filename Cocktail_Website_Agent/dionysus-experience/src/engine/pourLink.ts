// The shared pour: until /pour/:id persistence exists (master spec §2), the
// keepsake travels inside the link itself — the full CocktailResult plus the
// sharer's name and seed colour, gzip-compressed and base64url-encoded into
// the URL fragment (#pour=...). The fragment never reaches a server, so the
// keepsake stays private to whoever holds the link; any static host works.
//
// Format: one version character, then the base64url payload.
//   'g' — gzip via CompressionStream (the normal path)
//   'p' — plain UTF-8 (fallback for browsers without CompressionStream)
// decodePour is tolerant: any failure returns null and the app opens as the
// plain invitation instead — a broken link must never strand a guest.

import type { CocktailResult } from '../types';

export interface PourPayload {
  /** the sharer's name, as inked on the tag ('' = a nameless soul) */
  from: string;
  /** the sharer's seed colour (hex) — the ink the gift arrives in */
  color: string;
  result: CocktailResult;
}

const b64url = (bytes: Uint8Array): string => {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const unb64url = (s: string): Uint8Array => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
};

const pipe = async (bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> => {
  const src = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(src).arrayBuffer());
};

export async function encodePour(payload: PourPayload): Promise<string> {
  const raw = new TextEncoder().encode(JSON.stringify(payload));
  if (typeof CompressionStream !== 'undefined') {
    return 'g' + b64url(await pipe(raw, new CompressionStream('gzip')));
  }
  return 'p' + b64url(raw);
}

export async function decodePour(encoded: string): Promise<PourPayload | null> {
  try {
    const kind = encoded[0];
    const bytes = unb64url(encoded.slice(1));
    const raw = kind === 'g' ? await pipe(bytes, new DecompressionStream('gzip')) : bytes;
    const payload = JSON.parse(new TextDecoder().decode(raw)) as PourPayload;
    // just enough shape-checking to trust the render path
    if (typeof payload?.result?.cocktailName !== 'string' || !Array.isArray(payload.result.ingredients)) return null;
    return { from: String(payload.from ?? ''), color: String(payload.color ?? '#e8702a'), result: payload.result };
  } catch {
    return null;
  }
}

/** The full share link for the current origin (hash fragment carries the pour). */
export async function pourLinkFor(payload: PourPayload): Promise<string> {
  return `${window.location.origin}/#pour=${await encodePour(payload)}`;
}

/** The pour carried by the current URL, if any. */
export function pourFromLocation(): string | null {
  const m = window.location.hash.match(/^#pour=(.+)$/);
  return m ? m[1] : null;
}
