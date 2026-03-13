import type {
  CalendarEvent,
  CalendarView,
  Doc,
  MemoryItem,
  NavItem,
  Project,
  Task,
  WorkspaceMetric,
} from "@/types/mission";

export const workspaceMeta = {
  operator: "Gabriel",
  productName: "Mission Controller",
  strapline: "A personal operating system for planning, execution, and context.",
  status: "Focused mode",
  snapshotDate: "Friday, March 13",
};

export const navigationItems: NavItem[] = [
  {
    href: "/",
    label: "Mission Control",
    shortLabel: "Home",
    description: "Daily command layer across calendar, tasks, and context.",
  },
  {
    href: "/calendar",
    label: "Calendar",
    shortLabel: "Cal",
    description: "Imported and native events will live here.",
  },
  {
    href: "/tasks",
    label: "Tasks",
    shortLabel: "Task",
    description: "Execution queue with project-aware prioritization.",
  },
  {
    href: "/projects",
    label: "Projects",
    shortLabel: "Proj",
    description: "Containers for goals, milestones, and linked work.",
  },
  {
    href: "/memory",
    label: "Memory",
    shortLabel: "Memo",
    description: "Durable context, preferences, and decisions.",
  },
  {
    href: "/docs",
    label: "Docs",
    shortLabel: "Docs",
    description: "Structured notes and operating playbooks.",
  },
];

export const calendarViews: CalendarView[] = ["Month", "Week", "Day", "Agenda"];

export const seededEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Mission Controller product review",
    dateLabel: "Today",
    day: "Fri 13",
    timeRange: "09:00 - 09:45",
    location: "Studio desk",
    kind: "meeting",
    linkedProjectId: "p1",
  },
  {
    id: "e2",
    title: "Deep build sprint: shell + routes",
    dateLabel: "Today",
    day: "Fri 13",
    timeRange: "10:30 - 12:30",
    location: "Focus block",
    kind: "focus",
    linkedProjectId: "p1",
  },
  {
    id: "e3",
    title: "Weekly systems reset",
    dateLabel: "Today",
    day: "Fri 13",
    timeRange: "15:00 - 15:30",
    location: "Operations",
    kind: "review",
  },
  {
    id: "e4",
    title: "Gym + recovery",
    dateLabel: "Today",
    day: "Fri 13",
    timeRange: "18:00 - 19:00",
    location: "Personal",
    kind: "personal",
  },
  {
    id: "e5",
    title: "Calendar import design",
    dateLabel: "Tomorrow",
    day: "Sat 14",
    timeRange: "09:30 - 10:30",
    location: "Planning",
    kind: "focus",
    linkedProjectId: "p1",
  },
];

export const seededProjects: Project[] = [
  {
    id: "p1",
    name: "Mission Controller",
    progress: 72,
    status: "On Track",
    owner: "Gabriel",
    nextMilestone: "Local persistence and calendar import adapter",
    horizon: "Q2 foundation",
  },
  {
    id: "p2",
    name: "Investing OS",
    progress: 38,
    status: "Planning",
    owner: "Gabriel",
    nextMilestone: "Watchlist thesis pages and review cadence",
    horizon: "Research buildout",
  },
  {
    id: "p3",
    name: "Agent Business",
    progress: 46,
    status: "At Risk",
    owner: "Gabriel",
    nextMilestone: "Clarify offer system and outbound loop",
    horizon: "Revenue experiments",
  },
];

