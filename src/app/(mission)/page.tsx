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
    showFeedback,
    tasks,
  } = useWorkspace();
  const featuredProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const metrics = buildWorkspaceMetrics(tasks, memories);
  const todayEvents = events.filter((event) => event.date === "2026-03-13");
  const activeTasks = tasks.filter((task) => task.status !== "Done");

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Mission Control"
        title="Operating surface for schedule, execution, projects, and durable context."
        description="The workspace is organized around real operator workflows: calendar at the center, execution close at hand, and project context visible without jumping between disconnected tools."
        actions={
          <>
            <ButtonLink href="/calendar" variant="primary">
              Open calendar
            </ButtonLink>
            <ButtonLink href="/projects">Project layer</ButtonLink>
            <Button onClick={() => openDrawer("task")}>Add task</Button>
          </>
        }
      />

      <MetricGrid metrics={metrics} />

      <div className="grid gap-5 xl:grid-cols-[1.28fr_0.72fr]">
        <div className="space-y-5">
          <Panel
            title="Today"
            description="Calendar is the primary operating layer for the day. Review the active window, inspect schedule load, and move into the full planning surface."
            action={<ButtonLink href="/calendar" size="sm" variant="primary">Full planner</ButtonLink>}
          >
            <div className="grid gap-4 xl:grid-cols-[0.64fr_0.36fr]">
              <div className="surface-muted rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                      Friday, March 13
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">Today's operating window</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#708196]">
                      Scheduled items
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-white">{todayEvents.length}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <EventList events={todayEvents} />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="surface-subtle rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                    Focus summary
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <CompactStat label="Open tasks" value={String(activeTasks.length)} detail="Queue still in motion" />
                    <CompactStat label="Project focus" value={featuredProject.name} detail={featuredProject.status} />
                    <CompactStat label="Memory anchors" value={String(memories.length)} detail="Durable context retained" />
                  </div>
                </div>
                <div className="surface-subtle rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                    Quick actions
                  </p>
                  <div className="mt-3 grid gap-2">
                    <button
                      className="rounded-lg border border-white/8 bg-black/20 px-3 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                      onClick={() => openDrawer("task")}
                    >
                      Add task to the local queue
                    </button>
                    <button
                      className="rounded-lg border border-white/8 bg-black/20 px-3 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                      onClick={() => openDrawer("memory")}
                    >
                      Capture a durable note linked to a project
                    </button>
                    <button
                      className="rounded-lg border border-white/8 bg-black/20 px-3 py-3 text-left text-sm text-[#d5dfea] hover:bg-white/[0.04]"
                      onClick={() =>
                        showFeedback("Automation hooks are planned to insert tasks, briefs, and updates into this same local model.")
                      }
                    >
                      Preview future automation path
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            title="Brief feed"
            description="Morning briefs and nightly updates remain visible in the main workspace instead of being buried in external notes."
            action={<Button size="sm" onClick={() => showFeedback("Brief generation will later come from automation and nightly jobs.")}>How it works</Button>}
          >
            <BriefFeed briefs={briefs} />
          </Panel>

          <div className="grid gap-5 lg:grid-cols-2">
            <Panel
              title="Execution queue"
              description="Tasks created by you and future automations use the same local-first insertion path."
              action={<Button size="sm" onClick={() => openDrawer("task")}>New task</Button>}
            >
              <TaskList tasks={tasks.slice(0, 4)} />
            </Panel>
            <Panel
              title="Memory"
              description="Project-linked notes, decisions, and operator preferences stay visible and retrievable."
              action={<Button size="sm" onClick={() => openDrawer("memory")}>Capture</Button>}
            >
              <MemoryList memories={memories.slice(0, 4)} />
            </Panel>
          </div>

          <Panel
            title="Project focus"
            description="Projects remain the best inspection layer for deliverables, updates, linked work, and historical context."
            action={<ButtonLink href="/projects" size="sm">View portfolio</ButtonLink>}
          >
            <div className="grid gap-4 xl:grid-cols-[0.4fr_0.6fr]">
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

        <div className="space-y-5">
          <Panel
            title="Docs"
            description="Reference pages stay close to active projects instead of living in a disconnected knowledge silo."
            action={<ButtonLink href="/docs" size="sm">Open docs</ButtonLink>}
          >
            <DocList docs={docs.slice(0, 3)} />
          </Panel>
          <Panel
            title="Calendar next"
            description="Forward-looking events keep the next few planning moves visible from the dashboard."
            action={<ButtonLink href="/calendar" size="sm">Open full calendar</ButtonLink>}
          >
            <EventList events={events.slice(0, 4)} />
          </Panel>
          <Panel
            title="Next build wave"
            description="The current architecture is aligned with future persistence and automation integration."
          >
            <RoadmapList items={roadmapItems} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function CompactStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/20 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#708196]">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-[#8ea0b5]">{detail}</p>
    </div>
  );
}
