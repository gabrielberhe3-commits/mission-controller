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
        className={`absolute inset-0 bg-black/80 transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-lg border-l border-white/10 bg-[#040404] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4">
          <div>
            <h2 className="text-[24px] font-semibold tracking-[-0.05em] text-white">{title}</h2>
            {description ? <p className="mt-2 max-w-md text-sm text-[#8a8a8a]">{description}</p> : null}
          </div>
          <button
            className="rounded-[10px] border border-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d5d5d5] hover:bg-[#101010]"
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
