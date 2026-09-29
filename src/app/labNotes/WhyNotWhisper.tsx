import React from 'react';
import { BarChart, Code, Command, DataTable, Note, Quote, Section, Strong, Subhead, Win } from './kit';

/* "Choosing a Speech Engine": why Apunte uses the recognizer built into macOS
   instead of Whisper. Converted from docs/web/why-not-whisper.html in the Apunte
   project; this file is now the version the site publishes. Title and standfirst
   live in the registry (./index.ts), because the page header renders them. */

export const WhyNotWhisper = () => (
  <>
    <div className="space-y-5">
      <p>
        Whisper changed what open speech recognition could do. It handles accents, noise, and unfamiliar
        words better than anything that came before it, it is genuinely open, and the applications built on
        it — MacWhisper among them — are good software made by people who care. We have used them, and we
        recommend them for plenty of work.
      </p>
      <p>
        So this page is not an argument that Whisper is worse. It is an account of a tradeoff we measured
        and the side of it we chose. Those are different claims, and the distinction matters.
      </p>
    </div>

    <Section title="How We Tested">
      <p>
        Two recordings, both genuinely hard: quiet, two people, a room rather than a studio. Measured
        mean volume <Code>−29.8 dB</Code> and <Code>−32.3 dB</Code>, with a loudness range of 22 LU where
        normal speech content sits around 5–10. One speaker close to the microphone, one across the room.
        This is what real recordings sound like.
      </p>
      <p>
        We used a MacWhisper transcript as the reference and measured word error rate against it with a
        standard Levenshtein alignment. That choice deliberately <em>favours</em> Whisper: MacWhisper runs
        Whisper, so Whisper-based engines should look more similar to the reference by default.
      </p>
    </Section>

    <Section title="Result 1: A 64-Minute Session">
      <BarChart
        title="Words Captured"
        qualifier="64-minute session"
        bars={[
          { label: 'Apunte', value: 8622, display: '8,622 words', tone: 'product' },
          { label: 'MacWhisper', value: 8359, display: '8,359 words' },
        ]}
        notes={[
          'Apunte captured 3.1% more of what was said.',
          'Only 2.0% of the reference was missing from Apunte’s transcript.',
        ]}
        caption="Content capture, 8,128-word session. Higher is better."
      />
      <p>
        Apunte captured <Win>3.1% more</Win> than the Whisper-based reference, and missed
        only <Strong>2.0%</Strong> of it. Overall divergence was 12.9%, but that number is mostly the two
        systems disagreeing on hard passages, not one of them failing.
      </p>

      <Subhead>The Difference? Apunte Is Verbatim</Subhead>
      <p>
        Whisper is trained toward readable transcripts. It tidies stumbles, repetitions, and false
        starts. Apunte reports what was actually said (e.g., <Code>“poke, poke my head around the corner”</Code>{' '})
        where Whisper renders clean prose.
      </p>
      <Quote>
        For notes, interviews, and any record you may need to rely on, hesitation and
        self-correction are signal. A transcript that reads more smoothly <em>because it discarded them</em>{' '}
        is a worse record.
      </Quote>
    </Section>

    <Section title="Result 2: The Most Difficult Passage">
      <p>
        A 90-second stretch of quiet, overlapping conversation, which is the sort of passage where recognisers
        fail. We ran Apunte and two Whisper models through it.
      </p>
      <BarChart
        title="Word Error Rate"
        qualifier="lower is better"
        bars={[
          { label: 'Apunte (Apple on-device)', value: 14.78, display: '14.78%', tone: 'product' },
          { label: 'WhisperKit distil-large-v3', value: 16.52, display: '16.52%' },
          { label: 'WhisperKit large-v3', value: 26.96, display: '26.96%' },
        ]}
        notes={['Measured against a MacWhisper reference, a comparison biased toward Whisper.']}
        caption="Word error rate on a 115-word passage of quiet, overlapping speech."
      />
      <p>
        On this passage Apple’s recogniser scored best. The largest Whisper model scored worst, dropping
        21 of 115 reference words. Worth noting: we ran these models untuned. A dedicated Whisper
        application adds voice-activity gating and temperature fallback precisely to handle this, and
        MacWhisper’s own transcript of the same audio — which we used as the reference — is visibly better
        than what we got from raw WhisperKit. Much of the gap here is pipeline engineering, not the model.
      </p>
    </Section>

    <Section title="The Tradeoff">
      <p>
        In one run, Whisper’s largest model ended its transcript with <Strong>“Thank you.”</Strong> Nobody
        said it. This is a documented characteristic of the architecture: Whisper is a sequence model that
        predicts likely text, so given near-silence it will sometimes predict something plausible.
      </p>
      <p>
        That same property is the source of its strength. Leaning on language modelling is exactly what
        lets Whisper recover a phrase from audio too degraded to resolve acoustically, and on one passage
        here, it did precisely that where Apple’s recogniser could not. <Strong>You do not get one without
        the other.</Strong> It is a coherent design, not a defect.
      </p>
      <p>Which side of that tradeoff is right depends on the work. The two engines fail differently:</p>
      <DataTable
        columns={['Engine', 'How It Fails', 'Can You Catch It?']}
        rowHeaders
        rows={[
          ['Apunte', 'Mishears a word, visibly garbles it', 'Easily; it looks wrong'],
          ['Whisper', 'May generate a fluent sentence', 'Harder; it reads correctly'],
        ]}
      />
      <p>
        A garbled phrase announces itself; a fabricated one does not. For subtitling a podcast, a smooth
        reading is worth more and the occasional invented phrase is harmless. For a record you may need to
        rely on later — an interview, a meeting, a session — we would rather be visibly wrong than
        invisibly wrong. That is the judgement behind Apunte, and reasonable people building different
        products land elsewhere.
      </p>
    </Section>

    <Section title="Final Measurements">
      <p>
        An error you can see is recoverable. An error you cannot see is not. So we asked both engines a
        question: <Strong>when you are wrong, do you know?</Strong>
      </p>
      <p>
        Apple’s recogniser reports a confidence score for every segment. On the hardest passage in our
        sample, the three materially wrong segments scored <Strong>0.13, 0.26, and 0.42</Strong>. Every
        correct segment scored 0.57 or higher. The single worst error in the file had the lowest confidence
        score in the file.
      </p>
      <BarChart
        title="Confidence by Segment (Apple)"
        qualifier="0–1, higher = more certain"
        max={1}
        threshold={{ value: 0.5, label: '0.5 — review threshold' }}
        bars={[
          { label: 'Wrong', value: 0.13, display: '0.13', tone: 'bad' },
          { label: 'Wrong', value: 0.26, display: '0.26', tone: 'bad' },
          { label: 'Wrong', value: 0.42, display: '0.42', tone: 'bad' },
          { label: 'Correct', value: 0.57, display: '0.57', tone: 'good' },
          { label: 'Correct', value: 0.82, display: '0.82', tone: 'good' },
          { label: 'Correct', value: 0.97, display: '0.97', tone: 'good' },
        ]}
        notes={['Errors fall below the line. Correct text falls above it.']}
        caption="Confidence separates right from wrong cleanly on this sample."
      />
      <p>
        We ran the same test on Whisper. It reports confidence too, as an average log probability. On the
        run where it appended <Strong>“Thank you.”</Strong> to a recording in which nobody said it, that
        invented sentence scored <Strong>−0.209</Strong>.
      </p>
      <p>
        Correctly transcribed speech in the same run scored <Strong>−0.204</Strong>.
      </p>
      <BarChart
        title="Whisper’s Confidence"
        qualifier="avg log probability, closer to 0 = more certain"
        max={1}
        scale={Math.exp}
        bars={[
          { label: 'Correctly transcribed speech', value: -0.204, display: '−0.204', tone: 'good' },
          { label: '“Thank you.” (was never said)', value: -0.209, display: '−0.209', tone: 'bad' },
        ]}
        notes={[
          'The fabricated sentence was as confident as the correct transcription.',
          'Its no-speech probability was 0.00, and the model was certain someone spoke.',
        ]}
        caption="Whisper’s own confidence did not distinguish invention from transcription."
      />
      <p>
        There is a structural reason for this. Whisper scores a <em>chunk</em> of audio, not a line: in
        our run, five consecutive segments shared the identical score of −0.602. Even in principle it cannot
        tell you which line in a passage is the unreliable one.
      </p>
      <p>
        This is the difference that decided it for us. Both engines make mistakes. Apple’s tell you where
        they are.
      </p>
    </Section>

    <Section title="What We Built on Top of That">
      <p>
        Since the confidence signal is reliable, Apunte shows it. Turn on review mode and every line the
        recogniser was unsure about is marked, with a control to step through them in order to check
        the six lines that are probably wrong rather than re-reading nine thousand words.
      </p>
      <p>
        The threshold is 0.5, chosen from the measurements above rather than picked by feel. On our test
        recording it flags exactly the wrong segments and none of the right ones.
      </p>
    </Section>

    <Section title="Speed">
      <BarChart
        title="Speed"
        qualifier="× faster than realtime, higher is better"
        bars={[
          { label: 'Apunte', value: 71, display: '71×', tone: 'product' },
          { label: 'distil-large-v3', value: 4.4, display: '4.4×' },
          { label: 'large-v3', value: 1.4, display: '1.4×' },
        ]}
        notes={['Plus 93–228 seconds to load Whisper weights before a single word is transcribed.']}
        caption="Transcription speed on identical audio, same machine."
      />
      <p>
        An hour of audio takes Apunte under a minute. The same hour through Whisper’s largest model takes
        roughly forty-three, before counting the four minutes spent loading the model.
      </p>
    </Section>

    <Section title="Where Whisper Is Better">
      <p>
        On the hardest phrase in our sample — quiet, overlapping, two people talking across each other —{' '}
        <Code>distil-large-v3</Code> recovered “look at us being all efficient” where Apple’s recogniser
        produced “that’s a big, all efficient shit”. Whisper simply understood it better.
      </p>
      <p>
        That is not a small thing, and if your recordings are consistently difficult, it is a real reason
        to choose a Whisper-based tool. It came with more errors elsewhere in our sample and a substantial
        speed cost, but on the specific problem of <em>bad audio</em>, Whisper’s approach has a genuine
        advantage over Apple’s.
      </p>
    </Section>

    <Section title="What Actually Improves Accuracy">
      <p>
        We also tested audio pre-processing with dynamic range compression to lift quiet speakers, raising
        mean volume from −29.8 dB to −19.9 dB. It changed word count by <Strong>0.2%</Strong>. The
        recogniser was already hearing the audio.
      </p>
      <Quote>
        The largest gain available isn’t a model, but rather a microphone. A recording with a 22 LU
        loudness range has one speaker near the noise floor. A boundary microphone placed between two
        people will do more for accuracy than any engine we tested.
      </Quote>
    </Section>

    <Section title="What Follows From the Choice">
      <DataTable
        columns={['', 'Apunte', 'Whisper-Based Apps']}
        rowHeaders
        rows={[
          ['Model Download', <Win>None, built into macOS</Win>, '~1.5 GB from a third-party host'],
          ['Network Access', <Win>No entitlement at all</Win>, 'Required to fetch weights'],
          ['Hour of Audio', <Win>Under a minute</Win>, '10–45 minutes'],
          ['Can Invent Text', <Win>No</Win>, 'Sometimes, by design'],
        ]}
      />
      <p>
        Because Apunte uses the recogniser already in macOS, it ships without the outgoing-network
        entitlement — so the app cannot transmit your audio anywhere. You don’t have to take that on
        faith:
      </p>
      <Command>codesign -d --entitlements - /Applications/Apunte.app</Command>
      <p>
        There is no network entitlement in that output. That guarantee is a direct consequence of using
        the recogniser already present in macOS — it is available to us because of the choice described
        here, and is not available to an app that must fetch model weights. That is a constraint of the
        approach, not a criticism of the apps that take it.
      </p>
    </Section>

    <Section title="Method and Limits">
      <Note>
        Measured 13 September 2026 on an Apple M4 Max with 48 GB of memory running macOS 26.6.2. Apple’s
        side is the on-device recogniser shipped with that release of macOS. Whisper’s side is WhisperKit
        1.1.0 (argmax-oss-swift) running the large-v3 and distil-large-v3 models. Both engines were run on
        the same machine over identical audio.
      </Note>
      <Note>
        Word error rate was computed by Levenshtein alignment against a MacWhisper reference
        transcript, which is <em>not</em> a human-verified ground truth, meaning these figures measure
        divergence from MacWhisper rather than absolute accuracy. The 64-minute comparison covers 8,128
        words; the difficult-passage comparison covers 115 words and is a small sample, and the confidence
        findings in particular come from a single recording, and we would not present them as a general
        law. Whisper’s confidence is reported as an average log probability over a chunk, which is not
        directly comparable to Apple’s per-segment score; we compare each engine against its own range
        rather than against each other’s.
      </Note>
      <Note>
        Whisper models were run through WhisperKit without custom voice-activity tuning, which a dedicated
        Whisper application would likely add; a tuned pipeline would score better than these figures show.
      </Note>
      <Note>
        Re-checked on 22 September 2026 after updating to macOS 27.0: Apple’s recogniser was run again on
        the same 90-second passage against the same reference and produced the same result to the word — 12
        substitutions, 5 deletions, no insertions, 14.78% — so the update did not change its output on this
        material. The same day, a second full recording of 71 minutes scored 14.8% divergence from a
        MacWhisper reference, with 2.1% more words captured than the reference and 2.8% of it missed, in
        line with Result 1. We will re-run this comparison as both Apple’s and OpenAI’s models are updated.
      </Note>
      {/* Apunte 1.1 release day: the paragraph in section 4 of
          ~/Documents/Apunte/docs/site-updates-1.1.md goes here, as its own <Note>. */}
      <Note>
        We published the numbers that went against us alongside the ones that went for us.
        If you find an error in this methodology,{' '}
        <a
          href="mailto:retrac.labs@gmail.com"
          className="underline decoration-2 underline-offset-2 hover:text-white light:hover:text-zinc-900 transition-colors"
        >
          we would like to hear about it.,
        </a>{' '}
        and if you are choosing between transcription tools, we would rather you picked the right one for
        your work than ours.
      </Note>
    </Section>
  </>
);
