// The house call-to-action: the "Cross the Threshold" pill, extracted so every
// CTA on the site is the same object — frosted glass, vermilion sweep on
// hover, arrow leading onward. Landing, keepsake, and gift all use this.

export default function CtaButton({ onClick, children, arrow = true }: {
  onClick?: () => void;
  children: React.ReactNode;
  /** the arrow marks actions that lead somewhere; save/copy actions drop it */
  arrow?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative isolate transform-gpu flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-[#f5ead8] text-sm tracking-wide font-medium px-8 py-4 rounded-full transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/10 hover:border-[#e8702a]/60 hover:shadow-[0_0_30px_-5px_rgba(232,112,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8702a] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent cursor-pointer overflow-hidden"
    >
      {/* the sweep is rounded and GPU-composited itself, so its slide never
          clips against the pill's curved border (the left-edge artifact) */}
      <div className="absolute inset-0 rounded-full transform-gpu bg-gradient-to-r from-[#e8702a]/0 via-[#e8702a]/20 to-[#e8702a]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <svg className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1 text-[#e8702a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
    </button>
  );
}
