import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HERO_SECTION_VH, HERO_FADE_END, c01, smooth } from '../heroChoreography';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // `h` is the wordmark's own 0..1 progress: it finishes well before the
  // section does, which leaves a beat of empty scroll before the Lab arrives.
  const h = useTransform(scrollYProgress, (p) => c01(p / HERO_FADE_END));

  // The three moves that make it "dissipate" rather than just scroll away:
  // it rushes toward the reader, goes soft, and burns off. Same curve as
  // jarredmcarter.com: scale 1 to 3.1, blur ramping quadratically to 4.2px.
  const scale = useTransform(h, (v) => 1 + smooth(v) * 2.1);
  const textOpacity = useTransform(h, (v) => 1 - c01((v - 0.18) / 0.82));
  const filter = useTransform(h, (v) =>
    v > 0.02 ? `blur(${(v * v * 4.2).toFixed(2)}px)` : 'none',
  );
  // Once it is gone, take it out of the compositor entirely.
  const visibility = useTransform(h, (v) => (v >= 1 ? 'hidden' : 'visible'));

  // The scroll cue leaves almost immediately; it has done its job by then.
  const cueOpacity = useTransform(scrollYProgress, (p) => c01(1 - p * 9));

  return (
    <section
      ref={containerRef}
      style={{ height: `${HERO_SECTION_VH}svh` }}
      className="relative selection:bg-cyan-400 selection:text-black"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity, scale, filter, visibility }}
          className="flex flex-col items-center justify-center relative z-20 pointer-events-none w-full max-w-7xl mx-auto will-change-[transform,opacity,filter]"
        >
          <motion.svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            textRendering="geometricPrecision"
            className="w-full h-auto overflow-visible"
          >
            <defs>
              <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e879f9" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <motion.text
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, type: 'spring', bounce: 0.4 }}
              x={500}
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-black text-[220px] fill-white light:fill-zinc-900"
              style={{ letterSpacing: 0 }}
            >
              RETRAC
            </motion.text>
            <motion.text
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.4 }}
              x={500}
              y="350"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-black text-[220px]"
              style={{ letterSpacing: 0 }}
              fill="url(#textGrad)"
            >
              LABS
            </motion.text>
          </motion.svg>
        </motion.div>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 light:text-zinc-600 uppercase tracking-widest text-center">
              Specimens Below
            </span>
            {/* A drawn arrow rather than a tapered bar. The old gradient faded
                out exactly where the head should have been, so there was no head. */}
            <motion.svg
              width="18"
              height="30"
              viewBox="0 0 18 30"
              fill="none"
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="overflow-visible"
            >
              <path
                d="M9 1 V23"
                stroke="#71717a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2.5 17.5 L9 24.5 L15.5 17.5"
                stroke="#a1a1aa"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
