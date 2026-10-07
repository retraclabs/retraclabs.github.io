import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Screenshot } from '../data/projects';
import type { AccentStyle } from '../data/accents';
import { LANGUAGES, type Language } from '../data/languages';
import { useLanguage, useStrings } from '../i18n/context';
import { STRINGS } from '../i18n/strings';
import { isLater } from '../i18n/projects';
import { LanguageSwitch } from './LanguageSwitch';

/* A shipped app's screenshots: a strip you can swipe, scroll, or step through
   with the arrows, and a full-size view on click.

   The strip is plain horizontal scrolling with snap points, so it works with a
   trackpad, a finger, and the keyboard (it is focusable) without any gesture
   code. Each item is narrower than the strip, which leaves the next screenshot
   peeking in from the edge: the cue that there is more to see.

   The full-size view is a native <dialog>. The browser handles Escape, keeps
   focus inside it while open, and hides the rest of the page from screen
   readers, none of which then has to be written or maintained here.

   Screenshots start in the page's language. When any of them also comes as a
   picture of the app in another language, an ENG / ESP switch sits beside the
   arrows and swaps each picture with its alt text and caption, falling back to
   English for any screenshot without a translation. The switch only changes
   this gallery; the site's language is set in the menu bar.

   A translation can be words only (no `src`): then the English picture shows
   with words in the page's language. That is how an app that isn't in Spanish
   yet still gets Spanish captions on a Spanish page, without a switch that
   would only swap the words. */

/** Mac screenshots are exported at this size; see Screenshot in projects.ts. */
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 1000;

/** One screenshot as shown: its picture, words, and size in the chosen
 *  language, and the language its words are actually in. */
type Shown = Omit<Screenshot, 'translations'> & { lang: Language; translatedPicture: boolean };

const inLanguage = (shot: Screenshot, language: Language): Shown => {
  const { translations, ...english } = shot;
  const translation = language === 'en' ? undefined : translations?.[language];
  if (!translation) return { ...english, lang: 'en', translatedPicture: false };
  return {
    ...english,
    alt: translation.alt,
    caption: translation.caption,
    src: translation.src ?? english.src,
    width: translation.src ? translation.width ?? english.width : english.width,
    height: translation.src ? translation.height ?? english.height : english.height,
    lang: language,
    translatedPicture: Boolean(translation.src),
  };
};

const isPortrait = (shot: Shown) => (shot.height ?? DEFAULT_HEIGHT) > (shot.width ?? DEFAULT_WIDTH);

