import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { MISSION, MISSION_SHORT } from '../data/mission';

/* ─────────────────────────────────────────────────────────────────────────────
   YOUR BIT. Everything you need to change on this page is in this one block.

   The photo: drop the file in public/brand/ and put its filename below. A
   portrait-ish crop reads best, roughly 4:5, at least 1000px on the short edge.
   Leave FOUNDER_PHOTO as null until then and the page shows a tidy placeholder
   instead of a broken image.
   ───────────────────────────────────────────────────────────────────────────── */

const FOUNDER_PHOTO: string | null = '/brand/jarred-carter.jpg';
const FOUNDER_PHOTO_ALT =
  'Jarred Carter, smiling, in a black tank top against a plain light background.';

const FOUNDER_NAME = 'Jarred M. Carter';
const FOUNDER_ROLE = 'Founder';

/** The short version, sitting right under your name. One or two sentences. */
const FOUNDER_TAGLINE =
  'Security engineer in New York City. Retrac Labs is where the software half of that goes.';

/** The long version. Each string is its own paragraph. Write these however you
 *  like; nothing here is load-bearing for the layout. */
const FOUNDER_BIO: string[] = [
  // Note the trailing space inside each fragment. JavaScript joins these end to
  // end with nothing in between, so a fragment ending in "a phone" followed by
  // one starting "interview" renders as "phoneinterview".
  'I got my start at nine when a voluntary school assignment on motivational speaker Zig Ziglar turned into a phone ' +
    'interview with him and a permanent job offer from the state\'s largest newspaper. I stayed in journalism until ' +
    'I got my first Macintosh at eleven, which I still have and use, and decided to write software instead.',

  'I finished two bachelor\'s degrees at Marshall on full scholarship, Computer Science and Cybersecurity, since the ' +
    'coursework overlapped enough to make both possible, and added a minor in Spanish. One data structures course was ' +
    'all it took to steer me off the software engineering track and onto the closely-related security one, and I came ' +
    'to New York as a CyberCorps Scholar for an M.S. at NYU. There, I trained for pentesting and reverse engineering, ' +
    'then graduated into a job market that wasn\'t hiring. I had spent years learning how software can betray the ' +
    'people using it, so rather than wait for the market to move, I built the opposite. That\'s Retrac Labs.',

  'Local-first is not a feature that I haphazardly put on a list; rather, I looked at the current state of ' +
    'surveillance and made it the entire design. Retrac Labs was borne out of the desire to make sure that your data ' +
    'is yours versus entrusting it with someone else to protect it. It\'s all built for macOS power users who run their ' +
    'work and life out of the Apple ecosystem, and who would like for both things to remain theirs.',

  'Away from the keyboard, I teach Lagree, which is fifty minutes of asking people to stay in challenging moves for ' +
    'a bit longer than they\'d like. Once a week, I take classical Pilates as a student, and I model on the side, ' +
    'which usually surprises people a lot less than the cybersecurity part. Otherwise, my time is filled with ' +
    'frequenting coffee shops and jazz clubs in the West Village, concerts, the beach in Fire Island in the summer, ' +
    'and making sure I don\'t miss a single Taylor Swift album release party.',
];

/* Sits beside the FIRST bio paragraph, the one about getting a Macintosh at
   eleven. Note what it is and is not: the machine is not in the frame, so this
   cannot carry the durability argument, that a machine this old still works.
   What it can carry is the moment, because it is that Mac's own output. The
   caption does that work.

   Left deliberately at its native 640x480. It renders around 250px wide here,
   so it is downscaling; blown up to full width a webcam frame just looks mushy,
   which is also why it does not go in the MAC_PHOTO figure below. */
const MAC_2011_PHOTO: string | null = '/brand/first-macintosh-2011.jpg';
const MAC_2011_ALT =
  'A young Jarred Carter at home with a small white dog, caught on a webcam.';
const MAC_2011_CAPTION = 'Taken on that Macintosh, with its own camera. February 19, 2011.';

/* Sits beside the last bio paragraph, the one about Lagree, Pilates, and the
   West Village. Sunglasses would be a problem on a photo carrying the trust
   argument; here they cost nothing, because this one is only doing the human
   half of the job. Set to null and the paragraph simply runs full width. */
const LIFE_PHOTO: string | null = '/brand/jarred-carter-offline.jpg';
const LIFE_PHOTO_ALT = 'Jarred Carter outdoors in Manhattan, holding a large cream-colored doodle.';

