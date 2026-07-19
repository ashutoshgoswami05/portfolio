"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** SSR-safe media-query hook backed by useSyncExternalStore. */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Traceable mouse cursor:
 *   - a precise inner dot that tracks the pointer instantly
 *   - a spring-trailing outer ring that "chases" the dot
 *   - a faint comet trail of delayed followers tracing the path
 *   - grows + inverts over interactive elements (a, button, [data-cursor])
 *
 * Only mounts on fine-pointer (mouse) devices; touch devices keep the native
 * cursor. Honours prefers-reduced-motion by dropping the trailing followers.
 */
export default function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Raw pointer position (motion values → no re-render per move).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Spring-trailed ring position.
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  // Comet trail: progressively laggier springs.
  const t1x = useSpring(x, { stiffness: 120, damping: 18, mass: 0.9 });
  const t1y = useSpring(y, { stiffness: 120, damping: 18, mass: 0.9 });
  const t2x = useSpring(x, { stiffness: 80, damping: 16, mass: 1.1 });
  const t2y = useSpring(y, { stiffness: 80, damping: 16, mass: 1.1 });
  const t3x = useSpring(x, { stiffness: 55, damping: 15, mass: 1.3 });
  const t3y = useSpring(y, { stiffness: 55, damping: 15, mass: 1.3 });
  const trailPoints = [
    { x: t1x, y: t1y, size: 5, opacity: 0.35 },
    { x: t2x, y: t2y, size: 4, opacity: 0.22 },
    { x: t3x, y: t3y, size: 3, opacity: 0.12 },
  ];

  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }
    document.body.classList.add("custom-cursor-active");

    const move = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        setHidden(false);
      });
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [role="button"], [data-cursor="hover"]'),
      );
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.25s ease" }}
    >
      {/* Comet trail followers */}
      {!reduced &&
        trailPoints.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[var(--accent)]"
            style={{
              x: p.x,
              y: p.y,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}

      {/* Trailing ring */}
      <motion.span
        className="absolute rounded-full border border-[var(--accent)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          borderColor: hovering ? "var(--accent-2)" : "var(--accent)",
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      {/* Precise inner dot */}
      <motion.span
        className="absolute rounded-full bg-[var(--accent)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          scale: pressed ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}
