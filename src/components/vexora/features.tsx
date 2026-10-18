"use client";

import { useRef } from "react";
import {
  Gamepad2,
  Keyboard,
  Mouse,
  Repeat,
  Wifi,
  Zap,
} from "lucide-react";
import { Reveal } from "./reveal";

const FEATURES = [
  {
    icon: Keyboard,
    title: "No Waits",
    desc: "Disables Filter Keys instantly: no more waits on hold or repeat. Every keystroke lands the moment you press it.",
    tag: "Filter Keys off",
  },
  {
    icon: Repeat,
    title: "Ready Repeat",
    desc: "Minimum autorepeat delay (~250 ms) so holding a key feels instant — in games, code and text.",
    tag: "~250 ms",
  },
  {
    icon: Zap,
    title: "Max Rate",
    desc: "31 repeats per second while you hold a key. The first press is never touched, only the repeats get faster.",
    tag: "31 rep/s",
  },
  {
    icon: Mouse,
    title: "1:1 Pointer",
    desc: "Removes mouse acceleration so your aim feels identical every single day: changes feel, not latency.",
    tag: "Aim 1:1",
  },
  {
    icon: Gamepad2,
    title: "FPS for Your Games",
    desc: "Priority and multimedia scheduler for the game, plus per-game profiles applied automatically when you launch.",
    tag: "Game priority",
  },
  {
    icon: Wifi,
    title: "Wi-Fi & Latency",
    desc: "Wi-Fi power saving off, ping diagnostics and immediate TCP ACK (Pro) for a stable, jitter-free connection.",
    tag: "Ping diagnostics",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  desc,
  tag,
}: (typeof FEATURES)[number]) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.035] sm:p-7"
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.07), transparent 65%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all duration-500 group-hover:border-white/25 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-500">
            {tag}
          </span>
        </div>
        <h3 className="font-display mt-5 text-lg font-bold text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="cv-auto relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
            FEATURES
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Everything your PC needs{" "}
            <span className="text-neutral-500">to dominate</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            Six modules work together to remove waits, tune repeat, keep your
            pointer 1:1 and give your games and your Wi-Fi the edge they
            deserve.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
