// Where the Velvet Rope hangs (master spec §3). Kept out of the component file
// so the rope stays a pure component (fast-refresh boundary).
//
// This is deliberately NOT a phone check: H3 and H5 carry portrait presets and
// the phone journey is meant to run. It catches only frames too small for the
// holds' composed scenes to be honest — tiny/legacy viewports.
export const isUnsupportedViewport = (): boolean =>
  typeof window !== 'undefined' && (window.innerWidth < 320 || window.innerHeight < 440);
