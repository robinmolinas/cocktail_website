// The #pour= fragment, read without the link's schema. App needs this on the
// landing's first frame (which door opens), so it lives apart from
// pourLink.ts: that module carries zod and the vocabularies, which load only
// on the way to a gift or the reveal.

/** The pour carried by the current URL, if any. */
export function pourFromLocation(): string | null {
  const m = window.location.hash.match(/^#pour=(.+)$/);
  return m ? m[1] : null;
}

/** A keep link (the owner's own copy) marks its pour with one leading 'k'. */
export const KEEP_MARK = 'k';

/** Whether the current URL is the owner's keep link rather than a gift. */
export function keptFromLocation(): boolean {
  return pourFromLocation()?.startsWith(KEEP_MARK) ?? false;
}
