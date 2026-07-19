"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24"
    >
      <SectionHeading index="02." title="Career progression" />

      <div ref={ref} className="relative ml-2 md:ml-4">
        {/* Track */}
        <div className="absolute left-0 top-2 h-full w-px bg-[var(--border-strong)]" />
        {/* Animated fill */}
        <motion.div
          style={{ scaleY: fill }}
          className="absolute left-0 top-2 h-full w-px origin-top bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]"
        />

        <div className="space-y-14">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative pl-8 md:pl-12"
    >
      {/* Node dot with static accent glow */}
      <span className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5 items-center justify-center">
        <span
          className="h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
          style={{ boxShadow: "0 0 0 4px var(--accent-glow)" }}
        />
      </span>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg font-semibold text-[var(--fg)]">
          {exp.role}{" "}
          <span className="text-[var(--accent)]">@ {exp.company}</span>
        </h3>
        <p className="font-mono text-xs text-[var(--fg-subtle)]">
          {exp.period}
        </p>
      </div>
      <p className="mt-1 font-mono text-xs text-[var(--fg-subtle)]">
        {exp.location}
      </p>

      <ul className="mt-4 space-y-2.5">
        {exp.highlights.map((h, hi) => (
          <li
            key={hi}
            className="flex gap-3 text-sm leading-relaxed text-[var(--fg-muted)]"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {exp.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/60 px-3 py-1 font-mono text-xs text-[var(--fg-muted)]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