type Props = {
  name: string;
  screenshots: Screenshot[];
  accent: AccentStyle;
  /** The project's `version.current`, for tagging screenshots of features that
   *  aren't out yet (`since`). */
  currentVersion?: string;
  /** The project's `languageSince`, for saying that pictures of the app in a
   *  language show a version that isn't out yet. */
  languageSince?: Partial<Record<Exclude<Language, 'en'>, string>>;
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

/** Neutral rather than accented, so it never reads as a second Premium tag. */
const ComingTag = ({ label, onDark = false }: { label: string; onDark?: boolean }) => (
  <span
    className={
      'inline-flex items-center px-2 py-0.5 mr-2 rounded-full border text-[10px] font-mono font-black uppercase tracking-widest align-[2px] ' +
      (onDark
        ? 'border-zinc-500 text-zinc-200'
        : 'border-zinc-600 light:border-zinc-300 text-zinc-300 light:text-zinc-700')
    }
  >
    {label}
  </span>
);

const Tags = ({
  shot,
  accent,
  currentVersion,
  onDark = false,
}: {
  shot: Shown;
  accent: AccentStyle;
  currentVersion?: string;
  onDark?: boolean;
}) => (
  <>
    {/* In the language of the caption it sits in. */}
    {shot.since && currentVersion && isLater(shot.since, currentVersion) ? (
      <ComingTag label={STRINGS[shot.lang].gallery.comingIn(shot.since)} onDark={onDark} />
    ) : null}
    {shot.premium ? <PremiumTag accent={accent} onDark={onDark} /> : null}
  </>
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

export const ScreenshotGallery = ({ name, screenshots, accent, currentVersion, languageSince }: Props) => {
  const reduceMotion = useReducedMotion();
  const { language: pageLanguage } = useLanguage();
  const t = useStrings();

  /** English, then every language any screenshot has a picture in. */
  const pictureLanguages = useMemo<Language[]>(() => {
    const pictured = new Set<Language>();
    for (const shot of screenshots) {
      for (const [code, translation] of Object.entries(shot.translations ?? {})) {
        if (translation?.src) pictured.add(code as Language);
      }
    }
    return ['en', ...(Object.keys(LANGUAGES) as Language[]).filter((code) => pictured.has(code))];
  }, [screenshots]);

  // Starts in the page's language, and follows it when the menu bar changes it.
  const [language, setLanguage] = useState<Language>(pageLanguage);
  useEffect(() => setLanguage(pageLanguage), [pageLanguage]);
  const shots = useMemo(() => screenshots.map((shot) => inLanguage(shot, language)), [screenshots, language]);

  // Pictures of the app in a language it doesn't have yet say so.
  const since = language === 'en' ? undefined : languageSince?.[language as Exclude<Language, 'en'>];
  const translationPending =
    since && currentVersion && isLater(since, currentVersion) && shots.some((shot) => shot.translatedPicture) ? since : null;

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
    setEnlarged((index) => (index === null ? index : (index + direction + shots.length) % shots.length));

  const shown = enlarged === null ? null : shots[enlarged];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      aria-labelledby="screenshots-heading"
      className="mt-6 border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 sm:px-8 pt-6 sm:pt-8 mb-5">
        <h2 id="screenshots-heading" className="text-2xl font-black text-white light:text-zinc-900">
          {t.gallery.heading}
        </h2>
        <div className="flex items-center gap-2">
          {pictureLanguages.length > 1 ? (
            <LanguageSwitch
              languages={pictureLanguages}
              current={pictureLanguages.includes(language) ? language : 'en'}
              onChange={setLanguage}
              label={t.gallery.languageGroup}
            />
          ) : null}
          <RoundButton label={t.gallery.previous} onClick={() => step(-1)} disabled={edges.atStart}>
            <ArrowLeft className="w-5 h-5" />
          </RoundButton>
          <RoundButton label={t.gallery.next} onClick={() => step(1)} disabled={edges.atEnd}>
            <ArrowRight className="w-5 h-5" />
          </RoundButton>
        </div>
        {translationPending ? (
          <p lang={language} className="basis-full text-sm font-medium text-zinc-400 light:text-zinc-600">
            {STRINGS[language].gallery.translationComing(STRINGS[language].languageNames[language], translationPending)}
          </p>
        ) : null}
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={t.gallery.strip(name)}
        // `relative` keeps each button's screen-reader-only label inside the strip. Without it the
        // labels, positioned against the page, stretched it thousands of pixels wide behind its
        // clipped overflow, and a scrollIntoView could slide the whole page sideways.
        className="relative flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 px-6 sm:px-8 pb-6 sm:pb-8 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-cyan-400/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot, index) => (
          <li
            key={index}
            className={
              'snap-start shrink-0 ' +
              (isPortrait(shot) ? 'w-[62%] sm:w-[34%] lg:w-[24%]' : 'w-[85%] sm:w-[72%] lg:w-[62%]')
            }
          >
            <figure lang={shot.lang}>
              <button
                type="button"
                onClick={() => open(index)}
                aria-haspopup="dialog"
                className="block w-full rounded-xl overflow-hidden border-2 border-zinc-800 light:border-zinc-200 bg-black hover:border-white light:hover:border-zinc-900 focus-visible:outline-none focus-visible:border-cyan-400 transition-colors"
              >
                <span className="sr-only">{STRINGS[shot.lang].gallery.enlarge}</span>
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
                <Tags shot={shot} accent={accent} currentVersion={currentVersion} />
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
        aria-label={t.gallery.viewer(name)}
        className="m-auto w-[min(100vw_-_1.5rem,84rem)] max-w-none max-h-none bg-transparent p-0 overflow-visible backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {shown && enlarged !== null ? (
          <figure lang={shown.lang}>
            <img
              src={shown.src}
              alt={shown.alt}
              width={shown.width ?? DEFAULT_WIDTH}
              height={shown.height ?? DEFAULT_HEIGHT}
              className="block mx-auto w-auto h-auto max-w-full max-h-[78vh] rounded-xl border-2 border-zinc-700"
            />
            <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base text-zinc-300 font-medium">
              <span className="flex-1">
                <Tags shot={shown} accent={accent} currentVersion={currentVersion} onDark />
                {shown.caption}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-zinc-400 mr-2 tabular-nums">
                  {enlarged + 1} / {shots.length}
                </span>
                <RoundButton label={t.gallery.previous} onClick={() => move(-1)} onDark>
                  <ArrowLeft className="w-5 h-5" />
                </RoundButton>
                <RoundButton label={t.gallery.next} onClick={() => move(1)} onDark>
                  <ArrowRight className="w-5 h-5" />
                </RoundButton>
                <RoundButton label={t.gallery.close} onClick={close} onDark>
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
