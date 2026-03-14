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
    <section className={`surface-panel rounded-[18px] p-4 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-black/6 pb-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#18191b]">{title}</p>
          <h2 className="mt-1 text-xs uppercase tracking-[0.16em] text-[#737679]">{description}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
