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
    status: 'Beta Testing',
    accent: 'pink',
    accentText: 'text-pink-400',
    icon: Smartphone,
    summary: 'A more personal way to track your menstrual cycle',
    description:
      'Amparo is an iOS cycle-tracking app designed around privacy, clarity, and emotional ease. Instead of turning your' +
        'body into a dashboard of warnings and streaks, Amparo helps you notice patterns, track symptoms, and prepare' +
        'for what is coming with a calmer, more human interface.',
    highlights: [
        'Private cycle, symptom, and mood tracking built for everyday use',
        'Pattern insights that help users understand their own rhythms over time',
        'A gentle visual language that avoids shame, pressure, or alarmist design',
    ],
    nextSteps: [
        'Expand beta testing with a small group of trusted users',
        'Refine predictions, reminders, and symptom logging flows',
        'Review privacy language and App Store health-data requirements before launch',
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
    slug: 'nexus',
    name: 'Project Nexus',
    platform: 'macOS + iOS',
    status: 'Prototyping',
    accent: 'purple',
    accentText: 'text-purple-400',
    icon: Zap,
    summary: 'A fast bridge for clipboard, files, and context across Apple devices.',
    description:
      'Nexus is a cross-device utility concept for moving useful fragments between machines without breaking focus. It is early, but it has a clear north star: make handoff feel instant, visible, and trustworthy.',
    highlights: [
      'Clipboard and file relay concepts for Apple-platform workflows',
      'A visible queue so transfers feel understandable',
      'Early thinking around local-first privacy boundaries',
    ],
    nextSteps: [
      'Map the transport and permissions model',
      'Prototype the queue UI',
      'Validate what should be automatic and what should require confirmation',
    ],
  },
];

export const getProjectBySlug = (slug: string | null) =>
  projects.find((project) => project.slug === slug);
