import React from 'react';
import { LANGUAGES, type Language } from '../data/languages';

/* ENG / ESP: one pressed-or-not button per language, each named in its own
   language, so a Spanish speaker on an English page can still find "Español".
   The menu bar uses the small size; the screenshot gallery the regular one. */

type Props = {
  languages: Language[];
  current: Language;
  onChange: (language: Language) => void;
  /** Names the group for screen readers, in the page's language. */
  label: string;
  size?: 'sm' | 'md';
  className?: string;
};

export const LanguageSwitch = ({ languages, current, onChange, label, size = 'md', className = '' }: Props) => (
  <div
    role="group"
    aria-label={label}
    // `className` may carry its own display (e.g. "hidden sm:inline-flex"), so
    // inline-flex is only the default, never added on top of one.
    className={
      'shrink-0 rounded-full border-2 border-zinc-700 light:border-zinc-300 p-0.5 ' + (className || 'inline-flex')
    }
  >
    {languages.map((code) => (
      <button
        key={code}
        type="button"
        lang={code}
        aria-label={LANGUAGES[code].name}
        aria-pressed={current === code}
        onClick={() => onChange(code)}
        className={
          'rounded-full font-mono font-black uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ' +
          (size === 'sm' ? 'h-6 px-2 text-[10px] tracking-wider ' : 'h-8 px-3 text-xs tracking-widest ') +
          (current === code
            ? 'bg-white text-black light:bg-zinc-900 light:text-white'
            : 'text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900')
        }
      >
        {LANGUAGES[code].short}
      </button>
    ))}
  </div>
);

/** For a narrow menu bar: one button that switches to the next language,
 *  labeled with that language's code ("ESP" while the page is in English). */
export const LanguageToggle = ({
  languages,
  current,
  onChange,
  className = '',
}: Omit<Props, 'label' | 'size'>) => {
  const next = languages[(languages.indexOf(current) + 1) % languages.length];
  return (
    <button
      type="button"
      lang={next}
      aria-label={LANGUAGES[next].name}
      title={LANGUAGES[next].name}
      onClick={() => onChange(next)}
      className={
        'shrink-0 h-6 px-1.5 rounded-full border-2 border-zinc-700 light:border-zinc-300 font-mono font-black text-[10px] tracking-wider text-zinc-300 light:text-zinc-700 hover:text-white light:hover:text-zinc-900 hover:border-white light:hover:border-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ' +
        className
      }
    >
      {LANGUAGES[next].short}
    </button>
  );
};
