import { EventList } from "@/components/mission/mission-cards";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { calendarViews, seededEvents } from "@/data/mission-control";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calendar"
        title="A calendar surface built for import first, sync later."
        description="Events remain seeded for now, but the structure is ready for repository-backed storage and external calendar ingestion without changing the presentation layer."
      />

      <Panel
        title="Views"
        description="Month, week, day, and agenda modes can later become real view-state without changing the route model."
      >
        <div className="flex flex-wrap gap-2">
          {calendarViews.map((view, index) => (
            <button
              key={view}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                index === 1
                  ? "bg-[linear-gradient(135deg,#f1dfbf,#d1a56a)] text-[#11151a]"
                  : "border border-white/12 text-[#dbe5ee] hover:bg-white/[0.05]"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </Panel>

      <Panel
        title="Upcoming schedule"
        description="Each event can later link out to projects, tasks, and notes as the data layer matures."
        action={<button className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#dbe5ee]">Import .ics</button>}
      >
        <EventList events={seededEvents} />
      </Panel>
    </div>
  );
}
