import { MemoryList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { seededMemories } from "@/data/mission-control";

export default function MemoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Memory"
        title="Durable context prevents the system from forgetting how you work."
        description="This section is designed for durable notes, decisions, preferences, and operating principles that should survive beyond any single task or day."
      />

      <Panel
        title="Memory bank"
        description="Seeded memory entries are now isolated from view code and ready for a future capture flow."
        action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Capture memory</button>}
      >
        <MemoryList memories={seededMemories} />
      </Panel>
    </div>
  );
}
