import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Animate the SVG camera instead of scaling the entire element. This keeps the title vector-crisp
  // during the dive between the two words.
  const viewBox = useTransform(
    scrollYProgress,
    [0, 0.32, 0.72],
    ['0 0 1000 500', '120 70 760 380', '360 180 280 140'],
  );

  const textOpacity = useTransform(scrollYProgress, [0.58, 0.76], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  return (
    <section ref={containerRef} className="relative h-[145svh] md:h-[150vh] selection:bg-cyan-400 selection:text-black">
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-28 sm:top-32 flex justify-center w-full z-10 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-xs sm:text-sm font-bold font-mono text-cyan-400 shadow-[4px_4px_0px_0px_rgba(39,39,42,1)]"
          >
            <Sparkles className="w-4 h-4" />
            v2.0 IN DEVELOPMENT
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="flex flex-col items-center justify-center relative z-20 pointer-events-none w-full max-w-7xl mx-auto"
        >
          <motion.svg
            viewBox={viewBox}
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
              x="50%"
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-black text-[220px] uppercase fill-white"
              style={{ letterSpacing: 0 }}
            >
              Retrac
            </motion.text>
            <motion.text
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.4 }}
              x="50%"
              y="350"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-black text-[220px] uppercase"
              style={{ letterSpacing: 0 }}
              fill="url(#textGrad)"
            >
              Labs
            </motion.text>
          </motion.svg>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest text-center">
              Scroll to Dive In
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-8 rounded-full bg-gradient-to-b from-zinc-500 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
