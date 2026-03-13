"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { openDrawer } = useWorkspace();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];

  return (
    <header className="surface-panel rounded-[18px] px-4 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#6f6f6f]">{workspaceMeta.snapshotDate}</p>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-[20px] font-semibold tracking-[-0.04em] text-white">{current.label}</h1>
            <span className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#7d7d7d]">
              {current.description}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative min-w-0 sm:w-[280px]">
            <input
              className="control-input h-10 pr-3 pl-3 text-sm"
              placeholder="Search"
              aria-label="Search workspace"
            />
          </label>
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => openDrawer("task")}>
              New task
            </Button>
            <Button size="sm" onClick={() => openDrawer("memory")}>
              New note
            </Button>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center rounded-[12px] border border-white/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#cfcfcf] hover:bg-[#111]"
            >
              Calendar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
