"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { seededApprovals } from "@/data/mission-control";

function statusClass(status: string) {
  switch (status) {
    case "Ready":
      return "border-white/12 bg-[#141414] text-white";
    case "Blocked":
      return "border-white/8 bg-[#0c0c0c] text-[#8a8a8a]";
    default:
      return "border-white/10 bg-[#111] text-[#d8d8d8]";
  }
}

export default function ApprovalsPage() {
  const { showFeedback } = useWorkspace();

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Approvals"
        title="Review"
        description="Pending decisions."
        actions={
          <Button size="sm" variant="primary" onClick={() => showFeedback("Approval flows are seeded locally only.")}>
            New request
          </Button>
        }
      />

      <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
        <div className="border-b border-white/6 pb-3">
          <p className="text-sm font-medium text-white">Queue</p>
        </div>
        <div className="mt-4 space-y-2">
          {seededApprovals.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-[18px] border border-white/6 bg-[#0b0b0b] p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#8a8a8a]">{item.detail}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
                  {item.owner} · {item.due}
                </p>
                <Button size="sm" onClick={() => showFeedback(`${item.title} is still local-only seed data.`)}>
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
