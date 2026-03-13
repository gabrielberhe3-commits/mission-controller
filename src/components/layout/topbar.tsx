"use client";

import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { events, openDrawer, tasks } = useWorkspace();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];
  const activeTasks = tasks.filter((task) => task.status !== "Done").length;
  const todayEvents = events.filter((event) => event.date === "2026-03-13").length;

  return (
    <header className="shell-panel rounded-[18px] px-4 py-3">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-end">
          <div className="min-w-0">
            <p className="eyebrow">{current.label}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-[22px] font-semibold tracking-[-0.06em] text-white">
                {current.description}
              </h1>
              <span className="rounded-[8px] border border-white/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c8c8c]">
                {workspaceMeta.snapshotDate}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TopMetric label="Open" value={String(activeTasks)} />
            <TopMetric label="Today" value={String(todayEvents)} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:w-[260px]">
            <input
              className="control-input h-10 text-sm"
              placeholder="Search"
              aria-label="Search workspace"
            />
          </label>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => openDrawer("task")}>
              Task
            </Button>
            <Button size="sm" variant="primary" onClick={() => openDrawer("memory")}>
              Memory
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-[#0b0b0b] px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}
