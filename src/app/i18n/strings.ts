import type { Language } from '../data/languages';

/* Every piece of interface text the site shows in more than one language: the
   menu bar, the homepage, product pages, the screenshot gallery, and the
   footer. Product copy itself is in data/projects.es.ts.

   English is the source. Spanish follows Spanish style rather than English:
   headings in sentence case ("Próxima versión", not "Próxima Versión"), no
   comma before "y" in a list, and the Mexican usage the apps' own Spanish uses
   (video, audífonos, tú). See MAINTAINING.md → "Languages". */

const en = {
  /** Each language's name, written in this language. */
  languageNames: { en: 'English', es: 'Spanish' } as Record<Language, string>,
  menu: {
    lab: 'LAB',
    about: 'ABOUT',
    beta: 'BETA',
    contact: 'CONTACT',
    language: 'Language',
  },
  theme: {
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
  },
  hero: {
    cue: 'Specimens Below',
  },
  home: {
    visitLab: 'Visit the Lab',
    earlyAccess: 'Get Early Access',
    currentProjects: 'Current Projects',
    inThe: 'In the',
    lab: 'Lab',
  },
  /** Keyed by the English status in projects.ts. */
  status: {
    Available: 'Available',
    'In Development': 'In Development',
    Testing: 'Testing',
    'Beta Testing': 'Beta Testing',
  } as Record<string, string>,
  project: {
    backToLab: 'Back to Lab',
    overview: 'Overview',
    currentFocus: 'Current Focus',
    price: 'Price',
    requires: 'Requires',
    download: (platform: string) => (platform === 'iOS' ? 'Download on the App Store' : 'Download on the Mac App Store'),
    askAboutThis: 'Ask About This',
    latestVersion: 'Latest Version',
    shippingToday: 'Shipping today.',
    nextVersion: 'Next Version',
    notShippedYet: 'In the lab. Not shipped yet.',
    whatItIs: 'What It Is',
    comingNext: 'Coming Next',
    nextSteps: 'Next Steps',
    labNotes: 'Lab Notes',
    readNote: 'Read the Note',
    moreFrom: 'More From Retrac Labs',
    otherExperiments: 'Other Experiments',
    /** Beside a lab note that hasn't been translated. English needs none. */
    inEnglish: '',
    /** Under the download button when the app isn't in the page's language
     *  yet. English pages never need it. */
    appOnlyInEnglish: '',
    appLanguageComing: (_version: string) => '',
  },
  gallery: {
    heading: 'Screenshots',
    previous: 'Previous Screenshot',
    next: 'Next Screenshot',
    close: 'Close',
    enlarge: 'Enlarge: ',
    languageGroup: 'Screenshot language',
    strip: (name: string) => `${name} screenshots`,
    viewer: (name: string) => `${name} screenshot`,
    comingIn: (version: string) => `Coming in ${version}`,
    /** Under the strip when its screenshots show a language the app doesn't
     *  have yet. `name` is that language's name in the page's language. */
    translationComing: (name: string, version: string) =>
      `These show the app in ${name}, which arrives in version ${version}.`,
  },
  /** Above a page that hasn't been translated. English needs none. */
  englishOnly: '',
  footer: {
    rights: 'ALL RIGHTS RESERVED',
    about: 'About',
    becomeLabRat: 'Become a Lab Rat',
    privacy: 'Privacy Policy',
    email: 'Email',
  },
};

export type Strings = typeof en;

const es: Strings = {
  languageNames: { en: 'inglés', es: 'español' },
  menu: {
    lab: 'LAB',
    about: 'ACERCA',
    beta: 'BETA',
    contact: 'CONTACTO',
    language: 'Idioma',
  },
  theme: {
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
  },
  hero: {
    cue: 'Especímenes abajo',
  },
  home: {
    visitLab: 'Visita el laboratorio',
    earlyAccess: 'Acceso anticipado',
    currentProjects: 'Proyectos actuales',
    inThe: 'En el',
    lab: 'laboratorio',
  },
  status: {
    Available: 'Disponible',
    'In Development': 'En desarrollo',
    Testing: 'En pruebas',
    'Beta Testing': 'En beta',
  },
  project: {
    backToLab: 'Volver al laboratorio',
    overview: 'Descripción general',
    currentFocus: 'Enfoque actual',
    price: 'Precio',
    requires: 'Requiere',
    download: (platform: string) => (platform === 'iOS' ? 'Descárgalo en el App Store' : 'Descárgalo en el Mac App Store'),
    askAboutThis: 'Escríbenos sobre esto',
    latestVersion: 'Versión actual',
    shippingToday: 'Disponible hoy.',
    nextVersion: 'Próxima versión',
    notShippedYet: 'En el laboratorio. Aún no está disponible.',
    whatItIs: 'Qué es',
    comingNext: 'Lo que viene',
    nextSteps: 'Próximos pasos',
    labNotes: 'Notas del laboratorio',
    readNote: 'Leer la nota',
    moreFrom: 'Más de Retrac Labs',
    otherExperiments: 'Otros experimentos',
    inEnglish: 'en inglés',
    appOnlyInEnglish: 'Por ahora, la app solo está en inglés.',
    appLanguageComing: (version: string) => `Por ahora, la app está en inglés. El español llega con la versión ${version}.`,
  },
  gallery: {
    heading: 'Capturas de pantalla',
    previous: 'Captura anterior',
    next: 'Captura siguiente',
    close: 'Cerrar',
    enlarge: 'Ampliar: ',
    languageGroup: 'Idioma de las capturas',
    strip: (name: string) => `Capturas de ${name}`,
    viewer: (name: string) => `Captura de ${name}`,
    comingIn: (version: string) => `Próximamente en la ${version}`,
    translationComing: (name: string, version: string) =>
      `Estas capturas muestran la app en ${name}, que llega con la versión ${version}.`,
  },
  englishOnly: 'Esta página solo está disponible en inglés.',
  footer: {
    rights: 'TODOS LOS DERECHOS RESERVADOS',
    about: 'Acerca de',
    becomeLabRat: 'Hazte rata de laboratorio',
    privacy: 'Política de privacidad',
    email: 'Correo',
  },
};

export const STRINGS: Record<Language, Strings> = { en, es };
