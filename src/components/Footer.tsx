import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-strong)]/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-[var(--fg-subtle)] sm:flex-row">
        <p className="font-mono text-xs">
          Designed &amp; built by {profile.name}
        </p>
        <ul className="flex items-center gap-6">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
