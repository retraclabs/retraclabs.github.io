import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// How long the mouse has to sit still before the floppy takes over.
const IDLE_MS = 2200;

// ── Floppy Disk SVG ───────────────────────────────────────────────────────────
// 32 × 34 px canvas, center (16, 17).
// Classic 3.5" floppy: chamfered top-right corner, cream label, silver shutter.
const FloppySVG = () => (
  <svg
    width="32"
    height="34"
    viewBox="0 0 32 34"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <defs>
      <linearGradient id="shutter-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#B0B0B0" />
        <stop offset="100%" stopColor="#787878" />
      </linearGradient>
      <linearGradient id="label-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#F0EAD6" />
        <stop offset="100%" stopColor="#E0D8C4" />
      </linearGradient>
    </defs>

    {/* ── Disk body: rounded rect with chamfered top-right corner ── */}
    <path
      d="M 2 0
         L 23 0
         L 32 9
         L 32 32
         Q 32 34 30 34
         L 2 34
         Q 0 34 0 32
         L 0 2
         Q 0 0 2 0
         Z"
      fill="#252525"
    />

    {/* Chamfer triangle shadow — gives depth to the corner cut */}
    <path d="M 23 0 L 32 9 L 23 9 Z" fill="#111111" />

    {/* ── Label area ── */}
    <rect x="3" y="3" width="17" height="16" rx="1.5" fill="url(#label-grad)" />

    {/* Ruled lines on the label */}
    <line x1="5.5" y1="8"  x2="18" y2="8"  stroke="#C8C0A8" strokeWidth="0.8" />
    <line x1="5.5" y1="11" x2="16" y2="11" stroke="#C8C0A8" strokeWidth="0.8" />
    <line x1="5.5" y1="14" x2="14" y2="14" stroke="#C8C0A8" strokeWidth="0.8" />

    {/* Small colored sticker dot — top-left of label */}
    <rect x="5" y="4.5" width="4" height="2" rx="0.5" fill="#22d3ee" opacity="0.9" />

    {/* ── Write-protect notch — top-left corner of body ── */}
    <rect x="3" y="0" width="5" height="3" rx="0.5" fill="#1A1A1A" />

    {/* ── Metal shutter ── */}
    <rect x="3" y="22" width="26" height="9" rx="1.5" fill="url(#shutter-grad)" />

    {/* Shutter slot — the read/write access opening */}
    <rect x="9" y="24.5" width="14" height="4" rx="0.5" fill="#1A1A1A" />

    {/* Inner magnetic disk visible through slot */}
    <circle cx="16" cy="26.5" r="2.2" fill="#383838" />
    {/* Hub ring */}
    <circle cx="16" cy="26.5" r="1.1" fill="#888" />
    {/* Hub hole */}
    <circle cx="16" cy="26.5" r="0.45" fill="#1A1A1A" />

    {/* Shutter ridge line — subtle detail */}
    <line x1="4" y1="23" x2="28" y2="23" stroke="#C8C8C8" strokeWidth="0.4" opacity="0.4" />

    {/* ── Specular highlight on body — top-left sheen ── */}
    <rect x="1" y="1" width="10" height="3" rx="1" fill="white" opacity="0.06" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
// Two cursors, one at a time:
//   • moving the mouse → the pixel arrow/hand from cursors.css (same as
//     jarredmcarter.com), floppy hidden.
//   • mouse held still for IDLE_MS → .cursor-idle goes on <html>, which sets
//     cursor:none, and the floppy fades in at the last known position and spins.
// Scrolling is intentionally NOT treated as activity: a reader who is only
// scrolling stays in the floppy state.
export const CustomCursor = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // A soft spring so the floppy drifts into place rather than snapping.
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduceMotion(motionQuery.matches);
    onMotionChange();
    motionQuery.addEventListener('change', onMotionChange);

    // A coarse pointer has no cursor to replace, so leave the whole thing off.
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)');
    if (coarse.matches) {
      motionQuery.removeEventListener('change', onMotionChange);
      return;
    }

    const goIdle = () => {
      setIsIdle(true);
      document.documentElement.classList.add('cursor-idle');
    };

    const wake = () => {
      setIsIdle(false);
      document.documentElement.classList.remove('cursor-idle');
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(goIdle, IDLE_MS);
    };

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // center the 32 px width on the pointer
      cursorY.set(e.clientY - 17); // center the 34 px height
      setHasPosition(true);
      wake();
    };

    // Leaving the window hides the floppy; the pixel cursor is the OS's problem.
    const onLeave = () => {
      setHasPosition(false);
      window.clearTimeout(idleTimer.current);
      setIsIdle(false);
      document.documentElement.classList.remove('cursor-idle');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', wake);
    window.addEventListener('wheel', wake, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    // Start the clock so an untouched page settles into the floppy on its own.
    idleTimer.current = window.setTimeout(goIdle, IDLE_MS);

    return () => {
      window.clearTimeout(idleTimer.current);
      document.documentElement.classList.remove('cursor-idle');
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', wake);
      window.removeEventListener('wheel', wake);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ x, y }}
      animate={{
        opacity: isIdle && hasPosition ? 1 : 0,
        scale: isIdle && hasPosition ? 1 : 0.7,
        rotate: reduceMotion ? 0 : 360,
      }}
      transition={{
        opacity: { duration: 0.35, ease: 'easeOut' },
        scale: { duration: 0.35, ease: 'easeOut' },
        // One lazy spin every 5 s, the same idle tempo it always had.
        rotate: reduceMotion
          ? { duration: 0 }
          : { repeat: Infinity, ease: 'linear', duration: 5 },
      }}
    >
      <FloppySVG />
    </motion.div>
  );
};
