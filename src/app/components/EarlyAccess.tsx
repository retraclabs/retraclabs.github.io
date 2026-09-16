import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FlaskConical, Loader2, Send } from 'lucide-react';
import { projects } from '../data/projects';

/* ─────────────────────────────────────────────────────────────────────────────
   Where the form posts. Submissions land in retrac.labs@gmail.com by way of
   Formspree, because GitHub Pages is static and cannot receive a form post
   itself. The free tier covers 50 replies a month across the whole account, so
   keep an eye on the Formspree dashboard if the beta program gets busy.

   To point this somewhere else, make a new form at https://formspree.io and
   paste its endpoint here. If the value is ever left as a placeholder, the page
   swaps the submit button for an amber "not connected yet" banner, so a visitor
   is never left filling in a form that quietly goes nowhere.
   ───────────────────────────────────────────────────────────────────────────── */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpqkgqo';

const isConfigured = !FORMSPREE_ENDPOINT.includes('REPLACE_WITH_YOUR_FORM_ID');

const AGE_RANGES = [
  '17 or under',
  '18–24',
  '25–34',
  '35–44',
  '45–54',
  '55–64',
  '65 or over',
  'Prefer not to say',
];

// Deliberately broad. The point is to know roughly who is testing, not where
// anybody works.
const INDUSTRIES = [
  'Healthcare or mental health',
  'Education',
  'Technology or software',
  'Science or research',
  'Legal',
  'Finance or accounting',
  'Creative, design, or architecture',
  'Media, writing, or journalism',
  'Trades, manufacturing, or logistics',
  'Retail, food, or hospitality',
  'Public sector or nonprofit',
  'Student',
  'Retired',
  'Other',
  'Prefer not to say',
];

// Product lines rather than model names: a line does not go stale the week a
// new model ships, and "make year" below carries the detail anyway.
const DEVICES = [
  'MacBook Air or MacBook Pro',
  'iMac, Mac mini, Mac Studio, or Mac Pro',
  'iPhone',
  'iPad',
  'Apple Watch',
  'Apple TV',
  'Apple Vision Pro',
];

const MAKE_YEARS = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019 or earlier',
  'Not sure',
];

/* Built from projects.ts rather than typed out again here, so a teaser only
   ever has to be edited in one place. The hint is what lets someone decide
   whether they are a fit: a codename with nothing attached to it is not a
   question anybody can answer, and it is not reasonable to ask someone to
   install unfinished software without saying roughly what it is. */
const APPS: { value: string; hint: string }[] = [
  ...projects.map((project) => ({
    value: project.name,
    hint:
      `${project.platform}${project.status === 'Available' ? ', shipping' : ''}. ` +
      (project.teaser ?? 'Not described publicly yet.'),
  })),
  {
    value: 'Whatever needs testers most',
    hint: 'Happy to be pointed at whichever build is short of people.',
  },
];

const TIME_COMMITMENTS = [
  'A few minutes a week',
  'About an hour a week',
  'Several hours a week',
  'As much as a build needs',
];

const FEEDBACK_STYLES = [
  'Happy to write up detailed reports',
  'Short notes when something stands out',
  "I'd rather just use it and flag anything broken",
];

const ASSISTIVE_TECH = [
  'VoiceOver',
  'Larger or Dynamic Type',
  'Reduce Motion',
  'Increase Contrast',
  'Voice Control or Switch Control',
  'None of these',
];

