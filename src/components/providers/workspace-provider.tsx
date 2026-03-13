"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialWorkspaceState,
  seededBriefs,
  seededDocs,
  seededEvents,
  seededProjects,
} from "@/data/mission-control";
import type {
  CalendarView,
  MemoryDraft,
  Project,
  TaskDraft,
  TaskStatus,
  WorkspaceState,
} from "@/types/mission";

type DrawerKind = "task" | "memory" | null;

type ActionFeedback = {
  id: number;
  message: string;
};

type WorkspaceContextValue = WorkspaceState & {
  briefs: typeof seededBriefs;
  docs: typeof seededDocs;
  events: typeof seededEvents;
  projects: Project[];
  drawerKind: DrawerKind;
  feedback: ActionFeedback | null;
  createTask: (draft: TaskDraft) => void;
  createMemory: (draft: MemoryDraft) => void;
  cycleTaskStatus: (taskId: string) => void;
  setCalendarView: (view: CalendarView) => void;
  setSelectedProjectId: (projectId: string) => void;
  openDrawer: (kind: DrawerKind) => void;
  closeDrawer: () => void;
  showFeedback: (message: string) => void;
  getProject: (projectId: string) => Project | undefined;
};

const STORAGE_KEY = "mission-controller-v3-workspace";

const statusOrder: TaskStatus[] = ["Backlog", "In Progress", "Blocked", "Done"];

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function loadInitialWorkspaceState() {
  if (typeof window === "undefined") {
    return initialWorkspaceState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return initialWorkspaceState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<WorkspaceState>;
    return {
      tasks: parsed.tasks ?? initialWorkspaceState.tasks,
      memories: parsed.memories ?? initialWorkspaceState.memories,
      calendarView: parsed.calendarView ?? initialWorkspaceState.calendarView,
      selectedProjectId:
        parsed.selectedProjectId ?? initialWorkspaceState.selectedProjectId,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialWorkspaceState;
  }
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(loadInitialWorkspaceState);
  const [drawerKind, setDrawerKind] = useState<DrawerKind>(null);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, 2800);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      ...state,
      briefs: seededBriefs,
      docs: seededDocs,
      events: seededEvents,
      projects: seededProjects,
      drawerKind,
      feedback,
      createTask: (draft) => {
        const task = {
          id: createId("task"),
          title: draft.title,
          dueDate: draft.dueDate,
          priority: draft.priority,
          status: draft.status ?? "Backlog",
          projectId: draft.projectId,
          energy: draft.energy,
          notes: draft.notes,
          source: draft.source ?? "user",
          createdAt: new Date().toISOString(),
        };

        setState((current) => ({
          ...current,
          tasks: [task, ...current.tasks],
          selectedProjectId: draft.projectId,
        }));
        setDrawerKind(null);
        setFeedback({
          id: Date.now(),
          message:
            task.source === "system"
              ? "System task added to the queue."
              : "Task added to your queue.",
        });
      },
      createMemory: (draft) => {
        const memory = {
          id: createId("memory"),
          title: draft.title,
          note: draft.note,
          kind: draft.kind,
          linkedProjectId: draft.linkedProjectId,
          updatedAt: "Just now",
          source: draft.source ?? "user",
        };

        setState((current) => ({
          ...current,
          memories: [memory, ...current.memories],
          selectedProjectId: draft.linkedProjectId ?? current.selectedProjectId,
        }));
        setDrawerKind(null);
        setFeedback({
          id: Date.now(),
          message: "Memory captured and linked.",
        });
      },
      cycleTaskStatus: (taskId) => {
        setState((current) => ({
          ...current,
          tasks: current.tasks.map((task) => {
            if (task.id !== taskId) {
              return task;
            }

            const index = statusOrder.indexOf(task.status);
            return {
              ...task,
              status: statusOrder[(index + 1) % statusOrder.length],
            };
          }),
        }));
        setFeedback({
          id: Date.now(),
          message: "Task status updated.",
        });
      },
      setCalendarView: (view) => {
        setState((current) => ({
          ...current,
          calendarView: view,
        }));
      },
      setSelectedProjectId: (projectId) => {
        setState((current) => ({
          ...current,
          selectedProjectId: projectId,
        }));
      },
      openDrawer: (kind) => {
        setDrawerKind(kind);
      },
      closeDrawer: () => {
        setDrawerKind(null);
      },
      showFeedback: (message) => {
        setFeedback({
          id: Date.now(),
          message,
        });
      },
      getProject: (projectId) => seededProjects.find((project) => project.id === projectId),
    }),
    [drawerKind, feedback, state],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}
