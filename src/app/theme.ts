/* Light mode, bolted onto a site that was written dark-first.

   Rather than rewrite every component as light-with-dark-overrides, the dark
   palette stays the unprefixed default and light is a `light:` variant defined
   in tailwind.css. So `bg-zinc-900 light:bg-white` reads as "dark by default,
   white when someone asks for it", which is exactly the intent.

   The class lives on <html>. index.html sets it before React mounts, so a
   reader who chose light never sees a flash of dark first. */

export type Theme = 'dark' | 'light';

export const DEFAULT_THEME: Theme = 'dark';

/** Shared with the inline boot script in index.html. Change both together. */
export const THEME_STORAGE_KEY = 'retraclabs-theme';

/** What the reader picked last time, or dark. Deliberately does NOT consult
 *  prefers-color-scheme: the site is dark by default for everyone, and light is
 *  something you opt into. */
export const readStoredTheme = (): Theme => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : DEFAULT_THEME;
  } catch {
    // Private browsing, or storage blocked entirely. Fall back to the default.
    return DEFAULT_THEME;
  }
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  // Tells the browser which way to render form controls, scrollbars, and the
  // canvas behind the page.
  root.style.colorScheme = theme === 'light' ? 'light' : 'dark';

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Not being able to remember the choice is survivable; failing is not.
  }
};
