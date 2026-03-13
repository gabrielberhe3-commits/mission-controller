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
    <section
      className={`rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,31,0.92),rgba(10,14,19,0.88))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fa2b8]">
            {title}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{description}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
