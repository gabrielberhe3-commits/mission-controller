import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="surface-panel rounded-[18px] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a7a7a]">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-[24px] font-semibold tracking-[-0.05em] text-white sm:text-[28px]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#8e8e8e]">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
