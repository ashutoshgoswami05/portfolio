"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="03." title="Skills & tools" />

      <div className="divide-y divide-[var(--border-strong)]/50 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/40">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: gi * 0.05,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-[var(--bg-elevated)]/40 sm:flex-row sm:items-center sm:gap-6"
          >
            <h3 className="shrink-0 font-mono text-xs uppercase tracking-widest text-[var(--accent)] sm:w-44">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[var(--bg-elevated)] px-2.5 py-1 text-xs text-[var(--fg-muted)] ring-1 ring-transparent transition-colors hover:text-[var(--fg)] hover:ring-[var(--accent)]/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
