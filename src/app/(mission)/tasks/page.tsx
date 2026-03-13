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
        eyebrow="Tasks"
        title="Queue"
        description="Active work only."
        actions={
          <Button size="sm" variant="primary" onClick={() => openDrawer("task")}>
            New task
          </Button>
        }
      />

      <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
        <div className="flex flex-col gap-3 border-b border-white/6 pb-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-medium text-white">Filters</p>
          <SegmentedControl
            items={[
              { label: "All", value: "all" },
              ...projects.map((project) => ({ label: project.name, value: project.id })),
            ]}
            value={projectFilter}
            onChange={setProjectFilter}
          />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {taskColumns.map((column) => (
            <div key={column} className="rounded-[16px] border border-white/6 bg-[#090909] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{column}</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {filteredTasks.filter((task) => task.status === column).length}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
        <div className="border-b border-white/6 pb-3">
          <p className="text-sm font-medium text-white">All tasks</p>
        </div>
        <div className="mt-4">
          <TaskList tasks={filteredTasks} />
        </div>
      </section>
    </div>
  );
}
