import { AudioLines, Hash, Mic, Scissors, Smartphone, Zap, type LucideIcon } from 'lucide-react';
import type { Language } from './languages';
import apunteTranscript from '../assets/apunte/transcript.webp';
import apunteLive from '../assets/apunte/live.webp';
import apunteSummary from '../assets/apunte/summary.webp';
import apunteReviewMode from '../assets/apunte/review-mode.webp';
import apunteSpeakerNames from '../assets/apunte/speaker-names.webp';
import apunteClip from '../assets/apunte/clip.webp';
import apunteLibrarySearch from '../assets/apunte/library-search.webp';
import apunteExportFormats from '../assets/apunte/export-formats.webp';
import apunteSkins from '../assets/apunte/skins.webp';
import apuntePrivacy from '../assets/apunte/privacy.webp';
import apunteTranscriptEs from '../assets/apunte/es/transcript.webp';
import apunteLiveEs from '../assets/apunte/es/live.webp';
import apunteSummaryEs from '../assets/apunte/es/summary.webp';
import apunteReviewModeEs from '../assets/apunte/es/review-mode.webp';
import apunteSpeakerNamesEs from '../assets/apunte/es/speaker-names.webp';
import apunteClipEs from '../assets/apunte/es/clip.webp';
import apunteLibrarySearchEs from '../assets/apunte/es/library-search.webp';
import apunteExportFormatsEs from '../assets/apunte/es/export-formats.webp';
import apunteSkinsEs from '../assets/apunte/es/skins.webp';
import apuntePrivacyEs from '../assets/apunte/es/privacy.webp';
import retazoMenuBar from '../assets/retazo/menu-bar.webp';
import retazoSkins from '../assets/retazo/skins.webp';
import retazoImageClips from '../assets/retazo/image-clips.webp';
import retazoShortcut from '../assets/retazo/shortcut.webp';
import retazoPrivacy from '../assets/retazo/privacy.webp';
import retazoHistory from '../assets/retazo/history.webp';
import retazoSnippets from '../assets/retazo/snippets.webp';
import amparoHome from '../assets/amparo/home.webp';
import amparoPrivacy from '../assets/amparo/privacy.webp';
import amparoInsights from '../assets/amparo/insights.webp';
import amparoPatterns from '../assets/amparo/patterns.webp';
import amparoCalendar from '../assets/amparo/calendar.webp';
import amparoLog from '../assets/amparo/log.webp';
import amparoMove from '../assets/amparo/move-to-a-new-iphone.webp';
import amparoHistory from '../assets/amparo/bring-your-history.webp';
import amparoIcons from '../assets/amparo/app-icons.webp';
import amparoHomeEs from '../assets/amparo/es/home.webp';
import amparoPrivacyEs from '../assets/amparo/es/privacy.webp';
import amparoInsightsEs from '../assets/amparo/es/insights.webp';
import amparoPatternsEs from '../assets/amparo/es/patterns.webp';
import amparoCalendarEs from '../assets/amparo/es/calendar.webp';
import amparoLogEs from '../assets/amparo/es/log.webp';
import amparoHistoryEs from '../assets/amparo/es/bring-your-history.webp';
import amparoIconsEs from '../assets/amparo/es/app-icons.webp';
import amparoMoveEs from '../assets/amparo/es/move-to-a-new-iphone.webp';

/** How wide a card sits in the six-column Lab grid. See LabSection.tsx. */
export type ProjectSpan = 'full' | 'two-thirds' | 'half' | 'third';

