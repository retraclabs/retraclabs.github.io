import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const [amparo, snippystack, fiel, nexus, apunte] = projects;

export const LabSection = () => {
  const openProject = (slug: string) => {
    window.location.hash = `#/projects/${slug}`;
  };

  const AmparoIcon = amparo.icon;
  const SnippystackIcon = snippystack.icon;
  const FielIcon = fiel.icon;
  const NexusIcon = nexus.icon;
  const ApunteIcon = apunte.icon;

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
              href="#lab-grid"
              style={{ boxShadow: '0px 0px 0px 0px rgba(244,114,182,0)' }}
              whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(244,114,182,1)' }}
              whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px rgba(244,114,182,1)' }}
              className="group flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-2xl bg-white text-black font-black tracking-wide border-2 border-white transition-all md:cursor-none"
            >
              Explore the Lab
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="mailto:retrac.labs@gmail.com"
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

        <div id="lab-grid" className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[280px] scroll-mt-8">
          <motion.button
            type="button"
            onClick={() => openProject('fiel')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(16,185,129,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(16,185,129,1)' }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="col-span-1 md:col-span-4 lg:col-span-6 bg-zinc-900 border-4 border-zinc-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500 transition-colors text-left md:cursor-none"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(16,185,129,0.08),transparent_55%)]" />

            <div className="relative z-10 h-full flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-800 text-emerald-400">
                    <FielIcon className="w-8 h-8" />
                  </div>
                  <span className="px-4 py-2 rounded-full bg-zinc-800 text-white font-mono font-bold text-sm">
                    {fiel.platform}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                    In Development · TestFlight beta planned
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{fiel.name}</h3>
                  <p className="text-zinc-400 font-medium max-w-lg">{fiel.summary}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end sm:items-end shrink-0 gap-1.5">
                <p className="text-zinc-500 font-mono text-xs sm:text-right leading-relaxed max-w-xs">
                  On-device AI. No server, no account, no network permission.
                </p>
                <p className="text-emerald-600 font-mono text-xs sm:text-right">
                  Verify it yourself on the shipped binary.
                </p>
              </div>
            </div>
          </motion.button>

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

          <motion.button
            type="button"
            onClick={() => openProject('apunte')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(56,189,248,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(56,189,248,1)' }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.25 }}
            className="col-span-1 md:col-span-4 lg:col-span-6 bg-zinc-900 border-4 border-zinc-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-sky-500 transition-colors text-left md:cursor-none"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(56,189,248,0.08),transparent_55%)]" />

            <div className="relative z-10 h-full flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-800 text-sky-400">
                    <ApunteIcon className="w-8 h-8" />
                  </div>
                  <span className="px-4 py-2 rounded-full bg-zinc-800 text-white font-mono font-bold text-sm">
                    {apunte.platform}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 font-mono font-bold text-xs border border-sky-500/20">
                    {apunte.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{apunte.name}</h3>
                  <p className="text-zinc-400 font-medium max-w-lg">{apunte.summary}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end sm:items-end shrink-0 gap-1.5">
                <p className="text-zinc-500 font-mono text-xs sm:text-right leading-relaxed max-w-xs">
                  Transcribes on-device. No uploads, no account, no network entitlement.
                </p>
                <p className="text-sky-600 font-mono text-xs sm:text-right">
                  Verify it yourself with codesign.
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => openProject('ambient-desk')}
            initial={{ opacity: 0, y: 40 }}
            style={{ boxShadow: '0px 0px 0px 0px rgba(168,85,247,0)' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px rgba(168,85,247,1)' }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
            className="col-span-1 md:col-span-4 lg:col-span-6 bg-zinc-900 border-4 border-zinc-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-purple-500 transition-colors text-left md:cursor-none"
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
                      whileInView={{ width: '35%' }}
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
