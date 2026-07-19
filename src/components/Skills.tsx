"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="03." title="Skills & tools" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: gi * 0.06,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/50 p-5 transition-colors hover:border-[var(--accent)]/50"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              {group.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[var(--bg-elevated)] px-2.5 py-1 text-sm text-[var(--fg-muted)] transition-colors group-hover:text-[var(--fg)]"
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
