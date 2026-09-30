import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const HashDropTerms = () => {
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
                    <div className="text-xs font-mono font-black text-green-400 light:text-green-700 uppercase tracking-widest mb-4">
                        Hash Drop
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white light:text-zinc-900 uppercase mb-4">
                        Terms of Use
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: September 30, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Agreement
                            </h2>
                            <p>
                                These Terms of Use (“Terms”) govern your use of Hash Drop, a macOS
                                application developed by Retrac Labs (Jarred Carter). By downloading
                                or using Hash Drop, you agree to these Terms. If you do not agree, do
                                not use the app.
                            </p>
                            <p className="mt-4">
                                These Terms add to Apple’s{' '}
                                <a
                                    href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                                    className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                >
                                    Licensed Application End User License Agreement
                                </a>{' '}
                                (the “Standard EULA”), which applies to every app from the App Store.
                                Where the two disagree, the Standard EULA controls.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                1. License
                            </h2>
                            <p>
                                Retrac Labs grants you a personal, non-exclusive, non-transferable
                                license to use Hash Drop on Apple-branded devices that you own or
                                control, in accordance with the App Store Terms of Service. You may
                                not reverse engineer, decompile, resell, redistribute, sublicense, or
                                rent the app, except where such a restriction is prohibited by
                                applicable law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                2. Hash Drop Pro
                            </h2>
                            <p>
                                Hash Drop is free to download. Verifying files, checking checksum
                                lists, hashing text, the encoding tools, the benchmark, history, the
                                menu bar helper, the Finder Quick Action, and Shortcuts actions are
                                free.
                            </p>
                            <p className="mt-4">
                                Hash Drop Pro — Signed Checksums, Code Signature, Downloads Guard,
                                Folder Monitor, Batch Folder, Compare, Duplicates, and Hash Sets — is
                                unlocked through a one-time in-app purchase. There is no
                                subscription.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-green-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Payment.</strong>{' '}
                                    Charged to your Apple Account when you confirm the purchase. The
                                    price is shown in the app and on the App Store before you buy.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your other Macs
                                    and your family.</strong> Pro works on every Mac signed in to the
                                    same Apple Account, and with Family Sharing. If it doesn’t
                                    appear, use Restore Purchase in the app.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Refunds.</strong>{' '}
                                    Purchases and refunds are handled by Apple under the App Store's
                                    terms, at{' '}
                                    <a
                                        href="https://reportaproblem.apple.com"
                                        className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                    >
                                        reportaproblem.apple.com
                                    </a>. Retrac Labs cannot issue refunds directly.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Betas.</strong>{' '}
                                    A purchase made in a TestFlight beta is a free test purchase and
                                    does not carry over to the App Store version.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                3. What the Results Mean — Please Read
                            </h2>
                            <p>
                                Hash Drop reports what it computes and what the systems it relies on
                                report: hashes, checksum lists, code signatures, notarization, and
                                signatures on checksum lists. These results are information to help
                                you decide, <strong className="text-white light:text-zinc-900 font-bold">not
                                guarantees</strong>.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-green-400">
                                <li>
                                    A matching hash shows a file is identical to the one someone
                                    hashed. It does not show the file is safe.
                                </li>
                                <li>
                                    A verified signature shows who signed something, as long as you
                                    added the right key. It does not show the signer is trustworthy.
                                    Compare fingerprints with the publisher before you trust a key.
                                </li>
                                <li>
                                    Code signature and notarization results reflect what macOS can
                                    check on your Mac at that moment. Gatekeeper may still decide
                                    differently.
                                </li>
                                <li>
                                    The optional VirusTotal lookup shows what VirusTotal reports about
                                    a hash. Retrac Labs does not control those results.
                                </li>
                            </ul>
                            <p className="mt-4">
                                You are responsible for the decisions you make with what Hash Drop
                                shows you. Hash Drop is provided “as is,” without warranty of any
                                kind as to accuracy, completeness, or fitness for a particular
                                purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                4. Not Antivirus or a Certified Record
                            </h2>
                            <p>
                                Hash Drop is a verification tool. It is{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">not antivirus
                                software</strong>, it does not remove malware, and it does not replace
                                the protections built into macOS or your own security software. Folder
                                Monitor and Downloads Guard only notice what happens while Hash Drop is
                                running and can read the folders you chose.
                            </p>
                            <p className="mt-4">
                                Reports, checksum lists, and scripts you export are records you
                                create. Hash Drop does not certify them for legal, forensic, or
                                regulatory use, and you are solely responsible for your own
                                compliance obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                5. Your Files
                            </h2>
                            <p>
                                Your files are yours. Hash Drop reads only what you give it, on your
                                Mac, and never sends your files anywhere. Retrac Labs claims no
                                ownership or license over anything you use Hash Drop with. When you
                                ask Duplicates to move a file to the Trash, it stays there until you
                                empty the Trash, so check before you do.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                6. Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Retrac Labs shall not be
                                liable for any indirect, incidental, special, consequential, or
                                punitive damages, or for any loss of data, arising from your use of or
                                inability to use Hash Drop. The app is provided “as is” and “as
                                available.”
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                7. Governing Law
                            </h2>
                            <p>
                                These Terms are governed by the laws of the State of New York, United
                                States, without regard to its conflict-of-laws principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                8. Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms. Material changes will be reflected here
                                with a new “Last updated” date above. Continued use of Hash Drop after
                                changes take effect constitutes acceptance of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                9. Contact
                            </h2>
                            <p>
                                Questions about these Terms? Contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                            <p className="mt-6 text-sm text-zinc-400 light:text-zinc-600">
                                See also:{' '}
                                <a
                                    href="#/hash-drop/privacy"
                                    className="text-green-400 light:text-green-700 hover:text-green-300 light:hover:text-green-800 font-bold"
                                >
                                    Hash Drop Privacy Policy
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
