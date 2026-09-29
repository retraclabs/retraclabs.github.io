import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, FlaskConical } from 'lucide-react';
import type { LabNote } from '../labNotes';
import { LabNoteAccent } from '../labNotes/kit';
import { getProjectBySlug } from '../data/projects';
import { ACCENTS } from '../data/accents';
import { AccentGlow } from './AccentGlow';

/* A lab note: header, body, and a way out. Someone who reads a methodology
   section to the end is about as convinced as a visitor gets, so the page ends
   on the product and its download button rather than stranding them at the
   bottom of a benchmark.

   The column is narrower than the site's other pages on purpose. At this text
   size, the standard width runs past 90 characters a line, and long reading
   gets tiring well before that. */
export const LabNotePage = ({ note }: { note: LabNote }) => {
  const project = getProjectBySlug(note.projectSlug);
  const accent = ACCENTS[project?.accent ?? 'sky'];
  const productHref = project ? `#/projects/${project.slug}` : '#apps';
  const productName = project?.name ?? 'the Lab';
  const { Body } = note;

  return (
    <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.a
          href={productHref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {productName}
        </motion.a>

        <article>
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
          >
            <AccentGlow accent={accent} />
            <div className="relative z-10">
              <div className={'flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest mb-5 ' + accent.text}>
                <FlaskConical className="w-4 h-4" aria-hidden="true" />
                Lab Notes · {productName}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white light:text-zinc-900 uppercase leading-[0.95] mb-6">
                {note.title}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                {note.standfirst}
              </p>
              {note.dateline ? (
                <p className="mt-6 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600">{note.dateline}</p>
              ) : null}
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-10"
          >
            <LabNoteAccent value={accent}>
              <div className="space-y-12 text-base sm:text-lg text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                <Body />
              </div>
            </LabNoteAccent>
          </motion.div>
        </article>

        {project ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={productHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 light:bg-white text-white light:text-zinc-900 font-bold border-2 border-zinc-700 light:border-zinc-300 hover:border-white light:hover:border-zinc-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              About {project.name}
            </a>
            {project.appStoreUrl ? (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-cyan-400 text-black font-black border-2 border-cyan-400 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                {project.platform === 'iOS' ? 'Download on the App Store' : 'Download on the Mac App Store'}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            ) : null}
          </motion.section>
        ) : null}
      </div>
    </main>
  );
};
