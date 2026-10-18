"use client";

import { useRef, useState } from "react";
import { Check, Download, KeyRound, Minus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadVexora } from "@/lib/download";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const COMPARISON = [
  { label: "Latency profile for keyboard and mouse", free: true },
  { label: "Remove Filter (keys, delay and repeat rate)", free: true },
  { label: "1:1 pointer and Gaming, Work and Programming profiles", free: true },
  { label: "Reversible backup and exact restore", free: true },
  { label: "Keyboard tester and device diagnostics", free: true },
  { label: "Wi-Fi power saving and ping diagnostics", free: true },
  { label: "A/B comparison and four languages", free: true },
  { label: "No ads, no telemetry, no accounts", free: true },
  { label: "Immediate TCP ACK, reversible (KB328890)", free: false },
  { label: "Precision measurement with a fine timer", free: false },
  { label: "Priority and multimedia scheduler for the game", free: false },
  { label: "Per-game profiles with automatic application", free: false },
  { label: "Real before / after measurement with your ping", free: false },
  { label: "Export and import your configuration", free: false },
];

export function Plans() {
  const { toast } = useToast();
  const [key, setKey] = useState("");

  // Orquestación transitions.dev (12-error-state-shake): .is-error en wrap +
  // input, .is-shaking reanudado con reflow, auto-revert tras --revert-hold.
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const revertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearError = () => {
    if (revertTimer.current) {
      clearTimeout(revertTimer.current);
      revertTimer.current = null;
    }
    wrapRef.current?.classList.remove("is-error");
    inputRef.current?.classList.remove("is-error");
  };

  const showError = () => {
    const wrap = wrapRef.current;
    const input = inputRef.current;
    if (!wrap || !input) return;

    wrap.classList.add("is-error");
    input.classList.add("is-error");

    // Replay el shake desde una línea base limpia.
    input.classList.remove("is-shaking");
    void input.offsetWidth; // force reflow
    input.classList.add("is-shaking");

    const cs = getComputedStyle(document.documentElement);
    const ms = (name: string, fb: number) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };

    const shakeMs = ms("--shake-dur-a", 80) * 2 + ms("--shake-dur-b", 60) * 2;
    setTimeout(() => input.classList.remove("is-shaking"), shakeMs + 20);

    // Auto-revert: mantener el tiempo justo para leer el mensaje.
    if (revertTimer.current) clearTimeout(revertTimer.current);
    const hold = ms("--revert-hold", 3000);
    revertTimer.current = setTimeout(() => {
      revertTimer.current = null;
      wrap.classList.remove("is-error");
      input.classList.remove("is-error");
    }, shakeMs + hold);
  };

  const buyPro = () => {
    toast({
      title: "Redirecting to checkout…",
      description: "VEXORA Pro · $5/month · cancel anytime.",
    });
  };

  const activateKey = () => {
    const value = key.trim().toUpperCase();
    if (value.startsWith("VEXORA-")) {
      clearError();
      toast({
        title: "Key activated",
        description: "Welcome to VEXORA Pro — all Pro tools unlocked.",
      });
      setKey("");
    } else {
      showError();
      toast({
        variant: "destructive",
        title: "Invalid key",
        description: "Format: VEXORA-XXXX-XXXX-XXXX",
      });
    }
  };

  return (
    <section id="plans" className="cv-auto relative py-20 sm:py-28">
      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-neutral-500">
            PLANS
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            The Free plan is not cut down: it keeps everything the app already
            did. Pro adds new features — we are not taking anything away from
            anyone.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          {/* Free */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-white/[0.09] bg-white/[0.02] p-7">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                <h3 className="font-display text-lg font-bold text-white">
                  Free
                </h3>
              </div>
              <p className="font-display mt-4 text-4xl font-bold text-white">
                $0
              </p>
              <p className="mt-1 text-xs text-neutral-500">forever</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">
                Keyboard, mouse, Wi-Fi, diagnostics and reversible backup.
              </p>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  downloadVexora();
                }}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] text-sm font-semibold text-white transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08]"
              >
                <Download className="h-4 w-4" />
                Download Free
              </a>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal delay={0.2}>
            <div className="card-glow relative flex h-full flex-col rounded-2xl border border-white/25 bg-white/[0.045] p-7">
              <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-wide text-black">
                <Sparkles className="h-3 w-3" />
                MOST POPULAR
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <h3 className="font-display text-lg font-bold text-white">
                  Pro
                </h3>
              </div>
              <p className="font-display mt-4 text-4xl font-bold text-white">
                $5{" "}
                <span className="text-base font-medium text-neutral-400">
                  / month
                </span>
              </p>
              <p className="mt-1 text-xs text-neutral-500">cancel anytime</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">
                Per-game profiles, TCP ACK, precision measurement, priority
                scheduler and config export.
              </p>
              <button
                onClick={buyPro}
                className="btn-glow mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white text-sm font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Buy Pro
              </button>
            </div>
          </Reveal>
        </div>

        {/* Comparison table */}
        <Reveal delay={0.15} className="mt-6">
          <div className="card-glow overflow-hidden rounded-2xl border border-white/10 bg-[#080808]">
            <div className="grid grid-cols-[1fr_64px_64px] items-center gap-2 border-b border-white/[0.07] px-6 py-4 sm:px-7">
              <h3 className="font-display text-sm font-bold text-white">
                What each plan includes
              </h3>
              <span className="text-center text-xs font-semibold text-neutral-400">
                Free
              </span>
              <span className="text-center text-xs font-semibold text-white">
                Pro
              </span>
            </div>
            <ul className="max-h-[420px] overflow-y-auto">
              {COMPARISON.map((row, i) => (
                <li
                  key={row.label}
                  className={cn(
                    "grid grid-cols-[1fr_64px_64px] items-center gap-2 px-6 py-3 text-[13px] transition-colors hover:bg-white/[0.025] sm:px-7",
                    i !== COMPARISON.length - 1 && "border-b border-white/[0.04]",
                    !row.free && "bg-white/[0.015]"
                  )}
                >
                  <span className={row.free ? "text-neutral-300" : "text-neutral-300"}>
                    {row.label}
                  </span>
                  <span className="text-center">
                    {row.free ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-700" />
                    )}
                  </span>
                  <span className="text-center">
                    <Check className="mx-auto h-4 w-4 text-emerald-400" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Key activation */}
        <Reveal delay={0.2} className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-white" />
              <h3 className="font-display text-sm font-bold text-white">
                Already have a Pro key?
              </h3>
            </div>
            <div className="t-input-wrap relative">
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    if (wrapRef.current?.classList.contains("is-error"))
                      clearError();
                  }}
                  onKeyDown={(e) => e.key === "Enter" && activateKey()}
                  placeholder="Paste your VEXORA-XXXX-XXXX key here"
                  aria-label="VEXORA Pro license key"
                  className="t-input h-12 w-full flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-white/35"
                />
                <button
                  onClick={activateKey}
                  className="h-12 rounded-full bg-white px-7 text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Activate key
                </button>
              </div>
              <p className="relative mt-3 text-[11px] text-neutral-600">
                <span className="vexora-key-hint">
                  Keys work offline. No account, no telemetry — just paste and
                  go.
                </span>
                <span className="t-error-msg absolute inset-0 text-red-400" role="alert">
                  Invalid key — expected format: VEXORA-XXXX-XXXX-XXXX.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
