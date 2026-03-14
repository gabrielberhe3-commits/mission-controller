"use client";

import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { navigationItems } from "@/data/mission-control";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { openDrawer } = useWorkspace();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];

  return (
    <header className="shell-panel rounded-[14px] px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-[16px] font-medium tracking-[-0.04em] text-[#161719]">{current.label}</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => openDrawer("task")}>
            Task
          </Button>
          <Button size="sm" variant="primary" onClick={() => openDrawer("memory")}>
            Note
          </Button>
        </div>
      </div>
    </header>
  );
}
