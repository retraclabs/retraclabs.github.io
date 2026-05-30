import { Monitor, Smartphone, Zap, type LucideIcon } from 'lucide-react';

export type Project = {
  slug: string;
  name: string;
  platform: string;
  status: string;
  accent: string;
  accentText: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  highlights: string[];
  nextSteps: string[];
  appStoreUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'amparo',
    name: 'Amparo',
    platform: 'iOS',
    status: 'Available',
    accent: 'pink',
    accentText: 'text-pink-400',
    icon: Smartphone,
    summary: 'Privacy-first cycle tracking for iPhone. Your body, your data — no subscriptions, no cloud, no noise.',
    description:
      'Amparo is a cycle-tracking app for iPhone built around privacy, clarity, and emotional ease. ' +
      'Instead of turning your body into a dashboard of warnings and streaks, Amparo helps you log symptoms, ' +
      'track moods, and notice patterns — with a calmer, more human interface that never judges or alarms.\n\n' +
      'Everything stays on your device. No account required. No cloud sync. No subscription. ' +
      'One-time purchase at $4.99.',
    highlights: [
        'Local-only storage: your cycle data never leaves your iPhone — no accounts, no servers',
        'Log symptoms, moods, and cycle phases with a calm, shame-free interface',
        'Pattern insights that help you understand your own rhythms over time',
    ],
    nextSteps: [
        'Expand symptom and mood logging categories based on early user feedback',
        'Introduce optional reminders for upcoming cycle phases and symptom windows',
        'Home screen widget for quick symptom logging without opening the full app',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/amparo/id6765911709',
  },
  {
    slug: 'snippystack',
    name: 'Snippystack',
    platform: 'macOS',
    status: 'Available',
    accent: 'cyan',
    accentText: 'text-cyan-400',
    icon: Monitor,
    summary: 'The clipboard manager that actually thinks. Smart type detection, full history, search, and pins — all' +
        ' from your menu bar.',
    description:
      'macOS copies. SnippyStack remembers.\n' +
        '\n' +
        'Every time you press ⌘C, the system overwrites your last copy, and whatever was there is gone. SnippyStack fixes that. It quietly lives in your menu bar, capturing everything you copy and keeping it ready whenever you need it.\n' +
        '\n' +
        'Click the Snippystack icon to browse your full clipboard history. Click any item to instantly paste it. Search across hundreds of saved clips. Pin your most-used snippets so they\'re always at the top.\n' +
        '\n' +
        'SnippyStack goes further than other clipboard managers:\n' +
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
    nextSteps: [
      'Keyboard-driven quick-paste mini window for faster access without opening the full history',
      'Scheduled expiry for sensitive clips — set a clip to auto-delete after a chosen time',
      'Expanded smart detection for additional content types based on user feedback',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/snippystack/id6765705718?mt=12',
  },
  {
    slug: 'ambient-desk',
    name: 'Ambient Desk',
    platform: 'macOS',
    status: 'Beta',
    accent: 'purple',
    accentText: 'text-purple-400',
    icon: Zap,
    summary: 'A fast bridge for clipboard, files, and context across Apple devices.',
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
    ],
  },
];

export const getProjectBySlug = (slug: string | null) =>
  projects.find((project) => project.slug === slug);
