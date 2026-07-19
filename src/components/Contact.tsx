import Reveal from "./Reveal";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28 text-center"
    >
      <Reveal>
        <p className="font-mono text-sm text-[var(--accent)]">06. What&apos;s next?</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Get in touch
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[var(--fg-muted)]">
          I&apos;m open to backend and cloud engineering roles and interesting
          problems in payments, distributed systems and agentic AI. My inbox is
          always open — I&apos;ll do my best to reply.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block rounded-md border border-[var(--accent)] px-8 py-4 font-mono text-sm text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
        >
          Say hello
        </a>
      </Reveal>
    </section>
  );
}
