import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const AmbientDeskPrivacy = () => {
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
                    <div className="text-xs font-mono font-black text-purple-400 light:text-purple-700 uppercase tracking-widest mb-4">
                        Ambient Desk
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white light:text-zinc-900 uppercase mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: September 30, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Overview
                            </h2>
                            <p>
                                Ambient Desk is a macOS app that stages your Mac for what you are about
                                to do: it opens the apps, files, and links you have saved as a desk,
                                hides everything else, and can arrange windows and switch your audio.
                                It collects nothing. This policy explains, specifically and verifiably,
                                why that is true by design, not merely promised. Where a claim can be
                                checked, this policy tells you how to check it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Ambient Desk is developed by Retrac Labs (Jarred Carter). If you have
                                any questions about this policy, contact us at{' '}
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
                                What Ambient Desk Collects: Nothing
                            </h2>
                            <p>
                                Ambient Desk has no analytics, no crash reporting, no telemetry, no
                                update check, no account, and no login. It builds no profile,
                                identifier, or advertising ID. Your desks, and anything Ambient Desk
                                learns about your Mac to stage them, are never transmitted anywhere.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Ambient Desk ships{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">without the
                                outgoing-network entitlement</strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 light:border-zinc-200 bg-black/40 light:bg-zinc-100 px-4 py-3 text-sm text-cyan-300 light:text-cyan-800 font-mono">
{`codesign -d --entitlements - "/Applications/Ambient Desk.app"`}
                            </pre>
                            <p>
                                The output lists only <code>app-sandbox</code>, read-only access to
                                files you choose, and calendar access. There is no network client.
                                The honest boundary: a web link you add to a desk opens in your own
                                browser, and the App Store runs outside the app. Those are described
                                under “Third Parties” below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Ambient Desk Reads
                            </h2>
                            <p>
                                Everything below is read on your Mac, used on your Mac, and never
                                leaves it. Most of it only happens after you turn it on.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-purple-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The apps,
                                    files, folders, and links you add to a desk.</strong> Files and
                                    folders come through the standard macOS picker, with read-only
                                    access that macOS’s sandbox enforces. Ambient Desk opens them; it
                                    does not read what is inside them.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Which apps
                                    are running,</strong> by name and identifier, so it can hide the
                                    ones a desk doesn’t need and bring them back afterwards, or save
                                    what is open as a new desk when you ask it to.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your
                                    calendar, only if you allow it.</strong> Ambient Desk looks at the
                                    start times and titles of upcoming events so it can stage a desk
                                    before a meeting. An event’s title may appear in a notification on
                                    your Mac. Calendar details are never saved. macOS asks your
                                    permission first, and you can revoke it in System Settings.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Window
                                    positions and sizes, only if you grant Accessibility.</strong>{' '}
                                    Used for one purpose: arranging the windows of apps you have added
                                    to a desk’s window layout. Ambient Desk never reads what is inside
                                    a window, and never uses this permission for keyboard shortcuts,
                                    typing, or anything else.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your audio
                                    output devices,</strong> to switch output and set the volume when a
                                    desk asks for it.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">A Focus you
                                    attach a desk to.</strong> Through macOS Focus Filters, macOS tells
                                    Ambient Desk when that Focus turns on. Ambient Desk cannot see or
                                    change any other Focus.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Where Your Data Is Stored
                            </h2>
                            <p>
                                Everything Ambient Desk keeps stays on your Mac, in the app’s sandbox
                                container at{' '}
                                <code>~/Library/Containers/com.retraclabs.Ambient-Desk/</code>. It
                                never leaves your machine through any action of the app, and this
                                version does not sync through iCloud. That includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-purple-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your
                                    desks:</strong> their names; the apps, file and folder locations,
                                    and links in them; their actions, triggers, and schedules; their
                                    window layouts, including any window positions you capture; and
                                    their audio choices.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Templates</strong>{' '}
                                    you save from your own desks.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Desk
                                    history:</strong> when each desk was staged and for how long, used
                                    for the History panel. It records times only, nothing about what
                                    you did.
                                </li>
                                <li>Your settings, such as the skin you have chosen.</li>
                            </ul>
                            <p className="mt-4">
                                These are stored in readable form, not encrypted by the app. When your
                                Mac is powered off, FileVault (if you have it enabled) protects them;
                                while your Mac is unlocked, they are readable like any other document.
                                Notifications are created on your Mac and go nowhere else. So that
                                Spotlight, Siri, and Shortcuts can offer to stage a desk, macOS keeps
                                your desk names in its on-device index; they are not sent anywhere.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You control what Ambient Desk keeps. Deleting a desk deletes it along
                                with its history, and you can delete any template you have saved. If
                                you export a desk, the file goes only where you save it and is yours
                                to keep or delete. If you turned on Open Ambient Desk at Login,
                                turning it off removes the login item. Deleting the Ambient Desk app
                                removes its container and everything inside it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Third Parties: Apple and Your Browser
                            </h2>
                            <p>
                                Ambient Desk uses no third-party SDKs, ad networks, data brokers, or
                                analytics providers. A few things involve someone else, and none of
                                them involves Retrac Labs:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-purple-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Links in
                                    your desks.</strong> A web link you add to a desk opens in your
                                    default browser. The browser makes that connection, not Ambient
                                    Desk, and the policies of that browser and that website apply.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Beta
                                    testing.</strong> If you test Ambient Desk through TestFlight, Apple
                                    may share crash reports, and any feedback or screenshots you choose
                                    to send, with Retrac Labs under{' '}
                                    <a
                                        href="https://www.apple.com/legal/privacy/"
                                        className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800"
                                    >
                                        Apple’s privacy policy
                                    </a>. That comes from TestFlight, not from Ambient Desk.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts, crash statistics, and regional sales) for any app we
                                publish. This is produced by Apple, not collected by Ambient Desk, and
                                does not identify you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Children
                            </h2>
                            <p>
                                Ambient Desk is not directed at children and collects no personal
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
                                it in the app, or by deleting the app.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                About This Website
                            </h2>
                            <p>
                                This policy covers the Ambient Desk app, which contains no analytics
                                of any kind. The Retrac Labs website you’re reading it on is separate
                                and uses its own website analytics; that is described in the{' '}
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
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
