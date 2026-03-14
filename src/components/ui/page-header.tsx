import type { ReactNode } from "react";

export function PageHeader({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="shell-panel rounded-[18px] px-4 py-3 sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-main text-[28px] font-semibold tracking-[-0.07em] sm:text-[32px]">
          {title}
        </h1>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
