"use client";

import { Download, Mouse, Trophy } from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
  {
    icon: Download,
    num: "01",
    title: "Download & install",
    desc: "A 12 MB installer with no bloatware and no hidden extras. Ready in under 2 minutes.",
  },
  {
    icon: Mouse,
    num: "02",
    title: "Pick your optimizations",
    desc: "Enable the modules you want with a single toggle. Keyboard, mouse, network, system — or all at once.",
  },
  {
    icon: Trophy,
    num: "03",
    title: "Dominate the game",
    desc: "Feel the 1 ms input, stable FPS and a clean network. Just focus on winning.",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-label="How VEXORA works"
      className="cv-auto relative border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
            HOW IT WORKS
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            From download to victory{" "}
            <span className="text-neutral-500">in 2 minutes</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.15} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-[calc(50%+56px)] top-8 hidden h-px w-[calc(100%-112px)] bg-gradient-to-r from-white/25 to-white/[0.04] md:block"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.12] bg-[#0a0a0a] shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                  <s.icon className="h-6 w-6 text-white" />
                  <span className="font-display absolute -right-2 -top-2 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-black">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-400">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
