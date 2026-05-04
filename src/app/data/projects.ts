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
    slug: 'nova',
    name: 'Project Nova',
    platform: 'macOS',
    status: 'Concept Build',
    accent: 'pink',
    accentText: 'text-pink-400',
    icon: Monitor,
    summary: 'A spatial workspace manager for people who live inside complex desktop flows.',
    description:
      'Nova is an experimental macOS utility for arranging windows, workspaces, and task contexts with a more visual sense of place. The goal is to make a desktop feel less like a stack of rectangles and more like a system you can navigate.',
    highlights: [
      'Spatial window grouping for repeatable work contexts',
      'Fast keyboard-first controls with visual recall',
      'Designed for creative, research, and development workflows',
    ],
    nextSteps: [
      'Build the first clickable prototype',
      'Test workspace presets against real daily workflows',
      'Decide which interactions belong in Swift versus supporting services',
    ],
  },
  {
    slug: 'aura',
    name: 'Aura',
    platform: 'iOS',
    status: 'Exploration',
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
