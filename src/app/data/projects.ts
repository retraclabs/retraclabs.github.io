import { AudioLines, Hash, Mic, Monitor, Smartphone, Zap, type LucideIcon } from 'lucide-react';
import apunteTranscript from '../assets/apunte/transcript.webp';
import apunteReviewMode from '../assets/apunte/review-mode.webp';
import apunteSpeakerNames from '../assets/apunte/speaker-names.webp';
import apunteSummary from '../assets/apunte/summary.webp';
import apunteLibrarySearch from '../assets/apunte/library-search.webp';
import apunteExportFormats from '../assets/apunte/export-formats.webp';

/** How wide a card sits in the six-column Lab grid. See LabSection.tsx. */
export type ProjectSpan = 'full' | 'two-thirds' | 'half' | 'third';

export type Project = {
  slug: string;
  name: string;
  platform: string;
  status: string;
  accent: ProjectAccent;
  accentText: string;
  icon: LucideIcon;
  span: ProjectSpan;
  /** One plain line saying what the thing does. Safe to fill in even while a
   *  project is unannounced: a function is not an announcement, and a codename
   *  with nothing attached is unanswerable to anyone deciding whether to test
   *  it. Shown on the card and in the beta form. Keep it boring, and never let
   *  it name the real product. */
  teaser?: string;
  /** Everything below is optional on purpose. A project with no `summary` is
   *  treated as unannounced: the site shows its codename, platform, status, and
   *  `teaser` and nothing else, and it gets no detail page. Note that `teaser`
   *  above does NOT announce a project; only `summary` does. Uncomment the
   *  block to announce it. */
  summary?: string;
  description?: string;
  highlights?: string[];
  nextSteps?: string[];
  /** Ships instead of `nextSteps` when a project has a released version and a
   *  known next one. Renders the "what you have now / what is coming" pair. */
  version?: {
    current: string;
    currentFeatures: string[];
    next: string;
    nextFeatures: string[];
  };
  appStoreUrl?: string;
  /* The next three are for shipped apps, and all optional. Each one filled in
     appears on the product page. See MAINTAINING.md → "Shipped App Pages". */
  /** The US App Store price, as the store shows it: 'Free', '$1.99'. Change it
   *  here whenever you change it in App Store Connect. */
  price?: string;
  /** The minimum OS, from App Store Connect: 'macOS 26 or later'. */
  requires?: string;
  /** In the order they should appear. Files go in src/app/assets/<slug>/. */
  screenshots?: Screenshot[];
};

export type Screenshot = {
  src: string;
  /** What the picture shows, for anyone who cannot see it. */
  alt: string;
  /** One line under the picture. */
  caption: string;
  /** Marks a feature that needs a paid upgrade, so the page never implies it
   *  is free. */
  premium?: boolean;
  /** Pixel size of the file. Defaults to 1600 × 1000, the size Mac screenshots
   *  are exported at. Give the real size for anything else: a portrait iPhone
   *  screenshot gets a narrower frame so it does not tower over the page. */
  width?: number;
  height?: number;
};

export type ProjectAccent = 'pink' | 'cyan' | 'emerald' | 'sky' | 'purple' | 'green';

