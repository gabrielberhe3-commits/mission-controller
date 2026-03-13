"use client";

import { ProjectDetail, ProjectList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import {
  getBriefsForProject,
  getDocsForProject,
  getEventsForProject,
  getMemoryForProject,
  getTasksForProject,
} from "@/data/mission-control";

export default function ProjectsPage() {
  const { memories, openDrawer, projects, selectedProjectId, tasks } = useWorkspace();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Projects"
        title="Portfolio"
        description="Delivery and context."
        actions={
          <>
            <Button size="sm" onClick={() => openDrawer("task")}>
              Task
            </Button>
            <Button size="sm" variant="primary" onClick={() => openDrawer("memory")}>
              Note
            </Button>
          </>
        }
      />

      <div className="grid gap-3 xl:grid-cols-[340px_minmax(0,1fr)]">
        <section className="shell-panel rounded-[20px] p-4">
          <p className="eyebrow">Projects</p>
          <div className="mt-4">
            <ProjectList projects={projects} selectedProjectId={selectedProject.id} />
          </div>
        </section>

        <section className="shell-panel rounded-[20px] p-4">
          <p className="eyebrow">{selectedProject.name}</p>
          <div className="mt-4">
            <ProjectDetail
              project={selectedProject}
              linkedTasks={getTasksForProject(selectedProject.id, tasks)}
              linkedMemories={getMemoryForProject(selectedProject.id, memories)}
              linkedDocs={getDocsForProject(selectedProject.id)}
              linkedEvents={getEventsForProject(selectedProject.id)}
              linkedBriefs={getBriefsForProject(selectedProject.id)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
