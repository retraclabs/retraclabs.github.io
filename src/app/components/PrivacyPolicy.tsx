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
                        Last updated: May 16, 2026
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
                                such as app settings, preferences, notes, or other personal records.
                                We only use this information to provide the features of the app.
                                Information entered into Retrac Labs apps stays on your device unless
                                you explicitly choose to share it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Health-Related Information
                            </h2>
                            <p>
                                Some Retrac Labs apps may involve sensitive health-related information.
                                We design these experiences to minimize unnecessary collection,
                                protect user privacy, and avoid selling or sharing personal health
                                information for advertising purposes. App-specific privacy details
                                will be provided as those apps become available.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                SnippyStack
                            </h2>
                            <p>
                                SnippyStack is a macOS clipboard manager available on the Mac App Store.
                                All clipboard history, pinned snippets, and usage data are stored
                                exclusively on your Mac. SnippyStack does not transmit clipboard
                                contents, history, or any personally identifiable information to
                                Retrac Labs or any third party. No account is required. No cloud
                                sync occurs.
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
                                Some Retrac Labs projects are offered as beta software ahead of
                                public release. Beta versions may change frequently. We may collect
                                limited diagnostic or feedback information when you choose to
                                participate in testing. Participation in any beta is voluntary,
                                and you may opt out at any time by contacting us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Contact
                            </h2>
                            <p>
                                If you have questions about this privacy policy, contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
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
