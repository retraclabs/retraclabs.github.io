import React, { useEffect, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { LabSection } from './components/LabSection';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ApuntePrivacy } from './components/ApuntePrivacy';
import { ApunteTerms } from './components/ApunteTerms';
import { EarlyAccess } from './components/EarlyAccess';
import { About } from './components/About';
import { Thanks } from './components/Thanks';
import { ThemeToggle } from './components/ThemeToggle';
import { getProjectBySlug } from './data/projects';
import { heroDissipatedAt } from './heroChoreography';
import { motion } from 'motion/react';

const STATIC_PAGE_HASHES = ['#/privacy', '#/apunte/privacy', '#/apunte/terms', '#/early-access', '#/about', '#/thanks'];


const getProjectFromHash = () => {
  const match = window.location.hash.match(/^#\/projects\/([a-z0-9-]+)$/);
  return getProjectBySlug(match?.[1] ?? null);
};

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [activeProject, setActiveProject] = useState(getProjectFromHash);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setActiveProject(getProjectFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeProject || STATIC_PAGE_HASHES.includes(currentHash)) {
      const scrollId = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 0);

      return () => window.clearTimeout(scrollId);
    }
  }, [activeProject, currentHash]);

  // The menu bar stays out of the way until RETRAC LABS has finished
  // dissipating, the same hand-off jarredmcarter.com makes. Interior pages have
  // no hero to wait for, so it is there from the start.
  const onHomePage = !activeProject && !STATIC_PAGE_HASHES.includes(currentHash);

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
        <div className="flex items-center gap-4 sm:gap-8 px-4 sm:px-6 py-3 bg-zinc-900/95 light:bg-white/95 backdrop-blur-xl border-2 border-zinc-800 light:border-zinc-200 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto max-w-[calc(100vw-1.5rem)]">
          <a href="#" className="text-lg sm:text-xl font-black text-white light:text-zinc-900 uppercase whitespace-nowrap">
            Retrac<span className="text-zinc-500 light:text-zinc-600">Labs</span>
          </a>
          <nav className="flex gap-3 sm:gap-6 text-[10px] sm:text-sm font-bold font-mono text-zinc-400 light:text-zinc-600">
            <a href="#apps" className="hover:text-cyan-400 light:hover:text-cyan-700 transition-colors">LAB</a>
            <a href="#/about" className="hover:text-fuchsia-400 light:hover:text-fuchsia-700 transition-colors">ABOUT</a>
            <a href="#/early-access" className="hover:text-emerald-400 light:hover:text-emerald-700 transition-colors">BETA</a>
            <a href="mailto:retrac.labs@gmail.com" className="hover:text-yellow-400 light:hover:text-yellow-600 transition-colors">CONTACT</a>
          </nav>

          <div className="w-px h-5 bg-zinc-800 light:bg-zinc-200 shrink-0" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </motion.header>

      {currentHash === '#/privacy' ? (
        <PrivacyPolicy />
      ) : currentHash === '#/apunte/privacy' ? (
        <ApuntePrivacy />
      ) : currentHash === '#/apunte/terms' ? (
        <ApunteTerms />
      ) : currentHash === '#/early-access' ? (
        <EarlyAccess />
      ) : currentHash === '#/about' ? (
        <About />
      ) : currentHash === '#/thanks' ? (
        <Thanks />
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
  );
}
