import type { ReactNode } from "react";

export function Drawer({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        className={`absolute inset-0 bg-[var(--drawer-backdrop)] backdrop-blur-[2px] transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-lg border-l border-[var(--border)] bg-[var(--drawer-surface)] p-5 shadow-[var(--shadow-drawer)] transition duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="border-subtle flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-main text-[24px] font-semibold tracking-[-0.05em]">{title}</h2>
            {description ? <p className="text-muted mt-2 max-w-md text-sm">{description}</p> : null}
          </div>
          <button
            className="rounded-[10px] border border-[var(--border)] bg-[var(--button-secondary-bg)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--button-secondary-text)] hover:bg-[var(--button-secondary-hover)]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </aside>
    </div>
  );
}
