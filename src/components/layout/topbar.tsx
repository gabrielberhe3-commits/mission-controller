"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { openDrawer, showFeedback, tasks } = useWorkspace();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];
  const inFlightTasks = tasks.filter((task) => task.status === "In Progress").length;
  const blockedTasks = tasks.filter((task) => task.status === "Blocked").length;

  return (
    <header className="surface-panel rounded-[18px] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[10px] border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9cabb9]">
              {workspaceMeta.snapshotDate}
            </span>
            <span className="rounded-[10px] border border-[rgba(106,164,138,0.22)] bg-[rgba(106,164,138,0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b9ddcc]">
              {workspaceMeta.status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f8b98]">
                Active surface
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                {current.label}
              </h2>
              <p className="mt-1 max-w-3xl text-sm text-[#8f9cab]">{current.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <TopMetric label="In progress" value={String(inFlightTasks)} />
              <TopMetric label="Blocked" value={String(blockedTasks)} />
              <TopMetric label="Route" value={current.shortLabel} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 xl:max-w-[420px]">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f7d8b]">
                Search
              </span>
              <input
                className="control-input pl-16 text-sm"
                placeholder="Tasks, projects, docs, memory"
                aria-label="Search workspace"
              />
            </label>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center rounded-[12px] border border-white/10 bg-black/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7e0e8] hover:bg-white/[0.05]"
            >
              Calendar
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => openDrawer("task")}>
              Quick add task
            </Button>
            <Button onClick={() => openDrawer("memory")}>Capture memory</Button>
            <Button
              variant="ghost"
              onClick={() =>
                showFeedback("Calendar import is queued for a future adapter. Seeded local events remain active.")
              }
            >
              Import calendar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#74808c]">{label}</p>
      <p className="mt-1 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
