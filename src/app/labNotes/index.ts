import type { ComponentType } from 'react';
import { WhyNotWhisper } from './WhyNotWhisper';

/* Lab notes: research that backs up what a product page claims. Benchmarks,
   methodology, the reasoning behind a technical choice. The product page makes
   the claim in a sentence; the note is where it is proved.

   A note is a React component written with the blocks in ./kit.tsx, so it looks
   like the rest of the site and follows the light/dark toggle for free.

   To add one:
     1. write it as a component in this folder, using ./kit.tsx
     2. add a row below

   That is all. The route, the card on the product's page, the back link, and
   the download button at the end all come from the row. */

export type LabNote = {
  /** The hash route it lives at, e.g. '#/apunte/why-not-whisper'. */
  href: string;
  /** The product it backs up. Its page lists the note, and the note links back. */
  projectSlug: string;
  /** Title case. Also the title on the product page's card. */
  title: string;
  /** The opening paragraph, shown large under the title. */
  standfirst: string;
  /** One line for the card on the product page. */
  blurb: string;
  /** When the work was done. Measurements go stale, so say when they were taken. */
  dateline?: string;
  Body: ComponentType;
};

export const LAB_NOTES: LabNote[] = [
  {
    href: '#/apunte/why-not-whisper',
    projectSlug: 'apunte',
    title: 'Choosing a Speech Engine',
    standfirst:
      'Whisper is a remarkable piece of work, and we fully expected to build on it. We measured first, ' +
      'and the results sent us the other way — for reasons specific to what Apunte is for.',
    blurb:
      'Why Apunte uses the speech engine built into macOS instead of Whisper, with the measurements ' +
      'that decided it, including the ones that went against it.',
    dateline: 'Measured September 13, 2026 · Rechecked September 22, 2026',
    Body: WhyNotWhisper,
  },
];

export const getLabNote = (hash: string) => LAB_NOTES.find((note) => note.href === hash);

export const getLabNotesFor = (projectSlug: string) =>
  LAB_NOTES.filter((note) => note.projectSlug === projectSlug);
