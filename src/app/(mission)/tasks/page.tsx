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
    <div className="space-y-5">
      <PageHeader
        eyebrow="Tasks"
        title="Execution queue for operator-managed and automation-ready work."
        description="Add tasks locally, inspect them by project, and move them through the queue without changing the local-first interaction model."
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
        description="Focus the queue by project while keeping a single local-first source of truth."
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
        <div className="grid gap-3 md:grid-cols-4">
          {taskColumns.map((column) => {
            const count = filteredTasks.filter((task) => task.status === column).length;

            return (
              <div key={column} className="surface-subtle rounded-xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">{column}</p>
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
