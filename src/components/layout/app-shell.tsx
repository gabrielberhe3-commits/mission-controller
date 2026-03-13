import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background text-white">
        <div className="app-shell-grid mx-auto min-h-screen max-w-[1720px] xl:grid xl:grid-cols-[248px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="min-w-0 border-t border-white/6 px-3 py-3 sm:px-4 lg:px-5 xl:border-l xl:border-t-0 xl:px-6 xl:py-5">
            <div className="mx-auto flex min-h-full max-w-[1420px] flex-col gap-3">
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
