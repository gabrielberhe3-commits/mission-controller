"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";

export function SidebarNav() {
  const pathname = usePathname();
  const { events, projects, selectedProjectId, tasks } = useWorkspace();
  const openTasks = tasks.filter((task) => task.status !== "Done").length;
  const approvals = tasks.filter((task) => task.status === "Blocked").length;
  const todayEvents = events.filter((event) => event.date === "2026-03-13").length;
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <aside className="border-b border-white/5 px-2.5 py-2.5 xl:min-h-screen xl:border-r xl:border-b-0 xl:px-3 xl:py-4">
      <div className="xl:sticky xl:top-4">
        <div className="shell-panel-alt rounded-[16px] p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="eyebrow">{workspaceMeta.status}</p>
              <h2 className="mt-1.5 text-[17px] font-semibold tracking-[-0.05em] text-white">
                {workspaceMeta.productName}
              </h2>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/8 bg-[#090909] text-[11px] font-semibold tracking-[0.18em] text-white">
              MC
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <NavStat label="Tasks" value={String(openTasks)} />
            <NavStat label="Appr" value={String(approvals)} />
            <NavStat label="Cal" value={String(todayEvents)} />
          </div>
        </div>

        <nav className="mt-3 grid gap-1">
          {navigationItems
            .filter((item) => item.href !== "/")
            .map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-[10px] px-2.5 py-2 ${
                    isActive
                      ? "shell-card-strong text-white"
                      : "text-[#7f7f7f] hover:bg-[#070707] hover:text-white"
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#555]">
                    {item.shortLabel}
                  </span>
                </Link>
              );
            })}
        </nav>

        <Link
          href="/"
          className={`mt-3 block rounded-[12px] p-3 ${
            pathname === "/" ? "shell-card-strong" : "shell-panel-alt hover:bg-[#070707]"
          }`}
        >
          <p className="eyebrow">Home</p>
          <p className="mt-1.5 text-sm font-semibold tracking-[-0.04em] text-white">Mission view</p>
        </Link>

        <div className="mt-3 rounded-[12px] border border-white/6 bg-[#050505] p-3">
          <p className="eyebrow">Focus</p>
          <p className="mt-1.5 text-sm font-medium text-white">{selectedProject.name}</p>
          <p className="mt-1 text-[12px] text-[#727272]">{selectedProject.horizon}</p>
          <p className="mt-3 text-[11px] leading-5 text-[#9f9f9f]">{selectedProject.nextMilestone}</p>
        </div>
      </div>
    </aside>
  );
}

function NavStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-white/6 bg-[#070707] px-2 py-1.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#5f5f5f]">{label}</p>
      <p className="mt-1 text-[15px] font-semibold tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}
