import type { ReactNode } from "react";

const tones = {
  neutral: "bg-[#131313] text-[#d8d8d8] ring-white/8",
  sky: "bg-[#131313] text-[#e8e8e8] ring-white/10",
  emerald: "bg-[#101010] text-[#d0d0d0] ring-white/8",
  amber: "bg-[#141414] text-white ring-white/10",
  rose: "bg-[#0e0e0e] text-[#bcbcbc] ring-white/8",
  copper: "bg-[#141414] text-white ring-white/10",
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
