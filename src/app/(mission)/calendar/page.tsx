"use client";

import { useState } from "react";
import { EventList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { calendarViews, formatDisplayDate } from "@/data/mission-control";

function shiftDate(date: string, amount: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + amount);
  return next.toISOString().slice(0, 10);
}

function WeekStrip({
  focusDate,
  eventsByDate,
  onSelect,
}: {
  focusDate: string;
  eventsByDate: Map<string, number>;
  onSelect: (date: string) => void;
}) {
  const base = new Date(`${focusDate}T12:00:00`);
  const dayIndex = base.getDay();
  const start = new Date(base);
  start.setDate(base.getDate() - dayIndex);
  const days = Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current.toISOString().slice(0, 10);
  });

  return (
    <div className="grid gap-3 md:grid-cols-7">
      {days.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={`rounded-[20px] border p-4 text-left ${
            date === focusDate
              ? "border-[rgba(213,159,97,0.38)] bg-[rgba(213,159,97,0.08)]"
              : "border-white/10 bg-black/20 hover:bg-white/[0.04]"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[#708196]">{formatDisplayDate(date)}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{eventsByDate.get(date) ?? 0}</p>
          <p className="mt-1 text-sm text-[#96a8bc]">events</p>
        </button>
      ))}
    </div>
  );
}

function MonthGrid({
  focusDate,
  eventsByDate,
  onSelect,
}: {
  focusDate: string;
  eventsByDate: Map<string, number>;
  onSelect: (date: string) => void;
}) {
  const focus = new Date(`${focusDate}T12:00:00`);
  const monthStart = new Date(focus.getFullYear(), focus.getMonth(), 1, 12);
  const startDay = monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startDay);

  const cells = Array.from({ length: 35 }, (_, index) => {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);
    return current.toISOString().slice(0, 10);
  });

  return (
    <div className="grid gap-3 md:grid-cols-7">
      {cells.map((date) => {
        const inMonth = date.slice(5, 7) === focusDate.slice(5, 7);
        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`min-h-28 rounded-[20px] border p-4 text-left ${
              date === focusDate
                ? "border-[rgba(213,159,97,0.38)] bg-[rgba(213,159,97,0.08)]"
                : "border-white/10 bg-black/20 hover:bg-white/[0.04]"
            }`}
          >
            <p className={`text-sm font-semibold ${inMonth ? "text-white" : "text-[#5f7082]"}`}>
              {Number(date.slice(-2))}
            </p>
            <p className="mt-3 text-xs text-[#8ea0b5]">{eventsByDate.get(date) ?? 0} items</p>
          </button>
        );
      })}
    </div>
  );
}

export default function CalendarPage() {
  const { calendarView, events, setCalendarView, showFeedback } = useWorkspace();
  const [focusDate, setFocusDate] = useState("2026-03-13");
  const visibleEvents = events.filter((event) => event.date === focusDate);
  const eventsByDate = new Map<string, number>();

  events.forEach((event) => {
    eventsByDate.set(event.date, (eventsByDate.get(event.date) ?? 0) + 1);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calendar"
        title="Month, week, day, and agenda views now switch in-place."
        description="The calendar is still local-first, but the view state is real and the route is now useful for planning rather than acting like a static mock."
        actions={
          <>
            <Button
              variant="primary"
              onClick={() => showFeedback("Calendar import will plug into this route once the adapter is added.")}
            >
              Import .ics
            </Button>
            <Button onClick={() => setFocusDate("2026-03-13")}>Jump to today</Button>
          </>
        }
      />

      <Panel
        title="Views"
        description="Switch the route between different planning surfaces without leaving the page."
        action={
          <SegmentedControl
            items={calendarViews.map((view) => ({ label: view, value: view }))}
            value={calendarView}
            onChange={setCalendarView}
          />
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? -28 : -1))}>
            Previous
          </Button>
          <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? 28 : 1))}>
            Next
          </Button>
          <p className="text-sm text-[#a8b7c7]">Focused date: {formatDisplayDate(focusDate)}</p>
        </div>
      </Panel>

      <Panel
        title={`${calendarView} plan`}
        description="The calendar surface changes based on the selected view and keeps the same linked event objects."
      >
        {calendarView === "Month" ? (
          <MonthGrid focusDate={focusDate} eventsByDate={eventsByDate} onSelect={setFocusDate} />
        ) : null}
        {calendarView === "Week" ? (
          <WeekStrip focusDate={focusDate} eventsByDate={eventsByDate} onSelect={setFocusDate} />
        ) : null}
        {calendarView === "Day" ? (
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-[#90a2b5]">
              {formatDisplayDate(focusDate)} · {visibleEvents.length} scheduled item(s)
            </p>
            <div className="mt-4">
              <EventList events={visibleEvents.length ? visibleEvents : events.filter((event) => event.date === "2026-03-13")} />
            </div>
          </div>
        ) : null}
        {calendarView === "Agenda" ? <EventList events={events} /> : null}
      </Panel>
    </div>
  );
}
