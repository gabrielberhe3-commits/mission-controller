import type { ReactNode } from "react";

type Item<T extends string> = {
  label: string;
  value: T;
  meta?: ReactNode;
};

export function SegmentedControl<T extends string>({
  items,
  value,
  onChange,
}: {
  items: Item<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-white/10 bg-black/20 p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
              active
                ? "border border-[rgba(200,163,106,0.28)] bg-[rgba(200,163,106,0.16)] text-[#f3e3c2]"
                : "border border-transparent text-[#c7d3df] hover:border-white/8 hover:bg-white/[0.05]"
            }`}
          >
            <span>{item.label}</span>
            {item.meta ? <span className="ml-2 text-[11px] opacity-75">{item.meta}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
