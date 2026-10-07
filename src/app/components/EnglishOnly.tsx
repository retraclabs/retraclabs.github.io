import React from 'react';
import { useLanguage, useStrings } from '../i18n/context';

/* Wraps a page that hasn't been translated yet: the About page, the beta form,
   the Thanks page, lab notes, and every privacy policy and terms page.

   In English it changes nothing. In another language it says, in that
   language, that the page is in English, and marks the page as English so a
   screen reader pronounces it correctly. The menu bar and footer around it
   stay in the visitor's language.

   Legal pages stay in English on purpose: a translated policy or Terms of Use
   is a legal document in its own right, and should be translated
   professionally before it is published. See MAINTAINING.md → "Languages". */
export const EnglishOnly = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const t = useStrings();
  if (language === 'en') return <>{children}</>;

  return (
    <div lang="en" className="relative">
      <div className="absolute inset-x-0 top-[5.25rem] sm:top-[6.25rem] z-20 flex justify-center px-4 pointer-events-none">
        <p
          lang={language}
          className="px-4 py-1.5 rounded-full border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white text-xs font-mono font-bold text-zinc-300 light:text-zinc-700 text-center"
        >
          {t.englishOnly}
        </p>
      </div>
      {children}
    </div>
  );
};
