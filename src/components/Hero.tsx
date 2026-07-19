"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pt-24"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="font-mono text-sm text-[var(--accent)]"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {profile.name}.
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-3 text-3xl font-bold tracking-tight text-[var(--fg-muted)] sm:text-5xl"
        >
          {profile.tagline}
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)]"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
          >
            View my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-[var(--border-strong)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Say hello
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-16 grid max-w-lg grid-cols-3 gap-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-3xl font-bold text-transparent">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-[var(--fg-subtle)]">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
