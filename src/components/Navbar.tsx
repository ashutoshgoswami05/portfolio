"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { sections } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--border-strong)] bg-[var(--bg)]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-lg font-bold tracking-tight"
          aria-label="Back to top"
        >
          <span className="text-[var(--accent)]">A</span>KG
          <span className="text-[var(--accent)]">.</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-[var(--fg-muted)] md:flex">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)]"
              >
                <span className="font-mono text-xs text-[var(--accent)]">
                  0{i + 1}.
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:ashutoshgoswami05@gmail.com"
          className="rounded-md border border-[var(--accent)]/40 px-4 py-1.5 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
        >
          Get in touch
        </a>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
      />
    </header>
  );
}
