import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, FlaskConical, Sparkles } from 'lucide-react';
import { Project, projects, isAnnounced, isShipped } from '../data/projects';
import { ACCENTS } from '../data/accents';
import { getLabNotesFor } from '../labNotes';
import { useLanguage, useStrings } from '../i18n/context';
import { appLanguage, localizeProject } from '../i18n/projects';
import { AccentGlow } from './AccentGlow';
import { ScreenshotGallery } from './ScreenshotGallery';

type ProjectDetailProps = {
  project: Project;
};

export const ProjectDetail = ({ project: english }: ProjectDetailProps) => {
  const { language } = useLanguage();
  const t = useStrings();
  // The page's own text in the page's language, with English wherever a
  // translation is missing; `inEnglish` marks those parts for screen readers.
  const { project, fallback } = localizeProject(english, language);
  const inEnglish = (field: Parameters<typeof fallback.has>[0]) => (fallback.has(field) ? 'en' : undefined);
  const appInLanguage = appLanguage(project, language);
  const Icon = project.icon;
  const accent = ACCENTS[project.accent];
  // A shipped app's page is a product page: the download button moves up into
  // the title card, and the lab vocabulary ("Current Focus", "Other
  // Experiments") gives way to plain product language.
  const shipped = isShipped(project);
  const labNotes = getLabNotesFor(project.slug);
  const downloadLabel = t.project.download(project.platform);
  // Unannounced projects have no page to link to, so they stay off this list.
  const relatedProjects = projects.filter(
    (item) => item.slug !== project.slug && isAnnounced(item),
  );

  return (
    <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.a
          href="#apps"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.project.backToLab}
        </motion.a>

        <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden"
          >
            <AccentGlow accent={accent} />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-white light:bg-zinc-900 text-black light:text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <span className={'px-4 py-2 rounded-full bg-zinc-800 light:bg-zinc-100 font-mono font-bold text-sm ' + accent.text}>
                  {project.platform}
                </span>
                <span className="px-4 py-2 rounded-full bg-zinc-800 light:bg-zinc-100 text-zinc-300 light:text-zinc-700 font-mono font-bold text-sm">
                  {t.status[project.status] ?? project.status}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white light:text-zinc-900 uppercase mb-6">
                {project.name}
              </h1>
              <p lang={inEnglish('summary')} className="text-xl sm:text-2xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed max-w-3xl">
                {project.summary}
              </p>

              {shipped && project.appStoreUrl ? (
                <div className="mt-8 flex flex-col gap-5">
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:self-start inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-cyan-400 text-black font-black border-2 border-cyan-400 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
                  >
                    {downloadLabel}
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  {project.price || project.requires ? (
                    <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1.5 text-sm">
                      {project.price ? (
                        <>
                          <dt className="text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-widest">
                            {t.project.price}
                          </dt>
                          <dd lang={inEnglish('price')} className="font-bold text-zinc-200 light:text-zinc-800">{project.price}</dd>
                        </>
                      ) : null}
                      {project.requires ? (
                        <>
                          <dt className="text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-widest">
                            {t.project.requires}
                          </dt>
                          <dd lang={inEnglish('requires')} className="font-bold text-zinc-200 light:text-zinc-800">{project.requires}</dd>
                        </>
                      ) : null}
                    </dl>
                  ) : null}
                  {/* So nobody buys expecting a language the app doesn't have yet. */}
                  {appInLanguage.state === 'no' ? (
                    <p className="text-sm font-medium text-zinc-400 light:text-zinc-600">{t.project.appOnlyInEnglish}</p>
                  ) : appInLanguage.state === 'coming' && appInLanguage.version ? (
                    <p className="text-sm font-medium text-zinc-400 light:text-zinc-600">
                      {t.project.appLanguageComing(appInLanguage.version)}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
          >
            <div className="text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-widest mb-4">
              {shipped ? t.project.overview : t.project.currentFocus}
            </div>
            <p lang={inEnglish('description')} className={'text-zinc-300 light:text-zinc-700 font-medium leading-relaxed whitespace-pre-line' + (shipped ? '' : ' mb-8')}>
              {project.description}
            </p>
            {shipped ? null : project.appStoreUrl ? (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-cyan-400 text-black font-black border-2 border-cyan-400 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                {downloadLabel}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            ) : (
              <a
                href="mailto:retrac.labs@gmail.com"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-white light:bg-zinc-900 text-black light:text-white font-black border-2 border-white light:border-zinc-900 hover:bg-yellow-400 light:hover:text-zinc-900 hover:border-yellow-400 transition-colors"
              >
                {t.project.askAboutThis}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </motion.aside>
        </section>

        {project.screenshots?.length ? (
          <ScreenshotGallery
            name={project.name}
            screenshots={project.screenshots}
            accent={accent}
            currentVersion={project.version?.current}
            languageSince={project.languageSince}
          />
        ) : null}

        {project.version ? (
          /* A shipped app gets a straight comparison: what is on your Mac now
             against what the next build adds, instead of a vague roadmap. */
          <section lang={inEnglish('version')} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h2 lang={language} className="text-2xl font-black text-white light:text-zinc-900">{t.project.latestVersion}</h2>
                <span className={'px-3 py-1 rounded-full bg-zinc-800 light:bg-zinc-100 font-mono font-black text-sm ' + accent.text}>
                  {project.version.current}
                </span>
              </div>
              <p lang={language} className="text-sm text-zinc-400 light:text-zinc-600 font-mono mb-6">{t.project.shippingToday}</p>
              <div className="space-y-4">
                {project.version.currentFeatures.map((feature) => (
                  <div key={feature} className="flex gap-3 text-zinc-300 light:text-zinc-700 font-medium">
                    <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="border-4 border-dashed border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h2 lang={language} className="text-2xl font-black text-white light:text-zinc-900">{t.project.nextVersion}</h2>
                <span className="px-3 py-1 rounded-full bg-zinc-800 light:bg-zinc-100 text-zinc-400 light:text-zinc-600 font-mono font-black text-sm">
                  {project.version.next}
                </span>
              </div>
              <p lang={language} className="text-sm text-zinc-400 light:text-zinc-600 font-mono mb-6">{t.project.notShippedYet}</p>
              <div className="space-y-4">
                {project.version.nextFeatures.map((feature) => (
                  <div key={feature} className="flex gap-3 text-zinc-400 light:text-zinc-600 font-medium">
                    <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-zinc-600 light:text-zinc-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {project.highlights?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
              >
                <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">{t.project.whatItIs}</h2>
                <div lang={inEnglish('highlights')} className="space-y-4">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex gap-3 text-zinc-300 light:text-zinc-700 font-medium">
                      <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {project.nextSteps?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8"
              >
                <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">
                  {shipped ? t.project.comingNext : t.project.nextSteps}
                </h2>
                <div lang={inEnglish('nextSteps')} className="space-y-4">
                  {project.nextSteps.map((step, index) => (
                    <div key={step} className="flex gap-3 text-zinc-300 light:text-zinc-700 font-medium">
                      <span className={'font-mono font-black ' + accent.text}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </section>
        )}

        {/* An app's highlights still deserve a home when the version pair has
            taken the lower row. */}
        {project.version && project.highlights?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 mt-6"
          >
            <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">{t.project.whatItIs}</h2>
            <div lang={inEnglish('highlights')} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-zinc-300 light:text-zinc-700 font-medium">
                  <CheckCircle2 className={'w-5 h-5 mt-0.5 shrink-0 ' + accent.text} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* The page makes the claims; lab notes are where they are proved. */}
        {labNotes.length ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-6 space-y-4"
          >
            {labNotes.map((note) => (
              <a
                key={note.href}
                href={note.href}
                className="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 border-4 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 hover:border-white light:hover:border-zinc-900 transition-colors"
              >
                <div className={'p-4 rounded-2xl shrink-0 self-start sm:self-center ' + accent.iconBg}>
                  <FlaskConical className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-widest mb-2">
                    {t.project.labNotes}
                    {/* Notes aren't translated yet: say so before the click. */}
                    {t.project.inEnglish ? ` · ${t.project.inEnglish}` : null}
                  </div>
                  <h2 lang="en" className="text-2xl font-black text-white light:text-zinc-900 mb-2">{note.title}</h2>
                  {language !== 'en' && note.translations?.[language] ? (
                    <p className="text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">{note.translations[language]!.blurb}</p>
                  ) : (
                    <p lang="en" className="text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">{note.blurb}</p>
                  )}
                </div>
                <span className={'inline-flex items-center gap-2 font-mono font-black text-sm shrink-0 ' + accent.text}>
                  {t.project.readNote}
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </motion.section>
        ) : null}

        {relatedProjects.length ? (
          <section className="mt-14">
            <div className="text-xs font-mono font-black text-zinc-400 light:text-zinc-600 uppercase tracking-widest mb-4">
              {shipped ? t.project.moreFrom : t.project.otherExperiments}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProjects.map((relatedProject) => {
                const RelatedIcon = relatedProject.icon;

                return (
                  <a
                    key={relatedProject.slug}
                    href={'#/projects/' + relatedProject.slug}
                    className="flex items-center justify-between gap-4 border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-2xl p-5 hover:border-white light:hover:border-zinc-900 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-zinc-800 light:bg-zinc-100 text-white light:text-zinc-900">
                        <RelatedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-white light:text-zinc-900">{relatedProject.name}</div>
                        <div className="text-sm text-zinc-400 light:text-zinc-600 font-mono font-bold">{relatedProject.platform}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 light:text-zinc-600" />
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};
