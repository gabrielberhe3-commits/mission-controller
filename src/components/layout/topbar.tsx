"use client";

import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { navigationItems } from "@/data/mission-control";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const pathname = usePathname();
  const { openDrawer } = useWorkspace();
  const { theme, toggleTheme } = useTheme();
  const current =
    navigationItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navigationItems[0];

  return (
    <header className="shell-panel rounded-[14px] px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-main text-[16px] font-medium tracking-[-0.04em]">{current.label}</h1>
          <p className="text-faint mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
            Theme: {theme}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="theme-toggle inline-flex h-7 items-center rounded-[9px] px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
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
