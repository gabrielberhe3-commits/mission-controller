"use client";

import { useState } from "react";
import { TaskList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { TaskStatus } from "@/types/mission";

const taskColumns: TaskStatus[] = ["Backlog", "In Progress", "Blocked", "Done"];

export default function TasksPage() {
  const [projectFilter, setProjectFilter] = useState("all");
  const { openDrawer, projects, showFeedback, tasks } =
    useWorkspace();
  const filteredTasks =
    projectFilter === "all"
      ? tasks
      : tasks.filter((task) => task.projectId === projectFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tasks"
        title="Execution queue with user-created and system-ready insertion paths."
        description="This route is now the functional task workspace. Add tasks locally, inspect them by project, and move them through the queue without waiting for backend automation."
        actions={
          <>
            <Button variant="primary" onClick={() => openDrawer("task")}>
              New task
            </Button>
            <Button
              onClick={() =>
                showFeedback("Assistant automation will later call the same createTask action used by this UI.")
              }
            >
              Automation path
            </Button>
          </>
        }
      />

      <Panel
        title="Filters"
        description="Focus the task queue by project while keeping a single local-first source of truth."
        action={
          <SegmentedControl
            items={[
              { label: "All projects", value: "all" },
              ...projects.map((project) => ({ label: project.name, value: project.id })),
            ]}
            value={projectFilter}
            onChange={setProjectFilter}
          />
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          {taskColumns.map((column) => {
            const count = filteredTasks.filter((task) => task.status === column).length;

            return (
              <div key={column} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-[#8ea0b5]">{column}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{count}</p>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel
        title="Execution queue"
        description="Each task can be advanced, inspected, and opened against its linked project."
        action={<Button size="sm" onClick={() => openDrawer("task")}>Quick add</Button>}
      >
        <TaskList tasks={filteredTasks} />
      </Panel>
    </div>
  );
}
