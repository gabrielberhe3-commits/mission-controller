import type {
  ApprovalItem,
  BriefEntry,
  CalendarEvent,
  CalendarView,
  Doc,
  MemoryItem,
  NavItem,
  Person,
  Project,
  Task,
  WorkspaceMetric,
  WorkspaceState,
} from "@/types/mission";

export const workspaceMeta = {
  operator: "Gabriel",
  productName: "Mission Controller",
  strapline: "Local-first operating system.",
  status: "Local only",
  snapshotDate: "Friday, March 13, 2026",
};

export const navigationItems: NavItem[] = [
  {
    href: "/",
    label: "Overview",
    shortLabel: "Home",
    description: "Dashboard",
  },
  {
    href: "/tasks",
    label: "Tasks",
    shortLabel: "Tasks",
    description: "Queue",
  },
  {
    href: "/approvals",
    label: "Approvals",
    shortLabel: "Approve",
    description: "Reviews",
  },
  {
    href: "/calendar",
    label: "Calendar",
    shortLabel: "Calendar",
    description: "Schedule",
  },
  {
    href: "/projects",
    label: "Projects",
    shortLabel: "Projects",
    description: "Portfolio",
  },
  {
    href: "/memory",
    label: "Memory",
    shortLabel: "Memory",
    description: "Notes",
  },
  {
    href: "/docs",
    label: "Docs",
    shortLabel: "Docs",
    description: "Reference",
  },
  {
    href: "/people",
    label: "People",
    shortLabel: "People",
    description: "Contacts",
  },
];

export const calendarViews: CalendarView[] = ["Month", "Week", "Day", "Agenda"];

export const seededEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Mission Controller product review",
    date: "2026-03-13",
    timeRange: "09:00 - 09:45",
    location: "Studio desk",
    kind: "meeting",
    linkedProjectId: "p1",
    notes: "Finalize the v3 interaction model and operator IA.",
  },
  {
    id: "e2",
    title: "Deep build sprint",
    date: "2026-03-13",
    timeRange: "10:30 - 12:30",
    location: "Focus block",
    kind: "focus",
    linkedProjectId: "p1",
    notes: "Implement shared local-first state and route cohesion.",
  },
  {
    id: "e3",
    title: "Weekly systems reset",
    date: "2026-03-13",
    timeRange: "15:00 - 15:30",
    location: "Operations",
    kind: "review",
    notes: "Reset priorities and capture memory updates.",
  },
  {
    id: "e4",
    title: "Gym + recovery",
    date: "2026-03-13",
    timeRange: "18:00 - 19:00",
    location: "Personal",
    kind: "personal",
  },
  {
    id: "e5",
    title: "Calendar import design",
    date: "2026-03-14",
    timeRange: "09:30 - 10:30",
    location: "Planning",
    kind: "focus",
    linkedProjectId: "p1",
  },
  {
    id: "e6",
    title: "Research block: AI infra map",
    date: "2026-03-15",
    timeRange: "11:00 - 12:00",
    location: "Research",
    kind: "focus",
    linkedProjectId: "p2",
  },
];

export const seededProjects: Project[] = [
  {
    id: "p1",
    name: "Mission Controller",
    progress: 78,
    status: "On Track",
    owner: "Gabriel",
    nextMilestone: "Local persistence and assistant task insertion contract",
    horizon: "Q2 foundation",
    summary: "Personal operating system replacing calendar, tasks, docs, and scattered notes with one operator surface.",
    deliverables: [
      {
        id: "pd1",
        title: "v3 interaction architecture",
        kind: "Spec",
        status: "Ready",
        updatedAt: "Today",
        summary: "Reusable patterns for briefs, drawers, segmented controls, and project detail inspection.",
      },
      {
        id: "pd2",
        title: "Local-first task pipeline",
        kind: "Prototype",
        status: "In Progress",
        updatedAt: "Today",
        summary: "Client-managed task insertion path for user and future assistant automation.",
      },
    ],
    updates: [
      {
        id: "pu1",
        title: "Nightly build wave surfaced in app",
        createdAt: "2026-03-13 06:20",
        summary: "Morning brief and nightly updates are now treated as first-class feed items.",
      },
      {
        id: "pu2",
        title: "Project-linked context graph clarified",
        createdAt: "2026-03-12 22:10",
        summary: "Deliverables, memory, docs, and tasks now roll up under project detail rather than living as disconnected lists.",
      },
    ],
    history: [
      {
        id: "ph1",
        date: "2026-03-11",
        label: "IA reset",
        detail: "Shifted from demo pages to operator workflows.",
      },
      {
        id: "ph2",
        date: "2026-03-12",
        label: "Data model expansion",
        detail: "Added briefs, deliverables, updates, and richer memory types.",
      },
      {
        id: "ph3",
        date: "2026-03-13",
        label: "Interactive v3 foundation",
        detail: "Enabled working controls, project inspection, and local task creation.",
      },
    ],
  },
  {
    id: "p2",
    name: "Investing OS",
    progress: 42,
    status: "Planning",
    owner: "Gabriel",
    nextMilestone: "Watchlist thesis pages and weekly review flow",
    horizon: "Research buildout",
    summary: "Research workspace for tracking themes, theses, and review loops across markets and companies.",
    deliverables: [
      {
        id: "pd3",
        title: "AI infra watchlist map",
        kind: "Research",
        status: "In Progress",
        updatedAt: "Yesterday",
        summary: "Map the infra stack, chip cycle, and public market names worth tracking weekly.",
      },
    ],
    updates: [
      {
        id: "pu3",
        title: "Research taxonomy narrowed",
        createdAt: "2026-03-12 19:00",
        summary: "Kept focus on AI infra, prediction markets, and systems software.",
      },
    ],
    history: [
      {
        id: "ph4",
        date: "2026-03-10",
        label: "Theme narrowing",
        detail: "Dropped low-conviction sectors from the active queue.",
      },
    ],
  },
  {
    id: "p3",
    name: "Agent Business",
    progress: 46,
    status: "At Risk",
    owner: "Gabriel",
    nextMilestone: "Clarify offer system and outbound loop",
    horizon: "Revenue experiments",
    summary: "Packaging automation capability into repeatable services with clearer positioning and delivery loops.",
    deliverables: [
      {
        id: "pd4",
        title: "Offer system outline",
        kind: "Spec",
        status: "Queued",
        updatedAt: "2d ago",
        summary: "Frame the offer ladder and proof points before increasing outbound effort.",
      },
    ],
    updates: [
      {
        id: "pu4",
        title: "Positioning still unclear",
        createdAt: "2026-03-11 17:40",
        summary: "Need sharper problem framing before pushing volume.",
      },
    ],
    history: [
      {
        id: "ph5",
        date: "2026-03-09",
        label: "Risk flagged",
        detail: "Positioning ambiguity is slowing outbound execution.",
      },
    ],
  },
];

