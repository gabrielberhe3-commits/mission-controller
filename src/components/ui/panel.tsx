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
      <div className="border-subtle mb-4 flex items-start justify-between gap-4 border-b pb-3">
        <div className="min-w-0">
          <p className="text-main text-sm font-medium">{title}</p>
          <h2 className="text-muted mt-1 text-xs uppercase tracking-[0.16em]">{description}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
