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
    <div className="grid gap-2 md:grid-cols-7">
      {days.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={`rounded-xl border p-3 text-left ${
            date === focusDate
              ? "border-[rgba(200,163,106,0.3)] bg-[rgba(200,163,106,0.12)]"
              : "border-white/10 bg-black/20 hover:bg-white/[0.04]"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[#708196]">{formatDisplayDate(date)}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{eventsByDate.get(date) ?? 0}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#96a8bc]">events</p>
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
    <div className="grid gap-2 md:grid-cols-7">
      {cells.map((date) => {
        const inMonth = date.slice(5, 7) === focusDate.slice(5, 7);
        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`min-h-26 rounded-xl border p-3 text-left ${
              date === focusDate
                ? "border-[rgba(200,163,106,0.3)] bg-[rgba(200,163,106,0.12)]"
                : "border-white/10 bg-black/20 hover:bg-white/[0.04]"
            }`}
          >
            <p className={`text-sm font-semibold ${inMonth ? "text-white" : "text-[#5f7082]"}`}>
              {Number(date.slice(-2))}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#8ea0b5]">{eventsByDate.get(date) ?? 0} items</p>
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
  const focusWeekEvents = events.filter((event) => event.date >= shiftDate(focusDate, -3) && event.date <= shiftDate(focusDate, 3));

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Calendar"
        title="Planning surface for month, week, day, and agenda operations."
        description="Calendar is the core operating plane. Switch views in place, inspect the focused date, and keep linked events available without breaking workflow continuity."
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

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Panel
          title="Calendar board"
          description="Switch planning surfaces without leaving the route. The focused date and linked events remain consistent across views."
          action={
            <SegmentedControl
              items={calendarViews.map((view) => ({ label: view, value: view }))}
              value={calendarView}
              onChange={setCalendarView}
            />
          }
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                Focused date
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{formatDisplayDate(focusDate)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? -28 : -1))}>
                Previous
              </Button>
              <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? 28 : 1))}>
                Next
              </Button>
            </div>
          </div>

          {calendarView === "Month" ? (
            <MonthGrid focusDate={focusDate} eventsByDate={eventsByDate} onSelect={setFocusDate} />
          ) : null}
          {calendarView === "Week" ? (
            <WeekStrip focusDate={focusDate} eventsByDate={eventsByDate} onSelect={setFocusDate} />
          ) : null}
          {calendarView === "Day" ? (
            <div className="surface-muted rounded-xl p-4">
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

        <div className="space-y-5">
          <Panel title="Focused day" description="The selected date remains inspectable as an operational slice.">
            <div className="grid gap-3">
              <div className="surface-subtle rounded-xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                  Scheduled items
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{visibleEvents.length}</p>
                <p className="mt-1 text-sm text-[#90a2b5]">Items directly attached to {formatDisplayDate(focusDate)}</p>
              </div>
              <div className="surface-subtle rounded-xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b5]">
                  Week load
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{focusWeekEvents.length}</p>
                <p className="mt-1 text-sm text-[#90a2b5]">Events within the current seven-day window</p>
              </div>
            </div>
          </Panel>

          <Panel
            title="Event detail"
            description="Focused events stay visible while switching between month, week, day, and agenda views."
          >
            <EventList events={visibleEvents.length ? visibleEvents : events.filter((event) => event.date === "2026-03-13")} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
