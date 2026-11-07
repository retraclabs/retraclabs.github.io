import React from 'react';
import { motion } from 'motion/react';

export const AnimatedBackground = () => {
  return (
    // A fixed layer touching the screen's edges, so it matches the page's ground
    // in both themes: on the folded iPhone Duo, Safari can take its side
    // toolbar's color from a layer like this one (jarredmcarter.com's .backdrop).
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#09090b] light:bg-[#f4f4f5]">
      {/* Stark, Remix-style dot grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Playful, Ditto-style floating geometric shapes in the background */}
      <motion.div
        animate={{
          y: ['-5%', '5%', '-5%'],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-[4rem] bg-fuchsia-500/10 blur-[80px] rotate-12"
      />
      
      <motion.div
        animate={{
          y: ['5%', '-5%', '5%'],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[100px]"
      />
    </div>
  );
};
