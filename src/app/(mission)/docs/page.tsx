import { DocList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { seededDocs } from "@/data/mission-control";

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Docs"
        title="Knowledge pages explain the system, not just the current day."
        description="Docs now have their own route and seeded module so knowledge can grow into a structured layer separate from ephemeral execution."
      />

      <Panel
        title="Reference library"
        description="These docs model the product, integration, playbook, and research categories that the app will keep accumulating."
        action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">New doc</button>}
      >
        <DocList docs={seededDocs} />
      </Panel>
    </div>
  );
}
