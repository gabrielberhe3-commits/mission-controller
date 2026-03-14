"use client";

import { useEffect, useState } from "react";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";

function inputClassName() {
  return "control-input mt-2";
}

export function WorkspaceOverlays() {
  const {
    closeDrawer,
    createMemory,
    createTask,
    drawerKind,
    feedback,
    projects,
    selectedProjectId,
  } = useWorkspace();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("2026-03-13");
  const [taskPriority, setTaskPriority] = useState<"Low" | "Medium" | "High">("High");
  const [taskProjectId, setTaskProjectId] = useState(selectedProjectId);
  const [taskEnergy, setTaskEnergy] = useState<"Light" | "Deep">("Deep");

  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryNote, setMemoryNote] = useState("");
  const [memoryKind, setMemoryKind] = useState<
    "focus" | "preference" | "decision" | "insight" | "note"
  >("note");
  const [memoryProjectId, setMemoryProjectId] = useState(selectedProjectId);

  useEffect(() => {
    setTaskProjectId(selectedProjectId);
    setMemoryProjectId(selectedProjectId);
  }, [selectedProjectId]);

  const resetTask = () => {
    setTaskTitle("");
    setTaskNotes("");
    setTaskDueDate("2026-03-13");
    setTaskPriority("High");
    setTaskProjectId(selectedProjectId);
    setTaskEnergy("Deep");
  };

  const resetMemory = () => {
    setMemoryTitle("");
    setMemoryNote("");
    setMemoryKind("note");
    setMemoryProjectId(selectedProjectId);
  };

  return (
    <>
      <Drawer
        open={drawerKind === "task"}
        onClose={() => {
          closeDrawer();
          resetTask();
        }}
        title="Task"
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();

            if (!taskTitle.trim()) {
              return;
            }

            createTask({
              title: taskTitle.trim(),
              dueDate: taskDueDate,
              priority: taskPriority,
              projectId: taskProjectId,
              energy: taskEnergy,
              notes: taskNotes.trim() || undefined,
            });
            resetTask();
          }}
        >
          <label className="text-muted block text-sm">
            Title
            <input
              className={inputClassName()}
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Next action"
            />
          </label>
          <label className="text-muted block text-sm">
            Notes
            <textarea
              className={`${inputClassName()} min-h-28 resize-none`}
              value={taskNotes}
              onChange={(event) => setTaskNotes(event.target.value)}
              placeholder="Optional"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-muted block text-sm">
              Due date
              <input
                type="date"
                className={inputClassName()}
                value={taskDueDate}
                onChange={(event) => setTaskDueDate(event.target.value)}
              />
            </label>
            <label className="text-muted block text-sm">
              Project
              <select
                className={inputClassName()}
                value={taskProjectId}
                onChange={(event) => setTaskProjectId(event.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-muted block text-sm">
              Priority
              <select
                className={inputClassName()}
                value={taskPriority}
                onChange={(event) =>
                  setTaskPriority(event.target.value as "Low" | "Medium" | "High")
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <label className="text-muted block text-sm">
              Energy
              <select
                className={inputClassName()}
                value={taskEnergy}
                onChange={(event) =>
                  setTaskEnergy(event.target.value as "Light" | "Deep")
                }
              >
                <option value="Deep">Deep</option>
                <option value="Light">Light</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary">
              Save task
            </Button>
            <Button
              type="button"
              onClick={() => {
                closeDrawer();
                resetTask();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      <Drawer
        open={drawerKind === "memory"}
        onClose={() => {
          closeDrawer();
          resetMemory();
        }}
        title="Note"
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();

            if (!memoryTitle.trim() || !memoryNote.trim()) {
              return;
            }

            createMemory({
              title: memoryTitle.trim(),
              note: memoryNote.trim(),
              kind: memoryKind,
              linkedProjectId: memoryProjectId,
            });
            resetMemory();
          }}
        >
          <label className="text-muted block text-sm">
            Title
            <input
              className={inputClassName()}
              value={memoryTitle}
              onChange={(event) => setMemoryTitle(event.target.value)}
              placeholder="Title"
            />
          </label>
          <label className="text-muted block text-sm">
            Memory
            <textarea
              className={`${inputClassName()} min-h-32 resize-none`}
              value={memoryNote}
              onChange={(event) => setMemoryNote(event.target.value)}
              placeholder="Write note"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-muted block text-sm">
              Kind
              <select
                className={inputClassName()}
                value={memoryKind}
                onChange={(event) =>
                  setMemoryKind(
                    event.target.value as
                      | "focus"
                      | "preference"
                      | "decision"
                      | "insight"
                      | "note",
                  )
                }
              >
                <option value="note">Note</option>
                <option value="decision">Decision</option>
                <option value="focus">Focus</option>
                <option value="insight">Insight</option>
                <option value="preference">Preference</option>
              </select>
            </label>
            <label className="text-muted block text-sm">
              Linked project
              <select
                className={inputClassName()}
                value={memoryProjectId}
                onChange={(event) => setMemoryProjectId(event.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary">
              Save memory
            </Button>
            <Button
              type="button"
              onClick={() => {
                closeDrawer();
                resetMemory();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      <div className="pointer-events-none fixed bottom-6 right-6 z-50">
        <div
          className={`shell-toast rounded-xl px-4 py-3 text-sm transition ${
            feedback ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {feedback?.message}
        </div>
      </div>
    </>
  );
}
