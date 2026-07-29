// Scatter ink at a screen position; the Suminagashi canvas listens for this.
export function splashInk(x: number, y: number, color: string) {
  window.dispatchEvent(new CustomEvent('ink-drop', { detail: { x, y, color } }));
}
