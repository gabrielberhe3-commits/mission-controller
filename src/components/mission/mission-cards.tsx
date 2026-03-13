import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getProjectById } from "@/data/mission-control";
import type { CalendarEvent, Doc, MemoryItem, Project, Task, WorkspaceMetric } from "@/types/mission";

function getEventTone(kind: CalendarEvent["kind"]) {
  switch (kind) {
    case "meeting":
      return "sky";
    case "focus":
      return "copper";
    case "personal":
      return "emerald";
    case "review":
      return "amber";
  }
}

function getPriorityTone(priority: Task["priority"]) {
  switch (priority) {
    case "High":
      return "amber";
    case "Medium":
      return "sky";
    case "Low":
      return "neutral";
  }
}

function getStatusTone(status: Project["status"] | Task["status"]) {
  switch (status) {
    case "On Track":
    case "Done":
      return "emerald";
    case "At Risk":
    case "Blocked":
      return "rose";
    case "Planning":
    case "Backlog":
      return "neutral";
    case "In Progress":
      return "sky";
  }
}

export function MetricGrid({ metrics }: { metrics: WorkspaceMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-[#7f90a5]">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
            {metric.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{metric.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function FocusGrid({
  nextEvent,
  featuredProject,
  memoryAnchor,
}: {
  nextEvent: CalendarEvent;
  featuredProject: Project;
  memoryAnchor: MemoryItem;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
        <p className="text-sm text-[#7f90a5]">Next event</p>
        <p className="mt-3 text-lg font-semibold text-white">{nextEvent.title}</p>
        <p className="mt-1 text-sm text-[#93a6ba]">
          {nextEvent.dateLabel} · {nextEvent.timeRange}
        </p>
      </div>
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
        <p className="text-sm text-[#7f90a5]">Project in focus</p>
        <p className="mt-3 text-lg font-semibold text-white">{featuredProject.name}</p>
        <p className="mt-1 text-sm text-[#93a6ba]">{featuredProject.nextMilestone}</p>
      </div>
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
        <p className="text-sm text-[#7f90a5]">Memory anchor</p>
        <p className="mt-3 text-lg font-semibold text-white">{memoryAnchor.title}</p>
        <p className="mt-1 text-sm text-[#93a6ba]">{memoryAnchor.note}</p>
      </div>
    </div>
  );
}

export function EventList({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="grid gap-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-medium text-white">{event.title}</p>
              <Badge tone={getEventTone(event.kind)}>{event.kind}</Badge>
            </div>
            <p className="mt-1 text-sm text-[#90a2b5]">
              {event.day} · {event.timeRange} · {event.location}
            </p>
          </div>
          <button className="text-left text-sm text-[#d0b48b] transition hover:text-[#f0d8b4]">
            View item
          </button>
        </div>
      ))}
    </div>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const project = getProjectById(task.projectId);

        return (
          <div key={task.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{task.title}</p>
                <p className="mt-1 text-sm text-[#90a2b5]">
                  {project?.name} · Due {task.dueLabel} · {task.energy} work
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={getPriorityTone(task.priority)}>{task.priority}</Badge>
                <Badge tone={getStatusTone(task.status)}>{task.status}</Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div key={project.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-medium text-white">{project.name}</p>
                <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-[#90a2b5]">
                {project.owner} · {project.horizon}
              </p>
            </div>
            <span className="text-sm font-medium text-[#f0d8b4]">{project.progress}%</span>
          </div>
          <div className="mt-4">
            <ProgressBar value={project.progress} />
          </div>
          <p className="mt-3 text-sm text-[#9caec1]">Next: {project.nextMilestone}</p>
        </div>
      ))}
    </div>
  );
}

export function MemoryList({ memories }: { memories: MemoryItem[] }) {
  return (
    <div className="space-y-3">
      {memories.map((memory) => (
        <div key={memory.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{memory.title}</p>
            <Badge tone="neutral">{memory.kind}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{memory.note}</p>
          <p className="mt-3 text-xs text-[#718297]">Updated {memory.updatedAt}</p>
        </div>
      ))}
    </div>
  );
}

export function DocList({ docs }: { docs: Doc[] }) {
  return (
    <div className="space-y-3">
      {docs.map((doc) => (
        <div key={doc.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{doc.title}</p>
            <Badge tone="sky">{doc.category}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{doc.summary}</p>
          <p className="mt-3 text-xs text-[#718297]">Updated {doc.updatedAt}</p>
        </div>
      ))}
    </div>
  );
}

export function RoadmapList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#c8d3df]">
          {index + 1}. {item}
        </li>
      ))}
    </ol>
  );
}
