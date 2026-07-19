import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education, certifications, languages } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="05." title="Education & credentials" />

      <div className="grid gap-6 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="h-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/50 p-6">
            <p className="font-mono text-xs text-[var(--accent)]">
              {education.period}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-[var(--fg)]">
              {education.degree}
            </h3>
            <p className="mt-1 text-[var(--fg-muted)]">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-[var(--fg-subtle)]">
              {education.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/50 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
                Certifications
              </p>
              <ul className="mt-3 space-y-2">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="flex items-center gap-2 text-sm text-[var(--fg)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/50 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
                Languages
              </p>
              <ul className="mt-3 space-y-2">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[var(--fg)]">{lang.name}</span>
                    <span className="text-[var(--fg-subtle)]">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
