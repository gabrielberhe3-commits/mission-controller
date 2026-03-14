"use client";

import { useState } from "react";
import { TaskList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { TaskStatus } from "@/types/mission";

const taskColumns: TaskStatus[] = ["Backlog", "In Progress", "Blocked", "Done"];

export default function TasksPage() {
  const [projectFilter, setProjectFilter] = useState("all");
  const { openDrawer, projects, tasks } = useWorkspace();
  const filteredTasks =
    projectFilter === "all" ? tasks : tasks.filter((task) => task.projectId === projectFilter);

  return (
    <div className="space-y-3">
      <PageHeader
        title="Queue"
        actions={
          <Button size="sm" variant="primary" onClick={() => openDrawer("task")}>
            New
          </Button>
        }
      />

      <section className="shell-panel rounded-[20px] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SegmentedControl
            items={[
              { label: "All", value: "all" },
              ...projects.map((project) => ({ label: project.name, value: project.id })),
            ]}
            value={projectFilter}
            onChange={setProjectFilter}
          />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {taskColumns.map((column) => (
              <div key={column} className="rounded-[12px] border border-black/8 bg-[#f7f5f1] px-3 py-3">
                <p className="eyebrow">{column}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[#18191b]">
                  {filteredTasks.filter((task) => task.status === column).length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell-panel rounded-[20px] p-4">
        <p className="eyebrow">All tasks</p>
        <div className="mt-4">
          <TaskList tasks={filteredTasks} />
        </div>
      </section>
    </div>
  );
}
