import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const FielTerms = () => {
    return (
        <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Retrac Labs
                </motion.a>

                <section className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10">
                    <div className="text-xs font-mono font-black text-emerald-400 light:text-emerald-700 uppercase tracking-widest mb-4">
                        Fiel
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white light:text-zinc-900 uppercase mb-4">
                        Terms of Use
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: October 21, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Agreement
                            </h2>
                            <p>
                                These Terms of Use (“Terms”) govern your use of Fiel, an application
                                for Mac developed by Retrac Labs (Jarred Carter). By downloading or
                                using Fiel, you agree to these Terms. If you do not agree, do not use
                                the app.
                            </p>
                            <p className="mt-4">
                                Fiel is a documentation tool for mental-health professionals. It is
                                intended for use by licensed or otherwise qualified clinicians, or by
                                people working under their supervision, who are responsible for the
                                clinical records they keep. You must be an adult to use it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                1. Licence
                            </h2>
                            <p>
                                Retrac Labs grants you a personal, non-exclusive, non-transferable
                                licence to use Fiel on Apple-branded devices that you own or control,
                                in accordance with the App Store Terms of Service. You may not reverse
                                engineer, decompile, resell, redistribute, sublicense, or rent the
                                app, except where such a restriction is prohibited by applicable law.
                                The open-source software and the open drafting model included in
                                Fiel, listed with their licences in Settings › Acknowledgments, are
                                licensed under their own terms, and nothing in these Terms limits your
                                rights under those licences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                2. Free Sessions and Subscriptions
                            </h2>
                            <p>
                                Fiel is free to download. Your first eight sessions, whether recorded
                                in Fiel or imported from a recording made elsewhere, are free. After
                                that, recording or importing a new session requires a subscription,
                                offered as a monthly subscription or a yearly subscription through
                                Apple's In-App Purchase.
                            </p>
                            <p className="mt-4">
                                <strong className="text-white light:text-zinc-900 font-bold">Nothing already in Fiel is
                                ever locked.</strong>{' '}
                                Without a subscription, and after one lapses, every session you have
                                stays yours to open, review, edit, sign, amend, export, back up, and
                                delete. Only starting new sessions needs a subscription. Sessions you
                                record while subscribed are not counted against the free eight.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-emerald-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Auto-renewal.</strong>{' '}
                                    Subscriptions renew automatically unless cancelled at least 24
                                    hours before the end of the current period. Your Apple Account is
                                    charged for renewal within 24 hours before the current period
                                    ends.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Payment.</strong>{' '}
                                    Charged to your Apple Account at confirmation of purchase, at the
                                    price shown in the app before you buy.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Managing or
                                    cancelling.</strong> Manage or cancel anytime in{' '}
                                    <span className="text-white light:text-zinc-900">System Settings › Apple Account ›
                                    Subscriptions</span>. Cancellation is handled by Apple, not
                                    Retrac Labs; we cannot cancel a subscription on your behalf.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Refunds.</strong>{' '}
                                    Purchases and refunds are handled by Apple under the App Store's
                                    terms. Retrac Labs cannot issue refunds directly.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The free-session
                                    count.</strong> Fiel keeps the number of free sessions you have used
                                    on your Mac, outside the app's own folder, so deleting and
                                    reinstalling Fiel does not reset it. Restore Purchases, in
                                    Settings › Subscription, brings an existing subscription to a new
                                    Mac.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                3. Consent and Recording
                            </h2>
                            <p>
                                Fiel records a session only after you mark the client's standing
                                consent on their record and confirm, each time, that the client
                                consented to that session being recorded; it accepts an imported
                                recording only after you confirm the client consented when it was
                                made. Those confirmations are yours.{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">You are solely
                                responsible for obtaining any consent the law requires</strong> where
                                you and your client are, including in telehealth sessions where you
                                are in different places, and for keeping whatever record of that
                                consent your profession requires. The consent wording built into Fiel
                                is a starting point for you to replace with your own; it is not legal
                                advice, and Fiel's optional check of an uploaded consent form reads
                                words on a page and is not legal validation.
                            </p>
                            <p className="mt-4">
                                In a telehealth session, Fiel records your microphone and what other
                                apps on your Mac play, only during a session you start. You are
                                responsible for complying with the rules of the service the call runs
                                on. Retrac Labs does not record, receive, or store any session.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                4. Drafts, Accuracy, and Your Signature
                            </h2>
                            <p>
                                Fiel produces transcripts with automatic speech recognition and drafts
                                notes with a language model, both running on your Mac. Both are
                                imperfect and{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">will contain
                                errors</strong>: misheard words, including medication names and
                                doses; lines attributed to the wrong person; statements that overstate,
                                soften, or leave out what was said; and content missing altogether.
                                Fiel checks each drafted statement against the transcript lines it
                                cites, compares numbers and hedges, asks you to confirm every dose,
                                and lists key facts the draft left out. Those checks reduce errors;
                                they do not eliminate them, and they cannot catch a word the
                                recognizer misheard in the transcript itself.
                            </p>
                            <p className="mt-4">
                                Every note is a draft until you sign it.{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">You are responsible for
                                reviewing every statement against the transcript, and against the
                                recording where it matters, before you sign.</strong> A signed note
                                is your clinical document, authored by you. Fiel does not diagnose,
                                assess risk, recommend treatment, or add anything that is not in the
                                transcript, and it is not a substitute for your clinical judgment.
                                Fiel is provided “as is,” without warranty of any kind as to accuracy,
                                completeness, or fitness for a particular purpose.
                            </p>
                            <p className="mt-4">
                                Some jurisdictions require clinicians to tell clients when software
                                drafts their records or when artificial intelligence is used in their
                                care. Whether and how that applies to you is your responsibility.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                5. Not a Medical Device, and Not a Compliance Guarantee
                            </h2>
                            <p>
                                Fiel is a documentation tool. It is{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">not a medical device</strong>,
                                not an electronic health record system, and not a crisis or
                                risk-detection tool, and it provides no medical, clinical, or legal
                                advice. Fiel is designed so that no client information reaches Retrac
                                Labs, but Retrac Labs does not claim that using Fiel makes you
                                compliant with HIPAA, state privacy or recording laws, licensing-board
                                record-keeping rules, or any other obligation.{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">Your professional and
                                legal obligations are yours</strong>, including which records to
                                keep, for how long, how to respond to a client's request for them, and
                                when a legal hold applies. Fiel's retention timers, retention minimum,
                                and Legal Hold are tools you configure; they do not know your rules.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                6. Your Records
                            </h2>
                            <p>
                                You retain all rights to your recordings, transcripts, notes, and
                                client records. They are yours entirely. Retrac Labs claims no
                                ownership or licence over them and never receives them; they stay on
                                your Mac, or go only where you send them.
                            </p>
                            <p className="mt-4">
                                Because Retrac Labs holds no copy of anything, it cannot recover a
                                record for you. Deleting a session or a client, by hand or by a timer
                                you set, destroys that record's encryption key and is final. A backup
                                folder you choose is readable only with the recovery code Fiel shows
                                you once; if you lose the code, the backup cannot be opened, by you or
                                by us. Keeping a backup, keeping the code safe, and keeping FileVault
                                on are your responsibility.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                7. Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Retrac Labs shall not be
                                liable for any indirect, incidental, special, consequential, or
                                punitive damages, or for any loss of data, arising from your use of or
                                inability to use Fiel, including any error in a transcript or a draft
                                that you sign. The app is provided “as is” and “as available.”
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                8. Governing Law
                            </h2>
                            <p>
                                These Terms are governed by the laws of the State of New York, United
                                States, without regard to its conflict-of-laws principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                9. Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms. Material changes will be reflected here
                                with a new “Last updated” date above. Continued use of Fiel after
                                changes take effect constitutes acceptance of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                10. Contact
                            </h2>
                            <p>
                                Questions about these Terms? Contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                            <p className="mt-6 text-sm text-zinc-400 light:text-zinc-600">
                                See also:{' '}
                                <a
                                    href="#/fiel/privacy"
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800 font-bold"
                                >
                                    Fiel Privacy Policy
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
