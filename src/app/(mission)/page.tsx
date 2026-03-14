"use client";

import Link from "next/link";
import { MetricGrid, ProjectList, TaskList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { buildWorkspaceMetrics } from "@/data/mission-control";

export default function HomePage() {
  const { events, memories, openDrawer, projects, selectedProjectId, tasks } = useWorkspace();
  const metrics = buildWorkspaceMetrics(tasks, memories);
  const focusProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const todayEvents = events.filter((event) => event.date === "2026-03-13");
  const openTasks = tasks.filter((task) => task.status !== "Done");

  return (
    <div className="space-y-3">
      <section className="shell-panel rounded-[20px] p-4 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-[34px] font-semibold tracking-[-0.08em] text-white sm:text-[40px]">
                  Home
                </h1>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/calendar"
                  className="inline-flex h-8 items-center justify-center rounded-[10px] border border-white/14 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black hover:bg-[#d9d9d9]"
                >
                  Calendar
                </Link>
                <Button size="sm" onClick={() => openDrawer("task")}>
                  Task
                </Button>
              </div>
            </div>

            <MetricGrid metrics={metrics} />

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="shell-card rounded-[18px] p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-[-0.05em] text-white">{focusProject.name}</h2>
                  <span className="text-[28px] font-semibold tracking-[-0.06em] text-white">
                    {focusProject.progress}%
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#898989]">{focusProject.nextMilestone}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <MiniStat label="Tasks" value={String(openTasks.filter((task) => task.projectId === focusProject.id).length)} />
                  <MiniStat label="Events" value={String(events.filter((event) => event.linkedProjectId === focusProject.id).length)} />
                  <MiniStat label="Memory" value={String(memories.filter((memory) => memory.linkedProjectId === focusProject.id).length)} />
                </div>
              </div>

              <div className="shell-card rounded-[18px] p-4">
                <p className="eyebrow">Today</p>
                <div className="mt-3 space-y-2">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="rounded-[12px] border border-white/6 bg-[#080808] px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-white">{event.title}</p>
                        <p className="text-[11px] font-medium text-[#a8a8a8]">{event.timeRange.split(" - ")[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside>
            <section className="shell-card rounded-[18px] p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Queue</p>
                <Link href="/tasks" className="text-[10px] uppercase tracking-[0.16em] text-[#727272]">
                  Open
                </Link>
              </div>
              <div className="mt-3 space-y-2">
                <TaskList tasks={openTasks.slice(0, 3)} />
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="shell-panel rounded-[20px] p-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Projects</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => openDrawer("memory")}>
              Note
            </Button>
            <Link href="/projects" className="text-[10px] uppercase tracking-[0.16em] text-[#727272]">
              Open
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <ProjectList projects={projects} selectedProjectId={focusProject.id} />
        </div>
      </section>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-white/6 bg-[#080808] px-3 py-3">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">{value}</p>
    </div>
  );
}
