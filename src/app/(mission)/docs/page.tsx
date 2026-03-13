"use client";

import { BriefFeed, DocList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export default function DocsPage() {
  const { briefs, docs, openDrawer, showFeedback } = useWorkspace();

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Docs"
        title="Reference"
        description="Specs and briefs."
        actions={
          <>
            <Button size="sm" variant="primary" onClick={() => showFeedback("Document editing is not implemented yet.")}>
              New doc
            </Button>
            <Button size="sm" onClick={() => openDrawer("memory")}>
              Note
            </Button>
          </>
        }
      />

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
          <div className="border-b border-white/6 pb-3">
            <p className="text-sm font-medium text-white">Docs</p>
          </div>
          <div className="mt-4">
            <DocList docs={docs} />
          </div>
        </section>

        <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
          <div className="border-b border-white/6 pb-3">
            <p className="text-sm font-medium text-white">Briefs</p>
          </div>
          <div className="mt-4">
            <BriefFeed briefs={briefs} />
          </div>
        </section>
      </div>
    </div>
  );
}