export type Project = {
  slug: string;
  /** Slugs a shipped app used before it was renamed. Old links still open its
   *  page, and the address bar switches to the current slug. See MAINTAINING.md
   *  → "A Note on Codenames". */
  formerSlugs?: string[];
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
  /** The version in which the app itself arrives in a language other than
   *  English, e.g. { es: '1.2' }. While `version.current` is older, that
   *  language's product page says the app is in English for now and that the
   *  language arrives in this version, and its screenshots say the same. Once
   *  `current` reaches it, both notes go away by themselves. A project with
   *  no entry for a language is English-only, and its page says so. */
  languageSince?: Partial<Record<Exclude<Language, 'en'>, string>>;
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
  /** The version the pictured feature arrives in, for a screenshot taken from
   *  a build that isn't out yet. While the project's `version.current` is
   *  older, the picture is tagged "Coming in 1.3"; once `current` reaches it,
   *  the tag goes away by itself. */
  since?: string;
  /** Pixel size of the file. Defaults to 1600 × 1000, the size Mac screenshots
   *  are exported at. Give the real size for anything else: a portrait iPhone
   *  screenshot gets a narrower frame so it does not tower over the page. */
  width?: number;
  height?: number;
  /** The same screenshot from the app running in another language, with alt
   *  text and a caption in that language. The gallery shows a language switch
   *  once any screenshot has one. See MAINTAINING.md → "Screenshots in Other
   *  Languages". */
  translations?: Partial<Record<Exclude<Language, 'en'>, ScreenshotTranslation>>;
};

