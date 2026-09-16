import type { ProjectAccent, ProjectSpan } from './projects';

/* Tailwind only ships classes it can see written out in full, so these are
   spelled literally rather than built from a string like `hover:border-${c}`.
   Adding a new accent means adding a row here as well as to ProjectAccent. */

export type AccentStyle = {
  /** Card border on hover. */
  border: string;
  /** Accent-colored text. */
  text: string;
  /** Tint behind an icon sitting on a dark card. */
  iconBg: string;
  /** Small status pill. */
  pill: string;
  /** rgba triple for the hard offset shadow on hover, a raw color rather than a class. */
  shadow: string;
  /** A soft wash of color across the card. */
  glow: string;
  /** The blurred blob on a project's own page. */
  detailGlow: string;
};

export const ACCENTS: Record<ProjectAccent, AccentStyle> = {
  pink: {
    border: 'hover:border-pink-400',
    text: 'text-pink-400 light:text-pink-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-pink-400 light:text-pink-600',
    pill: 'bg-pink-400/10 text-pink-400 light:text-pink-600 border-pink-400/20',
    shadow: 'rgba(244,114,182,1)',
    glow: 'bg-[radial-gradient(circle_at_85%_15%,rgba(244,114,182,0.16),transparent_55%)]',
    detailGlow: 'bg-pink-500',
  },
  cyan: {
    border: 'hover:border-cyan-400',
    text: 'text-cyan-400 light:text-cyan-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-cyan-400 light:text-cyan-700',
    pill: 'bg-cyan-400/10 text-cyan-400 light:text-cyan-700 border-cyan-400/20',
    shadow: 'rgba(34,211,238,1)',
    glow: 'bg-[radial-gradient(circle_at_15%_85%,rgba(34,211,238,0.16),transparent_55%)]',
    detailGlow: 'bg-cyan-500',
  },
  emerald: {
    border: 'hover:border-emerald-500',
    text: 'text-emerald-400 light:text-emerald-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-emerald-400 light:text-emerald-700',
    pill: 'bg-emerald-500/10 text-emerald-400 light:text-emerald-700 border-emerald-500/20',
    shadow: 'rgba(16,185,129,1)',
    glow: 'bg-[radial-gradient(circle_at_15%_60%,rgba(16,185,129,0.12),transparent_55%)]',
    detailGlow: 'bg-emerald-500',
  },
  sky: {
    border: 'hover:border-sky-500',
    text: 'text-sky-400 light:text-sky-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-sky-400 light:text-sky-700',
    pill: 'bg-sky-500/10 text-sky-400 light:text-sky-700 border-sky-500/20',
    glow: 'bg-[radial-gradient(circle_at_85%_40%,rgba(56,189,248,0.12),transparent_55%)]',
    shadow: 'rgba(56,189,248,1)',
    detailGlow: 'bg-sky-500',
  },
  purple: {
    border: 'hover:border-purple-500',
    text: 'text-purple-400 light:text-purple-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-purple-400 light:text-purple-700',
    pill: 'bg-purple-500/10 text-purple-400 light:text-purple-700 border-purple-500/20',
    shadow: 'rgba(168,85,247,1)',
    glow: 'bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]',
    detailGlow: 'bg-purple-500',
  },
  green: {
    border: 'hover:border-green-500',
    text: 'text-green-400 light:text-green-700',
    iconBg: 'bg-zinc-800 light:bg-zinc-100 text-green-400 light:text-green-700',
    pill: 'bg-green-500/10 text-green-400 light:text-green-700 border-green-500/20',
    shadow: 'rgba(34,197,94,1)',
    glow: 'bg-[radial-gradient(circle_at_20%_25%,rgba(34,197,94,0.13),transparent_55%)]',
    detailGlow: 'bg-green-500',
  },
};

/** Card width in the six-column Lab grid. */
export const SPANS: Record<ProjectSpan, string> = {
  full: 'md:col-span-4 lg:col-span-6',
  'two-thirds': 'md:col-span-2 lg:col-span-4',
  half: 'md:col-span-2 lg:col-span-3',
  third: 'md:col-span-2 lg:col-span-2',
};
