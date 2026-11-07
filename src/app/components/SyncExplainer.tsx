import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { ACCENTS } from '../data/accents';
import { LabNoteAccent, Section } from '../labNotes/kit';
import { AccentGlow } from './AccentGlow';

/* "Sync, Locked": what optional sync will be, before any app has it. The
   "Changes Regarding Your Data" card (SyncNotice.tsx) links here.

   The words are Jarred's, approved 2026-11-06, from
   ~/Documents/RetracLabs/Sync Statement.md, and every sentence stays inside
   what Sync Encryption Standard.md beside it allows us to say. Edit the
   statement first and copy it here, so the two never disagree.

   It's written in the future tense because no app syncs yet. The day the first
   one ships sync: change "will" to the present, name the app, and link this
   page from that app's page and from the privacy policy (Sync Statement.md →
   "At Launch"). It's English only for now; the Spanish page waits until the
   English is settled.

   Built from the lab notes' pieces so it reads like the rest of the site. */

/** The page's address, shared with the card that links to it. */
export const SYNC_EXPLAINER_PATH = '#/sync';

const accent = ACCENTS.cyan;

const Points = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-3 marker:text-cyan-400 light:marker:text-cyan-600">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export const SyncExplainer = () => (
  <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
    <div className="max-w-3xl mx-auto">
      <motion.a
        href="#"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Retrac Labs
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
              <Lock className="w-4 h-4" aria-hidden="true" />
              Changes Regarding Your Data
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white light:text-zinc-900 uppercase leading-[0.95] mb-6">
              Sync, Locked
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
              None of our apps sync today. Optional sync is coming, starting with Apunte. Here's how it
              will work, so you know before it arrives.
            </p>
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
              <Section title="The Short Version">
                <Points
                  items={[
                    "It's off unless you turn it on. If you never do, nothing changes.",
                    'Your data is locked on your device before it goes to iCloud.',
                    'Only your own devices have the key. Not Apple, and not us.',
                    'If anyone asks Apple for it, even with a court order, all Apple can give them is locked data that nobody can open.',
                    'Everything the apps do with your data, like transcribing, summarizing, and searching, still happens on your device.',
                  ]}
                />
              </Section>

              <Section title="How It Works, Without the Jargon">
                <p>
                  Picture a locked box. Your device puts your data in the box and locks it. iCloud carries
                  the box between your devices, and each of your devices has its own copy of the key, so
                  each one can open it. Apple can see the box: roughly how big it is, and when it moves. It
                  can't see inside.
                </p>
              </Section>

              <Section title="What Apple Can See, and What It Can't">
                <p>
                  Apple can see that you have an Apple Account and our app, when your devices sync, and
                  roughly how much is stored. It can't see anything you made: your transcripts,
                  recordings, notes, titles, names, or snippets.
                </p>
              </Section>

              <Section title="Why Apple Can't Just Open It">
                <p>
                  Apple publishes the rules it follows when police or courts ask for data. Those rules say
                  Apple doesn't have the keys to data that's locked end to end, so it can't hand over
                  what's inside. Most iCloud data isn't locked that way unless you turn on a setting
                  called Advanced Data Protection, which most people haven't, and which new accounts in
                  the UK can't turn on. So our apps will lock your data themselves, before iCloud ever
                  sees it, whatever your settings are.
                </p>
              </Section>

              <Section title="What We Can See">
                <p>
                  Nothing. We don't run servers. Your data goes into your own iCloud account, not ours,
                  and it never passes through Retrac Labs.
                </p>
              </Section>

              <Section title="There's No Spare Key">
                <p>
                  We don't keep a copy of your key, and there's no recovery key or reset. If you lose one
                  device, your other devices still have everything. If you lose all of them, the synced
                  copy can't be opened by anyone, including us. That's the point, and it's also the
                  trade-off. Keep your devices protected with a passcode, too: anyone holding your
                  unlocked phone or Mac can see what's on it, synced or not.
                </p>
              </Section>

              <Section title="If You'd Rather Keep Everything off the Cloud">
                <p>
                  Leave sync off and nothing changes. Apunte for Mac will still have no way to connect to
                  the internet: sync works through your iCloud Drive folder, the same way any file you
                  save there is carried, not through a connection of Apunte's own. And you can keep
                  sending transcripts between your devices with AirDrop or a cable, as you can today.
                </p>
              </Section>

              <Section title="Why We're Adding Sync at All">
                <p>
                  Retrac Labs started with a simple rule: no servers. We still don't run any. Sync uses
                  your own iCloud account to carry locked data between your own devices, and nothing
                  else. Our motto has always been "Can't, Not Won't": we build apps that can't look at
                  your data, instead of asking you to trust that we won't. With sync, that covers Apple
                  too.
                </p>
              </Section>
            </div>
          </LabNoteAccent>
        </motion.div>
      </article>
    </div>
  </main>
);
