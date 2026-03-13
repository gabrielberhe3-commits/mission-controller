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
    <div className="inline-flex flex-wrap gap-1 rounded-[12px] border border-white/8 bg-[#060606] p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-[8px] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${
              active
                ? "bg-white text-black"
                : "text-[#8d8d8d] hover:bg-[#111] hover:text-white"
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
