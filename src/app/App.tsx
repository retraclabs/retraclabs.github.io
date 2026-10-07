import React, { useEffect, useMemo, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { LabSection } from './components/LabSection';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ApuntePrivacy } from './components/ApuntePrivacy';
import { ApunteTerms } from './components/ApunteTerms';
import { HashDropPrivacy } from './components/HashDropPrivacy';
import { HashDropTerms } from './components/HashDropTerms';
import { AmbientDeskPrivacy } from './components/AmbientDeskPrivacy';
import { RetazoPrivacy } from './components/RetazoPrivacy';
import { EarlyAccess } from './components/EarlyAccess';
import { About } from './components/About';
import { Thanks } from './components/Thanks';
import { LabNotePage } from './components/LabNotePage';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSwitch, LanguageToggle } from './components/LanguageSwitch';
import { EnglishOnly } from './components/EnglishOnly';
import { getProjectBySlug } from './data/projects';
import { LANGUAGES, preferredLanguage, rememberLanguage, type Language } from './data/languages';
import { getLabNote } from './labNotes';
import { heroDissipatedAt } from './heroChoreography';
import { LanguageProvider } from './i18n/context';
import { STRINGS } from './i18n/strings';
import { hashFor, parseHash } from './i18n/route';
import { motion } from 'motion/react';

const STATIC_PAGE_HASHES = ['#/privacy', '#/apunte/privacy', '#/apunte/terms', '#/hash-drop/privacy', '#/hash-drop/terms', '#/ambient-desk/privacy', '#/retazo/privacy', '#/early-access', '#/about', '#/thanks'];

/** Every page that is not the home page: fixed pages, plus lab notes, which get
 *  their routes from their own registry rather than from the list above. */
const isInteriorPage = (path: string) => STATIC_PAGE_HASHES.includes(path) || Boolean(getLabNote(path));

