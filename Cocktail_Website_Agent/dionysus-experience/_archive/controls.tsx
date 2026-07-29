import { useId, type MouseEvent } from 'react';
import { splashInk } from './ink';

// Form controls of the rite. Every selection scatters a little ink into the pond.

const INK = '#16140f';

/* ---------------------------------- pills ---------------------------------- */

interface PillGroupProps {
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  accent?: string;
  columns?: 'wide' | 'normal';
}

export function PillGroup({ options, value, onChange, accent = '#e8702a', columns = 'normal' }: PillGroupProps) {
  const handle = (opt: string) => (e: MouseEvent<HTMLButtonElement>) => {
    onChange(opt);
    splashInk(e.clientX, e.clientY, accent);
  };
  return (
    <div className={`flex flex-wrap gap-2 ${columns === 'wide' ? 'flex-col items-stretch sm:flex-row' : ''}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={handle(opt)}
          aria-pressed={value === opt}
          className={`pill ${value === opt ? 'pill-active' : ''}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

interface MultiPillGroupProps {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
  max: number;
  accent?: string;
}

export function MultiPillGroup({ options, values, onChange, max, accent = '#e8702a' }: MultiPillGroupProps) {
  const toggle = (opt: string) => (e: MouseEvent<HTMLButtonElement>) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
      return;
    }
    if (values.length >= max) return;
    onChange([...values, opt]);
    splashInk(e.clientX, e.clientY, accent);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = values.includes(opt);
        const saturated = !active && values.length >= max;
        return (
          <button
            key={opt}
            type="button"
            onClick={toggle(opt)}
            aria-pressed={active}
            className={`pill ${active ? 'pill-active' : ''} ${saturated ? 'opacity-35 cursor-not-allowed' : ''}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------- slider ---------------------------------- */

interface InkSliderProps {
  left: string;
  right: string;
  value: number; // 0..100
  onChange: (v: number) => void;
}

export function InkSlider({ left, right, value, onChange }: InkSliderProps) {
  const id = useId();
  const t = (value - 50) / 50;
  return (
    <div className="ink-slider-row">
      <label
        htmlFor={id}
        className="ink-slider-label text-right"
        style={{ opacity: 0.45 + Math.max(0, -t) * 0.55, fontWeight: t < -0.2 ? 600 : 400 }}
      >
        {left}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        aria-label={`${left} to ${right}`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ink-range"
      />
      <label
        htmlFor={id}
        className="ink-slider-label"
        style={{ opacity: 0.45 + Math.max(0, t) * 0.55, fontWeight: t > 0.2 ? 600 : 400 }}
      >
        {right}
      </label>
    </div>
  );
}

/* ---------------------------------- text ----------------------------------- */

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  center?: boolean;
}

export function TextInput({ value, onChange, placeholder, type = 'text', center = false }: TextInputProps) {
  return (
    <input
      type={type}
      inputMode={type === 'number' ? 'numeric' : undefined}
      min={type === 'number' ? 0 : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`ink-input ${center ? 'text-center' : ''}`}
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export function InkTextArea({ value, onChange, placeholder, rows = 4 }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="ink-input resize-none leading-relaxed"
    />
  );
}

/* ------------------------------- colour drop -------------------------------- */

const PRESET_INKS = ['#e8702a', '#22577a', '#3a5a40', '#6d2e46', '#b08d57', '#16140f', '#7b2d26', '#4a4e69'];

interface ColorDropProps {
  value: string;
  onChange: (v: string) => void;
}

export function ColorDrop({ value, onChange }: ColorDropProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label
        className="relative block h-16 w-16 cursor-pointer rounded-full transition-transform hover:scale-110"
        style={{
          background: `radial-gradient(circle at 38% 32%, ${value}, ${INK} 130%)`,
          boxShadow: `0 6px 24px -6px ${value}`,
        }}
        title="Choose any colour"
      >
        <input
          type="color"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Your representative colour"
        />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[#16140f]/50">
          any ink
        </span>
      </label>
      <div className="ml-2 flex flex-wrap gap-2.5">
        {PRESET_INKS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`colour ${c}`}
            onClick={(e) => {
              onChange(c);
              splashInk(e.clientX, e.clientY, c);
            }}
            className={`h-8 w-8 rounded-full transition-transform hover:scale-125 ${value === c ? 'ring-2 ring-offset-2 ring-[#16140f] ring-offset-[#f4efe6]' : ''}`}
            style={{ background: `radial-gradient(circle at 38% 32%, ${c}, #00000044 140%)` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ field wrapper -------------------------------- */

interface FieldProps {
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
  delay?: number;
}

export function Field({ label, hint, optional = false, children, delay = 0 }: FieldProps) {
  return (
    <div className="q-rise" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="font-playfair italic text-xl sm:text-2xl text-[#16140f]">{label}</h3>
        {optional && (
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#16140f]/40">optional</span>
        )}
      </div>
      {hint && <p className="mb-4 -mt-1 text-sm text-[#16140f]/55">{hint}</p>}
      {children}
    </div>
  );
}
