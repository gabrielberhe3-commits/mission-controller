"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { workspaceMeta } from "@/data/mission-control";
import { buildWorkspaceMetrics, navigationItems } from "@/data/mission-control";
import { useWorkspace } from "@/components/providers/workspace-provider";

export function SidebarNav() {
  const pathname = usePathname();
  const { briefs, events, memories, tasks } = useWorkspace();
  const todayEvents = events.filter((event) => event.date === "2026-03-13");
  const openTasks = tasks.filter((task) => task.status !== "Done");
  const recentBrief = briefs[0];
  const metrics = buildWorkspaceMetrics(tasks, memories);

  return (
    <aside className="border-b border-white/8 bg-[rgba(7,11,16,0.96)] p-4 xl:border-r xl:border-b-0 xl:p-5">
      <div className="flex items-start justify-between gap-4 xl:block">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#94a3b8]">
            {workspaceMeta.operator} OS
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
            {workspaceMeta.productName}
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#8ea0b5]">
            {workspaceMeta.strapline}
          </p>
        </div>
        <div className="rounded-xl border border-[rgba(200,163,106,0.24)] bg-[rgba(200,163,106,0.08)] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d0b48b]">
            Status
          </p>
          <p className="mt-1 text-sm font-medium text-white">{workspaceMeta.status}</p>
        </div>
      </div>

      <nav className="mt-7 grid gap-1.5">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border px-3 py-3 transition ${
                isActive
                  ? "border-[rgba(200,163,106,0.26)] bg-[rgba(200,163,106,0.12)] text-[#f5e2c0]"
                  : "border-white/6 bg-white/[0.02] text-[#c3cfdb] hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    isActive ? "text-[#ccb188]" : "text-[#708196]"
                  }`}
                >
                  {item.shortLabel}
                </span>
              </div>
              <p
                className={`mt-1 text-xs leading-5 ${
                  isActive ? "text-[#d6c4a4]" : "text-[#7f90a5]"
                }`}
              >
                {item.description}
              </p>
            </Link>
          );
        })}
      </nav>

      <div className="surface-panel mt-6 rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#94a3b8]">
          Today
        </p>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-[#7f90a5]">Events</p>
              <p className="mt-1 text-2xl font-semibold text-white">{todayEvents.length}</p>
            </div>
            <div>
              <p className="text-sm text-[#7f90a5]">Open tasks</p>
              <p className="mt-1 text-2xl font-semibold text-white">{openTasks.length}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-[#7f90a5]">Latest brief</p>
            <p className="mt-1 text-sm font-medium text-white">{recentBrief.title}</p>
          </div>
          <div>
            <p className="text-sm text-[#7f90a5]">Snapshot</p>
            <p className="mt-1 text-sm font-medium text-white">{workspaceMeta.snapshotDate}</p>
          </div>
        </div>
      </div>

      <div className="surface-muted mt-4 rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#94a3b8]">
          Signals
        </p>
        <div className="mt-4 grid gap-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[#708196]">{metric.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-xs leading-5 text-[#8fa2b8]">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
