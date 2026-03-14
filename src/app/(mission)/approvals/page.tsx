"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { seededApprovals } from "@/data/mission-control";

function statusClass(status: string) {
  switch (status) {
    case "Ready":
      return "border-[#d9d0bf] bg-[#f7f2e8] text-[#716043]";
    case "Blocked":
      return "border-[#dfcaca] bg-[#f7eeee] text-[#7c5959]";
    default:
      return "border-black/8 bg-[#f1efeb] text-[#575b60]";
  }
}

export default function ApprovalsPage() {
  const { showFeedback } = useWorkspace();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Approvals"
        actions={
          <Button size="sm" variant="primary" onClick={() => showFeedback("Approval flows are seeded locally only.")}>
            New
          </Button>
        }
      />

      <section className="shell-panel rounded-[20px] p-4">
        <p className="eyebrow">Queue</p>
        <div className="mt-4 space-y-2">
          {seededApprovals.map((item) => (
            <div key={item.id} className="shell-card rounded-[14px] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-[#18191b]">{item.title}</p>
                    <span className={`rounded-[8px] border px-2 py-1 text-[10px] uppercase tracking-[0.16em] ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#74787c]">{item.detail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#86898c]">
                    {item.owner} · {item.due}
                  </p>
                  <Button size="sm" onClick={() => showFeedback(`${item.title} is still local-only seed data.`)}>
                    Open
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
