import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import type { AccentStyle } from '../data/accents';

/* The wash of color on a project's title card.

   It enters from the top-right corner, drifts slowly across the card, and keeps
   gaining intensity for the first 40 seconds somebody is on the page. The effect
   is meant to be almost subliminal: nobody should catch it moving, they should
   just feel the card was flatter a minute ago.

   Three things make it read as organic rather than as a loop:

   1. The two blobs have different periods (37s and 53s) and share no common
      factor worth noticing, so the pair does not visibly repeat.
   2. Intensity ramps on its own, much slower timeline, and does NOT repeat. It
      settles at full rather than pulsing, because a pulse would read as a
      loading state.
   3. Everything animates on transform and opacity only. Animating `left`/`top`
      on a 100px-blurred element repaints the whole card every frame. As written
      it stays on the compositor: measured identical frame times with the effect
      on and off, idle and while scrolling.

   The animations are driven imperatively rather than with `animate` props so
   they can be genuinely PAUSED when the card scrolls out of view. Pausing, as
   opposed to unmounting or restarting, is what lets the intensity ramp survive
   a scroll away: come back to the card and it carries on from where it was,
   instead of blooming from nothing a second time. */

/** How long the intensity ramp takes to top out, in seconds. */
const RAMP_SECONDS = 40;

/** Keep animating a little beyond the viewport, so the effect is already in
 *  motion by the time the card is actually on screen. */
const IN_VIEW_MARGIN = '120px';

type Props = {
  accent: AccentStyle;
};

export const AccentGlow = ({ accent }: Props) => {
  const reduceMotion = useReducedMotion();
  // A plain ref, not useAnimate's scope: useInView reads `.current` off a real
  // RefObject and silently reports false forever when handed an AnimationScope.
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { margin: IN_VIEW_MARGIN });

  const accentRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const runs = useRef<{ play: () => void; pause: () => void; stop: () => void }[]>([]);

  useEffect(() => {
    if (reduceMotion) return;
    const accentEl = accentRef.current;
    const gradientEl = gradientRef.current;
    if (!accentEl || !gradientEl) return;

    const started = [
      animate(
        accentEl,
        {
          opacity: [0, 0.14, 0.36, 0.6],
          scale: [0.9, 1.1, 1.25, 1.15],
          x: [60, -40, -130, -60],
          y: [-60, 40, 110, 30],
        },
        {
          opacity: { duration: RAMP_SECONDS, times: [0, 0.06, 0.35, 1], ease: 'easeOut' },
          scale: { duration: 37, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          x: { duration: 37, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          y: { duration: 37, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        },
      ),
      animate(
        gradientEl,
        {
          opacity: [0, 0, 0.16, 0.38],
          scale: [0.8, 1.05, 1.2, 1],
          x: [40, -100, -20, -70],
          y: [-30, 90, 160, 60],
        },
        {
          opacity: { duration: RAMP_SECONDS, times: [0, 0.12, 0.45, 1], ease: 'easeOut' },
          scale: { duration: 53, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          x: { duration: 53, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          y: { duration: 53, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        },
      ),
    ];

    runs.current = started;
    return () => {
      started.forEach((run) => run.stop());
      runs.current = [];
    };
  }, [reduceMotion]);

  // The whole point of the exercise: no frames are spent on a card nobody can
  // see. Pause holds elapsed time, so coming back resumes mid-ramp.
  useEffect(() => {
    if (reduceMotion) return;
    runs.current.forEach((run) => (isInView ? run.play() : run.pause()));
  }, [isInView, reduceMotion]);

  return (
    // The outer wrapper damps the whole effect on light backgrounds, where a
    // saturated blur at full strength turns the card muddy. Opacity multiplies,
    // so the ramp above reaches ~0.6 on dark and ~0.36 on light.
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-100 light:opacity-60"
    >
      <div
        ref={accentRef}
        className={'absolute -right-28 -top-28 w-[26rem] h-[26rem] rounded-full blur-[100px] ' + accent.detailGlow}
        // Anyone who asked for less movement gets a static wash at the old fixed
        // strength: the card keeps its color, it just does not crawl.
        style={reduceMotion ? { opacity: 0.2 } : { opacity: 0, transform: 'translate(60px, -60px) scale(0.9)' }}
      />
      <div
        ref={gradientRef}
        className="absolute -right-12 -top-36 w-[22rem] h-[22rem] rounded-full blur-[110px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400"
        style={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translate(40px, -30px) scale(0.8)' }}
      />
    </div>
  );
};
