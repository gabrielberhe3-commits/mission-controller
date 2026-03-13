"use client";

import {
  ProjectDetail,
  ProjectList,
} from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import {
  getBriefsForProject,
  getDocsForProject,
  getEventsForProject,
  getMemoryForProject,
  getTasksForProject,
} from "@/data/mission-control";

export default function ProjectsPage() {
  const { memories, openDrawer, projects, selectedProjectId, showFeedback, tasks } = useWorkspace();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Projects"
        title="Project inspection layer for deliverables, linked work, and history."
        description="Deliverables, updates, briefs, events, tasks, docs, and memory can all be inspected from the project surface instead of remaining scattered across the app."
        actions={
          <>
            <Button variant="primary" onClick={() => openDrawer("task")}>
              Add linked task
            </Button>
            <Button onClick={() => openDrawer("memory")}>Add project note</Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[0.4fr_0.6fr]">
        <Panel
          title="Portfolio"
          description="Select a project to inspect its deliverables, updates, history, and linked operational objects."
          action={
            <Button
              size="sm"
              onClick={() =>
                showFeedback("Project creation is still seeded-only. The inspection layer is ready for live creation next.")
              }
            >
              New project
            </Button>
          }
        >
          <ProjectList projects={projects} selectedProjectId={selectedProject.id} />
        </Panel>

        <Panel
          title="Project detail"
          description={`${selectedProject.name} now exposes discoverable nightly-built work and linked context.`}
          action={<Button size="sm" onClick={() => showFeedback(selectedProject.nextMilestone)}>Next milestone</Button>}
        >
          <ProjectDetail
            project={selectedProject}
            linkedTasks={getTasksForProject(selectedProject.id, tasks)}
            linkedMemories={getMemoryForProject(selectedProject.id, memories)}
            linkedDocs={getDocsForProject(selectedProject.id)}
            linkedEvents={getEventsForProject(selectedProject.id)}
            linkedBriefs={getBriefsForProject(selectedProject.id)}
          />
        </Panel>
      </div>
    </div>
  );
}
