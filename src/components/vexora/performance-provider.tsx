"use client";

import { useEffect, type ReactNode } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

/**
 * Global runtime performance layer:
 *
 * 1. LazyMotion (strict) — loads only the animation features this site uses
 *    (animations, variants, exit, gestures, viewport) instead of the full
 *    motion bundle. `strict` fails fast if a heavy `motion.*` component
 *    sneaks back into the codebase.
 * 2. MotionConfig reducedMotion="user" — honors the OS "reduce motion"
 *    accessibility setting for every framer-motion animation.
 * 3. Off-screen animation pausing — decorative CSS animations (marquee,
 *    streaks, floats, pulses) are paused via a single shared
 *    IntersectionObserver while their elements are outside the viewport,
 *    so the compositor does zero work for content the user cannot see.
 */
export function PerformanceProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const SELECTOR = [
      ".animate-marquee",
      ".animate-streak",
      ".animate-float",
      ".animate-status-pulse",
    ].join(",");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          el.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused";
        }
      },
      { rootMargin: "120px" }
    );

    const observed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    scan();
    // Catch nodes that hydrate/mount slightly later (mockup, etc.)
    const raf = requestAnimationFrame(scan);
    const timeout = window.setTimeout(scan, 1500);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