export type ScreenshotTranslation = {
  /** The picture from the app running in this language. Leave it out for an
   *  app that isn't in this language yet: the English picture then shows with
   *  this alt text and caption, which describe it in this language. */
  src?: string;
  alt: string;
  caption: string;
  /** Only when this file's size differs from the English one's. */
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
    slug: 'hash-drop',
    name: 'Hash Drop',
    platform: 'macOS',
    status: 'In Development',
    accent: 'green',
    accentText: 'text-green-400',
    icon: Hash,
    span: 'half',
    teaser: 'Proves a download is exactly what its publisher released, checking hashes, signatures, and notarization on your Mac.',
    summary:
      'Know the file you have is the file you meant to get. No uploads, no account, no network.',
    description:
      'Hash Drop checks that a download is exactly what its publisher released. Drop in a file, paste the hash ' +
      'from the publisher\'s site, and get a plain Match or No Match. It reads checksum lists like SHA256SUMS, and it ' +
      'spots a “PDF” that is really a program. Hash Drop Pro verifies PGP, minisign, and SSH signatures, shows who ' +
      'signed an app and whether Apple notarized it, and checks new downloads as they land.\n\n' +
      'It ships without the outgoing-network entitlement, so the app\'s own code cannot open a network connection. ' +
      'You don\'t have to take that on faith: inspect the signed app yourself with codesign. Verifying files is ' +
      'free, and Pro is a one-time purchase with no subscription. Looking for beta testers.',
    highlights: [
      'A plain answer: paste the publisher\'s hash and get Match or No Match, with MD5, SHA-1, SHA-256, SHA-512, and SHA-3.',
      'Proof of who made it: signed checksum lists (PGP, minisign, and SSH), code signatures, and notarization, all checked on your Mac.',
      'No network access, verifiable: the app ships without the network entitlement, so it cannot upload your files. Check it yourself in Terminal.',
    ],
    nextSteps: [
      'Gather feedback from beta testers, especially on any verdict that reads as unclear',
      'Tune Downloads Guard and Folder Monitor notifications around how testers use them',
      'Launch on the Mac App Store, free with a one-time Pro upgrade',
    ],
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
    teaser: 'Turns audio, video, and live conversations into text, entirely on your Mac.',
    appStoreUrl: 'https://apps.apple.com/us/app/apunte/id6802142206?mt=12',
    summary:
      'Transcription that never leaves your Mac. Your recordings, your calls, your words. No uploads, no account, no network.',
    description:
      'Apunte turns audio and video into accurate, timestamped transcripts entirely on your Mac. ' +
      'Drop in a voice memo, an interview, a lecture, a video — if macOS can play it, Apunte can read it. ' +
      'Or transcribe live: the room you are in, or a call or meeting on headphones, with both sides in one transcript.\n\n' +
      'It ships without the outgoing-network entitlement, so the app\'s own code cannot open a network ' +
      'connection. You don\'t have to take that on faith. Inspect the signed app yourself with codesign. ' +
      'Transcription is free; Premium adds speaker names, summaries, library-wide search, live transcription, ' +
      'and formatted export, as a subscription or a one-time lifetime purchase. The app is in English and Spanish.',
    highlights: [
      'No network access, verifiable: the app ships without the network entitlement, so it cannot upload your audio. Check it yourself in Terminal.',
      'Accurate on real recordings: on a 64-minute, two-person session it captured the same content as MacWhisper, keeping hesitations and false starts rather than smoothing them away.',
      'Live, for the room or the call: words appear as people speak, and a call on headphones puts both sides in one transcript. The recording stays on your Mac so you can check any line against it.',
      'A free tier that\'s actually complete: transcription, editing, playback, and plain-text, timestamped, and JSON export are free. JSON carries everything, so your work is never locked in.',
    ],
    version: {
      current: '1.2',
      currentFeatures: [
        'The whole app in Spanish, following your Mac\'s language',
        'Live transcription from the microphone, or from a call or meeting on headphones with both sides in one transcript',
        'Speaker names, on-device summaries in the transcript\'s language, and search across every transcript',
        'Review mode, which marks the lines the recogniser was unsure of and counts them',
        'Export to plain text, timestamped text, JSON, SubRip, WebVTT, CSV, Markdown, HTML, PDF, and Word',
        'Select several transcripts at once to delete them, or to erase their audio, together',
        'Redeem an offer code from inside the app',
      ],
      next: '1.3',
      nextFeatures: [
        'Export a recording, free, or a clip of any lines',
        'Speakers in their own colors, and calls that label themselves: Me and Others',
        'A lock with Touch ID or your Mac\'s password',
        'Five looks, among them Steno, Apunte\'s own',
      ],
    },
    price: 'Free, with Premium as a subscription or a one-time purchase',
    requires: 'macOS 26 or later',
    languageSince: { es: '1.2' },
    screenshots: [
      {
        src: apunteTranscript,
        alt: 'Apunte\'s main window: a meeting transcript with a timestamp on every line, the library of recordings in the sidebar, and the player along the bottom.',
        caption: 'Every line timestamped, and transcribed entirely on your Mac.',
        translations: {
          es: {
            src: apunteTranscriptEs,
            alt: 'La ventana principal de Apunte: la transcripción de una reunión con una marca de tiempo en cada línea, la biblioteca de grabaciones en la barra lateral y el reproductor abajo.',
            caption: 'Cada línea con su marca de tiempo, transcrita por completo en tu Mac.',
          },
        },
      },
      {
        src: apunteLive,
        alt: 'A live session in call mode: the header reads Listening, seven lines have arrived, and the bar shows two level meters, one for the microphone and one for other apps.',
        caption: 'Live, from the microphone or from a call on headphones, with both sides in one transcript.',
        premium: true,
        translations: {
          es: {
            src: apunteLiveEs,
            alt: 'Una sesión en vivo en modo de llamada: el encabezado dice Escuchando, han llegado siete líneas y la barra muestra dos medidores de nivel, uno para el micrófono y otro para las demás apps.',
            caption: 'En vivo, desde el micrófono o desde una llamada con audífonos, con ambos lados en una sola transcripción.',
          },
        },
      },
      {
        src: apunteSummary,
        alt: 'A summary of a meeting recording: an overview paragraph, key points, and action items, under the minutes they cover.',
        caption: 'An overview, key points, and action items for each part of a recording, generated on your Mac.',
        premium: true,
        translations: {
          es: {
            src: apunteSummaryEs,
            alt: 'El resumen de la grabación de una reunión: un párrafo general, puntos clave y tareas pendientes, bajo los minutos que abarcan.',
            caption: 'Un resumen general, puntos clave y tareas pendientes por cada parte de una grabación, generados en tu Mac.',
          },
        },
      },
      {
        src: apunteReviewMode,
        alt: 'The same transcript in review mode, with three uncertain lines underlined and "3 to check" in the toolbar.',
        caption: 'Review mode marks the lines Apunte was unsure of, so you check those instead of rereading everything.',
        translations: {
          es: {
            src: apunteReviewModeEs,
            alt: 'La misma transcripción en modo de revisión, con tres líneas dudosas subrayadas y "3 por revisar" en la barra de herramientas.',
            caption: 'El modo de revisión marca las líneas de las que Apunte no estaba seguro, para que revises solo esas en lugar de releerlo todo.',
          },
        },
      },
      {
        src: apunteSpeakerNames,
        alt: 'An interview transcript with each speaker\'s name above their lines, and each speaker in their own color.',
        caption: 'Label who is speaking on any line. Names carry into every export.',
        premium: true,
        translations: {
          es: {
            src: apunteSpeakerNamesEs,
            alt: 'La transcripción de una entrevista con el nombre de cada hablante sobre sus líneas, y cada hablante en su propio color.',
            caption: 'Indica quién habla en cualquier línea. Los nombres van en todas las exportaciones.',
          },
        },
      },
      {
        src: apunteClip,
        alt: 'Three lines of a meeting transcript selected, and a bar offering to export their audio as a clip.',
        caption: 'Select any lines and export just their audio as a clip. The whole recording exports free.',
        premium: true,
        since: '1.3',
        width: 1600,
        height: 788,
        translations: {
          es: {
            src: apunteClipEs,
            alt: 'Tres líneas de la transcripción de una reunión seleccionadas, y una barra que ofrece exportar su audio como clip.',
            caption: 'Selecciona las líneas que quieras y exporta solo su audio como clip. La grabación completa se exporta gratis.',
          },
        },
      },
      {
        src: apunteLibrarySearch,
        alt: 'Search results for the word memory across the library, each with its timestamp.',
        caption: 'Find a phrase across every transcript you have, down to the line.',
        premium: true,
        translations: {
          es: {
            src: apunteLibrarySearchEs,
            alt: 'Resultados de búsqueda de la palabra memoria en toda la biblioteca, cada uno con su marca de tiempo.',
            caption: 'Encuentra una frase en todas tus transcripciones, hasta la línea exacta.',
          },
        },
      },
      {
        src: apunteExportFormats,
        alt: 'The export menu: plain text, timestamped text, and JSON listed as included, the recording under Audio, then SubRip, WebVTT, CSV, Markdown, HTML, PDF, and Word as more formats.',
        caption: 'Plain text, timestamped text, and JSON export are free. SRT, WebVTT, CSV, Markdown, HTML, PDF, and Word come with Premium.',
        translations: {
          es: {
            src: apunteExportFormatsEs,
            alt: 'El menú Exportar: texto sin formato, texto con marcas de tiempo y JSON como incluidos, la grabación en Audio, y luego SubRip, WebVTT, CSV, Markdown, HTML, PDF y Word como más formatos.',
            caption: 'Exportar a texto sin formato, texto con marcas de tiempo y JSON es gratis. SRT, WebVTT, CSV, Markdown, HTML, PDF y Word vienen con Premium.',
          },
        },
      },
      {
        src: apunteSkins,
        alt: 'The interview in Steno: pale green paper, a red rule between the timestamps and the text, and speaker names in deep colors.',
        caption: 'Five looks, among them Steno, a stenographer\'s pad that is Apunte\'s own.',
        since: '1.3',
        translations: {
          es: {
            src: apunteSkinsEs,
            alt: 'La entrevista en Taquigrafía: papel verde claro, una línea roja entre las marcas de tiempo y el texto, y los nombres de los hablantes en colores intensos.',
            caption: 'Cinco estilos, entre ellos Taquigrafía, una libreta de taquígrafo propia de Apunte.',
          },
        },
      },
      {
        src: apuntePrivacy,
        alt: 'The Privacy pane: Apunte makes no network calls, with the codesign command that verifies it, a note that stored audio is encrypted with a key in the Secure Enclave, and the switch that locks Apunte with Touch ID or your password.',
        caption: 'No network entitlement, and the command that proves it.',
        width: 1120,
        height: 1416,
        translations: {
          es: {
            src: apuntePrivacyEs,
            alt: 'El panel Privacidad: Apunte no hace llamadas de red, con el comando codesign que lo comprueba, una nota de que el audio guardado se cifra con una clave en el Secure Enclave, y el interruptor que bloquea Apunte con Touch ID o tu contraseña.',
            caption: 'Sin permiso de red, y el comando que lo demuestra.',
          },
        },
      },
    ],
  },
  {
    slug: 'retazo',
    formerSlugs: ['snippystack'],
    name: 'Retazo',
    platform: 'macOS',
    status: 'Available',
    accent: 'cyan',
    accentText: 'text-cyan-400',
    icon: Scissors,
    span: 'third',
    teaser: 'Clipboard history that lives in your menu bar.',
    summary:
      'Your clipboard, with a memory. Searchable screenshots, a global shortcut, three skins, and privacy built in. Everything stays on your Mac.',
    description:
      'Retazo keeps everything you copy and puts it one click or one shortcut away. Press ⌃⌘V in any app, pick a ' +
      'clip, and ⌘V pastes it right where you were. Screenshots are saved with the text inside them, read on your ' +
      'Mac, so a search finds them. Snippets hold the text you retype, and they work in the Shortcuts app too.\n\n' +
      'Password manager copies are skipped, one-time codes fade after five minutes, and tracking tags are stripped ' +
      'from links. It ships without the outgoing-network entitlement, so the app\'s own code cannot open a network ' +
      'connection. You don\'t have to take that on faith: inspect the signed app yourself with codesign. One ' +
      'purchase, no subscription.\n\n' +
      'Retazo, Spanish for a scrap or snippet, was called Snippystack until version 2.0. Same app, new name, and ' +
      'everything you saved came along.',
    highlights: [
      'One shortcut, any app: press ⌃⌘V, pick a clip, and paste it where you were. No Accessibility or Input Monitoring permission needed.',
      'Screenshots you can search: text in copied images is read on your Mac by Apple\'s Vision framework, and never uploaded.',
      'No network access, verifiable: the app ships without the network entitlement, so it cannot send your clipboard anywhere. Check it yourself in Terminal.',
    ],
    version: {
      current: '2.0',
      currentFeatures: [
        'Clipboard history in your menu bar: text, links, code, and images, each one click from your clipboard again',
        'A global shortcut, ⌃⌘V, that opens your clips from any app with no special permissions',
        'Image clips with searchable text, read on your Mac by Apple\'s Vision framework',
        'Snippets for text you retype, with editing, Export and Import, and Shortcuts actions',
        'Copy As (case, Base64, pretty JSON, and more), and Copy Together for several clips at once',
        'A History window that filters by kind or by the app each clip came from',
        'Three skins (Glass, Tech, and Notepad), each with its own light and dark design, plus Liquid Glass on macOS 26',
        'Password manager copies skipped, Pause Capture, Auto-Forget, one-time codes that fade, and tracking tags removed from links',
      ],
      next: '2.1',
      nextFeatures: [
        'The Clothesline: screenshots and clips hang on a line across the top of your screen, above every window, ready to drag into any app',
        'Drag clips straight from the panel and the History window into chats, documents, and uploads',
        'Hang any clip or snippet yourself, or let new screenshots hang on their own, including ones saved to a folder you choose',
      ],
    },
    appStoreUrl: 'https://apps.apple.com/us/app/retazo-clipboard-history/id6765705718?mt=12',
    price: '$2.99',
    requires: 'macOS 14 or later',
    screenshots: [
      {
        src: retazoMenuBar,
        alt: 'Retazo\'s panel open below the scissors icon in the menu bar, listing recent clips: a pinned email address, a one-time code, meeting notes, links, a screenshot, and a line of code, each with the app it came from.',
        caption: 'Everything you copy, kept in the menu bar. Click a clip, and ⌘V pastes it where you were.',
        translations: {
          es: {
            alt: 'El panel de Retazo abierto bajo el ícono de tijeras en la barra de menús, con los recortes recientes: un correo electrónico fijado, un código de un solo uso, notas de una reunión, enlaces, una captura de pantalla y una línea de código, cada uno con la app de la que vino.',
            caption: 'Todo lo que copias, guardado en la barra de menús. Haz clic en un recorte y ⌘V lo pega donde estabas.',
          },
        },
      },
      {
        src: retazoSkins,
        alt: 'The same list of clips in three skins side by side: frosted Liquid Glass, Tech in green on black, and Notepad on ruled paper with a highlighter.',
        caption: 'Glass, Tech, and Notepad, each with its own light and dark design. Switch any time in Settings.',
        translations: {
          es: {
            alt: 'La misma lista de recortes en tres estilos, uno al lado del otro: Liquid Glass esmerilado, Tech en verde sobre negro y Notepad sobre papel rayado con un resaltador.',
            caption: 'Glass, Tech y Notepad, cada uno con su diseño claro y oscuro. Cámbialos cuando quieras en la configuración.',
          },
        },
      },
      {
        src: retazoImageClips,
        alt: 'The History window with a screenshot of a Q3 Roadmap slide selected. The detail pane shows the image and, beneath it, the text read from it.',
        caption: 'Text in copied images is read on your Mac, so a search finds that one screenshot.',
        translations: {
          es: {
            alt: 'La ventana de historial con la captura de una diapositiva de Q3 Roadmap seleccionada. El panel de detalle muestra la imagen y, debajo, el texto leído de ella.',
            caption: 'El texto de las imágenes copiadas se lee en tu Mac, así que una búsqueda encuentra esa captura.',
          },
        },
      },
      {
        src: retazoShortcut,
        alt: 'Retazo\'s welcome screen in the Tech skin, showing the keys Control, Command, and V under the line Always One Shortcut Away.',
        caption: 'Press ⌃⌘V in any app to open your clips. No Accessibility or Input Monitoring permission needed.',
        translations: {
          es: {
            alt: 'La pantalla de bienvenida de Retazo en el estilo Tech, con las teclas Control, Comando y V bajo la frase Always One Shortcut Away.',
            caption: 'Presiona ⌃⌘V en cualquier app para abrir tus recortes. No necesita permisos de Accesibilidad ni de Monitoreo de entrada.',
          },
        },
      },
      {
        src: retazoPrivacy,
        alt: 'Retazo\'s Privacy settings in the Notepad skin: Skip Passwords and Hidden Copies, Forget One-Time Codes, and Remove Trackers From Links are checked, above buttons to pause capture and an Auto-Forget menu.',
        caption: 'Password manager copies are skipped, one-time codes fade after five minutes, and you can pause capture any time.',
        translations: {
          es: {
            alt: 'La configuración de privacidad de Retazo en el estilo Notepad: Skip Passwords and Hidden Copies, Forget One-Time Codes y Remove Trackers From Links están marcadas, sobre los botones para pausar la captura y un menú de Auto-Forget.',
            caption: 'Las copias de gestores de contraseñas no se guardan, los códigos de un solo uso desaparecen a los cinco minutos y puedes pausar la captura cuando quieras.',
          },
        },
      },
      {
        src: retazoHistory,
        alt: 'The History window in the Tech skin with three clips selected, and buttons to Copy Together, Pin All, or Delete them.',
        caption: 'Filter by kind or by the app a clip came from, then copy several together, or right-click for Copy As.',
        translations: {
          es: {
            alt: 'La ventana de historial en el estilo Tech con tres recortes seleccionados y botones para Copy Together, Pin All o Delete.',
            caption: 'Filtra por tipo o por la app de la que vino un recorte, copia varios juntos o haz clic derecho para Copy As.',
          },
        },
      },
      {
        src: retazoSnippets,
        alt: 'The Snippets tab listing saved text: an email signature, a studio address, a thank-you reply, a bug report template, an out-of-office message, and a weekly check-in.',
        caption: 'Save the text you retype, edit it any time, and copy it from the Shortcuts app, too.',
        translations: {
          es: {
            alt: 'La pestaña Snippets con texto guardado: una firma de correo, la dirección de un estudio, una respuesta de agradecimiento, una plantilla de reporte de errores, un mensaje de fuera de la oficina y un seguimiento semanal.',
            caption: 'Guarda el texto que escribes una y otra vez, edítalo cuando quieras y cópialo también desde la app Atajos.',
          },
        },
      },
    ],
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
      current: '1.1',
      currentFeatures: [
        'Kept out of iCloud Backup by default, so your data stays on your iPhone unless you choose otherwise',
        'Move to a New iPhone: an encrypted, one-time-code transfer by AirDrop, with no cloud in between',
        'Bring your history from Apple Health, Clue, or Flo, read on your iPhone and never uploaded',
        'A Doctor Visit Summary: a PDF of your cycles, patterns, and temperatures to share with a clinician',
        'Your patterns: when your symptoms usually arrive, with an optional heads-up the morning before',
        'Discreet Mode for notifications and the Lock Screen, plus app icons that don\'t look like a cycle tracker',
        'Keep My History: automatically delete entries older than a period you choose',
        'A Quick Log widget for your period and symptoms, right on the Home Screen',
        'Rebuilt predictions with confidence levels and ranges, and ovulation confirmed by temperature',
        'A fresh look: colors that follow your cycle, playful animations, and support for larger text',
        'A new app icon, with dark, tinted, and clear versions for your Home Screen',
        'Siri keeps quiet about your cycle while your iPhone is locked',
      ],
      next: '1.2',
      nextFeatures: [
        'Amparo in Spanish: every screen, the widgets, and Siri',
        'Your patterns up close: each cycle, what tends to come with a symptom, and your mood on those days',
        'Next-period timing from your confirmed temperature rise, worked out on your iPhone',
        'Four looks: Midnight, Daylight, Notepad, and Plain, with widgets and the Live Activity to match',
        'A control for Control Center, the Lock Screen, and the Action button',
        'Widgets made for StandBy',
        'Better VoiceOver, Voice Control, and larger-text support, with charts you can hear',
        'Send Feedback from Settings, through your own Mail app',
      ],
    },
    appStoreUrl: 'https://apps.apple.com/us/app/amparo/id6765911709',
    price: '$4.99',
    requires: 'iOS 17.6 or later',
    languageSince: { es: '1.2' },
    screenshots: [
      {
        src: amparoHome,
        alt: 'Amparo\'s Home screen: a ring showing cycle day 12 of 29 in the follicular phase, cards for the next period in 18 days and the fertile window, two symptoms coming up, and a Period Started button.',
        caption: 'Where you are, when your period\'s due, and what\'s coming up, all from your own logs.',
        translations: {
          es: {
            src: amparoHomeEs,
            alt: 'La pantalla Inicio de Amparo: un anillo que muestra el día 12 de 29 en la fase folicular, tarjetas con el próximo periodo en 18 días y la ventana fértil, dos síntomas que se acercan y un botón Empezó mi periodo.',
            caption: 'Dónde estás, cuándo llega tu periodo y lo que viene, todo a partir de tus propios registros.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoPrivacy,
        alt: 'Settings opens with Only on This iPhone, saying the data never leaves the phone, then reminders, App Lock, Discreet Mode, and Include in iCloud Backup, which is off.',
        caption: 'No account, no cloud, and no tracking. Your data even stays out of iCloud Backup unless you choose.',
        translations: {
          es: {
            src: amparoPrivacyEs,
            alt: 'Configuración abre con Solo en este iPhone, que dice que los datos nunca salen del teléfono, y sigue con los cuatro estilos de Apariencia y los recordatorios.',
            caption: 'Sin cuenta, sin nube y sin rastreo. Tus datos ni siquiera van al respaldo de iCloud, a menos que tú lo elijas.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoPatterns,
        alt: 'Your Patterns lists six symptoms and when each usually arrives, such as bloating 2 to 4 days before a period in 5 of the last 6 cycles, above a temperature chart marking the rise after ovulation.',
        caption: 'When your symptoms usually arrive, learned from your own logs, plus the temperature rise after ovulation.',
        translations: {
          es: {
            src: amparoPatternsEs,
            alt: 'Tus patrones enumera seis síntomas y cuándo suele llegar cada uno, como la hinchazón de 2 a 4 días antes del periodo en 5 de los últimos 6 ciclos, sobre una gráfica de temperatura que marca el aumento después de la ovulación.',
            caption: 'Cuándo suelen llegar tus síntomas, aprendido de tus propios registros, y el aumento de temperatura después de la ovulación.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoInsights,
        alt: 'Insights: an average cycle of 29 days, an average period of 5 days, and 153 days logged, then the Doctor Visit Summary and charts of basal body temperature and cycle length.',
        caption: 'Cycle lengths and temperatures over time, plus a summary PDF to share with your doctor.',
        translations: {
          es: {
            src: amparoInsightsEs,
            alt: 'Análisis: un ciclo promedio de 29 días, un periodo promedio de 5 días y 153 días registrados, luego el Resumen para la consulta médica y gráficas de temperatura basal y duración del ciclo.',
            caption: 'La duración de tus ciclos y tus temperaturas a lo largo del tiempo, y un PDF de resumen para compartir con tu médico.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoCalendar,
        alt: 'The October calendar with fertile days, predicted period days, and logged days marked, and the symptoms and moods logged on October 4 below it.',
        caption: 'Periods, predictions, and the days you\'ve logged, with every detail a tap away.',
        translations: {
          es: {
            src: amparoCalendarEs,
            alt: 'El calendario de octubre con los días fértiles, los días de periodo previstos y los días registrados marcados, y debajo los síntomas y el ánimo registrados el 5 de octubre.',
            caption: 'Periodos, predicciones y los días que registraste, con cada detalle a un toque.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoLog,
        alt: 'Logging October 4: flow, symptoms grouped into pain, digestion, skin, energy, and mental, two moods selected, energy set to High, and body temperature.',
        caption: 'Flow, symptoms, moods, energy, and temperature, all on one screen.',
        translations: {
          es: {
            src: amparoLogEs,
            alt: 'El registro del 5 de octubre: flujo, síntomas agrupados en dolor, digestión, piel, energía y mente, dos estados de ánimo seleccionados, energía en Alta y temperatura corporal.',
            caption: 'Flujo, síntomas, ánimo, energía y temperatura, todo en una sola pantalla.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoMove,
        alt: 'Move to a New iPhone, in three steps: seal the data with a one-time code, send it by AirDrop, and unlock it on the new iPhone.',
        caption: 'Switch phones without the cloud. Your data goes straight to your new iPhone, locked with a one-time code.',
        translations: {
          es: {
            src: amparoMoveEs,
            alt: 'Pasar a un nuevo iPhone, en tres pasos: sellar los datos con un código de un solo uso, enviarlos por AirDrop y desbloquearlos en el nuevo iPhone.',
            caption: 'Cambia de teléfono sin la nube. Tus datos van directo a tu iPhone nuevo, protegidos con un código de un solo uso.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoHistory,
        alt: 'Bring Your History, with steps for exporting from Apple Health, Clue, and Flo, and a Choose a File button.',
        caption: 'Bring your past periods from Apple Health, Clue, or Flo. The file is read on your iPhone and never uploaded.',
        translations: {
          es: {
            src: amparoHistoryEs,
            alt: 'Trae tu historial, con los pasos para exportar desde la app Salud, Clue y Flo, y un botón Elegir un archivo.',
            caption: 'Trae tus periodos anteriores desde la app Salud de Apple, Clue o Flo. El archivo se lee en tu iPhone y nunca se sube.',
          },
        },
        width: 737,
        height: 1600,
      },
      {
        src: amparoIcons,
        alt: 'The App Icon picker with four icons: the Amparo drop, a crescent moon called Dusk, a leaf, and a ring called Glow.',
        caption: 'Pick a Home Screen icon that doesn\'t look like a cycle tracker.',
        translations: {
          es: {
            src: amparoIconsEs,
            alt: 'El selector Icono de la app con cuatro iconos: la gota de Amparo, una luna creciente llamada Atardecer, una hoja y un anillo llamado Resplandor.',
            caption: 'Elige un icono para la pantalla de inicio que no parezca de una app del ciclo.',
          },
        },
        width: 737,
        height: 1600,
      },
    ],
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
  const project = projects.find(
    (item) => item.slug === slug || (slug !== null && item.formerSlugs?.includes(slug)),
  );
  return project && isAnnounced(project) ? project : undefined;
};
