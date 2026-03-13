import type { ReactNode } from "react";

const tones = {
  neutral: "border-white/10 bg-[#111] text-[#d6d6d6]",
  sky: "border-white/12 bg-[#151515] text-white",
  emerald: "border-white/8 bg-[#0e0e0e] text-[#cecece]",
  amber: "border-white/14 bg-white text-black",
  rose: "border-white/8 bg-[#0d0d0d] text-[#b4b4b4]",
  copper: "border-white/10 bg-[#121212] text-[#dedede]",
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
      className={`inline-flex items-center rounded-[8px] border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
