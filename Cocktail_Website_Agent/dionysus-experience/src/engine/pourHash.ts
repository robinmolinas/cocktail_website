// The #pour= fragment, read without the link's schema. App needs this on the
// landing's first frame (which door opens), so it lives apart from
// pourLink.ts: that module carries zod and the vocabularies, which load only
// on the way to a gift or the reveal.

/** The pour carried by the current URL, if any. */
export function pourFromLocation(): string | null {
  const m = window.location.hash.match(/^#pour=(.+)$/);
  return m ? m[1] : null;
}
