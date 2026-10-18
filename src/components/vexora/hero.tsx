"use client";

import { m } from "framer-motion";
import { ChevronDown, Download, Monitor, ShieldCheck, Zap } from "lucide-react";
import { downloadVexora, DOWNLOAD_SIZE_MB } from "@/lib/download";
import { AppMockup } from "./app-mockup";

const ease = [0.21, 0.65, 0.35, 1] as const;

export function Hero() {
  return (
    <section id="home" className="noise relative overflow-hidden pb-20 pt-36 sm:pt-40">
      {/* Background: grid + radial glows */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[140px]" />
      <div className="absolute right-[-200px] top-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.04] blur-[120px]" />

      {/* Speed streaks */}
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px overflow-hidden">
        <div className="animate-streak h-px w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main copy */}
        <div className="mx-auto max-w-3xl text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-neutral-300"
          >
            <Zap className="h-3.5 w-3.5 text-white" />
            VEXORA v1.2.0 — Performance optimization for Windows
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Kill the delay.
            <br />
            <span className="text-glow text-white">Feel the difference.</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg"
          >
            VEXORA removes keyboard and mouse waits, boosts your FPS and
            stabilizes your Wi-Fi. Everything is reversible with a backup.{" "}
            <span className="font-semibold text-white">
              Every millisecond counts.
            </span>
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
          >
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                downloadVexora();
              }}
              className="btn-glow group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 text-base font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download for Windows
            </a>
            <a
              href="#features"
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 text-base font-semibold text-white transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] sm:w-auto"
            >
              Explore features
              <ChevronDown className="h-4 w-4" />
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500"
          >
            <span className="flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5" /> Windows 10 / 11
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% free & safe
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Only {DOWNLOAD_SIZE_MB} MB
            </span>
          </m.div>
        </div>

        {/* App mockup */}
        <m.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          {/* Glow behind mockup */}
          <div className="absolute -inset-8 rounded-[40px] bg-white/[0.05] blur-3xl" aria-hidden="true" />

          {/* Floating phrase left */}
          <div className="animate-float absolute -left-24 top-16 hidden xl:block" aria-hidden="true">
            <p className="font-display text-[11px] font-semibold tracking-[0.4em] text-neutral-500 [writing-mode:vertical-lr]">
              FASTER INPUTS
            </p>
          </div>
          {/* Floating phrase right */}
          <div className="animate-float absolute -right-24 bottom-24 hidden xl:block [animation-delay:1.5s]" aria-hidden="true">
            <p className="font-display text-[11px] font-semibold tracking-[0.4em] text-neutral-500 [writing-mode:vertical-rl]">
              BETTER RESULTS
            </p>
          </div>

          <AppMockup />
        </m.div>
      </div>
    </section>
  );
}
