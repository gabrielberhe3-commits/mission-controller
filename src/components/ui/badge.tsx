import type { ReactNode } from "react";

const tones = {
  neutral: "border-black/8 bg-[#f1efeb] text-[#52565a]",
  sky: "border-[#c7d2dc] bg-[#eef3f7] text-[#466277]",
  emerald: "border-[#c6d5cd] bg-[#edf3ef] text-[#48634f]",
  amber: "border-[#d9d0bf] bg-[#f7f2e8] text-[#716043]",
  rose: "border-[#dfcaca] bg-[#f7eeee] text-[#7c5959]",
  copper: "border-[#ddcfbf] bg-[#f4efe8] text-[#74604a]",
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
