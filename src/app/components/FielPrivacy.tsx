import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const FielPrivacy = () => {
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
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: October 21, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Overview
                            </h2>
                            <p>
                                Fiel is a Mac app for mental-health clinicians. With a client's
                                consent, it records a session, transcribes it, and drafts a progress
                                note that the clinician reviews, edits, and signs. All of that
                                happens on the clinician's Mac. Fiel collects nothing, and nothing a
                                clinician records, types, or signs ever reaches Retrac Labs.
                            </p>
                            <p className="mt-4">
                                This policy explains, specifically and verifiably, why that is true
                                by design rather than merely promised. Where a claim can be checked,
                                it tells you how to check it. It also describes what Fiel keeps on
                                the Mac and how, because for a clinical record that matters as much
                                as what leaves it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Fiel is developed by Retrac Labs (Jarred Carter). If you have any
                                questions about this policy, contact us at{' '}
                                <a
                                    href="mailto:retrac.labs@gmail.com"
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What Fiel Collects: Nothing
                            </h2>
                            <p>
                                Fiel has no analytics, no crash reporting, no telemetry, no update
                                check, no account, and no login. It builds no profile, identifier, or
                                advertising ID. Recordings, transcripts, notes, and client records
                                are never transmitted anywhere by the app.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Fiel ships{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">without the
                                outgoing-network entitlement</strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 light:border-zinc-200 bg-black/40 light:bg-zinc-100 px-4 py-3 text-sm text-emerald-300 light:text-emerald-800 font-mono">
{`codesign -d --entitlements - /Applications/Fiel.app`}
                            </pre>
                            <p>
                                Besides the identifiers Apple adds when it signs the app, the output
                                lists only <code>app-sandbox</code>, microphone input, access to
                                files you pick in an Open or Save dialog, and a bookmark for the
                                backup folder you choose. There is no network client. The honest
                                boundary: a few operating-system functions, such as the App Store's
                                purchase handling, run in separate Apple processes outside the app.
                                Those are described under “Third Parties” below.
                            </p>
                            <p className="mt-4">
                                Apple's Writing Tools are turned off in every text field in Fiel,
                                because on recent versions of macOS they can send text to Apple's
                                servers for processing. Nothing you type in Fiel is offered to them.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Where Your Records Are Stored
                            </h2>
                            <p>
                                Everything Fiel creates stays on your Mac, in the app's sandbox
                                container at{' '}
                                <code>~/Library/Containers/com.retraclabs.Fiel/</code>: session
                                recordings, transcripts, drafted and signed notes, the notes you type
                                during a session, client records, the activity log, and the deletion
                                log. Nothing leaves your Mac through any action of the app. Exports
                                and backups, described below, go only where you send them.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-emerald-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Every record is
                                    encrypted at rest</strong>, each under its own key. Each client's
                                    record and each session's recording, transcript, and notes are
                                    sealed with AES-256-GCM using a key that belongs to that record
                                    alone. Those keys are kept in a key table that is itself encrypted
                                    under a master key stored in your Mac's keychain. Fiel asks macOS
                                    to keep that master key on this Mac only and never to sync it to
                                    iCloud.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Deleting a record
                                    destroys its key.</strong> When you delete a session or a client,
                                    or a retention timer does, Fiel removes the files and destroys
                                    that record's key, so no copy of it can be read again, including
                                    the copy in your backup folder. A copy you made elsewhere, such as a
                                    Time Machine backup of the whole drive, keeps what it held until
                                    you delete it, and Settings says so.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The drafting model
                                    is inside the app.</strong> The open model that drafts notes ships
                                    inside Fiel. Fiel never downloads it and loads it only after
                                    checking every one of its files against the copy Fiel was tested
                                    with.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">A few things are not
                                    encrypted, and none of them is client information.</strong> Your
                                    own name and credentials (for the signature line), your settings,
                                    and any words you add to the suggested-corrections list are kept
                                    in Fiel's preferences file, which macOS stores in readable form.
                                    Fiel tells you not to add client names to that list. The count of
                                    free sessions you have used is a single number in your Mac's
                                    keychain.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">FileVault protects the
                                    container when your Mac is off.</strong> Fiel's own encryption
                                    protects each record whether or not FileVault is on, but turn
                                    FileVault on anyway; it is the protection for everything else on
                                    the Mac.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Deleting the Fiel app does not necessarily delete its container.
                                macOS can leave <code>~/Library/Containers/com.retraclabs.Fiel/</code>{' '}
                                behind; delete it yourself if you want everything gone. The activity
                                log inside it is deliberately kept so that your record of what
                                happened in Fiel outlives the app. Fiel's two keychain items, the
                                master key and the free-session count, stay in your keychain; without
                                the container, the master key opens nothing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Consent Before Recording
                            </h2>
                            <p>
                                Fiel does not record until two things are true: the client's standing
                                consent to recording is marked on their record, and you confirm, for
                                that session, that the client consented. The per-session confirmation
                                is asked every time and is never pre-checked or remembered. Starting
                                a session or choosing a different client clears it. The same gate
                                applies to a recording made elsewhere that you import: Fiel asks you
                                to confirm the client consented to that recording when it was made.
                            </p>
                            <p className="mt-4">
                                If you upload a signed consent form, Fiel reads the words on its first
                                page with macOS's text recognition and asks the drafting model, on
                                your Mac, whether it looks like consent to record. That is a
                                convenience check, not legal validation, and it never turns on
                                recording by itself. The form is read in place and is not copied into
                                Fiel.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Microphone and System Audio
                            </h2>
                            <p>
                                Fiel uses two macOS permissions, each requested the first time it is
                                needed and revocable at any time in System Settings › Privacy &amp;
                                Security. Microphone access is used only while a session you started
                                is recording, and for the microphone check in Settings, which shows a
                                level for up to twenty seconds and records nothing. System audio
                                recording is used only in a telehealth session, only while it is
                                recording, and only so the other side of the call can be transcribed
                                alongside your microphone. While a session is paused, nothing is
                                written. Nothing is captured outside a session you started, and Fiel
                                never sends any of it anywhere. Recording other people may require
                                their consent where you or they are; see the Terms of Use.
                            </p>
                            <p className="mt-4">
                                In a telehealth session, each line of the transcript is labeled by
                                the channel it was recorded on: your microphone is you, and the call
                                is the client. In person, lines start unlabeled and you label them.
                                Fiel does not recognize voices, build voiceprints, or compare anyone's
                                voice with anything.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Transcription and Drafting
                            </h2>
                            <p>
                                Transcription uses the speech recognizer built into macOS, which runs
                                on your Mac. Fiel decrypts a recording into memory only for as long as
                                transcription or playback needs it, and never writes an unencrypted
                                copy to disk.
                            </p>
                            <p className="mt-4">
                                Drafting uses an open model, Qwen3-4B-Instruct, that ships inside the
                                app and runs on your Mac. The transcript is given to it with lines
                                labeled by role (therapist, client, or a relationship such as partner
                                or interpreter), not by name. Your treatment-plan goals are never
                                given to it. Every drafted statement is checked against the transcript
                                lines it cites, and the result is shown on the statement, but the
                                draft is a draft: you review and sign every note, and the signed note
                                is yours. Retrac Labs never sees a transcript, a draft, or a note.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Screens, Screen Sharing, and the Lock
                            </h2>
                            <p>
                                Every Fiel window, including its sheets and alerts, is hidden from
                                screenshots and screen sharing, so a telehealth screen share never
                                shows a client's record. Apple's own Open and Save dialogs run outside
                                the app and can't be hidden. The window title, the menu bar, and the
                                lock screen never show a client's name.
                            </p>
                            <p className="mt-4">
                                Fiel locks when it opens, when your Mac sleeps, when its screen locks,
                                when you switch users, and after 1, 5, 15, or 30 minutes without
                                input, as you choose. It doesn't lock for inactivity while recording,
                                and a recording continues behind the lock, which shows only the time
                                and a Stop button. Unlocking uses Touch ID or your Mac's password
                                through Apple's LocalAuthentication framework, which tells Fiel only
                                whether you passed; Fiel never sees, stores, or transmits your
                                fingerprint or password.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You choose how long records are kept, in Settings › Records. By
                                default, a session's recording is deleted once its note is signed,
                                and transcripts and signed notes are kept until you delete them. You
                                can set timers for each, and a minimum period for signed records
                                (counted from signing, or from a client's 18th birthday if you
                                choose) that no timer and no manual deletion can get past. An
                                unsigned draft is never deleted by a timer, and a client on Legal Hold
                                is never touched. Set the minimum from your state's and licensing
                                board's rules; Fiel can't know them.
                            </p>
                            <p className="mt-4">
                                Deletion destroys the record's key, as described above. A deletion
                                log keeps the date and kind of each deletion, naming records by
                                number and never by content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Backup and Recovery
                            </h2>
                            <p>
                                If you choose a backup folder, such as one on an external drive, Fiel
                                keeps it as a mirror of its records: the same encrypted files, the
                                encrypted key table, and the master key wrapped under a 24-character
                                recovery code that Fiel shows you once. Nothing in the backup can be
                                read without that code. Fiel keeps no copy of the code you can see
                                and Retrac Labs never has it, so if you lose the code, the backup
                                can't be opened. The folder is updated about ten seconds after each
                                change and every hour, and records Fiel has destroyed are removed from
                                it. Fiel reaches that folder through a macOS bookmark you grant by
                                choosing it, and nothing else outside its container.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                The Activity Log
                            </h2>
                            <p>
                                Fiel keeps a log of what happened and when: sessions recorded,
                                imported, transcribed, drafted, edited, signed, amended, and
                                exported; clients added, edited, and deleted; legal holds; records
                                destroyed; recordings played; transcripts corrected; settings
                                changed; locks and unlocks; backups and restores. It names records by
                                number, never by name, and never records what anyone said or wrote.
                                Each entry carries a hash of itself and of the entry before, so a
                                removed or altered entry shows as a break. It is encrypted, included
                                in your backup, and kept in Fiel's folder even if the app is deleted.
                                You can read it in Settings and export it as text. It is yours; Retrac
                                Labs never receives it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                What You Can Send Out of Fiel
                            </h2>
                            <p>
                                “Nothing leaves this Mac,” which Fiel says in its sidebar, means that
                                Fiel sends nothing. Three things leave only when you send them:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-emerald-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">A signed note as a
                                    PDF</strong>, which carries the client's name and date of birth,
                                    the date of service, and your signature, saved wherever you choose.
                                    Unsigned drafts can't be exported.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The activity log as
                                    text</strong>, which identifies records by number only.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Your backup folder</strong>,
                                    encrypted as described above.
                                </li>
                            </ul>
                            <p className="mt-4">
                                A recording you import from elsewhere is sealed into Fiel as a copy;
                                the original file stays where it was, unencrypted on whatever made
                                it, until you delete it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Third Parties — Apple Only
                            </h2>
                            <p>
                                Fiel includes open-source software and an open drafting model,
                                credited in Settings › Acknowledgments, that run entirely on your Mac
                                and never connect to anything. Fiel uses no third-party SDKs that
                                collect or send data, no AI service, and no ad networks, data
                                brokers, or analytics providers. The only third party involved is
                                Apple, in three operating-system roles:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-emerald-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Purchases.</strong>{' '}
                                    After the free sessions, recording and importing new sessions
                                    need a subscription bought through Apple's In-App Purchase. Apple
                                    processes the transaction; Fiel never sees your payment details and
                                    stores no transaction data of its own beyond asking StoreKit
                                    whether your subscription is active, and the count of free
                                    sessions used.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Unlocking.</strong>{' '}
                                    macOS checks your fingerprint or password and answers only yes or
                                    no; see “Screens, Screen Sharing, and the Lock” above.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The speech model.</strong>{' '}
                                    If macOS hasn't yet installed its English speech-recognition
                                    model, macOS itself downloads it the first time Fiel transcribes.
                                    That download is an Apple operating-system function, governed by
                                    Apple's privacy policy, not something Fiel performs, and it carries
                                    none of your audio.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts, crash statistics, regional sales) for any app we
                                publish. This is produced by Apple, not collected by Fiel, and does
                                not identify you. If you choose to share analytics with app
                                developers in your Mac's settings, or send feedback from a TestFlight
                                beta, Apple passes those crash reports and that feedback on to us. A
                                crash report never contains a recording, a transcript, or a note.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Children
                            </h2>
                            <p>
                                Fiel is made for licensed clinicians and is not directed at children.
                                A clinician may keep records about clients who are minors in Fiel, on
                                their own Mac, as they would in any record-keeping tool; Retrac Labs
                                never receives them. Fiel collects no personal information from
                                anyone, regardless of age.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Your Rights (GDPR / CCPA)
                            </h2>
                            <p>
                                Because no personal data ever reaches Retrac Labs, there is nothing on
                                our side to access, export, correct, or delete: no server, no
                                database, and no account holds anyone's information. A clinician's
                                records are entirely in the clinician's possession, on their Mac,
                                under their control. A client's request about their own records goes
                                to their clinician, who holds them; Retrac Labs has no copy and no way
                                to act on such a request.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                About This Website
                            </h2>
                            <p>
                                This policy covers the Fiel app, which contains no analytics of any
                                kind. The Retrac Labs website you're reading it on is separate and
                                uses its own website analytics; that is described in the{' '}
                                <a
                                    href="#/privacy"
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800"
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
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800"
                                >
                                    retrac.labs@gmail.com
                                </a>.
                            </p>
                            <p className="mt-6 text-sm text-zinc-400 light:text-zinc-600">
                                See also:{' '}
                                <a
                                    href="#/fiel/terms"
                                    className="text-emerald-400 light:text-emerald-700 hover:text-emerald-300 light:hover:text-emerald-800 font-bold"
                                >
                                    Fiel Terms of Use
                                </a>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
};
