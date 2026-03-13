"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { buildWorkspaceMetrics, navigationItems, workspaceMeta } from "@/data/mission-control";

export function SidebarNav() {
  const pathname = usePathname();
  const { briefs, events, memories, tasks } = useWorkspace();
  const todayEvents = events.filter((event) => event.date === "2026-03-13");
  const openTasks = tasks.filter((task) => task.status !== "Done");
  const metrics = buildWorkspaceMetrics(tasks, memories);

  return (
    <aside className="border-b border-white/8 bg-[#0d1114] px-4 py-4 xl:border-r xl:border-b-0 xl:px-5 xl:py-5">
      <div className="xl:sticky xl:top-5">
        <div className="surface-muted rounded-[18px] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9aa7b5]">
                {workspaceMeta.operator} / Console
              </p>
              <h1 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-white">
                {workspaceMeta.productName}
              </h1>
            </div>
            <div className="rounded-[12px] border border-[rgba(178,144,97,0.28)] bg-[rgba(178,144,97,0.08)] px-2.5 py-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d7b27b]">
                Live
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8f9cab]">{workspaceMeta.strapline}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatTile label="Events" value={String(todayEvents.length)} />
            <StatTile label="Queue" value={String(openTasks.length)} />
          </div>

          <div className="mt-4 border-t border-white/8 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f8b97]">
              Snapshot
            </p>
            <p className="mt-1 text-sm text-white">{workspaceMeta.snapshotDate}</p>
            <p className="mt-1 text-xs text-[#8391a0]">{briefs[0]?.title}</p>
          </div>
        </div>

        <nav className="mt-4 grid gap-1.5">
          {navigationItems.map((item, index) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group rounded-[14px] border px-3 py-3 ${
                  isActive
                    ? "border-[rgba(178,144,97,0.32)] bg-[rgba(178,144,97,0.1)] text-white"
                    : "border-white/6 bg-white/[0.025] text-[#c3cdd7] hover:border-white/10 hover:bg-white/[0.045]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-[10px] border text-[10px] font-semibold ${
                        isActive
                          ? "border-[rgba(178,144,97,0.28)] bg-[rgba(178,144,97,0.16)] text-[#ecd2a6]"
                          : "border-white/8 bg-black/20 text-[#7e8a98]"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className={`text-xs ${isActive ? "text-[#d1ba96]" : "text-[#7d8a98]"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isActive ? "text-[#d7b27b]" : "text-[#697684]"}`}>
                    {item.shortLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="surface-muted mt-4 rounded-[18px] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#96a3b1]">
              Signals
            </p>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f7c89]">
              local
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            {metrics.map((metric) => (
              <div key={metric.id} className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7d8a97]">
                    {metric.label}
                  </p>
                  <p className="text-base font-semibold text-white">{metric.value}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#92a0ae]">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#758291]">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">{value}</p>
    </div>
  );
}
