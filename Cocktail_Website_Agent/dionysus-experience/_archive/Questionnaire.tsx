import { useMemo, useState } from 'react';
import type { Answers } from '../types';
import {
  ANSWER_STYLES, CHILDHOOD_SETTINGS, GENDERS, SELF_SCALES,
  PERSONALITY_TRAITS, INTERPERSONAL_TRAITS, WORK_TRAITS,
  EMOTIONAL_TRAITS, CREATIVITY_TRAITS, MOOD_SCALES,
  STYLE_OPTIONS, FREQUENCY_OPTIONS, FLAVOR_OPTIONS, DRINK_SCALES,
  KANJI_NUMERALS, ROMAN_NUMERALS, CHAPTER_TITLES,
} from '../data/questions';
import { PillGroup, MultiPillGroup, InkSlider, TextInput, InkTextArea, ColorDrop, Field } from './controls';
import GlassProgress from './GlassProgress';

interface QuestionnaireProps {
  answers: Answers;
  onUpdate: (patch: Partial<Answers>) => void;
  /** wraps a page swap in the ink-flood transition */
  transition: (swap: () => void) => void;
  onComplete: () => void;
}

// page 0 = prologue (name), pages 1..6 = the six chapters
export default function Questionnaire({ answers, onUpdate, transition, onComplete }: QuestionnaireProps) {
  const [page, setPage] = useState(0);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [highest, setHighest] = useState(0);

  const markTouched = (id: string) => {
    setTouched((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const setSelf = (id: string, v: number) => {
    markTouched(`self:${id}`);
    onUpdate({ selfScales: { ...answers.selfScales, [id]: v } });
  };
  const setMood = (id: string, v: number) => {
    markTouched(`mood:${id}`);
    onUpdate({ moodScales: { ...answers.moodScales, [id]: v } });
  };
  const setDrink = (id: string, v: number) => {
    markTouched(`drink:${id}`);
    onUpdate({ drinkScales: { ...answers.drinkScales, [id]: v } });
  };

  // ---- progress: every answered stroke raises the liquid ----
  const progress = useMemo(() => {
    let done = 0;
    let total = 0;
    const item = (filled: boolean) => {
      total += 1;
      if (filled) done += 1;
    };
    item(answers.name.trim().length > 0);
    item(!!answers.answerStyle);
    item(!!answers.childhood);
    item(answers.city.trim().length > 0);
    item(answers.age.trim().length > 0);
    item(!!answers.gender);
    item(answers.colorTouched || highest > 2);
    for (const s of SELF_SCALES) item(touched.has(`self:${s.id}`) || highest > 3);
    item(!!answers.personality);
    item(!!answers.interpersonal);
    item(!!answers.workEthic);
    item(!!answers.emotional);
    item(!!answers.creativity);
    for (const s of MOOD_SCALES) item(touched.has(`mood:${s.id}`) || highest > 5);
    item(answers.styles.length > 0);
    item(!!answers.frequency);
    item(answers.flavors.length > 0);
    for (const s of DRINK_SCALES) item(touched.has(`drink:${s.id}`));
    return done / total;
  }, [answers, touched, highest]);

  // ---- validation ----
  const missing = useMemo(() => {
    switch (page) {
      case 0: return answers.name.trim() ? 0 : 1;
      case 1: return (answers.answerStyle ? 0 : 1) + (answers.childhood ? 0 : 1) + (answers.city.trim() ? 0 : 1);
      case 2: return (answers.age.trim() ? 0 : 1) + (answers.gender ? 0 : 1);
      case 3: return 0;
      case 4: return (answers.personality ? 0 : 1) + (answers.interpersonal ? 0 : 1) + (answers.workEthic ? 0 : 1);
      case 5: return (answers.emotional ? 0 : 1) + (answers.creativity ? 0 : 1);
      case 6: return (answers.styles.length ? 0 : 1) + (answers.frequency ? 0 : 1) + (answers.flavors.length ? 0 : 1);
      default: return 0;
    }
  }, [page, answers]);

  const goTo = (next: number) => {
    transition(() => {
      setPage(next);
      setHighest((h) => Math.max(h, next));
    });
  };

  const advance = () => {
    if (missing > 0) return;
    if (page === 6) {
      // accept the resting positions of any untouched final sliders
      setTouched((prev) => {
        const next = new Set(prev);
        for (const s of DRINK_SCALES) next.add(`drink:${s.id}`);
        return next;
      });
      onComplete();
      return;
    }
    goTo(page + 1);
  };

  const chapterIdx = page - 1;

  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-40 pt-24 sm:px-8 sm:pt-28">
      {page === 0 ? (
        <Prologue answers={answers} onUpdate={onUpdate} onBegin={advance} />
      ) : (
        <div key={page}>
          {/* chapter header */}
          <header className="relative mb-10 sm:mb-14">
            <span
              aria-hidden="true"
              className="font-mincho pointer-events-none absolute -top-14 -right-2 select-none text-[10rem] leading-none text-[#16140f]/[0.055] sm:-top-20 sm:text-[15rem]"
            >
              {KANJI_NUMERALS[chapterIdx]}
            </span>
            <p className="q-rise mb-3 text-[11px] uppercase tracking-[0.45em] text-[#16140f]/45">
              Chapter {ROMAN_NUMERALS[chapterIdx]} of VI
            </p>
            <h2 className="q-rise font-playfair italic text-4xl text-[#16140f] sm:text-5xl" style={{ animationDelay: '80ms' }}>
              {CHAPTER_TITLES[chapterIdx].title}
            </h2>
            <p className="q-rise mt-3 max-w-md text-sm leading-relaxed text-[#16140f]/60 sm:text-base" style={{ animationDelay: '160ms' }}>
              {CHAPTER_TITLES[chapterIdx].sub}
            </p>
            <div className="q-rise mt-6 h-px w-24 bg-gradient-to-r from-[#16140f]/60 to-transparent" style={{ animationDelay: '220ms' }} />
          </header>

          <div className="flex flex-col gap-10 sm:gap-12">
            {page === 1 && (
              <>
                <Field label="How will you answer tonight?" hint="Choose the voice that will speak for you." delay={240}>
                  <PillGroup options={ANSWER_STYLES} value={answers.answerStyle} onChange={(v) => onUpdate({ answerStyle: v })} columns="wide" />
                </Field>
                <Field label="Where did your story begin?" hint="The setting of your childhood." delay={320}>
                  <PillGroup options={CHILDHOOD_SETTINGS} value={answers.childhood} onChange={(v) => onUpdate({ childhood: v })} />
                </Field>
                <Field label="And where does it unfold now?" hint="The city that currently keeps you." delay={400}>
                  <TextInput value={answers.city} onChange={(v) => onUpdate({ city: v })} placeholder="e.g. Kyoto, Paris, Buenos Aires…" />
                </Field>
              </>
            )}

            {page === 2 && (
              <>
                <Field label="How many years into the story are you?" delay={240}>
                  <div className="max-w-[140px]">
                    <TextInput type="number" value={answers.age} onChange={(v) => onUpdate({ age: v })} placeholder="…" center />
                  </div>
                </Field>
                <Field label="How do you identify?" delay={320}>
                  <PillGroup options={GENDERS} value={answers.gender} onChange={(v) => onUpdate({ gender: v })} />
                </Field>
                <Field
                  label="If one colour had to stand for all of you"
                  hint="Touch the large drop for the full spectrum, or take a prepared ink."
                  delay={400}
                >
                  <ColorDrop value={answers.color} onChange={(v) => onUpdate({ color: v, colorTouched: true })} />
                </Field>
              </>
            )}

            {page === 3 && (
              <div className="flex flex-col gap-1">
                {SELF_SCALES.map((s, i) => (
                  <div key={s.id} className="q-rise" style={{ animationDelay: `${240 + i * 45}ms` }}>
                    <InkSlider left={s.left} right={s.right} value={answers.selfScales[s.id] ?? 50} onChange={(v) => setSelf(s.id, v)} />
                  </div>
                ))}
              </div>
            )}

            {page === 4 && (
              <>
                <Field label="I see myself as someone who…" delay={240}>
                  <PillGroup options={PERSONALITY_TRAITS} value={answers.personality} onChange={(v) => onUpdate({ personality: v })} />
                </Field>
                <Field label="Among others, I am someone who…" delay={320}>
                  <PillGroup options={INTERPERSONAL_TRAITS} value={answers.interpersonal} onChange={(v) => onUpdate({ interpersonal: v })} />
                </Field>
                <Field label="When there is work to be done, I…" delay={400}>
                  <PillGroup options={WORK_TRAITS} value={answers.workEthic} onChange={(v) => onUpdate({ workEthic: v })} />
                </Field>
              </>
            )}

            {page === 5 && (
              <>
                <Field label="Your emotional weather, most days" delay={240}>
                  <PillGroup options={EMOTIONAL_TRAITS} value={answers.emotional} onChange={(v) => onUpdate({ emotional: v })} />
                </Field>
                <Field label="And your creative current" delay={320}>
                  <PillGroup options={CREATIVITY_TRAITS} value={answers.creativity} onChange={(v) => onUpdate({ creativity: v })} />
                </Field>
                <Field label="Let the brush rest where it feels true" hint="Mood and style: there are no right places." delay={400}>
                  <div className="flex flex-col gap-1">
                    {MOOD_SCALES.map((s, i) => (
                      <div key={s.id} className="q-rise" style={{ animationDelay: `${440 + i * 45}ms` }}>
                        <InkSlider left={s.left} right={s.right} value={answers.moodScales[s.id] ?? 50} onChange={(v) => setMood(s.id, v)} />
                      </div>
                    ))}
                  </div>
                </Field>
              </>
            )}

            {page === 6 && (
              <>
                <Field label="How the world sees you dressed" hint="Choose up to three." delay={240}>
                  <MultiPillGroup options={STYLE_OPTIONS} values={answers.styles} onChange={(v) => onUpdate({ styles: v })} max={3} accent={answers.color} />
                </Field>
                <Field label="How often does a cocktail find you?" delay={300}>
                  <PillGroup options={FREQUENCY_OPTIONS} value={answers.frequency} onChange={(v) => onUpdate({ frequency: v })} accent={answers.color} />
                </Field>
                <Field label="What should the glass hold?" hint="The flavours you crave, up to three." delay={360}>
                  <MultiPillGroup options={FLAVOR_OPTIONS} values={answers.flavors} onChange={(v) => onUpdate({ flavors: v })} max={3} accent={answers.color} />
                </Field>
                <Field label="The character of the drink itself" delay={420}>
                  <div className="flex flex-col gap-1">
                    {DRINK_SCALES.map((s, i) => (
                      <div key={s.id} className="q-rise" style={{ animationDelay: `${460 + i * 45}ms` }}>
                        <InkSlider left={s.left} right={s.right} value={answers.drinkScales[s.id] ?? 50} onChange={(v) => setDrink(s.id, v)} />
                      </div>
                    ))}
                  </div>
                </Field>
                <Field label="Anything your body forbids?" hint="Allergies, dietary restrictions: we craft around them, always." delay={480}>
                  <TextInput value={answers.allergies} onChange={(v) => onUpdate({ allergies: v })} placeholder="e.g. nuts, gluten, citrus… or leave blank" />
                </Field>
                <Field
                  label="One last confidence"
                  hint="A memory, a flavour you loved once, a place you carry: anything you wish the ink to know."
                  optional
                  delay={540}
                >
                  <InkTextArea value={answers.insight} onChange={(v) => onUpdate({ insight: v })} placeholder="The summer my grandmother kept figs on the windowsill…" />
                </Field>
              </>
            )}
          </div>

          {/* navigation */}
          <footer className="mt-14 flex items-center justify-between gap-4 sm:mt-16">
            <button
              type="button"
              onClick={() => (page > 1 ? goTo(page - 1) : goTo(0))}
              className="text-xs uppercase tracking-[0.3em] text-[#16140f]/50 transition-colors hover:text-[#16140f] cursor-pointer py-3"
            >
              ← Back
            </button>
            <div className="flex items-center gap-4">
              {missing > 0 && (
                <span className="font-playfair italic text-sm text-[#16140f]/45">
                  {missing} stroke{missing > 1 ? 's' : ''} still missing
                </span>
              )}
              <button type="button" onClick={advance} disabled={missing > 0} className="btn-ink">
                {page === 6 ? 'Distill me' : 'Turn the page'}
              </button>
            </div>
          </footer>
        </div>
      )}

      <GlassProgress
        progress={progress}
        color={answers.color}
        chapter={page === 0 ? '· · ·' : `${ROMAN_NUMERALS[chapterIdx]} · VI`}
      />
    </div>
  );
}

/* ------------------------------- prologue ---------------------------------- */

function Prologue({
  answers,
  onUpdate,
  onBegin,
}: {
  answers: Answers;
  onUpdate: (patch: Partial<Answers>) => void;
  onBegin: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="q-rise text-[11px] uppercase tracking-[0.45em] text-[#16140f]/45">Prologue</p>
      <h2 className="q-rise mt-4 font-playfair italic text-4xl leading-tight text-[#16140f] sm:text-6xl" style={{ animationDelay: '100ms' }}>
        Before the ink stirs,
        <br />
        tell us your name.
      </h2>
      <p className="q-rise mt-5 max-w-sm text-sm leading-relaxed text-[#16140f]/60 sm:text-base" style={{ animationDelay: '200ms' }}>
        Nineteen questions. Six turned pages. At the end — the one cocktail
        that was always yours. Your answers stay in this room; nothing leaves it.
      </p>
      <div className="q-rise mt-10 w-full max-w-xs" style={{ animationDelay: '300ms' }}>
        <TextInput value={answers.name} onChange={(v) => onUpdate({ name: v })} placeholder="Inscribe your name…" center />
      </div>
      <div className="q-rise mt-8" style={{ animationDelay: '400ms' }}>
        <button type="button" onClick={onBegin} disabled={!answers.name.trim()} className="btn-ink">
          Open Chapter One
        </button>
      </div>
    </div>
  );
}
