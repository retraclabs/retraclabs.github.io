import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, readStoredTheme, type Theme } from '../theme';

/* Sits in the menu bar. The icon shows what you will GET, not what you are in,
   which is the convention people expect: a sun means "switch to light". */
export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  // index.html has already put the class on <html> before React mounted, so
  // this only syncs component state with what is already on screen. Reading it
  // back from the DOM rather than storage keeps the two from disagreeing.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : readStoredTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const goingTo = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${goingTo} mode`}
      title={`Switch to ${goingTo} mode`}
      className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-zinc-400 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors shrink-0"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        ) : (
          <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}
      </motion.span>
    </button>
  );
};
