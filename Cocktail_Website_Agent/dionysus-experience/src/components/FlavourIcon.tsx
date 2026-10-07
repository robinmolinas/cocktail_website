// H6 flavour marks — one hairline family on a 24-unit grid. Shown at 26–32px,
// so the stroke is 1.1 grid units (≈1.2–1.5px): a hairline at either size.
// Source SVGs and rules: design-artifacts/2026-10-06-type-icons-sound/icons/.
// The word carries the meaning; the mark only speeds recognition, so it is
// always aria-hidden and never shown without its word.

const MARKS: Record<string, string> = {
  sweet: '<path d="M12 5.2 18.5 8.5v7.2L12 19 5.5 15.7V8.5Z"/><path d="M5.5 8.5 12 11.8l6.5-3.3M12 11.8V19"/><circle cx="19.6" cy="19.4" r=".35" fill="currentColor"/><circle cx="17.6" cy="20.6" r=".3" fill="currentColor"/>',
  bitter: '<path d="M10.6 3.5h2.8M11 3.5v2.2h2V3.5"/><path d="M10.4 5.7h3.2l.6 2.2c2 .6 3.2 2.2 3.2 4.3v6.6a2 2 0 0 1-2 2H8.6a2 2 0 0 1-2-2v-6.6c0-2.1 1.2-3.7 3.2-4.3Z"/><path d="M8.8 13h6.4v4H8.8Z"/>',
  spicy: '<path d="M15.6 7.4c1.9 1 2.4 3 1.7 5.3-1.4 4.6-6 7.6-11.8 8.1 3.6-2.3 6-5.2 6.9-8.8.5-2.2 1.4-4 3.2-4.6Z"/><path d="M12.6 9.6c.6-1.3 1.7-2.2 3-2.2M15.6 7.4c.2-1.5 1-2.7 2.4-3.6"/>',
  herbal: '<path d="M11 21.5c.4-6 1.6-11.6 4.2-17"/><path d="M11.4 16.6c-3.2.4-5.4-1-6.2-3.6 3-.6 5.3.6 6.2 3.6ZM12.2 12.6c.9-2.9 3.1-4.4 6.2-4.1-.6 2.8-2.9 4.3-6.2 4.1ZM13.1 9.4c-2.6-.3-4.1-1.9-4.3-4.3 2.5 0 4.1 1.6 4.3 4.3ZM15.2 4.5c.7-1 1.8-1.5 3-1.4-.4 1.2-1.5 1.8-3 1.4Z"/>',
  fruity: '<circle cx="7.8" cy="17" r="3.4"/><circle cx="16.4" cy="18" r="3.4"/><path d="M7.8 13.6c.8-4 2.6-7.1 5.4-9.1M16.4 14.6c-.5-4.1-1.6-7.4-3.2-10.1"/><path d="M13.2 4.5c1.9-1.5 4.3-1.6 6.3-.4-1.6 1.8-4 2.2-6.3.4Z"/>',
  citrusy: '<path d="M3.5 10.5a8.5 8.5 0 0 0 17 0Z"/><path d="M5.7 10.5a6.3 6.3 0 0 0 12.6 0"/><path d="M12 10.5v6.3M12 10.5l-4.45 4.45M12 10.5l4.45 4.45"/>',
  fresh: '<path d="M10.6 4.6c3 3.9 4.9 6.7 4.9 9.2a4.9 4.9 0 0 1-9.8 0c0-2.5 1.9-5.3 4.9-9.2Z"/><path d="M8.5 14.4c.2 1.2.9 2 2 2.3"/><path d="M18.4 15.2c.9 1.2 1.4 2 1.4 2.7a1.4 1.4 0 0 1-2.8 0c0-.7.5-1.5 1.4-2.7Z"/>',
  floral: '<circle cx="12" cy="12" r="1.9"/><path d="M12 10.1c-1.6-1.8-1.9-4.4 0-6.1 1.9 1.7 1.6 4.3 0 6.1ZM13.8 11.4c.5-2.3 2.6-4 5.1-3.5-.1 2.6-2.3 4-5.1 3.5ZM13.1 13.6c2.4.3 4.2 2.2 4 4.8-2.6.1-4.2-1.9-4-4.8ZM10.9 13.6c.2 2.9-1.4 4.9-4 4.8-.2-2.6 1.6-4.5 4-4.8ZM10.2 11.4c-2.8.5-5-.9-5.1-3.5 2.5-.5 4.6 1.2 5.1 3.5Z"/>',
  smoky: '<path d="M6 20.5h12"/><path d="M9.2 17.6c-1.4-1.8-1.3-3.6.2-5.3 1.5-1.7 1.6-3.4.3-5.3M13 17.6c-1.2-2.1-.9-4.1.7-6 1.5-1.8 1.4-3.8-.1-6M16.4 17.6c-.9-1.4-.8-2.8.3-4.1"/>',
};

export function FlavourIcon({ name }: { name: string }) {
  const mark = MARKS[name.toLowerCase()];
  if (!mark) return null;
  return (
    <svg
      className="flavour-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: mark }}
    />
  );
}
