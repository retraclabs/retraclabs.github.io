import { AudioLines, Hash, Mic, Monitor, Smartphone, Zap, type LucideIcon } from 'lucide-react';

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
    teaser: 'File integrity checking. Drag a file in, verify its hash.',
    /* summary: '',
    description: '',
    highlights: [],
    nextSteps: [], */
  },
  {
    slug: 'project-decibel',
    name: 'Project Decibel',
    platform: 'macOS',
    status: 'Beta Testing',
    accent: 'sky',
    accentText: 'text-sky-400',
    icon: AudioLines,
    span: 'half',
    teaser: 'Turns audio and video into text, entirely on your Mac.',
    /* summary:
      'Transcription that never leaves your Mac. Your recordings, your words. No uploads, no account, no network.',
    description:
      'Apunte turns audio and video into accurate, timestamped transcripts entirely on your Mac. ' +
      'Drop in a voice memo, an interview, a lecture, a video — if macOS can play it, Apunte can read it.\n\n' +
      'It ships without the outgoing-network entitlement, so the app\'s own code cannot open a network ' +
      'connection. You don\'t have to take that on faith. Inspect the signed app yourself with codesign. ' +
      'Transcription is free, permanently; Premium adds speaker names and formatted export.',
    highlights: [
      'No network access, verifiable: the app ships without the network entitlement, so it cannot upload your audio. Check it yourself in Terminal.',
      'Accurate on real recordings: on a 64-minute, two-person session it captured the same content as MacWhisper, keeping hesitations and false starts rather than smoothing them away.',
      'A free tier that\'s actually complete: transcription, editing, playback, and plain-text, timestamped, and JSON export are free forever. JSON carries everything, so your work is never locked in.',
    ],
    nextSteps: [
      'Automatic speaker labels, so conversations are attributed without assigning every line by hand',
      'Encryption for the transcript database — stored audio is already sealed with a key held in the Mac\'s Secure Enclave',
      'A clinical edition built on the same on-device core, for practitioners who cannot send session audio to a server',
    ], */
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
    teaser: 'Moves clipboard items and files between your Apple devices.',
    /* summary: 'A fast bridge for clipboard, files, and context across Apple devices.',
    description:
      'Ambient Desk is a macOS utility for moving useful fragments between machines without breaking focus. ' +
      'It keeps a visible, local queue of clipboard items and files ready to hand off across your Apple devices — ' +
      'fast, private, and trustworthy. Now entering beta and looking for early testers.',
    highlights: [
      'Clipboard and file relay built for Apple-platform workflows',
      'A visible queue so every transfer feels understandable and intentional',
      'Local-first: nothing moves without your say-so, no accounts required',
    ],
    nextSteps: [
      'Gather feedback from early beta testers on core handoff flows',
      'Refine the queue UI and permission model based on real usage',
      'Expand device pairing and add scheduled or triggered transfers',
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
        '· Privacy-first: your history never leaves your Mac. No cloud. No servers. No accounts.\n' +
        '\n' +
        'One-time purchase. No subscription. No nonsense.',
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
    summary: 'Privacy-first cycle tracking for iPhone. Your body, your data — no subscriptions, no cloud, no noise.',
    description:
      'Amparo is a cycle-tracking app for iPhone built around privacy, clarity, and emotional ease. ' +
      'Instead of turning your body into a dashboard of warnings and streaks, Amparo helps you log symptoms, ' +
      'track moods, and notice patterns — with a calmer, more human interface that never judges or alarms.\n\n' +
      'Everything stays on your device. No account required. No cloud sync. No subscription. ' +
      'One-time purchase at $4.99.\n\n' +
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
        'Rebuilt prediction engine: one unusual cycle no longer skews every estimate that follows',
        'Predictions carry a confidence level and a range, instead of implying a certainty the data does not have',
        'A late period is shown as late, rather than folded into the next cycle',
        'Cycle pattern observations: irregularity, long gaps, and persistent changes in cycle length',
        'Ovulation estimated from your own cycle length rather than a fixed day 14',
        'Widget fix: widgets now install on every iOS version the app supports, not only iOS 18.6 and later',
        'Reduce Motion honoured throughout, for anyone sensitive to movement',
      ],
    },
    appStoreUrl: 'https://apps.apple.com/us/app/amparo/id6765911709',
  },
];

/** A project is "announced" once it has a summary. Unannounced ones show a
 *  codename card and have no detail page. */
export const isAnnounced = (project: Project) => Boolean(project.summary);

export const getProjectBySlug = (slug: string | null) => {
  const project = projects.find((item) => item.slug === slug);
  return project && isAnnounced(project) ? project : undefined;
};
