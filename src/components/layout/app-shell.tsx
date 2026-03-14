import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="app-shell-grid mx-auto min-h-screen max-w-[1600px] xl:grid xl:grid-cols-[196px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="min-w-0 border-t border-black/5 px-2 py-2 sm:px-3 sm:py-3 xl:border-l xl:border-t-0 xl:px-3 xl:py-3">
            <div className="mx-auto flex min-h-full max-w-[1360px] flex-col gap-2">
              <Topbar />
              <div className="flex-1 pb-3">{children}</div>
            </div>
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
