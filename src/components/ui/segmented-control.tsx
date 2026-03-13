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
    <div className="inline-flex flex-wrap gap-1 rounded-[14px] border border-white/10 bg-[#0d1115] p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-[10px] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              active
                ? "border border-[rgba(178,144,97,0.3)] bg-[rgba(178,144,97,0.14)] text-[#efd8b0]"
                : "border border-transparent text-[#bec8d1] hover:border-white/8 hover:bg-white/[0.05]"
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
