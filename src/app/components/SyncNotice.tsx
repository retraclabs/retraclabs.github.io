import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { useLanguage, useStrings } from '../i18n/context';
import { hashFor } from '../i18n/route';
import { SYNC_EXPLAINER_PATH } from './SyncExplainer';

/* "Changes Regarding Your Data": a small card in the bottom-right corner, and
   across the bottom of the screen on a phone. It doesn't block the page, it
   shows until the visitor presses either button, and then it's gone for good
   in that browser. Its words are in i18n/strings.ts → syncNotice.

   Closing it saves one value in the browser's local storage: this notice's ID,
   under STORAGE_KEY. No cookie, no visitor ID, and nothing is sent anywhere;
   the privacy policy's "Cookies and Website Analytics" section says so. When
   it's time for a new notice (the "Apunte Now Syncs, Locked" card at launch,
   in Sync Statement.md), give it a new NOTICE_ID, so people who closed this one
   see the new one once. See MAINTAINING.md → "The Notice Card". */

const NOTICE_ID = 'sync-notice-1';
const STORAGE_KEY = 'retraclabs.notice';

/** Long enough that the page has drawn and the hero has started, so the card
 *  arrives as an aside rather than as the first thing on screen. */
const SHOW_AFTER_MS = 1200;

const wasClosed = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === NOTICE_ID;
  } catch {
    // Storage can be blocked (private windows, strict settings): show the card,
    // and closing it still hides it for the rest of this visit.
    return false;
  }
};

const rememberClosed = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, NOTICE_ID);
  } catch {
    // Not remembered; the card comes back on the next visit, nothing worse.
  }
};

export const SyncNotice = ({ path }: { path: string }) => {
  const { language } = useLanguage();
  const t = useStrings().syncNotice;
  const reduceMotion = useReducedMotion();
  const [closed, setClosed] = useState(wasClosed);
  const [due, setDue] = useState(false);
  const onExplainer = path === SYNC_EXPLAINER_PATH;

  const close = () => {
    rememberClosed();
    setClosed(true);
  };

  // Reaching the page the card points to, by any link, counts as reading it.
  useEffect(() => {
    if (onExplainer && !closed) close();
  }, [onExplainer, closed]);

  useEffect(() => {
    if (closed) return;
    const timer = window.setTimeout(() => setDue(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [closed]);

  const offset = reduceMotion ? 0 : 24;

  return (
    <AnimatePresence>
      {due && !closed && !onExplainer ? (
        <motion.aside
          key={NOTICE_ID}
          aria-labelledby="notice-title"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed z-40 inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem] [@media(min-width:40rem)_and_(max-height:37.5rem)]:w-[34rem]"
        >
          {/* A phone held sideways, or the folded iPhone Duo, has under 600
              points of height, and the full card covered up to 88% of it. On a
              screen that short it drops the eyebrow and tightens the type and
              spacing (and on a wide one gets wider, for fewer lines), so the
              same words take a little over half.

              Keep it positioned with the `fixed` class, not an inline style:
              public/duo.js finds fixed elements by that class to lay them out
              again when the folded iPhone Duo turns. */}
          <div className="max-h-[calc(100vh-3rem)] overflow-y-auto bg-zinc-900 light:bg-white border-t-2 sm:border-2 border-zinc-700 light:border-zinc-300 rounded-t-[1.5rem] sm:rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.55)] light:shadow-[0_8px_32px_rgba(0,0,0,0.14)] px-5 pt-5 pb-6 sm:p-6 [@media(max-height:37.5rem)]:p-4">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest text-cyan-400 light:text-cyan-700 mb-3 [@media(max-height:37.5rem)]:hidden">
              <Lock className="w-4 h-4" aria-hidden="true" />
              Retrac Labs
            </div>
            <h2 id="notice-title" className="text-lg sm:text-xl font-black text-white light:text-zinc-900 leading-tight mb-2 [@media(max-height:37.5rem)]:text-base [@media(max-height:37.5rem)]:mb-1">
              {t.title}
            </h2>
            <p className="text-sm text-zinc-300 light:text-zinc-700 font-medium leading-relaxed [@media(max-height:37.5rem)]:text-[13px] [@media(max-height:37.5rem)]:leading-snug">{t.body}</p>
            <div className="mt-5 flex flex-wrap gap-2 [@media(max-height:37.5rem)]:mt-3">
              <a
                href={hashFor(language, SYNC_EXPLAINER_PATH)}
                hrefLang={t.explainerInEnglish ? 'en' : undefined}
                onClick={close}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 [@media(max-height:37.5rem)]:py-1.5 rounded-xl bg-cyan-400 text-black text-sm font-black border-2 border-cyan-400 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                {t.howItWillWork}
                {/* The explainer isn't translated yet: say so before the click. */}
                {t.explainerInEnglish ? <span className="font-bold opacity-70">· {t.explainerInEnglish}</span> : null}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={close}
                className="px-4 py-2.5 [@media(max-height:37.5rem)]:py-1.5 rounded-xl text-sm font-bold text-white light:text-zinc-900 border-2 border-zinc-700 light:border-zinc-300 hover:border-white light:hover:border-zinc-900 transition-colors"
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};