/* ─────────────────────────────────────────────────────────────────────────────
   THE MACINTOSH. Drop the photo in public/brand/ and put its path below.

   This is the best evidence on the site and it is worth shooting properly: the
   actual machine, powered on if it will, somewhere with daylight. Landscape,
   16:9-ish, at least 1600px wide. It does not need to be styled. A slightly
   scuffed thirty-year-old computer that still boots is the argument.

   Leave MAC_PHOTO as null and the section hides itself entirely, so nothing
   breaks and no placeholder ships by accident.
   ───────────────────────────────────────────────────────────────────────────── */
const MAC_PHOTO: string | null = null; // e.g. '/brand/first-macintosh.jpg'
const MAC_PHOTO_ALT =
  'The Macintosh I got at eleven, still on my desk and still working.';
/** Edit the year. This caption is doing argumentative work, so keep it factual
 *  and let the machine speak. */
const MAC_PHOTO_CAPTION =
  'My first Macintosh, bought in 19XX. It still runs. No server had to stay up, ' +
  'and nobody revoked it.';

/* Optional. Scannable proof behind the trust claims the apps make, which prose
   alone does not deliver: nobody reads four paragraphs to find out whether you
   know what you are talking about. Empty the array to drop the strip. */
const CREDENTIALS: { label: string; detail: string }[] = [
  { label: 'M.S., Cybersecurity', detail: 'NYU Tandon' },
  { label: 'CyberCorps Scholar', detail: 'NSF Scholarship for Service' },
  { label: 'B.S., Computer Science and Cybersecurity', detail: 'Marshall, two degrees on full scholarship' },
  { label: 'Pentesting, reverse engineering', detail: 'Trained, then went the other way' },
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
    title: 'Built to keep working',
    body: 'No accounts. Nothing that stops working because a server went away.',
  },
];

