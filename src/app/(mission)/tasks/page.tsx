import { TaskList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { seededTasks } from "@/data/mission-control";

const taskColumns = ["Backlog", "In Progress", "Blocked", "Done"] as const;

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tasks"
        title="Execution belongs next to time and context."
        description="Tasks are already modeled with project links, statuses, and effort bands so persistence can land later without redesigning the UI contract."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {taskColumns.map((column) => {
          const count = seededTasks.filter((task) => task.status === column).length;

          return (
            <div key={column} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-[#8ea0b5]">{column}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      <Panel
        title="Execution queue"
        description="A project-aware task list now, with a clear path to filters, drag states, and persistence."
        action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">New task</button>}
      >
        <TaskList tasks={seededTasks} />
      </Panel>
    </div>
  );
}
