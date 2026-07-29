import type { Answers, CocktailResult } from '../types';

// Phase D: the cocktail within you, presented as a keepsake scroll.
// "Save the keepsake" prints only this scroll (see @media print rules).

interface CocktailRevealProps {
  result: CocktailResult;
  answers: Answers;
  onRestart: () => void;
}

export default function CocktailReveal({ result, answers, onRestart }: CocktailRevealProps) {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div id="keepsake" className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-32 pt-24 sm:px-8 sm:pt-28">
      {/* ---------- masthead ---------- */}
      <header className="relative mb-14 text-center sm:mb-20">
        <div className="seal-stamp font-mincho mx-auto mb-8 flex h-16 w-16 rotate-2 items-center justify-center bg-[#c43c1e] text-3xl text-[#f4efe6] shadow-lg shadow-[#c43c1e]/30">
          盃
        </div>
        <p className="q-rise text-[11px] uppercase tracking-[0.45em] text-[#16140f]/50">
          The cocktail within you
        </p>
        <h1
          className="q-rise mx-auto mt-5 max-w-4xl font-playfair italic text-5xl leading-[1.05] text-[#16140f] sm:text-7xl"
          style={{ animationDelay: '150ms' }}
        >
          {result.cocktailName}
        </h1>
        <p className="q-rise mt-6 text-sm uppercase tracking-[0.3em] text-[#c43c1e]" style={{ animationDelay: '300ms' }}>
          {result.tagline}
        </p>
        <p className="q-rise mt-2 text-xs tracking-[0.2em] text-[#16140f]/40" style={{ animationDelay: '360ms' }}>
          {date} · {result.zeroProof ? 'spiritless by design' : result.flavorArc}
        </p>
      </header>

      {/* ---------- archetype ---------- */}
      <section className="q-rise mx-auto mb-16 max-w-2xl border-y border-[#16140f]/15 py-8 text-center sm:mb-20" style={{ animationDelay: '420ms' }}>
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#16140f]/45">Your archetype</p>
        <h2 className="mt-3 font-playfair italic text-3xl text-[#16140f] sm:text-4xl">{result.archetypeName}</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#16140f]/40">
          {result.primary} · crossed with · {result.secondary}
        </p>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#16140f]/70 sm:text-base">
          {result.archetypeEssence}
        </p>
      </section>

      {/* ---------- recipe grid ---------- */}
      <div className="mb-16 grid gap-10 sm:mb-20 md:grid-cols-5 md:gap-12">
        {/* portrait placeholder + glass note */}
        <aside className="md:col-span-2">
          <div className="q-rise" style={{ animationDelay: '500ms' }}>
            <div className="ai-portrait relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden border border-dashed border-[#16140f]/30 p-8 text-center">
              <div
                className="portrait-blot absolute inset-0 opacity-[0.07]"
                style={{ background: `radial-gradient(ellipse at 50% 38%, ${answers.color}, transparent 65%)` }}
              />
              <span className="font-mincho text-4xl text-[#16140f]/25">絵</span>
              <p className="mt-4 font-playfair italic text-lg text-[#16140f]/55">
                The artist is still painting.
              </p>
              <p className="mt-2 text-xs leading-relaxed tracking-wide text-[#16140f]/40">
                An AI-rendered portrait of “{result.cocktailName}” will be set into this frame.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-[#16140f]/65">
              <span
                className="inline-block h-5 w-5 shrink-0 rounded-full"
                style={{ background: `radial-gradient(circle at 38% 32%, ${answers.color}, #16140f 150%)` }}
              />
              <span>
                Served {result.glassware}, carrying your {result.colorName}.
              </span>
            </div>
          </div>
        </aside>

        {/* ingredients + procedure */}
        <div className="md:col-span-3">
          <section className="q-rise" style={{ animationDelay: '560ms' }}>
            <h3 className="mb-6 flex items-baseline gap-4 font-playfair italic text-2xl text-[#16140f] sm:text-3xl">
              Ingredients
              <span className="h-px flex-1 bg-[#16140f]/15" />
            </h3>
            <ul className="flex flex-col gap-4">
              {result.ingredients.map((ing) => (
                <li key={ing.item} className="flex items-baseline gap-4">
                  <span className="w-24 shrink-0 text-right text-sm font-medium tabular-nums text-[#c43c1e] sm:w-28">
                    {ing.amount || '·'}
                  </span>
                  <div>
                    <p className="text-[15px] text-[#16140f] sm:text-base">{ing.item}</p>
                    {ing.note && <p className="mt-0.5 text-xs italic leading-relaxed text-[#16140f]/45">{ing.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="q-rise mt-12" style={{ animationDelay: '640ms' }}>
            <h3 className="mb-6 flex items-baseline gap-4 font-playfair italic text-2xl text-[#16140f] sm:text-3xl">
              The Ritual
              <span className="h-px flex-1 bg-[#16140f]/15" />
            </h3>
            <ol className="flex flex-col gap-4">
              {result.procedure.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-playfair italic text-lg text-[#16140f]/35">{i + 1}.</span>
                  <p className="pt-0.5 text-[15px] leading-relaxed text-[#16140f]/85 sm:text-base">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* ---------- why you ---------- */}
      <section className="q-rise mx-auto max-w-2xl" style={{ animationDelay: '720ms' }}>
        <h3 className="mb-2 text-center text-[11px] uppercase tracking-[0.45em] text-[#16140f]/45">
          Why you — and why this was made for you
        </h3>
        <div className="mx-auto mb-8 h-px w-16 bg-[#c43c1e]/60" />
        <div className="flex flex-col gap-6">
          {result.whyYou.map((para) => (
            <p key={para.slice(0, 40)} className="text-[15px] leading-[1.85] text-[#16140f]/80 first-letter:float-left first-letter:mr-2 first-letter:font-playfair first-letter:text-4xl first-letter:italic first-letter:leading-[0.9] sm:text-base">
              {para}
            </p>
          ))}
        </div>
        <p className="mt-10 text-center font-playfair italic text-xl text-[#16140f]/70">
          — Dionysus
        </p>
      </section>

      {/* ---------- actions ---------- */}
      <footer className="mt-16 flex flex-col items-center gap-5 print:hidden sm:mt-20">
        <button type="button" onClick={() => window.print()} className="btn-ink">
          Save your keepsake (PDF)
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="text-xs uppercase tracking-[0.3em] text-[#16140f]/50 transition-colors hover:text-[#16140f] cursor-pointer py-2"
        >
          Begin anew
        </button>
      </footer>
    </div>
  );
}
