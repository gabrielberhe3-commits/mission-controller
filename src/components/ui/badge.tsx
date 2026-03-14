import type { ReactNode } from "react";

const tones = {
  neutral: "border-white/6 bg-[#090909] text-[#cfcfcf]",
  sky: "border-white/7 bg-[#0b0b0b] text-[#f1f1f1]",
  emerald: "border-white/6 bg-[#080808] text-[#cdcdcd]",
  amber: "border-white/12 bg-white text-black",
  rose: "border-white/6 bg-[#080808] text-[#b8b8b8]",
  copper: "border-white/6 bg-[#0a0a0a] text-[#dedede]",
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
      className={`inline-flex items-center rounded-[7px] border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
