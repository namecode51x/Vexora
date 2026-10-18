"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  Check,
  CreditCard,
  Cpu,
  Gamepad2,
  Home,
  Info,
  Keyboard,
  MemoryStick,
  Minus,
  Mouse,
  Play,
  Repeat,
  RotateCcw,
  Settings,
  Square,
  Wifi,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { VexoraMark } from "./logo";
import { cn } from "@/lib/utils";

/* ─── Optimization modules (v1.2.0) ─── */
const MODULES = [
  {
    key: "waits" as const,
    icon: Keyboard,
    title: "No waits",
    desc: "Disables Filter Keys: no more waits on hold or repeat.",
  },
  {
    key: "repeat" as const,
    icon: Repeat,
    title: "Ready repeat",
    desc: "Minimum autorepeat delay (~250 ms). Hold only.",
  },
  {
    key: "rate" as const,
    icon: Zap,
    title: "Max rate",
    desc: "31 repeats per second while held. Does not touch the 1st press.",
  },
  {
    key: "pointer" as const,
    icon: Mouse,
    title: "1:1 pointer",
    desc: "Removes acceleration: changes feel, not latency.",
  },
];

const NAV = [
  { icon: Home, label: "Home", active: true },
  { icon: Zap, label: "Profiles" },
  { icon: Keyboard, label: "Keyboard" },
  { icon: Gamepad2, label: "Games" },
  { icon: CreditCard, label: "Plans" },
  { icon: Wrench, label: "Pro tools" },
  { icon: Settings, label: "Settings" },
  { icon: Info, label: "About" },
];

