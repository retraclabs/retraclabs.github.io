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
                    className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Retrac Labs
                </motion.a>

                <section className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10">
                    <div className="text-xs font-mono font-black text-sky-400 light:text-sky-700 uppercase tracking-widest mb-4">
                        Apunte
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-white light:text-zinc-900 uppercase mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-zinc-400 light:text-zinc-600 font-mono font-bold mb-10">
                        Last updated: October 28, 2026
                    </p>

                    <div className="space-y-10 text-zinc-300 light:text-zinc-700 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Overview
                            </h2>
                            <p>
                                Apunte turns audio and video files into timestamped transcripts
                                entirely on your device, whether that's a Mac, an iPhone, or an
                                iPad. It collects nothing.
                                This policy explains, specifically and verifiably, why that is true
                                by design — not merely promised. Verifiability is the point: where a
                                claim can be checked, this policy tells you how to check it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Who We Are
                            </h2>
                            <p>
                                Apunte is developed by Retrac Labs (Jarred Carter). If you have any
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
                                What Apunte Collects: Nothing
                            </h2>
                            <p>
                                Apunte has no analytics, no crash reporting, no telemetry, no update
                                check, no account, and no login. It builds no profile, identifier, or
                                advertising ID. Your audio, video, and transcripts are never
                                transmitted anywhere. Live transcription listens to your
                                microphone only while a session you started is running and, in the
                                Mac's call mode, also to what other apps are playing, after you
                                allow that in macOS's own prompt. What it hears is transcribed on
                                your device and kept there like any imported recording.
                            </p>
                            <p className="mt-4">
                                This is structural, not just a promise. Apunte ships{' '}
                                <strong className="text-white light:text-zinc-900 font-bold">without the
                                outgoing-network entitlement</strong>{' '}
                                (<code>com.apple.security.network.client</code>). Because macOS
                                enforces the app sandbox, an app without that entitlement cannot open
                                a network connection from its own code. You can verify this yourself
                                on the signed app:
                            </p>
                            <pre className="mt-4 mb-2 overflow-x-auto rounded-xl border border-zinc-800 light:border-zinc-200 bg-black/40 light:bg-zinc-100 px-4 py-3 text-sm text-cyan-300 light:text-cyan-800 font-mono">
{`codesign -d --entitlements - Apunte.app`}
                            </pre>
                            <p>
                                The output lists only <code>app-sandbox</code> and the
                                user-selected file read/write permissions — no network client. The
                                honest boundary: system frameworks such as the App Store and macOS's
                                own model downloads run in separate Apple processes, outside the app
                                itself. Those are described under “Third Parties” below.
                            </p>
                            <p className="mt-4">
                                On iPhone and iPad, iOS has no such entitlement to leave out, so the
                                assurance is in the code itself: the app and its Lock Screen and
                                Control Center extension contain no networking code of any kind and
                                no third-party code, and our release checks fail if either ever
                                appears. iOS keeps its own record of the domains each app contacts,
                                which you can read in Settings › Privacy &amp; Security › App
                                Privacy Report.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Where Your Data Is Stored
                            </h2>
                            <p>
                                Everything Apunte creates stays on your device. On a Mac, that's the
                                app's sandbox container at{' '}
                                <code>~/Library/Containers/com.retraclabs.apunte/</code>. On iPhone
                                and iPad, it's Apunte's own app container, which iOS encrypts with
                                Data Protection until you first unlock the device after it starts.
                                Nothing leaves your device through any action of the app; exports
                                and transfers, described below, go only where you send them.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-sky-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Stored audio is
                                    encrypted at rest</strong> using AES-256-GCM, with a key wrapped
                                    by your device's Secure Enclave. That key is non-exportable and
                                    bound to that device, so copying the audio files to another
                                    computer yields nothing readable. If the key is ever
                                    unavailable, a Mac stores the audio unencrypted and says so in
                                    Settings › Privacy, while an iPhone or iPad keeps the transcript
                                    without its audio.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">The transcript
                                    database itself is not encrypted.</strong> Transcript text,
                                    your notes, speaker names, and source filenames are stored in a local
                                    database in readable form. When your Mac is powered off,
                                    FileVault (if you have it enabled) protects them; on iPhone and
                                    iPad, iOS Data Protection keeps them encrypted until you first
                                    unlock the device after it starts. Once your device is unlocked,
                                    they are readable like any other document. We state this plainly
                                    rather than imply the whole store is encrypted.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Exported
                                    audio goes only where you put it.</strong> Exporting a whole
                                    recording decrypts it straight into the file you save. A clip, or
                                    the sound from a video, needs a working copy: Apunte decrypts the
                                    recording into a temporary folder inside its container for the
                                    seconds the export takes, then overwrites and removes that folder,
                                    whether the export worked or not. The file you saved is an
                                    ordinary, unencrypted audio file. It is outside Apunte's care from
                                    then on: the retention setting does not apply to it, and deleting
                                    it is up to you.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Settings
                                    stay on your device too,</strong> in the same container,
                                    including the look you chose and, on a Mac, whether the lock is
                                    on.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">While
                                    Apunte records,</strong> live on a Mac or on an iPhone or iPad, the
                                    audio is kept unencrypted in Apunte's container, where only the app
                                    can reach it, and is encrypted when you stop. Notes you type during
                                    a recording are kept beside it there. A recording that's waiting to
                                    be transcribed stays unencrypted there until it is. If a recording
                                    is cut off, by a crash or a flat battery for example, it is never
                                    erased without you seeing it: on a Mac, Apunte transcribes what was
                                    recorded the next time it opens and saves it with your notes; on
                                    iPhone and iPad, it waits until you recover or erase it.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Files you
                                    open in Apunte from other apps</strong> on iPhone and iPad, such as
                                    a voice memo or something sent by AirDrop, arrive as an
                                    unencrypted copy that iOS places in Apunte's Documents folder.
                                    Apunte overwrites and removes that copy once it's imported, and
                                    erases one left behind the first time it's open after the copy
                                    is an hour old. A file you pick in the Files app is read where
                                    it is, not copied there. That folder is the one the Files app and
                                    Finder show for Apunte; Apunte puts nothing else in it, so
                                    anything else there, such as a transfer file, is something you
                                    put there yourself. Videos you choose from Photos are read
                                    through the system picker, with no access to your library, and
                                    only their sound is kept.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">“Transcribe
                                    in Apunte” in the share sheet,</strong> in Voice Memos or any app
                                    that shares audio or video, copies what you share into a folder
                                    that only Apunte and its extensions can reach on your device.
                                    The copy is unencrypted, protected until you first unlock the
                                    device after it starts, and kept out of backups. Apunte imports
                                    it the next time you open it and then erases it, and erases one
                                    left there an hour or more if an import never happened.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">While a
                                    file is transcribed,</strong> on any device, Apunte works from an
                                    unencrypted copy inside its container and erases that copy when
                                    it's done; the audio it keeps is then encrypted, as described
                                    above.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">On iPhone
                                    and iPad, backups are off unless you turn them on.</strong>{' '}
                                    Apunte keeps its library, recordings, and incoming files out of
                                    iCloud and computer backups; only its settings, which hold no
                                    transcript content, are backed up, as any app's are. If you turn
                                    on Settings › Privacy › Backups, your transcripts' text, titles,
                                    edits, notes, and speaker names, and the names of files waiting to be
                                    imported, go into your backups. There they are protected as
                                    Apple protects backups: end to end in iCloud only with Advanced
                                    Data Protection, and on a computer only if you encrypt the
                                    backup. Recordings are never backed up, and their key can't leave
                                    the device, so a backup restored to a new device brings back
                                    transcripts without their audio.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">You can
                                    send transcripts to your own devices with AirDrop or a cable;
                                    Apunte never sends anything by itself.</strong> Sending makes one
                                    encrypted file that opens only on your paired devices (pairing
                                    uses a one-time code shown on the sending device). It includes your
                                    notes, and a recording only if you switch that on. The file goes only where
                                    you send it: by AirDrop, by a cable and Finder, or to another
                                    place you choose in the share sheet or save panel. It never passes
                                    through Retrac Labs. The keys that pair your devices stay in each
                                    device's keychain and are never synced.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Microphone and System Audio
                            </h2>
                            <p>
                                Live transcription uses two macOS permissions, each requested the
                                first time it is needed and revocable at any time in System Settings
                                › Privacy &amp; Security. Microphone access is used only while a live
                                session is running. System audio recording is used only in call
                                mode, only while a session is running, and only so the other side of
                                a call or meeting can be transcribed alongside your microphone.
                                Nothing is captured outside a session you started, and Apunte never
                                sends any of it anywhere. Recording other people may require their
                                consent where you or they are; see the Terms of Use.
                            </p>
                            <p className="mt-4">
                                If you turn on Settings › General › Offer to transcribe when a call
                                starts, Apunte on the Mac notices when another app, such as FaceTime
                                or Zoom, starts using the microphone, using what macOS's audio system
                                reports about which apps are using it. It learns only which app, never
                                what anyone says, and it records nothing unless you choose Transcribe
                                Call in the notification it shows. The setting is off until you turn
                                it on, and it works only while Apunte is running.
                            </p>
                            <p className="mt-4">
                                On iPhone and iPad, Apunte uses the microphone alone, only while a
                                recording you started is running, whether you started it in the
                                app, from Control Center, with the Action button, or with Siri or
                                Shortcuts. It keeps recording when the screen locks or you switch
                                apps, and iOS shows its own recording indicator the whole time. It
                                can't hear phone or FaceTime calls or other apps' audio: a call
                                pauses the recording until the call ends. A call is transcribed only
                                if you share iPhone's own call recording with Apunte, like any other
                                file.
                            </p>
                            <p className="mt-4">
                                In the Mac's call mode, Apunte labels each line “Me” or “Others” by comparing
                                how loud your microphone and the other apps' audio were while it
                                was spoken. Call labels use that comparison of loudness alone, with
                                no voice recognition and no voiceprint. The levels are used once,
                                when the session ends, and are not kept. The labels are ordinary
                                speaker names that you can rename or remove.
                            </p>
                            <p className="mt-4">
                                Identify Speakers, a Premium feature, tells apart the voices in a
                                transcript's stored recording when you choose it. To do that,
                                speaker models built into the app measure the characteristics of
                                each voice in that recording and compare them with each other, on
                                your Mac. The measurements exist only in your Mac's memory while
                                identification runs and are discarded when it finishes. They are
                                never saved, never compared with any other recording, and never
                                sent anywhere. Apunte doesn't learn or recognize who anyone is:
                                speakers are numbered "Speaker 1," "Speaker 2," and so on, and you
                                name them yourself if you want to. Retrac Labs never receives the
                                recording, the measurements, or the names.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Lock Screen, Siri, and the App Switcher
                            </h2>
                            <p>
                                On iPhone and iPad, a recording shows a Live Activity on the Lock
                                Screen and in the Dynamic Island: whether it's recording or paused,
                                how long it has run, a sound-level meter, and Stop and Resume
                                buttons that work without unlocking. It never shows a transcript's
                                title. It shows the latest transcribed line only if you turn on
                                Settings › Privacy › Lock Screen, which is off until you do. The
                                Control Center control shows only “Record.” When you leave Apunte,
                                it covers its window, so the app switcher shows no transcript.
                            </p>
                            <p className="mt-4">
                                Apunte offers Siri and the Shortcuts app one shortcut, “Record with
                                Apunte.” It gives no transcript, title, or other content of yours
                                to Siri, Spotlight, or Handoff.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                The App Lock
                            </h2>
                            <p>
                                On a Mac, you can lock Apunte with Touch ID or your login password in
                                Settings › Privacy. macOS does the checking, through Apple's
                                LocalAuthentication framework, and tells Apunte only whether you
                                passed. Apunte never sees, stores, or transmits your fingerprint or
                                your password; fingerprint data never leaves your Mac's Secure
                                Enclave. The lock covers Apunte's windows so someone using your
                                unlocked Mac can't read your transcripts. It is a gate, not
                                encryption: the transcript database is still stored as described
                                above, and FileVault is what protects it on disk.
                            </p>
                            <p className="mt-4">
                                The iPhone and iPad app has no lock of its own: your device's
                                passcode, Face ID, or Touch ID is what keeps others out of it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Retention and Deletion
                            </h2>
                            <p>
                                You control how long audio is kept: keep it, erase it immediately
                                after transcription, or erase it automatically after a number of days
                                you choose. A live session always keeps its recording, whatever that
                                setting says, because a microphone recording exists nowhere else and
                                the transcript can only be checked against it; the days-based setting
                                still applies to it, and you can erase it by hand at any time.
                                Erasure overwrites the audio before removing it — a
                                practical deletion, not a forensic secure-wipe, and we don't claim
                                otherwise. Deleting the Apunte app removes its container and
                                everything inside it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Third Parties — Apple Only
                            </h2>
                            <p>
                                The Mac app includes open-source software and speaker models,
                                credited in its About window, that run entirely on your Mac and
                                never connect to anything. Apunte uses no third-party SDKs that
                                collect or send data, and no ad networks, data brokers, or analytics
                                providers. The only third party involved is Apple, in five
                                operating-system roles:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-4 marker:text-sky-400">
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Purchases.</strong>{' '}
                                    Premium features are unlocked through Apple's In-App Purchase,
                                    as a monthly or yearly subscription or a one-time lifetime
                                    purchase, and one purchase covers Apunte on Mac, iPhone, and
                                    iPad.
                                    Apple processes the transaction; Apunte never sees your payment
                                    details and stores no transaction data of its own beyond asking
                                    StoreKit whether your entitlement is currently active.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Unlocking.</strong>{' '}
                                    On a Mac with the app lock on, macOS checks your fingerprint or
                                    password and answers only yes or no; see “The App Lock” above.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Speech model
                                    downloads.</strong> When a language pack isn't yet installed,
                                    macOS or iOS itself downloads the speech-recognition model. That
                                    download is an Apple operating-system function, governed by
                                    Apple's privacy policy — not something Apunte performs.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Summaries.</strong>{' '}
                                    Premium summaries are generated on your device by Apple
                                    Intelligence, an Apple operating-system function governed by
                                    Apple's privacy policy — not something Apunte performs. Apunte
                                    passes the transcript to the on-device system; the app itself
                                    sends nothing off your device. A summary is kept beside its
                                    transcript on the device that made it, goes into backups only
                                    when your transcripts do, is never sent with a transcript to
                                    your other devices, and is erased when you delete the
                                    transcript.
                                </li>
                                <li>
                                    <strong className="text-white light:text-zinc-900 font-bold">Sending
                                    to your devices.</strong> When you send transcripts by AirDrop or
                                    with Finder, those Apple operating-system functions, governed by
                                    Apple's privacy policy, carry the file. Another app or place you
                                    pick in the share sheet or save panel is your choice, as with any
                                    file you save. Either way, Apunte encrypts the file before handing
                                    it over and never connects to anything itself.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Separately, Apple provides us with aggregate App Store analytics
                                (download counts, crash statistics, regional sales) for any app we
                                publish. This is produced by Apple, not collected by Apunte, and does
                                not identify you. If you choose to share analytics with app
                                developers in your device's settings, or send feedback from a
                                TestFlight beta, Apple passes those crash reports and that feedback
                                on to us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Children
                            </h2>
                            <p>
                                Apunte is not directed at children and collects no personal
                                information from anyone, regardless of age.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                Your Rights (GDPR / CCPA)
                            </h2>
                            <p>
                                Because no personal data ever reaches Retrac Labs, there is nothing
                                on our side to access, export, correct, or delete — no server, no
                                database, no account holds your information. Your data is already
                                entirely in your possession, on your devices, under your control. You
                                exercise every one of these rights directly, by managing or deleting
                                the files and the app yourself.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-3">
                                About This Website
                            </h2>
                            <p>
                                This policy covers the Apunte app, which contains no analytics of any
                                kind. The Retrac Labs website you're reading it on is separate and
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
                                    href="#/apunte/terms"
                                    className="text-sky-400 light:text-sky-700 hover:text-sky-300 light:hover:text-sky-800 font-bold"
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
