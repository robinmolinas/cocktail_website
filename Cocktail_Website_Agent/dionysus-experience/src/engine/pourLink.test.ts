import { describe, expect, it } from 'vitest';
import { decodePour, encodePour } from './pourLink';

const frame = async (value: unknown, kind: 'g' | 'p' = 'g') => {
  const raw = new TextEncoder().encode(JSON.stringify(value));
  const bytes = kind === 'g'
    ? new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer())
    : raw;
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return kind + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

describe('pour links', () => {
  it('round-trips {pairing, name, seed}', async () => {
    const payload = { pairing: 'creator-hero', name: 'Celeste', seed: 'galliano-gold' } as const;
    const encoded = await encodePour(payload);
    expect(encoded[0]).toBe('g');
    expect(await decodePour(encoded)).toEqual(payload);
  });

  it('carries only the three fields', async () => {
    const extra = { pairing: 'magician-outlaw', name: '', seed: null, result: { cocktailName: 'x' } } as never;
    expect(await decodePour(await encodePour(extra))).toEqual({ pairing: 'magician-outlaw', name: '', seed: null });
  });

  it('sends a name its decoder would refuse as a nameless link', async () => {
    const encoded = await encodePour({ pairing: 'creator-hero', name: 'Ada \u{1F469}\u200d\u{1F4BB}', seed: null });
    expect(await decodePour(encoded)).toEqual({ pairing: 'creator-hero', name: '', seed: null });
  });

  it('reads the plain framing too', async () => {
    expect(await decodePour(await frame({ pairing: 'sage-lover', name: 'Ada', seed: null }, 'p')))
      .toEqual({ pairing: 'sage-lover', name: 'Ada', seed: null });
  });

  it('treats an old full-result payload as broken', async () => {
    const old = { from: 'Celeste', color: '#c8102e', result: { cocktailName: 'Down the Line', ingredients: [] } };
    expect(await decodePour(await frame(old))).toBeNull();
  });

  it('treats unknown pairings, seeds, extra fields and bad names as broken', async () => {
    const ok = { pairing: 'creator-hero', name: 'Ada', seed: null };
    for (const bad of [
      { ...ok, pairing: 'hero-hero' },
      { ...ok, pairing: 'Creator-Hero' },
      { ...ok, seed: '#c8102e' },
      { ...ok, extra: 1 },
      { ...ok, name: ' Ada' },
      { ...ok, name: 'x'.repeat(41) },
      { ...ok, name: 'A\u202eda' },
      { pairing: 'creator-hero', name: 'Ada' },
      null,
      [ok],
    ]) {
      expect(await decodePour(await frame(bad))).toBeNull();
    }
  });

  it('treats garbage as broken', async () => {
    for (const bad of ['', 'g', 'gnot-base64!!', 'pAAAA', 'x' + (await encodePour({ pairing: 'creator-hero', name: '', seed: null })).slice(1)]) {
      expect(await decodePour(bad)).toBeNull();
    }
  });
});
