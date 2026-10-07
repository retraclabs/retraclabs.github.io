/* The languages the site can show, and the visitor's saved choice.

   The menu bar's ENG / ESP switch sets the page's language (App.tsx owns it,
   and keeps it in the address: see i18n/route.ts). Interface text is in
   i18n/strings.ts, product copy in data/projects.es.ts, and screenshots carry
   their own translations in projects.ts. See MAINTAINING.md → "Languages".

   A new language is a line here (a code, a short label for the switches, and
   its own name), the code in `Language`, and its text in those files. */

export type Language = 'en' | 'es';

export const LANGUAGES: Record<Language, { short: string; name: string }> = {
  en: { short: 'ENG', name: 'English' },
  es: { short: 'ESP', name: 'Español' },
};

const STORAGE_KEY = 'retraclabs.language';

/** The language to start in, out of the ones a page offers: the visitor's
 *  choice from an earlier visit, else the first of their browser's languages
 *  that is on offer, else English. */
export const preferredLanguage = (available: Language[]): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && available.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private windows, strict settings); fall through.
  }
  const browser = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language];
  for (const tag of browser) {
    const code = tag.slice(0, 2).toLowerCase() as Language;
    if (available.includes(code)) return code;
  }
  return 'en';
};

/** Remembers a choice for the next page and the next visit, where storage allows. */
export const rememberLanguage = (language: Language) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Not remembered; the switch still works for this page.
  }
};
