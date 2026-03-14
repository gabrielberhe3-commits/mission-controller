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
    <header className="shell-panel rounded-[14px] px-3 py-2.5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-end">
          <div className="min-w-0">
            <p className="eyebrow">{current.label}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <h1 className="text-[20px] font-semibold tracking-[-0.06em] text-white">
                {current.description}
              </h1>
              <span className="rounded-[7px] border border-white/6 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7b7b7b]">
                {workspaceMeta.snapshotDate}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <TopMetric label="Open" value={String(activeTasks)} />
            <TopMetric label="Today" value={String(todayEvents)} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:w-[220px]">
            <input
              className="control-input h-9 text-sm"
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
    <div className="rounded-[10px] border border-white/6 bg-[#070707] px-2.5 py-1.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#5f5f5f]">{label}</p>
      <p className="mt-1 text-[17px] font-semibold tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}
