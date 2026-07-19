"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="04." title="Featured projects" />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, pi) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: pi * 0.08,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50"
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--accent)]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--accent)]">
                {project.tagline}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--fg-subtle)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                aria-hidden
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-[var(--fg)]">
              {project.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-strong)] px-2.5 py-0.5 font-mono text-xs text-[var(--fg-subtle)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
