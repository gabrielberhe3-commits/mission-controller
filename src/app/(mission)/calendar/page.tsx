"use client";

import { useState } from "react";
import { EventList } from "@/components/mission/mission-cards";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { calendarViews, formatDisplayDate } from "@/data/mission-control";

function shiftDate(date: string, amount: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + amount);
  return next.toISOString().slice(0, 10);
}

function buildMonthCells(focusDate: string) {
  const focus = new Date(`${focusDate}T12:00:00`);
  const monthStart = new Date(focus.getFullYear(), focus.getMonth(), 1, 12);
  const startDay = monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startDay);

  return Array.from({ length: 35 }, (_, index) => {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);
    return current.toISOString().slice(0, 10);
  });
}

function buildWeekDays(focusDate: string) {
  const base = new Date(`${focusDate}T12:00:00`);
  const dayIndex = base.getDay();
  const start = new Date(base);
  start.setDate(base.getDate() - dayIndex);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current.toISOString().slice(0, 10);
  });
}

function dayName(date: string, format: "short" | "narrow" = "short") {
  return new Intl.DateTimeFormat("en-US", { weekday: format }).format(new Date(`${date}T12:00:00`));
}

function monthLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function MonthBoard({
  focusDate,
  eventTitlesByDate,
  onSelect,
}: {
  focusDate: string;
  eventTitlesByDate: Map<string, string[]>;
  onSelect: (date: string) => void;
}) {
  const cells = buildMonthCells(focusDate);
  const monthToken = focusDate.slice(5, 7);

  return (
    <div className="rounded-[24px] border border-white/6 bg-[#090909] p-3">
      <div className="mb-2 grid grid-cols-7 gap-px overflow-hidden rounded-[18px] border border-white/6 bg-white/6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
          <div key={label} className="bg-[#090909] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#676767]">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[20px] border border-white/6 bg-white/6">
        {cells.map((date) => {
          const items = eventTitlesByDate.get(date) ?? [];
          const isActive = date === focusDate;
          const inMonth = date.slice(5, 7) === monthToken;

          return (
            <button
              key={date}
              onClick={() => onSelect(date)}
              className={`min-h-[132px] px-3 py-3 text-left ${
                isActive ? "bg-[#121212]" : "bg-[#090909] hover:bg-[#101010]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${inMonth ? "text-white" : "text-[#4d4d4d]"}`}>
                  {Number(date.slice(-2))}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#5e5e5e]">
                  {items.length || ""}
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                {items.slice(0, 2).map((item) => (
                  <div key={item} className="truncate rounded-[10px] bg-[#141414] px-2.5 py-1.5 text-[11px] text-[#d8d8d8]">
                    {item}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekBoard({
  focusDate,
  eventTitlesByDate,
  onSelect,
}: {
  focusDate: string;
  eventTitlesByDate: Map<string, string[]>;
  onSelect: (date: string) => void;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[20px] border border-white/6 bg-white/6 lg:grid-cols-7">
      {buildWeekDays(focusDate).map((date) => {
        const items = eventTitlesByDate.get(date) ?? [];
        const isActive = date === focusDate;

        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`min-h-[220px] px-3 py-3 text-left ${isActive ? "bg-[#121212]" : "bg-[#090909] hover:bg-[#101010]"}`}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">{dayName(date)}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{Number(date.slice(-2))}</p>
            <div className="mt-4 space-y-1.5">
              {items.length ? (
                items.map((item) => (
                  <div key={item} className="rounded-[10px] bg-[#141414] px-2.5 py-2 text-[11px] text-[#d8d8d8]">
                    {item}
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-white/8 px-2.5 py-2 text-[11px] text-[#5f5f5f]">
                  Open
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function CalendarPage() {
  const { calendarView, events, setCalendarView } = useWorkspace();
  const [focusDate, setFocusDate] = useState("2026-03-13");
  const visibleEvents = events.filter((event) => event.date === focusDate);
  const adjacentEvents = events.filter(
    (event) => event.date >= focusDate && event.date <= shiftDate(focusDate, 3),
  );
  const eventTitlesByDate = new Map<string, string[]>();

  events.forEach((event) => {
    eventTitlesByDate.set(event.date, [...(eventTitlesByDate.get(event.date) ?? []), event.title]);
  });

  return (
    <div className="space-y-3">
      <PageHeader
        eyebrow="Calendar"
        title="Schedule"
        description="Month-first planning surface."
        actions={
          <>
            <Button size="sm" onClick={() => setFocusDate("2026-03-13")}>
              Today
            </Button>
            <Button size="sm" variant="primary">
              Import
            </Button>
          </>
        }
      />

      <div className="grid gap-3 2xl:grid-cols-[minmax(0,1.5fr)_320px]">
        <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
          <div className="flex flex-col gap-3 border-b border-white/6 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Planning</p>
              <h2 className="mt-1 text-[28px] font-semibold tracking-[-0.05em] text-white">
                {monthLabel(focusDate)}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? -28 : -1))}>
                Prev
              </Button>
              <Button size="sm" onClick={() => setFocusDate(shiftDate(focusDate, calendarView === "Month" ? 28 : 1))}>
                Next
              </Button>
              <SegmentedControl
                items={calendarViews.map((view) => ({ label: view, value: view }))}
                value={calendarView}
                onChange={setCalendarView}
              />
            </div>
          </div>

          <div className="mt-4">
            {calendarView === "Month" ? (
              <MonthBoard
                focusDate={focusDate}
                eventTitlesByDate={eventTitlesByDate}
                onSelect={setFocusDate}
              />
            ) : null}
            {calendarView === "Week" ? (
              <WeekBoard
                focusDate={focusDate}
                eventTitlesByDate={eventTitlesByDate}
                onSelect={setFocusDate}
              />
            ) : null}
            {calendarView === "Day" ? <EventList events={visibleEvents} /> : null}
            {calendarView === "Agenda" ? <EventList events={events} /> : null}
          </div>
        </section>

        <aside className="space-y-3">
          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Selected day</p>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">
              {formatDisplayDate(focusDate)}
            </h3>
            <div className="mt-4 space-y-2">
              {(visibleEvents.length ? visibleEvents : events.filter((event) => event.date === "2026-03-13")).map(
                (event) => (
                  <div key={event.id} className="rounded-[14px] border border-white/6 bg-[#090909] px-3 py-3">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-sm text-[#8a8a8a]">
                      {event.timeRange} · {event.location}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-[24px] border border-white/6 bg-[#0a0a0a] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">Next up</p>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#666]">4 days</span>
            </div>
            <div className="mt-4 space-y-2">
              {adjacentEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between gap-3 rounded-[14px] border border-white/6 bg-[#090909] px-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-sm text-[#8a8a8a]">{formatDisplayDate(event.date)}</p>
                  </div>
                  <p className="shrink-0 text-[11px] font-medium text-[#bfbfbf]">{event.timeRange.split(" - ")[0]}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