/* ──────────────────────────────────────────────────────────────────────────────
   ORDER MATTERS. This array is the order the cards appear in, top to bottom.
   It is deliberately first-in-last-out: the newest, least-finished work is at
   the top, and the apps you can actually download anchor the bottom. To move a
   project, move its whole { … } block. Nothing else needs touching.
   See MAINTAINING.md → "Reordering Projects".
   ────────────────────────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    slug: 'project-salt',
    name: 'Project Salt',
    platform: 'macOS',
    status: 'In Development',
    accent: 'green',
    accentText: 'text-green-400',
    icon: Hash,
    span: 'half',
    teaser: 'Proves a download is exactly what its publisher released, checking hashes, signatures, and notarization on your Mac.',
    /* summary: '',
    description: '',
    highlights: [],
    nextSteps: [], */
  },
  {
    slug: 'project-deacon',
    name: 'Project Deacon',
    platform: 'macOS',
    status: 'Testing',
    accent: 'purple',
    accentText: 'text-purple-400',
    icon: Zap,
    span: 'half',
    teaser: 'Sets up your Mac for each part of your day, opening the apps, files, and links you need and hiding the rest.',
    /* summary: 'Stage your Mac for what comes next, in one click.',
    description:
      'Ambient Desk saves each part of your day as a desk: the apps, files, folders, and links it needs. ' +
      'Stage one and it opens what you need, hides everything else, arranges your windows, and sets your audio. ' +
      'Un-stage it and your previous apps come back. Everything stays on your Mac. Now in beta and looking for early testers.',
    highlights: [
      'Opens what a desk needs, hides the rest, and arranges your windows side by side',
      'Stages itself at a set time, before a calendar event, or when a Focus turns on',
      'Local-first: no account, no analytics, and no network access',
    ],
    nextSteps: [
      'Gather feedback from beta testers on staging and window arrangement',
      'Refine first-run setup around how testers actually get started',
      'Launch on the Mac App Store as a one-time purchase',
    ], */
  },
  {
    slug: 'project-cobra',
    name: 'Project Cobra',
    platform: 'macOS',
    status: 'In Development',
    accent: 'emerald',
    accentText: 'text-emerald-400',
    icon: Mic,
    span: 'half',
    teaser: 'Private session notes for clinicians, drafted on your Mac.',
    /* summary: 'Private, on-device session notes for therapists where nothing ever leaves your Mac.',
    description:
      'Fiel records a therapy session (with consent), transcribes it, and drafts a progress note ' +
      'in the clinician\'s own template — using on-device AI, entirely on their Mac. ' +
      'There is no server, no account, and no analytics.\n\n' +
      'The privacy claim is not a policy promise. It is an architectural fact: Fiel ships without ' +
      'any network entitlement, which means it cannot transmit data. You can verify this yourself ' +
      'on the shipped binary (`codesign -d --entitlements`). There is no server to breach because ' +
      'there is no server.\n\n' +
      'Every note is a visible draft you review, edit, and sign. Every drafted sentence is linked ' +
      'to the transcript span that supports it — so you always know where it came from. ' +
      'Fiel structures what was said; you author the note.',
    highlights: [
      'On-device transcription and note drafting — no server, no account, no network permission',
      'Grounded notes: every sentence cites the transcript; you review and sign every word',
      'Built for EMDR and therapy documentation workflows',
    ],
    nextSteps: [
      'TestFlight beta with a small group of EMDR clinicians',
      'Refine note templates and transcript-to-note citation linking',
      'Validate the full session-to-signed-note workflow in real clinical use',
    ], */
  },
  {
    slug: 'apunte',
    name: 'Apunte',
    platform: 'macOS',
    status: 'Available',
    accent: 'sky',
    accentText: 'text-sky-400',
    icon: AudioLines,
    span: 'half',
    teaser: 'Turns audio and video into text, entirely on your Mac.',
    appStoreUrl: 'https://apps.apple.com/us/app/apunte/id6802142206?mt=12',
    summary:
      'Transcription that never leaves your Mac. Your recordings, your words. No uploads, no account, no network.',
    description:
      'Apunte turns audio and video into accurate, timestamped transcripts entirely on your Mac. ' +
      'Drop in a voice memo, an interview, a lecture, a video — if macOS can play it, Apunte can read it.\n\n' +
      'It ships without the outgoing-network entitlement, so the app\'s own code cannot open a network ' +
      'connection. You don\'t have to take that on faith. Inspect the signed app yourself with codesign. ' +
      'Transcription is free; Premium adds speaker names, summaries, library-wide search, and formatted ' +
      'export, as a monthly or yearly subscription.',
    highlights: [
      'No network access, verifiable: the app ships without the network entitlement, so it cannot upload your audio. Check it yourself in Terminal.',
      'Accurate on real recordings: on a 64-minute, two-person session it captured the same content as MacWhisper, keeping hesitations and false starts rather than smoothing them away.',
      'A free tier that\'s actually complete: transcription, editing, playback, and plain-text, timestamped, and JSON export are free. JSON carries everything, so your work is never locked in.',
    ],
    nextSteps: [
      'Automatic speaker labels, so conversations are attributed without assigning every line by hand',
      'Encryption for the transcript database — stored audio is already sealed with a key held in the Mac\'s Secure Enclave',
      'A clinical edition built on the same on-device core, for practitioners who cannot send session audio to a server',
    ],
    price: 'Free, with an optional Premium subscription',
    requires: 'macOS 26 or later',
    screenshots: [
      {
        src: apunteTranscript,
        alt: 'Apunte\'s main window: a meeting transcript with a timestamp on every line, and a library of recordings in the sidebar.',
        caption: 'Every line timestamped, and transcribed entirely on your Mac.',
      },
      {
        src: apunteReviewMode,
        alt: 'The same transcript in review mode, with three uncertain lines underlined and a count of three in the toolbar.',
        caption: 'Review mode marks the lines Apunte was unsure of, so you check those instead of rereading everything.',
      },
      {
        src: apunteSpeakerNames,
        alt: 'An interview transcript with the speaker\'s name above each line.',
        caption: 'Label who is speaking on any line. Names carry into every export.',
        premium: true,
      },
      {
        src: apunteSummary,
        alt: 'A summary of a meeting recording: an overview paragraph, key points, and action items.',
        caption: 'An overview, key points, and action items for each part of a recording, generated on your Mac.',
        premium: true,
      },
      {
        src: apunteLibrarySearch,
        alt: 'Search results for the word memory across the library, each with its timestamp.',
        caption: 'Find a phrase across every transcript you have, down to the line.',
        premium: true,
      },
      {
        src: apunteExportFormats,
        alt: 'The export menu: plain text, timestamped text, and JSON listed as included, then SubRip, WebVTT, CSV, Markdown, HTML, PDF, and Word as more formats.',
        caption: 'Plain text, timestamped text, and JSON export are free. SRT, WebVTT, CSV, Markdown, HTML, PDF, and Word come with Premium.',
      },
    ],
  },
  {
    slug: 'snippystack',
    name: 'Snippystack',
    platform: 'macOS',
    status: 'Available',
    accent: 'cyan',
    accentText: 'text-cyan-400',
    icon: Monitor,
    span: 'third',
    teaser: 'Clipboard history that lives in your menu bar.',
    summary: 'The context-aware clipboard manager that actually thinks. Smart type detection, full history, search, and pins, all' +
        ' from your menu bar.',
    description:
      'macOS copies. SnippyStack remembers.' +
        '\n' +
        'Every time you press ⌘C, the system overwrites your last copy, and whatever was there is gone. SnippyStack fixes that. It quietly lives in your menu bar, capturing everything you copy and keeping it ready whenever you need it.\n' +
        '\n' +
        'Click the Snippystack icon to browse your full clipboard history. Click any item to instantly paste it. Search across hundreds of saved clips. Pin your most-used snippets so they\'re always at the top.\n' +
        '\n' +
        'SnippyStack goes further than other clipboard managers:' +
        '\n' +
        '· Smart detection: clips are automatically labeled as URLs, emails, code, or plain text\n' +
        '· Full history window: sort by newest, oldest, longest, or most copied, and filter by type\n' +
        '· Permanent Snippets: save text you reuse often, separate from your clipboard history\n' +
        '· Word and character counts: see exactly how long each clip is at a glance\n' +
        '· Copy tracking: Snippystack remembers how many times you\'ve used each item\n' +
        '· Pin to top: keep your most-used clips always within reach\n' +
        '· Global shortcut: open SnippyStack from anywhere with ⌥⌘V\n' +
        '· Privacy-first: your history never leaves your Mac. No cloud. No servers. No accounts.',
    highlights: [
      'Smart type detection: clips are automatically labeled as URLs, emails, code, or plain text',
      'Full history with sort, search, and filter — plus Permanent Snippets for text you reuse',
      'Privacy-first: your clipboard never leaves your Mac. No cloud, no accounts, no nonsense.',
    ],
    version: {
      current: '1.0',
      currentFeatures: [
        'Menu-bar clipboard history: every ⌘C captured and kept, click any clip to paste it',
        'Smart type detection labels clips as URLs, emails, code, or plain text automatically',
        'Full history window: sort by newest, oldest, longest, or most copied, and filter by type',
        'Permanent Snippets for text you reuse, kept separate from the rolling history',
        'Search across hundreds of clips, with word and character counts on each',
        'Pin to top, copy tracking, and a global ⌥⌘V shortcut from anywhere',
        'Entirely on-device: no cloud, no servers, no account',
      ],
      next: '1.1',
      nextFeatures: [
        'A keyboard-driven quick-paste window that reaches a recent clip without opening full history',
        'Scheduled expiry for sensitive clips: set one to delete itself after a chosen time',
        'Excluded apps, so a password manager never lands in the history in the first place',
        'Wider smart detection: file paths, phone numbers, and hex colors as their own types',
      ],
    },
    appStoreUrl: 'https://apps.apple.com/us/app/snippystack/id6765705718?mt=12',
    price: '$1.99',
    requires: 'macOS 13.5 or later',
  },
  {
    slug: 'amparo',
    name: 'Amparo',
    platform: 'iOS',
    status: 'Available',
    accent: 'pink',
    accentText: 'text-pink-400',
    icon: Smartphone,
    span: 'two-thirds',
    teaser: 'Private cycle tracking that never leaves your iPhone.',
    summary: 'Privacy-first cycle tracking for iPhone. Your body, your data — no cloud, no noise.',
    description:
      'Amparo is a cycle-tracking app for iPhone built around privacy, clarity, and emotional ease. ' +
      'Instead of turning your body into a dashboard of warnings and streaks, Amparo helps you log symptoms, ' +
      'track moods, and notice patterns — with a calmer, more human interface that never judges or alarms.\n\n' +
      'Everything stays on your device. No account required. No cloud sync.\n\n' +
      'Amparo describes what you log. It does not diagnose, and it is not a method of contraception.',
    highlights: [
        'Local-only storage: your cycle data never leaves your iPhone — no accounts, no servers',
        'Log symptoms, moods, and cycle phases with a calm, shame-free interface',
        'Pattern insights that describe your own rhythms: never a diagnosis, never a contraceptive',
    ],
    version: {
      current: '1.0',
      currentFeatures: [
        'Period, symptom, and mood logging in a calm, shame-free interface',
        'Cycle and fertile-window predictions, calculated entirely on your iPhone',
        'Calendar, charts, and insights that build up as you log',
        'Home Screen and Lock Screen widgets, Live Activities, and Siri support',
        'Face ID app lock, local reminders, and CSV export',
      ],
      next: '1.1',
      nextFeatures: [
        'Kept out of iCloud Backup by default, so your data stays on your iPhone unless you choose otherwise',
        'Move to a New iPhone: an encrypted, one-time-code transfer by AirDrop, with no cloud in between',
        'Bring your history from Apple Health, Clue, or Flo, read on your iPhone and never uploaded',
        'A Doctor Visit Summary: a PDF of your cycles, patterns, and temperatures to share with a clinician',
        'Your patterns: when your symptoms usually arrive, with an optional heads-up the morning before',
        'Discreet Mode for notifications and the Lock Screen, plus app icons that don\'t look like a cycle tracker',
        'Keep My History: automatically delete entries older than a period you choose',
        'A Quick Log widget for your period and symptoms, right on the Home Screen',
        'Rebuilt predictions with confidence levels and ranges, and ovulation confirmed by temperature',
        'A fresh look: colors that follow your cycle, playful animations, and full support for larger text',
        'A new app icon, with dark, tinted, and clear versions for your Home Screen',
        'Siri keeps quiet about your cycle while your iPhone is locked',
      ],
    },
    appStoreUrl: 'https://apps.apple.com/us/app/amparo/id6765911709',
    price: '$4.99',
    requires: 'iOS 17.6 or later',
  },
];

/** A project is "announced" once it has a summary. Unannounced ones show a
 *  codename card and have no detail page. */
export const isAnnounced = (project: Project) => Boolean(project.summary);

/** A project is "shipped" once it is on the App Store. Its page drops the lab
 *  framing and becomes a product page: download button up top, price, and
 *  screenshots. See MAINTAINING.md → "Shipped App Pages". */
export const isShipped = (project: Project) => project.status === 'Available';

export const getProjectBySlug = (slug: string | null) => {
  const project = projects.find((item) => item.slug === slug);
  return project && isAnnounced(project) ? project : undefined;
};
