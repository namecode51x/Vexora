"use client";

import { Quote, Star } from "lucide-react";
import { Reveal } from "./reveal";

const TESTIMONIALS = [
  {
    quote:
      "I went from 140 to 240 FPS in CS2 and the input lag vanished completely. It's literally like playing on another PC.",
    name: "Alex \"Knot\" R.",
    role: "CS2 Player · FACEIT Lvl 10",
    initials: "AK",
  },
  {
    quote:
      "The jitter on my network was gone from day one. Shots that used to fail because of packet loss now always land.",
    name: "Marta \"Vex\" G.",
    role: "VALORANT Immortal",
    initials: "MV",
  },
  {
    quote:
      "The mouse difference is instant. The aim sticks to the cursor and frametimes are dead flat. Highly recommended.",
    name: "Diego \"Sniper\" L.",
    role: "Content Creator · Apex Legends",
    initials: "DL",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="cv-auto relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
            REVIEWS
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            The community already feels it
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-white text-white" />
            ))}
            <span className="ml-2 text-sm text-neutral-400">
              4.9/5 — 50,000+ gamers
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="group relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.035]">
                <Quote className="h-5 w-5 text-white/25 transition-colors duration-500 group-hover:text-white/50" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-200">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-display text-xs font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
