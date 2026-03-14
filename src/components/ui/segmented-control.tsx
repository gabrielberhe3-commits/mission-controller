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
    <div className="inline-flex flex-wrap gap-1 rounded-[10px] border border-black/8 bg-white/78 p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-[7px] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              active
                ? "bg-[#1d1f22] text-[#fbfaf7]"
                : "text-[#6d7074] hover:bg-white hover:text-[#191a1d]"
            }`}
          >
            <span>{item.label}</span>
            {item.meta ? <span className="ml-2 opacity-70">{item.meta}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
