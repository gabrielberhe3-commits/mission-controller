"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems, seededEvents, seededTasks, workspaceMeta } from "@/data/mission-control";

export function SidebarNav() {
  const pathname = usePathname();
  const openTasks = seededTasks.filter((task) => task.status !== "Done");
  const todayEvents = seededEvents.filter((event) => event.dateLabel === "Today");

  return (
    <aside className="border-b border-white/10 bg-[rgba(8,11,15,0.85)] p-5 backdrop-blur xl:border-r xl:border-b-0 xl:p-6">
      <div className="flex items-start justify-between gap-4 xl:block">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#94a3b8]">
            {workspaceMeta.operator} OS
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
            {workspaceMeta.productName}
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#8ea0b5]">
            {workspaceMeta.strapline}
          </p>
        </div>
        <div className="rounded-[24px] border border-[rgba(214,155,83,0.22)] bg-[rgba(214,155,83,0.08)] px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d0b48b]">
            Status
          </p>
          <p className="mt-1 text-sm font-medium text-white">{workspaceMeta.status}</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-2">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[22px] px-4 py-3 transition ${
                isActive
                  ? "bg-[linear-gradient(135deg,#f1dfbf,#d1a56a)] text-[#11151a] shadow-[0_18px_40px_rgba(209,165,106,0.24)]"
                  : "bg-white/[0.03] text-[#c3cfdb] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-[#54412b]" : "text-[#708196]"
                  }`}
                >
                  {item.shortLabel}
                </span>
              </div>
              <p
                className={`mt-1 text-xs leading-5 ${
                  isActive ? "text-[#493923]" : "text-[#7f90a5]"
                }`}
              >
                {item.description}
              </p>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#94a3b8]">
          Today
        </p>
        <div className="mt-4 grid gap-4">
          <div>
            <p className="text-sm text-[#7f90a5]">Events</p>
            <p className="mt-1 text-2xl font-semibold text-white">{todayEvents.length}</p>
          </div>
          <div>
            <p className="text-sm text-[#7f90a5]">Open tasks</p>
            <p className="mt-1 text-2xl font-semibold text-white">{openTasks.length}</p>
          </div>
          <div>
            <p className="text-sm text-[#7f90a5]">Snapshot</p>
            <p className="mt-1 text-sm font-medium text-white">{workspaceMeta.snapshotDate}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
