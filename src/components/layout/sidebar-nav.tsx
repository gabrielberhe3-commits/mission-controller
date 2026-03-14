"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems, workspaceMeta } from "@/data/mission-control";

export function SidebarNav() {
  const pathname = usePathname();
  const { projects, selectedProjectId } = useWorkspace();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <aside className="border-b border-white/5 px-2 py-2 xl:min-h-screen xl:border-r xl:border-b-0 xl:px-3 xl:py-3">
      <div className="xl:sticky xl:top-3">
        <div className="px-2 py-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b8b8b]">MC</p>
          <p className="mt-2 text-sm font-medium text-white">{workspaceMeta.productName}</p>
        </div>

        <nav className="mt-3 grid gap-1">
          {navigationItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[10px] px-2.5 py-2 text-sm ${
                  isActive ? "shell-card-strong text-white" : "text-[#6f6f6f] hover:bg-[#070707] hover:text-white"
                }`}
              >
                {item.shortLabel}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-white/5 px-2.5 pt-3">
          <p className="truncate text-[11px] uppercase tracking-[0.16em] text-[#5c5c5c]">
            {selectedProject.name}
          </p>
        </div>
      </div>
    </aside>
  );
}
