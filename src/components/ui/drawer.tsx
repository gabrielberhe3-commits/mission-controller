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
  description: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        className={`absolute inset-0 bg-black/55 transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-xl border-l border-white/10 bg-[linear-gradient(180deg,rgba(14,18,24,0.98),rgba(8,11,15,0.98))] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] transition duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8ea0b5]">
              Quick capture
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#98aabd]">{description}</p>
          </div>
          <button
            className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-[#cdd8e2] hover:bg-white/[0.06]"
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
