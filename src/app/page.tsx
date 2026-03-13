type CalendarEvent = {
  id: string;
  title: string;
  time: string;
  date: string;
  kind: "meeting" | "focus" | "personal";
};

type Task = {
  id: string;
  title: string;
  due: string;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "In Progress" | "Done";
  project: string;
};

type Project = {
  id: string;
  name: string;
  progress: number;
  owner: string;
  nextMilestone: string;
};

type MemoryItem = {
  id: string;
  title: string;
  note: string;
  tag: string;
  updatedAt: string;
};

type Doc = {
  id: string;
  title: string;
  category: string;
  summary: string;
};

const calendarViews = ["Month", "Week", "Day"] as const;

const events: CalendarEvent[] = [
  { id: "e1", title: "AI agent strategy review", time: "09:00", date: "Today", kind: "meeting" },
  { id: "e2", title: "Deep work: mission controller", time: "11:00", date: "Today", kind: "focus" },
  { id: "e3", title: "Gym + reset", time: "17:30", date: "Today", kind: "personal" },
  { id: "e4", title: "Polymarket market scan", time: "08:30", date: "Tomorrow", kind: "focus" },
];

const tasks: Task[] = [
  { id: "t1", title: "Import Google Calendar events", due: "Today", priority: "High", status: "In Progress", project: "Mission Controller" },
  { id: "t2", title: "Review NVDA + semis watchlist", due: "Today", priority: "Medium", status: "Backlog", project: "Investing OS" },
  { id: "t3", title: "Define memory model for notes/docs", due: "Tomorrow", priority: "High", status: "Backlog", project: "Mission Controller" },
  { id: "t4", title: "Ship dashboard shell", due: "Done", priority: "Low", status: "Done", project: "Mission Controller" },
];

const projects: Project[] = [
  { id: "p1", name: "Mission Controller", progress: 68, owner: "Gabriel", nextMilestone: "Calendar sync + command palette" },
  { id: "p2", name: "Investing OS", progress: 34, owner: "Gabriel", nextMilestone: "Watchlists + thesis pages" },
  { id: "p3", name: "Agent Business", progress: 41, owner: "Gabriel", nextMilestone: "Offer design + outbound system" },
];

const memories: MemoryItem[] = [
  { id: "m1", title: "What matters right now", note: "Build a real operating system around calendar, tasks, projects and memory — not just another notes app.", tag: "focus", updatedAt: "2h ago" },
  { id: "m2", title: "Working style", note: "Prefer nightly, PR-ready improvements over live changes during the day.", tag: "preference", updatedAt: "Yesterday" },
  { id: "m3", title: "Market lens", note: "High interest in AI infra, prediction markets, crypto and systems that create actual leverage.", tag: "investing", updatedAt: "2d ago" },
];

const docs: Doc[] = [
  { id: "d1", title: "Personal Operating System spec", category: "Product", summary: "Define the core objects: events, tasks, projects, memories, docs, relationships and views." },
  { id: "d2", title: "Calendar import strategy", category: "Integration", summary: "Google export first, direct sync later. Keep the product usable without vendor lock-in." },
  { id: "d3", title: "Agent workflows", category: "Playbook", summary: "How the assistant should turn notes, tasks and projects into daily execution loops." },
];

