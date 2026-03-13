"use client";

import {
  BriefFeed,
  DocList,
  EventList,
  MemoryList,
  MetricGrid,
  ProjectDetail,
  ProjectList,
  RoadmapList,
  TaskList,
} from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import {
  buildWorkspaceMetrics,
  getBriefsForProject,
  getDocsForProject,
  getEventsForProject,
  getMemoryForProject,
  getTasksForProject,
  roadmapItems,
} from "@/data/mission-control";

export default function HomePage() {
  const {
    briefs,
    docs,
    events,
    memories,
    openDrawer,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    showFeedback,
    tasks,
  } = useWorkspace();
  const featuredProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const metrics = buildWorkspaceMetrics(tasks, memories);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mission Control"
        title="Operator dashboard for calendar, execution, briefs, and durable context."
        description="Mission Controller v3 is now organized around real workflows: briefs anchor the day, tasks can be created locally, projects expose discoverable work, and memory preserves the context that should survive every session."
        actions={
          <>
            <ButtonLink href="/calendar" variant="primary">
              Review today
            </ButtonLink>
            <ButtonLink href="/projects">Open project layer</ButtonLink>
            <Button onClick={() => openDrawer("task")}>Add task</Button>
          </>
        }
      />

      <MetricGrid metrics={metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Panel
            title="Brief feed"
            description="Morning briefs and nightly updates are visible in the operating surface instead of being hidden in external docs or chats."
            action={<Button size="sm" onClick={() => showFeedback("Brief generation will later come from automation and nightly jobs.")}>How it works</Button>}
          >
            <BriefFeed briefs={briefs} />
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel
              title="Today's schedule"
              description="Time remains the spine of the system, with project-linked event inspection."
              action={<ButtonLink href="/calendar" size="sm">Open full calendar</ButtonLink>}
            >
              <EventList events={events.slice(0, 4)} />
            </Panel>
            <Panel
              title="Execution queue"
              description="Tasks created by you and future automations use the same local-first insertion path."
              action={<Button size="sm" onClick={() => openDrawer("task")}>New task</Button>}
            >
              <TaskList tasks={tasks.slice(0, 4)} />
            </Panel>
          </div>

          <Panel
            title="Project focus"
            description="Projects are now the place to inspect deliverables, updates, history, and linked work."
            action={<ButtonLink href="/projects" size="sm">View portfolio</ButtonLink>}
          >
            <div className="grid gap-4 xl:grid-cols-[0.42fr_0.58fr]">
              <ProjectList projects={projects} selectedProjectId={featuredProject.id} />
              <ProjectDetail
                project={featuredProject}
                linkedTasks={getTasksForProject(featuredProject.id, tasks)}
                linkedMemories={getMemoryForProject(featuredProject.id, memories)}
                linkedDocs={getDocsForProject(featuredProject.id)}
                linkedEvents={getEventsForProject(featuredProject.id)}
                linkedBriefs={getBriefsForProject(featuredProject.id)}
              />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel
            title="Memory"
            description="Project-linked notes, decisions, and operator preferences stay visible and retrievable."
            action={<Button size="sm" onClick={() => openDrawer("memory")}>Capture</Button>}
          >
            <MemoryList memories={memories.slice(0, 4)} />
          </Panel>
          <Panel
            title="Docs"
            description="Reference pages stay close to active projects instead of living in a disconnected knowledge silo."
            action={<ButtonLink href="/docs" size="sm">Open docs</ButtonLink>}
          >
            <DocList docs={docs.slice(0, 3)} />
          </Panel>
          <Panel
            title="Control actions"
            description="Common actions remain meaningful even before full integrations land."
            action={<Button size="sm" onClick={() => setSelectedProjectId("p1")}>Reset focus</Button>}
          >
            <div className="grid gap-3">
              <button
                className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                onClick={() => openDrawer("task")}
              >
                Add task to the local queue
              </button>
              <button
                className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                onClick={() => openDrawer("memory")}
              >
                Capture a durable note linked to a project
              </button>
              <button
                className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                onClick={() =>
                  showFeedback("Automation hooks are planned to insert tasks, briefs, and updates into this same local model.")
                }
              >
                Preview future automation path
              </button>
            </div>
          </Panel>
          <Panel
            title="Next build wave"
            description="The current architecture is now aligned with future persistence and automation integration."
          >
            <RoadmapList items={roadmapItems} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
