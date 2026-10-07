import { LANGUAGES, type Language } from '../data/languages';

/* The language lives in the address, so a link to a Spanish page opens in
   Spanish for whoever it is sent to:

     #/es/projects/apunte   Apunte's page, in Spanish
     #/projects/apunte      the same page, in English

   English keeps the addresses the site has always had, so no existing link
   changes. An address without a language shows the visitor's own choice, and
   the address bar is then updated to say which language that is.

   In-page anchors like #apps scroll rather than route, so they never get a
   prefix; the page keeps whatever language it is already in. */

const CODES = Object.keys(LANGUAGES) as Language[];

/** A hash, split into the language it names (if any) and the page it opens. */
export const parseHash = (hash: string): { language: Language | null; path: string } => {
  const match = hash.match(/^#\/([a-z]{2})(\/.*)?$/);
  if (match && CODES.includes(match[1] as Language)) {
    return { language: match[1] as Language, path: match[2] ? '#' + match[2] : '#/' };
  }
  return { language: null, path: hash };
};

/** The address of a page in a language. */
export const hashFor = (language: Language, path: string) => {
  if (language === 'en') return path;
  if (path === '' || path === '#' || path === '#/') return `#/${language}`;
  if (!path.startsWith('#/')) return path;
  return `#/${language}${path.slice(1)}`;
};
