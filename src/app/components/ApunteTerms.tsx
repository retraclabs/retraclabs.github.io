import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const ApunteTerms = () => {
    return (
        <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 hover:text-white transition-colors mb-10 md:cursor-none"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Retrac Labs
                </motion.a>

                <section className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10">
                    <div className="text-xs font-mono font-black text-sky-400 uppercase tracking-widest mb-4">
                        Apunte
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase mb-4">
                        Terms of Use
                    </h1>

                    <p className="text-zinc-500 font-mono font-bold mb-10">
                        Last updated: September 10, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Agreement
                            </h2>
                            <p>
                                These Terms of Use (“Terms”) govern your use of Apunte, a macOS
                                application developed by Retrac Labs (Jarred Carter). By downloading
                                or using Apunte, you agree to these Terms. If you do not agree, do not
                                use the app.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                1. Licence
                            </h2>
                            <p>
                                Retrac Labs grants you a personal, non-exclusive, non-transferable
                                licence to use Apunte on Apple-branded devices that you own or
                                control, in accordance with the App Store Terms of Service. You may
                                not reverse engineer, decompile, resell, redistribute, sublicense, or
                                rent the app, except where such a restriction is prohibited by
                                applicable law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                2. Purchases and Subscriptions
                            </h2>
                            <p>
                                Apunte is free to download. Transcription, and export to plain text,
                                timestamped text, and JSON, are free — and remain free.
                            </p>
                            <p className="mt-4">
                                Premium features — speaker names on transcript lines, on-device
                                summaries of each part of a recording, search across your whole
                                transcript library, and export to SubRip (SRT), WebVTT, CSV,
                                Markdown, HTML, PDF, and Word — are unlocked through an in-app
                                purchase, offered as a monthly subscription, a yearly subscription,
                                or a one-time lifetime purchase.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-sky-400">
                                <li>
                                    <strong className="text-white font-bold">Auto-renewal.</strong>{' '}
                                    Subscriptions renew automatically unless cancelled at least 24
                                    hours before the end of the current period. Your Apple Account is
                                    charged for renewal within 24 hours before the current period
                                    ends.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Payment.</strong>{' '}
                                    Charged to your Apple Account at confirmation of purchase.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Managing or
                                    cancelling.</strong> Manage or cancel anytime in{' '}
                                    <span className="text-white">System Settings › Apple Account ›
                                    Subscriptions</span>. Cancellation is handled by Apple, not
                                    Retrac Labs; we cannot cancel a subscription on your behalf.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Lifetime option.</strong>{' '}
                                    The lifetime purchase is a one-time purchase, not a subscription.
                                    It does not renew.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Refunds.</strong>{' '}
                                    Purchases and refunds are handled by Apple under the App Store's
                                    terms. Retrac Labs cannot issue refunds directly.
                                </li>
                            </ul>
                            <p className="mt-4">
                                <strong className="text-white font-bold">If Premium lapses.</strong>{' '}
                                Any speaker names you have already assigned remain visible and
                                continue to export, and summaries you have already generated remain
                                in place; only creating <em>new</em> ones stops until you renew.
                                Searching within a single transcript remains free. Free exports —
                                plain text, timestamped text, and JSON — remain available forever. We
                                consider this a commitment, not a courtesy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                3. Accuracy — Please Read
                            </h2>
                            <p>
                                Apunte produces transcripts using automatic speech recognition, which
                                is imperfect and <strong className="text-white font-bold">will
                                contain errors</strong> — including misheard words, incorrect speaker
                                attribution, and missing content. You are responsible for reviewing
                                and correcting any transcript before relying on it for any purpose.
                                Apunte is provided “as is,” without warranty of any kind as to
                                accuracy, completeness, or fitness for a particular purpose.
                            </p>
                            <p className="mt-4">
                                Summaries are generated on your Mac by Apple Intelligence and can be
                                inaccurate or incomplete, including stating things that were not said.
                                Always check a summary against the transcript and the recording before
                                relying on it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                4. Not a Medical or Legal Record
                            </h2>
                            <p>
                                Apunte is a general-purpose transcription tool. It is{' '}
                                <strong className="text-white font-bold">not a medical device</strong>,
                                and is not certified or intended for clinical documentation, legal
                                transcription, or any regulated record-keeping. If you work in a
                                regulated field, you are solely responsible for your own compliance
                                obligations (including HIPAA or equivalent). Do not treat an Apunte
                                transcript as a certified or authoritative record.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                5. Your Content
                            </h2>
                            <p>
                                You retain all rights to your recordings, source files, and
                                transcripts. They are yours entirely. Retrac Labs claims no ownership
                                or licence over your content and never receives it — it stays on your
                                Mac.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                6. Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Retrac Labs shall not be
                                liable for any indirect, incidental, special, consequential, or
                                punitive damages, or for any loss of data, arising from your use of or
                                inability to use Apunte. The app is provided “as is” and “as
                                available.”
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                7. Governing Law
                            </h2>
                            <p>
                                These Terms are governed by the laws of the State of New York, United
                                States, without regard to its conflict-of-laws principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                8. Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms. Material changes will be reflected here
                                with a new “Last updated” date above. Continued use of Apunte after
                                changes take effect constitutes acceptance of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                9. Contact
                            </h2>
                            <p>
                                Questions about these Terms? Contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-cyan-400 hover:text-cyan-300"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                            <p className="mt-6 text-sm text-zinc-500">
                                See also:{' '}
                                <a
                                    href="#/apunte/privacy"
                                    className="text-sky-400 hover:text-sky-300 font-bold"
                                >
                                    Apunte Privacy Policy
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
