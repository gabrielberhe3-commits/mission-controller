"use client";

import { BriefFeed, DocList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";

export default function DocsPage() {
  const { briefs, docs, openDrawer, showFeedback } = useWorkspace();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Docs"
        title="Reference pages and brief archives now support the operating workflow."
        description="Docs remain seeded for now, but this route now works as a cohesive reference surface instead of a disconnected list page."
        actions={
          <>
            <Button
              variant="primary"
              onClick={() =>
                showFeedback("Document editing is not implemented yet. The current route provides discoverability and linked inspection.")
              }
            >
              New doc
            </Button>
            <Button onClick={() => openDrawer("memory")}>Capture note</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.54fr_0.46fr]">
        <Panel
          title="Reference library"
          description="Structured notes and specs stay close to the operating surface and active projects."
        >
          <DocList docs={docs} />
        </Panel>
        <Panel
          title="Brief archive"
          description="Morning briefs and nightly updates are visible here as an operational log, not hidden elsewhere."
          action={
            <Button
              size="sm"
              onClick={() =>
                showFeedback("Brief authoring will later be generated automatically from the day's state and project changes.")
              }
            >
              Future generation
            </Button>
          }
        >
          <BriefFeed briefs={briefs} />
        </Panel>
      </div>
    </div>
  );
}
