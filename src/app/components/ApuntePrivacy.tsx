import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const ApuntePrivacy = () => {
    return (
        <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 hover:text-white transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Retrac Labs
                </motion.a>

                <section className="border-4 border-zinc-800 bg-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10">
                    <div className="text-xs font-mono font-black text-sky-400 uppercase tracking-widest mb-4">
                        Apunte
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-500 font-mono font-bold mb-10">
                        Last updated: September 10, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Overview
                            </h2>
                            <p>
                                Apunte is a macOS app that turns audio and video files into
                                timestamped transcripts entirely on your Mac. It collects nothing.
                                This policy explains, specifically and verifiably, why that is true
                                by design — not merely promised. Verifiability is the point: where a
                                claim can be checked, this policy tells you how to check it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Apunte is developed by Retrac Labs (Jarred Carter). If you have any
                                questions about this policy, contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-cyan-400 hover:text-cyan-300"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                What Apunte Collects: Nothing
                            </h2>
                            <p>
                                Apunte has no analytics, no crash reporting, no telemetry, no update
                                check, no account, and no login. It builds no profile, identifier, or
                                advertising ID. Your audio, video, and transcripts are never
                                transmitted anywhere.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Apunte ships{' '}
                                <strong className="text-white font-bold">without the
                                outgoing-network entitlement</strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-cyan-300 font-mono">
{`codesign -d --entitlements - Apunte.app`}
                            </pre>
                            <p>
                                The output lists only <code>app-sandbox</code> and the
                                user-selected file read/write permissions — no network client. The
                                honest boundary: system frameworks such as the App Store and macOS's
                                own model downloads run in separate Apple processes, outside the app
                                itself. Those are described under “Third Parties” below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Where Your Data Is Stored
                            </h2>
                            <p>
                                Everything Apunte creates stays on your Mac, in the app's sandbox
                                container at{' '}
                                <code>~/Library/Containers/com.retraclabs.apunte/</code>. It never
                                leaves your machine through any action of the app.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-sky-400">
                                <li>
                                    <strong className="text-white font-bold">Stored audio is
                                    encrypted at rest</strong> using AES-256-GCM, with a key wrapped
                                    by your Mac's Secure Enclave. That key is non-exportable and
                                    bound to your machine, so copying the audio files to another
                                    computer yields nothing readable.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">The transcript
                                    database itself is not encrypted.</strong> Transcript text,
                                    speaker names, and source filenames are stored in a local
                                    database in readable form. When your Mac is powered off,
                                    FileVault (if you have it enabled) protects them; while your Mac
                                    is unlocked, they are readable like any other document. We state
                                    this plainly rather than imply the whole store is encrypted.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You control how long audio is kept: keep it, erase it immediately
                                after transcription, or erase it automatically after a number of days
                                you choose. Erasure overwrites the audio before removing it — a
                                practical deletion, not a forensic secure-wipe, and we don't claim
                                otherwise. Deleting the Apunte app removes its container and
                                everything inside it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Third Parties — Apple Only
                            </h2>
                            <p>
                                Apunte uses no third-party SDKs, ad networks, data brokers, or
                                analytics providers. The only third party involved is Apple, in three
                                operating-system roles:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-sky-400">
                                <li>
                                    <strong className="text-white font-bold">Purchases.</strong>{' '}
                                    Premium features are unlocked through Apple's In-App Purchase.
                                    Apple processes the transaction; Apunte never sees your payment
                                    details and stores no transaction data of its own beyond asking
                                    StoreKit whether your entitlement is currently active.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Speech model
                                    downloads.</strong> When a language pack isn't yet installed,
                                    macOS itself downloads the speech-recognition model. That
                                    download is an Apple operating-system function, governed by
                                    Apple's privacy policy — not something Apunte performs.
                                </li>
                                <li>
                                    <strong className="text-white font-bold">Summaries.</strong>{' '}
                                    Premium summaries are generated on your Mac by Apple
                                    Intelligence, an Apple operating-system function governed by
                                    Apple's privacy policy — not something Apunte performs. Apunte
                                    passes the transcript to the on-device system; the app itself,
                                    having no network entitlement, sends nothing off your Mac.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts, crash statistics, regional sales) for any app we
                                publish. This is produced by Apple, not collected by Apunte, and does
                                not identify you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Children
                            </h2>
                            <p>
                                Apunte is not directed at children and collects no personal
                                information from anyone, regardless of age.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Your Rights (GDPR / CCPA)
                            </h2>
                            <p>
                                Because no personal data ever reaches Retrac Labs, there is nothing
                                on our side to access, export, correct, or delete — no server, no
                                database, no account holds your information. Your data is already
                                entirely in your possession, on your Mac, under your control. You
                                exercise every one of these rights directly, by managing or deleting
                                the files and the app yourself.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                About This Website
                            </h2>
                            <p>
                                This policy covers the Apunte app, which contains no analytics of any
                                kind. The Retrac Labs website you're reading it on is separate and
                                uses its own website analytics; that is described in the{' '}
                                <a
                                    href="#/privacy"
                                    className="text-cyan-400 hover:text-cyan-300"
                                >
                                    Retrac Labs privacy policy
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this policy. Material changes will be reflected here
                                with a new “Last updated” date above.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-3">
                                Contact
                            </h2>
                            <p>
                                Questions about this privacy policy? Contact us at{' '}
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
                                    href="#/apunte/terms"
                                    className="text-sky-400 hover:text-sky-300 font-bold"
                                >
                                    Apunte Terms of Use
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
