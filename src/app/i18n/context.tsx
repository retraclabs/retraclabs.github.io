import { createContext, useContext } from 'react';
import type { Language } from '../data/languages';
import { STRINGS } from './strings';

/* The page's language, provided by App.tsx, which owns it because the address
   bar and the language have to stay in step. Components read it here. */

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageState>({ language: 'en', setLanguage: () => {} });

export const LanguageProvider = LanguageContext.Provider;

export const useLanguage = () => useContext(LanguageContext);

/** The interface text for the page's language. */
export const useStrings = () => STRINGS[useContext(LanguageContext).language];
