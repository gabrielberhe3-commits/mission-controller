import type { ReactNode } from "react";

const tones = {
  neutral: "tone-neutral",
  sky: "tone-sky",
  emerald: "tone-emerald",
  amber: "tone-amber",
  rose: "tone-rose",
  copper: "tone-copper",
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
