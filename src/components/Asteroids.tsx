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
  strokeAlpha: number;
  glow: boolean;
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
      // Roughly one rock per ~55k px², clamped for very small/large screens.
      const count = Math.min(
        34,
        Math.max(16, Math.round((width * height) / 55000)),
      );
      const palette = [
        "195, 205, 225",
        "195, 205, 225",
        "175, 186, 212",
        "150, 162, 195",
        "34, 211, 238", // accent cyan (occasional)
        "167, 139, 250", // accent violet (occasional)
      ];
      rocks = Array.from({ length: count }, () => {
        const vcount = Math.floor(rand(7, 11));
        const colorIdx = Math.floor(Math.random() * palette.length);
        const accent = colorIdx >= 4;
        // depth: 0 = far (small, faint, slow) .. 1 = near (large, bright, fast).
        const depth = Math.random();
        const size = 2 + depth * 4.5; // ~2 .. 6.5
        const alpha = 0.16 + depth * 0.32; // ~0.16 .. 0.48
        const speed = 0.06 + depth * 0.2; // parallax drift
        const angle = rand(0, Math.PI * 2);
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.0018, 0.0018),
          size,
          alpha: accent ? alpha + 0.1 : alpha,
          strokeAlpha: Math.min(0.6, alpha * 1.7),
          glow: accent,
          color: palette[colorIdx],
          verts: Array.from({ length: vcount }, () => rand(0.62, 1.32)),
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
      // Soft glow for the occasional accent-tinted asteroid.
      if (r.glow) {
        ctx.shadowColor = `rgba(${r.color}, 0.55)`;
        ctx.shadowBlur = r.size * 2.4;
      }
      ctx.fillStyle = `rgba(${r.color}, ${r.alpha})`;
      ctx.fill();
      // Crisp rim so the rocks read as defined shapes, not blurry blobs.
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgba(${r.color}, ${r.strokeAlpha})`;
      ctx.stroke();
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