export const seededTasks: Task[] = [
  {
    id: "t1",
    title: "Split MVP into reusable route architecture",
    dueLabel: "Today",
    priority: "High",
    status: "In Progress",
    projectId: "p1",
    energy: "Deep",
  },
  {
    id: "t2",
    title: "Define import adapter shape for .ics and Google exports",
    dueLabel: "Tomorrow",
    priority: "High",
    status: "Backlog",
    projectId: "p1",
    energy: "Deep",
  },
  {
    id: "t3",
    title: "Review semiconductor watchlist notes",
    dueLabel: "Today",
    priority: "Medium",
    status: "Backlog",
    projectId: "p2",
    energy: "Light",
  },
  {
    id: "t4",
    title: "Draft operator dashboard metrics",
    dueLabel: "Mon",
    priority: "Low",
    status: "Done",
    projectId: "p1",
    energy: "Light",
  },
  {
    id: "t5",
    title: "Resolve unclear outbound positioning",
    dueLabel: "Sun",
    priority: "Medium",
    status: "Blocked",
    projectId: "p3",
    energy: "Deep",
  },
];

export const seededMemories: MemoryItem[] = [
  {
    id: "m1",
    title: "Mission principle",
    note: "The calendar should be the spine, but tasks, docs, and memory must attach to time without feeling bolted on.",
    kind: "focus",
    updatedAt: "2h ago",
    linkedProjectId: "p1",
  },
  {
    id: "m2",
    title: "Operator preference",
    note: "Prefer local-first systems with explicit imports before any live sync or auth complexity.",
    kind: "preference",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
  },
  {
    id: "m3",
    title: "Recent decision",
    note: "Build extensible seeded modules now so persistence can swap in behind repositories later.",
    kind: "decision",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
  },
  {
    id: "m4",
    title: "Market lens",
    note: "AI infra, prediction markets, and systems software remain the highest-leverage research areas.",
    kind: "insight",
    updatedAt: "2d ago",
    linkedProjectId: "p2",
  },
];

export const seededDocs: Doc[] = [
  {
    id: "d1",
    title: "Personal operating system spec",
    category: "Product",
    summary: "Defines the core objects, information hierarchy, and the operator experience across the whole app.",
    updatedAt: "Today",
    linkedProjectId: "p1",
  },
  {
    id: "d2",
    title: "Calendar import strategy",
    category: "Integration",
    summary: "Import .ics and Google export flows first, then layer sync once the local model is stable.",
    updatedAt: "Today",
    linkedProjectId: "p1",
  },
  {
    id: "d3",
    title: "Daily operator loop",
    category: "Playbook",
    summary: "Morning review, focused execution blocks, and end-of-day memory capture keep the system coherent.",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
  },
  {
    id: "d4",
    title: "AI infrastructure map",
    category: "Research",
    summary: "Living notes on model infra, chips, platforms, and the themes worth tracking weekly.",
    updatedAt: "2d ago",
    linkedProjectId: "p2",
  },
];

export const roadmapItems = [
  "Add a repository layer so seeded data can be replaced with SQLite or IndexedDB without rewriting views.",
  "Support .ics ingestion and Google export import before considering live OAuth sync.",
  "Introduce object linking between events, tasks, projects, memories, and docs.",
  "Add a command palette, keyboard shortcuts, and a daily planner workflow.",
];

export const workspaceMetrics: WorkspaceMetric[] = [
  {
    id: "wm1",
    label: "Open loops",
    value: "11",
    detail: "Tasks, meetings, and docs requiring attention this week.",
  },
  {
    id: "wm2",
    label: "Focus capacity",
    value: "4.5h",
    detail: "Protected deep-work time still available today.",
  },
  {
    id: "wm3",
    label: "Context anchors",
    value: "8",
    detail: "Memories and docs linked to active workstreams.",
  },
];

export function getProjectById(projectId: string) {
  return seededProjects.find((project) => project.id === projectId);
}

export function getTasksForProject(projectId: string) {
  return seededTasks.filter((task) => task.projectId === projectId);
}

export function getEventsForProject(projectId: string) {
  return seededEvents.filter((event) => event.linkedProjectId === projectId);
}

export function getDocsForProject(projectId: string) {
  return seededDocs.filter((doc) => doc.linkedProjectId === projectId);
}

export function getMemoryForProject(projectId: string) {
  return seededMemories.filter((memory) => memory.linkedProjectId === projectId);
}
