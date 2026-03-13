import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(214,155,83,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,88,122,0.24),transparent_30%),#06080b] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
        <SidebarNav />
        <main className="p-4 sm:p-6 lg:p-8">
          <Topbar />
          {children}
        </main>
      </div>
    </div>
  );
}
