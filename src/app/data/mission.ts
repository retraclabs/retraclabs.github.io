/* The mission, in one place because two pages open with it: the homepage under
   the hero, and the top of the About page.

   Edit it here and both update. Do not copy it into a component.

   The order of MISSION is load-bearing. The reader's stake comes first and the
   proof second, because "ships without the network entitlement" is a devastating
   fact only to somebody who has already decided to care. Lead with it and you
   have answered a question nobody asked yet.

   The homepage shows it in the visitor's language (MISSION_IN, below); the
   About page is English only for now and uses the English exports. */

import type { Language } from './languages';

/** One line. For a LinkedIn headline, an email signature, a badge. */
export const MISSION_SHORT = "Can't, Not Won't.";

/** Three parts, descending in weight. The first two carry the meaning if you
 *  ever have to truncate; the third is the closer. */
export const MISSION = [
  'Your work and your life run on your Mac.',
  'Retrac Labs builds the apps that let both stay yours.',
  'Not because we promise not to look, but because they ship without the ability for us to.',
];

/** The craft claim, which used to open the homepage on its own. It still earns
 *  a place, just not the first one: how the apps feel matters less on first
 *  contact than what they refuse to do. */
export const CRAFT_LINE =
  'Playful, powerful, and precise experiences for the Apple ecosystem. Currently experimenting in the laboratory.';

/** The same three tiers in each language the homepage offers. Spanish keeps
 *  the order and the weight: the stake, then the proof, then the closer. */
export const MISSION_IN: Record<Language, { short: string; lines: string[]; craft: string }> = {
  en: { short: MISSION_SHORT, lines: MISSION, craft: CRAFT_LINE },
  es: {
    short: 'No podemos, no es que no queramos.',
    lines: [
      'Tu trabajo y tu vida viven en tu Mac.',
      'Retrac Labs crea apps para que ambos sigan siendo tuyos.',
      'No porque prometamos no mirar, sino porque las apps salen sin ninguna forma de que podamos hacerlo.',
    ],
    craft:
      'Experiencias divertidas, potentes y precisas para el ecosistema de Apple. Por ahora, experimentando en el laboratorio.',
  },
};