export const seededTasks: Task[] = [
  {
    id: "t1",
    title: "Split MVP into reusable route architecture",
    dueDate: "2026-03-13",
    priority: "High",
    status: "In Progress",
    projectId: "p1",
    energy: "Deep",
    source: "system",
    notes: "Establish reusable primitives rather than page-local hacks.",
    createdAt: "2026-03-13 06:10",
  },
  {
    id: "t2",
    title: "Define import adapter shape for calendar ingestion",
    dueDate: "2026-03-14",
    priority: "High",
    status: "Backlog",
    projectId: "p1",
    energy: "Deep",
    source: "system",
    createdAt: "2026-03-13 06:12",
  },
  {
    id: "t3",
    title: "Review semiconductor watchlist notes",
    dueDate: "2026-03-13",
    priority: "Medium",
    status: "Backlog",
    projectId: "p2",
    energy: "Light",
    source: "user",
    createdAt: "2026-03-12 20:05",
  },
  {
    id: "t4",
    title: "Draft operator dashboard metrics",
    dueDate: "2026-03-10",
    priority: "Low",
    status: "Done",
    projectId: "p1",
    energy: "Light",
    source: "system",
    createdAt: "2026-03-10 09:10",
  },
  {
    id: "t5",
    title: "Resolve unclear outbound positioning",
    dueDate: "2026-03-16",
    priority: "Medium",
    status: "Blocked",
    projectId: "p3",
    energy: "Deep",
    source: "user",
    notes: "Needs a cleaner problem statement and proof stack.",
    createdAt: "2026-03-11 17:42",
  },
];

export const seededMemories: MemoryItem[] = [
  {
    id: "m1",
    title: "Calendar is the spine",
    note: "Tasks, docs, and memory should attach to time without feeling bolted on.",
    kind: "focus",
    updatedAt: "2h ago",
    linkedProjectId: "p1",
    source: "system",
  },
  {
    id: "m2",
    title: "Prefer local-first systems",
    note: "Import before sync, explicit state before auth, and repositories behind the UI layer.",
    kind: "preference",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
    source: "system",
  },
  {
    id: "m3",
    title: "Automation should add work, not obscure it",
    note: "System-created tasks must look native in the queue and remain editable by the operator.",
    kind: "decision",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
    source: "system",
  },
  {
    id: "m4",
    title: "Highest leverage research areas",
    note: "AI infra, prediction markets, and systems software remain the most important active themes.",
    kind: "insight",
    updatedAt: "2d ago",
    linkedProjectId: "p2",
    source: "user",
  },
];

export const seededDocs: Doc[] = [
  {
    id: "d1",
    title: "Personal operating system spec",
    category: "Product",
    summary: "Core objects, information hierarchy, and desired operator workflows across the product.",
    updatedAt: "Today",
    linkedProjectId: "p1",
  },
  {
    id: "d2",
    title: "Calendar import strategy",
    category: "Integration",
    summary: "Import .ics and exported calendars first, then add live sync only after the local model stabilizes.",
    updatedAt: "Today",
    linkedProjectId: "p1",
  },
  {
    id: "d3",
    title: "Daily operator loop",
    category: "Playbook",
    summary: "Morning brief, focused execution blocks, and nightly memory capture keep the system coherent.",
    updatedAt: "Yesterday",
    linkedProjectId: "p1",
  },
  {
    id: "d4",
    title: "AI infrastructure map",
    category: "Research",
    summary: "Living notes on chips, model infra, platforms, and the themes worth tracking weekly.",
    updatedAt: "2d ago",
    linkedProjectId: "p2",
  },
];

