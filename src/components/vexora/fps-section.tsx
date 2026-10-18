"use client";

import { m } from "framer-motion";
import { Activity, Gamepad2, Timer, TrendingUp } from "lucide-react";
import { Reveal } from "./reveal";

const GAMES = [
  { name: "CS2", before: 184, after: 240 },
  { name: "VALORANT", before: 152, after: 244 },
  { name: "Fortnite", before: 121, after: 187 },
  { name: "Warzone", before: 96, after: 141 },
];

const MAX = 250;

const BULLETS = [
  {
    icon: TrendingUp,
    title: "Flat frametimes",
    desc: "Goodbye micro-stutters: flat frametimes even during the most intense fights.",
  },
  {
    icon: Timer,
    title: "Input lag from 12 ms to 1 ms",
    desc: "Your click lands before you blink. A real edge in every single duel.",
  },
  {
    icon: Gamepad2,
    title: "Per-game profiles",
    desc: "Priority and multimedia scheduler for each game, applied automatically the moment you launch it.",
  },
];

export function FpsSection() {
  return (
    <section id="fps" className="cv-auto noise relative overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div className="absolute left-[-180px] top-1/4 h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
                REAL PERFORMANCE
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Raise your FPS.
                <br />
                <span className="text-glow">Drop your delay.</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400">
                Average community benchmarks before and after enabling VEXORA
                on the same hardware. No overclocking, no risks: just smart
                optimization.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {BULLETS.map((b, i) => (
                <Reveal key={b.title} delay={0.15 + i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                      <b.icon className="h-[18px] w-[18px] text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <Activity className="h-5 w-5 text-white" />
                <div className="text-sm">
                  <span className="text-neutral-400">Input lag: </span>
                  <span className="font-semibold text-neutral-500 line-through">12 ms</span>
                  <span className="mx-1.5 text-neutral-600">→</span>
                  <span className="font-display text-lg font-bold text-white">1 ms</span>
                  <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-black">
                    −92%
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Comparison chart */}
          <Reveal delay={0.2}>
            <div className="card-glow rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold tracking-wide text-white">
                  AVG FPS PER GAME
                </h3>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-neutral-400">
                  Same PC · Vexora ON
                </span>
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center gap-5 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-neutral-600" />
                  Without VEXORA
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  With VEXORA
                </span>
              </div>

              <div className="mt-7 space-y-6">
                {GAMES.map((g, i) => (
                  <div key={g.name}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{g.name}</span>
                      <span className="text-neutral-500 tabular-nums">
                        {g.before}{" "}
                        <span className="text-neutral-600">→</span>{" "}
                        <span className="font-bold text-white">{g.after} FPS</span>
                        <span className="ml-2 rounded-full bg-white/[0.07] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          +{Math.round(((g.after - g.before) / g.before) * 100)}%
                        </span>
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {/* Without Vexora bar */}
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                        <m.div
                          className="h-full rounded-full bg-neutral-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(g.before / MAX) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.1 + i * 0.08, ease: [0.22, 0.68, 0.31, 1] }}
                        />
                      </div>
                      {/* With Vexora bar */}
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                        <m.div
                          className="h-full rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.45)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(g.after / MAX) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, delay: 0.25 + i * 0.08, ease: [0.22, 0.68, 0.31, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-neutral-600">
                Results based on community benchmarks. Values may vary
                depending on your hardware and configuration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
