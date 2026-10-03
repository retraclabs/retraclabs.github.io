import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

/* Retazo was called Snippystack until version 2.0. Its sandbox folder keeps the
   old bundle identifier on purpose: that is what carried 1.0 users' clips
   across, and App Store Connect never lets it change. */

const Strong = ({ children }: { children: React.ReactNode }) => (
    <strong className="text-white light:text-zinc-900 font-bold">{children}</strong>
);

const MailLink = () => (
    <a
        href="mailto:retrac.labs@gmail.com"
        className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
    >
        retrac.labs@gmail.com
    </a>
);

export const RetazoPrivacy = () => {
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
                    <div className="text-xs font-mono font-black text-cyan-400 light:text-cyan-700 uppercase tracking-widest mb-4">
                        Retazo
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
                                Retazo is a macOS clipboard manager. It keeps what you copy on your
                                Mac, in your menu bar, so you can find it and paste it again. It was
                                called Snippystack until version 2.0, and this policy covers it under
                                both names. Retazo collects nothing. This policy explains, specifically
                                and verifiably, why that is true by design, not merely promised. Where
                                a claim can be checked, this policy tells you how to check it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Retazo is developed by Retrac Labs (Jarred Carter). If you have any
                                questions about this policy, contact us at <MailLink />.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Retazo Collects: Nothing
                            </h2>
                            <p>
                                Retazo has no analytics, no crash reporting of its own, no telemetry, no
                                update check, no account, and no login. It builds no profile,
                                identifier, or advertising ID. Your clipboard history, your snippets,
                                and anything else Retazo keeps are never transmitted anywhere.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Retazo ships{' '}
                                <Strong>without the outgoing-network entitlement</Strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 light:border-zinc-200 bg-black/40 light:bg-zinc-100 px-4 py-3 text-sm text-cyan-300 light:text-cyan-800 font-mono">
{`codesign -d --entitlements - /Applications/Retazo.app`}
                            </pre>
                            <p>
                                Besides the identifiers Apple adds when it signs the app, the output
                                lists only <code>app-sandbox</code> and access to files you choose,
                                which Retazo uses only when you export or import snippets. There is no
                                network client. The honest boundary: a link you open from a clip opens
                                in your own browser, and the App Store and the Shortcuts app run
                                outside Retazo. Those are described under “Third Parties” below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Retazo Reads
                            </h2>
                            <p>
                                Everything below is read on your Mac, used on your Mac, and never
                                leaves it.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-cyan-400">
                                <li>
                                    <Strong>What you copy.</Strong> Retazo checks the clipboard about
                                    twice a second and saves each new copy: text, links, code, and
                                    images. It reads nothing while capture is paused, and copies made
                                    while an app you have excluded is in front are thrown away rather
                                    than saved.
                                </li>
                                <li>
                                    <Strong>Which app you copied from,</Strong> by name and identifier,
                                    so Retazo can show that app’s icon next to the clip and let you
                                    filter by it.
                                </li>
                                <li>
                                    <Strong>Text inside images you copy.</Strong> Retazo reads it with
                                    Apple’s Vision framework, on your Mac, so a search can find a
                                    screenshot by its words. The text is saved with the image.
                                </li>
                                <li>
                                    <Strong>Your clipboard permission.</Strong> On recent versions of
                                    macOS, System Settings › Privacy &amp; Security › Paste from Other
                                    Apps decides whether Retazo may read the clipboard. Retazo checks
                                    that setting so it can tell you when it is set to Deny.
                                </li>
                                <li>
                                    <Strong>Your global shortcut.</Strong> Retazo registers one
                                    keyboard shortcut (⌃⌘V unless you change it) with macOS’s standard
                                    hotkey service. It does not watch your typing, and it does not ask
                                    for Accessibility or Input Monitoring access.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Retazo Leaves Alone
                            </h2>
                            <p>
                                Each of these can be changed in Retazo’s settings:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-cyan-400">
                                <li>
                                    <Strong>Hidden copies.</Strong> Password managers and similar apps
                                    mark what they copy as hidden or temporary. Retazo skips those copies
                                    without reading what is in them.
                                </li>
                                <li>
                                    <Strong>Password managers.</Strong> Common password managers are
                                    excluded on a new install, and you can exclude any app.
                                </li>
                                <li>
                                    <Strong>One-time codes.</Strong> Verification codes are forgotten
                                    after five minutes, unless you pin them.
                                </li>
                                <li>
                                    <Strong>Tracking tags.</Strong> Tags such as{' '}
                                    <code>utm_source</code> and <code>fbclid</code> are removed from
                                    links before they are saved.
                                </li>
                            </ul>
                            <p className="mt-4">
                                You can also pause capture for 15 minutes, for an hour, or until you
                                resume.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Where Your Data Is Stored
                            </h2>
                            <p>
                                Everything Retazo keeps stays on your Mac, in the app’s sandbox
                                container at{' '}
                                <code>~/Library/Containers/com.jarredmcarter.snippystack/</code>. The
                                folder keeps Snippystack’s identifier, which is how your history
                                carried over to Retazo. It never leaves your Mac through any action of
                                the app, and this version does not sync through iCloud. That includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-cyan-400">
                                <li>
                                    <Strong>Your clipboard history:</Strong> the text and images you
                                    copied, the text read from those images, which app each came from,
                                    when you copied it, how many times, and whether it is pinned.
                                </li>
                                <li>
                                    <Strong>Your snippets.</Strong>
                                </li>
                                <li>
                                    Your settings, such as your skin, your shortcut, and your excluded
                                    apps.
                                </li>
                            </ul>
                            <p className="mt-4">
                                These are stored in readable form, not encrypted by the app. When your
                                Mac is powered off, FileVault (if you have it enabled) protects them;
                                while your Mac is unlocked, they are readable like any other document.
                                Like any app’s data, they are included in backups you make yourself,
                                such as Time Machine. So that Siri and Shortcuts can offer your
                                snippets by name, macOS keeps their titles in its on-device index;
                                they are not sent anywhere.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You control what Retazo keeps. You can delete any clip or snippet, or
                                clear your history at once; pinned clips stay until you unpin or
                                delete them. Retazo keeps up to the number of clips you choose and lets
                                the oldest unpinned ones go. Auto-Forget can remove clips after a day,
                                a week, or a month, and Clear History When Retazo Quits empties your
                                history every time you quit; both keep pinned clips. One-time codes are
                                forgotten after five minutes unless you pin them.
                            </p>
                            <p className="mt-4">
                                If you export your snippets, the file goes only where you save it and
                                is yours to keep or delete. If you turned on Open Retazo at Login,
                                turning it off removes the login item. Deleting Retazo from your
                                Applications folder may leave its folder behind, as it does for many
                                Mac apps; to remove everything, delete that folder too.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Shortcuts and Siri
                            </h2>
                            <p>
                                Retazo adds five actions to Apple’s Shortcuts app: Copy Snippet, Add
                                Snippet, Get Latest Clip, Pause Capture, and Resume Capture. They run
                                on your Mac, and only when you run them. What a shortcut does with a
                                clip afterward is up to the shortcut you build. If you run one by
                                asking Siri, Siri handles the request under{' '}
                                <a
                                    href="https://www.apple.com/legal/privacy/"
                                    className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                >
                                    Apple’s privacy policy
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Third Parties: Apple and Your Browser
                            </h2>
                            <p>
                                Retazo uses no third-party SDKs, ad networks, data brokers, or
                                analytics providers. A few things involve someone else, and none of
                                them involves Retrac Labs:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-cyan-400">
                                <li>
                                    <Strong>Links you open.</Strong> Open Link on a clip opens it in your
                                    default browser. The browser makes that connection, not Retazo, and
                                    the policies of that browser and that website apply.
                                </li>
                                <li>
                                    <Strong>Your purchase.</Strong> Retazo is sold on the Mac App Store.
                                    Apple handles the purchase under its own terms and privacy policy,
                                    and Retrac Labs never sees your payment details.
                                </li>
                                <li>
                                    <Strong>Crash reports.</Strong> If you have chosen in macOS to share
                                    analytics with app developers, Apple may pass along reports of
                                    crashes in Retazo. They come from Apple, not from Retazo, and
                                    describe the crash, not your clips.
                                </li>
                                <li>
                                    <Strong>Beta testing.</Strong> If you test Retazo through TestFlight,
                                    Apple may share crash reports, and any feedback or screenshots you
                                    choose to send, with Retrac Labs under Apple’s privacy policy. That
                                    comes from TestFlight, not from Retazo.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts and regional sales) for any app we publish. This is
                                produced by Apple, not collected by Retazo, and does not identify you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Children
                            </h2>
                            <p>
                                Retazo is not directed at children and collects no personal
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
                                This policy covers the Retazo app, which contains no analytics of any
                                kind. The Retrac Labs website you’re reading it on is separate and uses
                                its own website analytics; that is described in the{' '}
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
                                Questions about this privacy policy? Contact us at <MailLink />.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