const Field = ({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="mb-8">
    <label className="block text-sm font-black text-white light:text-zinc-900 mb-1">
      {label}
      {required ? <span className="text-cyan-400 light:text-cyan-700"> *</span> : null}
    </label>
    {hint ? <p className="text-xs font-mono text-zinc-500 light:text-zinc-600 mb-3">{hint}</p> : <div className="mb-3" />}
    {children}
  </div>
);

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-zinc-900 light:bg-zinc-50 border-2 border-zinc-800 light:border-zinc-300 ' +
  'text-white light:text-zinc-900 placeholder:text-zinc-600 light:placeholder:text-zinc-400 ' +
  'focus:border-cyan-400 light:focus:border-cyan-600 focus:outline-none transition-colors';

type CheckOption = string | { value: string; hint?: string };

const CheckGrid = ({
  name,
  options,
  selected,
  onToggle,
}: {
  name: string;
  options: CheckOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {options.map((option) => {
      const value = typeof option === 'string' ? option : option.value;
      const hint = typeof option === 'string' ? undefined : option.hint;
      const checked = selected.includes(value);

      return (
        <label
          key={value}
          className={
            'flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-colors ' +
            (checked
              ? 'border-cyan-400 bg-cyan-400/10 text-white light:text-zinc-900'
              : 'border-zinc-800 light:border-zinc-300 bg-zinc-900 light:bg-zinc-50 text-zinc-400 light:text-zinc-600 hover:border-zinc-700 light:hover:border-zinc-400')
          }
        >
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onChange={() => onToggle(value)}
            className="w-4 h-4 shrink-0 accent-cyan-400 mt-0.5"
          />
          <span className="min-w-0">
            <span className="block text-sm font-medium">{value}</span>
            {hint ? (
              <span className="block text-xs font-mono text-zinc-500 light:text-zinc-600 mt-1 leading-relaxed">
                {hint}
              </span>
            ) : null}
          </span>
        </label>
      );
    })}
  </div>
);

export const EarlyAccess = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [apps, setApps] = useState<string[]>([]);
  const [assistive, setAssistive] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggle = (list: string[], setList: (next: string[]) => void) => (value: string) =>
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfigured) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    // FormData already carries every checked box under its own name, so the
    // multi-selects above arrive as repeated keys, which Formspree groups.
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('sent');
        // Hand off to the thanks page. Formspree's own "redirect on success" is a
        // paid setting and would not fire here anyway: this is a fetch, so the
        // browser never navigates and the next screen is ours to choose.
        window.location.hash = '#/thanks';
        return;
      }

      const payload = await response.json().catch(() => null);
      // Formspree answers with either { error: "..." } or { errors: [{ message }] }
      // depending on what went wrong. Reading only the second shape is how a
      // "Please complete the Turnstile" rejection once came through as the
      // generic fallback, with nothing on screen to say what was actually wrong.
      const detail =
        payload?.error ??
        payload?.errors?.map((item: { message?: string }) => item?.message).filter(Boolean).join('. ');

      // The visitor gets a sentence they can act on; the real text goes to the
      // console, where it is useful to whoever is maintaining the form.
      console.error('[Retrac Labs] Formspree rejected the submission:', response.status, payload);

      setErrorMessage(
        detail
          ? `That did not send (${detail}). Email retrac.labs@gmail.com and we will sign you up by hand.`
          : 'The form did not go through. Email retrac.labs@gmail.com and we will sign you up by hand.',
      );
      setStatus('error');
    } catch {
      setErrorMessage(
        'That did not send; the connection dropped. Email retrac.labs@gmail.com and we will sign you up by hand.',
      );
      setStatus('error');
    }
  };

  return (
    <main className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lab
        </motion.a>

        {/* ── the ask ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative overflow-hidden mb-6"
        >
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[90px] opacity-20 bg-cyan-500" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-zinc-800 light:border-zinc-200 bg-zinc-900/50 light:bg-white/60 text-xs font-bold font-mono text-cyan-400 light:text-cyan-700 mb-8">
              <FlaskConical className="w-4 h-4" />
              LAB RATS WANTED
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white light:text-zinc-900 uppercase mb-6 leading-[0.95]">
              There is no lab
              <br />
              without you
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 light:text-zinc-700 font-medium leading-relaxed mb-4">
              Retrac Labs is a small operation. There is no QA department, no focus group, and no
              analytics quietly watching how you use anything, and that last one is the whole point of
              how these apps are built.
            </p>
            <p className="text-lg sm:text-xl text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">
              Which means the only way a build gets better is that a real person runs it on a real
              Mac or iPhone and tells us what went wrong. Every app in the lab exists because
              someone did that. The application house doesn't stand without its testers.
            </p>
          </div>
        </motion.section>

        {/* ── what it actually involves ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-[#0f0f12] light:bg-zinc-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 mb-6"
        >
          <h2 className="text-2xl font-black text-white light:text-zinc-900 mb-6">What testing actually involves</h2>
          <ol className="space-y-5">
            {[
              [
                'Fill in the form below.',
                'It tells us which of your devices a build would even run on. Nothing here is sold, shared, or added to a mailing list.',
              ],
              [
                'Wait for an invite that fits.',
                "We'll email you when a build matches your hardware. You may not hear from us for a while. That is normal, and it is not a rejection.",
              ],
              [
                'Install through TestFlight.',
                "Apple's own beta tool. You'll get a link, tap Install, and the app lands next to everything else. Free, and you can leave at any time. Apple requires testers to be 13 or older.",
              ],
              [
                'Use it like you would any app.',
                "Don't go hunting for bugs on our behalf. The useful report is the ordinary one: what you were trying to do, what happened instead.",
              ],
              [
                'Tell us when it breaks.',
                'Reply to the email, or shake the phone and use TestFlight\'s built-in feedback. A screenshot and one sentence beats a perfect bug report you never send.',
              ],
            ].map(([title, detail], index) => (
              <li key={title} className="flex gap-4">
                <span className="font-mono font-black text-cyan-400 light:text-cyan-700 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <strong className="block text-white light:text-zinc-900 font-bold mb-1">{title}</strong>
                  <span className="text-zinc-400 light:text-zinc-600 font-medium leading-relaxed">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* ── the form ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="border-4 border-zinc-800 light:border-zinc-200 bg-zinc-900 light:bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10"
        >
          <h2 className="text-3xl font-black text-white light:text-zinc-900 uppercase mb-2">Sign up to test</h2>
          <p className="text-zinc-400 light:text-zinc-600 font-medium mb-10">
            Everything except your email is optional. The more you fill in, the better we can match
            you to a build that will actually run.
          </p>

          <form onSubmit={onSubmit} noValidate={false}>
            {/* Formspree uses this as the reply-to and the subject line. */}
            <input type="hidden" name="_subject" value="Retrac Labs: new beta tester" />
            {/* Formspree's honeypot. Humans never see it, so anything that fills
                it in is a bot and the submission is dropped. Free, invisible, and
                it carries some of the load if CAPTCHA is switched off. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
            />

            <Field label="Email" hint="Where the TestFlight invite goes. Nothing else is ever sent here." required>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="What should we call you?" hint="First name or a handle. Optional.">
              <input type="text" name="name" autoComplete="given-name" placeholder="Optional" className={inputClass} />
            </Field>

            <Field label="Age range" hint="Apple requires TestFlight users to be 13 or older.">
              <select name="age_range" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select one
                </option>
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Industry you work in"
              hint="Broad strokes only. We don't need your employer or job title."
            >
              <select name="industry" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select one
                </option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Which Apple devices could you test on?"
              hint="Tick everything you'd be willing to install a beta on."
            >
              <CheckGrid
                name="devices"
                options={DEVICES}
                selected={devices}
                onToggle={toggle(devices, setDevices)}
              />
            </Field>

            <Field
              label="Roughly what year is your main test device?"
              hint="The Mac or iPhone you'd actually reach for. Apple menu > About This Mac, or Settings > General > About."
            >
              <select name="device_year" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select one
                </option>
                {MAKE_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Exact model, if you know it"
              hint='Optional, but it helps. Something like "MacBook Air M2" or "iPhone 15 Pro".'
            >
              <input type="text" name="device_model" placeholder="Optional" className={inputClass} />
            </Field>

            <Field
              label="What version of macOS / iOS / iPadOS are you on?"
              hint="Apple menu > About This Mac, or Settings > General > About > Software Version."
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" name="macos_version" placeholder="macOS" className={inputClass} />
                <input type="text" name="ios_version" placeholder="iOS" className={inputClass} />
                <input type="text" name="ipados_version" placeholder="iPadOS" className={inputClass} />
              </div>
            </Field>

            <Field
              label="Anything in the lab you're particularly curious about?"
              hint="Codenames stay codenames until an app ships, but here is roughly what each one does."
            >
              <CheckGrid name="apps" options={APPS} selected={apps} onToggle={toggle(apps, setApps)} />
            </Field>

            <Field label="How much time could you realistically give it?">
              <select name="time_commitment" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select one
                </option>
                {TIME_COMMITMENTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="How do you prefer to give feedback?">
              <select name="feedback_style" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select one
                </option>
                {FEEDBACK_STYLES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Do you use any of these accessibility features?"
              hint="Testers who do catch things nobody else does. This is one of the most useful answers on the form."
            >
              <CheckGrid
                name="assistive_tech"
                options={ASSISTIVE_TECH}
                selected={assistive}
                onToggle={toggle(assistive, setAssistive)}
              />
            </Field>

            <Field label="Country or region" hint="So we know which time zone and locale a build is being used in.">
              <input type="text" name="region" placeholder="Optional" className={inputClass} />
            </Field>

            <Field label="Anything else we should know?">
              <textarea
                name="notes"
                rows={4}
                placeholder="Optional. What you'd want out of an app like these, what frustrates you about the ones you use now, anything at all."
                className={inputClass}
              />
            </Field>

            <div className="border-t-2 border-zinc-800 light:border-zinc-200 pt-8">
              <p className="text-xs font-mono text-zinc-500 light:text-zinc-600 leading-relaxed mb-6">
                What happens to this: it lands in retrac.labs@gmail.com and stays there. It is not
                sold, not shared, and not fed to any analytics service. Ask us to delete it at any
                time and it's gone.
              </p>

              {!isConfigured ? (
                <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-5 text-sm">
                  <strong className="block font-black text-amber-300 light:text-amber-700 mb-1">
                    This form isn't connected yet.
                  </strong>
                  <span className="text-amber-200/80 light:text-amber-800 font-medium">
                    Nothing would be delivered, so the submit button is switched off. In the
                    meantime, email{' '}
                    <a href="mailto:retrac.labs@gmail.com" className="underline font-bold">
                      retrac.labs@gmail.com
                    </a>{' '}
                    and you'll be added by hand.
                  </span>
                </div>
              ) : (
                <>
                  {status === 'error' ? (
                    <div className="rounded-xl border-2 border-red-500/40 bg-red-500/10 p-5 text-sm text-red-200 light:text-red-700 font-medium mb-6">
                      {errorMessage}
                    </div>
                  ) : null}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ boxShadow: '0px 0px 0px 0px rgba(34,211,238,0)' }}
                    whileHover={status === 'sending' ? undefined : { y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(34,211,238,1)' }}
                    whileTap={status === 'sending' ? undefined : { y: 0, x: 0 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-black tracking-wide border-2 border-cyan-400 transition-all disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Put me on the list
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </div>
          </form>
        </motion.section>
      </div>
    </main>
  );
};
