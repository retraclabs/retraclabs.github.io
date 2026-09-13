import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   YOUR BIT. Everything you need to change on this page is in this one block.

   The photo: drop the file in public/brand/ and put its filename below. A
   portrait-ish crop reads best, roughly 4:5, at least 1000px on the short edge.
   Leave FOUNDER_PHOTO as null until then and the page shows a tidy placeholder
   instead of a broken image.
   ───────────────────────────────────────────────────────────────────────────── */

const FOUNDER_PHOTO: string | null = null; // e.g. '/brand/jarred-carter.jpg'
const FOUNDER_PHOTO_ALT = 'Jarred M. Carter';

const FOUNDER_NAME = 'Jarred M. Carter';
const FOUNDER_ROLE = 'Founder';

/** The short version, sitting right under your name. One or two sentences. */
const FOUNDER_TAGLINE =
  'Security engineer in New York. Retrac Labs is where the software half of that goes.';

/** The long version. Each string is its own paragraph. Write these however you
 *  like; nothing here is load-bearing for the layout. */
const FOUNDER_BIO: string[] = [
  'REPLACE ME. A few paragraphs in your own voice: where you came from, what you ' +
    'did before this, and what made you start building apps of your own.',
  'REPLACE ME. What you care about in software, and why the apps in the lab look ' +
    'the way they do. This is the paragraph people actually remember.',
  'REPLACE ME. The human bit. What you do when you are not at a keyboard.',
];

/** Optional. Delete the array entries you do not want, or empty the array to
 *  drop the section entirely. */
const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: 'On-device by default',
    body: 'If a feature can run on your Mac or iPhone, it does. Not as a setting you have to find, but as the only way it works.',
  },
  {
    title: 'Verifiable, not promised',
    body: 'Several of these apps ship without a network entitlement, which means they cannot phone home even if we wanted them to. You can check that yourself on the signed binary rather than taking our word for it.',
  },
  {
    title: 'Bought once, not rented',
    body: 'One-time purchases. No subscriptions, no accounts, and nothing that stops working because a server went away.',
  },
];

const Placeholder = () => (
  <div className="aspect-[4/5] w-full rounded-[1.25rem] border-4 border-dashed border-zinc-800 bg-[#0f0f12] flex flex-col items-center justify-center gap-3 p-6 text-center">
    <div className="text-5xl" aria-hidden="true">
      🧪
    </div>
    <p className="text-sm font-mono font-bold text-zinc-500 leading-relaxed">
      Photo goes here.
      <br />
      Set FOUNDER_PHOTO in About.tsx.
    </p>
  </div>
);

export const About = () => (
  <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <motion.a
        href="#"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 hover:text-white transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lab
      </motion.a>

      {/* ── who ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
      >
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[90px] opacity-20 bg-fuchsia-500" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            {FOUNDER_PHOTO ? (
              <img
                src={FOUNDER_PHOTO}
                alt={FOUNDER_PHOTO_ALT}
                className="aspect-[4/5] w-full object-cover rounded-[1.25rem] border-4 border-zinc-800"
              />
            ) : (
              <Placeholder />
            )}
          </div>

          <div>
            <div className="text-xs font-mono font-black text-fuchsia-400 uppercase tracking-widest mb-4">
              {FOUNDER_ROLE}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase mb-5 leading-[0.95]">
              {FOUNDER_NAME}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed mb-8">
              {FOUNDER_TAGLINE}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://jarredmcarter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm border-2 border-zinc-700 hover:border-cyan-400 transition-colors"
              >
                jarredmcarter.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:retrac.labs@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm border-2 border-zinc-700 hover:border-yellow-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── the long version ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="border-4 border-zinc-800 bg-[#0f0f12] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
      >
        <h2 className="text-2xl font-black text-white mb-6">The longer version</h2>
        <div className="space-y-5 text-zinc-300 font-medium leading-relaxed text-lg">
          {FOUNDER_BIO.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      {/* ── the name ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
      >
        <h2 className="text-2xl font-black text-white mb-4">Why "Retrac"</h2>
        <p className="text-zinc-300 font-medium leading-relaxed text-lg">
          Carter, backwards. It started as a placeholder and stuck, which is roughly how
          most good names happen.
        </p>
      </motion.section>

      {/* ── how the apps are built ── */}
      {PRINCIPLES.length ? (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
        >
          <h2 className="text-2xl font-black text-white mb-8">How the apps get built</h2>
          <div className="space-y-8">
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.title} className="flex gap-5">
                <span className="font-mono font-black text-fuchsia-400 shrink-0 pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-black text-white mb-2">{principle.title}</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">{principle.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ) : null}

      {/* ── where to go next ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <a
          href="#lab-grid"
          className="flex items-center justify-between gap-4 border-2 border-zinc-800 bg-zinc-900 rounded-2xl p-6 hover:border-white transition-colors"
        >
          <div>
            <div className="font-black text-white text-lg">See what's in the lab</div>
            <div className="text-sm text-zinc-500 font-mono font-bold">Shipping and in progress</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 shrink-0" />
        </a>
        <a
          href="#/early-access"
          className="flex items-center justify-between gap-4 border-2 border-zinc-800 bg-zinc-900 rounded-2xl p-6 hover:border-cyan-400 transition-colors"
        >
          <div>
            <div className="font-black text-white text-lg">Test a build</div>
            <div className="text-sm text-zinc-500 font-mono font-bold">Join the beta program</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 shrink-0" />
        </a>
      </motion.section>
    </div>
  </main>
);