const projectAt = (path: string) => getProjectBySlug(path.match(/^#\/projects\/([a-z0-9-]+)$/)?.[1] ?? null);

const ALL_LANGUAGES = Object.keys(LANGUAGES) as Language[];

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  // A language named in the address wins; otherwise the visitor's earlier
  // choice, then their browser's languages, then English.
  const [language, setLanguageState] = useState<Language>(
    () => parseHash(window.location.hash).language ?? preferredLanguage(ALL_LANGUAGES),
  );
  const [headerVisible, setHeaderVisible] = useState(false);

  // Routing works on the page's path, with any language prefix taken off.
  const { path } = parseHash(currentHash);
  const activeProject = useMemo(() => projectAt(path), [path]);
  const labNote = getLabNote(path);
  const t = STRINGS[language];

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    rememberLanguage(next);
  };

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const named = parseHash(window.location.hash).language;
    if (named) rememberLanguage(named);

    const handleHashChange = () => {
      const hash = window.location.hash;
      const language = parseHash(hash).language;
      if (language) {
        setLanguageState(language);
        rememberLanguage(language);
      }
      setCurrentHash(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keep the address bar honest: it names the page's language (English
  // addresses have no prefix, so they are the same as they always were), and a
  // renamed app's old slug gives way to its current one (see formerSlugs in
  // projects.ts). replaceState, so neither adds a step to the back button.
  useEffect(() => {
    const canonicalPath = activeProject ? `#/projects/${activeProject.slug}` : path;
    const wanted = hashFor(language, canonicalPath);
    if (wanted !== window.location.hash) {
      window.history.replaceState(null, '', wanted || window.location.pathname + window.location.search);
      setCurrentHash(wanted);
    }
  }, [language, path, activeProject]);

  // Screen readers and the browser's hyphenation both follow this.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Depends on the path, not the whole address, so switching language doesn't
  // throw the reader back to the top of the page.
  useEffect(() => {
    if (activeProject || isInteriorPage(path)) {
      const scrollId = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 0);

      return () => window.clearTimeout(scrollId);
    }
  }, [activeProject, path]);

  // The menu bar stays out of the way until RETRAC LABS has finished
  // dissipating, the same hand-off jarredmcarter.com makes. Interior pages have
  // no hero to wait for, so it is there from the start.
  const onHomePage = !activeProject && !isInteriorPage(path);

  useEffect(() => {
    if (!onHomePage) {
      setHeaderVisible(true);
      return;
    }

    let frame = false;
    const draw = () => {
      frame = false;
      setHeaderVisible(window.scrollY >= heroDissipatedAt());
    };

    const onScroll = () => {
      if (!frame) {
        frame = true;
        requestAnimationFrame(draw);
      }
    };

    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', draw);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', draw);
    };
  }, [onHomePage]);

  return (
    <LanguageProvider value={{ language, setLanguage }}>
    <div className="relative min-h-screen bg-[#09090b] light:bg-[#f4f4f5] text-zinc-50 light:text-zinc-900 selection:bg-fuchsia-500/30 selection:text-white font-sans overflow-x-hidden">
      <CustomCursor />
      <AnimatedBackground />

      <motion.header
        initial={false}
        animate={{
          opacity: headerVisible ? 1 : 0,
          y: headerVisible ? 0 : -24,
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-hidden={!headerVisible}
        className={
          'fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none ' +
          (headerVisible ? '' : 'invisible')
        }
      >
        <div className="flex items-center gap-2.5 sm:gap-8 px-3 sm:px-6 py-3 bg-zinc-900/95 light:bg-white/95 backdrop-blur-xl border-2 border-zinc-800 light:border-zinc-200 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto max-w-[calc(100vw-1.5rem)]">
          <a href="#" className="text-lg sm:text-xl font-black text-white light:text-zinc-900 uppercase whitespace-nowrap">
            Retrac<span className="text-zinc-500 light:text-zinc-600">Labs</span>
          </a>
          <nav className="flex gap-2 sm:gap-6 text-[10px] sm:text-sm font-bold font-mono text-zinc-400 light:text-zinc-600">
            <a href="#apps" className="hover:text-cyan-400 light:hover:text-cyan-700 transition-colors">{t.menu.lab}</a>
            <a href="#/about" className="hover:text-fuchsia-400 light:hover:text-fuchsia-700 transition-colors">{t.menu.about}</a>
            <a href="#/early-access" className="hover:text-emerald-400 light:hover:text-emerald-700 transition-colors">{t.menu.beta}</a>
            {/* On a phone the bar has no room left once the language button is in
                it; CONTACT goes, and the footer's email button stands in. */}
            <a href="mailto:retrac.labs@gmail.com" className="hidden sm:inline hover:text-yellow-400 light:hover:text-yellow-600 transition-colors">{t.menu.contact}</a>
          </nav>

          <div className="hidden sm:block w-px h-5 bg-zinc-800 light:bg-zinc-200 shrink-0" aria-hidden="true" />
          {/* Both buttons on a wide screen; on a phone, where the bar is already
              full, one button that switches to the other language. */}
          <LanguageSwitch
            languages={ALL_LANGUAGES}
            current={language}
            onChange={setLanguage}
            label={t.menu.language}
            size="sm"
            className="hidden sm:inline-flex"
          />
          <LanguageToggle languages={ALL_LANGUAGES} current={language} onChange={setLanguage} className="sm:hidden" />
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Pages not yet translated are wrapped in EnglishOnly, which says so in
          the visitor's language. See MAINTAINING.md → "Languages". */}
      {path === '#/privacy' ? (
        <EnglishOnly><PrivacyPolicy /></EnglishOnly>
      ) : path === '#/apunte/privacy' ? (
        <EnglishOnly><ApuntePrivacy /></EnglishOnly>
      ) : path === '#/apunte/terms' ? (
        <EnglishOnly><ApunteTerms /></EnglishOnly>
      ) : path === '#/hash-drop/privacy' ? (
        <EnglishOnly><HashDropPrivacy /></EnglishOnly>
      ) : path === '#/hash-drop/terms' ? (
        <EnglishOnly><HashDropTerms /></EnglishOnly>
      ) : path === '#/ambient-desk/privacy' ? (
        <EnglishOnly><AmbientDeskPrivacy /></EnglishOnly>
      ) : path === '#/retazo/privacy' ? (
        <EnglishOnly><RetazoPrivacy /></EnglishOnly>
      ) : path === '#/early-access' ? (
        <EnglishOnly><EarlyAccess /></EnglishOnly>
      ) : path === '#/about' ? (
        <EnglishOnly><About /></EnglishOnly>
      ) : path === '#/thanks' ? (
        <EnglishOnly><Thanks /></EnglishOnly>
      ) : labNote ? (
        <EnglishOnly><LabNotePage note={labNote} /></EnglishOnly>
      ) : activeProject ? (
        <ProjectDetail project={activeProject} />
      ) : (
        <main>
          <Hero />
          <LabSection />
        </main>
      )}

      <Footer />
    </div>
    </LanguageProvider>
  );
}
