"use client";

import { MemoryList, ProjectList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { getMemoryForProject } from "@/data/mission-control";

export default function MemoryPage() {
  const { memories, openDrawer, projects, selectedProjectId, showFeedback } = useWorkspace();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const linkedMemories = getMemoryForProject(selectedProject.id, memories);
  const uncategorized = memories.filter((memory) => !memory.linkedProjectId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Memory"
        title="Durable context now has visible structure and project-linked notes."
        description="Memory is no longer a flat dump. You can capture notes locally, inspect project-linked context, and preserve decisions and preferences that should outlive tasks."
        actions={
          <>
            <Button variant="primary" onClick={() => openDrawer("memory")}>
              Capture memory
            </Button>
            <Button
              onClick={() =>
                showFeedback("Future automation can write project-linked notes into this same memory store.")
              }
            >
              Automation notes
            </Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
        <Panel
          title="Project memory"
          description="Choose a project to inspect the durable notes linked to it."
        >
          <ProjectList projects={projects} selectedProjectId={selectedProject.id} />
        </Panel>

        <div className="space-y-6">
          <Panel
            title="Linked entries"
            description={`${selectedProject.name} has ${linkedMemories.length} memory anchor(s) attached to active work.`}
            action={<Button size="sm" onClick={() => openDrawer("memory")}>Add note</Button>}
          >
            <MemoryList memories={linkedMemories} />
          </Panel>
          <Panel
            title="Unlinked notes"
            description="General operating preferences or notes can still exist without a single project anchor."
          >
            <MemoryList memories={uncategorized} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
