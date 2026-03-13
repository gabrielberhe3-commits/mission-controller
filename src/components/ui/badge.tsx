import type { ReactNode } from "react";

const tones = {
  neutral: "bg-white/[0.05] text-zinc-200 ring-white/10",
  sky: "bg-sky-400/10 text-sky-200 ring-sky-300/16",
  emerald: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/16",
  amber: "bg-amber-300/12 text-amber-100 ring-amber-300/16",
  rose: "bg-rose-400/10 text-rose-200 ring-rose-300/16",
  copper: "bg-[rgba(178,144,97,0.14)] text-[#efd1a2] ring-[rgba(178,144,97,0.24)]",
} as const;

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[10px] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
