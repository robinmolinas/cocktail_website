// The house call-to-action: one frosted pill for every door on the site —
// landing, keepsake, gift, 404. Vermilion sweep on hover, arrow leading onward.
// Styles live in index.css (.cta) so the pill shares the journey's tokens.

type Icon = 'arrow' | 'share' | 'save' | 'none';

export default function CtaButton({ onClick, children, arrow = true, icon }: {
  onClick?: () => void;
  children: React.ReactNode;
  /** the arrow marks actions that lead somewhere; save/copy actions drop it */
  arrow?: boolean;
  /** overrides `arrow` — share and save carry their own glyph */
  icon?: Icon;
}) {
  const glyph: Icon = icon ?? (arrow ? 'arrow' : 'none');
  return (
    <button type="button" onClick={onClick} className="cta group">
      {/* the sweep is rounded and GPU-composited itself, so its slide never
          clips against the pill's curved border (the left-edge artifact) */}
      <span className="cta-sweep" aria-hidden="true" />
      <span className="cta-label">{children}</span>
      {glyph === 'arrow' && (
        <svg className="cta-icon cta-icon-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
      {glyph === 'share' && (
        <svg className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v6.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V12" />
        </svg>
      )}
      {glyph === 'save' && (
        <svg className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M5 17v1.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V17" />
        </svg>
      )}
    </button>
  );
}
