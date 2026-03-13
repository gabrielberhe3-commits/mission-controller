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
    <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[rgba(10,14,19,0.82)] px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fa2b8]">
          {workspaceMeta.snapshotDate}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold text-white">{current.label}</h2>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#b0c0cf]">
            {inFlightTasks} active tasks
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => openDrawer("task")}>
          Quick add task
        </Button>
        <Button onClick={() => openDrawer("memory")}>Capture memory</Button>
        <Link
          href="/calendar"
          className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-[#dbe5ee] transition hover:bg-white/[0.05]"
        >
          Open calendar
        </Link>
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
  );
}
