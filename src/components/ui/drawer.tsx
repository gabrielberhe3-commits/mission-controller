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
        className={`absolute inset-0 bg-[rgba(28,29,31,0.18)] backdrop-blur-[2px] transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-lg border-l border-black/8 bg-[#f8f7f4] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.14)] transition duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/8 pb-4">
          <div>
            <h2 className="text-[24px] font-semibold tracking-[-0.05em] text-[#191a1d]">{title}</h2>
            {description ? <p className="mt-2 max-w-md text-sm text-[#737679]">{description}</p> : null}
          </div>
          <button
            className="rounded-[10px] border border-black/8 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4f5256] hover:bg-white"
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