const Placeholder = () => (
  <div className="aspect-[4/5] w-full rounded-[1.25rem] border-4 border-dashed border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 flex flex-col items-center justify-center gap-3 p-6 text-center">
    <div className="text-5xl" aria-hidden="true">
      🧪
    </div>
    <p className="text-sm font-mono font-bold text-zinc-500 light:text-zinc-600 leading-relaxed">
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
        className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lab
      </motion.a>

      {/* ── who ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
      >
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[90px] opacity-20 bg-fuchsia-500" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            {FOUNDER_PHOTO ? (
              <img
                src={FOUNDER_PHOTO}
                alt={FOUNDER_PHOTO_ALT}
                className="aspect-[4/5] w-full object-cover rounded-[1.25rem] border-4 border-zinc-800 light:border-zinc-200"
              />
            ) : (
              <Placeholder />
            )}
          </div>

          <div>
            <div className="text-xs font-mono font-black text-fuchsia-400 light:text-fuchsia-700 uppercase tracking-widest mb-4">
              {FOUNDER_ROLE}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white light:text-zinc-900 uppercase mb-5 leading-[0.95]">
              {FOUNDER_NAME}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed mb-8">
              {FOUNDER_TAGLINE}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://jarredmcarter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 light:bg-zinc-100 text-white light:text-zinc-900 font-bold text-sm border-2 border-zinc-700 light:border-zinc-300 hover:border-cyan-400 transition-colors"
              >
                Personal Site
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:retrac.labs@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 light:bg-zinc-100 text-white light:text-zinc-900 font-bold text-sm border-2 border-zinc-700 light:border-zinc-300 hover:border-yellow-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── mission ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.06 }}
        className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
      >
        <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full blur-[90px] opacity-20 bg-cyan-500" />

        <div className="relative z-10">
          <div className="text-xs font-mono font-black text-cyan-400 light:text-cyan-700 uppercase tracking-widest mb-6">
            {MISSION_SHORT}
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white light:text-zinc-900 leading-[1.15] tracking-tight">
            {MISSION[0]}{' '}
            {MISSION[1]}
          </p>
          <p className="text-lg sm:text-xl text-zinc-400 light:text-zinc-600 font-medium leading-relaxed mt-5 max-w-2xl">
            {MISSION[2]}
          </p>
        </div>
      </motion.section>

      {/* ── the Macintosh: the mission's evidence ── */}
      {MAC_PHOTO ? (
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden mb-6"
        >
          <img
            src={MAC_PHOTO}
            alt={MAC_PHOTO_ALT}
            className="w-full h-auto block"
            loading="lazy"
          />
          <figcaption className="px-6 sm:px-8 py-5 text-sm sm:text-base text-zinc-400 light:text-zinc-600 font-medium leading-relaxed border-t-4 border-zinc-800 light:border-zinc-200">
            {MAC_PHOTO_CAPTION}
          </figcaption>
        </motion.figure>
      ) : null}

      {/* ── the long version ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="border-4 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
      >
        <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">The Longer Version</h2>
        <div className="space-y-5 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed text-lg">
          {/* hyphens-auto matters here: justified text without it opens rivers
              of white space, and the column is narrow on a phone. It works
              because index.html sets <html lang="en">. */}
          {/* The opening paragraph gets the 2011 photo, on the left. The closing
              one gets the dog, on the right. Alternating keeps the column from
              looking like a template. */}
          <div
            className={
              MAC_2011_PHOTO
                ? 'grid grid-cols-1 sm:grid-cols-[0.62fr_1.38fr] gap-6 sm:gap-8 items-start'
                : ''
            }
          >
            {MAC_2011_PHOTO ? (
              <figure className="m-0">
                <img
                  src={MAC_2011_PHOTO}
                  alt={MAC_2011_ALT}
                  loading="lazy"
                  width={640}
                  height={480}
                  className="w-full h-auto rounded-[1.25rem] border-4 border-zinc-800 light:border-zinc-200"
                />
                <figcaption className="mt-3 text-xs font-mono text-zinc-500 light:text-zinc-600 leading-relaxed">
                  {MAC_2011_CAPTION}
                </figcaption>
              </figure>
            ) : null}
            <p className="text-justify hyphens-auto">{FOUNDER_BIO[0]}</p>
          </div>

          {FOUNDER_BIO.slice(1, -1).map((paragraph, index) => (
            <p key={index} className="text-justify hyphens-auto">
              {paragraph}
            </p>
          ))}

          {/* The closing paragraph earns a picture, so it gets the row to
              itself and the photo sits alongside. */}
          <div
            className={
              LIFE_PHOTO
                ? 'grid grid-cols-1 sm:grid-cols-[1.35fr_0.65fr] gap-6 sm:gap-8 items-start'
                : ''
            }
          >
            <p className="text-justify hyphens-auto">
              {FOUNDER_BIO[FOUNDER_BIO.length - 1]}
            </p>
            {LIFE_PHOTO ? (
              <img
                src={LIFE_PHOTO}
                alt={LIFE_PHOTO_ALT}
                loading="lazy"
                width={800}
                height={1067}
                className="w-full h-auto rounded-[1.25rem] border-4 border-zinc-800 light:border-zinc-200"
              />
            ) : null}
          </div>
        </div>
      </motion.section>

      {/* ── credentials, scannable ── */}
      {CREDENTIALS.length ? (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          {CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-2xl px-5 py-4"
            >
              <div className="font-black text-white light:text-zinc-900">{item.label}</div>
              <div className="text-sm text-zinc-500 light:text-zinc-600 font-mono font-bold mt-1">{item.detail}</div>
            </div>
          ))}
        </motion.section>
      ) : null}

      {/* ── the name ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
      >
        <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-4">Why "Retrac"</h2>
        <p className="text-zinc-300 light:text-zinc-700 font-medium leading-relaxed text-lg">
          Retrac is my last name, Carter, backwards. In college, my best friend and I would refer to each other like
            this — with reversed first and last names — when we would go out on the weekends, and after being reminded
            of this earlier this year, the name stuck.
        </p>
      </motion.section>

      {/* ── how the apps are built ── */}
      {PRINCIPLES.length ? (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 mb-6"
        >
          <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-8">How the Apps Get Built</h2>
          <div className="space-y-8">
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.title} className="flex gap-5">
                <span className="font-mono font-black text-fuchsia-400 light:text-fuchsia-700 shrink-0 pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-black text-white light:text-zinc-900 mb-2">{principle.title}</h3>
                  <p className="text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">{principle.body}</p>
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
          className="flex items-center justify-between gap-4 border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-2xl p-6 hover:border-white light:hover:border-zinc-900 transition-colors"
        >
          <div>
            <div className="font-black text-white light:text-zinc-900 text-lg">See What's in the Lab</div>
            <div className="text-sm text-zinc-500 light:text-zinc-600 font-mono font-bold">Shipping and in Progress</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 light:text-zinc-600 shrink-0" />
        </a>
        <a
          href="#/early-access"
          className="flex items-center justify-between gap-4 border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-2xl p-6 hover:border-cyan-400 transition-colors"
        >
          <div>
            <div className="font-black text-white light:text-zinc-900 text-lg">Test a Build</div>
            <div className="text-sm text-zinc-500 light:text-zinc-600 font-mono font-bold">Join the Beta Program</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 light:text-zinc-600 shrink-0" />
        </a>
      </motion.section>
    </div>
  </main>
);
