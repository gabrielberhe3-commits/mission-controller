"use client";

import { usePathname } from "next/navigation";
import { navigationItems, workspaceMeta } from "@/data/mission-control";

export function Topbar() {
  const pathname = usePathname();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[rgba(10,14,19,0.78)] px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fa2b8]">
          {workspaceMeta.snapshotDate}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">{current.label}</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-[linear-gradient(135deg,#f1dfbf,#d1a56a)] px-4 py-2 text-sm font-semibold text-[#11151a] transition hover:brightness-105">
          Quick add
        </button>
        <button className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-[#dbe5ee] transition hover:bg-white/[0.05]">
          Import calendar
        </button>
      </div>
    </div>
  );
}
