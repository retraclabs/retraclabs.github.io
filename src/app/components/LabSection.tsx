import React from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const [amparo, snippystack, nexus] = projects;

export const LabSection = () => {
  const openProject = (slug: string) => {
    window.location.hash = `#/projects/${slug}`;
  };

  const AmparoIcon = amparo.icon;
  const SnippystackIcon = snippystack.icon;
  const NexusIcon = nexus.icon;

  return (
    <section id="apps" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div id="about" className="flex flex-col items-center mb-24 sm:mb-40 pt-10 sm:pt-12 scroll-mt-32">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto text-center font-medium leading-relaxed mb-10 sm:mb-12"
          >
            We build <strong className="text-white font-bold">playful, powerful, and precise</strong> applications for macOS and iOS.
            <br className="hidden md:block" /> Currently experimenting in the laboratory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-stretch sm:items-center w-full sm:w-auto"
          >
            <motion.a
              href="#apps"
              style={{ boxShadow: '0px 0px 0px 0px rgba(244,114,182,0)' }}
              whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(244,114,182,1)' }}
              whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px rgba(244,114,182,1)' }}
              className="group flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-2xl bg-white text-black font-black tracking-wide border-2 border-white transition-all md:cursor-none"
            >
              Explore the Lab
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="mailto:hello@retraclabs.com"
              style={{ boxShadow: '0px 0px 0px 0px rgba(34,211,238,0)' }}
              whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(34,211,238,1)' }}
              whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px rgba(34,211,238,1)' }}
              className="flex items-center justify-center px-7 sm:px-8 py-4 rounded-2xl bg-zinc-900 text-white font-bold tracking-wide border-2 border-zinc-700 hover:border-cyan-400 transition-all md:cursor-none"
            >
              Get Early Access
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-16 space-y-4"
        >
          <div className="px-4 py-1.5 rounded-full border-2 border-zinc-800 bg-zinc-900 text-xs font-black font-mono text-zinc-400 uppercase tracking-widest">
            Current Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase">
            In the <span className="text-yellow-400">Lab</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[280px]">
          <motion.button
            type="button"
            onClick={() => openProject('amparo')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(244,114,182,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(244,114,182,1)' }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-zinc-900 border-4 border-zinc-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-pink-400 transition-colors text-left md:cursor-none"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div className="p-4 rounded-2xl bg-white text-black">
                  <AmparoIcon className="w-8 h-8" />
                </div>
                <span className="px-4 py-2 rounded-full bg-pink-400/10 text-pink-400 font-mono font-bold text-sm border-2 border-pink-400/20">
                  {amparo.platform}
                </span>
              </div>

              <div>
                <div className="text-pink-400 font-mono font-bold text-xs uppercase mb-2">{amparo.status}</div>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{amparo.name}</h3>
                <p className="text-zinc-400 font-medium text-base sm:text-lg max-w-md">
                  {amparo.summary}
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => openProject('snippystack')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(34,211,238,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(34,211,238,1)' }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-cyan-400 border-4 border-cyan-400 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-white transition-colors text-left md:cursor-none"
          >
            <div className="absolute -bottom-10 -right-10 opacity-20 transform group-hover:scale-110 transition-transform">
              <SnippystackIcon className="w-48 h-48 text-black" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div className="p-3 rounded-2xl bg-black text-cyan-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="px-4 py-2 rounded-full bg-black/10 text-black font-mono font-black text-sm">
                  {snippystack.platform}
                </span>
              </div>

              <div>
                <div className="text-black/60 font-mono font-black text-xs uppercase mb-2">{snippystack.status}</div>
                <h3 className="text-3xl font-black text-black mb-2 tracking-tight">{snippystack.name}</h3>
                <p className="text-black/70 font-bold text-sm leading-snug">
                  {snippystack.summary}
                </p>
              </div>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(250,204,21,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(250,204,21,1)' }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-yellow-400 border-4 border-yellow-400 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-white transition-colors md:cursor-none"
          >
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              <Layers className="w-16 h-16 text-black mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-black text-black mb-2 tracking-tight">Native Polish</h3>
              <p className="text-black/70 font-bold text-sm">
                Built for Apple platforms with crisp motion, touch-friendly controls, and focused workflows.
              </p>
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => openProject('nexus')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(168,85,247,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(168,85,247,1)' }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-zinc-900 border-4 border-zinc-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-purple-500 transition-colors text-left md:cursor-none"
          >
            <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full bg-zinc-800 text-white font-mono font-bold text-sm">
                    macOS
                  </span>
                  <span className="px-4 py-2 rounded-full bg-zinc-800 text-white font-mono font-bold text-sm">
                    iOS
                  </span>
                </div>
                <NexusIcon className="w-8 h-8 text-purple-400 shrink-0" />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{nexus.name}</h3>
                  <p className="text-zinc-400 font-medium max-w-sm">
                    {nexus.summary}
                  </p>
                </div>
                <div className="w-full md:w-auto md:text-right">
                  <div className="text-purple-400 font-mono font-bold text-sm mb-2">{nexus.status.toUpperCase()}</div>
                  <div className="w-full md:w-48 h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '15%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
