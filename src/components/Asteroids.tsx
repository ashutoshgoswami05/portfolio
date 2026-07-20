"use client";

import { useEffect, useRef } from "react";

type Rock = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  alpha: number;
  color: string;
  verts: number[];
};

/**
 * Minimal, subtle asteroid field drifting across the background.
 * A single canvas draws a sparse set of small irregular rocks that slowly
 * float and rotate, wrapping at the edges. Kept lightweight:
 *   - capped devicePixelRatio and low rock count
 *   - pauses the rAF loop while the tab is hidden
 *   - renders a single static frame under prefers-reduced-motion
 */
export default function Asteroids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rocks: Rock[] = [];
    let rafId = 0;
    let last = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const makeRocks = () => {
      // Sparse: roughly one rock per ~110k px², clamped for very small/large screens.
      const count = Math.min(
        18,
        Math.max(7, Math.round((width * height) / 110000)),
      );
      const palette = [
        "185, 195, 215",
        "185, 195, 215",
        "185, 195, 215",
        "160, 170, 195",
        "34, 211, 238", // accent cyan (rare)
        "167, 139, 250", // accent violet (rare)
      ];
      rocks = Array.from({ length: count }, () => {
        const vcount = Math.floor(rand(7, 10));
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.1, 0.1),
          vy: rand(-0.1, 0.1),
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.0012, 0.0012),
          size: rand(1.1, 3),
          alpha: rand(0.04, 0.16),
          color: palette[Math.floor(Math.random() * palette.length)],
          verts: Array.from({ length: vcount }, () => rand(0.65, 1.25)),
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeRocks();
    };

    const drawRock = (r: Rock) => {
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.rot);
      ctx.beginPath();
      const n = r.verts.length;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rad = r.size * r.verts[i];
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${r.color}, ${r.alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const dt = last ? Math.min((now - last) / 16.6667, 3) : 1;
      last = now;
      ctx.clearRect(0, 0, width, height);
      const margin = 24;
      for (const r of rocks) {
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.rot += r.vr * dt;
        if (r.x < -margin) r.x = width + margin;
        else if (r.x > width + margin) r.x = -margin;
        if (r.y < -margin) r.y = height + margin;
        else if (r.y > height + margin) r.y = -margin;
        drawRock(r);
      }
      rafId = requestAnimationFrame(render);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const r of rocks) drawRock(r);
    };

    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!reduced) {
        last = 0;
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  );
}
