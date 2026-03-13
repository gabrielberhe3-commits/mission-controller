"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems, workspaceMeta } from "@/data/mission-control";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { openDrawer, showFeedback, tasks } = useWorkspace();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];
  const inFlightTasks = tasks.filter((task) => task.status === "In Progress").length;

  return (
    <div className="surface-panel mb-5 flex flex-col gap-4 rounded-2xl px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">
            {workspaceMeta.snapshotDate}
          </p>
          <span className="rounded-md border border-emerald-400/20 bg-emerald-400/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
            {workspaceMeta.status}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{current.label}</h2>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#b0c0cf]">
            {inFlightTasks} active tasks
          </span>
        </div>
        <p className="mt-1 text-sm text-[#8ea0b5]">{current.description}</p>
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          <label className="relative min-w-[280px] flex-1 lg:min-w-[320px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#708196]">
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
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#dbe5ee] transition hover:bg-white/[0.05]"
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
  );
}
