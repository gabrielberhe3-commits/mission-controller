import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="shell-panel rounded-[18px] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.07em] text-white sm:text-[34px]">
            {title}
          </h1>
          {description ? <p className="mt-2 text-sm text-[#878787]">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
