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
    <div className="inline-flex flex-wrap gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--button-secondary-bg)] p-1">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-[7px] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              active
                ? "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]"
                : "text-[var(--button-ghost-text)] hover:bg-[var(--button-secondary-hover)] hover:text-[var(--button-ghost-hover-text)]"
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
