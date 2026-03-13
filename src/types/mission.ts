export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
};

export type CalendarView = "Month" | "Week" | "Day" | "Agenda";

export type EventKind = "meeting" | "focus" | "personal" | "review";

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "Backlog" | "In Progress" | "Blocked" | "Done";

export type ProjectStatus = "On Track" | "At Risk" | "Planning";

export type MemoryKind = "focus" | "preference" | "decision" | "insight";

export type DocCategory = "Product" | "Integration" | "Playbook" | "Research";

export type CalendarEvent = {
  id: string;
  title: string;
  dateLabel: string;
  day: string;
  timeRange: string;
  location: string;
  kind: EventKind;
  linkedProjectId?: string;
};

export type Task = {
  id: string;
  title: string;
  dueLabel: string;
  priority: TaskPriority;
  status: TaskStatus;
  projectId: string;
  energy: "Light" | "Deep";
};

export type Project = {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  owner: string;
  nextMilestone: string;
  horizon: string;
};

export type MemoryItem = {
  id: string;
  title: string;
  note: string;
  kind: MemoryKind;
  updatedAt: string;
  linkedProjectId?: string;
};

export type Doc = {
  id: string;
  title: string;
  category: DocCategory;
  summary: string;
  updatedAt: string;
  linkedProjectId?: string;
};

export type WorkspaceMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};
