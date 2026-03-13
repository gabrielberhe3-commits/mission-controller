"use client";

import { MemoryList, ProjectList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { getMemoryForProject } from "@/data/mission-control";

export default function MemoryPage() {
  const { memories, openDrawer, projects, selectedProjectId } = useWorkspace();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const linkedMemories = getMemoryForProject(selectedProject.id, memories);
  const uncategorized = memories.filter((memory) => !memory.linkedProjectId);

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Memory"
        title="Notes"
        description="Durable context."
        actions={
          <Button size="sm" variant="primary" onClick={() => openDrawer("memory")}>
            New note
          </Button>
        }
      />

      <div className="grid gap-3 xl:grid-cols-[320px_minmax(0,1fr)]">
        <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
          <div className="border-b border-white/6 pb-3">
            <p className="text-sm font-medium text-white">Projects</p>
          </div>
          <div className="mt-4">
            <ProjectList projects={projects} selectedProjectId={selectedProject.id} />
          </div>
        </section>

        <div className="space-y-3">
          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <div className="border-b border-white/6 pb-3">
              <p className="text-sm font-medium text-white">{selectedProject.name}</p>
            </div>
            <div className="mt-4">
              <MemoryList memories={linkedMemories} />
            </div>
          </section>

          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <div className="border-b border-white/6 pb-3">
              <p className="text-sm font-medium text-white">General</p>
            </div>
            <div className="mt-4">
              <MemoryList memories={uncategorized} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
