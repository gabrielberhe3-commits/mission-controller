"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { seededPeople } from "@/data/mission-control";

function statusClass(status: string) {
  switch (status) {
    case "Available":
      return "text-white";
    case "Focus":
      return "text-[#d8d8d8]";
    default:
      return "text-[#7a7a7a]";
  }
}

export default function PeoplePage() {
  const { showFeedback } = useWorkspace();

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="People"
        title="Contacts"
        description="Who is in the loop."
        actions={
          <Button size="sm" variant="primary" onClick={() => showFeedback("People are seeded locally in this build.")}>
            Add person
          </Button>
        }
      />

      <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
        <div className="border-b border-white/6 pb-3">
          <p className="text-sm font-medium text-white">Directory</p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {seededPeople.map((person) => (
            <div key={person.id} className="rounded-[18px] border border-white/6 bg-[#0b0b0b] p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-[#141414] text-sm font-semibold text-white">
                  {person.initials}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.16em] ${statusClass(person.status)}`}>
                  {person.status}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-white">{person.name}</p>
              <p className="mt-1 text-sm text-[#8a8a8a]">{person.role}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#666]">Current focus</p>
              <p className="mt-1 text-sm text-[#d2d2d2]">{person.focus}</p>
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