export const seededBriefs: BriefEntry[] = [
  {
    id: "b1",
    title: "Morning brief: Friday operator plan",
    type: "Morning Brief",
    createdAt: "2026-03-13 06:30",
    summary: "Mission Controller is the primary build today. Keep the workspace cohesive and remove dead controls.",
    bullets: [
      "Ship working month, week, and day calendar modes.",
      "Make local-first task creation visible and fast.",
      "Surface nightly-built project updates on the homepage and projects route.",
    ],
    linkedProjectIds: ["p1"],
  },
  {
    id: "b2",
    title: "Nightly update: Thursday closeout",
    type: "Nightly Update",
    createdAt: "2026-03-12 22:45",
    summary: "The product direction is clearer: projects should be the inspection surface, memory should preserve decisions, and briefs should anchor the day.",
    bullets: [
      "Expanded the domain model to support deliverables and history.",
      "Identified task automation as a first-class future insertion path.",
      "Kept storage local-first to avoid premature backend complexity.",
    ],
    linkedProjectIds: ["p1", "p2"],
  },
];

export const roadmapItems = [
  "Replace the local workspace store with IndexedDB or SQLite behind the same actions.",
  "Add real command palette and keyboard shortcuts for quick capture and navigation.",
  "Support calendar import adapters for .ics files and Google exports.",
  "Introduce assistant automation that inserts tasks, briefs, and linked project updates programmatically.",
];

export const seededApprovals: ApprovalItem[] = [
  {
    id: "a1",
    title: "Calendar shell v4",
    detail: "Final pass on black shell and calendar density.",
    owner: "Gabriel",
    due: "Today",
    status: "Waiting",
  },
  {
    id: "a2",
    title: "Import adapter scope",
    detail: "Approve local-only `.ics` parsing scope before sync work.",
    owner: "Product",
    due: "Mar 14",
    status: "Ready",
  },
  {
    id: "a3",
    title: "Agent offer framing",
    detail: "Positioning still needs clearer proof and market wedge.",
    owner: "Strategy",
    due: "Mar 16",
    status: "Blocked",
  },
];

export const seededPeople: Person[] = [
  {
    id: "person-1",
    name: "Gabriel",
    role: "Operator",
    focus: "Mission Controller",
    initials: "GA",
    status: "Focus",
  },
  {
    id: "person-2",
    name: "Maya Chen",
    role: "Design Review",
    focus: "Calendar shell",
    initials: "MC",
    status: "Available",
  },
  {
    id: "person-3",
    name: "Noah Price",
    role: "Research",
    focus: "AI infra map",
    initials: "NP",
    status: "Away",
  },
];

export const initialWorkspaceState: WorkspaceState = {
  tasks: seededTasks,
  memories: seededMemories,
  calendarView: "Week",
  selectedProjectId: "p1",
};

export function getProjectById(projectId: string) {
  return seededProjects.find((project) => project.id === projectId);
}

export function getTasksForProject(projectId: string, tasks: Task[] = seededTasks) {
  return tasks.filter((task) => task.projectId === projectId);
}

export function getEventsForProject(projectId: string) {
  return seededEvents.filter((event) => event.linkedProjectId === projectId);
}

export function getDocsForProject(projectId: string) {
  return seededDocs.filter((doc) => doc.linkedProjectId === projectId);
}

export function getMemoryForProject(projectId: string, memories: MemoryItem[] = seededMemories) {
  return memories.filter((memory) => memory.linkedProjectId === projectId);
}

export function getBriefsForProject(projectId: string) {
  return seededBriefs.filter((brief) => brief.linkedProjectIds.includes(projectId));
}

export function buildWorkspaceMetrics(
  tasks: Task[] = seededTasks,
  memories: MemoryItem[] = seededMemories,
): WorkspaceMetric[] {
  const openTasks = tasks.filter((task) => task.status !== "Done");
  const todayEvents = seededEvents.filter((event) => event.date === "2026-03-13");
  const linkedItems = memories.filter((memory) => memory.linkedProjectId).length + seededDocs.length;

  return [
    {
      id: "wm1",
      label: "Open",
      value: String(openTasks.length + todayEvents.length),
      detail: "Tasks and events",
    },
    {
      id: "wm2",
      label: "Deep work",
      value: `${tasks.filter((task) => task.energy === "Deep" && task.status !== "Done").length}`,
      detail: "Deep tasks",
    },
    {
      id: "wm3",
      label: "Context",
      value: String(linkedItems),
      detail: "Docs and memory",
    },
  ];
}

export function formatDisplayDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

export function formatDueLabel(date: string) {
  const target = new Date(`${date}T12:00:00`);
  const today = new Date("2026-03-13T12:00:00");
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);

  if (diff === 0) {
    return "Today";
  }

  if (diff === 1) {
    return "Tomorrow";
  }

  return target.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