/* ─── Circular SVG gauge ─── */
function StatusGauge({ onCount }: { onCount: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const pct = (onCount / 4) * 100;

  return (
    <div className="relative mx-auto h-[150px] w-[150px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={R}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="7"
          fill="none"
        />
        <m.circle
          cx="60"
          cy="60"
          r={R}
          stroke="#ffffff"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - pct / 100) }}
          transition={{ duration: 1.2, ease: [0.22, 0.68, 0.31, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-white tabular-nums">
          {pct} <span className="text-lg font-medium text-neutral-400">%</span>
        </span>
        <span className="mt-0.5 text-[10px] tracking-wide text-neutral-500">
          {onCount} of 4 settings
        </span>
      </div>
    </div>
  );
}

/* ─── Main mockup ─── */
export function AppMockup() {
  const [toggles, setToggles] = useState({
    waits: true,
    repeat: true,
    rate: true,
    pointer: true,
  });
  // transitions.dev (27-toggle): .is-init se añade en la primera interacción
  // para que las keyframes "off" no se reproduzcan al cargar la página.
  const [switchInit, setSwitchInit] = useState(false);

  const onCount = useMemo(
    () => Object.values(toggles).filter(Boolean).length,
    [toggles]
  );
  const allOn = onCount === 4;
  const repeatDelay = toggles.repeat ? "≈250 ms" : "≈500 ms";
  const rate = toggles.rate ? "31 rep/s" : "11 rep/s";

  const activateAll = () =>
    setToggles({ waits: true, repeat: true, rate: true, pointer: true });

  return (
    <div
      className="card-glow relative overflow-hidden rounded-2xl border border-white/10 bg-[#070707] text-left"
      role="img"
      aria-label="VEXORA v1.2.0 application interface"
    >
      {/* Window bar */}
      <div className="flex items-center justify-end gap-4 border-b border-white/[0.06] px-5 py-3">
        <Minus className="h-3.5 w-3.5 text-neutral-600" />
        <Square className="h-3 w-3 text-neutral-600" />
        <X className="h-3.5 w-3.5 text-neutral-600" />
      </div>

      <div className="grid md:grid-cols-[190px_1fr] lg:grid-cols-[190px_1fr_250px]">
        {/* Sidebar */}
        <aside className="hidden flex-col justify-between border-r border-white/[0.06] p-5 md:flex">
          <div>
            <div className="mb-8 flex items-center gap-2 px-1">
              <VexoraMark className="h-6 w-6 text-white" glow={false} />
              <span className="font-display text-sm font-bold tracking-[0.3em] text-white">
                VEXORA
              </span>
            </div>
            <nav className="space-y-1">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] font-medium",
                    item.active
                      ? "bg-white/[0.08] text-white"
                      : "text-neutral-500"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
          <div className="mt-8 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 text-[12px] font-medium text-white">
              <span className="animate-status-pulse inline-block h-2 w-2 rounded-full bg-emerald-400" />
              System optimized
            </div>
            <p className="mt-1 pl-4 text-[10px] text-neutral-600">
              Everything working correctly
            </p>
          </div>
        </aside>

        {/* Main panel */}
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500">
            WELCOME TO VEXORA
          </p>
          <h3 className="font-display mt-2 text-2xl font-bold leading-tight text-white sm:text-[28px]">
            Kill the delay.
            <br />
            Feel the difference.
          </h3>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-neutral-400">
            VEXORA removes keyboard and mouse waits, tunes repeat and keeps the
            pointer 1:1. Everything is reversible with a backup.
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={activateAll}
              className={cn(
                "group flex flex-1 items-center justify-between rounded-full border py-3 pl-5 pr-4 text-sm font-semibold transition-all duration-300 sm:max-w-[340px]",
                allOn
                  ? "btn-glow border-white/60 bg-white text-black"
                  : "border-white/25 bg-white/[0.03] text-white hover:border-white/50 hover:bg-white/[0.07]"
              )}
            >
              <span className="flex items-center gap-3">
                {allOn ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
                {allOn ? "Optimization Active" : "Activate Optimization"}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                  allOn
                    ? "border-black/20 bg-black text-white"
                    : "border-white/20 group-hover:bg-white/10"
                )}
              >
                →
              </span>
            </button>
            <button
              onClick={activateAll}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.07]"
            >
              <RotateCcw className="h-4 w-4" />
              Restore
            </button>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
            Backup 2026-10-13 — “Restore” ready.
          </p>

          {/* Module cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {MODULES.map((m) => (
              <div
                key={m.key}
                className={cn(
                  "rounded-xl border p-4 transition-colors duration-300",
                  toggles[m.key]
                    ? "border-white/[0.12] bg-white/[0.04]"
                    : "border-white/[0.06] bg-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <m.icon className="h-[18px] w-[18px] text-white" />
                    <h4 className="text-[13px] font-semibold text-white">
                      {m.title}
                    </h4>
                  </div>
                  <Switch
                    checked={toggles[m.key]}
                    onCheckedChange={(v) => {
                      setSwitchInit(true);
                      setToggles((t) => ({ ...t, [m.key]: v }));
                    }}
                    data-on={toggles[m.key] ? "true" : "false"}
                    aria-label={m.title}
                    className={cn(
                      "t-toggle",
                      switchInit && "is-init",
                      "data-[state=checked]:bg-white data-[state=unchecked]:bg-white/15 scale-90"
                    )}
                  />
                </div>
                <p className="mt-2 text-[11.5px] leading-snug text-neutral-500">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 border-t border-white/[0.05] pt-4 text-[10.5px] leading-relaxed text-neutral-600">
            «VEXORA» applies Windows-compatible low-latency settings; it cannot
            remove the physical latency of the device, the game or the display.
          </p>
        </div>

        {/* Right panel */}
        <aside className="hidden flex-col gap-4 border-l border-white/[0.06] p-5 lg:flex">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[10px] font-medium tracking-[0.22em] text-neutral-500">
              SYSTEM STATUS
            </p>
            <div className="mt-4">
              <StatusGauge onCount={onCount} />
            </div>
            <p className="mt-3 text-center text-[10px] font-medium tracking-[0.2em] text-neutral-500">
              ACTIVE OPTIMIZATIONS
            </p>
            <div className="mt-3 space-y-2.5 border-t border-white/[0.06] pt-3.5 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-400">
                  <Cpu className="h-3.5 w-3.5" /> CPU
                </span>
                <span className="font-semibold text-white tabular-nums">0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-400">
                  <MemoryStick className="h-3.5 w-3.5" /> Memory
                </span>
                <span className="font-semibold text-white tabular-nums">0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-400">
                  <Repeat className="h-3.5 w-3.5" /> Repeat
                </span>
                <span className="font-semibold text-white tabular-nums">
                  {repeatDelay}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-400">
                  <Wifi className="h-3.5 w-3.5" /> Latency
                </span>
                <span className="font-semibold text-neutral-500">
                  Not measured
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[10px] font-medium tracking-[0.22em] text-neutral-500">
              RECENT ACTIVITY
            </p>
            <div className="mt-3 space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Repeat delay</span>
                <span className="font-semibold text-white tabular-nums">
                  {repeatDelay}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Rate</span>
                <span className="font-semibold text-white tabular-nums">
                  {rate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Backup</span>
                <span className="font-semibold text-white">
                  Saved 2026-10-13
                </span>
              </div>
            </div>
          </div>

          <div className="px-1 pb-1 pt-1">
            <p className="text-[11px] font-semibold text-neutral-400">
              VEXORA <span className="text-neutral-600">v1.2.0</span>
            </p>
            <p className="text-[10px] text-neutral-600">
              Performance optimization utility
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
