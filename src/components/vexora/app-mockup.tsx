"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  Check,
  CreditCard,
  Gamepad2,
  Home,
  Info,
  Keyboard,
  Minus,
  Mouse,
  Play,
  Repeat,
  RotateCcw,
  Settings,
  Square,
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

/* ─── Rim light cenital (1 px, se funde en los extremos) ───
   La luz que cae desde arriba: la firma del StyleKit. */
function Rim({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 14%, rgba(255,255,255,0.16) 86%, transparent)",
      }}
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px",
        className
      )}
    />
  );
}

/* ─── Stat tile (paridad con PaintStatusCard del app C++) ───
   Valor grande, etiqueta pequeña, micro-barra SOLO cuando el dato es real.
   Latencia se mantiene honesta: “Not measured”, sin barra. */
function StatTile({
  label,
  value,
  barPct,
  muted,
}: {
  label: string;
  value: string;
  barPct?: number;
  muted?: boolean;
}) {
  const hasBar = typeof barPct === "number";
  const pct = hasBar ? Math.min(1, Math.max(0, barPct as number)) : 0;
  return (
    <div className="relative overflow-hidden rounded-[var(--ve-radius-sm)] border border-white/[0.07] bg-white/[0.02] p-3">
      <Rim className="inset-x-2" />
      <p className="text-[9px] font-semibold tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <p
        className={cn(
          "font-display mt-1.5 leading-none",
          muted
            ? "text-[10.5px] font-semibold text-neutral-400"
            : "text-[17px] font-bold text-white tabular-nums"
        )}
      >
        {value}
      </p>
      {hasBar && (
        <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-white/75 transition-[width] duration-700 ease-out"
            style={{ width: `${Math.round(pct * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Trazo de tasa de repetici\u00F3n ───
   Solo dibuja el ESTADO real del ajuste (11 -> 31 rep/s); nada historico inventado. */
function RateTrace({ maxed }: { maxed: boolean }) {
  const yHigh = 9;
  const pts = maxed ? "2,26 46,26 50,9 118,9" : "2,26 118,26";
  return (
    <div className="relative overflow-hidden rounded-[var(--ve-radius-sm)] border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <Rim className="inset-x-2" />
      <p className="text-[9px] font-semibold tracking-[0.2em] text-neutral-500">
        REPEAT RATE
      </p>
      <svg viewBox="0 0 120 34" className="mt-1 h-8 w-full">
        {/* siluetas: contacto oscuro + trazo luminoso encima */}
        <polyline
          points={pts}
          fill="none"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polyline
          points={pts}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.25"
          strokeLinejoin="round"
          opacity="0.9"
          style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.4))" }}
        />
        <circle
          cx="118"
          cy={maxed ? yHigh : 26}
          r="2.25"
          fill="#ffffff"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))" }}
        />
      </svg>
    </div>
  );
}

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
  /* micro-barra honesta: refleja el estado real del ajuste (31 = lleno) */
  const rateBar = toggles.rate ? 1 : 0.35;

  const activateAll = () =>
    setToggles({ waits: true, repeat: true, rate: true, pointer: true });

  return (
    <div
      className="ve-mist card-glow relative overflow-hidden rounded-[var(--ve-radius-xl)] border border-white/10 bg-[#070707] text-left"
      role="img"
      aria-label="VEXORA v1.2.0 application interface"
    >
      {/* Window bar */}
      <div className="relative z-10 flex items-center justify-end gap-4 border-b border-white/[0.07] bg-white/[0.015] px-5 py-3">
        <Minus className="h-3.5 w-3.5 text-neutral-600" />
        <Square className="h-3 w-3 text-neutral-600" />
        <X className="h-3.5 w-3.5 text-neutral-600" />
      </div>

      <div className="relative z-10 grid md:grid-cols-[190px_1fr] lg:grid-cols-[190px_1fr_250px]">
        {/* Sidebar: columna con veladura vertical (luz arriba, base abajo) */}
        <aside className="ve-veil-side hidden flex-col justify-between border-r border-white/[0.06] p-5 md:flex">
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
                    "relative flex items-center gap-2.5 rounded-[var(--ve-radius-sm)] px-3 py-2 text-[12.5px] font-medium transition-colors duration-150",
                    item.active
                      ? "ve-face border border-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_2px_8px_rgba(0,0,0,0.45)]"
                      : "text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1/2 h-5 w-[2.5px] -translate-y-1/2 rounded-full transition-opacity",
                      item.active ? "bg-white opacity-90" : "opacity-0"
                    )}
                  />
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
            {/* CTA hero: vidrio con cuerpo (veladura + rim). En estado de exito
                se llena con veladura metalica blanca (paridad de BtnHero). */}
            <button
              onClick={activateAll}
              className={cn(
                "group relative flex flex-1 items-center justify-between overflow-hidden rounded-full border py-3 pl-5 pr-4 text-sm font-semibold transition-all duration-200 sm:max-w-[340px]",
                allOn
                  ? "border-white/70 bg-gradient-to-b from-white to-neutral-300 text-black shadow-[0_10px_30px_-10px_rgba(255,255,255,0.30),0_10px_24px_rgba(0,0,0,0.35)]"
                  : "border-white/20 bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.07] hover:shadow-[0_14px_32px_-14px_rgba(0,0,0,0.9)]"
              )}
            >
              {!allOn && <Rim className="inset-x-6" />}
              <span className="relative flex items-center gap-3">
                {allOn ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
                {allOn ? "Optimization Active" : "Activate Optimization"}
              </span>
              <span
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
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
              className="ve-face relative overflow-hidden rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:shadow-[0_12px_26px_-14px_rgba(0,0,0,0.9)]"
            >
              <Rim className="inset-x-4" />
              <span className="relative flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Restore
              </span>
            </button>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
            Backup 2026-10-13 — “Restore” ready.
          </p>

          {/* Module cards: vidrio + rim + lift al hover (paridad de PaintToggleCard) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {MODULES.map((m) => (
              <div
                key={m.key}
                className={cn(
                  "ve-hover relative overflow-hidden rounded-[var(--ve-radius-md)] border p-4",
                  toggles[m.key]
                    ? "ve-face border-white/[0.12] shadow-[var(--ve-elev-1)]"
                    : "border-white/[0.06] bg-white/[0.008]"
                )}
              >
                <Rim className="inset-x-3" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* roundel del icono: chip con volumen */}
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--ve-radius-sm)] border transition-colors duration-200",
                        toggles[m.key]
                          ? "border-white/[0.14] bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                          : "border-white/[0.07] bg-white/[0.03]"
                      )}
                    >
                      <m.icon className="h-[14px] w-[14px] text-white" />
                    </span>
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
                <p className="relative mt-2 text-[11.5px] leading-snug text-neutral-500">
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
          {/* Estado: gauge elevado + tiles 2x2 + trazo honesto */}
          <div className="ve-face relative overflow-hidden rounded-[var(--ve-radius-md)] border border-white/[0.08] bg-[#0a0a0a] p-4 shadow-[var(--ve-elev-1)]">
            <Rim className="inset-x-3" />
            <p className="relative text-[10px] font-medium tracking-[0.22em] text-neutral-500">
              SYSTEM STATUS
            </p>
            <div className="relative mt-4">
              <StatusGauge onCount={onCount} />
            </div>
            <div className="relative mt-4 grid grid-cols-2 gap-2">
              <StatTile label="CPU" value="0%" barPct={0} />
              <StatTile label="MEMORY" value="0%" barPct={0} />
              <StatTile label="REPEAT" value={repeatDelay} barPct={rateBar} />
              <StatTile label="LATENCY" value="Not measured" muted />
            </div>
            <div className="relative mt-2">
              <RateTrace maxed={toggles.rate} />
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="ve-face relative overflow-hidden rounded-[var(--ve-radius-md)] border border-white/[0.08] bg-[#0a0a0a] p-4 shadow-[var(--ve-elev-1)]">
            <Rim className="inset-x-3" />
            <p className="relative text-[10px] font-medium tracking-[0.22em] text-neutral-500">
              RECENT ACTIVITY
            </p>
            <div className="relative mt-3 space-y-2 text-[11.5px]">
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
