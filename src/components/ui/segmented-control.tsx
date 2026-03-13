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
    <div className="inline-flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/20 p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              active
                ? "bg-[linear-gradient(135deg,#f4ddb4,#d59f61)] text-[#11151a]"
                : "text-[#c7d3df] hover:bg-white/[0.05]"
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
