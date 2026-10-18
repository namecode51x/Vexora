"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { VexoraMark } from "./logo";
import { Reveal } from "./reveal";

/* ─── Animated counter (drives the DOM directly: zero re-renders) ─── */
function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${(to * eased).toFixed(decimals)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 1, prefix: "", suffix: " ms", label: "Minimum input latency", decimals: 0 },
  { value: 87, prefix: "−", suffix: "%", label: "Instant delay reduction", decimals: 0 },
  { value: 78, prefix: "+", suffix: "%", label: "System response improvement", decimals: 0 },
  { value: 120, prefix: "+", suffix: " FPS", label: "Gained on average", decimals: 0 },
];

const MARQUEE = [
  "KILL THE DELAY",
  "FEEL THE DIFFERENCE",
  "FASTER INPUTS",
  "BETTER RESULTS",
  "EVERY MILLISECOND COUNTS",
  "MORE FPS",
  "LESS LATENCY",
  "ZERO EXCUSES",
];

export function StatsStrip() {
  return (
    <section aria-label="VEXORA statistics" className="relative">
      {/* Marquee */}
      <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-sm font-semibold tracking-[0.35em] text-neutral-500">
                {item}
              </span>
              <VexoraMark className="h-4 w-4 text-white/40" glow={false} />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent" />
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                <Counter
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mx-auto mt-2.5 max-w-[220px] text-sm text-neutral-500">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
