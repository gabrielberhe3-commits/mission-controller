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
    <div className="surface-panel rounded-[18px] p-5 sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c8a876]">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-white sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9cabb9]">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
