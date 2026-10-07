import type { Language } from '../data/languages';
import type { Project } from '../data/projects';
import { PROJECTS_ES, type ProjectTranslation } from '../data/projects.es';

/* A project in the page's language: its Spanish text laid over the English,
   field by field, with English wherever there is no translation. */

const TRANSLATIONS: Partial<Record<Language, Record<string, ProjectTranslation>>> = {
  es: PROJECTS_ES,
};

export type FallbackField = 'teaser' | 'summary' | 'description' | 'highlights' | 'nextSteps' | 'price' | 'requires' | 'version';

/** True when version `a` ("1.3") comes after version `b` ("1.1.1"). */
export const isLater = (a: string, b: string) => {
  const x = a.split('.').map(Number);
  const y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const difference = (x[i] ?? 0) - (y[i] ?? 0);
    if (difference !== 0) return difference > 0;
  }
  return false;
};

/** -> the project in `language`, plus the fields that are still in English
 *  (so the page can mark them as English for screen readers). */
export const localizeProject = (project: Project, language: Language) => {
  const fallback = new Set<FallbackField>();
  const all = TRANSLATIONS[language];
  if (language === 'en' || !all) return { project, fallback };

  const translation = all[project.slug] ?? {};
  const release = project.version ? translation.releases?.[project.version.current] : undefined;
  const text = { ...translation, ...release };

  const pick = <K extends FallbackField>(field: K, english: Project[K]): Project[K] => {
    if (english === undefined) return english;  // nothing to translate, e.g. an unannounced summary
    const translated = (text as Record<string, unknown>)[field];
    if (translated === undefined) {
      fallback.add(field);
      return english;
    }
    return translated as Project[K];
  };

  const version = project.version
    ? text.version
      ? { ...project.version, ...text.version }
      : (fallback.add('version'), project.version)
    : undefined;

  return {
    project: {
      ...project,
      teaser: pick('teaser', project.teaser),
      summary: pick('summary', project.summary),
      description: pick('description', project.description),
      highlights: pick('highlights', project.highlights),
      nextSteps: pick('nextSteps', project.nextSteps),
      price: pick('price', project.price),
      requires: pick('requires', project.requires),
      version,
    },
    fallback,
  };
};

/** Whether the app itself is in `language` yet, for a note on its page:
 *  'yes', 'coming' (with the version it arrives in), or 'no'. */
export const appLanguage = (project: Project, language: Language): { state: 'yes' | 'coming' | 'no'; version?: string } => {
  if (language === 'en') return { state: 'yes' };
  const since = project.languageSince?.[language as Exclude<Language, 'en'>];
  if (!since) return { state: 'no' };
  if (project.version && isLater(since, project.version.current)) return { state: 'coming', version: since };
  return { state: 'yes' };
};
