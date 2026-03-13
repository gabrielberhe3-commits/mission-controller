import type { ReactNode } from "react";

const tones = {
  neutral: "bg-white/8 text-zinc-200 ring-white/10",
  sky: "bg-sky-400/12 text-sky-200 ring-sky-300/20",
  emerald: "bg-emerald-400/12 text-emerald-200 ring-emerald-300/20",
  amber: "bg-amber-300/14 text-amber-100 ring-amber-300/20",
  rose: "bg-rose-400/12 text-rose-200 ring-rose-300/20",
  copper: "bg-[rgba(214,122,56,0.16)] text-[#f5c79e] ring-[rgba(214,122,56,0.25)]",
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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
