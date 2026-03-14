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
        title="Docs"
        actions={
          <>
            <Button size="sm" variant="primary" onClick={() => showFeedback("Document editing is not implemented yet.")}>
              Doc
            </Button>
            <Button size="sm" onClick={() => openDrawer("memory")}>
              Note
            </Button>
          </>
        }
      />

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="shell-panel rounded-[20px] p-4">
          <p className="eyebrow">Docs</p>
          <div className="mt-4">
            <DocList docs={docs} />
          </div>
        </section>

        <section className="shell-panel rounded-[20px] p-4">
          <p className="eyebrow">Briefs</p>
          <div className="mt-4">
            <BriefFeed briefs={briefs} />
          </div>
        </section>
      </div>
    </div>
  );
}
