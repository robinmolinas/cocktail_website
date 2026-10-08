// The shared pour: until /pour/:id persistence exists (master spec §2), the
// keepsake travels inside the link itself, gzip-compressed and
// base64url-encoded into the URL fragment (#pour=...). The fragment never
// reaches a server, so the keepsake stays private to whoever holds the link;
// any static host works.
//
// Payload (AD-10): `{pairing, name, seed}` and nothing else. The friend's view
// is assembled from the authored store by pairing, so the link carries no
// cocktail and no reading.
//
// Format: one version character, then the base64url payload.
//   'g' — gzip via CompressionStream (the normal path)
//   'p' — plain UTF-8 (fallback for browsers without CompressionStream)
// decodePour is tolerant: any failure returns null and the app opens as the
// plain invitation instead — a broken link must never strand a guest. An old
// full-result payload, an unknown pairing or any extra field counts as broken.

import { z } from 'zod';
import { SEEDS, type SeedKey } from '../../shared/answers';
import { isPairingKey, type PairingKey } from '../../shared/pairing';

export interface PourPayload {
  pairing: PairingKey;
  /** the sharer's name, as inked on the tag ('' = a nameless soul) */
  name: string;
  /** the sharer's seed colour id; null when she never chose one */
  seed: SeedKey | null;
}

// Control, format (zero-width, bidi override, BOM) and line/paragraph separators.
const CONTROL_CHAR = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u;
const SEED_IDS = SEEDS.map((seed) => seed.id) as unknown as readonly [SeedKey, ...SeedKey[]];

export const PourPayloadSchema = z.strictObject({
  pairing: z.string().refine(isPairingKey, { message: 'Unknown pairing' }),
  name: z
    .string()
    .refine((name) => name === name.trim(), { message: 'Name must be trimmed' })
    .refine((name) => [...name].length <= 40, { message: 'Name must be at most 40 characters' })
    .refine((name) => !CONTROL_CHAR.test(name), { message: 'Name must not contain control characters' }),
  seed: z.enum(SEED_IDS).nullable(),
});

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
  // only the three fields travel, whatever else the caller's object holds
  const { pairing, seed } = payload;
  // a name the decoder would refuse (e.g. an emoji's zero-width joiner)
  // travels as '' rather than breaking the friend's link
  const name = PourPayloadSchema.shape.name.safeParse(payload.name).success ? payload.name : '';
  const raw = new TextEncoder().encode(JSON.stringify({ pairing, name, seed }));
  if (typeof CompressionStream !== 'undefined') {
    return 'g' + b64url(await pipe(raw, new CompressionStream('gzip')));
  }
  return 'p' + b64url(raw);
}

export async function decodePour(encoded: string): Promise<PourPayload | null> {
  try {
    const kind = encoded[0];
    if (kind !== 'g' && kind !== 'p') return null;
    const bytes = unb64url(encoded.slice(1));
    const raw = kind === 'g' ? await pipe(bytes, new DecompressionStream('gzip')) : bytes;
    const parsed = PourPayloadSchema.safeParse(JSON.parse(new TextDecoder().decode(raw)));
    if (!parsed.success) return null;
    return { pairing: parsed.data.pairing as PairingKey, name: parsed.data.name, seed: parsed.data.seed };
  } catch {
    return null;
  }
}

/** The full share link for the current origin (hash fragment carries the pour). */
export async function pourLinkFor(payload: PourPayload): Promise<string> {
  return `${window.location.origin}/#pour=${await encodePour(payload)}`;
}

export { pourFromLocation } from './pourHash';
