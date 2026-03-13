"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDisplayDate, formatDueLabel } from "@/data/mission-control";
import { useWorkspace } from "@/components/providers/workspace-provider";
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

export function MetricGrid({ metrics }: { metrics: WorkspaceMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4"
        >
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

export function BriefFeed({ briefs }: { briefs: BriefEntry[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-3">
      {briefs.map((brief) => (
        <div
          key={brief.id}
          className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(213,159,97,0.12),rgba(255,255,255,0.03))] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={brief.type === "Morning Brief" ? "amber" : "sky"}>{brief.type}</Badge>
                <p className="text-xs uppercase tracking-[0.18em] text-[#9eb0c3]">{brief.createdAt}</p>
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
              <li key={bullet} className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3">
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
              {formatDisplayDate(event.date)} · {event.timeRange} · {event.location}
            </p>
          </div>
          <div className="flex gap-2">
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
    <div className="space-y-3">
      {tasks.map((task) => {
        const project = getProject(task.projectId);

        return (
          <div key={task.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{task.title}</p>
                <p className="mt-1 text-sm text-[#90a2b5]">
                  {project?.name} · Due {formatDueLabel(task.dueDate)} · {task.energy} work
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#708196]">
                  {task.source === "system" ? "System inserted" : "User added"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={getPriorityTone(task.priority)}>{task.priority}</Badge>
                <Badge tone={getStatusTone(task.status)}>{task.status}</Badge>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => cycleTaskStatus(task.id)}>
                Advance status
              </Button>
              <Button
                size="sm"
                onClick={() => setSelectedProjectId(task.projectId)}
              >
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
    <div className="space-y-3">
      {projects.map((project) => {
        const selected = project.id === selectedProjectId;

        return (
          <div
            key={project.id}
            className={`w-full rounded-[22px] border p-4 text-left ${
              selected
                ? "border-[rgba(213,159,97,0.38)] bg-[rgba(213,159,97,0.08)]"
                : "border-white/10 bg-black/20"
            }`}
          >
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
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => setSelectedProjectId(project.id)}>
                Inspect
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showFeedback(project.summary)}
              >
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
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
              <Badge tone={getStatusTone(project.status)}>{project.status}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#aebdcc]">{project.summary}</p>
          </div>
          <div className="w-full max-w-56">
            <p className="text-sm text-[#7f90a5]">Progress</p>
            <p className="mt-2 text-3xl font-semibold text-white">{project.progress}%</p>
            <div className="mt-3">
              <ProgressBar value={project.progress} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailStat label="Deliverables" value={String(project.deliverables.length)} />
        <DetailStat label="Updates" value={String(project.updates.length)} />
        <DetailStat label="Linked tasks" value={String(linkedTasks.length)} />
        <DetailStat label="Memory anchors" value={String(linkedMemories.length)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">
            Deliverables
          </p>
          <div className="mt-4 space-y-3">
            {project.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium text-white">{deliverable.title}</p>
                  <Badge tone={deliverable.status === "Ready" ? "emerald" : deliverable.status === "In Progress" ? "sky" : "neutral"}>
                    {deliverable.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-[#aebdcc]">{deliverable.summary}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#708196]">
                  {deliverable.kind} · {deliverable.updatedAt}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">
            Updates and history
          </p>
          <div className="mt-4 space-y-3">
            {project.updates.map((update) => (
              <div key={update.id} className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">
                <p className="font-medium text-white">{update.title}</p>
                <p className="mt-2 text-sm text-[#aebdcc]">{update.summary}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#708196]">{update.createdAt}</p>
              </div>
            ))}
            {project.history.map((item) => (
              <div key={item.id} className="rounded-[18px] border border-white/8 bg-black/25 p-4">
                <p className="font-medium text-white">{item.label}</p>
                <p className="mt-1 text-sm text-[#aebdcc]">{item.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#708196]">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <LinkedList title="Linked tasks" items={linkedTasks.map((task) => `${task.title} · ${task.status}`)} />
        <LinkedList title="Linked docs" items={linkedDocs.map((doc) => `${doc.title} · ${doc.category}`)} />
        <LinkedList title="Linked events" items={linkedEvents.map((event) => `${event.title} · ${formatDisplayDate(event.date)}`)} />
        <LinkedList title="Linked briefs" items={linkedBriefs.map((brief) => `${brief.type} · ${brief.title}`)} />
      </div>
    </div>
  );
}

function LinkedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa2b8]">{title}</p>
      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => (
            <div key={item} className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#d5dfea]">
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-[18px] border border-dashed border-white/12 px-4 py-3 text-sm text-[#8ea0b5]">
            Nothing linked yet.
          </div>
        )}
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-[#8ea0b5]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function MemoryList({ memories }: { memories: MemoryItem[] }) {
  const { setSelectedProjectId } = useWorkspace();

  return (
    <div className="space-y-3">
      {memories.map((memory) => (
        <div key={memory.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium text-white">{memory.title}</p>
            <div className="flex gap-2">
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
    <div className="space-y-3">
      {docs.map((doc) => (
        <div key={doc.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{doc.title}</p>
            <Badge tone="sky">{doc.category}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#9caec1]">{doc.summary}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#718297]">Updated {doc.updatedAt}</p>
            <div className="flex gap-2">
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
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#c8d3df]"
        >
          {index + 1}. {item}
        </li>
      ))}
    </ol>
  );
}
