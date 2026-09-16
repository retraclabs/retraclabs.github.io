import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { LabRat } from './LabRat';
import { projects, isAnnounced } from '../data/projects';

/* Where a Lab Rat lands after the form goes through. EarlyAccess.tsx sends them
   here by setting the hash, which means Formspree's own "redirect on success"
   setting is irrelevant to us: the form posts over fetch, so the browser never
   leaves the site and we own what happens next. That setting is behind a paid
   plan, and it is not one you need. */

export const Thanks = () => {
  // Anything shipping is worth a download while they wait for an invite.
  const shipping = projects.filter((project) => isAnnounced(project) && project.appStoreUrl);

  return (
    <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* ── the moment ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
        >
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[90px] opacity-20 bg-cyan-500" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, type: 'spring', bounce: 0.45 }}
              className="w-48 sm:w-60 mb-8"
            >
              <LabRat className="w-full h-auto overflow-visible" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900/50 light:bg-white/60 text-xs font-bold font-mono text-cyan-400 light:text-cyan-700 mb-6">
              SPECIMEN ACCEPTED
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white light:text-zinc-900 uppercase mb-6 leading-[0.95]">
              You're a Lab Rat now
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed max-w-xl">
              Thank you. Genuinely. Retrac Labs has no QA department and no focus group, so the
              people who volunteer to run unfinished software on their own machines are the entire
              quality process. That is not a figure of speech.
            </p>
          </div>
        </motion.section>

        {/* ── what happens next, so nobody is left wondering ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 mb-6"
        >
          <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">What happens now</h2>
          <ol className="space-y-5">
            {[
              [
                'Nothing, for a while.',
                "That is the honest answer. Your details sit in an inbox until there is a build that matches your hardware. It could be next week or it could be a few months. Silence is not a rejection.",
              ],
              [
                'Then an email from retrac.labs@gmail.com.',
                "It will name the app, say roughly what state it is in, and tell you what we are hoping to learn. Worth adding that address to your contacts so it does not land in spam.",
              ],
              [
                'A TestFlight link, if you still want in.',
                "You can say no to any individual build without leaving the program. Nobody keeps score.",
              ],
            ].map(([title, detail], index) => (
              <li key={title} className="flex gap-4">
                <span className="font-mono font-black text-cyan-400 light:text-cyan-700 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <strong className="block text-white light:text-zinc-900 font-bold mb-1">{title}</strong>
                  <span className="text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">{detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="border-t-2 border-zinc-800 light:border-zinc-200 mt-8 pt-6">
            <p className="text-sm text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">
              Changed your mind, or sent the wrong address? Email{' '}
              <a href="mailto:retrac.labs@gmail.com" className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800">
                retrac.labs@gmail.com
              </a>{' '}
              and it is dealt with, no explanation needed. What we do with your details is spelled
              out in the{' '}
              <a href="#/privacy" className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800">
                privacy policy
              </a>
              .
            </p>
          </div>
        </motion.section>

        {/* ── convert the wait into a download ── */}
        {shipping.length ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 mb-6"
          >
            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-2">While you wait</h2>
            <p className="text-zinc-400 light:text-zinc-600 font-medium mb-6">
              These two are finished and on the App Store today.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shipping.map((project) => {
                const Icon = project.icon;
                return (
                  <a
                    key={project.slug}
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 border-2 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-2xl p-5 hover:border-cyan-400 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-zinc-800 light:bg-zinc-100 text-white light:text-zinc-900 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-white light:text-zinc-900">{project.name}</div>
                        <div className="text-sm text-zinc-500 light:text-zinc-600 font-mono font-bold">
                          {project.platform}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 light:text-zinc-600 shrink-0" />
                  </a>
                );
              })}
            </div>
          </motion.section>
        ) : null}

        {/* ── out ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#"
            className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white light:bg-zinc-900 text-black light:text-white font-black border-2 border-white light:border-zinc-900 hover:bg-yellow-400 light:hover:text-zinc-900 hover:border-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to the Lab
          </a>
          <a
            href="mailto:retrac.labs@gmail.com"
            className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-zinc-900 light:bg-white text-white light:text-zinc-900 font-bold border-2 border-zinc-700 light:border-zinc-300 hover:border-cyan-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Say hello
          </a>
        </motion.section>
      </div>
    </main>
  );
};
