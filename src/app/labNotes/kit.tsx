import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { ACCENTS, type AccentStyle } from '../data/accents';

/* The building blocks a lab note is written in.

   A note is ordinary JSX made of these, so it looks like the rest of the site
   and follows the light/dark toggle without any special handling. Nothing here
   is specific to one note: the accent comes from whichever product the note
   belongs to, which LabNotePage passes down through LabNoteAccent. */

const AccentContext = createContext<AccentStyle>(ACCENTS.sky);

/** Wraps a note so every block inside picks up its product's accent color. */
export const LabNoteAccent = AccentContext.Provider;

const useAccent = () => useContext(AccentContext);

/* ── text ─────────────────────────────────────────────────────────────────── */

/** A titled section. The title must be in title case. */
export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-5">
    <h2 className="text-2xl sm:text-3xl font-black text-white light:text-zinc-900 leading-tight">{title}</h2>
    {children}
  </section>
);

/** A heading inside a section. Title case, like every heading. */
export const Subhead = ({ children }: { children: React.ReactNode }) => {
  const accent = useAccent();
  return <h3 className={'text-lg sm:text-xl font-black pt-2 ' + accent.text}>{children}</h3>;
};

export const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-white light:text-zinc-900">{children}</strong>
);

/** Text that marks a result in the product's favor. */
export const Win = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-emerald-400 light:text-emerald-700">{children}</span>
);

export const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-[0.88em] px-1.5 py-0.5 rounded-md bg-zinc-800 light:bg-zinc-200/70 text-zinc-100 light:text-zinc-800">
    {children}
  </code>
);

/** A pull quote: the one sentence in a section worth reading twice. */
export const Quote = ({ children }: { children: React.ReactNode }) => {
  const accent = useAccent();
  return (
    <blockquote
      className={
        'border-l-4 rounded-r-2xl px-5 sm:px-6 py-4 text-lg sm:text-xl font-bold text-white light:text-zinc-900 leading-snug ' +
        accent.rule +
        ' ' +
        accent.wash
      }
    >
      {children}
    </blockquote>
  );
};

/** Small print: method, caveats, sample sizes. */
export const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm sm:text-base text-zinc-400 light:text-zinc-600 leading-relaxed">{children}</p>
);

