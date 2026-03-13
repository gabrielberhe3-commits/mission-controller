import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-white">
        <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 xl:grid-cols-[292px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="grain relative border-l border-white/6 p-4 sm:p-5 lg:p-6">
            <Topbar />
            {children}
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
