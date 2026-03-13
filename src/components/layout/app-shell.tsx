import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-white">
        <div className="dashboard-grid mx-auto grid min-h-screen max-w-[1720px] grid-cols-1 xl:grid-cols-[272px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="relative min-w-0 border-l border-white/6 px-4 py-4 sm:px-5 lg:px-6 xl:px-7">
            <div className="mx-auto flex min-h-full max-w-[1380px] flex-col gap-4">
              <Topbar />
              <div className="flex-1 pb-6">{children}</div>
            </div>
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
