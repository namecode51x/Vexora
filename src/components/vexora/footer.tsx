"use client";

import { downloadVexora } from "@/lib/download";
import { VexoraLogo } from "./logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "FPS & Delay", href: "#fps" },
      { label: "Download", href: "#download" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.07] bg-[#030303]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <VexoraLogo />
            <p className="font-display mt-4 text-sm font-semibold tracking-[0.2em] text-white">
              EVERY MILLISECOND COUNTS.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
              The ultimate optimization utility for gamers. Less delay, more
              FPS, a real edge.
            </p>
          </div>

          {/* Links */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-neutral-500">
                {col.title.toUpperCase()}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={
                        l.label === "Download"
                          ? (e) => {
                              e.preventDefault();
                              downloadVexora();
                            }
                          : undefined
                      }
                      className="text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © 2025 VEXORA — Performance Optimization Utility. All rights
            reserved.
          </p>
          <p className="font-display text-[10px] font-semibold tracking-[0.4em] text-neutral-600">
            FASTER INPUTS. BETTER RESULTS.
          </p>
        </div>
      </div>
    </footer>
  );
}
