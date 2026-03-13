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

export type MemoryKind = "focus" | "preference" | "decision" | "insight" | "note";

export type DocCategory = "Product" | "Integration" | "Playbook" | "Research";

export type BriefType = "Morning Brief" | "Nightly Update";

export type TaskSource = "user" | "system";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  timeRange: string;
  location: string;
  kind: EventKind;
  linkedProjectId?: string;
  notes?: string;
};

export type Task = {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  projectId: string;
  energy: "Light" | "Deep";
  source: TaskSource;
  notes?: string;
  createdAt: string;
};

export type TaskDraft = {
  title: string;
  dueDate: string;
  priority: TaskPriority;
  projectId: string;
  energy: "Light" | "Deep";
  notes?: string;
  status?: TaskStatus;
  source?: TaskSource;
};

export type BriefEntry = {
  id: string;
  title: string;
  type: BriefType;
  createdAt: string;
  summary: string;
  bullets: string[];
  linkedProjectIds: string[];
};

export type ProjectDeliverable = {
  id: string;
  title: string;
  kind: "Spec" | "Prototype" | "Review" | "Research";
  status: "Ready" | "In Progress" | "Queued";
  updatedAt: string;
  summary: string;
};

export type ProjectUpdate = {
  id: string;
  title: string;
  createdAt: string;
  summary: string;
};

export type ProjectHistoryItem = {
  id: string;
  date: string;
  label: string;
  detail: string;
};

export type Project = {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  owner: string;
  nextMilestone: string;
  horizon: string;
  summary: string;
  deliverables: ProjectDeliverable[];
  updates: ProjectUpdate[];
  history: ProjectHistoryItem[];
};

export type MemoryItem = {
  id: string;
  title: string;
  note: string;
  kind: MemoryKind;
  updatedAt: string;
  linkedProjectId?: string;
  source: TaskSource;
};

export type MemoryDraft = {
  title: string;
  note: string;
  kind: MemoryKind;
  linkedProjectId?: string;
  source?: TaskSource;
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

export type ApprovalStatus = "Waiting" | "Ready" | "Blocked";

export type ApprovalItem = {
  id: string;
  title: string;
  detail: string;
  owner: string;
  due: string;
  status: ApprovalStatus;
};

export type PersonStatus = "Available" | "Focus" | "Away";

export type Person = {
  id: string;
  name: string;
  role: string;
  focus: string;
  initials: string;
  status: PersonStatus;
};

export type WorkspaceState = {
  tasks: Task[];
  memories: MemoryItem[];
  calendarView: CalendarView;
  selectedProjectId: string;
};
