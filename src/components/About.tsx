import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="01." title="About me" />
      <div className="grid gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="space-y-4 text-[var(--fg-muted)] leading-relaxed">
            <p>
              I&apos;m a backend engineer who enjoys the parts of the stack most
              people never see — the services that quietly move money, telemetry
              and events around without dropping a beat. My focus is reliability:
              systems that stay correct and observable under real production load.
            </p>
            <p>
              At{" "}
              <span className="text-[var(--fg)]">OTTO Payments</span> I work on
              event-driven payment systems in Java and Spring Boot, provision
              infrastructure as code with Terraform on AWS, and keep everything
              observable with Prometheus and Grafana. Previously at{" "}
              <span className="text-[var(--fg)]">Harman</span> I built REST APIs
              for a connected-vehicle platform serving tens of thousands of users.
            </p>
            <p>
              Alongside work I&apos;m pursuing an{" "}
              <span className="text-[var(--fg)]">
                M.Sc. in High Integrity Systems
              </span>{" "}
              at Frankfurt UAS, and I&apos;m increasingly building with agentic AI
              — LangGraph, tool chaining and prompt engineering.
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.15}>
          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/60 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
              Currently
            </p>
            <p className="mt-3 text-[var(--fg)]">
              Working Student @ OTTO Payments
            </p>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {profile.location}
            </p>
            <div className="my-5 h-px bg-[var(--border-strong)]" />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
              Studying
            </p>
            <p className="mt-3 text-[var(--fg)]">M.Sc. High Integrity Systems</p>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              Frankfurt University of Applied Sciences
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
