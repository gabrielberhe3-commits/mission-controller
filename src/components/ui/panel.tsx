import type { ReactNode } from "react";

export function Panel({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`surface-panel rounded-[18px] p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/8 pb-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f9cab]">
            {title}
          </p>
          <h2 className="mt-1 text-sm font-medium leading-6 text-[#dbe3ea]">{description}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
