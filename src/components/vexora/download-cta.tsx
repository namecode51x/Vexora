"use client";

import { Download, Monitor, RefreshCw, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadVexora, DOWNLOAD_FILE, DOWNLOAD_SIZE_MB } from "@/lib/download";
import { VexoraMark } from "./logo";
import { Reveal } from "./reveal";

const CHIPS = [
  { icon: Monitor, label: "Windows 10 / 11 · 64-bit" },
  { icon: ShieldCheck, label: "Free plan forever" },
  { icon: RefreshCw, label: "Automatic updates" },
];

export function DownloadCta() {
  const { toast } = useToast();

  const handleDownload = () => {
    // Dispara la descarga real del instalador servido en /public/downloads
    downloadVexora();

    toast({
      title: "Download started",
      description: `${DOWNLOAD_FILE} (${DOWNLOAD_SIZE_MB} MB) — Enjoy the edge!`,
    });
  };

  return (
    <section id="download" className="cv-auto noise relative overflow-hidden py-24 sm:py-32">
      {/* Glows */}
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[150px]" />
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      {/* Watermark */}
      <VexoraMark
        glow={false}
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rotate-12 text-white/[0.03]"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-display text-xs font-semibold tracking-[0.45em] text-neutral-500">
            EVERY MILLISECOND COUNTS
          </p>
          <h2 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Ready to feel
            <br />
            <span className="text-glow">the difference?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-neutral-400">
            Join 50,000+ players who already killed the delay. Your PC can do
            much more — VEXORA proves it in the very first minute.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={handleDownload}
            className="btn-glow group mx-auto mt-10 flex h-[64px] items-center gap-3 rounded-full bg-white px-10 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            <Download className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download VEXORA — Free
          </button>
          <p className="mt-4 text-xs text-neutral-600">
            VERSION 1.2.0 · {DOWNLOAD_SIZE_MB} MB · NO SIGN-UP
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-400"
              >
                <c.icon className="h-3.5 w-3.5 text-white" />
                {c.label}
              </span>
            ))}
          </div>
          <a
            href="#plans"
            className="mt-6 inline-block text-xs font-semibold text-neutral-500 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Compare Free vs Pro →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
