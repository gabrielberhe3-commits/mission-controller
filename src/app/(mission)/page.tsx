"use client";

import Link from "next/link";
import {
  EventList,
  MemoryList,
  MetricGrid,
  ProjectList,
  TaskList,
} from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { buildWorkspaceMetrics } from "@/data/mission-control";

export default function HomePage() {
  const { events, memories, openDrawer, projects, selectedProjectId, tasks } = useWorkspace();
  const metrics = buildWorkspaceMetrics(tasks, memories);
  const todayEvents = events.filter((event) => event.date === "2026-03-13");
  const featuredProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Overview"
        title="Control"
        description="Calendar, queue, and project context."
        actions={
          <>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center rounded-[12px] border border-white/12 bg-[#141414] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#1a1a1a]"
            >
              Open calendar
            </Link>
            <Button size="sm" onClick={() => openDrawer("task")}>
              Add task
            </Button>
          </>
        }
      />

      <MetricGrid metrics={metrics} />

      <div className="grid gap-3 2xl:grid-cols-[minmax(0,1.5fr)_320px]">
        <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Today</p>
              <h2 className="mt-1 text-[28px] font-semibold tracking-[-0.05em] text-white">Friday, March 13</h2>
            </div>
            <Link
              href="/calendar"
              className="rounded-[12px] border border-white/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d8d8d8] hover:bg-[#111]"
            >
              Full view
            </Link>
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="rounded-[20px] border border-white/6 bg-[#090909] p-3">
              <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[18px] border border-white/6 bg-white/6">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, index) => (
                  <div
                    key={label}
                    className={`min-h-[92px] px-2.5 py-2 ${
                      index === 5 ? "bg-[#121212]" : "bg-[#090909]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{label}</p>
                    <p className="mt-2 text-lg font-medium text-white">{9 + index}</p>
                    {index === 5 ? (
                      <div className="mt-3 space-y-1">
                        {todayEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className="truncate rounded-[10px] bg-[#151515] px-2 py-1 text-[11px] text-[#d8d8d8]">
                            {event.title}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[20px] border border-white/6 bg-[#090909] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Next up</p>
                <div className="mt-3">
                  <EventList events={todayEvents.slice(0, 3)} />
                </div>
              </div>
              <div className="rounded-[20px] border border-white/6 bg-[#090909] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Project</p>
                <p className="mt-1 text-lg font-semibold text-white">{featuredProject.name}</p>
                <p className="mt-1 text-sm text-[#8a8a8a]">{featuredProject.nextMilestone}</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-3">
          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <div className="flex items-center justify-between border-b border-white/6 pb-3">
              <p className="text-sm font-medium text-white">Tasks</p>
              <Link href="/tasks" className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
                View all
              </Link>
            </div>
            <div className="mt-3">
              <TaskList tasks={tasks.slice(0, 4)} />
            </div>
          </section>

          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <div className="flex items-center justify-between border-b border-white/6 pb-3">
              <p className="text-sm font-medium text-white">Memory</p>
              <Button size="sm" variant="ghost" onClick={() => openDrawer("memory")}>
                Add
              </Button>
            </div>
            <div className="mt-3">
              <MemoryList memories={memories.slice(0, 2)} />
            </div>
          </section>
        </aside>
      </div>

      <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between border-b border-white/6 pb-3">
          <p className="text-sm font-medium text-white">Projects</p>
          <Link href="/projects" className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
            Open
          </Link>
        </div>
        <div className="mt-3">
          <ProjectList projects={projects} selectedProjectId={featuredProject.id} />
        </div>
      </section>
    </div>
  );
}