const nav = [
  "Mission Control",
  "Calendar",
  "Tasks",
  "Projects",
  "Memory",
  "Docs",
];

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "green" | "blue" | "amber" | "purple" }) {
  const styles = {
    default: "bg-white/10 text-zinc-300",
    green: "bg-emerald-500/15 text-emerald-300",
    blue: "bg-sky-500/15 text-sky-300",
    amber: "bg-amber-500/15 text-amber-300",
    purple: "bg-purple-500/15 text-purple-300",
  } as const;

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone]}`}>{children}</span>;
}

function SectionCard({ title, subtitle, action, children }: { title: string; subtitle: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
        {action ? <button className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const openTasks = tasks.filter((task) => task.status !== "Done");
  const highPriorityTasks = openTasks.filter((task) => task.priority === "High");

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-zinc-950/90 p-6 xl:border-r xl:border-b-0">
          <div className="flex items-center justify-between xl:block">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">Gabriel OS</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Mission Controller</h1>
              <p className="mt-2 max-w-xs text-sm text-zinc-400">A personal operating system for calendar, execution, context and memory.</p>
            </div>
            <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 xl:block">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Status</p>
              <p className="mt-1 text-sm font-medium text-white">Focused mode</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-2">
            {nav.map((item, index) => (
              <button
                key={item}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-white text-zinc-950 shadow-lg shadow-white/10"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item}</span>
                <span className={`text-xs ${index === 0 ? "text-zinc-600" : "text-zinc-500"}`}>{index === 0 ? "Live" : "↗"}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Today</p>
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-sm text-zinc-400">Calendar events</p>
                <p className="text-2xl font-semibold text-white">{events.length}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Open tasks</p>
                <p className="text-2xl font-semibold text-white">{openTasks.length}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">High priority</p>
                <p className="text-2xl font-semibold text-white">{highPriorityTasks.length}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Friday overview</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Your day, projects and context — in one place.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                This MVP is designed to replace scattered tools with a single control surface: planning, execution, memory and documentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">Quick add</button>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/5">Import calendar</button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <SectionCard title="Mission Control" subtitle="A single screen view across planning, action and memory." action="Customize widgets">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-zinc-400">Next event</p>
                    <p className="mt-3 text-lg font-semibold text-white">{events[0]?.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{events[0]?.time} · {events[0]?.date}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-zinc-400">Project in focus</p>
                    <p className="mt-3 text-lg font-semibold text-white">{projects[0]?.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{projects[0]?.nextMilestone}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-zinc-400">Memory anchor</p>
                    <p className="mt-3 text-lg font-semibold text-white">Ship clarity, not clutter</p>
                    <p className="mt-1 text-sm text-zinc-500">Link decisions to projects and docs.</p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Calendar" subtitle="Month/week/day views with room for real sync later." action="Open full calendar">
                <div className="mb-4 flex gap-2">
                  {calendarViews.map((view, index) => (
                    <button
                      key={view}
                      className={`rounded-full px-3 py-1.5 text-sm ${index === 1 ? "bg-white text-zinc-950" : "border border-white/10 text-zinc-300 hover:bg-white/5"}`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-white">{event.title}</p>
                          <Badge tone={event.kind === "meeting" ? "blue" : event.kind === "focus" ? "purple" : "green"}>{event.kind}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">{event.date} · {event.time}</p>
                      </div>
                      <button className="text-sm text-zinc-400 hover:text-white">View</button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard title="Tasks" subtitle="Priority, due dates and project context." action="New task">
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{task.title}</p>
                            <p className="mt-1 text-sm text-zinc-500">{task.project} · Due {task.due}</p>
                          </div>
                          <Badge tone={task.priority === "High" ? "amber" : task.priority === "Medium" ? "blue" : "default"}>{task.priority}</Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">{task.status}</span>
                          <button className="text-zinc-500 hover:text-white">Open</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Projects" subtitle="Progress, milestones and execution at a glance." action="New project">
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div key={project.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{project.name}</p>
                            <p className="mt-1 text-sm text-zinc-500">Owner: {project.owner}</p>
                          </div>
                          <span className="text-sm font-medium text-zinc-300">{project.progress}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-white" style={{ width: `${project.progress}%` }} />
                        </div>
                        <p className="mt-3 text-sm text-zinc-400">Next: {project.nextMilestone}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>

            <div className="space-y-6">
              <SectionCard title="Memory" subtitle="Notes and durable context connected to execution." action="Capture memory">
                <div className="space-y-3">
                  {memories.map((memory) => (
                    <div key={memory.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{memory.title}</p>
                        <Badge>{memory.tag}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{memory.note}</p>
                      <p className="mt-3 text-xs text-zinc-500">Updated {memory.updatedAt}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Docs" subtitle="Reference pages and systems thinking in one place." action="New doc">
                <div className="space-y-3">
                  {docs.map((doc) => (
                    <div key={doc.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{doc.title}</p>
                        <Badge tone="blue">{doc.category}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{doc.summary}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="What to build next" subtitle="Suggested roadmap to replace Google Calendar for real.">
                <ol className="space-y-3 text-sm text-zinc-300">
                  <li className="rounded-2xl border border-white/10 bg-black/20 p-4">1. Add real persistence (SQLite + Prisma or Postgres + Drizzle).</li>
                  <li className="rounded-2xl border border-white/10 bg-black/20 p-4">2. Import `.ics` and Google Calendar exports before building live sync.</li>
                  <li className="rounded-2xl border border-white/10 bg-black/20 p-4">3. Add command palette, keyboard shortcuts and daily planning workflow.</li>
                  <li className="rounded-2xl border border-white/10 bg-black/20 p-4">4. Link tasks, memories and docs directly to projects and events.</li>
                </ol>
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
