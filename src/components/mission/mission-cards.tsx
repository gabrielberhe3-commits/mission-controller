"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDisplayDate, formatDueLabel } from "@/data/mission-control";
import type { BriefEntry, CalendarEvent, Doc, MemoryItem, Project, Task, WorkspaceMetric } from "@/types/mission";

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

function cardClassName(selected = false) {
  return selected
    ? "surface-selected rounded-xl p-4"
    : "surface-subtle rounded-xl p-4";
}

export function MetricGrid({ metrics }: { metrics: WorkspaceMetric[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="surface-panel rounded-xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7f90a5]">
            {metric.label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
            {metric.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{metric.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function BriefFeed({ briefs }: { briefs: BriefEntry[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-3">
      {briefs.map((brief) => (
        <div key={brief.id} className="surface-subtle rounded-xl p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={brief.type === "Morning Brief" ? "amber" : "sky"}>{brief.type}</Badge>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                  {brief.createdAt}
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{brief.title}</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c0ceda]">{brief.summary}</p>
            </div>
            {brief.linkedProjectIds[0] ? (
              <Button size="sm" onClick={() => setSelectedProjectId(brief.linkedProjectIds[0])}>
                Inspect project
              </Button>
            ) : null}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[#dbe5ee]">
            {brief.bullets.map((bullet) => (
              <li key={bullet} className="rounded-lg border border-white/8 bg-black/20 px-3 py-2.5">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function EventList({ events }: { events: CalendarEvent[] }) {
  const { setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="grid gap-2.5">
      {events.map((event) => (
        <div
          key={event.id}
          className="surface-subtle flex flex-col gap-3 rounded-xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-white">{event.title}</p>
              <Badge tone={getEventTone(event.kind)}>{event.kind}</Badge>
            </div>
            <p className="mt-1 text-sm text-[#90a2b5]">
              {formatDisplayDate(event.date)} · {event.timeRange} · {event.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.linkedProjectId ? (
              <Button size="sm" onClick={() => setSelectedProjectId(event.linkedProjectId!)}>
                View project
              </Button>
            ) : null}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => showFeedback(event.notes ?? "No extra event notes captured yet.")}
            >
              View item
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const { cycleTaskStatus, getProject, setSelectedProjectId, showFeedback } = useWorkspace();

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => {
        const project = getProject(task.projectId);

        return (
          <div key={task.id} className="surface-subtle rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{task.title}</p>
                <p className="mt-1 text-sm text-[#90a2b5]">
                  {project?.name} · Due {formatDueLabel(task.dueDate)} · {task.energy} work
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#708196]">
                  {task.source === "system" ? "System inserted" : "User added"}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                <Badge tone={getPriorityTone(task.priority)}>{task.priority}</Badge>
                <Badge tone={getStatusTone(task.status)}>{task.status}</Badge>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => cycleTaskStatus(task.id)}>
                Advance status
              </Button>
              <Button size="sm" onClick={() => setSelectedProjectId(task.projectId)}>
                Open project
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(task.notes ?? "No extra notes on this task yet.")}
              >
                Details
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
    <div className="space-y-2.5">
      {projects.map((project) => {
        const selected = project.id === selectedProjectId;

        return (
          <div key={project.id} className={cardClassName(selected)}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-white">{project.name}</p>
                  <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-[#90a2b5]">
                  {project.owner} · {project.horizon}
                </p>
              </div>
              <span className="text-sm font-medium text-[#d7b070]">{project.progress}%</span>
            </div>
            <div className="mt-4">
              <ProgressBar value={project.progress} />
            </div>
            <p className="mt-3 text-sm text-[#9caec1]">Next: {project.nextMilestone}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setSelectedProjectId(project.id)}>
                Inspect
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
    <div className="space-y-4">
      <div className="surface-subtle rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#aebdcc]">{project.summary}</p>
          </div>
          <div className="w-full max-w-52 rounded-xl border border-white/8 bg-black/20 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7f90a5]">
              Progress
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">{project.progress}%</p>
            <div className="mt-3">
              <ProgressBar value={project.progress} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <DetailStat label="Deliverables" value={String(project.deliverables.length)} />
        <DetailStat label="Updates" value={String(project.updates.length)} />
        <DetailStat label="Linked tasks" value={String(linkedTasks.length)} />
        <DetailStat label="Memory anchors" value={String(linkedMemories.length)} />
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <InfoColumn title="Deliverables">
          {project.deliverables.map((deliverable) => (
            <div key={deliverable.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium text-white">{deliverable.title}</p>
                <Badge tone={deliverable.status === "Ready" ? "emerald" : deliverable.status === "In Progress" ? "sky" : "neutral"}>
                  {deliverable.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-[#aebdcc]">{deliverable.summary}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#708196]">
                {deliverable.kind} · {deliverable.updatedAt}
              </p>
            </div>
          ))}
        </InfoColumn>

        <InfoColumn title="Updates and history">
          {project.updates.map((update) => (
            <div key={update.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="font-medium text-white">{update.title}</p>
              <p className="mt-2 text-sm text-[#aebdcc]">{update.summary}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#708196]">
                {update.createdAt}
              </p>
            </div>
          ))}
          {project.history.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/8 bg-black/25 p-4">
              <p className="font-medium text-white">{item.label}</p>
              <p className="mt-1 text-sm text-[#aebdcc]">{item.detail}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#708196]">
                {item.date}
              </p>
            </div>
          ))}
        </InfoColumn>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <LinkedList title="Linked tasks" items={linkedTasks.map((task) => `${task.title} · ${task.status}`)} />
        <LinkedList title="Linked docs" items={linkedDocs.map((doc) => `${doc.title} · ${doc.category}`)} />
        <LinkedList title="Linked events" items={linkedEvents.map((event) => `${event.title} · ${formatDisplayDate(event.date)}`)} />
        <LinkedList title="Linked briefs" items={linkedBriefs.map((brief) => `${brief.type} · ${brief.title}`)} />
      </div>
    </div>
  );
}

function InfoColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-subtle rounded-xl p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">
        {title}
      </p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function LinkedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface-subtle rounded-xl p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">{title}</p>
      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => (
            <div key={item} className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-[#d5dfea]">
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-white/12 px-3 py-2.5 text-sm text-[#8ea0b5]">
            Nothing linked yet.
          </div>
        )}
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-subtle rounded-xl p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function MemoryList({ memories }: { memories: MemoryItem[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-2.5">
      {memories.map((memory) => (
        <div key={memory.id} className="surface-subtle rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium text-white">{memory.title}</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">{memory.kind}</Badge>
              <Badge tone={memory.source === "system" ? "sky" : "amber"}>{memory.source}</Badge>
            </div>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{memory.note}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#718297]">Updated {memory.updatedAt}</p>
            {memory.linkedProjectId ? (
              <Button size="sm" onClick={() => setSelectedProjectId(memory.linkedProjectId!)}>
                Open project
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
    <div className="space-y-2.5">
      {docs.map((doc) => (
        <div key={doc.id} className="surface-subtle rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium text-white">{doc.title}</p>
            <Badge tone="sky">{doc.category}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{doc.summary}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#718297]">Updated {doc.updatedAt}</p>
            <div className="flex flex-wrap gap-2">
              {doc.linkedProjectId ? (
                <Button size="sm" onClick={() => setSelectedProjectId(doc.linkedProjectId!)}>
                  Open project
                </Button>
              ) : null}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(`${doc.title}: editing is planned for a future document workspace.`)}
              >
                Open doc
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
    <ol className="space-y-2.5">
      {items.map((item, index) => (
        <li key={item} className="surface-subtle rounded-xl p-4 text-sm leading-6 text-[#c8d3df]">
          <span className="mr-2 font-semibold text-[#d7b070]">{index + 1}.</span>
          {item}
        </li>
      ))}
    </ol>
  );
}
