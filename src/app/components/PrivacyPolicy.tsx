import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy = () => {
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
                    <div className="text-xs font-mono font-black text-pink-400 uppercase tracking-widest mb-4">
                        Retrac Labs
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-500 font-mono font-bold mb-10">
                        Last updated: May 4, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Overview
                            </h2>
                            <p>
                                Retrac Labs builds apps with privacy, clarity, and user control in mind.
                                This privacy policy explains how we handle information across our
                                websites, apps, prototypes, and beta software.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Information You Provide
                            </h2>
                            <p>
                                Some Retrac Labs apps may allow you to enter information directly,
                                such as app settings, preferences, cycle tracking details, notes,
                                symptoms, or other personal records. We only use this information
                                to provide the features of the app.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Health-Related Information
                            </h2>
                            <p>
                                Apps such as Amparo may involve sensitive health-related information.
                                We design these experiences to minimize unnecessary collection,
                                protect user privacy, and avoid selling or sharing personal health
                                information for advertising purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Data Sharing
                            </h2>
                            <p>
                                Retrac Labs does not sell personal information. We do not share
                                personal information with third parties for cross-context behavioral
                                advertising. If a specific app uses third-party services, we will
                                describe those services clearly in this policy or in app-specific
                                privacy information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Beta Software
                            </h2>
                            <p>
                                Some Retrac Labs projects may be offered as beta software. Beta
                                versions may change frequently and may collect limited diagnostic
                                or feedback information when you choose to participate in testing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Contact
                            </h2>
                            <p>
                                If you have questions about this privacy policy, contact us at{' '}
                                <a
                                    href="mailto:rerac.labs@gmail.com"
                                    className="text-cyan-400 hover:text-cyan-300"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
