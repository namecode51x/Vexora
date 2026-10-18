import { cn } from "@/lib/utils";

export function VexoraMark({
  className,
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", glow && "drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]", className)}
    >
      {/* Estelas del cometa */}
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M41 17 L60 37" strokeWidth="11" />
        <path d="M16 38 L53 50" strokeWidth="11" />
        <path d="M30 63 L55 69" strokeWidth="11" />
      </g>
      {/* Cabeza del cometa */}
      <circle
        cx="67"
        cy="56"
        r="16"
        stroke="currentColor"
        strokeWidth="12.5"
        fill="none"
      />
    </svg>
  );
}

export function VexoraLogo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <VexoraMark className={cn("h-7 w-7 text-white", markClassName)} />
      <span className="font-display text-lg font-bold tracking-[0.28em] text-white select-none">
        VEXORA
      </span>
    </span>
  );
}
