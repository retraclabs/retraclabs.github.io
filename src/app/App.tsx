import React, { useEffect, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { LabSection } from './components/LabSection';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { getProjectBySlug } from './data/projects';
import { motion } from 'motion/react';


const getProjectFromHash = () => {
  const match = window.location.hash.match(/^#\/projects\/([a-z0-9-]+)$/);
  return getProjectBySlug(match?.[1] ?? null);
};

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [activeProject, setActiveProject] = useState(getProjectFromHash);

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
    if (activeProject || currentHash === '#/privacy') {
      const scrollId = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 0);

      return () => window.clearTimeout(scrollId);
    }
  }, [activeProject, currentHash]);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-50 selection:bg-fuchsia-500/30 selection:text-white md:cursor-none font-sans overflow-x-hidden">
      <CustomCursor />
      <AnimatedBackground />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div className="flex items-center gap-4 sm:gap-8 px-4 sm:px-6 py-3 bg-zinc-900/80 backdrop-blur-xl border-2 border-zinc-800 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto max-w-[calc(100vw-1.5rem)]">
          <a href="#" className="text-lg sm:text-xl font-black text-white uppercase md:cursor-none whitespace-nowrap">
            Retrac<span className="text-zinc-500">Labs</span>
          </a>
          <nav className="flex gap-3 sm:gap-6 text-[10px] sm:text-sm font-bold font-mono text-zinc-400">
            <a href="#apps" className="hover:text-cyan-400 transition-colors md:cursor-none">LAB</a>
            <a href="#about" className="hover:text-fuchsia-400 transition-colors md:cursor-none">ABOUT</a>
            <a href="mailto:hello@retraclabs.com" className="hover:text-yellow-400 transition-colors md:cursor-none">CONTACT</a>
          </nav>
        </div>
      </motion.header>

      {currentHash === '#/privacy' ? (
        <PrivacyPolicy />
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
