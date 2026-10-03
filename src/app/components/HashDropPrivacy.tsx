import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const HashDropPrivacy = () => {
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
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: October 3, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Overview
                            </h2>
                            <p>
                                Hash Drop is a macOS app that checks files entirely on your Mac: their
                                hashes, checksum lists, code signatures, and signed checksums. It
                                collects nothing. This policy explains, specifically and verifiably,
                                why that is true by design, not merely promised. Where a claim can be
                                checked, this policy tells you how to check it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Hash Drop is developed by Retrac Labs (Jarred Carter). If you have any
                                questions about this policy, contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Hash Drop Collects: Nothing
                            </h2>
                            <p>
                                Hash Drop has no analytics, no crash reporting, no telemetry, no
                                update check, no account, and no login. It builds no profile,
                                identifier, or advertising ID. Your files, and the hashes and reports
                                it makes from them, are never transmitted anywhere.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Hash Drop ships{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">without the
                                outgoing-network entitlement</strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 light:border-zinc-200 bg-black/40 light:bg-zinc-100 px-4 py-3 text-sm text-cyan-300 light:text-cyan-800 font-mono">
{`codesign -d --entitlements - "/Applications/Hash Drop.app"`}
                            </pre>
                            <p>
                                Besides the identifiers Apple adds when it signs the app, the output
                                lists only <code>app-sandbox</code>, the user-selected file
                                read/write permission, and app-scoped bookmarks, which let Hash Drop
                                remember folders you chose. There is no network client. The Finder
                                Quick Action inside the app has even less: the sandbox and read-only
                                access to the files you pick. The honest boundary: the App Store, and
                                the browser that opens if you use the VirusTotal lookup, run outside
                                the app. Those are described under “Third Parties” below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Hash Drop Reads
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 marker:text-green-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Only the files
                                    and folders you give it,</strong> by dropping them, choosing them,
                                    or opening them with Hash Drop. macOS’s sandbox enforces this.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your clipboard,
                                    only if you turn it on.</strong> With “Notice Hashes I Copy” on,
                                    Hash Drop looks at the clipboard when you switch to it, only to
                                    spot a hash, and macOS asks your permission the first time. It is
                                    off by default.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Where Your Data Is Stored
                            </h2>
                            <p>
                                Everything Hash Drop keeps stays on your Mac, in the app's sandbox
                                container at{' '}
                                <code>~/Library/Containers/com.retraclabs.HashDrop/</code>. It never
                                leaves your machine through any action of the app. That includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-green-400">
                                <li>Your settings.</li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">History:</strong>{' '}
                                    the name, location, size, hash, and time of files you’ve checked.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Watched
                                    folders:</strong> the folders you ask Folder Monitor or Downloads
                                    Guard to watch, saved as macOS bookmarks, with the hashes they
                                    compare against and a log of checked downloads.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">What you
                                    import:</strong> hash lists and the public keys you trust for
                                    signed checksums.
                                </li>
                            </ul>
                            <p className="mt-4">
                                These are stored in readable form, not encrypted by the app. When your
                                Mac is powered off, FileVault (if you have it enabled) protects them;
                                while your Mac is unlocked, they are readable like any other document.
                                Notifications from Folder Monitor and Downloads Guard are created on
                                your Mac and go nowhere else.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You control what Hash Drop keeps. In Settings, you can turn history
                                off, limit how many entries it keeps, or clear it every time you quit,
                                and the History screen can clear everything at once. Removing a
                                watched folder, hash list, or key deletes what Hash Drop saved for it.
                                Deleting Hash Drop from your Applications folder may leave its folder
                                behind, as it does for many Mac apps; to remove everything, delete that
                                folder too.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Third Parties — Apple and Your Browser
                            </h2>
                            <p>
                                Hash Drop uses no third-party SDKs, ad networks, data brokers, or
                                analytics providers. Two things involve someone else, and neither
                                involves Retrac Labs:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-green-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Purchases.</strong>{' '}
                                    Hash Drop Pro is unlocked through Apple's In-App Purchase. Apple
                                    processes the transaction under{' '}
                                    <a
                                        href="https://www.apple.com/legal/privacy/"
                                        className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                    >
                                        Apple’s privacy policy
                                    </a>; Hash Drop never sees your payment details and stores no
                                    transaction data of its own beyond asking StoreKit whether Pro is
                                    unlocked.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The VirusTotal
                                    lookup.</strong> If you choose it, Hash Drop opens your browser to
                                    VirusTotal’s page for a file’s SHA-256. Only that hash goes, never
                                    the file, and it goes from your browser, not from the app.{' '}
                                    <a
                                        href="https://docs.virustotal.com/docs/privacy-policy"
                                        className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                    >
                                        VirusTotal’s privacy policy
                                    </a>{' '}
                                    applies to that visit.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Code signature and notarization checks use information already on
                                your Mac; Hash Drop asks macOS to check without network access.
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts, crash statistics, regional sales) for any app we
                                publish. This is produced by Apple, not collected by Hash Drop, and
                                does not identify you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Children
                            </h2>
                            <p>
                                Hash Drop is not directed at children and collects no personal
                                information from anyone, regardless of age.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Your Rights (GDPR / CCPA)
                            </h2>
                            <p>
                                Because no personal data ever reaches Retrac Labs, there is nothing
                                on our side to access, export, correct, or delete: no server, no
                                database, and no account holds your information. Your data is already
                                entirely in your possession, on your Mac, under your control. You
                                exercise every one of these rights directly, by managing or deleting
                                it in the app, or by deleting the app and its folder.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                About This Website
                            </h2>
                            <p>
                                This policy covers the Hash Drop app, which contains no analytics of
                                any kind. The Retrac Labs website you're reading it on is separate and
                                uses its own website analytics; that is described in the{' '}
                                <a
                                    href="#/privacy"
                                    className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                >
                                    Retrac Labs privacy policy
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this policy. Material changes will be reflected here
                                with a new “Last updated” date above.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Contact
                            </h2>
                            <p>
                                Questions about this privacy policy? Contact us at{' '}
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
                                    href="#/hash-drop/terms"
                                    className="text-green-400 light:text-green-700 hover:text-green-300 light:hover:text-green-800 font-bold"
                                >
                                    Hash Drop Terms of Use
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
