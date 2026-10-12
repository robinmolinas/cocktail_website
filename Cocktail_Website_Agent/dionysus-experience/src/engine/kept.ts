// The pours this device has seen poured for its owner. When a #pour= link opens
// on the device that made it, the guest at the door is the owner: they sent
// "Share your cocktail" to themselves (user test, 2026-10-12), and the room
// should hand them back the whole reading, not the friend's half.
//
// Only the link's own three fields are kept, never answers or a reading, and
// only in this browser. Any storage failure (private mode, quota, disabled)
// simply means the device remembers nothing.

type KeptPour = { pairing: string; name: string; seed: string | null };

const KEY = 'dionysus.kept';
const LIMIT = 12;

const same = (a: KeptPour, b: KeptPour) => a.pairing === b.pairing && a.name === b.name && a.seed === b.seed;

const storage = (): Storage | null => {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
};

function read(store: Storage | null): KeptPour[] {
  try {
    const list: unknown = JSON.parse(store?.getItem(KEY) ?? '[]');
    return Array.isArray(list)
      ? list.filter((p): p is KeptPour => !!p && typeof p.pairing === 'string' && typeof p.name === 'string'
        && (p.seed === null || typeof p.seed === 'string'))
      : [];
  } catch {
    return [];
  }
}

/** Remember a pour as this device's own (most recent first). */
export function rememberPour(pour: KeptPour, store: Storage | null = storage()): void {
  const entry = { pairing: pour.pairing, name: pour.name, seed: pour.seed };
  try {
    store?.setItem(KEY, JSON.stringify([entry, ...read(store).filter((p) => !same(p, entry))].slice(0, LIMIT)));
  } catch {
    /* the device simply forgets */
  }
}

/** Whether this device has seen the pour poured for its owner. */
export function isRememberedPour(pour: KeptPour, store: Storage | null = storage()): boolean {
  return read(store).some((p) => same(p, pour));
}

/** The device's most recent pour, if any. */
export function lastRememberedPour(store: Storage | null = storage()): KeptPour | null {
  return read(store)[0] ?? null;
}
