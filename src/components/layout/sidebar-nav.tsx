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
    <aside className="border-b border-white/6 px-3 py-3 xl:min-h-screen xl:border-r xl:border-b-0 xl:px-4 xl:py-5">
      <div className="xl:sticky xl:top-5">
        <div className="shell-panel-alt rounded-[20px] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">{workspaceMeta.status}</p>
              <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.05em] text-white">
                {workspaceMeta.productName}
              </h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-[#101010] text-xs font-semibold tracking-[0.2em] text-white">
              MC
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <NavStat label="Tasks" value={String(openTasks)} />
            <NavStat label="Appr" value={String(approvals)} />
            <NavStat label="Cal" value={String(todayEvents)} />
          </div>
        </div>

        <nav className="mt-4 grid gap-1">
          {navigationItems
            .filter((item) => item.href !== "/")
            .map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-[12px] px-3 py-2.5 ${
                    isActive
                      ? "shell-card-strong text-white"
                      : "text-[#8f8f8f] hover:bg-[#0a0a0a] hover:text-white"
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#595959]">
                    {item.shortLabel}
                  </span>
                </Link>
              );
            })}
        </nav>

        <Link
          href="/"
          className={`mt-4 block rounded-[14px] p-4 ${
            pathname === "/" ? "shell-card-strong" : "shell-panel-alt hover:bg-[#090909]"
          }`}
        >
          <p className="eyebrow">Home</p>
          <p className="mt-2 text-base font-semibold tracking-[-0.04em] text-white">Mission view</p>
        </Link>

        <div className="mt-4 rounded-[16px] border border-white/8 bg-[#070707] p-4">
          <p className="eyebrow">Focus</p>
          <p className="mt-2 text-sm font-medium text-white">{selectedProject.name}</p>
          <p className="mt-1 text-sm text-[#7d7d7d]">{selectedProject.horizon}</p>
          <p className="mt-4 text-[11px] leading-5 text-[#b4b4b4]">{selectedProject.nextMilestone}</p>
        </div>
      </div>
    </aside>
  );
}

function NavStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-[#0b0b0b] px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{label}</p>
      <p className="mt-1 text-base font-semibold tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}
