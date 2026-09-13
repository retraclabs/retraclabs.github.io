/* The numbers behind the opening animation, in one place because two
   components need to agree on them: Hero.tsx draws the wordmark zooming away,
   and App.tsx holds the menu bar back until that zoom has finished.

   The feel is lifted from jarredmcarter.com: the wordmark rushes toward the
   reader, blurs, and fades out, rather than simply scrolling off the top. */

/** Total height of the hero section, in vh. The scrollable span is this minus
 *  the 100vh the sticky panel occupies, so 185 gives 85vh of runway. */
export const HERO_SECTION_VH = 185;

/** Fraction of that runway the wordmark takes to fully dissipate. The tail
 *  that is left over is breathing room before the Lab section arrives. */
export const HERO_FADE_END = 0.8;

/** Clamp to 0..1. */
export const c01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Smoothstep. Eases the zoom in and out so it does not start with a jerk. */
export const smooth = (v: number) => v * v * (3 - 2 * v);

/** Scroll position (px) at which the wordmark has completely dissipated.
 *  App.tsx reveals the menu bar here. */
export const heroDissipatedAt = () =>
  (HERO_SECTION_VH / 100 - 1) * window.innerHeight * HERO_FADE_END;
