"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { downloadVexora } from "@/lib/download";
import { VexoraLogo } from "./logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "#fps", label: "FPS & Delay" },
  { href: "#plans", label: "Plans" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  // Orquestación transitions.dev (05-menu-dropdown): .is-open al abrir,
  // .is-closing al cerrar con limpieza tras --dropdown-close-dur.
  const openMenu = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuClosing(true);
    const closeMs =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--dropdown-close-dur"
        )
      ) || 150;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuClosing(false), closeMs);
  };

  const menuVisible = menuOpen || menuClosing;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-[#050505]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <a href="#home" aria-label="VEXORA - Home">
          <VexoraLogo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-neutral-400 transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              downloadVexora();
            }}
            className="btn-glow group hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download
          </a>

          {/* Mobile toggle — icon swap (09): ambos iconos apilados en la misma celda */}
          <button
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08] md:hidden"
          >
            <span className="t-icon-swap" data-state={menuOpen ? "b" : "a"}>
              <span className="t-icon" data-icon="a">
                <Menu className="h-5 w-5" />
              </span>
              <span className="t-icon" data-icon="b">
                <X className="h-5 w-5" />
              </span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu — menu-dropdown (05): crece desde el trigger, origen top-center */}
      <div
        id="mobile-menu"
        data-origin="top-center"
        aria-hidden={!menuVisible}
        className={cn(
          "t-dropdown absolute inset-x-0 top-full z-10 border-b border-white/[0.07] bg-[#050505]/95 backdrop-blur-xl md:hidden",
          menuOpen && "is-open",
          menuClosing && "is-closing"
        )}
      >
        {menuVisible && (
          <ul className="space-y-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  downloadVexora();
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black"
              >
                <Download className="h-4 w-4" />
                Download VEXORA
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
