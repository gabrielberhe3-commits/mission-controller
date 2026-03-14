import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-white">
        <div className="app-shell-grid mx-auto min-h-screen max-w-[1660px] xl:grid xl:grid-cols-[220px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="min-w-0 border-t border-white/5 px-2.5 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4 xl:border-l xl:border-t-0 xl:px-4 xl:py-4">
            <div className="mx-auto flex min-h-full max-w-[1380px] flex-col gap-2.5">
              <Topbar />
              <div className="flex-1 pb-4">{children}</div>
            </div>
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
