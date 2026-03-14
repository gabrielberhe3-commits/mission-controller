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
        title="Memory"
        actions={
          <Button size="sm" variant="primary" onClick={() => openDrawer("memory")}>
            New
          </Button>
        }
      />

      <div className="grid gap-3 xl:grid-cols-[340px_minmax(0,1fr)]">
        <section className="shell-panel rounded-[20px] p-4">
          <p className="eyebrow">Projects</p>
          <div className="mt-4">
            <ProjectList projects={projects} selectedProjectId={selectedProject.id} />
          </div>
        </section>

        <div className="space-y-3">
          <section className="shell-panel rounded-[20px] p-4">
            <p className="eyebrow">{selectedProject.name}</p>
            <div className="mt-4">
              <MemoryList memories={linkedMemories} />
            </div>
          </section>

          <section className="shell-panel rounded-[20px] p-4">
            <p className="eyebrow">General</p>
            <div className="mt-4">
              <MemoryList memories={uncategorized} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
