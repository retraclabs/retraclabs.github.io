/* Spanish copy for the projects in projects.ts, keyed by slug.

   Anything left out shows in English, so a translation can be partial and the
   page still works. Two rules keep the Spanish from going stale:

   - Text that changes with a release (the version lists, and anything else
     that changes with them) goes under `releases`, keyed by the version it was
     written for. It is used only while that version is the project's
     `version.current`, so bumping the English to a new version shows English
     there until the Spanish catches up, never last release's list.
   - When you change English text elsewhere, change it here too, or delete the
     Spanish field so the English shows.

   Never give an unannounced project a `summary` here: a summary is what
   announces a project, in any language.

   Spanish style: sentence case, no comma before "y", and the Mexican usage the
   apps themselves use. See MAINTAINING.md → "Languages". */

export type ProjectText = {
  teaser?: string;
  summary?: string;
  description?: string;
  highlights?: string[];
  nextSteps?: string[];
  price?: string;
  requires?: string;
  version?: { currentFeatures: string[]; nextFeatures: string[] };
};

export type ProjectTranslation = ProjectText & {
  releases?: Record<string, ProjectText>;
};

export const PROJECTS_ES: Record<string, ProjectTranslation> = {
  'hash-drop': {
    teaser:
      'Comprueba que una descarga sea exactamente lo que publicó su autor, verificando hashes, firmas y notarización en tu Mac.',
    summary:
      'Ten la certeza de que el archivo que tienes es el que querías descargar. Sin subidas, sin cuenta, sin red.',
    description:
      'Hash Drop comprueba que una descarga sea exactamente lo que publicó su autor. Suelta un archivo, pega el hash ' +
      'del sitio del autor y obtén una respuesta clara: coincide o no coincide. Lee listas de sumas de verificación ' +
      'como SHA256SUMS y detecta un “PDF” que en realidad es un programa. Hash Drop Pro verifica firmas PGP, minisign ' +
      'y SSH, muestra quién firmó una app y si Apple la notarizó, y revisa las descargas nuevas en cuanto llegan.\n\n' +
      'No tiene el permiso de red saliente, así que el propio código de la app no puede abrir una conexión de red. ' +
      'No tienes que creerlo a ciegas: compruébalo en la app firmada con codesign. Verificar archivos es gratis, y ' +
      'Pro es una compra única, sin suscripción. Buscamos testers para la beta.',
    highlights: [
      'Una respuesta clara: pega el hash del autor y obtén coincide o no coincide, con MD5, SHA-1, SHA-256, SHA-512 y SHA-3.',
      'Prueba de quién la hizo: listas de sumas de verificación firmadas (PGP, minisign y SSH), firmas de código y notarización, todo verificado en tu Mac.',
      'Sin acceso a la red, y puedes comprobarlo: la app no tiene el permiso de red, así que no puede subir tus archivos. Verifícalo en Terminal.',
    ],
    nextSteps: [
      'Reunir los comentarios de quienes prueban la beta, sobre todo de cualquier resultado que no quede claro',
      'Ajustar las notificaciones de Downloads Guard y Folder Monitor según cómo las usan los testers',
      'Lanzarla en el Mac App Store, gratis y con una mejora a Pro de pago único',
    ],
  },

  'project-deacon': {
    teaser: 'Prepara tu Mac para cada parte de tu día: abre las apps, archivos y enlaces que necesitas y oculta el resto.',
  },

  'project-cobra': {
    teaser: 'Notas de sesión privadas para profesionales clínicos, redactadas en tu Mac.',
  },

  apunte: {
    teaser: 'Convierte audio, video y conversaciones en vivo en texto, por completo en tu Mac.',
    summary:
      'Transcripción que nunca sale de tu Mac. Tus grabaciones, tus llamadas, tus palabras. Sin subidas, sin cuenta, sin red.',
    description:
      'Apunte convierte audio y video en transcripciones precisas y con marcas de tiempo, por completo en tu Mac. ' +
      'Suelta una nota de voz, una entrevista, una clase o un video: si macOS puede reproducirlo, Apunte puede ' +
      'transcribirlo. O transcribe en vivo: la sala en la que estás, o una llamada o reunión con audífonos, con ambos ' +
      'lados en una sola transcripción.\n\n' +
      'No tiene el permiso de red saliente, así que el propio código de la app no puede abrir una conexión de red. ' +
      'No tienes que creerlo a ciegas: compruébalo en la app firmada con codesign. La transcripción es gratuita; ' +
      'Premium agrega nombres de hablantes, resúmenes, búsqueda en toda la biblioteca, transcripción en vivo y ' +
      'exportación con formato, como suscripción o como compra única de por vida.',
    highlights: [
      'Sin acceso a la red, y puedes comprobarlo: la app no tiene el permiso de red, así que no puede subir tu audio. Verifícalo en Terminal.',
      'Precisa con grabaciones reales: en una sesión de 64 minutos entre dos personas capturó el mismo contenido que MacWhisper, y conservó las vacilaciones y los arranques en falso en lugar de suavizarlos.',
      'En vivo, para la sala o la llamada: las palabras aparecen mientras la gente habla, y una llamada con audífonos pone ambos lados en una sola transcripción. La grabación se queda en tu Mac para que puedas cotejar cualquier línea con ella.',
      'Una versión gratuita de verdad completa: la transcripción, la edición, la reproducción y la exportación a texto sin formato, texto con marcas de tiempo y JSON son gratis. El JSON lo lleva todo, así que tu trabajo nunca queda atrapado.',
    ],
    price: 'Gratis, con Premium como suscripción o compra única',
    requires: 'macOS 26 o posterior',
    releases: {
      '1.1.1': {
        version: {
          currentFeatures: [
            'Transcripción en vivo desde el micrófono, o desde una llamada o reunión con audífonos, con ambos lados en una sola transcripción',
            'Nombres de hablantes, resúmenes generados en el dispositivo en el idioma de la transcripción y búsqueda en todas las transcripciones',
            'Modo de revisión, que marca las líneas de las que el reconocedor no estaba seguro',
            'Exportación a texto sin formato, texto con marcas de tiempo, JSON, SubRip, WebVTT, CSV, Markdown, HTML, PDF y Word',
            'Selecciona varias transcripciones a la vez para eliminarlas, o para borrar su audio, todas juntas',
            'Canjea un código de oferta desde la app',
          ],
          nextFeatures: [
            'La app en español, y después otros idiomas',
            'Etiquetas de hablante para llamadas, que distinguen automáticamente tu lado del suyo',
          ],
        },
      },
      '1.2': {
        description:
          'Apunte convierte audio y video en transcripciones precisas y con marcas de tiempo, por completo en tu Mac. ' +
          'Suelta una nota de voz, una entrevista, una clase o un video: si macOS puede reproducirlo, Apunte puede ' +
          'transcribirlo. O transcribe en vivo: la sala en la que estás, o una llamada o reunión con audífonos, con ' +
          'ambos lados en una sola transcripción.\n\n' +
          'No tiene el permiso de red saliente, así que el propio código de la app no puede abrir una conexión de red. ' +
          'No tienes que creerlo a ciegas: compruébalo en la app firmada con codesign. La transcripción es gratuita; ' +
          'Premium agrega nombres de hablantes, resúmenes, búsqueda en toda la biblioteca, transcripción en vivo y ' +
          'exportación con formato, como suscripción o como compra única de por vida. La app está en español y en inglés.',
        version: {
          currentFeatures: [
            'Toda la app en español, siguiendo el idioma de tu Mac',
            'Transcripción en vivo desde el micrófono, o desde una llamada o reunión con audífonos, con ambos lados en una sola transcripción',
            'Nombres de hablantes, resúmenes generados en el dispositivo en el idioma de la transcripción y búsqueda en todas las transcripciones',
            'Modo de revisión, que marca las líneas de las que el reconocedor no estaba seguro y las cuenta',
            'Exportación a texto sin formato, texto con marcas de tiempo, JSON, SubRip, WebVTT, CSV, Markdown, HTML, PDF y Word',
            'Selecciona varias transcripciones a la vez para eliminarlas, o para borrar su audio, todas juntas',
            'Canjea un código de oferta desde la app',
          ],
          nextFeatures: [
            'Exporta una grabación gratis, o un clip de cualquier línea',
            'Hablantes con su propio color, y llamadas que se etiquetan solas: Yo y Otros',
            'Bloqueo con Touch ID o la contraseña de tu Mac',
            'Cinco estilos, entre ellos Taquigrafía, propio de Apunte',
          ],
        },
      },
      // Apunte 1.3, approved 2026-10-09. Coming next is 1.4's settled Mac features; Identify
      // Speakers joins the list after the lawyer's review of its privacy wording.
      '1.3': {
        description:
          'Apunte convierte audio y video en transcripciones precisas y con marcas de tiempo, por completo en tu Mac. ' +
          'Suelta una nota de voz, una entrevista, una clase o un video: si macOS puede reproducirlo, Apunte puede ' +
          'transcribirlo. O transcribe en vivo: la sala en la que estás, o una llamada o reunión con audífonos, con ' +
          'ambos lados en una sola transcripción.\n\n' +
          'No tiene el permiso de red saliente, así que el propio código de la app no puede abrir una conexión de red. ' +
          'No tienes que creerlo a ciegas: compruébalo en la app firmada con codesign. La transcripción y la ' +
          'exportación de la grabación misma son gratuitas; Premium agrega nombres de hablantes, resúmenes, búsqueda ' +
          'en toda la biblioteca, transcripción en vivo, exportación con formato y clips de audio, como suscripción o ' +
          'como compra única de por vida. La app está en español y en inglés, y se bloquea con Touch ID.',
        highlights: [
          'Sin acceso a la red, y puedes comprobarlo: la app no tiene el permiso de red, así que no puede subir tu audio. Verifícalo en Terminal.',
          'Precisa con grabaciones reales: en una sesión de 64 minutos entre dos personas capturó el mismo contenido que MacWhisper, y conservó las vacilaciones y los arranques en falso en lugar de suavizarlos.',
          'En vivo, para la sala o la llamada: las palabras aparecen mientras la gente habla, y una llamada con audífonos pone ambos lados en una sola transcripción. La grabación se queda en tu Mac para que puedas cotejar cualquier línea con ella.',
          'Una versión gratuita de verdad completa: la transcripción, la edición, la reproducción, el bloqueo, todos los estilos y la exportación a texto sin formato, texto con marcas de tiempo, JSON o la grabación misma son gratis. El JSON lo lleva todo, así que tu trabajo nunca queda atrapado.',
        ],
        version: {
          currentFeatures: [
            'Transcripción en vivo desde el micrófono, o desde una llamada o reunión con audífonos, con ambos lados en una sola transcripción y cada línea etiquetada como Yo u Otros',
            'Exporta la grabación misma gratis, o un clip de cualquier línea',
            'Nombres de hablantes con su propio color, resúmenes generados en el dispositivo en el idioma de la transcripción y búsqueda en todas las transcripciones',
            'Modo de revisión, que marca las líneas de las que el reconocedor no estaba seguro y las cuenta',
            'Exportación a texto sin formato, texto con marcas de tiempo, JSON, SubRip, WebVTT, CSV, Markdown, HTML, PDF y Word',
            'Bloqueo con Touch ID o la contraseña de tu Mac, y cinco estilos, entre ellos Taquigrafía, propio de Apunte',
            'Toda la app en español y en inglés, siguiendo el idioma de tu Mac',
          ],
          nextFeatures: [
            'Controles en la barra de menús para llamadas y reuniones, sin abrir la ventana',
            'La tipografía de cada estilo en toda la ventana',
          ],
        },
      },
    },
  },

  retazo: {
    teaser: 'Historial del portapapeles que vive en tu barra de menús.',
    summary:
      'Tu portapapeles, con memoria. Capturas de pantalla en las que puedes buscar, un atajo global, tres estilos y privacidad integrada. Todo se queda en tu Mac.',
    description:
      'Retazo guarda todo lo que copias y lo deja a un clic o a un atajo de distancia. Presiona ⌃⌘V en cualquier app, ' +
      'elige un recorte y ⌘V lo pega justo donde estabas. Las capturas de pantalla se guardan con el texto que ' +
      'contienen, leído en tu Mac, para que una búsqueda las encuentre. Los fragmentos guardan el texto que escribes ' +
      'una y otra vez, y también funcionan en la app Atajos.\n\n' +
      'Lo que copias desde un gestor de contraseñas no se guarda, los códigos de un solo uso desaparecen a los cinco ' +
      'minutos y los enlaces pierden sus parámetros de rastreo. No tiene el permiso de red saliente, así que el propio ' +
      'código de la app no puede abrir una conexión de red. No tienes que creerlo a ciegas: compruébalo en la app ' +
      'firmada con codesign. Una sola compra, sin suscripción.\n\n' +
      'Retazo (un pedazo de tela, un recorte) se llamaba Snippystack hasta la versión 2.0. Es la misma app con otro ' +
      'nombre, y todo lo que guardaste vino con ella.',
    highlights: [
      'Un atajo, cualquier app: presiona ⌃⌘V, elige un recorte y pégalo donde estabas. No necesita permisos de Accesibilidad ni de Monitoreo de entrada.',
      'Capturas en las que puedes buscar: el texto de las imágenes copiadas se lee en tu Mac con el framework Vision de Apple, y nunca se sube.',
      'Sin acceso a la red, y puedes comprobarlo: la app no tiene el permiso de red, así que no puede enviar tu portapapeles a ningún lado. Verifícalo en Terminal.',
    ],
    price: 'US$2.99 (el precio varía según el país)',
    requires: 'macOS 14 o posterior',
    releases: {
      '2.0': {
        version: {
          currentFeatures: [
            'Historial del portapapeles en tu barra de menús: texto, enlaces, código e imágenes, cada uno a un clic de volver a tu portapapeles',
            'Un atajo global, ⌃⌘V, que abre tus recortes desde cualquier app sin permisos especiales',
            'Imágenes con texto en el que puedes buscar, leído en tu Mac con el framework Vision de Apple',
            'Fragmentos para el texto que escribes una y otra vez, con edición, exportación e importación, y acciones de Atajos',
            'Copy As (mayúsculas y minúsculas, Base64, JSON con formato y más) y Copy Together para varios recortes a la vez',
            'Una ventana de historial que filtra por tipo o por la app de la que vino cada recorte',
            'Tres estilos (Glass, Tech y Notepad), cada uno con su diseño claro y oscuro, además de Liquid Glass en macOS 26',
            'Las copias de gestores de contraseñas no se guardan, Pause Capture, Auto-Forget, códigos de un solo uso que desaparecen y enlaces sin parámetros de rastreo',
          ],
          nextFeatures: [
            'Sincronización opcional de tus fragmentos con iCloud, desactivada a menos que la actives. Tu historial del portapapeles nunca se sincroniza.',
          ],
        },
      },
    },
  },

  amparo: {
    teaser: 'Seguimiento del ciclo privado que nunca sale de tu iPhone.',
    summary: 'Seguimiento del ciclo para iPhone, con la privacidad primero. Tu cuerpo, tus datos: sin nube, sin ruido.',
    description:
      'Amparo es una app de seguimiento del ciclo para iPhone pensada en torno a la privacidad, la claridad y la ' +
      'tranquilidad. En lugar de convertir tu cuerpo en un tablero de alertas y rachas, Amparo te ayuda a registrar ' +
      'síntomas, seguir tu estado de ánimo y notar patrones, con una interfaz más tranquila y humana que nunca juzga ' +
      'ni alarma.\n\n' +
      'Todo se queda en tu dispositivo. No necesitas una cuenta. No se sincroniza con la nube.\n\n' +
      'Amparo describe lo que registras. No hace diagnósticos y no es un método anticonceptivo.',
    highlights: [
      'Almacenamiento solo local: los datos de tu ciclo nunca salen de tu iPhone, sin cuentas ni servidores',
      'Registra síntomas, estados de ánimo y fases del ciclo con una interfaz tranquila y sin juicios',
      'Patrones que describen tus propios ritmos: nunca un diagnóstico, nunca un anticonceptivo',
    ],
    price: 'US$4.99 (el precio varía según el país)',
    requires: 'iOS 17.6 o posterior',
    releases: {
      '1.1': {
        version: {
          currentFeatures: [
            'Fuera del respaldo de iCloud de forma predeterminada, para que tus datos se queden en tu iPhone a menos que elijas otra cosa',
            'Pasar a un iPhone nuevo: una transferencia cifrada por AirDrop con un código de un solo uso, sin nube de por medio',
            'Trae tu historial desde la app Salud de Apple, Clue o Flo, leído en tu iPhone y nunca subido',
            'Un resumen para la consulta médica: un PDF con tus ciclos, patrones y temperaturas para compartir con un profesional de la salud',
            'Tus patrones: cuándo suelen llegar tus síntomas, con un aviso opcional la mañana anterior',
            'Modo discreto para las notificaciones y la pantalla bloqueada, además de iconos que no parecen de una app del ciclo',
            'Conservar mi historial: elimina automáticamente los registros más antiguos que el plazo que elijas',
            'Un widget de registro rápido para tu periodo y tus síntomas, directo en la pantalla de inicio',
            'Predicciones rehechas con niveles de confianza y rangos, y la ovulación confirmada por la temperatura',
            'Un nuevo diseño: colores que siguen tu ciclo, animaciones divertidas y soporte para texto más grande',
            'Un nuevo icono de la app, con versiones oscura, con tinte y transparente para tu pantalla de inicio',
            'Siri no habla de tu ciclo mientras tu iPhone está bloqueado',
          ],
          nextFeatures: [
            'Amparo en español: cada pantalla, los widgets y Siri',
            'Tus patrones, de cerca: cada ciclo, lo que suele venir con un síntoma y tu ánimo esos días',
            'El cálculo de tu próximo periodo a partir del aumento de temperatura confirmado, hecho en tu iPhone',
            'Cuatro estilos: Medianoche, Luz de día, Libreta y Sencillo, con widgets y la Actividad en vivo a juego',
            'Un control para el Centro de control, la pantalla bloqueada y el botón de acción',
            'Widgets pensados para el modo En espera',
            'Mejor soporte para VoiceOver, Control por voz y texto grande, con gráficas que puedes escuchar',
            'Enviar comentarios desde Configuración, con tu propia app Mail',
          ],
        },
      },
    },
  },
};
