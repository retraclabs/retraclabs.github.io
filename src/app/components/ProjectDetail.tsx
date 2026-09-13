import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Project, projects, isAnnounced } from '../data/projects';
import { ACCENTS } from '../data/accents';

type ProjectDetailProps = {
  project: Project;
};

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const Icon = project.icon;
  const accent = ACCENTS[project.accent];
  // Unannounced projects have no page to link to, so they stay off this list.
  const relatedProjects = projects.filter(
    (item) => item.slug !== project.slug && isAnnounced(item),
  );

  return (
    <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.a
          href="#apps"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lab
        </motion.a>

        <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden"
          >
            <div className={'absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[90px] opacity-20 ' + accent.detailGlow} />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-white text-black">
                  <Icon className="w-8 h-8" />
                </div>
                <span className={'px-4 py-2 rounded-full bg-zinc-800 font-mono font-bold text-sm ' + accent.text}>
                  {project.platform}
                </span>
                <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 font-mono font-bold text-sm">
                  {project.status}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase mb-6">
                {project.name}
              </h1>
              <p className="text-xl sm:text-2xl text-zinc-300 font-medium leading-relaxed max-w-3xl">
                {project.summary}
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-4 border-zinc-800 bg-[#0f0f12] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
          >
            <div className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-4">
              Current Focus
            </div>
            <p className="text-zinc-300 font-medium leading-relaxed mb-8 whitespace-pre-line">
              {project.description}
            </p>
            {project.appStoreUrl ? (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-cyan-400 text-black font-black border-2 border-cyan-400 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                {project.platform === 'iOS' ? 'Download on the App Store' : 'Download on the Mac App Store'}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            ) : (
              <a
                href="mailto:retrac.labs@gmail.com"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-white text-black font-black border-2 border-white hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                Ask About This
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </motion.aside>
        </section>

        {project.version ? (
          /* A shipped app gets a straight comparison: what is on your Mac now
             against what the next build adds, instead of a vague roadmap. */
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h2 className="text-2xl font-black text-white">Latest Version</h2>
                <span className={'px-3 py-1 rounded-full bg-zinc-800 font-mono font-black text-sm ' + accent.text}>
                  {project.version.current}
                </span>
              </div>
              <p className="text-sm text-zinc-500 font-mono mb-6">Shipping today.</p>
              <div className="space-y-4">
                {project.version.currentFeatures.map((feature) => (
                  <div key={feature} className="flex gap-3 text-zinc-300 font-medium">
                    <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="border-4 border-dashed border-zinc-800 bg-[#0f0f12] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h2 className="text-2xl font-black text-white">Next Version</h2>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 font-mono font-black text-sm">
                  {project.version.next}
                </span>
              </div>
              <p className="text-sm text-zinc-500 font-mono mb-6">In the lab. Not shipped yet.</p>
              <div className="space-y-4">
                {project.version.nextFeatures.map((feature) => (
                  <div key={feature} className="flex gap-3 text-zinc-400 font-medium">
                    <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-zinc-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {project.highlights?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
              >
                <h2 className="text-2xl font-black text-white mb-6">What It Is</h2>
                <div className="space-y-4">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex gap-3 text-zinc-300 font-medium">
                      <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {project.nextSteps?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
              >
                <h2 className="text-2xl font-black text-white mb-6">Next Steps</h2>
                <div className="space-y-4">
                  {project.nextSteps.map((step, index) => (
                    <div key={step} className="flex gap-3 text-zinc-300 font-medium">
                      <span className={'font-mono font-black ' + accent.text}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </section>
        )}

        {/* Snippystack's highlights still deserve a home when the version pair
            has taken the lower row. */}
        {project.version && project.highlights?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 mt-6"
          >
            <h2 className="text-2xl font-black text-white mb-6">What It Is</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-zinc-300 font-medium">
                  <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {relatedProjects.length ? (
          <section className="mt-14">
            <div className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-4">
              Other Experiments
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProjects.map((relatedProject) => {
                const RelatedIcon = relatedProject.icon;

                return (
                  <a
                    key={relatedProject.slug}
                    href={'#/projects/' + relatedProject.slug}
                    className="flex items-center justify-between gap-4 border-2 border-zinc-800 bg-zinc-900 rounded-2xl p-5 hover:border-white transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-zinc-800 text-white">
                        <RelatedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-white">{relatedProject.name}</div>
                        <div className="text-sm text-zinc-500 font-mono font-bold">{relatedProject.platform}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500" />
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};
