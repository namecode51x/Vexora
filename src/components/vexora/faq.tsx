"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const FAQS = [
  {
    q: "Is VEXORA really free?",
    a: "Yes — and the Free plan is forever, not a trial. It keeps everything the app already did: keyboard, mouse, Wi-Fi, diagnostics and reversible backup. We never take anything away from anyone.",
  },
  {
    q: "What does Pro add over Free?",
    a: "Pro ($5/month, cancel anytime) unlocks the power tools: immediate TCP ACK (reversible, KB328890), precision measurement with a fine timer, priority and multimedia scheduler for your games, per-game profiles with automatic application, real before/after ping measurement and configuration export/import.",
  },
  {
    q: "Is it safe for my PC?",
    a: "Completely safe. VEXORA never touches system files destructively: every change is reversible with a single click from the app itself. No overclocking, no warranty risk.",
  },
  {
    q: "How many FPS can I gain?",
    a: "It depends on your hardware, but the community reports improvements between 20% and 60%. On PCs with lots of background processes the gains are even bigger, because VEXORA frees up RAM and CPU.",
  },
  {
    q: "Does it lower my ping?",
    a: "Physical ping is determined by your connection, but VEXORA stabilizes the route: it eliminates jitter, reduces packet loss and prioritizes game traffic. The result: a constant ping and a much smoother experience.",
  },
  {
    q: "Does it work on my version of Windows?",
    a: "VEXORA works on Windows 10 and Windows 11 (64-bit). The installer weighs only 12 MB and updates are fully automatic.",
  },
  {
    q: "Is it like other 'optimizers' I've seen?",
    a: "No. VEXORA is designed specifically to reduce gaming input latency: every tweak is measured in microseconds and you can see the impact in real time inside the app. Zero placebo.",
  },
];

export function Faq() {
  // Acordeón de un solo abierto (igual que type="single" collapsible).
  // transitions.dev (21-accordion): data-open en el ítem gobierna el
  // grid-template-rows 0fr ↔ 1fr y el flip vertical del chevron.
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="cv-auto relative border-t border-white/[0.06] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
            FAQ
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="w-full">
            {FAQS.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className="t-acc border-b border-white/[0.08] last:border-b-0"
                  data-open={isOpen ? "true" : "false"}
                >
                  <h3 className="m-0 flex">
                    <button
                      type="button"
                      className="t-acc-head flex flex-1 items-start justify-between gap-4 rounded-md py-5 text-left font-display text-base font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                    >
                      {f.q}
                      <span className="t-acc-chevron shrink-0 text-neutral-500">
                        <svg
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 6.5L8 10.5L12 6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div className="t-acc-panel" id={`faq-panel-${i}`}>
                    <div className="t-acc-panel-inner">
                      <p className="pr-8 pb-5 text-sm leading-relaxed text-neutral-400">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
