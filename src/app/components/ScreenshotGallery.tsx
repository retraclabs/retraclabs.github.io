import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Screenshot } from '../data/projects';
import type { AccentStyle } from '../data/accents';

/* A shipped app's screenshots: a strip you can swipe, scroll, or step through
   with the arrows, and a full-size view on click.

   The strip is plain horizontal scrolling with snap points, so it works with a
   trackpad, a finger, and the keyboard (it is focusable) without any gesture
   code. Each item is narrower than the strip, which leaves the next screenshot
   peeking in from the edge: the cue that there is more to see.

   The full-size view is a native <dialog>. The browser handles Escape, keeps
   focus inside it while open, and hides the rest of the page from screen
   readers, none of which then has to be written or maintained here. */

/** Mac screenshots are exported at this size; see Screenshot in projects.ts. */
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 1000;

const isPortrait = (shot: Screenshot) => (shot.height ?? DEFAULT_HEIGHT) > (shot.width ?? DEFAULT_WIDTH);

type Props = {
  name: string;
  screenshots: Screenshot[];
  accent: AccentStyle;
};

/** The full-size view always sits on a black backdrop, whatever the site's
 *  theme, so anything inside it drops its light-mode classes. Safe because the
 *  full class strings are still written out in accents.ts for Tailwind to see. */
const darkOnly = (classes: string) =>
  classes
    .split(' ')
    .filter((name) => !name.startsWith('light:'))
    .join(' ');

const PremiumTag = ({ accent, onDark = false }: { accent: AccentStyle; onDark?: boolean }) => (
  <span
    className={
      'inline-flex items-center px-2 py-0.5 mr-2 rounded-full border text-[10px] font-mono font-black uppercase tracking-widest align-[2px] ' +
      (onDark ? darkOnly(accent.pill) : accent.pill)
    }
  >
    Premium
  </span>
);

const RoundButton = ({
  label,
  onClick,
  disabled,
  onDark = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  onDark?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    className={
      'w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full border-2 disabled:opacity-30 disabled:pointer-events-none transition-colors ' +
      (onDark
        ? 'border-zinc-600 text-zinc-200 hover:border-white hover:text-white'
        : 'border-zinc-700 light:border-zinc-300 text-zinc-300 light:text-zinc-700 hover:border-white light:hover:border-zinc-900 hover:text-white light:hover:text-zinc-900')
    }
  >
    {children}
  </button>
);

export const ScreenshotGallery = ({ name, screenshots, accent }: Props) => {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const [enlarged, setEnlarged] = useState<number | null>(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      atStart: track.scrollLeft <= 4,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    track.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Never leave the page unscrollable, even if this unmounts mid-view.
  useEffect(() => () => void (document.documentElement.style.overflow = ''), []);

  /** One screenshot's width in either direction. */
  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | null;
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const open = (index: number) => {
    setEnlarged(index);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  const close = () => dialogRef.current?.close();

  const move = (direction: 1 | -1) =>
    setEnlarged((index) => (index === null ? index : (index + direction + screenshots.length) % screenshots.length));

  const shown = enlarged === null ? null : screenshots[enlarged];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      aria-labelledby="screenshots-heading"
      className="mt-6 border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 mb-5">
        <h2 id="screenshots-heading" className="text-2xl font-black text-white light:text-zinc-900">
          Screenshots
        </h2>
        <div className="flex gap-2">
          <RoundButton label="Previous Screenshot" onClick={() => step(-1)} disabled={edges.atStart}>
            <ArrowLeft className="w-5 h-5" />
          </RoundButton>
          <RoundButton label="Next Screenshot" onClick={() => step(1)} disabled={edges.atEnd}>
            <ArrowRight className="w-5 h-5" />
          </RoundButton>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${name} screenshots`}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 px-6 sm:px-8 pb-6 sm:pb-8 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-cyan-400/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((shot, index) => (
          <li
            key={shot.src}
            className={
              'snap-start shrink-0 ' +
              (isPortrait(shot) ? 'w-[62%] sm:w-[34%] lg:w-[24%]' : 'w-[85%] sm:w-[72%] lg:w-[62%]')
            }
          >
            <figure>
              <button
                type="button"
                onClick={() => open(index)}
                aria-haspopup="dialog"
                className="block w-full rounded-xl overflow-hidden border-2 border-zinc-800 light:border-zinc-200 bg-black hover:border-white light:hover:border-zinc-900 focus-visible:outline-none focus-visible:border-cyan-400 transition-colors"
              >
                <span className="sr-only">Enlarge: </span>
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width ?? DEFAULT_WIDTH}
                  height={shot.height ?? DEFAULT_HEIGHT}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="block w-full h-auto"
                />
              </button>
              <figcaption className="mt-3 text-sm sm:text-base text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">
                {shot.premium ? <PremiumTag accent={accent} /> : null}
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setEnlarged(null);
          document.documentElement.style.overflow = '';
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(1);
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(-1);
          }
        }}
        // A click on the dimmed backdrop lands on the dialog itself.
        onClick={(event) => event.target === event.currentTarget && close()}
        aria-label={`${name} screenshot`}
        className="m-auto w-[min(100vw_-_1.5rem,84rem)] max-w-none max-h-none bg-transparent p-0 overflow-visible backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {shown && enlarged !== null ? (
          <figure>
            <img
              src={shown.src}
              alt={shown.alt}
              width={shown.width ?? DEFAULT_WIDTH}
              height={shown.height ?? DEFAULT_HEIGHT}
              className="block mx-auto w-auto h-auto max-w-full max-h-[78vh] rounded-xl border-2 border-zinc-700"
            />
            <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base text-zinc-300 font-medium">
              <span className="flex-1">
                {shown.premium ? <PremiumTag accent={accent} onDark /> : null}
                {shown.caption}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-zinc-400 mr-2 tabular-nums">
                  {enlarged + 1} / {screenshots.length}
                </span>
                <RoundButton label="Previous Screenshot" onClick={() => move(-1)} onDark>
                  <ArrowLeft className="w-5 h-5" />
                </RoundButton>
                <RoundButton label="Next Screenshot" onClick={() => move(1)} onDark>
                  <ArrowRight className="w-5 h-5" />
                </RoundButton>
                <RoundButton label="Close" onClick={close} onDark>
                  <X className="w-5 h-5" />
                </RoundButton>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </motion.section>
  );
};
