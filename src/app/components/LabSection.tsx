import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { projects, isAnnounced, type Project } from '../data/projects';
import { ACCENTS, SPANS } from '../data/accents';

const openProject = (slug: string) => {
  window.location.hash = `#/projects/${slug}`;
};

/* One card, built from the project's own data. Every card in the grid comes
   through here, which is why reordering the `projects` array is all it takes to
   reorder the page; there is no per-project markup left to keep in sync. */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const accent = ACCENTS[project.accent];
  const Icon = project.icon;
  const announced = isAnnounced(project);

  const shared =
    `${SPANS[project.span]} col-span-1 bg-zinc-900 border-4 border-zinc-800 ` +
    'rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group ' +
    'transition-colors text-left';

  const body = (
    <>
      <div className={'absolute inset-0 ' + accent.glow} />

      <div className="relative z-10 h-full flex flex-col justify-between gap-6">
        <div className="flex justify-between items-start gap-4">
          <div className={'p-4 rounded-2xl ' + accent.iconBg}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <span className="px-4 py-2 rounded-full bg-zinc-800 text-white font-mono font-bold text-sm">
              {project.platform}
            </span>
            <span
              className={
                'px-4 py-2 rounded-full font-mono font-bold text-sm border ' + accent.pill
              }
            >
              {project.status}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{project.name}</h3>
          {/* Announced projects show the full summary. Unannounced ones fall back
              to the one-line teaser, which says what the thing does without
              naming it or announcing it. */}
          <p className="text-zinc-400 font-medium max-w-lg">
            {announced ? project.summary : project.teaser}
          </p>
        </div>
      </div>
    </>
  );

  const animation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { type: 'spring' as const, bounce: 0.4, delay: Math.min(index, 4) * 0.06 },
  };

  // An unannounced project has nowhere to go, so it is not a button. Making it
  // one would promise a page that says nothing.
  if (!announced) {
    return (
      <motion.div {...animation} className={shared + ' border-dashed'}>
        {body}
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => openProject(project.slug)}
      {...animation}
      style={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
      whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px ' + accent.shadow }}
      className={shared + ' ' + accent.border}
    >
      {body}
    </motion.button>
  );
};

export const LabSection = () => (
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
          Retrac Labs designs and builds <strong className="text-white font-bold">playful, powerful, and precise</strong> experiences for the Apple ecosystem.
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
            className="group flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-2xl bg-white text-black font-black tracking-wide border-2 border-white transition-all"
          >
            Visit the Lab
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#/early-access"
            style={{ boxShadow: '0px 0px 0px 0px rgba(34,211,238,0)' }}
            whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(34,211,238,1)' }}
            whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px rgba(34,211,238,1)' }}
            className="flex items-center justify-center px-7 sm:px-8 py-4 rounded-2xl bg-zinc-900 text-white font-bold tracking-wide border-2 border-zinc-700 hover:border-cyan-400 transition-all"
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

      {/* scroll-mt clears the floating menu bar, which is ~5.5rem tall where it
          sits. Without it the jump from "Visit the Lab" tucks the first row of
          cards underneath the bar. */}
      <div
        id="lab-grid"
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[280px] scroll-mt-32"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