/** A Terminal command the reader is invited to run, with a copy button. */
export const Command = ({ children }: { children: string }) => {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1800);
  };

  return (
    <div className="flex items-stretch rounded-xl border-2 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 overflow-hidden">
      {/* On a phone the command has to wrap, but a break inside an argument
          (after the "--" of "--entitlements", say) makes it read as two. Each
          argument is kept whole, so lines only ever break at spaces. */}
      <code className="flex-1 min-w-0 overflow-x-auto sm:whitespace-nowrap px-3 sm:px-4 py-3 font-mono text-[13px] sm:text-sm text-zinc-100 light:text-zinc-800">
        {children.split(' ').map((part, index) => (
          <React.Fragment key={index}>
            {index ? ' ' : null}
            <span className="whitespace-nowrap">{part}</span>
          </React.Fragment>
        ))}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 border-l-2 border-zinc-800 light:border-zinc-200 font-mono font-bold text-xs text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors"
      >
        {state === 'copied' ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
        {/* Icon only on a phone, where the command needs the room; the words
            stay available to screen readers either way. */}
        <span aria-live="polite" className="sr-only sm:not-sr-only">
          {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy Failed' : 'Copy'}
        </span>
      </button>
    </div>
  );
};

/* ── tables ───────────────────────────────────────────────────────────────── */

type TableProps = {
  /** Column titles, in title case. Use '' for an empty corner cell. */
  columns: string[];
  rows: React.ReactNode[][];
  /** Treat the first cell of each row as that row's heading. */
  rowHeaders?: boolean;
};

export const DataTable = ({ columns, rows, rowHeaders = false }: TableProps) => (
  <div className="overflow-x-auto rounded-2xl border-2 border-zinc-800 light:border-zinc-200">
    <table className="w-full text-left text-sm sm:text-base hyphens-auto sm:hyphens-none">
      <thead className="bg-[#0f0f12] light:bg-zinc-50">
        <tr>
          {columns.map((column, index) =>
            column ? (
              <th
                key={index}
                scope="col"
                className="px-2.5 sm:px-4 py-3 text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-wider sm:tracking-widest align-bottom"
              >
                {column}
              </th>
            ) : (
              <td key={index} />
            ),
          )}
        </tr>
      </thead>
      <tbody className="divide-y-2 divide-zinc-800 light:divide-zinc-200 border-t-2 border-zinc-800 light:border-zinc-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
              rowHeaders && cellIndex === 0 ? (
                <th key={cellIndex} scope="row" className="px-2.5 sm:px-4 py-3 font-bold text-white light:text-zinc-900 align-top">
                  {cell}
                </th>
              ) : (
                <td key={cellIndex} className={'px-2.5 sm:px-4 py-3 align-top' + (cellIndex === 0 ? ' font-bold text-white light:text-zinc-900' : '')}>
                  {cell}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ── charts ───────────────────────────────────────────────────────────────── */

/* Every chart in a note is a list of labeled bars on a shared scale. The labels
   and numbers are real text, so they are readable at any size, selectable, and
   heard by screen readers; the bars themselves are decoration and hidden from
   assistive tech. Bars grow in once when scrolled into view, on transform only,
   and not at all for anyone who has asked for reduced motion. */

export type BarTone = 'product' | 'other' | 'good' | 'bad';

export type Bar = {
  label: React.ReactNode;
  value: number;
  /** The number as it should read, e.g. '14.78%' or '71×'. */
  display: string;
  tone?: BarTone;
};

type BarChartProps = {
  /** Title case. Shown small and uppercase above the chart. */
  title: string;
  /** What the scale means, e.g. 'lower is better'. Sentence case. */
  qualifier?: string;
  bars: Bar[];
  /** The value at the far end of the track. Defaults to 10% past the largest bar. */
  max?: number;
  /** Maps a value onto the track, for scales that are not linear. */
  scale?: (value: number) => number;
  /** A marked value on every track, such as a review threshold. */
  threshold?: { value: number; label: string };
  /** Lines of commentary under the bars. */
  notes?: React.ReactNode[];
  caption: React.ReactNode;
};

const OTHER_TONES: Record<Exclude<BarTone, 'product'>, string> = {
  other: 'bg-zinc-600 light:bg-zinc-400',
  good: 'bg-emerald-400 light:bg-emerald-600',
  bad: 'bg-rose-400 light:bg-rose-600',
};

export const BarChart = ({ title, qualifier, bars, max, scale = (v) => v, threshold, notes, caption }: BarChartProps) => {
  const accent = useAccent();
  const reduceMotion = useReducedMotion();
  const top = max ?? Math.max(...bars.map((bar) => scale(bar.value))) * 1.1;
  const percent = (value: number) => Math.max(0, Math.min(100, (scale(value) / top) * 100));

  return (
    <figure className="rounded-2xl border-2 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-5">
        <div className="text-xs font-mono font-black text-zinc-300 light:text-zinc-700 uppercase tracking-widest">{title}</div>
        {qualifier ? <div className="text-xs font-mono font-bold text-zinc-400 light:text-zinc-600">{qualifier}</div> : null}
      </div>

      <div className="space-y-4">
        {bars.map((bar, index) => (
          <div key={index}>
            <div className="flex items-baseline justify-between gap-4 text-sm sm:text-base mb-1.5">
              <span className="font-bold text-zinc-200 light:text-zinc-800">{bar.label}</span>
              <span className="font-mono font-black text-white light:text-zinc-900 tabular-nums shrink-0">{bar.display}</span>
            </div>
            <div className="relative h-3 rounded-full bg-zinc-800 light:bg-zinc-200" aria-hidden="true">
              <motion.div
                className={'absolute inset-y-0 left-0 rounded-full ' + (bar.tone === 'product' ? accent.fill : OTHER_TONES[bar.tone ?? 'other'])}
                style={{ width: percent(bar.value) + '%', originX: 0 }}
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
              {threshold ? (
                <div
                  className="absolute -top-1.5 -bottom-1.5 w-0.5 rounded-full bg-white light:bg-zinc-900"
                  style={{ left: percent(threshold.value) + '%' }}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {threshold ? (
        <div className="flex items-center gap-2 mt-4 text-xs font-mono font-bold text-zinc-400 light:text-zinc-600">
          <span className="inline-block w-0.5 h-3.5 rounded-full bg-white light:bg-zinc-900" aria-hidden="true" />
          {threshold.label}
        </div>
      ) : null}

      {notes?.length ? (
        <div className="mt-5 space-y-1 text-sm text-zinc-400 light:text-zinc-600 font-medium">
          {notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      ) : null}

      <figcaption className="mt-5 pt-4 border-t-2 border-zinc-800 light:border-zinc-200 text-sm text-zinc-400 light:text-zinc-600 font-medium">
        {caption}
      </figcaption>
    </figure>
  );
};
