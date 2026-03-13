import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-white">
        <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 xl:grid-cols-[236px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="relative min-w-0 border-l border-white/6 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 xl:px-6">
            <div className="mx-auto flex min-h-full max-w-[1380px] flex-col gap-3">
              <Topbar />
              <div className="flex-1 pb-5">{children}</div>
            </div>
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
