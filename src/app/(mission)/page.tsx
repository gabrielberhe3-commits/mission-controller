import { FocusGrid, TaskList, EventList, MetricGrid, ProjectList, MemoryList, DocList, RoadmapList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import {
  roadmapItems,
  seededDocs,
  seededEvents,
  seededMemories,
  seededProjects,
  seededTasks,
  workspaceMetrics,
} from "@/data/mission-control";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mission Control"
        title="Your calendar, execution, and context now share one surface."
        description="This v2 foundation turns the MVP into a real app structure: reusable shell, separate routes, seeded domain modules, and clear extension points for persistence and calendar import."
        actions={
          <>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#11151a] transition hover:bg-[#f5efe4]">
              Review today
            </button>
            <button className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-[#dbe5ee] transition hover:bg-white/[0.05]">
              Open planner
            </button>
          </>
        }
      />

      <MetricGrid metrics={workspaceMetrics} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Panel
            title="Daily synthesis"
            description="Mission-level signal across events, projects, and durable context."
            action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Customize</button>}
          >
            <FocusGrid
              nextEvent={seededEvents[0]}
              featuredProject={seededProjects[0]}
              memoryAnchor={seededMemories[0]}
            />
          </Panel>

          <Panel
            title="Calendar"
            description="Time is the spine. Start with local seeded objects and keep import/sync adapters behind this layer."
            action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Open full calendar</button>}
          >
            <EventList events={seededEvents.slice(0, 4)} />
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel
              title="Tasks"
              description="Execution queue with project context and room for future persistence."
              action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">New task</button>}
            >
              <TaskList tasks={seededTasks.slice(0, 4)} />
            </Panel>
            <Panel
              title="Projects"
              description="Track milestones, operating status, and progress without leaving the command layer."
              action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">View portfolio</button>}
            >
              <ProjectList projects={seededProjects} />
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <Panel
            title="Memory"
            description="Durable context, preferences, and decisions linked to active work."
            action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Capture</button>}
          >
            <MemoryList memories={seededMemories.slice(0, 3)} />
          </Panel>
          <Panel
            title="Docs"
            description="Structured notes and playbooks that explain how the system should behave."
            action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Open docs</button>}
          >
            <DocList docs={seededDocs.slice(0, 3)} />
          </Panel>
          <Panel
            title="Next build wave"
            description="The architecture is now ready for persistence, import adapters, and tighter cross-object links."
          >
            <RoadmapList items={roadmapItems} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
