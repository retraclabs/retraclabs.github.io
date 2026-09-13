import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

/* Keep this date current. Any substantive edit to the text below should move it,
   because "Last updated" is the first thing anyone checks when they want to know
   whether a policy still describes what actually happens. */
const LAST_UPDATED = 'September 13, 2026';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section>
        <h2 className="text-2xl font-black text-white mb-3">{title}</h2>
        <div className="space-y-4">{children}</div>
    </section>
);

const Sub = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-black text-white mb-2">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
        {children}
    </a>
);

export const PrivacyPolicy = () => {
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
                    <div className="text-xs font-mono font-black text-pink-400 uppercase tracking-widest mb-4">
                        Retrac Labs
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-500 font-mono font-bold mb-10">
                        Last updated: {LAST_UPDATED}
                    </p>

                    <div className="space-y-10 text-zinc-300 font-medium leading-relaxed">
                        <Section title="Overview">
                            <p>
                                Retrac Labs builds apps with privacy, clarity, and user control in mind.
                                This privacy policy explains how we handle information across our website
                                (retraclabs.co), our apps, our prototypes, and our beta testing program.
                            </p>
                            <p>
                                Retrac Labs is a sole proprietorship based in New York, United States,
                                operated by Jarred M. Carter. Where this policy says "we" or "us," it
                                means Retrac Labs.
                            </p>
                            <p>
                                Two things are worth stating plainly at the top, because they shape
                                everything else. First, our apps are built to keep your data on your
                                device; several of them ship without the entitlement that would let them
                                reach the network at all. Second, the website and the beta program are
                                separate from the apps, and those two <em>do</em> involve third parties
                                and information you hand us on purpose. This policy covers all of it.
                            </p>
                        </Section>

                        <Section title="Information You Provide">
                            <p>
                                Some Retrac Labs apps may allow you to enter information directly, such
                                as app settings, preferences, notes, or other personal records. We only
                                use this information to provide the features of the app. Information
                                entered into Retrac Labs apps stays on your device unless you explicitly
                                choose to share it.
                            </p>
                            <p>
                                Separately, you may give us information directly by emailing us or by
                                filling in the beta tester form on this website. That information is
                                covered in "The Beta Testing Program" below.
                            </p>
                        </Section>

                        {/* ── Beta program: the substantive addition. ───────────────────────── */}
                        <Section title="The Beta Testing Program">
                            <p>
                                Retrac Labs runs a voluntary beta program so that real people can use
                                unreleased builds on real hardware and tell us what breaks. Taking part
                                is entirely optional, and you can leave at any time.
                            </p>

                            <Sub title="What the signup form collects">
                                <p>
                                    When you submit the form at{' '}
                                    <a href="#/early-access" className="text-cyan-400 hover:text-cyan-300">
                                        retraclabs.co beta signup
                                    </a>
                                    , we receive whatever you chose to fill in. Only your email address is
                                    required. The form asks for:
                                </p>
                                <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
                                    <li>Email address (required, so we can send you a TestFlight invitation)</li>
                                    <li>A name or handle to address you by (optional)</li>
                                    <li>Age range</li>
                                    <li>Broad industry of occupation</li>
                                    <li>Which Apple device categories you could test on</li>
                                    <li>The approximate model year and, if you provide it, the model of your main device</li>
                                    <li>The operating system versions you are running</li>
                                    <li>Which projects you are interested in</li>
                                    <li>How much time you can give and how you prefer to give feedback</li>
                                    <li>Whether you use particular accessibility features, so we can test against real needs</li>
                                    <li>Your country or region</li>
                                    <li>Anything else you choose to write in the free-text field</li>
                                </ul>
                                <p>
                                    Please do not send us sensitive personal information through this form.
                                    It is not the right channel for health information, government
                                    identifiers, financial details, or anyone else's personal data.
                                </p>
                            </Sub>

                            <Sub title="Why we collect it and what we do with it">
                                <p>
                                    We use this information for one purpose: to run the beta program. In
                                    practice that means working out whether a given build will run on your
                                    hardware, deciding who to invite to which test, sending you the
                                    invitation, and understanding the context behind the feedback you send
                                    back.
                                </p>
                                <p>
                                    We do not use it for advertising. We do not sell it, rent it, or trade
                                    it. We do not add you to a marketing list, and we do not send newsletters.
                                    The only email you should expect from us is about testing.
                                </p>
                                <p>
                                    Where the law requires a legal basis for processing, ours is your
                                    consent, given when you submit the form, together with our legitimate
                                    interest in operating a testing program for our own software. You can
                                    withdraw that consent at any time, as described below.
                                </p>
                            </Sub>

                            <Sub title="Who else is involved">
                                <p>
                                    Two third parties necessarily handle beta program information. We have
                                    no arrangement with either of them beyond ordinary use of their service.
                                </p>
                                <p>
                                    <strong className="text-white">Formspree</strong> receives the form
                                    submission and forwards it to our email. They process it on our behalf
                                    as a service provider, and their handling is governed by their own{' '}
                                    <Link href="https://formspree.io/legal/privacy-policy/">privacy policy</Link>.
                                    We chose a forwarding service rather than a database so that submissions
                                    live in one mailbox rather than accumulating in a system we would then
                                    have to secure.
                                </p>
                                <p>
                                    <strong className="text-white">Apple</strong> operates TestFlight, which
                                    is how beta builds are distributed. When you accept an invitation, Apple
                                    processes your participation under{' '}
                                    <Link href="https://www.apple.com/legal/privacy/">Apple's privacy policy</Link>
                                    , not ours. TestFlight shares certain information with us as the
                                    developer, including crash logs, and, where you have enabled it in your
                                    device settings, basic usage metrics for the beta build. It also shows us
                                    the email address you used to accept the invitation. Any feedback or
                                    screenshots you submit through TestFlight come to us as well. We do not
                                    receive your Apple Account password, your payment details, or your
                                    contacts.
                                </p>
                            </Sub>

                            <Sub title="Crash reports and diagnostics">
                                <p>
                                    Beta builds may include Apple's standard crash reporting. A crash report
                                    describes the state of the app when it failed and can incidentally
                                    contain fragments of data the app was handling at that moment. We use
                                    crash reports only to find and fix the defect. You can limit this in iOS
                                    or macOS under Privacy and Security, in the Analytics and Improvements
                                    settings.
                                </p>
                                <p>
                                    Our apps do not contain third-party analytics or advertising SDKs, in
                                    beta or in release.
                                </p>
                            </Sub>

                            <Sub title="Feedback you send us">
                                <p>
                                    When you report a problem or suggest an improvement, we need to be able
                                    to act on it. By sending feedback you grant Retrac Labs a perpetual,
                                    worldwide, royalty-free license to use it to develop and improve our
                                    products, with no obligation of compensation or attribution. You keep
                                    ownership of anything you wrote. This does not give us any right to your
                                    personal data beyond what this policy already describes.
                                </p>
                                <p>
                                    If your report includes a screenshot or a log, please check it for
                                    anything private before you send it. We will not go looking through
                                    material you send us for anything other than the problem you reported.
                                </p>
                            </Sub>

                            <Sub title="Unreleased software is confidential">
                                <p>
                                    Beta builds are unreleased and often unannounced. We ask that you not
                                    publish screenshots, recordings, or descriptions of a beta build, and
                                    that you not share the build or its invitation link with anyone else,
                                    until the app is publicly released. Some projects are identified only by
                                    a codename until launch, and we would like to keep it that way.
                                </p>
                            </Sub>

                            <Sub title="Beta software is provided as is">
                                <p>
                                    Beta software is unfinished by definition. It may be unstable, it may
                                    behave incorrectly, and it may lose data. It is provided without
                                    warranty of any kind, express or implied, including any implied warranty
                                    of merchantability or fitness for a particular purpose. Do not rely on a
                                    beta build for anything you cannot afford to lose, and keep your own
                                    backups. To the fullest extent permitted by law, Retrac Labs is not
                                    liable for any loss arising from your use of beta software. Nothing in
                                    this paragraph limits any liability that cannot lawfully be limited.
                                </p>
                            </Sub>

                            <Sub title="Age requirement">
                                <p>
                                    You must be at least 13 years old to take part, because Apple requires
                                    it of TestFlight users. Some builds may carry a higher age requirement,
                                    which we will state in the invitation. See "Children's Privacy" below.
                                </p>
                            </Sub>

                            <Sub title="Leaving the program">
                                <p>
                                    Email{' '}
                                    <a href="mailto:retrac.labs@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                                        retrac.labs@gmail.com
                                    </a>{' '}
                                    and ask to be removed. We will delete your signup information and stop
                                    contacting you. You can also leave any individual test from within
                                    TestFlight itself, and you can delete the beta app at any time. No
                                    explanation is needed and nothing is held against you.
                                </p>
                            </Sub>
                        </Section>

                        {/*
                          Project Cobra is in development and is not in anyone's hands yet, so its
                          section is held back rather than naming an unannounced app in a public
                          document. Uncomment this at launch, and put the real product name in.

                        <Section title="Fiel">
                            <p>
                                Fiel is an on-device clinical scribe for macOS, currently in
                                development. It records a session (with clinician consent),
                                transcribes it using on-device AI, and drafts a progress note
                                in the clinician's own template, entirely on their Mac.
                                Fiel ships without any network entitlement, which means it
                                cannot transmit data to Retrac Labs or any third party: not
                                audio, not transcripts, not notes, not anything. There is no
                                server, no account, and no analytics. Clinicians can verify
                                this independently on the shipped binary
                                (<code>codesign -d --entitlements</code>).
                            </p>
                        </Section>
                        */}

                        <Section title="Amparo">
                            <p>
                                Amparo is an iOS cycle-tracking app available on the App Store. All cycle
                                data, symptoms, moods, and personal health records you enter are stored
                                exclusively on your iPhone. Amparo does not transmit health information to
                                Retrac Labs or any third party. No account is required. No cloud sync
                                occurs. Your data stays yours: private, local, and fully under your
                                control.
                            </p>
                        </Section>

                        <Section title="SnippyStack">
                            <p>
                                SnippyStack is a macOS clipboard manager available on the Mac App Store.
                                All clipboard history, pinned snippets, and usage data are stored
                                exclusively on your Mac. SnippyStack does not transmit clipboard contents,
                                history, or any personally identifiable information to Retrac Labs or any
                                third party. No account is required. No cloud sync occurs.
                            </p>
                        </Section>

                        <Section title="Apunte">
                            <p>
                                Apunte is a macOS transcription app that converts audio and video into
                                timestamped transcripts entirely on your Mac. It ships without any
                                outgoing-network entitlement, so it cannot transmit your audio or
                                transcripts anywhere: no analytics, no account, no cloud. Stored audio is
                                encrypted at rest; the transcript database is kept locally. For full
                                details, see the{' '}
                                <a href="#/apunte/privacy" className="text-cyan-400 hover:text-cyan-300">
                                    Apunte privacy policy
                                </a>{' '}
                                and{' '}
                                <a href="#/apunte/terms" className="text-cyan-400 hover:text-cyan-300">
                                    Terms of Use
                                </a>
                                .
                            </p>
                        </Section>

                        <Section title="Data Sharing">
                            <p>
                                Retrac Labs does not sell personal information, and has never done so. We
                                do not share personal information with third parties for cross-context
                                behavioral advertising. We do not disclose personal information to third
                                parties for their own marketing purposes.
                            </p>
                            <p>
                                The only third parties that handle any information at all are the service
                                providers named in this policy: Formspree for the beta form, Apple for
                                TestFlight and the App Store, and Google Analytics for website traffic. If
                                a specific app comes to use a third-party service, we will describe it
                                clearly here or in that app's own privacy information before it ships.
                            </p>
                            <p>
                                We may disclose information if we are legally required to, for example in
                                response to a valid subpoena or court order, or where we believe in good
                                faith that disclosure is necessary to protect someone's safety or to
                                investigate fraud. Given how little we hold, there is generally very little
                                to disclose.
                            </p>
                        </Section>

                        <Section title="Website Analytics">
                            <p>
                                This website (retraclabs.co) uses Google Analytics to understand aggregate
                                traffic: page views, general location, and referral sources, so we can
                                improve the site. This applies to the website only and is entirely separate
                                from our apps, which contain no analytics. You can opt out with{' '}
                                <Link href="https://tools.google.com/dlpage/gaoptout">
                                    Google's browser add-on
                                </Link>{' '}
                                or by blocking analytics scripts. This does not apply to any Retrac Labs
                                app you download.
                            </p>
                        </Section>

                        <Section title="How Long We Keep Things">
                            <p>
                                Beta signup information is kept for as long as you are in the program, and
                                for up to twelve months after the relevant app is released or the program
                                ends, so that we can follow up with testers about the build they helped
                                with. After that we delete it. If you ask us to delete it sooner, we will.
                            </p>
                            <p>
                                Ordinary email correspondence is kept as long as it is useful to have a
                                record of the conversation. Crash reports are kept while the defect is
                                open. Google Analytics retains website data on its own schedule, which is
                                currently set to the shortest option available to us.
                            </p>
                            <p>
                                Data inside our apps is not kept by us at all, because it never reaches us.
                                Deleting the app deletes it.
                            </p>
                        </Section>

                        <Section title="Security">
                            <p>
                                Beta signup information lives in a Google-hosted mailbox protected by a
                                strong unique password and two-factor authentication. Our apps rely on the
                                protections macOS and iOS provide for on-device data, and, where an app
                                encrypts data at rest, on keys held in the device's Secure Enclave rather
                                than by us.
                            </p>
                            <p>
                                No method of storage or transmission is perfectly secure, and we will not
                                claim otherwise. What we can say is that the amount of your data we hold is
                                deliberately small, which is the most reliable security measure available
                                to anyone.
                            </p>
                        </Section>

                        <Section title="Your Rights">
                            <p>
                                Wherever you live, you can ask us to show you what information we hold
                                about you, correct it if it is wrong, delete it, or send you a copy of it.
                                Email{' '}
                                <a href="mailto:retrac.labs@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                                    retrac.labs@gmail.com
                                </a>
                                . We aim to respond within 30 days. There is no charge, and we will not
                                treat you differently for asking.
                            </p>
                            <p>
                                If you are in the European Economic Area or the United Kingdom, you also
                                have the right to object to or restrict processing, the right to data
                                portability, and the right to lodge a complaint with your local data
                                protection authority.
                            </p>
                            <p>
                                If you are a California resident, you have the rights described in the
                                CCPA as amended by the CPRA, including the right to know, delete, and
                                correct, and the right to opt out of sale or sharing. We do not sell or
                                share personal information as those terms are defined, so there is nothing
                                to opt out of, but the right exists and we will honor it.
                            </p>
                        </Section>

                        <Section title="Children's Privacy">
                            <p>
                                Retrac Labs does not knowingly collect personal information from children
                                under 13. The beta program is not open to them. If you believe a child
                                under 13 has given us information, email us and we will delete it promptly.
                            </p>
                        </Section>

                        <Section title="International Users">
                            <p>
                                Retrac Labs operates from the United States, and the service providers
                                named in this policy process information there. If you are writing to us
                                from elsewhere, your information will be handled in the United States,
                                which may have different data protection law than your own country. By
                                contacting us or joining the beta program, you understand that this is
                                where the information goes.
                            </p>
                        </Section>

                        <Section title="Changes To This Policy">
                            <p>
                                We may update this policy as the apps and the beta program change. The
                                "Last updated" date at the top always reflects the current version. If a
                                change materially affects how we handle information you have already given
                                us, we will email beta participants rather than relying on you to notice.
                            </p>
                        </Section>

                        <Section title="Contact">
                            <p>
                                If you have questions about this privacy policy, or want to exercise any of
                                the rights described above, contact us at{' '}
                                <a href="mailto:retrac.labs@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                                    retrac.labs@gmail.com
                                </a>
                                .
                            </p>
                        </Section>
                    </div>
                </section>
            </div>
        </main>
    );
};
