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
  const nextEvents = events.slice(0, 4);
  const activeTasks = tasks.filter((task) => task.status !== "Done");

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Mission Control"
        title="Operating surface for schedule, execution, projects, and durable context."
        description="The workspace is organized like an internal operator console: schedule in the foreground, execution adjacent, and project context always available without jumping between disconnected tools."
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

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <div className="space-y-4">
          <Panel
            title="Daily operations"
            description="Calendar remains the primary surface. Review today, inspect the selected project, and move directly into the full planning board."
            action={
              <div className="flex gap-2">
                <ButtonLink href="/calendar" size="sm" variant="primary">
                  Full planner
                </ButtonLink>
                <Button size="sm" onClick={() => openDrawer("task")}>
                  Add task
                </Button>
              </div>
            }
          >
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="surface-muted rounded-[16px] p-4">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/8 pb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7e8a97]">
                      Friday, March 13
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">
                      Today&apos;s operating window
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <InlineStat label="Events" value={String(todayEvents.length)} />
                    <InlineStat label="Open" value={String(activeTasks.length)} />
                    <InlineStat label="Focus" value={featuredProject.name.split(" ")[0]} />
                  </div>
                </div>
                <div className="mt-4">
                  <EventList events={todayEvents} />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="surface-subtle rounded-[16px] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8593a1]">
                    Quick actions
                  </p>
                  <div className="mt-3 grid gap-2">
                    <QuickAction
                      title="Add task to queue"
                      detail="Insert a concrete next action into the active execution lane."
                      onClick={() => openDrawer("task")}
                    />
                    <QuickAction
                      title="Capture durable note"
                      detail="Store a memory anchor tied to project context."
                      onClick={() => openDrawer("memory")}
                    />
                    <QuickAction
                      title="Preview automation path"
                      detail="Inspect the existing insertion model for future system actions."
                      onClick={() =>
                        showFeedback(
                          "Automation hooks are planned to insert tasks, briefs, and updates into this same local model.",
                        )
                      }
                    />
                  </div>
                </div>

                <div className="surface-subtle rounded-[16px] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8593a1]">
                    Project focus
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{featuredProject.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#9ca9b7]">{featuredProject.summary}</p>
                  <div className="mt-4 rounded-[12px] border border-white/8 bg-black/20 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#768392]">
                      Next milestone
                    </p>
                    <p className="mt-1 text-sm text-white">{featuredProject.nextMilestone}</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.56fr)]">
            <Panel
              title="Execution queue"
              description="Tasks created by you and future automations share the same local-first insertion path."
              action={
                <Button size="sm" onClick={() => openDrawer("task")}>
                  New task
                </Button>
              }
            >
              <TaskList tasks={tasks.slice(0, 5)} />
            </Panel>

            <Panel
              title="Upcoming calendar"
              description="Forward-looking events keep the next scheduling moves visible from the dashboard."
              action={<ButtonLink href="/calendar" size="sm">Open calendar</ButtonLink>}
            >
              <EventList events={nextEvents} />
            </Panel>
          </div>

          <Panel
            title="Project command"
            description="Projects remain the strongest inspection layer for deliverables, updates, linked work, and durable context."
            action={<ButtonLink href="/projects" size="sm">View portfolio</ButtonLink>}
          >
            <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
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

        <div className="space-y-4">
          <Panel
            title="Brief feed"
            description="Morning briefs and nightly updates stay on the main surface instead of being buried elsewhere."
            action={
              <Button
                size="sm"
                onClick={() => showFeedback("Brief generation will later come from automation and nightly jobs.")}
              >
                How it works
              </Button>
            }
          >
            <BriefFeed briefs={briefs} />
          </Panel>

          <Panel
            title="Memory"
            description="Project-linked notes, decisions, and operating preferences remain immediately retrievable."
            action={
              <Button size="sm" onClick={() => openDrawer("memory")}>
                Capture
              </Button>
            }
          >
            <MemoryList memories={memories.slice(0, 4)} />
          </Panel>

          <Panel
            title="Reference"
            description="Docs stay close to active work instead of living in a disconnected knowledge silo."
            action={<ButtonLink href="/docs" size="sm">Open docs</ButtonLink>}
          >
            <DocList docs={docs.slice(0, 3)} />
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

function InlineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/8 bg-black/20 px-3 py-2 text-right">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#72808e]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function QuickAction({
  title,
  detail,
  onClick,
}: {
  title: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-[12px] border border-white/8 bg-black/20 px-3 py-3 text-left hover:bg-white/[0.04]"
      onClick={onClick}
    >
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#8f9dab]">{detail}</p>
    </button>
  );
}
