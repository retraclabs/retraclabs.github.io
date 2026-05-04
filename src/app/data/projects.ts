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
    slug: 'aura',
    name: 'Aura',
    platform: 'iOS',
    status: 'Concept Build',
    accent: 'cyan',
    accentText: 'text-cyan-400',
    icon: Smartphone,
    summary: 'A habit and rhythm companion that turns routines into calm, glanceable visuals.',
    description:
      'Aura is a mobile experiment around lightweight personal systems. It focuses on tiny daily signals, visual continuity, and interfaces that feel motivating without becoming noisy.',
    highlights: [
      'Animated habit widgets built for quick daily check-ins',
      'Soft progress language instead of guilt-driven streak mechanics',
      'A visual system that can expand from phone to desktop later',
    ],
    nextSteps: [
      'Define the smallest useful tracking loop',
      'Prototype the primary widget states',
      'Test whether the visual language stays clear on small screens',
    ],
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
