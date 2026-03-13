import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { WorkspaceOverlays } from "@/components/layout/workspace-overlays";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(213,159,97,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(81,125,153,0.22),transparent_30%),linear-gradient(180deg,#05070a,#091018_52%,#070b10)] text-white">
        <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)]">
          <SidebarNav />
          <main className="grain relative p-4 sm:p-6 lg:p-8">
            <Topbar />
            {children}
          </main>
        </div>
        <WorkspaceOverlays />
      </div>
    </WorkspaceProvider>
  );
}
