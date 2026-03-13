"use client";

import type { ReactNode } from "react";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDisplayDate, formatDueLabel } from "@/data/mission-control";
import type {
  BriefEntry,
  CalendarEvent,
  Doc,
  MemoryItem,
  Project,
  Task,
  WorkspaceMetric,
} from "@/types/mission";

function getEventTone(kind: CalendarEvent["kind"]) {
  switch (kind) {
    case "meeting":
      return "sky";
    case "focus":
      return "neutral";
    case "personal":
      return "emerald";
    case "review":
      return "copper";
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
    <div className="grid gap-3 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="shell-panel rounded-[16px] px-4 py-4">
          <p className="eyebrow">{metric.label}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="metric-value text-white">{metric.value}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">{metric.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BriefFeed({ briefs }: { briefs: BriefEntry[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-2">
      {briefs.map((brief) => (
        <article key={brief.id} className="shell-card rounded-[14px] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={brief.type === "Morning Brief" ? "amber" : "sky"}>{brief.type}</Badge>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{brief.createdAt}</p>
              </div>
              <p className="mt-3 text-sm font-medium text-white">{brief.title}</p>
            </div>
            {brief.linkedProjectIds[0] ? (
              <Button size="sm" onClick={() => setSelectedProjectId(brief.linkedProjectIds[0])}>
                Project
              </Button>
            ) : null}
          </div>
          <ul className="mt-3 space-y-2">
            {brief.bullets.map((bullet) => (
              <li key={bullet} className="rounded-[10px] border border-white/6 bg-[#080808] px-3 py-2 text-sm text-[#bcbcbc]">
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function EventList({ events }: { events: CalendarEvent[] }) {
  const { setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div key={event.id} className="shell-card rounded-[14px] px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-white">{event.title}</p>
                <Badge tone={getEventTone(event.kind)}>{event.kind}</Badge>
              </div>
              <p className="mt-1 text-sm text-[#8b8b8b]">
                {event.timeRange} · {event.location}
              </p>
            </div>
            <div className="flex gap-2">
              {event.linkedProjectId ? (
                <Button size="sm" onClick={() => setSelectedProjectId(event.linkedProjectId!)}>
                  Project
                </Button>
              ) : null}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(event.notes ?? "No extra event notes captured yet.")}
              >
                Notes
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const { cycleTaskStatus, getProject, setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const project = getProject(task.projectId);

        return (
          <div key={task.id} className="shell-card rounded-[14px] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">{task.title}</p>
                  <Badge tone={getStatusTone(task.status)}>{task.status}</Badge>
                  <Badge tone={getPriorityTone(task.priority)}>{task.priority}</Badge>
                </div>
                <p className="mt-1 text-sm text-[#868686]">
                  {project?.name} · {formatDueLabel(task.dueDate)} · {task.energy}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => cycleTaskStatus(task.id)}>
                Advance
              </Button>
              <Button size="sm" onClick={() => setSelectedProjectId(task.projectId)}>
                Project
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(task.notes ?? "No extra notes on this task yet.")}
              >
                Notes
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectList({
  projects,
  selectedProjectId,
}: {
  projects: Project[];
  selectedProjectId?: string;
}) {
  const { setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="space-y-2">
      {projects.map((project) => {
        const selected = project.id === selectedProjectId;

        return (
          <div
            key={project.id}
            className={`rounded-[14px] p-4 ${selected ? "shell-card-strong" : "shell-card"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">{project.name}</p>
                  <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-[#868686]">{project.nextMilestone}</p>
              </div>
              <span className="text-sm font-semibold tracking-[-0.05em] text-white">{project.progress}%</span>
            </div>
            <div className="mt-3">
              <ProgressBar value={project.progress} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setSelectedProjectId(project.id)}>
                Open
              </Button>
              <Button size="sm" variant="ghost" onClick={() => showFeedback(project.summary)}>
                Summary
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectDetail({
  project,
  linkedTasks,
  linkedMemories,
  linkedDocs,
  linkedEvents,
  linkedBriefs,
}: {
  project: Project;
  linkedTasks: Task[];
  linkedMemories: MemoryItem[];
  linkedDocs: Doc[];
  linkedEvents: CalendarEvent[];
  linkedBriefs: BriefEntry[];
}) {
  return (
    <div className="space-y-3">
      <div className="shell-card rounded-[16px] p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold tracking-[-0.05em] text-white">{project.name}</h3>
              <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm text-[#8c8c8c]">{project.summary}</p>
          </div>
          <div className="w-full max-w-56 rounded-[14px] border border-white/8 bg-[#080808] p-3">
            <p className="eyebrow">Progress</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white">{project.progress}%</p>
            <div className="mt-3">
              <ProgressBar value={project.progress} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <DetailStat label="Deliverables" value={String(project.deliverables.length)} />
        <DetailStat label="Updates" value={String(project.updates.length)} />
        <DetailStat label="Tasks" value={String(linkedTasks.length)} />
        <DetailStat label="Memory" value={String(linkedMemories.length)} />
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <InfoColumn title="Deliverables">
          {project.deliverables.map((deliverable) => (
            <RowCard key={deliverable.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-white">{deliverable.title}</p>
                <Badge
                  tone={
                    deliverable.status === "Ready"
                      ? "emerald"
                      : deliverable.status === "In Progress"
                        ? "sky"
                        : "neutral"
                  }
                >
                  {deliverable.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-[#8a8a8a]">{deliverable.summary}</p>
            </RowCard>
          ))}
        </InfoColumn>

        <InfoColumn title="Updates">
          {project.updates.map((update) => (
            <RowCard key={update.id}>
              <p className="text-sm font-medium text-white">{update.title}</p>
              <p className="mt-1 text-sm text-[#8a8a8a]">{update.summary}</p>
            </RowCard>
          ))}
          {project.history.map((item) => (
            <RowCard key={item.id} muted>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="mt-1 text-sm text-[#8a8a8a]">{item.detail}</p>
            </RowCard>
          ))}
        </InfoColumn>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <LinkedList title="Tasks" items={linkedTasks.map((task) => `${task.title} · ${task.status}`)} />
        <LinkedList title="Docs" items={linkedDocs.map((doc) => `${doc.title} · ${doc.category}`)} />
        <LinkedList
          title="Events"
          items={linkedEvents.map((event) => `${event.title} · ${formatDisplayDate(event.date)}`)}
        />
        <LinkedList title="Briefs" items={linkedBriefs.map((brief) => `${brief.type} · ${brief.title}`)} />
      </div>
    </div>
  );
}

function InfoColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="shell-card rounded-[16px] p-4">
      <p className="eyebrow">{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function LinkedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="shell-card rounded-[16px] p-4">
      <p className="eyebrow">{title}</p>
      <div className="mt-3 space-y-2">
        {items.length ? (
          items.map((item) => (
            <div key={item} className="rounded-[10px] border border-white/6 bg-[#080808] px-3 py-2 text-sm text-[#c1c1c1]">
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-[10px] border border-dashed border-white/8 px-3 py-2 text-sm text-[#727272]">
            Empty
          </div>
        )}
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="shell-panel rounded-[14px] px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">{value}</p>
    </div>
  );
}

function RowCard({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <div className={`rounded-[12px] border p-3 ${muted ? "border-white/5 bg-[#070707]" : "border-white/6 bg-[#090909]"}`}>
      {children}
    </div>
  );
}

export function MemoryList({ memories }: { memories: MemoryItem[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-2">
      {memories.map((memory) => (
        <div key={memory.id} className="shell-card rounded-[14px] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">{memory.title}</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">{memory.kind}</Badge>
              <Badge tone={memory.source === "system" ? "sky" : "amber"}>{memory.source}</Badge>
            </div>
          </div>
          <p className="mt-2 text-sm text-[#898989]">{memory.note}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{memory.updatedAt}</p>
            {memory.linkedProjectId ? (
              <Button size="sm" onClick={() => setSelectedProjectId(memory.linkedProjectId!)}>
                Project
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocList({ docs }: { docs: Doc[] }) {
  const { setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <div key={doc.id} className="shell-card rounded-[14px] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">{doc.title}</p>
            <Badge tone="sky">{doc.category}</Badge>
          </div>
          <p className="mt-2 text-sm text-[#898989]">{doc.summary}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{doc.updatedAt}</p>
            <div className="flex gap-2">
              {doc.linkedProjectId ? (
                <Button size="sm" onClick={() => setSelectedProjectId(doc.linkedProjectId!)}>
                  Project
                </Button>
              ) : null}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(`${doc.title}: editing is planned for a future document workspace.`)}
              >
                Open
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoadmapList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, index) => (
        <li key={item} className="shell-card rounded-[14px] px-4 py-3 text-sm text-[#c1c1c1]">
          <span className="mr-2 text-[#747474]">{index + 1}.</span>
          {item}
        </li>
      ))}
    </ol>
  );
}
