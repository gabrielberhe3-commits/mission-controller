"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";

export function SidebarNav() {
  const pathname = usePathname();
  const { tasks, events } = useWorkspace();
  const todayEvents = events.filter((event) => event.date === "2026-03-13").length;
  const openTasks = tasks.filter((task) => task.status !== "Done").length;

  return (
    <aside className="border-b border-white/6 bg-[#030303] px-3 py-3 xl:min-h-screen xl:border-r xl:border-b-0 xl:px-4 xl:py-4">
      <div className="xl:sticky xl:top-4">
        <div className="rounded-[20px] border border-white/6 bg-[#050505] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0c0c0c] text-xs font-semibold tracking-[0.18em] text-white">
              MC
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold tracking-[-0.03em] text-white">
                {workspaceMeta.productName}
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#777]">{workspaceMeta.status}</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 grid gap-1">
          {navigationItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-[14px] border px-3 py-2.5 ${
                  isActive
                    ? "border-white/14 bg-[#111] text-white"
                    : "border-transparent bg-transparent text-[#9a9a9a] hover:border-white/6 hover:bg-[#090909] hover:text-white"
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-[18px] border border-white/6 bg-[#050505] p-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#707070]">
            <span>Today</span>
            <span>{workspaceMeta.operator}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Tasks" value={String(openTasks)} />
            <Stat label="Events" value={String(todayEvents)} />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/6 bg-[#090909] px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
