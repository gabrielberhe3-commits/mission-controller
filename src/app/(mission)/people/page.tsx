"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { seededPeople } from "@/data/mission-control";

function statusClass(status: string) {
  switch (status) {
    case "Available":
      return "text-main";
    case "Focus":
      return "text-soft";
    default:
      return "text-faint";
  }
}

export default function PeoplePage() {
  const { showFeedback } = useWorkspace();

  return (
    <div className="space-y-3">
      <PageHeader
        title="People"
        actions={
          <Button size="sm" variant="primary" onClick={() => showFeedback("People are seeded locally in this build.")}>
            Add
          </Button>
        }
      />

      <section className="shell-panel rounded-[20px] p-4">
        <p className="eyebrow">Directory</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {seededPeople.map((person) => (
            <div key={person.id} className="shell-card rounded-[16px] p-4">
              <div className="flex items-center justify-between">
                <div className="surface-soft text-main flex h-12 w-12 items-center justify-center rounded-[12px] text-sm font-semibold">
                  {person.initials}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.16em] ${statusClass(person.status)}`}>
                  {person.status}
                </span>
              </div>
              <p className="text-main mt-4 text-sm font-medium">{person.name}</p>
              <p className="text-muted mt-1 text-sm">{person.role}</p>
              <p className="text-faint mt-3 text-[10px] uppercase tracking-[0.16em]">Focus</p>
              <p className="text-soft mt-1 text-sm">{person.focus}</p>
              <div className="mt-4">
                <Button size="sm" onClick={() => showFeedback(`${person.name} is represented as local seed data only.`)}>
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
