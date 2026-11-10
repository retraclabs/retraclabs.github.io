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
    /** "Mac App Store" only for an app with nothing to offer an iPhone. */
    download: (macOnly: boolean) => (macOnly ? 'Download on the Mac App Store' : 'Download on the App Store'),
    askAboutThis: 'Ask About This',
    latestVersion: 'Latest Version',
    shippingToday: 'Shipping today.',
    nextVersion: 'Next Version',
    notShippedYet: 'In the lab. Not shipped yet.',
    /** Beside a version number, for an app on two platforms that numbers
     *  them separately. Keyed by `platform` in projects.ts. */
    platformNames: { macOS: 'Mac', iOS: 'iPhone and iPad' } as Record<string, string>,
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
    deviceGroup: 'Screenshot device',
    strip: (name: string) => `${name} screenshots`,
    viewer: (name: string) => `${name} screenshot`,
    comingIn: (version: string) => `Coming in ${version}`,
    /** Under the strip when its screenshots show a language the app doesn't
     *  have yet. `name` is that language's name in the page's language. */
    translationComing: (name: string, version: string) =>
      `These show the app in ${name}, which arrives in version ${version}.`,
  },
  /** The "Changes Regarding Your Data" card (components/SyncNotice.tsx). The
   *  words are Jarred's, from ~/Documents/RetracLabs/Sync Statement.md; change
   *  them there first. */
  syncNotice: {
    title: 'Changes Regarding Your Data',
    body:
      'Nothing changes unless you turn it on. Optional sync is coming to our apps, so your data can ' +
      'follow you between your iPhone, iPad, and Mac. Your data will be locked on your device before it ' +
      'reaches iCloud, and only your own devices will have the key. Apple will store it but can\'t read ' +
      'it, and neither can we, even if a court orders Apple to hand it over. Everything the apps do with ' +
      'your data still happens on your device.',
    howItWillWork: 'How It Will Work',
    gotIt: 'Got It',
    /** Beside the button while the explainer page is English only. English
     *  needs none. */
    explainerInEnglish: '',
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
    download: (macOnly: boolean) => (macOnly ? 'Descárgalo en el Mac App Store' : 'Descárgalo en el App Store'),
    askAboutThis: 'Escríbenos sobre esto',
    latestVersion: 'Versión actual',
    shippingToday: 'Disponible hoy.',
    nextVersion: 'Próxima versión',
    notShippedYet: 'En el laboratorio. Aún no está disponible.',
    platformNames: { macOS: 'Mac', iOS: 'iPhone y iPad' },
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
    deviceGroup: 'Dispositivo de las capturas',
    strip: (name: string) => `Capturas de ${name}`,
    viewer: (name: string) => `Captura de ${name}`,
    comingIn: (version: string) => `Próximamente en la ${version}`,
    translationComing: (name: string, version: string) =>
      `Estas capturas muestran la app en ${name}, que llega con la versión ${version}.`,
  },
  /* Draft from Sync Statement.md, not yet reviewed by Jarred (2026-11-06). */
  syncNotice: {
    title: 'Cambios sobre tus datos',
    body:
      'Nada cambia a menos que lo actives. La sincronización opcional llegará a nuestras apps, para que ' +
      'tus datos te acompañen entre tu iPhone, iPad y Mac. Tus datos quedarán bajo llave en tu ' +
      'dispositivo antes de llegar a iCloud, y solo tus propios dispositivos tendrán la llave. Apple los ' +
      'guardará, pero no podrá leerlos, y nosotros tampoco, aunque un juez le ordene a Apple ' +
      'entregarlos. Todo lo que las apps hacen con tus datos sigue ocurriendo en tu dispositivo.',
    howItWillWork: 'Cómo funcionará',
    gotIt: 'Entendido',
    // Remove once the explainer page is in Spanish.
    explainerInEnglish: 'en inglés',
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
